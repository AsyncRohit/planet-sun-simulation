import * as THREE from 'three';
// import orbital controls for using mousemove gestures 
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// create scene and camers

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000);
camera.position.z=10;

// light creation 
const light =new THREE.AmbientLight(0xffffff,0.4);  
scene.add(light);
const pointlight= new THREE.PointLight(0xff0000,100,10);   
pointlight.position.set(6,0,3);
scene.add(pointlight)
 
const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry= new THREE.SphereGeometry(1,32,32);
const material= new THREE.MeshStandardMaterial({color:'red'});
const planet=new THREE.Mesh(geometry,material);
scene.add(planet);
// created a geometry for light so we can see  as of know we name that geometry as Torch

const lightgeometry= new THREE.SphereGeometry(0.3,32,32);
const lightmaterial= new THREE.MeshBasicMaterial({color: "white"});
const sun=new THREE.Mesh(lightgeometry,lightmaterial);
sun.position.set(1,0,-2)  //(x,y,z)

scene.add(sun);

const controls =new OrbitControls(camera, renderer.domElement);





var q=0;

function revolve(){

  controls.update()

  let qSin=Math.sin(q+=0.01);
  let qCos=Math.cos(q+=0.01);


  planet.position.x -=0.01*qSin;

  planet.rotation.x+=0.01;
  planet.rotation.y+=0.01;
  planet.rotation.z+=0.01;
  
  pointlight.position.set(5*qCos,0,5*qSin);
  sun.position.set(5*qCos,0,5*qSin);

  renderer.render(scene,camera);
  requestAnimationFrame(revolve)
}

revolve();
