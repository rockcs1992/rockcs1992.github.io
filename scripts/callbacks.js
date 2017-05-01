import appData from './data.js';
import {waveGen,audioSample,SFX} from './ball.js';

var soundBalls = [];

const CB = {
	collision(){
		game.player.start();
	},

	addNewBall(){
		switch(appData.unitSelect){
		  case 'oscillator' : 
		  	soundBalls.push(new waveGen(appData.xPos,appData.yPos,appData.freq,appData.waveSelect));
		  	break;
		  case 'audioSample' : 
		  	soundBalls.push(new audioSample(appData.xPos,appData.yPos,appData.sampleSelect));
		  	break;
		  case 'SFX' : 
		  	const sfx = new SFX(appData.xPos,appData.yPos,appData.radius);
		  	for(let i=0;i<soundBalls.length;i++){
		  		if(soundBalls[i] instanceof audioSample){
		  			console.log(sfx.effect.__proto__);
		  			soundBalls[i].sample.connect(sfx.effect);
		  		}
		  		else {
		  			soundBalls[i].osc.connect(sfx.effect);
		  		}
		  	}
		  	break;
		}
	},

	handleClick(){
		this.osc.type = appData.waveSelect;
		this.text.setText("osc\n" + appData.waveSelect + "\n" + this.freq);
	}
};

export default CB;
