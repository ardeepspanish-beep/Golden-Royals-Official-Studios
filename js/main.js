// src/main.js
import { chat, generateImage, generateModel } from "./api.js";

//
// Chat
//
const chatInput  = document.getElementById("chat-input");
const chatSend   = document.getElementById("chat-send");
const replyBox   = document.getElementById("reply");

chatSend.addEventListener("click", async () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  replyBox.textContent = "⏳ Thinking…";
  chatSend.disabled = true;
  try {
    const { reply } = await chat(msg);
    replyBox.textContent = reply;
  } catch (err) {
    replyBox.textContent = `❌ ${err.message}`;
  } finally {
    chatSend.disabled = false;
  }
});

//
// Image
//
const imagePrompt = document.getElementById("image-prompt");
const imageSend   = document.getElementById("image-send");
const imageRes    = document.getElementById("image-result");

imageSend.addEventListener("click", async () => {
  const p = imagePrompt.value.trim();
  if (!p) return;
  imageRes.innerHTML = "⏳ Generating…";
  imageSend.disabled = true;
  try {
    const { imageUrl } = await generateImage(p);
    imageRes.innerHTML = `<img src="${imageUrl}" alt="AI generated image" />`;
  } catch (err) {
    imageRes.textContent = `❌ ${err.message}`;
  } finally {
    imageSend.disabled = false;
  }
});

//
// 3D Model
//
const modelUrlIn = document.getElementById("model-url");
const modelSend  = document.getElementById("model-send");
const modelRes   = document.getElementById("model-result");

modelSend.addEventListener("click", async () => {
  const url = modelUrlIn.value.trim();
  if (!url) return;
  modelRes.textContent = "⏳ Working…";
  modelSend.disabled = true;
  try {
    const { model } = await generateModel(url);
    // For demo we’ll just JSON-dump the result
    modelRes.textContent = JSON.stringify(model, null, 2);
    // In real life you’d feed that URL into your 3D viewer
  } catch (err) {
    modelRes.textContent = `❌ ${err.message}`;
  } finally {
    modelSend.disabled = false;
  }
});
