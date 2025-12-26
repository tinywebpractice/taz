const WORKER_URL = "https://yt-latest.gzamlo98.workers.dev/";

async function loadLatestYouTube() {
  try {
    const res = await fetch(WORKER_URL);
    const data = await res.json();

    if (!data || !data.url) return;

    const card = document.getElementById("yt-card");
    const title = document.getElementById("yt-title");
    const time = document.getElementById("yt-time");
    const thumb = document.getElementById("yt-thumb");

    card.href = data.url;
    title.textContent = data.title;
    time.textContent = "latest upload";
    thumb.src = data.thumbnail;
  } catch (err) {
    console.error("youtube fetch failed", err);
  }
}

document.addEventListener("DOMContentLoaded", loadLatestYouTube);
