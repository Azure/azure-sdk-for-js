// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Format } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedClustersListKubernetesVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListMeshUpgradeProfilesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetMeshUpgradeProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListMeshRevisionProfilesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetMeshRevisionProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListSafeguardsVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetSafeguardsVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListGuardrailsVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetGuardrailsVersionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetUpgradeProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersRebalanceLoadBalancersOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersGetCommandResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersRunCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersRotateServiceAccountSigningKeysOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersAbortLatestOperationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersRotateClusterCertificatesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersResetAADProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersResetServicePrincipalProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedClustersListClusterMonitoringUserCredentialsOptionalParams extends OperationOptions {
  /** server fqdn type for credentials to be returned */
  serverFqdn?: string;
}

/** Optional parameters. */
export interface ManagedClustersListClusterUserCredentialsOptionalParams extends OperationOptions {
  /** server fqdn type for credentials to be returned */
  serverFqdn?: string;
  /** Only apply to AAD clusters, specifies the format of returned kubeconfig. Format 'azure' will return azure auth-provider kubeconfig; format 'exec' will return exec format kubeconfig, which requires kubelogin binary in the path. */
  format?: Format;
}

/** Optional parameters. */
export interface ManagedClustersListClusterAdminCredentialsOptionalParams extends OperationOptions {
  /** server fqdn type for credentials to be returned */
  serverFqdn?: string;
}

/** Optional parameters. */
export interface ManagedClustersGetAccessProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedClustersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** ignore-pod-disruption-budget=true to delete those pods on a node without considering Pod Disruption Budget */
  ignorePodDisruptionBudget?: boolean;
}

/** Optional parameters. */
export interface ManagedClustersUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ManagedClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ManagedClustersGetOptionalParams extends OperationOptions {}
