import React from 'react';
import './App.css';
import { findSolution } from './solver';

/* *
 - Button to trigger solver
 - Solver

 ------------- DONE
 x fix warnings
 x click again will remove
*/
function App() {
  const [ current, setCurrent ] = React.useState(1);
  const [ initial, setInitial ] = React.useState([
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  ]);
  // const [ initial, setInitial ] = React.useState([
  //   [ 0, 0, 0, 0, 3, 6, 4, 2, 8 ],
  //   [ 0, 0, 0, 4, 2, 8, 5, 9, 7 ],
  //   [ 0, 0, 0, 7, 9, 5, 6, 1, 3 ],
  //   [ 7, 8, 2, 3, 6, 9, 1, 4, 5 ],
  //   [ 6, 0, 9, 5, 4, 7, 8, 3, 2 ],
  //   [ 5, 4, 3, 8, 1, 2, 7, 6, 9 ],
  //   [ 2, 7, 0, 9, 5, 4, 3, 8, 6 ],
  //   [ 3, 6, 5, 2, 8, 1, 9, 7, 4 ],
  //   [ 8, 9, 4, 6, 7, 3, 2, 5, 1 ],
  // ]);
  const setCell = (x, y) => {
    const tempMatrix = [...initial];
    tempMatrix[x][y] = (tempMatrix[x][y] === current) ? 0 : current;
    setInitial(tempMatrix);
  }

  const solve = () => {
    const solution = findSolution([...initial]);
    setInitial(solution);
  }

  return (
    <div className="app">
      <CurrentSelector current={current} setter={setCurrent} />
      <button onClick={solve}>SOLVE!</button>
      <div className="board">
        {
          initial.map((row, rowIndex) => (
            <div
              className="row"
              key={`row${rowIndex}`}
            >
              {row.map((col, colIndex) => (
                <div
                  key={`col${colIndex}-row${rowIndex}`}
                  className="col"
                  onClick={() => setCell(rowIndex, colIndex)}
                >
                  {(col === 0) ? "" : col}
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

const CurrentSelector = ({ current, setter }) => {
  return (
    <div className="current-select">
      {
        [1,2,3,4,5,6,7,8,9].map(e => (
          <div
            key={`${e}-currentselect`}
            className={`${(e === current) ? "current" : ""}`}
            onClick={() => setter(e)}
            >
          {e}
          </div>
        ))
      }
    </div>
  )
}
export default App;
