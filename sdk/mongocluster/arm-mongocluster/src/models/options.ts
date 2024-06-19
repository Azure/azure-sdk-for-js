// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface OperationsListOptionalParams extends OperationOptions {}

export interface MongoClustersGetOptionalParams extends OperationOptions {}

export interface MongoClustersCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface MongoClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface MongoClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface MongoClustersListByResourceGroupOptionalParams
  extends OperationOptions {}

export interface MongoClustersListOptionalParams extends OperationOptions {}

export interface MongoClustersListConnectionStringsOptionalParams
  extends OperationOptions {}

export interface MongoClustersCheckNameAvailabilityOptionalParams
  extends OperationOptions {}

export interface FirewallRulesGetOptionalParams extends OperationOptions {}

export interface FirewallRulesCreateOrUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface FirewallRulesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface FirewallRulesListByMongoClusterOptionalParams
  extends OperationOptions {}

export interface PrivateEndpointConnectionsListByMongoClusterOptionalParams
  extends OperationOptions {}

export interface PrivateEndpointConnectionsGetOptionalParams
  extends OperationOptions {}

export interface PrivateEndpointConnectionsCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface PrivateEndpointConnectionsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface PrivateLinksListByMongoClusterOptionalParams
  extends OperationOptions {}
