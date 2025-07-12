// assets/js/about-animation.js

document.addEventListener('DOMContentLoaded', function () {
    // Pastikan Three.js sudah dimuat
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded.');
        return;
    }

    const container = document.getElementById('threejs-container');
    if (!container) return;

    // 1. Setup Scene, Camera, dan Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 2. Buat Objek 3D (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0xa855f7, // Warna ungu utama
        emissive: 0x7c3aed, // Warna gradien awal untuk glow
        roughness: 0.4,
        metalness: 0.6,
        wireframe: true,
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // 3. Tambahkan Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 4;

    // 4. Interaksi Mouse
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => { isMouseDown = true; });
    container.addEventListener('mouseup', (e) => { isMouseDown = false; });
    container.addEventListener('mouseleave', (e) => { isMouseDown = false; });

    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        icosahedron.rotation.y += deltaMove.x * 0.005;
        icosahedron.rotation.x += deltaMove.y * 0.005;

        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });

    // 5. Loop Animasi
    function animate() {
        requestAnimationFrame(animate);

        // Rotasi otomatis jika tidak di-drag
        if (!isMouseDown) {
            icosahedron.rotation.x += 0.001;
            icosahedron.rotation.y += 0.001;
        }

        renderer.render(scene, camera);
    }
    animate();

    // 6. Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

