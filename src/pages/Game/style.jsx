import styled from "styled-components";

const GameStyle = styled.div`
  .Wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0px 50px 0px;
  }

  h1 {
    margin-bottom: 75px;
  }
  .rowWrapper {
    display: flex;
  }

  .buttons {
    a,
    .visualize {
      color: #000;
      border: 1px solid #000;
      padding: 5px 20px;
      border-radius: 5px;
      text-decoration: none;
      background: #fff;
      font-size: 14px;
      margin: 5px;
      cursor: pointer;
    }
  }
`;

export default GameStyle;
