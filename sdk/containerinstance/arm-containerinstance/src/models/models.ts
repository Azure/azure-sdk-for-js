// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
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

/** An operation for Azure Container Instance service. */
export interface Operation {
  /** The name of the operation. */
  name: string;
  /** The display information of the operation. */
  display: OperationDisplay;
  /** The additional properties. */
  properties?: any;
  /** The intended executor of the operation. */
  origin?: ContainerInstanceOperationsOrigin;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: operationDisplayDeserializer(item["display"]),
    properties: item["properties"],
    origin: item["origin"],
  };
}

/** The display information of the operation. */
export interface OperationDisplay {
  /** The name of the provider of the operation. */
  provider?: string;
  /** The name of the resource type of the operation. */
  resource?: string;
  /** The friendly name of the operation. */
  operation?: string;
  /** The description of the operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation. */
export enum KnownContainerInstanceOperationsOrigin {
  /** User */
  User = "User",
  /** System */
  System = "System",
}

/**
 * The intended executor of the operation. \
 * {@link KnownContainerInstanceOperationsOrigin} can be used interchangeably with ContainerInstanceOperationsOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **System**: System
 */
export type ContainerInstanceOperationsOrigin = string;

/** An error response from the Container Instance service. */
export interface CloudError {
  /** An error response from the Container Instance service. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the Container Instance service. */
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

/** A container group. */
export interface ContainerGroup extends ProxyResource {
  /** The resource location of the container group. */
  location?: string;
  /** The resource tags. */
  tags?: Record<string, string>;
  /** The availability zones. */
  zones?: string[];
  /** The identity of the container group, if configured. */
  identity?: ContainerGroupIdentity;
  /** The provisioning state of the container group. This only appears in the response. */
  readonly provisioningState?: string;
  /** The secret references that will be referenced within the container group. */
  secretReferences?: SecretReference[];
  /** The containers within the container group. */
  containers: Container[];
  /** The image registry credentials by which the container group is created from. */
  imageRegistryCredentials?: ImageRegistryCredential[];
  /**
   * Restart policy for all containers within the container group.
   * - `Always` Always restart
   * - `OnFailure` Restart on failure
   * - `Never` Never restart
   */
  restartPolicy?: ContainerGroupRestartPolicy;
  /** The IP address type of the container group. */
  ipAddress?: IpAddress;
  /** The operating system type required by the containers in the container group. */
  osType?: OperatingSystemTypes;
  /** The list of volumes that can be mounted by containers in this container group. */
  volumes?: Volume[];
  /** The instance view of the container group. Only valid in response. */
  readonly instanceView?: ContainerGroupPropertiesPropertiesInstanceView;
  /** The diagnostic information for a container group. */
  diagnostics?: ContainerGroupDiagnostics;
  /** The subnet resource IDs for a container group. */
  subnetIds?: ContainerGroupSubnetId[];
  /** The DNS config information for a container group. */
  dnsConfig?: DnsConfiguration;
  /** The SKU for a container group. */
  sku?: ContainerGroupSku;
  /** The encryption properties for a container group. */
  encryptionProperties?: EncryptionProperties;
  /** The init containers for a container group. */
  initContainers?: InitContainerDefinition[];
  /** extensions used by virtual kubelet */
  extensions?: DeploymentExtensionSpec[];
  /** The properties for confidential container group */
  confidentialComputeProperties?: ConfidentialComputeProperties;
  /** The priority of the container group. */
  priority?: ContainerGroupPriority;
  /** The access control levels of the identities. */
  identityAcls?: IdentityAcls;
  /** The reference container group profile properties. */
  containerGroupProfile?: ContainerGroupProfileReferenceDefinition;
  /** The reference standby pool profile properties. */
  standbyPoolProfile?: StandbyPoolProfileDefinition;
  /** The flag to determine whether the container group is created from standby pool. */
  readonly isCreatedFromStandbyPool?: boolean;
}

export function containerGroupSerializer(item: ContainerGroup): any {
  return {
    location: item["location"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : containerGroupIdentitySerializer(item["identity"]),
    properties: _containerGroupPropertiesSerializer(item),
  };
}

export function containerGroupDeserializer(item: any): ContainerGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : containerGroupIdentityDeserializer(item["identity"]),
    ..._containerGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Identity for the container group. */
export interface ContainerGroupIdentity {
  /** The principal id of the container group identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the container group. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the container group. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the container group. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the container group. */
  userAssignedIdentities?: Record<string, UserAssignedIdentities>;
}

export function containerGroupIdentitySerializer(item: ContainerGroupIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function containerGroupIdentityDeserializer(item: any): ContainerGroupIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the container group. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the container group. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userAssignedIdentitiesRecordSerializer(
  item: Record<string, UserAssignedIdentities>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesSerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentitiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentities> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesDeserializer(item[key]);
  });
  return result;
}

/** The list of user identities associated with the container group. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
export interface UserAssignedIdentities {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesSerializer(_item: UserAssignedIdentities): any {
  return {};
}

export function userAssignedIdentitiesDeserializer(item: any): UserAssignedIdentities {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The container group properties */
export interface ContainerGroupPropertiesProperties {
  /** The provisioning state of the container group. This only appears in the response. */
  readonly provisioningState?: string;
  /** The secret references that will be referenced within the container group. */
  secretReferences?: SecretReference[];
  /** The containers within the container group. */
  containers: Container[];
  /** The image registry credentials by which the container group is created from. */
  imageRegistryCredentials?: ImageRegistryCredential[];
  /**
   * Restart policy for all containers within the container group.
   * - `Always` Always restart
   * - `OnFailure` Restart on failure
   * - `Never` Never restart
   */
  restartPolicy?: ContainerGroupRestartPolicy;
  /** The IP address type of the container group. */
  ipAddress?: IpAddress;
  /** The operating system type required by the containers in the container group. */
  osType?: OperatingSystemTypes;
  /** The list of volumes that can be mounted by containers in this container group. */
  volumes?: Volume[];
  /** The instance view of the container group. Only valid in response. */
  readonly instanceView?: ContainerGroupPropertiesPropertiesInstanceView;
  /** The diagnostic information for a container group. */
  diagnostics?: ContainerGroupDiagnostics;
  /** The subnet resource IDs for a container group. */
  subnetIds?: ContainerGroupSubnetId[];
  /** The DNS config information for a container group. */
  dnsConfig?: DnsConfiguration;
  /** The SKU for a container group. */
  sku?: ContainerGroupSku;
  /** The encryption properties for a container group. */
  encryptionProperties?: EncryptionProperties;
  /** The init containers for a container group. */
  initContainers?: InitContainerDefinition[];
  /** extensions used by virtual kubelet */
  extensions?: DeploymentExtensionSpec[];
  /** The properties for confidential container group */
  confidentialComputeProperties?: ConfidentialComputeProperties;
  /** The priority of the container group. */
  priority?: ContainerGroupPriority;
  /** The access control levels of the identities. */
  identityAcls?: IdentityAcls;
  /** The reference container group profile properties. */
  containerGroupProfile?: ContainerGroupProfileReferenceDefinition;
  /** The reference standby pool profile properties. */
  standbyPoolProfile?: StandbyPoolProfileDefinition;
  /** The flag to determine whether the container group is created from standby pool. */
  readonly isCreatedFromStandbyPool?: boolean;
}

export function containerGroupPropertiesPropertiesSerializer(
  item: ContainerGroupPropertiesProperties,
): any {
  return {
    secretReferences: !item["secretReferences"]
      ? item["secretReferences"]
      : secretReferenceArraySerializer(item["secretReferences"]),
    containers: containerArraySerializer(item["containers"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArraySerializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressSerializer(item["ipAddress"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsSerializer(item["diagnostics"]),
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArraySerializer(item["subnetIds"]),
    dnsConfig: !item["dnsConfig"]
      ? item["dnsConfig"]
      : dnsConfigurationSerializer(item["dnsConfig"]),
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArraySerializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArraySerializer(item["extensions"]),
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesSerializer(item["confidentialComputeProperties"]),
    priority: item["priority"],
    identityAcls: !item["identityAcls"]
      ? item["identityAcls"]
      : identityAclsSerializer(item["identityAcls"]),
    containerGroupProfile: !item["containerGroupProfile"]
      ? item["containerGroupProfile"]
      : containerGroupProfileReferenceDefinitionSerializer(item["containerGroupProfile"]),
    standbyPoolProfile: !item["standbyPoolProfile"]
      ? item["standbyPoolProfile"]
      : standbyPoolProfileDefinitionSerializer(item["standbyPoolProfile"]),
  };
}

export function containerGroupPropertiesPropertiesDeserializer(
  item: any,
): ContainerGroupPropertiesProperties {
  return {
    provisioningState: item["provisioningState"],
    secretReferences: !item["secretReferences"]
      ? item["secretReferences"]
      : secretReferenceArrayDeserializer(item["secretReferences"]),
    containers: containerArrayDeserializer(item["containers"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArrayDeserializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressDeserializer(item["ipAddress"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : containerGroupPropertiesPropertiesInstanceViewDeserializer(item["instanceView"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsDeserializer(item["diagnostics"]),
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArrayDeserializer(item["subnetIds"]),
    dnsConfig: !item["dnsConfig"]
      ? item["dnsConfig"]
      : dnsConfigurationDeserializer(item["dnsConfig"]),
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesDeserializer(item["encryptionProperties"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArrayDeserializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArrayDeserializer(item["extensions"]),
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesDeserializer(item["confidentialComputeProperties"]),
    priority: item["priority"],
    identityAcls: !item["identityAcls"]
      ? item["identityAcls"]
      : identityAclsDeserializer(item["identityAcls"]),
    containerGroupProfile: !item["containerGroupProfile"]
      ? item["containerGroupProfile"]
      : containerGroupProfileReferenceDefinitionDeserializer(item["containerGroupProfile"]),
    standbyPoolProfile: !item["standbyPoolProfile"]
      ? item["standbyPoolProfile"]
      : standbyPoolProfileDefinitionDeserializer(item["standbyPoolProfile"]),
    isCreatedFromStandbyPool: item["isCreatedFromStandbyPool"],
  };
}

export function secretReferenceArraySerializer(result: Array<SecretReference>): any[] {
  return result.map((item) => {
    return secretReferenceSerializer(item);
  });
}

export function secretReferenceArrayDeserializer(result: Array<SecretReference>): any[] {
  return result.map((item) => {
    return secretReferenceDeserializer(item);
  });
}

/** A secret reference */
export interface SecretReference {
  /** The identifier of the secret reference */
  name: string;
  /** The ARM resource id of the managed identity that has access to the secret in the key vault */
  identity: string;
  /** The URI to the secret in key vault */
  secretReferenceUri: string;
}

export function secretReferenceSerializer(item: SecretReference): any {
  return {
    name: item["name"],
    identity: item["identity"],
    secretReferenceUri: item["secretReferenceUri"],
  };
}

export function secretReferenceDeserializer(item: any): SecretReference {
  return {
    name: item["name"],
    identity: item["identity"],
    secretReferenceUri: item["secretReferenceUri"],
  };
}

export function containerArraySerializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerSerializer(item);
  });
}

export function containerArrayDeserializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerDeserializer(item);
  });
}

/** A container instance. */
export interface Container {
  /** The user-provided name of the container instance. */
  name: string;
  /** The name of the image used to create the container instance. */
  image?: string;
  /** The commands to execute within the container instance in exec form. */
  command?: string[];
  /** The exposed ports on the container instance. */
  ports?: ContainerPort[];
  /** The environment variables to set in the container instance. */
  environmentVariables?: EnvironmentVariable[];
  /** The instance view of the container instance. Only valid in response. */
  readonly instanceView?: ContainerPropertiesInstanceView;
  /** The resource requirements of the container instance. */
  resources?: ResourceRequirements;
  /** The volume mounts available to the container instance. */
  volumeMounts?: VolumeMount[];
  /** The liveness probe. */
  livenessProbe?: ContainerProbe;
  /** The readiness probe. */
  readinessProbe?: ContainerProbe;
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
  /** The config map. */
  configMap?: ConfigMap;
}

export function containerSerializer(item: Container): any {
  return { name: item["name"], properties: _containerPropertiesSerializer(item) };
}

export function containerDeserializer(item: any): Container {
  return {
    name: item["name"],
    ..._containerPropertiesDeserializer(item["properties"]),
  };
}

/** The container instance properties. */
export interface ContainerProperties {
  /** The name of the image used to create the container instance. */
  image?: string;
  /** The commands to execute within the container instance in exec form. */
  command?: string[];
  /** The exposed ports on the container instance. */
  ports?: ContainerPort[];
  /** The environment variables to set in the container instance. */
  environmentVariables?: EnvironmentVariable[];
  /** The instance view of the container instance. Only valid in response. */
  readonly instanceView?: ContainerPropertiesInstanceView;
  /** The resource requirements of the container instance. */
  resources?: ResourceRequirements;
  /** The volume mounts available to the container instance. */
  volumeMounts?: VolumeMount[];
  /** The liveness probe. */
  livenessProbe?: ContainerProbe;
  /** The readiness probe. */
  readinessProbe?: ContainerProbe;
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
  /** The config map. */
  configMap?: ConfigMap;
}

export function containerPropertiesSerializer(item: ContainerProperties): any {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    ports: !item["ports"] ? item["ports"] : containerPortArraySerializer(item["ports"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
    resources: !item["resources"]
      ? item["resources"]
      : resourceRequirementsSerializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : containerProbeSerializer(item["livenessProbe"]),
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : containerProbeSerializer(item["readinessProbe"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
    configMap: !item["configMap"] ? item["configMap"] : configMapSerializer(item["configMap"]),
  };
}

export function containerPropertiesDeserializer(item: any): ContainerProperties {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    ports: !item["ports"] ? item["ports"] : containerPortArrayDeserializer(item["ports"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : containerPropertiesInstanceViewDeserializer(item["instanceView"]),
    resources: !item["resources"]
      ? item["resources"]
      : resourceRequirementsDeserializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : containerProbeDeserializer(item["livenessProbe"]),
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : containerProbeDeserializer(item["readinessProbe"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
    configMap: !item["configMap"] ? item["configMap"] : configMapDeserializer(item["configMap"]),
  };
}

export function containerPortArraySerializer(result: Array<ContainerPort>): any[] {
  return result.map((item) => {
    return containerPortSerializer(item);
  });
}

export function containerPortArrayDeserializer(result: Array<ContainerPort>): any[] {
  return result.map((item) => {
    return containerPortDeserializer(item);
  });
}

/** The port exposed on the container instance. */
export interface ContainerPort {
  /** The protocol associated with the port. */
  protocol?: ContainerNetworkProtocol;
  /** The port number exposed within the container group. */
  port: number;
}

export function containerPortSerializer(item: ContainerPort): any {
  return { protocol: item["protocol"], port: item["port"] };
}

export function containerPortDeserializer(item: any): ContainerPort {
  return {
    protocol: item["protocol"],
    port: item["port"],
  };
}

/** The protocol associated with the port. */
export enum KnownContainerNetworkProtocol {
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
}

/**
 * The protocol associated with the port. \
 * {@link KnownContainerNetworkProtocol} can be used interchangeably with ContainerNetworkProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: TCP \
 * **UDP**: UDP
 */
export type ContainerNetworkProtocol = string;

export function environmentVariableArraySerializer(result: Array<EnvironmentVariable>): any[] {
  return result.map((item) => {
    return environmentVariableSerializer(item);
  });
}

export function environmentVariableArrayDeserializer(result: Array<EnvironmentVariable>): any[] {
  return result.map((item) => {
    return environmentVariableDeserializer(item);
  });
}

/** The environment variable to set within the container instance. */
export interface EnvironmentVariable {
  /** The name of the environment variable. */
  name: string;
  /** The value of the environment variable. */
  value?: string;
  /** The value of the secure environment variable. */
  secureValue?: string;
  /** The reference of the secure environment variable. */
  secureValueReference?: string;
}

export function environmentVariableSerializer(item: EnvironmentVariable): any {
  return {
    name: item["name"],
    value: item["value"],
    secureValue: item["secureValue"],
    secureValueReference: item["secureValueReference"],
  };
}

export function environmentVariableDeserializer(item: any): EnvironmentVariable {
  return {
    name: item["name"],
    value: item["value"],
    secureValue: item["secureValue"],
    secureValueReference: item["secureValueReference"],
  };
}

/** The instance view of the container instance. Only valid in response. */
export interface ContainerPropertiesInstanceView {
  /** The number of times that the container instance has been restarted. */
  readonly restartCount?: number;
  /** Current container instance state. */
  readonly currentState?: ContainerState;
  /** Previous container instance state. */
  readonly previousState?: ContainerState;
  /** The events of the container instance. */
  readonly events?: Event[];
}

export function containerPropertiesInstanceViewDeserializer(
  item: any,
): ContainerPropertiesInstanceView {
  return {
    restartCount: item["restartCount"],
    currentState: !item["currentState"]
      ? item["currentState"]
      : containerStateDeserializer(item["currentState"]),
    previousState: !item["previousState"]
      ? item["previousState"]
      : containerStateDeserializer(item["previousState"]),
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
  };
}

/** The container instance state. */
export interface ContainerState {
  /** The state of the container instance. */
  readonly state?: string;
  /** The date-time when the container instance state started. */
  readonly startTime?: Date;
  /** The container instance exit codes correspond to those from the `docker run` command. */
  readonly exitCode?: number;
  /** The date-time when the container instance state finished. */
  readonly finishTime?: Date;
  /** The human-readable status of the container instance state. */
  readonly detailStatus?: string;
}

export function containerStateDeserializer(item: any): ContainerState {
  return {
    state: item["state"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    exitCode: item["exitCode"],
    finishTime: !item["finishTime"] ? item["finishTime"] : new Date(item["finishTime"]),
    detailStatus: item["detailStatus"],
  };
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** A container group or container instance event. */
export interface Event {
  /** The count of the event. */
  readonly count?: number;
  /** The date-time of the earliest logged event. */
  readonly firstTimestamp?: Date;
  /** The date-time of the latest logged event. */
  readonly lastTimestamp?: Date;
  /** The event name. */
  readonly name?: string;
  /** The event message. */
  readonly message?: string;
  /** The event type. */
  readonly type?: string;
}

export function eventDeserializer(item: any): Event {
  return {
    count: item["count"],
    firstTimestamp: !item["firstTimestamp"]
      ? item["firstTimestamp"]
      : new Date(item["firstTimestamp"]),
    lastTimestamp: !item["lastTimestamp"] ? item["lastTimestamp"] : new Date(item["lastTimestamp"]),
    name: item["name"],
    message: item["message"],
    type: item["type"],
  };
}

/** The resource requirements. */
export interface ResourceRequirements {
  /** The resource requests of this container instance. */
  requests: ResourceRequests;
  /** The resource limits of this container instance. */
  limits?: ResourceLimits;
}

export function resourceRequirementsSerializer(item: ResourceRequirements): any {
  return {
    requests: resourceRequestsSerializer(item["requests"]),
    limits: !item["limits"] ? item["limits"] : resourceLimitsSerializer(item["limits"]),
  };
}

export function resourceRequirementsDeserializer(item: any): ResourceRequirements {
  return {
    requests: resourceRequestsDeserializer(item["requests"]),
    limits: !item["limits"] ? item["limits"] : resourceLimitsDeserializer(item["limits"]),
  };
}

/** The resource requests. */
export interface ResourceRequests {
  /** The memory request in GB of this container instance. */
  memoryInGB: number;
  /** The CPU request of this container instance. */
  cpu: number;
  /** The GPU request of this container instance. */
  gpu?: GpuResource;
}

export function resourceRequestsSerializer(item: ResourceRequests): any {
  return {
    memoryInGB: item["memoryInGB"],
    cpu: item["cpu"],
    gpu: !item["gpu"] ? item["gpu"] : gpuResourceSerializer(item["gpu"]),
  };
}

export function resourceRequestsDeserializer(item: any): ResourceRequests {
  return {
    memoryInGB: item["memoryInGB"],
    cpu: item["cpu"],
    gpu: !item["gpu"] ? item["gpu"] : gpuResourceDeserializer(item["gpu"]),
  };
}

/** The GPU resource. */
export interface GpuResource {
  /** The count of the GPU resource. */
  count: number;
  /** The SKU of the GPU resource. */
  sku: GpuSku;
}

export function gpuResourceSerializer(item: GpuResource): any {
  return { count: item["count"], sku: item["sku"] };
}

export function gpuResourceDeserializer(item: any): GpuResource {
  return {
    count: item["count"],
    sku: item["sku"],
  };
}

/** The SKU of the GPU resource. */
export enum KnownGpuSku {
  /** K80 */
  K80 = "K80",
  /** P100 */
  P100 = "P100",
  /** V100 */
  V100 = "V100",
}

/**
 * The SKU of the GPU resource. \
 * {@link KnownGpuSku} can be used interchangeably with GpuSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **K80**: K80 \
 * **P100**: P100 \
 * **V100**: V100
 */
export type GpuSku = string;

/** The resource limits. */
export interface ResourceLimits {
  /** The memory limit in GB of this container instance. */
  memoryInGB?: number;
  /** The CPU limit of this container instance. */
  cpu?: number;
  /** The GPU limit of this container instance. */
  gpu?: GpuResource;
}

export function resourceLimitsSerializer(item: ResourceLimits): any {
  return {
    memoryInGB: item["memoryInGB"],
    cpu: item["cpu"],
    gpu: !item["gpu"] ? item["gpu"] : gpuResourceSerializer(item["gpu"]),
  };
}

export function resourceLimitsDeserializer(item: any): ResourceLimits {
  return {
    memoryInGB: item["memoryInGB"],
    cpu: item["cpu"],
    gpu: !item["gpu"] ? item["gpu"] : gpuResourceDeserializer(item["gpu"]),
  };
}

export function volumeMountArraySerializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountSerializer(item);
  });
}

export function volumeMountArrayDeserializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountDeserializer(item);
  });
}

/** The properties of the volume mount. */
export interface VolumeMount {
  /** The name of the volume mount. */
  name: string;
  /** The path within the container where the volume should be mounted. Must not contain colon (:). */
  mountPath: string;
  /** The flag indicating whether the volume mount is read-only. */
  readOnly?: boolean;
}

export function volumeMountSerializer(item: VolumeMount): any {
  return { name: item["name"], mountPath: item["mountPath"], readOnly: item["readOnly"] };
}

export function volumeMountDeserializer(item: any): VolumeMount {
  return {
    name: item["name"],
    mountPath: item["mountPath"],
    readOnly: item["readOnly"],
  };
}

/** The container probe, for liveness or readiness */
export interface ContainerProbe {
  /** The execution command to probe */
  exec?: ContainerExec;
  /** The Http Get settings to probe */
  httpGet?: ContainerHttpGet;
  /** The initial delay seconds. */
  initialDelaySeconds?: number;
  /** The period seconds. */
  periodSeconds?: number;
  /** The failure threshold. */
  failureThreshold?: number;
  /** The success threshold. */
  successThreshold?: number;
  /** The timeout seconds. */
  timeoutSeconds?: number;
}

export function containerProbeSerializer(item: ContainerProbe): any {
  return {
    exec: !item["exec"] ? item["exec"] : containerExecSerializer(item["exec"]),
    httpGet: !item["httpGet"] ? item["httpGet"] : containerHttpGetSerializer(item["httpGet"]),
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    failureThreshold: item["failureThreshold"],
    successThreshold: item["successThreshold"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

export function containerProbeDeserializer(item: any): ContainerProbe {
  return {
    exec: !item["exec"] ? item["exec"] : containerExecDeserializer(item["exec"]),
    httpGet: !item["httpGet"] ? item["httpGet"] : containerHttpGetDeserializer(item["httpGet"]),
    initialDelaySeconds: item["initialDelaySeconds"],
    periodSeconds: item["periodSeconds"],
    failureThreshold: item["failureThreshold"],
    successThreshold: item["successThreshold"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

/** The container execution command, for liveness or readiness probe */
export interface ContainerExec {
  /** The commands to execute within the container. */
  command?: string[];
}

export function containerExecSerializer(item: ContainerExec): any {
  return {
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
  };
}

export function containerExecDeserializer(item: any): ContainerExec {
  return {
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
  };
}

/** The container Http Get settings, for liveness or readiness probe */
export interface ContainerHttpGet {
  /** The path to probe. */
  path?: string;
  /** The port number to probe. */
  port: number;
  /** The scheme. */
  scheme?: Scheme;
  /** The HTTP headers. */
  httpHeaders?: HttpHeader[];
}

export function containerHttpGetSerializer(item: ContainerHttpGet): any {
  return {
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : httpHeaderArraySerializer(item["httpHeaders"]),
  };
}

export function containerHttpGetDeserializer(item: any): ContainerHttpGet {
  return {
    path: item["path"],
    port: item["port"],
    scheme: item["scheme"],
    httpHeaders: !item["httpHeaders"]
      ? item["httpHeaders"]
      : httpHeaderArrayDeserializer(item["httpHeaders"]),
  };
}

/** The scheme. */
export enum KnownScheme {
  /** http */
  Http = "http",
  /** https */
  Https = "https",
}

/**
 * The scheme. \
 * {@link KnownScheme} can be used interchangeably with Scheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **http**: http \
 * **https**: https
 */
export type Scheme = string;

export function httpHeaderArraySerializer(result: Array<HttpHeader>): any[] {
  return result.map((item) => {
    return httpHeaderSerializer(item);
  });
}

export function httpHeaderArrayDeserializer(result: Array<HttpHeader>): any[] {
  return result.map((item) => {
    return httpHeaderDeserializer(item);
  });
}

/** The HTTP header. */
export interface HttpHeader {
  /** The header name. */
  name?: string;
  /** The header value. */
  value?: string;
}

export function httpHeaderSerializer(item: HttpHeader): any {
  return { name: item["name"], value: item["value"] };
}

export function httpHeaderDeserializer(item: any): HttpHeader {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The security context for the container. */
export interface SecurityContextDefinition {
  /** The flag to determine if the container permissions is elevated to Privileged. */
  privileged?: boolean;
  /** A boolean value indicating whether the init process can elevate its privileges */
  allowPrivilegeEscalation?: boolean;
  /** The capabilities to add or drop from a container. */
  capabilities?: SecurityContextCapabilitiesDefinition;
  /** Sets the User GID for the container. */
  runAsGroup?: number;
  /** Sets the User UID for the container. */
  runAsUser?: number;
  /** a base64 encoded string containing the contents of the JSON in the seccomp profile */
  seccompProfile?: string;
}

export function securityContextDefinitionSerializer(item: SecurityContextDefinition): any {
  return {
    privileged: item["privileged"],
    allowPrivilegeEscalation: item["allowPrivilegeEscalation"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : securityContextCapabilitiesDefinitionSerializer(item["capabilities"]),
    runAsGroup: item["runAsGroup"],
    runAsUser: item["runAsUser"],
    seccompProfile: item["seccompProfile"],
  };
}

export function securityContextDefinitionDeserializer(item: any): SecurityContextDefinition {
  return {
    privileged: item["privileged"],
    allowPrivilegeEscalation: item["allowPrivilegeEscalation"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : securityContextCapabilitiesDefinitionDeserializer(item["capabilities"]),
    runAsGroup: item["runAsGroup"],
    runAsUser: item["runAsUser"],
    seccompProfile: item["seccompProfile"],
  };
}

/** The capabilities to add or drop from a container. */
export interface SecurityContextCapabilitiesDefinition {
  /** The capabilities to add to the container. */
  add?: string[];
  /** The capabilities to drop from the container. */
  drop?: string[];
}

export function securityContextCapabilitiesDefinitionSerializer(
  item: SecurityContextCapabilitiesDefinition,
): any {
  return {
    add: !item["add"]
      ? item["add"]
      : item["add"].map((p: any) => {
          return p;
        }),
    drop: !item["drop"]
      ? item["drop"]
      : item["drop"].map((p: any) => {
          return p;
        }),
  };
}

export function securityContextCapabilitiesDefinitionDeserializer(
  item: any,
): SecurityContextCapabilitiesDefinition {
  return {
    add: !item["add"]
      ? item["add"]
      : item["add"].map((p: any) => {
          return p;
        }),
    drop: !item["drop"]
      ? item["drop"]
      : item["drop"].map((p: any) => {
          return p;
        }),
  };
}

/** The container config map. */
export interface ConfigMap {
  /** The key value pairs dictionary in the config map. */
  keyValuePairs?: Record<string, string>;
}

export function configMapSerializer(item: ConfigMap): any {
  return { keyValuePairs: item["keyValuePairs"] };
}

export function configMapDeserializer(item: any): ConfigMap {
  return {
    keyValuePairs: !item["keyValuePairs"]
      ? item["keyValuePairs"]
      : Object.fromEntries(
          Object.entries(item["keyValuePairs"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function imageRegistryCredentialArraySerializer(
  result: Array<ImageRegistryCredential>,
): any[] {
  return result.map((item) => {
    return imageRegistryCredentialSerializer(item);
  });
}

export function imageRegistryCredentialArrayDeserializer(
  result: Array<ImageRegistryCredential>,
): any[] {
  return result.map((item) => {
    return imageRegistryCredentialDeserializer(item);
  });
}

/** Image registry credential. */
export interface ImageRegistryCredential {
  /** The Docker image registry server without a protocol such as "http" and "https". */
  server: string;
  /** The username for the private registry. */
  username?: string;
  /** The password for the private registry. */
  password?: string;
  /** The reference for the private registry password. */
  passwordReference?: string;
  /** The identity for the private registry. */
  identity?: string;
  /** The identity URL for the private registry. */
  identityUrl?: string;
}

export function imageRegistryCredentialSerializer(item: ImageRegistryCredential): any {
  return {
    server: item["server"],
    username: item["username"],
    password: item["password"],
    passwordReference: item["passwordReference"],
    identity: item["identity"],
    identityUrl: item["identityUrl"],
  };
}

export function imageRegistryCredentialDeserializer(item: any): ImageRegistryCredential {
  return {
    server: item["server"],
    username: item["username"],
    password: item["password"],
    passwordReference: item["passwordReference"],
    identity: item["identity"],
    identityUrl: item["identityUrl"],
  };
}

/**
 * Restart policy for all containers within the container group.
 * - `Always` Always restart
 * - `OnFailure` Restart on failure
 * - `Never` Never restart
 */
export enum KnownContainerGroupRestartPolicy {
  /** Always */
  Always = "Always",
  /** OnFailure */
  OnFailure = "OnFailure",
  /** Never */
  Never = "Never",
}

/**
 * Restart policy for all containers within the container group.
 * - `Always` Always restart
 * - `OnFailure` Restart on failure
 * - `Never` Never restart \
 * {@link KnownContainerGroupRestartPolicy} can be used interchangeably with ContainerGroupRestartPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Always**: Always \
 * **OnFailure**: OnFailure \
 * **Never**: Never
 */
export type ContainerGroupRestartPolicy = string;

/** IP address for the container group. */
export interface IpAddress {
  /** The list of ports exposed on the container group. */
  ports: Port[];
  /** Specifies if the IP is exposed to the public internet or private VNET. */
  type: ContainerGroupIpAddressType;
  /** The IP exposed to the public internet. */
  ip?: string;
  /** The Dns name label for the IP. */
  dnsNameLabel?: string;
  /** The value representing the security enum. The 'Unsecure' value is the default value if not selected and means the object's domain name label is not secured against subdomain takeover. The 'TenantReuse' value is the default value if selected and means the object's domain name label can be reused within the same tenant. The 'SubscriptionReuse' value means the object's domain name label can be reused within the same subscription. The 'ResourceGroupReuse' value means the object's domain name label can be reused within the same resource group. The 'NoReuse' value means the object's domain name label cannot be reused within the same resource group, subscription, or tenant. */
  autoGeneratedDomainNameLabelScope?: DnsNameLabelReusePolicy;
  /** The FQDN for the IP. */
  readonly fqdn?: string;
}

export function ipAddressSerializer(item: IpAddress): any {
  return {
    ports: portArraySerializer(item["ports"]),
    type: item["type"],
    ip: item["ip"],
    dnsNameLabel: item["dnsNameLabel"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
  };
}

export function ipAddressDeserializer(item: any): IpAddress {
  return {
    ports: portArrayDeserializer(item["ports"]),
    type: item["type"],
    ip: item["ip"],
    dnsNameLabel: item["dnsNameLabel"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    fqdn: item["fqdn"],
  };
}

export function portArraySerializer(result: Array<Port>): any[] {
  return result.map((item) => {
    return portSerializer(item);
  });
}

export function portArrayDeserializer(result: Array<Port>): any[] {
  return result.map((item) => {
    return portDeserializer(item);
  });
}

/** The port exposed on the container group. */
export interface Port {
  /** The protocol associated with the port. */
  protocol?: ContainerGroupNetworkProtocol;
  /** The port number. */
  port: number;
}

export function portSerializer(item: Port): any {
  return { protocol: item["protocol"], port: item["port"] };
}

export function portDeserializer(item: any): Port {
  return {
    protocol: item["protocol"],
    port: item["port"],
  };
}

/** The protocol associated with the port. */
export enum KnownContainerGroupNetworkProtocol {
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
}

/**
 * The protocol associated with the port. \
 * {@link KnownContainerGroupNetworkProtocol} can be used interchangeably with ContainerGroupNetworkProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: TCP \
 * **UDP**: UDP
 */
export type ContainerGroupNetworkProtocol = string;

/** Specifies if the IP is exposed to the public internet or private VNET. */
export enum KnownContainerGroupIpAddressType {
  /** Public */
  Public = "Public",
  /** Private */
  Private = "Private",
}

/**
 * Specifies if the IP is exposed to the public internet or private VNET. \
 * {@link KnownContainerGroupIpAddressType} can be used interchangeably with ContainerGroupIpAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Public \
 * **Private**: Private
 */
export type ContainerGroupIpAddressType = string;

/** The value representing the security enum. The 'Unsecure' value is the default value if not selected and means the object's domain name label is not secured against subdomain takeover. The 'TenantReuse' value is the default value if selected and means the object's domain name label can be reused within the same tenant. The 'SubscriptionReuse' value means the object's domain name label can be reused within the same subscription. The 'ResourceGroupReuse' value means the object's domain name label can be reused within the same resource group. The 'NoReuse' value means the object's domain name label cannot be reused within the same resource group, subscription, or tenant. */
export enum KnownDnsNameLabelReusePolicy {
  /** Unsecure */
  Unsecure = "Unsecure",
  /** TenantReuse */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** Noreuse */
  Noreuse = "Noreuse",
}

/**
 * The value representing the security enum. The 'Unsecure' value is the default value if not selected and means the object's domain name label is not secured against subdomain takeover. The 'TenantReuse' value is the default value if selected and means the object's domain name label can be reused within the same tenant. The 'SubscriptionReuse' value means the object's domain name label can be reused within the same subscription. The 'ResourceGroupReuse' value means the object's domain name label can be reused within the same resource group. The 'NoReuse' value means the object's domain name label cannot be reused within the same resource group, subscription, or tenant. \
 * {@link KnownDnsNameLabelReusePolicy} can be used interchangeably with DnsNameLabelReusePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unsecure**: Unsecure \
 * **TenantReuse**: TenantReuse \
 * **SubscriptionReuse**: SubscriptionReuse \
 * **ResourceGroupReuse**: ResourceGroupReuse \
 * **Noreuse**: Noreuse
 */
export type DnsNameLabelReusePolicy = string;

/** The operating system type required by the containers in the container group. */
export enum KnownOperatingSystemTypes {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * The operating system type required by the containers in the container group. \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows \
 * **Linux**: Linux
 */
export type OperatingSystemTypes = string;

export function volumeArraySerializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeSerializer(item);
  });
}

export function volumeArrayDeserializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeDeserializer(item);
  });
}

/** The properties of the volume. */
export interface Volume {
  /** The name of the volume. */
  name: string;
  /** The Azure File volume. */
  azureFile?: AzureFileVolume;
  /** The empty directory volume. */
  emptyDir?: any;
  /** The secret volume. */
  secret?: Record<string, string>;
  /** The secret reference volume. */
  secretReference?: Record<string, string>;
  /** The git repo volume. */
  gitRepo?: GitRepoVolume;
}

export function volumeSerializer(item: Volume): any {
  return {
    name: item["name"],
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFileVolumeSerializer(item["azureFile"]),
    emptyDir: item["emptyDir"],
    secret: item["secret"],
    secretReference: item["secretReference"],
    gitRepo: !item["gitRepo"] ? item["gitRepo"] : gitRepoVolumeSerializer(item["gitRepo"]),
  };
}

export function volumeDeserializer(item: any): Volume {
  return {
    name: item["name"],
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFileVolumeDeserializer(item["azureFile"]),
    emptyDir: item["emptyDir"],
    secret: !item["secret"]
      ? item["secret"]
      : Object.fromEntries(Object.entries(item["secret"]).map(([k, p]: [string, any]) => [k, p])),
    secretReference: !item["secretReference"]
      ? item["secretReference"]
      : Object.fromEntries(
          Object.entries(item["secretReference"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    gitRepo: !item["gitRepo"] ? item["gitRepo"] : gitRepoVolumeDeserializer(item["gitRepo"]),
  };
}

/** The properties of the Azure File volume. Azure File shares are mounted as volumes. */
export interface AzureFileVolume {
  /** The name of the Azure File share to be mounted as a volume. */
  shareName: string;
  /** The flag indicating whether the Azure File shared mounted as a volume is read-only. */
  readOnly?: boolean;
  /** The name of the storage account that contains the Azure File share. */
  storageAccountName: string;
  /** The storage account access key used to access the Azure File share. */
  storageAccountKey?: string;
  /** The reference to the storage account access key used to access the Azure File share. */
  storageAccountKeyReference?: string;
}

export function azureFileVolumeSerializer(item: AzureFileVolume): any {
  return {
    shareName: item["shareName"],
    readOnly: item["readOnly"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageAccountKeyReference: item["storageAccountKeyReference"],
  };
}

export function azureFileVolumeDeserializer(item: any): AzureFileVolume {
  return {
    shareName: item["shareName"],
    readOnly: item["readOnly"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageAccountKeyReference: item["storageAccountKeyReference"],
  };
}

/** Represents a volume that is populated with the contents of a git repository */
export interface GitRepoVolume {
  /** Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name. */
  directory?: string;
  /** Repository URL */
  repository: string;
  /** Commit hash for the specified revision. */
  revision?: string;
}

export function gitRepoVolumeSerializer(item: GitRepoVolume): any {
  return {
    directory: item["directory"],
    repository: item["repository"],
    revision: item["revision"],
  };
}

export function gitRepoVolumeDeserializer(item: any): GitRepoVolume {
  return {
    directory: item["directory"],
    repository: item["repository"],
    revision: item["revision"],
  };
}

/** The instance view of the container group. Only valid in response. */
export interface ContainerGroupPropertiesPropertiesInstanceView {
  /** The events of this container group. */
  readonly events?: Event[];
  /** The state of the container group. Only valid in response. */
  readonly state?: string;
}

export function containerGroupPropertiesPropertiesInstanceViewDeserializer(
  item: any,
): ContainerGroupPropertiesPropertiesInstanceView {
  return {
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
    state: item["state"],
  };
}

/** Container group diagnostic information. */
export interface ContainerGroupDiagnostics {
  /** Container group log analytics information. */
  logAnalytics?: LogAnalytics;
}

export function containerGroupDiagnosticsSerializer(item: ContainerGroupDiagnostics): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsSerializer(item["logAnalytics"]),
  };
}

export function containerGroupDiagnosticsDeserializer(item: any): ContainerGroupDiagnostics {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsDeserializer(item["logAnalytics"]),
  };
}

/** Container group log analytics information. */
export interface LogAnalytics {
  /** The workspace id for log analytics */
  workspaceId: string;
  /** The workspace key for log analytics */
  workspaceKey: string;
  /** The log type to be used. */
  logType?: LogAnalyticsLogType;
  /** Metadata for log analytics. */
  metadata?: Record<string, string>;
  /** The workspace resource id for log analytics */
  workspaceResourceId?: string;
}

export function logAnalyticsSerializer(item: LogAnalytics): any {
  return {
    workspaceId: item["workspaceId"],
    workspaceKey: item["workspaceKey"],
    logType: item["logType"],
    metadata: item["metadata"],
    workspaceResourceId: item["workspaceResourceId"],
  };
}

export function logAnalyticsDeserializer(item: any): LogAnalytics {
  return {
    workspaceId: item["workspaceId"],
    workspaceKey: item["workspaceKey"],
    logType: item["logType"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    workspaceResourceId: item["workspaceResourceId"],
  };
}

/** The log type to be used. */
export enum KnownLogAnalyticsLogType {
  /** ContainerInsights */
  ContainerInsights = "ContainerInsights",
  /** ContainerInstanceLogs */
  ContainerInstanceLogs = "ContainerInstanceLogs",
}

/**
 * The log type to be used. \
 * {@link KnownLogAnalyticsLogType} can be used interchangeably with LogAnalyticsLogType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ContainerInsights**: ContainerInsights \
 * **ContainerInstanceLogs**: ContainerInstanceLogs
 */
export type LogAnalyticsLogType = string;

export function containerGroupSubnetIdArraySerializer(
  result: Array<ContainerGroupSubnetId>,
): any[] {
  return result.map((item) => {
    return containerGroupSubnetIdSerializer(item);
  });
}

export function containerGroupSubnetIdArrayDeserializer(
  result: Array<ContainerGroupSubnetId>,
): any[] {
  return result.map((item) => {
    return containerGroupSubnetIdDeserializer(item);
  });
}

/** Container group subnet information. */
export interface ContainerGroupSubnetId {
  /** Resource ID of virtual network and subnet. */
  id: string;
  /** Friendly name for the subnet. */
  name?: string;
}

export function containerGroupSubnetIdSerializer(item: ContainerGroupSubnetId): any {
  return { id: item["id"], name: item["name"] };
}

export function containerGroupSubnetIdDeserializer(item: any): ContainerGroupSubnetId {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** DNS configuration for the container group. */
export interface DnsConfiguration {
  /** The DNS servers for the container group. */
  nameServers: string[];
  /** The DNS search domains for hostname lookup in the container group. */
  searchDomains?: string;
  /** The DNS options for the container group. */
  options?: string;
}

export function dnsConfigurationSerializer(item: DnsConfiguration): any {
  return {
    nameServers: item["nameServers"].map((p: any) => {
      return p;
    }),
    searchDomains: item["searchDomains"],
    options: item["options"],
  };
}

export function dnsConfigurationDeserializer(item: any): DnsConfiguration {
  return {
    nameServers: item["nameServers"].map((p: any) => {
      return p;
    }),
    searchDomains: item["searchDomains"],
    options: item["options"],
  };
}

/** The container group SKU. */
export enum KnownContainerGroupSku {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Standard */
  Standard = "Standard",
  /** Dedicated */
  Dedicated = "Dedicated",
  /** Confidential */
  Confidential = "Confidential",
}

/**
 * The container group SKU. \
 * {@link KnownContainerGroupSku} can be used interchangeably with ContainerGroupSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Standard**: Standard \
 * **Dedicated**: Dedicated \
 * **Confidential**: Confidential
 */
export type ContainerGroupSku = string;

/** The container group encryption properties. */
export interface EncryptionProperties {
  /** The keyvault base url. */
  vaultBaseUrl: string;
  /** The encryption key name. */
  keyName: string;
  /** The encryption key version. */
  keyVersion: string;
  /** The keyvault managed identity. */
  identity?: string;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    vaultBaseUrl: item["vaultBaseUrl"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    identity: item["identity"],
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    vaultBaseUrl: item["vaultBaseUrl"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    identity: item["identity"],
  };
}

export function initContainerDefinitionArraySerializer(
  result: Array<InitContainerDefinition>,
): any[] {
  return result.map((item) => {
    return initContainerDefinitionSerializer(item);
  });
}

export function initContainerDefinitionArrayDeserializer(
  result: Array<InitContainerDefinition>,
): any[] {
  return result.map((item) => {
    return initContainerDefinitionDeserializer(item);
  });
}

/** The init container definition. */
export interface InitContainerDefinition {
  /** The name for the init container. */
  name: string;
  /** The image of the init container. */
  image?: string;
  /** The command to execute within the init container in exec form. */
  command?: string[];
  /** The environment variables to set in the init container. */
  environmentVariables?: EnvironmentVariable[];
  /** The instance view of the init container. Only valid in response. */
  readonly instanceView?: InitContainerPropertiesDefinitionInstanceView;
  /** The volume mounts available to the init container. */
  volumeMounts?: VolumeMount[];
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
}

export function initContainerDefinitionSerializer(item: InitContainerDefinition): any {
  return { name: item["name"], properties: _initContainerDefinitionPropertiesSerializer(item) };
}

export function initContainerDefinitionDeserializer(item: any): InitContainerDefinition {
  return {
    name: item["name"],
    ..._initContainerDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** The init container definition properties. */
export interface InitContainerPropertiesDefinition {
  /** The image of the init container. */
  image?: string;
  /** The command to execute within the init container in exec form. */
  command?: string[];
  /** The environment variables to set in the init container. */
  environmentVariables?: EnvironmentVariable[];
  /** The instance view of the init container. Only valid in response. */
  readonly instanceView?: InitContainerPropertiesDefinitionInstanceView;
  /** The volume mounts available to the init container. */
  volumeMounts?: VolumeMount[];
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
}

export function initContainerPropertiesDefinitionSerializer(
  item: InitContainerPropertiesDefinition,
): any {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
  };
}

export function initContainerPropertiesDefinitionDeserializer(
  item: any,
): InitContainerPropertiesDefinition {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : initContainerPropertiesDefinitionInstanceViewDeserializer(item["instanceView"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
  };
}

/** The instance view of the init container. Only valid in response. */
export interface InitContainerPropertiesDefinitionInstanceView {
  /** The number of times that the init container has been restarted. */
  readonly restartCount?: number;
  /** The current state of the init container. */
  readonly currentState?: ContainerState;
  /** The previous state of the init container. */
  readonly previousState?: ContainerState;
  /** The events of the init container. */
  readonly events?: Event[];
}

export function initContainerPropertiesDefinitionInstanceViewDeserializer(
  item: any,
): InitContainerPropertiesDefinitionInstanceView {
  return {
    restartCount: item["restartCount"],
    currentState: !item["currentState"]
      ? item["currentState"]
      : containerStateDeserializer(item["currentState"]),
    previousState: !item["previousState"]
      ? item["previousState"]
      : containerStateDeserializer(item["previousState"]),
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
  };
}

export function deploymentExtensionSpecArraySerializer(
  result: Array<DeploymentExtensionSpec>,
): any[] {
  return result.map((item) => {
    return deploymentExtensionSpecSerializer(item);
  });
}

export function deploymentExtensionSpecArrayDeserializer(
  result: Array<DeploymentExtensionSpec>,
): any[] {
  return result.map((item) => {
    return deploymentExtensionSpecDeserializer(item);
  });
}

/** Extension sidecars to be added to the deployment. */
export interface DeploymentExtensionSpec {
  /** Name of the extension. */
  name: string;
  /** Type of extension to be added. */
  extensionType?: string;
  /** Version of the extension being used. */
  version?: string;
  /** Settings for the extension. */
  settings?: any;
  /** Protected settings for the extension. */
  protectedSettings?: any;
}

export function deploymentExtensionSpecSerializer(item: DeploymentExtensionSpec): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, [
      "extensionType",
      "version",
      "settings",
      "protectedSettings",
    ])
      ? undefined
      : _deploymentExtensionSpecPropertiesSerializer(item),
  };
}

export function deploymentExtensionSpecDeserializer(item: any): DeploymentExtensionSpec {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _deploymentExtensionSpecPropertiesDeserializer(item["properties"])),
  };
}

/** Extension specific properties */
export interface DeploymentExtensionSpecProperties {
  /** Type of extension to be added. */
  extensionType: string;
  /** Version of the extension being used. */
  version: string;
  /** Settings for the extension. */
  settings?: any;
  /** Protected settings for the extension. */
  protectedSettings?: any;
}

export function deploymentExtensionSpecPropertiesSerializer(
  item: DeploymentExtensionSpecProperties,
): any {
  return {
    extensionType: item["extensionType"],
    version: item["version"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

export function deploymentExtensionSpecPropertiesDeserializer(
  item: any,
): DeploymentExtensionSpecProperties {
  return {
    extensionType: item["extensionType"],
    version: item["version"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

/** The properties for confidential container group */
export interface ConfidentialComputeProperties {
  /** The base64 encoded confidential compute enforcement policy */
  ccePolicy?: string;
}

export function confidentialComputePropertiesSerializer(item: ConfidentialComputeProperties): any {
  return { ccePolicy: item["ccePolicy"] };
}

export function confidentialComputePropertiesDeserializer(
  item: any,
): ConfidentialComputeProperties {
  return {
    ccePolicy: item["ccePolicy"],
  };
}

/** The priority of the container group. */
export enum KnownContainerGroupPriority {
  /** Regular */
  Regular = "Regular",
  /** Spot */
  Spot = "Spot",
}

/**
 * The priority of the container group. \
 * {@link KnownContainerGroupPriority} can be used interchangeably with ContainerGroupPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular \
 * **Spot**: Spot
 */
export type ContainerGroupPriority = string;

/** The access control levels of the identities. */
export interface IdentityAcls {
  /** The default access level. */
  defaultAccess?: IdentityAccessLevel;
  /** The access control levels for each identity. */
  acls?: IdentityAccessControl[];
}

export function identityAclsSerializer(item: IdentityAcls): any {
  return {
    defaultAccess: item["defaultAccess"],
    acls: !item["acls"] ? item["acls"] : identityAccessControlArraySerializer(item["acls"]),
  };
}

export function identityAclsDeserializer(item: any): IdentityAcls {
  return {
    defaultAccess: item["defaultAccess"],
    acls: !item["acls"] ? item["acls"] : identityAccessControlArrayDeserializer(item["acls"]),
  };
}

/** The access level of an identity. */
export enum KnownIdentityAccessLevel {
  /** All */
  All = "All",
  /** System */
  System = "System",
  /** User */
  User = "User",
}

/**
 * The access level of an identity. \
 * {@link KnownIdentityAccessLevel} can be used interchangeably with IdentityAccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: All \
 * **System**: System \
 * **User**: User
 */
export type IdentityAccessLevel = string;

export function identityAccessControlArraySerializer(result: Array<IdentityAccessControl>): any[] {
  return result.map((item) => {
    return identityAccessControlSerializer(item);
  });
}

export function identityAccessControlArrayDeserializer(
  result: Array<IdentityAccessControl>,
): any[] {
  return result.map((item) => {
    return identityAccessControlDeserializer(item);
  });
}

/** The access control for an identity */
export interface IdentityAccessControl {
  /** The access level of the identity. */
  access?: IdentityAccessLevel;
  /** An identity. */
  identity?: string;
}

export function identityAccessControlSerializer(item: IdentityAccessControl): any {
  return { access: item["access"], identity: item["identity"] };
}

export function identityAccessControlDeserializer(item: any): IdentityAccessControl {
  return {
    access: item["access"],
    identity: item["identity"],
  };
}

/** The container group profile reference. */
export interface ContainerGroupProfileReferenceDefinition {
  /** The container group profile reference id.This will be an ARM resource id in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}'. */
  id?: string;
  /** The container group profile reference revision. */
  revision?: number;
}

export function containerGroupProfileReferenceDefinitionSerializer(
  item: ContainerGroupProfileReferenceDefinition,
): any {
  return { id: item["id"], revision: item["revision"] };
}

export function containerGroupProfileReferenceDefinitionDeserializer(
  item: any,
): ContainerGroupProfileReferenceDefinition {
  return {
    id: item["id"],
    revision: item["revision"],
  };
}

/** The standby pool profile reference. */
export interface StandbyPoolProfileDefinition {
  /** The standby pool profile reference id.This will be an ARM resource id in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyPoolName}'. */
  id?: string;
  /** The flag to determine whether ACI should fail the create request if the container group can not be obtained from standby pool. */
  failContainerGroupCreateOnReuseFailure?: boolean;
}

export function standbyPoolProfileDefinitionSerializer(item: StandbyPoolProfileDefinition): any {
  return {
    id: item["id"],
    failContainerGroupCreateOnReuseFailure: item["failContainerGroupCreateOnReuseFailure"],
  };
}

export function standbyPoolProfileDefinitionDeserializer(item: any): StandbyPoolProfileDefinition {
  return {
    id: item["id"],
    failContainerGroupCreateOnReuseFailure: item["failContainerGroupCreateOnReuseFailure"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends ArmResource {}

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
export interface ArmResource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function armResourceSerializer(_item: ArmResource): any {
  return {};
}

export function armResourceDeserializer(item: any): ArmResource {
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

/** The Resource model definition. */
export interface Resource {
  /** The resource id. */
  readonly id?: string;
  /** The resource name. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** The resource location. */
  location?: string;
  /** The resource tags. */
  tags?: Record<string, string>;
  /** The zones for the container group. */
  zones?: string[];
}

export function resourceSerializer(item: Resource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a container group list operation. */
export interface _ContainerGroupListResult {
  /** The ListResultContainerGroup items on this page */
  value: ContainerGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerGroupListResultDeserializer(item: any): _ContainerGroupListResult {
  return {
    value: containerGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerGroupArraySerializer(result: Array<ContainerGroup>): any[] {
  return result.map((item) => {
    return containerGroupSerializer(item);
  });
}

export function containerGroupArrayDeserializer(result: Array<ContainerGroup>): any[] {
  return result.map((item) => {
    return containerGroupDeserializer(item);
  });
}

/** Describes the NGroups resource. */
export interface NGroup extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The availability zones. */
  zones?: string[];
  /** The identity of the NGroup, if configured. */
  identity?: NGroupIdentity;
  /** The elastic profile. */
  elasticProfile?: ElasticProfile;
  /** Provides options w.r.t allocation and management w.r.t certain placement policies. These utilize capabilities provided by the underlying Azure infrastructure. They are typically used for high availability scenarios. E.g., distributing CGs across fault domains. */
  placementProfile?: PlacementProfile;
  /** The Container Group Profiles that could be used in the NGroups resource. */
  containerGroupProfiles?: ContainerGroupProfileStub[];
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: NGroupProvisioningState;
  /** Used by the customer to specify the way to update the Container Groups in NGroup. */
  updateProfile?: UpdateProfile;
}

export function nGroupSerializer(item: NGroup): any {
  return {
    properties: areAllPropsUndefined(item, [
      "elasticProfile",
      "placementProfile",
      "containerGroupProfiles",
      "updateProfile",
    ])
      ? undefined
      : _nGroupPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : nGroupIdentitySerializer(item["identity"]),
  };
}

export function nGroupDeserializer(item: any): NGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _nGroupPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : nGroupIdentityDeserializer(item["identity"]),
  };
}

/** Describes the properties of the NGroups resource. */
export interface NGroupProperties {
  /** The elastic profile. */
  elasticProfile?: ElasticProfile;
  /** Provides options w.r.t allocation and management w.r.t certain placement policies. These utilize capabilities provided by the underlying Azure infrastructure. They are typically used for high availability scenarios. E.g., distributing CGs across fault domains. */
  placementProfile?: PlacementProfile;
  /** The Container Group Profiles that could be used in the NGroups resource. */
  containerGroupProfiles?: ContainerGroupProfileStub[];
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: NGroupProvisioningState;
  /** Used by the customer to specify the way to update the Container Groups in NGroup. */
  updateProfile?: UpdateProfile;
}

export function nGroupPropertiesSerializer(item: NGroupProperties): any {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileSerializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileSerializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArraySerializer(item["containerGroupProfiles"]),
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileSerializer(item["updateProfile"]),
  };
}

export function nGroupPropertiesDeserializer(item: any): NGroupProperties {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileDeserializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileDeserializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArrayDeserializer(item["containerGroupProfiles"]),
    provisioningState: item["provisioningState"],
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileDeserializer(item["updateProfile"]),
  };
}

/** Describes the elastic profile of the NGroup */
export interface ElasticProfile {
  desiredCount?: number;
  /** Flag that indicates whether desiredCount should be maintained when customer deletes SPECIFIC container groups (CGs) from the NGroups. In this case, new CGs will be created by NGroup to compensate for the specific deleted ones. */
  maintainDesiredCount?: boolean;
  /** Container Groups are named on a generic guid based naming scheme/policy. Customer can modify naming policy to add prefix to CG names during scale out operation. */
  containerGroupNamingPolicy?: ElasticProfileContainerGroupNamingPolicy;
}

export function elasticProfileSerializer(item: ElasticProfile): any {
  return {
    desiredCount: item["desiredCount"],
    maintainDesiredCount: item["maintainDesiredCount"],
    containerGroupNamingPolicy: !item["containerGroupNamingPolicy"]
      ? item["containerGroupNamingPolicy"]
      : elasticProfileContainerGroupNamingPolicySerializer(item["containerGroupNamingPolicy"]),
  };
}

export function elasticProfileDeserializer(item: any): ElasticProfile {
  return {
    desiredCount: item["desiredCount"],
    maintainDesiredCount: item["maintainDesiredCount"],
    containerGroupNamingPolicy: !item["containerGroupNamingPolicy"]
      ? item["containerGroupNamingPolicy"]
      : elasticProfileContainerGroupNamingPolicyDeserializer(item["containerGroupNamingPolicy"]),
  };
}

/** Container Groups are named on a generic guid based naming scheme/policy. Customer can modify naming policy to add prefix to CG names during scale out operation. */
export interface ElasticProfileContainerGroupNamingPolicy {
  guidNamingPolicy?: ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy;
}

export function elasticProfileContainerGroupNamingPolicySerializer(
  item: ElasticProfileContainerGroupNamingPolicy,
): any {
  return {
    guidNamingPolicy: !item["guidNamingPolicy"]
      ? item["guidNamingPolicy"]
      : elasticProfileContainerGroupNamingPolicyGuidNamingPolicySerializer(
          item["guidNamingPolicy"],
        ),
  };
}

export function elasticProfileContainerGroupNamingPolicyDeserializer(
  item: any,
): ElasticProfileContainerGroupNamingPolicy {
  return {
    guidNamingPolicy: !item["guidNamingPolicy"]
      ? item["guidNamingPolicy"]
      : elasticProfileContainerGroupNamingPolicyGuidNamingPolicyDeserializer(
          item["guidNamingPolicy"],
        ),
  };
}

/** model interface ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy */
export interface ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy {
  /** The prefix can be used when there are tooling limitations (e.g. on the Azure portal where CGs from multiple NGroups exist in the same RG). The prefix with the suffixed resource name must still follow Azure resource naming guidelines. */
  prefix?: string;
}

export function elasticProfileContainerGroupNamingPolicyGuidNamingPolicySerializer(
  item: ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy,
): any {
  return { prefix: item["prefix"] };
}

export function elasticProfileContainerGroupNamingPolicyGuidNamingPolicyDeserializer(
  item: any,
): ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy {
  return {
    prefix: item["prefix"],
  };
}

/** Provides options w.r.t allocation and management w.r.t certain placement policies. These utilize capabilities provided by the underlying Azure infrastructure. They are typically used for high availability scenarios. E.g., distributing CGs across fault domains. */
export interface PlacementProfile {
  /** The number of fault domains to be used to spread CGs in the NGroups resource. This can only be specified during NGroup creation and is immutable after that. */
  faultDomainCount?: number;
}

export function placementProfileSerializer(item: PlacementProfile): any {
  return { faultDomainCount: item["faultDomainCount"] };
}

export function placementProfileDeserializer(item: any): PlacementProfile {
  return {
    faultDomainCount: item["faultDomainCount"],
  };
}

export function containerGroupProfileStubArraySerializer(
  result: Array<ContainerGroupProfileStub>,
): any[] {
  return result.map((item) => {
    return containerGroupProfileStubSerializer(item);
  });
}

export function containerGroupProfileStubArrayDeserializer(
  result: Array<ContainerGroupProfileStub>,
): any[] {
  return result.map((item) => {
    return containerGroupProfileStubDeserializer(item);
  });
}

/** The object that contains a reference to a Container Group Profile and it's other related properties. */
export interface ContainerGroupProfileStub {
  /** A reference to the container group profile ARM resource hosted in ACI RP. */
  resource?: ApiEntityReference;
  /** The revision of the CG profile is an optional property. If customer does not to provide a revision then NGroups will pickup the latest revision of CGProfile. */
  revision?: number;
  /** A network profile for network settings of a ContainerGroupProfile. */
  networkProfile?: NetworkProfile;
  /** Storage profile for storage related settings of a container group profile. */
  storageProfile?: StorageProfile;
  /** Container Group properties which can be set while creating or updating the NGroups. */
  containerGroupProperties?: NGroupContainerGroupProperties;
}

export function containerGroupProfileStubSerializer(item: ContainerGroupProfileStub): any {
  return {
    resource: !item["resource"] ? item["resource"] : apiEntityReferenceSerializer(item["resource"]),
    revision: item["revision"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    containerGroupProperties: !item["containerGroupProperties"]
      ? item["containerGroupProperties"]
      : nGroupContainerGroupPropertiesSerializer(item["containerGroupProperties"]),
  };
}

export function containerGroupProfileStubDeserializer(item: any): ContainerGroupProfileStub {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : apiEntityReferenceDeserializer(item["resource"]),
    revision: item["revision"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    containerGroupProperties: !item["containerGroupProperties"]
      ? item["containerGroupProperties"]
      : nGroupContainerGroupPropertiesDeserializer(item["containerGroupProperties"]),
  };
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

export function apiEntityReferenceSerializer(item: ApiEntityReference): any {
  return { id: item["id"] };
}

export function apiEntityReferenceDeserializer(item: any): ApiEntityReference {
  return {
    id: item["id"],
  };
}

/** A network profile for network settings of a ContainerGroupProfile. Used to manage load balancer and application gateway backend pools, specifically updating the IP addresses of CGs within the backend pool. */
export interface NetworkProfile {
  /** LoadBalancer the CG profile will use to interact with CGs in a backend pool */
  loadBalancer?: LoadBalancer;
  /** Application Gateway the CG profile will use to interact with CGs in a backend pool */
  applicationGateway?: ApplicationGateway;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerSerializer(item["loadBalancer"]),
    applicationGateway: !item["applicationGateway"]
      ? item["applicationGateway"]
      : applicationGatewaySerializer(item["applicationGateway"]),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    loadBalancer: !item["loadBalancer"]
      ? item["loadBalancer"]
      : loadBalancerDeserializer(item["loadBalancer"]),
    applicationGateway: !item["applicationGateway"]
      ? item["applicationGateway"]
      : applicationGatewayDeserializer(item["applicationGateway"]),
  };
}

/** LoadBalancer the CG profile will use to interact with CGs in a backend pool */
export interface LoadBalancer {
  /** List of Load Balancer Backend Address Pools. */
  backendAddressPools?: LoadBalancerBackendAddressPool[];
}

export function loadBalancerSerializer(item: LoadBalancer): any {
  return {
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : loadBalancerBackendAddressPoolArraySerializer(item["backendAddressPools"]),
  };
}

export function loadBalancerDeserializer(item: any): LoadBalancer {
  return {
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : loadBalancerBackendAddressPoolArrayDeserializer(item["backendAddressPools"]),
  };
}

export function loadBalancerBackendAddressPoolArraySerializer(
  result: Array<LoadBalancerBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressPoolSerializer(item);
  });
}

export function loadBalancerBackendAddressPoolArrayDeserializer(
  result: Array<LoadBalancerBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressPoolDeserializer(item);
  });
}

/** NGroups load balancer backend address pool */
export interface LoadBalancerBackendAddressPool {
  /** The Load Balancer backend address pool ARM resource Id. */
  resource?: string;
}

export function loadBalancerBackendAddressPoolSerializer(
  item: LoadBalancerBackendAddressPool,
): any {
  return { resource: item["resource"] };
}

export function loadBalancerBackendAddressPoolDeserializer(
  item: any,
): LoadBalancerBackendAddressPool {
  return {
    resource: item["resource"],
  };
}

/** Application Gateway the CG profile will use to interact with CGs in a backend pool */
export interface ApplicationGateway {
  /** The Application Gateway ARM resource Id. */
  resource?: string;
  /** List of Application Gateway Backend Address Pools. */
  backendAddressPools?: ApplicationGatewayBackendAddressPool[];
}

export function applicationGatewaySerializer(item: ApplicationGateway): any {
  return {
    resource: item["resource"],
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : applicationGatewayBackendAddressPoolArraySerializer(item["backendAddressPools"]),
  };
}

export function applicationGatewayDeserializer(item: any): ApplicationGateway {
  return {
    resource: item["resource"],
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : applicationGatewayBackendAddressPoolArrayDeserializer(item["backendAddressPools"]),
  };
}

export function applicationGatewayBackendAddressPoolArraySerializer(
  result: Array<ApplicationGatewayBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressPoolSerializer(item);
  });
}

export function applicationGatewayBackendAddressPoolArrayDeserializer(
  result: Array<ApplicationGatewayBackendAddressPool>,
): any[] {
  return result.map((item) => {
    return applicationGatewayBackendAddressPoolDeserializer(item);
  });
}

/** NGroups application gateway backend address pool */
export interface ApplicationGatewayBackendAddressPool {
  /** The application gateway backend address pool ARM resource Id. */
  resource?: string;
}

export function applicationGatewayBackendAddressPoolSerializer(
  item: ApplicationGatewayBackendAddressPool,
): any {
  return { resource: item["resource"] };
}

export function applicationGatewayBackendAddressPoolDeserializer(
  item: any,
): ApplicationGatewayBackendAddressPool {
  return {
    resource: item["resource"],
  };
}

/** Storage profile for storage related settings of a container group profile. */
export interface StorageProfile {
  fileShares?: FileShare[];
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    fileShares: !item["fileShares"]
      ? item["fileShares"]
      : fileShareArraySerializer(item["fileShares"]),
  };
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    fileShares: !item["fileShares"]
      ? item["fileShares"]
      : fileShareArrayDeserializer(item["fileShares"]),
  };
}

export function fileShareArraySerializer(result: Array<FileShare>): any[] {
  return result.map((item) => {
    return fileShareSerializer(item);
  });
}

export function fileShareArrayDeserializer(result: Array<FileShare>): any[] {
  return result.map((item) => {
    return fileShareDeserializer(item);
  });
}

/** File shares that can be mounted on container groups. */
export interface FileShare {
  name?: string;
  resourceGroupName?: string;
  storageAccountName?: string;
  properties?: FileShareProperties;
}

export function fileShareSerializer(item: FileShare): any {
  return {
    name: item["name"],
    resourceGroupName: item["resourceGroupName"],
    storageAccountName: item["storageAccountName"],
    properties: !item["properties"]
      ? item["properties"]
      : fileSharePropertiesSerializer(item["properties"]),
  };
}

export function fileShareDeserializer(item: any): FileShare {
  return {
    name: item["name"],
    resourceGroupName: item["resourceGroupName"],
    storageAccountName: item["storageAccountName"],
    properties: !item["properties"]
      ? item["properties"]
      : fileSharePropertiesDeserializer(item["properties"]),
  };
}

/** model interface FileShareProperties */
export interface FileShareProperties {
  /** Specifies how Container Groups can access the Azure file share i.e. all CG will share same Azure file share or going to have exclusive file share. */
  shareAccessType?: AzureFileShareAccessType;
  /** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. Learn more at: https://learn.microsoft.com/en-us/rest/api/storagerp/file-shares/create?tabs=HTTP#shareaccesstier */
  shareAccessTier?: AzureFileShareAccessTier;
}

export function fileSharePropertiesSerializer(item: FileShareProperties): any {
  return { shareAccessType: item["shareAccessType"], shareAccessTier: item["shareAccessTier"] };
}

export function fileSharePropertiesDeserializer(item: any): FileShareProperties {
  return {
    shareAccessType: item["shareAccessType"],
    shareAccessTier: item["shareAccessTier"],
  };
}

/** Specifies how Container Groups can access the Azure file share i.e. all CG will share same Azure file share or going to have exclusive file share. */
export type AzureFileShareAccessType = "Shared" | "Exclusive";
/** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. Learn more at: https://learn.microsoft.com/en-us/rest/api/storagerp/file-shares/create?tabs=HTTP#shareaccesstier */
export type AzureFileShareAccessTier = "Cool" | "Hot" | "Premium" | "TransactionOptimized";

/** Container Group properties which can be set while creating or updating the NGroups. */
export interface NGroupContainerGroupProperties {
  /** Contains information about Virtual Network Subnet ARM Resource */
  subnetIds?: ContainerGroupSubnetId[];
  /** Contains information about the volumes that can be mounted by Containers in the Container Groups. */
  volumes?: NGroupCGPropertyVolume[];
  /** Contains information about Container which can be set while creating or updating the NGroups. */
  containers?: NGroupCGPropertyContainer[];
}

export function nGroupContainerGroupPropertiesSerializer(
  item: NGroupContainerGroupProperties,
): any {
  return {
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArraySerializer(item["subnetIds"]),
    volumes: !item["volumes"]
      ? item["volumes"]
      : nGroupCGPropertyVolumeArraySerializer(item["volumes"]),
    containers: !item["containers"]
      ? item["containers"]
      : nGroupCGPropertyContainerArraySerializer(item["containers"]),
  };
}

export function nGroupContainerGroupPropertiesDeserializer(
  item: any,
): NGroupContainerGroupProperties {
  return {
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArrayDeserializer(item["subnetIds"]),
    volumes: !item["volumes"]
      ? item["volumes"]
      : nGroupCGPropertyVolumeArrayDeserializer(item["volumes"]),
    containers: !item["containers"]
      ? item["containers"]
      : nGroupCGPropertyContainerArrayDeserializer(item["containers"]),
  };
}

export function nGroupCGPropertyVolumeArraySerializer(
  result: Array<NGroupCGPropertyVolume>,
): any[] {
  return result.map((item) => {
    return nGroupCGPropertyVolumeSerializer(item);
  });
}

export function nGroupCGPropertyVolumeArrayDeserializer(
  result: Array<NGroupCGPropertyVolume>,
): any[] {
  return result.map((item) => {
    return nGroupCGPropertyVolumeDeserializer(item);
  });
}

/** Contains information about the volumes that can be mounted by Containers in the Container Groups. */
export interface NGroupCGPropertyVolume {
  /** The name of the volume. */
  name: string;
  /** The Azure File volume. */
  azureFile?: AzureFileVolume;
}

export function nGroupCGPropertyVolumeSerializer(item: NGroupCGPropertyVolume): any {
  return {
    name: item["name"],
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFileVolumeSerializer(item["azureFile"]),
  };
}

export function nGroupCGPropertyVolumeDeserializer(item: any): NGroupCGPropertyVolume {
  return {
    name: item["name"],
    azureFile: !item["azureFile"]
      ? item["azureFile"]
      : azureFileVolumeDeserializer(item["azureFile"]),
  };
}

export function nGroupCGPropertyContainerArraySerializer(
  result: Array<NGroupCGPropertyContainer>,
): any[] {
  return result.map((item) => {
    return nGroupCGPropertyContainerSerializer(item);
  });
}

export function nGroupCGPropertyContainerArrayDeserializer(
  result: Array<NGroupCGPropertyContainer>,
): any[] {
  return result.map((item) => {
    return nGroupCGPropertyContainerDeserializer(item);
  });
}

/** Container properties that can be provided with NGroups object. */
export interface NGroupCGPropertyContainer {
  /** container name */
  name?: string;
  /** container properties */
  properties?: NGroupCGPropertyContainerProperties;
}

export function nGroupCGPropertyContainerSerializer(item: NGroupCGPropertyContainer): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nGroupCGPropertyContainerPropertiesSerializer(item["properties"]),
  };
}

export function nGroupCGPropertyContainerDeserializer(item: any): NGroupCGPropertyContainer {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nGroupCGPropertyContainerPropertiesDeserializer(item["properties"]),
  };
}

/** container properties */
export interface NGroupCGPropertyContainerProperties {
  volumeMounts?: VolumeMount[];
}

export function nGroupCGPropertyContainerPropertiesSerializer(
  item: NGroupCGPropertyContainerProperties,
): any {
  return {
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
  };
}

export function nGroupCGPropertyContainerPropertiesDeserializer(
  item: any,
): NGroupCGPropertyContainerProperties {
  return {
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
  };
}

/** The provisioning state, which only appears in the response. */
export enum KnownNGroupProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** Migrating */
  Migrating = "Migrating",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownNGroupProvisioningState} can be used interchangeably with NGroupProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting \
 * **Migrating**: Migrating
 */
export type NGroupProvisioningState = string;

/** Used by the customer to specify the way to update the Container Groups in NGroup. */
export interface UpdateProfile {
  updateMode?: NGroupUpdateMode;
  /** This profile allows the customers to customize the rolling update. */
  rollingUpdateProfile?: UpdateProfileRollingUpdateProfile;
}

export function updateProfileSerializer(item: UpdateProfile): any {
  return {
    updateMode: item["updateMode"],
    rollingUpdateProfile: !item["rollingUpdateProfile"]
      ? item["rollingUpdateProfile"]
      : updateProfileRollingUpdateProfileSerializer(item["rollingUpdateProfile"]),
  };
}

export function updateProfileDeserializer(item: any): UpdateProfile {
  return {
    updateMode: item["updateMode"],
    rollingUpdateProfile: !item["rollingUpdateProfile"]
      ? item["rollingUpdateProfile"]
      : updateProfileRollingUpdateProfileDeserializer(item["rollingUpdateProfile"]),
  };
}

/** Known values of {@link NGroupUpdateMode} that the service accepts. */
export enum KnownNGroupUpdateMode {
  /** Manual */
  Manual = "Manual",
  /** Rolling */
  Rolling = "Rolling",
}

/** Type of NGroupUpdateMode */
export type NGroupUpdateMode = string;

/** This profile allows the customers to customize the rolling update. */
export interface UpdateProfileRollingUpdateProfile {
  /** Maximum percentage of total Container Groups which can be updated simultaneously by rolling update in one batch. */
  maxBatchPercent?: number;
  /** Maximum percentage of the updated Container Groups which can be in unhealthy state after each batch is updated. */
  maxUnhealthyPercent?: number;
  /** The wait time between batches after completing the one batch of the rolling update and starting the next batch. The time duration should be specified in ISO 8601 format for duration. */
  pauseTimeBetweenBatches?: string;
  /** Default is false. If set to true, the CGs will be updated in-place instead of creating new CG and deleting old ones. */
  inPlaceUpdate?: boolean;
}

export function updateProfileRollingUpdateProfileSerializer(
  item: UpdateProfileRollingUpdateProfile,
): any {
  return {
    maxBatchPercent: item["maxBatchPercent"],
    maxUnhealthyPercent: item["maxUnhealthyPercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    inPlaceUpdate: item["inPlaceUpdate"],
  };
}

export function updateProfileRollingUpdateProfileDeserializer(
  item: any,
): UpdateProfileRollingUpdateProfile {
  return {
    maxBatchPercent: item["maxBatchPercent"],
    maxUnhealthyPercent: item["maxUnhealthyPercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    inPlaceUpdate: item["inPlaceUpdate"],
  };
}

/** Identity for the NGroup. */
export interface NGroupIdentity {
  /** The principal id of the NGroup identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the NGroup. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the NGroup. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the NGroup. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the NGroup. */
  userAssignedIdentities?: Record<string, UserAssignedIdentities>;
}

export function nGroupIdentitySerializer(item: NGroupIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function nGroupIdentityDeserializer(item: any): NGroupIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordDeserializer(item["userAssignedIdentities"]),
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

/** Describes the NGroups resource. */
export interface NGroupPatch {
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
  /** The identity of the NGroup, if configured. */
  identity?: NGroupIdentity;
  /** The resource tags. */
  tags?: Record<string, string>;
  /** The zones for the NGroup. */
  zones?: string[];
  /** The elastic profile. */
  elasticProfile?: ElasticProfile;
  /** Provides options w.r.t allocation and management w.r.t certain placement policies. These utilize capabilities provided by the underlying Azure infrastructure. They are typically used for high availability scenarios. E.g., distributing CGs across fault domains. */
  placementProfile?: PlacementProfile;
  /** The Container Group Profiles that could be used in the NGroups resource. */
  containerGroupProfiles?: ContainerGroupProfileStub[];
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: NGroupProvisioningState;
  /** Used by the customer to specify the way to update the Container Groups in NGroup. */
  updateProfile?: UpdateProfile;
}

export function nGroupPatchSerializer(item: NGroupPatch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "elasticProfile",
      "placementProfile",
      "containerGroupProfiles",
      "updateProfile",
    ])
      ? undefined
      : _nGroupPatchPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : nGroupIdentitySerializer(item["identity"]),
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a NGroups list operation. */
export interface _NGroupsListResult {
  /** The NGroup items on this page */
  value: NGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nGroupsListResultDeserializer(item: any): _NGroupsListResult {
  return {
    value: nGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nGroupArraySerializer(result: Array<NGroup>): any[] {
  return result.map((item) => {
    return nGroupSerializer(item);
  });
}

export function nGroupArrayDeserializer(result: Array<NGroup>): any[] {
  return result.map((item) => {
    return nGroupDeserializer(item);
  });
}

/** A container group profile object */
export interface ContainerGroupProfile extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The availability zones. */
  zones?: string[];
  /** The SKU for a container group. */
  sku?: ContainerGroupSku;
  /** The encryption properties for a container group. */
  encryptionProperties?: EncryptionProperties;
  /** The containers within the container group. */
  containers?: Container[];
  /** The init containers for a container group. */
  initContainers?: InitContainerDefinition[];
  /** extensions used by virtual kubelet */
  extensions?: DeploymentExtensionSpec[];
  /** The image registry credentials by which the container group is created from. */
  imageRegistryCredentials?: ImageRegistryCredential[];
  /**
   * Restart policy for all containers within the container group.
   * - `Always` Always restart
   * - `OnFailure` Restart on failure
   * - `Never` Never restart
   */
  restartPolicy?: ContainerGroupRestartPolicy;
  /** Shutdown grace period for containers in a container group. */
  shutdownGracePeriod?: Date;
  /** The IP address type of the container group. */
  ipAddress?: IpAddress;
  /** Post completion time to live for containers of a CG */
  timeToLive?: Date;
  /** The operating system type required by the containers in the container group. */
  osType?: OperatingSystemTypes;
  /** The list of volumes that can be mounted by containers in this container group. */
  volumes?: Volume[];
  /** The diagnostic information for a container group. */
  diagnostics?: ContainerGroupDiagnostics;
  /** The priority of the container group. */
  priority?: ContainerGroupPriority;
  /** The properties for confidential container group */
  confidentialComputeProperties?: ConfidentialComputeProperties;
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
  /** Container group profile current revision number */
  readonly revision?: number;
  /** Registered revisions are calculated at request time based off the records in the table logs. */
  readonly registeredRevisions?: number[];
  /** Gets or sets Krypton use property. */
  useKrypton?: boolean;
}

export function containerGroupProfileSerializer(item: ContainerGroupProfile): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sku",
      "encryptionProperties",
      "containers",
      "initContainers",
      "extensions",
      "imageRegistryCredentials",
      "restartPolicy",
      "shutdownGracePeriod",
      "ipAddress",
      "timeToLive",
      "osType",
      "volumes",
      "diagnostics",
      "priority",
      "confidentialComputeProperties",
      "securityContext",
      "useKrypton",
    ])
      ? undefined
      : _containerGroupProfilePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function containerGroupProfileDeserializer(item: any): ContainerGroupProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _containerGroupProfilePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The container group profile properties */
export interface ContainerGroupProfileProperties {
  /** The SKU for a container group. */
  sku?: ContainerGroupSku;
  /** The encryption properties for a container group. */
  encryptionProperties?: EncryptionProperties;
  /** The containers within the container group. */
  containers: Container[];
  /** The init containers for a container group. */
  initContainers?: InitContainerDefinition[];
  /** extensions used by virtual kubelet */
  extensions?: DeploymentExtensionSpec[];
  /** The image registry credentials by which the container group is created from. */
  imageRegistryCredentials?: ImageRegistryCredential[];
  /**
   * Restart policy for all containers within the container group.
   * - `Always` Always restart
   * - `OnFailure` Restart on failure
   * - `Never` Never restart
   */
  restartPolicy?: ContainerGroupRestartPolicy;
  /** Shutdown grace period for containers in a container group. */
  shutdownGracePeriod?: Date;
  /** The IP address type of the container group. */
  ipAddress?: IpAddress;
  /** Post completion time to live for containers of a CG */
  timeToLive?: Date;
  /** The operating system type required by the containers in the container group. */
  osType: OperatingSystemTypes;
  /** The list of volumes that can be mounted by containers in this container group. */
  volumes?: Volume[];
  /** The diagnostic information for a container group. */
  diagnostics?: ContainerGroupDiagnostics;
  /** The priority of the container group. */
  priority?: ContainerGroupPriority;
  /** The properties for confidential container group */
  confidentialComputeProperties?: ConfidentialComputeProperties;
  /** The container security properties. */
  securityContext?: SecurityContextDefinition;
  /** Container group profile current revision number */
  readonly revision?: number;
  /** Registered revisions are calculated at request time based off the records in the table logs. */
  readonly registeredRevisions?: number[];
  /** Gets or sets Krypton use property. */
  useKrypton?: boolean;
}

export function containerGroupProfilePropertiesSerializer(
  item: ContainerGroupProfileProperties,
): any {
  return {
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    containers: containerArraySerializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArraySerializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArraySerializer(item["extensions"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArraySerializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    shutdownGracePeriod: !item["shutdownGracePeriod"]
      ? item["shutdownGracePeriod"]
      : item["shutdownGracePeriod"].toISOString(),
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressSerializer(item["ipAddress"]),
    timeToLive: !item["timeToLive"] ? item["timeToLive"] : item["timeToLive"].toISOString(),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsSerializer(item["diagnostics"]),
    priority: item["priority"],
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesSerializer(item["confidentialComputeProperties"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
    useKrypton: item["useKrypton"],
  };
}

export function containerGroupProfilePropertiesDeserializer(
  item: any,
): ContainerGroupProfileProperties {
  return {
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesDeserializer(item["encryptionProperties"]),
    containers: containerArrayDeserializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArrayDeserializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArrayDeserializer(item["extensions"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArrayDeserializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    shutdownGracePeriod: !item["shutdownGracePeriod"]
      ? item["shutdownGracePeriod"]
      : new Date(item["shutdownGracePeriod"]),
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressDeserializer(item["ipAddress"]),
    timeToLive: !item["timeToLive"] ? item["timeToLive"] : new Date(item["timeToLive"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsDeserializer(item["diagnostics"]),
    priority: item["priority"],
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesDeserializer(item["confidentialComputeProperties"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
    revision: item["revision"],
    registeredRevisions: !item["registeredRevisions"]
      ? item["registeredRevisions"]
      : item["registeredRevisions"].map((p: any) => {
          return p;
        }),
    useKrypton: item["useKrypton"],
  };
}

/** The response of a ContainerGroupProfile list operation. */
export interface _ContainerGroupProfileListResult {
  /** The ContainerGroupProfile items on this page */
  value: ContainerGroupProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerGroupProfileListResultDeserializer(
  item: any,
): _ContainerGroupProfileListResult {
  return {
    value: containerGroupProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerGroupProfileArraySerializer(result: Array<ContainerGroupProfile>): any[] {
  return result.map((item) => {
    return containerGroupProfileSerializer(item);
  });
}

export function containerGroupProfileArrayDeserializer(
  result: Array<ContainerGroupProfile>,
): any[] {
  return result.map((item) => {
    return containerGroupProfileDeserializer(item);
  });
}

/** Properties of container group profile that need to be patched */
export interface ContainerGroupProfilePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function containerGroupProfilePatchSerializer(item: ContainerGroupProfilePatch): any {
  return { tags: item["tags"] };
}

/** The response of a SandboxGroup list operation. */
export interface _SandboxGroupListResult {
  /** The SandboxGroup items on this page */
  value: SandboxGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sandboxGroupListResultDeserializer(item: any): _SandboxGroupListResult {
  return {
    value: sandboxGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sandboxGroupArraySerializer(result: Array<SandboxGroup>): any[] {
  return result.map((item) => {
    return sandboxGroupSerializer(item);
  });
}

export function sandboxGroupArrayDeserializer(result: Array<SandboxGroup>): any[] {
  return result.map((item) => {
    return sandboxGroupDeserializer(item);
  });
}

/** A SandboxGroup tracked resource. */
export interface SandboxGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SandboxGroupProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function sandboxGroupSerializer(item: SandboxGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sandboxGroupPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function sandboxGroupDeserializer(item: any): SandboxGroup {
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
      : sandboxGroupPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a SandboxGroup. */
export interface SandboxGroupProperties {
  /** The status of the last operation. */
  readonly provisioningState?: SandboxGroupProvisioningState;
  /** The network profile of the SandboxGroup. */
  networkProfile?: SandboxGroupNetworkProfile;
  /** The ARM resource ID of the management resource group associated with this SandboxGroup. */
  readonly managementResourceGroupId?: string;
}

export function sandboxGroupPropertiesSerializer(item: SandboxGroupProperties): any {
  return {
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : sandboxGroupNetworkProfileSerializer(item["networkProfile"]),
  };
}

export function sandboxGroupPropertiesDeserializer(item: any): SandboxGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : sandboxGroupNetworkProfileDeserializer(item["networkProfile"]),
    managementResourceGroupId: item["managementResourceGroupId"],
  };
}

/** The provisioning state of a SandboxGroup resource. */
export enum KnownSandboxGroupProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The resource provisioning request was accepted but not yet started. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of a SandboxGroup resource. \
 * {@link KnownSandboxGroupProvisioningState} can be used interchangeably with SandboxGroupProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted. \
 * **Accepted**: The resource provisioning request was accepted but not yet started.
 */
export type SandboxGroupProvisioningState = string;

/** The network profile for a SandboxGroup. */
export interface SandboxGroupNetworkProfile {
  /** The list of subnets associated with the SandboxGroup. */
  subnets?: SubnetReference[];
}

export function sandboxGroupNetworkProfileSerializer(item: SandboxGroupNetworkProfile): any {
  return {
    subnets: !item["subnets"] ? item["subnets"] : subnetReferenceArraySerializer(item["subnets"]),
  };
}

export function sandboxGroupNetworkProfileDeserializer(item: any): SandboxGroupNetworkProfile {
  return {
    subnets: !item["subnets"] ? item["subnets"] : subnetReferenceArrayDeserializer(item["subnets"]),
  };
}

export function subnetReferenceArraySerializer(result: Array<SubnetReference>): any[] {
  return result.map((item) => {
    return subnetReferenceSerializer(item);
  });
}

export function subnetReferenceArrayDeserializer(result: Array<SubnetReference>): any[] {
  return result.map((item) => {
    return subnetReferenceDeserializer(item);
  });
}

/** A reference to a subnet resource. */
export interface SubnetReference {
  /** The ARM resource ID of the subnet. The caller must have `Microsoft.Network/virtualNetworks/subnets/join/action` permission on this subnet (enforced via a linked access check at create/update time). */
  id: string;
}

export function subnetReferenceSerializer(item: SubnetReference): any {
  return { id: item["id"] };
}

export function subnetReferenceDeserializer(item: any): SubnetReference {
  return {
    id: item["id"],
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
export interface TrackedResource extends ArmResource {
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

/** The type used for updating a SandboxGroup resource. */
export interface SandboxGroupTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function sandboxGroupTagsUpdateSerializer(item: SandboxGroupTagsUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The result of getting an access token for a SandboxGroup. */
export interface SandboxGroupAccessToken {
  /** The endpoint URL to use with the access token. */
  endpoint: string;
  /** The access token used to authenticate against the endpoint. */
  accessToken: string;
  /** The UTC date and time at which the access token expires. */
  notAfter: Date;
}

export function sandboxGroupAccessTokenDeserializer(item: any): SandboxGroupAccessToken {
  return {
    endpoint: item["endpoint"],
    accessToken: item["accessToken"],
    notAfter: new Date(item["notAfter"]),
  };
}

/** The logs. */
export interface Logs {
  /** The content of the log. */
  content?: string;
}

export function logsDeserializer(item: any): Logs {
  return {
    content: item["content"],
  };
}

/** The container exec request. */
export interface ContainerExecRequest {
  /** The command to be executed. */
  command?: string;
  /** The size of the terminal. */
  terminalSize?: ContainerExecRequestTerminalSize;
}

export function containerExecRequestSerializer(item: ContainerExecRequest): any {
  return {
    command: item["command"],
    terminalSize: !item["terminalSize"]
      ? item["terminalSize"]
      : containerExecRequestTerminalSizeSerializer(item["terminalSize"]),
  };
}

/** The size of the terminal. */
export interface ContainerExecRequestTerminalSize {
  /** The row size of the terminal */
  rows?: number;
  /** The column size of the terminal */
  cols?: number;
}

export function containerExecRequestTerminalSizeSerializer(
  item: ContainerExecRequestTerminalSize,
): any {
  return { rows: item["rows"], cols: item["cols"] };
}

/** The information for the container exec command. */
export interface ContainerExecResponse {
  /** The uri for the exec websocket. */
  webSocketUri?: string;
  /** The password to start the exec command. */
  password?: string;
}

export function containerExecResponseDeserializer(item: any): ContainerExecResponse {
  return {
    webSocketUri: item["webSocketUri"],
    password: item["password"],
  };
}

/** The information for the output stream from container attach. */
export interface ContainerAttachResponse {
  /** The uri for the output stream from the attach. */
  webSocketUri?: string;
  /** The password to the output stream from the attach. Send as an Authorization header value when connecting to the websocketUri. */
  password?: string;
}

export function containerAttachResponseDeserializer(item: any): ContainerAttachResponse {
  return {
    webSocketUri: item["webSocketUri"],
    password: item["password"],
  };
}

/** The response containing the usage data */
export interface _UsageListResult {
  /** The usage data. */
  readonly value?: Usage[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _usageListResultDeserializer(item: any): _UsageListResult {
  return {
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** A single usage result */
export interface Usage {
  /** Id of the usage result */
  readonly id?: string;
  /** Unit of the usage result */
  readonly unit?: string;
  /** The current usage of the resource */
  readonly currentValue?: number;
  /** The maximum permitted usage of the resource. */
  readonly limit?: number;
  /** The name object of the resource */
  readonly name?: UsageName;
}

export function usageDeserializer(item: any): Usage {
  return {
    id: item["id"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
  };
}

/** The name object of the resource */
export interface UsageName {
  /** The name of the resource */
  readonly value?: string;
  /** The localized name of the resource */
  readonly localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The response containing cached images. */
export interface _CachedImagesListResult {
  /** The cached images. */
  value?: CachedImages[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _cachedImagesListResultDeserializer(item: any): _CachedImagesListResult {
  return {
    value: !item["value"] ? item["value"] : cachedImagesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cachedImagesArrayDeserializer(result: Array<CachedImages>): any[] {
  return result.map((item) => {
    return cachedImagesDeserializer(item);
  });
}

/** The cached image and OS type. */
export interface CachedImages {
  /** The OS type of the cached image. */
  osType: string;
  /** The cached image name. */
  image: string;
}

export function cachedImagesDeserializer(item: any): CachedImages {
  return {
    osType: item["osType"],
    image: item["image"],
  };
}

/** The response containing list of capabilities. */
export interface _CapabilitiesListResult {
  /** The list of capabilities. */
  value?: Capabilities[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _capabilitiesListResultDeserializer(item: any): _CapabilitiesListResult {
  return {
    value: !item["value"] ? item["value"] : capabilitiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilitiesArrayDeserializer(result: Array<Capabilities>): any[] {
  return result.map((item) => {
    return capabilitiesDeserializer(item);
  });
}

/** The regional capabilities. */
export interface Capabilities {
  /** The resource type that this capability describes. */
  readonly resourceType?: string;
  /** The OS type that this capability describes. */
  readonly osType?: string;
  /** The resource location. */
  readonly location?: string;
  /** The ip address type that this capability describes. */
  readonly ipAddressType?: string;
  /** The GPU sku that this capability describes. */
  readonly gpu?: string;
  /** The supported capabilities. */
  readonly capabilities?: CapabilitiesCapabilities;
}

export function capabilitiesDeserializer(item: any): Capabilities {
  return {
    resourceType: item["resourceType"],
    osType: item["osType"],
    location: item["location"],
    ipAddressType: item["ipAddressType"],
    gpu: item["gpu"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilitiesCapabilitiesDeserializer(item["capabilities"]),
  };
}

/** The supported capabilities. */
export interface CapabilitiesCapabilities {
  /** The maximum allowed memory request in GB. */
  readonly maxMemoryInGB?: number;
  /** The maximum allowed CPU request in cores. */
  readonly maxCpu?: number;
  /** The maximum allowed GPU count. */
  readonly maxGpuCount?: number;
}

export function capabilitiesCapabilitiesDeserializer(item: any): CapabilitiesCapabilities {
  return {
    maxMemoryInGB: item["maxMemoryInGB"],
    maxCpu: item["maxCpu"],
    maxGpuCount: item["maxGpuCount"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-01 API version. */
  V20250901 = "2025-09-01",
  /** The 2026-06-01-preview API version. */
  V20260601Preview = "2026-06-01-preview",
}

export function _containerPropertiesSerializer(item: Container): any {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    ports: !item["ports"] ? item["ports"] : containerPortArraySerializer(item["ports"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
    resources: !item["resources"]
      ? item["resources"]
      : resourceRequirementsSerializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : containerProbeSerializer(item["livenessProbe"]),
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : containerProbeSerializer(item["readinessProbe"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
    configMap: !item["configMap"] ? item["configMap"] : configMapSerializer(item["configMap"]),
  };
}

export function _containerPropertiesDeserializer(item: any) {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    ports: !item["ports"] ? item["ports"] : containerPortArrayDeserializer(item["ports"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : containerPropertiesInstanceViewDeserializer(item["instanceView"]),
    resources: !item["resources"]
      ? item["resources"]
      : resourceRequirementsDeserializer(item["resources"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : containerProbeDeserializer(item["livenessProbe"]),
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : containerProbeDeserializer(item["readinessProbe"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
    configMap: !item["configMap"] ? item["configMap"] : configMapDeserializer(item["configMap"]),
  };
}

export function _initContainerDefinitionPropertiesSerializer(item: InitContainerDefinition): any {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
  };
}

export function _initContainerDefinitionPropertiesDeserializer(item: any) {
  return {
    image: item["image"],
    command: !item["command"]
      ? item["command"]
      : item["command"].map((p: any) => {
          return p;
        }),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : initContainerPropertiesDefinitionInstanceViewDeserializer(item["instanceView"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
  };
}

export function _deploymentExtensionSpecPropertiesSerializer(item: DeploymentExtensionSpec): any {
  return {
    extensionType: item["extensionType"],
    version: item["version"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

export function _deploymentExtensionSpecPropertiesDeserializer(item: any) {
  return {
    extensionType: item["extensionType"],
    version: item["version"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

export function _containerGroupPropertiesSerializer(item: ContainerGroup): any {
  return {
    secretReferences: !item["secretReferences"]
      ? item["secretReferences"]
      : secretReferenceArraySerializer(item["secretReferences"]),
    containers: containerArraySerializer(item["containers"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArraySerializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressSerializer(item["ipAddress"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsSerializer(item["diagnostics"]),
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArraySerializer(item["subnetIds"]),
    dnsConfig: !item["dnsConfig"]
      ? item["dnsConfig"]
      : dnsConfigurationSerializer(item["dnsConfig"]),
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArraySerializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArraySerializer(item["extensions"]),
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesSerializer(item["confidentialComputeProperties"]),
    priority: item["priority"],
    identityAcls: !item["identityAcls"]
      ? item["identityAcls"]
      : identityAclsSerializer(item["identityAcls"]),
    containerGroupProfile: !item["containerGroupProfile"]
      ? item["containerGroupProfile"]
      : containerGroupProfileReferenceDefinitionSerializer(item["containerGroupProfile"]),
    standbyPoolProfile: !item["standbyPoolProfile"]
      ? item["standbyPoolProfile"]
      : standbyPoolProfileDefinitionSerializer(item["standbyPoolProfile"]),
  };
}

export function _containerGroupPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    secretReferences: !item["secretReferences"]
      ? item["secretReferences"]
      : secretReferenceArrayDeserializer(item["secretReferences"]),
    containers: containerArrayDeserializer(item["containers"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArrayDeserializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressDeserializer(item["ipAddress"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : containerGroupPropertiesPropertiesInstanceViewDeserializer(item["instanceView"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsDeserializer(item["diagnostics"]),
    subnetIds: !item["subnetIds"]
      ? item["subnetIds"]
      : containerGroupSubnetIdArrayDeserializer(item["subnetIds"]),
    dnsConfig: !item["dnsConfig"]
      ? item["dnsConfig"]
      : dnsConfigurationDeserializer(item["dnsConfig"]),
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesDeserializer(item["encryptionProperties"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArrayDeserializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArrayDeserializer(item["extensions"]),
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesDeserializer(item["confidentialComputeProperties"]),
    priority: item["priority"],
    identityAcls: !item["identityAcls"]
      ? item["identityAcls"]
      : identityAclsDeserializer(item["identityAcls"]),
    containerGroupProfile: !item["containerGroupProfile"]
      ? item["containerGroupProfile"]
      : containerGroupProfileReferenceDefinitionDeserializer(item["containerGroupProfile"]),
    standbyPoolProfile: !item["standbyPoolProfile"]
      ? item["standbyPoolProfile"]
      : standbyPoolProfileDefinitionDeserializer(item["standbyPoolProfile"]),
    isCreatedFromStandbyPool: item["isCreatedFromStandbyPool"],
  };
}

export function _nGroupPropertiesSerializer(item: NGroup): any {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileSerializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileSerializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArraySerializer(item["containerGroupProfiles"]),
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileSerializer(item["updateProfile"]),
  };
}

export function _nGroupPropertiesDeserializer(item: any) {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileDeserializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileDeserializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArrayDeserializer(item["containerGroupProfiles"]),
    provisioningState: item["provisioningState"],
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileDeserializer(item["updateProfile"]),
  };
}

export function _nGroupPatchPropertiesSerializer(item: NGroupPatch): any {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileSerializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileSerializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArraySerializer(item["containerGroupProfiles"]),
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileSerializer(item["updateProfile"]),
  };
}

export function _nGroupPatchPropertiesDeserializer(item: any) {
  return {
    elasticProfile: !item["elasticProfile"]
      ? item["elasticProfile"]
      : elasticProfileDeserializer(item["elasticProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileDeserializer(item["placementProfile"]),
    containerGroupProfiles: !item["containerGroupProfiles"]
      ? item["containerGroupProfiles"]
      : containerGroupProfileStubArrayDeserializer(item["containerGroupProfiles"]),
    provisioningState: item["provisioningState"],
    updateProfile: !item["updateProfile"]
      ? item["updateProfile"]
      : updateProfileDeserializer(item["updateProfile"]),
  };
}

export function _containerGroupProfilePropertiesSerializer(item: ContainerGroupProfile): any {
  return {
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArraySerializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArraySerializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArraySerializer(item["extensions"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArraySerializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    shutdownGracePeriod: !item["shutdownGracePeriod"]
      ? item["shutdownGracePeriod"]
      : item["shutdownGracePeriod"].toISOString(),
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressSerializer(item["ipAddress"]),
    timeToLive: !item["timeToLive"] ? item["timeToLive"] : item["timeToLive"].toISOString(),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArraySerializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsSerializer(item["diagnostics"]),
    priority: item["priority"],
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesSerializer(item["confidentialComputeProperties"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionSerializer(item["securityContext"]),
    useKrypton: item["useKrypton"],
  };
}

export function _containerGroupProfilePropertiesDeserializer(item: any) {
  return {
    sku: item["sku"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesDeserializer(item["encryptionProperties"]),
    containers: !item["containers"]
      ? item["containers"]
      : containerArrayDeserializer(item["containers"]),
    initContainers: !item["initContainers"]
      ? item["initContainers"]
      : initContainerDefinitionArrayDeserializer(item["initContainers"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionSpecArrayDeserializer(item["extensions"]),
    imageRegistryCredentials: !item["imageRegistryCredentials"]
      ? item["imageRegistryCredentials"]
      : imageRegistryCredentialArrayDeserializer(item["imageRegistryCredentials"]),
    restartPolicy: item["restartPolicy"],
    shutdownGracePeriod: !item["shutdownGracePeriod"]
      ? item["shutdownGracePeriod"]
      : new Date(item["shutdownGracePeriod"]),
    ipAddress: !item["ipAddress"] ? item["ipAddress"] : ipAddressDeserializer(item["ipAddress"]),
    timeToLive: !item["timeToLive"] ? item["timeToLive"] : new Date(item["timeToLive"]),
    osType: item["osType"],
    volumes: !item["volumes"] ? item["volumes"] : volumeArrayDeserializer(item["volumes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : containerGroupDiagnosticsDeserializer(item["diagnostics"]),
    priority: item["priority"],
    confidentialComputeProperties: !item["confidentialComputeProperties"]
      ? item["confidentialComputeProperties"]
      : confidentialComputePropertiesDeserializer(item["confidentialComputeProperties"]),
    securityContext: !item["securityContext"]
      ? item["securityContext"]
      : securityContextDefinitionDeserializer(item["securityContext"]),
    revision: item["revision"],
    registeredRevisions: !item["registeredRevisions"]
      ? item["registeredRevisions"]
      : item["registeredRevisions"].map((p: any) => {
          return p;
        }),
    useKrypton: item["useKrypton"],
  };
}

export type ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse = { body: string[] };
