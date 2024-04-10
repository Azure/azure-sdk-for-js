// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KnownMmsContentType as MmsContentType } from "./generated/src/models";

export interface MmsAttachment {
  /** MIME type of attachment. */
  contentType: MmsContentType;
  /** Content of the attachment encoded in base 64. */
  content: Uint8Array;
}

export {
  KnownMmsContentType as MmsContentType
} from "./generated/src/models";
