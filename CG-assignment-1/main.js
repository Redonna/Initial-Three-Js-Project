import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5); 

//lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(50, 60, 30);
sun.castShadow = true;
scene.add(sun);

//camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,     
  500    
);
camera.position.set(40, 30, 40);
camera.lookAt(0, 0, 0);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.sortObjects = true;
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//ground/grass area
const groundGeometry = new THREE.PlaneGeometry(120, 150);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x3cb371 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

//roads
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

//vertical road
const roadVGeometry = new THREE.PlaneGeometry(20, 150);
const roadV = new THREE.Mesh(roadVGeometry, roadMaterial);
roadV.rotation.x = -Math.PI / 2;
roadV.position.y = 0.01;
roadV.receiveShadow = true;
scene.add(roadV);

//horizontal road
const roadHGeometry = new THREE.PlaneGeometry(120, 15);
const roadH = new THREE.Mesh(roadHGeometry, roadMaterial);
roadH.rotation.x = -Math.PI / 2;
roadH.position.set(0, 0.05, -25); 
roadH.receiveShadow = true;
scene.add(roadH);

//buildings
const whiteMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
const blueMat = new THREE.MeshPhongMaterial({ color: 0x007bff });

//top-left white building
const white1 = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 15), whiteMat);
white1.position.set(-30, 7.5, -55);
white1.castShadow = true;
scene.add(white1);

//top-right white building
const white2 = new THREE.Mesh(new THREE.BoxGeometry(27, 15, 15), whiteMat);
white2.position.set(30, 7.5, -55);
white2.castShadow = true;
scene.add(white2);

//first blue building
const blue1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 30), blueMat);
blue1.position.set(25, 5, 10);
blue1.castShadow = true;
scene.add(blue1);

//second blue building
const blue2 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 30), blueMat);
blue2.position.set(25, 5, 50);
blue2.castShadow = true;
scene.add(blue2);

//amphitheater building 
const amphGeometry = new THREE.BoxGeometry(30, 15, 40);
const amphMaterial = new THREE.MeshPhongMaterial({ color: 0x808080  });
const amph = new THREE.Mesh(amphGeometry, amphMaterial);

//tilting roof
const posAttr = amphGeometry.attributes.position;

for (let i = 0; i < posAttr.count; i++) {
  const y = posAttr.getY(i);
  const z = posAttr.getZ(i);

  if (y > 0) {
    const offset = THREE.MathUtils.mapLinear(z, -12.5, 12.5, -3, 3);
    posAttr.setY(i, y + offset);
  }
}
posAttr.needsUpdate = true;
amphGeometry.computeVertexNormals();

//amph position on the left side under horizontal road
amph.position.set(-40, 7.5, 15);
amph.castShadow = true;
amph.receiveShadow = true;
scene.add(amph);


//benches 

//materials
const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // brown wood
const legMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });  // gray metal

//function to create a single bench
function createBench(x, z, rotationY = 0) {
  const bench = new THREE.Group();

  //seat (wood)
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 8), seatMaterial);
  seat.position.set(0, 1, 0);
  bench.add(seat);

  //legs (metal)
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), legMaterial);
  leg1.position.set(0, 0.25, -3.5);
  const leg2 = leg1.clone();
  leg2.position.set(0, 0.25, 3.5);
  bench.add(leg1, leg2);

  bench.position.set(x, 0, z);
  bench.rotation.y = rotationY;
  scene.add(bench);
}
createBench(15, 10, 0); 
createBench(15, 50, 0); 


//animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

//responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
