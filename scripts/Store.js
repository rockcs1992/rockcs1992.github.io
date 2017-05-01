import Tone from 'tone'
const physicsParams = ['none','position-x','position-y','velocity-x','velocity-y','angle','angularVelocity','acceleration-x','acceleration-y','angularAcceleration'];
const ballColors = ['green','red','blue','cyan','yellow','purple','black'];
const envelopeSet = new Set();
envelopeSet.add('attack').add('decay').add('sustain').add('release');

const modulationEnvelopeSet = {
	modulationAttack : 'attack',
	modulationDecay : 'decay',
	modulationSustain : 'sustain',
	modulationRelease : 'release'
};

const filterSet = {
	filterRollOff : 'rolloff',
	filterQ : 'Q'
}

const paramType = {
	harmonicity : 'positive',   // greater than 0
	detune : 'cent',    //a hundredth of a semitone
	portamento : 'time',
	attack : 'time',
	decay : 'time',
	sustain : 'normal',
	release : 'time',
	modulationAttack : 'time',
	modulationDecay : 'time',
	modulationSustain : 'normal',
	modulationRelease : 'time',
	modulationIndex : 'positive',
	pitchDecay : 'time',
	octaves : 'positive',
	frequency : 'frequency',
//	resonance : 'frequency',    //特殊，metalsynth的时候是frequency，plucksynth的时候是normal
	attackNoise : 'attackNoise',  //[0.1,20]
	dampening : 'frequency',
	depth : 'normal',
	filterRollOff : 'rolloff',  //only accepts number -12,-24,-48,-96
	filterQ : 'positive',
	Q : 'positive',
	wet : 'normal',
	baseFrequency : 'frequency',
	sensitivity : 'decibel',   //[-10,10]
	bits : 'bits', //[1,8]
	order : 'positive',
	overSample : 'overSample', //[2x,4x,none]
	delayTime : 'normal', //[2,20]
	spread : 'degree', //[0,360],
	feedback :'normal',
	distortion : 'normal',
	roomSize : 'normal',
	vibratoRate : 'frequency',
	vibratoAmount : 'positive',
	harmonicity : 'positive'
}
const Store = {
	Synth : {
		Synth : {
			params : ['detune','attack','decay','sustain','release','modulationAttack','modulationDecay','modulationSustain','modulationRelease'],
			audio : new Tone.AMSynth().toMaster()
		},

		AMSynth : {
			params : ['harmonicity','detune','attack','decay','sustain','release','modulationAttack','modulationDecay','modulationSustain','modulationRelease'],
			audio : new Tone.AMSynth().toMaster()
		},

		DuoSynth : {
			params : ['vibratoAmount','vibratoRate','harmonicity'],
			audio : new Tone.DuoSynth().toMaster()
		},

		FMSynth : {
			params:['harmonicity','detune','modulationIndex','attack','decay','sustain','release','modulationAttack','modulationDecay','modulationSustain','modulationRelease'],
			audio : new Tone.FMSynth().toMaster()
		},

		MembraneSynth : {
			params:['pitchDecay','octaves','attack','decay','sustain','release'],
			audio : new Tone.MembraneSynth().toMaster()
		},

		MetalSynth : {
			params:['frequency','harmonicity','modulationIndex','resonance','octaves','attack','decay','release'],
			audio : new Tone.MetalSynth().toMaster()
		},

		NoiseSynth : {
			params:['attack','decay','release'],
			audio : new Tone.NoiseSynth().toMaster()
		},

		PluckSynth : {
			params:['attackNoise','dampening','resonace'],  //[0.1,20],frequency,[0,1]
			audio : new Tone.PluckSynth().toMaster()
		}
	},
	
	Effect : {
		AutoFilter : {
			params : ['frequency','depth','baseFrequency','octaves','filterRollOff','filterQ','wet'],
			audio : new Tone.AutoFilter("4n").toMaster().start()
		},

		AutoPanner : {
			params : ['frequency','depth','wet'],
			audio : new Tone.AutoPanner().toMaster().start()
		},

		AutoWah : {
			params : ['baseFrequency','octaves','sensitivity','Q', 'wet'],
			audio : new Tone.AutoWah(50, 6, -30).toMaster()
		},

		BitCrusher : {
			params : ['bits','wet'],
			audio : new Tone.BitCrusher(4).toMaster()
		},

		Chebyshev : {
			params : ['order','oversample','wet'],
			audio : new Tone.Chebyshev(50)
		},

		Distortion : {
			params : ['distortion','oversample','wet'],
			audio : new Tone.Distortion(0.8).toMaster()
		},

		FeedbackDelay : {
			params : ['delayTime','wet'],
			audio : new Tone.FeedbackDelay("8n",0.5).toMaster()
		},

		Freeverb : {
			params : ['roomSize','dampening','wet'],
			audio : new Tone.Freeverb().toMaster()
		},

		JCReverb : {
			params : ['roomSize','wet'],
			audio : new Tone.JCReverb(0.4).toMaster()
		},

		Phaser : {
			params : ['frequency','octaves','baseFrequency','Q','wet'],
			audio : new Tone.Phaser({
						"frequency" : 15, 
						"octaves" : 5, 
						"baseFrequency" : 1000
					}).toMaster()
		},

		PingPongDelay : {
			params : ['delayTime','feedback','wet'],
			audio : new Tone.PingPongDelay("4n",0.2).toMaster()
		},

		Tremolo : {
			params : ['frequency','depth','spread','wet'],
			audio : new Tone.Tremolo(9,0.75).toMaster()
		},

		Vibrato : {
			params : ['frequency','depth','wet'],
			audio : new Tone.Vibrato(5,0.1).toMaster()
		}
	},

	
}


function physicsMapping(mapping, unitSelect){
	let param = mapping.music;
	switch(paramType[param]){
		case 'positive' : return 10 * normalizePhysics.call(this,mapping.physics);break;
		case 'normal' : return normalizePhysics.call(this,mapping.physics);break;
		case 'cent' : return 50 * normalizePhysics.call(this,mapping.physics);break;
		case 'time' : return 5 * normalizePhysics.call(this,mapping.physics);break;
		case 'bits' : return 7 * normalizePhysics.call(this,mapping.physics) + 1; break;
		case 'degree' : return 360 * normalizePhysics.call(this,mapping.physics);break;
		case 'milliseconds' : return 18 * normalizePhysics.call(this,mapping.physics) + 2; break;
		case 'attackNoise' : return 19.9 * normalizePhysics.call(this,mapping.physics) + 0.1;break;
		case 'decibel' : return 20 * normalizePhysics.call(this,mapping.physics) - 10; break;
		case 'rolloff' : return -12 * Math.round(normalizePhysics.call(this,mapping.physics) / 0.25);break;
		case 'frequency' : {
			if(unitSelect === 'Tremolo' || unitSelect === 'Vibrato'){
				return 30 * normalizePhysics.call(this,mapping.physics);
			}
			else return 7000 * normalizePhysics.call(this,mapping.physics) + 1000;
		};break;
		case 'overSample' : {
			let x = Math.round(normalizePhysics.call(this,mapping.physics)/0.5);
			debugger;
			if(x === 0) return 'none';
			if(x === 1) return '2x';
			if(x === 2) return '4x';
		}; break;
		case 'resonance' : 

	}
}

//normalize All the Physics parameters between [0,1]
function normalizePhysics(physics){
	switch(physics){
		case 'position-x' : return this.position.x/960;break;
		case 'position-y' : return this.position.y/640;break;
		case 'velocity-x' : return this.body.velocity.x/800 + 0.5;break;//velocity range : [-400,400]
		case 'velocity-y' : return this.body.velocity.x/800 + 0.5;break;
		case 'angle' : return this.body.angle/720 + 0.5;break;    //angle range:[-360,360]
		case 'angularVelocity' : {
			let ret = this.body.angularVelocity/16 + 0.5;    //range [-8,8]
			if(ret < 0) return 0;
			if(ret > 1) return 1;
			else return ret;
		};

		case 'acceleration-x' : {
			let ret = this.body.getAccelerationX()/400 + 0.5; //range [-200,200];
			if(ret < 0) return 0;
			if(ret > 1) return 1;
			else return ret;
		};

		case 'acceleration-y' : {
			let ret = this.body.getAccelerationY()/400 + 0.5; //range [-200,200];
			if(ret < 0) return 0;
			if(ret > 1) return 1;
			else return ret;
		};

		case 'angularAcceleration' : {
			let ret = this.body.getAngularAcceleration()/2 + 0.5;
			if(ret < 0) return 0;
			if(ret > 1) return 1;
			else return ret;
		};
	}
}


export {Store,physicsParams,physicsMapping,ballColors,envelopeSet,modulationEnvelopeSet,filterSet};