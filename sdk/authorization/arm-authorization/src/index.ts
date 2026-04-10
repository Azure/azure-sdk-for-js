// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AuthorizationManagementClient } from "./authorizationManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ExtensionResource,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
} from "./models/index.js";
export { KnownCreatedByType } from "./models/index.js";
export type {
  AttributeNamespace,
  AttributeNamespaceCreateRequest,
} from "./models/microsoft/accessReview/index.js";
export type {
  Operation,
  OperationDisplay,
  ErrorDefinition,
  ErrorDefinitionProperties,
  AccessReviewHistoryDefinition,
  AccessReviewHistoryDefinitionProperties,
  AccessReviewResult,
  AccessReviewHistoryDefinitionStatus,
  AccessReviewActorIdentity,
  AccessReviewActorIdentityType,
  AccessReviewScope,
  AccessReviewScopePrincipalType,
  AccessReviewScopeAssignmentState,
  AccessReviewHistoryScheduleSettings,
  AccessReviewRecurrencePattern,
  AccessReviewRecurrencePatternType,
  AccessReviewRecurrenceRange,
  AccessReviewRecurrenceRangeType,
  AccessReviewHistoryInstance,
  AccessReviewHistoryInstanceProperties,
  AccessReviewScheduleDefinition,
  AccessReviewScheduleDefinitionProperties,
  AccessReviewScheduleDefinitionStatus,
  AccessReviewScheduleSettings,
  DefaultDecisionType,
  AccessReviewRecurrenceSettings,
  AccessReviewReviewer,
  AccessReviewReviewerType,
  AccessReviewScheduleDefinitionReviewersType,
  AccessReviewInstance,
  AccessReviewInstanceProperties,
  AccessReviewInstanceStatus,
  AccessReviewInstanceReviewersType,
  AccessReviewDefaultSettings,
  AccessReviewDecision,
  AccessReviewDecisionProperties,
  AccessReviewDecisionIdentity,
  AccessReviewDecisionIdentityUnion,
  DecisionTargetType,
  AccessReviewDecisionUserIdentity,
  AccessReviewDecisionServicePrincipalIdentity,
  AccessReviewDecisionResource,
  DecisionResourceType,
  AccessRecommendationType,
  AccessReviewApplyResult,
  AccessReviewDecisionInsight,
  AccessReviewDecisionInsightProperties,
  AccessReviewDecisionInsightPropertiesUnion,
  AccessReviewDecisionInsightType,
  AccessReviewDecisionUserSignInInsightProperties,
  AccessReviewDecisionPrincipalResourceMembership,
  AccessReviewDecisionPrincipalResourceMembershipType,
  AccessReviewContactedReviewer,
  AccessReviewContactedReviewerProperties,
  RecordAllDecisionsProperties,
  RecordAllDecisionsResult,
} from "./models/microsoft/attributeNamespaces/index.js";
export {
  KnownAccessReviewResult,
  KnownAccessReviewHistoryDefinitionStatus,
  KnownAccessReviewActorIdentityType,
  KnownAccessReviewScopePrincipalType,
  KnownAccessReviewScopeAssignmentState,
  KnownAccessReviewRecurrencePatternType,
  KnownAccessReviewRecurrenceRangeType,
  KnownAccessReviewScheduleDefinitionStatus,
  KnownDefaultDecisionType,
  KnownAccessReviewReviewerType,
  KnownAccessReviewScheduleDefinitionReviewersType,
  KnownAccessReviewInstanceStatus,
  KnownAccessReviewInstanceReviewersType,
  KnownDecisionTargetType,
  KnownDecisionResourceType,
  KnownAccessRecommendationType,
  KnownAccessReviewApplyResult,
  KnownAccessReviewDecisionInsightType,
  KnownAccessReviewDecisionPrincipalResourceMembershipType,
  KnownRecordAllDecisionsResult,
} from "./models/microsoft/attributeNamespaces/index.js";
export type {
  RoleAssignmentSchedule,
  RoleAssignmentScheduleProperties,
  AssignmentType,
  MemberType,
  Status,
  ExpandedProperties,
  ExpandedPropertiesScope,
  ExpandedPropertiesRoleDefinition,
  ExpandedPropertiesPrincipal,
  RoleAssignmentScheduleInstance,
  RoleAssignmentScheduleInstanceProperties,
  RoleAssignmentScheduleRequest,
  RoleAssignmentScheduleRequestProperties,
  RequestType,
  RoleAssignmentScheduleRequestPropertiesScheduleInfo,
  RoleAssignmentScheduleRequestPropertiesScheduleInfoExpiration,
  Type,
  RoleAssignmentScheduleRequestPropertiesTicketInfo,
  RoleEligibilitySchedule,
  RoleEligibilityScheduleProperties,
  RoleEligibilityScheduleInstance,
  RoleEligibilityScheduleInstanceProperties,
  RoleEligibilityScheduleRequest,
  RoleEligibilityScheduleRequestProperties,
  RoleEligibilityScheduleRequestPropertiesScheduleInfo,
  RoleEligibilityScheduleRequestPropertiesScheduleInfoExpiration,
  RoleEligibilityScheduleRequestPropertiesTicketInfo,
  RoleManagementPolicy,
  RoleManagementPolicyProperties,
  RoleManagementPolicyRule,
  RoleManagementPolicyRuleUnion,
  RoleManagementPolicyRuleType,
  RoleManagementPolicyRuleTarget,
  RoleManagementPolicyApprovalRule,
  ApprovalSettings,
  ApprovalMode,
  ApprovalStage,
  UserSet,
  UserType,
  RoleManagementPolicyAuthenticationContextRule,
  RoleManagementPolicyEnablementRule,
  EnablementRules,
  RoleManagementPolicyExpirationRule,
  RoleManagementPolicyNotificationRule,
  NotificationDeliveryMechanism,
  NotificationLevel,
  RecipientType,
  RoleManagementPolicyPimOnlyModeRule,
  PIMOnlyModeSettings,
  PIMOnlyMode,
  UsersOrServicePrincipalSet,
  UsersOrServicePrincipalSetUserType,
  ExcludedPrincipalTypes,
  PolicyProperties,
  PolicyPropertiesScope,
  RoleManagementPolicyAssignment,
  RoleManagementPolicyAssignmentProperties,
  PolicyAssignmentProperties,
  PolicyAssignmentPropertiesScope,
  PolicyAssignmentPropertiesRoleDefinition,
  PolicyAssignmentPropertiesPolicy,
  EligibleChildResource,
} from "./models/microsoft/authorization/index.js";
export {
  KnownAssignmentType,
  KnownMemberType,
  KnownStatus,
  KnownRequestType,
  KnownType,
  KnownRoleManagementPolicyRuleType,
  KnownApprovalMode,
  KnownUserType,
  KnownEnablementRules,
  KnownNotificationDeliveryMechanism,
  KnownNotificationLevel,
  KnownRecipientType,
  KnownPIMOnlyMode,
  KnownUsersOrServicePrincipalSetUserType,
  KnownExcludedPrincipalTypes,
} from "./models/microsoft/authorization/index.js";
export type {
  ClassicAdministrator,
  ClassicAdministratorProperties,
} from "./models/microsoft/classicAdmin/index.js";
export type {
  CloudError,
  CloudErrorBody,
  PrincipalType,
  Principal,
} from "./models/microsoft/common/index.js";
export { KnownPrincipalType } from "./models/microsoft/common/index.js";
export type {
  DenyAssignment,
  DenyAssignmentProperties,
  DenyAssignmentPermission,
  DenyAssignmentPrincipal,
  DenyAssignmentPrincipalType,
  DenyAssignmentEffect,
} from "./models/microsoft/denyAssignment/index.js";
export { KnownDenyAssignmentEffect } from "./models/microsoft/denyAssignment/index.js";
export type {
  ProviderOperationsMetadata,
  ResourceType,
  ProviderOperation,
  SettableResource,
} from "./models/microsoft/providerOperations/index.js";
export type {
  RoleAssignment,
  RoleAssignmentProperties,
  RoleAssignmentCreateParameters,
} from "./models/microsoft/roleAssignment/index.js";
export type {
  RoleDefinition,
  RoleDefinitionProperties,
  Permission,
} from "./models/microsoft/roleDefinitions/index.js";
export type {
  Alert,
  AlertProperties,
  AlertDefinition,
  AlertDefinitionProperties,
  SeverityLevel,
  AlertIncident,
  AlertIncidentProperties,
  AlertIncidentPropertiesUnion,
  AzureRolesAssignedOutsidePimAlertIncidentProperties,
  DuplicateRoleCreatedAlertIncidentProperties,
  TooManyOwnersAssignedToResourceAlertIncidentProperties,
  TooManyPermanentOwnersAssignedToResourceAlertIncidentProperties,
  AlertConfiguration,
  AlertConfigurationProperties,
  AlertConfigurationPropertiesUnion,
  AzureRolesAssignedOutsidePimAlertConfigurationProperties,
  DuplicateRoleCreatedAlertConfigurationProperties,
  TooManyOwnersAssignedToResourceAlertConfigurationProperties,
  TooManyPermanentOwnersAssignedToResourceAlertConfigurationProperties,
  AlertOperationResult,
} from "./models/microsoft/roleManagementAlerts/index.js";
export { KnownSeverityLevel } from "./models/microsoft/roleManagementAlerts/index.js";
export type { AuthorizationManagementClientOptionalParams } from "./api/index.js";
export type {
  AccessReviewDefaultSettingsPutOptionalParams,
  AccessReviewDefaultSettingsGetOptionalParams,
} from "./api/accessReviewDefaultSettings/index.js";
export type {
  AccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  AccessReviewHistoryDefinitionCreateOptionalParams,
} from "./api/accessReviewHistoryDefinition/index.js";
export type { AccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams } from "./api/accessReviewHistoryDefinitionInstance/index.js";
export type { AccessReviewHistoryDefinitionInstancesListOptionalParams } from "./api/accessReviewHistoryDefinitionInstances/index.js";
export type {
  AccessReviewHistoryDefinitionsListOptionalParams,
  AccessReviewHistoryDefinitionsGetByIdOptionalParams,
} from "./api/accessReviewHistoryDefinitions/index.js";
export type {
  AccessReviewInstanceAcceptRecommendationsOptionalParams,
  AccessReviewInstanceSendRemindersOptionalParams,
  AccessReviewInstanceApplyDecisionsOptionalParams,
  AccessReviewInstanceResetDecisionsOptionalParams,
  AccessReviewInstanceStopOptionalParams,
} from "./api/accessReviewInstance/index.js";
export type { AccessReviewInstanceContactedReviewersListOptionalParams } from "./api/accessReviewInstanceContactedReviewers/index.js";
export type { AccessReviewInstanceDecisionsListOptionalParams } from "./api/accessReviewInstanceDecisions/index.js";
export type {
  AccessReviewInstanceMyDecisionsListOptionalParams,
  AccessReviewInstanceMyDecisionsPatchOptionalParams,
  AccessReviewInstanceMyDecisionsGetByIdOptionalParams,
} from "./api/accessReviewInstanceMyDecisions/index.js";
export type {
  AccessReviewInstancesListOptionalParams,
  AccessReviewInstancesCreateOptionalParams,
  AccessReviewInstancesGetByIdOptionalParams,
} from "./api/accessReviewInstances/index.js";
export type {
  AccessReviewInstancesAssignedForMyApprovalListOptionalParams,
  AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams,
} from "./api/accessReviewInstancesAssignedForMyApproval/index.js";
export type {
  AccessReviewScheduleDefinitionsStopOptionalParams,
  AccessReviewScheduleDefinitionsListOptionalParams,
  AccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  AccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "./api/accessReviewScheduleDefinitions/index.js";
export type { AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams } from "./api/accessReviewScheduleDefinitionsAssignedForMyApproval/index.js";
export type {
  AlertConfigurationsListForScopeOptionalParams,
  AlertConfigurationsUpdateOptionalParams,
  AlertConfigurationsGetOptionalParams,
} from "./api/alertConfigurations/index.js";
export type {
  AlertDefinitionsListForScopeOptionalParams,
  AlertDefinitionsGetOptionalParams,
} from "./api/alertDefinitions/index.js";
export type {
  AlertIncidentsRemediateOptionalParams,
  AlertIncidentsListForScopeOptionalParams,
  AlertIncidentsGetOptionalParams,
} from "./api/alertIncidents/index.js";
export type { AlertOperationGetOptionalParams } from "./api/alertOperation/index.js";
export type {
  AlertsRefreshAllOptionalParams,
  AlertsRefreshOptionalParams,
  AlertsListForScopeOptionalParams,
  AlertsUpdateOptionalParams,
  AlertsGetOptionalParams,
} from "./api/alerts/index.js";
export type {
  AttributeNamespacesCreateOptionalParams,
  AttributeNamespacesDeleteOptionalParams,
  AttributeNamespacesGetOptionalParams,
} from "./api/attributeNamespaces/index.js";
export type { ClassicAdministratorsListOptionalParams } from "./api/classicAdministrators/index.js";
export type {
  DenyAssignmentsGetByIdOptionalParams,
  DenyAssignmentsListForResourceGroupOptionalParams,
  DenyAssignmentsListOptionalParams,
  DenyAssignmentsListForScopeOptionalParams,
  DenyAssignmentsListForResourceOptionalParams,
  DenyAssignmentsDeleteOptionalParams,
  DenyAssignmentsCreateOrUpdateOptionalParams,
  DenyAssignmentsGetOptionalParams,
} from "./api/denyAssignments/index.js";
export type { EligibleChildResourcesListOptionalParams } from "./api/eligibleChildResources/index.js";
export type { GlobalAdministratorElevateAccessOptionalParams } from "./api/globalAdministrator/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PermissionsListForResourceOptionalParams,
  PermissionsListForResourceGroupOptionalParams,
} from "./api/permissions/index.js";
export type {
  ProviderOperationsMetadataListOptionalParams,
  ProviderOperationsMetadataGetOptionalParams,
} from "./api/providerOperationsMetadata/index.js";
export type {
  RoleAssignmentsDeleteByIdOptionalParams,
  RoleAssignmentsCreateByIdOptionalParams,
  RoleAssignmentsGetByIdOptionalParams,
  RoleAssignmentsListForResourceOptionalParams,
  RoleAssignmentsListForResourceGroupOptionalParams,
  RoleAssignmentsListForSubscriptionOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
} from "./api/roleAssignments/index.js";
export type {
  RoleAssignmentScheduleInstancesListForScopeOptionalParams,
  RoleAssignmentScheduleInstancesGetOptionalParams,
} from "./api/roleAssignmentScheduleInstances/index.js";
export type {
  RoleAssignmentScheduleRequestsValidateOptionalParams,
  RoleAssignmentScheduleRequestsCancelOptionalParams,
  RoleAssignmentScheduleRequestsListForScopeOptionalParams,
  RoleAssignmentScheduleRequestsCreateOptionalParams,
  RoleAssignmentScheduleRequestsGetOptionalParams,
} from "./api/roleAssignmentScheduleRequests/index.js";
export type {
  RoleAssignmentSchedulesListForScopeOptionalParams,
  RoleAssignmentSchedulesGetOptionalParams,
} from "./api/roleAssignmentSchedules/index.js";
export type {
  RoleDefinitionsGetByIdOptionalParams,
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
} from "./api/roleDefinitions/index.js";
export type {
  RoleEligibilityScheduleInstancesListForScopeOptionalParams,
  RoleEligibilityScheduleInstancesGetOptionalParams,
} from "./api/roleEligibilityScheduleInstances/index.js";
export type {
  RoleEligibilityScheduleRequestsValidateOptionalParams,
  RoleEligibilityScheduleRequestsCancelOptionalParams,
  RoleEligibilityScheduleRequestsListForScopeOptionalParams,
  RoleEligibilityScheduleRequestsCreateOptionalParams,
  RoleEligibilityScheduleRequestsGetOptionalParams,
} from "./api/roleEligibilityScheduleRequests/index.js";
export type {
  RoleEligibilitySchedulesListForScopeOptionalParams,
  RoleEligibilitySchedulesGetOptionalParams,
} from "./api/roleEligibilitySchedules/index.js";
export type {
  RoleManagementPoliciesListForScopeOptionalParams,
  RoleManagementPoliciesDeleteOptionalParams,
  RoleManagementPoliciesUpdateOptionalParams,
  RoleManagementPoliciesGetOptionalParams,
} from "./api/roleManagementPolicies/index.js";
export type {
  RoleManagementPolicyAssignmentsListForScopeOptionalParams,
  RoleManagementPolicyAssignmentsDeleteOptionalParams,
  RoleManagementPolicyAssignmentsCreateOptionalParams,
  RoleManagementPolicyAssignmentsGetOptionalParams,
} from "./api/roleManagementPolicyAssignments/index.js";
export type {
  ScopeAccessReviewDefaultSettingsPutOptionalParams,
  ScopeAccessReviewDefaultSettingsGetOptionalParams,
} from "./api/scopeAccessReviewDefaultSettings/index.js";
export type {
  ScopeAccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  ScopeAccessReviewHistoryDefinitionCreateOptionalParams,
} from "./api/scopeAccessReviewHistoryDefinition/index.js";
export type { ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams } from "./api/scopeAccessReviewHistoryDefinitionInstance/index.js";
export type { ScopeAccessReviewHistoryDefinitionInstancesListOptionalParams } from "./api/scopeAccessReviewHistoryDefinitionInstances/index.js";
export type {
  ScopeAccessReviewHistoryDefinitionsListOptionalParams,
  ScopeAccessReviewHistoryDefinitionsGetByIdOptionalParams,
} from "./api/scopeAccessReviewHistoryDefinitions/index.js";
export type {
  ScopeAccessReviewInstanceSendRemindersOptionalParams,
  ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
  ScopeAccessReviewInstanceResetDecisionsOptionalParams,
  ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
  ScopeAccessReviewInstanceStopOptionalParams,
} from "./api/scopeAccessReviewInstance/index.js";
export type { ScopeAccessReviewInstanceContactedReviewersListOptionalParams } from "./api/scopeAccessReviewInstanceContactedReviewers/index.js";
export type { ScopeAccessReviewInstanceDecisionsListOptionalParams } from "./api/scopeAccessReviewInstanceDecisions/index.js";
export type {
  ScopeAccessReviewInstancesListOptionalParams,
  ScopeAccessReviewInstancesCreateOptionalParams,
  ScopeAccessReviewInstancesGetByIdOptionalParams,
} from "./api/scopeAccessReviewInstances/index.js";
export type {
  ScopeAccessReviewScheduleDefinitionsStopOptionalParams,
  ScopeAccessReviewScheduleDefinitionsListOptionalParams,
  ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "./api/scopeAccessReviewScheduleDefinitions/index.js";
export type { TenantLevelAccessReviewInstanceContactedReviewersListOptionalParams } from "./api/tenantLevelAccessReviewInstanceContactedReviewers/index.js";
export type {
  AccessReviewDefaultSettingsOperations,
  AccessReviewHistoryDefinitionOperations,
  AccessReviewHistoryDefinitionInstanceOperations,
  AccessReviewHistoryDefinitionInstancesOperations,
  AccessReviewHistoryDefinitionsOperations,
  AccessReviewInstanceOperations,
  AccessReviewInstanceContactedReviewersOperations,
  AccessReviewInstanceDecisionsOperations,
  AccessReviewInstanceMyDecisionsOperations,
  AccessReviewInstancesOperations,
  AccessReviewInstancesAssignedForMyApprovalOperations,
  AccessReviewScheduleDefinitionsOperations,
  AccessReviewScheduleDefinitionsAssignedForMyApprovalOperations,
  AlertConfigurationsOperations,
  AlertDefinitionsOperations,
  AlertIncidentsOperations,
  AlertOperationOperations,
  AlertsOperations,
  AttributeNamespacesOperations,
  ClassicAdministratorsOperations,
  DenyAssignmentsOperations,
  EligibleChildResourcesOperations,
  GlobalAdministratorOperations,
  OperationsOperations,
  PermissionsOperations,
  ProviderOperationsMetadataOperations,
  RoleAssignmentsOperations,
  RoleAssignmentScheduleInstancesOperations,
  RoleAssignmentScheduleRequestsOperations,
  RoleAssignmentSchedulesOperations,
  RoleDefinitionsOperations,
  RoleEligibilityScheduleInstancesOperations,
  RoleEligibilityScheduleRequestsOperations,
  RoleEligibilitySchedulesOperations,
  RoleManagementPoliciesOperations,
  RoleManagementPolicyAssignmentsOperations,
  ScopeAccessReviewDefaultSettingsOperations,
  ScopeAccessReviewHistoryDefinitionOperations,
  ScopeAccessReviewHistoryDefinitionInstanceOperations,
  ScopeAccessReviewHistoryDefinitionInstancesOperations,
  ScopeAccessReviewHistoryDefinitionsOperations,
  ScopeAccessReviewInstanceOperations,
  ScopeAccessReviewInstanceContactedReviewersOperations,
  ScopeAccessReviewInstanceDecisionsOperations,
  ScopeAccessReviewInstancesOperations,
  ScopeAccessReviewScheduleDefinitionsOperations,
  TenantLevelAccessReviewInstanceContactedReviewersOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
