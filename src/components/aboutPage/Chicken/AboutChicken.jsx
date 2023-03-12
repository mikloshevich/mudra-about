import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    CubeCamera,
    Environment,
    useGLTF,
    useFBO,
    useCubeTexture,
    useEnvironment,
    OrbitControls,
} from '@react-three/drei'
import * as THREE from 'three'
import { Leva, folder, useControls } from 'leva'
import model from '../../../assets/aboutPage/chicken/gltf/chicken3_threejs_smooth2.gltf?url'
import hdri1 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri1.png'
import hdri6 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri6.png'
import hdri7 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri7.png'
import hdriNew1 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew1.png'
import hdriNew2 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew2.png'
import hdriNew5 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew5.png'
import hdriBlack from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriBlack.png'
import fragmentShader from './glsl/fragmentShader'
import vertexShader from './glsl/vertexShader'
import { v4 as uuidv4 } from 'uuid'

// https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/shanghai_bund_1k.hdr
// https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/syferfontein_1d_clear_puresky_1k.hdr
// https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/circus_arena_1k.hdr
const ChickenModel = ({ chickenModel, setModelLoaded }) => {
    const { scene } = useGLTF(model)
    // const texture = useCubeTexture([hdriBlack, hdriBlack, hdriBlack, hdriBlack, hdriBlack, hdriNew5], { path: '' })
    const texture = useEnvironment({
        files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/shanghai_bund_1k.hdr',
    })

    const mainRenderTarget = useFBO()

    const { iorR, iorG, iorB, saturation, chromaticAberration, refraction } = useControls({
        ior: folder({
            iorR: { min: 1.0, max: 2.333, step: 0.001, value: 1.15 },
            iorG: { min: 1.0, max: 2.333, step: 0.001, value: 1.18 },
            iorB: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
        }),
        saturation: { value: 1.06, min: 1, max: 1.25, step: 0.01 },
        chromaticAberration: {
            value: 0.5,
            min: 0,
            max: 1.5,
            step: 0.01,
        },
        refraction: {
            value: 0.4,
            min: 0,
            max: 1,
            step: 0.01,
        },
    })

    // const iorR = useRef({ value: 1.15 })
    // const iorG = useRef({ value: 1.18 })
    // const iorB = useRef({ value: 1.22 })

    const uniforms = useMemo(
        () => ({
            uTexture: {
                value: null,
            },
            uIorR: {
                value: 1.0,
            },
            uIorG: {
                value: 1.0,
            },
            uIorB: {
                value: 1.0,
            },
            uRefractPower: {
                value: 0.2,
            },
            uChromaticAberration: {
                value: 1.0,
            },
            uSaturation: { value: 0.0 },
            winResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
                    Math.min(window.devicePixelRatio, 2)
                ), // if DPR is 3 the shader glitches 🤷‍♂️
            },
        }),
        []
    )

    useFrame((state) => {
        const { gl, scene, camera } = state
        chickenModel.current.visible = false
        gl.setRenderTarget(mainRenderTarget)
        gl.render(scene, camera)

        chickenModel.current.material.uniforms.uTexture.value = mainRenderTarget.texture

        gl.setRenderTarget(null)
        chickenModel.current.visible = true

        chickenModel.current.material.uniforms.uIorR.value = iorR
        chickenModel.current.material.uniforms.uIorG.value = iorG
        chickenModel.current.material.uniforms.uIorB.value = iorB

        chickenModel.current.material.uniforms.uSaturation.value = saturation
        chickenModel.current.material.uniforms.uChromaticAberration.value = chromaticAberration
        chickenModel.current.material.uniforms.uRefractPower.value = refraction
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

    const columns = range(-6.5, 6.5, 1.5)
    const rows = range(-6.5, 6.5, 1.5)

    useEffect(() => {
        setModelLoaded(true)
        return () => setModelLoaded(false)
    }, [])

    return (
        <>
            <color attach="background" args={['#555555']} />
            <group>
                {columns.map((col, i) =>
                    rows.map((row, j) => (
                        <mesh key={i + j + 1} position={[col, row, -4]}>
                            <icosahedronGeometry args={[0.333, 8]} />
                            <meshStandardMaterial color="white" />
                        </mesh>
                    ))
                )}
            </group>
            <mesh
                ref={chickenModel}
                dispose={null}
                geometry={scene.children[0].geometry}
                position={[0, 0.5, 1]}
                scale={[1, 1, 1]}
                rotation={[0, 0, 0]}>
                {/* <icosahedronGeometry args={[2.84, 20]} /> */}
                <shaderMaterial
                    key={uuidv4()}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>
        </>
    )
}

const AboutChicken = ({ chickenModel, setModelLoaded }) => {
    return (
        <div className="aboutChicken__wrapper">
            <div className="aboutChicken__3DModel">
                <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 16.8], fov: 45 }}
                    // onCreated={(state) => state.gl.setClearColor(0x171717, 0.0)}
                >
                    <Suspense fallback={null}>
                        <group>
                            <ambientLight intensity={1} />
                            <ChickenModel chickenModel={chickenModel} setModelLoaded={setModelLoaded} />
                        </group>
                        {/* <Environment preset="forest" /> */}
                        {/* <Environment
                                files={[hdriBlack, hdriBlack, hdriNew5, hdriBlack, hdriBlack, hdriNew5]}
                                preset={null}
                            /> */}
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
                        d="M389.91,127.84c13.38-26.45,43.29-39.48,71.81-40.66-3.31,62.68,15.41,165.75-32.18,217.2,15.65,1.28,48.17,26.85,46.45,27.72-45.05,36.69-89.75,106.18-153.93,66-13.26,8.23-21.9,12.72-21.9,12.72s-8.72-4.52-22.1-12.82C213.83,438.42,169,368.79,124,332.1c-1.57-1,31-26.54,46.71-27.77-46.64-48.25-29.27-157.49-32.12-217.14,33.39.93,68.12,20,77.08,53.93,43.8-2,85.17,31.18,84.5,76.62-.65-45.43,40.62-78.69,84.43-76.62A77,77,0,0,1,389.91,127.84Z"
                    />
                </svg>
            </div>
        </div>
    )
}

useGLTF.preload(model)

export default AboutChicken
