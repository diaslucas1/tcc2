document.addEventListener("DOMContentLoaded", () => {
  class FormSteps {
    constructor(formId) {
      let multiForm = document.getElementById(formId),
          steps = multiForm.querySelectorAll(".step"),
          btnPrev = multiForm.querySelector(".btnPrev"),
          btnNext = multiForm.querySelector(".btnNext"),
          indicators = multiForm.querySelectorAll(".rounded-circle"),
          currentTab = 0;

      let inputs = document.querySelectorAll(".form-control");
      
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
      let fontePot = document.getElementById("id_fonte_potassio");
      let teorCal = document.getElementById("id_calcio");
      let teorMag = document.getElementById("id_magnesio");
      let teorHAL = document.getElementById("id_hal")
      let calcPot = [potAtingir, custoPot, teorPot, fontePot, teorCal, teorMag, teorHAL];

      // Cálcio e Magnésio
      let calAtingir = document.getElementById("id_calcio_atingir");
      let teorCao = document.getElementById("id_cao_corretivo");
      let fonteCalMag = document.getElementById("id_fonte_calmag");
      let prnt = document.getElementById("id_prnt");
      let custoCalMag = document.getElementById("id_valor_calmag");
      let calcCalMag = [calAtingir, teorCao, fonteFosf, fonteCalMag, prnt, custoCalMag, fosfAtingir, eficFosf, teorFosf, teorCal, teorCal, teorMag, teorPot, teorHAL]

      // Itens readonly
      let qntAplicarFosf = document.getElementById("id_aplicar_fosforo");
      qntAplicarFosf.readOnly = true;
      let custoAplicarFosf = document.getElementById("id_custo_fosforo");
      custoAplicarFosf.readOnly = true;

      let participPot = document.getElementById("id_particip_potassio");
      participPot.readOnly = true;
      let qntAplicarPot = document.getElementById("id_aplicar_potassio");
      qntAplicarPot.readOnly = true;
      let custoAplicarPot = document.getElementById("id_custo_potassio");
      custoAplicarPot.readOnly = true;

      let participCalc = document.getElementById("id_particip_calc");
      participCalc.readOnly = true;
      let participMag = document.getElementById("id_particip_magnes");
      participMag.readOnly = true;
      let qntAplicarCalMag = document.getElementById("id_aplicar_calmag");
      qntAplicarCalMag.readOnly = true;
      let custoAplicarCalMag = document.getElementById("id_custo_calmag");
      custoAplicarCalMag.readOnly = true;

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

        // inputs.forEach(input => {
        //   input.value.replace(",",".");
        // })
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
      // fonteFosf.addEventListener('change', corrigeFosf);




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

        let resultadoFosf, resultadoInterm, auxCalc, auxCalc2 = 0;
        
        // cálculos da quantidade a aplicar de acordo com a fonte de fósforo utilizada
        if(fonteFosf.value == 1 || fonteFosf.value == 5) {
          resultadoFosf = ((memCalc * 100) / 18).toFixed(2);

          auxCalc = resultadoFosf * 0.28 * 0.49924 / 1000;
          // 0,49924 - valor estático - depende do input da fonte de fósforo a utilizar

          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
              if(fonteCalMag.value == 1) {
                resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
              } else if(fonteCalMag.value == 2) {
                resultadoInterm = auxCalc + (56 * 0.01783);  
              } else if(fonteCalMag.value == 3) {
                resultadoInterm = auxCalc + (54 * 0.01783);  
              } else if(fonteCalMag.value == 4) {
                resultadoInterm = auxCalc + (29 * 0.01783);  
              } else if(fonteCalMag.value == 5) {
                resultadoInterm = auxCalc + (75.7 * 0.01783);  
              } else if(fonteCalMag.value == 6) {
                resultadoInterm = auxCalc + (35 * 0.01783);  
              }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;

        }
        else if(fonteFosf.value == 2) {
          resultadoFosf = ((memCalc * 100) / 41).toFixed(2);
          
          auxCalc = resultadoFosf * 0.2 * 0.33877 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 3) {
          resultadoFosf = ((memCalc * 100) / 48).toFixed(2);

          auxCalc = resultadoFosf * 0.09 * 0 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;

        }
        else if(fonteFosf.value == 4) {
          resultadoFosf = ((memCalc * 100) / 45).toFixed(2);

          auxCalc = resultadoFosf * 0.16 * 0 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;

        }
        else if(fonteFosf.value == 6) {
          resultadoFosf = ((memCalc * 100) / 33).toFixed(2);

          auxCalc = resultadoFosf * 0.52 * 0.92716 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;

        }
        else if(fonteFosf.value == 7) {
          resultadoFosf = ((memCalc * 100) / 29).toFixed(2);

          auxCalc = resultadoFosf * 0.52 * 0.92716 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 8) {
          resultadoFosf = ((memCalc * 100) / 32).toFixed(2);

          auxCalc = resultadoFosf * 0.45 * 0.80235 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 9) {
          resultadoFosf = ((memCalc * 100) / 24).toFixed(2);

          auxCalc = resultadoFosf * 0.28 * 0.49924 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 10) {
          resultadoFosf = ((memCalc * 100) / 18.5).toFixed(2);

          auxCalc = resultadoFosf * 0.44 * 0.795218 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 11) {
          resultadoFosf = ((memCalc * 100) / 52).toFixed(2);

          auxCalc = resultadoFosf * 0 * 0 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }
        else if(fonteFosf.value == 12) {
          resultadoFosf = ((memCalc * 100) / 18).toFixed(2); // valor da fonte de fósforo estática

          auxCalc = resultadoFosf * 0.18 * 0 / 1000;

          resultadoInterm;
          if(teorCao.value > 0.01) {
            resultadoInterm = auxCalc + (teorCao.value * 0.01783);
          } else {
            if(fonteCalMag.value == 1) {
              resultadoInterm = auxCalc + (30.4 * 0.01783); // 30.4 - valor estático - depende do input da fonte de corretivo a utilizar
            } else if(fonteCalMag.value == 2) {
              resultadoInterm = auxCalc + (56 * 0.01783);  
            } else if(fonteCalMag.value == 3) {
              resultadoInterm = auxCalc + (54 * 0.01783);  
            } else if(fonteCalMag.value == 4) {
              resultadoInterm = auxCalc + (29 * 0.01783);  
            } else if(fonteCalMag.value == 5) {
              resultadoInterm = auxCalc + (75.7 * 0.01783);  
            } else if(fonteCalMag.value == 6) {
              resultadoInterm = auxCalc + (35 * 0.01783);  
            }
          }

          auxCalc2 = ((teorCal.value * calAtingir.value) / partAtualCal) - teorCal.value - auxCalc;
        }

        let resultadoCalMag;
        if( (auxCalc2 / resultadoInterm) > 0.001 ) {
          resultadoCalMag = (auxCalc2 / resultadoInterm) * 100 / prnt.value;
        } else {
          resultadoCalMag = 0;
        }

        // cálculo do custo total
        let custoTotal = (resultadoCalMag * custoCalMag.value);
        
        // dadosCalMag.innerHTML = `
        //   <p>Participação atual do Cálcio na CTC do solo: ${partAtualCal.toFixed(1)}</p>
        //   <p>Participação atual do Magnésio na CTC do solo: ${partAtualMag.toFixed(1)}</p>
        //   <p>Quantidade a aplicar: ${resultadoCalMag.toFixed(2)}</p>
        //   <p>Custo - R$/ha: ${custoTotal.toFixed(2)}</p>
        // `;

        
        if(calAtingir.value == "" || prnt.value == "" || teorCal.value == "" || custoCalMag.value == "" ) {
          dadosCalMag.innerHTML = `<span class="label-resultado input-group-text text-center d-block">Preencha todos os campos para exibir os resultados!</span>`;
          participCalc.value = "";
          participMag.value = "";
          qntAplicarCalMag.value = "";
          custoAplicarCalMag.value = "";
        } else {
          dadosCalMag.innerHTML = "";
          participCalc.value = `${partAtualCal.toFixed(1)}`;
          participMag.value = `${partAtualMag.toFixed(1)}`;
          qntAplicarCalMag.value = `${resultadoCalMag.toFixed(2)}`;
          custoAplicarCalMag.value = `${custoTotal.toFixed(2)}`;
        }
       
      }
      calcCalMag.forEach((input) => {
        input.addEventListener('change', corrigeCalMag);
      });
    
      // inputs.forEach((input) => {
      //   input.addEventListener('change', function() {
      //     input.value.replace(",", ".");
      //   })
      // })

    }

  }
  let ms = new FormSteps("form-steps");
});