// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainsRelationshipsListByResourceGroupOptionalParams extends OperationOptions {
  /** Filters the results by target resource type. Example: properties.metadata.targetType eq 'Microsoft.Compute/virtualMachines' */
  filter?: string;
}
/** Optional parameters. */
export interface ContainsRelationshipsListBySubscriptionOptionalParams extends OperationOptions {
  /** Filters the results by target resource type. Example: properties.metadata.targetType eq 'Microsoft.Compute/virtualMachines' */
  filter?: string;
}
