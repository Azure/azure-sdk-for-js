// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AzureKeyVaultSecretProviderClassesGetOptionalParams extends OperationOptions {}
