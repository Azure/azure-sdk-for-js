// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EdgeMachineSecuritySettingsOperationsListByEdgeMachineOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EdgeMachineSecuritySettingsOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachineSecuritySettingsOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EdgeMachineSecuritySettingsOperationsGetOptionalParams extends OperationOptions {}
