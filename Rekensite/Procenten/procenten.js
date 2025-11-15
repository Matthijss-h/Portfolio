    const antwoord_oud = document.getElementById('antwoord_input_oud');
    const antwoord_nieuw = document.getElementById('antwoord_input_nieuw');
    const procent = document.getElementById('input_percentage');
    const vermenigvuldigingsfactor = document.getElementById('output_vermenigvuldigen');
    const deleningsfactor = document.getElementById('output_delen');
    const factor = document.getElementById('select_factor');
    const oplossen = document.getElementById('oplossen');
    const reset = document.getElementById('reset');

    // Disable the button if the user hasn't filled in all the fields
    const disableButton = () => {
      if (
        (antwoord_oud.value && antwoord_nieuw.value && !procent.value) ||
        (antwoord_oud.value && procent.value && !antwoord_nieuw.value) ||
        (antwoord_nieuw.value && procent.value && !antwoord_oud.value)
      ) {
        oplossen.disabled = false;
      } else {
        oplossen.disabled = true;
      }
    };
    
    const notANumber = (input) => {
      input.value = input.value.replace(/[^0-9]/, "");
    };

    const inputs = [antwoord_oud, antwoord_nieuw, procent];
    inputs.forEach(input => {
      input.addEventListener("input", () => {
      disableButton();
      notANumber(input);
      });
    });

    oplossen.addEventListener('click', () => {
        const oldValue = parseFloat(antwoord_oud.value);
        const newValue = parseFloat(antwoord_nieuw.value);
        const procentValue = parseFloat(procent.value);

        // Check if the user chose percentage up or down
        if (antwoord_oud.value && procent.value && factor.value == "" || antwoord_nieuw.value && procent.value && factor.value == "") {
            alert("Kies een prijs omhoog of omlaag!");
        }

        if (antwoord_oud.value && antwoord_nieuw.value && !procent.value) {
            // Calculate percentage
            if (oldValue < newValue) {
                const percentageChange = ((newValue - oldValue) / oldValue) * 100;
                procent.value = percentageChange.toFixed(2);
                factor.value = 1;
            }else if (oldValue > newValue) {
                const percentageChange = ((oldValue - newValue) / oldValue) * 100;
                procent.value = percentageChange.toFixed(2);
                factor.value = 2;
            }
            // Prijs omhoog
        } else if (factor.value == 1) {
            vermenigvuldigingsfactor.innerHTML = (procentValue / 100 + 1).toFixed(2);
            deleningsfactor.innerHTML = (procentValue / 100 + 1).toFixed(2);
            if (antwoord_oud.value) {
                // oude prijs omhoog
                antwoord_nieuw.value = (oldValue * parseFloat(vermenigvuldigingsfactor.innerHTML)).toFixed(2);
            } else if (antwoord_nieuw.value) {
                // nieuwe prijs omhoog
                antwoord_oud.value = (newValue / parseFloat(deleningsfactor.innerHTML)).toFixed(2);
            }

            // Prijs omlaag
        } else if (factor.value == 2) {
            // Calculate percentage
            vermenigvuldigingsfactor.innerHTML = (2 - (procentValue / 100 + 1)).toFixed(2);
            deleningsfactor.innerHTML = (2 - (procentValue / 100 + 1)).toFixed(2);
            if (antwoord_oud.value) {
              // oude prijs omlaag
              antwoord_nieuw.value = (oldValue * parseFloat(vermenigvuldigingsfactor.innerHTML)).toFixed(2);
          } else if (antwoord_nieuw.value) {
                // nieuwe prijs omlaag
                antwoord_oud.value = (newValue / parseFloat(deleningsfactor.innerHTML)).toFixed(2);
            }
        } 
        disableButton();
    });

    // Reset all fields
    reset.addEventListener('click', () => {
        antwoord_oud.value = '';
        antwoord_nieuw.value = '';
        procent.value = '';
        vermenigvuldigingsfactor.innerHTML = '';
        deleningsfactor.innerHTML = '';
        factor.value = '';
        disableButton()
    });
