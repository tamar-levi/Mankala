import React from "react";
 
const Store=({stones})=>{
    return(
        <div className="store">
            {Array.from({length: stones}).map((_, index)=>(
                <div key={index} className="stone"></div>
            ))}
        </div>
    );
};
export default Store;