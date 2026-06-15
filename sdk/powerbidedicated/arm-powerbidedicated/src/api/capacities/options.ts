// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapacitiesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacitiesListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacitiesListSkusForCapacityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacitiesResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacitiesSuspendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacitiesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacitiesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacitiesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacitiesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacitiesGetDetailsOptionalParams extends OperationOptions {}
