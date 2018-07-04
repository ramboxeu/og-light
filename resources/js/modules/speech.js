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

        rec.onstart = function() {
            console.log(`Recognizing speech`);
            recognizingSpeech = true;
        }

        rec.continuous = true;
        rec.interimResults = true;
    }

    static record(onRecResult, onRecError, onRecEnd, onRecNoAudio, onRecNoMatch) {
        var result = {results: []};

        rec.onresult = function(event) {
            result = event;
            onRecResult(event);
            if (event.results[0].isFinal) {
                console.log(`End`);
                rec.stop();
            }
        }
        rec.onerror = onRecError;
        rec.onend = function() {
            recognizingSpeech = false;
            console.log(`Recognition finished (end)`);
            onRecEnd();
        }
        rec.onsoundend = function() {
            if (result.results === undefined || result.results.length == 0) onRecNoAudio();
        }
        rec.onnomatch = onRecNoMatch();

        rec.start();
    }

    static stop() {
        rec.abort();
    }
}

export {TextToSpeech, SpeechToText};
