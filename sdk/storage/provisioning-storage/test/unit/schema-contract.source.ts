// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-storage.
 * provisioning API: @azure/provisioning-storage root types namespace.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AccessPolicyInput,
  AccountImmutabilityPolicyPropertiesInput,
  ActiveDirectoryPropertiesInput,
  AzureFilesIdentityBasedAuthenticationInput,
  BlobInventoryCreationTimeInput,
  BlobInventoryPolicyDefinitionInput,
  BlobInventoryPolicyFilterInput,
  BlobInventoryPolicySchemaInput,
  BlobServicePropertiesPropertiesInput,
  ChangeFeedInput,
  ContainerPropertiesInput,
  CorsRuleInput,
  CorsRulesInput,
  CustomDomainInput,
  DateAfterCreationInput,
  DateAfterModificationInput,
  DeleteRetentionPolicyInput,
  DualStackEndpointPreferenceInput,
  EncryptionIdentityInput,
  EncryptionInTransitInput,
  EncryptionInput,
  EncryptionScopeKeyVaultPropertiesInput,
  EncryptionScopePropertiesInput,
  EncryptionServiceInput,
  ExecutionTargetInput,
  ExtendedLocationInput,
  FileSharePropertiesFileSharePaidBurstingInput,
  FileSharePropertiesInput,
  GeoPriorityReplicationStatusInput,
  IdentityInput,
  ImmutabilityPolicyPropertyInput,
  ImmutableStorageAccountInput,
  ImmutableStorageWithVersioningInput,
  IpRuleInput,
  KeyPolicyInput,
  KeyVaultPropertiesInput,
  LastAccessTimeTrackingPolicyInput,
  LocalUserPropertiesInput,
  ManagementPolicyBaseBlobInput,
  ManagementPolicyFilterInput,
  ManagementPolicySchemaInput,
  MultichannelInput,
  NetworkRuleSetInput,
  ObjectReplicationPolicyFilterInput,
  ObjectReplicationPolicyPropertiesInput,
  ObjectReplicationPolicyPropertiesMetricsInput,
  ObjectReplicationPolicyPropertiesPriorityReplicationInput,
  ObjectReplicationPolicyPropertiesTagsReplicationInput,
  ObjectReplicationPolicyRuleInput,
  PermissionScopeInput,
  PlacementInput,
  PrivateLinkServiceConnectionStateInput,
  ResourceAccessRuleInput,
  RestorePolicyPropertiesInput,
  RoutingPreferenceInput,
  SasPolicyInput,
  ServiceSharedKeyAccessPropertiesInput,
  SignedIdentifierInput,
  SkuInput,
  SmbOAuthSettingsInput,
  SmbSettingInput,
  SshPublicKeyInput,
  StaticWebsiteInput,
  StorageAccountPropertiesInput,
  StorageConnectorSourceInput,
  StorageDataCollaborationPolicyPropertiesInput,
  StorageDataShareAccessPolicyInput,
  StorageDataShareAssetInput,
  StorageDataSharePropertiesInput,
  StorageTaskAssignmentReportInput,
  TableAccessPolicyInput,
  TablePropertiesInput,
  TableSignedIdentifierInput,
  TagFilterInput,
  TriggerParametersInput,
  VirtualNetworkRuleInput,
} from "@azure/provisioning-storage/types";

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices/shares -> AccessPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices/shares?pivots=deployment-language-bicep
export const accessPolicyFromBicep: AccessPolicyInput = {
  permission: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> AccountImmutabilityPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const accountImmutabilityPolicyPropertiesFromBicep: AccountImmutabilityPolicyPropertiesInput =
  {
    allowProtectedAppendWrites: true,
    immutabilityPeriodSinceCreationInDays: 0,
    state: "Disabled",
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> ActiveDirectoryPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const activeDirectoryPropertiesFromBicep: ActiveDirectoryPropertiesInput = {
  accountType: "Computer",
  azureStorageSid: "string",
  domainGuid: "string",
  domainName: "string",
  domainSid: "string",
  forestName: "string",
  netBiosDomainName: "string",
  samAccountName: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> AzureFilesIdentityBasedAuthenticationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const azureFilesIdentityBasedAuthenticationFromBicep: AzureFilesIdentityBasedAuthenticationInput =
  {
    defaultSharePermission: "None",
    directoryServiceOptions: "AADDS",
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/inventoryPolicies -> BlobInventoryCreationTimeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/inventorypolicies?pivots=deployment-language-bicep
export const blobInventoryCreationTimeFromBicep: BlobInventoryCreationTimeInput = {
  lastNDays: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/inventoryPolicies -> BlobInventoryPolicyDefinitionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/inventorypolicies?pivots=deployment-language-bicep
export const blobInventoryPolicyDefinitionFromBicep: BlobInventoryPolicyDefinitionInput = {
  format: "Csv",
  objectType: "Blob",
  schedule: "Daily",
  schemaFields: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/inventoryPolicies -> BlobInventoryPolicyFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/inventorypolicies?pivots=deployment-language-bicep
export const blobInventoryPolicyFilterFromBicep: BlobInventoryPolicyFilterInput = {
  blobTypes: [],
  excludePrefix: [],
  includeBlobVersions: true,
  includeDeleted: true,
  includeSnapshots: true,
  prefixMatch: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/inventoryPolicies -> BlobInventoryPolicySchemaInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/inventorypolicies?pivots=deployment-language-bicep
export const blobInventoryPolicySchemaFromBicep: BlobInventoryPolicySchemaInput = {
  enabled: true,
  rules: [],
  type: "Inventory",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> BlobServicePropertiesPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const blobServicePropertiesPropertiesFromBicep: BlobServicePropertiesPropertiesInput = {
  automaticSnapshotPolicyEnabled: true,
  defaultServiceVersion: "string",
  isVersioningEnabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> ChangeFeedInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const changeFeedFromBicep: ChangeFeedInput = {
  enabled: true,
  retentionInDays: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices/containers -> ContainerPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices/containers?pivots=deployment-language-bicep
export const containerPropertiesFromBicep: ContainerPropertiesInput = {
  defaultEncryptionScope: "string",
  denyEncryptionScopeOverride: true,
  enableNfsV3AllSquash: true,
  enableNfsV3RootSquash: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> CorsRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const corsRuleFromBicep: CorsRuleInput = {
  allowedHeaders: [],
  allowedMethods: [],
  allowedOrigins: [],
  exposedHeaders: [],
  maxAgeInSeconds: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> CorsRulesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const corsRulesFromBicep: CorsRulesInput = {
  corsRules: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> CustomDomainInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const customDomainFromBicep: CustomDomainInput = {
  name: "string",
  useSubDomainName: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> DateAfterCreationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const dateAfterCreationFromBicep: DateAfterCreationInput = {
  daysAfterCreationGreaterThan: 0,
  daysAfterLastTierChangeGreaterThan: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> DateAfterModificationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const dateAfterModificationFromBicep: DateAfterModificationInput = {
  daysAfterCreationGreaterThan: 0,
  daysAfterLastAccessTimeGreaterThan: 0,
  daysAfterLastTierChangeGreaterThan: 0,
  daysAfterModificationGreaterThan: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> DeleteRetentionPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const deleteRetentionPolicyFromBicep: DeleteRetentionPolicyInput = {
  allowPermanentDelete: true,
  days: 0,
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> DualStackEndpointPreferenceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const dualStackEndpointPreferenceFromBicep: DualStackEndpointPreferenceInput = {
  publishIpv6Endpoint: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices -> EncryptionInTransitInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices?pivots=deployment-language-bicep
export const encryptionInTransitFromBicep: EncryptionInTransitInput = {
  required: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> EncryptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const encryptionFromBicep: EncryptionInput = {
  keySource: "Microsoft.Keyvault",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/encryptionScopes -> EncryptionScopeKeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/encryptionscopes?pivots=deployment-language-bicep
export const encryptionScopeKeyVaultPropertiesFromBicep: EncryptionScopeKeyVaultPropertiesInput = {
  keyUri: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/encryptionScopes -> EncryptionScopePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/encryptionscopes?pivots=deployment-language-bicep
export const encryptionScopePropertiesFromBicep: EncryptionScopePropertiesInput = {
  requireInfrastructureEncryption: true,
  source: "Microsoft.KeyVault",
  state: "Disabled",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> EncryptionServiceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const encryptionServiceFromBicep: EncryptionServiceInput = {
  enabled: true,
  keyType: "Account",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/storageTaskAssignments -> ExecutionTargetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/storagetaskassignments?pivots=deployment-language-bicep
export const executionTargetFromBicep: ExecutionTargetInput = {
  excludePrefix: [],
  prefix: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> ExtendedLocationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const extendedLocationFromBicep: ExtendedLocationInput = {
  name: "string",
  type: "EdgeZone",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices/shares -> FileSharePropertiesFileSharePaidBurstingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices/shares?pivots=deployment-language-bicep
export const fileSharePropertiesFileSharePaidBurstingFromBicep: FileSharePropertiesFileSharePaidBurstingInput =
  {
    paidBurstingEnabled: true,
    paidBurstingMaxBandwidthMibps: 0,
    paidBurstingMaxIops: 0,
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices/shares -> FileSharePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices/shares?pivots=deployment-language-bicep
export const fileSharePropertiesFromBicep: FileSharePropertiesInput = {
  accessTier: "Cool",
  enabledProtocols: "NFS",
  provisionedBandwidthMibps: 0,
  provisionedIops: 0,
  rootSquash: "AllSquash",
  shareQuota: 0,
  signedIdentifiers: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> GeoPriorityReplicationStatusInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const geoPriorityReplicationStatusFromBicep: GeoPriorityReplicationStatusInput = {
  isBlobEnabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> IpRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const iPRuleFromBicep: IpRuleInput = {
  action: "Allow",
  iPAddressOrRange: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> IdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const identityFromBicep: IdentityInput = {
  type: "None",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies -> ImmutabilityPolicyPropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices/containers/immutabilitypolicies?pivots=deployment-language-bicep
export const immutabilityPolicyPropertyFromBicep: ImmutabilityPolicyPropertyInput = {
  allowProtectedAppendWrites: true,
  allowProtectedAppendWritesAll: true,
  immutabilityPeriodSinceCreationInDays: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> ImmutableStorageAccountInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const immutableStorageAccountFromBicep: ImmutableStorageAccountInput = {
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices/containers -> ImmutableStorageWithVersioningInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices/containers?pivots=deployment-language-bicep
export const immutableStorageWithVersioningFromBicep: ImmutableStorageWithVersioningInput = {
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> KeyPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const keyPolicyFromBicep: KeyPolicyInput = {
  keyExpirationPeriodInDays: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> LastAccessTimeTrackingPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const lastAccessTimeTrackingPolicyFromBicep: LastAccessTimeTrackingPolicyInput = {
  blobType: [],
  enable: true,
  name: "AccessTimeTracking",
  trackingGranularityInDays: 0,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/localUsers -> LocalUserPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/localusers?pivots=deployment-language-bicep
export const localUserPropertiesFromBicep: LocalUserPropertiesInput = {
  allowAclAuthorization: true,
  extendedGroups: [],
  groupId: 0,
  hasSharedKey: true,
  hasSshKey: true,
  hasSshPassword: true,
  homeDirectory: "string",
  isNfSv3Enabled: true,
  permissionScopes: [],
  sshAuthorizedKeys: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> ManagementPolicyBaseBlobInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const managementPolicyBaseBlobFromBicep: ManagementPolicyBaseBlobInput = {
  enableAutoTierToHotFromCool: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> ManagementPolicyFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const managementPolicyFilterFromBicep: ManagementPolicyFilterInput = {
  blobIndexMatch: [],
  blobTypes: [],
  prefixMatch: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> ManagementPolicySchemaInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const managementPolicySchemaFromBicep: ManagementPolicySchemaInput = {
  rules: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices -> MultichannelInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices?pivots=deployment-language-bicep
export const multichannelFromBicep: MultichannelInput = {
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> NetworkRuleSetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const networkRuleSetFromBicep: NetworkRuleSetInput = {
  defaultAction: "Allow",
  ipRules: [],
  ipv6Rules: [],
  resourceAccessRules: [],
  virtualNetworkRules: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyFilterFromBicep: ObjectReplicationPolicyFilterInput = {
  minCreationTime: "string",
  prefixMatch: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyPropertiesFromBicep: ObjectReplicationPolicyPropertiesInput = {
  destinationAccount: "string",
  rules: [],
  sourceAccount: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyPropertiesMetricsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyPropertiesMetricsFromBicep: ObjectReplicationPolicyPropertiesMetricsInput =
  {
    enabled: true,
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyPropertiesPriorityReplicationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyPropertiesPriorityReplicationFromBicep: ObjectReplicationPolicyPropertiesPriorityReplicationInput =
  {
    enabled: true,
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyPropertiesTagsReplicationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyPropertiesTagsReplicationFromBicep: ObjectReplicationPolicyPropertiesTagsReplicationInput =
  {
    enabled: true,
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/objectReplicationPolicies -> ObjectReplicationPolicyRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/objectreplicationpolicies?pivots=deployment-language-bicep
export const objectReplicationPolicyRuleFromBicep: ObjectReplicationPolicyRuleInput = {
  destinationContainer: "string",
  ruleId: "string",
  sourceContainer: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/localUsers -> PermissionScopeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/localusers?pivots=deployment-language-bicep
export const permissionScopeFromBicep: PermissionScopeInput = {
  permissions: "string",
  resourceName: "string",
  service: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> PlacementInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const placementFromBicep: PlacementInput = {
  zonePlacementPolicy: "Any",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/privateEndpointConnections -> PrivateLinkServiceConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/privateendpointconnections?pivots=deployment-language-bicep
export const privateLinkServiceConnectionStateFromBicep: PrivateLinkServiceConnectionStateInput = {
  actionRequired: "string",
  description: "string",
  status: "Approved",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> ResourceAccessRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const resourceAccessRuleFromBicep: ResourceAccessRuleInput = {
  resourceId: "string",
  tenantId: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> RestorePolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const restorePolicyPropertiesFromBicep: RestorePolicyPropertiesInput = {
  days: 0,
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> RoutingPreferenceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const routingPreferenceFromBicep: RoutingPreferenceInput = {
  publishInternetEndpoints: true,
  publishMicrosoftEndpoints: true,
  routingChoice: "InternetRouting",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> SasPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const sasPolicyFromBicep: SasPolicyInput = {
  expirationAction: "Block",
  sasExpirationPeriod: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> ServiceSharedKeyAccessPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const serviceSharedKeyAccessPropertiesFromBicep: ServiceSharedKeyAccessPropertiesInput = {
  enabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices/shares -> SignedIdentifierInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices/shares?pivots=deployment-language-bicep
export const signedIdentifierFromBicep: SignedIdentifierInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const skuFromBicep: SkuInput = {
  name: "PremiumV2_LRS",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> SmbOAuthSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const smbOAuthSettingsFromBicep: SmbOAuthSettingsInput = {
  isSmbOAuthEnabled: true,
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/fileServices -> SmbSettingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/fileservices?pivots=deployment-language-bicep
export const smbSettingFromBicep: SmbSettingInput = {
  authenticationMethods: "string",
  channelEncryption: "string",
  kerberosTicketEncryption: "string",
  versions: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/localUsers -> SshPublicKeyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/localusers?pivots=deployment-language-bicep
export const sshPublicKeyFromBicep: SshPublicKeyInput = {
  description: "string",
  key: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/blobServices -> StaticWebsiteInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/blobservices?pivots=deployment-language-bicep
export const staticWebsiteFromBicep: StaticWebsiteInput = {
  defaultIndexDocumentPath: "string",
  enabled: true,
  errorDocument404Path: "string",
  indexDocument: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> StorageAccountPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const storageAccountPropertiesFromBicep: StorageAccountPropertiesInput = {
  allowCrossTenantReplication: true,
  allowedCopyScope: "AAD",
  allowSharedKeyAccess: true,
  defaultToOAuthAuthentication: true,
  dnsEndpointType: "AzureDnsZone",
  largeFileSharesState: "Disabled",
  minimumTlsVersion: "TLS1_0",
  publicNetworkAccess: "Disabled",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/connectors -> StorageConnectorSourceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/connectors?pivots=deployment-language-bicep
export const storageConnectorSourceFromBicep: StorageConnectorSourceInput = {
  authProperties: {
    type: "ManagedIdentity",
  },
  connection: {
    dataShareUri: "string",
    type: "DataShare",
  },
  type: "DataShare",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> StorageDataCollaborationPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const storageDataCollaborationPolicyPropertiesFromBicep: StorageDataCollaborationPolicyPropertiesInput =
  {
    allowCrossTenantDataSharing: true,
    allowStorageConnectors: true,
    allowStorageDataShares: true,
  };

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/dataShares -> StorageDataShareAccessPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/datashares?pivots=deployment-language-bicep
export const storageDataShareAccessPolicyFromBicep: StorageDataShareAccessPolicyInput = {
  permission: "None",
  principalId: "string",
  tenantId: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/dataShares -> StorageDataShareAssetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/datashares?pivots=deployment-language-bicep
export const storageDataShareAssetFromBicep: StorageDataShareAssetInput = {
  assetPath: "string",
  displayName: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/dataShares -> StorageDataSharePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/datashares?pivots=deployment-language-bicep
export const storageDataSharePropertiesFromBicep: StorageDataSharePropertiesInput = {
  accessPolicies: [],
  assets: [],
  description: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/storageTaskAssignments -> StorageTaskAssignmentReportInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/storagetaskassignments?pivots=deployment-language-bicep
export const storageTaskAssignmentReportFromBicep: StorageTaskAssignmentReportInput = {
  prefix: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/tableServices/tables -> TableAccessPolicyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/tableservices/tables?pivots=deployment-language-bicep
export const tableAccessPolicyFromBicep: TableAccessPolicyInput = {
  permission: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/tableServices/tables -> TablePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/tableservices/tables?pivots=deployment-language-bicep
export const tablePropertiesFromBicep: TablePropertiesInput = {
  signedIdentifiers: [],
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/tableServices/tables -> TableSignedIdentifierInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/tableservices/tables?pivots=deployment-language-bicep
export const tableSignedIdentifierFromBicep: TableSignedIdentifierInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/managementPolicies -> TagFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/managementpolicies?pivots=deployment-language-bicep
export const tagFilterFromBicep: TagFilterInput = {
  name: "string",
  op: "string",
  value: "string",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts/storageTaskAssignments -> TriggerParametersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/storagetaskassignments?pivots=deployment-language-bicep
export const triggerParametersFromBicep: TriggerParametersInput = {
  interval: 0,
  intervalUnit: "Days",
};

// Accepted Bicep contract: Microsoft.Storage/storageAccounts -> VirtualNetworkRuleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
export const virtualNetworkRuleFromBicep: VirtualNetworkRuleInput = {
  action: "Allow",
  virtualNetworkResourceId: "string",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.allowBlobPublicAccess (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.allowBlobPublicAccess
export const storageAccountPropertiesWithAllowBlobPublicAccessFromBicep: StorageAccountPropertiesInput =
  {
    allowBlobPublicAccess: true,
  };

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.enableExtendedGroups (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.enableExtendedGroups
export const storageAccountPropertiesWithEnableExtendedGroupsFromBicep: StorageAccountPropertiesInput =
  {
    enableExtendedGroups: true,
  };

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.identity (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: EncryptionInput.identity
export const encryptionWithIdentityFromBicep: EncryptionInput = {
  encryptionIdentity: {},
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.identity.federatedIdentityClientId (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: EncryptionIdentityInput.federatedIdentityClientId
export const encryptionIdentityWithFederatedIdentityClientIdFromBicep: EncryptionIdentityInput = {
  encryptionFederatedIdentityClientId: "__bicep_value__",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.identity.userAssignedIdentity (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: EncryptionIdentityInput.userAssignedIdentity
export const encryptionIdentityWithUserAssignedIdentityFromBicep: EncryptionIdentityInput = {
  encryptionUserAssignedIdentity: "__bicep_value__",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.keyvaultproperties (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: EncryptionInput.keyvaultproperties
export const encryptionWithKeyvaultpropertiesFromBicep: EncryptionInput = {
  keyVaultProperties: {},
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.keyvaultproperties.keyname (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: KeyVaultPropertiesInput.keyname
export const keyVaultPropertiesWithKeynameFromBicep: KeyVaultPropertiesInput = {
  keyName: "__bicep_value__",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.keyvaultproperties.keyvaulturi (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: KeyVaultPropertiesInput.keyvaulturi
export const keyVaultPropertiesWithKeyvaulturiFromBicep: KeyVaultPropertiesInput = {
  keyVaultUri: "__bicep_value__",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.keyvaultproperties.keyversion (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: KeyVaultPropertiesInput.keyVersion
export const keyVaultPropertiesWithKeyversionFromBicep: KeyVaultPropertiesInput = {
  keyVersion: "__bicep_value__",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.encryption.requireInfrastructureEncryption (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: EncryptionInput.requireInfrastructureEncryption
export const encryptionWithRequireInfrastructureEncryptionFromBicep: EncryptionInput = {
  requireInfrastructureEncryption: true,
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.immutableStorageWithVersioning (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.immutableStorageWithVersioning
export const storageAccountPropertiesWithImmutableStorageWithVersioningFromBicep: StorageAccountPropertiesInput =
  {
    immutableStorageWithVersioning: {},
  };

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.isHnsEnabled (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.isHnsEnabled
export const storageAccountPropertiesWithIsHnsEnabledFromBicep: StorageAccountPropertiesInput = {
  isHnsEnabled: true,
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.isLocalUserEnabled (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.isLocalUserEnabled
export const storageAccountPropertiesWithIsLocalUserEnabledFromBicep: StorageAccountPropertiesInput =
  {
    isLocalUserEnabled: true,
  };

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.isNfsV3Enabled (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.enableNfsV3
export const storageAccountPropertiesWithIsNfsV3EnabledFromBicep: StorageAccountPropertiesInput = {
  enableNfsV3: true,
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.isSftpEnabled (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.isSftpEnabled
export const storageAccountPropertiesWithIsSftpEnabledFromBicep: StorageAccountPropertiesInput = {
  isSftpEnabled: true,
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.networkAcls (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.networkRuleSet
export const storageAccountPropertiesWithNetworkAclsFromBicep: StorageAccountPropertiesInput = {
  networkRuleSet: { defaultAction: "Allow" },
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.networkAcls.bypass (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: NetworkRuleSetInput.bypass
export const networkRuleSetWithBypassFromBicep: NetworkRuleSetInput = {
  defaultAction: "Allow",
  bypass: "AzureServices",
};

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.routingPreference (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.routingPreference
export const storageAccountPropertiesWithRoutingPreferenceFromBicep: StorageAccountPropertiesInput =
  {
    routingPreference: {},
  };

// Bicep baseline: Microsoft.Storage/storageAccounts.properties.supportsHttpsTrafficOnly (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts?pivots=deployment-language-bicep
// provisioning input: StorageAccountPropertiesInput.supportsHttpsTrafficOnly
export const storageAccountPropertiesWithSupportsHttpsTrafficOnlyFromBicep: StorageAccountPropertiesInput =
  {
    enableHttpsTrafficOnly: true,
  };

// Bicep baseline: Microsoft.Storage/storageAccounts/connectors.properties.source.authProperties (contract).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/2025-08-01/storageaccounts/connectors?pivots=deployment-language-bicep
// provisioning input: StorageConnectorSourceInput.authProperties
export const storageConnectorSourceWithAuthPropertiesStorageaccountsConnectorsDataShareFromBicep: StorageConnectorSourceInput =
  {
    authProperties: {
      type: "ManagedIdentity",
    },
    connection: {
      dataShareUri: "string",
      type: "DataShare",
    },
    type: "DataShare",
  };
