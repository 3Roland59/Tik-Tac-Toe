import './App.css';
import { useState } from 'react';

function Square({val, onSquare}){

  return(
    <button className='box' onClick={onSquare}>{val}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = (xIsNext)? 'X' : 'O';
    onPlay(newSquares);
  }
  // console.log(Boolean(squares));
  function begin(){
    return squares.some(item => Boolean(item));
  }
  function allFull(){
    return squares.every(item => Boolean(item));
  }

  const winner = calculateWinner(squares);
  let status;
  status = winner? winner + ' Wins': (!winner && allFull()) ? 'Its a draw': (xIsNext? 'X': 'O') + (begin()? ' is next': ' begins');

  return (
    <div>
      <div className='status'>{status}</div>
      <div className="board">
        <Square val={squares[0]} onSquare={() => handleClick(0)}/>
        <Square val={squares[1]} onSquare={() => handleClick(1)}/>
        <Square val={squares[2]} onSquare={() => handleClick(2)}/>
        <Square val={squares[3]} onSquare={() => handleClick(3)}/>
        <Square val={squares[4]} onSquare={() => handleClick(4)}/>
        <Square val={squares[5]} onSquare={() => handleClick(5)}/>
        <Square val={squares[6]} onSquare={() => handleClick(6)}/>
        <Square val={squares[7]} onSquare={() => handleClick(7)}/>
        <Square val={squares[8]} onSquare={() => handleClick(8)}/>
      </div>
    </div>
  );
}

function calculateWinner(squares){
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
  
  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function display(){
  document.querySelector('.game-info').classList.toggle('info-dis');
}

export default function Game(){

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];const xIsNext = currentMove % 2 === 0;

  function reset (){
    setCurrentMove(0)
    setHistory([Array(9).fill(null)])
  }

  function handlePlay(newSquares){
    const newHistory = [...history.slice(0, currentMove + 1), newSquares]
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMoves){
    setCurrentMove(nextMoves);
  }

  const moves = history.map((squares, move) => {
    let info;
    info = move > 0? 'Go to move no.' + move : 'Go to game start';

    return(
      <li className='list' key={move}>
        <button className='list-btn' onClick={() => {display(); jumpTo(move)}}>{info}</button>
      </li>
    );
  });

  return(
    <div>
      <button className='list-btn' id='history' onClick={display}>HISTORY</button>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      <button className='list-btn' onClick={reset} style={{"transform": "translateX(55px)"}}>RESET</button>
      <div className='game-info'>
        <ol className='ol'>{moves}</ol>
      </div>
    </div>
  )
}

