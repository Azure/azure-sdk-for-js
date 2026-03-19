// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** A class representing a CommunicationService resource. */
export interface CommunicationServiceResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Provisioning state of the resource. */
  readonly provisioningState?: CommunicationServicesProvisioningState;
  /** FQDN of the CommunicationService instance. */
  readonly hostName?: string;
  /** The location where the communication service stores its data at rest. */
  dataLocation?: string;
  /** Resource ID of an Azure Notification Hub linked to this resource. */
  readonly notificationHubId?: string;
  /** Version of the CommunicationService resource. Probably you need the same or higher version of client SDKs. */
  readonly version?: string;
  /** The immutable resource Id of the communication service. */
  readonly immutableResourceId?: string;
  /** List of email Domain resource Ids. */
  linkedDomains?: string[];
  /** Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disable local authentication for the CommunicationService. */
  disableLocalAuth?: boolean;
}

export function communicationServiceResourceSerializer(item: CommunicationServiceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "dataLocation",
      "linkedDomains",
      "publicNetworkAccess",
      "disableLocalAuth",
    ])
      ? undefined
      : _communicationServiceResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function communicationServiceResourceDeserializer(item: any): CommunicationServiceResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _communicationServiceResourcePropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** A class that describes the properties of the CommunicationService. */
export interface CommunicationServiceProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: CommunicationServicesProvisioningState;
  /** FQDN of the CommunicationService instance. */
  readonly hostName?: string;
  /** The location where the communication service stores its data at rest. */
  dataLocation: string;
  /** Resource ID of an Azure Notification Hub linked to this resource. */
  readonly notificationHubId?: string;
  /** Version of the CommunicationService resource. Probably you need the same or higher version of client SDKs. */
  readonly version?: string;
  /** The immutable resource Id of the communication service. */
  readonly immutableResourceId?: string;
  /** List of email Domain resource Ids. */
  linkedDomains?: string[];
  /** Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disable local authentication for the CommunicationService. */
  disableLocalAuth?: boolean;
}

export function communicationServicePropertiesSerializer(
  item: CommunicationServiceProperties,
): any {
  return {
    dataLocation: item["dataLocation"],
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function communicationServicePropertiesDeserializer(
  item: any,
): CommunicationServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    hostName: item["hostName"],
    dataLocation: item["dataLocation"],
    notificationHubId: item["notificationHubId"],
    version: item["version"],
    immutableResourceId: item["immutableResourceId"],
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** Provisioning state of the resource. */
export enum KnownCommunicationServicesProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownCommunicationServicesProvisioningState} can be used interchangeably with CommunicationServicesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Running**: Running \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Moving**: Moving
 */
export type CommunicationServicesProvisioningState = string;

/** Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
export enum KnownPublicNetworkAccess {
  /** Allows public network access to the resource */
  Enabled = "Enabled",
  /** Disallows public network access to the resource */
  Disabled = "Disabled",
  /** The network security perimeter configuration rules allow or disallow public network access to the resource. Requires an associated network security perimeter. */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Allows public network access to the resource \
 * **Disabled**: Disallows public network access to the resource \
 * **SecuredByPerimeter**: The network security perimeter configuration rules allow or disallow public network access to the resource. Requires an associated network security perimeter.
 */
export type PublicNetworkAccess = string;

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
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
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

/** A class representing update parameters for CommunicationService resource. */
export interface CommunicationServiceResourceUpdate extends TaggedResource {
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** List of email Domain resource Ids. */
  linkedDomains?: string[];
  /** Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disable local authentication for the CommunicationService. */
  disableLocalAuth?: boolean;
}

export function communicationServiceResourceUpdateSerializer(
  item: CommunicationServiceResourceUpdate,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "linkedDomains",
      "publicNetworkAccess",
      "disableLocalAuth",
    ])
      ? undefined
      : _communicationServiceResourceUpdatePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** A class that describes the properties that can be updated for CommunicationService resource. */
export interface CommunicationServiceUpdateProperties {
  /** List of email Domain resource Ids. */
  linkedDomains?: string[];
  /** Allow, disallow, or let network security perimeter configuration control public network access to the protected resource. Value is optional but if passed in, it must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Disable local authentication for the CommunicationService. */
  disableLocalAuth?: boolean;
}

export function communicationServiceUpdatePropertiesSerializer(
  item: CommunicationServiceUpdateProperties,
): any {
  return {
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** An ARM resource with that can accept tags */
export interface TaggedResource {
  /** Tags of the service which is a list of key value pairs that describe the resource. */
  tags?: Record<string, string>;
}

export function taggedResourceSerializer(item: TaggedResource): any {
  return { tags: item["tags"] };
}

/** Object that includes an array of CommunicationServices and a possible link for next set. */
export interface _CommunicationServiceResourceList {
  /** The CommunicationServiceResource items on this page */
  value: CommunicationServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _communicationServiceResourceListDeserializer(
  item: any,
): _CommunicationServiceResourceList {
  return {
    value: communicationServiceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communicationServiceResourceArraySerializer(
  result: Array<CommunicationServiceResource>,
): any[] {
  return result.map((item) => {
    return communicationServiceResourceSerializer(item);
  });
}

export function communicationServiceResourceArrayDeserializer(
  result: Array<CommunicationServiceResource>,
): any[] {
  return result.map((item) => {
    return communicationServiceResourceDeserializer(item);
  });
}

/** Description of an Azure Notification Hub to link to the communication service */
export interface LinkNotificationHubParameters {
  /** The resource ID of the notification hub */
  resourceId: string;
  /** Connection string for the notification hub */
  connectionString: string;
}

export function linkNotificationHubParametersSerializer(item: LinkNotificationHubParameters): any {
  return { resourceId: item["resourceId"], connectionString: item["connectionString"] };
}

/** A notification hub that has been linked to the communication service */
export interface LinkedNotificationHub {
  /** The resource ID of the notification hub */
  resourceId?: string;
}

export function linkedNotificationHubDeserializer(item: any): LinkedNotificationHub {
  return {
    resourceId: item["resourceId"],
  };
}

/** A class representing the access keys of a CommunicationService. */
export interface CommunicationServiceKeys {
  /** The primary access key. */
  primaryKey?: string;
  /** The secondary access key. */
  secondaryKey?: string;
  /** CommunicationService connection string constructed via the primaryKey */
  primaryConnectionString?: string;
  /** CommunicationService connection string constructed via the secondaryKey */
  secondaryConnectionString?: string;
}

export function communicationServiceKeysDeserializer(item: any): CommunicationServiceKeys {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
  };
}

/** Parameters describes the request to regenerate access keys */
export interface RegenerateKeyParameters {
  /** The keyType to regenerate. Must be either 'primary' or 'secondary'(case-insensitive). */
  keyType?: KeyType;
}

export function regenerateKeyParametersSerializer(item: RegenerateKeyParameters): any {
  return { keyType: item["keyType"] };
}

/** The keyType to regenerate. Must be either 'primary' or 'secondary'(case-insensitive). */
export type KeyType = "Primary" | "Secondary";

/** Data POST-ed to the nameAvailability action */
export interface NameAvailabilityParameters extends CheckNameAvailabilityRequest {}

export function nameAvailabilityParametersSerializer(item: NameAvailabilityParameters): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** A class representing a Domains resource. */
export interface DomainResource extends TrackedResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: DomainsProvisioningState;
  /** The location where the Domains resource data is stored at rest. */
  readonly dataLocation?: string;
  /** P2 sender domain that is displayed to the email recipients [RFC 5322]. */
  readonly fromSenderDomain?: string;
  /** P1 sender domain that is present on the email envelope [RFC 5321]. */
  readonly mailFromSenderDomain?: string;
  /** Describes how a Domains resource is being managed. */
  domainManagement?: DomainManagement;
  /** List of VerificationStatusRecord */
  readonly verificationStates?: DomainPropertiesVerificationStates;
  /** List of DnsRecord */
  readonly verificationRecords?: DomainPropertiesVerificationRecords;
  /** Describes whether user engagement tracking is enabled or disabled. */
  userEngagementTracking?: UserEngagementTracking;
}

export function domainResourceSerializer(item: DomainResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["domainManagement", "userEngagementTracking"])
      ? undefined
      : _domainResourcePropertiesSerializer(item),
  };
}

export function domainResourceDeserializer(item: any): DomainResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _domainResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of a Domains resource. */
export interface DomainProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: DomainsProvisioningState;
  /** The location where the Domains resource data is stored at rest. */
  readonly dataLocation?: string;
  /** P2 sender domain that is displayed to the email recipients [RFC 5322]. */
  readonly fromSenderDomain?: string;
  /** P1 sender domain that is present on the email envelope [RFC 5321]. */
  readonly mailFromSenderDomain?: string;
  /** Describes how a Domains resource is being managed. */
  domainManagement: DomainManagement;
  /** List of VerificationStatusRecord */
  readonly verificationStates?: DomainPropertiesVerificationStates;
  /** List of DnsRecord */
  readonly verificationRecords?: DomainPropertiesVerificationRecords;
  /** Describes whether user engagement tracking is enabled or disabled. */
  userEngagementTracking?: UserEngagementTracking;
}

export function domainPropertiesSerializer(item: DomainProperties): any {
  return {
    domainManagement: item["domainManagement"],
    userEngagementTracking: item["userEngagementTracking"],
  };
}

export function domainPropertiesDeserializer(item: any): DomainProperties {
  return {
    provisioningState: item["provisioningState"],
    dataLocation: item["dataLocation"],
    fromSenderDomain: item["fromSenderDomain"],
    mailFromSenderDomain: item["mailFromSenderDomain"],
    domainManagement: item["domainManagement"],
    verificationStates: !item["verificationStates"]
      ? item["verificationStates"]
      : domainPropertiesVerificationStatesDeserializer(item["verificationStates"]),
    verificationRecords: !item["verificationRecords"]
      ? item["verificationRecords"]
      : domainPropertiesVerificationRecordsDeserializer(item["verificationRecords"]),
    userEngagementTracking: item["userEngagementTracking"],
  };
}

/** Provisioning state of the resource. */
export enum KnownDomainsProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownDomainsProvisioningState} can be used interchangeably with DomainsProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Running**: Running \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Moving**: Moving
 */
export type DomainsProvisioningState = string;

/** Describes how a Domains resource is being managed. */
export enum KnownDomainManagement {
  /** AzureManaged */
  AzureManaged = "AzureManaged",
  /** CustomerManaged */
  CustomerManaged = "CustomerManaged",
  /** CustomerManagedInExchangeOnline */
  CustomerManagedInExchangeOnline = "CustomerManagedInExchangeOnline",
}

/**
 * Describes how a Domains resource is being managed. \
 * {@link KnownDomainManagement} can be used interchangeably with DomainManagement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureManaged**: AzureManaged \
 * **CustomerManaged**: CustomerManaged \
 * **CustomerManagedInExchangeOnline**: CustomerManagedInExchangeOnline
 */
export type DomainManagement = string;

/** List of VerificationStatusRecord */
export interface DomainPropertiesVerificationStates {
  /** A class that represents a VerificationStatus record. */
  domain?: VerificationStatusRecord;
  /** A class that represents a VerificationStatus record. */
  spf?: VerificationStatusRecord;
  /** A class that represents a VerificationStatus record. */
  dkim?: VerificationStatusRecord;
  /** A class that represents a VerificationStatus record. */
  dkim2?: VerificationStatusRecord;
  /** A class that represents a VerificationStatus record. */
  dmarc?: VerificationStatusRecord;
}

export function domainPropertiesVerificationStatesDeserializer(
  item: any,
): DomainPropertiesVerificationStates {
  return {
    domain: !item["Domain"] ? item["Domain"] : verificationStatusRecordDeserializer(item["Domain"]),
    spf: !item["SPF"] ? item["SPF"] : verificationStatusRecordDeserializer(item["SPF"]),
    dkim: !item["DKIM"] ? item["DKIM"] : verificationStatusRecordDeserializer(item["DKIM"]),
    dkim2: !item["DKIM2"] ? item["DKIM2"] : verificationStatusRecordDeserializer(item["DKIM2"]),
    dmarc: !item["DMARC"] ? item["DMARC"] : verificationStatusRecordDeserializer(item["DMARC"]),
  };
}

/** A class that represents a VerificationStatus record. */
export interface VerificationStatusRecord {
  /** Status of the verification operation. */
  readonly status?: VerificationStatus;
  /** Error code. This property will only be present if the status is UnableToVerify. */
  readonly errorCode?: string;
}

export function verificationStatusRecordDeserializer(item: any): VerificationStatusRecord {
  return {
    status: item["status"],
    errorCode: item["errorCode"],
  };
}

/** Status of the verification operation. */
export enum KnownVerificationStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** VerificationRequested */
  VerificationRequested = "VerificationRequested",
  /** VerificationInProgress */
  VerificationInProgress = "VerificationInProgress",
  /** VerificationFailed */
  VerificationFailed = "VerificationFailed",
  /** Verified */
  Verified = "Verified",
  /** CancellationRequested */
  CancellationRequested = "CancellationRequested",
}

/**
 * Status of the verification operation. \
 * {@link KnownVerificationStatus} can be used interchangeably with VerificationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **VerificationRequested**: VerificationRequested \
 * **VerificationInProgress**: VerificationInProgress \
 * **VerificationFailed**: VerificationFailed \
 * **Verified**: Verified \
 * **CancellationRequested**: CancellationRequested
 */
export type VerificationStatus = string;

/** List of DnsRecord */
export interface DomainPropertiesVerificationRecords {
  /** A class that represents a VerificationStatus record. */
  domain?: DnsRecord;
  /** A class that represents a VerificationStatus record. */
  spf?: DnsRecord;
  /** A class that represents a VerificationStatus record. */
  dkim?: DnsRecord;
  /** A class that represents a VerificationStatus record. */
  dkim2?: DnsRecord;
  /** A class that represents a VerificationStatus record. */
  dmarc?: DnsRecord;
}

export function domainPropertiesVerificationRecordsDeserializer(
  item: any,
): DomainPropertiesVerificationRecords {
  return {
    domain: !item["Domain"] ? item["Domain"] : dnsRecordDeserializer(item["Domain"]),
    spf: !item["SPF"] ? item["SPF"] : dnsRecordDeserializer(item["SPF"]),
    dkim: !item["DKIM"] ? item["DKIM"] : dnsRecordDeserializer(item["DKIM"]),
    dkim2: !item["DKIM2"] ? item["DKIM2"] : dnsRecordDeserializer(item["DKIM2"]),
    dmarc: !item["DMARC"] ? item["DMARC"] : dnsRecordDeserializer(item["DMARC"]),
  };
}

/** A class that represents a VerificationStatus record. */
export interface DnsRecord {
  /** Type of the DNS record. Example: TXT */
  readonly type?: string;
  /** Name of the DNS record. */
  readonly name?: string;
  /** Value of the DNS record. */
  readonly value?: string;
  /** Represents an expiry time in seconds to represent how long this entry can be cached by the resolver, default = 3600sec. */
  readonly ttl?: number;
}

export function dnsRecordDeserializer(item: any): DnsRecord {
  return {
    type: item["type"],
    name: item["name"],
    value: item["value"],
    ttl: item["ttl"],
  };
}

/** Describes whether user engagement tracking is enabled or disabled. */
export enum KnownUserEngagementTracking {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Describes whether user engagement tracking is enabled or disabled. \
 * {@link KnownUserEngagementTracking} can be used interchangeably with UserEngagementTracking,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type UserEngagementTracking = string;

/** A class that describes the PATCH request parameters of a Domains resource. */
export interface UpdateDomainRequestParameters extends TaggedResource {
  /** Describes whether user engagement tracking is enabled or disabled. */
  userEngagementTracking?: UserEngagementTracking;
}

export function updateDomainRequestParametersSerializer(item: UpdateDomainRequestParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["userEngagementTracking"])
      ? undefined
      : _updateDomainRequestParametersPropertiesSerializer(item),
  };
}

/** A class that describes the updatable properties of a Domains resource. */
export interface UpdateDomainProperties {
  /** Describes whether user engagement tracking is enabled or disabled. */
  userEngagementTracking?: UserEngagementTracking;
}

export function updateDomainPropertiesSerializer(item: UpdateDomainProperties): any {
  return { userEngagementTracking: item["userEngagementTracking"] };
}

/** Object that includes an array of Domains resource and a possible link for next set. */
export interface _DomainResourceList {
  /** The DomainResource items on this page */
  value: DomainResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _domainResourceListDeserializer(item: any): _DomainResourceList {
  return {
    value: domainResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainResourceArraySerializer(result: Array<DomainResource>): any[] {
  return result.map((item) => {
    return domainResourceSerializer(item);
  });
}

export function domainResourceArrayDeserializer(result: Array<DomainResource>): any[] {
  return result.map((item) => {
    return domainResourceDeserializer(item);
  });
}

/** Input parameter for verification APIs */
export interface VerificationParameter {
  /** Type of verification. */
  verificationType: VerificationType;
}

export function verificationParameterSerializer(item: VerificationParameter): any {
  return { verificationType: item["verificationType"] };
}

/** Type of verification. */
export enum KnownVerificationType {
  /** Domain */
  Domain = "Domain",
  /** SPF */
  SPF = "SPF",
  /** DKIM */
  Dkim = "DKIM",
  /** DKIM2 */
  Dkim2 = "DKIM2",
  /** DMARC */
  Dmarc = "DMARC",
}

/**
 * Type of verification. \
 * {@link KnownVerificationType} can be used interchangeably with VerificationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Domain**: Domain \
 * **SPF**: SPF \
 * **DKIM**: DKIM \
 * **DKIM2**: DKIM2 \
 * **DMARC**: DMARC
 */
export type VerificationType = string;

/** A class representing an EmailService resource. */
export interface EmailServiceResource extends TrackedResource {
  /** Provisioning state of the resource. */
  readonly provisioningState?: EmailServicesProvisioningState;
  /** The location where the email service stores its data at rest. */
  dataLocation?: string;
}

export function emailServiceResourceSerializer(item: EmailServiceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["dataLocation"])
      ? undefined
      : _emailServiceResourcePropertiesSerializer(item),
  };
}

export function emailServiceResourceDeserializer(item: any): EmailServiceResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _emailServiceResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of the EmailService. */
export interface EmailServiceProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: EmailServicesProvisioningState;
  /** The location where the email service stores its data at rest. */
  dataLocation: string;
}

export function emailServicePropertiesSerializer(item: EmailServiceProperties): any {
  return { dataLocation: item["dataLocation"] };
}

export function emailServicePropertiesDeserializer(item: any): EmailServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    dataLocation: item["dataLocation"],
  };
}

/** Provisioning state of the resource. */
export enum KnownEmailServicesProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownEmailServicesProvisioningState} can be used interchangeably with EmailServicesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Running**: Running \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Moving**: Moving
 */
export type EmailServicesProvisioningState = string;

/** A class representing update parameters for EmailService resource. */
export interface EmailServiceResourceUpdate extends TaggedResource {}

export function emailServiceResourceUpdateSerializer(item: EmailServiceResourceUpdate): any {
  return { tags: item["tags"] };
}

/** Object that includes an array of EmailServices and a possible link for next set. */
export interface _EmailServiceResourceList {
  /** The EmailServiceResource items on this page */
  value: EmailServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _emailServiceResourceListDeserializer(item: any): _EmailServiceResourceList {
  return {
    value: emailServiceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function emailServiceResourceArraySerializer(result: Array<EmailServiceResource>): any[] {
  return result.map((item) => {
    return emailServiceResourceSerializer(item);
  });
}

export function emailServiceResourceArrayDeserializer(result: Array<EmailServiceResource>): any[] {
  return result.map((item) => {
    return emailServiceResourceDeserializer(item);
  });
}

/** A class representing a SenderUsername resource. */
export interface SenderUsernameResource extends ProxyResource {
  /** The location where the SenderUsername resource data is stored at rest. */
  readonly dataLocation?: string;
  /** A sender senderUsername to be used when sending emails. */
  username?: string;
  /** The display name for the senderUsername. */
  displayName?: string;
  /** Provisioning state of the resource. Unknown is the default state for Communication Services. */
  readonly provisioningState?: ProvisioningState;
}

export function senderUsernameResourceSerializer(item: SenderUsernameResource): any {
  return {
    properties: areAllPropsUndefined(item, ["username", "displayName"])
      ? undefined
      : _senderUsernameResourcePropertiesSerializer(item),
  };
}

export function senderUsernameResourceDeserializer(item: any): SenderUsernameResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _senderUsernameResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of a SenderUsername resource. */
export interface SenderUsernameProperties {
  /** The location where the SenderUsername resource data is stored at rest. */
  readonly dataLocation?: string;
  /** A sender senderUsername to be used when sending emails. */
  username: string;
  /** The display name for the senderUsername. */
  displayName?: string;
  /** Provisioning state of the resource. Unknown is the default state for Communication Services. */
  readonly provisioningState?: ProvisioningState;
}

export function senderUsernamePropertiesSerializer(item: SenderUsernameProperties): any {
  return { username: item["username"], displayName: item["displayName"] };
}

export function senderUsernamePropertiesDeserializer(item: any): SenderUsernameProperties {
  return {
    dataLocation: item["dataLocation"],
    username: item["username"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of the resource. Unknown is the default state for Communication Services. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
}

/**
 * Provisioning state of the resource. Unknown is the default state for Communication Services. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Running**: Running \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Moving**: Moving
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

/** A class representing a Domains SenderUsernames collection. */
export interface _SenderUsernameResourceCollection {
  /** The SenderUsernameResource items on this page */
  value: SenderUsernameResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _senderUsernameResourceCollectionDeserializer(
  item: any,
): _SenderUsernameResourceCollection {
  return {
    value: senderUsernameResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function senderUsernameResourceArraySerializer(
  result: Array<SenderUsernameResource>,
): any[] {
  return result.map((item) => {
    return senderUsernameResourceSerializer(item);
  });
}

export function senderUsernameResourceArrayDeserializer(
  result: Array<SenderUsernameResource>,
): any[] {
  return result.map((item) => {
    return senderUsernameResourceDeserializer(item);
  });
}

/** The object describing the smtp username resource. */
export interface SmtpUsernameResource extends ProxyResource {
  /** The SMTP username. Could be free form or in the email address format. */
  username?: string;
  /** The application Id for the linked Entra Application. */
  entraApplicationId?: string;
  /** The tenant of the linked Entra Application. */
  tenantId?: string;
}

export function smtpUsernameResourceSerializer(item: SmtpUsernameResource): any {
  return {
    properties: areAllPropsUndefined(item, ["username", "entraApplicationId", "tenantId"])
      ? undefined
      : _smtpUsernameResourcePropertiesSerializer(item),
  };
}

export function smtpUsernameResourceDeserializer(item: any): SmtpUsernameResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _smtpUsernameResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of a SmtpUsername resource. */
export interface SmtpUsernameProperties {
  /** The SMTP username. Could be free form or in the email address format. */
  username: string;
  /** The application Id for the linked Entra Application. */
  entraApplicationId: string;
  /** The tenant of the linked Entra Application. */
  tenantId: string;
}

export function smtpUsernamePropertiesSerializer(item: SmtpUsernameProperties): any {
  return {
    username: item["username"],
    entraApplicationId: item["entraApplicationId"],
    tenantId: item["tenantId"],
  };
}

export function smtpUsernamePropertiesDeserializer(item: any): SmtpUsernameProperties {
  return {
    username: item["username"],
    entraApplicationId: item["entraApplicationId"],
    tenantId: item["tenantId"],
  };
}

/** Collection of SmtpUsername resources. Response will include a nextLink if response contains more pages. */
export interface _SmtpUsernameResourceCollection {
  /** The SmtpUsernameResource items on this page */
  value: SmtpUsernameResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _smtpUsernameResourceCollectionDeserializer(
  item: any,
): _SmtpUsernameResourceCollection {
  return {
    value: smtpUsernameResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function smtpUsernameResourceArraySerializer(result: Array<SmtpUsernameResource>): any[] {
  return result.map((item) => {
    return smtpUsernameResourceSerializer(item);
  });
}

export function smtpUsernameResourceArrayDeserializer(result: Array<SmtpUsernameResource>): any[] {
  return result.map((item) => {
    return smtpUsernameResourceDeserializer(item);
  });
}

/** A class representing a SuppressionList resource. */
export interface SuppressionListResource extends ProxyResource {
  /** The name of the suppression list. This value must match one of the valid sender usernames of the sending domain. */
  listName?: string;
  /** The date the resource was last updated. */
  readonly lastUpdatedTimeStamp?: string;
  /** The date the resource was created. */
  readonly createdTimeStamp?: string;
  /** The location where the SuppressionListAddress data is stored at rest. This value is inherited from the parent Domains resource. */
  readonly dataLocation?: string;
}

export function suppressionListResourceSerializer(item: SuppressionListResource): any {
  return {
    properties: areAllPropsUndefined(item, ["listName"])
      ? undefined
      : _suppressionListResourcePropertiesSerializer(item),
  };
}

export function suppressionListResourceDeserializer(item: any): SuppressionListResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _suppressionListResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of a SuppressionList resource. */
export interface SuppressionListProperties {
  /** The name of the suppression list. This value must match one of the valid sender usernames of the sending domain. */
  listName?: string;
  /** The date the resource was last updated. */
  readonly lastUpdatedTimeStamp?: string;
  /** The date the resource was created. */
  readonly createdTimeStamp?: string;
  /** The location where the SuppressionListAddress data is stored at rest. This value is inherited from the parent Domains resource. */
  readonly dataLocation?: string;
}

export function suppressionListPropertiesSerializer(item: SuppressionListProperties): any {
  return { listName: item["listName"] };
}

export function suppressionListPropertiesDeserializer(item: any): SuppressionListProperties {
  return {
    listName: item["listName"],
    lastUpdatedTimeStamp: item["lastUpdatedTimeStamp"],
    createdTimeStamp: item["createdTimeStamp"],
    dataLocation: item["dataLocation"],
  };
}

/** A class representing a Domains SuppressionListResource collection. */
export interface _SuppressionListResourceCollection {
  /** The SuppressionListResource items on this page */
  value: SuppressionListResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _suppressionListResourceCollectionDeserializer(
  item: any,
): _SuppressionListResourceCollection {
  return {
    value: suppressionListResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function suppressionListResourceArraySerializer(
  result: Array<SuppressionListResource>,
): any[] {
  return result.map((item) => {
    return suppressionListResourceSerializer(item);
  });
}

export function suppressionListResourceArrayDeserializer(
  result: Array<SuppressionListResource>,
): any[] {
  return result.map((item) => {
    return suppressionListResourceDeserializer(item);
  });
}

/** A object that represents a SuppressionList record. */
export interface SuppressionListAddressResource extends ProxyResource {
  /** Email address of the recipient. */
  email?: string;
  /** The first name of the email recipient. */
  firstName?: string;
  /** The last name of the email recipient. */
  lastName?: string;
  /** An optional property to provide contextual notes or a description for an address. */
  notes?: string;
  /** The date the address was last updated in a suppression list. */
  readonly lastModified?: Date;
  /** The location where the SuppressionListAddress data is stored at rest. This value is inherited from the parent Domains resource. */
  readonly dataLocation?: string;
}

export function suppressionListAddressResourceSerializer(
  item: SuppressionListAddressResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["email", "firstName", "lastName", "notes"])
      ? undefined
      : _suppressionListAddressResourcePropertiesSerializer(item),
  };
}

export function suppressionListAddressResourceDeserializer(
  item: any,
): SuppressionListAddressResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _suppressionListAddressResourcePropertiesDeserializer(item["properties"])),
  };
}

/** A class that describes the properties of a SuppressionListAddress resource. */
export interface SuppressionListAddressProperties {
  /** Email address of the recipient. */
  email: string;
  /** The first name of the email recipient. */
  firstName?: string;
  /** The last name of the email recipient. */
  lastName?: string;
  /** An optional property to provide contextual notes or a description for an address. */
  notes?: string;
  /** The date the address was last updated in a suppression list. */
  readonly lastModified?: Date;
  /** The location where the SuppressionListAddress data is stored at rest. This value is inherited from the parent Domains resource. */
  readonly dataLocation?: string;
}

export function suppressionListAddressPropertiesSerializer(
  item: SuppressionListAddressProperties,
): any {
  return {
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    notes: item["notes"],
  };
}

export function suppressionListAddressPropertiesDeserializer(
  item: any,
): SuppressionListAddressProperties {
  return {
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    notes: item["notes"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    dataLocation: item["dataLocation"],
  };
}

/** Collection of addresses in a suppression list. Response will include a nextLink if response contains more pages. */
export interface _SuppressionListAddressResourceCollection {
  /** The SuppressionListAddressResource items on this page */
  value: SuppressionListAddressResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _suppressionListAddressResourceCollectionDeserializer(
  item: any,
): _SuppressionListAddressResourceCollection {
  return {
    value: suppressionListAddressResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function suppressionListAddressResourceArraySerializer(
  result: Array<SuppressionListAddressResource>,
): any[] {
  return result.map((item) => {
    return suppressionListAddressResourceSerializer(item);
  });
}

export function suppressionListAddressResourceArrayDeserializer(
  result: Array<SuppressionListAddressResource>,
): any[] {
  return result.map((item) => {
    return suppressionListAddressResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-01 API version. */
  V20250901 = "2025-09-01",
  /** The 2026-03-18 API version. */
  V20260318 = "2026-03-18",
}

export function _communicationServiceResourcePropertiesSerializer(
  item: CommunicationServiceResource,
): any {
  return {
    dataLocation: item["dataLocation"],
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _communicationServiceResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    hostName: item["hostName"],
    dataLocation: item["dataLocation"],
    notificationHubId: item["notificationHubId"],
    version: item["version"],
    immutableResourceId: item["immutableResourceId"],
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _communicationServiceResourceUpdatePropertiesSerializer(
  item: CommunicationServiceResourceUpdate,
): any {
  return {
    linkedDomains: !item["linkedDomains"]
      ? item["linkedDomains"]
      : item["linkedDomains"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _domainResourcePropertiesSerializer(item: DomainResource): any {
  return {
    domainManagement: item["domainManagement"],
    userEngagementTracking: item["userEngagementTracking"],
  };
}

export function _domainResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    dataLocation: item["dataLocation"],
    fromSenderDomain: item["fromSenderDomain"],
    mailFromSenderDomain: item["mailFromSenderDomain"],
    domainManagement: item["domainManagement"],
    verificationStates: !item["verificationStates"]
      ? item["verificationStates"]
      : domainPropertiesVerificationStatesDeserializer(item["verificationStates"]),
    verificationRecords: !item["verificationRecords"]
      ? item["verificationRecords"]
      : domainPropertiesVerificationRecordsDeserializer(item["verificationRecords"]),
    userEngagementTracking: item["userEngagementTracking"],
  };
}

export function _updateDomainRequestParametersPropertiesSerializer(
  item: UpdateDomainRequestParameters,
): any {
  return { userEngagementTracking: item["userEngagementTracking"] };
}

export function _emailServiceResourcePropertiesSerializer(item: EmailServiceResource): any {
  return { dataLocation: item["dataLocation"] };
}

export function _emailServiceResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    dataLocation: item["dataLocation"],
  };
}

export function _senderUsernameResourcePropertiesSerializer(item: SenderUsernameResource): any {
  return { username: item["username"], displayName: item["displayName"] };
}

export function _senderUsernameResourcePropertiesDeserializer(item: any) {
  return {
    dataLocation: item["dataLocation"],
    username: item["username"],
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
  };
}

export function _smtpUsernameResourcePropertiesSerializer(item: SmtpUsernameResource): any {
  return {
    username: item["username"],
    entraApplicationId: item["entraApplicationId"],
    tenantId: item["tenantId"],
  };
}

export function _smtpUsernameResourcePropertiesDeserializer(item: any) {
  return {
    username: item["username"],
    entraApplicationId: item["entraApplicationId"],
    tenantId: item["tenantId"],
  };
}

export function _suppressionListResourcePropertiesSerializer(item: SuppressionListResource): any {
  return { listName: item["listName"] };
}

export function _suppressionListResourcePropertiesDeserializer(item: any) {
  return {
    listName: item["listName"],
    lastUpdatedTimeStamp: item["lastUpdatedTimeStamp"],
    createdTimeStamp: item["createdTimeStamp"],
    dataLocation: item["dataLocation"],
  };
}

export function _suppressionListAddressResourcePropertiesSerializer(
  item: SuppressionListAddressResource,
): any {
  return {
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    notes: item["notes"],
  };
}

export function _suppressionListAddressResourcePropertiesDeserializer(item: any) {
  return {
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    notes: item["notes"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    dataLocation: item["dataLocation"],
  };
}
