// src/api.js
const BASE = import.meta.env.DEV
  ? "http://localhost:4000"
  : "https://ardeepspanish-beep.github.io/Golden-Royals-Official-Studios";

async function send(path, body) {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const chat       = (message) => send("/api/chat", { message });
export const generateImage = (prompt)  => send("/api/image", { prompt });
export const generateModel = (imageUrl) => send("/api/model", { imageUrl });
