// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Recorder } from "@azure-tools/test-recorder";

export function getUniqueName(prefix: string, options: { recorder?: Recorder } = {}): string {
  const uniqueName = `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
  return options.recorder?.variable(prefix, uniqueName) ?? uniqueName;
}

type Metadata = { [propertyName: string]: string };

/**
 * Validate if m1 is super set of m2.
 */
export function isSuperSet(m1?: Metadata, m2?: Metadata): boolean {
  if (!m1 || !m2) {
    throw new RangeError("m1 or m2 is invalid");
  }

  for (const p in m2) {
    if (m1[p] !== m2[p]) {
      return false;
    }
  }

  return true;
}

/**
 * Generate a Uint8Array with specified byteLength and random content.
 */
export function generateRandomUint8Array(byteLength: number): Uint8Array {
  const uint8Arr = new Uint8Array(byteLength);
  for (let j = 0; j < byteLength; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }
  return uint8Arr;
}
