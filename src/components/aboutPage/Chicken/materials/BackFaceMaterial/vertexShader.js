const vertexShader = /* glsl */ `
varying vec3 worldNormal;

void main() {
	worldNormal = normalize( modelViewMatrix * vec4(normal, 0.0)).xyz;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
