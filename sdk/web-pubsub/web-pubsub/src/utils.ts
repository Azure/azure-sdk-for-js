import { HttpRequestBody } from "@azure/core-http";

function isHttpRequestBody(obj: unknown): obj is HttpRequestBody {
  return (
    typeof obj === "function" ||
    (typeof obj === "object" &&
      obj != null &&
      (obj.constructor.name === "ArrayBuffer" ||
        obj.constructor.name === "Blob" ||
        ArrayBuffer.isView(obj)))
  );
}

export function getContentTypeForMessage(
  message: unknown,
  options: Record<string, any>
): "text/plain" | "application/json" | "application/octet-stream" {
  if (options?.contentType === "text/plain") {
    if (typeof message !== "string") {
      throw new TypeError("Message must be a string.");
    }
    return "text/plain";
  } else if (isHttpRequestBody(message)) {
    return "application/octet-stream";
  } else {
    return "application/json";
  }
}
