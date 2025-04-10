import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "MaxFlorescence"
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Maxine Kampbell
      </header>
      Under Construction!

      <header className="App-header">
        Projects
      </header>
      <ul>
        <li>
          2024 <a href="https://github.com/MaxFlorescence/spectral_redistricting">Congressional Redistricting Research</a>
        </li>
        <li>
          2024 <a href="https://github.com/CS-CS415-Spring2024/t09">Company Management Web App</a> (private)
        </li>
        <li>
          2024 <a href="https://github.com/CSU-CS214-Spring2014/assignment_autograding">GitHub Classroom Autograding Script</a> (private)
        </li>
        <li>
          2023 <a href="https://github.com/Blanchard-lab/6D-Pose-Annotation-Tool">6D-Pose Interpolation Script</a> (private)
        </li>
        <li>
          2022 <a href="https://github.com/MaxFlorescence/Blobby">3D Platformer Game</a>
        </li>
        <li>
          2021 <a href="https://github.com/CSU-CS-314-Fall-2021/t23">Trip Planner Web App</a> (private)
        </li>
      </ul>
    </div>
  );
}

export default App;
