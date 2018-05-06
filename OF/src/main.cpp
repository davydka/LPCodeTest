#include "ofMain.h"
#include "ofApp.h"

//========================================================================
int main( ){
    ofGLFWWindowSettings settings;
	settings.decorated = false;
    settings.setGLVersion(3, 2);
    settings.width = 1080;
    settings.height = 720;
    settings.setPosition(ofVec2f(0, 0));
    ofCreateWindow(settings);

    ofRunApp(new ofApp());


}
