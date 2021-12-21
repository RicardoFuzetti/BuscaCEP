import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Infos } from '../components/Infos'

import api from '../services/api';

import '../styles/buscador.scss';

export function Buscador() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    async function handleSearch() {

        // verificando input vazio
        if (input.trim() === '') {
            alert('Preencha o CEP!')
            return;
        }

        try {
            const response = await api.get(`${input}/json`); // pegando o CEP digitado no input
            setCep(response.data); // pegando os dados daquele CEP (Rua, Bairro, etc)
            setInput(''); // Deixando input vazio
            console.log(response.data)

        } catch {
            alert('Ops, algo deu errado!')
            setInput('');
        }

    }

    return (
        <div className="container">
            <h1>Buscador</h1>

            <div className="ContainerInput">
                <input
                    type="text"
                    placeholder="Digite o CEP..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)} /*pegando o valor digitado pelo usuário e passando para useState*/ />
                <button onClick={handleSearch}>
                    <FiSearch />
                </button>
            </div>


            {Object.keys(cep).length > 2 && ( // verificando se o CEP é válido
                <main>
                    <h2>CEP: {cep.cep} </h2>
                    <Infos dado={cep.logradouro} />
                    <Infos dado={cep.bairro} />
                    <Infos dado={cep.localidade + " - " + cep.localidade} />
                </main>
            )}
        </div >
    )
}