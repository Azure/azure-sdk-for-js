import { Buffer } from "buffer";

//Function to encode a string to base64 string
export function base64Encode(str: string): string {
  const buffer = Buffer.from(str, "utf-8");
  return buffer.toString("base64");
}

// Function to decode a base64 string
export function base64Decode(encodedStr: string): string {
  const buffer = Buffer.from(encodedStr, "base64");
  return buffer.toString("utf-8");
}
