const WORKER = "https://yt-latest.gzamlo98.workers.dev";

function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;

  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

async function loadYouTube() {
  const card = document.getElementById("yt-card");
  const title = document.getElementById("yt-title");
  const thumb = document.getElementById("yt-thumb");
  const time = document.getElementById("yt-time");

  try {
    const res = await fetch(WORKER);
    if (!res.ok) throw new Error("worker request failed");

    const yt = await res.json();

    card.href = yt.url;
    title.textContent = yt.title;
    thumb.src = yt.thumbnail;
    thumb.loading = "lazy";
    time.textContent = timeAgo(yt.published);
  } catch (err) {
    title.textContent = "couldn’t load latest upload";
    time.textContent = "offline";
    card.href = "https://www.youtube.com/@taztsgh";
  }
}

loadYouTube();
