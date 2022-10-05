
 export function Square(props) {

   const clase = props.selected ? "square square-select": "square"
   
    return (
      


    
      <button className={clase} onClick={props.onClick}>
        {props.value}
      </button>
      
    

    );
  }
