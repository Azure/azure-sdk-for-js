// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AppServiceEnvironmentsListPrivateEndpointConnectionListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsDeletePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetPrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListMultiRoleUsagesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListMultiRolePoolSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListMultiRoleMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListMultiRolePoolsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpdateMultiRolePoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsCreateOrUpdateMultiRolePoolOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetMultiRolePoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpdateAseNetworkingConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetAseV3NetworkingConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpdateAseCustomDnsSuffixConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetAseCustomDnsSuffixConfigurationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetVipInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListUsagesOptionalParams extends OperationOptions {
  /** Return only usages/metrics specified in the filter. Filter conforms to odata syntax. Example: $filter=(name.value eq 'Metric1' or name.value eq 'Metric2') and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[Hour|Minute|Day]'. */
  filter?: string;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsListSuspendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWebAppsOptionalParams extends OperationOptions {
  /** Comma separated list of app properties to include. */
  propertiesToInclude?: string;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsListAppServicePlansOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsRebootOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsTestUpgradeAvailableNotificationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListInboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetDiagnosticsItemOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListDiagnosticsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListChangeVnetOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsListCapacitiesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specify <code>true</code> to force the deletion even if the App Service Environment contains resources. The default is <code>false</code>. */
  forceDelete?: boolean;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWebWorkerUsagesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWorkerPoolSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWebWorkerMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsListWorkerPoolsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsUpdateWorkerPoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AppServiceEnvironmentsCreateOrUpdateWorkerPoolOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AppServiceEnvironmentsGetWorkerPoolOptionalParams extends OperationOptions {}
