// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccountsListModelsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListUsagesOptionalParams extends OperationOptions {
  /** An OData filter expression that describes a subset of usages to return. The supported parameter is name.value (name of the metric, can have an or of multiple names). */
  filter?: string;
}

/** Optional parameters. */
export interface AccountsListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsGetOptionalParams extends OperationOptions {}
