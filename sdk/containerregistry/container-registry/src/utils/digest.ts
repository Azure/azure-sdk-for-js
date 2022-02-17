import crypto from "crypto";

export function calculateDigest(data: Buffer): string {
  const checksum = crypto.createHash("sha256").update(data).digest("hex");
  return `sha256:${checksum}`;
}
