// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Localized display information for and operation. */
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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** Email configuration model. */
export interface EmailConfigurationModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EmailConfigurationModelProperties;
}

export function emailConfigurationModelSerializer(item: EmailConfigurationModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : emailConfigurationModelPropertiesSerializer(item["properties"]),
  };
}

export function emailConfigurationModelDeserializer(item: any): EmailConfigurationModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : emailConfigurationModelPropertiesDeserializer(item["properties"]),
  };
}

/** Email configuration model properties. */
export interface EmailConfigurationModelProperties {
  /** Gets or sets a value indicating whether to send email to subscription administrator. */
  sendToOwners: boolean;
  /** Gets or sets the custom email address for sending emails. */
  customEmailAddresses?: string[];
  /** Gets or sets the locale for the email notification. */
  locale?: string;
  /** Gets or sets the provisioning state of the email configuration. */
  readonly provisioningState?: ProvisioningState;
}

export function emailConfigurationModelPropertiesSerializer(
  item: EmailConfigurationModelProperties,
): any {
  return {
    sendToOwners: item["sendToOwners"],
    customEmailAddresses: !item["customEmailAddresses"]
      ? item["customEmailAddresses"]
      : item["customEmailAddresses"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
  };
}

export function emailConfigurationModelPropertiesDeserializer(
  item: any,
): EmailConfigurationModelProperties {
  return {
    sendToOwners: item["sendToOwners"],
    customEmailAddresses: !item["customEmailAddresses"]
      ? item["customEmailAddresses"]
      : item["customEmailAddresses"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
    provisioningState: item["provisioningState"],
  };
}

/** Gets or sets the provisioning state of the email configuration. */
export enum KnownProvisioningState {
  /** Resource creation has been canceled */
  Canceled = "Canceled",
  /** Resource is being created. */
  Creating = "Creating",
  /** Resource is being deleted. */
  Deleting = "Deleting",
  /** Resource has been deleted. */
  Deleted = "Deleted",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation/update succeeded. */
  Succeeded = "Succeeded",
  /** Resource is being updated. */
  Updating = "Updating",
}

/**
 * Gets or sets the provisioning state of the email configuration. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: Resource creation has been canceled \
 * **Creating**: Resource is being created. \
 * **Deleting**: Resource is being deleted. \
 * **Deleted**: Resource has been deleted. \
 * **Failed**: Resource creation failed. \
 * **Succeeded**: Resource creation\/update succeeded. \
 * **Updating**: Resource is being updated.
 */
export type ProvisioningState = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a EmailConfigurationModel list operation. */
export interface _EmailConfigurationModelListResult {
  /** The EmailConfigurationModel items on this page */
  value: EmailConfigurationModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _emailConfigurationModelListResultDeserializer(
  item: any,
): _EmailConfigurationModelListResult {
  return {
    value: emailConfigurationModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function emailConfigurationModelArraySerializer(
  result: Array<EmailConfigurationModel>,
): any[] {
  return result.map((item) => {
    return emailConfigurationModelSerializer(item);
  });
}

export function emailConfigurationModelArrayDeserializer(
  result: Array<EmailConfigurationModel>,
): any[] {
  return result.map((item) => {
    return emailConfigurationModelDeserializer(item);
  });
}

/** Vault model. */
export interface VaultModel extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: VaultModelProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function vaultModelSerializer(item: VaultModel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : vaultModelPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function vaultModelDeserializer(item: any): VaultModel {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vaultModelPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Vault properties. */
export interface VaultModelProperties {
  /** Gets or sets the provisioning state of the vault. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the service resource Id. */
  readonly serviceResourceId?: string;
  /** Gets or sets the type of vault. */
  vaultType?: ReplicationVaultType;
}

export function vaultModelPropertiesSerializer(item: VaultModelProperties): any {
  return { vaultType: item["vaultType"] };
}

export function vaultModelPropertiesDeserializer(item: any): VaultModelProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceResourceId: item["serviceResourceId"],
    vaultType: item["vaultType"],
  };
}

/** Gets or sets the type of vault. */
export enum KnownReplicationVaultType {
  /** Disaster recovery vault. */
  DisasterRecovery = "DisasterRecovery",
  /** Migrate vault. */
  Migrate = "Migrate",
}

/**
 * Gets or sets the type of vault. \
 * {@link KnownReplicationVaultType} can be used interchangeably with ReplicationVaultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DisasterRecovery**: Disaster recovery vault. \
 * **Migrate**: Migrate vault.
 */
export type ReplicationVaultType = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
  };
}

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
    tags: item["tags"],
    location: item["location"],
  };
}

/** Vault model update. */
export interface VaultModelUpdate {
  /** Gets or sets the resource tags. */
  tags?: Record<string, string>;
  /** Vault properties. */
  properties?: VaultModelProperties;
  /** Vault identity. */
  identity?: VaultIdentityModel;
  /** Gets or sets the Id of the resource. */
  readonly id?: string;
  /** Gets or sets the name of the resource. */
  readonly name?: string;
  /** Gets or sets the type of the resource. */
  readonly type?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function vaultModelUpdateSerializer(item: VaultModelUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : vaultModelPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : vaultIdentityModelSerializer(item["identity"]),
  };
}

/** Vault model. */
export interface VaultIdentityModel {
  /** Gets or sets the identityType which can be either SystemAssigned or None. */
  type: VaultIdentityType;
  /** Gets or sets the object ID of the service principal object for the managed identity that is used to grant role-based access to an Azure resource. */
  readonly principalId?: string;
  /** Gets or sets a Globally Unique Identifier (GUID) that represents the Azure AD tenant where the resource is now a member. */
  readonly tenantId?: string;
}

export function vaultIdentityModelSerializer(item: VaultIdentityModel): any {
  return { type: item["type"] };
}

/** Gets or sets the identityType which can be either SystemAssigned or None. */
export enum KnownVaultIdentityType {
  /** No identity. */
  None = "None",
  /** System assigned identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned identity. */
  UserAssigned = "UserAssigned",
}

/**
 * Gets or sets the identityType which can be either SystemAssigned or None. \
 * {@link KnownVaultIdentityType} can be used interchangeably with VaultIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No identity. \
 * **SystemAssigned**: System assigned identity. \
 * **UserAssigned**: User assigned identity.
 */
export type VaultIdentityType = string;

/** The response of a VaultModel list operation. */
export interface _VaultModelListResult {
  /** The VaultModel items on this page */
  value: VaultModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vaultModelListResultDeserializer(item: any): _VaultModelListResult {
  return {
    value: vaultModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vaultModelArraySerializer(result: Array<VaultModel>): any[] {
  return result.map((item) => {
    return vaultModelSerializer(item);
  });
}

export function vaultModelArrayDeserializer(result: Array<VaultModel>): any[] {
  return result.map((item) => {
    return vaultModelDeserializer(item);
  });
}

/** Event model. */
export interface EventModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EventModelProperties;
}

export function eventModelDeserializer(item: any): EventModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : eventModelPropertiesDeserializer(item["properties"]),
  };
}

/** Event model properties. */
export interface EventModelProperties {
  /** Gets or sets the resource type. */
  readonly resourceType?: string;
  /** Gets or sets the resource name. */
  readonly resourceName?: string;
  /** Gets or sets the event type. */
  readonly eventType?: string;
  /** Gets or sets the event name. */
  readonly eventName?: string;
  /** Gets or sets the time at which the event occurred at source. */
  readonly timeOfOccurrence?: Date;
  /** Gets or sets the event severity. */
  readonly severity?: string;
  /** Gets or sets the event description. */
  readonly description?: string;
  /** Gets or sets the event correlation Id. */
  readonly correlationId?: string;
  /** Gets or sets the errors associated with this event. */
  readonly healthErrors?: HealthErrorModel[];
  /** Event model custom properties. */
  customProperties: EventModelCustomPropertiesUnion;
  /** Gets or sets the provisioning state of the event. */
  readonly provisioningState?: ProvisioningState;
}

export function eventModelPropertiesDeserializer(item: any): EventModelProperties {
  return {
    resourceType: item["resourceType"],
    resourceName: item["resourceName"],
    eventType: item["eventType"],
    eventName: item["eventName"],
    timeOfOccurrence: !item["timeOfOccurrence"]
      ? item["timeOfOccurrence"]
      : new Date(item["timeOfOccurrence"]),
    severity: item["severity"],
    description: item["description"],
    correlationId: item["correlationId"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorModelArrayDeserializer(item["healthErrors"]),
    customProperties: eventModelCustomPropertiesUnionDeserializer(item["customProperties"]),
    provisioningState: item["provisioningState"],
  };
}

export function healthErrorModelArrayDeserializer(result: Array<HealthErrorModel>): any[] {
  return result.map((item) => {
    return healthErrorModelDeserializer(item);
  });
}

/** Health error model. */
export interface HealthErrorModel {
  /** Gets or sets the type of affected resource type. */
  affectedResourceType?: string;
  /** Gets or sets the list of affected resource correlation Ids. This can be used to uniquely identify the count of items affected by a specific category and severity as well as count of item affected by an specific issue. */
  affectedResourceCorrelationIds?: string[];
  /** Gets or sets a list of child health errors associated with this error. */
  childErrors?: InnerHealthErrorModel[];
  /** Gets or sets the error code. */
  readonly code?: string;
  /** Gets or sets the health category. */
  readonly healthCategory?: string;
  /** Gets or sets the error category. */
  readonly category?: string;
  /** Gets or sets the error severity. */
  readonly severity?: string;
  /** Gets or sets the error source. */
  readonly source?: string;
  /** Gets or sets the error creation time. */
  readonly creationTime?: Date;
  /** Gets or sets a value indicating whether the error is customer resolvable. */
  readonly isCustomerResolvable?: boolean;
  /** Gets or sets the error summary. */
  readonly summary?: string;
  /** Gets or sets the error message. */
  readonly message?: string;
  /** Gets or sets possible causes of the error. */
  readonly causes?: string;
  /** Gets or sets recommended action to resolve the error. */
  readonly recommendation?: string;
}

export function healthErrorModelDeserializer(item: any): HealthErrorModel {
  return {
    affectedResourceType: item["affectedResourceType"],
    affectedResourceCorrelationIds: !item["affectedResourceCorrelationIds"]
      ? item["affectedResourceCorrelationIds"]
      : item["affectedResourceCorrelationIds"].map((p: any) => {
          return p;
        }),
    childErrors: !item["childErrors"]
      ? item["childErrors"]
      : innerHealthErrorModelArrayDeserializer(item["childErrors"]),
    code: item["code"],
    healthCategory: item["healthCategory"],
    category: item["category"],
    severity: item["severity"],
    source: item["source"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    isCustomerResolvable: item["isCustomerResolvable"],
    summary: item["summary"],
    message: item["message"],
    causes: item["causes"],
    recommendation: item["recommendation"],
  };
}

export function innerHealthErrorModelArrayDeserializer(
  result: Array<InnerHealthErrorModel>,
): any[] {
  return result.map((item) => {
    return innerHealthErrorModelDeserializer(item);
  });
}

/** Inner health error model. */
export interface InnerHealthErrorModel {
  /** Gets or sets the error code. */
  readonly code?: string;
  /** Gets or sets the health category. */
  readonly healthCategory?: string;
  /** Gets or sets the error category. */
  readonly category?: string;
  /** Gets or sets the error severity. */
  readonly severity?: string;
  /** Gets or sets the error source. */
  readonly source?: string;
  /** Gets or sets the error creation time. */
  readonly creationTime?: Date;
  /** Gets or sets a value indicating whether the error is customer resolvable. */
  readonly isCustomerResolvable?: boolean;
  /** Gets or sets the error summary. */
  readonly summary?: string;
  /** Gets or sets the error message. */
  readonly message?: string;
  /** Gets or sets possible causes of the error. */
  readonly causes?: string;
  /** Gets or sets recommended action to resolve the error. */
  readonly recommendation?: string;
}

export function innerHealthErrorModelDeserializer(item: any): InnerHealthErrorModel {
  return {
    code: item["code"],
    healthCategory: item["healthCategory"],
    category: item["category"],
    severity: item["severity"],
    source: item["source"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    isCustomerResolvable: item["isCustomerResolvable"],
    summary: item["summary"],
    message: item["message"],
    causes: item["causes"],
    recommendation: item["recommendation"],
  };
}

/** Event model custom properties. */
export interface EventModelCustomProperties {
  /** Discriminator property for EventModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function eventModelCustomPropertiesDeserializer(item: any): EventModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for EventModelCustomPropertiesUnion */
export type EventModelCustomPropertiesUnion =
  | HyperVToAzStackHCIEventModelCustomProperties
  | VMwareToAzStackHCIEventModelCustomProperties
  | EventModelCustomProperties;

export function eventModelCustomPropertiesUnionDeserializer(
  item: any,
): EventModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIEventModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIEventModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIEventModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIEventModelCustomProperties,
      );

    default:
      return eventModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV to  AzStackHCI event model custom properties. This class provides provider specific details for events of type DataContract.HealthEvents.HealthEventType.ProtectedItemHealth and DataContract.HealthEvents.HealthEventType.AgentHealth. */
export interface HyperVToAzStackHCIEventModelCustomProperties extends EventModelCustomProperties {
  /** Gets or sets the friendly name of the source which has raised this health event. */
  readonly eventSourceFriendlyName?: string;
  /** Gets or sets the protected item friendly name. */
  readonly protectedItemFriendlyName?: string;
  /** Gets or sets the source appliance name. */
  readonly sourceApplianceName?: string;
  /** Gets or sets the source target name. */
  readonly targetApplianceName?: string;
  /** Gets or sets the server type. */
  readonly serverType?: string;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIEventModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIEventModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    eventSourceFriendlyName: item["eventSourceFriendlyName"],
    protectedItemFriendlyName: item["protectedItemFriendlyName"],
    sourceApplianceName: item["sourceApplianceName"],
    targetApplianceName: item["targetApplianceName"],
    serverType: item["serverType"],
  };
}

/** VMware to  AzStackHCI event model custom properties. This class provides provider specific details for events of type DataContract.HealthEvents.HealthEventType.ProtectedItemHealth and DataContract.HealthEvents.HealthEventType.AgentHealth. */
export interface VMwareToAzStackHCIEventModelCustomProperties extends EventModelCustomProperties {
  /** Gets or sets the friendly name of the source which has raised this health event. */
  readonly eventSourceFriendlyName?: string;
  /** Gets or sets the protected item friendly name. */
  readonly protectedItemFriendlyName?: string;
  /** Gets or sets the source appliance name. */
  readonly sourceApplianceName?: string;
  /** Gets or sets the source target name. */
  readonly targetApplianceName?: string;
  /** Gets or sets the server type. */
  readonly serverType?: string;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
}

export function vMwareToAzStackHCIEventModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIEventModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    eventSourceFriendlyName: item["eventSourceFriendlyName"],
    protectedItemFriendlyName: item["protectedItemFriendlyName"],
    sourceApplianceName: item["sourceApplianceName"],
    targetApplianceName: item["targetApplianceName"],
    serverType: item["serverType"],
  };
}

/** The response of a EventModel list operation. */
export interface _EventModelListResult {
  /** The EventModel items on this page */
  value: EventModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventModelListResultDeserializer(item: any): _EventModelListResult {
  return {
    value: eventModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventModelArrayDeserializer(result: Array<EventModel>): any[] {
  return result.map((item) => {
    return eventModelDeserializer(item);
  });
}

/** Fabric model. */
export interface FabricModel extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FabricModelProperties;
}

export function fabricModelSerializer(item: FabricModel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : fabricModelPropertiesSerializer(item["properties"]),
  };
}

export function fabricModelDeserializer(item: any): FabricModel {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fabricModelPropertiesDeserializer(item["properties"]),
  };
}

/** Fabric model properties. */
export interface FabricModelProperties {
  /** Gets or sets the provisioning state of the fabric. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the service endpoint. */
  readonly serviceEndpoint?: string;
  /** Gets or sets the service resource Id. */
  readonly serviceResourceId?: string;
  /** Gets or sets the fabric health. */
  readonly health?: HealthStatus;
  /** Gets or sets the list of health errors. */
  readonly healthErrors?: HealthErrorModel[];
  /** Fabric model custom properties. */
  customProperties: FabricModelCustomPropertiesUnion;
}

export function fabricModelPropertiesSerializer(item: FabricModelProperties): any {
  return {
    customProperties: fabricModelCustomPropertiesUnionSerializer(item["customProperties"]),
  };
}

export function fabricModelPropertiesDeserializer(item: any): FabricModelProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceEndpoint: item["serviceEndpoint"],
    serviceResourceId: item["serviceResourceId"],
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorModelArrayDeserializer(item["healthErrors"]),
    customProperties: fabricModelCustomPropertiesUnionDeserializer(item["customProperties"]),
  };
}

/** Gets or sets the fabric health. */
export enum KnownHealthStatus {
  /** Healthy Status. */
  Normal = "Normal",
  /** Warning Status. */
  Warning = "Warning",
  /** Critical Status. */
  Critical = "Critical",
}

/**
 * Gets or sets the fabric health. \
 * {@link KnownHealthStatus} can be used interchangeably with HealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Normal**: Healthy Status. \
 * **Warning**: Warning Status. \
 * **Critical**: Critical Status.
 */
export type HealthStatus = string;

/** Fabric model custom properties. */
export interface FabricModelCustomProperties {
  /** Discriminator property for FabricModelCustomProperties. */
  /** The discriminator possible values: AzStackHCI, HyperVMigrate, VMwareMigrate */
  instanceType: string;
}

export function fabricModelCustomPropertiesSerializer(item: FabricModelCustomProperties): any {
  return { instanceType: item["instanceType"] };
}

export function fabricModelCustomPropertiesDeserializer(item: any): FabricModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for FabricModelCustomPropertiesUnion */
export type FabricModelCustomPropertiesUnion =
  | AzStackHCIFabricModelCustomProperties
  | HyperVMigrateFabricModelCustomProperties
  | VMwareMigrateFabricModelCustomProperties
  | FabricModelCustomProperties;

export function fabricModelCustomPropertiesUnionSerializer(
  item: FabricModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "AzStackHCI":
      return azStackHCIFabricModelCustomPropertiesSerializer(
        item as AzStackHCIFabricModelCustomProperties,
      );

    case "HyperVMigrate":
      return hyperVMigrateFabricModelCustomPropertiesSerializer(
        item as HyperVMigrateFabricModelCustomProperties,
      );

    case "VMwareMigrate":
      return vMwareMigrateFabricModelCustomPropertiesSerializer(
        item as VMwareMigrateFabricModelCustomProperties,
      );

    default:
      return fabricModelCustomPropertiesSerializer(item);
  }
}

export function fabricModelCustomPropertiesUnionDeserializer(
  item: any,
): FabricModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "AzStackHCI":
      return azStackHCIFabricModelCustomPropertiesDeserializer(
        item as AzStackHCIFabricModelCustomProperties,
      );

    case "HyperVMigrate":
      return hyperVMigrateFabricModelCustomPropertiesDeserializer(
        item as HyperVMigrateFabricModelCustomProperties,
      );

    case "VMwareMigrate":
      return vMwareMigrateFabricModelCustomPropertiesDeserializer(
        item as VMwareMigrateFabricModelCustomProperties,
      );

    default:
      return fabricModelCustomPropertiesDeserializer(item);
  }
}

/** AzStackHCI fabric model custom properties. */
export interface AzStackHCIFabricModelCustomProperties extends FabricModelCustomProperties {
  /** Gets or sets the ARM Id of the AzStackHCI site. */
  azStackHciSiteId: string;
  /** Gets or sets the Appliance name. */
  readonly applianceName?: string[];
  /** AzStackHCI cluster properties. */
  cluster: AzStackHCIClusterProperties;
  /** Gets or sets the fabric resource Id. */
  readonly fabricResourceId?: string;
  /** Gets or sets the fabric container Id. */
  readonly fabricContainerId?: string;
  /** Gets or sets the Migration solution ARM Id. */
  migrationSolutionId: string;
  /** Gets or sets the migration hub Uri. */
  readonly migrationHubUri?: string;
  /** Gets or sets the instance type. */
  instanceType: "AzStackHCI";
}

export function azStackHCIFabricModelCustomPropertiesSerializer(
  item: AzStackHCIFabricModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    azStackHciSiteId: item["azStackHciSiteId"],
    cluster: azStackHCIClusterPropertiesSerializer(item["cluster"]),
    migrationSolutionId: item["migrationSolutionId"],
  };
}

export function azStackHCIFabricModelCustomPropertiesDeserializer(
  item: any,
): AzStackHCIFabricModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    azStackHciSiteId: item["azStackHciSiteId"],
    applianceName: !item["applianceName"]
      ? item["applianceName"]
      : item["applianceName"].map((p: any) => {
          return p;
        }),
    cluster: azStackHCIClusterPropertiesDeserializer(item["cluster"]),
    fabricResourceId: item["fabricResourceId"],
    fabricContainerId: item["fabricContainerId"],
    migrationSolutionId: item["migrationSolutionId"],
    migrationHubUri: item["migrationHubUri"],
  };
}

/** AzStackHCI cluster properties. */
export interface AzStackHCIClusterProperties {
  /** Gets or sets the AzStackHCICluster FQDN name. */
  clusterName: string;
  /** Gets or sets the AzStackHCICluster resource name. */
  resourceName: string;
  /** Gets or sets the Storage account name. */
  storageAccountName: string;
  /** Gets or sets the list of AzStackHCICluster Storage Container. */
  storageContainers: StorageContainerProperties[];
}

export function azStackHCIClusterPropertiesSerializer(item: AzStackHCIClusterProperties): any {
  return {
    clusterName: item["clusterName"],
    resourceName: item["resourceName"],
    storageAccountName: item["storageAccountName"],
    storageContainers: storageContainerPropertiesArraySerializer(item["storageContainers"]),
  };
}

export function azStackHCIClusterPropertiesDeserializer(item: any): AzStackHCIClusterProperties {
  return {
    clusterName: item["clusterName"],
    resourceName: item["resourceName"],
    storageAccountName: item["storageAccountName"],
    storageContainers: storageContainerPropertiesArrayDeserializer(item["storageContainers"]),
  };
}

export function storageContainerPropertiesArraySerializer(
  result: Array<StorageContainerProperties>,
): any[] {
  return result.map((item) => {
    return storageContainerPropertiesSerializer(item);
  });
}

export function storageContainerPropertiesArrayDeserializer(
  result: Array<StorageContainerProperties>,
): any[] {
  return result.map((item) => {
    return storageContainerPropertiesDeserializer(item);
  });
}

/** Storage container properties. */
export interface StorageContainerProperties {
  /** Gets or sets the Name. */
  name: string;
  /** Gets or sets the ClusterSharedVolumePath. */
  clusterSharedVolumePath: string;
}

export function storageContainerPropertiesSerializer(item: StorageContainerProperties): any {
  return {
    name: item["name"],
    clusterSharedVolumePath: item["clusterSharedVolumePath"],
  };
}

export function storageContainerPropertiesDeserializer(item: any): StorageContainerProperties {
  return {
    name: item["name"],
    clusterSharedVolumePath: item["clusterSharedVolumePath"],
  };
}

/** HyperV migrate fabric model custom properties. */
export interface HyperVMigrateFabricModelCustomProperties extends FabricModelCustomProperties {
  /** Gets or sets the ARM Id of the HyperV site. */
  hyperVSiteId: string;
  /** Gets or sets the fabric resource Id. */
  readonly fabricResourceId?: string;
  /** Gets or sets the fabric container Id. */
  readonly fabricContainerId?: string;
  /** Gets or sets the migration solution ARM Id. */
  migrationSolutionId: string;
  /** Gets or sets the migration hub Uri. */
  readonly migrationHubUri?: string;
  /** Gets or sets the instance type. */
  instanceType: "HyperVMigrate";
}

export function hyperVMigrateFabricModelCustomPropertiesSerializer(
  item: HyperVMigrateFabricModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    hyperVSiteId: item["hyperVSiteId"],
    migrationSolutionId: item["migrationSolutionId"],
  };
}

export function hyperVMigrateFabricModelCustomPropertiesDeserializer(
  item: any,
): HyperVMigrateFabricModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    hyperVSiteId: item["hyperVSiteId"],
    fabricResourceId: item["fabricResourceId"],
    fabricContainerId: item["fabricContainerId"],
    migrationSolutionId: item["migrationSolutionId"],
    migrationHubUri: item["migrationHubUri"],
  };
}

/** VMware migrate fabric model custom properties. */
export interface VMwareMigrateFabricModelCustomProperties extends FabricModelCustomProperties {
  /** Gets or sets the ARM Id of the VMware site. */
  vmwareSiteId: string;
  /** Gets or sets the ARM Id of the migration solution. */
  migrationSolutionId: string;
  /** Gets or sets the instance type. */
  instanceType: "VMwareMigrate";
}

export function vMwareMigrateFabricModelCustomPropertiesSerializer(
  item: VMwareMigrateFabricModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    migrationSolutionId: item["migrationSolutionId"],
  };
}

export function vMwareMigrateFabricModelCustomPropertiesDeserializer(
  item: any,
): VMwareMigrateFabricModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    migrationSolutionId: item["migrationSolutionId"],
  };
}

/** Fabric model update. */
export interface FabricModelUpdate {
  /** Gets or sets the resource tags. */
  tags?: Record<string, string>;
  /** Fabric model properties. */
  properties?: FabricModelProperties;
  /** Gets or sets the Id of the resource. */
  readonly id?: string;
  /** Gets or sets the name of the resource. */
  readonly name?: string;
  /** Gets or sets the type of the resource. */
  readonly type?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function fabricModelUpdateSerializer(item: FabricModelUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : fabricModelPropertiesSerializer(item["properties"]),
  };
}

/** The response of a FabricModel list operation. */
export interface _FabricModelListResult {
  /** The FabricModel items on this page */
  value: FabricModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fabricModelListResultDeserializer(item: any): _FabricModelListResult {
  return {
    value: fabricModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fabricModelArraySerializer(result: Array<FabricModel>): any[] {
  return result.map((item) => {
    return fabricModelSerializer(item);
  });
}

export function fabricModelArrayDeserializer(result: Array<FabricModel>): any[] {
  return result.map((item) => {
    return fabricModelDeserializer(item);
  });
}

/** Fabric agent model. */
export interface FabricAgentModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FabricAgentModelProperties;
}

export function fabricAgentModelSerializer(item: FabricAgentModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fabricAgentModelPropertiesSerializer(item["properties"]),
  };
}

export function fabricAgentModelDeserializer(item: any): FabricAgentModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fabricAgentModelPropertiesDeserializer(item["properties"]),
  };
}

/** Fabric agent model properties. */
export interface FabricAgentModelProperties {
  /** Gets or sets the fabric agent correlation Id. */
  readonly correlationId?: string;
  /** Gets or sets the machine Id where fabric agent is running. */
  machineId: string;
  /** Gets or sets the machine name where fabric agent is running. */
  machineName: string;
  /** Identity model. */
  authenticationIdentity: IdentityModel;
  /** Identity model. */
  resourceAccessIdentity: IdentityModel;
  /** Gets or sets a value indicating whether the fabric agent is responsive. */
  readonly isResponsive?: boolean;
  /** Gets or sets the time when last heartbeat was sent by the fabric agent. */
  readonly lastHeartbeat?: Date;
  /** Gets or sets the fabric agent version. */
  readonly versionNumber?: string;
  /** Gets or sets the provisioning state of the fabric agent. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the list of health errors. */
  readonly healthErrors?: HealthErrorModel[];
  /** Fabric agent model custom properties. */
  customProperties: FabricAgentModelCustomPropertiesUnion;
}

export function fabricAgentModelPropertiesSerializer(item: FabricAgentModelProperties): any {
  return {
    machineId: item["machineId"],
    machineName: item["machineName"],
    authenticationIdentity: identityModelSerializer(item["authenticationIdentity"]),
    resourceAccessIdentity: identityModelSerializer(item["resourceAccessIdentity"]),
    customProperties: fabricAgentModelCustomPropertiesUnionSerializer(item["customProperties"]),
  };
}

export function fabricAgentModelPropertiesDeserializer(item: any): FabricAgentModelProperties {
  return {
    correlationId: item["correlationId"],
    machineId: item["machineId"],
    machineName: item["machineName"],
    authenticationIdentity: identityModelDeserializer(item["authenticationIdentity"]),
    resourceAccessIdentity: identityModelDeserializer(item["resourceAccessIdentity"]),
    isResponsive: item["isResponsive"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    versionNumber: item["versionNumber"],
    provisioningState: item["provisioningState"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorModelArrayDeserializer(item["healthErrors"]),
    customProperties: fabricAgentModelCustomPropertiesUnionDeserializer(item["customProperties"]),
  };
}

/** Identity model. */
export interface IdentityModel {
  /** Gets or sets the tenant Id of the SPN with which fabric agent communicates to service. */
  tenantId: string;
  /** Gets or sets the client/application Id of the SPN with which fabric agent communicates to service. */
  applicationId: string;
  /** Gets or sets the object Id of the SPN with which fabric agent communicates to service. */
  objectId: string;
  /** Gets or sets the audience of the SPN with which fabric agent communicates to service. */
  audience: string;
  /** Gets or sets the authority of the SPN with which fabric agent communicates to service. */
  aadAuthority: string;
}

export function identityModelSerializer(item: IdentityModel): any {
  return {
    tenantId: item["tenantId"],
    applicationId: item["applicationId"],
    objectId: item["objectId"],
    audience: item["audience"],
    aadAuthority: item["aadAuthority"],
  };
}

export function identityModelDeserializer(item: any): IdentityModel {
  return {
    tenantId: item["tenantId"],
    applicationId: item["applicationId"],
    objectId: item["objectId"],
    audience: item["audience"],
    aadAuthority: item["aadAuthority"],
  };
}

/** Fabric agent model custom properties. */
export interface FabricAgentModelCustomProperties {
  /** Discriminator property for FabricAgentModelCustomProperties. */
  /** The discriminator possible values: VMware */
  instanceType: string;
}

export function fabricAgentModelCustomPropertiesSerializer(
  item: FabricAgentModelCustomProperties,
): any {
  return { instanceType: item["instanceType"] };
}

export function fabricAgentModelCustomPropertiesDeserializer(
  item: any,
): FabricAgentModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for FabricAgentModelCustomPropertiesUnion */
export type FabricAgentModelCustomPropertiesUnion =
  | VMwareFabricAgentModelCustomProperties
  | FabricAgentModelCustomProperties;

export function fabricAgentModelCustomPropertiesUnionSerializer(
  item: FabricAgentModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "VMware":
      return vMwareFabricAgentModelCustomPropertiesSerializer(
        item as VMwareFabricAgentModelCustomProperties,
      );

    default:
      return fabricAgentModelCustomPropertiesSerializer(item);
  }
}

export function fabricAgentModelCustomPropertiesUnionDeserializer(
  item: any,
): FabricAgentModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "VMware":
      return vMwareFabricAgentModelCustomPropertiesDeserializer(
        item as VMwareFabricAgentModelCustomProperties,
      );

    default:
      return fabricAgentModelCustomPropertiesDeserializer(item);
  }
}

/** VMware fabric agent model custom properties. */
export interface VMwareFabricAgentModelCustomProperties extends FabricAgentModelCustomProperties {
  /** Gets or sets the BIOS Id of the fabric agent machine. */
  biosId: string;
  /** Identity model. */
  marsAuthenticationIdentity: IdentityModel;
  /** Gets or sets the instance type. */
  instanceType: "VMware";
}

export function vMwareFabricAgentModelCustomPropertiesSerializer(
  item: VMwareFabricAgentModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    biosId: item["biosId"],
    marsAuthenticationIdentity: identityModelSerializer(item["marsAuthenticationIdentity"]),
  };
}

export function vMwareFabricAgentModelCustomPropertiesDeserializer(
  item: any,
): VMwareFabricAgentModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    biosId: item["biosId"],
    marsAuthenticationIdentity: identityModelDeserializer(item["marsAuthenticationIdentity"]),
  };
}

/** The response of a FabricAgentModel list operation. */
export interface _FabricAgentModelListResult {
  /** The FabricAgentModel items on this page */
  value: FabricAgentModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fabricAgentModelListResultDeserializer(item: any): _FabricAgentModelListResult {
  return {
    value: fabricAgentModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fabricAgentModelArraySerializer(result: Array<FabricAgentModel>): any[] {
  return result.map((item) => {
    return fabricAgentModelSerializer(item);
  });
}

export function fabricAgentModelArrayDeserializer(result: Array<FabricAgentModel>): any[] {
  return result.map((item) => {
    return fabricAgentModelDeserializer(item);
  });
}

/** Job model. */
export interface JobModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: JobModelProperties;
}

export function jobModelDeserializer(item: any): JobModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : jobModelPropertiesDeserializer(item["properties"]),
  };
}

/** Job model properties. */
export interface JobModelProperties {
  /** Gets or sets the friendly display name. */
  readonly displayName?: string;
  /** Gets or sets the job state. */
  readonly state?: JobState;
  /** Gets or sets the start time. */
  readonly startTime?: Date;
  /** Gets or sets the end time. */
  readonly endTime?: Date;
  /** Gets or sets the affected object Id. */
  readonly objectId?: string;
  /** Gets or sets the affected object name. */
  readonly objectName?: string;
  /** Gets or sets the affected object internal Id. */
  readonly objectInternalId?: string;
  /** Gets or sets the affected object internal name. */
  readonly objectInternalName?: string;
  /** Gets or sets the object type. */
  readonly objectType?: JobObjectType;
  /** Gets or sets the replication provider. */
  readonly replicationProviderId?: string;
  /** Gets or sets the source fabric provider. */
  readonly sourceFabricProviderId?: string;
  /** Gets or sets the target fabric provider. */
  readonly targetFabricProviderId?: string;
  /** Gets or sets the list of allowed actions on the job. */
  readonly allowedActions?: string[];
  /** Gets or sets the job activity id. */
  readonly activityId?: string;
  /** Gets or sets the list of tasks. */
  readonly tasks?: TaskModel[];
  /** Gets or sets the list of errors. */
  readonly errors?: ErrorModel[];
  /** Job model custom properties. */
  customProperties: JobModelCustomPropertiesUnion;
  /** Gets or sets the provisioning state of the job. */
  readonly provisioningState?: ProvisioningState;
}

export function jobModelPropertiesDeserializer(item: any): JobModelProperties {
  return {
    displayName: item["displayName"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    objectId: item["objectId"],
    objectName: item["objectName"],
    objectInternalId: item["objectInternalId"],
    objectInternalName: item["objectInternalName"],
    objectType: item["objectType"],
    replicationProviderId: item["replicationProviderId"],
    sourceFabricProviderId: item["sourceFabricProviderId"],
    targetFabricProviderId: item["targetFabricProviderId"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : item["allowedActions"].map((p: any) => {
          return p;
        }),
    activityId: item["activityId"],
    tasks: !item["tasks"] ? item["tasks"] : taskModelArrayDeserializer(item["tasks"]),
    errors: !item["errors"] ? item["errors"] : errorModelArrayDeserializer(item["errors"]),
    customProperties: jobModelCustomPropertiesUnionDeserializer(item["customProperties"]),
    provisioningState: item["provisioningState"],
  };
}

/** Gets or sets the job state. */
export enum KnownJobState {
  /** Job has not been started. */
  Pending = "Pending",
  /** Job is in progress. */
  Started = "Started",
  /** Job cancellation is in progress. */
  Cancelling = "Cancelling",
  /** Job has completed successfully. */
  Succeeded = "Succeeded",
  /** Job failed. */
  Failed = "Failed",
  /** Job has been cancelled. */
  Cancelled = "Cancelled",
  /** Job has completed with information. */
  CompletedWithInformation = "CompletedWithInformation",
  /** Job has completed with warnings. */
  CompletedWithWarnings = "CompletedWithWarnings",
  /** Job has completed with errors. */
  CompletedWithErrors = "CompletedWithErrors",
}

/**
 * Gets or sets the job state. \
 * {@link KnownJobState} can be used interchangeably with JobState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Job has not been started. \
 * **Started**: Job is in progress. \
 * **Cancelling**: Job cancellation is in progress. \
 * **Succeeded**: Job has completed successfully. \
 * **Failed**: Job failed. \
 * **Cancelled**: Job has been cancelled. \
 * **CompletedWithInformation**: Job has completed with information. \
 * **CompletedWithWarnings**: Job has completed with warnings. \
 * **CompletedWithErrors**: Job has completed with errors.
 */
export type JobState = string;

/** Gets or sets the object type. */
export enum KnownJobObjectType {
  /** AVS disk pool. */
  AvsDiskPool = "AvsDiskPool",
  /** Fabric agent level workflow. */
  FabricAgent = "FabricAgent",
  /** Fabric level job. */
  Fabric = "Fabric",
  /** Policy level job. */
  Policy = "Policy",
  /** Protected item level job. */
  ProtectedItem = "ProtectedItem",
  /** Recovery plan level job. */
  RecoveryPlan = "RecoveryPlan",
  /** Replication extension level job. */
  ReplicationExtension = "ReplicationExtension",
  /** Vault level job. */
  Vault = "Vault",
}

/**
 * Gets or sets the object type. \
 * {@link KnownJobObjectType} can be used interchangeably with JobObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AvsDiskPool**: AVS disk pool. \
 * **FabricAgent**: Fabric agent level workflow. \
 * **Fabric**: Fabric level job. \
 * **Policy**: Policy level job. \
 * **ProtectedItem**: Protected item level job. \
 * **RecoveryPlan**: Recovery plan level job. \
 * **ReplicationExtension**: Replication extension level job. \
 * **Vault**: Vault level job.
 */
export type JobObjectType = string;

export function taskModelArrayDeserializer(result: Array<TaskModel>): any[] {
  return result.map((item) => {
    return taskModelDeserializer(item);
  });
}

/** Task model. */
export interface TaskModel {
  /** Gets or sets the task name. */
  readonly taskName?: string;
  /** Gets or sets the task state. */
  readonly state?: TaskState;
  /** Gets or sets the start time. */
  readonly startTime?: Date;
  /** Gets or sets the end time. */
  readonly endTime?: Date;
  /** Task model custom properties. */
  customProperties?: TaskModelCustomProperties;
  /** Gets or sets the list of children job models. */
  childrenJobs?: JobModel[];
}

export function taskModelDeserializer(item: any): TaskModel {
  return {
    taskName: item["taskName"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : taskModelCustomPropertiesDeserializer(item["customProperties"]),
    childrenJobs: !item["childrenJobs"]
      ? item["childrenJobs"]
      : jobModelArrayDeserializer(item["childrenJobs"]),
  };
}

/** Gets or sets the task state. */
export enum KnownTaskState {
  /** Task has not been started. */
  Pending = "Pending",
  /** Task is in progress. */
  Started = "Started",
  /** Task has completed successfully. */
  Succeeded = "Succeeded",
  /** Task failed. */
  Failed = "Failed",
  /** Task has been cancelled. */
  Cancelled = "Cancelled",
  /** Task has been skipped. */
  Skipped = "Skipped",
}

/**
 * Gets or sets the task state. \
 * {@link KnownTaskState} can be used interchangeably with TaskState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Task has not been started. \
 * **Started**: Task is in progress. \
 * **Succeeded**: Task has completed successfully. \
 * **Failed**: Task failed. \
 * **Cancelled**: Task has been cancelled. \
 * **Skipped**: Task has been skipped.
 */
export type TaskState = string;

/** Task model custom properties. */
export interface TaskModelCustomProperties {
  /** Gets or sets the instance type. */
  instanceType: string;
}

export function taskModelCustomPropertiesDeserializer(item: any): TaskModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

export function jobModelArrayDeserializer(result: Array<JobModel>): any[] {
  return result.map((item) => {
    return jobModelDeserializer(item);
  });
}

export function errorModelArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorModelDeserializer(item);
  });
}

/** Error model. */
export interface ErrorModel {
  /** Gets or sets the error code. */
  readonly code?: string;
  /** Gets or sets the error type. */
  readonly type?: string;
  /** Gets or sets the error severity. */
  readonly severity?: string;
  /** Gets or sets the creation time of error. */
  readonly creationTime?: Date;
  /** Gets or sets the error message. */
  readonly message?: string;
  /** Gets or sets the possible causes of error. */
  readonly causes?: string;
  /** Gets or sets the recommended action to resolve error. */
  readonly recommendation?: string;
}

export function errorModelDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    type: item["type"],
    severity: item["severity"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    message: item["message"],
    causes: item["causes"],
    recommendation: item["recommendation"],
  };
}

/** Job model custom properties. */
export interface JobModelCustomProperties {
  /** Discriminator property for JobModelCustomProperties. */
  /** The discriminator possible values: FailoverJobDetails, TestFailoverCleanupJobDetails, TestFailoverJobDetails */
  instanceType: string;
  /** Gets or sets any custom properties of the affected object. */
  readonly affectedObjectDetails?: AffectedObjectDetails;
}

export function jobModelCustomPropertiesDeserializer(item: any): JobModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : affectedObjectDetailsDeserializer(item["affectedObjectDetails"]),
  };
}

/** Alias for JobModelCustomPropertiesUnion */
export type JobModelCustomPropertiesUnion =
  | FailoverJobModelCustomProperties
  | TestFailoverCleanupJobModelCustomProperties
  | TestFailoverJobModelCustomProperties
  | JobModelCustomProperties;

export function jobModelCustomPropertiesUnionDeserializer(
  item: any,
): JobModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "FailoverJobDetails":
      return failoverJobModelCustomPropertiesDeserializer(item as FailoverJobModelCustomProperties);

    case "TestFailoverCleanupJobDetails":
      return testFailoverCleanupJobModelCustomPropertiesDeserializer(
        item as TestFailoverCleanupJobModelCustomProperties,
      );

    case "TestFailoverJobDetails":
      return testFailoverJobModelCustomPropertiesDeserializer(
        item as TestFailoverJobModelCustomProperties,
      );

    default:
      return jobModelCustomPropertiesDeserializer(item);
  }
}

/** Details of the affected object. */
export interface AffectedObjectDetails {
  /** Description of the affected object details. */
  description?: string;
  /** Type of the affected object details. */
  type?: "object";
}

export function affectedObjectDetailsDeserializer(item: any): AffectedObjectDetails {
  return {
    description: item["description"],
    type: item["type"],
  };
}

/** Failover job model custom properties. */
export interface FailoverJobModelCustomProperties extends JobModelCustomProperties {
  /** Gets or sets the failed over protected item details. */
  readonly protectedItemDetails?: FailoverProtectedItemProperties[];
  /** Gets or sets the instance type. */
  instanceType: "FailoverJobDetails";
}

export function failoverJobModelCustomPropertiesDeserializer(
  item: any,
): FailoverJobModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : affectedObjectDetailsDeserializer(item["affectedObjectDetails"]),
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverProtectedItemPropertiesArrayDeserializer(item["protectedItemDetails"]),
  };
}

export function failoverProtectedItemPropertiesArrayDeserializer(
  result: Array<FailoverProtectedItemProperties>,
): any[] {
  return result.map((item) => {
    return failoverProtectedItemPropertiesDeserializer(item);
  });
}

/** Failover properties of the protected item. */
export interface FailoverProtectedItemProperties {
  /** Gets or sets the protected item name. */
  readonly protectedItemName?: string;
  /** Gets or sets the VM name. */
  readonly vmName?: string;
  /** Gets or sets the test VM name. */
  readonly testVmName?: string;
  /** Gets or sets the recovery point Id. */
  readonly recoveryPointId?: string;
  /** Gets or sets the recovery point time. */
  readonly recoveryPointTime?: Date;
  /** Gets or sets the network name. */
  readonly networkName?: string;
  /** Gets or sets the network subnet. */
  readonly subnet?: string;
}

export function failoverProtectedItemPropertiesDeserializer(
  item: any,
): FailoverProtectedItemProperties {
  return {
    protectedItemName: item["protectedItemName"],
    vmName: item["vmName"],
    testVmName: item["testVmName"],
    recoveryPointId: item["recoveryPointId"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    networkName: item["networkName"],
    subnet: item["subnet"],
  };
}

/** Test failover cleanup job model custom properties. */
export interface TestFailoverCleanupJobModelCustomProperties extends JobModelCustomProperties {
  /** Gets or sets the test failover cleanup comments. */
  readonly comments?: string;
  /** Gets or sets the instance type. */
  instanceType: "TestFailoverCleanupJobDetails";
}

export function testFailoverCleanupJobModelCustomPropertiesDeserializer(
  item: any,
): TestFailoverCleanupJobModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : affectedObjectDetailsDeserializer(item["affectedObjectDetails"]),
    comments: item["comments"],
  };
}

/** Test failover job model custom properties. */
export interface TestFailoverJobModelCustomProperties extends JobModelCustomProperties {
  /** Gets or sets the test VM details. */
  readonly protectedItemDetails?: FailoverProtectedItemProperties[];
  /** Gets or sets the instance type. */
  instanceType: "TestFailoverJobDetails";
}

export function testFailoverJobModelCustomPropertiesDeserializer(
  item: any,
): TestFailoverJobModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : affectedObjectDetailsDeserializer(item["affectedObjectDetails"]),
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverProtectedItemPropertiesArrayDeserializer(item["protectedItemDetails"]),
  };
}

/** The response of a JobModel list operation. */
export interface _JobModelListResult {
  /** The JobModel items on this page */
  value: JobModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobModelListResultDeserializer(item: any): _JobModelListResult {
  return {
    value: jobModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Policy model. */
export interface PolicyModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PolicyModelProperties;
}

export function policyModelSerializer(item: PolicyModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : policyModelPropertiesSerializer(item["properties"]),
  };
}

export function policyModelDeserializer(item: any): PolicyModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : policyModelPropertiesDeserializer(item["properties"]),
  };
}

/** Policy model properties. */
export interface PolicyModelProperties {
  /** Gets or sets the provisioning state of the policy. */
  readonly provisioningState?: ProvisioningState;
  /** Policy model custom properties. */
  customProperties: PolicyModelCustomPropertiesUnion;
}

export function policyModelPropertiesSerializer(item: PolicyModelProperties): any {
  return {
    customProperties: policyModelCustomPropertiesUnionSerializer(item["customProperties"]),
  };
}

export function policyModelPropertiesDeserializer(item: any): PolicyModelProperties {
  return {
    provisioningState: item["provisioningState"],
    customProperties: policyModelCustomPropertiesUnionDeserializer(item["customProperties"]),
  };
}

/** Policy model custom properties. */
export interface PolicyModelCustomProperties {
  /** Discriminator property for PolicyModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function policyModelCustomPropertiesSerializer(item: PolicyModelCustomProperties): any {
  return { instanceType: item["instanceType"] };
}

export function policyModelCustomPropertiesDeserializer(item: any): PolicyModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for PolicyModelCustomPropertiesUnion */
export type PolicyModelCustomPropertiesUnion =
  | HyperVToAzStackHCIPolicyModelCustomProperties
  | VMwareToAzStackHCIPolicyModelCustomProperties
  | PolicyModelCustomProperties;

export function policyModelCustomPropertiesUnionSerializer(
  item: PolicyModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIPolicyModelCustomPropertiesSerializer(
        item as HyperVToAzStackHCIPolicyModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIPolicyModelCustomPropertiesSerializer(
        item as VMwareToAzStackHCIPolicyModelCustomProperties,
      );

    default:
      return policyModelCustomPropertiesSerializer(item);
  }
}

export function policyModelCustomPropertiesUnionDeserializer(
  item: any,
): PolicyModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIPolicyModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIPolicyModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIPolicyModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIPolicyModelCustomProperties,
      );

    default:
      return policyModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV To AzStackHCI Policy model custom properties. */
export interface HyperVToAzStackHCIPolicyModelCustomProperties extends PolicyModelCustomProperties {
  /** Gets or sets the duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes: number;
  /** Gets or sets the crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes: number;
  /** Gets or sets the app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes: number;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIPolicyModelCustomPropertiesSerializer(
  item: HyperVToAzStackHCIPolicyModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

export function hyperVToAzStackHCIPolicyModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIPolicyModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

/** VMware To AzStackHCI Policy model custom properties. */
export interface VMwareToAzStackHCIPolicyModelCustomProperties extends PolicyModelCustomProperties {
  /** Gets or sets the duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes: number;
  /** Gets or sets the crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes: number;
  /** Gets or sets the app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes: number;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
}

export function vMwareToAzStackHCIPolicyModelCustomPropertiesSerializer(
  item: VMwareToAzStackHCIPolicyModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

export function vMwareToAzStackHCIPolicyModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIPolicyModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

/** The response of a PolicyModel list operation. */
export interface _PolicyModelListResult {
  /** The PolicyModel items on this page */
  value: PolicyModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyModelListResultDeserializer(item: any): _PolicyModelListResult {
  return {
    value: policyModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyModelArraySerializer(result: Array<PolicyModel>): any[] {
  return result.map((item) => {
    return policyModelSerializer(item);
  });
}

export function policyModelArrayDeserializer(result: Array<PolicyModel>): any[] {
  return result.map((item) => {
    return policyModelDeserializer(item);
  });
}

/** Represents private endpoint connection. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionResponseProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionResponsePropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Represents Private endpoint connection response properties. */
export interface PrivateEndpointConnectionResponseProperties {
  /** Gets or sets provisioning state of the private endpoint connection. */
  readonly provisioningState?: ProvisioningState;
  /** Represent private Endpoint network resource that is linked to the Private Endpoint connection. */
  privateEndpoint?: PrivateEndpoint;
  /** Represents Private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionResponsePropertiesSerializer(
  item: PrivateEndpointConnectionResponseProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionResponsePropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionResponseProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

/** Represent private Endpoint network resource that is linked to the Private Endpoint connection. */
export interface PrivateEndpoint {
  /** Gets or sets the id. */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** Represents Private link service connection state. */
export interface PrivateLinkServiceConnectionState {
  /** Gets or sets the status. */
  status?: PrivateEndpointConnectionStatus;
  /** Gets or sets description. */
  description?: string;
  /** Gets or sets actions required. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Gets or sets the status. */
export enum KnownPrivateEndpointConnectionStatus {
  /** Approved Status. */
  Approved = "Approved",
  /** Disconnected Status. */
  Disconnected = "Disconnected",
  /** Pending Status. */
  Pending = "Pending",
  /** Rejected Status. */
  Rejected = "Rejected",
}

/**
 * Gets or sets the status. \
 * {@link KnownPrivateEndpointConnectionStatus} can be used interchangeably with PrivateEndpointConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: Approved Status. \
 * **Disconnected**: Disconnected Status. \
 * **Pending**: Pending Status. \
 * **Rejected**: Rejected Status.
 */
export type PrivateEndpointConnectionStatus = string;

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Represents private endpoint connection proxy request. */
export interface PrivateEndpointConnectionProxy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProxyProperties;
  /** Gets or sets ETag. */
  etag?: string;
}

export function privateEndpointConnectionProxySerializer(
  item: PrivateEndpointConnectionProxy,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionProxyPropertiesSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function privateEndpointConnectionProxyDeserializer(
  item: any,
): PrivateEndpointConnectionProxy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionProxyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Represents private endpoint connection proxy request. */
export interface PrivateEndpointConnectionProxyProperties {
  /** Gets or sets the provisioning state of the private endpoint connection proxy. */
  readonly provisioningState?: ProvisioningState;
  /** Represent remote private endpoint information for the private endpoint connection proxy. */
  remotePrivateEndpoint?: RemotePrivateEndpoint;
}

export function privateEndpointConnectionProxyPropertiesSerializer(
  item: PrivateEndpointConnectionProxyProperties,
): any {
  return {
    remotePrivateEndpoint: !item["remotePrivateEndpoint"]
      ? item["remotePrivateEndpoint"]
      : remotePrivateEndpointSerializer(item["remotePrivateEndpoint"]),
  };
}

export function privateEndpointConnectionProxyPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProxyProperties {
  return {
    provisioningState: item["provisioningState"],
    remotePrivateEndpoint: !item["remotePrivateEndpoint"]
      ? item["remotePrivateEndpoint"]
      : remotePrivateEndpointDeserializer(item["remotePrivateEndpoint"]),
  };
}

/** Represent remote private endpoint information for the private endpoint connection proxy. */
export interface RemotePrivateEndpoint {
  /** Gets or sets private link service proxy id. */
  id: string;
  /** Gets or sets the list of Private Link Service Connections and gets populated for Auto approval flow. */
  privateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** Gets or sets the list of Manual Private Link Service Connections and gets populated for Manual approval flow. */
  manualPrivateLinkServiceConnections?: PrivateLinkServiceConnection[];
  /** Gets or sets the list of private link service proxies. */
  privateLinkServiceProxies?: PrivateLinkServiceProxy[];
  /** Gets or sets the list of Connection Details. This is the connection details for private endpoint. */
  connectionDetails?: ConnectionDetails[];
}

export function remotePrivateEndpointSerializer(item: RemotePrivateEndpoint): any {
  return {
    id: item["id"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArraySerializer(item["manualPrivateLinkServiceConnections"]),
    privateLinkServiceProxies: !item["privateLinkServiceProxies"]
      ? item["privateLinkServiceProxies"]
      : privateLinkServiceProxyArraySerializer(item["privateLinkServiceProxies"]),
    connectionDetails: !item["connectionDetails"]
      ? item["connectionDetails"]
      : connectionDetailsArraySerializer(item["connectionDetails"]),
  };
}

export function remotePrivateEndpointDeserializer(item: any): RemotePrivateEndpoint {
  return {
    id: item["id"],
    privateLinkServiceConnections: !item["privateLinkServiceConnections"]
      ? item["privateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["privateLinkServiceConnections"]),
    manualPrivateLinkServiceConnections: !item["manualPrivateLinkServiceConnections"]
      ? item["manualPrivateLinkServiceConnections"]
      : privateLinkServiceConnectionArrayDeserializer(item["manualPrivateLinkServiceConnections"]),
    privateLinkServiceProxies: !item["privateLinkServiceProxies"]
      ? item["privateLinkServiceProxies"]
      : privateLinkServiceProxyArrayDeserializer(item["privateLinkServiceProxies"]),
    connectionDetails: !item["connectionDetails"]
      ? item["connectionDetails"]
      : connectionDetailsArrayDeserializer(item["connectionDetails"]),
  };
}

export function privateLinkServiceConnectionArraySerializer(
  result: Array<PrivateLinkServiceConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceConnectionSerializer(item);
  });
}

export function privateLinkServiceConnectionArrayDeserializer(
  result: Array<PrivateLinkServiceConnection>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceConnectionDeserializer(item);
  });
}

/** Represents of an NRP private link service connection. */
export interface PrivateLinkServiceConnection {
  /** Gets or sets private link service connection name. */
  name?: string;
  /** Gets or sets group ids. */
  groupIds?: string[];
  /** Gets or sets the request message for the private link service connection. */
  requestMessage?: string;
}

export function privateLinkServiceConnectionSerializer(item: PrivateLinkServiceConnection): any {
  return {
    name: item["name"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
  };
}

export function privateLinkServiceConnectionDeserializer(item: any): PrivateLinkServiceConnection {
  return {
    name: item["name"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    requestMessage: item["requestMessage"],
  };
}

export function privateLinkServiceProxyArraySerializer(
  result: Array<PrivateLinkServiceProxy>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceProxySerializer(item);
  });
}

export function privateLinkServiceProxyArrayDeserializer(
  result: Array<PrivateLinkServiceProxy>,
): any[] {
  return result.map((item) => {
    return privateLinkServiceProxyDeserializer(item);
  });
}

/** Represents NRP private link service proxy. */
export interface PrivateLinkServiceProxy {
  /** Gets or sets private link service proxy id. */
  id?: string;
  /** Represents Private link service connection state. */
  remotePrivateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** Represent remote private endpoint connection. */
  remotePrivateEndpointConnection?: RemotePrivateEndpointConnection;
  /** Gets or sets group connectivity information. */
  groupConnectivityInformation?: GroupConnectivityInformation[];
}

export function privateLinkServiceProxySerializer(item: PrivateLinkServiceProxy): any {
  return {
    id: item["id"],
    remotePrivateLinkServiceConnectionState: !item["remotePrivateLinkServiceConnectionState"]
      ? item["remotePrivateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(
          item["remotePrivateLinkServiceConnectionState"],
        ),
    remotePrivateEndpointConnection: !item["remotePrivateEndpointConnection"]
      ? item["remotePrivateEndpointConnection"]
      : remotePrivateEndpointConnectionSerializer(item["remotePrivateEndpointConnection"]),
    groupConnectivityInformation: !item["groupConnectivityInformation"]
      ? item["groupConnectivityInformation"]
      : groupConnectivityInformationArraySerializer(item["groupConnectivityInformation"]),
  };
}

export function privateLinkServiceProxyDeserializer(item: any): PrivateLinkServiceProxy {
  return {
    id: item["id"],
    remotePrivateLinkServiceConnectionState: !item["remotePrivateLinkServiceConnectionState"]
      ? item["remotePrivateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(
          item["remotePrivateLinkServiceConnectionState"],
        ),
    remotePrivateEndpointConnection: !item["remotePrivateEndpointConnection"]
      ? item["remotePrivateEndpointConnection"]
      : remotePrivateEndpointConnectionDeserializer(item["remotePrivateEndpointConnection"]),
    groupConnectivityInformation: !item["groupConnectivityInformation"]
      ? item["groupConnectivityInformation"]
      : groupConnectivityInformationArrayDeserializer(item["groupConnectivityInformation"]),
  };
}

/** Represent remote private endpoint connection. */
export interface RemotePrivateEndpointConnection {
  /** Gets or sets the remote private endpoint connection id. */
  id?: string;
}

export function remotePrivateEndpointConnectionSerializer(
  item: RemotePrivateEndpointConnection,
): any {
  return { id: item["id"] };
}

export function remotePrivateEndpointConnectionDeserializer(
  item: any,
): RemotePrivateEndpointConnection {
  return {
    id: item["id"],
  };
}

export function groupConnectivityInformationArraySerializer(
  result: Array<GroupConnectivityInformation>,
): any[] {
  return result.map((item) => {
    return groupConnectivityInformationSerializer(item);
  });
}

export function groupConnectivityInformationArrayDeserializer(
  result: Array<GroupConnectivityInformation>,
): any[] {
  return result.map((item) => {
    return groupConnectivityInformationDeserializer(item);
  });
}

/** Represents of a connection's group information. */
export interface GroupConnectivityInformation {
  /** Gets or sets group id. */
  groupId?: string;
  /** Gets or sets member name. */
  memberName?: string;
  /** Gets or sets customer visible FQDNs. */
  customerVisibleFqdns?: string[];
  /** Gets or sets Internal Fqdn. */
  internalFqdn?: string;
  /** Gets or sets the redirect map id. */
  redirectMapId?: string;
  /** Gets or sets the private link service arm region. */
  privateLinkServiceArmRegion?: string;
}

export function groupConnectivityInformationSerializer(item: GroupConnectivityInformation): any {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    customerVisibleFqdns: !item["customerVisibleFqdns"]
      ? item["customerVisibleFqdns"]
      : item["customerVisibleFqdns"].map((p: any) => {
          return p;
        }),
    internalFqdn: item["internalFqdn"],
    redirectMapId: item["redirectMapId"],
    privateLinkServiceArmRegion: item["privateLinkServiceArmRegion"],
  };
}

export function groupConnectivityInformationDeserializer(item: any): GroupConnectivityInformation {
  return {
    groupId: item["groupId"],
    memberName: item["memberName"],
    customerVisibleFqdns: !item["customerVisibleFqdns"]
      ? item["customerVisibleFqdns"]
      : item["customerVisibleFqdns"].map((p: any) => {
          return p;
        }),
    internalFqdn: item["internalFqdn"],
    redirectMapId: item["redirectMapId"],
    privateLinkServiceArmRegion: item["privateLinkServiceArmRegion"],
  };
}

export function connectionDetailsArraySerializer(result: Array<ConnectionDetails>): any[] {
  return result.map((item) => {
    return connectionDetailsSerializer(item);
  });
}

export function connectionDetailsArrayDeserializer(result: Array<ConnectionDetails>): any[] {
  return result.map((item) => {
    return connectionDetailsDeserializer(item);
  });
}

/** Private endpoint connection details at member level. */
export interface ConnectionDetails {
  /** Gets or sets id. */
  id?: string;
  /** Gets or sets private IP address. */
  privateIpAddress?: string;
  /** Gets or sets link identifier. */
  linkIdentifier?: string;
  /** Gets or sets group id. */
  groupId?: string;
  /** Gets or sets member name. */
  memberName?: string;
}

export function connectionDetailsSerializer(item: ConnectionDetails): any {
  return {
    id: item["id"],
    privateIpAddress: item["privateIpAddress"],
    linkIdentifier: item["linkIdentifier"],
    groupId: item["groupId"],
    memberName: item["memberName"],
  };
}

export function connectionDetailsDeserializer(item: any): ConnectionDetails {
  return {
    id: item["id"],
    privateIpAddress: item["privateIpAddress"],
    linkIdentifier: item["linkIdentifier"],
    groupId: item["groupId"],
    memberName: item["memberName"],
  };
}

/** The response of a PrivateEndpointConnectionProxy list operation. */
export interface _PrivateEndpointConnectionProxyListResult {
  /** The PrivateEndpointConnectionProxy items on this page */
  value: PrivateEndpointConnectionProxy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionProxyListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionProxyListResult {
  return {
    value: privateEndpointConnectionProxyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionProxyArraySerializer(
  result: Array<PrivateEndpointConnectionProxy>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionProxySerializer(item);
  });
}

export function privateEndpointConnectionProxyArrayDeserializer(
  result: Array<PrivateEndpointConnectionProxy>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionProxyDeserializer(item);
  });
}

/** Represents private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Represents private link resource properties. */
export interface PrivateLinkResourceProperties {
  /** Gets or sets the group id. */
  groupId?: string;
  /** Gets or sets the required member. This translates to how many Private IPs should be created for each privately linkable resource. */
  requiredMembers?: string[];
  /** Gets or sets the private DNS zone names. */
  requiredZoneNames?: string[];
  /** Gets or sets the provisioning state of the private link resource. */
  readonly provisioningState?: ProvisioningState;
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Protected item model. */
export interface ProtectedItemModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProtectedItemModelProperties;
}

export function protectedItemModelSerializer(item: ProtectedItemModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemModelPropertiesSerializer(item["properties"]),
  };
}

export function protectedItemModelDeserializer(item: any): ProtectedItemModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemModelPropertiesDeserializer(item["properties"]),
  };
}

/** Protected item model properties. */
export interface ProtectedItemModelProperties {
  /** Gets or sets the policy name. */
  policyName: string;
  /** Gets or sets the replication extension name. */
  replicationExtensionName: string;
  /** Gets or sets the protected item correlation Id. */
  readonly correlationId?: string;
  /** Gets or sets the provisioning state of the fabric agent. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the protection state. */
  readonly protectionState?: ProtectionState;
  /** Gets or sets the protection state description. */
  readonly protectionStateDescription?: string;
  /** Gets or sets the test failover state. */
  readonly testFailoverState?: TestFailoverState;
  /** Gets or sets the Test failover state description. */
  readonly testFailoverStateDescription?: string;
  /** Gets or sets the resynchronization state. */
  readonly resynchronizationState?: ResynchronizationState;
  /** Gets or sets the fabric object Id. */
  readonly fabricObjectId?: string;
  /** Gets or sets the fabric object name. */
  readonly fabricObjectName?: string;
  /** Gets or sets the source fabric provider Id. */
  readonly sourceFabricProviderId?: string;
  /** Gets or sets the target fabric provider Id. */
  readonly targetFabricProviderId?: string;
  /** Gets or sets the fabric Id. */
  readonly fabricId?: string;
  /** Gets or sets the target fabric Id. */
  readonly targetFabricId?: string;
  /** Gets or sets the fabric agent Id. */
  readonly fabricAgentId?: string;
  /** Gets or sets the target fabric agent Id. */
  readonly targetFabricAgentId?: string;
  /** Gets or sets a value indicating whether resynchronization is required or not. */
  readonly resyncRequired?: boolean;
  /** Gets or sets the Last successful planned failover time. */
  readonly lastSuccessfulPlannedFailoverTime?: Date;
  /** Gets or sets the Last successful unplanned failover time. */
  readonly lastSuccessfulUnplannedFailoverTime?: Date;
  /** Gets or sets the Last successful test failover time. */
  readonly lastSuccessfulTestFailoverTime?: Date;
  /** Gets or sets the current scenario. */
  readonly currentJob?: ProtectedItemJobProperties;
  /** Gets or sets the allowed scenarios on the protected item. */
  readonly allowedJobs?: string[];
  /** Gets or sets the last failed enabled protection job. */
  readonly lastFailedEnableProtectionJob?: ProtectedItemJobProperties;
  /** Gets or sets the last failed planned failover job. */
  readonly lastFailedPlannedFailoverJob?: ProtectedItemJobProperties;
  /** Gets or sets the last test failover job. */
  readonly lastTestFailoverJob?: ProtectedItemJobProperties;
  /** Gets or sets protected item replication health. */
  readonly replicationHealth?: HealthStatus;
  /** Gets or sets the list of health errors. */
  readonly healthErrors?: HealthErrorModel[];
  /** Protected item model custom properties. */
  customProperties: ProtectedItemModelCustomPropertiesUnion;
}

export function protectedItemModelPropertiesSerializer(item: ProtectedItemModelProperties): any {
  return {
    policyName: item["policyName"],
    replicationExtensionName: item["replicationExtensionName"],
    customProperties: protectedItemModelCustomPropertiesUnionSerializer(item["customProperties"]),
  };
}

export function protectedItemModelPropertiesDeserializer(item: any): ProtectedItemModelProperties {
  return {
    policyName: item["policyName"],
    replicationExtensionName: item["replicationExtensionName"],
    correlationId: item["correlationId"],
    provisioningState: item["provisioningState"],
    protectionState: item["protectionState"],
    protectionStateDescription: item["protectionStateDescription"],
    testFailoverState: item["testFailoverState"],
    testFailoverStateDescription: item["testFailoverStateDescription"],
    resynchronizationState: item["resynchronizationState"],
    fabricObjectId: item["fabricObjectId"],
    fabricObjectName: item["fabricObjectName"],
    sourceFabricProviderId: item["sourceFabricProviderId"],
    targetFabricProviderId: item["targetFabricProviderId"],
    fabricId: item["fabricId"],
    targetFabricId: item["targetFabricId"],
    fabricAgentId: item["fabricAgentId"],
    targetFabricAgentId: item["targetFabricAgentId"],
    resyncRequired: item["resyncRequired"],
    lastSuccessfulPlannedFailoverTime: !item["lastSuccessfulPlannedFailoverTime"]
      ? item["lastSuccessfulPlannedFailoverTime"]
      : new Date(item["lastSuccessfulPlannedFailoverTime"]),
    lastSuccessfulUnplannedFailoverTime: !item["lastSuccessfulUnplannedFailoverTime"]
      ? item["lastSuccessfulUnplannedFailoverTime"]
      : new Date(item["lastSuccessfulUnplannedFailoverTime"]),
    lastSuccessfulTestFailoverTime: !item["lastSuccessfulTestFailoverTime"]
      ? item["lastSuccessfulTestFailoverTime"]
      : new Date(item["lastSuccessfulTestFailoverTime"]),
    currentJob: !item["currentJob"]
      ? item["currentJob"]
      : protectedItemJobPropertiesDeserializer(item["currentJob"]),
    allowedJobs: !item["allowedJobs"]
      ? item["allowedJobs"]
      : item["allowedJobs"].map((p: any) => {
          return p;
        }),
    lastFailedEnableProtectionJob: !item["lastFailedEnableProtectionJob"]
      ? item["lastFailedEnableProtectionJob"]
      : protectedItemJobPropertiesDeserializer(item["lastFailedEnableProtectionJob"]),
    lastFailedPlannedFailoverJob: !item["lastFailedPlannedFailoverJob"]
      ? item["lastFailedPlannedFailoverJob"]
      : protectedItemJobPropertiesDeserializer(item["lastFailedPlannedFailoverJob"]),
    lastTestFailoverJob: !item["lastTestFailoverJob"]
      ? item["lastTestFailoverJob"]
      : protectedItemJobPropertiesDeserializer(item["lastTestFailoverJob"]),
    replicationHealth: item["replicationHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorModelArrayDeserializer(item["healthErrors"]),
    customProperties: protectedItemModelCustomPropertiesUnionDeserializer(item["customProperties"]),
  };
}

/** Gets or sets the protection state. */
export enum KnownProtectionState {
  /** Begin marker for unprotected states. */
  UnprotectedStatesBegin = "UnprotectedStatesBegin",
  /** Enable protection is in progress. */
  EnablingProtection = "EnablingProtection",
  /** Enable protection failed. */
  EnablingFailed = "EnablingFailed",
  /** Disabling protection is in progress. */
  DisablingProtection = "DisablingProtection",
  /** Disabling protection succeeded. This is a transient state before the protected item is deleted. */
  MarkedForDeletion = "MarkedForDeletion",
  /** Disable protection failed. */
  DisablingFailed = "DisablingFailed",
  /** End marker for unprotected states. */
  UnprotectedStatesEnd = "UnprotectedStatesEnd",
  /** Begin marker for initial replication states. */
  InitialReplicationStatesBegin = "InitialReplicationStatesBegin",
  /** Initial replication is in progress. */
  InitialReplicationInProgress = "InitialReplicationInProgress",
  /** Initial replication has completed on the primary side. */
  InitialReplicationCompletedOnPrimary = "InitialReplicationCompletedOnPrimary",
  /** Initial replication has completed on the recovery side. */
  InitialReplicationCompletedOnRecovery = "InitialReplicationCompletedOnRecovery",
  /** Initial replication failed and would need to be started again. */
  InitialReplicationFailed = "InitialReplicationFailed",
  /** End marker for initial replication states. */
  InitialReplicationStatesEnd = "InitialReplicationStatesEnd",
  /** Begin marker for protected steady-state states. */
  ProtectedStatesBegin = "ProtectedStatesBegin",
  /** Protected item is protected and replication is on-going. Any issues with replication will be surfaced separately via the health property and will not affect the state. */
  Protected = "Protected",
  /** End marker for protected steady-state states. */
  ProtectedStatesEnd = "ProtectedStatesEnd",
  /** Begin marker for planned failover transition states. */
  PlannedFailoverTransitionStatesBegin = "PlannedFailoverTransitionStatesBegin",
  /** Planned failover has been initiated. */
  PlannedFailoverInitiated = "PlannedFailoverInitiated",
  /** Planned failover preparing protected entities is in progress. */
  PlannedFailoverCompleting = "PlannedFailoverCompleting",
  /** Planned failover has been completed successfully. */
  PlannedFailoverCompleted = "PlannedFailoverCompleted",
  /** Planned failover initiation failed. */
  PlannedFailoverFailed = "PlannedFailoverFailed",
  /** Planned failover preparing protected entities failed. */
  PlannedFailoverCompletionFailed = "PlannedFailoverCompletionFailed",
  /** End marker for planned failover transition states. */
  PlannedFailoverTransitionStatesEnd = "PlannedFailoverTransitionStatesEnd",
  /** Begin marker for unplanned failover transition states. */
  UnplannedFailoverTransitionStatesBegin = "UnplannedFailoverTransitionStatesBegin",
  /** Unplanned failover has been initiated. */
  UnplannedFailoverInitiated = "UnplannedFailoverInitiated",
  /** Unplanned failover preparing protected entities is in progress. */
  UnplannedFailoverCompleting = "UnplannedFailoverCompleting",
  /** Unplanned failover preparing protected entities is in progress. */
  UnplannedFailoverCompleted = "UnplannedFailoverCompleted",
  /** Unplanned failover initiation failed. */
  UnplannedFailoverFailed = "UnplannedFailoverFailed",
  /** Unplanned failover preparing protected entities failed. */
  UnplannedFailoverCompletionFailed = "UnplannedFailoverCompletionFailed",
  /** End marker for unplanned failover transition states. */
  UnplannedFailoverTransitionStatesEnd = "UnplannedFailoverTransitionStatesEnd",
  /** Begin marker for commit failover states. */
  CommitFailoverStatesBegin = "CommitFailoverStatesBegin",
  /** Commit failover is in progress on the primary side. */
  CommitFailoverInProgressOnPrimary = "CommitFailoverInProgressOnPrimary",
  /** Commit failover is in progress on the recovery side. */
  CommitFailoverInProgressOnRecovery = "CommitFailoverInProgressOnRecovery",
  /** Commit failover has been completed successfully. */
  CommitFailoverCompleted = "CommitFailoverCompleted",
  /** Commit failover failed on the primary side. */
  CommitFailoverFailedOnPrimary = "CommitFailoverFailedOnPrimary",
  /** Commit failover failed on the recovery side. */
  CommitFailoverFailedOnRecovery = "CommitFailoverFailedOnRecovery",
  /** End marker for commit failover states. */
  CommitFailoverStatesEnd = "CommitFailoverStatesEnd",
  /** Begin marker for cancel failover states. */
  CancelFailoverStatesBegin = "CancelFailoverStatesBegin",
  /** Cancel failover is in progress on the primary side. */
  CancelFailoverInProgressOnPrimary = "CancelFailoverInProgressOnPrimary",
  /** Cancel failover is in progress on the recovery side. */
  CancelFailoverInProgressOnRecovery = "CancelFailoverInProgressOnRecovery",
  /** Cancel failover failed on the primary side. */
  CancelFailoverFailedOnPrimary = "CancelFailoverFailedOnPrimary",
  /** Cancel failover failed on the recovery side. */
  CancelFailoverFailedOnRecovery = "CancelFailoverFailedOnRecovery",
  /** End marker for cancel failover states. */
  CancelFailoverStatesEnd = "CancelFailoverStatesEnd",
  /** Begin marker for change recovery point states. */
  ChangeRecoveryPointStatesBegin = "ChangeRecoveryPointStatesBegin",
  /** Change recovery point has been initiated.. */
  ChangeRecoveryPointInitiated = "ChangeRecoveryPointInitiated",
  /** Change recovery point has been completed successfully. */
  ChangeRecoveryPointCompleted = "ChangeRecoveryPointCompleted",
  /** Change recovery point has failed. */
  ChangeRecoveryPointFailed = "ChangeRecoveryPointFailed",
  /** End marker for change recovery point states. */
  ChangeRecoveryPointStatesEnd = "ChangeRecoveryPointStatesEnd",
  /** Begin marker for reprotect states. */
  ReprotectStatesBegin = "ReprotectStatesBegin",
  /** Reprotect has been initiated. */
  ReprotectInitiated = "ReprotectInitiated",
  /** Reprotect has failed. */
  ReprotectFailed = "ReprotectFailed",
  /** End marker for reprotect states. */
  ReprotectStatesEnd = "ReprotectStatesEnd",
}

/**
 * Gets or sets the protection state. \
 * {@link KnownProtectionState} can be used interchangeably with ProtectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UnprotectedStatesBegin**: Begin marker for unprotected states. \
 * **EnablingProtection**: Enable protection is in progress. \
 * **EnablingFailed**: Enable protection failed. \
 * **DisablingProtection**: Disabling protection is in progress. \
 * **MarkedForDeletion**: Disabling protection succeeded. This is a transient state before the protected item is deleted. \
 * **DisablingFailed**: Disable protection failed. \
 * **UnprotectedStatesEnd**: End marker for unprotected states. \
 * **InitialReplicationStatesBegin**: Begin marker for initial replication states. \
 * **InitialReplicationInProgress**: Initial replication is in progress. \
 * **InitialReplicationCompletedOnPrimary**: Initial replication has completed on the primary side. \
 * **InitialReplicationCompletedOnRecovery**: Initial replication has completed on the recovery side. \
 * **InitialReplicationFailed**: Initial replication failed and would need to be started again. \
 * **InitialReplicationStatesEnd**: End marker for initial replication states. \
 * **ProtectedStatesBegin**: Begin marker for protected steady-state states. \
 * **Protected**: Protected item is protected and replication is on-going. Any issues with replication will be surfaced separately via the health property and will not affect the state. \
 * **ProtectedStatesEnd**: End marker for protected steady-state states. \
 * **PlannedFailoverTransitionStatesBegin**: Begin marker for planned failover transition states. \
 * **PlannedFailoverInitiated**: Planned failover has been initiated. \
 * **PlannedFailoverCompleting**: Planned failover preparing protected entities is in progress. \
 * **PlannedFailoverCompleted**: Planned failover has been completed successfully. \
 * **PlannedFailoverFailed**: Planned failover initiation failed. \
 * **PlannedFailoverCompletionFailed**: Planned failover preparing protected entities failed. \
 * **PlannedFailoverTransitionStatesEnd**: End marker for planned failover transition states. \
 * **UnplannedFailoverTransitionStatesBegin**: Begin marker for unplanned failover transition states. \
 * **UnplannedFailoverInitiated**: Unplanned failover has been initiated. \
 * **UnplannedFailoverCompleting**: Unplanned failover preparing protected entities is in progress. \
 * **UnplannedFailoverCompleted**: Unplanned failover preparing protected entities is in progress. \
 * **UnplannedFailoverFailed**: Unplanned failover initiation failed. \
 * **UnplannedFailoverCompletionFailed**: Unplanned failover preparing protected entities failed. \
 * **UnplannedFailoverTransitionStatesEnd**: End marker for unplanned failover transition states. \
 * **CommitFailoverStatesBegin**: Begin marker for commit failover states. \
 * **CommitFailoverInProgressOnPrimary**: Commit failover is in progress on the primary side. \
 * **CommitFailoverInProgressOnRecovery**: Commit failover is in progress on the recovery side. \
 * **CommitFailoverCompleted**: Commit failover has been completed successfully. \
 * **CommitFailoverFailedOnPrimary**: Commit failover failed on the primary side. \
 * **CommitFailoverFailedOnRecovery**: Commit failover failed on the recovery side. \
 * **CommitFailoverStatesEnd**: End marker for commit failover states. \
 * **CancelFailoverStatesBegin**: Begin marker for cancel failover states. \
 * **CancelFailoverInProgressOnPrimary**: Cancel failover is in progress on the primary side. \
 * **CancelFailoverInProgressOnRecovery**: Cancel failover is in progress on the recovery side. \
 * **CancelFailoverFailedOnPrimary**: Cancel failover failed on the primary side. \
 * **CancelFailoverFailedOnRecovery**: Cancel failover failed on the recovery side. \
 * **CancelFailoverStatesEnd**: End marker for cancel failover states. \
 * **ChangeRecoveryPointStatesBegin**: Begin marker for change recovery point states. \
 * **ChangeRecoveryPointInitiated**: Change recovery point has been initiated.. \
 * **ChangeRecoveryPointCompleted**: Change recovery point has been completed successfully. \
 * **ChangeRecoveryPointFailed**: Change recovery point has failed. \
 * **ChangeRecoveryPointStatesEnd**: End marker for change recovery point states. \
 * **ReprotectStatesBegin**: Begin marker for reprotect states. \
 * **ReprotectInitiated**: Reprotect has been initiated. \
 * **ReprotectFailed**: Reprotect has failed. \
 * **ReprotectStatesEnd**: End marker for reprotect states.
 */
export type ProtectionState = string;

/** Gets or sets the test failover state. */
export enum KnownTestFailoverState {
  /** Test failover is not active. */
  None = "None",
  /** Test failover has been initiated. */
  TestFailoverInitiated = "TestFailoverInitiated",
  /** Preparing test protected entities is in progress. */
  TestFailoverCompleting = "TestFailoverCompleting",
  /** Test failover has been completed successfully. */
  TestFailoverCompleted = "TestFailoverCompleted",
  /** Test failover initiation failed.. */
  TestFailoverFailed = "TestFailoverFailed",
  /** Preparing test protected entities failed. */
  TestFailoverCompletionFailed = "TestFailoverCompletionFailed",
  /** Test failover cleanup has been initiated. */
  TestFailoverCleanupInitiated = "TestFailoverCleanupInitiated",
  /** Cleaning up test protected entities is in progress. */
  TestFailoverCleanupCompleting = "TestFailoverCleanupCompleting",
  /** Test failover cleanup has completed/failed. This is a transient state before the state is moved back to None. */
  MarkedForDeletion = "MarkedForDeletion",
}

/**
 * Gets or sets the test failover state. \
 * {@link KnownTestFailoverState} can be used interchangeably with TestFailoverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Test failover is not active. \
 * **TestFailoverInitiated**: Test failover has been initiated. \
 * **TestFailoverCompleting**: Preparing test protected entities is in progress. \
 * **TestFailoverCompleted**: Test failover has been completed successfully. \
 * **TestFailoverFailed**: Test failover initiation failed.. \
 * **TestFailoverCompletionFailed**: Preparing test protected entities failed. \
 * **TestFailoverCleanupInitiated**: Test failover cleanup has been initiated. \
 * **TestFailoverCleanupCompleting**: Cleaning up test protected entities is in progress. \
 * **MarkedForDeletion**: Test failover cleanup has completed\/failed. This is a transient state before the state is moved back to None.
 */
export type TestFailoverState = string;

/** Gets or sets the resynchronization state. */
export enum KnownResynchronizationState {
  /** Resynchronization is not active. */
  None = "None",
  /** Resynchronization has been initiated. */
  ResynchronizationInitiated = "ResynchronizationInitiated",
  /** Resynchronization has been completed successfully. */
  ResynchronizationCompleted = "ResynchronizationCompleted",
  /** Resynchronization has failed and would need to be started again. */
  ResynchronizationFailed = "ResynchronizationFailed",
}

/**
 * Gets or sets the resynchronization state. \
 * {@link KnownResynchronizationState} can be used interchangeably with ResynchronizationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Resynchronization is not active. \
 * **ResynchronizationInitiated**: Resynchronization has been initiated. \
 * **ResynchronizationCompleted**: Resynchronization has been completed successfully. \
 * **ResynchronizationFailed**: Resynchronization has failed and would need to be started again.
 */
export type ResynchronizationState = string;

/** Protected item job properties. */
export interface ProtectedItemJobProperties {
  /** Gets or sets protection scenario name. */
  readonly scenarioName?: string;
  /** Gets or sets job Id. */
  readonly id?: string;
  /** Gets or sets job name. */
  readonly name?: string;
  /** Gets or sets the job friendly display name. */
  readonly displayName?: string;
  /** Gets or sets job state. */
  readonly state?: string;
  /** Gets or sets start time of the job. */
  readonly startTime?: Date;
  /** Gets or sets end time of the job. */
  readonly endTime?: Date;
}

export function protectedItemJobPropertiesDeserializer(item: any): ProtectedItemJobProperties {
  return {
    scenarioName: item["scenarioName"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
  };
}

/** Protected item model custom properties. */
export interface ProtectedItemModelCustomProperties {
  /** Discriminator property for ProtectedItemModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function protectedItemModelCustomPropertiesSerializer(
  item: ProtectedItemModelCustomProperties,
): any {
  return { instanceType: item["instanceType"] };
}

export function protectedItemModelCustomPropertiesDeserializer(
  item: any,
): ProtectedItemModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ProtectedItemModelCustomPropertiesUnion */
export type ProtectedItemModelCustomPropertiesUnion =
  | HyperVToAzStackHCIProtectedItemModelCustomProperties
  | VMwareToAzStackHCIProtectedItemModelCustomProperties
  | ProtectedItemModelCustomProperties;

export function protectedItemModelCustomPropertiesUnionSerializer(
  item: ProtectedItemModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIProtectedItemModelCustomPropertiesSerializer(
        item as HyperVToAzStackHCIProtectedItemModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIProtectedItemModelCustomPropertiesSerializer(
        item as VMwareToAzStackHCIProtectedItemModelCustomProperties,
      );

    default:
      return protectedItemModelCustomPropertiesSerializer(item);
  }
}

export function protectedItemModelCustomPropertiesUnionDeserializer(
  item: any,
): ProtectedItemModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIProtectedItemModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIProtectedItemModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIProtectedItemModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIProtectedItemModelCustomProperties,
      );

    default:
      return protectedItemModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV to AzStackHCI Protected item model custom properties. */
export interface HyperVToAzStackHCIProtectedItemModelCustomProperties extends ProtectedItemModelCustomProperties {
  /** Gets or sets the location of the protected item. */
  readonly activeLocation?: ProtectedItemActiveLocation;
  /** Gets or sets the Target HCI Cluster ARM Id. */
  targetHciClusterId: string;
  /** Gets or sets the Target Arc Cluster Custom Location ARM Id. */
  targetArcClusterCustomLocationId: string;
  /** Gets or sets the Target AzStackHCI cluster name. */
  readonly targetAzStackHciClusterName?: string;
  /** Gets or sets the ARM Id of the discovered machine. */
  fabricDiscoveryMachineId: string;
  /** Gets or sets the list of disks to replicate. */
  disksToInclude: HyperVToAzStackHCIDiskInput[];
  /** Gets or sets the list of VM NIC to replicate. */
  nicsToInclude: HyperVToAzStackHCINicInput[];
  /** Gets or sets the source VM display name. */
  readonly sourceVmName?: string;
  /** Gets or sets the source VM CPU cores. */
  readonly sourceCpuCores?: number;
  /** Gets or sets the source VM ram memory size in megabytes. */
  readonly sourceMemoryInMegaBytes?: number;
  /** Gets or sets the target VM display name. */
  targetVmName?: string;
  /** Gets or sets the target resource group ARM Id. */
  targetResourceGroupId: string;
  /** Gets or sets the target storage container ARM Id. */
  storageContainerId: string;
  /** Gets or sets the hypervisor generation of the virtual machine. */
  hyperVGeneration: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  testNetworkId?: string;
  /** Gets or sets the target CPU cores. */
  targetCpuCores?: number;
  /** Gets or sets a value indicating whether memory is dynamical. */
  isDynamicRam?: boolean;
  /** Protected item dynamic memory config. */
  dynamicMemoryConfig?: ProtectedItemDynamicMemoryConfig;
  /** Gets or sets the target memory in mega-bytes. */
  targetMemoryInMegaBytes?: number;
  /** Gets or sets the Run As account Id. */
  runAsAccountId: string;
  /** Gets or sets the source fabric agent name. */
  sourceFabricAgentName: string;
  /** Gets or sets the target fabric agent name. */
  targetFabricAgentName: string;
  /** Gets or sets the source appliance name. */
  readonly sourceApplianceName?: string;
  /** Gets or sets the target appliance name. */
  readonly targetApplianceName?: string;
  /** Gets or sets the type of the OS. */
  readonly osType?: string;
  /** Gets or sets the name of the OS. */
  readonly osName?: string;
  /** Gets or sets the firmware type. */
  readonly firmwareType?: string;
  /** Gets or sets the target location. */
  readonly targetLocation?: string;
  /** Gets or sets the location of Azure Arc HCI custom location resource. */
  customLocationRegion: string;
  /** Gets or sets the recovery point Id to which the VM was failed over. */
  readonly failoverRecoveryPointId?: string;
  /** Gets or sets the last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** Gets or sets the last recovery point Id. */
  readonly lastRecoveryPointId?: string;
  /** Gets or sets the initial replication progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly initialReplicationProgressPercentage?: number;
  /** Gets or sets the resync progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly resyncProgressPercentage?: number;
  /** Gets or sets the list of protected disks. */
  readonly protectedDisks?: HyperVToAzStackHCIProtectedDiskProperties[];
  /** Gets or sets the VM NIC details. */
  readonly protectedNics?: HyperVToAzStackHCIProtectedNicProperties[];
  /** Gets or sets the BIOS Id of the target AzStackHCI VM. */
  readonly targetVmBiosId?: string;
  /** Gets or sets the latest timestamp that replication status is updated. */
  readonly lastReplicationUpdateTime?: Date;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIProtectedItemModelCustomPropertiesSerializer(
  item: HyperVToAzStackHCIProtectedItemModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    targetHciClusterId: item["targetHciClusterId"],
    targetArcClusterCustomLocationId: item["targetArcClusterCustomLocationId"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    disksToInclude: hyperVToAzStackHCIDiskInputArraySerializer(item["disksToInclude"]),
    nicsToInclude: hyperVToAzStackHCINicInputArraySerializer(item["nicsToInclude"]),
    targetVmName: item["targetVmName"],
    targetResourceGroupId: item["targetResourceGroupId"],
    storageContainerId: item["storageContainerId"],
    hyperVGeneration: item["hyperVGeneration"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigSerializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    runAsAccountId: item["runAsAccountId"],
    sourceFabricAgentName: item["sourceFabricAgentName"],
    targetFabricAgentName: item["targetFabricAgentName"],
    customLocationRegion: item["customLocationRegion"],
  };
}

export function hyperVToAzStackHCIProtectedItemModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIProtectedItemModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    activeLocation: item["activeLocation"],
    targetHciClusterId: item["targetHciClusterId"],
    targetArcClusterCustomLocationId: item["targetArcClusterCustomLocationId"],
    targetAzStackHciClusterName: item["targetAzStackHciClusterName"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    disksToInclude: hyperVToAzStackHCIDiskInputArrayDeserializer(item["disksToInclude"]),
    nicsToInclude: hyperVToAzStackHCINicInputArrayDeserializer(item["nicsToInclude"]),
    sourceVmName: item["sourceVmName"],
    sourceCpuCores: item["sourceCpuCores"],
    sourceMemoryInMegaBytes: item["sourceMemoryInMegaBytes"],
    targetVmName: item["targetVmName"],
    targetResourceGroupId: item["targetResourceGroupId"],
    storageContainerId: item["storageContainerId"],
    hyperVGeneration: item["hyperVGeneration"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigDeserializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    runAsAccountId: item["runAsAccountId"],
    sourceFabricAgentName: item["sourceFabricAgentName"],
    targetFabricAgentName: item["targetFabricAgentName"],
    sourceApplianceName: item["sourceApplianceName"],
    targetApplianceName: item["targetApplianceName"],
    osType: item["osType"],
    osName: item["osName"],
    firmwareType: item["firmwareType"],
    targetLocation: item["targetLocation"],
    customLocationRegion: item["customLocationRegion"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    lastRecoveryPointId: item["lastRecoveryPointId"],
    initialReplicationProgressPercentage: item["initialReplicationProgressPercentage"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : hyperVToAzStackHCIProtectedDiskPropertiesArrayDeserializer(item["protectedDisks"]),
    protectedNics: !item["protectedNics"]
      ? item["protectedNics"]
      : hyperVToAzStackHCIProtectedNicPropertiesArrayDeserializer(item["protectedNics"]),
    targetVmBiosId: item["targetVmBiosId"],
    lastReplicationUpdateTime: !item["lastReplicationUpdateTime"]
      ? item["lastReplicationUpdateTime"]
      : new Date(item["lastReplicationUpdateTime"]),
  };
}

/** Gets or sets the location of the protected item. */
export enum KnownProtectedItemActiveLocation {
  /** Protected item is active on Primary. */
  Primary = "Primary",
  /** Protected item is active on Recovery. */
  Recovery = "Recovery",
}

/**
 * Gets or sets the location of the protected item. \
 * {@link KnownProtectedItemActiveLocation} can be used interchangeably with ProtectedItemActiveLocation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Protected item is active on Primary. \
 * **Recovery**: Protected item is active on Recovery.
 */
export type ProtectedItemActiveLocation = string;

export function hyperVToAzStackHCIDiskInputArraySerializer(
  result: Array<HyperVToAzStackHCIDiskInput>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCIDiskInputSerializer(item);
  });
}

export function hyperVToAzStackHCIDiskInputArrayDeserializer(
  result: Array<HyperVToAzStackHCIDiskInput>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCIDiskInputDeserializer(item);
  });
}

/** HyperVToAzStack disk input. */
export interface HyperVToAzStackHCIDiskInput {
  /** Gets or sets the disk Id. */
  diskId: string;
  /** Gets or sets the target storage account ARM Id. */
  storageContainerId?: string;
  /** Gets or sets a value indicating whether dynamic sizing is enabled on the virtual hard disk. */
  isDynamic?: boolean;
  /** Gets or sets the disk size in GB. */
  diskSizeGB: number;
  /** Gets or sets the type of the virtual hard disk, vhd or vhdx. */
  diskFileFormat: string;
  /** Gets or sets a value indicating whether disk is os disk. */
  isOsDisk: boolean;
  /** Gets or sets a value of disk block size. */
  diskBlockSize?: number;
  /** Gets or sets a value of disk logical sector size. */
  diskLogicalSectorSize?: number;
  /** Gets or sets a value of disk physical sector size. */
  diskPhysicalSectorSize?: number;
  /** Gets or sets a value of disk identifier. */
  diskIdentifier?: string;
  /** Disk controller. */
  diskController?: DiskControllerInputs;
}

export function hyperVToAzStackHCIDiskInputSerializer(item: HyperVToAzStackHCIDiskInput): any {
  return {
    diskId: item["diskId"],
    storageContainerId: item["storageContainerId"],
    isDynamic: item["isDynamic"],
    diskSizeGB: item["diskSizeGB"],
    diskFileFormat: item["diskFileFormat"],
    isOsDisk: item["isOsDisk"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
    diskIdentifier: item["diskIdentifier"],
    diskController: !item["diskController"]
      ? item["diskController"]
      : diskControllerInputsSerializer(item["diskController"]),
  };
}

export function hyperVToAzStackHCIDiskInputDeserializer(item: any): HyperVToAzStackHCIDiskInput {
  return {
    diskId: item["diskId"],
    storageContainerId: item["storageContainerId"],
    isDynamic: item["isDynamic"],
    diskSizeGB: item["diskSizeGB"],
    diskFileFormat: item["diskFileFormat"],
    isOsDisk: item["isOsDisk"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
    diskIdentifier: item["diskIdentifier"],
    diskController: !item["diskController"]
      ? item["diskController"]
      : diskControllerInputsDeserializer(item["diskController"]),
  };
}

/** Disk controller. */
export interface DiskControllerInputs {
  /** Gets or sets the controller name (IDE,SCSI). */
  controllerName: string;
  /** Gets or sets the controller ID. */
  controllerId: number;
  /** Gets or sets the controller Location. */
  controllerLocation: number;
}

export function diskControllerInputsSerializer(item: DiskControllerInputs): any {
  return {
    controllerName: item["controllerName"],
    controllerId: item["controllerId"],
    controllerLocation: item["controllerLocation"],
  };
}

export function diskControllerInputsDeserializer(item: any): DiskControllerInputs {
  return {
    controllerName: item["controllerName"],
    controllerId: item["controllerId"],
    controllerLocation: item["controllerLocation"],
  };
}

export function hyperVToAzStackHCINicInputArraySerializer(
  result: Array<HyperVToAzStackHCINicInput>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCINicInputSerializer(item);
  });
}

export function hyperVToAzStackHCINicInputArrayDeserializer(
  result: Array<HyperVToAzStackHCINicInput>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCINicInputDeserializer(item);
  });
}

/** HyperVToAzStackHCI NIC properties. */
export interface HyperVToAzStackHCINicInput {
  /** Gets or sets the NIC Id. */
  nicId: string;
  /** Gets or sets the network name. */
  readonly networkName?: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  testNetworkId?: string;
  /** Gets or sets the selection type of the NIC. */
  selectionTypeForFailover: VMNicSelection;
  /** Gets or sets a value indicating whether static ip migration is enabled. */
  isStaticIpMigrationEnabled?: boolean;
  /** Gets or sets a value indicating whether mac address migration is enabled. */
  isMacMigrationEnabled?: boolean;
}

export function hyperVToAzStackHCINicInputSerializer(item: HyperVToAzStackHCINicInput): any {
  return {
    nicId: item["nicId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
    isStaticIpMigrationEnabled: item["isStaticIpMigrationEnabled"],
    isMacMigrationEnabled: item["isMacMigrationEnabled"],
  };
}

export function hyperVToAzStackHCINicInputDeserializer(item: any): HyperVToAzStackHCINicInput {
  return {
    nicId: item["nicId"],
    networkName: item["networkName"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
    isStaticIpMigrationEnabled: item["isStaticIpMigrationEnabled"],
    isMacMigrationEnabled: item["isMacMigrationEnabled"],
  };
}

/** Gets or sets the selection type of the NIC. */
export enum KnownVMNicSelection {
  /** Not Selected. */
  NotSelected = "NotSelected",
  /** Selected by user. */
  SelectedByUser = "SelectedByUser",
  /** Default selection by ASR. */
  SelectedByDefault = "SelectedByDefault",
  /** NIC configuration overridden by user. Differs from SelectedByUser in the sense that the legacy SelectedByUser is used both for explicit modification by user and implicit approval of user if the settings are used for TFO/FO. SelectedByUserOverride implies user overriding at least one of the configurations. */
  SelectedByUserOverride = "SelectedByUserOverride",
}

/**
 * Gets or sets the selection type of the NIC. \
 * {@link KnownVMNicSelection} can be used interchangeably with VMNicSelection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSelected**: Not Selected. \
 * **SelectedByUser**: Selected by user. \
 * **SelectedByDefault**: Default selection by ASR. \
 * **SelectedByUserOverride**: NIC configuration overridden by user. Differs from SelectedByUser in the sense that the legacy SelectedByUser is used both for explicit modification by user and implicit approval of user if the settings are used for TFO\/FO. SelectedByUserOverride implies user overriding at least one of the configurations.
 */
export type VMNicSelection = string;

/** Protected item dynamic memory config. */
export interface ProtectedItemDynamicMemoryConfig {
  /** Gets or sets maximum memory in MB. */
  maximumMemoryInMegaBytes: number;
  /** Gets or sets minimum memory in MB. */
  minimumMemoryInMegaBytes: number;
  /** Gets or sets target memory buffer in %. */
  targetMemoryBufferPercentage: number;
}

export function protectedItemDynamicMemoryConfigSerializer(
  item: ProtectedItemDynamicMemoryConfig,
): any {
  return {
    maximumMemoryInMegaBytes: item["maximumMemoryInMegaBytes"],
    minimumMemoryInMegaBytes: item["minimumMemoryInMegaBytes"],
    targetMemoryBufferPercentage: item["targetMemoryBufferPercentage"],
  };
}

export function protectedItemDynamicMemoryConfigDeserializer(
  item: any,
): ProtectedItemDynamicMemoryConfig {
  return {
    maximumMemoryInMegaBytes: item["maximumMemoryInMegaBytes"],
    minimumMemoryInMegaBytes: item["minimumMemoryInMegaBytes"],
    targetMemoryBufferPercentage: item["targetMemoryBufferPercentage"],
  };
}

export function hyperVToAzStackHCIProtectedDiskPropertiesArrayDeserializer(
  result: Array<HyperVToAzStackHCIProtectedDiskProperties>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCIProtectedDiskPropertiesDeserializer(item);
  });
}

/** HyperVToAzStackHCI protected disk properties. */
export interface HyperVToAzStackHCIProtectedDiskProperties {
  /** Gets or sets the ARM Id of the storage container. */
  readonly storageContainerId?: string;
  /** Gets or sets the local path of the storage container. */
  readonly storageContainerLocalPath?: string;
  /** Gets or sets the source disk Id. */
  readonly sourceDiskId?: string;
  /** Gets or sets the source disk Name. */
  readonly sourceDiskName?: string;
  /** Gets or sets the seed disk name. */
  readonly seedDiskName?: string;
  /** Gets or sets the test failover clone disk. */
  readonly testMigrateDiskName?: string;
  /** Gets or sets the failover clone disk. */
  readonly migrateDiskName?: string;
  /** Gets or sets a value indicating whether the disk is the OS disk. */
  readonly isOsDisk?: boolean;
  /** Gets or sets the disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** Gets or sets a value indicating whether dynamic sizing is enabled on the virtual hard disk. */
  readonly isDynamic?: boolean;
  /** Gets or sets the disk type. */
  readonly diskType?: string;
  /** Gets or sets a value of disk block size. */
  readonly diskBlockSize?: number;
  /** Gets or sets a value of disk logical sector size. */
  readonly diskLogicalSectorSize?: number;
  /** Gets or sets a value of disk physical sector size. */
  readonly diskPhysicalSectorSize?: number;
}

export function hyperVToAzStackHCIProtectedDiskPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIProtectedDiskProperties {
  return {
    storageContainerId: item["storageContainerId"],
    storageContainerLocalPath: item["storageContainerLocalPath"],
    sourceDiskId: item["sourceDiskId"],
    sourceDiskName: item["sourceDiskName"],
    seedDiskName: item["seedDiskName"],
    testMigrateDiskName: item["testMigrateDiskName"],
    migrateDiskName: item["migrateDiskName"],
    isOsDisk: item["isOsDisk"],
    capacityInBytes: item["capacityInBytes"],
    isDynamic: item["isDynamic"],
    diskType: item["diskType"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
  };
}

export function hyperVToAzStackHCIProtectedNicPropertiesArrayDeserializer(
  result: Array<HyperVToAzStackHCIProtectedNicProperties>,
): any[] {
  return result.map((item) => {
    return hyperVToAzStackHCIProtectedNicPropertiesDeserializer(item);
  });
}

/** HyperVToAzStackHCI NIC properties. */
export interface HyperVToAzStackHCIProtectedNicProperties {
  /** Gets or sets the NIC Id. */
  readonly nicId?: string;
  /** Gets or sets the NIC mac address. */
  readonly macAddress?: string;
  /** Gets or sets the network name. */
  readonly networkName?: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  readonly targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  readonly testNetworkId?: string;
  /** Gets or sets the selection type of the NIC. */
  readonly selectionTypeForFailover?: VMNicSelection;
}

export function hyperVToAzStackHCIProtectedNicPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIProtectedNicProperties {
  return {
    nicId: item["nicId"],
    macAddress: item["macAddress"],
    networkName: item["networkName"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
  };
}

/** VMware to AzStackHCI Protected item model custom properties. */
export interface VMwareToAzStackHCIProtectedItemModelCustomProperties extends ProtectedItemModelCustomProperties {
  /** Gets or sets the location of the protected item. */
  readonly activeLocation?: ProtectedItemActiveLocation;
  /** Gets or sets the Target HCI Cluster ARM Id. */
  targetHciClusterId: string;
  /** Gets or sets the Target Arc Cluster Custom Location ARM Id. */
  targetArcClusterCustomLocationId: string;
  /** Gets or sets the Target AzStackHCI cluster name. */
  readonly targetAzStackHciClusterName?: string;
  /** Gets or sets the target storage container ARM Id. */
  storageContainerId: string;
  /** Gets or sets the target resource group ARM Id. */
  targetResourceGroupId: string;
  /** Gets or sets the target location. */
  readonly targetLocation?: string;
  /** Gets or sets the location of Azure Arc HCI custom location resource. */
  customLocationRegion: string;
  /** Gets or sets the list of disks to replicate. */
  disksToInclude: VMwareToAzStackHCIDiskInput[];
  /** Gets or sets the list of VM NIC to replicate. */
  nicsToInclude: VMwareToAzStackHCINicInput[];
  /** Gets or sets the list of protected disks. */
  readonly protectedDisks?: VMwareToAzStackHCIProtectedDiskProperties[];
  /** Gets or sets the VM NIC details. */
  readonly protectedNics?: VMwareToAzStackHCIProtectedNicProperties[];
  /** Gets or sets the BIOS Id of the target AzStackHCI VM. */
  readonly targetVmBiosId?: string;
  /** Gets or sets the target VM display name. */
  targetVmName?: string;
  /** Gets or sets the hypervisor generation of the virtual machine possible values are 1,2. */
  hyperVGeneration: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  testNetworkId?: string;
  /** Gets or sets the target CPU cores. */
  targetCpuCores?: number;
  /** Gets or sets a value indicating whether memory is dynamical. */
  isDynamicRam?: boolean;
  /** Protected item dynamic memory config. */
  dynamicMemoryConfig?: ProtectedItemDynamicMemoryConfig;
  /** Gets or sets the target memory in mega-bytes. */
  targetMemoryInMegaBytes?: number;
  /** Gets or sets the type of the OS. */
  readonly osType?: string;
  /** Gets or sets the name of the OS. */
  readonly osName?: string;
  /** Gets or sets the firmware type. */
  readonly firmwareType?: string;
  /** Gets or sets the ARM Id of the discovered machine. */
  fabricDiscoveryMachineId: string;
  /** Gets or sets the source VM display name. */
  readonly sourceVmName?: string;
  /** Gets or sets the source VM CPU cores. */
  readonly sourceCpuCores?: number;
  /** Gets or sets the source VM ram memory size in megabytes. */
  readonly sourceMemoryInMegaBytes?: number;
  /** Gets or sets the run as account Id. */
  runAsAccountId: string;
  /** Gets or sets the source fabric agent name. */
  sourceFabricAgentName: string;
  /** Gets or sets the target fabric agent name. */
  targetFabricAgentName: string;
  /** Gets or sets the source appliance name. */
  readonly sourceApplianceName?: string;
  /** Gets or sets the target appliance name. */
  readonly targetApplianceName?: string;
  /** Gets or sets the recovery point Id to which the VM was failed over. */
  readonly failoverRecoveryPointId?: string;
  /** Gets or sets the last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** Gets or sets the last recovery point Id. */
  readonly lastRecoveryPointId?: string;
  /** Gets or sets the initial replication progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly initialReplicationProgressPercentage?: number;
  /** Gets or sets the migration progress percentage. */
  readonly migrationProgressPercentage?: number;
  /** Gets or sets the resume progress percentage. */
  readonly resumeProgressPercentage?: number;
  /** Gets or sets the resync progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly resyncProgressPercentage?: number;
  /** Gets or sets the resync retry count. */
  readonly resyncRetryCount?: number;
  /** Gets or sets a value indicating whether resync is required. */
  readonly resyncRequired?: boolean;
  /** Gets or sets the resync state. */
  readonly resyncState?: VMwareToAzureMigrateResyncState;
  /** Gets or sets a value indicating whether auto resync is to be done. */
  performAutoResync?: boolean;
  /** Gets or sets the resume retry count. */
  readonly resumeRetryCount?: number;
  /** Gets or sets the latest timestamp that replication status is updated. */
  readonly lastReplicationUpdateTime?: Date;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
}

export function vMwareToAzStackHCIProtectedItemModelCustomPropertiesSerializer(
  item: VMwareToAzStackHCIProtectedItemModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    targetHciClusterId: item["targetHciClusterId"],
    targetArcClusterCustomLocationId: item["targetArcClusterCustomLocationId"],
    storageContainerId: item["storageContainerId"],
    targetResourceGroupId: item["targetResourceGroupId"],
    customLocationRegion: item["customLocationRegion"],
    disksToInclude: vMwareToAzStackHCIDiskInputArraySerializer(item["disksToInclude"]),
    nicsToInclude: vMwareToAzStackHCINicInputArraySerializer(item["nicsToInclude"]),
    targetVmName: item["targetVmName"],
    hyperVGeneration: item["hyperVGeneration"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigSerializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    runAsAccountId: item["runAsAccountId"],
    sourceFabricAgentName: item["sourceFabricAgentName"],
    targetFabricAgentName: item["targetFabricAgentName"],
    performAutoResync: item["performAutoResync"],
  };
}

export function vMwareToAzStackHCIProtectedItemModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIProtectedItemModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    activeLocation: item["activeLocation"],
    targetHciClusterId: item["targetHciClusterId"],
    targetArcClusterCustomLocationId: item["targetArcClusterCustomLocationId"],
    targetAzStackHciClusterName: item["targetAzStackHciClusterName"],
    storageContainerId: item["storageContainerId"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetLocation: item["targetLocation"],
    customLocationRegion: item["customLocationRegion"],
    disksToInclude: vMwareToAzStackHCIDiskInputArrayDeserializer(item["disksToInclude"]),
    nicsToInclude: vMwareToAzStackHCINicInputArrayDeserializer(item["nicsToInclude"]),
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : vMwareToAzStackHCIProtectedDiskPropertiesArrayDeserializer(item["protectedDisks"]),
    protectedNics: !item["protectedNics"]
      ? item["protectedNics"]
      : vMwareToAzStackHCIProtectedNicPropertiesArrayDeserializer(item["protectedNics"]),
    targetVmBiosId: item["targetVmBiosId"],
    targetVmName: item["targetVmName"],
    hyperVGeneration: item["hyperVGeneration"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigDeserializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    osType: item["osType"],
    osName: item["osName"],
    firmwareType: item["firmwareType"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    sourceVmName: item["sourceVmName"],
    sourceCpuCores: item["sourceCpuCores"],
    sourceMemoryInMegaBytes: item["sourceMemoryInMegaBytes"],
    runAsAccountId: item["runAsAccountId"],
    sourceFabricAgentName: item["sourceFabricAgentName"],
    targetFabricAgentName: item["targetFabricAgentName"],
    sourceApplianceName: item["sourceApplianceName"],
    targetApplianceName: item["targetApplianceName"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    lastRecoveryPointId: item["lastRecoveryPointId"],
    initialReplicationProgressPercentage: item["initialReplicationProgressPercentage"],
    migrationProgressPercentage: item["migrationProgressPercentage"],
    resumeProgressPercentage: item["resumeProgressPercentage"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resyncRetryCount: item["resyncRetryCount"],
    resyncRequired: item["resyncRequired"],
    resyncState: item["resyncState"],
    performAutoResync: item["performAutoResync"],
    resumeRetryCount: item["resumeRetryCount"],
    lastReplicationUpdateTime: !item["lastReplicationUpdateTime"]
      ? item["lastReplicationUpdateTime"]
      : new Date(item["lastReplicationUpdateTime"]),
  };
}

export function vMwareToAzStackHCIDiskInputArraySerializer(
  result: Array<VMwareToAzStackHCIDiskInput>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCIDiskInputSerializer(item);
  });
}

export function vMwareToAzStackHCIDiskInputArrayDeserializer(
  result: Array<VMwareToAzStackHCIDiskInput>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCIDiskInputDeserializer(item);
  });
}

/** VMwareToAzStack disk input. */
export interface VMwareToAzStackHCIDiskInput {
  /** Gets or sets the disk Id. */
  diskId: string;
  /** Gets or sets the target storage account ARM Id. */
  storageContainerId?: string;
  /** Gets or sets a value indicating whether dynamic sizing is enabled on the virtual hard disk. */
  isDynamic?: boolean;
  /** Gets or sets the disk size in GB. */
  diskSizeGB: number;
  /** Gets or sets the type of the virtual hard disk, vhd or vhdx. */
  diskFileFormat: string;
  /** Gets or sets a value indicating whether disk is os disk. */
  isOsDisk: boolean;
  /** Gets or sets a value of disk block size. */
  diskBlockSize?: number;
  /** Gets or sets a value of disk logical sector size. */
  diskLogicalSectorSize?: number;
  /** Gets or sets a value of disk physical sector size. */
  diskPhysicalSectorSize?: number;
  /** Gets or sets a value of disk identifier. */
  diskIdentifier?: string;
  /** Disk controller. */
  diskController?: DiskControllerInputs;
}

export function vMwareToAzStackHCIDiskInputSerializer(item: VMwareToAzStackHCIDiskInput): any {
  return {
    diskId: item["diskId"],
    storageContainerId: item["storageContainerId"],
    isDynamic: item["isDynamic"],
    diskSizeGB: item["diskSizeGB"],
    diskFileFormat: item["diskFileFormat"],
    isOsDisk: item["isOsDisk"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
    diskIdentifier: item["diskIdentifier"],
    diskController: !item["diskController"]
      ? item["diskController"]
      : diskControllerInputsSerializer(item["diskController"]),
  };
}

export function vMwareToAzStackHCIDiskInputDeserializer(item: any): VMwareToAzStackHCIDiskInput {
  return {
    diskId: item["diskId"],
    storageContainerId: item["storageContainerId"],
    isDynamic: item["isDynamic"],
    diskSizeGB: item["diskSizeGB"],
    diskFileFormat: item["diskFileFormat"],
    isOsDisk: item["isOsDisk"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
    diskIdentifier: item["diskIdentifier"],
    diskController: !item["diskController"]
      ? item["diskController"]
      : diskControllerInputsDeserializer(item["diskController"]),
  };
}

export function vMwareToAzStackHCINicInputArraySerializer(
  result: Array<VMwareToAzStackHCINicInput>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCINicInputSerializer(item);
  });
}

export function vMwareToAzStackHCINicInputArrayDeserializer(
  result: Array<VMwareToAzStackHCINicInput>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCINicInputDeserializer(item);
  });
}

/** VMwareToAzStackHCI NIC properties. */
export interface VMwareToAzStackHCINicInput {
  /** Gets or sets the NIC Id. */
  nicId: string;
  /** Gets or sets the NIC label. */
  label: string;
  /** Gets or sets the network name. */
  readonly networkName?: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  testNetworkId?: string;
  /** Gets or sets the selection type of the NIC. */
  selectionTypeForFailover: VMNicSelection;
  /** Gets or sets a value indicating whether static ip migration is enabled. */
  isStaticIpMigrationEnabled?: boolean;
  /** Gets or sets a value indicating whether mac address migration is enabled. */
  isMacMigrationEnabled?: boolean;
}

export function vMwareToAzStackHCINicInputSerializer(item: VMwareToAzStackHCINicInput): any {
  return {
    nicId: item["nicId"],
    label: item["label"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
    isStaticIpMigrationEnabled: item["isStaticIpMigrationEnabled"],
    isMacMigrationEnabled: item["isMacMigrationEnabled"],
  };
}

export function vMwareToAzStackHCINicInputDeserializer(item: any): VMwareToAzStackHCINicInput {
  return {
    nicId: item["nicId"],
    label: item["label"],
    networkName: item["networkName"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
    isStaticIpMigrationEnabled: item["isStaticIpMigrationEnabled"],
    isMacMigrationEnabled: item["isMacMigrationEnabled"],
  };
}

export function vMwareToAzStackHCIProtectedDiskPropertiesArrayDeserializer(
  result: Array<VMwareToAzStackHCIProtectedDiskProperties>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCIProtectedDiskPropertiesDeserializer(item);
  });
}

/** VMwareToAzStackHCI protected disk properties. */
export interface VMwareToAzStackHCIProtectedDiskProperties {
  /** Gets or sets the ARM Id of the storage container. */
  readonly storageContainerId?: string;
  /** Gets or sets the local path of the storage container. */
  readonly storageContainerLocalPath?: string;
  /** Gets or sets the source disk Id. */
  readonly sourceDiskId?: string;
  /** Gets or sets the source disk Name. */
  readonly sourceDiskName?: string;
  /** Gets or sets the seed disk name. */
  readonly seedDiskName?: string;
  /** Gets or sets the test failover clone disk. */
  readonly testMigrateDiskName?: string;
  /** Gets or sets the failover clone disk. */
  readonly migrateDiskName?: string;
  /** Gets or sets a value indicating whether the disk is the OS disk. */
  readonly isOsDisk?: boolean;
  /** Gets or sets the disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** Gets or sets a value indicating whether dynamic sizing is enabled on the virtual hard disk. */
  readonly isDynamic?: boolean;
  /** Gets or sets the disk type. */
  readonly diskType?: string;
  /** Gets or sets a value of disk block size. */
  readonly diskBlockSize?: number;
  /** Gets or sets a value of disk logical sector size. */
  readonly diskLogicalSectorSize?: number;
  /** Gets or sets a value of disk physical sector size. */
  readonly diskPhysicalSectorSize?: number;
}

export function vMwareToAzStackHCIProtectedDiskPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIProtectedDiskProperties {
  return {
    storageContainerId: item["storageContainerId"],
    storageContainerLocalPath: item["storageContainerLocalPath"],
    sourceDiskId: item["sourceDiskId"],
    sourceDiskName: item["sourceDiskName"],
    seedDiskName: item["seedDiskName"],
    testMigrateDiskName: item["testMigrateDiskName"],
    migrateDiskName: item["migrateDiskName"],
    isOsDisk: item["isOsDisk"],
    capacityInBytes: item["capacityInBytes"],
    isDynamic: item["isDynamic"],
    diskType: item["diskType"],
    diskBlockSize: item["diskBlockSize"],
    diskLogicalSectorSize: item["diskLogicalSectorSize"],
    diskPhysicalSectorSize: item["diskPhysicalSectorSize"],
  };
}

export function vMwareToAzStackHCIProtectedNicPropertiesArrayDeserializer(
  result: Array<VMwareToAzStackHCIProtectedNicProperties>,
): any[] {
  return result.map((item) => {
    return vMwareToAzStackHCIProtectedNicPropertiesDeserializer(item);
  });
}

/** VMwareToAzStackHCI NIC properties. */
export interface VMwareToAzStackHCIProtectedNicProperties {
  /** Gets or sets the NIC Id. */
  readonly nicId?: string;
  /** Gets or sets the NIC mac address. */
  readonly macAddress?: string;
  /** Gets or sets the NIC label. */
  readonly label?: string;
  /** Gets or sets a value indicating whether this is the primary NIC. */
  isPrimaryNic?: boolean;
  /** Gets or sets the network name. */
  readonly networkName?: string;
  /** Gets or sets the target network Id within AzStackHCI Cluster. */
  readonly targetNetworkId?: string;
  /** Gets or sets the target test network Id within AzStackHCI Cluster. */
  readonly testNetworkId?: string;
  /** Gets or sets the selection type of the NIC. */
  readonly selectionTypeForFailover?: VMNicSelection;
}

export function vMwareToAzStackHCIProtectedNicPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIProtectedNicProperties {
  return {
    nicId: item["nicId"],
    macAddress: item["macAddress"],
    label: item["label"],
    isPrimaryNic: item["isPrimaryNic"],
    networkName: item["networkName"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    selectionTypeForFailover: item["selectionTypeForFailover"],
  };
}

/** Gets or sets the resync state. */
export enum KnownVMwareToAzureMigrateResyncState {
  /** None state. */
  None = "None",
  /** Prepared for resynchronization state. */
  PreparedForResynchronization = "PreparedForResynchronization",
  /** Started resynchronization state. */
  StartedResynchronization = "StartedResynchronization",
}

/**
 * Gets or sets the resync state. \
 * {@link KnownVMwareToAzureMigrateResyncState} can be used interchangeably with VMwareToAzureMigrateResyncState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None state. \
 * **PreparedForResynchronization**: Prepared for resynchronization state. \
 * **StartedResynchronization**: Started resynchronization state.
 */
export type VMwareToAzureMigrateResyncState = string;

/** Protected item model update. */
export interface ProtectedItemModelUpdate {
  /** Protected item model properties. */
  properties?: ProtectedItemModelPropertiesUpdate;
  /** Gets or sets the Id of the resource. */
  readonly id?: string;
  /** Gets or sets the name of the resource. */
  readonly name?: string;
  /** Gets or sets the type of the resource. */
  readonly type?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function protectedItemModelUpdateSerializer(item: ProtectedItemModelUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : protectedItemModelPropertiesUpdateSerializer(item["properties"]),
  };
}

/** Protected item model properties update. */
export interface ProtectedItemModelPropertiesUpdate {
  /** Protected item model custom properties update. */
  customProperties?: ProtectedItemModelCustomPropertiesUpdateUnion;
}

export function protectedItemModelPropertiesUpdateSerializer(
  item: ProtectedItemModelPropertiesUpdate,
): any {
  return {
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : protectedItemModelCustomPropertiesUpdateUnionSerializer(item["customProperties"]),
  };
}

/** Protected item model custom properties. */
export interface ProtectedItemModelCustomPropertiesUpdate {
  /** Discriminator property for ProtectedItemModelCustomPropertiesUpdate. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function protectedItemModelCustomPropertiesUpdateSerializer(
  item: ProtectedItemModelCustomPropertiesUpdate,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ProtectedItemModelCustomPropertiesUpdateUnion */
export type ProtectedItemModelCustomPropertiesUpdateUnion =
  | HyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdate
  | VMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdate
  | ProtectedItemModelCustomPropertiesUpdate;

export function protectedItemModelCustomPropertiesUpdateUnionSerializer(
  item: ProtectedItemModelCustomPropertiesUpdateUnion,
): any {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdateSerializer(
        item as HyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdate,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdateSerializer(
        item as VMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdate,
      );

    default:
      return protectedItemModelCustomPropertiesUpdateSerializer(item);
  }
}

/** HyperV to AzStackHCI Protected item model custom properties. */
export interface HyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdate extends ProtectedItemModelCustomPropertiesUpdate {
  /** Gets or sets the list of VM NIC to replicate. */
  nicsToInclude?: HyperVToAzStackHCINicInput[];
  /** Gets or sets the target CPU cores. */
  targetCpuCores?: number;
  /** Gets or sets a value indicating whether memory is dynamical. */
  isDynamicRam?: boolean;
  /** Protected item dynamic memory config. */
  dynamicMemoryConfig?: ProtectedItemDynamicMemoryConfig;
  /** Gets or sets the target memory in mega-bytes. */
  targetMemoryInMegaBytes?: number;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
  /** Gets or sets the type of the OS. */
  osType?: string;
}

export function hyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdateSerializer(
  item: HyperVToAzStackHCIProtectedItemModelCustomPropertiesUpdate,
): any {
  return {
    instanceType: item["instanceType"],
    nicsToInclude: !item["nicsToInclude"]
      ? item["nicsToInclude"]
      : hyperVToAzStackHCINicInputArraySerializer(item["nicsToInclude"]),
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigSerializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    osType: item["osType"],
  };
}

/** VMware to AzStackHCI Protected item model custom properties. */
export interface VMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdate extends ProtectedItemModelCustomPropertiesUpdate {
  /** Gets or sets the list of VM NIC to replicate. */
  nicsToInclude?: VMwareToAzStackHCINicInput[];
  /** Gets or sets the target CPU cores. */
  targetCpuCores?: number;
  /** Gets or sets a value indicating whether memory is dynamical. */
  isDynamicRam?: boolean;
  /** Protected item dynamic memory config. */
  dynamicMemoryConfig?: ProtectedItemDynamicMemoryConfig;
  /** Gets or sets the target memory in mega-bytes. */
  targetMemoryInMegaBytes?: number;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
  /** Gets or sets the type of the OS. */
  osType?: string;
}

export function vMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdateSerializer(
  item: VMwareToAzStackHCIProtectedItemModelCustomPropertiesUpdate,
): any {
  return {
    instanceType: item["instanceType"],
    nicsToInclude: !item["nicsToInclude"]
      ? item["nicsToInclude"]
      : vMwareToAzStackHCINicInputArraySerializer(item["nicsToInclude"]),
    targetCpuCores: item["targetCpuCores"],
    isDynamicRam: item["isDynamicRam"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : protectedItemDynamicMemoryConfigSerializer(item["dynamicMemoryConfig"]),
    targetMemoryInMegaBytes: item["targetMemoryInMegaBytes"],
    osType: item["osType"],
  };
}

/** The response of a ProtectedItemModel list operation. */
export interface _ProtectedItemModelListResult {
  /** The ProtectedItemModel items on this page */
  value: ProtectedItemModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectedItemModelListResultDeserializer(
  item: any,
): _ProtectedItemModelListResult {
  return {
    value: protectedItemModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectedItemModelArraySerializer(result: Array<ProtectedItemModel>): any[] {
  return result.map((item) => {
    return protectedItemModelSerializer(item);
  });
}

export function protectedItemModelArrayDeserializer(result: Array<ProtectedItemModel>): any[] {
  return result.map((item) => {
    return protectedItemModelDeserializer(item);
  });
}

/** Planned failover model. */
export interface PlannedFailoverModel {
  /** Planned failover model properties. */
  properties: PlannedFailoverModelProperties;
}

export function plannedFailoverModelSerializer(item: PlannedFailoverModel): any {
  return {
    properties: plannedFailoverModelPropertiesSerializer(item["properties"]),
  };
}

export function plannedFailoverModelDeserializer(item: any): PlannedFailoverModel {
  return {
    properties: plannedFailoverModelPropertiesDeserializer(item["properties"]),
  };
}

/** Planned failover model properties. */
export interface PlannedFailoverModelProperties {
  /** Planned failover model custom properties. */
  customProperties: PlannedFailoverModelCustomPropertiesUnion;
}

export function plannedFailoverModelPropertiesSerializer(
  item: PlannedFailoverModelProperties,
): any {
  return {
    customProperties: plannedFailoverModelCustomPropertiesUnionSerializer(item["customProperties"]),
  };
}

export function plannedFailoverModelPropertiesDeserializer(
  item: any,
): PlannedFailoverModelProperties {
  return {
    customProperties: plannedFailoverModelCustomPropertiesUnionDeserializer(
      item["customProperties"],
    ),
  };
}

/** Planned failover model custom properties. */
export interface PlannedFailoverModelCustomProperties {
  /** Discriminator property for PlannedFailoverModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function plannedFailoverModelCustomPropertiesSerializer(
  item: PlannedFailoverModelCustomProperties,
): any {
  return { instanceType: item["instanceType"] };
}

export function plannedFailoverModelCustomPropertiesDeserializer(
  item: any,
): PlannedFailoverModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for PlannedFailoverModelCustomPropertiesUnion */
export type PlannedFailoverModelCustomPropertiesUnion =
  | HyperVToAzStackHCIPlannedFailoverModelCustomProperties
  | VMwareToAzStackHCIPlannedFailoverModelCustomProperties
  | PlannedFailoverModelCustomProperties;

export function plannedFailoverModelCustomPropertiesUnionSerializer(
  item: PlannedFailoverModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIPlannedFailoverModelCustomPropertiesSerializer(
        item as HyperVToAzStackHCIPlannedFailoverModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIPlannedFailoverModelCustomPropertiesSerializer(
        item as VMwareToAzStackHCIPlannedFailoverModelCustomProperties,
      );

    default:
      return plannedFailoverModelCustomPropertiesSerializer(item);
  }
}

export function plannedFailoverModelCustomPropertiesUnionDeserializer(
  item: any,
): PlannedFailoverModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIPlannedFailoverModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIPlannedFailoverModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIPlannedFailoverModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIPlannedFailoverModelCustomProperties,
      );

    default:
      return plannedFailoverModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV to AzStackHCI planned failover model custom properties. */
export interface HyperVToAzStackHCIPlannedFailoverModelCustomProperties extends PlannedFailoverModelCustomProperties {
  /** Gets or sets a value indicating whether VM needs to be shut down. */
  shutdownSourceVM: boolean;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIPlannedFailoverModelCustomPropertiesSerializer(
  item: HyperVToAzStackHCIPlannedFailoverModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    shutdownSourceVM: item["shutdownSourceVM"],
  };
}

export function hyperVToAzStackHCIPlannedFailoverModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIPlannedFailoverModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    shutdownSourceVM: item["shutdownSourceVM"],
  };
}

/** VMware to AzStackHCI planned failover model custom properties. */
export interface VMwareToAzStackHCIPlannedFailoverModelCustomProperties extends PlannedFailoverModelCustomProperties {
  /** Gets or sets a value indicating whether VM needs to be shut down. */
  shutdownSourceVM: boolean;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
}

export function vMwareToAzStackHCIPlannedFailoverModelCustomPropertiesSerializer(
  item: VMwareToAzStackHCIPlannedFailoverModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    shutdownSourceVM: item["shutdownSourceVM"],
  };
}

export function vMwareToAzStackHCIPlannedFailoverModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIPlannedFailoverModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    shutdownSourceVM: item["shutdownSourceVM"],
  };
}

/** Recovery point model. */
export interface RecoveryPointModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RecoveryPointModelProperties;
}

export function recoveryPointModelDeserializer(item: any): RecoveryPointModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPointModelPropertiesDeserializer(item["properties"]),
  };
}

/** Recovery point model properties. */
export interface RecoveryPointModelProperties {
  /** Gets or sets the recovery point time. */
  recoveryPointTime: Date;
  /** Gets or sets the recovery point type. */
  recoveryPointType: RecoveryPointType;
  /** Recovery point model custom properties. */
  customProperties: RecoveryPointModelCustomPropertiesUnion;
  /** Gets or sets the provisioning state of the recovery point item. */
  readonly provisioningState?: ProvisioningState;
}

export function recoveryPointModelPropertiesDeserializer(item: any): RecoveryPointModelProperties {
  return {
    recoveryPointTime: new Date(item["recoveryPointTime"]),
    recoveryPointType: item["recoveryPointType"],
    customProperties: recoveryPointModelCustomPropertiesUnionDeserializer(item["customProperties"]),
    provisioningState: item["provisioningState"],
  };
}

/** Gets or sets the recovery point type. */
export enum KnownRecoveryPointType {
  /** Application consistent recovery point. */
  ApplicationConsistent = "ApplicationConsistent",
  /** Crash consistent recovery point. */
  CrashConsistent = "CrashConsistent",
}

/**
 * Gets or sets the recovery point type. \
 * {@link KnownRecoveryPointType} can be used interchangeably with RecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplicationConsistent**: Application consistent recovery point. \
 * **CrashConsistent**: Crash consistent recovery point.
 */
export type RecoveryPointType = string;

/** Recovery point model custom properties. */
export interface RecoveryPointModelCustomProperties {
  /** Discriminator property for RecoveryPointModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCIRecoveryPointModelCustomProperties */
  instanceType: string;
}

export function recoveryPointModelCustomPropertiesDeserializer(
  item: any,
): RecoveryPointModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for RecoveryPointModelCustomPropertiesUnion */
export type RecoveryPointModelCustomPropertiesUnion =
  | HyperVToAzStackHCIRecoveryPointModelCustomProperties
  | VMwareToAzStackHCIRecoveryPointModelCustomProperties
  | RecoveryPointModelCustomProperties;

export function recoveryPointModelCustomPropertiesUnionDeserializer(
  item: any,
): RecoveryPointModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIRecoveryPointModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIRecoveryPointModelCustomProperties,
      );

    case "VMwareToAzStackHCIRecoveryPointModelCustomProperties":
      return vMwareToAzStackHCIRecoveryPointModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIRecoveryPointModelCustomProperties,
      );

    default:
      return recoveryPointModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV to AzStackHCI recovery point model custom properties. */
export interface HyperVToAzStackHCIRecoveryPointModelCustomProperties extends RecoveryPointModelCustomProperties {
  /** Gets or sets the list of the disk Ids. */
  readonly diskIds?: string[];
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIRecoveryPointModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIRecoveryPointModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    diskIds: !item["diskIds"]
      ? item["diskIds"]
      : item["diskIds"].map((p: any) => {
          return p;
        }),
  };
}

/** VMware to AzStackHCI recovery point model custom properties. */
export interface VMwareToAzStackHCIRecoveryPointModelCustomProperties extends RecoveryPointModelCustomProperties {
  /** Gets or sets the list of the disk Ids. */
  readonly diskIds?: string[];
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCIRecoveryPointModelCustomProperties";
}

export function vMwareToAzStackHCIRecoveryPointModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIRecoveryPointModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    diskIds: !item["diskIds"]
      ? item["diskIds"]
      : item["diskIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a RecoveryPointModel list operation. */
export interface _RecoveryPointModelListResult {
  /** The RecoveryPointModel items on this page */
  value: RecoveryPointModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryPointModelListResultDeserializer(
  item: any,
): _RecoveryPointModelListResult {
  return {
    value: recoveryPointModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryPointModelArrayDeserializer(result: Array<RecoveryPointModel>): any[] {
  return result.map((item) => {
    return recoveryPointModelDeserializer(item);
  });
}

/** Replication extension model. */
export interface ReplicationExtensionModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ReplicationExtensionModelProperties;
}

export function replicationExtensionModelSerializer(item: ReplicationExtensionModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : replicationExtensionModelPropertiesSerializer(item["properties"]),
  };
}

export function replicationExtensionModelDeserializer(item: any): ReplicationExtensionModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationExtensionModelPropertiesDeserializer(item["properties"]),
  };
}

/** Replication extension model properties. */
export interface ReplicationExtensionModelProperties {
  /** Gets or sets the provisioning state of the replication extension. */
  readonly provisioningState?: ProvisioningState;
  /** Replication extension model custom properties. */
  customProperties: ReplicationExtensionModelCustomPropertiesUnion;
}

export function replicationExtensionModelPropertiesSerializer(
  item: ReplicationExtensionModelProperties,
): any {
  return {
    customProperties: replicationExtensionModelCustomPropertiesUnionSerializer(
      item["customProperties"],
    ),
  };
}

export function replicationExtensionModelPropertiesDeserializer(
  item: any,
): ReplicationExtensionModelProperties {
  return {
    provisioningState: item["provisioningState"],
    customProperties: replicationExtensionModelCustomPropertiesUnionDeserializer(
      item["customProperties"],
    ),
  };
}

/** Replication extension model custom properties. */
export interface ReplicationExtensionModelCustomProperties {
  /** Discriminator property for ReplicationExtensionModelCustomProperties. */
  /** The discriminator possible values: HyperVToAzStackHCI, VMwareToAzStackHCI */
  instanceType: string;
}

export function replicationExtensionModelCustomPropertiesSerializer(
  item: ReplicationExtensionModelCustomProperties,
): any {
  return { instanceType: item["instanceType"] };
}

export function replicationExtensionModelCustomPropertiesDeserializer(
  item: any,
): ReplicationExtensionModelCustomProperties {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ReplicationExtensionModelCustomPropertiesUnion */
export type ReplicationExtensionModelCustomPropertiesUnion =
  | HyperVToAzStackHCIReplicationExtensionModelCustomProperties
  | VMwareToAzStackHCIReplicationExtensionModelCustomProperties
  | ReplicationExtensionModelCustomProperties;

export function replicationExtensionModelCustomPropertiesUnionSerializer(
  item: ReplicationExtensionModelCustomPropertiesUnion,
): any {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIReplicationExtensionModelCustomPropertiesSerializer(
        item as HyperVToAzStackHCIReplicationExtensionModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIReplicationExtensionModelCustomPropertiesSerializer(
        item as VMwareToAzStackHCIReplicationExtensionModelCustomProperties,
      );

    default:
      return replicationExtensionModelCustomPropertiesSerializer(item);
  }
}

export function replicationExtensionModelCustomPropertiesUnionDeserializer(
  item: any,
): ReplicationExtensionModelCustomPropertiesUnion {
  switch (item.instanceType) {
    case "HyperVToAzStackHCI":
      return hyperVToAzStackHCIReplicationExtensionModelCustomPropertiesDeserializer(
        item as HyperVToAzStackHCIReplicationExtensionModelCustomProperties,
      );

    case "VMwareToAzStackHCI":
      return vMwareToAzStackHCIReplicationExtensionModelCustomPropertiesDeserializer(
        item as VMwareToAzStackHCIReplicationExtensionModelCustomProperties,
      );

    default:
      return replicationExtensionModelCustomPropertiesDeserializer(item);
  }
}

/** HyperV to AzStackHCI Replication extension model custom properties. */
export interface HyperVToAzStackHCIReplicationExtensionModelCustomProperties extends ReplicationExtensionModelCustomProperties {
  /** Gets or sets the ARM Id of the source HyperV fabric. */
  hyperVFabricArmId: string;
  /** Gets or sets the ARM Id of the HyperV site. */
  readonly hyperVSiteId?: string;
  /** Gets or sets the ARM Id of the target AzStackHCI fabric. */
  azStackHciFabricArmId: string;
  /** Gets or sets the ARM Id of the AzStackHCI site. */
  readonly azStackHciSiteId?: string;
  /** Gets or sets the storage account Id. */
  storageAccountId?: string;
  /** Gets or sets the Sas Secret of storage account. */
  storageAccountSasSecretName?: string;
  /** Gets or sets the Uri of ASR. */
  readonly asrServiceUri?: string;
  /** Gets or sets the Uri of Rcm. */
  readonly rcmServiceUri?: string;
  /** Gets or sets the Uri of Gateway. */
  readonly gatewayServiceUri?: string;
  /** Gets or sets the gateway service Id of source. */
  readonly sourceGatewayServiceId?: string;
  /** Gets or sets the gateway service Id of target. */
  readonly targetGatewayServiceId?: string;
  /** Gets or sets the source storage container name. */
  readonly sourceStorageContainerName?: string;
  /** Gets or sets the target storage container name. */
  readonly targetStorageContainerName?: string;
  /** Gets or sets the resource location. */
  readonly resourceLocation?: string;
  /** Gets or sets the subscription. */
  readonly subscriptionId?: string;
  /** Gets or sets the resource group. */
  readonly resourceGroup?: string;
  /** Gets or sets the instance type. */
  instanceType: "HyperVToAzStackHCI";
}

export function hyperVToAzStackHCIReplicationExtensionModelCustomPropertiesSerializer(
  item: HyperVToAzStackHCIReplicationExtensionModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    hyperVFabricArmId: item["hyperVFabricArmId"],
    azStackHciFabricArmId: item["azStackHciFabricArmId"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
  };
}

export function hyperVToAzStackHCIReplicationExtensionModelCustomPropertiesDeserializer(
  item: any,
): HyperVToAzStackHCIReplicationExtensionModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    hyperVFabricArmId: item["hyperVFabricArmId"],
    hyperVSiteId: item["hyperVSiteId"],
    azStackHciFabricArmId: item["azStackHciFabricArmId"],
    azStackHciSiteId: item["azStackHciSiteId"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
    asrServiceUri: item["asrServiceUri"],
    rcmServiceUri: item["rcmServiceUri"],
    gatewayServiceUri: item["gatewayServiceUri"],
    sourceGatewayServiceId: item["sourceGatewayServiceId"],
    targetGatewayServiceId: item["targetGatewayServiceId"],
    sourceStorageContainerName: item["sourceStorageContainerName"],
    targetStorageContainerName: item["targetStorageContainerName"],
    resourceLocation: item["resourceLocation"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

/** VMware to AzStackHCI Replication extension model custom properties. */
export interface VMwareToAzStackHCIReplicationExtensionModelCustomProperties extends ReplicationExtensionModelCustomProperties {
  /** Gets or sets the ARM Id of the source VMware fabric. */
  vmwareFabricArmId: string;
  /** Gets or sets the ARM Id of the VMware site. */
  readonly vmwareSiteId?: string;
  /** Gets or sets the ARM Id of the target AzStackHCI fabric. */
  azStackHciFabricArmId: string;
  /** Gets or sets the ARM Id of the AzStackHCI site. */
  readonly azStackHciSiteId?: string;
  /** Gets or sets the storage account Id. */
  storageAccountId?: string;
  /** Gets or sets the Sas Secret of storage account. */
  storageAccountSasSecretName?: string;
  /** Gets or sets the Uri of ASR. */
  readonly asrServiceUri?: string;
  /** Gets or sets the Uri of Rcm. */
  readonly rcmServiceUri?: string;
  /** Gets or sets the Uri of Gateway. */
  readonly gatewayServiceUri?: string;
  /** Gets or sets the gateway service Id of source. */
  readonly sourceGatewayServiceId?: string;
  /** Gets or sets the gateway service Id of target. */
  readonly targetGatewayServiceId?: string;
  /** Gets or sets the source storage container name. */
  readonly sourceStorageContainerName?: string;
  /** Gets or sets the target storage container name. */
  readonly targetStorageContainerName?: string;
  /** Gets or sets the resource location. */
  readonly resourceLocation?: string;
  /** Gets or sets the subscription. */
  readonly subscriptionId?: string;
  /** Gets or sets the resource group. */
  readonly resourceGroup?: string;
  /** Gets or sets the instance type. */
  instanceType: "VMwareToAzStackHCI";
}

export function vMwareToAzStackHCIReplicationExtensionModelCustomPropertiesSerializer(
  item: VMwareToAzStackHCIReplicationExtensionModelCustomProperties,
): any {
  return {
    instanceType: item["instanceType"],
    vmwareFabricArmId: item["vmwareFabricArmId"],
    azStackHciFabricArmId: item["azStackHciFabricArmId"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
  };
}

export function vMwareToAzStackHCIReplicationExtensionModelCustomPropertiesDeserializer(
  item: any,
): VMwareToAzStackHCIReplicationExtensionModelCustomProperties {
  return {
    instanceType: item["instanceType"],
    vmwareFabricArmId: item["vmwareFabricArmId"],
    vmwareSiteId: item["vmwareSiteId"],
    azStackHciFabricArmId: item["azStackHciFabricArmId"],
    azStackHciSiteId: item["azStackHciSiteId"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
    asrServiceUri: item["asrServiceUri"],
    rcmServiceUri: item["rcmServiceUri"],
    gatewayServiceUri: item["gatewayServiceUri"],
    sourceGatewayServiceId: item["sourceGatewayServiceId"],
    targetGatewayServiceId: item["targetGatewayServiceId"],
    sourceStorageContainerName: item["sourceStorageContainerName"],
    targetStorageContainerName: item["targetStorageContainerName"],
    resourceLocation: item["resourceLocation"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

/** The response of a ReplicationExtensionModel list operation. */
export interface _ReplicationExtensionModelListResult {
  /** The ReplicationExtensionModel items on this page */
  value: ReplicationExtensionModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicationExtensionModelListResultDeserializer(
  item: any,
): _ReplicationExtensionModelListResult {
  return {
    value: replicationExtensionModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationExtensionModelArraySerializer(
  result: Array<ReplicationExtensionModel>,
): any[] {
  return result.map((item) => {
    return replicationExtensionModelSerializer(item);
  });
}

export function replicationExtensionModelArrayDeserializer(
  result: Array<ReplicationExtensionModel>,
): any[] {
  return result.map((item) => {
    return replicationExtensionModelDeserializer(item);
  });
}

/** Check name availability model. */
export interface CheckNameAvailabilityModel {
  /** Gets or sets the resource name. */
  name?: string;
  /** Gets or sets the resource type. */
  type?: string;
}

export function checkNameAvailabilityModelSerializer(item: CheckNameAvailabilityModel): any {
  return { name: item["name"], type: item["type"] };
}

/** Check name availability response model. */
export interface CheckNameAvailabilityResponseModel {
  /** Gets or sets a value indicating whether resource name is available or not. */
  nameAvailable?: boolean;
  /** Gets or sets the reason for resource name unavailability. */
  reason?: string;
  /** Gets or sets the message for resource name unavailability. */
  message?: string;
}

export function checkNameAvailabilityResponseModelDeserializer(
  item: any,
): CheckNameAvailabilityResponseModel {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Deployment preflight model. */
export interface DeploymentPreflightModel {
  /** Gets or sets the list of resources. */
  resources?: DeploymentPreflightResource[];
}

export function deploymentPreflightModelSerializer(item: DeploymentPreflightModel): any {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : deploymentPreflightResourceArraySerializer(item["resources"]),
  };
}

export function deploymentPreflightModelDeserializer(item: any): DeploymentPreflightModel {
  return {
    resources: !item["resources"]
      ? item["resources"]
      : deploymentPreflightResourceArrayDeserializer(item["resources"]),
  };
}

export function deploymentPreflightResourceArraySerializer(
  result: Array<DeploymentPreflightResource>,
): any[] {
  return result.map((item) => {
    return deploymentPreflightResourceSerializer(item);
  });
}

export function deploymentPreflightResourceArrayDeserializer(
  result: Array<DeploymentPreflightResource>,
): any[] {
  return result.map((item) => {
    return deploymentPreflightResourceDeserializer(item);
  });
}

/** Deployment preflight resource. */
export interface DeploymentPreflightResource {
  /** Gets or sets the resource name. */
  name?: string;
  /** Gets or sets the resource type. */
  type?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the Api version. */
  apiVersion?: string;
  /** Gets or sets the properties of the resource. */
  properties?: any;
}

export function deploymentPreflightResourceSerializer(item: DeploymentPreflightResource): any {
  return {
    name: item["name"],
    type: item["type"],
    location: item["location"],
    apiVersion: item["apiVersion"],
    properties: item["properties"],
  };
}

export function deploymentPreflightResourceDeserializer(item: any): DeploymentPreflightResource {
  return {
    name: item["name"],
    type: item["type"],
    location: item["location"],
    apiVersion: item["apiVersion"],
    properties: item["properties"],
  };
}

/** Defines the operation status. */
export interface OperationStatus {
  /** Gets or sets the Id. */
  id?: string;
  /** Gets or sets the operation name. */
  name?: string;
  /** Gets or sets the status of the operation. ARM expects the terminal status to be one of Succeeded/ Failed/ Canceled. All other values imply that the operation is still running. */
  status?: string;
  /** Gets or sets the start time. */
  startTime?: string;
  /** Gets or sets the end time. */
  endTime?: string;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-09-01 API version. */
  V20240901 = "2024-09-01",
}
