// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** model interface _OperationListResult */
export interface _OperationListResult {
  /** [Placeholder] Description for value property */
  readonly value: Operation[];
  /** [Placeholder] Description for nextLink property. */
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

/** Represents an operation. */
export interface Operation {
  /** The name of the operation. */
  readonly name?: string;
  /** The display information for the operation. */
  display?: {
    provider?: string;
    resource?: string;
    operation?: string;
  };
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : _operationDisplayDeserializer(item["display"]),
  };
}

/** model interface _OperationDisplay */
export interface _OperationDisplay {
  /** Service provider: Microsoft Devices. */
  readonly provider?: string;
  /** Resource Type: ProvisioningServices. */
  readonly resource?: string;
  /** Name of the operation. */
  readonly operation?: string;
}

export function _operationDisplayDeserializer(item: any): _OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
  };
}

/** Error details. */
export interface ErrorDetails {
  /** The error code. */
  readonly code?: number;
  /** The HTTP status code. */
  readonly httpStatusCode?: string;
  /** The error message. */
  readonly message?: string;
  /** The error details. */
  readonly details?: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    httpStatusCode: item["httpStatusCode"],
    message: item["message"],
    details: item["details"],
  };
}

/** The X509 Certificate. */
export interface CertificateResponse extends ProxyResource {
  /** properties of a certificate */
  properties?: CertificateProperties;
  /** The entity tag. */
  readonly etag?: string;
}

export function certificateResponseSerializer(item: CertificateResponse): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesSerializer(item["properties"]),
  };
}

export function certificateResponseDeserializer(item: any): CertificateResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** The description of an X509 CA Certificate. */
export interface CertificateProperties {
  /** The certificate's subject name. */
  readonly subject?: string;
  /** The certificate's expiration date and time. */
  readonly expiry?: Date;
  /** The certificate's thumbprint. */
  readonly thumbprint?: string;
  /** Determines whether certificate has been verified. */
  isVerified?: boolean;
  /** base-64 representation of X509 certificate .cer file or just .pem file content. */
  certificate?: Uint8Array;
  /** The certificate's creation date and time. */
  readonly created?: Date;
  /** The certificate's last update date and time. */
  readonly updated?: Date;
}

export function certificatePropertiesSerializer(item: CertificateProperties): any {
  return {
    isVerified: item["isVerified"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : uint8ArrayToString(item["certificate"], "base64"),
  };
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    subject: item["subject"],
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    thumbprint: item["thumbprint"],
    isVerified: item["isVerified"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : typeof item["certificate"] === "string"
        ? stringToUint8Array(item["certificate"], "base64")
        : item["certificate"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
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

/** The JSON-serialized array of Certificate objects. */
export interface _CertificateListDescription {
  /** The array of Certificate objects. */
  value?: CertificateResponse[];
}

export function _certificateListDescriptionDeserializer(item: any): _CertificateListDescription {
  return {
    value: !item["value"] ? item["value"] : certificateResponseArrayDeserializer(item["value"]),
  };
}

export function certificateResponseArraySerializer(result: Array<CertificateResponse>): any[] {
  return result.map((item) => {
    return certificateResponseSerializer(item);
  });
}

export function certificateResponseArrayDeserializer(result: Array<CertificateResponse>): any[] {
  return result.map((item) => {
    return certificateResponseDeserializer(item);
  });
}

/** Description of the response of the verification code. */
export interface VerificationCodeResponse {
  /** Name of certificate. */
  readonly name?: string;
  /** Request etag. */
  readonly etag?: string;
  /** The resource identifier. */
  readonly id?: string;
  /** The resource type. */
  readonly type?: string;
  properties?: VerificationCodeResponseProperties;
}

export function verificationCodeResponseDeserializer(item: any): VerificationCodeResponse {
  return {
    name: item["name"],
    etag: item["etag"],
    id: item["id"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : verificationCodeResponsePropertiesDeserializer(item["properties"]),
  };
}

/** model interface VerificationCodeResponseProperties */
export interface VerificationCodeResponseProperties {
  /** Verification code. */
  verificationCode?: string;
  /** Certificate subject. */
  subject?: string;
  /** Code expiry. */
  expiry?: string;
  /** Certificate thumbprint. */
  thumbprint?: string;
  /** Indicate if the certificate is verified by owner of private key. */
  isVerified?: boolean;
  /** base-64 representation of X509 certificate .cer file or just .pem file content. */
  certificate?: Uint8Array;
  /** Certificate created time. */
  created?: string;
  /** Certificate updated time. */
  updated?: string;
}

export function verificationCodeResponsePropertiesDeserializer(
  item: any,
): VerificationCodeResponseProperties {
  return {
    verificationCode: item["verificationCode"],
    subject: item["subject"],
    expiry: item["expiry"],
    thumbprint: item["thumbprint"],
    isVerified: item["isVerified"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : typeof item["certificate"] === "string"
        ? stringToUint8Array(item["certificate"], "base64")
        : item["certificate"],
    created: item["created"],
    updated: item["updated"],
  };
}

/** The JSON-serialized leaf certificate */
export interface VerificationCodeRequest {
  /** base-64 representation of X509 certificate .cer file or just .pem file content. */
  certificate?: string;
}

export function verificationCodeRequestSerializer(item: VerificationCodeRequest): any {
  return { certificate: item["certificate"] };
}

/** Result of a long running operation. */
export interface AsyncOperationResult {
  /** current status of a long running operation. */
  status?: string;
  /** Error message containing code, description and details */
  error?: ErrorMessage;
}

export function asyncOperationResultDeserializer(item: any): AsyncOperationResult {
  return {
    status: item["status"],
    error: !item["error"] ? item["error"] : errorMessageDeserializer(item["error"]),
  };
}

/** Error response containing message and code. */
export interface ErrorMessage {
  /** standard error code */
  code?: string;
  /** standard error description */
  message?: string;
  /** detailed summary of error */
  details?: string;
}

export function errorMessageDeserializer(item: any): ErrorMessage {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
  };
}

/** The description of the provisioning service. */
export interface ProvisioningServiceDescription extends TrackedResource {
  /** The Etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal ETag convention. */
  etag?: string;
  /** The resource group of the resource. */
  resourcegroup?: string;
  /** The subscription id of the resource. */
  subscriptionid?: string;
  /** Service specific properties for a provisioning service */
  properties: IotDpsPropertiesDescription;
  /** Sku info for a provisioning Service. */
  sku: IotDpsSkuInfo;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function provisioningServiceDescriptionSerializer(
  item: ProvisioningServiceDescription,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    resourcegroup: item["resourcegroup"],
    subscriptionid: item["subscriptionid"],
    properties: iotDpsPropertiesDescriptionSerializer(item["properties"]),
    sku: iotDpsSkuInfoSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function provisioningServiceDescriptionDeserializer(
  item: any,
): ProvisioningServiceDescription {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    etag: item["etag"],
    resourcegroup: item["resourcegroup"],
    subscriptionid: item["subscriptionid"],
    properties: iotDpsPropertiesDescriptionDeserializer(item["properties"]),
    sku: iotDpsSkuInfoDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** the service specific properties of a provisioning service, including keys, linked iot hubs, current state, and system generated properties such as hostname and idScope */
export interface IotDpsPropertiesDescription {
  /** Current state of the provisioning service. */
  state?: State;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The IP filter rules. */
  ipFilterRules?: IpFilterRule[];
  /** Private endpoint connections created on this IotHub */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** The ARM provisioning state of the provisioning service. */
  provisioningState?: string;
  /** List of IoT hubs associated with this provisioning service. */
  iotHubs?: IotHubDefinitionDescription[];
  /** The Device Registry namespace that is linked to the provisioning service. */
  deviceRegistryNamespace?: DeviceRegistryNamespaceDescription;
  /** Allocation policy to be used by this provisioning service. */
  allocationPolicy?: AllocationPolicy;
  /** Service endpoint for provisioning service. */
  readonly serviceOperationsHostName?: string;
  /** Device endpoint for this provisioning service. */
  readonly deviceProvisioningHostName?: string;
  /** Unique identifier of this provisioning service. */
  readonly idScope?: string;
  /** List of authorization keys for a provisioning service. */
  authorizationPolicies?: SharedAccessSignatureAuthorizationRuleAccessRightsDescription[];
  /**
   * Optional.
   * Indicates if the DPS instance has Data Residency enabled, removing the cross geo-pair disaster recovery.
   */
  enableDataResidency?: boolean;
  /** Portal endpoint to enable CORS for this provisioning service. */
  portalOperationsHostName?: string;
}

export function iotDpsPropertiesDescriptionSerializer(item: IotDpsPropertiesDescription): any {
  return {
    state: item["state"],
    publicNetworkAccess: item["publicNetworkAccess"],
    ipFilterRules: !item["ipFilterRules"]
      ? item["ipFilterRules"]
      : ipFilterRuleArraySerializer(item["ipFilterRules"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    iotHubs: !item["iotHubs"]
      ? item["iotHubs"]
      : iotHubDefinitionDescriptionArraySerializer(item["iotHubs"]),
    deviceRegistryNamespace: !item["deviceRegistryNamespace"]
      ? item["deviceRegistryNamespace"]
      : deviceRegistryNamespaceDescriptionSerializer(item["deviceRegistryNamespace"]),
    allocationPolicy: item["allocationPolicy"],
    authorizationPolicies: !item["authorizationPolicies"]
      ? item["authorizationPolicies"]
      : sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionArraySerializer(
          item["authorizationPolicies"],
        ),
    enableDataResidency: item["enableDataResidency"],
    portalOperationsHostName: item["portalOperationsHostName"],
  };
}

export function iotDpsPropertiesDescriptionDeserializer(item: any): IotDpsPropertiesDescription {
  return {
    state: item["state"],
    publicNetworkAccess: item["publicNetworkAccess"],
    ipFilterRules: !item["ipFilterRules"]
      ? item["ipFilterRules"]
      : ipFilterRuleArrayDeserializer(item["ipFilterRules"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    iotHubs: !item["iotHubs"]
      ? item["iotHubs"]
      : iotHubDefinitionDescriptionArrayDeserializer(item["iotHubs"]),
    deviceRegistryNamespace: !item["deviceRegistryNamespace"]
      ? item["deviceRegistryNamespace"]
      : deviceRegistryNamespaceDescriptionDeserializer(item["deviceRegistryNamespace"]),
    allocationPolicy: item["allocationPolicy"],
    serviceOperationsHostName: item["serviceOperationsHostName"],
    deviceProvisioningHostName: item["deviceProvisioningHostName"],
    idScope: item["idScope"],
    authorizationPolicies: !item["authorizationPolicies"]
      ? item["authorizationPolicies"]
      : sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionArrayDeserializer(
          item["authorizationPolicies"],
        ),
    enableDataResidency: item["enableDataResidency"],
    portalOperationsHostName: item["portalOperationsHostName"],
  };
}

/** Current state of the provisioning service. */
export enum KnownState {
  /** Activating */
  Activating = "Activating",
  /** Active */
  Active = "Active",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** ActivationFailed */
  ActivationFailed = "ActivationFailed",
  /** DeletionFailed */
  DeletionFailed = "DeletionFailed",
  /** Transitioning */
  Transitioning = "Transitioning",
  /** Suspending */
  Suspending = "Suspending",
  /** Suspended */
  Suspended = "Suspended",
  /** Resuming */
  Resuming = "Resuming",
  /** FailingOver */
  FailingOver = "FailingOver",
  /** FailoverFailed */
  FailoverFailed = "FailoverFailed",
}

/**
 * Current state of the provisioning service. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activating** \
 * **Active** \
 * **Deleting** \
 * **Deleted** \
 * **ActivationFailed** \
 * **DeletionFailed** \
 * **Transitioning** \
 * **Suspending** \
 * **Suspended** \
 * **Resuming** \
 * **FailingOver** \
 * **FailoverFailed**
 */
export type State = string;

/** Whether requests from Public Network are allowed */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether requests from Public Network are allowed \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

export function ipFilterRuleArraySerializer(result: Array<IpFilterRule>): any[] {
  return result.map((item) => {
    return ipFilterRuleSerializer(item);
  });
}

export function ipFilterRuleArrayDeserializer(result: Array<IpFilterRule>): any[] {
  return result.map((item) => {
    return ipFilterRuleDeserializer(item);
  });
}

/** The IP filter rules for a provisioning Service. */
export interface IpFilterRule {
  /** The name of the IP filter rule. */
  filterName: string;
  /** The desired action for requests captured by this rule. */
  action: IpFilterActionType;
  /** A string that contains the IP address range in CIDR notation for the rule. */
  ipMask: string;
  /** Target for requests captured by this rule. */
  target?: IpFilterTargetType;
}

export function ipFilterRuleSerializer(item: IpFilterRule): any {
  return {
    filterName: item["filterName"],
    action: item["action"],
    ipMask: item["ipMask"],
    target: item["target"],
  };
}

export function ipFilterRuleDeserializer(item: any): IpFilterRule {
  return {
    filterName: item["filterName"],
    action: item["action"],
    ipMask: item["ipMask"],
    target: item["target"],
  };
}

/** The desired action for requests captured by this rule. */
export type IpFilterActionType = "Accept" | "Reject";
/** Target for requests captured by this rule. */
export type IpFilterTargetType = "all" | "serviceApi" | "deviceApi";

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

/** The private endpoint connection of a provisioning service */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The properties of a private endpoint connection */
  properties: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: privateEndpointConnectionPropertiesSerializer(item["properties"]),
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
    properties: privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a private endpoint connection */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint property of a private endpoint connection */
  privateEndpoint?: PrivateEndpoint;
  /** The current state of a private endpoint connection */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

/** The private endpoint property of a private endpoint connection */
export interface PrivateEndpoint {
  /** The resource identifier. */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The current state of a private endpoint connection */
export interface PrivateLinkServiceConnectionState {
  /** The status of a private endpoint connection */
  status: PrivateLinkServiceConnectionStatus;
  /** The description for the current state of a private endpoint connection */
  description: string;
  /** Actions required for a private endpoint connection */
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

/** The status of a private endpoint connection */
export enum KnownPrivateLinkServiceConnectionStatus {
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
 * The status of a private endpoint connection \
 * {@link KnownPrivateLinkServiceConnectionStatus} can be used interchangeably with PrivateLinkServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkServiceConnectionStatus = string;

export function iotHubDefinitionDescriptionArraySerializer(
  result: Array<IotHubDefinitionDescription>,
): any[] {
  return result.map((item) => {
    return iotHubDefinitionDescriptionSerializer(item);
  });
}

export function iotHubDefinitionDescriptionArrayDeserializer(
  result: Array<IotHubDefinitionDescription>,
): any[] {
  return result.map((item) => {
    return iotHubDefinitionDescriptionDeserializer(item);
  });
}

/** Description of the IoT hub. */
export interface IotHubDefinitionDescription {
  /** flag for applying allocationPolicy or not for a given iot hub. */
  applyAllocationPolicy?: boolean;
  /** weight to apply for a given iot h. */
  allocationWeight?: number;
  /** Host name of the IoT hub. */
  readonly name?: string;
  /** Connection string of the IoT hub. */
  connectionString: string;
  /** ARM region of the IoT hub. */
  location: string;
}

export function iotHubDefinitionDescriptionSerializer(item: IotHubDefinitionDescription): any {
  return {
    applyAllocationPolicy: item["applyAllocationPolicy"],
    allocationWeight: item["allocationWeight"],
    connectionString: item["connectionString"],
    location: item["location"],
  };
}

export function iotHubDefinitionDescriptionDeserializer(item: any): IotHubDefinitionDescription {
  return {
    applyAllocationPolicy: item["applyAllocationPolicy"],
    allocationWeight: item["allocationWeight"],
    name: item["name"],
    connectionString: item["connectionString"],
    location: item["location"],
  };
}

/** Description of the Device Registry namespace that is linked to the provisioning service. */
export interface DeviceRegistryNamespaceDescription {
  /** The ARM resource ID of the Device Registry namespace. */
  resourceId: string;
  /** Device Registry Namespace MI authentication type: UserAssigned, SystemAssigned. */
  authenticationType: DeviceRegistryNamespaceAuthenticationType;
  /** The selected user-assigned identity resource Id associated with Device Registry namespace. This is required when authenticationType is UserAssigned. */
  selectedUserAssignedIdentityResourceId?: string;
}

export function deviceRegistryNamespaceDescriptionSerializer(
  item: DeviceRegistryNamespaceDescription,
): any {
  return {
    resourceId: item["resourceId"],
    authenticationType: item["authenticationType"],
    selectedUserAssignedIdentityResourceId: item["selectedUserAssignedIdentityResourceId"],
  };
}

export function deviceRegistryNamespaceDescriptionDeserializer(
  item: any,
): DeviceRegistryNamespaceDescription {
  return {
    resourceId: item["resourceId"],
    authenticationType: item["authenticationType"],
    selectedUserAssignedIdentityResourceId: item["selectedUserAssignedIdentityResourceId"],
  };
}

/** Device Registry Namespace MI authentication type: UserAssigned, SystemAssigned. */
export enum KnownDeviceRegistryNamespaceAuthenticationType {
  /** User assigned authentication type. */
  UserAssigned = "UserAssigned",
  /** System assigned authentication type. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Device Registry Namespace MI authentication type: UserAssigned, SystemAssigned. \
 * {@link KnownDeviceRegistryNamespaceAuthenticationType} can be used interchangeably with DeviceRegistryNamespaceAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserAssigned**: User assigned authentication type. \
 * **SystemAssigned**: System assigned authentication type.
 */
export type DeviceRegistryNamespaceAuthenticationType = string;

/** Allocation policy to be used by this provisioning service. */
export enum KnownAllocationPolicy {
  /** Hashed */
  Hashed = "Hashed",
  /** GeoLatency */
  GeoLatency = "GeoLatency",
  /** Static */
  Static = "Static",
}

/**
 * Allocation policy to be used by this provisioning service. \
 * {@link KnownAllocationPolicy} can be used interchangeably with AllocationPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hashed** \
 * **GeoLatency** \
 * **Static**
 */
export type AllocationPolicy = string;

export function sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionArraySerializer(
  result: Array<SharedAccessSignatureAuthorizationRuleAccessRightsDescription>,
): any[] {
  return result.map((item) => {
    return sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionSerializer(item);
  });
}

export function sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionArrayDeserializer(
  result: Array<SharedAccessSignatureAuthorizationRuleAccessRightsDescription>,
): any[] {
  return result.map((item) => {
    return sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionDeserializer(item);
  });
}

/** Description of the shared access key. */
export interface SharedAccessSignatureAuthorizationRuleAccessRightsDescription {
  /** Name of the key. */
  keyName: string;
  /** Primary SAS key value. */
  primaryKey?: string;
  /** Secondary SAS key value. */
  secondaryKey?: string;
  /** Rights that this key has. */
  rights: AccessRightsDescription;
}

export function sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionSerializer(
  item: SharedAccessSignatureAuthorizationRuleAccessRightsDescription,
): any {
  return {
    keyName: item["keyName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    rights: item["rights"],
  };
}

export function sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionDeserializer(
  item: any,
): SharedAccessSignatureAuthorizationRuleAccessRightsDescription {
  return {
    keyName: item["keyName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    rights: item["rights"],
  };
}

/** Rights that this key has. */
export enum KnownAccessRightsDescription {
  /** ServiceConfig */
  ServiceConfig = "ServiceConfig",
  /** EnrollmentRead */
  EnrollmentRead = "EnrollmentRead",
  /** EnrollmentWrite */
  EnrollmentWrite = "EnrollmentWrite",
  /** DeviceConnect */
  DeviceConnect = "DeviceConnect",
  /** RegistrationStatusRead */
  RegistrationStatusRead = "RegistrationStatusRead",
  /** RegistrationStatusWrite */
  RegistrationStatusWrite = "RegistrationStatusWrite",
}

/**
 * Rights that this key has. \
 * {@link KnownAccessRightsDescription} can be used interchangeably with AccessRightsDescription,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceConfig** \
 * **EnrollmentRead** \
 * **EnrollmentWrite** \
 * **DeviceConnect** \
 * **RegistrationStatusRead** \
 * **RegistrationStatusWrite**
 */
export type AccessRightsDescription = string;

/** List of possible provisioning service SKUs. */
export interface IotDpsSkuInfo {
  /** Sku name. */
  name?: IotDpsSku;
  /** Pricing tier name of the provisioning service. */
  readonly tier?: string;
  /** The number of units to provision */
  capacity?: number;
}

export function iotDpsSkuInfoSerializer(item: IotDpsSkuInfo): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function iotDpsSkuInfoDeserializer(item: any): IotDpsSkuInfo {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** Sku name. */
export enum KnownIotDpsSku {
  /** S1 */
  S1 = "S1",
}

/**
 * Sku name. \
 * {@link KnownIotDpsSku} can be used interchangeably with IotDpsSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **S1**
 */
export type IotDpsSku = string;

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
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

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
    tags: item["tags"],
    location: item["location"],
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

/** A container holding only the Tags for a resource, allowing the user to update the tags on a Provisioning Service instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

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

/** The response of a ProvisioningServiceDescription list operation. */
export interface _ProvisioningServiceDescriptionListResult {
  /** The ProvisioningServiceDescription items on this page */
  value: ProvisioningServiceDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _provisioningServiceDescriptionListResultDeserializer(
  item: any,
): _ProvisioningServiceDescriptionListResult {
  return {
    value: provisioningServiceDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function provisioningServiceDescriptionArraySerializer(
  result: Array<ProvisioningServiceDescription>,
): any[] {
  return result.map((item) => {
    return provisioningServiceDescriptionSerializer(item);
  });
}

export function provisioningServiceDescriptionArrayDeserializer(
  result: Array<ProvisioningServiceDescription>,
): any[] {
  return result.map((item) => {
    return provisioningServiceDescriptionDeserializer(item);
  });
}

/** List of available SKUs. */
export interface _IotDpsSkuDefinitionListResult {
  /** The IotDpsSkuDefinition items on this page */
  value: IotDpsSkuDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotDpsSkuDefinitionListResultDeserializer(
  item: any,
): _IotDpsSkuDefinitionListResult {
  return {
    value: iotDpsSkuDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotDpsSkuDefinitionArrayDeserializer(result: Array<IotDpsSkuDefinition>): any[] {
  return result.map((item) => {
    return iotDpsSkuDefinitionDeserializer(item);
  });
}

/** Available SKUs of tier and units. */
export interface IotDpsSkuDefinition {
  /** Sku name. */
  name?: IotDpsSku;
}

export function iotDpsSkuDefinitionDeserializer(item: any): IotDpsSkuDefinition {
  return {
    name: item["name"],
  };
}

/** List of shared access keys. */
export interface _SharedAccessSignatureAuthorizationRuleListResult {
  /** The SharedAccessSignatureAuthorizationRuleAccessRightsDescription items on this page */
  value: SharedAccessSignatureAuthorizationRuleAccessRightsDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedAccessSignatureAuthorizationRuleListResultDeserializer(
  item: any,
): _SharedAccessSignatureAuthorizationRuleListResult {
  return {
    value: sharedAccessSignatureAuthorizationRuleAccessRightsDescriptionArrayDeserializer(
      item["value"],
    ),
    nextLink: item["nextLink"],
  };
}

/** The group information for creating a private endpoint on a provisioning service */
export interface GroupIdInformation extends ProxyResource {
  /** The properties for a group information object */
  properties: GroupIdInformationProperties;
}

export function groupIdInformationDeserializer(item: any): GroupIdInformation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: groupIdInformationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties for a group information object */
export interface GroupIdInformationProperties {
  /** The group id */
  groupId?: string;
  /** The required members for a specific group id */
  requiredMembers?: string[];
  /** The required DNS zones for a specific group id */
  requiredZoneNames?: string[];
}

export function groupIdInformationPropertiesDeserializer(item: any): GroupIdInformationProperties {
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

/** The available private link resources for a provisioning service */
export interface _PrivateLinkResources {
  /** The list of available private link resources for a provisioning service */
  value?: GroupIdInformation[];
}

export function _privateLinkResourcesDeserializer(item: any): _PrivateLinkResources {
  return {
    value: !item["value"] ? item["value"] : groupIdInformationArrayDeserializer(item["value"]),
  };
}

export function groupIdInformationArrayDeserializer(result: Array<GroupIdInformation>): any[] {
  return result.map((item) => {
    return groupIdInformationDeserializer(item);
  });
}

/** Input values for operation results call. */
export interface OperationInputs {
  /** The name of the Provisioning Service to check. */
  name: string;
}

export function operationInputsSerializer(item: OperationInputs): any {
  return { name: item["name"] };
}

/** Description of name availability. */
export interface NameAvailabilityInfo {
  /** specifies if a name is available or not */
  nameAvailable?: boolean;
  /** specifies the reason a name is unavailable */
  reason?: NameUnavailabilityReason;
  /** message containing a detailed reason name is unavailable */
  message?: string;
}

export function nameAvailabilityInfoDeserializer(item: any): NameAvailabilityInfo {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** specifies the reason a name is unavailable */
export enum KnownNameUnavailabilityReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * specifies the reason a name is unavailable \
 * {@link KnownNameUnavailabilityReason} can be used interchangeably with NameUnavailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type NameUnavailabilityReason = string;

/** Known values of {@link CertificatePurpose} that the service accepts. */
export enum KnownCertificatePurpose {
  /** clientAuthentication */
  ClientAuthentication = "clientAuthentication",
  /** serverAuthentication */
  ServerAuthentication = "serverAuthentication",
}

/** Type of CertificatePurpose */
export type CertificatePurpose = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-01-preview API version. */
  V20250201Preview = "2025-02-01-preview",
}

export function privateEndpointConnectionArraySerializer_1(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer_1(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}
