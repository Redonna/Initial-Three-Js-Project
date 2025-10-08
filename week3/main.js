// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEF); // Sky blue background

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Floor (Plane)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc, 
    roughness: 0.8,
    metalness: 0.2
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// First Geometry - Cube (light coral pink)
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffb6b9, 
    roughness: 0.3,
    metalness: 0.7
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-4, 1, 0);
cube.castShadow = true;
scene.add(cube);

// Second Geometry - Sphere (mint green)
const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xb5ead7, 
    roughness: 0.2,
    metalness: 0.8
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1.5, 0);
sphere.castShadow = true;
scene.add(sphere);

// Third Geometry - Cylinder (light pastel blue)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xa2d2ff, 
    roughness: 0.4,
    metalness: 0.6
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(4, 1.5, 0);
cylinder.castShadow = true;
scene.add(cylinder);

// Right Light Source (orange) 
const pointLightRight = new THREE.PointLight(0xff7f50, 0.9, 25);
pointLightRight.position.set(6, 5, 6);
pointLightRight.castShadow = true;
scene.add(pointLightRight);

// Left Light Source (pink) 
const pointLightLeft = new THREE.PointLight(0xffb6c1, 0.9, 25);
pointLightLeft.position.set(-6, 5, 6);
pointLightLeft.castShadow = true;
scene.add(pointLightLeft);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotation
    cube.rotation.y += 0.005;
    sphere.rotation.x += 0.2;
    cylinder.rotation.y += 0.3;
    
    renderer.render(scene, camera);
}

// Handling window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Starting the animation
animate();
