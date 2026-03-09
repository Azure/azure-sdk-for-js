// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionsListByServiceOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsUpdateOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}
