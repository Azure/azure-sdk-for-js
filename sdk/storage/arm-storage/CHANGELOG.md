# Release History

## 19.0.0 (2025-09-22)

### Features Added
  - Added Interface DualStackEndpointPreference
  - Added Interface EncryptionInTransit
  - Added Interface NfsSetting
  - Added Interface Placement
  - Added Interface SkuInformationLocationInfoItem
  - Added Interface SmbOAuthSettings
  - Added Interface StorageAccountIpv6Endpoints
  - Interface AzureFilesIdentityBasedAuthentication has a new optional parameter smbOAuthSettings
  - Interface Endpoints has a new optional parameter ipv6Endpoints
  - Interface NetworkRuleSet has a new optional parameter ipv6Rules
  - Interface ProtocolSettings has a new optional parameter nfs
  - Interface SkuInformation has a new optional parameter locationInfo
  - Interface SmbSetting has a new optional parameter encryptionInTransit
  - Interface StorageAccount has a new optional parameter dualStackEndpointPreference
  - Interface StorageAccount has a new optional parameter placement
  - Interface StorageAccount has a new optional parameter zones
  - Interface StorageAccountCreateParameters has a new optional parameter dualStackEndpointPreference
  - Interface StorageAccountCreateParameters has a new optional parameter placement
  - Interface StorageAccountCreateParameters has a new optional parameter zones
  - Interface StorageAccountUpdateParameters has a new optional parameter dualStackEndpointPreference
  - Interface StorageAccountUpdateParameters has a new optional parameter placement
  - Interface StorageAccountUpdateParameters has a new optional parameter zones
  - Interface StorageTaskAssignmentsCreateHeaders has a new optional parameter azureAsyncOperation
  - Interface StorageTaskAssignmentsDeleteHeaders has a new optional parameter azureAsyncOperation
  - Interface StorageTaskAssignmentsListOptionalParams has a new optional parameter top
  - Interface StorageTaskAssignmentsUpdateHeaders has a new optional parameter azureAsyncOperation
  - Added Type Alias ZonePlacementPolicy
  - Added Enum KnownTriggerType
  - Added Enum KnownZonePlacementPolicy

### Breaking Changes
  - Operation StorageAccounts.beginCreate has a new signature
  - Operation StorageAccounts.beginCreateAndWait has a new signature
  - Operation StorageAccounts.getProperties has a new signature
  - Operation StorageAccounts.update has a new signature
  - Operation StorageTaskAssignments.beginCreate has a new signature
  - Operation StorageTaskAssignments.beginCreateAndWait has a new signature
  - Operation StorageTaskAssignments.beginUpdate has a new signature
  - Operation StorageTaskAssignments.beginUpdateAndWait has a new signature
  - Operation StorageTaskAssignments.get has a new signature
  - Operation StorageTaskAssignments.list has a new signature
  - Interface StorageTaskAssignmentsListOptionalParams no longer has parameter maxpagesize
  - Parameter domainGuid of interface ActiveDirectoryProperties is now optional
  - Parameter domainName of interface ActiveDirectoryProperties is now optional
  - Type alias "TriggerType" has been changed

    
## 18.6.0 (2025-07-16)
    
### Features Added
  - Added Type Alias IntervalUnit
  - Added Type Alias KeyType
  - Added Type Alias Permissions
  - Added Enum KnownIntervalUnit
  - Operation StorageTaskAssignments.beginCreate has a new signature
  - Operation StorageTaskAssignments.beginCreateAndWait has a new signature
  - Operation StorageTaskAssignments.beginUpdate has a new signature
  - Operation StorageTaskAssignments.beginUpdateAndWait has a new signature
  - Operation StorageTaskAssignments.get has a new signature
  - Type of parameter intervalUnit of interface TriggerParameters is changed from "Days" to IntervalUnit
  - Type of parameter intervalUnit of interface TriggerParametersUpdate is changed from "Days" to IntervalUnit
  - Removed Type Alias KeyType_2
  - Removed Type Alias Permissions_2

    
## 18.5.0 (2025-04-18)

### Features Added

  - Type ProvisioningState has a new value Accepted

## 18.4.0 (2025-02-27)
    
### Features Added

  - Added operation FileServices.getServiceUsage
  - Added operation FileServices.listServiceUsages
  - Added Interface AccountLimits
  - Added Interface AccountUsage
  - Added Interface AccountUsageElements
  - Added Interface BurstingConstants
  - Added Interface FileServicesGetServiceUsageOptionalParams
  - Added Interface FileServicesListServiceUsagesNextOptionalParams
  - Added Interface FileServicesListServiceUsagesOptionalParams
  - Added Interface FileServiceUsage
  - Added Interface FileServiceUsageProperties
  - Added Interface FileServiceUsages
  - Added Interface FileShareLimits
  - Added Interface FileSharePropertiesFileSharePaidBursting
  - Added Interface FileShareRecommendations
  - Added Interface ObjectReplicationPolicyPropertiesMetrics
  - Added Type Alias FileServicesGetServiceUsageResponse
  - Added Type Alias FileServicesListServiceUsagesNextResponse
  - Added Type Alias FileServicesListServiceUsagesResponse
  - Interface FileShare has a new optional parameter fileSharePaidBursting
  - Interface FileShare has a new optional parameter includedBurstIops
  - Interface FileShare has a new optional parameter maxBurstCreditsForIops
  - Interface FileShare has a new optional parameter nextAllowedProvisionedBandwidthDowngradeTime
  - Interface FileShare has a new optional parameter nextAllowedProvisionedIopsDowngradeTime
  - Interface FileShare has a new optional parameter nextAllowedQuotaDowngradeTime
  - Interface FileShare has a new optional parameter provisionedBandwidthMibps
  - Interface FileShare has a new optional parameter provisionedIops
  - Interface FileShareItem has a new optional parameter fileSharePaidBursting
  - Interface FileShareItem has a new optional parameter includedBurstIops
  - Interface FileShareItem has a new optional parameter maxBurstCreditsForIops
  - Interface FileShareItem has a new optional parameter nextAllowedProvisionedBandwidthDowngradeTime
  - Interface FileShareItem has a new optional parameter nextAllowedProvisionedIopsDowngradeTime
  - Interface FileShareItem has a new optional parameter nextAllowedQuotaDowngradeTime
  - Interface FileShareItem has a new optional parameter provisionedBandwidthMibps
  - Interface FileShareItem has a new optional parameter provisionedIops
  - Interface ObjectReplicationPolicy has a new optional parameter metrics
  - Enum KnownSkuName has a new value PremiumV2LRS
  - Enum KnownSkuName has a new value PremiumV2ZRS
  - Enum KnownSkuName has a new value StandardV2GRS
  - Enum KnownSkuName has a new value StandardV2Gzrs
  - Enum KnownSkuName has a new value StandardV2LRS
  - Enum KnownSkuName has a new value StandardV2ZRS
    
    
## 18.3.0 (2024-06-27)
    
### Features Added

  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added operation group StorageTaskAssignmentInstancesReport
  - Added operation group StorageTaskAssignments
  - Added operation group StorageTaskAssignmentsInstancesReport
  - Added Interface ExecutionTarget
  - Added Interface ExecutionTrigger
  - Added Interface ExecutionTriggerUpdate
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationList
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesProfile
  - Added Interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileHeaders
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NspAccessRule
  - Added Interface NspAccessRuleProperties
  - Added Interface NspAccessRulePropertiesSubscriptionsItem
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface ProxyResourceAutoGenerated
  - Added Interface ResourceAutoGenerated
  - Added Interface StorageTaskAssignment
  - Added Interface StorageTaskAssignmentExecutionContext
  - Added Interface StorageTaskAssignmentInstancesReportListNextOptionalParams
  - Added Interface StorageTaskAssignmentInstancesReportListOptionalParams
  - Added Interface StorageTaskAssignmentProperties
  - Added Interface StorageTaskAssignmentReport
  - Added Interface StorageTaskAssignmentsCreateHeaders
  - Added Interface StorageTaskAssignmentsCreateOptionalParams
  - Added Interface StorageTaskAssignmentsDeleteHeaders
  - Added Interface StorageTaskAssignmentsDeleteOptionalParams
  - Added Interface StorageTaskAssignmentsGetOptionalParams
  - Added Interface StorageTaskAssignmentsInstancesReportListNextOptionalParams
  - Added Interface StorageTaskAssignmentsInstancesReportListOptionalParams
  - Added Interface StorageTaskAssignmentsList
  - Added Interface StorageTaskAssignmentsListNextOptionalParams
  - Added Interface StorageTaskAssignmentsListOptionalParams
  - Added Interface StorageTaskAssignmentsUpdateHeaders
  - Added Interface StorageTaskAssignmentsUpdateOptionalParams
  - Added Interface StorageTaskAssignmentUpdateExecutionContext
  - Added Interface StorageTaskAssignmentUpdateParameters
  - Added Interface StorageTaskAssignmentUpdateProperties
  - Added Interface StorageTaskAssignmentUpdateReport
  - Added Interface StorageTaskReportInstance
  - Added Interface StorageTaskReportProperties
  - Added Interface StorageTaskReportSummary
  - Added Interface TriggerParameters
  - Added Interface TriggerParametersUpdate
  - Added Type Alias IssueType
  - Added Type Alias ListLocalUserIncludeParam
  - Added Type Alias NetworkSecurityPerimeterConfigurationProvisioningState
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsReconcileResponse
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias ResourceAssociationAccessMode
  - Added Type Alias RunResult
  - Added Type Alias RunStatusEnum
  - Added Type Alias Severity
  - Added Type Alias StorageTaskAssignmentInstancesReportListNextResponse
  - Added Type Alias StorageTaskAssignmentInstancesReportListResponse
  - Added Type Alias StorageTaskAssignmentsCreateResponse
  - Added Type Alias StorageTaskAssignmentsDeleteResponse
  - Added Type Alias StorageTaskAssignmentsGetResponse
  - Added Type Alias StorageTaskAssignmentsInstancesReportListNextResponse
  - Added Type Alias StorageTaskAssignmentsInstancesReportListResponse
  - Added Type Alias StorageTaskAssignmentsListNextResponse
  - Added Type Alias StorageTaskAssignmentsListResponse
  - Added Type Alias StorageTaskAssignmentsUpdateResponse
  - Added Type Alias TriggerType
  - Interface LocalUser has a new optional parameter allowAclAuthorization
  - Interface LocalUser has a new optional parameter extendedGroups
  - Interface LocalUser has a new optional parameter groupId
  - Interface LocalUser has a new optional parameter isNFSv3Enabled
  - Interface LocalUser has a new optional parameter userId
  - Interface LocalUsers has a new optional parameter nextLink
  - Interface LocalUsersListOptionalParams has a new optional parameter filter
  - Interface LocalUsersListOptionalParams has a new optional parameter include
  - Interface LocalUsersListOptionalParams has a new optional parameter maxpagesize
  - Interface StorageAccount has a new optional parameter enableExtendedGroups
  - Interface StorageAccountCreateParameters has a new optional parameter enableExtendedGroups
  - Interface StorageAccountUpdateParameters has a new optional parameter enableExtendedGroups
  - Added Enum KnownIssueType
  - Added Enum KnownListLocalUserIncludeParam
  - Added Enum KnownNetworkSecurityPerimeterConfigurationProvisioningState
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownResourceAssociationAccessMode
  - Added Enum KnownRunResult
  - Added Enum KnownRunStatusEnum
  - Added Enum KnownSeverity
  - Enum KnownExpirationAction has a new value Block
  - Enum KnownMinimumTlsVersion has a new value TLS13
  - Enum KnownPublicNetworkAccess has a new value SecuredByPerimeter
    
## 18.2.0 (2023-08-08)

### Features Added

- Added operation StorageAccounts.beginCustomerInitiatedMigration
- Added operation StorageAccounts.beginCustomerInitiatedMigrationAndWait
- Added operation StorageAccounts.getCustomerInitiatedMigration
- Added Interface BlobInventoryCreationTime
- Added Interface ErrorAdditionalInfo
- Added Interface ErrorDetail
- Added Interface ErrorResponseAutoGenerated
- Added Interface StorageAccountMigration
- Added Interface StorageAccountsCustomerInitiatedMigrationHeaders
- Added Interface StorageAccountsCustomerInitiatedMigrationOptionalParams
- Added Interface StorageAccountsGetCustomerInitiatedMigrationOptionalParams
- Added Type Alias MigrationName
- Added Type Alias MigrationStatus
- Added Type Alias PostFailoverRedundancy
- Added Type Alias PostPlannedFailoverRedundancy
- Added Type Alias StorageAccountsGetCustomerInitiatedMigrationResponse
- Interface BlobInventoryPolicyFilter has a new optional parameter creationTime
- Interface GeoReplicationStats has a new optional parameter canPlannedFailover
- Interface GeoReplicationStats has a new optional parameter postFailoverRedundancy
- Interface GeoReplicationStats has a new optional parameter postPlannedFailoverRedundancy
- Interface StorageAccount has a new optional parameter accountMigrationInProgress
- Interface StorageAccount has a new optional parameter isSkuConversionBlocked
- Added Enum KnownMigrationName
- Added Enum KnownMigrationStatus
- Added Enum KnownPostFailoverRedundancy
- Added Enum KnownPostPlannedFailoverRedundancy
- Enum KnownAllowedMethods has a new value Connect
- Enum KnownAllowedMethods has a new value Trace
- Interface BlobContainersListNextOptionalParams no longer has parameter filter
- Interface BlobContainersListNextOptionalParams no longer has parameter include
- Interface BlobContainersListNextOptionalParams no longer has parameter maxpagesize
- Interface EncryptionScopesListNextOptionalParams no longer has parameter filter
- Interface EncryptionScopesListNextOptionalParams no longer has parameter include
- Interface EncryptionScopesListNextOptionalParams no longer has parameter maxpagesize
- Interface FileSharesListNextOptionalParams no longer has parameter expand
- Interface FileSharesListNextOptionalParams no longer has parameter filter
- Interface FileSharesListNextOptionalParams no longer has parameter maxpagesize
- Interface QueueListNextOptionalParams no longer has parameter filter
- Interface QueueListNextOptionalParams no longer has parameter maxpagesize

## 18.1.0 (2022-11-24)

### Features Added

- Added Type Alias ListEncryptionScopesInclude
- Interface EncryptionScopesListNextOptionalParams has a new optional parameter filter
- Interface EncryptionScopesListNextOptionalParams has a new optional parameter include
- Interface EncryptionScopesListNextOptionalParams has a new optional parameter maxpagesize
- Interface EncryptionScopesListOptionalParams has a new optional parameter filter
- Interface EncryptionScopesListOptionalParams has a new optional parameter include
- Interface EncryptionScopesListOptionalParams has a new optional parameter maxpagesize
- Interface ManagementPolicyBaseBlob has a new optional parameter tierToCold
- Interface ManagementPolicyBaseBlob has a new optional parameter tierToHot
- Interface ManagementPolicySnapShot has a new optional parameter tierToCold
- Interface ManagementPolicySnapShot has a new optional parameter tierToHot
- Interface ManagementPolicyVersion has a new optional parameter tierToCold
- Interface ManagementPolicyVersion has a new optional parameter tierToHot
- Added Enum KnownListEncryptionScopesInclude

## 18.0.0 (2022-08-16)

### Features Added

- Added Interface AzureEntityResource
- Added Interface BlobContainer
- Added Interface BlobInventoryPolicy
- Added Interface BlobServiceProperties
- Added Interface DeletedAccount
- Added Interface EncryptionScope
- Added Interface FileServiceProperties
- Added Interface FileShare
- Added Interface FileShareItem
- Added Interface ImmutabilityPolicy
- Added Interface ListContainerItem
- Added Interface ListQueue
- Added Interface LocalUser
- Added Interface ManagementPolicy
- Added Interface ObjectReplicationPolicy
- Added Interface PrivateEndpointConnection
- Added Interface PrivateLinkResource
- Added Interface ProxyResource
- Added Interface QueueServiceProperties
- Added Interface StorageAccount
- Added Interface StorageQueue
- Added Interface Table
- Added Interface TableServiceProperties
- Added Interface TrackedResource
- Added Type Alias AccountType
- Added Type Alias AllowedMethods
- Added Enum KnownAccountType
- Added Enum KnownAllowedMethods
- Enum KnownDirectoryServiceOptions has a new value Aadkerb

### Breaking Changes

- Removed Enum KnownActiveDirectoryPropertiesAccountType
- Removed Enum KnownCorsRuleAllowedMethodsItem

## 17.2.1 (2022-06-15)

### Features Added

- Bug fix

## 17.2.0 (2022-03-30)

### Features Added

- Added Interface StorageAccountSkuConversionStatus
- Added Interface TableAccessPolicy
- Added Interface TableSignedIdentifier
- Added Type Alias DnsEndpointType
- Added Type Alias SkuConversionStatus
- Interface BlobInventoryPolicyFilter has a new optional parameter excludePrefix
- Interface BlobInventoryPolicyFilter has a new optional parameter includeDeleted
- Interface BlobInventoryPolicySchema has a new optional parameter destination
- Interface DateAfterCreation has a new optional parameter daysAfterLastTierChangeGreaterThan
- Interface DateAfterModification has a new optional parameter daysAfterCreationGreaterThan
- Interface DateAfterModification has a new optional parameter daysAfterLastTierChangeGreaterThan
- Interface DeleteRetentionPolicy has a new optional parameter allowPermanentDelete
- Interface KeyVaultProperties has a new optional parameter currentVersionedKeyExpirationTimestamp
- Interface StorageAccountCreateParameters has a new optional parameter dnsEndpointType
- Interface StorageAccountUpdateParameters has a new optional parameter dnsEndpointType
- Interface TableCreateOptionalParams has a new optional parameter parameters
- Interface TableUpdateOptionalParams has a new optional parameter parameters
- Type Alias StorageAccount has a new parameter storageAccountSkuConversionStatus
- Type Alias StorageAccount has a new parameter dnsEndpointType
- Type Alias Table has a new parameter signedIdentifiers
- Added Enum KnownDnsEndpointType
- Added Enum KnownSkuConversionStatus
- Enum KnownCorsRuleAllowedMethodsItem has a new value Patch

## 17.1.0 (2022-02-14)

### Features Added

- Added operation group LocalUsersOperations
- Added Interface LocalUserKeys
- Added Interface LocalUserRegeneratePasswordResult
- Added Interface LocalUsers
- Added Interface LocalUsersCreateOrUpdateOptionalParams
- Added Interface LocalUsersDeleteOptionalParams
- Added Interface LocalUsersGetOptionalParams
- Added Interface LocalUsersListKeysOptionalParams
- Added Interface LocalUsersListOptionalParams
- Added Interface LocalUsersRegeneratePasswordOptionalParams
- Added Interface PermissionScope
- Added Interface SshPublicKey
- Added Type Alias ActiveDirectoryPropertiesAccountType
- Added Type Alias AllowedCopyScope
- Added Type Alias LocalUser
- Added Type Alias LocalUsersCreateOrUpdateResponse
- Added Type Alias LocalUsersGetResponse
- Added Type Alias LocalUsersListKeysResponse
- Added Type Alias LocalUsersListResponse
- Added Type Alias LocalUsersRegeneratePasswordResponse
- Interface ActiveDirectoryProperties has a new optional parameter accountType
- Interface ActiveDirectoryProperties has a new optional parameter samAccountName
- Interface EncryptionIdentity has a new optional parameter encryptionFederatedIdentityClientId
- Interface StorageAccountCreateParameters has a new optional parameter allowedCopyScope
- Interface StorageAccountCreateParameters has a new optional parameter isLocalUserEnabled
- Interface StorageAccountCreateParameters has a new optional parameter isSftpEnabled
- Interface StorageAccountUpdateParameters has a new optional parameter allowedCopyScope
- Interface StorageAccountUpdateParameters has a new optional parameter isLocalUserEnabled
- Interface StorageAccountUpdateParameters has a new optional parameter isSftpEnabled
- Class StorageManagementClient has a new parameter localUsersOperations
- Type Alias StorageAccount has a new parameter isSftpEnabled
- Type Alias StorageAccount has a new parameter isLocalUserEnabled
- Type Alias StorageAccount has a new parameter allowedCopyScope
- Added Enum KnownActiveDirectoryPropertiesAccountType
- Added Enum KnownAllowedCopyScope

## 17.0.0 (2021-12-06)

The package of @azure/arm-storage is using our next generation design principles since version 17.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
