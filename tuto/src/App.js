import "./App.css";
import "./tuto.css";
import imagen from "./bet.png";
function App() {
  let nombre = "matias";
  return (
    <div className="fondo">
      <h1> hola, Practicando React </h1>
      <input type="text" />
      <br />
      <img src={imagen} className="im" />
      <div>{nombre}</div>
    </div>
  );
}

export default App;
