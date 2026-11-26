// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type {
  TrackedResource,
  ProxyResource,
  SystemAssignedServiceIdentity,
} from "../../models.js";
import {
  systemDataDeserializer,
  systemAssignedServiceIdentitySerializer,
  systemAssignedServiceIdentityDeserializer,
} from "../../models.js";

/** AgentFabric resource */
export interface AgentFabric extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AgentFabricProperties;
  /**
   * The managed service identity assigned to this fabric. The service uses it to reach the
   * clusters associated with the fabric on the customer's behalf.
   */
  identity?: SystemAssignedServiceIdentity;
}

export function agentFabricSerializer(item: AgentFabric): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : agentFabricPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function agentFabricDeserializer(item: any): AgentFabric {
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
      : agentFabricPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** AgentFabric properties */
export interface AgentFabricProperties {
  /** The unique identifier (GUID) assigned to the agent fabric by the resource provider when it is created. */
  readonly resourceGuid?: string;
  /**
   * The default policy groups to apply to all members of this fabric. A fabric without a configured
   * inspection connection cannot reference a group containing any ContentInspection policy,
   * even when that policy's selectors currently match no traffic.
   * For an existing fabric, compatibility uses the stored configuration when PUT omits
   * contentInspectionProfile or supplies an empty object. Existing legacy fabrics retain their regional
   * Content Safety connection, which satisfies the inspection prerequisite without new probes.
   * A connection still being validated is not an absent connection. Removing a group
   * reference remains allowed, subject to other validation.
   */
  defaultPolicyGroups?: string[];
  /**
   * The connection to the customer's Azure Content Safety account. For a new
   * fabric created with API version `2026-10-07-preview` or later, omitting this profile or supplying {}
   * requests no inspection capability and uses no platform-owned account or shared-key fallback.
   *
   * For an existing fabric, omitting the profile from PUT, including requests from older clients,
   * or supplying {} preserves its customer-owned connection, legacy regional connection, or absence
   * of connection. The empty object is a request for no connection change, not a stored replacement
   * profile. Neither omission nor {} removes, probes, or creates a connection or cancels a pending
   * connection update. Other Fabric fields and policy compatibility rules still apply.
   * A nonempty request profile requires both endpoint and apiKey, even at the unchanged endpoint.
   * PUT can rotate the key or replace the endpoint by supplying the complete pair. Tags- or
   * identity-only PATCH requests cannot change this profile.
   *
   * Existing legacy fabrics without a profile retain their regional Content Safety endpoint and
   * authentication path. Omission or {} triggers no connection probe, account-management call, key
   * retrieval, or credential requirement. Supplying a complete profile explicitly configures a
   * customer-owned connection; there is no automatic conversion or failed-connection fallback
   * to regional credentials.
   *
   * The customer owns, pays for, and operates the account. The service does not create, reserve,
   * manage, or delete it. The service validates new or changed endpoint/credential configuration
   * and the required Content Safety API before activation; configuration alone does not indicate
   * readiness or active policy enforcement. Unchanged configuration, GET, and list do not trigger
   * a new validation request. A failed replacement preserves the existing connection and credential,
   * including a legacy regional connection.
   */
  contentInspectionProfile?: ContentInspectionProfile;
  /**
   * The trust domain that scopes this fabric's member identities. It is the leading component of
   * each member's identity, which takes the form `<trustDomain>/<agentFabricName>/<memberName>`.
   * Set at creation and immutable thereafter; when omitted, the shared default trust domain
   * `microsoft.agentfabric` is used.
   */
  trustDomain?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function agentFabricPropertiesSerializer(item: AgentFabricProperties): any {
  return {
    defaultPolicyGroups: !item["defaultPolicyGroups"]
      ? item["defaultPolicyGroups"]
      : item["defaultPolicyGroups"].map((p: any) => {
          return p;
        }),
    contentInspectionProfile: !item["contentInspectionProfile"]
      ? item["contentInspectionProfile"]
      : contentInspectionProfileSerializer(item["contentInspectionProfile"]),
    trustDomain: item["trustDomain"],
  };
}

export function agentFabricPropertiesDeserializer(item: any): AgentFabricProperties {
  return {
    resourceGuid: item["resourceGuid"],
    defaultPolicyGroups: !item["defaultPolicyGroups"]
      ? item["defaultPolicyGroups"]
      : item["defaultPolicyGroups"].map((p: any) => {
          return p;
        }),
    contentInspectionProfile: !item["contentInspectionProfile"]
      ? item["contentInspectionProfile"]
      : contentInspectionProfileDeserializer(item["contentInspectionProfile"]),
    trustDomain: item["trustDomain"],
    provisioningState: item["provisioningState"],
  };
}

/**
 * A connection to a customer-owned Azure Content Safety account. Configuring the connection
 * does not create or attach a ContentInspection policy or select traffic for inspection.
 * The endpoint routes Content Safety calls; a key alone cannot identify the account endpoint.
 * The customer supplies the key, so the service does not discover account keys through Azure
 * Resource Manager or require permission to perform the account's listKeys action.
 * Fields are schema-optional to allow an empty request object. Service cross-field validation
 * requires both endpoint and apiKey in a nonempty request profile. Read responses contain only
 * the endpoint; they are not complete connection-update inputs.
 */
export interface ContentInspectionProfile {
  /**
   * The HTTPS account endpoint, for example `https://contoso.cognitiveservices.azure.com/`.
   * Only Azure Content Safety account endpoints in the service's supported Azure cloud are
   * accepted. Credentials must not be forwarded to other destinations, including redirects.
   * Required together with apiKey in a nonempty request profile, including key rotation.
   * Changing the endpoint requires a key for the new account; the stored key is not reused.
   */
  endpoint?: string;
  /**
   * The nonempty API key for the specified account. Required together with endpoint in every
   * nonempty request profile, even when the endpoint is unchanged. Supplying a different key
   * with the endpoint on PUT rotates the stored credential. A missing key in a nonempty profile
   * is rejected without retrieving a saved key or comparing with the saved endpoint to permit omission.
   * Null and empty values are rejected, not treated as removal. The key is never returned in
   * resource, list, or long-running operation responses.
   */
  apiKey?: string;
}

export function contentInspectionProfileSerializer(item: ContentInspectionProfile): any {
  return { endpoint: item["endpoint"], apiKey: item["apiKey"] };
}

export function contentInspectionProfileDeserializer(item: any): ContentInspectionProfile {
  return {
    endpoint: item["endpoint"],
    apiKey: item["apiKey"],
  };
}

/** Provisioning state of the resource */
export enum KnownProvisioningState {
  /** Resource provisioning succeeded */
  Succeeded = "Succeeded",
  /** Resource provisioning failed */
  Failed = "Failed",
  /** Resource provisioning was canceled */
  Canceled = "Canceled",
  /** The resource create request has been accepted; provisioning is in progress. */
  Provisioning = "Provisioning",
  /** The resource is being created. */
  Creating = "Creating",
  /** The resource update request has been accepted; the update is in progress. */
  Updating = "Updating",
  /** The resource delete request has been accepted; deletion is in progress. */
  Deleting = "Deleting",
  /** The long-running operation has been accepted and is not yet complete. */
  Accepted = "Accepted",
}

/**
 * Provisioning state of the resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource provisioning succeeded \
 * **Failed**: Resource provisioning failed \
 * **Canceled**: Resource provisioning was canceled \
 * **Provisioning**: The resource create request has been accepted; provisioning is in progress. \
 * **Creating**: The resource is being created. \
 * **Updating**: The resource update request has been accepted; the update is in progress. \
 * **Deleting**: The resource delete request has been accepted; deletion is in progress. \
 * **Accepted**: The long-running operation has been accepted and is not yet complete.
 */
export type ProvisioningState = string;

/** The type used for updating tags in AgentFabric resources. */
export interface AgentFabricTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identity assigned to this fabric. */
  identity?: SystemAssignedServiceIdentity;
}

export function agentFabricTagsUpdateSerializer(item: AgentFabricTagsUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function agentFabricArraySerializer(result: Array<AgentFabric>): any[] {
  return result.map((item) => {
    return agentFabricSerializer(item);
  });
}

export function agentFabricArrayDeserializer(result: Array<AgentFabric>): any[] {
  return result.map((item) => {
    return agentFabricDeserializer(item);
  });
}

/** Member resource */
export interface Member extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MemberProperties;
}

export function memberSerializer(item: Member): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : memberPropertiesSerializer(item["properties"]),
  };
}

export function memberDeserializer(item: any): Member {
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
      : memberPropertiesDeserializer(item["properties"]),
  };
}

/** Member properties */
export interface MemberProperties {
  /** The customer-provided fully qualified domain name associated with the member. */
  fqdn?: string;
  /**
   * The workload configuration of the member. Set at creation and immutable
   * thereafter; to change the workload, delete and recreate the member.
   */
  workload?: WorkloadBaseUnion;
  /**
   * The SPIFFE ID that identifies this member's workload identity, system-assigned by the service
   * at creation time. It takes the form `spiffe://<trustDomain>/<agentFabricName>/<memberName>`,
   * using the owning fabric's trust domain (or the default `microsoft.agentfabric` when unset), with
   * all segments lower-cased to conform to the SPIFFE ID scheme. Read-only.
   */
  readonly spiffeId?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function memberPropertiesSerializer(item: MemberProperties): any {
  return {
    fqdn: item["fqdn"],
    workload: !item["workload"] ? item["workload"] : workloadBaseUnionSerializer(item["workload"]),
  };
}

export function memberPropertiesDeserializer(item: any): MemberProperties {
  return {
    fqdn: item["fqdn"],
    workload: !item["workload"]
      ? item["workload"]
      : workloadBaseUnionDeserializer(item["workload"]),
    spiffeId: item["spiffeId"],
    provisioningState: item["provisioningState"],
  };
}

/** Base workload configuration for a member. */
export interface WorkloadBase {
  /** The workload type. */
  /** The discriminator possible values: ACI, AKS, AgentFabricSandbox */
  type: WorkloadType;
  /**
   * The unique identifier (GUID) assigned to the member when it is created. For most workload
   * types this is assigned by the resource provider and is read-only. Starting in API version
   * `2026-10-07-preview`, ACI workloads instead supply this value at creation: the ACI resource
   * provider generates the GUID for the sandbox and this field is immutable afterward. Starting in
   * API version `2026-11-02-preview`, the ACI member resource name is this GUID: the service sets
   * memberGuid from the member name, and a value supplied in the request must match the member name.
   */
  memberGuid?: string;
}

export function workloadBaseSerializer(item: WorkloadBase): any {
  return { type: item["type"], memberGuid: item["memberGuid"] };
}

export function workloadBaseDeserializer(item: any): WorkloadBase {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
  };
}

/** Alias for WorkloadBaseUnion */
export type WorkloadBaseUnion =
  AciWorkload | AksWorkload | AgentFabricSandboxWorkload | WorkloadBase;

export function workloadBaseUnionSerializer(item: WorkloadBaseUnion): any {
  switch (item.type) {
    case "ACI":
      return aciWorkloadSerializer(item as AciWorkload);

    case "AKS":
      return aksWorkloadSerializer(item as AksWorkload);

    case "AgentFabricSandbox":
      return agentFabricSandboxWorkloadSerializer(item as AgentFabricSandboxWorkload);

    default:
      return workloadBaseSerializer(item);
  }
}

export function workloadBaseUnionDeserializer(item: any): WorkloadBaseUnion {
  switch (item["type"]) {
    case "ACI":
      return aciWorkloadDeserializer(item as AciWorkload);

    case "AKS":
      return aksWorkloadDeserializer(item as AksWorkload);

    case "AgentFabricSandbox":
      return agentFabricSandboxWorkloadDeserializer(item as AgentFabricSandboxWorkload);

    default:
      return workloadBaseDeserializer(item);
  }
}

/** The workload type of a member. */
export enum KnownWorkloadType {
  /** ACI (Azure Container Instances) sandbox workload type */
  ACI = "ACI",
  /** Agent Fabric sandbox workload type */
  AgentFabricSandbox = "AgentFabricSandbox",
  /** AKS workload type */
  AKS = "AKS",
}

/**
 * The workload type of a member. \
 * {@link KnownWorkloadType} can be used interchangeably with WorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ACI**: ACI (Azure Container Instances) sandbox workload type \
 * **AgentFabricSandbox**: Agent Fabric sandbox workload type \
 * **AKS**: AKS workload type
 */
export type WorkloadType = string;

/** ACI (Azure Container Instances) sandbox workload configuration. */
export interface AciWorkload extends WorkloadBase {
  /** The workload type. */
  type: "ACI";
  /**
   * The Azure Resource Manager resource ID of the Azure Container Instances (ACI)
   * resource backing this member's sandbox. Starting in API version
   * `2026-10-07-preview`, this identifies the parent SandboxGroup -- the enrollment
   * boundary associated with the fabric through a ClusterAssociation -- rather than
   * the individual container group.
   */
  resourceId: string;
  /** The Entra agent identity associated with the workload. */
  agentIdentity?: AgentIdentity;
  /**
   * The human-readable name of the ACI sandbox. The ACI resource provider supplies it at creation.
   * It must be unique within the agent fabric and cannot be changed after the member is created.
   * The member resource name is the sandbox GUID, not this name.
   */
  workloadId: string;
}

export function aciWorkloadSerializer(item: AciWorkload): any {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    resourceId: item["resourceId"],
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentitySerializer(item["agentIdentity"]),
    workloadId: item["workloadId"],
  };
}

export function aciWorkloadDeserializer(item: any): AciWorkload {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    resourceId: item["resourceId"],
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentityDeserializer(item["agentIdentity"]),
    workloadId: item["workloadId"],
  };
}

/** The Entra agent identity associated with an Agent Fabric sandbox workload. */
export interface AgentIdentity {
  /** The Azure tenant ID that owns the agent identity. */
  tenantId: string;
  /** The Entra agent ID representing the workload's identity. */
  agentId: string;
  /**
   * The Entra agent blueprint ID that this agent identity was instantiated from. The blueprint
   * describes the agent's declared capabilities and is used to scope the policies applied to the
   * workload.
   */
  blueprintId?: string;
}

export function agentIdentitySerializer(item: AgentIdentity): any {
  return { tenantId: item["tenantId"], agentId: item["agentId"], blueprintId: item["blueprintId"] };
}

export function agentIdentityDeserializer(item: any): AgentIdentity {
  return {
    tenantId: item["tenantId"],
    agentId: item["agentId"],
    blueprintId: item["blueprintId"],
  };
}

/**
 * AKS workload configuration. The workload already exists in the enrolled
 * cluster; the service does not create or schedule it.
 */
export interface AksWorkload extends WorkloadBase {
  /** The workload type. */
  type: "AKS";
  /** The Azure Resource Manager resource ID of the cluster association through which this member's workload is enrolled. */
  clusterAssociationId: string;
  /** The Azure Resource Manager resource ID of the managed cluster that hosts the workload. */
  clusterResourceId: string;
  /** The Kubernetes workload enrolled as this member. Reported when the workload is discovered in the enrolled cluster; member identity derives from the fabric and member name alone. */
  workload: AksWorkloadReference;
  /** The network endpoints exposed by the workload. */
  endpoints?: AksWorkloadPortMapping[];
  /** The unique identifier assigned to the workload by the resource provider. */
  readonly workloadId?: string;
}

export function aksWorkloadSerializer(item: AksWorkload): any {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    clusterAssociationId: item["clusterAssociationId"],
    clusterResourceId: item["clusterResourceId"],
    workload: aksWorkloadReferenceSerializer(item["workload"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aksWorkloadPortMappingArraySerializer(item["endpoints"]),
  };
}

export function aksWorkloadDeserializer(item: any): AksWorkload {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    clusterAssociationId: item["clusterAssociationId"],
    clusterResourceId: item["clusterResourceId"],
    workload: aksWorkloadReferenceDeserializer(item["workload"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : aksWorkloadPortMappingArrayDeserializer(item["endpoints"]),
    workloadId: item["workloadId"],
  };
}

/** A reference to the Kubernetes workload enrolled as a member. */
export interface AksWorkloadReference {
  /** The API group and version of the workload, for example `apps/v1`. */
  apiVersion: string;
  /** The kind of the workload, for example `Deployment`. */
  kind: string;
  /** The namespace the workload runs in. */
  namespace: string;
  /** The name of the workload. */
  name: string;
}

export function aksWorkloadReferenceSerializer(item: AksWorkloadReference): any {
  return {
    apiVersion: item["apiVersion"],
    kind: item["kind"],
    namespace: item["namespace"],
    name: item["name"],
  };
}

export function aksWorkloadReferenceDeserializer(item: any): AksWorkloadReference {
  return {
    apiVersion: item["apiVersion"],
    kind: item["kind"],
    namespace: item["namespace"],
    name: item["name"],
  };
}

export function aksWorkloadPortMappingArraySerializer(
  result: Array<AksWorkloadPortMapping>,
): any[] {
  return result.map((item) => {
    return aksWorkloadPortMappingSerializer(item);
  });
}

export function aksWorkloadPortMappingArrayDeserializer(
  result: Array<AksWorkloadPortMapping>,
): any[] {
  return result.map((item) => {
    return aksWorkloadPortMappingDeserializer(item);
  });
}

/** A service-to-workload port mapping for an AKS workload. */
export interface AksWorkloadPortMapping {
  /** The name of the port mapping. */
  name: string;
  /** The port exposed by the service. */
  servicePort: number;
  /** The network protocol used by the endpoint. */
  protocol: string;
  /** The port on the workload targeted by the service. */
  targetPort: number;
}

export function aksWorkloadPortMappingSerializer(item: AksWorkloadPortMapping): any {
  return {
    name: item["name"],
    servicePort: item["servicePort"],
    protocol: item["protocol"],
    targetPort: item["targetPort"],
  };
}

export function aksWorkloadPortMappingDeserializer(item: any): AksWorkloadPortMapping {
  return {
    name: item["name"],
    servicePort: item["servicePort"],
    protocol: item["protocol"],
    targetPort: item["targetPort"],
  };
}

/** Agent Fabric sandbox workload configuration. */
export interface AgentFabricSandboxWorkload extends WorkloadBase {
  /** The workload type. */
  type: "AgentFabricSandbox";
  /** The container image to run for the workload. */
  image: AgentFabricSandboxImage;
  /** The compute resources allocated to the workload. */
  resources: AgentFabricSandboxResources;
  /** The Entra agent identity associated with the workload. */
  agentIdentity?: AgentIdentity;
  /** The network endpoints exposed by the workload. */
  endpoints?: AgentFabricSandboxEndpoint[];
  /** The resolvable DNS name assigned to the workload. */
  domain: string;
  /** The unique identifier assigned to the workload by the resource provider. */
  readonly workloadId?: string;
}

export function agentFabricSandboxWorkloadSerializer(item: AgentFabricSandboxWorkload): any {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    image: agentFabricSandboxImageSerializer(item["image"]),
    resources: agentFabricSandboxResourcesSerializer(item["resources"]),
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentitySerializer(item["agentIdentity"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : agentFabricSandboxEndpointArraySerializer(item["endpoints"]),
    domain: item["domain"],
  };
}

export function agentFabricSandboxWorkloadDeserializer(item: any): AgentFabricSandboxWorkload {
  return {
    type: item["type"],
    memberGuid: item["memberGuid"],
    image: agentFabricSandboxImageDeserializer(item["image"]),
    resources: agentFabricSandboxResourcesDeserializer(item["resources"]),
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentityDeserializer(item["agentIdentity"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : agentFabricSandboxEndpointArrayDeserializer(item["endpoints"]),
    domain: item["domain"],
    workloadId: item["workloadId"],
  };
}

/** The container image to run for an Agent Fabric sandbox workload. */
export interface AgentFabricSandboxImage {
  /** The image reference URI (e.g., registry/repository:tag). */
  uri: string;
  /** The image content digest used to pin an exact image version. */
  digest?: string;
  /** The policy controlling when the image is pulled. */
  pullPolicy?: ImagePullPolicy;
}

export function agentFabricSandboxImageSerializer(item: AgentFabricSandboxImage): any {
  return { uri: item["uri"], digest: item["digest"], pullPolicy: item["pullPolicy"] };
}

export function agentFabricSandboxImageDeserializer(item: any): AgentFabricSandboxImage {
  return {
    uri: item["uri"],
    digest: item["digest"],
    pullPolicy: item["pullPolicy"],
  };
}

/** The image pull policy for a sandbox workload container image. */
export enum KnownImagePullPolicy {
  /** Always pull the image. */
  Always = "Always",
  /** Pull the image only if it is not already present on the host. */
  IfNotPresent = "IfNotPresent",
}

/**
 * The image pull policy for a sandbox workload container image. \
 * {@link KnownImagePullPolicy} can be used interchangeably with ImagePullPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Always**: Always pull the image. \
 * **IfNotPresent**: Pull the image only if it is not already present on the host.
 */
export type ImagePullPolicy = string;

/** The compute resources allocated to an Agent Fabric sandbox workload. */
export interface AgentFabricSandboxResources {
  /** The amount of CPU to allocate to the workload. */
  cpu: string;
  /** The amount of memory to allocate to the workload. */
  memory: string;
  /** The amount of disk to allocate to the workload. */
  disk?: string;
}

export function agentFabricSandboxResourcesSerializer(item: AgentFabricSandboxResources): any {
  return { cpu: item["cpu"], memory: item["memory"], disk: item["disk"] };
}

export function agentFabricSandboxResourcesDeserializer(item: any): AgentFabricSandboxResources {
  return {
    cpu: item["cpu"],
    memory: item["memory"],
    disk: item["disk"],
  };
}

export function agentFabricSandboxEndpointArraySerializer(
  result: Array<AgentFabricSandboxEndpoint>,
): any[] {
  return result.map((item) => {
    return agentFabricSandboxEndpointSerializer(item);
  });
}

export function agentFabricSandboxEndpointArrayDeserializer(
  result: Array<AgentFabricSandboxEndpoint>,
): any[] {
  return result.map((item) => {
    return agentFabricSandboxEndpointDeserializer(item);
  });
}

/** A network endpoint exposed by an Agent Fabric sandbox workload. */
export interface AgentFabricSandboxEndpoint {
  /** The name of the endpoint. */
  name: string;
  /** The port exposed by the service. */
  servicePort: number;
  /** The network protocol used by the endpoint. */
  protocol: string;
  /** The port on the workload targeted by the service. */
  targetPort: number;
}

export function agentFabricSandboxEndpointSerializer(item: AgentFabricSandboxEndpoint): any {
  return {
    name: item["name"],
    servicePort: item["servicePort"],
    protocol: item["protocol"],
    targetPort: item["targetPort"],
  };
}

export function agentFabricSandboxEndpointDeserializer(item: any): AgentFabricSandboxEndpoint {
  return {
    name: item["name"],
    servicePort: item["servicePort"],
    protocol: item["protocol"],
    targetPort: item["targetPort"],
  };
}

/** The type used for updating tags in Member resources. */
export interface MemberTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Member properties to update. */
  properties?: MemberUpdateProperties;
}

export function memberTagsUpdateSerializer(item: MemberTagsUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : memberUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The Member properties that can be updated. */
export interface MemberUpdateProperties {
  /** The customer-provided fully qualified domain name associated with the member. */
  fqdn?: string;
}

export function memberUpdatePropertiesSerializer(item: MemberUpdateProperties): any {
  return { fqdn: item["fqdn"] };
}

export function memberArraySerializer(result: Array<Member>): any[] {
  return result.map((item) => {
    return memberSerializer(item);
  });
}

export function memberArrayDeserializer(result: Array<Member>): any[] {
  return result.map((item) => {
    return memberDeserializer(item);
  });
}

/** PolicyGroup resource. */
export interface PolicyGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PolicyGroupProperties;
}

export function policyGroupSerializer(item: PolicyGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : policyGroupPropertiesSerializer(item["properties"]),
  };
}

export function policyGroupDeserializer(item: any): PolicyGroup {
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
      : policyGroupPropertiesDeserializer(item["properties"]),
  };
}

/** PolicyGroup properties. */
export interface PolicyGroupProperties {
  /** The display name of the policy group. */
  displayName?: string;
  /** The description of the policy group. */
  description?: string;
  /** The priority of the policy group. */
  priority?: number;
  /**
   * The list of network security policies. A PUT introducing a ContentInspection
   * policy is incompatible if any associated fabric has no configured inspection connection,
   * regardless of whether selectors currently match traffic. The request is rejected before
   * persisting or distributing the proposed changes, preserving the previously
   * accepted policies; mixed compatible and incompatible associations cannot partially apply
   * changes or silently skip inspection. An unattached group, or one attached only to compatible
   * fabrics, may contain ContentInspection policies. Removing ContentInspection policies remains allowed,
   * subject to other validation.
   */
  networkSecurityPolicies?: NetworkSecurityPolicyBaseUnion[];
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function policyGroupPropertiesSerializer(item: PolicyGroupProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    priority: item["priority"],
    networkSecurityPolicies: !item["networkSecurityPolicies"]
      ? item["networkSecurityPolicies"]
      : networkSecurityPolicyBaseUnionArraySerializer(item["networkSecurityPolicies"]),
  };
}

export function policyGroupPropertiesDeserializer(item: any): PolicyGroupProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    priority: item["priority"],
    networkSecurityPolicies: !item["networkSecurityPolicies"]
      ? item["networkSecurityPolicies"]
      : networkSecurityPolicyBaseUnionArrayDeserializer(item["networkSecurityPolicies"]),
    provisioningState: item["provisioningState"],
  };
}

export function networkSecurityPolicyBaseUnionArraySerializer(
  result: Array<NetworkSecurityPolicyBaseUnion>,
): any[] {
  return result.map((item) => {
    return networkSecurityPolicyBaseUnionSerializer(item);
  });
}

export function networkSecurityPolicyBaseUnionArrayDeserializer(
  result: Array<NetworkSecurityPolicyBaseUnion>,
): any[] {
  return result.map((item) => {
    return networkSecurityPolicyBaseUnionDeserializer(item);
  });
}

/** Base network security policy configuration. */
export interface NetworkSecurityPolicyBase {
  /** The network security policy type. */
  /** The discriminator possible values: FqdnFiltering, UrlFiltering, Mcp, TlsInspection, ContentInspection */
  type: NetworkSecurityPolicyType;
}

export function networkSecurityPolicyBaseSerializer(item: NetworkSecurityPolicyBase): any {
  return { type: item["type"] };
}

export function networkSecurityPolicyBaseDeserializer(item: any): NetworkSecurityPolicyBase {
  return {
    type: item["type"],
  };
}

/** Alias for NetworkSecurityPolicyBaseUnion */
export type NetworkSecurityPolicyBaseUnion =
  | FqdnFilteringPolicy
  | UrlFilteringPolicy
  | McpPolicy
  | TlsInspectionPolicy
  | ContentInspectionPolicy
  | NetworkSecurityPolicyBase;

export function networkSecurityPolicyBaseUnionSerializer(
  item: NetworkSecurityPolicyBaseUnion,
): any {
  switch (item.type) {
    case "FqdnFiltering":
      return fqdnFilteringPolicySerializer(item as FqdnFilteringPolicy);

    case "UrlFiltering":
      return urlFilteringPolicySerializer(item as UrlFilteringPolicy);

    case "Mcp":
      return mcpPolicySerializer(item as McpPolicy);

    case "TlsInspection":
      return tlsInspectionPolicySerializer(item as TlsInspectionPolicy);

    case "ContentInspection":
      return contentInspectionPolicySerializer(item as ContentInspectionPolicy);

    default:
      return networkSecurityPolicyBaseSerializer(item);
  }
}

export function networkSecurityPolicyBaseUnionDeserializer(
  item: any,
): NetworkSecurityPolicyBaseUnion {
  switch (item["type"]) {
    case "FqdnFiltering":
      return fqdnFilteringPolicyDeserializer(item as FqdnFilteringPolicy);

    case "UrlFiltering":
      return urlFilteringPolicyDeserializer(item as UrlFilteringPolicy);

    case "Mcp":
      return mcpPolicyDeserializer(item as McpPolicy);

    case "TlsInspection":
      return tlsInspectionPolicyDeserializer(item as TlsInspectionPolicy);

    case "ContentInspection":
      return contentInspectionPolicyDeserializer(item as ContentInspectionPolicy);

    default:
      return networkSecurityPolicyBaseDeserializer(item);
  }
}

/** The type of network security policy. */
export enum KnownNetworkSecurityPolicyType {
  /** FQDN filtering policy type. */
  FqdnFiltering = "FqdnFiltering",
  /** URL filtering policy type. */
  UrlFiltering = "UrlFiltering",
  /** MCP server policy type. */
  Mcp = "Mcp",
  /** TLS inspection policy type. */
  TlsInspection = "TlsInspection",
  /** Content inspection policy type. */
  ContentInspection = "ContentInspection",
}

/**
 * The type of network security policy. \
 * {@link KnownNetworkSecurityPolicyType} can be used interchangeably with NetworkSecurityPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FqdnFiltering**: FQDN filtering policy type. \
 * **UrlFiltering**: URL filtering policy type. \
 * **Mcp**: MCP server policy type. \
 * **TlsInspection**: TLS inspection policy type. \
 * **ContentInspection**: Content inspection policy type.
 */
export type NetworkSecurityPolicyType = string;

/** FQDN filtering network security policy. */
export interface FqdnFilteringPolicy extends NetworkSecurityPolicyBase {
  /** The network security policy type. */
  type: "FqdnFiltering";
  /** The name of the policy. */
  name?: string;
  /** The priority of the policy. */
  priority?: number;
  /** The direction of traffic for the policy. */
  direction?: PolicyDirection;
  /** The ports for the policy. */
  ports?: number[];
  /** The source details for the policy. */
  source: FqdnFilteringSourceUnion;
  /** The destination details for the policy. */
  destination?: FqdnFilteringDestinationUnion;
}

export function fqdnFilteringPolicySerializer(item: FqdnFilteringPolicy): any {
  return {
    type: item["type"],
    name: item["name"],
    priority: item["priority"],
    direction: item["direction"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    source: fqdnFilteringSourceUnionSerializer(item["source"]),
    destination: !item["destination"]
      ? item["destination"]
      : fqdnFilteringDestinationUnionSerializer(item["destination"]),
  };
}

export function fqdnFilteringPolicyDeserializer(item: any): FqdnFilteringPolicy {
  return {
    type: item["type"],
    name: item["name"],
    priority: item["priority"],
    direction: item["direction"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
    source: fqdnFilteringSourceUnionDeserializer(item["source"]),
    destination: !item["destination"]
      ? item["destination"]
      : fqdnFilteringDestinationUnionDeserializer(item["destination"]),
  };
}

/** The direction of network traffic for a policy. */
export enum KnownPolicyDirection {
  /** Outbound traffic only. */
  Outbound = "Outbound",
  /** Inbound traffic only. */
  Inbound = "Inbound",
  /** Both inbound and outbound traffic. */
  Both = "Both",
}

/**
 * The direction of network traffic for a policy. \
 * {@link KnownPolicyDirection} can be used interchangeably with PolicyDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Outbound**: Outbound traffic only. \
 * **Inbound**: Inbound traffic only. \
 * **Both**: Both inbound and outbound traffic.
 */
export type PolicyDirection = string;

/** Selects the source(s) that an FQDN filtering policy applies to. */
export interface FqdnFilteringSource {
  /** The type of source selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes */
  type: FqdnFilteringSourceType;
}

export function fqdnFilteringSourceSerializer(item: FqdnFilteringSource): any {
  return { type: item["type"] };
}

export function fqdnFilteringSourceDeserializer(item: any): FqdnFilteringSource {
  return {
    type: item["type"],
  };
}

/** Alias for FqdnFilteringSourceUnion */
export type FqdnFilteringSourceUnion =
  FqdnFilteringWorkloadIdPatternsSource | FqdnFilteringAddressPrefixesSource | FqdnFilteringSource;

export function fqdnFilteringSourceUnionSerializer(item: FqdnFilteringSourceUnion): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return fqdnFilteringWorkloadIdPatternsSourceSerializer(
        item as FqdnFilteringWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return fqdnFilteringAddressPrefixesSourceSerializer(
        item as FqdnFilteringAddressPrefixesSource,
      );

    default:
      return fqdnFilteringSourceSerializer(item);
  }
}

export function fqdnFilteringSourceUnionDeserializer(item: any): FqdnFilteringSourceUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return fqdnFilteringWorkloadIdPatternsSourceDeserializer(
        item as FqdnFilteringWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return fqdnFilteringAddressPrefixesSourceDeserializer(
        item as FqdnFilteringAddressPrefixesSource,
      );

    default:
      return fqdnFilteringSourceDeserializer(item);
  }
}

/** The type of source selector for an FQDN filtering policy. */
export enum KnownFqdnFilteringSourceType {
  /** Select sources by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select sources by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
}

/**
 * The type of source selector for an FQDN filtering policy. \
 * {@link KnownFqdnFilteringSourceType} can be used interchangeably with FqdnFilteringSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select sources by workload ID patterns. \
 * **AddressPrefixes**: Select sources by IP address prefixes in CIDR notation.
 */
export type FqdnFilteringSourceType = string;

/** Selects FQDN filtering sources by workload ID patterns. */
export interface FqdnFilteringWorkloadIdPatternsSource extends FqdnFilteringSource {
  /** The type of source selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the source(s). */
  patterns: string[];
}

export function fqdnFilteringWorkloadIdPatternsSourceSerializer(
  item: FqdnFilteringWorkloadIdPatternsSource,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function fqdnFilteringWorkloadIdPatternsSourceDeserializer(
  item: any,
): FqdnFilteringWorkloadIdPatternsSource {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects FQDN filtering sources by IP address prefixes. */
export interface FqdnFilteringAddressPrefixesSource extends FqdnFilteringSource {
  /** The type of source selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the source(s). */
  prefixes: string[];
}

export function fqdnFilteringAddressPrefixesSourceSerializer(
  item: FqdnFilteringAddressPrefixesSource,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function fqdnFilteringAddressPrefixesSourceDeserializer(
  item: any,
): FqdnFilteringAddressPrefixesSource {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects the destination(s) that an FQDN filtering policy applies to. */
export interface FqdnFilteringDestination {
  /** The type of destination selector. */
  /** The discriminator possible values: Fqdns */
  type: FqdnFilteringDestinationType;
}

export function fqdnFilteringDestinationSerializer(item: FqdnFilteringDestination): any {
  return { type: item["type"] };
}

export function fqdnFilteringDestinationDeserializer(item: any): FqdnFilteringDestination {
  return {
    type: item["type"],
  };
}

/** Alias for FqdnFilteringDestinationUnion */
export type FqdnFilteringDestinationUnion =
  FqdnFilteringFqdnsDestination | FqdnFilteringDestination;

export function fqdnFilteringDestinationUnionSerializer(item: FqdnFilteringDestinationUnion): any {
  switch (item.type) {
    case "Fqdns":
      return fqdnFilteringFqdnsDestinationSerializer(item as FqdnFilteringFqdnsDestination);

    default:
      return fqdnFilteringDestinationSerializer(item);
  }
}

export function fqdnFilteringDestinationUnionDeserializer(
  item: any,
): FqdnFilteringDestinationUnion {
  switch (item["type"]) {
    case "Fqdns":
      return fqdnFilteringFqdnsDestinationDeserializer(item as FqdnFilteringFqdnsDestination);

    default:
      return fqdnFilteringDestinationDeserializer(item);
  }
}

/** The type of destination selector for an FQDN filtering policy. */
export enum KnownFqdnFilteringDestinationType {
  /** Select destinations by fully qualified domain names. */
  Fqdns = "Fqdns",
}

/**
 * The type of destination selector for an FQDN filtering policy. \
 * {@link KnownFqdnFilteringDestinationType} can be used interchangeably with FqdnFilteringDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fqdns**: Select destinations by fully qualified domain names.
 */
export type FqdnFilteringDestinationType = string;

/** Selects FQDN filtering destinations by fully qualified domain names. */
export interface FqdnFilteringFqdnsDestination extends FqdnFilteringDestination {
  /** The type of destination selector. */
  type: "Fqdns";
  /** The fully qualified domain names that identify the destination(s). */
  fqdns: string[];
}

export function fqdnFilteringFqdnsDestinationSerializer(item: FqdnFilteringFqdnsDestination): any {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function fqdnFilteringFqdnsDestinationDeserializer(
  item: any,
): FqdnFilteringFqdnsDestination {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

/** URL filtering network security policy. */
export interface UrlFilteringPolicy extends NetworkSecurityPolicyBase {
  /** The network security policy type. */
  type: "UrlFiltering";
  /**
   * The action for a request to a host that one of the policy's rules names when no rule matches,
   * and the action of a rule that has none. Requests to other hosts are not decided by this policy.
   */
  defaultAction: PolicyAction;
  /** The source details for the policy. */
  source: UrlFilteringSourceUnion;
  /** The destination details for the policy. */
  destination?: UrlFilteringDestinationUnion;
  /**
   * The list of URL filtering rules. Service validation may limit rules-based policies to 1 to 5
   * rules; the schema retains the earlier array shape for compatibility. Rules are evaluated in
   * ascending priority order and the first matching rule decides; rule priorities must be unique
   * within the policy. A rule without an action uses the policy defaultAction. When no rule matches
   * a request to a host that a rule names, the policy defaultAction applies. Requests to other
   * hosts are not decided by this policy.
   */
  rules: UrlFilteringRule[];
}

export function urlFilteringPolicySerializer(item: UrlFilteringPolicy): any {
  return {
    type: item["type"],
    defaultAction: item["defaultAction"],
    source: urlFilteringSourceUnionSerializer(item["source"]),
    destination: !item["destination"]
      ? item["destination"]
      : urlFilteringDestinationUnionSerializer(item["destination"]),
    rules: urlFilteringRuleArraySerializer(item["rules"]),
  };
}

export function urlFilteringPolicyDeserializer(item: any): UrlFilteringPolicy {
  return {
    type: item["type"],
    defaultAction: item["defaultAction"],
    source: urlFilteringSourceUnionDeserializer(item["source"]),
    destination: !item["destination"]
      ? item["destination"]
      : urlFilteringDestinationUnionDeserializer(item["destination"]),
    rules: urlFilteringRuleArrayDeserializer(item["rules"]),
  };
}

/** The action to take when a network security policy or rule matches traffic. */
export enum KnownPolicyAction {
  /** Allow the matching traffic. */
  Allow = "Allow",
  /** Deny the matching traffic. */
  Deny = "Deny",
}

/**
 * The action to take when a network security policy or rule matches traffic. \
 * {@link KnownPolicyAction} can be used interchangeably with PolicyAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow the matching traffic. \
 * **Deny**: Deny the matching traffic.
 */
export type PolicyAction = string;

/** Selects the source(s) that a URL filtering policy applies to. */
export interface UrlFilteringSource {
  /** The type of source selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes */
  type: UrlFilteringSourceType;
}

export function urlFilteringSourceSerializer(item: UrlFilteringSource): any {
  return { type: item["type"] };
}

export function urlFilteringSourceDeserializer(item: any): UrlFilteringSource {
  return {
    type: item["type"],
  };
}

/** Alias for UrlFilteringSourceUnion */
export type UrlFilteringSourceUnion =
  UrlFilteringWorkloadIdPatternsSource | UrlFilteringAddressPrefixesSource | UrlFilteringSource;

export function urlFilteringSourceUnionSerializer(item: UrlFilteringSourceUnion): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return urlFilteringWorkloadIdPatternsSourceSerializer(
        item as UrlFilteringWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return urlFilteringAddressPrefixesSourceSerializer(item as UrlFilteringAddressPrefixesSource);

    default:
      return urlFilteringSourceSerializer(item);
  }
}

export function urlFilteringSourceUnionDeserializer(item: any): UrlFilteringSourceUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return urlFilteringWorkloadIdPatternsSourceDeserializer(
        item as UrlFilteringWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return urlFilteringAddressPrefixesSourceDeserializer(
        item as UrlFilteringAddressPrefixesSource,
      );

    default:
      return urlFilteringSourceDeserializer(item);
  }
}

/** The type of source selector for a URL filtering policy. */
export enum KnownUrlFilteringSourceType {
  /** Select sources by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select sources by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
}

/**
 * The type of source selector for a URL filtering policy. \
 * {@link KnownUrlFilteringSourceType} can be used interchangeably with UrlFilteringSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select sources by workload ID patterns. \
 * **AddressPrefixes**: Select sources by IP address prefixes in CIDR notation.
 */
export type UrlFilteringSourceType = string;

/** Selects URL filtering sources by workload ID patterns. */
export interface UrlFilteringWorkloadIdPatternsSource extends UrlFilteringSource {
  /** The type of source selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the source(s). */
  patterns: string[];
}

export function urlFilteringWorkloadIdPatternsSourceSerializer(
  item: UrlFilteringWorkloadIdPatternsSource,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringWorkloadIdPatternsSourceDeserializer(
  item: any,
): UrlFilteringWorkloadIdPatternsSource {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects URL filtering sources by IP address prefixes. */
export interface UrlFilteringAddressPrefixesSource extends UrlFilteringSource {
  /** The type of source selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the source(s). */
  prefixes: string[];
}

export function urlFilteringAddressPrefixesSourceSerializer(
  item: UrlFilteringAddressPrefixesSource,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringAddressPrefixesSourceDeserializer(
  item: any,
): UrlFilteringAddressPrefixesSource {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects the destination(s) that a URL filtering policy applies to. */
export interface UrlFilteringDestination {
  /** The type of destination selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes, Fqdns */
  type: UrlFilteringDestinationType;
}

export function urlFilteringDestinationSerializer(item: UrlFilteringDestination): any {
  return { type: item["type"] };
}

export function urlFilteringDestinationDeserializer(item: any): UrlFilteringDestination {
  return {
    type: item["type"],
  };
}

/** Alias for UrlFilteringDestinationUnion */
export type UrlFilteringDestinationUnion =
  | UrlFilteringWorkloadIdPatternsDestination
  | UrlFilteringAddressPrefixesDestination
  | UrlFilteringFqdnsDestination
  | UrlFilteringDestination;

export function urlFilteringDestinationUnionSerializer(item: UrlFilteringDestinationUnion): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return urlFilteringWorkloadIdPatternsDestinationSerializer(
        item as UrlFilteringWorkloadIdPatternsDestination,
      );

    case "AddressPrefixes":
      return urlFilteringAddressPrefixesDestinationSerializer(
        item as UrlFilteringAddressPrefixesDestination,
      );

    case "Fqdns":
      return urlFilteringFqdnsDestinationSerializer(item as UrlFilteringFqdnsDestination);

    default:
      return urlFilteringDestinationSerializer(item);
  }
}

export function urlFilteringDestinationUnionDeserializer(item: any): UrlFilteringDestinationUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return urlFilteringWorkloadIdPatternsDestinationDeserializer(
        item as UrlFilteringWorkloadIdPatternsDestination,
      );

    case "AddressPrefixes":
      return urlFilteringAddressPrefixesDestinationDeserializer(
        item as UrlFilteringAddressPrefixesDestination,
      );

    case "Fqdns":
      return urlFilteringFqdnsDestinationDeserializer(item as UrlFilteringFqdnsDestination);

    default:
      return urlFilteringDestinationDeserializer(item);
  }
}

/** The type of destination selector for a URL filtering policy. */
export enum KnownUrlFilteringDestinationType {
  /** Select destinations by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select destinations by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
  /** Deprecated. Select destinations by fully qualified domain names; use rule hostname for new configurations. */
  Fqdns = "Fqdns",
}

/**
 * The type of destination selector for a URL filtering policy. \
 * {@link KnownUrlFilteringDestinationType} can be used interchangeably with UrlFilteringDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select destinations by workload ID patterns. \
 * **AddressPrefixes**: Select destinations by IP address prefixes in CIDR notation. \
 * **Fqdns**: Deprecated. Select destinations by fully qualified domain names; use rule hostname for new configurations.
 */
export type UrlFilteringDestinationType = string;

/** Selects URL filtering destinations by workload ID patterns. */
export interface UrlFilteringWorkloadIdPatternsDestination extends UrlFilteringDestination {
  /** The type of destination selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the destination(s). */
  patterns: string[];
}

export function urlFilteringWorkloadIdPatternsDestinationSerializer(
  item: UrlFilteringWorkloadIdPatternsDestination,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringWorkloadIdPatternsDestinationDeserializer(
  item: any,
): UrlFilteringWorkloadIdPatternsDestination {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects URL filtering destinations by IP address prefixes. */
export interface UrlFilteringAddressPrefixesDestination extends UrlFilteringDestination {
  /** The type of destination selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the destination(s). */
  prefixes: string[];
}

export function urlFilteringAddressPrefixesDestinationSerializer(
  item: UrlFilteringAddressPrefixesDestination,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringAddressPrefixesDestinationDeserializer(
  item: any,
): UrlFilteringAddressPrefixesDestination {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects URL filtering destinations by fully qualified domain names. */
export interface UrlFilteringFqdnsDestination extends UrlFilteringDestination {
  /** The type of destination selector. */
  type: "Fqdns";
  /** The fully qualified domain names that identify the destination(s). */
  fqdns: string[];
}

export function urlFilteringFqdnsDestinationSerializer(item: UrlFilteringFqdnsDestination): any {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringFqdnsDestinationDeserializer(item: any): UrlFilteringFqdnsDestination {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function urlFilteringRuleArraySerializer(result: Array<UrlFilteringRule>): any[] {
  return result.map((item) => {
    return urlFilteringRuleSerializer(item);
  });
}

export function urlFilteringRuleArrayDeserializer(result: Array<UrlFilteringRule>): any[] {
  return result.map((item) => {
    return urlFilteringRuleDeserializer(item);
  });
}

/** A single rule within a URL filtering policy. */
export interface UrlFilteringRule {
  /** The name of the rule. */
  name: string;
  /** The priority of the rule. Rules are evaluated in ascending priority order. */
  priority: number;
  /**
   * The hostname matched by the rule, such as api.contoso.com or *.contoso.com, with no scheme,
   * port or path. Optional in the schema for compatibility; specify it for rules-based authoring.
   */
  hostname?: string;
  /** The HTTP method matched by the rule. If omitted, the rule matches any method. */
  method?: HttpMethod;
  /** The URL paths matched by the rule. If omitted, the rule matches any path. */
  paths?: string[];
  /** The action to take when the rule matches. If omitted, the rule uses the policy defaultAction. */
  action?: PolicyAction;
}

export function urlFilteringRuleSerializer(item: UrlFilteringRule): any {
  return {
    name: item["name"],
    priority: item["priority"],
    hostname: item["hostname"],
    method: item["method"],
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
    action: item["action"],
  };
}

export function urlFilteringRuleDeserializer(item: any): UrlFilteringRule {
  return {
    name: item["name"],
    priority: item["priority"],
    hostname: item["hostname"],
    method: item["method"],
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
    action: item["action"],
  };
}

/** The HTTP method matched by a URL filtering rule. */
export enum KnownHttpMethod {
  /** HTTP GET method. */
  Get = "GET",
  /** HTTP POST method. */
  Post = "POST",
  /** HTTP PUT method. */
  Put = "PUT",
  /** HTTP DELETE method. */
  Delete = "DELETE",
  /** HTTP PATCH method. */
  Patch = "PATCH",
  /** HTTP HEAD method. */
  Head = "HEAD",
  /** HTTP OPTIONS method. */
  Options = "OPTIONS",
}

/**
 * The HTTP method matched by a URL filtering rule. \
 * {@link KnownHttpMethod} can be used interchangeably with HttpMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GET**: HTTP GET method. \
 * **POST**: HTTP POST method. \
 * **PUT**: HTTP PUT method. \
 * **DELETE**: HTTP DELETE method. \
 * **PATCH**: HTTP PATCH method. \
 * **HEAD**: HTTP HEAD method. \
 * **OPTIONS**: HTTP OPTIONS method.
 */
export type HttpMethod = string;

/** MCP server network security policy. */
export interface McpPolicy extends NetworkSecurityPolicyBase {
  /** The network security policy type. */
  type: "Mcp";
  /** The default action to take when no rule in the policy matches. */
  defaultAction: PolicyAction;
  /** The source(s) that this policy applies to. */
  source: McpPolicySourceUnion;
  /** The MCP server(s) that this policy applies to. */
  destination: McpPolicyDestinationUnion;
  /** The list of MCP rules. */
  rules: McpRule[];
}

export function mcpPolicySerializer(item: McpPolicy): any {
  return {
    type: item["type"],
    defaultAction: item["defaultAction"],
    source: mcpPolicySourceUnionSerializer(item["source"]),
    destination: mcpPolicyDestinationUnionSerializer(item["destination"]),
    rules: mcpRuleArraySerializer(item["rules"]),
  };
}

export function mcpPolicyDeserializer(item: any): McpPolicy {
  return {
    type: item["type"],
    defaultAction: item["defaultAction"],
    source: mcpPolicySourceUnionDeserializer(item["source"]),
    destination: mcpPolicyDestinationUnionDeserializer(item["destination"]),
    rules: mcpRuleArrayDeserializer(item["rules"]),
  };
}

/** Selects the source(s) that an MCP policy applies to. */
export interface McpPolicySource {
  /** The type of source selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes */
  type: McpPolicySourceType;
}

export function mcpPolicySourceSerializer(item: McpPolicySource): any {
  return { type: item["type"] };
}

export function mcpPolicySourceDeserializer(item: any): McpPolicySource {
  return {
    type: item["type"],
  };
}

/** Alias for McpPolicySourceUnion */
export type McpPolicySourceUnion =
  McpPolicyWorkloadIdPatternsSource | McpPolicyAddressPrefixesSource | McpPolicySource;

export function mcpPolicySourceUnionSerializer(item: McpPolicySourceUnion): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return mcpPolicyWorkloadIdPatternsSourceSerializer(item as McpPolicyWorkloadIdPatternsSource);

    case "AddressPrefixes":
      return mcpPolicyAddressPrefixesSourceSerializer(item as McpPolicyAddressPrefixesSource);

    default:
      return mcpPolicySourceSerializer(item);
  }
}

export function mcpPolicySourceUnionDeserializer(item: any): McpPolicySourceUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return mcpPolicyWorkloadIdPatternsSourceDeserializer(
        item as McpPolicyWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return mcpPolicyAddressPrefixesSourceDeserializer(item as McpPolicyAddressPrefixesSource);

    default:
      return mcpPolicySourceDeserializer(item);
  }
}

/** The type of source selector for an MCP policy. */
export enum KnownMcpPolicySourceType {
  /** Select sources by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select sources by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
}

/**
 * The type of source selector for an MCP policy. \
 * {@link KnownMcpPolicySourceType} can be used interchangeably with McpPolicySourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select sources by workload ID patterns. \
 * **AddressPrefixes**: Select sources by IP address prefixes in CIDR notation.
 */
export type McpPolicySourceType = string;

/** Selects MCP policy sources by workload ID patterns. */
export interface McpPolicyWorkloadIdPatternsSource extends McpPolicySource {
  /** The type of source selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the source(s). */
  patterns: string[];
}

export function mcpPolicyWorkloadIdPatternsSourceSerializer(
  item: McpPolicyWorkloadIdPatternsSource,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpPolicyWorkloadIdPatternsSourceDeserializer(
  item: any,
): McpPolicyWorkloadIdPatternsSource {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects MCP policy sources by IP address prefixes. */
export interface McpPolicyAddressPrefixesSource extends McpPolicySource {
  /** The type of source selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the source(s). */
  prefixes: string[];
}

export function mcpPolicyAddressPrefixesSourceSerializer(
  item: McpPolicyAddressPrefixesSource,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpPolicyAddressPrefixesSourceDeserializer(
  item: any,
): McpPolicyAddressPrefixesSource {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects the MCP server(s) that an MCP policy applies to. */
export interface McpPolicyDestination {
  /** The type of destination selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes, Fqdns */
  type: McpPolicyDestinationType;
}

export function mcpPolicyDestinationSerializer(item: McpPolicyDestination): any {
  return { type: item["type"] };
}

export function mcpPolicyDestinationDeserializer(item: any): McpPolicyDestination {
  return {
    type: item["type"],
  };
}

/** Alias for McpPolicyDestinationUnion */
export type McpPolicyDestinationUnion =
  | McpPolicyWorkloadIdPatternsDestination
  | McpPolicyAddressPrefixesDestination
  | McpPolicyFqdnsDestination
  | McpPolicyDestination;

export function mcpPolicyDestinationUnionSerializer(item: McpPolicyDestinationUnion): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return mcpPolicyWorkloadIdPatternsDestinationSerializer(
        item as McpPolicyWorkloadIdPatternsDestination,
      );

    case "AddressPrefixes":
      return mcpPolicyAddressPrefixesDestinationSerializer(
        item as McpPolicyAddressPrefixesDestination,
      );

    case "Fqdns":
      return mcpPolicyFqdnsDestinationSerializer(item as McpPolicyFqdnsDestination);

    default:
      return mcpPolicyDestinationSerializer(item);
  }
}

export function mcpPolicyDestinationUnionDeserializer(item: any): McpPolicyDestinationUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return mcpPolicyWorkloadIdPatternsDestinationDeserializer(
        item as McpPolicyWorkloadIdPatternsDestination,
      );

    case "AddressPrefixes":
      return mcpPolicyAddressPrefixesDestinationDeserializer(
        item as McpPolicyAddressPrefixesDestination,
      );

    case "Fqdns":
      return mcpPolicyFqdnsDestinationDeserializer(item as McpPolicyFqdnsDestination);

    default:
      return mcpPolicyDestinationDeserializer(item);
  }
}

/** The type of destination selector for an MCP policy. */
export enum KnownMcpPolicyDestinationType {
  /** Select destinations by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select destinations by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
  /** Select destinations by fully qualified domain names. */
  Fqdns = "Fqdns",
}

/**
 * The type of destination selector for an MCP policy. \
 * {@link KnownMcpPolicyDestinationType} can be used interchangeably with McpPolicyDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select destinations by workload ID patterns. \
 * **AddressPrefixes**: Select destinations by IP address prefixes in CIDR notation. \
 * **Fqdns**: Select destinations by fully qualified domain names.
 */
export type McpPolicyDestinationType = string;

/** Selects MCP policy destinations by workload ID patterns. */
export interface McpPolicyWorkloadIdPatternsDestination extends McpPolicyDestination {
  /** The type of destination selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the destination(s). */
  patterns: string[];
}

export function mcpPolicyWorkloadIdPatternsDestinationSerializer(
  item: McpPolicyWorkloadIdPatternsDestination,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpPolicyWorkloadIdPatternsDestinationDeserializer(
  item: any,
): McpPolicyWorkloadIdPatternsDestination {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects MCP policy destinations by IP address prefixes. */
export interface McpPolicyAddressPrefixesDestination extends McpPolicyDestination {
  /** The type of destination selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the destination(s). */
  prefixes: string[];
}

export function mcpPolicyAddressPrefixesDestinationSerializer(
  item: McpPolicyAddressPrefixesDestination,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpPolicyAddressPrefixesDestinationDeserializer(
  item: any,
): McpPolicyAddressPrefixesDestination {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects MCP policy destinations by fully qualified domain names. */
export interface McpPolicyFqdnsDestination extends McpPolicyDestination {
  /** The type of destination selector. */
  type: "Fqdns";
  /** The fully qualified domain names that identify the destination(s). */
  fqdns: string[];
}

export function mcpPolicyFqdnsDestinationSerializer(item: McpPolicyFqdnsDestination): any {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpPolicyFqdnsDestinationDeserializer(item: any): McpPolicyFqdnsDestination {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function mcpRuleArraySerializer(result: Array<McpRule>): any[] {
  return result.map((item) => {
    return mcpRuleSerializer(item);
  });
}

export function mcpRuleArrayDeserializer(result: Array<McpRule>): any[] {
  return result.map((item) => {
    return mcpRuleDeserializer(item);
  });
}

/** A single rule within an MCP policy. */
export interface McpRule {
  /**
   * The name of the rule: 1 to 63 ASCII letters, digits, '_', '.' or '-', starting with a
   * letter or digit, and unique within the policy ignoring case. Flow logs report the rule
   * that decided as `mcp-<n>/<name>`.
   */
  name?: string;
  /**
   * The priority of the rule, unique within the policy. Rules are tried from the lowest value
   * and the first rule that matches decides; a policy has 1 to 5 rules. When none
   * matches, defaultAction applies to every MCP request except session requests (initialize,
   * ping, notifications, the list methods, JSON-RPC responses, and requests with no body such
   * as GET and DELETE), which pass.
   */
  priority?: number;
  /** The action to take for the specified MCP tools. */
  action?: PolicyAction;
  /** Deprecated. Legacy MCP tool names retained for compatibility; use matchingConditions.destinations.toolMatching.names for new rules. */
  tools?: string[];
  /** The conditions of the rule. A rule without an action uses defaultAction. */
  matchingConditions?: McpRuleMatchingConditions;
}

export function mcpRuleSerializer(item: McpRule): any {
  return {
    name: item["name"],
    priority: item["priority"],
    action: item["action"],
    tools: !item["tools"]
      ? item["tools"]
      : item["tools"].map((p: any) => {
          return p;
        }),
    matchingConditions: !item["matchingConditions"]
      ? item["matchingConditions"]
      : mcpRuleMatchingConditionsSerializer(item["matchingConditions"]),
  };
}

export function mcpRuleDeserializer(item: any): McpRule {
  return {
    name: item["name"],
    priority: item["priority"],
    action: item["action"],
    tools: !item["tools"]
      ? item["tools"]
      : item["tools"].map((p: any) => {
          return p;
        }),
    matchingConditions: !item["matchingConditions"]
      ? item["matchingConditions"]
      : mcpRuleMatchingConditionsDeserializer(item["matchingConditions"]),
  };
}

/** The conditions of an MCP rule. The rule applies to the sources of its policy. */
export interface McpRuleMatchingConditions {
  /** The servers and requests the rule matches. */
  destinations: McpRuleDestinationMatching;
}

export function mcpRuleMatchingConditionsSerializer(item: McpRuleMatchingConditions): any {
  return { destinations: mcpRuleDestinationMatchingSerializer(item["destinations"]) };
}

export function mcpRuleMatchingConditionsDeserializer(item: any): McpRuleMatchingConditions {
  return {
    destinations: mcpRuleDestinationMatchingDeserializer(item["destinations"]),
  };
}

/**
 * The MCP servers and requests an MCP rule matches. Present properties are ANDed. A rule has
 * at most one of toolMatching and promptMatching. Without either, it matches every request to
 * its servers.
 */
export interface McpRuleDestinationMatching {
  /**
   * The MCP servers: exact names or one leading `*.`, each inside the policy destination.
   * Omitted means every server of the policy destination.
   */
  serverFqdns?: string[];
  /**
   * Compared with params.protocolVersion of an initialize request, the protocol version such as
   * 2025-06-18 that a client names when it starts a session. A request that names no protocol
   * version does not match the rule, so a Deny rule blocks sessions that start with a listed version.
   */
  protocolVersions?: McpStringMatching;
  /** Conditions on tool requests. */
  toolMatching?: McpToolMatching;
  /** Conditions on prompt requests. */
  promptMatching?: McpPromptMatching;
}

export function mcpRuleDestinationMatchingSerializer(item: McpRuleDestinationMatching): any {
  return {
    serverFqdns: !item["serverFqdns"]
      ? item["serverFqdns"]
      : item["serverFqdns"].map((p: any) => {
          return p;
        }),
    protocolVersions: !item["protocolVersions"]
      ? item["protocolVersions"]
      : mcpStringMatchingSerializer(item["protocolVersions"]),
    toolMatching: !item["toolMatching"]
      ? item["toolMatching"]
      : mcpToolMatchingSerializer(item["toolMatching"]),
    promptMatching: !item["promptMatching"]
      ? item["promptMatching"]
      : mcpPromptMatchingSerializer(item["promptMatching"]),
  };
}

export function mcpRuleDestinationMatchingDeserializer(item: any): McpRuleDestinationMatching {
  return {
    serverFqdns: !item["serverFqdns"]
      ? item["serverFqdns"]
      : item["serverFqdns"].map((p: any) => {
          return p;
        }),
    protocolVersions: !item["protocolVersions"]
      ? item["protocolVersions"]
      : mcpStringMatchingDeserializer(item["protocolVersions"]),
    toolMatching: !item["toolMatching"]
      ? item["toolMatching"]
      : mcpToolMatchingDeserializer(item["toolMatching"]),
    promptMatching: !item["promptMatching"]
      ? item["promptMatching"]
      : mcpPromptMatchingDeserializer(item["promptMatching"]),
  };
}

/**
 * Compares one string of an MCP request or response with a list of values. ExactMatch and
 * Contains hold when one value matches; NotExactMatch and NotContains hold when no value matches.
 */
export interface McpStringMatching {
  /** The values to compare with: 1 to 64, or 1 to 16 non-empty values for Contains and NotContains. */
  values: string[];
  /** How the string is compared with the values. */
  matchType: McpMatchType;
  /** Whether the comparison is case-sensitive. The default is CaseSensitive. */
  matchCase?: McpMatchCase;
}

export function mcpStringMatchingSerializer(item: McpStringMatching): any {
  return {
    values: item["values"].map((p: any) => {
      return p;
    }),
    matchType: item["matchType"],
    matchCase: item["matchCase"],
  };
}

export function mcpStringMatchingDeserializer(item: any): McpStringMatching {
  return {
    values: item["values"].map((p: any) => {
      return p;
    }),
    matchType: item["matchType"],
    matchCase: item["matchCase"],
  };
}

/** How an MCP string condition compares a request or response string with its values. */
export enum KnownMcpMatchType {
  /** The string equals one of the values. */
  ExactMatch = "ExactMatch",
  /** The string contains one of the values. */
  Contains = "Contains",
  /** The string equals none of the values. */
  NotExactMatch = "NotExactMatch",
  /** The string contains none of the values. */
  NotContains = "NotContains",
}

/**
 * How an MCP string condition compares a request or response string with its values. \
 * {@link KnownMcpMatchType} can be used interchangeably with McpMatchType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExactMatch**: The string equals one of the values. \
 * **Contains**: The string contains one of the values. \
 * **NotExactMatch**: The string equals none of the values. \
 * **NotContains**: The string contains none of the values.
 */
export type McpMatchType = string;

/** Whether an MCP string condition compares case-sensitively. */
export enum KnownMcpMatchCase {
  /** Compare strings exactly. This is the default. */
  CaseSensitive = "CaseSensitive",
  /** Compare strings after case folding both sides: uppercase, then lowercase. */
  CaseInsensitive = "CaseInsensitive",
}

/**
 * Whether an MCP string condition compares case-sensitively. \
 * {@link KnownMcpMatchCase} can be used interchangeably with McpMatchCase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CaseSensitive**: Compare strings exactly. This is the default. \
 * **CaseInsensitive**: Compare strings after case folding both sides: uppercase, then lowercase.
 */
export type McpMatchCase = string;

/** The tool conditions of an MCP rule. Present properties are ANDed. */
export interface McpToolMatching {
  /**
   * The tool methods to match. Omitted means Call. Names and callArguments need Call alone.
   * Titles and descriptions need List alone.
   */
  methods?: McpToolMethod[];
  /** Compared with the tool name of a tools/call request. */
  names?: McpStringMatching;
  /** Compared with the title of each tool in a tools/list response. Needs methods List alone. */
  titles?: McpStringMatching;
  /** Compared with the description of each tool in a tools/list response. Needs methods List alone. */
  descriptions?: McpStringMatching;
  /** Compared with the arguments of a tools/call request. */
  callArguments?: McpArgumentMatching;
  /** Compared with the text of each content item, result.content[].text, of a tools/call response. */
  responseContents?: McpStringMatching;
}

export function mcpToolMatchingSerializer(item: McpToolMatching): any {
  return {
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    names: !item["names"] ? item["names"] : mcpStringMatchingSerializer(item["names"]),
    titles: !item["titles"] ? item["titles"] : mcpStringMatchingSerializer(item["titles"]),
    descriptions: !item["descriptions"]
      ? item["descriptions"]
      : mcpStringMatchingSerializer(item["descriptions"]),
    callArguments: !item["callArguments"]
      ? item["callArguments"]
      : mcpArgumentMatchingSerializer(item["callArguments"]),
    responseContents: !item["responseContents"]
      ? item["responseContents"]
      : mcpStringMatchingSerializer(item["responseContents"]),
  };
}

export function mcpToolMatchingDeserializer(item: any): McpToolMatching {
  return {
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    names: !item["names"] ? item["names"] : mcpStringMatchingDeserializer(item["names"]),
    titles: !item["titles"] ? item["titles"] : mcpStringMatchingDeserializer(item["titles"]),
    descriptions: !item["descriptions"]
      ? item["descriptions"]
      : mcpStringMatchingDeserializer(item["descriptions"]),
    callArguments: !item["callArguments"]
      ? item["callArguments"]
      : mcpArgumentMatchingDeserializer(item["callArguments"]),
    responseContents: !item["responseContents"]
      ? item["responseContents"]
      : mcpStringMatchingDeserializer(item["responseContents"]),
  };
}

/** An MCP tool request method. */
export enum KnownMcpToolMethod {
  /** The tools/call request. */
  Call = "Call",
  /** The tools/list request. */
  List = "List",
}

/**
 * An MCP tool request method. \
 * {@link KnownMcpToolMethod} can be used interchangeably with McpToolMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Call**: The tools\/call request. \
 * **List**: The tools\/list request.
 */
export type McpToolMethod = string;

/**
 * Compares the argument values of an MCP request with a list of values. Only string values
 * are compared, and a boolean compares as true or false. Without a path, object keys are
 * compared too.
 */
export interface McpArgumentMatching {
  /** The values to compare with: 1 to 64, or 1 to 16 non-empty values for Contains and NotContains. */
  values: string[];
  /** How the string is compared with the values. */
  matchType: McpMatchType;
  /** Whether the comparison is case-sensitive. The default is CaseSensitive. */
  matchCase?: McpMatchCase;
  /**
   * A JSONPath into the request's params.arguments object, which is `$`: 1 to 8 segments,
   * the first `.name` and the others `.name` or `[*]` (at most once), for example
   * `$.repoName` or `$.paths[*]`. With a path, a missing key (also in an array element), a key
   * that differs only in case, or a value of the wrong type on the way is a mismatch: an Allow
   * condition holds only when there is none and every selected value passes, and a Deny
   * condition also holds when there is one, when the path selects nothing, or when a selected
   * value is not a string or boolean. Without a path every string or boolean argument value and
   * every object key is compared; this is allowed only for ExactMatch or Contains in a Deny
   * rule and for NotExactMatch or NotContains in an Allow rule.
   */
  path?: string;
}

export function mcpArgumentMatchingSerializer(item: McpArgumentMatching): any {
  return {
    values: item["values"].map((p: any) => {
      return p;
    }),
    matchType: item["matchType"],
    matchCase: item["matchCase"],
    path: item["path"],
  };
}

export function mcpArgumentMatchingDeserializer(item: any): McpArgumentMatching {
  return {
    values: item["values"].map((p: any) => {
      return p;
    }),
    matchType: item["matchType"],
    matchCase: item["matchCase"],
    path: item["path"],
  };
}

/** The prompt conditions of an MCP rule. Present properties are ANDed. */
export interface McpPromptMatching {
  /**
   * The prompt methods to match. Omitted means Get. Names and arguments need Get alone. Titles
   * and descriptions need List alone.
   */
  methods?: McpPromptMethod[];
  /** Compared with the prompt name of a prompts/get request. */
  names?: McpStringMatching;
  /** Compared with the title of each prompt in a prompts/list response. Needs methods List alone. */
  titles?: McpStringMatching;
  /** Compared with the description of each prompt in a prompts/list response. Needs methods List alone. */
  descriptions?: McpStringMatching;
  /** Compared with the arguments of a prompts/get request. */
  arguments?: McpArgumentMatching;
  /**
   * Compared with the text of each message, result.messages[].content.text, of a prompts/get
   * response.
   */
  responseContents?: McpStringMatching;
}

export function mcpPromptMatchingSerializer(item: McpPromptMatching): any {
  return {
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    names: !item["names"] ? item["names"] : mcpStringMatchingSerializer(item["names"]),
    titles: !item["titles"] ? item["titles"] : mcpStringMatchingSerializer(item["titles"]),
    descriptions: !item["descriptions"]
      ? item["descriptions"]
      : mcpStringMatchingSerializer(item["descriptions"]),
    arguments: !item["arguments"]
      ? item["arguments"]
      : mcpArgumentMatchingSerializer(item["arguments"]),
    responseContents: !item["responseContents"]
      ? item["responseContents"]
      : mcpStringMatchingSerializer(item["responseContents"]),
  };
}

export function mcpPromptMatchingDeserializer(item: any): McpPromptMatching {
  return {
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    names: !item["names"] ? item["names"] : mcpStringMatchingDeserializer(item["names"]),
    titles: !item["titles"] ? item["titles"] : mcpStringMatchingDeserializer(item["titles"]),
    descriptions: !item["descriptions"]
      ? item["descriptions"]
      : mcpStringMatchingDeserializer(item["descriptions"]),
    arguments: !item["arguments"]
      ? item["arguments"]
      : mcpArgumentMatchingDeserializer(item["arguments"]),
    responseContents: !item["responseContents"]
      ? item["responseContents"]
      : mcpStringMatchingDeserializer(item["responseContents"]),
  };
}

/** An MCP prompt request method. */
export enum KnownMcpPromptMethod {
  /** The prompts/get request. */
  Get = "Get",
  /** The prompts/list request. */
  List = "List",
}

/**
 * An MCP prompt request method. \
 * {@link KnownMcpPromptMethod} can be used interchangeably with McpPromptMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Get**: The prompts\/get request. \
 * **List**: The prompts\/list request.
 */
export type McpPromptMethod = string;

/** TLS inspection network security policy. */
export interface TlsInspectionPolicy extends NetworkSecurityPolicyBase {
  /** The network security policy type. */
  type: "TlsInspection";
  /** The source details for the policy. */
  source: TlsInspectionPolicySourceUnion;
  /** The certificate configuration used for TLS inspection. */
  certificate: TlsInspectionCertificateBaseUnion;
  /** The action for TLS connections that no rule matches, and for rules without an action. If omitted, Inspect. */
  defaultAction?: TlsInspectionAction;
  /** The TLS inspection rules. At most one rule is supported. */
  rules?: TlsInspectionRule[];
}

export function tlsInspectionPolicySerializer(item: TlsInspectionPolicy): any {
  return {
    type: item["type"],
    source: tlsInspectionPolicySourceUnionSerializer(item["source"]),
    certificate: tlsInspectionCertificateBaseUnionSerializer(item["certificate"]),
    defaultAction: item["defaultAction"],
    rules: !item["rules"] ? item["rules"] : tlsInspectionRuleArraySerializer(item["rules"]),
  };
}

export function tlsInspectionPolicyDeserializer(item: any): TlsInspectionPolicy {
  return {
    type: item["type"],
    source: tlsInspectionPolicySourceUnionDeserializer(item["source"]),
    certificate: tlsInspectionCertificateBaseUnionDeserializer(item["certificate"]),
    defaultAction: item["defaultAction"],
    rules: !item["rules"] ? item["rules"] : tlsInspectionRuleArrayDeserializer(item["rules"]),
  };
}

/** Selects the source(s) that a TLS inspection policy applies to. */
export interface TlsInspectionPolicySource {
  /** The type of source selector. */
  /** The discriminator possible values: WorkloadIdPatterns */
  type: TlsInspectionPolicySourceType;
}

export function tlsInspectionPolicySourceSerializer(item: TlsInspectionPolicySource): any {
  return { type: item["type"] };
}

export function tlsInspectionPolicySourceDeserializer(item: any): TlsInspectionPolicySource {
  return {
    type: item["type"],
  };
}

/** Alias for TlsInspectionPolicySourceUnion */
export type TlsInspectionPolicySourceUnion =
  TlsInspectionPolicyWorkloadIdPatternsSource | TlsInspectionPolicySource;

export function tlsInspectionPolicySourceUnionSerializer(
  item: TlsInspectionPolicySourceUnion,
): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return tlsInspectionPolicyWorkloadIdPatternsSourceSerializer(
        item as TlsInspectionPolicyWorkloadIdPatternsSource,
      );

    default:
      return tlsInspectionPolicySourceSerializer(item);
  }
}

export function tlsInspectionPolicySourceUnionDeserializer(
  item: any,
): TlsInspectionPolicySourceUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return tlsInspectionPolicyWorkloadIdPatternsSourceDeserializer(
        item as TlsInspectionPolicyWorkloadIdPatternsSource,
      );

    default:
      return tlsInspectionPolicySourceDeserializer(item);
  }
}

/** The type of source selector for a TLS inspection policy. */
export enum KnownTlsInspectionPolicySourceType {
  /** Select sources by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
}

/**
 * The type of source selector for a TLS inspection policy. \
 * {@link KnownTlsInspectionPolicySourceType} can be used interchangeably with TlsInspectionPolicySourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select sources by workload ID patterns.
 */
export type TlsInspectionPolicySourceType = string;

/** Selects TLS inspection sources by workload ID patterns. */
export interface TlsInspectionPolicyWorkloadIdPatternsSource extends TlsInspectionPolicySource {
  /** The type of source selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the source(s). */
  patterns: string[];
}

export function tlsInspectionPolicyWorkloadIdPatternsSourceSerializer(
  item: TlsInspectionPolicyWorkloadIdPatternsSource,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function tlsInspectionPolicyWorkloadIdPatternsSourceDeserializer(
  item: any,
): TlsInspectionPolicyWorkloadIdPatternsSource {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Base certificate configuration for a TLS inspection policy. */
export interface TlsInspectionCertificateBase {
  /** The source mode of the TLS inspection certificate. */
  /** The discriminator possible values: AzureManagedCA */
  mode: TlsInspectionCertificateMode;
}

export function tlsInspectionCertificateBaseSerializer(item: TlsInspectionCertificateBase): any {
  return { mode: item["mode"] };
}

export function tlsInspectionCertificateBaseDeserializer(item: any): TlsInspectionCertificateBase {
  return {
    mode: item["mode"],
  };
}

/** Alias for TlsInspectionCertificateBaseUnion */
export type TlsInspectionCertificateBaseUnion =
  AzureManagedCaCertificate | TlsInspectionCertificateBase;

export function tlsInspectionCertificateBaseUnionSerializer(
  item: TlsInspectionCertificateBaseUnion,
): any {
  switch (item.mode) {
    case "AzureManagedCA":
      return azureManagedCaCertificateSerializer(item as AzureManagedCaCertificate);

    default:
      return tlsInspectionCertificateBaseSerializer(item);
  }
}

export function tlsInspectionCertificateBaseUnionDeserializer(
  item: any,
): TlsInspectionCertificateBaseUnion {
  switch (item["mode"]) {
    case "AzureManagedCA":
      return azureManagedCaCertificateDeserializer(item as AzureManagedCaCertificate);

    default:
      return tlsInspectionCertificateBaseDeserializer(item);
  }
}

/** The source of the certificate used for TLS inspection. */
export enum KnownTlsInspectionCertificateMode {
  /** Certificate issued by an Azure-managed certificate authority. */
  AzureManagedCA = "AzureManagedCA",
}

/**
 * The source of the certificate used for TLS inspection. \
 * {@link KnownTlsInspectionCertificateMode} can be used interchangeably with TlsInspectionCertificateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureManagedCA**: Certificate issued by an Azure-managed certificate authority.
 */
export type TlsInspectionCertificateMode = string;

/** TLS inspection certificate issued by an Azure-managed certificate authority. */
export interface AzureManagedCaCertificate extends TlsInspectionCertificateBase {
  /** The source mode of the TLS inspection certificate. */
  mode: "AzureManagedCA";
}

export function azureManagedCaCertificateSerializer(item: AzureManagedCaCertificate): any {
  return { mode: item["mode"] };
}

export function azureManagedCaCertificateDeserializer(item: any): AzureManagedCaCertificate {
  return {
    mode: item["mode"],
  };
}

/** The TLS inspection action. */
export enum KnownTlsInspectionAction {
  /** Intercept and decrypt the TLS connection, so policies that read the HTTP request apply. */
  Inspect = "Inspect",
  /** Do not intercept the TLS connection. FQDN filtering still applies, using the TLS server name (SNI). */
  Bypass = "Bypass",
}

/**
 * The TLS inspection action. \
 * {@link KnownTlsInspectionAction} can be used interchangeably with TlsInspectionAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inspect**: Intercept and decrypt the TLS connection, so policies that read the HTTP request apply. \
 * **Bypass**: Do not intercept the TLS connection. FQDN filtering still applies, using the TLS server name (SNI).
 */
export type TlsInspectionAction = string;

export function tlsInspectionRuleArraySerializer(result: Array<TlsInspectionRule>): any[] {
  return result.map((item) => {
    return tlsInspectionRuleSerializer(item);
  });
}

export function tlsInspectionRuleArrayDeserializer(result: Array<TlsInspectionRule>): any[] {
  return result.map((item) => {
    return tlsInspectionRuleDeserializer(item);
  });
}

/** A TLS inspection rule. */
export interface TlsInspectionRule {
  /** The name of the rule, unique within the policy ignoring case. */
  name: string;
  /** The priority of the rule, unique within the policy. Rules are evaluated in ascending priority order and the first match applies. */
  priority: number;
  /** The action for TLS connections that match the rule. If omitted, the rule takes the policy's defaultAction, so it only matters for rule ordering. */
  action?: TlsInspectionAction;
  /** The destinations that the rule matches. A connection matches the rule when it matches any of them. At most one destination is supported. */
  destinations: TlsInspectionRuleDestinationUnion[];
}

export function tlsInspectionRuleSerializer(item: TlsInspectionRule): any {
  return {
    name: item["name"],
    priority: item["priority"],
    action: item["action"],
    destinations: tlsInspectionRuleDestinationUnionArraySerializer(item["destinations"]),
  };
}

export function tlsInspectionRuleDeserializer(item: any): TlsInspectionRule {
  return {
    name: item["name"],
    priority: item["priority"],
    action: item["action"],
    destinations: tlsInspectionRuleDestinationUnionArrayDeserializer(item["destinations"]),
  };
}

export function tlsInspectionRuleDestinationUnionArraySerializer(
  result: Array<TlsInspectionRuleDestinationUnion>,
): any[] {
  return result.map((item) => {
    return tlsInspectionRuleDestinationUnionSerializer(item);
  });
}

export function tlsInspectionRuleDestinationUnionArrayDeserializer(
  result: Array<TlsInspectionRuleDestinationUnion>,
): any[] {
  return result.map((item) => {
    return tlsInspectionRuleDestinationUnionDeserializer(item);
  });
}

/** Selects the destinations that a TLS inspection rule matches. */
export interface TlsInspectionRuleDestination {
  /** The type of destination selector. */
  /** The discriminator possible values: Fqdns */
  type: TlsInspectionRuleDestinationType;
}

export function tlsInspectionRuleDestinationSerializer(item: TlsInspectionRuleDestination): any {
  return { type: item["type"] };
}

export function tlsInspectionRuleDestinationDeserializer(item: any): TlsInspectionRuleDestination {
  return {
    type: item["type"],
  };
}

/** Alias for TlsInspectionRuleDestinationUnion */
export type TlsInspectionRuleDestinationUnion =
  TlsInspectionRuleFqdnsDestination | TlsInspectionRuleDestination;

export function tlsInspectionRuleDestinationUnionSerializer(
  item: TlsInspectionRuleDestinationUnion,
): any {
  switch (item.type) {
    case "Fqdns":
      return tlsInspectionRuleFqdnsDestinationSerializer(item as TlsInspectionRuleFqdnsDestination);

    default:
      return tlsInspectionRuleDestinationSerializer(item);
  }
}

export function tlsInspectionRuleDestinationUnionDeserializer(
  item: any,
): TlsInspectionRuleDestinationUnion {
  switch (item["type"]) {
    case "Fqdns":
      return tlsInspectionRuleFqdnsDestinationDeserializer(
        item as TlsInspectionRuleFqdnsDestination,
      );

    default:
      return tlsInspectionRuleDestinationDeserializer(item);
  }
}

/** The type of destination selector for a TLS inspection rule. */
export enum KnownTlsInspectionRuleDestinationType {
  /** Select destinations by fully qualified domain names. */
  Fqdns = "Fqdns",
}

/**
 * The type of destination selector for a TLS inspection rule. \
 * {@link KnownTlsInspectionRuleDestinationType} can be used interchangeably with TlsInspectionRuleDestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fqdns**: Select destinations by fully qualified domain names.
 */
export type TlsInspectionRuleDestinationType = string;

/** Selects TLS inspection rule destinations by fully qualified domain names, matched against the TLS server name (SNI). */
export interface TlsInspectionRuleFqdnsDestination extends TlsInspectionRuleDestination {
  /** The type of destination selector. */
  type: "Fqdns";
  /** The fully qualified domain names. Each is an exact name, or a name after one leading '*.', which matches that name and any subdomain of it. Matching ignores case and one trailing dot. */
  fqdns: string[];
}

export function tlsInspectionRuleFqdnsDestinationSerializer(
  item: TlsInspectionRuleFqdnsDestination,
): any {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

export function tlsInspectionRuleFqdnsDestinationDeserializer(
  item: any,
): TlsInspectionRuleFqdnsDestination {
  return {
    type: item["type"],
    fqdns: item["fqdns"].map((p: any) => {
      return p;
    }),
  };
}

/** Content inspection network security policy. */
export interface ContentInspectionPolicy extends NetworkSecurityPolicyBase {
  /** The network security policy type. */
  type: "ContentInspection";
  /** The source details for the policy. */
  source: ContentInspectionPolicySourceUnion;
  /** The prompt injection protection configuration. */
  promptInjectionProtection?: PromptInjectionProtection;
}

export function contentInspectionPolicySerializer(item: ContentInspectionPolicy): any {
  return {
    type: item["type"],
    source: contentInspectionPolicySourceUnionSerializer(item["source"]),
    promptInjectionProtection: !item["promptInjectionProtection"]
      ? item["promptInjectionProtection"]
      : promptInjectionProtectionSerializer(item["promptInjectionProtection"]),
  };
}

export function contentInspectionPolicyDeserializer(item: any): ContentInspectionPolicy {
  return {
    type: item["type"],
    source: contentInspectionPolicySourceUnionDeserializer(item["source"]),
    promptInjectionProtection: !item["promptInjectionProtection"]
      ? item["promptInjectionProtection"]
      : promptInjectionProtectionDeserializer(item["promptInjectionProtection"]),
  };
}

/** Selects the source(s) that a content inspection policy applies to. */
export interface ContentInspectionPolicySource {
  /** The type of source selector. */
  /** The discriminator possible values: WorkloadIdPatterns, AddressPrefixes */
  type: ContentInspectionPolicySourceType;
}

export function contentInspectionPolicySourceSerializer(item: ContentInspectionPolicySource): any {
  return { type: item["type"] };
}

export function contentInspectionPolicySourceDeserializer(
  item: any,
): ContentInspectionPolicySource {
  return {
    type: item["type"],
  };
}

/** Alias for ContentInspectionPolicySourceUnion */
export type ContentInspectionPolicySourceUnion =
  | ContentInspectionPolicyWorkloadIdPatternsSource
  | ContentInspectionPolicyAddressPrefixesSource
  | ContentInspectionPolicySource;

export function contentInspectionPolicySourceUnionSerializer(
  item: ContentInspectionPolicySourceUnion,
): any {
  switch (item.type) {
    case "WorkloadIdPatterns":
      return contentInspectionPolicyWorkloadIdPatternsSourceSerializer(
        item as ContentInspectionPolicyWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return contentInspectionPolicyAddressPrefixesSourceSerializer(
        item as ContentInspectionPolicyAddressPrefixesSource,
      );

    default:
      return contentInspectionPolicySourceSerializer(item);
  }
}

export function contentInspectionPolicySourceUnionDeserializer(
  item: any,
): ContentInspectionPolicySourceUnion {
  switch (item["type"]) {
    case "WorkloadIdPatterns":
      return contentInspectionPolicyWorkloadIdPatternsSourceDeserializer(
        item as ContentInspectionPolicyWorkloadIdPatternsSource,
      );

    case "AddressPrefixes":
      return contentInspectionPolicyAddressPrefixesSourceDeserializer(
        item as ContentInspectionPolicyAddressPrefixesSource,
      );

    default:
      return contentInspectionPolicySourceDeserializer(item);
  }
}

/** The type of source selector for a content inspection policy. */
export enum KnownContentInspectionPolicySourceType {
  /** Select sources by workload ID patterns. */
  WorkloadIdPatterns = "WorkloadIdPatterns",
  /** Select sources by IP address prefixes in CIDR notation. */
  AddressPrefixes = "AddressPrefixes",
}

/**
 * The type of source selector for a content inspection policy. \
 * {@link KnownContentInspectionPolicySourceType} can be used interchangeably with ContentInspectionPolicySourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WorkloadIdPatterns**: Select sources by workload ID patterns. \
 * **AddressPrefixes**: Select sources by IP address prefixes in CIDR notation.
 */
export type ContentInspectionPolicySourceType = string;

/** Selects content inspection sources by workload ID patterns. */
export interface ContentInspectionPolicyWorkloadIdPatternsSource extends ContentInspectionPolicySource {
  /** The type of source selector. */
  type: "WorkloadIdPatterns";
  /** The workload ID patterns that identify the source(s). */
  patterns: string[];
}

export function contentInspectionPolicyWorkloadIdPatternsSourceSerializer(
  item: ContentInspectionPolicyWorkloadIdPatternsSource,
): any {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

export function contentInspectionPolicyWorkloadIdPatternsSourceDeserializer(
  item: any,
): ContentInspectionPolicyWorkloadIdPatternsSource {
  return {
    type: item["type"],
    patterns: item["patterns"].map((p: any) => {
      return p;
    }),
  };
}

/** Selects content inspection sources by IP address prefixes. */
export interface ContentInspectionPolicyAddressPrefixesSource extends ContentInspectionPolicySource {
  /** The type of source selector. */
  type: "AddressPrefixes";
  /** The IP address prefixes, in CIDR notation, that identify the source(s). */
  prefixes: string[];
}

export function contentInspectionPolicyAddressPrefixesSourceSerializer(
  item: ContentInspectionPolicyAddressPrefixesSource,
): any {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function contentInspectionPolicyAddressPrefixesSourceDeserializer(
  item: any,
): ContentInspectionPolicyAddressPrefixesSource {
  return {
    type: item["type"],
    prefixes: item["prefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** Prompt injection protection configuration. */
export interface PromptInjectionProtection {
  /** The sensitivity level of prompt injection detection. */
  sensitivity?: ContentInspectionSensitivity;
  /** The JSONPath expressions selecting the parts of the request body to scan for prompt injection. */
  promptLocations?: string[];
  /** The JSONPath expressions selecting the parts of the response body to scan for prompt injection. */
  responseLocations?: string[];
  /** The action to take when prompt injection is detected. */
  onDetection: PromptInjectionOnDetection;
}

export function promptInjectionProtectionSerializer(item: PromptInjectionProtection): any {
  return {
    sensitivity: item["sensitivity"],
    promptLocations: !item["promptLocations"]
      ? item["promptLocations"]
      : item["promptLocations"].map((p: any) => {
          return p;
        }),
    responseLocations: !item["responseLocations"]
      ? item["responseLocations"]
      : item["responseLocations"].map((p: any) => {
          return p;
        }),
    onDetection: item["onDetection"],
  };
}

export function promptInjectionProtectionDeserializer(item: any): PromptInjectionProtection {
  return {
    sensitivity: item["sensitivity"],
    promptLocations: !item["promptLocations"]
      ? item["promptLocations"]
      : item["promptLocations"].map((p: any) => {
          return p;
        }),
    responseLocations: !item["responseLocations"]
      ? item["responseLocations"]
      : item["responseLocations"].map((p: any) => {
          return p;
        }),
    onDetection: item["onDetection"],
  };
}

/** The sensitivity level of content inspection. */
export enum KnownContentInspectionSensitivity {
  /** Low sensitivity. */
  Low = "Low",
  /** Medium sensitivity. */
  Medium = "Medium",
  /** High sensitivity. */
  High = "High",
}

/**
 * The sensitivity level of content inspection. \
 * {@link KnownContentInspectionSensitivity} can be used interchangeably with ContentInspectionSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low sensitivity. \
 * **Medium**: Medium sensitivity. \
 * **High**: High sensitivity.
 */
export type ContentInspectionSensitivity = string;

/** The action to take when prompt injection is detected. */
export enum KnownPromptInjectionOnDetection {
  /** Block the request or response and raise an alert. */
  BlockAndAlert = "BlockAndAlert",
  /** Raise an alert but allow the request or response to proceed. */
  Alert = "Alert",
  /** Remove the detected content and allow the request or response to proceed. */
  Sanitize = "Sanitize",
}

/**
 * The action to take when prompt injection is detected. \
 * {@link KnownPromptInjectionOnDetection} can be used interchangeably with PromptInjectionOnDetection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlockAndAlert**: Block the request or response and raise an alert. \
 * **Alert**: Raise an alert but allow the request or response to proceed. \
 * **Sanitize**: Remove the detected content and allow the request or response to proceed.
 */
export type PromptInjectionOnDetection = string;

export function policyGroupArraySerializer(result: Array<PolicyGroup>): any[] {
  return result.map((item) => {
    return policyGroupSerializer(item);
  });
}

export function policyGroupArrayDeserializer(result: Array<PolicyGroup>): any[] {
  return result.map((item) => {
    return policyGroupDeserializer(item);
  });
}

/**
 * ClusterAssociation resource. Enrolls an AKS managed cluster, or an ACI
 * SandboxGroup, into this AgentFabric; deleting it removes the enrollment.
 *
 * This is not a Member. Workloads are enrolled separately, and creating an
 * association does not create members.
 */
export interface ClusterAssociation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ClusterAssociationProperties;
}

export function clusterAssociationSerializer(item: ClusterAssociation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterAssociationPropertiesSerializer(item["properties"]),
  };
}

export function clusterAssociationDeserializer(item: any): ClusterAssociation {
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
      : clusterAssociationPropertiesDeserializer(item["properties"]),
  };
}

/** ClusterAssociation properties */
export interface ClusterAssociationProperties {
  /**
   * The AKS managed cluster or ACI SandboxGroup to enroll. The resource must be
   * in the same subscription as the AgentFabric; a different resource group is
   * allowed. Set at creation and immutable thereafter; to enroll a different
   * resource, delete and recreate the association. AF rejects the request if
   * the resource is already associated with another fabric.
   */
  clusterResourceId: string;
  /**
   * Determines which AgentFabric components are deployed to the cluster.
   * Defaults to Standard when omitted at creation. An update may upgrade
   * Standard to Premium but cannot downgrade Premium to Standard. The SKU
   * remains unchanged when omitted during an update.
   */
  sku?: ClusterAssociationSkuName;
  /**
   * The IPv4 or IPv6 address of the workload cluster gateway used for
   * internal Agent Fabric routing. The resource provider validates the value.
   */
  workloadClusterGatewayIp?: string;
  /**
   * Error code and message for a failed association. A failed association is
   * retained rather than deleted, so the failure can be inspected and retried.
   * Read-only.
   */
  readonly status?: ClusterAssociationStatus;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function clusterAssociationPropertiesSerializer(item: ClusterAssociationProperties): any {
  return {
    clusterResourceId: item["clusterResourceId"],
    sku: item["sku"],
    workloadClusterGatewayIp: item["workloadClusterGatewayIp"],
  };
}

export function clusterAssociationPropertiesDeserializer(item: any): ClusterAssociationProperties {
  return {
    clusterResourceId: item["clusterResourceId"],
    sku: item["sku"],
    workloadClusterGatewayIp: item["workloadClusterGatewayIp"],
    status: !item["status"] ? item["status"] : clusterAssociationStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** The name of a cluster association SKU. */
export enum KnownClusterAssociationSkuName {
  /** AgentGateway only. */
  Standard = "Standard",
  /** AgentGateway and AgentFabric. */
  Premium = "Premium",
}

/**
 * The name of a cluster association SKU. \
 * {@link KnownClusterAssociationSkuName} can be used interchangeably with ClusterAssociationSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: AgentGateway only. \
 * **Premium**: AgentGateway and AgentFabric.
 */
export type ClusterAssociationSkuName = string;

/** Error information for a failed cluster association. */
export interface ClusterAssociationStatus {
  /** Stable, machine-readable error code. */
  readonly code?: string;
  /** Human-readable description of the failure. */
  readonly message?: string;
}

export function clusterAssociationStatusDeserializer(item: any): ClusterAssociationStatus {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The request body for updating a ClusterAssociation. */
export interface ClusterAssociationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The ClusterAssociation properties to update. */
  properties: ClusterAssociationUpdateProperties;
}

export function clusterAssociationUpdateSerializer(item: ClusterAssociationUpdate): any {
  return {
    tags: item["tags"],
    properties: clusterAssociationUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties that may be updated on a ClusterAssociation. */
export interface ClusterAssociationUpdateProperties {
  /**
   * The existing AKS managed cluster or ACI SandboxGroup. This value is
   * required so Azure Resource Manager can perform linked authorization and
   * must match the immutable clusterResourceId already stored on the
   * association.
   */
  clusterResourceId?: string;
  /**
   * Determines which AgentFabric components are deployed to the cluster.
   * Only an upgrade from Standard to Premium is supported; Premium cannot be
   * downgraded to Standard. When omitted, the PATCH request is an authorized
   * no-op and the existing SKU remains unchanged.
   */
  sku?: ClusterAssociationSkuName;
  /**
   * The IPv4 or IPv6 address of the workload cluster gateway used for
   * internal Agent Fabric routing. The resource provider validates the value.
   */
  workloadClusterGatewayIp?: string;
}

export function clusterAssociationUpdatePropertiesSerializer(
  item: ClusterAssociationUpdateProperties,
): any {
  return {
    clusterResourceId: item["clusterResourceId"],
    sku: item["sku"],
    workloadClusterGatewayIp: item["workloadClusterGatewayIp"],
  };
}

export function clusterAssociationArraySerializer(result: Array<ClusterAssociation>): any[] {
  return result.map((item) => {
    return clusterAssociationSerializer(item);
  });
}

export function clusterAssociationArrayDeserializer(result: Array<ClusterAssociation>): any[] {
  return result.map((item) => {
    return clusterAssociationDeserializer(item);
  });
}

/**
 * The egress TLS-inspection trust bundle for an agent fabric.
 *
 * AgentFabric terminates and re-encrypts enrolled egress traffic, presenting leaf
 * certificates signed by an AgentFabric-operated certificate authority. A workload can only
 * complete those handshakes if the CA's PUBLIC anchor is already present in its trust store.
 * This singleton publishes the anchors that are installed into the fabric's sandboxes, so
 * the compute platform can install them during sandbox bring-up and so you can audit exactly
 * which authorities your workloads are being asked to trust.
 *
 * The resource is read-only and computed: it is never created, updated or deleted through
 * ARM, and reading it neither enrolls a workload nor redirects any traffic. It returns PUBLIC
 * certificates only -- private key material never leaves AgentFabric's key vault.
 *
 * A bundle is always returned as a list, even when it holds a single anchor, so that a CA
 * rollover can publish the outgoing and incoming anchors together.
 */
export interface EgressTrustBundle extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EgressTrustBundleProperties;
}

export function egressTrustBundleDeserializer(item: any): EgressTrustBundle {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : egressTrustBundlePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the platform egress TLS-inspection trust bundle. */
export interface EgressTrustBundleProperties {
  /**
   * The public certificate authority anchors that make up the bundle, ordered with the
   * currently signing anchor first. Always contains at least one entry.
   */
  readonly certificates: EgressTrustBundleCertificate[];
  /**
   * Opaque identifier of this bundle's content. It changes whenever the set of anchors
   * changes and is stable otherwise, so a caller can record what a sandbox was provisioned
   * with and detect drift without comparing certificate bytes.
   */
  readonly bundleVersion: string;
  /**
   * How long, in seconds, a caller may serve this bundle from its own cache. This is a
   * ceiling, not a target: refresh well before it elapses, at roughly half this value, so a
   * transient failure still leaves time to retry before the cached copy must be discarded.
   * The service sets this value and may change it to steer how often callers re-read, so
   * honour the value returned rather than hard-coding an interval. Callers are expected to
   * cache; a synchronous dependency on this operation during every sandbox launch is not
   * intended.
   */
  readonly cacheValiditySeconds: number;
  /**
   * The absolute deadline matching `cacheValiditySeconds`. A cached copy must not be used
   * after this instant without re-reading. Reaching it means the earlier refresh was missed
   * or failing; a caller that cannot obtain an acceptable bundle must fail or retry
   * bring-up rather than silently skip anchor installation.
   */
  readonly cacheExpiresAt: Date;
  /**
   * The provisioning state of the resource. This resource is computed rather than
   * provisioned, so a successful read always reports `Succeeded`.
   */
  readonly provisioningState?: ProvisioningState;
}

export function egressTrustBundlePropertiesDeserializer(item: any): EgressTrustBundleProperties {
  return {
    certificates: egressTrustBundleCertificateArrayDeserializer(item["certificates"]),
    bundleVersion: item["bundleVersion"],
    cacheValiditySeconds: item["cacheValiditySeconds"],
    cacheExpiresAt: new Date(item["cacheExpiresAt"]),
    provisioningState: item["provisioningState"],
  };
}

export function egressTrustBundleCertificateArrayDeserializer(
  result: Array<EgressTrustBundleCertificate>,
): any[] {
  return result.map((item) => {
    return egressTrustBundleCertificateDeserializer(item);
  });
}

/** A single public certificate authority anchor within the egress trust bundle. */
export interface EgressTrustBundleCertificate {
  /**
   * Stable identifier of this anchor, unique within the bundle. Derived from the
   * certificate itself, so it is identical wherever the same anchor is served.
   */
  readonly certificateId: string;
  /** The PEM-encoded X.509 public certificate. This never contains private key material. */
  readonly pem: string;
  /** Lowercase hexadecimal SHA-256 fingerprint of the certificate's DER encoding. */
  readonly thumbprintSha256: string;
  /** The time from which the certificate is valid. */
  readonly notBefore: Date;
  /** The time after which the certificate is no longer valid. */
  readonly notAfter: Date;
}

export function egressTrustBundleCertificateDeserializer(item: any): EgressTrustBundleCertificate {
  return {
    certificateId: item["certificateId"],
    pem: item["pem"],
    thumbprintSha256: item["thumbprintSha256"],
    notBefore: new Date(item["notBefore"]),
    notAfter: new Date(item["notAfter"]),
  };
}

export function egressTrustBundleArrayDeserializer(result: Array<EgressTrustBundle>): any[] {
  return result.map((item) => {
    return egressTrustBundleDeserializer(item);
  });
}

/** Allowed If-None-Match values for cluster association creation. */
export enum KnownClusterAssociationIfNoneMatch {
  /** Match any current representation. */
  Wildcard = "*",
}

/**
 * Allowed If-None-Match values for cluster association creation. \
 * {@link KnownClusterAssociationIfNoneMatch} can be used interchangeably with ClusterAssociationIfNoneMatch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * *****: Match any current representation.
 */
export type ClusterAssociationIfNoneMatch = string;
