// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedEnvironmentPatchResource } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedEnvironmentsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsUpdateOptionalParams extends OperationOptions {
  /** Configuration details of the connectedEnvironment. */
  environmentEnvelope?: ConnectedEnvironmentPatchResource;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsGetOptionalParams extends OperationOptions {}
