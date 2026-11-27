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

/** A DigitalAssets ZKP rollup resource. */
export interface ZkpRollup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ZkpRollupProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function zkpRollupSerializer(item: ZkpRollup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : zkpRollupPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function zkpRollupDeserializer(item: any): ZkpRollup {
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
      : zkpRollupPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Details of the DigitalAssets ZkpRollup. */
export interface ZkpRollupProperties {
  /** Rollup-level owner accounts used for contract discovery. Updates affect future discovery after configuration is applied; existing checkpoints and discovered contracts are preserved. */
  tokenOwnerAccounts: string[];
  /** The fully qualified resource ID of the customer Key Vault used to resolve Besu node private keys. Required on PUT and immutable after creation. */
  keyVaultId: string;
  /** User-assigned managed identity resource ID used for customer Key Vault reads. Immutable after creation; this identity must remain attached to the rollup. */
  keyVaultUserAssignedIdentityResourceId: string;
  /** Number of L2 blocks batched into a single proof. Must be a power of 2 (runtime-enforced). Immutable after create; changing it requires deleting and recreating the rollup. Default is 2 when omitted on create. */
  blocksPerProof?: number;
  /** Public IPv4 address of the customer's VPN device. Set on create and immutable afterward. */
  customerVpnPublicIp?: string;
  /** Customer on-premises address prefixes reachable across the VPN tunnel (the Local Network Gateway address space). Must not overlap the RP-reserved 10.128.0.0/10 block. Set on create and immutable afterward. */
  customerOnPremAddressPrefixes?: string[];
  /** Read-only public IP address of this service's VPN Gateway. This is the far-end address the customer configures on their Local Network Gateway and Site-to-Site VPN connection. Populated once the service's VPN tunnel is provisioned. */
  readonly serviceVpnPublicIp?: string;
  /** Read-only address space (a /21 CIDR, e.g. 10.160.0.0/21) assigned to this service's end of the VPN tunnel. Populated once the service's VPN tunnel is provisioned. */
  readonly serviceVpnAddressSpace?: string;
  /** Enode id (public key) of the customer's L2 Besu boot node. Required on PUT. Updates reconcile the existing partition and must remain on the same ledger. */
  bootNodeId: string;
  /** Private IPv4 address of the customer's L2 Besu boot node. Required on PUT. Updates reconcile the existing partition. */
  bootNodeIp: string;
  /** P2P (devp2p) port of the customer's L2 Besu boot node. Required on PUT. Updates reconcile the existing partition. */
  bootNodeP2PPort: number;
  /** JSON-RPC (HTTP) port of the customer's L2 Besu boot node. Required on PUT. Updates reconcile the existing partition. */
  bootNodeRpcPort: number;
  /** URL of the customer-provided Service Bus namespace to which proofs are published. Required on PUT. Set only on initial creation; cannot be changed by PUT or PATCH. */
  serviceBusEndpoint: string;
  /** Name of the customer-provided Service Bus queue to which proofs are published. Required on PUT. Set only on initial creation; cannot be changed by PUT or PATCH. */
  serviceBusQueueName: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Operational status of the rollup. */
  readonly operationalStatus?: OperationalStatus;
}

export function zkpRollupPropertiesSerializer(item: ZkpRollupProperties): any {
  return {
    tokenOwnerAccounts: item["tokenOwnerAccounts"].map((p: any) => {
      return p;
    }),
    keyVaultId: item["keyVaultId"],
    keyVaultUserAssignedIdentityResourceId: item["keyVaultUserAssignedIdentityResourceId"],
    blocksPerProof: item["blocksPerProof"],
    customerVpnPublicIp: item["customerVpnPublicIp"],
    customerOnPremAddressPrefixes: !item["customerOnPremAddressPrefixes"]
      ? item["customerOnPremAddressPrefixes"]
      : item["customerOnPremAddressPrefixes"].map((p: any) => {
          return p;
        }),
    bootNodeId: item["bootNodeId"],
    bootNodeIp: item["bootNodeIp"],
    bootNodeP2pPort: item["bootNodeP2PPort"],
    bootNodeRpcPort: item["bootNodeRpcPort"],
    serviceBusEndpoint: item["serviceBusEndpoint"],
    serviceBusQueueName: item["serviceBusQueueName"],
  };
}

export function zkpRollupPropertiesDeserializer(item: any): ZkpRollupProperties {
  return {
    tokenOwnerAccounts: item["tokenOwnerAccounts"].map((p: any) => {
      return p;
    }),
    keyVaultId: item["keyVaultId"],
    keyVaultUserAssignedIdentityResourceId: item["keyVaultUserAssignedIdentityResourceId"],
    blocksPerProof: item["blocksPerProof"],
    customerVpnPublicIp: item["customerVpnPublicIp"],
    customerOnPremAddressPrefixes: !item["customerOnPremAddressPrefixes"]
      ? item["customerOnPremAddressPrefixes"]
      : item["customerOnPremAddressPrefixes"].map((p: any) => {
          return p;
        }),
    serviceVpnPublicIp: item["serviceVpnPublicIp"],
    serviceVpnAddressSpace: item["serviceVpnAddressSpace"],
    bootNodeId: item["bootNodeId"],
    bootNodeIp: item["bootNodeIp"],
    bootNodeP2PPort: item["bootNodeP2pPort"],
    bootNodeRpcPort: item["bootNodeRpcPort"],
    serviceBusEndpoint: item["serviceBusEndpoint"],
    serviceBusQueueName: item["serviceBusQueueName"],
    provisioningState: item["provisioningState"],
    operationalStatus: !item["operationalStatus"]
      ? item["operationalStatus"]
      : operationalStatusDeserializer(item["operationalStatus"]),
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Initial provisioning in progress */
  Provisioning = "Provisioning",
  /** Update in progress */
  Updating = "Updating",
  /** Deletion in progress */
  Deleting = "Deleting",
  /** Change accepted for processing */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Initial provisioning in progress \
 * **Updating**: Update in progress \
 * **Deleting**: Deletion in progress \
 * **Accepted**: Change accepted for processing
 */
export type ProvisioningState = string;

/** Represents the operational status of the resource. */
export interface OperationalStatus {
  /** The current state of the operational status. */
  status: string;
  /** The timestamp of the last status evaluation. */
  evaluatedAt: Date;
  /** The timestamp until which the current status is considered valid. */
  validUntil: Date;
}

export function operationalStatusDeserializer(item: any): OperationalStatus {
  return {
    status: item["status"],
    evaluatedAt: new Date(item["evaluatedAt"]),
    validUntil: new Date(item["validUntil"]),
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

/** Rollup update payload. Omitted fields are preserved. Configuration changes may restart partition containers; tags and identity-only changes complete synchronously. */
export interface ZkpRollupUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed-identity attachment changes. */
  identity?: ZkpRollupIdentityUpdate;
  /** Mutable rollup configuration fields. */
  properties?: ZkpRollupPatchProperties;
}

export function zkpRollupUpdateSerializer(item: ZkpRollupUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : zkpRollupIdentityUpdateSerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : zkpRollupPatchPropertiesSerializer(item["properties"]),
  };
}

/** Partial managed-identity update. Omitted attachments remain; object entries add or retain an identity and null entries remove it. The selected Key Vault identity must remain attached. */
export interface ZkpRollupIdentityUpdate {
  /** The type of managed identity assigned to this resource. */
  type?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function zkpRollupIdentityUpdateSerializer(item: ZkpRollupIdentityUpdate): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

/** Properties that may be updated via PATCH on a ZkpRollup. */
export interface ZkpRollupPatchProperties {
  /** Replacement list of owner accounts for future contract discovery. Omission preserves the current list; existing checkpoints and discovered contracts are retained. */
  tokenOwnerAccounts?: string[];
  /** Replacement boot-node public key on the same ledger. Omission preserves the current value. */
  bootNodeId?: string;
  /** Replacement boot-node IPv4 address. Omission preserves the current value. */
  bootNodeIp?: string;
  /** Replacement boot-node P2P port. Omission preserves the current value. */
  bootNodeP2PPort?: number;
  /** Replacement boot-node JSON-RPC port. Omission preserves the current value. */
  bootNodeRpcPort?: number;
}

export function zkpRollupPatchPropertiesSerializer(item: ZkpRollupPatchProperties): any {
  return {
    tokenOwnerAccounts: !item["tokenOwnerAccounts"]
      ? item["tokenOwnerAccounts"]
      : item["tokenOwnerAccounts"].map((p: any) => {
          return p;
        }),
    bootNodeId: item["bootNodeId"],
    bootNodeIp: item["bootNodeIp"],
    bootNodeP2pPort: item["bootNodeP2PPort"],
    bootNodeRpcPort: item["bootNodeRpcPort"],
  };
}

/** The response of a ZkpRollup list operation. */
export interface _ZkpRollupListResult {
  /** The ZkpRollup items on this page */
  value: ZkpRollup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _zkpRollupListResultDeserializer(item: any): _ZkpRollupListResult {
  return {
    value: zkpRollupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function zkpRollupArraySerializer(result: Array<ZkpRollup>): any[] {
  return result.map((item) => {
    return zkpRollupSerializer(item);
  });
}

export function zkpRollupArrayDeserializer(result: Array<ZkpRollup>): any[] {
  return result.map((item) => {
    return zkpRollupDeserializer(item);
  });
}

/** A deployable partition of a ZkpRollup. */
export interface Partition extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PartitionProperties;
}

export function partitionSerializer(item: Partition): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : partitionPropertiesSerializer(item["properties"]),
  };
}

export function partitionDeserializer(item: any): Partition {
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
      : partitionPropertiesDeserializer(item["properties"]),
  };
}

/** Read-only status properties of a ZkpRollup partition. In Public Preview, shared service configuration comes from the parent rollup. The partition name and location select the deployment, so no writable service-specific properties are needed. PATCH updates tags only. */
export interface PartitionProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Operational status of the partition. */
  readonly operationalStatus?: OperationalStatus;
}

export function partitionPropertiesSerializer(_item: PartitionProperties): any {
  return {};
}

export function partitionPropertiesDeserializer(item: any): PartitionProperties {
  return {
    provisioningState: item["provisioningState"],
    operationalStatus: !item["operationalStatus"]
      ? item["operationalStatus"]
      : operationalStatusDeserializer(item["operationalStatus"]),
  };
}

/** The type used for updating tags in Partition resources. */
export interface PartitionTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function partitionTagsUpdateSerializer(item: PartitionTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Partition list operation. */
export interface _PartitionListResult {
  /** The Partition items on this page */
  value: Partition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partitionListResultDeserializer(item: any): _PartitionListResult {
  return {
    value: partitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partitionArraySerializer(result: Array<Partition>): any[] {
  return result.map((item) => {
    return partitionSerializer(item);
  });
}

export function partitionArrayDeserializer(result: Array<Partition>): any[] {
  return result.map((item) => {
    return partitionDeserializer(item);
  });
}

/** Supported API versions for DigitalAssets. */
export enum KnownApiVersion {
  /** The 2025-09-01 preview API version. */
  V20250901Preview = "2025-09-01-preview",
}
