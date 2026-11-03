// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AFDProfilesUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AFDProfilesValidateSecretOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDProfilesCheckHostNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDProfilesListResourceUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AFDProfilesCheckEndpointNameAvailabilityOptionalParams extends OperationOptions {}
