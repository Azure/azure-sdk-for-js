// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DependencyOfRelationshipsByServiceGroupListOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface DependencyOfRelationshipsByServiceGroupDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface DependencyOfRelationshipsByServiceGroupGetOptionalParams extends OperationOptions {}
