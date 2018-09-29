import React from 'react';

class Square extends React.Component {
	render() {
		const props = this.props;
		return (
			<button className="square" onClick={props.onClick}>
				{props.value}
			</button>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResizeHandler);
	}

	// when the component is removed from the DOM...
	componentWillUnmount() {
		window.removeEventListener('resize', this.onResizeHandler);
	}

	onResizeHandler() {
		console.log('The window has been resized!');
	}

	handleOnClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = this.state.xIsNext ? "X" : "0";
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		});
	}

	renderSquare(i) {
		return <Square value={this.state.squares[i]} onClick={() => this.handleOnClick(i)} />;
	}

	render() {
		const status = `Next player: ${this.state.xIsNext ? "X" : "0"} `;

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

export default Game;
