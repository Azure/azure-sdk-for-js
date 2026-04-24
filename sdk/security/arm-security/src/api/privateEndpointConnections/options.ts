// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityManagementClientprivateLinkParameters } from "../../models/securityManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionsListOptionalParams extends OperationOptions {
  params?: SecurityManagementClientprivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  params?: SecurityManagementClientprivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  params?: SecurityManagementClientprivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams extends OperationOptions {
  params?: SecurityManagementClientprivateLinkParameters;
}
