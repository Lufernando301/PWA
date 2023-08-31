import ConsumoAgua from "./model/consumo_agua.js";

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let quantidade = document.getElementById("quantidade").value;
  quantidade = parseInt(quantidade);

  ConsumoAgua.salvar(quantidade);
  progress(quantidade);
  document.getElementById("quantidade").value = "";
});

async function registroDia() {
  let registers = await ConsumoAgua.getAll();
  let registersToday = registers.filter(filtrarData);
  registersToday.reverse();

  const list = document.getElementById("lista");

  registersToday.forEach((element) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent =
      new Date(element.timestamp).toLocaleString("pt-BR") +
      " - " +
      element.quantidade +
      "ml";

    list.append(li);
    progress(element.quantidade);
  });
}

async function todosRegistros() {
  let registros = await ConsumoAgua.getAll();
  registros.reverse();

  const listHistory = document.getElementById("lista-historico");

  registros.forEach((element) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent =
      new Date(element.timestamp).toLocaleString("pt-BR") +
      " - " +
      element.quantidade +
      "ml";

    listHistory.append(li);
  });
}

function filtrarData(element) {
  const day = new Date().getDay();
  if (day == new Date(element.timestamp).getDay()) return element;
}

/*
var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  dataAtual = dia + '/' + mes + '/' + ano;
  console.log(dataAtual);



  var data2 = elemento.timestamp.toLocaleString();

  if (data2 == dataAtual) {
    console.log("datas iguais");
  }
  else {
    console.log("datas difirentes");
  }*/


let progressValue = 0;
function progress(quantidade) {
  const currentConsumption = document.getElementById("quantity-current-consumption");
  const progressBar = document.getElementById("progress-bar");

  progressValue += quantidade;
  currentConsumption.innerText = progressValue;
  progressBar.style = "width: " + progressValue / 30 + "%";
}


registroDia();
todosRegistros();

