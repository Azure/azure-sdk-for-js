# Release History
    
## 7.6.0 (2024-12-20)
    
### Features Added

  - Added operation group DefenderForAISettings
  - Added operation group EncryptionScopes
  - Added operation group LocationBasedModelCapacities
  - Added operation group ModelCapacities
  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added operation group RaiBlocklistItems
  - Added operation group RaiBlocklists
  - Added operation group RaiContentFilters
  - Added operation group RaiPolicies
  - Added operation Deployments.beginUpdate
  - Added operation Deployments.beginUpdateAndWait
  - Added operation Deployments.listSkus
  - Added Interface BillingMeterInfo
  - Added Interface CalculateModelCapacityOptionalParams
  - Added Interface CalculateModelCapacityParameter
  - Added Interface CalculateModelCapacityResult
  - Added Interface CalculateModelCapacityResultEstimatedCapacity
  - Added Interface CustomBlocklistConfig
  - Added Interface DefenderForAISetting
  - Added Interface DefenderForAISettingResult
  - Added Interface DefenderForAISettingsCreateOrUpdateOptionalParams
  - Added Interface DefenderForAISettingsGetOptionalParams
  - Added Interface DefenderForAISettingsListNextOptionalParams
  - Added Interface DefenderForAISettingsListOptionalParams
  - Added Interface DefenderForAISettingsUpdateOptionalParams
  - Added Interface DeploymentCapacitySettings
  - Added Interface DeploymentSkuListResult
  - Added Interface DeploymentsListSkusNextOptionalParams
  - Added Interface DeploymentsListSkusOptionalParams
  - Added Interface DeploymentsUpdateHeaders
  - Added Interface DeploymentsUpdateOptionalParams
  - Added Interface EncryptionScope
  - Added Interface EncryptionScopeListResult
  - Added Interface EncryptionScopeProperties
  - Added Interface EncryptionScopesCreateOrUpdateOptionalParams
  - Added Interface EncryptionScopesDeleteHeaders
  - Added Interface EncryptionScopesDeleteOptionalParams
  - Added Interface EncryptionScopesGetOptionalParams
  - Added Interface EncryptionScopesListNextOptionalParams
  - Added Interface EncryptionScopesListOptionalParams
  - Added Interface LocationBasedModelCapacitiesListNextOptionalParams
  - Added Interface LocationBasedModelCapacitiesListOptionalParams
  - Added Interface ModelCapacitiesListNextOptionalParams
  - Added Interface ModelCapacitiesListOptionalParams
  - Added Interface ModelCapacityCalculatorWorkload
  - Added Interface ModelCapacityCalculatorWorkloadRequestParam
  - Added Interface ModelCapacityListResult
  - Added Interface ModelCapacityListResultValueItem
  - Added Interface ModelSkuCapacityProperties
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterAccessRule
  - Added Interface NetworkSecurityPerimeterAccessRuleProperties
  - Added Interface NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationAssociationInfo
  - Added Interface NetworkSecurityPerimeterConfigurationList
  - Added Interface NetworkSecurityPerimeterConfigurationProperties
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListNextOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileHeaders
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NetworkSecurityPerimeterProfileInfo
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface RaiBlocklist
  - Added Interface RaiBlocklistConfig
  - Added Interface RaiBlocklistItem
  - Added Interface RaiBlocklistItemBulkRequest
  - Added Interface RaiBlocklistItemProperties
  - Added Interface RaiBlocklistItemsBatchAddOptionalParams
  - Added Interface RaiBlocklistItemsBatchDeleteOptionalParams
  - Added Interface RaiBlocklistItemsCreateOrUpdateOptionalParams
  - Added Interface RaiBlocklistItemsDeleteHeaders
  - Added Interface RaiBlocklistItemsDeleteOptionalParams
  - Added Interface RaiBlocklistItemsGetOptionalParams
  - Added Interface RaiBlocklistItemsListNextOptionalParams
  - Added Interface RaiBlocklistItemsListOptionalParams
  - Added Interface RaiBlockListItemsResult
  - Added Interface RaiBlocklistProperties
  - Added Interface RaiBlockListResult
  - Added Interface RaiBlocklistsCreateOrUpdateOptionalParams
  - Added Interface RaiBlocklistsDeleteHeaders
  - Added Interface RaiBlocklistsDeleteOptionalParams
  - Added Interface RaiBlocklistsGetOptionalParams
  - Added Interface RaiBlocklistsListNextOptionalParams
  - Added Interface RaiBlocklistsListOptionalParams
  - Added Interface RaiContentFilter
  - Added Interface RaiContentFilterListResult
  - Added Interface RaiContentFilterProperties
  - Added Interface RaiContentFiltersGetOptionalParams
  - Added Interface RaiContentFiltersListNextOptionalParams
  - Added Interface RaiContentFiltersListOptionalParams
  - Added Interface RaiMonitorConfig
  - Added Interface RaiPoliciesCreateOrUpdateOptionalParams
  - Added Interface RaiPoliciesDeleteHeaders
  - Added Interface RaiPoliciesDeleteOptionalParams
  - Added Interface RaiPoliciesGetOptionalParams
  - Added Interface RaiPoliciesListNextOptionalParams
  - Added Interface RaiPoliciesListOptionalParams
  - Added Interface RaiPolicy
  - Added Interface RaiPolicyContentFilter
  - Added Interface RaiPolicyListResult
  - Added Interface RaiPolicyProperties
  - Added Interface SkuResource
  - Added Interface UserOwnedAmlWorkspace
  - Added Type Alias ByPassSelection
  - Added Type Alias CalculateModelCapacityResponse
  - Added Type Alias ContentLevel
  - Added Type Alias DefenderForAISettingsCreateOrUpdateResponse
  - Added Type Alias DefenderForAISettingsGetResponse
  - Added Type Alias DefenderForAISettingsListNextResponse
  - Added Type Alias DefenderForAISettingsListResponse
  - Added Type Alias DefenderForAISettingState
  - Added Type Alias DefenderForAISettingsUpdateResponse
  - Added Type Alias DeploymentsListSkusNextResponse
  - Added Type Alias DeploymentsListSkusResponse
  - Added Type Alias DeploymentsUpdateResponse
  - Added Type Alias EncryptionScopeProvisioningState
  - Added Type Alias EncryptionScopesCreateOrUpdateResponse
  - Added Type Alias EncryptionScopesDeleteResponse
  - Added Type Alias EncryptionScopesGetResponse
  - Added Type Alias EncryptionScopesListNextResponse
  - Added Type Alias EncryptionScopesListResponse
  - Added Type Alias EncryptionScopeState
  - Added Type Alias LocationBasedModelCapacitiesListNextResponse
  - Added Type Alias LocationBasedModelCapacitiesListResponse
  - Added Type Alias ModelCapacitiesListNextResponse
  - Added Type Alias ModelCapacitiesListResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListNextResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsReconcileResponse
  - Added Type Alias NspAccessRuleDirection
  - Added Type Alias RaiBlocklistItemsBatchAddResponse
  - Added Type Alias RaiBlocklistItemsCreateOrUpdateResponse
  - Added Type Alias RaiBlocklistItemsDeleteResponse
  - Added Type Alias RaiBlocklistItemsGetResponse
  - Added Type Alias RaiBlocklistItemsListNextResponse
  - Added Type Alias RaiBlocklistItemsListResponse
  - Added Type Alias RaiBlocklistsCreateOrUpdateResponse
  - Added Type Alias RaiBlocklistsDeleteResponse
  - Added Type Alias RaiBlocklistsGetResponse
  - Added Type Alias RaiBlocklistsListNextResponse
  - Added Type Alias RaiBlocklistsListResponse
  - Added Type Alias RaiContentFiltersGetResponse
  - Added Type Alias RaiContentFiltersListNextResponse
  - Added Type Alias RaiContentFiltersListResponse
  - Added Type Alias RaiPoliciesCreateOrUpdateResponse
  - Added Type Alias RaiPoliciesDeleteResponse
  - Added Type Alias RaiPoliciesGetResponse
  - Added Type Alias RaiPoliciesListNextResponse
  - Added Type Alias RaiPoliciesListResponse
  - Added Type Alias RaiPolicyContentSource
  - Added Type Alias RaiPolicyMode
  - Added Type Alias RaiPolicyType
  - Interface AccountProperties has a new optional parameter amlWorkspace
  - Interface AccountProperties has a new optional parameter raiMonitorConfig
  - Interface CapacityConfig has a new optional parameter allowedValues
  - Interface CommitmentPlanAccountAssociation has a new optional parameter tags
  - Interface Deployment has a new optional parameter tags
  - Interface DeploymentModel has a new optional parameter publisher
  - Interface DeploymentModel has a new optional parameter sourceAccount
  - Interface DeploymentProperties has a new optional parameter capacitySettings
  - Interface DeploymentProperties has a new optional parameter currentCapacity
  - Interface DeploymentProperties has a new optional parameter dynamicThrottlingEnabled
  - Interface DeploymentProperties has a new optional parameter parentDeploymentName
  - Interface Model has a new optional parameter description
  - Interface ModelSku has a new optional parameter cost
  - Interface NetworkRuleSet has a new optional parameter bypass
  - Added Enum KnownByPassSelection
  - Added Enum KnownContentLevel
  - Added Enum KnownDefenderForAISettingState
  - Added Enum KnownEncryptionScopeProvisioningState
  - Added Enum KnownEncryptionScopeState
  - Added Enum KnownNspAccessRuleDirection
  - Added Enum KnownRaiPolicyContentSource
  - Added Enum KnownRaiPolicyMode
  - Added Enum KnownRaiPolicyType
  - Enum KnownModelLifecycleStatus has a new value Deprecated
  - Enum KnownModelLifecycleStatus has a new value Deprecating
  - Enum KnownModelLifecycleStatus has a new value Stable
    
    
## 7.5.0 (2023-07-06)
    
### Features Added

  - Added operation group Models
  - Added operation group Usages
  - Added Interface AbusePenalty
  - Added Interface CapacityConfig
  - Added Interface Model
  - Added Interface ModelListResult
  - Added Interface ModelSku
  - Added Interface ModelsListNextOptionalParams
  - Added Interface ModelsListOptionalParams
  - Added Interface UsagesListNextOptionalParams
  - Added Interface UsagesListOptionalParams
  - Added Type Alias AbusePenaltyAction
  - Added Type Alias DeploymentModelVersionUpgradeOption
  - Added Type Alias ModelsListNextResponse
  - Added Type Alias ModelsListResponse
  - Added Type Alias UsagesListNextResponse
  - Added Type Alias UsagesListResponse
  - Interface AccountModel has a new optional parameter isDefaultVersion
  - Interface AccountModel has a new optional parameter skus
  - Interface AccountProperties has a new optional parameter abusePenalty
  - Interface CommitmentPlanProperties has a new optional parameter provisioningIssues
  - Interface Deployment has a new optional parameter sku
  - Interface DeploymentModel has a new optional parameter source
  - Interface DeploymentProperties has a new optional parameter rateLimits
  - Interface DeploymentProperties has a new optional parameter versionUpgradeOption
  - Interface UsageListResult has a new optional parameter nextLink
  - Added Enum KnownAbusePenaltyAction
  - Added Enum KnownDeploymentModelVersionUpgradeOption
  - Enum KnownDeploymentProvisioningState has a new value Canceled
  - Enum KnownDeploymentProvisioningState has a new value Disabled
  - Enum KnownHostingModel has a new value ProvisionedWeb
    
    
## 7.4.0 (2023-02-06)
    
### Features Added

  - Added operation CommitmentPlans.beginCreateOrUpdateAssociation
  - Added operation CommitmentPlans.beginCreateOrUpdateAssociationAndWait
  - Added operation CommitmentPlans.beginCreateOrUpdatePlan
  - Added operation CommitmentPlans.beginCreateOrUpdatePlanAndWait
  - Added operation CommitmentPlans.beginDeleteAssociation
  - Added operation CommitmentPlans.beginDeleteAssociationAndWait
  - Added operation CommitmentPlans.beginDeletePlan
  - Added operation CommitmentPlans.beginDeletePlanAndWait
  - Added operation CommitmentPlans.beginUpdatePlan
  - Added operation CommitmentPlans.beginUpdatePlanAndWait
  - Added operation CommitmentPlans.getAssociation
  - Added operation CommitmentPlans.getPlan
  - Added operation CommitmentPlans.listAssociations
  - Added operation CommitmentPlans.listPlansByResourceGroup
  - Added operation CommitmentPlans.listPlansBySubscription
  - Added Interface CommitmentPlanAccountAssociation
  - Added Interface CommitmentPlanAccountAssociationListResult
  - Added Interface CommitmentPlanAssociation
  - Added Interface CommitmentPlansCreateOrUpdateAssociationOptionalParams
  - Added Interface CommitmentPlansCreateOrUpdatePlanOptionalParams
  - Added Interface CommitmentPlansDeleteAssociationHeaders
  - Added Interface CommitmentPlansDeleteAssociationOptionalParams
  - Added Interface CommitmentPlansDeletePlanHeaders
  - Added Interface CommitmentPlansDeletePlanOptionalParams
  - Added Interface CommitmentPlansGetAssociationOptionalParams
  - Added Interface CommitmentPlansGetPlanOptionalParams
  - Added Interface CommitmentPlansListAssociationsNextOptionalParams
  - Added Interface CommitmentPlansListAssociationsOptionalParams
  - Added Interface CommitmentPlansListPlansByResourceGroupNextOptionalParams
  - Added Interface CommitmentPlansListPlansByResourceGroupOptionalParams
  - Added Interface CommitmentPlansListPlansBySubscriptionNextOptionalParams
  - Added Interface CommitmentPlansListPlansBySubscriptionOptionalParams
  - Added Interface CommitmentPlansUpdatePlanHeaders
  - Added Interface CommitmentPlansUpdatePlanOptionalParams
  - Added Interface MultiRegionSettings
  - Added Interface PatchResourceTags
  - Added Interface PatchResourceTagsAndSku
  - Added Interface RegionSetting
  - Added Type Alias CommitmentPlanProvisioningState
  - Added Type Alias CommitmentPlansCreateOrUpdateAssociationResponse
  - Added Type Alias CommitmentPlansCreateOrUpdatePlanResponse
  - Added Type Alias CommitmentPlansGetAssociationResponse
  - Added Type Alias CommitmentPlansGetPlanResponse
  - Added Type Alias CommitmentPlansListAssociationsNextResponse
  - Added Type Alias CommitmentPlansListAssociationsResponse
  - Added Type Alias CommitmentPlansListPlansByResourceGroupNextResponse
  - Added Type Alias CommitmentPlansListPlansByResourceGroupResponse
  - Added Type Alias CommitmentPlansListPlansBySubscriptionNextResponse
  - Added Type Alias CommitmentPlansListPlansBySubscriptionResponse
  - Added Type Alias CommitmentPlansUpdatePlanResponse
  - Added Type Alias ModelLifecycleStatus
  - Added Type Alias RoutingMethods
  - Interface AccountModel has a new optional parameter finetuneCapabilities
  - Interface AccountModel has a new optional parameter lifecycleStatus
  - Interface AccountProperties has a new optional parameter commitmentPlanAssociations
  - Interface AccountProperties has a new optional parameter locations
  - Interface CommitmentPlan has a new optional parameter kind
  - Interface CommitmentPlan has a new optional parameter location
  - Interface CommitmentPlan has a new optional parameter sku
  - Interface CommitmentPlan has a new optional parameter tags
  - Interface CommitmentPlanProperties has a new optional parameter commitmentPlanGuid
  - Interface CommitmentPlanProperties has a new optional parameter provisioningState
  - Added Enum KnownCommitmentPlanProvisioningState
  - Added Enum KnownModelLifecycleStatus
  - Added Enum KnownRoutingMethods
    
    
## 7.3.1 (2022-11-21)

### Features Added

 -  Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 7.3.0 (2022-10-31)
    
### Features Added

  - Added Interface Account
  - Added Interface AccountModel
  - Added Interface AzureEntityResource
  - Added Interface CommitmentPlan
  - Added Interface Deployment
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Interface DeploymentModel has a new optional parameter callRateLimit
  - Interface DeploymentProperties has a new optional parameter callRateLimit
  - Interface DeploymentProperties has a new optional parameter capabilities
  - Interface DeploymentProperties has a new optional parameter raiPolicyName
    
    
## 7.2.0 (2022-06-10)
    
### Features Added

  - Enum KnownDeploymentScaleType has a new value Standard
    
    
## 7.1.0 (2022-04-06)
    
### Features Added

  - Added operation Accounts.listModels
  - Added Interface AccountModelListResult
  - Added Interface AccountsListModelsNextOptionalParams
  - Added Interface AccountsListModelsOptionalParams
  - Added Interface ModelDeprecationInfo
  - Added Type Alias AccountModel
  - Added Type Alias AccountsListModelsNextResponse
  - Added Type Alias AccountsListModelsResponse
  - Interface AccountProperties has a new optional parameter deletionDate
  - Interface AccountProperties has a new optional parameter dynamicThrottlingEnabled
  - Interface AccountProperties has a new optional parameter scheduledPurgeDate
  - Interface DeploymentScaleSettings has a new optional parameter activeCapacity
    
    
## 7.0.0 (2021-12-20)

The package of @azure/arm-cognitiveservices is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
