const three = {
  emitter: null,
  canvas: null,
  camera: null,
  controls: null,
  dragControls: null,
  scene: null,
  renderer: null,

  clock: null,
  objects: [],
  shape: null,

  start: function(appEmitter) {
    let { canvas, camera, controls, dragControls, scene, renderer, plane, objects, shape } = this;
    const container = document.querySelector('.threeContainer');
    this.emitter = appEmitter;
    console.log('three start');
    this.emitter.on('setState', e => console.log('three setState', e) );

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(1080, 720);
    // renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xff0505 );

    /*
    const light = new THREE.AmbientLight();
    scene.add(light);
    */

    const light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
    scene.add(light1);

    const light2 = new THREE.SpotLight(0xffffff, 0.5);
    light2.position.set(4, 7, 23);
    scene.add(light2);

    const light3 = new THREE.SpotLight(0xffffff, 0.5);
    light3.position.set(4, 7, -23);
    scene.add(light3);

    const geometry = new THREE.IcosahedronGeometry( 1, 1 );
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    shape = new THREE.Mesh( geometry, material );
    scene.add(shape);
    objects.push(shape);

    camera = new THREE.PerspectiveCamera(
      45,
      1080 / 720,
      0.05,
      10000
    );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.updateProjectionMatrix();
    camera.position.set( 0, 4.5, 10.5 );
    controls.update();
    // only need these for debugging
    controls.enabled = false;

    dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener( 'dragstart', this.dragStart.bind(this) );
    dragControls.addEventListener( 'drag', this.drag.bind(this) );
    dragControls.addEventListener( 'dragend', this.dragEnd.bind(this) );

    Object.assign(this, { canvas, camera, controls, dragControls, scene, renderer, plane, objects, shape });
    this.update();
    /*
    setInterval(() => {
      console.log(camera.position);
    }, 500)
    */
  },

  update: function() {
    const { camera, controls, scene, renderer, shape } = this;
    shape.rotation.z = shape.rotation.z+0.01;
    shape.rotation.y = shape.rotation.y+0.01;
    renderer.clearColor();
    camera.updateProjectionMatrix();
    controls.update();
    renderer.clearDepth();
    renderer.render(scene, camera);
    requestAnimationFrame(this.update.bind(this));
  },

  dragStart: function(e) {
    this.controls.enabled = false;
  },

  drag: function(e) {
    const x = e.object.position.x;
    this.emitter.emit('drag', x);
  },

  dragEnd: function(e) {
    e.object.position.x = 0;
    e.object.position.y = 0;
    e.object.position.z = 0;
    this.emitter.emit('drag', 0);
    this.emitter.emit('dragEnd', 0);
    // this.controls.enabled = true;
  }
};
export default three;