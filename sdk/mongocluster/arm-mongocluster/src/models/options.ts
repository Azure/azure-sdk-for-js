// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoClustersListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersListConnectionStringsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersCheckNameAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface MongoClustersPromoteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallRulesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallRulesCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallRulesListByMongoClusterOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionsListByMongoClusterOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionsGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionsCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateLinksListByMongoClusterOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ReplicasListByParentOptionalParams extends OperationOptions {}
