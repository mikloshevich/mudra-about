import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useGLTF, useFBO, OrbitControls, Svg, OrthographicCamera } from '@react-three/drei'
import { v4 as uuidv4 } from 'uuid'

import model from '../../../assets/aboutPage/chicken/gltf/chicken3_threejs_smooth2.gltf?url'
import svgChicken from '../../../assets/aboutPage/chicken/chickenChicken-02.svg'

import RefractionMaterial from './materials/RefractionMaterial/RefractionMaterial'
import BrightnessMaterial from './materials/BrightnessMaterial/BrightnessMaterial'
import BlurMaterial from './materials/BlurMaterial/BlurMaterial'
import BlurMaterial2 from './materials/BlurMaterial2/BlurMaterial'
import ComposeMaterial from './materials/ComposeMaterial/ComposeMaterial'

extend({ RefractionMaterial })

const ChickenModel = ({ chickenModel, setModelLoaded }) => {
    const { scene } = useGLTF(model)

    const background = useRef()
    const brightnessPlane = useRef()
    const screen = useRef()
    const screenCamera = useRef()

    const firstRenderTarget = useFBO()
    const chickenRenderTarget = useFBO()
    const brigthnessTarget = useFBO()
    const blurTarget = useFBO()
    const blurTargetA = useFBO()
    const blurTargetB = useFBO()
    const finalTarget = useFBO()

    const { size, camera } = useThree()

    const uniforms = useMemo(
        () => ({
            uTexture: {
                value: null,
            },
            uBrightTex: {
                value: null,
            },
            uBlurTex: {
                value: null,
            },
            uTime: {
                value: 0,
            },
            uRefractStage: {
                value: 0,
            },
            winResolution: {
                value: new THREE.Vector2(size.width, size.height).multiplyScalar(
                    Math.min(window.devicePixelRatio, 2)
                ), // if DPR is 3 the shader glitches 🤷‍♂️
            },
            flatShading: {
                value: true,
            },
        }),
        []
    )

    const attributes = useMemo(() => {
        const geometry = scene.children[0].geometry
        const len = geometry.attributes.normal.array.length
        const values = []
        // console.log(geometry.attributes.normal.array[0])
        for (let i = 0; i < len; i++) {
            // values.push(geometry.attributes.normal.array[i] * 2)
            values.push(Math.random() * 10)
        }
        const attrs = {
            position: {
                value: new Float32Array(geometry.attributes.position.array), // geometry.attributes.position,
            },
            normal: {
                value: geometry.attributes.normal,
            },
            indices: {
                value: geometry.index,
            },
            displacement: {
                value: new Float32Array(values),
            },
        }
        return attrs
    }, [scene])

    const brightMaterial = useRef(new BrightnessMaterial(uniforms))
    const blurMaterial = useRef(new BlurMaterial(uniforms))
    const hBlurMaterial = useRef(new BlurMaterial2(new THREE.Vector2(1, 0)))
    const vBlurMaterial = useRef(new BlurMaterial2(new THREE.Vector2(0, 1)))
    const composeMaterial = useRef(new ComposeMaterial())

    useEffect(() => {
        // console.clear()
        hBlurMaterial.current.uniforms.winResolution.value = uniforms.winResolution.value
        vBlurMaterial.current.uniforms.winResolution.value = uniforms.winResolution.value
        chickenModel.current.geometry.setAttribute(
            'displacement',
            new THREE.BufferAttribute(attributes.displacement.value, 3)
        )

        setModelLoaded(true)
        return () => setModelLoaded(false)
    }, [])

    useFrame((state) => {
        const { clock, gl, scene, camera } = state

        // glowRef.current.visible = false
        // brightnessPlane.current.visible = false
        // blurPlane.current.visible = false
        screen.current.visible = false
        chickenModel.current.visible = false
        background.current.visible = true

        gl.setRenderTarget(null)
        gl.render(scene, camera)

        gl.setRenderTarget(chickenRenderTarget)
        gl.render(scene, camera)
        // gl.setRenderTarget(null)

        chickenModel.current.material.uniforms.uRefractStage.value = 0
        chickenModel.current.material.uniforms.uTexture.value = chickenRenderTarget.texture

        chickenModel.current.visible = true
        background.current.visible = false

        gl.setRenderTarget(firstRenderTarget)
        gl.render(scene, camera)

        // brightMaterial.current.uniforms.uBrightTex.value = firstRenderTarget.texture
        // screen.current.material = brightMaterial.current

        chickenModel.current.material.uniforms.uRefractStage.value = 1
        chickenModel.current.material.uniforms.uTexture.value = firstRenderTarget.texture

        gl.setRenderTarget(brigthnessTarget)
        gl.render(scene, camera)

        brightMaterial.current.uniforms.uBrightTex.value = brigthnessTarget.texture
        screen.current.material = brightMaterial.current

        chickenModel.current.visible = false
        screen.current.visible = true

        // gl.setRenderTarget(blurTarget)
        // gl.render(screen.current, screenCamera.current)

        // blurMaterial.current.uniforms.uBlurTex.value = blurTarget.texture
        // screen.current.material = blurMaterial.current

        // gl.setRenderTarget(finalTarget)
        // gl.render(screen.current, screenCamera.current)

        gl.setRenderTarget(blurTargetA)
        gl.render(screen.current, screenCamera.current)
        hBlurMaterial.current.uniforms.tBlur.value = blurTargetA.texture
        screen.current.material = hBlurMaterial.current

        gl.setRenderTarget(blurTargetB)
        gl.render(screen.current, screenCamera.current)
        vBlurMaterial.current.uniforms.tBlur.value = blurTargetB.texture
        screen.current.material = vBlurMaterial.current
        gl.setRenderTarget(blurTarget)
        gl.render(screen.current, screenCamera.current)

        composeMaterial.current.uniforms.tOriginal.value = firstRenderTarget.texture
        composeMaterial.current.uniforms.tFirst.value = brigthnessTarget.texture
        composeMaterial.current.uniforms.tBright.value = blurTargetA.texture
        composeMaterial.current.uniforms.tBlur.value = blurTarget.texture
        screen.current.material = composeMaterial.current

        gl.setRenderTarget(null)
        gl.render(screen.current, screenCamera.current)

        background.current.visible = true

        // chickenModel.current.rotation.y = clock.getElapsedTime() * 0.5
        chickenModel.current.material.uniforms.uTime.value = clock.getElapsedTime() * 3
    })

    const range = (start, end, step = 1) => {
        let output = []
        if (typeof end === 'undefined') {
            end = start
            start = 0
        }
        for (let i = start; i <= end; i += step) {
            output.push(i)
        }
        return output
    }

    const cols = range(-30, 35, 5)
    const rows = range(-25, 40, 5)

    return (
        <>
            <OrthographicCamera ref={screenCamera} position={[0, 0, 0]} lookAt={[0, 0, 0]} />
            <mesh ref={screen} frustumCulled={false}>
                <planeGeometry args={[2, 2, 1, 1]} />
            </mesh>
            <OrthographicCamera position={[0, 0, 0]}>
                <group ref={background}>
                    {cols.map((col, i) =>
                        rows.map((row, j) => (
                            <mesh key={i + j} position={[col, row + 8, -35]} scale={[0.01, 0.01, 0.01]}>
                                <Svg src={svgChicken} fillMaterial={{ color: 0xffffff }} />
                            </mesh>
                        ))
                    )}
                </group>
            </OrthographicCamera>
            <mesh
                ref={chickenModel}
                geometry={scene.children[0].geometry}
                position={[0, 0.05, 0]}
                scale={[0.14, 0.14, 0.14]}
                dispose={null}>
                <refractionMaterial key={uuidv4()} args={[uniforms]} />
            </mesh>
        </>
    )
}

const AboutChicken = ({ chickenModel, setModelLoaded }) => {
    return (
        <div className="aboutChicken__wrapper">
            <div className="aboutChicken__3DModel">
                <Canvas dpr={[1, 2]} camera={{ position: [0.2, -0.2, 2.0], fov: 45 }}>
                    <ambientLight intensity={1} />
                    {/* <spotLight intensity={2} lookAt={[0, 0, 0]} color={0xffffff} /> */}
                    <Suspense fallback={null}>
                        <ChickenModel chickenModel={chickenModel} setModelLoaded={setModelLoaded} />
                    </Suspense>
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
            <div className="aboutChicken__container">
                <svg
                    className="aboutChicken__svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 600 498">
                    <circle className="chickenCircle__left" cx="300" cy="249" r="128" />
                    <circle className="chickenCircle__right" cx="300" cy="249" r="128" />
                    <path
                        visibility="hidden"
                        className="chickenTwoCircles"
                        d="M374,121a127.4,127.4,0,0,0-74,23.55,128,128,0,1,0,0,208.9A128,128,0,1,0,374,121Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenHeart"
                        d="M392.19,99.52c-30.73.34-92.19,16.61-92.19,79.19,0-62.58-61.46-78.85-92.19-79.19-27.94-.9-83.81,17.54-83.81,98.74S241.33,365.57,300,398.52c58.67-32.9,176-119,176-200.21S420.13,98.62,392.19,99.52Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenDevi"
                        d="M434.77,82.78A76.66,76.66,0,0,0,392,131.67c-50.38-2-94.68,36-92,88,2.7-52-41.69-89.91-92-88C198.19,94.75,160.35,74,124,73V216.41C124,333.74,300,425,300,425s176.07-91.53,176-208.59V73A111.32,111.32,0,0,0,434.77,82.78Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenChicken"
                        d="M398.07,117.22C412.66,88.46,445.28,74.28,476.39,73c-3.61,68.17,16.81,180.27-35.1,236.23,17.07,1.4,52.54,29.21,50.67,30.15-49.14,39.91-97.9,115.49-167.9,71.79C309.6,420.12,300.17,425,300.17,425s-9.51-4.92-24.1-13.94C206,455,157.12,379.29,108,339.38c-1.71-1.09,33.81-28.86,50.95-30.2C108.11,256.7,127.05,137.89,124,73c36.42,1,74.3,21.75,84.07,58.66,47.77-2.18,92.9,33.91,92.16,83.33-.7-49.41,44.31-85.58,92.09-83.33A83.55,83.55,0,0,1,398.07,117.22Z"
                    />
                </svg>
            </div>
        </div>
    )
}

useGLTF.preload(model)

export default AboutChicken
