// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This function is a minimal implementation borrowed from the implementation at
// https://github.com/microsoft/CorrelationVector-JavaScript/blob/6da3f9e6150581756aba54b98dcd1e7329ef36bd/cV.js.
// License is MIT: https://github.com/microsoft/CorrelationVector-JavaScript/blob/6da3f9e6150581756aba54b98dcd1e7329ef36bd/LICENSE

const base64CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const cVBaseLength = 22;

/**
 * Seed function to randomly generate a 16 character base64 encoded string for
 * the Correlation Vector's base value.
 * @returns Returns generated correlation vector base value.
 */
export function generateCvBase(): string {
  let result = "";

  for (let i = 0; i < cVBaseLength; i++) {
    result += base64CharSet.charAt(Math.floor(Math.random() * base64CharSet.length));
  }

  return result;
}
