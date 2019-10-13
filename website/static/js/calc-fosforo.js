let fosfAtingir = document.getElementById("id_fosforo_atingir");
let teorFosf = document.getElementById("id_fosforo");
let fonteFosf = document.getElementById("id_fonte_fosforo");
let eficFosf = document.getElementById("id_eficiencia_fosforo");
let custoFosf = document.getElementById("id_valor_fosforo");
let calcFosf = [fosfAtingir, teorFosf, fonteFosf, eficFosf, custoFosf];

// Itens readonly
let qntAplicarFosf = document.getElementById("id_aplicar_fosforo");
qntAplicarFosf.readOnly = true;
let custoAplicarFosf = document.getElementById("id_custo_fosforo");
custoAplicarFosf.readOnly = true;

function corrigeFosf() {
    let dadosFosf = document.querySelector(".correcao-fosforo");

    // cálculos da quantidade a aplicar
    let difAtingirAtual = fosfAtingir.value - teorFosf.value.replace(",",".");
    let porcFosf = (eficFosf.value) / 100;
    let memCalc = (difAtingirAtual * 2 * 2.29 * 100) / porcFosf / 100;
    let resultadoFosf = 0;

    // cálculo de acordo com a fonte de fósforo utilizada
    if(fonteFosf.value == 1 || fonteFosf.value == 5 || fonteFosf.value == 12) {
      resultadoFosf = ((memCalc * 100) / 18).toFixed(2); // valor da fonte de fósforo estática
    }
    else if(fonteFosf.value == 2) {
      resultadoFosf = ((memCalc * 100) / 41).toFixed(2);
    }
    else if(fonteFosf.value == 3) {
      resultadoFosf = ((memCalc * 100) / 48).toFixed(2);
    }
    else if(fonteFosf.value == 4) {
      resultadoFosf = ((memCalc * 100) / 45).toFixed(2);
    }
    else if(fonteFosf.value == 6) {
      resultadoFosf = ((memCalc * 100) / 33).toFixed(2);
    }
    else if(fonteFosf.value == 7) {
      resultadoFosf = ((memCalc * 100) / 29).toFixed(2);
    }
    else if(fonteFosf.value == 8) {
      resultadoFosf = ((memCalc * 100) / 32).toFixed(2);
    }
    else if(fonteFosf.value == 9) {
      resultadoFosf = ((memCalc * 100) / 24).toFixed(2);
    }
    else if(fonteFosf.value == 10) {
      resultadoFosf = ((memCalc * 100) / 18.5).toFixed(2);
    }
    else if(fonteFosf.value == 11) {
      resultadoFosf = ((memCalc * 100) / 52).toFixed(2);
    }

    // custo total
    let custoTotal = ((custoFosf.value) * resultadoFosf * 2.42 / 1000 / 2.42).toFixed(2);

  //   let alteraTemplFosf = `
  //   <p>Quantidade a aplicar: ${resultadoFosf} kg/ha</p>
  //   <p>Custo - R$/ha: ${custoTotal}</p>
  // `;
    
  calcFosf.forEach((input) => {
    
      if(fosfAtingir.value == "" || eficFosf.value == "" || custoFosf.value == "") {
        dadosFosf.innerHTML = `<span class="label-resultado input-group-text text-center d-block">Preencha todos os campos para exibir os resultados!</span>`
        qntAplicarFosf.value = "";
        custoAplicarFosf.value = "";
      }
      else {
        dadosFosf.innerHTML = "";
        if(difAtingirAtual > 0.01) {
          qntAplicarFosf.value = `${resultadoFosf}`;
          custoAplicarFosf.value = `${custoTotal}`;
        } else {
          difAtingirAtual = 0.0;
          // dadosFosf.innerHTML = `${alteraTemplFosf}`;
          qntAplicarFosf.value = `${resultadoFosf}`;
          custoAplicarFosf.value = `${custoTotal}`;
        }
      }
           
  })

  }
  calcFosf.forEach((input) => {
    input.addEventListener('change', corrigeFosf);
  });