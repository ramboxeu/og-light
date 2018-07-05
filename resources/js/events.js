import {Functions} from './modules/speech.js';
import Site from './modules/site.js';

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
            Functions.toggleSpeech();
        }, true);
    }

    static registerHoverEvents() {

    }

    static registerChangeEvents() {

    }
}
