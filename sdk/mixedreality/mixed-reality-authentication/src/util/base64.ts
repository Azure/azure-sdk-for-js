// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const isNode =
  typeof process !== "undefined" && Boolean(process.version) && Boolean(process.versions?.node);

declare global {
  // stub these out for the browser
  function btoa(input: string): string;
  function atob(input: string): string;
}

/**
 * Base64 encode.
 *
 * @internal
 * @param content - The string to be encoded
 * @returns encoded string
 */
export function base64encode(content: string): string {
  return isNode ? Buffer.from(content).toString("base64") : btoa(content);
}

/**
 * Base64 decode.
 *
 * @internal
 * @param encodedString - The encoded string
 * @returns decoded string
 */
export function base64decode(encodedString: string): string {
  return isNode ? Buffer.from(encodedString, "base64").toString() : atob(encodedString);
}
