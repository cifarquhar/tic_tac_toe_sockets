import React, {useState} from 'react';
import './index.css';

const Square = ({value}) => {

  const [displayValue, setDisplayValue] = useState(null);
  
  return ( 
    <button className = "square" onClick={() => setDisplayValue("X")}> 
      {displayValue} 
    </button>
  );
    
}
  
export default Square;