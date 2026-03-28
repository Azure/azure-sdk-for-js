// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MigrateToStv2Contract,
  ApiManagementServiceApplyNetworkConfigurationParameters,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiManagementServiceCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiManagementServiceRefreshHostnamesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters supplied to the Apply Network Configuration operation. If the parameters are empty, all the regions in which the Api Management service is deployed will be updated sequentially without incurring downtime in the region. */
  parameters?: ApiManagementServiceApplyNetworkConfigurationParameters;
}

/** Optional parameters. */
export interface ApiManagementServiceGetSsoTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiManagementServiceMigrateToStv2OptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameters supplied to migrate service. */
  parameters?: MigrateToStv2Contract;
}

/** Optional parameters. */
export interface ApiManagementServiceBackupOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiManagementServiceListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiManagementServiceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ApiManagementServiceGetOptionalParams extends OperationOptions {}
