# Release History

## 1.0.0-beta.3 (2026-07-22)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeAutoUpdateHistory
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeMccIssueDetailsHistory
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeTlsCertificateHistory
  - Added operation IspCacheNodesOperationsOperations.getCacheNodeAutoUpdateHistory
  - Added operation IspCacheNodesOperationsOperations.getCacheNodeMccIssueDetailsHistory
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams
  - Added Interface ErrorResponse
  - Added Interface IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams
  - Added Interface IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams
  - Added Interface MccCacheNodeAutoUpdateHistory
  - Added Interface MccCacheNodeAutoUpdateHistoryProperties
  - Added Interface MccCacheNodeAutoUpdateInfo
  - Added Interface MccCacheNodeIssueHistory
  - Added Interface MccCacheNodeIssueHistoryProperties
  - Added Interface MccCacheNodeTlsCertificate
  - Added Interface MccCacheNodeTlsCertificateHistory
  - Added Interface MccCacheNodeTlsCertificateProperties
  - Added Interface MccIssue
  - Interface AdditionalCacheNodeProperties has a new optional parameter appVersionWsl
  - Interface AdditionalCacheNodeProperties has a new optional parameter containerOsBuild
  - Interface AdditionalCacheNodeProperties has a new optional parameter containerOsEdition
  - Interface AdditionalCacheNodeProperties has a new optional parameter containerOsVersion
  - Interface AdditionalCacheNodeProperties has a new optional parameter creationMethod
  - Interface AdditionalCacheNodeProperties has a new optional parameter currentTlsCertificate
  - Interface AdditionalCacheNodeProperties has a new optional parameter distroOsBuildWsl
  - Interface AdditionalCacheNodeProperties has a new optional parameter distroOsEditionWsl
  - Interface AdditionalCacheNodeProperties has a new optional parameter distroOsVersionWsl
  - Interface AdditionalCacheNodeProperties has a new optional parameter hostOsBuild
  - Interface AdditionalCacheNodeProperties has a new optional parameter hostOsEdition
  - Interface AdditionalCacheNodeProperties has a new optional parameter hostOsVersion
  - Interface AdditionalCacheNodeProperties has a new optional parameter installVersionMsix
  - Interface AdditionalCacheNodeProperties has a new optional parameter installVersionScript
  - Interface AdditionalCacheNodeProperties has a new optional parameter issuesCount
  - Interface AdditionalCacheNodeProperties has a new optional parameter issuesList
  - Interface AdditionalCacheNodeProperties has a new optional parameter lastAutoUpdateInfo
  - Interface AdditionalCacheNodeProperties has a new optional parameter tlsStatus
  - Interface CacheNodeEntity has a new optional parameter bgpNetworkInterface
  - Interface CacheNodeEntity has a new optional parameter openFirewallPort443
  - Interface CacheNodeEntity has a new optional parameter openFirewallPort5000
  - Interface CacheNodeEntity has a new optional parameter openFirewallPort5001
  - Interface CacheNodeEntity has a new optional parameter openFirewallPort80
  - Interface CacheNodeEntity has a new optional parameter runtimeAccountType
  - Interface CacheNodeInstallProperties has a new optional parameter driveConfiguration
  - Interface CacheNodeInstallProperties has a new optional parameter proxyUrlConfiguration
  - Interface CacheNodeInstallProperties has a new optional parameter tlsCertificateProvisioningKey
  - Interface ConnectedCacheClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Enum KnownAutoUpdateRingType has a new value Beta
  - Enum KnownAutoUpdateRingType has a new value Stable
  - Enum KnownConfigurationState has a new value NotConfiguredIp
  - Enum KnownVersions has a new value V20260601

### Breaking Changes
  - Removed operation group CacheNodesOperationsOperations
  - Removed operation group EnterpriseCustomerOperationsOperations
  - Class ConnectedCacheClient no longer has parameter cacheNodesOperations
  - Class ConnectedCacheClient no longer has parameter enterpriseCustomerOperations
  - Removed Interface CacheNodeOldResponse
  - Removed Interface CacheNodePreviewResource
  - Removed Interface CacheNodesOperationsCreateorUpdateOptionalParams
  - Removed Interface CacheNodesOperationsDeleteOptionalParams
  - Removed Interface CacheNodesOperationsGetOptionalParams
  - Removed Interface CacheNodesOperationsListByResourceGroupOptionalParams
  - Removed Interface CacheNodesOperationsListBySubscriptionOptionalParams
  - Removed Interface CacheNodesOperationsUpdateOptionalParams
  - Removed Interface EnterpriseCustomerOperationsCreateOrUpdateOptionalParams
  - Removed Interface EnterpriseCustomerOperationsDeleteOptionalParams
  - Removed Interface EnterpriseCustomerOperationsGetOptionalParams
  - Removed Interface EnterpriseCustomerOperationsListByResourceGroupOptionalParams
  - Removed Interface EnterpriseCustomerOperationsListBySubscriptionOptionalParams
  - Removed Interface EnterpriseCustomerOperationsUpdateOptionalParams
  - Removed Interface EnterprisePreviewResource
  - Interface AdditionalCacheNodeProperties no longer has parameter proxyUrl
  - Interface AdditionalCacheNodeProperties no longer has parameter updateCycleType
  - Interface AdditionalCustomerProperties no longer has parameter peeringDbLastUpdateTime
  - Removed Type Alias CycleType
  - Removed Enum KnownCycleType
  - Enum KnownConfigurationState no longer has value NotConfigured_Ip
  - Enum KnownVersions no longer has value v2023_05_01_preview

## 1.0.0-beta.2 (2026-02-25)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeAutoUpdateHistory
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeMccIssueDetailsHistory
  - Added operation EnterpriseMccCacheNodesOperationsOperations.getCacheNodeTlsCertificateHistory
  - Added operation IspCacheNodesOperationsOperations.getCacheNodeAutoUpdateHistory
  - Added operation IspCacheNodesOperationsOperations.getCacheNodeMccIssueDetailsHistory
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams
  - Added Interface EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams
  - Added Interface ErrorResponse
  - Added Interface IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams
  - Added Interface IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams
  - Added Interface MccCacheNodeAutoUpdateHistory
  - Added Interface MccCacheNodeAutoUpdateHistoryProperties
  - Added Interface MccCacheNodeAutoUpdateInfo
  - Added Interface MccCacheNodeIssueHistory
  - Added Interface MccCacheNodeIssueHistoryProperties
  - Added Interface MccCacheNodeTlsCertificate
  - Added Interface MccCacheNodeTlsCertificateHistory
  - Added Interface MccCacheNodeTlsCertificateProperties
  - Added Interface MccIssue
  - Interface AdditionalCacheNodeProperties has a new optional parameter creationMethod
  - Interface AdditionalCacheNodeProperties has a new optional parameter currentTlsCertificate
  - Interface AdditionalCacheNodeProperties has a new optional parameter issuesCount
  - Interface AdditionalCacheNodeProperties has a new optional parameter issuesList
  - Interface AdditionalCacheNodeProperties has a new optional parameter lastAutoUpdateInfo
  - Interface AdditionalCacheNodeProperties has a new optional parameter tlsStatus
  - Interface CacheNodeInstallProperties has a new optional parameter driveConfiguration
  - Interface CacheNodeInstallProperties has a new optional parameter proxyUrlConfiguration
  - Interface CacheNodeInstallProperties has a new optional parameter tlsCertificateProvisioningKey
  - Interface ConnectedCacheClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Enum KnownConfigurationState has a new value NotConfiguredIp
  - Enum KnownVersions has a new value V20230501Preview
  - Enum KnownVersions has a new value V20241130Preview

### Breaking Changes
  - Removed operation group CacheNodesOperationsOperations
  - Removed operation group EnterpriseCustomerOperationsOperations
  - Class ConnectedCacheClient no longer has parameter cacheNodesOperations
  - Class ConnectedCacheClient no longer has parameter enterpriseCustomerOperations
  - Removed Interface CacheNodeOldResponse
  - Removed Interface CacheNodePreviewResource
  - Removed Interface CacheNodesOperationsCreateorUpdateOptionalParams
  - Removed Interface CacheNodesOperationsDeleteOptionalParams
  - Removed Interface CacheNodesOperationsGetOptionalParams
  - Removed Interface CacheNodesOperationsListByResourceGroupOptionalParams
  - Removed Interface CacheNodesOperationsListBySubscriptionOptionalParams
  - Removed Interface CacheNodesOperationsUpdateOptionalParams
  - Removed Interface EnterpriseCustomerOperationsCreateOrUpdateOptionalParams
  - Removed Interface EnterpriseCustomerOperationsDeleteOptionalParams
  - Removed Interface EnterpriseCustomerOperationsGetOptionalParams
  - Removed Interface EnterpriseCustomerOperationsListByResourceGroupOptionalParams
  - Removed Interface EnterpriseCustomerOperationsListBySubscriptionOptionalParams
  - Removed Interface EnterpriseCustomerOperationsUpdateOptionalParams
  - Removed Interface EnterprisePreviewResource
  - Interface AdditionalCacheNodeProperties no longer has parameter proxyUrl
  - Interface AdditionalCacheNodeProperties no longer has parameter updateCycleType
  - Interface AdditionalCustomerProperties no longer has parameter peeringDbLastUpdateTime
  - Removed Type Alias CycleType
  - Removed Enum KnownCycleType
  - Enum KnownConfigurationState no longer has value NotConfigured_Ip
  - Enum KnownVersions no longer has value v2023_05_01_preview

    
## 1.0.0-beta.1 (2024-11-19)

### Features Added

Initial release of the Azure ConnectedCache package
