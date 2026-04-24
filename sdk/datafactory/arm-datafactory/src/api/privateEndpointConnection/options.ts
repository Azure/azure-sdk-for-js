// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the private endpoint connection entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionGetOptionalParams extends OperationOptions {
  /** ETag of the private endpoint connection entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
