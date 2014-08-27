
/**
 *
 *  Class Tiles
 *
 *  Tiles enemie Class
 *
 */

Tiles = function ( game ) {

    //  Game's vars
    this.game = game;

    // game array, starts with all cells to zero
    this.fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

    // at the beginning of the game, the player cannot move
    this.canMove = false;

    //  Tiles
    // tile width, in pixels
    this.tileSize = 100;
    // this is the group which will contain all tile sprites
    this.tileSprites = null;
    // colors to tint tiles according to their value
    this.colors = {
      2:0xFFFFFF,
      4:0xFFEEEE,
      8:0xFFDDDD,
      16:0xFFCCCC,
      32:0xFFBBBB,
      64:0xFFAAAA,
      128:0xFF9999,
      256:0xFF8888,
      512:0xFF7777,
      1024:0xFF6666,
      2048:0xFF5555,
      4096:0xFF4444,
      8192:0xFF3333,
      16384:0xFF2222,
      32768:0xFF1111,
      65536:0xFF0000
    }

};

Tiles.prototype = {

  /**
   *
   *  FUNCTION create();
   *
   *  Constructor, init
   *
   */
  create: function(){

    // sprite group declaration
    this.tileSprites = this.game.add.group();

  },

  /**
   *
   *  FUNCTION update();
   *
   *  EnterFrame, process timed events
   *
   */
  update: function(){

    


  },

  //  Debug function
  render: function(){},
  
  




  /**
   *==================================
   * MISC FUNCTIONS
   * Custom made function
   *==================================
   */

   /**
   *
   *  FUNCTION addTwo();
   *
   *
   *
   */
  addTwo: function() {

  	// choosing an empty tile in the field
		do{
			var randomValue = Math.floor(Math.random()*16);
		} while (this.fieldArray[randomValue]!= 0)
		// such empty tile now takes "2" value
		this.fieldArray[randomValue] = 2;
		console.log(randomValue);
		console.log(this.fieldArray);
  	// creation of a new sprite with "tile" instance, that is "tile.png" we loaded before
		var tile = this.game.add.sprite( this.toCol(randomValue) * this.tileSize, this.toRow(randomValue) * this.tileSize, "tile" );
		// creation of a custom property "pos" and assigning it the index of the newly added "2"
		tile.pos = randomValue;
		// at the beginning the tile is completely transparent
		tile.alpha = 0;
		// creation of a text which will represent the value of the tile
		var text = this.game.add.text( this.tileSize/2, this.tileSize/2, "2", {font:"bold 16px Arial",align:"center"} );
    // setting text anchor in the horizontal and vertical center
		text.anchor.set(0.5);
		// adding the text as a child of tile sprite
		tile.addChild(text);
		// adding tile sprites to the group
		this.tileSprites.add(tile);

		// creation of a new tween for the tile sprite
		var fadeIn = this.game.add.tween(tile);
		// the tween will make the sprite completely opaque in 250 milliseconds
		fadeIn.to({alpha:1},250);

		var me = this;
		// tween callback
		fadeIn.onComplete.add(function(){
			// updating tile numbers. This is not necessary the 1st time, anyway
			me.updateNumbers();
			// now I can move
			me.canMove = true;
			console.log("canMove");
		});
		// starting the tween
		fadeIn.start();

  },

  /**
   *
   *  FUNCTION toRown(n);
   *
   *
  */
  toRow: function(n) {

  	return Math.floor(n/4);

  },

  /**
   *
   *  FUNCTION toCol(n);
   *
   *
  */
  toCol: function(n) {

  	return n%4;	

  },

  /**
   *
   *  FUNCTION updateNumbers();
   *
   *
  */
  updateNumbers: function() {
  	console.log(this.fieldArray);
  	var me = this;
  	// look how I loop through all tiles
		this.tileSprites.forEach(function(item){
			// retrieving the proper value to show
			var value = me.fieldArray[item.pos];
			// showing the value
			item.getChildAt(0).text = value;
			// tinting the tile
			item.tint = me.colors[value];
		});	

  },

   /**
   *
   *  FUNCTION moveUp();
   *
   *
   *
   */
  moveUp: function() {

    if(this.canMove){

      this.canMove = false;

      var moved=false;

			this.tileSprites.sort("y",Phaser.Group.SORT_ASCENDING);

			var me = this;
			this.tileSprites.forEach(function(item){
				var row = me.toRow(item.pos);
				var col = me.toCol(item.pos);

				if(row>0){  
        	var remove=false;
					for(i=row-1;i>=0;i--){
						if(me.fieldArray[i*4+col] != 0){
							if(me.fieldArray[i*4+col] == me.fieldArray[row*4+col]){
								remove = true;
								i--;                                             
							}
             	break
						}
					}
					if(row!=i+1){
          	moved=true;
          	me.moveTile(item, row * 4 + col, (i + 1) * 4 + col, remove);
					}
				}
			});

			this.endMove(moved);

  	}

  },

  /**
   *
   *  FUNCTION moveDown();
   *
   *
   *
   */
  moveDown: function() {

  	if(this.canMove){
    	this.canMove = false;
      var moved = false;

			this.tileSprites.sort("y",Phaser.Group.SORT_DESCENDING);

			var me = this;
			this.tileSprites.forEach(function(item){
				var row = me.toRow(item.pos);
				var col = me.toCol(item.pos);
				if(row<3){
        	var remove = false;
					for(i=row+1;i<=3;i++){
						if(me.fieldArray[i*4+col] != 0){
							if(me.fieldArray[i*4+col] == me.fieldArray[row*4+col]){
								remove = true;
								i++;                                             
							}
            	break
						}
					}
					if(row!=i-1){
          	moved=true;
						me.moveTile(item, row*4+col, (i-1)*4+col, remove);
					}
				}
			});

     	this.endMove(moved);

		}

  },

  /**
   *
   *  FUNCTION moveLeft();
   *
   *
   *
   */
  moveLeft: function() {
  	console.log(this.canMove);
    // Is the player allowed to move?
    if(this.canMove){

      // the player can move, let's set "canMove" to false to prevent moving again until the move process is done
      this.canMove = false;

      // keeping track if the player moved, i.e. if it's a legal move
      var moved = false;
      // look how I can sort a group ordering it by a property
			this.tileSprites.sort( "x", Phaser.Group.SORT_ASCENDING);

			var me = this;
			// looping through each element in the group
			this.tileSprites.forEach(function(item){

				// getting row and column starting from a one-dimensional array
				var row = me.toRow(item.pos);
				var col = me.toCol(item.pos);

				// checking if we aren't already on the leftmost column (the tile can't move)
				if(col>0){
					// setting a "remove" flag to false. Sometimes you have to remove tiles, when two merge into one 
					var remove = false;
					// looping from column position back to the leftmost column
					for(i=col-1;i>=0;i--){
						// if we find a tile which is not empty, our search is about to end...
						if(me.fieldArray[row*4+i]!=0){
							// ...we just have to see if the tile we are landing on has the same value of the tile we are moving
							if(me.fieldArray[row*4+i] == me.fieldArray[row*4+col]){
								// in this case the current tile will be removed
								remove = true;
								i--;                                             
							}
							break;
						}
					}

					// if we can actually move...
					if(col!=i+1){
						// set moved to true
            moved = true;
            // moving the tile "item" from row*4+col to row*4+i+1 and (if allowed) remove it
            me.moveTile( item, row*4+col, row*4+i+1, remove);
					}

				}

			});
			
			// completing the move
			this.endMove(moved);

  	}
    

  },

  /**
   *
   *  FUNCTION moveRight();
   *
   *
   *
   */
  moveRight: function() {

    if(this.canMove){

      this.canMove=false;
      var moved=false;

			this.tileSprites.sort("x",Phaser.Group.SORT_DESCENDING);

			var me = this;
			this.tileSprites.forEach(function(item){
				var row = me.toRow(item.pos);
				var col = me.toCol(item.pos);
				if(col<3){
        	var remove = false;
					for(i=col+1;i<=3;i++){
						if(me.fieldArray[row*4+i] != 0){
          		if(me.fieldArray[row*4+i] == me.fieldArray[row*4+col]){
								remove = true;
								i++;                                             
							}
							break
						}
					}
					if(col!=i-1){
          	moved=true;
						me.moveTile(item, row*4+col, row*4+i-1, remove);
					}
				}
			});

    	this.endMove(moved);

		}

  },

  /**
   *
   *  FUNCTION moveTile();
   *
   *  FUNCTION TO MOVE A TILE
   *
   */
  moveTile: function(tile,from,to,remove) {

    // first, we update the array with new values
		this.fieldArray[to] = this.fieldArray[from];
		this.fieldArray[from] = 0;
		tile.pos = to;
		// then we create a tween
		var movement = this.game.add.tween(tile);
		movement.to({ x:this.tileSize * ( this.toCol(to) ), y:this.tileSize * ( this.toRow(to) )},150);
		if(remove){
			// if the tile has to be removed, it means the destination tile must be multiplied by 2
	    this.fieldArray[to] *= 2;
	    // at the end of the tween we must destroy the tile
	    movement.onComplete.add(function(){
	    	tile.destroy();
	    });
		}
		// let the tween begin!
		movement.start();

  },

  /**
   *
   *  FUNCTION endMove();
   *
   *  FUNCTION TO COMPLETE THE MOVE AND PLACE ANOTHER "2" IF WE CAN
   *
   */
  endMove: function(m) {

    // if we move the tile...
		if(m){
			// add another "2"
			this.addTwo();
    }
    else{
    	// otherwise just let the player be able to move again
			this.canMove = true;
		}

  },

  /**
   *
   *  FUNCTION quitGame();
   *
   *
   *
   */
  quitGame: function(pointer) {

    //  Destroyz
    

  }

}
