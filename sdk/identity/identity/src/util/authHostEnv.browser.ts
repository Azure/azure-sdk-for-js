const BrowserNotSupportedError = new Error(
  "getAuthorityHostEnvironment is not supported in the browser."
);

export function getAuthorityHostEnvironment() {
  throw BrowserNotSupportedError;
}
