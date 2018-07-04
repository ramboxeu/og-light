import anims from './modules/animations.js';
import {TextToSpeech, SpeechToText} from './modules/speech.js';
import Events from './events.js';

class Light {
    // Main point
    static start(){
        console.log(`
 ___      ___   _______  __   __  _______
|   |    |   | |       ||  | |  ||       |
|   |    |   | |    ___||  |_|  ||_     _|
|   |    |   | |   | __ |       |  |   |
|   |___ |   | |   ||  ||       |  |   |
|       ||   | |   |_| ||   _   |  |   |
|_______||___| |_______||__| |__|  |___|
making your life brighter since 2018

by Rambox & Monczak
        `);
        console.info(`Starting...`);
        Events.init();
        TextToSpeech.init();
        SpeechToText.init();
        console.info(`All done!`);
    }
}

Light.start();
