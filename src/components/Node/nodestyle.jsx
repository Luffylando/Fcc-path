import styled from 'styled-components';

const NodeStyle = styled.div`
  .node {
    width: 25px;
    height: 25px;
    border: 1px solid #000;
    margin: 1.5px;
  }

  .node-start {
    background: green;
  }

  .node-end {
    background: red;
  }

  .iswall {
    background: #000;
  }
  .node-visited {
    animation-name: visitedAnimation;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }

  @keyframes visitedAnimation {
    0% {
      transform: scale(0.3);
      background-color: rgba(0, 0, 66, 0.75);
      border-radius: 10%;
    }

    50% {
      background-color: #E3C47B;
    }

    75% {
      transform: scale(1);
      background-color: #E3C47B;
    }

    100% {
      transform: scale(1);
      background-color: #E3C47B;
    }
  }

  .node-wall {
    background-color: rgb(12, 53, 71);
  }

  .node-shortest-path {
    animation-name: shortestPath;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }

  @keyframes shortestPath {
    0% {
      content: "X";
      transform: scale(0.8);
      background-color: #9E50BA;
    }

    50% {
      content: "X";
      transform: scale(1);
      background-color: #9E50BA;
    }

    100% {
      content: "X";
      transform: scale(1);
      background-color: #9E50BA;
    }
  }
`;

export default NodeStyle;
