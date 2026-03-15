const cvs = document.getElementById('confetti');
const ctx = cvs.getContext('2d');
let particles = [];

function resizeCvs() {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
}
resizeCvs();
window.addEventListener('resize', resizeCvs);

function spawnConfetti(x, y, count = 18, colors) {
  const cols = colors || ['#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9f43', '#fff'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      color: cols[~~(Math.random() * cols.length)],
      size: Math.random() * 6 + 3,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 15,
      alpha: 1,
      type: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }
}

function tickConfetti() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  particles = particles.filter(p => p.alpha > 0.02);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.15; p.alpha -= 0.022;
    p.rot += p.rotV;
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    if (p.type === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  requestAnimationFrame(tickConfetti);
}
tickConfetti();
