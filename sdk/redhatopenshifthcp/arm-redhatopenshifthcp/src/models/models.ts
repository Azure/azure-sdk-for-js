// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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

/** HCP cluster resource */
export interface HcpOpenShiftCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: HcpOpenShiftClusterProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function hcpOpenShiftClusterDeserializer(item: any): HcpOpenShiftCluster {
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
      : hcpOpenShiftClusterPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** HCP cluster properties */
export interface HcpOpenShiftClusterProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Version of the control plane components */
  version: VersionProfile;
  /** Cluster DNS configuration */
  dns?: DnsProfile;
  /** Cluster network configuration */
  network?: NetworkProfile;
  /** Shows the cluster web console information */
  readonly console?: ConsoleProfile;
  /** Shows the cluster API server profile */
  api?: ApiProfile;
  /** The cluster ingress configuration */
  ingress?: IngressProfile;
  /** Azure platform configuration */
  platform: PlatformProfile;
  /** Configure ClusterAutoscaling . */
  autoscaling?: ClusterAutoscalingProfile;
  /** Configure ETCD. */
  etcd?: EtcdProfile;
  /**
   * imageDigestMirrors is a set of rules to allow pulling images from a
   * mirrored registry by using digest specifications.
   *
   * WARNING: Updating this array will redeploy all node pools in the cluster.
   */
  imageDigestMirrors?: ImageDigestMirror[];
  /**
   * nodeDrainTimeoutMinutes is the grace period for how long Pod Disruption Budget-protected workloads will be
   * respected during any node draining operation. After this grace period, any workloads protected by Pod Disruption
   * Budgets that have not been successfully drained from a node will be forcibly evicted. This is
   * especially relevant to cluster upgrades.
   *
   * Valid values are in minutes and from 0 to 10080 minutes (1 week).
   * 0 means that the MachinePool can be drained without any time limitation.
   *
   * This is the value is used a default for all NodePools. It can be overridden
   * by specifying nodeDrainTimeoutMinutes for a given NodePool
   */
  nodeDrainTimeoutMinutes?: number;
  /** OpenShift internal image registry */
  clusterImageRegistry?: ClusterImageRegistryProfile;
  /** Status of the cluster resource */
  readonly status?: ResourceStatus;
  /** Cryptographic restrictions for kernel and userspace libraries */
  cryptoRestrictions?: CryptoRestrictions;
}

export function hcpOpenShiftClusterPropertiesSerializer(item: HcpOpenShiftClusterProperties): any {
  return {
    version: versionProfileSerializer(item["version"]),
    dns: !item["dns"] ? item["dns"] : dnsProfileSerializer(item["dns"]),
    network: !item["network"] ? item["network"] : networkProfileSerializer(item["network"]),
    api: !item["api"] ? item["api"] : apiProfileSerializer(item["api"]),
    ingress: !item["ingress"] ? item["ingress"] : ingressProfileSerializer(item["ingress"]),
    platform: platformProfileSerializer(item["platform"]),
    autoscaling: !item["autoscaling"]
      ? item["autoscaling"]
      : clusterAutoscalingProfileSerializer(item["autoscaling"]),
    etcd: !item["etcd"] ? item["etcd"] : etcdProfileSerializer(item["etcd"]),
    imageDigestMirrors: !item["imageDigestMirrors"]
      ? item["imageDigestMirrors"]
      : imageDigestMirrorArraySerializer(item["imageDigestMirrors"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
    clusterImageRegistry: !item["clusterImageRegistry"]
      ? item["clusterImageRegistry"]
      : clusterImageRegistryProfileSerializer(item["clusterImageRegistry"]),
    cryptoRestrictions: item["cryptoRestrictions"],
  };
}

export function hcpOpenShiftClusterPropertiesDeserializer(
  item: any,
): HcpOpenShiftClusterProperties {
  return {
    provisioningState: item["provisioningState"],
    version: versionProfileDeserializer(item["version"]),
    dns: !item["dns"] ? item["dns"] : dnsProfileDeserializer(item["dns"]),
    network: !item["network"] ? item["network"] : networkProfileDeserializer(item["network"]),
    console: !item["console"] ? item["console"] : consoleProfileDeserializer(item["console"]),
    api: !item["api"] ? item["api"] : apiProfileDeserializer(item["api"]),
    ingress: !item["ingress"] ? item["ingress"] : ingressProfileDeserializer(item["ingress"]),
    platform: platformProfileDeserializer(item["platform"]),
    autoscaling: !item["autoscaling"]
      ? item["autoscaling"]
      : clusterAutoscalingProfileDeserializer(item["autoscaling"]),
    etcd: !item["etcd"] ? item["etcd"] : etcdProfileDeserializer(item["etcd"]),
    imageDigestMirrors: !item["imageDigestMirrors"]
      ? item["imageDigestMirrors"]
      : imageDigestMirrorArrayDeserializer(item["imageDigestMirrors"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
    clusterImageRegistry: !item["clusterImageRegistry"]
      ? item["clusterImageRegistry"]
      : clusterImageRegistryProfileDeserializer(item["clusterImageRegistry"]),
    status: !item["status"] ? item["status"] : resourceStatusDeserializer(item["status"]),
    cryptoRestrictions: item["cryptoRestrictions"],
  };
}

/** The resource provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Non-terminal state indicating the resource has been accepted */
  Accepted = "Accepted",
  /** Non-terminal state indicating the resource is deleting */
  Deleting = "Deleting",
  /** Non-terminal state indicating the resource is provisioning */
  Provisioning = "Provisioning",
  /** Non-terminal state indicating the resource is updating */
  Updating = "Updating",
}

/**
 * The resource provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Non-terminal state indicating the resource has been accepted \
 * **Deleting**: Non-terminal state indicating the resource is deleting \
 * **Provisioning**: Non-terminal state indicating the resource is provisioning \
 * **Updating**: Non-terminal state indicating the resource is updating
 */
export type ProvisioningState = string;

/** Versions represents an OpenShift version. */
export interface VersionProfile {
  /** ID is the desired X.Y version of the cluster control plane. */
  id: string;
  /**
   * ChannelGroup is the name of the set to which this version belongs.
   * Each version belongs to only a single set.
   *
   * If not specified, the default value is 'stable'.
   */
  channelGroup?: string;
}

export function versionProfileSerializer(item: VersionProfile): any {
  return { id: item["id"], channelGroup: item["channelGroup"] };
}

export function versionProfileDeserializer(item: any): VersionProfile {
  return {
    id: item["id"],
    channelGroup: item["channelGroup"],
  };
}

/** DNS contains the DNS settings of the cluster */
export interface DnsProfile {
  /** BaseDomain is the base DNS domain of the cluster. */
  readonly baseDomain?: string;
  /**
   * BaseDomainPrefix is the unique name of the cluster representing the OpenShift's cluster name.
   * BaseDomainPrefix is the name that will appear in the cluster's DNS, provisioned cloud providers resources
   */
  baseDomainPrefix?: string;
}

export function dnsProfileSerializer(item: DnsProfile): any {
  return { baseDomainPrefix: item["baseDomainPrefix"] };
}

export function dnsProfileDeserializer(item: any): DnsProfile {
  return {
    baseDomain: item["baseDomain"],
    baseDomainPrefix: item["baseDomainPrefix"],
  };
}

/** OpenShift networking configuration */
export interface NetworkProfile {
  /** The main controller responsible for rendering the core networking components */
  networkType?: NetworkType;
  /** The CIDR of the pod IP addresses */
  podCidr?: string;
  /** The CIDR block for assigned service IPs */
  serviceCidr?: string;
  /** The CIDR block from which to assign machine IP addresses */
  machineCidr?: string;
  /** Network host prefix */
  hostPrefix?: number;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    networkType: item["networkType"],
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    machineCidr: item["machineCidr"],
    hostPrefix: item["hostPrefix"],
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    networkType: item["networkType"],
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    machineCidr: item["machineCidr"],
    hostPrefix: item["hostPrefix"],
  };
}

/** The cluster network type */
export enum KnownNetworkType {
  /** The OVN network plugin for the OpenShift cluster */
  OVNKubernetes = "OVNKubernetes",
  /** Other network plugins */
  Other = "Other",
}

/**
 * The cluster network type \
 * {@link KnownNetworkType} can be used interchangeably with NetworkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OVNKubernetes**: The OVN network plugin for the OpenShift cluster \
 * **Other**: Other network plugins
 */
export type NetworkType = string;

/** Configuration of the cluster web console */
export interface ConsoleProfile {
  /** The cluster web console URL endpoint */
  readonly url: string;
}

export function consoleProfileDeserializer(item: any): ConsoleProfile {
  return {
    url: item["url"],
  };
}

/** Information about the API of a cluster. */
export interface ApiProfile {
  /** URL endpoint for the API server */
  readonly url: string;
  /** The internet visibility of the OpenShift API server */
  visibility?: Visibility;
  /** The list of authorized IPv4 CIDR blocks allowed to access the API server. Maximum 500 entries. */
  authorizedCIDRs?: string[];
}

export function apiProfileSerializer(item: ApiProfile): any {
  return {
    visibility: item["visibility"],
    authorizedCidrs: !item["authorizedCIDRs"]
      ? item["authorizedCIDRs"]
      : item["authorizedCIDRs"].map((p: any) => {
          return p;
        }),
  };
}

export function apiProfileDeserializer(item: any): ApiProfile {
  return {
    url: item["url"],
    visibility: item["visibility"],
    authorizedCIDRs: !item["authorizedCidrs"]
      ? item["authorizedCidrs"]
      : item["authorizedCidrs"].map((p: any) => {
          return p;
        }),
  };
}

/** The internet visibility of the OpenShift API server */
export enum KnownVisibility {
  /** The API server is visible from the internet. */
  Public = "Public",
  /** The API server is not visible from the internet. */
  Private = "Private",
}

/**
 * The internet visibility of the OpenShift API server \
 * {@link KnownVisibility} can be used interchangeably with Visibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: The API server is visible from the internet. \
 * **Private**: The API server is not visible from the internet.
 */
export type Visibility = string;

/** Information about the Ingress of a cluster. */
export interface IngressProfile {
  /** The type of the default cluster ingress. */
  type?: IngressType;
}

export function ingressProfileSerializer(item: IngressProfile): any {
  return { type: item["type"] };
}

export function ingressProfileDeserializer(item: any): IngressProfile {
  return {
    type: item["type"],
  };
}

/** The type of the default cluster ingress. */
export enum KnownIngressType {
  /** The default ingress is visible from the internet. */
  Public = "Public",
  /** The default ingress is not visible from the internet. */
  Private = "Private",
  /** The default ingress is disabled. */
  Disabled = "Disabled",
}

/**
 * The type of the default cluster ingress. \
 * {@link KnownIngressType} can be used interchangeably with IngressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: The default ingress is visible from the internet. \
 * **Private**: The default ingress is not visible from the internet. \
 * **Disabled**: The default ingress is disabled.
 */
export type IngressType = string;

/** Azure specific configuration */
export interface PlatformProfile {
  /**
   * Resource group name to put cluster resources
   *
   * If not specified then a unique name is generated from the
   * following pattern
   *
   * "aro-hcp-" + clusterName + "-" + UUID
   *
   * where clusterName means the hcpOpenShiftClusters resource name
   * (up to 45 characters) followed by a 16-byte universally unique
   * identifier per RFC 4122.
   */
  managedResourceGroup?: string;
  /**
   * The Azure resource ID of the worker subnet
   * Note that a subnet cannot be reused between ARO-HCP Clusters.
   */
  subnetId: string;
  /**
   * The Azure resource ID of a subnet that enables direct,
   * private network connectivity between the hosted control plane
   * and your cluster's nodes. This subnet must be dedicated to ARO HCP
   * and cannot be shared with the cluster subnet or any node pool subnets.
   */
  vnetIntegrationSubnetId: string;
  /** The core outgoing configuration */
  outboundType?: OutboundType;
  /**
   * ResourceId for the NSG (network security group) attached to the cluster subnet
   *
   * Note that NSGs cannot be reused for other ARO-HCP clusters.
   */
  networkSecurityGroupId: string;
  /** The configuration that the operators of the cluster have to authenticate to Azure */
  operatorsAuthentication: OperatorsAuthenticationProfile;
  /**
   * URL for the OIDC provider to be used for authentication
   * to authenticate against user Azure cloud account
   */
  readonly issuerUrl: string;
}

export function platformProfileSerializer(item: PlatformProfile): any {
  return {
    managedResourceGroup: item["managedResourceGroup"],
    subnetId: item["subnetId"],
    vnetIntegrationSubnetId: item["vnetIntegrationSubnetId"],
    outboundType: item["outboundType"],
    networkSecurityGroupId: item["networkSecurityGroupId"],
    operatorsAuthentication: operatorsAuthenticationProfileSerializer(
      item["operatorsAuthentication"],
    ),
  };
}

export function platformProfileDeserializer(item: any): PlatformProfile {
  return {
    managedResourceGroup: item["managedResourceGroup"],
    subnetId: item["subnetId"],
    vnetIntegrationSubnetId: item["vnetIntegrationSubnetId"],
    outboundType: item["outboundType"],
    networkSecurityGroupId: item["networkSecurityGroupId"],
    operatorsAuthentication: operatorsAuthenticationProfileDeserializer(
      item["operatorsAuthentication"],
    ),
    issuerUrl: item["issuerUrl"],
  };
}

/** The outbound routing strategy used to provide your cluster egress to the internet. */
export enum KnownOutboundType {
  /** The load balancer configuration */
  LoadBalancer = "LoadBalancer",
}

/**
 * The outbound routing strategy used to provide your cluster egress to the internet. \
 * {@link KnownOutboundType} can be used interchangeably with OutboundType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LoadBalancer**: The load balancer configuration
 */
export type OutboundType = string;

/** The configuration that the operators of the cluster have to authenticate to Azure. */
export interface OperatorsAuthenticationProfile {
  /**
   * Represents the information related to Azure User-Assigned managed identities needed
   * to perform Operators authentication based on Azure User-Assigned Managed Identities
   */
  userAssignedIdentities: UserAssignedIdentitiesProfile;
}

export function operatorsAuthenticationProfileSerializer(
  item: OperatorsAuthenticationProfile,
): any {
  return {
    userAssignedIdentities: userAssignedIdentitiesProfileSerializer(item["userAssignedIdentities"]),
  };
}

export function operatorsAuthenticationProfileDeserializer(
  item: any,
): OperatorsAuthenticationProfile {
  return {
    userAssignedIdentities: userAssignedIdentitiesProfileDeserializer(
      item["userAssignedIdentities"],
    ),
  };
}

/**
 * Represents the information related to Azure User-Assigned managed identities needed
 * to perform Operators authentication based on Azure User-Assigned Managed Identities
 */
export interface UserAssignedIdentitiesProfile {
  /**
   * The set of Azure User-Assigned Managed Identities leveraged for the Control Plane
   * operators of the cluster. The set of required managed identities is dependent on the
   * Cluster's OpenShift version.
   */
  controlPlaneOperators: Record<string, string>;
  /**
   * The set of Azure User-Assigned Managed Identities leveraged for the Data Plane
   * operators of the cluster. The set of required managed identities is dependent on the
   * Cluster's OpenShift version.
   */
  dataPlaneOperators: Record<string, string>;
  /**
   * Represents the information associated to an Azure User-Assigned Managed Identity whose
   * purpose is to perform service level actions.
   */
  serviceManagedIdentity: string;
}

export function userAssignedIdentitiesProfileSerializer(item: UserAssignedIdentitiesProfile): any {
  return {
    controlPlaneOperators: item["controlPlaneOperators"],
    dataPlaneOperators: item["dataPlaneOperators"],
    serviceManagedIdentity: item["serviceManagedIdentity"],
  };
}

export function userAssignedIdentitiesProfileDeserializer(
  item: any,
): UserAssignedIdentitiesProfile {
  return {
    controlPlaneOperators: Object.fromEntries(
      Object.entries(item["controlPlaneOperators"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    dataPlaneOperators: Object.fromEntries(
      Object.entries(item["dataPlaneOperators"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    serviceManagedIdentity: item["serviceManagedIdentity"],
  };
}

/**
 * ClusterAutoscaling specifies auto-scaling behavior that
 * applies to all NodePools associated with a control plane.
 */
export interface ClusterAutoscalingProfile {
  /**
   * maxNodesTotal is the maximum allowable number of nodes for the Autoscaler scale out to be operational.
   * The autoscaler will not grow the cluster beyond this number. If omitted, the autoscaler will not have a maximum limit.
   */
  maxNodesTotal?: number;
  /**
   * maxPodGracePeriod is the maximum seconds to wait for graceful pod termination before scaling down a NodePool.
   * The default is 600 seconds.
   */
  maxPodGracePeriodSeconds?: number;
  /**
   * maxNodeProvisionTimeSeconds is the maximum time to wait for node provisioning before considering the
   * provisioning to be unsuccessful. The default is 900 seconds, or 15 minutes.
   */
  maxNodeProvisionTimeSeconds?: number;
  /**
   * podPriorityThreshold enables users to schedule "best-effort" pods, which shouldn't trigger autoscaler actions,
   * but only run when there are spare resources available. The default is -10.
   * See the following for more details:
   * https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-does-cluster-autoscaler-work-with-pod-priority-and-preemption
   */
  podPriorityThreshold?: number;
}

export function clusterAutoscalingProfileSerializer(item: ClusterAutoscalingProfile): any {
  return {
    maxNodesTotal: item["maxNodesTotal"],
    maxPodGracePeriodSeconds: item["maxPodGracePeriodSeconds"],
    maxNodeProvisionTimeSeconds: item["maxNodeProvisionTimeSeconds"],
    podPriorityThreshold: item["podPriorityThreshold"],
  };
}

export function clusterAutoscalingProfileDeserializer(item: any): ClusterAutoscalingProfile {
  return {
    maxNodesTotal: item["maxNodesTotal"],
    maxPodGracePeriodSeconds: item["maxPodGracePeriodSeconds"],
    maxNodeProvisionTimeSeconds: item["maxNodeProvisionTimeSeconds"],
    podPriorityThreshold: item["podPriorityThreshold"],
  };
}

/** The ETCD settings and configuration options. */
export interface EtcdProfile {
  /**
   * ETCD Data Encryption settings.
   * If not specified platform managed keys are used.
   */
  dataEncryption?: EtcdDataEncryptionProfile;
}

export function etcdProfileSerializer(item: EtcdProfile): any {
  return {
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : etcdDataEncryptionProfileSerializer(item["dataEncryption"]),
  };
}

export function etcdProfileDeserializer(item: any): EtcdProfile {
  return {
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : etcdDataEncryptionProfileDeserializer(item["dataEncryption"]),
  };
}

/** The ETCD data encryption settings. */
export interface EtcdDataEncryptionProfile {
  /** Specify the key management strategy used for the encryption key that encrypts the ETCD data. */
  keyManagementMode: EtcdDataEncryptionKeyManagementModeType;
  /**
   * Specify customer managed encryption key details.
   * Required when keyManagementMode is "CustomerManaged".
   */
  customerManaged?: CustomerManagedEncryptionProfile;
}

export function etcdDataEncryptionProfileSerializer(item: EtcdDataEncryptionProfile): any {
  return {
    keyManagementMode: item["keyManagementMode"],
    customerManaged: !item["customerManaged"]
      ? item["customerManaged"]
      : customerManagedEncryptionProfileSerializer(item["customerManaged"]),
  };
}

export function etcdDataEncryptionProfileDeserializer(item: any): EtcdDataEncryptionProfile {
  return {
    keyManagementMode: item["keyManagementMode"],
    customerManaged: !item["customerManaged"]
      ? item["customerManaged"]
      : customerManagedEncryptionProfileDeserializer(item["customerManaged"]),
  };
}

/** The encryption key management mode types supported for ETCD data encryption. */
export enum KnownEtcdDataEncryptionKeyManagementModeType {
  /** Customer managed encryption key management mode type. */
  CustomerManaged = "CustomerManaged",
}

/**
 * The encryption key management mode types supported for ETCD data encryption. \
 * {@link KnownEtcdDataEncryptionKeyManagementModeType} can be used interchangeably with EtcdDataEncryptionKeyManagementModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomerManaged**: Customer managed encryption key management mode type.
 */
export type EtcdDataEncryptionKeyManagementModeType = string;

/** Customer managed encryption key profile. */
export interface CustomerManagedEncryptionProfile {
  /**
   * The encryption type used.
   * By default, "KMS" is used.
   */
  encryptionType?: CustomerManagedEncryptionType;
  /**
   * The Key Management Service (KMS) encryption key details.
   *
   * Required when encryptionType is "KMS".
   */
  kms?: KmsEncryptionProfile;
}

export function customerManagedEncryptionProfileSerializer(
  item: CustomerManagedEncryptionProfile,
): any {
  return {
    encryptionType: item["encryptionType"],
    kms: !item["kms"] ? item["kms"] : kmsEncryptionProfileSerializer(item["kms"]),
  };
}

export function customerManagedEncryptionProfileDeserializer(
  item: any,
): CustomerManagedEncryptionProfile {
  return {
    encryptionType: item["encryptionType"],
    kms: !item["kms"] ? item["kms"] : kmsEncryptionProfileDeserializer(item["kms"]),
  };
}

/** The encryption types supported for a customer managed key. */
export enum KnownCustomerManagedEncryptionType {
  /** KMS encryption type. */
  Kms = "KMS",
}

/**
 * The encryption types supported for a customer managed key. \
 * {@link KnownCustomerManagedEncryptionType} can be used interchangeably with CustomerManagedEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KMS**: KMS encryption type.
 */
export type CustomerManagedEncryptionType = string;

/**
 * Configure etcd encryption Key Management Service (KMS) key.
 * Your Microsoft Entra application used to create the cluster must be authorized to access this keyvault,
 * e.g using the AzureCLI: `az keyvault set-policy -n $KEYVAULT_NAME --key-permissions decrypt encrypt --spn (YOUR APPLICATION CLIENT ID)`
 */
export interface KmsEncryptionProfile {
  /** vaultName is the name of the keyvault that contains the secret. */
  vaultName: string;
  /** visibility of the keyvault that contains the secret. */
  visibility: KeyVaultVisibility;
  /** The details of the active key. */
  activeKey: KmsKey;
}

export function kmsEncryptionProfileSerializer(item: KmsEncryptionProfile): any {
  return {
    vaultName: item["vaultName"],
    visibility: item["visibility"],
    activeKey: kmsKeySerializer(item["activeKey"]),
  };
}

export function kmsEncryptionProfileDeserializer(item: any): KmsEncryptionProfile {
  return {
    vaultName: item["vaultName"],
    visibility: item["visibility"],
    activeKey: kmsKeyDeserializer(item["activeKey"]),
  };
}

/** The internet visibility of a keyvault resource */
export enum KnownKeyVaultVisibility {
  /** The keyvault is visible from the internet. */
  Public = "Public",
  /** The keyvault is not visible from the internet. */
  Private = "Private",
}

/**
 * The internet visibility of a keyvault resource \
 * {@link KnownKeyVaultVisibility} can be used interchangeably with KeyVaultVisibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: The keyvault is visible from the internet. \
 * **Private**: The keyvault is not visible from the internet.
 */
export type KeyVaultVisibility = string;

/** A representation of a KeyVault Secret. */
export interface KmsKey {
  /** name is the name of the keyvault key used for encryption/decryption. */
  name: string;
  /** version contains the version of the key to use. */
  version: string;
}

export function kmsKeySerializer(item: KmsKey): any {
  return { name: item["name"], version: item["version"] };
}

export function kmsKeyDeserializer(item: any): KmsKey {
  return {
    name: item["name"],
    version: item["version"],
  };
}

export function imageDigestMirrorArraySerializer(result: Array<ImageDigestMirror>): any[] {
  return result.map((item) => {
    return imageDigestMirrorSerializer(item);
  });
}

export function imageDigestMirrorArrayDeserializer(result: Array<ImageDigestMirror>): any[] {
  return result.map((item) => {
    return imageDigestMirrorDeserializer(item);
  });
}

/**
 * ImageDigestMirror specifies a set of mirror registries to redirect image
 * pulls targeting the specified source registries.
 */
export interface ImageDigestMirror {
  /**
   * source matches the repository that users refer to, e.g. in image pull specifications.
   * Setting source to a registry hostname, e.g. docker.io, quay.io, or registry.redhat.io,
   * will match the image pull specification of the corresponding registry.
   *
   * source uses one of the following formats:
   * * host[:port]
   * * host[:port]/namespace[/namespace...]
   * * host[:port]/namespace[/namespace...]/repo
   * * [*.]host
   *
   * for more information about the format, see:
   * https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md#choosing-a-registry-toml-table
   */
  source: string;
  /**
   * mirrors is zero or more locations that may also contain the same images. No mirror will
   * be configured if not specified. Images can be pulled from these mirrors only if they are
   * referenced by their digests. The mirrored location is obtained by replacing the part of
   * the input reference that matches source by the mirrors entry, e.g. for
   * registry.redhat.io/product/repo reference, a (source, mirror) pair *.redhat.io,
   * mirror.local/redhat causes a mirror.local/redhat/product/repo repository to be used.
   *
   * The order of mirrors in this list is treated as the user's desired priority, while source
   * is by default considered lower priority than all mirrors.
   *
   * If no mirror is specified or all image pulls from the mirror list fail, the image will
   * continue to be pulled from the repository in the pull spec.
   *
   * Other cluster configuration, including (but not limited to) other imageDigestMirrors
   * objects, may impact the exact order mirrors are contacted in, or some mirrors may be
   * contacted in parallel, so this should be considered a preference rather than a guarantee
   * of ordering.
   *
   * mirrors uses one of the following formats:
   * * host[:port]
   * * host[:port]/namespace[/namespace...]
   * * host[:port]/namespace[/namespace...]/repo
   *
   * for more information about the format, see:
   * https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md#choosing-a-registry-toml-table
   */
  mirrors: string[];
}

export function imageDigestMirrorSerializer(item: ImageDigestMirror): any {
  return {
    source: item["source"],
    mirrors: item["mirrors"].map((p: any) => {
      return p;
    }),
  };
}

export function imageDigestMirrorDeserializer(item: any): ImageDigestMirror {
  return {
    source: item["source"],
    mirrors: item["mirrors"].map((p: any) => {
      return p;
    }),
  };
}

/** OpenShift cluster image registry */
export interface ClusterImageRegistryProfile {
  /**
   * state indicates the desired ImageStream-backed cluster image registry installation mode.
   * This can only be set during cluster creation and cannot be changed after cluster creation.
   * Enabled means the ImageStream-backed image registry will be run as pods on worker nodes in
   * the cluster. Disabled means the ImageStream-backed image registry will not be present in
   * the cluster. The default is Enabled.
   */
  state?: ClusterImageRegistryState;
}

export function clusterImageRegistryProfileSerializer(item: ClusterImageRegistryProfile): any {
  return { state: item["state"] };
}

export function clusterImageRegistryProfileDeserializer(item: any): ClusterImageRegistryProfile {
  return {
    state: item["state"],
  };
}

/** The desired state of the ImageStream-backed cluster image registry */
export enum KnownClusterImageRegistryState {
  /** The ImageStream-backed image registry will be run as pods on worker nodes */
  Enabled = "Enabled",
  /** The ImageStream-backed image registry will not be present in the cluster */
  Disabled = "Disabled",
}

/**
 * The desired state of the ImageStream-backed cluster image registry \
 * {@link KnownClusterImageRegistryState} can be used interchangeably with ClusterImageRegistryState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The ImageStream-backed image registry will be run as pods on worker nodes \
 * **Disabled**: The ImageStream-backed image registry will not be present in the cluster
 */
export type ClusterImageRegistryState = string;

/** ResourceStatus represents the observed status of the resource. */
export interface ResourceStatus {
  /** The conditions on the resource */
  readonly conditions?: Condition[];
}

export function resourceStatusDeserializer(item: any): ResourceStatus {
  return {
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionArrayDeserializer(item["conditions"]),
  };
}

export function conditionArrayDeserializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionDeserializer(item);
  });
}

/** Condition represents an observation of a resource's state. */
export interface Condition {
  /**
   * Type of the condition.
   * This is a PascalCase identifier representing the type of the condition.
   */
  readonly type: ConditionType;
  /** The status of the condition. */
  readonly status: StatusType;
  /** The last time the condition transitioned from one status to another. */
  readonly lastTransitionTime: Date;
  /**
   * A programmatic identifier indicating the reason for the condition's last transition.
   * This value should be a CamelCase string.
   */
  readonly reason: string;
  /**
   * A human readable message indicating details about the transition.
   * This may be an empty string.
   */
  readonly message: string;
}

export function conditionDeserializer(item: any): Condition {
  return {
    type: item["type"],
    status: item["status"],
    lastTransitionTime: new Date(item["lastTransitionTime"]),
    reason: item["reason"],
    message: item["message"],
  };
}

/** Representation of the possible condition types. */
export enum KnownConditionType {
  /** Indicates that the resource is available. */
  Available = "Available",
  /** Indicates that the resource is in a degraded state. */
  Degraded = "Degraded",
  /** Indicates that the resource is in a progressing state. */
  Progressing = "Progressing",
}

/**
 * Representation of the possible condition types. \
 * {@link KnownConditionType} can be used interchangeably with ConditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: Indicates that the resource is available. \
 * **Degraded**: Indicates that the resource is in a degraded state. \
 * **Progressing**: Indicates that the resource is in a progressing state.
 */
export type ConditionType = string;

/** Representation of the possible values of a condition status. */
export enum KnownStatusType {
  /** Indicates that the condition status is True. */
  True = "True",
  /** Indicates that the condition status is False. */
  False = "False",
  /** Indicates that the condition status is unknown. */
  Unknown = "Unknown",
}

/**
 * Representation of the possible values of a condition status. \
 * {@link KnownStatusType} can be used interchangeably with StatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: Indicates that the condition status is True. \
 * **False**: Indicates that the condition status is False. \
 * **Unknown**: Indicates that the condition status is unknown.
 */
export type StatusType = string;

/** Cryptographic restrictions for kernel and userspace libraries */
export enum KnownCryptoRestrictions {
  /** No restrictions */
  None = "None",
  /** Use only FIPS-validated algorithms and implementations */
  Fips = "FIPS",
}

/**
 * Cryptographic restrictions for kernel and userspace libraries \
 * {@link KnownCryptoRestrictions} can be used interchangeably with CryptoRestrictions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No restrictions \
 * **FIPS**: Use only FIPS-validated algorithms and implementations
 */
export type CryptoRestrictions = string;

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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
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

/** HCP cluster resource for create/update operations. */
export interface HcpOpenShiftClusterResourceCreate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: HcpOpenShiftClusterPropertiesCreate;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function hcpOpenShiftClusterResourceCreateSerializer(
  item: HcpOpenShiftClusterResourceCreate,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : hcpOpenShiftClusterPropertiesCreateSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** HCP cluster properties for create/update operations, omitting server-side read-only fields (console and status on the root model; api.url and platform.issuerUrl in nested models). */
export interface HcpOpenShiftClusterPropertiesCreate {
  /** Version of the control plane components. */
  version: VersionProfile;
  /** Cluster DNS configuration. */
  dns?: DnsProfile;
  /** Cluster network configuration. */
  network?: NetworkProfile;
  /** Shows the cluster API server profile. */
  api?: ApiProfileCreate;
  /** The cluster ingress configuration. */
  ingress?: IngressProfile;
  /** Azure platform configuration. */
  platform: PlatformProfileCreate;
  /** Configure ClusterAutoscaling. */
  autoscaling?: ClusterAutoscalingProfile;
  /** Configure ETCD. */
  etcd?: EtcdProfile;
  /** Rules to allow pulling images from mirrored registries by digest. */
  imageDigestMirrors?: ImageDigestMirror[];
  /** Grace period in minutes for node draining during upgrades and scale operations. */
  nodeDrainTimeoutMinutes?: number;
  /** OpenShift internal image registry. */
  clusterImageRegistry?: ClusterImageRegistryProfile;
  /** Cryptographic restrictions for kernel and userspace libraries. */
  cryptoRestrictions?: CryptoRestrictions;
}

export function hcpOpenShiftClusterPropertiesCreateSerializer(
  item: HcpOpenShiftClusterPropertiesCreate,
): any {
  return {
    version: versionProfileSerializer(item["version"]),
    dns: !item["dns"] ? item["dns"] : dnsProfileSerializer(item["dns"]),
    network: !item["network"] ? item["network"] : networkProfileSerializer(item["network"]),
    api: !item["api"] ? item["api"] : apiProfileCreateSerializer(item["api"]),
    ingress: !item["ingress"] ? item["ingress"] : ingressProfileSerializer(item["ingress"]),
    platform: platformProfileCreateSerializer(item["platform"]),
    autoscaling: !item["autoscaling"]
      ? item["autoscaling"]
      : clusterAutoscalingProfileSerializer(item["autoscaling"]),
    etcd: !item["etcd"] ? item["etcd"] : etcdProfileSerializer(item["etcd"]),
    imageDigestMirrors: !item["imageDigestMirrors"]
      ? item["imageDigestMirrors"]
      : imageDigestMirrorArraySerializer(item["imageDigestMirrors"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
    clusterImageRegistry: !item["clusterImageRegistry"]
      ? item["clusterImageRegistry"]
      : clusterImageRegistryProfileSerializer(item["clusterImageRegistry"]),
    cryptoRestrictions: item["cryptoRestrictions"],
  };
}

/** API profile for create/update operations, omitting server-side read-only field url. */
export interface ApiProfileCreate {
  /** The internet visibility of the OpenShift API server. */
  visibility?: Visibility;
  /** The list of authorized IPv4 CIDR blocks allowed to access the API server. Maximum 500 entries. */
  authorizedCIDRs?: string[];
}

export function apiProfileCreateSerializer(item: ApiProfileCreate): any {
  return {
    visibility: item["visibility"],
    authorizedCidrs: !item["authorizedCIDRs"]
      ? item["authorizedCIDRs"]
      : item["authorizedCIDRs"].map((p: any) => {
          return p;
        }),
  };
}

/** Azure platform configuration for create/update operations, omitting server-side read-only field issuerUrl. */
export interface PlatformProfileCreate {
  /** Resource group name to put cluster resources. */
  managedResourceGroup?: string;
  /** The Azure resource ID of the worker subnet. */
  subnetId: string;
  /** The Azure resource ID of the VNet integration subnet. */
  vnetIntegrationSubnetId: string;
  /** The core outgoing configuration. */
  outboundType?: OutboundType;
  /** Resource ID for the NSG attached to the cluster subnet. */
  networkSecurityGroupId: string;
  /** The configuration for operator authentication to Azure. */
  operatorsAuthentication: OperatorsAuthenticationProfile;
}

export function platformProfileCreateSerializer(item: PlatformProfileCreate): any {
  return {
    managedResourceGroup: item["managedResourceGroup"],
    subnetId: item["subnetId"],
    vnetIntegrationSubnetId: item["vnetIntegrationSubnetId"],
    outboundType: item["outboundType"],
    networkSecurityGroupId: item["networkSecurityGroupId"],
    operatorsAuthentication: operatorsAuthenticationProfileSerializer(
      item["operatorsAuthentication"],
    ),
  };
}

/** The template for adding updateable properties. */
export interface HcpOpenShiftClusterUpdate {
  /** The resource-specific properties for this resource. */
  properties?: HcpOpenShiftClusterProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function hcpOpenShiftClusterUpdateSerializer(item: HcpOpenShiftClusterUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : hcpOpenShiftClusterPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The response of a HcpOpenShiftCluster list operation. */
export interface _HcpOpenShiftClusterListResult {
  /** The HcpOpenShiftCluster items on this page */
  value: HcpOpenShiftCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hcpOpenShiftClusterListResultDeserializer(
  item: any,
): _HcpOpenShiftClusterListResult {
  return {
    value: hcpOpenShiftClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hcpOpenShiftClusterArrayDeserializer(result: Array<HcpOpenShiftCluster>): any[] {
  return result.map((item) => {
    return hcpOpenShiftClusterDeserializer(item);
  });
}

/** HCP cluster admin credential */
export interface HcpOpenShiftClusterAdminCredential {
  /** Admin kubeconfig with a temporary client certificate */
  readonly kubeconfig: string;
  /** Expiration timestamp for the kubeconfig's client certificate */
  readonly expirationTimestamp: Date;
}

export function hcpOpenShiftClusterAdminCredentialDeserializer(
  item: any,
): HcpOpenShiftClusterAdminCredential {
  return {
    kubeconfig: item["kubeconfig"],
    expirationTimestamp: new Date(item["expirationTimestamp"]),
  };
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface NodePool extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NodePoolProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function nodePoolSerializer(item: NodePool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nodePoolPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function nodePoolDeserializer(item: any): NodePool {
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
      : nodePoolPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Represents the node pool properties */
export interface NodePoolProperties {
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** OpenShift version for the nodepool */
  version?: NodePoolVersionProfile;
  /** Azure node pool platform configuration */
  platform: NodePoolPlatformProfile;
  /**
   * The number of worker nodes, it cannot be used together with autoscaling.
   * Validation:
   * - Minimum: 0
   * - Maximum: 200 (only when availabilityZone is not specified)
   * - No maximum when availabilityZone is specified
   */
  replicas?: number;
  /** Auto-repair */
  autoRepair?: boolean;
  /** Representation of a autoscaling in a node pool. */
  autoScaling?: NodePoolAutoScaling;
  /**
   * Kubernetes labels to propagate to the NodePool Nodes
   * Note that when the labels are updated this is only applied to newly
   * create nodes in the Nodepool, existing node labels remain unchanged.
   */
  labels?: Label[];
  /** Taints for the nodes */
  taints?: Taint[];
  /**
   * nodeDrainTimeoutMinutes is the grace period for how long Pod Disruption Budget-protected workloads will be
   * respected during any node draining operation. After this grace period, any workloads protected by Pod Disruption
   * Budgets that have not been successfully drained from a node will be forcibly evicted. This is
   * especially relevant to cluster upgrades.
   *
   * Valid values are from 0 to 10080 minutes (1 week) .
   * 0 means that the NodePool can be drained without any time limitation.
   *
   * If unset the cluster nodeDrainTimeoutMinutes value is used as a default.
   */
  nodeDrainTimeoutMinutes?: number;
  /** Status of the node pool resource */
  readonly status?: ResourceStatus;
}

export function nodePoolPropertiesSerializer(item: NodePoolProperties): any {
  return {
    version: !item["version"] ? item["version"] : nodePoolVersionProfileSerializer(item["version"]),
    platform: nodePoolPlatformProfileSerializer(item["platform"]),
    replicas: item["replicas"],
    autoRepair: item["autoRepair"],
    autoScaling: !item["autoScaling"]
      ? item["autoScaling"]
      : nodePoolAutoScalingSerializer(item["autoScaling"]),
    labels: !item["labels"] ? item["labels"] : labelArraySerializer(item["labels"]),
    taints: !item["taints"] ? item["taints"] : taintArraySerializer(item["taints"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
  };
}

export function nodePoolPropertiesDeserializer(item: any): NodePoolProperties {
  return {
    provisioningState: item["provisioningState"],
    version: !item["version"]
      ? item["version"]
      : nodePoolVersionProfileDeserializer(item["version"]),
    platform: nodePoolPlatformProfileDeserializer(item["platform"]),
    replicas: item["replicas"],
    autoRepair: item["autoRepair"],
    autoScaling: !item["autoScaling"]
      ? item["autoScaling"]
      : nodePoolAutoScalingDeserializer(item["autoScaling"]),
    labels: !item["labels"] ? item["labels"] : labelArrayDeserializer(item["labels"]),
    taints: !item["taints"] ? item["taints"] : taintArrayDeserializer(item["taints"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
    status: !item["status"] ? item["status"] : resourceStatusDeserializer(item["status"]),
  };
}

/** Versions represents an OpenShift version. */
export interface NodePoolVersionProfile {
  /** ID is the unique identifier of the version. */
  id: string;
  /**
   * ChannelGroup is the name of the set to which this version belongs.
   * Each version belongs to only a single set.
   *
   * If not specified, the default value is 'stable'.
   */
  channelGroup?: string;
}

export function nodePoolVersionProfileSerializer(item: NodePoolVersionProfile): any {
  return { id: item["id"], channelGroup: item["channelGroup"] };
}

export function nodePoolVersionProfileDeserializer(item: any): NodePoolVersionProfile {
  return {
    id: item["id"],
    channelGroup: item["channelGroup"],
  };
}

/** Azure node pool platform configuration */
export interface NodePoolPlatformProfile {
  /**
   * The Azure resource ID of the worker subnet
   * Note that a subnet cannot be reused between ARO-HCP Clusters, however the
   * same subnet can be used for NodePools of the same cluster.
   */
  subnetId?: string;
  /**
   * The VM size according to the documentation:
   * - https://learn.microsoft.com/en-us/azure/virtual-machines/sizes
   */
  vmSize: string;
  /**
   * Whether to enable host based OS and data drive encryption.
   * - https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption#encryption-at-host---end-to-end-encryption-for-your-vm-data
   */
  enableEncryptionAtHost?: boolean;
  /** The settings and configuration options for OSDisk */
  osDisk?: OsDiskProfile;
  /**
   * The availability zone for the node pool.
   * Please read the documentation to see which regions support availability zones
   * - https://learn.microsoft.com/en-us/azure/availability-zones/az-overview
   */
  availabilityZone?: string;
}

export function nodePoolPlatformProfileSerializer(item: NodePoolPlatformProfile): any {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskProfileSerializer(item["osDisk"]),
    availabilityZone: item["availabilityZone"],
  };
}

export function nodePoolPlatformProfileDeserializer(item: any): NodePoolPlatformProfile {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskProfileDeserializer(item["osDisk"]),
    availabilityZone: item["availabilityZone"],
  };
}

/** The settings and configuration options for OSDisk */
export interface OsDiskProfile {
  /**
   * The OS disk size in GiB. Maximum is 4095 GiB for Managed disks. For Ephemeral disks,
   * the maximum is 2040 GiB; Azure may enforce a lower effective limit based on the
   * selected VM size's local cache, temp, or NVMe capacity.
   */
  sizeGiB?: number;
  /**
   * The type of the disk storage account
   * - https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types
   */
  diskStorageAccountType?: DiskStorageAccountType;
  /**
   * The ID of the DiskEncryptionSet resource to use to encrypt the OS disks for the VMs.
   * This needs to exist in the same subscription id listed in the Hosted Cluster, HostedCluster.Spec.Platform.Azure.SubscriptionID.
   * DiskEncryptionSetID should also exist in a resource group under the same subscription id and the same location
   * listed in the Hosted Cluster, HostedCluster.Spec.Platform.Azure.Location.
   *
   * Details on how to create a Disk Encryption Set can be found here:
   * https://learn.microsoft.com/en-us/azure/virtual-machines/disks-enable-customer-managed-keys-portal#set-up-your-disk-encryption-set
   */
  encryptionSetId?: string;
  /**
   * The type of the OS disk.
   * - https://learn.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks
   */
  diskType?: OsDiskType;
}

export function osDiskProfileSerializer(item: OsDiskProfile): any {
  return {
    sizeGiB: item["sizeGiB"],
    diskStorageAccountType: item["diskStorageAccountType"],
    encryptionSetId: item["encryptionSetId"],
    diskType: item["diskType"],
  };
}

export function osDiskProfileDeserializer(item: any): OsDiskProfile {
  return {
    sizeGiB: item["sizeGiB"],
    diskStorageAccountType: item["diskStorageAccountType"],
    encryptionSetId: item["encryptionSetId"],
    diskType: item["diskType"],
  };
}

/**
 * Supported Azure storage account types
 * - https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types
 */
export enum KnownDiskStorageAccountType {
  /** Premium SSD with Locally Redundant Storage (LRS) */
  PremiumLRS = "Premium_LRS",
  /** Standard SSD with Locally Redundant Storage (LRS) */
  StandardSSDLRS = "StandardSSD_LRS",
  /** Standard HDD with Locally Redundant Storage (LRS) */
  StandardLRS = "Standard_LRS",
}

/**
 * Supported Azure storage account types
 * - https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types \
 * {@link KnownDiskStorageAccountType} can be used interchangeably with DiskStorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Premium_LRS**: Premium SSD with Locally Redundant Storage (LRS) \
 * **StandardSSD_LRS**: Standard SSD with Locally Redundant Storage (LRS) \
 * **Standard_LRS**: Standard HDD with Locally Redundant Storage (LRS)
 */
export type DiskStorageAccountType = string;

/**
 * The type of the OS disk
 * - https://learn.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks
 */
export enum KnownOsDiskType {
  /**
   * Managed OS disk - stored as an Azure managed disk (network-attached).
   * Default behavior for VMs without sufficient cache.
   */
  Managed = "Managed",
  /**
   * Ephemeral OS disk - stored on local VM cache/temporary storage.
   * Provides lower latency and faster node operations.
   * Requires VM with sufficient cache size.
   */
  Ephemeral = "Ephemeral",
}

/**
 * The type of the OS disk
 * - https://learn.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks \
 * {@link KnownOsDiskType} can be used interchangeably with OsDiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Managed OS disk - stored as an Azure managed disk (network-attached).
 * Default behavior for VMs without sufficient cache. \
 * **Ephemeral**: Ephemeral OS disk - stored on local VM cache\/temporary storage.
 * Provides lower latency and faster node operations.
 * Requires VM with sufficient cache size.
 */
export type OsDiskType = string;

/** Node pool autoscaling */
export interface NodePoolAutoScaling {
  /**
   * The minimum number of nodes in the node pool.
   * Validation:
   * - Minimum: 0
   * - Maximum: 200 (only when availabilityZone is not specified)
   * - No maximum when availabilityZone is specified
   */
  min?: number;
  /**
   * The maximum number of nodes in the node pool.
   * Validation:
   * - Minimum: 0 (must be >= min)
   * - Maximum: 200 (only when availabilityZone is not specified)
   * - No maximum when availabilityZone is specified
   */
  max?: number;
}

export function nodePoolAutoScalingSerializer(item: NodePoolAutoScaling): any {
  return { min: item["min"], max: item["max"] };
}

export function nodePoolAutoScalingDeserializer(item: any): NodePoolAutoScaling {
  return {
    min: item["min"],
    max: item["max"],
  };
}

export function labelArraySerializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelSerializer(item);
  });
}

export function labelArrayDeserializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelDeserializer(item);
  });
}

/** Label represents the Kubernetes label */
export interface Label {
  /** The key of the label */
  key: string;
  /** The value of the label */
  value?: string;
}

export function labelSerializer(item: Label): any {
  return { key: item["key"], value: item["value"] };
}

export function labelDeserializer(item: any): Label {
  return {
    key: item["key"],
    value: item["value"],
  };
}

export function taintArraySerializer(result: Array<Taint>): any[] {
  return result.map((item) => {
    return taintSerializer(item);
  });
}

export function taintArrayDeserializer(result: Array<Taint>): any[] {
  return result.map((item) => {
    return taintDeserializer(item);
  });
}

/** Taint is controlling the node taint and its effects */
export interface Taint {
  /** The key of the taint */
  key: string;
  /** The value of the taint */
  value?: string;
  /** The effect of the taint */
  effect: Effect;
}

export function taintSerializer(item: Taint): any {
  return { key: item["key"], value: item["value"], effect: item["effect"] };
}

export function taintDeserializer(item: any): Taint {
  return {
    key: item["key"],
    value: item["value"],
    effect: item["effect"],
  };
}

/** The taint effect the same as in Kubernetes */
export enum KnownEffect {
  /** NoSchedule taint effect */
  NoSchedule = "NoSchedule",
  /** PreferNoSchedule taint effect */
  PreferNoSchedule = "PreferNoSchedule",
  /** NoExecute taint effect */
  NoExecute = "NoExecute",
}

/**
 * The taint effect the same as in Kubernetes \
 * {@link KnownEffect} can be used interchangeably with Effect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoSchedule**: NoSchedule taint effect \
 * **PreferNoSchedule**: PreferNoSchedule taint effect \
 * **NoExecute**: NoExecute taint effect
 */
export type Effect = string;

/** The template for adding updateable properties. */
export interface UpdateablePropertiesNodePoolProperties {
  /** OpenShift version for the nodepool */
  version?: NodePoolVersionProfile;
  /**
   * The number of worker nodes, it cannot be used together with autoscaling.
   * Validation:
   * - Minimum: 0
   * - Maximum: 200 (only when availabilityZone is not specified)
   * - No maximum when availabilityZone is specified
   */
  replicas?: number;
  /** Representation of a autoscaling in a node pool. */
  autoScaling?: NodePoolAutoScaling;
  /**
   * Kubernetes labels to propagate to the NodePool Nodes
   * Note that when the labels are updated this is only applied to newly
   * create nodes in the Nodepool, existing node labels remain unchanged.
   */
  labels?: Label[];
  /** Taints for the nodes */
  taints?: Taint[];
  /**
   * nodeDrainTimeoutMinutes is the grace period for how long Pod Disruption Budget-protected workloads will be
   * respected during any node draining operation. After this grace period, any workloads protected by Pod Disruption
   * Budgets that have not been successfully drained from a node will be forcibly evicted. This is
   * especially relevant to cluster upgrades.
   *
   * Valid values are from 0 to 10080 minutes (1 week) .
   * 0 means that the NodePool can be drained without any time limitation.
   *
   * If unset the cluster nodeDrainTimeoutMinutes value is used as a default.
   */
  nodeDrainTimeoutMinutes?: number;
}

export function updateablePropertiesNodePoolPropertiesSerializer(
  item: UpdateablePropertiesNodePoolProperties,
): any {
  return {
    version: !item["version"] ? item["version"] : nodePoolVersionProfileSerializer(item["version"]),
    replicas: item["replicas"],
    autoScaling: !item["autoScaling"]
      ? item["autoScaling"]
      : nodePoolAutoScalingSerializer(item["autoScaling"]),
    labels: !item["labels"] ? item["labels"] : labelArraySerializer(item["labels"]),
    taints: !item["taints"] ? item["taints"] : taintArraySerializer(item["taints"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
  };
}

/** The response of a NodePool list operation. */
export interface _NodePoolListResult {
  /** The NodePool items on this page */
  value: NodePool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodePoolListResultDeserializer(item: any): _NodePoolListResult {
  return {
    value: nodePoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodePoolArraySerializer(result: Array<NodePool>): any[] {
  return result.map((item) => {
    return nodePoolSerializer(item);
  });
}

export function nodePoolArrayDeserializer(result: Array<NodePool>): any[] {
  return result.map((item) => {
    return nodePoolDeserializer(item);
  });
}

/** ExternalAuth resource */
export interface ExternalAuth extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ExternalAuthProperties;
}

export function externalAuthSerializer(item: ExternalAuth): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : externalAuthPropertiesSerializer(item["properties"]),
  };
}

export function externalAuthDeserializer(item: any): ExternalAuth {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : externalAuthPropertiesDeserializer(item["properties"]),
  };
}

/** External Auth profile */
export interface ExternalAuthProperties {
  /** Provisioning state */
  readonly provisioningState?: ExternalAuthProvisioningState;
  /** Status of the external auth resource */
  readonly status?: ResourceStatus;
  /** Token Issuer profile */
  issuer: TokenIssuerProfile;
  /**
   * External Auth OIDC clients
   * There must not be more than 20 entries and entries must have unique namespace/name pairs.
   */
  clients?: ExternalAuthClientProfile[];
  /**
   * External Auth claim
   * This configures how claims are validated and applied.
   */
  claim: ExternalAuthClaimProfile;
}

export function externalAuthPropertiesSerializer(item: ExternalAuthProperties): any {
  return {
    issuer: tokenIssuerProfileSerializer(item["issuer"]),
    clients: !item["clients"]
      ? item["clients"]
      : externalAuthClientProfileArraySerializer(item["clients"]),
    claim: externalAuthClaimProfileSerializer(item["claim"]),
  };
}

export function externalAuthPropertiesDeserializer(item: any): ExternalAuthProperties {
  return {
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : resourceStatusDeserializer(item["status"]),
    issuer: tokenIssuerProfileDeserializer(item["issuer"]),
    clients: !item["clients"]
      ? item["clients"]
      : externalAuthClientProfileArrayDeserializer(item["clients"]),
    claim: externalAuthClaimProfileDeserializer(item["claim"]),
  };
}

/** The resource provisioning state. */
export enum KnownExternalAuthProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Non-terminal state indicating the resource has been accepted */
  Accepted = "Accepted",
  /** Non-terminal state indicating the resource is deleting */
  Deleting = "Deleting",
  /** Non-terminal state indicating the resource is provisioning */
  Provisioning = "Provisioning",
  /** Non-terminal state indicating the resource is updating */
  Updating = "Updating",
  /** Non-terminal state indicating the resource is awaiting secret */
  AwaitingSecret = "AwaitingSecret",
}

/**
 * The resource provisioning state. \
 * {@link KnownExternalAuthProvisioningState} can be used interchangeably with ExternalAuthProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Non-terminal state indicating the resource has been accepted \
 * **Deleting**: Non-terminal state indicating the resource is deleting \
 * **Provisioning**: Non-terminal state indicating the resource is provisioning \
 * **Updating**: Non-terminal state indicating the resource is updating \
 * **AwaitingSecret**: Non-terminal state indicating the resource is awaiting secret
 */
export type ExternalAuthProvisioningState = string;

/**
 * Token issuer profile
 * This configures how the platform interacts with the identity provider and
 * how tokens issued from the identity provider are evaluated by the Kubernetes API server.
 */
export interface TokenIssuerProfile {
  /**
   * This configures the URL used to issue tokens by the identity provider.
   * The Kubernetes API server determines how authentication tokens should be handled
   * by matching the 'iss' claim in the JWT to the issuerURL of configured identity providers.
   *
   * issuerURL must use the 'https' scheme.
   */
  url: string;
  /**
   * This configures the acceptable audiences the JWT token, issued by the identity
   * provider, must be issued to. At least one of the entries must match the
   * 'aud' claim in the JWT token.
   *
   * audiences must contain at least one entry and must not exceed ten entries.
   */
  audiences: string[];
  /**
   * The issuer of the token
   *
   * Certificate bundle to use to validate server certificates for the configured URL.
   * It must be PEM encoded and when not specified, the system trust is used.
   */
  ca?: string;
}

export function tokenIssuerProfileSerializer(item: TokenIssuerProfile): any {
  return {
    url: item["url"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
    ca: item["ca"],
  };
}

export function tokenIssuerProfileDeserializer(item: any): TokenIssuerProfile {
  return {
    url: item["url"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
    ca: item["ca"],
  };
}

export function externalAuthClientProfileArraySerializer(
  result: Array<ExternalAuthClientProfile>,
): any[] {
  return result.map((item) => {
    return externalAuthClientProfileSerializer(item);
  });
}

export function externalAuthClientProfileArrayDeserializer(
  result: Array<ExternalAuthClientProfile>,
): any[] {
  return result.map((item) => {
    return externalAuthClientProfileDeserializer(item);
  });
}

/**
 * External Auth client profile
 * This configures how on-cluster, platform clients should request tokens from the identity provider.
 */
export interface ExternalAuthClientProfile {
  /** External Auth client component */
  component: ExternalAuthClientComponentProfile;
  /**
   * External Auth client id
   * The clientId must appear in the audience field of the TokenIssuerProfile.
   */
  clientId: string;
  /**
   * external auth client scopes
   *
   * This is useful if you have configured claim mappings that requires specific
   * scopes to be requested beyond the standard OIDC scopes.
   * When omitted, no additional scopes are requested.
   */
  extraScopes?: string[];
  /** Determines the OIDC provider client type. */
  type: ExternalAuthClientType;
}

export function externalAuthClientProfileSerializer(item: ExternalAuthClientProfile): any {
  return {
    component: externalAuthClientComponentProfileSerializer(item["component"]),
    clientId: item["clientId"],
    extraScopes: !item["extraScopes"]
      ? item["extraScopes"]
      : item["extraScopes"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

export function externalAuthClientProfileDeserializer(item: any): ExternalAuthClientProfile {
  return {
    component: externalAuthClientComponentProfileDeserializer(item["component"]),
    clientId: item["clientId"],
    extraScopes: !item["extraScopes"]
      ? item["extraScopes"]
      : item["extraScopes"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

/**
 * External Auth component profile
 * Must have unique namespace/name pairs.
 */
export interface ExternalAuthClientComponentProfile {
  /**
   * The name of the external auth client
   *
   * This specifies the name of the platform component being configured to use
   * the identity provider as an authentication mode.
   * It is used in combination with namespace as a unique identifier.
   */
  name: string;
  /**
   * The namespace of the external Auth client
   * This specifies the namespace in which the platform component being configured
   * to use the identity provider as an authentication mode is running.
   *
   * It is used in combination with name as a unique identifier.
   */
  authClientNamespace: string;
}

export function externalAuthClientComponentProfileSerializer(
  item: ExternalAuthClientComponentProfile,
): any {
  return { name: item["name"], authClientNamespace: item["authClientNamespace"] };
}

export function externalAuthClientComponentProfileDeserializer(
  item: any,
): ExternalAuthClientComponentProfile {
  return {
    name: item["name"],
    authClientNamespace: item["authClientNamespace"],
  };
}

/** Representation of the possible values of an external authentication client's type */
export enum KnownExternalAuthClientType {
  /**
   * Indicates that the client is confidential.
   * Confidential clients must provide a client secret.
   * The secret should be provided within the cluster itself.
   */
  Confidential = "Confidential",
  /**
   * Indicates that the client is public.
   * Public clients must not provide a client secret.
   */
  Public = "Public",
}

/**
 * Representation of the possible values of an external authentication client's type \
 * {@link KnownExternalAuthClientType} can be used interchangeably with ExternalAuthClientType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Confidential**: Indicates that the client is confidential.
 * Confidential clients must provide a client secret.
 * The secret should be provided within the cluster itself. \
 * **Public**: Indicates that the client is public.
 * Public clients must not provide a client secret.
 */
export type ExternalAuthClientType = string;

/** External Auth claim profile */
export interface ExternalAuthClaimProfile {
  /** The claim mappings */
  mappings: TokenClaimMappingsProfile;
  /** The claim validation rules */
  validationRules?: TokenClaimValidationRule[];
}

export function externalAuthClaimProfileSerializer(item: ExternalAuthClaimProfile): any {
  return {
    mappings: tokenClaimMappingsProfileSerializer(item["mappings"]),
    validationRules: !item["validationRules"]
      ? item["validationRules"]
      : tokenClaimValidationRuleArraySerializer(item["validationRules"]),
  };
}

export function externalAuthClaimProfileDeserializer(item: any): ExternalAuthClaimProfile {
  return {
    mappings: tokenClaimMappingsProfileDeserializer(item["mappings"]),
    validationRules: !item["validationRules"]
      ? item["validationRules"]
      : tokenClaimValidationRuleArrayDeserializer(item["validationRules"]),
  };
}

/**
 * External Auth claim mappings profile.
 * At a minimum username or groups must be defined.
 */
export interface TokenClaimMappingsProfile {
  /** The claim mappings username. */
  username: UsernameClaimProfile;
  /** The claim mappings groups. */
  groups?: GroupClaimProfile;
}

export function tokenClaimMappingsProfileSerializer(item: TokenClaimMappingsProfile): any {
  return {
    username: usernameClaimProfileSerializer(item["username"]),
    groups: !item["groups"] ? item["groups"] : groupClaimProfileSerializer(item["groups"]),
  };
}

export function tokenClaimMappingsProfileDeserializer(item: any): TokenClaimMappingsProfile {
  return {
    username: usernameClaimProfileDeserializer(item["username"]),
    groups: !item["groups"] ? item["groups"] : groupClaimProfileDeserializer(item["groups"]),
  };
}

/**
 * External Auth claim profile
 * This configures how the username of a cluster identity should be constructed
 * from the claims in a JWT token issued by the identity provider.
 */
export interface UsernameClaimProfile {
  /** Claim name of the external profile */
  claim: string;
  /**
   * Prefix for the claim external profile
   * Must be set when the prefixPolicy field is set to 'Prefix' and must be unset
   * otherwise.
   */
  prefix?: string;
  /**
   * Prefix policy is an optional field that configures how a prefix should be
   * applied to the value of the JWT claim specified in the 'claim' field.
   *
   * Allowed values are 'Prefix', 'NoPrefix', and 'None'. If not specified, the
   * default policy is 'None'.
   *
   * When set to 'Prefix', the value specified in the prefix field will be
   * prepended to the value of the JWT claim.
   * The prefix field must be set when prefixPolicy is 'Prefix'.
   *
   * When set to 'NoPrefix', no prefix will be prepended to the value
   * of the JWT claim.
   *
   * When set to 'None', this means no opinion and the platform is left to choose
   * any prefixes that are applied which is subject to change over time.
   * Currently, the platform prepends `{issuerURL}#` to the value of the JWT claim
   * when the claim is not 'email'.
   * As an example, consider the following scenario:
   * `prefix` is unset, `issuerURL` is set to `https://myoidc.tld`,
   * the JWT claims include "username":"userA" and "email":"userA
   */
  prefixPolicy?: UsernameClaimPrefixPolicy;
}

export function usernameClaimProfileSerializer(item: UsernameClaimProfile): any {
  return { claim: item["claim"], prefix: item["prefix"], prefixPolicy: item["prefixPolicy"] };
}

export function usernameClaimProfileDeserializer(item: any): UsernameClaimProfile {
  return {
    claim: item["claim"],
    prefix: item["prefix"],
    prefixPolicy: item["prefixPolicy"],
  };
}

/** UsernameClaimPrefixPolicy configures whether to add a prefix to a JWT claim. */
export enum KnownUsernameClaimPrefixPolicy {
  /** No opinion; the platform is left to choose a prefix for the JWT claim */
  None = "None",
  /** Add a user-provided prefix to the JWT claim */
  Prefix = "Prefix",
  /** Do not add a prefix to the JWT claim */
  NoPrefix = "NoPrefix",
}

/**
 * UsernameClaimPrefixPolicy configures whether to add a prefix to a JWT claim. \
 * {@link KnownUsernameClaimPrefixPolicy} can be used interchangeably with UsernameClaimPrefixPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No opinion; the platform is left to choose a prefix for the JWT claim \
 * **Prefix**: Add a user-provided prefix to the JWT claim \
 * **NoPrefix**: Do not add a prefix to the JWT claim
 */
export type UsernameClaimPrefixPolicy = string;

/**
 * External Auth claim profile
 * This configures how the groups of a cluster identity should be constructed
 * from the claims in a JWT token issued by the identity provider. When
 * referencing a claim, if the claim is present in the JWT token, its value
 * must be a list of groups separated by a comma (',').
 *
 * For example - '"example"' and '"exampleOne", "exampleTwo", "exampleThree"' are valid claim values.
 */
export interface GroupClaimProfile {
  /** Claim name of the external profile */
  claim: string;
  /**
   * Prefix for the claim external profile
   * If this is specified prefixPolicy will be set to "Prefix" by default
   */
  prefix?: string;
}

export function groupClaimProfileSerializer(item: GroupClaimProfile): any {
  return { claim: item["claim"], prefix: item["prefix"] };
}

export function groupClaimProfileDeserializer(item: any): GroupClaimProfile {
  return {
    claim: item["claim"],
    prefix: item["prefix"],
  };
}

export function tokenClaimValidationRuleArraySerializer(
  result: Array<TokenClaimValidationRule>,
): any[] {
  return result.map((item) => {
    return tokenClaimValidationRuleSerializer(item);
  });
}

export function tokenClaimValidationRuleArrayDeserializer(
  result: Array<TokenClaimValidationRule>,
): any[] {
  return result.map((item) => {
    return tokenClaimValidationRuleDeserializer(item);
  });
}

/** External Auth claim validation rule */
export interface TokenClaimValidationRule {
  /**
   * This configures the type of the validation rule.
   * It defaults to "RequiredClaim"
   */
  type?: TokenValidationRuleType;
  /** The required claim rule to be applied. */
  requiredClaim?: TokenRequiredClaim;
}

export function tokenClaimValidationRuleSerializer(item: TokenClaimValidationRule): any {
  return {
    type: item["type"],
    requiredClaim: !item["requiredClaim"]
      ? item["requiredClaim"]
      : tokenRequiredClaimSerializer(item["requiredClaim"]),
  };
}

export function tokenClaimValidationRuleDeserializer(item: any): TokenClaimValidationRule {
  return {
    type: item["type"],
    requiredClaim: !item["requiredClaim"]
      ? item["requiredClaim"]
      : tokenRequiredClaimDeserializer(item["requiredClaim"]),
  };
}

/** Representation of the different claim validation rule types that can be configured. */
export enum KnownTokenValidationRuleType {
  /**
   * Indicates that a Required Claim validation rule.
   *
   * When set to 'RequiredClaim', the Kubernetes API server will be configured to validate that the incoming JWT
   * contains the required claim and that its value matches the required value.
   */
  RequiredClaim = "RequiredClaim",
}

/**
 * Representation of the different claim validation rule types that can be configured. \
 * {@link KnownTokenValidationRuleType} can be used interchangeably with TokenValidationRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RequiredClaim**: Indicates that a Required Claim validation rule.
 *
 * When set to 'RequiredClaim', the Kubernetes API server will be configured to validate that the incoming JWT
 * contains the required claim and that its value matches the required value.
 */
export type TokenValidationRuleType = string;

/** Token required claim validation rule. */
export interface TokenRequiredClaim {
  /**
   * Claim name for the validation profile
   * claim is a required field that configures the name of the required claim.
   */
  claim: string;
  /**
   * Required value
   * requiredValue is a required field that configures the value that 'claim' must
   * have when taken from the incoming JWT claims.
   * If the value in the JWT claims does not match, the token
   * will be rejected for authentication.
   */
  requiredValue: string;
}

export function tokenRequiredClaimSerializer(item: TokenRequiredClaim): any {
  return { claim: item["claim"], requiredValue: item["requiredValue"] };
}

export function tokenRequiredClaimDeserializer(item: any): TokenRequiredClaim {
  return {
    claim: item["claim"],
    requiredValue: item["requiredValue"],
  };
}

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

/** The response of a ExternalAuth list operation. */
export interface _ExternalAuthListResult {
  /** The ExternalAuth items on this page */
  value: ExternalAuth[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _externalAuthListResultDeserializer(item: any): _ExternalAuthListResult {
  return {
    value: externalAuthArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function externalAuthArraySerializer(result: Array<ExternalAuth>): any[] {
  return result.map((item) => {
    return externalAuthSerializer(item);
  });
}

export function externalAuthArrayDeserializer(result: Array<ExternalAuth>): any[] {
  return result.map((item) => {
    return externalAuthDeserializer(item);
  });
}

/** HcpOpenShiftVersion represents a location based available HCP OpenShift version */
export interface HcpOpenShiftVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HcpOpenShiftVersionProperties;
}

export function hcpOpenShiftVersionDeserializer(item: any): HcpOpenShiftVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hcpOpenShiftVersionPropertiesDeserializer(item["properties"]),
  };
}

/** HcpOpenShiftVersionProperties contains details of an available HCP Openshift version */
export interface HcpOpenShiftVersionProperties {
  /** ChannelGroup is the name of the group where this version belongs. */
  channelGroup: string;
  /** Enabled indicates if this version can be used to create clusters. */
  enabled: boolean;
  /** EndOfLifeTimestamp is the date and time when this version will reach End of Life. */
  endOfLifeTimestamp: Date;
}

export function hcpOpenShiftVersionPropertiesDeserializer(
  item: any,
): HcpOpenShiftVersionProperties {
  return {
    channelGroup: item["channelGroup"],
    enabled: item["enabled"],
    endOfLifeTimestamp: new Date(item["endOfLifeTimestamp"]),
  };
}

/** The response of a HcpOpenShiftVersion list operation. */
export interface _HcpOpenShiftVersionListResult {
  /** The HcpOpenShiftVersion items on this page */
  value: HcpOpenShiftVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hcpOpenShiftVersionListResultDeserializer(
  item: any,
): _HcpOpenShiftVersionListResult {
  return {
    value: hcpOpenShiftVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hcpOpenShiftVersionArrayDeserializer(result: Array<HcpOpenShiftVersion>): any[] {
  return result.map((item) => {
    return hcpOpenShiftVersionDeserializer(item);
  });
}

/** The response of a HcpOperatorIdentityRoleSet list operation. */
export interface _HcpOperatorIdentityRoleSetListResult {
  /** The HcpOperatorIdentityRoleSet items on this page */
  value: HcpOperatorIdentityRoleSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hcpOperatorIdentityRoleSetListResultDeserializer(
  item: any,
): _HcpOperatorIdentityRoleSetListResult {
  return {
    value: hcpOperatorIdentityRoleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hcpOperatorIdentityRoleSetArrayDeserializer(
  result: Array<HcpOperatorIdentityRoleSet>,
): any[] {
  return result.map((item) => {
    return hcpOperatorIdentityRoleSetDeserializer(item);
  });
}

/**
 * HcpOperatorIdentityRoles represents a location based representation of
 * the required platform workload identities and their required roles for a given
 * OpenShift version
 */
export interface HcpOperatorIdentityRoleSet extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HcpOperatorIdentityRoleSetProperties;
}

export function hcpOperatorIdentityRoleSetDeserializer(item: any): HcpOperatorIdentityRoleSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hcpOperatorIdentityRoleSetPropertiesDeserializer(item["properties"]),
  };
}

/** HCP Operator Identity Roles properties */
export interface HcpOperatorIdentityRoleSetProperties {
  /**
   * The role definitions required for the User-Assigned managed identities used
   * by Control Plane operators on a cluster.
   */
  controlPlaneOperators: OperatorIdentityRoles[];
  /**
   * The role definitions required for the User-Assigned managed identities used
   * by Data Plane operators on a cluster.
   */
  dataPlaneOperators: OperatorIdentityRoles[];
}

export function hcpOperatorIdentityRoleSetPropertiesDeserializer(
  item: any,
): HcpOperatorIdentityRoleSetProperties {
  return {
    controlPlaneOperators: operatorIdentityRolesArrayDeserializer(item["controlPlaneOperators"]),
    dataPlaneOperators: operatorIdentityRolesArrayDeserializer(item["dataPlaneOperators"]),
  };
}

export function operatorIdentityRolesArrayDeserializer(
  result: Array<OperatorIdentityRoles>,
): any[] {
  return result.map((item) => {
    return operatorIdentityRolesDeserializer(item);
  });
}

/** Role definitions for a specific operator */
export interface OperatorIdentityRoles {
  /** Name of the operator */
  name: string;
  /** Whether or not the operator is required for installation */
  required: OperatorIdentityRequired;
  /** The role definitions required to be assigned to the identity assumed by this operator */
  roleDefinitions: RoleDefinition[];
}

export function operatorIdentityRolesDeserializer(item: any): OperatorIdentityRoles {
  return {
    name: item["name"],
    required: item["required"],
    roleDefinitions: roleDefinitionArrayDeserializer(item["roleDefinitions"]),
  };
}

/** Indicates if the identity is required */
export enum KnownOperatorIdentityRequired {
  /** Indicates the identity is always required. */
  Always = "Always",
  /** Indicates the identity is only required when a functionality that leverages the operator is enabled. */
  OnEnablement = "OnEnablement",
}

/**
 * Indicates if the identity is required \
 * {@link KnownOperatorIdentityRequired} can be used interchangeably with OperatorIdentityRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Always**: Indicates the identity is always required. \
 * **OnEnablement**: Indicates the identity is only required when a functionality that leverages the operator is enabled.
 */
export type OperatorIdentityRequired = string;

export function roleDefinitionArrayDeserializer(result: Array<RoleDefinition>): any[] {
  return result.map((item) => {
    return roleDefinitionDeserializer(item);
  });
}

/** A single role definition required by a given operator */
export interface RoleDefinition {
  /** The name of the required role definition */
  name: string;
  /** The resource ID of the role definition */
  resourceId: string;
}

export function roleDefinitionDeserializer(item: any): RoleDefinition {
  return {
    name: item["name"],
    resourceId: item["resourceId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2024-06-10-preview version */
  V20240610Preview = "2024-06-10-preview",
  /** 2025-12-23-preview version */
  V20251223Preview = "2025-12-23-preview",
  /** 2026-06-30-preview version */
  V20260630Preview = "2026-06-30-preview",
}
