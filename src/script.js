import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Scene } from 'three'
import desertGroundVertexShader from './shaders/desertGround/vertex.glsl'
import desertGroundFragmentShader from './shaders/desertGround/fragment.glsl'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// /**
//  * Base
//  */
// // Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const light = new THREE.AmbientLight( 0xFFFFFF );
scene.add(light)

//Terrain (two meshes)

var audioFiles = [0,0,0]

function placeSpectrograms(audioFiles){
    
}

const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.y += Math.PI/2
scene.add( plane );

scene.add(new THREE.AxesHelper())

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -5
camera.position.y = 3.0
camera.lookAt(0,0,0)
// camera.position.x = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );


/**
 * Animate
 */
const clock = new THREE.Clock()
let delta = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    delta += clock.getDelta();
}

tick()



renderer.setAnimationLoop( function () {
    tick()
	renderer.render( scene, camera );

} );


