import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class CromaAberationMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                tChromAber: {
                    value: null,
                },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.NoBlending,
            // transparent: true,
            // depthTest: false,
            // depthWrite: false,
        })
    }
}

export default CromaAberationMaterial
