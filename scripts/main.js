import 'pixi.js';
import 'p2';
import Phaser from 'phaser';
import GameState from './game.js';
import pitch from './pitch.js';


class Game extends Phaser.Game {

  constructor () {
	super(960, 640, Phaser.CANVAS, 'canvas', null);
    this.state.add('Game', GameState, false);
	this.state.start('Game');
  }
}

window.game = new Game();
window.effects = {};

var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

var synthWithPitch = new Set();
synthWithPitch.add('AMSynth').add('FMSynth').add('DuoSynth').add('MembaneSynth').add('Synth');

var synthWithoutPitch = new Set();
synthWithoutPitch.add('MetalSynth').add('NoiseSynth');

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log(data); // MIDI data [144, 63, 73]
    if(window.player !== undefined){
    	if(data[0] === 144){
            if(synthWithPitch.has(window.unitSelect)){
                window.player.triggerAttack(pitch[data[1]], 0.5);
            }
            else if(synthWithoutPitch.has(window.unitSelect)){
                window.player.triggerAttack();
            }

	    }
	    else if(data[0] === 128){
	    	window.player.triggerRelease();
	    }
    }
}
    



