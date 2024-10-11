import React, { useState, useEffect } from 'react';
import JsonInput from './components/JsonInput';
import CsvOutput from './components/CsvOutput';
import Controls from './components/Controls';
import CsvTable from './components/CsvTable'; 
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [csvOutput, setCsvOutput] = useState('');
    const [tableData, setTableData] = useState([]);  
    const [error, setError] = useState('');

    const validateJsonStructure = (data) => {
        if (Array.isArray(data)) {
            const headers = Object.keys(data[0]);
            const isConsistent = data.every(item => 
                Object.keys(item).length === headers.length &&
                Object.keys(item).every(key => headers.includes(key))
            );
            
            if (!isConsistent) {
                throw new Error('Os objetos JSON têm chaves inconsistentes.');
            }
        }
    };

    const convertJsonToCsv = (data) => {
        let headers;
        let csvRows = [];

        if (Array.isArray(data)) {
            headers = Object.keys(data[0]);
            csvRows.push(headers.join(','));

            data.forEach(obj => {
                const values = headers.map(header => obj[header]);
                csvRows.push(values.join(','));
            });
        } else {
            headers = Object.keys(data);
            csvRows.push(headers.join(','));
            const values = headers.map(header => data[header]);
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    const handleConvert = () => {
        try {

            if (jsonInput.trim() === '') { 
                throw new Error('O campo JSON está vazio. Por favor, insira um JSON válido.');
            }
            setError('');
            const data = JSON.parse(jsonInput);

            if (!Array.isArray(data) && typeof data !== 'object') {
                throw new Error('O JSON deve ser um objeto ou um array de objetos.');
            }

            validateJsonStructure(data);

            const csv = convertJsonToCsv(data);
            setCsvOutput(csv);
            setTableData(Array.isArray(data) ? data : [data]);

            toast.success('JSON convertido com sucesso!');
        } catch (e) {
            toast.error('Por favor, insira um JSON válido.');
        }
    };

    const handleClear = () => {
        setJsonInput('');
        setCsvOutput('');
        setTableData([]);
        setError('');
        toast.info('Formulário limpo');
    };

    // Função para "Beautify" o JSON
    const handleBeautify = () => {
        try {
            const parsedJson = JSON.parse(jsonInput); 
            const beautifiedJson = JSON.stringify(parsedJson, null, 2);
            setJsonInput(beautifiedJson);
            toast.success('JSON formatado com sucesso!');
        } catch (e) {
            toast.error('Erro ao formatar o JSON.');
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="App container mt-5"> 
            <h1 className="text-center mb-4">JSON to CSV Converter (Yardim)</h1>
            <div className="card p-4 shadow"> 
                <JsonInput value={jsonInput} onChange={setJsonInput} />
                <Controls 
                    onConvert={handleConvert} 
                    onClear={handleClear} 
                    onBeautify={handleBeautify} 
                />
                {error && <p className="text-danger text-center">{error}</p>}
                <CsvOutput value={csvOutput} />
                <CsvTable data={tableData} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
