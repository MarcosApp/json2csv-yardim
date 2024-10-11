import React from 'react';
import './JsonInput.css';

function JsonInput({ value, onChange }) {
    return (
        <div className="form-group">
            <label>Insira o JSON:</label>
            <textarea
                className="form-control"
                placeholder="Cole o JSON aqui"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows="10"
            />
        </div>
    );
}

export default JsonInput;
