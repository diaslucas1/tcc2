let calAtingir = document.getElementById("id_calcio_atingir");
let teorCao = document.getElementById("id_cao_corretivo");
// let fonteFosf = document.getElementById("id_fonte_fosforo");
let fonteCalMag = document.getElementById("id_fonte_calmag");
let prnt = document.getElementById("id_prnt");
let custoCalMag = document.getElementById("id_valor_calmag");
// let fosfAtingir = document.getElementById("id_fosforo_atingir");
// let eficFosf = document.getElementById("id_eficiencia_fosforo");
// let teorFosf = document.getElementById("id_fosforo");
// let teorCal = document.getElementById("id_calcio");
// let teorMag = document.getElementById("id_magnesio");
// let teorPot = document.getElementById("id_potassio");
// let teorHAL = document.getElementById("id_hal");
let calcCalMag = [calAtingir, teorCao, fonteFosf, fonteCalMag, prnt, custoCalMag, fosfAtingir, eficFosf, teorFosf, teorCal, teorCal, teorMag, teorPot, teorHAL];

// itens readonly
let participCalc = document.getElementById("id_particip_calc");
participCalc.readOnly = true;
let participMag = document.getElementById("id_particip_magnes");
participMag.readOnly = true;
let qntAplicarCalMag = document.getElementById("id_aplicar_calmag");
qntAplicarCalMag.readOnly = true;
let custoAplicarCalMag = document.getElementById("id_custo_calmag");
custoAplicarCalMag.readOnly = true;

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
      resultadoFosf = ((memCalc * 100) / 18);

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