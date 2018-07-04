import {TextToSpeech, SpeechToText} from './modules/speech.js';

let recActive = false;

export default class Events {
    static init() {
        console.info(`Registering events...`);
        this.registerChangeEvents();
        this.registerClickEvents();
        this.registerHoverEvents();
    }

    static registerClickEvents() {
        document.getElementById("speech-btn").addEventListener("click", function() {
            console.info("Button clicked!");

            function onRecActive() {
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
                document.getElementById("speech-result").classList.remove("invisible");
                document.getElementById("speech-result").classList.add("visible");
                document.getElementById("input-container").classList.remove("speech-box");
                document.getElementById("input-container").classList.add("flexible-speech-box");

                document.getElementById("speech-result").innerHTML = "Listening...";

                recActive = true;

                SpeechToText.record(
                    // Result
                    function(event) {
                        document.getElementById("speech-result").innerHTML = event.results[0][0].transcript;
                    },
                    // Error
                    function(event) {
                        console.log(`Error: ` + event.error);
                    },
                    // End
                    function(event) {
                        onRecInactive();
                    },
                    // No audio
                    function(event) {
                        // Toast about no audio detected here
                        console.log(`No audio detected`);
                    },
                    // No match
                    function(event) {
                        console.log(`No match`);
                    }
                );
            }

            function onRecInactive() {
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

                setTimeout(function() {
                    document.getElementById("speech-result").classList.remove("visible");
                    document.getElementById("speech-result").classList.add("invisible");
                    if (document.getElementById("input-container").clientHeight > 65) {
                        document.getElementById("input-container").classList.remove("flexible-speech-box");
                        document.getElementById("input-container").classList.add("speech-box");
                    }

                    document.getElementById("speech-result").innerHTML = "";
                }, 300);

                recActive = false;

                SpeechToText.stop();
            }

            if (!recActive) {
                onRecActive();
            }
            else {
                onRecInactive();
            }

        }, true);
    }

    static registerHoverEvents() {

    }

    static registerChangeEvents() {

    }
}
