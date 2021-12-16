// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A message that contains binary data and a content type.
 */
export interface MessageWithMetadata {
  /**
   * The message's binary data
   */
  data: Uint8Array;
  /**
   * The message's content type
   */
  contentType: string;
}