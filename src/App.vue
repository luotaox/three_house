<template>
  <div class="house" ref="houseRef">

  </div>
</template>


<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
// 导入相机轨道控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import hdr from '../public/living/Living.hdr'
const houseRef = ref(null);

// 初始化场景
const scene = new THREE.Scene();

// 创建坐标系
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// 初始化相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.x = 0.1;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置画布尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 立方体
// // 初始化物体
// const geometry = new THREE.BoxGeometry(10, 10, 10);

// // 贴图地址
// const arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];

// let boxMaterials = [];
// arr.forEach((item) => {
//   let imgs = require(`../public/living/${item}.jpg`);
//   // 纹理加载
//   let texture = new THREE.TextureLoader().load(imgs);
//   // 创建材质
//   if (item === '4_u' || item === '4_d') {
//     texture.rotation = Math.PI;
//     // 设置旋转原点
//     texture.center = new THREE.Vector2(0.5, 0.5);
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   } else {
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   }
// });
// const cube = new THREE.Mesh(geometry, boxMaterials);
// cube.geometry.scale(1, 1, -1);
// scene.add(cube);

// 球体
const gemotry = new THREE.SphereGeometry(5, 32, 32);
const loader = new RGBELoader();
loader.load(hdr, (texture) => {
  const matetial = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(gemotry, matetial);
  sphere.geometry.scale(1, 1, -1);
  scene.add(sphere);
})


const render = () => {
  // 渲染
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}


onMounted(() => {
  // 初始化相机控件
  const controls = new OrbitControls(camera, houseRef.value);
  controls.enableDamping = true;
  controls.maxDistance = 0.1
  controls.minDistance = 0


  houseRef.value.appendChild(renderer.domElement);
  render();
})
// 屏幕适配
window.addEventListener('resize', function () {
  // camera
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
})

</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.house {
  width: 100vm;
  height: 100vh;
}
</style>
