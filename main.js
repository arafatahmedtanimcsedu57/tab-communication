/**
 * ============================================
 * STEP 1: Basic Three.js Setup (Class-Based)
 * ============================================
 *
 * In this step, we set up the fundamental Three.js components:
 * - Scene: The container that holds all 3D objects, lights, and cameras
 * - Camera: Defines what we see (our viewpoint into the 3D world)
 * - Renderer: Draws/renders the scene to the screen using WebGL
 *
 * ============================================
 * STEP 2: Adding 3D Objects & Animation Loop
 * ============================================
 *
 * In this step, we:
 * - Create a 3D cube with geometry and material
 * - Set up a continuous animation loop using requestAnimationFrame
 * - Rotate the cube to see it in action
 */

class App {
    constructor() {
        this.camera = null;   // Our viewpoint into the 3D world
        this.scene = null;    // Container for all 3D objects
        this.renderer = null; // Draws everything to the screen
        this.cube = null;     // Our 3D cube object

        this.init();
    }

    /**
     * Initialize the Three.js scene
     * This is the entry point of our application
     */
    init() {
        this.setupScene();
        this.createObjects();
        this.animate();
    }

    /**
     * Set up the Three.js scene, camera, and renderer
     */
    setupScene() {
        // --------------------------------------------
        // 1. CREATE THE CAMERA
        // --------------------------------------------
        // We use an OrthographicCamera which shows objects without perspective
        // (objects don't get smaller as they move away)
        //
        // Parameters: (left, right, top, bottom, near, far)
        // - left, right: horizontal bounds of what the camera sees
        // - top, bottom: vertical bounds of what the camera sees
        // - near, far: depth range (objects outside this range aren't rendered)
        //
        // We set it to match our window size so 1 unit = 1 pixel
        this.camera = new THREE.OrthographicCamera(
            0,                  // left edge at x=0
            window.innerWidth,  // right edge at window width
            0,                  // top edge at y=0
            window.innerHeight, // bottom edge at window height
            -10000,             // near clipping plane (can see objects behind camera)
            10000               // far clipping plane (can see far away objects)
        );

        // Position the camera slightly in front of the scene
        this.camera.position.z = 2.5;

        // --------------------------------------------
        // 2. CREATE THE SCENE
        // --------------------------------------------
        // The scene is like a container - we add all our 3D objects to it
        this.scene = new THREE.Scene();

        // Set the background color to black
        // THREE.Color(0.0) = black, THREE.Color(1.0) = white
        this.scene.background = new THREE.Color(0.0);

        // Add the camera to the scene
        this.scene.add(this.camera);

        // --------------------------------------------
        // 3. CREATE THE RENDERER
        // --------------------------------------------
        // The renderer uses WebGL to draw our 3D scene
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,   // Smooth edges (reduces jagged lines)
            depthBuffer: true  // Enable depth testing (closer objects hide farther ones)
        });

        // Set pixel ratio for sharp rendering on high-DPI screens (like Retina)
        const pixelRatio = window.devicePixelRatio || 1;
        this.renderer.setPixelRatio(pixelRatio);

        // Set the renderer size to fill the window
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Give the canvas an ID so we can style it with CSS
        this.renderer.domElement.setAttribute("id", "scene");

        // Add the renderer's canvas element to the page
        document.body.appendChild(this.renderer.domElement);

        console.log("Step 1 Complete: Basic Three.js setup done!");
    }

    /**
     * Create 3D objects and add them to the scene
     */
    createObjects() {
        // --------------------------------------------
        // CREATE A CUBE
        // --------------------------------------------
        // A 3D object in Three.js is called a "Mesh"
        // It consists of two parts:
        // 1. Geometry: The shape (vertices, faces)
        // 2. Material: The appearance (color, texture, how light affects it)

        // Create the geometry - a box with width, height, depth of 100 units
        const geometry = new THREE.BoxGeometry(100, 100, 100);

        // Create the material - a basic material with a color
        // MeshBasicMaterial doesn't need lights to be visible
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,    // Green color
            wireframe: true     // Show as wireframe so we can see it rotate
        });

        // Combine geometry and material into a mesh
        this.cube = new THREE.Mesh(geometry, material);

        // Position the cube in the center of the screen
        this.cube.position.set(
            window.innerWidth / 2,
            window.innerHeight / 2,
            0
        );

        // Add the cube to the scene
        this.scene.add(this.cube);

        console.log("Step 2: Cube created and added to scene!");
    }

    /**
     * Animation loop - runs continuously at ~60fps
     */
    animate() {
        // --------------------------------------------
        // THE ANIMATION LOOP
        // --------------------------------------------
        // requestAnimationFrame tells the browser to call our function
        // before the next repaint (typically 60 times per second)
        // We use an arrow function to preserve 'this' context
        requestAnimationFrame(() => this.animate());

        // Rotate the cube a little bit each frame
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        // Render the scene with the camera
        this.renderer.render(this.scene, this.camera);
    }
}

// Wait for the page to fully load before running our code
window.onload = () => {
    new App();
};
