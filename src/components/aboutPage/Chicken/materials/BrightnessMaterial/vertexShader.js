const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
	vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;

    vUv = uv;

    gl_Position = vec4(position, 1.0);
    // gl_Position = projectionMatrix * mvPosition;
}
`
export default vertexShader
