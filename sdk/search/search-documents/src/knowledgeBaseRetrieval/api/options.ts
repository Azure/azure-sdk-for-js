// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RetrieveOptionalParams extends OperationOptions {
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
