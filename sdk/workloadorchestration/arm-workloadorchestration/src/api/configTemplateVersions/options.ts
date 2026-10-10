// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigTemplateVersionsListByConfigTemplateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplateVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigTemplateVersionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplateVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigTemplateVersionsGetOptionalParams extends OperationOptions {}
