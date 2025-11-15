const eenheden = ["mm", "cm", "dm", "m", "dam", "hm", "km"];

const dimension = document.getElementById("dimselect");
const opg = document.getElementById("opg_input");
const opgeenh = document.getElementById("opg_eenheid");
const antwoord = document.getElementById("antw_input");
const antwoordeenh = document.getElementById("antw_eenheid");
let antwoord_berekend = new Decimal('0');

function nieuw() {
    // Reset the answer input
    if (dimension.value === "") {
        alert("Kies eerst een dimensie!");
    }

    antwoord.value = "";

    const dim = new Decimal(dimension.value);
    const index_opg = Decimal.floor(Decimal.random() * eenheden.length);
    const index_antw = Decimal.floor(Decimal.random() * eenheden.length);

    // Set the unit with the appropriate dimension
    const dimSuffix = dim.equals(1) ? "" : `<sup>${dim}</sup>`;
    opgeenh.innerHTML = eenheden[index_opg] + dimSuffix;
    antwoordeenh.innerHTML = eenheden[index_antw] + dimSuffix;

    // Generate a random number for the problem
    const opgdec = new Decimal((Decimal.random() * 1000).toFixed(3));
    opg.value = opgdec.toString().replace('.', ',');

    // Calculate the correct answer
    const factor = Decimal.pow(10, dim);
    const aantalsprongen = Decimal.abs(index_opg.minus(index_antw));
    const verm_factor = factor.pow(aantalsprongen);

    antwoord_berekend = index_opg.lessThan(index_antw) ? opgdec.div(verm_factor) : opgdec.times(verm_factor);

    console.log("het berekende antwoord = " + antwoord_berekend.toString().replace('.', ','));
}

function displayResult(isCorrect, correctAnswer) {
    const resultCard = document.createElement('div');
    resultCard.classList.add('resultCard');

    if (isCorrect) {
        resultCard.style.backgroundColor = 'rgba(0, 128, 0)'; // Green with transparency
        resultCard.innerText = 'Correct! Well done!';
    } else {
        resultCard.style.backgroundColor = 'rgba(255, 0, 0)'; // Red with transparency
        resultCard.innerText = `Incorrect. The correct answer is ${correctAnswer.toString().replace('.', ',')}`;
    }

    document.body.appendChild(resultCard);

    // Fade in
    setTimeout(() => {
        resultCard.style.opacity = '1';
    }, 100);

    // Fade out
    setTimeout(() => {
        resultCard.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(resultCard);
        }, 1000);
    }, 10000);
}

function check() {
    // Clear all previous result cards
    document.querySelectorAll('.resultCard').forEach(card => card.remove());

    const antw_ingev = new Decimal(antwoord.value.replace(',', '.'));
    if (antw_ingev.equals(antwoord_berekend)) {
        console.log("goed");
        displayResult(true);
    } else {
        console.log("fout");
        displayResult(false, antwoord_berekend);
    }
}