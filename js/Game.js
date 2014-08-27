BasicGame.Game = function(game) {

  //  When a State is added to Phaser it automatically has the following properties set on it,
  //  even if they already exist:

  // Phaser's Vars
  this.game;        //	a reference to the currently running game
  this.add;         //	used to add sprites, text, groups, etc
  this.camera;      //	a reference to the game camera
  this.cache;       //	the game cache
  this.input;       //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;        //	for preloading assets
  this.math;        //	lots of useful common math operations
  this.sound;       //	the sound manager - add a sound, play one, set-up markers, etc
  this.stage;       //	the game stage
  this.time;        //	the clock
  this.tweens;      //  the tween manager
  this.state;       //	the state manager
  this.world;       //	the game world
  this.particles;   //	the particle manager
  this.physics;     //	the physics manager
  this.rnd;         //	the repeatable random number generator

};

BasicGame.Game.prototype = {

  /**
   *==================================
   * Init();
   * Initialize game variables
   *==================================
   */
  initVars: function(){

  	//	Game
    // variables to handle keyboard input
    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;

   	//	Tiles
    this.Tiles = new Tiles(this.game);

    //  Create KeyBoard Inputs
    this.cursors = this.input.keyboard.createCursorKeys();

  },

  /**
   *==================================
   * DEFAULT PHASER'S AUTO FUNCTIONS
   *==================================
   */
  create: function() {

    this.initVars();

    //	Tiles
    this.Tiles.create();

    // at the beginning of the game we add two "2"
    this.Tiles.addTwo();
    this.Tiles.addTwo();

  },

  update: function() {

    //	Tiles
    this.Tiles.update();

    if (this.cursors.up.isDown) {
    	this.Tiles.moveUp();
    } else if (this.cursors.down.isDown) {
    	this.Tiles.moveDown();
    } else if (this.cursors.left.isDown) {
    	this.Tiles.moveLeft();
    } else if (this.cursors.right.isDown) {
    	this.Tiles.moveRight();
    }

  },

  //  Debug ...
  render: function() {},

  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
  */


  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
  */
  quitGame: function(pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    

    //	Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
