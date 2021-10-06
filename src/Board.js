import React from "react";
import './index.css';
import Square from "./Square.js"
  class Board extends React.Component {
    
    renderSquare(i) {
      const winnerLine=this.props.winnerRow &&
      (this.props.winnerRow[0] === i ||
        this.props.winnerRow[1] === i ||
        this.props.winnerRow[2] === i)
        ? 'square-green'
        : '';
      return (
        <Square
          winnerClass={winnerLine}
          value={this.props.squares[i]}
          key={i}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
 
 
    renderBoard(row,col){
      const Board=[];
      let countCell=0;
      const ncol=[...Array(col).keys()];
      const nrow=[...Array(row).keys()];
      nrow.map(x=>{
        const column=[];
        ncol.map(i=>{
          column.push(this.renderSquare(countCell++));
        })
        Board.push(<div key={x} className="board-row">{column}</div>);
      })
      return Board;
    }
    render() {
      return (
        <div>
          {this.renderBoard(3,3)}
        </div>
      );
    }
  }
 
export default Board;