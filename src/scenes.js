var mapTab = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 2, 1, 3, 1, 2, 1, 3, 1, 2, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 0],
    [0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 1, 2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 0],
    [0, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 1, 0],
    [0, 2, 1, 2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 0],
    [0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 2, 1, 3, 1, 2, 1, 3, 1, 2, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


Crafty.scene('Game', function() {
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {

            // 0 : dead zone
            if(mapTab[y][x] == 0) {
                Crafty.e('Wall').at(x,y);
            }
            // 1 : free zone
            else if(mapTab[y][x] == 1) {
                Crafty.e('Grass').at(x,y);
            }
            // 2 : breakable
            else if(mapTab[y][x] == 2) {
                Crafty.e('Break').at(x,y);
            }
            // 3 : Bonus
            else if(mapTab[y][x] == 3) {
                Crafty.e('Bonus').at(x,y);
            }

        }
    }

    // Player character, placed at 1, 1 on our grid
    this.player1 = Crafty.e('PlayerCharacter1').at(1, 1);
    this.player2 = Crafty.e('PlayerCharacter2').at(13, 11);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){

    // Draw some text for the player to see in case the file
    // takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - Game.map_grid.width, w: Game.width() })
        .css($text_css);


    // Define the individual sprites in the image
    // Each one (spr_wall, etc.) becomes a component
    Crafty.load(['assets/texture.png', 'assets/bomberman.png', 'assets/bomberman2.png', 'assets/bomb.png', 'assets/bomb2.png', 'assest/flames.png', 'assest/flames2.png'], function() {

        Crafty.sprite(30, 'assets/texture.png', {
            spr_wall:   [0, 0],
            spr_break:  [0, 1],
            spr_grass:  [0, 2]
        });

        Crafty.sprite(30, 'assets/bomberman.png', {
            spr_bomberman: [6, 0]
        });

        Crafty.sprite(30, 'assets/bomberman2.png', {
            spr_bomberman2: [6, 0]
        });

        Crafty.sprite(30, 'assets/bomb.png', {
            spr_bomb: [0, 0]
        });

        Crafty.sprite(30, 'assets/bomb2.png', {
            spr_bomb2: [0, 0]
        });

        Crafty.sprite(30, 'assets/flames.png', {
            spr_flames: [0, 0]
        });

        Crafty.sprite(30, 'assets/flames2.png', {
            spr_flames2: [0, 0]
        });

        Crafty.sprite(30, 'assets/bonus.png', {
            spr_bonus: [0, 0]
        });

        // Now sprites are ready to draw, start the game
        Crafty.scene('Game');
    });
});

Crafty.scene('Title', function() {
    Crafty.load(['assets/title.png'], function() {
        // Show image logo at the loading
        Crafty.sprite(400,'assets/title.png', {
            title: [0,0, 400, 154]
        });
        // Create an event when user click on the Title scene the loading scene is lauching
        Crafty.e('2D, DOM, title, Mouse').bind('Click', function() {
            Crafty.scene('Loading');
        });
    });
});

Crafty.scene('GameOverP1', function() {
    // Create an element when the game is over
    Crafty.e('2D, DOM, Text')
        .text('GAME OVER - Player 1 Win')
        .attr({ x: 0, y: Game.height()/2 - Game.map_grid.width, w: Game.width() })
        .css($text_css);

});

Crafty.scene('GameOverP2', function() {
    // Create an element when the game is over
    Crafty.e('2D, DOM, Text')
        .text('GAME OVER - Player 2 Win')
        .attr({ x: 0, y: Game.height()/2 - Game.map_grid.width, w: Game.width() })
        .css($text_css);

});