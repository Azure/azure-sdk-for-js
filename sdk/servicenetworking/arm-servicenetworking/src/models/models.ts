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
  user = "user",
  /** Indicates the operation is initiated by a system. */
  system = "system",
  /** Indicates the operation is initiated by a user or system. */
  "user,system" = "user,system",
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

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface TrafficController extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: TrafficControllerProperties;
}

export function trafficControllerSerializer(item: TrafficController): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : trafficControllerPropertiesSerializer(item["properties"]),
  };
}

export function trafficControllerDeserializer(item: any): TrafficController {
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
      : trafficControllerPropertiesDeserializer(item["properties"]),
  };
}

/** Traffic Controller Properties. */
export interface TrafficControllerProperties {
  /** Configuration Endpoints. */
  readonly configurationEndpoints?: string[];
  /** Frontends References List */
  readonly frontends?: ResourceId[];
  /** Associations References List */
  readonly associations?: ResourceId[];
  /** Security Policies References List */
  readonly securityPolicies?: ResourceId[];
  /** Security Policy Configuration */
  securityPolicyConfigurations?: SecurityPolicyConfigurations;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function trafficControllerPropertiesSerializer(item: TrafficControllerProperties): any {
  return {
    securityPolicyConfigurations: !item["securityPolicyConfigurations"]
      ? item["securityPolicyConfigurations"]
      : securityPolicyConfigurationsSerializer(item["securityPolicyConfigurations"]),
  };
}

export function trafficControllerPropertiesDeserializer(item: any): TrafficControllerProperties {
  return {
    configurationEndpoints: !item["configurationEndpoints"]
      ? item["configurationEndpoints"]
      : item["configurationEndpoints"].map((p: any) => {
          return p;
        }),
    frontends: !item["frontends"]
      ? item["frontends"]
      : resourceIdArrayDeserializer(item["frontends"]),
    associations: !item["associations"]
      ? item["associations"]
      : resourceIdArrayDeserializer(item["associations"]),
    securityPolicies: !item["securityPolicies"]
      ? item["securityPolicies"]
      : resourceIdArrayDeserializer(item["securityPolicies"]),
    securityPolicyConfigurations: !item["securityPolicyConfigurations"]
      ? item["securityPolicyConfigurations"]
      : securityPolicyConfigurationsDeserializer(item["securityPolicyConfigurations"]),
    provisioningState: item["provisioningState"],
  };
}

export function resourceIdArrayDeserializer(result: Array<ResourceId>): any[] {
  return result.map((item) => {
    return resourceIdDeserializer(item);
  });
}

/** Resource ID definition used by parent to reference child resources. */
export interface ResourceId {
  /** Resource ID of child resource. */
  id: string;
}

export function resourceIdDeserializer(item: any): ResourceId {
  return {
    id: item["id"],
  };
}

/** SecurityPolicyConfigurations Subresource of Traffic Controller. */
export interface SecurityPolicyConfigurations {
  /** Contains reference to a WAF-type security policy that is applied at the Traffic Controller level. */
  wafSecurityPolicy?: WafSecurityPolicy;
}

export function securityPolicyConfigurationsSerializer(item: SecurityPolicyConfigurations): any {
  return {
    wafSecurityPolicy: !item["wafSecurityPolicy"]
      ? item["wafSecurityPolicy"]
      : wafSecurityPolicySerializer(item["wafSecurityPolicy"]),
  };
}

export function securityPolicyConfigurationsDeserializer(item: any): SecurityPolicyConfigurations {
  return {
    wafSecurityPolicy: !item["wafSecurityPolicy"]
      ? item["wafSecurityPolicy"]
      : wafSecurityPolicyDeserializer(item["wafSecurityPolicy"]),
  };
}

/** Web Application Firewall Security Policy */
export interface WafSecurityPolicy {
  /** Resource ID of the Waf Security Policy */
  id: string;
}

export function wafSecurityPolicySerializer(item: WafSecurityPolicy): any {
  return { id: item["id"] };
}

export function wafSecurityPolicyDeserializer(item: any): WafSecurityPolicy {
  return {
    id: item["id"],
  };
}

/** Resource Provisioning State Enum */
export enum KnownProvisioningState {
  /** Resource in Provisioning State */
  Provisioning = "Provisioning",
  /** Resource in Updating State */
  Updating = "Updating",
  /** Resource in Deleting State */
  Deleting = "Deleting",
  /** Resource in Accepted State */
  Accepted = "Accepted",
  /** Resource in Succeeded State */
  Succeeded = "Succeeded",
  /** Resource in Failed State */
  Failed = "Failed",
  /** Resource in Canceled State */
  Canceled = "Canceled",
}

/**
 * Resource Provisioning State Enum \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Resource in Provisioning State \
 * **Updating**: Resource in Updating State \
 * **Deleting**: Resource in Deleting State \
 * **Accepted**: Resource in Accepted State \
 * **Succeeded**: Resource in Succeeded State \
 * **Failed**: Resource in Failed State \
 * **Canceled**: Resource in Canceled State
 */
export type ProvisioningState = string;

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

/** The type used for update operations of the TrafficController. */
export interface TrafficControllerUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: TrafficControllerUpdateProperties;
}

export function trafficControllerUpdateSerializer(item: TrafficControllerUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : trafficControllerUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the TrafficController. */
export interface TrafficControllerUpdateProperties {
  /** Security Policy Configuration */
  securityPolicyConfigurations?: SecurityPolicyConfigurations;
}

export function trafficControllerUpdatePropertiesSerializer(
  item: TrafficControllerUpdateProperties,
): any {
  return {
    securityPolicyConfigurations: !item["securityPolicyConfigurations"]
      ? item["securityPolicyConfigurations"]
      : securityPolicyConfigurationsSerializer(item["securityPolicyConfigurations"]),
  };
}

/** The response of a TrafficController list operation. */
export interface _TrafficControllerListResult {
  /** The TrafficController items on this page */
  value: TrafficController[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _trafficControllerListResultDeserializer(item: any): _TrafficControllerListResult {
  return {
    value: trafficControllerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function trafficControllerArraySerializer(result: Array<TrafficController>): any[] {
  return result.map((item) => {
    return trafficControllerSerializer(item);
  });
}

export function trafficControllerArrayDeserializer(result: Array<TrafficController>): any[] {
  return result.map((item) => {
    return trafficControllerDeserializer(item);
  });
}

/** SecurityPolicy Subresource of Traffic Controller. */
export interface SecurityPolicy extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SecurityPolicyProperties;
}

export function securityPolicySerializer(item: SecurityPolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : securityPolicyPropertiesSerializer(item["properties"]),
  };
}

export function securityPolicyDeserializer(item: any): SecurityPolicy {
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
      : securityPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** SecurityPolicy Properties. */
export interface SecurityPolicyProperties {
  /** Type of the Traffic Controller Security Policy */
  readonly policyType?: PolicyType;
  /** Web Application Firewall Policy of the Traffic Controller Security Policy */
  wafPolicy?: WafPolicy;
  /** Provisioning State of Traffic Controller SecurityPolicy Resource */
  readonly provisioningState?: ProvisioningState;
}

export function securityPolicyPropertiesSerializer(item: SecurityPolicyProperties): any {
  return {
    wafPolicy: !item["wafPolicy"] ? item["wafPolicy"] : wafPolicySerializer(item["wafPolicy"]),
  };
}

export function securityPolicyPropertiesDeserializer(item: any): SecurityPolicyProperties {
  return {
    policyType: item["policyType"],
    wafPolicy: !item["wafPolicy"] ? item["wafPolicy"] : wafPolicyDeserializer(item["wafPolicy"]),
    provisioningState: item["provisioningState"],
  };
}

/** Policy Type of the Security Policy */
export enum KnownPolicyType {
  /** Policy of Type WAF */
  WAF = "waf",
}

/**
 * Policy Type of the Security Policy \
 * {@link KnownPolicyType} can be used interchangeably with PolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **waf**: Policy of Type WAF
 */
export type PolicyType = string;

/** Web Application Firewall Policy */
export interface WafPolicy {
  /** Resource ID of the WAF */
  id: string;
}

export function wafPolicySerializer(item: WafPolicy): any {
  return { id: item["id"] };
}

export function wafPolicyDeserializer(item: any): WafPolicy {
  return {
    id: item["id"],
  };
}

/** The type used for update operations of the SecurityPolicy. */
export interface SecurityPolicyUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SecurityPolicyUpdateProperties;
}

export function securityPolicyUpdateSerializer(item: SecurityPolicyUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : securityPolicyUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SecurityPolicy. */
export interface SecurityPolicyUpdateProperties {
  /** Web Application Firewall Policy of the Traffic Controller Security Policy */
  wafPolicy?: WafPolicy;
}

export function securityPolicyUpdatePropertiesSerializer(
  item: SecurityPolicyUpdateProperties,
): any {
  return {
    wafPolicy: !item["wafPolicy"] ? item["wafPolicy"] : wafPolicySerializer(item["wafPolicy"]),
  };
}

/** The response of a SecurityPolicy list operation. */
export interface _SecurityPolicyListResult {
  /** The SecurityPolicy items on this page */
  value: SecurityPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityPolicyListResultDeserializer(item: any): _SecurityPolicyListResult {
  return {
    value: securityPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityPolicyArraySerializer(result: Array<SecurityPolicy>): any[] {
  return result.map((item) => {
    return securityPolicySerializer(item);
  });
}

export function securityPolicyArrayDeserializer(result: Array<SecurityPolicy>): any[] {
  return result.map((item) => {
    return securityPolicyDeserializer(item);
  });
}

/** Frontend Sub Resource of Traffic Controller. */
export interface Frontend extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FrontendProperties;
}

export function frontendSerializer(item: Frontend): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : frontendPropertiesSerializer(item["properties"]),
  };
}

export function frontendDeserializer(item: any): Frontend {
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
      : frontendPropertiesDeserializer(item["properties"]),
  };
}

/** Frontend Properties. */
export interface FrontendProperties {
  /** The Fully Qualified Domain Name of the DNS record associated to a Traffic Controller frontend. */
  readonly fqdn?: string;
  /** Provisioning State of Traffic Controller Frontend Resource */
  readonly provisioningState?: ProvisioningState;
}

export function frontendPropertiesSerializer(item: FrontendProperties): any {
  return item;
}

export function frontendPropertiesDeserializer(item: any): FrontendProperties {
  return {
    fqdn: item["fqdn"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the Frontend. */
export interface FrontendUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function frontendUpdateSerializer(item: FrontendUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Frontend list operation. */
export interface _FrontendListResult {
  /** The Frontend items on this page */
  value: Frontend[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _frontendListResultDeserializer(item: any): _FrontendListResult {
  return {
    value: frontendArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function frontendArraySerializer(result: Array<Frontend>): any[] {
  return result.map((item) => {
    return frontendSerializer(item);
  });
}

export function frontendArrayDeserializer(result: Array<Frontend>): any[] {
  return result.map((item) => {
    return frontendDeserializer(item);
  });
}

/** Association Subresource of Traffic Controller */
export interface Association extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AssociationProperties;
}

export function associationSerializer(item: Association): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : associationPropertiesSerializer(item["properties"]),
  };
}

export function associationDeserializer(item: any): Association {
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
      : associationPropertiesDeserializer(item["properties"]),
  };
}

/** Association Properties. */
export interface AssociationProperties {
  /** Association Type */
  associationType: AssociationType;
  /** Association Subnet */
  subnet?: AssociationSubnet;
  /** Provisioning State of Traffic Controller Association Resource */
  readonly provisioningState?: ProvisioningState;
}

export function associationPropertiesSerializer(item: AssociationProperties): any {
  return {
    associationType: item["associationType"],
    subnet: !item["subnet"] ? item["subnet"] : associationSubnetSerializer(item["subnet"]),
  };
}

export function associationPropertiesDeserializer(item: any): AssociationProperties {
  return {
    associationType: item["associationType"],
    subnet: !item["subnet"] ? item["subnet"] : associationSubnetDeserializer(item["subnet"]),
    provisioningState: item["provisioningState"],
  };
}

/** Association Type Enum */
export enum KnownAssociationType {
  /** Association of Type Subnet */
  subnets = "subnets",
}

/**
 * Association Type Enum \
 * {@link KnownAssociationType} can be used interchangeably with AssociationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **subnets**: Association of Type Subnet
 */
export type AssociationType = string;

/** Association Subnet. */
export interface AssociationSubnet {
  /** Association ID. */
  id: string;
}

export function associationSubnetSerializer(item: AssociationSubnet): any {
  return { id: item["id"] };
}

export function associationSubnetDeserializer(item: any): AssociationSubnet {
  return {
    id: item["id"],
  };
}

/** The type used for update operations of the Association. */
export interface AssociationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AssociationUpdateProperties;
}

export function associationUpdateSerializer(item: AssociationUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : associationUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Association. */
export interface AssociationUpdateProperties {
  /** Association Type */
  associationType?: AssociationType;
  /** Association Subnet */
  subnet?: AssociationSubnetUpdate;
}

export function associationUpdatePropertiesSerializer(item: AssociationUpdateProperties): any {
  return {
    associationType: item["associationType"],
    subnet: !item["subnet"] ? item["subnet"] : associationSubnetUpdateSerializer(item["subnet"]),
  };
}

/** Association Subnet. */
export interface AssociationSubnetUpdate {
  /** Association ID. */
  id: string;
}

export function associationSubnetUpdateSerializer(item: AssociationSubnetUpdate): any {
  return { id: item["id"] };
}

/** The response of a Association list operation. */
export interface _AssociationListResult {
  /** The Association items on this page */
  value: Association[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _associationListResultDeserializer(item: any): _AssociationListResult {
  return {
    value: associationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function associationArraySerializer(result: Array<Association>): any[] {
  return result.map((item) => {
    return associationSerializer(item);
  });
}

export function associationArrayDeserializer(result: Array<Association>): any[] {
  return result.map((item) => {
    return associationDeserializer(item);
  });
}

/** Api versions */
export enum KnownVersions {
  /** 2023-11-01 stable version */
  v2023_11_01 = "2023-11-01",
  /** 2025-01-01 stable version */
  v2025_05_01 = "2025-01-01",
}
