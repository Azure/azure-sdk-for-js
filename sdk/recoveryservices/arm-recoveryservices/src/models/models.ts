// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** Operation Resource */
export interface OperationResource {
  /** End time of the operation */
  endTime?: Date;
  /** Required if status == failed or status == canceled. This is the OData v4 error format, used by the RPC and will go into the v2.2 Azure REST API guidelines. */
  error?: ErrorModel;
  /** It should match what is used to GET the operation result */
  id?: string;
  /** It must match the last segment of the "id" field, and will typically be a GUID / system generated value */
  name?: string;
  /** The status of the operation. (InProgress/Success/Failed/Cancelled) */
  status?: string;
  /** Start time of the operation */
  startTime?: Date;
}

export function operationResourceDeserializer(item: any): OperationResource {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** The resource management error response. */
export interface ErrorModel {
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
  /** The error code. */
  readonly code?: string;
  /** The error details. */
  readonly details?: ErrorModel[];
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
    code: item["code"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
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

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/** An error response from Azure Backup. */
export interface CloudError {
  /** The resource management error response. */
  error?: ErrorModel;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** Resource information, as returned by the resource provider. */
export interface Vault extends TrackedResource {
  /** Properties of the vault. */
  properties?: VaultProperties;
  /** Identity for the resource. */
  identity?: IdentityData;
  /** Identifies the unique system identifier for each Azure resource. */
  sku?: Sku;
  /** etag for the resource. */
  etag?: string;
}

export function vaultSerializer(item: Vault): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : vaultPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityDataSerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    etag: item["etag"],
  };
}

export function vaultDeserializer(item: any): Vault {
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
      : vaultPropertiesDeserializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityDataDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    etag: item["etag"],
  };
}

/** Properties of the vault. */
export interface VaultProperties {
  /** Provisioning State. */
  readonly provisioningState?: string;
  /** Details for upgrading vault. */
  upgradeDetails?: UpgradeDetails;
  /** List of private endpoint connection. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionVaultProperties[];
  /** Private endpoint state for backup. */
  readonly privateEndpointStateForBackup?: VaultPrivateEndpointState;
  /** Private endpoint state for site recovery. */
  readonly privateEndpointStateForSiteRecovery?: VaultPrivateEndpointState;
  /** Customer Managed Key details of the resource. */
  encryption?: VaultPropertiesEncryption;
  /** The details of the latest move operation performed on the Azure Resource */
  moveDetails?: VaultPropertiesMoveDetails;
  /** The State of the Resource after the move operation */
  readonly moveState?: ResourceMoveState;
  /** Backup storage version */
  readonly backupStorageVersion?: BackupStorageVersion;
  /** property to enable or disable resource provider inbound network traffic from public clients */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Monitoring Settings of the vault */
  monitoringSettings?: MonitoringSettings;
  /** Restore Settings of the vault */
  restoreSettings?: RestoreSettings;
  /** The redundancy Settings of a Vault */
  redundancySettings?: VaultPropertiesRedundancySettings;
  /** Security Settings of the vault */
  securitySettings?: SecuritySettings;
  /** Secure Score of Recovery Services Vault */
  readonly secureScore?: SecureScoreLevel;
  /** Security levels of Recovery Services Vault for business continuity and disaster recovery */
  readonly bcdrSecurityLevel?: BcdrSecurityLevel;
  /** ResourceGuardOperationRequests on which LAC check will be performed */
  resourceGuardOperationRequests?: string[];
}

export function vaultPropertiesSerializer(item: VaultProperties): any {
  return {
    upgradeDetails: !item["upgradeDetails"]
      ? item["upgradeDetails"]
      : upgradeDetailsSerializer(item["upgradeDetails"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : vaultPropertiesEncryptionSerializer(item["encryption"]),
    moveDetails: !item["moveDetails"]
      ? item["moveDetails"]
      : vaultPropertiesMoveDetailsSerializer(item["moveDetails"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    monitoringSettings: !item["monitoringSettings"]
      ? item["monitoringSettings"]
      : monitoringSettingsSerializer(item["monitoringSettings"]),
    restoreSettings: !item["restoreSettings"]
      ? item["restoreSettings"]
      : restoreSettingsSerializer(item["restoreSettings"]),
    redundancySettings: !item["redundancySettings"]
      ? item["redundancySettings"]
      : vaultPropertiesRedundancySettingsSerializer(item["redundancySettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : securitySettingsSerializer(item["securitySettings"]),
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

export function vaultPropertiesDeserializer(item: any): VaultProperties {
  return {
    provisioningState: item["provisioningState"],
    upgradeDetails: !item["upgradeDetails"]
      ? item["upgradeDetails"]
      : upgradeDetailsDeserializer(item["upgradeDetails"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionVaultPropertiesArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    privateEndpointStateForBackup: item["privateEndpointStateForBackup"],
    privateEndpointStateForSiteRecovery: item["privateEndpointStateForSiteRecovery"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : vaultPropertiesEncryptionDeserializer(item["encryption"]),
    moveDetails: !item["moveDetails"]
      ? item["moveDetails"]
      : vaultPropertiesMoveDetailsDeserializer(item["moveDetails"]),
    moveState: item["moveState"],
    backupStorageVersion: item["backupStorageVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    monitoringSettings: !item["monitoringSettings"]
      ? item["monitoringSettings"]
      : monitoringSettingsDeserializer(item["monitoringSettings"]),
    restoreSettings: !item["restoreSettings"]
      ? item["restoreSettings"]
      : restoreSettingsDeserializer(item["restoreSettings"]),
    redundancySettings: !item["redundancySettings"]
      ? item["redundancySettings"]
      : vaultPropertiesRedundancySettingsDeserializer(item["redundancySettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : securitySettingsDeserializer(item["securitySettings"]),
    secureScore: item["secureScore"],
    bcdrSecurityLevel: item["bcdrSecurityLevel"],
    resourceGuardOperationRequests: !item["resourceGuardOperationRequests"]
      ? item["resourceGuardOperationRequests"]
      : item["resourceGuardOperationRequests"].map((p: any) => {
          return p;
        }),
  };
}

/** Details for upgrading vault. */
export interface UpgradeDetails {
  /** ID of the vault upgrade operation. */
  readonly operationId?: string;
  /** UTC time at which the upgrade operation has started. */
  readonly startTimeUtc?: Date;
  /** UTC time at which the upgrade operation status was last updated. */
  readonly lastUpdatedTimeUtc?: Date;
  /** UTC time at which the upgrade operation has ended. */
  readonly endTimeUtc?: Date;
  /** Status of the vault upgrade operation. */
  readonly status?: VaultUpgradeState;
  /** Message to the user containing information about the upgrade operation. */
  readonly message?: string;
  /** The way the vault upgrade was triggered. */
  readonly triggerType?: TriggerType;
  /** Resource ID of the upgraded vault. */
  readonly upgradedResourceId?: string;
  /** Resource ID of the vault before the upgrade. */
  readonly previousResourceId?: string;
}

export function upgradeDetailsSerializer(item: UpgradeDetails): any {
  return item;
}

export function upgradeDetailsDeserializer(item: any): UpgradeDetails {
  return {
    operationId: item["operationId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    message: item["message"],
    triggerType: item["triggerType"],
    upgradedResourceId: item["upgradedResourceId"],
    previousResourceId: item["previousResourceId"],
  };
}

/** Status of the vault upgrade operation. */
export enum KnownVaultUpgradeState {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** Upgraded */
  Upgraded = "Upgraded",
  /** Failed */
  Failed = "Failed",
}

/**
 * Status of the vault upgrade operation. \
 * {@link KnownVaultUpgradeState} can be used interchangeably with VaultUpgradeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Upgraded** \
 * **Failed**
 */
export type VaultUpgradeState = string;

/** The way the vault upgrade was triggered. */
export enum KnownTriggerType {
  /** UserTriggered */
  UserTriggered = "UserTriggered",
  /** ForcedUpgrade */
  ForcedUpgrade = "ForcedUpgrade",
}

/**
 * The way the vault upgrade was triggered. \
 * {@link KnownTriggerType} can be used interchangeably with TriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserTriggered** \
 * **ForcedUpgrade**
 */
export type TriggerType = string;

export function privateEndpointConnectionVaultPropertiesArrayDeserializer(
  result: Array<PrivateEndpointConnectionVaultProperties>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionVaultPropertiesDeserializer(item);
  });
}

/** Information to be stored in Vault properties as an element of privateEndpointConnections List. */
export interface PrivateEndpointConnectionVaultProperties {
  /** Format of id subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.[Service]/{resource}/{resourceName}/privateEndpointConnections/{connectionName}. */
  readonly id?: string;
  /** Private Endpoint Connection Response Properties. */
  readonly properties?: PrivateEndpointConnection;
  /** The name of the private Endpoint Connection */
  readonly name?: string;
  /** The type, which will be of the format, Microsoft.RecoveryServices/vaults/privateEndpointConnections */
  readonly type?: string;
  /** The location of the private Endpoint connection */
  readonly location?: string;
}

export function privateEndpointConnectionVaultPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionVaultProperties {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionDeserializer(item["properties"]),
    name: item["name"],
    type: item["type"],
    location: item["location"],
  };
}

/** Private Endpoint Connection Response Properties. */
export interface PrivateEndpointConnection {
  /** Gets or sets provisioning state of the private endpoint connection. */
  readonly provisioningState?: ProvisioningState;
  /** The Private Endpoint network resource that is linked to the Private Endpoint connection. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** Gets or sets private link service connection state. */
  readonly privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** Group Ids for the Private Endpoint */
  groupIds?: VaultSubResourceType[];
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Gets or sets provisioning state of the private endpoint connection. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Pending */
  Pending = "Pending",
}

/**
 * Gets or sets provisioning state of the private endpoint connection. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Deleting** \
 * **Failed** \
 * **Pending**
 */
export type ProvisioningState = string;

/** The Private Endpoint network resource that is linked to the Private Endpoint connection. */
export interface PrivateEndpoint {
  /** Gets or sets id. */
  readonly id?: string;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** Gets or sets private link service connection state. */
export interface PrivateLinkServiceConnectionState {
  /** Gets or sets the status. */
  readonly status?: PrivateEndpointConnectionStatus;
  /** Gets or sets description. */
  readonly description?: string;
  /** Gets or sets actions required. */
  readonly actionsRequired?: string;
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

/** Gets or sets the status. */
export enum KnownPrivateEndpointConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Gets or sets the status. \
 * {@link KnownPrivateEndpointConnectionStatus} can be used interchangeably with PrivateEndpointConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateEndpointConnectionStatus = string;

/** Subresource type for vault AzureBackup, AzureBackup_secondary or AzureSiteRecovery */
export enum KnownVaultSubResourceType {
  /** AzureBackup */
  AzureBackup = "AzureBackup",
  /** AzureBackup_secondary */
  AzureBackupSecondary = "AzureBackup_secondary",
  /** AzureSiteRecovery */
  AzureSiteRecovery = "AzureSiteRecovery",
}

/**
 * Subresource type for vault AzureBackup, AzureBackup_secondary or AzureSiteRecovery \
 * {@link KnownVaultSubResourceType} can be used interchangeably with VaultSubResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBackup** \
 * **AzureBackup_secondary** \
 * **AzureSiteRecovery**
 */
export type VaultSubResourceType = string;

/** Private endpoint state for backup. */
export enum KnownVaultPrivateEndpointState {
  /** None */
  None = "None",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Private endpoint state for backup. \
 * {@link KnownVaultPrivateEndpointState} can be used interchangeably with VaultPrivateEndpointState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Enabled**
 */
export type VaultPrivateEndpointState = string;

/** Customer Managed Key details of the resource. */
export interface VaultPropertiesEncryption {
  /** The properties of the Key Vault which hosts CMK */
  keyVaultProperties?: CmkKeyVaultProperties;
  /** The details of the identity used for CMK */
  kekIdentity?: CmkKekIdentity;
  /** Enabling/Disabling the Double Encryption state */
  infrastructureEncryption?: InfrastructureEncryptionState;
}

export function vaultPropertiesEncryptionSerializer(item: VaultPropertiesEncryption): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : cmkKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    kekIdentity: !item["kekIdentity"]
      ? item["kekIdentity"]
      : cmkKekIdentitySerializer(item["kekIdentity"]),
    infrastructureEncryption: item["infrastructureEncryption"],
  };
}

export function vaultPropertiesEncryptionDeserializer(item: any): VaultPropertiesEncryption {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : cmkKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    kekIdentity: !item["kekIdentity"]
      ? item["kekIdentity"]
      : cmkKekIdentityDeserializer(item["kekIdentity"]),
    infrastructureEncryption: item["infrastructureEncryption"],
  };
}

/** The properties of the Key Vault which hosts CMK */
export interface CmkKeyVaultProperties {
  /** The key uri of the Customer Managed Key */
  keyUri?: string;
}

export function cmkKeyVaultPropertiesSerializer(item: CmkKeyVaultProperties): any {
  return { keyUri: item["keyUri"] };
}

export function cmkKeyVaultPropertiesDeserializer(item: any): CmkKeyVaultProperties {
  return {
    keyUri: item["keyUri"],
  };
}

/** The details of the identity used for CMK */
export interface CmkKekIdentity {
  /** Indicate that system assigned identity should be used. Mutually exclusive with 'userAssignedIdentity' field */
  useSystemAssignedIdentity?: boolean;
  /** The user assigned identity to be used to grant permissions in case the type of identity used is UserAssigned */
  userAssignedIdentity?: string;
}

export function cmkKekIdentitySerializer(item: CmkKekIdentity): any {
  return {
    useSystemAssignedIdentity: item["useSystemAssignedIdentity"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

export function cmkKekIdentityDeserializer(item: any): CmkKekIdentity {
  return {
    useSystemAssignedIdentity: item["useSystemAssignedIdentity"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Enabling/Disabling the Double Encryption state */
export enum KnownInfrastructureEncryptionState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enabling/Disabling the Double Encryption state \
 * {@link KnownInfrastructureEncryptionState} can be used interchangeably with InfrastructureEncryptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type InfrastructureEncryptionState = string;

/** The details of the latest move operation performed on the Azure Resource */
export interface VaultPropertiesMoveDetails {
  /** OperationId of the Resource Move Operation */
  readonly operationId?: string;
  /** Start Time of the Resource Move Operation */
  readonly startTimeUtc?: Date;
  /** End Time of the Resource Move Operation */
  readonly completionTimeUtc?: Date;
  /** Source Resource of the Resource Move Operation */
  readonly sourceResourceId?: string;
  /** Target Resource of the Resource Move Operation */
  readonly targetResourceId?: string;
}

export function vaultPropertiesMoveDetailsSerializer(item: VaultPropertiesMoveDetails): any {
  return item;
}

export function vaultPropertiesMoveDetailsDeserializer(item: any): VaultPropertiesMoveDetails {
  return {
    operationId: item["operationId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    completionTimeUtc: !item["completionTimeUtc"]
      ? item["completionTimeUtc"]
      : new Date(item["completionTimeUtc"]),
    sourceResourceId: item["sourceResourceId"],
    targetResourceId: item["targetResourceId"],
  };
}

/** The State of the Resource after the move operation */
export enum KnownResourceMoveState {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** PrepareFailed */
  PrepareFailed = "PrepareFailed",
  /** CommitFailed */
  CommitFailed = "CommitFailed",
  /** PrepareTimedout */
  PrepareTimedout = "PrepareTimedout",
  /** CommitTimedout */
  CommitTimedout = "CommitTimedout",
  /** MoveSucceeded */
  MoveSucceeded = "MoveSucceeded",
  /** Failure */
  Failure = "Failure",
  /** CriticalFailure */
  CriticalFailure = "CriticalFailure",
  /** PartialSuccess */
  PartialSuccess = "PartialSuccess",
}

/**
 * The State of the Resource after the move operation \
 * {@link KnownResourceMoveState} can be used interchangeably with ResourceMoveState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **PrepareFailed** \
 * **CommitFailed** \
 * **PrepareTimedout** \
 * **CommitTimedout** \
 * **MoveSucceeded** \
 * **Failure** \
 * **CriticalFailure** \
 * **PartialSuccess**
 */
export type ResourceMoveState = string;

/** Backup storage version */
export enum KnownBackupStorageVersion {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
  /** Unassigned */
  Unassigned = "Unassigned",
}

/**
 * Backup storage version \
 * {@link KnownBackupStorageVersion} can be used interchangeably with BackupStorageVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2** \
 * **Unassigned**
 */
export type BackupStorageVersion = string;

/** property to enable or disable resource provider inbound network traffic from public clients */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * property to enable or disable resource provider inbound network traffic from public clients \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Monitoring Settings of the vault */
export interface MonitoringSettings {
  /** Settings for Azure Monitor based alerts */
  azureMonitorAlertSettings?: AzureMonitorAlertSettings;
  /** Settings for classic alerts */
  classicAlertSettings?: ClassicAlertSettings;
}

export function monitoringSettingsSerializer(item: MonitoringSettings): any {
  return {
    azureMonitorAlertSettings: !item["azureMonitorAlertSettings"]
      ? item["azureMonitorAlertSettings"]
      : azureMonitorAlertSettingsSerializer(item["azureMonitorAlertSettings"]),
    classicAlertSettings: !item["classicAlertSettings"]
      ? item["classicAlertSettings"]
      : classicAlertSettingsSerializer(item["classicAlertSettings"]),
  };
}

export function monitoringSettingsDeserializer(item: any): MonitoringSettings {
  return {
    azureMonitorAlertSettings: !item["azureMonitorAlertSettings"]
      ? item["azureMonitorAlertSettings"]
      : azureMonitorAlertSettingsDeserializer(item["azureMonitorAlertSettings"]),
    classicAlertSettings: !item["classicAlertSettings"]
      ? item["classicAlertSettings"]
      : classicAlertSettingsDeserializer(item["classicAlertSettings"]),
  };
}

/** Settings for Azure Monitor based alerts */
export interface AzureMonitorAlertSettings {
  alertsForAllJobFailures?: AlertsState;
  alertsForAllReplicationIssues?: AlertsState;
  alertsForAllFailoverIssues?: AlertsState;
}

export function azureMonitorAlertSettingsSerializer(item: AzureMonitorAlertSettings): any {
  return {
    alertsForAllJobFailures: item["alertsForAllJobFailures"],
    alertsForAllReplicationIssues: item["alertsForAllReplicationIssues"],
    alertsForAllFailoverIssues: item["alertsForAllFailoverIssues"],
  };
}

export function azureMonitorAlertSettingsDeserializer(item: any): AzureMonitorAlertSettings {
  return {
    alertsForAllJobFailures: item["alertsForAllJobFailures"],
    alertsForAllReplicationIssues: item["alertsForAllReplicationIssues"],
    alertsForAllFailoverIssues: item["alertsForAllFailoverIssues"],
  };
}

/** Known values of {@link AlertsState} that the service accepts. */
export enum KnownAlertsState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of AlertsState */
export type AlertsState = string;

/** Settings for classic alerts */
export interface ClassicAlertSettings {
  alertsForCriticalOperations?: AlertsState;
  emailNotificationsForSiteRecovery?: AlertsState;
}

export function classicAlertSettingsSerializer(item: ClassicAlertSettings): any {
  return {
    alertsForCriticalOperations: item["alertsForCriticalOperations"],
    emailNotificationsForSiteRecovery: item["emailNotificationsForSiteRecovery"],
  };
}

export function classicAlertSettingsDeserializer(item: any): ClassicAlertSettings {
  return {
    alertsForCriticalOperations: item["alertsForCriticalOperations"],
    emailNotificationsForSiteRecovery: item["emailNotificationsForSiteRecovery"],
  };
}

/** Restore Settings  of the vault */
export interface RestoreSettings {
  /** Settings for CrossSubscriptionRestore */
  crossSubscriptionRestoreSettings?: CrossSubscriptionRestoreSettings;
}

export function restoreSettingsSerializer(item: RestoreSettings): any {
  return {
    crossSubscriptionRestoreSettings: !item["crossSubscriptionRestoreSettings"]
      ? item["crossSubscriptionRestoreSettings"]
      : crossSubscriptionRestoreSettingsSerializer(item["crossSubscriptionRestoreSettings"]),
  };
}

export function restoreSettingsDeserializer(item: any): RestoreSettings {
  return {
    crossSubscriptionRestoreSettings: !item["crossSubscriptionRestoreSettings"]
      ? item["crossSubscriptionRestoreSettings"]
      : crossSubscriptionRestoreSettingsDeserializer(item["crossSubscriptionRestoreSettings"]),
  };
}

/** Settings for Cross Subscription Restore Settings */
export interface CrossSubscriptionRestoreSettings {
  crossSubscriptionRestoreState?: CrossSubscriptionRestoreState;
}

export function crossSubscriptionRestoreSettingsSerializer(
  item: CrossSubscriptionRestoreSettings,
): any {
  return {
    crossSubscriptionRestoreState: item["crossSubscriptionRestoreState"],
  };
}

export function crossSubscriptionRestoreSettingsDeserializer(
  item: any,
): CrossSubscriptionRestoreSettings {
  return {
    crossSubscriptionRestoreState: item["crossSubscriptionRestoreState"],
  };
}

/** Known values of {@link CrossSubscriptionRestoreState} that the service accepts. */
export enum KnownCrossSubscriptionRestoreState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** PermanentlyDisabled */
  PermanentlyDisabled = "PermanentlyDisabled",
}

/** Type of CrossSubscriptionRestoreState */
export type CrossSubscriptionRestoreState = string;

/** The redundancy Settings of a Vault */
export interface VaultPropertiesRedundancySettings {
  /** The storage redundancy setting of a vault */
  standardTierStorageRedundancy?: StandardTierStorageRedundancy;
  /** Flag to show if Cross Region Restore is enabled on the Vault or not */
  crossRegionRestore?: CrossRegionRestore;
}

export function vaultPropertiesRedundancySettingsSerializer(
  item: VaultPropertiesRedundancySettings,
): any {
  return {
    standardTierStorageRedundancy: item["standardTierStorageRedundancy"],
    crossRegionRestore: item["crossRegionRestore"],
  };
}

export function vaultPropertiesRedundancySettingsDeserializer(
  item: any,
): VaultPropertiesRedundancySettings {
  return {
    standardTierStorageRedundancy: item["standardTierStorageRedundancy"],
    crossRegionRestore: item["crossRegionRestore"],
  };
}

/** The storage redundancy setting of a vault */
export enum KnownStandardTierStorageRedundancy {
  /** Invalid */
  Invalid = "Invalid",
  /** LocallyRedundant */
  LocallyRedundant = "LocallyRedundant",
  /** GeoRedundant */
  GeoRedundant = "GeoRedundant",
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
}

/**
 * The storage redundancy setting of a vault \
 * {@link KnownStandardTierStorageRedundancy} can be used interchangeably with StandardTierStorageRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **LocallyRedundant** \
 * **GeoRedundant** \
 * **ZoneRedundant**
 */
export type StandardTierStorageRedundancy = string;

/** Flag to show if Cross Region Restore is enabled on the Vault or not */
export enum KnownCrossRegionRestore {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Flag to show if Cross Region Restore is enabled on the Vault or not \
 * {@link KnownCrossRegionRestore} can be used interchangeably with CrossRegionRestore,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type CrossRegionRestore = string;

/** Security Settings of the vault */
export interface SecuritySettings {
  /** Immutability Settings of a vault */
  immutabilitySettings?: ImmutabilitySettings;
  /** Soft delete Settings of a vault */
  softDeleteSettings?: SoftDeleteSettings;
  /** MUA Settings of a vault */
  readonly multiUserAuthorization?: MultiUserAuthorization;
  /** Source scan configuration of vault */
  sourceScanConfiguration?: SourceScanConfiguration;
}

export function securitySettingsSerializer(item: SecuritySettings): any {
  return {
    immutabilitySettings: !item["immutabilitySettings"]
      ? item["immutabilitySettings"]
      : immutabilitySettingsSerializer(item["immutabilitySettings"]),
    softDeleteSettings: !item["softDeleteSettings"]
      ? item["softDeleteSettings"]
      : softDeleteSettingsSerializer(item["softDeleteSettings"]),
    sourceScanConfiguration: !item["sourceScanConfiguration"]
      ? item["sourceScanConfiguration"]
      : sourceScanConfigurationSerializer(item["sourceScanConfiguration"]),
  };
}

export function securitySettingsDeserializer(item: any): SecuritySettings {
  return {
    immutabilitySettings: !item["immutabilitySettings"]
      ? item["immutabilitySettings"]
      : immutabilitySettingsDeserializer(item["immutabilitySettings"]),
    softDeleteSettings: !item["softDeleteSettings"]
      ? item["softDeleteSettings"]
      : softDeleteSettingsDeserializer(item["softDeleteSettings"]),
    multiUserAuthorization: item["multiUserAuthorization"],
    sourceScanConfiguration: !item["sourceScanConfiguration"]
      ? item["sourceScanConfiguration"]
      : sourceScanConfigurationDeserializer(item["sourceScanConfiguration"]),
  };
}

/** Immutability Settings of vault */
export interface ImmutabilitySettings {
  state?: ImmutabilityState;
}

export function immutabilitySettingsSerializer(item: ImmutabilitySettings): any {
  return { state: item["state"] };
}

export function immutabilitySettingsDeserializer(item: any): ImmutabilitySettings {
  return {
    state: item["state"],
  };
}

/** Known values of {@link ImmutabilityState} that the service accepts. */
export enum KnownImmutabilityState {
  /** Disabled */
  Disabled = "Disabled",
  /** Unlocked */
  Unlocked = "Unlocked",
  /** Locked */
  Locked = "Locked",
}

/** Type of ImmutabilityState */
export type ImmutabilityState = string;

/** Soft delete Settings of vault */
export interface SoftDeleteSettings {
  softDeleteState?: SoftDeleteState;
  /** Soft delete retention period in days */
  softDeleteRetentionPeriodInDays?: number;
  enhancedSecurityState?: EnhancedSecurityState;
}

export function softDeleteSettingsSerializer(item: SoftDeleteSettings): any {
  return {
    softDeleteState: item["softDeleteState"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    enhancedSecurityState: item["enhancedSecurityState"],
  };
}

export function softDeleteSettingsDeserializer(item: any): SoftDeleteSettings {
  return {
    softDeleteState: item["softDeleteState"],
    softDeleteRetentionPeriodInDays: item["softDeleteRetentionPeriodInDays"],
    enhancedSecurityState: item["enhancedSecurityState"],
  };
}

/** Known values of {@link SoftDeleteState} that the service accepts. */
export enum KnownSoftDeleteState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** AlwaysON */
  AlwaysON = "AlwaysON",
}

/** Type of SoftDeleteState */
export type SoftDeleteState = string;

/** Known values of {@link EnhancedSecurityState} that the service accepts. */
export enum KnownEnhancedSecurityState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** AlwaysON */
  AlwaysON = "AlwaysON",
}

/** Type of EnhancedSecurityState */
export type EnhancedSecurityState = string;

/** MUA Settings of vault */
export enum KnownMultiUserAuthorization {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * MUA Settings of vault \
 * {@link KnownMultiUserAuthorization} can be used interchangeably with MultiUserAuthorization,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled**
 */
export type MultiUserAuthorization = string;

/** Source scan configuration of vault */
export interface SourceScanConfiguration {
  state?: State;
  /** Identity details to be used for an operation */
  sourceScanIdentity?: AssociatedIdentity;
}

export function sourceScanConfigurationSerializer(item: SourceScanConfiguration): any {
  return {
    state: item["state"],
    sourceScanIdentity: !item["sourceScanIdentity"]
      ? item["sourceScanIdentity"]
      : associatedIdentitySerializer(item["sourceScanIdentity"]),
  };
}

export function sourceScanConfigurationDeserializer(item: any): SourceScanConfiguration {
  return {
    state: item["state"],
    sourceScanIdentity: !item["sourceScanIdentity"]
      ? item["sourceScanIdentity"]
      : associatedIdentityDeserializer(item["sourceScanIdentity"]),
  };
}

/** Known values of {@link State} that the service accepts. */
export enum KnownState {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of State */
export type State = string;

/** Identity details to be used for an operation */
export interface AssociatedIdentity {
  /** Identity type that should be used for an operation. */
  operationIdentityType?: IdentityType;
  /** User assigned identity to be used for an operation if operationIdentityType is UserAssigned. */
  userAssignedIdentity?: string;
}

export function associatedIdentitySerializer(item: AssociatedIdentity): any {
  return {
    operationIdentityType: item["operationIdentityType"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

export function associatedIdentityDeserializer(item: any): AssociatedIdentity {
  return {
    operationIdentityType: item["operationIdentityType"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Identity type that should be used for an operation. */
export enum KnownIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Identity type that should be used for an operation. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned**
 */
export type IdentityType = string;

/** Secure Score of Recovery Services Vault */
export enum KnownSecureScoreLevel {
  /** None */
  None = "None",
  /** Minimum */
  Minimum = "Minimum",
  /** Adequate */
  Adequate = "Adequate",
  /** Maximum */
  Maximum = "Maximum",
}

/**
 * Secure Score of Recovery Services Vault \
 * {@link KnownSecureScoreLevel} can be used interchangeably with SecureScoreLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Minimum** \
 * **Adequate** \
 * **Maximum**
 */
export type SecureScoreLevel = string;

/** Security levels of Recovery Services Vault for business continuity and disaster recovery */
export enum KnownBcdrSecurityLevel {
  /** Poor */
  Poor = "Poor",
  /** Fair */
  Fair = "Fair",
  /** Good */
  Good = "Good",
  /** Excellent */
  Excellent = "Excellent",
}

/**
 * Security levels of Recovery Services Vault for business continuity and disaster recovery \
 * {@link KnownBcdrSecurityLevel} can be used interchangeably with BcdrSecurityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Poor** \
 * **Fair** \
 * **Good** \
 * **Excellent**
 */
export type BcdrSecurityLevel = string;

/** Identity for the resource. */
export interface IdentityData {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. */
  type: ResourceIdentityType;
  /** The list of user-assigned identities associated with the resource. The user-assigned identity dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserIdentity>;
}

export function identityDataSerializer(item: IdentityData): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDataDeserializer(item: any): IdentityData {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. */
export enum KnownResourceIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** None */
  None = "None",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * The type of managed identity used. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user-assigned identities. The type 'None' will remove any identities. \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **None** \
 * **UserAssigned** \
 * **SystemAssigned, UserAssigned**
 */
export type ResourceIdentityType = string;

export function userIdentityRecordSerializer(
  item: Record<string, UserIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentitySerializer(item[key]);
  });
  return result;
}

export function userIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityDeserializer(item[key]);
  });
  return result;
}

/** A resource identity that is managed by the user of the service. */
export interface UserIdentity {
  /** The principal ID of the user-assigned identity. */
  readonly principalId?: string;
  /** The client ID of the user-assigned identity. */
  readonly clientId?: string;
}

export function userIdentitySerializer(item: UserIdentity): any {
  return item;
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Identifies the unique system identifier for each Azure resource. */
export interface Sku {
  /** Name of SKU is RS0 (Recovery Services 0th version) and the tier is standard tier. They do not have affect on backend storage redundancy or any other vault settings. To manage storage redundancy, use the backupstorageconfig */
  name: SkuName;
  /** The Sku tier. */
  tier?: string;
  /** The sku family */
  family?: string;
  /** The sku size */
  size?: string;
  /** The sku capacity */
  capacity?: string;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    family: item["family"],
    size: item["size"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    family: item["family"],
    size: item["size"],
    capacity: item["capacity"],
  };
}

/** Name of SKU is RS0 (Recovery Services 0th version) and the tier is standard tier. They do not have affect on backend storage redundancy or any other vault settings. To manage storage redundancy, use the backupstorageconfig */
export enum KnownSkuName {
  /** Standard */
  Standard = "Standard",
  /** RS0 */
  RS0 = "RS0",
}

/**
 * Name of SKU is RS0 (Recovery Services 0th version) and the tier is standard tier. They do not have affect on backend storage redundancy or any other vault settings. To manage storage redundancy, use the backupstorageconfig \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **RS0**
 */
export type SkuName = string;

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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Paged collection of ClientDiscoveryValueForSingleApi items */
export interface _ClientDiscoveryResponse {
  /** The ClientDiscoveryValueForSingleApi items on this page */
  value: ClientDiscoveryValueForSingleApi[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clientDiscoveryResponseDeserializer(item: any): _ClientDiscoveryResponse {
  return {
    value: clientDiscoveryValueForSingleApiArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientDiscoveryValueForSingleApiArrayDeserializer(
  result: Array<ClientDiscoveryValueForSingleApi>,
): any[] {
  return result.map((item) => {
    return clientDiscoveryValueForSingleApiDeserializer(item);
  });
}

/** Available operation details. */
export interface ClientDiscoveryValueForSingleApi {
  /** Name of the Operation. */
  name?: string;
  /** Contains the localized display information for this particular operation */
  display?: ClientDiscoveryDisplay;
  /** The intended executor of the operation;governs the display of the operation in the RBAC UX and the audit logs UX */
  origin?: string;
  /** ShoeBox properties for the given operation. */
  properties?: ClientDiscoveryForProperties;
}

export function clientDiscoveryValueForSingleApiDeserializer(
  item: any,
): ClientDiscoveryValueForSingleApi {
  return {
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : clientDiscoveryDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : clientDiscoveryForPropertiesDeserializer(item["properties"]),
  };
}

/** Localized display information of an operation. */
export interface ClientDiscoveryDisplay {
  /** Name of the provider for display purposes */
  provider?: string;
  /** ResourceType for which this Operation can be performed. */
  resource?: string;
  /** Operations Name itself. */
  operation?: string;
  /** Description of the operation having details of what operation is about. */
  description?: string;
}

export function clientDiscoveryDisplayDeserializer(item: any): ClientDiscoveryDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Class to represent shoebox properties in json client discovery. */
export interface ClientDiscoveryForProperties {
  /** Operation properties. */
  serviceSpecification?: ClientDiscoveryForServiceSpecification;
}

export function clientDiscoveryForPropertiesDeserializer(item: any): ClientDiscoveryForProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : clientDiscoveryForServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Class to represent shoebox service specification in json client discovery. */
export interface ClientDiscoveryForServiceSpecification {
  /** List of log specifications of this operation. */
  logSpecifications?: ClientDiscoveryForLogSpecification[];
}

export function clientDiscoveryForServiceSpecificationDeserializer(
  item: any,
): ClientDiscoveryForServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : clientDiscoveryForLogSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function clientDiscoveryForLogSpecificationArrayDeserializer(
  result: Array<ClientDiscoveryForLogSpecification>,
): any[] {
  return result.map((item) => {
    return clientDiscoveryForLogSpecificationDeserializer(item);
  });
}

/** Class to represent shoebox log specification in json client discovery. */
export interface ClientDiscoveryForLogSpecification {
  /** Name of the log. */
  name?: string;
  /** Localized display name */
  displayName?: string;
  /** Blobs created in customer storage account per hour */
  blobDuration?: string;
}

export function clientDiscoveryForLogSpecificationDeserializer(
  item: any,
): ClientDiscoveryForLogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
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

/** Patch Resource information, as returned by the resource provider. */
export interface PatchVault extends PatchTrackedResource {
  /** Properties of the vault. */
  properties?: VaultProperties;
  /** Identifies the unique system identifier for each Azure resource. */
  sku?: Sku;
  /** Identity for the resource. */
  identity?: IdentityData;
}

export function patchVaultSerializer(item: PatchVault): any {
  return {
    location: item["location"],
    tags: item["tags"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : vaultPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDataSerializer(item["identity"]),
  };
}

/** Tracked resource with location. */
export interface PatchTrackedResource extends Resource {
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Optional ETag. */
  etag?: string;
}

export function patchTrackedResourceSerializer(item: PatchTrackedResource): any {
  return { location: item["location"], tags: item["tags"], etag: item["etag"] };
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

/** The response model for a list of Vaults. */
export interface _VaultList {
  /** The Vault items on this page */
  value: Vault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vaultListDeserializer(item: any): _VaultList {
  return {
    value: vaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vaultArraySerializer(result: Array<Vault>): any[] {
  return result.map((item) => {
    return vaultSerializer(item);
  });
}

export function vaultArrayDeserializer(result: Array<Vault>): any[] {
  return result.map((item) => {
    return vaultDeserializer(item);
  });
}

/** The response model for a list of DeletedVaults. */
export interface _DeletedVaultList {
  /** The DeletedVault items on this page */
  value: DeletedVault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedVaultListDeserializer(item: any): _DeletedVaultList {
  return {
    value: deletedVaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedVaultArrayDeserializer(result: Array<DeletedVault>): any[] {
  return result.map((item) => {
    return deletedVaultDeserializer(item);
  });
}

/** DeletedVault information as returned by the resource provider. */
export interface DeletedVault extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeletedVaultProperties;
}

export function deletedVaultDeserializer(item: any): DeletedVault {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deletedVaultPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the DeletedVault. */
export interface DeletedVaultProperties {
  /** ARM Id of the Vault which was deleted. */
  readonly vaultId?: string;
  /** Time in UTC at which the Vault was deleted. */
  readonly vaultDeletionTime?: Date;
  /** Time in UTC at which the DeletedVault will be purged. */
  readonly purgeAt?: Date;
}

export function deletedVaultPropertiesDeserializer(item: any): DeletedVaultProperties {
  return {
    vaultId: item["vaultId"],
    vaultDeletionTime: !item["vaultDeletionTime"]
      ? item["vaultDeletionTime"]
      : new Date(item["vaultDeletionTime"]),
    purgeAt: !item["purgeAt"] ? item["purgeAt"] : new Date(item["purgeAt"]),
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

/** Input definition for DeletedVault undelete. */
export interface DeletedVaultUndeleteInput {
  /** Undelete input properties. */
  properties: DeletedVaultUndeleteInputProperties;
}

export function deletedVaultUndeleteInputSerializer(item: DeletedVaultUndeleteInput): any {
  return {
    properties: deletedVaultUndeleteInputPropertiesSerializer(item["properties"]),
  };
}

/** Input definition for DeletedVault undelete properties. */
export interface DeletedVaultUndeleteInputProperties {
  /** Recovery resource group Id. */
  recoveryResourceGroupId: string;
}

export function deletedVaultUndeleteInputPropertiesSerializer(
  item: DeletedVaultUndeleteInputProperties,
): any {
  return { recoveryResourceGroupId: item["recoveryResourceGroupId"] };
}

/** Information of the private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** Resource properties */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the private link resource. */
export interface PrivateLinkResourceProperties {
  /** e.g. f9ad6492-33d4-4690-9999-6bfd52a0d081 (Backup) or f9ad6492-33d4-4690-9999-6bfd52a0d082 (SiteRecovery) */
  readonly groupId?: string;
  /** [backup-ecs1, backup-prot1, backup-prot1b, backup-prot1c, backup-id1] */
  readonly requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  readonly requiredZoneNames?: string[];
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

/** Class which represent the stamps associated with the vault. */
export interface _PrivateLinkResources {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourcesDeserializer(item: any): _PrivateLinkResources {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Details of the certificate to be uploaded to the vault. */
export interface CertificateRequest {
  /** Raw certificate data. */
  properties?: RawCertificateData;
}

export function certificateRequestSerializer(item: CertificateRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : rawCertificateDataSerializer(item["properties"]),
  };
}

/** Raw certificate data. */
export interface RawCertificateData {
  /** Specifies the authentication type. */
  authType?: AuthType;
  /** The base64 encoded certificate raw data string */
  certificate?: Uint8Array;
}

export function rawCertificateDataSerializer(item: RawCertificateData): any {
  return {
    authType: item["authType"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : uint8ArrayToString(item["certificate"], "base64"),
  };
}

/** Specifies the authentication type. */
export enum KnownAuthType {
  /** Invalid */
  Invalid = "Invalid",
  /** ACS */
  ACS = "ACS",
  /** AAD */
  AAD = "AAD",
  /** AccessControlService */
  AccessControlService = "AccessControlService",
  /** AzureActiveDirectory */
  AzureActiveDirectory = "AzureActiveDirectory",
}

/**
 * Specifies the authentication type. \
 * {@link KnownAuthType} can be used interchangeably with AuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **ACS** \
 * **AAD** \
 * **AccessControlService** \
 * **AzureActiveDirectory**
 */
export type AuthType = string;

/** Certificate corresponding to a vault that can be used by clients to register themselves with the vault. */
export interface VaultCertificateResponse {
  /** Resource name associated with the resource. */
  readonly name?: string;
  /** Resource type represents the complete path of the form Namespace/ResourceType/ResourceType/... */
  readonly type?: string;
  /** Resource Id represents the complete path to the resource. */
  readonly id?: string;
  /** Certificate details representing the Vault credentials. */
  properties?: ResourceCertificateDetailsUnion;
}

export function vaultCertificateResponseDeserializer(item: any): VaultCertificateResponse {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : resourceCertificateDetailsUnionDeserializer(item["properties"]),
  };
}

/** Certificate details representing the Vault credentials. */
export interface ResourceCertificateDetails {
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  /** The discriminator possible values: AzureActiveDirectory, AccessControlService */
  authType: string;
  /** The base64 encoded certificate raw data string. */
  certificate?: Uint8Array;
  /** Certificate friendly name. */
  friendlyName?: string;
  /** Certificate issuer. */
  issuer?: string;
  /** Resource ID of the vault. */
  resourceId?: number;
  /** Certificate Subject Name. */
  subject?: string;
  /** Certificate thumbprint. */
  thumbprint?: string;
  /** Certificate Validity start Date time. */
  validFrom?: Date;
  /** Certificate Validity End Date time. */
  validTo?: Date;
}

export function resourceCertificateDetailsDeserializer(item: any): ResourceCertificateDetails {
  return {
    authType: item["authType"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : typeof item["certificate"] === "string"
        ? stringToUint8Array(item["certificate"], "base64")
        : item["certificate"],
    friendlyName: item["friendlyName"],
    issuer: item["issuer"],
    resourceId: item["resourceId"],
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    validFrom: !item["validFrom"] ? item["validFrom"] : new Date(item["validFrom"]),
    validTo: !item["validTo"] ? item["validTo"] : new Date(item["validTo"]),
  };
}

/** Alias for ResourceCertificateDetailsUnion */
export type ResourceCertificateDetailsUnion =
  | ResourceCertificateAndAadDetails
  | ResourceCertificateAndAcsDetails
  | ResourceCertificateDetails;

export function resourceCertificateDetailsUnionDeserializer(
  item: any,
): ResourceCertificateDetailsUnion {
  switch (item.authType) {
    case "AzureActiveDirectory":
      return resourceCertificateAndAadDetailsDeserializer(item as ResourceCertificateAndAadDetails);

    case "AccessControlService":
      return resourceCertificateAndAcsDetailsDeserializer(item as ResourceCertificateAndAcsDetails);

    default:
      return resourceCertificateDetailsDeserializer(item);
  }
}

/** Certificate details representing the Vault credentials for AAD. */
export interface ResourceCertificateAndAadDetails extends ResourceCertificateDetails {
  /** AAD tenant authority. */
  aadAuthority: string;
  /** AAD tenant Id. */
  aadTenantId: string;
  /** AAD service principal clientId. */
  servicePrincipalClientId: string;
  /** AAD service principal ObjectId. */
  servicePrincipalObjectId: string;
  /** Azure Management Endpoint Audience. */
  azureManagementEndpointAudience: string;
  /** Service Resource Id. */
  serviceResourceId?: string;
  /** AAD audience for the resource */
  aadAudience?: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  authType: "AzureActiveDirectory";
}

export function resourceCertificateAndAadDetailsDeserializer(
  item: any,
): ResourceCertificateAndAadDetails {
  return {
    authType: item["authType"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : typeof item["certificate"] === "string"
        ? stringToUint8Array(item["certificate"], "base64")
        : item["certificate"],
    friendlyName: item["friendlyName"],
    issuer: item["issuer"],
    resourceId: item["resourceId"],
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    validFrom: !item["validFrom"] ? item["validFrom"] : new Date(item["validFrom"]),
    validTo: !item["validTo"] ? item["validTo"] : new Date(item["validTo"]),
    aadAuthority: item["aadAuthority"],
    aadTenantId: item["aadTenantId"],
    servicePrincipalClientId: item["servicePrincipalClientId"],
    servicePrincipalObjectId: item["servicePrincipalObjectId"],
    azureManagementEndpointAudience: item["azureManagementEndpointAudience"],
    serviceResourceId: item["serviceResourceId"],
    aadAudience: item["aadAudience"],
  };
}

/** Certificate details representing the Vault credentials for ACS. */
export interface ResourceCertificateAndAcsDetails extends ResourceCertificateDetails {
  /** ACS namespace name - tenant for our service. */
  globalAcsNamespace: string;
  /** Acs mgmt host name to connect to. */
  globalAcsHostName: string;
  /** Global ACS namespace RP realm. */
  globalAcsRPRealm: string;
  /** This property will be used as the discriminator for deciding the specific types in the polymorphic chain of types. */
  authType: "AccessControlService";
}

export function resourceCertificateAndAcsDetailsDeserializer(
  item: any,
): ResourceCertificateAndAcsDetails {
  return {
    authType: item["authType"],
    certificate: !item["certificate"]
      ? item["certificate"]
      : typeof item["certificate"] === "string"
        ? stringToUint8Array(item["certificate"], "base64")
        : item["certificate"],
    friendlyName: item["friendlyName"],
    issuer: item["issuer"],
    resourceId: item["resourceId"],
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    validFrom: !item["validFrom"] ? item["validFrom"] : new Date(item["validFrom"]),
    validTo: !item["validTo"] ? item["validTo"] : new Date(item["validTo"]),
    globalAcsNamespace: item["globalAcsNamespace"],
    globalAcsHostName: item["globalAcsHostName"],
    globalAcsRPRealm: item["globalAcsRPRealm"],
  };
}

/** Replication usages for vault. */
export interface _ReplicationUsageList {
  /** The list of replication usages for the given vault. */
  value?: ReplicationUsage[];
  nextLink?: string;
}

export function _replicationUsageListDeserializer(item: any): _ReplicationUsageList {
  return {
    value: !item["value"] ? item["value"] : replicationUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationUsageArrayDeserializer(result: Array<ReplicationUsage>): any[] {
  return result.map((item) => {
    return replicationUsageDeserializer(item);
  });
}

/** Replication usages of a vault. */
export interface ReplicationUsage {
  /** Summary of the replication monitoring data for this vault. */
  monitoringSummary?: MonitoringSummary;
  /** Summary of the replication jobs data for this vault. */
  jobsSummary?: JobsSummary;
  /** Number of replication protected items for this vault. */
  protectedItemCount?: number;
  /** Number of replication recovery plans for this vault. */
  recoveryPlanCount?: number;
  /** Number of servers registered to this vault. */
  registeredServersCount?: number;
  /** The authentication type of recovery service providers in the vault. */
  recoveryServicesProviderAuthType?: number;
}

export function replicationUsageDeserializer(item: any): ReplicationUsage {
  return {
    monitoringSummary: !item["monitoringSummary"]
      ? item["monitoringSummary"]
      : monitoringSummaryDeserializer(item["monitoringSummary"]),
    jobsSummary: !item["jobsSummary"]
      ? item["jobsSummary"]
      : jobsSummaryDeserializer(item["jobsSummary"]),
    protectedItemCount: item["protectedItemCount"],
    recoveryPlanCount: item["recoveryPlanCount"],
    registeredServersCount: item["registeredServersCount"],
    recoveryServicesProviderAuthType: item["recoveryServicesProviderAuthType"],
  };
}

/** Summary of the replication monitoring data for this vault. */
export interface MonitoringSummary {
  /** Count of unhealthy VMs. */
  unHealthyVmCount?: number;
  /** Count of unhealthy replication providers. */
  unHealthyProviderCount?: number;
  /** Count of all critical warnings. */
  eventsCount?: number;
  /** Count of all deprecated recovery service providers. */
  deprecatedProviderCount?: number;
  /** Count of all the supported recovery service providers. */
  supportedProviderCount?: number;
  /** Count of all the unsupported recovery service providers. */
  unsupportedProviderCount?: number;
}

export function monitoringSummaryDeserializer(item: any): MonitoringSummary {
  return {
    unHealthyVmCount: item["unHealthyVmCount"],
    unHealthyProviderCount: item["unHealthyProviderCount"],
    eventsCount: item["eventsCount"],
    deprecatedProviderCount: item["deprecatedProviderCount"],
    supportedProviderCount: item["supportedProviderCount"],
    unsupportedProviderCount: item["unsupportedProviderCount"],
  };
}

/** Summary of the replication job data for this vault. */
export interface JobsSummary {
  /** Count of failed jobs. */
  failedJobs?: number;
  /** Count of suspended jobs. */
  suspendedJobs?: number;
  /** Count of in-progress jobs. */
  inProgressJobs?: number;
}

export function jobsSummaryDeserializer(item: any): JobsSummary {
  return {
    failedJobs: item["failedJobs"],
    suspendedJobs: item["suspendedJobs"],
    inProgressJobs: item["inProgressJobs"],
  };
}

/** Usage for vault. */
export interface _VaultUsageList {
  /** The list of usages for the given vault. */
  value?: VaultUsage[];
  nextLink?: string;
}

export function _vaultUsageListDeserializer(item: any): _VaultUsageList {
  return {
    value: !item["value"] ? item["value"] : vaultUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vaultUsageArrayDeserializer(result: Array<VaultUsage>): any[] {
  return result.map((item) => {
    return vaultUsageDeserializer(item);
  });
}

/** Usages of a vault. */
export interface VaultUsage {
  /** Unit of the usage. */
  unit?: UsagesUnit;
  /** Quota period of usage. */
  quotaPeriod?: string;
  /** Next reset time of usage. */
  nextResetTime?: Date;
  /** Current value of usage. */
  currentValue?: number;
  /** Limit of usage. */
  limit?: number;
  /** Name of usage. */
  name?: NameInfo;
}

export function vaultUsageDeserializer(item: any): VaultUsage {
  return {
    unit: item["unit"],
    quotaPeriod: item["quotaPeriod"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : nameInfoDeserializer(item["name"]),
  };
}

/** Unit of the usage. */
export enum KnownUsagesUnit {
  /** Count */
  Count = "Count",
  /** Bytes */
  Bytes = "Bytes",
  /** Seconds */
  Seconds = "Seconds",
  /** Percent */
  Percent = "Percent",
  /** CountPerSecond */
  CountPerSecond = "CountPerSecond",
  /** BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
}

/**
 * Unit of the usage. \
 * {@link KnownUsagesUnit} can be used interchangeably with UsagesUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count** \
 * **Bytes** \
 * **Seconds** \
 * **Percent** \
 * **CountPerSecond** \
 * **BytesPerSecond**
 */
export type UsagesUnit = string;

/** The name of usage. */
export interface NameInfo {
  /** Value of usage. */
  value?: string;
  /** Localized value of usage. */
  localizedValue?: string;
}

export function nameInfoDeserializer(item: any): NameInfo {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Vault extended information. */
export interface VaultExtendedInfoResource extends ProxyResource {
  /** Vault extended information. */
  properties?: VaultExtendedInfo;
  /** etag for the resource. */
  etag?: string;
}

export function vaultExtendedInfoResourceSerializer(item: VaultExtendedInfoResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : vaultExtendedInfoSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function vaultExtendedInfoResourceDeserializer(item: any): VaultExtendedInfoResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : vaultExtendedInfoDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Vault extended information. */
export interface VaultExtendedInfo {
  /** Integrity key. */
  integrityKey?: string;
  /** Encryption key. */
  encryptionKey?: string;
  /** Encryption key thumbprint. */
  encryptionKeyThumbprint?: string;
  /** Algorithm for Vault ExtendedInfo */
  algorithm?: string;
}

export function vaultExtendedInfoSerializer(item: VaultExtendedInfo): any {
  return {
    integrityKey: item["integrityKey"],
    encryptionKey: item["encryptionKey"],
    encryptionKeyThumbprint: item["encryptionKeyThumbprint"],
    algorithm: item["algorithm"],
  };
}

export function vaultExtendedInfoDeserializer(item: any): VaultExtendedInfo {
  return {
    integrityKey: item["integrityKey"],
    encryptionKey: item["encryptionKey"],
    encryptionKeyThumbprint: item["encryptionKeyThumbprint"],
    algorithm: item["algorithm"],
  };
}

/** Resource Name availability input parameters - Resource type and resource name */
export interface CheckNameAvailabilityParameters {
  /** Describes the Resource type: Microsoft.RecoveryServices/Vaults */
  type?: string;
  /** Resource name for which availability needs to be checked */
  name?: string;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { type: item["type"], name: item["name"] };
}

/** Response for check name availability API. Resource provider will set availability as true | false. */
export interface CheckNameAvailabilityResult {
  nameAvailable?: boolean;
  reason?: string;
  message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Input to get capabilities information for Microsoft.RecoveryServices */
export interface ResourceCapabilities extends ResourceCapabilitiesBase {
  /** Capabilities information */
  properties?: CapabilitiesProperties;
}

export function resourceCapabilitiesSerializer(item: ResourceCapabilities): any {
  return {
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : capabilitiesPropertiesSerializer(item["properties"]),
  };
}

/** Capabilities information */
export interface CapabilitiesProperties {
  dnsZones?: DNSZone[];
}

export function capabilitiesPropertiesSerializer(item: CapabilitiesProperties): any {
  return {
    dnsZones: !item["dnsZones"] ? item["dnsZones"] : dnsZoneArraySerializer(item["dnsZones"]),
  };
}

export function dnsZoneArraySerializer(result: Array<DNSZone>): any[] {
  return result.map((item) => {
    return dnsZoneSerializer(item);
  });
}

export function dnsZoneArrayDeserializer(result: Array<DNSZone>): any[] {
  return result.map((item) => {
    return dnsZoneDeserializer(item);
  });
}

/** DNSZone information */
export interface DNSZone {
  /** Subresource type for vault AzureBackup, AzureBackup_secondary or AzureSiteRecovery */
  subResource?: VaultSubResourceType;
}

export function dnsZoneSerializer(item: DNSZone): any {
  return { subResource: item["subResource"] };
}

export function dnsZoneDeserializer(item: any): DNSZone {
  return {
    subResource: item["subResource"],
  };
}

/** Base class for request and response capabilities information for Microsoft.RecoveryServices */
export interface ResourceCapabilitiesBase {
  /** Describes the Resource type: Microsoft.RecoveryServices/Vaults */
  type: string;
}

export function resourceCapabilitiesBaseSerializer(item: ResourceCapabilitiesBase): any {
  return { type: item["type"] };
}

export function resourceCapabilitiesBaseDeserializer(item: any): ResourceCapabilitiesBase {
  return {
    type: item["type"],
  };
}

/** Capabilities response for Microsoft.RecoveryServices */
export interface CapabilitiesResponse extends ResourceCapabilitiesBase {
  /** Capabilities properties in response */
  properties?: CapabilitiesResponseProperties;
}

export function capabilitiesResponseDeserializer(item: any): CapabilitiesResponse {
  return {
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : capabilitiesResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Capabilities properties in response */
export interface CapabilitiesResponseProperties {
  dnsZones?: DNSZoneResponse[];
}

export function capabilitiesResponsePropertiesDeserializer(
  item: any,
): CapabilitiesResponseProperties {
  return {
    dnsZones: !item["dnsZones"]
      ? item["dnsZones"]
      : dnsZoneResponseArrayDeserializer(item["dnsZones"]),
  };
}

export function dnsZoneResponseArrayDeserializer(result: Array<DNSZoneResponse>): any[] {
  return result.map((item) => {
    return dnsZoneResponseDeserializer(item);
  });
}

/** DNSZone information for Microsoft.RecoveryServices */
export interface DNSZoneResponse extends DNSZone {
  /** The private link resource Private link DNS zone names. */
  requiredZoneNames?: string[];
}

export function dnsZoneResponseDeserializer(item: any): DNSZoneResponse {
  return {
    subResource: item["subResource"],
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-02-01 API version. */
  V20250201 = "2025-02-01",
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
}
