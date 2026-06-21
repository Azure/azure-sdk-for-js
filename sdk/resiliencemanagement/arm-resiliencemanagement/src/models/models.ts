// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** Goal assignment a AzureResilienceProviderHub resource */
export interface GoalAssignment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GoalAssignmentProperties;
}

export function goalAssignmentSerializer(item: GoalAssignment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : goalAssignmentPropertiesSerializer(item["properties"]),
  };
}

export function goalAssignmentDeserializer(item: any): GoalAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : goalAssignmentPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of goal assignment property. */
export interface GoalAssignmentProperties {
  /** Arm id of the goal template. */
  goalTemplateId: string;
  /** The type of goal assignment. */
  goalAssignmentType: GoalAssignmentType;
  /** List of service level resources. */
  serviceLevelResources?: ServiceLevelResource[];
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Details of any errors encountered during the operation. */
  readonly errorDetails?: ErrorDetail;
}

export function goalAssignmentPropertiesSerializer(item: GoalAssignmentProperties): any {
  return {
    goalTemplateId: item["goalTemplateId"],
    goalAssignmentType: item["goalAssignmentType"],
    serviceLevelResources: !item["serviceLevelResources"]
      ? item["serviceLevelResources"]
      : serviceLevelResourceArraySerializer(item["serviceLevelResources"]),
  };
}

export function goalAssignmentPropertiesDeserializer(item: any): GoalAssignmentProperties {
  return {
    goalTemplateId: item["goalTemplateId"],
    goalAssignmentType: item["goalAssignmentType"],
    serviceLevelResources: !item["serviceLevelResources"]
      ? item["serviceLevelResources"]
      : serviceLevelResourceArrayDeserializer(item["serviceLevelResources"]),
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Supported type of goal assignment. */
export enum KnownGoalAssignmentType {
  /** Resiliency goal assignment type. */
  Resiliency = "Resiliency",
}

/**
 * Supported type of goal assignment. \
 * {@link KnownGoalAssignmentType} can be used interchangeably with GoalAssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resiliency**: Resiliency goal assignment type.
 */
export type GoalAssignmentType = string;

export function serviceLevelResourceArraySerializer(result: Array<ServiceLevelResource>): any[] {
  return result.map((item) => {
    return serviceLevelResourceSerializer(item);
  });
}

export function serviceLevelResourceArrayDeserializer(result: Array<ServiceLevelResource>): any[] {
  return result.map((item) => {
    return serviceLevelResourceDeserializer(item);
  });
}

/** The Service level resource model */
export interface ServiceLevelResource {
  /** The arm id of the service level indicator resource */
  serviceLevelIndicatorResourceId: string;
  /** The arm id of the service level object resource */
  serviceLevelObjectiveResourceId: string;
}

export function serviceLevelResourceSerializer(item: ServiceLevelResource): any {
  return {
    serviceLevelIndicatorResourceId: item["serviceLevelIndicatorResourceId"],
    serviceLevelObjectiveResourceId: item["serviceLevelObjectiveResourceId"],
  };
}

export function serviceLevelResourceDeserializer(item: any): ServiceLevelResource {
  return {
    serviceLevelIndicatorResourceId: item["serviceLevelIndicatorResourceId"],
    serviceLevelObjectiveResourceId: item["serviceLevelObjectiveResourceId"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Initial provisioning in progress */
  Provisioning = "Provisioning",
  /** Update in progress */
  Updating = "Updating",
  /** Deletion in progress */
  Deleting = "Deleting",
  /** Change accepted for processing */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Initial provisioning in progress \
 * **Updating**: Update in progress \
 * **Deleting**: Deletion in progress \
 * **Accepted**: Change accepted for processing
 */
export type ProvisioningState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Request model for update goal resource. */
export interface UpdateGoalResourceRequest {
  /** List of update goal resource. */
  resources: GoalResource[];
}

export function updateGoalResourceRequestSerializer(item: UpdateGoalResourceRequest): any {
  return { resources: goalResourceArraySerializer(item["resources"]) };
}

export function goalResourceArraySerializer(result: Array<GoalResource>): any[] {
  return result.map((item) => {
    return goalResourceSerializer(item);
  });
}

export function goalResourceArrayDeserializer(result: Array<GoalResource>): any[] {
  return result.map((item) => {
    return goalResourceDeserializer(item);
  });
}

/** Goal Resource a AzureResilienceProviderHub resource */
export interface GoalResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GoalResourceProperties;
}

export function goalResourceSerializer(item: GoalResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : goalResourcePropertiesSerializer(item["properties"]),
  };
}

export function goalResourceDeserializer(item: any): GoalResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : goalResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Definition of goal assignment property. */
export interface GoalResourceProperties {
  /** Arm Id of resource under the SG for which the extension resource is maintained. */
  resourceArmId: string;
  /** Flag which depicts whether the Arm resource is excluded for high availability recommendation. */
  highAvailabilityGoalParticipation: ExclusionState;
  /** Flag which depicts whether the Arm resource is manually attested for high availability recommendation. */
  highAvailabilityAttestationStatus: AttestationState;
  /** Flag which depicts whether the Arm resource is excluded for disaster recovery recommendation. */
  disasterRecoveryGoalParticipation?: ExclusionState;
  /** Flag which depicts whether the Arm resource is manually attested for disaster recovery recommendation. */
  disasterRecoveryAttestationStatus?: AttestationState;
  /** Reason for exclusion from high availability goals. */
  readonly exclusionReasonForHighAvailabilityGoals?: ExclusionReason;
  /** Reason for exclusion from disaster recovery goals. */
  readonly exclusionReasonForDisasterRecoveryGoals?: ExclusionReason;
  /** List of user confirmations for high availability solutions. */
  userConfirmationForHighAvailability?: UserConfirmationForHighAvailabilityItem[];
  /** List of service groups of which this resource is memberof. */
  readonly serviceGroupMemberships?: ServiceGroupMembership[];
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function goalResourcePropertiesSerializer(item: GoalResourceProperties): any {
  return {
    resourceArmId: item["resourceArmId"],
    highAvailabilityGoalParticipation: item["highAvailabilityGoalParticipation"],
    highAvailabilityAttestationStatus: item["highAvailabilityAttestationStatus"],
    disasterRecoveryGoalParticipation: item["disasterRecoveryGoalParticipation"],
    disasterRecoveryAttestationStatus: item["disasterRecoveryAttestationStatus"],
    userConfirmationForHighAvailability: !item["userConfirmationForHighAvailability"]
      ? item["userConfirmationForHighAvailability"]
      : userConfirmationForHighAvailabilityItemArraySerializer(
          item["userConfirmationForHighAvailability"],
        ),
  };
}

export function goalResourcePropertiesDeserializer(item: any): GoalResourceProperties {
  return {
    resourceArmId: item["resourceArmId"],
    highAvailabilityGoalParticipation: item["highAvailabilityGoalParticipation"],
    highAvailabilityAttestationStatus: item["highAvailabilityAttestationStatus"],
    disasterRecoveryGoalParticipation: item["disasterRecoveryGoalParticipation"],
    disasterRecoveryAttestationStatus: item["disasterRecoveryAttestationStatus"],
    exclusionReasonForHighAvailabilityGoals: item["exclusionReasonForHighAvailabilityGoals"],
    exclusionReasonForDisasterRecoveryGoals: item["exclusionReasonForDisasterRecoveryGoals"],
    userConfirmationForHighAvailability: !item["userConfirmationForHighAvailability"]
      ? item["userConfirmationForHighAvailability"]
      : userConfirmationForHighAvailabilityItemArrayDeserializer(
          item["userConfirmationForHighAvailability"],
        ),
    serviceGroupMemberships: !item["serviceGroupMemberships"]
      ? item["serviceGroupMemberships"]
      : serviceGroupMembershipArrayDeserializer(item["serviceGroupMemberships"]),
    provisioningState: item["provisioningState"],
  };
}

/** Enum for the status of the resource in the goal. */
export enum KnownExclusionState {
  /** Resource is not included in the goals. */
  Excluded = "Excluded",
  /** Resource is excluded from the goals. */
  Included = "Included",
}

/**
 * Enum for the status of the resource in the goal. \
 * {@link KnownExclusionState} can be used interchangeably with ExclusionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Excluded**: Resource is not included in the goals. \
 * **Included**: Resource is excluded from the goals.
 */
export type ExclusionState = string;

/** Enum for the attestation status of the resource in the goal. */
export enum KnownAttestationState {
  /** Resource is not manually attested. */
  NotAttested = "NotAttested",
  /** Resource is manually attested. */
  ManuallyAttested = "ManuallyAttested",
}

/**
 * Enum for the attestation status of the resource in the goal. \
 * {@link KnownAttestationState} can be used interchangeably with AttestationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotAttested**: Resource is not manually attested. \
 * **ManuallyAttested**: Resource is manually attested.
 */
export type AttestationState = string;

/** Enum for the reason why a resource is excluded. */
export enum KnownExclusionReason {
  /** The resource was excluded by user selection. */
  UserSelectedExclusion = "UserSelectedExclusion",
  /** The resource failed over and is excluded. */
  FailedOverResource = "FailedOverResource",
  /** The resource is unsupported and excluded. */
  UnsupportedResource = "UnsupportedResource",
}

/**
 * Enum for the reason why a resource is excluded. \
 * {@link KnownExclusionReason} can be used interchangeably with ExclusionReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserSelectedExclusion**: The resource was excluded by user selection. \
 * **FailedOverResource**: The resource failed over and is excluded. \
 * **UnsupportedResource**: The resource is unsupported and excluded.
 */
export type ExclusionReason = string;

export function userConfirmationForHighAvailabilityItemArraySerializer(
  result: Array<UserConfirmationForHighAvailabilityItem>,
): any[] {
  return result.map((item) => {
    return userConfirmationForHighAvailabilityItemSerializer(item);
  });
}

export function userConfirmationForHighAvailabilityItemArrayDeserializer(
  result: Array<UserConfirmationForHighAvailabilityItem>,
): any[] {
  return result.map((item) => {
    return userConfirmationForHighAvailabilityItemDeserializer(item);
  });
}

/** Represents a user confirmation for a high availability solution. */
export interface UserConfirmationForHighAvailabilityItem {
  /** The solution display name of the high availability solution. */
  solutionDisplayName: SolutionDisplayName;
  /** The confirmation status of the high availability solution. */
  confirmationStatus: ConfirmationStatus;
  /** The reason for requesting user confirmation for the high availability solution. */
  reasonForRequestingConfirmation?: ReasonForRequestingConfirmation;
}

export function userConfirmationForHighAvailabilityItemSerializer(
  item: UserConfirmationForHighAvailabilityItem,
): any {
  return {
    solutionDisplayName: item["solutionDisplayName"],
    confirmationStatus: item["confirmationStatus"],
    reasonForRequestingConfirmation: item["reasonForRequestingConfirmation"],
  };
}

export function userConfirmationForHighAvailabilityItemDeserializer(
  item: any,
): UserConfirmationForHighAvailabilityItem {
  return {
    solutionDisplayName: item["solutionDisplayName"],
    confirmationStatus: item["confirmationStatus"],
    reasonForRequestingConfirmation: item["reasonForRequestingConfirmation"],
  };
}

/** Identifies a high-availability solution that can be applied to a resource (for example, zone-pinned VM with ZRS disk). */
export enum KnownSolutionDisplayName {
  /** Zone pinned VM with ZRS disk. */
  ZonePinnedVmWithZrsDisk = "ZonePinnedVmWithZrsDisk",
  /** VM in multi-zone VMSS. */
  VmInMultiZoneVmss = "VmInMultiZoneVmss",
}

/**
 * Identifies a high-availability solution that can be applied to a resource (for example, zone-pinned VM with ZRS disk). \
 * {@link KnownSolutionDisplayName} can be used interchangeably with SolutionDisplayName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ZonePinnedVmWithZrsDisk**: Zone pinned VM with ZRS disk. \
 * **VmInMultiZoneVmss**: VM in multi-zone VMSS.
 */
export type SolutionDisplayName = string;

/** Enum for the confirmation status of a high availability solution. */
export enum KnownConfirmationStatus {
  /** The high availability solution has been approved by the user. */
  ApprovedByUser = "ApprovedByUser",
  /** The high availability solution is pending approval from the user. */
  ApprovalPending = "ApprovalPending",
  /** The high availability solution does not require user approval. */
  ApprovalNotNeeded = "ApprovalNotNeeded",
  /** The high availability solution has been rejected by the user. */
  RejectedByUser = "RejectedByUser",
}

/**
 * Enum for the confirmation status of a high availability solution. \
 * {@link KnownConfirmationStatus} can be used interchangeably with ConfirmationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApprovedByUser**: The high availability solution has been approved by the user. \
 * **ApprovalPending**: The high availability solution is pending approval from the user. \
 * **ApprovalNotNeeded**: The high availability solution does not require user approval. \
 * **RejectedByUser**: The high availability solution has been rejected by the user.
 */
export type ConfirmationStatus = string;

/** Enum for the reason for requesting user confirmation for a high availability solution. */
export enum KnownReasonForRequestingConfirmation {
  /** Zone pinned ZRS data disks conditional. */
  ZonePinnedZrsDataDisksConditional = "ZonePinnedZrsDataDisksConditional",
  /** VM in multi-zone scale set stateless only. */
  VmInMultiZoneScaleSetStatelessOnly = "VmInMultiZoneScaleSetStatelessOnly",
}

/**
 * Enum for the reason for requesting user confirmation for a high availability solution. \
 * {@link KnownReasonForRequestingConfirmation} can be used interchangeably with ReasonForRequestingConfirmation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ZonePinnedZrsDataDisksConditional**: Zone pinned ZRS data disks conditional. \
 * **VmInMultiZoneScaleSetStatelessOnly**: VM in multi-zone scale set stateless only.
 */
export type ReasonForRequestingConfirmation = string;

export function serviceGroupMembershipArrayDeserializer(
  result: Array<ServiceGroupMembership>,
): any[] {
  return result.map((item) => {
    return serviceGroupMembershipDeserializer(item);
  });
}

/** Model for service group membership. */
export interface ServiceGroupMembership {
  /** Arm Id of the service group. */
  serviceGroupId: string;
  /** Membership type of the service group to resource. */
  membershipType: MembershipType;
}

export function serviceGroupMembershipDeserializer(item: any): ServiceGroupMembership {
  return {
    serviceGroupId: item["serviceGroupId"],
    membershipType: item["membershipType"],
  };
}

/** Membership type of the service group to resource. */
export enum KnownMembershipType {
  /** Resource is direct member of service group. */
  Direct = "Direct",
  /** Resource is member of service group through subscription. */
  ThroughSubscription = "ThroughSubscription",
  /** Resource is member of service group through resource group. */
  ThroughResourceGroup = "ThroughResourceGroup",
}

/**
 * Membership type of the service group to resource. \
 * {@link KnownMembershipType} can be used interchangeably with MembershipType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Direct**: Resource is direct member of service group. \
 * **ThroughSubscription**: Resource is member of service group through subscription. \
 * **ThroughResourceGroup**: Resource is member of service group through resource group.
 */
export type MembershipType = string;

/** Request body for the recommend capacity action. Provide specific resource IDs to evaluate, or pass an empty array to let the service automatically select non-resilient resources from the goal assignment. */
export interface RecommendCapacityRequest {
  /** Azure resource IDs to evaluate for resiliency. Pass an empty array to automatically discover and evaluate non-resilient resources in the service group. Maximum 50 resources per request. */
  resourceIds: string[];
}

export function recommendCapacityRequestSerializer(item: RecommendCapacityRequest): any {
  return {
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** The response of a GoalAssignment list operation. */
export interface _GoalAssignmentListResult {
  /** The GoalAssignment items on this page */
  value: GoalAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _goalAssignmentListResultDeserializer(item: any): _GoalAssignmentListResult {
  return {
    value: goalAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function goalAssignmentArraySerializer(result: Array<GoalAssignment>): any[] {
  return result.map((item) => {
    return goalAssignmentSerializer(item);
  });
}

export function goalAssignmentArrayDeserializer(result: Array<GoalAssignment>): any[] {
  return result.map((item) => {
    return goalAssignmentDeserializer(item);
  });
}

/** Goal template a AzureResilienceProviderHub resource */
export interface GoalTemplate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GoalTemplateProperties;
}

export function goalTemplateSerializer(item: GoalTemplate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : goalTemplatePropertiesSerializer(item["properties"]),
  };
}

export function goalTemplateDeserializer(item: any): GoalTemplate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : goalTemplatePropertiesDeserializer(item["properties"]),
  };
}

/** Definition of goal template property. */
export interface GoalTemplateProperties {
  /** Option specified by customer under high availability section of goal template */
  requireHighAvailability?: RequirementSelected;
  /** Option specified by customer under disaster recovery section of goal template */
  requireDisasterRecovery?: RequirementSelected;
  /** Regional recovery point objective specified by customer. eg, PT15M for 15 minutes */
  regionalRecoveryPointObjective?: string;
  /** Regional recovery time objective specified by customer. eg, PT15M for 15 minutes */
  regionalRecoveryTimeObjective?: string;
  /** Type of Goal Template created by customer */
  goalType: GoalType;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Details of any errors encountered during the operation. */
  readonly errorDetails?: ErrorDetail;
}

export function goalTemplatePropertiesSerializer(item: GoalTemplateProperties): any {
  return {
    requireHighAvailability: item["requireHighAvailability"],
    requireDisasterRecovery: item["requireDisasterRecovery"],
    regionalRecoveryPointObjective: item["regionalRecoveryPointObjective"],
    regionalRecoveryTimeObjective: item["regionalRecoveryTimeObjective"],
    goalType: item["goalType"],
  };
}

export function goalTemplatePropertiesDeserializer(item: any): GoalTemplateProperties {
  return {
    requireHighAvailability: item["requireHighAvailability"],
    requireDisasterRecovery: item["requireDisasterRecovery"],
    regionalRecoveryPointObjective: item["regionalRecoveryPointObjective"],
    regionalRecoveryTimeObjective: item["regionalRecoveryTimeObjective"],
    goalType: item["goalType"],
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Enum for the requirement status of the resource in the goal. */
export enum KnownRequirementSelected {
  /** The resource is not required for the specified goal. */
  NotRequired = "NotRequired",
  /** The resource is required for the specified goal. */
  Required = "Required",
}

/**
 * Enum for the requirement status of the resource in the goal. \
 * {@link KnownRequirementSelected} can be used interchangeably with RequirementSelected,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotRequired**: The resource is not required for the specified goal. \
 * **Required**: The resource is required for the specified goal.
 */
export type RequirementSelected = string;

/** Supported type of goal. */
export enum KnownGoalType {
  /** Resiliency goal type. */
  Resiliency = "Resiliency",
}

/**
 * Supported type of goal. \
 * {@link KnownGoalType} can be used interchangeably with GoalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resiliency**: Resiliency goal type.
 */
export type GoalType = string;

/** The response of a GoalTemplate list operation. */
export interface _GoalTemplateListResult {
  /** The GoalTemplate items on this page */
  value: GoalTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _goalTemplateListResultDeserializer(item: any): _GoalTemplateListResult {
  return {
    value: goalTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function goalTemplateArraySerializer(result: Array<GoalTemplate>): any[] {
  return result.map((item) => {
    return goalTemplateSerializer(item);
  });
}

export function goalTemplateArrayDeserializer(result: Array<GoalTemplate>): any[] {
  return result.map((item) => {
    return goalTemplateDeserializer(item);
  });
}

/** The response of a GoalResource list operation. */
export interface _GoalResourceListResult {
  /** The GoalResource items on this page */
  value: GoalResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _goalResourceListResultDeserializer(item: any): _GoalResourceListResult {
  return {
    value: goalResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Represents a recovery orchestration plan resource in the Azure Resilience Management provider namespace. */
export interface RecoveryPlan extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryPlanProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function recoveryPlanSerializer(item: RecoveryPlan): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPlanPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function recoveryPlanDeserializer(item: any): RecoveryPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPlanPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the recovery orchestration plan. */
export interface RecoveryPlanProperties {
  /** The provisioning state of the recovery orchestration plan. */
  readonly provisioningState?: ProvisioningState;
  /** The type of the recovery orchestration plan, which can be set during creation but cannot be changed afterward. */
  planType: RecoveryPlanType;
  /** The current state of the recovery orchestration plan. */
  readonly planState?: RecoveryPlanState;
  /** A description of the recovery orchestration plan. */
  planDescription: string;
  /** Settings for the recovery orchestration groups associated with the recovery orchestration plan. */
  recoveryGroupsSetting: RecoveryGroupsSetting;
  /** The status of the most recent failover operation executed. */
  readonly latestFailoverStatus?: RecoveryPlanFailoverOperationStatus;
  /** The status of the most recent validation performed. */
  readonly latestValidationStatus?: RecoveryPlanOperationStatus;
  /** Error details associated with the resource. */
  readonly errorDetails?: ErrorDetail;
}

export function recoveryPlanPropertiesSerializer(item: RecoveryPlanProperties): any {
  return {
    planType: item["planType"],
    planDescription: item["planDescription"],
    recoveryGroupsSetting: recoveryGroupsSettingSerializer(item["recoveryGroupsSetting"]),
  };
}

export function recoveryPlanPropertiesDeserializer(item: any): RecoveryPlanProperties {
  return {
    provisioningState: item["provisioningState"],
    planType: item["planType"],
    planState: item["planState"],
    planDescription: item["planDescription"],
    recoveryGroupsSetting: recoveryGroupsSettingDeserializer(item["recoveryGroupsSetting"]),
    latestFailoverStatus: !item["latestFailoverStatus"]
      ? item["latestFailoverStatus"]
      : recoveryPlanFailoverOperationStatusDeserializer(item["latestFailoverStatus"]),
    latestValidationStatus: !item["latestValidationStatus"]
      ? item["latestValidationStatus"]
      : recoveryPlanOperationStatusDeserializer(item["latestValidationStatus"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Specifies the type of recovery orchestration plan. */
export enum KnownRecoveryPlanType {
  /** A recovery orchestration plan for regional resiliency. */
  Regional = "Regional",
  /** A recovery orchestration plan for zonal resiliency. */
  Zonal = "Zonal",
}

/**
 * Specifies the type of recovery orchestration plan. \
 * {@link KnownRecoveryPlanType} can be used interchangeably with RecoveryPlanType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: A recovery orchestration plan for regional resiliency. \
 * **Zonal**: A recovery orchestration plan for zonal resiliency.
 */
export type RecoveryPlanType = string;

/** Specifies the state of the recovery orchestration plan. */
export enum KnownRecoveryPlanState {
  /** The recovery orchestration plan is currently being edited. */
  UnderEdit = "UnderEdit",
  /** The recovery orchestration plan is in a warning state. */
  Warning = "Warning",
  /** The recovery orchestration plan is ready. */
  Ready = "Ready",
}

/**
 * Specifies the state of the recovery orchestration plan. \
 * {@link KnownRecoveryPlanState} can be used interchangeably with RecoveryPlanState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UnderEdit**: The recovery orchestration plan is currently being edited. \
 * **Warning**: The recovery orchestration plan is in a warning state. \
 * **Ready**: The recovery orchestration plan is ready.
 */
export type RecoveryPlanState = string;

/** Settings for the recovery orchestration groups. */
export interface RecoveryGroupsSetting {
  /** The default recovery orchestration group setting. Every recovery orchestration plan has a default recovery orchestration group. */
  defaultGroup: RecoveryGroup;
  /** Additional recovery orchestration group settings. */
  additionalGroups?: RecoveryGroup[];
}

export function recoveryGroupsSettingSerializer(item: RecoveryGroupsSetting): any {
  return {
    defaultGroup: recoveryGroupSerializer(item["defaultGroup"]),
    additionalGroups: !item["additionalGroups"]
      ? item["additionalGroups"]
      : recoveryGroupArraySerializer(item["additionalGroups"]),
  };
}

export function recoveryGroupsSettingDeserializer(item: any): RecoveryGroupsSetting {
  return {
    defaultGroup: recoveryGroupDeserializer(item["defaultGroup"]),
    additionalGroups: !item["additionalGroups"]
      ? item["additionalGroups"]
      : recoveryGroupArrayDeserializer(item["additionalGroups"]),
  };
}

/** Represents a recovery orchestration group resource in the Azure Resilience Management provider namespace. */
export interface RecoveryGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryGroupProperties;
}

export function recoveryGroupSerializer(item: RecoveryGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : recoveryGroupPropertiesSerializer(item["properties"]),
  };
}

export function recoveryGroupDeserializer(item: any): RecoveryGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the recovery orchestration group. */
export interface RecoveryGroupProperties {
  /** A unique id for the recovery orchestration group, which is a GUID. */
  groupUniqueId: string;
  /** The order ID of the recovery orchestration group. */
  orderId: number;
  /** A description of the recovery orchestration group. */
  description: string;
  /** Pre-actions for the recovery orchestration group. */
  preActions?: RecoveryGroupBaseActionUnion[];
  /** Post-actions for the recovery orchestration group. */
  postActions?: RecoveryGroupBaseActionUnion[];
}

export function recoveryGroupPropertiesSerializer(item: RecoveryGroupProperties): any {
  return {
    groupUniqueId: item["groupUniqueId"],
    orderId: item["orderId"],
    description: item["description"],
    preActions: !item["preActions"]
      ? item["preActions"]
      : recoveryGroupBaseActionUnionArraySerializer(item["preActions"]),
    postActions: !item["postActions"]
      ? item["postActions"]
      : recoveryGroupBaseActionUnionArraySerializer(item["postActions"]),
  };
}

export function recoveryGroupPropertiesDeserializer(item: any): RecoveryGroupProperties {
  return {
    groupUniqueId: item["groupUniqueId"],
    orderId: item["orderId"],
    description: item["description"],
    preActions: !item["preActions"]
      ? item["preActions"]
      : recoveryGroupBaseActionUnionArrayDeserializer(item["preActions"]),
    postActions: !item["postActions"]
      ? item["postActions"]
      : recoveryGroupBaseActionUnionArrayDeserializer(item["postActions"]),
  };
}

export function recoveryGroupBaseActionUnionArraySerializer(
  result: Array<RecoveryGroupBaseActionUnion>,
): any[] {
  return result.map((item) => {
    return recoveryGroupBaseActionUnionSerializer(item);
  });
}

export function recoveryGroupBaseActionUnionArrayDeserializer(
  result: Array<RecoveryGroupBaseActionUnion>,
): any[] {
  return result.map((item) => {
    return recoveryGroupBaseActionUnionDeserializer(item);
  });
}

/** Defines an action for the recovery orchestration group. */
export interface RecoveryGroupBaseAction {
  /** The name of the recovery orchestration group action. */
  name: string;
  /** A description of the recovery orchestration group action, containing the instructions to be performed during this action. */
  description?: string;
  /** The type of the recovery orchestration group action. */
  /** The discriminator possible values: ManualAction, CustomRunbook */
  type: RecoveryGroupActionType;
  /** The maximum amount of time, in minutes, allowed for the action to complete before it times out. */
  timeoutInMinutes: number;
}

export function recoveryGroupBaseActionSerializer(item: RecoveryGroupBaseAction): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
  };
}

export function recoveryGroupBaseActionDeserializer(item: any): RecoveryGroupBaseAction {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
  };
}

/** Alias for RecoveryGroupBaseActionUnion */
export type RecoveryGroupBaseActionUnion =
  | RecoveryGroupManualAction
  | RecoveryGroupCustomRunbookAction
  | RecoveryGroupBaseAction;

export function recoveryGroupBaseActionUnionSerializer(item: RecoveryGroupBaseActionUnion): any {
  switch (item.type) {
    case "ManualAction":
      return recoveryGroupManualActionSerializer(item as RecoveryGroupManualAction);

    case "CustomRunbook":
      return recoveryGroupCustomRunbookActionSerializer(item as RecoveryGroupCustomRunbookAction);

    default:
      return recoveryGroupBaseActionSerializer(item);
  }
}

export function recoveryGroupBaseActionUnionDeserializer(item: any): RecoveryGroupBaseActionUnion {
  switch (item["type"]) {
    case "ManualAction":
      return recoveryGroupManualActionDeserializer(item as RecoveryGroupManualAction);

    case "CustomRunbook":
      return recoveryGroupCustomRunbookActionDeserializer(item as RecoveryGroupCustomRunbookAction);

    default:
      return recoveryGroupBaseActionDeserializer(item);
  }
}

/** Specifies the type of recovery orchestration group actions. */
export enum KnownRecoveryGroupActionType {
  /** A manual action type for the recovery orchestration group. */
  ManualAction = "ManualAction",
  /** A custom runbook action type for the recovery orchestration group. */
  CustomRunbook = "CustomRunbook",
}

/**
 * Specifies the type of recovery orchestration group actions. \
 * {@link KnownRecoveryGroupActionType} can be used interchangeably with RecoveryGroupActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ManualAction**: A manual action type for the recovery orchestration group. \
 * **CustomRunbook**: A custom runbook action type for the recovery orchestration group.
 */
export type RecoveryGroupActionType = string;

/** Defines a manual action for the recovery orchestration group. */
export interface RecoveryGroupManualAction extends RecoveryGroupBaseAction {
  /** The type of the recovery orchestration group action. */
  type: "ManualAction";
}

export function recoveryGroupManualActionSerializer(item: RecoveryGroupManualAction): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
  };
}

export function recoveryGroupManualActionDeserializer(item: any): RecoveryGroupManualAction {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
  };
}

/** Defines a custom runbook action for the recovery orchestration group. */
export interface RecoveryGroupCustomRunbookAction extends RecoveryGroupBaseAction {
  /** The type of the recovery orchestration group action. */
  type: "CustomRunbook";
  /** The ARM Resource ID of the resource that includes the actionable script, such as a Runbook in an Automation Account. */
  actionResourceId?: string;
  /** Key-value parameters for the operation. */
  parameters?: Record<string, string>;
  /** The identity associated with actionResourceId for RBAC. */
  associatedIdentity?: AssociatedIdentity;
}

export function recoveryGroupCustomRunbookActionSerializer(
  item: RecoveryGroupCustomRunbookAction,
): any {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
    actionResourceId: item["actionResourceId"],
    parameters: item["parameters"],
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : associatedIdentitySerializer(item["associatedIdentity"]),
  };
}

export function recoveryGroupCustomRunbookActionDeserializer(
  item: any,
): RecoveryGroupCustomRunbookAction {
  return {
    name: item["name"],
    description: item["description"],
    type: item["type"],
    timeoutInMinutes: item["timeoutInMinutes"],
    actionResourceId: item["actionResourceId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : associatedIdentityDeserializer(item["associatedIdentity"]),
  };
}

/** Definition of associated identity linked with the various resources. */
export interface AssociatedIdentity {
  /** Identity type linked with the resource */
  type: ManagedServiceIdentityType;
  /** User assigned identity id linked with the resource */
  userAssignedIdentity?: string;
}

export function associatedIdentitySerializer(item: AssociatedIdentity): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function associatedIdentityDeserializer(item: any): AssociatedIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

export function recoveryGroupArraySerializer(result: Array<RecoveryGroup>): any[] {
  return result.map((item) => {
    return recoveryGroupSerializer(item);
  });
}

export function recoveryGroupArrayDeserializer(result: Array<RecoveryGroup>): any[] {
  return result.map((item) => {
    return recoveryGroupDeserializer(item);
  });
}

/** Details of the recovery orchestration plan failover operation execution. */
export interface RecoveryPlanFailoverOperationStatus {
  /** The most recent execution time of the recovery orchestration plan in UTC. */
  readonly lastExecutedAt?: Date;
  /** The status of the most recent execution of the recovery orchestration plan. */
  readonly operationStatus?: RecoveryOperationStatus;
  /** Error details for the most recent execution of the recovery orchestration plan. */
  readonly errorDetails?: ErrorDetail;
  /** The actual recovery time of the most recent recovery orchestration plan. */
  readonly recoveryTimeActual?: string;
}

export function recoveryPlanFailoverOperationStatusDeserializer(
  item: any,
): RecoveryPlanFailoverOperationStatus {
  return {
    lastExecutedAt: !item["lastExecutedAt"]
      ? item["lastExecutedAt"]
      : new Date(item["lastExecutedAt"]),
    operationStatus: item["operationStatus"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
    recoveryTimeActual: item["recoveryTimeActual"],
  };
}

/** Specifies the operation status for failover and validation. */
export enum KnownRecoveryOperationStatus {
  /** Operation has not started or ran. */
  NotStarted = "NotStarted",
  /** Operation is in the process of being validated. */
  ValidationInProgress = "ValidationInProgress",
  /** Operation is in progress. */
  InProgress = "InProgress",
  /** Operation has completed successfully. */
  Succeeded = "Succeeded",
  /** Operation has completed but ran into some warning state. */
  CompletedWithWarning = "CompletedWithWarning",
  /** Operation has completed but ran into some validation error state. */
  ValidationFailed = "ValidationFailed",
  /** Operation has completed but ran into some error state. */
  Failed = "Failed",
  /** Operation has been canceled by the user. */
  Canceled = "Canceled",
}

/**
 * Specifies the operation status for failover and validation. \
 * {@link KnownRecoveryOperationStatus} can be used interchangeably with RecoveryOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Operation has not started or ran. \
 * **ValidationInProgress**: Operation is in the process of being validated. \
 * **InProgress**: Operation is in progress. \
 * **Succeeded**: Operation has completed successfully. \
 * **CompletedWithWarning**: Operation has completed but ran into some warning state. \
 * **ValidationFailed**: Operation has completed but ran into some validation error state. \
 * **Failed**: Operation has completed but ran into some error state. \
 * **Canceled**: Operation has been canceled by the user.
 */
export type RecoveryOperationStatus = string;

/** Details of the recovery orchestration plan operation execution. */
export interface RecoveryPlanOperationStatus {
  /** The most recent execution time of the recovery orchestration plan in UTC. */
  readonly lastExecutedAt?: Date;
  /** The status of the most recent execution of the recovery orchestration plan. */
  readonly operationStatus?: RecoveryOperationStatus;
  /** Error details for the most recent execution of the recovery orchestration plan. */
  readonly errorDetails?: ErrorDetail;
}

export function recoveryPlanOperationStatusDeserializer(item: any): RecoveryPlanOperationStatus {
  return {
    lastExecutedAt: !item["lastExecutedAt"]
      ? item["lastExecutedAt"]
      : new Date(item["lastExecutedAt"]),
    operationStatus: item["operationStatus"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The response of a RecoveryPlan list operation. */
export interface _RecoveryPlanListResult {
  /** The RecoveryPlan items on this page */
  value: RecoveryPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryPlanListResultDeserializer(item: any): _RecoveryPlanListResult {
  return {
    value: recoveryPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryPlanArraySerializer(result: Array<RecoveryPlan>): any[] {
  return result.map((item) => {
    return recoveryPlanSerializer(item);
  });
}

export function recoveryPlanArrayDeserializer(result: Array<RecoveryPlan>): any[] {
  return result.map((item) => {
    return recoveryPlanDeserializer(item);
  });
}

/** Azure operation completed successfully. */
export interface ArmResponseErrorResponse {
  /** The body type of the operation request or response. */
  body: ErrorResponse;
}

export function armResponseErrorResponseDeserializer(item: any): ArmResponseErrorResponse {
  return {
    body: errorResponseDeserializer(item["body"]),
  };
}

/** RecoveryResources post action request to update in batch. */
export interface UpdateRecoveryResourcesRequest {
  /** A list of recovery orchestration resources whose properties need to be updated. */
  resourcesToUpdate?: RecoveryResource[];
  /** A list of recovery orchestration resources that need to be removed from the recovery orchestration plan. */
  resourcesToRemove?: string[];
}

export function updateRecoveryResourcesRequestSerializer(
  item: UpdateRecoveryResourcesRequest,
): any {
  return {
    resourcesToUpdate: !item["resourcesToUpdate"]
      ? item["resourcesToUpdate"]
      : recoveryResourceArraySerializer(item["resourcesToUpdate"]),
    resourcesToRemove: !item["resourcesToRemove"]
      ? item["resourcesToRemove"]
      : item["resourcesToRemove"].map((p: any) => {
          return p;
        }),
  };
}

export function recoveryResourceArraySerializer(result: Array<RecoveryResource>): any[] {
  return result.map((item) => {
    return recoveryResourceSerializer(item);
  });
}

export function recoveryResourceArrayDeserializer(result: Array<RecoveryResource>): any[] {
  return result.map((item) => {
    return recoveryResourceDeserializer(item);
  });
}

/** RecoveryPlan Resource a AzureResilienceProviderHub resource */
export interface RecoveryResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryResourceProperties;
}

export function recoveryResourceSerializer(item: RecoveryResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : recoveryResourcePropertiesSerializer(item["properties"]),
  };
}

export function recoveryResourceDeserializer(item: any): RecoveryResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Definition of recovery orchestration resource property associated with recovery orchestration plan. */
export interface RecoveryResourceProperties {
  /** A unique id for the recovery resource, which is a GUID. */
  recoveryResourceUniqueId: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Resource ID of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly resourceId?: string;
  /** Original location of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly resourceLocation?: string;
  /** Physical zones of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly resourcePhysicalZones?: string[];
  /** A state that indicates the resource status with respect to the recovery orchestration plan. */
  inclusionState?: ResourceInclusionState;
  /** Indicating if resource needs user attention and action, details will be found in attentionReasons */
  readonly needsAttention?: boolean;
  /** Reason for the resource to be in need of attention */
  readonly attentionReasons?: string[];
  /** A status that indicates the protection status of a resource with an Azure solution for regional or zonal recovery. */
  readonly protectionStatus?: ResourceProtectionStatus;
  /** A list of ResourceProtectionSolutions with which the recovery orchestration resource is protected. */
  readonly resourceProtectionSolutions?: ResourceProtectionSolutionSettings[];
  /** A setting that indicates the protection solution selected. */
  selectedProtectionSolutionType?: ResourceProtectionSolutionType;
  /** Resource protection solution settings of the protection solutions recovery orchestration resource is protected with. */
  selectedProtectionSolutionSetting?: ResourceBaseProtectionSolutionSettingUnion;
  /** The recovery orchestration group id associated with the recovery resources. */
  recoveryGroupId?: string;
  /** Identity details associated to the resource, which will be used for performing any operations on it */
  associatedIdentity?: AssociatedIdentity;
  /** Error details associated with the resource. */
  readonly errorDetails?: ErrorDetail;
}

export function recoveryResourcePropertiesSerializer(item: RecoveryResourceProperties): any {
  return {
    recoveryResourceUniqueId: item["recoveryResourceUniqueId"],
    inclusionState: item["inclusionState"],
    selectedProtectionSolutionType: item["selectedProtectionSolutionType"],
    selectedProtectionSolutionSetting: !item["selectedProtectionSolutionSetting"]
      ? item["selectedProtectionSolutionSetting"]
      : resourceBaseProtectionSolutionSettingUnionSerializer(
          item["selectedProtectionSolutionSetting"],
        ),
    recoveryGroupId: item["recoveryGroupId"],
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : associatedIdentitySerializer(item["associatedIdentity"]),
  };
}

export function recoveryResourcePropertiesDeserializer(item: any): RecoveryResourceProperties {
  return {
    recoveryResourceUniqueId: item["recoveryResourceUniqueId"],
    provisioningState: item["provisioningState"],
    resourceId: item["resourceId"],
    resourceLocation: item["resourceLocation"],
    resourcePhysicalZones: !item["resourcePhysicalZones"]
      ? item["resourcePhysicalZones"]
      : item["resourcePhysicalZones"].map((p: any) => {
          return p;
        }),
    inclusionState: item["inclusionState"],
    needsAttention: item["needsAttention"],
    attentionReasons: !item["attentionReasons"]
      ? item["attentionReasons"]
      : item["attentionReasons"].map((p: any) => {
          return p;
        }),
    protectionStatus: item["protectionStatus"],
    resourceProtectionSolutions: !item["resourceProtectionSolutions"]
      ? item["resourceProtectionSolutions"]
      : resourceProtectionSolutionSettingsArrayDeserializer(item["resourceProtectionSolutions"]),
    selectedProtectionSolutionType: item["selectedProtectionSolutionType"],
    selectedProtectionSolutionSetting: !item["selectedProtectionSolutionSetting"]
      ? item["selectedProtectionSolutionSetting"]
      : resourceBaseProtectionSolutionSettingUnionDeserializer(
          item["selectedProtectionSolutionSetting"],
        ),
    recoveryGroupId: item["recoveryGroupId"],
    associatedIdentity: !item["associatedIdentity"]
      ? item["associatedIdentity"]
      : associatedIdentityDeserializer(item["associatedIdentity"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** A state type that indicates inclusion of the resource with respect to the resiliency support. */
export enum KnownResourceInclusionState {
  /** A state that indicates the resource is included. */
  Included = "Included",
  /** A state that indicates the resource is excluded. */
  Excluded = "Excluded",
}

/**
 * A state type that indicates inclusion of the resource with respect to the resiliency support. \
 * {@link KnownResourceInclusionState} can be used interchangeably with ResourceInclusionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Included**: A state that indicates the resource is included. \
 * **Excluded**: A state that indicates the resource is excluded.
 */
export type ResourceInclusionState = string;

/** A state type that indicates the protection status of a resource with an Azure solution for regional or zonal recovery. */
export enum KnownResourceProtectionStatus {
  /** The protection status of the resource is unknown. */
  Unknown = "Unknown",
  /** A state indicating that the resource is protected by the recovery solution. */
  Protected = "Protected",
  /** A state indicating that the resource is not protected by any recovery solution. */
  NotProtected = "NotProtected",
  /** A state indicating that the resource is protected by the highly available recovery solution. */
  HighlyAvailable = "HighlyAvailable",
}

/**
 * A state type that indicates the protection status of a resource with an Azure solution for regional or zonal recovery. \
 * {@link KnownResourceProtectionStatus} can be used interchangeably with ResourceProtectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The protection status of the resource is unknown. \
 * **Protected**: A state indicating that the resource is protected by the recovery solution. \
 * **NotProtected**: A state indicating that the resource is not protected by any recovery solution. \
 * **HighlyAvailable**: A state indicating that the resource is protected by the highly available recovery solution.
 */
export type ResourceProtectionStatus = string;

export function resourceProtectionSolutionSettingsArrayDeserializer(
  result: Array<ResourceProtectionSolutionSettings>,
): any[] {
  return result.map((item) => {
    return resourceProtectionSolutionSettingsDeserializer(item);
  });
}

/** Definition of recovery resource resource protection solution settings. */
export interface ResourceProtectionSolutionSettings {
  /** A setting that indicates the resource protected with which recovery solution. */
  readonly protectionSolutionType?: ResourceProtectionSolutionType;
  /** A status that indicates the protection status of a resource with an Azure solution for regional or zonal recovery. */
  readonly protectionStatus?: ResourceProtectionStatus;
  /** Resource ID of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly resourceId?: string;
  /** Active location of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly activeLocation?: string;
  /** Active locations of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly activeLocations?: string[];
  /** Active Resource location and physical zones of Azure Resource. */
  readonly activePhysicalZones?: string[];
  /** List of recovery locations of the Azure resource associated with the recovery orchestration plan and linked to the recovery resource. */
  readonly recoveryLocations?: string[];
  /** Specifies the role of the resource in the replication process. */
  readonly replicationRole?: ResourceReplicationRole;
  /** Primary resource which is getting replicated. */
  readonly primaryResource?: string;
  /** List of Replica resources to which replication is happening. */
  readonly replicaResources?: string[];
  /** Is AutoFailover configured for the resource replication. */
  readonly isAutoFailover: boolean;
  /** Failover state of the recovery orchestration resource. */
  readonly failoverState?: FailoverState;
  /** TestFailover state of the recovery orchestration resource. */
  readonly testFailoverState?: TestFailoverState;
}

export function resourceProtectionSolutionSettingsDeserializer(
  item: any,
): ResourceProtectionSolutionSettings {
  return {
    protectionSolutionType: item["protectionSolutionType"],
    protectionStatus: item["protectionStatus"],
    resourceId: item["resourceId"],
    activeLocation: item["activeLocation"],
    activeLocations: !item["activeLocations"]
      ? item["activeLocations"]
      : item["activeLocations"].map((p: any) => {
          return p;
        }),
    activePhysicalZones: !item["activePhysicalZones"]
      ? item["activePhysicalZones"]
      : item["activePhysicalZones"].map((p: any) => {
          return p;
        }),
    recoveryLocations: !item["recoveryLocations"]
      ? item["recoveryLocations"]
      : item["recoveryLocations"].map((p: any) => {
          return p;
        }),
    replicationRole: item["replicationRole"],
    primaryResource: item["primaryResource"],
    replicaResources: !item["replicaResources"]
      ? item["replicaResources"]
      : item["replicaResources"].map((p: any) => {
          return p;
        }),
    isAutoFailover: item["isAutoFailover"],
    failoverState: item["failoverState"],
    testFailoverState: item["testFailoverState"],
  };
}

/** Protection solution type for the resources by which recovery takes place */
export enum KnownResourceProtectionSolutionType {
  /** Resource is not protected with any protection solution. */
  None = "None",
  /** Resource is protected with the Azure native solution provided by the native Azure service. */
  AzureNative = "AzureNative",
  /** Resource protected with the Azure solution provided by the native Azure Site Service for Azure VMs. */
  AzureSiteRecovery = "AzureSiteRecovery",
  /** Cross zone recovery enabled Azure VMs. */
  CrossZoneVMRecovery = "CrossZoneVMRecovery",
  /** Resource is not protected with native solution and using custom runbook automation scripts for recovery verbs. */
  CustomRunbook = "CustomRunbook",
}

/**
 * Protection solution type for the resources by which recovery takes place \
 * {@link KnownResourceProtectionSolutionType} can be used interchangeably with ResourceProtectionSolutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Resource is not protected with any protection solution. \
 * **AzureNative**: Resource is protected with the Azure native solution provided by the native Azure service. \
 * **AzureSiteRecovery**: Resource protected with the Azure solution provided by the native Azure Site Service for Azure VMs. \
 * **CrossZoneVMRecovery**: Cross zone recovery enabled Azure VMs. \
 * **CustomRunbook**: Resource is not protected with native solution and using custom runbook automation scripts for recovery verbs.
 */
export type ResourceProtectionSolutionType = string;

/** A state specific to the resource that helps identify its role in replication. */
export enum KnownResourceReplicationRole {
  /** The role of the resource is unknown. */
  Unknown = "Unknown",
  /** A state indicating that the resource is primary and actively replicating data to other replicas. */
  Primary = "Primary",
  /** A state indicating that the resource is a replica, receiving data from the primary. */
  Replica = "Replica",
}

/**
 * A state specific to the resource that helps identify its role in replication. \
 * {@link KnownResourceReplicationRole} can be used interchangeably with ResourceReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The role of the resource is unknown. \
 * **Primary**: A state indicating that the resource is primary and actively replicating data to other replicas. \
 * **Replica**: A state indicating that the resource is a replica, receiving data from the primary.
 */
export type ResourceReplicationRole = string;

/** A state specific to the resource that helps identify its Failover state. */
export enum KnownFailoverState {
  /** The resource is Not in failedOver state. */
  None = "None",
  /** The resource is in failed-over state. */
  FailedOver = "FailedOver",
  /** The resource is in failover commit pending state. */
  FailedOverCommitPending = "FailedOverCommitPending",
  /** The resource is in reprotect pending state. */
  FailedOverReprotectPending = "FailedOverReprotectPending",
}

/**
 * A state specific to the resource that helps identify its Failover state. \
 * {@link KnownFailoverState} can be used interchangeably with FailoverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The resource is Not in failedOver state. \
 * **FailedOver**: The resource is in failed-over state. \
 * **FailedOverCommitPending**: The resource is in failover commit pending state. \
 * **FailedOverReprotectPending**: The resource is in reprotect pending state.
 */
export type FailoverState = string;

/** A state specific to the resource that helps identify its TestFailover state. */
export enum KnownTestFailoverState {
  /** The resource is Not in TestFailedOver state (No test failover cleanup pending). */
  None = "None",
  /** he resource is in test failover cleanup pending state. */
  TestFailoverCleanupPending = "TestFailoverCleanupPending",
}

/**
 * A state specific to the resource that helps identify its TestFailover state. \
 * {@link KnownTestFailoverState} can be used interchangeably with TestFailoverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The resource is Not in TestFailedOver state (No test failover cleanup pending). \
 * **TestFailoverCleanupPending**: he resource is in test failover cleanup pending state.
 */
export type TestFailoverState = string;

/** Definition of recovery orchestration resource protection solution setting with recovery orchestration plan. */
export interface ResourceBaseProtectionSolutionSetting {
  /** A setting that indicates the resource protected with which recovery solution. */
  /** The discriminator possible values: AzureNative, CustomRunbook, AzureSiteRecovery */
  protectionSolutionType: ResourceProtectionSolutionType;
}

export function resourceBaseProtectionSolutionSettingSerializer(
  item: ResourceBaseProtectionSolutionSetting,
): any {
  return { protectionSolutionType: item["protectionSolutionType"] };
}

export function resourceBaseProtectionSolutionSettingDeserializer(
  item: any,
): ResourceBaseProtectionSolutionSetting {
  return {
    protectionSolutionType: item["protectionSolutionType"],
  };
}

/** Alias for ResourceBaseProtectionSolutionSettingUnion */
export type ResourceBaseProtectionSolutionSettingUnion =
  | ResourceNativeProtectionSolutionSetting
  | ResourceCustomProtectionSetting
  | ResourceSiteRecoveryProtectionSetting
  | ResourceBaseProtectionSolutionSetting;

export function resourceBaseProtectionSolutionSettingUnionSerializer(
  item: ResourceBaseProtectionSolutionSettingUnion,
): any {
  switch (item.protectionSolutionType) {
    case "AzureNative":
      return resourceNativeProtectionSolutionSettingSerializer(
        item as ResourceNativeProtectionSolutionSetting,
      );

    case "CustomRunbook":
      return resourceCustomProtectionSettingSerializer(item as ResourceCustomProtectionSetting);

    case "AzureSiteRecovery":
      return resourceSiteRecoveryProtectionSettingSerializer(
        item as ResourceSiteRecoveryProtectionSetting,
      );

    default:
      return resourceBaseProtectionSolutionSettingSerializer(item);
  }
}

export function resourceBaseProtectionSolutionSettingUnionDeserializer(
  item: any,
): ResourceBaseProtectionSolutionSettingUnion {
  switch (item["protectionSolutionType"]) {
    case "AzureNative":
      return resourceNativeProtectionSolutionSettingDeserializer(
        item as ResourceNativeProtectionSolutionSetting,
      );

    case "CustomRunbook":
      return resourceCustomProtectionSettingDeserializer(item as ResourceCustomProtectionSetting);

    case "AzureSiteRecovery":
      return resourceSiteRecoveryProtectionSettingDeserializer(
        item as ResourceSiteRecoveryProtectionSetting,
      );

    default:
      return resourceBaseProtectionSolutionSettingDeserializer(item);
  }
}

/** Definition of recovery orchestration resource native protection solution setting with recovery orchestration plan. */
export interface ResourceNativeProtectionSolutionSetting extends ResourceBaseProtectionSolutionSetting {
  /** A setting that indicates the resource protected with which recovery solution. */
  protectionSolutionType: "AzureNative";
}

export function resourceNativeProtectionSolutionSettingSerializer(
  item: ResourceNativeProtectionSolutionSetting,
): any {
  return { protectionSolutionType: item["protectionSolutionType"] };
}

export function resourceNativeProtectionSolutionSettingDeserializer(
  item: any,
): ResourceNativeProtectionSolutionSetting {
  return {
    protectionSolutionType: item["protectionSolutionType"],
  };
}

/** Definition of recovery orchestration resource custom protection setting with recovery orchestration plan. */
export interface ResourceCustomProtectionSetting extends ResourceBaseProtectionSolutionSetting {
  protectionSolutionType: "CustomRunbook";
  /** The Azure resource ID hosting the failover automation script. */
  failoverAction?: ResourceCustomProtectionAction;
  /** The Azure resource ID hosting the failover commit automation script. */
  failoverCommitAction?: ResourceCustomProtectionAction;
  /** The Azure resource ID hosting the test failover automation script. */
  testFailoverAction?: ResourceCustomProtectionAction;
  /** The Azure resource ID hosting the test failover cleanup automation script. */
  testFailoverCleanupAction?: ResourceCustomProtectionAction;
  /** The Azure resource ID hosting the reprotect automation script. */
  reprotectAction?: ResourceCustomProtectionAction;
}

export function resourceCustomProtectionSettingSerializer(
  item: ResourceCustomProtectionSetting,
): any {
  return {
    protectionSolutionType: item["protectionSolutionType"],
    failoverAction: !item["failoverAction"]
      ? item["failoverAction"]
      : resourceCustomProtectionActionSerializer(item["failoverAction"]),
    failoverCommitAction: !item["failoverCommitAction"]
      ? item["failoverCommitAction"]
      : resourceCustomProtectionActionSerializer(item["failoverCommitAction"]),
    testFailoverAction: !item["testFailoverAction"]
      ? item["testFailoverAction"]
      : resourceCustomProtectionActionSerializer(item["testFailoverAction"]),
    testFailoverCleanupAction: !item["testFailoverCleanupAction"]
      ? item["testFailoverCleanupAction"]
      : resourceCustomProtectionActionSerializer(item["testFailoverCleanupAction"]),
    reprotectAction: !item["reprotectAction"]
      ? item["reprotectAction"]
      : resourceCustomProtectionActionSerializer(item["reprotectAction"]),
  };
}

export function resourceCustomProtectionSettingDeserializer(
  item: any,
): ResourceCustomProtectionSetting {
  return {
    protectionSolutionType: item["protectionSolutionType"],
    failoverAction: !item["failoverAction"]
      ? item["failoverAction"]
      : resourceCustomProtectionActionDeserializer(item["failoverAction"]),
    failoverCommitAction: !item["failoverCommitAction"]
      ? item["failoverCommitAction"]
      : resourceCustomProtectionActionDeserializer(item["failoverCommitAction"]),
    testFailoverAction: !item["testFailoverAction"]
      ? item["testFailoverAction"]
      : resourceCustomProtectionActionDeserializer(item["testFailoverAction"]),
    testFailoverCleanupAction: !item["testFailoverCleanupAction"]
      ? item["testFailoverCleanupAction"]
      : resourceCustomProtectionActionDeserializer(item["testFailoverCleanupAction"]),
    reprotectAction: !item["reprotectAction"]
      ? item["reprotectAction"]
      : resourceCustomProtectionActionDeserializer(item["reprotectAction"]),
  };
}

/** Definition of recovery resource custom action setting with Recovery Orchestration Plan. */
export interface ResourceCustomProtectionAction {
  /** The Azure resource ID hosting the custom action automation script. */
  resourceId: string;
}

export function resourceCustomProtectionActionSerializer(
  item: ResourceCustomProtectionAction,
): any {
  return { resourceId: item["resourceId"] };
}

export function resourceCustomProtectionActionDeserializer(
  item: any,
): ResourceCustomProtectionAction {
  return {
    resourceId: item["resourceId"],
  };
}

/** Definition of recovery orchestration resource protection with azure site recovery. */
export interface ResourceSiteRecoveryProtectionSetting extends ResourceBaseProtectionSolutionSetting {
  protectionSolutionType: "AzureSiteRecovery";
  /** Test failover params for azure site recovery solution. */
  testFailoverParams?: ResourceSiteRecoveryTestFailoverParams;
  /** Test failover params for azure site recovery solution. */
  testFailoverCleanupParams?: ResourceSiteRecoveryTestFailoverCleanupParams;
  /** Reprotect params for azure site recovery solution. */
  reprotectParams?: ResourceSiteRecoveryReprotectParams;
}

export function resourceSiteRecoveryProtectionSettingSerializer(
  item: ResourceSiteRecoveryProtectionSetting,
): any {
  return {
    protectionSolutionType: item["protectionSolutionType"],
    testFailoverParams: !item["testFailoverParams"]
      ? item["testFailoverParams"]
      : resourceSiteRecoveryTestFailoverParamsSerializer(item["testFailoverParams"]),
    testFailoverCleanupParams: !item["testFailoverCleanupParams"]
      ? item["testFailoverCleanupParams"]
      : resourceSiteRecoveryTestFailoverCleanupParamsSerializer(item["testFailoverCleanupParams"]),
    reprotectParams: !item["reprotectParams"]
      ? item["reprotectParams"]
      : resourceSiteRecoveryReprotectParamsSerializer(item["reprotectParams"]),
  };
}

export function resourceSiteRecoveryProtectionSettingDeserializer(
  item: any,
): ResourceSiteRecoveryProtectionSetting {
  return {
    protectionSolutionType: item["protectionSolutionType"],
    testFailoverParams: !item["testFailoverParams"]
      ? item["testFailoverParams"]
      : resourceSiteRecoveryTestFailoverParamsDeserializer(item["testFailoverParams"]),
    testFailoverCleanupParams: !item["testFailoverCleanupParams"]
      ? item["testFailoverCleanupParams"]
      : resourceSiteRecoveryTestFailoverCleanupParamsDeserializer(
          item["testFailoverCleanupParams"],
        ),
    reprotectParams: !item["reprotectParams"]
      ? item["reprotectParams"]
      : resourceSiteRecoveryReprotectParamsDeserializer(item["reprotectParams"]),
  };
}

/** Definition of recovery resource failover params for site recovery solution. */
export interface ResourceSiteRecoveryTestFailoverParams {
  /** The Azure network resource is which will be used for test failover virtual machine. */
  networkResourceId?: string;
}

export function resourceSiteRecoveryTestFailoverParamsSerializer(
  item: ResourceSiteRecoveryTestFailoverParams,
): any {
  return { networkResourceId: item["networkResourceId"] };
}

export function resourceSiteRecoveryTestFailoverParamsDeserializer(
  item: any,
): ResourceSiteRecoveryTestFailoverParams {
  return {
    networkResourceId: item["networkResourceId"],
  };
}

/** Definition of recovery resource reprotect params for site recovery solution. */
export interface ResourceSiteRecoveryTestFailoverCleanupParams {
  /** Comments for testfailover cleanup */
  comments?: string;
}

export function resourceSiteRecoveryTestFailoverCleanupParamsSerializer(
  item: ResourceSiteRecoveryTestFailoverCleanupParams,
): any {
  return { comments: item["comments"] };
}

export function resourceSiteRecoveryTestFailoverCleanupParamsDeserializer(
  item: any,
): ResourceSiteRecoveryTestFailoverCleanupParams {
  return {
    comments: item["comments"],
  };
}

/** Definition of recovery resource reprotect params for site recovery solution. */
export interface ResourceSiteRecoveryReprotectParams {
  /** Disk Reprotect Input Details */
  diskReprotectInputDetails?: DiskReprotectInputDetails[];
}

export function resourceSiteRecoveryReprotectParamsSerializer(
  item: ResourceSiteRecoveryReprotectParams,
): any {
  return {
    diskReprotectInputDetails: !item["diskReprotectInputDetails"]
      ? item["diskReprotectInputDetails"]
      : diskReprotectInputDetailsArraySerializer(item["diskReprotectInputDetails"]),
  };
}

export function resourceSiteRecoveryReprotectParamsDeserializer(
  item: any,
): ResourceSiteRecoveryReprotectParams {
  return {
    diskReprotectInputDetails: !item["diskReprotectInputDetails"]
      ? item["diskReprotectInputDetails"]
      : diskReprotectInputDetailsArrayDeserializer(item["diskReprotectInputDetails"]),
  };
}

export function diskReprotectInputDetailsArraySerializer(
  result: Array<DiskReprotectInputDetails>,
): any[] {
  return result.map((item) => {
    return diskReprotectInputDetailsSerializer(item);
  });
}

export function diskReprotectInputDetailsArrayDeserializer(
  result: Array<DiskReprotectInputDetails>,
): any[] {
  return result.map((item) => {
    return diskReprotectInputDetailsDeserializer(item);
  });
}

/** Disk Reprotect Input Details */
export interface DiskReprotectInputDetails {
  /** Disk Resource Id to Reprotect */
  diskResourceId?: string;
  /** The staging StorageAccount Resource Id. */
  stagingStorageAccountResourceId?: string;
}

export function diskReprotectInputDetailsSerializer(item: DiskReprotectInputDetails): any {
  return {
    diskResourceId: item["diskResourceId"],
    stagingStorageAccountResourceId: item["stagingStorageAccountResourceId"],
  };
}

export function diskReprotectInputDetailsDeserializer(item: any): DiskReprotectInputDetails {
  return {
    diskResourceId: item["diskResourceId"],
    stagingStorageAccountResourceId: item["stagingStorageAccountResourceId"],
  };
}

/** RecoveryResources post action request to update in batch. */
export interface UpdateRecoveryResourcesResponse {
  /** A list of error details associated with resources for which the update has failed. */
  failedResources?: RecoveryResource[];
}

export function updateRecoveryResourcesResponseDeserializer(
  item: any,
): UpdateRecoveryResourcesResponse {
  return {
    failedResources: !item["failedResources"]
      ? item["failedResources"]
      : recoveryResourceArrayDeserializer(item["failedResources"]),
  };
}

/** ValidateForOperation post action request to check if operation can be performed. */
export interface ValidateForOperationRequest {
  /** Operation Name to validate. */
  operationName: RecoveryOperationNames;
}

export function validateForOperationRequestSerializer(item: ValidateForOperationRequest): any {
  return { operationName: item["operationName"] };
}

/** Defines the set of operations that can be executed on a Recovery Orchestration Plan. These operations are applicable only to resources that meet the qualification criteria. */
export enum KnownRecoveryOperationNames {
  /** Initiates a failover process to recover eligible resources to the target location. */
  Failover = "Failover",
  /** Commits the failover for resources that require an explicit commit after recovery. */
  FailoverCommit = "FailoverCommit",
  /** Performs re-protection or configuration changes for resources that have failed over, as required. */
  Reprotect = "Reprotect",
  /** Initiates a test failover process for qualified resources and those that support test failover. */
  TestFailover = "TestFailover",
  /** Cleans up resources and configurations created during a test failover, as required. */
  TestFailoverCleanup = "TestFailoverCleanup",
}

/**
 * Defines the set of operations that can be executed on a Recovery Orchestration Plan. These operations are applicable only to resources that meet the qualification criteria. \
 * {@link KnownRecoveryOperationNames} can be used interchangeably with RecoveryOperationNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failover**: Initiates a failover process to recover eligible resources to the target location. \
 * **FailoverCommit**: Commits the failover for resources that require an explicit commit after recovery. \
 * **Reprotect**: Performs re-protection or configuration changes for resources that have failed over, as required. \
 * **TestFailover**: Initiates a test failover process for qualified resources and those that support test failover. \
 * **TestFailoverCleanup**: Cleans up resources and configurations created during a test failover, as required.
 */
export type RecoveryOperationNames = string;

/** Failover post action request. */
export interface FailoverRequest {
  /** Type of Failover direction. */
  failoverDirection: FailoverDirectionTypes;
  /** Additional properties for Failover. */
  failoverRequestProperties?: FailoverRequestProperties;
}

export function failoverRequestSerializer(item: FailoverRequest): any {
  return {
    failoverDirection: item["failoverDirection"],
    failoverRequestProperties: !item["failoverRequestProperties"]
      ? item["failoverRequestProperties"]
      : failoverRequestPropertiesSerializer(item["failoverRequestProperties"]),
  };
}

/** Types of Failover directions. */
export enum KnownFailoverDirectionTypes {
  /** Failover resources from specific locations. */
  FromSpecificLocations = "FromSpecificLocations",
}

/**
 * Types of Failover directions. \
 * {@link KnownFailoverDirectionTypes} can be used interchangeably with FailoverDirectionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FromSpecificLocations**: Failover resources from specific locations.
 */
export type FailoverDirectionTypes = string;

/** Additional properties for Failover. */
export interface FailoverRequestProperties {
  /** Source locations from where resources to be failed-over. */
  sourceLocations: string[];
  /** Selected recovery resource Ids to be processed. If not provided, all qualified resources based on the source location(s) will be processed. */
  selectedResourceIds?: string[];
  /** Execution configurations for the recovery action. */
  executionConfigurations?: ExecutionConfigurations;
}

export function failoverRequestPropertiesSerializer(item: FailoverRequestProperties): any {
  return {
    sourceLocations: item["sourceLocations"].map((p: any) => {
      return p;
    }),
    selectedResourceIds: !item["selectedResourceIds"]
      ? item["selectedResourceIds"]
      : item["selectedResourceIds"].map((p: any) => {
          return p;
        }),
    executionConfigurations: !item["executionConfigurations"]
      ? item["executionConfigurations"]
      : executionConfigurationsSerializer(item["executionConfigurations"]),
  };
}

/** Execution configurations for recovery action. */
export interface ExecutionConfigurations {
  /** User consent for performing recovery action. */
  userConsent: UserConsent;
}

export function executionConfigurationsSerializer(item: ExecutionConfigurations): any {
  return { userConsent: item["userConsent"] };
}

export function executionConfigurationsDeserializer(item: any): ExecutionConfigurations {
  return {
    userConsent: item["userConsent"],
  };
}

/** User consent for performing recovery action. */
export enum KnownUserConsent {
  /** User consent is not specified for the operation. */
  Unspecified = "Unspecified",
  /** Action is allowed with user consent. */
  Allowed = "Allowed",
}

/**
 * User consent for performing recovery action. \
 * {@link KnownUserConsent} can be used interchangeably with UserConsent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unspecified**: User consent is not specified for the operation. \
 * **Allowed**: Action is allowed with user consent.
 */
export type UserConsent = string;

/** ValidateForRecoveryOperation post action response. */
export interface ValidateForRecoveryOperationBaseResponse {
  /** Qualification details of resources for the operation. */
  recoveryResourceQualifications: RecoveryResourceQualification[];
}

export function validateForRecoveryOperationBaseResponseDeserializer(
  item: any,
): ValidateForRecoveryOperationBaseResponse {
  return {
    recoveryResourceQualifications: recoveryResourceQualificationArrayDeserializer(
      item["recoveryResourceQualifications"],
    ),
  };
}

export function recoveryResourceQualificationArrayDeserializer(
  result: Array<RecoveryResourceQualification>,
): any[] {
  return result.map((item) => {
    return recoveryResourceQualificationDeserializer(item);
  });
}

/** Details of resource and its qualification for an operation */
export interface RecoveryResourceQualification {
  /** Recovery orchestration resource. */
  recoveryResource: RecoveryResource;
  /** Details of qualification for the operation. */
  operationQualificationDetails: OperationQualificationDetails;
}

export function recoveryResourceQualificationDeserializer(
  item: any,
): RecoveryResourceQualification {
  return {
    recoveryResource: recoveryResourceDeserializer(item["recoveryResource"]),
    operationQualificationDetails: operationQualificationDetailsDeserializer(
      item["operationQualificationDetails"],
    ),
  };
}

/** Details of qualification for an operation. */
export interface OperationQualificationDetails {
  /** Resource qualification state for the operation. */
  qualificationState: QualificationState;
  /** Reasons for resource not qualified for the operation. */
  notQualifiedReasons?: string[];
}

export function operationQualificationDetailsDeserializer(
  item: any,
): OperationQualificationDetails {
  return {
    qualificationState: item["qualificationState"],
    notQualifiedReasons: !item["notQualifiedReasons"]
      ? item["notQualifiedReasons"]
      : item["notQualifiedReasons"].map((p: any) => {
          return p;
        }),
  };
}

/** A state type that indicates qualification of a resource for an operation. */
export enum KnownQualificationState {
  /** A state that indicates the qualification state is unknown. */
  Unknown = "Unknown",
  /** A state that indicates the resource is qualified for the operation. */
  Qualified = "Qualified",
  /** A state that indicates the resource is not qualified for the operation. */
  NotQualified = "NotQualified",
  /** A state that indicates the resource is excluded from the recovery plan itself. */
  Excluded = "Excluded",
}

/**
 * A state type that indicates qualification of a resource for an operation. \
 * {@link KnownQualificationState} can be used interchangeably with QualificationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: A state that indicates the qualification state is unknown. \
 * **Qualified**: A state that indicates the resource is qualified for the operation. \
 * **NotQualified**: A state that indicates the resource is not qualified for the operation. \
 * **Excluded**: A state that indicates the resource is excluded from the recovery plan itself.
 */
export type QualificationState = string;

/** Reprotect post action request. */
export interface ReprotectRequest {
  /** Additional properties for Reprotect. */
  reprotectRequestProperties?: ReprotectRequestProperties;
}

export function reprotectRequestSerializer(item: ReprotectRequest): any {
  return {
    reprotectRequestProperties: !item["reprotectRequestProperties"]
      ? item["reprotectRequestProperties"]
      : reprotectRequestPropertiesSerializer(item["reprotectRequestProperties"]),
  };
}

/** Additional properties for Reprotect. */
export interface ReprotectRequestProperties {
  /** Selected recovery resource Ids to be processed. If not provided, all qualified resources will be processed. */
  selectedResourceIds?: string[];
}

export function reprotectRequestPropertiesSerializer(item: ReprotectRequestProperties): any {
  return {
    selectedResourceIds: !item["selectedResourceIds"]
      ? item["selectedResourceIds"]
      : item["selectedResourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Recovery Orchestration Plan post action response. */
export interface RecoveryPlanActionBaseResponse {
  /** JobId of the job triggered for Recovery Orchestration Plan. */
  jobId: string;
}

export function recoveryPlanActionBaseResponseDeserializer(
  item: any,
): RecoveryPlanActionBaseResponse {
  return {
    jobId: item["jobId"],
  };
}

/** TestFailoverCleanup post action request. */
export interface TestFailoverCleanupRequest {
  /** Comments for test failover cleanup. */
  comments?: string;
}

export function testFailoverCleanupRequestSerializer(item: TestFailoverCleanupRequest): any {
  return { comments: item["comments"] };
}

/** The response of a RecoveryResource list operation. */
export interface _RecoveryResourceListResult {
  /** The RecoveryResource items on this page */
  value: RecoveryResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryResourceListResultDeserializer(item: any): _RecoveryResourceListResult {
  return {
    value: recoveryResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Represents a recovery job resource in the Azure Resilience Management provider namespace. */
export interface RecoveryJob extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryJobProperties;
}

export function recoveryJobDeserializer(item: any): RecoveryJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryJobPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of recovery job associated with Recovery Orchestration Plan. */
export interface RecoveryJobProperties extends JobProperties {
  /** Discriminator for the Job object hierarchy. */
  jobType: "RecoveryPlan";
  /** The provisioning state of the recovery job. */
  readonly provisioningState?: ProvisioningState;
}

export function recoveryJobPropertiesDeserializer(item: any): RecoveryJobProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobType: item["jobType"],
    executionConfigurations: !item["executionConfigurations"]
      ? item["executionConfigurations"]
      : executionConfigurationsDeserializer(item["executionConfigurations"]),
    triggeredBy: item["triggeredBy"],
    provisioningState: item["provisioningState"],
  };
}

/** Definition of a job, including its type, status, timing, and additional details. */
export interface JobProperties {
  /** The current status of the job execution. */
  readonly status?: JobStatus;
  /** The start time of the job execution. */
  readonly startTime?: Date;
  /** The end time of the job execution. */
  readonly endTime?: Date;
  /** The time elapsed during the execution of this job. */
  readonly duration?: string;
  /** Details of any errors that occurred during the execution of this job. */
  errorDetails?: JobErrorInfo;
  /** The resource for which this job was created. This is typically the resource that the job is intended to manage or operate on. */
  readonly resourceId?: string;
  /** The operation that this job is intended to perform. */
  readonly operation?: string;
  /** Details of any retries that have been attempted for this job. */
  retryDetails?: JobRetryDetails[];
  /** Additional information about the job. */
  jobExtendedInfo?: JobExtendedInfo;
  /** User Comments. */
  readonly userComments?: JobUserComment[];
  /** The type of job. */
  /** The discriminator possible values: RecoveryPlan, DrillRun */
  readonly jobType?: JobType;
  /** Execution configurations for the job. */
  readonly executionConfigurations?: ExecutionConfigurations;
  /** Indicates whether the job was triggered by the system or a user. */
  readonly triggeredBy?: JobTriggeredBy;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobType: item["jobType"],
    executionConfigurations: !item["executionConfigurations"]
      ? item["executionConfigurations"]
      : executionConfigurationsDeserializer(item["executionConfigurations"]),
    triggeredBy: item["triggeredBy"],
  };
}

/** Alias for JobPropertiesUnion */
export type JobPropertiesUnion = RecoveryJobProperties | DrillRunProperties | JobProperties;

export function jobPropertiesUnionDeserializer(item: any): JobPropertiesUnion {
  switch (item["jobType"]) {
    case "RecoveryPlan":
      return recoveryJobPropertiesDeserializer(item as RecoveryJobProperties);

    case "DrillRun":
      return drillRunPropertiesDeserializer(item as DrillRunProperties);

    default:
      return jobPropertiesDeserializer(item);
  }
}

/** Job Statuses */
export enum KnownJobStatus {
  /** The job status is not applicable. */
  NotApplicable = "NotApplicable",
  /** The job has not started yet. */
  NotStarted = "NotStarted",
  /** The job is pending execution, awaiting the completion of dependent stages. */
  Pending = "Pending",
  /** The job is currently in progress. */
  InProgress = "InProgress",
  /** The job has been completed successfully. */
  Completed = "Completed",
  /** The job has been completed with warnings. */
  CompletedWithWarnings = "CompletedWithWarnings",
  /** The job has failed. */
  Failed = "Failed",
  /** The job skipped for the resource (resource not qualified or not applicable). */
  Skipped = "Skipped",
  /** The job is in the process of being cancelled. */
  Cancelling = "Cancelling",
  /** The job has been cancelled. */
  Cancelled = "Cancelled",
  /** The job is currently paused. */
  Paused = "Paused",
}

/**
 * Job Statuses \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: The job status is not applicable. \
 * **NotStarted**: The job has not started yet. \
 * **Pending**: The job is pending execution, awaiting the completion of dependent stages. \
 * **InProgress**: The job is currently in progress. \
 * **Completed**: The job has been completed successfully. \
 * **CompletedWithWarnings**: The job has been completed with warnings. \
 * **Failed**: The job has failed. \
 * **Skipped**: The job skipped for the resource (resource not qualified or not applicable). \
 * **Cancelling**: The job is in the process of being cancelled. \
 * **Cancelled**: The job has been cancelled. \
 * **Paused**: The job is currently paused.
 */
export type JobStatus = string;

/** Job Error information. */
export interface JobErrorInfo {
  /** A code representing the error. */
  readonly errorCode?: string;
  /** A detailed message explaining the error. */
  readonly errorMessage?: string;
  /** A list of recommendations to resolve the error. */
  readonly recommendations?: string[];
}

export function jobErrorInfoDeserializer(item: any): JobErrorInfo {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

export function jobRetryDetailsArrayDeserializer(result: Array<JobRetryDetails>): any[] {
  return result.map((item) => {
    return jobRetryDetailsDeserializer(item);
  });
}

/** Job Retry Details. */
export interface JobRetryDetails {
  /** The current status of the job execution. */
  readonly status?: JobStatus;
  /** The start time of the job execution. */
  readonly startTime?: Date;
  /** The end time of the job execution. */
  readonly endTime?: Date;
  /** The time elapsed during the execution of this job. */
  readonly duration?: string;
  /** Details of any errors that occurred during the execution of this job. */
  errorDetails?: JobErrorInfo;
  /** The retry attempt number of the job. */
  retryAttempt: number;
  /** User Comments. */
  readonly userComments?: JobUserComment[];
}

export function jobRetryDetailsDeserializer(item: any): JobRetryDetails {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    retryAttempt: item["retryAttempt"],
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
  };
}

export function jobUserCommentArrayDeserializer(result: Array<JobUserComment>): any[] {
  return result.map((item) => {
    return jobUserCommentDeserializer(item);
  });
}

/** Job User's Comment. */
export interface JobUserComment {
  /** The type of the user comment. */
  readonly commentType?: CommentType;
  /** The time of user comment. */
  readonly commentTime?: Date;
  /** User Comment */
  readonly comments?: string;
}

export function jobUserCommentDeserializer(item: any): JobUserComment {
  return {
    commentType: item["commentType"],
    commentTime: !item["commentTime"] ? item["commentTime"] : new Date(item["commentTime"]),
    comments: item["comments"],
  };
}

/** The type of user comment. */
export enum KnownCommentType {
  /** A general description comment. */
  Description = "Description",
  /** A comment indicating the reason for resuming a job. */
  ResumeReason = "ResumeReason",
}

/**
 * The type of user comment. \
 * {@link KnownCommentType} can be used interchangeably with CommentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Description**: A general description comment. \
 * **ResumeReason**: A comment indicating the reason for resuming a job.
 */
export type CommentType = string;

/** Additional information for job. */
export interface JobExtendedInfo {
  /** List of tasks associated with this job. */
  readonly tasksList?: JobTaskDetail[];
  /** Non localized error message on job execution. */
  readonly dynamicErrorMessage?: string;
}

export function jobExtendedInfoDeserializer(item: any): JobExtendedInfo {
  return {
    tasksList: !item["tasksList"]
      ? item["tasksList"]
      : jobTaskDetailArrayDeserializer(item["tasksList"]),
    dynamicErrorMessage: item["dynamicErrorMessage"],
  };
}

export function jobTaskDetailArrayDeserializer(result: Array<JobTaskDetail>): any[] {
  return result.map((item) => {
    return jobTaskDetailDeserializer(item);
  });
}

/** Job task details. */
export interface JobTaskDetail {
  /** The current status of the job execution. */
  readonly status?: JobStatus;
  /** The start time of the job execution. */
  readonly startTime?: Date;
  /** The end time of the job execution. */
  readonly endTime?: Date;
  /** The time elapsed during the execution of this job. */
  readonly duration?: string;
  /** Details of any errors that occurred during the execution of this job. */
  errorDetails?: JobErrorInfo;
  /** Identifier of the task. */
  readonly taskId?: string;
  /** Friendly name of the task. */
  readonly taskName?: string;
  /** Identifiers of linked jobs to this task. */
  readonly linkedJobIds?: string[];
  /** User Comments. */
  readonly userComments?: JobUserComment[];
  /** List of sub-tasks associated with this job. */
  readonly subTasksList?: JobTaskDetail[];
  /** Retry details of the task. */
  readonly retryDetails?: JobRetryDetails[];
}

export function jobTaskDetailDeserializer(item: any): JobTaskDetail {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    taskId: item["taskId"],
    taskName: item["taskName"],
    linkedJobIds: !item["linkedJobIds"]
      ? item["linkedJobIds"]
      : item["linkedJobIds"].map((p: any) => {
          return p;
        }),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    subTasksList: !item["subTasksList"]
      ? item["subTasksList"]
      : jobTaskDetailArrayDeserializer(item["subTasksList"]),
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
  };
}

/** A job type indicates the kind of job. */
export enum KnownJobType {
  /** Abstract job - invalid. */
  Invalid = "Invalid",
  /** Recovery Orchestration Plan created job. */
  RecoveryPlan = "RecoveryPlan",
  /** Drill Oober job which represents a given instance of Drill. */
  DrillRun = "DrillRun",
}

/**
 * A job type indicates the kind of job. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Abstract job - invalid. \
 * **RecoveryPlan**: Recovery Orchestration Plan created job. \
 * **DrillRun**: Drill Oober job which represents a given instance of Drill.
 */
export type JobType = string;

/** Job TriggeredBy */
export enum KnownJobTriggeredBy {
  /** Triggered by the system. */
  System = "System",
  /** Triggered by the user. */
  User = "User",
}

/**
 * Job TriggeredBy \
 * {@link KnownJobTriggeredBy} can be used interchangeably with JobTriggeredBy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: Triggered by the system. \
 * **User**: Triggered by the user.
 */
export type JobTriggeredBy = string;

/** Properties of the Resiliency DrillRun. */
export interface DrillRunProperties extends JobProperties {
  /** Discriminator for the Job object hierarchy. */
  jobType: "DrillRun";
  /** Parent Drill resource. */
  readonly drillId?: string;
  /** Drill mode. */
  readonly drillMode?: DrillMode;
  /** Attestation of this Drill Run. */
  readonly attestation?: DrillAttestation;
  /** Notes for this Drill. */
  readonly notes?: string[];
  /** Matrix of Actions supported on Operations. */
  readonly supportedVerbsForStage?: SupportedVerbsForStage[];
  /** The currently active operationID on this Drill Run. There can be only one active. */
  readonly currentActiveOperationId?: string;
}

export function drillRunPropertiesDeserializer(item: any): DrillRunProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobType: item["jobType"],
    executionConfigurations: !item["executionConfigurations"]
      ? item["executionConfigurations"]
      : executionConfigurationsDeserializer(item["executionConfigurations"]),
    triggeredBy: item["triggeredBy"],
    drillId: item["drillId"],
    drillMode: item["drillMode"],
    attestation: item["attestation"],
    notes: !item["notes"]
      ? item["notes"]
      : item["notes"].map((p: any) => {
          return p;
        }),
    supportedVerbsForStage: !item["supportedVerbsForStage"]
      ? item["supportedVerbsForStage"]
      : supportedVerbsForStageArrayDeserializer(item["supportedVerbsForStage"]),
    currentActiveOperationId: item["currentActiveOperationId"],
  };
}

/** Start mode of Drill. */
export enum KnownDrillMode {
  /** Failover mode. */
  Failover = "Failover",
}

/**
 * Start mode of Drill. \
 * {@link KnownDrillMode} can be used interchangeably with DrillMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failover**: Failover mode.
 */
export type DrillMode = string;

/** Drill Attestation status on terminating. */
export enum KnownDrillAttestation {
  /** Drill Attestation success. */
  AttestedSuccess = "Success",
  /** Drill Attestation failure. */
  AttestedFailed = "Failed",
}

/**
 * Drill Attestation status on terminating. \
 * {@link KnownDrillAttestation} can be used interchangeably with DrillAttestation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Drill Attestation success. \
 * **Failed**: Drill Attestation failure.
 */
export type DrillAttestation = string;

export function supportedVerbsForStageArrayDeserializer(
  result: Array<SupportedVerbsForStage>,
): any[] {
  return result.map((item) => {
    return supportedVerbsForStageDeserializer(item);
  });
}

/** Model for supported verbs for stage. */
export interface SupportedVerbsForStage {
  /** Name of stage. */
  drillRunStage: DrillRunSubtasks;
  /** Supported Verbs for stage. */
  supportedVerbs: DrillRunOperationVerbs[];
}

export function supportedVerbsForStageDeserializer(item: any): SupportedVerbsForStage {
  return {
    drillRunStage: item["drillRunStage"],
    supportedVerbs: item["supportedVerbs"].map((p: any) => {
      return p;
    }),
  };
}

/** Enum for Drill Run Subtasks. */
export enum KnownDrillRunSubtasks {
  /** FaultInjection Subtasks. */
  FaultInjection = "FaultInjection",
  /** Failover Subtasks. */
  Failover = "Failover",
  /** Reprotect Subtasks. */
  Reprotect = "Reprotect",
  /** FailoverReverse Subtasks. */
  FailoverReverse = "FailoverReverse",
  /** ReprotectReverse Subtasks. */
  ReprotectReverse = "ReprotectReverse",
}

/**
 * Enum for Drill Run Subtasks. \
 * {@link KnownDrillRunSubtasks} can be used interchangeably with DrillRunSubtasks,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FaultInjection**: FaultInjection Subtasks. \
 * **Failover**: Failover Subtasks. \
 * **Reprotect**: Reprotect Subtasks. \
 * **FailoverReverse**: FailoverReverse Subtasks. \
 * **ReprotectReverse**: ReprotectReverse Subtasks.
 */
export type DrillRunSubtasks = string;

/** Enum for DrillRun operation actions. */
export enum KnownDrillRunOperationVerbs {
  /** Start Action. */
  Start = "Start",
  /** Retry Action. */
  Retry = "Retry",
  /** MarkAsComplete Action. */
  MarkAsComplete = "MarkAsComplete",
  /** Cancel Action. */
  Cancel = "Cancel",
}

/**
 * Enum for DrillRun operation actions. \
 * {@link KnownDrillRunOperationVerbs} can be used interchangeably with DrillRunOperationVerbs,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start**: Start Action. \
 * **Retry**: Retry Action. \
 * **MarkAsComplete**: MarkAsComplete Action. \
 * **Cancel**: Cancel Action.
 */
export type DrillRunOperationVerbs = string;

/** The response of a RecoveryJob list operation. */
export interface _RecoveryJobListResult {
  /** The RecoveryJob items on this page */
  value: RecoveryJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryJobListResultDeserializer(item: any): _RecoveryJobListResult {
  return {
    value: recoveryJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryJobArrayDeserializer(result: Array<RecoveryJob>): any[] {
  return result.map((item) => {
    return recoveryJobDeserializer(item);
  });
}

/** Request body for providing user input for a recovery action. */
export interface RecoveryActionRequest {
  /** User-provided input for the action. */
  description?: string;
}

export function recoveryActionRequestSerializer(item: RecoveryActionRequest): any {
  return { description: item["description"] };
}

/** Represents a recovery orchestration job resource in the Azure Resilience Management provider namespace. */
export interface RecoveryJobResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryJobResourceProperties;
}

export function recoveryJobResourceDeserializer(item: any): RecoveryJobResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryJobResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a recovery orchestration job resource associated with a recovery orchestration plan. */
export interface RecoveryJobResourceProperties extends JobResourceProperties {
  /** Discriminator for the Job object hierarchy. */
  jobResourceType: "RecoveryPlan";
  /** The provisioning state of the recovery job resource. */
  readonly provisioningState?: ProvisioningState;
  /** A setting that indicates the protection solution selected. */
  readonly protectionSolutionType?: ResourceProtectionSolutionType;
  /** The recovery action settings. */
  readonly recoveryGroupActionSettings?: RecoveryGroupActionSettings;
}

export function recoveryJobResourcePropertiesDeserializer(
  item: any,
): RecoveryJobResourceProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobId: item["jobId"],
    taskId: item["taskId"],
    taskName: item["taskName"],
    jobResourceType: item["jobResourceType"],
    provisioningState: item["provisioningState"],
    protectionSolutionType: item["protectionSolutionType"],
    recoveryGroupActionSettings: !item["recoveryGroupActionSettings"]
      ? item["recoveryGroupActionSettings"]
      : recoveryGroupActionSettingsDeserializer(item["recoveryGroupActionSettings"]),
  };
}

/** Settings for a recovery group action. */
export interface RecoveryGroupActionSettings {
  /** The action task associated with this job resource. */
  readonly actionTask?: ActionTask;
  /** Sequence number for the action. */
  readonly actionSequence?: number;
  /** Type of the recovery group action. */
  readonly recoveryGroupActionType?: RecoveryGroupActionType;
  /** Name of the action. */
  readonly actionName?: string;
  /** User description of the action. */
  readonly actionDescription?: string;
}

export function recoveryGroupActionSettingsDeserializer(item: any): RecoveryGroupActionSettings {
  return {
    actionTask: item["actionTask"],
    actionSequence: item["actionSequence"],
    recoveryGroupActionType: item["recoveryGroupActionType"],
    actionName: item["actionName"],
    actionDescription: item["actionDescription"],
  };
}

/** An action task type indicates the type of action task. */
export enum KnownActionTask {
  /** No action task. */
  None = "None",
  /** Pre-action task. */
  PreActionTask = "PreActionTask",
  /** Post-action task. */
  PostActionTask = "PostActionTask",
}

/**
 * An action task type indicates the type of action task. \
 * {@link KnownActionTask} can be used interchangeably with ActionTask,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No action task. \
 * **PreActionTask**: Pre-action task. \
 * **PostActionTask**: Post-action task.
 */
export type ActionTask = string;

/** Definition of job-resource. */
export interface JobResourceProperties {
  /** The current status of the job execution. */
  readonly status?: JobStatus;
  /** The start time of the job execution. */
  readonly startTime?: Date;
  /** The end time of the job execution. */
  readonly endTime?: Date;
  /** The time elapsed during the execution of this job. */
  readonly duration?: string;
  /** Details of any errors that occurred during the execution of this job. */
  errorDetails?: JobErrorInfo;
  /** The resource for which this job was created. This is typically the resource that the job is intended to manage or operate on. */
  readonly resourceId?: string;
  /** The operation that this job is intended to perform. */
  readonly operation?: string;
  /** Details of any retries that have been attempted for this job. */
  retryDetails?: JobRetryDetails[];
  /** Additional information about the job. */
  jobExtendedInfo?: JobExtendedInfo;
  /** User Comments. */
  readonly userComments?: JobUserComment[];
  /** Id of the Job under which this job-resource exists. */
  readonly jobId?: string;
  /** Id of the job-task to which this job resource is associated. */
  readonly taskId?: string;
  /** Friendly name of the job-task to which this job resource is associated. */
  readonly taskName?: string;
  /** Discriminator for the JobResource object hierarchy. */
  /** The discriminator possible values: RecoveryPlan, DrillRun */
  jobResourceType: JobResourceType;
}

export function jobResourcePropertiesDeserializer(item: any): JobResourceProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobId: item["jobId"],
    taskId: item["taskId"],
    taskName: item["taskName"],
    jobResourceType: item["jobResourceType"],
  };
}

/** Alias for JobResourcePropertiesUnion */
export type JobResourcePropertiesUnion =
  | RecoveryJobResourceProperties
  | DrillRunResourceProperties
  | JobResourceProperties;

export function jobResourcePropertiesUnionDeserializer(item: any): JobResourcePropertiesUnion {
  switch (item["jobResourceType"]) {
    case "RecoveryPlan":
      return recoveryJobResourcePropertiesDeserializer(item as RecoveryJobResourceProperties);

    case "DrillRun":
      return drillRunResourcePropertiesDeserializer(item as DrillRunResourceProperties);

    default:
      return jobResourcePropertiesDeserializer(item);
  }
}

/** A job resource type indicates the kind of jobresource. */
export enum KnownJobResourceType {
  /** Abstract job resource - invalid. */
  Invalid = "Invalid",
  /** Recovery Orchestration Plan created job resource. */
  RecoveryPlan = "RecoveryPlan",
  /** Drill Run job resource. */
  DrillRun = "DrillRun",
}

/**
 * A job resource type indicates the kind of jobresource. \
 * {@link KnownJobResourceType} can be used interchangeably with JobResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Abstract job resource - invalid. \
 * **RecoveryPlan**: Recovery Orchestration Plan created job resource. \
 * **DrillRun**: Drill Run job resource.
 */
export type JobResourceType = string;

/** Properties of a Drill Run resource. */
export interface DrillRunResourceProperties extends JobResourceProperties {
  /** Discriminator for the Job object hierarchy. */
  jobResourceType: "DrillRun";
  /** The provisioning state of the Drill Run Resource. */
  readonly provisioningState?: ProvisioningState;
}

export function drillRunResourcePropertiesDeserializer(item: any): DrillRunResourceProperties {
  return {
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    duration: item["duration"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorInfoDeserializer(item["errorDetails"]),
    resourceId: item["resourceId"],
    operation: item["operation"],
    retryDetails: !item["retryDetails"]
      ? item["retryDetails"]
      : jobRetryDetailsArrayDeserializer(item["retryDetails"]),
    jobExtendedInfo: !item["jobExtendedInfo"]
      ? item["jobExtendedInfo"]
      : jobExtendedInfoDeserializer(item["jobExtendedInfo"]),
    userComments: !item["userComments"]
      ? item["userComments"]
      : jobUserCommentArrayDeserializer(item["userComments"]),
    jobId: item["jobId"],
    taskId: item["taskId"],
    taskName: item["taskName"],
    jobResourceType: item["jobResourceType"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a RecoveryJobResource list operation. */
export interface _RecoveryJobResourceListResult {
  /** The RecoveryJobResource items on this page */
  value: RecoveryJobResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryJobResourceListResultDeserializer(
  item: any,
): _RecoveryJobResourceListResult {
  return {
    value: recoveryJobResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryJobResourceArrayDeserializer(result: Array<RecoveryJobResource>): any[] {
  return result.map((item) => {
    return recoveryJobResourceDeserializer(item);
  });
}

/** Drill resource */
export interface Drill extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DrillPropertiesUnion;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function drillSerializer(item: Drill): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : drillPropertiesUnionSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function drillDeserializer(item: any): Drill {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : drillPropertiesUnionDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the Resiliency Drill. */
export interface DrillProperties {
  /** Status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Parent SG resource. */
  readonly serviceGroupId?: string;
  /** ROPlan properties. */
  recoveryPlanProperties?: RecoveryPlanPropertiesOfDrill;
  /** Properties for internal resources that are created for the Drill. */
  drillAssetProperties?: AssetPropertiesOfDrill;
  /** Chaos Resource properties. */
  chaosResourceProperties?: ChaosResourcePropertiesOfDrill;
  /** Execution state of the Drill. Whether it is currently running or not. */
  readonly executionState?: ExecutionState;
  /** Readiness state of the Drill. */
  readonly executionReadinessState?: ExecutionReadinessState;
  /** RBAC setup mode. */
  rbacSetupMode?: RbacSetupMode;
  /** Attention reason if the ReadinessState is 'NeedsAttention'. */
  readonly attentionReason?: AttentionReason;
  /** Internal System Metadata, to be used by internal components only. */
  readonly systemMetadata?: SystemMetadata;
  /** Last run properties. */
  readonly lastRunProperties?: LastRunProperties;
  /** Last sync time. */
  readonly lastSyncTime?: Date;
  /** Last resync and readiness check time. */
  readonly lastResyncReadinessCheckTime?: Date;
  /** Managed RG v2 properties. */
  readonly managedOnBehalfOfConfiguration?: ManagedOnBehalfOfConfiguration;
  /** The discriminator for the Drill object hierarchy. */
  /** The discriminator possible values: Zonal, Regional */
  drillType: DrillType;
  /** Monitoring properties of the Drill. */
  monitoringProperties?: MonitoringPropertiesOfDrill;
  /** Error details associated with the resource. */
  readonly errorDetails?: ErrorDetail;
}

export function drillPropertiesSerializer(item: DrillProperties): any {
  return {
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillSerializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillSerializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillSerializer(item["chaosResourceProperties"]),
    rbacSetupMode: item["rbacSetupMode"],
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillSerializer(item["monitoringProperties"]),
  };
}

export function drillPropertiesDeserializer(item: any): DrillProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceGroupId: item["serviceGroupId"],
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillDeserializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillDeserializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillDeserializer(item["chaosResourceProperties"]),
    executionState: item["executionState"],
    executionReadinessState: item["executionReadinessState"],
    rbacSetupMode: item["rbacSetupMode"],
    attentionReason: !item["attentionReason"]
      ? item["attentionReason"]
      : attentionReasonDeserializer(item["attentionReason"]),
    systemMetadata: !item["systemMetadata"]
      ? item["systemMetadata"]
      : systemMetadataDeserializer(item["systemMetadata"]),
    lastRunProperties: !item["lastRunProperties"]
      ? item["lastRunProperties"]
      : lastRunPropertiesDeserializer(item["lastRunProperties"]),
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    lastResyncReadinessCheckTime: !item["lastResyncReadinessCheckTime"]
      ? item["lastResyncReadinessCheckTime"]
      : new Date(item["lastResyncReadinessCheckTime"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillDeserializer(item["monitoringProperties"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Alias for DrillPropertiesUnion */
export type DrillPropertiesUnion = ZonalDrillProperties | RegionalDrillProperties | DrillProperties;

export function drillPropertiesUnionSerializer(item: DrillPropertiesUnion): any {
  switch (item.drillType) {
    case "Zonal":
      return zonalDrillPropertiesSerializer(item as ZonalDrillProperties);

    case "Regional":
      return regionalDrillPropertiesSerializer(item as RegionalDrillProperties);

    default:
      return drillPropertiesSerializer(item);
  }
}

export function drillPropertiesUnionDeserializer(item: any): DrillPropertiesUnion {
  switch (item["drillType"]) {
    case "Zonal":
      return zonalDrillPropertiesDeserializer(item as ZonalDrillProperties);

    case "Regional":
      return regionalDrillPropertiesDeserializer(item as RegionalDrillProperties);

    default:
      return drillPropertiesDeserializer(item);
  }
}

/** RecoveryPlan properties. */
export interface RecoveryPlanPropertiesOfDrill {
  /** Identity to use for RecoveryPlan operations. */
  identity: AssociatedIdentity;
  /** Recovery Orchestration plan associated with this Drill. */
  readonly recoveryPlanId?: string;
  /** Excluded resource count in RecoveryPlan. */
  readonly recoveryPlanResourceExcludedCount?: number;
}

export function recoveryPlanPropertiesOfDrillSerializer(item: RecoveryPlanPropertiesOfDrill): any {
  return { identity: associatedIdentitySerializer(item["identity"]) };
}

export function recoveryPlanPropertiesOfDrillDeserializer(
  item: any,
): RecoveryPlanPropertiesOfDrill {
  return {
    identity: associatedIdentityDeserializer(item["identity"]),
    recoveryPlanId: item["recoveryPlanId"],
    recoveryPlanResourceExcludedCount: item["recoveryPlanResourceExcludedCount"],
  };
}

/** Drill asset properties. */
export interface AssetPropertiesOfDrill {
  /** Subscription where Drill's internal resources will be created. */
  subscription: string;
  /** Region where Drill's internal resources will be created. */
  region: string;
  /** Resource group where Drill's internal resources will be created. If not specified, defaults to 'AzureResilienceManagementDrills'. This value is immutable after drill creation. */
  resourceGroup?: string;
}

export function assetPropertiesOfDrillSerializer(item: AssetPropertiesOfDrill): any {
  return {
    subscription: item["subscription"],
    region: item["region"],
    resourceGroup: item["resourceGroup"],
  };
}

export function assetPropertiesOfDrillDeserializer(item: any): AssetPropertiesOfDrill {
  return {
    subscription: item["subscription"],
    region: item["region"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Chaos Resource properties. */
export interface ChaosResourcePropertiesOfDrill {
  /** Identity to use for Chaos Resource operations. */
  identity: AssociatedIdentity;
  /** Identity to be used by the Chaos Resource for invoking faults on resources. */
  chaosResourceIdentityForFaults: AssociatedIdentity;
  /** Chaos Resource created for this Drill */
  readonly chaosResourceId?: string;
  /** Duration of faults. */
  readonly faultDurationInMin?: number;
}

export function chaosResourcePropertiesOfDrillSerializer(
  item: ChaosResourcePropertiesOfDrill,
): any {
  return {
    identity: associatedIdentitySerializer(item["identity"]),
    chaosResourceIdentityForFaults: associatedIdentitySerializer(
      item["chaosResourceIdentityForFaults"],
    ),
  };
}

export function chaosResourcePropertiesOfDrillDeserializer(
  item: any,
): ChaosResourcePropertiesOfDrill {
  return {
    identity: associatedIdentityDeserializer(item["identity"]),
    chaosResourceIdentityForFaults: associatedIdentityDeserializer(
      item["chaosResourceIdentityForFaults"],
    ),
    chaosResourceId: item["chaosResourceId"],
    faultDurationInMin: item["faultDurationInMin"],
  };
}

/** Drill Execution State */
export enum KnownExecutionState {
  /** Drill is not running currently. */
  NotRunning = "NotRunning",
  /** Drill is running currently. */
  Running = "Running",
  /** Drill is paused, waiting for manual resume. */
  Paused = "Paused",
}

/**
 * Drill Execution State \
 * {@link KnownExecutionState} can be used interchangeably with ExecutionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotRunning**: Drill is not running currently. \
 * **Running**: Drill is running currently. \
 * **Paused**: Drill is paused, waiting for manual resume.
 */
export type ExecutionState = string;

/** Drill Execution Readiness State */
export enum KnownExecutionReadinessState {
  /** Drill is ready to run. */
  Ready = "Ready",
  /** Drill is not ready to run. Details captured in AttentionReason field. */
  NeedsAttention = "NeedsAttention",
}

/**
 * Drill Execution Readiness State \
 * {@link KnownExecutionReadinessState} can be used interchangeably with ExecutionReadinessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Drill is ready to run. \
 * **NeedsAttention**: Drill is not ready to run. Details captured in AttentionReason field.
 */
export type ExecutionReadinessState = string;

/** RBAC setup mode. */
export enum KnownRbacSetupMode {
  /** Automated-CustomRole mode. */
  AutomatedCustomRole = "AutomatedCustomRole",
  /** Automated-BuiltinRoles mode. */
  AutomatedBuiltinRoles = "AutomatedBuiltinRoles",
  /** Manual mode. */
  Manual = "Manual",
}

/**
 * RBAC setup mode. \
 * {@link KnownRbacSetupMode} can be used interchangeably with RbacSetupMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutomatedCustomRole**: Automated-CustomRole mode. \
 * **AutomatedBuiltinRoles**: Automated-BuiltinRoles mode. \
 * **Manual**: Manual mode.
 */
export type RbacSetupMode = string;

/** Reason why the Drill is in NeedsAttention state, and not ready to run. */
export interface AttentionReason {
  /** Drill object does not have the necessary RBAC to run the chaos resource. */
  drillRbacOnChaosResource?: RbacState;
  /** Permissions needed by the Drill MSI to run the chaos resource. */
  rbacNeededForDrillOnChaosResource?: string[];
  /** Drill object does not have the necessary RBAC to run the Recovery Plan. */
  drillRbacOnRecoveryPlan?: RbacState;
  /** Permissions needed by the Drill MSI to run the Recovery Plan. */
  rbacNeededForDrillOnRecoveryPlan?: string[];
  /** Associated RO ready or not. */
  roReadiness?: RecoveryPlanState;
  /** RBAC required by Chaos Resource MSI not setup on the target resources. */
  rbacOnTargetResources?: RbacState;
  /** RBAC required by AutomationAccount for runbook MSI not setup on the target resources. */
  runbookFaultRbacOnTargets?: RbacState;
  /** Chaos resource for faulting exists or not. */
  chaosResource?: ExtensionObjectState;
  /** Reason for Chaos Resource Creation failure */
  chaosResourceCreationFailureReasons?: string[];
  /** Resources associated in Recovery Plan and Drill are out of sync. */
  recoveryPlanAndDrillResourcesState?: RelativeResourceCompositionState;
  /** Resources in Service Group and Drill are out of sync. */
  serviceGroupAndDrillResourcesState?: RelativeResourceCompositionState;
  /** User MSI associated with Drill object is deleted. */
  drillUserMsi?: ExtensionObjectState;
  /** User MSI associated with chaos resource object is deleted. */
  chaosResourceUserMsi?: ExtensionObjectState;
  /** Included resource in Drill. */
  includedResourceInDrill?: ExtensionObjectState;
  /** Drill MSI does not have the necessary RBAC to read the Drill Monitoring resources. */
  drillRbacOnMonitoringResources?: RbacState;
  /** Errors related to Drill Monitoring resources. */
  drillMonitoringErrors?: ErrorDetails[];
  /** Monitoring Resources created for Drill */
  readonly drillMonitoringResources?: ExtensionObjectState;
  /** Monitoring RBAC required by Drill MSI not setup on the target resources. */
  monitoringRbacOnDrillResources?: RbacState;
  /** Permissions needed by the Drill MSI to Upload service group health data for monitoring. */
  rbacNeededForDrillOnDrillMonitoringResources?: string[];
  /** Permissions needed by the Drill MSI to read health metrics data for resources in service group. */
  rbacNeededForDrillOnDrillResources?: string[];
  /** List of required required Azure resource providers that are not registered in the subscription specified for chaos resource. */
  missingRequiredResourceProviders?: string[];
}

export function attentionReasonDeserializer(item: any): AttentionReason {
  return {
    drillRbacOnChaosResource: item["drillRbacOnChaosResource"],
    rbacNeededForDrillOnChaosResource: !item["rbacNeededForDrillOnChaosResource"]
      ? item["rbacNeededForDrillOnChaosResource"]
      : item["rbacNeededForDrillOnChaosResource"].map((p: any) => {
          return p;
        }),
    drillRbacOnRecoveryPlan: item["drillRbacOnRecoveryPlan"],
    rbacNeededForDrillOnRecoveryPlan: !item["rbacNeededForDrillOnRecoveryPlan"]
      ? item["rbacNeededForDrillOnRecoveryPlan"]
      : item["rbacNeededForDrillOnRecoveryPlan"].map((p: any) => {
          return p;
        }),
    roReadiness: item["roReadiness"],
    rbacOnTargetResources: item["rbacOnTargetResources"],
    runbookFaultRbacOnTargets: item["runbookFaultRbacOnTargets"],
    chaosResource: item["chaosResource"],
    chaosResourceCreationFailureReasons: !item["chaosResourceCreationFailureReasons"]
      ? item["chaosResourceCreationFailureReasons"]
      : item["chaosResourceCreationFailureReasons"].map((p: any) => {
          return p;
        }),
    recoveryPlanAndDrillResourcesState: item["recoveryPlanAndDrillResourcesState"],
    serviceGroupAndDrillResourcesState: item["serviceGroupAndDrillResourcesState"],
    drillUserMsi: item["drillUserMsi"],
    chaosResourceUserMsi: item["chaosResourceUserMsi"],
    includedResourceInDrill: item["includedResourceInDrill"],
    drillRbacOnMonitoringResources: item["drillRbacOnMonitoringResources"],
    drillMonitoringErrors: !item["drillMonitoringErrors"]
      ? item["drillMonitoringErrors"]
      : errorDetailsArrayDeserializer(item["drillMonitoringErrors"]),
    drillMonitoringResources: item["drillMonitoringResources"],
    monitoringRbacOnDrillResources: item["monitoringRbacOnDrillResources"],
    rbacNeededForDrillOnDrillMonitoringResources: !item[
      "rbacNeededForDrillOnDrillMonitoringResources"
    ]
      ? item["rbacNeededForDrillOnDrillMonitoringResources"]
      : item["rbacNeededForDrillOnDrillMonitoringResources"].map((p: any) => {
          return p;
        }),
    rbacNeededForDrillOnDrillResources: !item["rbacNeededForDrillOnDrillResources"]
      ? item["rbacNeededForDrillOnDrillResources"]
      : item["rbacNeededForDrillOnDrillResources"].map((p: any) => {
          return p;
        }),
    missingRequiredResourceProviders: !item["missingRequiredResourceProviders"]
      ? item["missingRequiredResourceProviders"]
      : item["missingRequiredResourceProviders"].map((p: any) => {
          return p;
        }),
  };
}

/** Enum for AttentionReason - RBAC state on a resource. */
export enum KnownRbacState {
  /** RBAC set. */
  Set = "Set",
  /** RBAC not set. */
  NotSet = "NotSet",
}

/**
 * Enum for AttentionReason - RBAC state on a resource. \
 * {@link KnownRbacState} can be used interchangeably with RbacState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Set**: RBAC set. \
 * **NotSet**: RBAC not set.
 */
export type RbacState = string;

/** Enum for AttentionReason - Extension Object State. */
export enum KnownExtensionObjectState {
  /** Extension object exists. */
  Exists = "Exists",
  /** Extension object not exists. */
  NotExists = "NotExists",
}

/**
 * Enum for AttentionReason - Extension Object State. \
 * {@link KnownExtensionObjectState} can be used interchangeably with ExtensionObjectState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Exists**: Extension object exists. \
 * **NotExists**: Extension object not exists.
 */
export type ExtensionObjectState = string;

/** Enum for AttentionReason - Resource state sync between two objects. */
export enum KnownRelativeResourceCompositionState {
  /** Resources in sync. */
  InSync = "InSync",
  /** Resources out of sync. */
  OutOfSync = "OutOfSync",
}

/**
 * Enum for AttentionReason - Resource state sync between two objects. \
 * {@link KnownRelativeResourceCompositionState} can be used interchangeably with RelativeResourceCompositionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InSync**: Resources in sync. \
 * **OutOfSync**: Resources out of sync.
 */
export type RelativeResourceCompositionState = string;

export function errorDetailsArrayDeserializer(result: Array<ErrorDetails>): any[] {
  return result.map((item) => {
    return errorDetailsDeserializer(item);
  });
}

/** Errors in T&C / RBAC assignment. */
export interface ErrorDetails {
  /** Error code. */
  code: string;
  /** Error message. */
  message: string;
  /** A list of recommendations to resolve the error. */
  recommendations?: string[];
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
  };
}

/** Internal System Metadata, to be used by internal components only. */
export interface SystemMetadata {
  /** Indicates if the Initial system configuration of the Drill is complete or not. */
  initialConfig: InitialConfig;
  /** An indication whether a intrested resource type is present in drill resource. */
  readonly resourceTypeCategories?: ResourceTypeCategories[];
}

export function systemMetadataDeserializer(item: any): SystemMetadata {
  return {
    initialConfig: item["initialConfig"],
    resourceTypeCategories: !item["resourceTypeCategories"]
      ? item["resourceTypeCategories"]
      : item["resourceTypeCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** Enum for Initial config of Drill object. */
export enum KnownInitialConfig {
  /** Initial config pending. */
  Pending = "Pending",
  /** Initial config complete. */
  Complete = "Complete",
}

/**
 * Enum for Initial config of Drill object. \
 * {@link KnownInitialConfig} can be used interchangeably with InitialConfig,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Initial config pending. \
 * **Complete**: Initial config complete.
 */
export type InitialConfig = string;

/** A state type that indicates qualification of a resource for an operation. */
export enum KnownResourceTypeCategories {
  /** Indicates that alteast one Azure Site Recovery VMs are present. */
  AzureSiteRecoveryVMsPresent = "AzureSiteRecoveryVMsPresent",
}

/**
 * A state type that indicates qualification of a resource for an operation. \
 * {@link KnownResourceTypeCategories} can be used interchangeably with ResourceTypeCategories,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureSiteRecoveryVMsPresent**: Indicates that alteast one Azure Site Recovery VMs are present.
 */
export type ResourceTypeCategories = string;

/** Definition of Last Run properties. */
export interface LastRunProperties {
  /** Timestamp of the last run of this Drill. */
  readonly lastRunTime?: Date;
  /** Status of the last run of this Drill. */
  readonly lastRunState?: JobStatus;
  /** Timespan of the last run of this Drill. */
  readonly lastRunDuration?: string;
  /** Attestation state of the last run of this Drill. */
  readonly lastRunAttestation?: DrillAttestation;
}

export function lastRunPropertiesDeserializer(item: any): LastRunProperties {
  return {
    lastRunTime: !item["lastRunTime"] ? item["lastRunTime"] : new Date(item["lastRunTime"]),
    lastRunState: item["lastRunState"],
    lastRunDuration: item["lastRunDuration"],
    lastRunAttestation: item["lastRunAttestation"],
  };
}

/** Configuration of the managed on behalf of resource. */
export interface ManagedOnBehalfOfConfiguration {
  /** Associated MoboBrokerResources. */
  readonly moboBrokerResources?: MoboBrokerResource[];
}

export function managedOnBehalfOfConfigurationDeserializer(
  item: any,
): ManagedOnBehalfOfConfiguration {
  return {
    moboBrokerResources: !item["moboBrokerResources"]
      ? item["moboBrokerResources"]
      : moboBrokerResourceArrayDeserializer(item["moboBrokerResources"]),
  };
}

export function moboBrokerResourceArrayDeserializer(result: Array<MoboBrokerResource>): any[] {
  return result.map((item) => {
    return moboBrokerResourceDeserializer(item);
  });
}

/** MoboBroker resource. */
export interface MoboBrokerResource {
  /**
   * The fully qualified resource ID of the MoboBroker resource.
   * Example: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}`
   */
  readonly id?: string;
}

export function moboBrokerResourceDeserializer(item: any): MoboBrokerResource {
  return {
    id: item["id"],
  };
}

/** Enum for Drill type object hierarchy. */
export enum KnownDrillType {
  /** Zonal Drill. */
  Zonal = "Zonal",
  /** Regional Drill. */
  Regional = "Regional",
}

/**
 * Enum for Drill type object hierarchy. \
 * {@link KnownDrillType} can be used interchangeably with DrillType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zonal**: Zonal Drill. \
 * **Regional**: Regional Drill.
 */
export type DrillType = string;

/** Drill monitoring properties. */
export interface MonitoringPropertiesOfDrill {
  /** Identity to use for Drill monitoring operations. */
  identity?: AssociatedIdentity;
  /** Full ARM Id of the Log analytics workspace created by Resiliency service where health data is collected. */
  readonly logAnalyticsWorkspaceId?: string;
  /** Full ARM Id of the Data collection rule created by Resiliency service which will route data for RAW health data for service group resources. */
  readonly rawMetricsDataCollectionRuleId?: string;
  /** Full ARM Id of the Data collection rule created by Resiliency service which will route data for Aggregate health data of service group. */
  readonly serviceGroupMetricsDataCollectionRuleId?: string;
  /** Full ARM Id of the Data collection endpoint created by Resiliency service which will route data for service group and its resources. */
  readonly dataCollectionEndpointId?: string;
}

export function monitoringPropertiesOfDrillSerializer(item: MonitoringPropertiesOfDrill): any {
  return {
    identity: !item["identity"] ? item["identity"] : associatedIdentitySerializer(item["identity"]),
  };
}

export function monitoringPropertiesOfDrillDeserializer(item: any): MonitoringPropertiesOfDrill {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : associatedIdentityDeserializer(item["identity"]),
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
    rawMetricsDataCollectionRuleId: item["rawMetricsDataCollectionRuleId"],
    serviceGroupMetricsDataCollectionRuleId: item["serviceGroupMetricsDataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

/** Definition of Zonal Drill properties. */
export interface ZonalDrillProperties extends DrillProperties {
  /** The discriminator for the Drill object hierarchy. */
  drillType: "Zonal";
  /** An indication whether a VM is included in this Zonal Drill. If not, RO is not needed. */
  readonly vmsPresent?: VMPresent;
}

export function zonalDrillPropertiesSerializer(item: ZonalDrillProperties): any {
  return {
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillSerializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillSerializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillSerializer(item["chaosResourceProperties"]),
    rbacSetupMode: item["rbacSetupMode"],
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillSerializer(item["monitoringProperties"]),
  };
}

export function zonalDrillPropertiesDeserializer(item: any): ZonalDrillProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceGroupId: item["serviceGroupId"],
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillDeserializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillDeserializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillDeserializer(item["chaosResourceProperties"]),
    executionState: item["executionState"],
    executionReadinessState: item["executionReadinessState"],
    rbacSetupMode: item["rbacSetupMode"],
    attentionReason: !item["attentionReason"]
      ? item["attentionReason"]
      : attentionReasonDeserializer(item["attentionReason"]),
    systemMetadata: !item["systemMetadata"]
      ? item["systemMetadata"]
      : systemMetadataDeserializer(item["systemMetadata"]),
    lastRunProperties: !item["lastRunProperties"]
      ? item["lastRunProperties"]
      : lastRunPropertiesDeserializer(item["lastRunProperties"]),
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    lastResyncReadinessCheckTime: !item["lastResyncReadinessCheckTime"]
      ? item["lastResyncReadinessCheckTime"]
      : new Date(item["lastResyncReadinessCheckTime"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillDeserializer(item["monitoringProperties"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
    vmsPresent: item["vmsPresent"],
  };
}

/** Enum for VM presence. */
export enum KnownVMPresent {
  /** Atleast one VM Present. */
  Present = "Present",
  /** No VM present. */
  Absent = "Absent",
}

/**
 * Enum for VM presence. \
 * {@link KnownVMPresent} can be used interchangeably with VMPresent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Present**: Atleast one VM Present. \
 * **Absent**: No VM present.
 */
export type VMPresent = string;

/** Definition of Regional Drill properties. */
export interface RegionalDrillProperties extends DrillProperties {
  /** The discriminator for the Drill object hierarchy. */
  drillType: "Regional";
}

export function regionalDrillPropertiesSerializer(item: RegionalDrillProperties): any {
  return {
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillSerializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillSerializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillSerializer(item["chaosResourceProperties"]),
    rbacSetupMode: item["rbacSetupMode"],
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillSerializer(item["monitoringProperties"]),
  };
}

export function regionalDrillPropertiesDeserializer(item: any): RegionalDrillProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceGroupId: item["serviceGroupId"],
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillDeserializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillDeserializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillDeserializer(item["chaosResourceProperties"]),
    executionState: item["executionState"],
    executionReadinessState: item["executionReadinessState"],
    rbacSetupMode: item["rbacSetupMode"],
    attentionReason: !item["attentionReason"]
      ? item["attentionReason"]
      : attentionReasonDeserializer(item["attentionReason"]),
    systemMetadata: !item["systemMetadata"]
      ? item["systemMetadata"]
      : systemMetadataDeserializer(item["systemMetadata"]),
    lastRunProperties: !item["lastRunProperties"]
      ? item["lastRunProperties"]
      : lastRunPropertiesDeserializer(item["lastRunProperties"]),
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    lastResyncReadinessCheckTime: !item["lastResyncReadinessCheckTime"]
      ? item["lastResyncReadinessCheckTime"]
      : new Date(item["lastResyncReadinessCheckTime"]),
    managedOnBehalfOfConfiguration: !item["managedOnBehalfOfConfiguration"]
      ? item["managedOnBehalfOfConfiguration"]
      : managedOnBehalfOfConfigurationDeserializer(item["managedOnBehalfOfConfiguration"]),
    drillType: item["drillType"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillDeserializer(item["monitoringProperties"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** The type used for update operations of the Drill. */
export interface DrillUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The resource-specific properties for this resource. */
  properties?: DrillUpdateProperties;
}

export function drillUpdateSerializer(item: DrillUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : drillUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Drill. */
export interface DrillUpdateProperties {
  /** Recovery Plan properties. */
  recoveryPlanProperties?: RecoveryPlanPropertiesOfDrill;
  /** Properties for internal resources that are created for the Drill. */
  drillAssetProperties?: AssetPropertiesOfDrill;
  /** Chaos Resource properties. */
  chaosResourceProperties?: ChaosResourcePropertiesOfDrill;
  /** RBAC setup mode. */
  rbacSetupMode?: RbacSetupMode;
  /** Monitoring properties of the Drill. */
  monitoringProperties?: MonitoringPropertiesOfDrill;
}

export function drillUpdatePropertiesSerializer(item: DrillUpdateProperties): any {
  return {
    recoveryPlanProperties: !item["recoveryPlanProperties"]
      ? item["recoveryPlanProperties"]
      : recoveryPlanPropertiesOfDrillSerializer(item["recoveryPlanProperties"]),
    drillAssetProperties: !item["drillAssetProperties"]
      ? item["drillAssetProperties"]
      : assetPropertiesOfDrillSerializer(item["drillAssetProperties"]),
    chaosResourceProperties: !item["chaosResourceProperties"]
      ? item["chaosResourceProperties"]
      : chaosResourcePropertiesOfDrillSerializer(item["chaosResourceProperties"]),
    rbacSetupMode: item["rbacSetupMode"],
    monitoringProperties: !item["monitoringProperties"]
      ? item["monitoringProperties"]
      : monitoringPropertiesOfDrillSerializer(item["monitoringProperties"]),
  };
}

/** The response of a Drill list operation. */
export interface _DrillListResult {
  /** The Drill items on this page */
  value: Drill[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _drillListResultDeserializer(item: any): _DrillListResult {
  return {
    value: drillArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function drillArraySerializer(result: Array<Drill>): any[] {
  return result.map((item) => {
    return drillSerializer(item);
  });
}

export function drillArrayDeserializer(result: Array<Drill>): any[] {
  return result.map((item) => {
    return drillDeserializer(item);
  });
}

/** Request body of the Validate For Execute Action of Drill. */
export interface ValidateForExecutionRequest {
  /** Additional properties for Validate for execute. */
  validateForExecutionProperties?: ValidateForExecutionProperties;
}

export function validateForExecutionRequestSerializer(item: ValidateForExecutionRequest): any {
  return {
    validateForExecutionProperties: !item["validateForExecutionProperties"]
      ? item["validateForExecutionProperties"]
      : validateForExecutionPropertiesSerializer(item["validateForExecutionProperties"]),
  };
}

/** Additional properties for Failover. */
export interface ValidateForExecutionProperties {
  /** Physiscal Source locations from where resources to be failed-over or faulted. */
  sourceLocations: string[];
}

export function validateForExecutionPropertiesSerializer(
  item: ValidateForExecutionProperties,
): any {
  return {
    sourceLocations: item["sourceLocations"].map((p: any) => {
      return p;
    }),
  };
}

/** Drill Resource Inclusion State */
export enum KnownDrillResourceInclusionState {
  /** Resource excluded from Drill. */
  Excluded = "Excluded",
  /** Resource included in Drill. */
  Included = "Included",
}

/**
 * Drill Resource Inclusion State \
 * {@link KnownDrillResourceInclusionState} can be used interchangeably with DrillResourceInclusionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Excluded**: Resource excluded from Drill. \
 * **Included**: Resource included in Drill.
 */
export type DrillResourceInclusionState = string;

/** Drill Resource Fault State */
export enum KnownDrillResourceFaultState {
  /** Native fault available. */
  SystemNative = "SystemNative",
  /** Custom script based fault associated with resource. */
  CustomScript = "CustomScript",
  /** No fault configured for this resource. */
  NotDefined = "NotDefined",
}

/**
 * Drill Resource Fault State \
 * {@link KnownDrillResourceFaultState} can be used interchangeably with DrillResourceFaultState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemNative**: Native fault available. \
 * **CustomScript**: Custom script based fault associated with resource. \
 * **NotDefined**: No fault configured for this resource.
 */
export type DrillResourceFaultState = string;

/** Fault Properties */
export interface FaultProperties {
  /** Available faults for this resource. */
  readonly availableFaults?: FaultDetails[];
  /** Default fault provided by the system. */
  readonly defaultFault?: FaultDetails;
  /** Override fault provided by the user. */
  overriddenDefaultFault?: FaultDetails;
  /** Custom Fault Details selected by user */
  customFault?: CustomFaultDetails;
}

export function faultPropertiesSerializer(item: FaultProperties): any {
  return {
    overriddenDefaultFault: !item["overriddenDefaultFault"]
      ? item["overriddenDefaultFault"]
      : faultDetailsSerializer(item["overriddenDefaultFault"]),
    customFault: !item["customFault"]
      ? item["customFault"]
      : customFaultDetailsSerializer(item["customFault"]),
  };
}

export function faultPropertiesDeserializer(item: any): FaultProperties {
  return {
    availableFaults: !item["availableFaults"]
      ? item["availableFaults"]
      : faultDetailsArrayDeserializer(item["availableFaults"]),
    defaultFault: !item["defaultFault"]
      ? item["defaultFault"]
      : faultDetailsDeserializer(item["defaultFault"]),
    overriddenDefaultFault: !item["overriddenDefaultFault"]
      ? item["overriddenDefaultFault"]
      : faultDetailsDeserializer(item["overriddenDefaultFault"]),
    customFault: !item["customFault"]
      ? item["customFault"]
      : customFaultDetailsDeserializer(item["customFault"]),
  };
}

export function faultDetailsArraySerializer(result: Array<FaultDetails>): any[] {
  return result.map((item) => {
    return faultDetailsSerializer(item);
  });
}

export function faultDetailsArrayDeserializer(result: Array<FaultDetails>): any[] {
  return result.map((item) => {
    return faultDetailsDeserializer(item);
  });
}

/** Fault Details */
export interface FaultDetails {
  /** fault urn. */
  faultUrn: string;
  /** fault name */
  faultName: string;
  /** ARMId of the target resource where fault will be applied. For non-NSG, same as ResourceId. For NSG, its the NSG resource and not the actual resource which is to be simulated for faulting. */
  targetResourceId: string;
}

export function faultDetailsSerializer(item: FaultDetails): any {
  return {
    faultUrn: item["faultUrn"],
    faultName: item["faultName"],
    targetResourceId: item["targetResourceId"],
  };
}

export function faultDetailsDeserializer(item: any): FaultDetails {
  return {
    faultUrn: item["faultUrn"],
    faultName: item["faultName"],
    targetResourceId: item["targetResourceId"],
  };
}

/** Custom fault details */
export interface CustomFaultDetails {
  /** fault name */
  faultName: string;
  /** ID of ARM resource used for automation (e.g. Automation runbook URL). */
  scriptResourceId: string;
}

export function customFaultDetailsSerializer(item: CustomFaultDetails): any {
  return { faultName: item["faultName"], scriptResourceId: item["scriptResourceId"] };
}

export function customFaultDetailsDeserializer(item: any): CustomFaultDetails {
  return {
    faultName: item["faultName"],
    scriptResourceId: item["scriptResourceId"],
  };
}

/** Request body of the Start Action of Drill. */
export interface DrillStartRequest {
  /** Mode of starting the Drill */
  mode: DrillMode;
}

export function drillStartRequestSerializer(item: DrillStartRequest): any {
  return { mode: item["mode"] };
}

/** Request body of the End Action of Drill. */
export interface DrillEndRequest {
  /** Attestation Status */
  attestation: DrillAttestation;
  /** Notes */
  attestationNotes: string;
}

export function drillEndRequestSerializer(item: DrillEndRequest): any {
  return { attestation: item["attestation"], attestationNotes: item["attestationNotes"] };
}

/** Request body of the AddOrUpdateResources API. */
export interface AddOrUpdateResourcesRequest {
  /** Duration of faults. */
  faultDurationInMin: number;
  /** Add, Update, Delete resource lists */
  resourceLists?: ResourceLists;
  /** Whether to allow inclusion and update despite attention reasons. */
  forceInclusionAndUpdate?: ForceInclusionAndUpdate;
}

export function addOrUpdateResourcesRequestSerializer(item: AddOrUpdateResourcesRequest): any {
  return {
    faultDurationInMin: item["faultDurationInMin"],
    resourceLists: !item["resourceLists"]
      ? item["resourceLists"]
      : resourceListsSerializer(item["resourceLists"]),
    forceInclusionAndUpdate: item["forceInclusionAndUpdate"],
  };
}

/** Add, Update, Delete resource lists */
export interface ResourceLists {
  /** Include resource */
  includeResources?: IncludeOrUpdateResource[];
  /** Excluded resource */
  excludeResources?: string[];
  /** Update resource */
  updateResources?: IncludeOrUpdateResource[];
}

export function resourceListsSerializer(item: ResourceLists): any {
  return {
    includeResources: !item["includeResources"]
      ? item["includeResources"]
      : includeOrUpdateResourceArraySerializer(item["includeResources"]),
    excludeResources: !item["excludeResources"]
      ? item["excludeResources"]
      : item["excludeResources"].map((p: any) => {
          return p;
        }),
    updateResources: !item["updateResources"]
      ? item["updateResources"]
      : includeOrUpdateResourceArraySerializer(item["updateResources"]),
  };
}

export function includeOrUpdateResourceArraySerializer(
  result: Array<IncludeOrUpdateResource>,
): any[] {
  return result.map((item) => {
    return includeOrUpdateResourceSerializer(item);
  });
}

/** Include or Update resource */
export interface IncludeOrUpdateResource {
  /** Id of the DrillResource to be included (NOT the ARM Id of the underlying resource). */
  id: string;
  /** Fault properties. */
  faultProperties?: FaultProperties;
}

export function includeOrUpdateResourceSerializer(item: IncludeOrUpdateResource): any {
  return {
    id: item["id"],
    faultProperties: !item["faultProperties"]
      ? item["faultProperties"]
      : faultPropertiesSerializer(item["faultProperties"]),
  };
}

/** Enum for ForceInclusionAndUpdate */
export enum KnownForceInclusionAndUpdate {
  /** Enable ForceInclusionAndUpdate. */
  Enable = "Enable",
  /** Disable ForceInclusionAndUpdate. */
  Disable = "Disable",
}

/**
 * Enum for ForceInclusionAndUpdate \
 * {@link KnownForceInclusionAndUpdate} can be used interchangeably with ForceInclusionAndUpdate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable ForceInclusionAndUpdate. \
 * **Disable**: Disable ForceInclusionAndUpdate.
 */
export type ForceInclusionAndUpdate = string;

/** Drill Resource */
export interface DrillResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DrillResourceProperties;
}

export function drillResourceDeserializer(item: any): DrillResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : drillResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the Resiliency Drill Resource */
export interface DrillResourceProperties {
  /** ARM Id of the underlying resource. */
  resourceId: string;
  /** Type of the Drill resource. */
  resourceType: string;
  /** Active location and zones of the Azure resource. */
  readonly activeLocations?: string[];
  /** List of recovery locations and zones of the Azure resource. */
  readonly recoveryLocations?: string[];
  /** Active Resource location and physical zones of Azure Resource. */
  readonly activePhysicalZones?: string[];
  /** Recovery Resource location and physical zones of HA Azure Resource. */
  readonly recoveryPhysicalZones?: string[];
  /** Inclusion State of the Drill resource in Drill */
  inclusionState?: DrillResourceInclusionState;
  /** Inclusion State of the Drill resource in Recovery Plan */
  readonly recoveryPlanInclusionState?: ResourceInclusionState;
  /** Exclusion reason of the Drill resource in Recovery Plan */
  readonly recoveryPlanExclusionReason?: RecoveryPlanExclusionReason;
  /** Protection Solution Type of the Drill resource */
  readonly resourceProtectionSolutionType?: ResourceProtectionSolutionType;
  /** Readiness State of the Drill resource */
  readonly readinessState?: DrillResourceReadinessState;
  /** Fault State of the Drill resource */
  readonly faultState?: DrillResourceFaultState;
  /** Fault Properties */
  readonly faultProperties?: FaultProperties;
  /** ForceInclusion status for this resource. Has the customer forceIncluded it? */
  readonly forceInclusionState?: ForceInclusionAndUpdate;
  /** HA status of the Drill resource */
  readonly haStatus?: HAStatus;
  /** Attention reason if the Status is 'NeedsAttention'. */
  readonly attentionReason?: DrillResourceAttentionReason;
  /** Recommendation Type Id for the recommendation. */
  readonly advisorRecommendationTypeId?: string;
  /** Associated Advisor Recommendation link, if HA is not enabled on this resource. */
  readonly advisorHaRecommendationId?: string;
  /** Last RBAC assignment error, if any. */
  readonly rbacAssignmentError?: ErrorDetails;
  /** Monitoring RBAC assignment error, if any. */
  readonly monitoringRbacAssignmentError?: ErrorDetails;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function drillResourcePropertiesDeserializer(item: any): DrillResourceProperties {
  return {
    resourceId: item["resourceId"],
    resourceType: item["resourceType"],
    activeLocations: !item["activeLocations"]
      ? item["activeLocations"]
      : item["activeLocations"].map((p: any) => {
          return p;
        }),
    recoveryLocations: !item["recoveryLocations"]
      ? item["recoveryLocations"]
      : item["recoveryLocations"].map((p: any) => {
          return p;
        }),
    activePhysicalZones: !item["activePhysicalZones"]
      ? item["activePhysicalZones"]
      : item["activePhysicalZones"].map((p: any) => {
          return p;
        }),
    recoveryPhysicalZones: !item["recoveryPhysicalZones"]
      ? item["recoveryPhysicalZones"]
      : item["recoveryPhysicalZones"].map((p: any) => {
          return p;
        }),
    inclusionState: item["inclusionState"],
    recoveryPlanInclusionState: item["recoveryPlanInclusionState"],
    recoveryPlanExclusionReason: item["recoveryPlanExclusionReason"],
    resourceProtectionSolutionType: item["resourceProtectionSolutionType"],
    readinessState: item["readinessState"],
    faultState: item["faultState"],
    faultProperties: !item["faultProperties"]
      ? item["faultProperties"]
      : faultPropertiesDeserializer(item["faultProperties"]),
    forceInclusionState: item["forceInclusionState"],
    haStatus: item["haStatus"],
    attentionReason: !item["attentionReason"]
      ? item["attentionReason"]
      : drillResourceAttentionReasonDeserializer(item["attentionReason"]),
    advisorRecommendationTypeId: item["advisorRecommendationTypeId"],
    advisorHaRecommendationId: item["advisorHaRecommendationId"],
    rbacAssignmentError: !item["rbacAssignmentError"]
      ? item["rbacAssignmentError"]
      : errorDetailsDeserializer(item["rbacAssignmentError"]),
    monitoringRbacAssignmentError: !item["monitoringRbacAssignmentError"]
      ? item["monitoringRbacAssignmentError"]
      : errorDetailsDeserializer(item["monitoringRbacAssignmentError"]),
    provisioningState: item["provisioningState"],
  };
}

/** Enum for RecoveryPlan Exclusion reason. */
export enum KnownRecoveryPlanExclusionReason {
  /** Excluded From RecoveryPlan by user. */
  ExcludedFromRecoveryPlan = "ExcludedFromRecoveryPlan",
  /** Protection not configured. */
  ProtectionStatus = "ProtectionStatus",
}

/**
 * Enum for RecoveryPlan Exclusion reason. \
 * {@link KnownRecoveryPlanExclusionReason} can be used interchangeably with RecoveryPlanExclusionReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExcludedFromRecoveryPlan**: Excluded From RecoveryPlan by user. \
 * **ProtectionStatus**: Protection not configured.
 */
export type RecoveryPlanExclusionReason = string;

/** Drill Resource Readiness State */
export enum KnownDrillResourceReadinessState {
  /** Resource ready. */
  Ready = "Ready",
  /** Resource needs attention. */
  NeedsAttention = "NeedsAttention",
}

/**
 * Drill Resource Readiness State \
 * {@link KnownDrillResourceReadinessState} can be used interchangeably with DrillResourceReadinessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Resource ready. \
 * **NeedsAttention**: Resource needs attention.
 */
export type DrillResourceReadinessState = string;

/** HA Status */
export enum KnownHAStatus {
  /** HA enabled. */
  Enabled = "Enabled",
  /** HA not enabled. */
  NotEnabled = "NotEnabled",
}

/**
 * HA Status \
 * {@link KnownHAStatus} can be used interchangeably with HAStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: HA enabled. \
 * **NotEnabled**: HA not enabled.
 */
export type HAStatus = string;

/** Reason why the Drill resource is in NeedsAttention state. */
export interface DrillResourceAttentionReason {
  /** Chaos Resource MSI does not have the desired RBAC on the resource. */
  faultRbacOnTargetResource?: RbacState;
  /** RBAC required by AutomationAccount for runbook MSI not setup on the target resources. */
  runbookFaultRbacOnTargets?: RbacState;
  /** RBAC required by Drill MSI on the target resource for monitoring. */
  monitoringRbacOnTargets?: RbacState;
  /** Drill Resource State (wrt SG and RO). */
  resourceState?: DrillResourceState[];
}

export function drillResourceAttentionReasonDeserializer(item: any): DrillResourceAttentionReason {
  return {
    faultRbacOnTargetResource: item["faultRbacOnTargetResource"],
    runbookFaultRbacOnTargets: item["runbookFaultRbacOnTargets"],
    monitoringRbacOnTargets: item["monitoringRbacOnTargets"],
    resourceState: !item["resourceState"]
      ? item["resourceState"]
      : item["resourceState"].map((p: any) => {
          return p;
        }),
  };
}

/** Drill Resource State (wrt SG and RO). */
export enum KnownDrillResourceState {
  /** Resource is in SG but not part of the Drill */
  InServiceGroupNotInDrill = "InServiceGroupNotInDrill",
  /** Resource is in Drill but not part of the SG */
  InDrillNotInServiceGroup = "InDrillNotInServiceGroup",
  /** Resource is in RecoveryPlan but not part of the Drill */
  InRecoveryPlanNotInDrill = "InRecoveryPlanNotInDrill",
  /** Resource is in Drill but not part of the RecoveryPlan */
  InDrillNotInRecoveryPlan = "InDrillNotInRecoveryPlan",
  /** Resource is not in a state where it can be faulted. */
  ResourceStateIncompatibleWithFault = "ResourceStateIncompatibleWithFault",
}

/**
 * Drill Resource State (wrt SG and RO). \
 * {@link KnownDrillResourceState} can be used interchangeably with DrillResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InServiceGroupNotInDrill**: Resource is in SG but not part of the Drill \
 * **InDrillNotInServiceGroup**: Resource is in Drill but not part of the SG \
 * **InRecoveryPlanNotInDrill**: Resource is in RecoveryPlan but not part of the Drill \
 * **InDrillNotInRecoveryPlan**: Resource is in Drill but not part of the RecoveryPlan \
 * **ResourceStateIncompatibleWithFault**: Resource is not in a state where it can be faulted.
 */
export type DrillResourceState = string;

/** The response of a DrillResource list operation. */
export interface _DrillResourceListResult {
  /** The DrillResource items on this page */
  value: DrillResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _drillResourceListResultDeserializer(item: any): _DrillResourceListResult {
  return {
    value: drillResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function drillResourceArrayDeserializer(result: Array<DrillResource>): any[] {
  return result.map((item) => {
    return drillResourceDeserializer(item);
  });
}

/** DrillRun resource. */
export interface DrillRun extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DrillRunProperties;
}

export function drillRunDeserializer(item: any): DrillRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : drillRunPropertiesDeserializer(item["properties"]),
  };
}

/** The response of a DrillRun list operation. */
export interface _DrillRunListResult {
  /** The DrillRun items on this page */
  value: DrillRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _drillRunListResultDeserializer(item: any): _DrillRunListResult {
  return {
    value: drillRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function drillRunArrayDeserializer(result: Array<DrillRun>): any[] {
  return result.map((item) => {
    return drillRunDeserializer(item);
  });
}

/** Request body for Failover API. */
export interface DrillRunFailoverRequest {
  /** AutoFailover - whether to pause between Fault and Failover for manual input. */
  autoFailover: AutoFailover;
  /** The failover properties. */
  failoverProperties: FailoverRequest;
}

export function drillRunFailoverRequestSerializer(item: DrillRunFailoverRequest): any {
  return {
    autoFailover: item["autoFailover"],
    failoverProperties: failoverRequestSerializer(item["failoverProperties"]),
  };
}

/** Enum for AutoFailover */
export enum KnownAutoFailover {
  /** Enable AutoFailover. */
  Enable = "Enable",
  /** Disable AutoFailover. */
  Disable = "Disable",
}

/**
 * Enum for AutoFailover \
 * {@link KnownAutoFailover} can be used interchangeably with AutoFailover,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable AutoFailover. \
 * **Disable**: Disable AutoFailover.
 */
export type AutoFailover = string;

/** Request body for AddNotes API. */
export interface DrillRunAddNotesRequest {
  /** The notes string. */
  notes?: string;
  /** System generated current Timestamp. */
  readonly timestamp?: Date;
  /** System generated Object Id of the notes author. */
  readonly author?: string;
}

export function drillRunAddNotesRequestSerializer(item: DrillRunAddNotesRequest): any {
  return { notes: item["notes"] };
}

/** Request body for MarkAsComplete API. */
export interface MarkAsCompleteRequest {
  /** State of the Drill Run. */
  drillRunStage: DrillRunSubtasks;
}

export function markAsCompleteRequestSerializer(item: MarkAsCompleteRequest): any {
  return { drillRunStage: item["drillRunStage"] };
}

/** Represents a Drill Run job resource in the Azure Resilience Management provider namespace. */
export interface DrillRunResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DrillRunResourceProperties;
}

export function drillRunResourceDeserializer(item: any): DrillRunResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : drillRunResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a DrillRunResource list operation. */
export interface _DrillRunResourceListResult {
  /** The DrillRunResource items on this page */
  value: DrillRunResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _drillRunResourceListResultDeserializer(item: any): _DrillRunResourceListResult {
  return {
    value: drillRunResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function drillRunResourceArrayDeserializer(result: Array<DrillRunResource>): any[] {
  return result.map((item) => {
    return drillRunResourceDeserializer(item);
  });
}

/** A unified resilience item represents a computed and aggregated resilience information of Azure Applications. */
export interface UnifiedResilienceItem extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UnifiedResilienceItemProperties;
}

export function unifiedResilienceItemDeserializer(item: any): UnifiedResilienceItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : unifiedResilienceItemPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of unified resilience item property. */
export interface UnifiedResilienceItemProperties {
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Computed and copied data of resilience goals. */
  goals: GoalsData;
  /** Computed and copied data of Azure recommendations. */
  recommendations: RecommendationsData;
  /** Last modified time of the unified resilience item. */
  lastModifiedTime: Date;
}

export function unifiedResilienceItemPropertiesDeserializer(
  item: any,
): UnifiedResilienceItemProperties {
  return {
    provisioningState: item["provisioningState"],
    goals: goalsDataDeserializer(item["goals"]),
    recommendations: recommendationsDataDeserializer(item["recommendations"]),
    lastModifiedTime: new Date(item["lastModifiedTime"]),
  };
}

/** Definition of goals data in unified resilience item. */
export interface GoalsData {
  /** Arm id of the goal template. */
  templateId: string;
  /** Arm id of the goal assignment. */
  assignmentId: string;
  /** Regional RPO set in resilience goal in minutes. */
  regionalRecoveryPointObjectiveInMinutes?: IsoDuration;
  /** Computed recovery point estimated for the service group in minutes. */
  regionalRecoveryPointEstimatedInMinutes?: IsoDuration;
  /** Regional RPO status of the service group. */
  regionalRecoveryPointObjectiveStatus: ResilienceHealthStatus;
  /** Regional RTO set in resilience goal in minutes. */
  regionalRecoveryTimeObjectiveInMinutes?: IsoDuration;
  /** Computed RTA for the service group in minutes. */
  regionalRecoveryTimeActualInMinutes?: IsoDuration;
  /** Regional RTO status of the service group. */
  regionalRecoveryTimeObjectiveStatus: ResilienceHealthStatus;
  /** Whether the resource is required for high availability. */
  requireHighAvailability?: UnifiedResilienceItemRequirementSelected;
  /** Whether the resource is required for disaster recovery. */
  requireDisasterRecovery?: UnifiedResilienceItemRequirementSelected;
}

export function goalsDataDeserializer(item: any): GoalsData {
  return {
    templateId: item["templateId"],
    assignmentId: item["assignmentId"],
    regionalRecoveryPointObjectiveInMinutes: item["regionalRecoveryPointObjectiveInMinutes"],
    regionalRecoveryPointEstimatedInMinutes: item["regionalRecoveryPointEstimatedInMinutes"],
    regionalRecoveryPointObjectiveStatus: item["regionalRecoveryPointObjectiveStatus"],
    regionalRecoveryTimeObjectiveInMinutes: item["regionalRecoveryTimeObjectiveInMinutes"],
    regionalRecoveryTimeActualInMinutes: item["regionalRecoveryTimeActualInMinutes"],
    regionalRecoveryTimeObjectiveStatus: item["regionalRecoveryTimeObjectiveStatus"],
    requireHighAvailability: item["requireHighAvailability"],
    requireDisasterRecovery: item["requireDisasterRecovery"],
  };
}

/** ISO 8601 duration formats. */
export enum KnownIsoDuration {
  /** 15 minutes. */
  PT15M = "PT15M",
  /** 1 hour. */
  PT1H = "PT1H",
  /** 4 hours. */
  PT4H = "PT4H",
  /** 24 hours. */
  PT24H = "PT24H",
}

/**
 * ISO 8601 duration formats. \
 * {@link KnownIsoDuration} can be used interchangeably with IsoDuration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PT15M**: 15 minutes. \
 * **PT1H**: 1 hour. \
 * **PT4H**: 4 hours. \
 * **PT24H**: 24 hours.
 */
export type IsoDuration = string;

/** enum for Resilience health status. */
export enum KnownResilienceHealthStatus {
  /** Resource is not evaluated. */
  NotEvaluated = "NotEvaluated",
  /** Resource is Unhealthy. */
  Unhealthy = "Unhealthy",
  /** Resource is Healthy. */
  Healthy = "Healthy",
}

/**
 * enum for Resilience health status. \
 * {@link KnownResilienceHealthStatus} can be used interchangeably with ResilienceHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotEvaluated**: Resource is not evaluated. \
 * **Unhealthy**: Resource is Unhealthy. \
 * **Healthy**: Resource is Healthy.
 */
export type ResilienceHealthStatus = string;

/** Enum for the requirement status of the resource in the goal. */
export enum KnownUnifiedResilienceItemRequirementSelected {
  /** The resource is not required for the specified goal. */
  NotRequired = "NotRequired",
  /** The resource is required for the specified goal. */
  Required = "Required",
  /** The resource is not selected for the specified goal. */
  NotSelected = "NotSelected",
}

/**
 * Enum for the requirement status of the resource in the goal. \
 * {@link KnownUnifiedResilienceItemRequirementSelected} can be used interchangeably with UnifiedResilienceItemRequirementSelected,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotRequired**: The resource is not required for the specified goal. \
 * **Required**: The resource is required for the specified goal. \
 * **NotSelected**: The resource is not selected for the specified goal.
 */
export type UnifiedResilienceItemRequirementSelected = string;

/** Definition of recommendations data in unified resilience item. */
export interface RecommendationsData {
  /** The high availability section of resilience recommendation. */
  highAvailability: RecommendationsHighAvailabilityData;
}

export function recommendationsDataDeserializer(item: any): RecommendationsData {
  return {
    highAvailability: recommendationsHighAvailabilityDataDeserializer(item["highAvailability"]),
  };
}

/** Definition of recommendation data related to high availability in unified resilience item. */
export interface RecommendationsHighAvailabilityData {
  /** Count of resources that have high availability enabled. */
  enabledResourceCount?: number;
  /** Count of resources that do not have high availability enabled. */
  notEnabledResourceCount?: number;
  /** Count of resources that have not been evaluated for high availability. */
  notEvaluatedResourceCount?: number;
  /** The date and time when the high availability recommendations were last evaluated. */
  evaluationDateTime?: Date;
}

export function recommendationsHighAvailabilityDataDeserializer(
  item: any,
): RecommendationsHighAvailabilityData {
  return {
    enabledResourceCount: item["enabledResourceCount"],
    notEnabledResourceCount: item["notEnabledResourceCount"],
    notEvaluatedResourceCount: item["notEvaluatedResourceCount"],
    evaluationDateTime: !item["evaluationDateTime"]
      ? item["evaluationDateTime"]
      : new Date(item["evaluationDateTime"]),
  };
}

/** The response of a UnifiedResilienceItem list operation. */
export interface _UnifiedResilienceItemListResult {
  /** The UnifiedResilienceItem items on this page */
  value: UnifiedResilienceItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _unifiedResilienceItemListResultDeserializer(
  item: any,
): _UnifiedResilienceItemListResult {
  return {
    value: unifiedResilienceItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function unifiedResilienceItemArrayDeserializer(
  result: Array<UnifiedResilienceItem>,
): any[] {
  return result.map((item) => {
    return unifiedResilienceItemDeserializer(item);
  });
}

/** A usage plan resource for Resiliency feature billing. */
export interface UsagePlan extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: UsagePlanProperties;
}

export function usagePlanSerializer(item: UsagePlan): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : usagePlanPropertiesSerializer(item["properties"]),
  };
}

export function usagePlanDeserializer(item: any): UsagePlan {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : usagePlanPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of usage plan properties. */
export interface UsagePlanProperties {
  /** The type of the usage plan. */
  planType?: UsagePlanType;
  /** Provisioning state of the usage plan. */
  readonly provisioningState?: ProvisioningState;
  /** Details of any errors encountered during Usage Plan create or update. */
  readonly errorDetails?: ErrorDetail;
}

export function usagePlanPropertiesSerializer(item: UsagePlanProperties): any {
  return { planType: item["planType"] };
}

export function usagePlanPropertiesDeserializer(item: any): UsagePlanProperties {
  return {
    planType: item["planType"],
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** The type of usage plan. */
export enum KnownUsagePlanType {
  /** Basic usage plan with restricted functionality without any charges. */
  Basic = "Basic",
  /** Standard usage plan with comprehensive functionality and usage based charges. */
  Standard = "Standard",
}

/**
 * The type of usage plan. \
 * {@link KnownUsagePlanType} can be used interchangeably with UsagePlanType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic usage plan with restricted functionality without any charges. \
 * **Standard**: Standard usage plan with comprehensive functionality and usage based charges.
 */
export type UsagePlanType = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** The type used for updating tags in UsagePlan resources. */
export interface UsagePlanTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function usagePlanTagsUpdateSerializer(item: UsagePlanTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a UsagePlan list operation. */
export interface _UsagePlanListResult {
  /** The UsagePlan items on this page */
  value: UsagePlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usagePlanListResultDeserializer(item: any): _UsagePlanListResult {
  return {
    value: usagePlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usagePlanArraySerializer(result: Array<UsagePlan>): any[] {
  return result.map((item) => {
    return usagePlanSerializer(item);
  });
}

export function usagePlanArrayDeserializer(result: Array<UsagePlan>): any[] {
  return result.map((item) => {
    return usagePlanDeserializer(item);
  });
}

/** An enrollment that links a usage plan to a service group. */
export interface Enrollment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EnrollmentProperties;
}

export function enrollmentSerializer(item: Enrollment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : enrollmentPropertiesSerializer(item["properties"]),
  };
}

export function enrollmentDeserializer(item: any): Enrollment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : enrollmentPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of enrollment properties. */
export interface EnrollmentProperties {
  /** ARM resource identifier of the service group associated with this usage plan. */
  serviceGroupId: string;
  /** Provisioning state of the enrollment. */
  readonly provisioningState?: ProvisioningState;
  /** Details of any errors encountered during Enrollment create or update. */
  readonly errorDetails?: ErrorDetail;
}

export function enrollmentPropertiesSerializer(item: EnrollmentProperties): any {
  return { serviceGroupId: item["serviceGroupId"] };
}

export function enrollmentPropertiesDeserializer(item: any): EnrollmentProperties {
  return {
    serviceGroupId: item["serviceGroupId"],
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** The response of a Enrollment list operation. */
export interface _EnrollmentListResult {
  /** The Enrollment items on this page */
  value: Enrollment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enrollmentListResultDeserializer(item: any): _EnrollmentListResult {
  return {
    value: enrollmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enrollmentArraySerializer(result: Array<Enrollment>): any[] {
  return result.map((item) => {
    return enrollmentSerializer(item);
  });
}

export function enrollmentArrayDeserializer(result: Array<Enrollment>): any[] {
  return result.map((item) => {
    return enrollmentDeserializer(item);
  });
}

/** Microsoft.AzureResilienceManagement Resource Provider supported API versions. */
export enum KnownVersions {
  /** Microsoft.AzureResilienceManagement Resource Provider management API version 2025-02-01-preview. */
  V20250201Preview = "2025-02-01-preview",
  /** Microsoft.AzureResilienceManagement Resource Provider management API version 2026-03-01-preview. */
  V20260301Preview = "2026-03-01-preview",
  /** Microsoft.AzureResilienceManagement Resource Provider management API version 2026-04-01-preview. */
  V20260401Preview = "2026-04-01-preview",
}
