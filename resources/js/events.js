import {TextToSpeech, SpeechToText} from './modules/speech.js';
import Site from './modules/site.js';

let inputActive = false;

export default class Events {
    static init() {
        console.info(`Registering events...`);
        this.registerChangeEvents();
        this.registerClickEvents();
        this.registerHoverEvents();
    }

    static registerClickEvents() {
        document.getElementById("speech-btn").addEventListener("click", function() {
            function onActive() {
                document.getElementById("speech-btn").classList.remove("pop-down");
                document.getElementById("speech-btn").classList.add("pop-up");

                document.getElementById("speech-btn").classList.remove("tooltipped");

                document.getElementById("mic-icon").classList.remove("mic-fade-white");
                document.getElementById("mic-icon").classList.add("mic-fade-orange");

                document.getElementById("mic-icon").classList.remove("fade-in");
                document.getElementById("mic-icon").classList.remove("fade-out");

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

                Site.getTooltipsOn("speech-btn")[0].tooltipEl.classList.add("invisible");
                Site.getTooltipsOn("keyboard-btn")[0].tooltipEl.classList.add("invisible");

                document.getElementById("speech-result").innerHTML = "Listening...";

                inputActive = true;

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
                        onInactive();
                    },
                    // No audio
                    function(event) {
                        // Warn the user about no audio being detected here
                        console.log(`No audio detected`);
                    },
                    // No match
                    function(event) {
                        console.log(`No match`);
                    }
                );
            }

            function onInactive() {
                document.getElementById("speech-btn").classList.remove("pop-up");
                document.getElementById("speech-btn").classList.add("pop-down");

                document.getElementById("speech-btn").classList.add("tooltipped");

                document.getElementById("mic-icon").classList.remove("mic-fade-orange");
                document.getElementById("mic-icon").classList.add("mic-fade-white");

                document.getElementById("mic-icon").classList.remove("fade-in");
                document.getElementById("mic-icon").classList.remove("fade-out");

                document.getElementById("keyboard-btn").classList.remove("pop-up-no-wave");
                document.getElementById("keyboard-btn").classList.add("pop-down");

                document.getElementById("keyboard-icon").classList.remove("fade-in");
                document.getElementById("keyboard-icon").classList.add("fade-out");

                document.getElementById("speech-result").classList.remove("speech-result-begin");
                document.getElementById("speech-result").classList.add("speech-result-finished");

                Site.getTooltipsOn("speech-btn")[0].close();
                Site.getTooltipsOn("keyboard-btn")[0].close();

                setTimeout(function() {
                    document.getElementById("speech-result").classList.remove("visible");
                    document.getElementById("speech-result").classList.add("invisible");
                    if (document.getElementById("input-container").clientHeight > 65) {
                        document.getElementById("input-container").classList.remove("flexible-speech-box");
                        document.getElementById("input-container").classList.add("speech-box");
                    }
                    document.getElementById("speech-result").innerHTML = "";
                }, 300);

                setTimeout(function() {
                    Site.getTooltipsOn("speech-btn")[0].tooltipEl.classList.remove("invisible");
                    Site.getTooltipsOn("keyboard-btn")[0].tooltipEl.classList.remove("invisible");
                }, 350);

                inputActive = false;

                SpeechToText.stop();
            }

            if (!inputActive) {
                onActive();
            }
            else {
                onInactive();
            }

        }, true);

        document.getElementById("keyboard-btn").addEventListener("click", function() {
            function onActive() {
                document.getElementById("speech-btn").classList.remove("pop-down");
                document.getElementById("speech-btn").classList.add("pop-up");

                document.getElementById("speech-btn").classList.remove("tooltipped");

                document.getElementById("keyboard-icon").classList.remove("mic-fade-white");
                document.getElementById("keyboard-icon").classList.add("mic-fade-orange");

                document.getElementById("keyboard-icon").classList.remove("fade-in");
                document.getElementById("keyboard-icon").classList.remove("fade-out");

                document.getElementById("keyboard-btn").classList.remove("pop-down");
                document.getElementById("keyboard-btn").classList.add("pop-up-no-wave");

                document.getElementById("mic-icon").classList.remove("fade-in");
                document.getElementById("mic-icon").classList.add("fade-out");

                document.getElementById("speech-result").classList.remove("speech-result-finished");
                document.getElementById("speech-result").classList.add("speech-result-begin");
                document.getElementById("speech-result").classList.remove("invisible");
                document.getElementById("speech-result").classList.add("visible");
                document.getElementById("input-container").classList.remove("speech-box");
                document.getElementById("input-container").classList.add("flexible-speech-box");

                Site.getTooltipsOn("speech-btn")[0].tooltipEl.classList.add("invisible");
                Site.getTooltipsOn("keyboard-btn")[0].tooltipEl.classList.add("invisible");

                inputActive = true;

            }

            function onInactive() {
                document.getElementById("speech-btn").classList.remove("pop-up");
                document.getElementById("speech-btn").classList.add("pop-down");

                document.getElementById("speech-btn").classList.add("tooltipped");

                document.getElementById("keyboard-icon").classList.remove("mic-fade-orange");
                document.getElementById("keyboard-icon").classList.add("mic-fade-white");

                document.getElementById("keyboard-btn").classList.remove("pop-up-no-wave");
                document.getElementById("keyboard-btn").classList.add("pop-down");

                document.getElementById("keyboard-icon").classList.remove("fade-in");
                document.getElementById("keyboard-icon").classList.remove("fade-out");

                document.getElementById("mic-icon").classList.remove("fade-in");
                document.getElementById("mic-icon").classList.add("fade-out");

                document.getElementById("speech-result").classList.remove("speech-result-begin");
                document.getElementById("speech-result").classList.add("speech-result-finished");

                Site.getTooltipsOn("speech-btn")[0].close();
                Site.getTooltipsOn("keyboard-btn")[0].close();

                setTimeout(function() {
                    document.getElementById("speech-result").classList.remove("visible");
                    document.getElementById("speech-result").classList.add("invisible");
                    if (document.getElementById("input-container").clientHeight > 65) {
                        document.getElementById("input-container").classList.remove("flexible-speech-box");
                        document.getElementById("input-container").classList.add("speech-box");
                    }
                    document.getElementById("speech-result").innerHTML = "";
                }, 300);

                setTimeout(function() {
                    Site.getTooltipsOn("speech-btn")[0].tooltipEl.classList.remove("invisible");
                    Site.getTooltipsOn("keyboard-btn")[0].tooltipEl.classList.remove("invisible");
                }, 350);

                inputActive = false;

                SpeechToText.stop();
            }

            if (!inputActive) {
                onActive();
            }
            else {
                onInactive();
            }

        }, true);
    }

    static registerHoverEvents() {

    }

    static registerChangeEvents() {

    }
}
