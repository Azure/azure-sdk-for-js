// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PolicyClient } from "./policyClient.js";
export type {
  PolicyAssignment,
  PolicyAssignmentProperties,
  ParameterValuesValue,
  EnforcementMode,
  NonComplianceMessage,
  ResourceSelector,
  Selector,
  SelectorKind,
  Override,
  OverrideKind,
  AssignmentType,
  Identity,
  ResourceIdentityType,
  UserAssignedIdentitiesValue,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PolicyAssignmentUpdate,
  PolicyAssignmentUpdateProperties,
  PolicyDefinition,
  PolicyDefinitionProperties,
  PolicyType,
  ParameterDefinitionsValue,
  ParameterType,
  ParameterDefinitionsValueMetadata,
  ExternalEvaluationEnforcementSettings,
  ExternalEvaluationEndpointSettings,
  ProxyResource,
  PolicyDefinitionVersion,
  PolicyDefinitionVersionProperties,
  PolicyDefinitionVersionListResult,
  PolicySetDefinition,
  PolicySetDefinitionProperties,
  PolicyDefinitionReference,
  PolicyDefinitionGroup,
  PolicySetDefinitionVersion,
  PolicySetDefinitionVersionProperties,
  PolicySetDefinitionVersionListResult,
  PolicyTokenRequest,
  PolicyTokenOperation,
  PolicyTokenResponse,
  PolicyTokenResult,
  ExternalEvaluationEndpointInvocationResult,
  PolicyLogInfo,
  ExternalEndpointResult,
} from "./models/index.js";
export {
  KnownEnforcementMode,
  KnownSelectorKind,
  KnownOverrideKind,
  KnownAssignmentType,
  KnownCreatedByType,
  KnownPolicyType,
  KnownParameterType,
  KnownPolicyTokenResult,
  KnownExternalEndpointResult,
  KnownVersions,
} from "./models/index.js";
export type { PolicyClientOptionalParams } from "./api/index.js";
export type {
  PolicyAssignmentsListForResourceOptionalParams,
  PolicyAssignmentsListOptionalParams,
  PolicyAssignmentsListForManagementGroupOptionalParams,
  PolicyAssignmentsListForResourceGroupOptionalParams,
  PolicyAssignmentsDeleteOptionalParams,
  PolicyAssignmentsUpdateOptionalParams,
  PolicyAssignmentsCreateOptionalParams,
  PolicyAssignmentsGetOptionalParams,
} from "./api/policyAssignments/index.js";
export type {
  PolicyDefinitionsListByManagementGroupOptionalParams,
  PolicyDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionsListBuiltInOptionalParams,
  PolicyDefinitionsGetBuiltInOptionalParams,
  PolicyDefinitionsListOptionalParams,
  PolicyDefinitionsDeleteOptionalParams,
  PolicyDefinitionsCreateOrUpdateOptionalParams,
  PolicyDefinitionsGetOptionalParams,
} from "./api/policyDefinitions/index.js";
export type {
  PolicyDefinitionVersionsListAllOptionalParams,
  PolicyDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicyDefinitionVersionsListByManagementGroupOptionalParams,
  PolicyDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicyDefinitionVersionsListBuiltInOptionalParams,
  PolicyDefinitionVersionsGetBuiltInOptionalParams,
  PolicyDefinitionVersionsListOptionalParams,
  PolicyDefinitionVersionsDeleteOptionalParams,
  PolicyDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicyDefinitionVersionsGetOptionalParams,
} from "./api/policyDefinitionVersions/index.js";
export type {
  PolicySetDefinitionsListByManagementGroupOptionalParams,
  PolicySetDefinitionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionsListBuiltInOptionalParams,
  PolicySetDefinitionsGetBuiltInOptionalParams,
  PolicySetDefinitionsListOptionalParams,
  PolicySetDefinitionsDeleteOptionalParams,
  PolicySetDefinitionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionsGetOptionalParams,
} from "./api/policySetDefinitions/index.js";
export type {
  PolicySetDefinitionVersionsListAllOptionalParams,
  PolicySetDefinitionVersionsListAllAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListAllBuiltinsOptionalParams,
  PolicySetDefinitionVersionsListByManagementGroupOptionalParams,
  PolicySetDefinitionVersionsDeleteAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsGetAtManagementGroupOptionalParams,
  PolicySetDefinitionVersionsListBuiltInOptionalParams,
  PolicySetDefinitionVersionsGetBuiltInOptionalParams,
  PolicySetDefinitionVersionsListOptionalParams,
  PolicySetDefinitionVersionsDeleteOptionalParams,
  PolicySetDefinitionVersionsCreateOrUpdateOptionalParams,
  PolicySetDefinitionVersionsGetOptionalParams,
} from "./api/policySetDefinitionVersions/index.js";
export type {
  PolicyTokensAcquireAtManagementGroupOptionalParams,
  PolicyTokensAcquireOptionalParams,
} from "./api/policyTokens/index.js";
export type {
  PolicyAssignmentsOperations,
  PolicyDefinitionsOperations,
  PolicyDefinitionVersionsOperations,
  PolicySetDefinitionsOperations,
  PolicySetDefinitionVersionsOperations,
  PolicyTokensOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
