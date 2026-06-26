// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConnectedKubernetesClient } from "./connectedKubernetesClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
  ConnectedCluster,
  ConnectedClusterProperties,
  ProvisioningState,
  ConnectivityStatus,
  PrivateLinkState,
  AzureHybridBenefit,
  AadProfile,
  ArcAgentProfile,
  AutoUpgradeOptions,
  SystemComponent,
  AgentError,
  SecurityProfile,
  SecurityProfileWorkloadIdentity,
  OidcIssuerProfile,
  Gateway,
  ArcAgentryConfigurations,
  ConnectedClusterIdentity,
  ResourceIdentityType,
  ConnectedClusterKind,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ConnectedClusterPatch,
  ConnectedClusterPatchProperties,
  ListClusterUserCredentialProperties,
  AuthenticationMethod,
  CredentialResults,
  HybridConnectionConfig,
  CredentialResult,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownConnectivityStatus,
  KnownPrivateLinkState,
  KnownAzureHybridBenefit,
  KnownAutoUpgradeOptions,
  KnownConnectedClusterKind,
  KnownCreatedByType,
  KnownAuthenticationMethod,
  KnownVersions,
} from "./models/index.js";
export type { ConnectedKubernetesClientOptionalParams } from "./api/index.js";
export type {
  ConnectedClusterOperationsListClusterUserCredentialOptionalParams,
  ConnectedClusterOperationsListBySubscriptionOptionalParams,
  ConnectedClusterOperationsListByResourceGroupOptionalParams,
  ConnectedClusterOperationsDeleteOptionalParams,
  ConnectedClusterOperationsUpdateAsyncOptionalParams,
  ConnectedClusterOperationsCreateOrReplaceOptionalParams,
  ConnectedClusterOperationsGetOptionalParams,
} from "./api/connectedClusterOperations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ConnectedClusterOperationsOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
