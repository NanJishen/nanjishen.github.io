(function () {
  const $ = (sel) => document.querySelector(sel);
  const inputIds = ['text', 'color', 'alpha', 'angle', 'space', 'size'];
  const inputs = inputIds.reduce((acc, id) => ({ ...acc, [id]: $('#' + id) }), {});
  const imageInput = $('#image');
  const graph = $('#graph');
  const refreshButton = $('#refresh');
  const autoRefreshCheckbox = $('#auto-refresh');

  let canvas, ctx, image;

  // Convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) arrayBuffer[i] = byteString.charCodeAt(i);
    return new Blob([arrayBuffer], { type: 'image/png' });
  };

  // Generate a filename based on the current date and time
  const generateFileName = () => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
  };

  // Load image and initialize canvas
  const loadImage = (file) => {
    if (!file || !['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
      alert('仅支持 png, jpg, gif 图片格式');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      image = new Image();
      image.onload = () => {
        canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        drawWatermark();
        graph.innerHTML = '';
        graph.appendChild(canvas);

        // Download on canvas click
        canvas.addEventListener('click', () => {
          const link = document.createElement('a');
          link.download = generateFileName();
          link.href = URL.createObjectURL(dataURItoBlob(canvas.toDataURL('image/png')));
          link.click();
        });
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Draw watermark text
  const drawWatermark = () => {
    if (!canvas || !inputs.text.value) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    const text = inputs.text.value;
    const color = inputs.color.value;
    const alpha = parseFloat(inputs.alpha.value);
    const angle = parseFloat(inputs.angle.value);
    const space = parseFloat(inputs.space.value);
    const size = parseFloat(inputs.size.value) * 20;

    ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;
    ctx.font = `${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);

    const textWidth = ctx.measureText(text).width;
    const step = textWidth + space * 20;

    for (let x = -canvas.width; x < canvas.width * 2; x += step) {
      for (let y = -canvas.height; y < canvas.height * 2; y += step) {
        ctx.fillText(text, x, y);
      }
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation
  };

  // Event listeners
  imageInput.addEventListener('change', (e) => loadImage(e.target.files[0]));
  inputIds.forEach((id) => inputs[id].addEventListener('input', () => autoRefreshCheckbox.checked && drawWatermark()));
  autoRefreshCheckbox.addEventListener('change', () => (refreshButton.disabled = autoRefreshCheckbox.checked));
  refreshButton.addEventListener('click', drawWatermark);
})();