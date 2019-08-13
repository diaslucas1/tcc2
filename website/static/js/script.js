document.addEventListener("DOMContentLoaded", () => {
  class FormSteps {
    constructor(formId) {
      let multiForm = document.getElementById(formId),
          steps = multiForm.querySelectorAll(".step"),
          btnPrev = multiForm.querySelector(".btnPrev"),
          btnNext = multiForm.querySelector(".btnNext"),
          indicators = multiForm.querySelectorAll(".rounded-circle"),
          currentTab = 0;
      
      // variáveis para utilizar nos cálculos de correção
      // Fósforo
      let fosfAtingir = document.getElementById("id_fosforo_atingir");
      let teorFosf = document.getElementById("id_fosforo");
      let fonteFosf = document.getElementById("id_fonte_fosforo");
      let eficFosf = document.getElementById("id_eficiencia_fosforo");
      let custoFosf = document.getElementById("id_valor_fosforo");
      let calcFosf = [fosfAtingir, teorFosf, fonteFosf, eficFosf, custoFosf];

      // Potássio
      let potAtingir = document.getElementById("id_potassio_atingir");
      let custoPot = document.getElementById("id_valor_potassio")
      let teorPot = document.getElementById("id_potassio");
      let teorCal = document.getElementById("id_calcio");
      let teorMag = document.getElementById("id_magnesio");
      let teorHAL = document.getElementById("id_hal")
      let calcPot = [potAtingir, custoPot, teorPot, teorCal, teorMag, teorHAL];

      // Cálcio e Magnésio
      let calAtingir = document.getElementById("id_calcio_atingir");
      let teorCao = document.getElementById("id_cao_corretivo");
      let prnt = document.getElementById("id_prnt");
      let custoCalMag = document.getElementById("id_valor_calmag");
      let calcCalMag = [calAtingir, teorCao, prnt, custoCalMag, fosfAtingir, eficFosf, teorFosf, teorCal, teorCal, teorMag, teorPot, teorHAL]

      showTab(currentTab);

      function showTab(n) {
        steps[n].classList.add("active");
        if (n === 0) {
          btnPrev.classList.add("hide");
          btnPrev.classList.remove("show");
        } else {
          btnPrev.classList.add("show");
          btnPrev.classList.remove("hide");
        }
        if (n === steps.length - 1) {
          btnNext.textContent = "Enviar";
          // btnNext.setAttribute('type', 'submit');
        } else {
          btnNext.textContent = "Próximo";
        }
        showIndicators(n);
      }
      
      function showIndicators(n) {
        for (let i = 0; i < indicators.length; i++) {
          indicators[i].classList.replace("bg-warning", "bg-success");
        }
        indicators[n].className += " bg-warning";
      }
      
      function clickButton(n) {
        if (n == 1 && !validateForm()) return false;
        steps[currentTab].classList.remove("active");
        currentTab += n;
        if (currentTab >= steps.length) {
          multiForm.submit();
          return false;
        }
        showTab(currentTab);
      }


      //função de validar
      function validateForm() {
        let inputs = steps[currentTab].querySelectorAll(".form-control"),
            valid = true;
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].value == "") {
            if (!inputs[i].classList.contains("invalid")) {
            inputs[i].classList.add("invalid");
            }
            valid = false;
          }
          if (!inputs[i].value == "") {
            if (inputs[i].classList.contains("invalid")) {
              inputs[i].classList.remove("invalid");
            } 
          }
        }
        return valid;

        // inputs.value.replace(",","."); TROCAR VÍRGULA

      }

      btnPrev.addEventListener("click", () => {
        clickButton(-1);
      });

      btnNext.addEventListener("click", () => {
        clickButton(1);
      })

      // Cálculos da planilha para correção/recuperação
      // Fósforo
      function corrigeFosf() {
        let dadosFosf = document.querySelector(".correcao-fosforo");

        // cálculos da quantidade a aplicar
        let difAtingirAtual = fosfAtingir.value - teorFosf.value;
        let porcFosf = (eficFosf.value) / 100;
        let memCalc = (difAtingirAtual * 2 * 2.29 * 100) / porcFosf / 100;
        let resultadoFosf = ((memCalc * 100) / 18).toFixed(2); // valor da fonte de fósforo estática

        // custo total
        let custoTotal = ((custoFosf.value) * resultadoFosf * 2.42 / 1000 / 2.42).toFixed(2);

        let alteraTemplFosf = `
        <p>Quantidade a aplicar: ${resultadoFosf}</p>
        <p>Custo - R$/ha: ${custoTotal}</p>
      `;
        
        if(difAtingirAtual > 0.01) {
          dadosFosf.innerHTML = `${alteraTemplFosf}`;
        } else {
          difAtingirAtual = 0.0;
          dadosFosf.innerHTML = `${alteraTemplFosf}`;
        }

      }
      calcFosf.forEach((input) => {
        input.addEventListener('keyup', corrigeFosf);
      });

      // Potássio
      function corrigePot() {
        let dadosPot = document.querySelector(".correcao-potassio");

        let partAtual = ((+teorPot.value) / ((+teorPot.value) + (+teorCal.value) + (+teorMag.value) + (+teorHAL.value)) * 100);
        
        // cálculo da quantidade a aplicar
        let relacDesejAtual = (teorPot.value * potAtingir.value / partAtual) - teorPot.value;
        let memCalc = relacDesejAtual * 39.1 * 10 * 2 * 1.2 * 100 / (85/100) / 100;
        let resultadoPot = (memCalc * 100 / 58).toFixed(2) // 58 - Valor estático, correspondente a escolha da fonte de potásio

        // cálculo do custo total
        let custoTotal = ((custoPot.value * resultadoPot * 2.42 / 1000) / 2.42).toFixed(2);

        let alteraTemplPot = `
          <p>Participação atual do Potássio na CTC do solo: ${partAtual.toFixed(1)}</p>
          <p>Quantidade a aplicar: ${resultadoPot}</p>
          <p>Custo - R$/ha: ${custoTotal}</p>
        `;

        if(relacDesejAtual > 0.01) {
          dadosPot.innerHTML = `${alteraTemplPot}`; 
        } else {
          relacDesejAtual = 0.0;
          dadosPot.innerHTML = `${alteraTemplPot}`;
        }
      }
      calcPot.forEach((input) => {
        input.addEventListener('keyup', corrigePot);
      });

      // Cálcio e Magnésio
      function corrigeCalMag() {
        let dadosCalMag = document.querySelector(".correcao-calmag");

        let partAtualAux = (+teorCal.value) + (+teorMag.value) + (+teorPot.value) + (+teorHAL.value);
        let partAtualCal = ((+teorCal.value) / (partAtualAux) * 100);
        let partAtualMag = ((+teorMag.value) / (partAtualAux) * 100);

        // partIdealCal e partIdealMag - dependem da textura do solo

        // reutilizando cálculos da quantidade a aplicar do Fósforo
        let difAtingirAtual = fosfAtingir.value - teorFosf.value;
        let porcFosf = (eficFosf.value) / 100;
        let memCalc = (difAtingirAtual * 2 * 2.29 * 100) / porcFosf / 100;
        let resultadoFosf = ((memCalc * 100) / 18); // valor da fonte de fósforo estática

        // cálculos da quantidade a aplicar
        let auxCalc = resultadoFosf * 0.28 * 0.49924 / 1000; // 0.28 - valor estático - depende do input da fonte de fósforo a utilizar
        // 0,49924 - valor estático - depende do input da fonte de fósforo a utilizar

        let resultadoInterm;
        if(teorCao.value > 0.01) {
          resultadoInterm = auxCalc + (teorCao.value * 0.01783);
        } else {
          resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte a utilizar
        }

        let auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        let resultadoCalMag;
        if( (auxCalc2 / resultadoInterm) > 0.001 ) {
          resultadoCalMag = (auxCalc2 / resultadoInterm) * 100 / prnt.value;
        } else {
          resultadoCalMag = 0;
        }

        // cálculo do custo total
        let custoTotal = (resultadoCalMag * custoCalMag.value);
        
        dadosCalMag.innerHTML = `
          <p>Participação atual do Cálcio na CTC do solo: ${partAtualCal.toFixed(1)}</p>
          <p>Participação atual do Magnésio na CTC do solo: ${partAtualMag.toFixed(1)}</p>
          <p>Quantidade a aplicar: ${resultadoCalMag.toFixed(2)}</p>
          <p>Custo - R$/ha: ${custoTotal.toFixed(2)}</p>
        `;
      }
      calcCalMag.forEach((input) => {
        input.addEventListener('keyup', corrigeCalMag);
      });
    }
  }
  let ms = new FormSteps("form-steps");
});