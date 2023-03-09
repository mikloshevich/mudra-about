import { useGLTF, useCubeTexture, useProgress } from '@react-three/drei'
import model from '../../../assets/aboutPage/chicken/gltf/chicken3_threejs_smooth2.gltf?url'
// import texture from '../../../assets/aboutPage/chicken/rainbow4-text4.jpg'

const ChickenModel = ({ chickenModel, setModelLoaded }) => {
    const { scene } = useGLTF(model)
    // const envMap = useCubeTexture([texture, texture, texture, texture, texture, texture], { path: '' })

    useProgress((state) => {
        if (state.progress === 100) {
            setModelLoaded(true)
        }
    })

    // const materialProps = useControls({
    //     thickness: { value: 5, min: 0, max: 20 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    //     clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    //     ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    //     envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    //     color: '#ffffff',
    //     attenuationTint: '#ffe79e',
    //     attenuationDistance: { value: 0, min: 0, max: 1 }
    //   })

    return (
        <mesh
            ref={chickenModel}
            geometry={scene.children[0].geometry}
            position={[0, 0.5, 1]}
            scale={[1, 1, 1]}
            rotation={[0, 0, 0]}>
            <meshPhysicalMaterial
                attach="material"
                roughness={0.0}
                metalness={0.0}
                transmission={1.0}
                reflectivity={0.0}
                thickness={1.0}
                clearcoat={0.2}
                clearcoatRoughness={0.0}
                ior={2.5}
                color={0xffffff}
                flatShading={false}
                transparent={true}
                // opacity={0.0}
                envMapIntensity={3.5}
            />
        </mesh>
    )
}

useGLTF.preload(model)

export default ChickenModel
