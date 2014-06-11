# 3DS-to-PC Gamepad

*Note: this project is intended as a proof of concept*

This project aims to turn the Nintendo 3DS into a controller for a PC, using a webpage accessed on the 3DS, communicating with a node server on the host machine.

The purpose of the project is to allow one to play emulated games on their computer, using a familiar pad layout.  I started this project because I want to carry on playing retro games, even though I've moved 12,000 miles away from all of my consoles.

The project aims to get the 3DS sending the D-pad, A, B, X, Y, L and R 
buttons' states to the host machine.  The start and select buttons are not considered as high priority at the moment, and a simple compromise could be made by adding these buttons into the webpage, allowing them to be tapped using the 3DS touchscreen.  This compromise is likely to be workable, as these buttons are not often used during normal gameplay for many games.

# Project Status

The project currently has the 3DS being able to send through button presses and releases for the D-pad and the A button.  There are some challenges in supporting the rest of the buttons:

* Up, down, left, right, and the A button are easily covered - a simple `document.onkey(press|down|up)` event will capture these buttons.  The keycodes reported are the directional arrows for the D-pad (37-40) and enter (13) for the A button
* X and Y control the browser zoom level - Y zooms in, X zooms out.  The browser `resize` event gets fired when this happens, so this could be leveraged to detect these buttons.  It is worth noting that the action will have to be cancelled - if the user wishes to hold down the Y button, and ends up zooming in as far as possible, the event will stop getting reported.
* L and R control the browser's back and forward functions respectively.  It is hoped that the HTML5 history API can be used to 'hook in' to these button presses - however, it remains to be seen if the 3DS browser actually supports this API (the 3DS browser is WebKit-based so hopes are high). 
* As yet, the function of the B in the browser is undetermined, and the event (if any) which it fires is unknown.  A reference has been found to someone who claims to have "gained access" to the B button ([http://surii.net/hack/dev.html], post from 2011-06-13), but he/she does not say how they did it.

# Project Setup

You will need:

* A 3DS (actually, you could use another machine with a keyboard at the moment)
* A PC with node.js
* A very low latency connection between the two (ideally ad-hoc)

To get started, clone the repository to your machine, `cd` into the directory, and run `npm install` to get the required node.js dependencies.
You also need a program that will allow you to run key press and release commands on the host machine - I'm currently using `xdotool`, but you might prefer to use something different.  If you want to use something else, take a look at `./drivers/xdotool.js` and write a new driver for your preferred program.

Now you can the controller - from the project directory, run `node server/server.js <port_number> <driver>`, where `<port_number>` is the port to serve on (e.g. 3000) and `<driver>` is the aforementioned driver file (without the `.js` extension).  So, for example:

`node server/server.js 3000 xdotool`

Then, on your 3DS, open the web browser and go to your machine's IP address at the port you're running the server on, and tap the "Connect" button!

# Troubleshooting

* Make sure the host machine and the 3DS are on the same network
* If keys are getting stuck, your connection's latency is probably too high.  This shouldn't affect many people - I've been testing using a 4G router connection to both devices due to my network card not supporting ad-hoc networks and it's passable.

# Contributing and reporting bugs

If you want to contribute, fork the project, do your thing, and then submit a pull request!

If you find a bug, please raise a GitHub issue for it.
