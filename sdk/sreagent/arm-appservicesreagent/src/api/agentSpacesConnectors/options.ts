// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentSpacesConnectorsListAllSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentSpacesConnectorsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentSpacesConnectorsListByAgentSpaceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentSpacesConnectorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentSpacesConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentSpacesConnectorsGetOptionalParams extends OperationOptions {}
