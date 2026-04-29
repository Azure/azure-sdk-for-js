// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare const TextEncoder: new () => { encode(input: string): Uint8Array<ArrayBuffer> };
declare function atob(data: string): string;
declare function btoa(data: string): string;

export const encodeUTF8 = (str: string): Uint8Array<ArrayBuffer> => new TextEncoder().encode(str);

export function encodeUTF8fromBase64(str: string): Uint8Array<ArrayBuffer> {
  const binary = atob(str);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export function encodeBase64(value: ArrayBuffer): string {
  const bytes = new Uint8Array(value);
  const binary = String.fromCharCode.apply(null, [...bytes]);
  return btoa(binary);
}
