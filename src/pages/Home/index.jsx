import React from 'react';
import HomeStyle from './style';

const Home = () => {
	const submitValuesOnRun = () => {
		const level = document.getElementById('chooseLevel').value;
		const algorithm = document.getElementById('algorithm').value;
		const xCorSize = document.getElementById('x-cor-size').value;
		const yCorSize = document.getElementById('y-cor-size').value;
		const automatic = document.getElementById('automatic').value;
		const xStartCor = document.getElementById('x-start-cor').value;
		const yStartCor = document.getElementById('y-start-cor').value;
		const xEndCor = document.getElementById('x-end-cor').value;
		const yEndCor = document.getElementById('y-end-cor').value;

		localStorage.setItem('level', level);
		localStorage.setItem('algorithm', algorithm);
		localStorage.setItem('xCorSize', xCorSize);
		localStorage.setItem('yCorSize', yCorSize);
		localStorage.setItem('automatic', automatic);
		localStorage.setItem('xStartCor', xStartCor);
		localStorage.setItem('yStartCor', yStartCor);
		localStorage.setItem('xEndCor', xEndCor);
		localStorage.setItem('yEndCor', yEndCor);

		window.location.href = '/game';
	};

	return (
		<HomeStyle>
			<h1>Choose configuration</h1>
			<div className="wrapper">
				<div className="basics">
					<div className="divField">
						<label htmlFor="algorithm">
							Choose algorithm:
							<select id="algorithm" defaultValue="all">
								<option value="all">All</option>
								<option value="astar">Astar(A*)</option>
								<option value="bfs">Breadth First Search</option>
								<option value="dijkstra">Dijkstra</option>
							</select>
						</label>
					</div>
					<div className="divField">
						<label htmlFor="chooseLevel">
							Choose Level:
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
						</label>
					</div>
					<div className="divField">
						<legend>
							Choose field size: (not required)
							<div className="divRow">
								<div className="divField">
									<label htmlFor="x-cor-size">
										X Cordinate:
										<input
											id="x-cor-size"
											type="number"
											name="x-cor"
											defaultValue={10}
											max="50"
											onKeyDown="return false"
										/>
									</label>
								</div>
								<div className="divField">
									<label htmlFor="y-cor-size">
										Y Cordinate:
										<input
											id="y-cor-size"
											type="number"
											name="y-cor"
											defaultValue={10}
											max={50}
											onKeyDown="return false"

										/>
									</label>
								</div>
							</div>
						</legend>
					</div>
					<div className="divField">
						<label htmlFor="automatic">
							Run it:
							<br />
							<select id="automatic" defaultValue="manual">
								<option value="automatic">Automatic</option>
								<option value="manual">Manual</option>
							</select>
						</label>
					</div>
				</div>
				<div className="cordinates-config">
					<div className="divField">
						<legend>
							Choose starting cordinates: (not required)
							<div className="divRow">
								<div className="divField">
									<label htmlFor="y-start-cor">
										Starting Y Cordinate:
										<input
											id="y-start-cor"
											type="number"
											name="y-cor"
											defaultValue={4}
											min={0}
											onKeyDown="return false"

										/>
									</label>
								</div>
								<div className="divField">
									<label htmlFor="x-start-cor">
										Starting X Cordinate:
										<input
											id="x-start-cor"
											type="number"
											name="x-cor"
											defaultValue={0}
											min={0}
											onKeyDown="return false"

										/>
									</label>
								</div>
							</div>
						</legend>
					</div>
					<div className="divField">
						<legend>
							Choose ending cordinates: (not required)
							<div className="divRow">
								<div className="divField">
									<label htmlFor="y-end-cor">
										Ending Y Cordinate:
										<input
											id="y-end-cor"
											type="number"
											name="y-cor"
											defaultValue={9}
											min={0}
											onKeyDown="return false"

										/>
									</label>
								</div>
								<div className="divField">
									<label htmlFor="x-end-cor">
										Ending X Cordinate:
										<input
											id="x-end-cor"
											type="number"
											name="x-cor"
											defaultValue={9}
											min={0}
											onKeyDown="return false"
										/>
									</label>
								</div>
							</div>
						</legend>
					</div>
				</div>
			</div>
			<button type="button" onClick={submitValuesOnRun} className="run">
				RUN
			</button>
		</HomeStyle>
	);
};

export default Home;
