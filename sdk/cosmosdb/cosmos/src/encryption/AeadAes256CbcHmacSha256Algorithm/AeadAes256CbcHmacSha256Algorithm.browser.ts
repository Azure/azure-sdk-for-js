// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AeadAes256CbcHmacSha256Algorithm {}
export function randomBytes(_size: number): Buffer {
  throw new Error("Client-side random generator not supported in browser environment");
}
