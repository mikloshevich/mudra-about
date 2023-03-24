const vertexShader = /* glsl */ `
uniform vec3 viewVector;
const float c = 0.3;
const float p = 4.0;
varying float intensity;
varying vec3 eyeVector;
varying vec2 vUv;

void main() {
    vUv = uv;
	vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    eyeVector = normalize(worldPos.xyz - cameraPosition);

    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * eyeVector);
	intensity = pow( c - dot(vNormal, vNormel), p);

    // gl_Position = vec4(position, 1.0);
    // gl_Position = projectionMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
export default vertexShader
