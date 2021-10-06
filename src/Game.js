import React from "react";
import Board from "./Board";
import './index.css';
const calculateWinner=(squares) =>{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winLine:lines[i],winner:squares[a]};
      }
    }
    return {winLine:null,winner:null};
  }
  function getLocation(move) {
    const mapLocation = {
      0: 'col: 1, row: 1',
      1: 'col: 2, row: 1',
      2: 'col: 3, row: 1',
      3: 'col: 1, row: 2',
      4: 'col: 2, row: 2',
      5: 'col: 3, row: 2',
      6: 'col: 1, row: 3',
      7: 'col: 2, row: 3',
      8: 'col: 3, row: 3',
    };
    return mapLocation[move];
  }
class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        currItemselect:null
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares).winLine || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      
      this.setState({
        history: history.concat([
          {
            squares: squares,
            currPosition : getLocation(i),
            currMoves: history.length,
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    sortMoves(){
      this.setState({
        history:this.state.history.reverse(),
      })
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const {winLine,winner} = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = step.currMoves ?
          `Go to move #${step.currMoves} || ${step.currPosition}` :
          'Go to move 0';
       
          return ( move === this.state.stepNumber ?
            <li key={move}>
                <button style={{fontWeight: 'bold'}} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
            :
            <li key={move}>
            <button  onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
          );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } 
      else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      };
      if (this.state.stepNumber===9) {
        status="Draw";
      }

      
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winnerRow={winLine}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
              <button onClick={()=>this.sortMoves()}>Sort</button>
            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
export default Game;