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

/** PaloAltoNetworks GlobalRulestack */
export interface GlobalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: RulestackProperties;
  /** Global Location */
  location: string;
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
}

export function globalRulestackResourceSerializer(item: GlobalRulestackResource): any {
  return {
    properties: rulestackPropertiesSerializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
  };
}

export function globalRulestackResourceDeserializer(item: any): GlobalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: rulestackPropertiesDeserializer(item["properties"]),
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesDeserializer(item["identity"]),
  };
}

/** PAN Rulestack Describe Object */
export interface RulestackProperties {
  /** PanEtag info */
  panEtag?: string;
  /** Rulestack Location, Required for GlobalRulestacks, Not for LocalRulestacks */
  panLocation?: string;
  /** Rulestack Type */
  scope?: ScopeType;
  /** subscription scope of global rulestack */
  associatedSubscriptions?: string[];
  /** rulestack description */
  description?: string;
  /** Mode for default rules creation */
  defaultMode?: DefaultMode;
  /** minimum version */
  minAppIdVersion?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Security Profile */
  securityServices?: SecurityServices;
}

export function rulestackPropertiesSerializer(item: RulestackProperties): any {
  return {
    panEtag: item["panEtag"],
    panLocation: item["panLocation"],
    scope: item["scope"],
    associatedSubscriptions: !item["associatedSubscriptions"]
      ? item["associatedSubscriptions"]
      : item["associatedSubscriptions"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    defaultMode: item["defaultMode"],
    minAppIdVersion: item["minAppIdVersion"],
    securityServices: !item["securityServices"]
      ? item["securityServices"]
      : securityServicesSerializer(item["securityServices"]),
  };
}

export function rulestackPropertiesDeserializer(item: any): RulestackProperties {
  return {
    panEtag: item["panEtag"],
    panLocation: item["panLocation"],
    scope: item["scope"],
    associatedSubscriptions: !item["associatedSubscriptions"]
      ? item["associatedSubscriptions"]
      : item["associatedSubscriptions"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    defaultMode: item["defaultMode"],
    minAppIdVersion: item["minAppIdVersion"],
    provisioningState: item["provisioningState"],
    securityServices: !item["securityServices"]
      ? item["securityServices"]
      : securityServicesDeserializer(item["securityServices"]),
  };
}

/** Rulestack Type */
export enum KnownScopeType {
  /** LOCAL */
  Local = "LOCAL",
  /** GLOBAL */
  Global = "GLOBAL",
}

/**
 * Rulestack Type \
 * {@link KnownScopeType} can be used interchangeably with ScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LOCAL** \
 * **GLOBAL**
 */
export type ScopeType = string;

/** Type for Default Mode for rules creation */
export enum KnownDefaultMode {
  /** IPS */
  IPS = "IPS",
  /** FIREWALL */
  Firewall = "FIREWALL",
  /** NONE */
  None = "NONE",
}

/**
 * Type for Default Mode for rules creation \
 * {@link KnownDefaultMode} can be used interchangeably with DefaultMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPS** \
 * **FIREWALL** \
 * **NONE**
 */
export type DefaultMode = string;

/** Provisioning state of the firewall resource. */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleted */
  Deleted = "Deleted",
  /** NotSpecified */
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning state of the firewall resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Deleted** \
 * **NotSpecified**
 */
export type ProvisioningState = string;

/** security services */
export interface SecurityServices {
  /** IPs Vulnerability Profile Data */
  vulnerabilityProfile?: string;
  /** Anti spyware Profile data */
  antiSpywareProfile?: string;
  /** anti virus profile data */
  antiVirusProfile?: string;
  /** URL filtering profile data */
  urlFilteringProfile?: string;
  /** File blocking profile data */
  fileBlockingProfile?: string;
  /** DNS Subscription profile data */
  dnsSubscription?: string;
  /** Untrusted Egress Decryption profile data */
  outboundUnTrustCertificate?: string;
  /** Trusted Egress Decryption profile data */
  outboundTrustCertificate?: string;
}

export function securityServicesSerializer(item: SecurityServices): any {
  return {
    vulnerabilityProfile: item["vulnerabilityProfile"],
    antiSpywareProfile: item["antiSpywareProfile"],
    antiVirusProfile: item["antiVirusProfile"],
    urlFilteringProfile: item["urlFilteringProfile"],
    fileBlockingProfile: item["fileBlockingProfile"],
    dnsSubscription: item["dnsSubscription"],
    outboundUnTrustCertificate: item["outboundUnTrustCertificate"],
    outboundTrustCertificate: item["outboundTrustCertificate"],
  };
}

export function securityServicesDeserializer(item: any): SecurityServices {
  return {
    vulnerabilityProfile: item["vulnerabilityProfile"],
    antiSpywareProfile: item["antiSpywareProfile"],
    antiVirusProfile: item["antiVirusProfile"],
    urlFilteringProfile: item["urlFilteringProfile"],
    fileBlockingProfile: item["fileBlockingProfile"],
    dnsSubscription: item["dnsSubscription"],
    outboundUnTrustCertificate: item["outboundUnTrustCertificate"],
    outboundTrustCertificate: item["outboundTrustCertificate"],
  };
}

/** The properties of the managed service identities assigned to this resource. */
export interface AzureResourceManagerManagedIdentityProperties {
  /** The Active Directory tenant id of the principal. */
  readonly tenantId?: string;
  /** The active directory identifier of this principal. */
  readonly principalId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, AzureResourceManagerUserAssignedIdentity>;
}

export function azureResourceManagerManagedIdentityPropertiesSerializer(
  item: AzureResourceManagerManagedIdentityProperties,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : azureResourceManagerUserAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function azureResourceManagerManagedIdentityPropertiesDeserializer(
  item: any,
): AzureResourceManagerManagedIdentityProperties {
  return {
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : azureResourceManagerUserAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The kind of managed identity assigned to this resource. */
export enum KnownManagedIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned,UserAssigned */
  SystemAndUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * The kind of managed identity assigned to this resource. \
 * {@link KnownManagedIdentityType} can be used interchangeably with ManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type ManagedIdentityType = string;

export function azureResourceManagerUserAssignedIdentityRecordSerializer(
  item: Record<string, AzureResourceManagerUserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : azureResourceManagerUserAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function azureResourceManagerUserAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, AzureResourceManagerUserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : azureResourceManagerUserAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** A managed identity assigned by the user. */
export interface AzureResourceManagerUserAssignedIdentity {
  /** The active directory client identifier for this principal. */
  clientId?: string;
  /** The active directory identifier for this principal. */
  principalId?: string;
}

export function azureResourceManagerUserAssignedIdentitySerializer(
  item: AzureResourceManagerUserAssignedIdentity,
): any {
  return { clientId: item["clientId"], principalId: item["principalId"] };
}

export function azureResourceManagerUserAssignedIdentityDeserializer(
  item: any,
): AzureResourceManagerUserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
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

/** The type used for update operations of the GlobalRulestackResource. */
export interface GlobalRulestackResourceUpdate {
  /** Global Location */
  location?: string;
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
  /** The updatable properties of the GlobalRulestackResource. */
  properties?: GlobalRulestackResourceUpdateProperties;
}

export function globalRulestackResourceUpdateSerializer(item: GlobalRulestackResourceUpdate): any {
  return {
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : globalRulestackResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the GlobalRulestackResource. */
export interface GlobalRulestackResourceUpdateProperties {
  /** PanEtag info */
  panEtag?: string;
  /** Rulestack Location, Required for GlobalRulestacks, Not for LocalRulestacks */
  panLocation?: string;
  /** Rulestack Type */
  scope?: ScopeType;
  /** subscription scope of global rulestack */
  associatedSubscriptions?: string[];
  /** rulestack description */
  description?: string;
  /** Mode for default rules creation */
  defaultMode?: DefaultMode;
  /** minimum version */
  minAppIdVersion?: string;
  /** Security Profile */
  securityServices?: SecurityServices;
}

export function globalRulestackResourceUpdatePropertiesSerializer(
  item: GlobalRulestackResourceUpdateProperties,
): any {
  return {
    panEtag: item["panEtag"],
    panLocation: item["panLocation"],
    scope: item["scope"],
    associatedSubscriptions: !item["associatedSubscriptions"]
      ? item["associatedSubscriptions"]
      : item["associatedSubscriptions"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    defaultMode: item["defaultMode"],
    minAppIdVersion: item["minAppIdVersion"],
    securityServices: !item["securityServices"]
      ? item["securityServices"]
      : securityServicesSerializer(item["securityServices"]),
  };
}

/** The response of a GlobalRulestackResource list operation. */
export interface _GlobalRulestackResourceListResult {
  /** The GlobalRulestackResource items on this page */
  value: GlobalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _globalRulestackResourceListResultDeserializer(
  item: any,
): _GlobalRulestackResourceListResult {
  return {
    value: globalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function globalRulestackResourceArraySerializer(
  result: Array<GlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return globalRulestackResourceSerializer(item);
  });
}

export function globalRulestackResourceArrayDeserializer(
  result: Array<GlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return globalRulestackResourceDeserializer(item);
  });
}

/** Changelog list */
export interface Changelog {
  /** list of changes */
  changes: string[];
  /** lastCommitted timestamp */
  lastCommitted?: Date;
  /** lastModified timestamp */
  lastModified?: Date;
}

export function changelogDeserializer(item: any): Changelog {
  return {
    changes: item["changes"].map((p: any) => {
      return p;
    }),
    lastCommitted: !item["lastCommitted"] ? item["lastCommitted"] : new Date(item["lastCommitted"]),
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
  };
}

/** advanced security object */
export interface AdvSecurityObjectListResponse {
  /** response value */
  value: AdvSecurityObjectModel;
  /** next link */
  nextLink?: string;
}

export function advSecurityObjectListResponseDeserializer(
  item: any,
): AdvSecurityObjectListResponse {
  return {
    value: advSecurityObjectModelDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** List of custom and predefined url category */
export interface AdvSecurityObjectModel {
  /** type of object */
  type?: string;
  /** URL entry */
  entry: NameDescriptionObject[];
}

export function advSecurityObjectModelDeserializer(item: any): AdvSecurityObjectModel {
  return {
    type: item["type"],
    entry: nameDescriptionObjectArrayDeserializer(item["entry"]),
  };
}

export function nameDescriptionObjectArrayDeserializer(
  result: Array<NameDescriptionObject>,
): any[] {
  return result.map((item) => {
    return nameDescriptionObjectDeserializer(item);
  });
}

/** object type info */
export interface NameDescriptionObject {
  /** name value */
  name: string;
  /** description value */
  description?: string;
}

export function nameDescriptionObjectDeserializer(item: any): NameDescriptionObject {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** model interface _ListAppIdResponse */
export interface _ListAppIdResponse {
  value: string[];
  nextLink?: string;
}

export function _listAppIdResponseDeserializer(item: any): _ListAppIdResponse {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
    nextLink: item["nextLink"],
  };
}

/** Countries Response Object */
export interface _CountriesResponse {
  /** The Country items on this page */
  value: Country[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _countriesResponseDeserializer(item: any): _CountriesResponse {
  return {
    value: countryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function countryArrayDeserializer(result: Array<Country>): any[] {
  return result.map((item) => {
    return countryDeserializer(item);
  });
}

/** Country Description */
export interface Country {
  /** country code */
  code: string;
  /** code description */
  description?: string;
}

export function countryDeserializer(item: any): Country {
  return {
    code: item["code"],
    description: item["description"],
  };
}

/** List firewalls response */
export interface ListFirewallsResponse {
  /** firewalls list */
  value: string[];
  /** next link */
  nextLink?: string;
}

export function listFirewallsResponseDeserializer(item: any): ListFirewallsResponse {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
    nextLink: item["nextLink"],
  };
}

/** predefined url categories response */
export interface _PredefinedUrlCategoriesResponse {
  /** The PredefinedUrlCategory items on this page */
  value: PredefinedUrlCategory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _predefinedUrlCategoriesResponseDeserializer(
  item: any,
): _PredefinedUrlCategoriesResponse {
  return {
    value: predefinedUrlCategoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function predefinedUrlCategoryArrayDeserializer(
  result: Array<PredefinedUrlCategory>,
): any[] {
  return result.map((item) => {
    return predefinedUrlCategoryDeserializer(item);
  });
}

/** Predefined URL category object */
export interface PredefinedUrlCategory {
  action: string;
  name: string;
}

export function predefinedUrlCategoryDeserializer(item: any): PredefinedUrlCategory {
  return {
    action: item["action"],
    name: item["name"],
  };
}

/** Security services list response */
export interface SecurityServicesResponse {
  /** response value */
  value: SecurityServicesTypeList;
  /** next link */
  nextLink?: string;
}

export function securityServicesResponseDeserializer(item: any): SecurityServicesResponse {
  return {
    value: securityServicesTypeListDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Security services type list */
export interface SecurityServicesTypeList {
  /** security services type */
  type?: string;
  /** list */
  entry: NameDescriptionObject[];
}

export function securityServicesTypeListDeserializer(item: any): SecurityServicesTypeList {
  return {
    type: item["type"],
    entry: nameDescriptionObjectArrayDeserializer(item["entry"]),
  };
}

/** GlobalRulestack Certificate Object */
export interface CertificateObjectGlobalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: CertificateObject;
}

export function certificateObjectGlobalRulestackResourceSerializer(
  item: CertificateObjectGlobalRulestackResource,
): any {
  return { properties: certificateObjectSerializer(item["properties"]) };
}

export function certificateObjectGlobalRulestackResourceDeserializer(
  item: any,
): CertificateObjectGlobalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: certificateObjectDeserializer(item["properties"]),
  };
}

/** certificate used for inbound and outbound decryption */
export interface CertificateObject {
  /** Resource Id of certificate signer, to be populated only when certificateSelfSigned is false */
  certificateSignerResourceId?: string;
  /** use certificate self signed */
  certificateSelfSigned: BooleanEnum;
  /** comment for this object */
  auditComment?: string;
  /** user description for this object */
  description?: string;
  /** read only string representing last create or update */
  etag?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function certificateObjectSerializer(item: CertificateObject): any {
  return {
    certificateSignerResourceId: item["certificateSignerResourceId"],
    certificateSelfSigned: item["certificateSelfSigned"],
    auditComment: item["auditComment"],
    description: item["description"],
    etag: item["etag"],
  };
}

export function certificateObjectDeserializer(item: any): CertificateObject {
  return {
    certificateSignerResourceId: item["certificateSignerResourceId"],
    certificateSelfSigned: item["certificateSelfSigned"],
    auditComment: item["auditComment"],
    description: item["description"],
    etag: item["etag"],
    provisioningState: item["provisioningState"],
  };
}

/** Boolean Enum */
export enum KnownBooleanEnum {
  /** TRUE */
  True = "TRUE",
  /** FALSE */
  False = "FALSE",
}

/**
 * Boolean Enum \
 * {@link KnownBooleanEnum} can be used interchangeably with BooleanEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TRUE** \
 * **FALSE**
 */
export type BooleanEnum = string;

/** The response of a CertificateObjectGlobalRulestackResource list operation. */
export interface _CertificateObjectGlobalRulestackResourceListResult {
  /** The CertificateObjectGlobalRulestackResource items on this page */
  value: CertificateObjectGlobalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateObjectGlobalRulestackResourceListResultDeserializer(
  item: any,
): _CertificateObjectGlobalRulestackResourceListResult {
  return {
    value: certificateObjectGlobalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateObjectGlobalRulestackResourceArraySerializer(
  result: Array<CertificateObjectGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return certificateObjectGlobalRulestackResourceSerializer(item);
  });
}

export function certificateObjectGlobalRulestackResourceArrayDeserializer(
  result: Array<CertificateObjectGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return certificateObjectGlobalRulestackResourceDeserializer(item);
  });
}

/** GlobalRulestack fqdnList */
export interface FqdnListGlobalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: FqdnObject;
}

export function fqdnListGlobalRulestackResourceSerializer(
  item: FqdnListGlobalRulestackResource,
): any {
  return { properties: fqdnObjectSerializer(item["properties"]) };
}

export function fqdnListGlobalRulestackResourceDeserializer(
  item: any,
): FqdnListGlobalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: fqdnObjectDeserializer(item["properties"]),
  };
}

/** fqdn object */
export interface FqdnObject {
  /** fqdn object description */
  description?: string;
  /** fqdn list */
  fqdnList: string[];
  /** etag info */
  etag?: string;
  /** comment for this object */
  auditComment?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function fqdnObjectSerializer(item: FqdnObject): any {
  return {
    description: item["description"],
    fqdnList: item["fqdnList"].map((p: any) => {
      return p;
    }),
    etag: item["etag"],
    auditComment: item["auditComment"],
  };
}

export function fqdnObjectDeserializer(item: any): FqdnObject {
  return {
    description: item["description"],
    fqdnList: item["fqdnList"].map((p: any) => {
      return p;
    }),
    etag: item["etag"],
    auditComment: item["auditComment"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a FqdnListGlobalRulestackResource list operation. */
export interface _FqdnListGlobalRulestackResourceListResult {
  /** The FqdnListGlobalRulestackResource items on this page */
  value: FqdnListGlobalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fqdnListGlobalRulestackResourceListResultDeserializer(
  item: any,
): _FqdnListGlobalRulestackResourceListResult {
  return {
    value: fqdnListGlobalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fqdnListGlobalRulestackResourceArraySerializer(
  result: Array<FqdnListGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return fqdnListGlobalRulestackResourceSerializer(item);
  });
}

export function fqdnListGlobalRulestackResourceArrayDeserializer(
  result: Array<FqdnListGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return fqdnListGlobalRulestackResourceDeserializer(item);
  });
}

/** PostRulestack rule list */
export interface PostRulesResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: RuleEntry;
}

export function postRulesResourceSerializer(item: PostRulesResource): any {
  return { properties: ruleEntrySerializer(item["properties"]) };
}

export function postRulesResourceDeserializer(item: any): PostRulesResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ruleEntryDeserializer(item["properties"]),
  };
}

/** definition of rule */
export interface RuleEntry {
  /** etag info */
  etag?: string;
  /** rule name */
  ruleName: string;
  readonly priority?: number;
  /** rule description */
  description?: string;
  /** state of this rule */
  ruleState?: StateEnum;
  /** source address */
  source?: SourceAddr;
  /** cidr should not be 'any' */
  negateSource?: BooleanEnum;
  /** destination address */
  destination?: DestinationAddr;
  /** cidr should not be 'any' */
  negateDestination?: BooleanEnum;
  /** array of rule applications */
  applications?: string[];
  /** rule category */
  category?: Category;
  /** any, application-default, TCP:number, UDP:number */
  protocol?: string;
  /** prot port list */
  protocolPortList?: string[];
  /** inbound Inspection Certificate */
  inboundInspectionCertificate?: string;
  /** rule comment */
  auditComment?: string;
  /** rule action */
  actionType?: ActionEnum;
  /** enable or disable logging */
  enableLogging?: StateEnum;
  /** enable or disable decryption */
  decryptionRuleType?: DecryptionRuleTypeEnum;
  /** tag for rule */
  tags?: TagInfo[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function ruleEntrySerializer(item: RuleEntry): any {
  return {
    etag: item["etag"],
    ruleName: item["ruleName"],
    description: item["description"],
    ruleState: item["ruleState"],
    source: !item["source"] ? item["source"] : sourceAddrSerializer(item["source"]),
    negateSource: item["negateSource"],
    destination: !item["destination"]
      ? item["destination"]
      : destinationAddrSerializer(item["destination"]),
    negateDestination: item["negateDestination"],
    applications: !item["applications"]
      ? item["applications"]
      : item["applications"].map((p: any) => {
          return p;
        }),
    category: !item["category"] ? item["category"] : categorySerializer(item["category"]),
    protocol: item["protocol"],
    protocolPortList: !item["protocolPortList"]
      ? item["protocolPortList"]
      : item["protocolPortList"].map((p: any) => {
          return p;
        }),
    inboundInspectionCertificate: item["inboundInspectionCertificate"],
    auditComment: item["auditComment"],
    actionType: item["actionType"],
    enableLogging: item["enableLogging"],
    decryptionRuleType: item["decryptionRuleType"],
    tags: !item["tags"] ? item["tags"] : tagInfoArraySerializer(item["tags"]),
  };
}

export function ruleEntryDeserializer(item: any): RuleEntry {
  return {
    etag: item["etag"],
    ruleName: item["ruleName"],
    priority: item["priority"],
    description: item["description"],
    ruleState: item["ruleState"],
    source: !item["source"] ? item["source"] : sourceAddrDeserializer(item["source"]),
    negateSource: item["negateSource"],
    destination: !item["destination"]
      ? item["destination"]
      : destinationAddrDeserializer(item["destination"]),
    negateDestination: item["negateDestination"],
    applications: !item["applications"]
      ? item["applications"]
      : item["applications"].map((p: any) => {
          return p;
        }),
    category: !item["category"] ? item["category"] : categoryDeserializer(item["category"]),
    protocol: item["protocol"],
    protocolPortList: !item["protocolPortList"]
      ? item["protocolPortList"]
      : item["protocolPortList"].map((p: any) => {
          return p;
        }),
    inboundInspectionCertificate: item["inboundInspectionCertificate"],
    auditComment: item["auditComment"],
    actionType: item["actionType"],
    enableLogging: item["enableLogging"],
    decryptionRuleType: item["decryptionRuleType"],
    tags: !item["tags"] ? item["tags"] : tagInfoArrayDeserializer(item["tags"]),
    provisioningState: item["provisioningState"],
  };
}

/** Enabled or Disabled Enum */
export enum KnownStateEnum {
  /** DISABLED */
  Disabled = "DISABLED",
  /** ENABLED */
  Enabled = "ENABLED",
}

/**
 * Enabled or Disabled Enum \
 * {@link KnownStateEnum} can be used interchangeably with StateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DISABLED** \
 * **ENABLED**
 */
export type StateEnum = string;

/** Address properties */
export interface SourceAddr {
  /** special value 'any' */
  cidrs?: string[];
  /** list of countries */
  countries?: string[];
  /** list of feeds */
  feeds?: string[];
  /** prefix list */
  prefixLists?: string[];
}

export function sourceAddrSerializer(item: SourceAddr): any {
  return {
    cidrs: !item["cidrs"]
      ? item["cidrs"]
      : item["cidrs"].map((p: any) => {
          return p;
        }),
    countries: !item["countries"]
      ? item["countries"]
      : item["countries"].map((p: any) => {
          return p;
        }),
    feeds: !item["feeds"]
      ? item["feeds"]
      : item["feeds"].map((p: any) => {
          return p;
        }),
    prefixLists: !item["prefixLists"]
      ? item["prefixLists"]
      : item["prefixLists"].map((p: any) => {
          return p;
        }),
  };
}

export function sourceAddrDeserializer(item: any): SourceAddr {
  return {
    cidrs: !item["cidrs"]
      ? item["cidrs"]
      : item["cidrs"].map((p: any) => {
          return p;
        }),
    countries: !item["countries"]
      ? item["countries"]
      : item["countries"].map((p: any) => {
          return p;
        }),
    feeds: !item["feeds"]
      ? item["feeds"]
      : item["feeds"].map((p: any) => {
          return p;
        }),
    prefixLists: !item["prefixLists"]
      ? item["prefixLists"]
      : item["prefixLists"].map((p: any) => {
          return p;
        }),
  };
}

/** destination address */
export interface DestinationAddr {
  /** special value 'any' */
  cidrs?: string[];
  /** list of countries */
  countries?: string[];
  /** list of feeds */
  feeds?: string[];
  /** prefix list */
  prefixLists?: string[];
  /** fqdn list */
  fqdnLists?: string[];
}

export function destinationAddrSerializer(item: DestinationAddr): any {
  return {
    cidrs: !item["cidrs"]
      ? item["cidrs"]
      : item["cidrs"].map((p: any) => {
          return p;
        }),
    countries: !item["countries"]
      ? item["countries"]
      : item["countries"].map((p: any) => {
          return p;
        }),
    feeds: !item["feeds"]
      ? item["feeds"]
      : item["feeds"].map((p: any) => {
          return p;
        }),
    prefixLists: !item["prefixLists"]
      ? item["prefixLists"]
      : item["prefixLists"].map((p: any) => {
          return p;
        }),
    fqdnLists: !item["fqdnLists"]
      ? item["fqdnLists"]
      : item["fqdnLists"].map((p: any) => {
          return p;
        }),
  };
}

export function destinationAddrDeserializer(item: any): DestinationAddr {
  return {
    cidrs: !item["cidrs"]
      ? item["cidrs"]
      : item["cidrs"].map((p: any) => {
          return p;
        }),
    countries: !item["countries"]
      ? item["countries"]
      : item["countries"].map((p: any) => {
          return p;
        }),
    feeds: !item["feeds"]
      ? item["feeds"]
      : item["feeds"].map((p: any) => {
          return p;
        }),
    prefixLists: !item["prefixLists"]
      ? item["prefixLists"]
      : item["prefixLists"].map((p: any) => {
          return p;
        }),
    fqdnLists: !item["fqdnLists"]
      ? item["fqdnLists"]
      : item["fqdnLists"].map((p: any) => {
          return p;
        }),
  };
}

/** URL/EDL to match */
export interface Category {
  /** custom URL */
  urlCustom: string[];
  /** feed list */
  feeds: string[];
}

export function categorySerializer(item: Category): any {
  return {
    urlCustom: item["urlCustom"].map((p: any) => {
      return p;
    }),
    feeds: item["feeds"].map((p: any) => {
      return p;
    }),
  };
}

export function categoryDeserializer(item: any): Category {
  return {
    urlCustom: item["urlCustom"].map((p: any) => {
      return p;
    }),
    feeds: item["feeds"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link ActionEnum} that the service accepts. */
export enum KnownActionEnum {
  /** Allow */
  Allow = "Allow",
  /** DenySilent */
  DenySilent = "DenySilent",
  /** DenyResetServer */
  DenyResetServer = "DenyResetServer",
  /** DenyResetBoth */
  DenyResetBoth = "DenyResetBoth",
}

/** Type of ActionEnum */
export type ActionEnum = string;

/** Known values of {@link DecryptionRuleTypeEnum} that the service accepts. */
export enum KnownDecryptionRuleTypeEnum {
  /** SSLOutboundInspection */
  SSLOutboundInspection = "SSLOutboundInspection",
  /** SSLInboundInspection */
  SSLInboundInspection = "SSLInboundInspection",
  /** None */
  None = "None",
}

/** Type of DecryptionRuleTypeEnum */
export type DecryptionRuleTypeEnum = string;

export function tagInfoArraySerializer(result: Array<TagInfo>): any[] {
  return result.map((item) => {
    return tagInfoSerializer(item);
  });
}

export function tagInfoArrayDeserializer(result: Array<TagInfo>): any[] {
  return result.map((item) => {
    return tagInfoDeserializer(item);
  });
}

/** Tag */
export interface TagInfo {
  /** tag name */
  key: string;
  /** tag value */
  value: string;
}

export function tagInfoSerializer(item: TagInfo): any {
  return { key: item["key"], value: item["value"] };
}

export function tagInfoDeserializer(item: any): TagInfo {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The response of a PostRulesResource list operation. */
export interface _PostRulesResourceListResult {
  /** The PostRulesResource items on this page */
  value: PostRulesResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _postRulesResourceListResultDeserializer(item: any): _PostRulesResourceListResult {
  return {
    value: postRulesResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function postRulesResourceArraySerializer(result: Array<PostRulesResource>): any[] {
  return result.map((item) => {
    return postRulesResourceSerializer(item);
  });
}

export function postRulesResourceArrayDeserializer(result: Array<PostRulesResource>): any[] {
  return result.map((item) => {
    return postRulesResourceDeserializer(item);
  });
}

/** Rule counter */
export interface RuleCounter {
  /** priority number */
  priority: string;
  /** rule Stack Name */
  ruleStackName?: string;
  /** rule list name */
  ruleListName?: string;
  /** firewall name */
  firewallName?: string;
  /** rule name */
  ruleName: string;
  /** hit count */
  hitCount?: number;
  /** apps seen */
  appSeen?: AppSeenData;
  /** timestamp of response */
  timestamp?: Date;
  /** timestamp of request */
  requestTimestamp?: Date;
  /** last updated timestamp */
  lastUpdatedTimestamp?: Date;
}

export function ruleCounterDeserializer(item: any): RuleCounter {
  return {
    priority: item["priority"],
    ruleStackName: item["ruleStackName"],
    ruleListName: item["ruleListName"],
    firewallName: item["firewallName"],
    ruleName: item["ruleName"],
    hitCount: item["hitCount"],
    appSeen: !item["appSeen"] ? item["appSeen"] : appSeenDataDeserializer(item["appSeen"]),
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    requestTimestamp: !item["requestTimestamp"]
      ? item["requestTimestamp"]
      : new Date(item["requestTimestamp"]),
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
  };
}

/** Data Type for App Seen */
export interface AppSeenData {
  /** number of rows */
  count: number;
  /** array of appSeen */
  appSeenList: AppSeenInfo[];
}

export function appSeenDataDeserializer(item: any): AppSeenData {
  return {
    count: item["count"],
    appSeenList: appSeenInfoArrayDeserializer(item["appSeenList"]),
  };
}

export function appSeenInfoArrayDeserializer(result: Array<AppSeenInfo>): any[] {
  return result.map((item) => {
    return appSeenInfoDeserializer(item);
  });
}

/** Definition for App Seen */
export interface AppSeenInfo {
  /** title */
  title: string;
  /** category */
  category: string;
  /** subCategory */
  subCategory: string;
  /** risk */
  risk: string;
  /** tag */
  tag: string;
  /** technology */
  technology: string;
  /** standardPorts */
  standardPorts: string;
}

export function appSeenInfoDeserializer(item: any): AppSeenInfo {
  return {
    title: item["title"],
    category: item["category"],
    subCategory: item["subCategory"],
    risk: item["risk"],
    tag: item["tag"],
    technology: item["technology"],
    standardPorts: item["standardPorts"],
  };
}

/** Rule counter reset */
export interface RuleCounterReset {
  /** priority number */
  readonly priority?: string;
  /** rule Stack Name */
  ruleStackName?: string;
  /** rule list name */
  ruleListName?: string;
  /** firewall name */
  firewallName?: string;
  /** rule name */
  ruleName?: string;
}

export function ruleCounterResetDeserializer(item: any): RuleCounterReset {
  return {
    priority: item["priority"],
    ruleStackName: item["ruleStackName"],
    ruleListName: item["ruleListName"],
    firewallName: item["firewallName"],
    ruleName: item["ruleName"],
  };
}

/** GlobalRulestack prefixList */
export interface PrefixListGlobalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: PrefixObject;
}

export function prefixListGlobalRulestackResourceSerializer(
  item: PrefixListGlobalRulestackResource,
): any {
  return { properties: prefixObjectSerializer(item["properties"]) };
}

export function prefixListGlobalRulestackResourceDeserializer(
  item: any,
): PrefixListGlobalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: prefixObjectDeserializer(item["properties"]),
  };
}

/** prefix entry */
export interface PrefixObject {
  /** prefix description */
  description?: string;
  /** prefix list */
  prefixList: string[];
  /** etag info */
  etag?: string;
  /** comment for this object */
  auditComment?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function prefixObjectSerializer(item: PrefixObject): any {
  return {
    description: item["description"],
    prefixList: item["prefixList"].map((p: any) => {
      return p;
    }),
    etag: item["etag"],
    auditComment: item["auditComment"],
  };
}

export function prefixObjectDeserializer(item: any): PrefixObject {
  return {
    description: item["description"],
    prefixList: item["prefixList"].map((p: any) => {
      return p;
    }),
    etag: item["etag"],
    auditComment: item["auditComment"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a PrefixListGlobalRulestackResource list operation. */
export interface _PrefixListGlobalRulestackResourceListResult {
  /** The PrefixListGlobalRulestackResource items on this page */
  value: PrefixListGlobalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _prefixListGlobalRulestackResourceListResultDeserializer(
  item: any,
): _PrefixListGlobalRulestackResourceListResult {
  return {
    value: prefixListGlobalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function prefixListGlobalRulestackResourceArraySerializer(
  result: Array<PrefixListGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return prefixListGlobalRulestackResourceSerializer(item);
  });
}

export function prefixListGlobalRulestackResourceArrayDeserializer(
  result: Array<PrefixListGlobalRulestackResource>,
): any[] {
  return result.map((item) => {
    return prefixListGlobalRulestackResourceDeserializer(item);
  });
}

/** PreRulestack rule list */
export interface PreRulesResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: RuleEntry;
}

export function preRulesResourceSerializer(item: PreRulesResource): any {
  return { properties: ruleEntrySerializer(item["properties"]) };
}

export function preRulesResourceDeserializer(item: any): PreRulesResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ruleEntryDeserializer(item["properties"]),
  };
}

/** The response of a PreRulesResource list operation. */
export interface _PreRulesResourceListResult {
  /** The PreRulesResource items on this page */
  value: PreRulesResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _preRulesResourceListResultDeserializer(item: any): _PreRulesResourceListResult {
  return {
    value: preRulesResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function preRulesResourceArraySerializer(result: Array<PreRulesResource>): any[] {
  return result.map((item) => {
    return preRulesResourceSerializer(item);
  });
}

export function preRulesResourceArrayDeserializer(result: Array<PreRulesResource>): any[] {
  return result.map((item) => {
    return preRulesResourceDeserializer(item);
  });
}

/** PaloAltoNetworks Firewall */
export interface FirewallResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: FirewallDeploymentProperties;
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
}

export function firewallResourceSerializer(item: FirewallResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: firewallDeploymentPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
  };
}

export function firewallResourceDeserializer(item: any): FirewallResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: firewallDeploymentPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesDeserializer(item["identity"]),
  };
}

/** Properties specific to the Firewall resource deployment. */
export interface FirewallDeploymentProperties {
  /** panEtag info */
  panEtag?: string;
  /** Network settings */
  networkProfile: NetworkProfile;
  /** Panorama Managed: Default is False. Default will be CloudSec managed */
  isPanoramaManaged?: BooleanEnum;
  /** Strata Cloud Managed: Default is False. Default will be CloudSec managed */
  isStrataCloudManaged?: BooleanEnum;
  /** Panorama Configuration */
  panoramaConfig?: PanoramaConfig;
  /** Strata Cloud Manager Configuration, only applicable if Strata Cloud Manager is selected. */
  strataCloudManagerConfig?: StrataCloudManagerConfig;
  /** Associated Rulestack */
  associatedRulestack?: RulestackDetails;
  /** DNS settings for Firewall */
  dnsSettings: DNSSettings;
  /** Frontend settings for Firewall */
  frontEndSettings?: FrontendSetting[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Billing plan information. */
  planData: PlanData;
  /** Marketplace details */
  marketplaceDetails: MarketplaceDetails;
}

export function firewallDeploymentPropertiesSerializer(item: FirewallDeploymentProperties): any {
  return {
    panEtag: item["panEtag"],
    networkProfile: networkProfileSerializer(item["networkProfile"]),
    isPanoramaManaged: item["isPanoramaManaged"],
    isStrataCloudManaged: item["isStrataCloudManaged"],
    panoramaConfig: !item["panoramaConfig"]
      ? item["panoramaConfig"]
      : panoramaConfigSerializer(item["panoramaConfig"]),
    strataCloudManagerConfig: !item["strataCloudManagerConfig"]
      ? item["strataCloudManagerConfig"]
      : strataCloudManagerConfigSerializer(item["strataCloudManagerConfig"]),
    associatedRulestack: !item["associatedRulestack"]
      ? item["associatedRulestack"]
      : rulestackDetailsSerializer(item["associatedRulestack"]),
    dnsSettings: dnsSettingsSerializer(item["dnsSettings"]),
    frontEndSettings: !item["frontEndSettings"]
      ? item["frontEndSettings"]
      : frontendSettingArraySerializer(item["frontEndSettings"]),
    planData: planDataSerializer(item["planData"]),
    marketplaceDetails: marketplaceDetailsSerializer(item["marketplaceDetails"]),
  };
}

export function firewallDeploymentPropertiesDeserializer(item: any): FirewallDeploymentProperties {
  return {
    panEtag: item["panEtag"],
    networkProfile: networkProfileDeserializer(item["networkProfile"]),
    isPanoramaManaged: item["isPanoramaManaged"],
    isStrataCloudManaged: item["isStrataCloudManaged"],
    panoramaConfig: !item["panoramaConfig"]
      ? item["panoramaConfig"]
      : panoramaConfigDeserializer(item["panoramaConfig"]),
    strataCloudManagerConfig: !item["strataCloudManagerConfig"]
      ? item["strataCloudManagerConfig"]
      : strataCloudManagerConfigDeserializer(item["strataCloudManagerConfig"]),
    associatedRulestack: !item["associatedRulestack"]
      ? item["associatedRulestack"]
      : rulestackDetailsDeserializer(item["associatedRulestack"]),
    dnsSettings: dnsSettingsDeserializer(item["dnsSettings"]),
    frontEndSettings: !item["frontEndSettings"]
      ? item["frontEndSettings"]
      : frontendSettingArrayDeserializer(item["frontEndSettings"]),
    provisioningState: item["provisioningState"],
    planData: planDataDeserializer(item["planData"]),
    marketplaceDetails: marketplaceDetailsDeserializer(item["marketplaceDetails"]),
  };
}

/** Network settings for Firewall */
export interface NetworkProfile {
  /** Vnet configurations */
  vnetConfiguration?: VnetConfiguration;
  /** Vwan configurations */
  vwanConfiguration?: VwanConfiguration;
  /** vnet or vwan, cannot be updated */
  networkType: NetworkType;
  /** List of IPs associated with the Firewall */
  publicIps: IPAddress[];
  /** Enable egress NAT, enabled by default */
  enableEgressNat: EgressNat;
  /** Egress nat IP to use */
  egressNatIp?: IPAddress[];
  /** Non-RFC 1918 address */
  trustedRanges?: string[];
  /** Array of ipv4 destination address for which source NAT is to be performed */
  privateSourceNatRulesDestination?: string[];
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationSerializer(item["vnetConfiguration"]),
    vwanConfiguration: !item["vwanConfiguration"]
      ? item["vwanConfiguration"]
      : vwanConfigurationSerializer(item["vwanConfiguration"]),
    networkType: item["networkType"],
    publicIps: ipAddressArraySerializer(item["publicIps"]),
    enableEgressNat: item["enableEgressNat"],
    egressNatIp: !item["egressNatIp"]
      ? item["egressNatIp"]
      : ipAddressArraySerializer(item["egressNatIp"]),
    trustedRanges: !item["trustedRanges"]
      ? item["trustedRanges"]
      : item["trustedRanges"].map((p: any) => {
          return p;
        }),
    privateSourceNatRulesDestination: !item["privateSourceNatRulesDestination"]
      ? item["privateSourceNatRulesDestination"]
      : item["privateSourceNatRulesDestination"].map((p: any) => {
          return p;
        }),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    vnetConfiguration: !item["vnetConfiguration"]
      ? item["vnetConfiguration"]
      : vnetConfigurationDeserializer(item["vnetConfiguration"]),
    vwanConfiguration: !item["vwanConfiguration"]
      ? item["vwanConfiguration"]
      : vwanConfigurationDeserializer(item["vwanConfiguration"]),
    networkType: item["networkType"],
    publicIps: ipAddressArrayDeserializer(item["publicIps"]),
    enableEgressNat: item["enableEgressNat"],
    egressNatIp: !item["egressNatIp"]
      ? item["egressNatIp"]
      : ipAddressArrayDeserializer(item["egressNatIp"]),
    trustedRanges: !item["trustedRanges"]
      ? item["trustedRanges"]
      : item["trustedRanges"].map((p: any) => {
          return p;
        }),
    privateSourceNatRulesDestination: !item["privateSourceNatRulesDestination"]
      ? item["privateSourceNatRulesDestination"]
      : item["privateSourceNatRulesDestination"].map((p: any) => {
          return p;
        }),
  };
}

/** VnetInfo for Firewall Networking */
export interface VnetConfiguration {
  /** Azure Virtual Network */
  vnet: IPAddressSpace;
  /** Trust Subnet */
  trustSubnet: IPAddressSpace;
  /** Untrust Subnet */
  unTrustSubnet: IPAddressSpace;
  /** IP of trust subnet for UDR */
  ipOfTrustSubnetForUdr?: IPAddress;
}

export function vnetConfigurationSerializer(item: VnetConfiguration): any {
  return {
    vnet: ipAddressSpaceSerializer(item["vnet"]),
    trustSubnet: ipAddressSpaceSerializer(item["trustSubnet"]),
    unTrustSubnet: ipAddressSpaceSerializer(item["unTrustSubnet"]),
    ipOfTrustSubnetForUdr: !item["ipOfTrustSubnetForUdr"]
      ? item["ipOfTrustSubnetForUdr"]
      : ipAddressSerializer(item["ipOfTrustSubnetForUdr"]),
  };
}

export function vnetConfigurationDeserializer(item: any): VnetConfiguration {
  return {
    vnet: ipAddressSpaceDeserializer(item["vnet"]),
    trustSubnet: ipAddressSpaceDeserializer(item["trustSubnet"]),
    unTrustSubnet: ipAddressSpaceDeserializer(item["unTrustSubnet"]),
    ipOfTrustSubnetForUdr: !item["ipOfTrustSubnetForUdr"]
      ? item["ipOfTrustSubnetForUdr"]
      : ipAddressDeserializer(item["ipOfTrustSubnetForUdr"]),
  };
}

/** IP Address Space */
export interface IPAddressSpace {
  /** Resource Id */
  resourceId?: string;
  /** Address Space */
  addressSpace?: string;
}

export function ipAddressSpaceSerializer(item: IPAddressSpace): any {
  return { resourceId: item["resourceId"], addressSpace: item["addressSpace"] };
}

export function ipAddressSpaceDeserializer(item: any): IPAddressSpace {
  return {
    resourceId: item["resourceId"],
    addressSpace: item["addressSpace"],
  };
}

/** IP Address */
export interface IPAddress {
  /** Resource Id */
  resourceId?: string;
  /** Address value */
  address?: string;
}

export function ipAddressSerializer(item: IPAddress): any {
  return { resourceId: item["resourceId"], address: item["address"] };
}

export function ipAddressDeserializer(item: any): IPAddress {
  return {
    resourceId: item["resourceId"],
    address: item["address"],
  };
}

/** VwanInfo for Firewall Networking */
export interface VwanConfiguration {
  /** Network Virtual Appliance resource ID */
  networkVirtualApplianceId?: string;
  /** vHub Address */
  vHub: IPAddressSpace;
  /** Trust Subnet */
  trustSubnet?: IPAddressSpace;
  /** Untrust Subnet */
  unTrustSubnet?: IPAddressSpace;
  /** IP of trust subnet for UDR */
  ipOfTrustSubnetForUdr?: IPAddress;
}

export function vwanConfigurationSerializer(item: VwanConfiguration): any {
  return {
    networkVirtualApplianceId: item["networkVirtualApplianceId"],
    vHub: ipAddressSpaceSerializer(item["vHub"]),
    trustSubnet: !item["trustSubnet"]
      ? item["trustSubnet"]
      : ipAddressSpaceSerializer(item["trustSubnet"]),
    unTrustSubnet: !item["unTrustSubnet"]
      ? item["unTrustSubnet"]
      : ipAddressSpaceSerializer(item["unTrustSubnet"]),
    ipOfTrustSubnetForUdr: !item["ipOfTrustSubnetForUdr"]
      ? item["ipOfTrustSubnetForUdr"]
      : ipAddressSerializer(item["ipOfTrustSubnetForUdr"]),
  };
}

export function vwanConfigurationDeserializer(item: any): VwanConfiguration {
  return {
    networkVirtualApplianceId: item["networkVirtualApplianceId"],
    vHub: ipAddressSpaceDeserializer(item["vHub"]),
    trustSubnet: !item["trustSubnet"]
      ? item["trustSubnet"]
      : ipAddressSpaceDeserializer(item["trustSubnet"]),
    unTrustSubnet: !item["unTrustSubnet"]
      ? item["unTrustSubnet"]
      : ipAddressSpaceDeserializer(item["unTrustSubnet"]),
    ipOfTrustSubnetForUdr: !item["ipOfTrustSubnetForUdr"]
      ? item["ipOfTrustSubnetForUdr"]
      : ipAddressDeserializer(item["ipOfTrustSubnetForUdr"]),
  };
}

/** NetworkType Enum */
export enum KnownNetworkType {
  /** VNET */
  Vnet = "VNET",
  /** VWAN */
  Vwan = "VWAN",
}

/**
 * NetworkType Enum \
 * {@link KnownNetworkType} can be used interchangeably with NetworkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VNET** \
 * **VWAN**
 */
export type NetworkType = string;

export function ipAddressArraySerializer(result: Array<IPAddress>): any[] {
  return result.map((item) => {
    return ipAddressSerializer(item);
  });
}

export function ipAddressArrayDeserializer(result: Array<IPAddress>): any[] {
  return result.map((item) => {
    return ipAddressDeserializer(item);
  });
}

/** Egress NAT */
export enum KnownEgressNat {
  /** DISABLED */
  Disabled = "DISABLED",
  /** ENABLED */
  Enabled = "ENABLED",
}

/**
 * Egress NAT \
 * {@link KnownEgressNat} can be used interchangeably with EgressNat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DISABLED** \
 * **ENABLED**
 */
export type EgressNat = string;

/** Panorama Config */
export interface PanoramaConfig {
  /** Base64 encoded string representing Panorama parameters to be used by Firewall to connect to Panorama. This string is generated via azure plugin in Panorama */
  configString: string;
  /** VM auth key for panorama connectivity */
  readonly vmAuthKey?: string;
  /** Primary Panorama Server IP address value in dotted format for IPv4 */
  readonly panoramaServer?: string;
  /** Secondary Panorama Server IP address value in dotted format for IPv4 */
  readonly panoramaServer2?: string;
  /** Panorama Device Group to join */
  readonly dgName?: string;
  /** Panorama Template Stack to join - (Once configured we can not edit the value) */
  readonly tplName?: string;
  /** Panorama Collector Group to join - (Once configured we can not edit the value) */
  readonly cgName?: string;
  /** Resource name(may be unique) for PN admin */
  readonly hostName?: string;
}

export function panoramaConfigSerializer(item: PanoramaConfig): any {
  return { configString: item["configString"] };
}

export function panoramaConfigDeserializer(item: any): PanoramaConfig {
  return {
    configString: item["configString"],
    vmAuthKey: item["vmAuthKey"],
    panoramaServer: item["panoramaServer"],
    panoramaServer2: item["panoramaServer2"],
    dgName: item["dgName"],
    tplName: item["tplName"],
    cgName: item["cgName"],
    hostName: item["hostName"],
  };
}

/** This field is only present if Strata Cloud Manager is managing the policy for this firewall */
export interface StrataCloudManagerConfig {
  /** Strata Cloud Manager name which is intended to manage the policy for this firewall. */
  cloudManagerName: string;
}

export function strataCloudManagerConfigSerializer(item: StrataCloudManagerConfig): any {
  return { cloudManagerName: item["cloudManagerName"] };
}

export function strataCloudManagerConfigDeserializer(item: any): StrataCloudManagerConfig {
  return {
    cloudManagerName: item["cloudManagerName"],
  };
}

/** Associated rulestack details */
export interface RulestackDetails {
  /** Resource Id */
  resourceId?: string;
  /** Associated rulestack Id */
  rulestackId?: string;
  /** Rulestack location */
  location?: string;
}

export function rulestackDetailsSerializer(item: RulestackDetails): any {
  return {
    resourceId: item["resourceId"],
    rulestackId: item["rulestackId"],
    location: item["location"],
  };
}

export function rulestackDetailsDeserializer(item: any): RulestackDetails {
  return {
    resourceId: item["resourceId"],
    rulestackId: item["rulestackId"],
    location: item["location"],
  };
}

/** DNS Proxy settings for Firewall */
export interface DNSSettings {
  /** Enable DNS proxy, disabled by default */
  enableDnsProxy?: DNSProxy;
  /** Enabled DNS proxy type, disabled by default */
  enabledDnsType?: EnabledDNSType;
  /** List of IPs associated with the Firewall */
  dnsServers?: IPAddress[];
}

export function dnsSettingsSerializer(item: DNSSettings): any {
  return {
    enableDnsProxy: item["enableDnsProxy"],
    enabledDnsType: item["enabledDnsType"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : ipAddressArraySerializer(item["dnsServers"]),
  };
}

export function dnsSettingsDeserializer(item: any): DNSSettings {
  return {
    enableDnsProxy: item["enableDnsProxy"],
    enabledDnsType: item["enabledDnsType"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : ipAddressArrayDeserializer(item["dnsServers"]),
  };
}

/** DNS Proxy */
export enum KnownDNSProxy {
  /** DISABLED */
  Disabled = "DISABLED",
  /** ENABLED */
  Enabled = "ENABLED",
}

/**
 * DNS Proxy \
 * {@link KnownDNSProxy} can be used interchangeably with DNSProxy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DISABLED** \
 * **ENABLED**
 */
export type DNSProxy = string;

/** Enabled DNS type values */
export enum KnownEnabledDNSType {
  /** CUSTOM */
  Custom = "CUSTOM",
  /** AZURE */
  Azure = "AZURE",
}

/**
 * Enabled DNS type values \
 * {@link KnownEnabledDNSType} can be used interchangeably with EnabledDNSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CUSTOM** \
 * **AZURE**
 */
export type EnabledDNSType = string;

export function frontendSettingArraySerializer(result: Array<FrontendSetting>): any[] {
  return result.map((item) => {
    return frontendSettingSerializer(item);
  });
}

export function frontendSettingArrayDeserializer(result: Array<FrontendSetting>): any[] {
  return result.map((item) => {
    return frontendSettingDeserializer(item);
  });
}

/** Frontend setting for Firewall */
export interface FrontendSetting {
  /** Settings name */
  name: string;
  /** Protocol Type */
  protocol: ProtocolType;
  /** Frontend configurations */
  frontendConfiguration: EndpointConfiguration;
  /** Backend configurations */
  backendConfiguration: EndpointConfiguration;
}

export function frontendSettingSerializer(item: FrontendSetting): any {
  return {
    name: item["name"],
    protocol: item["protocol"],
    frontendConfiguration: endpointConfigurationSerializer(item["frontendConfiguration"]),
    backendConfiguration: endpointConfigurationSerializer(item["backendConfiguration"]),
  };
}

export function frontendSettingDeserializer(item: any): FrontendSetting {
  return {
    name: item["name"],
    protocol: item["protocol"],
    frontendConfiguration: endpointConfigurationDeserializer(item["frontendConfiguration"]),
    backendConfiguration: endpointConfigurationDeserializer(item["backendConfiguration"]),
  };
}

/** Protocol Enum */
export enum KnownProtocolType {
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
}

/**
 * Protocol Enum \
 * {@link KnownProtocolType} can be used interchangeably with ProtocolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP** \
 * **UDP**
 */
export type ProtocolType = string;

/** Endpoint Configuration for frontend and backend */
export interface EndpointConfiguration {
  /** port ID */
  port: string;
  /** Address Space */
  address: IPAddress;
}

export function endpointConfigurationSerializer(item: EndpointConfiguration): any {
  return { port: item["port"], address: ipAddressSerializer(item["address"]) };
}

export function endpointConfigurationDeserializer(item: any): EndpointConfiguration {
  return {
    port: item["port"],
    address: ipAddressDeserializer(item["address"]),
  };
}

/** Billing plan information. */
export interface PlanData {
  /** different usage type like PAYG/COMMITTED */
  usageType?: UsageType;
  /** different billing cycles like MONTHLY/WEEKLY */
  billingCycle: BillingCycle;
  /** plan id as published by Liftr.PAN */
  planId: string;
  /** date when plan was applied */
  readonly effectiveDate?: Date;
}

export function planDataSerializer(item: PlanData): any {
  return {
    usageType: item["usageType"],
    billingCycle: item["billingCycle"],
    planId: item["planId"],
  };
}

export function planDataDeserializer(item: any): PlanData {
  return {
    usageType: item["usageType"],
    billingCycle: item["billingCycle"],
    planId: item["planId"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
  };
}

/** Usage Type */
export enum KnownUsageType {
  /** PAYG */
  Payg = "PAYG",
  /** COMMITTED */
  Committed = "COMMITTED",
}

/**
 * Usage Type \
 * {@link KnownUsageType} can be used interchangeably with UsageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAYG** \
 * **COMMITTED**
 */
export type UsageType = string;

/** Billing cycle */
export enum KnownBillingCycle {
  /** WEEKLY */
  Weekly = "WEEKLY",
  /** MONTHLY */
  Monthly = "MONTHLY",
}

/**
 * Billing cycle \
 * {@link KnownBillingCycle} can be used interchangeably with BillingCycle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WEEKLY** \
 * **MONTHLY**
 */
export type BillingCycle = string;

/** MarketplaceDetails of PAN Firewall resource */
export interface MarketplaceDetails {
  /** Marketplace Subscription Id */
  readonly marketplaceSubscriptionId?: string;
  /** Offer Id */
  offerId: string;
  /** Publisher Id */
  publisherId: string;
  /** Marketplace Subscription Status */
  marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
  };
}

/** Marketplace Subscription Status */
export enum KnownMarketplaceSubscriptionStatus {
  /** PendingFulfillmentStart */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Subscribed */
  Subscribed = "Subscribed",
  /** Suspended */
  Suspended = "Suspended",
  /** Unsubscribed */
  Unsubscribed = "Unsubscribed",
  /** NotStarted */
  NotStarted = "NotStarted",
  /** FulfillmentRequested */
  FulfillmentRequested = "FulfillmentRequested",
}

/**
 * Marketplace Subscription Status \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart** \
 * **Subscribed** \
 * **Suspended** \
 * **Unsubscribed** \
 * **NotStarted** \
 * **FulfillmentRequested**
 */
export type MarketplaceSubscriptionStatus = string;

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

/** The type used for update operations of the FirewallResource. */
export interface FirewallResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The updatable properties of the FirewallResource. */
  properties?: FirewallResourceUpdateProperties;
}

export function firewallResourceUpdateSerializer(item: FirewallResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : firewallResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FirewallResource. */
export interface FirewallResourceUpdateProperties {
  /** panEtag info */
  panEtag?: string;
  /** Network settings */
  networkProfile?: NetworkProfile;
  /** Panorama Managed: Default is False. Default will be CloudSec managed */
  isPanoramaManaged?: BooleanEnum;
  /** Strata Cloud Managed: Default is False. Default will be CloudSec managed */
  isStrataCloudManaged?: BooleanEnum;
  /** Panorama Configuration */
  panoramaConfig?: PanoramaConfig;
  /** Strata Cloud Manager Configuration, only applicable if Strata Cloud Manager is selected. */
  strataCloudManagerConfig?: StrataCloudManagerConfig;
  /** Associated Rulestack */
  associatedRulestack?: RulestackDetails;
  /** DNS settings for Firewall */
  dnsSettings?: DNSSettings;
  /** Frontend settings for Firewall */
  frontEndSettings?: FrontendSetting[];
  /** Billing plan information. */
  planData?: PlanData;
  /** Marketplace details */
  marketplaceDetails?: MarketplaceDetails;
}

export function firewallResourceUpdatePropertiesSerializer(
  item: FirewallResourceUpdateProperties,
): any {
  return {
    panEtag: item["panEtag"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    isPanoramaManaged: item["isPanoramaManaged"],
    isStrataCloudManaged: item["isStrataCloudManaged"],
    panoramaConfig: !item["panoramaConfig"]
      ? item["panoramaConfig"]
      : panoramaConfigSerializer(item["panoramaConfig"]),
    strataCloudManagerConfig: !item["strataCloudManagerConfig"]
      ? item["strataCloudManagerConfig"]
      : strataCloudManagerConfigSerializer(item["strataCloudManagerConfig"]),
    associatedRulestack: !item["associatedRulestack"]
      ? item["associatedRulestack"]
      : rulestackDetailsSerializer(item["associatedRulestack"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : dnsSettingsSerializer(item["dnsSettings"]),
    frontEndSettings: !item["frontEndSettings"]
      ? item["frontEndSettings"]
      : frontendSettingArraySerializer(item["frontEndSettings"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsSerializer(item["marketplaceDetails"]),
  };
}

/** The response of a FirewallResource list operation. */
export interface _FirewallResourceListResult {
  /** The FirewallResource items on this page */
  value: FirewallResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallResourceListResultDeserializer(item: any): _FirewallResourceListResult {
  return {
    value: firewallResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firewallResourceArraySerializer(result: Array<FirewallResource>): any[] {
  return result.map((item) => {
    return firewallResourceSerializer(item);
  });
}

export function firewallResourceArrayDeserializer(result: Array<FirewallResource>): any[] {
  return result.map((item) => {
    return firewallResourceDeserializer(item);
  });
}

/** PAN Rulestack Describe Object */
export interface GlobalRulestackInfo {
  /** rulestack description */
  azureId: string;
}

export function globalRulestackInfoDeserializer(item: any): GlobalRulestackInfo {
  return {
    azureId: item["azureId"],
  };
}

/** Log Settings for Firewall */
export interface LogSettings {
  /** One of possible log type */
  logType?: LogType;
  /** Log option SAME/INDIVIDUAL */
  logOption?: LogOption;
  /** Application Insight details */
  applicationInsights?: ApplicationInsights;
  /** Common destination configurations */
  commonDestination?: LogDestination;
  /** Traffic destination configurations */
  trafficLogDestination?: LogDestination;
  /** Threat destination configurations */
  threatLogDestination?: LogDestination;
  /** Decrypt destination configurations */
  decryptLogDestination?: LogDestination;
}

export function logSettingsSerializer(item: LogSettings): any {
  return {
    logType: item["logType"],
    logOption: item["logOption"],
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsSerializer(item["applicationInsights"]),
    commonDestination: !item["commonDestination"]
      ? item["commonDestination"]
      : logDestinationSerializer(item["commonDestination"]),
    trafficLogDestination: !item["trafficLogDestination"]
      ? item["trafficLogDestination"]
      : logDestinationSerializer(item["trafficLogDestination"]),
    threatLogDestination: !item["threatLogDestination"]
      ? item["threatLogDestination"]
      : logDestinationSerializer(item["threatLogDestination"]),
    decryptLogDestination: !item["decryptLogDestination"]
      ? item["decryptLogDestination"]
      : logDestinationSerializer(item["decryptLogDestination"]),
  };
}

export function logSettingsDeserializer(item: any): LogSettings {
  return {
    logType: item["logType"],
    logOption: item["logOption"],
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsDeserializer(item["applicationInsights"]),
    commonDestination: !item["commonDestination"]
      ? item["commonDestination"]
      : logDestinationDeserializer(item["commonDestination"]),
    trafficLogDestination: !item["trafficLogDestination"]
      ? item["trafficLogDestination"]
      : logDestinationDeserializer(item["trafficLogDestination"]),
    threatLogDestination: !item["threatLogDestination"]
      ? item["threatLogDestination"]
      : logDestinationDeserializer(item["threatLogDestination"]),
    decryptLogDestination: !item["decryptLogDestination"]
      ? item["decryptLogDestination"]
      : logDestinationDeserializer(item["decryptLogDestination"]),
  };
}

/** Possible log types */
export enum KnownLogType {
  /** TRAFFIC */
  Traffic = "TRAFFIC",
  /** THREAT */
  Threat = "THREAT",
  /** DECRYPTION */
  Decryption = "DECRYPTION",
  /** WILDFIRE */
  Wildfire = "WILDFIRE",
  /** DLP */
  DLP = "DLP",
  /** AUDIT */
  Audit = "AUDIT",
}

/**
 * Possible log types \
 * {@link KnownLogType} can be used interchangeably with LogType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TRAFFIC** \
 * **THREAT** \
 * **DECRYPTION** \
 * **WILDFIRE** \
 * **DLP** \
 * **AUDIT**
 */
export type LogType = string;

/** Log options possible */
export enum KnownLogOption {
  /** SAME_DESTINATION */
  SameDestination = "SAME_DESTINATION",
  /** INDIVIDUAL_DESTINATION */
  IndividualDestination = "INDIVIDUAL_DESTINATION",
}

/**
 * Log options possible \
 * {@link KnownLogOption} can be used interchangeably with LogOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SAME_DESTINATION** \
 * **INDIVIDUAL_DESTINATION**
 */
export type LogOption = string;

/** Application Insights key */
export interface ApplicationInsights {
  /** Resource id for Application Insights */
  id?: string;
  /** Application Insights key */
  key?: string;
}

export function applicationInsightsSerializer(item: ApplicationInsights): any {
  return { id: item["id"], key: item["key"] };
}

export function applicationInsightsDeserializer(item: any): ApplicationInsights {
  return {
    id: item["id"],
    key: item["key"],
  };
}

/** Log Destination */
export interface LogDestination {
  /** Storage account configurations */
  storageConfigurations?: StorageAccount;
  /** Event Hub configurations */
  eventHubConfigurations?: EventHub;
  /** Monitor Log configurations */
  monitorConfigurations?: MonitorLog;
}

export function logDestinationSerializer(item: LogDestination): any {
  return {
    storageConfigurations: !item["storageConfigurations"]
      ? item["storageConfigurations"]
      : storageAccountSerializer(item["storageConfigurations"]),
    eventHubConfigurations: !item["eventHubConfigurations"]
      ? item["eventHubConfigurations"]
      : eventHubSerializer(item["eventHubConfigurations"]),
    monitorConfigurations: !item["monitorConfigurations"]
      ? item["monitorConfigurations"]
      : monitorLogSerializer(item["monitorConfigurations"]),
  };
}

export function logDestinationDeserializer(item: any): LogDestination {
  return {
    storageConfigurations: !item["storageConfigurations"]
      ? item["storageConfigurations"]
      : storageAccountDeserializer(item["storageConfigurations"]),
    eventHubConfigurations: !item["eventHubConfigurations"]
      ? item["eventHubConfigurations"]
      : eventHubDeserializer(item["eventHubConfigurations"]),
    monitorConfigurations: !item["monitorConfigurations"]
      ? item["monitorConfigurations"]
      : monitorLogDeserializer(item["monitorConfigurations"]),
  };
}

/** Storage Account configurations */
export interface StorageAccount {
  /** Resource ID of storage account */
  id?: string;
  /** Subscription Id */
  subscriptionId?: string;
  /** Storage account name */
  accountName?: string;
}

export function storageAccountSerializer(item: StorageAccount): any {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
  };
}

export function storageAccountDeserializer(item: any): StorageAccount {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
  };
}

/** EventHub configurations */
export interface EventHub {
  /** Resource ID of EventHub */
  id?: string;
  /** Subscription Id */
  subscriptionId?: string;
  /** EventHub name */
  name?: string;
  /** EventHub namespace */
  nameSpace?: string;
  /** EventHub policy name */
  policyName?: string;
}

export function eventHubSerializer(item: EventHub): any {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    name: item["name"],
    nameSpace: item["nameSpace"],
    policyName: item["policyName"],
  };
}

export function eventHubDeserializer(item: any): EventHub {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    name: item["name"],
    nameSpace: item["nameSpace"],
    policyName: item["policyName"],
  };
}

/** MonitorLog configurations */
export interface MonitorLog {
  /** Resource ID of MonitorLog */
  id?: string;
  /** Subscription Id */
  subscriptionId?: string;
  /** MonitorLog workspace */
  workspace?: string;
  /** Primary Key value for Monitor */
  primaryKey?: string;
  /** Secondary Key value for Monitor */
  secondaryKey?: string;
}

export function monitorLogSerializer(item: MonitorLog): any {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    workspace: item["workspace"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

export function monitorLogDeserializer(item: any): MonitorLog {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    workspace: item["workspace"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** Support information for the resource */
export interface SupportInfo {
  /** product SKU associated with given resource */
  productSku?: string;
  /** product Serial associated with given resource */
  productSerial?: string;
  /** account registered in Customer Support Portal */
  accountRegistered?: BooleanEnum;
  /** Support account associated with given resource */
  accountId?: string;
  /** user domain is supported in Customer Support Portal */
  userDomainSupported?: BooleanEnum;
  /** user registered in Customer Support Portal */
  userRegistered?: BooleanEnum;
  /** Product usage is in free trial period */
  freeTrial?: BooleanEnum;
  /** Free trial days remaining */
  freeTrialDaysLeft?: number;
  /** Free trial credit remaining */
  freeTrialCreditLeft?: number;
  /** URL for paloaltonetworks live community */
  helpURL?: string;
  /** URL for paloaltonetworks Customer Service Portal */
  supportURL?: string;
  /** URL for registering product in paloaltonetworks Customer Service Portal */
  registerURL?: string;
}

export function supportInfoDeserializer(item: any): SupportInfo {
  return {
    productSku: item["productSku"],
    productSerial: item["productSerial"],
    accountRegistered: item["accountRegistered"],
    accountId: item["accountId"],
    userDomainSupported: item["userDomainSupported"],
    userRegistered: item["userRegistered"],
    freeTrial: item["freeTrial"],
    freeTrialDaysLeft: item["freeTrialDaysLeft"],
    freeTrialCreditLeft: item["freeTrialCreditLeft"],
    helpURL: item["helpURL"],
    supportURL: item["supportURL"],
    registerURL: item["registerURL"],
  };
}

/** PaloAltoNetworks LocalRulestack */
export interface LocalRulestackResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: RulestackProperties;
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
}

export function localRulestackResourceSerializer(item: LocalRulestackResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: rulestackPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
  };
}

export function localRulestackResourceDeserializer(item: any): LocalRulestackResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: rulestackPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesDeserializer(item["identity"]),
  };
}

/** The type used for update operations of the LocalRulestackResource. */
export interface LocalRulestackResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: AzureResourceManagerManagedIdentityProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The updatable properties of the LocalRulestackResource. */
  properties?: LocalRulestackResourceUpdateProperties;
}

export function localRulestackResourceUpdateSerializer(item: LocalRulestackResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : azureResourceManagerManagedIdentityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : localRulestackResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the LocalRulestackResource. */
export interface LocalRulestackResourceUpdateProperties {
  /** PanEtag info */
  panEtag?: string;
  /** Rulestack Location, Required for GlobalRulestacks, Not for LocalRulestacks */
  panLocation?: string;
  /** Rulestack Type */
  scope?: ScopeType;
  /** subscription scope of global rulestack */
  associatedSubscriptions?: string[];
  /** rulestack description */
  description?: string;
  /** Mode for default rules creation */
  defaultMode?: DefaultMode;
  /** minimum version */
  minAppIdVersion?: string;
  /** Security Profile */
  securityServices?: SecurityServices;
}

export function localRulestackResourceUpdatePropertiesSerializer(
  item: LocalRulestackResourceUpdateProperties,
): any {
  return {
    panEtag: item["panEtag"],
    panLocation: item["panLocation"],
    scope: item["scope"],
    associatedSubscriptions: !item["associatedSubscriptions"]
      ? item["associatedSubscriptions"]
      : item["associatedSubscriptions"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    defaultMode: item["defaultMode"],
    minAppIdVersion: item["minAppIdVersion"],
    securityServices: !item["securityServices"]
      ? item["securityServices"]
      : securityServicesSerializer(item["securityServices"]),
  };
}

/** The response of a LocalRulestackResource list operation. */
export interface _LocalRulestackResourceListResult {
  /** The LocalRulestackResource items on this page */
  value: LocalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _localRulestackResourceListResultDeserializer(
  item: any,
): _LocalRulestackResourceListResult {
  return {
    value: localRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function localRulestackResourceArraySerializer(
  result: Array<LocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return localRulestackResourceSerializer(item);
  });
}

export function localRulestackResourceArrayDeserializer(
  result: Array<LocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return localRulestackResourceDeserializer(item);
  });
}

/** Firewall Metrics Object */
export interface MetricsObjectFirewallResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: MetricsObject;
}

export function metricsObjectFirewallResourceSerializer(item: MetricsObjectFirewallResource): any {
  return { properties: metricsObjectSerializer(item["properties"]) };
}

export function metricsObjectFirewallResourceDeserializer(
  item: any,
): MetricsObjectFirewallResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: metricsObjectDeserializer(item["properties"]),
  };
}

/** Config for Metrics for firewall metrics */
export interface MetricsObject {
  /** Resource Id of application insights resource */
  applicationInsightsResourceId: string;
  /** Connection string of application insights resource */
  applicationInsightsConnectionString: string;
  /** read only string representing last create or update */
  panEtag?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function metricsObjectSerializer(item: MetricsObject): any {
  return {
    applicationInsightsResourceId: item["applicationInsightsResourceId"],
    applicationInsightsConnectionString: item["applicationInsightsConnectionString"],
    panEtag: item["panEtag"],
  };
}

export function metricsObjectDeserializer(item: any): MetricsObject {
  return {
    applicationInsightsResourceId: item["applicationInsightsResourceId"],
    applicationInsightsConnectionString: item["applicationInsightsConnectionString"],
    panEtag: item["panEtag"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a MetricsObjectFirewallResource list operation. */
export interface _MetricsObjectFirewallResourceListResult {
  /** The MetricsObjectFirewallResource items on this page */
  value: MetricsObjectFirewallResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsObjectFirewallResourceListResultDeserializer(
  item: any,
): _MetricsObjectFirewallResourceListResult {
  return {
    value: metricsObjectFirewallResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricsObjectFirewallResourceArraySerializer(
  result: Array<MetricsObjectFirewallResource>,
): any[] {
  return result.map((item) => {
    return metricsObjectFirewallResourceSerializer(item);
  });
}

export function metricsObjectFirewallResourceArrayDeserializer(
  result: Array<MetricsObjectFirewallResource>,
): any[] {
  return result.map((item) => {
    return metricsObjectFirewallResourceDeserializer(item);
  });
}

/** Firewall Status */
export interface FirewallStatusResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: FirewallStatusProperty;
}

export function firewallStatusResourceDeserializer(item: any): FirewallStatusResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: firewallStatusPropertyDeserializer(item["properties"]),
  };
}

/** Firewall Status */
export interface FirewallStatusProperty {
  /** Panorama Managed: Default is False. Default will be CloudSec managed */
  readonly isPanoramaManaged?: BooleanEnum;
  /** Current status of the Firewall */
  readonly healthStatus?: HealthStatus;
  /** Detail description of current health of the Firewall */
  readonly healthReason?: string;
  /** Panorama Status */
  readonly panoramaStatus?: PanoramaStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ReadOnlyProvisioningState;
  /** Strata Cloud Manager */
  readonly isStrataCloudManaged?: BooleanEnum;
  /** This field is only present if Strata Cloud Manager is managing the policy for this firewall */
  strataCloudManagerInfo?: StrataCloudManagerInfo;
}

export function firewallStatusPropertyDeserializer(item: any): FirewallStatusProperty {
  return {
    isPanoramaManaged: item["isPanoramaManaged"],
    healthStatus: item["healthStatus"],
    healthReason: item["healthReason"],
    panoramaStatus: !item["panoramaStatus"]
      ? item["panoramaStatus"]
      : panoramaStatusDeserializer(item["panoramaStatus"]),
    provisioningState: item["provisioningState"],
    isStrataCloudManaged: item["isStrataCloudManaged"],
    strataCloudManagerInfo: !item["strataCloudManagerInfo"]
      ? item["strataCloudManagerInfo"]
      : strataCloudManagerInfoDeserializer(item["strataCloudManagerInfo"]),
  };
}

/** Status Codes for the Firewall */
export enum KnownHealthStatus {
  /** GREEN */
  Green = "GREEN",
  /** YELLOW */
  Yellow = "YELLOW",
  /** RED */
  RED = "RED",
  /** INITIALIZING */
  Initializing = "INITIALIZING",
}

/**
 * Status Codes for the Firewall \
 * {@link KnownHealthStatus} can be used interchangeably with HealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GREEN** \
 * **YELLOW** \
 * **RED** \
 * **INITIALIZING**
 */
export type HealthStatus = string;

/** Panorama connectivity information */
export interface PanoramaStatus {
  /** Primary Panorama connection status */
  readonly panoramaServerStatus?: ServerStatus;
  /** Secondary Panorama connection status */
  readonly panoramaServer2Status?: ServerStatus;
}

export function panoramaStatusDeserializer(item: any): PanoramaStatus {
  return {
    panoramaServerStatus: item["panoramaServerStatus"],
    panoramaServer2Status: item["panoramaServer2Status"],
  };
}

/** Connectivity Status for Panorama Server */
export enum KnownServerStatus {
  /** UP */
  UP = "UP",
  /** DOWN */
  Down = "DOWN",
}

/**
 * Connectivity Status for Panorama Server \
 * {@link KnownServerStatus} can be used interchangeably with ServerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UP** \
 * **DOWN**
 */
export type ServerStatus = string;

/** Provisioning state of the firewall resource. */
export enum KnownReadOnlyProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning state of the firewall resource. \
 * {@link KnownReadOnlyProvisioningState} can be used interchangeably with ReadOnlyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Deleted**
 */
export type ReadOnlyProvisioningState = string;

/** Strata Cloud Manager Info */
export interface StrataCloudManagerInfo {
  /** Strata Cloud Manager folder in which this firewall has been placed */
  folderName?: string;
  /** URL for Strata Cloud Manager */
  hubUrl?: string;
}

export function strataCloudManagerInfoDeserializer(item: any): StrataCloudManagerInfo {
  return {
    folderName: item["folderName"],
    hubUrl: item["hubUrl"],
  };
}

/** The response of a FirewallStatusResource list operation. */
export interface _FirewallStatusResourceListResult {
  /** The FirewallStatusResource items on this page */
  value: FirewallStatusResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallStatusResourceListResultDeserializer(
  item: any,
): _FirewallStatusResourceListResult {
  return {
    value: firewallStatusResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firewallStatusResourceArrayDeserializer(
  result: Array<FirewallStatusResource>,
): any[] {
  return result.map((item) => {
    return firewallStatusResourceDeserializer(item);
  });
}

/** LocalRulestack Certificate Object */
export interface CertificateObjectLocalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: CertificateObject;
}

export function certificateObjectLocalRulestackResourceSerializer(
  item: CertificateObjectLocalRulestackResource,
): any {
  return { properties: certificateObjectSerializer(item["properties"]) };
}

export function certificateObjectLocalRulestackResourceDeserializer(
  item: any,
): CertificateObjectLocalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: certificateObjectDeserializer(item["properties"]),
  };
}

/** The response of a CertificateObjectLocalRulestackResource list operation. */
export interface _CertificateObjectLocalRulestackResourceListResult {
  /** The CertificateObjectLocalRulestackResource items on this page */
  value: CertificateObjectLocalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateObjectLocalRulestackResourceListResultDeserializer(
  item: any,
): _CertificateObjectLocalRulestackResourceListResult {
  return {
    value: certificateObjectLocalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateObjectLocalRulestackResourceArraySerializer(
  result: Array<CertificateObjectLocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return certificateObjectLocalRulestackResourceSerializer(item);
  });
}

export function certificateObjectLocalRulestackResourceArrayDeserializer(
  result: Array<CertificateObjectLocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return certificateObjectLocalRulestackResourceDeserializer(item);
  });
}

/** LocalRulestack fqdnList */
export interface FqdnListLocalRulestackResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: FqdnObject;
}

export function fqdnListLocalRulestackResourceSerializer(
  item: FqdnListLocalRulestackResource,
): any {
  return { properties: fqdnObjectSerializer(item["properties"]) };
}

export function fqdnListLocalRulestackResourceDeserializer(
  item: any,
): FqdnListLocalRulestackResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: fqdnObjectDeserializer(item["properties"]),
  };
}

/** The response of a FqdnListLocalRulestackResource list operation. */
export interface _FqdnListLocalRulestackResourceListResult {
  /** The FqdnListLocalRulestackResource items on this page */
  value: FqdnListLocalRulestackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fqdnListLocalRulestackResourceListResultDeserializer(
  item: any,
): _FqdnListLocalRulestackResourceListResult {
  return {
    value: fqdnListLocalRulestackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fqdnListLocalRulestackResourceArraySerializer(
  result: Array<FqdnListLocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return fqdnListLocalRulestackResourceSerializer(item);
  });
}

export function fqdnListLocalRulestackResourceArrayDeserializer(
  result: Array<FqdnListLocalRulestackResource>,
): any[] {
  return result.map((item) => {
    return fqdnListLocalRulestackResourceDeserializer(item);
  });
}

/** LocalRulestack rule list */
export interface LocalRulesResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: RuleEntry;
}

export function localRulesResourceSerializer(item: LocalRulesResource): any {
  return { properties: ruleEntrySerializer(item["properties"]) };
}

export function localRulesResourceDeserializer(item: any): LocalRulesResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: ruleEntryDeserializer(item["properties"]),
  };
}

/** The response of a LocalRulesResource list operation. */
export interface _LocalRulesResourceListResult {
  /** The LocalRulesResource items on this page */
  value: LocalRulesResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _localRulesResourceListResultDeserializer(
  item: any,
): _LocalRulesResourceListResult {
  return {
    value: localRulesResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function localRulesResourceArraySerializer(result: Array<LocalRulesResource>): any[] {
  return result.map((item) => {
    return localRulesResourceSerializer(item);
  });
}

export function localRulesResourceArrayDeserializer(result: Array<LocalRulesResource>): any[] {
  return result.map((item) => {
    return localRulesResourceDeserializer(item);
  });
}

/** LocalRulestack prefixList */
export interface PrefixListResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: PrefixObject;
}

export function prefixListResourceSerializer(item: PrefixListResource): any {
  return { properties: prefixObjectSerializer(item["properties"]) };
}

export function prefixListResourceDeserializer(item: any): PrefixListResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: prefixObjectDeserializer(item["properties"]),
  };
}

/** The response of a PrefixListResource list operation. */
export interface _PrefixListResourceListResult {
  /** The PrefixListResource items on this page */
  value: PrefixListResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _prefixListResourceListResultDeserializer(
  item: any,
): _PrefixListResourceListResult {
  return {
    value: prefixListResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function prefixListResourceArraySerializer(result: Array<PrefixListResource>): any[] {
  return result.map((item) => {
    return prefixListResourceSerializer(item);
  });
}

export function prefixListResourceArrayDeserializer(result: Array<PrefixListResource>): any[] {
  return result.map((item) => {
    return prefixListResourceDeserializer(item);
  });
}

/** Create Product Serial Number Request status */
export interface ProductSerialNumberRequestStatus {
  /** allocation status of the product serial number */
  status: string;
}

export function productSerialNumberRequestStatusDeserializer(
  item: any,
): ProductSerialNumberRequestStatus {
  return {
    status: item["status"],
  };
}

/** Cloud Manager Tenant */
export interface CloudManagerTenantList {
  /** List of Cloud Manager Tenants */
  value: string[];
}

export function cloudManagerTenantListDeserializer(item: any): CloudManagerTenantList {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
  };
}

/** Product serial and status for the service */
export interface ProductSerialNumberStatus {
  /** product Serial associated with given resource */
  serialNumber?: string;
  /** allocation status of the product serial number */
  status: ProductSerialStatusValues;
}

export function productSerialNumberStatusDeserializer(item: any): ProductSerialNumberStatus {
  return {
    serialNumber: item["serialNumber"],
    status: item["status"],
  };
}

/** allocation status of the product serial number */
export type ProductSerialStatusValues = "Allocated" | "InProgress";

/** Support information for the service */
export interface SupportInfoModel {
  /** product SKU associated with given resource */
  productSku?: string;
  /** product Serial associated with given resource */
  productSerial?: string;
  /** account registered in Customer Support Portal */
  accountRegistrationStatus?: RegistrationStatus;
  /** Support account associated with given resource */
  accountId?: string;
  /** Product usage is in free trial period */
  freeTrial?: EnableStatus;
  /** Free trial days remaining */
  freeTrialDaysLeft?: number;
  /** Free trial credit remaining */
  freeTrialCreditLeft?: number;
  /** URL for paloaltonetworks live community */
  helpURL?: string;
  /** URL for paloaltonetworks Customer Service Portal */
  supportURL?: string;
  /** URL for registering product in paloaltonetworks Customer Service Portal */
  registerURL?: string;
  /** URL for Strata Cloud Manager */
  hubUrl?: string;
  /** credits purchased, unit per hour */
  credits?: number;
  /** monthly credit is computed as credits * days in calendar month */
  monthlyCreditLeft?: number;
  /** date in format yyyy-mm-dd */
  startDateForCredits?: string;
  /** date in format yyyy-mm-dd */
  endDateForCredits?: string;
}

export function supportInfoModelDeserializer(item: any): SupportInfoModel {
  return {
    productSku: item["productSku"],
    productSerial: item["productSerial"],
    accountRegistrationStatus: item["accountRegistrationStatus"],
    accountId: item["accountId"],
    freeTrial: item["freeTrial"],
    freeTrialDaysLeft: item["freeTrialDaysLeft"],
    freeTrialCreditLeft: item["freeTrialCreditLeft"],
    helpURL: item["helpURL"],
    supportURL: item["supportURL"],
    registerURL: item["registerURL"],
    hubUrl: item["hubUrl"],
    credits: item["credits"],
    monthlyCreditLeft: item["monthlyCreditLeft"],
    startDateForCredits: item["startDateForCredits"],
    endDateForCredits: item["endDateForCredits"],
  };
}

/** Registration status */
export enum KnownRegistrationStatus {
  /** Registered */
  Registered = "Registered",
  /** Not Registered */
  NotRegistered = "Not Registered",
}

/**
 * Registration status \
 * {@link KnownRegistrationStatus} can be used interchangeably with RegistrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Registered** \
 * **Not Registered**
 */
export type RegistrationStatus = string;

/** Enable status */
export enum KnownEnableStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enable status \
 * {@link KnownEnableStatus} can be used interchangeably with EnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EnableStatus = string;

/** Known values of {@link AdvSecurityObjectTypeEnum} that the service accepts. */
export enum KnownAdvSecurityObjectTypeEnum {
  /** urlCustom */
  UrlCustom = "urlCustom",
  /** feeds */
  Feeds = "feeds",
}

/** Type of AdvSecurityObjectTypeEnum */
export type AdvSecurityObjectTypeEnum = string;

/** Known values of {@link SecurityServicesTypeEnum} that the service accepts. */
export enum KnownSecurityServicesTypeEnum {
  /** antiSpyware */
  AntiSpyware = "antiSpyware",
  /** antiVirus */
  AntiVirus = "antiVirus",
  /** ipsVulnerability */
  IpsVulnerability = "ipsVulnerability",
  /** urlFiltering */
  UrlFiltering = "urlFiltering",
  /** fileBlocking */
  FileBlocking = "fileBlocking",
  /** dnsSubscription */
  DnsSubscription = "dnsSubscription",
}

/** Type of SecurityServicesTypeEnum */
export type SecurityServicesTypeEnum = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-08 API version. */
  V20251008 = "2025-10-08",
}
