import { encodeUTF8, encodeBase64 } from "./encode";
import atob from "./atob";

export async function hmac(key: string, message: string) {
  const encodedMessage = encodeUTF8(message);
  const encodedKey = encodeUTF8(atob(key));
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    encodedKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const signature = await window.crypto.subtle.sign("HMAC", cryptoKey, encodedMessage);

  return encodeBase64(signature);
}
