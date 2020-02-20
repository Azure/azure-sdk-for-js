import { encodeUTF8 } from "./encode";

const _global = typeof self === "undefined" ? window : self;

export async function digest(str: string) {
  if (!_global || !_global.crypto || !_global.crypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
  }

  const data = encodeUTF8(str);
  const hash = await _global.crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hash);
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (item: number) => ("00" + item.toString(16)).slice(-2))
    .join("");
}
