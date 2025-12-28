const WORKER_URL = "https://taz-youtube.gzamlo98.workers.dev/latest";

const titleEl = document.getElementById("yt-title");
const thumbEl = document.getElementById("yt-thumb");
const timeEl  = document.getElementById("yt-time");
const cardEl  = document.getElementById("yt-card");

fetch(WORKER_URL)
  .then(res => res.json())
  .then(data => {
    if (!data.ok) throw new Error("YouTube fetch failed");

    titleEl.textContent = data.title;
    thumbEl.src = data.thumbnail;
    thumbEl.alt = data.title;
    cardEl.href = data.url;

    timeEl.textContent = formatDate(data.published);
  })
  .catch(err => {
    console.error(err);
    titleEl.textContent = "latest upload unavailable";
    timeEl.textContent = "";
  });

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
