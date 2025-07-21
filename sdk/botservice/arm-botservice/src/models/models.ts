// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The list of bot service operation response. */
export interface _OperationEntityListResult {
  /** The link used to get the next page of operations. */
  nextLink?: string;
  /** The list of operations. */
  value: OperationEntity[];
}

export function _operationEntityListResultDeserializer(item: any): _OperationEntityListResult {
  return {
    nextLink: item["nextLink"],
    value: operationEntityArrayDeserializer(item["value"]),
  };
}

export function operationEntityArrayDeserializer(result: Array<OperationEntity>): any[] {
  return result.map((item) => {
    return operationEntityDeserializer(item);
  });
}

/** The operations supported by Bot Service Management. */
export interface OperationEntity {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The operation supported by Bot Service Management. */
  display?: OperationDisplayInfo;
  /** The origin of the operation. */
  origin?: string;
  /** Additional properties. */
  properties?: any;
}

export function operationEntityDeserializer(item: any): OperationEntity {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayInfoDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** The operation supported by Bot Service Management. */
export interface OperationDisplayInfo {
  /** The description of the operation. */
  description?: string;
  /** The action that users can perform, based on their permission level. */
  operation?: string;
  /** Service provider: Microsoft Bot Service. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
}

export function operationDisplayInfoDeserializer(item: any): OperationDisplayInfo {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** Bot Service error object. */
export interface ErrorModel {
  /** The error body. */
  error?: ErrorBody;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    error: !item["error"] ? item["error"] : errorBodyDeserializer(item["error"]),
  };
}

/** Bot Service error body. */
export interface ErrorBody {
  /** error code */
  code: string;
  /** error message */
  message: string;
}

export function errorBodyDeserializer(item: any): ErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Bot resource definition */
export interface Bot extends TrackedResource {
  /** The set of properties specific to bot resource */
  properties?: BotProperties;
  /** Gets or sets the SKU of the resource. */
  sku?: Sku;
  /** Required. Gets or sets the Kind of the resource. */
  kind?: Kind;
  /** Entity Tag. */
  etag?: string;
  /** Entity zones */
  readonly zones?: string[];
}

export function botSerializer(item: Bot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : botPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function botDeserializer(item: any): Bot {
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
      : botPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The parameters to provide for the Bot. */
export interface BotProperties {
  /** The Name of the bot */
  displayName: string;
  /** The description of the bot */
  description?: string;
  /** The Icon Url of the bot */
  iconUrl?: string;
  /** The bot's endpoint */
  endpoint: string | null;
  /** The bot's endpoint version */
  readonly endpointVersion?: string;
  /** Contains resource all settings defined as key/value pairs. */
  allSettings?: Record<string, string>;
  /** Contains resource parameters defined as key/value pairs. */
  parameters?: Record<string, string>;
  /** The bot's manifest url */
  manifestUrl?: string;
  /** Microsoft App Type for the bot */
  msaAppType?: MsaAppType;
  /** Microsoft App Id for the bot */
  msaAppId: string;
  /** Microsoft App Tenant Id for the bot */
  msaAppTenantId?: string;
  /** Microsoft App Managed Identity Resource Id for the bot */
  msaAppMSIResourceId?: string;
  /** Collection of channels for which the bot is configured */
  readonly configuredChannels?: string[];
  /** Collection of channels for which the bot is enabled */
  readonly enabledChannels?: string[];
  /** The Application Insights key */
  developerAppInsightKey?: string;
  /** The Application Insights Api Key */
  developerAppInsightsApiKey?: string;
  /** The Application Insights App Id */
  developerAppInsightsApplicationId?: string;
  /** Collection of LUIS App Ids */
  luisAppIds?: string[];
  /** The LUIS Key */
  luisKey?: string;
  /** Whether Cmek is enabled */
  isCmekEnabled?: boolean;
  /** The CMK Url */
  cmekKeyVaultUrl?: string;
  /** The CMK encryption status */
  readonly cmekEncryptionStatus?: string;
  /** The Tenant Id for the bot */
  tenantId?: string;
  /** Whether the bot is in an isolated network */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Whether the bot is streaming supported */
  isStreamingSupported?: boolean;
  /** Whether the bot is developerAppInsightsApiKey set */
  readonly isDeveloperAppInsightsApiKeySet?: boolean;
  /** Token used to migrate non Azure bot to azure subscription */
  readonly migrationToken?: string;
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** The channel schema transformation version for the bot */
  schemaTransformationVersion?: string | null;
  /** The storage resourceId for the bot */
  storageResourceId?: string;
  /** List of Private Endpoint Connections configured for the bot */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** List of Network Security Perimeter configurations for the bot */
  readonly networkSecurityPerimeterConfigurations?: NetworkSecurityPerimeterConfiguration[];
  /** The hint to browser (e.g. protocol handler) on how to open the bot for authoring */
  openWithHint?: string;
  /** The hint (e.g. keyVault secret resourceId) on how to fetch the app secret */
  appPasswordHint?: string;
  /** Provisioning state of the resource */
  readonly provisioningState?: string;
  /** Publishing credentials of the resource */
  publishingCredentials?: string;
}

export function botPropertiesSerializer(item: BotProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    iconUrl: item["iconUrl"],
    endpoint: item["endpoint"],
    allSettings: item["allSettings"],
    parameters: item["parameters"],
    manifestUrl: item["manifestUrl"],
    msaAppType: item["msaAppType"],
    msaAppId: item["msaAppId"],
    msaAppTenantId: item["msaAppTenantId"],
    msaAppMSIResourceId: item["msaAppMSIResourceId"],
    developerAppInsightKey: item["developerAppInsightKey"],
    developerAppInsightsApiKey: item["developerAppInsightsApiKey"],
    developerAppInsightsApplicationId: item["developerAppInsightsApplicationId"],
    luisAppIds: !item["luisAppIds"]
      ? item["luisAppIds"]
      : item["luisAppIds"].map((p: any) => {
          return p;
        }),
    luisKey: item["luisKey"],
    isCmekEnabled: item["isCmekEnabled"],
    cmekKeyVaultUrl: item["cmekKeyVaultUrl"],
    tenantId: item["tenantId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    isStreamingSupported: item["isStreamingSupported"],
    disableLocalAuth: item["disableLocalAuth"],
    schemaTransformationVersion: item["schemaTransformationVersion"],
    storageResourceId: item["storageResourceId"],
    openWithHint: item["openWithHint"],
    appPasswordHint: item["appPasswordHint"],
    publishingCredentials: item["publishingCredentials"],
  };
}

export function botPropertiesDeserializer(item: any): BotProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    iconUrl: item["iconUrl"],
    endpoint: item["endpoint"],
    endpointVersion: item["endpointVersion"],
    allSettings: item["allSettings"],
    parameters: item["parameters"],
    manifestUrl: item["manifestUrl"],
    msaAppType: item["msaAppType"],
    msaAppId: item["msaAppId"],
    msaAppTenantId: item["msaAppTenantId"],
    msaAppMSIResourceId: item["msaAppMSIResourceId"],
    configuredChannels: !item["configuredChannels"]
      ? item["configuredChannels"]
      : item["configuredChannels"].map((p: any) => {
          return p;
        }),
    enabledChannels: !item["enabledChannels"]
      ? item["enabledChannels"]
      : item["enabledChannels"].map((p: any) => {
          return p;
        }),
    developerAppInsightKey: item["developerAppInsightKey"],
    developerAppInsightsApiKey: item["developerAppInsightsApiKey"],
    developerAppInsightsApplicationId: item["developerAppInsightsApplicationId"],
    luisAppIds: !item["luisAppIds"]
      ? item["luisAppIds"]
      : item["luisAppIds"].map((p: any) => {
          return p;
        }),
    luisKey: item["luisKey"],
    isCmekEnabled: item["isCmekEnabled"],
    cmekKeyVaultUrl: item["cmekKeyVaultUrl"],
    cmekEncryptionStatus: item["cmekEncryptionStatus"],
    tenantId: item["tenantId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    isStreamingSupported: item["isStreamingSupported"],
    isDeveloperAppInsightsApiKeySet: item["isDeveloperAppInsightsApiKeySet"],
    migrationToken: item["migrationToken"],
    disableLocalAuth: item["disableLocalAuth"],
    schemaTransformationVersion: item["schemaTransformationVersion"],
    storageResourceId: item["storageResourceId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    networkSecurityPerimeterConfigurations: !item["networkSecurityPerimeterConfigurations"]
      ? item["networkSecurityPerimeterConfigurations"]
      : networkSecurityPerimeterConfigurationArrayDeserializer(
          item["networkSecurityPerimeterConfigurations"],
        ),
    openWithHint: item["openWithHint"],
    appPasswordHint: item["appPasswordHint"],
    provisioningState: item["provisioningState"],
    publishingCredentials: item["publishingCredentials"],
  };
}

/** Microsoft App Type for the bot */
export enum KnownMsaAppType {
  UserAssignedMSI = "UserAssignedMSI",
  SingleTenant = "SingleTenant",
  MultiTenant = "MultiTenant",
}

/**
 * Microsoft App Type for the bot \
 * {@link KnownMsaAppType} can be used interchangeably with MsaAppType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserAssignedMSI** \
 * **SingleTenant** \
 * **MultiTenant**
 */
export type MsaAppType = string;

/** Whether the bot is in an isolated network */
export enum KnownPublicNetworkAccess {
  Enabled = "Enabled",
  Disabled = "Disabled",
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Whether the bot is in an isolated network \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
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
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** Group ids */
  groupIds?: string[];
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
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
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
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

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
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

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  Succeeded = "Succeeded",
  Creating = "Creating",
  Deleting = "Deleting",
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Network Security Perimeter configuration */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Properties of the Network Security Perimeter configuration */
  properties?: NetworkSecurityPerimeterConfigurationProperties;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Network Security Perimeter configuration */
export interface NetworkSecurityPerimeterConfigurationProperties {
  provisioningState?: ProvisioningState;
  /** List of Provisioning Issues if any */
  provisioningIssues?: ProvisioningIssue[];
  /** Information about Network Security Perimeter */
  readonly networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: ResourceAssociation;
  /** Information about profile */
  readonly profile?: Profile;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"] ? item["profile"] : profileDeserializer(item["profile"]),
  };
}

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Accepted = "Accepted",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Deleting = "Deleting",
}

/** Type of ProvisioningState */
export type ProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes Provisioning issue for given Network Security Perimeter configuration */
export interface ProvisioningIssue {
  /** Name of the issue */
  name?: string;
  /** Properties of Provisioning Issue */
  readonly properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Provisioning Issue */
export interface ProvisioningIssueProperties {
  /** Type of Issue */
  issueType?: string;
  /** Provisioning state of Network Security Perimeter configuration propagation */
  severity?: Severity;
  /** Description of the issue */
  description?: string;
  /** ARM IDs of resources that can be associated to the same perimeter to remediate the issue. */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the same profile to remediate the issue. */
  suggestedAccessRules?: NspAccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : nspAccessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

/** Provisioning state of Network Security Perimeter configuration propagation */
export enum KnownSeverity {
  Warning = "Warning",
  Error = "Error",
}

/**
 * Provisioning state of Network Security Perimeter configuration propagation \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning** \
 * **Error**
 */
export type Severity = string;

export function nspAccessRuleArrayDeserializer(result: Array<NspAccessRule>): any[] {
  return result.map((item) => {
    return nspAccessRuleDeserializer(item);
  });
}

/** Information of Access Rule in a profile */
export interface NspAccessRule {
  /** Name of the access rule */
  name?: string;
  /** Properties of Access Rule */
  readonly properties?: NspAccessRuleProperties;
}

export function nspAccessRuleDeserializer(item: any): NspAccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nspAccessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface NspAccessRuleProperties {
  /** Direction of Access Rule */
  direction?: NspAccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: NspAccessRulePropertiesSubscriptionsItem[];
  /** NetworkSecurityPerimeters for inbound rules */
  readonly networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** FQDN for outbound rules */
  readonly fullyQualifiedDomainNames?: string[];
  /** Email addresses for outbound rules */
  readonly emailAddresses?: string[];
  /** Phone numbers for outbound rules */
  readonly phoneNumbers?: string[];
}

export function nspAccessRulePropertiesDeserializer(item: any): NspAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownNspAccessRuleDirection {
  Inbound = "Inbound",
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownNspAccessRuleDirection} can be used interchangeably with NspAccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound** \
 * **Outbound**
 */
export type NspAccessRuleDirection = string;

export function nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<NspAccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return nspAccessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Subscription for inbound rule */
export interface NspAccessRulePropertiesSubscriptionsItem {
  /** Fully qualified identifier of subscription */
  id?: string;
}

export function nspAccessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): NspAccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Information about Network Security Perimeter */
export interface NetworkSecurityPerimeter {
  /** Fully qualified resource ID for the resource. E.g. "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}" */
  readonly id?: string;
  /** Guid of the Network Security Perimeter */
  perimeterGuid?: string;
  /** Location of the Network Security Perimeter */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Information about resource association */
export interface ResourceAssociation {
  /** Name of the resource association */
  name?: string;
  /** Access Mode of the resource association */
  accessMode?: AccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access Mode of the resource association */
export enum KnownAccessMode {
  Enforced = "Enforced",
  Learning = "Learning",
  Audit = "Audit",
}

/**
 * Access Mode of the resource association \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enforced** \
 * **Learning** \
 * **Audit**
 */
export type AccessMode = string;

/** Information about profile */
export interface Profile {
  /** Name of the profile */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: number;
  /** List of Access Rules */
  accessRules?: NspAccessRule[];
  /** Current diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** List of log categories */
  readonly enabledLogCategories?: string[];
}

export function profileDeserializer(item: any): Profile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : nspAccessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** The SKU of the cognitive services account. */
export interface Sku {
  /** The sku name */
  name: SkuName;
  /** Gets the sku tier. This is based on the SKU name. */
  readonly tier?: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The name of SKU. */
export enum KnownSkuName {
  F0 = "F0",
  S1 = "S1",
}

/**
 * The name of SKU. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **F0** \
 * **S1**
 */
export type SkuName = string;

/** Gets the sku tier. This is based on the SKU name. */
export enum KnownSkuTier {
  Free = "Free",
  Standard = "Standard",
}

/**
 * Gets the sku tier. This is based on the SKU name. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free** \
 * **Standard**
 */
export type SkuTier = string;

/** Indicates the type of bot service */
export enum KnownKind {
  Sdk = "sdk",
  Designer = "designer",
  Bot = "bot",
  Function = "function",
  Azurebot = "azurebot",
}

/**
 * Indicates the type of bot service \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **sdk** \
 * **designer** \
 * **bot** \
 * **function** \
 * **azurebot**
 */
export type Kind = string;

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

/** The list of bot service operation response. */
export interface _BotResponseList {
  /** The Bot items on this page */
  readonly value: Bot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _botResponseListDeserializer(item: any): _BotResponseList {
  return {
    value: botArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function botArraySerializer(result: Array<Bot>): any[] {
  return result.map((item) => {
    return botSerializer(item);
  });
}

export function botArrayDeserializer(result: Array<Bot>): any[] {
  return result.map((item) => {
    return botDeserializer(item);
  });
}

/** The request body for a request to Bot Service Management to check availability of a bot name. */
export interface CheckNameAvailabilityRequestBody {
  /** the name of the bot for which availability needs to be checked. */
  name?: string;
  /** the type of the bot for which availability needs to be checked */
  type?: string;
}

export function checkNameAvailabilityRequestBodySerializer(
  item: CheckNameAvailabilityRequestBody,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The response body returned for a request to Bot Service Management to check availability of a bot name. */
export interface CheckNameAvailabilityResponseBody {
  /** indicates if the bot name is valid. */
  valid?: boolean;
  /** additional message from the bot management api showing why a bot name is not available */
  message?: string;
  /** response code from ABS */
  absCode?: string;
}

export function checkNameAvailabilityResponseBodyDeserializer(
  item: any,
): CheckNameAvailabilityResponseBody {
  return {
    valid: item["valid"],
    message: item["message"],
    absCode: item["absCode"],
  };
}

/** List of private endpoint connection associated with the specified storage account */
export interface _PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  /** The link used to get the next page of private endpoint connections. */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Result of the List NetworkSecurityPerimeterConfiguration operation. */
export interface _NetworkSecurityPerimeterConfigurationList {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  readonly value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationList {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
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

/** The ARM create email sign in url operation response. */
export interface CreateEmailSignInUrlResponse {
  /** Specifies the resource ID. */
  readonly id?: string;
  /** Specifies the location of the resource. */
  location?: string;
  /** The set of properties specific to sign in url */
  properties?: CreateEmailSignInUrlResponseProperties;
}

export function createEmailSignInUrlResponseDeserializer(item: any): CreateEmailSignInUrlResponse {
  return {
    id: item["id"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : createEmailSignInUrlResponsePropertiesDeserializer(item["properties"]),
  };
}

/** The set of properties specific to sign in url */
export interface CreateEmailSignInUrlResponseProperties {
  /** Sign in url. */
  url?: string;
}

export function createEmailSignInUrlResponsePropertiesDeserializer(
  item: any,
): CreateEmailSignInUrlResponseProperties {
  return {
    url: item["url"],
  };
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends PrivateLinkResourceBase {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
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

/** Common fields that are returned in the response for all BotService Private Link Resources */
export interface PrivateLinkResourceBase {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
}

export function privateLinkResourceBaseDeserializer(item: any): PrivateLinkResourceBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Bot channel resource definition */
export interface BotChannel extends TrackedResource {
  /** The set of properties specific to bot channel resource */
  properties?: ChannelUnion;
  /** Gets or sets the SKU of the resource. */
  sku?: Sku;
  /** Required. Gets or sets the Kind of the resource. */
  kind?: Kind;
  /** Entity Tag. */
  etag?: string;
  /** Entity zones */
  readonly zones?: string[];
}

export function botChannelSerializer(item: BotChannel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : channelUnionSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function botChannelDeserializer(item: any): BotChannel {
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
      : channelUnionDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Channel definition */
export interface Channel {
  /** The channel name */
  /** The discriminator possible values: AlexaChannel, FacebookChannel, EmailChannel, OutlookChannel, MsTeamsChannel, SkypeChannel, KikChannel, WebChatChannel, DirectLineChannel, TelegramChannel, SmsChannel, SlackChannel, LineChannel, DirectLineSpeechChannel, Omnichannel, TelephonyChannel, AcsChatChannel, SearchAssistant, M365Extensions */
  channelName: string;
  /** Entity Tag of the resource */
  etag?: string | null;
  /** Provisioning state of the resource */
  readonly provisioningState?: string;
  /** Specifies the location of the resource. */
  location?: string;
}

export function channelSerializer(item: Channel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function channelDeserializer(item: any): Channel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** Alias for ChannelUnion */
export type ChannelUnion =
  | AlexaChannel
  | FacebookChannel
  | EmailChannel
  | OutlookChannel
  | MsTeamsChannel
  | SkypeChannel
  | KikChannel
  | WebChatChannel
  | DirectLineChannel
  | TelegramChannel
  | SmsChannel
  | SlackChannel
  | LineChannel
  | DirectLineSpeechChannel
  | Omnichannel
  | TelephonyChannel
  | AcsChatChannel
  | SearchAssistant
  | M365Extensions
  | Channel;

export function channelUnionSerializer(item: ChannelUnion): any {
  switch (item.channelName) {
    case "AlexaChannel":
      return alexaChannelSerializer(item as AlexaChannel);

    case "FacebookChannel":
      return facebookChannelSerializer(item as FacebookChannel);

    case "EmailChannel":
      return emailChannelSerializer(item as EmailChannel);

    case "OutlookChannel":
      return outlookChannelSerializer(item as OutlookChannel);

    case "MsTeamsChannel":
      return msTeamsChannelSerializer(item as MsTeamsChannel);

    case "SkypeChannel":
      return skypeChannelSerializer(item as SkypeChannel);

    case "KikChannel":
      return kikChannelSerializer(item as KikChannel);

    case "WebChatChannel":
      return webChatChannelSerializer(item as WebChatChannel);

    case "DirectLineChannel":
      return directLineChannelSerializer(item as DirectLineChannel);

    case "TelegramChannel":
      return telegramChannelSerializer(item as TelegramChannel);

    case "SmsChannel":
      return smsChannelSerializer(item as SmsChannel);

    case "SlackChannel":
      return slackChannelSerializer(item as SlackChannel);

    case "LineChannel":
      return lineChannelSerializer(item as LineChannel);

    case "DirectLineSpeechChannel":
      return directLineSpeechChannelSerializer(item as DirectLineSpeechChannel);

    case "Omnichannel":
      return omnichannelSerializer(item as Omnichannel);

    case "TelephonyChannel":
      return telephonyChannelSerializer(item as TelephonyChannel);

    case "AcsChatChannel":
      return acsChatChannelSerializer(item as AcsChatChannel);

    case "SearchAssistant":
      return searchAssistantSerializer(item as SearchAssistant);

    case "M365Extensions":
      return m365ExtensionsSerializer(item as M365Extensions);

    default:
      return channelSerializer(item);
  }
}

export function channelUnionDeserializer(item: any): ChannelUnion {
  switch (item.channelName) {
    case "AlexaChannel":
      return alexaChannelDeserializer(item as AlexaChannel);

    case "FacebookChannel":
      return facebookChannelDeserializer(item as FacebookChannel);

    case "EmailChannel":
      return emailChannelDeserializer(item as EmailChannel);

    case "OutlookChannel":
      return outlookChannelDeserializer(item as OutlookChannel);

    case "MsTeamsChannel":
      return msTeamsChannelDeserializer(item as MsTeamsChannel);

    case "SkypeChannel":
      return skypeChannelDeserializer(item as SkypeChannel);

    case "KikChannel":
      return kikChannelDeserializer(item as KikChannel);

    case "WebChatChannel":
      return webChatChannelDeserializer(item as WebChatChannel);

    case "DirectLineChannel":
      return directLineChannelDeserializer(item as DirectLineChannel);

    case "TelegramChannel":
      return telegramChannelDeserializer(item as TelegramChannel);

    case "SmsChannel":
      return smsChannelDeserializer(item as SmsChannel);

    case "SlackChannel":
      return slackChannelDeserializer(item as SlackChannel);

    case "LineChannel":
      return lineChannelDeserializer(item as LineChannel);

    case "DirectLineSpeechChannel":
      return directLineSpeechChannelDeserializer(item as DirectLineSpeechChannel);

    case "Omnichannel":
      return omnichannelDeserializer(item as Omnichannel);

    case "TelephonyChannel":
      return telephonyChannelDeserializer(item as TelephonyChannel);

    case "AcsChatChannel":
      return acsChatChannelDeserializer(item as AcsChatChannel);

    case "SearchAssistant":
      return searchAssistantDeserializer(item as SearchAssistant);

    case "M365Extensions":
      return m365ExtensionsDeserializer(item as M365Extensions);

    default:
      return channelDeserializer(item);
  }
}

/** Alexa channel definition */
export interface AlexaChannel extends Channel {
  /** The set of properties specific to Alexa channel resource */
  properties?: AlexaChannelProperties;
  /** The channel name */
  channelName: "AlexaChannel";
}

export function alexaChannelSerializer(item: AlexaChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : alexaChannelPropertiesSerializer(item["properties"]),
  };
}

export function alexaChannelDeserializer(item: any): AlexaChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : alexaChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Alexa channel. */
export interface AlexaChannelProperties {
  /** The Alexa skill Id */
  alexaSkillId: string;
  /** Url fragment used in part of the Uri configured in Alexa */
  readonly urlFragment?: string;
  /** Full Uri used to configured the skill in Alexa */
  readonly serviceEndpointUri?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function alexaChannelPropertiesSerializer(item: AlexaChannelProperties): any {
  return { alexaSkillId: item["alexaSkillId"], isEnabled: item["isEnabled"] };
}

export function alexaChannelPropertiesDeserializer(item: any): AlexaChannelProperties {
  return {
    alexaSkillId: item["alexaSkillId"],
    urlFragment: item["urlFragment"],
    serviceEndpointUri: item["serviceEndpointUri"],
    isEnabled: item["isEnabled"],
  };
}

/** Facebook channel definition */
export interface FacebookChannel extends Channel {
  /** The set of properties specific to bot facebook channel */
  properties?: FacebookChannelProperties;
  /** The channel name */
  channelName: "FacebookChannel";
}

export function facebookChannelSerializer(item: FacebookChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : facebookChannelPropertiesSerializer(item["properties"]),
  };
}

export function facebookChannelDeserializer(item: any): FacebookChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : facebookChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Facebook channel. */
export interface FacebookChannelProperties {
  /** Verify token. Value only returned through POST to the action Channel List API, otherwise empty. */
  readonly verifyToken?: string;
  /** The list of Facebook pages */
  pages?: FacebookPage[];
  /** Facebook application id */
  appId: string;
  /** Facebook application secret. Value only returned through POST to the action Channel List API, otherwise empty. */
  appSecret?: string;
  /** Callback Url */
  readonly callbackUrl?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function facebookChannelPropertiesSerializer(item: FacebookChannelProperties): any {
  return {
    pages: !item["pages"] ? item["pages"] : facebookPageArraySerializer(item["pages"]),
    appId: item["appId"],
    appSecret: item["appSecret"],
    isEnabled: item["isEnabled"],
  };
}

export function facebookChannelPropertiesDeserializer(item: any): FacebookChannelProperties {
  return {
    verifyToken: item["verifyToken"],
    pages: !item["pages"] ? item["pages"] : facebookPageArrayDeserializer(item["pages"]),
    appId: item["appId"],
    appSecret: item["appSecret"],
    callbackUrl: item["callbackUrl"],
    isEnabled: item["isEnabled"],
  };
}

export function facebookPageArraySerializer(result: Array<FacebookPage>): any[] {
  return result.map((item) => {
    return facebookPageSerializer(item);
  });
}

export function facebookPageArrayDeserializer(result: Array<FacebookPage>): any[] {
  return result.map((item) => {
    return facebookPageDeserializer(item);
  });
}

/** A Facebook page for Facebook channel registration */
export interface FacebookPage {
  /** Page id */
  id: string;
  /** Facebook application access token. Value only returned through POST to the action Channel List API, otherwise empty. */
  accessToken?: string;
}

export function facebookPageSerializer(item: FacebookPage): any {
  return { id: item["id"], accessToken: item["accessToken"] };
}

export function facebookPageDeserializer(item: any): FacebookPage {
  return {
    id: item["id"],
    accessToken: item["accessToken"],
  };
}

/** Email channel definition */
export interface EmailChannel extends Channel {
  /** The set of properties specific to email channel resource */
  properties?: EmailChannelProperties;
  /** The channel name */
  channelName: "EmailChannel";
}

export function emailChannelSerializer(item: EmailChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : emailChannelPropertiesSerializer(item["properties"]),
  };
}

export function emailChannelDeserializer(item: any): EmailChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : emailChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Email channel. */
export interface EmailChannelProperties {
  /** The email address */
  emailAddress: string;
  /** Email channel auth method. 0 Password (Default); 1 Graph. */
  authMethod?: EmailChannelAuthMethod;
  /** The password for the email address. Value only returned through POST to the action Channel List API, otherwise empty. */
  password?: string;
  /** The magic code for setting up the modern authentication. */
  magicCode?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function emailChannelPropertiesSerializer(item: EmailChannelProperties): any {
  return {
    emailAddress: item["emailAddress"],
    authMethod: item["authMethod"],
    password: item["password"],
    magicCode: item["magicCode"],
    isEnabled: item["isEnabled"],
  };
}

export function emailChannelPropertiesDeserializer(item: any): EmailChannelProperties {
  return {
    emailAddress: item["emailAddress"],
    authMethod: item["authMethod"],
    password: item["password"],
    magicCode: item["magicCode"],
    isEnabled: item["isEnabled"],
  };
}

/** Email channel auth method. 0 Password (Default); 1 Graph. */
export type EmailChannelAuthMethod = 0 | 1;

/** Outlook channel definition */
export interface OutlookChannel extends Channel {
  /** The channel name */
  channelName: "OutlookChannel";
}

export function outlookChannelSerializer(item: OutlookChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function outlookChannelDeserializer(item: any): OutlookChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** Microsoft Teams channel definition */
export interface MsTeamsChannel extends Channel {
  /** The set of properties specific to Microsoft Teams channel resource */
  properties?: MsTeamsChannelProperties;
  /** The channel name */
  channelName: "MsTeamsChannel";
}

export function msTeamsChannelSerializer(item: MsTeamsChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : msTeamsChannelPropertiesSerializer(item["properties"]),
  };
}

export function msTeamsChannelDeserializer(item: any): MsTeamsChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : msTeamsChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Microsoft Teams channel. */
export interface MsTeamsChannelProperties {
  /** Enable calling for Microsoft Teams channel */
  enableCalling?: boolean;
  /** Webhook for Microsoft Teams channel calls */
  callingWebhook?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
  /** Webhook for Microsoft Teams channel calls */
  incomingCallRoute?: string;
  /** Deployment environment for Microsoft Teams channel calls */
  deploymentEnvironment?: string;
  /** Whether this channel accepted terms */
  acceptedTerms?: boolean | null;
}

export function msTeamsChannelPropertiesSerializer(item: MsTeamsChannelProperties): any {
  return {
    enableCalling: item["enableCalling"],
    callingWebhook: item["callingWebhook"],
    isEnabled: item["isEnabled"],
    incomingCallRoute: item["incomingCallRoute"],
    deploymentEnvironment: item["deploymentEnvironment"],
    acceptedTerms: item["acceptedTerms"],
  };
}

export function msTeamsChannelPropertiesDeserializer(item: any): MsTeamsChannelProperties {
  return {
    enableCalling: item["enableCalling"],
    callingWebhook: item["callingWebhook"],
    isEnabled: item["isEnabled"],
    incomingCallRoute: item["incomingCallRoute"],
    deploymentEnvironment: item["deploymentEnvironment"],
    acceptedTerms: item["acceptedTerms"],
  };
}

/** Skype channel definition */
export interface SkypeChannel extends Channel {
  /** The set of properties specific to Skype channel resource */
  properties?: SkypeChannelProperties;
  /** The channel name */
  channelName: "SkypeChannel";
}

export function skypeChannelSerializer(item: SkypeChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : skypeChannelPropertiesSerializer(item["properties"]),
  };
}

export function skypeChannelDeserializer(item: any): SkypeChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : skypeChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Microsoft Teams channel. */
export interface SkypeChannelProperties {
  /** Enable messaging for Skype channel */
  enableMessaging?: boolean;
  /** Enable media cards for Skype channel */
  enableMediaCards?: boolean;
  /** Enable video for Skype channel */
  enableVideo?: boolean;
  /** Enable calling for Skype channel */
  enableCalling?: boolean;
  /** Enable screen sharing for Skype channel */
  enableScreenSharing?: boolean;
  /** Enable groups for Skype channel */
  enableGroups?: boolean;
  /** Group mode for Skype channel */
  groupsMode?: string;
  /** Calling web hook for Skype channel */
  callingWebHook?: string;
  /** Incoming call route for Skype channel */
  incomingCallRoute?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function skypeChannelPropertiesSerializer(item: SkypeChannelProperties): any {
  return {
    enableMessaging: item["enableMessaging"],
    enableMediaCards: item["enableMediaCards"],
    enableVideo: item["enableVideo"],
    enableCalling: item["enableCalling"],
    enableScreenSharing: item["enableScreenSharing"],
    enableGroups: item["enableGroups"],
    groupsMode: item["groupsMode"],
    callingWebHook: item["callingWebHook"],
    incomingCallRoute: item["incomingCallRoute"],
    isEnabled: item["isEnabled"],
  };
}

export function skypeChannelPropertiesDeserializer(item: any): SkypeChannelProperties {
  return {
    enableMessaging: item["enableMessaging"],
    enableMediaCards: item["enableMediaCards"],
    enableVideo: item["enableVideo"],
    enableCalling: item["enableCalling"],
    enableScreenSharing: item["enableScreenSharing"],
    enableGroups: item["enableGroups"],
    groupsMode: item["groupsMode"],
    callingWebHook: item["callingWebHook"],
    incomingCallRoute: item["incomingCallRoute"],
    isEnabled: item["isEnabled"],
  };
}

/** Kik channel definition */
export interface KikChannel extends Channel {
  /** The set of properties specific to Kik channel resource */
  properties?: KikChannelProperties;
  /** The channel name */
  channelName: "KikChannel";
}

export function kikChannelSerializer(item: KikChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : kikChannelPropertiesSerializer(item["properties"]),
  };
}

export function kikChannelDeserializer(item: any): KikChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : kikChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Kik channel. */
export interface KikChannelProperties {
  /** The Kik user name */
  userName: string;
  /** Kik API key. Value only returned through POST to the action Channel List API, otherwise empty. */
  apiKey?: string;
  /** Whether this channel is validated for the bot */
  isValidated?: boolean;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function kikChannelPropertiesSerializer(item: KikChannelProperties): any {
  return {
    userName: item["userName"],
    apiKey: item["apiKey"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

export function kikChannelPropertiesDeserializer(item: any): KikChannelProperties {
  return {
    userName: item["userName"],
    apiKey: item["apiKey"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

/** Web Chat channel definition */
export interface WebChatChannel extends Channel {
  /** The set of properties specific to Web Chat channel resource */
  properties?: WebChatChannelProperties;
  /** The channel name */
  channelName: "WebChatChannel";
}

export function webChatChannelSerializer(item: WebChatChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : webChatChannelPropertiesSerializer(item["properties"]),
  };
}

export function webChatChannelDeserializer(item: any): WebChatChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : webChatChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Web Chat channel. */
export interface WebChatChannelProperties {
  /** Web chat control embed code */
  readonly webChatEmbedCode?: string;
  /** The list of Web Chat sites */
  sites?: WebChatSite[];
}

export function webChatChannelPropertiesSerializer(item: WebChatChannelProperties): any {
  return {
    sites: !item["sites"] ? item["sites"] : webChatSiteArraySerializer(item["sites"]),
  };
}

export function webChatChannelPropertiesDeserializer(item: any): WebChatChannelProperties {
  return {
    webChatEmbedCode: item["webChatEmbedCode"],
    sites: !item["sites"] ? item["sites"] : webChatSiteArrayDeserializer(item["sites"]),
  };
}

export function webChatSiteArraySerializer(result: Array<WebChatSite>): any[] {
  return result.map((item) => {
    return webChatSiteSerializer(item);
  });
}

export function webChatSiteArrayDeserializer(result: Array<WebChatSite>): any[] {
  return result.map((item) => {
    return webChatSiteDeserializer(item);
  });
}

/** A site for the Webchat channel */
export interface WebChatSite extends Site {}

export function webChatSiteSerializer(item: WebChatSite): any {
  return {
    tenantId: item["tenantId"],
    siteName: item["siteName"],
    isEnabled: item["isEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

export function webChatSiteDeserializer(item: any): WebChatSite {
  return {
    tenantId: item["tenantId"],
    siteId: item["siteId"],
    siteName: item["siteName"],
    key: item["key"],
    key2: item["key2"],
    isEnabled: item["isEnabled"],
    isTokenEnabled: item["isTokenEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

/** Direct Line channel definition */
export interface DirectLineChannel extends Channel {
  /** The set of properties specific to Direct Line channel resource */
  properties?: DirectLineChannelProperties;
  /** The channel name */
  channelName: "DirectLineChannel";
}

export function directLineChannelSerializer(item: DirectLineChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : directLineChannelPropertiesSerializer(item["properties"]),
  };
}

export function directLineChannelDeserializer(item: any): DirectLineChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : directLineChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Direct Line channel. */
export interface DirectLineChannelProperties {
  /** The list of Direct Line sites */
  sites?: DirectLineSite[];
  /** The extensionKey1 */
  extensionKey1?: string;
  /** The extensionKey2 */
  extensionKey2?: string;
  /** Direct Line embed code of the resource */
  directLineEmbedCode?: string;
}

export function directLineChannelPropertiesSerializer(item: DirectLineChannelProperties): any {
  return {
    sites: !item["sites"] ? item["sites"] : directLineSiteArraySerializer(item["sites"]),
    extensionKey1: item["extensionKey1"],
    extensionKey2: item["extensionKey2"],
    DirectLineEmbedCode: item["directLineEmbedCode"],
  };
}

export function directLineChannelPropertiesDeserializer(item: any): DirectLineChannelProperties {
  return {
    sites: !item["sites"] ? item["sites"] : directLineSiteArrayDeserializer(item["sites"]),
    extensionKey1: item["extensionKey1"],
    extensionKey2: item["extensionKey2"],
    directLineEmbedCode: item["DirectLineEmbedCode"],
  };
}

export function directLineSiteArraySerializer(result: Array<DirectLineSite>): any[] {
  return result.map((item) => {
    return directLineSiteSerializer(item);
  });
}

export function directLineSiteArrayDeserializer(result: Array<DirectLineSite>): any[] {
  return result.map((item) => {
    return directLineSiteDeserializer(item);
  });
}

/** A site for the Direct Line channel */
export interface DirectLineSite extends Site {}

export function directLineSiteSerializer(item: DirectLineSite): any {
  return {
    tenantId: item["tenantId"],
    siteName: item["siteName"],
    isEnabled: item["isEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

export function directLineSiteDeserializer(item: any): DirectLineSite {
  return {
    tenantId: item["tenantId"],
    siteId: item["siteId"],
    siteName: item["siteName"],
    key: item["key"],
    key2: item["key2"],
    isEnabled: item["isEnabled"],
    isTokenEnabled: item["isTokenEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

/** Telegram channel definition */
export interface TelegramChannel extends Channel {
  /** The set of properties specific to Telegram channel resource */
  properties?: TelegramChannelProperties;
  /** The channel name */
  channelName: "TelegramChannel";
}

export function telegramChannelSerializer(item: TelegramChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : telegramChannelPropertiesSerializer(item["properties"]),
  };
}

export function telegramChannelDeserializer(item: any): TelegramChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : telegramChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Telegram channel. */
export interface TelegramChannelProperties {
  /** The Telegram access token. Value only returned through POST to the action Channel List API, otherwise empty. */
  accessToken?: string;
  /** Whether this channel is validated for the bot */
  isValidated?: boolean;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function telegramChannelPropertiesSerializer(item: TelegramChannelProperties): any {
  return {
    accessToken: item["accessToken"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

export function telegramChannelPropertiesDeserializer(item: any): TelegramChannelProperties {
  return {
    accessToken: item["accessToken"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

/** Sms channel definition */
export interface SmsChannel extends Channel {
  /** The set of properties specific to Sms channel resource */
  properties?: SmsChannelProperties;
  /** The channel name */
  channelName: "SmsChannel";
}

export function smsChannelSerializer(item: SmsChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : smsChannelPropertiesSerializer(item["properties"]),
  };
}

export function smsChannelDeserializer(item: any): SmsChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : smsChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Sms channel. */
export interface SmsChannelProperties {
  /** The Sms phone */
  phone: string;
  /** The Sms account SID. Value only returned through POST to the action Channel List API, otherwise empty. */
  accountSID: string;
  /** The Sms auth token. Value only returned through POST to the action Channel List API, otherwise empty. */
  authToken?: string;
  /** Whether this channel is validated for the bot */
  isValidated?: boolean;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function smsChannelPropertiesSerializer(item: SmsChannelProperties): any {
  return {
    phone: item["phone"],
    accountSID: item["accountSID"],
    authToken: item["authToken"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

export function smsChannelPropertiesDeserializer(item: any): SmsChannelProperties {
  return {
    phone: item["phone"],
    accountSID: item["accountSID"],
    authToken: item["authToken"],
    isValidated: item["isValidated"],
    isEnabled: item["isEnabled"],
  };
}

/** Slack channel definition */
export interface SlackChannel extends Channel {
  /** The set of properties specific to Slack channel resource */
  properties?: SlackChannelProperties;
  /** The channel name */
  channelName: "SlackChannel";
}

export function slackChannelSerializer(item: SlackChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : slackChannelPropertiesSerializer(item["properties"]),
  };
}

export function slackChannelDeserializer(item: any): SlackChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : slackChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Slack channel. */
export interface SlackChannelProperties {
  /** The Slack client id */
  clientId?: string;
  /** The Slack client secret. Value only returned through POST to the action Channel List API, otherwise empty. */
  clientSecret?: string;
  /** The Slack verification token. Value only returned through POST to the action Channel List API, otherwise empty. */
  verificationToken?: string;
  /** The Slack permission scopes. */
  scopes?: string;
  /** The Slack landing page Url */
  landingPageUrl?: string;
  /** The Slack redirect action */
  readonly redirectAction?: string;
  /** The Sms auth token */
  readonly lastSubmissionId?: string;
  /** Whether to register the settings before OAuth validation is performed. Recommended to True. */
  registerBeforeOAuthFlow?: boolean;
  /** Whether this channel is validated for the bot */
  readonly isValidated?: boolean;
  /** The Slack signing secret. */
  signingSecret?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled: boolean;
}

export function slackChannelPropertiesSerializer(item: SlackChannelProperties): any {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    verificationToken: item["verificationToken"],
    scopes: item["scopes"],
    landingPageUrl: item["landingPageUrl"],
    registerBeforeOAuthFlow: item["registerBeforeOAuthFlow"],
    signingSecret: item["signingSecret"],
    isEnabled: item["isEnabled"],
  };
}

export function slackChannelPropertiesDeserializer(item: any): SlackChannelProperties {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    verificationToken: item["verificationToken"],
    scopes: item["scopes"],
    landingPageUrl: item["landingPageUrl"],
    redirectAction: item["redirectAction"],
    lastSubmissionId: item["lastSubmissionId"],
    registerBeforeOAuthFlow: item["registerBeforeOAuthFlow"],
    isValidated: item["IsValidated"],
    signingSecret: item["signingSecret"],
    isEnabled: item["isEnabled"],
  };
}

/** Line channel definition */
export interface LineChannel extends Channel {
  /** The set of properties specific to line channel resource */
  properties?: LineChannelProperties;
  /** The channel name */
  channelName: "LineChannel";
}

export function lineChannelSerializer(item: LineChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : lineChannelPropertiesSerializer(item["properties"]),
  };
}

export function lineChannelDeserializer(item: any): LineChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : lineChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Line channel. */
export interface LineChannelProperties {
  /** The list of line channel registrations */
  lineRegistrations: LineRegistration[];
  /** Callback Url to enter in line registration. */
  readonly callbackUrl?: string;
  /** Whether this channel is validated for the bot */
  readonly isValidated?: boolean;
}

export function lineChannelPropertiesSerializer(item: LineChannelProperties): any {
  return {
    lineRegistrations: lineRegistrationArraySerializer(item["lineRegistrations"]),
  };
}

export function lineChannelPropertiesDeserializer(item: any): LineChannelProperties {
  return {
    lineRegistrations: lineRegistrationArrayDeserializer(item["lineRegistrations"]),
    callbackUrl: item["callbackUrl"],
    isValidated: item["isValidated"],
  };
}

export function lineRegistrationArraySerializer(result: Array<LineRegistration>): any[] {
  return result.map((item) => {
    return lineRegistrationSerializer(item);
  });
}

export function lineRegistrationArrayDeserializer(result: Array<LineRegistration>): any[] {
  return result.map((item) => {
    return lineRegistrationDeserializer(item);
  });
}

/** The properties corresponding to a line channel registration */
export interface LineRegistration {
  /** Id generated for the line channel registration */
  readonly generatedId?: string;
  /** Secret for the line channel registration */
  channelSecret?: string;
  /** Access token for the line channel registration */
  channelAccessToken?: string;
}

export function lineRegistrationSerializer(item: LineRegistration): any {
  return {
    channelSecret: item["channelSecret"],
    channelAccessToken: item["channelAccessToken"],
  };
}

export function lineRegistrationDeserializer(item: any): LineRegistration {
  return {
    generatedId: item["generatedId"],
    channelSecret: item["channelSecret"],
    channelAccessToken: item["channelAccessToken"],
  };
}

/** DirectLine Speech channel definition */
export interface DirectLineSpeechChannel extends Channel {
  /** The set of properties specific to DirectLine Speech channel resource */
  properties?: DirectLineSpeechChannelProperties;
  /** The channel name */
  channelName: "DirectLineSpeechChannel";
}

export function directLineSpeechChannelSerializer(item: DirectLineSpeechChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : directLineSpeechChannelPropertiesSerializer(item["properties"]),
  };
}

export function directLineSpeechChannelDeserializer(item: any): DirectLineSpeechChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : directLineSpeechChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the DirectLine Speech channel. */
export interface DirectLineSpeechChannelProperties {
  /** The cognitive service id with this channel registration. */
  cognitiveServiceResourceId?: string;
  /** The cognitive service region with this channel registration. */
  cognitiveServiceRegion?: string | null;
  /** The cognitive service subscription key to use with this channel registration. */
  cognitiveServiceSubscriptionKey?: string | null;
  /** Whether this channel is enabled or not. */
  isEnabled?: boolean;
  /** Custom speech model id (optional). */
  customVoiceDeploymentId?: string;
  /** Custom voice deployment id (optional). */
  customSpeechModelId?: string;
  /** Make this a default bot for chosen cognitive service account. */
  isDefaultBotForCogSvcAccount?: boolean;
}

export function directLineSpeechChannelPropertiesSerializer(
  item: DirectLineSpeechChannelProperties,
): any {
  return {
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    isEnabled: item["isEnabled"],
    customVoiceDeploymentId: item["customVoiceDeploymentId"],
    customSpeechModelId: item["customSpeechModelId"],
    isDefaultBotForCogSvcAccount: item["isDefaultBotForCogSvcAccount"],
  };
}

export function directLineSpeechChannelPropertiesDeserializer(
  item: any,
): DirectLineSpeechChannelProperties {
  return {
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    isEnabled: item["isEnabled"],
    customVoiceDeploymentId: item["customVoiceDeploymentId"],
    customSpeechModelId: item["customSpeechModelId"],
    isDefaultBotForCogSvcAccount: item["isDefaultBotForCogSvcAccount"],
  };
}

/** Omnichannel channel definition */
export interface Omnichannel extends Channel {
  /** The channel name */
  channelName: "Omnichannel";
}

export function omnichannelSerializer(item: Omnichannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function omnichannelDeserializer(item: any): Omnichannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** Telephony channel definition */
export interface TelephonyChannel extends Channel {
  /** The set of properties specific to Telephony channel resource */
  properties?: TelephonyChannelProperties;
  /** The channel name */
  channelName: "TelephonyChannel";
}

export function telephonyChannelSerializer(item: TelephonyChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : telephonyChannelPropertiesSerializer(item["properties"]),
  };
}

export function telephonyChannelDeserializer(item: any): TelephonyChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : telephonyChannelPropertiesDeserializer(item["properties"]),
  };
}

/** The parameters to provide for the Direct Line channel. */
export interface TelephonyChannelProperties {
  /** The list of Telephony phone numbers */
  phoneNumbers?: TelephonyPhoneNumbers[];
  /** The list of Telephony api configuration */
  apiConfigurations?: TelephonyChannelResourceApiConfiguration[];
  /** The extensionKey1 */
  cognitiveServiceSubscriptionKey?: string | null;
  /** The extensionKey2 */
  cognitiveServiceRegion?: string | null;
  /** The default locale of the channel */
  defaultLocale?: string | null;
  /** The premium SKU applied to the channel */
  premiumSKU?: string | null;
  /** Whether the channel is enabled */
  isEnabled?: boolean;
}

export function telephonyChannelPropertiesSerializer(item: TelephonyChannelProperties): any {
  return {
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : telephonyPhoneNumbersArraySerializer(item["phoneNumbers"]),
    apiConfigurations: !item["apiConfigurations"]
      ? item["apiConfigurations"]
      : telephonyChannelResourceApiConfigurationArraySerializer(item["apiConfigurations"]),
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    defaultLocale: item["defaultLocale"],
    premiumSKU: item["premiumSKU"],
    isEnabled: item["isEnabled"],
  };
}

export function telephonyChannelPropertiesDeserializer(item: any): TelephonyChannelProperties {
  return {
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : telephonyPhoneNumbersArrayDeserializer(item["phoneNumbers"]),
    apiConfigurations: !item["apiConfigurations"]
      ? item["apiConfigurations"]
      : telephonyChannelResourceApiConfigurationArrayDeserializer(item["apiConfigurations"]),
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    defaultLocale: item["defaultLocale"],
    premiumSKU: item["premiumSKU"],
    isEnabled: item["isEnabled"],
  };
}

export function telephonyPhoneNumbersArraySerializer(result: Array<TelephonyPhoneNumbers>): any[] {
  return result.map((item) => {
    return telephonyPhoneNumbersSerializer(item);
  });
}

export function telephonyPhoneNumbersArrayDeserializer(
  result: Array<TelephonyPhoneNumbers>,
): any[] {
  return result.map((item) => {
    return telephonyPhoneNumbersDeserializer(item);
  });
}

/** A telephone number for the Telephony channel */
export interface TelephonyPhoneNumbers {
  /** The element id. */
  id?: string;
  /** The phone number. */
  phoneNumber?: string;
  /** The endpoint of ACS. */
  acsEndpoint?: string | null;
  /** The secret of ACS. */
  acsSecret?: string | null;
  /** The resource id of ACS. */
  acsResourceId?: string | null;
  /** The subscription key of cognitive service. */
  cognitiveServiceSubscriptionKey?: string | null;
  /** The service region of cognitive service. */
  cognitiveServiceRegion?: string | null;
  /** The resource id of cognitive service. */
  cognitiveServiceResourceId?: string | null;
  /** The default locale of the phone number. */
  defaultLocale?: string | null;
  /** Optional Property that will determine the offering type of the phone. */
  offerType?: string | null;
}

export function telephonyPhoneNumbersSerializer(item: TelephonyPhoneNumbers): any {
  return {
    id: item["id"],
    phoneNumber: item["phoneNumber"],
    acsEndpoint: item["acsEndpoint"],
    acsSecret: item["acsSecret"],
    acsResourceId: item["acsResourceId"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    defaultLocale: item["defaultLocale"],
    offerType: item["offerType"],
  };
}

export function telephonyPhoneNumbersDeserializer(item: any): TelephonyPhoneNumbers {
  return {
    id: item["id"],
    phoneNumber: item["phoneNumber"],
    acsEndpoint: item["acsEndpoint"],
    acsSecret: item["acsSecret"],
    acsResourceId: item["acsResourceId"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    defaultLocale: item["defaultLocale"],
    offerType: item["offerType"],
  };
}

export function telephonyChannelResourceApiConfigurationArraySerializer(
  result: Array<TelephonyChannelResourceApiConfiguration>,
): any[] {
  return result.map((item) => {
    return telephonyChannelResourceApiConfigurationSerializer(item);
  });
}

export function telephonyChannelResourceApiConfigurationArrayDeserializer(
  result: Array<TelephonyChannelResourceApiConfiguration>,
): any[] {
  return result.map((item) => {
    return telephonyChannelResourceApiConfigurationDeserializer(item);
  });
}

/** A resource Api configuration for the Telephony channel */
export interface TelephonyChannelResourceApiConfiguration {
  /** The id of config. */
  id?: string;
  /** The provider name. */
  providerName?: string | null;
  /** The cognitive service subscription key. */
  cognitiveServiceSubscriptionKey?: string | null;
  /** The cognitive service region. */
  cognitiveServiceRegion?: string | null;
  /** The cognitive service resourceId. */
  cognitiveServiceResourceId?: string | null;
  /** The default locale. */
  defaultLocale?: string | null;
}

export function telephonyChannelResourceApiConfigurationSerializer(
  item: TelephonyChannelResourceApiConfiguration,
): any {
  return {
    id: item["id"],
    providerName: item["providerName"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    defaultLocale: item["defaultLocale"],
  };
}

export function telephonyChannelResourceApiConfigurationDeserializer(
  item: any,
): TelephonyChannelResourceApiConfiguration {
  return {
    id: item["id"],
    providerName: item["providerName"],
    cognitiveServiceSubscriptionKey: item["cognitiveServiceSubscriptionKey"],
    cognitiveServiceRegion: item["cognitiveServiceRegion"],
    cognitiveServiceResourceId: item["cognitiveServiceResourceId"],
    defaultLocale: item["defaultLocale"],
  };
}

/** AcsChat channel definition */
export interface AcsChatChannel extends Channel {
  /** The channel name */
  channelName: "AcsChatChannel";
}

export function acsChatChannelSerializer(item: AcsChatChannel): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function acsChatChannelDeserializer(item: any): AcsChatChannel {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** SearchAssistant definition */
export interface SearchAssistant extends Channel {
  /** The channel name */
  channelName: "SearchAssistant";
}

export function searchAssistantSerializer(item: SearchAssistant): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function searchAssistantDeserializer(item: any): SearchAssistant {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** M365 Extensions definition */
export interface M365Extensions extends Channel {
  /** The channel name */
  channelName: "M365Extensions";
}

export function m365ExtensionsSerializer(item: M365Extensions): any {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    location: item["location"],
  };
}

export function m365ExtensionsDeserializer(item: any): M365Extensions {
  return {
    channelName: item["channelName"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
    location: item["location"],
  };
}

/** A site for the channel */
export interface Site {
  /** Tenant Id */
  tenantId?: string;
  /** Site Id */
  readonly siteId?: string;
  /** Site name */
  siteName: string;
  /** Primary key. Value only returned through POST to the action Channel List API, otherwise empty. */
  readonly key?: string;
  /** Secondary key. Value only returned through POST to the action Channel List API, otherwise empty. */
  readonly key2?: string;
  /** Whether this site is enabled for DirectLine channel */
  isEnabled: boolean;
  /** Whether this site is token enabled for channel */
  readonly isTokenEnabled?: boolean;
  /** Whether this site is EndpointParameters enabled for channel */
  isEndpointParametersEnabled?: boolean;
  /** Whether this site is disabled detailed logging for */
  isDetailedLoggingEnabled?: boolean;
  /** Whether this site is enabled for block user upload. */
  isBlockUserUploadEnabled?: boolean | null;
  /** Whether this no-storage site is disabled detailed logging for */
  isNoStorageEnabled?: boolean;
  /** Entity Tag */
  eTag?: string;
  /** DirectLine application id */
  appId?: string;
  /** Whether this site is enabled for Bot Framework V1 protocol. */
  isV1Enabled?: boolean;
  /** Whether this site is enabled for Bot Framework V3 protocol. */
  isV3Enabled?: boolean;
  /** Whether this site is enabled for authentication with Bot Framework. */
  isSecureSiteEnabled?: boolean;
  /** List of Trusted Origin URLs for this site. This field is applicable only if isSecureSiteEnabled is True. */
  trustedOrigins?: string[];
  /** Whether this site is enabled for Webchat Speech */
  isWebChatSpeechEnabled?: boolean;
  /** Whether this site is enabled for preview versions of Webchat */
  isWebchatPreviewEnabled?: boolean;
}

export function siteSerializer(item: Site): any {
  return {
    tenantId: item["tenantId"],
    siteName: item["siteName"],
    isEnabled: item["isEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

export function siteDeserializer(item: any): Site {
  return {
    tenantId: item["tenantId"],
    siteId: item["siteId"],
    siteName: item["siteName"],
    key: item["key"],
    key2: item["key2"],
    isEnabled: item["isEnabled"],
    isTokenEnabled: item["isTokenEnabled"],
    isEndpointParametersEnabled: item["isEndpointParametersEnabled"],
    isDetailedLoggingEnabled: item["isDetailedLoggingEnabled"],
    isBlockUserUploadEnabled: item["isBlockUserUploadEnabled"],
    isNoStorageEnabled: item["isNoStorageEnabled"],
    eTag: item["eTag"],
    appId: item["appId"],
    isV1Enabled: item["isV1Enabled"],
    isV3Enabled: item["isV3Enabled"],
    isSecureSiteEnabled: item["isSecureSiteEnabled"],
    trustedOrigins: !item["trustedOrigins"]
      ? item["trustedOrigins"]
      : item["trustedOrigins"].map((p: any) => {
          return p;
        }),
    isWebChatSpeechEnabled: item["isWebChatSpeechEnabled"],
    isWebchatPreviewEnabled: item["isWebchatPreviewEnabled"],
  };
}

/** The list of bot service channel operation response. */
export interface _ChannelResponseList {
  /** The BotChannel items on this page */
  readonly value: BotChannel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _channelResponseListDeserializer(item: any): _ChannelResponseList {
  return {
    value: botChannelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function botChannelArraySerializer(result: Array<BotChannel>): any[] {
  return result.map((item) => {
    return botChannelSerializer(item);
  });
}

export function botChannelArrayDeserializer(result: Array<BotChannel>): any[] {
  return result.map((item) => {
    return botChannelDeserializer(item);
  });
}

/** The ARM channel of list channel with keys operation response. */
export interface ListChannelWithKeysResponse extends BotChannel {
  /** The set of properties specific to bot channel resource */
  resource?: ChannelUnion;
  /** Channel settings */
  setting?: ChannelSettings;
  /** Provisioning state of the resource */
  provisioningState?: string;
  /** Entity tag of the resource */
  entityTag?: string;
  /** Changed time of the resource */
  changedTime?: string;
}

export function listChannelWithKeysResponseDeserializer(item: any): ListChannelWithKeysResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : channelUnionDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    resource: !item["resource"] ? item["resource"] : channelUnionDeserializer(item["resource"]),
    setting: !item["setting"] ? item["setting"] : channelSettingsDeserializer(item["setting"]),
    provisioningState: item["provisioningState"],
    entityTag: item["entityTag"],
    changedTime: item["changedTime"],
  };
}

/** Channel settings definition */
export interface ChannelSettings {
  /** The extensionKey1 */
  extensionKey1?: string;
  /** The extensionKey2 */
  extensionKey2?: string;
  /** The list of sites */
  sites?: Site[];
  /** The channel id */
  channelId?: string;
  /** The channel display name */
  channelDisplayName?: string;
  /** The bot id */
  botId?: string;
  /** The bot icon url */
  botIconUrl?: string;
  /** Whether this channel is enabled for the bot */
  isEnabled?: boolean;
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** Whether customer needs to agree to new terms. */
  requireTermsAgreement?: boolean;
}

export function channelSettingsDeserializer(item: any): ChannelSettings {
  return {
    extensionKey1: item["extensionKey1"],
    extensionKey2: item["extensionKey2"],
    sites: !item["sites"] ? item["sites"] : siteArrayDeserializer(item["sites"]),
    channelId: item["channelId"],
    channelDisplayName: item["channelDisplayName"],
    botId: item["botId"],
    botIconUrl: item["botIconUrl"],
    isEnabled: item["isEnabled"],
    disableLocalAuth: item["disableLocalAuth"],
    requireTermsAgreement: item["requireTermsAgreement"],
  };
}

export function siteArraySerializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteSerializer(item);
  });
}

export function siteArrayDeserializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteDeserializer(item);
  });
}

/** Site information for WebChat or DirectLine Channels to identify which site to regenerate keys for. */
export interface SiteInfo {
  /** The site name */
  siteName: string;
  /** Determines which key is to be regenerated */
  key: Key;
}

export function siteInfoSerializer(item: SiteInfo): any {
  return { siteName: item["siteName"], key: item["key"] };
}

/** Determines which key is to be regenerated */
export type Key = "key1" | "key2";

/** Bot channel resource definition */
export interface ConnectionSetting extends ProxyResource {
  /** The set of properties specific to bot channel resource */
  properties?: ConnectionSettingProperties;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** Gets or sets the SKU of the resource. */
  sku?: Sku;
  /** Required. Gets or sets the Kind of the resource. */
  kind?: Kind;
  /** Entity Tag. */
  etag?: string;
  /** Entity zones */
  readonly zones?: string[];
}

export function connectionSettingSerializer(item: ConnectionSetting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectionSettingPropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function connectionSettingDeserializer(item: any): ConnectionSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectionSettingPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties for a Connection Setting Item */
export interface ConnectionSettingProperties {
  /** Id of the Connection Setting. */
  id?: string;
  /** Name of the Connection Setting. */
  name?: string;
  /** Client Id associated with the Connection Setting. */
  clientId?: string;
  /** Setting Id set by the service for the Connection Setting. */
  readonly settingId?: string;
  /** Client Secret associated with the Connection Setting */
  clientSecret?: string;
  /** Scopes associated with the Connection Setting */
  scopes?: string;
  /** Service Provider Id associated with the Connection Setting */
  serviceProviderId?: string;
  /** Service Provider Display Name associated with the Connection Setting */
  serviceProviderDisplayName?: string;
  /** Service Provider Parameters associated with the Connection Setting */
  parameters?: ConnectionSettingParameter[];
  /** Provisioning state of the resource */
  provisioningState?: string;
}

export function connectionSettingPropertiesSerializer(item: ConnectionSettingProperties): any {
  return {
    id: item["id"],
    name: item["name"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    scopes: item["scopes"],
    serviceProviderId: item["serviceProviderId"],
    serviceProviderDisplayName: item["serviceProviderDisplayName"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : connectionSettingParameterArraySerializer(item["parameters"]),
    provisioningState: item["provisioningState"],
  };
}

export function connectionSettingPropertiesDeserializer(item: any): ConnectionSettingProperties {
  return {
    id: item["id"],
    name: item["name"],
    clientId: item["clientId"],
    settingId: item["settingId"],
    clientSecret: item["clientSecret"],
    scopes: item["scopes"],
    serviceProviderId: item["serviceProviderId"],
    serviceProviderDisplayName: item["serviceProviderDisplayName"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : connectionSettingParameterArrayDeserializer(item["parameters"]),
    provisioningState: item["provisioningState"],
  };
}

export function connectionSettingParameterArraySerializer(
  result: Array<ConnectionSettingParameter>,
): any[] {
  return result.map((item) => {
    return connectionSettingParameterSerializer(item);
  });
}

export function connectionSettingParameterArrayDeserializer(
  result: Array<ConnectionSettingParameter>,
): any[] {
  return result.map((item) => {
    return connectionSettingParameterDeserializer(item);
  });
}

/** Extra Parameter in a Connection Setting Properties to indicate service provider specific properties */
export interface ConnectionSettingParameter {
  /** Key for the Connection Setting Parameter. */
  key?: string;
  /** Value associated with the Connection Setting Parameter. */
  value?: string | null;
}

export function connectionSettingParameterSerializer(item: ConnectionSettingParameter): any {
  return { key: item["key"], value: item["value"] };
}

export function connectionSettingParameterDeserializer(item: any): ConnectionSettingParameter {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The list of bot service connection settings response. */
export interface _ConnectionSettingResponseList {
  /** The ConnectionSetting items on this page */
  readonly value: ConnectionSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionSettingResponseListDeserializer(
  item: any,
): _ConnectionSettingResponseList {
  return {
    value: connectionSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionSettingArraySerializer(result: Array<ConnectionSetting>): any[] {
  return result.map((item) => {
    return connectionSettingSerializer(item);
  });
}

export function connectionSettingArrayDeserializer(result: Array<ConnectionSetting>): any[] {
  return result.map((item) => {
    return connectionSettingDeserializer(item);
  });
}

/** The list of bot service providers response. */
export interface ServiceProviderResponseList {
  /** The link used to get the next page of bot service providers. */
  nextLink?: string;
  /** Gets the list of bot service providers and their properties. */
  readonly value?: ServiceProvider[];
}

export function serviceProviderResponseListDeserializer(item: any): ServiceProviderResponseList {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : serviceProviderArrayDeserializer(item["value"]),
  };
}

export function serviceProviderArrayDeserializer(result: Array<ServiceProvider>): any[] {
  return result.map((item) => {
    return serviceProviderDeserializer(item);
  });
}

/** Service Provider Definition */
export interface ServiceProvider {
  /** The Properties of a Service Provider Object */
  properties?: ServiceProviderProperties;
}

export function serviceProviderDeserializer(item: any): ServiceProvider {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceProviderPropertiesDeserializer(item["properties"]),
  };
}

/** The Object used to describe a Service Provider supported by Bot Service */
export interface ServiceProviderProperties {
  /** Id for Service Provider */
  readonly id?: string;
  /** Display Name of the Service Provider */
  readonly displayName?: string;
  /** Name of the Service Provider */
  readonly serviceProviderName?: string;
  /** URL of Dev Portal */
  readonly devPortalUrl?: string;
  /** The URL of icon */
  iconUrl?: string;
  /** The list of parameters for the Service Provider */
  parameters?: ServiceProviderParameter[];
}

export function serviceProviderPropertiesDeserializer(item: any): ServiceProviderProperties {
  return {
    id: item["id"],
    displayName: item["displayName"],
    serviceProviderName: item["serviceProviderName"],
    devPortalUrl: item["devPortalUrl"],
    iconUrl: item["iconUrl"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : serviceProviderParameterArrayDeserializer(item["parameters"]),
  };
}

export function serviceProviderParameterArrayDeserializer(
  result: Array<ServiceProviderParameter>,
): any[] {
  return result.map((item) => {
    return serviceProviderParameterDeserializer(item);
  });
}

/** Extra Parameters specific to each Service Provider */
export interface ServiceProviderParameter {
  /** Name of the Service Provider */
  readonly name?: string;
  /** Type of the Service Provider */
  readonly type?: string;
  /** Display Name of the Service Provider */
  readonly displayName?: string;
  /** Description of the Service Provider */
  readonly description?: string;
  /** Help Url for the  Service Provider */
  readonly helpUrl?: string;
  /** Default Name for the Service Provider */
  readonly default?: string;
  /** Meta data for the Service Provider */
  readonly metadata?: ServiceProviderParameterMetadata;
}

export function serviceProviderParameterDeserializer(item: any): ServiceProviderParameter {
  return {
    name: item["name"],
    type: item["type"],
    displayName: item["displayName"],
    description: item["description"],
    helpUrl: item["helpUrl"],
    default: item["default"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : serviceProviderParameterMetadataDeserializer(item["metadata"]),
  };
}

/** Meta data for the Service Provider */
export interface ServiceProviderParameterMetadata {
  /** the constraints of the bot meta data. */
  constraints?: ServiceProviderParameterMetadataConstraints;
}

export function serviceProviderParameterMetadataDeserializer(
  item: any,
): ServiceProviderParameterMetadata {
  return {
    constraints: !item["constraints"]
      ? item["constraints"]
      : serviceProviderParameterMetadataConstraintsDeserializer(item["constraints"]),
  };
}

/** the constraints of the bot meta data. */
export interface ServiceProviderParameterMetadataConstraints {
  /** Whether required the constraints of the bot meta data. */
  required?: boolean;
}

export function serviceProviderParameterMetadataConstraintsDeserializer(
  item: any,
): ServiceProviderParameterMetadataConstraints {
  return {
    required: item["required"],
  };
}

/** The request body for a request to Bot Service Management to list QnA Maker endpoint keys. */
export interface QnAMakerEndpointKeysRequestBody {
  /** the host name of the QnA Maker endpoint */
  hostname?: string;
  /** Subscription key which provides access to this API. */
  authkey?: string;
}

export function qnAMakerEndpointKeysRequestBodySerializer(
  item: QnAMakerEndpointKeysRequestBody,
): any {
  return { hostname: item["hostname"], authkey: item["authkey"] };
}

/** Schema for EndpointKeys generate/refresh operations. */
export interface QnAMakerEndpointKeysResponse {
  /** Primary Access Key. */
  primaryEndpointKey?: string;
  /** Secondary Access Key. */
  secondaryEndpointKey?: string;
  /** Current version of runtime. */
  installedVersion?: string;
  /** Latest version of runtime. */
  lastStableVersion?: string;
}

export function qnAMakerEndpointKeysResponseDeserializer(item: any): QnAMakerEndpointKeysResponse {
  return {
    primaryEndpointKey: item["primaryEndpointKey"],
    secondaryEndpointKey: item["secondaryEndpointKey"],
    installedVersion: item["installedVersion"],
    lastStableVersion: item["lastStableVersion"],
  };
}

/** The response body returned for a request to Bot Service Management to check per subscription hostSettings */
export interface HostSettingsResponse {
  /** For in-conversation bot user authentication */
  oAuthUrl?: string;
  /** For verifying incoming tokens from the channels */
  toBotFromChannelOpenIdMetadataUrl?: string;
  /** For verifying incoming tokens from the channels */
  toBotFromChannelTokenIssuer?: string;
  /** For verifying incoming tokens from bot emulator */
  toBotFromEmulatorOpenIdMetadataUrl?: string;
  /** For getting access token to channels from bot host */
  toChannelFromBotLoginUrl?: string;
  /** For getting access token to channels from bot host */
  toChannelFromBotOAuthScope?: string;
  /** Per cloud OAuth setting on whether authority is validated */
  validateAuthority?: boolean;
  /** Same as toBotFromChannelOpenIdMetadataUrl, used by SDK < v4.12 */
  botOpenIdMetadata?: string;
}

export function hostSettingsResponseDeserializer(item: any): HostSettingsResponse {
  return {
    oAuthUrl: item["OAuthUrl"],
    toBotFromChannelOpenIdMetadataUrl: item["ToBotFromChannelOpenIdMetadataUrl"],
    toBotFromChannelTokenIssuer: item["ToBotFromChannelTokenIssuer"],
    toBotFromEmulatorOpenIdMetadataUrl: item["ToBotFromEmulatorOpenIdMetadataUrl"],
    toChannelFromBotLoginUrl: item["ToChannelFromBotLoginUrl"],
    toChannelFromBotOAuthScope: item["ToChannelFromBotOAuthScope"],
    validateAuthority: item["ValidateAuthority"],
    botOpenIdMetadata: item["BotOpenIdMetadata"],
  };
}

/** The properties indicating the operation result of an operation on a service. */
export interface OperationResultsDescription {
  /** The ID of the operation returned. */
  readonly id?: string;
  /** The name of the operation result. */
  readonly name?: string;
  /** The status of the operation being performed. */
  readonly status?: OperationResultStatus;
  /** The time that the operation was started. */
  readonly startTime?: Date;
}

export function operationResultsDescriptionDeserializer(item: any): OperationResultsDescription {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** The status of the operation being performed. */
export enum KnownOperationResultStatus {
  Canceled = "Canceled",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Requested = "Requested",
  Running = "Running",
}

/**
 * The status of the operation being performed. \
 * {@link KnownOperationResultStatus} can be used interchangeably with OperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled** \
 * **Succeeded** \
 * **Failed** \
 * **Requested** \
 * **Running**
 */
export type OperationResultStatus = string;
/** Type of ChannelName */
export type ChannelName =
  | "AlexaChannel"
  | "FacebookChannel"
  | "EmailChannel"
  | "KikChannel"
  | "TelegramChannel"
  | "SlackChannel"
  | "MsTeamsChannel"
  | "SkypeChannel"
  | "WebChatChannel"
  | "DirectLineChannel"
  | "SmsChannel"
  | "LineChannel"
  | "DirectLineSpeechChannel"
  | "OutlookChannel"
  | "Omnichannel"
  | "TelephonyChannel"
  | "AcsChatChannel"
  | "SearchAssistant"
  | "M365Extensions";
/** Type of RegenerateKeysChannelName */
export type RegenerateKeysChannelName = "WebChatChannel" | "DirectLineChannel";

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-09-15-preview API version. */
  V20230915Preview = "2023-09-15-preview",
}
