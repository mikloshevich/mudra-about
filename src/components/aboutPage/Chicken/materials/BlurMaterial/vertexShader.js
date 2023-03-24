const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    vUv = uv;
    vPosition = position;

    // gl_Position = projectionMatrix * mvPosition;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vec4(position, 1.0);
}
`
export default vertexShader
