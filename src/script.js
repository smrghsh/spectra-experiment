import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Scene } from 'three'

import horizontalGridVertexShader from './shaders/horizontalGrid/vertex.glsl'
import horizontalGridFragmentShader from './shaders/horizontalGrid/fragment.glsl'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

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
scene.background = new THREE.Color('rebeccapurple')

//light
const light = new THREE.AmbientLight( 0xFFFFFF );
scene.add(light)

//grid floorplane
const geometry = new THREE.PlaneGeometry( 100, 100 );
const horizontalGridMaterial = new THREE.ShaderMaterial({
    vertexShader: horizontalGridVertexShader,
    fragmentShader: horizontalGridFragmentShader,
    transparent: true,
})
const floorPlane = new THREE.Mesh( geometry, horizontalGridMaterial );
floorPlane.rotation.x -= Math.PI/2
scene.add( floorPlane );




// Initialize Scene parameters
let frequency_samples = 512; // Y resolution
let DATA = new Uint8Array(frequency_samples); // for later
let heights, spectraMesh;
let time_samples = 1200; // X resolution
let n_vertices = (frequency_samples+1) * (time_samples+1);
let xsegments = time_samples;
let ysegments = frequency_samples;
let xsize = 35; 
let ysize = 20;
let xhalfSize = xsize/2;
let yhalfSize = ysize / 2;
let xsegmentSize = xsize / xsegments; //Size of one square
let ysegmentSize = ysize / ysegments;










//audio stuffs
const spectraGeometry = new THREE.BufferGeometry();
let indices = [];
heights = [];
let vertices = [];
// generate vertices for a simple grid geometry
for (let i = 0; i <= xsegments; i ++ ) {
    let x = ( i * xsegmentSize ) - xhalfSize; //midpoint of mesh is 0,0
    for ( let j = 0; j <= ysegments; j ++ ) {
        let y = (j * ysegmentSize) - yhalfSize;
        vertices.push( x, y, 0);
        heights.push(0); // for now our mesh is flat, so heights are zero
    }
}
// Add the position data to the geometry buffer
spectraGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

for (let i = 0; i < xsegments; i ++ ) {
    for ( let j = 0; j < ysegments; j ++ ) {
        let a = i * ( ysegments + 1 ) + ( j + 1 );
        let b = i * ( ysegments + 1 ) + j;
        let c = ( i + 1 ) * ( ysegments + 1 ) + j;
        let d = ( i + 1 ) * ( ysegments + 1 ) + ( j + 1 );
        // generate two faces (triangles) per iteration
        indices.push( a, b, d ); // face one
        indices.push( b, c, d ); // face two
    }
}
spectraGeometry.setIndex( indices );

let spectraMaterial = new THREE.MeshBasicMaterial({color:"#433F81"});
spectraMesh = new THREE.Mesh( spectraGeometry, spectraMaterial );
scene.add(spectraMesh);






//axis
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
    // material.uniforms.uTime.value = elapsedTime;
}

tick()



renderer.setAnimationLoop( function () {
    tick()
	renderer.render( scene, camera );

} );


