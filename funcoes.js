const buscar = async() =>{
    try{
      const response = await fetch("https://private-9e061d-piweb.apiary-mock.com/venda?state=rj&city=rio-de-janeiro");
      const data = await response.json();           
      //let buscarItens = data.estacoes.estacao     

      //exibir nome
      const nome = data.search.result.listings[0].link.name;
      const blocoApartamento = document.querySelector(".descricaoApartamento");
      blocoApartamento.innerText= nome;

      //Montando Endereco

      //rua
      const logradouro = data.search.result.listings[0].link.data.street;
      const enderecoLogradouro = document.querySelector(".logradouro");
      enderecoLogradouro.innerText = logradouro;
      
      //numero
      const numero = data.search.result.listings[0].link.data.streetNumber;
      const showNumero =document.querySelector(".numero")
      showNumero.innerText = numero;
      
      //bairro
      const bairro = data.search.result.listings[0].link.data.neighborhood;
      const showBairro = document.querySelector(".bairro");
      showBairro.innerText = bairro;

      
      //cidade
      const cidade = data.search.result.listings[0].link.data.city;
      const showCidade = document.querySelector(".cidade")
      showCidade.innerText = cidade;

      //estado
      const estado = data.search.result.listings[0].listing.address.stateAcronym;
      const showEstado = document.querySelector(".estado")
      showEstado.innerText = estado;
      
      //medida     
      const area = data.search.result.listings[0].listing.usableAreas[0];
      const showArea = document.querySelector(".area");
      showArea.innerText = area;

      console.log(data.search.result.listings[0].listing);


      //quartos
      const qtQuartos =  data.search.result.listings[0].listing.bedrooms;
      const showQtQuartos = document.querySelector(".qtQuartos");
      showQtQuartos.innerText = qtQuartos;

      //banheiros
      const qtBanheiros = data.search.result.listings[0].listing.bathrooms;
      const showBanheiros = document.querySelector(".qtBanheiros");
      showBanheiros.innerText = qtBanheiros;

      //vagas
      const qtVagas = data.search.result.listings[0].listing.parkingSpaces;
      const showVagas = document.querySelector(".qtVagas");
      showVagas.innerText = qtVagas;

      //Facilidades
      const faciliades = data.search.result.listings[0].listing.amenities[0];
      const showFacilidades = document.querySelector(".facilidades");
      showFacilidades.innerHTML = `<li>${faciliades} </li>`;
      
      //preço
      const preco = data.search.result.listings[0].listing.pricingInfos[0].price;
      const precoDecimal = parseFloat(preco).toFixed(2);
      console.log(precoDecimal);
      const showPreco = document.querySelector('.preco')
      showPreco.innerText = precoDecimal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

      //condominio
      const precoCondominio = data.search.result.listings[0].listing.pricingInfos[0].monthlyCondoFee;
      const precoCondominioDecimal = parseFloat(precoCondominio).toFixed(2);
      const showPrecoCondominio = document.querySelector(".condominio");
      showPrecoCondominio.innerHTML = precoCondominioDecimal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      
    }catch(err){
      console.log("ERROR", err);
    }
  }
  buscar();