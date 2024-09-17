window.onload = function () {
    const canvas = document.getElementById('container');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let paths = [];
    let currentPath = [];

    document.getElementById('text-weight').addEventListener('change', function () {
        const selectedValue = this.value;
        let lineWidth;

        switch (selectedValue) {
            case 'lighter':
                lineWidth = 1;
                break;
            case 'thin':
                lineWidth = 5;
                break;
            case 'medium-a':
                lineWidth = 7;
                break;
            case 'medium-n':
                lineWidth = 10;
                break;
            case 'bold':
                lineWidth = 15;
                break;
            case 'bolder':
                lineWidth = 20;
                break;
            default:
                lineWidth = 3;
        }
        ctx.lineWidth = lineWidth;
        redrawCanvas();
    });

    function resetSettings() {
        document.getElementById('text-color').value = '#000000';
        document.getElementById('bg-color').value = '';
        document.getElementById('text-weight').value = 'thin';
        document.getElementById('angle').value = 0;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        canvas.style.backgroundColor = '';
    }

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        ctx.strokeStyle = document.getElementById('text-color').value || '#000000';
        ctx.lineCap = 'round';
        redrawCanvas();
    }

    resetSettings();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getPointFromEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        return { x, y };
    }

    function startDrawing(e) {
        e.preventDefault();
        drawing = true;
        currentPath = [];
        const point = getPointFromEvent(e);
        currentPath.push(point);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
    }

    function draw(e) {
        e.preventDefault();
        if (!drawing) return;
        const point = getPointFromEvent(e);
        currentPath.push(point);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    }

    function stopDrawing() {
        if (drawing) {
            drawing = false;
            paths.push(currentPath);
            ctx.closePath();
        }
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    document.getElementById('text-color').addEventListener('change', function () {
        ctx.strokeStyle = this.value;
        redrawCanvas();
    });

    document.getElementById('bg-color').addEventListener('change', function () {
        canvas.style.backgroundColor = this.value;
    });

    document.getElementById('text-weight').addEventListener('change', function () {
        ctx.lineWidth = parseInt(this.value, 10);
        redrawCanvas();
    });

    document.querySelector('.button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.backgroundColor = '';
        paths = [];
    });

    const loader = document.getElementById('loaderr');
    const mainContent = document.getElementById('main');

    mainContent.style.display = 'none';
    loader.style.display = 'block';

    let countdown = 4;
    const countdownElement = document.querySelector('#loaderr p');

    const interval = setInterval(() => {
        countdownElement.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            loader.style.display = 'none';
            mainContent.style.display = 'block';
            resizeCanvas();
        }
    }, 700);

    gsap.fromTo("#loaderr h1", { x: -220, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
    gsap.fromTo("#loaderr p", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.5 });

    document.querySelector("#tcc").addEventListener("click", function () {
        window.open("https://atishaytuli07.github.io/textcaseconvertor/", "_blank");
    });

    document.querySelector("#link").addEventListener("click", function () {
        window.open("https://www.linkedin.com/in/atishaytuli07", "_blank");
    });

    document.querySelector('#save-button').addEventListener('click', function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

    function rotateSignature(angle) {
        document.getElementById('angle').value = angle;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        redrawCanvas();
        ctx.restore();
    }

    function redrawCanvas() {
        const angle = parseInt(document.getElementById('angle').value);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        paths.forEach(path => {
            ctx.beginPath();
            path.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();
        });

        ctx.restore();
    }

    document.getElementById('angle').addEventListener('input', function() {
        rotateSignature(this.value);
    });
};