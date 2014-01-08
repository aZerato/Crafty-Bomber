Game = {
    // Define map specifications
    map_grid: {
        width: 15,
        height: 13,
        tile: {
            width: 30,
            height: 30
        }
    },

    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function() {
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(20, 75, 40)');

        // Start the Title scene
        // TOO SLOW thus i launch directly the loading scene
        //Crafty.scene('Title');
        Crafty.scene('Loading');
    }
};

// Bomb Intensity
powerBomb = 1;
powerBombPlayer1 = powerBomb;
powerBombPlayer2 = powerBomb;

$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };