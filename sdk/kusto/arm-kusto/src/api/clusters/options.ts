// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClustersCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersRemoveLanguageExtensionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersAddLanguageExtensionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersListLanguageExtensionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListCalloutPoliciesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersRemoveCalloutPolicyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersAddCalloutPoliciesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListSkusByResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersDiagnoseVirtualNetworkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersDetachFollowerDatabasesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersListFollowerDatabasesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListFollowerDatabasesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersMigrateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the cluster. Omit this value to always overwrite the current cluster. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the cluster. Omit this value to always overwrite the current cluster. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new cluster to be created, but to prevent updating an existing cluster. Other values will result in a 412 Pre-condition Failed response. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ClustersGetOptionalParams extends OperationOptions {}
