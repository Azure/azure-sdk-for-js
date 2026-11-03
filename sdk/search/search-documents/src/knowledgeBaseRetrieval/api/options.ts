// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RetrieveStreamOptionalParams extends OperationOptions {
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** User assertion token for a customer-owned Entra app registration configured on a Work IQ knowledge source. Used for on-behalf-of authentication to the Work IQ API. */
  queryWorkIQSourceAuthorization?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RetrieveOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Token identifying the user for which the query is being executed. This token is used to enforce security restrictions on documents. */
  querySourceAuthorization?: string;
  /** User assertion token for a customer-owned Entra app registration configured on a Work IQ knowledge source. Used for on-behalf-of authentication to the Work IQ API. */
  queryWorkIQSourceAuthorization?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
