import { RequestBodyType } from "@azure/core-rest-pipeline";

function isRequestBody(obj: unknown): obj is RequestBodyType {
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
  } else if (isRequestBody(message)) {
    return "application/octet-stream";
  } else {
    return "application/json";
  }
}
