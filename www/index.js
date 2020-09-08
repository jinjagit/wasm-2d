const rust = import('../pkg/wasm_3d');
const canvas = document.getElementById('rustCanvas');
const gl = canvas.getContext('webgl', {antialias: true});

rust.then(m => {
    if (!gl) {
        alert('Failed to initialize WebGl');
        return;
    }

    const FPS_THROTTLE = 1000.0 / 30.0; // ms / frames
    const rustClient = new m.RustClient();
    const initialTime = Date.now();
    let lastDrawTime = -1;// In milliseconds

    function render() {
        window.requestAnimationFrame(render);
        const currentTime = Date.now();

        if (currentTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currentTime;

            if (window.innerHeight !== canvas.height || window.innerWidth !== canvas.width) {
                canvas.height = window.innerHeight;
                canvas.clientHeight = window.innerHeight;
                canvas.style.height = window.innerHeight;

                canvas.width = window.innerWidth;
                canvas.clientWidth = window.innerWidth;
                canvas.style.width = window.innerWidth;

                gl.viewport(0, 0, window.innerWidth, window.innerHeight);
            }
            let elapsedTime = currentTime - initialTime;
            rustClient.update(elapsedTime, window.innerHeight, window.innerWidth);
            rustClient.render();
        }

    }

    render();
});
