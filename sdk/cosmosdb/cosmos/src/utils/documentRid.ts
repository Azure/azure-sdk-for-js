// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import atob from "./atob.js";

/**
 * Extracts the unsigned, little-endian document portion without losing 64-bit precision.
 * @hidden
 */
export function parseDocumentRid(rid: string): bigint {
  if (rid === null || rid === undefined) {
    throw new Error("RID is null or undefined");
  }
  if (typeof rid !== "string") {
    throw new Error(`RID must be a string, got ${typeof rid}`);
  }
  if (rid.trim().length === 0) {
    throw new Error("RID is empty string");
  }

  try {
    // Cosmos RIDs replace '/' with '-', unlike base64url.
    const bytes = atob(rid.replace(/-/g, "/"));
    if (bytes.length < 16) {
      throw new Error(`RID too short: expected at least 16 bytes, got ${bytes.length}`);
    }

    let result = 0n;
    for (let i = 15; i >= 8; i--) {
      result = (result << 8n) | BigInt(bytes.charCodeAt(i));
    }
    return result;
  } catch (error) {
    throw new Error(
      `Failed to convert RID '${rid}' to BigInt: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}
