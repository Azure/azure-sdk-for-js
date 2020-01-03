import { encodeUTF8 } from "./encode";

export async function digest(str: string) {
  if (!window || !window.crypto || !window.crypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
  }

  const data = encodeUTF8(str);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hash);
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (item: number) => ("00" + item.toString(16)).slice(-2))
    .join("");
}
