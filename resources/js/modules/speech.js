let utter;
let rec;

let ttsSpeaking = false;

let recognizingSpeech = false;

class TextToSpeech {
    static voicesChanged() {

    }

    static init() {
        console.info("Initializing speech synthesis...")
        utter = new SpeechSynthesisUtterance(``);
        utter.pitch = 1;
        utter.rate = 1;
        utter.volume = 1;
        utter.lang = "en-US";
        speechSynthesis.speak(utter);
    }

    static speak(options){
        utter.text = options.text;
        utter.pitch = options.pitch;
        utter.rate = options.rate;
        utter.volume = options.volume;
        utter.lang = "en-GB";
        speechSynthesis.onvoiceschanged = this.voicesChanged;

        utter.voice = speechSynthesis.getVoices()[7];
        console.log(utter.voice);
        speechSynthesis.speak(utter);
    }
}

class SpeechToText {
    static init() {
        console.info("Initializing speech recognition...")
        rec = new webkitSpeechRecognition();
        rec.lang = "en-US";

        rec.onstart = () => {
            console.log(`Recognizing speech`);
            recognizingSpeech = true;
        }

        rec.continuous = true;
        rec.interimResults = true;
    }

    static record(onRecResult, onRecError, onRecEnd, onRecNoAudio, onRecNoMatch) {
        var result = {results: []};

        rec.onresult = (event) => {
            result = event;
            onRecResult(event);
            if (event.results[0].isFinal) {
                console.log(`End`);
                rec.stop();
            }
        }
        rec.onerror = onRecError;
        rec.onend = () => {
            recognizingSpeech = false;
            console.log(`Recognition finished (end)`);
            onRecEnd();
        }
        rec.onsoundend = () => {
            if (result.results === undefined || result.results.length == 0) onRecNoAudio();
        }
        rec.onnomatch = onRecNoMatch();

        rec.start();
    }

    static stop() {
        rec.abort();
    }
}

let recActive = false;
let result = "";
class Functions {
    static toggleSpeech(){
        if (!recActive) {
            this.onRecActive();
        }
        else {
            this.onRecInactive();
        }
    }

    static onRecActive(){
        document.getElementById("speech-btn").classList.remove("pop-down");
        document.getElementById("speech-btn").classList.add("pop-up");

        document.getElementById("mic-icon").classList.remove("mic-fade-white");
        document.getElementById("mic-icon").classList.add("mic-fade-orange");

        document.getElementById("keyboard-btn").classList.remove("pop-down");
        document.getElementById("keyboard-btn").classList.add("pop-up-no-wave");

        document.getElementById("keyboard-icon").classList.remove("fade-in");
        document.getElementById("keyboard-icon").classList.add("fade-out");

        document.getElementById("speech-result").classList.remove("speech-result-finished");
        document.getElementById("speech-result").classList.add("speech-result-begin");

        document.getElementById("speech-result").innerHTML = "Listening...";

        recActive = true;

        SpeechToText.record(
            // Result
            function(event){
                result = event.results[0][0].transcript;
                document.querySelector(`#speech-result`).innerHTML = result;
            },
            // Error
            function(event) {
                console.log(`Error: ` + event.error);
            },
            // End
            function(event){
                document.querySelector(`#finished-input`).innerHTML = result;
                Functions.toggleSpeech();
            },
            // No audio
            function(event) {
                console.log(`No audio detected`);
            },
            // No match
            function(event) {
                console.log(`No match`);
            }
        );
    }

    static onRecInactive(){
        document.getElementById("speech-btn").classList.remove("pop-up");
        document.getElementById("speech-btn").classList.add("pop-down");

        document.getElementById("mic-icon").classList.remove("mic-fade-orange");
        document.getElementById("mic-icon").classList.add("mic-fade-white");

        document.getElementById("keyboard-btn").classList.remove("pop-up-no-wave");
        document.getElementById("keyboard-btn").classList.add("pop-down");

        document.getElementById("keyboard-icon").classList.remove("fade-in");
        document.getElementById("keyboard-icon").classList.add("fade-out");

        document.getElementById("speech-result").classList.remove("speech-result-begin");
        document.getElementById("speech-result").classList.add("speech-result-finished");

        recActive = false;

        SpeechToText.stop();
    }
} 

export {TextToSpeech, SpeechToText, Functions};
