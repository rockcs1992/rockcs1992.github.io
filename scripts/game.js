import Phaser from 'phaser';
import Tone from 'tone';
import {controllerBall} from './ball.js';
import CB from './callbacks.js';
export default class extends Phaser.State {

	init(){}
	preload(){
		game.load.image('ball', 'assets/ball.png');
	    game.load.image('ball_green', 'assets/ball_green.png');
	    game.load.image('ball_black', 'assets/ball_black.png');
	    game.load.image('ball_blue','assets/ball_blue.png');
	    game.load.image('ball_cyan','assets/ball_cyan.png');
	    game.load.image('ball_purple','assets/ball_purple.png');
	    game.load.image('ball_red','assets/ball_red.png');
	    game.load.image('ball_yellow','assets/ball_yellow.png');
	    game.load.physics("ball_physics", "assets/ball.json");
	}

	create(){
		game.world.setBounds(0, 0, 960, 640);  //   Enable p2 physics
	    game.stage.backgroundColor = '#d9dce1';
		game.physics.startSystem(Phaser.Physics.P2JS);
	 // game.physics.p2.setBoundsToWorld(true, true, true, true, false);
	    game.physics.p2.setImpactEvents(true);
	    game.physics.p2.updateBoundsCollisionGroup();
	    game.physics.p2.restitution = 1;    //  Make things a bit more bouncey
	    game.add.text(20, 20, 'move the ball with arrow keys!', { fill: '#ffffff' });


	    game.cursors = game.input.keyboard.createCursorKeys();
    	game.mouse = game.input.mouse;
    	game.myCollisionGroup = game.physics.p2.createCollisionGroup();
    	// game.graphics = game.add.graphics(game.world.centerX, game.world.centerY);
    	new controllerBall();
	}

	update(){
		// var distance1 = game.sfx.distanceWith(game.wav);
		// var distance2 = game.sfx2.distanceWith(game.wav);
		// if(distance1 < 250){
		// 	if(!game.sfx.connected){ 
		// 		game.wav.sample.connect(game.sfx.effect);
		// 		game.sfx.connected = true;
		// 	}
		// 	game.sfx.effect.wet.value = -0.00617 * distance1 + 1.5432;
		// }
		// else{
		// 	if(game.sfx.connected){
		// 		game.wav.sample.disconnect().toMaster();
		// 		game.sfx.connected = false;
		// 	}
		// }

		// if(distance2 < 250){
		// 	if(!game.sfx2.connected){ 
		// 		game.wav.sample.connect(game.sfx2.effect);
		// 		game.sfx2.connected = true;
		// 	}
		// 	game.sfx2.effect.wet.value = -0.00617 * distance2 + 1.5432;
		// }
		// else{
		// 	if(game.sfx2.connected){
		// 		game.wav.sample.disconnect().toMaster();
		// 		game.sfx2.connected = false;
		// 	}
			
		// }
	}
}