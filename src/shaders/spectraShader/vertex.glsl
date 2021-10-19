attribute float displacement;
uniform vec3 vLut[1];
varying vec3 vColor;

void main(){
    vColor = vLut[0];
    vec3 newPosition = position + normal*displacement/25.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
}