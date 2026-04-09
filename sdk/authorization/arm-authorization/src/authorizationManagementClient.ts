// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AuthorizationManagementContext,
  AuthorizationManagementClientOptionalParams,
} from "./api/index.js";
import { createAuthorizationManagement } from "./api/index.js";
import type { AccessReviewDefaultSettingsOperations } from "./classic/accessReviewDefaultSettings/index.js";
import { _getAccessReviewDefaultSettingsOperations } from "./classic/accessReviewDefaultSettings/index.js";
import type { AccessReviewHistoryDefinitionOperations } from "./classic/accessReviewHistoryDefinition/index.js";
import { _getAccessReviewHistoryDefinitionOperations } from "./classic/accessReviewHistoryDefinition/index.js";
import type { AccessReviewHistoryDefinitionInstanceOperations } from "./classic/accessReviewHistoryDefinitionInstance/index.js";
import { _getAccessReviewHistoryDefinitionInstanceOperations } from "./classic/accessReviewHistoryDefinitionInstance/index.js";
import type { AccessReviewHistoryDefinitionInstancesOperations } from "./classic/accessReviewHistoryDefinitionInstances/index.js";
import { _getAccessReviewHistoryDefinitionInstancesOperations } from "./classic/accessReviewHistoryDefinitionInstances/index.js";
import type { AccessReviewHistoryDefinitionsOperations } from "./classic/accessReviewHistoryDefinitions/index.js";
import { _getAccessReviewHistoryDefinitionsOperations } from "./classic/accessReviewHistoryDefinitions/index.js";
import type { AccessReviewInstanceOperations } from "./classic/accessReviewInstance/index.js";
import { _getAccessReviewInstanceOperations } from "./classic/accessReviewInstance/index.js";
import type { AccessReviewInstanceContactedReviewersOperations } from "./classic/accessReviewInstanceContactedReviewers/index.js";
import { _getAccessReviewInstanceContactedReviewersOperations } from "./classic/accessReviewInstanceContactedReviewers/index.js";
import type { AccessReviewInstanceDecisionsOperations } from "./classic/accessReviewInstanceDecisions/index.js";
import { _getAccessReviewInstanceDecisionsOperations } from "./classic/accessReviewInstanceDecisions/index.js";
import type { AccessReviewInstanceMyDecisionsOperations } from "./classic/accessReviewInstanceMyDecisions/index.js";
import { _getAccessReviewInstanceMyDecisionsOperations } from "./classic/accessReviewInstanceMyDecisions/index.js";
import type { AccessReviewInstancesOperations } from "./classic/accessReviewInstances/index.js";
import { _getAccessReviewInstancesOperations } from "./classic/accessReviewInstances/index.js";
import type { AccessReviewInstancesAssignedForMyApprovalOperations } from "./classic/accessReviewInstancesAssignedForMyApproval/index.js";
import { _getAccessReviewInstancesAssignedForMyApprovalOperations } from "./classic/accessReviewInstancesAssignedForMyApproval/index.js";
import type { AccessReviewScheduleDefinitionsOperations } from "./classic/accessReviewScheduleDefinitions/index.js";
import { _getAccessReviewScheduleDefinitionsOperations } from "./classic/accessReviewScheduleDefinitions/index.js";
import type { AccessReviewScheduleDefinitionsAssignedForMyApprovalOperations } from "./classic/accessReviewScheduleDefinitionsAssignedForMyApproval/index.js";
import { _getAccessReviewScheduleDefinitionsAssignedForMyApprovalOperations } from "./classic/accessReviewScheduleDefinitionsAssignedForMyApproval/index.js";
import type { AlertConfigurationsOperations } from "./classic/alertConfigurations/index.js";
import { _getAlertConfigurationsOperations } from "./classic/alertConfigurations/index.js";
import type { AlertDefinitionsOperations } from "./classic/alertDefinitions/index.js";
import { _getAlertDefinitionsOperations } from "./classic/alertDefinitions/index.js";
import type { AlertIncidentsOperations } from "./classic/alertIncidents/index.js";
import { _getAlertIncidentsOperations } from "./classic/alertIncidents/index.js";
import type { AlertOperationOperations } from "./classic/alertOperation/index.js";
import { _getAlertOperationOperations } from "./classic/alertOperation/index.js";
import type { AlertsOperations } from "./classic/alerts/index.js";
import { _getAlertsOperations } from "./classic/alerts/index.js";
import type { AttributeNamespacesOperations } from "./classic/attributeNamespaces/index.js";
import { _getAttributeNamespacesOperations } from "./classic/attributeNamespaces/index.js";
import type { ClassicAdministratorsOperations } from "./classic/classicAdministrators/index.js";
import { _getClassicAdministratorsOperations } from "./classic/classicAdministrators/index.js";
import type { DenyAssignmentsOperations } from "./classic/denyAssignments/index.js";
import { _getDenyAssignmentsOperations } from "./classic/denyAssignments/index.js";
import type { EligibleChildResourcesOperations } from "./classic/eligibleChildResources/index.js";
import { _getEligibleChildResourcesOperations } from "./classic/eligibleChildResources/index.js";
import type { GlobalAdministratorOperations } from "./classic/globalAdministrator/index.js";
import { _getGlobalAdministratorOperations } from "./classic/globalAdministrator/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PermissionsOperations } from "./classic/permissions/index.js";
import { _getPermissionsOperations } from "./classic/permissions/index.js";
import type { ProviderOperationsMetadataOperations } from "./classic/providerOperationsMetadata/index.js";
import { _getProviderOperationsMetadataOperations } from "./classic/providerOperationsMetadata/index.js";
import type { RoleAssignmentScheduleInstancesOperations } from "./classic/roleAssignmentScheduleInstances/index.js";
import { _getRoleAssignmentScheduleInstancesOperations } from "./classic/roleAssignmentScheduleInstances/index.js";
import type { RoleAssignmentScheduleRequestsOperations } from "./classic/roleAssignmentScheduleRequests/index.js";
import { _getRoleAssignmentScheduleRequestsOperations } from "./classic/roleAssignmentScheduleRequests/index.js";
import type { RoleAssignmentSchedulesOperations } from "./classic/roleAssignmentSchedules/index.js";
import { _getRoleAssignmentSchedulesOperations } from "./classic/roleAssignmentSchedules/index.js";
import type { RoleAssignmentsOperations } from "./classic/roleAssignments/index.js";
import { _getRoleAssignmentsOperations } from "./classic/roleAssignments/index.js";
import type { RoleDefinitionsOperations } from "./classic/roleDefinitions/index.js";
import { _getRoleDefinitionsOperations } from "./classic/roleDefinitions/index.js";
import type { RoleEligibilityScheduleInstancesOperations } from "./classic/roleEligibilityScheduleInstances/index.js";
import { _getRoleEligibilityScheduleInstancesOperations } from "./classic/roleEligibilityScheduleInstances/index.js";
import type { RoleEligibilityScheduleRequestsOperations } from "./classic/roleEligibilityScheduleRequests/index.js";
import { _getRoleEligibilityScheduleRequestsOperations } from "./classic/roleEligibilityScheduleRequests/index.js";
import type { RoleEligibilitySchedulesOperations } from "./classic/roleEligibilitySchedules/index.js";
import { _getRoleEligibilitySchedulesOperations } from "./classic/roleEligibilitySchedules/index.js";
import type { RoleManagementPoliciesOperations } from "./classic/roleManagementPolicies/index.js";
import { _getRoleManagementPoliciesOperations } from "./classic/roleManagementPolicies/index.js";
import type { RoleManagementPolicyAssignmentsOperations } from "./classic/roleManagementPolicyAssignments/index.js";
import { _getRoleManagementPolicyAssignmentsOperations } from "./classic/roleManagementPolicyAssignments/index.js";
import type { ScopeAccessReviewDefaultSettingsOperations } from "./classic/scopeAccessReviewDefaultSettings/index.js";
import { _getScopeAccessReviewDefaultSettingsOperations } from "./classic/scopeAccessReviewDefaultSettings/index.js";
import type { ScopeAccessReviewHistoryDefinitionOperations } from "./classic/scopeAccessReviewHistoryDefinition/index.js";
import { _getScopeAccessReviewHistoryDefinitionOperations } from "./classic/scopeAccessReviewHistoryDefinition/index.js";
import type { ScopeAccessReviewHistoryDefinitionInstanceOperations } from "./classic/scopeAccessReviewHistoryDefinitionInstance/index.js";
import { _getScopeAccessReviewHistoryDefinitionInstanceOperations } from "./classic/scopeAccessReviewHistoryDefinitionInstance/index.js";
import type { ScopeAccessReviewHistoryDefinitionInstancesOperations } from "./classic/scopeAccessReviewHistoryDefinitionInstances/index.js";
import { _getScopeAccessReviewHistoryDefinitionInstancesOperations } from "./classic/scopeAccessReviewHistoryDefinitionInstances/index.js";
import type { ScopeAccessReviewHistoryDefinitionsOperations } from "./classic/scopeAccessReviewHistoryDefinitions/index.js";
import { _getScopeAccessReviewHistoryDefinitionsOperations } from "./classic/scopeAccessReviewHistoryDefinitions/index.js";
import type { ScopeAccessReviewInstanceOperations } from "./classic/scopeAccessReviewInstance/index.js";
import { _getScopeAccessReviewInstanceOperations } from "./classic/scopeAccessReviewInstance/index.js";
import type { ScopeAccessReviewInstanceContactedReviewersOperations } from "./classic/scopeAccessReviewInstanceContactedReviewers/index.js";
import { _getScopeAccessReviewInstanceContactedReviewersOperations } from "./classic/scopeAccessReviewInstanceContactedReviewers/index.js";
import type { ScopeAccessReviewInstanceDecisionsOperations } from "./classic/scopeAccessReviewInstanceDecisions/index.js";
import { _getScopeAccessReviewInstanceDecisionsOperations } from "./classic/scopeAccessReviewInstanceDecisions/index.js";
import type { ScopeAccessReviewInstancesOperations } from "./classic/scopeAccessReviewInstances/index.js";
import { _getScopeAccessReviewInstancesOperations } from "./classic/scopeAccessReviewInstances/index.js";
import type { ScopeAccessReviewScheduleDefinitionsOperations } from "./classic/scopeAccessReviewScheduleDefinitions/index.js";
import { _getScopeAccessReviewScheduleDefinitionsOperations } from "./classic/scopeAccessReviewScheduleDefinitions/index.js";
import type { TenantLevelAccessReviewInstanceContactedReviewersOperations } from "./classic/tenantLevelAccessReviewInstanceContactedReviewers/index.js";
import { _getTenantLevelAccessReviewInstanceContactedReviewersOperations } from "./classic/tenantLevelAccessReviewInstanceContactedReviewers/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AuthorizationManagementClientOptionalParams } from "./api/authorizationManagementContext.js";

export class AuthorizationManagementClient {
  private _client: AuthorizationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AuthorizationManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AuthorizationManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AuthorizationManagementClientOptionalParams,
    options?: AuthorizationManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAuthorizationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.alertOperation = _getAlertOperationOperations(this._client);
    this.permissions = _getPermissionsOperations(this._client);
    this.providerOperationsMetadata = _getProviderOperationsMetadataOperations(this._client);
    this.globalAdministrator = _getGlobalAdministratorOperations(this._client);
    this.classicAdministrators = _getClassicAdministratorsOperations(this._client);
    this.eligibleChildResources = _getEligibleChildResourcesOperations(this._client);
    this.accessReviewInstanceMyDecisions = _getAccessReviewInstanceMyDecisionsOperations(
      this._client,
    );
    this.accessReviewDefaultSettings = _getAccessReviewDefaultSettingsOperations(this._client);
    this.tenantLevelAccessReviewInstanceContactedReviewers =
      _getTenantLevelAccessReviewInstanceContactedReviewersOperations(this._client);
    this.scopeAccessReviewInstanceContactedReviewers =
      _getScopeAccessReviewInstanceContactedReviewersOperations(this._client);
    this.scopeAccessReviewInstanceDecisions = _getScopeAccessReviewInstanceDecisionsOperations(
      this._client,
    );
    this.scopeAccessReviewInstance = _getScopeAccessReviewInstanceOperations(this._client);
    this.accessReviewInstanceContactedReviewers =
      _getAccessReviewInstanceContactedReviewersOperations(this._client);
    this.accessReviewInstanceDecisions = _getAccessReviewInstanceDecisionsOperations(this._client);
    this.accessReviewInstance = _getAccessReviewInstanceOperations(this._client);
    this.accessReviewScheduleDefinitionsAssignedForMyApproval =
      _getAccessReviewScheduleDefinitionsAssignedForMyApprovalOperations(this._client);
    this.scopeAccessReviewHistoryDefinitionInstances =
      _getScopeAccessReviewHistoryDefinitionInstancesOperations(this._client);
    this.scopeAccessReviewHistoryDefinitionInstance =
      _getScopeAccessReviewHistoryDefinitionInstanceOperations(this._client);
    this.scopeAccessReviewHistoryDefinition = _getScopeAccessReviewHistoryDefinitionOperations(
      this._client,
    );
    this.accessReviewHistoryDefinitionInstances =
      _getAccessReviewHistoryDefinitionInstancesOperations(this._client);
    this.accessReviewHistoryDefinitionInstance =
      _getAccessReviewHistoryDefinitionInstanceOperations(this._client);
    this.accessReviewHistoryDefinition = _getAccessReviewHistoryDefinitionOperations(this._client);
    this.alertIncidents = _getAlertIncidentsOperations(this._client);
    this.alertDefinitions = _getAlertDefinitionsOperations(this._client);
    this.alertConfigurations = _getAlertConfigurationsOperations(this._client);
    this.alerts = _getAlertsOperations(this._client);
    this.roleDefinitions = _getRoleDefinitionsOperations(this._client);
    this.roleAssignments = _getRoleAssignmentsOperations(this._client);
    this.denyAssignments = _getDenyAssignmentsOperations(this._client);
    this.roleManagementPolicyAssignments = _getRoleManagementPolicyAssignmentsOperations(
      this._client,
    );
    this.roleManagementPolicies = _getRoleManagementPoliciesOperations(this._client);
    this.roleEligibilityScheduleRequests = _getRoleEligibilityScheduleRequestsOperations(
      this._client,
    );
    this.roleEligibilityScheduleInstances = _getRoleEligibilityScheduleInstancesOperations(
      this._client,
    );
    this.roleEligibilitySchedules = _getRoleEligibilitySchedulesOperations(this._client);
    this.roleAssignmentScheduleRequests = _getRoleAssignmentScheduleRequestsOperations(
      this._client,
    );
    this.roleAssignmentScheduleInstances = _getRoleAssignmentScheduleInstancesOperations(
      this._client,
    );
    this.roleAssignmentSchedules = _getRoleAssignmentSchedulesOperations(this._client);
    this.scopeAccessReviewDefaultSettings = _getScopeAccessReviewDefaultSettingsOperations(
      this._client,
    );
    this.accessReviewInstancesAssignedForMyApproval =
      _getAccessReviewInstancesAssignedForMyApprovalOperations(this._client);
    this.scopeAccessReviewInstances = _getScopeAccessReviewInstancesOperations(this._client);
    this.accessReviewInstances = _getAccessReviewInstancesOperations(this._client);
    this.scopeAccessReviewScheduleDefinitions = _getScopeAccessReviewScheduleDefinitionsOperations(
      this._client,
    );
    this.accessReviewScheduleDefinitions = _getAccessReviewScheduleDefinitionsOperations(
      this._client,
    );
    this.scopeAccessReviewHistoryDefinitions = _getScopeAccessReviewHistoryDefinitionsOperations(
      this._client,
    );
    this.accessReviewHistoryDefinitions = _getAccessReviewHistoryDefinitionsOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
    this.attributeNamespaces = _getAttributeNamespacesOperations(this._client);
  }

  /** The operation groups for alertOperation */
  public readonly alertOperation: AlertOperationOperations;
  /** The operation groups for permissions */
  public readonly permissions: PermissionsOperations;
  /** The operation groups for providerOperationsMetadata */
  public readonly providerOperationsMetadata: ProviderOperationsMetadataOperations;
  /** The operation groups for globalAdministrator */
  public readonly globalAdministrator: GlobalAdministratorOperations;
  /** The operation groups for classicAdministrators */
  public readonly classicAdministrators: ClassicAdministratorsOperations;
  /** The operation groups for eligibleChildResources */
  public readonly eligibleChildResources: EligibleChildResourcesOperations;
  /** The operation groups for accessReviewInstanceMyDecisions */
  public readonly accessReviewInstanceMyDecisions: AccessReviewInstanceMyDecisionsOperations;
  /** The operation groups for accessReviewDefaultSettings */
  public readonly accessReviewDefaultSettings: AccessReviewDefaultSettingsOperations;
  /** The operation groups for tenantLevelAccessReviewInstanceContactedReviewers */
  public readonly tenantLevelAccessReviewInstanceContactedReviewers: TenantLevelAccessReviewInstanceContactedReviewersOperations;
  /** The operation groups for scopeAccessReviewInstanceContactedReviewers */
  public readonly scopeAccessReviewInstanceContactedReviewers: ScopeAccessReviewInstanceContactedReviewersOperations;
  /** The operation groups for scopeAccessReviewInstanceDecisions */
  public readonly scopeAccessReviewInstanceDecisions: ScopeAccessReviewInstanceDecisionsOperations;
  /** The operation groups for scopeAccessReviewInstance */
  public readonly scopeAccessReviewInstance: ScopeAccessReviewInstanceOperations;
  /** The operation groups for accessReviewInstanceContactedReviewers */
  public readonly accessReviewInstanceContactedReviewers: AccessReviewInstanceContactedReviewersOperations;
  /** The operation groups for accessReviewInstanceDecisions */
  public readonly accessReviewInstanceDecisions: AccessReviewInstanceDecisionsOperations;
  /** The operation groups for accessReviewInstance */
  public readonly accessReviewInstance: AccessReviewInstanceOperations;
  /** The operation groups for accessReviewScheduleDefinitionsAssignedForMyApproval */
  public readonly accessReviewScheduleDefinitionsAssignedForMyApproval: AccessReviewScheduleDefinitionsAssignedForMyApprovalOperations;
  /** The operation groups for scopeAccessReviewHistoryDefinitionInstances */
  public readonly scopeAccessReviewHistoryDefinitionInstances: ScopeAccessReviewHistoryDefinitionInstancesOperations;
  /** The operation groups for scopeAccessReviewHistoryDefinitionInstance */
  public readonly scopeAccessReviewHistoryDefinitionInstance: ScopeAccessReviewHistoryDefinitionInstanceOperations;
  /** The operation groups for scopeAccessReviewHistoryDefinition */
  public readonly scopeAccessReviewHistoryDefinition: ScopeAccessReviewHistoryDefinitionOperations;
  /** The operation groups for accessReviewHistoryDefinitionInstances */
  public readonly accessReviewHistoryDefinitionInstances: AccessReviewHistoryDefinitionInstancesOperations;
  /** The operation groups for accessReviewHistoryDefinitionInstance */
  public readonly accessReviewHistoryDefinitionInstance: AccessReviewHistoryDefinitionInstanceOperations;
  /** The operation groups for accessReviewHistoryDefinition */
  public readonly accessReviewHistoryDefinition: AccessReviewHistoryDefinitionOperations;
  /** The operation groups for alertIncidents */
  public readonly alertIncidents: AlertIncidentsOperations;
  /** The operation groups for alertDefinitions */
  public readonly alertDefinitions: AlertDefinitionsOperations;
  /** The operation groups for alertConfigurations */
  public readonly alertConfigurations: AlertConfigurationsOperations;
  /** The operation groups for alerts */
  public readonly alerts: AlertsOperations;
  /** The operation groups for roleDefinitions */
  public readonly roleDefinitions: RoleDefinitionsOperations;
  /** The operation groups for roleAssignments */
  public readonly roleAssignments: RoleAssignmentsOperations;
  /** The operation groups for denyAssignments */
  public readonly denyAssignments: DenyAssignmentsOperations;
  /** The operation groups for roleManagementPolicyAssignments */
  public readonly roleManagementPolicyAssignments: RoleManagementPolicyAssignmentsOperations;
  /** The operation groups for roleManagementPolicies */
  public readonly roleManagementPolicies: RoleManagementPoliciesOperations;
  /** The operation groups for roleEligibilityScheduleRequests */
  public readonly roleEligibilityScheduleRequests: RoleEligibilityScheduleRequestsOperations;
  /** The operation groups for roleEligibilityScheduleInstances */
  public readonly roleEligibilityScheduleInstances: RoleEligibilityScheduleInstancesOperations;
  /** The operation groups for roleEligibilitySchedules */
  public readonly roleEligibilitySchedules: RoleEligibilitySchedulesOperations;
  /** The operation groups for roleAssignmentScheduleRequests */
  public readonly roleAssignmentScheduleRequests: RoleAssignmentScheduleRequestsOperations;
  /** The operation groups for roleAssignmentScheduleInstances */
  public readonly roleAssignmentScheduleInstances: RoleAssignmentScheduleInstancesOperations;
  /** The operation groups for roleAssignmentSchedules */
  public readonly roleAssignmentSchedules: RoleAssignmentSchedulesOperations;
  /** The operation groups for scopeAccessReviewDefaultSettings */
  public readonly scopeAccessReviewDefaultSettings: ScopeAccessReviewDefaultSettingsOperations;
  /** The operation groups for accessReviewInstancesAssignedForMyApproval */
  public readonly accessReviewInstancesAssignedForMyApproval: AccessReviewInstancesAssignedForMyApprovalOperations;
  /** The operation groups for scopeAccessReviewInstances */
  public readonly scopeAccessReviewInstances: ScopeAccessReviewInstancesOperations;
  /** The operation groups for accessReviewInstances */
  public readonly accessReviewInstances: AccessReviewInstancesOperations;
  /** The operation groups for scopeAccessReviewScheduleDefinitions */
  public readonly scopeAccessReviewScheduleDefinitions: ScopeAccessReviewScheduleDefinitionsOperations;
  /** The operation groups for accessReviewScheduleDefinitions */
  public readonly accessReviewScheduleDefinitions: AccessReviewScheduleDefinitionsOperations;
  /** The operation groups for scopeAccessReviewHistoryDefinitions */
  public readonly scopeAccessReviewHistoryDefinitions: ScopeAccessReviewHistoryDefinitionsOperations;
  /** The operation groups for accessReviewHistoryDefinitions */
  public readonly accessReviewHistoryDefinitions: AccessReviewHistoryDefinitionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for attributeNamespaces */
  public readonly attributeNamespaces: AttributeNamespacesOperations;
}
