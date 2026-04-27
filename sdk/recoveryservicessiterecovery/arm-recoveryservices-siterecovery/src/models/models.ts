// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Recovery point for a migration item. */
export interface MigrationRecoveryPoint extends ProxyResource {
  /** Recovery point properties. */
  properties?: MigrationRecoveryPointProperties;
  /** Resource Location */
  location?: string;
}

export function migrationRecoveryPointDeserializer(item: any): MigrationRecoveryPoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationRecoveryPointPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Migration item recovery point properties. */
export interface MigrationRecoveryPointProperties {
  /** The recovery point time. */
  readonly recoveryPointTime?: Date;
  /** The recovery point type. */
  readonly recoveryPointType?: MigrationRecoveryPointType;
}

export function migrationRecoveryPointPropertiesDeserializer(
  item: any,
): MigrationRecoveryPointProperties {
  return {
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    recoveryPointType: item["recoveryPointType"],
  };
}

/** The recovery point type. */
export enum KnownMigrationRecoveryPointType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** ApplicationConsistent */
  ApplicationConsistent = "ApplicationConsistent",
  /** CrashConsistent */
  CrashConsistent = "CrashConsistent",
}

/**
 * The recovery point type. \
 * {@link KnownMigrationRecoveryPointType} can be used interchangeably with MigrationRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **ApplicationConsistent**: ApplicationConsistent \
 * **CrashConsistent**: CrashConsistent
 */
export type MigrationRecoveryPointType = string;

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

/** Collection of migration recovery points. */
export interface _MigrationRecoveryPointCollection {
  /** The MigrationRecoveryPoint items on this page */
  value: MigrationRecoveryPoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationRecoveryPointCollectionDeserializer(
  item: any,
): _MigrationRecoveryPointCollection {
  return {
    value: migrationRecoveryPointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationRecoveryPointArrayDeserializer(
  result: Array<MigrationRecoveryPoint>,
): any[] {
  return result.map((item) => {
    return migrationRecoveryPointDeserializer(item);
  });
}

/** Replication protected item. */
export interface ReplicationProtectedItem extends ProxyResource {
  /** The custom data. */
  properties?: ReplicationProtectedItemProperties;
  /** Resource Location */
  location?: string;
}

export function replicationProtectedItemDeserializer(item: any): ReplicationProtectedItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationProtectedItemPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Replication protected item custom data details. */
export interface ReplicationProtectedItemProperties {
  /** The name. */
  friendlyName?: string;
  /** The type of protected item type. */
  protectedItemType?: string;
  /** The protected item ARM Id. */
  protectableItemId?: string;
  /** The recovery provider ARM Id. */
  recoveryServicesProviderId?: string;
  /** The friendly name of the primary fabric. */
  primaryFabricFriendlyName?: string;
  /** The fabric provider of the primary fabric. */
  primaryFabricProvider?: string;
  /** The friendly name of recovery fabric. */
  recoveryFabricFriendlyName?: string;
  /** The Arm Id of recovery fabric. */
  recoveryFabricId?: string;
  /** The name of primary protection container friendly name. */
  primaryProtectionContainerFriendlyName?: string;
  /** The name of recovery container friendly name. */
  recoveryProtectionContainerFriendlyName?: string;
  /** The protection status. */
  protectionState?: string;
  /** The protection state description. */
  protectionStateDescription?: string;
  /** The Current active location of the PE. */
  activeLocation?: string;
  /** The Test failover state. */
  testFailoverState?: string;
  /** The Test failover state description. */
  testFailoverStateDescription?: string;
  /** The switch provider state. */
  switchProviderState?: string;
  /** The switch provider state description. */
  switchProviderStateDescription?: string;
  /** The allowed operations on the Replication protected item. */
  allowedOperations?: string[];
  /** The consolidated protection health for the VM taking any issues with SRS as well as all the replication units associated with the VM's replication group into account. This is a string representation of the ProtectionHealth enumeration. */
  replicationHealth?: string;
  /** The consolidated failover health for the VM. */
  failoverHealth?: string;
  /** List of health errors. */
  healthErrors?: HealthError[];
  /** The ID of Policy governing this PE. */
  policyId?: string;
  /** The name of Policy governing this PE. */
  policyFriendlyName?: string;
  /** The Last successful failover time. */
  lastSuccessfulFailoverTime?: Date;
  /** The Last successful test failover time. */
  lastSuccessfulTestFailoverTime?: Date;
  /** The current scenario. */
  currentScenario?: CurrentScenarioDetails;
  /** The recovery point ARM Id to which the Vm was failed over. */
  failoverRecoveryPointId?: string;
  /** The Replication provider custom settings. */
  providerSpecificDetails?: ReplicationProviderSpecificSettingsUnion;
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The correlation Id for events associated with this protected item. */
  eventCorrelationId?: string;
}

export function replicationProtectedItemPropertiesDeserializer(
  item: any,
): ReplicationProtectedItemProperties {
  return {
    friendlyName: item["friendlyName"],
    protectedItemType: item["protectedItemType"],
    protectableItemId: item["protectableItemId"],
    recoveryServicesProviderId: item["recoveryServicesProviderId"],
    primaryFabricFriendlyName: item["primaryFabricFriendlyName"],
    primaryFabricProvider: item["primaryFabricProvider"],
    recoveryFabricFriendlyName: item["recoveryFabricFriendlyName"],
    recoveryFabricId: item["recoveryFabricId"],
    primaryProtectionContainerFriendlyName: item["primaryProtectionContainerFriendlyName"],
    recoveryProtectionContainerFriendlyName: item["recoveryProtectionContainerFriendlyName"],
    protectionState: item["protectionState"],
    protectionStateDescription: item["protectionStateDescription"],
    activeLocation: item["activeLocation"],
    testFailoverState: item["testFailoverState"],
    testFailoverStateDescription: item["testFailoverStateDescription"],
    switchProviderState: item["switchProviderState"],
    switchProviderStateDescription: item["switchProviderStateDescription"],
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    replicationHealth: item["replicationHealth"],
    failoverHealth: item["failoverHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    policyId: item["policyId"],
    policyFriendlyName: item["policyFriendlyName"],
    lastSuccessfulFailoverTime: !item["lastSuccessfulFailoverTime"]
      ? item["lastSuccessfulFailoverTime"]
      : new Date(item["lastSuccessfulFailoverTime"]),
    lastSuccessfulTestFailoverTime: !item["lastSuccessfulTestFailoverTime"]
      ? item["lastSuccessfulTestFailoverTime"]
      : new Date(item["lastSuccessfulTestFailoverTime"]),
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsDeserializer(item["currentScenario"]),
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : replicationProviderSpecificSettingsUnionDeserializer(item["providerSpecificDetails"]),
    recoveryContainerId: item["recoveryContainerId"],
    eventCorrelationId: item["eventCorrelationId"],
  };
}

export function healthErrorArraySerializer(result: Array<HealthError>): any[] {
  return result.map((item) => {
    return healthErrorSerializer(item);
  });
}

export function healthErrorArrayDeserializer(result: Array<HealthError>): any[] {
  return result.map((item) => {
    return healthErrorDeserializer(item);
  });
}

/** Health Error. */
export interface HealthError {
  /** The inner health errors. HealthError having a list of HealthError as child errors is problematic. InnerHealthError is used because this will prevent an infinite loop of structures when Hydra tries to auto-generate the contract. We are exposing the related health errors as inner health errors and all API consumers can utilize this in the same fashion as Exception -&gt; InnerException. */
  innerHealthErrors?: InnerHealthError[];
  /** Source of error. */
  errorSource?: string;
  /** Type of error. */
  errorType?: string;
  /** Level of error. */
  errorLevel?: string;
  /** Category of error. */
  errorCategory?: string;
  /** Error code. */
  errorCode?: string;
  /** Summary message of the entity. */
  summaryMessage?: string;
  /** Error message. */
  errorMessage?: string;
  /** Possible causes of error. */
  possibleCauses?: string;
  /** Recommended action to resolve error. */
  recommendedAction?: string;
  /** Error creation time (UTC). */
  creationTimeUtc?: Date;
  /** DRA error message. */
  recoveryProviderErrorMessage?: string;
  /** ID of the entity. */
  entityId?: string;
  /** The health error unique id. */
  errorId?: string;
  /** Value indicating whether the health error is customer resolvable. */
  customerResolvability?: HealthErrorCustomerResolvability;
}

export function healthErrorSerializer(item: HealthError): any {
  return {
    innerHealthErrors: !item["innerHealthErrors"]
      ? item["innerHealthErrors"]
      : innerHealthErrorArraySerializer(item["innerHealthErrors"]),
    errorSource: item["errorSource"],
    errorType: item["errorType"],
    errorLevel: item["errorLevel"],
    errorCategory: item["errorCategory"],
    errorCode: item["errorCode"],
    summaryMessage: item["summaryMessage"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : item["creationTimeUtc"].toISOString(),
    recoveryProviderErrorMessage: item["recoveryProviderErrorMessage"],
    entityId: item["entityId"],
    errorId: item["errorId"],
    customerResolvability: item["customerResolvability"],
  };
}

export function healthErrorDeserializer(item: any): HealthError {
  return {
    innerHealthErrors: !item["innerHealthErrors"]
      ? item["innerHealthErrors"]
      : innerHealthErrorArrayDeserializer(item["innerHealthErrors"]),
    errorSource: item["errorSource"],
    errorType: item["errorType"],
    errorLevel: item["errorLevel"],
    errorCategory: item["errorCategory"],
    errorCode: item["errorCode"],
    summaryMessage: item["summaryMessage"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    recoveryProviderErrorMessage: item["recoveryProviderErrorMessage"],
    entityId: item["entityId"],
    errorId: item["errorId"],
    customerResolvability: item["customerResolvability"],
  };
}

export function innerHealthErrorArraySerializer(result: Array<InnerHealthError>): any[] {
  return result.map((item) => {
    return innerHealthErrorSerializer(item);
  });
}

export function innerHealthErrorArrayDeserializer(result: Array<InnerHealthError>): any[] {
  return result.map((item) => {
    return innerHealthErrorDeserializer(item);
  });
}

/** Implements InnerHealthError class. HealthError object has a list of InnerHealthErrors as child errors. InnerHealthError is used because this will prevent an infinite loop of structures when Hydra tries to auto-generate the contract. We are exposing the related health errors as inner health errors and all API consumers can utilize this in the same fashion as Exception -&gt; InnerException. */
export interface InnerHealthError {
  /** Source of error. */
  errorSource?: string;
  /** Type of error. */
  errorType?: string;
  /** Level of error. */
  errorLevel?: string;
  /** Category of error. */
  errorCategory?: string;
  /** Error code. */
  errorCode?: string;
  /** Summary message of the entity. */
  summaryMessage?: string;
  /** Error message. */
  errorMessage?: string;
  /** Possible causes of error. */
  possibleCauses?: string;
  /** Recommended action to resolve error. */
  recommendedAction?: string;
  /** Error creation time (UTC). */
  creationTimeUtc?: Date;
  /** DRA error message. */
  recoveryProviderErrorMessage?: string;
  /** ID of the entity. */
  entityId?: string;
  /** The health error unique id. */
  errorId?: string;
  /** Value indicating whether the health error is customer resolvable. */
  customerResolvability?: HealthErrorCustomerResolvability;
}

export function innerHealthErrorSerializer(item: InnerHealthError): any {
  return {
    errorSource: item["errorSource"],
    errorType: item["errorType"],
    errorLevel: item["errorLevel"],
    errorCategory: item["errorCategory"],
    errorCode: item["errorCode"],
    summaryMessage: item["summaryMessage"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : item["creationTimeUtc"].toISOString(),
    recoveryProviderErrorMessage: item["recoveryProviderErrorMessage"],
    entityId: item["entityId"],
    errorId: item["errorId"],
    customerResolvability: item["customerResolvability"],
  };
}

export function innerHealthErrorDeserializer(item: any): InnerHealthError {
  return {
    errorSource: item["errorSource"],
    errorType: item["errorType"],
    errorLevel: item["errorLevel"],
    errorCategory: item["errorCategory"],
    errorCode: item["errorCode"],
    summaryMessage: item["summaryMessage"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    recoveryProviderErrorMessage: item["recoveryProviderErrorMessage"],
    entityId: item["entityId"],
    errorId: item["errorId"],
    customerResolvability: item["customerResolvability"],
  };
}

/** Value indicating whether the health error is customer resolvable. */
export enum KnownHealthErrorCustomerResolvability {
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * Value indicating whether the health error is customer resolvable. \
 * {@link KnownHealthErrorCustomerResolvability} can be used interchangeably with HealthErrorCustomerResolvability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type HealthErrorCustomerResolvability = string;

/** Current scenario details of the protected entity. */
export interface CurrentScenarioDetails {
  /** Scenario name. */
  scenarioName?: string;
  /** ARM Id of the job being executed. */
  jobId?: string;
  /** Start time of the workflow. */
  startTime?: Date;
}

export function currentScenarioDetailsSerializer(item: CurrentScenarioDetails): any {
  return {
    scenarioName: item["scenarioName"],
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

export function currentScenarioDetailsDeserializer(item: any): CurrentScenarioDetails {
  return {
    scenarioName: item["scenarioName"],
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** Replication provider specific settings. */
export interface ReplicationProviderSpecificSettings {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2ACrossClusterMigration, A2A, HyperVReplicaAzure, HyperVReplicaBaseReplicationDetails, HyperVReplica2012R2, HyperVReplica2012, InMageAzureV2, InMageRcmFailback, InMageRcm, InMage */
  instanceType: string;
}

export function replicationProviderSpecificSettingsDeserializer(
  item: any,
): ReplicationProviderSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ReplicationProviderSpecificSettingsUnion */
export type ReplicationProviderSpecificSettingsUnion =
  | A2ACrossClusterMigrationReplicationDetails
  | A2AReplicationDetails
  | HyperVReplicaAzureReplicationDetails
  | HyperVReplicaBaseReplicationDetails
  | HyperVReplicaBlueReplicationDetails
  | HyperVReplicaReplicationDetails
  | InMageAzureV2ReplicationDetails
  | InMageRcmFailbackReplicationDetails
  | InMageRcmReplicationDetails
  | InMageReplicationDetails
  | ReplicationProviderSpecificSettings;

export function replicationProviderSpecificSettingsUnionDeserializer(
  item: any,
): ReplicationProviderSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "A2ACrossClusterMigration":
      return a2ACrossClusterMigrationReplicationDetailsDeserializer(
        item as A2ACrossClusterMigrationReplicationDetails,
      );

    case "A2A":
      return a2AReplicationDetailsDeserializer(item as A2AReplicationDetails);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureReplicationDetailsDeserializer(
        item as HyperVReplicaAzureReplicationDetails,
      );

    case "HyperVReplicaBaseReplicationDetails":
      return hyperVReplicaBaseReplicationDetailsDeserializer(
        item as HyperVReplicaBaseReplicationDetails,
      );

    case "HyperVReplica2012R2":
      return hyperVReplicaBlueReplicationDetailsDeserializer(
        item as HyperVReplicaBlueReplicationDetails,
      );

    case "HyperVReplica2012":
      return hyperVReplicaReplicationDetailsDeserializer(item as HyperVReplicaReplicationDetails);

    case "InMageAzureV2":
      return inMageAzureV2ReplicationDetailsDeserializer(item as InMageAzureV2ReplicationDetails);

    case "InMageRcmFailback":
      return inMageRcmFailbackReplicationDetailsDeserializer(
        item as InMageRcmFailbackReplicationDetails,
      );

    case "InMageRcm":
      return inMageRcmReplicationDetailsDeserializer(item as InMageRcmReplicationDetails);

    case "InMage":
      return inMageReplicationDetailsDeserializer(item as InMageReplicationDetails);

    default:
      return replicationProviderSpecificSettingsDeserializer(item);
  }
}

/** A2A provider specific settings. */
export interface A2ACrossClusterMigrationReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId?: string;
  /** Primary fabric location. */
  primaryFabricLocation?: string;
  /** The type of operating system. */
  osType?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** An id associated with the PE that survives actions like switch protection which change the backing PE/CPE objects internally.The lifecycle id gets carried forward to have a link/continuity in being able to have an Id that denotes the "same" protected item even though other internal Ids/ARM Id might be changing. */
  lifecycleId?: string;
  /** Gets the Instance type. */
  instanceType: "A2ACrossClusterMigration";
}

export function a2ACrossClusterMigrationReplicationDetailsDeserializer(
  item: any,
): A2ACrossClusterMigrationReplicationDetails {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    primaryFabricLocation: item["primaryFabricLocation"],
    osType: item["osType"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    lifecycleId: item["lifecycleId"],
  };
}

/** A2A provider specific settings. */
export interface A2AReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId?: string;
  /** The initial primary availability zone. */
  readonly initialPrimaryZone?: string;
  /** The initial primary fabric location. */
  readonly initialPrimaryFabricLocation?: string;
  /** The initial recovery availability zone. */
  readonly initialRecoveryZone?: string;
  /** The initial primary extended location. */
  initialPrimaryExtendedLocation?: ExtendedLocation;
  /** The initial recovery extended location. */
  initialRecoveryExtendedLocation?: ExtendedLocation;
  /** The initial recovery fabric location. */
  readonly initialRecoveryFabricLocation?: string;
  /** The multi vm group Id. */
  multiVmGroupId?: string;
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** Whether Multi VM group is auto created or specified by user. */
  multiVmGroupCreateOption?: MultiVmGroupCreateOption;
  /** The management Id. */
  managementId?: string;
  /** The replication protection cluster Id. */
  protectionClusterId?: string;
  /** A value indicating if the cluster infra is ready or not. */
  isClusterInfraReady?: boolean;
  /** The list of protected disks. */
  protectedDisks?: A2AProtectedDiskDetails[];
  /** The list of unprotected disks. */
  unprotectedDisks?: A2AUnprotectedDiskDetails[];
  /** The list of protected managed disks. */
  protectedManagedDisks?: A2AProtectedManagedDiskDetails[];
  /** The recovery boot diagnostic storage account Arm Id. */
  recoveryBootDiagStorageAccountId?: string;
  /** Primary fabric location. */
  primaryFabricLocation?: string;
  /** The recovery fabric location. */
  recoveryFabricLocation?: string;
  /** The type of operating system. */
  osType?: string;
  /** The size of recovery virtual machine. */
  recoveryAzureVMSize?: string;
  /** The name of recovery virtual machine. */
  recoveryAzureVMName?: string;
  /** The recovery resource group. */
  recoveryAzureResourceGroupId?: string;
  /** The recovery cloud service. */
  recoveryCloudService?: string;
  /** The recovery availability set. */
  recoveryAvailabilitySet?: string;
  /** The recovery virtual network. */
  selectedRecoveryAzureNetworkId?: string;
  /** The test failover virtual network. */
  selectedTfoAzureNetworkId?: string;
  /** The virtual machine nic details. */
  vmNics?: VMNicDetails[];
  /** The synced configuration details. */
  vmSyncedConfigDetails?: AzureToAzureVmSyncedConfigDetails;
  /** The percentage of the monitoring job. The type of the monitoring job is defined by MonitoringJobType property. */
  monitoringPercentageCompletion?: number;
  /** The type of the monitoring job. The progress is contained in MonitoringPercentageCompletion property. */
  monitoringJobType?: string;
  /** The last heartbeat received from the source server. */
  lastHeartbeat?: Date;
  /** The agent version. */
  agentVersion?: string;
  /** Agent expiry date. */
  agentExpiryDate?: Date;
  /** A value indicating whether replication agent update is required. */
  isReplicationAgentUpdateRequired?: boolean;
  /** Agent certificate expiry date. */
  readonly agentCertificateExpiryDate?: Date;
  /** A value indicating whether agent certificate update is required. */
  isReplicationAgentCertificateUpdateRequired?: boolean;
  /** The recovery fabric object Id. */
  recoveryFabricObjectId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** An id associated with the PE that survives actions like switch protection which change the backing PE/CPE objects internally.The lifecycle id gets carried forward to have a link/continuity in being able to have an Id that denotes the "same" protected item even though other internal Ids/ARM Id might be changing. */
  lifecycleId?: string;
  /** The test failover fabric object Id. */
  testFailoverRecoveryFabricObjectId?: string;
  /** The last RPO value in seconds. */
  rpoInSeconds?: number;
  /** The time (in UTC) when the last RPO value was calculated by Protection Service. */
  lastRpoCalculatedTime?: Date;
  /** The primary availability zone. */
  primaryAvailabilityZone?: string;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The primary Extended Location. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery Extended Location. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** The encryption type of the VM. */
  readonly vmEncryptionType?: VmEncryptionType;
  /** The test failover vm name. */
  tfoAzureVMName?: string;
  /** The recovery azure generation. */
  readonly recoveryAzureGeneration?: string;
  /** The recovery proximity placement group Id. */
  recoveryProximityPlacementGroupId?: string;
  /** A value indicating whether the auto protection is enabled. */
  autoProtectionOfDataDisk?: AutoProtectionOfDataDisk;
  /** The recovery virtual machine scale set id. */
  recoveryVirtualMachineScaleSetId?: string;
  /** The recovery capacity reservation group Id. */
  recoveryCapacityReservationGroupId?: string;
  /** A value indicating the churn option selected by user. */
  readonly churnOptionSelected?: ChurnOptionSelected;
  /** The agent version to which last agent reinstall was attempted. */
  agentReinstallAttemptToVersion?: string;
  /** The OS family name. */
  osFamilyName?: string;
  /** The distro name. */
  distroName?: string;
  /** The agent os name last agent reinstall was attempted. */
  distroNameForWhichAgentIsInstalled?: string;
  /** A value indicating whether replication agent upgradeable. */
  isAgentUpgradeable?: boolean;
  /** A value indicating whether replication agent reinstallation is required. */
  isAgentReinstallRequired?: boolean;
  /** value for reason blocking reinstall. */
  reasonsBlockingReInstall?: string;
  /** whether reinstall is possible or not. */
  reasonsBlockingReinstallDetails?: A2AAgentReinstallBlockingErrorDetails[];
  /** A value indicating whether replication agent Upgrade is In-Progress. */
  isAgentUpgradeInProgress?: boolean;
  /** auto agent upgrade retry count. */
  autoAgentUpgradeRetryCount?: number;
  /** A value indicating whether replication agent Upgrade retry exhausted. */
  isAgentUpgradeRetryThresholdExhausted?: boolean;
  /** the platform fault domain. */
  platformFaultDomain?: number;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2AReplicationDetailsDeserializer(item: any): A2AReplicationDetails {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    initialPrimaryZone: item["initialPrimaryZone"],
    initialPrimaryFabricLocation: item["initialPrimaryFabricLocation"],
    initialRecoveryZone: item["initialRecoveryZone"],
    initialPrimaryExtendedLocation: !item["initialPrimaryExtendedLocation"]
      ? item["initialPrimaryExtendedLocation"]
      : extendedLocationDeserializer(item["initialPrimaryExtendedLocation"]),
    initialRecoveryExtendedLocation: !item["initialRecoveryExtendedLocation"]
      ? item["initialRecoveryExtendedLocation"]
      : extendedLocationDeserializer(item["initialRecoveryExtendedLocation"]),
    initialRecoveryFabricLocation: item["initialRecoveryFabricLocation"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupCreateOption: item["multiVmGroupCreateOption"],
    managementId: item["managementId"],
    protectionClusterId: item["protectionClusterId"],
    isClusterInfraReady: item["isClusterInfraReady"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : a2AProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    unprotectedDisks: !item["unprotectedDisks"]
      ? item["unprotectedDisks"]
      : a2AUnprotectedDiskDetailsArrayDeserializer(item["unprotectedDisks"]),
    protectedManagedDisks: !item["protectedManagedDisks"]
      ? item["protectedManagedDisks"]
      : a2AProtectedManagedDiskDetailsArrayDeserializer(item["protectedManagedDisks"]),
    recoveryBootDiagStorageAccountId: item["recoveryBootDiagStorageAccountId"],
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
    osType: item["osType"],
    recoveryAzureVMSize: item["recoveryAzureVMSize"],
    recoveryAzureVMName: item["recoveryAzureVMName"],
    recoveryAzureResourceGroupId: item["recoveryAzureResourceGroupId"],
    recoveryCloudService: item["recoveryCloudService"],
    recoveryAvailabilitySet: item["recoveryAvailabilitySet"],
    selectedRecoveryAzureNetworkId: item["selectedRecoveryAzureNetworkId"],
    selectedTfoAzureNetworkId: item["selectedTfoAzureNetworkId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    vmSyncedConfigDetails: !item["vmSyncedConfigDetails"]
      ? item["vmSyncedConfigDetails"]
      : azureToAzureVmSyncedConfigDetailsDeserializer(item["vmSyncedConfigDetails"]),
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    agentVersion: item["agentVersion"],
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
    isReplicationAgentUpdateRequired: item["isReplicationAgentUpdateRequired"],
    agentCertificateExpiryDate: !item["agentCertificateExpiryDate"]
      ? item["agentCertificateExpiryDate"]
      : new Date(item["agentCertificateExpiryDate"]),
    isReplicationAgentCertificateUpdateRequired:
      item["isReplicationAgentCertificateUpdateRequired"],
    recoveryFabricObjectId: item["recoveryFabricObjectId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    lifecycleId: item["lifecycleId"],
    testFailoverRecoveryFabricObjectId: item["testFailoverRecoveryFabricObjectId"],
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    primaryAvailabilityZone: item["primaryAvailabilityZone"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationDeserializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationDeserializer(item["recoveryExtendedLocation"]),
    vmEncryptionType: item["vmEncryptionType"],
    tfoAzureVMName: item["tfoAzureVMName"],
    recoveryAzureGeneration: item["recoveryAzureGeneration"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
    autoProtectionOfDataDisk: item["autoProtectionOfDataDisk"],
    recoveryVirtualMachineScaleSetId: item["recoveryVirtualMachineScaleSetId"],
    recoveryCapacityReservationGroupId: item["recoveryCapacityReservationGroupId"],
    churnOptionSelected: item["churnOptionSelected"],
    agentReinstallAttemptToVersion: item["agentReinstallAttemptToVersion"],
    osFamilyName: item["osFamilyName"],
    distroName: item["distroName"],
    distroNameForWhichAgentIsInstalled: item["distroNameForWhichAgentIsInstalled"],
    isAgentUpgradeable: item["isAgentUpgradeable"],
    isAgentReinstallRequired: item["isAgentReinstallRequired"],
    reasonsBlockingReInstall: item["reasonsBlockingReInstall"],
    reasonsBlockingReinstallDetails: !item["reasonsBlockingReinstallDetails"]
      ? item["reasonsBlockingReinstallDetails"]
      : a2AAgentReinstallBlockingErrorDetailsArrayDeserializer(
          item["reasonsBlockingReinstallDetails"],
        ),
    isAgentUpgradeInProgress: item["isAgentUpgradeInProgress"],
    autoAgentUpgradeRetryCount: item["autoAgentUpgradeRetryCount"],
    isAgentUpgradeRetryThresholdExhausted: item["isAgentUpgradeRetryThresholdExhausted"],
    platformFaultDomain: item["platformFaultDomain"],
  };
}

/** Extended location of the resource. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** The extended location type. */
  type: ExtendedLocationType;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The extended location type. */
export enum KnownExtendedLocationType {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The extended location type. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: EdgeZone
 */
export type ExtendedLocationType = string;

/** Whether Multi VM group is auto created or specified by user. */
export enum KnownMultiVmGroupCreateOption {
  /** AutoCreated */
  AutoCreated = "AutoCreated",
  /** UserSpecified */
  UserSpecified = "UserSpecified",
}

/**
 * Whether Multi VM group is auto created or specified by user. \
 * {@link KnownMultiVmGroupCreateOption} can be used interchangeably with MultiVmGroupCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoCreated**: AutoCreated \
 * **UserSpecified**: UserSpecified
 */
export type MultiVmGroupCreateOption = string;

export function a2AProtectedDiskDetailsArrayDeserializer(
  result: Array<A2AProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectedDiskDetailsDeserializer(item);
  });
}

/** A2A protected disk details. */
export interface A2AProtectedDiskDetails {
  /** The disk uri. */
  diskUri?: string;
  /** The recovery disk storage account. */
  recoveryAzureStorageAccountId?: string;
  /** The primary disk storage account. */
  primaryDiskAzureStorageAccountId?: string;
  /** Recovery disk uri. */
  recoveryDiskUri?: string;
  /** The disk name. */
  diskName?: string;
  /** The disk capacity in bytes. */
  diskCapacityInBytes?: number;
  /** The primary staging storage account. */
  primaryStagingAzureStorageAccountId?: string;
  /** The type of disk. */
  diskType?: string;
  /** A value indicating whether resync is required for this disk. */
  resyncRequired?: boolean;
  /** The percentage of the monitoring job. The type of the monitoring job is defined by MonitoringJobType property. */
  monitoringPercentageCompletion?: number;
  /** The type of the monitoring job. The progress is contained in MonitoringPercentageCompletion property. */
  monitoringJobType?: string;
  /** The data pending for replication in MB at staging account. */
  dataPendingInStagingStorageAccountInMB?: number;
  /** The data pending at source virtual machine in MB. */
  dataPendingAtSourceAgentInMB?: number;
  /** The disk state. */
  diskState?: string;
  /** The disk level operations list. */
  allowedDiskLevelOperation?: string[];
  /** A value indicating whether vm has encrypted os disk or not. */
  isDiskEncrypted?: boolean;
  /** The secret URL / identifier (BEK). */
  secretIdentifier?: string;
  /** The KeyVault resource id for secret (BEK). */
  dekKeyVaultArmId?: string;
  /** A value indicating whether disk key got encrypted or not. */
  isDiskKeyEncrypted?: boolean;
  /** The key URL / identifier (KEK). */
  keyIdentifier?: string;
  /** The KeyVault resource id for key (KEK). */
  kekKeyVaultArmId?: string;
  /** The failover name for the managed disk. */
  failoverDiskName?: string;
  /** The test failover name for the managed disk. */
  tfoDiskName?: string;
}

export function a2AProtectedDiskDetailsDeserializer(item: any): A2AProtectedDiskDetails {
  return {
    diskUri: item["diskUri"],
    recoveryAzureStorageAccountId: item["recoveryAzureStorageAccountId"],
    primaryDiskAzureStorageAccountId: item["primaryDiskAzureStorageAccountId"],
    recoveryDiskUri: item["recoveryDiskUri"],
    diskName: item["diskName"],
    diskCapacityInBytes: item["diskCapacityInBytes"],
    primaryStagingAzureStorageAccountId: item["primaryStagingAzureStorageAccountId"],
    diskType: item["diskType"],
    resyncRequired: item["resyncRequired"],
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    dataPendingInStagingStorageAccountInMB: item["dataPendingInStagingStorageAccountInMB"],
    dataPendingAtSourceAgentInMB: item["dataPendingAtSourceAgentInMB"],
    diskState: item["diskState"],
    allowedDiskLevelOperation: !item["allowedDiskLevelOperation"]
      ? item["allowedDiskLevelOperation"]
      : item["allowedDiskLevelOperation"].map((p: any) => {
          return p;
        }),
    isDiskEncrypted: item["isDiskEncrypted"],
    secretIdentifier: item["secretIdentifier"],
    dekKeyVaultArmId: item["dekKeyVaultArmId"],
    isDiskKeyEncrypted: item["isDiskKeyEncrypted"],
    keyIdentifier: item["keyIdentifier"],
    kekKeyVaultArmId: item["kekKeyVaultArmId"],
    failoverDiskName: item["failoverDiskName"],
    tfoDiskName: item["tfoDiskName"],
  };
}

export function a2AUnprotectedDiskDetailsArraySerializer(
  result: Array<A2AUnprotectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return a2AUnprotectedDiskDetailsSerializer(item);
  });
}

export function a2AUnprotectedDiskDetailsArrayDeserializer(
  result: Array<A2AUnprotectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return a2AUnprotectedDiskDetailsDeserializer(item);
  });
}

/** A2A unprotected disk details. */
export interface A2AUnprotectedDiskDetails {
  /** The source lun Id for the data disk. */
  diskLunId?: number;
  /** A value indicating whether the disk auto protection is enabled. */
  diskAutoProtectionStatus?: AutoProtectionOfDataDisk;
}

export function a2AUnprotectedDiskDetailsSerializer(item: A2AUnprotectedDiskDetails): any {
  return {
    diskLunId: item["diskLunId"],
    diskAutoProtectionStatus: item["diskAutoProtectionStatus"],
  };
}

export function a2AUnprotectedDiskDetailsDeserializer(item: any): A2AUnprotectedDiskDetails {
  return {
    diskLunId: item["diskLunId"],
    diskAutoProtectionStatus: item["diskAutoProtectionStatus"],
  };
}

/** A value indicating whether the auto protection is enabled. */
export enum KnownAutoProtectionOfDataDisk {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * A value indicating whether the auto protection is enabled. \
 * {@link KnownAutoProtectionOfDataDisk} can be used interchangeably with AutoProtectionOfDataDisk,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type AutoProtectionOfDataDisk = string;

export function a2AProtectedManagedDiskDetailsArraySerializer(
  result: Array<A2AProtectedManagedDiskDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectedManagedDiskDetailsSerializer(item);
  });
}

export function a2AProtectedManagedDiskDetailsArrayDeserializer(
  result: Array<A2AProtectedManagedDiskDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectedManagedDiskDetailsDeserializer(item);
  });
}

/** A2A protected managed disk details. */
export interface A2AProtectedManagedDiskDetails {
  /** The managed disk Arm id. */
  diskId?: string;
  /** The recovery disk resource group Arm Id. */
  recoveryResourceGroupId?: string;
  /** Recovery target disk Arm Id. */
  recoveryTargetDiskId?: string;
  /** Recovery replica disk Arm Id. */
  recoveryReplicaDiskId?: string;
  /** Recovery original target disk Arm Id. */
  recoveryOrignalTargetDiskId?: string;
  /** The replica disk type. Its an optional value and will be same as source disk type if not user provided. */
  recoveryReplicaDiskAccountType?: string;
  /** The target disk type after failover. Its an optional value and will be same as source disk type if not user provided. */
  recoveryTargetDiskAccountType?: string;
  /** The recovery disk encryption set Id. */
  recoveryDiskEncryptionSetId?: string;
  /** The primary disk encryption set Id. */
  primaryDiskEncryptionSetId?: string;
  /** The disk name. */
  diskName?: string;
  /** The disk capacity in bytes. */
  diskCapacityInBytes?: number;
  /** The primary staging storage account. */
  primaryStagingAzureStorageAccountId?: string;
  /** The type of disk. */
  diskType?: string;
  /** A value indicating whether resync is required for this disk. */
  resyncRequired?: boolean;
  /** The percentage of the monitoring job. The type of the monitoring job is defined by MonitoringJobType property. */
  monitoringPercentageCompletion?: number;
  /** The type of the monitoring job. The progress is contained in MonitoringPercentageCompletion property. */
  monitoringJobType?: string;
  /** The data pending for replication in MB at staging account. */
  dataPendingInStagingStorageAccountInMB?: number;
  /** The data pending at source virtual machine in MB. */
  dataPendingAtSourceAgentInMB?: number;
  /** The disk state. */
  diskState?: string;
  /** The disk level operations list. */
  allowedDiskLevelOperation?: string[];
  /** A value indicating whether vm has encrypted os disk or not. */
  isDiskEncrypted?: boolean;
  /** The secret URL / identifier (BEK). */
  secretIdentifier?: string;
  /** The KeyVault resource id for secret (BEK). */
  dekKeyVaultArmId?: string;
  /** A value indicating whether disk key got encrypted or not. */
  isDiskKeyEncrypted?: boolean;
  /** The key URL / identifier (KEK). */
  keyIdentifier?: string;
  /** The KeyVault resource id for key (KEK). */
  kekKeyVaultArmId?: string;
  /** The failover name for the managed disk. */
  failoverDiskName?: string;
  /** The test failover name for the managed disk. */
  tfoDiskName?: string;
}

export function a2AProtectedManagedDiskDetailsSerializer(
  item: A2AProtectedManagedDiskDetails,
): any {
  return {
    diskId: item["diskId"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryTargetDiskId: item["recoveryTargetDiskId"],
    recoveryReplicaDiskId: item["recoveryReplicaDiskId"],
    recoveryOrignalTargetDiskId: item["recoveryOrignalTargetDiskId"],
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryDiskEncryptionSetId: item["recoveryDiskEncryptionSetId"],
    primaryDiskEncryptionSetId: item["primaryDiskEncryptionSetId"],
    diskName: item["diskName"],
    diskCapacityInBytes: item["diskCapacityInBytes"],
    primaryStagingAzureStorageAccountId: item["primaryStagingAzureStorageAccountId"],
    diskType: item["diskType"],
    resyncRequired: item["resyncRequired"],
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    dataPendingInStagingStorageAccountInMB: item["dataPendingInStagingStorageAccountInMB"],
    dataPendingAtSourceAgentInMB: item["dataPendingAtSourceAgentInMB"],
    diskState: item["diskState"],
    allowedDiskLevelOperation: !item["allowedDiskLevelOperation"]
      ? item["allowedDiskLevelOperation"]
      : item["allowedDiskLevelOperation"].map((p: any) => {
          return p;
        }),
    isDiskEncrypted: item["isDiskEncrypted"],
    secretIdentifier: item["secretIdentifier"],
    dekKeyVaultArmId: item["dekKeyVaultArmId"],
    isDiskKeyEncrypted: item["isDiskKeyEncrypted"],
    keyIdentifier: item["keyIdentifier"],
    kekKeyVaultArmId: item["kekKeyVaultArmId"],
    failoverDiskName: item["failoverDiskName"],
    tfoDiskName: item["tfoDiskName"],
  };
}

export function a2AProtectedManagedDiskDetailsDeserializer(
  item: any,
): A2AProtectedManagedDiskDetails {
  return {
    diskId: item["diskId"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryTargetDiskId: item["recoveryTargetDiskId"],
    recoveryReplicaDiskId: item["recoveryReplicaDiskId"],
    recoveryOrignalTargetDiskId: item["recoveryOrignalTargetDiskId"],
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryDiskEncryptionSetId: item["recoveryDiskEncryptionSetId"],
    primaryDiskEncryptionSetId: item["primaryDiskEncryptionSetId"],
    diskName: item["diskName"],
    diskCapacityInBytes: item["diskCapacityInBytes"],
    primaryStagingAzureStorageAccountId: item["primaryStagingAzureStorageAccountId"],
    diskType: item["diskType"],
    resyncRequired: item["resyncRequired"],
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    dataPendingInStagingStorageAccountInMB: item["dataPendingInStagingStorageAccountInMB"],
    dataPendingAtSourceAgentInMB: item["dataPendingAtSourceAgentInMB"],
    diskState: item["diskState"],
    allowedDiskLevelOperation: !item["allowedDiskLevelOperation"]
      ? item["allowedDiskLevelOperation"]
      : item["allowedDiskLevelOperation"].map((p: any) => {
          return p;
        }),
    isDiskEncrypted: item["isDiskEncrypted"],
    secretIdentifier: item["secretIdentifier"],
    dekKeyVaultArmId: item["dekKeyVaultArmId"],
    isDiskKeyEncrypted: item["isDiskKeyEncrypted"],
    keyIdentifier: item["keyIdentifier"],
    kekKeyVaultArmId: item["kekKeyVaultArmId"],
    failoverDiskName: item["failoverDiskName"],
    tfoDiskName: item["tfoDiskName"],
  };
}

export function vmNicDetailsArrayDeserializer(result: Array<VMNicDetails>): any[] {
  return result.map((item) => {
    return vmNicDetailsDeserializer(item);
  });
}

/** Hyper V VM network details. */
export interface VMNicDetails {
  /** The nic Id. */
  nicId?: string;
  /** The replica nic Id. */
  replicaNicId?: string;
  /** The source nic ARM Id. */
  sourceNicArmId?: string;
  /** VM network name. */
  vMNetworkName?: string;
  /** Recovery VM network Id. */
  recoveryVMNetworkId?: string;
  /** The IP configurations of the NIC. */
  ipConfigs?: IPConfigDetails[];
  /** Selection type for failover. */
  selectionType?: string;
  /** The id of the NSG associated with the NIC. */
  recoveryNetworkSecurityGroupId?: string;
  /** A value indicating whether the NIC has accelerated networking enabled. */
  enableAcceleratedNetworkingOnRecovery?: boolean;
  /** The network to be used by NIC during test failover. */
  tfoVMNetworkId?: string;
  /** The NSG to be used by NIC during test failover. */
  tfoNetworkSecurityGroupId?: string;
  /** Whether the TFO NIC has accelerated networking enabled. */
  enableAcceleratedNetworkingOnTfo?: boolean;
  /** The name of the NIC to be used when creating target NICs. */
  recoveryNicName?: string;
  /** The resource group of the NIC to be used when creating target NICs. */
  recoveryNicResourceGroupName?: string;
  /** A value indicating whether an existing NIC is allowed to be reused during failover subject to availability. */
  reuseExistingNic?: boolean;
  /** The name of the NIC to be used when creating target NICs in TFO. */
  tfoRecoveryNicName?: string;
  /** The resource group of the NIC to be used when creating target NICs in TFO. */
  tfoRecoveryNicResourceGroupName?: string;
  /** A value indicating whether an existing NIC is allowed to be reused during test failover subject to availability. */
  tfoReuseExistingNic?: boolean;
  /** Target NIC name. */
  targetNicName?: string;
}

export function vmNicDetailsDeserializer(item: any): VMNicDetails {
  return {
    nicId: item["nicId"],
    replicaNicId: item["replicaNicId"],
    sourceNicArmId: item["sourceNicArmId"],
    vMNetworkName: item["vMNetworkName"],
    recoveryVMNetworkId: item["recoveryVMNetworkId"],
    ipConfigs: !item["ipConfigs"]
      ? item["ipConfigs"]
      : ipConfigDetailsArrayDeserializer(item["ipConfigs"]),
    selectionType: item["selectionType"],
    recoveryNetworkSecurityGroupId: item["recoveryNetworkSecurityGroupId"],
    enableAcceleratedNetworkingOnRecovery: item["enableAcceleratedNetworkingOnRecovery"],
    tfoVMNetworkId: item["tfoVMNetworkId"],
    tfoNetworkSecurityGroupId: item["tfoNetworkSecurityGroupId"],
    enableAcceleratedNetworkingOnTfo: item["enableAcceleratedNetworkingOnTfo"],
    recoveryNicName: item["recoveryNicName"],
    recoveryNicResourceGroupName: item["recoveryNicResourceGroupName"],
    reuseExistingNic: item["reuseExistingNic"],
    tfoRecoveryNicName: item["tfoRecoveryNicName"],
    tfoRecoveryNicResourceGroupName: item["tfoRecoveryNicResourceGroupName"],
    tfoReuseExistingNic: item["tfoReuseExistingNic"],
    targetNicName: item["targetNicName"],
  };
}

export function ipConfigDetailsArrayDeserializer(result: Array<IPConfigDetails>): any[] {
  return result.map((item) => {
    return ipConfigDetailsDeserializer(item);
  });
}

/** model interface IPConfigDetails */
export interface IPConfigDetails {
  name?: string;
  isPrimary?: boolean;
  subnetName?: string;
  staticIPAddress?: string;
  ipAddressType?: string;
  isSeletedForFailover?: boolean;
  recoverySubnetName?: string;
  recoveryStaticIPAddress?: string;
  recoveryIPAddressType?: string;
  recoveryPublicIPAddressId?: string;
  recoveryLBBackendAddressPoolIds?: string[];
  tfoSubnetName?: string;
  tfoStaticIPAddress?: string;
  tfoPublicIPAddressId?: string;
  tfoLBBackendAddressPoolIds?: string[];
}

export function ipConfigDetailsDeserializer(item: any): IPConfigDetails {
  return {
    name: item["name"],
    isPrimary: item["isPrimary"],
    subnetName: item["subnetName"],
    staticIPAddress: item["staticIPAddress"],
    ipAddressType: item["ipAddressType"],
    isSeletedForFailover: item["isSeletedForFailover"],
    recoverySubnetName: item["recoverySubnetName"],
    recoveryStaticIPAddress: item["recoveryStaticIPAddress"],
    recoveryIPAddressType: item["recoveryIPAddressType"],
    recoveryPublicIPAddressId: item["recoveryPublicIPAddressId"],
    recoveryLBBackendAddressPoolIds: !item["recoveryLBBackendAddressPoolIds"]
      ? item["recoveryLBBackendAddressPoolIds"]
      : item["recoveryLBBackendAddressPoolIds"].map((p: any) => {
          return p;
        }),
    tfoSubnetName: item["tfoSubnetName"],
    tfoStaticIPAddress: item["tfoStaticIPAddress"],
    tfoPublicIPAddressId: item["tfoPublicIPAddressId"],
    tfoLBBackendAddressPoolIds: !item["tfoLBBackendAddressPoolIds"]
      ? item["tfoLBBackendAddressPoolIds"]
      : item["tfoLBBackendAddressPoolIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Azure to Azure VM synced configuration details. */
export interface AzureToAzureVmSyncedConfigDetails {
  /** The Azure VM tags. */
  tags?: Record<string, string>;
  /** The Azure VM input endpoints. */
  inputEndpoints?: InputEndpoint[];
}

export function azureToAzureVmSyncedConfigDetailsDeserializer(
  item: any,
): AzureToAzureVmSyncedConfigDetails {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    inputEndpoints: !item["inputEndpoints"]
      ? item["inputEndpoints"]
      : inputEndpointArrayDeserializer(item["inputEndpoints"]),
  };
}

export function inputEndpointArrayDeserializer(result: Array<InputEndpoint>): any[] {
  return result.map((item) => {
    return inputEndpointDeserializer(item);
  });
}

/** model interface InputEndpoint */
export interface InputEndpoint {
  endpointName?: string;
  privatePort?: number;
  publicPort?: number;
  protocol?: string;
}

export function inputEndpointDeserializer(item: any): InputEndpoint {
  return {
    endpointName: item["endpointName"],
    privatePort: item["privatePort"],
    publicPort: item["publicPort"],
    protocol: item["protocol"],
  };
}

/** The encryption type of the VM. */
export enum KnownVmEncryptionType {
  /** NotEncrypted */
  NotEncrypted = "NotEncrypted",
  /** OnePassEncrypted */
  OnePassEncrypted = "OnePassEncrypted",
  /** TwoPassEncrypted */
  TwoPassEncrypted = "TwoPassEncrypted",
}

/**
 * The encryption type of the VM. \
 * {@link KnownVmEncryptionType} can be used interchangeably with VmEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotEncrypted**: NotEncrypted \
 * **OnePassEncrypted**: OnePassEncrypted \
 * **TwoPassEncrypted**: TwoPassEncrypted
 */
export type VmEncryptionType = string;

/** A value indicating the churn option selected by user. */
export enum KnownChurnOptionSelected {
  /** Normal */
  Normal = "Normal",
  /** High */
  High = "High",
}

/**
 * A value indicating the churn option selected by user. \
 * {@link KnownChurnOptionSelected} can be used interchangeably with ChurnOptionSelected,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Normal**: Normal \
 * **High**: High
 */
export type ChurnOptionSelected = string;

export function a2AAgentReinstallBlockingErrorDetailsArrayDeserializer(
  result: Array<A2AAgentReinstallBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return a2AAgentReinstallBlockingErrorDetailsDeserializer(item);
  });
}

/** A2A source agent reinstall blocking error details. */
export interface A2AAgentReinstallBlockingErrorDetails {
  /** error code. */
  errorCode?: string;
  /** error message. */
  errorMessage?: string;
  /** possible causes. */
  possibleCauses?: string;
  /** recommended action. */
  recommendedAction?: string;
  /** error message parameters. */
  errorMessageParameters?: Record<string, string>;
  /** error tags. */
  errorTags?: Record<string, string>;
}

export function a2AAgentReinstallBlockingErrorDetailsDeserializer(
  item: any,
): A2AAgentReinstallBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Hyper V Replica Azure provider specific settings. */
export interface HyperVReplicaAzureReplicationDetails extends ReplicationProviderSpecificSettings {
  /** Azure VM Disk details. */
  azureVmDiskDetails?: AzureVmDiskDetails[];
  /** Recovery Azure given name. */
  recoveryAzureVmName?: string;
  /** The Recovery Azure VM size. */
  recoveryAzureVMSize?: string;
  /** The recovery Azure storage account. */
  recoveryAzureStorageAccount?: string;
  /** The ARM id of the log storage account used for replication. This will be set to null if no log storage account was provided during enable protection. */
  recoveryAzureLogStorageAccountId?: string;
  /** The Last replication time. */
  lastReplicatedTime?: Date;
  /** Last RPO value. */
  rpoInSeconds?: number;
  /** The last RPO calculated time. */
  lastRpoCalculatedTime?: Date;
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** Initial replication details. */
  initialReplicationDetails?: InitialReplicationDetails;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** The selected recovery azure network Id. */
  selectedRecoveryAzureNetworkId?: string;
  /** The selected source nic Id which will be used as the primary nic during failover. */
  selectedSourceNicId?: string;
  /** The encryption info. */
  encryption?: string;
  /** The operating system info. */
  oSDetails?: OSDetails;
  /** The RAM size of the VM on the primary side. */
  sourceVmRamSizeInMB?: number;
  /** The CPU count of the VM on the primary side. */
  sourceVmCpuCount?: number;
  /** The selected option to enable RDP\SSH on target vm after failover. String value of SrsDataContract.EnableRDPOnTargetOption enum. */
  enableRdpOnTargetOption?: string;
  /** The target resource group Id. */
  recoveryAzureResourceGroupId?: string;
  /** The recovery availability set Id. */
  recoveryAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** A value indicating whether managed disks should be used during failover. */
  useManagedDisks?: string;
  /** License Type of the VM to be used. */
  licenseType?: string;
  /** The SQL Server license type. */
  sqlServerLicenseType?: string;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The list of protected managed disks. */
  protectedManagedDisks?: HyperVReplicaAzureManagedDiskDetails[];
  /** A value indicating all available inplace OS Upgrade configurations. */
  allAvailableOSUpgradeConfigurations?: OSUpgradeSupportedVersions[];
  /** The target VM security profile. */
  targetVmSecurityProfile?: SecurityProfileProperties;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** Gets the Instance type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureReplicationDetailsDeserializer(
  item: any,
): HyperVReplicaAzureReplicationDetails {
  return {
    instanceType: item["instanceType"],
    azureVmDiskDetails: !item["azureVmDiskDetails"]
      ? item["azureVmDiskDetails"]
      : azureVmDiskDetailsArrayDeserializer(item["azureVmDiskDetails"]),
    recoveryAzureVmName: item["recoveryAzureVmName"],
    recoveryAzureVMSize: item["recoveryAzureVMSize"],
    recoveryAzureStorageAccount: item["recoveryAzureStorageAccount"],
    recoveryAzureLogStorageAccountId: item["recoveryAzureLogStorageAccountId"],
    lastReplicatedTime: !item["lastReplicatedTime"]
      ? item["lastReplicatedTime"]
      : new Date(item["lastReplicatedTime"]),
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    initialReplicationDetails: !item["initialReplicationDetails"]
      ? item["initialReplicationDetails"]
      : initialReplicationDetailsDeserializer(item["initialReplicationDetails"]),
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    selectedRecoveryAzureNetworkId: item["selectedRecoveryAzureNetworkId"],
    selectedSourceNicId: item["selectedSourceNicId"],
    encryption: item["encryption"],
    oSDetails: !item["oSDetails"] ? item["oSDetails"] : osDetailsDeserializer(item["oSDetails"]),
    sourceVmRamSizeInMB: item["sourceVmRamSizeInMB"],
    sourceVmCpuCount: item["sourceVmCpuCount"],
    enableRdpOnTargetOption: item["enableRdpOnTargetOption"],
    recoveryAzureResourceGroupId: item["recoveryAzureResourceGroupId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    useManagedDisks: item["useManagedDisks"],
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : Object.fromEntries(
          Object.entries(item["targetVmTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    seedManagedDiskTags: !item["seedManagedDiskTags"]
      ? item["seedManagedDiskTags"]
      : Object.fromEntries(
          Object.entries(item["seedManagedDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetManagedDiskTags: !item["targetManagedDiskTags"]
      ? item["targetManagedDiskTags"]
      : Object.fromEntries(
          Object.entries(item["targetManagedDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : Object.fromEntries(
          Object.entries(item["targetNicTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    protectedManagedDisks: !item["protectedManagedDisks"]
      ? item["protectedManagedDisks"]
      : hyperVReplicaAzureManagedDiskDetailsArrayDeserializer(item["protectedManagedDisks"]),
    allAvailableOSUpgradeConfigurations: !item["allAvailableOSUpgradeConfigurations"]
      ? item["allAvailableOSUpgradeConfigurations"]
      : osUpgradeSupportedVersionsArrayDeserializer(item["allAvailableOSUpgradeConfigurations"]),
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : securityProfilePropertiesDeserializer(item["targetVmSecurityProfile"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function azureVmDiskDetailsArrayDeserializer(result: Array<AzureVmDiskDetails>): any[] {
  return result.map((item) => {
    return azureVmDiskDetailsDeserializer(item);
  });
}

/** Disk details for E2A provider. */
export interface AzureVmDiskDetails {
  /** VHD type. */
  vhdType?: string;
  /** The VHD id. */
  vhdId?: string;
  /** The disk resource id. */
  diskId?: string;
  /** VHD name. */
  vhdName?: string;
  /** Max side in MB. */
  maxSizeMB?: string;
  /** Blob uri of the Azure disk. */
  targetDiskLocation?: string;
  /** The target Azure disk name. */
  targetDiskName?: string;
  /** Ordinal\LunId of the disk for the Azure VM. */
  lunId?: string;
  /** The DiskEncryptionSet ARM ID. */
  diskEncryptionSetId?: string;
  /** The custom target Azure disk name. */
  customTargetDiskName?: string;
}

export function azureVmDiskDetailsDeserializer(item: any): AzureVmDiskDetails {
  return {
    vhdType: item["vhdType"],
    vhdId: item["vhdId"],
    diskId: item["diskId"],
    vhdName: item["vhdName"],
    maxSizeMB: item["maxSizeMB"],
    targetDiskLocation: item["targetDiskLocation"],
    targetDiskName: item["targetDiskName"],
    lunId: item["lunId"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    customTargetDiskName: item["customTargetDiskName"],
  };
}

/** Initial replication details. */
export interface InitialReplicationDetails {
  /** Initial replication type. */
  initialReplicationType?: string;
  /** The initial replication progress percentage. */
  initialReplicationProgressPercentage?: string;
}

export function initialReplicationDetailsDeserializer(item: any): InitialReplicationDetails {
  return {
    initialReplicationType: item["initialReplicationType"],
    initialReplicationProgressPercentage: item["initialReplicationProgressPercentage"],
  };
}

/** Disk Details. */
export interface OSDetails {
  /** VM Disk details. */
  osType?: string;
  /** Product type. */
  productType?: string;
  /** The OSEdition. */
  osEdition?: string;
  /** The OS Version. */
  oSVersion?: string;
  /** The OS Major Version. */
  oSMajorVersion?: string;
  /** The OS Minor Version. */
  oSMinorVersion?: string;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
}

export function osDetailsDeserializer(item: any): OSDetails {
  return {
    osType: item["osType"],
    productType: item["productType"],
    osEdition: item["osEdition"],
    oSVersion: item["oSVersion"],
    oSMajorVersion: item["oSMajorVersion"],
    oSMinorVersion: item["oSMinorVersion"],
    userSelectedOSName: item["userSelectedOSName"],
  };
}

/** The license type for Linux VM's. */
export enum KnownLinuxLicenseType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** NoLicenseType */
  NoLicenseType = "NoLicenseType",
  /** LinuxServer */
  LinuxServer = "LinuxServer",
}

/**
 * The license type for Linux VM's. \
 * {@link KnownLinuxLicenseType} can be used interchangeably with LinuxLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **NoLicenseType**: NoLicenseType \
 * **LinuxServer**: LinuxServer
 */
export type LinuxLicenseType = string;

export function hyperVReplicaAzureManagedDiskDetailsArrayDeserializer(
  result: Array<HyperVReplicaAzureManagedDiskDetails>,
): any[] {
  return result.map((item) => {
    return hyperVReplicaAzureManagedDiskDetailsDeserializer(item);
  });
}

/** Hyper-V Managed disk details. */
export interface HyperVReplicaAzureManagedDiskDetails {
  /** The disk Id. */
  diskId?: string;
  /** Seed managed disk Id. */
  seedManagedDiskId?: string;
  /** The replica disk type. */
  replicaDiskType?: string;
  /** The disk encryption set ARM Id. */
  diskEncryptionSetId?: string;
  /** The disk type. */
  targetDiskAccountType?: DiskAccountType;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function hyperVReplicaAzureManagedDiskDetailsDeserializer(
  item: any,
): HyperVReplicaAzureManagedDiskDetails {
  return {
    diskId: item["diskId"],
    seedManagedDiskId: item["seedManagedDiskId"],
    replicaDiskType: item["replicaDiskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    targetDiskAccountType: item["targetDiskAccountType"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** The disk type. */
export enum KnownDiskAccountType {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS */
  StandardSSDLRS = "StandardSSD_LRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
  /** UltraSSD_LRS */
  UltraSSDLRS = "UltraSSD_LRS",
  /** StandardSSD_ZRS */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** Premium_ZRS */
  PremiumZRS = "Premium_ZRS",
}

/**
 * The disk type. \
 * {@link KnownDiskAccountType} can be used interchangeably with DiskAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard_LRS \
 * **Premium_LRS**: Premium_LRS \
 * **StandardSSD_LRS**: StandardSSD_LRS \
 * **PremiumV2_LRS**: PremiumV2_LRS \
 * **UltraSSD_LRS**: UltraSSD_LRS \
 * **StandardSSD_ZRS**: StandardSSD_ZRS \
 * **Premium_ZRS**: Premium_ZRS
 */
export type DiskAccountType = string;

export function osUpgradeSupportedVersionsArrayDeserializer(
  result: Array<OSUpgradeSupportedVersions>,
): any[] {
  return result.map((item) => {
    return osUpgradeSupportedVersionsDeserializer(item);
  });
}

/** Supported OS upgrade versions. */
export interface OSUpgradeSupportedVersions {
  /** The source OS version name. */
  readonly supportedSourceOsVersion?: string;
  /** The target OS version names. */
  readonly supportedTargetOsVersions?: string[];
}

export function osUpgradeSupportedVersionsDeserializer(item: any): OSUpgradeSupportedVersions {
  return {
    supportedSourceOsVersion: item["supportedSourceOsVersion"],
    supportedTargetOsVersions: !item["supportedTargetOsVersions"]
      ? item["supportedTargetOsVersions"]
      : item["supportedTargetOsVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** Security profile input. */
export interface SecurityProfileProperties {
  /** The target VM security type. */
  targetVmSecurityType?: SecurityType;
  /** A value indicating whether secure boot to be enabled. */
  targetVmSecureBoot?: SecurityConfiguration;
  /** A value indicating whether trusted platform module to be enabled. */
  targetVmTpm?: SecurityConfiguration;
  /** A value indicating whether integrity monitoring to be enabled. */
  targetVmMonitoring?: SecurityConfiguration;
  /** A value indicating whether confidential compute encryption to be enabled. */
  targetVmConfidentialEncryption?: SecurityConfiguration;
}

export function securityProfilePropertiesSerializer(item: SecurityProfileProperties): any {
  return {
    targetVmSecurityType: item["targetVmSecurityType"],
    targetVmSecureBoot: item["targetVmSecureBoot"],
    targetVmTpm: item["targetVmTpm"],
    targetVmMonitoring: item["targetVmMonitoring"],
    targetVmConfidentialEncryption: item["targetVmConfidentialEncryption"],
  };
}

export function securityProfilePropertiesDeserializer(item: any): SecurityProfileProperties {
  return {
    targetVmSecurityType: item["targetVmSecurityType"],
    targetVmSecureBoot: item["targetVmSecureBoot"],
    targetVmTpm: item["targetVmTpm"],
    targetVmMonitoring: item["targetVmMonitoring"],
    targetVmConfidentialEncryption: item["targetVmConfidentialEncryption"],
  };
}

/** The target VM security type. */
export enum KnownSecurityType {
  /** None */
  None = "None",
  /** TrustedLaunch */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * The target VM security type. \
 * {@link KnownSecurityType} can be used interchangeably with SecurityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **TrustedLaunch**: TrustedLaunch \
 * **ConfidentialVM**: ConfidentialVM
 */
export type SecurityType = string;

/** Security configuration state. */
export enum KnownSecurityConfiguration {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Security configuration state. \
 * {@link KnownSecurityConfiguration} can be used interchangeably with SecurityConfiguration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type SecurityConfiguration = string;

/** Hyper V replica provider specific settings base class. */
export interface HyperVReplicaBaseReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The Last replication time. */
  lastReplicatedTime?: Date;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** Initial replication details. */
  initialReplicationDetails?: InitialReplicationDetails;
  /** VM disk details. */
  vMDiskDetails?: DiskDetails[];
  /** Gets the Instance type. */
  instanceType: "HyperVReplicaBaseReplicationDetails";
}

export function hyperVReplicaBaseReplicationDetailsDeserializer(
  item: any,
): HyperVReplicaBaseReplicationDetails {
  return {
    instanceType: item["instanceType"],
    lastReplicatedTime: !item["lastReplicatedTime"]
      ? item["lastReplicatedTime"]
      : new Date(item["lastReplicatedTime"]),
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    initialReplicationDetails: !item["initialReplicationDetails"]
      ? item["initialReplicationDetails"]
      : initialReplicationDetailsDeserializer(item["initialReplicationDetails"]),
    vMDiskDetails: !item["vMDiskDetails"]
      ? item["vMDiskDetails"]
      : diskDetailsArrayDeserializer(item["vMDiskDetails"]),
  };
}

export function diskDetailsArrayDeserializer(result: Array<DiskDetails>): any[] {
  return result.map((item) => {
    return diskDetailsDeserializer(item);
  });
}

/** Onprem disk details data. */
export interface DiskDetails {
  /** The hard disk max size in MB. */
  maxSizeMB?: number;
  /** The type of the volume. */
  vhdType?: string;
  /** The VHD Id. */
  vhdId?: string;
  /** The VHD name. */
  vhdName?: string;
}

export function diskDetailsDeserializer(item: any): DiskDetails {
  return {
    maxSizeMB: item["maxSizeMB"],
    vhdType: item["vhdType"],
    vhdId: item["vhdId"],
    vhdName: item["vhdName"],
  };
}

/** HyperV replica 2012 R2 (Blue) replication details. */
export interface HyperVReplicaBlueReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The Last replication time. */
  lastReplicatedTime?: Date;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** Initial replication details. */
  initialReplicationDetails?: InitialReplicationDetails;
  /** VM disk details. */
  vMDiskDetails?: DiskDetails[];
  /** Gets the Instance type. */
  instanceType: "HyperVReplica2012R2";
}

export function hyperVReplicaBlueReplicationDetailsDeserializer(
  item: any,
): HyperVReplicaBlueReplicationDetails {
  return {
    instanceType: item["instanceType"],
    lastReplicatedTime: !item["lastReplicatedTime"]
      ? item["lastReplicatedTime"]
      : new Date(item["lastReplicatedTime"]),
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    initialReplicationDetails: !item["initialReplicationDetails"]
      ? item["initialReplicationDetails"]
      : initialReplicationDetailsDeserializer(item["initialReplicationDetails"]),
    vMDiskDetails: !item["vMDiskDetails"]
      ? item["vMDiskDetails"]
      : diskDetailsArrayDeserializer(item["vMDiskDetails"]),
  };
}

/** HyperV replica 2012 replication details. */
export interface HyperVReplicaReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The Last replication time. */
  lastReplicatedTime?: Date;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** Initial replication details. */
  initialReplicationDetails?: InitialReplicationDetails;
  /** VM disk details. */
  vMDiskDetails?: DiskDetails[];
  /** Gets the Instance type. */
  instanceType: "HyperVReplica2012";
}

export function hyperVReplicaReplicationDetailsDeserializer(
  item: any,
): HyperVReplicaReplicationDetails {
  return {
    instanceType: item["instanceType"],
    lastReplicatedTime: !item["lastReplicatedTime"]
      ? item["lastReplicatedTime"]
      : new Date(item["lastReplicatedTime"]),
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    initialReplicationDetails: !item["initialReplicationDetails"]
      ? item["initialReplicationDetails"]
      : initialReplicationDetailsDeserializer(item["initialReplicationDetails"]),
    vMDiskDetails: !item["vMDiskDetails"]
      ? item["vMDiskDetails"]
      : diskDetailsArrayDeserializer(item["vMDiskDetails"]),
  };
}

/** InMageAzureV2 provider specific settings. */
export interface InMageAzureV2ReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The infrastructure VM Id. */
  infrastructureVmId?: string;
  /** The vCenter infrastructure Id. */
  vCenterInfrastructureId?: string;
  /** The protection stage. */
  protectionStage?: string;
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** The resync progress percentage. */
  resyncProgressPercentage?: number;
  /** The RPO in seconds. */
  rpoInSeconds?: number;
  /** The compressed data change rate in MB. */
  compressedDataRateInMB?: number;
  /** The uncompressed data change rate in MB. */
  uncompressedDataRateInMB?: number;
  /** The source IP address. */
  ipAddress?: string;
  /** The agent version. */
  agentVersion?: string;
  /** Agent expiry date. */
  agentExpiryDate?: Date;
  /** A value indicating whether installed agent needs to be updated. */
  isAgentUpdateRequired?: string;
  /** A value indicating whether the source server requires a restart after update. */
  isRebootAfterUpdateRequired?: string;
  /** The last heartbeat received from the source server. */
  lastHeartbeat?: Date;
  /** The process server Id. */
  processServerId?: string;
  /** The process server name. */
  processServerName?: string;
  /** The multi vm group Id. */
  multiVmGroupId?: string;
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** A value indicating whether multi vm sync is enabled or disabled. */
  multiVmSyncStatus?: string;
  /** The list of protected disks. */
  protectedDisks?: InMageAzureV2ProtectedDiskDetails[];
  /** A value indicating whether any disk is resized for this VM. */
  diskResized?: string;
  /** The master target Id. */
  masterTargetId?: string;
  /** The CPU count of the VM on the primary side. */
  sourceVmCpuCount?: number;
  /** The RAM size of the VM on the primary side. */
  sourceVmRamSizeInMB?: number;
  /** The type of the OS on the VM. */
  osType?: string;
  /** The OS disk VHD name. */
  vhdName?: string;
  /** The id of the disk containing the OS. */
  osDiskId?: string;
  /** Azure VM Disk details. */
  azureVMDiskDetails?: AzureVmDiskDetails[];
  /** Recovery Azure given name. */
  recoveryAzureVMName?: string;
  /** The Recovery Azure VM size. */
  recoveryAzureVMSize?: string;
  /** The recovery Azure storage account. */
  recoveryAzureStorageAccount?: string;
  /** The ARM id of the log storage account used for replication. This will be set to null if no log storage account was provided during enable protection. */
  recoveryAzureLogStorageAccountId?: string;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** The selected recovery azure network Id. */
  selectedRecoveryAzureNetworkId?: string;
  /** The test failover virtual network. */
  selectedTfoAzureNetworkId?: string;
  /** The selected source nic Id which will be used as the primary nic during failover. */
  selectedSourceNicId?: string;
  /** A value indicating the discovery type of the machine. Value can be vCenter or physical. */
  discoveryType?: string;
  /** The selected option to enable RDP\SSH on target vm after failover. String value of SrsDataContract.EnableRDPOnTargetOption enum. */
  enableRdpOnTargetOption?: string;
  /** The datastores of the on-premise machine. Value can be list of strings that contain datastore names. */
  datastores?: string[];
  /** The ARM Id of the target Azure VM. This value will be null until the VM is failed over. Only after failure it will be populated with the ARM Id of the Azure VM. */
  targetVmId?: string;
  /** The target resource group Id. */
  recoveryAzureResourceGroupId?: string;
  /** The recovery availability set Id. */
  recoveryAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** A value indicating whether managed disks should be used during failover. */
  useManagedDisks?: string;
  /** License Type of the VM to be used. */
  licenseType?: string;
  /** The SQL Server license type. */
  sqlServerLicenseType?: string;
  /** The validation errors of the on-premise machine Value can be list of validation errors. */
  validationErrors?: HealthError[];
  /** The last RPO calculated time. */
  lastRpoCalculatedTime?: Date;
  /** The last update time received from on-prem components. */
  lastUpdateReceivedTime?: Date;
  /** The replica id of the protected item. */
  replicaId?: string;
  /** The OS Version of the protected item. */
  osVersion?: string;
  /** The list of protected managed disks. */
  protectedManagedDisks?: InMageAzureV2ManagedDiskDetails[];
  /** The last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** The firmware type of this protected item. */
  firmwareType?: string;
  /** The target generation for this protected item. */
  azureVmGeneration?: string;
  /** A value indicating whether additional IR stats are available or not. */
  isAdditionalStatsAvailable?: boolean;
  /** The total transferred data in bytes. */
  totalDataTransferred?: number;
  /** The progress health. */
  totalProgressHealth?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The switch provider blocking error information. */
  switchProviderBlockingErrorDetails?: InMageAzureV2SwitchProviderBlockingErrorDetails[];
  /** The switch provider blocking error information. */
  switchProviderDetails?: InMageAzureV2SwitchProviderDetails;
  /** A value indicating the inplace OS Upgrade version. */
  supportedOSVersions?: string[];
  /** A value indicating all available inplace OS Upgrade configurations. */
  allAvailableOSUpgradeConfigurations?: OSUpgradeSupportedVersions[];
  /** The name of the OS on the VM. */
  readonly osName?: string;
  /** Gets the Instance type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2ReplicationDetailsDeserializer(
  item: any,
): InMageAzureV2ReplicationDetails {
  return {
    instanceType: item["instanceType"],
    infrastructureVmId: item["infrastructureVmId"],
    vCenterInfrastructureId: item["vCenterInfrastructureId"],
    protectionStage: item["protectionStage"],
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    rpoInSeconds: item["rpoInSeconds"],
    compressedDataRateInMB: item["compressedDataRateInMB"],
    uncompressedDataRateInMB: item["uncompressedDataRateInMB"],
    ipAddress: item["ipAddress"],
    agentVersion: item["agentVersion"],
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
    isAgentUpdateRequired: item["isAgentUpdateRequired"],
    isRebootAfterUpdateRequired: item["isRebootAfterUpdateRequired"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    processServerId: item["processServerId"],
    processServerName: item["processServerName"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : inMageAzureV2ProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    diskResized: item["diskResized"],
    masterTargetId: item["masterTargetId"],
    sourceVmCpuCount: item["sourceVmCpuCount"],
    sourceVmRamSizeInMB: item["sourceVmRamSizeInMB"],
    osType: item["osType"],
    vhdName: item["vhdName"],
    osDiskId: item["osDiskId"],
    azureVMDiskDetails: !item["azureVMDiskDetails"]
      ? item["azureVMDiskDetails"]
      : azureVmDiskDetailsArrayDeserializer(item["azureVMDiskDetails"]),
    recoveryAzureVMName: item["recoveryAzureVMName"],
    recoveryAzureVMSize: item["recoveryAzureVMSize"],
    recoveryAzureStorageAccount: item["recoveryAzureStorageAccount"],
    recoveryAzureLogStorageAccountId: item["recoveryAzureLogStorageAccountId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    selectedRecoveryAzureNetworkId: item["selectedRecoveryAzureNetworkId"],
    selectedTfoAzureNetworkId: item["selectedTfoAzureNetworkId"],
    selectedSourceNicId: item["selectedSourceNicId"],
    discoveryType: item["discoveryType"],
    enableRdpOnTargetOption: item["enableRdpOnTargetOption"],
    datastores: !item["datastores"]
      ? item["datastores"]
      : item["datastores"].map((p: any) => {
          return p;
        }),
    targetVmId: item["targetVmId"],
    recoveryAzureResourceGroupId: item["recoveryAzureResourceGroupId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    useManagedDisks: item["useManagedDisks"],
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : healthErrorArrayDeserializer(item["validationErrors"]),
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    lastUpdateReceivedTime: !item["lastUpdateReceivedTime"]
      ? item["lastUpdateReceivedTime"]
      : new Date(item["lastUpdateReceivedTime"]),
    replicaId: item["replicaId"],
    osVersion: item["osVersion"],
    protectedManagedDisks: !item["protectedManagedDisks"]
      ? item["protectedManagedDisks"]
      : inMageAzureV2ManagedDiskDetailsArrayDeserializer(item["protectedManagedDisks"]),
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    firmwareType: item["firmwareType"],
    azureVmGeneration: item["azureVmGeneration"],
    isAdditionalStatsAvailable: item["isAdditionalStatsAvailable"],
    totalDataTransferred: item["totalDataTransferred"],
    totalProgressHealth: item["totalProgressHealth"],
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : Object.fromEntries(
          Object.entries(item["targetVmTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    seedManagedDiskTags: !item["seedManagedDiskTags"]
      ? item["seedManagedDiskTags"]
      : Object.fromEntries(
          Object.entries(item["seedManagedDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetManagedDiskTags: !item["targetManagedDiskTags"]
      ? item["targetManagedDiskTags"]
      : Object.fromEntries(
          Object.entries(item["targetManagedDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : Object.fromEntries(
          Object.entries(item["targetNicTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    switchProviderBlockingErrorDetails: !item["switchProviderBlockingErrorDetails"]
      ? item["switchProviderBlockingErrorDetails"]
      : inMageAzureV2SwitchProviderBlockingErrorDetailsArrayDeserializer(
          item["switchProviderBlockingErrorDetails"],
        ),
    switchProviderDetails: !item["switchProviderDetails"]
      ? item["switchProviderDetails"]
      : inMageAzureV2SwitchProviderDetailsDeserializer(item["switchProviderDetails"]),
    supportedOSVersions: !item["supportedOSVersions"]
      ? item["supportedOSVersions"]
      : item["supportedOSVersions"].map((p: any) => {
          return p;
        }),
    allAvailableOSUpgradeConfigurations: !item["allAvailableOSUpgradeConfigurations"]
      ? item["allAvailableOSUpgradeConfigurations"]
      : osUpgradeSupportedVersionsArrayDeserializer(item["allAvailableOSUpgradeConfigurations"]),
    osName: item["osName"],
  };
}

export function inMageAzureV2ProtectedDiskDetailsArrayDeserializer(
  result: Array<InMageAzureV2ProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageAzureV2ProtectedDiskDetailsDeserializer(item);
  });
}

/** InMageAzureV2 protected disk details. */
export interface InMageAzureV2ProtectedDiskDetails {
  /** The disk id. */
  diskId?: string;
  /** The disk name. */
  diskName?: string;
  /** The protection stage. */
  protectionStage?: string;
  /** The health error code for the disk. */
  healthErrorCode?: string;
  /** The RPO in seconds. */
  rpoInSeconds?: number;
  /** A value indicating whether resync is required for this disk. */
  resyncRequired?: string;
  /** The resync progress percentage. */
  resyncProgressPercentage?: number;
  /** The resync duration in seconds. */
  resyncDurationInSeconds?: number;
  /** The disk capacity in bytes. */
  diskCapacityInBytes?: number;
  /** The disk file system capacity in bytes. */
  fileSystemCapacityInBytes?: number;
  /** The source data transit in MB. */
  sourceDataInMegaBytes?: number;
  /** The PS data transit in MB. */
  psDataInMegaBytes?: number;
  /** The target data transit in MB. */
  targetDataInMegaBytes?: number;
  /** A value indicating whether disk is resized. */
  diskResized?: string;
  /** The last RPO calculated time. */
  lastRpoCalculatedTime?: Date;
  /** The resync processed bytes. */
  resyncProcessedBytes?: number;
  /** The resync total transferred bytes. */
  resyncTotalTransferredBytes?: number;
  /** The resync last 15 minutes transferred bytes. */
  resyncLast15MinutesTransferredBytes?: number;
  /** The last data transfer time in UTC. */
  resyncLastDataTransferTimeUTC?: Date;
  /** The resync start time. */
  resyncStartTime?: Date;
  /** The Progress Health. */
  progressHealth?: string;
  /** The Progress Status. */
  progressStatus?: string;
  /** The seconds to take for switch provider. */
  secondsToTakeSwitchProvider?: number;
}

export function inMageAzureV2ProtectedDiskDetailsDeserializer(
  item: any,
): InMageAzureV2ProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    protectionStage: item["protectionStage"],
    healthErrorCode: item["healthErrorCode"],
    rpoInSeconds: item["rpoInSeconds"],
    resyncRequired: item["resyncRequired"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resyncDurationInSeconds: item["resyncDurationInSeconds"],
    diskCapacityInBytes: item["diskCapacityInBytes"],
    fileSystemCapacityInBytes: item["fileSystemCapacityInBytes"],
    sourceDataInMegaBytes: item["sourceDataInMegaBytes"],
    psDataInMegaBytes: item["psDataInMegaBytes"],
    targetDataInMegaBytes: item["targetDataInMegaBytes"],
    diskResized: item["diskResized"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    resyncProcessedBytes: item["resyncProcessedBytes"],
    resyncTotalTransferredBytes: item["resyncTotalTransferredBytes"],
    resyncLast15MinutesTransferredBytes: item["resyncLast15MinutesTransferredBytes"],
    resyncLastDataTransferTimeUTC: !item["resyncLastDataTransferTimeUTC"]
      ? item["resyncLastDataTransferTimeUTC"]
      : new Date(item["resyncLastDataTransferTimeUTC"]),
    resyncStartTime: !item["resyncStartTime"]
      ? item["resyncStartTime"]
      : new Date(item["resyncStartTime"]),
    progressHealth: item["progressHealth"],
    progressStatus: item["progressStatus"],
    secondsToTakeSwitchProvider: item["secondsToTakeSwitchProvider"],
  };
}

export function inMageAzureV2ManagedDiskDetailsArrayDeserializer(
  result: Array<InMageAzureV2ManagedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageAzureV2ManagedDiskDetailsDeserializer(item);
  });
}

/** InMageAzureV2 Managed disk details. */
export interface InMageAzureV2ManagedDiskDetails {
  /** The disk id. */
  diskId?: string;
  /** Seed managed disk Id. */
  seedManagedDiskId?: string;
  /** The replica disk type. */
  replicaDiskType?: string;
  /** The DiskEncryptionSet ARM ID. */
  diskEncryptionSetId?: string;
  /** The target disk name. */
  targetDiskName?: string;
}

export function inMageAzureV2ManagedDiskDetailsDeserializer(
  item: any,
): InMageAzureV2ManagedDiskDetails {
  return {
    diskId: item["diskId"],
    seedManagedDiskId: item["seedManagedDiskId"],
    replicaDiskType: item["replicaDiskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    targetDiskName: item["targetDiskName"],
  };
}

export function inMageAzureV2SwitchProviderBlockingErrorDetailsArrayDeserializer(
  result: Array<InMageAzureV2SwitchProviderBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageAzureV2SwitchProviderBlockingErrorDetailsDeserializer(item);
  });
}

/** InMageAzureV2 switch provider blocking error details. */
export interface InMageAzureV2SwitchProviderBlockingErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
  /** The error message parameters. */
  readonly errorMessageParameters?: Record<string, string>;
  /** The error tags. */
  readonly errorTags?: Record<string, string>;
}

export function inMageAzureV2SwitchProviderBlockingErrorDetailsDeserializer(
  item: any,
): InMageAzureV2SwitchProviderBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** InMageAzureV2 switch provider details. */
export interface InMageAzureV2SwitchProviderDetails {
  /** The target vault Id. */
  readonly targetVaultId?: string;
  /** The target resource Id. */
  readonly targetResourceId?: string;
  /** The target fabric Id. */
  readonly targetFabricId?: string;
  /** The target appliance Id. */
  readonly targetApplianceId?: string;
}

export function inMageAzureV2SwitchProviderDetailsDeserializer(
  item: any,
): InMageAzureV2SwitchProviderDetails {
  return {
    targetVaultId: item["targetVaultId"],
    targetResourceId: item["targetResourceId"],
    targetFabricId: item["targetFabricId"],
    targetApplianceId: item["targetApplianceId"],
  };
}

/** InMageRcmFailback provider specific details. */
export interface InMageRcmFailbackReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The virtual machine internal identifier. */
  readonly internalIdentifier?: string;
  /** The ARM Id of the azure VM. */
  readonly azureVirtualMachineId?: string;
  /** The multi VM group name. */
  readonly multiVmGroupName?: string;
  /** The reprotect agent Id. */
  readonly reprotectAgentId?: string;
  /** The reprotect agent name. */
  readonly reprotectAgentName?: string;
  /** The type of the OS on the VM. */
  readonly osType?: string;
  /** The log storage account ARM Id. */
  readonly logStorageAccountId?: string;
  /** The target vCenter Id. */
  readonly targetvCenterId?: string;
  /** The target datastore name. */
  readonly targetDataStoreName?: string;
  /** The target VM name. */
  readonly targetVmName?: string;
  /** The initial replication progress percentage. */
  readonly initialReplicationProgressPercentage?: number;
  /** The initial replication processed bytes. This includes sum of total bytes transferred and matched bytes on all selected disks in source VM. */
  readonly initialReplicationProcessedBytes?: number;
  /** The initial replication transferred bytes from source VM to target for all selected disks on source VM. */
  readonly initialReplicationTransferredBytes?: number;
  /** The initial replication progress health. */
  readonly initialReplicationProgressHealth?: VmReplicationProgressHealth;
  /** The resync progress percentage. */
  readonly resyncProgressPercentage?: number;
  /** The resync processed bytes. This includes sum of total bytes transferred and matched bytes on all selected disks in source VM. */
  readonly resyncProcessedBytes?: number;
  /** The resync transferred bytes from source VM to target for all selected disks on source VM. */
  readonly resyncTransferredBytes?: number;
  /** The resync progress health. */
  readonly resyncProgressHealth?: VmReplicationProgressHealth;
  /** A value indicating whether resync is required. */
  readonly resyncRequired?: string;
  /** The resync state. */
  readonly resyncState?: ResyncState;
  /** The list of protected disks. */
  protectedDisks?: InMageRcmFailbackProtectedDiskDetails[];
  /** The mobility agent information. */
  mobilityAgentDetails?: InMageRcmFailbackMobilityAgentDetails;
  /** The network details. */
  vmNics?: InMageRcmFailbackNicDetails[];
  /** The last planned failover start time. */
  readonly lastPlannedFailoverStartTime?: Date;
  /** The last planned failover status. */
  readonly lastPlannedFailoverStatus?: PlannedFailoverStatus;
  /** The discovered VM information. */
  discoveredVmDetails?: InMageRcmFailbackDiscoveredProtectedVmDetails;
  /** The policy Id used by the forward replication. */
  readonly lastUsedPolicyId?: string;
  /** The policy friendly name used by the forward replication. */
  readonly lastUsedPolicyFriendlyName?: string;
  /** A value indicating whether agent registration was successful after failover. */
  readonly isAgentRegistrationSuccessfulAfterFailover?: boolean;
  /** Gets the Instance type. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackReplicationDetailsDeserializer(
  item: any,
): InMageRcmFailbackReplicationDetails {
  return {
    instanceType: item["instanceType"],
    internalIdentifier: item["internalIdentifier"],
    azureVirtualMachineId: item["azureVirtualMachineId"],
    multiVmGroupName: item["multiVmGroupName"],
    reprotectAgentId: item["reprotectAgentId"],
    reprotectAgentName: item["reprotectAgentName"],
    osType: item["osType"],
    logStorageAccountId: item["logStorageAccountId"],
    targetvCenterId: item["targetvCenterId"],
    targetDataStoreName: item["targetDataStoreName"],
    targetVmName: item["targetVmName"],
    initialReplicationProgressPercentage: item["initialReplicationProgressPercentage"],
    initialReplicationProcessedBytes: item["initialReplicationProcessedBytes"],
    initialReplicationTransferredBytes: item["initialReplicationTransferredBytes"],
    initialReplicationProgressHealth: item["initialReplicationProgressHealth"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resyncProcessedBytes: item["resyncProcessedBytes"],
    resyncTransferredBytes: item["resyncTransferredBytes"],
    resyncProgressHealth: item["resyncProgressHealth"],
    resyncRequired: item["resyncRequired"],
    resyncState: item["resyncState"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : inMageRcmFailbackProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    mobilityAgentDetails: !item["mobilityAgentDetails"]
      ? item["mobilityAgentDetails"]
      : inMageRcmFailbackMobilityAgentDetailsDeserializer(item["mobilityAgentDetails"]),
    vmNics: !item["vmNics"]
      ? item["vmNics"]
      : inMageRcmFailbackNicDetailsArrayDeserializer(item["vmNics"]),
    lastPlannedFailoverStartTime: !item["lastPlannedFailoverStartTime"]
      ? item["lastPlannedFailoverStartTime"]
      : new Date(item["lastPlannedFailoverStartTime"]),
    lastPlannedFailoverStatus: item["lastPlannedFailoverStatus"],
    discoveredVmDetails: !item["discoveredVmDetails"]
      ? item["discoveredVmDetails"]
      : inMageRcmFailbackDiscoveredProtectedVmDetailsDeserializer(item["discoveredVmDetails"]),
    lastUsedPolicyId: item["lastUsedPolicyId"],
    lastUsedPolicyFriendlyName: item["lastUsedPolicyFriendlyName"],
    isAgentRegistrationSuccessfulAfterFailover: item["isAgentRegistrationSuccessfulAfterFailover"],
  };
}

/** The initial replication progress health. */
export enum KnownVmReplicationProgressHealth {
  /** None */
  None = "None",
  /** InProgress */
  InProgress = "InProgress",
  /** SlowProgress */
  SlowProgress = "SlowProgress",
  /** NoProgress */
  NoProgress = "NoProgress",
}

/**
 * The initial replication progress health. \
 * {@link KnownVmReplicationProgressHealth} can be used interchangeably with VmReplicationProgressHealth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **InProgress**: InProgress \
 * **SlowProgress**: SlowProgress \
 * **NoProgress**: NoProgress
 */
export type VmReplicationProgressHealth = string;

/** The resync state. */
export enum KnownResyncState {
  /** None */
  None = "None",
  /** PreparedForResynchronization */
  PreparedForResynchronization = "PreparedForResynchronization",
  /** StartedResynchronization */
  StartedResynchronization = "StartedResynchronization",
}

/**
 * The resync state. \
 * {@link KnownResyncState} can be used interchangeably with ResyncState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **PreparedForResynchronization**: PreparedForResynchronization \
 * **StartedResynchronization**: StartedResynchronization
 */
export type ResyncState = string;

export function inMageRcmFailbackProtectedDiskDetailsArrayDeserializer(
  result: Array<InMageRcmFailbackProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmFailbackProtectedDiskDetailsDeserializer(item);
  });
}

/** InMageRcmFailback protected disk details. */
export interface InMageRcmFailbackProtectedDiskDetails {
  /** The disk Id (reported by source agent). */
  readonly diskId?: string;
  /** The disk name. */
  readonly diskName?: string;
  /** A value indicating whether the disk is the OS disk. */
  readonly isOSDisk?: string;
  /** The disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** The disk Uuid (reported by vCenter). */
  readonly diskUuid?: string;
  /** The data pending in log data store in MB. */
  readonly dataPendingInLogDataStoreInMB?: number;
  /** The data pending at source agent in MB. */
  readonly dataPendingAtSourceAgentInMB?: number;
  /** A value indicating whether initial replication is complete or not. */
  readonly isInitialReplicationComplete?: string;
  /** The initial replication details. */
  irDetails?: InMageRcmFailbackSyncDetails;
  /** The resync details. */
  resyncDetails?: InMageRcmFailbackSyncDetails;
  /** The last sync time. */
  readonly lastSyncTime?: Date;
}

export function inMageRcmFailbackProtectedDiskDetailsDeserializer(
  item: any,
): InMageRcmFailbackProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    isOSDisk: item["isOSDisk"],
    capacityInBytes: item["capacityInBytes"],
    diskUuid: item["diskUuid"],
    dataPendingInLogDataStoreInMB: item["dataPendingInLogDataStoreInMB"],
    dataPendingAtSourceAgentInMB: item["dataPendingAtSourceAgentInMB"],
    isInitialReplicationComplete: item["isInitialReplicationComplete"],
    irDetails: !item["irDetails"]
      ? item["irDetails"]
      : inMageRcmFailbackSyncDetailsDeserializer(item["irDetails"]),
    resyncDetails: !item["resyncDetails"]
      ? item["resyncDetails"]
      : inMageRcmFailbackSyncDetailsDeserializer(item["resyncDetails"]),
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
  };
}

/** InMageRcmFailback disk level sync details. */
export interface InMageRcmFailbackSyncDetails {
  /** The progress health. */
  readonly progressHealth?: DiskReplicationProgressHealth;
  /** The transferred bytes from source VM to azure for the disk. */
  readonly transferredBytes?: number;
  /** The bytes transferred in last 15 minutes from source VM to target. */
  readonly last15MinutesTransferredBytes?: number;
  /** The time of the last data transfer from source VM to target. */
  readonly lastDataTransferTimeUtc?: string;
  /** The total processed bytes. This includes bytes that are transferred from source VM to target and matched bytes. */
  readonly processedBytes?: number;
  /** The start time. */
  readonly startTime?: string;
  /** The last refresh time. */
  readonly lastRefreshTime?: string;
  /** Progress in percentage. Progress percentage is calculated based on processed bytes. */
  readonly progressPercentage?: number;
}

export function inMageRcmFailbackSyncDetailsDeserializer(item: any): InMageRcmFailbackSyncDetails {
  return {
    progressHealth: item["progressHealth"],
    transferredBytes: item["transferredBytes"],
    last15MinutesTransferredBytes: item["last15MinutesTransferredBytes"],
    lastDataTransferTimeUtc: item["lastDataTransferTimeUtc"],
    processedBytes: item["processedBytes"],
    startTime: item["startTime"],
    lastRefreshTime: item["lastRefreshTime"],
    progressPercentage: item["progressPercentage"],
  };
}

/** The progress health. */
export enum KnownDiskReplicationProgressHealth {
  /** None */
  None = "None",
  /** InProgress */
  InProgress = "InProgress",
  /** SlowProgress */
  SlowProgress = "SlowProgress",
  /** NoProgress */
  NoProgress = "NoProgress",
  /** Queued */
  Queued = "Queued",
}

/**
 * The progress health. \
 * {@link KnownDiskReplicationProgressHealth} can be used interchangeably with DiskReplicationProgressHealth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **InProgress**: InProgress \
 * **SlowProgress**: SlowProgress \
 * **NoProgress**: NoProgress \
 * **Queued**: Queued
 */
export type DiskReplicationProgressHealth = string;

/** InMageRcmFailback mobility agent details. */
export interface InMageRcmFailbackMobilityAgentDetails {
  /** The agent version. */
  readonly version?: string;
  /** The latest agent version available. */
  readonly latestVersion?: string;
  /** The driver version. */
  readonly driverVersion?: string;
  /** The latest upgradeable version available without reboot. */
  readonly latestUpgradableVersionWithoutReboot?: string;
  /** The agent version expiry date. */
  readonly agentVersionExpiryDate?: Date;
  /** The driver version expiry date. */
  readonly driverVersionExpiryDate?: Date;
  /** The time of the last heartbeat received from the agent. */
  readonly lastHeartbeatUtc?: Date;
  /** The whether update is possible or not. */
  readonly reasonsBlockingUpgrade?: AgentUpgradeBlockedReason[];
  /** A value indicating whether agent is upgradeable or not. */
  readonly isUpgradeable?: string;
}

export function inMageRcmFailbackMobilityAgentDetailsDeserializer(
  item: any,
): InMageRcmFailbackMobilityAgentDetails {
  return {
    version: item["version"],
    latestVersion: item["latestVersion"],
    driverVersion: item["driverVersion"],
    latestUpgradableVersionWithoutReboot: item["latestUpgradableVersionWithoutReboot"],
    agentVersionExpiryDate: !item["agentVersionExpiryDate"]
      ? item["agentVersionExpiryDate"]
      : new Date(item["agentVersionExpiryDate"]),
    driverVersionExpiryDate: !item["driverVersionExpiryDate"]
      ? item["driverVersionExpiryDate"]
      : new Date(item["driverVersionExpiryDate"]),
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    reasonsBlockingUpgrade: !item["reasonsBlockingUpgrade"]
      ? item["reasonsBlockingUpgrade"]
      : item["reasonsBlockingUpgrade"].map((p: any) => {
          return p;
        }),
    isUpgradeable: item["isUpgradeable"],
  };
}

/** Known values of {@link AgentUpgradeBlockedReason} that the service accepts. */
export enum KnownAgentUpgradeBlockedReason {
  /** AlreadyOnLatestVersion */
  AlreadyOnLatestVersion = "AlreadyOnLatestVersion",
  /** RebootRequired */
  RebootRequired = "RebootRequired",
  /** AgentNoHeartbeat */
  AgentNoHeartbeat = "AgentNoHeartbeat",
  /** RcmProxyNoHeartbeat */
  RcmProxyNoHeartbeat = "RcmProxyNoHeartbeat",
  /** ProcessServerNoHeartbeat */
  ProcessServerNoHeartbeat = "ProcessServerNoHeartbeat",
  /** IncompatibleApplianceVersion */
  IncompatibleApplianceVersion = "IncompatibleApplianceVersion",
  /** NotProtected */
  NotProtected = "NotProtected",
  /** UnsupportedProtectionScenario */
  UnsupportedProtectionScenario = "UnsupportedProtectionScenario",
  /** DistroIsNotReported */
  DistroIsNotReported = "DistroIsNotReported",
  /** DistroNotSupportedForUpgrade */
  DistroNotSupportedForUpgrade = "DistroNotSupportedForUpgrade",
  /** MissingUpgradePath */
  MissingUpgradePath = "MissingUpgradePath",
  /** InvalidAgentVersion */
  InvalidAgentVersion = "InvalidAgentVersion",
  /** InvalidDriverVersion */
  InvalidDriverVersion = "InvalidDriverVersion",
  /** ReInstallRequired */
  ReInstallRequired = "ReInstallRequired",
  /** Unknown */
  Unknown = "Unknown",
}

/** Type of AgentUpgradeBlockedReason */
export type AgentUpgradeBlockedReason = string;

export function inMageRcmFailbackNicDetailsArrayDeserializer(
  result: Array<InMageRcmFailbackNicDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmFailbackNicDetailsDeserializer(item);
  });
}

/** InMageRcmFailback NIC details. */
export interface InMageRcmFailbackNicDetails {
  /** The mac address. */
  readonly macAddress?: string;
  /** The network name. */
  readonly networkName?: string;
  /** The adapter type. */
  readonly adapterType?: string;
  /** The IP address. */
  readonly sourceIpAddress?: string;
}

export function inMageRcmFailbackNicDetailsDeserializer(item: any): InMageRcmFailbackNicDetails {
  return {
    macAddress: item["macAddress"],
    networkName: item["networkName"],
    adapterType: item["adapterType"],
    sourceIpAddress: item["sourceIpAddress"],
  };
}

/** The last planned failover status. */
export enum KnownPlannedFailoverStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The last planned failover status. \
 * {@link KnownPlannedFailoverStatus} can be used interchangeably with PlannedFailoverStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Cancelled**: Cancelled \
 * **Unknown**: Unknown
 */
export type PlannedFailoverStatus = string;

/** InMageRcmFailback discovered VM details. */
export interface InMageRcmFailbackDiscoveredProtectedVmDetails {
  /** The VCenter Id. */
  readonly vCenterId?: string;
  /** The VCenter fqdn. */
  readonly vCenterFqdn?: string;
  /** The list of datastores. */
  readonly datastores?: string[];
  /** The list of IP addresses. */
  readonly ipAddresses?: string[];
  /** The VMware tools status. */
  readonly vmwareToolsStatus?: string;
  /** The VM power status. */
  readonly powerStatus?: string;
  /** The VM fqdn. */
  readonly vmFqdn?: string;
  /** The VM's OS name. */
  readonly osName?: string;
  /** The SDS created timestamp. */
  readonly createdTimestamp?: Date;
  /** The SDS updated timestamp. */
  readonly updatedTimestamp?: Date;
  /** A value indicating whether the VM is deleted. */
  readonly isDeleted?: boolean;
  /** The last time when SDS information discovered in SRS. */
  readonly lastDiscoveryTimeInUtc?: Date;
}

export function inMageRcmFailbackDiscoveredProtectedVmDetailsDeserializer(
  item: any,
): InMageRcmFailbackDiscoveredProtectedVmDetails {
  return {
    vCenterId: item["vCenterId"],
    vCenterFqdn: item["vCenterFqdn"],
    datastores: !item["datastores"]
      ? item["datastores"]
      : item["datastores"].map((p: any) => {
          return p;
        }),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
    vmwareToolsStatus: item["vmwareToolsStatus"],
    powerStatus: item["powerStatus"],
    vmFqdn: item["vmFqdn"],
    osName: item["osName"],
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    updatedTimestamp: !item["updatedTimestamp"]
      ? item["updatedTimestamp"]
      : new Date(item["updatedTimestamp"]),
    isDeleted: item["isDeleted"],
    lastDiscoveryTimeInUtc: !item["lastDiscoveryTimeInUtc"]
      ? item["lastDiscoveryTimeInUtc"]
      : new Date(item["lastDiscoveryTimeInUtc"]),
  };
}

/** InMageRcm provider specific details. */
export interface InMageRcmReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The virtual machine internal identifier. */
  readonly internalIdentifier?: string;
  /** The ARM Id of the discovered VM. */
  readonly fabricDiscoveryMachineId?: string;
  /** The multi VM group name. */
  readonly multiVmGroupName?: string;
  /** The type of the discovered VM. */
  readonly discoveryType?: string;
  /** The process server Id. */
  readonly processServerId?: string;
  /** The processor core count. */
  readonly processorCoreCount?: number;
  /** The allocated memory in MB. */
  readonly allocatedMemoryInMB?: number;
  /** The process server name. */
  readonly processServerName?: string;
  /** The run-as account Id. */
  readonly runAsAccountId?: string;
  /** The type of the OS on the VM. */
  readonly osType?: string;
  /** The firmware type. */
  readonly firmwareType?: string;
  /** The IP address of the primary network interface. */
  readonly primaryNicIpAddress?: string;
  /** The target generation. */
  readonly targetGeneration?: string;
  /** License Type of the VM to be used. */
  licenseType?: string;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The replication storage account ARM Id. This is applicable only for the blob based replication test hook. */
  readonly storageAccountId?: string;
  /** Target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The target resource group Id. */
  targetResourceGroupId?: string;
  /** The target location. */
  targetLocation?: string;
  /** The target availability set Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** The target network Id. */
  targetNetworkId?: string;
  /** The test network Id. */
  testNetworkId?: string;
  /** The recovery point Id to which the VM was failed over. */
  readonly failoverRecoveryPointId?: string;
  /** The last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** The last recovery point objective value. */
  readonly lastRpoInSeconds?: number;
  /** The last recovery point objective calculated time. */
  readonly lastRpoCalculatedTime?: Date;
  /** The last recovery point Id. */
  readonly lastRecoveryPointId?: string;
  /** The initial replication progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly initialReplicationProgressPercentage?: number;
  /** The initial replication processed bytes. This includes sum of total bytes transferred and matched bytes on all selected disks in source VM. */
  readonly initialReplicationProcessedBytes?: number;
  /** The initial replication transferred bytes from source VM to azure for all selected disks on source VM. */
  readonly initialReplicationTransferredBytes?: number;
  /** The initial replication progress health. */
  readonly initialReplicationProgressHealth?: VmReplicationProgressHealth;
  /** The resync progress percentage. This is calculated based on total bytes processed for all disks in the source VM. */
  readonly resyncProgressPercentage?: number;
  /** The resync processed bytes. This includes sum of total bytes transferred and matched bytes on all selected disks in source VM. */
  readonly resyncProcessedBytes?: number;
  /** The resync transferred bytes from source VM to azure for all selected disks on source VM. */
  readonly resyncTransferredBytes?: number;
  /** The resync progress health. */
  readonly resyncProgressHealth?: VmReplicationProgressHealth;
  /** A value indicating whether resync is required. */
  readonly resyncRequired?: string;
  /** The resync state. */
  readonly resyncState?: ResyncState;
  /** The agent auto upgrade state. */
  readonly agentUpgradeState?: MobilityAgentUpgradeState;
  /** The last agent upgrade type. */
  readonly lastAgentUpgradeType?: string;
  /** The agent upgrade job Id. */
  readonly agentUpgradeJobId?: string;
  /** The agent version to which last agent upgrade was attempted. */
  readonly agentUpgradeAttemptToVersion?: string;
  /** The list of protected disks. */
  protectedDisks?: InMageRcmProtectedDiskDetails[];
  /** The list of unprotected disks. */
  unprotectedDisks?: InMageRcmUnProtectedDiskDetails[];
  /** A value indicating whether last agent upgrade was successful or not. */
  readonly isLastUpgradeSuccessful?: string;
  /** A value indicating whether agent registration was successful after failover. */
  readonly isAgentRegistrationSuccessfulAfterFailover?: boolean;
  /** The mobility agent information. */
  mobilityAgentDetails?: InMageRcmMobilityAgentDetails;
  /** The last agent upgrade error information. */
  lastAgentUpgradeErrorDetails?: InMageRcmLastAgentUpgradeErrorDetails[];
  /** The agent upgrade blocking error information. */
  agentUpgradeBlockingErrorDetails?: InMageRcmAgentUpgradeBlockingErrorDetails[];
  /** The network details. */
  vmNics?: InMageRcmNicDetails[];
  /** The discovered VM details. */
  discoveredVmDetails?: InMageRcmDiscoveredProtectedVmDetails;
  /** The target VM tags. */
  targetVmTags?: UserCreatedResourceTag[];
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: UserCreatedResourceTag[];
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: UserCreatedResourceTag[];
  /** The tags for the target NICs. */
  targetNicTags?: UserCreatedResourceTag[];
  /** The SQL Server license type. */
  sqlServerLicenseType?: string;
  /** A value indicating the inplace OS Upgrade version. */
  supportedOSVersions?: string[];
  /** The OS name associated with VM. */
  osName?: string;
  /** The target VM security profile. */
  targetVmSecurityProfile?: SecurityProfileProperties;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** Gets the Instance type. */
  instanceType: "InMageRcm";
}

export function inMageRcmReplicationDetailsDeserializer(item: any): InMageRcmReplicationDetails {
  return {
    instanceType: item["instanceType"],
    internalIdentifier: item["internalIdentifier"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    multiVmGroupName: item["multiVmGroupName"],
    discoveryType: item["discoveryType"],
    processServerId: item["processServerId"],
    processorCoreCount: item["processorCoreCount"],
    allocatedMemoryInMB: item["allocatedMemoryInMB"],
    processServerName: item["processServerName"],
    runAsAccountId: item["runAsAccountId"],
    osType: item["osType"],
    firmwareType: item["firmwareType"],
    primaryNicIpAddress: item["primaryNicIpAddress"],
    targetGeneration: item["targetGeneration"],
    licenseType: item["licenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    storageAccountId: item["storageAccountId"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetLocation: item["targetLocation"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    lastRpoInSeconds: item["lastRpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    lastRecoveryPointId: item["lastRecoveryPointId"],
    initialReplicationProgressPercentage: item["initialReplicationProgressPercentage"],
    initialReplicationProcessedBytes: item["initialReplicationProcessedBytes"],
    initialReplicationTransferredBytes: item["initialReplicationTransferredBytes"],
    initialReplicationProgressHealth: item["initialReplicationProgressHealth"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resyncProcessedBytes: item["resyncProcessedBytes"],
    resyncTransferredBytes: item["resyncTransferredBytes"],
    resyncProgressHealth: item["resyncProgressHealth"],
    resyncRequired: item["resyncRequired"],
    resyncState: item["resyncState"],
    agentUpgradeState: item["agentUpgradeState"],
    lastAgentUpgradeType: item["lastAgentUpgradeType"],
    agentUpgradeJobId: item["agentUpgradeJobId"],
    agentUpgradeAttemptToVersion: item["agentUpgradeAttemptToVersion"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : inMageRcmProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    unprotectedDisks: !item["unprotectedDisks"]
      ? item["unprotectedDisks"]
      : inMageRcmUnProtectedDiskDetailsArrayDeserializer(item["unprotectedDisks"]),
    isLastUpgradeSuccessful: item["isLastUpgradeSuccessful"],
    isAgentRegistrationSuccessfulAfterFailover: item["isAgentRegistrationSuccessfulAfterFailover"],
    mobilityAgentDetails: !item["mobilityAgentDetails"]
      ? item["mobilityAgentDetails"]
      : inMageRcmMobilityAgentDetailsDeserializer(item["mobilityAgentDetails"]),
    lastAgentUpgradeErrorDetails: !item["lastAgentUpgradeErrorDetails"]
      ? item["lastAgentUpgradeErrorDetails"]
      : inMageRcmLastAgentUpgradeErrorDetailsArrayDeserializer(
          item["lastAgentUpgradeErrorDetails"],
        ),
    agentUpgradeBlockingErrorDetails: !item["agentUpgradeBlockingErrorDetails"]
      ? item["agentUpgradeBlockingErrorDetails"]
      : inMageRcmAgentUpgradeBlockingErrorDetailsArrayDeserializer(
          item["agentUpgradeBlockingErrorDetails"],
        ),
    vmNics: !item["vmNics"] ? item["vmNics"] : inMageRcmNicDetailsArrayDeserializer(item["vmNics"]),
    discoveredVmDetails: !item["discoveredVmDetails"]
      ? item["discoveredVmDetails"]
      : inMageRcmDiscoveredProtectedVmDetailsDeserializer(item["discoveredVmDetails"]),
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : userCreatedResourceTagArrayDeserializer(item["targetVmTags"]),
    seedManagedDiskTags: !item["seedManagedDiskTags"]
      ? item["seedManagedDiskTags"]
      : userCreatedResourceTagArrayDeserializer(item["seedManagedDiskTags"]),
    targetManagedDiskTags: !item["targetManagedDiskTags"]
      ? item["targetManagedDiskTags"]
      : userCreatedResourceTagArrayDeserializer(item["targetManagedDiskTags"]),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : userCreatedResourceTagArrayDeserializer(item["targetNicTags"]),
    sqlServerLicenseType: item["sqlServerLicenseType"],
    supportedOSVersions: !item["supportedOSVersions"]
      ? item["supportedOSVersions"]
      : item["supportedOSVersions"].map((p: any) => {
          return p;
        }),
    osName: item["osName"],
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : securityProfilePropertiesDeserializer(item["targetVmSecurityProfile"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

/** The agent auto upgrade state. */
export enum KnownMobilityAgentUpgradeState {
  /** None */
  None = "None",
  /** Started */
  Started = "Started",
  /** Completed */
  Completed = "Completed",
  /** Commit */
  Commit = "Commit",
}

/**
 * The agent auto upgrade state. \
 * {@link KnownMobilityAgentUpgradeState} can be used interchangeably with MobilityAgentUpgradeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Started**: Started \
 * **Completed**: Completed \
 * **Commit**: Commit
 */
export type MobilityAgentUpgradeState = string;

export function inMageRcmProtectedDiskDetailsArrayDeserializer(
  result: Array<InMageRcmProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmProtectedDiskDetailsDeserializer(item);
  });
}

/** InMageRcm protected disk details. */
export interface InMageRcmProtectedDiskDetails {
  /** The disk Id. */
  readonly diskId?: string;
  /** The disk name. */
  readonly diskName?: string;
  /** A value indicating whether the disk is the OS disk. */
  readonly isOSDisk?: string;
  /** The disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** The disk state. */
  readonly diskState?: DiskState;
  /** The log storage account ARM Id. */
  readonly logStorageAccountId?: string;
  /** The DiskEncryptionSet ARM Id. */
  readonly diskEncryptionSetId?: string;
  /** The ARM Id of the seed managed disk. */
  readonly seedManagedDiskId?: string;
  /** The uri of the seed blob. */
  readonly seedBlobUri?: string;
  /** The ARM Id of the target managed disk. */
  readonly targetManagedDiskId?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The data pending in log data store in MB. */
  readonly dataPendingInLogDataStoreInMB?: number;
  /** The data pending at source agent in MB. */
  readonly dataPendingAtSourceAgentInMB?: number;
  /** A value indicating whether initial replication is complete or not. */
  readonly isInitialReplicationComplete?: string;
  /** The initial replication details. */
  irDetails?: InMageRcmSyncDetails;
  /** The resync details. */
  resyncDetails?: InMageRcmSyncDetails;
  /** The custom target Azure disk name. */
  customTargetDiskName?: string;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function inMageRcmProtectedDiskDetailsDeserializer(
  item: any,
): InMageRcmProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    isOSDisk: item["isOSDisk"],
    capacityInBytes: item["capacityInBytes"],
    diskState: item["diskState"],
    logStorageAccountId: item["logStorageAccountId"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    seedManagedDiskId: item["seedManagedDiskId"],
    seedBlobUri: item["seedBlobUri"],
    targetManagedDiskId: item["targetManagedDiskId"],
    diskType: item["diskType"],
    dataPendingInLogDataStoreInMB: item["dataPendingInLogDataStoreInMB"],
    dataPendingAtSourceAgentInMB: item["dataPendingAtSourceAgentInMB"],
    isInitialReplicationComplete: item["isInitialReplicationComplete"],
    irDetails: !item["irDetails"]
      ? item["irDetails"]
      : inMageRcmSyncDetailsDeserializer(item["irDetails"]),
    resyncDetails: !item["resyncDetails"]
      ? item["resyncDetails"]
      : inMageRcmSyncDetailsDeserializer(item["resyncDetails"]),
    customTargetDiskName: item["customTargetDiskName"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** The disk state. */
export enum KnownDiskState {
  /** Unavailable */
  Unavailable = "Unavailable",
  /** InitialReplicationPending */
  InitialReplicationPending = "InitialReplicationPending",
  /** InitialReplicationFailed */
  InitialReplicationFailed = "InitialReplicationFailed",
  /** Protected */
  Protected = "Protected",
}

/**
 * The disk state. \
 * {@link KnownDiskState} can be used interchangeably with DiskState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unavailable**: Unavailable \
 * **InitialReplicationPending**: InitialReplicationPending \
 * **InitialReplicationFailed**: InitialReplicationFailed \
 * **Protected**: Protected
 */
export type DiskState = string;

/** InMageRcm disk level sync details. */
export interface InMageRcmSyncDetails {
  /** The progress health. */
  readonly progressHealth?: DiskReplicationProgressHealth;
  /** The transferred bytes from source VM to azure for the disk. */
  readonly transferredBytes?: number;
  /** The bytes transferred in last 15 minutes from source VM to azure. */
  readonly last15MinutesTransferredBytes?: number;
  /** The time of the last data transfer from source VM to azure. */
  readonly lastDataTransferTimeUtc?: string;
  /** The total processed bytes. This includes bytes that are transferred from source VM to azure and matched bytes. */
  readonly processedBytes?: number;
  /** The start time. */
  readonly startTime?: string;
  /** The last refresh time. */
  readonly lastRefreshTime?: string;
  /** Progress in percentage. Progress percentage is calculated based on processed bytes. */
  readonly progressPercentage?: number;
}

export function inMageRcmSyncDetailsDeserializer(item: any): InMageRcmSyncDetails {
  return {
    progressHealth: item["progressHealth"],
    transferredBytes: item["transferredBytes"],
    last15MinutesTransferredBytes: item["last15MinutesTransferredBytes"],
    lastDataTransferTimeUtc: item["lastDataTransferTimeUtc"],
    processedBytes: item["processedBytes"],
    startTime: item["startTime"],
    lastRefreshTime: item["lastRefreshTime"],
    progressPercentage: item["progressPercentage"],
  };
}

export function inMageRcmUnProtectedDiskDetailsArrayDeserializer(
  result: Array<InMageRcmUnProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmUnProtectedDiskDetailsDeserializer(item);
  });
}

/** InMageRcm un-protected disk details. */
export interface InMageRcmUnProtectedDiskDetails {
  /** The disk Id. */
  readonly diskId?: string;
  /** The disk name. */
  readonly diskName?: string;
  /** The disk capacity in bytes. */
  readonly capacityInBytes?: number;
}

export function inMageRcmUnProtectedDiskDetailsDeserializer(
  item: any,
): InMageRcmUnProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    capacityInBytes: item["capacityInBytes"],
  };
}

/** InMageRcm mobility agent details. */
export interface InMageRcmMobilityAgentDetails {
  /** The agent version. */
  readonly version?: string;
  /** The latest agent version available. */
  readonly latestVersion?: string;
  /** The latest agent version release date. */
  readonly latestAgentReleaseDate?: string;
  /** The driver version. */
  readonly driverVersion?: string;
  /** The latest upgradeable version available without reboot. */
  readonly latestUpgradableVersionWithoutReboot?: string;
  /** The agent version expiry date. */
  readonly agentVersionExpiryDate?: Date;
  /** The driver version expiry date. */
  readonly driverVersionExpiryDate?: Date;
  /** The time of the last heartbeat received from the agent. */
  readonly lastHeartbeatUtc?: Date;
  /** The whether update is possible or not. */
  readonly reasonsBlockingUpgrade?: AgentUpgradeBlockedReason[];
  /** A value indicating whether agent is upgradeable or not. */
  readonly isUpgradeable?: string;
  /** The agent auto reinstall state. */
  readonly agentReinstallState?: MobilityAgentReinstallType[];
  /** The last agent reinstall type. */
  readonly lastAgentReinstallType?: string;
  /** The agent reinstall job Id. */
  readonly agentReinstallJobId?: string;
  /** The last agent reinstall type. */
  readonly agentReinstallAttemptToVersion?: string;
  /** The OS family name. */
  osFamilyName?: string;
  /** The distro name. */
  distroName?: string;
  /** Distro name for which agent is installed. */
  distroNameForWhichAgentIsInstalled?: string;
  /** A value indicating whether replication agent upgradeable. */
  isAgentUpgradeable?: boolean;
  /** A value indicating whether replication agent reinstallation is required. */
  isAgentReinstallRequired?: boolean;
  /** A value indicating whether replication agent reinstallation is required. */
  isLastReinstallSuccessful?: boolean;
  /** whether reinstall is possible or not. */
  readonly reasonsBlockingReinstall?: AgentReinstallBlockedReason[];
  /** whether reinstall is possible or not. */
  readonly reasonsBlockingReinstallDetails?: InMageRcmAgentReinstallBlockingErrorDetails[];
}

export function inMageRcmMobilityAgentDetailsDeserializer(
  item: any,
): InMageRcmMobilityAgentDetails {
  return {
    version: item["version"],
    latestVersion: item["latestVersion"],
    latestAgentReleaseDate: item["latestAgentReleaseDate"],
    driverVersion: item["driverVersion"],
    latestUpgradableVersionWithoutReboot: item["latestUpgradableVersionWithoutReboot"],
    agentVersionExpiryDate: !item["agentVersionExpiryDate"]
      ? item["agentVersionExpiryDate"]
      : new Date(item["agentVersionExpiryDate"]),
    driverVersionExpiryDate: !item["driverVersionExpiryDate"]
      ? item["driverVersionExpiryDate"]
      : new Date(item["driverVersionExpiryDate"]),
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    reasonsBlockingUpgrade: !item["reasonsBlockingUpgrade"]
      ? item["reasonsBlockingUpgrade"]
      : item["reasonsBlockingUpgrade"].map((p: any) => {
          return p;
        }),
    isUpgradeable: item["isUpgradeable"],
    agentReinstallState: !item["agentReinstallState"]
      ? item["agentReinstallState"]
      : item["agentReinstallState"].map((p: any) => {
          return p;
        }),
    lastAgentReinstallType: item["lastAgentReinstallType"],
    agentReinstallJobId: item["agentReinstallJobId"],
    agentReinstallAttemptToVersion: item["agentReinstallAttemptToVersion"],
    osFamilyName: item["osFamilyName"],
    distroName: item["distroName"],
    distroNameForWhichAgentIsInstalled: item["distroNameForWhichAgentIsInstalled"],
    isAgentUpgradeable: item["isAgentUpgradeable"],
    isAgentReinstallRequired: item["isAgentReinstallRequired"],
    isLastReinstallSuccessful: item["isLastReinstallSuccessful"],
    reasonsBlockingReinstall: !item["reasonsBlockingReinstall"]
      ? item["reasonsBlockingReinstall"]
      : item["reasonsBlockingReinstall"].map((p: any) => {
          return p;
        }),
    reasonsBlockingReinstallDetails: !item["reasonsBlockingReinstallDetails"]
      ? item["reasonsBlockingReinstallDetails"]
      : inMageRcmAgentReinstallBlockingErrorDetailsArrayDeserializer(
          item["reasonsBlockingReinstallDetails"],
        ),
  };
}

/** Known values of {@link MobilityAgentReinstallType} that the service accepts. */
export enum KnownMobilityAgentReinstallType {
  /** UserTriggered */
  UserTriggered = "UserTriggered",
  /** AutoTriggered */
  AutoTriggered = "AutoTriggered",
}

/** Type of MobilityAgentReinstallType */
export type MobilityAgentReinstallType = string;

/** Known values of {@link AgentReinstallBlockedReason} that the service accepts. */
export enum KnownAgentReinstallBlockedReason {
  /** DistroNotSupported */
  DistroNotSupported = "DistroNotSupported",
  /** AgentNoHeartbeat */
  AgentNoHeartbeat = "AgentNoHeartbeat",
  /** Unknown */
  Unknown = "Unknown",
}

/** Type of AgentReinstallBlockedReason */
export type AgentReinstallBlockedReason = string;

export function inMageRcmAgentReinstallBlockingErrorDetailsArrayDeserializer(
  result: Array<InMageRcmAgentReinstallBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmAgentReinstallBlockingErrorDetailsDeserializer(item);
  });
}

/** InMageRcm source agent reinstall blocking error details. */
export interface InMageRcmAgentReinstallBlockingErrorDetails {
  /** error code. */
  errorCode?: string;
  /** error message. */
  errorMessage?: string;
  /** possible causes. */
  possibleCauses?: string;
  /** recommended action. */
  recommendedAction?: string;
  /** error message parameters. */
  errorMessageParameters?: Record<string, string>;
  /** error tags. */
  errorTags?: Record<string, string>;
}

export function inMageRcmAgentReinstallBlockingErrorDetailsDeserializer(
  item: any,
): InMageRcmAgentReinstallBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function inMageRcmLastAgentUpgradeErrorDetailsArrayDeserializer(
  result: Array<InMageRcmLastAgentUpgradeErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmLastAgentUpgradeErrorDetailsDeserializer(item);
  });
}

/** InMageRcm last source agent upgrade error details. */
export interface InMageRcmLastAgentUpgradeErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
  /** The error message parameters. */
  readonly errorMessageParameters?: Record<string, string>;
  /** The error tags. */
  readonly errorTags?: Record<string, string>;
}

export function inMageRcmLastAgentUpgradeErrorDetailsDeserializer(
  item: any,
): InMageRcmLastAgentUpgradeErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function inMageRcmAgentUpgradeBlockingErrorDetailsArrayDeserializer(
  result: Array<InMageRcmAgentUpgradeBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmAgentUpgradeBlockingErrorDetailsDeserializer(item);
  });
}

/** InMageRcm source agent upgrade blocking error details. */
export interface InMageRcmAgentUpgradeBlockingErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
  /** The error message parameters. */
  readonly errorMessageParameters?: Record<string, string>;
  /** The error tags. */
  readonly errorTags?: Record<string, string>;
}

export function inMageRcmAgentUpgradeBlockingErrorDetailsDeserializer(
  item: any,
): InMageRcmAgentUpgradeBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function inMageRcmNicDetailsArrayDeserializer(result: Array<InMageRcmNicDetails>): any[] {
  return result.map((item) => {
    return inMageRcmNicDetailsDeserializer(item);
  });
}

/** InMageRcm NIC details. */
export interface InMageRcmNicDetails {
  /** The NIC Id. */
  readonly nicId?: string;
  /** A value indicating whether this is the primary NIC. */
  isPrimaryNic?: string;
  /** A value indicating whether this NIC is selected for failover. */
  isSelectedForFailover?: string;
  /** The source IP address. */
  readonly sourceIPAddress?: string;
  /** The source IP address type. */
  readonly sourceIPAddressType?: EthernetAddressType;
  /** Source network Id. */
  readonly sourceNetworkId?: string;
  /** Source subnet name. */
  readonly sourceSubnetName?: string;
  /** The target IP address. */
  targetIPAddress?: string;
  /** The target IP address type. */
  targetIPAddressType?: EthernetAddressType;
  /** Target subnet name. */
  targetSubnetName?: string;
  /** Test subnet name. */
  testSubnetName?: string;
  /** The test IP address. */
  testIPAddress?: string;
  /** The test IP address type. */
  testIPAddressType?: EthernetAddressType;
  /** The target NIC name. */
  targetNicName?: string;
}

export function inMageRcmNicDetailsDeserializer(item: any): InMageRcmNicDetails {
  return {
    nicId: item["nicId"],
    isPrimaryNic: item["isPrimaryNic"],
    isSelectedForFailover: item["isSelectedForFailover"],
    sourceIPAddress: item["sourceIPAddress"],
    sourceIPAddressType: item["sourceIPAddressType"],
    sourceNetworkId: item["sourceNetworkId"],
    sourceSubnetName: item["sourceSubnetName"],
    targetIPAddress: item["targetIPAddress"],
    targetIPAddressType: item["targetIPAddressType"],
    targetSubnetName: item["targetSubnetName"],
    testSubnetName: item["testSubnetName"],
    testIPAddress: item["testIPAddress"],
    testIPAddressType: item["testIPAddressType"],
    targetNicName: item["targetNicName"],
  };
}

/** The source IP address type. */
export enum KnownEthernetAddressType {
  /** Dynamic */
  Dynamic = "Dynamic",
  /** Static */
  Static = "Static",
}

/**
 * The source IP address type. \
 * {@link KnownEthernetAddressType} can be used interchangeably with EthernetAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic**: Dynamic \
 * **Static**: Static
 */
export type EthernetAddressType = string;

/** InMageRcm discovered protected VM details. */
export interface InMageRcmDiscoveredProtectedVmDetails {
  /** The VCenter Id. */
  readonly vCenterId?: string;
  /** The VCenter fqdn. */
  readonly vCenterFqdn?: string;
  /** The list of datastores. */
  readonly datastores?: string[];
  /** The list of IP addresses. */
  readonly ipAddresses?: string[];
  /** The VMware tools status. */
  readonly vmwareToolsStatus?: string;
  /** The VM power status. */
  readonly powerStatus?: string;
  /** The VM fqdn. */
  readonly vmFqdn?: string;
  /** The VM's OS name. */
  readonly osName?: string;
  /** The SDS created timestamp. */
  readonly createdTimestamp?: Date;
  /** The SDS updated timestamp. */
  readonly updatedTimestamp?: Date;
  /** A value indicating whether the VM is deleted. */
  readonly isDeleted?: boolean;
  /** The last time when SDS information discovered in SRS. */
  readonly lastDiscoveryTimeInUtc?: Date;
}

export function inMageRcmDiscoveredProtectedVmDetailsDeserializer(
  item: any,
): InMageRcmDiscoveredProtectedVmDetails {
  return {
    vCenterId: item["vCenterId"],
    vCenterFqdn: item["vCenterFqdn"],
    datastores: !item["datastores"]
      ? item["datastores"]
      : item["datastores"].map((p: any) => {
          return p;
        }),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
    vmwareToolsStatus: item["vmwareToolsStatus"],
    powerStatus: item["powerStatus"],
    vmFqdn: item["vmFqdn"],
    osName: item["osName"],
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    updatedTimestamp: !item["updatedTimestamp"]
      ? item["updatedTimestamp"]
      : new Date(item["updatedTimestamp"]),
    isDeleted: item["isDeleted"],
    lastDiscoveryTimeInUtc: !item["lastDiscoveryTimeInUtc"]
      ? item["lastDiscoveryTimeInUtc"]
      : new Date(item["lastDiscoveryTimeInUtc"]),
  };
}

export function userCreatedResourceTagArraySerializer(
  result: Array<UserCreatedResourceTag>,
): any[] {
  return result.map((item) => {
    return userCreatedResourceTagSerializer(item);
  });
}

export function userCreatedResourceTagArrayDeserializer(
  result: Array<UserCreatedResourceTag>,
): any[] {
  return result.map((item) => {
    return userCreatedResourceTagDeserializer(item);
  });
}

/** Resource tag input. */
export interface UserCreatedResourceTag {
  /** The tag name. Please read for more information: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#limitations */
  tagName?: string;
  /** The tag value. Please read her for more information: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#limitations */
  tagValue?: string;
}

export function userCreatedResourceTagSerializer(item: UserCreatedResourceTag): any {
  return { tagName: item["tagName"], tagValue: item["tagValue"] };
}

export function userCreatedResourceTagDeserializer(item: any): UserCreatedResourceTag {
  return {
    tagName: item["tagName"],
    tagValue: item["tagValue"],
  };
}

/** InMage provider specific settings. */
export interface InMageReplicationDetails extends ReplicationProviderSpecificSettings {
  /** The active location of the VM. If the VM is being protected from Azure, this field will take values from { Azure, OnPrem }. If the VM is being protected between two data-centers, this field will be OnPrem always. */
  activeSiteType?: string;
  /** The CPU count of the VM on the primary side. */
  sourceVmCpuCount?: number;
  /** The RAM size of the VM on the primary side. */
  sourceVmRamSizeInMB?: number;
  /** The OS details. */
  osDetails?: OSDiskDetails;
  /** The protection stage. */
  protectionStage?: string;
  /** The virtual machine Id. */
  vmId?: string;
  /** The protection state for the vm. */
  vmProtectionState?: string;
  /** The protection state description for the vm. */
  vmProtectionStateDescription?: string;
  /** The resync details of the machine. */
  resyncDetails?: InitialReplicationDetails;
  /** The retention window start time. */
  retentionWindowStart?: Date;
  /** The retention window end time. */
  retentionWindowEnd?: Date;
  /** The compressed data change rate in MB. */
  compressedDataRateInMB?: number;
  /** The uncompressed data change rate in MB. */
  uncompressedDataRateInMB?: number;
  /** The RPO in seconds. */
  rpoInSeconds?: number;
  /** The list of protected disks. */
  protectedDisks?: InMageProtectedDiskDetails[];
  /** The source IP address. */
  ipAddress?: string;
  /** The last heartbeat received from the source server. */
  lastHeartbeat?: Date;
  /** The process server Id. */
  processServerId?: string;
  /** The master target Id. */
  masterTargetId?: string;
  /** The collection of Consistency points. */
  consistencyPoints?: Record<string, Date>;
  /** A value indicating whether any disk is resized for this VM. */
  diskResized?: string;
  /** A value indicating whether the source server requires a restart after update. */
  rebootAfterUpdateStatus?: string;
  /** The multi vm group Id, if any. */
  multiVmGroupId?: string;
  /** The multi vm group name, if any. */
  multiVmGroupName?: string;
  /** A value indicating whether the multi vm sync is enabled or disabled. */
  multiVmSyncStatus?: string;
  /** The agent details. */
  agentDetails?: InMageAgentDetails;
  /** The vCenter infrastructure Id. */
  vCenterInfrastructureId?: string;
  /** The infrastructure VM Id. */
  infrastructureVmId?: string;
  /** The PE Network details. */
  vmNics?: VMNicDetails[];
  /** A value indicating the discovery type of the machine. */
  discoveryType?: string;
  /** A value indicating the underlying Azure storage account. If the VM is not running in Azure, this value shall be set to null. */
  azureStorageAccountId?: string;
  /** The datastores of the on-premise machine Value can be list of strings that contain datastore names. */
  datastores?: string[];
  /** The validation errors of the on-premise machine Value can be list of validation errors. */
  validationErrors?: HealthError[];
  /** The last RPO calculated time. */
  lastRpoCalculatedTime?: Date;
  /** The last update time received from on-prem components. */
  lastUpdateReceivedTime?: Date;
  /** The replica id of the protected item. */
  replicaId?: string;
  /** The OS Version of the protected item. */
  osVersion?: string;
  /** A value indicating whether additional IR stats are available or not. */
  isAdditionalStatsAvailable?: boolean;
  /** The total transferred data in bytes. */
  totalDataTransferred?: number;
  /** The progress health. */
  totalProgressHealth?: string;
  /** Gets the Instance type. */
  instanceType: "InMage";
}

export function inMageReplicationDetailsDeserializer(item: any): InMageReplicationDetails {
  return {
    instanceType: item["instanceType"],
    activeSiteType: item["activeSiteType"],
    sourceVmCpuCount: item["sourceVmCpuCount"],
    sourceVmRamSizeInMB: item["sourceVmRamSizeInMB"],
    osDetails: !item["osDetails"]
      ? item["osDetails"]
      : osDiskDetailsDeserializer(item["osDetails"]),
    protectionStage: item["protectionStage"],
    vmId: item["vmId"],
    vmProtectionState: item["vmProtectionState"],
    vmProtectionStateDescription: item["vmProtectionStateDescription"],
    resyncDetails: !item["resyncDetails"]
      ? item["resyncDetails"]
      : initialReplicationDetailsDeserializer(item["resyncDetails"]),
    retentionWindowStart: !item["retentionWindowStart"]
      ? item["retentionWindowStart"]
      : new Date(item["retentionWindowStart"]),
    retentionWindowEnd: !item["retentionWindowEnd"]
      ? item["retentionWindowEnd"]
      : new Date(item["retentionWindowEnd"]),
    compressedDataRateInMB: item["compressedDataRateInMB"],
    uncompressedDataRateInMB: item["uncompressedDataRateInMB"],
    rpoInSeconds: item["rpoInSeconds"],
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : inMageProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    ipAddress: item["ipAddress"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    processServerId: item["processServerId"],
    masterTargetId: item["masterTargetId"],
    consistencyPoints: !item["consistencyPoints"]
      ? item["consistencyPoints"]
      : Object.fromEntries(
          Object.entries(item["consistencyPoints"]).map(([k, p]: [string, any]) => [
            k,
            new Date(p),
          ]),
        ),
    diskResized: item["diskResized"],
    rebootAfterUpdateStatus: item["rebootAfterUpdateStatus"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
    agentDetails: !item["agentDetails"]
      ? item["agentDetails"]
      : inMageAgentDetailsDeserializer(item["agentDetails"]),
    vCenterInfrastructureId: item["vCenterInfrastructureId"],
    infrastructureVmId: item["infrastructureVmId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicDetailsArrayDeserializer(item["vmNics"]),
    discoveryType: item["discoveryType"],
    azureStorageAccountId: item["azureStorageAccountId"],
    datastores: !item["datastores"]
      ? item["datastores"]
      : item["datastores"].map((p: any) => {
          return p;
        }),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : healthErrorArrayDeserializer(item["validationErrors"]),
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    lastUpdateReceivedTime: !item["lastUpdateReceivedTime"]
      ? item["lastUpdateReceivedTime"]
      : new Date(item["lastUpdateReceivedTime"]),
    replicaId: item["replicaId"],
    osVersion: item["osVersion"],
    isAdditionalStatsAvailable: item["isAdditionalStatsAvailable"],
    totalDataTransferred: item["totalDataTransferred"],
    totalProgressHealth: item["totalProgressHealth"],
  };
}

/** Details of the OS Disk. */
export interface OSDiskDetails {
  /** The id of the disk containing the OS. */
  osVhdId?: string;
  /** The type of the OS on the VM. */
  osType?: string;
  /** The OS disk VHD name. */
  vhdName?: string;
}

export function osDiskDetailsDeserializer(item: any): OSDiskDetails {
  return {
    osVhdId: item["osVhdId"],
    osType: item["osType"],
    vhdName: item["vhdName"],
  };
}

export function inMageProtectedDiskDetailsArrayDeserializer(
  result: Array<InMageProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return inMageProtectedDiskDetailsDeserializer(item);
  });
}

/** InMage protected disk details. */
export interface InMageProtectedDiskDetails {
  /** The disk id. */
  diskId?: string;
  /** The disk name. */
  diskName?: string;
  /** The protection stage. */
  protectionStage?: string;
  /** The health error code for the disk. */
  healthErrorCode?: string;
  /** The RPO in seconds. */
  rpoInSeconds?: number;
  /** A value indicating whether resync is required for this disk. */
  resyncRequired?: string;
  /** The resync progress percentage. */
  resyncProgressPercentage?: number;
  /** The resync duration in seconds. */
  resyncDurationInSeconds?: number;
  /** The disk capacity in bytes. */
  diskCapacityInBytes?: number;
  /** The file system capacity in bytes. */
  fileSystemCapacityInBytes?: number;
  /** The source data transit in MB. */
  sourceDataInMB?: number;
  /** The PS data transit in MB. */
  psDataInMB?: number;
  /** The target data transit in MB. */
  targetDataInMB?: number;
  /** A value indicating whether disk is resized. */
  diskResized?: string;
  /** The last RPO calculated time. */
  lastRpoCalculatedTime?: Date;
  /** The resync processed bytes. */
  resyncProcessedBytes?: number;
  /** The resync total transferred bytes. */
  resyncTotalTransferredBytes?: number;
  /** The resync last 15 minutes transferred bytes. */
  resyncLast15MinutesTransferredBytes?: number;
  /** The last data transfer time in UTC. */
  resyncLastDataTransferTimeUTC?: Date;
  /** The resync start time. */
  resyncStartTime?: Date;
  /** The Progress Health. */
  progressHealth?: string;
  /** The Progress Status. */
  progressStatus?: string;
}

export function inMageProtectedDiskDetailsDeserializer(item: any): InMageProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    protectionStage: item["protectionStage"],
    healthErrorCode: item["healthErrorCode"],
    rpoInSeconds: item["rpoInSeconds"],
    resyncRequired: item["resyncRequired"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resyncDurationInSeconds: item["resyncDurationInSeconds"],
    diskCapacityInBytes: item["diskCapacityInBytes"],
    fileSystemCapacityInBytes: item["fileSystemCapacityInBytes"],
    sourceDataInMB: item["sourceDataInMB"],
    psDataInMB: item["psDataInMB"],
    targetDataInMB: item["targetDataInMB"],
    diskResized: item["diskResized"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    resyncProcessedBytes: item["resyncProcessedBytes"],
    resyncTotalTransferredBytes: item["resyncTotalTransferredBytes"],
    resyncLast15MinutesTransferredBytes: item["resyncLast15MinutesTransferredBytes"],
    resyncLastDataTransferTimeUTC: !item["resyncLastDataTransferTimeUTC"]
      ? item["resyncLastDataTransferTimeUTC"]
      : new Date(item["resyncLastDataTransferTimeUTC"]),
    resyncStartTime: !item["resyncStartTime"]
      ? item["resyncStartTime"]
      : new Date(item["resyncStartTime"]),
    progressHealth: item["progressHealth"],
    progressStatus: item["progressStatus"],
  };
}

/** The details of the InMage agent. */
export interface InMageAgentDetails {
  /** The agent version. */
  agentVersion?: string;
  /** A value indicating whether installed agent needs to be updated. */
  agentUpdateStatus?: string;
  /** A value indicating whether reboot is required after update is applied. */
  postUpdateRebootStatus?: string;
  /** Agent expiry date. */
  agentExpiryDate?: Date;
}

export function inMageAgentDetailsDeserializer(item: any): InMageAgentDetails {
  return {
    agentVersion: item["agentVersion"],
    agentUpdateStatus: item["agentUpdateStatus"],
    postUpdateRebootStatus: item["postUpdateRebootStatus"],
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
  };
}

/** Enable protection input. */
export interface EnableProtectionInput {
  /** Enable protection input properties. */
  properties?: EnableProtectionInputProperties;
}

export function enableProtectionInputSerializer(item: EnableProtectionInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : enableProtectionInputPropertiesSerializer(item["properties"]),
  };
}

/** Enable protection input properties. */
export interface EnableProtectionInputProperties {
  /** The Policy Id. */
  policyId?: string;
  /** The protectable item Id. */
  protectableItemId?: string;
  /** The ReplicationProviderInput. For HyperVReplicaAzure provider, it will be AzureEnableProtectionInput object. For San provider, it will be SanEnableProtectionInput object. For HyperVReplicaAzure provider, it can be null. */
  providerSpecificDetails?: EnableProtectionProviderSpecificInputUnion;
}

export function enableProtectionInputPropertiesSerializer(
  item: EnableProtectionInputProperties,
): any {
  return {
    policyId: item["policyId"],
    protectableItemId: item["protectableItemId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : enableProtectionProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Enable protection provider specific input. */
export interface EnableProtectionProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2ACrossClusterMigration, A2A, HyperVReplicaAzure, InMageAzureV2, InMage, InMageRcm */
  instanceType: string;
}

export function enableProtectionProviderSpecificInputSerializer(
  item: EnableProtectionProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for EnableProtectionProviderSpecificInputUnion */
export type EnableProtectionProviderSpecificInputUnion =
  | A2ACrossClusterMigrationEnableProtectionInput
  | A2AEnableProtectionInput
  | HyperVReplicaAzureEnableProtectionInput
  | InMageAzureV2EnableProtectionInput
  | InMageEnableProtectionInput
  | InMageRcmEnableProtectionInput
  | EnableProtectionProviderSpecificInput;

export function enableProtectionProviderSpecificInputUnionSerializer(
  item: EnableProtectionProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2ACrossClusterMigration":
      return a2ACrossClusterMigrationEnableProtectionInputSerializer(
        item as A2ACrossClusterMigrationEnableProtectionInput,
      );

    case "A2A":
      return a2AEnableProtectionInputSerializer(item as A2AEnableProtectionInput);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureEnableProtectionInputSerializer(
        item as HyperVReplicaAzureEnableProtectionInput,
      );

    case "InMageAzureV2":
      return inMageAzureV2EnableProtectionInputSerializer(
        item as InMageAzureV2EnableProtectionInput,
      );

    case "InMage":
      return inMageEnableProtectionInputSerializer(item as InMageEnableProtectionInput);

    case "InMageRcm":
      return inMageRcmEnableProtectionInputSerializer(item as InMageRcmEnableProtectionInput);

    default:
      return enableProtectionProviderSpecificInputSerializer(item);
  }
}

/** A2A Cross-Cluster Migration enable protection input. */
export interface A2ACrossClusterMigrationEnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId?: string;
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The class type. */
  instanceType: "A2ACrossClusterMigration";
}

export function a2ACrossClusterMigrationEnableProtectionInputSerializer(
  item: A2ACrossClusterMigrationEnableProtectionInput,
): any {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    recoveryContainerId: item["recoveryContainerId"],
  };
}

/** A2A enable protection input. */
export interface A2AEnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId: string;
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The recovery resource group Id. Valid for V2 scenarios. */
  recoveryResourceGroupId?: string;
  /** The recovery cloud service Id. Valid for V1 scenarios. */
  recoveryCloudServiceId?: string;
  /** The recovery availability set Id. */
  recoveryAvailabilitySetId?: string;
  /** The recovery proximity placement group Id. */
  recoveryProximityPlacementGroupId?: string;
  /** The list of vm disk details. */
  vmDisks?: A2AVmDiskInputDetails[];
  /** The list of vm managed disk details. */
  vmManagedDisks?: A2AVmManagedDiskInputDetails[];
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** The multi vm group id. */
  multiVmGroupId?: string;
  /** The replication protection cluster Id. */
  protectionClusterId?: string;
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccountId?: string;
  /** The recovery disk encryption information (for two pass flows). */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The recovery extended location. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** The recovery Azure virtual network ARM id. */
  recoveryAzureNetworkId?: string;
  /** The recovery subnet name. */
  recoverySubnetName?: string;
  /** The virtual machine scale set Id. */
  recoveryVirtualMachineScaleSetId?: string;
  /** The recovery capacity reservation group Id. */
  recoveryCapacityReservationGroupId?: string;
  /** the platform fault domain. */
  platformFaultDomain?: number;
  /** A value indicating whether the auto protection is enabled. */
  autoProtectionOfDataDisk?: AutoProtectionOfDataDisk;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AEnableProtectionInputSerializer(item: A2AEnableProtectionInput): any {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    recoveryContainerId: item["recoveryContainerId"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryCloudServiceId: item["recoveryCloudServiceId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AVmDiskInputDetailsArraySerializer(item["vmDisks"]),
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AVmManagedDiskInputDetailsArraySerializer(item["vmManagedDisks"]),
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupId: item["multiVmGroupId"],
    protectionClusterId: item["protectionClusterId"],
    recoveryBootDiagStorageAccountId: item["recoveryBootDiagStorageAccountId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationSerializer(item["recoveryExtendedLocation"]),
    recoveryAzureNetworkId: item["recoveryAzureNetworkId"],
    recoverySubnetName: item["recoverySubnetName"],
    recoveryVirtualMachineScaleSetId: item["recoveryVirtualMachineScaleSetId"],
    recoveryCapacityReservationGroupId: item["recoveryCapacityReservationGroupId"],
    platformFaultDomain: item["platformFaultDomain"],
    autoProtectionOfDataDisk: item["autoProtectionOfDataDisk"],
  };
}

export function a2AVmDiskInputDetailsArraySerializer(result: Array<A2AVmDiskInputDetails>): any[] {
  return result.map((item) => {
    return a2AVmDiskInputDetailsSerializer(item);
  });
}

/** A2A disk input details. */
export interface A2AVmDiskInputDetails {
  /** The disk Uri. */
  diskUri: string;
  /** The recovery VHD storage account Id. */
  recoveryAzureStorageAccountId: string;
  /** The primary staging storage account Id. */
  primaryStagingAzureStorageAccountId: string;
}

export function a2AVmDiskInputDetailsSerializer(item: A2AVmDiskInputDetails): any {
  return {
    diskUri: item["diskUri"],
    recoveryAzureStorageAccountId: item["recoveryAzureStorageAccountId"],
    primaryStagingAzureStorageAccountId: item["primaryStagingAzureStorageAccountId"],
  };
}

export function a2AVmManagedDiskInputDetailsArraySerializer(
  result: Array<A2AVmManagedDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return a2AVmManagedDiskInputDetailsSerializer(item);
  });
}

/** A2A managed disk input details. */
export interface A2AVmManagedDiskInputDetails {
  /** The disk Id. */
  diskId: string;
  /** The primary staging storage account Arm Id. */
  primaryStagingAzureStorageAccountId: string;
  /** The target resource group Arm Id. */
  recoveryResourceGroupId: string;
  /** The replica disk type. Its an optional value and will be same as source disk type if not user provided. */
  recoveryReplicaDiskAccountType?: string;
  /** The target disk type after failover. Its an optional value and will be same as source disk type if not user provided. */
  recoveryTargetDiskAccountType?: string;
  /** The recovery disk encryption set Id. */
  recoveryDiskEncryptionSetId?: string;
  /** The recovery disk encryption information (for one / single pass flows). */
  diskEncryptionInfo?: DiskEncryptionInfo;
}

export function a2AVmManagedDiskInputDetailsSerializer(item: A2AVmManagedDiskInputDetails): any {
  return {
    diskId: item["diskId"],
    primaryStagingAzureStorageAccountId: item["primaryStagingAzureStorageAccountId"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryDiskEncryptionSetId: item["recoveryDiskEncryptionSetId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
  };
}

/** Recovery disk encryption info (BEK and KEK). */
export interface DiskEncryptionInfo {
  /** The recovery KeyVault reference for secret. */
  diskEncryptionKeyInfo?: DiskEncryptionKeyInfo;
  /** The recovery KeyVault reference for key. */
  keyEncryptionKeyInfo?: KeyEncryptionKeyInfo;
}

export function diskEncryptionInfoSerializer(item: DiskEncryptionInfo): any {
  return {
    diskEncryptionKeyInfo: !item["diskEncryptionKeyInfo"]
      ? item["diskEncryptionKeyInfo"]
      : diskEncryptionKeyInfoSerializer(item["diskEncryptionKeyInfo"]),
    keyEncryptionKeyInfo: !item["keyEncryptionKeyInfo"]
      ? item["keyEncryptionKeyInfo"]
      : keyEncryptionKeyInfoSerializer(item["keyEncryptionKeyInfo"]),
  };
}

export function diskEncryptionInfoDeserializer(item: any): DiskEncryptionInfo {
  return {
    diskEncryptionKeyInfo: !item["diskEncryptionKeyInfo"]
      ? item["diskEncryptionKeyInfo"]
      : diskEncryptionKeyInfoDeserializer(item["diskEncryptionKeyInfo"]),
    keyEncryptionKeyInfo: !item["keyEncryptionKeyInfo"]
      ? item["keyEncryptionKeyInfo"]
      : keyEncryptionKeyInfoDeserializer(item["keyEncryptionKeyInfo"]),
  };
}

/** Disk Encryption Key Information (BitLocker Encryption Key (BEK) on Windows). */
export interface DiskEncryptionKeyInfo {
  /** The secret url / identifier. */
  secretIdentifier?: string;
  /** The KeyVault resource ARM id for secret. */
  keyVaultResourceArmId?: string;
}

export function diskEncryptionKeyInfoSerializer(item: DiskEncryptionKeyInfo): any {
  return {
    secretIdentifier: item["secretIdentifier"],
    keyVaultResourceArmId: item["keyVaultResourceArmId"],
  };
}

export function diskEncryptionKeyInfoDeserializer(item: any): DiskEncryptionKeyInfo {
  return {
    secretIdentifier: item["secretIdentifier"],
    keyVaultResourceArmId: item["keyVaultResourceArmId"],
  };
}

/** Key Encryption Key (KEK) information. */
export interface KeyEncryptionKeyInfo {
  /** The key URL / identifier. */
  keyIdentifier?: string;
  /** The KeyVault resource ARM Id for key. */
  keyVaultResourceArmId?: string;
}

export function keyEncryptionKeyInfoSerializer(item: KeyEncryptionKeyInfo): any {
  return {
    keyIdentifier: item["keyIdentifier"],
    keyVaultResourceArmId: item["keyVaultResourceArmId"],
  };
}

export function keyEncryptionKeyInfoDeserializer(item: any): KeyEncryptionKeyInfo {
  return {
    keyIdentifier: item["keyIdentifier"],
    keyVaultResourceArmId: item["keyVaultResourceArmId"],
  };
}

/** HyperVReplicaAzure specific enable protection input. */
export interface HyperVReplicaAzureEnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The Hyper-V host VM Id. */
  hvHostVmId?: string;
  /** The VM Name. */
  vmName?: string;
  /** The OS type associated with VM. */
  osType?: string;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** The OS disk VHD id associated with VM. */
  vhdId?: string;
  /** The storage account Id. */
  targetStorageAccountId?: string;
  /** The selected target Azure network Id. */
  targetAzureNetworkId?: string;
  /** The selected target Azure subnet Id. */
  targetAzureSubnetId?: string;
  /** The selected option to enable RDP\SSH on target vm after failover. String value of SrsDataContract.EnableRDPOnTargetOption enum. */
  enableRdpOnTargetOption?: string;
  /** The target azure VM Name. */
  targetAzureVmName?: string;
  /** The storage account to be used for logging during replication. */
  logStorageAccountId?: string;
  /** The list of VHD Ids of disks to be protected. */
  disksToInclude?: string[];
  /** The Id of the target resource group (for classic deployment) in which the failover VM is to be created. */
  targetAzureV1ResourceGroupId?: string;
  /** The Id of the target resource group (for resource manager deployment) in which the failover VM is to be created. */
  targetAzureV2ResourceGroupId?: string;
  /** A value indicating whether managed disks should be used during failover. */
  useManagedDisks?: string;
  /** The target availability set ARM Id for resource manager deployment. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** License type. */
  licenseType?: LicenseType;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The target VM security profile. */
  targetVmSecurityProfile?: SecurityProfileProperties;
  /** The target VM size. */
  targetVmSize?: string;
  /** The proximity placement group ARM Id. */
  targetProximityPlacementGroupId?: string;
  /** A value indicating whether managed disks should be used during replication. */
  useManagedDisksForReplication?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The disks to include list for managed disks. */
  disksToIncludeForManagedDisks?: HyperVReplicaAzureDiskInputDetails[];
  /** The DiskEncryptionSet ARM Id. */
  diskEncryptionSetId?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureEnableProtectionInputSerializer(
  item: HyperVReplicaAzureEnableProtectionInput,
): any {
  return {
    instanceType: item["instanceType"],
    hvHostVmId: item["hvHostVmId"],
    vmName: item["vmName"],
    osType: item["osType"],
    userSelectedOSName: item["userSelectedOSName"],
    vhdId: item["vhdId"],
    targetStorageAccountId: item["targetStorageAccountId"],
    targetAzureNetworkId: item["targetAzureNetworkId"],
    targetAzureSubnetId: item["targetAzureSubnetId"],
    enableRdpOnTargetOption: item["enableRdpOnTargetOption"],
    targetAzureVmName: item["targetAzureVmName"],
    logStorageAccountId: item["logStorageAccountId"],
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : item["disksToInclude"].map((p: any) => {
          return p;
        }),
    targetAzureV1ResourceGroupId: item["targetAzureV1ResourceGroupId"],
    targetAzureV2ResourceGroupId: item["targetAzureV2ResourceGroupId"],
    useManagedDisks: item["useManagedDisks"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : securityProfilePropertiesSerializer(item["targetVmSecurityProfile"]),
    targetVmSize: item["targetVmSize"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    useManagedDisksForReplication: item["useManagedDisksForReplication"],
    diskType: item["diskType"],
    disksToIncludeForManagedDisks: !item["disksToIncludeForManagedDisks"]
      ? item["disksToIncludeForManagedDisks"]
      : hyperVReplicaAzureDiskInputDetailsArraySerializer(item["disksToIncludeForManagedDisks"]),
    diskEncryptionSetId: item["diskEncryptionSetId"],
    targetVmTags: item["targetVmTags"],
    seedManagedDiskTags: item["seedManagedDiskTags"],
    targetManagedDiskTags: item["targetManagedDiskTags"],
    targetNicTags: item["targetNicTags"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

/** License type. */
export enum KnownLicenseType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** NoLicenseType */
  NoLicenseType = "NoLicenseType",
  /** WindowsServer */
  WindowsServer = "WindowsServer",
}

/**
 * License type. \
 * {@link KnownLicenseType} can be used interchangeably with LicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **NoLicenseType**: NoLicenseType \
 * **WindowsServer**: WindowsServer
 */
export type LicenseType = string;

/** The SQL Server license type. */
export enum KnownSqlServerLicenseType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** NoLicenseType */
  NoLicenseType = "NoLicenseType",
  /** PAYG */
  Payg = "PAYG",
  /** AHUB */
  Ahub = "AHUB",
}

/**
 * The SQL Server license type. \
 * {@link KnownSqlServerLicenseType} can be used interchangeably with SqlServerLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **NoLicenseType**: NoLicenseType \
 * **PAYG**: PAYG \
 * **AHUB**: AHUB
 */
export type SqlServerLicenseType = string;

export function hyperVReplicaAzureDiskInputDetailsArraySerializer(
  result: Array<HyperVReplicaAzureDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return hyperVReplicaAzureDiskInputDetailsSerializer(item);
  });
}

/** Disk input details. */
export interface HyperVReplicaAzureDiskInputDetails {
  /** The DiskId. */
  diskId?: string;
  /** The LogStorageAccountId. */
  logStorageAccountId?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The DiskEncryptionSet ARM ID. */
  diskEncryptionSetId?: string;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function hyperVReplicaAzureDiskInputDetailsSerializer(
  item: HyperVReplicaAzureDiskInputDetails,
): any {
  return {
    diskId: item["diskId"],
    logStorageAccountId: item["logStorageAccountId"],
    diskType: item["diskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** VMware Azure specific enable protection input. */
export interface InMageAzureV2EnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The Master target Id. */
  masterTargetId?: string;
  /** The Process Server Id. */
  processServerId?: string;
  /** The storage account Id. */
  storageAccountId?: string;
  /** The CS account Id. */
  runAsAccountId?: string;
  /** The multi VM group Id. */
  multiVmGroupId?: string;
  /** The multi VM group name. */
  multiVmGroupName?: string;
  /** The disks to include list. */
  disksToInclude?: InMageAzureV2DiskInputDetails[];
  /** The selected target Azure network Id. */
  targetAzureNetworkId?: string;
  /** The selected target Azure subnet Id. */
  targetAzureSubnetId?: string;
  /** The selected option to enable RDP\SSH on target VM after failover. String value of SrsDataContract.EnableRDPOnTargetOption enum. */
  enableRdpOnTargetOption?: string;
  /** The target azure VM Name. */
  targetAzureVmName?: string;
  /** The storage account to be used for logging during replication. */
  logStorageAccountId?: string;
  /** The Id of the target resource group (for classic deployment) in which the failover VM is to be created. */
  targetAzureV1ResourceGroupId?: string;
  /** The Id of the target resource group (for resource manager deployment) in which the failover VM is to be created. */
  targetAzureV2ResourceGroupId?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The target availability set ARM Id for resource manager deployment. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The proximity placement group ARM Id. */
  targetProximityPlacementGroupId?: string;
  /** License type. */
  licenseType?: LicenseType;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The target VM size. */
  targetVmSize?: string;
  /** The DiskEncryptionSet ARM Id. */
  diskEncryptionSetId?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2EnableProtectionInputSerializer(
  item: InMageAzureV2EnableProtectionInput,
): any {
  return {
    instanceType: item["instanceType"],
    masterTargetId: item["masterTargetId"],
    processServerId: item["processServerId"],
    storageAccountId: item["storageAccountId"],
    runAsAccountId: item["runAsAccountId"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : inMageAzureV2DiskInputDetailsArraySerializer(item["disksToInclude"]),
    targetAzureNetworkId: item["targetAzureNetworkId"],
    targetAzureSubnetId: item["targetAzureSubnetId"],
    enableRdpOnTargetOption: item["enableRdpOnTargetOption"],
    targetAzureVmName: item["targetAzureVmName"],
    logStorageAccountId: item["logStorageAccountId"],
    targetAzureV1ResourceGroupId: item["targetAzureV1ResourceGroupId"],
    targetAzureV2ResourceGroupId: item["targetAzureV2ResourceGroupId"],
    diskType: item["diskType"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    targetVmSize: item["targetVmSize"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    targetVmTags: item["targetVmTags"],
    seedManagedDiskTags: item["seedManagedDiskTags"],
    targetManagedDiskTags: item["targetManagedDiskTags"],
    targetNicTags: item["targetNicTags"],
  };
}

export function inMageAzureV2DiskInputDetailsArraySerializer(
  result: Array<InMageAzureV2DiskInputDetails>,
): any[] {
  return result.map((item) => {
    return inMageAzureV2DiskInputDetailsSerializer(item);
  });
}

/** Disk input details. */
export interface InMageAzureV2DiskInputDetails {
  /** The DiskId. */
  diskId?: string;
  /** The LogStorageAccountId. */
  logStorageAccountId?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The DiskEncryptionSet ARM ID. */
  diskEncryptionSetId?: string;
}

export function inMageAzureV2DiskInputDetailsSerializer(item: InMageAzureV2DiskInputDetails): any {
  return {
    diskId: item["diskId"],
    logStorageAccountId: item["logStorageAccountId"],
    diskType: item["diskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
  };
}

/** VMware Azure specific enable protection input. */
export interface InMageEnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The VM Name. */
  vmFriendlyName?: string;
  /** The Master Target Id. */
  masterTargetId: string;
  /** The Process Server Id. */
  processServerId: string;
  /** The retention drive to use on the MT. */
  retentionDrive: string;
  /** The CS account Id. */
  runAsAccountId?: string;
  /** The multi VM group Id. */
  multiVmGroupId: string;
  /** The multi VM group name. */
  multiVmGroupName: string;
  /** The target datastore name. */
  datastoreName?: string;
  /** The enable disk exclusion input. */
  diskExclusionInput?: InMageDiskExclusionInput;
  /** The disks to include list. */
  disksToInclude?: string[];
  /** The class type. */
  instanceType: "InMage";
}

export function inMageEnableProtectionInputSerializer(item: InMageEnableProtectionInput): any {
  return {
    instanceType: item["instanceType"],
    vmFriendlyName: item["vmFriendlyName"],
    masterTargetId: item["masterTargetId"],
    processServerId: item["processServerId"],
    retentionDrive: item["retentionDrive"],
    runAsAccountId: item["runAsAccountId"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    datastoreName: item["datastoreName"],
    diskExclusionInput: !item["diskExclusionInput"]
      ? item["diskExclusionInput"]
      : inMageDiskExclusionInputSerializer(item["diskExclusionInput"]),
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : item["disksToInclude"].map((p: any) => {
          return p;
        }),
  };
}

/** DiskExclusionInput when doing enable protection of virtual machine in InMage provider. */
export interface InMageDiskExclusionInput {
  /** The volume label based option for disk exclusion. */
  volumeOptions?: InMageVolumeExclusionOptions[];
  /** The guest disk signature based option for disk exclusion. */
  diskSignatureOptions?: InMageDiskSignatureExclusionOptions[];
}

export function inMageDiskExclusionInputSerializer(item: InMageDiskExclusionInput): any {
  return {
    volumeOptions: !item["volumeOptions"]
      ? item["volumeOptions"]
      : inMageVolumeExclusionOptionsArraySerializer(item["volumeOptions"]),
    diskSignatureOptions: !item["diskSignatureOptions"]
      ? item["diskSignatureOptions"]
      : inMageDiskSignatureExclusionOptionsArraySerializer(item["diskSignatureOptions"]),
  };
}

export function inMageVolumeExclusionOptionsArraySerializer(
  result: Array<InMageVolumeExclusionOptions>,
): any[] {
  return result.map((item) => {
    return inMageVolumeExclusionOptionsSerializer(item);
  });
}

/** Guest disk signature based disk exclusion option when doing enable protection of virtual machine in InMage provider. */
export interface InMageVolumeExclusionOptions {
  /** The volume label. The disk having any volume with this label will be excluded from replication. */
  volumeLabel?: string;
  /** The value indicating whether to exclude multi volume disk or not. If a disk has multiple volumes and one of the volume has label matching with VolumeLabel this disk will be excluded from replication if OnlyExcludeIfSingleVolume is false. */
  onlyExcludeIfSingleVolume?: string;
}

export function inMageVolumeExclusionOptionsSerializer(item: InMageVolumeExclusionOptions): any {
  return {
    volumeLabel: item["volumeLabel"],
    onlyExcludeIfSingleVolume: item["onlyExcludeIfSingleVolume"],
  };
}

export function inMageDiskSignatureExclusionOptionsArraySerializer(
  result: Array<InMageDiskSignatureExclusionOptions>,
): any[] {
  return result.map((item) => {
    return inMageDiskSignatureExclusionOptionsSerializer(item);
  });
}

/** Guest disk signature based disk exclusion option when doing enable protection of virtual machine in InMage provider. */
export interface InMageDiskSignatureExclusionOptions {
  /** The guest signature of disk to be excluded from replication. */
  diskSignature?: string;
}

export function inMageDiskSignatureExclusionOptionsSerializer(
  item: InMageDiskSignatureExclusionOptions,
): any {
  return { diskSignature: item["diskSignature"] };
}

/** InMageRcm specific enable protection input. */
export interface InMageRcmEnableProtectionInput extends EnableProtectionProviderSpecificInput {
  /** The ARM Id of discovered machine. */
  fabricDiscoveryMachineId: string;
  /** The disks to include list. */
  disksToInclude?: InMageRcmDiskInput[];
  /** The default disk input. */
  disksDefault?: InMageRcmDisksDefaultInput;
  /** The target resource group ARM Id. */
  targetResourceGroupId: string;
  /** The selected target network ARM Id. */
  targetNetworkId?: string;
  /** The selected test network ARM Id. */
  testNetworkId?: string;
  /** The selected target subnet name. */
  targetSubnetName?: string;
  /** The selected test subnet name. */
  testSubnetName?: string;
  /** The target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The license type. */
  licenseType?: LicenseType;
  /** The target availability set ARM Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** The run-as account Id. */
  runAsAccountId?: string;
  /** The process server Id. */
  processServerId: string;
  /** The multi VM group name. */
  multiVmGroupName?: string;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The target VM tags. */
  targetVmTags?: UserCreatedResourceTag[];
  /** The tags for the seed managed disks. */
  seedManagedDiskTags?: UserCreatedResourceTag[];
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: UserCreatedResourceTag[];
  /** The tags for the target NICs. */
  targetNicTags?: UserCreatedResourceTag[];
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** The target VM security profile. */
  targetVmSecurityProfile?: SecurityProfileProperties;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmEnableProtectionInputSerializer(
  item: InMageRcmEnableProtectionInput,
): any {
  return {
    instanceType: item["instanceType"],
    fabricDiscoveryMachineId: item["fabricDiscoveryMachineId"],
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : inMageRcmDiskInputArraySerializer(item["disksToInclude"]),
    disksDefault: !item["disksDefault"]
      ? item["disksDefault"]
      : inMageRcmDisksDefaultInputSerializer(item["disksDefault"]),
    targetResourceGroupId: item["targetResourceGroupId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetSubnetName: item["targetSubnetName"],
    testSubnetName: item["testSubnetName"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    licenseType: item["licenseType"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    runAsAccountId: item["runAsAccountId"],
    processServerId: item["processServerId"],
    multiVmGroupName: item["multiVmGroupName"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : userCreatedResourceTagArraySerializer(item["targetVmTags"]),
    seedManagedDiskTags: !item["seedManagedDiskTags"]
      ? item["seedManagedDiskTags"]
      : userCreatedResourceTagArraySerializer(item["seedManagedDiskTags"]),
    targetManagedDiskTags: !item["targetManagedDiskTags"]
      ? item["targetManagedDiskTags"]
      : userCreatedResourceTagArraySerializer(item["targetManagedDiskTags"]),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : userCreatedResourceTagArraySerializer(item["targetNicTags"]),
    userSelectedOSName: item["userSelectedOSName"],
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : securityProfilePropertiesSerializer(item["targetVmSecurityProfile"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function inMageRcmDiskInputArraySerializer(result: Array<InMageRcmDiskInput>): any[] {
  return result.map((item) => {
    return inMageRcmDiskInputSerializer(item);
  });
}

/** InMageRcm disk input. */
export interface InMageRcmDiskInput {
  /** The disk Id. */
  diskId: string;
  /** The log storage account ARM Id. */
  logStorageAccountId: string;
  /** The disk type. */
  diskType: DiskAccountType;
  /** The DiskEncryptionSet ARM Id. */
  diskEncryptionSetId?: string;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function inMageRcmDiskInputSerializer(item: InMageRcmDiskInput): any {
  return {
    diskId: item["diskId"],
    logStorageAccountId: item["logStorageAccountId"],
    diskType: item["diskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** InMageRcm disk input. */
export interface InMageRcmDisksDefaultInput {
  /** The log storage account ARM Id. */
  logStorageAccountId: string;
  /** The disk type. */
  diskType: DiskAccountType;
  /** The DiskEncryptionSet ARM Id. */
  diskEncryptionSetId?: string;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function inMageRcmDisksDefaultInputSerializer(item: InMageRcmDisksDefaultInput): any {
  return {
    logStorageAccountId: item["logStorageAccountId"],
    diskType: item["diskType"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
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

/** Update replication protected item input. */
export interface UpdateReplicationProtectedItemInput {
  /** Update replication protected item properties. */
  properties?: UpdateReplicationProtectedItemInputProperties;
}

export function updateReplicationProtectedItemInputSerializer(
  item: UpdateReplicationProtectedItemInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateReplicationProtectedItemInputPropertiesSerializer(item["properties"]),
  };
}

/** Update protected item input properties. */
export interface UpdateReplicationProtectedItemInputProperties {
  /** Target Azure VM name given by the user. */
  recoveryAzureVMName?: string;
  /** Target Azure VM size. */
  recoveryAzureVMSize?: string;
  /** Target Azure Network Id. */
  selectedRecoveryAzureNetworkId?: string;
  /** The Azure Network Id for test failover. */
  selectedTfoAzureNetworkId?: string;
  /** The selected source nic Id which will be used as the primary nic during failover. */
  selectedSourceNicId?: string;
  /** The selected option to enable RDP\SSH on target vm after failover. String value of SrsDataContract.EnableRDPOnTargetOption enum. */
  enableRdpOnTargetOption?: string;
  /** The list of VM nic details. */
  vmNics?: VMNicInputDetails[];
  /** License type. */
  licenseType?: LicenseType;
  /** The target availability set Id. */
  recoveryAvailabilitySetId?: string;
  /** The provider specific input to update replication protected item. */
  providerSpecificDetails?: UpdateReplicationProtectedItemProviderInputUnion;
}

export function updateReplicationProtectedItemInputPropertiesSerializer(
  item: UpdateReplicationProtectedItemInputProperties,
): any {
  return {
    recoveryAzureVMName: item["recoveryAzureVMName"],
    recoveryAzureVMSize: item["recoveryAzureVMSize"],
    selectedRecoveryAzureNetworkId: item["selectedRecoveryAzureNetworkId"],
    selectedTfoAzureNetworkId: item["selectedTfoAzureNetworkId"],
    selectedSourceNicId: item["selectedSourceNicId"],
    enableRdpOnTargetOption: item["enableRdpOnTargetOption"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vmNicInputDetailsArraySerializer(item["vmNics"]),
    licenseType: item["licenseType"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : updateReplicationProtectedItemProviderInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

export function vmNicInputDetailsArraySerializer(result: Array<VMNicInputDetails>): any[] {
  return result.map((item) => {
    return vmNicInputDetailsSerializer(item);
  });
}

/** Hyper V VM network input details. */
export interface VMNicInputDetails {
  /** The nic Id. */
  nicId?: string;
  /** The IP configurations to be used by NIC during test failover and failover. */
  ipConfigs?: IPConfigInputDetails[];
  /** Selection type for failover. */
  selectionType?: string;
  /** The id of the NSG associated with the NIC. */
  recoveryNetworkSecurityGroupId?: string;
  /** Whether the NIC has accelerated networking enabled. */
  enableAcceleratedNetworkingOnRecovery?: boolean;
  /** The NSG to be used by NIC during test failover. */
  tfoNetworkSecurityGroupId?: string;
  /** Whether the test NIC has accelerated networking enabled. */
  enableAcceleratedNetworkingOnTfo?: boolean;
  /** The name of the NIC to be used when creating target NICs. */
  recoveryNicName?: string;
  /** The resource group of the NIC to be used when creating target NICs. */
  recoveryNicResourceGroupName?: string;
  /** A value indicating whether an existing NIC is allowed to be reused during failover subject to availability. */
  reuseExistingNic?: boolean;
  /** The name of the NIC to be used when creating target NICs in TFO. */
  tfoNicName?: string;
  /** The resource group of the NIC to be used when creating target NICs in TFO. */
  tfoNicResourceGroupName?: string;
  /** A value indicating whether an existing NIC is allowed to be reused during test failover subject to availability. */
  tfoReuseExistingNic?: boolean;
  /** Target NIC name. */
  targetNicName?: string;
}

export function vmNicInputDetailsSerializer(item: VMNicInputDetails): any {
  return {
    nicId: item["nicId"],
    ipConfigs: !item["ipConfigs"]
      ? item["ipConfigs"]
      : ipConfigInputDetailsArraySerializer(item["ipConfigs"]),
    selectionType: item["selectionType"],
    recoveryNetworkSecurityGroupId: item["recoveryNetworkSecurityGroupId"],
    enableAcceleratedNetworkingOnRecovery: item["enableAcceleratedNetworkingOnRecovery"],
    tfoNetworkSecurityGroupId: item["tfoNetworkSecurityGroupId"],
    enableAcceleratedNetworkingOnTfo: item["enableAcceleratedNetworkingOnTfo"],
    recoveryNicName: item["recoveryNicName"],
    recoveryNicResourceGroupName: item["recoveryNicResourceGroupName"],
    reuseExistingNic: item["reuseExistingNic"],
    tfoNicName: item["tfoNicName"],
    tfoNicResourceGroupName: item["tfoNicResourceGroupName"],
    tfoReuseExistingNic: item["tfoReuseExistingNic"],
    targetNicName: item["targetNicName"],
  };
}

export function ipConfigInputDetailsArraySerializer(result: Array<IPConfigInputDetails>): any[] {
  return result.map((item) => {
    return ipConfigInputDetailsSerializer(item);
  });
}

/** model interface IPConfigInputDetails */
export interface IPConfigInputDetails {
  ipConfigName?: string;
  isPrimary?: boolean;
  isSeletedForFailover?: boolean;
  recoverySubnetName?: string;
  recoveryStaticIPAddress?: string;
  recoveryPublicIPAddressId?: string;
  recoveryLBBackendAddressPoolIds?: string[];
  tfoSubnetName?: string;
  tfoStaticIPAddress?: string;
  tfoPublicIPAddressId?: string;
  tfoLBBackendAddressPoolIds?: string[];
}

export function ipConfigInputDetailsSerializer(item: IPConfigInputDetails): any {
  return {
    ipConfigName: item["ipConfigName"],
    isPrimary: item["isPrimary"],
    isSeletedForFailover: item["isSeletedForFailover"],
    recoverySubnetName: item["recoverySubnetName"],
    recoveryStaticIPAddress: item["recoveryStaticIPAddress"],
    recoveryPublicIPAddressId: item["recoveryPublicIPAddressId"],
    recoveryLBBackendAddressPoolIds: !item["recoveryLBBackendAddressPoolIds"]
      ? item["recoveryLBBackendAddressPoolIds"]
      : item["recoveryLBBackendAddressPoolIds"].map((p: any) => {
          return p;
        }),
    tfoSubnetName: item["tfoSubnetName"],
    tfoStaticIPAddress: item["tfoStaticIPAddress"],
    tfoPublicIPAddressId: item["tfoPublicIPAddressId"],
    tfoLBBackendAddressPoolIds: !item["tfoLBBackendAddressPoolIds"]
      ? item["tfoLBBackendAddressPoolIds"]
      : item["tfoLBBackendAddressPoolIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Update replication protected item provider specific input. */
export interface UpdateReplicationProtectedItemProviderInput {
  /** The class type. */
  /** The discriminator possible values: A2A, HyperVReplicaAzure, InMageAzureV2, InMageRcm */
  instanceType: string;
}

export function updateReplicationProtectedItemProviderInputSerializer(
  item: UpdateReplicationProtectedItemProviderInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for UpdateReplicationProtectedItemProviderInputUnion */
export type UpdateReplicationProtectedItemProviderInputUnion =
  | A2AUpdateReplicationProtectedItemInput
  | HyperVReplicaAzureUpdateReplicationProtectedItemInput
  | InMageAzureV2UpdateReplicationProtectedItemInput
  | InMageRcmUpdateReplicationProtectedItemInput
  | UpdateReplicationProtectedItemProviderInput;

export function updateReplicationProtectedItemProviderInputUnionSerializer(
  item: UpdateReplicationProtectedItemProviderInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AUpdateReplicationProtectedItemInputSerializer(
        item as A2AUpdateReplicationProtectedItemInput,
      );

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureUpdateReplicationProtectedItemInputSerializer(
        item as HyperVReplicaAzureUpdateReplicationProtectedItemInput,
      );

    case "InMageAzureV2":
      return inMageAzureV2UpdateReplicationProtectedItemInputSerializer(
        item as InMageAzureV2UpdateReplicationProtectedItemInput,
      );

    case "InMageRcm":
      return inMageRcmUpdateReplicationProtectedItemInputSerializer(
        item as InMageRcmUpdateReplicationProtectedItemInput,
      );

    default:
      return updateReplicationProtectedItemProviderInputSerializer(item);
  }
}

/** InMage Azure V2 input to update replication protected item. */
export interface A2AUpdateReplicationProtectedItemInput extends UpdateReplicationProtectedItemProviderInput {
  /** The target cloud service ARM Id (for V1). */
  recoveryCloudServiceId?: string;
  /** The target resource group ARM Id (for V2). */
  recoveryResourceGroupId?: string;
  /** Managed disk update details. */
  managedDiskUpdateDetails?: A2AVmManagedDiskUpdateDetails[];
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccountId?: string;
  /** The recovery os disk encryption information. */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The user given name for Test Failover VM. */
  tfoAzureVMName?: string;
  /** The recovery proximity placement group Id. */
  recoveryProximityPlacementGroupId?: string;
  /** The recovery virtual machine scale set Id. */
  recoveryVirtualMachineScaleSetId?: string;
  /** The recovery capacity reservation group Id. */
  recoveryCapacityReservationGroupId?: string;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The platform fault domain. */
  platformFaultDomain?: number;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AUpdateReplicationProtectedItemInputSerializer(
  item: A2AUpdateReplicationProtectedItemInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryCloudServiceId: item["recoveryCloudServiceId"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    managedDiskUpdateDetails: !item["managedDiskUpdateDetails"]
      ? item["managedDiskUpdateDetails"]
      : a2AVmManagedDiskUpdateDetailsArraySerializer(item["managedDiskUpdateDetails"]),
    recoveryBootDiagStorageAccountId: item["recoveryBootDiagStorageAccountId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
    tfoAzureVMName: item["tfoAzureVMName"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
    recoveryVirtualMachineScaleSetId: item["recoveryVirtualMachineScaleSetId"],
    recoveryCapacityReservationGroupId: item["recoveryCapacityReservationGroupId"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    platformFaultDomain: item["platformFaultDomain"],
  };
}

export function a2AVmManagedDiskUpdateDetailsArraySerializer(
  result: Array<A2AVmManagedDiskUpdateDetails>,
): any[] {
  return result.map((item) => {
    return a2AVmManagedDiskUpdateDetailsSerializer(item);
  });
}

/** A2A Vm managed disk update details. */
export interface A2AVmManagedDiskUpdateDetails {
  /** The disk Id. */
  diskId?: string;
  /** The target disk type before failover. */
  recoveryTargetDiskAccountType?: string;
  /** The replica disk type before failover. */
  recoveryReplicaDiskAccountType?: string;
  /** The recovery os disk encryption information. */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The target disk name for unplanned failover operation. */
  failoverDiskName?: string;
  /** The target disk name for test failover operation. */
  tfoDiskName?: string;
}

export function a2AVmManagedDiskUpdateDetailsSerializer(item: A2AVmManagedDiskUpdateDetails): any {
  return {
    diskId: item["diskId"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
    failoverDiskName: item["failoverDiskName"],
    tfoDiskName: item["tfoDiskName"],
  };
}

/** HyperV replica Azure input to update replication protected item. */
export interface HyperVReplicaAzureUpdateReplicationProtectedItemInput extends UpdateReplicationProtectedItemProviderInput {
  /** The recovery Azure resource group Id for classic deployment. */
  recoveryAzureV1ResourceGroupId?: string;
  /** The recovery Azure resource group Id for resource manager deployment. */
  recoveryAzureV2ResourceGroupId?: string;
  /** A value indicating whether managed disks should be used during failover. */
  useManagedDisks?: string;
  /** The dictionary of disk resource Id to disk encryption set ARM Id. */
  diskIdToDiskEncryptionMap?: Record<string, string>;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** The list of disk update properties. */
  vmDisks?: UpdateDiskInput[];
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureUpdateReplicationProtectedItemInputSerializer(
  item: HyperVReplicaAzureUpdateReplicationProtectedItemInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryAzureV1ResourceGroupId: item["recoveryAzureV1ResourceGroupId"],
    recoveryAzureV2ResourceGroupId: item["recoveryAzureV2ResourceGroupId"],
    useManagedDisks: item["useManagedDisks"],
    diskIdToDiskEncryptionMap: item["diskIdToDiskEncryptionMap"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetVmTags: item["targetVmTags"],
    targetManagedDiskTags: item["targetManagedDiskTags"],
    targetNicTags: item["targetNicTags"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    userSelectedOSName: item["userSelectedOSName"],
    vmDisks: !item["vmDisks"] ? item["vmDisks"] : updateDiskInputArraySerializer(item["vmDisks"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function updateDiskInputArraySerializer(result: Array<UpdateDiskInput>): any[] {
  return result.map((item) => {
    return updateDiskInputSerializer(item);
  });
}

/** Disk input for update. */
export interface UpdateDiskInput {
  /** The disk Id. */
  diskId: string;
  /** The target disk name. */
  targetDiskName?: string;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function updateDiskInputSerializer(item: UpdateDiskInput): any {
  return {
    diskId: item["diskId"],
    targetDiskName: item["targetDiskName"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** InMage Azure V2 input to update replication protected item. */
export interface InMageAzureV2UpdateReplicationProtectedItemInput extends UpdateReplicationProtectedItemProviderInput {
  /** The recovery Azure resource group Id for classic deployment. */
  recoveryAzureV1ResourceGroupId?: string;
  /** The recovery Azure resource group Id for resource manager deployment. */
  recoveryAzureV2ResourceGroupId?: string;
  /** A value indicating whether managed disks should be used during failover. */
  useManagedDisks?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The list of disk update properties. */
  vmDisks?: UpdateDiskInput[];
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2UpdateReplicationProtectedItemInputSerializer(
  item: InMageAzureV2UpdateReplicationProtectedItemInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryAzureV1ResourceGroupId: item["recoveryAzureV1ResourceGroupId"],
    recoveryAzureV2ResourceGroupId: item["recoveryAzureV2ResourceGroupId"],
    useManagedDisks: item["useManagedDisks"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetVmTags: item["targetVmTags"],
    targetManagedDiskTags: item["targetManagedDiskTags"],
    targetNicTags: item["targetNicTags"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    vmDisks: !item["vmDisks"] ? item["vmDisks"] : updateDiskInputArraySerializer(item["vmDisks"]),
  };
}

/** InMageRcm provider specific input to update replication protected item. */
export interface InMageRcmUpdateReplicationProtectedItemInput extends UpdateReplicationProtectedItemProviderInput {
  /** The target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The target resource group ARM Id. */
  targetResourceGroupId?: string;
  /** The target availability set ARM Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** The target network ARM Id. */
  targetNetworkId?: string;
  /** The test network ARM Id. */
  testNetworkId?: string;
  /** The list of NIC details. */
  vmNics?: InMageRcmNicInput[];
  /** The license type. */
  licenseType?: LicenseType;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** The target VM tags. */
  targetVmTags?: UserCreatedResourceTag[];
  /** The tags for the target managed disks. */
  targetManagedDiskTags?: UserCreatedResourceTag[];
  /** The tags for the target NICs. */
  targetNicTags?: UserCreatedResourceTag[];
  /** The list of disk update properties. */
  vmDisks?: UpdateDiskInput[];
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmUpdateReplicationProtectedItemInputSerializer(
  item: InMageRcmUpdateReplicationProtectedItemInput,
): any {
  return {
    instanceType: item["instanceType"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : inMageRcmNicInputArraySerializer(item["vmNics"]),
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    userSelectedOSName: item["userSelectedOSName"],
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : userCreatedResourceTagArraySerializer(item["targetVmTags"]),
    targetManagedDiskTags: !item["targetManagedDiskTags"]
      ? item["targetManagedDiskTags"]
      : userCreatedResourceTagArraySerializer(item["targetManagedDiskTags"]),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : userCreatedResourceTagArraySerializer(item["targetNicTags"]),
    vmDisks: !item["vmDisks"] ? item["vmDisks"] : updateDiskInputArraySerializer(item["vmDisks"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function inMageRcmNicInputArraySerializer(result: Array<InMageRcmNicInput>): any[] {
  return result.map((item) => {
    return inMageRcmNicInputSerializer(item);
  });
}

/** InMageRcm NIC input. */
export interface InMageRcmNicInput {
  /** The NIC Id. */
  nicId: string;
  /** A value indicating whether this is the primary NIC. */
  isPrimaryNic: string;
  /** A value indicating whether this NIC is selected for failover. */
  isSelectedForFailover?: string;
  /** Target subnet name. */
  targetSubnetName?: string;
  /** The target static IP address. */
  targetStaticIPAddress?: string;
  /** The test subnet name. */
  testSubnetName?: string;
  /** The test static IP address. */
  testStaticIPAddress?: string;
  /** The target NIC name. */
  targetNicName?: string;
}

export function inMageRcmNicInputSerializer(item: InMageRcmNicInput): any {
  return {
    nicId: item["nicId"],
    isPrimaryNic: item["isPrimaryNic"],
    isSelectedForFailover: item["isSelectedForFailover"],
    targetSubnetName: item["targetSubnetName"],
    targetStaticIPAddress: item["targetStaticIPAddress"],
    testSubnetName: item["testSubnetName"],
    testStaticIPAddress: item["testStaticIPAddress"],
    targetNicName: item["targetNicName"],
  };
}

/** Replication protected item collection. */
export interface _ReplicationProtectedItemCollection {
  /** The ReplicationProtectedItem items on this page */
  value: ReplicationProtectedItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicationProtectedItemCollectionDeserializer(
  item: any,
): _ReplicationProtectedItemCollection {
  return {
    value: replicationProtectedItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationProtectedItemArrayDeserializer(
  result: Array<ReplicationProtectedItem>,
): any[] {
  return result.map((item) => {
    return replicationProtectedItemDeserializer(item);
  });
}

/** Input for add disk(s) operation. */
export interface AddDisksInput {
  /** Add disks input properties. */
  properties?: AddDisksInputProperties;
}

export function addDisksInputSerializer(item: AddDisksInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : addDisksInputPropertiesSerializer(item["properties"]),
  };
}

/** Add Disks input properties. */
export interface AddDisksInputProperties {
  /** The ReplicationProviderInput. For HyperVReplicaAzure provider, it will be AzureEnableProtectionInput object. For San provider, it will be SanEnableProtectionInput object. For HyperVReplicaAzure provider, it can be null. */
  providerSpecificDetails: AddDisksProviderSpecificInputUnion;
}

export function addDisksInputPropertiesSerializer(item: AddDisksInputProperties): any {
  return {
    providerSpecificDetails: addDisksProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Add Disks provider specific input. */
export interface AddDisksProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A, InMageRcm */
  instanceType: string;
}

export function addDisksProviderSpecificInputSerializer(item: AddDisksProviderSpecificInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for AddDisksProviderSpecificInputUnion */
export type AddDisksProviderSpecificInputUnion =
  | A2AAddDisksInput
  | InMageRcmAddDisksInput
  | AddDisksProviderSpecificInput;

export function addDisksProviderSpecificInputUnionSerializer(
  item: AddDisksProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AAddDisksInputSerializer(item as A2AAddDisksInput);

    case "InMageRcm":
      return inMageRcmAddDisksInputSerializer(item as InMageRcmAddDisksInput);

    default:
      return addDisksProviderSpecificInputSerializer(item);
  }
}

/** A2A add disk(s) input. */
export interface A2AAddDisksInput extends AddDisksProviderSpecificInput {
  /** The list of vm disk details. */
  vmDisks?: A2AVmDiskInputDetails[];
  /** The list of vm managed disk details. */
  vmManagedDisks?: A2AVmManagedDiskInputDetails[];
  /** The class type. */
  instanceType: "A2A";
}

export function a2AAddDisksInputSerializer(item: A2AAddDisksInput): any {
  return {
    instanceType: item["instanceType"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AVmDiskInputDetailsArraySerializer(item["vmDisks"]),
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AVmManagedDiskInputDetailsArraySerializer(item["vmManagedDisks"]),
  };
}

/** InMageRcm add disk(s) input. */
export interface InMageRcmAddDisksInput extends AddDisksProviderSpecificInput {
  /** The list of disk details. */
  disks: InMageRcmDiskInput[];
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmAddDisksInputSerializer(item: InMageRcmAddDisksInput): any {
  return {
    instanceType: item["instanceType"],
    disks: inMageRcmDiskInputArraySerializer(item["disks"]),
  };
}

/** Input to apply recovery point. */
export interface ApplyRecoveryPointInput {
  /** The input properties to apply recovery point. */
  properties: ApplyRecoveryPointInputProperties;
}

export function applyRecoveryPointInputSerializer(item: ApplyRecoveryPointInput): any {
  return { properties: applyRecoveryPointInputPropertiesSerializer(item["properties"]) };
}

/** Input properties to apply recovery point. */
export interface ApplyRecoveryPointInputProperties {
  /** The recovery point Id. */
  recoveryPointId?: string;
  /** Provider specific input for applying recovery point. */
  providerSpecificDetails: ApplyRecoveryPointProviderSpecificInputUnion;
}

export function applyRecoveryPointInputPropertiesSerializer(
  item: ApplyRecoveryPointInputProperties,
): any {
  return {
    recoveryPointId: item["recoveryPointId"],
    providerSpecificDetails: applyRecoveryPointProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Provider specific input for apply recovery point. */
export interface ApplyRecoveryPointProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A, A2ACrossClusterMigration, HyperVReplicaAzure, InMageAzureV2, InMageRcm */
  instanceType: string;
}

export function applyRecoveryPointProviderSpecificInputSerializer(
  item: ApplyRecoveryPointProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ApplyRecoveryPointProviderSpecificInputUnion */
export type ApplyRecoveryPointProviderSpecificInputUnion =
  | A2AApplyRecoveryPointInput
  | A2ACrossClusterMigrationApplyRecoveryPointInput
  | HyperVReplicaAzureApplyRecoveryPointInput
  | InMageAzureV2ApplyRecoveryPointInput
  | InMageRcmApplyRecoveryPointInput
  | ApplyRecoveryPointProviderSpecificInput;

export function applyRecoveryPointProviderSpecificInputUnionSerializer(
  item: ApplyRecoveryPointProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AApplyRecoveryPointInputSerializer(item as A2AApplyRecoveryPointInput);

    case "A2ACrossClusterMigration":
      return a2ACrossClusterMigrationApplyRecoveryPointInputSerializer(
        item as A2ACrossClusterMigrationApplyRecoveryPointInput,
      );

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureApplyRecoveryPointInputSerializer(
        item as HyperVReplicaAzureApplyRecoveryPointInput,
      );

    case "InMageAzureV2":
      return inMageAzureV2ApplyRecoveryPointInputSerializer(
        item as InMageAzureV2ApplyRecoveryPointInput,
      );

    case "InMageRcm":
      return inMageRcmApplyRecoveryPointInputSerializer(item as InMageRcmApplyRecoveryPointInput);

    default:
      return applyRecoveryPointProviderSpecificInputSerializer(item);
  }
}

/** ApplyRecoveryPoint input specific to A2A provider. */
export interface A2AApplyRecoveryPointInput extends ApplyRecoveryPointProviderSpecificInput {
  /** The class type. */
  instanceType: "A2A";
}

export function a2AApplyRecoveryPointInputSerializer(item: A2AApplyRecoveryPointInput): any {
  return { instanceType: item["instanceType"] };
}

/** ApplyRecoveryPoint input specific to A2ACrossClusterMigration provider. */
export interface A2ACrossClusterMigrationApplyRecoveryPointInput extends ApplyRecoveryPointProviderSpecificInput {
  /** The class type. */
  instanceType: "A2ACrossClusterMigration";
}

export function a2ACrossClusterMigrationApplyRecoveryPointInputSerializer(
  item: A2ACrossClusterMigrationApplyRecoveryPointInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** ApplyRecoveryPoint input specific to HyperVReplicaAzure provider. */
export interface HyperVReplicaAzureApplyRecoveryPointInput extends ApplyRecoveryPointProviderSpecificInput {
  /** The primary kek certificate pfx. */
  primaryKekCertificatePfx?: string;
  /** The secondary kek certificate pfx. */
  secondaryKekCertificatePfx?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureApplyRecoveryPointInputSerializer(
  item: HyperVReplicaAzureApplyRecoveryPointInput,
): any {
  return {
    instanceType: item["instanceType"],
    primaryKekCertificatePfx: item["primaryKekCertificatePfx"],
    secondaryKekCertificatePfx: item["secondaryKekCertificatePfx"],
  };
}

/** ApplyRecoveryPoint input specific to InMageAzureV2 provider. */
export interface InMageAzureV2ApplyRecoveryPointInput extends ApplyRecoveryPointProviderSpecificInput {
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2ApplyRecoveryPointInputSerializer(
  item: InMageAzureV2ApplyRecoveryPointInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** ApplyRecoveryPoint input specific to InMageRcm provider. */
export interface InMageRcmApplyRecoveryPointInput extends ApplyRecoveryPointProviderSpecificInput {
  /** The recovery point Id. */
  recoveryPointId: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmApplyRecoveryPointInputSerializer(
  item: InMageRcmApplyRecoveryPointInput,
): any {
  return { instanceType: item["instanceType"], recoveryPointId: item["recoveryPointId"] };
}

/** Input definition for planned failover. */
export interface PlannedFailoverInput {
  /** Planned failover input properties. */
  properties?: PlannedFailoverInputProperties;
}

export function plannedFailoverInputSerializer(item: PlannedFailoverInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : plannedFailoverInputPropertiesSerializer(item["properties"]),
  };
}

/** Input definition for planned failover input properties. */
export interface PlannedFailoverInputProperties {
  /** Failover direction. */
  failoverDirection?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: PlannedFailoverProviderSpecificFailoverInputUnion;
}

export function plannedFailoverInputPropertiesSerializer(
  item: PlannedFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : plannedFailoverProviderSpecificFailoverInputUnionSerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Provider specific failover input. */
export interface PlannedFailoverProviderSpecificFailoverInput {
  /** The class type. */
  /** The discriminator possible values: HyperVReplicaAzureFailback, HyperVReplicaAzure, InMageRcmFailback */
  instanceType: string;
}

export function plannedFailoverProviderSpecificFailoverInputSerializer(
  item: PlannedFailoverProviderSpecificFailoverInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for PlannedFailoverProviderSpecificFailoverInputUnion */
export type PlannedFailoverProviderSpecificFailoverInputUnion =
  | HyperVReplicaAzureFailbackProviderInput
  | HyperVReplicaAzurePlannedFailoverProviderInput
  | InMageRcmFailbackPlannedFailoverProviderInput
  | PlannedFailoverProviderSpecificFailoverInput;

export function plannedFailoverProviderSpecificFailoverInputUnionSerializer(
  item: PlannedFailoverProviderSpecificFailoverInputUnion,
): any {
  switch (item.instanceType) {
    case "HyperVReplicaAzureFailback":
      return hyperVReplicaAzureFailbackProviderInputSerializer(
        item as HyperVReplicaAzureFailbackProviderInput,
      );

    case "HyperVReplicaAzure":
      return hyperVReplicaAzurePlannedFailoverProviderInputSerializer(
        item as HyperVReplicaAzurePlannedFailoverProviderInput,
      );

    case "InMageRcmFailback":
      return inMageRcmFailbackPlannedFailoverProviderInputSerializer(
        item as InMageRcmFailbackPlannedFailoverProviderInput,
      );

    default:
      return plannedFailoverProviderSpecificFailoverInputSerializer(item);
  }
}

/** HyperVReplicaAzureFailback specific planned failover input. */
export interface HyperVReplicaAzureFailbackProviderInput extends PlannedFailoverProviderSpecificFailoverInput {
  /** Data sync option. */
  dataSyncOption?: string;
  /** ALR options to create alternate recovery. */
  recoveryVmCreationOption?: string;
  /** Provider Id for alternate location. */
  providerIdForAlternateRecovery?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzureFailback";
}

export function hyperVReplicaAzureFailbackProviderInputSerializer(
  item: HyperVReplicaAzureFailbackProviderInput,
): any {
  return {
    instanceType: item["instanceType"],
    dataSyncOption: item["dataSyncOption"],
    recoveryVmCreationOption: item["recoveryVmCreationOption"],
    providerIdForAlternateRecovery: item["providerIdForAlternateRecovery"],
  };
}

/** HyperVReplicaAzure specific planned failover input. */
export interface HyperVReplicaAzurePlannedFailoverProviderInput extends PlannedFailoverProviderSpecificFailoverInput {
  /** Primary kek certificate pfx. */
  primaryKekCertificatePfx?: string;
  /** Secondary kek certificate pfx. */
  secondaryKekCertificatePfx?: string;
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzurePlannedFailoverProviderInputSerializer(
  item: HyperVReplicaAzurePlannedFailoverProviderInput,
): any {
  return {
    instanceType: item["instanceType"],
    primaryKekCertificatePfx: item["primaryKekCertificatePfx"],
    secondaryKekCertificatePfx: item["secondaryKekCertificatePfx"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

/** Provider specific input for InMageRcmFailback failover. */
export interface InMageRcmFailbackPlannedFailoverProviderInput extends PlannedFailoverProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: InMageRcmFailbackRecoveryPointType;
  /** The class type. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackPlannedFailoverProviderInputSerializer(
  item: InMageRcmFailbackPlannedFailoverProviderInput,
): any {
  return { instanceType: item["instanceType"], recoveryPointType: item["recoveryPointType"] };
}

/** The recovery point type. */
export enum KnownInMageRcmFailbackRecoveryPointType {
  /** ApplicationConsistent */
  ApplicationConsistent = "ApplicationConsistent",
  /** CrashConsistent */
  CrashConsistent = "CrashConsistent",
}

/**
 * The recovery point type. \
 * {@link KnownInMageRcmFailbackRecoveryPointType} can be used interchangeably with InMageRcmFailbackRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplicationConsistent**: ApplicationConsistent \
 * **CrashConsistent**: CrashConsistent
 */
export type InMageRcmFailbackRecoveryPointType = string;

/** Disable protection input. */
export interface DisableProtectionInput {
  /** Disable protection input properties. */
  properties: DisableProtectionInputProperties;
}

export function disableProtectionInputSerializer(item: DisableProtectionInput): any {
  return { properties: disableProtectionInputPropertiesSerializer(item["properties"]) };
}

/** Disable protection input properties. */
export interface DisableProtectionInputProperties {
  /** Disable protection reason. It can have values NotSpecified/MigrationComplete. */
  disableProtectionReason?: DisableProtectionReason;
  /** Replication provider specific input. */
  replicationProviderInput?: DisableProtectionProviderSpecificInputUnion;
}

export function disableProtectionInputPropertiesSerializer(
  item: DisableProtectionInputProperties,
): any {
  return {
    disableProtectionReason: item["disableProtectionReason"],
    replicationProviderInput: !item["replicationProviderInput"]
      ? item["replicationProviderInput"]
      : disableProtectionProviderSpecificInputUnionSerializer(item["replicationProviderInput"]),
  };
}

/** Disable protection reason. It can have values NotSpecified/MigrationComplete. */
export enum KnownDisableProtectionReason {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** MigrationComplete */
  MigrationComplete = "MigrationComplete",
}

/**
 * Disable protection reason. It can have values NotSpecified/MigrationComplete. \
 * {@link KnownDisableProtectionReason} can be used interchangeably with DisableProtectionReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **MigrationComplete**: MigrationComplete
 */
export type DisableProtectionReason = string;

/** Disable protection provider specific input. */
export interface DisableProtectionProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: InMage */
  instanceType: string;
}

export function disableProtectionProviderSpecificInputSerializer(
  item: DisableProtectionProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for DisableProtectionProviderSpecificInputUnion */
export type DisableProtectionProviderSpecificInputUnion =
  | InMageDisableProtectionProviderSpecificInput
  | DisableProtectionProviderSpecificInput;

export function disableProtectionProviderSpecificInputUnionSerializer(
  item: DisableProtectionProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "InMage":
      return inMageDisableProtectionProviderSpecificInputSerializer(
        item as InMageDisableProtectionProviderSpecificInput,
      );

    default:
      return disableProtectionProviderSpecificInputSerializer(item);
  }
}

/** InMage disable protection provider specific input. */
export interface InMageDisableProtectionProviderSpecificInput extends DisableProtectionProviderSpecificInput {
  /** A value indicating whether the replica VM should be destroyed or retained. Values from Delete and Retain. */
  replicaVmDeletionStatus?: string;
  /** The class type. */
  instanceType: "InMage";
}

export function inMageDisableProtectionProviderSpecificInputSerializer(
  item: InMageDisableProtectionProviderSpecificInput,
): any {
  return {
    instanceType: item["instanceType"],
    replicaVmDeletionStatus: item["replicaVmDeletionStatus"],
  };
}

/** Input for remove disk(s) operation. */
export interface RemoveDisksInput {
  /** Remove disk input properties. */
  properties?: RemoveDisksInputProperties;
}

export function removeDisksInputSerializer(item: RemoveDisksInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : removeDisksInputPropertiesSerializer(item["properties"]),
  };
}

/** Remove Disk input properties. */
export interface RemoveDisksInputProperties {
  /** The ReplicationProviderInput. For HyperVReplicaAzure provider, it will be AzureEnableProtectionInput object. For San provider, it will be SanEnableProtectionInput object. For HyperVReplicaAzure provider, it can be null. */
  providerSpecificDetails?: RemoveDisksProviderSpecificInputUnion;
}

export function removeDisksInputPropertiesSerializer(item: RemoveDisksInputProperties): any {
  return {
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : removeDisksProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Remove Disk provider specific input. */
export interface RemoveDisksProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function removeDisksProviderSpecificInputSerializer(
  item: RemoveDisksProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for RemoveDisksProviderSpecificInputUnion */
export type RemoveDisksProviderSpecificInputUnion =
  | A2ARemoveDisksInput
  | RemoveDisksProviderSpecificInput;

export function removeDisksProviderSpecificInputUnionSerializer(
  item: RemoveDisksProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ARemoveDisksInputSerializer(item as A2ARemoveDisksInput);

    default:
      return removeDisksProviderSpecificInputSerializer(item);
  }
}

/** A2A remove disk(s) input. */
export interface A2ARemoveDisksInput extends RemoveDisksProviderSpecificInput {
  /** The list of vm disk vhd URIs. */
  vmDisksUris?: string[];
  /** The list of vm managed disk Ids. */
  vmManagedDisksIds?: string[];
  /** The class type. */
  instanceType: "A2A";
}

export function a2ARemoveDisksInputSerializer(item: A2ARemoveDisksInput): any {
  return {
    instanceType: item["instanceType"],
    vmDisksUris: !item["vmDisksUris"]
      ? item["vmDisksUris"]
      : item["vmDisksUris"].map((p: any) => {
          return p;
        }),
    vmManagedDisksIds: !item["vmManagedDisksIds"]
      ? item["vmManagedDisksIds"]
      : item["vmManagedDisksIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Reverse replication input. */
export interface ReverseReplicationInput {
  /** Reverse replication properties. */
  properties?: ReverseReplicationInputProperties;
}

export function reverseReplicationInputSerializer(item: ReverseReplicationInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : reverseReplicationInputPropertiesSerializer(item["properties"]),
  };
}

/** Reverse replication input properties. */
export interface ReverseReplicationInputProperties {
  /** Failover direction. */
  failoverDirection?: string;
  /** Provider specific reverse replication input. */
  providerSpecificDetails?: ReverseReplicationProviderSpecificInputUnion;
}

export function reverseReplicationInputPropertiesSerializer(
  item: ReverseReplicationInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : reverseReplicationProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Provider specific reverse replication input. */
export interface ReverseReplicationProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A, HyperVReplicaAzure, InMageAzureV2, InMageRcmFailback, InMageRcm, InMage */
  instanceType: string;
}

export function reverseReplicationProviderSpecificInputSerializer(
  item: ReverseReplicationProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ReverseReplicationProviderSpecificInputUnion */
export type ReverseReplicationProviderSpecificInputUnion =
  | A2AReprotectInput
  | HyperVReplicaAzureReprotectInput
  | InMageAzureV2ReprotectInput
  | InMageRcmFailbackReprotectInput
  | InMageRcmReprotectInput
  | InMageReprotectInput
  | ReverseReplicationProviderSpecificInput;

export function reverseReplicationProviderSpecificInputUnionSerializer(
  item: ReverseReplicationProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AReprotectInputSerializer(item as A2AReprotectInput);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureReprotectInputSerializer(item as HyperVReplicaAzureReprotectInput);

    case "InMageAzureV2":
      return inMageAzureV2ReprotectInputSerializer(item as InMageAzureV2ReprotectInput);

    case "InMageRcmFailback":
      return inMageRcmFailbackReprotectInputSerializer(item as InMageRcmFailbackReprotectInput);

    case "InMageRcm":
      return inMageRcmReprotectInputSerializer(item as InMageRcmReprotectInput);

    case "InMage":
      return inMageReprotectInputSerializer(item as InMageReprotectInput);

    default:
      return reverseReplicationProviderSpecificInputSerializer(item);
  }
}

/** Azure specific reprotect input. */
export interface A2AReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The list of vm disk details. */
  vmDisks?: A2AVmDiskInputDetails[];
  /** The recovery resource group Id. Valid for V2 scenarios. */
  recoveryResourceGroupId?: string;
  /** The recovery cloud service Id. Valid for V1 scenarios. */
  recoveryCloudServiceId?: string;
  /** The recovery availability set. */
  recoveryAvailabilitySetId?: string;
  /** The Policy Id. */
  policyId?: string;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AReprotectInputSerializer(item: A2AReprotectInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryContainerId: item["recoveryContainerId"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AVmDiskInputDetailsArraySerializer(item["vmDisks"]),
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryCloudServiceId: item["recoveryCloudServiceId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    policyId: item["policyId"],
  };
}

/** Azure specific reprotect input. */
export interface HyperVReplicaAzureReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The Hyper-V host Vm Id. */
  hvHostVmId?: string;
  /** The Vm Name. */
  vmName?: string;
  /** The OS type associated with vm. */
  osType?: string;
  /** The OS disk VHD id associated with vm. */
  vHDId?: string;
  /** The storage account name. */
  storageAccountId?: string;
  /** The storage account to be used for logging during replication. */
  logStorageAccountId?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureReprotectInputSerializer(
  item: HyperVReplicaAzureReprotectInput,
): any {
  return {
    instanceType: item["instanceType"],
    hvHostVmId: item["hvHostVmId"],
    vmName: item["vmName"],
    osType: item["osType"],
    vHDId: item["vHDId"],
    storageAccountId: item["storageAccountId"],
    logStorageAccountId: item["logStorageAccountId"],
  };
}

/** InMageAzureV2 specific provider input. */
export interface InMageAzureV2ReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The Master target Id. */
  masterTargetId?: string;
  /** The Process Server Id. */
  processServerId?: string;
  /** The storage account id. */
  storageAccountId?: string;
  /** The CS account Id. */
  runAsAccountId?: string;
  /** The Policy Id. */
  policyId?: string;
  /** The storage account to be used for logging during replication. */
  logStorageAccountId?: string;
  /** The disks to include list. */
  disksToInclude?: string[];
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2ReprotectInputSerializer(item: InMageAzureV2ReprotectInput): any {
  return {
    instanceType: item["instanceType"],
    masterTargetId: item["masterTargetId"],
    processServerId: item["processServerId"],
    storageAccountId: item["storageAccountId"],
    runAsAccountId: item["runAsAccountId"],
    policyId: item["policyId"],
    logStorageAccountId: item["logStorageAccountId"],
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : item["disksToInclude"].map((p: any) => {
          return p;
        }),
  };
}

/** InMageRcmFailback specific provider input. */
export interface InMageRcmFailbackReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The process server Id. */
  processServerId: string;
  /** The run as account Id. */
  runAsAccountId?: string;
  /** The Policy Id. */
  policyId: string;
  /** The class type. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackReprotectInputSerializer(
  item: InMageRcmFailbackReprotectInput,
): any {
  return {
    instanceType: item["instanceType"],
    processServerId: item["processServerId"],
    runAsAccountId: item["runAsAccountId"],
    policyId: item["policyId"],
  };
}

/** InMageRcm specific provider input. */
export interface InMageRcmReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The reprotect agent Id. */
  reprotectAgentId: string;
  /** The target datastore name. */
  datastoreName: string;
  /** The log storage account ARM Id. */
  logStorageAccountId: string;
  /** The Policy Id. */
  policyId?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmReprotectInputSerializer(item: InMageRcmReprotectInput): any {
  return {
    instanceType: item["instanceType"],
    reprotectAgentId: item["reprotectAgentId"],
    datastoreName: item["datastoreName"],
    logStorageAccountId: item["logStorageAccountId"],
    policyId: item["policyId"],
  };
}

/** InMageAzureV2 specific provider input. */
export interface InMageReprotectInput extends ReverseReplicationProviderSpecificInput {
  /** The Master Target Id. */
  masterTargetId: string;
  /** The Process Server Id. */
  processServerId: string;
  /** The retention drive to use on the MT. */
  retentionDrive: string;
  /** The CS account Id. */
  runAsAccountId?: string;
  /** The target datastore name. */
  datastoreName?: string;
  /** The enable disk exclusion input. */
  diskExclusionInput?: InMageDiskExclusionInput;
  /** The Policy Id. */
  profileId: string;
  /** The disks to include list. */
  disksToInclude?: string[];
  /** The class type. */
  instanceType: "InMage";
}

export function inMageReprotectInputSerializer(item: InMageReprotectInput): any {
  return {
    instanceType: item["instanceType"],
    masterTargetId: item["masterTargetId"],
    processServerId: item["processServerId"],
    retentionDrive: item["retentionDrive"],
    runAsAccountId: item["runAsAccountId"],
    datastoreName: item["datastoreName"],
    diskExclusionInput: !item["diskExclusionInput"]
      ? item["diskExclusionInput"]
      : inMageDiskExclusionInputSerializer(item["diskExclusionInput"]),
    profileId: item["profileId"],
    disksToInclude: !item["disksToInclude"]
      ? item["disksToInclude"]
      : item["disksToInclude"].map((p: any) => {
          return p;
        }),
  };
}

/** Resolve health input. */
export interface ResolveHealthInput {
  /** Disable resolve health input properties. */
  properties?: ResolveHealthInputProperties;
}

export function resolveHealthInputSerializer(item: ResolveHealthInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : resolveHealthInputPropertiesSerializer(item["properties"]),
  };
}

/** Resolve health input properties. */
export interface ResolveHealthInputProperties {
  /** Health errors. */
  healthErrors?: ResolveHealthError[];
}

export function resolveHealthInputPropertiesSerializer(item: ResolveHealthInputProperties): any {
  return {
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : resolveHealthErrorArraySerializer(item["healthErrors"]),
  };
}

export function resolveHealthErrorArraySerializer(result: Array<ResolveHealthError>): any[] {
  return result.map((item) => {
    return resolveHealthErrorSerializer(item);
  });
}

/** Resolve health errors input properties. */
export interface ResolveHealthError {
  /** Health error id. */
  healthErrorId?: string;
}

export function resolveHealthErrorSerializer(item: ResolveHealthError): any {
  return { healthErrorId: item["healthErrorId"] };
}

/** Input definition for switch provider. */
export interface SwitchProviderInput {
  /** Switch provider input properties. */
  properties?: SwitchProviderInputProperties;
}

export function switchProviderInputSerializer(item: SwitchProviderInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : switchProviderInputPropertiesSerializer(item["properties"]),
  };
}

/** Input definition for switch provider input properties. */
export interface SwitchProviderInputProperties {
  /** Target provider type. */
  targetInstanceType?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: SwitchProviderSpecificInputUnion;
}

export function switchProviderInputPropertiesSerializer(item: SwitchProviderInputProperties): any {
  return {
    targetInstanceType: item["targetInstanceType"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : switchProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Provider specific switch provider input. */
export interface SwitchProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: InMageAzureV2 */
  instanceType: string;
}

export function switchProviderSpecificInputSerializer(item: SwitchProviderSpecificInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for SwitchProviderSpecificInputUnion */
export type SwitchProviderSpecificInputUnion =
  | InMageAzureV2SwitchProviderInput
  | SwitchProviderSpecificInput;

export function switchProviderSpecificInputUnionSerializer(
  item: SwitchProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "InMageAzureV2":
      return inMageAzureV2SwitchProviderInputSerializer(item as InMageAzureV2SwitchProviderInput);

    default:
      return switchProviderSpecificInputSerializer(item);
  }
}

/** Provider specific input for InMageAzureV2 switch provider. */
export interface InMageAzureV2SwitchProviderInput extends SwitchProviderSpecificInput {
  /** The target vault Id. */
  targetVaultID: string;
  /** The target fabric Id. */
  targetFabricID: string;
  /** The target appliance Id. */
  targetApplianceID: string;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2SwitchProviderInputSerializer(
  item: InMageAzureV2SwitchProviderInput,
): any {
  return {
    instanceType: item["instanceType"],
    targetVaultID: item["targetVaultID"],
    targetFabricID: item["targetFabricID"],
    targetApplianceID: item["targetApplianceID"],
  };
}

/** Input definition for test failover. */
export interface TestFailoverInput {
  /** Test failover input properties. */
  properties: TestFailoverInputProperties;
}

export function testFailoverInputSerializer(item: TestFailoverInput): any {
  return { properties: testFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for test failover input properties. */
export interface TestFailoverInputProperties {
  /** Test failover direction. */
  failoverDirection?: string;
  /** Network type to be used for test failover. */
  networkType?: string;
  /** The id of the network to be used for test failover. */
  networkId?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: TestFailoverProviderSpecificInputUnion;
}

export function testFailoverInputPropertiesSerializer(item: TestFailoverInputProperties): any {
  return {
    failoverDirection: item["failoverDirection"],
    networkType: item["networkType"],
    networkId: item["networkId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : testFailoverProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Provider specific test failover input. */
export interface TestFailoverProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A, HyperVReplicaAzure, InMageAzureV2, InMageRcm, InMage */
  instanceType: string;
}

export function testFailoverProviderSpecificInputSerializer(
  item: TestFailoverProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for TestFailoverProviderSpecificInputUnion */
export type TestFailoverProviderSpecificInputUnion =
  | A2ATestFailoverInput
  | HyperVReplicaAzureTestFailoverInput
  | InMageAzureV2TestFailoverInput
  | InMageRcmTestFailoverInput
  | InMageTestFailoverInput
  | TestFailoverProviderSpecificInput;

export function testFailoverProviderSpecificInputUnionSerializer(
  item: TestFailoverProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ATestFailoverInputSerializer(item as A2ATestFailoverInput);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureTestFailoverInputSerializer(
        item as HyperVReplicaAzureTestFailoverInput,
      );

    case "InMageAzureV2":
      return inMageAzureV2TestFailoverInputSerializer(item as InMageAzureV2TestFailoverInput);

    case "InMageRcm":
      return inMageRcmTestFailoverInputSerializer(item as InMageRcmTestFailoverInput);

    case "InMage":
      return inMageTestFailoverInputSerializer(item as InMageTestFailoverInput);

    default:
      return testFailoverProviderSpecificInputSerializer(item);
  }
}

/** A2A provider specific input for test failover. */
export interface A2ATestFailoverInput extends TestFailoverProviderSpecificInput {
  /** The recovery point id to be passed to test failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating whether to use recovery cloud service for TFO or not. */
  cloudServiceCreationOption?: string;
  /** The class type. */
  instanceType: "A2A";
}

export function a2ATestFailoverInputSerializer(item: A2ATestFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointId: item["recoveryPointId"],
    cloudServiceCreationOption: item["cloudServiceCreationOption"],
  };
}

/** HvrA provider specific input for test failover. */
export interface HyperVReplicaAzureTestFailoverInput extends TestFailoverProviderSpecificInput {
  /** Primary kek certificate pfx. */
  primaryKekCertificatePfx?: string;
  /** Secondary kek certificate pfx. */
  secondaryKekCertificatePfx?: string;
  /** The recovery point id to be passed to test failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureTestFailoverInputSerializer(
  item: HyperVReplicaAzureTestFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    primaryKekCertificatePfx: item["primaryKekCertificatePfx"],
    secondaryKekCertificatePfx: item["secondaryKekCertificatePfx"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
  };
}

/** InMageAzureV2 provider specific input for test failover. */
export interface InMageAzureV2TestFailoverInput extends TestFailoverProviderSpecificInput {
  /** The recovery point id to be passed to test failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2TestFailoverInputSerializer(
  item: InMageAzureV2TestFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
  };
}

/** InMageRcm provider specific input for test failover. */
export interface InMageRcmTestFailoverInput extends TestFailoverProviderSpecificInput {
  /** The test network Id. */
  networkId?: string;
  /** The recovery point id to be passed to test failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmTestFailoverInputSerializer(item: InMageRcmTestFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    networkId: item["networkId"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
  };
}

/** Provider specific input for InMage test failover. */
export interface InMageTestFailoverInput extends TestFailoverProviderSpecificInput {
  /** The recovery point type. Values from LatestTime, LatestTag or Custom. In the case of custom, the recovery point provided by RecoveryPointId will be used. In the other two cases, recovery point id will be ignored. */
  recoveryPointType?: RecoveryPointType;
  /** The recovery point id to be passed to test failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** The class type. */
  instanceType: "InMage";
}

export function inMageTestFailoverInputSerializer(item: InMageTestFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    recoveryPointId: item["recoveryPointId"],
  };
}

/** The recovery point type. Values from LatestTime, LatestTag or Custom. In the case of custom, the recovery point provided by RecoveryPointId will be used. In the other two cases, recovery point id will be ignored. */
export enum KnownRecoveryPointType {
  /** LatestTime */
  LatestTime = "LatestTime",
  /** LatestTag */
  LatestTag = "LatestTag",
  /** Custom */
  Custom = "Custom",
}

/**
 * The recovery point type. Values from LatestTime, LatestTag or Custom. In the case of custom, the recovery point provided by RecoveryPointId will be used. In the other two cases, recovery point id will be ignored. \
 * {@link KnownRecoveryPointType} can be used interchangeably with RecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LatestTime**: LatestTime \
 * **LatestTag**: LatestTag \
 * **Custom**: Custom
 */
export type RecoveryPointType = string;

/** Input definition for test failover cleanup. */
export interface TestFailoverCleanupInput {
  /** Test failover cleanup input properties. */
  properties: TestFailoverCleanupInputProperties;
}

export function testFailoverCleanupInputSerializer(item: TestFailoverCleanupInput): any {
  return { properties: testFailoverCleanupInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for test failover cleanup input properties. */
export interface TestFailoverCleanupInputProperties {
  /** Test failover cleanup comments. */
  comments?: string;
}

export function testFailoverCleanupInputPropertiesSerializer(
  item: TestFailoverCleanupInputProperties,
): any {
  return { comments: item["comments"] };
}

/** Input definition for unplanned failover. */
export interface UnplannedFailoverInput {
  /** Unplanned failover input properties. */
  properties: UnplannedFailoverInputProperties;
}

export function unplannedFailoverInputSerializer(item: UnplannedFailoverInput): any {
  return { properties: unplannedFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for unplanned failover input properties. */
export interface UnplannedFailoverInputProperties {
  /** Failover direction. */
  failoverDirection?: string;
  /** Source site operations status. */
  sourceSiteOperations?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: UnplannedFailoverProviderSpecificInputUnion;
}

export function unplannedFailoverInputPropertiesSerializer(
  item: UnplannedFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    sourceSiteOperations: item["sourceSiteOperations"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : unplannedFailoverProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Provider specific unplanned failover input. */
export interface UnplannedFailoverProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A, HyperVReplicaAzure, InMageAzureV2, InMageRcm, InMage */
  instanceType: string;
}

export function unplannedFailoverProviderSpecificInputSerializer(
  item: UnplannedFailoverProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for UnplannedFailoverProviderSpecificInputUnion */
export type UnplannedFailoverProviderSpecificInputUnion =
  | A2AUnplannedFailoverInput
  | HyperVReplicaAzureUnplannedFailoverInput
  | InMageAzureV2UnplannedFailoverInput
  | InMageRcmUnplannedFailoverInput
  | InMageUnplannedFailoverInput
  | UnplannedFailoverProviderSpecificInput;

export function unplannedFailoverProviderSpecificInputUnionSerializer(
  item: UnplannedFailoverProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AUnplannedFailoverInputSerializer(item as A2AUnplannedFailoverInput);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureUnplannedFailoverInputSerializer(
        item as HyperVReplicaAzureUnplannedFailoverInput,
      );

    case "InMageAzureV2":
      return inMageAzureV2UnplannedFailoverInputSerializer(
        item as InMageAzureV2UnplannedFailoverInput,
      );

    case "InMageRcm":
      return inMageRcmUnplannedFailoverInputSerializer(item as InMageRcmUnplannedFailoverInput);

    case "InMage":
      return inMageUnplannedFailoverInputSerializer(item as InMageUnplannedFailoverInput);

    default:
      return unplannedFailoverProviderSpecificInputSerializer(item);
  }
}

/** A2A provider specific input for unplanned failover. */
export interface A2AUnplannedFailoverInput extends UnplannedFailoverProviderSpecificInput {
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating whether to use recovery cloud service for failover or not. */
  cloudServiceCreationOption?: string;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AUnplannedFailoverInputSerializer(item: A2AUnplannedFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointId: item["recoveryPointId"],
    cloudServiceCreationOption: item["cloudServiceCreationOption"],
  };
}

/** HvrA provider specific input for unplanned failover. */
export interface HyperVReplicaAzureUnplannedFailoverInput extends UnplannedFailoverProviderSpecificInput {
  /** Primary kek certificate pfx. */
  primaryKekCertificatePfx?: string;
  /** Secondary kek certificate pfx. */
  secondaryKekCertificatePfx?: string;
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureUnplannedFailoverInputSerializer(
  item: HyperVReplicaAzureUnplannedFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    primaryKekCertificatePfx: item["primaryKekCertificatePfx"],
    secondaryKekCertificatePfx: item["secondaryKekCertificatePfx"],
    recoveryPointId: item["recoveryPointId"],
  };
}

/** InMageAzureV2 provider specific input for unplanned failover. */
export interface InMageAzureV2UnplannedFailoverInput extends UnplannedFailoverProviderSpecificInput {
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2UnplannedFailoverInputSerializer(
  item: InMageAzureV2UnplannedFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
  };
}

/** InMageRcm provider specific input for unplanned failover. */
export interface InMageRcmUnplannedFailoverInput extends UnplannedFailoverProviderSpecificInput {
  /** A value indicating whether VM is to be shutdown. */
  performShutdown: string;
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmUnplannedFailoverInputSerializer(
  item: InMageRcmUnplannedFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    performShutdown: item["performShutdown"],
    recoveryPointId: item["recoveryPointId"],
    osUpgradeVersion: item["osUpgradeVersion"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

/** Provider specific input for InMage unplanned failover. */
export interface InMageUnplannedFailoverInput extends UnplannedFailoverProviderSpecificInput {
  /** The recovery point type. Values from LatestTime, LatestTag or Custom. In the case of custom, the recovery point provided by RecoveryPointId will be used. In the other two cases, recovery point id will be ignored. */
  recoveryPointType?: RecoveryPointType;
  /** The recovery point id to be passed to failover to a particular recovery point. In case of latest recovery point, null should be passed. */
  recoveryPointId?: string;
  /** The class type. */
  instanceType: "InMage";
}

export function inMageUnplannedFailoverInputSerializer(item: InMageUnplannedFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    recoveryPointId: item["recoveryPointId"],
  };
}

/** Update appliance for replication protected item input. */
export interface UpdateApplianceForReplicationProtectedItemInput {
  /** Update appliance replication protected item properties. */
  properties: UpdateApplianceForReplicationProtectedItemInputProperties;
}

export function updateApplianceForReplicationProtectedItemInputSerializer(
  item: UpdateApplianceForReplicationProtectedItemInput,
): any {
  return {
    properties: updateApplianceForReplicationProtectedItemInputPropertiesSerializer(
      item["properties"],
    ),
  };
}

/** Update appliance for protected item input properties. */
export interface UpdateApplianceForReplicationProtectedItemInputProperties {
  /** The target appliance Id. */
  targetApplianceId: string;
  /** The provider specific input to update replication protected item. */
  providerSpecificDetails: UpdateApplianceForReplicationProtectedItemProviderSpecificInputUnion;
}

export function updateApplianceForReplicationProtectedItemInputPropertiesSerializer(
  item: UpdateApplianceForReplicationProtectedItemInputProperties,
): any {
  return {
    targetApplianceId: item["targetApplianceId"],
    providerSpecificDetails:
      updateApplianceForReplicationProtectedItemProviderSpecificInputUnionSerializer(
        item["providerSpecificDetails"],
      ),
  };
}

/** Update replication protected item provider specific input. */
export interface UpdateApplianceForReplicationProtectedItemProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: InMageRcm */
  instanceType: string;
}

export function updateApplianceForReplicationProtectedItemProviderSpecificInputSerializer(
  item: UpdateApplianceForReplicationProtectedItemProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for UpdateApplianceForReplicationProtectedItemProviderSpecificInputUnion */
export type UpdateApplianceForReplicationProtectedItemProviderSpecificInputUnion =
  | InMageRcmUpdateApplianceForReplicationProtectedItemInput
  | UpdateApplianceForReplicationProtectedItemProviderSpecificInput;

export function updateApplianceForReplicationProtectedItemProviderSpecificInputUnionSerializer(
  item: UpdateApplianceForReplicationProtectedItemProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "InMageRcm":
      return inMageRcmUpdateApplianceForReplicationProtectedItemInputSerializer(
        item as InMageRcmUpdateApplianceForReplicationProtectedItemInput,
      );

    default:
      return updateApplianceForReplicationProtectedItemProviderSpecificInputSerializer(item);
  }
}

/** InMageRcm provider specific input to update appliance for replication protected item. */
export interface InMageRcmUpdateApplianceForReplicationProtectedItemInput extends UpdateApplianceForReplicationProtectedItemProviderSpecificInput {
  /** The run as account Id. */
  runAsAccountId?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmUpdateApplianceForReplicationProtectedItemInputSerializer(
  item: InMageRcmUpdateApplianceForReplicationProtectedItemInput,
): any {
  return { instanceType: item["instanceType"], runAsAccountId: item["runAsAccountId"] };
}

/** Request to update the mobility service on a protected item. */
export interface UpdateMobilityServiceRequest {
  /** The properties of the update mobility service request. */
  properties?: UpdateMobilityServiceRequestProperties;
}

export function updateMobilityServiceRequestSerializer(item: UpdateMobilityServiceRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateMobilityServiceRequestPropertiesSerializer(item["properties"]),
  };
}

/** The properties of an update mobility service request. */
export interface UpdateMobilityServiceRequestProperties {
  /** The CS run as account Id. */
  runAsAccountId?: string;
}

export function updateMobilityServiceRequestPropertiesSerializer(
  item: UpdateMobilityServiceRequestProperties,
): any {
  return { runAsAccountId: item["runAsAccountId"] };
}

/** Request to Reinstall the mobility service on a protected item. */
export interface ReinstallMobilityServiceRequest {
  /** The properties of the reinstall mobility service request */
  properties?: ReinstallMobilityServiceRequestProperties;
}

export function reinstallMobilityServiceRequestSerializer(
  item: ReinstallMobilityServiceRequest,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : reinstallMobilityServiceRequestPropertiesSerializer(item["properties"]),
  };
}

/** The properties of an update mobility service request. */
export interface ReinstallMobilityServiceRequestProperties {
  /** The CS run as account Id. */
  runAsAccountId?: string;
}

export function reinstallMobilityServiceRequestPropertiesSerializer(
  item: ReinstallMobilityServiceRequestProperties,
): any {
  return { runAsAccountId: item["runAsAccountId"] };
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

/** Target compute size collection. */
export interface _TargetComputeSizeCollection {
  /** The TargetComputeSize items on this page */
  value: TargetComputeSize[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _targetComputeSizeCollectionDeserializer(item: any): _TargetComputeSizeCollection {
  return {
    value: targetComputeSizeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetComputeSizeArrayDeserializer(result: Array<TargetComputeSize>): any[] {
  return result.map((item) => {
    return targetComputeSizeDeserializer(item);
  });
}

/** Represents applicable recovery vm sizes. */
export interface TargetComputeSize {
  /** The Id. */
  id?: string;
  /** The name. */
  name?: string;
  /** The Type of the object. */
  type?: string;
  /** The custom data. */
  properties?: TargetComputeSizeProperties;
}

export function targetComputeSizeDeserializer(item: any): TargetComputeSize {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : targetComputeSizePropertiesDeserializer(item["properties"]),
  };
}

/** Represents applicable recovery vm sizes properties. */
export interface TargetComputeSizeProperties {
  /** Target compute size name. */
  name?: string;
  /** Target compute size display name. */
  friendlyName?: string;
  /** The maximum cpu cores count supported by target compute size. */
  cpuCoresCount?: number;
  /** The Available vCPUs supported by target compute size. */
  readonly vCPUsAvailable?: number;
  /** The maximum memory in GB supported by target compute size. */
  memoryInGB?: number;
  /** The maximum data disks count supported by target compute size. */
  maxDataDiskCount?: number;
  /** The maximum Nics count supported by target compute size. */
  maxNicsCount?: number;
  /** The reasons why the target compute size is not applicable for the protected item. */
  errors?: ComputeSizeErrorDetails[];
  /** The value indicating whether the target compute size supports high Iops. */
  highIopsSupported?: string;
  /** The supported HyperV Generations. */
  hyperVGenerations?: string[];
}

export function targetComputeSizePropertiesDeserializer(item: any): TargetComputeSizeProperties {
  return {
    name: item["name"],
    friendlyName: item["friendlyName"],
    cpuCoresCount: item["cpuCoresCount"],
    vCPUsAvailable: item["vCPUsAvailable"],
    memoryInGB: item["memoryInGB"],
    maxDataDiskCount: item["maxDataDiskCount"],
    maxNicsCount: item["maxNicsCount"],
    errors: !item["errors"]
      ? item["errors"]
      : computeSizeErrorDetailsArrayDeserializer(item["errors"]),
    highIopsSupported: item["highIopsSupported"],
    hyperVGenerations: !item["hyperVGenerations"]
      ? item["hyperVGenerations"]
      : item["hyperVGenerations"].map((p: any) => {
          return p;
        }),
  };
}

export function computeSizeErrorDetailsArrayDeserializer(
  result: Array<ComputeSizeErrorDetails>,
): any[] {
  return result.map((item) => {
    return computeSizeErrorDetailsDeserializer(item);
  });
}

/** Represents the error used to indicate why the target compute size is not applicable. */
export interface ComputeSizeErrorDetails {
  /** The error message. */
  message?: string;
  /** The severity of the error. */
  severity?: string;
}

export function computeSizeErrorDetailsDeserializer(item: any): ComputeSizeErrorDetails {
  return {
    message: item["message"],
    severity: item["severity"],
  };
}

/** Recovery point. */
export interface RecoveryPoint extends ProxyResource {
  /** The recovery point properties. */
  properties?: RecoveryPointProperties;
  /** Resource Location */
  location?: string;
}

export function recoveryPointDeserializer(item: any): RecoveryPoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPointPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Recovery point properties. */
export interface RecoveryPointProperties {
  /** The recovery point time. */
  recoveryPointTime?: Date;
  /** The recovery point type: ApplicationConsistent, CrashConsistent. */
  recoveryPointType?: string;
  /** The provider specific details for the recovery point. */
  providerSpecificDetails?: ProviderSpecificRecoveryPointDetailsUnion;
}

export function recoveryPointPropertiesDeserializer(item: any): RecoveryPointProperties {
  return {
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    recoveryPointType: item["recoveryPointType"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : providerSpecificRecoveryPointDetailsUnionDeserializer(item["providerSpecificDetails"]),
  };
}

/** Replication provider specific recovery point details. */
export interface ProviderSpecificRecoveryPointDetails {
  /** Gets the provider type. */
  /** The discriminator possible values: A2A, InMageAzureV2, InMageRcm */
  instanceType: string;
}

export function providerSpecificRecoveryPointDetailsDeserializer(
  item: any,
): ProviderSpecificRecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ProviderSpecificRecoveryPointDetailsUnion */
export type ProviderSpecificRecoveryPointDetailsUnion =
  | A2ARecoveryPointDetails
  | InMageAzureV2RecoveryPointDetails
  | InMageRcmRecoveryPointDetails
  | ProviderSpecificRecoveryPointDetails;

export function providerSpecificRecoveryPointDetailsUnionDeserializer(
  item: any,
): ProviderSpecificRecoveryPointDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2ARecoveryPointDetailsDeserializer(item as A2ARecoveryPointDetails);

    case "InMageAzureV2":
      return inMageAzureV2RecoveryPointDetailsDeserializer(
        item as InMageAzureV2RecoveryPointDetails,
      );

    case "InMageRcm":
      return inMageRcmRecoveryPointDetailsDeserializer(item as InMageRcmRecoveryPointDetails);

    default:
      return providerSpecificRecoveryPointDetailsDeserializer(item);
  }
}

/** A2A provider specific recovery point details. */
export interface A2ARecoveryPointDetails extends ProviderSpecificRecoveryPointDetails {
  /** A value indicating whether the recovery point is multi VM consistent. */
  recoveryPointSyncType?: RecoveryPointSyncType;
  /** List of disk ids representing a recovery point. */
  disks?: string[];
  /** Gets the provider type. */
  instanceType: "A2A";
}

export function a2ARecoveryPointDetailsDeserializer(item: any): A2ARecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointSyncType: item["recoveryPointSyncType"],
    disks: !item["disks"]
      ? item["disks"]
      : item["disks"].map((p: any) => {
          return p;
        }),
  };
}

/** A value indicating whether the recovery point is multi VM consistent. */
export enum KnownRecoveryPointSyncType {
  /** MultiVmSyncRecoveryPoint */
  MultiVmSyncRecoveryPoint = "MultiVmSyncRecoveryPoint",
  /** PerVmRecoveryPoint */
  PerVmRecoveryPoint = "PerVmRecoveryPoint",
}

/**
 * A value indicating whether the recovery point is multi VM consistent. \
 * {@link KnownRecoveryPointSyncType} can be used interchangeably with RecoveryPointSyncType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MultiVmSyncRecoveryPoint**: MultiVmSyncRecoveryPoint \
 * **PerVmRecoveryPoint**: PerVmRecoveryPoint
 */
export type RecoveryPointSyncType = string;

/** InMage Azure V2 provider specific recovery point details. */
export interface InMageAzureV2RecoveryPointDetails extends ProviderSpecificRecoveryPointDetails {
  /** A value indicating whether the recovery point is multi VM consistent. */
  isMultiVmSyncPoint?: string;
  /** Gets the provider type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2RecoveryPointDetailsDeserializer(
  item: any,
): InMageAzureV2RecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
    isMultiVmSyncPoint: item["isMultiVmSyncPoint"],
  };
}

/** InMageRcm provider specific recovery point details. */
export interface InMageRcmRecoveryPointDetails extends ProviderSpecificRecoveryPointDetails {
  /** A value indicating whether the recovery point is multi VM consistent. */
  readonly isMultiVmSyncPoint?: string;
  /** Gets the provider type. */
  instanceType: "InMageRcm";
}

export function inMageRcmRecoveryPointDetailsDeserializer(
  item: any,
): InMageRcmRecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
    isMultiVmSyncPoint: item["isMultiVmSyncPoint"],
  };
}

/** Collection of recovery point details. */
export interface _RecoveryPointCollection {
  /** The RecoveryPoint items on this page */
  value: RecoveryPoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryPointCollectionDeserializer(item: any): _RecoveryPointCollection {
  return {
    value: recoveryPointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryPointArrayDeserializer(result: Array<RecoveryPoint>): any[] {
  return result.map((item) => {
    return recoveryPointDeserializer(item);
  });
}

/** Replication protection Cluster. */
export interface ReplicationProtectionCluster extends ProxyResource {
  /** The custom data. */
  properties?: ReplicationProtectionClusterProperties;
}

export function replicationProtectionClusterSerializer(item: ReplicationProtectionCluster): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : replicationProtectionClusterPropertiesSerializer(item["properties"]),
  };
}

export function replicationProtectionClusterDeserializer(item: any): ReplicationProtectionCluster {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationProtectionClusterPropertiesDeserializer(item["properties"]),
  };
}

/** Replication protection cluster custom data details. */
export interface ReplicationProtectionClusterProperties {
  /** The type of protection cluster type. */
  protectionClusterType?: string;
  /** The friendly name of the primary fabric. */
  primaryFabricFriendlyName?: string;
  /** The fabric provider of the primary fabric. */
  primaryFabricProvider?: string;
  /** The friendly name of recovery fabric. */
  recoveryFabricFriendlyName?: string;
  /** The Arm Id of recovery fabric. */
  recoveryFabricId?: string;
  /** The name of primary protection container friendly name. */
  primaryProtectionContainerFriendlyName?: string;
  /** The name of recovery container friendly name. */
  recoveryProtectionContainerFriendlyName?: string;
  /** The protection status. */
  protectionState?: string;
  /** The protection state description. */
  protectionStateDescription?: string;
  /** The Current active location of the Protection cluster. */
  activeLocation?: string;
  /** The Test failover state. */
  testFailoverState?: string;
  /** The Test failover state description. */
  testFailoverStateDescription?: string;
  /** The allowed operations on the Replication protection cluster. */
  allowedOperations?: string[];
  /** The consolidated protection health for the VM taking any issues with SRS as well as all the replication units associated with the VM's replication group into account. This is a string representation of the ProtectionHealth enumeration. */
  replicationHealth?: string;
  /** List of health errors. */
  healthErrors?: HealthError[];
  /** The last successful failover time. */
  lastSuccessfulFailoverTime?: Date;
  /** The last successful test failover time. */
  lastSuccessfulTestFailoverTime?: Date;
  /** The name of Policy governing this PE. */
  policyFriendlyName?: string;
  /** The current scenario. */
  currentScenario?: CurrentScenarioDetails;
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The Agent cluster Id. */
  agentClusterId?: string;
  /** The cluster FQDN. */
  clusterFqdn?: string;
  /** The List of cluster Node FQDNs. */
  clusterNodeFqdns?: string[];
  /** The List of Protected Item Id's. */
  clusterProtectedItemIds?: string[];
  /** The provisioning state of the cluster. */
  readonly provisioningState?: string;
  /** A value indicating whether all nodes of the cluster are registered or not. */
  areAllClusterNodesRegistered?: boolean;
  /** The registered node details. */
  clusterRegisteredNodes?: RegisteredClusterNodes[];
  /** The Replication cluster provider custom settings. */
  providerSpecificDetails?: ReplicationClusterProviderSpecificSettingsUnion;
  /** The shared disk properties. */
  sharedDiskProperties?: SharedDiskReplicationItemProperties;
  /** The Policy Id. */
  policyId?: string;
}

export function replicationProtectionClusterPropertiesSerializer(
  item: ReplicationProtectionClusterProperties,
): any {
  return {
    protectionClusterType: item["protectionClusterType"],
    primaryFabricFriendlyName: item["primaryFabricFriendlyName"],
    primaryFabricProvider: item["primaryFabricProvider"],
    recoveryFabricFriendlyName: item["recoveryFabricFriendlyName"],
    recoveryFabricId: item["recoveryFabricId"],
    primaryProtectionContainerFriendlyName: item["primaryProtectionContainerFriendlyName"],
    recoveryProtectionContainerFriendlyName: item["recoveryProtectionContainerFriendlyName"],
    protectionState: item["protectionState"],
    protectionStateDescription: item["protectionStateDescription"],
    activeLocation: item["activeLocation"],
    testFailoverState: item["testFailoverState"],
    testFailoverStateDescription: item["testFailoverStateDescription"],
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    replicationHealth: item["replicationHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArraySerializer(item["healthErrors"]),
    lastSuccessfulFailoverTime: !item["lastSuccessfulFailoverTime"]
      ? item["lastSuccessfulFailoverTime"]
      : item["lastSuccessfulFailoverTime"].toISOString(),
    lastSuccessfulTestFailoverTime: !item["lastSuccessfulTestFailoverTime"]
      ? item["lastSuccessfulTestFailoverTime"]
      : item["lastSuccessfulTestFailoverTime"].toISOString(),
    policyFriendlyName: item["policyFriendlyName"],
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsSerializer(item["currentScenario"]),
    recoveryContainerId: item["recoveryContainerId"],
    agentClusterId: item["agentClusterId"],
    clusterFqdn: item["clusterFqdn"],
    clusterNodeFqdns: !item["clusterNodeFqdns"]
      ? item["clusterNodeFqdns"]
      : item["clusterNodeFqdns"].map((p: any) => {
          return p;
        }),
    clusterProtectedItemIds: !item["clusterProtectedItemIds"]
      ? item["clusterProtectedItemIds"]
      : item["clusterProtectedItemIds"].map((p: any) => {
          return p;
        }),
    areAllClusterNodesRegistered: item["areAllClusterNodesRegistered"],
    clusterRegisteredNodes: !item["clusterRegisteredNodes"]
      ? item["clusterRegisteredNodes"]
      : registeredClusterNodesArraySerializer(item["clusterRegisteredNodes"]),
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : replicationClusterProviderSpecificSettingsUnionSerializer(item["providerSpecificDetails"]),
    sharedDiskProperties: !item["sharedDiskProperties"]
      ? item["sharedDiskProperties"]
      : sharedDiskReplicationItemPropertiesSerializer(item["sharedDiskProperties"]),
    policyId: item["policyId"],
  };
}

export function replicationProtectionClusterPropertiesDeserializer(
  item: any,
): ReplicationProtectionClusterProperties {
  return {
    protectionClusterType: item["protectionClusterType"],
    primaryFabricFriendlyName: item["primaryFabricFriendlyName"],
    primaryFabricProvider: item["primaryFabricProvider"],
    recoveryFabricFriendlyName: item["recoveryFabricFriendlyName"],
    recoveryFabricId: item["recoveryFabricId"],
    primaryProtectionContainerFriendlyName: item["primaryProtectionContainerFriendlyName"],
    recoveryProtectionContainerFriendlyName: item["recoveryProtectionContainerFriendlyName"],
    protectionState: item["protectionState"],
    protectionStateDescription: item["protectionStateDescription"],
    activeLocation: item["activeLocation"],
    testFailoverState: item["testFailoverState"],
    testFailoverStateDescription: item["testFailoverStateDescription"],
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    replicationHealth: item["replicationHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    lastSuccessfulFailoverTime: !item["lastSuccessfulFailoverTime"]
      ? item["lastSuccessfulFailoverTime"]
      : new Date(item["lastSuccessfulFailoverTime"]),
    lastSuccessfulTestFailoverTime: !item["lastSuccessfulTestFailoverTime"]
      ? item["lastSuccessfulTestFailoverTime"]
      : new Date(item["lastSuccessfulTestFailoverTime"]),
    policyFriendlyName: item["policyFriendlyName"],
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsDeserializer(item["currentScenario"]),
    recoveryContainerId: item["recoveryContainerId"],
    agentClusterId: item["agentClusterId"],
    clusterFqdn: item["clusterFqdn"],
    clusterNodeFqdns: !item["clusterNodeFqdns"]
      ? item["clusterNodeFqdns"]
      : item["clusterNodeFqdns"].map((p: any) => {
          return p;
        }),
    clusterProtectedItemIds: !item["clusterProtectedItemIds"]
      ? item["clusterProtectedItemIds"]
      : item["clusterProtectedItemIds"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    areAllClusterNodesRegistered: item["areAllClusterNodesRegistered"],
    clusterRegisteredNodes: !item["clusterRegisteredNodes"]
      ? item["clusterRegisteredNodes"]
      : registeredClusterNodesArrayDeserializer(item["clusterRegisteredNodes"]),
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : replicationClusterProviderSpecificSettingsUnionDeserializer(
          item["providerSpecificDetails"],
        ),
    sharedDiskProperties: !item["sharedDiskProperties"]
      ? item["sharedDiskProperties"]
      : sharedDiskReplicationItemPropertiesDeserializer(item["sharedDiskProperties"]),
    policyId: item["policyId"],
  };
}

export function registeredClusterNodesArraySerializer(
  result: Array<RegisteredClusterNodes>,
): any[] {
  return result.map((item) => {
    return registeredClusterNodesSerializer(item);
  });
}

export function registeredClusterNodesArrayDeserializer(
  result: Array<RegisteredClusterNodes>,
): any[] {
  return result.map((item) => {
    return registeredClusterNodesDeserializer(item);
  });
}

/** Extended location of the resource. */
export interface RegisteredClusterNodes {
  /** The cluster node name. */
  clusterNodeFqdn?: string;
  /** The machine ID. */
  machineId?: string;
  /** The BIOS ID. */
  biosId?: string;
  /** A value indicating whether this represents virtual entity hosting all the shared disks. */
  isSharedDiskVirtualNode?: boolean;
}

export function registeredClusterNodesSerializer(item: RegisteredClusterNodes): any {
  return {
    clusterNodeFqdn: item["clusterNodeFqdn"],
    machineId: item["machineId"],
    biosId: item["biosId"],
    isSharedDiskVirtualNode: item["isSharedDiskVirtualNode"],
  };
}

export function registeredClusterNodesDeserializer(item: any): RegisteredClusterNodes {
  return {
    clusterNodeFqdn: item["clusterNodeFqdn"],
    machineId: item["machineId"],
    biosId: item["biosId"],
    isSharedDiskVirtualNode: item["isSharedDiskVirtualNode"],
  };
}

/** Replication cluster provider specific settings. */
export interface ReplicationClusterProviderSpecificSettings {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function replicationClusterProviderSpecificSettingsSerializer(
  item: ReplicationClusterProviderSpecificSettings,
): any {
  return { instanceType: item["instanceType"] };
}

export function replicationClusterProviderSpecificSettingsDeserializer(
  item: any,
): ReplicationClusterProviderSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ReplicationClusterProviderSpecificSettingsUnion */
export type ReplicationClusterProviderSpecificSettingsUnion =
  | A2AReplicationProtectionClusterDetails
  | ReplicationClusterProviderSpecificSettings;

export function replicationClusterProviderSpecificSettingsUnionSerializer(
  item: ReplicationClusterProviderSpecificSettingsUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AReplicationProtectionClusterDetailsSerializer(
        item as A2AReplicationProtectionClusterDetails,
      );

    default:
      return replicationClusterProviderSpecificSettingsSerializer(item);
  }
}

export function replicationClusterProviderSpecificSettingsUnionDeserializer(
  item: any,
): ReplicationClusterProviderSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2AReplicationProtectionClusterDetailsDeserializer(
        item as A2AReplicationProtectionClusterDetails,
      );

    default:
      return replicationClusterProviderSpecificSettingsDeserializer(item);
  }
}

/** A2A provider specific settings. */
export interface A2AReplicationProtectionClusterDetails extends ReplicationClusterProviderSpecificSettings {
  /** The multi vm group Id. */
  multiVmGroupId?: string;
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** Whether Multi VM group is auto created or specified by user. */
  multiVmGroupCreateOption?: MultiVmGroupCreateOption;
  /** Primary fabric location. */
  primaryFabricLocation?: string;
  /** The recovery fabric location. */
  recoveryFabricLocation?: string;
  /** The recovery point Id to which the cluster was failed over. */
  failoverRecoveryPointId?: string;
  /** The cluster management Id. */
  clusterManagementId?: string;
  /** The last RPO value in seconds. */
  rpoInSeconds?: number;
  /** The time (in UTC) when the last RPO value was calculated by Protection Service. */
  lastRpoCalculatedTime?: Date;
  /** The initial primary availability zone. */
  initialPrimaryZone?: string;
  /** The initial primary fabric location. */
  initialPrimaryFabricLocation?: string;
  /** The initial recovery availability zone. */
  initialRecoveryZone?: string;
  /** The initial recovery fabric location. */
  initialRecoveryFabricLocation?: string;
  /** The initial primary extended location. */
  initialPrimaryExtendedLocation?: ExtendedLocation;
  /** The initial recovery extended location. */
  initialRecoveryExtendedLocation?: ExtendedLocation;
  /** The primary availability zone. */
  primaryAvailabilityZone?: string;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The primary Extended Location. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery Extended Location. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** An id that survives actions like switch protection which change the backing PE/CPE objects internally.The lifecycle id gets carried forward to have a link/continuity in being able to have an Id that denotes the "same" protected cluster even though other internal Ids/ARM Id might be changing. */
  lifecycleId?: string;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2AReplicationProtectionClusterDetailsSerializer(
  item: A2AReplicationProtectionClusterDetails,
): any {
  return {
    instanceType: item["instanceType"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupCreateOption: item["multiVmGroupCreateOption"],
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    clusterManagementId: item["clusterManagementId"],
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : item["lastRpoCalculatedTime"].toISOString(),
    initialPrimaryZone: item["initialPrimaryZone"],
    initialPrimaryFabricLocation: item["initialPrimaryFabricLocation"],
    initialRecoveryZone: item["initialRecoveryZone"],
    initialRecoveryFabricLocation: item["initialRecoveryFabricLocation"],
    initialPrimaryExtendedLocation: !item["initialPrimaryExtendedLocation"]
      ? item["initialPrimaryExtendedLocation"]
      : extendedLocationSerializer(item["initialPrimaryExtendedLocation"]),
    initialRecoveryExtendedLocation: !item["initialRecoveryExtendedLocation"]
      ? item["initialRecoveryExtendedLocation"]
      : extendedLocationSerializer(item["initialRecoveryExtendedLocation"]),
    primaryAvailabilityZone: item["primaryAvailabilityZone"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationSerializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationSerializer(item["recoveryExtendedLocation"]),
    lifecycleId: item["lifecycleId"],
  };
}

export function a2AReplicationProtectionClusterDetailsDeserializer(
  item: any,
): A2AReplicationProtectionClusterDetails {
  return {
    instanceType: item["instanceType"],
    multiVmGroupId: item["multiVmGroupId"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupCreateOption: item["multiVmGroupCreateOption"],
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    clusterManagementId: item["clusterManagementId"],
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    initialPrimaryZone: item["initialPrimaryZone"],
    initialPrimaryFabricLocation: item["initialPrimaryFabricLocation"],
    initialRecoveryZone: item["initialRecoveryZone"],
    initialRecoveryFabricLocation: item["initialRecoveryFabricLocation"],
    initialPrimaryExtendedLocation: !item["initialPrimaryExtendedLocation"]
      ? item["initialPrimaryExtendedLocation"]
      : extendedLocationDeserializer(item["initialPrimaryExtendedLocation"]),
    initialRecoveryExtendedLocation: !item["initialRecoveryExtendedLocation"]
      ? item["initialRecoveryExtendedLocation"]
      : extendedLocationDeserializer(item["initialRecoveryExtendedLocation"]),
    primaryAvailabilityZone: item["primaryAvailabilityZone"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationDeserializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationDeserializer(item["recoveryExtendedLocation"]),
    lifecycleId: item["lifecycleId"],
  };
}

/** Shared Disk Replication item custom data details. */
export interface SharedDiskReplicationItemProperties {
  /** The protection state of shared disk. */
  protectionState?: string;
  /** The tfo state of shared disk. */
  testFailoverState?: string;
  /** The Current active location of the PE. */
  activeLocation?: string;
  /** The allowed operations on the Replication protected item. */
  allowedOperations?: string[];
  /** The consolidated protection health for the VM taking any issues with SRS as well as all the replication units associated with the VM's replication group into account. This is a string representation of the ProtectionHealth enumeration. */
  replicationHealth?: string;
  /** List of health errors. */
  healthErrors?: HealthError[];
  /** The current scenario. */
  currentScenario?: CurrentScenarioDetails;
  /** The Replication provider custom settings. */
  sharedDiskProviderSpecificDetails?: SharedDiskReplicationProviderSpecificSettingsUnion;
}

export function sharedDiskReplicationItemPropertiesSerializer(
  item: SharedDiskReplicationItemProperties,
): any {
  return {
    protectionState: item["protectionState"],
    testFailoverState: item["testFailoverState"],
    activeLocation: item["activeLocation"],
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    replicationHealth: item["replicationHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArraySerializer(item["healthErrors"]),
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsSerializer(item["currentScenario"]),
    sharedDiskProviderSpecificDetails: !item["sharedDiskProviderSpecificDetails"]
      ? item["sharedDiskProviderSpecificDetails"]
      : sharedDiskReplicationProviderSpecificSettingsUnionSerializer(
          item["sharedDiskProviderSpecificDetails"],
        ),
  };
}

export function sharedDiskReplicationItemPropertiesDeserializer(
  item: any,
): SharedDiskReplicationItemProperties {
  return {
    protectionState: item["protectionState"],
    testFailoverState: item["testFailoverState"],
    activeLocation: item["activeLocation"],
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    replicationHealth: item["replicationHealth"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsDeserializer(item["currentScenario"]),
    sharedDiskProviderSpecificDetails: !item["sharedDiskProviderSpecificDetails"]
      ? item["sharedDiskProviderSpecificDetails"]
      : sharedDiskReplicationProviderSpecificSettingsUnionDeserializer(
          item["sharedDiskProviderSpecificDetails"],
        ),
  };
}

/** Replication provider specific settings. */
export interface SharedDiskReplicationProviderSpecificSettings {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function sharedDiskReplicationProviderSpecificSettingsSerializer(
  item: SharedDiskReplicationProviderSpecificSettings,
): any {
  return { instanceType: item["instanceType"] };
}

export function sharedDiskReplicationProviderSpecificSettingsDeserializer(
  item: any,
): SharedDiskReplicationProviderSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for SharedDiskReplicationProviderSpecificSettingsUnion */
export type SharedDiskReplicationProviderSpecificSettingsUnion =
  | A2ASharedDiskReplicationDetails
  | SharedDiskReplicationProviderSpecificSettings;

export function sharedDiskReplicationProviderSpecificSettingsUnionSerializer(
  item: SharedDiskReplicationProviderSpecificSettingsUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ASharedDiskReplicationDetailsSerializer(item as A2ASharedDiskReplicationDetails);

    default:
      return sharedDiskReplicationProviderSpecificSettingsSerializer(item);
  }
}

export function sharedDiskReplicationProviderSpecificSettingsUnionDeserializer(
  item: any,
): SharedDiskReplicationProviderSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2ASharedDiskReplicationDetailsDeserializer(item as A2ASharedDiskReplicationDetails);

    default:
      return sharedDiskReplicationProviderSpecificSettingsDeserializer(item);
  }
}

/** A2A provider specific settings. */
export interface A2ASharedDiskReplicationDetails extends SharedDiskReplicationProviderSpecificSettings {
  /** The management Id. */
  managementId?: string;
  /** The list of unprotected disks. */
  unprotectedDisks?: A2AUnprotectedDiskDetails[];
  /** The list of protected managed disks. */
  protectedManagedDisks?: A2AProtectedManagedDiskDetails[];
  /** Primary fabric location. */
  primaryFabricLocation?: string;
  /** The recovery fabric location. */
  recoveryFabricLocation?: string;
  /** The recovery point id to which the Virtual node was failed over. */
  failoverRecoveryPointId?: string;
  /** The percentage of the monitoring job. The type of the monitoring job is defined by MonitoringJobType property. */
  monitoringPercentageCompletion?: number;
  /** The type of the monitoring job. The progress is contained in MonitoringPercentageCompletion property. */
  monitoringJobType?: string;
  /** The last RPO value in seconds. */
  rpoInSeconds?: number;
  /** The time (in UTC) when the last RPO value was calculated by Protection Service. */
  lastRpoCalculatedTime?: Date;
  /** The IR Errors. */
  sharedDiskIRErrors?: A2ASharedDiskIRErrorDetails[];
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2ASharedDiskReplicationDetailsSerializer(
  item: A2ASharedDiskReplicationDetails,
): any {
  return {
    instanceType: item["instanceType"],
    managementId: item["managementId"],
    unprotectedDisks: !item["unprotectedDisks"]
      ? item["unprotectedDisks"]
      : a2AUnprotectedDiskDetailsArraySerializer(item["unprotectedDisks"]),
    protectedManagedDisks: !item["protectedManagedDisks"]
      ? item["protectedManagedDisks"]
      : a2AProtectedManagedDiskDetailsArraySerializer(item["protectedManagedDisks"]),
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : item["lastRpoCalculatedTime"].toISOString(),
    sharedDiskIRErrors: !item["sharedDiskIRErrors"]
      ? item["sharedDiskIRErrors"]
      : a2ASharedDiskIRErrorDetailsArraySerializer(item["sharedDiskIRErrors"]),
  };
}

export function a2ASharedDiskReplicationDetailsDeserializer(
  item: any,
): A2ASharedDiskReplicationDetails {
  return {
    instanceType: item["instanceType"],
    managementId: item["managementId"],
    unprotectedDisks: !item["unprotectedDisks"]
      ? item["unprotectedDisks"]
      : a2AUnprotectedDiskDetailsArrayDeserializer(item["unprotectedDisks"]),
    protectedManagedDisks: !item["protectedManagedDisks"]
      ? item["protectedManagedDisks"]
      : a2AProtectedManagedDiskDetailsArrayDeserializer(item["protectedManagedDisks"]),
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
    failoverRecoveryPointId: item["failoverRecoveryPointId"],
    monitoringPercentageCompletion: item["monitoringPercentageCompletion"],
    monitoringJobType: item["monitoringJobType"],
    rpoInSeconds: item["rpoInSeconds"],
    lastRpoCalculatedTime: !item["lastRpoCalculatedTime"]
      ? item["lastRpoCalculatedTime"]
      : new Date(item["lastRpoCalculatedTime"]),
    sharedDiskIRErrors: !item["sharedDiskIRErrors"]
      ? item["sharedDiskIRErrors"]
      : a2ASharedDiskIRErrorDetailsArrayDeserializer(item["sharedDiskIRErrors"]),
  };
}

export function a2ASharedDiskIRErrorDetailsArraySerializer(
  result: Array<A2ASharedDiskIRErrorDetails>,
): any[] {
  return result.map((item) => {
    return a2ASharedDiskIRErrorDetailsSerializer(item);
  });
}

export function a2ASharedDiskIRErrorDetailsArrayDeserializer(
  result: Array<A2ASharedDiskIRErrorDetails>,
): any[] {
  return result.map((item) => {
    return a2ASharedDiskIRErrorDetailsDeserializer(item);
  });
}

/** Extended location of the resource. */
export interface A2ASharedDiskIRErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error code enum. */
  readonly errorCodeEnum?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
}

export function a2ASharedDiskIRErrorDetailsSerializer(item: A2ASharedDiskIRErrorDetails): any {
  return item;
}

export function a2ASharedDiskIRErrorDetailsDeserializer(item: any): A2ASharedDiskIRErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorCodeEnum: item["errorCodeEnum"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
  };
}

/** Input definition for apply cluster recovery point. */
export interface ApplyClusterRecoveryPointInput {
  /** The properties to apply cluster recovery point input. */
  properties: ApplyClusterRecoveryPointInputProperties;
}

export function applyClusterRecoveryPointInputSerializer(
  item: ApplyClusterRecoveryPointInput,
): any {
  return { properties: applyClusterRecoveryPointInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for apply cluster recovery point properties. */
export interface ApplyClusterRecoveryPointInputProperties {
  /** The cluster recovery point id to be passed to failover to a particular recovery point. */
  clusterRecoveryPointId?: string;
  /** The list of individual node recovery points. */
  individualNodeRecoveryPoints?: string[];
  /** The provider specific input for applying cluster recovery point. */
  providerSpecificDetails: ApplyClusterRecoveryPointProviderSpecificInputUnion;
}

export function applyClusterRecoveryPointInputPropertiesSerializer(
  item: ApplyClusterRecoveryPointInputProperties,
): any {
  return {
    clusterRecoveryPointId: item["clusterRecoveryPointId"],
    individualNodeRecoveryPoints: !item["individualNodeRecoveryPoints"]
      ? item["individualNodeRecoveryPoints"]
      : item["individualNodeRecoveryPoints"].map((p: any) => {
          return p;
        }),
    providerSpecificDetails: applyClusterRecoveryPointProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Provider specific input for apply cluster recovery point. */
export interface ApplyClusterRecoveryPointProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function applyClusterRecoveryPointProviderSpecificInputSerializer(
  item: ApplyClusterRecoveryPointProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ApplyClusterRecoveryPointProviderSpecificInputUnion */
export type ApplyClusterRecoveryPointProviderSpecificInputUnion =
  | A2AApplyClusterRecoveryPointInput
  | ApplyClusterRecoveryPointProviderSpecificInput;

export function applyClusterRecoveryPointProviderSpecificInputUnionSerializer(
  item: ApplyClusterRecoveryPointProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AApplyClusterRecoveryPointInputSerializer(item as A2AApplyClusterRecoveryPointInput);

    default:
      return applyClusterRecoveryPointProviderSpecificInputSerializer(item);
  }
}

/** A2A provider specific input for apply cluster recovery point. */
export interface A2AApplyClusterRecoveryPointInput extends ApplyClusterRecoveryPointProviderSpecificInput {
  /** The class type. */
  instanceType: "A2A";
}

export function a2AApplyClusterRecoveryPointInputSerializer(
  item: A2AApplyClusterRecoveryPointInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Input definition for test cluster failover. */
export interface ClusterTestFailoverInput {
  /** Test failover input properties. */
  properties: ClusterTestFailoverInputProperties;
}

export function clusterTestFailoverInputSerializer(item: ClusterTestFailoverInput): any {
  return { properties: clusterTestFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for test failover input properties. */
export interface ClusterTestFailoverInputProperties {
  /** Failover direction. */
  failoverDirection?: FailoverDirection;
  /** Network type to be used for test failover. */
  networkType?: string;
  /** The id of the network to be used for test failover. */
  networkId?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: ClusterTestFailoverProviderSpecificInputUnion;
}

export function clusterTestFailoverInputPropertiesSerializer(
  item: ClusterTestFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    networkType: item["networkType"],
    networkId: item["networkId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : clusterTestFailoverProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Failover direction. */
export enum KnownFailoverDirection {
  /** PrimaryToRecovery */
  PrimaryToRecovery = "PrimaryToRecovery",
  /** RecoveryToPrimary */
  RecoveryToPrimary = "RecoveryToPrimary",
}

/**
 * Failover direction. \
 * {@link KnownFailoverDirection} can be used interchangeably with FailoverDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryToRecovery**: PrimaryToRecovery \
 * **RecoveryToPrimary**: RecoveryToPrimary
 */
export type FailoverDirection = string;

/** Provider specific test cluster failover input. */
export interface ClusterTestFailoverProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function clusterTestFailoverProviderSpecificInputSerializer(
  item: ClusterTestFailoverProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ClusterTestFailoverProviderSpecificInputUnion */
export type ClusterTestFailoverProviderSpecificInputUnion =
  | A2AClusterTestFailoverInput
  | ClusterTestFailoverProviderSpecificInput;

export function clusterTestFailoverProviderSpecificInputUnionSerializer(
  item: ClusterTestFailoverProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AClusterTestFailoverInputSerializer(item as A2AClusterTestFailoverInput);

    default:
      return clusterTestFailoverProviderSpecificInputSerializer(item);
  }
}

/** A2A provider specific input for test cluster failover. */
export interface A2AClusterTestFailoverInput extends ClusterTestFailoverProviderSpecificInput {
  /** The cluster recovery point id to be passed to failover to a particular recovery point. */
  clusterRecoveryPointId?: string;
  /** The list of individual node recovery points. */
  individualNodeRecoveryPoints?: string[];
  /** The class type. */
  instanceType: "A2A";
}

export function a2AClusterTestFailoverInputSerializer(item: A2AClusterTestFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    clusterRecoveryPointId: item["clusterRecoveryPointId"],
    individualNodeRecoveryPoints: !item["individualNodeRecoveryPoints"]
      ? item["individualNodeRecoveryPoints"]
      : item["individualNodeRecoveryPoints"].map((p: any) => {
          return p;
        }),
  };
}

/** Input definition for test failover cleanup for cluster. */
export interface ClusterTestFailoverCleanupInput {
  /** Test failover cleanup input properties. */
  properties: ClusterTestFailoverCleanupInputProperties;
}

export function clusterTestFailoverCleanupInputSerializer(
  item: ClusterTestFailoverCleanupInput,
): any {
  return { properties: clusterTestFailoverCleanupInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for test failover cleanup input properties. */
export interface ClusterTestFailoverCleanupInputProperties {
  /** Test failover cleanup comments. */
  comments?: string;
}

export function clusterTestFailoverCleanupInputPropertiesSerializer(
  item: ClusterTestFailoverCleanupInputProperties,
): any {
  return { comments: item["comments"] };
}

/** Input definition for unplanned cluster failover. */
export interface ClusterUnplannedFailoverInput {
  /** Unplanned failover input properties. */
  properties: ClusterUnplannedFailoverInputProperties;
}

export function clusterUnplannedFailoverInputSerializer(item: ClusterUnplannedFailoverInput): any {
  return { properties: clusterUnplannedFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Input definition for unplanned failover input properties. */
export interface ClusterUnplannedFailoverInputProperties {
  /** Failover direction. */
  failoverDirection?: string;
  /** Source site operations status. */
  sourceSiteOperations?: string;
  /** Provider specific settings. */
  providerSpecificDetails?: ClusterUnplannedFailoverProviderSpecificInputUnion;
}

export function clusterUnplannedFailoverInputPropertiesSerializer(
  item: ClusterUnplannedFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    sourceSiteOperations: item["sourceSiteOperations"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : clusterUnplannedFailoverProviderSpecificInputUnionSerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Provider specific unplanned cluster failover input. */
export interface ClusterUnplannedFailoverProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function clusterUnplannedFailoverProviderSpecificInputSerializer(
  item: ClusterUnplannedFailoverProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ClusterUnplannedFailoverProviderSpecificInputUnion */
export type ClusterUnplannedFailoverProviderSpecificInputUnion =
  | A2AClusterUnplannedFailoverInput
  | ClusterUnplannedFailoverProviderSpecificInput;

export function clusterUnplannedFailoverProviderSpecificInputUnionSerializer(
  item: ClusterUnplannedFailoverProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AClusterUnplannedFailoverInputSerializer(item as A2AClusterUnplannedFailoverInput);

    default:
      return clusterUnplannedFailoverProviderSpecificInputSerializer(item);
  }
}

/** A2A provider specific input for unplanned cluster failover. */
export interface A2AClusterUnplannedFailoverInput extends ClusterUnplannedFailoverProviderSpecificInput {
  /** The cluster recovery point id to be passed to failover to a particular recovery point. */
  clusterRecoveryPointId?: string;
  /** The list of individual node recovery points. */
  individualNodeRecoveryPoints?: string[];
  /** The class type. */
  instanceType: "A2A";
}

export function a2AClusterUnplannedFailoverInputSerializer(
  item: A2AClusterUnplannedFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    clusterRecoveryPointId: item["clusterRecoveryPointId"],
    individualNodeRecoveryPoints: !item["individualNodeRecoveryPoints"]
      ? item["individualNodeRecoveryPoints"]
      : item["individualNodeRecoveryPoints"].map((p: any) => {
          return p;
        }),
  };
}

/** Replication protected item collection. */
export interface _ReplicationProtectionClusterCollection {
  /** The ReplicationProtectionCluster items on this page */
  value: ReplicationProtectionCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicationProtectionClusterCollectionDeserializer(
  item: any,
): _ReplicationProtectionClusterCollection {
  return {
    value: replicationProtectionClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationProtectionClusterArraySerializer(
  result: Array<ReplicationProtectionCluster>,
): any[] {
  return result.map((item) => {
    return replicationProtectionClusterSerializer(item);
  });
}

export function replicationProtectionClusterArrayDeserializer(
  result: Array<ReplicationProtectionCluster>,
): any[] {
  return result.map((item) => {
    return replicationProtectionClusterDeserializer(item);
  });
}

/** Collection of cluster recovery point details. */
export interface _ClusterRecoveryPointCollection {
  /** The ClusterRecoveryPoint items on this page */
  value: ClusterRecoveryPoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterRecoveryPointCollectionDeserializer(
  item: any,
): _ClusterRecoveryPointCollection {
  return {
    value: clusterRecoveryPointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterRecoveryPointArrayDeserializer(result: Array<ClusterRecoveryPoint>): any[] {
  return result.map((item) => {
    return clusterRecoveryPointDeserializer(item);
  });
}

/** Recovery point. */
export interface ClusterRecoveryPoint {
  /** The recovery point Id. */
  id?: string;
  /** The recovery point name. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** The recovery point properties. */
  properties?: ClusterRecoveryPointProperties;
}

export function clusterRecoveryPointDeserializer(item: any): ClusterRecoveryPoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterRecoveryPointPropertiesDeserializer(item["properties"]),
  };
}

/** Cluster recovery point properties. */
export interface ClusterRecoveryPointProperties {
  /** The recovery point time. */
  recoveryPointTime?: Date;
  /** The recovery point type. */
  recoveryPointType?: ClusterRecoveryPointType;
  /** The provider specific details for the recovery point. */
  providerSpecificDetails?: ClusterProviderSpecificRecoveryPointDetailsUnion;
}

export function clusterRecoveryPointPropertiesDeserializer(
  item: any,
): ClusterRecoveryPointProperties {
  return {
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
    recoveryPointType: item["recoveryPointType"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : clusterProviderSpecificRecoveryPointDetailsUnionDeserializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** The recovery point type. */
export enum KnownClusterRecoveryPointType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** ApplicationConsistent */
  ApplicationConsistent = "ApplicationConsistent",
  /** CrashConsistent */
  CrashConsistent = "CrashConsistent",
}

/**
 * The recovery point type. \
 * {@link KnownClusterRecoveryPointType} can be used interchangeably with ClusterRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **ApplicationConsistent**: ApplicationConsistent \
 * **CrashConsistent**: CrashConsistent
 */
export type ClusterRecoveryPointType = string;

/** Replication provider specific cluster recovery point details. */
export interface ClusterProviderSpecificRecoveryPointDetails {
  /** Gets the provider type. */
  /** The discriminator possible values: A2A */
  readonly instanceType: string;
}

export function clusterProviderSpecificRecoveryPointDetailsDeserializer(
  item: any,
): ClusterProviderSpecificRecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ClusterProviderSpecificRecoveryPointDetailsUnion */
export type ClusterProviderSpecificRecoveryPointDetailsUnion =
  | A2AClusterRecoveryPointDetails
  | ClusterProviderSpecificRecoveryPointDetails;

export function clusterProviderSpecificRecoveryPointDetailsUnionDeserializer(
  item: any,
): ClusterProviderSpecificRecoveryPointDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2AClusterRecoveryPointDetailsDeserializer(item as A2AClusterRecoveryPointDetails);

    default:
      return clusterProviderSpecificRecoveryPointDetailsDeserializer(item);
  }
}

/** A2A provider specific cluster recovery point details. */
export interface A2AClusterRecoveryPointDetails extends ClusterProviderSpecificRecoveryPointDetails {
  /** A value indicating whether the recovery point is multi VM consistent. */
  recoveryPointSyncType?: RecoveryPointSyncType;
  /** The list of nodes representing the cluster. */
  nodes?: string[];
  /** Gets the provider type. */
  instanceType: "A2A";
}

export function a2AClusterRecoveryPointDetailsDeserializer(
  item: any,
): A2AClusterRecoveryPointDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointSyncType: item["recoveryPointSyncType"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : item["nodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Replication protection intent. */
export interface ReplicationProtectionIntent extends ProxyResource {
  /** The custom data. */
  properties?: ReplicationProtectionIntentProperties;
  /** Resource Location */
  location?: string;
}

export function replicationProtectionIntentDeserializer(item: any): ReplicationProtectionIntent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationProtectionIntentPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Replication protection intent custom data details. */
export interface ReplicationProtectionIntentProperties {
  /** The name. */
  friendlyName?: string;
  /** The job Id. */
  readonly jobId?: string;
  /** The job state. */
  readonly jobState?: string;
  /** A value indicating whether the intent object is active. */
  readonly isActive?: boolean;
  /** The creation time in UTC. */
  readonly creationTimeUTC?: string;
  /** The Replication provider custom settings. */
  providerSpecificDetails?: ReplicationProtectionIntentProviderSpecificSettingsUnion;
}

export function replicationProtectionIntentPropertiesDeserializer(
  item: any,
): ReplicationProtectionIntentProperties {
  return {
    friendlyName: item["friendlyName"],
    jobId: item["jobId"],
    jobState: item["jobState"],
    isActive: item["isActive"],
    creationTimeUTC: item["creationTimeUTC"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : replicationProtectionIntentProviderSpecificSettingsUnionDeserializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Replication provider specific settings. */
export interface ReplicationProtectionIntentProviderSpecificSettings {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function replicationProtectionIntentProviderSpecificSettingsDeserializer(
  item: any,
): ReplicationProtectionIntentProviderSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ReplicationProtectionIntentProviderSpecificSettingsUnion */
export type ReplicationProtectionIntentProviderSpecificSettingsUnion =
  | A2AReplicationIntentDetails
  | ReplicationProtectionIntentProviderSpecificSettings;

export function replicationProtectionIntentProviderSpecificSettingsUnionDeserializer(
  item: any,
): ReplicationProtectionIntentProviderSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2AReplicationIntentDetailsDeserializer(item as A2AReplicationIntentDetails);

    default:
      return replicationProtectionIntentProviderSpecificSettingsDeserializer(item);
  }
}

/** A2A provider specific settings. */
export interface A2AReplicationIntentDetails extends ReplicationProtectionIntentProviderSpecificSettings {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId?: string;
  /** The primary location for the virtual machine. */
  primaryLocation?: string;
  /** The recovery location for the virtual machine. */
  recoveryLocation?: string;
  /** The recovery subscription Id of the virtual machine. */
  recoverySubscriptionId?: string;
  /** The list of vm disk details. */
  vmDisks?: A2AProtectionIntentDiskInputDetails[];
  /** The list of vm managed disk details. */
  vmManagedDisks?: A2AProtectionIntentManagedDiskInputDetails[];
  /** The recovery resource group id. */
  recoveryResourceGroupId?: string;
  /** The protection profile custom details. */
  protectionProfile?: ProtectionProfileCustomDetailsUnion;
  /** The primary staging storage account details. */
  primaryStagingStorageAccount?: StorageAccountCustomDetailsUnion;
  /** The recovery availability set details. */
  recoveryAvailabilitySet?: RecoveryAvailabilitySetCustomDetailsUnion;
  /** The recovery virtual network details. */
  recoveryVirtualNetwork?: RecoveryVirtualNetworkCustomDetailsUnion;
  /** The recovery proximity placement group custom details. */
  recoveryProximityPlacementGroup?: RecoveryProximityPlacementGroupCustomDetailsUnion;
  /** A value indicating whether the auto protection is enabled. */
  autoProtectionOfDataDisk?: AutoProtectionOfDataDisk;
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** The multi vm group id. */
  multiVmGroupId?: string;
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccount?: StorageAccountCustomDetailsUnion;
  /** The recovery disk encryption information (for two pass flows). */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The recovery availability type of the virtual machine. */
  recoveryAvailabilityType: string;
  /** A value indicating whether the auto update is enabled. */
  agentAutoUpdateStatus?: AgentAutoUpdateStatus;
  /** The automation account arm id. */
  automationAccountArmId?: string;
  /** A value indicating the type authentication to use for automation Account. */
  automationAccountAuthenticationType?: AutomationAccountAuthenticationType;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2AReplicationIntentDetailsDeserializer(item: any): A2AReplicationIntentDetails {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    primaryLocation: item["primaryLocation"],
    recoveryLocation: item["recoveryLocation"],
    recoverySubscriptionId: item["recoverySubscriptionId"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AProtectionIntentDiskInputDetailsArrayDeserializer(item["vmDisks"]),
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AProtectionIntentManagedDiskInputDetailsArrayDeserializer(item["vmManagedDisks"]),
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    protectionProfile: !item["protectionProfile"]
      ? item["protectionProfile"]
      : protectionProfileCustomDetailsUnionDeserializer(item["protectionProfile"]),
    primaryStagingStorageAccount: !item["primaryStagingStorageAccount"]
      ? item["primaryStagingStorageAccount"]
      : storageAccountCustomDetailsUnionDeserializer(item["primaryStagingStorageAccount"]),
    recoveryAvailabilitySet: !item["recoveryAvailabilitySet"]
      ? item["recoveryAvailabilitySet"]
      : recoveryAvailabilitySetCustomDetailsUnionDeserializer(item["recoveryAvailabilitySet"]),
    recoveryVirtualNetwork: !item["recoveryVirtualNetwork"]
      ? item["recoveryVirtualNetwork"]
      : recoveryVirtualNetworkCustomDetailsUnionDeserializer(item["recoveryVirtualNetwork"]),
    recoveryProximityPlacementGroup: !item["recoveryProximityPlacementGroup"]
      ? item["recoveryProximityPlacementGroup"]
      : recoveryProximityPlacementGroupCustomDetailsUnionDeserializer(
          item["recoveryProximityPlacementGroup"],
        ),
    autoProtectionOfDataDisk: item["autoProtectionOfDataDisk"],
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupId: item["multiVmGroupId"],
    recoveryBootDiagStorageAccount: !item["recoveryBootDiagStorageAccount"]
      ? item["recoveryBootDiagStorageAccount"]
      : storageAccountCustomDetailsUnionDeserializer(item["recoveryBootDiagStorageAccount"]),
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoDeserializer(item["diskEncryptionInfo"]),
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    recoveryAvailabilityType: item["recoveryAvailabilityType"],
    agentAutoUpdateStatus: item["agentAutoUpdateStatus"],
    automationAccountArmId: item["automationAccountArmId"],
    automationAccountAuthenticationType: item["automationAccountAuthenticationType"],
  };
}

export function a2AProtectionIntentDiskInputDetailsArraySerializer(
  result: Array<A2AProtectionIntentDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectionIntentDiskInputDetailsSerializer(item);
  });
}

export function a2AProtectionIntentDiskInputDetailsArrayDeserializer(
  result: Array<A2AProtectionIntentDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectionIntentDiskInputDetailsDeserializer(item);
  });
}

/** Azure VM unmanaged disk input details. */
export interface A2AProtectionIntentDiskInputDetails {
  /** The disk Uri. */
  diskUri: string;
  /** The recovery VHD storage account input. */
  recoveryAzureStorageAccountCustomInput?: StorageAccountCustomDetailsUnion;
  /** The primary staging storage account input. */
  primaryStagingStorageAccountCustomInput?: StorageAccountCustomDetailsUnion;
}

export function a2AProtectionIntentDiskInputDetailsSerializer(
  item: A2AProtectionIntentDiskInputDetails,
): any {
  return {
    diskUri: item["diskUri"],
    recoveryAzureStorageAccountCustomInput: !item["recoveryAzureStorageAccountCustomInput"]
      ? item["recoveryAzureStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionSerializer(item["recoveryAzureStorageAccountCustomInput"]),
    primaryStagingStorageAccountCustomInput: !item["primaryStagingStorageAccountCustomInput"]
      ? item["primaryStagingStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionSerializer(item["primaryStagingStorageAccountCustomInput"]),
  };
}

export function a2AProtectionIntentDiskInputDetailsDeserializer(
  item: any,
): A2AProtectionIntentDiskInputDetails {
  return {
    diskUri: item["diskUri"],
    recoveryAzureStorageAccountCustomInput: !item["recoveryAzureStorageAccountCustomInput"]
      ? item["recoveryAzureStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionDeserializer(
          item["recoveryAzureStorageAccountCustomInput"],
        ),
    primaryStagingStorageAccountCustomInput: !item["primaryStagingStorageAccountCustomInput"]
      ? item["primaryStagingStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionDeserializer(
          item["primaryStagingStorageAccountCustomInput"],
        ),
  };
}

/** Storage account custom input. */
export interface StorageAccountCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing */
  resourceType: string;
}

export function storageAccountCustomDetailsSerializer(item: StorageAccountCustomDetails): any {
  return { resourceType: item["resourceType"] };
}

export function storageAccountCustomDetailsDeserializer(item: any): StorageAccountCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for StorageAccountCustomDetailsUnion */
export type StorageAccountCustomDetailsUnion = ExistingStorageAccount | StorageAccountCustomDetails;

export function storageAccountCustomDetailsUnionSerializer(
  item: StorageAccountCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingStorageAccountSerializer(item as ExistingStorageAccount);

    default:
      return storageAccountCustomDetailsSerializer(item);
  }
}

export function storageAccountCustomDetailsUnionDeserializer(
  item: any,
): StorageAccountCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingStorageAccountDeserializer(item as ExistingStorageAccount);

    default:
      return storageAccountCustomDetailsDeserializer(item);
  }
}

/** Existing storage account input. */
export interface ExistingStorageAccount extends StorageAccountCustomDetails {
  /** The storage account Arm Id. Throw error, if resource does not exists. */
  azureStorageAccountId: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingStorageAccountSerializer(item: ExistingStorageAccount): any {
  return {
    resourceType: item["resourceType"],
    azureStorageAccountId: item["azureStorageAccountId"],
  };
}

export function existingStorageAccountDeserializer(item: any): ExistingStorageAccount {
  return {
    resourceType: item["resourceType"],
    azureStorageAccountId: item["azureStorageAccountId"],
  };
}

export function a2AProtectionIntentManagedDiskInputDetailsArraySerializer(
  result: Array<A2AProtectionIntentManagedDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectionIntentManagedDiskInputDetailsSerializer(item);
  });
}

export function a2AProtectionIntentManagedDiskInputDetailsArrayDeserializer(
  result: Array<A2AProtectionIntentManagedDiskInputDetails>,
): any[] {
  return result.map((item) => {
    return a2AProtectionIntentManagedDiskInputDetailsDeserializer(item);
  });
}

/** Azure VM managed disk input details. */
export interface A2AProtectionIntentManagedDiskInputDetails {
  /** The disk Id. */
  diskId: string;
  /** The primary staging storage account input. */
  primaryStagingStorageAccountCustomInput?: StorageAccountCustomDetailsUnion;
  /** The recovery resource group input. */
  recoveryResourceGroupCustomInput?: RecoveryResourceGroupCustomDetailsUnion;
  /** The replica disk type. Its an optional value and will be same as source disk type if not user provided. */
  recoveryReplicaDiskAccountType?: string;
  /** The target disk type after failover. Its an optional value and will be same as source disk type if not user provided. */
  recoveryTargetDiskAccountType?: string;
  /** The recovery disk encryption set Id. */
  recoveryDiskEncryptionSetId?: string;
  /** The recovery disk encryption information (for one / single pass flows). */
  diskEncryptionInfo?: DiskEncryptionInfo;
}

export function a2AProtectionIntentManagedDiskInputDetailsSerializer(
  item: A2AProtectionIntentManagedDiskInputDetails,
): any {
  return {
    diskId: item["diskId"],
    primaryStagingStorageAccountCustomInput: !item["primaryStagingStorageAccountCustomInput"]
      ? item["primaryStagingStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionSerializer(item["primaryStagingStorageAccountCustomInput"]),
    recoveryResourceGroupCustomInput: !item["recoveryResourceGroupCustomInput"]
      ? item["recoveryResourceGroupCustomInput"]
      : recoveryResourceGroupCustomDetailsUnionSerializer(item["recoveryResourceGroupCustomInput"]),
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryDiskEncryptionSetId: item["recoveryDiskEncryptionSetId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
  };
}

export function a2AProtectionIntentManagedDiskInputDetailsDeserializer(
  item: any,
): A2AProtectionIntentManagedDiskInputDetails {
  return {
    diskId: item["diskId"],
    primaryStagingStorageAccountCustomInput: !item["primaryStagingStorageAccountCustomInput"]
      ? item["primaryStagingStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionDeserializer(
          item["primaryStagingStorageAccountCustomInput"],
        ),
    recoveryResourceGroupCustomInput: !item["recoveryResourceGroupCustomInput"]
      ? item["recoveryResourceGroupCustomInput"]
      : recoveryResourceGroupCustomDetailsUnionDeserializer(
          item["recoveryResourceGroupCustomInput"],
        ),
    recoveryReplicaDiskAccountType: item["recoveryReplicaDiskAccountType"],
    recoveryTargetDiskAccountType: item["recoveryTargetDiskAccountType"],
    recoveryDiskEncryptionSetId: item["recoveryDiskEncryptionSetId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoDeserializer(item["diskEncryptionInfo"]),
  };
}

/** Recovery Resource Group custom input. */
export interface RecoveryResourceGroupCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing */
  resourceType: string;
}

export function recoveryResourceGroupCustomDetailsSerializer(
  item: RecoveryResourceGroupCustomDetails,
): any {
  return { resourceType: item["resourceType"] };
}

export function recoveryResourceGroupCustomDetailsDeserializer(
  item: any,
): RecoveryResourceGroupCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for RecoveryResourceGroupCustomDetailsUnion */
export type RecoveryResourceGroupCustomDetailsUnion =
  | ExistingRecoveryResourceGroup
  | RecoveryResourceGroupCustomDetails;

export function recoveryResourceGroupCustomDetailsUnionSerializer(
  item: RecoveryResourceGroupCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingRecoveryResourceGroupSerializer(item as ExistingRecoveryResourceGroup);

    default:
      return recoveryResourceGroupCustomDetailsSerializer(item);
  }
}

export function recoveryResourceGroupCustomDetailsUnionDeserializer(
  item: any,
): RecoveryResourceGroupCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingRecoveryResourceGroupDeserializer(item as ExistingRecoveryResourceGroup);

    default:
      return recoveryResourceGroupCustomDetailsDeserializer(item);
  }
}

/** Existing recovery resource group input. */
export interface ExistingRecoveryResourceGroup extends RecoveryResourceGroupCustomDetails {
  /** The recovery resource group Id. Valid for V2 scenarios. */
  recoveryResourceGroupId?: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingRecoveryResourceGroupSerializer(item: ExistingRecoveryResourceGroup): any {
  return {
    resourceType: item["resourceType"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
  };
}

export function existingRecoveryResourceGroupDeserializer(
  item: any,
): ExistingRecoveryResourceGroup {
  return {
    resourceType: item["resourceType"],
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
  };
}

/** Protection Profile custom input. */
export interface ProtectionProfileCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing, New */
  resourceType: string;
}

export function protectionProfileCustomDetailsSerializer(
  item: ProtectionProfileCustomDetails,
): any {
  return { resourceType: item["resourceType"] };
}

export function protectionProfileCustomDetailsDeserializer(
  item: any,
): ProtectionProfileCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for ProtectionProfileCustomDetailsUnion */
export type ProtectionProfileCustomDetailsUnion =
  | ExistingProtectionProfile
  | NewProtectionProfile
  | ProtectionProfileCustomDetails;

export function protectionProfileCustomDetailsUnionSerializer(
  item: ProtectionProfileCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingProtectionProfileSerializer(item as ExistingProtectionProfile);

    case "New":
      return newProtectionProfileSerializer(item as NewProtectionProfile);

    default:
      return protectionProfileCustomDetailsSerializer(item);
  }
}

export function protectionProfileCustomDetailsUnionDeserializer(
  item: any,
): ProtectionProfileCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingProtectionProfileDeserializer(item as ExistingProtectionProfile);

    case "New":
      return newProtectionProfileDeserializer(item as NewProtectionProfile);

    default:
      return protectionProfileCustomDetailsDeserializer(item);
  }
}

/** Existing storage account input. */
export interface ExistingProtectionProfile extends ProtectionProfileCustomDetails {
  /** The protection profile Arm Id. Throw error, if resource does not exists. */
  protectionProfileId: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingProtectionProfileSerializer(item: ExistingProtectionProfile): any {
  return { resourceType: item["resourceType"], protectionProfileId: item["protectionProfileId"] };
}

export function existingProtectionProfileDeserializer(item: any): ExistingProtectionProfile {
  return {
    resourceType: item["resourceType"],
    protectionProfileId: item["protectionProfileId"],
  };
}

/** New Protection profile input. */
export interface NewProtectionProfile extends ProtectionProfileCustomDetails {
  /** The protection profile input. */
  policyName: string;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. */
  multiVmSyncStatus: SetMultiVmSyncStatus;
  /** The class type. */
  resourceType: "New";
}

export function newProtectionProfileSerializer(item: NewProtectionProfile): any {
  return {
    resourceType: item["resourceType"],
    policyName: item["policyName"],
    recoveryPointHistory: item["recoveryPointHistory"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

export function newProtectionProfileDeserializer(item: any): NewProtectionProfile {
  return {
    resourceType: item["resourceType"],
    policyName: item["policyName"],
    recoveryPointHistory: item["recoveryPointHistory"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. */
export enum KnownSetMultiVmSyncStatus {
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
}

/**
 * A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. \
 * {@link KnownSetMultiVmSyncStatus} can be used interchangeably with SetMultiVmSyncStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable \
 * **Disable**: Disable
 */
export type SetMultiVmSyncStatus = string;

/** Recovery Availability Set custom input. */
export interface RecoveryAvailabilitySetCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing */
  resourceType: string;
}

export function recoveryAvailabilitySetCustomDetailsSerializer(
  item: RecoveryAvailabilitySetCustomDetails,
): any {
  return { resourceType: item["resourceType"] };
}

export function recoveryAvailabilitySetCustomDetailsDeserializer(
  item: any,
): RecoveryAvailabilitySetCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for RecoveryAvailabilitySetCustomDetailsUnion */
export type RecoveryAvailabilitySetCustomDetailsUnion =
  | ExistingRecoveryAvailabilitySet
  | RecoveryAvailabilitySetCustomDetails;

export function recoveryAvailabilitySetCustomDetailsUnionSerializer(
  item: RecoveryAvailabilitySetCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingRecoveryAvailabilitySetSerializer(item as ExistingRecoveryAvailabilitySet);

    default:
      return recoveryAvailabilitySetCustomDetailsSerializer(item);
  }
}

export function recoveryAvailabilitySetCustomDetailsUnionDeserializer(
  item: any,
): RecoveryAvailabilitySetCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingRecoveryAvailabilitySetDeserializer(item as ExistingRecoveryAvailabilitySet);

    default:
      return recoveryAvailabilitySetCustomDetailsDeserializer(item);
  }
}

/** Existing recovery availability set input. */
export interface ExistingRecoveryAvailabilitySet extends RecoveryAvailabilitySetCustomDetails {
  /** The recovery availability set Id. Will throw error, if resource does not exist. */
  recoveryAvailabilitySetId?: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingRecoveryAvailabilitySetSerializer(
  item: ExistingRecoveryAvailabilitySet,
): any {
  return {
    resourceType: item["resourceType"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
  };
}

export function existingRecoveryAvailabilitySetDeserializer(
  item: any,
): ExistingRecoveryAvailabilitySet {
  return {
    resourceType: item["resourceType"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
  };
}

/** Recovery Virtual network custom input. */
export interface RecoveryVirtualNetworkCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing, New */
  resourceType: string;
}

export function recoveryVirtualNetworkCustomDetailsSerializer(
  item: RecoveryVirtualNetworkCustomDetails,
): any {
  return { resourceType: item["resourceType"] };
}

export function recoveryVirtualNetworkCustomDetailsDeserializer(
  item: any,
): RecoveryVirtualNetworkCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for RecoveryVirtualNetworkCustomDetailsUnion */
export type RecoveryVirtualNetworkCustomDetailsUnion =
  | ExistingRecoveryVirtualNetwork
  | NewRecoveryVirtualNetwork
  | RecoveryVirtualNetworkCustomDetails;

export function recoveryVirtualNetworkCustomDetailsUnionSerializer(
  item: RecoveryVirtualNetworkCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingRecoveryVirtualNetworkSerializer(item as ExistingRecoveryVirtualNetwork);

    case "New":
      return newRecoveryVirtualNetworkSerializer(item as NewRecoveryVirtualNetwork);

    default:
      return recoveryVirtualNetworkCustomDetailsSerializer(item);
  }
}

export function recoveryVirtualNetworkCustomDetailsUnionDeserializer(
  item: any,
): RecoveryVirtualNetworkCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingRecoveryVirtualNetworkDeserializer(item as ExistingRecoveryVirtualNetwork);

    case "New":
      return newRecoveryVirtualNetworkDeserializer(item as NewRecoveryVirtualNetwork);

    default:
      return recoveryVirtualNetworkCustomDetailsDeserializer(item);
  }
}

/** Existing recovery virtual network input. */
export interface ExistingRecoveryVirtualNetwork extends RecoveryVirtualNetworkCustomDetails {
  /** The recovery virtual network Id. Will throw error, if resource does not exist. */
  recoveryVirtualNetworkId: string;
  /** The recovery subnet name. */
  recoverySubnetName?: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingRecoveryVirtualNetworkSerializer(
  item: ExistingRecoveryVirtualNetwork,
): any {
  return {
    resourceType: item["resourceType"],
    recoveryVirtualNetworkId: item["recoveryVirtualNetworkId"],
    recoverySubnetName: item["recoverySubnetName"],
  };
}

export function existingRecoveryVirtualNetworkDeserializer(
  item: any,
): ExistingRecoveryVirtualNetwork {
  return {
    resourceType: item["resourceType"],
    recoveryVirtualNetworkId: item["recoveryVirtualNetworkId"],
    recoverySubnetName: item["recoverySubnetName"],
  };
}

/** Recovery virtual network input to create new virtual network from given source network. */
export interface NewRecoveryVirtualNetwork extends RecoveryVirtualNetworkCustomDetails {
  /** The name of the resource group to be used to create the recovery virtual network. If absent, target network would be created in the same resource group as target VM. */
  recoveryVirtualNetworkResourceGroupName?: string;
  /** The recovery virtual network name. */
  recoveryVirtualNetworkName?: string;
  /** The class type. */
  resourceType: "New";
}

export function newRecoveryVirtualNetworkSerializer(item: NewRecoveryVirtualNetwork): any {
  return {
    resourceType: item["resourceType"],
    recoveryVirtualNetworkResourceGroupName: item["recoveryVirtualNetworkResourceGroupName"],
    recoveryVirtualNetworkName: item["recoveryVirtualNetworkName"],
  };
}

export function newRecoveryVirtualNetworkDeserializer(item: any): NewRecoveryVirtualNetwork {
  return {
    resourceType: item["resourceType"],
    recoveryVirtualNetworkResourceGroupName: item["recoveryVirtualNetworkResourceGroupName"],
    recoveryVirtualNetworkName: item["recoveryVirtualNetworkName"],
  };
}

/** Recovery Proximity placement group custom input. */
export interface RecoveryProximityPlacementGroupCustomDetails {
  /** The class type. */
  /** The discriminator possible values: Existing */
  resourceType: string;
}

export function recoveryProximityPlacementGroupCustomDetailsSerializer(
  item: RecoveryProximityPlacementGroupCustomDetails,
): any {
  return { resourceType: item["resourceType"] };
}

export function recoveryProximityPlacementGroupCustomDetailsDeserializer(
  item: any,
): RecoveryProximityPlacementGroupCustomDetails {
  return {
    resourceType: item["resourceType"],
  };
}

/** Alias for RecoveryProximityPlacementGroupCustomDetailsUnion */
export type RecoveryProximityPlacementGroupCustomDetailsUnion =
  | ExistingRecoveryProximityPlacementGroup
  | RecoveryProximityPlacementGroupCustomDetails;

export function recoveryProximityPlacementGroupCustomDetailsUnionSerializer(
  item: RecoveryProximityPlacementGroupCustomDetailsUnion,
): any {
  switch (item.resourceType) {
    case "Existing":
      return existingRecoveryProximityPlacementGroupSerializer(
        item as ExistingRecoveryProximityPlacementGroup,
      );

    default:
      return recoveryProximityPlacementGroupCustomDetailsSerializer(item);
  }
}

export function recoveryProximityPlacementGroupCustomDetailsUnionDeserializer(
  item: any,
): RecoveryProximityPlacementGroupCustomDetailsUnion {
  switch (item["resourceType"]) {
    case "Existing":
      return existingRecoveryProximityPlacementGroupDeserializer(
        item as ExistingRecoveryProximityPlacementGroup,
      );

    default:
      return recoveryProximityPlacementGroupCustomDetailsDeserializer(item);
  }
}

/** Existing recovery proximity placement group input. */
export interface ExistingRecoveryProximityPlacementGroup extends RecoveryProximityPlacementGroupCustomDetails {
  /** The recovery proximity placement group Id. Will throw error, if resource does not exist. */
  recoveryProximityPlacementGroupId?: string;
  /** The class type. */
  resourceType: "Existing";
}

export function existingRecoveryProximityPlacementGroupSerializer(
  item: ExistingRecoveryProximityPlacementGroup,
): any {
  return {
    resourceType: item["resourceType"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
  };
}

export function existingRecoveryProximityPlacementGroupDeserializer(
  item: any,
): ExistingRecoveryProximityPlacementGroup {
  return {
    resourceType: item["resourceType"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
  };
}

/** A value indicating whether the auto update is enabled. */
export enum KnownAgentAutoUpdateStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * A value indicating whether the auto update is enabled. \
 * {@link KnownAgentAutoUpdateStatus} can be used interchangeably with AgentAutoUpdateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type AgentAutoUpdateStatus = string;

/** A value indicating the type authentication to use for automation Account. */
export enum KnownAutomationAccountAuthenticationType {
  /** RunAsAccount */
  RunAsAccount = "RunAsAccount",
  /** SystemAssignedIdentity */
  SystemAssignedIdentity = "SystemAssignedIdentity",
}

/**
 * A value indicating the type authentication to use for automation Account. \
 * {@link KnownAutomationAccountAuthenticationType} can be used interchangeably with AutomationAccountAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RunAsAccount**: RunAsAccount \
 * **SystemAssignedIdentity**: SystemAssignedIdentity
 */
export type AutomationAccountAuthenticationType = string;

/** Create protection intent input. */
export interface CreateProtectionIntentInput {
  /** Create protection intent input properties. */
  properties?: CreateProtectionIntentProperties;
}

export function createProtectionIntentInputSerializer(item: CreateProtectionIntentInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : createProtectionIntentPropertiesSerializer(item["properties"]),
  };
}

/** Create protection intent input properties. */
export interface CreateProtectionIntentProperties {
  /** The ReplicationProviderInput. For A2A provider, it will be A2ACreateProtectionIntentInput object. */
  providerSpecificDetails?: CreateProtectionIntentProviderSpecificDetailsUnion;
}

export function createProtectionIntentPropertiesSerializer(
  item: CreateProtectionIntentProperties,
): any {
  return {
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : createProtectionIntentProviderSpecificDetailsUnionSerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Create protection intent provider specific input. */
export interface CreateProtectionIntentProviderSpecificDetails {
  /** The class type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function createProtectionIntentProviderSpecificDetailsSerializer(
  item: CreateProtectionIntentProviderSpecificDetails,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for CreateProtectionIntentProviderSpecificDetailsUnion */
export type CreateProtectionIntentProviderSpecificDetailsUnion =
  | A2ACreateProtectionIntentInput
  | CreateProtectionIntentProviderSpecificDetails;

export function createProtectionIntentProviderSpecificDetailsUnionSerializer(
  item: CreateProtectionIntentProviderSpecificDetailsUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ACreateProtectionIntentInputSerializer(item as A2ACreateProtectionIntentInput);

    default:
      return createProtectionIntentProviderSpecificDetailsSerializer(item);
  }
}

/** A2A create protection intent input. */
export interface A2ACreateProtectionIntentInput extends CreateProtectionIntentProviderSpecificDetails {
  /** The fabric specific object Id of the virtual machine. */
  fabricObjectId: string;
  /** The primary location for the virtual machine. */
  primaryLocation: string;
  /** The recovery location for the virtual machine. */
  recoveryLocation: string;
  /** The recovery subscription Id of the virtual machine. */
  recoverySubscriptionId: string;
  /** The recovery availability type of the virtual machine. */
  recoveryAvailabilityType: A2ARecoveryAvailabilityType;
  /** The protection profile custom inputs. */
  protectionProfileCustomInput?: ProtectionProfileCustomDetailsUnion;
  /** The recovery resource group Id. Valid for V2 scenarios. */
  recoveryResourceGroupId: string;
  /** The primary staging storage account input. */
  primaryStagingStorageAccountCustomInput?: StorageAccountCustomDetailsUnion;
  /** The recovery availability set input. */
  recoveryAvailabilitySetCustomInput?: RecoveryAvailabilitySetCustomDetailsUnion;
  /** The recovery virtual network input. */
  recoveryVirtualNetworkCustomInput?: RecoveryVirtualNetworkCustomDetailsUnion;
  /** The recovery proximity placement group custom input. */
  recoveryProximityPlacementGroupCustomInput?: RecoveryProximityPlacementGroupCustomDetailsUnion;
  /** A value indicating whether the auto protection is enabled. */
  autoProtectionOfDataDisk?: AutoProtectionOfDataDisk;
  /** The list of vm disk inputs. */
  vmDisks?: A2AProtectionIntentDiskInputDetails[];
  /** The list of vm managed disk inputs. */
  vmManagedDisks?: A2AProtectionIntentManagedDiskInputDetails[];
  /** The multi vm group name. */
  multiVmGroupName?: string;
  /** The multi vm group id. */
  multiVmGroupId?: string;
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccount?: StorageAccountCustomDetailsUnion;
  /** The recovery disk encryption information (for two pass flows). */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** A value indicating whether the auto update is enabled. */
  agentAutoUpdateStatus?: AgentAutoUpdateStatus;
  /** A value indicating the authentication type for automation account. The default value is "RunAsAccount". */
  automationAccountAuthenticationType?: AutomationAccountAuthenticationType;
  /** The automation account arm id. */
  automationAccountArmId?: string;
  /** The class type. */
  instanceType: "A2A";
}

export function a2ACreateProtectionIntentInputSerializer(
  item: A2ACreateProtectionIntentInput,
): any {
  return {
    instanceType: item["instanceType"],
    fabricObjectId: item["fabricObjectId"],
    primaryLocation: item["primaryLocation"],
    recoveryLocation: item["recoveryLocation"],
    recoverySubscriptionId: item["recoverySubscriptionId"],
    recoveryAvailabilityType: item["recoveryAvailabilityType"],
    protectionProfileCustomInput: !item["protectionProfileCustomInput"]
      ? item["protectionProfileCustomInput"]
      : protectionProfileCustomDetailsUnionSerializer(item["protectionProfileCustomInput"]),
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    primaryStagingStorageAccountCustomInput: !item["primaryStagingStorageAccountCustomInput"]
      ? item["primaryStagingStorageAccountCustomInput"]
      : storageAccountCustomDetailsUnionSerializer(item["primaryStagingStorageAccountCustomInput"]),
    recoveryAvailabilitySetCustomInput: !item["recoveryAvailabilitySetCustomInput"]
      ? item["recoveryAvailabilitySetCustomInput"]
      : recoveryAvailabilitySetCustomDetailsUnionSerializer(
          item["recoveryAvailabilitySetCustomInput"],
        ),
    recoveryVirtualNetworkCustomInput: !item["recoveryVirtualNetworkCustomInput"]
      ? item["recoveryVirtualNetworkCustomInput"]
      : recoveryVirtualNetworkCustomDetailsUnionSerializer(
          item["recoveryVirtualNetworkCustomInput"],
        ),
    recoveryProximityPlacementGroupCustomInput: !item["recoveryProximityPlacementGroupCustomInput"]
      ? item["recoveryProximityPlacementGroupCustomInput"]
      : recoveryProximityPlacementGroupCustomDetailsUnionSerializer(
          item["recoveryProximityPlacementGroupCustomInput"],
        ),
    autoProtectionOfDataDisk: item["autoProtectionOfDataDisk"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AProtectionIntentDiskInputDetailsArraySerializer(item["vmDisks"]),
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AProtectionIntentManagedDiskInputDetailsArraySerializer(item["vmManagedDisks"]),
    multiVmGroupName: item["multiVmGroupName"],
    multiVmGroupId: item["multiVmGroupId"],
    recoveryBootDiagStorageAccount: !item["recoveryBootDiagStorageAccount"]
      ? item["recoveryBootDiagStorageAccount"]
      : storageAccountCustomDetailsUnionSerializer(item["recoveryBootDiagStorageAccount"]),
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    agentAutoUpdateStatus: item["agentAutoUpdateStatus"],
    automationAccountAuthenticationType: item["automationAccountAuthenticationType"],
    automationAccountArmId: item["automationAccountArmId"],
  };
}

/** The recovery availability type of the virtual machine. */
export enum KnownA2ARecoveryAvailabilityType {
  /** Single */
  Single = "Single",
  /** AvailabilitySet */
  AvailabilitySet = "AvailabilitySet",
  /** AvailabilityZone */
  AvailabilityZone = "AvailabilityZone",
}

/**
 * The recovery availability type of the virtual machine. \
 * {@link KnownA2ARecoveryAvailabilityType} can be used interchangeably with A2ARecoveryAvailabilityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: Single \
 * **AvailabilitySet**: AvailabilitySet \
 * **AvailabilityZone**: AvailabilityZone
 */
export type A2ARecoveryAvailabilityType = string;

/** Replication protection intent objects collection. */
export interface _ReplicationProtectionIntentCollection {
  /** The ReplicationProtectionIntent items on this page */
  value: ReplicationProtectionIntent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicationProtectionIntentCollectionDeserializer(
  item: any,
): _ReplicationProtectionIntentCollection {
  return {
    value: replicationProtectionIntentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationProtectionIntentArrayDeserializer(
  result: Array<ReplicationProtectionIntent>,
): any[] {
  return result.map((item) => {
    return replicationProtectionIntentDeserializer(item);
  });
}

/** Implements the Alert class. */
export interface Alert extends ProxyResource {
  /** Alert related data. */
  properties?: AlertProperties;
  /** Resource Location */
  location?: string;
}

export function alertDeserializer(item: any): Alert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** The properties of an alert. */
export interface AlertProperties {
  /** A value indicating whether to send email to subscription administrator. */
  sendToOwners?: string;
  /** The custom email address for sending emails. */
  customEmailAddresses?: string[];
  /** The locale for the email notification. */
  locale?: string;
}

export function alertPropertiesDeserializer(item: any): AlertProperties {
  return {
    sendToOwners: item["sendToOwners"],
    customEmailAddresses: !item["customEmailAddresses"]
      ? item["customEmailAddresses"]
      : item["customEmailAddresses"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
  };
}

/** Request to configure alerts for the system. */
export interface ConfigureAlertRequest {
  /** The properties of a configure alert request. */
  properties?: ConfigureAlertRequestProperties;
}

export function configureAlertRequestSerializer(item: ConfigureAlertRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configureAlertRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties of a configure alert request. */
export interface ConfigureAlertRequestProperties {
  /** A value indicating whether to send email to subscription administrator. */
  sendToOwners?: string;
  /** The custom email address for sending emails. */
  customEmailAddresses?: string[];
  /** The locale for the email notification. */
  locale?: string;
}

export function configureAlertRequestPropertiesSerializer(
  item: ConfigureAlertRequestProperties,
): any {
  return {
    sendToOwners: item["sendToOwners"],
    customEmailAddresses: !item["customEmailAddresses"]
      ? item["customEmailAddresses"]
      : item["customEmailAddresses"].map((p: any) => {
          return p;
        }),
    locale: item["locale"],
  };
}

/** Collection of alerts. */
export interface _AlertCollection {
  /** The Alert items on this page */
  value: Alert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertCollectionDeserializer(item: any): _AlertCollection {
  return {
    value: alertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** Replication eligibility results response model. */
export interface ReplicationEligibilityResults extends ProxyResource {
  /** Gets properties model for replication eligibility results API. */
  properties?: ReplicationEligibilityResultsProperties;
}

export function replicationEligibilityResultsDeserializer(
  item: any,
): ReplicationEligibilityResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : replicationEligibilityResultsPropertiesDeserializer(item["properties"]),
  };
}

/** Properties model for replication eligibility results API. */
export interface ReplicationEligibilityResultsProperties {
  /** The client request Id. */
  readonly clientRequestId?: string;
  /** The error details. */
  errors?: ReplicationEligibilityResultsErrorInfo[];
}

export function replicationEligibilityResultsPropertiesDeserializer(
  item: any,
): ReplicationEligibilityResultsProperties {
  return {
    clientRequestId: item["clientRequestId"],
    errors: !item["errors"]
      ? item["errors"]
      : replicationEligibilityResultsErrorInfoArrayDeserializer(item["errors"]),
  };
}

export function replicationEligibilityResultsErrorInfoArrayDeserializer(
  result: Array<ReplicationEligibilityResultsErrorInfo>,
): any[] {
  return result.map((item) => {
    return replicationEligibilityResultsErrorInfoDeserializer(item);
  });
}

/** Error model that can be exposed to the user. */
export interface ReplicationEligibilityResultsErrorInfo {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The possible causes. */
  possibleCauses?: string;
  /** The recommended action. */
  recommendedAction?: string;
  /** The error status. */
  readonly status?: string;
}

export function replicationEligibilityResultsErrorInfoDeserializer(
  item: any,
): ReplicationEligibilityResultsErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    status: item["status"],
  };
}

/** Replication eligibility results collection response model. */
export interface ReplicationEligibilityResultsCollection {
  /** The replication eligibility results details. */
  value?: ReplicationEligibilityResults[];
}

export function replicationEligibilityResultsCollectionDeserializer(
  item: any,
): ReplicationEligibilityResultsCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : replicationEligibilityResultsArrayDeserializer(item["value"]),
  };
}

export function replicationEligibilityResultsArrayDeserializer(
  result: Array<ReplicationEligibilityResults>,
): any[] {
  return result.map((item) => {
    return replicationEligibilityResultsDeserializer(item);
  });
}

/** Implements the Event class. */
export interface Event extends ProxyResource {
  /** Event related data. */
  properties?: EventProperties;
  /** Resource Location */
  location?: string;
}

export function eventDeserializer(item: any): Event {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : eventPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** The properties of a monitoring event. */
export interface EventProperties {
  /** The Id of the monitoring event. */
  eventCode?: string;
  /** The event name. */
  description?: string;
  /** The type of the event. for example: VM Health, Server Health, Job Failure etc. */
  eventType?: string;
  /** The friendly name of the source of the event on which it is raised (for example, VM, VMM etc). */
  affectedObjectFriendlyName?: string;
  /** The affected object correlationId for the event. */
  affectedObjectCorrelationId?: string;
  /** The severity of the event. */
  severity?: string;
  /** The time of occurrence of the event. */
  timeOfOccurrence?: Date;
  /** The ARM ID of the fabric. */
  fabricId?: string;
  /** The provider specific settings. */
  providerSpecificDetails?: EventProviderSpecificDetailsUnion;
  /** The event specific settings. */
  eventSpecificDetails?: EventSpecificDetailsUnion;
  /** The list of errors / warnings capturing details associated with the issue(s). */
  healthErrors?: HealthError[];
}

export function eventPropertiesDeserializer(item: any): EventProperties {
  return {
    eventCode: item["eventCode"],
    description: item["description"],
    eventType: item["eventType"],
    affectedObjectFriendlyName: item["affectedObjectFriendlyName"],
    affectedObjectCorrelationId: item["affectedObjectCorrelationId"],
    severity: item["severity"],
    timeOfOccurrence: !item["timeOfOccurrence"]
      ? item["timeOfOccurrence"]
      : new Date(item["timeOfOccurrence"]),
    fabricId: item["fabricId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : eventProviderSpecificDetailsUnionDeserializer(item["providerSpecificDetails"]),
    eventSpecificDetails: !item["eventSpecificDetails"]
      ? item["eventSpecificDetails"]
      : eventSpecificDetailsUnionDeserializer(item["eventSpecificDetails"]),
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

/** Model class for provider specific details for an event. */
export interface EventProviderSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: A2A, HyperVReplica2012, HyperVReplica2012R2, HyperVReplicaAzure, HyperVReplicaBaseEventDetails, InMageAzureV2, InMageRcm, InMageRcmFailback, VMwareCbt */
  instanceType: string;
}

export function eventProviderSpecificDetailsDeserializer(item: any): EventProviderSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for EventProviderSpecificDetailsUnion */
export type EventProviderSpecificDetailsUnion =
  | A2AEventDetails
  | HyperVReplica2012EventDetails
  | HyperVReplica2012R2EventDetails
  | HyperVReplicaAzureEventDetails
  | HyperVReplicaBaseEventDetails
  | InMageAzureV2EventDetails
  | InMageRcmEventDetails
  | InMageRcmFailbackEventDetails
  | VMwareCbtEventDetails
  | EventProviderSpecificDetails;

export function eventProviderSpecificDetailsUnionDeserializer(
  item: any,
): EventProviderSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2AEventDetailsDeserializer(item as A2AEventDetails);

    case "HyperVReplica2012":
      return hyperVReplica2012EventDetailsDeserializer(item as HyperVReplica2012EventDetails);

    case "HyperVReplica2012R2":
      return hyperVReplica2012R2EventDetailsDeserializer(item as HyperVReplica2012R2EventDetails);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzureEventDetailsDeserializer(item as HyperVReplicaAzureEventDetails);

    case "HyperVReplicaBaseEventDetails":
      return hyperVReplicaBaseEventDetailsDeserializer(item as HyperVReplicaBaseEventDetails);

    case "InMageAzureV2":
      return inMageAzureV2EventDetailsDeserializer(item as InMageAzureV2EventDetails);

    case "InMageRcm":
      return inMageRcmEventDetailsDeserializer(item as InMageRcmEventDetails);

    case "InMageRcmFailback":
      return inMageRcmFailbackEventDetailsDeserializer(item as InMageRcmFailbackEventDetails);

    case "VMwareCbt":
      return vMwareCbtEventDetailsDeserializer(item as VMwareCbtEventDetails);

    default:
      return eventProviderSpecificDetailsDeserializer(item);
  }
}

/** Model class for event details of a A2A event. */
export interface A2AEventDetails extends EventProviderSpecificDetails {
  /** The protected item arm name. */
  protectedItemName?: string;
  /** The azure vm arm id. */
  fabricObjectId?: string;
  /** Fabric arm name. */
  fabricName?: string;
  /** The fabric location. */
  fabricLocation?: string;
  /** Remote fabric arm name. */
  remoteFabricName?: string;
  /** Remote fabric location. */
  remoteFabricLocation?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "A2A";
}

export function a2AEventDetailsDeserializer(item: any): A2AEventDetails {
  return {
    instanceType: item["instanceType"],
    protectedItemName: item["protectedItemName"],
    fabricObjectId: item["fabricObjectId"],
    fabricName: item["fabricName"],
    fabricLocation: item["fabricLocation"],
    remoteFabricName: item["remoteFabricName"],
    remoteFabricLocation: item["remoteFabricLocation"],
  };
}

/** Model class for event details of a HyperVReplica E2E event. */
export interface HyperVReplica2012EventDetails extends EventProviderSpecificDetails {
  /** The container friendly name. */
  containerName?: string;
  /** The fabric friendly name. */
  fabricName?: string;
  /** The remote container name. */
  remoteContainerName?: string;
  /** The remote fabric name. */
  remoteFabricName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplica2012";
}

export function hyperVReplica2012EventDetailsDeserializer(
  item: any,
): HyperVReplica2012EventDetails {
  return {
    instanceType: item["instanceType"],
    containerName: item["containerName"],
    fabricName: item["fabricName"],
    remoteContainerName: item["remoteContainerName"],
    remoteFabricName: item["remoteFabricName"],
  };
}

/** Model class for event details of a HyperVReplica blue E2E event. */
export interface HyperVReplica2012R2EventDetails extends EventProviderSpecificDetails {
  /** The container friendly name. */
  containerName?: string;
  /** The fabric friendly name. */
  fabricName?: string;
  /** The remote container name. */
  remoteContainerName?: string;
  /** The remote fabric name. */
  remoteFabricName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplica2012R2";
}

export function hyperVReplica2012R2EventDetailsDeserializer(
  item: any,
): HyperVReplica2012R2EventDetails {
  return {
    instanceType: item["instanceType"],
    containerName: item["containerName"],
    fabricName: item["fabricName"],
    remoteContainerName: item["remoteContainerName"],
    remoteFabricName: item["remoteFabricName"],
  };
}

/** Model class for event details of a HyperVReplica E2A event. */
export interface HyperVReplicaAzureEventDetails extends EventProviderSpecificDetails {
  /** The container friendly name. */
  containerName?: string;
  /** The fabric friendly name. */
  fabricName?: string;
  /** The remote container name. */
  remoteContainerName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzureEventDetailsDeserializer(
  item: any,
): HyperVReplicaAzureEventDetails {
  return {
    instanceType: item["instanceType"],
    containerName: item["containerName"],
    fabricName: item["fabricName"],
    remoteContainerName: item["remoteContainerName"],
  };
}

/** Abstract model class for event details of a HyperVReplica E2E event. */
export interface HyperVReplicaBaseEventDetails extends EventProviderSpecificDetails {
  /** The container friendly name. */
  containerName?: string;
  /** The fabric friendly name. */
  fabricName?: string;
  /** The remote container name. */
  remoteContainerName?: string;
  /** The remote fabric name. */
  remoteFabricName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplicaBaseEventDetails";
}

export function hyperVReplicaBaseEventDetailsDeserializer(
  item: any,
): HyperVReplicaBaseEventDetails {
  return {
    instanceType: item["instanceType"],
    containerName: item["containerName"],
    fabricName: item["fabricName"],
    remoteContainerName: item["remoteContainerName"],
    remoteFabricName: item["remoteFabricName"],
  };
}

/** Model class for event details of a VMwareAzureV2 event. */
export interface InMageAzureV2EventDetails extends EventProviderSpecificDetails {
  /** InMage Event type. Takes one of the values of InMageDataContract.InMageMonitoringEventType. */
  eventType?: string;
  /** InMage Event Category. */
  category?: string;
  /** InMage Event Component. */
  component?: string;
  /** Corrective Action string for the event. */
  correctiveAction?: string;
  /** InMage Event Details. */
  details?: string;
  /** InMage Event Summary. */
  summary?: string;
  /** VMware Site name. */
  siteName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2EventDetailsDeserializer(item: any): InMageAzureV2EventDetails {
  return {
    instanceType: item["instanceType"],
    eventType: item["eventType"],
    category: item["category"],
    component: item["component"],
    correctiveAction: item["correctiveAction"],
    details: item["details"],
    summary: item["summary"],
    siteName: item["siteName"],
  };
}

/** Event details for InMageRcm provider. */
export interface InMageRcmEventDetails extends EventProviderSpecificDetails {
  /** The protected item name. */
  readonly protectedItemName?: string;
  /** The protected item name. */
  readonly vmName?: string;
  /** The latest agent version. */
  readonly latestAgentVersion?: string;
  /** The job Id. */
  readonly jobId?: string;
  /** The fabric name. */
  readonly fabricName?: string;
  /** The appliance name. */
  readonly applianceName?: string;
  /** The server type. */
  readonly serverType?: string;
  /** The component display name. */
  readonly componentDisplayName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcm";
}

export function inMageRcmEventDetailsDeserializer(item: any): InMageRcmEventDetails {
  return {
    instanceType: item["instanceType"],
    protectedItemName: item["protectedItemName"],
    vmName: item["vmName"],
    latestAgentVersion: item["latestAgentVersion"],
    jobId: item["jobId"],
    fabricName: item["fabricName"],
    applianceName: item["applianceName"],
    serverType: item["serverType"],
    componentDisplayName: item["componentDisplayName"],
  };
}

/** Event details for InMageRcmFailback provider. */
export interface InMageRcmFailbackEventDetails extends EventProviderSpecificDetails {
  /** The protected item name. */
  readonly protectedItemName?: string;
  /** The protected item name. */
  readonly vmName?: string;
  /** The appliance name. */
  readonly applianceName?: string;
  /** The server type. */
  readonly serverType?: string;
  /** The component display name. */
  readonly componentDisplayName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackEventDetailsDeserializer(
  item: any,
): InMageRcmFailbackEventDetails {
  return {
    instanceType: item["instanceType"],
    protectedItemName: item["protectedItemName"],
    vmName: item["vmName"],
    applianceName: item["applianceName"],
    serverType: item["serverType"],
    componentDisplayName: item["componentDisplayName"],
  };
}

/** Event details for VMwareCbt provider. */
export interface VMwareCbtEventDetails extends EventProviderSpecificDetails {
  /** The migration item name. */
  readonly migrationItemName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtEventDetailsDeserializer(item: any): VMwareCbtEventDetails {
  return {
    instanceType: item["instanceType"],
    migrationItemName: item["migrationItemName"],
  };
}

/** Model class for event specific details for an event. */
export interface EventSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: JobStatus */
  instanceType: string;
}

export function eventSpecificDetailsDeserializer(item: any): EventSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for EventSpecificDetailsUnion */
export type EventSpecificDetailsUnion = JobStatusEventDetails | EventSpecificDetails;

export function eventSpecificDetailsUnionDeserializer(item: any): EventSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "JobStatus":
      return jobStatusEventDetailsDeserializer(item as JobStatusEventDetails);

    default:
      return eventSpecificDetailsDeserializer(item);
  }
}

/** Model class for event details of a job status event. */
export interface JobStatusEventDetails extends EventSpecificDetails {
  /** Job arm id for the event. */
  jobId?: string;
  /** JobName for the Event. */
  jobFriendlyName?: string;
  /** JobStatus for the Event. */
  jobStatus?: string;
  /** AffectedObjectType for the event. */
  affectedObjectType?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "JobStatus";
}

export function jobStatusEventDetailsDeserializer(item: any): JobStatusEventDetails {
  return {
    instanceType: item["instanceType"],
    jobId: item["jobId"],
    jobFriendlyName: item["jobFriendlyName"],
    jobStatus: item["jobStatus"],
    affectedObjectType: item["affectedObjectType"],
  };
}

/** Collection of fabric details. */
export interface _EventCollection {
  /** The Event items on this page */
  value: Event[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventCollectionDeserializer(item: any): _EventCollection {
  return {
    value: eventArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** Fabric definition. */
export interface Fabric extends ProxyResource {
  /** Fabric related data. */
  properties?: FabricProperties;
  /** Resource Location */
  location?: string;
}

export function fabricDeserializer(item: any): Fabric {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fabricPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Fabric properties. */
export interface FabricProperties {
  /** Friendly name of the fabric. */
  friendlyName?: string;
  /** Encryption details for the fabric. */
  encryptionDetails?: EncryptionDetails;
  /** Rollover encryption details for the fabric. */
  rolloverEncryptionDetails?: EncryptionDetails;
  /** Dra Registration Id. */
  internalIdentifier?: string;
  /** BCDR state of the fabric. */
  bcdrState?: string;
  /** Fabric specific settings. */
  customDetails?: FabricSpecificDetailsUnion;
  /** Fabric health error details. */
  healthErrorDetails?: HealthError[];
  /** Health of fabric. */
  health?: string;
}

export function fabricPropertiesDeserializer(item: any): FabricProperties {
  return {
    friendlyName: item["friendlyName"],
    encryptionDetails: !item["encryptionDetails"]
      ? item["encryptionDetails"]
      : encryptionDetailsDeserializer(item["encryptionDetails"]),
    rolloverEncryptionDetails: !item["rolloverEncryptionDetails"]
      ? item["rolloverEncryptionDetails"]
      : encryptionDetailsDeserializer(item["rolloverEncryptionDetails"]),
    internalIdentifier: item["internalIdentifier"],
    bcdrState: item["bcdrState"],
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : fabricSpecificDetailsUnionDeserializer(item["customDetails"]),
    healthErrorDetails: !item["healthErrorDetails"]
      ? item["healthErrorDetails"]
      : healthErrorArrayDeserializer(item["healthErrorDetails"]),
    health: item["health"],
  };
}

/** Encryption details for the fabric. */
export interface EncryptionDetails {
  /** The key encryption key state for the Vmm. */
  kekState?: string;
  /** The key encryption key certificate thumbprint. */
  kekCertThumbprint?: string;
  /** The key encryption key certificate expiry date. */
  kekCertExpiryDate?: Date;
}

export function encryptionDetailsDeserializer(item: any): EncryptionDetails {
  return {
    kekState: item["kekState"],
    kekCertThumbprint: item["kekCertThumbprint"],
    kekCertExpiryDate: !item["kekCertExpiryDate"]
      ? item["kekCertExpiryDate"]
      : new Date(item["kekCertExpiryDate"]),
  };
}

/** Fabric specific details. */
export interface FabricSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: Azure, HyperVSite, InMageRcm, VMM, VMware, VMwareV2 */
  instanceType: string;
}

export function fabricSpecificDetailsDeserializer(item: any): FabricSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for FabricSpecificDetailsUnion */
export type FabricSpecificDetailsUnion =
  | AzureFabricSpecificDetails
  | HyperVSiteDetails
  | InMageRcmFabricSpecificDetails
  | VmmDetails
  | VMwareDetails
  | VMwareV2FabricSpecificDetails
  | FabricSpecificDetails;

export function fabricSpecificDetailsUnionDeserializer(item: any): FabricSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "Azure":
      return azureFabricSpecificDetailsDeserializer(item as AzureFabricSpecificDetails);

    case "HyperVSite":
      return hyperVSiteDetailsDeserializer(item as HyperVSiteDetails);

    case "InMageRcm":
      return inMageRcmFabricSpecificDetailsDeserializer(item as InMageRcmFabricSpecificDetails);

    case "VMM":
      return vmmDetailsDeserializer(item as VmmDetails);

    case "VMware":
      return vMwareDetailsDeserializer(item as VMwareDetails);

    case "VMwareV2":
      return vMwareV2FabricSpecificDetailsDeserializer(item as VMwareV2FabricSpecificDetails);

    default:
      return fabricSpecificDetailsDeserializer(item);
  }
}

/** Azure Fabric Specific Details. */
export interface AzureFabricSpecificDetails extends FabricSpecificDetails {
  /** The Location for the Azure fabric. */
  location?: string;
  /** The container Ids for the Azure fabric. */
  containerIds?: string[];
  /** The zones. */
  zones?: A2AZoneDetails[];
  /** The ExtendedLocations. */
  extendedLocations?: A2AExtendedLocationDetails[];
  /** The location details. */
  locationDetails?: A2AFabricSpecificLocationDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "Azure";
}

export function azureFabricSpecificDetailsDeserializer(item: any): AzureFabricSpecificDetails {
  return {
    instanceType: item["instanceType"],
    location: item["location"],
    containerIds: !item["containerIds"]
      ? item["containerIds"]
      : item["containerIds"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"] ? item["zones"] : a2AZoneDetailsArrayDeserializer(item["zones"]),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : a2AExtendedLocationDetailsArrayDeserializer(item["extendedLocations"]),
    locationDetails: !item["locationDetails"]
      ? item["locationDetails"]
      : a2AFabricSpecificLocationDetailsArrayDeserializer(item["locationDetails"]),
  };
}

export function a2AZoneDetailsArrayDeserializer(result: Array<A2AZoneDetails>): any[] {
  return result.map((item) => {
    return a2AZoneDetailsDeserializer(item);
  });
}

/** Zone details data. */
export interface A2AZoneDetails {
  /** Source zone info. */
  source?: string;
  /** The target zone info. */
  target?: string;
}

export function a2AZoneDetailsDeserializer(item: any): A2AZoneDetails {
  return {
    source: item["source"],
    target: item["target"],
  };
}

export function a2AExtendedLocationDetailsArrayDeserializer(
  result: Array<A2AExtendedLocationDetails>,
): any[] {
  return result.map((item) => {
    return a2AExtendedLocationDetailsDeserializer(item);
  });
}

/** ExtendedLocation details data. */
export interface A2AExtendedLocationDetails {
  /** The primary ExtendedLocation. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery ExtendedLocation. */
  recoveryExtendedLocation?: ExtendedLocation;
}

export function a2AExtendedLocationDetailsDeserializer(item: any): A2AExtendedLocationDetails {
  return {
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationDeserializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationDeserializer(item["recoveryExtendedLocation"]),
  };
}

export function a2AFabricSpecificLocationDetailsArrayDeserializer(
  result: Array<A2AFabricSpecificLocationDetails>,
): any[] {
  return result.map((item) => {
    return a2AFabricSpecificLocationDetailsDeserializer(item);
  });
}

/** ExtendedLocation details data. */
export interface A2AFabricSpecificLocationDetails {
  /** The initial source zone info. */
  initialPrimaryZone?: string;
  /** The initial target zone info. */
  initialRecoveryZone?: string;
  /** The initial primary ExtendedLocation. */
  initialPrimaryExtendedLocation?: ExtendedLocation;
  /** The initial recovery ExtendedLocation. */
  initialRecoveryExtendedLocation?: ExtendedLocation;
  /** Initial primary fabric location info. */
  initialPrimaryFabricLocation?: string;
  /** The initial recovery fabric location info. */
  initialRecoveryFabricLocation?: string;
  /** Source zone info. */
  primaryZone?: string;
  /** The target zone info. */
  recoveryZone?: string;
  /** The primary ExtendedLocation. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery ExtendedLocation. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** Primary fabric location info. */
  primaryFabricLocation?: string;
  /** The recovery fabric location info. */
  recoveryFabricLocation?: string;
}

export function a2AFabricSpecificLocationDetailsDeserializer(
  item: any,
): A2AFabricSpecificLocationDetails {
  return {
    initialPrimaryZone: item["initialPrimaryZone"],
    initialRecoveryZone: item["initialRecoveryZone"],
    initialPrimaryExtendedLocation: !item["initialPrimaryExtendedLocation"]
      ? item["initialPrimaryExtendedLocation"]
      : extendedLocationDeserializer(item["initialPrimaryExtendedLocation"]),
    initialRecoveryExtendedLocation: !item["initialRecoveryExtendedLocation"]
      ? item["initialRecoveryExtendedLocation"]
      : extendedLocationDeserializer(item["initialRecoveryExtendedLocation"]),
    initialPrimaryFabricLocation: item["initialPrimaryFabricLocation"],
    initialRecoveryFabricLocation: item["initialRecoveryFabricLocation"],
    primaryZone: item["primaryZone"],
    recoveryZone: item["recoveryZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationDeserializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationDeserializer(item["recoveryExtendedLocation"]),
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
  };
}

/** HyperVSite fabric specific details. */
export interface HyperVSiteDetails extends FabricSpecificDetails {
  /** The list of Hyper-V hosts associated with the fabric. */
  hyperVHosts?: HyperVHostDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVSite";
}

export function hyperVSiteDetailsDeserializer(item: any): HyperVSiteDetails {
  return {
    instanceType: item["instanceType"],
    hyperVHosts: !item["hyperVHosts"]
      ? item["hyperVHosts"]
      : hyperVHostDetailsArrayDeserializer(item["hyperVHosts"]),
  };
}

export function hyperVHostDetailsArrayDeserializer(result: Array<HyperVHostDetails>): any[] {
  return result.map((item) => {
    return hyperVHostDetailsDeserializer(item);
  });
}

/** Hyper-V host details. */
export interface HyperVHostDetails {
  /** The Hyper-V host Id. */
  readonly id?: string;
  /** The Hyper-V host name. */
  readonly name?: string;
  /** The Mars agent version. */
  readonly marsAgentVersion?: string;
}

export function hyperVHostDetailsDeserializer(item: any): HyperVHostDetails {
  return {
    id: item["id"],
    name: item["name"],
    marsAgentVersion: item["marsAgentVersion"],
  };
}

/** InMageRcm fabric specific details. */
export interface InMageRcmFabricSpecificDetails extends FabricSpecificDetails {
  /** The ARM Id of the VMware site. */
  readonly vmwareSiteId?: string;
  /** The ARM Id of the physical site. */
  readonly physicalSiteId?: string;
  /** The service endpoint. */
  readonly serviceEndpoint?: string;
  /** The service resource Id. */
  readonly serviceResourceId?: string;
  /** The service container Id. */
  readonly serviceContainerId?: string;
  /** The data plane Uri. */
  readonly dataPlaneUri?: string;
  /** The control plane Uri. */
  readonly controlPlaneUri?: string;
  /** The source agent identity details. */
  sourceAgentIdentityDetails?: IdentityProviderDetails;
  /** The list of process servers. */
  readonly processServers?: ProcessServerDetails[];
  /** The list of RCM proxies. */
  readonly rcmProxies?: RcmProxyDetails[];
  /** The list of push installers. */
  readonly pushInstallers?: PushInstallerDetails[];
  /** The list of replication agents. */
  readonly replicationAgents?: ReplicationAgentDetails[];
  /** The list of reprotect agents. */
  readonly reprotectAgents?: ReprotectAgentDetails[];
  /** The list of Mars agents. */
  readonly marsAgents?: MarsAgentDetails[];
  /** The list of DRAs. */
  readonly dras?: DraDetails[];
  /** The list of agent details. */
  readonly agentDetails?: AgentDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcm";
}

export function inMageRcmFabricSpecificDetailsDeserializer(
  item: any,
): InMageRcmFabricSpecificDetails {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    physicalSiteId: item["physicalSiteId"],
    serviceEndpoint: item["serviceEndpoint"],
    serviceResourceId: item["serviceResourceId"],
    serviceContainerId: item["serviceContainerId"],
    dataPlaneUri: item["dataPlaneUri"],
    controlPlaneUri: item["controlPlaneUri"],
    sourceAgentIdentityDetails: !item["sourceAgentIdentityDetails"]
      ? item["sourceAgentIdentityDetails"]
      : identityProviderDetailsDeserializer(item["sourceAgentIdentityDetails"]),
    processServers: !item["processServers"]
      ? item["processServers"]
      : processServerDetailsArrayDeserializer(item["processServers"]),
    rcmProxies: !item["rcmProxies"]
      ? item["rcmProxies"]
      : rcmProxyDetailsArrayDeserializer(item["rcmProxies"]),
    pushInstallers: !item["pushInstallers"]
      ? item["pushInstallers"]
      : pushInstallerDetailsArrayDeserializer(item["pushInstallers"]),
    replicationAgents: !item["replicationAgents"]
      ? item["replicationAgents"]
      : replicationAgentDetailsArrayDeserializer(item["replicationAgents"]),
    reprotectAgents: !item["reprotectAgents"]
      ? item["reprotectAgents"]
      : reprotectAgentDetailsArrayDeserializer(item["reprotectAgents"]),
    marsAgents: !item["marsAgents"]
      ? item["marsAgents"]
      : marsAgentDetailsArrayDeserializer(item["marsAgents"]),
    dras: !item["dras"] ? item["dras"] : draDetailsArrayDeserializer(item["dras"]),
    agentDetails: !item["agentDetails"]
      ? item["agentDetails"]
      : agentDetailsArrayDeserializer(item["agentDetails"]),
  };
}

/** Identity provider details. */
export interface IdentityProviderDetails {
  /** The tenant Id for the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  tenantId?: string;
  /** The application/client Id for the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  applicationId?: string;
  /** The object Id of the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  objectId?: string;
  /** The intended Audience of the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  audience?: string;
  /** The base authority for Azure Active Directory authentication. */
  aadAuthority?: string;
}

export function identityProviderDetailsDeserializer(item: any): IdentityProviderDetails {
  return {
    tenantId: item["tenantId"],
    applicationId: item["applicationId"],
    objectId: item["objectId"],
    audience: item["audience"],
    aadAuthority: item["aadAuthority"],
  };
}

export function processServerDetailsArrayDeserializer(result: Array<ProcessServerDetails>): any[] {
  return result.map((item) => {
    return processServerDetailsDeserializer(item);
  });
}

/** Process server details. */
export interface ProcessServerDetails {
  /** The process server Id. */
  readonly id?: string;
  /** The process server name. */
  readonly name?: string;
  /** The process server Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The process server Fqdn. */
  readonly fqdn?: string;
  /** The list of IP addresses for communicating with the RCM component. */
  readonly ipAddresses?: string[];
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the process server. */
  readonly lastHeartbeatUtc?: Date;
  /** The total memory. */
  readonly totalMemoryInBytes?: number;
  /** The available memory. */
  readonly availableMemoryInBytes?: number;
  /** The used memory. */
  readonly usedMemoryInBytes?: number;
  /** The memory usage percentage. */
  readonly memoryUsagePercentage?: number;
  /** The total disk space. */
  readonly totalSpaceInBytes?: number;
  /** The available disk space. */
  readonly availableSpaceInBytes?: number;
  /** The used disk space. */
  readonly usedSpaceInBytes?: number;
  /** The free disk space percentage. */
  readonly freeSpacePercentage?: number;
  /** The uploading pending data in bytes. */
  readonly throughputUploadPendingDataInBytes?: number;
  /** The throughput in bytes. */
  readonly throughputInBytes?: number;
  /** The processor usage percentage. */
  readonly processorUsagePercentage?: number;
  /** The throughput status. */
  readonly throughputStatus?: RcmComponentStatus;
  /** The system load. */
  readonly systemLoad?: number;
  /** The system load status. */
  readonly systemLoadStatus?: RcmComponentStatus;
  /** The disk usage status. */
  readonly diskUsageStatus?: RcmComponentStatus;
  /** The memory usage status. */
  readonly memoryUsageStatus?: RcmComponentStatus;
  /** The processor usage status. */
  readonly processorUsageStatus?: RcmComponentStatus;
  /** The health of the process server. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
  /** The protected item count. */
  readonly protectedItemCount?: number;
  /** The historic health of the process server based on the health in last 24 hours. */
  readonly historicHealth?: ProtectionHealth;
}

export function processServerDetailsDeserializer(item: any): ProcessServerDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    totalMemoryInBytes: item["totalMemoryInBytes"],
    availableMemoryInBytes: item["availableMemoryInBytes"],
    usedMemoryInBytes: item["usedMemoryInBytes"],
    memoryUsagePercentage: item["memoryUsagePercentage"],
    totalSpaceInBytes: item["totalSpaceInBytes"],
    availableSpaceInBytes: item["availableSpaceInBytes"],
    usedSpaceInBytes: item["usedSpaceInBytes"],
    freeSpacePercentage: item["freeSpacePercentage"],
    throughputUploadPendingDataInBytes: item["throughputUploadPendingDataInBytes"],
    throughputInBytes: item["throughputInBytes"],
    processorUsagePercentage: item["processorUsagePercentage"],
    throughputStatus: item["throughputStatus"],
    systemLoad: item["systemLoad"],
    systemLoadStatus: item["systemLoadStatus"],
    diskUsageStatus: item["diskUsageStatus"],
    memoryUsageStatus: item["memoryUsageStatus"],
    processorUsageStatus: item["processorUsageStatus"],
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    protectedItemCount: item["protectedItemCount"],
    historicHealth: item["historicHealth"],
  };
}

/** The throughput status. */
export enum KnownRcmComponentStatus {
  /** Healthy */
  Healthy = "Healthy",
  /** Warning */
  Warning = "Warning",
  /** Critical */
  Critical = "Critical",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The throughput status. \
 * {@link KnownRcmComponentStatus} can be used interchangeably with RcmComponentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: Healthy \
 * **Warning**: Warning \
 * **Critical**: Critical \
 * **Unknown**: Unknown
 */
export type RcmComponentStatus = string;

/** The health. */
export enum KnownProtectionHealth {
  /** None */
  None = "None",
  /** Normal */
  Normal = "Normal",
  /** Warning */
  Warning = "Warning",
  /** Critical */
  Critical = "Critical",
}

/**
 * The health. \
 * {@link KnownProtectionHealth} can be used interchangeably with ProtectionHealth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Normal**: Normal \
 * **Warning**: Warning \
 * **Critical**: Critical
 */
export type ProtectionHealth = string;

export function rcmProxyDetailsArrayDeserializer(result: Array<RcmProxyDetails>): any[] {
  return result.map((item) => {
    return rcmProxyDetailsDeserializer(item);
  });
}

/** RCM proxy details. */
export interface RcmProxyDetails {
  /** The RCM proxy Id. */
  readonly id?: string;
  /** The RCM proxy name. */
  readonly name?: string;
  /** The RCM proxy Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The RCM proxy Fqdn. */
  readonly fqdn?: string;
  /** The client authentication type. */
  readonly clientAuthenticationType?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the RCM proxy. */
  readonly lastHeartbeatUtc?: Date;
  /** The health of the RCM proxy. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
}

export function rcmProxyDetailsDeserializer(item: any): RcmProxyDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    clientAuthenticationType: item["clientAuthenticationType"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

export function pushInstallerDetailsArrayDeserializer(result: Array<PushInstallerDetails>): any[] {
  return result.map((item) => {
    return pushInstallerDetailsDeserializer(item);
  });
}

/** Push installer details. */
export interface PushInstallerDetails {
  /** The push installer Id. */
  readonly id?: string;
  /** The push installer name. */
  readonly name?: string;
  /** The push installer Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The push installer Fqdn. */
  readonly fqdn?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the push installer. */
  readonly lastHeartbeatUtc?: Date;
  /** The health of the push installer. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
}

export function pushInstallerDetailsDeserializer(item: any): PushInstallerDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

export function replicationAgentDetailsArrayDeserializer(
  result: Array<ReplicationAgentDetails>,
): any[] {
  return result.map((item) => {
    return replicationAgentDetailsDeserializer(item);
  });
}

/** Replication agent details. */
export interface ReplicationAgentDetails {
  /** The replication agent Id. */
  readonly id?: string;
  /** The replication agent name. */
  readonly name?: string;
  /** The replication agent Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The replication agent Fqdn. */
  readonly fqdn?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the replication agent. */
  readonly lastHeartbeatUtc?: Date;
  /** The health of the replication agent. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
}

export function replicationAgentDetailsDeserializer(item: any): ReplicationAgentDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

export function reprotectAgentDetailsArrayDeserializer(
  result: Array<ReprotectAgentDetails>,
): any[] {
  return result.map((item) => {
    return reprotectAgentDetailsDeserializer(item);
  });
}

/** Reprotect agent details. */
export interface ReprotectAgentDetails {
  /** The reprotect agent Id. */
  readonly id?: string;
  /** The reprotect agent name. */
  readonly name?: string;
  /** The reprotect agent Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The reprotect agent Fqdn. */
  readonly fqdn?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the reprotect agent. */
  readonly lastHeartbeatUtc?: Date;
  /** The health of the reprotect agent. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
  /** The protected item count. */
  readonly protectedItemCount?: number;
  /** The list of accessible datastores fetched from discovery. */
  readonly accessibleDatastores?: string[];
  /** The Vcenter Id. */
  readonly vcenterId?: string;
  /** The last time when SDS information discovered in SRS. */
  readonly lastDiscoveryInUtc?: Date;
}

export function reprotectAgentDetailsDeserializer(item: any): ReprotectAgentDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    protectedItemCount: item["protectedItemCount"],
    accessibleDatastores: !item["accessibleDatastores"]
      ? item["accessibleDatastores"]
      : item["accessibleDatastores"].map((p: any) => {
          return p;
        }),
    vcenterId: item["vcenterId"],
    lastDiscoveryInUtc: !item["lastDiscoveryInUtc"]
      ? item["lastDiscoveryInUtc"]
      : new Date(item["lastDiscoveryInUtc"]),
  };
}

export function marsAgentDetailsArrayDeserializer(result: Array<MarsAgentDetails>): any[] {
  return result.map((item) => {
    return marsAgentDetailsDeserializer(item);
  });
}

/** Mars agent details. */
export interface MarsAgentDetails {
  /** The Mars agent Id. */
  readonly id?: string;
  /** The Mars agent name. */
  readonly name?: string;
  /** The Mars agent Bios Id. */
  readonly biosId?: string;
  /** The fabric object Id. */
  readonly fabricObjectId?: string;
  /** The Mars agent Fqdn. */
  readonly fqdn?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the Mars agent. */
  readonly lastHeartbeatUtc?: Date;
  /** The health of the Mars agent. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
}

export function marsAgentDetailsDeserializer(item: any): MarsAgentDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    fabricObjectId: item["fabricObjectId"],
    fqdn: item["fqdn"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

export function draDetailsArrayDeserializer(result: Array<DraDetails>): any[] {
  return result.map((item) => {
    return draDetailsDeserializer(item);
  });
}

/** DRA details. */
export interface DraDetails {
  /** The DRA Id. */
  readonly id?: string;
  /** The DRA name. */
  readonly name?: string;
  /** The DRA Bios Id. */
  readonly biosId?: string;
  /** The version. */
  readonly version?: string;
  /** The last heartbeat received from the DRA. */
  readonly lastHeartbeatUtc?: Date;
  /** The health. */
  readonly health?: ProtectionHealth;
  /** The health errors. */
  readonly healthErrors?: HealthError[];
  /** The count of protected items which are protected in forward direction. */
  readonly forwardProtectedItemCount?: number;
  /** The count of protected items which are protected in reverse direction. */
  readonly reverseProtectedItemCount?: number;
}

export function draDetailsDeserializer(item: any): DraDetails {
  return {
    id: item["id"],
    name: item["name"],
    biosId: item["biosId"],
    version: item["version"],
    lastHeartbeatUtc: !item["lastHeartbeatUtc"]
      ? item["lastHeartbeatUtc"]
      : new Date(item["lastHeartbeatUtc"]),
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    forwardProtectedItemCount: item["forwardProtectedItemCount"],
    reverseProtectedItemCount: item["reverseProtectedItemCount"],
  };
}

export function agentDetailsArrayDeserializer(result: Array<AgentDetails>): any[] {
  return result.map((item) => {
    return agentDetailsDeserializer(item);
  });
}

/** Agent details. */
export interface AgentDetails {
  /** The Id of the agent running on the server. */
  readonly agentId?: string;
  /** The Id of the machine to which the agent is registered. */
  readonly machineId?: string;
  /** The machine BIOS Id. */
  readonly biosId?: string;
  /** The machine FQDN. */
  readonly fqdn?: string;
  /** The disks. */
  readonly disks?: AgentDiskDetails[];
}

export function agentDetailsDeserializer(item: any): AgentDetails {
  return {
    agentId: item["agentId"],
    machineId: item["machineId"],
    biosId: item["biosId"],
    fqdn: item["fqdn"],
    disks: !item["disks"] ? item["disks"] : agentDiskDetailsArrayDeserializer(item["disks"]),
  };
}

export function agentDiskDetailsArrayDeserializer(result: Array<AgentDiskDetails>): any[] {
  return result.map((item) => {
    return agentDiskDetailsDeserializer(item);
  });
}

/** Agent disk details. */
export interface AgentDiskDetails {
  /** The disk Id. */
  readonly diskId?: string;
  /** The disk name. */
  readonly diskName?: string;
  /** A value indicating whether the disk is the OS disk. */
  readonly isOSDisk?: string;
  /** The disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** The lun of disk. */
  readonly lunId?: number;
}

export function agentDiskDetailsDeserializer(item: any): AgentDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    isOSDisk: item["isOSDisk"],
    capacityInBytes: item["capacityInBytes"],
    lunId: item["lunId"],
  };
}

/** VMM fabric specific details. */
export interface VmmDetails extends FabricSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMM";
}

export function vmmDetailsDeserializer(item: any): VmmDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Store the fabric details specific to the VMware fabric. */
export interface VMwareDetails extends FabricSpecificDetails {
  /** The list of Process Servers associated with the fabric. */
  processServers?: ProcessServer[];
  /** The list of Master Target servers associated with the fabric. */
  masterTargetServers?: MasterTargetServer[];
  /** The list of run as accounts created on the server. */
  runAsAccounts?: RunAsAccount[];
  /** The number of replication pairs configured in this CS. */
  replicationPairCount?: string;
  /** The number of process servers. */
  processServerCount?: string;
  /** The number of source and target servers configured to talk to this CS. */
  agentCount?: string;
  /** The number of protected servers. */
  protectedServers?: string;
  /** The percentage of the system load. */
  systemLoad?: string;
  /** The system load status. */
  systemLoadStatus?: string;
  /** The percentage of the CPU load. */
  cpuLoad?: string;
  /** The CPU load status. */
  cpuLoadStatus?: string;
  /** The total memory. */
  totalMemoryInBytes?: number;
  /** The available memory. */
  availableMemoryInBytes?: number;
  /** The memory usage status. */
  memoryUsageStatus?: string;
  /** The total space. */
  totalSpaceInBytes?: number;
  /** The available space. */
  availableSpaceInBytes?: number;
  /** The space usage status. */
  spaceUsageStatus?: string;
  /** The web load. */
  webLoad?: string;
  /** The web load status. */
  webLoadStatus?: string;
  /** The database server load. */
  databaseServerLoad?: string;
  /** The database server load status. */
  databaseServerLoadStatus?: string;
  /** The CS service status. */
  csServiceStatus?: string;
  /** The IP address. */
  ipAddress?: string;
  /** The agent Version. */
  agentVersion?: string;
  /** The host name. */
  hostName?: string;
  /** The last heartbeat received from CS server. */
  lastHeartbeat?: Date;
  /** Version status. */
  versionStatus?: string;
  /** CS SSL cert expiry date. */
  sslCertExpiryDate?: Date;
  /** CS SSL cert expiry date. */
  sslCertExpiryRemainingDays?: number;
  /** PS template version. */
  psTemplateVersion?: string;
  /** Agent expiry date. */
  agentExpiryDate?: Date;
  /** The agent version details. */
  agentVersionDetails?: VersionDetails;
  /** The switch provider blocking error information. */
  switchProviderBlockingErrorDetails?: InMageFabricSwitchProviderBlockingErrorDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMware";
}

export function vMwareDetailsDeserializer(item: any): VMwareDetails {
  return {
    instanceType: item["instanceType"],
    processServers: !item["processServers"]
      ? item["processServers"]
      : processServerArrayDeserializer(item["processServers"]),
    masterTargetServers: !item["masterTargetServers"]
      ? item["masterTargetServers"]
      : masterTargetServerArrayDeserializer(item["masterTargetServers"]),
    runAsAccounts: !item["runAsAccounts"]
      ? item["runAsAccounts"]
      : runAsAccountArrayDeserializer(item["runAsAccounts"]),
    replicationPairCount: item["replicationPairCount"],
    processServerCount: item["processServerCount"],
    agentCount: item["agentCount"],
    protectedServers: item["protectedServers"],
    systemLoad: item["systemLoad"],
    systemLoadStatus: item["systemLoadStatus"],
    cpuLoad: item["cpuLoad"],
    cpuLoadStatus: item["cpuLoadStatus"],
    totalMemoryInBytes: item["totalMemoryInBytes"],
    availableMemoryInBytes: item["availableMemoryInBytes"],
    memoryUsageStatus: item["memoryUsageStatus"],
    totalSpaceInBytes: item["totalSpaceInBytes"],
    availableSpaceInBytes: item["availableSpaceInBytes"],
    spaceUsageStatus: item["spaceUsageStatus"],
    webLoad: item["webLoad"],
    webLoadStatus: item["webLoadStatus"],
    databaseServerLoad: item["databaseServerLoad"],
    databaseServerLoadStatus: item["databaseServerLoadStatus"],
    csServiceStatus: item["csServiceStatus"],
    ipAddress: item["ipAddress"],
    agentVersion: item["agentVersion"],
    hostName: item["hostName"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    versionStatus: item["versionStatus"],
    sslCertExpiryDate: !item["sslCertExpiryDate"]
      ? item["sslCertExpiryDate"]
      : new Date(item["sslCertExpiryDate"]),
    sslCertExpiryRemainingDays: item["sslCertExpiryRemainingDays"],
    psTemplateVersion: item["psTemplateVersion"],
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
    agentVersionDetails: !item["agentVersionDetails"]
      ? item["agentVersionDetails"]
      : versionDetailsDeserializer(item["agentVersionDetails"]),
    switchProviderBlockingErrorDetails: !item["switchProviderBlockingErrorDetails"]
      ? item["switchProviderBlockingErrorDetails"]
      : inMageFabricSwitchProviderBlockingErrorDetailsArrayDeserializer(
          item["switchProviderBlockingErrorDetails"],
        ),
  };
}

export function processServerArrayDeserializer(result: Array<ProcessServer>): any[] {
  return result.map((item) => {
    return processServerDeserializer(item);
  });
}

/** Details of the Process Server. */
export interface ProcessServer {
  /** The Process Server's friendly name. */
  friendlyName?: string;
  /** The Process Server Id. */
  id?: string;
  /** The IP address of the server. */
  ipAddress?: string;
  /** The OS type of the server. */
  osType?: string;
  /** The version of the scout component on the server. */
  agentVersion?: string;
  /** The last heartbeat received from the server. */
  lastHeartbeat?: Date;
  /** Version status. */
  versionStatus?: string;
  /** The list of the mobility service updates available on the Process Server. */
  mobilityServiceUpdates?: MobilityServiceUpdate[];
  /** The agent generated Id. */
  hostId?: string;
  /** The servers configured with this PS. */
  machineCount?: string;
  /** The number of replication pairs configured in this PS. */
  replicationPairCount?: string;
  /** The percentage of the system load. */
  systemLoad?: string;
  /** The system load status. */
  systemLoadStatus?: string;
  /** The percentage of the CPU load. */
  cpuLoad?: string;
  /** The CPU load status. */
  cpuLoadStatus?: string;
  /** The total memory. */
  totalMemoryInBytes?: number;
  /** The available memory. */
  availableMemoryInBytes?: number;
  /** The memory usage status. */
  memoryUsageStatus?: string;
  /** The total space. */
  totalSpaceInBytes?: number;
  /** The available space. */
  availableSpaceInBytes?: number;
  /** The space usage status. */
  spaceUsageStatus?: string;
  /** The PS service status. */
  psServiceStatus?: string;
  /** The PS SSL cert expiry date. */
  sslCertExpiryDate?: Date;
  /** CS SSL cert expiry date. */
  sslCertExpiryRemainingDays?: number;
  /** OS Version of the process server. Note: This will get populated if user has CS version greater than 9.12.0.0. */
  osVersion?: string;
  /** Health errors. */
  healthErrors?: HealthError[];
  /** Agent expiry date. */
  agentExpiryDate?: Date;
  /** The agent version details. */
  agentVersionDetails?: VersionDetails;
  /** The health of Process Server. */
  readonly health?: ProtectionHealth;
  /** The process server stats refresh time. */
  readonly psStatsRefreshTime?: Date;
  /** The uploading pending data in bytes. */
  readonly throughputUploadPendingDataInBytes?: number;
  /** The throughput in MBps. */
  readonly throughputInMBps?: number;
  /** The throughput in bytes. */
  readonly throughputInBytes?: number;
  /** The throughput status. */
  readonly throughputStatus?: string;
  /** The MARS communication status. */
  readonly marsCommunicationStatus?: string;
  /** The MARS registration status. */
  readonly marsRegistrationStatus?: string;
}

export function processServerDeserializer(item: any): ProcessServer {
  return {
    friendlyName: item["friendlyName"],
    id: item["id"],
    ipAddress: item["ipAddress"],
    osType: item["osType"],
    agentVersion: item["agentVersion"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    versionStatus: item["versionStatus"],
    mobilityServiceUpdates: !item["mobilityServiceUpdates"]
      ? item["mobilityServiceUpdates"]
      : mobilityServiceUpdateArrayDeserializer(item["mobilityServiceUpdates"]),
    hostId: item["hostId"],
    machineCount: item["machineCount"],
    replicationPairCount: item["replicationPairCount"],
    systemLoad: item["systemLoad"],
    systemLoadStatus: item["systemLoadStatus"],
    cpuLoad: item["cpuLoad"],
    cpuLoadStatus: item["cpuLoadStatus"],
    totalMemoryInBytes: item["totalMemoryInBytes"],
    availableMemoryInBytes: item["availableMemoryInBytes"],
    memoryUsageStatus: item["memoryUsageStatus"],
    totalSpaceInBytes: item["totalSpaceInBytes"],
    availableSpaceInBytes: item["availableSpaceInBytes"],
    spaceUsageStatus: item["spaceUsageStatus"],
    psServiceStatus: item["psServiceStatus"],
    sslCertExpiryDate: !item["sslCertExpiryDate"]
      ? item["sslCertExpiryDate"]
      : new Date(item["sslCertExpiryDate"]),
    sslCertExpiryRemainingDays: item["sslCertExpiryRemainingDays"],
    osVersion: item["osVersion"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
    agentVersionDetails: !item["agentVersionDetails"]
      ? item["agentVersionDetails"]
      : versionDetailsDeserializer(item["agentVersionDetails"]),
    health: item["health"],
    psStatsRefreshTime: !item["psStatsRefreshTime"]
      ? item["psStatsRefreshTime"]
      : new Date(item["psStatsRefreshTime"]),
    throughputUploadPendingDataInBytes: item["throughputUploadPendingDataInBytes"],
    throughputInMBps: item["throughputInMBps"],
    throughputInBytes: item["throughputInBytes"],
    throughputStatus: item["throughputStatus"],
    marsCommunicationStatus: item["marsCommunicationStatus"],
    marsRegistrationStatus: item["marsRegistrationStatus"],
  };
}

export function mobilityServiceUpdateArrayDeserializer(
  result: Array<MobilityServiceUpdate>,
): any[] {
  return result.map((item) => {
    return mobilityServiceUpdateDeserializer(item);
  });
}

/** The Mobility Service update details. */
export interface MobilityServiceUpdate {
  /** The version of the latest update. */
  version?: string;
  /** The reboot status of the update - whether it is required or not. */
  rebootStatus?: string;
  /** The OS type. */
  osType?: string;
}

export function mobilityServiceUpdateDeserializer(item: any): MobilityServiceUpdate {
  return {
    version: item["version"],
    rebootStatus: item["rebootStatus"],
    osType: item["osType"],
  };
}

/** Version related details. */
export interface VersionDetails {
  /** The agent version. */
  version?: string;
  /** Version expiry date. */
  expiryDate?: Date;
  /** A value indicating whether security update required. */
  status?: AgentVersionStatus;
}

export function versionDetailsDeserializer(item: any): VersionDetails {
  return {
    version: item["version"],
    expiryDate: !item["expiryDate"] ? item["expiryDate"] : new Date(item["expiryDate"]),
    status: item["status"],
  };
}

/** A value indicating whether security update required. */
export enum KnownAgentVersionStatus {
  /** Supported */
  Supported = "Supported",
  /** NotSupported */
  NotSupported = "NotSupported",
  /** Deprecated */
  Deprecated = "Deprecated",
  /** UpdateRequired */
  UpdateRequired = "UpdateRequired",
  /** SecurityUpdateRequired */
  SecurityUpdateRequired = "SecurityUpdateRequired",
}

/**
 * A value indicating whether security update required. \
 * {@link KnownAgentVersionStatus} can be used interchangeably with AgentVersionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Supported**: Supported \
 * **NotSupported**: NotSupported \
 * **Deprecated**: Deprecated \
 * **UpdateRequired**: UpdateRequired \
 * **SecurityUpdateRequired**: SecurityUpdateRequired
 */
export type AgentVersionStatus = string;

export function masterTargetServerArrayDeserializer(result: Array<MasterTargetServer>): any[] {
  return result.map((item) => {
    return masterTargetServerDeserializer(item);
  });
}

/** Details of a Master Target Server. */
export interface MasterTargetServer {
  /** The server Id. */
  id?: string;
  /** The IP address of the server. */
  ipAddress?: string;
  /** The server name. */
  name?: string;
  /** The OS type of the server. */
  osType?: string;
  /** The version of the scout component on the server. */
  agentVersion?: string;
  /** The last heartbeat received from the server. */
  lastHeartbeat?: Date;
  /** Version status. */
  versionStatus?: string;
  /** The retention volumes of Master target Server. */
  retentionVolumes?: RetentionVolume[];
  /** The list of data stores in the fabric. */
  dataStores?: DataStore[];
  /** Validation errors. */
  validationErrors?: HealthError[];
  /** Health errors. */
  healthErrors?: HealthError[];
  /** Disk count of the master target. */
  diskCount?: number;
  /** OS Version of the master target. */
  osVersion?: string;
  /** Agent expiry date. */
  agentExpiryDate?: Date;
  /** MARS agent version. */
  marsAgentVersion?: string;
  /** MARS agent expiry date. */
  marsAgentExpiryDate?: Date;
  /** Agent version details. */
  agentVersionDetails?: VersionDetails;
  /** Mars agent version details. */
  marsAgentVersionDetails?: VersionDetails;
}

export function masterTargetServerDeserializer(item: any): MasterTargetServer {
  return {
    id: item["id"],
    ipAddress: item["ipAddress"],
    name: item["name"],
    osType: item["osType"],
    agentVersion: item["agentVersion"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    versionStatus: item["versionStatus"],
    retentionVolumes: !item["retentionVolumes"]
      ? item["retentionVolumes"]
      : retentionVolumeArrayDeserializer(item["retentionVolumes"]),
    dataStores: !item["dataStores"]
      ? item["dataStores"]
      : dataStoreArrayDeserializer(item["dataStores"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : healthErrorArrayDeserializer(item["validationErrors"]),
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    diskCount: item["diskCount"],
    osVersion: item["osVersion"],
    agentExpiryDate: !item["agentExpiryDate"]
      ? item["agentExpiryDate"]
      : new Date(item["agentExpiryDate"]),
    marsAgentVersion: item["marsAgentVersion"],
    marsAgentExpiryDate: !item["marsAgentExpiryDate"]
      ? item["marsAgentExpiryDate"]
      : new Date(item["marsAgentExpiryDate"]),
    agentVersionDetails: !item["agentVersionDetails"]
      ? item["agentVersionDetails"]
      : versionDetailsDeserializer(item["agentVersionDetails"]),
    marsAgentVersionDetails: !item["marsAgentVersionDetails"]
      ? item["marsAgentVersionDetails"]
      : versionDetailsDeserializer(item["marsAgentVersionDetails"]),
  };
}

export function retentionVolumeArrayDeserializer(result: Array<RetentionVolume>): any[] {
  return result.map((item) => {
    return retentionVolumeDeserializer(item);
  });
}

/** The retention details of the MT. */
export interface RetentionVolume {
  /** The volume name. */
  volumeName?: string;
  /** The volume capacity. */
  capacityInBytes?: number;
  /** The free space available in this volume. */
  freeSpaceInBytes?: number;
  /** The threshold percentage. */
  thresholdPercentage?: number;
}

export function retentionVolumeDeserializer(item: any): RetentionVolume {
  return {
    volumeName: item["volumeName"],
    capacityInBytes: item["capacityInBytes"],
    freeSpaceInBytes: item["freeSpaceInBytes"],
    thresholdPercentage: item["thresholdPercentage"],
  };
}

export function dataStoreArrayDeserializer(result: Array<DataStore>): any[] {
  return result.map((item) => {
    return dataStoreDeserializer(item);
  });
}

/** The datastore details of the MT. */
export interface DataStore {
  /** The symbolic name of data store. */
  symbolicName?: string;
  /** The uuid of data store. */
  uuid?: string;
  /** The capacity of data store in GBs. */
  capacity?: string;
  /** The free space of data store in GBs. */
  freeSpace?: string;
  /** The type of data store. */
  type?: string;
}

export function dataStoreDeserializer(item: any): DataStore {
  return {
    symbolicName: item["symbolicName"],
    uuid: item["uuid"],
    capacity: item["capacity"],
    freeSpace: item["freeSpace"],
    type: item["type"],
  };
}

export function runAsAccountArrayDeserializer(result: Array<RunAsAccount>): any[] {
  return result.map((item) => {
    return runAsAccountDeserializer(item);
  });
}

/** CS Accounts Details. */
export interface RunAsAccount {
  /** The CS RunAs account Id. */
  accountId?: string;
  /** The CS RunAs account name. */
  accountName?: string;
}

export function runAsAccountDeserializer(item: any): RunAsAccount {
  return {
    accountId: item["accountId"],
    accountName: item["accountName"],
  };
}

export function inMageFabricSwitchProviderBlockingErrorDetailsArrayDeserializer(
  result: Array<InMageFabricSwitchProviderBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageFabricSwitchProviderBlockingErrorDetailsDeserializer(item);
  });
}

/** InMageFabric switch provider blocking error details. */
export interface InMageFabricSwitchProviderBlockingErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
  /** The error message parameters. */
  readonly errorMessageParameters?: Record<string, string>;
  /** The error tags. */
  readonly errorTags?: Record<string, string>;
}

export function inMageFabricSwitchProviderBlockingErrorDetailsDeserializer(
  item: any,
): InMageFabricSwitchProviderBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** VMwareV2 fabric specific details. */
export interface VMwareV2FabricSpecificDetails extends FabricSpecificDetails {
  /** The ARM Id of the VMware site. */
  readonly vmwareSiteId?: string;
  /** The ARM Id of the physical site. */
  readonly physicalSiteId?: string;
  /** The Migration solution ARM Id. */
  readonly migrationSolutionId?: string;
  /** The service endpoint. */
  readonly serviceEndpoint?: string;
  /** The service resource Id. */
  readonly serviceResourceId?: string;
  /** The service container Id. */
  readonly serviceContainerId?: string;
  /** The list of process servers. */
  readonly processServers?: ProcessServerDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMwareV2";
}

export function vMwareV2FabricSpecificDetailsDeserializer(
  item: any,
): VMwareV2FabricSpecificDetails {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    physicalSiteId: item["physicalSiteId"],
    migrationSolutionId: item["migrationSolutionId"],
    serviceEndpoint: item["serviceEndpoint"],
    serviceResourceId: item["serviceResourceId"],
    serviceContainerId: item["serviceContainerId"],
    processServers: !item["processServers"]
      ? item["processServers"]
      : processServerDetailsArrayDeserializer(item["processServers"]),
  };
}

/** Site details provided during the time of site creation. */
export interface FabricCreationInput {
  /** Fabric creation input. */
  properties?: FabricCreationInputProperties;
}

export function fabricCreationInputSerializer(item: FabricCreationInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fabricCreationInputPropertiesSerializer(item["properties"]),
  };
}

/** Properties of site details provided during the time of site creation. */
export interface FabricCreationInputProperties {
  /** Fabric provider specific creation input. */
  customDetails?: FabricSpecificCreationInputUnion;
}

export function fabricCreationInputPropertiesSerializer(item: FabricCreationInputProperties): any {
  return {
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : fabricSpecificCreationInputUnionSerializer(item["customDetails"]),
  };
}

/** Fabric provider specific settings. */
export interface FabricSpecificCreationInput {
  /** Gets the class type. */
  /** The discriminator possible values: Azure, InMageRcm, VMwareV2 */
  instanceType: string;
}

export function fabricSpecificCreationInputSerializer(item: FabricSpecificCreationInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for FabricSpecificCreationInputUnion */
export type FabricSpecificCreationInputUnion =
  | AzureFabricCreationInput
  | InMageRcmFabricCreationInput
  | VMwareV2FabricCreationInput
  | FabricSpecificCreationInput;

export function fabricSpecificCreationInputUnionSerializer(
  item: FabricSpecificCreationInputUnion,
): any {
  switch (item.instanceType) {
    case "Azure":
      return azureFabricCreationInputSerializer(item as AzureFabricCreationInput);

    case "InMageRcm":
      return inMageRcmFabricCreationInputSerializer(item as InMageRcmFabricCreationInput);

    case "VMwareV2":
      return vMwareV2FabricCreationInputSerializer(item as VMwareV2FabricCreationInput);

    default:
      return fabricSpecificCreationInputSerializer(item);
  }
}

/** Fabric provider specific settings. */
export interface AzureFabricCreationInput extends FabricSpecificCreationInput {
  /** The Location. */
  location?: string;
  /** Gets the class type. */
  instanceType: "Azure";
}

export function azureFabricCreationInputSerializer(item: AzureFabricCreationInput): any {
  return { instanceType: item["instanceType"], location: item["location"] };
}

/** InMageRcm fabric provider specific settings. */
export interface InMageRcmFabricCreationInput extends FabricSpecificCreationInput {
  /** The ARM Id of the VMware site. */
  vmwareSiteId: string;
  /** The ARM Id of the physical site. */
  physicalSiteId: string;
  /** The identity provider input for source agent authentication. */
  sourceAgentIdentity: IdentityProviderInput;
  /** Gets the class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmFabricCreationInputSerializer(item: InMageRcmFabricCreationInput): any {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    physicalSiteId: item["physicalSiteId"],
    sourceAgentIdentity: identityProviderInputSerializer(item["sourceAgentIdentity"]),
  };
}

/** Identity provider input. */
export interface IdentityProviderInput {
  /** The tenant Id for the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  tenantId: string;
  /** The application/client Id for the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  applicationId: string;
  /** The object Id of the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  objectId: string;
  /** The intended Audience of the service principal with which the on-premise management/data plane components would communicate with our Azure services. */
  audience: string;
  /** The base authority for Azure Active Directory authentication. */
  aadAuthority: string;
}

export function identityProviderInputSerializer(item: IdentityProviderInput): any {
  return {
    tenantId: item["tenantId"],
    applicationId: item["applicationId"],
    objectId: item["objectId"],
    audience: item["audience"],
    aadAuthority: item["aadAuthority"],
  };
}

/** VMwareV2 fabric provider specific settings. */
export interface VMwareV2FabricCreationInput extends FabricSpecificCreationInput {
  /** The ARM Id of the VMware site. */
  vmwareSiteId?: string;
  /** The ARM Id of the physical site. */
  physicalSiteId?: string;
  /** The ARM Id of the migration solution. */
  migrationSolutionId: string;
  /** Gets the class type. */
  instanceType: "VMwareV2";
}

export function vMwareV2FabricCreationInputSerializer(item: VMwareV2FabricCreationInput): any {
  return {
    instanceType: item["instanceType"],
    vmwareSiteId: item["vmwareSiteId"],
    physicalSiteId: item["physicalSiteId"],
    migrationSolutionId: item["migrationSolutionId"],
  };
}

/** Collection of fabric details. */
export interface _FabricCollection {
  /** The Fabric items on this page */
  value: Fabric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fabricCollectionDeserializer(item: any): _FabricCollection {
  return {
    value: fabricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fabricArrayDeserializer(result: Array<Fabric>): any[] {
  return result.map((item) => {
    return fabricDeserializer(item);
  });
}

/** Request to failover a process server. */
export interface FailoverProcessServerRequest {
  /** The properties of the PS Failover request. */
  properties?: FailoverProcessServerRequestProperties;
}

export function failoverProcessServerRequestSerializer(item: FailoverProcessServerRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : failoverProcessServerRequestPropertiesSerializer(item["properties"]),
  };
}

/** The properties of the Failover Process Server request. */
export interface FailoverProcessServerRequestProperties {
  /** The container identifier. */
  containerName?: string;
  /** The source process server. */
  sourceProcessServerId?: string;
  /** The new process server. */
  targetProcessServerId?: string;
  /** The VMS to migrate. */
  vmsToMigrate?: string[];
  /** A value for failover type. It can be systemlevel/serverlevel. */
  updateType?: string;
}

export function failoverProcessServerRequestPropertiesSerializer(
  item: FailoverProcessServerRequestProperties,
): any {
  return {
    containerName: item["containerName"],
    sourceProcessServerId: item["sourceProcessServerId"],
    targetProcessServerId: item["targetProcessServerId"],
    vmsToMigrate: !item["vmsToMigrate"]
      ? item["vmsToMigrate"]
      : item["vmsToMigrate"].map((p: any) => {
          return p;
        }),
    updateType: item["updateType"],
  };
}

/** Certificate renewal input. */
export interface RenewCertificateInput {
  /** Renew certificate input properties. */
  properties?: RenewCertificateInputProperties;
}

export function renewCertificateInputSerializer(item: RenewCertificateInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : renewCertificateInputPropertiesSerializer(item["properties"]),
  };
}

/** Renew Certificate input properties. */
export interface RenewCertificateInputProperties {
  /** Renew certificate type. */
  renewCertificateType?: string;
}

export function renewCertificateInputPropertiesSerializer(
  item: RenewCertificateInputProperties,
): any {
  return { renewCertificateType: item["renewCertificateType"] };
}

/** Logical network data model. */
export interface LogicalNetwork extends ProxyResource {
  /** The Logical Network Properties. */
  properties?: LogicalNetworkProperties;
  /** Resource Location */
  location?: string;
}

export function logicalNetworkDeserializer(item: any): LogicalNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : logicalNetworkPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Logical Network Properties. */
export interface LogicalNetworkProperties {
  /** The Friendly Name. */
  friendlyName?: string;
  /** A value indicating whether Network Virtualization is enabled for the logical network. */
  networkVirtualizationStatus?: string;
  /** A value indicating whether logical network is used as private test network by test failover. */
  logicalNetworkUsage?: string;
  /** A value indicating whether logical network definitions are isolated. */
  logicalNetworkDefinitionsStatus?: string;
}

export function logicalNetworkPropertiesDeserializer(item: any): LogicalNetworkProperties {
  return {
    friendlyName: item["friendlyName"],
    networkVirtualizationStatus: item["networkVirtualizationStatus"],
    logicalNetworkUsage: item["logicalNetworkUsage"],
    logicalNetworkDefinitionsStatus: item["logicalNetworkDefinitionsStatus"],
  };
}

/** List of logical networks. */
export interface _LogicalNetworkCollection {
  /** The LogicalNetwork items on this page */
  value: LogicalNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logicalNetworkCollectionDeserializer(item: any): _LogicalNetworkCollection {
  return {
    value: logicalNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logicalNetworkArrayDeserializer(result: Array<LogicalNetwork>): any[] {
  return result.map((item) => {
    return logicalNetworkDeserializer(item);
  });
}

/** Network model. */
export interface Network extends ProxyResource {
  /** The Network Properties. */
  properties?: NetworkProperties;
  /** Resource Location */
  location?: string;
}

export function networkDeserializer(item: any): Network {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Network Properties. */
export interface NetworkProperties {
  /** The Fabric Type. */
  fabricType?: string;
  /** The List of subnets. */
  subnets?: Subnet[];
  /** The Friendly Name. */
  friendlyName?: string;
  /** The Network Type. */
  networkType?: string;
}

export function networkPropertiesDeserializer(item: any): NetworkProperties {
  return {
    fabricType: item["fabricType"],
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    friendlyName: item["friendlyName"],
    networkType: item["networkType"],
  };
}

export function subnetArrayDeserializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetDeserializer(item);
  });
}

/** Subnets of the network. */
export interface Subnet {
  /** The subnet name. */
  name?: string;
  /** The subnet friendly name. */
  friendlyName?: string;
  /** The list of addresses for the subnet. */
  addressList?: string[];
}

export function subnetDeserializer(item: any): Subnet {
  return {
    name: item["name"],
    friendlyName: item["friendlyName"],
    addressList: !item["addressList"]
      ? item["addressList"]
      : item["addressList"].map((p: any) => {
          return p;
        }),
  };
}

/** List of networks. */
export interface _NetworkCollection {
  /** The Network items on this page */
  value: Network[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkCollectionDeserializer(item: any): _NetworkCollection {
  return {
    value: networkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkArrayDeserializer(result: Array<Network>): any[] {
  return result.map((item) => {
    return networkDeserializer(item);
  });
}

/** Network Mapping model. Ideally it should have been possible to inherit this class from prev version in InheritedModels as long as there is no difference in structure or method signature. Since there were no base Models for certain fields and methods viz NetworkMappingProperties and Load with required return type, the class has been introduced in its entirety with references to base models to facilitate extensions in subsequent versions. */
export interface NetworkMapping extends ProxyResource {
  /** The Network Mapping Properties. */
  properties?: NetworkMappingProperties;
  /** Resource Location */
  location?: string;
}

export function networkMappingDeserializer(item: any): NetworkMapping {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkMappingPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Network Mapping Properties. */
export interface NetworkMappingProperties {
  /** The pairing state for network mapping. */
  state?: string;
  /** The primary network friendly name. */
  primaryNetworkFriendlyName?: string;
  /** The primary network id for network mapping. */
  primaryNetworkId?: string;
  /** The primary fabric friendly name. */
  primaryFabricFriendlyName?: string;
  /** The recovery network friendly name. */
  recoveryNetworkFriendlyName?: string;
  /** The recovery network id for network mapping. */
  recoveryNetworkId?: string;
  /** The recovery fabric ARM id. */
  recoveryFabricArmId?: string;
  /** The recovery fabric friendly name. */
  recoveryFabricFriendlyName?: string;
  /** The fabric specific settings. */
  fabricSpecificSettings?: NetworkMappingFabricSpecificSettingsUnion;
}

export function networkMappingPropertiesDeserializer(item: any): NetworkMappingProperties {
  return {
    state: item["state"],
    primaryNetworkFriendlyName: item["primaryNetworkFriendlyName"],
    primaryNetworkId: item["primaryNetworkId"],
    primaryFabricFriendlyName: item["primaryFabricFriendlyName"],
    recoveryNetworkFriendlyName: item["recoveryNetworkFriendlyName"],
    recoveryNetworkId: item["recoveryNetworkId"],
    recoveryFabricArmId: item["recoveryFabricArmId"],
    recoveryFabricFriendlyName: item["recoveryFabricFriendlyName"],
    fabricSpecificSettings: !item["fabricSpecificSettings"]
      ? item["fabricSpecificSettings"]
      : networkMappingFabricSpecificSettingsUnionDeserializer(item["fabricSpecificSettings"]),
  };
}

/** Network Mapping fabric specific settings. */
export interface NetworkMappingFabricSpecificSettings {
  /** Gets the Instance type. */
  /** The discriminator possible values: AzureToAzure, VmmToAzure, VmmToVmm */
  instanceType: string;
}

export function networkMappingFabricSpecificSettingsDeserializer(
  item: any,
): NetworkMappingFabricSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for NetworkMappingFabricSpecificSettingsUnion */
export type NetworkMappingFabricSpecificSettingsUnion =
  | AzureToAzureNetworkMappingSettings
  | VmmToAzureNetworkMappingSettings
  | VmmToVmmNetworkMappingSettings
  | NetworkMappingFabricSpecificSettings;

export function networkMappingFabricSpecificSettingsUnionDeserializer(
  item: any,
): NetworkMappingFabricSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "AzureToAzure":
      return azureToAzureNetworkMappingSettingsDeserializer(
        item as AzureToAzureNetworkMappingSettings,
      );

    case "VmmToAzure":
      return vmmToAzureNetworkMappingSettingsDeserializer(item as VmmToAzureNetworkMappingSettings);

    case "VmmToVmm":
      return vmmToVmmNetworkMappingSettingsDeserializer(item as VmmToVmmNetworkMappingSettings);

    default:
      return networkMappingFabricSpecificSettingsDeserializer(item);
  }
}

/** A2A Network Mapping fabric specific settings. */
export interface AzureToAzureNetworkMappingSettings extends NetworkMappingFabricSpecificSettings {
  /** The primary fabric location. */
  primaryFabricLocation?: string;
  /** The recovery fabric location. */
  recoveryFabricLocation?: string;
  /** Gets the Instance type. */
  instanceType: "AzureToAzure";
}

export function azureToAzureNetworkMappingSettingsDeserializer(
  item: any,
): AzureToAzureNetworkMappingSettings {
  return {
    instanceType: item["instanceType"],
    primaryFabricLocation: item["primaryFabricLocation"],
    recoveryFabricLocation: item["recoveryFabricLocation"],
  };
}

/** E2A Network Mapping fabric specific settings. */
export interface VmmToAzureNetworkMappingSettings extends NetworkMappingFabricSpecificSettings {
  /** Gets the Instance type. */
  instanceType: "VmmToAzure";
}

export function vmmToAzureNetworkMappingSettingsDeserializer(
  item: any,
): VmmToAzureNetworkMappingSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** E2E Network Mapping fabric specific settings. */
export interface VmmToVmmNetworkMappingSettings extends NetworkMappingFabricSpecificSettings {
  /** Gets the Instance type. */
  instanceType: "VmmToVmm";
}

export function vmmToVmmNetworkMappingSettingsDeserializer(
  item: any,
): VmmToVmmNetworkMappingSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Create network mappings input. */
export interface CreateNetworkMappingInput {
  /** Input properties for creating network mapping. */
  properties: CreateNetworkMappingInputProperties;
}

export function createNetworkMappingInputSerializer(item: CreateNetworkMappingInput): any {
  return { properties: createNetworkMappingInputPropertiesSerializer(item["properties"]) };
}

/** Common input details for network mapping operation. */
export interface CreateNetworkMappingInputProperties {
  /** Recovery fabric Name. */
  recoveryFabricName?: string;
  /** Recovery network Id. */
  recoveryNetworkId: string;
  /** Fabric specific input properties. */
  fabricSpecificDetails?: FabricSpecificCreateNetworkMappingInputUnion;
}

export function createNetworkMappingInputPropertiesSerializer(
  item: CreateNetworkMappingInputProperties,
): any {
  return {
    recoveryFabricName: item["recoveryFabricName"],
    recoveryNetworkId: item["recoveryNetworkId"],
    fabricSpecificDetails: !item["fabricSpecificDetails"]
      ? item["fabricSpecificDetails"]
      : fabricSpecificCreateNetworkMappingInputUnionSerializer(item["fabricSpecificDetails"]),
  };
}

/** Input details specific to fabrics during Network Mapping. */
export interface FabricSpecificCreateNetworkMappingInput {
  /** The instance type. */
  /** The discriminator possible values: AzureToAzure, VmmToAzure, VmmToVmm */
  instanceType: string;
}

export function fabricSpecificCreateNetworkMappingInputSerializer(
  item: FabricSpecificCreateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for FabricSpecificCreateNetworkMappingInputUnion */
export type FabricSpecificCreateNetworkMappingInputUnion =
  | AzureToAzureCreateNetworkMappingInput
  | VmmToAzureCreateNetworkMappingInput
  | VmmToVmmCreateNetworkMappingInput
  | FabricSpecificCreateNetworkMappingInput;

export function fabricSpecificCreateNetworkMappingInputUnionSerializer(
  item: FabricSpecificCreateNetworkMappingInputUnion,
): any {
  switch (item.instanceType) {
    case "AzureToAzure":
      return azureToAzureCreateNetworkMappingInputSerializer(
        item as AzureToAzureCreateNetworkMappingInput,
      );

    case "VmmToAzure":
      return vmmToAzureCreateNetworkMappingInputSerializer(
        item as VmmToAzureCreateNetworkMappingInput,
      );

    case "VmmToVmm":
      return vmmToVmmCreateNetworkMappingInputSerializer(item as VmmToVmmCreateNetworkMappingInput);

    default:
      return fabricSpecificCreateNetworkMappingInputSerializer(item);
  }
}

/** Create network mappings input properties/behavior specific to Azure to Azure Network mapping. */
export interface AzureToAzureCreateNetworkMappingInput extends FabricSpecificCreateNetworkMappingInput {
  /** The primary azure vnet Id. */
  primaryNetworkId: string;
  /** The instance type. */
  instanceType: "AzureToAzure";
}

export function azureToAzureCreateNetworkMappingInputSerializer(
  item: AzureToAzureCreateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"], primaryNetworkId: item["primaryNetworkId"] };
}

/** Create network mappings input properties/behavior specific to Vmm to Azure Network mapping. */
export interface VmmToAzureCreateNetworkMappingInput extends FabricSpecificCreateNetworkMappingInput {
  /** The instance type. */
  instanceType: "VmmToAzure";
}

export function vmmToAzureCreateNetworkMappingInputSerializer(
  item: VmmToAzureCreateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Create network mappings input properties/behavior specific to vmm to vmm Network mapping. */
export interface VmmToVmmCreateNetworkMappingInput extends FabricSpecificCreateNetworkMappingInput {
  /** The instance type. */
  instanceType: "VmmToVmm";
}

export function vmmToVmmCreateNetworkMappingInputSerializer(
  item: VmmToVmmCreateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Update network mapping input. */
export interface UpdateNetworkMappingInput {
  /** The input properties needed to update network mapping. */
  properties?: UpdateNetworkMappingInputProperties;
}

export function updateNetworkMappingInputSerializer(item: UpdateNetworkMappingInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateNetworkMappingInputPropertiesSerializer(item["properties"]),
  };
}

/** Common input details for network mapping operation. */
export interface UpdateNetworkMappingInputProperties {
  /** Recovery fabric name. */
  recoveryFabricName?: string;
  /** Recovery network Id. */
  recoveryNetworkId?: string;
  /** Fabrics specific input network Id. */
  fabricSpecificDetails?: FabricSpecificUpdateNetworkMappingInputUnion;
}

export function updateNetworkMappingInputPropertiesSerializer(
  item: UpdateNetworkMappingInputProperties,
): any {
  return {
    recoveryFabricName: item["recoveryFabricName"],
    recoveryNetworkId: item["recoveryNetworkId"],
    fabricSpecificDetails: !item["fabricSpecificDetails"]
      ? item["fabricSpecificDetails"]
      : fabricSpecificUpdateNetworkMappingInputUnionSerializer(item["fabricSpecificDetails"]),
  };
}

/** Input details specific to fabrics during Network Mapping. */
export interface FabricSpecificUpdateNetworkMappingInput {
  /** The instance type. */
  /** The discriminator possible values: AzureToAzure, VmmToAzure, VmmToVmm */
  instanceType: string;
}

export function fabricSpecificUpdateNetworkMappingInputSerializer(
  item: FabricSpecificUpdateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for FabricSpecificUpdateNetworkMappingInputUnion */
export type FabricSpecificUpdateNetworkMappingInputUnion =
  | AzureToAzureUpdateNetworkMappingInput
  | VmmToAzureUpdateNetworkMappingInput
  | VmmToVmmUpdateNetworkMappingInput
  | FabricSpecificUpdateNetworkMappingInput;

export function fabricSpecificUpdateNetworkMappingInputUnionSerializer(
  item: FabricSpecificUpdateNetworkMappingInputUnion,
): any {
  switch (item.instanceType) {
    case "AzureToAzure":
      return azureToAzureUpdateNetworkMappingInputSerializer(
        item as AzureToAzureUpdateNetworkMappingInput,
      );

    case "VmmToAzure":
      return vmmToAzureUpdateNetworkMappingInputSerializer(
        item as VmmToAzureUpdateNetworkMappingInput,
      );

    case "VmmToVmm":
      return vmmToVmmUpdateNetworkMappingInputSerializer(item as VmmToVmmUpdateNetworkMappingInput);

    default:
      return fabricSpecificUpdateNetworkMappingInputSerializer(item);
  }
}

/** Updates network mappings input. */
export interface AzureToAzureUpdateNetworkMappingInput extends FabricSpecificUpdateNetworkMappingInput {
  /** The primary azure vnet Id. */
  primaryNetworkId?: string;
  /** The instance type. */
  instanceType: "AzureToAzure";
}

export function azureToAzureUpdateNetworkMappingInputSerializer(
  item: AzureToAzureUpdateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"], primaryNetworkId: item["primaryNetworkId"] };
}

/** Update network mappings input properties/behavior specific to vmm to azure. */
export interface VmmToAzureUpdateNetworkMappingInput extends FabricSpecificUpdateNetworkMappingInput {
  /** The instance type. */
  instanceType: "VmmToAzure";
}

export function vmmToAzureUpdateNetworkMappingInputSerializer(
  item: VmmToAzureUpdateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Update network mappings input properties/behavior specific to vmm to vmm. */
export interface VmmToVmmUpdateNetworkMappingInput extends FabricSpecificUpdateNetworkMappingInput {
  /** The instance type. */
  instanceType: "VmmToVmm";
}

export function vmmToVmmUpdateNetworkMappingInputSerializer(
  item: VmmToVmmUpdateNetworkMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** List of network mappings. As with NetworkMapping, it should be possible to reuse a prev version of this class. It doesn't seem likely this class could be anything more than a slightly bespoke collection of NetworkMapping. Hence it makes sense to override Load with Base.NetworkMapping instead of existing CurrentVersion.NetworkMapping. */
export interface _NetworkMappingCollection {
  /** The NetworkMapping items on this page */
  value: NetworkMapping[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkMappingCollectionDeserializer(item: any): _NetworkMappingCollection {
  return {
    value: networkMappingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkMappingArrayDeserializer(result: Array<NetworkMapping>): any[] {
  return result.map((item) => {
    return networkMappingDeserializer(item);
  });
}

/** Protection container details. */
export interface ProtectionContainer extends ProxyResource {
  /** The custom data. */
  properties?: ProtectionContainerProperties;
  /** Resource Location */
  location?: string;
}

export function protectionContainerDeserializer(item: any): ProtectionContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionContainerPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Protection profile custom data details. */
export interface ProtectionContainerProperties {
  /** Fabric friendly name. */
  fabricFriendlyName?: string;
  /** The name. */
  friendlyName?: string;
  /** The fabric type. */
  fabricType?: string;
  /** Number of protected PEs. */
  protectedItemCount?: number;
  /** The pairing status of this cloud. */
  pairingStatus?: string;
  /** The role of this cloud. */
  role?: string;
  /** Fabric specific details. */
  fabricSpecificDetails?: ProtectionContainerFabricSpecificDetails;
}

export function protectionContainerPropertiesDeserializer(
  item: any,
): ProtectionContainerProperties {
  return {
    fabricFriendlyName: item["fabricFriendlyName"],
    friendlyName: item["friendlyName"],
    fabricType: item["fabricType"],
    protectedItemCount: item["protectedItemCount"],
    pairingStatus: item["pairingStatus"],
    role: item["role"],
    fabricSpecificDetails: !item["fabricSpecificDetails"]
      ? item["fabricSpecificDetails"]
      : protectionContainerFabricSpecificDetailsDeserializer(item["fabricSpecificDetails"]),
  };
}

/** Base class for fabric specific details of container. */
export interface ProtectionContainerFabricSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  readonly instanceType?: string;
}

export function protectionContainerFabricSpecificDetailsDeserializer(
  item: any,
): ProtectionContainerFabricSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Create protection container input. */
export interface CreateProtectionContainerInput {
  /** Create protection container input properties. */
  properties?: CreateProtectionContainerInputProperties;
}

export function createProtectionContainerInputSerializer(
  item: CreateProtectionContainerInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : createProtectionContainerInputPropertiesSerializer(item["properties"]),
  };
}

/** Create protection container input properties. */
export interface CreateProtectionContainerInputProperties {
  /** Provider specific inputs for container creation. */
  providerSpecificInput?: ReplicationProviderSpecificContainerCreationInputUnion[];
}

export function createProtectionContainerInputPropertiesSerializer(
  item: CreateProtectionContainerInputProperties,
): any {
  return {
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : replicationProviderSpecificContainerCreationInputUnionArraySerializer(
          item["providerSpecificInput"],
        ),
  };
}

export function replicationProviderSpecificContainerCreationInputUnionArraySerializer(
  result: Array<ReplicationProviderSpecificContainerCreationInputUnion>,
): any[] {
  return result.map((item) => {
    return replicationProviderSpecificContainerCreationInputUnionSerializer(item);
  });
}

/** Provider specific input for container creation operation. */
export interface ReplicationProviderSpecificContainerCreationInput {
  /** The class type. */
  /** The discriminator possible values: A2A, A2ACrossClusterMigration, VMwareCbt */
  instanceType: string;
}

export function replicationProviderSpecificContainerCreationInputSerializer(
  item: ReplicationProviderSpecificContainerCreationInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ReplicationProviderSpecificContainerCreationInputUnion */
export type ReplicationProviderSpecificContainerCreationInputUnion =
  | A2AContainerCreationInput
  | A2ACrossClusterMigrationContainerCreationInput
  | VMwareCbtContainerCreationInput
  | ReplicationProviderSpecificContainerCreationInput;

export function replicationProviderSpecificContainerCreationInputUnionSerializer(
  item: ReplicationProviderSpecificContainerCreationInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AContainerCreationInputSerializer(item as A2AContainerCreationInput);

    case "A2ACrossClusterMigration":
      return a2ACrossClusterMigrationContainerCreationInputSerializer(
        item as A2ACrossClusterMigrationContainerCreationInput,
      );

    case "VMwareCbt":
      return vMwareCbtContainerCreationInputSerializer(item as VMwareCbtContainerCreationInput);

    default:
      return replicationProviderSpecificContainerCreationInputSerializer(item);
  }
}

/** A2A cloud creation input. */
export interface A2AContainerCreationInput extends ReplicationProviderSpecificContainerCreationInput {
  /** The class type. */
  instanceType: "A2A";
}

export function a2AContainerCreationInputSerializer(item: A2AContainerCreationInput): any {
  return { instanceType: item["instanceType"] };
}

/** A2ACrossClusterMigration cloud creation input. */
export interface A2ACrossClusterMigrationContainerCreationInput extends ReplicationProviderSpecificContainerCreationInput {
  /** The class type. */
  instanceType: "A2ACrossClusterMigration";
}

export function a2ACrossClusterMigrationContainerCreationInputSerializer(
  item: A2ACrossClusterMigrationContainerCreationInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** VMwareCbt container creation input. */
export interface VMwareCbtContainerCreationInput extends ReplicationProviderSpecificContainerCreationInput {
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtContainerCreationInputSerializer(
  item: VMwareCbtContainerCreationInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Protection Container collection. */
export interface _ProtectionContainerCollection {
  /** The ProtectionContainer items on this page */
  value: ProtectionContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectionContainerCollectionDeserializer(
  item: any,
): _ProtectionContainerCollection {
  return {
    value: protectionContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectionContainerArrayDeserializer(result: Array<ProtectionContainer>): any[] {
  return result.map((item) => {
    return protectionContainerDeserializer(item);
  });
}

/** Request to add a physical machine as a protectable item in a container. */
export interface DiscoverProtectableItemRequest {
  /** The properties of a discover protectable item request. */
  properties?: DiscoverProtectableItemRequestProperties;
}

export function discoverProtectableItemRequestSerializer(
  item: DiscoverProtectableItemRequest,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : discoverProtectableItemRequestPropertiesSerializer(item["properties"]),
  };
}

/** Discover protectable item properties. */
export interface DiscoverProtectableItemRequestProperties {
  /** The friendly name of the physical machine. */
  friendlyName?: string;
  /** The IP address of the physical machine to be discovered. */
  ipAddress?: string;
  /** The OS type on the physical machine. */
  osType?: string;
}

export function discoverProtectableItemRequestPropertiesSerializer(
  item: DiscoverProtectableItemRequestProperties,
): any {
  return {
    friendlyName: item["friendlyName"],
    ipAddress: item["ipAddress"],
    osType: item["osType"],
  };
}

/** Switch cluster protection input. */
export interface SwitchClusterProtectionInput {
  /** Switch cluster protection properties. */
  properties?: SwitchClusterProtectionInputProperties;
}

export function switchClusterProtectionInputSerializer(item: SwitchClusterProtectionInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : switchClusterProtectionInputPropertiesSerializer(item["properties"]),
  };
}

/** Switch cluster protection input properties. */
export interface SwitchClusterProtectionInputProperties {
  /** The unique replication protection cluster name. */
  replicationProtectionClusterName?: string;
  /** Provider specific switch protection input. */
  providerSpecificDetails?: SwitchClusterProtectionProviderSpecificInputUnion;
}

export function switchClusterProtectionInputPropertiesSerializer(
  item: SwitchClusterProtectionInputProperties,
): any {
  return {
    replicationProtectionClusterName: item["replicationProtectionClusterName"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : switchClusterProtectionProviderSpecificInputUnionSerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Provider specific switch cluster protection input. */
export interface SwitchClusterProtectionProviderSpecificInput {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function switchClusterProtectionProviderSpecificInputSerializer(
  item: SwitchClusterProtectionProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for SwitchClusterProtectionProviderSpecificInputUnion */
export type SwitchClusterProtectionProviderSpecificInputUnion =
  | A2ASwitchClusterProtectionInput
  | SwitchClusterProtectionProviderSpecificInput;

export function switchClusterProtectionProviderSpecificInputUnionSerializer(
  item: SwitchClusterProtectionProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ASwitchClusterProtectionInputSerializer(item as A2ASwitchClusterProtectionInput);

    default:
      return switchClusterProtectionProviderSpecificInputSerializer(item);
  }
}

/** A2A specific switch cluster protection input. */
export interface A2ASwitchClusterProtectionInput extends SwitchClusterProtectionProviderSpecificInput {
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The Policy Id. */
  policyId?: string;
  protectedItemsDetail?: A2AProtectedItemDetail[];
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2ASwitchClusterProtectionInputSerializer(
  item: A2ASwitchClusterProtectionInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryContainerId: item["recoveryContainerId"],
    policyId: item["policyId"],
    protectedItemsDetail: !item["protectedItemsDetail"]
      ? item["protectedItemsDetail"]
      : a2AProtectedItemDetailArraySerializer(item["protectedItemsDetail"]),
  };
}

export function a2AProtectedItemDetailArraySerializer(
  result: Array<A2AProtectedItemDetail>,
): any[] {
  return result.map((item) => {
    return a2AProtectedItemDetailSerializer(item);
  });
}

/** A2A specific switch cluster protection input. */
export interface A2AProtectedItemDetail {
  /** The list of vm managed disk details. */
  vmManagedDisks?: A2AVmManagedDiskInputDetails[];
  /** The recovery resource group Id. */
  recoveryResourceGroupId?: string;
  /** The recovery availability set. */
  recoveryAvailabilitySetId?: string;
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccountId?: string;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The recovery proximity placement group Id. */
  recoveryProximityPlacementGroupId?: string;
  /** The virtual machine scale set id. */
  recoveryVirtualMachineScaleSetId?: string;
  /** The recovery capacity reservation group Id. */
  recoveryCapacityReservationGroupId?: string;
  /** The recovery disk encryption information. */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** The Replication Protected item name. */
  replicationProtectedItemName?: string;
}

export function a2AProtectedItemDetailSerializer(item: A2AProtectedItemDetail): any {
  return {
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AVmManagedDiskInputDetailsArraySerializer(item["vmManagedDisks"]),
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    recoveryBootDiagStorageAccountId: item["recoveryBootDiagStorageAccountId"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
    recoveryVirtualMachineScaleSetId: item["recoveryVirtualMachineScaleSetId"],
    recoveryCapacityReservationGroupId: item["recoveryCapacityReservationGroupId"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
    replicationProtectedItemName: item["replicationProtectedItemName"],
  };
}

/** Switch protection input. */
export interface SwitchProtectionInput {
  /** Switch protection properties. */
  properties?: SwitchProtectionInputProperties;
}

export function switchProtectionInputSerializer(item: SwitchProtectionInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : switchProtectionInputPropertiesSerializer(item["properties"]),
  };
}

/** Switch protection input properties. */
export interface SwitchProtectionInputProperties {
  /** The unique replication protected item name. */
  replicationProtectedItemName?: string;
  /** Provider specific switch protection input. */
  providerSpecificDetails?: SwitchProtectionProviderSpecificInputUnion;
}

export function switchProtectionInputPropertiesSerializer(
  item: SwitchProtectionInputProperties,
): any {
  return {
    replicationProtectedItemName: item["replicationProtectedItemName"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : switchProtectionProviderSpecificInputUnionSerializer(item["providerSpecificDetails"]),
  };
}

/** Provider specific switch protection input. */
export interface SwitchProtectionProviderSpecificInput {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function switchProtectionProviderSpecificInputSerializer(
  item: SwitchProtectionProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for SwitchProtectionProviderSpecificInputUnion */
export type SwitchProtectionProviderSpecificInputUnion =
  | A2ASwitchProtectionInput
  | SwitchProtectionProviderSpecificInput;

export function switchProtectionProviderSpecificInputUnionSerializer(
  item: SwitchProtectionProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2ASwitchProtectionInputSerializer(item as A2ASwitchProtectionInput);

    default:
      return switchProtectionProviderSpecificInputSerializer(item);
  }
}

/** A2A specific switch protection input. */
export interface A2ASwitchProtectionInput extends SwitchProtectionProviderSpecificInput {
  /** The recovery container Id. */
  recoveryContainerId?: string;
  /** The list of vm disk details. */
  vmDisks?: A2AVmDiskInputDetails[];
  /** The list of vm managed disk details. */
  vmManagedDisks?: A2AVmManagedDiskInputDetails[];
  /** The recovery resource group Id. Valid for V2 scenarios. */
  recoveryResourceGroupId?: string;
  /** The recovery cloud service Id. Valid for V1 scenarios. */
  recoveryCloudServiceId?: string;
  /** The recovery availability set. */
  recoveryAvailabilitySetId?: string;
  /** The Policy Id. */
  policyId?: string;
  /** The boot diagnostic storage account. */
  recoveryBootDiagStorageAccountId?: string;
  /** The recovery availability zone. */
  recoveryAvailabilityZone?: string;
  /** The recovery proximity placement group Id. */
  recoveryProximityPlacementGroupId?: string;
  /** The virtual machine scale set id. */
  recoveryVirtualMachineScaleSetId?: string;
  /** The recovery capacity reservation group Id. */
  recoveryCapacityReservationGroupId?: string;
  /** the platform fault domain. */
  platformFaultDomain?: number;
  /** The recovery disk encryption information. */
  diskEncryptionInfo?: DiskEncryptionInfo;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function a2ASwitchProtectionInputSerializer(item: A2ASwitchProtectionInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryContainerId: item["recoveryContainerId"],
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : a2AVmDiskInputDetailsArraySerializer(item["vmDisks"]),
    vmManagedDisks: !item["vmManagedDisks"]
      ? item["vmManagedDisks"]
      : a2AVmManagedDiskInputDetailsArraySerializer(item["vmManagedDisks"]),
    recoveryResourceGroupId: item["recoveryResourceGroupId"],
    recoveryCloudServiceId: item["recoveryCloudServiceId"],
    recoveryAvailabilitySetId: item["recoveryAvailabilitySetId"],
    policyId: item["policyId"],
    recoveryBootDiagStorageAccountId: item["recoveryBootDiagStorageAccountId"],
    recoveryAvailabilityZone: item["recoveryAvailabilityZone"],
    recoveryProximityPlacementGroupId: item["recoveryProximityPlacementGroupId"],
    recoveryVirtualMachineScaleSetId: item["recoveryVirtualMachineScaleSetId"],
    recoveryCapacityReservationGroupId: item["recoveryCapacityReservationGroupId"],
    platformFaultDomain: item["platformFaultDomain"],
    diskEncryptionInfo: !item["diskEncryptionInfo"]
      ? item["diskEncryptionInfo"]
      : diskEncryptionInfoSerializer(item["diskEncryptionInfo"]),
  };
}

/** Migration item. */
export interface MigrationItem extends ProxyResource {
  /** The migration item properties. */
  properties?: MigrationItemProperties;
  /** Resource Location */
  location?: string;
}

export function migrationItemDeserializer(item: any): MigrationItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationItemPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Migration item properties. */
export interface MigrationItemProperties {
  /** The on-premise virtual machine name. */
  readonly machineName?: string;
  /** The ARM Id of policy governing this item. */
  readonly policyId?: string;
  /** The name of policy governing this item. */
  readonly policyFriendlyName?: string;
  /** The recovery services provider ARM Id. */
  readonly recoveryServicesProviderId?: string;
  /** The replication status. */
  readonly replicationStatus?: string;
  /** The migration status. */
  readonly migrationState?: MigrationState;
  /** The migration state description. */
  readonly migrationStateDescription?: string;
  /** The last test migration time. */
  readonly lastTestMigrationTime?: Date;
  /** The status of the last test migration. */
  readonly lastTestMigrationStatus?: string;
  /** The last migration time. */
  readonly lastMigrationTime?: Date;
  /** The status of the last migration. */
  readonly lastMigrationStatus?: string;
  /** The test migrate state. */
  readonly testMigrateState?: TestMigrationState;
  /** The test migrate state description. */
  readonly testMigrateStateDescription?: string;
  /** The consolidated health. */
  readonly health?: ProtectionHealth;
  /** The list of health errors. */
  readonly healthErrors?: HealthError[];
  /** The allowed operations on the migration item based on the current migration state of the item. */
  readonly allowedOperations?: MigrationItemOperation[];
  /** The current job details. */
  readonly currentJob?: CurrentJobDetails;
  /** The critical past job details. */
  readonly criticalJobHistory?: CriticalJobHistoryDetails[];
  /** The correlation Id for events associated with this migration item. */
  readonly eventCorrelationId?: string;
  /** The migration provider custom settings. */
  providerSpecificDetails?: MigrationProviderSpecificSettingsUnion;
}

export function migrationItemPropertiesDeserializer(item: any): MigrationItemProperties {
  return {
    machineName: item["machineName"],
    policyId: item["policyId"],
    policyFriendlyName: item["policyFriendlyName"],
    recoveryServicesProviderId: item["recoveryServicesProviderId"],
    replicationStatus: item["replicationStatus"],
    migrationState: item["migrationState"],
    migrationStateDescription: item["migrationStateDescription"],
    lastTestMigrationTime: !item["lastTestMigrationTime"]
      ? item["lastTestMigrationTime"]
      : new Date(item["lastTestMigrationTime"]),
    lastTestMigrationStatus: item["lastTestMigrationStatus"],
    lastMigrationTime: !item["lastMigrationTime"]
      ? item["lastMigrationTime"]
      : new Date(item["lastMigrationTime"]),
    lastMigrationStatus: item["lastMigrationStatus"],
    testMigrateState: item["testMigrateState"],
    testMigrateStateDescription: item["testMigrateStateDescription"],
    health: item["health"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    currentJob: !item["currentJob"]
      ? item["currentJob"]
      : currentJobDetailsDeserializer(item["currentJob"]),
    criticalJobHistory: !item["criticalJobHistory"]
      ? item["criticalJobHistory"]
      : criticalJobHistoryDetailsArrayDeserializer(item["criticalJobHistory"]),
    eventCorrelationId: item["eventCorrelationId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : migrationProviderSpecificSettingsUnionDeserializer(item["providerSpecificDetails"]),
  };
}

/** The migration status. */
export enum KnownMigrationState {
  /** None */
  None = "None",
  /** EnableMigrationInProgress */
  EnableMigrationInProgress = "EnableMigrationInProgress",
  /** EnableMigrationFailed */
  EnableMigrationFailed = "EnableMigrationFailed",
  /** DisableMigrationInProgress */
  DisableMigrationInProgress = "DisableMigrationInProgress",
  /** DisableMigrationFailed */
  DisableMigrationFailed = "DisableMigrationFailed",
  /** InitialSeedingInProgress */
  InitialSeedingInProgress = "InitialSeedingInProgress",
  /** InitialSeedingFailed */
  InitialSeedingFailed = "InitialSeedingFailed",
  /** Replicating */
  Replicating = "Replicating",
  /** MigrationInProgress */
  MigrationInProgress = "MigrationInProgress",
  /** MigrationSucceeded */
  MigrationSucceeded = "MigrationSucceeded",
  /** MigrationFailed */
  MigrationFailed = "MigrationFailed",
  /** ResumeInProgress */
  ResumeInProgress = "ResumeInProgress",
  /** ResumeInitiated */
  ResumeInitiated = "ResumeInitiated",
  /** SuspendingProtection */
  SuspendingProtection = "SuspendingProtection",
  /** ProtectionSuspended */
  ProtectionSuspended = "ProtectionSuspended",
  /** MigrationCompletedWithInformation */
  MigrationCompletedWithInformation = "MigrationCompletedWithInformation",
  /** MigrationPartiallySucceeded */
  MigrationPartiallySucceeded = "MigrationPartiallySucceeded",
}

/**
 * The migration status. \
 * {@link KnownMigrationState} can be used interchangeably with MigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **EnableMigrationInProgress**: EnableMigrationInProgress \
 * **EnableMigrationFailed**: EnableMigrationFailed \
 * **DisableMigrationInProgress**: DisableMigrationInProgress \
 * **DisableMigrationFailed**: DisableMigrationFailed \
 * **InitialSeedingInProgress**: InitialSeedingInProgress \
 * **InitialSeedingFailed**: InitialSeedingFailed \
 * **Replicating**: Replicating \
 * **MigrationInProgress**: MigrationInProgress \
 * **MigrationSucceeded**: MigrationSucceeded \
 * **MigrationFailed**: MigrationFailed \
 * **ResumeInProgress**: ResumeInProgress \
 * **ResumeInitiated**: ResumeInitiated \
 * **SuspendingProtection**: SuspendingProtection \
 * **ProtectionSuspended**: ProtectionSuspended \
 * **MigrationCompletedWithInformation**: MigrationCompletedWithInformation \
 * **MigrationPartiallySucceeded**: MigrationPartiallySucceeded
 */
export type MigrationState = string;

/** The test migrate state. */
export enum KnownTestMigrationState {
  /** None */
  None = "None",
  /** TestMigrationInProgress */
  TestMigrationInProgress = "TestMigrationInProgress",
  /** TestMigrationSucceeded */
  TestMigrationSucceeded = "TestMigrationSucceeded",
  /** TestMigrationFailed */
  TestMigrationFailed = "TestMigrationFailed",
  /** TestMigrationCleanupInProgress */
  TestMigrationCleanupInProgress = "TestMigrationCleanupInProgress",
  /** TestMigrationCompletedWithInformation */
  TestMigrationCompletedWithInformation = "TestMigrationCompletedWithInformation",
  /** TestMigrationPartiallySucceeded */
  TestMigrationPartiallySucceeded = "TestMigrationPartiallySucceeded",
}

/**
 * The test migrate state. \
 * {@link KnownTestMigrationState} can be used interchangeably with TestMigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **TestMigrationInProgress**: TestMigrationInProgress \
 * **TestMigrationSucceeded**: TestMigrationSucceeded \
 * **TestMigrationFailed**: TestMigrationFailed \
 * **TestMigrationCleanupInProgress**: TestMigrationCleanupInProgress \
 * **TestMigrationCompletedWithInformation**: TestMigrationCompletedWithInformation \
 * **TestMigrationPartiallySucceeded**: TestMigrationPartiallySucceeded
 */
export type TestMigrationState = string;

/** The allowed operations on the migration item based on the current migration state of the item. */
export enum KnownMigrationItemOperation {
  /** DisableMigration */
  DisableMigration = "DisableMigration",
  /** TestMigrate */
  TestMigrate = "TestMigrate",
  /** TestMigrateCleanup */
  TestMigrateCleanup = "TestMigrateCleanup",
  /** Migrate */
  Migrate = "Migrate",
  /** StartResync */
  StartResync = "StartResync",
  /** PauseReplication */
  PauseReplication = "PauseReplication",
  /** ResumeReplication */
  ResumeReplication = "ResumeReplication",
}

/**
 * The allowed operations on the migration item based on the current migration state of the item. \
 * {@link KnownMigrationItemOperation} can be used interchangeably with MigrationItemOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DisableMigration**: DisableMigration \
 * **TestMigrate**: TestMigrate \
 * **TestMigrateCleanup**: TestMigrateCleanup \
 * **Migrate**: Migrate \
 * **StartResync**: StartResync \
 * **PauseReplication**: PauseReplication \
 * **ResumeReplication**: ResumeReplication
 */
export type MigrationItemOperation = string;

/** Current job details of the migration item. */
export interface CurrentJobDetails {
  /** The job name. */
  readonly jobName?: string;
  /** The ARM Id of the job being executed. */
  readonly jobId?: string;
  /** The start time of the job. */
  readonly startTime?: Date;
}

export function currentJobDetailsDeserializer(item: any): CurrentJobDetails {
  return {
    jobName: item["jobName"],
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

export function criticalJobHistoryDetailsArrayDeserializer(
  result: Array<CriticalJobHistoryDetails>,
): any[] {
  return result.map((item) => {
    return criticalJobHistoryDetailsDeserializer(item);
  });
}

/** Critical past job details of the migration item. */
export interface CriticalJobHistoryDetails {
  /** The job name. */
  readonly jobName?: string;
  /** The ARM Id of the job being executed. */
  readonly jobId?: string;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The job state. */
  readonly jobStatus?: string;
}

export function criticalJobHistoryDetailsDeserializer(item: any): CriticalJobHistoryDetails {
  return {
    jobName: item["jobName"],
    jobId: item["jobId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    jobStatus: item["jobStatus"],
  };
}

/** Migration provider specific settings. */
export interface MigrationProviderSpecificSettings {
  /** Gets the instance type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function migrationProviderSpecificSettingsDeserializer(
  item: any,
): MigrationProviderSpecificSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for MigrationProviderSpecificSettingsUnion */
export type MigrationProviderSpecificSettingsUnion =
  | VMwareCbtMigrationDetails
  | MigrationProviderSpecificSettings;

export function migrationProviderSpecificSettingsUnionDeserializer(
  item: any,
): MigrationProviderSpecificSettingsUnion {
  switch (item["instanceType"]) {
    case "VMwareCbt":
      return vMwareCbtMigrationDetailsDeserializer(item as VMwareCbtMigrationDetails);

    default:
      return migrationProviderSpecificSettingsDeserializer(item);
  }
}

/** VMwareCbt provider specific settings. */
export interface VMwareCbtMigrationDetails extends MigrationProviderSpecificSettings {
  /** The ARM Id of the VM discovered in VMware. */
  readonly vmwareMachineId?: string;
  /** The type of the OS on the VM. */
  readonly osType?: string;
  /** The name of the OS on the VM. */
  readonly osName?: string;
  /** The firmware type. */
  readonly firmwareType?: string;
  /** The target generation. */
  readonly targetGeneration?: string;
  /** License Type of the VM to be used. */
  licenseType?: string;
  /** The SQL Server license type. */
  sqlServerLicenseType?: string;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The data mover run as account Id. */
  readonly dataMoverRunAsAccountId?: string;
  /** The snapshot run as account Id. */
  readonly snapshotRunAsAccountId?: string;
  /** The replication storage account ARM Id. This is applicable only for the blob based replication test hook. */
  readonly storageAccountId?: string;
  /** Target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The target location. */
  readonly targetLocation?: string;
  /** The target resource group Id. */
  targetResourceGroupId?: string;
  /** The target availability set Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group Id. */
  targetProximityPlacementGroupId?: string;
  /** The confidential VM key vault Id for ADE installation. */
  confidentialVmKeyVaultId?: string;
  /** The target VM security profile. */
  targetVmSecurityProfile?: VMwareCbtSecurityProfileProperties;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The list of protected disks. */
  protectedDisks?: VMwareCbtProtectedDiskDetails[];
  /** The target network Id. */
  targetNetworkId?: string;
  /** The test network Id. */
  testNetworkId?: string;
  /** The network details. */
  vmNics?: VMwareCbtNicDetails[];
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The recovery point Id to which the VM was migrated. */
  readonly migrationRecoveryPointId?: string;
  /** The last recovery point received time. */
  readonly lastRecoveryPointReceived?: Date;
  /** The last recovery point Id. */
  readonly lastRecoveryPointId?: string;
  /** The initial seeding progress percentage. */
  readonly initialSeedingProgressPercentage?: number;
  /** The migration progress percentage. */
  readonly migrationProgressPercentage?: number;
  /** The resync progress percentage. */
  readonly resyncProgressPercentage?: number;
  /** The resume progress percentage. */
  readonly resumeProgressPercentage?: number;
  /** The delta sync progress percentage. */
  readonly deltaSyncProgressPercentage?: number;
  /** A value indicating whether checksum resync cycle is in progress. */
  readonly isCheckSumResyncCycle?: string;
  /** The initial seeding retry count. */
  readonly initialSeedingRetryCount?: number;
  /** The resync retry count. */
  readonly resyncRetryCount?: number;
  /** The resume retry count. */
  readonly resumeRetryCount?: number;
  /** The delta sync retry count. */
  readonly deltaSyncRetryCount?: number;
  /** A value indicating whether resync is required. */
  readonly resyncRequired?: string;
  /** The resync state. */
  readonly resyncState?: ResyncState;
  /** A value indicating whether auto resync is to be done. */
  performAutoResync?: string;
  /** The tags for the seed disks. */
  seedDiskTags?: Record<string, string>;
  /** The tags for the target disks. */
  targetDiskTags?: Record<string, string>;
  /** A value indicating the inplace OS Upgrade version. */
  supportedOSVersions?: string[];
  /** A value indicating the appliance monitoring details. */
  readonly applianceMonitoringDetails?: ApplianceMonitoringDetails;
  /** A value indicating the gateway operation details. */
  readonly gatewayOperationDetails?: GatewayOperationDetails;
  /** A value indicating the SRS operation name. */
  readonly operationName?: string;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** Gets the instance type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtMigrationDetailsDeserializer(item: any): VMwareCbtMigrationDetails {
  return {
    instanceType: item["instanceType"],
    vmwareMachineId: item["vmwareMachineId"],
    osType: item["osType"],
    osName: item["osName"],
    firmwareType: item["firmwareType"],
    targetGeneration: item["targetGeneration"],
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    dataMoverRunAsAccountId: item["dataMoverRunAsAccountId"],
    snapshotRunAsAccountId: item["snapshotRunAsAccountId"],
    storageAccountId: item["storageAccountId"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    targetLocation: item["targetLocation"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    confidentialVmKeyVaultId: item["confidentialVmKeyVaultId"],
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : vMwareCbtSecurityProfilePropertiesDeserializer(item["targetVmSecurityProfile"]),
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    targetVmTags: !item["targetVmTags"]
      ? item["targetVmTags"]
      : Object.fromEntries(
          Object.entries(item["targetVmTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    protectedDisks: !item["protectedDisks"]
      ? item["protectedDisks"]
      : vMwareCbtProtectedDiskDetailsArrayDeserializer(item["protectedDisks"]),
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vMwareCbtNicDetailsArrayDeserializer(item["vmNics"]),
    targetNicTags: !item["targetNicTags"]
      ? item["targetNicTags"]
      : Object.fromEntries(
          Object.entries(item["targetNicTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    migrationRecoveryPointId: item["migrationRecoveryPointId"],
    lastRecoveryPointReceived: !item["lastRecoveryPointReceived"]
      ? item["lastRecoveryPointReceived"]
      : new Date(item["lastRecoveryPointReceived"]),
    lastRecoveryPointId: item["lastRecoveryPointId"],
    initialSeedingProgressPercentage: item["initialSeedingProgressPercentage"],
    migrationProgressPercentage: item["migrationProgressPercentage"],
    resyncProgressPercentage: item["resyncProgressPercentage"],
    resumeProgressPercentage: item["resumeProgressPercentage"],
    deltaSyncProgressPercentage: item["deltaSyncProgressPercentage"],
    isCheckSumResyncCycle: item["isCheckSumResyncCycle"],
    initialSeedingRetryCount: item["initialSeedingRetryCount"],
    resyncRetryCount: item["resyncRetryCount"],
    resumeRetryCount: item["resumeRetryCount"],
    deltaSyncRetryCount: item["deltaSyncRetryCount"],
    resyncRequired: item["resyncRequired"],
    resyncState: item["resyncState"],
    performAutoResync: item["performAutoResync"],
    seedDiskTags: !item["seedDiskTags"]
      ? item["seedDiskTags"]
      : Object.fromEntries(
          Object.entries(item["seedDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    targetDiskTags: !item["targetDiskTags"]
      ? item["targetDiskTags"]
      : Object.fromEntries(
          Object.entries(item["targetDiskTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    supportedOSVersions: !item["supportedOSVersions"]
      ? item["supportedOSVersions"]
      : item["supportedOSVersions"].map((p: any) => {
          return p;
        }),
    applianceMonitoringDetails: !item["applianceMonitoringDetails"]
      ? item["applianceMonitoringDetails"]
      : applianceMonitoringDetailsDeserializer(item["applianceMonitoringDetails"]),
    gatewayOperationDetails: !item["gatewayOperationDetails"]
      ? item["gatewayOperationDetails"]
      : gatewayOperationDetailsDeserializer(item["gatewayOperationDetails"]),
    operationName: item["operationName"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

/** VMwareCbt security profile input. */
export interface VMwareCbtSecurityProfileProperties {
  /** The target VM security type. */
  targetVmSecurityType?: SecurityType;
  /** A value indicating whether secure boot to be enabled. */
  isTargetVmSecureBootEnabled?: string;
  /** A value indicating whether trusted platform module to be enabled. */
  isTargetVmTpmEnabled?: string;
  /** A value indicating whether integrity monitoring to be enabled. */
  isTargetVmIntegrityMonitoringEnabled?: string;
  /** A value indicating whether confidential compute encryption to be enabled. */
  isTargetVmConfidentialEncryptionEnabled?: string;
}

export function vMwareCbtSecurityProfilePropertiesSerializer(
  item: VMwareCbtSecurityProfileProperties,
): any {
  return {
    targetVmSecurityType: item["targetVmSecurityType"],
    isTargetVmSecureBootEnabled: item["isTargetVmSecureBootEnabled"],
    isTargetVmTpmEnabled: item["isTargetVmTpmEnabled"],
    isTargetVmIntegrityMonitoringEnabled: item["isTargetVmIntegrityMonitoringEnabled"],
    isTargetVmConfidentialEncryptionEnabled: item["isTargetVmConfidentialEncryptionEnabled"],
  };
}

export function vMwareCbtSecurityProfilePropertiesDeserializer(
  item: any,
): VMwareCbtSecurityProfileProperties {
  return {
    targetVmSecurityType: item["targetVmSecurityType"],
    isTargetVmSecureBootEnabled: item["isTargetVmSecureBootEnabled"],
    isTargetVmTpmEnabled: item["isTargetVmTpmEnabled"],
    isTargetVmIntegrityMonitoringEnabled: item["isTargetVmIntegrityMonitoringEnabled"],
    isTargetVmConfidentialEncryptionEnabled: item["isTargetVmConfidentialEncryptionEnabled"],
  };
}

export function vMwareCbtProtectedDiskDetailsArrayDeserializer(
  result: Array<VMwareCbtProtectedDiskDetails>,
): any[] {
  return result.map((item) => {
    return vMwareCbtProtectedDiskDetailsDeserializer(item);
  });
}

/** VMwareCbt protected disk details. */
export interface VMwareCbtProtectedDiskDetails {
  /** The disk id. */
  readonly diskId?: string;
  /** The disk name. */
  readonly diskName?: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** The disk path. */
  readonly diskPath?: string;
  /** A value indicating whether the disk is the OS disk. */
  readonly isOSDisk?: string;
  /** The disk capacity in bytes. */
  readonly capacityInBytes?: number;
  /** The log storage account ARM Id. */
  readonly logStorageAccountId?: string;
  /** The key vault secret name of the log storage account. */
  readonly logStorageAccountSasSecretName?: string;
  /** The DiskEncryptionSet ARM Id. */
  readonly diskEncryptionSetId?: string;
  /** The ARM Id of the seed managed disk. */
  readonly seedManagedDiskId?: string;
  /** The uri of the seed blob. */
  readonly seedBlobUri?: string;
  /** The ARM Id of the target managed disk. */
  readonly targetManagedDiskId?: string;
  /** The uri of the target blob. */
  readonly targetBlobUri?: string;
  /** The name for the target managed disk. */
  targetDiskName?: string;
  /** A value indicating the gateway operation details. */
  readonly gatewayOperationDetails?: GatewayOperationDetails;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function vMwareCbtProtectedDiskDetailsDeserializer(
  item: any,
): VMwareCbtProtectedDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    diskType: item["diskType"],
    diskPath: item["diskPath"],
    isOSDisk: item["isOSDisk"],
    capacityInBytes: item["capacityInBytes"],
    logStorageAccountId: item["logStorageAccountId"],
    logStorageAccountSasSecretName: item["logStorageAccountSasSecretName"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    seedManagedDiskId: item["seedManagedDiskId"],
    seedBlobUri: item["seedBlobUri"],
    targetManagedDiskId: item["targetManagedDiskId"],
    targetBlobUri: item["targetBlobUri"],
    targetDiskName: item["targetDiskName"],
    gatewayOperationDetails: !item["gatewayOperationDetails"]
      ? item["gatewayOperationDetails"]
      : gatewayOperationDetailsDeserializer(item["gatewayOperationDetails"]),
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** Details of the gateway operation. */
export interface GatewayOperationDetails {
  /** A value indicating the state of gateway operation. */
  readonly state?: string;
  /** A value indicating the progress percentage of gateway operation. */
  readonly progressPercentage?: number;
  /** A value indicating the time elapsed for the operation in milliseconds. */
  readonly timeElapsed?: number;
  /** A value indicating the time remaining for the operation in milliseconds. */
  readonly timeRemaining?: number;
  /** A value indicating the upload speed in bytes per second. */
  readonly uploadSpeed?: number;
  /** A value indicating the ESXi host name. */
  readonly hostName?: string;
  /** A value indicating the datastore collection. */
  readonly dataStores?: string[];
  /** A value indicating the VMware read throughput in bytes per second. */
  readonly vmwareReadThroughput?: number;
}

export function gatewayOperationDetailsDeserializer(item: any): GatewayOperationDetails {
  return {
    state: item["state"],
    progressPercentage: item["progressPercentage"],
    timeElapsed: item["timeElapsed"],
    timeRemaining: item["timeRemaining"],
    uploadSpeed: item["uploadSpeed"],
    hostName: item["hostName"],
    dataStores: !item["dataStores"]
      ? item["dataStores"]
      : item["dataStores"].map((p: any) => {
          return p;
        }),
    vmwareReadThroughput: item["vmwareReadThroughput"],
  };
}

export function vMwareCbtNicDetailsArrayDeserializer(result: Array<VMwareCbtNicDetails>): any[] {
  return result.map((item) => {
    return vMwareCbtNicDetailsDeserializer(item);
  });
}

/** VMwareCbt NIC details. */
export interface VMwareCbtNicDetails {
  /** The NIC Id. */
  readonly nicId?: string;
  /** A value indicating whether this is the primary NIC. */
  isPrimaryNic?: string;
  /** The source IP address. */
  readonly sourceIPAddress?: string;
  /** The source IP address type. */
  readonly sourceIPAddressType?: EthernetAddressType;
  /** Source network Id. */
  readonly sourceNetworkId?: string;
  /** The target IP address. */
  targetIPAddress?: string;
  /** The target IP address type. */
  targetIPAddressType?: EthernetAddressType;
  /** Target subnet name. */
  targetSubnetName?: string;
  /** Source network Id. */
  testNetworkId?: string;
  /** Test subnet name. */
  testSubnetName?: string;
  /** The test IP address. */
  testIPAddress?: string;
  /** The test IP address type. */
  testIPAddressType?: EthernetAddressType;
  /** Target NIC name. */
  targetNicName?: string;
  /** A value indicating whether this NIC is selected for migration. */
  isSelectedForMigration?: string;
}

export function vMwareCbtNicDetailsDeserializer(item: any): VMwareCbtNicDetails {
  return {
    nicId: item["nicId"],
    isPrimaryNic: item["isPrimaryNic"],
    sourceIPAddress: item["sourceIPAddress"],
    sourceIPAddressType: item["sourceIPAddressType"],
    sourceNetworkId: item["sourceNetworkId"],
    targetIPAddress: item["targetIPAddress"],
    targetIPAddressType: item["targetIPAddressType"],
    targetSubnetName: item["targetSubnetName"],
    testNetworkId: item["testNetworkId"],
    testSubnetName: item["testSubnetName"],
    testIPAddress: item["testIPAddress"],
    testIPAddressType: item["testIPAddressType"],
    targetNicName: item["targetNicName"],
    isSelectedForMigration: item["isSelectedForMigration"],
  };
}

/** Appliance details of the migration item. */
export interface ApplianceMonitoringDetails {
  /** The appliance CPU details. */
  readonly cpuDetails?: ApplianceResourceDetails;
  /** The appliance RAM details. */
  readonly ramDetails?: ApplianceResourceDetails;
  /** The appliance datastore snapshot details. */
  readonly datastoreSnapshot?: DataStoreUtilizationDetails[];
  /** The disk replication details. */
  readonly disksReplicationDetails?: ApplianceResourceDetails;
  /** The ESXi NFC buffer details. */
  readonly esxiNfcBuffer?: ApplianceResourceDetails;
  /** The appliance network bandwidth details. */
  readonly networkBandwidth?: ApplianceResourceDetails;
}

export function applianceMonitoringDetailsDeserializer(item: any): ApplianceMonitoringDetails {
  return {
    cpuDetails: !item["cpuDetails"]
      ? item["cpuDetails"]
      : applianceResourceDetailsDeserializer(item["cpuDetails"]),
    ramDetails: !item["ramDetails"]
      ? item["ramDetails"]
      : applianceResourceDetailsDeserializer(item["ramDetails"]),
    datastoreSnapshot: !item["datastoreSnapshot"]
      ? item["datastoreSnapshot"]
      : dataStoreUtilizationDetailsArrayDeserializer(item["datastoreSnapshot"]),
    disksReplicationDetails: !item["disksReplicationDetails"]
      ? item["disksReplicationDetails"]
      : applianceResourceDetailsDeserializer(item["disksReplicationDetails"]),
    esxiNfcBuffer: !item["esxiNfcBuffer"]
      ? item["esxiNfcBuffer"]
      : applianceResourceDetailsDeserializer(item["esxiNfcBuffer"]),
    networkBandwidth: !item["networkBandwidth"]
      ? item["networkBandwidth"]
      : applianceResourceDetailsDeserializer(item["networkBandwidth"]),
  };
}

/** Details of the appliance resource. */
export interface ApplianceResourceDetails {
  /** A value indicating the total capacity of appliance resource. */
  readonly capacity?: number;
  /** A value indicating the utilization percentage by gateway agent on appliance. */
  readonly processUtilization?: number;
  /** A value indicating the total utilization percentage for all processes on the appliance. */
  readonly totalUtilization?: number;
  /** A value indicating the status of appliance resource. */
  readonly status?: string;
}

export function applianceResourceDetailsDeserializer(item: any): ApplianceResourceDetails {
  return {
    capacity: item["capacity"],
    processUtilization: item["processUtilization"],
    totalUtilization: item["totalUtilization"],
    status: item["status"],
  };
}

export function dataStoreUtilizationDetailsArrayDeserializer(
  result: Array<DataStoreUtilizationDetails>,
): any[] {
  return result.map((item) => {
    return dataStoreUtilizationDetailsDeserializer(item);
  });
}

/** Details of the appliance resource. */
export interface DataStoreUtilizationDetails {
  /** The total count of snapshots supported by the datastore. */
  readonly totalSnapshotsSupported?: number;
  /** The total snapshots created for server migration in the datastore. */
  readonly totalSnapshotsCreated?: number;
  /** The datastore name. */
  readonly dataStoreName?: string;
}

export function dataStoreUtilizationDetailsDeserializer(item: any): DataStoreUtilizationDetails {
  return {
    totalSnapshotsSupported: item["totalSnapshotsSupported"],
    totalSnapshotsCreated: item["totalSnapshotsCreated"],
    dataStoreName: item["dataStoreName"],
  };
}

/** Enable migration input. */
export interface EnableMigrationInput {
  /** Enable migration input properties. */
  properties: EnableMigrationInputProperties;
}

export function enableMigrationInputSerializer(item: EnableMigrationInput): any {
  return { properties: enableMigrationInputPropertiesSerializer(item["properties"]) };
}

/** Enable migration input properties. */
export interface EnableMigrationInputProperties {
  /** The policy Id. */
  policyId: string;
  /** The provider specific details. */
  providerSpecificDetails: EnableMigrationProviderSpecificInputUnion;
}

export function enableMigrationInputPropertiesSerializer(
  item: EnableMigrationInputProperties,
): any {
  return {
    policyId: item["policyId"],
    providerSpecificDetails: enableMigrationProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Enable migration provider specific input. */
export interface EnableMigrationProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function enableMigrationProviderSpecificInputSerializer(
  item: EnableMigrationProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for EnableMigrationProviderSpecificInputUnion */
export type EnableMigrationProviderSpecificInputUnion =
  | VMwareCbtEnableMigrationInput
  | EnableMigrationProviderSpecificInput;

export function enableMigrationProviderSpecificInputUnionSerializer(
  item: EnableMigrationProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtEnableMigrationInputSerializer(item as VMwareCbtEnableMigrationInput);

    default:
      return enableMigrationProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific enable migration input. */
export interface VMwareCbtEnableMigrationInput extends EnableMigrationProviderSpecificInput {
  /** The ARM Id of the VM discovered in VMware. */
  vmwareMachineId: string;
  /** The disks to include list. */
  disksToInclude: VMwareCbtDiskInput[];
  /** License type. */
  licenseType?: LicenseType;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** A value indicating whether bulk SQL RP registration to be done. */
  performSqlBulkRegistration?: string;
  /** The data mover run as account Id. */
  dataMoverRunAsAccountId: string;
  /** The snapshot run as account Id. */
  snapshotRunAsAccountId: string;
  /** The target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The target resource group ARM Id. */
  targetResourceGroupId: string;
  /** The target network ARM Id. */
  targetNetworkId: string;
  /** The selected test network ARM Id. */
  testNetworkId?: string;
  /** The target subnet name. */
  targetSubnetName?: string;
  /** The selected test subnet name. */
  testSubnetName?: string;
  /** The target availability set ARM Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group ARM Id. */
  targetProximityPlacementGroupId?: string;
  /** The confidential VM key vault Id for ADE installation. */
  confidentialVmKeyVaultId?: string;
  /** The target VM security profile. */
  targetVmSecurityProfile?: VMwareCbtSecurityProfileProperties;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** A value indicating whether auto resync is to be done. */
  performAutoResync?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the seed disks. */
  seedDiskTags?: Record<string, string>;
  /** The tags for the target disks. */
  targetDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtEnableMigrationInputSerializer(item: VMwareCbtEnableMigrationInput): any {
  return {
    instanceType: item["instanceType"],
    vmwareMachineId: item["vmwareMachineId"],
    disksToInclude: vMwareCbtDiskInputArraySerializer(item["disksToInclude"]),
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    performSqlBulkRegistration: item["performSqlBulkRegistration"],
    dataMoverRunAsAccountId: item["dataMoverRunAsAccountId"],
    snapshotRunAsAccountId: item["snapshotRunAsAccountId"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    targetSubnetName: item["targetSubnetName"],
    testSubnetName: item["testSubnetName"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    confidentialVmKeyVaultId: item["confidentialVmKeyVaultId"],
    targetVmSecurityProfile: !item["targetVmSecurityProfile"]
      ? item["targetVmSecurityProfile"]
      : vMwareCbtSecurityProfilePropertiesSerializer(item["targetVmSecurityProfile"]),
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    performAutoResync: item["performAutoResync"],
    targetVmTags: item["targetVmTags"],
    seedDiskTags: item["seedDiskTags"],
    targetDiskTags: item["targetDiskTags"],
    targetNicTags: item["targetNicTags"],
    userSelectedOSName: item["userSelectedOSName"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function vMwareCbtDiskInputArraySerializer(result: Array<VMwareCbtDiskInput>): any[] {
  return result.map((item) => {
    return vMwareCbtDiskInputSerializer(item);
  });
}

/** VMwareCbt disk input. */
export interface VMwareCbtDiskInput {
  /** The disk Id. */
  diskId: string;
  /** The disk type. */
  diskType?: DiskAccountType;
  /** A value indicating whether the disk is the OS disk. */
  isOSDisk: string;
  /** The log storage account ARM Id. */
  logStorageAccountId: string;
  /** The key vault secret name of the log storage account. */
  logStorageAccountSasSecretName: string;
  /** The DiskEncryptionSet ARM Id. */
  diskEncryptionSetId?: string;
  /** The logical sector size (in bytes), 512 by default. */
  sectorSizeInBytes?: number;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function vMwareCbtDiskInputSerializer(item: VMwareCbtDiskInput): any {
  return {
    diskId: item["diskId"],
    diskType: item["diskType"],
    isOSDisk: item["isOSDisk"],
    logStorageAccountId: item["logStorageAccountId"],
    logStorageAccountSasSecretName: item["logStorageAccountSasSecretName"],
    diskEncryptionSetId: item["diskEncryptionSetId"],
    sectorSizeInBytes: item["sectorSizeInBytes"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** Update migration item input. */
export interface UpdateMigrationItemInput {
  /** Update migration item input properties. */
  properties?: UpdateMigrationItemInputProperties;
}

export function updateMigrationItemInputSerializer(item: UpdateMigrationItemInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateMigrationItemInputPropertiesSerializer(item["properties"]),
  };
}

/** Update migration item input properties. */
export interface UpdateMigrationItemInputProperties {
  /** The provider specific input to update migration item. */
  providerSpecificDetails: UpdateMigrationItemProviderSpecificInputUnion;
}

export function updateMigrationItemInputPropertiesSerializer(
  item: UpdateMigrationItemInputProperties,
): any {
  return {
    providerSpecificDetails: updateMigrationItemProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Update migration item provider specific input. */
export interface UpdateMigrationItemProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function updateMigrationItemProviderSpecificInputSerializer(
  item: UpdateMigrationItemProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for UpdateMigrationItemProviderSpecificInputUnion */
export type UpdateMigrationItemProviderSpecificInputUnion =
  | VMwareCbtUpdateMigrationItemInput
  | UpdateMigrationItemProviderSpecificInput;

export function updateMigrationItemProviderSpecificInputUnionSerializer(
  item: UpdateMigrationItemProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtUpdateMigrationItemInputSerializer(item as VMwareCbtUpdateMigrationItemInput);

    default:
      return updateMigrationItemProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific update migration item input. */
export interface VMwareCbtUpdateMigrationItemInput extends UpdateMigrationItemProviderSpecificInput {
  /** The target VM name. */
  targetVmName?: string;
  /** The target VM size. */
  targetVmSize?: string;
  /** The target resource group ARM Id. */
  targetResourceGroupId?: string;
  /** The target availability set ARM Id. */
  targetAvailabilitySetId?: string;
  /** The target availability zone. */
  targetAvailabilityZone?: string;
  /** The target proximity placement group ARM Id. */
  targetProximityPlacementGroupId?: string;
  /** The target boot diagnostics storage account ARM Id. */
  targetBootDiagnosticsStorageAccountId?: string;
  /** The target network ARM Id. */
  targetNetworkId?: string;
  /** The test network ARM Id. */
  testNetworkId?: string;
  /** The list of NIC details. */
  vmNics?: VMwareCbtNicInput[];
  /** The list of disk update properties. */
  vmDisks?: VMwareCbtUpdateDiskInput[];
  /** The license type. */
  licenseType?: LicenseType;
  /** The SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** The license type for Linux VM's. */
  linuxLicenseType?: LinuxLicenseType;
  /** The OS name selected by user. */
  userSelectedOSName?: string;
  /** A value indicating whether auto resync is to be done. */
  performAutoResync?: string;
  /** The target VM tags. */
  targetVmTags?: Record<string, string>;
  /** The tags for the target disks. */
  targetDiskTags?: Record<string, string>;
  /** The tags for the target NICs. */
  targetNicTags?: Record<string, string>;
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtUpdateMigrationItemInputSerializer(
  item: VMwareCbtUpdateMigrationItemInput,
): any {
  return {
    instanceType: item["instanceType"],
    targetVmName: item["targetVmName"],
    targetVmSize: item["targetVmSize"],
    targetResourceGroupId: item["targetResourceGroupId"],
    targetAvailabilitySetId: item["targetAvailabilitySetId"],
    targetAvailabilityZone: item["targetAvailabilityZone"],
    targetProximityPlacementGroupId: item["targetProximityPlacementGroupId"],
    targetBootDiagnosticsStorageAccountId: item["targetBootDiagnosticsStorageAccountId"],
    targetNetworkId: item["targetNetworkId"],
    testNetworkId: item["testNetworkId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vMwareCbtNicInputArraySerializer(item["vmNics"]),
    vmDisks: !item["vmDisks"]
      ? item["vmDisks"]
      : vMwareCbtUpdateDiskInputArraySerializer(item["vmDisks"]),
    licenseType: item["licenseType"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    linuxLicenseType: item["linuxLicenseType"],
    userSelectedOSName: item["userSelectedOSName"],
    performAutoResync: item["performAutoResync"],
    targetVmTags: item["targetVmTags"],
    targetDiskTags: item["targetDiskTags"],
    targetNicTags: item["targetNicTags"],
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function vMwareCbtNicInputArraySerializer(result: Array<VMwareCbtNicInput>): any[] {
  return result.map((item) => {
    return vMwareCbtNicInputSerializer(item);
  });
}

/** VMwareCbt NIC input. */
export interface VMwareCbtNicInput {
  /** The NIC Id. */
  nicId: string;
  /** A value indicating whether this is the primary NIC. */
  isPrimaryNic: string;
  /** Target subnet name. */
  targetSubnetName?: string;
  /** The static IP address. */
  targetStaticIPAddress?: string;
  /** A value indicating whether this NIC is selected for migration. */
  isSelectedForMigration?: string;
  /** Target NIC name. */
  targetNicName?: string;
  /** The test subnet name. */
  testSubnetName?: string;
  /** The test static IP address. */
  testStaticIPAddress?: string;
}

export function vMwareCbtNicInputSerializer(item: VMwareCbtNicInput): any {
  return {
    nicId: item["nicId"],
    isPrimaryNic: item["isPrimaryNic"],
    targetSubnetName: item["targetSubnetName"],
    targetStaticIPAddress: item["targetStaticIPAddress"],
    isSelectedForMigration: item["isSelectedForMigration"],
    targetNicName: item["targetNicName"],
    testSubnetName: item["testSubnetName"],
    testStaticIPAddress: item["testStaticIPAddress"],
  };
}

export function vMwareCbtUpdateDiskInputArraySerializer(
  result: Array<VMwareCbtUpdateDiskInput>,
): any[] {
  return result.map((item) => {
    return vMwareCbtUpdateDiskInputSerializer(item);
  });
}

/** VMwareCbt disk input for update. */
export interface VMwareCbtUpdateDiskInput {
  /** The disk Id. */
  diskId: string;
  /** The target disk name. */
  targetDiskName?: string;
  /** A value indicating whether the disk is the OS disk. */
  isOSDisk?: string;
  /** The number of IOPS allowed for Premium V2 and Ultra disks. */
  iops?: number;
  /** The total throughput in Mbps for Premium V2 and Ultra disks. */
  throughputInMbps?: number;
  /** The target disk size in GB. */
  diskSizeInGB?: number;
}

export function vMwareCbtUpdateDiskInputSerializer(item: VMwareCbtUpdateDiskInput): any {
  return {
    diskId: item["diskId"],
    targetDiskName: item["targetDiskName"],
    isOSDisk: item["isOSDisk"],
    iops: item["iops"],
    throughputInMbps: item["throughputInMbps"],
    diskSizeInGB: item["diskSizeInGB"],
  };
}

/** Migration item collection. */
export interface _MigrationItemCollection {
  /** The MigrationItem items on this page */
  value: MigrationItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationItemCollectionDeserializer(item: any): _MigrationItemCollection {
  return {
    value: migrationItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationItemArrayDeserializer(result: Array<MigrationItem>): any[] {
  return result.map((item) => {
    return migrationItemDeserializer(item);
  });
}

/** Input for migrate. */
export interface MigrateInput {
  /** Migrate input properties. */
  properties: MigrateInputProperties;
}

export function migrateInputSerializer(item: MigrateInput): any {
  return { properties: migrateInputPropertiesSerializer(item["properties"]) };
}

/** Migrate input properties. */
export interface MigrateInputProperties {
  /** The provider specific details. */
  providerSpecificDetails: MigrateProviderSpecificInputUnion;
}

export function migrateInputPropertiesSerializer(item: MigrateInputProperties): any {
  return {
    providerSpecificDetails: migrateProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Migrate provider specific input. */
export interface MigrateProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function migrateProviderSpecificInputSerializer(item: MigrateProviderSpecificInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for MigrateProviderSpecificInputUnion */
export type MigrateProviderSpecificInputUnion =
  | VMwareCbtMigrateInput
  | MigrateProviderSpecificInput;

export function migrateProviderSpecificInputUnionSerializer(
  item: MigrateProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtMigrateInputSerializer(item as VMwareCbtMigrateInput);

    default:
      return migrateProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific migrate input. */
export interface VMwareCbtMigrateInput extends MigrateProviderSpecificInput {
  /** A value indicating whether VM is to be shutdown. */
  performShutdown: string;
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The managed run command script input. */
  postMigrationSteps?: ManagedRunCommandScriptInput[];
  /** The target capacity reservation group ARM Id. */
  targetCapacityReservationGroupId?: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtMigrateInputSerializer(item: VMwareCbtMigrateInput): any {
  return {
    instanceType: item["instanceType"],
    performShutdown: item["performShutdown"],
    osUpgradeVersion: item["osUpgradeVersion"],
    postMigrationSteps: !item["postMigrationSteps"]
      ? item["postMigrationSteps"]
      : managedRunCommandScriptInputArraySerializer(item["postMigrationSteps"]),
    targetCapacityReservationGroupId: item["targetCapacityReservationGroupId"],
  };
}

export function managedRunCommandScriptInputArraySerializer(
  result: Array<ManagedRunCommandScriptInput>,
): any[] {
  return result.map((item) => {
    return managedRunCommandScriptInputSerializer(item);
  });
}

/** Managed RunCommand script input */
export interface ManagedRunCommandScriptInput {
  /** The step name. */
  stepName: string;
  /** The script url. */
  scriptUrl: string;
  /** The script parameters. */
  scriptParameters: string;
}

export function managedRunCommandScriptInputSerializer(item: ManagedRunCommandScriptInput): any {
  return {
    stepName: item["stepName"],
    scriptUrl: item["scriptUrl"],
    scriptParameters: item["scriptParameters"],
  };
}

/** Pause replication input. */
export interface PauseReplicationInput {
  /** Pause replication input properties. */
  properties: PauseReplicationInputProperties;
}

export function pauseReplicationInputSerializer(item: PauseReplicationInput): any {
  return { properties: pauseReplicationInputPropertiesSerializer(item["properties"]) };
}

/** Pause replication input properties. */
export interface PauseReplicationInputProperties {
  /** The class type. */
  instanceType: string;
}

export function pauseReplicationInputPropertiesSerializer(
  item: PauseReplicationInputProperties,
): any {
  return { instanceType: item["instanceType"] };
}

/** Resume replication input. */
export interface ResumeReplicationInput {
  /** Resume replication input properties. */
  properties: ResumeReplicationInputProperties;
}

export function resumeReplicationInputSerializer(item: ResumeReplicationInput): any {
  return { properties: resumeReplicationInputPropertiesSerializer(item["properties"]) };
}

/** Resume replication input properties. */
export interface ResumeReplicationInputProperties {
  /** The provider specific input for resume replication. */
  providerSpecificDetails: ResumeReplicationProviderSpecificInputUnion;
}

export function resumeReplicationInputPropertiesSerializer(
  item: ResumeReplicationInputProperties,
): any {
  return {
    providerSpecificDetails: resumeReplicationProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Resume replication provider specific input. */
export interface ResumeReplicationProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function resumeReplicationProviderSpecificInputSerializer(
  item: ResumeReplicationProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ResumeReplicationProviderSpecificInputUnion */
export type ResumeReplicationProviderSpecificInputUnion =
  | VMwareCbtResumeReplicationInput
  | ResumeReplicationProviderSpecificInput;

export function resumeReplicationProviderSpecificInputUnionSerializer(
  item: ResumeReplicationProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtResumeReplicationInputSerializer(item as VMwareCbtResumeReplicationInput);

    default:
      return resumeReplicationProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific resume replication input. */
export interface VMwareCbtResumeReplicationInput extends ResumeReplicationProviderSpecificInput {
  /** A value indicating whether Migration resources to be deleted. */
  deleteMigrationResources?: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtResumeReplicationInputSerializer(
  item: VMwareCbtResumeReplicationInput,
): any {
  return {
    instanceType: item["instanceType"],
    deleteMigrationResources: item["deleteMigrationResources"],
  };
}

/** Resync input. */
export interface ResyncInput {
  /** Resync input properties. */
  properties: ResyncInputProperties;
}

export function resyncInputSerializer(item: ResyncInput): any {
  return { properties: resyncInputPropertiesSerializer(item["properties"]) };
}

/** Resync input properties. */
export interface ResyncInputProperties {
  /** The provider specific details. */
  providerSpecificDetails: ResyncProviderSpecificInputUnion;
}

export function resyncInputPropertiesSerializer(item: ResyncInputProperties): any {
  return {
    providerSpecificDetails: resyncProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Resync provider specific input. */
export interface ResyncProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function resyncProviderSpecificInputSerializer(item: ResyncProviderSpecificInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ResyncProviderSpecificInputUnion */
export type ResyncProviderSpecificInputUnion = VMwareCbtResyncInput | ResyncProviderSpecificInput;

export function resyncProviderSpecificInputUnionSerializer(
  item: ResyncProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtResyncInputSerializer(item as VMwareCbtResyncInput);

    default:
      return resyncProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific resync input. */
export interface VMwareCbtResyncInput extends ResyncProviderSpecificInput {
  /** A value indicating whether CBT is to be reset. */
  skipCbtReset: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtResyncInputSerializer(item: VMwareCbtResyncInput): any {
  return { instanceType: item["instanceType"], skipCbtReset: item["skipCbtReset"] };
}

/** Input for test migrate. */
export interface TestMigrateInput {
  /** Test migrate input properties. */
  properties: TestMigrateInputProperties;
}

export function testMigrateInputSerializer(item: TestMigrateInput): any {
  return { properties: testMigrateInputPropertiesSerializer(item["properties"]) };
}

/** Test migrate input properties. */
export interface TestMigrateInputProperties {
  /** The provider specific details. */
  providerSpecificDetails: TestMigrateProviderSpecificInputUnion;
}

export function testMigrateInputPropertiesSerializer(item: TestMigrateInputProperties): any {
  return {
    providerSpecificDetails: testMigrateProviderSpecificInputUnionSerializer(
      item["providerSpecificDetails"],
    ),
  };
}

/** Test migrate provider specific input. */
export interface TestMigrateProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: VMwareCbt */
  instanceType: string;
}

export function testMigrateProviderSpecificInputSerializer(
  item: TestMigrateProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for TestMigrateProviderSpecificInputUnion */
export type TestMigrateProviderSpecificInputUnion =
  | VMwareCbtTestMigrateInput
  | TestMigrateProviderSpecificInput;

export function testMigrateProviderSpecificInputUnionSerializer(
  item: TestMigrateProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "VMwareCbt":
      return vMwareCbtTestMigrateInputSerializer(item as VMwareCbtTestMigrateInput);

    default:
      return testMigrateProviderSpecificInputSerializer(item);
  }
}

/** VMwareCbt specific test migrate input. */
export interface VMwareCbtTestMigrateInput extends TestMigrateProviderSpecificInput {
  /** The recovery point Id. */
  recoveryPointId: string;
  /** The test network Id. */
  networkId: string;
  /** The list of NIC details. */
  vmNics?: VMwareCbtNicInput[];
  /** A value indicating the inplace OS Upgrade version. */
  osUpgradeVersion?: string;
  /** The managed run command script input. */
  postMigrationSteps?: ManagedRunCommandScriptInput[];
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtTestMigrateInputSerializer(item: VMwareCbtTestMigrateInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointId: item["recoveryPointId"],
    networkId: item["networkId"],
    vmNics: !item["vmNics"] ? item["vmNics"] : vMwareCbtNicInputArraySerializer(item["vmNics"]),
    osUpgradeVersion: item["osUpgradeVersion"],
    postMigrationSteps: !item["postMigrationSteps"]
      ? item["postMigrationSteps"]
      : managedRunCommandScriptInputArraySerializer(item["postMigrationSteps"]),
  };
}

/** Input for test migrate cleanup. */
export interface TestMigrateCleanupInput {
  /** Test migrate cleanup input properties. */
  properties: TestMigrateCleanupInputProperties;
}

export function testMigrateCleanupInputSerializer(item: TestMigrateCleanupInput): any {
  return { properties: testMigrateCleanupInputPropertiesSerializer(item["properties"]) };
}

/** Test migrate cleanup input properties. */
export interface TestMigrateCleanupInputProperties {
  /** Test migrate cleanup comments. */
  comments?: string;
}

export function testMigrateCleanupInputPropertiesSerializer(
  item: TestMigrateCleanupInputProperties,
): any {
  return { comments: item["comments"] };
}

/** Replication protected item. */
export interface ProtectableItem extends ProxyResource {
  /** The custom data. */
  properties?: ProtectableItemProperties;
  /** Resource Location */
  location?: string;
}

export function protectableItemDeserializer(item: any): ProtectableItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectableItemPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Replication protected item custom data details. */
export interface ProtectableItemProperties {
  /** The name. */
  friendlyName?: string;
  /** The protection status. */
  protectionStatus?: string;
  /** The ARM resource of protected items. */
  replicationProtectedItemId?: string;
  /** The recovery provider ARM Id. */
  recoveryServicesProviderId?: string;
  /** The Current protection readiness errors. */
  protectionReadinessErrors?: string[];
  /** The list of replication providers supported for the protectable item. */
  supportedReplicationProviders?: string[];
  /** The Replication provider custom settings. */
  customDetails?: ConfigurationSettingsUnion;
}

export function protectableItemPropertiesDeserializer(item: any): ProtectableItemProperties {
  return {
    friendlyName: item["friendlyName"],
    protectionStatus: item["protectionStatus"],
    replicationProtectedItemId: item["replicationProtectedItemId"],
    recoveryServicesProviderId: item["recoveryServicesProviderId"],
    protectionReadinessErrors: !item["protectionReadinessErrors"]
      ? item["protectionReadinessErrors"]
      : item["protectionReadinessErrors"].map((p: any) => {
          return p;
        }),
    supportedReplicationProviders: !item["supportedReplicationProviders"]
      ? item["supportedReplicationProviders"]
      : item["supportedReplicationProviders"].map((p: any) => {
          return p;
        }),
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : configurationSettingsUnionDeserializer(item["customDetails"]),
  };
}

/** Replication provider specific settings. */
export interface ConfigurationSettings {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: HyperVVirtualMachine, ReplicationGroupDetails, VmmVirtualMachine, VMwareVirtualMachine */
  instanceType: string;
}

export function configurationSettingsDeserializer(item: any): ConfigurationSettings {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ConfigurationSettingsUnion */
export type ConfigurationSettingsUnion =
  | HyperVVirtualMachineDetailsUnion
  | ReplicationGroupDetails
  | VMwareVirtualMachineDetails
  | ConfigurationSettings;

export function configurationSettingsUnionDeserializer(item: any): ConfigurationSettingsUnion {
  switch (item["instanceType"]) {
    case "HyperVVirtualMachine":
    case "VmmVirtualMachine":
      return hyperVVirtualMachineDetailsUnionDeserializer(item as HyperVVirtualMachineDetailsUnion);

    case "ReplicationGroupDetails":
      return replicationGroupDetailsDeserializer(item as ReplicationGroupDetails);

    case "VMwareVirtualMachine":
      return vMwareVirtualMachineDetailsDeserializer(item as VMwareVirtualMachineDetails);

    default:
      return configurationSettingsDeserializer(item);
  }
}

/** Single Host fabric provider specific VM settings. */
export interface HyperVVirtualMachineDetails extends ConfigurationSettings {
  /** The source id of the object. */
  sourceItemId?: string;
  /** The id of the object in fabric. */
  generation?: string;
  /** The Last replication time. */
  osDetails?: OSDetails;
  /** The Last successful failover time. */
  diskDetails?: DiskDetails[];
  /** A value indicating whether the VM has a physical disk attached. String value of SrsDataContract.PresenceStatus enum. */
  hasPhysicalDisk?: PresenceStatus;
  /** A value indicating whether the VM has a fibre channel adapter attached. String value of SrsDataContract.PresenceStatus enum. */
  hasFibreChannelAdapter?: PresenceStatus;
  /** A value indicating whether the VM has a shared VHD attached. String value of SrsDataContract.PresenceStatus enum. */
  hasSharedVhd?: PresenceStatus;
  /** The Id of the hyper-v host in fabric. */
  hyperVHostId?: string;
  instanceType: "HyperVVirtualMachine" | "VmmVirtualMachine";
}

export function hyperVVirtualMachineDetailsDeserializer(item: any): HyperVVirtualMachineDetails {
  return {
    instanceType: item["instanceType"],
    sourceItemId: item["sourceItemId"],
    generation: item["generation"],
    osDetails: !item["osDetails"] ? item["osDetails"] : osDetailsDeserializer(item["osDetails"]),
    diskDetails: !item["diskDetails"]
      ? item["diskDetails"]
      : diskDetailsArrayDeserializer(item["diskDetails"]),
    hasPhysicalDisk: item["hasPhysicalDisk"],
    hasFibreChannelAdapter: item["hasFibreChannelAdapter"],
    hasSharedVhd: item["hasSharedVhd"],
    hyperVHostId: item["hyperVHostId"],
  };
}

/** Alias for HyperVVirtualMachineDetailsUnion */
export type HyperVVirtualMachineDetailsUnion =
  | VmmVirtualMachineDetails
  | HyperVVirtualMachineDetails;

export function hyperVVirtualMachineDetailsUnionDeserializer(
  item: any,
): HyperVVirtualMachineDetailsUnion {
  switch (item["instanceType"]) {
    case "VmmVirtualMachine":
      return vmmVirtualMachineDetailsDeserializer(item as VmmVirtualMachineDetails);

    default:
      return hyperVVirtualMachineDetailsDeserializer(item);
  }
}

/** A value indicating whether the VM has a physical disk attached. String value of SrsDataContract.PresenceStatus enum. */
export enum KnownPresenceStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Present */
  Present = "Present",
  /** NotPresent */
  NotPresent = "NotPresent",
}

/**
 * A value indicating whether the VM has a physical disk attached. String value of SrsDataContract.PresenceStatus enum. \
 * {@link KnownPresenceStatus} can be used interchangeably with PresenceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Present**: Present \
 * **NotPresent**: NotPresent
 */
export type PresenceStatus = string;

/** VMM fabric provider specific VM settings. */
export interface VmmVirtualMachineDetails extends HyperVVirtualMachineDetails {
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VmmVirtualMachine";
}

export function vmmVirtualMachineDetailsDeserializer(item: any): VmmVirtualMachineDetails {
  return {
    sourceItemId: item["sourceItemId"],
    generation: item["generation"],
    osDetails: !item["osDetails"] ? item["osDetails"] : osDetailsDeserializer(item["osDetails"]),
    diskDetails: !item["diskDetails"]
      ? item["diskDetails"]
      : diskDetailsArrayDeserializer(item["diskDetails"]),
    hasPhysicalDisk: item["hasPhysicalDisk"],
    hasFibreChannelAdapter: item["hasFibreChannelAdapter"],
    hasSharedVhd: item["hasSharedVhd"],
    hyperVHostId: item["hyperVHostId"],
    instanceType: item["instanceType"],
  };
}

/** Replication group details. This will be used in case of San. */
export interface ReplicationGroupDetails extends ConfigurationSettings {
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "ReplicationGroupDetails";
}

export function replicationGroupDetailsDeserializer(item: any): ReplicationGroupDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** VMware provider specific settings. */
export interface VMwareVirtualMachineDetails extends ConfigurationSettings {
  /** The ID generated by the InMage agent after it gets installed on guest. This is the ID to be used during InMage CreateProtection. */
  agentGeneratedId?: string;
  /** The value indicating if InMage scout agent is installed on guest. */
  agentInstalled?: string;
  /** The OsType installed on VM. */
  osType?: string;
  /** The agent version. */
  agentVersion?: string;
  /** The IP address. */
  ipAddress?: string;
  /** The value indicating whether VM is powered on. */
  poweredOn?: string;
  /** The VCenter infrastructure Id. */
  vCenterInfrastructureId?: string;
  /** A value indicating the discovery type of the machine. Value can be vCenter or physical. */
  discoveryType?: string;
  /** The disk details. */
  diskDetails?: InMageDiskDetails[];
  /** The validation errors. */
  validationErrors?: HealthError[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMwareVirtualMachine";
}

export function vMwareVirtualMachineDetailsDeserializer(item: any): VMwareVirtualMachineDetails {
  return {
    instanceType: item["instanceType"],
    agentGeneratedId: item["agentGeneratedId"],
    agentInstalled: item["agentInstalled"],
    osType: item["osType"],
    agentVersion: item["agentVersion"],
    ipAddress: item["ipAddress"],
    poweredOn: item["poweredOn"],
    vCenterInfrastructureId: item["vCenterInfrastructureId"],
    discoveryType: item["discoveryType"],
    diskDetails: !item["diskDetails"]
      ? item["diskDetails"]
      : inMageDiskDetailsArrayDeserializer(item["diskDetails"]),
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : healthErrorArrayDeserializer(item["validationErrors"]),
  };
}

export function inMageDiskDetailsArrayDeserializer(result: Array<InMageDiskDetails>): any[] {
  return result.map((item) => {
    return inMageDiskDetailsDeserializer(item);
  });
}

/** VMware/Physical specific Disk Details. */
export interface InMageDiskDetails {
  /** The disk Id. */
  diskId?: string;
  /** The disk name. */
  diskName?: string;
  /** The disk size in MB. */
  diskSizeInMB?: string;
  /** Whether disk is system disk or data disk. */
  diskType?: string;
  /** Whether disk is dynamic disk or basic disk. */
  diskConfiguration?: string;
  /** Volumes of the disk. */
  volumeList?: DiskVolumeDetails[];
}

export function inMageDiskDetailsDeserializer(item: any): InMageDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    diskSizeInMB: item["diskSizeInMB"],
    diskType: item["diskType"],
    diskConfiguration: item["diskConfiguration"],
    volumeList: !item["volumeList"]
      ? item["volumeList"]
      : diskVolumeDetailsArrayDeserializer(item["volumeList"]),
  };
}

export function diskVolumeDetailsArrayDeserializer(result: Array<DiskVolumeDetails>): any[] {
  return result.map((item) => {
    return diskVolumeDetailsDeserializer(item);
  });
}

/** Volume details. */
export interface DiskVolumeDetails {
  /** The volume label. */
  label?: string;
  /** The volume name. */
  name?: string;
}

export function diskVolumeDetailsDeserializer(item: any): DiskVolumeDetails {
  return {
    label: item["label"],
    name: item["name"],
  };
}

/** Protectable item collection. */
export interface _ProtectableItemCollection {
  /** The ProtectableItem items on this page */
  value: ProtectableItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectableItemCollectionDeserializer(item: any): _ProtectableItemCollection {
  return {
    value: protectableItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectableItemArrayDeserializer(result: Array<ProtectableItem>): any[] {
  return result.map((item) => {
    return protectableItemDeserializer(item);
  });
}

/** Protection container mapping object. */
export interface ProtectionContainerMapping extends ProxyResource {
  /** The custom data. */
  properties?: ProtectionContainerMappingProperties;
  /** Resource Location */
  location?: string;
}

export function protectionContainerMappingDeserializer(item: any): ProtectionContainerMapping {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : protectionContainerMappingPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Protection container mapping properties. */
export interface ProtectionContainerMappingProperties {
  /** Paired protection container ARM ID. */
  targetProtectionContainerId?: string;
  /** Friendly name of paired container. */
  targetProtectionContainerFriendlyName?: string;
  /** Provider specific provider details. */
  providerSpecificDetails?: ProtectionContainerMappingProviderSpecificDetailsUnion;
  /** Health of pairing. */
  health?: string;
  /** Health error. */
  healthErrorDetails?: HealthError[];
  /** Policy ARM Id. */
  policyId?: string;
  /** Association Status. */
  state?: string;
  /** Friendly name of source protection container. */
  sourceProtectionContainerFriendlyName?: string;
  /** Friendly name of source fabric. */
  sourceFabricFriendlyName?: string;
  /** Friendly name of target fabric. */
  targetFabricFriendlyName?: string;
  /** Friendly name of replication policy. */
  policyFriendlyName?: string;
}

export function protectionContainerMappingPropertiesDeserializer(
  item: any,
): ProtectionContainerMappingProperties {
  return {
    targetProtectionContainerId: item["targetProtectionContainerId"],
    targetProtectionContainerFriendlyName: item["targetProtectionContainerFriendlyName"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : protectionContainerMappingProviderSpecificDetailsUnionDeserializer(
          item["providerSpecificDetails"],
        ),
    health: item["health"],
    healthErrorDetails: !item["healthErrorDetails"]
      ? item["healthErrorDetails"]
      : healthErrorArrayDeserializer(item["healthErrorDetails"]),
    policyId: item["policyId"],
    state: item["state"],
    sourceProtectionContainerFriendlyName: item["sourceProtectionContainerFriendlyName"],
    sourceFabricFriendlyName: item["sourceFabricFriendlyName"],
    targetFabricFriendlyName: item["targetFabricFriendlyName"],
    policyFriendlyName: item["policyFriendlyName"],
  };
}

/** Container mapping provider specific details. */
export interface ProtectionContainerMappingProviderSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: A2A, InMageRcm, VMwareCbt */
  instanceType: string;
}

export function protectionContainerMappingProviderSpecificDetailsDeserializer(
  item: any,
): ProtectionContainerMappingProviderSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ProtectionContainerMappingProviderSpecificDetailsUnion */
export type ProtectionContainerMappingProviderSpecificDetailsUnion =
  | A2AProtectionContainerMappingDetails
  | InMageRcmProtectionContainerMappingDetails
  | VMwareCbtProtectionContainerMappingDetails
  | ProtectionContainerMappingProviderSpecificDetails;

export function protectionContainerMappingProviderSpecificDetailsUnionDeserializer(
  item: any,
): ProtectionContainerMappingProviderSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2AProtectionContainerMappingDetailsDeserializer(
        item as A2AProtectionContainerMappingDetails,
      );

    case "InMageRcm":
      return inMageRcmProtectionContainerMappingDetailsDeserializer(
        item as InMageRcmProtectionContainerMappingDetails,
      );

    case "VMwareCbt":
      return vMwareCbtProtectionContainerMappingDetailsDeserializer(
        item as VMwareCbtProtectionContainerMappingDetails,
      );

    default:
      return protectionContainerMappingProviderSpecificDetailsDeserializer(item);
  }
}

/** A2A provider specific settings. */
export interface A2AProtectionContainerMappingDetails extends ProtectionContainerMappingProviderSpecificDetails {
  /** A value indicating whether the auto update is enabled. */
  agentAutoUpdateStatus?: AgentAutoUpdateStatus;
  /** The automation account arm id. */
  automationAccountArmId?: string;
  /** A value indicating the type authentication to use for automation Account. */
  automationAccountAuthenticationType?: AutomationAccountAuthenticationType;
  /** The schedule arm name. */
  scheduleName?: string;
  /** The job schedule arm name. */
  jobScheduleName?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "A2A";
}

export function a2AProtectionContainerMappingDetailsDeserializer(
  item: any,
): A2AProtectionContainerMappingDetails {
  return {
    instanceType: item["instanceType"],
    agentAutoUpdateStatus: item["agentAutoUpdateStatus"],
    automationAccountArmId: item["automationAccountArmId"],
    automationAccountAuthenticationType: item["automationAccountAuthenticationType"],
    scheduleName: item["scheduleName"],
    jobScheduleName: item["jobScheduleName"],
  };
}

/** InMageRcm provider specific container mapping details. */
export interface InMageRcmProtectionContainerMappingDetails extends ProtectionContainerMappingProviderSpecificDetails {
  /** A value indicating whether the flag for enable agent auto upgrade. */
  readonly enableAgentAutoUpgrade?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcm";
}

export function inMageRcmProtectionContainerMappingDetailsDeserializer(
  item: any,
): InMageRcmProtectionContainerMappingDetails {
  return {
    instanceType: item["instanceType"],
    enableAgentAutoUpgrade: item["enableAgentAutoUpgrade"],
  };
}

/** VMwareCbt provider specific container mapping details. */
export interface VMwareCbtProtectionContainerMappingDetails extends ProtectionContainerMappingProviderSpecificDetails {
  /** The target key vault ARM Id. */
  readonly keyVaultId?: string;
  /** The target key vault URI. */
  readonly keyVaultUri?: string;
  /** The storage account ARM Id. */
  readonly storageAccountId?: string;
  /** The secret name of the storage account. */
  readonly storageAccountSasSecretName?: string;
  /** The secret name of the service bus connection string. */
  readonly serviceBusConnectionStringSecretName?: string;
  /** The target location. */
  readonly targetLocation?: string;
  /** The role size to NIC count map. */
  readonly roleSizeToNicCountMap?: Record<string, number>;
  /** The SKUs to be excluded. */
  excludedSkus?: string[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtProtectionContainerMappingDetailsDeserializer(
  item: any,
): VMwareCbtProtectionContainerMappingDetails {
  return {
    instanceType: item["instanceType"],
    keyVaultId: item["keyVaultId"],
    keyVaultUri: item["keyVaultUri"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
    serviceBusConnectionStringSecretName: item["serviceBusConnectionStringSecretName"],
    targetLocation: item["targetLocation"],
    roleSizeToNicCountMap: !item["roleSizeToNicCountMap"]
      ? item["roleSizeToNicCountMap"]
      : Object.fromEntries(
          Object.entries(item["roleSizeToNicCountMap"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    excludedSkus: !item["excludedSkus"]
      ? item["excludedSkus"]
      : item["excludedSkus"].map((p: any) => {
          return p;
        }),
  };
}

/** Configure pairing input. */
export interface CreateProtectionContainerMappingInput {
  /** Configure protection input properties. */
  properties?: CreateProtectionContainerMappingInputProperties;
}

export function createProtectionContainerMappingInputSerializer(
  item: CreateProtectionContainerMappingInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : createProtectionContainerMappingInputPropertiesSerializer(item["properties"]),
  };
}

/** Configure pairing input properties. */
export interface CreateProtectionContainerMappingInputProperties {
  /** The target unique protection container name. */
  targetProtectionContainerId?: string;
  /** Applicable policy. */
  policyId?: string;
  /** Provider specific input for pairing. */
  providerSpecificInput?: ReplicationProviderSpecificContainerMappingInputUnion;
}

export function createProtectionContainerMappingInputPropertiesSerializer(
  item: CreateProtectionContainerMappingInputProperties,
): any {
  return {
    targetProtectionContainerId: item["targetProtectionContainerId"],
    policyId: item["policyId"],
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : replicationProviderSpecificContainerMappingInputUnionSerializer(
          item["providerSpecificInput"],
        ),
  };
}

/** Provider specific input for pairing operations. */
export interface ReplicationProviderSpecificContainerMappingInput {
  /** The class type. */
  /** The discriminator possible values: A2A, VMwareCbt */
  instanceType: string;
}

export function replicationProviderSpecificContainerMappingInputSerializer(
  item: ReplicationProviderSpecificContainerMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ReplicationProviderSpecificContainerMappingInputUnion */
export type ReplicationProviderSpecificContainerMappingInputUnion =
  | A2AContainerMappingInput
  | VMwareCbtContainerMappingInput
  | ReplicationProviderSpecificContainerMappingInput;

export function replicationProviderSpecificContainerMappingInputUnionSerializer(
  item: ReplicationProviderSpecificContainerMappingInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AContainerMappingInputSerializer(item as A2AContainerMappingInput);

    case "VMwareCbt":
      return vMwareCbtContainerMappingInputSerializer(item as VMwareCbtContainerMappingInput);

    default:
      return replicationProviderSpecificContainerMappingInputSerializer(item);
  }
}

/** A2A container mapping input. */
export interface A2AContainerMappingInput extends ReplicationProviderSpecificContainerMappingInput {
  /** A value indicating whether the auto update is enabled. */
  agentAutoUpdateStatus?: AgentAutoUpdateStatus;
  /** The automation account arm id. */
  automationAccountArmId?: string;
  /** A value indicating the type authentication to use for automation Account. */
  automationAccountAuthenticationType?: AutomationAccountAuthenticationType;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AContainerMappingInputSerializer(item: A2AContainerMappingInput): any {
  return {
    instanceType: item["instanceType"],
    agentAutoUpdateStatus: item["agentAutoUpdateStatus"],
    automationAccountArmId: item["automationAccountArmId"],
    automationAccountAuthenticationType: item["automationAccountAuthenticationType"],
  };
}

/** VMwareCbt container mapping input. */
export interface VMwareCbtContainerMappingInput extends ReplicationProviderSpecificContainerMappingInput {
  /** The target key vault ARM Id. */
  keyVaultId?: string;
  /** The target key vault URL. */
  keyVaultUri?: string;
  /** The storage account ARM Id. */
  storageAccountId: string;
  /** The secret name of the storage account. */
  storageAccountSasSecretName?: string;
  /** The secret name of the service bus connection string. */
  serviceBusConnectionStringSecretName?: string;
  /** The target location. */
  targetLocation: string;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtContainerMappingInputSerializer(
  item: VMwareCbtContainerMappingInput,
): any {
  return {
    instanceType: item["instanceType"],
    keyVaultId: item["keyVaultId"],
    keyVaultUri: item["keyVaultUri"],
    storageAccountId: item["storageAccountId"],
    storageAccountSasSecretName: item["storageAccountSasSecretName"],
    serviceBusConnectionStringSecretName: item["serviceBusConnectionStringSecretName"],
    targetLocation: item["targetLocation"],
  };
}

/** Container pairing update input. */
export interface UpdateProtectionContainerMappingInput {
  /** Update protection container mapping input properties. */
  properties?: UpdateProtectionContainerMappingInputProperties;
}

export function updateProtectionContainerMappingInputSerializer(
  item: UpdateProtectionContainerMappingInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateProtectionContainerMappingInputPropertiesSerializer(item["properties"]),
  };
}

/** Container pairing update input. */
export interface UpdateProtectionContainerMappingInputProperties {
  /** Provider specific input for updating protection container mapping. */
  providerSpecificInput?: ReplicationProviderSpecificUpdateContainerMappingInputUnion;
}

export function updateProtectionContainerMappingInputPropertiesSerializer(
  item: UpdateProtectionContainerMappingInputProperties,
): any {
  return {
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : replicationProviderSpecificUpdateContainerMappingInputUnionSerializer(
          item["providerSpecificInput"],
        ),
  };
}

/** Provider specific input for update pairing operations. */
export interface ReplicationProviderSpecificUpdateContainerMappingInput {
  /** The class type. */
  /** The discriminator possible values: A2A, InMageRcm */
  instanceType: string;
}

export function replicationProviderSpecificUpdateContainerMappingInputSerializer(
  item: ReplicationProviderSpecificUpdateContainerMappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for ReplicationProviderSpecificUpdateContainerMappingInputUnion */
export type ReplicationProviderSpecificUpdateContainerMappingInputUnion =
  | A2AUpdateContainerMappingInput
  | InMageRcmUpdateContainerMappingInput
  | ReplicationProviderSpecificUpdateContainerMappingInput;

export function replicationProviderSpecificUpdateContainerMappingInputUnionSerializer(
  item: ReplicationProviderSpecificUpdateContainerMappingInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return a2AUpdateContainerMappingInputSerializer(item as A2AUpdateContainerMappingInput);

    case "InMageRcm":
      return inMageRcmUpdateContainerMappingInputSerializer(
        item as InMageRcmUpdateContainerMappingInput,
      );

    default:
      return replicationProviderSpecificUpdateContainerMappingInputSerializer(item);
  }
}

/** A2A update protection container mapping. */
export interface A2AUpdateContainerMappingInput extends ReplicationProviderSpecificUpdateContainerMappingInput {
  /** A value indicating whether the auto update is enabled. */
  agentAutoUpdateStatus?: AgentAutoUpdateStatus;
  /** The automation account arm id. */
  automationAccountArmId?: string;
  /** A value indicating the type authentication to use for automation Account. */
  automationAccountAuthenticationType?: AutomationAccountAuthenticationType;
  /** The class type. */
  instanceType: "A2A";
}

export function a2AUpdateContainerMappingInputSerializer(
  item: A2AUpdateContainerMappingInput,
): any {
  return {
    instanceType: item["instanceType"],
    agentAutoUpdateStatus: item["agentAutoUpdateStatus"],
    automationAccountArmId: item["automationAccountArmId"],
    automationAccountAuthenticationType: item["automationAccountAuthenticationType"],
  };
}

/** InMageRcm update protection container mapping. */
export interface InMageRcmUpdateContainerMappingInput extends ReplicationProviderSpecificUpdateContainerMappingInput {
  /** A value indicating whether agent auto upgrade has to be enabled. */
  enableAgentAutoUpgrade: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmUpdateContainerMappingInputSerializer(
  item: InMageRcmUpdateContainerMappingInput,
): any {
  return {
    instanceType: item["instanceType"],
    enableAgentAutoUpgrade: item["enableAgentAutoUpgrade"],
  };
}

/** Protection container mapping collection class. */
export interface _ProtectionContainerMappingCollection {
  /** The ProtectionContainerMapping items on this page */
  value: ProtectionContainerMapping[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _protectionContainerMappingCollectionDeserializer(
  item: any,
): _ProtectionContainerMappingCollection {
  return {
    value: protectionContainerMappingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function protectionContainerMappingArrayDeserializer(
  result: Array<ProtectionContainerMapping>,
): any[] {
  return result.map((item) => {
    return protectionContainerMappingDeserializer(item);
  });
}

/** Container unpairing input. */
export interface RemoveProtectionContainerMappingInput {
  /** Configure protection input properties. */
  properties?: RemoveProtectionContainerMappingInputProperties;
}

export function removeProtectionContainerMappingInputSerializer(
  item: RemoveProtectionContainerMappingInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : removeProtectionContainerMappingInputPropertiesSerializer(item["properties"]),
  };
}

/** Unpairing input properties. */
export interface RemoveProtectionContainerMappingInputProperties {
  /** Provider specific input for unpairing. */
  providerSpecificInput?: ReplicationProviderContainerUnmappingInput;
}

export function removeProtectionContainerMappingInputPropertiesSerializer(
  item: RemoveProtectionContainerMappingInputProperties,
): any {
  return {
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : replicationProviderContainerUnmappingInputSerializer(item["providerSpecificInput"]),
  };
}

/** Provider specific input for unpairing operations. */
export interface ReplicationProviderContainerUnmappingInput {
  /** The class type. */
  instanceType?: string;
}

export function replicationProviderContainerUnmappingInputSerializer(
  item: ReplicationProviderContainerUnmappingInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Provider details. */
export interface RecoveryServicesProvider extends ProxyResource {
  /** Provider properties. */
  properties?: RecoveryServicesProviderProperties;
  /** Resource Location */
  location?: string;
}

export function recoveryServicesProviderDeserializer(item: any): RecoveryServicesProvider {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryServicesProviderPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Recovery services provider properties. */
export interface RecoveryServicesProviderProperties {
  /** Type of the site. */
  fabricType?: string;
  /** Friendly name of the DRA. */
  friendlyName?: string;
  /** The provider version. */
  providerVersion?: string;
  /** The fabric provider. */
  serverVersion?: string;
  /** DRA version status. */
  providerVersionState?: string;
  /** Expiry date of the version. */
  providerVersionExpiryDate?: Date;
  /** The fabric friendly name. */
  fabricFriendlyName?: string;
  /** Time when last heartbeat was sent by the DRA. */
  lastHeartBeat?: Date;
  /** A value indicating whether DRA is responsive. */
  connectionStatus?: string;
  /** Number of protected VMs currently managed by the DRA. */
  protectedItemCount?: number;
  /** The scenarios allowed on this provider. */
  allowedScenarios?: string[];
  /** The recovery services provider health error details. */
  healthErrorDetails?: HealthError[];
  /** The DRA Id. */
  draIdentifier?: string;
  /** The machine Id. */
  machineId?: string;
  /** The machine name. */
  machineName?: string;
  /** The Bios Id. */
  biosId?: string;
  /** The authentication identity details. */
  authenticationIdentityDetails?: IdentityProviderDetails;
  /** The resource access identity details. */
  resourceAccessIdentityDetails?: IdentityProviderDetails;
  /** The data plane authentication identity details. */
  dataPlaneAuthenticationIdentityDetails?: IdentityProviderDetails;
  /** The provider version details. */
  providerVersionDetails?: VersionDetails;
}

export function recoveryServicesProviderPropertiesDeserializer(
  item: any,
): RecoveryServicesProviderProperties {
  return {
    fabricType: item["fabricType"],
    friendlyName: item["friendlyName"],
    providerVersion: item["providerVersion"],
    serverVersion: item["serverVersion"],
    providerVersionState: item["providerVersionState"],
    providerVersionExpiryDate: !item["providerVersionExpiryDate"]
      ? item["providerVersionExpiryDate"]
      : new Date(item["providerVersionExpiryDate"]),
    fabricFriendlyName: item["fabricFriendlyName"],
    lastHeartBeat: !item["lastHeartBeat"] ? item["lastHeartBeat"] : new Date(item["lastHeartBeat"]),
    connectionStatus: item["connectionStatus"],
    protectedItemCount: item["protectedItemCount"],
    allowedScenarios: !item["allowedScenarios"]
      ? item["allowedScenarios"]
      : item["allowedScenarios"].map((p: any) => {
          return p;
        }),
    healthErrorDetails: !item["healthErrorDetails"]
      ? item["healthErrorDetails"]
      : healthErrorArrayDeserializer(item["healthErrorDetails"]),
    draIdentifier: item["draIdentifier"],
    machineId: item["machineId"],
    machineName: item["machineName"],
    biosId: item["biosId"],
    authenticationIdentityDetails: !item["authenticationIdentityDetails"]
      ? item["authenticationIdentityDetails"]
      : identityProviderDetailsDeserializer(item["authenticationIdentityDetails"]),
    resourceAccessIdentityDetails: !item["resourceAccessIdentityDetails"]
      ? item["resourceAccessIdentityDetails"]
      : identityProviderDetailsDeserializer(item["resourceAccessIdentityDetails"]),
    dataPlaneAuthenticationIdentityDetails: !item["dataPlaneAuthenticationIdentityDetails"]
      ? item["dataPlaneAuthenticationIdentityDetails"]
      : identityProviderDetailsDeserializer(item["dataPlaneAuthenticationIdentityDetails"]),
    providerVersionDetails: !item["providerVersionDetails"]
      ? item["providerVersionDetails"]
      : versionDetailsDeserializer(item["providerVersionDetails"]),
  };
}

/** Input required to add a provider. */
export interface AddRecoveryServicesProviderInput {
  /** The properties of an add provider request. */
  properties: AddRecoveryServicesProviderInputProperties;
}

export function addRecoveryServicesProviderInputSerializer(
  item: AddRecoveryServicesProviderInput,
): any {
  return { properties: addRecoveryServicesProviderInputPropertiesSerializer(item["properties"]) };
}

/** The properties of an add provider request. */
export interface AddRecoveryServicesProviderInputProperties {
  /** The name of the machine where the provider is getting added. */
  machineName: string;
  /** The Id of the machine where the provider is getting added. */
  machineId?: string;
  /** The Bios Id of the machine. */
  biosId?: string;
  /** The identity provider input for DRA authentication. */
  authenticationIdentityInput: IdentityProviderInput;
  /** The identity provider input for resource access. */
  resourceAccessIdentityInput: IdentityProviderInput;
  /** The identity provider input for data plane authentication. */
  dataPlaneAuthenticationIdentityInput?: IdentityProviderInput;
}

export function addRecoveryServicesProviderInputPropertiesSerializer(
  item: AddRecoveryServicesProviderInputProperties,
): any {
  return {
    machineName: item["machineName"],
    machineId: item["machineId"],
    biosId: item["biosId"],
    authenticationIdentityInput: identityProviderInputSerializer(
      item["authenticationIdentityInput"],
    ),
    resourceAccessIdentityInput: identityProviderInputSerializer(
      item["resourceAccessIdentityInput"],
    ),
    dataPlaneAuthenticationIdentityInput: !item["dataPlaneAuthenticationIdentityInput"]
      ? item["dataPlaneAuthenticationIdentityInput"]
      : identityProviderInputSerializer(item["dataPlaneAuthenticationIdentityInput"]),
  };
}

/** Collection of providers. */
export interface _RecoveryServicesProviderCollection {
  /** The RecoveryServicesProvider items on this page */
  value: RecoveryServicesProvider[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryServicesProviderCollectionDeserializer(
  item: any,
): _RecoveryServicesProviderCollection {
  return {
    value: recoveryServicesProviderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryServicesProviderArrayDeserializer(
  result: Array<RecoveryServicesProvider>,
): any[] {
  return result.map((item) => {
    return recoveryServicesProviderDeserializer(item);
  });
}

/** Storage object definition. */
export interface StorageClassification extends ProxyResource {
  /** Properties of the storage object. */
  properties?: StorageClassificationProperties;
  /** Resource Location */
  location?: string;
}

export function storageClassificationDeserializer(item: any): StorageClassification {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageClassificationPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Storage object properties. */
export interface StorageClassificationProperties {
  /** Friendly name of the Storage classification. */
  friendlyName?: string;
}

export function storageClassificationPropertiesDeserializer(
  item: any,
): StorageClassificationProperties {
  return {
    friendlyName: item["friendlyName"],
  };
}

/** Collection of storage details. */
export interface _StorageClassificationCollection {
  /** The StorageClassification items on this page */
  value: StorageClassification[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageClassificationCollectionDeserializer(
  item: any,
): _StorageClassificationCollection {
  return {
    value: storageClassificationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageClassificationArrayDeserializer(
  result: Array<StorageClassification>,
): any[] {
  return result.map((item) => {
    return storageClassificationDeserializer(item);
  });
}

/** Storage mapping object. */
export interface StorageClassificationMapping extends ProxyResource {
  /** Properties of the storage mapping object. */
  properties?: StorageClassificationMappingProperties;
  /** Resource Location */
  location?: string;
}

export function storageClassificationMappingDeserializer(item: any): StorageClassificationMapping {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageClassificationMappingPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Storage mapping properties. */
export interface StorageClassificationMappingProperties {
  /** Target storage object Id. */
  targetStorageClassificationId?: string;
}

export function storageClassificationMappingPropertiesDeserializer(
  item: any,
): StorageClassificationMappingProperties {
  return {
    targetStorageClassificationId: item["targetStorageClassificationId"],
  };
}

/** Storage mapping input. */
export interface StorageClassificationMappingInput {
  /** Storage mapping input properties. */
  properties?: StorageMappingInputProperties;
}

export function storageClassificationMappingInputSerializer(
  item: StorageClassificationMappingInput,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageMappingInputPropertiesSerializer(item["properties"]),
  };
}

/** Storage mapping input properties. */
export interface StorageMappingInputProperties {
  /** The ID of the storage object. */
  targetStorageClassificationId?: string;
}

export function storageMappingInputPropertiesSerializer(item: StorageMappingInputProperties): any {
  return { targetStorageClassificationId: item["targetStorageClassificationId"] };
}

/** Collection of storage mapping details. */
export interface _StorageClassificationMappingCollection {
  /** The StorageClassificationMapping items on this page */
  value: StorageClassificationMapping[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageClassificationMappingCollectionDeserializer(
  item: any,
): _StorageClassificationMappingCollection {
  return {
    value: storageClassificationMappingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageClassificationMappingArrayDeserializer(
  result: Array<StorageClassificationMapping>,
): any[] {
  return result.map((item) => {
    return storageClassificationMappingDeserializer(item);
  });
}

/** vCenter definition. */
export interface VCenter extends ProxyResource {
  /** VCenter related data. */
  properties?: VCenterProperties;
  /** Resource Location */
  location?: string;
}

export function vCenterDeserializer(item: any): VCenter {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vCenterPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** vCenter properties. */
export interface VCenterProperties {
  /** Friendly name of the vCenter. */
  friendlyName?: string;
  /** VCenter internal ID. */
  internalId?: string;
  /** The time when the last heartbeat was received by vCenter. */
  lastHeartbeat?: Date;
  /** The VCenter discovery status. */
  discoveryStatus?: string;
  /** The process server Id. */
  processServerId?: string;
  /** The IP address of the vCenter. */
  ipAddress?: string;
  /** The infrastructure Id of vCenter. */
  infrastructureId?: string;
  /** The port number for discovery. */
  port?: string;
  /** The account Id which has privileges to discover the vCenter. */
  runAsAccountId?: string;
  /** The ARM resource name of the fabric containing this VCenter. */
  fabricArmResourceName?: string;
  /** The health errors for this VCenter. */
  healthErrors?: HealthError[];
}

export function vCenterPropertiesDeserializer(item: any): VCenterProperties {
  return {
    friendlyName: item["friendlyName"],
    internalId: item["internalId"],
    lastHeartbeat: !item["lastHeartbeat"] ? item["lastHeartbeat"] : new Date(item["lastHeartbeat"]),
    discoveryStatus: item["discoveryStatus"],
    processServerId: item["processServerId"],
    ipAddress: item["ipAddress"],
    infrastructureId: item["infrastructureId"],
    port: item["port"],
    runAsAccountId: item["runAsAccountId"],
    fabricArmResourceName: item["fabricArmResourceName"],
    healthErrors: !item["healthErrors"]
      ? item["healthErrors"]
      : healthErrorArrayDeserializer(item["healthErrors"]),
  };
}

/** Input required to add vCenter. */
export interface AddVCenterRequest {
  /** The properties of an add vCenter request. */
  properties?: AddVCenterRequestProperties;
}

export function addVCenterRequestSerializer(item: AddVCenterRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : addVCenterRequestPropertiesSerializer(item["properties"]),
  };
}

/** The properties of an add vCenter request. */
export interface AddVCenterRequestProperties {
  /** The friendly name of the vCenter. */
  friendlyName?: string;
  /** The IP address of the vCenter to be discovered. */
  ipAddress?: string;
  /** The process server Id from where the discovery is orchestrated. */
  processServerId?: string;
  /** The port number for discovery. */
  port?: string;
  /** The account Id which has privileges to discover the vCenter. */
  runAsAccountId?: string;
}

export function addVCenterRequestPropertiesSerializer(item: AddVCenterRequestProperties): any {
  return {
    friendlyName: item["friendlyName"],
    ipAddress: item["ipAddress"],
    processServerId: item["processServerId"],
    port: item["port"],
    runAsAccountId: item["runAsAccountId"],
  };
}

/** Input required to update vCenter. */
export interface UpdateVCenterRequest {
  /** The update VCenter Request Properties. */
  properties?: UpdateVCenterRequestProperties;
}

export function updateVCenterRequestSerializer(item: UpdateVCenterRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateVCenterRequestPropertiesSerializer(item["properties"]),
  };
}

/** The properties of an update vCenter request. */
export interface UpdateVCenterRequestProperties {
  /** The friendly name of the vCenter. */
  friendlyName?: string;
  /** The IP address of the vCenter to be discovered. */
  ipAddress?: string;
  /** The process server Id from where the update can be orchestrated. */
  processServerId?: string;
  /** The port number for discovery. */
  port?: string;
  /** The CS account Id which has privileges to update the vCenter. */
  runAsAccountId?: string;
}

export function updateVCenterRequestPropertiesSerializer(
  item: UpdateVCenterRequestProperties,
): any {
  return {
    friendlyName: item["friendlyName"],
    ipAddress: item["ipAddress"],
    processServerId: item["processServerId"],
    port: item["port"],
    runAsAccountId: item["runAsAccountId"],
  };
}

/** Collection of vCenter details. */
export interface _VCenterCollection {
  /** The VCenter items on this page */
  value: VCenter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vCenterCollectionDeserializer(item: any): _VCenterCollection {
  return {
    value: vCenterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vCenterArrayDeserializer(result: Array<VCenter>): any[] {
  return result.map((item) => {
    return vCenterDeserializer(item);
  });
}

/** Job details. */
export interface Job extends ProxyResource {
  /** The custom data. */
  properties?: JobProperties;
  /** Resource Location */
  location?: string;
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : jobPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Job custom data details. */
export interface JobProperties {
  /** The activity id. */
  activityId?: string;
  /** The ScenarioName. */
  scenarioName?: string;
  /** The DisplayName. */
  friendlyName?: string;
  /** The status of the Job. It is one of these values - NotStarted, InProgress, Succeeded, Failed, Cancelled, Suspended or Other. */
  state?: string;
  /** The description of the state of the Job. For e.g. - For Succeeded state, description can be Completed, PartiallySucceeded, CompletedWithInformation or Skipped. */
  stateDescription?: string;
  /** The tasks. */
  tasks?: ASRTask[];
  /** The errors. */
  errors?: JobErrorDetails[];
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** The Allowed action the job. */
  allowedActions?: string[];
  /** The affected Object Id. */
  targetObjectId?: string;
  /** The name of the affected object. */
  targetObjectName?: string;
  /** The type of the affected object which is of Microsoft.Azure.SiteRecovery.V2015_11_10.AffectedObjectType class. */
  targetInstanceType?: string;
  /** The custom job details like test failover job details. */
  customDetails?: JobDetailsUnion;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    activityId: item["activityId"],
    scenarioName: item["scenarioName"],
    friendlyName: item["friendlyName"],
    state: item["state"],
    stateDescription: item["stateDescription"],
    tasks: !item["tasks"] ? item["tasks"] : asrTaskArrayDeserializer(item["tasks"]),
    errors: !item["errors"] ? item["errors"] : jobErrorDetailsArrayDeserializer(item["errors"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : item["allowedActions"].map((p: any) => {
          return p;
        }),
    targetObjectId: item["targetObjectId"],
    targetObjectName: item["targetObjectName"],
    targetInstanceType: item["targetInstanceType"],
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : jobDetailsUnionDeserializer(item["customDetails"]),
  };
}

export function asrTaskArrayDeserializer(result: Array<ASRTask>): any[] {
  return result.map((item) => {
    return asrTaskDeserializer(item);
  });
}

/** Task of the Job. */
export interface ASRTask {
  /** The Id. */
  taskId?: string;
  /** The unique Task name. */
  name?: string;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** The state/actions applicable on this task. */
  allowedActions?: string[];
  /** The name. */
  friendlyName?: string;
  /** The State. It is one of these values - NotStarted, InProgress, Succeeded, Failed, Cancelled, Suspended or Other. */
  state?: string;
  /** The description of the task state. For example - For Succeeded state, description can be Completed, PartiallySucceeded, CompletedWithInformation or Skipped. */
  stateDescription?: string;
  /** The type of task. Details in CustomDetails property depend on this type. */
  taskType?: string;
  /** The custom task details based on the task type. */
  customDetails?: TaskTypeDetailsUnion;
  /** The custom task details based on the task type, if the task type is GroupTaskDetails or one of the types derived from it. */
  groupTaskCustomDetails?: GroupTaskDetailsUnion;
  /** The task error details. */
  errors?: JobErrorDetails[];
}

export function asrTaskDeserializer(item: any): ASRTask {
  return {
    taskId: item["taskId"],
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : item["allowedActions"].map((p: any) => {
          return p;
        }),
    friendlyName: item["friendlyName"],
    state: item["state"],
    stateDescription: item["stateDescription"],
    taskType: item["taskType"],
    customDetails: !item["customDetails"]
      ? item["customDetails"]
      : taskTypeDetailsUnionDeserializer(item["customDetails"]),
    groupTaskCustomDetails: !item["groupTaskCustomDetails"]
      ? item["groupTaskCustomDetails"]
      : groupTaskDetailsUnionDeserializer(item["groupTaskCustomDetails"]),
    errors: !item["errors"] ? item["errors"] : jobErrorDetailsArrayDeserializer(item["errors"]),
  };
}

/** Task details based on specific task type. */
export interface TaskTypeDetails {
  /** The type of task details. */
  /** The discriminator possible values: AutomationRunbookTaskDetails, ConsistencyCheckTaskDetails, FabricReplicationGroupTaskDetails, JobTaskDetails, ManualActionTaskDetails, ScriptActionTaskDetails, VirtualMachineTaskDetails, VmNicUpdatesTaskDetails */
  instanceType: string;
}

export function taskTypeDetailsDeserializer(item: any): TaskTypeDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for TaskTypeDetailsUnion */
export type TaskTypeDetailsUnion =
  | AutomationRunbookTaskDetails
  | ConsistencyCheckTaskDetails
  | JobTaskDetailsUnion
  | ManualActionTaskDetails
  | ScriptActionTaskDetails
  | VmNicUpdatesTaskDetails
  | TaskTypeDetails;

export function taskTypeDetailsUnionDeserializer(item: any): TaskTypeDetailsUnion {
  switch (item["instanceType"]) {
    case "AutomationRunbookTaskDetails":
      return automationRunbookTaskDetailsDeserializer(item as AutomationRunbookTaskDetails);

    case "ConsistencyCheckTaskDetails":
      return consistencyCheckTaskDetailsDeserializer(item as ConsistencyCheckTaskDetails);

    case "JobTaskDetails":
    case "FabricReplicationGroupTaskDetails":
    case "VirtualMachineTaskDetails":
      return jobTaskDetailsUnionDeserializer(item as JobTaskDetailsUnion);

    case "ManualActionTaskDetails":
      return manualActionTaskDetailsDeserializer(item as ManualActionTaskDetails);

    case "ScriptActionTaskDetails":
      return scriptActionTaskDetailsDeserializer(item as ScriptActionTaskDetails);

    case "VmNicUpdatesTaskDetails":
      return vmNicUpdatesTaskDetailsDeserializer(item as VmNicUpdatesTaskDetails);

    default:
      return taskTypeDetailsDeserializer(item);
  }
}

/** This class represents the task details for an automation runbook. */
export interface AutomationRunbookTaskDetails extends TaskTypeDetails {
  /** The recovery plan task name. */
  name?: string;
  /** The cloud service of the automation runbook account. */
  cloudServiceName?: string;
  /** The subscription Id of the automation runbook account. */
  subscriptionId?: string;
  /** The automation account name of the runbook. */
  accountName?: string;
  /** The runbook Id. */
  runbookId?: string;
  /** The runbook name. */
  runbookName?: string;
  /** The job Id of the runbook execution. */
  jobId?: string;
  /** The execution output of the runbook. */
  jobOutput?: string;
  /** A value indicating whether it is a primary side script or not. */
  isPrimarySideScript?: boolean;
  /** The type of task details. */
  instanceType: "AutomationRunbookTaskDetails";
}

export function automationRunbookTaskDetailsDeserializer(item: any): AutomationRunbookTaskDetails {
  return {
    instanceType: item["instanceType"],
    name: item["name"],
    cloudServiceName: item["cloudServiceName"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    runbookId: item["runbookId"],
    runbookName: item["runbookName"],
    jobId: item["jobId"],
    jobOutput: item["jobOutput"],
    isPrimarySideScript: item["isPrimarySideScript"],
  };
}

/** This class contains monitoring details of all the inconsistent Protected Entities in Vmm. */
export interface ConsistencyCheckTaskDetails extends TaskTypeDetails {
  /** The list of inconsistent Vm details. */
  vmDetails?: InconsistentVmDetails[];
  /** The type of task details. */
  instanceType: "ConsistencyCheckTaskDetails";
}

export function consistencyCheckTaskDetailsDeserializer(item: any): ConsistencyCheckTaskDetails {
  return {
    instanceType: item["instanceType"],
    vmDetails: !item["vmDetails"]
      ? item["vmDetails"]
      : inconsistentVmDetailsArrayDeserializer(item["vmDetails"]),
  };
}

export function inconsistentVmDetailsArrayDeserializer(
  result: Array<InconsistentVmDetails>,
): any[] {
  return result.map((item) => {
    return inconsistentVmDetailsDeserializer(item);
  });
}

/** This class stores the monitoring details for consistency check of inconsistent Protected Entity. */
export interface InconsistentVmDetails {
  /** The Vm name. */
  vmName?: string;
  /** The Cloud name. */
  cloudName?: string;
  /** The list of details regarding state of the Protected Entity in SRS and On prem. */
  details?: string[];
  /** The list of error ids. */
  errorIds?: string[];
}

export function inconsistentVmDetailsDeserializer(item: any): InconsistentVmDetails {
  return {
    vmName: item["vmName"],
    cloudName: item["cloudName"],
    details: !item["details"]
      ? item["details"]
      : item["details"].map((p: any) => {
          return p;
        }),
    errorIds: !item["errorIds"]
      ? item["errorIds"]
      : item["errorIds"].map((p: any) => {
          return p;
        }),
  };
}

/** This class represents the fabric replication group task details. */
export interface FabricReplicationGroupTaskDetails extends JobTaskDetails {
  /** The type of task details. */
  instanceType: "FabricReplicationGroupTaskDetails";
  /** The skipped reason. */
  skippedReason?: string;
  /** The skipped reason string. */
  skippedReasonString?: string;
}

export function fabricReplicationGroupTaskDetailsDeserializer(
  item: any,
): FabricReplicationGroupTaskDetails {
  return {
    instanceType: item["instanceType"],
    jobTask: !item["jobTask"] ? item["jobTask"] : jobEntityDeserializer(item["jobTask"]),
    skippedReason: item["skippedReason"],
    skippedReasonString: item["skippedReasonString"],
  };
}

/** This class represents a task which is actually a workflow so that one can navigate to its individual drill down. */
export interface JobTaskDetails extends TaskTypeDetails {
  instanceType:
    | "JobTaskDetails"
    | "FabricReplicationGroupTaskDetails"
    | "VirtualMachineTaskDetails";
  /** The job entity. */
  jobTask?: JobEntity;
}

export function jobTaskDetailsDeserializer(item: any): JobTaskDetails {
  return {
    instanceType: item["instanceType"],
    jobTask: !item["jobTask"] ? item["jobTask"] : jobEntityDeserializer(item["jobTask"]),
  };
}

/** Alias for JobTaskDetailsUnion */
export type JobTaskDetailsUnion =
  | FabricReplicationGroupTaskDetails
  | VirtualMachineTaskDetails
  | JobTaskDetails;

export function jobTaskDetailsUnionDeserializer(item: any): JobTaskDetailsUnion {
  switch (item["instanceType"]) {
    case "FabricReplicationGroupTaskDetails":
      return fabricReplicationGroupTaskDetailsDeserializer(
        item as FabricReplicationGroupTaskDetails,
      );

    case "VirtualMachineTaskDetails":
      return virtualMachineTaskDetailsDeserializer(item as VirtualMachineTaskDetails);

    default:
      return jobTaskDetailsDeserializer(item);
  }
}

/** This class contains the minimal job details required to navigate to the desired drill down. */
export interface JobEntity {
  /** The job id. */
  jobId?: string;
  /** The job display name. */
  jobFriendlyName?: string;
  /** The object id. */
  targetObjectId?: string;
  /** The object name. */
  targetObjectName?: string;
  /** The workflow affected object type. */
  targetInstanceType?: string;
  /** The job name. Enum type ScenarioName. */
  jobScenarioName?: string;
}

export function jobEntityDeserializer(item: any): JobEntity {
  return {
    jobId: item["jobId"],
    jobFriendlyName: item["jobFriendlyName"],
    targetObjectId: item["targetObjectId"],
    targetObjectName: item["targetObjectName"],
    targetInstanceType: item["targetInstanceType"],
    jobScenarioName: item["jobScenarioName"],
  };
}

/** This class represents the virtual machine task details. */
export interface VirtualMachineTaskDetails extends JobTaskDetails {
  /** The type of task details. */
  instanceType: "VirtualMachineTaskDetails";
  /** The skipped reason. */
  skippedReason?: string;
  /** The skipped reason string. */
  skippedReasonString?: string;
}

export function virtualMachineTaskDetailsDeserializer(item: any): VirtualMachineTaskDetails {
  return {
    instanceType: item["instanceType"],
    jobTask: !item["jobTask"] ? item["jobTask"] : jobEntityDeserializer(item["jobTask"]),
    skippedReason: item["skippedReason"],
    skippedReasonString: item["skippedReasonString"],
  };
}

/** This class represents the manual action task details. */
export interface ManualActionTaskDetails extends TaskTypeDetails {
  /** The name. */
  name?: string;
  /** The instructions. */
  instructions?: string;
  /** The observation. */
  observation?: string;
  /** The type of task details. */
  instanceType: "ManualActionTaskDetails";
}

export function manualActionTaskDetailsDeserializer(item: any): ManualActionTaskDetails {
  return {
    instanceType: item["instanceType"],
    name: item["name"],
    instructions: item["instructions"],
    observation: item["observation"],
  };
}

/** This class represents the script action task details. */
export interface ScriptActionTaskDetails extends TaskTypeDetails {
  /** The name. */
  name?: string;
  /** The path. */
  path?: string;
  /** The output. */
  output?: string;
  /** A value indicating whether it is a primary side script or not. */
  isPrimarySideScript?: boolean;
  /** The type of task details. */
  instanceType: "ScriptActionTaskDetails";
}

export function scriptActionTaskDetailsDeserializer(item: any): ScriptActionTaskDetails {
  return {
    instanceType: item["instanceType"],
    name: item["name"],
    path: item["path"],
    output: item["output"],
    isPrimarySideScript: item["isPrimarySideScript"],
  };
}

/** This class represents the vm NicUpdates task details. */
export interface VmNicUpdatesTaskDetails extends TaskTypeDetails {
  /** Virtual machine Id. */
  vmId?: string;
  /** Nic Id. */
  nicId?: string;
  /** Name of the Nic. */
  name?: string;
  /** The type of task details. */
  instanceType: "VmNicUpdatesTaskDetails";
}

export function vmNicUpdatesTaskDetailsDeserializer(item: any): VmNicUpdatesTaskDetails {
  return {
    instanceType: item["instanceType"],
    vmId: item["vmId"],
    nicId: item["nicId"],
    name: item["name"],
  };
}

/** This class represents the group task details when parent child relationship exists in the drill down. */
export interface GroupTaskDetails {
  /** The type of task details. */
  /** The discriminator possible values: InlineWorkflowTaskDetails, RecoveryPlanGroupTaskDetails, RecoveryPlanShutdownGroupTaskDetails */
  instanceType: string;
  /** The child tasks. */
  childTasks?: ASRTask[];
}

export function groupTaskDetailsDeserializer(item: any): GroupTaskDetails {
  return {
    instanceType: item["instanceType"],
    childTasks: !item["childTasks"]
      ? item["childTasks"]
      : asrTaskArrayDeserializer(item["childTasks"]),
  };
}

/** Alias for GroupTaskDetailsUnion */
export type GroupTaskDetailsUnion =
  | InlineWorkflowTaskDetails
  | RecoveryPlanGroupTaskDetailsUnion
  | GroupTaskDetails;

export function groupTaskDetailsUnionDeserializer(item: any): GroupTaskDetailsUnion {
  switch (item["instanceType"]) {
    case "InlineWorkflowTaskDetails":
      return inlineWorkflowTaskDetailsDeserializer(item as InlineWorkflowTaskDetails);

    case "RecoveryPlanGroupTaskDetails":
    case "RecoveryPlanShutdownGroupTaskDetails":
      return recoveryPlanGroupTaskDetailsUnionDeserializer(
        item as RecoveryPlanGroupTaskDetailsUnion,
      );

    default:
      return groupTaskDetailsDeserializer(item);
  }
}

/** This class represents the inline workflow task details. */
export interface InlineWorkflowTaskDetails extends GroupTaskDetails {
  /** The list of child workflow ids. */
  workflowIds?: string[];
  /** The type of task details. */
  instanceType: "InlineWorkflowTaskDetails";
}

export function inlineWorkflowTaskDetailsDeserializer(item: any): InlineWorkflowTaskDetails {
  return {
    instanceType: item["instanceType"],
    childTasks: !item["childTasks"]
      ? item["childTasks"]
      : asrTaskArrayDeserializer(item["childTasks"]),
    workflowIds: !item["workflowIds"]
      ? item["workflowIds"]
      : item["workflowIds"].map((p: any) => {
          return p;
        }),
  };
}

/** This class represents the recovery plan group task. */
export interface RecoveryPlanGroupTaskDetails extends GroupTaskDetails {
  instanceType: "RecoveryPlanGroupTaskDetails" | "RecoveryPlanShutdownGroupTaskDetails";
  /** The name. */
  name?: string;
  /** The group identifier. */
  groupId?: string;
  /** The group type. */
  rpGroupType?: string;
}

export function recoveryPlanGroupTaskDetailsDeserializer(item: any): RecoveryPlanGroupTaskDetails {
  return {
    instanceType: item["instanceType"],
    childTasks: !item["childTasks"]
      ? item["childTasks"]
      : asrTaskArrayDeserializer(item["childTasks"]),
    name: item["name"],
    groupId: item["groupId"],
    rpGroupType: item["rpGroupType"],
  };
}

/** Alias for RecoveryPlanGroupTaskDetailsUnion */
export type RecoveryPlanGroupTaskDetailsUnion =
  | RecoveryPlanShutdownGroupTaskDetails
  | RecoveryPlanGroupTaskDetails;

export function recoveryPlanGroupTaskDetailsUnionDeserializer(
  item: any,
): RecoveryPlanGroupTaskDetailsUnion {
  switch (item["instanceType"]) {
    case "RecoveryPlanShutdownGroupTaskDetails":
      return recoveryPlanShutdownGroupTaskDetailsDeserializer(
        item as RecoveryPlanShutdownGroupTaskDetails,
      );

    default:
      return recoveryPlanGroupTaskDetailsDeserializer(item);
  }
}

/** This class represents the recovery plan shutdown group task details. */
export interface RecoveryPlanShutdownGroupTaskDetails extends RecoveryPlanGroupTaskDetails {
  /** The type of task details. */
  instanceType: "RecoveryPlanShutdownGroupTaskDetails";
}

export function recoveryPlanShutdownGroupTaskDetailsDeserializer(
  item: any,
): RecoveryPlanShutdownGroupTaskDetails {
  return {
    instanceType: item["instanceType"],
    name: item["name"],
    groupId: item["groupId"],
    rpGroupType: item["rpGroupType"],
    childTasks: !item["childTasks"]
      ? item["childTasks"]
      : asrTaskArrayDeserializer(item["childTasks"]),
  };
}

export function jobErrorDetailsArrayDeserializer(result: Array<JobErrorDetails>): any[] {
  return result.map((item) => {
    return jobErrorDetailsDeserializer(item);
  });
}

/** This class contains the error details per object. */
export interface JobErrorDetails {
  /** The Service error details. */
  serviceErrorDetails?: ServiceError;
  /** The Provider error details. */
  providerErrorDetails?: ProviderError;
  /** Error level of error. */
  errorLevel?: string;
  /** The creation time of job error. */
  creationTime?: Date;
  /** The Id of the task. */
  taskId?: string;
}

export function jobErrorDetailsDeserializer(item: any): JobErrorDetails {
  return {
    serviceErrorDetails: !item["serviceErrorDetails"]
      ? item["serviceErrorDetails"]
      : serviceErrorDeserializer(item["serviceErrorDetails"]),
    providerErrorDetails: !item["providerErrorDetails"]
      ? item["providerErrorDetails"]
      : providerErrorDeserializer(item["providerErrorDetails"]),
    errorLevel: item["errorLevel"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    taskId: item["taskId"],
  };
}

/** ASR error model. */
export interface ServiceError {
  /** Error code. */
  code?: string;
  /** Error message. */
  message?: string;
  /** Possible causes of error. */
  possibleCauses?: string;
  /** Recommended action to resolve error. */
  recommendedAction?: string;
  /** Activity Id. */
  activityId?: string;
}

export function serviceErrorDeserializer(item: any): ServiceError {
  return {
    code: item["code"],
    message: item["message"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    activityId: item["activityId"],
  };
}

/** This class contains the error details per object. */
export interface ProviderError {
  /** The Error code. */
  errorCode?: number;
  /** The Error message. */
  errorMessage?: string;
  /** The Provider error Id. */
  errorId?: string;
  /** The possible causes for the error. */
  possibleCauses?: string;
  /** The recommended action to resolve the error. */
  recommendedAction?: string;
}

export function providerErrorDeserializer(item: any): ProviderError {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    errorId: item["errorId"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
  };
}

/** Job details based on specific job type. */
export interface JobDetails {
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  /** The discriminator possible values: AsrJobDetails, ClusterFailoverJobDetails, ClusterSwitchProtectionJobDetails, ClusterTestFailoverJobDetails, ExportJobDetails, FailoverJobDetails, SwitchProtectionJobDetails, TestFailoverJobDetails */
  instanceType: string;
  /** The affected object properties like source server, source cloud, target server, target cloud etc. based on the workflow object details. */
  affectedObjectDetails?: Record<string, string>;
}

export function jobDetailsDeserializer(item: any): JobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Alias for JobDetailsUnion */
export type JobDetailsUnion =
  | AsrJobDetails
  | ClusterFailoverJobDetails
  | ClusterSwitchProtectionJobDetails
  | ClusterTestFailoverJobDetails
  | ExportJobDetails
  | FailoverJobDetails
  | SwitchProtectionJobDetails
  | TestFailoverJobDetails
  | JobDetails;

export function jobDetailsUnionDeserializer(item: any): JobDetailsUnion {
  switch (item["instanceType"]) {
    case "AsrJobDetails":
      return asrJobDetailsDeserializer(item as AsrJobDetails);

    case "ClusterFailoverJobDetails":
      return clusterFailoverJobDetailsDeserializer(item as ClusterFailoverJobDetails);

    case "ClusterSwitchProtectionJobDetails":
      return clusterSwitchProtectionJobDetailsDeserializer(
        item as ClusterSwitchProtectionJobDetails,
      );

    case "ClusterTestFailoverJobDetails":
      return clusterTestFailoverJobDetailsDeserializer(item as ClusterTestFailoverJobDetails);

    case "ExportJobDetails":
      return exportJobDetailsDeserializer(item as ExportJobDetails);

    case "FailoverJobDetails":
      return failoverJobDetailsDeserializer(item as FailoverJobDetails);

    case "SwitchProtectionJobDetails":
      return switchProtectionJobDetailsDeserializer(item as SwitchProtectionJobDetails);

    case "TestFailoverJobDetails":
      return testFailoverJobDetailsDeserializer(item as TestFailoverJobDetails);

    default:
      return jobDetailsDeserializer(item);
  }
}

/** This class represents job details based on specific job type. */
export interface AsrJobDetails extends JobDetails {
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "AsrJobDetails";
}

export function asrJobDetailsDeserializer(item: any): AsrJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** This class represents the details for a failover job of cluster. */
export interface ClusterFailoverJobDetails extends JobDetails {
  /** The test VM details. */
  protectedItemDetails?: FailoverReplicationProtectedItemDetails[];
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "ClusterFailoverJobDetails";
}

export function clusterFailoverJobDetailsDeserializer(item: any): ClusterFailoverJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverReplicationProtectedItemDetailsArrayDeserializer(item["protectedItemDetails"]),
  };
}

export function failoverReplicationProtectedItemDetailsArrayDeserializer(
  result: Array<FailoverReplicationProtectedItemDetails>,
): any[] {
  return result.map((item) => {
    return failoverReplicationProtectedItemDetailsDeserializer(item);
  });
}

/** Failover details for a replication protected item. */
export interface FailoverReplicationProtectedItemDetails {
  /** The name. */
  name?: string;
  /** The friendly name. */
  friendlyName?: string;
  /** The test Vm name. */
  testVmName?: string;
  /** The test Vm friendly name. */
  testVmFriendlyName?: string;
  /** The network connection status. */
  networkConnectionStatus?: string;
  /** The network friendly name. */
  networkFriendlyName?: string;
  /** The network subnet. */
  subnet?: string;
  /** The recovery point Id. */
  recoveryPointId?: string;
  /** The recovery point time. */
  recoveryPointTime?: Date;
}

export function failoverReplicationProtectedItemDetailsDeserializer(
  item: any,
): FailoverReplicationProtectedItemDetails {
  return {
    name: item["name"],
    friendlyName: item["friendlyName"],
    testVmName: item["testVmName"],
    testVmFriendlyName: item["testVmFriendlyName"],
    networkConnectionStatus: item["networkConnectionStatus"],
    networkFriendlyName: item["networkFriendlyName"],
    subnet: item["subnet"],
    recoveryPointId: item["recoveryPointId"],
    recoveryPointTime: !item["recoveryPointTime"]
      ? item["recoveryPointTime"]
      : new Date(item["recoveryPointTime"]),
  };
}

/** This class represents details for switch cluster protection job. */
export interface ClusterSwitchProtectionJobDetails extends JobDetails {
  /** ARM Id of the new replication protection cluster. */
  newReplicationProtectionClusterId?: string;
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "ClusterSwitchProtectionJobDetails";
}

export function clusterSwitchProtectionJobDetailsDeserializer(
  item: any,
): ClusterSwitchProtectionJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    newReplicationProtectionClusterId: item["newReplicationProtectionClusterId"],
  };
}

/** This class represents the details for a test failover job of cluster. */
export interface ClusterTestFailoverJobDetails extends JobDetails {
  /** The test failover status. */
  testFailoverStatus?: string;
  /** The test failover comments. */
  comments?: string;
  /** The test network name. */
  networkName?: string;
  /** The test network friendly name. */
  networkFriendlyName?: string;
  /** The test network type (see TestFailoverInput enum for possible values). */
  networkType?: string;
  /** The test VM details. */
  protectedItemDetails?: FailoverReplicationProtectedItemDetails[];
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "ClusterTestFailoverJobDetails";
}

export function clusterTestFailoverJobDetailsDeserializer(
  item: any,
): ClusterTestFailoverJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    testFailoverStatus: item["testFailoverStatus"],
    comments: item["comments"],
    networkName: item["networkName"],
    networkFriendlyName: item["networkFriendlyName"],
    networkType: item["networkType"],
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverReplicationProtectedItemDetailsArrayDeserializer(item["protectedItemDetails"]),
  };
}

/** This class represents details for export jobs workflow. */
export interface ExportJobDetails extends JobDetails {
  /** BlobUri of the exported jobs. */
  blobUri?: string;
  /** The sas token to access blob. */
  sasToken?: string;
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "ExportJobDetails";
}

export function exportJobDetailsDeserializer(item: any): ExportJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    blobUri: item["blobUri"],
    sasToken: item["sasToken"],
  };
}

/** This class represents the details for a failover job. */
export interface FailoverJobDetails extends JobDetails {
  /** The test VM details. */
  protectedItemDetails?: FailoverReplicationProtectedItemDetails[];
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "FailoverJobDetails";
}

export function failoverJobDetailsDeserializer(item: any): FailoverJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverReplicationProtectedItemDetailsArrayDeserializer(item["protectedItemDetails"]),
  };
}

/** This class represents details for switch protection job. */
export interface SwitchProtectionJobDetails extends JobDetails {
  /** ARM Id of the new replication protected item. */
  newReplicationProtectedItemId?: string;
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "SwitchProtectionJobDetails";
}

export function switchProtectionJobDetailsDeserializer(item: any): SwitchProtectionJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    newReplicationProtectedItemId: item["newReplicationProtectedItemId"],
  };
}

/** This class represents the details for a test failover job. */
export interface TestFailoverJobDetails extends JobDetails {
  /** The test failover status. */
  testFailoverStatus?: string;
  /** The test failover comments. */
  comments?: string;
  /** The test network name. */
  networkName?: string;
  /** The test network friendly name. */
  networkFriendlyName?: string;
  /** The test network type (see TestFailoverInput enum for possible values). */
  networkType?: string;
  /** The test VM details. */
  protectedItemDetails?: FailoverReplicationProtectedItemDetails[];
  /** Gets the type of job details (see JobDetailsTypes enum for possible values). */
  instanceType: "TestFailoverJobDetails";
}

export function testFailoverJobDetailsDeserializer(item: any): TestFailoverJobDetails {
  return {
    instanceType: item["instanceType"],
    affectedObjectDetails: !item["affectedObjectDetails"]
      ? item["affectedObjectDetails"]
      : Object.fromEntries(
          Object.entries(item["affectedObjectDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    testFailoverStatus: item["testFailoverStatus"],
    comments: item["comments"],
    networkName: item["networkName"],
    networkFriendlyName: item["networkFriendlyName"],
    networkType: item["networkType"],
    protectedItemDetails: !item["protectedItemDetails"]
      ? item["protectedItemDetails"]
      : failoverReplicationProtectedItemDetailsArrayDeserializer(item["protectedItemDetails"]),
  };
}

/** Collection of jobs. */
export interface _JobCollection {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobCollectionDeserializer(item: any): _JobCollection {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** Resume job params. */
export interface ResumeJobParams {
  /** Resume job properties. */
  properties?: ResumeJobParamsProperties;
}

export function resumeJobParamsSerializer(item: ResumeJobParams): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : resumeJobParamsPropertiesSerializer(item["properties"]),
  };
}

/** Resume job properties. */
export interface ResumeJobParamsProperties {
  /** Resume job comments. */
  comments?: string;
}

export function resumeJobParamsPropertiesSerializer(item: ResumeJobParamsProperties): any {
  return { comments: item["comments"] };
}

/** Query parameter to enumerate jobs. */
export interface JobQueryParameter {
  /** Date time to get jobs from. */
  startTime?: string;
  /** Date time to get jobs upto. */
  endTime?: string;
  /** The Id of the fabric to search jobs under. */
  fabricId?: string;
  /** The type of objects. */
  affectedObjectTypes?: string;
  /** The states of the job to be filtered can be in. */
  jobStatus?: string;
  /** The output type of the jobs. */
  jobOutputType?: ExportJobOutputSerializationType;
  /** The job Name. */
  jobName?: string;
  /** The timezone offset for the location of the request (in minutes). */
  timezoneOffset?: number;
}

export function jobQueryParameterSerializer(item: JobQueryParameter): any {
  return {
    startTime: item["startTime"],
    endTime: item["endTime"],
    fabricId: item["fabricId"],
    affectedObjectTypes: item["affectedObjectTypes"],
    jobStatus: item["jobStatus"],
    jobOutputType: item["jobOutputType"],
    jobName: item["jobName"],
    timezoneOffset: item["timezoneOffset"],
  };
}

/** The output type of the jobs. */
export enum KnownExportJobOutputSerializationType {
  /** Json */
  Json = "Json",
  /** Xml */
  Xml = "Xml",
  /** Excel */
  Excel = "Excel",
}

/**
 * The output type of the jobs. \
 * {@link KnownExportJobOutputSerializationType} can be used interchangeably with ExportJobOutputSerializationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Json**: Json \
 * **Xml**: Xml \
 * **Excel**: Excel
 */
export type ExportJobOutputSerializationType = string;

/** Protection profile details. */
export interface Policy extends ProxyResource {
  /** The custom data. */
  properties?: PolicyProperties;
  /** Resource Location */
  location?: string;
}

export function policyDeserializer(item: any): Policy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : policyPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Protection profile custom data details. */
export interface PolicyProperties {
  /** The FriendlyName. */
  friendlyName?: string;
  /** The ReplicationChannelSetting. */
  providerSpecificDetails?: PolicyProviderSpecificDetailsUnion;
}

export function policyPropertiesDeserializer(item: any): PolicyProperties {
  return {
    friendlyName: item["friendlyName"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : policyProviderSpecificDetailsUnionDeserializer(item["providerSpecificDetails"]),
  };
}

/** Base class for Provider specific details for policies. */
export interface PolicyProviderSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: A2A, HyperVReplicaAzure, HyperVReplicaBasePolicyDetails, HyperVReplica2012R2, HyperVReplica2012, InMageAzureV2, InMageBasePolicyDetails, InMage, InMageRcmFailback, InMageRcm, VMwareCbt */
  instanceType: string;
}

export function policyProviderSpecificDetailsDeserializer(
  item: any,
): PolicyProviderSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for PolicyProviderSpecificDetailsUnion */
export type PolicyProviderSpecificDetailsUnion =
  | A2APolicyDetails
  | HyperVReplicaAzurePolicyDetails
  | HyperVReplicaBasePolicyDetails
  | HyperVReplicaBluePolicyDetails
  | HyperVReplicaPolicyDetails
  | InMageAzureV2PolicyDetails
  | InMageBasePolicyDetails
  | InMagePolicyDetails
  | InMageRcmFailbackPolicyDetails
  | InMageRcmPolicyDetails
  | VmwareCbtPolicyDetails
  | PolicyProviderSpecificDetails;

export function policyProviderSpecificDetailsUnionDeserializer(
  item: any,
): PolicyProviderSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return a2APolicyDetailsDeserializer(item as A2APolicyDetails);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzurePolicyDetailsDeserializer(item as HyperVReplicaAzurePolicyDetails);

    case "HyperVReplicaBasePolicyDetails":
      return hyperVReplicaBasePolicyDetailsDeserializer(item as HyperVReplicaBasePolicyDetails);

    case "HyperVReplica2012R2":
      return hyperVReplicaBluePolicyDetailsDeserializer(item as HyperVReplicaBluePolicyDetails);

    case "HyperVReplica2012":
      return hyperVReplicaPolicyDetailsDeserializer(item as HyperVReplicaPolicyDetails);

    case "InMageAzureV2":
      return inMageAzureV2PolicyDetailsDeserializer(item as InMageAzureV2PolicyDetails);

    case "InMageBasePolicyDetails":
      return inMageBasePolicyDetailsDeserializer(item as InMageBasePolicyDetails);

    case "InMage":
      return inMagePolicyDetailsDeserializer(item as InMagePolicyDetails);

    case "InMageRcmFailback":
      return inMageRcmFailbackPolicyDetailsDeserializer(item as InMageRcmFailbackPolicyDetails);

    case "InMageRcm":
      return inMageRcmPolicyDetailsDeserializer(item as InMageRcmPolicyDetails);

    case "VMwareCbt":
      return vmwareCbtPolicyDetailsDeserializer(item as VmwareCbtPolicyDetails);

    default:
      return policyProviderSpecificDetailsDeserializer(item);
  }
}

/** A2A specific policy details. */
export interface A2APolicyDetails extends PolicyProviderSpecificDetails {
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  multiVmSyncStatus?: string;
  /** The crash consistent snapshot frequency in minutes. */
  crashConsistentFrequencyInMinutes?: number;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "A2A";
}

export function a2APolicyDetailsDeserializer(item: any): A2APolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
  };
}

/** Hyper-V Replica Azure specific protection profile details. */
export interface HyperVReplicaAzurePolicyDetails extends PolicyProviderSpecificDetails {
  /** The duration (in hours) to which point the recovery history needs to be maintained. */
  recoveryPointHistoryDurationInHours?: number;
  /** The interval (in hours) at which Hyper-V Replica should create an application consistent snapshot within the VM. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** The replication interval. */
  replicationInterval?: number;
  /** The scheduled start time for the initial replication. If this parameter is Null, the initial replication starts immediately. */
  onlineReplicationStartTime?: string;
  /** A value indicating whether encryption is enabled for virtual machines in this cloud. */
  encryption?: string;
  /** The active storage account Id. */
  activeStorageAccountId?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzurePolicyDetailsDeserializer(
  item: any,
): HyperVReplicaAzurePolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryDurationInHours: item["recoveryPointHistoryDurationInHours"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    replicationInterval: item["replicationInterval"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    encryption: item["encryption"],
    activeStorageAccountId: item["activeStorageAccountId"],
  };
}

/** Base class for HyperVReplica policy details. */
export interface HyperVReplicaBasePolicyDetails extends PolicyProviderSpecificDetails {
  /** A value indicating the number of recovery points. */
  recoveryPoints?: number;
  /** A value indicating the application consistent frequency. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** A value indicating whether compression has to be enabled. */
  compression?: string;
  /** A value indicating whether IR is online. */
  initialReplicationMethod?: string;
  /** A value indicating the online IR start time. */
  onlineReplicationStartTime?: string;
  /** A value indicating the offline IR import path. */
  offlineReplicationImportPath?: string;
  /** A value indicating the offline IR export path. */
  offlineReplicationExportPath?: string;
  /** A value indicating the recovery HTTPS port. */
  replicationPort?: number;
  /** A value indicating the authentication type. */
  allowedAuthenticationType?: number;
  /** A value indicating whether the VM has to be auto deleted. Supported Values: String.Empty, None, OnRecoveryCloud. */
  replicaDeletionOption?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplicaBasePolicyDetails";
}

export function hyperVReplicaBasePolicyDetailsDeserializer(
  item: any,
): HyperVReplicaBasePolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPoints: item["recoveryPoints"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    compression: item["compression"],
    initialReplicationMethod: item["initialReplicationMethod"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    offlineReplicationImportPath: item["offlineReplicationImportPath"],
    offlineReplicationExportPath: item["offlineReplicationExportPath"],
    replicationPort: item["replicationPort"],
    allowedAuthenticationType: item["allowedAuthenticationType"],
    replicaDeletionOption: item["replicaDeletionOption"],
  };
}

/** Hyper-V Replica Blue specific protection profile details. */
export interface HyperVReplicaBluePolicyDetails extends PolicyProviderSpecificDetails {
  /** A value indicating the replication interval. */
  replicationFrequencyInSeconds?: number;
  /** A value indicating the number of recovery points. */
  recoveryPoints?: number;
  /** A value indicating the application consistent frequency. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** A value indicating whether compression has to be enabled. */
  compression?: string;
  /** A value indicating whether IR is online. */
  initialReplicationMethod?: string;
  /** A value indicating the online IR start time. */
  onlineReplicationStartTime?: string;
  /** A value indicating the offline IR import path. */
  offlineReplicationImportPath?: string;
  /** A value indicating the offline IR export path. */
  offlineReplicationExportPath?: string;
  /** A value indicating the recovery HTTPS port. */
  replicationPort?: number;
  /** A value indicating the authentication type. */
  allowedAuthenticationType?: number;
  /** A value indicating whether the VM has to be auto deleted. Supported Values: String.Empty, None, OnRecoveryCloud */
  replicaDeletionOption?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplica2012R2";
}

export function hyperVReplicaBluePolicyDetailsDeserializer(
  item: any,
): HyperVReplicaBluePolicyDetails {
  return {
    instanceType: item["instanceType"],
    replicationFrequencyInSeconds: item["replicationFrequencyInSeconds"],
    recoveryPoints: item["recoveryPoints"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    compression: item["compression"],
    initialReplicationMethod: item["initialReplicationMethod"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    offlineReplicationImportPath: item["offlineReplicationImportPath"],
    offlineReplicationExportPath: item["offlineReplicationExportPath"],
    replicationPort: item["replicationPort"],
    allowedAuthenticationType: item["allowedAuthenticationType"],
    replicaDeletionOption: item["replicaDeletionOption"],
  };
}

/** Hyper-V Replica Blue specific protection profile details. */
export interface HyperVReplicaPolicyDetails extends PolicyProviderSpecificDetails {
  /** A value indicating the number of recovery points. */
  recoveryPoints?: number;
  /** A value indicating the application consistent frequency. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** A value indicating whether compression has to be enabled. */
  compression?: string;
  /** A value indicating whether IR is online. */
  initialReplicationMethod?: string;
  /** A value indicating the online IR start time. */
  onlineReplicationStartTime?: string;
  /** A value indicating the offline IR import path. */
  offlineReplicationImportPath?: string;
  /** A value indicating the offline IR export path. */
  offlineReplicationExportPath?: string;
  /** A value indicating the recovery HTTPS port. */
  replicationPort?: number;
  /** A value indicating the authentication type. */
  allowedAuthenticationType?: number;
  /** A value indicating whether the VM has to be auto deleted. Supported Values: String.Empty, None, OnRecoveryCloud */
  replicaDeletionOption?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "HyperVReplica2012";
}

export function hyperVReplicaPolicyDetailsDeserializer(item: any): HyperVReplicaPolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPoints: item["recoveryPoints"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    compression: item["compression"],
    initialReplicationMethod: item["initialReplicationMethod"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    offlineReplicationImportPath: item["offlineReplicationImportPath"],
    offlineReplicationExportPath: item["offlineReplicationExportPath"],
    replicationPort: item["replicationPort"],
    allowedAuthenticationType: item["allowedAuthenticationType"],
    replicaDeletionOption: item["replicaDeletionOption"],
  };
}

/** InMage Azure v2 specific protection profile details. */
export interface InMageAzureV2PolicyDetails extends PolicyProviderSpecificDetails {
  /** The crash consistent snapshot frequency in minutes. */
  crashConsistentFrequencyInMinutes?: number;
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  multiVmSyncStatus?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2PolicyDetailsDeserializer(item: any): InMageAzureV2PolicyDetails {
  return {
    instanceType: item["instanceType"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** Base class for the policies of providers using InMage replication. */
export interface InMageBasePolicyDetails extends PolicyProviderSpecificDetails {
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  multiVmSyncStatus?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageBasePolicyDetails";
}

export function inMageBasePolicyDetailsDeserializer(item: any): InMageBasePolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** InMage specific protection profile details. */
export interface InMagePolicyDetails extends PolicyProviderSpecificDetails {
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  multiVmSyncStatus?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMage";
}

export function inMagePolicyDetailsDeserializer(item: any): InMagePolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** InMageRcm failback specific policy details. */
export interface InMageRcmFailbackPolicyDetails extends PolicyProviderSpecificDetails {
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** The crash consistent snapshot frequency in minutes. */
  crashConsistentFrequencyInMinutes?: number;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackPolicyDetailsDeserializer(
  item: any,
): InMageRcmFailbackPolicyDetails {
  return {
    instanceType: item["instanceType"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
  };
}

/** InMageRcm specific policy details. */
export interface InMageRcmPolicyDetails extends PolicyProviderSpecificDetails {
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** The crash consistent snapshot frequency in minutes. */
  crashConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  enableMultiVmSync?: string;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcm";
}

export function inMageRcmPolicyDetailsDeserializer(item: any): InMageRcmPolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    enableMultiVmSync: item["enableMultiVmSync"],
  };
}

/** VMware Cbt specific policy details. */
export interface VmwareCbtPolicyDetails extends PolicyProviderSpecificDetails {
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes?: number;
  /** The app consistent snapshot frequency in minutes. */
  appConsistentFrequencyInMinutes?: number;
  /** The crash consistent snapshot frequency in minutes. */
  crashConsistentFrequencyInMinutes?: number;
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "VMwareCbt";
}

export function vmwareCbtPolicyDetailsDeserializer(item: any): VmwareCbtPolicyDetails {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
  };
}

/** Protection Policy input. */
export interface CreatePolicyInput {
  /** Policy creation properties. */
  properties?: CreatePolicyInputProperties;
}

export function createPolicyInputSerializer(item: CreatePolicyInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : createPolicyInputPropertiesSerializer(item["properties"]),
  };
}

/** Policy creation properties. */
export interface CreatePolicyInputProperties {
  /** The ReplicationProviderSettings. */
  providerSpecificInput?: PolicyProviderSpecificInputUnion;
}

export function createPolicyInputPropertiesSerializer(item: CreatePolicyInputProperties): any {
  return {
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : policyProviderSpecificInputUnionSerializer(item["providerSpecificInput"]),
  };
}

/** Base class for provider specific input. */
export interface PolicyProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: A2ACrossClusterMigration, A2A, HyperVReplicaAzure, HyperVReplica2012R2, HyperVReplica2012, InMageAzureV2, InMage, InMageRcmFailback, InMageRcm, VMwareCbt */
  instanceType: string;
}

export function policyProviderSpecificInputSerializer(item: PolicyProviderSpecificInput): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for PolicyProviderSpecificInputUnion */
export type PolicyProviderSpecificInputUnion =
  | A2ACrossClusterMigrationPolicyCreationInput
  | A2APolicyCreationInput
  | HyperVReplicaAzurePolicyInput
  | HyperVReplicaPolicyInputUnion
  | InMageAzureV2PolicyInput
  | InMagePolicyInput
  | InMageRcmFailbackPolicyCreationInput
  | InMageRcmPolicyCreationInput
  | VMwareCbtPolicyCreationInput
  | PolicyProviderSpecificInput;

export function policyProviderSpecificInputUnionSerializer(
  item: PolicyProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2ACrossClusterMigration":
      return a2ACrossClusterMigrationPolicyCreationInputSerializer(
        item as A2ACrossClusterMigrationPolicyCreationInput,
      );

    case "A2A":
      return a2APolicyCreationInputSerializer(item as A2APolicyCreationInput);

    case "HyperVReplicaAzure":
      return hyperVReplicaAzurePolicyInputSerializer(item as HyperVReplicaAzurePolicyInput);

    case "HyperVReplica2012":
    case "HyperVReplica2012R2":
      return hyperVReplicaPolicyInputUnionSerializer(item as HyperVReplicaPolicyInputUnion);

    case "InMageAzureV2":
      return inMageAzureV2PolicyInputSerializer(item as InMageAzureV2PolicyInput);

    case "InMage":
      return inMagePolicyInputSerializer(item as InMagePolicyInput);

    case "InMageRcmFailback":
      return inMageRcmFailbackPolicyCreationInputSerializer(
        item as InMageRcmFailbackPolicyCreationInput,
      );

    case "InMageRcm":
      return inMageRcmPolicyCreationInputSerializer(item as InMageRcmPolicyCreationInput);

    case "VMwareCbt":
      return vMwareCbtPolicyCreationInputSerializer(item as VMwareCbtPolicyCreationInput);

    default:
      return policyProviderSpecificInputSerializer(item);
  }
}

/** A2A Cross-Cluster Migration Policy creation input. */
export interface A2ACrossClusterMigrationPolicyCreationInput extends PolicyProviderSpecificInput {
  /** The class type. */
  instanceType: "A2ACrossClusterMigration";
}

export function a2ACrossClusterMigrationPolicyCreationInputSerializer(
  item: A2ACrossClusterMigrationPolicyCreationInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** A2A Policy creation input. */
export interface A2APolicyCreationInput extends PolicyProviderSpecificInput {
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. */
  multiVmSyncStatus: SetMultiVmSyncStatus;
  /** The class type. */
  instanceType: "A2A";
}

export function a2APolicyCreationInputSerializer(item: A2APolicyCreationInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistory: item["recoveryPointHistory"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** Hyper-V Replica Azure specific input for creating a protection profile. */
export interface HyperVReplicaAzurePolicyInput extends PolicyProviderSpecificInput {
  /** The duration (in hours) to which point the recovery history needs to be maintained. */
  recoveryPointHistoryDuration?: number;
  /** The interval (in hours) at which Hyper-V Replica should create an application consistent snapshot within the VM. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** The replication interval. */
  replicationInterval?: number;
  /** The scheduled start time for the initial replication. If this parameter is Null, the initial replication starts immediately. */
  onlineReplicationStartTime?: string;
  /** The list of storage accounts to which the VMs in the primary cloud can replicate to. */
  storageAccounts?: string[];
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function hyperVReplicaAzurePolicyInputSerializer(item: HyperVReplicaAzurePolicyInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryDuration: item["recoveryPointHistoryDuration"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    replicationInterval: item["replicationInterval"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : item["storageAccounts"].map((p: any) => {
          return p;
        }),
  };
}

/** HyperV Replica Blue policy input. */
export interface HyperVReplicaBluePolicyInput extends HyperVReplicaPolicyInput {
  /** The class type. */
  instanceType: "HyperVReplica2012R2";
  /** A value indicating the replication interval. */
  replicationFrequencyInSeconds?: number;
}

export function hyperVReplicaBluePolicyInputSerializer(item: HyperVReplicaBluePolicyInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPoints: item["recoveryPoints"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    compression: item["compression"],
    initialReplicationMethod: item["initialReplicationMethod"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    offlineReplicationImportPath: item["offlineReplicationImportPath"],
    offlineReplicationExportPath: item["offlineReplicationExportPath"],
    replicationPort: item["replicationPort"],
    allowedAuthenticationType: item["allowedAuthenticationType"],
    replicaDeletion: item["replicaDeletion"],
    replicationFrequencyInSeconds: item["replicationFrequencyInSeconds"],
  };
}

/** Hyper-V Replica specific policy Input. */
export interface HyperVReplicaPolicyInput extends PolicyProviderSpecificInput {
  /** The class type. */
  /** The discriminator possible values: HyperVReplica2012R2 */
  instanceType: "HyperVReplica2012" | "HyperVReplica2012R2";
  /** A value indicating the number of recovery points. */
  recoveryPoints?: number;
  /** A value indicating the application consistent frequency. */
  applicationConsistentSnapshotFrequencyInHours?: number;
  /** A value indicating whether compression has to be enabled. */
  compression?: string;
  /** A value indicating whether IR is online. */
  initialReplicationMethod?: string;
  /** A value indicating the online IR start time. */
  onlineReplicationStartTime?: string;
  /** A value indicating the offline IR import path. */
  offlineReplicationImportPath?: string;
  /** A value indicating the offline IR export path. */
  offlineReplicationExportPath?: string;
  /** A value indicating the recovery HTTPS port. */
  replicationPort?: number;
  /** A value indicating the authentication type. */
  allowedAuthenticationType?: number;
  /** A value indicating whether the VM has to be auto deleted. */
  replicaDeletion?: string;
}

export function hyperVReplicaPolicyInputSerializer(item: HyperVReplicaPolicyInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPoints: item["recoveryPoints"],
    applicationConsistentSnapshotFrequencyInHours:
      item["applicationConsistentSnapshotFrequencyInHours"],
    compression: item["compression"],
    initialReplicationMethod: item["initialReplicationMethod"],
    onlineReplicationStartTime: item["onlineReplicationStartTime"],
    offlineReplicationImportPath: item["offlineReplicationImportPath"],
    offlineReplicationExportPath: item["offlineReplicationExportPath"],
    replicationPort: item["replicationPort"],
    allowedAuthenticationType: item["allowedAuthenticationType"],
    replicaDeletion: item["replicaDeletion"],
  };
}

/** Alias for HyperVReplicaPolicyInputUnion */
export type HyperVReplicaPolicyInputUnion = HyperVReplicaBluePolicyInput | HyperVReplicaPolicyInput;

export function hyperVReplicaPolicyInputUnionSerializer(item: HyperVReplicaPolicyInputUnion): any {
  switch (item.instanceType) {
    case "HyperVReplica2012R2":
      return hyperVReplicaBluePolicyInputSerializer(item as HyperVReplicaBluePolicyInput);

    default:
      return hyperVReplicaPolicyInputSerializer(item);
  }
}

/** VMWare Azure specific policy Input. */
export interface InMageAzureV2PolicyInput extends PolicyProviderSpecificInput {
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. */
  multiVmSyncStatus: SetMultiVmSyncStatus;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function inMageAzureV2PolicyInputSerializer(item: InMageAzureV2PolicyInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** VMWare Azure specific protection profile Input. */
export interface InMagePolicyInput extends PolicyProviderSpecificInput {
  /** The recovery point threshold in minutes. */
  recoveryPointThresholdInMinutes?: number;
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistory?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. Value should be 'Enabled' or 'Disabled'. */
  multiVmSyncStatus: SetMultiVmSyncStatus;
  /** The class type. */
  instanceType: "InMage";
}

export function inMagePolicyInputSerializer(item: InMagePolicyInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointThresholdInMinutes: item["recoveryPointThresholdInMinutes"],
    recoveryPointHistory: item["recoveryPointHistory"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    multiVmSyncStatus: item["multiVmSyncStatus"],
  };
}

/** InMageRcmFailback policy creation input. */
export interface InMageRcmFailbackPolicyCreationInput extends PolicyProviderSpecificInput {
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** The class type. */
  instanceType: "InMageRcmFailback";
}

export function inMageRcmFailbackPolicyCreationInputSerializer(
  item: InMageRcmFailbackPolicyCreationInput,
): any {
  return {
    instanceType: item["instanceType"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

/** InMageRcm policy creation input. */
export interface InMageRcmPolicyCreationInput extends PolicyProviderSpecificInput {
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes?: number;
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** A value indicating whether multi-VM sync has to be enabled. */
  enableMultiVmSync?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function inMageRcmPolicyCreationInputSerializer(item: InMageRcmPolicyCreationInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
    enableMultiVmSync: item["enableMultiVmSync"],
  };
}

/** VMware Cbt policy creation input. */
export interface VMwareCbtPolicyCreationInput extends PolicyProviderSpecificInput {
  /** The duration in minutes until which the recovery points need to be stored. */
  recoveryPointHistoryInMinutes?: number;
  /** The crash consistent snapshot frequency (in minutes). */
  crashConsistentFrequencyInMinutes?: number;
  /** The app consistent snapshot frequency (in minutes). */
  appConsistentFrequencyInMinutes?: number;
  /** The class type. */
  instanceType: "VMwareCbt";
}

export function vMwareCbtPolicyCreationInputSerializer(item: VMwareCbtPolicyCreationInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointHistoryInMinutes: item["recoveryPointHistoryInMinutes"],
    crashConsistentFrequencyInMinutes: item["crashConsistentFrequencyInMinutes"],
    appConsistentFrequencyInMinutes: item["appConsistentFrequencyInMinutes"],
  };
}

/** Update policy input. */
export interface UpdatePolicyInput {
  /** The ReplicationProviderSettings. */
  properties?: UpdatePolicyInputProperties;
}

export function updatePolicyInputSerializer(item: UpdatePolicyInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updatePolicyInputPropertiesSerializer(item["properties"]),
  };
}

/** Policy update properties. */
export interface UpdatePolicyInputProperties {
  /** The ReplicationProviderSettings. */
  replicationProviderSettings?: PolicyProviderSpecificInputUnion;
}

export function updatePolicyInputPropertiesSerializer(item: UpdatePolicyInputProperties): any {
  return {
    replicationProviderSettings: !item["replicationProviderSettings"]
      ? item["replicationProviderSettings"]
      : policyProviderSpecificInputUnionSerializer(item["replicationProviderSettings"]),
  };
}

/** Protection Profile Collection details. */
export interface _PolicyCollection {
  /** The Policy items on this page */
  value: Policy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyCollectionDeserializer(item: any): _PolicyCollection {
  return {
    value: policyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyArrayDeserializer(result: Array<Policy>): any[] {
  return result.map((item) => {
    return policyDeserializer(item);
  });
}

/** Recovery plan details. */
export interface RecoveryPlan extends ProxyResource {
  /** The custom details. */
  properties?: RecoveryPlanProperties;
  /** Resource Location */
  location?: string;
}

export function recoveryPlanDeserializer(item: any): RecoveryPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : recoveryPlanPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Recovery plan properties. */
export interface RecoveryPlanProperties {
  /** The friendly name. */
  friendlyName?: string;
  /** The primary fabric Id. */
  primaryFabricId?: string;
  /** The primary fabric friendly name. */
  primaryFabricFriendlyName?: string;
  /** The recovery fabric Id. */
  recoveryFabricId?: string;
  /** The recovery fabric friendly name. */
  recoveryFabricFriendlyName?: string;
  /** The failover deployment model. */
  failoverDeploymentModel?: string;
  /** The list of replication providers. */
  replicationProviders?: string[];
  /** The list of allowed operations. */
  allowedOperations?: string[];
  /** The start time of the last planned failover. */
  lastPlannedFailoverTime?: Date;
  /** The start time of the last unplanned failover. */
  lastUnplannedFailoverTime?: Date;
  /** The start time of the last test failover. */
  lastTestFailoverTime?: Date;
  /** The current scenario details. */
  currentScenario?: CurrentScenarioDetails;
  /** The recovery plan status. */
  currentScenarioStatus?: string;
  /** The recovery plan status description. */
  currentScenarioStatusDescription?: string;
  /** The recovery plan groups. */
  groups?: RecoveryPlanGroup[];
  /** The provider id and provider specific details. */
  providerSpecificDetails?: RecoveryPlanProviderSpecificDetailsUnion[];
}

export function recoveryPlanPropertiesDeserializer(item: any): RecoveryPlanProperties {
  return {
    friendlyName: item["friendlyName"],
    primaryFabricId: item["primaryFabricId"],
    primaryFabricFriendlyName: item["primaryFabricFriendlyName"],
    recoveryFabricId: item["recoveryFabricId"],
    recoveryFabricFriendlyName: item["recoveryFabricFriendlyName"],
    failoverDeploymentModel: item["failoverDeploymentModel"],
    replicationProviders: !item["replicationProviders"]
      ? item["replicationProviders"]
      : item["replicationProviders"].map((p: any) => {
          return p;
        }),
    allowedOperations: !item["allowedOperations"]
      ? item["allowedOperations"]
      : item["allowedOperations"].map((p: any) => {
          return p;
        }),
    lastPlannedFailoverTime: !item["lastPlannedFailoverTime"]
      ? item["lastPlannedFailoverTime"]
      : new Date(item["lastPlannedFailoverTime"]),
    lastUnplannedFailoverTime: !item["lastUnplannedFailoverTime"]
      ? item["lastUnplannedFailoverTime"]
      : new Date(item["lastUnplannedFailoverTime"]),
    lastTestFailoverTime: !item["lastTestFailoverTime"]
      ? item["lastTestFailoverTime"]
      : new Date(item["lastTestFailoverTime"]),
    currentScenario: !item["currentScenario"]
      ? item["currentScenario"]
      : currentScenarioDetailsDeserializer(item["currentScenario"]),
    currentScenarioStatus: item["currentScenarioStatus"],
    currentScenarioStatusDescription: item["currentScenarioStatusDescription"],
    groups: !item["groups"] ? item["groups"] : recoveryPlanGroupArrayDeserializer(item["groups"]),
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : recoveryPlanProviderSpecificDetailsUnionArrayDeserializer(item["providerSpecificDetails"]),
  };
}

export function recoveryPlanGroupArraySerializer(result: Array<RecoveryPlanGroup>): any[] {
  return result.map((item) => {
    return recoveryPlanGroupSerializer(item);
  });
}

export function recoveryPlanGroupArrayDeserializer(result: Array<RecoveryPlanGroup>): any[] {
  return result.map((item) => {
    return recoveryPlanGroupDeserializer(item);
  });
}

/** Recovery plan group details. */
export interface RecoveryPlanGroup {
  /** The group type. */
  groupType: RecoveryPlanGroupType;
  /** The list of protected items. */
  replicationProtectedItems?: RecoveryPlanProtectedItem[];
  /** The start group actions. */
  startGroupActions?: RecoveryPlanAction[];
  /** The end group actions. */
  endGroupActions?: RecoveryPlanAction[];
}

export function recoveryPlanGroupSerializer(item: RecoveryPlanGroup): any {
  return {
    groupType: item["groupType"],
    replicationProtectedItems: !item["replicationProtectedItems"]
      ? item["replicationProtectedItems"]
      : recoveryPlanProtectedItemArraySerializer(item["replicationProtectedItems"]),
    startGroupActions: !item["startGroupActions"]
      ? item["startGroupActions"]
      : recoveryPlanActionArraySerializer(item["startGroupActions"]),
    endGroupActions: !item["endGroupActions"]
      ? item["endGroupActions"]
      : recoveryPlanActionArraySerializer(item["endGroupActions"]),
  };
}

export function recoveryPlanGroupDeserializer(item: any): RecoveryPlanGroup {
  return {
    groupType: item["groupType"],
    replicationProtectedItems: !item["replicationProtectedItems"]
      ? item["replicationProtectedItems"]
      : recoveryPlanProtectedItemArrayDeserializer(item["replicationProtectedItems"]),
    startGroupActions: !item["startGroupActions"]
      ? item["startGroupActions"]
      : recoveryPlanActionArrayDeserializer(item["startGroupActions"]),
    endGroupActions: !item["endGroupActions"]
      ? item["endGroupActions"]
      : recoveryPlanActionArrayDeserializer(item["endGroupActions"]),
  };
}

/** The group type. */
export enum KnownRecoveryPlanGroupType {
  /** Shutdown */
  Shutdown = "Shutdown",
  /** Boot */
  Boot = "Boot",
  /** Failover */
  Failover = "Failover",
}

/**
 * The group type. \
 * {@link KnownRecoveryPlanGroupType} can be used interchangeably with RecoveryPlanGroupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shutdown**: Shutdown \
 * **Boot**: Boot \
 * **Failover**: Failover
 */
export type RecoveryPlanGroupType = string;

export function recoveryPlanProtectedItemArraySerializer(
  result: Array<RecoveryPlanProtectedItem>,
): any[] {
  return result.map((item) => {
    return recoveryPlanProtectedItemSerializer(item);
  });
}

export function recoveryPlanProtectedItemArrayDeserializer(
  result: Array<RecoveryPlanProtectedItem>,
): any[] {
  return result.map((item) => {
    return recoveryPlanProtectedItemDeserializer(item);
  });
}

/** Recovery plan protected item. */
export interface RecoveryPlanProtectedItem {
  /** The ARM Id of the recovery plan protected item. */
  id?: string;
  /** The virtual machine Id. */
  virtualMachineId?: string;
}

export function recoveryPlanProtectedItemSerializer(item: RecoveryPlanProtectedItem): any {
  return { id: item["id"], virtualMachineId: item["virtualMachineId"] };
}

export function recoveryPlanProtectedItemDeserializer(item: any): RecoveryPlanProtectedItem {
  return {
    id: item["id"],
    virtualMachineId: item["virtualMachineId"],
  };
}

export function recoveryPlanActionArraySerializer(result: Array<RecoveryPlanAction>): any[] {
  return result.map((item) => {
    return recoveryPlanActionSerializer(item);
  });
}

export function recoveryPlanActionArrayDeserializer(result: Array<RecoveryPlanAction>): any[] {
  return result.map((item) => {
    return recoveryPlanActionDeserializer(item);
  });
}

/** Recovery plan action details. */
export interface RecoveryPlanAction {
  /** The action name. */
  actionName: string;
  /** The list of failover types. */
  failoverTypes: ReplicationProtectedItemOperation[];
  /** The list of failover directions. */
  failoverDirections: PossibleOperationsDirections[];
  /** The custom details. */
  customDetails: RecoveryPlanActionDetailsUnion;
}

export function recoveryPlanActionSerializer(item: RecoveryPlanAction): any {
  return {
    actionName: item["actionName"],
    failoverTypes: item["failoverTypes"].map((p: any) => {
      return p;
    }),
    failoverDirections: item["failoverDirections"].map((p: any) => {
      return p;
    }),
    customDetails: recoveryPlanActionDetailsUnionSerializer(item["customDetails"]),
  };
}

export function recoveryPlanActionDeserializer(item: any): RecoveryPlanAction {
  return {
    actionName: item["actionName"],
    failoverTypes: item["failoverTypes"].map((p: any) => {
      return p;
    }),
    failoverDirections: item["failoverDirections"].map((p: any) => {
      return p;
    }),
    customDetails: recoveryPlanActionDetailsUnionDeserializer(item["customDetails"]),
  };
}

/** The list of failover types. */
export enum KnownReplicationProtectedItemOperation {
  /** ReverseReplicate */
  ReverseReplicate = "ReverseReplicate",
  /** Commit */
  Commit = "Commit",
  /** PlannedFailover */
  PlannedFailover = "PlannedFailover",
  /** UnplannedFailover */
  UnplannedFailover = "UnplannedFailover",
  /** DisableProtection */
  DisableProtection = "DisableProtection",
  /** TestFailover */
  TestFailover = "TestFailover",
  /** TestFailoverCleanup */
  TestFailoverCleanup = "TestFailoverCleanup",
  /** Failback */
  Failback = "Failback",
  /** FinalizeFailback */
  FinalizeFailback = "FinalizeFailback",
  /** CancelFailover */
  CancelFailover = "CancelFailover",
  /** ChangePit */
  ChangePit = "ChangePit",
  /** RepairReplication */
  RepairReplication = "RepairReplication",
  /** SwitchProtection */
  SwitchProtection = "SwitchProtection",
  /** CompleteMigration */
  CompleteMigration = "CompleteMigration",
}

/**
 * The list of failover types. \
 * {@link KnownReplicationProtectedItemOperation} can be used interchangeably with ReplicationProtectedItemOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReverseReplicate**: ReverseReplicate \
 * **Commit**: Commit \
 * **PlannedFailover**: PlannedFailover \
 * **UnplannedFailover**: UnplannedFailover \
 * **DisableProtection**: DisableProtection \
 * **TestFailover**: TestFailover \
 * **TestFailoverCleanup**: TestFailoverCleanup \
 * **Failback**: Failback \
 * **FinalizeFailback**: FinalizeFailback \
 * **CancelFailover**: CancelFailover \
 * **ChangePit**: ChangePit \
 * **RepairReplication**: RepairReplication \
 * **SwitchProtection**: SwitchProtection \
 * **CompleteMigration**: CompleteMigration
 */
export type ReplicationProtectedItemOperation = string;

/** The failover direction. */
export enum KnownPossibleOperationsDirections {
  /** PrimaryToRecovery */
  PrimaryToRecovery = "PrimaryToRecovery",
  /** RecoveryToPrimary */
  RecoveryToPrimary = "RecoveryToPrimary",
}

/**
 * The failover direction. \
 * {@link KnownPossibleOperationsDirections} can be used interchangeably with PossibleOperationsDirections,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryToRecovery**: PrimaryToRecovery \
 * **RecoveryToPrimary**: RecoveryToPrimary
 */
export type PossibleOperationsDirections = string;

/** Recovery plan action custom details. */
export interface RecoveryPlanActionDetails {
  /** Gets the type of action details (see RecoveryPlanActionDetailsTypes enum for possible values). */
  /** The discriminator possible values: AutomationRunbookActionDetails, ManualActionDetails, ScriptActionDetails */
  instanceType: string;
}

export function recoveryPlanActionDetailsSerializer(item: RecoveryPlanActionDetails): any {
  return { instanceType: item["instanceType"] };
}

export function recoveryPlanActionDetailsDeserializer(item: any): RecoveryPlanActionDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for RecoveryPlanActionDetailsUnion */
export type RecoveryPlanActionDetailsUnion =
  | RecoveryPlanAutomationRunbookActionDetails
  | RecoveryPlanManualActionDetails
  | RecoveryPlanScriptActionDetails
  | RecoveryPlanActionDetails;

export function recoveryPlanActionDetailsUnionSerializer(
  item: RecoveryPlanActionDetailsUnion,
): any {
  switch (item.instanceType) {
    case "AutomationRunbookActionDetails":
      return recoveryPlanAutomationRunbookActionDetailsSerializer(
        item as RecoveryPlanAutomationRunbookActionDetails,
      );

    case "ManualActionDetails":
      return recoveryPlanManualActionDetailsSerializer(item as RecoveryPlanManualActionDetails);

    case "ScriptActionDetails":
      return recoveryPlanScriptActionDetailsSerializer(item as RecoveryPlanScriptActionDetails);

    default:
      return recoveryPlanActionDetailsSerializer(item);
  }
}

export function recoveryPlanActionDetailsUnionDeserializer(
  item: any,
): RecoveryPlanActionDetailsUnion {
  switch (item["instanceType"]) {
    case "AutomationRunbookActionDetails":
      return recoveryPlanAutomationRunbookActionDetailsDeserializer(
        item as RecoveryPlanAutomationRunbookActionDetails,
      );

    case "ManualActionDetails":
      return recoveryPlanManualActionDetailsDeserializer(item as RecoveryPlanManualActionDetails);

    case "ScriptActionDetails":
      return recoveryPlanScriptActionDetailsDeserializer(item as RecoveryPlanScriptActionDetails);

    default:
      return recoveryPlanActionDetailsDeserializer(item);
  }
}

/** Recovery plan Automation runbook action details. */
export interface RecoveryPlanAutomationRunbookActionDetails extends RecoveryPlanActionDetails {
  /** The runbook ARM Id. */
  runbookId?: string;
  /** The runbook timeout. */
  timeout?: string;
  /** The fabric location. */
  fabricLocation: RecoveryPlanActionLocation;
  /** Gets the type of action details (see RecoveryPlanActionDetailsTypes enum for possible values). */
  instanceType: "AutomationRunbookActionDetails";
}

export function recoveryPlanAutomationRunbookActionDetailsSerializer(
  item: RecoveryPlanAutomationRunbookActionDetails,
): any {
  return {
    instanceType: item["instanceType"],
    runbookId: item["runbookId"],
    timeout: item["timeout"],
    fabricLocation: item["fabricLocation"],
  };
}

export function recoveryPlanAutomationRunbookActionDetailsDeserializer(
  item: any,
): RecoveryPlanAutomationRunbookActionDetails {
  return {
    instanceType: item["instanceType"],
    runbookId: item["runbookId"],
    timeout: item["timeout"],
    fabricLocation: item["fabricLocation"],
  };
}

/** The fabric location. */
export enum KnownRecoveryPlanActionLocation {
  /** Primary */
  Primary = "Primary",
  /** Recovery */
  Recovery = "Recovery",
}

/**
 * The fabric location. \
 * {@link KnownRecoveryPlanActionLocation} can be used interchangeably with RecoveryPlanActionLocation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Recovery**: Recovery
 */
export type RecoveryPlanActionLocation = string;

/** Recovery plan manual action details. */
export interface RecoveryPlanManualActionDetails extends RecoveryPlanActionDetails {
  /** The manual action description. */
  description?: string;
  /** Gets the type of action details (see RecoveryPlanActionDetailsTypes enum for possible values). */
  instanceType: "ManualActionDetails";
}

export function recoveryPlanManualActionDetailsSerializer(
  item: RecoveryPlanManualActionDetails,
): any {
  return { instanceType: item["instanceType"], description: item["description"] };
}

export function recoveryPlanManualActionDetailsDeserializer(
  item: any,
): RecoveryPlanManualActionDetails {
  return {
    instanceType: item["instanceType"],
    description: item["description"],
  };
}

/** Recovery plan script action details. */
export interface RecoveryPlanScriptActionDetails extends RecoveryPlanActionDetails {
  /** The script path. */
  path: string;
  /** The script timeout. */
  timeout?: string;
  /** The fabric location. */
  fabricLocation: RecoveryPlanActionLocation;
  /** Gets the type of action details (see RecoveryPlanActionDetailsTypes enum for possible values). */
  instanceType: "ScriptActionDetails";
}

export function recoveryPlanScriptActionDetailsSerializer(
  item: RecoveryPlanScriptActionDetails,
): any {
  return {
    instanceType: item["instanceType"],
    path: item["path"],
    timeout: item["timeout"],
    fabricLocation: item["fabricLocation"],
  };
}

export function recoveryPlanScriptActionDetailsDeserializer(
  item: any,
): RecoveryPlanScriptActionDetails {
  return {
    instanceType: item["instanceType"],
    path: item["path"],
    timeout: item["timeout"],
    fabricLocation: item["fabricLocation"],
  };
}

export function recoveryPlanProviderSpecificDetailsUnionArrayDeserializer(
  result: Array<RecoveryPlanProviderSpecificDetailsUnion>,
): any[] {
  return result.map((item) => {
    return recoveryPlanProviderSpecificDetailsUnionDeserializer(item);
  });
}

/** Recovery plan provider specific details. */
export interface RecoveryPlanProviderSpecificDetails {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function recoveryPlanProviderSpecificDetailsDeserializer(
  item: any,
): RecoveryPlanProviderSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for RecoveryPlanProviderSpecificDetailsUnion */
export type RecoveryPlanProviderSpecificDetailsUnion =
  | RecoveryPlanA2ADetails
  | RecoveryPlanProviderSpecificDetails;

export function recoveryPlanProviderSpecificDetailsUnionDeserializer(
  item: any,
): RecoveryPlanProviderSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "A2A":
      return recoveryPlanA2ADetailsDeserializer(item as RecoveryPlanA2ADetails);

    default:
      return recoveryPlanProviderSpecificDetailsDeserializer(item);
  }
}

/** Recovery plan A2A specific details. */
export interface RecoveryPlanA2ADetails extends RecoveryPlanProviderSpecificDetails {
  /** The primary zone. */
  primaryZone?: string;
  /** The recovery zone. */
  recoveryZone?: string;
  /** The primary extended location. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery extended location. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function recoveryPlanA2ADetailsDeserializer(item: any): RecoveryPlanA2ADetails {
  return {
    instanceType: item["instanceType"],
    primaryZone: item["primaryZone"],
    recoveryZone: item["recoveryZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationDeserializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationDeserializer(item["recoveryExtendedLocation"]),
  };
}

/** Create recovery plan input class. */
export interface CreateRecoveryPlanInput {
  /** Recovery plan creation properties. */
  properties: CreateRecoveryPlanInputProperties;
}

export function createRecoveryPlanInputSerializer(item: CreateRecoveryPlanInput): any {
  return { properties: createRecoveryPlanInputPropertiesSerializer(item["properties"]) };
}

/** Recovery plan creation properties. */
export interface CreateRecoveryPlanInputProperties {
  /** The primary fabric Id. */
  primaryFabricId: string;
  /** The recovery fabric Id. */
  recoveryFabricId: string;
  /** The failover deployment model. */
  failoverDeploymentModel?: FailoverDeploymentModel;
  /** The recovery plan groups. */
  groups: RecoveryPlanGroup[];
  /** The provider specific input. */
  providerSpecificInput?: RecoveryPlanProviderSpecificInputUnion[];
}

export function createRecoveryPlanInputPropertiesSerializer(
  item: CreateRecoveryPlanInputProperties,
): any {
  return {
    primaryFabricId: item["primaryFabricId"],
    recoveryFabricId: item["recoveryFabricId"],
    failoverDeploymentModel: item["failoverDeploymentModel"],
    groups: recoveryPlanGroupArraySerializer(item["groups"]),
    providerSpecificInput: !item["providerSpecificInput"]
      ? item["providerSpecificInput"]
      : recoveryPlanProviderSpecificInputUnionArraySerializer(item["providerSpecificInput"]),
  };
}

/** The failover deployment model. */
export enum KnownFailoverDeploymentModel {
  /** NotApplicable */
  NotApplicable = "NotApplicable",
  /** Classic */
  Classic = "Classic",
  /** ResourceManager */
  ResourceManager = "ResourceManager",
}

/**
 * The failover deployment model. \
 * {@link KnownFailoverDeploymentModel} can be used interchangeably with FailoverDeploymentModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: NotApplicable \
 * **Classic**: Classic \
 * **ResourceManager**: ResourceManager
 */
export type FailoverDeploymentModel = string;

export function recoveryPlanProviderSpecificInputUnionArraySerializer(
  result: Array<RecoveryPlanProviderSpecificInputUnion>,
): any[] {
  return result.map((item) => {
    return recoveryPlanProviderSpecificInputUnionSerializer(item);
  });
}

/** Recovery plan provider specific input base class. */
export interface RecoveryPlanProviderSpecificInput {
  /** Gets the Instance type. */
  /** The discriminator possible values: A2A */
  instanceType: string;
}

export function recoveryPlanProviderSpecificInputSerializer(
  item: RecoveryPlanProviderSpecificInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for RecoveryPlanProviderSpecificInputUnion */
export type RecoveryPlanProviderSpecificInputUnion =
  | RecoveryPlanA2AInput
  | RecoveryPlanProviderSpecificInput;

export function recoveryPlanProviderSpecificInputUnionSerializer(
  item: RecoveryPlanProviderSpecificInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return recoveryPlanA2AInputSerializer(item as RecoveryPlanA2AInput);

    default:
      return recoveryPlanProviderSpecificInputSerializer(item);
  }
}

/** Recovery plan A2A input. */
export interface RecoveryPlanA2AInput extends RecoveryPlanProviderSpecificInput {
  /** The primary zone. */
  primaryZone?: string;
  /** The recovery zone. */
  recoveryZone?: string;
  /** The primary extended location. */
  primaryExtendedLocation?: ExtendedLocation;
  /** The recovery extended location. */
  recoveryExtendedLocation?: ExtendedLocation;
  /** Gets the Instance type. */
  instanceType: "A2A";
}

export function recoveryPlanA2AInputSerializer(item: RecoveryPlanA2AInput): any {
  return {
    instanceType: item["instanceType"],
    primaryZone: item["primaryZone"],
    recoveryZone: item["recoveryZone"],
    primaryExtendedLocation: !item["primaryExtendedLocation"]
      ? item["primaryExtendedLocation"]
      : extendedLocationSerializer(item["primaryExtendedLocation"]),
    recoveryExtendedLocation: !item["recoveryExtendedLocation"]
      ? item["recoveryExtendedLocation"]
      : extendedLocationSerializer(item["recoveryExtendedLocation"]),
  };
}

/** Update recovery plan input class. */
export interface UpdateRecoveryPlanInput {
  /** Recovery plan update properties. */
  properties?: UpdateRecoveryPlanInputProperties;
}

export function updateRecoveryPlanInputSerializer(item: UpdateRecoveryPlanInput): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateRecoveryPlanInputPropertiesSerializer(item["properties"]),
  };
}

/** Recovery plan update properties. */
export interface UpdateRecoveryPlanInputProperties {
  /** The recovery plan groups. */
  groups?: RecoveryPlanGroup[];
}

export function updateRecoveryPlanInputPropertiesSerializer(
  item: UpdateRecoveryPlanInputProperties,
): any {
  return {
    groups: !item["groups"] ? item["groups"] : recoveryPlanGroupArraySerializer(item["groups"]),
  };
}

/** Recovery plan collection details. */
export interface _RecoveryPlanCollection {
  /** The RecoveryPlan items on this page */
  value: RecoveryPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recoveryPlanCollectionDeserializer(item: any): _RecoveryPlanCollection {
  return {
    value: recoveryPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recoveryPlanArrayDeserializer(result: Array<RecoveryPlan>): any[] {
  return result.map((item) => {
    return recoveryPlanDeserializer(item);
  });
}

/** Recovery plan planned failover input. */
export interface RecoveryPlanPlannedFailoverInput {
  /** The recovery plan planned failover input properties. */
  properties: RecoveryPlanPlannedFailoverInputProperties;
}

export function recoveryPlanPlannedFailoverInputSerializer(
  item: RecoveryPlanPlannedFailoverInput,
): any {
  return { properties: recoveryPlanPlannedFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Recovery plan planned failover input properties. */
export interface RecoveryPlanPlannedFailoverInputProperties {
  /** The failover direction. */
  failoverDirection: PossibleOperationsDirections;
  /** The provider specific properties. */
  providerSpecificDetails?: RecoveryPlanProviderSpecificFailoverInputUnion[];
}

export function recoveryPlanPlannedFailoverInputPropertiesSerializer(
  item: RecoveryPlanPlannedFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : recoveryPlanProviderSpecificFailoverInputUnionArraySerializer(
          item["providerSpecificDetails"],
        ),
  };
}

export function recoveryPlanProviderSpecificFailoverInputUnionArraySerializer(
  result: Array<RecoveryPlanProviderSpecificFailoverInputUnion>,
): any[] {
  return result.map((item) => {
    return recoveryPlanProviderSpecificFailoverInputUnionSerializer(item);
  });
}

/** Recovery plan provider specific failover input. */
export interface RecoveryPlanProviderSpecificFailoverInput {
  /** The class type. */
  /** The discriminator possible values: A2A, HyperVReplicaAzureFailback, HyperVReplicaAzure, InMageAzureV2, InMage, InMageRcmFailback, InMageRcm */
  instanceType: string;
}

export function recoveryPlanProviderSpecificFailoverInputSerializer(
  item: RecoveryPlanProviderSpecificFailoverInput,
): any {
  return { instanceType: item["instanceType"] };
}

/** Alias for RecoveryPlanProviderSpecificFailoverInputUnion */
export type RecoveryPlanProviderSpecificFailoverInputUnion =
  | RecoveryPlanA2AFailoverInput
  | RecoveryPlanHyperVReplicaAzureFailbackInput
  | RecoveryPlanHyperVReplicaAzureFailoverInput
  | RecoveryPlanInMageAzureV2FailoverInput
  | RecoveryPlanInMageFailoverInput
  | RecoveryPlanInMageRcmFailbackFailoverInput
  | RecoveryPlanInMageRcmFailoverInput
  | RecoveryPlanProviderSpecificFailoverInput;

export function recoveryPlanProviderSpecificFailoverInputUnionSerializer(
  item: RecoveryPlanProviderSpecificFailoverInputUnion,
): any {
  switch (item.instanceType) {
    case "A2A":
      return recoveryPlanA2AFailoverInputSerializer(item as RecoveryPlanA2AFailoverInput);

    case "HyperVReplicaAzureFailback":
      return recoveryPlanHyperVReplicaAzureFailbackInputSerializer(
        item as RecoveryPlanHyperVReplicaAzureFailbackInput,
      );

    case "HyperVReplicaAzure":
      return recoveryPlanHyperVReplicaAzureFailoverInputSerializer(
        item as RecoveryPlanHyperVReplicaAzureFailoverInput,
      );

    case "InMageAzureV2":
      return recoveryPlanInMageAzureV2FailoverInputSerializer(
        item as RecoveryPlanInMageAzureV2FailoverInput,
      );

    case "InMage":
      return recoveryPlanInMageFailoverInputSerializer(item as RecoveryPlanInMageFailoverInput);

    case "InMageRcmFailback":
      return recoveryPlanInMageRcmFailbackFailoverInputSerializer(
        item as RecoveryPlanInMageRcmFailbackFailoverInput,
      );

    case "InMageRcm":
      return recoveryPlanInMageRcmFailoverInputSerializer(
        item as RecoveryPlanInMageRcmFailoverInput,
      );

    default:
      return recoveryPlanProviderSpecificFailoverInputSerializer(item);
  }
}

/** Recovery plan A2A failover input. */
export interface RecoveryPlanA2AFailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: A2ARpRecoveryPointType;
  /** A value indicating whether to use recovery cloud service for TFO or not. */
  cloudServiceCreationOption?: string;
  /** A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. */
  multiVmSyncPointOption?: MultiVmSyncPointOption;
  /** The class type. */
  instanceType: "A2A";
}

export function recoveryPlanA2AFailoverInputSerializer(item: RecoveryPlanA2AFailoverInput): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    cloudServiceCreationOption: item["cloudServiceCreationOption"],
    multiVmSyncPointOption: item["multiVmSyncPointOption"],
  };
}

/** The recovery point type. */
export enum KnownA2ARpRecoveryPointType {
  /** Latest */
  Latest = "Latest",
  /** LatestApplicationConsistent */
  LatestApplicationConsistent = "LatestApplicationConsistent",
  /** LatestCrashConsistent */
  LatestCrashConsistent = "LatestCrashConsistent",
  /** LatestProcessed */
  LatestProcessed = "LatestProcessed",
}

/**
 * The recovery point type. \
 * {@link KnownA2ARpRecoveryPointType} can be used interchangeably with A2ARpRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Latest \
 * **LatestApplicationConsistent**: LatestApplicationConsistent \
 * **LatestCrashConsistent**: LatestCrashConsistent \
 * **LatestProcessed**: LatestProcessed
 */
export type A2ARpRecoveryPointType = string;

/** A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. */
export enum KnownMultiVmSyncPointOption {
  /** UseMultiVmSyncRecoveryPoint */
  UseMultiVmSyncRecoveryPoint = "UseMultiVmSyncRecoveryPoint",
  /** UsePerVmRecoveryPoint */
  UsePerVmRecoveryPoint = "UsePerVmRecoveryPoint",
}

/**
 * A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. \
 * {@link KnownMultiVmSyncPointOption} can be used interchangeably with MultiVmSyncPointOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UseMultiVmSyncRecoveryPoint**: UseMultiVmSyncRecoveryPoint \
 * **UsePerVmRecoveryPoint**: UsePerVmRecoveryPoint
 */
export type MultiVmSyncPointOption = string;

/** Recovery plan HVR Azure failback input. */
export interface RecoveryPlanHyperVReplicaAzureFailbackInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The data sync option. */
  dataSyncOption: DataSyncStatus;
  /** The ALR option. */
  recoveryVmCreationOption: AlternateLocationRecoveryOption;
  /** The class type. */
  instanceType: "HyperVReplicaAzureFailback";
}

export function recoveryPlanHyperVReplicaAzureFailbackInputSerializer(
  item: RecoveryPlanHyperVReplicaAzureFailbackInput,
): any {
  return {
    instanceType: item["instanceType"],
    dataSyncOption: item["dataSyncOption"],
    recoveryVmCreationOption: item["recoveryVmCreationOption"],
  };
}

/** The data sync option. */
export enum KnownDataSyncStatus {
  /** ForDownTime */
  ForDownTime = "ForDownTime",
  /** ForSynchronization */
  ForSynchronization = "ForSynchronization",
}

/**
 * The data sync option. \
 * {@link KnownDataSyncStatus} can be used interchangeably with DataSyncStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ForDownTime**: ForDownTime \
 * **ForSynchronization**: ForSynchronization
 */
export type DataSyncStatus = string;

/** The ALR option. */
export enum KnownAlternateLocationRecoveryOption {
  /** CreateVmIfNotFound */
  CreateVmIfNotFound = "CreateVmIfNotFound",
  /** NoAction */
  NoAction = "NoAction",
}

/**
 * The ALR option. \
 * {@link KnownAlternateLocationRecoveryOption} can be used interchangeably with AlternateLocationRecoveryOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreateVmIfNotFound**: CreateVmIfNotFound \
 * **NoAction**: NoAction
 */
export type AlternateLocationRecoveryOption = string;

/** Recovery plan HVR Azure failover input. */
export interface RecoveryPlanHyperVReplicaAzureFailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The primary KEK certificate PFX. */
  primaryKekCertificatePfx?: string;
  /** The secondary KEK certificate PFX. */
  secondaryKekCertificatePfx?: string;
  /** The recovery point type. */
  recoveryPointType?: HyperVReplicaAzureRpRecoveryPointType;
  /** The class type. */
  instanceType: "HyperVReplicaAzure";
}

export function recoveryPlanHyperVReplicaAzureFailoverInputSerializer(
  item: RecoveryPlanHyperVReplicaAzureFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    primaryKekCertificatePfx: item["primaryKekCertificatePfx"],
    secondaryKekCertificatePfx: item["secondaryKekCertificatePfx"],
    recoveryPointType: item["recoveryPointType"],
  };
}

/** The recovery point type. */
export enum KnownHyperVReplicaAzureRpRecoveryPointType {
  /** Latest */
  Latest = "Latest",
  /** LatestApplicationConsistent */
  LatestApplicationConsistent = "LatestApplicationConsistent",
  /** LatestProcessed */
  LatestProcessed = "LatestProcessed",
}

/**
 * The recovery point type. \
 * {@link KnownHyperVReplicaAzureRpRecoveryPointType} can be used interchangeably with HyperVReplicaAzureRpRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Latest \
 * **LatestApplicationConsistent**: LatestApplicationConsistent \
 * **LatestProcessed**: LatestProcessed
 */
export type HyperVReplicaAzureRpRecoveryPointType = string;

/** Recovery plan InMageAzureV2 failover input. */
export interface RecoveryPlanInMageAzureV2FailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: InMageV2RpRecoveryPointType;
  /** A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. */
  useMultiVmSyncPoint?: string;
  /** The class type. */
  instanceType: "InMageAzureV2";
}

export function recoveryPlanInMageAzureV2FailoverInputSerializer(
  item: RecoveryPlanInMageAzureV2FailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    useMultiVmSyncPoint: item["useMultiVmSyncPoint"],
  };
}

/** The recovery point type. */
export enum KnownInMageV2RpRecoveryPointType {
  /** Latest */
  Latest = "Latest",
  /** LatestApplicationConsistent */
  LatestApplicationConsistent = "LatestApplicationConsistent",
  /** LatestCrashConsistent */
  LatestCrashConsistent = "LatestCrashConsistent",
  /** LatestProcessed */
  LatestProcessed = "LatestProcessed",
}

/**
 * The recovery point type. \
 * {@link KnownInMageV2RpRecoveryPointType} can be used interchangeably with InMageV2RpRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Latest \
 * **LatestApplicationConsistent**: LatestApplicationConsistent \
 * **LatestCrashConsistent**: LatestCrashConsistent \
 * **LatestProcessed**: LatestProcessed
 */
export type InMageV2RpRecoveryPointType = string;

/** Recovery plan InMage failover input. */
export interface RecoveryPlanInMageFailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: RpInMageRecoveryPointType;
  /** The class type. */
  instanceType: "InMage";
}

export function recoveryPlanInMageFailoverInputSerializer(
  item: RecoveryPlanInMageFailoverInput,
): any {
  return { instanceType: item["instanceType"], recoveryPointType: item["recoveryPointType"] };
}

/** The recovery point type. */
export enum KnownRpInMageRecoveryPointType {
  /** LatestTime */
  LatestTime = "LatestTime",
  /** LatestTag */
  LatestTag = "LatestTag",
  /** Custom */
  Custom = "Custom",
}

/**
 * The recovery point type. \
 * {@link KnownRpInMageRecoveryPointType} can be used interchangeably with RpInMageRecoveryPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LatestTime**: LatestTime \
 * **LatestTag**: LatestTag \
 * **Custom**: Custom
 */
export type RpInMageRecoveryPointType = string;

/** Recovery plan InMageRcmFailback failover input. */
export interface RecoveryPlanInMageRcmFailbackFailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: InMageRcmFailbackRecoveryPointType;
  /** A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. */
  useMultiVmSyncPoint?: string;
  /** The class type. */
  instanceType: "InMageRcmFailback";
}

export function recoveryPlanInMageRcmFailbackFailoverInputSerializer(
  item: RecoveryPlanInMageRcmFailbackFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    useMultiVmSyncPoint: item["useMultiVmSyncPoint"],
  };
}

/** Recovery plan InMageRcm failover input. */
export interface RecoveryPlanInMageRcmFailoverInput extends RecoveryPlanProviderSpecificFailoverInput {
  /** The recovery point type. */
  recoveryPointType: RecoveryPlanPointType;
  /** A value indicating whether multi VM sync enabled VMs should use multi VM sync points for failover. */
  useMultiVmSyncPoint?: string;
  /** The class type. */
  instanceType: "InMageRcm";
}

export function recoveryPlanInMageRcmFailoverInputSerializer(
  item: RecoveryPlanInMageRcmFailoverInput,
): any {
  return {
    instanceType: item["instanceType"],
    recoveryPointType: item["recoveryPointType"],
    useMultiVmSyncPoint: item["useMultiVmSyncPoint"],
  };
}

/** The recovery point type. */
export enum KnownRecoveryPlanPointType {
  /** Latest */
  Latest = "Latest",
  /** LatestApplicationConsistent */
  LatestApplicationConsistent = "LatestApplicationConsistent",
  /** LatestCrashConsistent */
  LatestCrashConsistent = "LatestCrashConsistent",
  /** LatestProcessed */
  LatestProcessed = "LatestProcessed",
}

/**
 * The recovery point type. \
 * {@link KnownRecoveryPlanPointType} can be used interchangeably with RecoveryPlanPointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Latest \
 * **LatestApplicationConsistent**: LatestApplicationConsistent \
 * **LatestCrashConsistent**: LatestCrashConsistent \
 * **LatestProcessed**: LatestProcessed
 */
export type RecoveryPlanPointType = string;

/** Recovery plan test failover input. */
export interface RecoveryPlanTestFailoverInput {
  /** The recovery plan test failover input properties. */
  properties: RecoveryPlanTestFailoverInputProperties;
}

export function recoveryPlanTestFailoverInputSerializer(item: RecoveryPlanTestFailoverInput): any {
  return { properties: recoveryPlanTestFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Recovery plan test failover input properties. */
export interface RecoveryPlanTestFailoverInputProperties {
  /** The failover direction. */
  failoverDirection: PossibleOperationsDirections;
  /** The network type to be used for test failover. */
  networkType: string;
  /** The Id of the network to be used for test failover. */
  networkId?: string;
  /** The provider specific properties. */
  providerSpecificDetails?: RecoveryPlanProviderSpecificFailoverInputUnion[];
}

export function recoveryPlanTestFailoverInputPropertiesSerializer(
  item: RecoveryPlanTestFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    networkType: item["networkType"],
    networkId: item["networkId"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : recoveryPlanProviderSpecificFailoverInputUnionArraySerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** Recovery plan test failover cleanup input. */
export interface RecoveryPlanTestFailoverCleanupInput {
  /** The recovery plan test failover cleanup input properties. */
  properties: RecoveryPlanTestFailoverCleanupInputProperties;
}

export function recoveryPlanTestFailoverCleanupInputSerializer(
  item: RecoveryPlanTestFailoverCleanupInput,
): any {
  return {
    properties: recoveryPlanTestFailoverCleanupInputPropertiesSerializer(item["properties"]),
  };
}

/** Recovery plan test failover cleanup input properties. */
export interface RecoveryPlanTestFailoverCleanupInputProperties {
  /** The test failover cleanup comments. */
  comments?: string;
}

export function recoveryPlanTestFailoverCleanupInputPropertiesSerializer(
  item: RecoveryPlanTestFailoverCleanupInputProperties,
): any {
  return { comments: item["comments"] };
}

/** Recovery plan unplanned failover input. */
export interface RecoveryPlanUnplannedFailoverInput {
  /** The recovery plan unplanned failover input properties. */
  properties: RecoveryPlanUnplannedFailoverInputProperties;
}

export function recoveryPlanUnplannedFailoverInputSerializer(
  item: RecoveryPlanUnplannedFailoverInput,
): any {
  return { properties: recoveryPlanUnplannedFailoverInputPropertiesSerializer(item["properties"]) };
}

/** Recovery plan unplanned failover input properties. */
export interface RecoveryPlanUnplannedFailoverInputProperties {
  /** The failover direction. */
  failoverDirection: PossibleOperationsDirections;
  /** A value indicating whether source site operations are required. */
  sourceSiteOperations: SourceSiteOperations;
  /** The provider specific properties. */
  providerSpecificDetails?: RecoveryPlanProviderSpecificFailoverInputUnion[];
}

export function recoveryPlanUnplannedFailoverInputPropertiesSerializer(
  item: RecoveryPlanUnplannedFailoverInputProperties,
): any {
  return {
    failoverDirection: item["failoverDirection"],
    sourceSiteOperations: item["sourceSiteOperations"],
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : recoveryPlanProviderSpecificFailoverInputUnionArraySerializer(
          item["providerSpecificDetails"],
        ),
  };
}

/** A value indicating whether source site operations are required. */
export enum KnownSourceSiteOperations {
  /** Required */
  Required = "Required",
  /** NotRequired */
  NotRequired = "NotRequired",
}

/**
 * A value indicating whether source site operations are required. \
 * {@link KnownSourceSiteOperations} can be used interchangeably with SourceSiteOperations,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required**: Required \
 * **NotRequired**: NotRequired
 */
export type SourceSiteOperations = string;

/** Vault setting. */
export interface VaultSetting extends ProxyResource {
  /** The vault setting properties. */
  properties?: VaultSettingProperties;
  /** Resource Location */
  location?: string;
}

export function vaultSettingDeserializer(item: any): VaultSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vaultSettingPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Vault setting properties. */
export interface VaultSettingProperties {
  /** The migration solution ARM Id. */
  migrationSolutionId?: string;
  /** VMware to Azure provider type. */
  vmwareToAzureProviderType?: string;
}

export function vaultSettingPropertiesDeserializer(item: any): VaultSettingProperties {
  return {
    migrationSolutionId: item["migrationSolutionId"],
    vmwareToAzureProviderType: item["vmwareToAzureProviderType"],
  };
}

/** Input to create vault setting. */
export interface VaultSettingCreationInput {
  /** Vault setting creation input properties. */
  properties: VaultSettingCreationInputProperties;
}

export function vaultSettingCreationInputSerializer(item: VaultSettingCreationInput): any {
  return { properties: vaultSettingCreationInputPropertiesSerializer(item["properties"]) };
}

/** Input to create vault setting. */
export interface VaultSettingCreationInputProperties {
  /** The migration solution Id. */
  migrationSolutionId?: string;
  /** VMware to Azure provider type. */
  vmwareToAzureProviderType?: string;
}

export function vaultSettingCreationInputPropertiesSerializer(
  item: VaultSettingCreationInputProperties,
): any {
  return {
    migrationSolutionId: item["migrationSolutionId"],
    vmwareToAzureProviderType: item["vmwareToAzureProviderType"],
  };
}

/** Vault setting collection. */
export interface _VaultSettingCollection {
  /** The VaultSetting items on this page */
  value: VaultSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vaultSettingCollectionDeserializer(item: any): _VaultSettingCollection {
  return {
    value: vaultSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vaultSettingArrayDeserializer(result: Array<VaultSetting>): any[] {
  return result.map((item) => {
    return vaultSettingDeserializer(item);
  });
}

/** Collection of ClientDiscovery details. */
export interface _OperationsDiscoveryCollection {
  /** The OperationsDiscovery items on this page */
  value: OperationsDiscovery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationsDiscoveryCollectionDeserializer(
  item: any,
): _OperationsDiscoveryCollection {
  return {
    value: operationsDiscoveryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationsDiscoveryArrayDeserializer(result: Array<OperationsDiscovery>): any[] {
  return result.map((item) => {
    return operationsDiscoveryDeserializer(item);
  });
}

/** Operations discovery class. */
export interface OperationsDiscovery {
  /** Name of the API. The name of the operation being performed on this particular object. It should match the action name that appears in RBAC / the event service. Examples of operations include: * Microsoft.Compute/virtualMachine/capture/action * Microsoft.Compute/virtualMachine/restart/action * Microsoft.Compute/virtualMachine/write * Microsoft.Compute/virtualMachine/read * Microsoft.Compute/virtualMachine/delete Each action should include, in order: (1) Resource Provider Namespace (2) Type hierarchy for which the action applies (e.g. server/databases for a SQL Azure database) (3) Read, Write, Action or Delete indicating which type applies. If it is a PUT/PATCH on a collection or named value, Write should be used. If it is a GET, Read should be used. If it is a DELETE, Delete should be used. If it is a POST, Action should be used. As a note: all resource providers would need to include the "{Resource Provider Namespace}/register/action" operation in their response. This API is used to register for their service, and should include details about the operation (e.g. a localized name for the resource provider + any special considerations like PII release). */
  name?: string;
  /** Object type. */
  display?: Display;
  /** Origin. The intended executor of the operation; governs the display of the operation in the RBAC UX and the audit logs UX. Default value is "user,system". */
  origin?: string;
  /** Properties. Reserved for future use. */
  properties?: any;
}

export function operationsDiscoveryDeserializer(item: any): OperationsDiscovery {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : displayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Contains the localized display information for this particular operation / action. These value will be used by several clients for (1) custom role definitions for RBAC; (2) complex query filters for the event service; and (3) audit history / records for management operations. */
export interface Display {
  /** The provider. The localized friendly form of the resource provider name - it is expected to also include the publisher/company responsible. It should use Title Casing and begin with "Microsoft" for 1st party services. e.g. "Microsoft Monitoring Insights" or "Microsoft Compute.". */
  provider?: string;
  /** The resource. The localized friendly form of the resource related to this action/operation - it should match the public documentation for the resource provider. It should use Title Casing. This value should be unique for a particular URL type (e.g. nested types should *not* reuse their parent's display.resource field). e.g. "Virtual Machines" or "Scheduler Job Collections", or "Virtual Machine VM Sizes" or "Scheduler Jobs". */
  resource?: string;
  /** The operation. The localized friendly name for the operation, as it should be shown to the user. It should be concise (to fit in drop downs) but clear (i.e. self-documenting). It should use Title Casing. Prescriptive guidance: Read Create or Update Delete 'ActionName'. */
  operation?: string;
  /** The description. The localized friendly description for the operation, as it should be shown to the user. It should be thorough, yet concise - it will be used in tool tips and detailed views. Prescriptive guidance for namespaces: Read any 'display.provider' resource Create or Update any 'display.provider' resource Delete any 'display.provider' resource Perform any other action on any 'display.provider' resource Prescriptive guidance for namespaces: Read any 'display.resource' Create or Update any 'display.resource' Delete any 'display.resource' 'ActionName' any 'display.resources'. */
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

/** Collection of appliance details. */
export interface _ApplianceCollection {
  /** The ReplicationAppliance items on this page */
  value: ReplicationAppliance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applianceCollectionDeserializer(item: any): _ApplianceCollection {
  return {
    value: replicationApplianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationApplianceArrayDeserializer(result: Array<ReplicationAppliance>): any[] {
  return result.map((item) => {
    return replicationApplianceDeserializer(item);
  });
}

/** Replication appliance definition. */
export interface ReplicationAppliance {
  /** Appliance related data. */
  properties?: ReplicationApplianceProperties;
}

export function replicationApplianceDeserializer(item: any): ReplicationAppliance {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : replicationAppliancePropertiesDeserializer(item["properties"]),
  };
}

/** Replication appliance properties. */
export interface ReplicationApplianceProperties {
  /** Provider specific settings. */
  providerSpecificDetails?: ApplianceSpecificDetailsUnion;
}

export function replicationAppliancePropertiesDeserializer(
  item: any,
): ReplicationApplianceProperties {
  return {
    providerSpecificDetails: !item["providerSpecificDetails"]
      ? item["providerSpecificDetails"]
      : applianceSpecificDetailsUnionDeserializer(item["providerSpecificDetails"]),
  };
}

/** Appliance specific details. */
export interface ApplianceSpecificDetails {
  /** Gets the class type. Overridden in derived classes. */
  /** The discriminator possible values: InMageRcm */
  instanceType: string;
}

export function applianceSpecificDetailsDeserializer(item: any): ApplianceSpecificDetails {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for ApplianceSpecificDetailsUnion */
export type ApplianceSpecificDetailsUnion =
  | InMageRcmApplianceSpecificDetails
  | ApplianceSpecificDetails;

export function applianceSpecificDetailsUnionDeserializer(
  item: any,
): ApplianceSpecificDetailsUnion {
  switch (item["instanceType"]) {
    case "InMageRcm":
      return inMageRcmApplianceSpecificDetailsDeserializer(
        item as InMageRcmApplianceSpecificDetails,
      );

    default:
      return applianceSpecificDetailsDeserializer(item);
  }
}

/** InMageRcm appliance specific details. */
export interface InMageRcmApplianceSpecificDetails extends ApplianceSpecificDetails {
  /** The list of appliances. */
  readonly appliances?: InMageRcmApplianceDetails[];
  /** Gets the class type. Overridden in derived classes. */
  instanceType: "InMageRcm";
}

export function inMageRcmApplianceSpecificDetailsDeserializer(
  item: any,
): InMageRcmApplianceSpecificDetails {
  return {
    instanceType: item["instanceType"],
    appliances: !item["appliances"]
      ? item["appliances"]
      : inMageRcmApplianceDetailsArrayDeserializer(item["appliances"]),
  };
}

export function inMageRcmApplianceDetailsArrayDeserializer(
  result: Array<InMageRcmApplianceDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmApplianceDetailsDeserializer(item);
  });
}

/** InMageRcm appliance details. */
export interface InMageRcmApplianceDetails {
  /** The appliance Id. */
  readonly id?: string;
  /** The appliance name. */
  readonly name?: string;
  /** The fabric ARM Id. */
  readonly fabricArmId?: string;
  /** The process server. */
  readonly processServer?: ProcessServerDetails;
  /** The of RCM proxy. */
  readonly rcmProxy?: RcmProxyDetails;
  /** The push installer. */
  readonly pushInstaller?: PushInstallerDetails;
  /** The replication agent. */
  readonly replicationAgent?: ReplicationAgentDetails;
  /** The reprotect agent. */
  readonly reprotectAgent?: ReprotectAgentDetails;
  /** The Mars agent. */
  readonly marsAgent?: MarsAgentDetails;
  /** The DRA. */
  readonly dra?: DraDetails;
  /** The switch provider blocking error information. */
  readonly switchProviderBlockingErrorDetails?: InMageRcmFabricSwitchProviderBlockingErrorDetails[];
}

export function inMageRcmApplianceDetailsDeserializer(item: any): InMageRcmApplianceDetails {
  return {
    id: item["id"],
    name: item["name"],
    fabricArmId: item["fabricArmId"],
    processServer: !item["processServer"]
      ? item["processServer"]
      : processServerDetailsDeserializer(item["processServer"]),
    rcmProxy: !item["rcmProxy"] ? item["rcmProxy"] : rcmProxyDetailsDeserializer(item["rcmProxy"]),
    pushInstaller: !item["pushInstaller"]
      ? item["pushInstaller"]
      : pushInstallerDetailsDeserializer(item["pushInstaller"]),
    replicationAgent: !item["replicationAgent"]
      ? item["replicationAgent"]
      : replicationAgentDetailsDeserializer(item["replicationAgent"]),
    reprotectAgent: !item["reprotectAgent"]
      ? item["reprotectAgent"]
      : reprotectAgentDetailsDeserializer(item["reprotectAgent"]),
    marsAgent: !item["marsAgent"]
      ? item["marsAgent"]
      : marsAgentDetailsDeserializer(item["marsAgent"]),
    dra: !item["dra"] ? item["dra"] : draDetailsDeserializer(item["dra"]),
    switchProviderBlockingErrorDetails: !item["switchProviderBlockingErrorDetails"]
      ? item["switchProviderBlockingErrorDetails"]
      : inMageRcmFabricSwitchProviderBlockingErrorDetailsArrayDeserializer(
          item["switchProviderBlockingErrorDetails"],
        ),
  };
}

export function inMageRcmFabricSwitchProviderBlockingErrorDetailsArrayDeserializer(
  result: Array<InMageRcmFabricSwitchProviderBlockingErrorDetails>,
): any[] {
  return result.map((item) => {
    return inMageRcmFabricSwitchProviderBlockingErrorDetailsDeserializer(item);
  });
}

/** InMageRcmFabric switch provider blocking error details. */
export interface InMageRcmFabricSwitchProviderBlockingErrorDetails {
  /** The error code. */
  readonly errorCode?: string;
  /** The error message. */
  readonly errorMessage?: string;
  /** The possible causes. */
  readonly possibleCauses?: string;
  /** The recommended action. */
  readonly recommendedAction?: string;
  /** The error message parameters. */
  readonly errorMessageParameters?: Record<string, string>;
  /** The error tags. */
  readonly errorTags?: Record<string, string>;
}

export function inMageRcmFabricSwitchProviderBlockingErrorDetailsDeserializer(
  item: any,
): InMageRcmFabricSwitchProviderBlockingErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    possibleCauses: item["possibleCauses"],
    recommendedAction: item["recommendedAction"],
    errorMessageParameters: !item["errorMessageParameters"]
      ? item["errorMessageParameters"]
      : Object.fromEntries(
          Object.entries(item["errorMessageParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorTags: !item["errorTags"]
      ? item["errorTags"]
      : Object.fromEntries(
          Object.entries(item["errorTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Supported operating systems. */
export interface SupportedOperatingSystems extends Resource {
  /** The supported operating systems properties. */
  properties?: SupportedOSProperties;
  /** Resource Location */
  location?: string;
}

export function supportedOperatingSystemsDeserializer(item: any): SupportedOperatingSystems {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : supportedOSPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Supported operating systems properties. */
export interface SupportedOSProperties {
  /** The supported operating systems property list. */
  supportedOsList?: SupportedOSProperty[];
}

export function supportedOSPropertiesDeserializer(item: any): SupportedOSProperties {
  return {
    supportedOsList: !item["supportedOsList"]
      ? item["supportedOsList"]
      : supportedOSPropertyArrayDeserializer(item["supportedOsList"]),
  };
}

export function supportedOSPropertyArrayDeserializer(result: Array<SupportedOSProperty>): any[] {
  return result.map((item) => {
    return supportedOSPropertyDeserializer(item);
  });
}

/** Supported operating systems property. */
export interface SupportedOSProperty {
  /** The replication provider type. */
  instanceType?: string;
  /** The list of supported operating systems. */
  supportedOs?: SupportedOSDetails[];
}

export function supportedOSPropertyDeserializer(item: any): SupportedOSProperty {
  return {
    instanceType: item["instanceType"],
    supportedOs: !item["supportedOs"]
      ? item["supportedOs"]
      : supportedOSDetailsArrayDeserializer(item["supportedOs"]),
  };
}

export function supportedOSDetailsArrayDeserializer(result: Array<SupportedOSDetails>): any[] {
  return result.map((item) => {
    return supportedOSDetailsDeserializer(item);
  });
}

/** Supported operating system details. */
export interface SupportedOSDetails {
  /** The name. */
  osName?: string;
  /** The type. */
  osType?: string;
  /** The list of version for operating system. */
  osVersions?: OSVersionWrapper[];
}

export function supportedOSDetailsDeserializer(item: any): SupportedOSDetails {
  return {
    osName: item["osName"],
    osType: item["osType"],
    osVersions: !item["osVersions"]
      ? item["osVersions"]
      : osVersionWrapperArrayDeserializer(item["osVersions"]),
  };
}

export function osVersionWrapperArrayDeserializer(result: Array<OSVersionWrapper>): any[] {
  return result.map((item) => {
    return osVersionWrapperDeserializer(item);
  });
}

/** Wrapper model for OSVersion to include version and service pack info. */
export interface OSVersionWrapper {
  /** The version. */
  version?: string;
  /** The service pack. */
  servicePack?: string;
}

export function osVersionWrapperDeserializer(item: any): OSVersionWrapper {
  return {
    version: item["version"],
    servicePack: item["servicePack"],
  };
}

/** Vault health details definition. */
export interface VaultHealthDetails extends Resource {
  /** The vault health related data. */
  properties?: VaultHealthProperties;
  /** Resource Location */
  location?: string;
}

export function vaultHealthDetailsDeserializer(item: any): VaultHealthDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vaultHealthPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** class to define the health summary of the Vault. */
export interface VaultHealthProperties {
  /** The list of errors on the vault. */
  vaultErrors?: HealthError[];
  /** The list of the health detail of the protected items in the vault. */
  protectedItemsHealth?: ResourceHealthSummary;
  /** The list of the health detail of the fabrics in the vault. */
  fabricsHealth?: ResourceHealthSummary;
  /** The list of the health detail of the containers in the vault. */
  containersHealth?: ResourceHealthSummary;
}

export function vaultHealthPropertiesDeserializer(item: any): VaultHealthProperties {
  return {
    vaultErrors: !item["vaultErrors"]
      ? item["vaultErrors"]
      : healthErrorArrayDeserializer(item["vaultErrors"]),
    protectedItemsHealth: !item["protectedItemsHealth"]
      ? item["protectedItemsHealth"]
      : resourceHealthSummaryDeserializer(item["protectedItemsHealth"]),
    fabricsHealth: !item["fabricsHealth"]
      ? item["fabricsHealth"]
      : resourceHealthSummaryDeserializer(item["fabricsHealth"]),
    containersHealth: !item["containersHealth"]
      ? item["containersHealth"]
      : resourceHealthSummaryDeserializer(item["containersHealth"]),
  };
}

/** Base class to define the health summary of the resources contained under an Arm resource. */
export interface ResourceHealthSummary {
  /** The count of total resources under the container. */
  resourceCount?: number;
  /** The list of summary of health errors across the resources under the container. */
  issues?: HealthErrorSummary[];
  /** The categorized resource counts. */
  categorizedResourceCounts?: Record<string, number>;
}

export function resourceHealthSummaryDeserializer(item: any): ResourceHealthSummary {
  return {
    resourceCount: item["resourceCount"],
    issues: !item["issues"] ? item["issues"] : healthErrorSummaryArrayDeserializer(item["issues"]),
    categorizedResourceCounts: !item["categorizedResourceCounts"]
      ? item["categorizedResourceCounts"]
      : Object.fromEntries(
          Object.entries(item["categorizedResourceCounts"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function healthErrorSummaryArrayDeserializer(result: Array<HealthErrorSummary>): any[] {
  return result.map((item) => {
    return healthErrorSummaryDeserializer(item);
  });
}

/** class to define the summary of the health error details. */
export interface HealthErrorSummary {
  /** The code of the health error. */
  summaryCode?: string;
  /** The category of the health error. */
  category?: HealthErrorCategory;
  /** Severity of error. */
  severity?: Severity;
  /** The summary message of the health error. */
  summaryMessage?: string;
  /** The type of affected ARM resource. */
  affectedResourceType?: string;
  /** The sub type of any subcomponent within the ARM resource that this might be applicable. Value remains null if not applicable. */
  affectedResourceSubtype?: string;
  /** The list of affected resource correlation Ids. This can be used to uniquely identify the count of items affected by a specific category and severity as well as count of item affected by an specific issue. */
  affectedResourceCorrelationIds?: string[];
}

export function healthErrorSummaryDeserializer(item: any): HealthErrorSummary {
  return {
    summaryCode: item["summaryCode"],
    category: item["category"],
    severity: item["severity"],
    summaryMessage: item["summaryMessage"],
    affectedResourceType: item["affectedResourceType"],
    affectedResourceSubtype: item["affectedResourceSubtype"],
    affectedResourceCorrelationIds: !item["affectedResourceCorrelationIds"]
      ? item["affectedResourceCorrelationIds"]
      : item["affectedResourceCorrelationIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The category of the health error. */
export enum KnownHealthErrorCategory {
  /** None */
  None = "None",
  /** Replication */
  Replication = "Replication",
  /** TestFailover */
  TestFailover = "TestFailover",
  /** Configuration */
  Configuration = "Configuration",
  /** FabricInfrastructure */
  FabricInfrastructure = "FabricInfrastructure",
  /** VersionExpiry */
  VersionExpiry = "VersionExpiry",
  /** AgentAutoUpdateInfra */
  AgentAutoUpdateInfra = "AgentAutoUpdateInfra",
  /** AgentAutoUpdateArtifactDeleted */
  AgentAutoUpdateArtifactDeleted = "AgentAutoUpdateArtifactDeleted",
  /** AgentAutoUpdateRunAsAccount */
  AgentAutoUpdateRunAsAccount = "AgentAutoUpdateRunAsAccount",
  /** AgentAutoUpdateRunAsAccountExpiry */
  AgentAutoUpdateRunAsAccountExpiry = "AgentAutoUpdateRunAsAccountExpiry",
  /** AgentAutoUpdateRunAsAccountExpired */
  AgentAutoUpdateRunAsAccountExpired = "AgentAutoUpdateRunAsAccountExpired",
}

/**
 * The category of the health error. \
 * {@link KnownHealthErrorCategory} can be used interchangeably with HealthErrorCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Replication**: Replication \
 * **TestFailover**: TestFailover \
 * **Configuration**: Configuration \
 * **FabricInfrastructure**: FabricInfrastructure \
 * **VersionExpiry**: VersionExpiry \
 * **AgentAutoUpdateInfra**: AgentAutoUpdateInfra \
 * **AgentAutoUpdateArtifactDeleted**: AgentAutoUpdateArtifactDeleted \
 * **AgentAutoUpdateRunAsAccount**: AgentAutoUpdateRunAsAccount \
 * **AgentAutoUpdateRunAsAccountExpiry**: AgentAutoUpdateRunAsAccountExpiry \
 * **AgentAutoUpdateRunAsAccountExpired**: AgentAutoUpdateRunAsAccountExpired
 */
export type HealthErrorCategory = string;

/** Severity of error. */
export enum KnownSeverity {
  /** NONE */
  None = "NONE",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
  /** Info */
  Info = "Info",
}

/**
 * Severity of error. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NONE**: NONE \
 * **Warning**: Warning \
 * **Error**: Error \
 * **Info**: Info
 */
export type Severity = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
}
