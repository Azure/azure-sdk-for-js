// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageAccountExpand } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StorageAccountsGetCustomerInitiatedMigrationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsRevokeUserDelegationKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsRestoreBlobRangesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountsCustomerInitiatedMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountsHierarchicalNamespaceMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountsFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameter is set to 'Planned' to indicate whether a Planned failover is requested. */
  failoverType?: "Planned";
}

/** Optional parameters. */
export interface StorageAccountsListServiceSASOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsListAccountSASOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsListKeysOptionalParams extends OperationOptions {
  /** Specifies type of the key to be listed. Possible value is kerb. */
  expand?: "kerb";
}

/** Optional parameters. */
export interface StorageAccountsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StorageAccountsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StorageAccountsGetPropertiesOptionalParams extends OperationOptions {
  /** May be used to expand the properties within account's properties. By default, data is not included when fetching properties. Currently we only support geoReplicationStats and blobRestoreStatus. */
  expand?: StorageAccountExpand;
}

/** Optional parameters. */
export interface StorageAccountsCheckNameAvailabilityOptionalParams extends OperationOptions {}
