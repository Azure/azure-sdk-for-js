// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PlatformClient } from "./platformClient.js";
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
  OperationStatusResult,
  Agreement,
  AgreementProperties,
  ProvisioningState,
  AgreementStatus,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  Cloud,
  CloudProperties,
  TrackedResource,
  CloudUpdate,
  CloudUpdateProperties,
  CloudResource,
  CloudResourceProperties,
  Provider,
  ComputeStack,
  CloudResourceUpdate,
  CloudResourceUpdateProperties,
  ComputeConfig,
  ComputeConfigProperties,
  ComputeConfigSpec,
  ComputeConfigSpecOption,
  NodeType,
  LogicalResources,
  PhysicalResources,
  CpuArchitecture,
  WorkerNode,
  MarketType,
  ComputeConfigUpdate,
  ComputeConfigUpdateProperties,
  ContainerImage,
  ContainerImageProperties,
  ContainerImageBuildState,
  ContainerImageUpdate,
  ContainerImageUpdateProperties,
  Job,
  JobProperties,
  JobConfig,
  ComputeConfigSpecOrReference,
  JobState,
  JobUpdate,
  JobUpdateProperties,
  Project,
  ProjectProperties,
  Service,
  ServiceProperties,
  ServiceDeploymentConfig,
  RolloutStrategy,
  TracingConfig,
  RayGcsExternalStorageConfig,
  ServiceCurrentState,
  ServiceVersionDetail,
  ServiceVersionState,
  ServiceUpdate,
  ServiceUpdateProperties,
  Workspace,
  WorkspaceProperties,
  WorkspaceState,
  WorkspaceUpdate,
  WorkspaceUpdateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownAgreementStatus,
  KnownCreatedByType,
  KnownProvider,
  KnownComputeStack,
  KnownCpuArchitecture,
  KnownMarketType,
  KnownContainerImageBuildState,
  KnownJobState,
  KnownRolloutStrategy,
  KnownServiceCurrentState,
  KnownServiceVersionState,
  KnownWorkspaceState,
  KnownVersions,
} from "./models/index.js";
export type { PlatformClientOptionalParams } from "./api/index.js";
export type {
  AgreementsDeleteOptionalParams,
  AgreementsCreateOrUpdateOptionalParams,
  AgreementsListBySubscriptionOptionalParams,
  AgreementsGetOptionalParams,
} from "./api/agreements/index.js";
export type {
  CloudResourcesListByResourceGroupOptionalParams,
  CloudResourcesGetOptionalParams,
  CloudResourcesDeleteOptionalParams,
  CloudResourcesUpdateOptionalParams,
  CloudResourcesCreateOrUpdateOptionalParams,
} from "./api/cloudResources/index.js";
export type {
  CloudsListBySubscriptionOptionalParams,
  CloudsListByResourceGroupOptionalParams,
  CloudsDeleteOptionalParams,
  CloudsUpdateOptionalParams,
  CloudsCreateOrUpdateOptionalParams,
  CloudsGetOptionalParams,
} from "./api/clouds/index.js";
export type {
  ComputeConfigsListByResourceGroupOptionalParams,
  ComputeConfigsDeleteOptionalParams,
  ComputeConfigsUpdateOptionalParams,
  ComputeConfigsCreateOrUpdateOptionalParams,
  ComputeConfigsGetOptionalParams,
} from "./api/computeConfigs/index.js";
export type {
  ContainerImagesListByResourceGroupOptionalParams,
  ContainerImagesDeleteOptionalParams,
  ContainerImagesUpdateOptionalParams,
  ContainerImagesCreateOrUpdateOptionalParams,
  ContainerImagesGetOptionalParams,
} from "./api/containerImages/index.js";
export type {
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "./api/jobs/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { OperationStatusesGetOptionalParams } from "./api/operationStatuses/index.js";
export type {
  ProjectsListByResourceGroupOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./api/projects/index.js";
export type {
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./api/services/index.js";
export type {
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  AgreementsOperations,
  CloudResourcesOperations,
  CloudsOperations,
  ComputeConfigsOperations,
  ContainerImagesOperations,
  JobsOperations,
  OperationsOperations,
  OperationStatusesOperations,
  ProjectsOperations,
  ServicesOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
