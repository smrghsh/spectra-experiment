varying vec3 vPosition;
uniform float res;
uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //new code
    vec4 newModelPosition = modelPosition;
    float xVar = sin(uTime/1.0)*res;
    float distX = abs(newModelPosition.x - xVar);
    float xVar1 = cos(uTime/2.0)*res;
    float distX1 = abs(newModelPosition.x - xVar1);
    float yVar = cos(uTime/2.0)*res;
    float distY = abs(newModelPosition.y - yVar);
    newModelPosition.z = ((newModelPosition.z) / ((distX * distY)/(res*res)));
    newModelPosition.z = sqrt(3.0*log(abs(newModelPosition.z) / newModelPosition.z));

    vec4 viewPosition = viewMatrix * newModelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = 1.0;
    vPosition = newModelPosition.xyz;
}