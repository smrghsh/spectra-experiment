attribute float displacement;
uniform vec3 vLut[256];
varying vec3 vColor;
varying float flag;

void main(){
    int index = int(displacement);
    vColor = vLut[index];
    vec3 newPosition = position + normal*displacement/25.5;
    flag = round(displacement)/round(displacement); //0 or 1
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
}