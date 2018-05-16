'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sprite class
 */
var Sprite = function () {
    function Sprite(_ref) {
        var texture = _ref.texture,
            x = _ref.x,
            y = _ref.y,
            width = _ref.width,
            height = _ref.height,
            _ref$offsetX = _ref.offsetX,
            offsetX = _ref$offsetX === undefined ? 0 : _ref$offsetX,
            _ref$offsetY = _ref.offsetY,
            offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
            _ref$collisionWidth = _ref.collisionWidth,
            collisionWidth = _ref$collisionWidth === undefined ? 0 : _ref$collisionWidth,
            _ref$collisionHeight = _ref.collisionHeight,
            collisionHeight = _ref$collisionHeight === undefined ? 0 : _ref$collisionHeight;

        _classCallCheck(this, Sprite);

        this.texture = texture;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.frame = { sx: 0, xy: 0, sWidth: this.width, sHeight: this.height }; // frame indicates which area of the texture will be drawn
        this.vx = 0; // velocity on x axis
        this.vy = 0; // velocity on y axis
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
    }

    /**
     * draws a unit's texture on canvas
     */


    _createClass(Sprite, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.texture), this.frame.sx, this.frame.sy, this.frame.sWidth, this.frame.sHeight, this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);
        }

        // updates units' position

    }, {
        key: 'update',
        value: function update(dt) {
            this.x += this.vx;
            this.y += this.vy;
        }
    }]);

    return Sprite;
}();

/**
 * Unit class
 * for creating all NPCs
 */


var Unit = function (_Sprite) {
    _inherits(Unit, _Sprite);

    function Unit(_ref2) {
        var texture = _ref2.texture,
            x = _ref2.x,
            y = _ref2.y,
            width = _ref2.width,
            height = _ref2.height,
            _ref2$offsetX = _ref2.offsetX,
            offsetX = _ref2$offsetX === undefined ? 0 : _ref2$offsetX,
            _ref2$offsetY = _ref2.offsetY,
            offsetY = _ref2$offsetY === undefined ? 0 : _ref2$offsetY,
            _ref2$collisionWidth = _ref2.collisionWidth,
            collisionWidth = _ref2$collisionWidth === undefined ? 0 : _ref2$collisionWidth,
            _ref2$collisionHeight = _ref2.collisionHeight,
            collisionHeight = _ref2$collisionHeight === undefined ? 0 : _ref2$collisionHeight,
            direction = _ref2.direction,
            frameSet = _ref2.frameSet;

        _classCallCheck(this, Unit);

        var _this = _possibleConstructorReturn(this, (Unit.__proto__ || Object.getPrototypeOf(Unit)).call(this, { texture: texture, x: x, y: y, width: width, height: height, offsetX: offsetX, offsetY: offsetY, collisionWidth: collisionWidth, collisionHeight: collisionHeight }));

        _this.frameSet = frameSet; // frameSet is a series of animation frames
        _this.direction = direction;
        _this.destX = _this.x; // destination of moving
        _this.destY = _this.y; // destination of moving
        _this.speed = 0; // can move how many blocks per second
        _this.lastMoveDistance = 0; // this value affects animation speed
        _this.script; // if this function exits, will invoke it every frame; it can be used for enemies' AI
        return _this;
    }

    // check if a unit is moving


    _createClass(Unit, [{
        key: 'isMoving',
        value: function isMoving() {
            return this.vx !== 0 || this.vy !== 0;
        }

        /**
         * Sets the destination and velocity of moving
         * velocity respects unit's speed property
         */

    }, {
        key: 'setMove',
        value: function setMove(direction) {

            if (!this.isMoving()) {
                this.direction = direction;
                this.destX = this.x;
                this.destY = this.y;
                switch (this.direction) {
                    case 'left':
                        this.destX -= 101;
                        this.vx = -this.speed * 101;
                        break;
                    case 'right':
                        this.destX += 101;
                        this.vx = this.speed * 101;
                        break;
                    case 'up':
                        this.destY -= 83;
                        this.vy = -this.speed * 83;
                        break;
                    case 'down':
                        this.destY += 83;
                        this.vy = this.speed * 83;
                        break;
                }
            }
        }

        /**
         * Updates a unit's position and animation frame
         */

    }, {
        key: 'update',
        value: function update(dt) {

            if (this.isMoving()) {

                // prevents move over destination 
                if (Math.abs(this.x - this.destX) < Math.abs(this.vx * dt)) {
                    this.x = this.destX;
                    this.vx = 0;
                    this.lastMoveDistance = 0;
                } else if (Math.abs(this.y - this.destY) < Math.abs(this.vy * dt)) {
                    this.y = this.destY;
                    this.vy = 0;
                    this.lastMoveDistance = 0;
                } else {
                    this.x += this.vx * dt;
                    this.y += this.vy * dt;
                    this.lastMoveDistance += Math.abs(this.vx * dt + this.vy * dt);
                }
            } else {
                if (this.script) this.script(this);
            }

            // set unit's current texture frame
            this.frame = this.frameSet[this.direction][Math.floor(this.lastMoveDistance / 10) % 4];
        }

        /**
         * moves a unit to a position instantaneously
         */

    }, {
        key: 'teleport',
        value: function teleport(x, y) {
            this.x = x;
            this.destX = x;
            this.y = y;
            this.destY = y;
            this.vx = 0;
            this.vy = 0;
            this.lastMoveDistance = 0;
        }
    }]);

    return Unit;
}(Sprite);

/**
 * Player class
 */


var Player = function (_Unit) {
    _inherits(Player, _Unit);

    function Player(_ref3) {
        var texture = _ref3.texture,
            x = _ref3.x,
            y = _ref3.y,
            width = _ref3.width,
            height = _ref3.height,
            _ref3$offsetX = _ref3.offsetX,
            offsetX = _ref3$offsetX === undefined ? 0 : _ref3$offsetX,
            _ref3$offsetY = _ref3.offsetY,
            offsetY = _ref3$offsetY === undefined ? 0 : _ref3$offsetY,
            _ref3$collisionWidth = _ref3.collisionWidth,
            collisionWidth = _ref3$collisionWidth === undefined ? 0 : _ref3$collisionWidth,
            _ref3$collisionHeight = _ref3.collisionHeight,
            collisionHeight = _ref3$collisionHeight === undefined ? 0 : _ref3$collisionHeight,
            direction = _ref3.direction,
            frameSet = _ref3.frameSet;

        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, { texture: texture, x: x, y: y, width: width, height: height, offsetX: offsetX, offsetY: offsetY, collisionWidth: collisionWidth, collisionHeight: collisionHeight, direction: direction, frameSet: frameSet }));
    }

    // player can not move off canvas


    _createClass(Player, [{
        key: 'setMove',
        value: function setMove(direction) {
            if (!this.isMoving()) {
                if (direction === 'left' && this.x > 0 || direction === 'right' && this.x < 606 || direction === 'up' && this.y > 0 || direction === 'down' && this.y < 498) {
                    _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'setMove', this).call(this, direction);
                }
            }
        }

        /**
         * controls a unit's moving
         */

    }, {
        key: 'handleInput',
        value: function handleInput(type, direction) {
            if (type === 'keydown') {
                this.script = function (unit) {
                    return unit.setMove(direction);
                };
            }
            if (type === 'keyup') {
                this.script = undefined;
            }
        }
    }]);

    return Player;
}(Unit);

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
/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if (resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function () {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                return false;
            }
        }
        return true;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document;
    var win = global.window;
    var canvas = doc.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var restartBtn = document.querySelector('div.btn-restart');
    var levelDisplay = document.querySelector('.level span');
    var highestDisplay = document.querySelector('.highest-level span');
    var lifeDisplay = document.querySelector('.life span');

    var lastTime = void 0;
    var isPaused = false;
    var textContent = void 0;
    var textPosition = { x: 0, y: 0 };
    var currentLevel = 1;
    var highestLevel = 0;
    var extraLives = 2;

    var player = void 0;
    var enemies = void 0;
    var runLevel = void 0;
    var clearLevel = void 0;
    var getPlayer = void 0;
    var getEnemies = void 0;

    canvas.width = 707;
    canvas.height = 707;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        // if game is paused, do not update
        if (!isPaused) {
            update(dt);
        }

        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {

        // handles click on restart button
        restartBtn.addEventListener('click', function () {
            isPaused = false;
            textContent = undefined;
            currentLevel = 1;
            extraLives = 2;
            reset();
        });

        // init Levels
        LevelMaker(global);
        runLevel = Levels.run;
        clearLevel = Levels.clear;
        getPlayer = Levels.getPlayer;
        getEnemies = Levels.getEnemies;

        reset();
        lastTime = Date.now();
        main();
    }

    /* This function does nothing but it could have been a good place to
    * handle game reset states - maybe a new game menu or a game over screen
    * those sorts of things. It's only called once by the init() method.
    */
    function reset() {

        // clear the previous level's data
        clearLevel();
        player = undefined;
        enemies = [];

        // if no more lives left, a player lost the game
        if (extraLives < 0) {
            showText('YOU LOST!', 110, 285, -1, '72px Nosifer', 'black');
            return;
        }

        // displays highest level and lives
        highestDisplay.textContent = highestLevel;
        lifeDisplay.textContent = extraLives;

        // run the next level
        var hasLevel = runLevel(currentLevel - 1);

        if (hasLevel) {
            // displays current level
            levelDisplay.textContent = currentLevel;
            pause(1500);
            showText('LEVEL ' + currentLevel, 265, 285, 1500, '72px Creepster', 'red');
            player = getPlayer();
            enemies = getEnemies();
            // if no more levels left, a player won the game
        } else {
            showText('YOU WON!', 195, 292, -1, '96px Creepster', 'white');
            return;
        }
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {

        // updates only when units exist
        if (player && enemies.length > 0) {
            updateEntities(dt);
            checkCollisions();
            checkGoal();
        }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {

        player.update(dt);
        enemies.forEach(function (sprite) {
            return sprite.update(dt);
        });
    }

    /**
     * checks if player collide with an enemy
     */
    function checkCollisions() {

        enemies.forEach(function (e) {

            if (Math.abs(e.x - player.x) < Math.min(e.collisionWidth, player.collisionWidth) && Math.abs(e.y - player.y) < Math.min(e.collisionHeight, player.collisionHeight)) {

                // if collision happens, a player loses 1 life
                extraLives--;
                pause(3000);
                showText('YOU DIED', 125, 285, 1500, '72px Nosifer', 'red');

                setTimeout(function () {
                    reset();
                }, 1600);

                return;
            }
        });
    }

    /**
     * checks if player meet the goal
     */
    function checkGoal() {
        if (player.y === 0) {

            if (highestLevel < currentLevel) {
                highestLevel = currentLevel;
            }
            currentLevel++;
            pause(2200);
            showText('LEVEL COMPLETE', 155, 285, 2000, '72px Creepster', 'white');

            setTimeout(function () {
                reset();
            }, 2100);

            return;
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = ['images/Stone Block.png', // Top row is water
        'images/Grass Block.png', // Row 1 of 3 of stone
        'images/Grass Block.png', // Row 2 of 3 of stone
        'images/Grass Block.png', // Row 3 of 3 of stone
        'images/Grass Block.png', // Row 1 of 2 of grass
        'images/Grass Block.png', // Row 2 of 2 of grass
        'images/Stone Block.png'],
            numRows = 7,
            numCols = 7,
            row,
            col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();

        // if textContent is defined, draw text on canvas
        if (textContent) {
            ctx.fillText(textContent, textPosition.x, textPosition.y);
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {

        // updates only when units exist
        if (player) {
            player.render();
        }
        if (enemies.length > 0) {
            enemies.forEach(function (sprite) {
                return sprite.render();
            });
        }
    }

    /**
     * shows a text on the canvas
     * if timeMS is less than 0, text will not automatically disappear
     */
    function showText(text, x, y, timeMS) {
        var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '72px sans-serif';
        var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'red';

        ctx.fillStyle = color;
        ctx.font = font;
        textContent = text;
        textPosition.x = x;
        textPosition.y = y;
        if (timeMS >= 0) {
            setTimeout(function () {
                textContent = undefined;
            }, timeMS);
        }
    }

    /**
     * pauses the game for a period of time
     */
    function pause(timeMS) {
        isPaused = true;
        setTimeout(function () {
            isPaused = false;
        }, timeMS);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load(['images/Stone Block.png', 'images/Grass Block.png', 'images/Cat Girl.png', 'images/Goul.png', 'images/Orc.png', 'images/Murloc.png', 'images/Wolf.png', 'images/Spider.png', 'images/Werewolf.png']);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
}(window);