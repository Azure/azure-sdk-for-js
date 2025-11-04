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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Single item in a List or Get AuthorizationRule operation */
export interface AuthorizationRule extends ProxyResource {
  /** Properties supplied to create or update AuthorizationRule */
  properties?: AuthorizationRuleProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function authorizationRuleSerializer(item: AuthorizationRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : authorizationRulePropertiesSerializer(item["properties"]),
  };
}

export function authorizationRuleDeserializer(item: any): AuthorizationRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : authorizationRulePropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties supplied to create or update AuthorizationRule */
export interface AuthorizationRuleProperties {
  /** The rights associated with the rule. */
  rights: AccessRights[];
}

export function authorizationRulePropertiesSerializer(item: AuthorizationRuleProperties): any {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

export function authorizationRulePropertiesDeserializer(item: any): AuthorizationRuleProperties {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link AccessRights} that the service accepts. */
export enum KnownAccessRights {
  /** Manage */
  Manage = "Manage",
  /** Send */
  Send = "Send",
  /** Listen */
  Listen = "Listen",
}

/** Type of AccessRights */
export type AccessRights = string;

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

/** The response of a AuthorizationRule list operation. */
export interface _AuthorizationRuleListResult {
  /** The AuthorizationRule items on this page */
  value: AuthorizationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authorizationRuleListResultDeserializer(item: any): _AuthorizationRuleListResult {
  return {
    value: authorizationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authorizationRuleArraySerializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleSerializer(item);
  });
}

export function authorizationRuleArrayDeserializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleDeserializer(item);
  });
}

/** Namespace/Relay Connection String */
export interface AccessKeys {
  /** Primary connection string of the created namespace authorization rule. */
  primaryConnectionString?: string;
  /** Secondary connection string of the created namespace authorization rule. */
  secondaryConnectionString?: string;
  /** A base64-encoded 256-bit primary key for signing and validating the SAS token. */
  primaryKey?: string;
  /** A base64-encoded 256-bit secondary key for signing and validating the SAS token. */
  secondaryKey?: string;
  /** A string that describes the authorization rule. */
  keyName?: string;
}

export function accessKeysDeserializer(item: any): AccessKeys {
  return {
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    keyName: item["keyName"],
  };
}

/** Parameters supplied to the regenerate authorization rule operation, specifies which key needs to be reset. */
export interface RegenerateAccessKeyParameters {
  /** The access key to regenerate. */
  keyType: KeyType;
  /** Optional. If the key value is provided, this is set to key type, or autogenerated key value set for key type. */
  key?: string;
}

export function regenerateAccessKeyParametersSerializer(item: RegenerateAccessKeyParameters): any {
  return { keyType: item["keyType"], key: item["key"] };
}

/** The access key to regenerate. */
export enum KnownKeyType {
  /** PrimaryKey */
  PrimaryKey = "PrimaryKey",
  /** SecondaryKey */
  SecondaryKey = "SecondaryKey",
}

/**
 * The access key to regenerate. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryKey** \
 * **SecondaryKey**
 */
export type KeyType = string;

/** Description of hybrid connection resource. */
export interface HybridConnection extends ProxyResource {
  /** Properties of the HybridConnection. */
  properties?: HybridConnectionProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function hybridConnectionSerializer(item: HybridConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : hybridConnectionPropertiesSerializer(item["properties"]),
  };
}

export function hybridConnectionDeserializer(item: any): HybridConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hybridConnectionPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties of the HybridConnection. */
export interface HybridConnectionProperties {
  /** The time the hybrid connection was created. */
  readonly createdAt?: Date;
  /** The time the namespace was updated. */
  readonly updatedAt?: Date;
  /** The number of listeners for this hybrid connection. Note that min : 1 and max:25 are supported. */
  readonly listenerCount?: number;
  /** Returns true if client authorization is needed for this hybrid connection; otherwise, false. */
  requiresClientAuthorization?: boolean;
  /** The usermetadata is a placeholder to store user-defined string data for the hybrid connection endpoint. For example, it can be used to store descriptive data, such as a list of teams and their contact information. Also, user-defined configuration settings can be stored. */
  userMetadata?: string;
}

export function hybridConnectionPropertiesSerializer(item: HybridConnectionProperties): any {
  return {
    requiresClientAuthorization: item["requiresClientAuthorization"],
    userMetadata: item["userMetadata"],
  };
}

export function hybridConnectionPropertiesDeserializer(item: any): HybridConnectionProperties {
  return {
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    listenerCount: item["listenerCount"],
    requiresClientAuthorization: item["requiresClientAuthorization"],
    userMetadata: item["userMetadata"],
  };
}

/** The response of a HybridConnection list operation. */
export interface _HybridConnectionListResult {
  /** The HybridConnection items on this page */
  value: HybridConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridConnectionListResultDeserializer(item: any): _HybridConnectionListResult {
  return {
    value: hybridConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hybridConnectionArraySerializer(result: Array<HybridConnection>): any[] {
  return result.map((item) => {
    return hybridConnectionSerializer(item);
  });
}

export function hybridConnectionArrayDeserializer(result: Array<HybridConnection>): any[] {
  return result.map((item) => {
    return hybridConnectionDeserializer(item);
  });
}

/** Description of the WCF relay resource. */
export interface WcfRelay extends ProxyResource {
  /** Properties of the WCF relay. */
  properties?: WcfRelayProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function wcfRelaySerializer(item: WcfRelay): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : wcfRelayPropertiesSerializer(item["properties"]),
  };
}

export function wcfRelayDeserializer(item: any): WcfRelay {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : wcfRelayPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties of the WCF relay. */
export interface WcfRelayProperties {
  /** Returns true if the relay is dynamic; otherwise, false. */
  readonly isDynamic?: boolean;
  /** The time the WCF relay was created. */
  readonly createdAt?: Date;
  /** The time the namespace was updated. */
  readonly updatedAt?: Date;
  /** The number of listeners for this relay. Note that min :1 and max:25 are supported. */
  readonly listenerCount?: number;
  /** WCF relay type. */
  relayType?: Relaytype;
  /** Returns true if client authorization is needed for this relay; otherwise, false. */
  requiresClientAuthorization?: boolean;
  /** Returns true if transport security is needed for this relay; otherwise, false. */
  requiresTransportSecurity?: boolean;
  /** The usermetadata is a placeholder to store user-defined string data for the WCF Relay endpoint. For example, it can be used to store descriptive data, such as list of teams and their contact information. Also, user-defined configuration settings can be stored. */
  userMetadata?: string;
}

export function wcfRelayPropertiesSerializer(item: WcfRelayProperties): any {
  return {
    relayType: item["relayType"],
    requiresClientAuthorization: item["requiresClientAuthorization"],
    requiresTransportSecurity: item["requiresTransportSecurity"],
    userMetadata: item["userMetadata"],
  };
}

export function wcfRelayPropertiesDeserializer(item: any): WcfRelayProperties {
  return {
    isDynamic: item["isDynamic"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    listenerCount: item["listenerCount"],
    relayType: item["relayType"],
    requiresClientAuthorization: item["requiresClientAuthorization"],
    requiresTransportSecurity: item["requiresTransportSecurity"],
    userMetadata: item["userMetadata"],
  };
}

/** WCF relay type. */
export type Relaytype = "NetTcp" | "Http";

/** The response of the list WCF relay operation. */
export interface _WcfRelaysListResult {
  /** The WcfRelay items on this page */
  value: WcfRelay[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _wcfRelaysListResultDeserializer(item: any): _WcfRelaysListResult {
  return {
    value: wcfRelayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function wcfRelayArraySerializer(result: Array<WcfRelay>): any[] {
  return result.map((item) => {
    return wcfRelaySerializer(item);
  });
}

export function wcfRelayArrayDeserializer(result: Array<WcfRelay>): any[] {
  return result.map((item) => {
    return wcfRelayDeserializer(item);
  });
}

/** Properties of the PrivateEndpointConnection. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Properties of the PrivateEndpointConnection. */
  properties?: PrivateEndpointConnectionProperties;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
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
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties of the private endpoint connection resource. */
export interface PrivateEndpointConnectionProperties {
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: EndPointProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** PrivateEndpoint information. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint. */
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

/** ConnectionState information. */
export interface ConnectionState {
  /** Status of the connection. */
  status?: PrivateLinkConnectionStatus;
  /** Description of the connection state. */
  description?: string;
}

export function connectionStateSerializer(item: ConnectionState): any {
  return { status: item["status"], description: item["description"] };
}

export function connectionStateDeserializer(item: any): ConnectionState {
  return {
    status: item["status"],
    description: item["description"],
  };
}

/** Status of the connection. */
export enum KnownPrivateLinkConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Status of the connection. \
 * {@link KnownPrivateLinkConnectionStatus} can be used interchangeably with PrivateLinkConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkConnectionStatus = string;

/** Provisioning state of the Private Endpoint Connection. */
export enum KnownEndPointProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the Private Endpoint Connection. \
 * {@link KnownEndPointProvisioningState} can be used interchangeably with EndPointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Canceled** \
 * **Failed**
 */
export type EndPointProvisioningState = string;

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

/** A resource that supports private link capabilities. */
export interface PrivateLinkResource extends ProxyResource {
  /** A resource that supports private link capabilities. */
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

/** Properties of PrivateLinkResource */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
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
  };
}

/** Result of the List private link resources operation. */
export interface PrivateLinkResourcesListResult {
  /** A collection of private link resources */
  value: PrivateLinkResource[];
  /** A link for the next page of private link resources. */
  nextLink?: string;
}

export function privateLinkResourcesListResultDeserializer(
  item: any,
): PrivateLinkResourcesListResult {
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

/** Description of a namespace resource. */
export interface RelayNamespace extends TrackedResource {
  /** Description of Relay namespace */
  properties?: RelayNamespaceProperties;
  /** SKU of the namespace. */
  sku?: Sku;
}

export function relayNamespaceSerializer(item: RelayNamespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : relayNamespacePropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function relayNamespaceDeserializer(item: any): RelayNamespace {
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
      : relayNamespacePropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Properties of the namespace. */
export interface RelayNamespaceProperties {
  /** Provisioning state of the Namespace. */
  readonly provisioningState?: string;
  /** Status of the Namespace. */
  readonly status?: string;
  /** The time the namespace was created. */
  readonly createdAt?: Date;
  /** The time the namespace was updated. */
  readonly updatedAt?: Date;
  /** Endpoint you can use to perform Service Bus operations. */
  readonly serviceBusEndpoint?: string;
  /** Identifier for Azure Insights metrics. */
  readonly metricId?: string;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** This determines if traffic is allowed over public network. By default it is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function relayNamespacePropertiesSerializer(item: RelayNamespaceProperties): any {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function relayNamespacePropertiesDeserializer(item: any): RelayNamespaceProperties {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    serviceBusEndpoint: item["serviceBusEndpoint"],
    metricId: item["metricId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** This determines if traffic is allowed over public network. By default it is enabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

/** SKU of the namespace. */
export interface Sku {
  /** Name of this SKU. */
  name: SkuName;
  /** The tier of this SKU. */
  tier?: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Name of this SKU. */
export enum KnownSkuName {
  /** Standard */
  Standard = "Standard",
}

/**
 * Name of this SKU. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**
 */
export type SkuName = string;

/** The tier of this SKU. */
export enum KnownSkuTier {
  /** Standard */
  Standard = "Standard",
}

/**
 * The tier of this SKU. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**
 */
export type SkuTier = string;

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

/** Description of a namespace resource. */
export interface RelayUpdateParameters extends ResourceNamespacePatch {
  /** SKU of the namespace. */
  sku?: Sku;
  /** Description of Relay namespace. */
  properties?: RelayNamespaceProperties;
}

export function relayUpdateParametersSerializer(item: RelayUpdateParameters): any {
  return {
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : relayNamespacePropertiesSerializer(item["properties"]),
  };
}

/** Definition of resource. */
export interface ResourceNamespacePatch extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourceNamespacePatchSerializer(item: ResourceNamespacePatch): any {
  return { tags: item["tags"] };
}

/** The response of a RelayNamespace list operation. */
export interface _RelayNamespaceListResult {
  /** The RelayNamespace items on this page */
  value: RelayNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _relayNamespaceListResultDeserializer(item: any): _RelayNamespaceListResult {
  return {
    value: relayNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function relayNamespaceArraySerializer(result: Array<RelayNamespace>): any[] {
  return result.map((item) => {
    return relayNamespaceSerializer(item);
  });
}

export function relayNamespaceArrayDeserializer(result: Array<RelayNamespace>): any[] {
  return result.map((item) => {
    return relayNamespaceDeserializer(item);
  });
}

/** Description of topic resource. */
export interface NetworkRuleSet extends ProxyResource {
  /** NetworkRuleSet properties */
  properties?: NetworkRuleSetProperties;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : networkRuleSetPropertiesSerializer(item["properties"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkRuleSetPropertiesDeserializer(item["properties"]),
  };
}

/** NetworkRuleSet properties */
export interface NetworkRuleSetProperties {
  /** Value that indicates whether Trusted Service Access is Enabled or not. */
  trustedServiceAccessEnabled?: boolean;
  /** Default Action for Network Rule Set */
  defaultAction?: DefaultAction;
  /** This determines if traffic is allowed over public network. By default it is enabled */
  publicNetworkAccess?: PublicNetworkAccess;
  /** List of IpRules */
  ipRules?: NWRuleSetIpRules[];
}

export function networkRuleSetPropertiesSerializer(item: NetworkRuleSetProperties): any {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    publicNetworkAccess: item["publicNetworkAccess"],
    ipRules: !item["ipRules"] ? item["ipRules"] : nwRuleSetIpRulesArraySerializer(item["ipRules"]),
  };
}

export function networkRuleSetPropertiesDeserializer(item: any): NetworkRuleSetProperties {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    publicNetworkAccess: item["publicNetworkAccess"],
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : nwRuleSetIpRulesArrayDeserializer(item["ipRules"]),
  };
}

/** Default Action for Network Rule Set */
export enum KnownDefaultAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Default Action for Network Rule Set \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type DefaultAction = string;

export function nwRuleSetIpRulesArraySerializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesSerializer(item);
  });
}

export function nwRuleSetIpRulesArrayDeserializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesDeserializer(item);
  });
}

/** The response from the List namespace operation. */
export interface NWRuleSetIpRules {
  /** IP Mask */
  ipMask?: string;
  /** The IP Filter Action */
  action?: NetworkRuleIPAction;
}

export function nwRuleSetIpRulesSerializer(item: NWRuleSetIpRules): any {
  return { ipMask: item["ipMask"], action: item["action"] };
}

export function nwRuleSetIpRulesDeserializer(item: any): NWRuleSetIpRules {
  return {
    ipMask: item["ipMask"],
    action: item["action"],
  };
}

/** The IP Filter Action */
export enum KnownNetworkRuleIPAction {
  /** Allow */
  Allow = "Allow",
}

/**
 * The IP Filter Action \
 * {@link KnownNetworkRuleIPAction} can be used interchangeably with NetworkRuleIPAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**
 */
export type NetworkRuleIPAction = string;

/** Description of the check name availability request properties. */
export interface CheckNameAvailability {
  /** The namespace name to check for availability. The namespace name can contain only letters, numbers, and hyphens. The namespace must start with a letter, and it must end with a letter or number. */
  name: string;
}

export function checkNameAvailabilitySerializer(item: CheckNameAvailability): any {
  return { name: item["name"] };
}

/** Description of the check name availability request properties. */
export interface CheckNameAvailabilityResult {
  /** The detailed info regarding the reason associated with the namespace. */
  readonly message?: string;
  /** Value indicating namespace is available. Returns true if the namespace is available; otherwise, false. */
  nameAvailable?: boolean;
  /** The reason for unavailability of a namespace. */
  reason?: UnavailableReason;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** Specifies the reason for the unavailability of the service. */
export enum KnownUnavailableReason {
  /** None */
  None = "None",
  /** InvalidName */
  InvalidName = "InvalidName",
  /** SubscriptionIsDisabled */
  SubscriptionIsDisabled = "SubscriptionIsDisabled",
  /** NameInUse */
  NameInUse = "NameInUse",
  /** NameInLockdown */
  NameInLockdown = "NameInLockdown",
  /** TooManyNamespaceInCurrentSubscription */
  TooManyNamespaceInCurrentSubscription = "TooManyNamespaceInCurrentSubscription",
}

/**
 * Specifies the reason for the unavailability of the service. \
 * {@link KnownUnavailableReason} can be used interchangeably with UnavailableReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **InvalidName** \
 * **SubscriptionIsDisabled** \
 * **NameInUse** \
 * **NameInLockdown** \
 * **TooManyNamespaceInCurrentSubscription**
 */
export type UnavailableReason = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-01-01 API version. */
  V20240101 = "2024-01-01",
}
