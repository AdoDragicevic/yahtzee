import './App.css';
import Game from "./Game";
import rules from "./rules";

function App() {
  return (
    <div className="App">
        <Game nOfDices={5} rules={rules} />
    </div>
  );
}

export default App;
