import "./App.css";
import CounterApp from "./CounterApp";
import "./tuto.css";
function arrow(){
  console.log("funciona")
  alert("funciona ")
}

function App() {
  let nombre = "prueba";
  return (
    <div className="fondo">
      <h1> HOLA !  </h1>
      
      <CounterApp/>
      
      <button onClick={arrow}> BOTON </button>
      
      <input type="text" />
      <br />
     <p> Practica </p>
    

      <div>{nombre}</div>
    </div>
  );
}
//leer onClick 
export default App;
