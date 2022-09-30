import React from "react";
import { calculateWinner } from "../calculador";
import Board from "./Board";


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
      showHistory: false,
      showArrow: false,
      showArrowR: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    // if (squares() === null ){

    //   console.log("hola")

    // }
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    
    
    //pregunta si hay un ganador y si showHistory = falso
    if (calculateWinner(squares) && this.state.showHistory === false) {
      this.setState({
        showHistory: true,
        showArrowR: true,
      });
    }

    this.setState({
      history: history.concat([
        {
          squares: squares,
          x:i,
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
      showHistory: false,
    });
  }
  flecha_iz() {
    const step = this.state.stepNumber;
    const unDoStep = step ? step - 1 : 0;

    this.setState({
      stepNumber: unDoStep,
      showArrow: true,
    });
  }
  flecha_derecha() {
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
      showHistory: false,
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
    const moves = history.map((step, move) => {
      return (
        <li className="col" key={move}>
          jugada numero #{move}
          <button onClick={() => this.jumpTo(move)}>{"ver jugada"}</button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = "EL GANADOR ES: " + winner;
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
          <h6 className="h"> hola </h6>
          <br></br>
        </div>
        <div className="nif">
          <p>HISTORIAL</p>
          <div>{status}</div>
          {this.state.showHistory && <ol>{moves}</ol>}
        </div>
        <br></br>

        {this.state.showHistory && (
          <h2 className="flechas">
            <button onClick={() => this.flecha_iz()}>{"<=="}</button>
            {this.state.showArrow && (
              <button onClick={() => this.flecha_derecha()}>{"==>"}</button>
            )}
          </h2>
        )}
      </div>
    );
  }
}
export default Game;
