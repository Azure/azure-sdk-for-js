// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type DiscriminatedModelShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * The default access tier for block blobs in the storage account. Required for storage accounts where kind = BlobStorage. See more details in: https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview.
 */
export type AccessTier = "Hot" | "Cool" | "Premium" | "Cold" | "Smart";

/**
 * Gets the status indicating whether the primary location of the storage account is available or unavailable.
 */
export type AccountStatus = "available" | "unavailable";

/**
 * Specifies the default action of allow or deny when no other rules match.
 */
export type DefaultAction = "Allow" | "Deny";

/**
 * Gets the status of the storage account at the time the operation was called.
 */
export type ProvisioningState = "Creating" | "ResolvingDNS" | "Succeeded";

/**
 * Specifies whether data in the container may be accessed publicly and the level of access.
 */
export type PublicAccess = "Container" | "Blob" | "None";

/**
 * The SKU tier. This is based on the SKU name.
 */
export type SkuTier = "Standard" | "Premium";

export interface AccessPolicy {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: Date;
  /**
   * List of abbreviated permissions.
   */
  permission?: string;
  /**
   * Start time of the access policy
   */
  startTime?: Date;
}

export interface AccessPolicyInput extends InputOf<AccessPolicy> {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * List of abbreviated permissions.
   */
  permission?: ExpressionOrValue<string> | undefined;
  /**
   * Start time of the access policy
   */
  startTime?: ExpressionOrValue<Date> | undefined;
}

export type AccessPolicyView = AccessPolicyInput;

export const accessPolicyShape: FlatModelShape = createFlatModelShape({
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  permission: { armPath: ["permission"], value: createStringShape() },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

/**
 * This defines account-level immutability policy properties.
 */
export interface AccountImmutabilityPolicyProperties {
  /**
   * This property can only be changed for disabled and unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted.
   */
  allowProtectedAppendWrites?: boolean;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: number;
  /**
   * The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted.
   */
  state?: AccountImmutabilityPolicyState;
}

/**
 * Input type for This defines account-level immutability policy properties.
 */
export interface AccountImmutabilityPolicyPropertiesInput extends InputOf<AccountImmutabilityPolicyProperties> {
  /**
   * This property can only be changed for disabled and unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted.
   */
  allowProtectedAppendWrites?: ExpressionOrValue<boolean> | undefined;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: ExpressionOrValue<number> | undefined;
  /**
   * The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted.
   */
  state?: ExpressionOrValue<AccountImmutabilityPolicyState> | undefined;
}

/**
 * View type for This defines account-level immutability policy properties.
 */
export type AccountImmutabilityPolicyPropertiesView = AccountImmutabilityPolicyPropertiesInput;

export const accountImmutabilityPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  allowProtectedAppendWrites: {
    armPath: ["allowProtectedAppendWrites"],
    value: createBooleanShape(),
  },
  immutabilityPeriodSinceCreationInDays: {
    armPath: ["immutabilityPeriodSinceCreationInDays"],
    value: createNumberShape(),
  },
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account.
 */
export interface AccountLimits {
  /**
   * The maximum number of file shares limit for the storage account.
   */
  maxFileShares?: number;
  /**
   * The maximum provisioned bandwidth limit in mebibytes per second for the storage account.
   */
  maxProvisionedBandwidthMiBPerSec?: number;
  /**
   * The maximum provisioned IOPS limit for the storage account.
   */
  maxProvisionedIops?: number;
  /**
   * The maximum provisioned storage quota limit in gibibytes for the storage account.
   */
  maxProvisionedStorageGiB?: number;
}

/**
 * Input type for Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account.
 */
export interface AccountLimitsInput extends InputOf<AccountLimits> {}

/**
 * View type for Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account.
 */
export interface AccountLimitsView extends InputOf<AccountLimits> {
  /**
   * Read-only output: The maximum number of file shares limit for the storage account.
   */
  readonly maxFileShares?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned bandwidth limit in mebibytes per second for the storage account.
   */
  readonly maxProvisionedBandwidthMiBPerSec?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned IOPS limit for the storage account.
   */
  readonly maxProvisionedIops?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned storage quota limit in gibibytes for the storage account.
   */
  readonly maxProvisionedStorageGiB?: Expression<number> | undefined;
}

export const accountLimitsShape: FlatModelShape = createFlatModelShape({
  maxFileShares: { armPath: ["maxFileShares"], value: createNumberShape(), readOnly: true },
  maxProvisionedBandwidthMiBPerSec: {
    armPath: ["maxProvisionedBandwidthMiBPerSec"],
    value: createNumberShape(),
    readOnly: true,
  },
  maxProvisionedIops: {
    armPath: ["maxProvisionedIOPS"],
    value: createNumberShape(),
    readOnly: true,
  },
  maxProvisionedStorageGiB: {
    armPath: ["maxProvisionedStorageGiB"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account.
 */
export interface AccountUsage {
  /**
   * Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
   */
  liveShares?: AccountUsageElements;
  /**
   * Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
   */
  softDeletedShares?: AccountUsageElements;
}

/**
 * Input type for Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account.
 */
export interface AccountUsageInput extends InputOf<AccountUsage> {}

/**
 * View type for Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account.
 */
export interface AccountUsageView extends InputOf<AccountUsage> {
  /**
   * Read-only output: Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
   */
  readonly liveShares?: Expression<AccountUsageElements> | undefined;
  /**
   * Read-only output: Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
   */
  readonly softDeletedShares?: Expression<AccountUsageElements> | undefined;
}

export const accountUsageShape: FlatModelShape = createFlatModelShape({
  liveShares: {
    armPath: ["liveShares"],
    value: createDeferredShape(() => accountUsageElementsShape),
    readOnly: true,
  },
  softDeletedShares: {
    armPath: ["softDeletedShares"],
    value: createDeferredShape(() => accountUsageElementsShape),
    readOnly: true,
  },
});

/**
 * Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
 */
export interface AccountUsageElements {
  /**
   * The total number of file shares.
   */
  fileShareCount?: number;
  /**
   * The total provisioned bandwidth in mebibytes per second.
   */
  provisionedBandwidthMiBPerSec?: number;
  /**
   * The total provisioned IOPS.
   */
  provisionedIops?: number;
  /**
   * The total provisioned storage quota in gibibytes.
   */
  provisionedStorageGiB?: number;
}

/**
 * Input type for Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
 */
export interface AccountUsageElementsInput extends InputOf<AccountUsageElements> {}

/**
 * View type for Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account.
 */
export interface AccountUsageElementsView extends InputOf<AccountUsageElements> {
  /**
   * Read-only output: The total number of file shares.
   */
  readonly fileShareCount?: Expression<number> | undefined;
  /**
   * Read-only output: The total provisioned bandwidth in mebibytes per second.
   */
  readonly provisionedBandwidthMiBPerSec?: Expression<number> | undefined;
  /**
   * Read-only output: The total provisioned IOPS.
   */
  readonly provisionedIops?: Expression<number> | undefined;
  /**
   * Read-only output: The total provisioned storage quota in gibibytes.
   */
  readonly provisionedStorageGiB?: Expression<number> | undefined;
}

export const accountUsageElementsShape: FlatModelShape = createFlatModelShape({
  fileShareCount: { armPath: ["fileShareCount"], value: createNumberShape(), readOnly: true },
  provisionedBandwidthMiBPerSec: {
    armPath: ["provisionedBandwidthMiBPerSec"],
    value: createNumberShape(),
    readOnly: true,
  },
  provisionedIops: { armPath: ["provisionedIOPS"], value: createNumberShape(), readOnly: true },
  provisionedStorageGiB: {
    armPath: ["provisionedStorageGiB"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * Settings properties for Active Directory (AD).
 */
export interface ActiveDirectoryProperties {
  /**
   * Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted.
   */
  accountType?: AccountType;
  /**
   * Specifies the security identifier (SID) for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  azureStorageSid?: string;
  /**
   * Specifies the domain GUID. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. If directoryServiceOptions is set to AADDS (Entra DS authentication), this property can be omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication.
   */
  domainGuid?: string;
  /**
   * Specifies the primary domain that the AD DNS server is authoritative for. This property is required if directoryServiceOptions is set to AD (AD DS authentication). If directoryServiceOptions is set to AADDS (Entra DS authentication), providing this property is optional, as it will be inferred automatically if omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication.
   */
  domainName?: string;
  /**
   * Specifies the security identifier (SID) of the AD domain. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  domainSid?: string;
  /**
   * Specifies the Active Directory forest to get. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  forestName?: string;
  /**
   * Specifies the NetBIOS domain name. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  netBiosDomainName?: string;
  /**
   * Specifies the Active Directory SAMAccountName for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, accountType should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted.
   */
  samAccountName?: string;
}

/**
 * Input type for Settings properties for Active Directory (AD).
 */
export interface ActiveDirectoryPropertiesInput extends InputOf<ActiveDirectoryProperties> {
  /**
   * Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted.
   */
  accountType?: ExpressionOrValue<AccountType> | undefined;
  /**
   * Specifies the security identifier (SID) for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  azureStorageSid?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the domain GUID. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. If directoryServiceOptions is set to AADDS (Entra DS authentication), this property can be omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication.
   */
  domainGuid?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the primary domain that the AD DNS server is authoritative for. This property is required if directoryServiceOptions is set to AD (AD DS authentication). If directoryServiceOptions is set to AADDS (Entra DS authentication), providing this property is optional, as it will be inferred automatically if omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication.
   */
  domainName?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the security identifier (SID) of the AD domain. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  domainSid?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the Active Directory forest to get. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  forestName?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the NetBIOS domain name. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted.
   */
  netBiosDomainName?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the Active Directory SAMAccountName for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, accountType should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted.
   */
  samAccountName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Settings properties for Active Directory (AD).
 */
export type ActiveDirectoryPropertiesView = ActiveDirectoryPropertiesInput;

export const activeDirectoryPropertiesShape: FlatModelShape = createFlatModelShape({
  accountType: { armPath: ["accountType"], value: createUnionShape() },
  azureStorageSid: { armPath: ["azureStorageSid"], value: createStringShape() },
  domainGuid: { armPath: ["domainGuid"], value: createStringShape() },
  domainName: { armPath: ["domainName"], value: createStringShape() },
  domainSid: { armPath: ["domainSid"], value: createStringShape() },
  forestName: { armPath: ["forestName"], value: createStringShape() },
  netBiosDomainName: { armPath: ["netBiosDomainName"], value: createStringShape() },
  samAccountName: { armPath: ["samAccountName"], value: createStringShape() },
});

/**
 * Configuration for the advanced platform metrics rule.
 */
export interface AdvancedPlatformMetricsRuleConfig {
  /**
   * The type of filter applied to the rule. Possible values include: AllContainersFilter, ContainerPrefixFilter, ContainerListFilter.
   */
  filterType?: AdvancedPlatformMetricsFilterType;
  /**
   * The values for the filter applied to the rule. If filter type is AllContainersFilter, filter values should be empty. If filter type is ContainerPrefixFilter, filter values should contain a list of container prefixes. If filter type is ContainerListFilter, filter values should contain a list of container names.
   */
  filterValues?: string[];
}

/**
 * Input type for Configuration for the advanced platform metrics rule.
 */
export interface AdvancedPlatformMetricsRuleConfigInput extends InputOf<AdvancedPlatformMetricsRuleConfig> {
  /**
   * The type of filter applied to the rule. Possible values include: AllContainersFilter, ContainerPrefixFilter, ContainerListFilter.
   */
  filterType?: ExpressionOrValue<AdvancedPlatformMetricsFilterType> | undefined;
  /**
   * The values for the filter applied to the rule. If filter type is AllContainersFilter, filter values should be empty. If filter type is ContainerPrefixFilter, filter values should contain a list of container prefixes. If filter type is ContainerListFilter, filter values should contain a list of container names.
   */
  filterValues?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Configuration for the advanced platform metrics rule.
 */
export type AdvancedPlatformMetricsRuleConfigView = AdvancedPlatformMetricsRuleConfigInput;

export const advancedPlatformMetricsRuleConfigShape: FlatModelShape = createFlatModelShape({
  filterType: { armPath: ["filterType"], value: createUnionShape() },
  filterValues: { armPath: ["filterValues"], value: createArrayShape(createStringShape()) },
});

/**
 * An object that defines the advanced platform metrics rule.
 */
export interface AdvancedPlatformMetricsRuleProperties {
  /**
   * A boolean flag which enables the advanced platform metrics rule.
   */
  enabled: boolean;
  /**
   * Gets the last modification date and time of the advanced platform metrics rule in UTC.
   */
  lastModifiedTime?: Date;
  /**
   * The metrics emitted by the rule. Metrics are mapped according to the rule type from RuleTypeProperty. Rule type to metrics mapping: ContainerLevelCapacityMetrics => {ContainerUsedSize, ContainerBlobCount}.
   */
  metricsEmitted?: MetricsEmitted[];
  /**
   * Configuration for the advanced platform metrics rule.
   */
  ruleConfig: AdvancedPlatformMetricsRuleConfig;
  /**
   * Indicates the type of the advanced platform metrics rule. Possible values include: ContainerLevelCapacityMetrics.
   */
  ruleType?: AdvancedPlatformMetricsRuleType;
}

/**
 * Input type for An object that defines the advanced platform metrics rule.
 */
export interface AdvancedPlatformMetricsRulePropertiesInput extends InputOf<AdvancedPlatformMetricsRuleProperties> {
  /**
   * A boolean flag which enables the advanced platform metrics rule.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * Configuration for the advanced platform metrics rule.
   */
  ruleConfig: AdvancedPlatformMetricsRuleConfigInput;
}

/**
 * View type for An object that defines the advanced platform metrics rule.
 */
export interface AdvancedPlatformMetricsRulePropertiesView extends InputOf<AdvancedPlatformMetricsRuleProperties> {
  /**
   * A boolean flag which enables the advanced platform metrics rule.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * Read-only output: Gets the last modification date and time of the advanced platform metrics rule in UTC.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The metrics emitted by the rule. Metrics are mapped according to the rule type from RuleTypeProperty. Rule type to metrics mapping: ContainerLevelCapacityMetrics => {ContainerUsedSize, ContainerBlobCount}.
   */
  readonly metricsEmitted?: Expression<MetricsEmitted[]> | undefined;
  /**
   * Configuration for the advanced platform metrics rule.
   */
  ruleConfig: AdvancedPlatformMetricsRuleConfigView;
  /**
   * Read-only output: Indicates the type of the advanced platform metrics rule. Possible values include: ContainerLevelCapacityMetrics.
   */
  readonly ruleType?: Expression<AdvancedPlatformMetricsRuleType> | undefined;
}

export const advancedPlatformMetricsRulePropertiesShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  metricsEmitted: {
    armPath: ["metricsEmitted"],
    value: createArrayShape(createUnionShape()),
    readOnly: true,
  },
  ruleConfig: {
    armPath: ["ruleConfig"],
    value: createDeferredShape(() => advancedPlatformMetricsRuleConfigShape),
  },
  ruleType: { armPath: ["ruleType"], value: createUnionShape(), readOnly: true },
});

/**
 * Settings for Azure Files identity based authentication.
 */
export interface AzureFilesIdentityBasedAuthentication {
  /**
   * Additional information about the directory service. Required if directoryServiceOptions is AD (AD DS authentication). Optional for directoryServiceOptions AADDS (Entra DS authentication) and AADKERB (Entra authentication).
   */
  activeDirectoryProperties?: ActiveDirectoryProperties;
  /**
   * Default share permission for users using Kerberos authentication if RBAC role is not assigned.
   */
  defaultSharePermission?: DefaultSharePermission;
  /**
   * Indicates the directory service used. Note that this enum may be extended in the future.
   */
  directoryServiceOptions: DirectoryServiceOptions;
  /**
   * Required for Managed Identities access using OAuth over SMB.
   */
  smbOAuthSettings?: SmbOAuthSettings;
}

/**
 * Input type for Settings for Azure Files identity based authentication.
 */
export interface AzureFilesIdentityBasedAuthenticationInput extends InputOf<AzureFilesIdentityBasedAuthentication> {
  /**
   * Additional information about the directory service. Required if directoryServiceOptions is AD (AD DS authentication). Optional for directoryServiceOptions AADDS (Entra DS authentication) and AADKERB (Entra authentication).
   */
  activeDirectoryProperties?: ActiveDirectoryPropertiesInput | undefined;
  /**
   * Default share permission for users using Kerberos authentication if RBAC role is not assigned.
   */
  defaultSharePermission?: ExpressionOrValue<DefaultSharePermission> | undefined;
  /**
   * Indicates the directory service used. Note that this enum may be extended in the future.
   */
  directoryServiceOptions: ExpressionOrValue<DirectoryServiceOptions>;
  /**
   * Required for Managed Identities access using OAuth over SMB.
   */
  smbOAuthSettings?: SmbOAuthSettingsInput | undefined;
}

/**
 * View type for Settings for Azure Files identity based authentication.
 */
export type AzureFilesIdentityBasedAuthenticationView = AzureFilesIdentityBasedAuthenticationInput;

export const azureFilesIdentityBasedAuthenticationShape: FlatModelShape = createFlatModelShape({
  activeDirectoryProperties: {
    armPath: ["activeDirectoryProperties"],
    value: createDeferredShape(() => activeDirectoryPropertiesShape),
  },
  defaultSharePermission: { armPath: ["defaultSharePermission"], value: createUnionShape() },
  directoryServiceOptions: { armPath: ["directoryServiceOptions"], value: createUnionShape() },
  smbOAuthSettings: {
    armPath: ["smbOAuthSettings"],
    value: createDeferredShape(() => smbOAuthSettingsShape),
  },
});

/**
 * This property defines the creation time based filtering condition. Blob Inventory schema parameter 'Creation-Time' is mandatory with this filter.
 */
export interface BlobInventoryCreationTime {
  /**
   * When set the policy filters the objects that are created in the last N days. Where N is an integer value between 1 to 36500.
   */
  lastNDays?: number;
}

/**
 * Input type for This property defines the creation time based filtering condition. Blob Inventory schema parameter 'Creation-Time' is mandatory with this filter.
 */
export interface BlobInventoryCreationTimeInput extends InputOf<BlobInventoryCreationTime> {
  /**
   * When set the policy filters the objects that are created in the last N days. Where N is an integer value between 1 to 36500.
   */
  lastNDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for This property defines the creation time based filtering condition. Blob Inventory schema parameter 'Creation-Time' is mandatory with this filter.
 */
export type BlobInventoryCreationTimeView = BlobInventoryCreationTimeInput;

export const blobInventoryCreationTimeShape: FlatModelShape = createFlatModelShape({
  lastNDays: { armPath: ["lastNDays"], value: createNumberShape() },
});

/**
 * An object that defines the blob inventory rule.
 */
export interface BlobInventoryPolicyDefinition {
  /**
   * An object that defines the filter set.
   */
  filters?: BlobInventoryPolicyFilter;
  /**
   * This is a required field, it specifies the format for the inventory files.
   */
  format: Format;
  /**
   * This is a required field. This field specifies the scope of the inventory created either at the blob or container level.
   */
  objectType: ObjectType;
  /**
   * This is a required field. This field is used to schedule an inventory formation.
   */
  schedule: Schedule;
  /**
   * This is a required field. This field specifies the fields and properties of the object to be included in the inventory. The Schema field value 'Name' is always required. The valid values for this field for the 'Blob' definition.objectType include 'Name, Creation-Time, Last-Modified, Content-Length, Content-MD5, BlobType, AccessTier, AccessTierChangeTime, AccessTierInferred, Tags, Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, Snapshot, VersionId, IsCurrentVersion, Metadata, LastAccessTime, Tags, Etag, ContentType, ContentEncoding, ContentLanguage, ContentCRC64, CacheControl, ContentDisposition, LeaseStatus, LeaseState, LeaseDuration, ServerEncrypted, Deleted, DeletionId, DeletedTime, RemainingRetentionDays, ImmutabilityPolicyUntilDate, ImmutabilityPolicyMode, LegalHold, CopyId, CopyStatus, CopySource, CopyProgress, CopyCompletionTime, CopyStatusDescription, CustomerProvidedKeySha256, RehydratePriority, ArchiveStatus, XmsBlobSequenceNumber, EncryptionScope, IncrementalCopy, TagCount'. For Blob object type schema field value 'DeletedTime' is applicable only for Hns enabled accounts. The valid values for 'Container' definition.objectType include 'Name, Last-Modified, Metadata, LeaseStatus, LeaseState, LeaseDuration, PublicAccess, HasImmutabilityPolicy, HasLegalHold, Etag, DefaultEncryptionScope, DenyEncryptionScopeOverride, ImmutableStorageWithVersioningEnabled, Deleted, Version, DeletedTime, RemainingRetentionDays'. Schema field values 'Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, DeletionId' are valid only for Hns enabled accounts.Schema field values 'Tags, TagCount' are only valid for Non-Hns accounts.
   */
  schemaFields: string[];
}

/**
 * Input type for An object that defines the blob inventory rule.
 */
export interface BlobInventoryPolicyDefinitionInput extends InputOf<BlobInventoryPolicyDefinition> {
  /**
   * An object that defines the filter set.
   */
  filters?: BlobInventoryPolicyFilterInput | undefined;
  /**
   * This is a required field, it specifies the format for the inventory files.
   */
  format: ExpressionOrValue<Format>;
  /**
   * This is a required field. This field specifies the scope of the inventory created either at the blob or container level.
   */
  objectType: ExpressionOrValue<ObjectType>;
  /**
   * This is a required field. This field is used to schedule an inventory formation.
   */
  schedule: ExpressionOrValue<Schedule>;
  /**
   * This is a required field. This field specifies the fields and properties of the object to be included in the inventory. The Schema field value 'Name' is always required. The valid values for this field for the 'Blob' definition.objectType include 'Name, Creation-Time, Last-Modified, Content-Length, Content-MD5, BlobType, AccessTier, AccessTierChangeTime, AccessTierInferred, Tags, Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, Snapshot, VersionId, IsCurrentVersion, Metadata, LastAccessTime, Tags, Etag, ContentType, ContentEncoding, ContentLanguage, ContentCRC64, CacheControl, ContentDisposition, LeaseStatus, LeaseState, LeaseDuration, ServerEncrypted, Deleted, DeletionId, DeletedTime, RemainingRetentionDays, ImmutabilityPolicyUntilDate, ImmutabilityPolicyMode, LegalHold, CopyId, CopyStatus, CopySource, CopyProgress, CopyCompletionTime, CopyStatusDescription, CustomerProvidedKeySha256, RehydratePriority, ArchiveStatus, XmsBlobSequenceNumber, EncryptionScope, IncrementalCopy, TagCount'. For Blob object type schema field value 'DeletedTime' is applicable only for Hns enabled accounts. The valid values for 'Container' definition.objectType include 'Name, Last-Modified, Metadata, LeaseStatus, LeaseState, LeaseDuration, PublicAccess, HasImmutabilityPolicy, HasLegalHold, Etag, DefaultEncryptionScope, DenyEncryptionScopeOverride, ImmutableStorageWithVersioningEnabled, Deleted, Version, DeletedTime, RemainingRetentionDays'. Schema field values 'Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, DeletionId' are valid only for Hns enabled accounts.Schema field values 'Tags, TagCount' are only valid for Non-Hns accounts.
   */
  schemaFields: InputArray<ExpressionOrValue<string>, string[]>;
}

/**
 * View type for An object that defines the blob inventory rule.
 */
export type BlobInventoryPolicyDefinitionView = BlobInventoryPolicyDefinitionInput;

export const blobInventoryPolicyDefinitionShape: FlatModelShape = createFlatModelShape({
  filters: {
    armPath: ["filters"],
    value: createDeferredShape(() => blobInventoryPolicyFilterShape),
  },
  format: { armPath: ["format"], value: createUnionShape() },
  objectType: { armPath: ["objectType"], value: createUnionShape() },
  schedule: { armPath: ["schedule"], value: createUnionShape() },
  schemaFields: { armPath: ["schemaFields"], value: createArrayShape(createStringShape()) },
});

/**
 * An object that defines the blob inventory rule filter conditions. For 'Blob' definition.objectType all filter properties are applicable, 'blobTypes' is required and others are optional. For 'Container' definition.objectType only prefixMatch is applicable and is optional.
 */
export interface BlobInventoryPolicyFilter {
  /**
   * An array of predefined enum values. Valid values include blockBlob, appendBlob, pageBlob. Hns accounts does not support pageBlobs. This field is required when definition.objectType property is set to 'Blob'.
   */
  blobTypes?: string[];
  /**
   * This property is used to filter objects based on the object creation time
   */
  creationTime?: BlobInventoryCreationTime;
  /**
   * An array of strings with maximum 10 blob prefixes to be excluded from the inventory.
   */
  excludePrefix?: string[];
  /**
   * Includes blob versions in blob inventory when value is set to true. The definition.schemaFields values 'VersionId and IsCurrentVersion' are required if this property is set to true, else they must be excluded.
   */
  includeBlobVersions?: boolean;
  /**
   * For 'Container' definition.objectType the definition.schemaFields must include 'Deleted, Version, DeletedTime and RemainingRetentionDays'. For 'Blob' definition.objectType and HNS enabled storage accounts the definition.schemaFields must include 'DeletionId, Deleted, DeletedTime and RemainingRetentionDays' and for Hns disabled accounts the definition.schemaFields must include 'Deleted and RemainingRetentionDays', else it must be excluded.
   */
  includeDeleted?: boolean;
  /**
   * Includes blob snapshots in blob inventory when value is set to true. The definition.schemaFields value 'Snapshot' is required if this property is set to true, else it must be excluded.
   */
  includeSnapshots?: boolean;
  /**
   * An array of strings with maximum 10 blob prefixes to be included in the inventory.
   */
  prefixMatch?: string[];
}

/**
 * Input type for An object that defines the blob inventory rule filter conditions. For 'Blob' definition.objectType all filter properties are applicable, 'blobTypes' is required and others are optional. For 'Container' definition.objectType only prefixMatch is applicable and is optional.
 */
export interface BlobInventoryPolicyFilterInput extends InputOf<BlobInventoryPolicyFilter> {
  /**
   * An array of predefined enum values. Valid values include blockBlob, appendBlob, pageBlob. Hns accounts does not support pageBlobs. This field is required when definition.objectType property is set to 'Blob'.
   */
  blobTypes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * This property is used to filter objects based on the object creation time
   */
  creationTime?: BlobInventoryCreationTimeInput | undefined;
  /**
   * An array of strings with maximum 10 blob prefixes to be excluded from the inventory.
   */
  excludePrefix?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Includes blob versions in blob inventory when value is set to true. The definition.schemaFields values 'VersionId and IsCurrentVersion' are required if this property is set to true, else they must be excluded.
   */
  includeBlobVersions?: ExpressionOrValue<boolean> | undefined;
  /**
   * For 'Container' definition.objectType the definition.schemaFields must include 'Deleted, Version, DeletedTime and RemainingRetentionDays'. For 'Blob' definition.objectType and HNS enabled storage accounts the definition.schemaFields must include 'DeletionId, Deleted, DeletedTime and RemainingRetentionDays' and for Hns disabled accounts the definition.schemaFields must include 'Deleted and RemainingRetentionDays', else it must be excluded.
   */
  includeDeleted?: ExpressionOrValue<boolean> | undefined;
  /**
   * Includes blob snapshots in blob inventory when value is set to true. The definition.schemaFields value 'Snapshot' is required if this property is set to true, else it must be excluded.
   */
  includeSnapshots?: ExpressionOrValue<boolean> | undefined;
  /**
   * An array of strings with maximum 10 blob prefixes to be included in the inventory.
   */
  prefixMatch?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for An object that defines the blob inventory rule filter conditions. For 'Blob' definition.objectType all filter properties are applicable, 'blobTypes' is required and others are optional. For 'Container' definition.objectType only prefixMatch is applicable and is optional.
 */
export type BlobInventoryPolicyFilterView = BlobInventoryPolicyFilterInput;

export const blobInventoryPolicyFilterShape: FlatModelShape = createFlatModelShape({
  blobTypes: { armPath: ["blobTypes"], value: createArrayShape(createStringShape()) },
  creationTime: {
    armPath: ["creationTime"],
    value: createDeferredShape(() => blobInventoryCreationTimeShape),
  },
  excludePrefix: { armPath: ["excludePrefix"], value: createArrayShape(createStringShape()) },
  includeBlobVersions: { armPath: ["includeBlobVersions"], value: createBooleanShape() },
  includeDeleted: { armPath: ["includeDeleted"], value: createBooleanShape() },
  includeSnapshots: { armPath: ["includeSnapshots"], value: createBooleanShape() },
  prefixMatch: { armPath: ["prefixMatch"], value: createArrayShape(createStringShape()) },
});

/**
 * The storage account blob inventory policy properties.
 */
export interface BlobInventoryPolicyProperties {
  /**
   * Returns the last modified date and time of the blob inventory policy.
   */
  lastModifiedTime?: Date;
  /**
   * The storage account blob inventory policy object. It is composed of policy rules.
   */
  policy: BlobInventoryPolicySchema;
}

/**
 * Input type for The storage account blob inventory policy properties.
 */
export interface BlobInventoryPolicyPropertiesInput extends InputOf<BlobInventoryPolicyProperties> {
  /**
   * The storage account blob inventory policy object. It is composed of policy rules.
   */
  policy: BlobInventoryPolicySchemaInput;
}

/**
 * View type for The storage account blob inventory policy properties.
 */
export interface BlobInventoryPolicyPropertiesView extends InputOf<BlobInventoryPolicyProperties> {
  /**
   * Read-only output: Returns the last modified date and time of the blob inventory policy.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * The storage account blob inventory policy object. It is composed of policy rules.
   */
  policy: BlobInventoryPolicySchemaView;
}

export const blobInventoryPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  policy: { armPath: ["policy"], value: createDeferredShape(() => blobInventoryPolicySchemaShape) },
});

/**
 * An object that wraps the blob inventory rule. Each rule is uniquely defined by name.
 */
export interface BlobInventoryPolicyRule {
  /**
   * An object that defines the blob inventory policy rule.
   */
  definition: BlobInventoryPolicyDefinition;
  /**
   * Container name where blob inventory files are stored. Must be pre-created.
   */
  destination: string;
  /**
   * Rule is enabled when set to true.
   */
  enabled: boolean;
  /**
   * A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.
   */
  name: string;
}

/**
 * Input type for An object that wraps the blob inventory rule. Each rule is uniquely defined by name.
 */
export interface BlobInventoryPolicyRuleInput extends InputOf<BlobInventoryPolicyRule> {
  /**
   * An object that defines the blob inventory policy rule.
   */
  definition: BlobInventoryPolicyDefinitionInput;
  /**
   * Container name where blob inventory files are stored. Must be pre-created.
   */
  destination: ExpressionOrValue<string>;
  /**
   * Rule is enabled when set to true.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.
   */
  name: ExpressionOrValue<string>;
}

/**
 * View type for An object that wraps the blob inventory rule. Each rule is uniquely defined by name.
 */
export type BlobInventoryPolicyRuleView = BlobInventoryPolicyRuleInput;

export const blobInventoryPolicyRuleShape: FlatModelShape = createFlatModelShape({
  definition: {
    armPath: ["definition"],
    value: createDeferredShape(() => blobInventoryPolicyDefinitionShape),
  },
  destination: { armPath: ["destination"], value: createStringShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * The storage account blob inventory policy rules.
 */
export interface BlobInventoryPolicySchema {
  /**
   * Deprecated Property from API version 2021-04-01 onwards, the required destination container name must be specified at the rule level 'policy.rule.destination'
   */
  destination?: string;
  /**
   * Policy is enabled if set to true.
   */
  enabled: boolean;
  /**
   * The storage account blob inventory policy rules. The rule is applied when it is enabled.
   */
  rules: BlobInventoryPolicyRule[];
  /**
   * The valid value is Inventory
   */
  type: InventoryRuleType;
}

/**
 * Input type for The storage account blob inventory policy rules.
 */
export interface BlobInventoryPolicySchemaInput extends InputOf<BlobInventoryPolicySchema> {
  /**
   * Policy is enabled if set to true.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * The storage account blob inventory policy rules. The rule is applied when it is enabled.
   */
  rules: InputArray<BlobInventoryPolicyRuleInput, BlobInventoryPolicyRule[]>;
  /**
   * The valid value is Inventory
   */
  type: ExpressionOrValue<InventoryRuleType>;
}

/**
 * View type for The storage account blob inventory policy rules.
 */
export interface BlobInventoryPolicySchemaView extends InputOf<BlobInventoryPolicySchema> {
  /**
   * Read-only output: Deprecated Property from API version 2021-04-01 onwards, the required destination container name must be specified at the rule level 'policy.rule.destination'
   */
  readonly destination?: Expression<string> | undefined;
  /**
   * Policy is enabled if set to true.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * The storage account blob inventory policy rules. The rule is applied when it is enabled.
   */
  rules: InputArray<BlobInventoryPolicyRuleView, BlobInventoryPolicyRule[]>;
  /**
   * The valid value is Inventory
   */
  type: ExpressionOrValue<InventoryRuleType>;
}

export const blobInventoryPolicySchemaShape: FlatModelShape = createFlatModelShape({
  destination: { armPath: ["destination"], value: createStringShape(), readOnly: true },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => blobInventoryPolicyRuleShape)),
  },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Blob restore parameters
 */
export interface BlobRestoreParameters {
  /**
   * Blob ranges to restore.
   */
  blobRanges?: BlobRestoreRange[];
  /**
   * Restore blob to the specified time.
   */
  timeToRestore?: Date;
}

/**
 * Input type for Blob restore parameters
 */
export interface BlobRestoreParametersInput extends InputOf<BlobRestoreParameters> {}

/**
 * View type for Blob restore parameters
 */
export interface BlobRestoreParametersView extends InputOf<BlobRestoreParameters> {
  /**
   * Read-only output: Blob ranges to restore.
   */
  readonly blobRanges?: Expression<BlobRestoreRange[]> | undefined;
  /**
   * Read-only output: Restore blob to the specified time.
   */
  readonly timeToRestore?: Expression<Date> | undefined;
}

export const blobRestoreParametersShape: FlatModelShape = createFlatModelShape({
  blobRanges: {
    armPath: ["blobRanges"],
    value: createArrayShape(createDeferredShape(() => blobRestoreRangeShape)),
    readOnly: true,
  },
  timeToRestore: {
    armPath: ["timeToRestore"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * Blob range
 */
export interface BlobRestoreRange {
  /**
   * Blob end range. This is exclusive. Empty means account end.
   */
  endRange?: string;
  /**
   * Blob start range. This is inclusive. Empty means account start.
   */
  startRange?: string;
}

/**
 * Input type for Blob range
 */
export interface BlobRestoreRangeInput extends InputOf<BlobRestoreRange> {}

/**
 * View type for Blob range
 */
export interface BlobRestoreRangeView extends InputOf<BlobRestoreRange> {
  /**
   * Read-only output: Blob end range. This is exclusive. Empty means account end.
   */
  readonly endRange?: Expression<string> | undefined;
  /**
   * Read-only output: Blob start range. This is inclusive. Empty means account start.
   */
  readonly startRange?: Expression<string> | undefined;
}

export const blobRestoreRangeShape: FlatModelShape = createFlatModelShape({
  endRange: { armPath: ["endRange"], value: createStringShape(), readOnly: true },
  startRange: { armPath: ["startRange"], value: createStringShape(), readOnly: true },
});

/**
 * Blob restore status.
 */
export interface BlobRestoreStatus {
  /**
   * Failure reason when blob restore is failed.
   */
  failureReason?: string;
  /**
   * Blob restore request parameters.
   */
  parameters?: BlobRestoreParameters;
  /**
   * Id for tracking blob restore request.
   */
  restoreId?: string;
  /**
   * The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed.
   */
  status?: BlobRestoreProgressStatus;
}

/**
 * Input type for Blob restore status.
 */
export interface BlobRestoreStatusInput extends InputOf<BlobRestoreStatus> {}

/**
 * View type for Blob restore status.
 */
export interface BlobRestoreStatusView extends InputOf<BlobRestoreStatus> {
  /**
   * Read-only output: Failure reason when blob restore is failed.
   */
  readonly failureReason?: Expression<string> | undefined;
  /**
   * Read-only output: Blob restore request parameters.
   */
  readonly parameters?: Expression<BlobRestoreParameters> | undefined;
  /**
   * Read-only output: Id for tracking blob restore request.
   */
  readonly restoreId?: Expression<string> | undefined;
  /**
   * Read-only output: The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed.
   */
  readonly status?: Expression<BlobRestoreProgressStatus> | undefined;
}

export const blobRestoreStatusShape: FlatModelShape = createFlatModelShape({
  failureReason: { armPath: ["failureReason"], value: createStringShape(), readOnly: true },
  parameters: {
    armPath: ["parameters"],
    value: createDeferredShape(() => blobRestoreParametersShape),
    readOnly: true,
  },
  restoreId: { armPath: ["restoreId"], value: createStringShape(), readOnly: true },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * The properties of a storage account’s Blob service.
 */
export interface BlobServicePropertiesProperties {
  /**
   * Deprecated in favor of isVersioningEnabled property.
   */
  automaticSnapshotPolicyEnabled?: boolean;
  /**
   * The blob service properties for change feed events.
   */
  changeFeed?: ChangeFeed;
  /**
   * The blob service properties for container soft delete.
   */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /**
   * Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service.
   */
  cors?: CorsRules;
  /**
   * DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions.
   */
  defaultServiceVersion?: string;
  /**
   * The blob service properties for blob soft delete.
   */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
  /**
   * Versioning is enabled if set to true.
   */
  isVersioningEnabled?: boolean;
  /**
   * The blob service property to configure last access time based tracking policy.
   */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicy;
  /**
   * The blob service properties for blob restore policy.
   */
  restorePolicy?: RestorePolicyProperties;
  /**
   * The static website properties for blob storage.
   */
  staticWebsite?: StaticWebsite;
}

/**
 * Input type for The properties of a storage account’s Blob service.
 */
export interface BlobServicePropertiesPropertiesInput extends InputOf<BlobServicePropertiesProperties> {
  /**
   * Deprecated in favor of isVersioningEnabled property.
   */
  automaticSnapshotPolicyEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The blob service properties for change feed events.
   */
  changeFeed?: ChangeFeedInput | undefined;
  /**
   * The blob service properties for container soft delete.
   */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicyInput | undefined;
  /**
   * Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service.
   */
  cors?: CorsRulesInput | undefined;
  /**
   * DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions.
   */
  defaultServiceVersion?: ExpressionOrValue<string> | undefined;
  /**
   * The blob service properties for blob soft delete.
   */
  deleteRetentionPolicy?: DeleteRetentionPolicyInput | undefined;
  /**
   * Versioning is enabled if set to true.
   */
  isVersioningEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The blob service property to configure last access time based tracking policy.
   */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicyInput | undefined;
  /**
   * The blob service properties for blob restore policy.
   */
  restorePolicy?: RestorePolicyPropertiesInput | undefined;
  /**
   * The static website properties for blob storage.
   */
  staticWebsite?: StaticWebsiteInput | undefined;
}

/**
 * View type for The properties of a storage account’s Blob service.
 */
export interface BlobServicePropertiesPropertiesView extends InputOf<BlobServicePropertiesProperties> {
  /**
   * Deprecated in favor of isVersioningEnabled property.
   */
  automaticSnapshotPolicyEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The blob service properties for change feed events.
   */
  changeFeed?: ChangeFeedView | undefined;
  /**
   * The blob service properties for container soft delete.
   */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicyView | undefined;
  /**
   * Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service.
   */
  cors?: CorsRulesView | undefined;
  /**
   * DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions.
   */
  defaultServiceVersion?: ExpressionOrValue<string> | undefined;
  /**
   * The blob service properties for blob soft delete.
   */
  deleteRetentionPolicy?: DeleteRetentionPolicyView | undefined;
  /**
   * Versioning is enabled if set to true.
   */
  isVersioningEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The blob service property to configure last access time based tracking policy.
   */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicyView | undefined;
  /**
   * The blob service properties for blob restore policy.
   */
  restorePolicy?: RestorePolicyPropertiesView | undefined;
  /**
   * The static website properties for blob storage.
   */
  staticWebsite?: StaticWebsiteView | undefined;
}

export const blobServicePropertiesPropertiesShape: FlatModelShape = createFlatModelShape({
  automaticSnapshotPolicyEnabled: {
    armPath: ["automaticSnapshotPolicyEnabled"],
    value: createBooleanShape(),
  },
  changeFeed: { armPath: ["changeFeed"], value: createDeferredShape(() => changeFeedShape) },
  containerDeleteRetentionPolicy: {
    armPath: ["containerDeleteRetentionPolicy"],
    value: createDeferredShape(() => deleteRetentionPolicyShape),
  },
  cors: { armPath: ["cors"], value: createDeferredShape(() => corsRulesShape) },
  defaultServiceVersion: { armPath: ["defaultServiceVersion"], value: createStringShape() },
  deleteRetentionPolicy: {
    armPath: ["deleteRetentionPolicy"],
    value: createDeferredShape(() => deleteRetentionPolicyShape),
  },
  isVersioningEnabled: { armPath: ["isVersioningEnabled"], value: createBooleanShape() },
  lastAccessTimeTrackingPolicy: {
    armPath: ["lastAccessTimeTrackingPolicy"],
    value: createDeferredShape(() => lastAccessTimeTrackingPolicyShape),
  },
  restorePolicy: {
    armPath: ["restorePolicy"],
    value: createDeferredShape(() => restorePolicyPropertiesShape),
  },
  staticWebsite: {
    armPath: ["staticWebsite"],
    value: createDeferredShape(() => staticWebsiteShape),
  },
});

/**
 * Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account.
 */
export interface BurstingConstants {
  /**
   * The guaranteed floor of burst IOPS for small file shares.
   */
  burstFloorIops?: number;
  /**
   * The scalar against provisioned IOPS in the file share included burst IOPS formula.
   */
  burstIoScalar?: number;
  /**
   * The time frame for bursting in seconds in the file share maximum burst credits for IOPS formula.
   */
  burstTimeframeSeconds?: number;
}

/**
 * Input type for Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account.
 */
export interface BurstingConstantsInput extends InputOf<BurstingConstants> {}

/**
 * View type for Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account.
 */
export interface BurstingConstantsView extends InputOf<BurstingConstants> {
  /**
   * Read-only output: The guaranteed floor of burst IOPS for small file shares.
   */
  readonly burstFloorIops?: Expression<number> | undefined;
  /**
   * Read-only output: The scalar against provisioned IOPS in the file share included burst IOPS formula.
   */
  readonly burstIoScalar?: Expression<number> | undefined;
  /**
   * Read-only output: The time frame for bursting in seconds in the file share maximum burst credits for IOPS formula.
   */
  readonly burstTimeframeSeconds?: Expression<number> | undefined;
}

export const burstingConstantsShape: FlatModelShape = createFlatModelShape({
  burstFloorIops: { armPath: ["burstFloorIOPS"], value: createNumberShape(), readOnly: true },
  burstIoScalar: { armPath: ["burstIOScalar"], value: createNumberShape(), readOnly: true },
  burstTimeframeSeconds: {
    armPath: ["burstTimeframeSeconds"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * The blob service properties for change feed events.
 */
export interface ChangeFeed {
  /**
   * Indicates whether change feed event logging is enabled for the Blob service.
   */
  enabled?: boolean;
  /**
   * Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed.
   */
  retentionInDays?: number;
}

/**
 * Input type for The blob service properties for change feed events.
 */
export interface ChangeFeedInput extends InputOf<ChangeFeed> {
  /**
   * Indicates whether change feed event logging is enabled for the Blob service.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed.
   */
  retentionInDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The blob service properties for change feed events.
 */
export type ChangeFeedView = ChangeFeedInput;

export const changeFeedShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  retentionInDays: { armPath: ["retentionInDays"], value: createNumberShape() },
});

/**
 * The properties of a container.
 */
export interface ContainerProperties {
  /**
   * Default the container to use specified encryption scope for all writes.
   */
  defaultEncryptionScope?: string;
  /**
   * Indicates whether the blob container was deleted.
   */
  deleted?: boolean;
  /**
   * Blob container deletion time.
   */
  deletedTime?: Date;
  /**
   * Block override of encryption scope from the container default.
   */
  denyEncryptionScopeOverride?: boolean;
  /**
   * Enable NFSv3 all squash on blob container.
   */
  enableNfsV3AllSquash?: boolean;
  /**
   * Enable NFSv3 root squash on blob container.
   */
  enableNfsV3RootSquash?: boolean;
  /**
   * The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container.
   */
  hasImmutabilityPolicy?: boolean;
  /**
   * The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account.
   */
  hasLegalHold?: boolean;
  /**
   * The ImmutabilityPolicy property of the container.
   */
  immutabilityPolicy?: ImmutabilityPolicyProperties;
  /**
   * The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process.
   */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioning;
  /**
   * Returns the date and time the container was last modified.
   */
  lastModifiedTime?: Date;
  /**
   * Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased.
   */
  leaseDuration?: LeaseDuration;
  /**
   * Lease state of the container.
   */
  leaseState?: LeaseState;
  /**
   * The lease status of the container.
   */
  leaseStatus?: LeaseStatus;
  /**
   * The LegalHold property of the container.
   */
  legalHold?: LegalHoldProperties;
  /**
   * A name-value pair to associate with the container as metadata.
   */
  metadata?: Record<string, string>;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access.
   */
  publicAccess?: PublicAccess;
  /**
   * Remaining retention days for soft deleted blob container.
   */
  remainingRetentionDays?: number;
  /**
   * The version of the deleted blob container.
   */
  version?: string;
}

/**
 * Input type for The properties of a container.
 */
export interface ContainerPropertiesInput extends InputOf<ContainerProperties> {
  /**
   * Default the container to use specified encryption scope for all writes.
   */
  defaultEncryptionScope?: ExpressionOrValue<string> | undefined;
  /**
   * Block override of encryption scope from the container default.
   */
  denyEncryptionScopeOverride?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enable NFSv3 all squash on blob container.
   */
  enableNfsV3AllSquash?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enable NFSv3 root squash on blob container.
   */
  enableNfsV3RootSquash?: ExpressionOrValue<boolean> | undefined;
  /**
   * The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process.
   */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioningInput | undefined;
  /**
   * A name-value pair to associate with the container as metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access.
   */
  publicAccess?: ExpressionOrValue<PublicAccess> | undefined;
}

/**
 * View type for The properties of a container.
 */
export interface ContainerPropertiesView extends InputOf<ContainerProperties> {
  /**
   * Default the container to use specified encryption scope for all writes.
   */
  defaultEncryptionScope?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Indicates whether the blob container was deleted.
   */
  readonly deleted?: Expression<boolean> | undefined;
  /**
   * Read-only output: Blob container deletion time.
   */
  readonly deletedTime?: Expression<Date> | undefined;
  /**
   * Block override of encryption scope from the container default.
   */
  denyEncryptionScopeOverride?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enable NFSv3 all squash on blob container.
   */
  enableNfsV3AllSquash?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enable NFSv3 root squash on blob container.
   */
  enableNfsV3RootSquash?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container.
   */
  readonly hasImmutabilityPolicy?: Expression<boolean> | undefined;
  /**
   * Read-only output: The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account.
   */
  readonly hasLegalHold?: Expression<boolean> | undefined;
  /**
   * Read-only output: The ImmutabilityPolicy property of the container.
   */
  readonly immutabilityPolicy?: Expression<ImmutabilityPolicyProperties> | undefined;
  /**
   * The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process.
   */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioningView | undefined;
  /**
   * Read-only output: Returns the date and time the container was last modified.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased.
   */
  readonly leaseDuration?: Expression<LeaseDuration> | undefined;
  /**
   * Read-only output: Lease state of the container.
   */
  readonly leaseState?: Expression<LeaseState> | undefined;
  /**
   * Read-only output: The lease status of the container.
   */
  readonly leaseStatus?: Expression<LeaseStatus> | undefined;
  /**
   * Read-only output: The LegalHold property of the container.
   */
  readonly legalHold?: Expression<LegalHoldProperties> | undefined;
  /**
   * A name-value pair to associate with the container as metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access.
   */
  publicAccess?: ExpressionOrValue<PublicAccess> | undefined;
  /**
   * Read-only output: Remaining retention days for soft deleted blob container.
   */
  readonly remainingRetentionDays?: Expression<number> | undefined;
  /**
   * Read-only output: The version of the deleted blob container.
   */
  readonly version?: Expression<string> | undefined;
}

export const containerPropertiesShape: FlatModelShape = createFlatModelShape({
  defaultEncryptionScope: { armPath: ["defaultEncryptionScope"], value: createStringShape() },
  deleted: { armPath: ["deleted"], value: createBooleanShape(), readOnly: true },
  deletedTime: {
    armPath: ["deletedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  denyEncryptionScopeOverride: {
    armPath: ["denyEncryptionScopeOverride"],
    value: createBooleanShape(),
  },
  enableNfsV3AllSquash: { armPath: ["enableNfsV3AllSquash"], value: createBooleanShape() },
  enableNfsV3RootSquash: { armPath: ["enableNfsV3RootSquash"], value: createBooleanShape() },
  hasImmutabilityPolicy: {
    armPath: ["hasImmutabilityPolicy"],
    value: createBooleanShape(),
    readOnly: true,
  },
  hasLegalHold: { armPath: ["hasLegalHold"], value: createBooleanShape(), readOnly: true },
  immutabilityPolicy: {
    armPath: ["immutabilityPolicy"],
    value: createDeferredShape(() => immutabilityPolicyPropertiesShape),
    readOnly: true,
  },
  immutableStorageWithVersioning: {
    armPath: ["immutableStorageWithVersioning"],
    value: createDeferredShape(() => immutableStorageWithVersioningShape),
  },
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  leaseDuration: { armPath: ["leaseDuration"], value: createUnionShape(), readOnly: true },
  leaseState: { armPath: ["leaseState"], value: createUnionShape(), readOnly: true },
  leaseStatus: { armPath: ["leaseStatus"], value: createUnionShape(), readOnly: true },
  legalHold: {
    armPath: ["legalHold"],
    value: createDeferredShape(() => legalHoldPropertiesShape),
    readOnly: true,
  },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  publicAccess: { armPath: ["publicAccess"], value: createEnumShape() },
  remainingRetentionDays: {
    armPath: ["remainingRetentionDays"],
    value: createNumberShape(),
    readOnly: true,
  },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * Specifies a CORS rule for the Blob service.
 */
export interface CorsRule {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: string[];
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: AllowedMethods[];
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: string[];
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: string[];
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: number;
}

/**
 * Input type for Specifies a CORS rule for the Blob service.
 */
export interface CorsRuleInput extends InputOf<CorsRule> {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: InputArray<ExpressionOrValue<AllowedMethods>, AllowedMethods[]>;
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: ExpressionOrValue<number>;
}

/**
 * View type for Specifies a CORS rule for the Blob service.
 */
export type CorsRuleView = CorsRuleInput;

export const corsRuleShape: FlatModelShape = createFlatModelShape({
  allowedHeaders: { armPath: ["allowedHeaders"], value: createArrayShape(createStringShape()) },
  allowedMethods: { armPath: ["allowedMethods"], value: createArrayShape(createUnionShape()) },
  allowedOrigins: { armPath: ["allowedOrigins"], value: createArrayShape(createStringShape()) },
  exposedHeaders: { armPath: ["exposedHeaders"], value: createArrayShape(createStringShape()) },
  maxAgeInSeconds: { armPath: ["maxAgeInSeconds"], value: createNumberShape() },
});

/**
 * Sets the CORS rules. You can include up to five CorsRule elements in the request.
 */
export interface CorsRules {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: CorsRule[];
}

/**
 * Input type for Sets the CORS rules. You can include up to five CorsRule elements in the request.
 */
export interface CorsRulesInput extends InputOf<CorsRules> {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: InputArray<CorsRuleInput, CorsRule[]> | undefined;
}

/**
 * View type for Sets the CORS rules. You can include up to five CorsRule elements in the request.
 */
export type CorsRulesView = CorsRulesInput;

export const corsRulesShape: FlatModelShape = createFlatModelShape({
  corsRules: {
    armPath: ["corsRules"],
    value: createArrayShape(createDeferredShape(() => corsRuleShape)),
  },
});

/**
 * The custom domain assigned to this storage account. This can be set via Update.
 */
export interface CustomDomain {
  /**
   * Gets or sets the custom domain name assigned to the storage account. Name is the CNAME source.
   */
  name: string;
  /**
   * Indicates whether indirect CName validation is enabled. Default value is false. This should only be set on updates.
   */
  useSubDomainName?: boolean;
}

/**
 * Input type for The custom domain assigned to this storage account. This can be set via Update.
 */
export interface CustomDomainInput extends InputOf<CustomDomain> {
  /**
   * Gets or sets the custom domain name assigned to the storage account. Name is the CNAME source.
   */
  name: ExpressionOrValue<string>;
  /**
   * Indicates whether indirect CName validation is enabled. Default value is false. This should only be set on updates.
   */
  useSubDomainName?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The custom domain assigned to this storage account. This can be set via Update.
 */
export type CustomDomainView = CustomDomainInput;

export const customDomainShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  useSubDomainName: { armPath: ["useSubDomainName"], value: createBooleanShape() },
});

/**
 * The connection details for Data Share source
 */
export interface DataShareConnection {
  /**
   * The URI of the backing DataShare. Must be in the format: azds://<region>:<DataShareName>:<DataShareIdentifier>
   */
  dataShareUri: string;
  /**
   * The type for data share connection
   *
   * Selects this variant. Must be "DataShare".
   */
  type: "DataShare";
}

/**
 * Input type for The connection details for Data Share source
 */
export interface DataShareConnectionInput extends InputOf<DataShareConnection> {
  /**
   * The URI of the backing DataShare. Must be in the format: azds://<region>:<DataShareName>:<DataShareIdentifier>
   */
  dataShareUri: ExpressionOrValue<string>;
  /**
   * The type for data share connection
   *
   * Selects this variant. Must be "DataShare".
   */
  type: "DataShare";
}

/**
 * View type for The connection details for Data Share source
 */
export type DataShareConnectionView = DataShareConnectionInput;

export const dataShareConnectionShape: FlatModelShape = createFlatModelShape({
  dataShareUri: { armPath: ["dataShareUri"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * The properties of data share source
 */
export interface DataShareSource {
  /**
   * Details for how to authenticate to the backing data store.
   */
  authProperties: StorageConnectorAuthProperties;
  /**
   * Details for how to connect to the backing data store.
   */
  connection: StorageConnectorConnection;
  /**
   * The type for data share source
   *
   * Selects this variant. Must be "DataShare".
   */
  type: "DataShare";
}

/**
 * Input type for The properties of data share source
 */
export interface DataShareSourceInput extends InputOf<DataShareSource> {
  /**
   * Details for how to authenticate to the backing data store.
   */
  authProperties: StorageConnectorAuthPropertiesInput;
  /**
   * Details for how to connect to the backing data store.
   */
  connection: StorageConnectorConnectionInput;
  /**
   * The type for data share source
   *
   * Selects this variant. Must be "DataShare".
   */
  type: "DataShare";
}

/**
 * View type for The properties of data share source
 */
export type DataShareSourceView = DataShareSourceInput;

export const dataShareSourceShape: FlatModelShape = createFlatModelShape({
  authProperties: {
    armPath: ["authProperties"],
    value: createDeferredShape(() => storageConnectorAuthPropertiesShape),
  },
  connection: {
    armPath: ["connection"],
    value: createDeferredShape(() => storageConnectorConnectionShape),
  },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Object to define snapshot and version action conditions.
 */
export interface DateAfterCreation {
  /**
   * Value indicating the age in days after creation
   */
  daysAfterCreationGreaterThan: number;
  /**
   * Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterCreationGreaterThan to be set for snapshots and blob version based actions. The blob will be archived if both the conditions are satisfied.
   */
  daysAfterLastTierChangeGreaterThan?: number;
}

/**
 * Input type for Object to define snapshot and version action conditions.
 */
export interface DateAfterCreationInput extends InputOf<DateAfterCreation> {
  /**
   * Value indicating the age in days after creation
   */
  daysAfterCreationGreaterThan: ExpressionOrValue<number>;
  /**
   * Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterCreationGreaterThan to be set for snapshots and blob version based actions. The blob will be archived if both the conditions are satisfied.
   */
  daysAfterLastTierChangeGreaterThan?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Object to define snapshot and version action conditions.
 */
export type DateAfterCreationView = DateAfterCreationInput;

export const dateAfterCreationShape: FlatModelShape = createFlatModelShape({
  daysAfterCreationGreaterThan: {
    armPath: ["daysAfterCreationGreaterThan"],
    value: createNumberShape(),
  },
  daysAfterLastTierChangeGreaterThan: {
    armPath: ["daysAfterLastTierChangeGreaterThan"],
    value: createNumberShape(),
  },
});

/**
 * Object to define the base blob action conditions. Properties daysAfterModificationGreaterThan, daysAfterLastAccessTimeGreaterThan and daysAfterCreationGreaterThan are mutually exclusive. The daysAfterLastTierChangeGreaterThan property is only applicable for tierToArchive actions which requires daysAfterModificationGreaterThan to be set, also it cannot be used in conjunction with daysAfterLastAccessTimeGreaterThan or daysAfterCreationGreaterThan.
 */
export interface DateAfterModification {
  /**
   * Value indicating the age in days after blob creation.
   */
  daysAfterCreationGreaterThan?: number;
  /**
   * Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy
   */
  daysAfterLastAccessTimeGreaterThan?: number;
  /**
   * Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterModificationGreaterThan to be set for baseBlobs based actions. The blob will be archived if both the conditions are satisfied.
   */
  daysAfterLastTierChangeGreaterThan?: number;
  /**
   * Value indicating the age in days after last modification
   */
  daysAfterModificationGreaterThan?: number;
}

/**
 * Input type for Object to define the base blob action conditions. Properties daysAfterModificationGreaterThan, daysAfterLastAccessTimeGreaterThan and daysAfterCreationGreaterThan are mutually exclusive. The daysAfterLastTierChangeGreaterThan property is only applicable for tierToArchive actions which requires daysAfterModificationGreaterThan to be set, also it cannot be used in conjunction with daysAfterLastAccessTimeGreaterThan or daysAfterCreationGreaterThan.
 */
export interface DateAfterModificationInput extends InputOf<DateAfterModification> {
  /**
   * Value indicating the age in days after blob creation.
   */
  daysAfterCreationGreaterThan?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy
   */
  daysAfterLastAccessTimeGreaterThan?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterModificationGreaterThan to be set for baseBlobs based actions. The blob will be archived if both the conditions are satisfied.
   */
  daysAfterLastTierChangeGreaterThan?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating the age in days after last modification
   */
  daysAfterModificationGreaterThan?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Object to define the base blob action conditions. Properties daysAfterModificationGreaterThan, daysAfterLastAccessTimeGreaterThan and daysAfterCreationGreaterThan are mutually exclusive. The daysAfterLastTierChangeGreaterThan property is only applicable for tierToArchive actions which requires daysAfterModificationGreaterThan to be set, also it cannot be used in conjunction with daysAfterLastAccessTimeGreaterThan or daysAfterCreationGreaterThan.
 */
export type DateAfterModificationView = DateAfterModificationInput;

export const dateAfterModificationShape: FlatModelShape = createFlatModelShape({
  daysAfterCreationGreaterThan: {
    armPath: ["daysAfterCreationGreaterThan"],
    value: createNumberShape(),
  },
  daysAfterLastAccessTimeGreaterThan: {
    armPath: ["daysAfterLastAccessTimeGreaterThan"],
    value: createNumberShape(),
  },
  daysAfterLastTierChangeGreaterThan: {
    armPath: ["daysAfterLastTierChangeGreaterThan"],
    value: createNumberShape(),
  },
  daysAfterModificationGreaterThan: {
    armPath: ["daysAfterModificationGreaterThan"],
    value: createNumberShape(),
  },
});

/**
 * Attributes of a deleted storage account.
 */
export interface DeletedAccountProperties {
  /**
   * Creation time of the deleted account.
   */
  creationTime?: string;
  /**
   * Deletion time of the deleted account.
   */
  deletionTime?: string;
  /**
   * Location of the deleted account.
   */
  location?: string;
  /**
   * Can be used to attempt recovering this deleted account via PutStorageAccount API.
   */
  restoreReference?: string;
  /**
   * Full resource id of the original storage account.
   */
  storageAccountResourceId?: string;
}

/**
 * Input type for Attributes of a deleted storage account.
 */
export interface DeletedAccountPropertiesInput extends InputOf<DeletedAccountProperties> {}

/**
 * View type for Attributes of a deleted storage account.
 */
export interface DeletedAccountPropertiesView extends InputOf<DeletedAccountProperties> {
  /**
   * Read-only output: Creation time of the deleted account.
   */
  readonly creationTime?: Expression<string> | undefined;
  /**
   * Read-only output: Deletion time of the deleted account.
   */
  readonly deletionTime?: Expression<string> | undefined;
  /**
   * Read-only output: Location of the deleted account.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Can be used to attempt recovering this deleted account via PutStorageAccount API.
   */
  readonly restoreReference?: Expression<string> | undefined;
  /**
   * Read-only output: Full resource id of the original storage account.
   */
  readonly storageAccountResourceId?: Expression<string> | undefined;
}

export const deletedAccountPropertiesShape: FlatModelShape = createFlatModelShape({
  creationTime: { armPath: ["creationTime"], value: createStringShape(), readOnly: true },
  deletionTime: { armPath: ["deletionTime"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  restoreReference: { armPath: ["restoreReference"], value: createStringShape(), readOnly: true },
  storageAccountResourceId: {
    armPath: ["storageAccountResourceId"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * The service properties for soft delete.
 */
export interface DeleteRetentionPolicy {
  /**
   * This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share.
   */
  allowPermanentDelete?: boolean;
  /**
   * Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.
   */
  days?: number;
  /**
   * Indicates whether DeleteRetentionPolicy is enabled.
   */
  enabled?: boolean;
}

/**
 * Input type for The service properties for soft delete.
 */
export interface DeleteRetentionPolicyInput extends InputOf<DeleteRetentionPolicy> {
  /**
   * This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share.
   */
  allowPermanentDelete?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.
   */
  days?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates whether DeleteRetentionPolicy is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The service properties for soft delete.
 */
export type DeleteRetentionPolicyView = DeleteRetentionPolicyInput;

export const deleteRetentionPolicyShape: FlatModelShape = createFlatModelShape({
  allowPermanentDelete: { armPath: ["allowPermanentDelete"], value: createBooleanShape() },
  days: { armPath: ["days"], value: createNumberShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
});

/**
 * Dual-stack endpoint preference defines whether IPv6 endpoints are going to be published.
 */
export interface DualStackEndpointPreference {
  /**
   * A boolean flag which indicates whether IPv6 storage endpoints are to be published.
   */
  publishIpv6Endpoint?: boolean;
}

/**
 * Input type for Dual-stack endpoint preference defines whether IPv6 endpoints are going to be published.
 */
export interface DualStackEndpointPreferenceInput extends InputOf<DualStackEndpointPreference> {
  /**
   * A boolean flag which indicates whether IPv6 storage endpoints are to be published.
   */
  publishIpv6Endpoint?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Dual-stack endpoint preference defines whether IPv6 endpoints are going to be published.
 */
export type DualStackEndpointPreferenceView = DualStackEndpointPreferenceInput;

export const dualStackEndpointPreferenceShape: FlatModelShape = createFlatModelShape({
  publishIpv6Endpoint: { armPath: ["publishIpv6Endpoint"], value: createBooleanShape() },
});

/**
 * The encryption settings on the storage account.
 */
export interface Encryption {
  /**
   * The identity to be used with service-side encryption at rest.
   */
  encryptionIdentity?: EncryptionIdentity;
  /**
   * The encryption keySource (provider). Possible values (case-insensitive): Microsoft.Storage, Microsoft.Keyvault
   */
  keySource?: KeySource;
  /**
   * Properties provided by key vault.
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: boolean;
  /**
   * List of services which support encryption.
   */
  services?: EncryptionServices;
}

/**
 * Input type for The encryption settings on the storage account.
 */
export interface EncryptionInput extends InputOf<Encryption> {
  /**
   * The identity to be used with service-side encryption at rest.
   */
  encryptionIdentity?: EncryptionIdentityInput | undefined;
  /**
   * The encryption keySource (provider). Possible values (case-insensitive): Microsoft.Storage, Microsoft.Keyvault
   */
  keySource?: ExpressionOrValue<KeySource> | undefined;
  /**
   * Properties provided by key vault.
   */
  keyVaultProperties?: KeyVaultPropertiesInput | undefined;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of services which support encryption.
   */
  services?: EncryptionServicesInput | undefined;
}

/**
 * View type for The encryption settings on the storage account.
 */
export interface EncryptionView extends InputOf<Encryption> {
  /**
   * The identity to be used with service-side encryption at rest.
   */
  encryptionIdentity?: EncryptionIdentityView | undefined;
  /**
   * The encryption keySource (provider). Possible values (case-insensitive): Microsoft.Storage, Microsoft.Keyvault
   */
  keySource?: ExpressionOrValue<KeySource> | undefined;
  /**
   * Properties provided by key vault.
   */
  keyVaultProperties?: KeyVaultPropertiesView | undefined;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of services which support encryption.
   */
  services?: EncryptionServicesView | undefined;
}

export const encryptionShape: FlatModelShape = createFlatModelShape({
  encryptionIdentity: {
    armPath: ["identity"],
    value: createDeferredShape(() => encryptionIdentityShape),
  },
  keySource: { armPath: ["keySource"], value: createUnionShape() },
  keyVaultProperties: {
    armPath: ["keyvaultproperties"],
    value: createDeferredShape(() => keyVaultPropertiesShape),
  },
  requireInfrastructureEncryption: {
    armPath: ["requireInfrastructureEncryption"],
    value: createBooleanShape(),
  },
  services: { armPath: ["services"], value: createDeferredShape(() => encryptionServicesShape) },
});

/**
 * Encryption identity for the storage account.
 */
export interface EncryptionIdentity {
  /**
   * ClientId of the multi-tenant application to be used in conjunction with the user-assigned identity for cross-tenant customer-managed-keys server-side encryption on the storage account.
   */
  encryptionFederatedIdentityClientId?: string;
  /**
   * Resource identifier of the UserAssigned identity to be associated with server-side encryption on the storage account.
   */
  encryptionUserAssignedIdentity?: string;
}

/**
 * Input type for Encryption identity for the storage account.
 */
export interface EncryptionIdentityInput extends InputOf<EncryptionIdentity> {
  /**
   * ClientId of the multi-tenant application to be used in conjunction with the user-assigned identity for cross-tenant customer-managed-keys server-side encryption on the storage account.
   */
  encryptionFederatedIdentityClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Resource identifier of the UserAssigned identity to be associated with server-side encryption on the storage account.
   */
  encryptionUserAssignedIdentity?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Encryption identity for the storage account.
 */
export type EncryptionIdentityView = EncryptionIdentityInput;

export const encryptionIdentityShape: FlatModelShape = createFlatModelShape({
  encryptionFederatedIdentityClientId: {
    armPath: ["federatedIdentityClientId"],
    value: createStringShape(),
  },
  encryptionUserAssignedIdentity: { armPath: ["userAssignedIdentity"], value: createStringShape() },
});

/**
 * Encryption in transit setting.
 */
export interface EncryptionInTransit {
  /**
   * Indicates whether encryption in transit is required
   */
  required?: boolean;
}

/**
 * Input type for Encryption in transit setting.
 */
export interface EncryptionInTransitInput extends InputOf<EncryptionInTransit> {
  /**
   * Indicates whether encryption in transit is required
   */
  required?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Encryption in transit setting.
 */
export type EncryptionInTransitView = EncryptionInTransitInput;

export const encryptionInTransitShape: FlatModelShape = createFlatModelShape({
  required: { armPath: ["required"], value: createBooleanShape() },
});

/**
 * The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
 */
export interface EncryptionScopeKeyVaultProperties {
  /**
   * The object identifier of the current versioned Key Vault Key in use.
   */
  currentVersionedKeyIdentifier?: string;
  /**
   * The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope.
   */
  keyUri?: string;
  /**
   * Timestamp of last rotation of the Key Vault Key.
   */
  lastKeyRotationTimestamp?: Date;
}

/**
 * Input type for The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
 */
export interface EncryptionScopeKeyVaultPropertiesInput extends InputOf<EncryptionScopeKeyVaultProperties> {
  /**
   * The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope.
   */
  keyUri?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
 */
export interface EncryptionScopeKeyVaultPropertiesView extends InputOf<EncryptionScopeKeyVaultProperties> {
  /**
   * Read-only output: The object identifier of the current versioned Key Vault Key in use.
   */
  readonly currentVersionedKeyIdentifier?: Expression<string> | undefined;
  /**
   * The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope.
   */
  keyUri?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Timestamp of last rotation of the Key Vault Key.
   */
  readonly lastKeyRotationTimestamp?: Expression<Date> | undefined;
}

export const encryptionScopeKeyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  currentVersionedKeyIdentifier: {
    armPath: ["currentVersionedKeyIdentifier"],
    value: createStringShape(),
    readOnly: true,
  },
  keyUri: { armPath: ["keyUri"], value: createStringShape() },
  lastKeyRotationTimestamp: {
    armPath: ["lastKeyRotationTimestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * Properties of the encryption scope.
 */
export interface EncryptionScopeProperties {
  /**
   * Gets the creation date and time of the encryption scope in UTC.
   */
  creationTime?: Date;
  /**
   * The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
   */
  keyVaultProperties?: EncryptionScopeKeyVaultProperties;
  /**
   * Gets the last modification date and time of the encryption scope in UTC.
   */
  lastModifiedTime?: Date;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: boolean;
  /**
   * The provider for the encryption scope. Possible values (case-insensitive): Microsoft.Storage, Microsoft.KeyVault.
   */
  source?: EncryptionScopeSource;
  /**
   * The state of the encryption scope. Possible values (case-insensitive): Enabled, Disabled.
   */
  state?: EncryptionScopeState;
}

/**
 * Input type for Properties of the encryption scope.
 */
export interface EncryptionScopePropertiesInput extends InputOf<EncryptionScopeProperties> {
  /**
   * The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
   */
  keyVaultProperties?: EncryptionScopeKeyVaultPropertiesInput | undefined;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * The provider for the encryption scope. Possible values (case-insensitive): Microsoft.Storage, Microsoft.KeyVault.
   */
  source?: ExpressionOrValue<EncryptionScopeSource> | undefined;
  /**
   * The state of the encryption scope. Possible values (case-insensitive): Enabled, Disabled.
   */
  state?: ExpressionOrValue<EncryptionScopeState> | undefined;
}

/**
 * View type for Properties of the encryption scope.
 */
export interface EncryptionScopePropertiesView extends InputOf<EncryptionScopeProperties> {
  /**
   * Read-only output: Gets the creation date and time of the encryption scope in UTC.
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
   */
  keyVaultProperties?: EncryptionScopeKeyVaultPropertiesView | undefined;
  /**
   * Read-only output: Gets the last modification date and time of the encryption scope in UTC.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: ExpressionOrValue<boolean> | undefined;
  /**
   * The provider for the encryption scope. Possible values (case-insensitive): Microsoft.Storage, Microsoft.KeyVault.
   */
  source?: ExpressionOrValue<EncryptionScopeSource> | undefined;
  /**
   * The state of the encryption scope. Possible values (case-insensitive): Enabled, Disabled.
   */
  state?: ExpressionOrValue<EncryptionScopeState> | undefined;
}

export const encryptionScopePropertiesShape: FlatModelShape = createFlatModelShape({
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createDeferredShape(() => encryptionScopeKeyVaultPropertiesShape),
  },
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  requireInfrastructureEncryption: {
    armPath: ["requireInfrastructureEncryption"],
    value: createBooleanShape(),
  },
  source: { armPath: ["source"], value: createUnionShape() },
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * A service that allows server-side encryption to be used.
 */
export interface EncryptionService {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: boolean;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: KeyType;
  /**
   * Gets a rough estimate of the date/time when the encryption was last enabled by the user. Data is encrypted at rest by default today and cannot be disabled.
   */
  lastEnabledTime?: Date;
}

/**
 * Input type for A service that allows server-side encryption to be used.
 */
export interface EncryptionServiceInput extends InputOf<EncryptionService> {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: ExpressionOrValue<KeyType> | undefined;
}

/**
 * View type for A service that allows server-side encryption to be used.
 */
export interface EncryptionServiceView extends InputOf<EncryptionService> {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: ExpressionOrValue<KeyType> | undefined;
  /**
   * Read-only output: Gets a rough estimate of the date/time when the encryption was last enabled by the user. Data is encrypted at rest by default today and cannot be disabled.
   */
  readonly lastEnabledTime?: Expression<Date> | undefined;
}

export const encryptionServiceShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  keyType: { armPath: ["keyType"], value: createUnionShape() },
  lastEnabledTime: {
    armPath: ["lastEnabledTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * A list of services that support encryption.
 */
export interface EncryptionServices {
  /**
   * The encryption function of the blob storage service.
   */
  blob?: EncryptionService;
  /**
   * The encryption function of the file storage service.
   */
  file?: EncryptionService;
  /**
   * The encryption function of the queue storage service.
   */
  queue?: EncryptionService;
  /**
   * The encryption function of the table storage service.
   */
  table?: EncryptionService;
}

/**
 * Input type for A list of services that support encryption.
 */
export interface EncryptionServicesInput extends InputOf<EncryptionServices> {
  /**
   * The encryption function of the blob storage service.
   */
  blob?: EncryptionServiceInput | undefined;
  /**
   * The encryption function of the file storage service.
   */
  file?: EncryptionServiceInput | undefined;
  /**
   * The encryption function of the queue storage service.
   */
  queue?: EncryptionServiceInput | undefined;
  /**
   * The encryption function of the table storage service.
   */
  table?: EncryptionServiceInput | undefined;
}

/**
 * View type for A list of services that support encryption.
 */
export interface EncryptionServicesView extends InputOf<EncryptionServices> {
  /**
   * The encryption function of the blob storage service.
   */
  blob?: EncryptionServiceView | undefined;
  /**
   * The encryption function of the file storage service.
   */
  file?: EncryptionServiceView | undefined;
  /**
   * The encryption function of the queue storage service.
   */
  queue?: EncryptionServiceView | undefined;
  /**
   * The encryption function of the table storage service.
   */
  table?: EncryptionServiceView | undefined;
}

export const encryptionServicesShape: FlatModelShape = createFlatModelShape({
  blob: { armPath: ["blob"], value: createDeferredShape(() => encryptionServiceShape) },
  file: { armPath: ["file"], value: createDeferredShape(() => encryptionServiceShape) },
  queue: { armPath: ["queue"], value: createDeferredShape(() => encryptionServiceShape) },
  table: { armPath: ["table"], value: createDeferredShape(() => encryptionServiceShape) },
});

/**
 * The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object.
 */
export interface Endpoints {
  /**
   * Gets the blob endpoint.
   */
  blob?: string;
  /**
   * Gets the dfs endpoint.
   */
  dfs?: string;
  /**
   * Gets the file endpoint.
   */
  file?: string;
  /**
   * Gets the internet routing storage endpoints
   */
  internetEndpoints?: StorageAccountInternetEndpoints;
  /**
   * Gets the IPv6 storage endpoints.
   */
  ipv6Endpoints?: StorageAccountIpv6Endpoints;
  /**
   * Gets the microsoft routing storage endpoints.
   */
  microsoftEndpoints?: StorageAccountMicrosoftEndpoints;
  /**
   * Gets the queue endpoint.
   */
  queue?: string;
  /**
   * Gets the table endpoint.
   */
  table?: string;
  /**
   * Gets the web endpoint.
   */
  web?: string;
}

/**
 * Input type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object.
 */
export interface EndpointsInput extends InputOf<Endpoints> {}

/**
 * View type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object.
 */
export interface EndpointsView extends InputOf<Endpoints> {
  /**
   * Read-only output: Gets the blob endpoint.
   */
  readonly blob?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the dfs endpoint.
   */
  readonly dfs?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the file endpoint.
   */
  readonly file?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the internet routing storage endpoints
   */
  readonly internetEndpoints?: Expression<StorageAccountInternetEndpoints> | undefined;
  /**
   * Read-only output: Gets the IPv6 storage endpoints.
   */
  readonly ipv6Endpoints?: Expression<StorageAccountIpv6Endpoints> | undefined;
  /**
   * Read-only output: Gets the microsoft routing storage endpoints.
   */
  readonly microsoftEndpoints?: Expression<StorageAccountMicrosoftEndpoints> | undefined;
  /**
   * Read-only output: Gets the queue endpoint.
   */
  readonly queue?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the table endpoint.
   */
  readonly table?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the web endpoint.
   */
  readonly web?: Expression<string> | undefined;
}

export const endpointsShape: FlatModelShape = createFlatModelShape({
  blob: { armPath: ["blob"], value: createStringShape(), readOnly: true },
  dfs: { armPath: ["dfs"], value: createStringShape(), readOnly: true },
  file: { armPath: ["file"], value: createStringShape(), readOnly: true },
  internetEndpoints: {
    armPath: ["internetEndpoints"],
    value: createDeferredShape(() => storageAccountInternetEndpointsShape),
    readOnly: true,
  },
  ipv6Endpoints: {
    armPath: ["ipv6Endpoints"],
    value: createDeferredShape(() => storageAccountIpv6EndpointsShape),
    readOnly: true,
  },
  microsoftEndpoints: {
    armPath: ["microsoftEndpoints"],
    value: createDeferredShape(() => storageAccountMicrosoftEndpointsShape),
    readOnly: true,
  },
  queue: { armPath: ["queue"], value: createStringShape(), readOnly: true },
  table: { armPath: ["table"], value: createStringShape(), readOnly: true },
  web: { armPath: ["web"], value: createStringShape(), readOnly: true },
});

/**
 * Target helps provide filter parameters for the objects in the storage account and forms the execution context for the storage task
 */
export interface ExecutionTarget {
  /**
   * List of object prefixes to be excluded from task execution. If there is a conflict between include and exclude prefixes, the exclude prefix will be the determining factor
   */
  excludePrefix?: string[];
  /**
   * Required list of object prefixes to be included for task execution
   */
  prefix?: string[];
}

/**
 * Input type for Target helps provide filter parameters for the objects in the storage account and forms the execution context for the storage task
 */
export interface ExecutionTargetInput extends InputOf<ExecutionTarget> {
  /**
   * List of object prefixes to be excluded from task execution. If there is a conflict between include and exclude prefixes, the exclude prefix will be the determining factor
   */
  excludePrefix?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Required list of object prefixes to be included for task execution
   */
  prefix?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Target helps provide filter parameters for the objects in the storage account and forms the execution context for the storage task
 */
export type ExecutionTargetView = ExecutionTargetInput;

export const executionTargetShape: FlatModelShape = createFlatModelShape({
  excludePrefix: { armPath: ["excludePrefix"], value: createArrayShape(createStringShape()) },
  prefix: { armPath: ["prefix"], value: createArrayShape(createStringShape()) },
});

/**
 * Execution trigger for storage task assignment
 */
export interface ExecutionTrigger {
  /**
   * The trigger parameters of the storage task assignment execution
   */
  parameters: TriggerParameters;
  /**
   * The trigger type of the storage task assignment execution
   */
  type: TriggerType;
}

/**
 * Input type for Execution trigger for storage task assignment
 */
export interface ExecutionTriggerInput extends InputOf<ExecutionTrigger> {
  /**
   * The trigger parameters of the storage task assignment execution
   */
  parameters: TriggerParametersInput;
  /**
   * The trigger type of the storage task assignment execution
   */
  type: ExpressionOrValue<TriggerType>;
}

/**
 * View type for Execution trigger for storage task assignment
 */
export type ExecutionTriggerView = ExecutionTriggerInput;

export const executionTriggerShape: FlatModelShape = createFlatModelShape({
  parameters: { armPath: ["parameters"], value: createDeferredShape(() => triggerParametersShape) },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * The complex type of the extended location.
 */
export interface ExtendedLocation {
  /**
   * The name of the extended location.
   */
  name?: string;
  /**
   * The type of the extended location.
   */
  type?: ExtendedLocationTypes;
}

/**
 * Input type for The complex type of the extended location.
 */
export interface ExtendedLocationInput extends InputOf<ExtendedLocation> {
  /**
   * The name of the extended location.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The type of the extended location.
   */
  type?: ExpressionOrValue<ExtendedLocationTypes> | undefined;
}

/**
 * View type for The complex type of the extended location.
 */
export type ExtendedLocationView = ExtendedLocationInput;

export const extendedLocationShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * The properties of File services in storage account.
 */
export interface FileServicePropertiesProperties {
  /**
   * Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service.
   */
  cors?: CorsRules;
  /**
   * Protocol settings for file service
   */
  protocolSettings?: ProtocolSettings;
  /**
   * The file service properties for share soft delete.
   */
  shareDeleteRetentionPolicy?: DeleteRetentionPolicy;
}

/**
 * Input type for The properties of File services in storage account.
 */
export interface FileServicePropertiesPropertiesInput extends InputOf<FileServicePropertiesProperties> {
  /**
   * Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service.
   */
  cors?: CorsRulesInput | undefined;
  /**
   * Protocol settings for file service
   */
  protocolSettings?: ProtocolSettingsInput | undefined;
  /**
   * The file service properties for share soft delete.
   */
  shareDeleteRetentionPolicy?: DeleteRetentionPolicyInput | undefined;
}

/**
 * View type for The properties of File services in storage account.
 */
export type FileServicePropertiesPropertiesView = FileServicePropertiesPropertiesInput;

export const fileServicePropertiesPropertiesShape: FlatModelShape = createFlatModelShape({
  cors: { armPath: ["cors"], value: createDeferredShape(() => corsRulesShape) },
  protocolSettings: {
    armPath: ["protocolSettings"],
    value: createDeferredShape(() => protocolSettingsShape),
  },
  shareDeleteRetentionPolicy: {
    armPath: ["shareDeleteRetentionPolicy"],
    value: createDeferredShape(() => deleteRetentionPolicyShape),
  },
});

/**
 * File service usage in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 */
export interface FileServiceUsageProperties {
  /**
   * Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account.
   */
  burstingConstants?: BurstingConstants;
  /**
   * Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account.
   */
  fileShareLimits?: FileShareLimits;
  /**
   * Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account.
   */
  fileShareRecommendations?: FileShareRecommendations;
  /**
   * Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account.
   */
  storageAccountLimits?: AccountLimits;
  /**
   * Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account.
   */
  storageAccountUsage?: AccountUsage;
}

/**
 * Input type for File service usage in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 */
export interface FileServiceUsagePropertiesInput extends InputOf<FileServiceUsageProperties> {}

/**
 * View type for File service usage in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 */
export interface FileServiceUsagePropertiesView extends InputOf<FileServiceUsageProperties> {
  /**
   * Read-only output: Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account.
   */
  readonly burstingConstants?: Expression<BurstingConstants> | undefined;
  /**
   * Read-only output: Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account.
   */
  readonly fileShareLimits?: Expression<FileShareLimits> | undefined;
  /**
   * Read-only output: Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account.
   */
  readonly fileShareRecommendations?: Expression<FileShareRecommendations> | undefined;
  /**
   * Read-only output: Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account.
   */
  readonly storageAccountLimits?: Expression<AccountLimits> | undefined;
  /**
   * Read-only output: Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account.
   */
  readonly storageAccountUsage?: Expression<AccountUsage> | undefined;
}

export const fileServiceUsagePropertiesShape: FlatModelShape = createFlatModelShape({
  burstingConstants: {
    armPath: ["burstingConstants"],
    value: createDeferredShape(() => burstingConstantsShape),
    readOnly: true,
  },
  fileShareLimits: {
    armPath: ["fileShareLimits"],
    value: createDeferredShape(() => fileShareLimitsShape),
    readOnly: true,
  },
  fileShareRecommendations: {
    armPath: ["fileShareRecommendations"],
    value: createDeferredShape(() => fileShareRecommendationsShape),
    readOnly: true,
  },
  storageAccountLimits: {
    armPath: ["storageAccountLimits"],
    value: createDeferredShape(() => accountLimitsShape),
    readOnly: true,
  },
  storageAccountUsage: {
    armPath: ["storageAccountUsage"],
    value: createDeferredShape(() => accountUsageShape),
    readOnly: true,
  },
});

/**
 * Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account.
 */
export interface FileShareLimits {
  /**
   * The bandwidth scalar used for guardrail calculations for a file share in the storage account.
   */
  guardrailBandwidthScalar?: number;
  /**
   * The IO scalar used for guardrail calculations for a file share in the storage account.
   */
  guardrailIoScalar?: number;
  /**
   * The maximum provisioned bandwidth limit in mebibytes per second for a file share in the storage account.
   */
  maxProvisionedBandwidthMiBPerSec?: number;
  /**
   * The maximum provisioned IOPS limit for a file share in the storage account.
   */
  maxProvisionedIops?: number;
  /**
   * The maximum provisioned storage quota limit in gibibytes for a file share in the storage account.
   */
  maxProvisionedStorageGiB?: number;
  /**
   * The minimum provisioned bandwidth limit in mebibytes per second for a file share in the storage account.
   */
  minProvisionedBandwidthMiBPerSec?: number;
  /**
   * The minimum provisioned IOPS limit for a file share in the storage account.
   */
  minProvisionedIops?: number;
  /**
   * The minimum provisioned storage quota limit in gibibytes for a file share in the storage account.
   */
  minProvisionedStorageGiB?: number;
}

/**
 * Input type for Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account.
 */
export interface FileShareLimitsInput extends InputOf<FileShareLimits> {}

/**
 * View type for Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account.
 */
export interface FileShareLimitsView extends InputOf<FileShareLimits> {
  /**
   * Read-only output: The bandwidth scalar used for guardrail calculations for a file share in the storage account.
   */
  readonly guardrailBandwidthScalar?: Expression<number> | undefined;
  /**
   * Read-only output: The IO scalar used for guardrail calculations for a file share in the storage account.
   */
  readonly guardrailIoScalar?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned bandwidth limit in mebibytes per second for a file share in the storage account.
   */
  readonly maxProvisionedBandwidthMiBPerSec?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned IOPS limit for a file share in the storage account.
   */
  readonly maxProvisionedIops?: Expression<number> | undefined;
  /**
   * Read-only output: The maximum provisioned storage quota limit in gibibytes for a file share in the storage account.
   */
  readonly maxProvisionedStorageGiB?: Expression<number> | undefined;
  /**
   * Read-only output: The minimum provisioned bandwidth limit in mebibytes per second for a file share in the storage account.
   */
  readonly minProvisionedBandwidthMiBPerSec?: Expression<number> | undefined;
  /**
   * Read-only output: The minimum provisioned IOPS limit for a file share in the storage account.
   */
  readonly minProvisionedIops?: Expression<number> | undefined;
  /**
   * Read-only output: The minimum provisioned storage quota limit in gibibytes for a file share in the storage account.
   */
  readonly minProvisionedStorageGiB?: Expression<number> | undefined;
}

export const fileShareLimitsShape: FlatModelShape = createFlatModelShape({
  guardrailBandwidthScalar: {
    armPath: ["guardrailBandwidthScalar"],
    value: createNumberShape(),
    readOnly: true,
  },
  guardrailIoScalar: { armPath: ["guardrailIOScalar"], value: createNumberShape(), readOnly: true },
  maxProvisionedBandwidthMiBPerSec: {
    armPath: ["maxProvisionedBandwidthMiBPerSec"],
    value: createNumberShape(),
    readOnly: true,
  },
  maxProvisionedIops: {
    armPath: ["maxProvisionedIOPS"],
    value: createNumberShape(),
    readOnly: true,
  },
  maxProvisionedStorageGiB: {
    armPath: ["maxProvisionedStorageGiB"],
    value: createNumberShape(),
    readOnly: true,
  },
  minProvisionedBandwidthMiBPerSec: {
    armPath: ["minProvisionedBandwidthMiBPerSec"],
    value: createNumberShape(),
    readOnly: true,
  },
  minProvisionedIops: {
    armPath: ["minProvisionedIOPS"],
    value: createNumberShape(),
    readOnly: true,
  },
  minProvisionedStorageGiB: {
    armPath: ["minProvisionedStorageGiB"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * The properties of the file share.
 */
export interface FileShareProperties {
  /**
   * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium.
   */
  accessTier?: ShareAccessTier;
  /**
   * Indicates the last modification time for share access tier.
   */
  accessTierChangeTime?: Date;
  /**
   * Indicates if there is a pending transition for access tier.
   */
  accessTierStatus?: string;
  /**
   * Indicates whether the share was deleted.
   */
  deleted?: boolean;
  /**
   * The deleted time if the share was deleted.
   */
  deletedTime?: Date;
  /**
   * The authentication protocol that is used for the file share. Can only be specified when creating a share.
   */
  enabledProtocols?: EnabledProtocols;
  /**
   * File Share Paid Bursting properties.
   */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBursting;
  /**
   * The calculated burst IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  includedBurstIops?: number;
  /**
   * Returns the date and time the share was last modified.
   */
  lastModifiedTime?: Date;
  /**
   * Specifies whether the lease on a share is of infinite or fixed duration, only when the share is leased.
   */
  leaseDuration?: LeaseDuration;
  /**
   * Lease state of the share.
   */
  leaseState?: LeaseState;
  /**
   * The lease status of the share.
   */
  leaseStatus?: LeaseStatus;
  /**
   * The calculated maximum burst credits for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  maxBurstCreditsForIops?: number;
  /**
   * A name-value pair to associate with the share as metadata.
   */
  metadata?: Record<string, string>;
  /**
   * Returns the next allowed provisioned bandwidth downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  nextAllowedProvisionedBandwidthDowngradeTime?: Date;
  /**
   * Returns the next allowed provisioned IOPS downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  nextAllowedProvisionedIopsDowngradeTime?: Date;
  /**
   * Returns the next allowed provisioned storage size downgrade time for the share. This property is only for file shares created under Files Provisioned v1 SSD and Files Provisioned v2 account type
   */
  nextAllowedQuotaDowngradeTime?: Date;
  /**
   * The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth.
   */
  provisionedBandwidthMibps?: number;
  /**
   * The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS.
   */
  provisionedIops?: number;
  /**
   * Remaining retention days for share that was soft deleted.
   */
  remainingRetentionDays?: number;
  /**
   * The property is for NFS share only. The default is NoRootSquash.
   */
  rootSquash?: RootSquashType;
  /**
   * The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size.
   */
  shareQuota?: number;
  /**
   * The approximate size of the data stored on the share. Note that this value may not include all recently created or recently resized files.
   */
  shareUsageBytes?: number;
  /**
   * List of stored access policies specified on the share.
   */
  signedIdentifiers?: SignedIdentifier[];
  /**
   * Creation time of share snapshot returned in the response of list shares with expand param "snapshots".
   */
  snapshotTime?: Date;
  /**
   * The version of the share.
   */
  version?: string;
}

/**
 * Input type for The properties of the file share.
 */
export interface FileSharePropertiesInput extends InputOf<FileShareProperties> {
  /**
   * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium.
   */
  accessTier?: ExpressionOrValue<ShareAccessTier> | undefined;
  /**
   * The authentication protocol that is used for the file share. Can only be specified when creating a share.
   */
  enabledProtocols?: ExpressionOrValue<EnabledProtocols> | undefined;
  /**
   * File Share Paid Bursting properties.
   */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBurstingInput | undefined;
  /**
   * A name-value pair to associate with the share as metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth.
   */
  provisionedBandwidthMibps?: ExpressionOrValue<number> | undefined;
  /**
   * The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS.
   */
  provisionedIops?: ExpressionOrValue<number> | undefined;
  /**
   * The property is for NFS share only. The default is NoRootSquash.
   */
  rootSquash?: ExpressionOrValue<RootSquashType> | undefined;
  /**
   * The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size.
   */
  shareQuota?: ExpressionOrValue<number> | undefined;
  /**
   * List of stored access policies specified on the share.
   */
  signedIdentifiers?: InputArray<SignedIdentifierInput, SignedIdentifier[]> | undefined;
}

/**
 * View type for The properties of the file share.
 */
export interface FileSharePropertiesView extends InputOf<FileShareProperties> {
  /**
   * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium.
   */
  accessTier?: ExpressionOrValue<ShareAccessTier> | undefined;
  /**
   * Read-only output: Indicates the last modification time for share access tier.
   */
  readonly accessTierChangeTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Indicates if there is a pending transition for access tier.
   */
  readonly accessTierStatus?: Expression<string> | undefined;
  /**
   * Read-only output: Indicates whether the share was deleted.
   */
  readonly deleted?: Expression<boolean> | undefined;
  /**
   * Read-only output: The deleted time if the share was deleted.
   */
  readonly deletedTime?: Expression<Date> | undefined;
  /**
   * The authentication protocol that is used for the file share. Can only be specified when creating a share.
   */
  enabledProtocols?: ExpressionOrValue<EnabledProtocols> | undefined;
  /**
   * File Share Paid Bursting properties.
   */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBurstingView | undefined;
  /**
   * Read-only output: The calculated burst IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  readonly includedBurstIops?: Expression<number> | undefined;
  /**
   * Read-only output: Returns the date and time the share was last modified.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Specifies whether the lease on a share is of infinite or fixed duration, only when the share is leased.
   */
  readonly leaseDuration?: Expression<LeaseDuration> | undefined;
  /**
   * Read-only output: Lease state of the share.
   */
  readonly leaseState?: Expression<LeaseState> | undefined;
  /**
   * Read-only output: The lease status of the share.
   */
  readonly leaseStatus?: Expression<LeaseStatus> | undefined;
  /**
   * Read-only output: The calculated maximum burst credits for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  readonly maxBurstCreditsForIops?: Expression<number> | undefined;
  /**
   * A name-value pair to associate with the share as metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Read-only output: Returns the next allowed provisioned bandwidth downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  readonly nextAllowedProvisionedBandwidthDowngradeTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Returns the next allowed provisioned IOPS downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type.
   */
  readonly nextAllowedProvisionedIopsDowngradeTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Returns the next allowed provisioned storage size downgrade time for the share. This property is only for file shares created under Files Provisioned v1 SSD and Files Provisioned v2 account type
   */
  readonly nextAllowedQuotaDowngradeTime?: Expression<Date> | undefined;
  /**
   * The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth.
   */
  provisionedBandwidthMibps?: ExpressionOrValue<number> | undefined;
  /**
   * The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS.
   */
  provisionedIops?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Remaining retention days for share that was soft deleted.
   */
  readonly remainingRetentionDays?: Expression<number> | undefined;
  /**
   * The property is for NFS share only. The default is NoRootSquash.
   */
  rootSquash?: ExpressionOrValue<RootSquashType> | undefined;
  /**
   * The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size.
   */
  shareQuota?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The approximate size of the data stored on the share. Note that this value may not include all recently created or recently resized files.
   */
  readonly shareUsageBytes?: Expression<number> | undefined;
  /**
   * List of stored access policies specified on the share.
   */
  signedIdentifiers?: InputArray<SignedIdentifierView, SignedIdentifier[]> | undefined;
  /**
   * Read-only output: Creation time of share snapshot returned in the response of list shares with expand param "snapshots".
   */
  readonly snapshotTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The version of the share.
   */
  readonly version?: Expression<string> | undefined;
}

export const fileSharePropertiesShape: FlatModelShape = createFlatModelShape({
  accessTier: { armPath: ["accessTier"], value: createUnionShape() },
  accessTierChangeTime: {
    armPath: ["accessTierChangeTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  accessTierStatus: { armPath: ["accessTierStatus"], value: createStringShape(), readOnly: true },
  deleted: { armPath: ["deleted"], value: createBooleanShape(), readOnly: true },
  deletedTime: {
    armPath: ["deletedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  enabledProtocols: { armPath: ["enabledProtocols"], value: createUnionShape() },
  fileSharePaidBursting: {
    armPath: ["fileSharePaidBursting"],
    value: createDeferredShape(() => fileSharePropertiesFileSharePaidBurstingShape),
  },
  includedBurstIops: { armPath: ["includedBurstIops"], value: createNumberShape(), readOnly: true },
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  leaseDuration: { armPath: ["leaseDuration"], value: createUnionShape(), readOnly: true },
  leaseState: { armPath: ["leaseState"], value: createUnionShape(), readOnly: true },
  leaseStatus: { armPath: ["leaseStatus"], value: createUnionShape(), readOnly: true },
  maxBurstCreditsForIops: {
    armPath: ["maxBurstCreditsForIops"],
    value: createNumberShape(),
    readOnly: true,
  },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  nextAllowedProvisionedBandwidthDowngradeTime: {
    armPath: ["nextAllowedProvisionedBandwidthDowngradeTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc7231",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  nextAllowedProvisionedIopsDowngradeTime: {
    armPath: ["nextAllowedProvisionedIopsDowngradeTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc7231",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  nextAllowedQuotaDowngradeTime: {
    armPath: ["nextAllowedQuotaDowngradeTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc7231",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  provisionedBandwidthMibps: { armPath: ["provisionedBandwidthMibps"], value: createNumberShape() },
  provisionedIops: { armPath: ["provisionedIops"], value: createNumberShape() },
  remainingRetentionDays: {
    armPath: ["remainingRetentionDays"],
    value: createNumberShape(),
    readOnly: true,
  },
  rootSquash: { armPath: ["rootSquash"], value: createUnionShape() },
  shareQuota: { armPath: ["shareQuota"], value: createNumberShape() },
  shareUsageBytes: { armPath: ["shareUsageBytes"], value: createNumberShape(), readOnly: true },
  signedIdentifiers: {
    armPath: ["signedIdentifiers"],
    value: createArrayShape(createDeferredShape(() => signedIdentifierShape)),
  },
  snapshotTime: {
    armPath: ["snapshotTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * File Share Paid Bursting properties.
 */
export interface FileSharePropertiesFileSharePaidBursting {
  /**
   * Indicates whether paid bursting is enabled for the share. This property is only for file shares created under Files Provisioned v1 SSD account type.
   */
  paidBurstingEnabled?: boolean;
  /**
   * The maximum paid bursting bandwidth for the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 10340 which is the maximum allowed bandwidth for a share.
   */
  paidBurstingMaxBandwidthMibps?: number;
  /**
   * The maximum paid bursting IOPS for the share. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 102400 which is the maximum allowed IOPS for a share.
   */
  paidBurstingMaxIops?: number;
}

/**
 * Input type for File Share Paid Bursting properties.
 */
export interface FileSharePropertiesFileSharePaidBurstingInput extends InputOf<FileSharePropertiesFileSharePaidBursting> {
  /**
   * Indicates whether paid bursting is enabled for the share. This property is only for file shares created under Files Provisioned v1 SSD account type.
   */
  paidBurstingEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The maximum paid bursting bandwidth for the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 10340 which is the maximum allowed bandwidth for a share.
   */
  paidBurstingMaxBandwidthMibps?: ExpressionOrValue<number> | undefined;
  /**
   * The maximum paid bursting IOPS for the share. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 102400 which is the maximum allowed IOPS for a share.
   */
  paidBurstingMaxIops?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for File Share Paid Bursting properties.
 */
export type FileSharePropertiesFileSharePaidBurstingView =
  FileSharePropertiesFileSharePaidBurstingInput;

export const fileSharePropertiesFileSharePaidBurstingShape: FlatModelShape = createFlatModelShape({
  paidBurstingEnabled: { armPath: ["paidBurstingEnabled"], value: createBooleanShape() },
  paidBurstingMaxBandwidthMibps: {
    armPath: ["paidBurstingMaxBandwidthMibps"],
    value: createNumberShape(),
  },
  paidBurstingMaxIops: { armPath: ["paidBurstingMaxIops"], value: createNumberShape() },
});

/**
 * Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account.
 */
export interface FileShareRecommendations {
  /**
   * The scalar for bandwidth in the file share provisioned bandwidth recommendation formula.
   */
  bandwidthScalar?: number;
  /**
   * The base bandwidth in the file share provisioned bandwidth recommendation formula.
   */
  baseBandwidthMiBPerSec?: number;
  /**
   * The base IOPS in the file share provisioned IOPS recommendation formula.
   */
  baseIops?: number;
  /**
   * The scalar for IO in the file share provisioned IOPS recommendation formula.
   */
  ioScalar?: number;
}

/**
 * Input type for Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account.
 */
export interface FileShareRecommendationsInput extends InputOf<FileShareRecommendations> {}

/**
 * View type for Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account.
 */
export interface FileShareRecommendationsView extends InputOf<FileShareRecommendations> {
  /**
   * Read-only output: The scalar for bandwidth in the file share provisioned bandwidth recommendation formula.
   */
  readonly bandwidthScalar?: Expression<number> | undefined;
  /**
   * Read-only output: The base bandwidth in the file share provisioned bandwidth recommendation formula.
   */
  readonly baseBandwidthMiBPerSec?: Expression<number> | undefined;
  /**
   * Read-only output: The base IOPS in the file share provisioned IOPS recommendation formula.
   */
  readonly baseIops?: Expression<number> | undefined;
  /**
   * Read-only output: The scalar for IO in the file share provisioned IOPS recommendation formula.
   */
  readonly ioScalar?: Expression<number> | undefined;
}

export const fileShareRecommendationsShape: FlatModelShape = createFlatModelShape({
  bandwidthScalar: { armPath: ["bandwidthScalar"], value: createNumberShape(), readOnly: true },
  baseBandwidthMiBPerSec: {
    armPath: ["baseBandwidthMiBPerSec"],
    value: createNumberShape(),
    readOnly: true,
  },
  baseIops: { armPath: ["baseIOPS"], value: createNumberShape(), readOnly: true },
  ioScalar: { armPath: ["ioScalar"], value: createNumberShape(), readOnly: true },
});

/**
 * Geo Priority Replication enablement status for the storage account.
 */
export interface GeoPriorityReplicationStatus {
  /**
   * Indicates whether Blob Geo Priority Replication is enabled for the storage account.
   */
  isBlobEnabled?: boolean;
}

/**
 * Input type for Geo Priority Replication enablement status for the storage account.
 */
export interface GeoPriorityReplicationStatusInput extends InputOf<GeoPriorityReplicationStatus> {
  /**
   * Indicates whether Blob Geo Priority Replication is enabled for the storage account.
   */
  isBlobEnabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Geo Priority Replication enablement status for the storage account.
 */
export type GeoPriorityReplicationStatusView = GeoPriorityReplicationStatusInput;

export const geoPriorityReplicationStatusShape: FlatModelShape = createFlatModelShape({
  isBlobEnabled: { armPath: ["isBlobEnabled"], value: createBooleanShape() },
});

/**
 * Statistics related to replication for storage account's Blob, Table, Queue and File services. It is only available when geo-redundant replication is enabled for the storage account.
 */
export interface GeoReplicationStats {
  /**
   * A boolean flag which indicates whether or not account failover is supported for the account.
   */
  canFailover?: boolean;
  /**
   * A boolean flag which indicates whether or not planned account failover is supported for the account.
   */
  canPlannedFailover?: boolean;
  /**
   * All primary writes preceding this UTC date/time value are guaranteed to be available for read operations. Primary writes following this point in time may or may not be available for reads. Element may be default value if value of LastSyncTime is not available, this can happen if secondary is offline or we are in bootstrap.
   */
  lastSyncTime?: Date;
  /**
   * The redundancy type of the account after an account failover is performed.
   */
  postFailoverRedundancy?: PostFailoverRedundancy;
  /**
   * The redundancy type of the account after a planned account failover is performed.
   */
  postPlannedFailoverRedundancy?: PostPlannedFailoverRedundancy;
  /**
   * The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable.
   */
  status?: GeoReplicationStatus;
}

/**
 * Input type for Statistics related to replication for storage account's Blob, Table, Queue and File services. It is only available when geo-redundant replication is enabled for the storage account.
 */
export interface GeoReplicationStatsInput extends InputOf<GeoReplicationStats> {}

/**
 * View type for Statistics related to replication for storage account's Blob, Table, Queue and File services. It is only available when geo-redundant replication is enabled for the storage account.
 */
export interface GeoReplicationStatsView extends InputOf<GeoReplicationStats> {
  /**
   * Read-only output: A boolean flag which indicates whether or not account failover is supported for the account.
   */
  readonly canFailover?: Expression<boolean> | undefined;
  /**
   * Read-only output: A boolean flag which indicates whether or not planned account failover is supported for the account.
   */
  readonly canPlannedFailover?: Expression<boolean> | undefined;
  /**
   * Read-only output: All primary writes preceding this UTC date/time value are guaranteed to be available for read operations. Primary writes following this point in time may or may not be available for reads. Element may be default value if value of LastSyncTime is not available, this can happen if secondary is offline or we are in bootstrap.
   */
  readonly lastSyncTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The redundancy type of the account after an account failover is performed.
   */
  readonly postFailoverRedundancy?: Expression<PostFailoverRedundancy> | undefined;
  /**
   * Read-only output: The redundancy type of the account after a planned account failover is performed.
   */
  readonly postPlannedFailoverRedundancy?: Expression<PostPlannedFailoverRedundancy> | undefined;
  /**
   * Read-only output: The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable.
   */
  readonly status?: Expression<GeoReplicationStatus> | undefined;
}

export const geoReplicationStatsShape: FlatModelShape = createFlatModelShape({
  canFailover: { armPath: ["canFailover"], value: createBooleanShape(), readOnly: true },
  canPlannedFailover: {
    armPath: ["canPlannedFailover"],
    value: createBooleanShape(),
    readOnly: true,
  },
  lastSyncTime: {
    armPath: ["lastSyncTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  postFailoverRedundancy: {
    armPath: ["postFailoverRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  postPlannedFailoverRedundancy: {
    armPath: ["postPlannedFailoverRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * Identity for the resource.
 */
export interface Identity {
  /**
   * The principal ID of resource identity.
   */
  principalId?: string;
  /**
   * The tenant ID of resource.
   */
  tenantId?: string;
  /**
   * The identity type.
   */
  type: IdentityType;
  /**
   * Gets or sets a list of key value pairs that describe the set of User Assigned identities that will be used with this storage account. The key is the ARM resource identifier of the identity. Only 1 User Assigned identity is permitted here.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/**
 * Input type for Identity for the resource.
 */
export interface IdentityInput extends InputOf<Identity> {
  /**
   * The identity type.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * Gets or sets a list of key value pairs that describe the set of User Assigned identities that will be used with this storage account. The key is the ARM resource identifier of the identity. Only 1 User Assigned identity is permitted here.
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityInput, Record<string, UserAssignedIdentity>> | undefined;
}

/**
 * View type for Identity for the resource.
 */
export interface IdentityView extends InputOf<Identity> {
  /**
   * Read-only output: The principal ID of resource identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of resource.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The identity type.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * Gets or sets a list of key value pairs that describe the set of User Assigned identities that will be used with this storage account. The key is the ARM resource identifier of the identity. Only 1 User Assigned identity is permitted here.
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityView, Record<string, UserAssignedIdentity>> | undefined;
}

export const identityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyProperties {
  /**
   * ImmutabilityPolicy Etag.
   */
  etag?: string;
  /**
   * The properties of an ImmutabilityPolicy of a blob container.
   */
  properties?: ImmutabilityPolicyProperty;
  /**
   * The ImmutabilityPolicy update history of the blob container.
   */
  updateHistory?: UpdateHistoryProperty[];
}

/**
 * Input type for The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyPropertiesInput extends InputOf<ImmutabilityPolicyProperties> {}

/**
 * View type for The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyPropertiesView extends InputOf<ImmutabilityPolicyProperties> {
  /**
   * Read-only output: ImmutabilityPolicy Etag.
   */
  readonly etag?: Expression<string> | undefined;
  /**
   * Read-only output: The properties of an ImmutabilityPolicy of a blob container.
   */
  readonly properties?: Expression<ImmutabilityPolicyProperty> | undefined;
  /**
   * Read-only output: The ImmutabilityPolicy update history of the blob container.
   */
  readonly updateHistory?: Expression<UpdateHistoryProperty[]> | undefined;
}

export const immutabilityPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => immutabilityPolicyPropertyShape),
    readOnly: true,
  },
  updateHistory: {
    armPath: ["updateHistory"],
    value: createArrayShape(createDeferredShape(() => updateHistoryPropertyShape)),
    readOnly: true,
  },
});

/**
 * The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyProperty {
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  allowProtectedAppendWrites?: boolean;
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  allowProtectedAppendWritesAll?: boolean;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: number;
  /**
   * The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked.
   */
  state?: ImmutabilityPolicyState;
}

/**
 * Input type for The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyPropertyInput extends InputOf<ImmutabilityPolicyProperty> {
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  allowProtectedAppendWrites?: ExpressionOrValue<boolean> | undefined;
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  allowProtectedAppendWritesAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The properties of an ImmutabilityPolicy of a blob container.
 */
export interface ImmutabilityPolicyPropertyView extends InputOf<ImmutabilityPolicyProperty> {
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  allowProtectedAppendWrites?: ExpressionOrValue<boolean> | undefined;
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  allowProtectedAppendWritesAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked.
   */
  readonly state?: Expression<ImmutabilityPolicyState> | undefined;
}

export const immutabilityPolicyPropertyShape: FlatModelShape = createFlatModelShape({
  allowProtectedAppendWrites: {
    armPath: ["allowProtectedAppendWrites"],
    value: createBooleanShape(),
  },
  allowProtectedAppendWritesAll: {
    armPath: ["allowProtectedAppendWritesAll"],
    value: createBooleanShape(),
  },
  immutabilityPeriodSinceCreationInDays: {
    armPath: ["immutabilityPeriodSinceCreationInDays"],
    value: createNumberShape(),
  },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * This property enables and defines account-level immutability. Enabling the feature auto-enables Blob Versioning.
 */
export interface ImmutableStorageAccount {
  /**
   * A boolean flag which enables account-level immutability. All the containers under such an account have object-level immutability enabled by default.
   */
  enabled?: boolean;
  /**
   * Specifies the default account-level immutability policy which is inherited and applied to objects that do not possess an explicit immutability policy at the object level. The object-level immutability policy has higher precedence than the container-level immutability policy, which has a higher precedence than the account-level immutability policy.
   */
  immutabilityPolicy?: AccountImmutabilityPolicyProperties;
}

/**
 * Input type for This property enables and defines account-level immutability. Enabling the feature auto-enables Blob Versioning.
 */
export interface ImmutableStorageAccountInput extends InputOf<ImmutableStorageAccount> {
  /**
   * A boolean flag which enables account-level immutability. All the containers under such an account have object-level immutability enabled by default.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies the default account-level immutability policy which is inherited and applied to objects that do not possess an explicit immutability policy at the object level. The object-level immutability policy has higher precedence than the container-level immutability policy, which has a higher precedence than the account-level immutability policy.
   */
  immutabilityPolicy?: AccountImmutabilityPolicyPropertiesInput | undefined;
}

/**
 * View type for This property enables and defines account-level immutability. Enabling the feature auto-enables Blob Versioning.
 */
export type ImmutableStorageAccountView = ImmutableStorageAccountInput;

export const immutableStorageAccountShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  immutabilityPolicy: {
    armPath: ["immutabilityPolicy"],
    value: createDeferredShape(() => accountImmutabilityPolicyPropertiesShape),
  },
});

/**
 * Object level immutability properties of the container.
 */
export interface ImmutableStorageWithVersioning {
  /**
   * This is an immutable property, when set to true it enables object level immutability at the container level.
   */
  enabled?: boolean;
  /**
   * This property denotes the container level immutability to object level immutability migration state.
   */
  migrationState?: MigrationState;
  /**
   * Returns the date and time the object level immutability was enabled.
   */
  timeStamp?: Date;
}

/**
 * Input type for Object level immutability properties of the container.
 */
export interface ImmutableStorageWithVersioningInput extends InputOf<ImmutableStorageWithVersioning> {
  /**
   * This is an immutable property, when set to true it enables object level immutability at the container level.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Object level immutability properties of the container.
 */
export interface ImmutableStorageWithVersioningView extends InputOf<ImmutableStorageWithVersioning> {
  /**
   * This is an immutable property, when set to true it enables object level immutability at the container level.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: This property denotes the container level immutability to object level immutability migration state.
   */
  readonly migrationState?: Expression<MigrationState> | undefined;
  /**
   * Read-only output: Returns the date and time the object level immutability was enabled.
   */
  readonly timeStamp?: Expression<Date> | undefined;
}

export const immutableStorageWithVersioningShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  migrationState: { armPath: ["migrationState"], value: createUnionShape(), readOnly: true },
  timeStamp: {
    armPath: ["timeStamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * IP rule with specific IP or IP range in CIDR format.
 */
export interface IpRule {
  /**
   * The action of IP ACL rule.
   */
  action?: "Allow";
  /**
   * Specifies the IP or IP range in CIDR format.
   */
  iPAddressOrRange: string;
}

/**
 * Input type for IP rule with specific IP or IP range in CIDR format.
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * The action of IP ACL rule.
   */
  action?: ExpressionOrValue<"Allow"> | undefined;
  /**
   * Specifies the IP or IP range in CIDR format.
   */
  iPAddressOrRange: ExpressionOrValue<string>;
}

/**
 * View type for IP rule with specific IP or IP range in CIDR format.
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createStringLiteralShape() },
  iPAddressOrRange: { armPath: ["value"], value: createStringShape() },
});

/**
 * Storage account keys creation time.
 */
export interface KeyCreationTime {
  key1?: Date;
  key2?: Date;
}

/**
 * Input type for Storage account keys creation time.
 */
export interface KeyCreationTimeInput extends InputOf<KeyCreationTime> {}

/**
 * View type for Storage account keys creation time.
 */
export interface KeyCreationTimeView extends InputOf<KeyCreationTime> {
  readonly key1?: Expression<Date> | undefined;
  readonly key2?: Expression<Date> | undefined;
}

export const keyCreationTimeShape: FlatModelShape = createFlatModelShape({
  key1: {
    armPath: ["key1"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  key2: {
    armPath: ["key2"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * KeyPolicy assigned to the storage account.
 */
export interface KeyPolicy {
  /**
   * The key expiration period in days.
   */
  keyExpirationPeriodInDays: number;
}

/**
 * Input type for KeyPolicy assigned to the storage account.
 */
export interface KeyPolicyInput extends InputOf<KeyPolicy> {
  /**
   * The key expiration period in days.
   */
  keyExpirationPeriodInDays: ExpressionOrValue<number>;
}

/**
 * View type for KeyPolicy assigned to the storage account.
 */
export type KeyPolicyView = KeyPolicyInput;

export const keyPolicyShape: FlatModelShape = createFlatModelShape({
  keyExpirationPeriodInDays: { armPath: ["keyExpirationPeriodInDays"], value: createNumberShape() },
});

/**
 * Properties of key vault.
 */
export interface KeyVaultProperties {
  /**
   * This is a read only property that represents the expiration time of the current version of the customer managed key used for encryption.
   */
  currentVersionedKeyExpirationTimestamp?: Date;
  /**
   * The object identifier of the current versioned Key Vault Key in use.
   */
  currentVersionedKeyIdentifier?: string;
  /**
   * The name of KeyVault key.
   */
  keyName?: string;
  /**
   * The Uri of KeyVault.
   */
  keyVaultUri?: string;
  /**
   * The version of KeyVault key.
   */
  keyVersion?: string;
  /**
   * Timestamp of last rotation of the Key Vault Key.
   */
  lastKeyRotationTimestamp?: Date;
}

/**
 * Input type for Properties of key vault.
 */
export interface KeyVaultPropertiesInput extends InputOf<KeyVaultProperties> {
  /**
   * The name of KeyVault key.
   */
  keyName?: ExpressionOrValue<string> | undefined;
  /**
   * The Uri of KeyVault.
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * The version of KeyVault key.
   */
  keyVersion?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of key vault.
 */
export interface KeyVaultPropertiesView extends InputOf<KeyVaultProperties> {
  /**
   * Read-only output: This is a read only property that represents the expiration time of the current version of the customer managed key used for encryption.
   */
  readonly currentVersionedKeyExpirationTimestamp?: Expression<Date> | undefined;
  /**
   * Read-only output: The object identifier of the current versioned Key Vault Key in use.
   */
  readonly currentVersionedKeyIdentifier?: Expression<string> | undefined;
  /**
   * The name of KeyVault key.
   */
  keyName?: ExpressionOrValue<string> | undefined;
  /**
   * The Uri of KeyVault.
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * The version of KeyVault key.
   */
  keyVersion?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Timestamp of last rotation of the Key Vault Key.
   */
  readonly lastKeyRotationTimestamp?: Expression<Date> | undefined;
}

export const keyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  currentVersionedKeyExpirationTimestamp: {
    armPath: ["currentVersionedKeyExpirationTimestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  currentVersionedKeyIdentifier: {
    armPath: ["currentVersionedKeyIdentifier"],
    value: createStringShape(),
    readOnly: true,
  },
  keyName: { armPath: ["keyname"], value: createStringShape() },
  keyVaultUri: { armPath: ["keyvaulturi"], value: createStringShape() },
  keyVersion: { armPath: ["keyversion"], value: createStringShape() },
  lastKeyRotationTimestamp: {
    armPath: ["lastKeyRotationTimestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * The blob service properties for Last access time based tracking policy.
 */
export interface LastAccessTimeTrackingPolicy {
  /**
   * An array of predefined supported blob types. Only blockBlob is the supported value. This field is currently read only
   */
  blobType?: string[];
  /**
   * When set to true last access time based tracking is enabled.
   */
  enable: boolean;
  /**
   * Name of the policy. The valid value is AccessTimeTracking. This field is currently read only
   */
  name?: Name;
  /**
   * The field specifies blob object tracking granularity in days, typically how often the blob object should be tracked.This field is currently read only with value as 1
   */
  trackingGranularityInDays?: number;
}

/**
 * Input type for The blob service properties for Last access time based tracking policy.
 */
export interface LastAccessTimeTrackingPolicyInput extends InputOf<LastAccessTimeTrackingPolicy> {
  /**
   * An array of predefined supported blob types. Only blockBlob is the supported value. This field is currently read only
   */
  blobType?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * When set to true last access time based tracking is enabled.
   */
  enable: ExpressionOrValue<boolean>;
  /**
   * Name of the policy. The valid value is AccessTimeTracking. This field is currently read only
   */
  name?: ExpressionOrValue<Name> | undefined;
  /**
   * The field specifies blob object tracking granularity in days, typically how often the blob object should be tracked.This field is currently read only with value as 1
   */
  trackingGranularityInDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The blob service properties for Last access time based tracking policy.
 */
export type LastAccessTimeTrackingPolicyView = LastAccessTimeTrackingPolicyInput;

export const lastAccessTimeTrackingPolicyShape: FlatModelShape = createFlatModelShape({
  blobType: { armPath: ["blobType"], value: createArrayShape(createStringShape()) },
  enable: { armPath: ["enable"], value: createBooleanShape() },
  name: { armPath: ["name"], value: createUnionShape() },
  trackingGranularityInDays: { armPath: ["trackingGranularityInDays"], value: createNumberShape() },
});

/**
 * The LegalHold property of a blob container.
 */
export interface LegalHoldProperties {
  /**
   * The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account.
   */
  hasLegalHold?: boolean;
  /**
   * Protected append blob writes history.
   */
  protectedAppendWritesHistory?: ProtectedAppendWritesHistory;
  /**
   * The list of LegalHold tags of a blob container.
   */
  tags?: TagProperty[];
}

/**
 * Input type for The LegalHold property of a blob container.
 */
export interface LegalHoldPropertiesInput extends InputOf<LegalHoldProperties> {}

/**
 * View type for The LegalHold property of a blob container.
 */
export interface LegalHoldPropertiesView extends InputOf<LegalHoldProperties> {
  /**
   * Read-only output: The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account.
   */
  readonly hasLegalHold?: Expression<boolean> | undefined;
  /**
   * Read-only output: Protected append blob writes history.
   */
  readonly protectedAppendWritesHistory?: Expression<ProtectedAppendWritesHistory> | undefined;
  /**
   * Read-only output: The list of LegalHold tags of a blob container.
   */
  readonly tags?: Expression<TagProperty[]> | undefined;
}

export const legalHoldPropertiesShape: FlatModelShape = createFlatModelShape({
  hasLegalHold: { armPath: ["hasLegalHold"], value: createBooleanShape(), readOnly: true },
  protectedAppendWritesHistory: {
    armPath: ["protectedAppendWritesHistory"],
    value: createDeferredShape(() => protectedAppendWritesHistoryShape),
    readOnly: true,
  },
  tags: {
    armPath: ["tags"],
    value: createArrayShape(createDeferredShape(() => tagPropertyShape)),
    readOnly: true,
  },
});

/**
 * The Storage Account Local User properties.
 */
export interface LocalUserProperties {
  /**
   * Indicates whether ACL authorization is allowed for this user. Set it to false to disallow using ACL authorization.
   */
  allowAclAuthorization?: boolean;
  /**
   * Supplementary group membership. Only applicable for local users enabled for NFSv3 access.
   */
  extendedGroups?: number[];
  /**
   * An identifier for associating a group of users.
   */
  groupId?: number;
  /**
   * Indicates whether shared key exists. Set it to false to remove existing shared key.
   */
  hasSharedKey?: boolean;
  /**
   * Indicates whether ssh key exists. Set it to false to remove existing SSH key.
   */
  hasSshKey?: boolean;
  /**
   * Indicates whether ssh password exists. Set it to false to remove existing SSH password.
   */
  hasSshPassword?: boolean;
  /**
   * Optional, local user home directory.
   */
  homeDirectory?: string;
  /**
   * Indicates if the local user is enabled for access with NFSv3 protocol.
   */
  isNfSv3Enabled?: boolean;
  /**
   * The permission scopes of the local user.
   */
  permissionScopes?: PermissionScope[];
  /**
   * A unique Security Identifier that is generated by the server.
   */
  sid?: string;
  /**
   * Optional, local user ssh authorized keys for SFTP.
   */
  sshAuthorizedKeys?: SshPublicKey[];
  /**
   * A unique Identifier that is generated by the server.
   */
  userId?: number;
}

/**
 * Input type for The Storage Account Local User properties.
 */
export interface LocalUserPropertiesInput extends InputOf<LocalUserProperties> {
  /**
   * Indicates whether ACL authorization is allowed for this user. Set it to false to disallow using ACL authorization.
   */
  allowAclAuthorization?: ExpressionOrValue<boolean> | undefined;
  /**
   * Supplementary group membership. Only applicable for local users enabled for NFSv3 access.
   */
  extendedGroups?: InputArray<ExpressionOrValue<number>, number[]> | undefined;
  /**
   * An identifier for associating a group of users.
   */
  groupId?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates whether shared key exists. Set it to false to remove existing shared key.
   */
  hasSharedKey?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether ssh key exists. Set it to false to remove existing SSH key.
   */
  hasSshKey?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether ssh password exists. Set it to false to remove existing SSH password.
   */
  hasSshPassword?: ExpressionOrValue<boolean> | undefined;
  /**
   * Optional, local user home directory.
   */
  homeDirectory?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates if the local user is enabled for access with NFSv3 protocol.
   */
  isNfSv3Enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The permission scopes of the local user.
   */
  permissionScopes?: InputArray<PermissionScopeInput, PermissionScope[]> | undefined;
  /**
   * Optional, local user ssh authorized keys for SFTP.
   */
  sshAuthorizedKeys?: InputArray<SshPublicKeyInput, SshPublicKey[]> | undefined;
}

/**
 * View type for The Storage Account Local User properties.
 */
export interface LocalUserPropertiesView extends InputOf<LocalUserProperties> {
  /**
   * Indicates whether ACL authorization is allowed for this user. Set it to false to disallow using ACL authorization.
   */
  allowAclAuthorization?: ExpressionOrValue<boolean> | undefined;
  /**
   * Supplementary group membership. Only applicable for local users enabled for NFSv3 access.
   */
  extendedGroups?: InputArray<ExpressionOrValue<number>, number[]> | undefined;
  /**
   * An identifier for associating a group of users.
   */
  groupId?: ExpressionOrValue<number> | undefined;
  /**
   * Indicates whether shared key exists. Set it to false to remove existing shared key.
   */
  hasSharedKey?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether ssh key exists. Set it to false to remove existing SSH key.
   */
  hasSshKey?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether ssh password exists. Set it to false to remove existing SSH password.
   */
  hasSshPassword?: ExpressionOrValue<boolean> | undefined;
  /**
   * Optional, local user home directory.
   */
  homeDirectory?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates if the local user is enabled for access with NFSv3 protocol.
   */
  isNfSv3Enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The permission scopes of the local user.
   */
  permissionScopes?: InputArray<PermissionScopeView, PermissionScope[]> | undefined;
  /**
   * Read-only output: A unique Security Identifier that is generated by the server.
   */
  readonly sid?: Expression<string> | undefined;
  /**
   * Optional, local user ssh authorized keys for SFTP.
   */
  sshAuthorizedKeys?: InputArray<SshPublicKeyView, SshPublicKey[]> | undefined;
  /**
   * Read-only output: A unique Identifier that is generated by the server.
   */
  readonly userId?: Expression<number> | undefined;
}

export const localUserPropertiesShape: FlatModelShape = createFlatModelShape({
  allowAclAuthorization: { armPath: ["allowAclAuthorization"], value: createBooleanShape() },
  extendedGroups: { armPath: ["extendedGroups"], value: createArrayShape(createNumberShape()) },
  groupId: { armPath: ["groupId"], value: createNumberShape() },
  hasSharedKey: { armPath: ["hasSharedKey"], value: createBooleanShape() },
  hasSshKey: { armPath: ["hasSshKey"], value: createBooleanShape() },
  hasSshPassword: { armPath: ["hasSshPassword"], value: createBooleanShape() },
  homeDirectory: { armPath: ["homeDirectory"], value: createStringShape() },
  isNfSv3Enabled: { armPath: ["isNFSv3Enabled"], value: createBooleanShape() },
  permissionScopes: {
    armPath: ["permissionScopes"],
    value: createArrayShape(createDeferredShape(() => permissionScopeShape)),
  },
  sid: { armPath: ["sid"], value: createStringShape(), readOnly: true },
  sshAuthorizedKeys: {
    armPath: ["sshAuthorizedKeys"],
    value: createArrayShape(createDeferredShape(() => sshPublicKeyShape)),
  },
  userId: { armPath: ["userId"], value: createNumberShape(), readOnly: true },
});

/**
 * The managed identity auth properties for dataShare connection.
 */
export interface ManagedIdentityAuthProperties {
  /**
   * ARM ResourceId of the managed identity that should be used to authenticate to the backing data source.
   */
  identityResourceId?: string;
  /**
   * The type of managed identity auth
   *
   * Selects this variant. Must be "ManagedIdentity".
   */
  type: "ManagedIdentity";
}

/**
 * Input type for The managed identity auth properties for dataShare connection.
 */
export interface ManagedIdentityAuthPropertiesInput extends InputOf<ManagedIdentityAuthProperties> {
  /**
   * ARM ResourceId of the managed identity that should be used to authenticate to the backing data source.
   */
  identityResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The type of managed identity auth
   *
   * Selects this variant. Must be "ManagedIdentity".
   */
  type: "ManagedIdentity";
}

/**
 * View type for The managed identity auth properties for dataShare connection.
 */
export type ManagedIdentityAuthPropertiesView = ManagedIdentityAuthPropertiesInput;

export const managedIdentityAuthPropertiesShape: FlatModelShape = createFlatModelShape({
  identityResourceId: { armPath: ["identityResourceId"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Actions are applied to the filtered blobs when the execution condition is met.
 */
export interface ManagementPolicyAction {
  /**
   * The management policy action for base blob
   */
  baseBlob?: ManagementPolicyBaseBlob;
  /**
   * The management policy action for snapshot
   */
  snapshot?: ManagementPolicySnapShot;
  /**
   * The management policy action for version
   */
  version?: ManagementPolicyVersion;
}

/**
 * Input type for Actions are applied to the filtered blobs when the execution condition is met.
 */
export interface ManagementPolicyActionInput extends InputOf<ManagementPolicyAction> {
  /**
   * The management policy action for base blob
   */
  baseBlob?: ManagementPolicyBaseBlobInput | undefined;
  /**
   * The management policy action for snapshot
   */
  snapshot?: ManagementPolicySnapShotInput | undefined;
  /**
   * The management policy action for version
   */
  version?: ManagementPolicyVersionInput | undefined;
}

/**
 * View type for Actions are applied to the filtered blobs when the execution condition is met.
 */
export type ManagementPolicyActionView = ManagementPolicyActionInput;

export const managementPolicyActionShape: FlatModelShape = createFlatModelShape({
  baseBlob: {
    armPath: ["baseBlob"],
    value: createDeferredShape(() => managementPolicyBaseBlobShape),
  },
  snapshot: {
    armPath: ["snapshot"],
    value: createDeferredShape(() => managementPolicySnapShotShape),
  },
  version: { armPath: ["version"], value: createDeferredShape(() => managementPolicyVersionShape) },
});

/**
 * Management policy action for base blob.
 */
export interface ManagementPolicyBaseBlob {
  /**
   * The function to delete the blob
   */
  delete_?: DateAfterModification;
  /**
   * This property enables auto tiering of a blob from cool to hot on a blob access. This property requires tierToCool.daysAfterLastAccessTimeGreaterThan.
   */
  enableAutoTierToHotFromCool?: boolean;
  /**
   * The function to tier blobs to archive storage.
   */
  tierToArchive?: DateAfterModification;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterModification;
  /**
   * The function to tier blobs to cool storage.
   */
  tierToCool?: DateAfterModification;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterModification;
}

/**
 * Input type for Management policy action for base blob.
 */
export interface ManagementPolicyBaseBlobInput extends InputOf<ManagementPolicyBaseBlob> {
  /**
   * The function to delete the blob
   */
  delete_?: DateAfterModificationInput | undefined;
  /**
   * This property enables auto tiering of a blob from cool to hot on a blob access. This property requires tierToCool.daysAfterLastAccessTimeGreaterThan.
   */
  enableAutoTierToHotFromCool?: ExpressionOrValue<boolean> | undefined;
  /**
   * The function to tier blobs to archive storage.
   */
  tierToArchive?: DateAfterModificationInput | undefined;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterModificationInput | undefined;
  /**
   * The function to tier blobs to cool storage.
   */
  tierToCool?: DateAfterModificationInput | undefined;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterModificationInput | undefined;
}

/**
 * View type for Management policy action for base blob.
 */
export type ManagementPolicyBaseBlobView = ManagementPolicyBaseBlobInput;

export const managementPolicyBaseBlobShape: FlatModelShape = createFlatModelShape({
  delete_: { armPath: ["delete"], value: createDeferredShape(() => dateAfterModificationShape) },
  enableAutoTierToHotFromCool: {
    armPath: ["enableAutoTierToHotFromCool"],
    value: createBooleanShape(),
  },
  tierToArchive: {
    armPath: ["tierToArchive"],
    value: createDeferredShape(() => dateAfterModificationShape),
  },
  tierToCold: {
    armPath: ["tierToCold"],
    value: createDeferredShape(() => dateAfterModificationShape),
  },
  tierToCool: {
    armPath: ["tierToCool"],
    value: createDeferredShape(() => dateAfterModificationShape),
  },
  tierToHot: {
    armPath: ["tierToHot"],
    value: createDeferredShape(() => dateAfterModificationShape),
  },
});

/**
 * An object that defines the Lifecycle rule. Each definition is made up with a filters set and an actions set.
 */
export interface ManagementPolicyDefinition {
  /**
   * An object that defines the action set.
   */
  actions: ManagementPolicyAction;
  /**
   * An object that defines the filter set.
   */
  filters?: ManagementPolicyFilter;
}

/**
 * Input type for An object that defines the Lifecycle rule. Each definition is made up with a filters set and an actions set.
 */
export interface ManagementPolicyDefinitionInput extends InputOf<ManagementPolicyDefinition> {
  /**
   * An object that defines the action set.
   */
  actions: ManagementPolicyActionInput;
  /**
   * An object that defines the filter set.
   */
  filters?: ManagementPolicyFilterInput | undefined;
}

/**
 * View type for An object that defines the Lifecycle rule. Each definition is made up with a filters set and an actions set.
 */
export type ManagementPolicyDefinitionView = ManagementPolicyDefinitionInput;

export const managementPolicyDefinitionShape: FlatModelShape = createFlatModelShape({
  actions: { armPath: ["actions"], value: createDeferredShape(() => managementPolicyActionShape) },
  filters: { armPath: ["filters"], value: createDeferredShape(() => managementPolicyFilterShape) },
});

/**
 * Filters limit rule actions to a subset of blobs within the storage account. If multiple filters are defined, a logical AND is performed on all filters.
 */
export interface ManagementPolicyFilter {
  /**
   * An array of blob index tag based filters, there can be at most 10 tag filters
   */
  blobIndexMatch?: TagFilter[];
  /**
   * An array of predefined enum values. Currently blockBlob supports all tiering and delete actions. Only delete actions are supported for appendBlob.
   */
  blobTypes: string[];
  /**
   * An array of strings for prefixes to be match.
   */
  prefixMatch?: string[];
}

/**
 * Input type for Filters limit rule actions to a subset of blobs within the storage account. If multiple filters are defined, a logical AND is performed on all filters.
 */
export interface ManagementPolicyFilterInput extends InputOf<ManagementPolicyFilter> {
  /**
   * An array of blob index tag based filters, there can be at most 10 tag filters
   */
  blobIndexMatch?: InputArray<TagFilterInput, TagFilter[]> | undefined;
  /**
   * An array of predefined enum values. Currently blockBlob supports all tiering and delete actions. Only delete actions are supported for appendBlob.
   */
  blobTypes: InputArray<ExpressionOrValue<string>, string[]>;
  /**
   * An array of strings for prefixes to be match.
   */
  prefixMatch?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Filters limit rule actions to a subset of blobs within the storage account. If multiple filters are defined, a logical AND is performed on all filters.
 */
export type ManagementPolicyFilterView = ManagementPolicyFilterInput;

export const managementPolicyFilterShape: FlatModelShape = createFlatModelShape({
  blobIndexMatch: {
    armPath: ["blobIndexMatch"],
    value: createArrayShape(createDeferredShape(() => tagFilterShape)),
  },
  blobTypes: { armPath: ["blobTypes"], value: createArrayShape(createStringShape()) },
  prefixMatch: { armPath: ["prefixMatch"], value: createArrayShape(createStringShape()) },
});

/**
 * The Storage Account ManagementPolicy properties.
 */
export interface ManagementPolicyProperties {
  /**
   * Returns the date and time the ManagementPolicies was last modified.
   */
  lastModifiedTime?: Date;
  /**
   * The Storage Account ManagementPolicy, in JSON format. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
   */
  policy: ManagementPolicySchema;
}

/**
 * Input type for The Storage Account ManagementPolicy properties.
 */
export interface ManagementPolicyPropertiesInput extends InputOf<ManagementPolicyProperties> {
  /**
   * The Storage Account ManagementPolicy, in JSON format. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
   */
  policy: ManagementPolicySchemaInput;
}

/**
 * View type for The Storage Account ManagementPolicy properties.
 */
export interface ManagementPolicyPropertiesView extends InputOf<ManagementPolicyProperties> {
  /**
   * Read-only output: Returns the date and time the ManagementPolicies was last modified.
   */
  readonly lastModifiedTime?: Expression<Date> | undefined;
  /**
   * The Storage Account ManagementPolicy, in JSON format. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
   */
  policy: ManagementPolicySchemaView;
}

export const managementPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  lastModifiedTime: {
    armPath: ["lastModifiedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  policy: { armPath: ["policy"], value: createDeferredShape(() => managementPolicySchemaShape) },
});

/**
 * An object that wraps the Lifecycle rule. Each rule is uniquely defined by name.
 */
export interface ManagementPolicyRule {
  /**
   * An object that defines the Lifecycle rule.
   */
  definition: ManagementPolicyDefinition;
  /**
   * Rule is enabled if set to true.
   */
  enabled?: boolean;
  /**
   * A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.
   */
  name: string;
  /**
   * The valid value is Lifecycle
   */
  type: RuleType;
}

/**
 * Input type for An object that wraps the Lifecycle rule. Each rule is uniquely defined by name.
 */
export interface ManagementPolicyRuleInput extends InputOf<ManagementPolicyRule> {
  /**
   * An object that defines the Lifecycle rule.
   */
  definition: ManagementPolicyDefinitionInput;
  /**
   * Rule is enabled if set to true.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.
   */
  name: ExpressionOrValue<string>;
  /**
   * The valid value is Lifecycle
   */
  type: ExpressionOrValue<RuleType>;
}

/**
 * View type for An object that wraps the Lifecycle rule. Each rule is uniquely defined by name.
 */
export type ManagementPolicyRuleView = ManagementPolicyRuleInput;

export const managementPolicyRuleShape: FlatModelShape = createFlatModelShape({
  definition: {
    armPath: ["definition"],
    value: createDeferredShape(() => managementPolicyDefinitionShape),
  },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  name: { armPath: ["name"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
 */
export interface ManagementPolicySchema {
  /**
   * The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
   */
  rules: ManagementPolicyRule[];
}

/**
 * Input type for The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
 */
export interface ManagementPolicySchemaInput extends InputOf<ManagementPolicySchema> {
  /**
   * The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
   */
  rules: InputArray<ManagementPolicyRuleInput, ManagementPolicyRule[]>;
}

/**
 * View type for The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview.
 */
export type ManagementPolicySchemaView = ManagementPolicySchemaInput;

export const managementPolicySchemaShape: FlatModelShape = createFlatModelShape({
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => managementPolicyRuleShape)),
  },
});

/**
 * Management policy action for snapshot.
 */
export interface ManagementPolicySnapShot {
  /**
   * The function to delete the blob snapshot
   */
  delete_?: DateAfterCreation;
  /**
   * The function to tier blob snapshot to archive storage.
   */
  tierToArchive?: DateAfterCreation;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterCreation;
  /**
   * The function to tier blob snapshot to cool storage.
   */
  tierToCool?: DateAfterCreation;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterCreation;
}

/**
 * Input type for Management policy action for snapshot.
 */
export interface ManagementPolicySnapShotInput extends InputOf<ManagementPolicySnapShot> {
  /**
   * The function to delete the blob snapshot
   */
  delete_?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blob snapshot to archive storage.
   */
  tierToArchive?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blob snapshot to cool storage.
   */
  tierToCool?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterCreationInput | undefined;
}

/**
 * View type for Management policy action for snapshot.
 */
export type ManagementPolicySnapShotView = ManagementPolicySnapShotInput;

export const managementPolicySnapShotShape: FlatModelShape = createFlatModelShape({
  delete_: { armPath: ["delete"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToArchive: {
    armPath: ["tierToArchive"],
    value: createDeferredShape(() => dateAfterCreationShape),
  },
  tierToCold: { armPath: ["tierToCold"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToCool: { armPath: ["tierToCool"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToHot: { armPath: ["tierToHot"], value: createDeferredShape(() => dateAfterCreationShape) },
});

/**
 * Management policy action for blob version.
 */
export interface ManagementPolicyVersion {
  /**
   * The function to delete the blob version
   */
  delete_?: DateAfterCreation;
  /**
   * The function to tier blob version to archive storage.
   */
  tierToArchive?: DateAfterCreation;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterCreation;
  /**
   * The function to tier blob version to cool storage.
   */
  tierToCool?: DateAfterCreation;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterCreation;
}

/**
 * Input type for Management policy action for blob version.
 */
export interface ManagementPolicyVersionInput extends InputOf<ManagementPolicyVersion> {
  /**
   * The function to delete the blob version
   */
  delete_?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blob version to archive storage.
   */
  tierToArchive?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blobs to cold storage.
   */
  tierToCold?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blob version to cool storage.
   */
  tierToCool?: DateAfterCreationInput | undefined;
  /**
   * The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts
   */
  tierToHot?: DateAfterCreationInput | undefined;
}

/**
 * View type for Management policy action for blob version.
 */
export type ManagementPolicyVersionView = ManagementPolicyVersionInput;

export const managementPolicyVersionShape: FlatModelShape = createFlatModelShape({
  delete_: { armPath: ["delete"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToArchive: {
    armPath: ["tierToArchive"],
    value: createDeferredShape(() => dateAfterCreationShape),
  },
  tierToCold: { armPath: ["tierToCold"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToCool: { armPath: ["tierToCool"], value: createDeferredShape(() => dateAfterCreationShape) },
  tierToHot: { armPath: ["tierToHot"], value: createDeferredShape(() => dateAfterCreationShape) },
});

/**
 * Multichannel setting. Applies to Premium FileStorage only.
 */
export interface Multichannel {
  /**
   * Indicates whether multichannel is enabled
   */
  enabled?: boolean;
}

/**
 * Input type for Multichannel setting. Applies to Premium FileStorage only.
 */
export interface MultichannelInput extends InputOf<Multichannel> {
  /**
   * Indicates whether multichannel is enabled
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Multichannel setting. Applies to Premium FileStorage only.
 */
export type MultichannelView = MultichannelInput;

export const multichannelShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
});

/**
 * Network rule set
 */
export interface NetworkRuleSet {
  /**
   * Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics.
   */
  bypass?: Bypass;
  /**
   * Specifies the default action of allow or deny when no other rules match.
   */
  defaultAction: DefaultAction;
  /**
   * Sets the IP ACL rules
   */
  ipRules?: IpRule[];
  /**
   * Sets the IPv6 ACL rules.
   */
  ipv6Rules?: IpRule[];
  /**
   * Sets the resource access rules
   */
  resourceAccessRules?: ResourceAccessRule[];
  /**
   * Sets the virtual network rules
   */
  virtualNetworkRules?: VirtualNetworkRule[];
}

/**
 * Input type for Network rule set
 */
export interface NetworkRuleSetInput extends InputOf<NetworkRuleSet> {
  /**
   * Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics.
   */
  bypass?: ExpressionOrValue<Bypass> | undefined;
  /**
   * Specifies the default action of allow or deny when no other rules match.
   */
  defaultAction: ExpressionOrValue<DefaultAction>;
  /**
   * Sets the IP ACL rules
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
  /**
   * Sets the IPv6 ACL rules.
   */
  ipv6Rules?: InputArray<IpRuleInput, IpRule[]> | undefined;
  /**
   * Sets the resource access rules
   */
  resourceAccessRules?: InputArray<ResourceAccessRuleInput, ResourceAccessRule[]> | undefined;
  /**
   * Sets the virtual network rules
   */
  virtualNetworkRules?: InputArray<VirtualNetworkRuleInput, VirtualNetworkRule[]> | undefined;
}

/**
 * View type for Network rule set
 */
export type NetworkRuleSetView = NetworkRuleSetInput;

export const networkRuleSetShape: FlatModelShape = createFlatModelShape({
  bypass: { armPath: ["bypass"], value: createUnionShape() },
  defaultAction: { armPath: ["defaultAction"], value: createEnumShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
  ipv6Rules: {
    armPath: ["ipv6Rules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
  resourceAccessRules: {
    armPath: ["resourceAccessRules"],
    value: createArrayShape(createDeferredShape(() => resourceAccessRuleShape)),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    value: createArrayShape(createDeferredShape(() => virtualNetworkRuleShape)),
  },
});

/**
 * NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeter {
  /**
   * The ARM identifier of the resource
   */
  id?: string;
  /**
   * Location of the resource
   */
  location?: string;
  /**
   * Guid of the resource
   */
  perimeterGuid?: string;
}

/**
 * Input type for NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeterInput extends InputOf<NetworkSecurityPerimeter> {}

/**
 * View type for NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeterView extends InputOf<NetworkSecurityPerimeter> {
  /**
   * Read-only output: The ARM identifier of the resource
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Location of the resource
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Guid of the resource
   */
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const networkSecurityPerimeterShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of the Network Security Perimeter Configuration
 */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /**
   * NetworkSecurityPerimeter related information
   */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /**
   * Network Security Perimeter profile
   */
  profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
  /**
   * List of Provisioning Issues if any
   */
  provisioningIssues?: ProvisioningIssue[];
  /**
   * Provisioning state of Network Security Perimeter configuration propagation
   */
  provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /**
   * Information about resource association
   */
  resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
}

/**
 * Input type for Properties of the Network Security Perimeter Configuration
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesInput extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {}

/**
 * View type for Properties of the Network Security Perimeter Configuration
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesView extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {
  /**
   * Read-only output: NetworkSecurityPerimeter related information
   */
  readonly networkSecurityPerimeter?: Expression<NetworkSecurityPerimeter> | undefined;
  /**
   * Read-only output: Network Security Perimeter profile
   */
  readonly profile?: Expression<NetworkSecurityPerimeterConfigurationPropertiesProfile> | undefined;
  /**
   * Read-only output: List of Provisioning Issues if any
   */
  readonly provisioningIssues?: Expression<ProvisioningIssue[]> | undefined;
  /**
   * Read-only output: Provisioning state of Network Security Perimeter configuration propagation
   */
  readonly provisioningState?:
    Expression<NetworkSecurityPerimeterConfigurationProvisioningState> | undefined;
  /**
   * Read-only output: Information about resource association
   */
  readonly resourceAssociation?:
    Expression<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesShape: FlatModelShape =
  createFlatModelShape({
    networkSecurityPerimeter: {
      armPath: ["networkSecurityPerimeter"],
      value: createDeferredShape(() => networkSecurityPerimeterShape),
      readOnly: true,
    },
    profile: {
      armPath: ["profile"],
      value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesProfileShape),
      readOnly: true,
    },
    provisioningIssues: {
      armPath: ["provisioningIssues"],
      value: createArrayShape(createDeferredShape(() => provisioningIssueShape)),
      readOnly: true,
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createUnionShape(),
      readOnly: true,
    },
    resourceAssociation: {
      armPath: ["resourceAssociation"],
      value: createDeferredShape(
        () => networkSecurityPerimeterConfigurationPropertiesResourceAssociationShape,
      ),
      readOnly: true,
    },
  });

/**
 * Network Security Perimeter profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfile {
  /**
   * List of Access Rules
   */
  accessRules?: NspAccessRule[];
  /**
   * Current access rules version
   */
  accessRulesVersion?: number;
  /**
   * Diagnostic settings version
   */
  diagnosticSettingsVersion?: number;
  /**
   * Enabled logging categories
   */
  enabledLogCategories?: string[];
  /**
   * Name of the resource
   */
  name?: string;
}

/**
 * Input type for Network Security Perimeter profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfileInput extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesProfile> {}

/**
 * View type for Network Security Perimeter profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfileView extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesProfile> {
  /**
   * Read-only output: List of Access Rules
   */
  readonly accessRules?: Expression<NspAccessRule[]> | undefined;
  /**
   * Read-only output: Current access rules version
   */
  readonly accessRulesVersion?: Expression<number> | undefined;
  /**
   * Read-only output: Diagnostic settings version
   */
  readonly diagnosticSettingsVersion?: Expression<number> | undefined;
  /**
   * Read-only output: Enabled logging categories
   */
  readonly enabledLogCategories?: Expression<string[]> | undefined;
  /**
   * Read-only output: Name of the resource
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesProfileShape: FlatModelShape =
  createFlatModelShape({
    accessRules: {
      armPath: ["accessRules"],
      value: createArrayShape(createDeferredShape(() => nspAccessRuleShape)),
      readOnly: true,
    },
    accessRulesVersion: {
      armPath: ["accessRulesVersion"],
      value: createNumberShape(),
      readOnly: true,
    },
    diagnosticSettingsVersion: {
      armPath: ["diagnosticSettingsVersion"],
      value: createNumberShape(),
      readOnly: true,
    },
    enabledLogCategories: {
      armPath: ["enabledLogCategories"],
      value: createArrayShape(createStringShape()),
      readOnly: true,
    },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  /**
   * Access Mode of the resource association
   */
  accessMode?: ResourceAssociationAccessMode;
  /**
   * Name of the resource association
   */
  name?: string;
}

/**
 * Input type for Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociationInput extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> {}

/**
 * View type for Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociationView extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> {
  /**
   * Read-only output: Access Mode of the resource association
   */
  readonly accessMode?: Expression<ResourceAssociationAccessMode> | undefined;
  /**
   * Read-only output: Name of the resource association
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesResourceAssociationShape: FlatModelShape =
  createFlatModelShape({
    accessMode: { armPath: ["accessMode"], value: createUnionShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * Setting for NFS protocol
 */
export interface NfsSetting {
  /**
   * Encryption in transit setting.
   */
  encryptionInTransit?: EncryptionInTransit;
}

/**
 * Input type for Setting for NFS protocol
 */
export interface NfsSettingInput extends InputOf<NfsSetting> {
  /**
   * Encryption in transit setting.
   */
  encryptionInTransit?: EncryptionInTransitInput | undefined;
}

/**
 * View type for Setting for NFS protocol
 */
export type NfsSettingView = NfsSettingInput;

export const nfsSettingShape: FlatModelShape = createFlatModelShape({
  encryptionInTransit: {
    armPath: ["encryptionInTransit"],
    value: createDeferredShape(() => encryptionInTransitShape),
  },
});

/**
 * Information of Access Rule in Network Security Perimeter profile
 */
export interface NspAccessRule {
  /**
   * Name of the resource
   */
  name?: string;
  /**
   * Properties of Access Rule
   */
  properties?: NspAccessRuleProperties;
}

/**
 * Input type for Information of Access Rule in Network Security Perimeter profile
 */
export interface NspAccessRuleInput extends InputOf<NspAccessRule> {}

/**
 * View type for Information of Access Rule in Network Security Perimeter profile
 */
export interface NspAccessRuleView extends InputOf<NspAccessRule> {
  /**
   * Read-only output: Name of the resource
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of Access Rule
   */
  readonly properties?: Expression<NspAccessRuleProperties> | undefined;
}

export const nspAccessRuleShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => nspAccessRulePropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of Access Rule
 */
export interface NspAccessRuleProperties {
  /**
   * Address prefixes in the CIDR format for inbound rules
   */
  addressPrefixes?: string[];
  /**
   * Direction of Access Rule
   */
  direction?: NspAccessRuleDirection;
  /**
   * FQDN for outbound rules
   */
  fullyQualifiedDomainNames?: string[];
  /**
   * NetworkSecurityPerimeters for inbound rules
   */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /**
   * Subscriptions for inbound rules
   */
  subscriptions?: NspAccessRulePropertiesSubscriptionsItem[];
}

/**
 * Input type for Properties of Access Rule
 */
export interface NspAccessRulePropertiesInput extends InputOf<NspAccessRuleProperties> {}

/**
 * View type for Properties of Access Rule
 */
export interface NspAccessRulePropertiesView extends InputOf<NspAccessRuleProperties> {
  /**
   * Read-only output: Address prefixes in the CIDR format for inbound rules
   */
  readonly addressPrefixes?: Expression<string[]> | undefined;
  /**
   * Read-only output: Direction of Access Rule
   */
  readonly direction?: Expression<NspAccessRuleDirection> | undefined;
  /**
   * Read-only output: FQDN for outbound rules
   */
  readonly fullyQualifiedDomainNames?: Expression<string[]> | undefined;
  /**
   * Read-only output: NetworkSecurityPerimeters for inbound rules
   */
  readonly networkSecurityPerimeters?: Expression<NetworkSecurityPerimeter[]> | undefined;
  /**
   * Read-only output: Subscriptions for inbound rules
   */
  readonly subscriptions?: Expression<NspAccessRulePropertiesSubscriptionsItem[]> | undefined;
}

export const nspAccessRulePropertiesShape: FlatModelShape = createFlatModelShape({
  addressPrefixes: {
    armPath: ["addressPrefixes"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  direction: { armPath: ["direction"], value: createUnionShape(), readOnly: true },
  fullyQualifiedDomainNames: {
    armPath: ["fullyQualifiedDomainNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  networkSecurityPerimeters: {
    armPath: ["networkSecurityPerimeters"],
    value: createArrayShape(createDeferredShape(() => networkSecurityPerimeterShape)),
    readOnly: true,
  },
  subscriptions: {
    armPath: ["subscriptions"],
    value: createArrayShape(
      createDeferredShape(() => nspAccessRulePropertiesSubscriptionsItemShape),
    ),
    readOnly: true,
  },
});

/**
 * Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItem {
  /**
   * The ARM identifier of subscription
   */
  id?: string;
}

/**
 * Input type for Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItemInput extends InputOf<NspAccessRulePropertiesSubscriptionsItem> {}

/**
 * View type for Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItemView extends InputOf<NspAccessRulePropertiesSubscriptionsItem> {
  /**
   * Read-only output: The ARM identifier of subscription
   */
  readonly id?: Expression<string> | undefined;
}

export const nspAccessRulePropertiesSubscriptionsItemShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
});

/**
 * Filters limit replication to a subset of blobs within the storage account. A logical OR is performed on values in the filter. If multiple filters are defined, a logical AND is performed on all filters.
 */
export interface ObjectReplicationPolicyFilter {
  /**
   * Blobs created after the time will be replicated to the destination. It must be in datetime format 'yyyy-MM-ddTHH:mm:ssZ'. Example: 2020-02-19T16:05:00Z
   */
  minCreationTime?: string;
  /**
   * Optional. Filters the results to replicate only blobs whose names begin with the specified prefix.
   */
  prefixMatch?: string[];
}

/**
 * Input type for Filters limit replication to a subset of blobs within the storage account. A logical OR is performed on values in the filter. If multiple filters are defined, a logical AND is performed on all filters.
 */
export interface ObjectReplicationPolicyFilterInput extends InputOf<ObjectReplicationPolicyFilter> {
  /**
   * Blobs created after the time will be replicated to the destination. It must be in datetime format 'yyyy-MM-ddTHH:mm:ssZ'. Example: 2020-02-19T16:05:00Z
   */
  minCreationTime?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Filters the results to replicate only blobs whose names begin with the specified prefix.
   */
  prefixMatch?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Filters limit replication to a subset of blobs within the storage account. A logical OR is performed on values in the filter. If multiple filters are defined, a logical AND is performed on all filters.
 */
export type ObjectReplicationPolicyFilterView = ObjectReplicationPolicyFilterInput;

export const objectReplicationPolicyFilterShape: FlatModelShape = createFlatModelShape({
  minCreationTime: { armPath: ["minCreationTime"], value: createStringShape() },
  prefixMatch: { armPath: ["prefixMatch"], value: createArrayShape(createStringShape()) },
});

/**
 * The Storage Account ObjectReplicationPolicy properties.
 */
export interface ObjectReplicationPolicyProperties {
  /**
   * Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  destinationAccount: string;
  /**
   * Indicates when the policy is enabled on the source account.
   */
  enabledTime?: Date;
  /**
   * Optional. The object replication policy metrics feature options.
   */
  metrics?: ObjectReplicationPolicyPropertiesMetrics;
  /**
   * A unique id for object replication policy.
   */
  policyId?: string;
  /**
   * Optional. The object replication policy priority replication feature options.
   */
  priorityReplication?: ObjectReplicationPolicyPropertiesPriorityReplication;
  /**
   * The storage account object replication rules.
   */
  rules?: ObjectReplicationPolicyRule[];
  /**
   * Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  sourceAccount: string;
  /**
   * Optional. The object replication policy tags replication feature options.
   */
  tagsReplication?: ObjectReplicationPolicyPropertiesTagsReplication;
}

/**
 * Input type for The Storage Account ObjectReplicationPolicy properties.
 */
export interface ObjectReplicationPolicyPropertiesInput extends InputOf<ObjectReplicationPolicyProperties> {
  /**
   * Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  destinationAccount: ExpressionOrValue<string>;
  /**
   * Optional. The object replication policy metrics feature options.
   */
  metrics?: ObjectReplicationPolicyPropertiesMetricsInput | undefined;
  /**
   * Optional. The object replication policy priority replication feature options.
   */
  priorityReplication?: ObjectReplicationPolicyPropertiesPriorityReplicationInput | undefined;
  /**
   * The storage account object replication rules.
   */
  rules?: InputArray<ObjectReplicationPolicyRuleInput, ObjectReplicationPolicyRule[]> | undefined;
  /**
   * Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  sourceAccount: ExpressionOrValue<string>;
  /**
   * Optional. The object replication policy tags replication feature options.
   */
  tagsReplication?: ObjectReplicationPolicyPropertiesTagsReplicationInput | undefined;
}

/**
 * View type for The Storage Account ObjectReplicationPolicy properties.
 */
export interface ObjectReplicationPolicyPropertiesView extends InputOf<ObjectReplicationPolicyProperties> {
  /**
   * Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  destinationAccount: ExpressionOrValue<string>;
  /**
   * Read-only output: Indicates when the policy is enabled on the source account.
   */
  readonly enabledTime?: Expression<Date> | undefined;
  /**
   * Optional. The object replication policy metrics feature options.
   */
  metrics?: ObjectReplicationPolicyPropertiesMetricsView | undefined;
  /**
   * Read-only output: A unique id for object replication policy.
   */
  readonly policyId?: Expression<string> | undefined;
  /**
   * Optional. The object replication policy priority replication feature options.
   */
  priorityReplication?: ObjectReplicationPolicyPropertiesPriorityReplicationView | undefined;
  /**
   * The storage account object replication rules.
   */
  rules?: InputArray<ObjectReplicationPolicyRuleView, ObjectReplicationPolicyRule[]> | undefined;
  /**
   * Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  sourceAccount: ExpressionOrValue<string>;
  /**
   * Optional. The object replication policy tags replication feature options.
   */
  tagsReplication?: ObjectReplicationPolicyPropertiesTagsReplicationView | undefined;
}

export const objectReplicationPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  destinationAccount: { armPath: ["destinationAccount"], value: createStringShape() },
  enabledTime: {
    armPath: ["enabledTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  metrics: {
    armPath: ["metrics"],
    value: createDeferredShape(() => objectReplicationPolicyPropertiesMetricsShape),
  },
  policyId: { armPath: ["policyId"], value: createStringShape(), readOnly: true },
  priorityReplication: {
    armPath: ["priorityReplication"],
    value: createDeferredShape(() => objectReplicationPolicyPropertiesPriorityReplicationShape),
  },
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => objectReplicationPolicyRuleShape)),
  },
  sourceAccount: { armPath: ["sourceAccount"], value: createStringShape() },
  tagsReplication: {
    armPath: ["tagsReplication"],
    value: createDeferredShape(() => objectReplicationPolicyPropertiesTagsReplicationShape),
  },
});

/**
 * Optional. The object replication policy metrics feature options.
 */
export interface ObjectReplicationPolicyPropertiesMetrics {
  /**
   * Indicates whether object replication metrics feature is enabled for the policy.
   */
  enabled?: boolean;
}

/**
 * Input type for Optional. The object replication policy metrics feature options.
 */
export interface ObjectReplicationPolicyPropertiesMetricsInput extends InputOf<ObjectReplicationPolicyPropertiesMetrics> {
  /**
   * Indicates whether object replication metrics feature is enabled for the policy.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Optional. The object replication policy metrics feature options.
 */
export type ObjectReplicationPolicyPropertiesMetricsView =
  ObjectReplicationPolicyPropertiesMetricsInput;

export const objectReplicationPolicyPropertiesMetricsShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
});

/**
 * Optional. The object replication policy priority replication feature options.
 */
export interface ObjectReplicationPolicyPropertiesPriorityReplication {
  /**
   * Indicates whether object replication priority replication feature is enabled for the policy.
   */
  enabled?: boolean;
}

/**
 * Input type for Optional. The object replication policy priority replication feature options.
 */
export interface ObjectReplicationPolicyPropertiesPriorityReplicationInput extends InputOf<ObjectReplicationPolicyPropertiesPriorityReplication> {
  /**
   * Indicates whether object replication priority replication feature is enabled for the policy.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Optional. The object replication policy priority replication feature options.
 */
export type ObjectReplicationPolicyPropertiesPriorityReplicationView =
  ObjectReplicationPolicyPropertiesPriorityReplicationInput;

export const objectReplicationPolicyPropertiesPriorityReplicationShape: FlatModelShape =
  createFlatModelShape({
    enabled: { armPath: ["enabled"], value: createBooleanShape() },
  });

/**
 * Optional. The object replication policy tags replication feature options.
 */
export interface ObjectReplicationPolicyPropertiesTagsReplication {
  /**
   * Indicates whether object replication tags replication feature is enabled for the policy.
   */
  enabled?: boolean;
}

/**
 * Input type for Optional. The object replication policy tags replication feature options.
 */
export interface ObjectReplicationPolicyPropertiesTagsReplicationInput extends InputOf<ObjectReplicationPolicyPropertiesTagsReplication> {
  /**
   * Indicates whether object replication tags replication feature is enabled for the policy.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Optional. The object replication policy tags replication feature options.
 */
export type ObjectReplicationPolicyPropertiesTagsReplicationView =
  ObjectReplicationPolicyPropertiesTagsReplicationInput;

export const objectReplicationPolicyPropertiesTagsReplicationShape: FlatModelShape =
  createFlatModelShape({
    enabled: { armPath: ["enabled"], value: createBooleanShape() },
  });

/**
 * The replication policy rule between two containers.
 */
export interface ObjectReplicationPolicyRule {
  /**
   * Required. Destination container name.
   */
  destinationContainer: string;
  /**
   * Optional. An object that defines the filter set.
   */
  filters?: ObjectReplicationPolicyFilter;
  /**
   * Rule Id is auto-generated for each new rule on destination account. It is required for put policy on source account.
   */
  ruleId?: string;
  /**
   * Required. Source container name.
   */
  sourceContainer: string;
}

/**
 * Input type for The replication policy rule between two containers.
 */
export interface ObjectReplicationPolicyRuleInput extends InputOf<ObjectReplicationPolicyRule> {
  /**
   * Required. Destination container name.
   */
  destinationContainer: ExpressionOrValue<string>;
  /**
   * Optional. An object that defines the filter set.
   */
  filters?: ObjectReplicationPolicyFilterInput | undefined;
  /**
   * Rule Id is auto-generated for each new rule on destination account. It is required for put policy on source account.
   */
  ruleId?: ExpressionOrValue<string> | undefined;
  /**
   * Required. Source container name.
   */
  sourceContainer: ExpressionOrValue<string>;
}

/**
 * View type for The replication policy rule between two containers.
 */
export type ObjectReplicationPolicyRuleView = ObjectReplicationPolicyRuleInput;

export const objectReplicationPolicyRuleShape: FlatModelShape = createFlatModelShape({
  destinationContainer: { armPath: ["destinationContainer"], value: createStringShape() },
  filters: {
    armPath: ["filters"],
    value: createDeferredShape(() => objectReplicationPolicyFilterShape),
  },
  ruleId: { armPath: ["ruleId"], value: createStringShape() },
  sourceContainer: { armPath: ["sourceContainer"], value: createStringShape() },
});

export interface PermissionScope {
  /**
   * The permissions for the local user. Possible values include: Read (r), Write (w), Delete (d), List (l), Create (c), Modify Ownership (o), and Modify Permissions (p).
   */
  permissions: string;
  /**
   * The name of resource, normally the container name or the file share name, used by the local user.
   */
  resourceName: string;
  /**
   * The service used by the local user, e.g. blob, file.
   */
  service: string;
}

export interface PermissionScopeInput extends InputOf<PermissionScope> {
  /**
   * The permissions for the local user. Possible values include: Read (r), Write (w), Delete (d), List (l), Create (c), Modify Ownership (o), and Modify Permissions (p).
   */
  permissions: ExpressionOrValue<string>;
  /**
   * The name of resource, normally the container name or the file share name, used by the local user.
   */
  resourceName: ExpressionOrValue<string>;
  /**
   * The service used by the local user, e.g. blob, file.
   */
  service: ExpressionOrValue<string>;
}

export type PermissionScopeView = PermissionScopeInput;

export const permissionScopeShape: FlatModelShape = createFlatModelShape({
  permissions: { armPath: ["permissions"], value: createStringShape() },
  resourceName: { armPath: ["resourceName"], value: createStringShape() },
  service: { armPath: ["service"], value: createStringShape() },
});

/**
 * The complex type of the zonal placement details.
 */
export interface Placement {
  /**
   * The availability zone pinning policy for the storage account.
   */
  zonePlacementPolicy?: ZonePlacementPolicy;
}

/**
 * Input type for The complex type of the zonal placement details.
 */
export interface PlacementInput extends InputOf<Placement> {
  /**
   * The availability zone pinning policy for the storage account.
   */
  zonePlacementPolicy?: ExpressionOrValue<ZonePlacementPolicy> | undefined;
}

/**
 * View type for The complex type of the zonal placement details.
 */
export type PlacementView = PlacementInput;

export const placementShape: FlatModelShape = createFlatModelShape({
  zonePlacementPolicy: { armPath: ["zonePlacementPolicy"], value: createUnionShape() },
});

/**
 * The Private Endpoint resource.
 */
export interface PrivateEndpoint {
  /**
   * The ARM identifier for Private Endpoint
   */
  id?: string;
}

/**
 * Input type for The Private Endpoint resource.
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {}

/**
 * View type for The Private Endpoint resource.
 */
export interface PrivateEndpointView extends InputOf<PrivateEndpoint> {
  /**
   * Read-only output: The ARM identifier for Private Endpoint
   */
  readonly id?: Expression<string> | undefined;
}

export const privateEndpointShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   */
  provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/**
 * Input type for Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateInput;
}

/**
 * View type for Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpointView | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateView;
  /**
   * Read-only output: The provisioning state of the private endpoint connection resource.
   */
  readonly provisioningState?: Expression<PrivateEndpointConnectionProvisioningState> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStateShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * A collection of information about the state of the connection between service consumer and provider.
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionRequired?: string;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: PrivateEndpointServiceConnectionStatus;
}

/**
 * Input type for A collection of information about the state of the connection between service consumer and provider.
 */
export interface PrivateLinkServiceConnectionStateInput extends InputOf<PrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionRequired?: ExpressionOrValue<string> | undefined;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: ExpressionOrValue<PrivateEndpointServiceConnectionStatus> | undefined;
}

/**
 * View type for A collection of information about the state of the connection between service consumer and provider.
 */
export type PrivateLinkServiceConnectionStateView = PrivateLinkServiceConnectionStateInput;

export const privateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionRequired: { armPath: ["actionRequired"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * Protected append writes history setting for the blob container with Legal holds.
 */
export interface ProtectedAppendWritesHistory {
  /**
   * When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining legal hold protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted.
   */
  allowProtectedAppendWritesAll?: boolean;
  /**
   * Returns the date and time the tag was added.
   */
  timestamp?: Date;
}

/**
 * Input type for Protected append writes history setting for the blob container with Legal holds.
 */
export interface ProtectedAppendWritesHistoryInput extends InputOf<ProtectedAppendWritesHistory> {}

/**
 * View type for Protected append writes history setting for the blob container with Legal holds.
 */
export interface ProtectedAppendWritesHistoryView extends InputOf<ProtectedAppendWritesHistory> {
  /**
   * Read-only output: When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining legal hold protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted.
   */
  readonly allowProtectedAppendWritesAll?: Expression<boolean> | undefined;
  /**
   * Read-only output: Returns the date and time the tag was added.
   */
  readonly timestamp?: Expression<Date> | undefined;
}

export const protectedAppendWritesHistoryShape: FlatModelShape = createFlatModelShape({
  allowProtectedAppendWritesAll: {
    armPath: ["allowProtectedAppendWritesAll"],
    value: createBooleanShape(),
    readOnly: true,
  },
  timestamp: {
    armPath: ["timestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * Protocol settings for file service
 */
export interface ProtocolSettings {
  /**
   * Setting for NFS protocol
   */
  nfs?: NfsSetting;
  /**
   * Setting for SMB protocol
   */
  smb?: SmbSetting;
}

/**
 * Input type for Protocol settings for file service
 */
export interface ProtocolSettingsInput extends InputOf<ProtocolSettings> {
  /**
   * Setting for NFS protocol
   */
  nfs?: NfsSettingInput | undefined;
  /**
   * Setting for SMB protocol
   */
  smb?: SmbSettingInput | undefined;
}

/**
 * View type for Protocol settings for file service
 */
export type ProtocolSettingsView = ProtocolSettingsInput;

export const protocolSettingsShape: FlatModelShape = createFlatModelShape({
  nfs: { armPath: ["nfs"], value: createDeferredShape(() => nfsSettingShape) },
  smb: { armPath: ["smb"], value: createDeferredShape(() => smbSettingShape) },
});

/**
 * Describes provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssue {
  /**
   * Name of the issue
   */
  name?: string;
  /**
   * Properties of provisioning issue
   */
  properties?: ProvisioningIssueProperties;
}

/**
 * Input type for Describes provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssueInput extends InputOf<ProvisioningIssue> {}

/**
 * View type for Describes provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssueView extends InputOf<ProvisioningIssue> {
  /**
   * Read-only output: Name of the issue
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of provisioning issue
   */
  readonly properties?: Expression<ProvisioningIssueProperties> | undefined;
}

export const provisioningIssueShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => provisioningIssuePropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of provisioning issue
 */
export interface ProvisioningIssueProperties {
  /**
   * Description of the issue
   */
  description?: string;
  /**
   * Type of issue
   */
  issueType?: IssueType;
  /**
   * Severity of the issue.
   */
  severity?: Severity;
}

/**
 * Input type for Properties of provisioning issue
 */
export interface ProvisioningIssuePropertiesInput extends InputOf<ProvisioningIssueProperties> {}

/**
 * View type for Properties of provisioning issue
 */
export interface ProvisioningIssuePropertiesView extends InputOf<ProvisioningIssueProperties> {
  /**
   * Read-only output: Description of the issue
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: Type of issue
   */
  readonly issueType?: Expression<IssueType> | undefined;
  /**
   * Read-only output: Severity of the issue.
   */
  readonly severity?: Expression<Severity> | undefined;
}

export const provisioningIssuePropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  issueType: { armPath: ["issueType"], value: createUnionShape(), readOnly: true },
  severity: { armPath: ["severity"], value: createUnionShape(), readOnly: true },
});

export interface QueueProperties {
  /**
   * Integer indicating an approximate number of messages in the queue. This number is not lower than the actual number of messages in the queue, but could be higher.
   */
  approximateMessageCount?: number;
  /**
   * A name-value pair that represents queue metadata.
   */
  metadata?: Record<string, string>;
}

export interface QueuePropertiesInput extends InputOf<QueueProperties> {
  /**
   * A name-value pair that represents queue metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface QueuePropertiesView extends InputOf<QueueProperties> {
  /**
   * Read-only output: Integer indicating an approximate number of messages in the queue. This number is not lower than the actual number of messages in the queue, but could be higher.
   */
  readonly approximateMessageCount?: Expression<number> | undefined;
  /**
   * A name-value pair that represents queue metadata.
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export const queuePropertiesShape: FlatModelShape = createFlatModelShape({
  approximateMessageCount: {
    armPath: ["approximateMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
});

/**
 * The properties of a storage account’s Queue service.
 */
export interface QueueServicePropertiesProperties {
  /**
   * Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service.
   */
  cors?: CorsRules;
}

/**
 * Input type for The properties of a storage account’s Queue service.
 */
export interface QueueServicePropertiesPropertiesInput extends InputOf<QueueServicePropertiesProperties> {
  /**
   * Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service.
   */
  cors?: CorsRulesInput | undefined;
}

/**
 * View type for The properties of a storage account’s Queue service.
 */
export type QueueServicePropertiesPropertiesView = QueueServicePropertiesPropertiesInput;

export const queueServicePropertiesPropertiesShape: FlatModelShape = createFlatModelShape({
  cors: { armPath: ["cors"], value: createDeferredShape(() => corsRulesShape) },
});

/**
 * Resource Access Rule.
 */
export interface ResourceAccessRule {
  /**
   * Resource Id
   */
  resourceId?: string;
  /**
   * Tenant Id
   */
  tenantId?: string;
}

/**
 * Input type for Resource Access Rule.
 */
export interface ResourceAccessRuleInput extends InputOf<ResourceAccessRule> {
  /**
   * Resource Id
   */
  resourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Tenant Id
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Resource Access Rule.
 */
export type ResourceAccessRuleView = ResourceAccessRuleInput;

export const resourceAccessRuleShape: FlatModelShape = createFlatModelShape({
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * The blob service properties for blob restore policy
 */
export interface RestorePolicyProperties {
  /**
   * how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days.
   */
  days?: number;
  /**
   * Blob restore is enabled if set to true.
   */
  enabled: boolean;
  /**
   * Deprecated in favor of minRestoreTime property.
   */
  lastEnabledTime?: Date;
  /**
   * Returns the minimum date and time that the restore can be started.
   */
  minRestoreTime?: Date;
}

/**
 * Input type for The blob service properties for blob restore policy
 */
export interface RestorePolicyPropertiesInput extends InputOf<RestorePolicyProperties> {
  /**
   * how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days.
   */
  days?: ExpressionOrValue<number> | undefined;
  /**
   * Blob restore is enabled if set to true.
   */
  enabled: ExpressionOrValue<boolean>;
}

/**
 * View type for The blob service properties for blob restore policy
 */
export interface RestorePolicyPropertiesView extends InputOf<RestorePolicyProperties> {
  /**
   * how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days.
   */
  days?: ExpressionOrValue<number> | undefined;
  /**
   * Blob restore is enabled if set to true.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * Read-only output: Deprecated in favor of minRestoreTime property.
   */
  readonly lastEnabledTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Returns the minimum date and time that the restore can be started.
   */
  readonly minRestoreTime?: Expression<Date> | undefined;
}

export const restorePolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  days: { armPath: ["days"], value: createNumberShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  lastEnabledTime: {
    armPath: ["lastEnabledTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  minRestoreTime: {
    armPath: ["minRestoreTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * Routing preference defines the type of network, either microsoft or internet routing to be used to deliver the user data, the default option is microsoft routing
 */
export interface RoutingPreference {
  /**
   * A boolean flag which indicates whether internet routing storage endpoints are to be published
   */
  publishInternetEndpoints?: boolean;
  /**
   * A boolean flag which indicates whether microsoft routing storage endpoints are to be published
   */
  publishMicrosoftEndpoints?: boolean;
  /**
   * Routing Choice defines the kind of network routing opted by the user.
   */
  routingChoice?: RoutingChoice;
}

/**
 * Input type for Routing preference defines the type of network, either microsoft or internet routing to be used to deliver the user data, the default option is microsoft routing
 */
export interface RoutingPreferenceInput extends InputOf<RoutingPreference> {
  /**
   * A boolean flag which indicates whether internet routing storage endpoints are to be published
   */
  publishInternetEndpoints?: ExpressionOrValue<boolean> | undefined;
  /**
   * A boolean flag which indicates whether microsoft routing storage endpoints are to be published
   */
  publishMicrosoftEndpoints?: ExpressionOrValue<boolean> | undefined;
  /**
   * Routing Choice defines the kind of network routing opted by the user.
   */
  routingChoice?: ExpressionOrValue<RoutingChoice> | undefined;
}

/**
 * View type for Routing preference defines the type of network, either microsoft or internet routing to be used to deliver the user data, the default option is microsoft routing
 */
export type RoutingPreferenceView = RoutingPreferenceInput;

export const routingPreferenceShape: FlatModelShape = createFlatModelShape({
  publishInternetEndpoints: { armPath: ["publishInternetEndpoints"], value: createBooleanShape() },
  publishMicrosoftEndpoints: {
    armPath: ["publishMicrosoftEndpoints"],
    value: createBooleanShape(),
  },
  routingChoice: { armPath: ["routingChoice"], value: createUnionShape() },
});

/**
 * SasPolicy assigned to the storage account.
 */
export interface SasPolicy {
  /**
   * The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period.
   */
  expirationAction: ExpirationAction;
  /**
   * The SAS expiration period, DD.HH:MM:SS.
   */
  sasExpirationPeriod: string;
}

/**
 * Input type for SasPolicy assigned to the storage account.
 */
export interface SasPolicyInput extends InputOf<SasPolicy> {
  /**
   * The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period.
   */
  expirationAction: ExpressionOrValue<ExpirationAction>;
  /**
   * The SAS expiration period, DD.HH:MM:SS.
   */
  sasExpirationPeriod: ExpressionOrValue<string>;
}

/**
 * View type for SasPolicy assigned to the storage account.
 */
export type SasPolicyView = SasPolicyInput;

export const sasPolicyShape: FlatModelShape = createFlatModelShape({
  expirationAction: { armPath: ["expirationAction"], value: createUnionShape() },
  sasExpirationPeriod: { armPath: ["sasExpirationPeriod"], value: createStringShape() },
});

/**
 * Defines shared key access settings for an individual storage service.
 */
export interface ServiceSharedKeyAccessProperties {
  /**
   * Indicates whether shared key access is enabled for the service.
   */
  enabled?: boolean;
}

/**
 * Input type for Defines shared key access settings for an individual storage service.
 */
export interface ServiceSharedKeyAccessPropertiesInput extends InputOf<ServiceSharedKeyAccessProperties> {
  /**
   * Indicates whether shared key access is enabled for the service.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Defines shared key access settings for an individual storage service.
 */
export type ServiceSharedKeyAccessPropertiesView = ServiceSharedKeyAccessPropertiesInput;

export const serviceSharedKeyAccessPropertiesShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
});

export interface SignedIdentifier {
  /**
   * Access policy
   */
  accessPolicy?: AccessPolicy;
  /**
   * An unique identifier of the stored access policy.
   */
  id?: string;
}

export interface SignedIdentifierInput extends InputOf<SignedIdentifier> {
  /**
   * Access policy
   */
  accessPolicy?: AccessPolicyInput | undefined;
  /**
   * An unique identifier of the stored access policy.
   */
  id?: ExpressionOrValue<string> | undefined;
}

export type SignedIdentifierView = SignedIdentifierInput;

export const signedIdentifierShape: FlatModelShape = createFlatModelShape({
  accessPolicy: { armPath: ["accessPolicy"], value: createDeferredShape(() => accessPolicyShape) },
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * The SKU of the storage account.
 */
export interface Sku {
  /**
   * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType.
   */
  name: SkuName;
  /**
   * The SKU tier. This is based on the SKU name.
   */
  tier?: SkuTier;
}

/**
 * Input type for The SKU of the storage account.
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType.
   */
  name: ExpressionOrValue<SkuName>;
}

/**
 * View type for The SKU of the storage account.
 */
export interface SkuView extends InputOf<Sku> {
  /**
   * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType.
   */
  name: ExpressionOrValue<SkuName>;
  /**
   * Read-only output: The SKU tier. This is based on the SKU name.
   */
  readonly tier?: Expression<SkuTier> | undefined;
}

export const skuShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createUnionShape() },
  tier: { armPath: ["tier"], value: createEnumShape(), readOnly: true },
});

/**
 * Setting property for Managed Identity access over SMB using OAuth
 */
export interface SmbOAuthSettings {
  /**
   * Specifies if managed identities can access SMB shares using OAuth. The default interpretation is false for this property.
   */
  isSmbOAuthEnabled?: boolean;
}

/**
 * Input type for Setting property for Managed Identity access over SMB using OAuth
 */
export interface SmbOAuthSettingsInput extends InputOf<SmbOAuthSettings> {
  /**
   * Specifies if managed identities can access SMB shares using OAuth. The default interpretation is false for this property.
   */
  isSmbOAuthEnabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Setting property for Managed Identity access over SMB using OAuth
 */
export type SmbOAuthSettingsView = SmbOAuthSettingsInput;

export const smbOAuthSettingsShape: FlatModelShape = createFlatModelShape({
  isSmbOAuthEnabled: { armPath: ["isSmbOAuthEnabled"], value: createBooleanShape() },
});

/**
 * Setting for SMB protocol
 */
export interface SmbSetting {
  /**
   * SMB authentication methods supported by server. Valid values are NTLMv2, Kerberos. Should be passed as a string with delimiter ';'.
   */
  authenticationMethods?: string;
  /**
   * SMB channel encryption supported by server. Valid values are AES-128-CCM, AES-128-GCM, AES-256-GCM. Should be passed as a string with delimiter ';'.
   */
  channelEncryption?: string;
  /**
   * Encryption in transit setting.
   */
  encryptionInTransit?: EncryptionInTransit;
  /**
   * Kerberos ticket encryption supported by server. Valid values are RC4-HMAC, AES-256. Should be passed as a string with delimiter ';'
   */
  kerberosTicketEncryption?: string;
  /**
   * Multichannel setting. Applies to Premium FileStorage only.
   */
  multichannel?: Multichannel;
  /**
   * SMB protocol versions supported by server. Valid values are SMB2.1, SMB3.0, SMB3.1.1. Should be passed as a string with delimiter ';'.
   */
  versions?: string;
}

/**
 * Input type for Setting for SMB protocol
 */
export interface SmbSettingInput extends InputOf<SmbSetting> {
  /**
   * SMB authentication methods supported by server. Valid values are NTLMv2, Kerberos. Should be passed as a string with delimiter ';'.
   */
  authenticationMethods?: ExpressionOrValue<string> | undefined;
  /**
   * SMB channel encryption supported by server. Valid values are AES-128-CCM, AES-128-GCM, AES-256-GCM. Should be passed as a string with delimiter ';'.
   */
  channelEncryption?: ExpressionOrValue<string> | undefined;
  /**
   * Encryption in transit setting.
   */
  encryptionInTransit?: EncryptionInTransitInput | undefined;
  /**
   * Kerberos ticket encryption supported by server. Valid values are RC4-HMAC, AES-256. Should be passed as a string with delimiter ';'
   */
  kerberosTicketEncryption?: ExpressionOrValue<string> | undefined;
  /**
   * Multichannel setting. Applies to Premium FileStorage only.
   */
  multichannel?: MultichannelInput | undefined;
  /**
   * SMB protocol versions supported by server. Valid values are SMB2.1, SMB3.0, SMB3.1.1. Should be passed as a string with delimiter ';'.
   */
  versions?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Setting for SMB protocol
 */
export type SmbSettingView = SmbSettingInput;

export const smbSettingShape: FlatModelShape = createFlatModelShape({
  authenticationMethods: { armPath: ["authenticationMethods"], value: createStringShape() },
  channelEncryption: { armPath: ["channelEncryption"], value: createStringShape() },
  encryptionInTransit: {
    armPath: ["encryptionInTransit"],
    value: createDeferredShape(() => encryptionInTransitShape),
  },
  kerberosTicketEncryption: { armPath: ["kerberosTicketEncryption"], value: createStringShape() },
  multichannel: { armPath: ["multichannel"], value: createDeferredShape(() => multichannelShape) },
  versions: { armPath: ["versions"], value: createStringShape() },
});

export interface SshPublicKey {
  /**
   * Optional. It is used to store the function/usage of the key
   */
  description?: string;
  /**
   * Ssh public key base64 encoded. The format should be: '<keyType> <keyData>', e.g. ssh-rsa AAAABBBB
   */
  key?: string;
}

export interface SshPublicKeyInput extends InputOf<SshPublicKey> {
  /**
   * Optional. It is used to store the function/usage of the key
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Ssh public key base64 encoded. The format should be: '<keyType> <keyData>', e.g. ssh-rsa AAAABBBB
   */
  key?: ExpressionOrValue<string> | undefined;
}

export type SshPublicKeyView = SshPublicKeyInput;

export const sshPublicKeyShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  key: { armPath: ["key"], value: createStringShape() },
});

/**
 * The static website properties for blob storage.
 */
export interface StaticWebsite {
  /**
   * The absolute path where the default index file is present. This absolute path is mutually exclusive to "indexDocument" and it is case-sensitive.
   */
  defaultIndexDocumentPath?: string;
  /**
   * Indicates whether static website support is enabled for the specified account.
   */
  enabled: boolean;
  /**
   * The absolute path to a webpage that Azure Storage serves for requests that don't correspond to an existing file. The contents of the page are returned with HTTP 404 Not Found. Only a single custom 404 page is supported in each static website.
   */
  errorDocument404Path?: string;
  /**
   * The webpage that Azure Storage serves for requests to the root of a website or any subfolder (for example, index.html). The value is case-sensitive.
   */
  indexDocument?: string;
}

/**
 * Input type for The static website properties for blob storage.
 */
export interface StaticWebsiteInput extends InputOf<StaticWebsite> {
  /**
   * The absolute path where the default index file is present. This absolute path is mutually exclusive to "indexDocument" and it is case-sensitive.
   */
  defaultIndexDocumentPath?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether static website support is enabled for the specified account.
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * The absolute path to a webpage that Azure Storage serves for requests that don't correspond to an existing file. The contents of the page are returned with HTTP 404 Not Found. Only a single custom 404 page is supported in each static website.
   */
  errorDocument404Path?: ExpressionOrValue<string> | undefined;
  /**
   * The webpage that Azure Storage serves for requests to the root of a website or any subfolder (for example, index.html). The value is case-sensitive.
   */
  indexDocument?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The static website properties for blob storage.
 */
export type StaticWebsiteView = StaticWebsiteInput;

export const staticWebsiteShape: FlatModelShape = createFlatModelShape({
  defaultIndexDocumentPath: { armPath: ["defaultIndexDocumentPath"], value: createStringShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  errorDocument404Path: { armPath: ["errorDocument404Path"], value: createStringShape() },
  indexDocument: { armPath: ["indexDocument"], value: createStringShape() },
});

/**
 * The URIs that are used to perform a retrieval of a public blob, file, web or dfs object via a internet routing endpoint.
 */
export interface StorageAccountInternetEndpoints {
  /**
   * Gets the blob endpoint.
   */
  blob?: string;
  /**
   * Gets the dfs endpoint.
   */
  dfs?: string;
  /**
   * Gets the file endpoint.
   */
  file?: string;
  /**
   * Gets the web endpoint.
   */
  web?: string;
}

/**
 * Input type for The URIs that are used to perform a retrieval of a public blob, file, web or dfs object via a internet routing endpoint.
 */
export interface StorageAccountInternetEndpointsInput extends InputOf<StorageAccountInternetEndpoints> {}

/**
 * View type for The URIs that are used to perform a retrieval of a public blob, file, web or dfs object via a internet routing endpoint.
 */
export interface StorageAccountInternetEndpointsView extends InputOf<StorageAccountInternetEndpoints> {
  /**
   * Read-only output: Gets the blob endpoint.
   */
  readonly blob?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the dfs endpoint.
   */
  readonly dfs?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the file endpoint.
   */
  readonly file?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the web endpoint.
   */
  readonly web?: Expression<string> | undefined;
}

export const storageAccountInternetEndpointsShape: FlatModelShape = createFlatModelShape({
  blob: { armPath: ["blob"], value: createStringShape(), readOnly: true },
  dfs: { armPath: ["dfs"], value: createStringShape(), readOnly: true },
  file: { armPath: ["file"], value: createStringShape(), readOnly: true },
  web: { armPath: ["web"], value: createStringShape(), readOnly: true },
});

/**
 * The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via an IPv6 endpoint.
 */
export interface StorageAccountIpv6Endpoints {
  /**
   * Gets the blob endpoint.
   */
  blob?: string;
  /**
   * Gets the dfs endpoint.
   */
  dfs?: string;
  /**
   * Gets the file endpoint.
   */
  file?: string;
  /**
   * Gets the internet routing storage endpoints
   */
  internetEndpoints?: StorageAccountInternetEndpoints;
  /**
   * Gets the microsoft routing storage endpoints.
   */
  microsoftEndpoints?: StorageAccountMicrosoftEndpoints;
  /**
   * Gets the queue endpoint.
   */
  queue?: string;
  /**
   * Gets the table endpoint.
   */
  table?: string;
  /**
   * Gets the web endpoint.
   */
  web?: string;
}

/**
 * Input type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via an IPv6 endpoint.
 */
export interface StorageAccountIpv6EndpointsInput extends InputOf<StorageAccountIpv6Endpoints> {}

/**
 * View type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via an IPv6 endpoint.
 */
export interface StorageAccountIpv6EndpointsView extends InputOf<StorageAccountIpv6Endpoints> {
  /**
   * Read-only output: Gets the blob endpoint.
   */
  readonly blob?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the dfs endpoint.
   */
  readonly dfs?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the file endpoint.
   */
  readonly file?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the internet routing storage endpoints
   */
  readonly internetEndpoints?: Expression<StorageAccountInternetEndpoints> | undefined;
  /**
   * Read-only output: Gets the microsoft routing storage endpoints.
   */
  readonly microsoftEndpoints?: Expression<StorageAccountMicrosoftEndpoints> | undefined;
  /**
   * Read-only output: Gets the queue endpoint.
   */
  readonly queue?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the table endpoint.
   */
  readonly table?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the web endpoint.
   */
  readonly web?: Expression<string> | undefined;
}

export const storageAccountIpv6EndpointsShape: FlatModelShape = createFlatModelShape({
  blob: { armPath: ["blob"], value: createStringShape(), readOnly: true },
  dfs: { armPath: ["dfs"], value: createStringShape(), readOnly: true },
  file: { armPath: ["file"], value: createStringShape(), readOnly: true },
  internetEndpoints: {
    armPath: ["internetEndpoints"],
    value: createDeferredShape(() => storageAccountInternetEndpointsShape),
    readOnly: true,
  },
  microsoftEndpoints: {
    armPath: ["microsoftEndpoints"],
    value: createDeferredShape(() => storageAccountMicrosoftEndpointsShape),
    readOnly: true,
  },
  queue: { armPath: ["queue"], value: createStringShape(), readOnly: true },
  table: { armPath: ["table"], value: createStringShape(), readOnly: true },
  web: { armPath: ["web"], value: createStringShape(), readOnly: true },
});

/**
 * The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via a microsoft routing endpoint.
 */
export interface StorageAccountMicrosoftEndpoints {
  /**
   * Gets the blob endpoint.
   */
  blob?: string;
  /**
   * Gets the dfs endpoint.
   */
  dfs?: string;
  /**
   * Gets the file endpoint.
   */
  file?: string;
  /**
   * Gets the queue endpoint.
   */
  queue?: string;
  /**
   * Gets the table endpoint.
   */
  table?: string;
  /**
   * Gets the web endpoint.
   */
  web?: string;
}

/**
 * Input type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via a microsoft routing endpoint.
 */
export interface StorageAccountMicrosoftEndpointsInput extends InputOf<StorageAccountMicrosoftEndpoints> {}

/**
 * View type for The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via a microsoft routing endpoint.
 */
export interface StorageAccountMicrosoftEndpointsView extends InputOf<StorageAccountMicrosoftEndpoints> {
  /**
   * Read-only output: Gets the blob endpoint.
   */
  readonly blob?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the dfs endpoint.
   */
  readonly dfs?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the file endpoint.
   */
  readonly file?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the queue endpoint.
   */
  readonly queue?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the table endpoint.
   */
  readonly table?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the web endpoint.
   */
  readonly web?: Expression<string> | undefined;
}

export const storageAccountMicrosoftEndpointsShape: FlatModelShape = createFlatModelShape({
  blob: { armPath: ["blob"], value: createStringShape(), readOnly: true },
  dfs: { armPath: ["dfs"], value: createStringShape(), readOnly: true },
  file: { armPath: ["file"], value: createStringShape(), readOnly: true },
  queue: { armPath: ["queue"], value: createStringShape(), readOnly: true },
  table: { armPath: ["table"], value: createStringShape(), readOnly: true },
  web: { armPath: ["web"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a storage account's ongoing or enqueued migration.
 */
export interface StorageAccountMigrationProperties {
  /**
   * Reason for migration failure
   */
  migrationFailedDetailedReason?: string;
  /**
   * Error code for migration failure
   */
  migrationFailedReason?: string;
  /**
   * Current status of migration
   */
  migrationStatus?: MigrationStatus;
  /**
   * Target sku name for the account
   */
  targetSkuName?: SkuName;
}

/**
 * Input type for The properties of a storage account's ongoing or enqueued migration.
 */
export interface StorageAccountMigrationPropertiesInput extends InputOf<StorageAccountMigrationProperties> {}

/**
 * View type for The properties of a storage account's ongoing or enqueued migration.
 */
export interface StorageAccountMigrationPropertiesView extends InputOf<StorageAccountMigrationProperties> {
  /**
   * Read-only output: Reason for migration failure
   */
  readonly migrationFailedDetailedReason?: Expression<string> | undefined;
  /**
   * Read-only output: Error code for migration failure
   */
  readonly migrationFailedReason?: Expression<string> | undefined;
  /**
   * Read-only output: Current status of migration
   */
  readonly migrationStatus?: Expression<MigrationStatus> | undefined;
  /**
   * Read-only output: Target sku name for the account
   */
  readonly targetSkuName?: Expression<SkuName> | undefined;
}

export const storageAccountMigrationPropertiesShape: FlatModelShape = createFlatModelShape({
  migrationFailedDetailedReason: {
    armPath: ["migrationFailedDetailedReason"],
    value: createStringShape(),
    readOnly: true,
  },
  migrationFailedReason: {
    armPath: ["migrationFailedReason"],
    value: createStringShape(),
    readOnly: true,
  },
  migrationStatus: { armPath: ["migrationStatus"], value: createUnionShape(), readOnly: true },
  targetSkuName: { armPath: ["targetSkuName"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of the storage account.
 */
export interface StorageAccountProperties {
  /**
   * Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type.
   */
  accessTier?: AccessTier;
  /**
   * If customer initiated account migration is in progress, the value will be true else it will be null.
   */
  accountMigrationInProgress?: boolean;
  /**
   * Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property.
   */
  allowBlobPublicAccess?: boolean;
  /**
   * Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default.
   */
  allowCrossTenantReplication?: boolean;
  /**
   * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet.
   */
  allowedCopyScope?: AllowedCopyScope;
  /**
   * Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true.
   */
  allowSharedKeyAccess?: boolean;
  /**
   * Indicate shared key access properties at service level
   */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /**
   * Provides the identity based authentication settings for Azure Files.
   */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /**
   * Blob restore status
   */
  blobRestoreStatus?: BlobRestoreStatus;
  /**
   * Gets the creation date and time of the storage account in UTC.
   */
  creationTime?: Date;
  /**
   * User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property.
   */
  customDomain?: CustomDomain;
  /**
   * Data Collaboration policy for the storage account.
   */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
  /**
   * A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property.
   */
  defaultToOAuthAuthentication?: boolean;
  /**
   * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier.
   */
  dnsEndpointType?: DnsEndpointType;
  /**
   * Maintains information about the Internet protocol opted by the user.
   */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /**
   * Enables extended group support with local users feature, if set to true
   */
  enableExtendedGroups?: boolean;
  /**
   * Encryption settings to be used for server-side encryption for the storage account.
   */
  encryption?: Encryption;
  /**
   * If the failover is in progress, the value will be true, otherwise, it will be null.
   */
  failoverInProgress?: boolean;
  /**
   * Status indicating whether Geo Priority Replication is enabled for the account.
   */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /**
   * Geo Replication Stats
   */
  geoReplicationStats?: GeoReplicationStats;
  /**
   * The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default.
   */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /**
   * Account HierarchicalNamespace enabled if sets to true.
   */
  isHnsEnabled?: boolean;
  /**
   * Enables local users feature, if set to true
   */
  isLocalUserEnabled?: boolean;
  /**
   * NFS 3.0 protocol support enabled if set to true.
   */
  enableNfsV3?: boolean;
  /**
   * Enables Secure File Transfer Protocol, if set to true
   */
  isSftpEnabled?: boolean;
  /**
   * This property will be set to true or false on an event of ongoing migration. Default value is null.
   */
  isSkuConversionBlocked?: boolean;
  /**
   * Storage account keys creation time.
   */
  keyCreationTime?: KeyCreationTime;
  /**
   * KeyPolicy assigned to the storage account.
   */
  keyPolicy?: KeyPolicy;
  /**
   * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.
   */
  largeFileSharesState?: LargeFileSharesState;
  /**
   * Gets the timestamp of the most recent instance of a failover to the secondary location. Only the most recent timestamp is retained. This element is not returned if there has never been a failover instance. Only available if the accountType is Standard_GRS or Standard_RAGRS.
   */
  lastGeoFailoverTime?: Date;
  /**
   * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported.
   */
  minimumTlsVersion?: MinimumTlsVersion;
  /**
   * Network rule set
   */
  networkRuleSet?: NetworkRuleSet;
  /**
   * Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object. Note that Standard_ZRS and Premium_LRS accounts only return the blob endpoint.
   */
  primaryEndpoints?: Endpoints;
  /**
   * Gets the location of the primary data center for the storage account.
   */
  primaryLocation?: string;
  /**
   * List of private endpoint connection associated with the specified storage account
   */
  privateEndpointConnections?: StoragePrivateEndpointConnection[];
  /**
   * Gets the status of the storage account at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
  /**
   * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * Maintains information about the network routing choice opted by the user for data transfer
   */
  routingPreference?: RoutingPreference;
  /**
   * SasPolicy assigned to the storage account.
   */
  sasPolicy?: SasPolicy;
  /**
   * Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object from the secondary location of the storage account. Only available if the SKU name is Standard_RAGRS.
   */
  secondaryEndpoints?: Endpoints;
  /**
   * Gets the location of the geo-replicated secondary for the storage account. Only available if the accountType is Standard_GRS or Standard_RAGRS.
   */
  secondaryLocation?: string;
  /**
   * Gets the status indicating whether the primary location of the storage account is available or unavailable.
   */
  statusOfPrimary?: AccountStatus;
  /**
   * Gets the status indicating whether the secondary location of the storage account is available or unavailable. Only available if the SKU name is Standard_GRS or Standard_RAGRS.
   */
  statusOfSecondary?: AccountStatus;
  /**
   * This property is readOnly and is set by server during asynchronous storage account sku conversion operations.
   */
  storageAccountSkuConversionStatus?: StorageAccountSkuConversionStatus;
  /**
   * Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01.
   */
  enableHttpsTrafficOnly?: boolean;
}

/**
 * Input type for Properties of the storage account.
 */
export interface StorageAccountPropertiesInput extends InputOf<StorageAccountProperties> {
  /**
   * Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type.
   */
  accessTier?: ExpressionOrValue<AccessTier> | undefined;
  /**
   * Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property.
   */
  allowBlobPublicAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default.
   */
  allowCrossTenantReplication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet.
   */
  allowedCopyScope?: ExpressionOrValue<AllowedCopyScope> | undefined;
  /**
   * Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true.
   */
  allowSharedKeyAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicate shared key access properties at service level
   */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessPropertiesInput | undefined;
  /**
   * Provides the identity based authentication settings for Azure Files.
   */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthenticationInput | undefined;
  /**
   * User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property.
   */
  customDomain?: CustomDomainInput | undefined;
  /**
   * Data Collaboration policy for the storage account.
   */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyPropertiesInput | undefined;
  /**
   * A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property.
   */
  defaultToOAuthAuthentication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier.
   */
  dnsEndpointType?: ExpressionOrValue<DnsEndpointType> | undefined;
  /**
   * Maintains information about the Internet protocol opted by the user.
   */
  dualStackEndpointPreference?: DualStackEndpointPreferenceInput | undefined;
  /**
   * Enables extended group support with local users feature, if set to true
   */
  enableExtendedGroups?: ExpressionOrValue<boolean> | undefined;
  /**
   * Encryption settings to be used for server-side encryption for the storage account.
   */
  encryption?: EncryptionInput | undefined;
  /**
   * Status indicating whether Geo Priority Replication is enabled for the account.
   */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatusInput | undefined;
  /**
   * The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default.
   */
  immutableStorageWithVersioning?: ImmutableStorageAccountInput | undefined;
  /**
   * Account HierarchicalNamespace enabled if sets to true.
   */
  isHnsEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables local users feature, if set to true
   */
  isLocalUserEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * NFS 3.0 protocol support enabled if set to true.
   */
  enableNfsV3?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables Secure File Transfer Protocol, if set to true
   */
  isSftpEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * KeyPolicy assigned to the storage account.
   */
  keyPolicy?: KeyPolicyInput | undefined;
  /**
   * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.
   */
  largeFileSharesState?: ExpressionOrValue<LargeFileSharesState> | undefined;
  /**
   * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported.
   */
  minimumTlsVersion?: ExpressionOrValue<MinimumTlsVersion> | undefined;
  /**
   * Network rule set
   */
  networkRuleSet?: NetworkRuleSetInput | undefined;
  /**
   * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Maintains information about the network routing choice opted by the user for data transfer
   */
  routingPreference?: RoutingPreferenceInput | undefined;
  /**
   * SasPolicy assigned to the storage account.
   */
  sasPolicy?: SasPolicyInput | undefined;
  /**
   * Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01.
   */
  enableHttpsTrafficOnly?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties of the storage account.
 */
export interface StorageAccountPropertiesView extends InputOf<StorageAccountProperties> {
  /**
   * Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type.
   */
  accessTier?: ExpressionOrValue<AccessTier> | undefined;
  /**
   * Read-only output: If customer initiated account migration is in progress, the value will be true else it will be null.
   */
  readonly accountMigrationInProgress?: Expression<boolean> | undefined;
  /**
   * Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property.
   */
  allowBlobPublicAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default.
   */
  allowCrossTenantReplication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet.
   */
  allowedCopyScope?: ExpressionOrValue<AllowedCopyScope> | undefined;
  /**
   * Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true.
   */
  allowSharedKeyAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicate shared key access properties at service level
   */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessPropertiesView | undefined;
  /**
   * Provides the identity based authentication settings for Azure Files.
   */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthenticationView | undefined;
  /**
   * Read-only output: Blob restore status
   */
  readonly blobRestoreStatus?: Expression<BlobRestoreStatus> | undefined;
  /**
   * Read-only output: Gets the creation date and time of the storage account in UTC.
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property.
   */
  customDomain?: CustomDomainView | undefined;
  /**
   * Data Collaboration policy for the storage account.
   */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyPropertiesView | undefined;
  /**
   * A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property.
   */
  defaultToOAuthAuthentication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier.
   */
  dnsEndpointType?: ExpressionOrValue<DnsEndpointType> | undefined;
  /**
   * Maintains information about the Internet protocol opted by the user.
   */
  dualStackEndpointPreference?: DualStackEndpointPreferenceView | undefined;
  /**
   * Enables extended group support with local users feature, if set to true
   */
  enableExtendedGroups?: ExpressionOrValue<boolean> | undefined;
  /**
   * Encryption settings to be used for server-side encryption for the storage account.
   */
  encryption?: EncryptionView | undefined;
  /**
   * Read-only output: If the failover is in progress, the value will be true, otherwise, it will be null.
   */
  readonly failoverInProgress?: Expression<boolean> | undefined;
  /**
   * Status indicating whether Geo Priority Replication is enabled for the account.
   */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatusView | undefined;
  /**
   * Read-only output: Geo Replication Stats
   */
  readonly geoReplicationStats?: Expression<GeoReplicationStats> | undefined;
  /**
   * The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default.
   */
  immutableStorageWithVersioning?: ImmutableStorageAccountView | undefined;
  /**
   * Account HierarchicalNamespace enabled if sets to true.
   */
  isHnsEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables local users feature, if set to true
   */
  isLocalUserEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * NFS 3.0 protocol support enabled if set to true.
   */
  enableNfsV3?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables Secure File Transfer Protocol, if set to true
   */
  isSftpEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: This property will be set to true or false on an event of ongoing migration. Default value is null.
   */
  readonly isSkuConversionBlocked?: Expression<boolean> | undefined;
  /**
   * Read-only output: Storage account keys creation time.
   */
  readonly keyCreationTime?: Expression<KeyCreationTime> | undefined;
  /**
   * KeyPolicy assigned to the storage account.
   */
  keyPolicy?: KeyPolicyView | undefined;
  /**
   * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.
   */
  largeFileSharesState?: ExpressionOrValue<LargeFileSharesState> | undefined;
  /**
   * Read-only output: Gets the timestamp of the most recent instance of a failover to the secondary location. Only the most recent timestamp is retained. This element is not returned if there has never been a failover instance. Only available if the accountType is Standard_GRS or Standard_RAGRS.
   */
  readonly lastGeoFailoverTime?: Expression<Date> | undefined;
  /**
   * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported.
   */
  minimumTlsVersion?: ExpressionOrValue<MinimumTlsVersion> | undefined;
  /**
   * Network rule set
   */
  networkRuleSet?: NetworkRuleSetView | undefined;
  /**
   * Read-only output: Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object. Note that Standard_ZRS and Premium_LRS accounts only return the blob endpoint.
   */
  readonly primaryEndpoints?: Expression<Endpoints> | undefined;
  /**
   * Read-only output: Gets the location of the primary data center for the storage account.
   */
  readonly primaryLocation?: Expression<string> | undefined;
  /**
   * Read-only output: List of private endpoint connection associated with the specified storage account
   */
  readonly privateEndpointConnections?: Expression<StoragePrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: Gets the status of the storage account at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Maintains information about the network routing choice opted by the user for data transfer
   */
  routingPreference?: RoutingPreferenceView | undefined;
  /**
   * SasPolicy assigned to the storage account.
   */
  sasPolicy?: SasPolicyView | undefined;
  /**
   * Read-only output: Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object from the secondary location of the storage account. Only available if the SKU name is Standard_RAGRS.
   */
  readonly secondaryEndpoints?: Expression<Endpoints> | undefined;
  /**
   * Read-only output: Gets the location of the geo-replicated secondary for the storage account. Only available if the accountType is Standard_GRS or Standard_RAGRS.
   */
  readonly secondaryLocation?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the status indicating whether the primary location of the storage account is available or unavailable.
   */
  readonly statusOfPrimary?: Expression<AccountStatus> | undefined;
  /**
   * Read-only output: Gets the status indicating whether the secondary location of the storage account is available or unavailable. Only available if the SKU name is Standard_GRS or Standard_RAGRS.
   */
  readonly statusOfSecondary?: Expression<AccountStatus> | undefined;
  /**
   * Read-only output: This property is readOnly and is set by server during asynchronous storage account sku conversion operations.
   */
  readonly storageAccountSkuConversionStatus?:
    Expression<StorageAccountSkuConversionStatus> | undefined;
  /**
   * Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01.
   */
  enableHttpsTrafficOnly?: ExpressionOrValue<boolean> | undefined;
}

export const storageAccountPropertiesShape: FlatModelShape = createFlatModelShape({
  accessTier: { armPath: ["accessTier"], value: createEnumShape() },
  accountMigrationInProgress: {
    armPath: ["accountMigrationInProgress"],
    value: createBooleanShape(),
    readOnly: true,
  },
  allowBlobPublicAccess: { armPath: ["allowBlobPublicAccess"], value: createBooleanShape() },
  allowCrossTenantReplication: {
    armPath: ["allowCrossTenantReplication"],
    value: createBooleanShape(),
  },
  allowedCopyScope: { armPath: ["allowedCopyScope"], value: createUnionShape() },
  allowSharedKeyAccess: { armPath: ["allowSharedKeyAccess"], value: createBooleanShape() },
  allowSharedKeyAccessForServices: {
    armPath: ["allowSharedKeyAccessForServices"],
    value: createDeferredShape(() => storageAccountSharedKeyAccessPropertiesShape),
  },
  azureFilesIdentityBasedAuthentication: {
    armPath: ["azureFilesIdentityBasedAuthentication"],
    value: createDeferredShape(() => azureFilesIdentityBasedAuthenticationShape),
  },
  blobRestoreStatus: {
    armPath: ["blobRestoreStatus"],
    value: createDeferredShape(() => blobRestoreStatusShape),
    readOnly: true,
  },
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  customDomain: { armPath: ["customDomain"], value: createDeferredShape(() => customDomainShape) },
  dataCollaborationPolicyProperties: {
    armPath: ["dataCollaborationPolicyProperties"],
    value: createDeferredShape(() => storageDataCollaborationPolicyPropertiesShape),
  },
  defaultToOAuthAuthentication: {
    armPath: ["defaultToOAuthAuthentication"],
    value: createBooleanShape(),
  },
  dnsEndpointType: { armPath: ["dnsEndpointType"], value: createUnionShape() },
  dualStackEndpointPreference: {
    armPath: ["dualStackEndpointPreference"],
    value: createDeferredShape(() => dualStackEndpointPreferenceShape),
  },
  enableExtendedGroups: { armPath: ["enableExtendedGroups"], value: createBooleanShape() },
  encryption: { armPath: ["encryption"], value: createDeferredShape(() => encryptionShape) },
  failoverInProgress: {
    armPath: ["failoverInProgress"],
    value: createBooleanShape(),
    readOnly: true,
  },
  geoPriorityReplicationStatus: {
    armPath: ["geoPriorityReplicationStatus"],
    value: createDeferredShape(() => geoPriorityReplicationStatusShape),
  },
  geoReplicationStats: {
    armPath: ["geoReplicationStats"],
    value: createDeferredShape(() => geoReplicationStatsShape),
    readOnly: true,
  },
  immutableStorageWithVersioning: {
    armPath: ["immutableStorageWithVersioning"],
    value: createDeferredShape(() => immutableStorageAccountShape),
  },
  isHnsEnabled: { armPath: ["isHnsEnabled"], value: createBooleanShape() },
  isLocalUserEnabled: { armPath: ["isLocalUserEnabled"], value: createBooleanShape() },
  enableNfsV3: { armPath: ["isNfsV3Enabled"], value: createBooleanShape() },
  isSftpEnabled: { armPath: ["isSftpEnabled"], value: createBooleanShape() },
  isSkuConversionBlocked: {
    armPath: ["isSkuConversionBlocked"],
    value: createBooleanShape(),
    readOnly: true,
  },
  keyCreationTime: {
    armPath: ["keyCreationTime"],
    value: createDeferredShape(() => keyCreationTimeShape),
    readOnly: true,
  },
  keyPolicy: { armPath: ["keyPolicy"], value: createDeferredShape(() => keyPolicyShape) },
  largeFileSharesState: { armPath: ["largeFileSharesState"], value: createUnionShape() },
  lastGeoFailoverTime: {
    armPath: ["lastGeoFailoverTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  minimumTlsVersion: { armPath: ["minimumTlsVersion"], value: createUnionShape() },
  networkRuleSet: {
    armPath: ["networkAcls"],
    value: createDeferredShape(() => networkRuleSetShape),
  },
  primaryEndpoints: {
    armPath: ["primaryEndpoints"],
    value: createDeferredShape(() => endpointsShape),
    readOnly: true,
  },
  primaryLocation: { armPath: ["primaryLocation"], value: createStringShape(), readOnly: true },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => storagePrivateEndpointConnectionShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createEnumShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  routingPreference: {
    armPath: ["routingPreference"],
    value: createDeferredShape(() => routingPreferenceShape),
  },
  sasPolicy: { armPath: ["sasPolicy"], value: createDeferredShape(() => sasPolicyShape) },
  secondaryEndpoints: {
    armPath: ["secondaryEndpoints"],
    value: createDeferredShape(() => endpointsShape),
    readOnly: true,
  },
  secondaryLocation: { armPath: ["secondaryLocation"], value: createStringShape(), readOnly: true },
  statusOfPrimary: { armPath: ["statusOfPrimary"], value: createEnumShape(), readOnly: true },
  statusOfSecondary: { armPath: ["statusOfSecondary"], value: createEnumShape(), readOnly: true },
  storageAccountSkuConversionStatus: {
    armPath: ["storageAccountSkuConversionStatus"],
    value: createDeferredShape(() => storageAccountSkuConversionStatusShape),
    readOnly: true,
  },
  enableHttpsTrafficOnly: { armPath: ["supportsHttpsTrafficOnly"], value: createBooleanShape() },
});

/**
 * Defines shared key access properties for a storage account.
 */
export interface StorageAccountSharedKeyAccessProperties {
  /**
   * Shared key access settings for Blob service.
   */
  blob?: ServiceSharedKeyAccessProperties;
  /**
   * Shared key access settings for File service.
   */
  file?: ServiceSharedKeyAccessProperties;
  /**
   * Shared key access settings for Queue service.
   */
  queue?: ServiceSharedKeyAccessProperties;
  /**
   * Shared key access settings for Table service.
   */
  table?: ServiceSharedKeyAccessProperties;
}

/**
 * Input type for Defines shared key access properties for a storage account.
 */
export interface StorageAccountSharedKeyAccessPropertiesInput extends InputOf<StorageAccountSharedKeyAccessProperties> {
  /**
   * Shared key access settings for Blob service.
   */
  blob?: ServiceSharedKeyAccessPropertiesInput | undefined;
  /**
   * Shared key access settings for File service.
   */
  file?: ServiceSharedKeyAccessPropertiesInput | undefined;
  /**
   * Shared key access settings for Queue service.
   */
  queue?: ServiceSharedKeyAccessPropertiesInput | undefined;
  /**
   * Shared key access settings for Table service.
   */
  table?: ServiceSharedKeyAccessPropertiesInput | undefined;
}

/**
 * View type for Defines shared key access properties for a storage account.
 */
export type StorageAccountSharedKeyAccessPropertiesView =
  StorageAccountSharedKeyAccessPropertiesInput;

export const storageAccountSharedKeyAccessPropertiesShape: FlatModelShape = createFlatModelShape({
  blob: {
    armPath: ["blob"],
    value: createDeferredShape(() => serviceSharedKeyAccessPropertiesShape),
  },
  file: {
    armPath: ["file"],
    value: createDeferredShape(() => serviceSharedKeyAccessPropertiesShape),
  },
  queue: {
    armPath: ["queue"],
    value: createDeferredShape(() => serviceSharedKeyAccessPropertiesShape),
  },
  table: {
    armPath: ["table"],
    value: createDeferredShape(() => serviceSharedKeyAccessPropertiesShape),
  },
});

/**
 * This defines the sku conversion status object for asynchronous sku conversions.
 */
export interface StorageAccountSkuConversionStatus {
  /**
   * This property represents the sku conversion end time.
   */
  endTime?: string;
  /**
   * This property indicates the current sku conversion status.
   */
  skuConversionStatus?: SkuConversionStatus;
  /**
   * This property represents the sku conversion start time.
   */
  startTime?: string;
  /**
   * This property represents the target sku name to which the account sku is being converted asynchronously.
   */
  targetSkuName?: SkuName;
}

/**
 * Input type for This defines the sku conversion status object for asynchronous sku conversions.
 */
export interface StorageAccountSkuConversionStatusInput extends InputOf<StorageAccountSkuConversionStatus> {}

/**
 * View type for This defines the sku conversion status object for asynchronous sku conversions.
 */
export interface StorageAccountSkuConversionStatusView extends InputOf<StorageAccountSkuConversionStatus> {
  /**
   * Read-only output: This property represents the sku conversion end time.
   */
  readonly endTime?: Expression<string> | undefined;
  /**
   * Read-only output: This property indicates the current sku conversion status.
   */
  readonly skuConversionStatus?: Expression<SkuConversionStatus> | undefined;
  /**
   * Read-only output: This property represents the sku conversion start time.
   */
  readonly startTime?: Expression<string> | undefined;
  /**
   * Read-only output: This property represents the target sku name to which the account sku is being converted asynchronously.
   */
  readonly targetSkuName?: Expression<SkuName> | undefined;
}

export const storageAccountSkuConversionStatusShape: FlatModelShape = createFlatModelShape({
  endTime: { armPath: ["endTime"], value: createStringShape(), readOnly: true },
  skuConversionStatus: {
    armPath: ["skuConversionStatus"],
    value: createUnionShape(),
    readOnly: true,
  },
  startTime: { armPath: ["startTime"], value: createStringShape(), readOnly: true },
  targetSkuName: { armPath: ["targetSkuName"], value: createUnionShape(), readOnly: true },
});

/**
 * The authentication properties of the backing data source
 */
export type StorageConnectorAuthProperties = ManagedIdentityAuthProperties;

/**
 * Input type for The authentication properties of the backing data source
 */
export type StorageConnectorAuthPropertiesInput = ManagedIdentityAuthPropertiesInput;

/**
 * View type for The authentication properties of the backing data source
 */
export type StorageConnectorAuthPropertiesView = ManagedIdentityAuthPropertiesView;

export const storageConnectorAuthPropertiesShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("type", {
    ManagedIdentity: createDeferredShape(() => managedIdentityAuthPropertiesShape),
  });

/**
 * The connection properties of the backing data source
 */
export type StorageConnectorConnection = DataShareConnection;

/**
 * Input type for The connection properties of the backing data source
 */
export type StorageConnectorConnectionInput = DataShareConnectionInput;

/**
 * View type for The connection properties of the backing data source
 */
export type StorageConnectorConnectionView = DataShareConnectionView;

export const storageConnectorConnectionShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("type", {
    DataShare: createDeferredShape(() => dataShareConnectionShape),
  });

/**
 * The storage connector properties
 */
export interface StorageConnectorProperties {
  /**
   * System-generated creation time of the Storage Connector in ISO 8601 date-time format (YYYY-MM-DDTHH:mm:ssZ).
   * Not a valid input parameter during creating.
   */
  creationTime?: string;
  /**
   * The type of backing data source for this Storage Connector.
   */
  dataSourceType: StorageConnectorDataSourceType;
  /**
   * Arbitrary description of this Storage Connector. Max 250 characters.
   */
  description?: string;
  /**
   * Represents the provisioning state of the storage connector.
   */
  provisioningState?: NativeDataSharingProvisioningState;
  /**
   * Information about how to communicate with and authenticate to the backing data store.
   */
  source: StorageConnectorSource;
  /**
   * State - Active or Inactive. Whether or not the Storage Connector should start as active (default: Active)
   * (While set to false on the Storage Connector, all data plane requests using this Storage Connector fail, and this Storage Connector is not billed if it would be otherwise.
   */
  state?: StorageConnectorState;
  /**
   * Test connection to backing data source before creating the storage connector.
   */
  testConnection?: boolean;
  /**
   * System-generated GUID identifier for the Storage Connector. Not a valid input parameter when creating.
   */
  uniqueId?: string;
}

/**
 * Input type for The storage connector properties
 */
export interface StorageConnectorPropertiesInput extends InputOf<StorageConnectorProperties> {
  /**
   * The type of backing data source for this Storage Connector.
   */
  dataSourceType: ExpressionOrValue<StorageConnectorDataSourceType>;
  /**
   * Arbitrary description of this Storage Connector. Max 250 characters.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Information about how to communicate with and authenticate to the backing data store.
   */
  source: StorageConnectorSourceInput;
  /**
   * State - Active or Inactive. Whether or not the Storage Connector should start as active (default: Active)
   * (While set to false on the Storage Connector, all data plane requests using this Storage Connector fail, and this Storage Connector is not billed if it would be otherwise.
   */
  state?: ExpressionOrValue<StorageConnectorState> | undefined;
  /**
   * Test connection to backing data source before creating the storage connector.
   */
  testConnection?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The storage connector properties
 */
export interface StorageConnectorPropertiesView extends InputOf<StorageConnectorProperties> {
  /**
   * Read-only output: System-generated creation time of the Storage Connector in ISO 8601 date-time format (YYYY-MM-DDTHH:mm:ssZ).
   * Not a valid input parameter during creating.
   */
  readonly creationTime?: Expression<string> | undefined;
  /**
   * The type of backing data source for this Storage Connector.
   */
  dataSourceType: ExpressionOrValue<StorageConnectorDataSourceType>;
  /**
   * Arbitrary description of this Storage Connector. Max 250 characters.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Represents the provisioning state of the storage connector.
   */
  readonly provisioningState?: Expression<NativeDataSharingProvisioningState> | undefined;
  /**
   * Information about how to communicate with and authenticate to the backing data store.
   */
  source: StorageConnectorSourceView;
  /**
   * State - Active or Inactive. Whether or not the Storage Connector should start as active (default: Active)
   * (While set to false on the Storage Connector, all data plane requests using this Storage Connector fail, and this Storage Connector is not billed if it would be otherwise.
   */
  state?: ExpressionOrValue<StorageConnectorState> | undefined;
  /**
   * Test connection to backing data source before creating the storage connector.
   */
  testConnection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: System-generated GUID identifier for the Storage Connector. Not a valid input parameter when creating.
   */
  readonly uniqueId?: Expression<string> | undefined;
}

export const storageConnectorPropertiesShape: FlatModelShape = createFlatModelShape({
  creationTime: { armPath: ["creationTime"], value: createStringShape(), readOnly: true },
  dataSourceType: { armPath: ["dataSourceType"], value: createUnionShape() },
  description: { armPath: ["description"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  source: { armPath: ["source"], value: createDeferredShape(() => storageConnectorSourceShape) },
  state: { armPath: ["state"], value: createUnionShape() },
  testConnection: { armPath: ["testConnection"], value: createBooleanShape() },
  uniqueId: { armPath: ["uniqueId"], value: createStringShape(), readOnly: true },
});

/**
 * The storage connector backing data source information
 */
export type StorageConnectorSource = DataShareSource;

/**
 * Input type for The storage connector backing data source information
 */
export type StorageConnectorSourceInput = DataShareSourceInput;

/**
 * View type for The storage connector backing data source information
 */
export type StorageConnectorSourceView = DataShareSourceView;

export const storageConnectorSourceShape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "type",
  {
    DataShare: createDeferredShape(() => dataShareSourceShape),
  },
);

/**
 * Defines Data Collaboration Policy for a storage account.
 */
export interface StorageDataCollaborationPolicyProperties {
  /**
   * Indicates whether cross-entra tenant data sharing is allowed on the storage account.
   */
  allowCrossTenantDataSharing?: boolean;
  /**
   * Indicates whether storage connectors are allowed to created or managed on the storage account.
   */
  allowStorageConnectors?: boolean;
  /**
   * Indicates whether data shares are allowed to be created or managed on the storage account.
   */
  allowStorageDataShares?: boolean;
}

/**
 * Input type for Defines Data Collaboration Policy for a storage account.
 */
export interface StorageDataCollaborationPolicyPropertiesInput extends InputOf<StorageDataCollaborationPolicyProperties> {
  /**
   * Indicates whether cross-entra tenant data sharing is allowed on the storage account.
   */
  allowCrossTenantDataSharing?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether storage connectors are allowed to created or managed on the storage account.
   */
  allowStorageConnectors?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates whether data shares are allowed to be created or managed on the storage account.
   */
  allowStorageDataShares?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Defines Data Collaboration Policy for a storage account.
 */
export type StorageDataCollaborationPolicyPropertiesView =
  StorageDataCollaborationPolicyPropertiesInput;

export const storageDataCollaborationPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  allowCrossTenantDataSharing: {
    armPath: ["allowCrossTenantDataSharing"],
    value: createBooleanShape(),
  },
  allowStorageConnectors: { armPath: ["allowStorageConnectors"], value: createBooleanShape() },
  allowStorageDataShares: { armPath: ["allowStorageDataShares"], value: createBooleanShape() },
});

/**
 * Policy that specify the permission allowed to a managed identity
 */
export interface StorageDataShareAccessPolicy {
  /**
   * Allowed permissions. Currently, only supported value is Read.
   */
  permission: StorageDataShareAccessPolicyPermission;
  /**
   * The AAD principal ID of the Managed Identity.
   */
  principalId: string;
  /**
   * The AAD tenant ID of the Managed Identity.
   */
  tenantId: string;
}

/**
 * Input type for Policy that specify the permission allowed to a managed identity
 */
export interface StorageDataShareAccessPolicyInput extends InputOf<StorageDataShareAccessPolicy> {
  /**
   * Allowed permissions. Currently, only supported value is Read.
   */
  permission: ExpressionOrValue<StorageDataShareAccessPolicyPermission>;
  /**
   * The AAD principal ID of the Managed Identity.
   */
  principalId: ExpressionOrValue<string>;
  /**
   * The AAD tenant ID of the Managed Identity.
   */
  tenantId: ExpressionOrValue<string>;
}

/**
 * View type for Policy that specify the permission allowed to a managed identity
 */
export type StorageDataShareAccessPolicyView = StorageDataShareAccessPolicyInput;

export const storageDataShareAccessPolicyShape: FlatModelShape = createFlatModelShape({
  permission: { armPath: ["permission"], value: createUnionShape() },
  principalId: { armPath: ["principalId"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * Properties of a shared resource.
 */
export interface StorageDataShareAsset {
  /**
   * Source Path to be shared. It can be a folder or a blob.
   * The asset path should contain container name followed by path within the container, e.g. /container1/logs/external.
   */
  assetPath: string;
  /**
   * Consumer visible name of the original path.
   */
  displayName: string;
}

/**
 * Input type for Properties of a shared resource.
 */
export interface StorageDataShareAssetInput extends InputOf<StorageDataShareAsset> {
  /**
   * Source Path to be shared. It can be a folder or a blob.
   * The asset path should contain container name followed by path within the container, e.g. /container1/logs/external.
   */
  assetPath: ExpressionOrValue<string>;
  /**
   * Consumer visible name of the original path.
   */
  displayName: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a shared resource.
 */
export type StorageDataShareAssetView = StorageDataShareAssetInput;

export const storageDataShareAssetShape: FlatModelShape = createFlatModelShape({
  assetPath: { armPath: ["assetPath"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
});

/**
 * The storage datashare properties
 */
export interface StorageDataShareProperties {
  /**
   * List of access policies that specify the permission allowed to a managed identity.
   * For Create - This property is required and cannot be null. If no access policies are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing access policies are left unchanged.
   * If provided with a non-null value, the existing access policies are replaced with the specified list.
   */
  accessPolicies: StorageDataShareAccessPolicy[];
  /**
   * List of assets that specify the properties of the shared resources.
   * For Create - This property is required and cannot be null. If no assets are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing assets are left unchanged.
   * If provided with a non-null value, the existing assets are replaced with the specified list.
   */
  assets: StorageDataShareAsset[];
  /**
   * System-generated GUID identifier for the Storage DataShare. Not a valid input parameter when creating.
   */
  dataShareIdentifier?: string;
  /**
   * The DataShare URI to be shared with the consumer.
   * URI Format - 'azds://<location>:<dataShareName>:<dataShareIdentifier>'.
   */
  dataShareUri?: string;
  /**
   * Arbitrary description of this Data Share. Max 250 characters.
   */
  description?: string;
  /**
   * Represents the provisioning state of the storage datashare.
   */
  provisioningState?: NativeDataSharingProvisioningState;
}

/**
 * Input type for The storage datashare properties
 */
export interface StorageDataSharePropertiesInput extends InputOf<StorageDataShareProperties> {
  /**
   * List of access policies that specify the permission allowed to a managed identity.
   * For Create - This property is required and cannot be null. If no access policies are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing access policies are left unchanged.
   * If provided with a non-null value, the existing access policies are replaced with the specified list.
   */
  accessPolicies: InputArray<StorageDataShareAccessPolicyInput, StorageDataShareAccessPolicy[]>;
  /**
   * List of assets that specify the properties of the shared resources.
   * For Create - This property is required and cannot be null. If no assets are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing assets are left unchanged.
   * If provided with a non-null value, the existing assets are replaced with the specified list.
   */
  assets: InputArray<StorageDataShareAssetInput, StorageDataShareAsset[]>;
  /**
   * Arbitrary description of this Data Share. Max 250 characters.
   */
  description?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The storage datashare properties
 */
export interface StorageDataSharePropertiesView extends InputOf<StorageDataShareProperties> {
  /**
   * List of access policies that specify the permission allowed to a managed identity.
   * For Create - This property is required and cannot be null. If no access policies are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing access policies are left unchanged.
   * If provided with a non-null value, the existing access policies are replaced with the specified list.
   */
  accessPolicies: InputArray<StorageDataShareAccessPolicyView, StorageDataShareAccessPolicy[]>;
  /**
   * List of assets that specify the properties of the shared resources.
   * For Create - This property is required and cannot be null. If no assets are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing assets are left unchanged.
   * If provided with a non-null value, the existing assets are replaced with the specified list.
   */
  assets: InputArray<StorageDataShareAssetView, StorageDataShareAsset[]>;
  /**
   * Read-only output: System-generated GUID identifier for the Storage DataShare. Not a valid input parameter when creating.
   */
  readonly dataShareIdentifier?: Expression<string> | undefined;
  /**
   * Read-only output: The DataShare URI to be shared with the consumer.
   * URI Format - 'azds://<location>:<dataShareName>:<dataShareIdentifier>'.
   */
  readonly dataShareUri?: Expression<string> | undefined;
  /**
   * Arbitrary description of this Data Share. Max 250 characters.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Represents the provisioning state of the storage datashare.
   */
  readonly provisioningState?: Expression<NativeDataSharingProvisioningState> | undefined;
}

export const storageDataSharePropertiesShape: FlatModelShape = createFlatModelShape({
  accessPolicies: {
    armPath: ["accessPolicies"],
    value: createArrayShape(createDeferredShape(() => storageDataShareAccessPolicyShape)),
  },
  assets: {
    armPath: ["assets"],
    value: createArrayShape(createDeferredShape(() => storageDataShareAssetShape)),
  },
  dataShareIdentifier: {
    armPath: ["dataShareIdentifier"],
    value: createStringShape(),
    readOnly: true,
  },
  dataShareUri: { armPath: ["dataShareUri"], value: createStringShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * The Private Endpoint Connection resource.
 */
export interface StoragePrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the private endpoint connection associated with the Azure resource
   */
  name?: string;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for The Private Endpoint Connection resource.
 */
export interface StoragePrivateEndpointConnectionInput extends InputOf<StoragePrivateEndpointConnection> {
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for The Private Endpoint Connection resource.
 */
export interface StoragePrivateEndpointConnectionView extends InputOf<StoragePrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection associated with the Azure resource
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const storagePrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Execution context of the storage task assignment.
 */
export interface StorageTaskAssignmentExecutionContext {
  /**
   * Execution target of the storage task assignment
   */
  target?: ExecutionTarget;
  /**
   * Execution trigger of the storage task assignment
   */
  trigger: ExecutionTrigger;
}

/**
 * Input type for Execution context of the storage task assignment.
 */
export interface StorageTaskAssignmentExecutionContextInput extends InputOf<StorageTaskAssignmentExecutionContext> {
  /**
   * Execution target of the storage task assignment
   */
  target?: ExecutionTargetInput | undefined;
  /**
   * Execution trigger of the storage task assignment
   */
  trigger: ExecutionTriggerInput;
}

/**
 * View type for Execution context of the storage task assignment.
 */
export type StorageTaskAssignmentExecutionContextView = StorageTaskAssignmentExecutionContextInput;

export const storageTaskAssignmentExecutionContextShape: FlatModelShape = createFlatModelShape({
  target: { armPath: ["target"], value: createDeferredShape(() => executionTargetShape) },
  trigger: { armPath: ["trigger"], value: createDeferredShape(() => executionTriggerShape) },
});

/**
 * Properties of the storage task assignment.
 */
export interface StorageTaskAssignmentProperties {
  /**
   * Text that describes the purpose of the storage task assignment
   */
  description: string;
  /**
   * Whether the storage task assignment is enabled or not
   */
  enabled: boolean;
  /**
   * The storage task assignment execution context
   */
  executionContext: StorageTaskAssignmentExecutionContext;
  /**
   * Represents the provisioning state of the storage task assignment.
   */
  provisioningState?: StorageTaskAssignmentProvisioningState;
  /**
   * The storage task assignment report
   */
  report: StorageTaskAssignmentReport;
  /**
   * Run status of storage task assignment
   */
  runStatus?: StorageTaskReportProperties;
  /**
   * Id of the corresponding storage task
   */
  taskId: string;
}

/**
 * Input type for Properties of the storage task assignment.
 */
export interface StorageTaskAssignmentPropertiesInput extends InputOf<StorageTaskAssignmentProperties> {
  /**
   * Text that describes the purpose of the storage task assignment
   */
  description: ExpressionOrValue<string>;
  /**
   * Whether the storage task assignment is enabled or not
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * The storage task assignment execution context
   */
  executionContext: StorageTaskAssignmentExecutionContextInput;
  /**
   * The storage task assignment report
   */
  report: StorageTaskAssignmentReportInput;
  /**
   * Run status of storage task assignment
   */
  runStatus?: StorageTaskReportPropertiesInput | undefined;
  /**
   * Id of the corresponding storage task
   */
  taskId: ExpressionOrValue<string>;
}

/**
 * View type for Properties of the storage task assignment.
 */
export interface StorageTaskAssignmentPropertiesView extends InputOf<StorageTaskAssignmentProperties> {
  /**
   * Text that describes the purpose of the storage task assignment
   */
  description: ExpressionOrValue<string>;
  /**
   * Whether the storage task assignment is enabled or not
   */
  enabled: ExpressionOrValue<boolean>;
  /**
   * The storage task assignment execution context
   */
  executionContext: StorageTaskAssignmentExecutionContextView;
  /**
   * Read-only output: Represents the provisioning state of the storage task assignment.
   */
  readonly provisioningState?: Expression<StorageTaskAssignmentProvisioningState> | undefined;
  /**
   * The storage task assignment report
   */
  report: StorageTaskAssignmentReportView;
  /**
   * Run status of storage task assignment
   */
  runStatus?: StorageTaskReportPropertiesView | undefined;
  /**
   * Id of the corresponding storage task
   */
  taskId: ExpressionOrValue<string>;
}

export const storageTaskAssignmentPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  executionContext: {
    armPath: ["executionContext"],
    value: createDeferredShape(() => storageTaskAssignmentExecutionContextShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  report: {
    armPath: ["report"],
    value: createDeferredShape(() => storageTaskAssignmentReportShape),
  },
  runStatus: {
    armPath: ["runStatus"],
    value: createDeferredShape(() => storageTaskReportPropertiesShape),
  },
  taskId: { armPath: ["taskId"], value: createStringShape() },
});

/**
 * The storage task assignment report
 */
export interface StorageTaskAssignmentReport {
  /**
   * The container prefix for the location of storage task assignment report
   */
  prefix: string;
}

/**
 * Input type for The storage task assignment report
 */
export interface StorageTaskAssignmentReportInput extends InputOf<StorageTaskAssignmentReport> {
  /**
   * The container prefix for the location of storage task assignment report
   */
  prefix: ExpressionOrValue<string>;
}

/**
 * View type for The storage task assignment report
 */
export type StorageTaskAssignmentReportView = StorageTaskAssignmentReportInput;

export const storageTaskAssignmentReportShape: FlatModelShape = createFlatModelShape({
  prefix: { armPath: ["prefix"], value: createStringShape() },
});

/**
 * Storage task execution report for a run instance.
 */
export interface StorageTaskReportProperties {
  /**
   * End time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  finishTime?: string;
  /**
   * Total number of objects where task operation failed when was attempted. Filter options such as objectFailedCount eq 0 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  objectFailedCount?: string;
  /**
   * Total number of objects that meet the storage tasks condition and were operated upon. Filter options such as objectsOperatedOnCount ge 100 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  objectsOperatedOnCount?: string;
  /**
   * Total number of objects where task operation succeeded when was attempted.Filter options such as objectsSucceededCount gt 150 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  objectsSucceededCount?: string;
  /**
   * Total number of objects that meet the condition as defined in the storage task assignment execution context. Filter options such as objectsTargetedCount gt 50 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  objectsTargetedCount?: string;
  /**
   * Represents the overall result of the execution for the run instance
   */
  runResult?: RunResult;
  /**
   * Represents the status of the execution.
   */
  runStatusEnum?: RunStatusEnum;
  /**
   * Well known Azure Storage error code that represents the error encountered during execution of the run instance.
   */
  runStatusError?: string;
  /**
   * Start time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  startTime?: string;
  /**
   * Represents the Storage Account Id where the storage task definition was applied and executed.
   */
  storageAccountId?: string;
  /**
   * Full path to the verbose report stored in the reporting container as specified in the assignment execution context for the storage account.
   */
  summaryReportPath?: string;
  /**
   * Represents the Storage Task Assignment Id associated with the storage task that provided an execution context.
   */
  taskAssignmentId?: string;
  /**
   * Storage Task Arm Id.
   */
  taskId?: string;
  /**
   * Storage Task Version
   */
  taskVersion?: string;
}

/**
 * Input type for Storage task execution report for a run instance.
 */
export interface StorageTaskReportPropertiesInput extends InputOf<StorageTaskReportProperties> {}

/**
 * View type for Storage task execution report for a run instance.
 */
export interface StorageTaskReportPropertiesView extends InputOf<StorageTaskReportProperties> {
  /**
   * Read-only output: End time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly finishTime?: Expression<string> | undefined;
  /**
   * Read-only output: Total number of objects where task operation failed when was attempted. Filter options such as objectFailedCount eq 0 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly objectFailedCount?: Expression<string> | undefined;
  /**
   * Read-only output: Total number of objects that meet the storage tasks condition and were operated upon. Filter options such as objectsOperatedOnCount ge 100 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly objectsOperatedOnCount?: Expression<string> | undefined;
  /**
   * Read-only output: Total number of objects where task operation succeeded when was attempted.Filter options such as objectsSucceededCount gt 150 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly objectsSucceededCount?: Expression<string> | undefined;
  /**
   * Read-only output: Total number of objects that meet the condition as defined in the storage task assignment execution context. Filter options such as objectsTargetedCount gt 50 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly objectsTargetedCount?: Expression<string> | undefined;
  /**
   * Read-only output: Represents the overall result of the execution for the run instance
   */
  readonly runResult?: Expression<RunResult> | undefined;
  /**
   * Read-only output: Represents the status of the execution.
   */
  readonly runStatusEnum?: Expression<RunStatusEnum> | undefined;
  /**
   * Read-only output: Well known Azure Storage error code that represents the error encountered during execution of the run instance.
   */
  readonly runStatusError?: Expression<string> | undefined;
  /**
   * Read-only output: Start time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators
   */
  readonly startTime?: Expression<string> | undefined;
  /**
   * Read-only output: Represents the Storage Account Id where the storage task definition was applied and executed.
   */
  readonly storageAccountId?: Expression<string> | undefined;
  /**
   * Read-only output: Full path to the verbose report stored in the reporting container as specified in the assignment execution context for the storage account.
   */
  readonly summaryReportPath?: Expression<string> | undefined;
  /**
   * Read-only output: Represents the Storage Task Assignment Id associated with the storage task that provided an execution context.
   */
  readonly taskAssignmentId?: Expression<string> | undefined;
  /**
   * Read-only output: Storage Task Arm Id.
   */
  readonly taskId?: Expression<string> | undefined;
  /**
   * Read-only output: Storage Task Version
   */
  readonly taskVersion?: Expression<string> | undefined;
}

export const storageTaskReportPropertiesShape: FlatModelShape = createFlatModelShape({
  finishTime: { armPath: ["finishTime"], value: createStringShape(), readOnly: true },
  objectFailedCount: { armPath: ["objectFailedCount"], value: createStringShape(), readOnly: true },
  objectsOperatedOnCount: {
    armPath: ["objectsOperatedOnCount"],
    value: createStringShape(),
    readOnly: true,
  },
  objectsSucceededCount: {
    armPath: ["objectsSucceededCount"],
    value: createStringShape(),
    readOnly: true,
  },
  objectsTargetedCount: {
    armPath: ["objectsTargetedCount"],
    value: createStringShape(),
    readOnly: true,
  },
  runResult: { armPath: ["runResult"], value: createUnionShape(), readOnly: true },
  runStatusEnum: { armPath: ["runStatusEnum"], value: createUnionShape(), readOnly: true },
  runStatusError: { armPath: ["runStatusError"], value: createStringShape(), readOnly: true },
  startTime: { armPath: ["startTime"], value: createStringShape(), readOnly: true },
  storageAccountId: { armPath: ["storageAccountId"], value: createStringShape(), readOnly: true },
  summaryReportPath: { armPath: ["summaryReportPath"], value: createStringShape(), readOnly: true },
  taskAssignmentId: { armPath: ["taskAssignmentId"], value: createStringShape(), readOnly: true },
  taskId: { armPath: ["taskId"], value: createStringShape(), readOnly: true },
  taskVersion: { armPath: ["taskVersion"], value: createStringShape(), readOnly: true },
});

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
}

/**
 * Input type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataInput extends InputOf<SystemData> {}

/**
 * View type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataView extends InputOf<SystemData> {
  /**
   * Read-only output: The timestamp of resource creation (UTC).
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that created the resource.
   */
  readonly createdBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that created the resource.
   */
  readonly createdByType?: Expression<CreatedByType> | undefined;
  /**
   * Read-only output: The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that last modified the resource.
   */
  readonly lastModifiedBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that last modified the resource.
   */
  readonly lastModifiedByType?: Expression<CreatedByType> | undefined;
}

export const systemDataShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  createdBy: { armPath: ["createdBy"], value: createStringShape(), readOnly: true },
  createdByType: { armPath: ["createdByType"], value: createUnionShape(), readOnly: true },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastModifiedBy: { armPath: ["lastModifiedBy"], value: createStringShape(), readOnly: true },
  lastModifiedByType: {
    armPath: ["lastModifiedByType"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * Table Access Policy Properties Object.
 */
export interface TableAccessPolicy {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: Date;
  /**
   * Required. List of abbreviated permissions. Supported permission values include 'r','a','u','d'
   */
  permission: string;
  /**
   * Start time of the access policy
   */
  startTime?: Date;
}

/**
 * Input type for Table Access Policy Properties Object.
 */
export interface TableAccessPolicyInput extends InputOf<TableAccessPolicy> {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Required. List of abbreviated permissions. Supported permission values include 'r','a','u','d'
   */
  permission: ExpressionOrValue<string>;
  /**
   * Start time of the access policy
   */
  startTime?: ExpressionOrValue<Date> | undefined;
}

/**
 * View type for Table Access Policy Properties Object.
 */
export type TableAccessPolicyView = TableAccessPolicyInput;

export const tableAccessPolicyShape: FlatModelShape = createFlatModelShape({
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  permission: { armPath: ["permission"], value: createStringShape() },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

export interface TableProperties {
  /**
   * List of stored access policies specified on the table.
   */
  signedIdentifiers?: TableSignedIdentifier[];
  /**
   * Table name under the specified account
   */
  tableName?: string;
}

export interface TablePropertiesInput extends InputOf<TableProperties> {
  /**
   * List of stored access policies specified on the table.
   */
  signedIdentifiers?: InputArray<TableSignedIdentifierInput, TableSignedIdentifier[]> | undefined;
}

export interface TablePropertiesView extends InputOf<TableProperties> {
  /**
   * List of stored access policies specified on the table.
   */
  signedIdentifiers?: InputArray<TableSignedIdentifierView, TableSignedIdentifier[]> | undefined;
  /**
   * Read-only output: Table name under the specified account
   */
  readonly tableName?: Expression<string> | undefined;
}

export const tablePropertiesShape: FlatModelShape = createFlatModelShape({
  signedIdentifiers: {
    armPath: ["signedIdentifiers"],
    value: createArrayShape(createDeferredShape(() => tableSignedIdentifierShape)),
  },
  tableName: { armPath: ["tableName"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a storage account’s Table service.
 */
export interface TableServicePropertiesProperties {
  /**
   * Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service.
   */
  cors?: CorsRules;
}

/**
 * Input type for The properties of a storage account’s Table service.
 */
export interface TableServicePropertiesPropertiesInput extends InputOf<TableServicePropertiesProperties> {
  /**
   * Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service.
   */
  cors?: CorsRulesInput | undefined;
}

/**
 * View type for The properties of a storage account’s Table service.
 */
export type TableServicePropertiesPropertiesView = TableServicePropertiesPropertiesInput;

export const tableServicePropertiesPropertiesShape: FlatModelShape = createFlatModelShape({
  cors: { armPath: ["cors"], value: createDeferredShape(() => corsRulesShape) },
});

/**
 * Object to set Table Access Policy.
 */
export interface TableSignedIdentifier {
  /**
   * Access policy
   */
  accessPolicy?: TableAccessPolicy;
  /**
   * unique-64-character-value of the stored access policy.
   */
  id: string;
}

/**
 * Input type for Object to set Table Access Policy.
 */
export interface TableSignedIdentifierInput extends InputOf<TableSignedIdentifier> {
  /**
   * Access policy
   */
  accessPolicy?: TableAccessPolicyInput | undefined;
  /**
   * unique-64-character-value of the stored access policy.
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for Object to set Table Access Policy.
 */
export type TableSignedIdentifierView = TableSignedIdentifierInput;

export const tableSignedIdentifierShape: FlatModelShape = createFlatModelShape({
  accessPolicy: {
    armPath: ["accessPolicy"],
    value: createDeferredShape(() => tableAccessPolicyShape),
  },
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Blob index tag based filtering for blob objects
 */
export interface TagFilter {
  /**
   * This is the filter tag name, it can have 1 - 128 characters
   */
  name: string;
  /**
   * This is the comparison operator which is used for object comparison and filtering. Only == (equality operator) is currently supported
   */
  op: string;
  /**
   * This is the filter tag value field used for tag based filtering, it can have 0 - 256 characters
   */
  value: string;
}

/**
 * Input type for Blob index tag based filtering for blob objects
 */
export interface TagFilterInput extends InputOf<TagFilter> {
  /**
   * This is the filter tag name, it can have 1 - 128 characters
   */
  name: ExpressionOrValue<string>;
  /**
   * This is the comparison operator which is used for object comparison and filtering. Only == (equality operator) is currently supported
   */
  op: ExpressionOrValue<string>;
  /**
   * This is the filter tag value field used for tag based filtering, it can have 0 - 256 characters
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for Blob index tag based filtering for blob objects
 */
export type TagFilterView = TagFilterInput;

export const tagFilterShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  op: { armPath: ["op"], value: createStringShape() },
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * A tag of the LegalHold of a blob container.
 */
export interface TagProperty {
  /**
   * Returns the Object ID of the user who added the tag.
   */
  objectIdentifier?: string;
  /**
   * The tag value.
   */
  tag?: string;
  /**
   * Returns the Tenant ID that issued the token for the user who added the tag.
   */
  tenantId?: string;
  /**
   * Returns the date and time the tag was added.
   */
  timestamp?: Date;
  /**
   * Returns the User Principal Name of the user who added the tag.
   */
  upn?: string;
}

/**
 * Input type for A tag of the LegalHold of a blob container.
 */
export interface TagPropertyInput extends InputOf<TagProperty> {}

/**
 * View type for A tag of the LegalHold of a blob container.
 */
export interface TagPropertyView extends InputOf<TagProperty> {
  /**
   * Read-only output: Returns the Object ID of the user who added the tag.
   */
  readonly objectIdentifier?: Expression<string> | undefined;
  /**
   * Read-only output: The tag value.
   */
  readonly tag?: Expression<string> | undefined;
  /**
   * Read-only output: Returns the Tenant ID that issued the token for the user who added the tag.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Read-only output: Returns the date and time the tag was added.
   */
  readonly timestamp?: Expression<Date> | undefined;
  /**
   * Read-only output: Returns the User Principal Name of the user who added the tag.
   */
  readonly upn?: Expression<string> | undefined;
}

export const tagPropertyShape: FlatModelShape = createFlatModelShape({
  objectIdentifier: { armPath: ["objectIdentifier"], value: createStringShape(), readOnly: true },
  tag: { armPath: ["tag"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  timestamp: {
    armPath: ["timestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  upn: { armPath: ["upn"], value: createStringShape(), readOnly: true },
});

/**
 * The trigger parameters update for the storage task assignment execution
 */
export interface TriggerParameters {
  /**
   * When to end task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  endBy?: Date;
  /**
   * Run interval of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  interval?: number;
  /**
   * Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  intervalUnit?: IntervalUnit;
  /**
   * When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  startFrom?: Date;
  /**
   * When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule'
   */
  startOn?: Date;
}

/**
 * Input type for The trigger parameters update for the storage task assignment execution
 */
export interface TriggerParametersInput extends InputOf<TriggerParameters> {
  /**
   * When to end task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  endBy?: ExpressionOrValue<Date> | undefined;
  /**
   * Run interval of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  interval?: ExpressionOrValue<number> | undefined;
  /**
   * Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  intervalUnit?: ExpressionOrValue<IntervalUnit> | undefined;
  /**
   * When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  startFrom?: ExpressionOrValue<Date> | undefined;
  /**
   * When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule'
   */
  startOn?: ExpressionOrValue<Date> | undefined;
}

/**
 * View type for The trigger parameters update for the storage task assignment execution
 */
export type TriggerParametersView = TriggerParametersInput;

export const triggerParametersShape: FlatModelShape = createFlatModelShape({
  endBy: {
    armPath: ["endBy"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  interval: { armPath: ["interval"], value: createNumberShape() },
  intervalUnit: { armPath: ["intervalUnit"], value: createUnionShape() },
  startFrom: {
    armPath: ["startFrom"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  startOn: {
    armPath: ["startOn"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

/**
 * An update history of the ImmutabilityPolicy of a blob container.
 */
export interface UpdateHistoryProperty {
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  allowProtectedAppendWrites?: boolean;
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  allowProtectedAppendWritesAll?: boolean;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: number;
  /**
   * Returns the Object ID of the user who updated the ImmutabilityPolicy.
   */
  objectIdentifier?: string;
  /**
   * Returns the Tenant ID that issued the token for the user who updated the ImmutabilityPolicy.
   */
  tenantId?: string;
  /**
   * Returns the date and time the ImmutabilityPolicy was updated.
   */
  timestamp?: Date;
  /**
   * The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend.
   */
  update?: ImmutabilityPolicyUpdateType;
  /**
   * Returns the User Principal Name of the user who updated the ImmutabilityPolicy.
   */
  upn?: string;
}

/**
 * Input type for An update history of the ImmutabilityPolicy of a blob container.
 */
export interface UpdateHistoryPropertyInput extends InputOf<UpdateHistoryProperty> {}

/**
 * View type for An update history of the ImmutabilityPolicy of a blob container.
 */
export interface UpdateHistoryPropertyView extends InputOf<UpdateHistoryProperty> {
  /**
   * Read-only output: This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  readonly allowProtectedAppendWrites?: Expression<boolean> | undefined;
  /**
   * Read-only output: This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  readonly allowProtectedAppendWritesAll?: Expression<boolean> | undefined;
  /**
   * Read-only output: The immutability period for the blobs in the container since the policy creation, in days.
   */
  readonly immutabilityPeriodSinceCreationInDays?: Expression<number> | undefined;
  /**
   * Read-only output: Returns the Object ID of the user who updated the ImmutabilityPolicy.
   */
  readonly objectIdentifier?: Expression<string> | undefined;
  /**
   * Read-only output: Returns the Tenant ID that issued the token for the user who updated the ImmutabilityPolicy.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Read-only output: Returns the date and time the ImmutabilityPolicy was updated.
   */
  readonly timestamp?: Expression<Date> | undefined;
  /**
   * Read-only output: The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend.
   */
  readonly update?: Expression<ImmutabilityPolicyUpdateType> | undefined;
  /**
   * Read-only output: Returns the User Principal Name of the user who updated the ImmutabilityPolicy.
   */
  readonly upn?: Expression<string> | undefined;
}

export const updateHistoryPropertyShape: FlatModelShape = createFlatModelShape({
  allowProtectedAppendWrites: {
    armPath: ["allowProtectedAppendWrites"],
    value: createBooleanShape(),
    readOnly: true,
  },
  allowProtectedAppendWritesAll: {
    armPath: ["allowProtectedAppendWritesAll"],
    value: createBooleanShape(),
    readOnly: true,
  },
  immutabilityPeriodSinceCreationInDays: {
    armPath: ["immutabilityPeriodSinceCreationInDays"],
    value: createNumberShape(),
    readOnly: true,
  },
  objectIdentifier: { armPath: ["objectIdentifier"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  timestamp: {
    armPath: ["timestamp"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  update: { armPath: ["update"], value: createUnionShape(), readOnly: true },
  upn: { armPath: ["upn"], value: createStringShape(), readOnly: true },
});

/**
 * UserAssignedIdentity for the resource.
 */
export interface UserAssignedIdentity {
  /**
   * The client ID of the identity.
   */
  clientId?: string;
  /**
   * The principal ID of the identity.
   */
  principalId?: string;
}

/**
 * Input type for UserAssignedIdentity for the resource.
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for UserAssignedIdentity for the resource.
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: The client ID of the identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal ID of the identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Virtual Network rule.
 */
export interface VirtualNetworkRule {
  /**
   * The action of virtual network rule.
   */
  action?: "Allow";
  /**
   * Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}.
   */
  virtualNetworkResourceId: string;
  /**
   * Gets the state of virtual network rule.
   */
  state?: State;
}

/**
 * Input type for Virtual Network rule.
 */
export interface VirtualNetworkRuleInput extends InputOf<VirtualNetworkRule> {
  /**
   * The action of virtual network rule.
   */
  action?: ExpressionOrValue<"Allow"> | undefined;
  /**
   * Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}.
   */
  virtualNetworkResourceId: ExpressionOrValue<string>;
  /**
   * Gets the state of virtual network rule.
   */
  state?: ExpressionOrValue<State> | undefined;
}

/**
 * View type for Virtual Network rule.
 */
export type VirtualNetworkRuleView = VirtualNetworkRuleInput;

export const virtualNetworkRuleShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createStringLiteralShape() },
  virtualNetworkResourceId: { armPath: ["id"], value: createStringShape() },
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted.
 *
 * Known values:
 *
 * - `"Unlocked"`
 *
 * - `"Locked"`
 *
 * - `"Disabled"`
 */
export type AccountImmutabilityPolicyState = string;

/**
 * Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted.
 *
 * Known values:
 *
 * - `"User"`
 *
 * - `"Computer"`
 */
export type AccountType = string;

/**
 * The type of filter applied to the advanced platform metrics rule.
 *
 * Known values:
 *
 * - `"AllContainersFilter"`: Filter applies to all containers
 *
 * - `"ContainerPrefixFilter"`: Filter applies to containers matching a prefix
 *
 * - `"ContainerListFilter"`: Filter applies to a specific list of containers
 */
export type AdvancedPlatformMetricsFilterType = string;

/**
 * The type of the advanced platform metrics rule.
 *
 * Known values:
 *
 * - `"ContainerLevelCapacityMetrics"`: Container level capacity metrics rule type
 */
export type AdvancedPlatformMetricsRuleType = string;

/**
 * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet.
 *
 * Known values:
 *
 * - `"PrivateLink"`
 *
 * - `"AAD"`
 *
 * - `"All"`
 */
export type AllowedCopyScope = string;

/**
 * Known values:
 *
 * - `"DELETE"`
 *
 * - `"GET"`
 *
 * - `"HEAD"`
 *
 * - `"MERGE"`
 *
 * - `"POST"`
 *
 * - `"OPTIONS"`
 *
 * - `"PUT"`
 *
 * - `"PATCH"`
 *
 * - `"CONNECT"`
 *
 * - `"TRACE"`
 */
export type AllowedMethods = string;

/**
 * Known values:
 *
 * - `"default"`
 */
export type BlobInventoryPolicyName = string;

/**
 * The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed.
 *
 * Known values:
 *
 * - `"InProgress"`
 *
 * - `"Complete"`
 *
 * - `"Failed"`
 */
export type BlobRestoreProgressStatus = string;

/**
 * Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"Logging"`
 *
 * - `"Metrics"`
 *
 * - `"AzureServices"`
 */
export type Bypass = string;

/**
 * The kind of entity that created the resource.
 *
 * Known values:
 *
 * - `"User"`: The entity was created by a user.
 *
 * - `"Application"`: The entity was created by an application.
 *
 * - `"ManagedIdentity"`: The entity was created by a managed identity.
 *
 * - `"Key"`: The entity was created by a key.
 */
export type CreatedByType = string;

/**
 * Default share permission for users using Kerberos authentication if RBAC role is not assigned.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"StorageFileDataSmbShareReader"`
 *
 * - `"StorageFileDataSmbShareContributor"`
 *
 * - `"StorageFileDataSmbShareElevatedContributor"`
 */
export type DefaultSharePermission = string;

/**
 * Indicates the directory service used. Note that this enum may be extended in the future.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"AADDS"`
 *
 * - `"AD"`
 *
 * - `"AADKERB"`
 */
export type DirectoryServiceOptions = string;

/**
 * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier.
 *
 * Known values:
 *
 * - `"Standard"`
 *
 * - `"AzureDnsZone"`
 */
export type DnsEndpointType = string;

/**
 * The authentication protocol that is used for the file share. Can only be specified when creating a share.
 *
 * Known values:
 *
 * - `"SMB"`
 *
 * - `"NFS"`
 */
export type EnabledProtocols = string;

/**
 * The provider for the encryption scope. Possible values (case-insensitive): Microsoft.Storage, Microsoft.KeyVault.
 *
 * Known values:
 *
 * - `"Microsoft.Storage"`
 *
 * - `"Microsoft.KeyVault"`
 */
export type EncryptionScopeSource = string;

/**
 * The state of the encryption scope. Possible values (case-insensitive): Enabled, Disabled.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type EncryptionScopeState = string;

/**
 * The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period.
 *
 * Known values:
 *
 * - `"Log"`
 *
 * - `"Block"`
 */
export type ExpirationAction = string;

/**
 * The type of extendedLocation.
 *
 * Known values:
 *
 * - `"EdgeZone"`
 */
export type ExtendedLocationTypes = string;

/**
 * This is a required field, it specifies the format for the inventory files.
 *
 * Known values:
 *
 * - `"Csv"`
 *
 * - `"Parquet"`
 */
export type Format = string;

/**
 * The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable.
 *
 * Known values:
 *
 * - `"Live"`
 *
 * - `"Bootstrap"`
 *
 * - `"Unavailable"`
 */
export type GeoReplicationStatus = string;

/**
 * The identity type.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"SystemAssigned"`
 *
 * - `"UserAssigned"`
 *
 * - `"SystemAssigned,UserAssigned"`
 */
export type IdentityType = string;

/**
 * The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked.
 *
 * Known values:
 *
 * - `"Locked"`
 *
 * - `"Unlocked"`
 */
export type ImmutabilityPolicyState = string;

/**
 * The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend.
 *
 * Known values:
 *
 * - `"put"`
 *
 * - `"lock"`
 *
 * - `"extend"`
 */
export type ImmutabilityPolicyUpdateType = string;

/**
 * Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
 *
 * Known values:
 *
 * - `"Days"`
 */
export type IntervalUnit = string;

/**
 * The valid value is Inventory
 *
 * Known values:
 *
 * - `"Inventory"`
 */
export type InventoryRuleType = string;

/**
 * Type of issue
 *
 * Known values:
 *
 * - `"Unknown"`
 *
 * - `"ConfigurationPropagationFailure"`
 */
export type IssueType = string;

/**
 * The encryption keySource (provider). Possible values (case-insensitive): Microsoft.Storage, Microsoft.Keyvault
 *
 * Known values:
 *
 * - `"Microsoft.Storage"`
 *
 * - `"Microsoft.Keyvault"`
 */
export type KeySource = string;

/**
 * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
 *
 * Known values:
 *
 * - `"Service"`
 *
 * - `"Account"`
 */
export type KeyType = string;

/**
 * Indicates the type of storage account.
 *
 * Known values:
 *
 * - `"Storage"`
 *
 * - `"StorageV2"`
 *
 * - `"BlobStorage"`
 *
 * - `"FileStorage"`
 *
 * - `"BlockBlobStorage"`
 */
export type Kind = string;

/**
 * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.
 *
 * Known values:
 *
 * - `"Disabled"`
 *
 * - `"Enabled"`
 */
export type LargeFileSharesState = string;

/**
 * Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased.
 *
 * Known values:
 *
 * - `"Infinite"`
 *
 * - `"Fixed"`
 */
export type LeaseDuration = string;

/**
 * Lease state of the container.
 *
 * Known values:
 *
 * - `"Available"`
 *
 * - `"Leased"`
 *
 * - `"Expired"`
 *
 * - `"Breaking"`
 *
 * - `"Broken"`
 */
export type LeaseState = string;

/**
 * The lease status of the container.
 *
 * Known values:
 *
 * - `"Locked"`
 *
 * - `"Unlocked"`
 */
export type LeaseStatus = string;

/**
 * Known values:
 *
 * - `"default"`
 */
export type ManagementPolicyName = string;

/**
 * The metrics emitted by the advanced platform metrics rule.
 *
 * Known values:
 *
 * - `"ContainerBlobCount"`: Container blob count metric
 *
 * - `"ContainerUsedSize"`: Container used size metric
 */
export type MetricsEmitted = string;

/**
 * Known values:
 *
 * - `"default"`
 */
export type MigrationName = string;

/**
 * This property denotes the container level immutability to object level immutability migration state.
 *
 * Known values:
 *
 * - `"InProgress"`
 *
 * - `"Completed"`
 */
export type MigrationState = string;

/**
 * Current status of migration
 *
 * Known values:
 *
 * - `"Invalid"`
 *
 * - `"SubmittedForConversion"`
 *
 * - `"InProgress"`
 *
 * - `"Complete"`
 *
 * - `"Failed"`
 */
export type MigrationStatus = string;

/**
 * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported.
 *
 * Known values:
 *
 * - `"TLS1_0"`
 *
 * - `"TLS1_1"`
 *
 * - `"TLS1_2"`
 *
 * - `"TLS1_3"`
 */
export type MinimumTlsVersion = string;

/**
 * Name of the policy. The valid value is AccessTimeTracking. This field is currently read only
 *
 * Known values:
 *
 * - `"AccessTimeTracking"`
 */
export type Name = string;

/**
 * Provisioning state of the resource at the time the operation was called.
 *
 * Known values:
 *
 * - `"Accepted"`: The request has been accepted for processing.
 *
 * - `"Creating"`: The resource is being created.
 *
 * - `"Succeeded"`: The resource has been successfully created.
 *
 * - `"Deleting"`: The resource is being deleted.
 *
 * - `"Canceled"`: The request has been canceled.
 *
 * - `"Failed"`: The resource creation or deletion has failed.
 */
export type NativeDataSharingProvisioningState = string;

/**
 * Provisioning state of Network Security Perimeter configuration propagation
 *
 * Known values:
 *
 * - `"Accepted"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"Deleting"`
 *
 * - `"Canceled"`
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

/**
 * Direction of Access Rule
 *
 * Known values:
 *
 * - `"Inbound"`
 *
 * - `"Outbound"`
 */
export type NspAccessRuleDirection = string;

/**
 * This is a required field. This field specifies the scope of the inventory created either at the blob or container level.
 *
 * Known values:
 *
 * - `"Blob"`
 *
 * - `"Container"`
 */
export type ObjectType = string;

/**
 * The redundancy type of the account after an account failover is performed.
 *
 * Known values:
 *
 * - `"Standard_LRS"`
 *
 * - `"Standard_ZRS"`
 */
export type PostFailoverRedundancy = string;

/**
 * The redundancy type of the account after a planned account failover is performed.
 *
 * Known values:
 *
 * - `"Standard_GRS"`
 *
 * - `"Standard_GZRS"`
 *
 * - `"Standard_RAGRS"`
 *
 * - `"Standard_RAGZRS"`
 */
export type PostPlannedFailoverRedundancy = string;

/**
 * The current provisioning state.
 *
 * Known values:
 *
 * - `"Succeeded"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Failed"`
 */
export type PrivateEndpointConnectionProvisioningState = string;

/**
 * The private endpoint connection status.
 *
 * Known values:
 *
 * - `"Pending"`
 *
 * - `"Approved"`
 *
 * - `"Rejected"`
 */
export type PrivateEndpointServiceConnectionStatus = string;

/**
 * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 *
 * - `"SecuredByPerimeter"`
 */
export type PublicNetworkAccess = string;

/**
 * Access Mode of the resource association
 *
 * Known values:
 *
 * - `"Enforced"`
 *
 * - `"Learning"`
 *
 * - `"Audit"`
 */
export type ResourceAssociationAccessMode = string;

/**
 * The property is for NFS share only. The default is NoRootSquash.
 *
 * Known values:
 *
 * - `"NoRootSquash"`
 *
 * - `"RootSquash"`
 *
 * - `"AllSquash"`
 */
export type RootSquashType = string;

/**
 * Routing Choice defines the kind of network routing opted by the user.
 *
 * Known values:
 *
 * - `"MicrosoftRouting"`
 *
 * - `"InternetRouting"`
 */
export type RoutingChoice = string;

/**
 * The valid value is Lifecycle
 *
 * Known values:
 *
 * - `"Lifecycle"`
 */
export type RuleType = string;

/**
 * Represents the overall result of the execution for the run instance
 *
 * Known values:
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 */
export type RunResult = string;

/**
 * Represents the status of the execution.
 *
 * Known values:
 *
 * - `"InProgress"`
 *
 * - `"Finished"`
 */
export type RunStatusEnum = string;

/**
 * This is a required field. This field is used to schedule an inventory formation.
 *
 * Known values:
 *
 * - `"Daily"`
 *
 * - `"Weekly"`
 */
export type Schedule = string;

/**
 * Severity of the issue.
 *
 * Known values:
 *
 * - `"Warning"`
 *
 * - `"Error"`
 */
export type Severity = string;

/**
 * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium.
 *
 * Known values:
 *
 * - `"TransactionOptimized"`
 *
 * - `"Hot"`
 *
 * - `"Cool"`
 *
 * - `"Premium"`
 */
export type ShareAccessTier = string;

/**
 * This property indicates the current sku conversion status.
 *
 * Known values:
 *
 * - `"InProgress"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 */
export type SkuConversionStatus = string;

/**
 * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType.
 *
 * Known values:
 *
 * - `"Standard_LRS"`
 *
 * - `"Standard_GRS"`
 *
 * - `"Standard_RAGRS"`
 *
 * - `"Standard_ZRS"`
 *
 * - `"Premium_LRS"`
 *
 * - `"Premium_ZRS"`
 *
 * - `"Standard_GZRS"`
 *
 * - `"Standard_RAGZRS"`
 *
 * - `"StandardV2_LRS"`
 *
 * - `"StandardV2_GRS"`
 *
 * - `"StandardV2_ZRS"`
 *
 * - `"StandardV2_GZRS"`
 *
 * - `"PremiumV2_LRS"`
 *
 * - `"PremiumV2_ZRS"`
 */
export type SkuName = string;

/**
 * Gets the state of virtual network rule.
 *
 * Known values:
 *
 * - `"Provisioning"`
 *
 * - `"Deprovisioning"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"NetworkSourceDeleted"`
 */
export type State = string;

/**
 * The type of the backing data source for storage connector
 *
 * Known values:
 *
 * - `"Azure_DataShare"`: Azure DataShare data source type.
 */
export type StorageConnectorDataSourceType = string;

/**
 * The state of the storage connector
 *
 * Known values:
 *
 * - `"Active"`: Whether the connector is active
 *
 * - `"Inactive"`: Whether the connector is inactive
 */
export type StorageConnectorState = string;

/**
 * The permissions supported in access policies for storage data share
 *
 * Known values:
 *
 * - `"None"`: No permission
 *
 * - `"Read"`: Read permission
 */
export type StorageDataShareAccessPolicyPermission = string;

/**
 * Gets the status of the storage account at the time the operation was called.
 *
 * Known values:
 *
 * - `"ValidateSubscriptionQuotaBegin"`
 *
 * - `"ValidateSubscriptionQuotaEnd"`
 *
 * - `"Accepted"`
 *
 * - `"Creating"`
 *
 * - `"Succeeded"`
 *
 * - `"Deleting"`
 *
 * - `"Canceled"`
 *
 * - `"Failed"`
 */
export type StorageTaskAssignmentProvisioningState = string;

/**
 * The trigger type of the storage task assignment execution
 *
 * Known values:
 *
 * - `"RunOnce"`
 *
 * - `"OnSchedule"`
 *
 * - `"MockRun"`: Run the task as a mock for testing
 */
export type TriggerType = string;

/**
 * The availability zone pinning policy for the storage account.
 *
 * Known values:
 *
 * - `"Any"`
 *
 * - `"None"`
 */
export type ZonePlacementPolicy = string;
