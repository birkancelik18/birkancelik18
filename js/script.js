// ============================================
// PORTFOLIO SCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initDynamicContent();
    initScrollAnimations();
    initProjectFiltering();
    initProjectsSlider();
    // initContactForm() is now called from renderContact()
    initRouting();
    setCurrentYear();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// DYNAMIC CONTENT RENDERING
// ============================================
function initDynamicContent() {
    renderAbout();
    renderDimensions();
    renderProjects();
    renderExperience();
    renderContact();
}

function renderAbout() {
    const aboutContent = document.getElementById('aboutContent');
    if (!aboutContent || !aboutData) return;

    aboutContent.innerHTML = `
        <div class="about-image-container">
            <img src="${aboutData.profileImage}" alt="${aboutData.name}" class="about-image" onerror="this.style.display='none'">
        </div>
        <div class="about-text">
            <h2 class="about-title">${aboutData.title}</h2>
            <p class="about-bio">${aboutData.bio}</p>
        </div>
    `;
}

function renderDimensions() {
    const dimensionsGrid = document.getElementById('dimensionsGrid');
    if (!dimensionsGrid || !dimensionsData) return;

    // Create algebraic dimensions visualization
    dimensionsGrid.innerHTML = `
        <div class="dimensions-visualization-container">
            <div class="dimensions-visualization" id="dimensionsVisualization">
                <!-- SVG visualization will be inserted here -->
            </div>
            <div class="dimensions-legend" id="dimensionsLegend">
                <!-- Legend will be inserted here -->
            </div>
        </div>
    `;

    // Initialize the algebraic visualization
    initAlgebraicDimensionsVisualization();
}

function initAlgebraicDimensionsVisualization() {
    const container = document.getElementById('dimensionsVisualization');
    const legend = document.getElementById('dimensionsLegend');
    if (!container || !dimensionsData || !projectsData || typeof THREE === 'undefined') {
        // Fallback if Three.js is not loaded
        container.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 2rem;">Loading 3D visualization...</p>';
        return;
    }

    const dimensions = [dimensionsData.hci, dimensionsData.startup, dimensionsData.biomedical];
    const dimIds = ['hci', 'startup', 'biomedical'];
    
    // Calculate project positions in 3D space based on their dimension affiliations
    const projects = projectsData.map(project => {
        const coords = [0, 0, 0]; // [hci, startup, biomedical]
        const dimCount = project.dimensions.length;
        
        // Set coordinates based on which dimensions the project belongs to
        project.dimensions.forEach(dimId => {
            const index = dimIds.indexOf(dimId);
            if (index !== -1) {
                coords[index] = 1; // Full value for each dimension
            }
        });
        
        // Determine which plane the project lies on
        let plane = '3D'; // Default to 3D space
        const hasHCI = coords[0] > 0;
        const hasStartup = coords[1] > 0;
        const hasBiomedical = coords[2] > 0;
        
        if (dimCount === 1) {
            // Single dimension - lies on an axis
            if (hasHCI) plane = 'X-axis';
            else if (hasStartup) plane = 'Y-axis';
            else if (hasBiomedical) plane = 'Z-axis';
        } else if (dimCount === 2) {
            // Two dimensions - lies on a plane
            if (hasHCI && hasStartup) plane = 'XY-plane';
            else if (hasHCI && hasBiomedical) plane = 'XZ-plane';
            else if (hasStartup && hasBiomedical) plane = 'YZ-plane';
        } else if (dimCount === 3) {
            // All three dimensions - lies in 3D space
            plane = '3D-space';
        }
        
        // Calculate vector coordinates - use actual dimension values
        // This creates proper vector representation:
        // - Single dimension: vector along that axis (e.g., [1,0,0] for HCI)
        // - Two dimensions: vector in the plane (e.g., [1,1,0] for HCI+Startup)
        // - Three dimensions: vector in 3D space (e.g., [1,1,1])
        const scale = 2.5; // Scale factor for visualization
        const magnitude = Math.sqrt(coords[0]**2 + coords[1]**2 + coords[2]**2);
        
        return {
            ...project,
            coords: coords,
            plane: plane,
            // 3D coordinates: actual vector coordinates scaled
            // This preserves the mathematical meaning - vectors point in the direction
            // of their dimension composition
            x: coords[0] * scale,
            y: coords[1] * scale,
            z: coords[2] * scale,
            magnitude: magnitude
        };
    });

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0F0E0D);
    
    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 15;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFAFAF9, 0.4);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xFAFAF9, 0.6);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xFAFAF9, 0.3);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);
    
    // Helper function to convert hex color to Three.js Color
    function hexToColor(hex) {
        return new THREE.Color(hex);
    }
    
    // Create axes with clickable functionality
    const axisLength = 3.5;
    const axisRadius = 0.03;
    const axisObjects = [];
    
    // X-axis (HCI) - Blue
    const xAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 16);
    const xAxisMaterial = new THREE.MeshPhongMaterial({ 
        color: hexToColor(dimensions[0].color),
        emissive: hexToColor(dimensions[0].color),
        emissiveIntensity: 0.3
    });
    const xAxis = new THREE.Mesh(xAxisGeometry, xAxisMaterial);
    xAxis.rotation.z = -Math.PI / 2;
    xAxis.position.x = axisLength / 2;
    xAxis.userData = { dimension: 'hci', type: 'axis' };
    scene.add(xAxis);
    axisObjects.push(xAxis);
    
    // Y-axis (Side Projects) - Green
    const yAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 16);
    const yAxisMaterial = new THREE.MeshPhongMaterial({ 
        color: hexToColor(dimensions[1].color),
        emissive: hexToColor(dimensions[1].color),
        emissiveIntensity: 0.3
    });
    const yAxis = new THREE.Mesh(yAxisGeometry, yAxisMaterial);
    yAxis.position.y = axisLength / 2;
    yAxis.userData = { dimension: 'startup', type: 'axis' };
    scene.add(yAxis);
    axisObjects.push(yAxis);
    
    // Z-axis (Biomedical) - Red
    const zAxisGeometry = new THREE.CylinderGeometry(axisRadius, axisRadius, axisLength, 16);
    const zAxisMaterial = new THREE.MeshPhongMaterial({ 
        color: hexToColor(dimensions[2].color),
        emissive: hexToColor(dimensions[2].color),
        emissiveIntensity: 0.3
    });
    const zAxis = new THREE.Mesh(zAxisGeometry, zAxisMaterial);
    zAxis.rotation.x = Math.PI / 2;
    zAxis.position.z = axisLength / 2;
    zAxis.userData = { dimension: 'biomedical', type: 'axis' };
    scene.add(zAxis);
    axisObjects.push(zAxis);
    
    // Create HTML overlay for axis labels
    const axisLabelsContainer = document.createElement('div');
    axisLabelsContainer.className = 'axis-labels-container';
    axisLabelsContainer.style.position = 'absolute';
    axisLabelsContainer.style.top = '0';
    axisLabelsContainer.style.left = '0';
    axisLabelsContainer.style.width = '100%';
    axisLabelsContainer.style.height = '100%';
    axisLabelsContainer.style.pointerEvents = 'none';
    container.appendChild(axisLabelsContainer);
    
    // Add instruction text
    const instructionText = document.createElement('div');
    instructionText.className = 'dimensions-instruction';
    instructionText.textContent = 'Drag to rotate • Scroll to zoom • Click projects to view';
    instructionText.style.position = 'absolute';
    instructionText.style.bottom = '10px';
    instructionText.style.left = '50%';
    instructionText.style.transform = 'translateX(-50%)';
    instructionText.style.color = 'rgba(250, 250, 249, 0.5)';
    instructionText.style.fontSize = '12px';
    instructionText.style.pointerEvents = 'none';
    instructionText.style.zIndex = '10';
    container.appendChild(instructionText);
    
    function updateAxisLabels() {
        axisLabelsContainer.innerHTML = '';
        
        // Project 3D positions to screen coordinates
        const vector = new THREE.Vector3();
        
        // X-axis label (HCI) - make clickable
        vector.set(axisLength, 0, 0);
        vector.project(camera);
        const xLabel = document.createElement('div');
        xLabel.className = 'axis-label clickable-axis-label';
        xLabel.textContent = dimensions[0].title + ' →';
        xLabel.style.color = dimensions[0].color;
        xLabel.style.position = 'absolute';
        xLabel.style.left = `${(vector.x * 0.5 + 0.5) * width}px`;
        xLabel.style.top = `${(-vector.y * 0.5 + 0.5) * height}px`;
        xLabel.style.transform = 'translate(-50%, -50%)';
        xLabel.style.fontSize = '14px';
        xLabel.style.fontWeight = '600';
        xLabel.style.cursor = 'pointer';
        xLabel.style.pointerEvents = 'auto';
        xLabel.style.padding = '4px 8px';
        xLabel.style.borderRadius = '4px';
        xLabel.style.background = 'rgba(15, 14, 13, 0.7)';
        xLabel.style.transition = 'all 0.2s ease';
        xLabel.addEventListener('click', () => navigateToDimension('hci'));
        xLabel.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(15, 14, 13, 0.9)';
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        xLabel.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(15, 14, 13, 0.7)';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        axisLabelsContainer.appendChild(xLabel);
        
        // Y-axis label (Side Projects) - make clickable
        vector.set(0, axisLength, 0);
        vector.project(camera);
        const yLabel = document.createElement('div');
        yLabel.className = 'axis-label clickable-axis-label';
        yLabel.textContent = dimensions[1].title + ' →';
        yLabel.style.color = dimensions[1].color;
        yLabel.style.position = 'absolute';
        yLabel.style.left = `${(vector.x * 0.5 + 0.5) * width}px`;
        yLabel.style.top = `${(-vector.y * 0.5 + 0.5) * height}px`;
        yLabel.style.transform = 'translate(-50%, -50%)';
        yLabel.style.fontSize = '14px';
        yLabel.style.fontWeight = '600';
        yLabel.style.cursor = 'pointer';
        yLabel.style.pointerEvents = 'auto';
        yLabel.style.padding = '4px 8px';
        yLabel.style.borderRadius = '4px';
        yLabel.style.background = 'rgba(15, 14, 13, 0.7)';
        yLabel.style.transition = 'all 0.2s ease';
        yLabel.addEventListener('click', () => navigateToDimension('startup'));
        yLabel.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(15, 14, 13, 0.9)';
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        yLabel.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(15, 14, 13, 0.7)';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        axisLabelsContainer.appendChild(yLabel);
        
        // Z-axis label (Biomedical) - make clickable
        vector.set(0, 0, axisLength);
        vector.project(camera);
        const zLabel = document.createElement('div');
        zLabel.className = 'axis-label clickable-axis-label';
        zLabel.textContent = dimensions[2].title + ' →';
        zLabel.style.color = dimensions[2].color;
        zLabel.style.position = 'absolute';
        zLabel.style.left = `${(vector.x * 0.5 + 0.5) * width}px`;
        zLabel.style.top = `${(-vector.y * 0.5 + 0.5) * height}px`;
        zLabel.style.transform = 'translate(-50%, -50%)';
        zLabel.style.fontSize = '14px';
        zLabel.style.fontWeight = '600';
        zLabel.style.cursor = 'pointer';
        zLabel.style.pointerEvents = 'auto';
        zLabel.style.padding = '4px 8px';
        zLabel.style.borderRadius = '4px';
        zLabel.style.background = 'rgba(15, 14, 13, 0.7)';
        zLabel.style.transition = 'all 0.2s ease';
        zLabel.addEventListener('click', () => navigateToDimension('biomedical'));
        zLabel.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(15, 14, 13, 0.9)';
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        zLabel.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(15, 14, 13, 0.7)';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        axisLabelsContainer.appendChild(zLabel);
    }
    
    // Create coordinate planes (XY, XZ, YZ) to show where projects lie
    const planeSize = 3;
    const planeOpacity = 0.08;
    
    // XY Plane (HCI + Side Projects)
    const xyPlaneGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const xyPlaneMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x50C878, // Green tint for Side Projects
        side: THREE.DoubleSide,
        transparent: true,
        opacity: planeOpacity
    });
    const xyPlane = new THREE.Mesh(xyPlaneGeometry, xyPlaneMaterial);
    xyPlane.rotation.x = Math.PI / 2;
    xyPlane.position.z = 0;
    scene.add(xyPlane);
    
    // XZ Plane (HCI + Biomedical)
    const xzPlaneGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const xzPlaneMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xE74C3C, // Red tint for Biomedical
        side: THREE.DoubleSide,
        transparent: true,
        opacity: planeOpacity
    });
    const xzPlane = new THREE.Mesh(xzPlaneGeometry, xzPlaneMaterial);
    xzPlane.position.y = 0;
    scene.add(xzPlane);
    
    // YZ Plane (Side Projects + Biomedical)
    const yzPlaneGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const yzPlaneMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4A90E2, // Blue tint for HCI
        side: THREE.DoubleSide,
        transparent: true,
        opacity: planeOpacity
    });
    const yzPlane = new THREE.Mesh(yzPlaneGeometry, yzPlaneMaterial);
    yzPlane.rotation.y = Math.PI / 2;
    yzPlane.position.x = 0;
    scene.add(yzPlane);
    
    // Origin point
    const originGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const originMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFAFAF9,
        emissive: 0xFAFAF9,
        emissiveIntensity: 0.5
    });
    const origin = new THREE.Mesh(originGeometry, originMaterial);
    scene.add(origin);
    
    // Project vectors (arrows)
    const projectObjects = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    projects.forEach((project, index) => {
        // Determine color based on dimensions
        let vectorColor = 0xFAFAF9;
        if (project.dimensions.length === 1) {
            // Single dimension - use that dimension's color
            vectorColor = hexToColor(dimensionsData[project.dimensions[0]].color).getHex();
        } else if (project.dimensions.length === 2) {
            // Two dimensions - blend colors or use average
            const colors = project.dimensions.map(dimId => 
                hexToColor(dimensionsData[dimId].color)
            );
            // Average the colors
            vectorColor = new THREE.Color()
                .add(colors[0])
                .add(colors[1])
                .multiplyScalar(0.5)
                .getHex();
        } else {
            // Three dimensions - white or blend all three
            const colors = project.dimensions.map(dimId => 
                hexToColor(dimensionsData[dimId].color)
            );
            vectorColor = new THREE.Color()
                .add(colors[0])
                .add(colors[1])
                .add(colors[2])
                .multiplyScalar(1/3)
                .getHex();
        }
        
        // Create vector from origin to project position
        const direction = new THREE.Vector3(project.x, project.y, project.z);
        const length = direction.length();
        
        if (length > 0.01) { // Only create vector if it has meaningful length
            // Normalize direction for arrow
            const normalizedDirection = direction.clone().normalize();
            
            // Create arrow helper with proper length
            const arrowLength = length;
            const arrowHeadLength = Math.min(0.25, arrowLength * 0.12);
            const arrowHeadWidth = arrowHeadLength * 0.7;
            
            const arrowHelper = new THREE.ArrowHelper(
                normalizedDirection,
                new THREE.Vector3(0, 0, 0),
                arrowLength,
                vectorColor,
                arrowHeadLength,
                arrowHeadWidth
            );
            
            // Store project and plane information
            arrowHelper.userData.originalLength = arrowLength;
            arrowHelper.userData.project = project;
            arrowHelper.userData.type = 'vector';
            arrowHelper.userData.plane = project.plane;
            
            // Create a larger invisible sphere for easier clicking (positioned along the vector)
            const clickGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const clickMaterial = new THREE.MeshBasicMaterial({ 
                visible: false,
                transparent: true,
                opacity: 0
            });
            const clickSphere = new THREE.Mesh(clickGeometry, clickMaterial);
            // Position sphere at midpoint of vector for better interaction
            clickSphere.position.set(
                project.x * 0.5, 
                project.y * 0.5, 
                project.z * 0.5
            );
            clickSphere.userData = { 
                project: project, 
                type: 'vector', 
                arrowHelper: arrowHelper,
                plane: project.plane
            };
            
            scene.add(arrowHelper);
            scene.add(clickSphere);
            projectObjects.push(clickSphere); // Use click sphere for interaction
        }
    });
    
    // Add grid helpers for each plane to show coordinate system
    // XY plane grid (horizontal)
    const xyGrid = new THREE.GridHelper(6, 20, 0x50C878, 0x0F0E0D);
    xyGrid.rotation.x = Math.PI / 2;
    xyGrid.material.opacity = 0.15;
    xyGrid.material.transparent = true;
    scene.add(xyGrid);
    
    // XZ plane grid (vertical, facing camera initially)
    const xzGrid = new THREE.GridHelper(6, 20, 0xE74C3C, 0x0F0E0D);
    xzGrid.material.opacity = 0.15;
    xzGrid.material.transparent = true;
    scene.add(xzGrid);
    
    // YZ plane grid (vertical, side)
    const yzGrid = new THREE.GridHelper(6, 20, 0x4A90E2, 0x0F0E0D);
    yzGrid.rotation.y = Math.PI / 2;
    yzGrid.material.opacity = 0.15;
    yzGrid.material.transparent = true;
    scene.add(yzGrid);
    
    // Mouse interaction
    let hoveredObject = null;
    let hoveredAxis = null;
    
    function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        // Check for axis intersections first
        const axisIntersects = raycaster.intersectObjects(axisObjects);
        const projectIntersects = raycaster.intersectObjects(projectObjects);
        
        // Handle axis hover
        if (axisIntersects.length > 0) {
            const axis = axisIntersects[0].object;
            if (hoveredAxis !== axis) {
                if (hoveredAxis) {
                    hoveredAxis.material.emissiveIntensity = 0.3;
                }
                hoveredAxis = axis;
                axis.material.emissiveIntensity = 0.8;
                const dim = dimensionsData[axis.userData.dimension];
                showProjectTooltip3D(`View ${dim.title} projects →`, event.clientX, event.clientY);
                renderer.domElement.style.cursor = 'pointer';
            }
            if (hoveredObject) {
                hoveredObject = null;
            }
        } else if (projectIntersects.length > 0) {
            const object = projectIntersects[0].object;
            if (hoveredObject !== object) {
                if (hoveredObject && hoveredObject.userData.arrowHelper) {
                    // Reset previous arrow scale
                    const prevArrow = hoveredObject.userData.arrowHelper;
                    prevArrow.scale.set(1, 1, 1);
                }
                hoveredObject = object;
                if (object.userData.arrowHelper) {
                    // Scale up the arrow on hover
                    const arrow = object.userData.arrowHelper;
                    arrow.scale.set(1.3, 1.3, 1.3);
                }
                const project = object.userData.project;
                const plane = object.userData.plane || project.plane;
                // Format plane text nicely
                let planeText = plane;
                if (plane.includes('-')) {
                    planeText = plane.replace('-', ' ').toUpperCase();
                } else {
                    planeText = plane.charAt(0).toUpperCase() + plane.slice(1);
                }
                showProjectTooltip3D(`${project.title} | ${planeText}`, event.clientX, event.clientY);
                renderer.domElement.style.cursor = 'pointer';
            }
            if (hoveredAxis) {
                hoveredAxis.material.emissiveIntensity = 0.3;
                hoveredAxis = null;
            }
        } else {
            if (hoveredObject && hoveredObject.userData.arrowHelper) {
                // Reset arrow scale
                hoveredObject.userData.arrowHelper.scale.set(1, 1, 1);
                hoveredObject = null;
            }
            if (hoveredAxis) {
                hoveredAxis.material.emissiveIntensity = 0.3;
                hoveredAxis = null;
            }
            hideProjectTooltip();
            renderer.domElement.style.cursor = 'default';
        }
    }
    
    function onMouseClick(event) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        // Check axes first (higher priority)
        const axisIntersects = raycaster.intersectObjects(axisObjects);
        if (axisIntersects.length > 0) {
            const axis = axisIntersects[0].object;
            const dimensionId = axis.userData.dimension;
            navigateToDimension(dimensionId);
            return;
        }
        
        // Then check projects
        const projectIntersects = raycaster.intersectObjects(projectObjects);
        if (projectIntersects.length > 0) {
            const project = projectIntersects[0].object.userData.project;
            navigateToProject(project.id);
        }
    }
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        updateAxisLabels(); // Update labels position as camera moves
    }
    animate();
    
    // Handle resize
    function onWindowResize() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    }
    window.addEventListener('resize', onWindowResize);
    
    // Create legend
    legend.innerHTML = dimensions.map(dim => {
        const projectCount = projectsData.filter(p => p.dimensions.includes(dim.id)).length;
        return `
            <div class="dimension-legend-item" data-dimension="${dim.id}">
                <div class="legend-color" style="background-color: ${dim.color}"></div>
                <div class="legend-content">
                    <div class="legend-title">${dim.title}</div>
                    <div class="legend-subtitle">${dim.subtitle}</div>
                    <div class="legend-count">${projectCount} project${projectCount !== 1 ? 's' : ''}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to legend items
    document.querySelectorAll('.dimension-legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const dimension = this.dataset.dimension;
            navigateToDimension(dimension);
        });
        item.style.cursor = 'pointer';
    });
}

function showProjectTooltip3D(title, x, y) {
    hideProjectTooltip();
    const tooltip = document.createElement('div');
    tooltip.className = 'project-tooltip';
    tooltip.textContent = title;
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 10}px`;
    tooltip.style.background = 'rgba(15, 14, 13, 0.95)';
    tooltip.style.color = '#FAFAF9';
    tooltip.style.padding = '6px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = '500';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.border = '1px solid rgba(250, 250, 249, 0.2)';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(tooltip);
}

function showProjectTooltip(element, title, x, y) {
    // Remove existing tooltip
    const existing = document.querySelector('.project-tooltip');
    if (existing) existing.remove();

    const tooltip = document.createElement('div');
    tooltip.className = 'project-tooltip';
    tooltip.textContent = title;
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 10}px`;
    tooltip.style.background = 'rgba(15, 14, 13, 0.95)';
    tooltip.style.color = '#FAFAF9';
    tooltip.style.padding = '6px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = '500';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.border = '1px solid rgba(250, 250, 249, 0.2)';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(tooltip);
}

function hideProjectTooltip() {
    const tooltip = document.querySelector('.project-tooltip');
    if (tooltip) tooltip.remove();
}

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || !projectsData) return;

    // Clear existing content
    projectsGrid.innerHTML = '';

    projectsGrid.innerHTML = projectsData.map(project => {
        const dimensionsHTML = project.dimensions.map(dim => 
            `<span class="project-dimension" data-dimension="${dim}">${dimensionsData[dim]?.title || dim}</span>`
        ).join('');

        const linksHTML = project.links ? `
            <div class="project-links">
                ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-link">View PDF</a>` : ''}
            </div>
        ` : '';

        const techStackHTML = project.techStack.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Get key highlight from details if available
        const keyHighlight = project.details?.results?.[0] || project.details?.overview?.substring(0, 100) + '...' || '';
        const hasSubpages = project.details?.subpages && project.details.subpages.length > 0;
        
        return `
            <div class="project-card" data-dimensions="${project.dimensions.join(',')}" data-project-id="${project.id}">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
                    <div class="project-overlay">
                        ${linksHTML}
                    </div>
                    ${hasSubpages ? '<div class="project-subpages-badge">Details</div>' : ''}
                </div>
                <div class="project-content">
                    <div class="project-header-row">
                        <div class="project-dimensions">${dimensionsHTML}</div>
                        <div class="project-date-badge">${project.date}</div>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    ${keyHighlight ? `<div class="project-key-result">
                        <span class="result-text">${keyHighlight}</span>
                    </div>` : ''}
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techStackHTML}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to project cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't navigate if clicking on links
                if (e.target.closest('.project-link')) return;
                
                const projectId = parseInt(this.dataset.projectId);
                navigateToProject(projectId);
            });
        });
        
        // Reinitialize slider after projects are rendered
        if (typeof initProjectsSlider === 'function') {
            initProjectsSlider();
        }
    }, 100);
}

function renderExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline || !experienceData) return;

    timeline.innerHTML = experienceData.map(exp => `
        <div class="timeline-item ${exp.type}">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <h4 class="timeline-organization">${exp.organization}</h4>
                <p class="timeline-description">${exp.description}</p>
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const contactContent = document.getElementById('contactContent');
    if (!contactContent || !contactData) return;

    const socialLinksHTML = Object.entries(contactData.socialLinks)
        .filter(([key, value]) => value) // Only show if link exists
        .map(([platform, url]) => 
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${platform}">
                ${platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>`
        ).join('');

    const phoneHTML = contactData.phone ? `<p class="contact-phone"><strong>Phone:</strong> ${contactData.phone}</p>` : '';
    const locationHTML = contactData.location ? `<p class="contact-location"><strong>Location:</strong> ${contactData.location}</p>` : '';

    contactContent.innerHTML = `
        <div class="contact-info">
            <p class="contact-email">
                <strong>Email:</strong> 
                <a href="mailto:${contactData.email}">${contactData.email}</a>
            </p>
            ${phoneHTML}
            ${locationHTML}
            <div class="social-links">
                ${socialLinksHTML}
            </div>
        </div>
        <form class="contact-form" id="contactForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
        </form>
    `;
    
    // Initialize form after it's rendered
    initContactForm();
}

// ============================================
// PROJECT SLIDER STATE
// ============================================
let sliderState = {
    currentIndex: 0,
    visibleProjects: [],
    filteredProjects: []
};

// ============================================
// PROJECT FILTERING
// ============================================
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filter projects
            const visibleCards = [];
            projectCards.forEach((card, index) => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    visibleCards.push(index);
                } else {
                    const dimensions = card.dataset.dimensions.split(',');
                    if (dimensions.includes(filter)) {
                        card.style.display = 'flex';
                        visibleCards.push(index);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Update slider state
            sliderState.filteredProjects = visibleCards;
            sliderState.currentIndex = 0;
            
            // Update slider and dots
            if (typeof window.updateSlider === 'function') {
                window.updateSlider();
            }
            if (typeof window.updateSliderDots === 'function') {
                window.updateSliderDots();
            }
        });
    });
}

// ============================================
// PROJECTS SLIDER
// ============================================
function initProjectsSlider() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slider = document.querySelector('.projects-slider');
    const projectCards = document.querySelectorAll('.project-card');

    if (!slider || !prevBtn || !nextBtn) return;

    // Initialize visible projects (all projects initially)
    sliderState.filteredProjects = Array.from({ length: projectCards.length }, (_, i) => i);
    sliderState.visibleProjects = projectCards;

    // Calculate items per view based on screen size
    // Since cards are now horizontal (image left, content right), show 1 at a time
    function getItemsPerView() {
        return 1; // Always show one project card at a time
    }

    function updateSlider() {
        const itemsPerView = getItemsPerView();
        const visibleCount = sliderState.filteredProjects.length;
        const maxIndex = Math.max(0, visibleCount - itemsPerView);
        sliderState.currentIndex = Math.min(sliderState.currentIndex, maxIndex);

        if (visibleCount === 0) {
            slider.style.transform = 'translateX(0px)';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        // Get the first visible card width
        const firstVisibleIndex = sliderState.filteredProjects[0];
        const firstCard = projectCards[firstVisibleIndex];
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        const translateX = -(sliderState.currentIndex * (cardWidth + gap));

        slider.style.transform = `translateX(${translateX}px)`;

        // Update button states
        prevBtn.disabled = sliderState.currentIndex === 0;
        nextBtn.disabled = sliderState.currentIndex >= maxIndex || visibleCount <= itemsPerView;
    }

    function slideNext() {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, sliderState.filteredProjects.length - itemsPerView);
        if (sliderState.currentIndex < maxIndex) {
            sliderState.currentIndex++;
            updateSlider();
            updateSliderDots();
        }
    }

    function slidePrev() {
        if (sliderState.currentIndex > 0) {
            sliderState.currentIndex--;
            updateSlider();
            updateSliderDots();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection && isElementInViewport(projectsSection)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                slidePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                slideNext();
            }
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
            updateSliderDots();
        }, 250);
    });

    // Initialize slider
    updateSlider();
    updateSliderDots();

    // Make updateSlider and updateSliderDots available globally for filtering
    window.updateSlider = updateSlider;
    window.updateSliderDots = updateSliderDots;
}

function updateSliderDots() {
    const dotsContainer = document.getElementById('sliderDots');
    if (!dotsContainer) return;

    const itemsPerView = 1; // Always show one project at a time
    const visibleCount = sliderState.filteredProjects.length;
    const totalSlides = Math.ceil(visibleCount / itemsPerView);

    dotsContainer.innerHTML = '';

    // Only show dots if there are more items than can fit in one view
    if (totalSlides <= 1) {
        return;
    }

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === Math.floor(sliderState.currentIndex / itemsPerView) ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            sliderState.currentIndex = i * itemsPerView;
            if (typeof window.updateSlider === 'function') {
                window.updateSlider();
            }
            updateSliderDots();
        });
        dotsContainer.appendChild(dot);
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Check if already initialized to prevent duplicate listeners
    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In a real implementation, you would send this to a server
        // For now, we'll use mailto as a fallback
        const mailtoLink = `mailto:${contactData.email}?subject=Contact from Portfolio&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;
        window.location.href = mailtoLink;

        form.reset();
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// ROUTING SYSTEM
// ============================================
function initRouting() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateToHome();
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            if (e.state.type === 'dimension') {
                navigateToDimension(e.state.id, false);
            } else if (e.state.type === 'project') {
                navigateToProject(e.state.id, false);
            } else if (e.state.type === 'subpage') {
                navigateToSubpage(e.state.projectId, e.state.subpageId, false);
            }
        } else {
            navigateToHome(false);
        }
    });

    // Check initial hash
    handleInitialRoute();
}

function handleInitialRoute() {
    const hash = window.location.hash;
    if (hash) {
        const parts = hash.substring(1).split('/');
        if (parts[0] === 'dimension' && parts[1]) {
            navigateToDimension(parts[1], false);
        } else if (parts[0] === 'project' && parts[1]) {
            const projectId = parseInt(parts[1]);
            if (parts[2]) {
                navigateToSubpage(projectId, parts[2], false);
            } else {
                navigateToProject(projectId, false);
            }
        }
    }
}

function navigateToHome(updateHistory = true) {
    const pageContainer = document.getElementById('pageContainer');
    const mainSections = document.querySelectorAll('.section, .footer');
    
    if (pageContainer) {
        pageContainer.classList.add('hidden');
    }
    
    mainSections.forEach(section => {
        section.style.display = '';
    });
    
    if (updateHistory) {
        window.history.pushState({ type: 'home' }, '', '#');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToDimension(dimensionId, updateHistory = true) {
    const dimension = dimensionsData[dimensionId];
    if (!dimension) return;

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    // Get projects for this dimension
    const dimensionProjects = projectsData.filter(p => p.dimensions.includes(dimensionId));

    // Render dimension page - projects listed one after another
    const projectsHTML = dimensionProjects.map(project => {
        const hasDetails = project.details ? 'has-details' : 'no-details';
        return `
        <div class="dimension-project-card ${hasDetails}" data-project-id="${project.id}">
            <div class="dimension-project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="dimension-project-content">
                <div class="dimension-project-header">
                    <h3 class="dimension-project-title">${project.title}</h3>
                    ${project.details ? '<span class="project-details-badge">View Details →</span>' : ''}
                </div>
                <p class="dimension-project-description">${project.description}</p>
                <div class="dimension-project-footer">
                    <div class="dimension-project-tech">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="dimension-project-date">${project.date}</div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    pageContent.innerHTML = `
        <div class="dimension-page">
            <div class="dimension-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${dimension.title}</span>
            </div>
            <div class="dimension-page-header" style="border-left: 4px solid ${dimension.color}">
                <div class="dimension-page-title-section">
                    <h1 class="dimension-page-title">${dimension.title}</h1>
                    <h2 class="dimension-page-subtitle">${dimension.subtitle}</h2>
                </div>
            </div>
            <div class="dimension-projects-section-top">
                <h3 class="dimension-projects-title">Projects</h3>
                <div class="dimension-projects-list">
                    ${projectsHTML}
                </div>
            </div>
            <div class="dimension-page-content">
                <div class="dimension-overview">
                    <h3>Overview</h3>
                    <p>${dimension.pageContent.overview}</p>
                </div>
                <div class="dimension-research-areas">
                    <h3>Research Areas</h3>
                    <div class="research-areas-grid">
                        ${dimension.pageContent.researchAreas.map(area => `<span class="research-area-tag">${area}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add click handlers to project cards
    setTimeout(() => {
        document.querySelectorAll('.dimension-project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = parseInt(this.dataset.projectId);
                const project = projectsData.find(p => p.id === projectId);
                if (project && project.details) {
                    navigateToProject(projectId);
                }
            });
        });
        
        // Add breadcrumb home link
        const breadcrumbLink = document.querySelector('.dimension-breadcrumb .breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToHome();
            });
        }
    }, 50);

    if (updateHistory) {
        window.history.pushState({ type: 'dimension', id: dimensionId }, '', `#dimension/${dimensionId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToProject(projectId, updateHistory = true) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.details) {
        // If no details, navigate to dimension instead
        if (project && project.dimensions.length > 0) {
            navigateToDimension(project.dimensions[0]);
        }
        return;
    }

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const dimension = dimensionsData[project.dimensions[0]];
    const dimensionColor = dimension ? dimension.color : '#6366F1';

    const subpagesHTML = project.details.subpages && project.details.subpages.length > 0 ? `
        <div class="project-subpages">
            <h3>Learn More</h3>
            <div class="subpages-grid">
                ${project.details.subpages.map(subpage => `
                    <div class="subpage-card" data-subpage-id="${subpage.id}">
                        <h4>${subpage.title}</h4>
                        <p>${subpage.content.substring(0, 150)}...</p>
                        <span class="subpage-link">Read more →</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    const linksHTML = project.links ? `
        <div class="project-detail-links">
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-detail-link">Live Demo</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-detail-link">GitHub</a>` : ''}
            ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-detail-link">View PDF</a>` : ''}
        </div>
    ` : '';

    // Create quick summary box
    const quickSummary = `
        <div class="project-quick-summary" style="border-left: 4px solid ${dimensionColor}">
            <div class="summary-item">
                <span class="summary-label">Problem</span>
                <span class="summary-text">${project.details.problem.substring(0, 120)}${project.details.problem.length > 120 ? '...' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Solution</span>
                <span class="summary-text">${project.details.solution.substring(0, 120)}${project.details.solution.length > 120 ? '...' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Key Results</span>
                <div class="summary-results">
                    ${project.details.results.slice(0, 3).map(r => `<span class="summary-result-badge">${r.substring(0, 60)}${r.length > 60 ? '...' : ''}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    const primaryDimension = dimensionsData[project.dimensions[0]];
    
    pageContent.innerHTML = `
        <div class="project-detail-page">
            <div class="project-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${project.title}</span>
            </div>
            <div class="project-detail-header" style="border-left: 4px solid ${dimensionColor}">
                <div class="project-detail-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="project-detail-title-section">
                    <div class="project-detail-dimensions">
                        ${project.dimensions.map(dim => `<span class="project-dimension-tag" style="background-color: ${dimensionsData[dim]?.color}20; color: ${dimensionsData[dim]?.color}">${dimensionsData[dim]?.title || dim}</span>`).join('')}
                    </div>
                    <h1 class="project-detail-title">${project.title}</h1>
                    <div class="project-detail-meta">
                        <span class="project-detail-date">${project.date}</span>
                        <div class="project-detail-tech">
                            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    ${linksHTML}
                </div>
            </div>
            ${quickSummary}
            <div class="project-detail-content">
                <div class="project-detail-section">
                    <h3>Overview</h3>
                    <p>${project.details.overview}</p>
                    ${project.details.teamPhoto ? `
                        <div style="margin-top: var(--spacing-md); text-align: center;">
                            <img src="${project.details.teamPhoto}" alt="${project.title} Team" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(250, 250, 249, 0.2);" onerror="this.style.display='none'">
                            <p style="margin-top: var(--spacing-xs); color: rgba(255, 255, 255, 0.7); font-size: var(--font-size-sm);">The ${project.title} team</p>
                        </div>
                    ` : ''}
                </div>
                <div class="project-detail-section">
                    <h3>The Problem</h3>
                    <p>${project.details.problem}</p>
                </div>
                <div class="project-detail-section">
                    <h3>The Solution</h3>
                    <p>${project.details.solution}</p>
                </div>
                <div class="project-detail-section">
                    <h3>Methodology</h3>
                    <ul class="methodology-list">
                        ${project.details.methodology.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-detail-section">
                    <h3>Results</h3>
                    <ul class="results-list">
                        ${project.details.results.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ${subpagesHTML}
            </div>
        </div>
    `;

    // Add click handlers to subpage cards
    if (project.details.subpages && project.details.subpages.length > 0) {
        setTimeout(() => {
            document.querySelectorAll('.subpage-card').forEach(card => {
                card.addEventListener('click', function() {
                    const subpageId = this.dataset.subpageId;
                    navigateToSubpage(projectId, subpageId);
                });
            });
        }, 50);
    }
    
    // Add breadcrumb navigation
    setTimeout(() => {
        const breadcrumbLinks = document.querySelectorAll('.project-breadcrumb .breadcrumb-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.dataset.action;
                const dimensionId = this.dataset.dimension;
                
                if (action === 'home') {
                    navigateToHome();
                } else if (dimensionId) {
                    navigateToDimension(dimensionId);
                }
            });
        });
    }, 50);

    if (updateHistory) {
        window.history.pushState({ type: 'project', id: projectId }, '', `#project/${projectId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToSubpage(projectId, subpageId, updateHistory = true) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.details) return;

    const subpage = project.details.subpages?.find(sp => sp.id === subpageId);
    if (!subpage) return;

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const dimension = dimensionsData[project.dimensions[0]];
    const dimensionColor = dimension ? dimension.color : '#6366F1';
    const primaryDimension = dimension;
    
    pageContent.innerHTML = `
        <div class="subpage-detail-page">
            <div class="subpage-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-project-id="${projectId}">${project.title}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${subpage.title}</span>
            </div>
            <div class="subpage-header" style="border-left: 4px solid ${dimensionColor}">
                <h1 class="subpage-title">${subpage.title}</h1>
                <div class="subpage-project-info">
                    <span class="subpage-project-name">From: ${project.title}</span>
                </div>
            </div>
            <div class="subpage-content">
                <div class="subpage-text">
                    ${subpage.content.split('\n').map(p => `<p>${p}</p>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Add click handlers to breadcrumb
    setTimeout(() => {
        const breadcrumbLinks = document.querySelectorAll('.subpage-breadcrumb .breadcrumb-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.dataset.action;
                const dimensionId = this.dataset.dimension;
                const projectIdAttr = this.dataset.projectId;
                
                if (action === 'home') {
                    navigateToHome();
                } else if (dimensionId) {
                    navigateToDimension(dimensionId);
                } else if (projectIdAttr) {
                    navigateToProject(parseInt(projectIdAttr));
                }
            });
        });
    }, 50);

    if (updateHistory) {
        window.history.pushState({ type: 'subpage', projectId: projectId, subpageId: subpageId }, '', `#project/${projectId}/${subpageId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

