import {Functions} from './modules/speech.js';
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
            Functions.toggleSpeech();
        }, true);

        document.getElementById("keyboard-btn").addEventListener("click", function() {
            Functions.toggleKeyboard();
        }, true);
    }

    static registerHoverEvents() {

    }

    static registerChangeEvents() {

    }
}
