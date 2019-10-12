import { createHmac } from "crypto";

export async function hmac(key: string, message: string) {
  return createHmac("sha256", Buffer.from(key, "base64"))
    .update(message)
    .digest("base64");
}
