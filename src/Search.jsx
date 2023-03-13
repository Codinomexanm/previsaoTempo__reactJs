import React, { useState } from "react";

function Search(props){
  const [cidade,setCidade] = useState("");


  function detectarPesquisa(e){
    e.preventDefault();
    setCidade("");
    let currentValue = document.querySelector('input[name="searchInput"]').value;
    // fazer requisição API
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
     fetch(url)
     .then(response=> response.json())
     .then(data=>{
      const {main,name,sys,weather}= data;
      if (sys !== undefined){
        if (weather !== undefined){
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
          setCidade(`
          <div class="cidade">
          <p>temperatura: ${main.temp}</p>
          <p>Estado: ${sys.country}</p>
          <p>Cidade:${name}</p>
          <p>Previsão do tempo: ${weather[0]['description']}</p>
          <img src="${icon}" />
          </div>
          `)
        }
      }else{
        setCidade("")
      }
    
     })
  }


  return(
    <div className="wrapper">
    <div className="search">
      <h1>Pesquise</h1>
      <form onSubmit={(e)=>detectarPesquisa(e)}>
      <input placeholder={props.placeholder} type="text" name="searchInput" id="" />
      <input type="submit" value="Pesquisar" />
      </form>

    </div>
    {
      (cidade !== "")?
      <div dangerouslySetInnerHTML={{__html: cidade}} />:
      <div>qualquer coisa....</div>
    }
    </div>
  );
}

export default Search
