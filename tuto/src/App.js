import "./App.css";
import "./tuto.css";

function App() {
  let nombre = "matias";
  return (
    <div className="fondo">
      <h1> HOLA !  </h1>
      <input type="text" />
      <br />
     <p> HABLANDO EN REACT  </p>
    

      <div>{nombre}</div>
    </div>
  );
}

export default App;
