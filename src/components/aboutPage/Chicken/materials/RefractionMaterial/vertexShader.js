const vertexShader = /* glsl */ `
attribute float displacement;
uniform float uTime;

varying vec3 vViewPosition;
varying vec3 worldNormal;
varying vec3 eyeVector;
varying vec3 fresnelEyeVector;

void main() {
    vec3 vDisplacement = vec3(displacement * (sin(uTime) + 1.0)) * 0.05;
    vec3 displacedPos = position + normal * vDisplacement;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
    fresnelEyeVector = normalize(cameraPosition - worldPos.xyz);
    eyeVector = normalize(worldPos.xyz - cameraPosition);

    vViewPosition = -mvPosition.xyz;
}
`

export default vertexShader

/**
 *
varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  vec3 transformedNormal = normalMatrix * normal;
  worldNormal = normalize(transformedNormal);

  eyeVector = normalize(worldPos.xyz - cameraPosition);
}
 */
