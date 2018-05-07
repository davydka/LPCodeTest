#pragma once

#include "ofMain.h"
#include "ofxPhyllotaxis.h"
#include "ofxMidi.h"
#include "ofxPanel.h"

class ofApp : public ofBaseApp, public ofxMidiListener{

public:
    void setup();
    void update();
    void draw();
    void exit();

    void keyPressed(int key);
    void maybeDrawGui();

    void newMidiMessage(ofxMidiMessage& eventArgs);

    int nCubes = 400;
    float degreeCount = 0;
    bool hideGui = true;
    int width;
    int height;
    int q0;
    int q1;
    int q2;
    int q3;
    int q4;
    ofFloatColor masterColor;
    ofFloatColor secondColor;
    ofMaterial secondMaterial;
    ofEasyCam camera;
    ofLight light;
    vector<ofBoxPrimitive> children;
    string selectedType = "conical";

    ofxPanel gui;
    ofxFloatSlider degree;
    ofxFloatSlider spread;
    ofxFloatSlider extrude;

    ofxMidiIn midiIn;
    ofxMidiMessage midiMessage;
    stringstream text;
};
