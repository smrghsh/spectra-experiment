import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import cloudVertexShader from './shaders/cloud/vertex.glsl'
import cloudFragmentShader from './shaders/cloud/fragment.glsl'
import oceanVertexShader from './shaders/ocean/vertex.glsl'
import oceanFragmentShader from './shaders/ocean/fragment.glsl'
import moonVertexShader from './shaders/moon/vertex.glsl'
import moonFragmentShader from './shaders/moon/fragment.glsl'
// import CCapture from 'ccapture.js'

import { SubtractiveBlending } from 'three'


// var capturer = new CCapture( { format: 'jpg' } );

// make sure to set aspect before doing this
var capturer = new CCapture( { format: 'webm' } );
/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper())


/**
 * Sizes
 */
const sizes = {
    width: 1080,
    height: 1080
}

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-1, 1, 2)
camera.lookAt(0.5,0.5,0)
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

/**
 * Animate
 */
const clock = new THREE.Clock()

var captureFlag = true;

capturer.start();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    capturer.capture( canvas )
}

tick()
