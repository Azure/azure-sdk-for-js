export function encodeBinaryContent(content: unknown): Uint8Array {
  if (typeof content === "string") {
    return Buffer.from(content);
  }

  throw new Error("Invalid response content, expected binary string");
}

export function decodeBinaryContent(content: unknown): string {
  if (typeof content === "string") {
    return String(content);
  }

  if (ArrayBuffer.isView(content)) {
    return Buffer.from(content).toString();
  }

  return JSON.stringify(content);
}
