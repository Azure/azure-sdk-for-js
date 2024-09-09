// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FabricCapacitiesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FabricCapacitiesCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCapacitiesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCapacitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCapacitiesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FabricCapacitiesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FabricCapacitiesResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCapacitiesSuspendOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCapacitiesCheckNameAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FabricCapacitiesListSkusForCapacityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FabricCapacitiesListSkusOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}
