// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list IoT Hub operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of IoT Hub operations supported by the Microsoft.Devices resource provider. */
  readonly value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** IoT Hub REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{read | write | action | delete} */
  readonly name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft Devices */
  readonly provider?: string;
  /** Resource Type: IotHubs */
  readonly resource?: string;
  /** Name of the operation */
  readonly operation?: string;
  /** Description of the operation */
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

/** Error details. */
export interface ErrorDetails {
  /** The error code. */
  readonly code?: string;
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

/** The private endpoint connection of an IotHub */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The properties of a private endpoint connection */
  properties: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return { properties: privateEndpointConnectionPropertiesSerializer(item["properties"]) };
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

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
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
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PrivateLinkServiceConnectionStatus = string;

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

/** The description of the IoT hub. */
export interface IotHubDescription extends TrackedResource {
  /** IotHub properties */
  properties?: IotHubProperties;
  /** The Etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal ETag convention. */
  etag?: string;
  /** IotHub SKU info */
  sku: IotHubSkuInfo;
  /** The managed identities for the IotHub. */
  identity?: ArmIdentity;
}

export function iotHubDescriptionSerializer(item: IotHubDescription): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : iotHubPropertiesSerializer(item["properties"]),
    etag: item["etag"],
    sku: iotHubSkuInfoSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : armIdentitySerializer(item["identity"]),
  };
}

export function iotHubDescriptionDeserializer(item: any): IotHubDescription {
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
      : iotHubPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    sku: iotHubSkuInfoDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : armIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an IoT hub. */
export interface IotHubProperties {
  /** The shared access policies you can use to secure a connection to the IoT hub. */
  authorizationPolicies?: SharedAccessSignatureAuthorizationRule[];
  /** If true, SAS tokens with Iot hub scoped SAS keys cannot be used for authentication. */
  disableLocalAuth?: boolean;
  /** If true, all device(including Edge devices but excluding modules) scoped SAS keys cannot be used for authentication. */
  disableDeviceSAS?: boolean;
  /** If true, all module scoped SAS keys cannot be used for authentication. */
  disableModuleSAS?: boolean;
  /** If true, egress from IotHub will be restricted to only the allowed FQDNs that are configured via allowedFqdnList. */
  restrictOutboundNetworkAccess?: boolean;
  /** List of allowed FQDNs(Fully Qualified Domain Name) for egress from Iot Hub. */
  allowedFqdnList?: string[];
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The IP filter rules. */
  ipFilterRules?: IpFilterRule[];
  /** Network Rule Set Properties of IotHub */
  networkRuleSets?: NetworkRuleSetProperties;
  /** Specifies the minimum TLS version to support for this hub. Can be set to "1.2" to have clients that use a TLS version below 1.2 to be rejected. */
  minTlsVersion?: string;
  /** Private endpoint connections created on this IotHub */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** The provisioning state. */
  readonly provisioningState?: string;
  /** The hub state. */
  readonly state?: string;
  /** The name of the host. */
  readonly hostName?: string;
  /** The name of the device host. Supports secure connections over TLS 1.3. */
  readonly deviceHostName?: string;
  /** The name of the service host. Supports secure connections over TLS 1.3. */
  readonly serviceHostName?: string;
  /** The Event Hub-compatible endpoint properties. The only possible keys to this dictionary is events. This key has to be present in the dictionary while making create or update calls for the IoT hub. */
  eventHubEndpoints?: Record<string, EventHubProperties>;
  /** The routing related properties of the IoT hub. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging */
  routing?: RoutingProperties;
  /** The list of Azure Storage endpoints where you can upload files. Currently you can configure only one Azure Storage account and that MUST have its key as $default. Specifying more than one storage account causes an error to be thrown. Not specifying a value for this property when the enableFileUploadNotifications property is set to True, causes an error to be thrown. */
  storageEndpoints?: Record<string, StorageEndpointProperties>;
  /** The messaging endpoint properties for the file upload notification queue. */
  messagingEndpoints?: Record<string, MessagingEndpointProperties>;
  /** If True, file upload notifications are enabled. */
  enableFileUploadNotifications?: boolean;
  /** The IoT hub cloud-to-device messaging properties. */
  cloudToDevice?: CloudToDeviceProperties;
  /** IoT hub comments. */
  comments?: string;
  /** The device streams properties of iothub. */
  deviceStreams?: IotHubPropertiesDeviceStreams;
  /** The capabilities and features enabled for the IoT hub. */
  features?: Capabilities;
  /** The encryption properties for the IoT hub. */
  encryption?: EncryptionPropertiesDescription;
  /** Primary and secondary location for iot hub */
  readonly locations?: IotHubLocationDescription[];
  /** This property when set to true, will enable data residency, thus, disabling disaster recovery. */
  enableDataResidency?: boolean;
  /** This property store root certificate related information */
  rootCertificate?: RootCertificateProperties;
  /** This property specifies the IP Version the hub is currently utilizing. */
  ipVersion?: IpVersion;
  /** Represents properties related to the Azure Device Registry (ADR). */
  deviceRegistry?: DeviceRegistry;
  /** Set of additional read-only properties for the IoT hub. */
  readonly iotHubDetails?: IotHubDetails;
}

export function iotHubPropertiesSerializer(item: IotHubProperties): any {
  return {
    authorizationPolicies: !item["authorizationPolicies"]
      ? item["authorizationPolicies"]
      : sharedAccessSignatureAuthorizationRuleArraySerializer(item["authorizationPolicies"]),
    disableLocalAuth: item["disableLocalAuth"],
    disableDeviceSAS: item["disableDeviceSAS"],
    disableModuleSAS: item["disableModuleSAS"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    ipFilterRules: !item["ipFilterRules"]
      ? item["ipFilterRules"]
      : ipFilterRuleArraySerializer(item["ipFilterRules"]),
    networkRuleSets: !item["networkRuleSets"]
      ? item["networkRuleSets"]
      : networkRuleSetPropertiesSerializer(item["networkRuleSets"]),
    minTlsVersion: item["minTlsVersion"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    eventHubEndpoints: !item["eventHubEndpoints"]
      ? item["eventHubEndpoints"]
      : eventHubPropertiesRecordSerializer(item["eventHubEndpoints"]),
    routing: !item["routing"] ? item["routing"] : routingPropertiesSerializer(item["routing"]),
    storageEndpoints: !item["storageEndpoints"]
      ? item["storageEndpoints"]
      : storageEndpointPropertiesRecordSerializer(item["storageEndpoints"]),
    messagingEndpoints: !item["messagingEndpoints"]
      ? item["messagingEndpoints"]
      : messagingEndpointPropertiesRecordSerializer(item["messagingEndpoints"]),
    enableFileUploadNotifications: item["enableFileUploadNotifications"],
    cloudToDevice: !item["cloudToDevice"]
      ? item["cloudToDevice"]
      : cloudToDevicePropertiesSerializer(item["cloudToDevice"]),
    comments: item["comments"],
    deviceStreams: !item["deviceStreams"]
      ? item["deviceStreams"]
      : iotHubPropertiesDeviceStreamsSerializer(item["deviceStreams"]),
    features: item["features"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDescriptionSerializer(item["encryption"]),
    enableDataResidency: item["enableDataResidency"],
    rootCertificate: !item["rootCertificate"]
      ? item["rootCertificate"]
      : rootCertificatePropertiesSerializer(item["rootCertificate"]),
    ipVersion: item["ipVersion"],
    deviceRegistry: !item["deviceRegistry"]
      ? item["deviceRegistry"]
      : deviceRegistrySerializer(item["deviceRegistry"]),
  };
}

export function iotHubPropertiesDeserializer(item: any): IotHubProperties {
  return {
    authorizationPolicies: !item["authorizationPolicies"]
      ? item["authorizationPolicies"]
      : sharedAccessSignatureAuthorizationRuleArrayDeserializer(item["authorizationPolicies"]),
    disableLocalAuth: item["disableLocalAuth"],
    disableDeviceSAS: item["disableDeviceSAS"],
    disableModuleSAS: item["disableModuleSAS"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    ipFilterRules: !item["ipFilterRules"]
      ? item["ipFilterRules"]
      : ipFilterRuleArrayDeserializer(item["ipFilterRules"]),
    networkRuleSets: !item["networkRuleSets"]
      ? item["networkRuleSets"]
      : networkRuleSetPropertiesDeserializer(item["networkRuleSets"]),
    minTlsVersion: item["minTlsVersion"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    state: item["state"],
    hostName: item["hostName"],
    deviceHostName: item["deviceHostName"],
    serviceHostName: item["serviceHostName"],
    eventHubEndpoints: !item["eventHubEndpoints"]
      ? item["eventHubEndpoints"]
      : eventHubPropertiesRecordDeserializer(item["eventHubEndpoints"]),
    routing: !item["routing"] ? item["routing"] : routingPropertiesDeserializer(item["routing"]),
    storageEndpoints: !item["storageEndpoints"]
      ? item["storageEndpoints"]
      : storageEndpointPropertiesRecordDeserializer(item["storageEndpoints"]),
    messagingEndpoints: !item["messagingEndpoints"]
      ? item["messagingEndpoints"]
      : messagingEndpointPropertiesRecordDeserializer(item["messagingEndpoints"]),
    enableFileUploadNotifications: item["enableFileUploadNotifications"],
    cloudToDevice: !item["cloudToDevice"]
      ? item["cloudToDevice"]
      : cloudToDevicePropertiesDeserializer(item["cloudToDevice"]),
    comments: item["comments"],
    deviceStreams: !item["deviceStreams"]
      ? item["deviceStreams"]
      : iotHubPropertiesDeviceStreamsDeserializer(item["deviceStreams"]),
    features: item["features"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDescriptionDeserializer(item["encryption"]),
    locations: !item["locations"]
      ? item["locations"]
      : iotHubLocationDescriptionArrayDeserializer(item["locations"]),
    enableDataResidency: item["enableDataResidency"],
    rootCertificate: !item["rootCertificate"]
      ? item["rootCertificate"]
      : rootCertificatePropertiesDeserializer(item["rootCertificate"]),
    ipVersion: item["ipVersion"],
    deviceRegistry: !item["deviceRegistry"]
      ? item["deviceRegistry"]
      : deviceRegistryDeserializer(item["deviceRegistry"]),
    iotHubDetails: !item["iotHubDetails"]
      ? item["iotHubDetails"]
      : iotHubDetailsDeserializer(item["iotHubDetails"]),
  };
}

export function sharedAccessSignatureAuthorizationRuleArraySerializer(
  result: Array<SharedAccessSignatureAuthorizationRule>,
): any[] {
  return result.map((item) => {
    return sharedAccessSignatureAuthorizationRuleSerializer(item);
  });
}

export function sharedAccessSignatureAuthorizationRuleArrayDeserializer(
  result: Array<SharedAccessSignatureAuthorizationRule>,
): any[] {
  return result.map((item) => {
    return sharedAccessSignatureAuthorizationRuleDeserializer(item);
  });
}

/** The properties of an IoT hub shared access policy. */
export interface SharedAccessSignatureAuthorizationRule {
  /** The name of the shared access policy. */
  keyName: string;
  /** The primary key. */
  primaryKey?: string;
  /** The secondary key. */
  secondaryKey?: string;
  /** The permissions assigned to the shared access policy. */
  rights: AccessRights;
}

export function sharedAccessSignatureAuthorizationRuleSerializer(
  item: SharedAccessSignatureAuthorizationRule,
): any {
  return {
    keyName: item["keyName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    rights: item["rights"],
  };
}

export function sharedAccessSignatureAuthorizationRuleDeserializer(
  item: any,
): SharedAccessSignatureAuthorizationRule {
  return {
    keyName: item["keyName"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    rights: item["rights"],
  };
}

/** The permissions assigned to the shared access policy. */
export type AccessRights =
  | "RegistryRead"
  | "RegistryWrite"
  | "ServiceConnect"
  | "DeviceConnect"
  | "RegistryRead, RegistryWrite"
  | "RegistryRead, ServiceConnect"
  | "RegistryRead, DeviceConnect"
  | "RegistryWrite, ServiceConnect"
  | "RegistryWrite, DeviceConnect"
  | "ServiceConnect, DeviceConnect"
  | "RegistryRead, RegistryWrite, ServiceConnect"
  | "RegistryRead, RegistryWrite, DeviceConnect"
  | "RegistryRead, ServiceConnect, DeviceConnect"
  | "RegistryWrite, ServiceConnect, DeviceConnect"
  | "RegistryRead, RegistryWrite, ServiceConnect, DeviceConnect";

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
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
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

/** The IP filter rules for the IoT hub. */
export interface IpFilterRule {
  /** The name of the IP filter rule. */
  filterName: string;
  /** The desired action for requests captured by this rule. */
  action: IpFilterActionType;
  /** A string that contains the IP address range in CIDR notation for the rule. */
  ipMask: string;
}

export function ipFilterRuleSerializer(item: IpFilterRule): any {
  return { filterName: item["filterName"], action: item["action"], ipMask: item["ipMask"] };
}

export function ipFilterRuleDeserializer(item: any): IpFilterRule {
  return {
    filterName: item["filterName"],
    action: item["action"],
    ipMask: item["ipMask"],
  };
}

/** The desired action for requests captured by this rule. */
export type IpFilterActionType = "Accept" | "Reject";

/** Network Rule Set Properties of IotHub */
export interface NetworkRuleSetProperties {
  /** Default Action for Network Rule Set */
  defaultAction?: DefaultAction;
  /** If True, then Network Rule Set is also applied to BuiltIn EventHub EndPoint of IotHub */
  applyToBuiltInEventHubEndpoint: boolean;
  /** List of IP Rules */
  ipRules: NetworkRuleSetIpRule[];
}

export function networkRuleSetPropertiesSerializer(item: NetworkRuleSetProperties): any {
  return {
    defaultAction: item["defaultAction"],
    applyToBuiltInEventHubEndpoint: item["applyToBuiltInEventHubEndpoint"],
    ipRules: networkRuleSetIpRuleArraySerializer(item["ipRules"]),
  };
}

export function networkRuleSetPropertiesDeserializer(item: any): NetworkRuleSetProperties {
  return {
    defaultAction: item["defaultAction"],
    applyToBuiltInEventHubEndpoint: item["applyToBuiltInEventHubEndpoint"],
    ipRules: networkRuleSetIpRuleArrayDeserializer(item["ipRules"]),
  };
}

/** Default Action for Network Rule Set */
export enum KnownDefaultAction {
  /** Deny */
  Deny = "Deny",
  /** Allow */
  Allow = "Allow",
}

/**
 * Default Action for Network Rule Set \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deny**: Deny \
 * **Allow**: Allow
 */
export type DefaultAction = string;

export function networkRuleSetIpRuleArraySerializer(result: Array<NetworkRuleSetIpRule>): any[] {
  return result.map((item) => {
    return networkRuleSetIpRuleSerializer(item);
  });
}

export function networkRuleSetIpRuleArrayDeserializer(result: Array<NetworkRuleSetIpRule>): any[] {
  return result.map((item) => {
    return networkRuleSetIpRuleDeserializer(item);
  });
}

/** IP Rule to be applied as part of Network Rule Set */
export interface NetworkRuleSetIpRule {
  /** Name of the IP filter rule. */
  filterName: string;
  /** IP Filter Action */
  action?: NetworkRuleIPAction;
  /** A string that contains the IP address range in CIDR notation for the rule. */
  ipMask: string;
}

export function networkRuleSetIpRuleSerializer(item: NetworkRuleSetIpRule): any {
  return { filterName: item["filterName"], action: item["action"], ipMask: item["ipMask"] };
}

export function networkRuleSetIpRuleDeserializer(item: any): NetworkRuleSetIpRule {
  return {
    filterName: item["filterName"],
    action: item["action"],
    ipMask: item["ipMask"],
  };
}

/** IP Filter Action */
export enum KnownNetworkRuleIPAction {
  /** Allow */
  Allow = "Allow",
}

/**
 * IP Filter Action \
 * {@link KnownNetworkRuleIPAction} can be used interchangeably with NetworkRuleIPAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow
 */
export type NetworkRuleIPAction = string;

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

export function eventHubPropertiesRecordSerializer(
  item: Record<string, EventHubProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : eventHubPropertiesSerializer(item[key]);
  });
  return result;
}

export function eventHubPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, EventHubProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : eventHubPropertiesDeserializer(item[key]);
  });
  return result;
}

/** The properties of the provisioned Event Hub-compatible endpoint used by the IoT hub. */
export interface EventHubProperties {
  /** The retention time for device-to-cloud messages in days. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#device-to-cloud-messages */
  retentionTimeInDays?: number;
  /** The number of partitions for receiving device-to-cloud messages in the Event Hub-compatible endpoint. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#device-to-cloud-messages. */
  partitionCount?: number;
  /** The partition ids in the Event Hub-compatible endpoint. */
  readonly partitionIds?: string[];
  /** The Event Hub-compatible name. */
  readonly path?: string;
  /** The Event Hub-compatible endpoint. */
  readonly endpoint?: string;
}

export function eventHubPropertiesSerializer(item: EventHubProperties): any {
  return {
    retentionTimeInDays: item["retentionTimeInDays"],
    partitionCount: item["partitionCount"],
  };
}

export function eventHubPropertiesDeserializer(item: any): EventHubProperties {
  return {
    retentionTimeInDays: item["retentionTimeInDays"],
    partitionCount: item["partitionCount"],
    partitionIds: !item["partitionIds"]
      ? item["partitionIds"]
      : item["partitionIds"].map((p: any) => {
          return p;
        }),
    path: item["path"],
    endpoint: item["endpoint"],
  };
}

/** The routing related properties of the IoT hub. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging */
export interface RoutingProperties {
  /** The properties related to the custom endpoints to which your IoT hub routes messages based on the routing rules. A maximum of 10 custom endpoints are allowed across all endpoint types for paid hubs and only 1 custom endpoint is allowed across all endpoint types for free hubs. */
  endpoints?: RoutingEndpoints;
  /** The list of user-provided routing rules that the IoT hub uses to route messages to built-in and custom endpoints. A maximum of 100 routing rules are allowed for paid hubs and a maximum of 5 routing rules are allowed for free hubs. */
  routes?: RouteProperties[];
  /** The properties of the route that is used as a fall-back route when none of the conditions specified in the 'routes' section are met. This is an optional parameter. When this property is not set, the messages which do not meet any of the conditions specified in the 'routes' section get routed to the built-in eventhub endpoint. */
  fallbackRoute?: FallbackRouteProperties;
  /** The list of user-provided enrichments that the IoT hub applies to messages to be delivered to built-in and custom endpoints. See: https://aka.ms/telemetryoneventgrid */
  enrichments?: EnrichmentProperties[];
}

export function routingPropertiesSerializer(item: RoutingProperties): any {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : routingEndpointsSerializer(item["endpoints"]),
    routes: !item["routes"] ? item["routes"] : routePropertiesArraySerializer(item["routes"]),
    fallbackRoute: !item["fallbackRoute"]
      ? item["fallbackRoute"]
      : fallbackRoutePropertiesSerializer(item["fallbackRoute"]),
    enrichments: !item["enrichments"]
      ? item["enrichments"]
      : enrichmentPropertiesArraySerializer(item["enrichments"]),
  };
}

export function routingPropertiesDeserializer(item: any): RoutingProperties {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : routingEndpointsDeserializer(item["endpoints"]),
    routes: !item["routes"] ? item["routes"] : routePropertiesArrayDeserializer(item["routes"]),
    fallbackRoute: !item["fallbackRoute"]
      ? item["fallbackRoute"]
      : fallbackRoutePropertiesDeserializer(item["fallbackRoute"]),
    enrichments: !item["enrichments"]
      ? item["enrichments"]
      : enrichmentPropertiesArrayDeserializer(item["enrichments"]),
  };
}

/** The properties related to the custom endpoints to which your IoT hub routes messages based on the routing rules. A maximum of 10 custom endpoints are allowed across all endpoint types for paid hubs and only 1 custom endpoint is allowed across all endpoint types for free hubs. */
export interface RoutingEndpoints {
  /** The list of Service Bus queue endpoints that IoT hub routes the messages to, based on the routing rules. */
  serviceBusQueues?: RoutingServiceBusQueueEndpointProperties[];
  /** The list of Service Bus topic endpoints that the IoT hub routes the messages to, based on the routing rules. */
  serviceBusTopics?: RoutingServiceBusTopicEndpointProperties[];
  /** The list of Event Hubs endpoints that IoT hub routes messages to, based on the routing rules. This list does not include the built-in Event Hubs endpoint. */
  eventHubs?: RoutingEventHubProperties[];
  /** The list of storage container endpoints that IoT hub routes messages to, based on the routing rules. */
  storageContainers?: RoutingStorageContainerProperties[];
  /** The list of Cosmos DB container endpoints that IoT hub routes messages to, based on the routing rules. */
  cosmosDBSqlContainers?: RoutingCosmosDBSqlApiProperties[];
}

export function routingEndpointsSerializer(item: RoutingEndpoints): any {
  return {
    serviceBusQueues: !item["serviceBusQueues"]
      ? item["serviceBusQueues"]
      : routingServiceBusQueueEndpointPropertiesArraySerializer(item["serviceBusQueues"]),
    serviceBusTopics: !item["serviceBusTopics"]
      ? item["serviceBusTopics"]
      : routingServiceBusTopicEndpointPropertiesArraySerializer(item["serviceBusTopics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : routingEventHubPropertiesArraySerializer(item["eventHubs"]),
    storageContainers: !item["storageContainers"]
      ? item["storageContainers"]
      : routingStorageContainerPropertiesArraySerializer(item["storageContainers"]),
    cosmosDBSqlContainers: !item["cosmosDBSqlContainers"]
      ? item["cosmosDBSqlContainers"]
      : routingCosmosDBSqlApiPropertiesArraySerializer(item["cosmosDBSqlContainers"]),
  };
}

export function routingEndpointsDeserializer(item: any): RoutingEndpoints {
  return {
    serviceBusQueues: !item["serviceBusQueues"]
      ? item["serviceBusQueues"]
      : routingServiceBusQueueEndpointPropertiesArrayDeserializer(item["serviceBusQueues"]),
    serviceBusTopics: !item["serviceBusTopics"]
      ? item["serviceBusTopics"]
      : routingServiceBusTopicEndpointPropertiesArrayDeserializer(item["serviceBusTopics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : routingEventHubPropertiesArrayDeserializer(item["eventHubs"]),
    storageContainers: !item["storageContainers"]
      ? item["storageContainers"]
      : routingStorageContainerPropertiesArrayDeserializer(item["storageContainers"]),
    cosmosDBSqlContainers: !item["cosmosDBSqlContainers"]
      ? item["cosmosDBSqlContainers"]
      : routingCosmosDBSqlApiPropertiesArrayDeserializer(item["cosmosDBSqlContainers"]),
  };
}

export function routingServiceBusQueueEndpointPropertiesArraySerializer(
  result: Array<RoutingServiceBusQueueEndpointProperties>,
): any[] {
  return result.map((item) => {
    return routingServiceBusQueueEndpointPropertiesSerializer(item);
  });
}

export function routingServiceBusQueueEndpointPropertiesArrayDeserializer(
  result: Array<RoutingServiceBusQueueEndpointProperties>,
): any[] {
  return result.map((item) => {
    return routingServiceBusQueueEndpointPropertiesDeserializer(item);
  });
}

/** The properties related to service bus queue endpoint types. */
export interface RoutingServiceBusQueueEndpointProperties {
  /** Id of the service bus queue endpoint */
  id?: string;
  /** The connection string of the service bus queue endpoint. */
  connectionString?: string;
  /** The url of the service bus queue endpoint. It must include the protocol sb:// */
  endpointUri?: string;
  /** Queue name on the service bus namespace */
  entityPath?: string;
  /** Method used to authenticate against the service bus queue endpoint */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of routing service bus queue endpoint. */
  identity?: ManagedIdentity;
  /** The name that identifies this endpoint. The name can only include alphanumeric characters, periods, underscores, hyphens and has a maximum length of 64 characters. The following names are reserved:  events, fileNotifications, $default. Endpoint names must be unique across endpoint types. The name need not be the same as the actual queue name. */
  name: string;
  /** The subscription identifier of the service bus queue endpoint. */
  subscriptionId?: string;
  /** The name of the resource group of the service bus queue endpoint. */
  resourceGroup?: string;
}

export function routingServiceBusQueueEndpointPropertiesSerializer(
  item: RoutingServiceBusQueueEndpointProperties,
): any {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

export function routingServiceBusQueueEndpointPropertiesDeserializer(
  item: any,
): RoutingServiceBusQueueEndpointProperties {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Specifies authentication type being used for connecting to the storage account. */
export enum KnownAuthenticationType {
  /** keyBased */
  KeyBased = "keyBased",
  /** identityBased */
  IdentityBased = "identityBased",
}

/**
 * Specifies authentication type being used for connecting to the storage account. \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **keyBased**: keyBased \
 * **identityBased**: identityBased
 */
export type AuthenticationType = string;

/** The properties of the Managed identity. */
export interface ManagedIdentity {
  /** The user assigned identity. */
  userAssignedIdentity?: string;
}

export function managedIdentitySerializer(item: ManagedIdentity): any {
  return { userAssignedIdentity: item["userAssignedIdentity"] };
}

export function managedIdentityDeserializer(item: any): ManagedIdentity {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

export function routingServiceBusTopicEndpointPropertiesArraySerializer(
  result: Array<RoutingServiceBusTopicEndpointProperties>,
): any[] {
  return result.map((item) => {
    return routingServiceBusTopicEndpointPropertiesSerializer(item);
  });
}

export function routingServiceBusTopicEndpointPropertiesArrayDeserializer(
  result: Array<RoutingServiceBusTopicEndpointProperties>,
): any[] {
  return result.map((item) => {
    return routingServiceBusTopicEndpointPropertiesDeserializer(item);
  });
}

/** The properties related to service bus topic endpoint types. */
export interface RoutingServiceBusTopicEndpointProperties {
  /** Id of the service bus topic endpoint */
  id?: string;
  /** The connection string of the service bus topic endpoint. */
  connectionString?: string;
  /** The url of the service bus topic endpoint. It must include the protocol sb:// */
  endpointUri?: string;
  /** Queue name on the service bus topic */
  entityPath?: string;
  /** Method used to authenticate against the service bus topic endpoint */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of routing service bus topic endpoint. */
  identity?: ManagedIdentity;
  /** The name that identifies this endpoint. The name can only include alphanumeric characters, periods, underscores, hyphens and has a maximum length of 64 characters. The following names are reserved:  events, fileNotifications, $default. Endpoint names must be unique across endpoint types.  The name need not be the same as the actual topic name. */
  name: string;
  /** The subscription identifier of the service bus topic endpoint. */
  subscriptionId?: string;
  /** The name of the resource group of the service bus topic endpoint. */
  resourceGroup?: string;
}

export function routingServiceBusTopicEndpointPropertiesSerializer(
  item: RoutingServiceBusTopicEndpointProperties,
): any {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

export function routingServiceBusTopicEndpointPropertiesDeserializer(
  item: any,
): RoutingServiceBusTopicEndpointProperties {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

export function routingEventHubPropertiesArraySerializer(
  result: Array<RoutingEventHubProperties>,
): any[] {
  return result.map((item) => {
    return routingEventHubPropertiesSerializer(item);
  });
}

export function routingEventHubPropertiesArrayDeserializer(
  result: Array<RoutingEventHubProperties>,
): any[] {
  return result.map((item) => {
    return routingEventHubPropertiesDeserializer(item);
  });
}

/** The properties related to an event hub endpoint. */
export interface RoutingEventHubProperties {
  /** Id of the event hub endpoint */
  id?: string;
  /** The connection string of the event hub endpoint. */
  connectionString?: string;
  /** The url of the event hub endpoint. It must include the protocol sb:// */
  endpointUri?: string;
  /** Event hub name on the event hub namespace */
  entityPath?: string;
  /** Method used to authenticate against the event hub endpoint */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of routing event hub endpoint. */
  identity?: ManagedIdentity;
  /** The name that identifies this endpoint. The name can only include alphanumeric characters, periods, underscores, hyphens and has a maximum length of 64 characters. The following names are reserved:  events, fileNotifications, $default. Endpoint names must be unique across endpoint types. */
  name: string;
  /** The subscription identifier of the event hub endpoint. */
  subscriptionId?: string;
  /** The name of the resource group of the event hub endpoint. */
  resourceGroup?: string;
}

export function routingEventHubPropertiesSerializer(item: RoutingEventHubProperties): any {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

export function routingEventHubPropertiesDeserializer(item: any): RoutingEventHubProperties {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    entityPath: item["entityPath"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

export function routingStorageContainerPropertiesArraySerializer(
  result: Array<RoutingStorageContainerProperties>,
): any[] {
  return result.map((item) => {
    return routingStorageContainerPropertiesSerializer(item);
  });
}

export function routingStorageContainerPropertiesArrayDeserializer(
  result: Array<RoutingStorageContainerProperties>,
): any[] {
  return result.map((item) => {
    return routingStorageContainerPropertiesDeserializer(item);
  });
}

/** The properties related to a storage container endpoint. */
export interface RoutingStorageContainerProperties {
  /** Id of the storage container endpoint */
  id?: string;
  /** The connection string of the storage account. */
  connectionString?: string;
  /** The url of the storage endpoint. It must include the protocol https:// */
  endpointUri?: string;
  /** Method used to authenticate against the storage endpoint */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of routing storage endpoint. */
  identity?: ManagedIdentity;
  /** The name that identifies this endpoint. The name can only include alphanumeric characters, periods, underscores, hyphens and has a maximum length of 64 characters. The following names are reserved:  events, fileNotifications, $default. Endpoint names must be unique across endpoint types. */
  name: string;
  /** The subscription identifier of the storage account. */
  subscriptionId?: string;
  /** The name of the resource group of the storage account. */
  resourceGroup?: string;
  /** The name of storage container in the storage account. */
  containerName: string;
  /** File name format for the blob. Default format is {iothub}/{partition}/{YYYY}/{MM}/{DD}/{HH}/{mm}. All parameters are mandatory but can be reordered. */
  fileNameFormat?: string;
  /** Time interval at which blobs are written to storage. Value should be between 60 and 720 seconds. Default value is 300 seconds. */
  batchFrequencyInSeconds?: number;
  /** Maximum number of bytes for each blob written to storage. Value should be between 10485760(10MB) and 524288000(500MB). Default value is 314572800(300MB). */
  maxChunkSizeInBytes?: number;
  /** Encoding that is used to serialize messages to blobs. Supported values are 'avro', 'avrodeflate', and 'JSON'. Default value is 'avro'. */
  encoding?: RoutingStorageContainerPropertiesEncoding;
}

export function routingStorageContainerPropertiesSerializer(
  item: RoutingStorageContainerProperties,
): any {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    containerName: item["containerName"],
    fileNameFormat: item["fileNameFormat"],
    batchFrequencyInSeconds: item["batchFrequencyInSeconds"],
    maxChunkSizeInBytes: item["maxChunkSizeInBytes"],
    encoding: item["encoding"],
  };
}

export function routingStorageContainerPropertiesDeserializer(
  item: any,
): RoutingStorageContainerProperties {
  return {
    id: item["id"],
    connectionString: item["connectionString"],
    endpointUri: item["endpointUri"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    containerName: item["containerName"],
    fileNameFormat: item["fileNameFormat"],
    batchFrequencyInSeconds: item["batchFrequencyInSeconds"],
    maxChunkSizeInBytes: item["maxChunkSizeInBytes"],
    encoding: item["encoding"],
  };
}

/** Encoding that is used to serialize messages to blobs. Supported values are 'avro', 'avrodeflate', and 'JSON'. Default value is 'avro'. */
export enum KnownRoutingStorageContainerPropertiesEncoding {
  /** Avro */
  Avro = "Avro",
  /** AvroDeflate */
  AvroDeflate = "AvroDeflate",
  /** JSON */
  Json = "JSON",
}

/**
 * Encoding that is used to serialize messages to blobs. Supported values are 'avro', 'avrodeflate', and 'JSON'. Default value is 'avro'. \
 * {@link KnownRoutingStorageContainerPropertiesEncoding} can be used interchangeably with RoutingStorageContainerPropertiesEncoding,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Avro**: Avro \
 * **AvroDeflate**: AvroDeflate \
 * **JSON**: JSON
 */
export type RoutingStorageContainerPropertiesEncoding = string;

export function routingCosmosDBSqlApiPropertiesArraySerializer(
  result: Array<RoutingCosmosDBSqlApiProperties>,
): any[] {
  return result.map((item) => {
    return routingCosmosDBSqlApiPropertiesSerializer(item);
  });
}

export function routingCosmosDBSqlApiPropertiesArrayDeserializer(
  result: Array<RoutingCosmosDBSqlApiProperties>,
): any[] {
  return result.map((item) => {
    return routingCosmosDBSqlApiPropertiesDeserializer(item);
  });
}

/** The properties related to a cosmos DB sql container endpoint. */
export interface RoutingCosmosDBSqlApiProperties {
  /** The name that identifies this endpoint. The name can only include alphanumeric characters, periods, underscores, hyphens and has a maximum length of 64 characters. The following names are reserved:  events, fileNotifications, $default. Endpoint names must be unique across endpoint types. */
  name: string;
  /** Id of the cosmos DB sql container endpoint */
  readonly id?: string;
  /** The subscription identifier of the cosmos DB account. */
  subscriptionId?: string;
  /** The name of the resource group of the cosmos DB account. */
  resourceGroup?: string;
  /** The url of the cosmos DB account. It must include the protocol https:// */
  endpointUri: string;
  /** Method used to authenticate against the cosmos DB sql container endpoint */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of routing cosmos DB container endpoint. */
  identity?: ManagedIdentity;
  /** The primary key of the cosmos DB account. */
  primaryKey?: string;
  /** The secondary key of the cosmos DB account. */
  secondaryKey?: string;
  /** The name of the cosmos DB database in the cosmos DB account. */
  databaseName: string;
  /** The name of the cosmos DB sql container in the cosmos DB database. */
  containerName: string;
  /** The name of the partition key associated with this cosmos DB sql container if one exists. This is an optional parameter. */
  partitionKeyName?: string;
  /** The template for generating a synthetic partition key value for use with this cosmos DB sql container. The template must include at least one of the following placeholders: {iothub}, {deviceid}, {DD}, {MM}, and {YYYY}. Any one placeholder may be specified at most once, but order and non-placeholder components are arbitrary. This parameter is only required if PartitionKeyName is specified. */
  partitionKeyTemplate?: string;
}

export function routingCosmosDBSqlApiPropertiesSerializer(
  item: RoutingCosmosDBSqlApiProperties,
): any {
  return {
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    endpointUri: item["endpointUri"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    partitionKeyName: item["partitionKeyName"],
    partitionKeyTemplate: item["partitionKeyTemplate"],
  };
}

export function routingCosmosDBSqlApiPropertiesDeserializer(
  item: any,
): RoutingCosmosDBSqlApiProperties {
  return {
    name: item["name"],
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    endpointUri: item["endpointUri"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    databaseName: item["databaseName"],
    containerName: item["containerName"],
    partitionKeyName: item["partitionKeyName"],
    partitionKeyTemplate: item["partitionKeyTemplate"],
  };
}

export function routePropertiesArraySerializer(result: Array<RouteProperties>): any[] {
  return result.map((item) => {
    return routePropertiesSerializer(item);
  });
}

export function routePropertiesArrayDeserializer(result: Array<RouteProperties>): any[] {
  return result.map((item) => {
    return routePropertiesDeserializer(item);
  });
}

/** The properties of a routing rule that your IoT hub uses to route messages to endpoints. */
export interface RouteProperties {
  /** The name of the route. The name can only include alphanumeric characters, periods, underscores, hyphens, has a maximum length of 64 characters, and must be unique. */
  name: string;
  /** The source that the routing rule is to be applied to, such as DeviceMessages. */
  source: RoutingSource;
  /** The condition that is evaluated to apply the routing rule. If no condition is provided, it evaluates to true by default. For grammar, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language */
  condition?: string;
  /** The list of endpoints to which messages that satisfy the condition are routed. Currently only one endpoint is allowed. */
  endpointNames: string[];
  /** Used to specify whether a route is enabled. */
  isEnabled: boolean;
}

export function routePropertiesSerializer(item: RouteProperties): any {
  return {
    name: item["name"],
    source: item["source"],
    condition: item["condition"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
    isEnabled: item["isEnabled"],
  };
}

export function routePropertiesDeserializer(item: any): RouteProperties {
  return {
    name: item["name"],
    source: item["source"],
    condition: item["condition"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
    isEnabled: item["isEnabled"],
  };
}

/** The source that the routing rule is to be applied to, such as DeviceMessages. */
export enum KnownRoutingSource {
  /** Invalid */
  Invalid = "Invalid",
  /** DeviceMessages */
  DeviceMessages = "DeviceMessages",
  /** TwinChangeEvents */
  TwinChangeEvents = "TwinChangeEvents",
  /** DeviceLifecycleEvents */
  DeviceLifecycleEvents = "DeviceLifecycleEvents",
  /** DeviceJobLifecycleEvents */
  DeviceJobLifecycleEvents = "DeviceJobLifecycleEvents",
  /** DigitalTwinChangeEvents */
  DigitalTwinChangeEvents = "DigitalTwinChangeEvents",
  /** DeviceConnectionStateEvents */
  DeviceConnectionStateEvents = "DeviceConnectionStateEvents",
  /** MqttBrokerMessages */
  MqttBrokerMessages = "MqttBrokerMessages",
}

/**
 * The source that the routing rule is to be applied to, such as DeviceMessages. \
 * {@link KnownRoutingSource} can be used interchangeably with RoutingSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Invalid \
 * **DeviceMessages**: DeviceMessages \
 * **TwinChangeEvents**: TwinChangeEvents \
 * **DeviceLifecycleEvents**: DeviceLifecycleEvents \
 * **DeviceJobLifecycleEvents**: DeviceJobLifecycleEvents \
 * **DigitalTwinChangeEvents**: DigitalTwinChangeEvents \
 * **DeviceConnectionStateEvents**: DeviceConnectionStateEvents \
 * **MqttBrokerMessages**: MqttBrokerMessages
 */
export type RoutingSource = string;

/** The properties of the fallback route. IoT Hub uses these properties when it routes messages to the fallback endpoint. */
export interface FallbackRouteProperties {
  /** The name of the route. The name can only include alphanumeric characters, periods, underscores, hyphens, has a maximum length of 64 characters, and must be unique. */
  name?: string;
  /** The source to which the routing rule is to be applied to. For example, DeviceMessages */
  source: RoutingSource;
  /** The condition which is evaluated in order to apply the fallback route. If the condition is not provided it will evaluate to true by default. For grammar, See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language */
  condition?: string;
  /** The list of endpoints to which the messages that satisfy the condition are routed to. Currently only 1 endpoint is allowed. */
  endpointNames: string[];
  /** Used to specify whether the fallback route is enabled. */
  isEnabled: boolean;
}

export function fallbackRoutePropertiesSerializer(item: FallbackRouteProperties): any {
  return {
    name: item["name"],
    source: item["source"],
    condition: item["condition"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
    isEnabled: item["isEnabled"],
  };
}

export function fallbackRoutePropertiesDeserializer(item: any): FallbackRouteProperties {
  return {
    name: item["name"],
    source: item["source"],
    condition: item["condition"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
    isEnabled: item["isEnabled"],
  };
}

export function enrichmentPropertiesArraySerializer(result: Array<EnrichmentProperties>): any[] {
  return result.map((item) => {
    return enrichmentPropertiesSerializer(item);
  });
}

export function enrichmentPropertiesArrayDeserializer(result: Array<EnrichmentProperties>): any[] {
  return result.map((item) => {
    return enrichmentPropertiesDeserializer(item);
  });
}

/** The properties of an enrichment that your IoT hub applies to messages delivered to endpoints. */
export interface EnrichmentProperties {
  /** The key or name for the enrichment property. */
  key: string;
  /** The value for the enrichment property. */
  value: string;
  /** The list of endpoints for which the enrichment is applied to the message. */
  endpointNames: string[];
}

export function enrichmentPropertiesSerializer(item: EnrichmentProperties): any {
  return {
    key: item["key"],
    value: item["value"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
  };
}

export function enrichmentPropertiesDeserializer(item: any): EnrichmentProperties {
  return {
    key: item["key"],
    value: item["value"],
    endpointNames: item["endpointNames"].map((p: any) => {
      return p;
    }),
  };
}

export function storageEndpointPropertiesRecordSerializer(
  item: Record<string, StorageEndpointProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : storageEndpointPropertiesSerializer(item[key]);
  });
  return result;
}

export function storageEndpointPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, StorageEndpointProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : storageEndpointPropertiesDeserializer(item[key]);
  });
  return result;
}

/** The properties of the Azure Storage endpoint for file upload. */
export interface StorageEndpointProperties {
  /** The period of time for which the SAS URI generated by IoT Hub for file upload is valid. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-file-upload#file-upload-notification-configuration-options. */
  sasTtlAsIso8601?: string;
  /** The connection string for the Azure Storage account to which files are uploaded. */
  connectionString: string;
  /** The name of the root container where you upload files. The container need not exist but should be creatable using the connectionString specified. */
  containerName: string;
  /** Specifies authentication type being used for connecting to the storage account. */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of storage endpoint for file upload. */
  identity?: ManagedIdentity;
}

export function storageEndpointPropertiesSerializer(item: StorageEndpointProperties): any {
  return {
    sasTtlAsIso8601: item["sasTtlAsIso8601"],
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
  };
}

export function storageEndpointPropertiesDeserializer(item: any): StorageEndpointProperties {
  return {
    sasTtlAsIso8601: item["sasTtlAsIso8601"],
    connectionString: item["connectionString"],
    containerName: item["containerName"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
  };
}

export function messagingEndpointPropertiesRecordSerializer(
  item: Record<string, MessagingEndpointProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : messagingEndpointPropertiesSerializer(item[key]);
  });
  return result;
}

export function messagingEndpointPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, MessagingEndpointProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : messagingEndpointPropertiesDeserializer(item[key]);
  });
  return result;
}

/** The properties of the messaging endpoints used by this IoT hub. */
export interface MessagingEndpointProperties {
  /** The lock duration. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-file-upload. */
  lockDurationAsIso8601?: string;
  /** The period of time for which a message is available to consume before it is expired by the IoT hub. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-file-upload. */
  ttlAsIso8601?: string;
  /** The number of times the IoT hub attempts to deliver a message. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-file-upload. */
  maxDeliveryCount?: number;
}

export function messagingEndpointPropertiesSerializer(item: MessagingEndpointProperties): any {
  return {
    lockDurationAsIso8601: item["lockDurationAsIso8601"],
    ttlAsIso8601: item["ttlAsIso8601"],
    maxDeliveryCount: item["maxDeliveryCount"],
  };
}

export function messagingEndpointPropertiesDeserializer(item: any): MessagingEndpointProperties {
  return {
    lockDurationAsIso8601: item["lockDurationAsIso8601"],
    ttlAsIso8601: item["ttlAsIso8601"],
    maxDeliveryCount: item["maxDeliveryCount"],
  };
}

/** The IoT hub cloud-to-device messaging properties. */
export interface CloudToDeviceProperties {
  /** The max delivery count for cloud-to-device messages in the device queue. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#cloud-to-device-messages. */
  maxDeliveryCount?: number;
  /** The default time to live for cloud-to-device messages in the device queue. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#cloud-to-device-messages. */
  defaultTtlAsIso8601?: string;
  /** The properties of the feedback queue for cloud-to-device messages. */
  feedback?: FeedbackProperties;
}

export function cloudToDevicePropertiesSerializer(item: CloudToDeviceProperties): any {
  return {
    maxDeliveryCount: item["maxDeliveryCount"],
    defaultTtlAsIso8601: item["defaultTtlAsIso8601"],
    feedback: !item["feedback"] ? item["feedback"] : feedbackPropertiesSerializer(item["feedback"]),
  };
}

export function cloudToDevicePropertiesDeserializer(item: any): CloudToDeviceProperties {
  return {
    maxDeliveryCount: item["maxDeliveryCount"],
    defaultTtlAsIso8601: item["defaultTtlAsIso8601"],
    feedback: !item["feedback"]
      ? item["feedback"]
      : feedbackPropertiesDeserializer(item["feedback"]),
  };
}

/** The properties of the feedback queue for cloud-to-device messages. */
export interface FeedbackProperties {
  /** The lock duration for the feedback queue. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#cloud-to-device-messages. */
  lockDurationAsIso8601?: string;
  /** The period of time for which a message is available to consume before it is expired by the IoT hub. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#cloud-to-device-messages. */
  ttlAsIso8601?: string;
  /** The number of times the IoT hub attempts to deliver a message on the feedback queue. See: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messaging#cloud-to-device-messages. */
  maxDeliveryCount?: number;
}

export function feedbackPropertiesSerializer(item: FeedbackProperties): any {
  return {
    lockDurationAsIso8601: item["lockDurationAsIso8601"],
    ttlAsIso8601: item["ttlAsIso8601"],
    maxDeliveryCount: item["maxDeliveryCount"],
  };
}

export function feedbackPropertiesDeserializer(item: any): FeedbackProperties {
  return {
    lockDurationAsIso8601: item["lockDurationAsIso8601"],
    ttlAsIso8601: item["ttlAsIso8601"],
    maxDeliveryCount: item["maxDeliveryCount"],
  };
}

/** The device streams properties of iothub. */
export interface IotHubPropertiesDeviceStreams {
  /** List of Device Streams Endpoints. */
  streamingEndpoints?: string[];
}

export function iotHubPropertiesDeviceStreamsSerializer(item: IotHubPropertiesDeviceStreams): any {
  return {
    streamingEndpoints: !item["streamingEndpoints"]
      ? item["streamingEndpoints"]
      : item["streamingEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

export function iotHubPropertiesDeviceStreamsDeserializer(
  item: any,
): IotHubPropertiesDeviceStreams {
  return {
    streamingEndpoints: !item["streamingEndpoints"]
      ? item["streamingEndpoints"]
      : item["streamingEndpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** The capabilities and features enabled for the IoT hub. */
export enum KnownCapabilities {
  /** None */
  None = "None",
  /** DeviceManagement */
  DeviceManagement = "DeviceManagement",
}

/**
 * The capabilities and features enabled for the IoT hub. \
 * {@link KnownCapabilities} can be used interchangeably with Capabilities,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **DeviceManagement**: DeviceManagement
 */
export type Capabilities = string;

/** The encryption properties for the IoT hub. */
export interface EncryptionPropertiesDescription {
  /** The source of the key. */
  keySource?: string;
  /** The properties of the KeyVault key. */
  keyVaultProperties?: KeyVaultKeyProperties[];
}

export function encryptionPropertiesDescriptionSerializer(
  item: EncryptionPropertiesDescription,
): any {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultKeyPropertiesArraySerializer(item["keyVaultProperties"]),
  };
}

export function encryptionPropertiesDescriptionDeserializer(
  item: any,
): EncryptionPropertiesDescription {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultKeyPropertiesArrayDeserializer(item["keyVaultProperties"]),
  };
}

export function keyVaultKeyPropertiesArraySerializer(result: Array<KeyVaultKeyProperties>): any[] {
  return result.map((item) => {
    return keyVaultKeyPropertiesSerializer(item);
  });
}

export function keyVaultKeyPropertiesArrayDeserializer(
  result: Array<KeyVaultKeyProperties>,
): any[] {
  return result.map((item) => {
    return keyVaultKeyPropertiesDeserializer(item);
  });
}

/** The properties of the KeyVault key. */
export interface KeyVaultKeyProperties {
  /** The identifier of the key. */
  keyIdentifier?: string;
  /** Managed identity properties of KeyVault Key. */
  identity?: ManagedIdentity;
}

export function keyVaultKeyPropertiesSerializer(item: KeyVaultKeyProperties): any {
  return {
    keyIdentifier: item["keyIdentifier"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
  };
}

export function keyVaultKeyPropertiesDeserializer(item: any): KeyVaultKeyProperties {
  return {
    keyIdentifier: item["keyIdentifier"],
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
  };
}

export function iotHubLocationDescriptionArrayDeserializer(
  result: Array<IotHubLocationDescription>,
): any[] {
  return result.map((item) => {
    return iotHubLocationDescriptionDeserializer(item);
  });
}

/** Public representation of one of the locations where a resource is provisioned. */
export interface IotHubLocationDescription {
  /** The name of the Azure region */
  location?: string;
  /** The role of the region, can be either primary or secondary. The primary region is where the IoT hub is currently provisioned. The secondary region is the Azure disaster recovery (DR) paired region and also the region where the IoT hub can failover to. */
  role?: IotHubReplicaRoleType;
}

export function iotHubLocationDescriptionDeserializer(item: any): IotHubLocationDescription {
  return {
    location: item["location"],
    role: item["role"],
  };
}

/** The role of the region, can be either primary or secondary. The primary region is where the IoT hub is currently provisioned. The secondary region is the Azure disaster recovery (DR) paired region and also the region where the IoT hub can failover to. */
export enum KnownIotHubReplicaRoleType {
  /** primary */
  Primary = "primary",
  /** secondary */
  Secondary = "secondary",
}

/**
 * The role of the region, can be either primary or secondary. The primary region is where the IoT hub is currently provisioned. The secondary region is the Azure disaster recovery (DR) paired region and also the region where the IoT hub can failover to. \
 * {@link KnownIotHubReplicaRoleType} can be used interchangeably with IotHubReplicaRoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primary**: primary \
 * **secondary**: secondary
 */
export type IotHubReplicaRoleType = string;

/** This property store root certificate related information */
export interface RootCertificateProperties {
  /** This property when set to true, hub will use G2 cert; while it's set to false, hub uses Baltimore Cert. */
  enableRootCertificateV2?: boolean;
  /** the last update time to root certificate flag. */
  readonly lastUpdatedTimeUtc?: Date;
}

export function rootCertificatePropertiesSerializer(item: RootCertificateProperties): any {
  return { enableRootCertificateV2: item["enableRootCertificateV2"] };
}

export function rootCertificatePropertiesDeserializer(item: any): RootCertificateProperties {
  return {
    enableRootCertificateV2: item["enableRootCertificateV2"],
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
  };
}

/** This property specifies the IP Version the hub is currently utilizing. */
export enum KnownIpVersion {
  /** ipv4 */
  Ipv4 = "ipv4",
  /** ipv6 */
  Ipv6 = "ipv6",
  /** ipv4ipv6 */
  Ipv4Ipv6 = "ipv4ipv6",
}

/**
 * This property specifies the IP Version the hub is currently utilizing. \
 * {@link KnownIpVersion} can be used interchangeably with IpVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ipv4**: ipv4 \
 * **ipv6**: ipv6 \
 * **ipv4ipv6**: ipv4ipv6
 */
export type IpVersion = string;

/** Represents properties related to the Azure Device Registry (ADR). */
export interface DeviceRegistry {
  /** The identifier of the Azure Device Registry namespace associated with the GEN2 SKU hub. */
  namespaceResourceId?: string;
  /** The identity used to manage the ADR namespace from the data plane. */
  identityResourceId?: string;
}

export function deviceRegistrySerializer(item: DeviceRegistry): any {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    identityResourceId: item["identityResourceId"],
  };
}

export function deviceRegistryDeserializer(item: any): DeviceRegistry {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    identityResourceId: item["identityResourceId"],
  };
}

/** Set of additional read-only properties for the IoT hub. */
export interface IotHubDetails {
  /** The IoT hub Gateway version. */
  gatewayVersion?: GatewayVersion;
}

export function iotHubDetailsDeserializer(item: any): IotHubDetails {
  return {
    gatewayVersion: item["gatewayVersion"],
  };
}

/** The IoT hub Gateway version. */
export enum KnownGatewayVersion {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The IoT hub Gateway version. \
 * {@link KnownGatewayVersion} can be used interchangeably with GatewayVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1**: V1 \
 * **V2**: V2
 */
export type GatewayVersion = string;

/** Information about the SKU of the IoT hub. */
export interface IotHubSkuInfo {
  /** The name of the SKU. */
  name: IotHubSku;
  /** The billing tier for the IoT hub. */
  readonly tier?: IotHubSkuTier;
  /** The number of provisioned IoT Hub units. See: https://docs.microsoft.com/azure/azure-subscription-service-limits#iot-hub-limits. */
  capacity?: number;
}

export function iotHubSkuInfoSerializer(item: IotHubSkuInfo): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function iotHubSkuInfoDeserializer(item: any): IotHubSkuInfo {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** The name of the SKU. */
export enum KnownIotHubSku {
  /** F1 */
  F1 = "F1",
  /** S1 */
  S1 = "S1",
  /** S2 */
  S2 = "S2",
  /** S3 */
  S3 = "S3",
  /** B1 */
  B1 = "B1",
  /** B2 */
  B2 = "B2",
  /** B3 */
  B3 = "B3",
  /** GEN2 */
  GEN2 = "GEN2",
}

/**
 * The name of the SKU. \
 * {@link KnownIotHubSku} can be used interchangeably with IotHubSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **F1**: F1 \
 * **S1**: S1 \
 * **S2**: S2 \
 * **S3**: S3 \
 * **B1**: B1 \
 * **B2**: B2 \
 * **B3**: B3 \
 * **GEN2**: GEN2
 */
export type IotHubSku = string;
/** The billing tier for the IoT hub. */
export type IotHubSkuTier = "Free" | "Standard" | "Basic" | "Generation2";

/** model interface ArmIdentity */
export interface ArmIdentity {
  /** Principal Id */
  readonly principalId?: string;
  /** Tenant Id */
  readonly tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
  type?: ResourceIdentityType;
  /** Dictionary of <ArmUserIdentity> */
  userAssignedIdentities?: Record<string, ArmUserIdentity>;
}

export function armIdentitySerializer(item: ArmIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : armUserIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function armIdentityDeserializer(item: any): ArmIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : armUserIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function armUserIdentityRecordSerializer(
  item: Record<string, ArmUserIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : armUserIdentitySerializer(item[key]);
  });
  return result;
}

export function armUserIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, ArmUserIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : armUserIdentityDeserializer(item[key]);
  });
  return result;
}

/** model interface ArmUserIdentity */
export interface ArmUserIdentity {
  readonly principalId?: string;
  readonly clientId?: string;
}

export function armUserIdentitySerializer(_item: ArmUserIdentity): any {
  return {};
}

export function armUserIdentityDeserializer(item: any): ArmUserIdentity {
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

/** A container holding only the Tags for a resource, allowing the user to update the tags on an IoT Hub instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** The response of a IotHubDescription list operation. */
export interface _IotHubDescriptionListResult {
  /** The IotHubDescription items on this page */
  value: IotHubDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotHubDescriptionListResultDeserializer(item: any): _IotHubDescriptionListResult {
  return {
    value: iotHubDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotHubDescriptionArraySerializer(result: Array<IotHubDescription>): any[] {
  return result.map((item) => {
    return iotHubDescriptionSerializer(item);
  });
}

export function iotHubDescriptionArrayDeserializer(result: Array<IotHubDescription>): any[] {
  return result.map((item) => {
    return iotHubDescriptionDeserializer(item);
  });
}

/** The JSON-serialized array of IotHubSkuDescription objects with a next link. */
export interface _IotHubSkuDescriptionListResult {
  /** The IotHubSkuDescription items on this page */
  value: IotHubSkuDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotHubSkuDescriptionListResultDeserializer(
  item: any,
): _IotHubSkuDescriptionListResult {
  return {
    value: iotHubSkuDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotHubSkuDescriptionArrayDeserializer(result: Array<IotHubSkuDescription>): any[] {
  return result.map((item) => {
    return iotHubSkuDescriptionDeserializer(item);
  });
}

/** SKU properties. */
export interface IotHubSkuDescription {
  /** The type of the resource. */
  readonly resourceType?: string;
  /** The type of the resource. */
  sku: IotHubSkuInfo;
  /** IotHub capacity */
  capacity: IotHubCapacity;
}

export function iotHubSkuDescriptionDeserializer(item: any): IotHubSkuDescription {
  return {
    resourceType: item["resourceType"],
    sku: iotHubSkuInfoDeserializer(item["sku"]),
    capacity: iotHubCapacityDeserializer(item["capacity"]),
  };
}

/** IoT Hub capacity information. */
export interface IotHubCapacity {
  /** The minimum number of units. */
  readonly minimum?: number;
  /** The maximum number of units. */
  readonly maximum?: number;
  /** The default number of units. */
  readonly default?: number;
  /** The type of the scaling enabled. */
  readonly scaleType?: IotHubScaleType;
}

export function iotHubCapacityDeserializer(item: any): IotHubCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The type of the scaling enabled. */
export type IotHubScaleType = "Automatic" | "Manual" | "None";

/** The JSON-serialized array of JobResponse objects with a next link. */
export interface _JobResponseListResult {
  /** The JobResponse items on this page */
  value: JobResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobResponseListResultDeserializer(item: any): _JobResponseListResult {
  return {
    value: jobResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobResponseArrayDeserializer(result: Array<JobResponse>): any[] {
  return result.map((item) => {
    return jobResponseDeserializer(item);
  });
}

/** The properties of the Job Response object. */
export interface JobResponse {
  /** The job identifier. */
  readonly jobId?: string;
  /** The start time of the job. */
  readonly startTimeUtc?: Date;
  /** The time the job stopped processing. */
  readonly endTimeUtc?: Date;
  /** The type of the job. */
  readonly type?: JobType;
  /** The status of the job. */
  readonly status?: JobStatus;
  /** If status == failed, this string containing the reason for the failure. */
  readonly failureReason?: string;
  /** The status message for the job. */
  readonly statusMessage?: string;
  /** The job identifier of the parent job, if any. */
  readonly parentJobId?: string;
}

export function jobResponseDeserializer(item: any): JobResponse {
  return {
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    type: item["type"],
    status: item["status"],
    failureReason: item["failureReason"],
    statusMessage: item["statusMessage"],
    parentJobId: item["parentJobId"],
  };
}

/** The type of the job. */
export enum KnownJobType {
  /** unknown */
  Unknown = "unknown",
  /** export */
  Export = "export",
  /** import */
  Import = "import",
  /** backup */
  Backup = "backup",
  /** readDeviceProperties */
  ReadDeviceProperties = "readDeviceProperties",
  /** writeDeviceProperties */
  WriteDeviceProperties = "writeDeviceProperties",
  /** updateDeviceConfiguration */
  UpdateDeviceConfiguration = "updateDeviceConfiguration",
  /** rebootDevice */
  RebootDevice = "rebootDevice",
  /** factoryResetDevice */
  FactoryResetDevice = "factoryResetDevice",
  /** firmwareUpdate */
  FirmwareUpdate = "firmwareUpdate",
}

/**
 * The type of the job. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: unknown \
 * **export**: export \
 * **import**: import \
 * **backup**: backup \
 * **readDeviceProperties**: readDeviceProperties \
 * **writeDeviceProperties**: writeDeviceProperties \
 * **updateDeviceConfiguration**: updateDeviceConfiguration \
 * **rebootDevice**: rebootDevice \
 * **factoryResetDevice**: factoryResetDevice \
 * **firmwareUpdate**: firmwareUpdate
 */
export type JobType = string;
/** The status of the job. */
export type JobStatus = "unknown" | "enqueued" | "running" | "completed" | "failed" | "cancelled";

/** The JSON-serialized array of IotHubQuotaMetricInfo objects with a next link. */
export interface _IotHubQuotaMetricInfoListResult {
  /** The IotHubQuotaMetricInfo items on this page */
  value: IotHubQuotaMetricInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotHubQuotaMetricInfoListResultDeserializer(
  item: any,
): _IotHubQuotaMetricInfoListResult {
  return {
    value: iotHubQuotaMetricInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotHubQuotaMetricInfoArrayDeserializer(
  result: Array<IotHubQuotaMetricInfo>,
): any[] {
  return result.map((item) => {
    return iotHubQuotaMetricInfoDeserializer(item);
  });
}

/** Quota metrics properties. */
export interface IotHubQuotaMetricInfo {
  /** The name of the quota metric. */
  readonly name?: string;
  /** The current value for the quota metric. */
  readonly currentValue?: number;
  /** The maximum value of the quota metric. */
  readonly maxValue?: number;
}

export function iotHubQuotaMetricInfoDeserializer(item: any): IotHubQuotaMetricInfo {
  return {
    name: item["name"],
    currentValue: item["currentValue"],
    maxValue: item["maxValue"],
  };
}

/** The JSON-serialized array of EndpointHealthData objects with a next link. */
export interface _EndpointHealthDataListResult {
  /** The EndpointHealthData items on this page */
  value: EndpointHealthData[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _endpointHealthDataListResultDeserializer(
  item: any,
): _EndpointHealthDataListResult {
  return {
    value: endpointHealthDataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function endpointHealthDataArrayDeserializer(result: Array<EndpointHealthData>): any[] {
  return result.map((item) => {
    return endpointHealthDataDeserializer(item);
  });
}

/** The health data for an endpoint */
export interface EndpointHealthData {
  /** Id of the endpoint */
  endpointId?: string;
  /** Health statuses have following meanings. The 'healthy' status shows that the endpoint is accepting messages as expected. The 'unhealthy' status shows that the endpoint is not accepting messages as expected and IoT Hub is retrying to send data to this endpoint. The status of an unhealthy endpoint will be updated to healthy when IoT Hub has established an eventually consistent state of health. The 'dead' status shows that the endpoint is not accepting messages, after IoT Hub retried sending messages for the retrial period. See IoT Hub metrics to identify errors and monitor issues with endpoints. The 'unknown' status shows that the IoT Hub has not established a connection with the endpoint. No messages have been delivered to or rejected from this endpoint */
  healthStatus?: EndpointHealthStatus;
  /** Last error obtained when a message failed to be delivered to iot hub */
  lastKnownError?: string;
  /** Time at which the last known error occurred */
  lastKnownErrorTime?: Date;
  /** Last time iot hub successfully sent a message to the endpoint */
  lastSuccessfulSendAttemptTime?: Date;
  /** Last time iot hub tried to send a message to the endpoint */
  lastSendAttemptTime?: Date;
}

export function endpointHealthDataDeserializer(item: any): EndpointHealthData {
  return {
    endpointId: item["endpointId"],
    healthStatus: item["healthStatus"],
    lastKnownError: item["lastKnownError"],
    lastKnownErrorTime: !item["lastKnownErrorTime"]
      ? item["lastKnownErrorTime"]
      : new Date(item["lastKnownErrorTime"]),
    lastSuccessfulSendAttemptTime: !item["lastSuccessfulSendAttemptTime"]
      ? item["lastSuccessfulSendAttemptTime"]
      : new Date(item["lastSuccessfulSendAttemptTime"]),
    lastSendAttemptTime: !item["lastSendAttemptTime"]
      ? item["lastSendAttemptTime"]
      : new Date(item["lastSendAttemptTime"]),
  };
}

/** Health statuses have following meanings. The 'healthy' status shows that the endpoint is accepting messages as expected. The 'unhealthy' status shows that the endpoint is not accepting messages as expected and IoT Hub is retrying to send data to this endpoint. The status of an unhealthy endpoint will be updated to healthy when IoT Hub has established an eventually consistent state of health. The 'dead' status shows that the endpoint is not accepting messages, after IoT Hub retried sending messages for the retrial period. See IoT Hub metrics to identify errors and monitor issues with endpoints. The 'unknown' status shows that the IoT Hub has not established a connection with the endpoint. No messages have been delivered to or rejected from this endpoint */
export enum KnownEndpointHealthStatus {
  /** unknown */
  Unknown = "unknown",
  /** healthy */
  Healthy = "healthy",
  /** degraded */
  Degraded = "degraded",
  /** unhealthy */
  Unhealthy = "unhealthy",
  /** dead */
  Dead = "dead",
}

/**
 * Health statuses have following meanings. The 'healthy' status shows that the endpoint is accepting messages as expected. The 'unhealthy' status shows that the endpoint is not accepting messages as expected and IoT Hub is retrying to send data to this endpoint. The status of an unhealthy endpoint will be updated to healthy when IoT Hub has established an eventually consistent state of health. The 'dead' status shows that the endpoint is not accepting messages, after IoT Hub retried sending messages for the retrial period. See IoT Hub metrics to identify errors and monitor issues with endpoints. The 'unknown' status shows that the IoT Hub has not established a connection with the endpoint. No messages have been delivered to or rejected from this endpoint \
 * {@link KnownEndpointHealthStatus} can be used interchangeably with EndpointHealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: unknown \
 * **healthy**: healthy \
 * **degraded**: degraded \
 * **unhealthy**: unhealthy \
 * **dead**: dead
 */
export type EndpointHealthStatus = string;

/** Input for testing all routes */
export interface TestAllRoutesInput {
  /** Routing source */
  routingSource?: RoutingSource;
  /** Routing message */
  message?: RoutingMessage;
  /** Routing Twin Reference */
  twin?: RoutingTwin;
}

export function testAllRoutesInputSerializer(item: TestAllRoutesInput): any {
  return {
    routingSource: item["routingSource"],
    message: !item["message"] ? item["message"] : routingMessageSerializer(item["message"]),
    twin: !item["twin"] ? item["twin"] : routingTwinSerializer(item["twin"]),
  };
}

/** Routing message */
export interface RoutingMessage {
  /** Body of routing message */
  body?: string;
  /** App properties */
  appProperties?: Record<string, string>;
  /** System properties */
  systemProperties?: Record<string, string>;
}

export function routingMessageSerializer(item: RoutingMessage): any {
  return {
    body: item["body"],
    appProperties: item["appProperties"],
    systemProperties: item["systemProperties"],
  };
}

/** Twin reference input parameter. This is an optional parameter */
export interface RoutingTwin {
  /** Twin Tags */
  tags?: Record<string, any>;
  properties?: RoutingTwinProperties;
}

export function routingTwinSerializer(item: RoutingTwin): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : routingTwinPropertiesSerializer(item["properties"]),
  };
}

/** model interface RoutingTwinProperties */
export interface RoutingTwinProperties {
  /** Twin desired properties */
  desired?: Record<string, any>;
  /** Twin reported properties */
  reported?: Record<string, any>;
}

export function routingTwinPropertiesSerializer(item: RoutingTwinProperties): any {
  return { desired: item["desired"], reported: item["reported"] };
}

/** Result of testing all routes */
export interface TestAllRoutesResult {
  /** JSON-serialized array of matched routes */
  routes?: MatchedRoute[];
}

export function testAllRoutesResultDeserializer(item: any): TestAllRoutesResult {
  return {
    routes: !item["routes"] ? item["routes"] : matchedRouteArrayDeserializer(item["routes"]),
  };
}

export function matchedRouteArrayDeserializer(result: Array<MatchedRoute>): any[] {
  return result.map((item) => {
    return matchedRouteDeserializer(item);
  });
}

/** Routes that matched */
export interface MatchedRoute {
  /** Properties of routes that matched */
  properties?: RouteProperties;
}

export function matchedRouteDeserializer(item: any): MatchedRoute {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : routePropertiesDeserializer(item["properties"]),
  };
}

/** Input for testing route */
export interface TestRouteInput {
  /** Routing message */
  message?: RoutingMessage;
  /** Route properties */
  route: RouteProperties;
  /** Routing Twin Reference */
  twin?: RoutingTwin;
}

export function testRouteInputSerializer(item: TestRouteInput): any {
  return {
    message: !item["message"] ? item["message"] : routingMessageSerializer(item["message"]),
    route: routePropertiesSerializer(item["route"]),
    twin: !item["twin"] ? item["twin"] : routingTwinSerializer(item["twin"]),
  };
}

/** Result of testing one route */
export interface TestRouteResult {
  /** Result of testing route */
  result?: TestResultStatus;
  /** Detailed result of testing route */
  details?: TestRouteResultDetails;
}

export function testRouteResultDeserializer(item: any): TestRouteResult {
  return {
    result: item["result"],
    details: !item["details"]
      ? item["details"]
      : testRouteResultDetailsDeserializer(item["details"]),
  };
}

/** Result of testing route */
export enum KnownTestResultStatus {
  /** undefined */
  Undefined = "undefined",
  /** false */
  False = "false",
  /** true */
  True = "true",
}

/**
 * Result of testing route \
 * {@link KnownTestResultStatus} can be used interchangeably with TestResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **undefined**: undefined \
 * **false**: false \
 * **true**: true
 */
export type TestResultStatus = string;

/** Detailed result of testing a route */
export interface TestRouteResultDetails {
  /** JSON-serialized list of route compilation errors */
  compilationErrors?: RouteCompilationError[];
}

export function testRouteResultDetailsDeserializer(item: any): TestRouteResultDetails {
  return {
    compilationErrors: !item["compilationErrors"]
      ? item["compilationErrors"]
      : routeCompilationErrorArrayDeserializer(item["compilationErrors"]),
  };
}

export function routeCompilationErrorArrayDeserializer(
  result: Array<RouteCompilationError>,
): any[] {
  return result.map((item) => {
    return routeCompilationErrorDeserializer(item);
  });
}

/** Compilation error when evaluating route */
export interface RouteCompilationError {
  /** Route error message */
  message?: string;
  /** Severity of the route error */
  severity?: RouteErrorSeverity;
  /** Location where the route error happened */
  location?: RouteErrorRange;
}

export function routeCompilationErrorDeserializer(item: any): RouteCompilationError {
  return {
    message: item["message"],
    severity: item["severity"],
    location: !item["location"] ? item["location"] : routeErrorRangeDeserializer(item["location"]),
  };
}

/** Severity of the route error */
export enum KnownRouteErrorSeverity {
  /** error */
  Error = "error",
  /** warning */
  Warning = "warning",
}

/**
 * Severity of the route error \
 * {@link KnownRouteErrorSeverity} can be used interchangeably with RouteErrorSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **error**: error \
 * **warning**: warning
 */
export type RouteErrorSeverity = string;

/** Range of route errors */
export interface RouteErrorRange {
  /** Start where the route error happened */
  start?: RouteErrorPosition;
  /** End where the route error happened */
  end?: RouteErrorPosition;
}

export function routeErrorRangeDeserializer(item: any): RouteErrorRange {
  return {
    start: !item["start"] ? item["start"] : routeErrorPositionDeserializer(item["start"]),
    end: !item["end"] ? item["end"] : routeErrorPositionDeserializer(item["end"]),
  };
}

/** Position where the route error happened */
export interface RouteErrorPosition {
  /** Line where the route error happened */
  line?: number;
  /** Column where the route error happened */
  column?: number;
}

export function routeErrorPositionDeserializer(item: any): RouteErrorPosition {
  return {
    line: item["line"],
    column: item["column"],
  };
}

/** The list of shared access policies with a next link. */
export interface _SharedAccessSignatureAuthorizationRuleListResult {
  /** The SharedAccessSignatureAuthorizationRule items on this page */
  value: SharedAccessSignatureAuthorizationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedAccessSignatureAuthorizationRuleListResultDeserializer(
  item: any,
): _SharedAccessSignatureAuthorizationRuleListResult {
  return {
    value: sharedAccessSignatureAuthorizationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Use to provide parameters when requesting an export of all devices in the IoT hub. */
export interface ExportDevicesRequest {
  /** The export blob container URI. */
  exportBlobContainerUri: string;
  /** The value indicating whether keys should be excluded during export. */
  excludeKeys: boolean;
  /** The name of the blob that will be created in the provided output blob container. This blob will contain the exported device registry information for the IoT Hub. */
  exportBlobName?: string;
  /** Specifies authentication type being used for connecting to the storage account. */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of storage endpoint for export devices. */
  identity?: ManagedIdentity;
  /** The value indicating whether configurations should be exported. */
  includeConfigurations?: boolean;
  /** The name of the blob that will be created in the provided output blob container. This blob will contain the exported configurations for the Iot Hub. */
  configurationsBlobName?: string;
}

export function exportDevicesRequestSerializer(item: ExportDevicesRequest): any {
  return {
    exportBlobContainerUri: item["exportBlobContainerUri"],
    excludeKeys: item["excludeKeys"],
    exportBlobName: item["exportBlobName"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    includeConfigurations: item["includeConfigurations"],
    configurationsBlobName: item["configurationsBlobName"],
  };
}

/** Use to provide parameters when requesting an import of all devices in the hub. */
export interface ImportDevicesRequest {
  /** The input blob container URI. */
  inputBlobContainerUri: string;
  /** The output blob container URI. */
  outputBlobContainerUri: string;
  /** The blob name to be used when importing from the provided input blob container. */
  inputBlobName?: string;
  /** The blob name to use for storing the status of the import job. */
  outputBlobName?: string;
  /** Specifies authentication type being used for connecting to the storage account. */
  authenticationType?: AuthenticationType;
  /** Managed identity properties of storage endpoint for import devices. */
  identity?: ManagedIdentity;
  /** The value indicating whether configurations should be imported. */
  includeConfigurations?: boolean;
  /** The blob name to be used when importing configurations from the provided input blob container. */
  configurationsBlobName?: string;
}

export function importDevicesRequestSerializer(item: ImportDevicesRequest): any {
  return {
    inputBlobContainerUri: item["inputBlobContainerUri"],
    outputBlobContainerUri: item["outputBlobContainerUri"],
    inputBlobName: item["inputBlobName"],
    outputBlobName: item["outputBlobName"],
    authenticationType: item["authenticationType"],
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
    includeConfigurations: item["includeConfigurations"],
    configurationsBlobName: item["configurationsBlobName"],
  };
}

/** Identity registry statistics. */
export interface RegistryStatistics {
  /** The total count of devices in the identity registry. */
  readonly totalDeviceCount?: number;
  /** The count of enabled devices in the identity registry. */
  readonly enabledDeviceCount?: number;
  /** The count of disabled devices in the identity registry. */
  readonly disabledDeviceCount?: number;
}

export function registryStatisticsDeserializer(item: any): RegistryStatistics {
  return {
    totalDeviceCount: item["totalDeviceCount"],
    enabledDeviceCount: item["enabledDeviceCount"],
    disabledDeviceCount: item["disabledDeviceCount"],
  };
}

/** The properties of the EventHubConsumerGroupInfo object. */
export interface EventHubConsumerGroupInfo extends ProxyResource {
  /** The tags. */
  properties?: Record<string, any>;
  /** The etag. */
  readonly etag?: string;
}

export function eventHubConsumerGroupInfoDeserializer(item: any): EventHubConsumerGroupInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    etag: item["etag"],
  };
}

/** The EventHub consumer group. */
export interface EventHubConsumerGroupBodyDescription {
  /** The EventHub consumer group name. */
  properties: EventHubConsumerGroupName;
}

export function eventHubConsumerGroupBodyDescriptionSerializer(
  item: EventHubConsumerGroupBodyDescription,
): any {
  return { properties: eventHubConsumerGroupNameSerializer(item["properties"]) };
}

/** The EventHub consumer group name. */
export interface EventHubConsumerGroupName {
  /** EventHub consumer group name */
  name: string;
}

export function eventHubConsumerGroupNameSerializer(item: EventHubConsumerGroupName): any {
  return { name: item["name"] };
}

/** The JSON-serialized list of consumer groups for the Event Hub-compatible endpoint. */
export interface _EventHubConsumerGroupsListResult {
  /** The EventHubConsumerGroupInfo items on this page */
  value: EventHubConsumerGroupInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventHubConsumerGroupsListResultDeserializer(
  item: any,
): _EventHubConsumerGroupsListResult {
  return {
    value: eventHubConsumerGroupInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventHubConsumerGroupInfoArrayDeserializer(
  result: Array<EventHubConsumerGroupInfo>,
): any[] {
  return result.map((item) => {
    return eventHubConsumerGroupInfoDeserializer(item);
  });
}

/** Input values. */
export interface OperationInputs {
  /** The name of the IoT hub to check. */
  name: string;
}

export function operationInputsSerializer(item: OperationInputs): any {
  return { name: item["name"] };
}

/** The properties indicating whether a given IoT hub name is available. */
export interface IotHubNameAvailabilityInfo {
  /** The value which indicates whether the provided name is available. */
  readonly nameAvailable?: boolean;
  /** The reason for unavailability. */
  readonly reason?: IotHubNameUnavailabilityReason;
  /** The detailed reason message. */
  message?: string;
}

export function iotHubNameAvailabilityInfoDeserializer(item: any): IotHubNameAvailabilityInfo {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason for unavailability. */
export type IotHubNameUnavailabilityReason = "Invalid" | "AlreadyExists";

/** Use to provide failover region when requesting manual Failover for a hub. */
export interface FailoverInput {
  /** Region the hub will be failed over to */
  failoverRegion: string;
}

export function failoverInputSerializer(item: FailoverInput): any {
  return { failoverRegion: item["failoverRegion"] };
}

/** The X509 Certificate. */
export interface CertificateDescription extends ProxyResource {
  /** The description of an X509 CA Certificate. */
  properties?: CertificateProperties;
  /** The entity tag. */
  readonly etag?: string;
}

export function certificateDescriptionSerializer(item: CertificateDescription): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesSerializer(item["properties"]),
  };
}

export function certificateDescriptionDeserializer(item: any): CertificateDescription {
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
  /** The certificate's create date and time. */
  readonly created?: Date;
  /** The certificate's last update date and time. */
  readonly updated?: Date;
  /** The certificate content */
  certificate?: string;
  /** The reference to policy stored in Azure Device Registry (ADR). */
  policyResourceId?: string;
}

export function certificatePropertiesSerializer(item: CertificateProperties): any {
  return {
    isVerified: item["isVerified"],
    certificate: item["certificate"],
    policyResourceId: item["policyResourceId"],
  };
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    subject: item["subject"],
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    thumbprint: item["thumbprint"],
    isVerified: item["isVerified"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    certificate: item["certificate"],
    policyResourceId: item["policyResourceId"],
  };
}

/** The JSON-serialized array of Certificate objects. */
export interface CertificateListDescription {
  /** The array of Certificate objects. */
  value?: CertificateDescription[];
}

export function certificateListDescriptionDeserializer(item: any): CertificateListDescription {
  return {
    value: !item["value"] ? item["value"] : certificateDescriptionArrayDeserializer(item["value"]),
  };
}

export function certificateDescriptionArraySerializer(
  result: Array<CertificateDescription>,
): any[] {
  return result.map((item) => {
    return certificateDescriptionSerializer(item);
  });
}

export function certificateDescriptionArrayDeserializer(
  result: Array<CertificateDescription>,
): any[] {
  return result.map((item) => {
    return certificateDescriptionDeserializer(item);
  });
}

/** The X509 Certificate. */
export interface CertificateWithNonceDescription {
  /** The description of an X509 CA Certificate including the challenge nonce issued for the Proof-Of-Possession flow. */
  properties?: CertificatePropertiesWithNonce;
  /** The resource identifier. */
  readonly id?: string;
  /** The name of the certificate. */
  readonly name?: string;
  /** The entity tag. */
  readonly etag?: string;
  /** The resource type. */
  readonly type?: string;
}

export function certificateWithNonceDescriptionDeserializer(
  item: any,
): CertificateWithNonceDescription {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesWithNonceDeserializer(item["properties"]),
    id: item["id"],
    name: item["name"],
    etag: item["etag"],
    type: item["type"],
  };
}

/** The description of an X509 CA Certificate including the challenge nonce issued for the Proof-Of-Possession flow. */
export interface CertificatePropertiesWithNonce {
  /** The certificate's subject name. */
  readonly subject?: string;
  /** The certificate's expiration date and time. */
  readonly expiry?: Date;
  /** The certificate's thumbprint. */
  readonly thumbprint?: string;
  /** Determines whether certificate has been verified. */
  readonly isVerified?: boolean;
  /** The certificate's create date and time. */
  readonly created?: Date;
  /** The certificate's last update date and time. */
  readonly updated?: Date;
  /** The certificate's verification code that will be used for proof of possession. */
  readonly verificationCode?: string;
  /** The certificate content */
  readonly certificate?: string;
  /** The reference to policy stored in Azure Device Registry (ADR). */
  policyResourceId?: string;
}

export function certificatePropertiesWithNonceDeserializer(
  item: any,
): CertificatePropertiesWithNonce {
  return {
    subject: item["subject"],
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    thumbprint: item["thumbprint"],
    isVerified: item["isVerified"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"]),
    verificationCode: item["verificationCode"],
    certificate: item["certificate"],
    policyResourceId: item["policyResourceId"],
  };
}

/** The JSON-serialized leaf certificate */
export interface CertificateVerificationDescription {
  /** base-64 representation of X509 certificate .cer file or just .pem file content. */
  certificate?: string;
}

export function certificateVerificationDescriptionSerializer(
  item: CertificateVerificationDescription,
): any {
  return { certificate: item["certificate"] };
}

/** The group information for creating a private endpoint on an IotHub */
export interface GroupIdInformation {
  /** The resource identifier. */
  readonly id?: string;
  /** The resource name. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** The properties for a group information object */
  properties: GroupIdInformationProperties;
}

export function groupIdInformationDeserializer(item: any): GroupIdInformation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
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

/** The available private link resources for an IotHub */
export interface PrivateLinkResources {
  /** The list of available private link resources for an IotHub */
  value?: GroupIdInformation[];
}

export function privateLinkResourcesDeserializer(item: any): PrivateLinkResources {
  return {
    value: !item["value"] ? item["value"] : groupIdInformationArrayDeserializer(item["value"]),
  };
}

export function groupIdInformationArrayDeserializer(result: Array<GroupIdInformation>): any[] {
  return result.map((item) => {
    return groupIdInformationDeserializer(item);
  });
}

/** Json-serialized array of User subscription quota response */
export interface UserSubscriptionQuotaListResult {
  /** The UserSubscriptionQuota items on this page */
  value?: UserSubscriptionQuota[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function userSubscriptionQuotaListResultDeserializer(
  item: any,
): UserSubscriptionQuotaListResult {
  return {
    value: !item["value"] ? item["value"] : userSubscriptionQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function userSubscriptionQuotaArrayDeserializer(
  result: Array<UserSubscriptionQuota>,
): any[] {
  return result.map((item) => {
    return userSubscriptionQuotaDeserializer(item);
  });
}

/** User subscription quota response */
export interface UserSubscriptionQuota {
  /** IotHub type id */
  id?: string;
  /** Response type */
  type?: string;
  /** Unit of IotHub type */
  unit?: string;
  /** Current number of IotHub type */
  currentValue?: number;
  /** Numerical limit on IotHub type */
  limit?: number;
  /** IotHub type */
  name?: Name;
}

export function userSubscriptionQuotaDeserializer(item: any): UserSubscriptionQuota {
  return {
    id: item["id"],
    type: item["type"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : nameDeserializer(item["name"]),
  };
}

/** Name of Iot Hub type */
export interface Name {
  /** IotHub type */
  value?: string;
  /** Localized value of name */
  localizedValue?: string;
}

export function nameDeserializer(item: any): Name {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-03-01-preview API version. */
  V20260301Preview = "2026-03-01-preview",
}
