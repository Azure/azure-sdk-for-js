// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementRequestOptions } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionsListByServiceOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsUpdateOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}
