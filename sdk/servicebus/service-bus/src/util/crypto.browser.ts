// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export async function generateKey(secret: string, stringToSign: string): Promise<string> {
  const key = await window.crypto.subtle.importKey(
    "raw",
    convertToUint8Array(secret),
    {
      name: "HMAC",
      hash: { name: "SHA-256" }
    },
    false,
    ["sign"]
  );

  const signature = await window.crypto.subtle.sign("HMAC", key, convertToUint8Array(stringToSign));
  const base64encodedString = encodeByteArray(new Uint8Array(signature));
  const result = encodeURIComponent(base64encodedString);
  return result;
}

function convertToUint8Array(value: string) {
  const arr = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i++) {
    arr[i] = value.charCodeAt(i);
  }
  return arr;
}

/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 */
function encodeByteArray(value: Uint8Array): string {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }
  return btoa(str);
}
