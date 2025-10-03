import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Group
const group = new THREE.Group();
scene.add(group);

// All pink cones
const colors = 0xff69b4; // pink

const cone1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 2, 32),
    new THREE.MeshStandardMaterial({ color: colors })
);
cone1.position.set(-2, 0, 1); // in front of axes
group.add(cone1);

const cone2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 2, 32),
    new THREE.MeshStandardMaterial({ color: colors })
);
cone2.position.set(0, 0, 1);
group.add(cone2);

const cone3 = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 2, 32),
    new THREE.MeshStandardMaterial({ color: colors })
);
cone3.position.set(2, 0, 1);
group.add(cone3);

// Clock for motion
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // All cones move the same way
    group.children.forEach((cone) => {
        cone.rotation.x += 0.01;
        cone.rotation.y += 0.01;
        cone.position.y = Math.sin(t * 2) * 1.0; // bounce up/down
        cone.position.z = 1; // keep in front of axes
    });

    renderer.render(scene, camera);
}

animate();
