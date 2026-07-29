// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryNlpRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams extends OperationOptions {
  /** The request body */
  discoverSolutionRequest?: DiscoveryNlpRequest;
}

/** Optional parameters. */
export interface DiscoverySolutionNLPDiscoverSolutionsOptionalParams extends OperationOptions {
  /** The request body */
  discoverSolutionRequest?: DiscoveryNlpRequest;
}
