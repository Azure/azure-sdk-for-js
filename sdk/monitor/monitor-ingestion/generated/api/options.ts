// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UploadOptionalParams extends OperationOptions {
  /** The content encoding of the request body which is always 'gzip'. */
  contentEncoding?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
