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

/** The Managed Operations resource. */
export interface ManagedOp extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ManagedOpsProperties;
}

export function managedOpSerializer(item: ManagedOp): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedOpsPropertiesSerializer(item["properties"]),
  };
}

export function managedOpDeserializer(item: any): ManagedOp {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedOpsPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the ManagedOps resource. */
export interface ManagedOpsProperties {
  /** Product plan details of this resource. */
  readonly sku?: Sku;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Desired configuration input by the user. */
  desiredConfiguration: DesiredConfiguration;
  /** Services provisioned by this resource. */
  readonly services?: ServiceInformation;
  /** Policy assignments created for managing services. */
  readonly policyAssignmentProperties?: PolicyAssignmentProperties;
}

export function managedOpsPropertiesSerializer(item: ManagedOpsProperties): any {
  return { desiredConfiguration: desiredConfigurationSerializer(item["desiredConfiguration"]) };
}

export function managedOpsPropertiesDeserializer(item: any): ManagedOpsProperties {
  return {
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    provisioningState: item["provisioningState"],
    desiredConfiguration: desiredConfigurationDeserializer(item["desiredConfiguration"]),
    services: !item["services"]
      ? item["services"]
      : serviceInformationDeserializer(item["services"]),
    policyAssignmentProperties: !item["policyAssignmentProperties"]
      ? item["policyAssignmentProperties"]
      : policyAssignmentPropertiesDeserializer(item["policyAssignmentProperties"]),
  };
}

/** Specifies the service plan for this resource. */
export interface Sku {
  /** Name of the SKU. */
  name: string;
  /** Pricing tier of the SKU. */
  tier: string;
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The provisioning state of a resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource has begun provisioning. */
  Provisioning = "Provisioning",
  /** The resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of a resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource has begun provisioning. \
 * **Deleting**: The resource is being deleted.
 */
export type ProvisioningState = string;

/** Desired configuration input by the user. */
export interface DesiredConfiguration {
  /** Configuration for the Change Tracking and Inventory service. */
  changeTrackingAndInventory: ChangeTrackingConfiguration;
  /** Configuration for the Azure Monitor Insights service. */
  azureMonitorInsights: AzureMonitorConfiguration;
  /** User assigned Managed Identity used to perform operations on machines managed by Ops360. */
  userAssignedManagedIdentityId: string;
  /** Desired enablement state of the Defender For Servers service. */
  defenderForServers?: string;
  /** Desired enablement state of the Defender Cloud Security Posture Management (CSPM) service. */
  defenderCspm?: string;
}

export function desiredConfigurationSerializer(item: DesiredConfiguration): any {
  return {
    changeTrackingAndInventory: changeTrackingConfigurationSerializer(
      item["changeTrackingAndInventory"],
    ),
    azureMonitorInsights: azureMonitorConfigurationSerializer(item["azureMonitorInsights"]),
    userAssignedManagedIdentityId: item["userAssignedManagedIdentityId"],
    defenderForServers: item["defenderForServers"],
    defenderCspm: item["defenderCspm"],
  };
}

export function desiredConfigurationDeserializer(item: any): DesiredConfiguration {
  return {
    changeTrackingAndInventory: changeTrackingConfigurationDeserializer(
      item["changeTrackingAndInventory"],
    ),
    azureMonitorInsights: azureMonitorConfigurationDeserializer(item["azureMonitorInsights"]),
    userAssignedManagedIdentityId: item["userAssignedManagedIdentityId"],
    defenderForServers: item["defenderForServers"],
    defenderCspm: item["defenderCspm"],
  };
}

/** Configuration for the Change Tracking and Inventory service. */
export interface ChangeTrackingConfiguration {
  /** Log analytics workspace resource ID used by the service. */
  logAnalyticsWorkspaceId: string;
}

export function changeTrackingConfigurationSerializer(item: ChangeTrackingConfiguration): any {
  return { logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"] };
}

export function changeTrackingConfigurationDeserializer(item: any): ChangeTrackingConfiguration {
  return {
    logAnalyticsWorkspaceId: item["logAnalyticsWorkspaceId"],
  };
}

/** Configuration for the Azure Monitor Insights service. */
export interface AzureMonitorConfiguration {
  /** Azure monitor workspace resource ID used by the service. */
  azureMonitorWorkspaceId: string;
}

export function azureMonitorConfigurationSerializer(item: AzureMonitorConfiguration): any {
  return { azureMonitorWorkspaceId: item["azureMonitorWorkspaceId"] };
}

export function azureMonitorConfigurationDeserializer(item: any): AzureMonitorConfiguration {
  return {
    azureMonitorWorkspaceId: item["azureMonitorWorkspaceId"],
  };
}

/** Services provisioned by this resource. */
export interface ServiceInformation {
  /** Change Tracking and Inventory service information. */
  readonly changeTrackingAndInventory?: ChangeTrackingInformation;
  /** Azure Monitor Insights service information. */
  readonly azureMonitorInsights?: AzureMonitorInformation;
  /** Azure Update Manager service information. */
  readonly azureUpdateManager?: UpdateManagerInformation;
  /** Azure Policy and Machine Configuration service information. */
  readonly azurePolicyAndMachineConfiguration?: GuestConfigurationInformation;
  /** Defender for Servers service information. */
  readonly defenderForServers?: DefenderForServersInformation;
  /** Defender for Cloud's Cloud security posture management (CSPM) service information. */
  readonly defenderCspm?: DefenderCspmInformation;
}

export function serviceInformationDeserializer(item: any): ServiceInformation {
  return {
    changeTrackingAndInventory: !item["changeTrackingAndInventory"]
      ? item["changeTrackingAndInventory"]
      : changeTrackingInformationDeserializer(item["changeTrackingAndInventory"]),
    azureMonitorInsights: !item["azureMonitorInsights"]
      ? item["azureMonitorInsights"]
      : azureMonitorInformationDeserializer(item["azureMonitorInsights"]),
    azureUpdateManager: !item["azureUpdateManager"]
      ? item["azureUpdateManager"]
      : updateManagerInformationDeserializer(item["azureUpdateManager"]),
    azurePolicyAndMachineConfiguration: !item["azurePolicyAndMachineConfiguration"]
      ? item["azurePolicyAndMachineConfiguration"]
      : guestConfigurationInformationDeserializer(item["azurePolicyAndMachineConfiguration"]),
    defenderForServers: !item["defenderForServers"]
      ? item["defenderForServers"]
      : defenderForServersInformationDeserializer(item["defenderForServers"]),
    defenderCspm: !item["defenderCspm"]
      ? item["defenderCspm"]
      : defenderCspmInformationDeserializer(item["defenderCspm"]),
  };
}

/** Change Tracking and Inventory service information. */
export interface ChangeTrackingInformation {
  /** ID of Data Collection Rule (DCR) associated with this service. */
  dcrId: string;
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function changeTrackingInformationDeserializer(item: any): ChangeTrackingInformation {
  return {
    dcrId: item["dcrId"],
    enablementStatus: item["enablementStatus"],
  };
}

/** Azure Monitor Insights service information. */
export interface AzureMonitorInformation {
  /** ID of Data Collection Rule (DCR) associated with this service. */
  dcrId: string;
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function azureMonitorInformationDeserializer(item: any): AzureMonitorInformation {
  return {
    dcrId: item["dcrId"],
    enablementStatus: item["enablementStatus"],
  };
}

/** Azure Update Manager service information. */
export interface UpdateManagerInformation {
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function updateManagerInformationDeserializer(item: any): UpdateManagerInformation {
  return {
    enablementStatus: item["enablementStatus"],
  };
}

/** Azure Policy and Machine Configuration service information. */
export interface GuestConfigurationInformation {
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function guestConfigurationInformationDeserializer(
  item: any,
): GuestConfigurationInformation {
  return {
    enablementStatus: item["enablementStatus"],
  };
}

/** Defender for Servers service information. */
export interface DefenderForServersInformation {
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function defenderForServersInformationDeserializer(
  item: any,
): DefenderForServersInformation {
  return {
    enablementStatus: item["enablementStatus"],
  };
}

/** Defender Cloud Security Posture Management (CSPM) service information. */
export interface DefenderCspmInformation {
  /** Indicates whether the service is enabled. */
  enablementStatus: string;
}

export function defenderCspmInformationDeserializer(item: any): DefenderCspmInformation {
  return {
    enablementStatus: item["enablementStatus"],
  };
}

/** Policy assignments created for managing services. */
export interface PolicyAssignmentProperties {
  /** Policy initiative assignment ID. */
  policyInitiativeAssignmentId: string;
}

export function policyAssignmentPropertiesDeserializer(item: any): PolicyAssignmentProperties {
  return {
    policyInitiativeAssignmentId: item["policyInitiativeAssignmentId"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** The response of a ManagedOp list operation. */
export interface _ManagedOpListResult {
  /** The ManagedOp items on this page */
  value: ManagedOp[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedOpListResultDeserializer(item: any): _ManagedOpListResult {
  return {
    value: managedOpArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedOpArraySerializer(result: Array<ManagedOp>): any[] {
  return result.map((item) => {
    return managedOpSerializer(item);
  });
}

export function managedOpArrayDeserializer(result: Array<ManagedOp>): any[] {
  return result.map((item) => {
    return managedOpDeserializer(item);
  });
}

/** ManagedOps model for update operations */
export interface ManagedOpUpdate {
  /** Updatable properties in the ManagedOps resource. */
  properties?: ManagedOpUpdateProperties;
}

export function managedOpUpdateSerializer(item: ManagedOpUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedOpUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Updatable properties in the ManagedOps resource. */
export interface ManagedOpUpdateProperties {
  /** Desired configuration input by the user. */
  desiredConfiguration?: DesiredConfigurationUpdate;
}

export function managedOpUpdatePropertiesSerializer(item: ManagedOpUpdateProperties): any {
  return {
    desiredConfiguration: !item["desiredConfiguration"]
      ? item["desiredConfiguration"]
      : desiredConfigurationUpdateSerializer(item["desiredConfiguration"]),
  };
}

/** Updatable parameters in the Desired configuration input. */
export interface DesiredConfigurationUpdate {
  /** Desired enablement state of the Defender For Servers service. */
  defenderForServers?: string;
  /** Desired enablement state of the Defender Cloud Security Posture Management (CSPM) service. */
  defenderCspm?: string;
}

export function desiredConfigurationUpdateSerializer(item: DesiredConfigurationUpdate): any {
  return { defenderForServers: item["defenderForServers"], defenderCspm: item["defenderCspm"] };
}

/** Known values of {@link Versions} that the service accepts. */
export enum KnownVersions {
  /** 2025-07-28-preview */
  V20250728Preview = "2025-07-28-preview",
}
