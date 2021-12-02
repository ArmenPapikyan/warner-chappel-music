import React from "react";
import {TiArrowUnsorted} from "react-icons/ti";


const FilterSort= ()=> {
    return (
        <div style={{textAlign:'right'}} className="fw-bold">
            <div className="mb-1" >
                <span className="me-1">SONG TITLE</span>
                <TiArrowUnsorted/>
            </div>
            <div>
                <span className="me-1">CREATION YEAR</span>
                <TiArrowUnsorted/>
            </div>
        </div>
    )
}

export default FilterSort