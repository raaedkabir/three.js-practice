import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import * as STDLIB from 'three-stdlib'

export default function ProcedurallyGenerated () {
  const refContainer = useRef()

  useEffect(() => {
    const { current: container } = refContainer

    // set up the Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#FFEECC')

    // set up the Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(-20, 0, 0)

    // set up the WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    const rendererEl = renderer.domElement
    container.appendChild(rendererEl)
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    // add Light
    const light = new THREE.PointLight(new THREE.Color(0xff9845).convertSRGBToLinear(), 2, 200)
    light.position.set(10, 20, 20)
    light.castShadow = true
    light.shadow.mapSize.width = 512
    light.shadow.mapSize.height = 512
    light.shadow.camera.near = 0.5
    light.shadow.camera.far = 500
    scene.add(light)

    // set up Camera Controls
    const controls = new OrbitControls(camera, rendererEl)
    controls.target.set(0, 0, 0)
    controls.dampingFactor = 0.05
    controls.enableDamping = true

    let gui

    async function setup () {
      /**
       * process environment map
       * source: https://polyhaven.com/hdris
       */
      const pmrem = new THREE.PMREMGenerator(renderer)
      const envMapTexture = await new STDLIB.RGBELoader().setDataType(THREE.FloatType).loadAsync('envmap.hdr')
      const envMap = pmrem.fromEquirectangular(envMapTexture).texture

      const geometry = new THREE.SphereGeometry(5, 10, 10)
      const basicMaterial = new THREE.MeshBasicMaterial({ color: '#ff0000' })
      const standardMaterial = new THREE.MeshStandardMaterial({
        envMap,
        roughness: 0,
        metalness: 1
      })
      const sphereMesh = new THREE.Mesh(
        geometry,
        basicMaterial
      )
      scene.add(sphereMesh)

      // standardMaterial.flatShading = true

      // add GUI controls
      gui = new GUI()
      gui.add(sphereMesh, 'material', { 'Basic Material': basicMaterial, 'Standard Material': standardMaterial }).name('Choose Material')
      gui.add(standardMaterial, 'roughness', 0, 1).name('Roughness')
      gui.add(standardMaterial, 'metalness', 0, 1).name('Metalness')
      gui.add(sphereMesh.material, 'wireframe').name('Wireframe')
      gui.add(standardMaterial, 'flatShading').name('Flat Shading')
      gui.addColor(sphereMesh.material, 'color').name('Color').onChange((e) => {
        sphereMesh.material.color.set(e)
      })
      gui.open()

      renderer.setAnimationLoop(() => {
        controls.update()
        renderer.render(scene, camera)
      })

      window.addEventListener('resize', handleResize)
    }

    if (container) {
      setup()
    }

    return () => {
      renderer.dispose()
      gui.hide()
      container.removeChild(rendererEl)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }} ref={refContainer} />
  )
}
