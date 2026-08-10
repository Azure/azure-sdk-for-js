// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContainerServiceClient } from "./containerServiceClient.js";
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
  AIManager,
  AIManagerProperties,
  AIManagerProvisioningState,
  DeletePolicy,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourceProvisioningState,
  AIManagerPatch,
  CredentialResults,
  CredentialResult,
  AIManagerNamespace,
  AIManagerNamespaceProperties,
  AIManagerNamespaceProvisioningState,
  ProxyResource,
  NamespaceAccessInfo,
  AIModel,
  AIModelProperties,
  ModelSpec,
  CalculateCostRequest,
  CalculateCostResponse,
  CalculateCostPlan,
  ServingPerformanceEstimation,
  InfeasibilityReason,
  InfeasibleCode,
  ModelSource,
  ModelSourceProperties,
  ModelSourceType,
  CredentialValue,
  InlineCredential,
  ModelDeployment,
  ModelDeploymentProperties,
  ModelDeploymentProvisioningState,
  ModelDeploymentPerformanceMode,
  ScalingProfile,
  ManualScalingProfile,
  AutoscaleProfile,
  ModelDeploymentOverrides,
  ModelDeploymentStatus,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAIManagerProvisioningState,
  KnownDeletePolicy,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownResourceProvisioningState,
  KnownAIManagerNamespaceProvisioningState,
  KnownInfeasibleCode,
  KnownModelSourceType,
  KnownModelDeploymentProvisioningState,
  KnownModelDeploymentPerformanceMode,
  KnownVersions,
} from "./models/index.js";
export type { ContainerServiceClientOptionalParams } from "./api/index.js";
export type {
  AIManagerNamespacesRotateKeysOptionalParams,
  AIManagerNamespacesListAccessKeysOptionalParams,
  AIManagerNamespacesListCredentialOptionalParams,
  AIManagerNamespacesListByAIManagerOptionalParams,
  AIManagerNamespacesDeleteOptionalParams,
  AIManagerNamespacesCreateOrUpdateOptionalParams,
  AIManagerNamespacesGetOptionalParams,
} from "./api/aiManagerNamespaces/index.js";
export type {
  AIManagersListCredentialOptionalParams,
  AIManagersListBySubscriptionOptionalParams,
  AIManagersListByResourceGroupOptionalParams,
  AIManagersDeleteOptionalParams,
  AIManagersUpdateOptionalParams,
  AIManagersCreateOrUpdateOptionalParams,
  AIManagersGetOptionalParams,
} from "./api/aiManagers/index.js";
export type {
  AIModelsCalculateCostOptionalParams,
  AIModelsListOptionalParams,
  AIModelsGetOptionalParams,
} from "./api/aiModels/index.js";
export type {
  ModelDeploymentsListByAIManagerNamespaceOptionalParams,
  ModelDeploymentsDeleteOptionalParams,
  ModelDeploymentsCreateOrUpdateOptionalParams,
  ModelDeploymentsGetOptionalParams,
} from "./api/modelDeployments/index.js";
export type {
  ModelSourcesListOptionalParams,
  ModelSourcesDeleteOptionalParams,
  ModelSourcesCreateOrUpdateOptionalParams,
  ModelSourcesGetOptionalParams,
} from "./api/modelSources/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  AIManagerNamespacesOperations,
  AIManagersOperations,
  AIModelsOperations,
  ModelDeploymentsOperations,
  ModelSourcesOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
