import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// =====================================================
// INFORMATION BUTTON
// =====================================================
const circle = document.getElementById("circle");
const info = document.getElementById("info");

let hide = true;

circle.addEventListener("click", function () {

    if (hide) {
        circle.style.background = "darkorange";
        circle.style.color = "orange";
        info.style.width = "640px";
        info.style.height = "214px";
        info.style.padding = "20px";

    } else {
        circle.style.background = "rgba(255, 165, 0, 0.5)";
        circle.style.color = "rgba(255, 165, 0, 1)";
        info.style.width = "60px";
        info.style.height = "60px";
        info.style.padding = "50px";

    }
    hide = !hide;
});


// =====================================================
// SCENE
// =====================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101005);


// =====================================================
// CAMERA
// =====================================================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(3, 5, 8);
camera.position.setLength(15);


// =====================================================
// RENDERER
// =====================================================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
renderer.setClearColor(0x101005);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// =====================================================
// RESIZE
// =====================================================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});


// =====================================================
// ORBIT CONTROLS
// =====================================================
const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.minPolarAngle = THREE.MathUtils.degToRad(60);
controls.maxPolarAngle = THREE.MathUtils.degToRad(95);
controls.minDistance = 4;
controls.maxDistance = 20;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.target.set(0, 2, 0);
controls.update();


// =====================================================
// LIGHTING
// =====================================================
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.025 );
directionalLight.position.setScalar(10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.0625);
scene.add(ambientLight);


// =====================================================
// CANDLE HOLDER
// =====================================================
const casePath = new THREE.Path();
casePath.moveTo(0, 0);
casePath.lineTo(0, 0);
casePath.absarc(1.5, 0.5, 0.5, Math.PI * 1, Math.PI * 2);
casePath.lineTo(2, 1.5);
casePath.lineTo(1.99, 1.5);
casePath.lineTo(1.9, 0.5);

// Modern Three.js:
// LatheBufferGeometry -> LatheGeometry
const caseGeo = new THREE.LatheGeometry( casePath.getPoints(), 64 );
const caseMat = new THREE.MeshStandardMaterial({ color: "silver", metalness: 0.8, roughness: 0.25});
const caseMesh = new THREE.Mesh( caseGeo, caseMat );
caseMesh.castShadow = true;
caseMesh.receiveShadow = true;


// =====================================================
// PARAFFIN
// =====================================================
const paraffinPath = new THREE.Path();
paraffinPath.moveTo(0, -0.25);
paraffinPath.lineTo(0, -0.45);
paraffinPath.absarc( 1, 0, 0.25, Math.PI * 1.5, Math.PI * 2 );
paraffinPath.lineTo(1.25, 0);
paraffinPath.absarc( 1.89, 0.1, 0.1, Math.PI * 1.5, Math.PI * 2 );

const paraffinGeo = new THREE.LatheGeometry( paraffinPath.getPoints(), 64 );
paraffinGeo.translate( 0, 1.25, 0 );

const paraffinMat = new THREE.MeshStandardMaterial({
    color: 0xffff99,
    side: THREE.BackSide,
    metalness: 0,
    roughness: 0.75
});

const paraffinMesh = new THREE.Mesh( paraffinGeo, paraffinMat );
paraffinMesh.castShadow = true;
paraffinMesh.receiveShadow = true;
caseMesh.add(paraffinMesh);


// =====================================================
// CANDLE WICK
// =====================================================
const candlewickProfile = new THREE.Shape();
candlewickProfile.absarc( 0, 0, 0.0625, 0, Math.PI * 2 );
const candlewickCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 0, 0, 0),
        new THREE.Vector3( 0, 0.5, -0.0625),
        new THREE.Vector3( 0.25, 0.5, 0.0125)
]);

// Modern Three.js:
// ExtrudeBufferGeometry -> ExtrudeGeometry
const candlewickGeo = new THREE.ExtrudeGeometry(
    candlewickProfile,
    { steps: 8, bevelEnabled: false, extrudePath: candlewickCurve }
);
candlewickGeo.translate( 0, 0.8, 0 );
const candlewickMat = new THREE.MeshStandardMaterial({
    color: 0x332211,
    roughness: 0.9
});
const candlewickMesh = new THREE.Mesh( candlewickGeo, candlewickMat );
candlewickMesh.castShadow = true;
caseMesh.add(candlewickMesh);


// =====================================================
// CANDLE LIGHT
// =====================================================
const candleLight = new THREE.PointLight( 0xffaa33, 5, 11, 1.5 );
candleLight.position.set( 0, 3, 0 );
candleLight.castShadow = true;
caseMesh.add(candleLight);

const candleLight2 = new THREE.PointLight( 0xffaa33, 2, 10, 2 );
candleLight2.position.set( 0, 4, 0 );
candleLight2.castShadow = true;
caseMesh.add(candleLight2);


// =====================================================
// FLAME
// =====================================================
const flameMaterials = [];


// -----------------------------------------------------
// Flame Shader
// -----------------------------------------------------
function getFlameMaterial() {
    const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
                uniform float time;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    float wave =
                        sin(time * 7.0 + pos.y * 8.0)
                        * 0.04
                        * pos.y;
                    pos.x += wave;
                    pos.z +=
                        cos(time * 6.0 + pos.y * 7.0)
                        * 0.025
                        * pos.y;
                    float scale =
                        1.0
                        + sin(time * 8.0 + pos.y * 5.0)
                        * 0.04;
                    pos.xz *= scale;
                    gl_Position =
                        projectionMatrix *
                        modelViewMatrix *
                        vec4(pos, 1.0);
                } `,
            fragmentShader: `
                varying vec2 vUv;
                void main() {
                    float y = vUv.y;
                    vec3 inner = vec3(1.0, 1.0, 0.25);
                    vec3 middle = vec3(1.0, 0.35, 0.02);
                    vec3 outer = vec3(0.8, 0.03, 0.0);
                    vec3 color;
                    if (y < 0.35) {
                        color = mix( inner, middle, y / 0.35 );
                    } else {
                        color = mix( middle, outer, (y - 0.35) / 0.65 );
                    }
                    float alpha = smoothstep( 0.0, 0.15, y )
                        * (1.0 - smoothstep( 0.75, 1.0, y ));
                    gl_FragColor = vec4( color, alpha );

                } `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
    flameMaterials.push(material);
    return material;
}


// -----------------------------------------------------
// Create Flame
// -----------------------------------------------------
function flame() {
    const flameGeo = new THREE.SphereGeometry( 0.5, 32, 32 );

    // Make the flame taller
    flameGeo.scale( 0.65, 1.95, 0.65 );
    const flameMat = getFlameMaterial();
    const flameMesh = new THREE.Mesh( flameGeo, flameMat );
    flameMesh.position.set( 0.06, 1.6, 0.06 );
    flameMesh.rotation.y = THREE.MathUtils.degToRad(-45);
    caseMesh.add(flameMesh);
    return flameMesh;
}
const flameMesh = flame();


// =====================================================
// TABLE
// =====================================================
const tableGeo = new THREE.CylinderGeometry( 14, 14, 0.5, 64 );

tableGeo.translate( 0, -0.25, 0 );
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load(
    "https://threejs.org/examples/textures/hardwood2_diffuse.jpg"
);
const tableMat = new THREE.MeshStandardMaterial({ map: woodTexture, metalness: 0, roughness: 0.75 });
const tableMesh = new THREE.Mesh( tableGeo, tableMat );
tableMesh.receiveShadow = true;

// Put candle on table
tableMesh.add(caseMesh);
scene.add(tableMesh);


// =====================================================
// ANIMATION
// =====================================================
const clock = new THREE.Clock();
let time = 0;

function render() {
    requestAnimationFrame(render);
    const delta = clock.getDelta();
    time += delta;

    // Animate flame shader
    for (const material of flameMaterials) {
        material.uniforms.time.value = time;
    }

    // Move candle light
    candleLight2.position.x = Math.sin( time * Math.PI ) * 0.25;
    candleLight2.position.z = Math.cos( time * Math.PI * 0.75 ) * 0.25;

    // Flickering brightness
    candleLight2.intensity = 2 + Math.sin( time * Math.PI * 2) *
        Math.cos( time * Math.PI * 1.5 ) * 0.25;

    // Update camera controls
    controls.update();

    // Render
    renderer.render( scene, camera );
}

render();