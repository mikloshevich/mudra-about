import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class BlurMaterial extends THREE.ShaderMaterial {
    constructor(direction = new THREE.Vector2(0.5, 0.5)) {
        super({
            uniforms: {
                tBlur: { value: null },
                uBluriness: { value: 1 },
                uDirection: { value: direction },
                winResolution: { value: new THREE.Vector2() },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.NoBlending,
            // blending: THREE.MultiplyBlending,
            // transparent: true,
        })
    }
}

export default BlurMaterial
