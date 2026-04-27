// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RetrieveOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
