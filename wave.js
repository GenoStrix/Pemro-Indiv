(function () {
  const canvas = document.getElementById("wave-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // 2 ribbons only, centered, gold palette
  const ribbons = [
    {
      yBase: 0.48,
      amp: 60,
      freq: 0.008,
      speed: 0.18,
      phase: 0,
      lines: 7,
      spread: 28,
      alpha: 0.45,
    },
    {
      yBase: 0.52,
      amp: 45,
      freq: 0.01,
      speed: 0.12,
      phase: 1.8,
      lines: 5,
      spread: 18,
      alpha: 0.3,
    },
  ];

  let t = 0;

  function drawRibbon(r) {
    const W = canvas.width;
    const H = canvas.height;

    for (let li = 0; li < r.lines; li++) {
      const frac = r.lines === 1 ? 0.5 : li / (r.lines - 1);
      const yOffset = (frac - 0.5) * r.spread;
      const edgeFade = Math.sin(frac * Math.PI);
      const lineAlpha = r.alpha * edgeFade;

      ctx.strokeStyle = `rgba(234,155,37,${lineAlpha})`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      let first = true;
      for (let x = 0; x <= W; x += 4) {
        const nx = x / W;
        const y =
          H * r.yBase +
          yOffset +
          Math.sin(nx * Math.PI * 4 + t * r.speed + r.phase) * r.amp +
          Math.sin(nx * Math.PI * 6.5 + t * r.speed * 0.6 + r.phase + 1) *
            r.amp *
            0.3;

        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Deep dark bg
    ctx.fillStyle = "#06060a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Very soft center glow behind waves
    const grd = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.5,
      0,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.height * 0.4,
    );
    grd.addColorStop(0, "rgba(70,44,5,0.20)");
    grd.addColorStop(0.6, "rgba(30,18,2,0.08)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ribbons.forEach(drawRibbon);

    t += 0.016;
    requestAnimationFrame(draw);
  }

  draw();
})();
