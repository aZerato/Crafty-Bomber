// The Grid component allows an element to be located
// on a grid of tiles
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

// Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
        } else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
            return this;
        }
    }
});

// An "Actor" is an entity that is drawn in 2D on canvas
// via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    }
});

// A Wall is just an Actor with a certain sprite
Crafty.c('Wall', {
    init: function() {
        this.requires('Actor, Solid, spr_wall');
    }
});

// A Grass is just an Actor with a certain sprite
Crafty.c('Grass', {
    init: function() {
        this.requires('Actor, spr_grass');
    }
});

// A Bonus is just an Actor with a certain sprite
Crafty.c('BombPlayer1', {
    init: function() {
        this.requires('Actor, spr_bomb')
            .exploseFlames();
    },

    exploseFlames: function() {
        this.timeout(function() {
            
            this.destroy();
            
            // Intensity of Bomb
            for (var i = 1; i <= powerBombPlayer1; i++) {
                
                // Flame at the same place of bomb
                Crafty.e('FlamesPlayer1').attr({
                    x: this.x,
                    y: this.y
                }).timeout(function() {
                    this.destroy();
                }, 1000);

                // Flame at the left place of bomb
                Crafty.e('FlamesPlayer1').attr({
                    x: this.x - (Game.map_grid.tile.width * i),
                    y: this.y
                }).timeout(function() {
                    this.destroy();
                }, 1000);

                // Flame at the right place of bomb
                Crafty.e('FlamesPlayer1').attr({
                    x: this.x + (Game.map_grid.tile.width * i),
                    y: this.y
                }).timeout(function() {
                    this.destroy();
                }, 1000);

                // Flame at the top place of bomb
                Crafty.e('FlamesPlayer1').attr({
                    x: this.x,
                    y: this.y - (Game.map_grid.tile.width * i)
                }).timeout(function() {
                    this.destroy();
                }, 1000);

                // Flame at the bottom place of bomb
                Crafty.e('FlamesPlayer1').attr({
                    x: this.x,
                    y: this.y + (Game.map_grid.tile.width * i)
                }).timeout(function() {
                    this.destroy();
                }, 1000);

            };

        }, 1000);

        console.log('bomb explosed after 3s !');
    }
});

Crafty.c('BombPlayer2', {
    init: function() {
        this.requires('Actor, spr_bomb2')
            .exploseFlames();
    },

    exploseFlames: function() {
        this.timeout(function() {

            this.destroy();

            // Intensity of Bomb
            for (var i = 1; i <= powerBombPlayer2; i++) {

                // Flame at the same place of bomb
                Crafty.e('FlamesPlayer2').attr({
                    x: this.x,
                    y: this.y
                }).timeout(function() {
                        this.destroy();
                    }, 1000);

                // Flame at the left place of bomb
                Crafty.e('FlamesPlayer2').attr({
                    x: this.x - (Game.map_grid.tile.width * i),
                    y: this.y
                }).timeout(function() {
                        this.destroy();
                    }, 1000);

                // Flame at the right place of bomb
                Crafty.e('FlamesPlayer2').attr({
                    x: this.x + (Game.map_grid.tile.width * i),
                    y: this.y
                }).timeout(function() {
                        this.destroy();
                    }, 1000);

                // Flame at the top place of bomb
                Crafty.e('FlamesPlayer2').attr({
                    x: this.x,
                    y: this.y - (Game.map_grid.tile.width * i)
                }).timeout(function() {
                        this.destroy();
                    }, 1000);

                // Flame at the bottom place of bomb
                Crafty.e('FlamesPlayer2').attr({
                    x: this.x,
                    y: this.y + (Game.map_grid.tile.width * i)
                }).timeout(function() {
                        this.destroy();
                    }, 1000);

            };

        }, 1000);

        console.log('bomb explosed after 3s !');
    }
});


// A Bonus is just an Actor with a certain sprite
Crafty.c('Bonus', {
    init: function() {
        this.requires('Actor, spr_bonus, Collision, Bonus')
            .giveBonus();
    },

    giveBonus: function() {
        this.onHit('Multiway', function() {
            // When bonus is getted by player i replace by a Grass element
            var gZ = this._globalZ;
            var x = this.x;
            var y = this.y;
            this.destroy();
            Crafty.e('Grass').attr({
                x: x,
                y: y,
                _globalZ: gZ
            });
        });
        return this;
    }
});


// A Flames is an Actor with a certain sprite & specials attributes
Crafty.c('FlamesPlayer1', {
    init: function() {
        this.requires('Actor, spr_flames, Destruction, DestructionPlayer1, Collision')
            .inofensive();
    },

    inofensive: function() {
        this.onHit('Solid', function() {
            this.destroy();
        });
        return this;
    }
});

// A Flames is an Actor with a certain sprite & specials attributes
Crafty.c('FlamesPlayer2', {
    init: function() {
        this.requires('Actor, spr_flames2, Destruction, DestructionPlayer2, Collision')
            .inofensive();
    },

    inofensive: function() {
        this.onHit('Solid', function() {
            this.destroy();
        });
        return this;
    }
});

// A Break is an Actor with a certain sprite & specials attributes
Crafty.c('Break', {
    init: function() {
        // Show hitbox : this.requires('Actor, Breakable, spr_break, Collision, WiredHitBox')
        this.requires('Actor, Breakable, spr_break, Collision')
            .breakable();
    },

    breakable: function() {
        this.onHit('Destruction', function() {
           var gZ = this._globalZ;
           var x = this.x;
           var y = this.y;
           this.destroy();
           Crafty.e('Grass').attr({
                x: x,
                y: y,
                _globalZ: gZ
           });
        });
        return this;
    }
});

// This is the player-controlled character
Crafty.c('PlayerCharacter1', {
    init: function() {
        //this.requires('Actor, Fourway, spr_bomberman, Collision, SpriteAnimation, WiredHitBox')
        this.requires('Actor, Multiway, spr_bomberman, Collision, SpriteAnimation')
            .collision(new Crafty.circle(13, 15, 5))
            .multiway(3, {90: -90, 83: 90, 68: 0, 81: 180})
            .stopOnSolids()
            .hurtByBomb()
            .getBonus()
            // These next lines define our four animations
            // each call to .animate specifies:
            // - the name of the animation
            // - the x and y coordinates within the sprite
            // map at which the animation set begins
            // - the number of animation frames *in addition to* the first one
            .animate('PlayerMovingUp', 0, 0, 3)
            .animate('PlayerMovingRight', 3, 0, 3)
            .animate('PlayerMovingDown', 6, 0, 3)
            .animate('PlayerMovingLeft', 9, 0, 3)
            .bind('KeyDown', function(e) {
                if(e.key == Crafty.keys['SPACE']) {
                    this.deposeBomb();
                }
            });

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 4;
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
                this.stop();
            }
        });
    },

    // Registers a stop-movement function to be called when
    // this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        this.onHit('Breakable', this.stopMovement);
        return this;
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    // Depose Bomb
    deposeBomb: function() {
        // if zone is free
        var currentZone = mapTab[Math.round(this.y/30)][Math.round(this.x/30)];
        if(currentZone == 1) {
            var bomb = Crafty.e('BombPlayer1').attr({
                x: this.x,
                y: this.y,
                _globalZ: this._globalZ
            });
            currentZone = 3;
            console.log('bomb deposed !');
        }
        else {
            console.log('bomb can\'t be deposed here !');
        }
    },

    // Hurt
    hurtByBomb: function() {
        this.onHit('DestructionPlayer2', function() {
            setTimeout(function() {
                Crafty.scene('GameOverP2');
            }, 1000);
        });

        this.onHit('DestructionPlayer1', function() {
            setTimeout(function() {
                Crafty.scene('GameOverP2');
            }, 1000);
        });

        return this;
    },

    // Get Bonus item
    getBonus: function() {
        this.onHit('Bonus', function() {
            powerBombPlayer1++;
        });
        return this;
    }

});

// This is the player-controlled character
Crafty.c('PlayerCharacter2', {
    init: function() {
        //this.requires('Actor, Multiway, spr_bomberman2, Collision, SpriteAnimation, WiredHitBox')
        this.requires('Actor, Multiway, spr_bomberman2, Collision, SpriteAnimation')
            .collision(new Crafty.circle(13, 15, 5))
            .multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
            .stopOnSolids()
            .hurtByBomb()
            .getBonus()
            // These next lines define our four animations
            // each call to .animate specifies:
            // - the name of the animation
            // - the x and y coordinates within the sprite
            // map at which the animation set begins
            // - the number of animation frames *in addition to* the first one
            .animate('PlayerMovingUp', 0, 0, 3)
            .animate('PlayerMovingRight', 3, 0, 3)
            .animate('PlayerMovingDown', 6, 0, 3)
            .animate('PlayerMovingLeft', 9, 0, 3)
            .bind('KeyDown', function(e) {
                if(e.key == Crafty.keys['NUMPAD_0']) {
                    this.deposeBomb();
                }
            });

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 4;
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
                this.stop();
            }
        });
    },

    // Registers a stop-movement function to be called when
    // this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        this.onHit('Breakable', this.stopMovement);
        return this;
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    // Depose Bomb
    deposeBomb: function() {
        // if zone is free
        var currentZone = mapTab[Math.round(this.y/30)][Math.round(this.x/30)];
        if(currentZone == 1) {
            var bomb = Crafty.e('BombPlayer2').attr({
                x: this.x,
                y: this.y,
                _globalZ: this._globalZ
            });
            currentZone = 3;
            console.log('bomb deposed !');
        }
        else {
            console.log('bomb can\'t be deposed here !');
        }
    },

    // Hurt
    hurtByBomb: function() {
        this.onHit('DestructionPlayer1', function() {
            setTimeout(function() {
                Crafty.scene('GameOverP1');
            }, 1000);
        });

        this.onHit('DestructionPlayer2', function() {
            setTimeout(function() {
                Crafty.scene('GameOverP1');
            }, 1000);
        });

        return this;
    },

    // Get Bonus item
    getBonus: function() {
        this.onHit('Bonus', function() {
            powerBombPlayer2++;
        });
        return this;
    }

});

