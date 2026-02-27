// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StandbyPoolManagementClient } from "./standbyPoolManagementClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type StandbyVirtualMachinePoolResource,
  type StandbyVirtualMachinePoolResourceProperties,
  type StandbyVirtualMachinePoolElasticityProfile,
  KnownVirtualMachineState,
  type VirtualMachineState,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type StandbyVirtualMachinePoolResourceUpdate,
  type StandbyVirtualMachinePoolResourceUpdateProperties,
  type StandbyVirtualMachineResource,
  type StandbyVirtualMachineResourceProperties,
  type ProxyResource,
  type StandbyVirtualMachinePoolRuntimeViewResource,
  type StandbyVirtualMachinePoolRuntimeViewResourceProperties,
  type VirtualMachineInstanceCountSummary,
  type PoolVirtualMachineStateCount,
  KnownPoolVirtualMachineState,
  type PoolVirtualMachineState,
  type PoolStatus,
  KnownHealthStateCode,
  type HealthStateCode,
  type StandbyVirtualMachinePoolPrediction,
  type StandbyVirtualMachinePoolForecastValues,
  type StandbyContainerGroupPoolResource,
  type StandbyContainerGroupPoolResourceProperties,
  type StandbyContainerGroupPoolElasticityProfile,
  KnownRefillPolicy,
  type RefillPolicy,
  type ContainerGroupProperties,
  type ContainerGroupProfile,
  type Subnet,
  type StandbyContainerGroupPoolResourceUpdate,
  type StandbyContainerGroupPoolResourceUpdateProperties,
  type StandbyContainerGroupPoolRuntimeViewResource,
  type StandbyContainerGroupPoolRuntimeViewResourceProperties,
  type ContainerGroupInstanceCountSummary,
  type PoolContainerGroupStateCount,
  KnownPoolContainerGroupState,
  type PoolContainerGroupState,
  type StandbyContainerGroupPoolPrediction,
  type StandbyContainerGroupPoolForecastValues,
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
