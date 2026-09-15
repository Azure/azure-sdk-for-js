// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppClient } from "./appClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Agent,
  AgentProperties,
  AgentProvisioningState,
  AgentPowerState,
  KnowledgeGraphConfiguration,
  ActionConfiguration,
  AgentMode,
  AgentAccessLevel,
  LogConfiguration,
  ApplicationInsightsConfiguration,
  IncidentManagementConfiguration,
  UpgradeChannel,
  AgentIdentity,
  DefaultModel,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  AgentPatch,
  AgentPatchProperties,
  AgentIdentityPatch,
  AgentConnector,
  AgentConnectorProperties,
  ConnectorProvisioningState,
  ProxyResource,
  AgentConnectorCollection,
  AgentSpace,
  AgentSpaceProperties,
  AgentSpaceProvisioningState,
  AgentSpaceComplianceStatus,
  AgentSpacePolicies,
  GenevaActionsPolicy,
  GenevaActionAuthenticationMode,
  GenevaActionConfig,
  GenevaActionParameter,
  AgentSpacePatch,
  AgentSpacePatchProperties,
  AgentSpacePoliciesPatch,
  GenevaActionsPolicyPatch,
  AgentSpaceConnector,
  AgentSpaceConnectorProperties,
  AgentSpaceConnectorCollection,
  SupportedAgentModel,
  SupportedAgentModelProperties,
} from "./models/index.js";
export {
  KnownAgentProvisioningState,
  KnownAgentPowerState,
  KnownAgentMode,
  KnownAgentAccessLevel,
  KnownUpgradeChannel,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownConnectorProvisioningState,
  KnownAgentSpaceProvisioningState,
  KnownGenevaActionAuthenticationMode,
  KnownVersions,
} from "./models/index.js";
export type { AppClientOptionalParams } from "./api/index.js";
export type {
  AgentsStopOptionalParams,
  AgentsStartOptionalParams,
  AgentsListBySubscriptionOptionalParams,
  AgentsListByResourceGroupOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateOrUpdateOptionalParams,
  AgentsGetOptionalParams,
} from "./api/agents/index.js";
export type {
  AgentsConnectorsListWithSecretsByAgentOptionalParams,
  AgentsConnectorsListSecretsOptionalParams,
  AgentsConnectorsListByAgentOptionalParams,
  AgentsConnectorsDeleteOptionalParams,
  AgentsConnectorsCreateOrUpdateOptionalParams,
  AgentsConnectorsGetOptionalParams,
} from "./api/agentsConnectors/index.js";
export type {
  AgentSpacesListBySubscriptionOptionalParams,
  AgentSpacesListByResourceGroupOptionalParams,
  AgentSpacesDeleteOptionalParams,
  AgentSpacesUpdateOptionalParams,
  AgentSpacesCreateOrUpdateOptionalParams,
  AgentSpacesGetOptionalParams,
} from "./api/agentSpaces/index.js";
export type {
  AgentSpacesConnectorsListAllSecretsOptionalParams,
  AgentSpacesConnectorsListSecretsOptionalParams,
  AgentSpacesConnectorsListByAgentSpaceOptionalParams,
  AgentSpacesConnectorsDeleteOptionalParams,
  AgentSpacesConnectorsCreateOrUpdateOptionalParams,
  AgentSpacesConnectorsGetOptionalParams,
} from "./api/agentSpacesConnectors/index.js";
export type { SupportedAgentModelsListByLocationOptionalParams } from "./api/supportedAgentModels/index.js";
export type {
  AgentsOperations,
  AgentsConnectorsOperations,
  AgentSpacesOperations,
  AgentSpacesConnectorsOperations,
  SupportedAgentModelsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
