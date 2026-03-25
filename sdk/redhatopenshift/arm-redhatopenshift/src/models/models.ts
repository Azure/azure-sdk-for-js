// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** OperationList represents an RP operation list. */
export interface _OperationList {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
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

/** Operation represents an RP operation. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The object that describes the operation. */
  display?: Display;
  /** Sources of requests to this operation.  Comma separated list with valid values user or system, e.g. "user,system". */
  origin?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : displayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** Display represents the display details of an operation. */
export interface Display {
  /** Friendly name of the resource provider. */
  provider?: string;
  /** Resource type on which the operation is performed. */
  resource?: string;
  /** Operation type: read, write, delete, listKeys/action, etc. */
  operation?: string;
  /** Friendly name of the operation. */
  description?: string;
}

export function displayDeserializer(item: any): Display {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** CloudError represents a cloud error. */
export interface CloudError {
  /** An error response from the service. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** CloudErrorBody represents the body of a cloud error. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** OpenShiftVersion represents an OpenShift version that can be installed. */
export interface OpenShiftVersion extends ProxyResource {
  /** Version represents the version to create the cluster at. */
  version?: string;
}

export function openShiftVersionDeserializer(item: any): OpenShiftVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _openShiftVersionPropertiesDeserializer(item["properties"])),
  };
}

/** OpenShiftVersionProperties represents the properties of an OpenShiftVersion. */
export interface OpenShiftVersionProperties {
  /** Version represents the version to create the cluster at. */
  version?: string;
}

export function openShiftVersionPropertiesDeserializer(item: any): OpenShiftVersionProperties {
  return {
    version: item["version"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** OpenShiftVersionList represents a List of available versions. */
export interface _OpenShiftVersionList {
  /** The OpenShiftVersion items on this page */
  value: OpenShiftVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _openShiftVersionListDeserializer(item: any): _OpenShiftVersionList {
  return {
    value: openShiftVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function openShiftVersionArrayDeserializer(result: Array<OpenShiftVersion>): any[] {
  return result.map((item) => {
    return openShiftVersionDeserializer(item);
  });
}

/** PlatformWorkloadIdentityRoleSetList represents a List of role sets. */
export interface _PlatformWorkloadIdentityRoleSetList {
  /** The PlatformWorkloadIdentityRoleSet items on this page */
  value: PlatformWorkloadIdentityRoleSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _platformWorkloadIdentityRoleSetListDeserializer(
  item: any,
): _PlatformWorkloadIdentityRoleSetList {
  return {
    value: platformWorkloadIdentityRoleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function platformWorkloadIdentityRoleSetArrayDeserializer(
  result: Array<PlatformWorkloadIdentityRoleSet>,
): any[] {
  return result.map((item) => {
    return platformWorkloadIdentityRoleSetDeserializer(item);
  });
}

/** PlatformWorkloadIdentityRoleSet represents a mapping from the names of OCP operators to the built-in roles that should be assigned to those operator's corresponding managed identities for a particular OCP version. */
export interface PlatformWorkloadIdentityRoleSet extends ProxyResource {
  /** OpenShiftVersion represents the version associated with this set of roles. */
  openShiftVersion?: string;
  /** PlatformWorkloadIdentityRoles represents the set of roles associated with this version. */
  platformWorkloadIdentityRoles?: PlatformWorkloadIdentityRole[];
}

export function platformWorkloadIdentityRoleSetDeserializer(
  item: any,
): PlatformWorkloadIdentityRoleSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _platformWorkloadIdentityRoleSetPropertiesDeserializer(item["properties"])),
  };
}

/** PlatformWorkloadIdentityRoleSetProperties represents the properties of a PlatformWorkloadIdentityRoleSet resource. */
export interface PlatformWorkloadIdentityRoleSetProperties {
  /** OpenShiftVersion represents the version associated with this set of roles. */
  openShiftVersion?: string;
  /** PlatformWorkloadIdentityRoles represents the set of roles associated with this version. */
  platformWorkloadIdentityRoles?: PlatformWorkloadIdentityRole[];
}

export function platformWorkloadIdentityRoleSetPropertiesDeserializer(
  item: any,
): PlatformWorkloadIdentityRoleSetProperties {
  return {
    openShiftVersion: item["openShiftVersion"],
    platformWorkloadIdentityRoles: !item["platformWorkloadIdentityRoles"]
      ? item["platformWorkloadIdentityRoles"]
      : platformWorkloadIdentityRoleArrayDeserializer(item["platformWorkloadIdentityRoles"]),
  };
}

export function platformWorkloadIdentityRoleArrayDeserializer(
  result: Array<PlatformWorkloadIdentityRole>,
): any[] {
  return result.map((item) => {
    return platformWorkloadIdentityRoleDeserializer(item);
  });
}

/** PlatformWorkloadIdentityRole represents a mapping from a particular OCP operator to the built-in role that should be assigned to that operator's corresponding managed identity. */
export interface PlatformWorkloadIdentityRole {
  /** OperatorName represents the name of the operator that this role is for. */
  operatorName?: string;
  /** RoleDefinitionName represents the name of the role. */
  roleDefinitionName?: string;
  /** RoleDefinitionID represents the resource ID of the role definition. */
  roleDefinitionId?: string;
}

export function platformWorkloadIdentityRoleDeserializer(item: any): PlatformWorkloadIdentityRole {
  return {
    operatorName: item["operatorName"],
    roleDefinitionName: item["roleDefinitionName"],
    roleDefinitionId: item["roleDefinitionId"],
  };
}

/** OpenShiftCluster represents an Azure Red Hat OpenShift cluster. */
export interface OpenShiftCluster extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The cluster provisioning state. */
  provisioningState?: ProvisioningState;
  /** The cluster profile. */
  clusterProfile?: ClusterProfile;
  /** The console profile. */
  consoleProfile?: ConsoleProfile;
  /** The cluster service principal profile. */
  servicePrincipalProfile?: ServicePrincipalProfile;
  /** The workload identity profile. */
  platformWorkloadIdentityProfile?: PlatformWorkloadIdentityProfile;
  /** The cluster network profile. */
  networkProfile?: NetworkProfile;
  /** The cluster master profile. */
  masterProfile?: MasterProfile;
  /** The cluster worker profiles. */
  workerProfiles?: WorkerProfile[];
  /** The cluster worker profiles status. */
  readonly workerProfilesStatus?: WorkerProfile[];
  /** The cluster API server profile. */
  apiserverProfile?: APIServerProfile;
  /** The cluster ingress profiles. */
  ingressProfiles?: IngressProfile[];
}

export function openShiftClusterSerializer(item: OpenShiftCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "provisioningState",
      "clusterProfile",
      "consoleProfile",
      "servicePrincipalProfile",
      "platformWorkloadIdentityProfile",
      "networkProfile",
      "masterProfile",
      "workerProfiles",
      "apiserverProfile",
      "ingressProfiles",
    ])
      ? undefined
      : _openShiftClusterPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function openShiftClusterDeserializer(item: any): OpenShiftCluster {
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
      : _openShiftClusterPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** OpenShiftClusterProperties represents an OpenShift cluster's properties. */
export interface OpenShiftClusterProperties {
  /** The cluster provisioning state. */
  provisioningState?: ProvisioningState;
  /** The cluster profile. */
  clusterProfile?: ClusterProfile;
  /** The console profile. */
  consoleProfile?: ConsoleProfile;
  /** The cluster service principal profile. */
  servicePrincipalProfile?: ServicePrincipalProfile;
  /** The workload identity profile. */
  platformWorkloadIdentityProfile?: PlatformWorkloadIdentityProfile;
  /** The cluster network profile. */
  networkProfile?: NetworkProfile;
  /** The cluster master profile. */
  masterProfile?: MasterProfile;
  /** The cluster worker profiles. */
  workerProfiles?: WorkerProfile[];
  /** The cluster worker profiles status. */
  readonly workerProfilesStatus?: WorkerProfile[];
  /** The cluster API server profile. */
  apiserverProfile?: APIServerProfile;
  /** The cluster ingress profiles. */
  ingressProfiles?: IngressProfile[];
}

export function openShiftClusterPropertiesSerializer(item: OpenShiftClusterProperties): any {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileSerializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileSerializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileSerializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileSerializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileSerializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArraySerializer(item["workerProfiles"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileSerializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArraySerializer(item["ingressProfiles"]),
  };
}

export function openShiftClusterPropertiesDeserializer(item: any): OpenShiftClusterProperties {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileDeserializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileDeserializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileDeserializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileDeserializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileDeserializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArrayDeserializer(item["workerProfiles"]),
    workerProfilesStatus: !item["workerProfilesStatus"]
      ? item["workerProfilesStatus"]
      : workerProfileArrayDeserializer(item["workerProfilesStatus"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileDeserializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArrayDeserializer(item["ingressProfiles"]),
  };
}

/** ProvisioningState represents a provisioning state. */
export enum KnownProvisioningState {
  /** AdminUpdating */
  AdminUpdating = "AdminUpdating",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
}

/**
 * ProvisioningState represents a provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AdminUpdating**: AdminUpdating \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Updating**: Updating
 */
export type ProvisioningState = string;

/** ClusterProfile represents a cluster profile. */
export interface ClusterProfile {
  /** The pull secret for the cluster. */
  pullSecret?: string;
  /** The domain for the cluster. */
  domain?: string;
  /** The version of the cluster. */
  version?: string;
  /** The ID of the cluster resource group. */
  resourceGroupId?: string;
  /** If FIPS validated crypto modules are used */
  fipsValidatedModules?: FipsValidatedModules;
  /** The URL of the managed OIDC issuer in a workload identity cluster. */
  readonly oidcIssuer?: string;
}

export function clusterProfileSerializer(item: ClusterProfile): any {
  return {
    pullSecret: item["pullSecret"],
    domain: item["domain"],
    version: item["version"],
    resourceGroupId: item["resourceGroupId"],
    fipsValidatedModules: item["fipsValidatedModules"],
  };
}

export function clusterProfileDeserializer(item: any): ClusterProfile {
  return {
    pullSecret: item["pullSecret"],
    domain: item["domain"],
    version: item["version"],
    resourceGroupId: item["resourceGroupId"],
    fipsValidatedModules: item["fipsValidatedModules"],
    oidcIssuer: item["oidcIssuer"],
  };
}

/** FipsValidatedModules determines if FIPS is used. */
export enum KnownFipsValidatedModules {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * FipsValidatedModules determines if FIPS is used. \
 * {@link KnownFipsValidatedModules} can be used interchangeably with FipsValidatedModules,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type FipsValidatedModules = string;

/** ConsoleProfile represents a console profile. */
export interface ConsoleProfile {
  /** The URL to access the cluster console. */
  readonly url?: string;
}

export function consoleProfileSerializer(item: ConsoleProfile): any {
  return item;
}

export function consoleProfileDeserializer(item: any): ConsoleProfile {
  return {
    url: item["url"],
  };
}

/** ServicePrincipalProfile represents a service principal profile. */
export interface ServicePrincipalProfile {
  /** The client ID used for the cluster. */
  clientId?: string;
  /** The client secret used for the cluster. */
  clientSecret?: string;
}

export function servicePrincipalProfileSerializer(item: ServicePrincipalProfile): any {
  return { clientId: item["clientId"], clientSecret: item["clientSecret"] };
}

export function servicePrincipalProfileDeserializer(item: any): ServicePrincipalProfile {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

/** PlatformWorkloadIdentityProfile encapsulates all information that is specific to workload identity clusters. */
export interface PlatformWorkloadIdentityProfile {
  /** UpgradeableTo stores a single OpenShift version a workload identity cluster can be upgraded to */
  upgradeableTo?: string;
  /** Dictionary of <PlatformWorkloadIdentity> */
  platformWorkloadIdentities?: Record<string, PlatformWorkloadIdentity>;
}

export function platformWorkloadIdentityProfileSerializer(
  item: PlatformWorkloadIdentityProfile,
): any {
  return {
    upgradeableTo: item["upgradeableTo"],
    platformWorkloadIdentities: !item["platformWorkloadIdentities"]
      ? item["platformWorkloadIdentities"]
      : platformWorkloadIdentityRecordSerializer(item["platformWorkloadIdentities"]),
  };
}

export function platformWorkloadIdentityProfileDeserializer(
  item: any,
): PlatformWorkloadIdentityProfile {
  return {
    upgradeableTo: item["upgradeableTo"],
    platformWorkloadIdentities: !item["platformWorkloadIdentities"]
      ? item["platformWorkloadIdentities"]
      : platformWorkloadIdentityRecordDeserializer(item["platformWorkloadIdentities"]),
  };
}

export function platformWorkloadIdentityRecordSerializer(
  item: Record<string, PlatformWorkloadIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : platformWorkloadIdentitySerializer(item[key]);
  });
  return result;
}

export function platformWorkloadIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, PlatformWorkloadIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : platformWorkloadIdentityDeserializer(item[key]);
  });
  return result;
}

/** PlatformWorkloadIdentity stores information representing a single workload identity. */
export interface PlatformWorkloadIdentity {
  /** The resource ID of the PlatformWorkloadIdentity resource */
  resourceId?: string;
  /** The ClientID of the PlatformWorkloadIdentity resource */
  readonly clientId?: string;
  /** The ObjectID of the PlatformWorkloadIdentity resource */
  readonly objectId?: string;
}

export function platformWorkloadIdentitySerializer(item: PlatformWorkloadIdentity): any {
  return { resourceId: item["resourceId"] };
}

export function platformWorkloadIdentityDeserializer(item: any): PlatformWorkloadIdentity {
  return {
    resourceId: item["resourceId"],
    clientId: item["clientId"],
    objectId: item["objectId"],
  };
}

/** NetworkProfile represents a network profile. */
export interface NetworkProfile {
  /** The CIDR used for OpenShift/Kubernetes Pods. */
  podCidr?: string;
  /** The CIDR used for OpenShift/Kubernetes Services. */
  serviceCidr?: string;
  /** The OutboundType used for egress traffic. */
  outboundType?: OutboundType;
  /** The cluster load balancer profile. */
  loadBalancerProfile?: LoadBalancerProfile;
  /** Specifies whether subnets are pre-attached with an NSG */
  preconfiguredNSG?: PreconfiguredNSG;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    outboundType: item["outboundType"],
    loadBalancerProfile: !item["loadBalancerProfile"]
      ? item["loadBalancerProfile"]
      : loadBalancerProfileSerializer(item["loadBalancerProfile"]),
    preconfiguredNSG: item["preconfiguredNSG"],
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    outboundType: item["outboundType"],
    loadBalancerProfile: !item["loadBalancerProfile"]
      ? item["loadBalancerProfile"]
      : loadBalancerProfileDeserializer(item["loadBalancerProfile"]),
    preconfiguredNSG: item["preconfiguredNSG"],
  };
}

/** The outbound routing strategy used to provide your cluster egress to the internet. */
export enum KnownOutboundType {
  /** Loadbalancer */
  Loadbalancer = "Loadbalancer",
  /** UserDefinedRouting */
  UserDefinedRouting = "UserDefinedRouting",
}

/**
 * The outbound routing strategy used to provide your cluster egress to the internet. \
 * {@link KnownOutboundType} can be used interchangeably with OutboundType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Loadbalancer**: Loadbalancer \
 * **UserDefinedRouting**: UserDefinedRouting
 */
export type OutboundType = string;

/** LoadBalancerProfile represents the profile of the cluster public load balancer. */
export interface LoadBalancerProfile {
  /** The desired managed outbound IPs for the cluster public load balancer. */
  managedOutboundIps?: ManagedOutboundIPs;
  /** The list of effective outbound IP addresses of the public load balancer. */
  readonly effectiveOutboundIps?: EffectiveOutboundIP[];
}

export function loadBalancerProfileSerializer(item: LoadBalancerProfile): any {
  return {
    managedOutboundIps: !item["managedOutboundIps"]
      ? item["managedOutboundIps"]
      : managedOutboundIPsSerializer(item["managedOutboundIps"]),
  };
}

export function loadBalancerProfileDeserializer(item: any): LoadBalancerProfile {
  return {
    managedOutboundIps: !item["managedOutboundIps"]
      ? item["managedOutboundIps"]
      : managedOutboundIPsDeserializer(item["managedOutboundIps"]),
    effectiveOutboundIps: !item["effectiveOutboundIps"]
      ? item["effectiveOutboundIps"]
      : effectiveOutboundIPArrayDeserializer(item["effectiveOutboundIps"]),
  };
}

/** ManagedOutboundIPs represents the desired managed outbound IPs for the cluster public load balancer. */
export interface ManagedOutboundIPs {
  /** Count represents the desired number of IPv4 outbound IPs created and managed by Azure for the cluster public load balancer.  Allowed values are in the range of 1 - 20.  The default value is 1. */
  count?: number;
}

export function managedOutboundIPsSerializer(item: ManagedOutboundIPs): any {
  return { count: item["count"] };
}

export function managedOutboundIPsDeserializer(item: any): ManagedOutboundIPs {
  return {
    count: item["count"],
  };
}

export function effectiveOutboundIPArrayDeserializer(result: Array<EffectiveOutboundIP>): any[] {
  return result.map((item) => {
    return effectiveOutboundIPDeserializer(item);
  });
}

/** EffectiveOutboundIP represents an effective outbound IP resource of the cluster public load balancer. */
export interface EffectiveOutboundIP {
  /** The fully qualified Azure resource id of an IP address resource. */
  id?: string;
}

export function effectiveOutboundIPDeserializer(item: any): EffectiveOutboundIP {
  return {
    id: item["id"],
  };
}

/** PreconfiguredNSG represents whether customers want to use their own NSG attached to the subnets */
export enum KnownPreconfiguredNSG {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * PreconfiguredNSG represents whether customers want to use their own NSG attached to the subnets \
 * {@link KnownPreconfiguredNSG} can be used interchangeably with PreconfiguredNSG,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type PreconfiguredNSG = string;

/** MasterProfile represents a master profile. */
export interface MasterProfile {
  /** The size of the master VMs. */
  vmSize?: string;
  /** The Azure resource ID of the master subnet. */
  subnetId?: string;
  /** Whether master virtual machines are encrypted at host. */
  encryptionAtHost?: EncryptionAtHost;
  /** The resource ID of an associated DiskEncryptionSet, if applicable. */
  diskEncryptionSetId?: string;
}

export function masterProfileSerializer(item: MasterProfile): any {
  return {
    vmSize: item["vmSize"],
    subnetId: item["subnetId"],
    encryptionAtHost: item["encryptionAtHost"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

export function masterProfileDeserializer(item: any): MasterProfile {
  return {
    vmSize: item["vmSize"],
    subnetId: item["subnetId"],
    encryptionAtHost: item["encryptionAtHost"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

/** EncryptionAtHost represents encryption at host state */
export enum KnownEncryptionAtHost {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * EncryptionAtHost represents encryption at host state \
 * {@link KnownEncryptionAtHost} can be used interchangeably with EncryptionAtHost,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type EncryptionAtHost = string;

export function workerProfileArraySerializer(result: Array<WorkerProfile>): any[] {
  return result.map((item) => {
    return workerProfileSerializer(item);
  });
}

export function workerProfileArrayDeserializer(result: Array<WorkerProfile>): any[] {
  return result.map((item) => {
    return workerProfileDeserializer(item);
  });
}

/** WorkerProfile represents a worker profile. */
export interface WorkerProfile {
  /** The worker profile name. */
  name?: string;
  /** The size of the worker VMs. */
  vmSize?: string;
  /** The disk size of the worker VMs. */
  diskSizeGB?: number;
  /** The Azure resource ID of the worker subnet. */
  subnetId?: string;
  /** The number of worker VMs. */
  count?: number;
  /** Whether master virtual machines are encrypted at host. */
  encryptionAtHost?: EncryptionAtHost;
  /** The resource ID of an associated DiskEncryptionSet, if applicable. */
  diskEncryptionSetId?: string;
}

export function workerProfileSerializer(item: WorkerProfile): any {
  return {
    name: item["name"],
    vmSize: item["vmSize"],
    diskSizeGB: item["diskSizeGB"],
    subnetId: item["subnetId"],
    count: item["count"],
    encryptionAtHost: item["encryptionAtHost"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

export function workerProfileDeserializer(item: any): WorkerProfile {
  return {
    name: item["name"],
    vmSize: item["vmSize"],
    diskSizeGB: item["diskSizeGB"],
    subnetId: item["subnetId"],
    count: item["count"],
    encryptionAtHost: item["encryptionAtHost"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

/** APIServerProfile represents an API server profile. */
export interface APIServerProfile {
  /** API server visibility. */
  visibility?: Visibility;
  /** The URL to access the cluster API server. */
  readonly url?: string;
  /** The IP of the cluster API server. */
  readonly ip?: string;
}

export function apiServerProfileSerializer(item: APIServerProfile): any {
  return { visibility: item["visibility"] };
}

export function apiServerProfileDeserializer(item: any): APIServerProfile {
  return {
    visibility: item["visibility"],
    url: item["url"],
    ip: item["ip"],
  };
}

/** Visibility represents visibility. */
export enum KnownVisibility {
  /** Private */
  Private = "Private",
  /** Public */
  Public = "Public",
}

/**
 * Visibility represents visibility. \
 * {@link KnownVisibility} can be used interchangeably with Visibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Private**: Private \
 * **Public**: Public
 */
export type Visibility = string;

export function ingressProfileArraySerializer(result: Array<IngressProfile>): any[] {
  return result.map((item) => {
    return ingressProfileSerializer(item);
  });
}

export function ingressProfileArrayDeserializer(result: Array<IngressProfile>): any[] {
  return result.map((item) => {
    return ingressProfileDeserializer(item);
  });
}

/** IngressProfile represents an ingress profile. */
export interface IngressProfile {
  /** The ingress profile name. */
  name?: string;
  /** Ingress visibility. */
  visibility?: Visibility;
  /** The IP of the ingress. */
  readonly ip?: string;
}

export function ingressProfileSerializer(item: IngressProfile): any {
  return { name: item["name"], visibility: item["visibility"] };
}

export function ingressProfileDeserializer(item: any): IngressProfile {
  return {
    name: item["name"],
    visibility: item["visibility"],
    ip: item["ip"],
  };
}

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

/** OpenShiftCluster represents an Azure Red Hat OpenShift cluster. */
export interface OpenShiftClusterUpdate {
  /** The resource tags. */
  tags?: Record<string, string>;
  /** Identity stores information about the cluster MSI(s) in a workload identity cluster. */
  identity?: ManagedServiceIdentity;
  /** The cluster provisioning state. */
  provisioningState?: ProvisioningState;
  /** The cluster profile. */
  clusterProfile?: ClusterProfile;
  /** The console profile. */
  consoleProfile?: ConsoleProfile;
  /** The cluster service principal profile. */
  servicePrincipalProfile?: ServicePrincipalProfile;
  /** The workload identity profile. */
  platformWorkloadIdentityProfile?: PlatformWorkloadIdentityProfile;
  /** The cluster network profile. */
  networkProfile?: NetworkProfile;
  /** The cluster master profile. */
  masterProfile?: MasterProfile;
  /** The cluster worker profiles. */
  workerProfiles?: WorkerProfile[];
  /** The cluster worker profiles status. */
  readonly workerProfilesStatus?: WorkerProfile[];
  /** The cluster API server profile. */
  apiserverProfile?: APIServerProfile;
  /** The cluster ingress profiles. */
  ingressProfiles?: IngressProfile[];
}

export function openShiftClusterUpdateSerializer(item: OpenShiftClusterUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "provisioningState",
      "clusterProfile",
      "consoleProfile",
      "servicePrincipalProfile",
      "platformWorkloadIdentityProfile",
      "networkProfile",
      "masterProfile",
      "workerProfiles",
      "apiserverProfile",
      "ingressProfiles",
    ])
      ? undefined
      : _openShiftClusterUpdatePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** OpenShiftClusterList represents a list of OpenShift clusters. */
export interface _OpenShiftClusterList {
  /** The OpenShiftCluster items on this page */
  value: OpenShiftCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _openShiftClusterListDeserializer(item: any): _OpenShiftClusterList {
  return {
    value: openShiftClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function openShiftClusterArraySerializer(result: Array<OpenShiftCluster>): any[] {
  return result.map((item) => {
    return openShiftClusterSerializer(item);
  });
}

export function openShiftClusterArrayDeserializer(result: Array<OpenShiftCluster>): any[] {
  return result.map((item) => {
    return openShiftClusterDeserializer(item);
  });
}

/** OpenShiftClusterAdminKubeconfig represents an OpenShift cluster's admin kubeconfig. */
export interface OpenShiftClusterAdminKubeconfig {
  /** The base64-encoded kubeconfig file. */
  kubeconfig?: string;
}

export function openShiftClusterAdminKubeconfigDeserializer(
  item: any,
): OpenShiftClusterAdminKubeconfig {
  return {
    kubeconfig: item["kubeconfig"],
  };
}

/** OpenShiftClusterCredentials represents an OpenShift cluster's credentials. */
export interface OpenShiftClusterCredentials {
  /** The username for the kubeadmin user. */
  kubeadminUsername?: string;
  /** The password for the kubeadmin user. */
  kubeadminPassword?: string;
}

export function openShiftClusterCredentialsDeserializer(item: any): OpenShiftClusterCredentials {
  return {
    kubeadminUsername: item["kubeadminUsername"],
    kubeadminPassword: item["kubeadminPassword"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-25 API version. */
  V20250725 = "2025-07-25",
}

export function _openShiftVersionPropertiesDeserializer(item: any) {
  return {
    version: item["version"],
  };
}

export function _platformWorkloadIdentityRoleSetPropertiesDeserializer(item: any) {
  return {
    openShiftVersion: item["openShiftVersion"],
    platformWorkloadIdentityRoles: !item["platformWorkloadIdentityRoles"]
      ? item["platformWorkloadIdentityRoles"]
      : platformWorkloadIdentityRoleArrayDeserializer(item["platformWorkloadIdentityRoles"]),
  };
}

export function _openShiftClusterPropertiesSerializer(item: OpenShiftCluster): any {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileSerializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileSerializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileSerializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileSerializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileSerializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArraySerializer(item["workerProfiles"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileSerializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArraySerializer(item["ingressProfiles"]),
  };
}

export function _openShiftClusterPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileDeserializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileDeserializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileDeserializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileDeserializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileDeserializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArrayDeserializer(item["workerProfiles"]),
    workerProfilesStatus: !item["workerProfilesStatus"]
      ? item["workerProfilesStatus"]
      : workerProfileArrayDeserializer(item["workerProfilesStatus"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileDeserializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArrayDeserializer(item["ingressProfiles"]),
  };
}

export function _openShiftClusterUpdatePropertiesSerializer(item: OpenShiftClusterUpdate): any {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileSerializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileSerializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileSerializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileSerializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileSerializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArraySerializer(item["workerProfiles"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileSerializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArraySerializer(item["ingressProfiles"]),
  };
}

export function _openShiftClusterUpdatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    clusterProfile: !item["clusterProfile"]
      ? item["clusterProfile"]
      : clusterProfileDeserializer(item["clusterProfile"]),
    consoleProfile: !item["consoleProfile"]
      ? item["consoleProfile"]
      : consoleProfileDeserializer(item["consoleProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : servicePrincipalProfileDeserializer(item["servicePrincipalProfile"]),
    platformWorkloadIdentityProfile: !item["platformWorkloadIdentityProfile"]
      ? item["platformWorkloadIdentityProfile"]
      : platformWorkloadIdentityProfileDeserializer(item["platformWorkloadIdentityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    masterProfile: !item["masterProfile"]
      ? item["masterProfile"]
      : masterProfileDeserializer(item["masterProfile"]),
    workerProfiles: !item["workerProfiles"]
      ? item["workerProfiles"]
      : workerProfileArrayDeserializer(item["workerProfiles"]),
    workerProfilesStatus: !item["workerProfilesStatus"]
      ? item["workerProfilesStatus"]
      : workerProfileArrayDeserializer(item["workerProfilesStatus"]),
    apiserverProfile: !item["apiserverProfile"]
      ? item["apiserverProfile"]
      : apiServerProfileDeserializer(item["apiserverProfile"]),
    ingressProfiles: !item["ingressProfiles"]
      ? item["ingressProfiles"]
      : ingressProfileArrayDeserializer(item["ingressProfiles"]),
  };
}
