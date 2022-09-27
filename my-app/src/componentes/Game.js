import React from 'react';
import { calculateWinner } from "../calculador";
import  Board from "./Board"

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
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
  
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      
      if (calculateWinner(squares) && this.state.showHistory=== false ){
        this.setState({
          showHistory: true
        });
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
      
      const moves = history.map((step, move) => {
    //const deshacer = move ? "IR A LA JUGADA : #" + move : "IR AL INICIO";
       
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
           <div className="btn" esconder={()=> this.hide(true)}>
            <button onClick={() => this.deshacer()}>{"<=="}</button>
  
            <button onClick={() => this.flecha_derecha()}>{"==>"}</button>
            </div>
            <br></br>
          </div>
          <div className="game-info">
            <p>HISTORIAL</p>
            <div>{status}</div>
           {this.state.showHistory & <ol>{moves}</ol>} 
          </div>
        </div>
      );
    }
  }
 export default Game;