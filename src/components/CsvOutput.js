import React from 'react';
import './CsvOutput.css';

function CsvOutput({ value }) {
    const renderValue = (val) => {
        if (typeof val === 'object') {
            return JSON.stringify(val, null, 2); 
        }
        return val; 
    };

    return (
        <div className="form-group mt-3">
            <label>CSV Resultante:</label>
            <textarea
                className="csv-output"
                value={renderValue(value)} 
                readOnly
                rows="10"
            />
        </div>
    );
}

export default CsvOutput;