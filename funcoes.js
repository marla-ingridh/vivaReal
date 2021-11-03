const inputBuscar = document.querySelector('#inputBuscar');
const apartamentoContainer = document.querySelector(".listaApartamentos");
const paiApartamento = document.querySelector('.apartamento');
const exibirListaApartamentos = document.querySelector('.exibirListaApartamentos');
const resultPesquisa = document.querySelector('.resultPesquisa');
const imagemApartamento = document.querySelector('.imagemApartamento')



const apiURL = `https://private-9e061d-piweb.apiary-mock.com/venda?`

  const inserirApartamentosNaPagina = informacoesApartamentos => {
  const totalApartamentos = informacoesApartamentos.search.result.listings.length;
  const estado = informacoesApartamentos.search.result.listings[0].listing.address.stateAcronym;
  const cidade = informacoesApartamentos.search.result.listings[0].listing.address.city;
  
  exibirListaApartamentos.innerHTML += `
    <div class="linhaCinza" >
      <p class="resultadoBusca"> <span class="bold"> ${totalApartamentos} </span>Imóveis à venda em ${cidade} - ${estado} </p>    
      <p> <button class="btrestuladoBusca" > ${cidade} - ${estado}  x </button>  </p>            
    </div>
     <div class="listaApartamentos">
  `


  exibirListaApartamentos.innerHTML += informacoesApartamentos.search.result.listings.map( apartamento => `
    <div class="apartamento" >

      <div class="imagemApartamento">
        <img src="${apartamento.medias[0].url}" alt="" >
      </div>                      

      <div class="informApartamento">
        <div class="endereco"> 
          <span class="logradouro"> ${apartamento.link.data.neighborhood} </span> , 
          <span class="numero">  ${apartamento.link.data.streetNumber} </span> - 
          <span class="bairro"> ${apartamento.link.data.street} </span>, 
          <span class="cidade"> ${apartamento.link.data.city} </span> - 
          <span class="estado"> ${apartamento.link.data.state} </span> 
        </div>

        <div class="descricaoApartamento"> ${apartamento.link.name} </div> 

        <p class="detalhes"> 
          <span class="area"> ${apartamento.listing.totalAreas} </span> m2 
          <span class="qtQuartos">  ${apartamento.listing.bedrooms}</span>  Quartos 
          <span class="qtBanheiros">  ${apartamento.listing.bathrooms}</span>  Banheiros 
          <span class="qtVagas">  ${apartamento.listing.parkingSpaces}</span>  Vagas
        </p>
      </div>

      <div class="itensCondominio">
        <ul class="facilidades" >
          <li>Ar-condicionado</li>
          <li>Quadra poliesportiva</li>
          <li>Spa</li>
          <li>Salão de Festas</li>
          <li>Elevador</li>
        </ul>
      </div>

      <div>
        <p class="bold"> <span class="preco"> $ ${apartamento.listing.pricingInfos[0].price} </span></p>
        <p class="precoCondominio"> Condomínio:  <span class="bold condominio">R$ ${apartamento.listing.pricingInfos[0].monthlyCondoFee}</span> </p>
      </div>   
      
    </div>

  `).join(' ')

  exibirListaApartamentos.innerHTML += `</div>`
  
}

const buscarApartamentosApi = async (state,city) => {
  const response = await fetch(`${apiURL}state=${state}&city=${city}`)
  const data = await response.json()
  console.log(data)

  inserirApartamentosNaPagina(data)
}
const pesquisaNaoEncontrada = function(){
  
}
inputBuscar.addEventListener('blur', event => {

  //Retira espaços vazio do início e fim da pesquisa
  const searchTerm = inputBuscar.value.trim();

  if(searchTerm === 'São Paulo' || searchTerm === 'sp' ||  searchTerm === 'sao paulo' || searchTerm === 'São paulo' ||  searchTerm === 'Sao paulo' ){
    buscarApartamentosApi('sp','sao-paulo')
  }else if(searchTerm === 'Rio de Janeiro' || searchTerm === 'rj' || searchTerm === 'rio de janeiro' || searchTerm === 'rio' ){
    buscarApartamentosApi('rj','rio-de-janeiro')
  }else{

  }


  //verifica se não foi digitado nenhum valor
  if(!searchTerm){
    let titulo = document.createElement('h1');
    let texto = document.createTextNode('Digite uma cidade para pesquisa!');
    titulo.appendChild(texto);
    resultPesquisa.appendChild(titulo);
    exibirListaApartamentos.classList.add("ocultar");
    return
  }

})



