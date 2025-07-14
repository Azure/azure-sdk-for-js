// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StandbyPoolManagementClient } from "./standbyPoolManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  StandbyVirtualMachinePoolResource,
  StandbyVirtualMachinePoolResourceProperties,
  StandbyVirtualMachinePoolElasticityProfile,
  KnownVirtualMachineState,
  VirtualMachineState,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
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
  KnownPoolVirtualMachineState,
  PoolVirtualMachineState,
  PoolStatus,
  KnownHealthStateCode,
  HealthStateCode,
  StandbyVirtualMachinePoolPrediction,
  StandbyVirtualMachinePoolForecastValues,
  StandbyContainerGroupPoolResource,
  StandbyContainerGroupPoolResourceProperties,
  StandbyContainerGroupPoolElasticityProfile,
  KnownRefillPolicy,
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
  KnownPoolContainerGroupState,
  PoolContainerGroupState,
  StandbyContainerGroupPoolPrediction,
  StandbyContainerGroupPoolForecastValues,
  KnownVersions,
} from "./models/index.js";
export { StandbyPoolManagementClientOptionalParams } from "./api/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
} from "./api/standbyContainerGroupPoolRuntimeViews/index.js";
export {
  StandbyContainerGroupPoolsListBySubscriptionOptionalParams,
  StandbyContainerGroupPoolsListByResourceGroupOptionalParams,
  StandbyContainerGroupPoolsUpdateOptionalParams,
  StandbyContainerGroupPoolsDeleteOptionalParams,
  StandbyContainerGroupPoolsCreateOrUpdateOptionalParams,
  StandbyContainerGroupPoolsGetOptionalParams,
} from "./api/standbyContainerGroupPools/index.js";
export {
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
} from "./api/standbyVirtualMachinePoolRuntimeViews/index.js";
export {
  StandbyVirtualMachinePoolsListBySubscriptionOptionalParams,
  StandbyVirtualMachinePoolsListByResourceGroupOptionalParams,
  StandbyVirtualMachinePoolsUpdateOptionalParams,
  StandbyVirtualMachinePoolsDeleteOptionalParams,
  StandbyVirtualMachinePoolsCreateOrUpdateOptionalParams,
  StandbyVirtualMachinePoolsGetOptionalParams,
} from "./api/standbyVirtualMachinePools/index.js";
export {
  StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
  StandbyVirtualMachinesGetOptionalParams,
} from "./api/standbyVirtualMachines/index.js";
export {
  OperationsOperations,
  StandbyContainerGroupPoolRuntimeViewsOperations,
  StandbyContainerGroupPoolsOperations,
  StandbyVirtualMachinePoolRuntimeViewsOperations,
  StandbyVirtualMachinePoolsOperations,
  StandbyVirtualMachinesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
