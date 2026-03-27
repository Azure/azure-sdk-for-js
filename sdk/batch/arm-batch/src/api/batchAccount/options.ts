// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BatchAccountListDetectorsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountGetDetectorOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountGetKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountSynchronizeAutoStorageKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchAccountUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchAccountCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchAccountGetOptionalParams extends OperationOptions {}
