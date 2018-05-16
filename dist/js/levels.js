'use strict';

/**
 * Levels, enemies, and player configurations
 */
var LevelMaker = function LevelMaker(global) {

    /**
     * This function creates a frameSet for animation;
     * a frameSet looks like this:
     * 
     * frameSet: {
     *     down: [
     *         {sx: 0, sy: 0, sWidth: 32, sHeight: 48},
     *         {sx: 32, sy: 0, sWidth: 32, sHeight: 48},
     *         {sx: 64, sy: 0, sWidth: 32, sHeight: 48},
     *         {sx: 96, sy: 0, sWidth: 32, sHeight: 48}
     *     ],
     *     left: [
     *         {sx: 0, sy: 48, sWidth: 32, sHeight: 48},
     *         {sx: 32, sy: 48, sWidth: 32, sHeight: 48},
     *         {sx: 64, sy: 48, sWidth: 32, sHeight: 48},
     *         {sx: 96, sy: 48, sWidth: 32, sHeight: 48}
     *     ],
     *     right: [...],
     * 
     *     up: [...]
     * }
     */
    function createFrameSet(sWidth, sHeight) {

        var directions = ['down', 'left', 'right', 'up'];
        var frameSet = {};

        for (var i = 0; i < 4; i++) {
            frameSet[directions[i]] = [];

            for (var j = 0; j < 4; j++) {
                frameSet[directions[i]][j] = { sx: j * sWidth, sy: i * sHeight, sWidth: sWidth, sHeight: sHeight };
            }
        }

        return frameSet;
    }

    /**
     * Player Data
     */
    var playerData = {
        texture: 'images/Cat Girl.png',
        x: 303,
        y: 498,
        width: 64,
        height: 96,
        offsetX: 18,
        offsetY: 14,
        collisionWidth: 57,
        collisionHeight: 47,
        direction: 'down',
        frameSet: createFrameSet(32, 48)

        /**
         * Enemy Data
         */
    };var enemyDataGoul = {
        texture: 'images/Goul.png',
        x: 0, y: 0,
        width: 80,
        height: 110,
        offsetX: 10,
        offsetY: 0,
        collisionWidth: 72,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(40, 55)
    };

    var enemyDataMurloc = {
        texture: 'images/Murloc.png',
        x: 0, y: 0,
        width: 70,
        height: 104,
        offsetX: 10,
        offsetY: -1,
        collisionWidth: 63,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(41, 61)
    };

    var enemyDataOrc = {
        texture: 'images/Orc.png',
        x: 0, y: 0,
        width: 73,
        height: 110,
        offsetX: 10,
        offsetY: -2,
        collisionWidth: 65,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(55, 77)
    };

    var enemyDataWerewolf = {
        texture: 'images/Werewolf.png',
        x: 0, y: 0,
        width: 81,
        height: 112,
        offsetX: 10,
        offsetY: -7,
        collisionWidth: 72,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(51, 70)
    };

    var enemyDataWolf = {
        texture: 'images/Wolf.png',
        x: 0, y: 0,
        width: 104,
        height: 83,
        offsetX: 0,
        offsetY: 25,
        collisionWidth: 93,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(58, 46)
    };

    var enemyDataSpider = {
        texture: 'images/Spider.png',
        x: 0, y: 0,
        width: 80,
        height: 67,
        offsetX: 10,
        offsetY: 40,
        collisionWidth: 72,
        collisionHeight: 59,
        direction: 'down',
        frameSet: createFrameSet(132, 112)
    };

    var player = void 0;
    var enemies = [];

    function _creatPlayer() {
        player = new Player(playerData);
        player.speed = 1.5;
    }

    var colWidth = 101;
    var rowHeight = 83;

    // script for enemies that move from right to left
    var scriptMoveLeft = function scriptMoveLeft(self) {
        if (self.x <= -101) {
            self.teleport(707, self.y);
        }
        self.setMove('left');
    };
    // script for enemies that move from left to right
    var scriptMoveRight = function scriptMoveRight(self) {
        if (self.x >= 707) {
            self.teleport(-101, self.y);
        }
        self.setMove('right');
    };

    /**
     * Level configurations
     * set up enemies and their AI script
     */
    var level1 = function level1() {

        var murloc = new Unit(enemyDataMurloc);
        murloc.teleport(colWidth * 4, rowHeight * 1); // Set initial position
        murloc.speed = 1; // Set speed
        murloc.script = function (self) {
            // Set AI script
            if (self.x >= 707) {
                self.teleport(-101, self.y);
            }
            self.setMove('right');
        };

        enemies.push(murloc);

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {

                var goul = new Unit(enemyDataGoul);
                goul.teleport(colWidth * (j * 2 + 1), rowHeight * (i + 2));
                goul.speed = 0.5;
                if (i === 1) {
                    goul.script = scriptMoveLeft;
                } else {
                    goul.script = scriptMoveRight;
                }

                enemies.push(goul);
            }
        }
    };

    var level2 = function level2() {

        for (var i = 0; i < 4; i++) {
            var wolf = new Unit(enemyDataWolf);
            wolf.teleport(colWidth * (i * 2), rowHeight * (i + 1));
            wolf.speed = 2.5;
            wolf.script = scriptMoveRight;

            enemies.push(wolf);
        }

        for (var _i = 0; _i < 4; _i++) {
            var orc = new Unit(enemyDataOrc);
            orc.teleport(colWidth * (7 - _i * 2), rowHeight * (_i + 2));
            orc.speed = 1.8;
            orc.script = scriptMoveLeft;

            enemies.push(orc);
        }
    };

    var level3 = function level3() {

        for (var i = 0; i < 2; i++) {
            var werewolf = new Unit(enemyDataWerewolf);
            werewolf.teleport(colWidth * (i * 2), rowHeight * (i * 2 + 2));
            werewolf.speed = 2.2;
            werewolf.script = function (self) {
                if (self.x >= 707) {
                    self.teleport(-101, self.y);
                    if (self.speed < 10) self.speed += 0.6;
                }

                self.setMove('right');
            };

            enemies.push(werewolf);
        }

        for (var _i2 = 0; _i2 < 2; _i2++) {
            var _werewolf = new Unit(enemyDataWerewolf);
            _werewolf.teleport(colWidth * (7 - _i2 * 2), rowHeight * (_i2 * 2 + 3));
            _werewolf.speed = 2.2;
            _werewolf.script = function (self) {
                if (self.x <= -101) {
                    self.teleport(707, self.y);
                    if (self.speed < 10) self.speed += 0.6;
                }
                self.setMove('left');
            };

            enemies.push(_werewolf);
        }

        for (var _i3 = 0; _i3 < 7; _i3++) {
            if (_i3 === 3) continue;
            var spider = new Unit(enemyDataSpider);
            spider.teleport(colWidth * _i3, rowHeight * 1);
            spider.speed = 1;
            spider.script = scriptMoveLeft;

            enemies.push(spider);
        }
    };

    /**
     * engine.js will run levels in this array one by one
     * you can create more level functions and add them in this array 
     */
    var levels = [level1, level2, level3];

    /**
     * handles keypress and sends it to Player's handleInput method
     */
    function handleInput(evt) {
        var allowedKeys = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };
        if (player) {
            player.handleInput(evt.type, allowedKeys[evt.keyCode]);
        }
    }
    /**
     * set up level a level
     * returns false if level index does not exist
     */
    function run(levelIndex) {

        if (levelIndex >= levels.length) {
            return false;
        }

        levels[levelIndex]();
        _creatPlayer();

        document.addEventListener('keydown', handleInput);
        document.addEventListener('keyup', handleInput);

        return true;
    }

    /**
     * clear units and remove listeners
     */
    function clear() {
        player = undefined;
        enemies = [];
        document.removeEventListener('keydown', handleInput);
        document.removeEventListener('keyup', handleInput);
    }

    /**
     * return player
     */
    function getPlayer() {
        return player;
    }

    /**
     * return all enemies
     */
    function getEnemies() {
        return enemies;
    }

    /**
     * put public funtions in global
     */
    global.Levels = {
        run: run,
        clear: clear,
        getPlayer: getPlayer,
        getEnemies: getEnemies
    };
};