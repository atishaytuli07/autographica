window.onload = function () {
    const canvas = document.getElementById('container');
    const ctx = canvas.getContext('2d');
    let drawing = false;

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
    }

    resetSettings();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function startDrawing(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e) {
        if (!drawing) return;
        ctx.save();

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        ctx.restore();
    }

    function stopDrawing() {
        drawing = false;
        ctx.closePath();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    document.getElementById('text-color').addEventListener('change', function () {
        ctx.strokeStyle = this.value;
    });

    document.getElementById('bg-color').addEventListener('change', function () {
        canvas.style.backgroundColor = this.value;
    });

    document.getElementById('text-weight').addEventListener('change', function () {
        ctx.lineWidth = parseInt(this.value, 10);
    });

    document.querySelector('.button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.backgroundColor = '';
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
};


document.querySelector("#tcc").addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/atishaytuli07", "_blank");
});

document.querySelector("#link").addEventListener("click", function () {
    window.open("https://atishaytuli07.github.io/textcaseconvertor/", "_blank");
});

document.querySelector('#button-save').addEventListener('click', function () {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
});