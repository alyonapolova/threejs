import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180; //earth axial tilt
scene.add(earthGroup)

new OrbitControls(camera, renderer.domElement)

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);

const material = new THREE.MeshStandardMaterial({
   map: loader.load('./images/earthmap1k.jpg')
});
const earthMash = new THREE.Mesh(geometry, material);
earthGroup.add(earthMash); 

const lightMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('./images/earthlights1k.jpg'),
  blending:THREE.AdditiveBlending,
 });
 const lightMesh = new THREE.Mesh(geometry, lightMaterial);
 earthGroup.add(lightMesh);

 const cloudMaterial = new THREE.MeshStandardMaterial({
   map: loader.load('./images/earthcloudmaptrans.jpg'),
   transparent: true,
  opacity: 0.8,
   blending:THREE.AdditiveBlending,
});
const cloudMash = new THREE.Mesh(geometry, cloudMaterial);
cloudMash.scale.setScalar(1.003);
earthGroup.add(cloudMash);

// const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight);

function animate() {

    earthMash.rotation.y += 0.001;
    lightMesh.rotation.y += 0.001;
    cloudMash.rotation.y += 0.001;

    	renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );