import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class BlurMaterial extends THREE.ShaderMaterial {
    constructor(uniforms) {
        super({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            // transparent: true,
            blending: THREE.NoBlending,
            // blending: THREE.MultiplyBlending,
        })
    }
}

export default BlurMaterial
