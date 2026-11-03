// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeviceManagementDeleteDeploymentForDeviceClassSubgroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementDeleteDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListHealthOfDevicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetLogCollectionDetailedStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListLogCollectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetLogCollectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementStartLogCollectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListOperationStatusesOptionalParams extends OperationOptions {
  /**
   * Restricts the set of operations returned. Only one specific filter is
   * supported: "status eq 'NotStarted' or status eq 'Running'"
   */
  filter?: string;
  /**
   * Specifies a non-negative integer n that limits the number of items returned
   * from a collection. The service returns the number of available items up to but
   * not greater than the specified value n.
   */
  top?: number;
}

/** Optional parameters. */
export interface DeviceManagementGetOperationStatusOptionalParams extends OperationOptions {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeviceManagementListDeviceStatesForDeviceClassSubgroupDeploymentOptionalParams extends OperationOptions {
  /**
   * Restricts the set of deployment device states returned. You can filter on
   * deviceId and moduleId and/or deviceState.
   */
  filter?: string;
}

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupDeploymentStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementRetryDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementStopDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeploymentForDeviceClassSubgroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForDeviceClassSubgroupOptionalParams extends OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderBy?: string;
}

/** Optional parameters. */
export interface DeviceManagementGetBestUpdatesForDeviceClassSubgroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupUpdateComplianceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementDeleteDeviceClassSubgroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassSubgroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListDeviceClassSubgroupsForGroupOptionalParams extends OperationOptions {
  /**
   * Restricts the set of device class subgroups returned. You can filter on compat
   * properties by name and value. (i.e. filter=compatProperties/propertyName1 eq
   * 'value1' and compatProperties/propertyName2 eq 'value2')
   */
  filter?: string;
}

/** Optional parameters. */
export interface DeviceManagementGetDeploymentStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementCreateOrUpdateDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeploymentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListDeploymentsForGroupOptionalParams extends OperationOptions {
  /** Orders the set of deployments returned. You can order by start date. */
  orderBy?: string;
}

/** Optional parameters. */
export interface DeviceManagementListBestUpdatesForGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetUpdateComplianceForGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementDeleteGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListGroupsOptionalParams extends OperationOptions {
  /**
   * Orders the set of groups returned. You can order by groupId, deviceCount,
   * createdDate, subgroupsWithNewUpdatesAvailableCount,
   * subgroupsWithUpdatesInProgressCount, or subgroupsOnLatestUpdateCount.
   */
  orderBy?: string;
}

/** Optional parameters. */
export interface DeviceManagementGetUpdateComplianceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceModuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementImportDevicesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeviceManagementListDevicesOptionalParams extends OperationOptions {
  /**
   * Restricts the set of devices returned. You can filter on GroupId,
   * DeviceClassId, or GroupId and DeploymentStatus. Use DeploymentStatus eq null to
   * query for devices with no deployment status (that have never been deployed to).
   */
  filter?: string;
}

/** Optional parameters. */
export interface DeviceManagementListInstallableUpdatesForDeviceClassOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementDeleteDeviceClassOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementUpdateDeviceClassOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementGetDeviceClassOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceManagementListDeviceClassesOptionalParams extends OperationOptions {
  /** Restricts the set of device classes returned. You can filter on friendly name. */
  filter?: string;
}
