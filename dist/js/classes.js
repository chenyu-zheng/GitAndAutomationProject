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