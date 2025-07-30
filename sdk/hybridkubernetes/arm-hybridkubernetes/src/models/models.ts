// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";

/** The paginated list of connected cluster API operations. */
export interface _OperationList {
  /** The list of connected cluster API operations. */
  readonly value: Operation[];
  /** The link to fetch the next page of connected cluster API operations. */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** Represents a connected cluster. */
export interface ConnectedCluster extends TrackedResource {
  /** The identity of the connected cluster. */
  identity: ConnectedClusterIdentity;
  /** The kind of connected cluster. */
  kind?: ConnectedClusterKind;
  /** Describes the connected cluster resource properties. */
  properties: ConnectedClusterProperties;
}

export function connectedClusterSerializer(item: ConnectedCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: connectedClusterIdentitySerializer(item["identity"]),
    kind: item["kind"],
    properties: connectedClusterPropertiesSerializer(item["properties"]),
  };
}

export function connectedClusterDeserializer(item: any): ConnectedCluster {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: connectedClusterIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    properties: connectedClusterPropertiesDeserializer(item["properties"]),
  };
}

/** Identity for the connected cluster. */
export interface ConnectedClusterIdentity {
  /** The principal id of connected cluster identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the connected cluster. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the connected cluster. The type 'SystemAssigned, includes a system created identity. The type 'None' means no identity is assigned to the connected cluster. */
  type: ResourceIdentityType;
}

export function connectedClusterIdentitySerializer(item: ConnectedClusterIdentity): any {
  return { type: item["type"] };
}

export function connectedClusterIdentityDeserializer(item: any): ConnectedClusterIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The type of identity used for the connected cluster. The type 'SystemAssigned, includes a system created identity. The type 'None' means no identity is assigned to the connected cluster. */
export type ResourceIdentityType = "None" | "SystemAssigned";

/** Indicates the kind of Arc connected cluster based on host infrastructure. */
export enum KnownConnectedClusterKind {
  ProvisionedCluster = "ProvisionedCluster",
  AWS = "AWS",
}

/**
 * Indicates the kind of Arc connected cluster based on host infrastructure. \
 * {@link KnownConnectedClusterKind} can be used interchangeably with ConnectedClusterKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ProvisionedCluster** \
 * **AWS**
 */
export type ConnectedClusterKind = string;

/** Properties of the connected cluster. */
export interface ConnectedClusterProperties {
  /** Base64 encoded public certificate used by the agent to do the initial handshake to the backend services in Azure. */
  agentPublicKeyCertificate: string;
  /** The Kubernetes version of the connected cluster resource */
  readonly kubernetesVersion?: string;
  /** Number of nodes present in the connected cluster resource */
  readonly totalNodeCount?: number;
  /** Number of CPU cores present in the connected cluster resource */
  readonly totalCoreCount?: number;
  /** Version of the agent running on the connected cluster resource */
  readonly agentVersion?: string;
  /** Provisioning state of the connected cluster resource. */
  provisioningState?: ProvisioningState;
  /** The Kubernetes distribution running on this connected cluster. */
  distribution?: string;
  /** The Kubernetes distribution version on this connected cluster. */
  distributionVersion?: string;
  /** The infrastructure on which the Kubernetes cluster represented by this connected cluster is running on. */
  infrastructure?: string;
  /** Connected cluster offering */
  readonly offering?: string;
  /** Expiration time of the managed identity certificate */
  readonly managedIdentityCertificateExpirationTime?: Date;
  /** Time representing the last instance when heart beat was received from the cluster */
  readonly lastConnectivityTime?: Date;
  /** Represents the connectivity status of the connected cluster. */
  readonly connectivityStatus?: ConnectivityStatus;
  /** Property which describes the state of private link on a connected cluster resource. */
  privateLinkState?: PrivateLinkState;
  /** This is populated only if privateLinkState is enabled. The resource id of the private link scope this connected cluster is assigned to, if any. */
  privateLinkScopeResourceId?: string;
  /** Indicates whether Azure Hybrid Benefit is opted in */
  azureHybridBenefit?: AzureHybridBenefit;
  /** AAD profile for the connected cluster. */
  aadProfile?: AadProfile;
  /** Arc agentry configuration for the provisioned cluster. */
  arcAgentProfile?: ArcAgentProfile;
  /** Security profile for the connected cluster. */
  securityProfile?: SecurityProfile;
  /** Open ID Connect (OIDC) Issuer Profile for the connected cluster. */
  oidcIssuerProfile?: OidcIssuerProfile;
  /** Details of the gateway used by the Arc router for connectivity. */
  gateway?: Gateway | null;
  /** Configuration settings for customizing the behavior of the connected cluster. */
  arcAgentryConfigurations?: ArcAgentryConfigurations[] | null;
  /** More properties related to the Connected Cluster */
  readonly miscellaneousProperties?: Record<string, string>;
}

export function connectedClusterPropertiesSerializer(item: ConnectedClusterProperties): any {
  return {
    agentPublicKeyCertificate: item["agentPublicKeyCertificate"],
    provisioningState: item["provisioningState"],
    distribution: item["distribution"],
    distributionVersion: item["distributionVersion"],
    infrastructure: item["infrastructure"],
    privateLinkState: item["privateLinkState"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    azureHybridBenefit: item["azureHybridBenefit"],
    aadProfile: !item["aadProfile"] ? item["aadProfile"] : aadProfileSerializer(item["aadProfile"]),
    arcAgentProfile: !item["arcAgentProfile"]
      ? item["arcAgentProfile"]
      : arcAgentProfileSerializer(item["arcAgentProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : oidcIssuerProfileSerializer(item["oidcIssuerProfile"]),
    gateway: !item["gateway"] ? item["gateway"] : gatewaySerializer(item["gateway"]),
    arcAgentryConfigurations: !item["arcAgentryConfigurations"]
      ? item["arcAgentryConfigurations"]
      : arcAgentryConfigurationsArraySerializer(item["arcAgentryConfigurations"]),
  };
}

export function connectedClusterPropertiesDeserializer(item: any): ConnectedClusterProperties {
  return {
    agentPublicKeyCertificate: item["agentPublicKeyCertificate"],
    kubernetesVersion: item["kubernetesVersion"],
    totalNodeCount: item["totalNodeCount"],
    totalCoreCount: item["totalCoreCount"],
    agentVersion: item["agentVersion"],
    provisioningState: item["provisioningState"],
    distribution: item["distribution"],
    distributionVersion: item["distributionVersion"],
    infrastructure: item["infrastructure"],
    offering: item["offering"],
    managedIdentityCertificateExpirationTime: !item["managedIdentityCertificateExpirationTime"]
      ? item["managedIdentityCertificateExpirationTime"]
      : new Date(item["managedIdentityCertificateExpirationTime"]),
    lastConnectivityTime: !item["lastConnectivityTime"]
      ? item["lastConnectivityTime"]
      : new Date(item["lastConnectivityTime"]),
    connectivityStatus: item["connectivityStatus"],
    privateLinkState: item["privateLinkState"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    azureHybridBenefit: item["azureHybridBenefit"],
    aadProfile: !item["aadProfile"]
      ? item["aadProfile"]
      : aadProfileDeserializer(item["aadProfile"]),
    arcAgentProfile: !item["arcAgentProfile"]
      ? item["arcAgentProfile"]
      : arcAgentProfileDeserializer(item["arcAgentProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : oidcIssuerProfileDeserializer(item["oidcIssuerProfile"]),
    gateway: !item["gateway"] ? item["gateway"] : gatewayDeserializer(item["gateway"]),
    arcAgentryConfigurations: !item["arcAgentryConfigurations"]
      ? item["arcAgentryConfigurations"]
      : arcAgentryConfigurationsArrayDeserializer(item["arcAgentryConfigurations"]),
    miscellaneousProperties: item["miscellaneousProperties"],
  };
}

/** The current deployment state of connectedClusters. */
export enum KnownProvisioningState {
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Provisioning = "Provisioning",
  Updating = "Updating",
  Deleting = "Deleting",
  Accepted = "Accepted",
}

/**
 * The current deployment state of connectedClusters. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Provisioning** \
 * **Updating** \
 * **Deleting** \
 * **Accepted**
 */
export type ProvisioningState = string;

/** Represents the connectivity status of the connected cluster. */
export enum KnownConnectivityStatus {
  Connecting = "Connecting",
  Connected = "Connected",
  Offline = "Offline",
  Expired = "Expired",
  AgentNotInstalled = "AgentNotInstalled",
}

/**
 * Represents the connectivity status of the connected cluster. \
 * {@link KnownConnectivityStatus} can be used interchangeably with ConnectivityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connecting** \
 * **Connected** \
 * **Offline** \
 * **Expired** \
 * **AgentNotInstalled**
 */
export type ConnectivityStatus = string;

/** Property which describes the state of private link on a connected cluster resource. */
export enum KnownPrivateLinkState {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Property which describes the state of private link on a connected cluster resource. \
 * {@link KnownPrivateLinkState} can be used interchangeably with PrivateLinkState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PrivateLinkState = string;

/** Indicates whether Azure Hybrid Benefit is opted in */
export enum KnownAzureHybridBenefit {
  True = "True",
  False = "False",
  NotApplicable = "NotApplicable",
}

/**
 * Indicates whether Azure Hybrid Benefit is opted in \
 * {@link KnownAzureHybridBenefit} can be used interchangeably with AzureHybridBenefit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False** \
 * **NotApplicable**
 */
export type AzureHybridBenefit = string;

/** AAD Profile specifies attributes for Azure Active Directory integration. */
export interface AadProfile {
  /** Whether to enable Azure RBAC for Kubernetes authorization. */
  enableAzureRbac?: boolean;
  /** The list of AAD group object IDs that will have admin role of the cluster. */
  adminGroupObjectIDs?: string[];
  /** The AAD tenant ID to use for authentication. If not specified, will use the tenant of the deployment subscription. */
  tenantID?: string;
}

export function aadProfileSerializer(item: AadProfile): any {
  return {
    enableAzureRBAC: item["enableAzureRbac"],
    adminGroupObjectIDs: !item["adminGroupObjectIDs"]
      ? item["adminGroupObjectIDs"]
      : item["adminGroupObjectIDs"].map((p: any) => {
          return p;
        }),
    tenantID: item["tenantID"],
  };
}

export function aadProfileDeserializer(item: any): AadProfile {
  return {
    enableAzureRbac: item["enableAzureRBAC"],
    adminGroupObjectIDs: !item["adminGroupObjectIDs"]
      ? item["adminGroupObjectIDs"]
      : item["adminGroupObjectIDs"].map((p: any) => {
          return p;
        }),
    tenantID: item["tenantID"],
  };
}

/** Defines the Arc Agent properties for the clusters. */
export interface ArcAgentProfile {
  /** Version of the Arc agents to be installed on the cluster resource */
  desiredAgentVersion?: string;
  /** Indicates whether the Arc agents on the be upgraded automatically to the latest version. Defaults to Enabled. */
  agentAutoUpgrade?: AutoUpgradeOptions;
  /** List of system extensions that are installed on the cluster resource. */
  systemComponents?: SystemComponent[];
  /** List of arc agentry and system components errors on the cluster resource. */
  agentErrors?: AgentError[];
  /** Represents the current state of the Arc agentry and its dependent components. */
  readonly agentState?: string;
}

export function arcAgentProfileSerializer(item: ArcAgentProfile): any {
  return {
    desiredAgentVersion: item["desiredAgentVersion"],
    agentAutoUpgrade: item["agentAutoUpgrade"],
    systemComponents: !item["systemComponents"]
      ? item["systemComponents"]
      : systemComponentArraySerializer(item["systemComponents"]),
    agentErrors: !item["agentErrors"]
      ? item["agentErrors"]
      : agentErrorArraySerializer(item["agentErrors"]),
  };
}

export function arcAgentProfileDeserializer(item: any): ArcAgentProfile {
  return {
    desiredAgentVersion: item["desiredAgentVersion"],
    agentAutoUpgrade: item["agentAutoUpgrade"],
    systemComponents: !item["systemComponents"]
      ? item["systemComponents"]
      : systemComponentArrayDeserializer(item["systemComponents"]),
    agentErrors: !item["agentErrors"]
      ? item["agentErrors"]
      : agentErrorArrayDeserializer(item["agentErrors"]),
    agentState: item["agentState"],
  };
}

/** Indicates whether the Arc agents on the be upgraded automatically to the latest version. Defaults to Enabled. */
export enum KnownAutoUpgradeOptions {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Indicates whether the Arc agents on the be upgraded automatically to the latest version. Defaults to Enabled. \
 * {@link KnownAutoUpgradeOptions} can be used interchangeably with AutoUpgradeOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type AutoUpgradeOptions = string;

export function systemComponentArraySerializer(result: Array<SystemComponent>): any[] {
  return result.map((item) => {
    return systemComponentSerializer(item);
  });
}

export function systemComponentArrayDeserializer(result: Array<SystemComponent>): any[] {
  return result.map((item) => {
    return systemComponentDeserializer(item);
  });
}

/** System extensions and its current versions installed on the cluster resource. */
export interface SystemComponent {
  /** Type of the system extension */
  type?: string;
  /** Version of the system extension to be installed on the cluster resource. */
  userSpecifiedVersion?: string;
  /** Major Version of the system extension that is currently installed on the cluster resource. */
  majorVersion?: number;
  /** Version of the system extension that is currently installed on the cluster resource. */
  readonly currentVersion?: string;
}

export function systemComponentSerializer(item: SystemComponent): any {
  return {
    type: item["type"],
    userSpecifiedVersion: item["userSpecifiedVersion"],
    majorVersion: item["majorVersion"],
  };
}

export function systemComponentDeserializer(item: any): SystemComponent {
  return {
    type: item["type"],
    userSpecifiedVersion: item["userSpecifiedVersion"],
    majorVersion: item["majorVersion"],
    currentVersion: item["currentVersion"],
  };
}

export function agentErrorArraySerializer(result: Array<AgentError>): any[] {
  return result.map((item) => {
    return agentErrorSerializer(item);
  });
}

export function agentErrorArrayDeserializer(result: Array<AgentError>): any[] {
  return result.map((item) => {
    return agentErrorDeserializer(item);
  });
}

/** Agent Errors if any during agent or system component upgrade. */
export interface AgentError {
  /** Agent error message. */
  readonly message?: string;
  /** Severity of the error message. */
  readonly severity?: string;
  /** Agent component where error message occured. */
  readonly component?: string;
  /** The timestamp of error occured (UTC). */
  readonly time?: Date;
}

export function agentErrorSerializer(item: AgentError): any {
  return item;
}

export function agentErrorDeserializer(item: any): AgentError {
  return {
    message: item["message"],
    severity: item["severity"],
    component: item["component"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** Security Profile specifies attributes for cluster security features. */
export interface SecurityProfile {
  /** The workload identity feature webhook. */
  workloadIdentity?: SecurityProfileWorkloadIdentity;
}

export function securityProfileSerializer(item: SecurityProfile): any {
  return {
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : securityProfileWorkloadIdentitySerializer(item["workloadIdentity"]),
  };
}

export function securityProfileDeserializer(item: any): SecurityProfile {
  return {
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : securityProfileWorkloadIdentityDeserializer(item["workloadIdentity"]),
  };
}

/** The workload identity feature webhook. */
export interface SecurityProfileWorkloadIdentity {
  /** Whether to enable or disable the workload identity Webhook */
  enabled?: boolean;
}

export function securityProfileWorkloadIdentitySerializer(
  item: SecurityProfileWorkloadIdentity,
): any {
  return { enabled: item["enabled"] };
}

export function securityProfileWorkloadIdentityDeserializer(
  item: any,
): SecurityProfileWorkloadIdentity {
  return {
    enabled: item["enabled"],
  };
}

/** OIDC Issuer Profile specifies attributes for workload identity integration. */
export interface OidcIssuerProfile {
  /** Whether to enable oidc issuer for workload identity integration. */
  enabled?: boolean;
  /** The issuer url for hybrid clusters connected to Arc used for the workload identity feature. */
  readonly issuerUrl?: string;
  /** The issuer url for public cloud clusters - AKS, EKS, GKE - used for the workload identity feature. */
  selfHostedIssuerUrl?: string;
}

export function oidcIssuerProfileSerializer(item: OidcIssuerProfile): any {
  return {
    enabled: item["enabled"],
    selfHostedIssuerUrl: item["selfHostedIssuerUrl"],
  };
}

export function oidcIssuerProfileDeserializer(item: any): OidcIssuerProfile {
  return {
    enabled: item["enabled"],
    issuerUrl: item["issuerUrl"],
    selfHostedIssuerUrl: item["selfHostedIssuerUrl"],
  };
}

/** model interface Gateway */
export interface Gateway {
  /** Indicates whether the gateway for arc router connectivity is enabled. */
  enabled?: boolean;
  /** The resource ID of the gateway used for the Arc router feature. */
  resourceId?: string;
}

export function gatewaySerializer(item: Gateway): any {
  return { enabled: item["enabled"], resourceId: item["resourceId"] };
}

export function gatewayDeserializer(item: any): Gateway {
  return {
    enabled: item["enabled"],
    resourceId: item["resourceId"],
  };
}

export function arcAgentryConfigurationsArraySerializer(
  result: Array<ArcAgentryConfigurations>,
): any[] {
  return result.map((item) => {
    return arcAgentryConfigurationsSerializer(item);
  });
}

export function arcAgentryConfigurationsArrayDeserializer(
  result: Array<ArcAgentryConfigurations>,
): any[] {
  return result.map((item) => {
    return arcAgentryConfigurationsDeserializer(item);
  });
}

/** model interface ArcAgentryConfigurations */
export interface ArcAgentryConfigurations {
  /** Specifies the name of the feature for the configuration setting. */
  feature?: string;
  /** The configuration settings for the feature that do not contain any sensitive or secret information. */
  settings?: Record<string, string> | null;
  /** The configuration settings for the feature that contain any sensitive or secret information. */
  protectedSettings?: Record<string, string> | null;
}

export function arcAgentryConfigurationsSerializer(item: ArcAgentryConfigurations): any {
  return {
    feature: item["feature"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

export function arcAgentryConfigurationsDeserializer(item: any): ArcAgentryConfigurations {
  return {
    feature: item["feature"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
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

/** Object containing updates for patch operations. */
export interface ConnectedClusterPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Describes the connected cluster resource properties that can be updated during PATCH operation. */
  properties?: ConnectedClusterPatchProperties;
}

export function connectedClusterPatchSerializer(item: ConnectedClusterPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : connectedClusterPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties which can be patched on the connected cluster resource. */
export interface ConnectedClusterPatchProperties {
  /** Represents the distribution of the connected cluster */
  distribution?: string;
  /** Represents the Kubernetes distribution version on this connected cluster. */
  distributionVersion?: string;
  /** Indicates whether Azure Hybrid Benefit is opted in */
  azureHybridBenefit?: AzureHybridBenefit;
}

export function connectedClusterPatchPropertiesSerializer(
  item: ConnectedClusterPatchProperties,
): any {
  return {
    distribution: item["distribution"],
    distributionVersion: item["distributionVersion"],
    azureHybridBenefit: item["azureHybridBenefit"],
  };
}

/** The paginated list of connected Clusters */
export interface _ConnectedClusterList {
  /** The ConnectedCluster items on this page */
  value: ConnectedCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectedClusterListDeserializer(item: any): _ConnectedClusterList {
  return {
    value: connectedClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectedClusterArraySerializer(result: Array<ConnectedCluster>): any[] {
  return result.map((item) => {
    return connectedClusterSerializer(item);
  });
}

export function connectedClusterArrayDeserializer(result: Array<ConnectedCluster>): any[] {
  return result.map((item) => {
    return connectedClusterDeserializer(item);
  });
}

/** model interface ListClusterUserCredentialProperties */
export interface ListClusterUserCredentialProperties {
  /** The mode of client authentication. */
  authenticationMethod: AuthenticationMethod;
  /** Boolean value to indicate whether the request is for client side proxy or not */
  clientProxy: boolean;
}

export function listClusterUserCredentialPropertiesSerializer(
  item: ListClusterUserCredentialProperties,
): any {
  return {
    authenticationMethod: item["authenticationMethod"],
    clientProxy: item["clientProxy"],
  };
}

/** The mode of client authentication. */
export enum KnownAuthenticationMethod {
  Token = "Token",
  AAD = "AAD",
}

/**
 * The mode of client authentication. \
 * {@link KnownAuthenticationMethod} can be used interchangeably with AuthenticationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Token** \
 * **AAD**
 */
export type AuthenticationMethod = string;

/** The list of credential result response. */
export interface CredentialResults {
  /** Contains the REP (rendezvous endpoint) and “Sender” access token. */
  readonly hybridConnectionConfig?: HybridConnectionConfig;
  /** Base64-encoded Kubernetes configuration file. */
  readonly kubeconfigs?: CredentialResult[];
}

export function credentialResultsDeserializer(item: any): CredentialResults {
  return {
    hybridConnectionConfig: !item["hybridConnectionConfig"]
      ? item["hybridConnectionConfig"]
      : hybridConnectionConfigDeserializer(item["hybridConnectionConfig"]),
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : credentialResultArrayDeserializer(item["kubeconfigs"]),
  };
}

/** Contains the REP (rendezvous endpoint) and “Sender” access token. */
export interface HybridConnectionConfig {
  /** Timestamp when this token will be expired. */
  readonly expirationTime?: number;
  /** Name of the connection */
  readonly hybridConnectionName?: string;
  /** Name of the relay. */
  readonly relay?: string;
  /** Sender access token */
  readonly token?: string;
  /** TenantID of the relay */
  readonly relayTid?: string;
  /** Type of relay */
  readonly relayType?: string;
}

export function hybridConnectionConfigDeserializer(item: any): HybridConnectionConfig {
  return {
    expirationTime: item["expirationTime"],
    hybridConnectionName: item["hybridConnectionName"],
    relay: item["relay"],
    token: item["token"],
    relayTid: item["relayTid"],
    relayType: item["relayType"],
  };
}

export function credentialResultArrayDeserializer(result: Array<CredentialResult>): any[] {
  return result.map((item) => {
    return credentialResultDeserializer(item);
  });
}

/** The credential result response. */
export interface CredentialResult {
  /** The name of the credential. */
  readonly name?: string;
  /** Base64-encoded Kubernetes configuration file. */
  readonly value?: Uint8Array;
}

export function credentialResultDeserializer(item: any): CredentialResult {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-12-01-preview API version. */
  V20241201Preview = "2024-12-01-preview",
}
