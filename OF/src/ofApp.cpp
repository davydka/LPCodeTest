#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofBackground(37, 203, 206);
    gui.setup();
    gui.setPosition(5, 40);
    gui.add(degree.setup("degree", 137.5, 130.00, 140.00));
    gui.add(spread.setup("spread", 6, 2, 40));
    gui.add(extrude.setup("extrude", 0.6, 0.01, 0.90));
    light.setup();
    light.setPosition(-100, 200,0);
    masterColor = ofFloatColor::red;
    secondColor = ofFloatColor::yellow;
    ofEnableDepthTest();
    for(int i = 0;  i < nCubes;i++){
        children.push_back(ofBoxPrimitive(5,5,5));
    }

    width = ofGetWidth();
    height = ofGetHeight();

    // ofSetLogLevel(OF_LOG_VERBOSE);
    midiIn.listPorts();
    midiIn.openPort(0);
    midiIn.addListener(this);
    midiIn.ignoreTypes(false, false, false);
    midiIn.setVerbose(true);
    q0 = 64;
    q1 = 64;
    q2 = 64;
    q3 = 64;
    q4 = 64;
}

//--------------------------------------------------------------
void ofApp::update(){
    degreeCount = degreeCount + 0.01;
    float rad = ofDegToRad(degreeCount);
    for (int i = 0;  i < nCubes;i++) {
        ofVec3f pos;
        if (selectedType == "simple") {
            pos = ofxPhyllotaxis::simple(i, rad, spread);
        }

        if (selectedType == "conical") {
            pos = ofxPhyllotaxis::conical(i, rad, spread, extrude);
        }

        if (selectedType == "apple") {
            pos = ofxPhyllotaxis::apple(i, rad, spread, nCubes);
        }
        children[i].setPosition(pos);
    }

}

//--------------------------------------------------------------
void ofApp::draw(){
    maybeDrawGui();
    camera.begin();

    secondMaterial.setEmissiveColor(masterColor);
    for (int i = 0;  i < nCubes;i++) {
        float lerp = ofMap(i, 0, nCubes, 0.0, 1.0);
        auto interpolatedColor = masterColor.getLerped(secondColor, lerp);
        secondMaterial.setEmissiveColor(interpolatedColor);
        secondMaterial.begin();
        children[i].draw();
        secondMaterial.end();
    }
    camera.end();

    ofSetColor(0);
    /*
    text << "Received: " << ofxMidiMessage::getStatusString(midiMessage.status);
    ofDrawBitmapString(text.str(), 20, 20);
    text.str(""); // clear
    */

    ofSetColor(ofColor(148, 0, 211));
    ofDrawRectangle(width/2, 120, ofMap(q0 - 64, -64, 64, -(width/2 - 40), (width/2 - 40)), 16);

    ofSetColor(ofColor(75, 0, 130));
    ofDrawRectangle(width/2, 140, ofMap(q1 - 64, -64, 64, -(width/2 - 40), (width/2 - 40)), 16);

    ofSetColor(ofColor(0, 0, 255));
    ofDrawRectangle(width/2, 160, ofMap(q2 - 64, -64, 64, -(width/2 - 40), (width/2 - 40)), 16);

    ofSetColor(ofColor(0, 255, 0));
    ofDrawRectangle(width/2, 180, ofMap(q3 - 64, -64, 64, -(width/2 - 40), (width/2 - 40)), 16);

    ofSetColor(ofColor(255, 255, 0));
    ofDrawRectangle(width/2, 200, ofMap(q4 - 64, -64, 64, -(width/2 - 40), (width/2 - 40)), 16);
}

void ofApp::maybeDrawGui(){
    if(!hideGui){
        ofDisableDepthTest();
        gui.draw();
        ofPushStyle();
        string displayGui = "press 'g' to toggle the gui, up and down to change presets";
        ofDrawBitmapString(displayGui, 5, 10);
        string types = "press 1, 2, 3 to try different implementation";
        ofDrawBitmapString(types, 5, 20);
        string currentType = "current: "+ selectedType;
        ofDrawBitmapString(currentType, 5, 30);
        ofPopStyle();
        ofEnableDepthTest();
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

    switch(key){
        case 'g':
            hideGui = !hideGui;
            break;
        case 49:
            // selectedType = "conical";
            break;
        case 50:
            // selectedType = "apple";
            break;
        case 51:
            // selectedType = "simple";
            break;
        default:
            break;
    }
}
//--------------------------------------------------------------
void ofApp::exit() {

    // clean up
    midiIn.closePort();
    midiIn.removeListener(this);
}

//--------------------------------------------------------------
void ofApp::newMidiMessage(ofxMidiMessage& msg) {
    // make a copy of the latest message
    midiMessage = msg;
    // cout << midiMessage.control << endl;
    // cout << ofHexToInt(ofToString(midiMessage.value)) << endl;

    if(midiMessage.control == 0) {
       q0 = midiMessage.value;
    }
    if(midiMessage.control == 1) {
       q1 = midiMessage.value;
    }
    if(midiMessage.control == 2) {
       q2 = midiMessage.value;
    }
    if(midiMessage.control == 3) {
       q3 = midiMessage.value;
    }
    if(midiMessage.control == 4) {
       q4 = midiMessage.value;
    }
}

