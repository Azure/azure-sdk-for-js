// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KnownMmsContentType } from "./generated/src/models";

export interface MmsAttachment {
  /** MIME type of attachment. */
  contentType: KnownMmsContentType;
  /** Content of the attachment encoded in base 64. */
  contentInBase64: Uint8Array;
}

export {
  KnownMmsContentType,
} from "./generated/src/models";
