(function(window, undefined) {
    function Connection() {
    }

    Connection.prototype.connect = function(host) {
        this.connection = io.connect(host);
    }

    Connection.prototype.send = function(event, data) {
        if (!this.connection) { return; } // Return for browsers which don't support web socket

        this.connection.emit(event, data);
    }

    Connection.prototype.disconnect = function() {
        this.connection.disconnect();
    }

    window.Connection = Connection;
})(this);
