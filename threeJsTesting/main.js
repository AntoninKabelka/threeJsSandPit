import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//initial setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

// add camera
camera.position.setZ(50);


// add object
const eathTexture = new THREE.TextureLoader().load('img/textures/earth.jpeg')
const earth = new THREE.Mesh( 
	new THREE.SphereGeometry(20, 50, 50), 
	new THREE.MeshStandardMaterial( {map: eathTexture} )
);
scene.add(earth);
earth.rotation.z = 0.5;

// add point ligth
const pointLight = new THREE.PointLight(0xfdfbd3, 2);
pointLight.position.set(-50,22,50);

// add ambient ligth
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);


// helper obejcts 
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// add mouse orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// add skybox
const skybox = new THREE.CubeTextureLoader()
	.setPath( 'img/skyboxes/space/' )
	.load( [
		'front.png',
		'back.png',
		'top.png',
		'bottom.png',
		'left.png',
		'right.png'
	] );

console.log(skybox);
scene.background = skybox;


function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
	const star = new THREE.Mesh( geometry, material );

	const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

	star.position.set(x,y,z)
	scene.add(star)
}

// Array(200).fill().forEach(addStar) 


// run scene with animation
function animate(){
	requestAnimationFrame( animate );
	earth.rotation.x += 0.00;
	earth.rotation.y += 0.005;
	earth.rotation.z += 0.00;

	controls.update()
	renderer.render( scene, camera );
}
animate()