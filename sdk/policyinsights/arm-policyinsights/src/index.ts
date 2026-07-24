// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PolicyInsightsClient } from "./policyInsightsClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type { ProxyResource, Resource, SystemData, CreatedByType } from "./models/index.js";
export { KnownCreatedByType } from "./models/index.js";
export type {
  OperationsListResults,
  Operation,
  OperationDisplay,
  Remediation,
  RemediationProperties,
  ResourceDiscoveryMode,
  RemediationFilters,
  RemediationDeploymentSummary,
  RemediationPropertiesFailureThreshold,
  ErrorResponse,
  ErrorDefinition,
  TypedErrorInfo,
  RemediationDeployment,
  Attestation,
  AttestationProperties,
  ComplianceState,
  AttestationEvidence,
  PolicyMetadata,
  PolicyMetadataProperties,
  PolicyMetadataSlimProperties,
  SlimPolicyMetadata,
  PolicyEvent,
  ComponentEventDetails,
  PolicyState,
  PolicyEvaluationDetails,
  ExpressionEvaluationDetails,
  IfNotExistsEvaluationDetails,
  ComponentStateDetails,
  SummarizeResults,
  Summary,
  SummaryResults,
  ComplianceDetail,
  PolicyAssignmentSummary,
  PolicyDefinitionSummary,
  PolicyGroupSummary,
  CheckRestrictionsRequest,
  CheckRestrictionsResourceDetails,
  PendingField,
  CheckRestrictionsResult,
  FieldRestrictions,
  FieldRestriction,
  FieldRestrictionResult,
  PolicyReference,
  CheckRestrictionsResultContentEvaluationResult,
  PolicyEvaluationResult,
  CheckRestrictionEvaluationDetails,
  PolicyEffectDetails,
  CheckManagementGroupRestrictionsRequest,
  ComponentPolicyStatesQueryResults,
  ComponentPolicyState,
  ComponentPolicyEvaluationDetails,
  ComponentExpressionEvaluationDetails,
  PolicyEventsResourceType,
  PolicyStatesResource,
  PolicyStatesSummaryResourceType,
  ComponentPolicyStatesResource,
} from "./models/policyInsightsApi/index.js";
export {
  KnownResourceDiscoveryMode,
  KnownComplianceState,
  KnownFieldRestrictionResult,
  KnownPolicyEventsResourceType,
  KnownPolicyStatesResource,
  KnownPolicyStatesSummaryResourceType,
  KnownComponentPolicyStatesResource,
} from "./models/policyInsightsApi/index.js";
export type { QueryFailure, QueryFailureError } from "./models/policyInsightsCommon/index.js";
export type {
  RemediationsListForManagementGroupQueryOptions,
  RemediationsListForSubscriptionQueryOptions,
  RemediationsListDeploymentsAtSubscriptionQueryOptions,
  RemediationsListForResourceGroupQueryOptions,
  RemediationsListDeploymentsAtResourceGroupQueryOptions,
  RemediationsListForResourceQueryOptions,
  RemediationsListDeploymentsAtResourceQueryOptions,
  RemediationsListDeploymentsAtManagementGroupQueryOptions,
  AttestationsListForSubscriptionQueryOptions,
  AttestationsListForResourceGroupQueryOptions,
  AttestationsListForResourceQueryOptions,
  PolicyMetadataListQueryOptions,
  PolicyEventsListQueryResultsForManagementGroupQueryOptions,
  PolicyEventsListQueryResultsForSubscriptionQueryOptions,
  PolicyEventsListQueryResultsForResourceGroupQueryOptions,
  PolicyEventsListQueryResultsForResourceQueryOptions,
  PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions,
  PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions,
  PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
  PolicyStatesListQueryResultsForManagementGroupQueryOptions,
  PolicyStatesSummarizeForManagementGroupQueryOptions,
  PolicyStatesListQueryResultsForSubscriptionQueryOptions,
  PolicyStatesSummarizeForSubscriptionQueryOptions,
  PolicyStatesListQueryResultsForResourceGroupQueryOptions,
  PolicyStatesSummarizeForResourceGroupQueryOptions,
  PolicyStatesListQueryResultsForResourceQueryOptions,
  PolicyStatesSummarizeForResourceQueryOptions,
  PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions,
  PolicyStatesSummarizeForPolicySetDefinitionQueryOptions,
  PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions,
  PolicyStatesSummarizeForPolicyDefinitionQueryOptions,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions,
  PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions,
  PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions,
  PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions,
  PolicyTrackedResourcesListQueryResultsForResourceQueryOptions,
} from "./models/policyInsightsManagementClient/index.js";
export type {
  PolicyTrackedResource,
  PolicyDetails,
  TrackedResourceModificationDetails,
  PolicyTrackedResourcesResourceType,
} from "./models/policyTrackedResourcesApi/index.js";
export { KnownPolicyTrackedResourcesResourceType } from "./models/policyTrackedResourcesApi/index.js";
export type { PolicyInsightsClientOptionalParams } from "./api/index.js";
export type {
  AttestationsListForResourceOptionalParams,
  AttestationsDeleteAtResourceOptionalParams,
  AttestationsCreateOrUpdateAtResourceOptionalParams,
  AttestationsGetAtResourceOptionalParams,
  AttestationsListForResourceGroupOptionalParams,
  AttestationsDeleteAtResourceGroupOptionalParams,
  AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  AttestationsGetAtResourceGroupOptionalParams,
  AttestationsListForSubscriptionOptionalParams,
  AttestationsDeleteAtSubscriptionOptionalParams,
  AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  AttestationsGetAtSubscriptionOptionalParams,
} from "./api/attestations/index.js";
export type {
  ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
} from "./api/componentPolicyStates/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyEventsListQueryResultsForResourceOptionalParams,
  PolicyEventsListQueryResultsForResourceGroupOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionOptionalParams,
  PolicyEventsListQueryResultsForManagementGroupOptionalParams,
} from "./api/policyEvents/index.js";
export type {
  PolicyMetadataOperationsListOptionalParams,
  PolicyMetadataOperationsGetResourceOptionalParams,
} from "./api/policyMetadataOperations/index.js";
export type {
  PolicyRestrictionsCheckAtManagementGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtResourceGroupScopeOptionalParams,
  PolicyRestrictionsCheckAtSubscriptionScopeOptionalParams,
} from "./api/policyRestrictions/index.js";
export type {
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  PolicyStatesSummarizeForResourceOptionalParams,
  PolicyStatesListQueryResultsForResourceOptionalParams,
  PolicyStatesSummarizeForResourceGroupOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  PolicyStatesSummarizeForSubscriptionOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  PolicyStatesSummarizeForManagementGroupOptionalParams,
  PolicyStatesListQueryResultsForManagementGroupOptionalParams,
} from "./api/policyStates/index.js";
export type {
  PolicyTrackedResourcesListQueryResultsForResourceOptionalParams,
  PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams,
  PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams,
  PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams,
} from "./api/policyTrackedResources/index.js";
export type {
  RemediationsCancelAtManagementGroupOptionalParams,
  RemediationsListDeploymentsAtManagementGroupOptionalParams,
  RemediationsCancelAtResourceOptionalParams,
  RemediationsListDeploymentsAtResourceOptionalParams,
  RemediationsListForResourceOptionalParams,
  RemediationsDeleteAtResourceOptionalParams,
  RemediationsCreateOrUpdateAtResourceOptionalParams,
  RemediationsGetAtResourceOptionalParams,
  RemediationsCancelAtResourceGroupOptionalParams,
  RemediationsListDeploymentsAtResourceGroupOptionalParams,
  RemediationsListForResourceGroupOptionalParams,
  RemediationsDeleteAtResourceGroupOptionalParams,
  RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  RemediationsGetAtResourceGroupOptionalParams,
  RemediationsCancelAtSubscriptionOptionalParams,
  RemediationsListDeploymentsAtSubscriptionOptionalParams,
  RemediationsListForSubscriptionOptionalParams,
  RemediationsDeleteAtSubscriptionOptionalParams,
  RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  RemediationsGetAtSubscriptionOptionalParams,
  RemediationsListForManagementGroupOptionalParams,
  RemediationsDeleteAtManagementGroupOptionalParams,
  RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  RemediationsGetAtManagementGroupOptionalParams,
} from "./api/remediations/index.js";
export type {
  AttestationsOperations,
  ComponentPolicyStatesOperations,
  OperationsOperations,
  PolicyEventsOperations,
  PolicyMetadataOperationsOperations,
  PolicyRestrictionsOperations,
  PolicyStatesOperations,
  PolicyTrackedResourcesOperations,
  RemediationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
