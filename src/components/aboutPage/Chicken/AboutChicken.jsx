import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useGLTF, useProgress } from '@react-three/drei'
import model from '../../../assets/aboutPage/chicken/gltf/chicken3_threejs_smooth2.gltf?url'
import hdri1 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri1.png'
import hdri6 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri6.png'
import hdri7 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdri7.png'
import hdriNew1 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew1.png'
import hdriNew2 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew2.png'
import hdriNew5 from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriNew5.png'
import hdriBlack from '../../../assets/aboutPage/chicken/mudra-studio-hdri/hdriBlack.png'

const ChickenModel = ({ chickenModel, setModelLoaded }) => {
    const { scene } = useGLTF(model)

    useProgress((state) => {
        if (state.progress === 100) {
            setModelLoaded(true)
        }
    })

    return (
        <mesh
            ref={chickenModel}
            dispose={null}
            geometry={scene.children[0].geometry}
            position={[0, 0.5, 1]}
            scale={[1, 1, 1]}
            rotation={[0, 0, 0]}>
            <meshPhysicalMaterial
                attach="material"
                roughness={0.0}
                metalness={1.0}
                transmission={0.0}
                reflectivity={1.0}
                thickness={0.01}
                clearcoat={0.0}
                clearcoatRoughness={0.0}
                ior={1.5}
                color={0xffffff}
                flatShading={false}
                transparent={false}
                envMapIntensity={1.5}
                // opacity={0.0}
            />
        </mesh>
    )
}

const AboutChicken = ({ chickenModel, setModelLoaded }) => {
    return (
        <div className="aboutChicken__wrapper">
            <div className="aboutChicken__container">
                <div className="aboutChicken__3DModel">
                    <Canvas
                        dpr={[1, 2]}
                        camera={{ position: [0, 0, 9.5], fov: 45 }}
                        onCreated={(state) => state.gl.setClearColor(0x171717, 0.0)}>
                        <Suspense fallback={null}>
                            <spotLight position={[-2, 7, 5]} lookAt={[0, 0, 0]} intensity={5} color={0xffffff} />
                            <pointLight position={[-2, 7, 3]} intensity={3} color={0xffffff} />
                            <ChickenModel chickenModel={chickenModel} setModelLoaded={setModelLoaded} />
                            {/* <Environment preset="forest" /> */}
                            <Environment
                                files={[hdriBlack, hdriNew5, hdriBlack, hdriBlack, hdriBlack, hdriNew5]}
                                preset={null}
                            />
                        </Suspense>
                    </Canvas>
                </div>
                <svg
                    className="aboutChicken__svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 600 352">
                    <circle className="chickenCircle__left" cx="300" cy="176" r="128" />
                    <circle className="chickenCircle__right" cx="300" cy="176" r="128" />
                    <path
                        visibility="hidden"
                        className="chickenTwoCircles"
                        d="M374,48a127.4,127.4,0,0,0-74,23.55,128,128,0,1,0,0,208.9A128,128,0,1,0,374,48Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenHeart"
                        d="M392.19,26.52C361.46,26.86,300,43.13,300,105.71c0-62.58-61.46-78.85-92.19-79.19C179.87,25.62,124,44.06,124,125.26S241.33,292.57,300,325.52c58.67-32.9,176-119,176-200.21S420.13,25.62,392.19,26.52Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenDevi"
                        d="M434.77,9.78A76.68,76.68,0,0,0,392,58.67c-50.38-2-94.68,36-92,88,2.7-52-41.69-89.91-92-88C198.19,21.75,160.35,1,124,0V143.41C124,260.74,300,352,300,352s176.07-91.53,176-208.59V0A111.32,111.32,0,0,0,434.77,9.78Z"
                    />
                    <path
                        visibility="hidden"
                        className="chickenChicken"
                        d="M210.08,297.14c-13.38,26.45-43.29,39.49-71.81,40.66,3.31-62.67-15.41-165.75,32.18-217.2C154.8,119.33,122.28,93.76,124,92.89c45.05-36.69,89.75-106.18,153.93-66,13.26-8.23,21.9-12.72,21.9-12.72s8.72,4.52,22.1,12.82C386.16-13.43,431,56.2,476,92.89c1.57,1-31,26.54-46.71,27.77,46.64,48.25,29.27,157.48,32.12,217.14-33.39-.93-68.12-20-77.08-53.93-43.8,2-85.17-31.18-84.5-76.62.65,45.43-40.62,78.69-84.43,76.62A76.17,76.17,0,0,1,210.08,297.14Z"
                    />
                </svg>
            </div>
        </div>
    )
}

useGLTF.preload(model)

export default AboutChicken
