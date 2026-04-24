// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkParameters } from "../../models/securityManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionsListOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  privateLinkName?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}
