// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StandbyPoolManagementClient } from "./standbyPoolManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceProperties,
  StandbyVirtualMachinePoolElasticityProfile,
  DynamicSizing,
  VirtualMachineState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  StandbyVirtualMachinePoolResourceUpdate,
  StandbyVirtualMachinePoolResourceUpdateProperties,
  StandbyVirtualMachineResource,
  StandbyVirtualMachineResourceProperties,
  ProxyResource,
  StandbyVirtualMachinePoolRuntimeViewResource,
  StandbyVirtualMachinePoolRuntimeViewResourceProperties,
  VirtualMachineInstanceCountSummary,
  PoolVirtualMachineStateCount,
  PoolVirtualMachineState,
  PoolStatus,
  HealthStateCode,
  StandbyVirtualMachinePoolPrediction,
  StandbyVirtualMachinePoolForecastValues,
  StandbyContainerGroupPoolResource,
  StandbyContainerGroupPoolResourceProperties,
  StandbyContainerGroupPoolElasticityProfile,
  RefillPolicy,
  ContainerGroupProperties,
  ContainerGroupProfile,
  Subnet,
  StandbyContainerGroupPoolResourceUpdate,
  StandbyContainerGroupPoolResourceUpdateProperties,
  StandbyContainerGroupPoolRuntimeViewResource,
  StandbyContainerGroupPoolRuntimeViewResourceProperties,
  ContainerGroupInstanceCountSummary,
  PoolContainerGroupStateCount,
  PoolContainerGroupState,
  StandbyContainerGroupPoolPrediction,
  StandbyContainerGroupPoolForecastValues,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownVirtualMachineState,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownPoolVirtualMachineState,
  KnownHealthStateCode,
  KnownRefillPolicy,
  KnownPoolContainerGroupState,
  KnownVersions,
} from "./models/index.js";
export type { StandbyPoolManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
} from "./api/standbyContainerGroupPoolRuntimeViews/index.js";
export type {
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsGetOptionalParams,
} from "./api/standbyContainerGroupPools/index.js";
export type {
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
} from "./api/standbyVirtualMachinePoolRuntimeViews/index.js";
export type {
  StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
  StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsUpdateOptionalParams,
  StandbyVirtualMachinePoolsDeleteOptionalParams,
  StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsGetOptionalParams,
} from "./api/standbyVirtualMachinePools/index.js";
export type {
  StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
  StandbyVirtualMachinesGetOptionalParams,
} from "./api/standbyVirtualMachines/index.js";
export type {
  OperationsOperations,
  StandbyContainerGroupPoolRuntimeViewsOperations,
  StandbyContainerGroupPoolsOperations,
  StandbyVirtualMachinePoolRuntimeViewsOperations,
  StandbyVirtualMachinePoolsOperations,
  StandbyVirtualMachinesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
