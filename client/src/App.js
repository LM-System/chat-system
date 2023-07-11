
import './App.css';
const io = require('socket.io-client')
const client = io.connect('http://localhost:3001')
function App() {
  return (
    <div className="App">
      <h3>Join A chat</h3>
      <input type="text" placeholder = "name"/>
    </div>
  );
}

export default App;
