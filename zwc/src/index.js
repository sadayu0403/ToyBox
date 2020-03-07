import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Timer(props) {
    return (
        <input type="text" className="timer" value={props.time} disabled></input>
    );
}

function StartButton(props) {
    return (
        <button className="startbutton" onClick={props.onClick}>Start</button>
    );
}

function Square(props) {
    return (
        <button className="square">
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(25).fill(null),
            nextNum: 1,
            time: '00:00:00'
        };
    }

    handleClick() {
        const squares = startSquareNumbers();
        this.setState({squares: squares});
    }

    renderSquare(i) {
        return (
            <Square value={this.state.squares[i]} />
        );
    }

    render() {
        return (
            <div>
                <h2>ZEN Integrationからの挑戦状</h2>
                <Timer time={this.state.time}/>
                <StartButton onClick={() => this.handleClick()}/>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
                <div className="board-row">
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                </div>
                <div className="board-row">
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                </div>
                <div className="board-row">
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function startSquareNumbers() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    var a = arr.length;

    //シャッフルアルゴリズム
    while (a) {
        var j = Math.floor( Math.random() * a );
        var t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }

    return arr;
}