import { createHash } from "crypto";

export async function digest(str: string) {
  const hash = createHash("sha256");
  hash.update(str, "utf8");
  return hash.digest("hex");
}
