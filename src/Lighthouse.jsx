import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
let renderer
let camera
let controls

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()
}

function render () {
  requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}

export default function Lighthouse () {
  const refContainer = useRef()
  let rendererEl

  useEffect(() => {
    const { current: container } = refContainer

    async function setup () {
      // setup lights
      scene.background = new THREE.Color(0x4B9DFF)
      const light = new THREE.AmbientLight(0xFFFFFF)
      scene.add(light)

      // setup the camera
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
      camera.position.set(-36, 8, -38)
      camera.lookAt(0, 0, 0)

      // load the model
      const loader = new GLTFLoader()

      loader.load('blender-lighthouse/lighthouse.gltf', (gltf) => {
        scene.add(gltf.scene)

        render()
      })

      // setup the renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.outputEncoding = THREE.sRGBEncoding
      rendererEl = renderer.domElement
      container.appendChild(rendererEl)

      // setup the camera
      controls = new OrbitControls(camera, renderer.domElement)
      controls.minPolarAngle = 0
      controls.maxPolarAngle = Math.PI * 0.4
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.25
      controls.minDistance = 10
      controls.maxDistance = 60
      controls.enablePan = false

      window.addEventListener('resize', onWindowResize)
    }

    if (container) {
      setup()
    }

    return () => {
      renderer.dispose()
      container.removeChild(rendererEl)
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }} ref={refContainer} />
  )
}
