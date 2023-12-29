const { spawn } = require("child_process");
const path = require("path");
const cl = require("./consolesUtils");

class Stockfish {
  constructor(options) {
    this.stockfish = spawn("stockfish", { shell: true });
    this.options = options;

    this.responceHandler = (data) => {
      data = data.toString();
      // cl.d(data)
      return data;
    };

    this.stockfish.stdout.on("data", this.responceHandler);

    this.onError(options && options.onError);
    this.onClose(options && options.onClose);
  }

  async runCmd({ command, behaviour, matchCondition, timeLimit }) {
    return new Promise((resolve) => {
      switch (behaviour) {
        case "responsive":
          this.stockfish.stdout.once("data", (data) => {
            const res = this.responceHandler(data);
            resolve(res);
          });
          break;
        case "nonresponsive":
          setTimeout(() => resolve(null), parseInt(timeLimit));
          break;
        case "multiresponsive":
          this.stockfish.stdout.on("data", (data) => {
            const res = this.responceHandler(data);
            const isTaskComplete = matchCondition(res);
            if (isTaskComplete) {
              this.stockfish.stdout.on("data", this.responceHandler);
              resolve(res);
            }
          });
          break;
        default:
          cl.d("command behaviour is not identical", command);
          resolve(false);
      }

      this.stockfish.stdin.write(command + "\n");
    });
  }

  async runSyncCmds(commands) {
    var PreviousOutput = {};
    for (let command of commands) {
      cl.d(command);
      // generate the dynamic command from the outputs of previous Iteration
      if (typeof command.command === "function")
        command.command = command.command(PreviousOutput);

      const log = await this.runCmd(command);

      if (command.callBack) PreviousOutput = command.callBack(log);
      else PreviousOutput = {};
    }
  }

  getAiMove(position, sendMove) {
    const commands = [
      {
        command: "position fen " + position,
        behaviour: "nonresponsive",
        timeLimit: 1500,
      },
      {
        command: "d",
        behaviour: "responsive",
      },
      {
        command: "go depth 1 movetime 3000",
        behaviour: "multiresponsive",
        matchCondition: (res) => res.includes("bestmove"),
        callBack: (log) => {
          const pattern = /bestmove (\S+)/;

          const match = log.match(pattern);
          const bestmove = match[1];
          return { bestmove };
        },
      },
      {
        command: (output) =>
          "position fen " + position + " moves " + output.bestmove,
        behaviour: "nonresponsive",
        timeLimit: 1500,
      },
      {
        command: "d",
        behaviour: "responsive",
        callBack: (log) => {
          cl.d(log);
          const fenRegex = /Fen: (.*)/;

          const match = log.match(fenRegex);

          if (match && match[1]) {
            const fenValue = match[1];
            cl.d("fen of AI move", fenValue);
            sendMove(fenValue);
          } else {
            cl.d("Fen value not found in the log.");
          }
          return {};
        },
      },
    ];
    this.runSyncCmds(commands);
  }

  // method: config error event handler function
  onError(func) {
    this.stockfish.stderr.on(
      "data",
      (() => {
        return func
          ? (err) => func(err)
          : (err) => cl.d("stockfish got some error: " + err.toString());
      })()
    );
  }

  // method: config close event handler function
  onClose(func) {
    this.stockfish.on(
      "close",
      func || (() => cl.d("stockfish process is closed"))
    );
  }

  // method: close the process
  close() {
    this.stockfish.stdin.end();
  }
}

module.exports = Stockfish;
