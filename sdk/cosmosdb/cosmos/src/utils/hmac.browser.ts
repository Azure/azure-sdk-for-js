import { encodeUTF8, encodeBase64 } from "./encode";
import atob from "./atob";

const globalThis = typeof self === "undefined" ? window : self;

export async function hmac(key: string, message: string) {
  if (!globalThis || !globalThis.crypto || !globalThis.crypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
  }
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = new Uint8Array(
    [...unescape(encodeURIComponent(message))].map((c) => c.charCodeAt(0))
  );
  const encodedKey = encodeUTF8(atob(key));
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    encodedKey,
    importParams,
    false,
    ["sign"]
  );
  const signature = await globalThis.crypto.subtle.sign(importParams, cryptoKey, encodedMessage);

  return encodeBase64(signature);
}
