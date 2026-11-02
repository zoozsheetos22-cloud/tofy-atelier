
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. تحديد مكان عرض المعرض
const container = document.getElementById('gallery-container');

// 2. إنشاء المشهد ثلاثي الأبعاد
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x171513);

// 3. إنشاء الكاميرا
const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 9);

// 4. إنشاء محرك العرض
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);

// 5. إضافة الإضاءة
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 3);
mainLight.position.set(0, 8, 5);
mainLight.castShadow = true;
scene.add(mainLight);

// 6. إنشاء الأرضية
const floorGeometry = new THREE.PlaneGeometry(20, 20);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x33302c,
    roughness: 0.8
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;

scene.add(floor);

// 7. إنشاء الحوائط
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xe8e3da,
    roughness: 0.9
});

// الحائط الخلفي
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(20, 8, 0.3),
    wallMaterial
);

backWall.position.set(0, 4, -5);
scene.add(backWall);

// الحائط الأيسر
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 8, 20),
    wallMaterial
);

leftWall.position.set(-10, 4, 0);
scene.add(leftWall);

// الحائط الأيمن
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 8, 20),
    wallMaterial
);

rightWall.position.set(10, 4, 0);
scene.add(rightWall);

// 8. إنشاء صور اللوحات
const textureLoader = new THREE.TextureLoader();

const projects = [
    {
        image: 'images/project1.jpg',
        x: -4,
        y: 3,
        z: -4.7
    },
    {
        image: 'images/project2.jpg',
        x: 0,
        y: 3,
        z: -4.7
    },
    {
        image: 'images/project3.jpg',
        x: 4,
        y: 3,
        z: -4.7
    }
];

projects.forEach((project) => {

    const texture = textureLoader.load(
        project.image,
        undefined,
        undefined,
        () => console.log('Image not found:', project.image)
    );

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 2.8, 0.15),
        new THREE.MeshStandardMaterial({
            color: 0x171717
        })
    );

    frame.position.set(
        project.x,
        project.y,
        project.z
    );

    scene.add(frame);

    const artwork = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.6),
        new THREE.MeshBasicMaterial({
            map: texture
        })
    );

    artwork.position.set(
        project.x,
        project.y,
        project.z + 0.081
    );

    scene.add(artwork);
});

// 9. التحكم في الكاميرا بالماوس
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 3;
controls.maxDistance = 15;

controls.maxPolarAngle = Math.PI / 2;

// 10. زر الدخول للمعرض
document.getElementById('exploreBtn').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('enterBtn').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({
        behavior: 'smooth'
    });
});

// 11. تشغيل المشهد
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();

// 12. ضبط الحجم عند تغيير حجم الشاشة
window.addEventListener('resize', () => {

    camera.aspect =
        container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );
});
