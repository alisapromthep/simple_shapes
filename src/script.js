import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { Material } from 'three';

const gui = new GUI();

const parameters = {
	cssColor: '#ff00ff',
	rgbColor: { r: 0, g: 0.2, b: 0.4 },
	customRange: [ 0, 127, 255 ],
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.BoxGeometry(1, 1, 1);
const cone = new THREE.ConeGeometry(1,1,3);
const ball = new THREE.SphereGeometry(0.9,10,10)

//each set is a vertex 

const redMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const blueMaterial = new THREE.MeshBasicMaterial({color: 0x3f37c9});
const greenMaterial = new THREE.MeshBasicMaterial({color: 0x0a9396});
const cubeMesh = new THREE.Mesh(cube, redMaterial);
cubeMesh.position.x = -2;
const coneMesh = new THREE.Mesh(cone, blueMaterial);
const ballMesh = new THREE.Mesh(ball, greenMaterial);
ballMesh.position.x = 2;

//gui.addColor(cubeMesh, parameters, 'cssColor');

gui.add(cubeMesh.position, 'y');
gui.add(coneMesh.position, 'y');

gui.addColor(redMaterial, 'color').name('cube color')



const group = new THREE.Group();
scene.add(group);
group.add(cubeMesh, coneMesh,ballMesh)

const floor = new THREE.PlaneGeometry(6,5);
const floorMaterial = new THREE.MeshBasicMaterial({color: 0xe5e5e5})
const floorMesh = new THREE.Mesh(floor, floorMaterial);
floorMesh.rotation.x = - Math.PI/2;
floorMesh.position.set = (0,0);

scene.add(floorMesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5;
camera.position.y = 2;
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const sinTime = Math.sin(elapsedTime)+2;
    const bounceTime = sinTime > 0 ? sinTime: sinTime*-1;

    //animation, bouncing 
    cubeMesh.position.y = bounceTime * 1/4;
    coneMesh.position.y = bounceTime * 1/3;
    ballMesh.position.y = bounceTime * 1/2;
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()