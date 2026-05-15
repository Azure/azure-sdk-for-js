// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentDeploymentsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentDeploymentsStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentDeploymentsListOptionalParams extends OperationOptions {
  /** Number of agent deployments to be retrieved in a page of results. */
  count?: number;
  /** Continuation token for pagination. */
  skipToken?: string;
  /** Names of agent deployments to retrieve. */
  names?: string[];
  /** Field to order by. */
  orderBy?: string;
  /** Whether to order in ascending order. */
  orderByAsc?: boolean;
}

/** Optional parameters. */
export interface AgentDeploymentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentDeploymentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentDeploymentsGetOptionalParams extends OperationOptions {}
