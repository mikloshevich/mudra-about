import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class BackFaceMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide,
        })
    }
}

export default BackFaceMaterial
