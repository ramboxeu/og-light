let utter;

class TextToSpeech {
    static voicesChanged() {
        utter.voice = speechSynthesis.getVoices()[7];
        speechSynthesis.speak(utter);
    }

    static speak(options){
        utter = new SpeechSynthesisUtterance(options.text);
        utter.pitch = options.pitch;
        utter.rate = options.rate;
        utter.volume = options.volume;
        utter.lang = "en-US";
        speechSynthesis.onvoiceschanged = this.voicesChanged;
    }
}

class SpeechToText {
    static record(onRecResult, onRecError){
        console.log(`recording`);
        const rec = new webkitSpeechRecognition();
        rec.lang = "en";
        rec.onresult = onRecResult;
        rec.onerror = onRecError;
        rec.start();
    }
}

export {TextToSpeech, SpeechToText};