import React from "react";
import HomeStyle from "./style";

const Home = () => {
  const submitValuesOnRun = () => {
    let level = document.getElementById("chooseLevel").value;
    let algorithm = document.getElementById("algorithm").value;
    let xCorSize = document.getElementById("x-cor-size").value;
    let yCorSize = document.getElementById("y-cor-size").value;
    let automatic = document.getElementById("automatic").value;
    let xStartCor = document.getElementById("x-start-cor").value;
    let yStartCor = document.getElementById("y-start-cor").value;
    let xEndCor = document.getElementById("x-end-cor").value;
    let yEndCor = document.getElementById("y-end-cor").value;

    localStorage.setItem("level", level);
    localStorage.setItem("algorithm", algorithm);
    localStorage.setItem("xCorSize", xCorSize);
    localStorage.setItem("yCorSize", yCorSize);
    localStorage.setItem("automatic", automatic);
    localStorage.setItem("xStartCor", xStartCor);
    localStorage.setItem("yStartCor", yStartCor);
    localStorage.setItem("xEndCor", xEndCor);
    localStorage.setItem("yEndCor", yEndCor);

    window.location.href = `/game`;
  };
  return (
    <HomeStyle>
      <h1>Choose configuration</h1>
      <div className="wrapper">
        <div className="basics">
          <div className="divField">
            <label>Choose algorithm:</label>
            <select id="algorithm" defaultValue={"astar-cross"}>
              <option value="astar-cross">Algorithm 1 (A* cross)</option>
              <option value="astar-around">Algorithm 2 (A* around)</option>
            </select>
          </div>
          <div className="divField">
            <label>Choose Level:</label>
            <select id="chooseLevel" defaultValue={0}>
              <option value={0}>1 (0 blocks)</option>
              <option value={1}>2 (1 blocks)</option>
              <option value={2}>3 (2 blocks)</option>
              <option value={3}>4 (3 blocks)</option>
              <option value={4}>5 (4 blocks)</option>
              <option value={5}>6 (5 blocks)</option>
              <option value={6}>7 (6 blocks)</option>
              <option value={7}>8 (7 blocks)</option>
              <option value={8}>9 (8 blocks)</option>
              <option value={9}>10 (9 blocks)</option>
            </select>
          </div>
          <div className="divField">
            <label>Choose field size: (not required)</label>
            <div className="divRow">
              <div className="divField">
                <label>X Cordinate: </label>
                <input
                  id="x-cor-size"
                  type="number"
                  name="x-cor"
                  defaultValue={10}
                ></input>
              </div>
              <div className="divField">
                <label>Y Cordinate: </label>
                <input
                  id="y-cor-size"
                  type="number"
                  name="y-cor"
                  defaultValue={10}
                ></input>
              </div>
            </div>
          </div>
          <div className="divField">
            <label>Run it:</label> <br />
            <select id="automatic" defaultValue={"manual"}>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>
        <div className="cordinates-config">
          <div className="divField">
            <label>Choose starting cordinates: (not required)</label>
            <div className="divRow">
              <div className="divField">
                <label>Starting X Cordinate: </label>
                <input
                  id="x-start-cor"
                  type="number"
                  name="x-cor"
                  defaultValue={0}
                ></input>
              </div>
              <div className="divField">
                <label>Starting Y Cordinate: </label>
                <input
                  id="y-start-cor"
                  type="number"
                  name="y-cor"
                  defaultValue={4}
                ></input>
              </div>
            </div>
          </div>
          <div className="divField">
            <label>Choose ending cordinates: (not required)</label>
            <div className="divRow">
              <div className="divField">
                <label>Ending X Cordinate: </label>
                <input
                  id="x-end-cor"
                  type="number"
                  name="x-cor"
                  defaultValue={9}
                ></input>
              </div>
              <div className="divField">
                <label>Ending Y Cordinate: </label>
                <input
                  id="y-end-cor"
                  type="number"
                  name="y-cor"
                  defaultValue={9}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={submitValuesOnRun} className="run">
        RUN
      </button>
    </HomeStyle>
  );
};

export default Home;
