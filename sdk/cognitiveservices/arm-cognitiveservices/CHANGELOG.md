# Release History
    
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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
