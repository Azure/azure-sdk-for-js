// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EncryptionScopesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EncryptionScopesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EncryptionScopesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EncryptionScopesGetOptionalParams extends OperationOptions {}
