// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContainerServiceClient } from "./containerServiceClient.js";
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
  type DeploymentSafeguard,
  type DeploymentSafeguardsProperties,
  KnownProvisioningState,
  type ProvisioningState,
  KnownDeploymentSafeguardsLevel,
  type DeploymentSafeguardsLevel,
  KnownPodSecurityStandardsLevel,
  type PodSecurityStandardsLevel,
  type ExtensionResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type DeploymentSafeguardCreateOrUpdate,
  type DeploymentSafeguardsPropertiesCreateOrUpdate,
  KnownVersions,
} from "./models/index.js";
export type { ContainerServiceClientOptionalParams } from "./api/index.js";
export type {
  DeploymentSafeguardsListOptionalParams,
  DeploymentSafeguardsDeleteOptionalParams,
  DeploymentSafeguardsCreateOptionalParams,
  DeploymentSafeguardsGetOptionalParams,
} from "./api/deploymentSafeguards/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { DeploymentSafeguardsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
