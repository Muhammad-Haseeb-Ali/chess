import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { emit } from "../../utils/gameEmitters";
import { toast } from "react-toastify";

const useChessGame = (vsComp) => {
  const [game, setGame] = useState(new Chess());
  const [playerSide, setPlayerSide] = useState(vsComp ? "w" : null);
  const [status, setStatus] = useState();

  const makeMove = (move) => {
    game.move(move);
    setGame(new Chess(game.fen()));
  };

  useEffect(() => {
    if (game.isCheckmate()) {
      setStatus("CheckMate");

      return;
    }
  }, [game]);

  const makeRandomMove = () => {
    const possibleMove = game.moves();

    if (game.isCheckmate()) {
      setStatus("CheckMate");
    } else if (
      game.isGameOver() ||
      game.isDraw() ||
      possibleMove.length === 0
    ) {
      setStatus("GameOver");
    } else {
      console.log("working");
    }

    const randomIndex = Math.floor(Math.random() * possibleMove.length);
    makeMove(possibleMove[randomIndex]);
  };

  const onMouseoverSquare = (square) => {
    const moves = game.moves({
      square: square,
      verbose: true,
    });
    if ((vsComp && game.turn() === "w") || game.turn() === playerSide) {
      customSquareColor(square);
      moves.forEach((i) => customSquareColor(i.to));
    }
  };
  function onMouseoutSquare(square, piece) {
    const squares = document.querySelectorAll(`[data-square]`);
    squares.forEach((square) => {
      // square.style.opacity = 1;
      let color = square.getAttribute("data-square-color");
      if (color === "white") {
        square.style.background = "#008080";
      } else {
        square.style.background = "#778899";
      }
    });
  }

  const onDrop = (source, target) => {
    let move;
    try {
      move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    } catch (error) {
      toast.error("Invalid Move", { autoClose: 200, hideProgressBar: true });
      return;
    }
    setGame(new Chess(game.fen()));
    if (move === null) return "snapback";
    emit?.move(game.fen(move));

    // vsComp && !game.isGameOver() && setTimeout(makeRandomMove, 200);

    return true;
  };

  const handleChange = (newPosition) => {};

  const updateMove = (fen) => fen && setGame(new Chess(fen));

  function updateSide({ color }) {
    const side = localStorage.getItem("color");
    if (playerSide || side) return;
    else setPlayerSide(color);
  }

  const updateStatus = (status) => setStatus(status);

  return {
    game,
    makeMove,
    makeRandomMove,
    onMouseoverSquare,
    onDrop,
    handleChange,
    onMouseoutSquare,
    updateMove,
    updateSide,
    playerSide,
    status,
    updateStatus,
  };
};

function customSquareColor(square) {
  const squareElement = document.querySelector(`[data-square="${square}"]`);
  if (squareElement) {
    let color = squareElement.getAttribute("data-square-color");
    if (color === "white") {
      squareElement.style.background = "rgb(48 113 125)";
    } else {
      squareElement.style.background = "rgb(68 157 174)";
    }
  }
}

export default useChessGame;
