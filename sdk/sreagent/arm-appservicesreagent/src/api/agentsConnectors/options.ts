// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsConnectorsListWithSecretsByAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsConnectorsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsConnectorsListByAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsConnectorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentsConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentsConnectorsGetOptionalParams extends OperationOptions {}
