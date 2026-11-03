// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyMetadataListQueryOptions } from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyMetadataOperationsListOptionalParams extends OperationOptions {
  queryOptions?: PolicyMetadataListQueryOptions;
}

/** Optional parameters. */
export interface PolicyMetadataOperationsGetResourceOptionalParams extends OperationOptions {}
