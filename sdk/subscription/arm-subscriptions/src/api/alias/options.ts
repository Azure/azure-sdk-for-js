// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AliasListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AliasDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AliasCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AliasGetOptionalParams extends OperationOptions {}
