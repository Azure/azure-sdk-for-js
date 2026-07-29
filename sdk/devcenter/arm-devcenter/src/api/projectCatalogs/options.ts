// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectCatalogsConnectOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsSyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsGetSyncErrorDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectCatalogsListOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsPatchOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectCatalogsGetOptionalParams extends OperationOptions {}
