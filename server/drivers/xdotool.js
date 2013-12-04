(function(global) {
    var exec = require('child_process').exec,
        defaults = {
            keyMap: {
                left: 'Left',
                right: 'Right',
                up: 'Up',
                down: 'Down',
                a: 'Control_L'
            }
        };

    function XdotoolDriver(keyMap) {
        this.keyMap = keyMap || defaults.keyMap;
    };

    XdotoolDriver.prototype.onButtonPress = function(button) {
        exec('xdotool keydown '+this.keyMap[button]);
    }

    XdotoolDriver.prototype.onButtonRelease = function(button) {
        exec('xdotool keyup '+this.keyMap[button]);
    }

    module.exports = XdotoolDriver;
})(this);
