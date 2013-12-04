window.onload = function() {
    "use strict";
    var connectButton = document.getElementById('connection'),
        connection = new Connection(),
        hostAddress = window.location.protocol+'//'+window.location.hostname+
                        (window.location.port ? ':'+window.location.port : ''),
        keyMap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            13: 'a'
        };

    connectButton.addEventListener('click', function(ev) {
        ev.preventDefault();

        switch (connectButton.innerText) {
            case 'Connect':
                // Connect controller
                connection.connect(hostAddress);

                // Change button text
                connectButton.innerText = 'Disconnect';
                break;
            case 'Disconnect':
                connection.disconnect();
                // Change button text
                connectButton.innerText = 'Connect';
                break;
        }
    });

    document.onkeydown = function(ev) {
        var which = ev.keyCode || ev.which,
            key = keyMap[which];

        if (key) {
            ev.preventDefault();
            connection.send('button.press', key);
        }
    };

    document.onkeyup = function(ev) {
        var which = ev.keyCode || ev.which,
            key = keyMap[which];

        if (key) {
            ev.preventDefault();
            connection.send('button.release', key);
        }
    };
};
