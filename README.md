Edit `config.make` and point `OF_ROOT` to your OpenFrameworks install location.

Install [ofxPhyllotaxis](https://github.com/edap/ofxPhyllotaxis) to your OpenFrameworks `addons` location.

Install [ofxMidi](https://github.com/danomatika/ofxMidi) to your OpenFrameworks `addons` location.

### MIDI Setup - Mac
OF and Electron need `IAC Driver Bus 1` to exist. This driver can be activated in the Audio MIDI Setup Utility (Open Spotlight and search for Audio MIDI setup).

Launch Audio MIDI Setup and select "Show MIDI Studio" from the "Window" menu.

![Midi Setup 1](midi-1.png)

Now double-click the IAC Driver icon and check the option "Device is online" in order to activate it.

![Midi Setup 2](midi-2.png)

Go [Here](https://factotumo.com/web-midi-console/) and verify that `IAC Driver Bus 1` appears as a Midi input and output.

`npm install`

`npm run build:OF`

`npm run monit` In a separate terminal to see processes logs.

`npm start`

`npm stop`

`npm run kill` To kill pm2 daemon entirely.
