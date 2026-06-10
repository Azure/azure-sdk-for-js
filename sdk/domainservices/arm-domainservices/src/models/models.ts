// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Domain service. */
export interface DomainService extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource etag */
  etag?: string;
  /** Data Model Version */
  readonly version?: number;
  /** Azure Active Directory Tenant Id */
  readonly tenantId?: string;
  /** The name of the Azure domain that the user would like to deploy Domain Services to. */
  domainName?: string;
  /** Deployment Id */
  readonly deploymentId?: string;
  /** SyncOwner ReplicaSet Id */
  readonly syncOwner?: string;
  /** The unique sync application id of the Azure AD Domain Services deployment. */
  readonly syncApplicationId?: string;
  /** List of ReplicaSets */
  replicaSets?: ReplicaSet[];
  /** Secure LDAP Settings */
  ldapsSettings?: LdapsSettings;
  /** Resource Forest Settings */
  resourceForestSettings?: ResourceForestSettings;
  /** DomainSecurity Settings */
  domainSecuritySettings?: DomainSecuritySettings;
  /** Domain Configuration Type */
  domainConfigurationType?: string;
  /** Sku Type */
  sku?: string;
  /** Enabled or Disabled flag to turn on Group-based filtered sync */
  filteredSync?: FilteredSync;
  /** All or CloudOnly, All users in AAD are synced to AAD DS domain or only users actively syncing in the cloud */
  syncScope?: SyncScope;
  /** Notification Settings */
  notificationSettings?: NotificationSettings;
  /** Migration Properties */
  readonly migrationProperties?: MigrationProperties;
  /** the current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Configuration diagnostics data containing latest execution from client. */
  configDiagnostics?: ConfigDiagnostics;
}

export function domainServiceSerializer(item: DomainService): any {
  return {
    properties: areAllPropsUndefined(item, [
      "domainName",
      "replicaSets",
      "ldapsSettings",
      "resourceForestSettings",
      "domainSecuritySettings",
      "domainConfigurationType",
      "sku",
      "filteredSync",
      "syncScope",
      "notificationSettings",
      "configDiagnostics",
    ])
      ? undefined
      : _domainServicePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
  };
}

export function domainServiceDeserializer(item: any): DomainService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _domainServicePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
  };
}

/** Properties of the Domain Service. */
export interface DomainServiceProperties {
  /** Data Model Version */
  readonly version?: number;
  /** Azure Active Directory Tenant Id */
  readonly tenantId?: string;
  /** The name of the Azure domain that the user would like to deploy Domain Services to. */
  domainName?: string;
  /** Deployment Id */
  readonly deploymentId?: string;
  /** SyncOwner ReplicaSet Id */
  readonly syncOwner?: string;
  /** The unique sync application id of the Azure AD Domain Services deployment. */
  readonly syncApplicationId?: string;
  /** List of ReplicaSets */
  replicaSets?: ReplicaSet[];
  /** Secure LDAP Settings */
  ldapsSettings?: LdapsSettings;
  /** Resource Forest Settings */
  resourceForestSettings?: ResourceForestSettings;
  /** DomainSecurity Settings */
  domainSecuritySettings?: DomainSecuritySettings;
  /** Domain Configuration Type */
  domainConfigurationType?: string;
  /** Sku Type */
  sku?: string;
  /** Enabled or Disabled flag to turn on Group-based filtered sync */
  filteredSync?: FilteredSync;
  /** All or CloudOnly, All users in AAD are synced to AAD DS domain or only users actively syncing in the cloud */
  syncScope?: SyncScope;
  /** Notification Settings */
  notificationSettings?: NotificationSettings;
  /** Migration Properties */
  readonly migrationProperties?: MigrationProperties;
  /** the current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Configuration diagnostics data containing latest execution from client. */
  configDiagnostics?: ConfigDiagnostics;
}

export function domainServicePropertiesSerializer(item: DomainServiceProperties): any {
  return {
    domainName: item["domainName"],
    replicaSets: !item["replicaSets"]
      ? item["replicaSets"]
      : replicaSetArraySerializer(item["replicaSets"]),
    ldapsSettings: !item["ldapsSettings"]
      ? item["ldapsSettings"]
      : ldapsSettingsSerializer(item["ldapsSettings"]),
    resourceForestSettings: !item["resourceForestSettings"]
      ? item["resourceForestSettings"]
      : resourceForestSettingsSerializer(item["resourceForestSettings"]),
    domainSecuritySettings: !item["domainSecuritySettings"]
      ? item["domainSecuritySettings"]
      : domainSecuritySettingsSerializer(item["domainSecuritySettings"]),
    domainConfigurationType: item["domainConfigurationType"],
    sku: item["sku"],
    filteredSync: item["filteredSync"],
    syncScope: item["syncScope"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationSettingsSerializer(item["notificationSettings"]),
    configDiagnostics: !item["configDiagnostics"]
      ? item["configDiagnostics"]
      : configDiagnosticsSerializer(item["configDiagnostics"]),
  };
}

export function domainServicePropertiesDeserializer(item: any): DomainServiceProperties {
  return {
    version: item["version"],
    tenantId: item["tenantId"],
    domainName: item["domainName"],
    deploymentId: item["deploymentId"],
    syncOwner: item["syncOwner"],
    syncApplicationId: item["syncApplicationId"],
    replicaSets: !item["replicaSets"]
      ? item["replicaSets"]
      : replicaSetArrayDeserializer(item["replicaSets"]),
    ldapsSettings: !item["ldapsSettings"]
      ? item["ldapsSettings"]
      : ldapsSettingsDeserializer(item["ldapsSettings"]),
    resourceForestSettings: !item["resourceForestSettings"]
      ? item["resourceForestSettings"]
      : resourceForestSettingsDeserializer(item["resourceForestSettings"]),
    domainSecuritySettings: !item["domainSecuritySettings"]
      ? item["domainSecuritySettings"]
      : domainSecuritySettingsDeserializer(item["domainSecuritySettings"]),
    domainConfigurationType: item["domainConfigurationType"],
    sku: item["sku"],
    filteredSync: item["filteredSync"],
    syncScope: item["syncScope"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationSettingsDeserializer(item["notificationSettings"]),
    migrationProperties: !item["migrationProperties"]
      ? item["migrationProperties"]
      : migrationPropertiesDeserializer(item["migrationProperties"]),
    provisioningState: item["provisioningState"],
    configDiagnostics: !item["configDiagnostics"]
      ? item["configDiagnostics"]
      : configDiagnosticsDeserializer(item["configDiagnostics"]),
  };
}

export function replicaSetArraySerializer(result: Array<ReplicaSet>): any[] {
  return result.map((item) => {
    return replicaSetSerializer(item);
  });
}

export function replicaSetArrayDeserializer(result: Array<ReplicaSet>): any[] {
  return result.map((item) => {
    return replicaSetDeserializer(item);
  });
}

/** Replica Set Definition */
export interface ReplicaSet {
  /** ReplicaSet Id */
  readonly replicaSetId?: string;
  /** Virtual network location */
  location?: string;
  /** Virtual network site id */
  readonly vnetSiteId?: string;
  /** The name of the virtual network that Domain Services will be deployed on. The id of the subnet that Domain Services will be deployed on. /virtualNetwork/vnetName/subnets/subnetName. */
  subnetId?: string;
  /** List of Domain Controller IP Address */
  readonly domainControllerIpAddress?: string[];
  /** External access ip address. */
  readonly externalAccessIpAddress?: string;
  /** Status of Domain Service instance */
  readonly serviceStatus?: string;
  /** Number of times the customer has self-resumed the domain service. Valid values range from 0 to 5, where 5 is the maximum allowed count before further self-resume is denied and support intervention is required. */
  readonly selfUnsuspendCounter?: number;
  /** Last domain evaluation run DateTime */
  readonly healthLastEvaluated?: Date;
  /** List of Domain Health Monitors */
  readonly healthMonitors?: HealthMonitor[];
  /** List of Domain Health Alerts */
  readonly healthAlerts?: HealthAlert[];
}

export function replicaSetSerializer(item: ReplicaSet): any {
  return { location: item["location"], subnetId: item["subnetId"] };
}

export function replicaSetDeserializer(item: any): ReplicaSet {
  return {
    replicaSetId: item["replicaSetId"],
    location: item["location"],
    vnetSiteId: item["vnetSiteId"],
    subnetId: item["subnetId"],
    domainControllerIpAddress: !item["domainControllerIpAddress"]
      ? item["domainControllerIpAddress"]
      : item["domainControllerIpAddress"].map((p: any) => {
          return p;
        }),
    externalAccessIpAddress: item["externalAccessIpAddress"],
    serviceStatus: item["serviceStatus"],
    selfUnsuspendCounter: item["selfUnsuspendCounter"],
    healthLastEvaluated: !item["healthLastEvaluated"]
      ? item["healthLastEvaluated"]
      : new Date(item["healthLastEvaluated"]),
    healthMonitors: !item["healthMonitors"]
      ? item["healthMonitors"]
      : healthMonitorArrayDeserializer(item["healthMonitors"]),
    healthAlerts: !item["healthAlerts"]
      ? item["healthAlerts"]
      : healthAlertArrayDeserializer(item["healthAlerts"]),
  };
}

export function healthMonitorArrayDeserializer(result: Array<HealthMonitor>): any[] {
  return result.map((item) => {
    return healthMonitorDeserializer(item);
  });
}

/** Health Monitor Description */
export interface HealthMonitor {
  /** Health Monitor Id */
  readonly id?: string;
  /** Health Monitor Name */
  readonly name?: string;
  /** Health Monitor Details */
  readonly details?: string;
}

export function healthMonitorDeserializer(item: any): HealthMonitor {
  return {
    id: item["id"],
    name: item["name"],
    details: item["details"],
  };
}

export function healthAlertArrayDeserializer(result: Array<HealthAlert>): any[] {
  return result.map((item) => {
    return healthAlertDeserializer(item);
  });
}

/** Health Alert Description */
export interface HealthAlert {
  /** Health Alert Id */
  readonly id?: string;
  /** Health Alert Name */
  readonly name?: string;
  /** Health Alert Issue */
  readonly issue?: string;
  /** Health Alert Severity */
  readonly severity?: string;
  /** Health Alert Raised DateTime */
  readonly raised?: Date;
  /** Health Alert Last Detected DateTime */
  readonly lastDetected?: Date;
  /** Health Alert TSG Link */
  readonly resolutionUri?: string;
}

export function healthAlertDeserializer(item: any): HealthAlert {
  return {
    id: item["id"],
    name: item["name"],
    issue: item["issue"],
    severity: item["severity"],
    raised: !item["raised"] ? item["raised"] : new Date(item["raised"]),
    lastDetected: !item["lastDetected"] ? item["lastDetected"] : new Date(item["lastDetected"]),
    resolutionUri: item["resolutionUri"],
  };
}

/** Secure LDAP Settings */
export interface LdapsSettings {
  /** A flag to determine whether or not Secure LDAP is enabled or disabled. */
  ldaps?: Ldaps;
  /** The certificate required to configure Secure LDAP. The parameter passed here should be a base64encoded representation of the certificate pfx file. */
  pfxCertificate?: string;
  /** The password to decrypt the provided Secure LDAP certificate pfx file. */
  pfxCertificatePassword?: string;
  /** Public certificate used to configure secure ldap. */
  readonly publicCertificate?: string;
  /** Thumbprint of configure ldaps certificate. */
  readonly certificateThumbprint?: string;
  /** NotAfter DateTime of configure ldaps certificate. */
  readonly certificateNotAfter?: Date;
  /** A flag to determine whether or not Secure LDAP access over the internet is enabled or disabled. */
  externalAccess?: ExternalAccess;
}

export function ldapsSettingsSerializer(item: LdapsSettings): any {
  return {
    ldaps: item["ldaps"],
    pfxCertificate: item["pfxCertificate"],
    pfxCertificatePassword: item["pfxCertificatePassword"],
    externalAccess: item["externalAccess"],
  };
}

export function ldapsSettingsDeserializer(item: any): LdapsSettings {
  return {
    ldaps: item["ldaps"],
    pfxCertificate: item["pfxCertificate"],
    pfxCertificatePassword: item["pfxCertificatePassword"],
    publicCertificate: item["publicCertificate"],
    certificateThumbprint: item["certificateThumbprint"],
    certificateNotAfter: !item["certificateNotAfter"]
      ? item["certificateNotAfter"]
      : new Date(item["certificateNotAfter"]),
    externalAccess: item["externalAccess"],
  };
}

/** A flag to determine whether or not Secure LDAP is enabled or disabled. */
export enum KnownLdaps {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not Secure LDAP is enabled or disabled. \
 * {@link KnownLdaps} can be used interchangeably with Ldaps,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type Ldaps = string;

/** A flag to determine whether or not Secure LDAP access over the internet is enabled or disabled. */
export enum KnownExternalAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not Secure LDAP access over the internet is enabled or disabled. \
 * {@link KnownExternalAccess} can be used interchangeably with ExternalAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ExternalAccess = string;

/** Settings for Resource Forest */
export interface ResourceForestSettings {
  /** List of settings for Resource Forest */
  settings?: ForestTrust[];
  /** Resource Forest */
  resourceForest?: string;
}

export function resourceForestSettingsSerializer(item: ResourceForestSettings): any {
  return {
    settings: !item["settings"] ? item["settings"] : forestTrustArraySerializer(item["settings"]),
    resourceForest: item["resourceForest"],
  };
}

export function resourceForestSettingsDeserializer(item: any): ResourceForestSettings {
  return {
    settings: !item["settings"] ? item["settings"] : forestTrustArrayDeserializer(item["settings"]),
    resourceForest: item["resourceForest"],
  };
}

export function forestTrustArraySerializer(result: Array<ForestTrust>): any[] {
  return result.map((item) => {
    return forestTrustSerializer(item);
  });
}

export function forestTrustArrayDeserializer(result: Array<ForestTrust>): any[] {
  return result.map((item) => {
    return forestTrustDeserializer(item);
  });
}

/** Forest Trust Setting */
export interface ForestTrust {
  /** Trusted Domain FQDN */
  trustedDomainFqdn?: string;
  /** Trust Direction */
  trustDirection?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Remote Dns ips */
  remoteDnsIps?: string;
  /** Trust Password */
  trustPassword?: string;
}

export function forestTrustSerializer(item: ForestTrust): any {
  return {
    trustedDomainFqdn: item["trustedDomainFqdn"],
    trustDirection: item["trustDirection"],
    friendlyName: item["friendlyName"],
    remoteDnsIps: item["remoteDnsIps"],
    trustPassword: item["trustPassword"],
  };
}

export function forestTrustDeserializer(item: any): ForestTrust {
  return {
    trustedDomainFqdn: item["trustedDomainFqdn"],
    trustDirection: item["trustDirection"],
    friendlyName: item["friendlyName"],
    remoteDnsIps: item["remoteDnsIps"],
    trustPassword: item["trustPassword"],
  };
}

/** Domain Security Settings */
export interface DomainSecuritySettings {
  /** A flag to determine whether or not NtlmV1 is enabled or disabled. */
  ntlmV1?: NtlmV1;
  /** A flag to determine whether or not TlsV1 is enabled or disabled. */
  tlsV1?: TlsV1;
  /** A flag to determine whether or not SyncNtlmPasswords is enabled or disabled. */
  syncNtlmPasswords?: SyncNtlmPasswords;
  /** A flag to determine whether or not SyncKerberosPasswords is enabled or disabled. */
  syncKerberosPasswords?: SyncKerberosPasswords;
  /** A flag to determine whether or not SyncOnPremPasswords is enabled or disabled. */
  syncOnPremPasswords?: SyncOnPremPasswords;
  /** A flag to determine whether or not KerberosRc4Encryption is enabled or disabled. */
  kerberosRc4Encryption?: KerberosRc4Encryption;
  /** A flag to determine whether or not KerberosArmoring is enabled or disabled. */
  kerberosArmoring?: KerberosArmoring;
  /** A flag to determine whether or not LdapSigning is enabled or disabled. */
  ldapSigning?: LdapSigning;
  /** A flag to determine whether or not ChannelBinding is enabled or disabled. */
  channelBinding?: ChannelBinding;
  /** A flag to determine whether the SyncOnPremSamAccountName feature is active. When enabled, the samAccountName attribute in Entra Domain Services is synchronized from the onPremisesSamAccountName attribute in Entra ID */
  syncOnPremSamAccountName?: SyncOnPremSamAccountName;
}

export function domainSecuritySettingsSerializer(item: DomainSecuritySettings): any {
  return {
    ntlmV1: item["ntlmV1"],
    tlsV1: item["tlsV1"],
    syncNtlmPasswords: item["syncNtlmPasswords"],
    syncKerberosPasswords: item["syncKerberosPasswords"],
    syncOnPremPasswords: item["syncOnPremPasswords"],
    kerberosRc4Encryption: item["kerberosRc4Encryption"],
    kerberosArmoring: item["kerberosArmoring"],
    ldapSigning: item["ldapSigning"],
    channelBinding: item["channelBinding"],
    syncOnPremSamAccountName: item["syncOnPremSamAccountName"],
  };
}

export function domainSecuritySettingsDeserializer(item: any): DomainSecuritySettings {
  return {
    ntlmV1: item["ntlmV1"],
    tlsV1: item["tlsV1"],
    syncNtlmPasswords: item["syncNtlmPasswords"],
    syncKerberosPasswords: item["syncKerberosPasswords"],
    syncOnPremPasswords: item["syncOnPremPasswords"],
    kerberosRc4Encryption: item["kerberosRc4Encryption"],
    kerberosArmoring: item["kerberosArmoring"],
    ldapSigning: item["ldapSigning"],
    channelBinding: item["channelBinding"],
    syncOnPremSamAccountName: item["syncOnPremSamAccountName"],
  };
}

/** A flag to determine whether or not NtlmV1 is enabled or disabled. */
export enum KnownNtlmV1 {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not NtlmV1 is enabled or disabled. \
 * {@link KnownNtlmV1} can be used interchangeably with NtlmV1,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type NtlmV1 = string;

/** A flag to determine whether or not TlsV1 is enabled or disabled. */
export enum KnownTlsV1 {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not TlsV1 is enabled or disabled. \
 * {@link KnownTlsV1} can be used interchangeably with TlsV1,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type TlsV1 = string;

/** A flag to determine whether or not SyncNtlmPasswords is enabled or disabled. */
export enum KnownSyncNtlmPasswords {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not SyncNtlmPasswords is enabled or disabled. \
 * {@link KnownSyncNtlmPasswords} can be used interchangeably with SyncNtlmPasswords,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SyncNtlmPasswords = string;

/** A flag to determine whether or not SyncKerberosPasswords is enabled or disabled. */
export enum KnownSyncKerberosPasswords {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not SyncKerberosPasswords is enabled or disabled. \
 * {@link KnownSyncKerberosPasswords} can be used interchangeably with SyncKerberosPasswords,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SyncKerberosPasswords = string;

/** A flag to determine whether or not SyncOnPremPasswords is enabled or disabled. */
export enum KnownSyncOnPremPasswords {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not SyncOnPremPasswords is enabled or disabled. \
 * {@link KnownSyncOnPremPasswords} can be used interchangeably with SyncOnPremPasswords,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SyncOnPremPasswords = string;

/** A flag to determine whether or not KerberosRc4Encryption is enabled or disabled. */
export enum KnownKerberosRc4Encryption {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not KerberosRc4Encryption is enabled or disabled. \
 * {@link KnownKerberosRc4Encryption} can be used interchangeably with KerberosRc4Encryption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type KerberosRc4Encryption = string;

/** A flag to determine whether or not KerberosArmoring is enabled or disabled. */
export enum KnownKerberosArmoring {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not KerberosArmoring is enabled or disabled. \
 * {@link KnownKerberosArmoring} can be used interchangeably with KerberosArmoring,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type KerberosArmoring = string;

/** A flag to determine whether or not LdapSigning is enabled or disabled. */
export enum KnownLdapSigning {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not LdapSigning is enabled or disabled. \
 * {@link KnownLdapSigning} can be used interchangeably with LdapSigning,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type LdapSigning = string;

/** A flag to determine whether or not ChannelBinding is enabled or disabled. */
export enum KnownChannelBinding {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether or not ChannelBinding is enabled or disabled. \
 * {@link KnownChannelBinding} can be used interchangeably with ChannelBinding,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type ChannelBinding = string;

/** A flag to determine whether the SyncOnPremSamAccountName feature is active. When enabled, the samAccountName attribute in Entra Domain Services is synchronized from the onPremisesSamAccountName attribute in Entra ID */
export enum KnownSyncOnPremSamAccountName {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * A flag to determine whether the SyncOnPremSamAccountName feature is active. When enabled, the samAccountName attribute in Entra Domain Services is synchronized from the onPremisesSamAccountName attribute in Entra ID \
 * {@link KnownSyncOnPremSamAccountName} can be used interchangeably with SyncOnPremSamAccountName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SyncOnPremSamAccountName = string;

/** Enabled or Disabled flag to turn on Group-based filtered sync */
export enum KnownFilteredSync {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enabled or Disabled flag to turn on Group-based filtered sync \
 * {@link KnownFilteredSync} can be used interchangeably with FilteredSync,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type FilteredSync = string;

/** All or CloudOnly, All users in AAD are synced to AAD DS domain or only users actively syncing in the cloud */
export enum KnownSyncScope {
  /** All */
  All = "All",
  /** CloudOnly */
  CloudOnly = "CloudOnly",
}

/**
 * All or CloudOnly, All users in AAD are synced to AAD DS domain or only users actively syncing in the cloud \
 * {@link KnownSyncScope} can be used interchangeably with SyncScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**: All \
 * **CloudOnly**: CloudOnly
 */
export type SyncScope = string;

/** Settings for notification */
export interface NotificationSettings {
  /** Should global admins be notified */
  notifyGlobalAdmins?: NotifyGlobalAdmins;
  /** Should domain controller admins be notified */
  notifyDcAdmins?: NotifyDcAdmins;
  /** The list of additional recipients */
  additionalRecipients?: string[];
}

export function notificationSettingsSerializer(item: NotificationSettings): any {
  return {
    notifyGlobalAdmins: item["notifyGlobalAdmins"],
    notifyDcAdmins: item["notifyDcAdmins"],
    additionalRecipients: !item["additionalRecipients"]
      ? item["additionalRecipients"]
      : item["additionalRecipients"].map((p: any) => {
          return p;
        }),
  };
}

export function notificationSettingsDeserializer(item: any): NotificationSettings {
  return {
    notifyGlobalAdmins: item["notifyGlobalAdmins"],
    notifyDcAdmins: item["notifyDcAdmins"],
    additionalRecipients: !item["additionalRecipients"]
      ? item["additionalRecipients"]
      : item["additionalRecipients"].map((p: any) => {
          return p;
        }),
  };
}

/** Should global admins be notified */
export enum KnownNotifyGlobalAdmins {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Should global admins be notified \
 * {@link KnownNotifyGlobalAdmins} can be used interchangeably with NotifyGlobalAdmins,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type NotifyGlobalAdmins = string;

/** Should domain controller admins be notified */
export enum KnownNotifyDcAdmins {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Should domain controller admins be notified \
 * {@link KnownNotifyDcAdmins} can be used interchangeably with NotifyDcAdmins,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type NotifyDcAdmins = string;

/** Migration Properties */
export interface MigrationProperties {
  /** Old Subnet Id */
  readonly oldSubnetId?: string;
  /** Old Vnet Site Id */
  readonly oldVnetSiteId?: string;
  /** Migration Progress */
  readonly migrationProgress?: MigrationProgress;
}

export function migrationPropertiesDeserializer(item: any): MigrationProperties {
  return {
    oldSubnetId: item["oldSubnetId"],
    oldVnetSiteId: item["oldVnetSiteId"],
    migrationProgress: !item["migrationProgress"]
      ? item["migrationProgress"]
      : migrationProgressDeserializer(item["migrationProgress"]),
  };
}

/** Migration Progress */
export interface MigrationProgress {
  /** Completion Percentage */
  completionPercentage?: number;
  /** Progress Message */
  progressMessage?: string;
}

export function migrationProgressDeserializer(item: any): MigrationProgress {
  return {
    completionPercentage: item["completionPercentage"],
    progressMessage: item["progressMessage"],
  };
}

/** Configuration Diagnostics */
export interface ConfigDiagnostics {
  /** Last domain configuration diagnostics DateTime */
  lastExecuted?: Date;
  /** List of Configuration Diagnostics validator results. */
  validatorResults?: ConfigDiagnosticsValidatorResult[];
}

export function configDiagnosticsSerializer(item: ConfigDiagnostics): any {
  return {
    lastExecuted: !item["lastExecuted"] ? item["lastExecuted"] : item["lastExecuted"].toUTCString(),
    validatorResults: !item["validatorResults"]
      ? item["validatorResults"]
      : configDiagnosticsValidatorResultArraySerializer(item["validatorResults"]),
  };
}

export function configDiagnosticsDeserializer(item: any): ConfigDiagnostics {
  return {
    lastExecuted: !item["lastExecuted"] ? item["lastExecuted"] : new Date(item["lastExecuted"]),
    validatorResults: !item["validatorResults"]
      ? item["validatorResults"]
      : configDiagnosticsValidatorResultArrayDeserializer(item["validatorResults"]),
  };
}

export function configDiagnosticsValidatorResultArraySerializer(
  result: Array<ConfigDiagnosticsValidatorResult>,
): any[] {
  return result.map((item) => {
    return configDiagnosticsValidatorResultSerializer(item);
  });
}

export function configDiagnosticsValidatorResultArrayDeserializer(
  result: Array<ConfigDiagnosticsValidatorResult>,
): any[] {
  return result.map((item) => {
    return configDiagnosticsValidatorResultDeserializer(item);
  });
}

/** Config Diagnostics validator result data */
export interface ConfigDiagnosticsValidatorResult {
  /** Validator identifier */
  validatorId?: string;
  /** Replica set location and subnet name */
  replicaSetSubnetDisplayName?: string;
  /** Status for individual validator after running diagnostics. */
  status?: Status;
  /** List of resource config validation issues. */
  issues?: ConfigDiagnosticsValidatorResultIssue[];
}

export function configDiagnosticsValidatorResultSerializer(
  item: ConfigDiagnosticsValidatorResult,
): any {
  return {
    validatorId: item["validatorId"],
    replicaSetSubnetDisplayName: item["replicaSetSubnetDisplayName"],
    status: item["status"],
    issues: !item["issues"]
      ? item["issues"]
      : configDiagnosticsValidatorResultIssueArraySerializer(item["issues"]),
  };
}

export function configDiagnosticsValidatorResultDeserializer(
  item: any,
): ConfigDiagnosticsValidatorResult {
  return {
    validatorId: item["validatorId"],
    replicaSetSubnetDisplayName: item["replicaSetSubnetDisplayName"],
    status: item["status"],
    issues: !item["issues"]
      ? item["issues"]
      : configDiagnosticsValidatorResultIssueArrayDeserializer(item["issues"]),
  };
}

/** Status for individual validator after running diagnostics. */
export enum KnownStatus {
  /** None */
  None = "None",
  /** Running */
  Running = "Running",
  /** OK */
  OK = "OK",
  /** Failure */
  Failure = "Failure",
  /** Warning */
  Warning = "Warning",
  /** Skipped */
  Skipped = "Skipped",
}

/**
 * Status for individual validator after running diagnostics. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Running**: Running \
 * **OK**: OK \
 * **Failure**: Failure \
 * **Warning**: Warning \
 * **Skipped**: Skipped
 */
export type Status = string;

export function configDiagnosticsValidatorResultIssueArraySerializer(
  result: Array<ConfigDiagnosticsValidatorResultIssue>,
): any[] {
  return result.map((item) => {
    return configDiagnosticsValidatorResultIssueSerializer(item);
  });
}

export function configDiagnosticsValidatorResultIssueArrayDeserializer(
  result: Array<ConfigDiagnosticsValidatorResultIssue>,
): any[] {
  return result.map((item) => {
    return configDiagnosticsValidatorResultIssueDeserializer(item);
  });
}

/** Specific issue for a particular config diagnostics validator */
export interface ConfigDiagnosticsValidatorResultIssue {
  /** Validation issue identifier. */
  id?: string;
  /** List of domain resource property name or values used to compose a rich description. */
  descriptionParams?: string[];
}

export function configDiagnosticsValidatorResultIssueSerializer(
  item: ConfigDiagnosticsValidatorResultIssue,
): any {
  return {
    id: item["id"],
    descriptionParams: !item["descriptionParams"]
      ? item["descriptionParams"]
      : item["descriptionParams"].map((p: any) => {
          return p;
        }),
  };
}

export function configDiagnosticsValidatorResultIssueDeserializer(
  item: any,
): ConfigDiagnosticsValidatorResultIssue {
  return {
    id: item["id"],
    descriptionParams: !item["descriptionParams"]
      ? item["descriptionParams"]
      : item["descriptionParams"].map((p: any) => {
          return p;
        }),
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

/** An error response from the Domain Services. */
export interface CloudError {
  /** An error response from the Domain Services. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the Domain Services. */
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

/** The list of Domain Services. */
export interface _DomainServiceListResult {
  /** The list of Domain Services. */
  value?: DomainService[];
  /** The continuation token for the next page of results. */
  nextLink?: string;
}

export function _domainServiceListResultDeserializer(item: any): _DomainServiceListResult {
  return {
    value: !item["value"] ? item["value"] : domainServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainServiceArraySerializer(result: Array<DomainService>): any[] {
  return result.map((item) => {
    return domainServiceSerializer(item);
  });
}

export function domainServiceArrayDeserializer(result: Array<DomainService>): any[] {
  return result.map((item) => {
    return domainServiceDeserializer(item);
  });
}

/** Response for successful unsuspend of a domain service. */
export interface UnsuspendDomainServiceResponse {
  message?: string;
}

export function unsuspendDomainServiceResponseDeserializer(
  item: any,
): UnsuspendDomainServiceResponse {
  return {
    message: item["message"],
  };
}

/** The list of domain service operation response. */
export interface _OperationEntityListResult {
  /** The list of operations. */
  value?: OperationEntity[];
  /** The continuation token for the next page of results. */
  nextLink?: string;
}

export function _operationEntityListResultDeserializer(item: any): _OperationEntityListResult {
  return {
    value: !item["value"] ? item["value"] : operationEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationEntityArrayDeserializer(result: Array<OperationEntity>): any[] {
  return result.map((item) => {
    return operationEntityDeserializer(item);
  });
}

/** The operation supported by Domain Services. */
export interface OperationEntity {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The operation supported by Domain Services. */
  display?: OperationDisplayInfo;
  /** The origin of the operation. */
  origin?: string;
}

export function operationEntityDeserializer(item: any): OperationEntity {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayInfoDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** The operation supported by Domain Services. */
export interface OperationDisplayInfo {
  /** The description of the operation. */
  description?: string;
  /** The action that users can perform, based on their permission level. */
  operation?: string;
  /** Service provider: Domain Services. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
}

export function operationDisplayInfoDeserializer(item: any): OperationDisplayInfo {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** Resource for OuContainer. */
export interface OuContainer extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource etag */
  etag?: string;
  /** Azure Active Directory tenant id */
  readonly tenantId?: string;
  /** The domain name of Domain Services. */
  readonly domainName?: string;
  /** The Deployment id */
  readonly deploymentId?: string;
  /** The OuContainer name */
  readonly containerId?: string;
  /** The list of container accounts */
  accounts?: ContainerAccount[];
  /** Status of OuContainer instance */
  readonly serviceStatus?: string;
  /** Distinguished Name of OuContainer instance */
  readonly distinguishedName?: string;
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

export function ouContainerDeserializer(item: any): OuContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ouContainerPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
  };
}

/** Properties of the OuContainer. */
export interface OuContainerProperties {
  /** Azure Active Directory tenant id */
  readonly tenantId?: string;
  /** The domain name of Domain Services. */
  readonly domainName?: string;
  /** The Deployment id */
  readonly deploymentId?: string;
  /** The OuContainer name */
  readonly containerId?: string;
  /** The list of container accounts */
  accounts?: ContainerAccount[];
  /** Status of OuContainer instance */
  readonly serviceStatus?: string;
  /** Distinguished Name of OuContainer instance */
  readonly distinguishedName?: string;
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

export function ouContainerPropertiesDeserializer(item: any): OuContainerProperties {
  return {
    tenantId: item["tenantId"],
    domainName: item["domainName"],
    deploymentId: item["deploymentId"],
    containerId: item["containerId"],
    accounts: !item["accounts"]
      ? item["accounts"]
      : containerAccountArrayDeserializer(item["accounts"]),
    serviceStatus: item["serviceStatus"],
    distinguishedName: item["distinguishedName"],
    provisioningState: item["provisioningState"],
  };
}

export function containerAccountArraySerializer(result: Array<ContainerAccount>): any[] {
  return result.map((item) => {
    return containerAccountSerializer(item);
  });
}

export function containerAccountArrayDeserializer(result: Array<ContainerAccount>): any[] {
  return result.map((item) => {
    return containerAccountDeserializer(item);
  });
}

/** Container Account Description */
export interface ContainerAccount {
  /** The account name */
  accountName?: string;
  /** The account spn */
  spn?: string;
  /** The account password */
  password?: string;
}

export function containerAccountSerializer(item: ContainerAccount): any {
  return { accountName: item["accountName"], spn: item["spn"], password: item["password"] };
}

export function containerAccountDeserializer(item: any): ContainerAccount {
  return {
    accountName: item["accountName"],
    spn: item["spn"],
    password: item["password"],
  };
}

/** The list of OuContainers in DomainService instance. */
export interface _OuContainerListResult {
  /** The list of OuContainers. */
  value?: OuContainer[];
  /** The continuation token for the next page of results. */
  nextLink?: string;
}

export function _ouContainerListResultDeserializer(item: any): _OuContainerListResult {
  return {
    value: !item["value"] ? item["value"] : ouContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ouContainerArrayDeserializer(result: Array<OuContainer>): any[] {
  return result.map((item) => {
    return ouContainerDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01-preview API version. */
  V20251001Preview = "2025-10-01-preview",
}

export function _domainServicePropertiesSerializer(item: DomainService): any {
  return {
    domainName: item["domainName"],
    replicaSets: !item["replicaSets"]
      ? item["replicaSets"]
      : replicaSetArraySerializer(item["replicaSets"]),
    ldapsSettings: !item["ldapsSettings"]
      ? item["ldapsSettings"]
      : ldapsSettingsSerializer(item["ldapsSettings"]),
    resourceForestSettings: !item["resourceForestSettings"]
      ? item["resourceForestSettings"]
      : resourceForestSettingsSerializer(item["resourceForestSettings"]),
    domainSecuritySettings: !item["domainSecuritySettings"]
      ? item["domainSecuritySettings"]
      : domainSecuritySettingsSerializer(item["domainSecuritySettings"]),
    domainConfigurationType: item["domainConfigurationType"],
    sku: item["sku"],
    filteredSync: item["filteredSync"],
    syncScope: item["syncScope"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationSettingsSerializer(item["notificationSettings"]),
    configDiagnostics: !item["configDiagnostics"]
      ? item["configDiagnostics"]
      : configDiagnosticsSerializer(item["configDiagnostics"]),
  };
}

export function _domainServicePropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    tenantId: item["tenantId"],
    domainName: item["domainName"],
    deploymentId: item["deploymentId"],
    syncOwner: item["syncOwner"],
    syncApplicationId: item["syncApplicationId"],
    replicaSets: !item["replicaSets"]
      ? item["replicaSets"]
      : replicaSetArrayDeserializer(item["replicaSets"]),
    ldapsSettings: !item["ldapsSettings"]
      ? item["ldapsSettings"]
      : ldapsSettingsDeserializer(item["ldapsSettings"]),
    resourceForestSettings: !item["resourceForestSettings"]
      ? item["resourceForestSettings"]
      : resourceForestSettingsDeserializer(item["resourceForestSettings"]),
    domainSecuritySettings: !item["domainSecuritySettings"]
      ? item["domainSecuritySettings"]
      : domainSecuritySettingsDeserializer(item["domainSecuritySettings"]),
    domainConfigurationType: item["domainConfigurationType"],
    sku: item["sku"],
    filteredSync: item["filteredSync"],
    syncScope: item["syncScope"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationSettingsDeserializer(item["notificationSettings"]),
    migrationProperties: !item["migrationProperties"]
      ? item["migrationProperties"]
      : migrationPropertiesDeserializer(item["migrationProperties"]),
    provisioningState: item["provisioningState"],
    configDiagnostics: !item["configDiagnostics"]
      ? item["configDiagnostics"]
      : configDiagnosticsDeserializer(item["configDiagnostics"]),
  };
}

export function _ouContainerPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    domainName: item["domainName"],
    deploymentId: item["deploymentId"],
    containerId: item["containerId"],
    accounts: !item["accounts"]
      ? item["accounts"]
      : containerAccountArrayDeserializer(item["accounts"]),
    serviceStatus: item["serviceStatus"],
    distinguishedName: item["distinguishedName"],
    provisioningState: item["provisioningState"],
  };
}
