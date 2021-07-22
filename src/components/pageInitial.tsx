import React, { useState } from 'react'
import axios from 'axios'
import { iconeNoite, iconeDia } from './icons/iconesClima';
import './PageInitial.css';
import { RespostaPesquisaCidade, RespostaPesquisaTempoAtual } from './types';

const apiKey = "lzI09gyBAuWZzuUunr85lKxIXmbQwbGk";

function PageInitial(props: any) {
    const [state, setState] = useState('')
    const [cidade, setCidade] = useState({ temperatura: '', horario: '', tempo: {imagem: 0, texto: ''}, nomeCidade: '', DiaNoite:{} })

    async function buscar() { //#01 buscar a temperatura da cidade #02 pegar a temperatura 
        const resposta = await axios.get<RespostaPesquisaTempoAtual[]>(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${state}`)
        const respCidade = await axios.get<RespostaPesquisaCidade[]>(`http://dataservice.accuweather.com/currentconditions/v1/${resposta.data[0].Key}?apikey=${apiKey}`)
        const cidade = respCidade.data[0]
         setCidade({temperatura: `${cidade.Temperature.Metric.Value} C°`, 
                    horario: `${new Date(cidade.LocalObservationDateTime).toLocaleString()}`, 
                    tempo: {imagem: cidade.WeatherIcon, texto: cidade.WeatherText}, 
                    nomeCidade: state, 
                    DiaNoite: cidade.IsDayTime})
    }

    return (
        <div>
            <div>
                <span className="text titulo"><h1>Previsão do Tempo</h1></span>
                
                <div>
                    <input className="input" type="text" value={state} onChange={e => setState(e.target.value)} placeholder='Digite a cidade'/>
                    <button className="btn btn-secondary button" onClick={buscar}>Buscar</button>
                </div>
            </div> 
            <div className='container Card shadow-lg p-3 mb-5 bg-white'>
                <div className="city">
                    <h1>{cidade.nomeCidade}</h1>  
                </div>
                <div className="city-temp">
                    {cidade.temperatura}
                </div>

                <div>
                    {cidade.DiaNoite ? iconeDia :  iconeNoite}
                    <span>
                        {cidade.tempo.texto}
                    </span>   
                </div> 
            </div>
        </div>
    )
}

export default PageInitial