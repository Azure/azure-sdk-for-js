import { encodeUTF8, encodeBase64 } from "./encode";
import atob from "./atob";

export async function hmac(key: string, message: string) {
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = encodeUTF8(message);
  const encodedKey = encodeUTF8(atob(key));
  const cryptoKey = await window.crypto.subtle.importKey("raw", encodedKey, importParams, false, [
    "sign"
  ]);
  const signature = await window.crypto.subtle.sign(importParams, cryptoKey, encodedMessage);

  return encodeBase64(signature);
}
