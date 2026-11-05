// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import atob from "./atob.js";

/**
 * Convert RID to BigInt for accurate comparison.
 * Decodes base64 RID and extracts the Document ID portion (8 bytes at offset 8) as BigInt.
 *
 * RID Structure (from Java SDK ResourceId.java):
 * - Bytes 0-3: Database ID (4 bytes)
 * - Bytes 4-7: Collection ID (4 bytes)
 * - Bytes 8-15: Document ID (8 bytes, interpreted as unsigned Little Endian)
 * - Bytes 16-19: Attachment ID (4 bytes, optional)
 *
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
