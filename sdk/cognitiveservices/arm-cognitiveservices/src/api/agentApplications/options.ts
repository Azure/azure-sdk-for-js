// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentApplicationsDisableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentApplicationsEnableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentApplicationsListAgentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentApplicationsListOptionalParams extends OperationOptions {
  /** Number of agent applications to be retrieved in a page of results. */
  count?: number;
  /** Number of agent applications to skip. */
  skip?: number;
  /** Continuation token for pagination. */
  skipToken?: string;
  /** Names of agent applications to retrieve. */
  names?: string[];
  /** Search text for filtering agent applications. */
  searchText?: string;
  /** Field to order by. */
  orderBy?: string;
  /** Whether to order in ascending order. */
  orderByAsc?: boolean;
}

/** Optional parameters. */
export interface AgentApplicationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentApplicationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AgentApplicationsGetOptionalParams extends OperationOptions {}
