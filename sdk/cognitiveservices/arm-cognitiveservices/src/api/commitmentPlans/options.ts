// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CommitmentPlansListAssociationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansDeleteAssociationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansCreateOrUpdateAssociationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansGetAssociationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansListPlansBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansListPlansByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansDeletePlanOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansUpdatePlanOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansCreateOrUpdatePlanOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansGetPlanOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommitmentPlansCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommitmentPlansGetOptionalParams extends OperationOptions {}
