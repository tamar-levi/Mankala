import React from "react";

const Pit=({stones, onClick})=>{
    return(
        <div className="pit" onClick={onClick}>
            {Array.from({length:stones}).map((_, index)=> (
                <div key={index} className="stone"></div>
            ))}
        </div>
    );
};
export default Pit