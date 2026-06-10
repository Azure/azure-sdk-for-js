// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EndpointType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EndpointRegenerateKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointGetModelsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointListOptionalParams extends OperationOptions {
  /** Endpoint type filter */
  endpointType?: EndpointType;
  includeOnlineEndpoints?: boolean;
  includeServerlessEndpoints?: boolean;
  includeConnections?: boolean;
  /** Continuation token for pagination. */
  skip?: string;
  /** Whether the endpoint resource will be expand to include deployment information, e.g. $expand=deployments */
  expand?: string;
}

/** Optional parameters. */
export interface EndpointCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EndpointGetOptionalParams extends OperationOptions {}
