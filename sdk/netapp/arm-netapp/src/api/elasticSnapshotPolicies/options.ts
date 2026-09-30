// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ElasticSnapshotPoliciesListElasticVolumesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ElasticSnapshotPoliciesListByElasticAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ElasticSnapshotPoliciesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticSnapshotPoliciesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticSnapshotPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ElasticSnapshotPoliciesGetOptionalParams extends OperationOptions {}
