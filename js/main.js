// init speechsynth api
const synth = window.speechSynthesis;

// dom elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch');

// init voices array
let voices = [];

function getVoices(){
    voices = synth.getVoices();

    // loop througn voices and create an option for ecah one
    voices.forEach(voice =>{
        // create option element
        const option = document.createElement('option');
        //fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        // set needed option 
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}



// speak
const speak = function(){
    // check if speaking
    if(synth.speaking){
        console.error('already speaking...');
        return;
    }
    if(textInput.value !== ''){
        //get speak text
        const speaktext = new SpeechSynthesisUtterance(textInput.value);
        // speak end
        speaktext.onend = e =>{
            console.log('done speaking...');
        }

        // speak error
        speaktext.onerror = e => {
            console.error('something went wrong');
        }

        // selected voice 
        const selectedvoice = voiceSelect.selectedOptions[0].getAttribute('data-name'); 

        // loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedvoice){
                speaktext.voice = voice;
            }
        })

        //set pitch and rate
        speaktext.rate = rate.value;
        speaktext.pitch = pitch.value;

        //speak
        synth.speak(speaktext);
    }
};

//events listentes

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rateValue);
pitch.addEventListener('change', e =>  pitchValue.textContent = pitchValue);


// voice select change
voiceSelect.addEventListener('change', e => speak());



















