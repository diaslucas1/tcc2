let potAtingir = document.getElementById("id_potassio_atingir");
let custoPot = document.getElementById("id_valor_potassio")
let teorPot = document.getElementById("id_potassio");
let fontePot = document.getElementById("id_fonte_potassio");
let teorCal = document.getElementById("id_calcio");
let teorMag = document.getElementById("id_magnesio");
let teorHAL = document.getElementById("id_hal");
let calcPot = [potAtingir, custoPot, teorPot, fontePot, teorCal, teorMag, teorHAL];

// itens readonly
let participPot = document.getElementById("id_particip_potassio");
participPot.readOnly = true;
let qntAplicarPot = document.getElementById("id_aplicar_potassio");
qntAplicarPot.readOnly = true;
let custoAplicarPot = document.getElementById("id_custo_potassio");
custoAplicarPot.readOnly = true;

// Potássio
function corrigePot() {
    let dadosPot = document.querySelector(".correcao-potassio");

    let partAtual = ((+teorPot.value) / ((+teorPot.value) + (+teorCal.value) + (+teorMag.value) + (+teorHAL.value)) * 100);
    
    // cálculo da quantidade a aplicar
    let relacDesejAtual = (teorPot.value * potAtingir.value / partAtual) - teorPot.value;
    let memCalc = relacDesejAtual * 39.1 * 10 * 2 * 1.2 * 100 / (85/100) / 100;

    let resultadoPot = 0;
    
    // cálculo de acordo com a fonte de potássio utilizada
    if(fontePot.value == 1) {
      resultadoPot = (memCalc * 100 / 58).toFixed(2); // 58 - Valor estático, correspondente a escolha da fonte de potásio
    }
    else if(fontePot.value == 2) {
      resultadoPot = (memCalc * 100 / 52).toFixed(2);
    }
    else if(fontePot.value == 3) {
      resultadoPot = (memCalc * 100 / 22).toFixed(2);
    }
    else if(fontePot.value == 4) {
      resultadoPot = (memCalc * 100 / 44).toFixed(2);
    }

    // cálculo do custo total
    let custoTotal = ((custoPot.value * resultadoPot * 2.42 / 1000) / 2.42).toFixed(2);

    // let alteraTemplPot = `
    //   <p>Participação atual do Potássio na CTC do solo: ${partAtual.toFixed(1)}</p>
    //   <p>Quantidade a aplicar: ${resultadoPot}</p>
    //   <p>Custo - R$/ha: ${custoTotal}</p>
    // `;

    
    if(potAtingir.value == "" || custoPot.value == "") {
      dadosPot.innerHTML = `<span class="label-resultado input-group-text text-center d-block">Preencha todos os campos para exibir os resultados!</span>`;
      participPot.value = "";
      qntAplicarPot.value = "";
      custoAplicarPot.value = "";
    }
    else {
      dadosPot.innerHTML = "";
      if(relacDesejAtual > 0.01) {
        participPot.value = `${partAtual.toFixed(1)}`;
        qntAplicarPot.value = `${resultadoPot}`;
        custoAplicarPot.value = `${custoTotal}`;
      } else {
        relacDesejAtual = 0.0;
        // dadosPot.innerHTML = `${alteraTemplPot}`;
        participPot.value = `${partAtual.toFixed(1)}`;
        qntAplicarPot.value = `${resultadoPot}`;
        custoAplicarPot.value = `${custoTotal}`;
      }
    }
   

  }
  calcPot.forEach((input) => {
    input.addEventListener('change', corrigePot);
  });