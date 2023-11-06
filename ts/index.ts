const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionTempoInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault(); // impede do formulario de recarregar a pagina

  if (!input || !sectionTempoInfos) return;
  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, 3 letras");
    return;
  }

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=c8c6927f10c9bf8819b08804b236ade3&lang=pt_br&units=metric`
    );

    const dados = await resposta.json();

    console.log(dados);

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: dados.weather[0].icon,
    };

    sectionTempoInfos.innerHTML = `
  <div class="tempo-data">
  <h2>${infos.local}</h2>

  <span>${infos.temperatura}ºC</span>
</div>

<img src="https://openweathermap.org/img/wn/${infos.icone}@2x.png" />
  `;
  } catch (erro) {
    console.log("Ocorreu um erro na obtenção dos dados da API. ", erro);
  }
});
