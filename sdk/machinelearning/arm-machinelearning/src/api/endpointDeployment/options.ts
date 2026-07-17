// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EndpointType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EndpointDeploymentGetInWorkspaceOptionalParams extends OperationOptions {
  /** Endpoint type filter */
  endpointType?: EndpointType;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface EndpointDeploymentListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointDeploymentDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface EndpointDeploymentCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EndpointDeploymentGetOptionalParams extends OperationOptions {}
