// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { base64Decode, base64Encode } from "./bufferSerializer";

export interface ContinuationToken {
  nextPartitionKey: string;
  nextRowKey: string;
}

/**
 * Encodes the nextPartitionKey and nextRowKey into a single continuation token
 */
export function encodeContinuationToken(
  nextPartitionKey: string = "",
  nextRowKey: string = ""
): string | undefined {
  if (!nextPartitionKey && !nextRowKey) {
    return undefined;
  }

  const continuationToken = JSON.stringify({
    nextPartitionKey,
    nextRowKey
  });

  return base64Encode(continuationToken);
}

/**
 * Decodes a continuationToken into an object containing a nextPartitionKey and nextRowKey
 */
export function decodeContinuationToken(encodedToken: string): ContinuationToken {
  const decodedToken = base64Decode(encodedToken);
  let tokenStr = "";

  for (const byte of decodedToken) {
    tokenStr += String.fromCharCode(byte);
  }
  const continuationToken: ContinuationToken = JSON.parse(tokenStr);

  return continuationToken;
}
