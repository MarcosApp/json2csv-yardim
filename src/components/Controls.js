import React from 'react';
import './Controls.css';


function Controls({ onConvert, onClear, onBeautify }) {  
    return (
        <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-success" onClick={onConvert}>
                Converter
            </button>
            <button className="btn btn-danger" onClick={onClear}>
                Limpar
            </button>
            <button className="btn btn-primary" onClick={onBeautify}>
                Formata JSON
            </button>  
        </div>
    );
}

export default Controls;
