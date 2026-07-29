// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsDaprComponentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectedEnvironmentsDaprComponentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectedEnvironmentsDaprComponentsGetOptionalParams extends OperationOptions {}
