import React, { useEffect , useState} from "react";
import { Chessboard } from "react-chessboard";
import { Wrapper, Status } from "../../components/styles/gameboard.styles";
import { useAuthAndNavigation } from "../../utils/auth/auth";
import { useParams } from "react-router-dom";
import connectToSocket from "../../utils/websocket";
import useChessGame from "../../utils/customHooks/useChessGamw";
import { GiChessQueen } from "react-icons/gi";
import { FaChessRook } from "react-icons/fa";

let socket;

const GameBoard = ({ randomOnline, vsComp }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
   

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  console.log(windowSize.innerWidth,"dsredtdt")

  const { checkAuthentication } = useAuthAndNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  function getEndpoint() {
    if (vsComp) return "/vscomp";
    if (randomOnline) return "/vsrandom";
    return "/vsfriend";
  }
  const { id: roomid } = useParams();

  const {
    game,
    onDrop,
    onMouseoverSquare,
    onMouseoutSquare,
    handleChange,
    updateMove,
    updateSide,
    playerSide,
    status,
    updateStatus,
  } = useChessGame(vsComp);

  const endpoint = getEndpoint();

  useEffect(() => {
    console.log({roomid, vsComp})
    socket = connectToSocket(
      endpoint,
      roomid,
      updateSide,
      updateMove,
      updateStatus
    );

    return () => socket?.close();
  }, [roomid, vsComp]);

  return (
    <>
      {status && <Status>{status}</Status>}
      <Wrapper>
        <Chessboard
          customDarkSquareStyle={{ backgroundColor: "#778899" }}
          customLightSquareStyle={{ backgroundColor: "#008080" }}
          customPieces={customPieces}
          boardWidth={windowSize.innerWidth<640? windowSize.innerWidth-20: 640}
          id="BasicBoard"
          position={game.fen()}
          onPieceDrop={onDrop}
          isDraggablePiece={(data) =>
            playerSide === game.turn() && data.piece.charAt(0) === game.turn()
          }
          onMouseOverSquare={onMouseoverSquare}
          onMouseOutSquare={onMouseoutSquare}
          getPositionObject={handleChange}
          boardOrientation={playerSide === "w" ? "white" : "black"}
          
        />
      </Wrapper>
    </>
  );
};
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


const customPieces = {
  // Custom rendering for white pawn (wP)
  wP: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 256 256"
        width="70px"
        height="70px"
      >
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: "normal" }}
        >
          <g transform="scale(5.33333,5.33333)">
            <path
              d="M28.001,19h-8.002c0,16.944 -10,9.713 -10,23c0,0 0.546,2 14.001,2c13.455,0 14.001,-2 14.001,-2c0,-13.287 -10,-6.056 -10,-23z"
              fill="#e8e8e8"
            ></path>
            <path
              d="M28.001,19h-8.002c0,1.127 -0.047,2.141 -0.13,3.067c1.869,0.18 5.76,0.63 5.76,3.765c0,2.702 -1.738,11.678 -6.629,12.168c-4.461,0.447 -8.273,-1.094 -8.273,-1.094c-0.455,1.274 -0.728,2.904 -0.728,5.094c0,0 0.546,2 14.001,2c13.455,0 14.001,-2 14.001,-2c0,-13.287 -10,-6.056 -10,-23z"
              fill="#cccaca"
            ></path>
            <path
              d="M26.02,14h-2.02h-2.02c-1.986,1.334 -3.972,2.668 -5.957,4.001c0.03,0.428 0.113,0.997 0.332,1.634c0.197,0.573 0.446,1.032 0.663,1.371l6.984,-0.01l6.981,0.01c0.217,-0.339 0.466,-0.798 0.663,-1.371c0.219,-0.637 0.302,-1.206 0.332,-1.634c-1.986,-1.333 -3.972,-2.667 -5.958,-4.001z"
              fill="#e8e8e8"
            ></path>
            <path
              d="M26,20.999l1.084,0.483l0.976,-0.48l2.922,0.004c0.217,-0.339 0.466,-0.798 0.663,-1.371c0.219,-0.637 0.302,-1.206 0.332,-1.634c-1.986,-1.334 -3.972,-2.668 -5.957,-4.001h-2.02l3,4z"
              fill="#cccaca"
            ></path>
            <circle cx="24" cy="10" r="7" fill="#e8e8e8"></circle>
            <path
              d="M27.884,4.178c0.743,1.112 1.178,2.447 1.178,3.884c0,3.016 -1.907,5.586 -4.581,6.571l1.544,2.07c0.435,-0.131 1.04,0.059 1.434,-0.15c0.361,-0.191 0.515,-0.775 0.835,-1.024c1.646,-1.28 2.706,-3.281 2.706,-5.529c0,-2.429 -1.238,-4.567 -3.116,-5.822z"
              fill="#cccaca"
            ></path>
            <path
              d="M24.683,4.727c0.372,0.973 -0.526,2.556 -2.006,3.536c-1.48,0.979 -2.982,0.984 -3.354,0.011c-0.372,-0.973 0.526,-2.556 2.006,-3.536c1.48,-0.98 2.981,-0.985 3.354,-0.011z"
              fill="#65ccc9"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  ),

  bP: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 256 256"
        width="70px"
        height="70px"
      >
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: "normal" }}
        >
          <g transform="scale(5.33333,5.33333)">
            <path
              d="M28.001,19h-8.002c0,16.944 -10,9.713 -10,23c0,0 0.546,2 14.001,2c13.455,0 14.001,-2 14.001,-2c0,-13.287 -10,-6.056 -10,-23z"
              fill="#282a26"
            ></path>
            <path
              d="M28.001,19h-8.002c0,1.127 -0.047,2.141 -0.13,3.067c1.869,0.18 5.76,0.63 5.76,3.765c0,2.702 -1.738,11.678 -6.629,12.168c-4.461,0.447 -8.273,-1.094 -8.273,-1.094c-0.455,1.274 -0.728,2.904 -0.728,5.094c0,0 0.546,2 14.001,2c13.455,0 14.001,-2 14.001,-2c0,-13.287 -10,-6.056 -10,-23z"
              fill="#151715"
            ></path>
            <path
              d="M26.02,14h-2.02h-2.02c-1.986,1.334 -3.972,2.668 -5.957,4.001c0.03,0.428 0.113,0.997 0.332,1.634c0.197,0.573 0.446,1.032 0.663,1.371l6.984,-0.01l6.981,0.01c0.217,-0.339 0.466,-0.798 0.663,-1.371c0.219,-0.637 0.302,-1.206 0.332,-1.634c-1.986,-1.333 -3.972,-2.667 -5.958,-4.001z"
              fill="#282a26"
            ></path>
            <path
              d="M26,20.999l1.084,0.483l0.976,-0.48l2.922,0.004c0.217,-0.339 0.466,-0.798 0.663,-1.371c0.219,-0.637 0.302,-1.206 0.332,-1.634c-1.986,-1.334 -3.972,-2.668 -5.957,-4.001h-2.02l3,4z"
              fill="#151715"
            ></path>
            <circle cx="24" cy="10" r="7" fill="#282a26"></circle>
            <path
              d="M27.884,4.178c0.743,1.112 1.178,2.447 1.178,3.884c0,3.016 -1.907,5.586 -4.581,6.571l1.544,2.07c0.435,-0.131 1.04,0.059 1.434,-0.15c0.361,-0.191 0.515,-0.775 0.835,-1.024c1.646,-1.28 2.706,-3.281 2.706,-5.529c0,-2.429 -1.238,-4.567 -3.116,-5.822z"
              fill="#151715"
            ></path>
            <path
              d="M24.683,4.727c0.372,0.973 -0.526,2.556 -2.006,3.536c-1.48,0.979 -2.982,0.984 -3.354,0.011c-0.372,-0.973 0.526,-2.556 2.006,-3.536c1.48,-0.98 2.981,-0.985 3.354,-0.011z"
              fill="#65ccc9"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  ),

  // Custom rendering for black queen (bQ)
  bQ: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <GiChessQueen size="65px" color="black" />
    </div>
  ),
  wQ: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <GiChessQueen size="65px" color="white" />
    </div>
  ),
  bN: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="70.000000pt"
        height="70.000000pt"
        viewBox="0 0 70.000000 70.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,70.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M228 582 c-96 -99 -109 -167 -54 -303 17 -42 20 -62 13 -83 -5 -15
-7 -28 -6 -29 2 -1 73 -1 157 1 l152 3 0 25 c0 16 -16 41 -50 73 -49 48 -86
113 -75 131 4 6 14 10 23 10 10 0 28 7 41 16 17 12 26 13 34 5 20 -20 56 -13
63 13 10 40 -5 64 -49 84 -23 11 -60 31 -81 45 -48 33 -56 34 -56 2 0 -14 -4
-25 -10 -25 -5 0 -10 23 -10 50 0 34 -4 50 -12 50 -7 -1 -43 -31 -80 -68z"
          />
          <path
            d="M142 128 c-7 -7 -12 -20 -12 -30 0 -17 14 -18 210 -18 196 0 210 1
210 18 0 38 -18 42 -210 42 -131 0 -190 -4 -198 -12z"
          />
        </g>
      </svg>
    </div>
  ),
  wN: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="70.000000pt"
        height="70.000000pt"
        viewBox="0 0 70.000000 70.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,70.000000) scale(0.100000,-0.100000)"
          fill="#fff"
          stroke="none"
        >
          <path
            d="M228 582 c-96 -99 -109 -167 -54 -303 17 -42 20 -62 13 -83 -5 -15
-7 -28 -6 -29 2 -1 73 -1 157 1 l152 3 0 25 c0 16 -16 41 -50 73 -49 48 -86
113 -75 131 4 6 14 10 23 10 10 0 28 7 41 16 17 12 26 13 34 5 20 -20 56 -13
63 13 10 40 -5 64 -49 84 -23 11 -60 31 -81 45 -48 33 -56 34 -56 2 0 -14 -4
-25 -10 -25 -5 0 -10 23 -10 50 0 34 -4 50 -12 50 -7 -1 -43 -31 -80 -68z"
          />
          <path
            d="M142 128 c-7 -7 -12 -20 -12 -30 0 -17 14 -18 210 -18 196 0 210 1
210 18 0 38 -18 42 -210 42 -131 0 -190 -4 -198 -12z"
          />
        </g>
      </svg>
    </div>
  ),
  bR: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <FaChessRook size="55px" fill="black" />
    </div>
  ),
  wR: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <FaChessRook size="55px" fill="white" />
    </div>
  ),
  bB: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="85.000000pt"
        height="70.000000pt"
        viewBox="0 0 70.000000 70.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,70.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M321 566 c-8 -10 -4 -23 19 -54 17 -23 30 -46 30 -52 0 -22 -26 -8
-48 25 -27 43 -36 44 -52 6 -24 -59 9 -101 80 -101 70 0 107 48 80 102 -40 76
-83 106 -109 74z"
          />
          <path
            d="M306 338 c-3 -13 -6 -35 -6 -49 0 -15 -7 -45 -15 -68 l-14 -41 79 0
79 0 -14 41 c-8 23 -15 53 -15 68 0 58 -10 71 -50 71 -31 0 -39 -4 -44 -22z"
          />
          <path
            d="M200 121 c-5 -11 -10 -29 -10 -40 0 -20 5 -21 160 -21 155 0 160 1
160 21 0 11 -5 29 -10 40 -10 17 -23 19 -150 19 -127 0 -140 -2 -150 -19z"
          />
        </g>
      </svg>
    </div>
  ),
  wB: ({ isDragging, squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: squareWidth * 0.6,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="85.000000pt"
        height="70.000000pt"
        viewBox="0 0 70.000000 70.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,70.000000) scale(0.100000,-0.100000)"
          fill="#fff"
          stroke="none"
        >
          <path
            d="M321 566 c-8 -10 -4 -23 19 -54 17 -23 30 -46 30 -52 0 -22 -26 -8
-48 25 -27 43 -36 44 -52 6 -24 -59 9 -101 80 -101 70 0 107 48 80 102 -40 76
-83 106 -109 74z"
          />
          <path
            d="M306 338 c-3 -13 -6 -35 -6 -49 0 -15 -7 -45 -15 -68 l-14 -41 79 0
79 0 -14 41 c-8 23 -15 53 -15 68 0 58 -10 71 -50 71 -31 0 -39 -4 -44 -22z"
          />
          <path
            d="M200 121 c-5 -11 -10 -29 -10 -40 0 -20 5 -21 160 -21 155 0 160 1
160 21 0 11 -5 29 -10 40 -10 17 -23 19 -150 19 -127 0 -140 -2 -150 -19z"
          />
        </g>
      </svg>
    </div>
  ),
};

export default GameBoard;

export { socket };
