// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataPolicyManifestsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Valid values for $filter are: \"namespace eq '{value}'\". If $filter is not provided, no filtering is performed. If $filter=namespace eq '{value}' is provided, the returned list only includes all data policy manifests that have a namespace matching the provided value. */
  filter?: string;
}

/** Optional parameters. */
export interface DataPolicyManifestsGetByPolicyModeOptionalParams extends OperationOptions {}
