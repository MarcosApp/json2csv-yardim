import React from 'react';
import './CsvTable.css';

function CsvTable({ data }) {
    if (!data || data.length === 0) return null;

    const headers = Object.keys(data[0]);

    return (
        <div className="table-wrapper"> 
            <table className="table-bordered table-striped">
                <thead >
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex}>
                                    {typeof row[header] === 'object' ? (
                                        Array.isArray(row[header])
                                            ? row[header].map((item, i) => (
                                                <div key={i}>
                                                    {typeof item === 'object' ? JSON.stringify(item) : item}
                                                </div>
                                            ))
                                            : JSON.stringify(row[header])
                                    ) : (
                                        row[header] 
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CsvTable;
