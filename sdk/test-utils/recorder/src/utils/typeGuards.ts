import { HttpHeadersLike } from "@azure/core-http"

export function isHttpHeadersLike(headers: any): headers is HttpHeadersLike {
  return (
    headers &&
    typeof headers.get === "function" &&
    typeof headers.set === "function" &&
    typeof headers.remove === "function" &&
    typeof headers.clone === "function" &&
    typeof headers.toString === "function"
  );
}
