import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.html";
// eslint-disable-next-line no-unused-vars
var c = 0; // es el contador para cuando termina el juego se muestre el historial
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if ((c = 1)) {
      <div>
        <button> hola que tal </button>
      </div>;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  deshacer() {
    const step = this.state.stepNumber;
    const unDoStep = step ? step - 1 : 0;

    let history = this.state.history;
    const length = history.length;

    if (length > 1) history.pop();

    this.setState({
      stepNumber: unDoStep,
    });
  }
  fecha_derecha() {
    const step = this.state.stepNumber;
    const unDoStep = step ? step + 1 : 0;

    this.setState({
      stepNumber: unDoStep,
    });
  }

  vaciar() {
    this.setState({
      stepNumber: 0,
      xIsNext: true,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let c = 0;
    const moves = history.map((step, move) => {
      const deshacer = move ? "IR A LA JUGADA : #" + move : "IR AL INICIO";

      //console.log('move: ', move);
      return (
        <li key={move}>
          jugada numero #{move}
          <button onClick={() => this.jumpTo(move - 1)}>{"ver jugada"}</button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = "EL GANADOR ES: " + winner;
      c = 1;
    } else {
      status = "TURNO : " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

          <button onClick={() => this.vaciar()}>{"REINICIAR"}</button>
          <button onClick={() => this.deshacer()}>{"DESHACER"}</button>
          <br></br>
          <button onClick={() => this.deshacer()}>{"<=="}</button>

          <button onClick={() => this.flecha_derecha()}>{"==>"}</button>
          <br></br>
        </div>
        <div className="game-info">
          <p>HISTORIAL</p>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
//agregar un boton para reiniciar en cualquier momento
//agregar dos botones reinicar y deshacer
// ambos que se borren del historial
// uno que navegue paso por paso, que te salga dos flechas, uno que se vaya para atras
//y otro para adelante, solo aparecer al final del juego
// cuando apretes la flecha para atras resaltar el ultimo movimiento
// cuando termine el juego ahi recien mostrar el historial o agregarle un boton para mostrar
// subir a un servidor netlify
