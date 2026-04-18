export const growthCardStyle = { "--mx": "50%", "--my": "0%" };

export function handleGrowthCardMouseEnter(e) {
  const card = e.currentTarget;
  card._rect = card.getBoundingClientRect();
}

export function handleGrowthCardMouseMove(e) {
  if (!window.matchMedia("(hover: hover)").matches) return;

  const card = e.currentTarget;
  // Use cached rect if available, otherwise fallback (safer)
  const rect = card._rect || card.getBoundingClientRect();
  
  const px = ((e.clientX - rect.left) / rect.width) * 100;
  const py = ((e.clientY - rect.top) / rect.height) * 100;
  const ry = ((px - 50) / 50) * 5;
  const rx = ((50 - py) / 50) * 5;

  card.style.setProperty("--mx", `${px}%`);
  card.style.setProperty("--my", `${py}%`);
  card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
}

export function handleGrowthCardMouseLeave(e) {
  const card = e.currentTarget;
  card._rect = null; // Clear cache
  card.style.setProperty("--mx", "50%");
  card.style.setProperty("--my", "0%");
  card.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
}
