let typing_text = document.querySelector('.text-of-typing > p');
let inputField = document.querySelector('.container .input-field');
let errorTag = document.querySelector('.errors span');
let timeTag = document.querySelector('.time span');
let wpmTag = document.querySelector('.wpm span');
let cpmTag = document.querySelector('.cpm span');
let button = document.querySelector('button');

let characterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = 0;


const randompara = () => {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typing_text.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typing_text.innerHTML += spanTag;
    })

    console.log(typing_text.querySelectorAll('span')[0].classList.add('active'));
    document.addEventListener('keydown', () => {
        inputField.focus();
    });
    typing_text.addEventListener('click', () => {
        inputField.focus()
    })

}

randompara();

const inputTyping = () => {
    let carrector = typing_text.querySelectorAll('span');
    let typeCarector = inputField.value.split("")[characterIndex];
    if (characterIndex < carrector.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typeCarector == null) {
            characterIndex--

            if (carrector[characterIndex].classList.contains('incorrect')) {
                errors--;
            }
            carrector[characterIndex].classList.remove('incorrect')
        } else {
            if (carrector[characterIndex].innerText == typeCarector) {
                carrector[characterIndex].classList.add('correct');
            } else {
                errors++
                carrector[characterIndex].classList.add('incorrect')
            }
            characterIndex++
        }

        carrector.forEach(span => {
            span.classList.remove('active');
        })
        carrector[characterIndex].classList.add('active');
        errorTag.innerText = errors;
        cpmTag.innerText = characterIndex - errors;

        let wpm = Math.round((((characterIndex - errors) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    }
}

inputField.addEventListener('input', inputTyping);

const initTimer = () => {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

const resetGame = () => {
    randompara();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = 0;
    errors = 0;
    isTyping = 0;
    timeTag.innerText = timeLeft;
    errorTag.innerText = errors;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}


button.addEventListener('click', resetGame);