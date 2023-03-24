const vertexShader = /* glsl */ `

void main() {
    // vec3 newPos = position;
    // newPos.z = newPos.z + 10.0
	vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    // newPos.z = 0.5
    gl_Position = vec4(position, 1.0);
    gl_Position.z = 2.0 * (position.z / 100.0) - 1.0;
    // gl_Position = worldPos;
    // gl_Position = projectionMatrix * mvPosition;
    // gl_Position = modelMatrix * vec4(position, 1.0);
}
`
export default vertexShader
