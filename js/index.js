"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfos = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // impede do formulario de recarregar a pagina
    if (!input || !sectionTempoInfos)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter, pelo menos, 3 letras");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=c8c6927f10c9bf8819b08804b236ade3&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (erro) {
        console.log("Ocorreu um erro na obtenção dos dados da API. ", erro);
    }
}));
