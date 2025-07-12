// assets/js/about-animation.js (Final Fix with Delay)

window.addEventListener('load', function () {
    
    // PERBAIKAN: Beri jeda 100ms agar browser selesai render layout
    setTimeout(function() {
        
        if (typeof THREE === 'undefined') {
            console.error("FATAL ERROR: Three.js library is not loaded.");
            return;
        }

        const container = document.getElementById('threejs-container');
        if (!container) {
            console.error("ERROR: Container with id 'threejs-container' not found.");
            return;
        }
        
        container.innerHTML = '';

        // 1. Setup Scene, Camera, dan Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // 2. Buat Objek 3D
        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            emissive: 0x7c3aed,
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

        // 4. Interaksi Mouse & Touch
        let isMouseDown = false;
        let previousMousePosition = { x: 0, y: 0 };
        const onPointerDown = (e) => { 
            isMouseDown = true; 
            const event = e.touches ? e.touches[0] : e;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };
        const onPointerUp = () => { isMouseDown = false; };
        const onPointerMove = (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const event = e.touches ? e.touches[0] : e;
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };
            icosahedron.rotation.y += deltaMove.x * 0.005;
            icosahedron.rotation.x += deltaMove.y * 0.005;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };
        
        container.addEventListener('mousedown', onPointerDown);
        container.addEventListener('mouseup', onPointerUp);
        container.addEventListener('mouseleave', onPointerUp);
        container.addEventListener('mousemove', onPointerMove);
        container.addEventListener('touchstart', onPointerDown, { passive: false });
        container.addEventListener('touchend', onPointerUp);
        container.addEventListener('touchmove', onPointerMove, { passive: false });

        // 5. Loop Animasi
        function animate() {
            requestAnimationFrame(animate);
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

    }, 100); // Jeda 100 milidetik

});

