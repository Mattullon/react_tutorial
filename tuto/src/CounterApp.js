

import React,{useState} from 'react'

const CounterApp = () => {
    const [counter,setCounter]= useState(0);
  return (
    
    <div>
         <button onClick={()=> setCounter(counter+1)}>
            incrementar
         </button>
         <button onClick={()=> setCounter(counter-1)}>
            decrementar
         </button>
         <button onClick={()=> setCounter(0)}>
            reiniciar
         </button>
         <h1> click : {counter}</h1>
         
    </div>
  )
}
//que es el scope 
//para que funciona en js 
//callbacks leer 


export default CounterApp