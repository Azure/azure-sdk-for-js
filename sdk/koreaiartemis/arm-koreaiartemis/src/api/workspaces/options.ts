// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacesGetDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListLinkedSaaSOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesLinkSaaSOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesListByOrganizationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesGetOptionalParams extends OperationOptions {}
