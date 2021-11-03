export function encodeBinaryContent(content: unknown): Uint8Array {
  if (typeof content === "string") {
    const arr = new Uint8Array(content.length);
    for (let i = 0; i < content.length; i++) {
      arr[i] = content.charCodeAt(i);
    }

    return arr;
  }

  throw new Error("Invalid response content, expected binary");
}

export function decodeBinaryContent(content: unknown): string {
  if (typeof content === "string") {
    return String(content);
  }

  if (content instanceof Uint8Array) {
    let decodedBody = "";
    for (const element of content) {
      decodedBody += String.fromCharCode(element);
    }

    return decodedBody;
  }

  return JSON.stringify(content);
}
