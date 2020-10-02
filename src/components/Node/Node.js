import React from 'react';
import NodeStyle from './nodestyle';

const Node = ({
	isStart, isEnd, row, col, isWall,
}) => {
	let classes;
	if (isStart) {
		classes = 'node-start';
	} else if (isWall) {
		classes = 'iswall';
	} else if (isEnd) {
		classes = 'node-end';
	} else {
		classes = '';
	}

	return (
		<NodeStyle>
			<div className={`node ${classes}`} id={`node-${row}-${col}`} />
		</NodeStyle>
	);
};

export default Node;
