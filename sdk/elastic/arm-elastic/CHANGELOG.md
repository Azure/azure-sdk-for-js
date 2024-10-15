# Release History
    
## 1.0.0-beta.4 (2024-10-15)
Compared with version 1.0.0-beta.3
    
### Features Added

  - Added operation group BillingInfo
  - Added operation group ConnectedPartnerResources
  - Added operation group MonitoredSubscriptions
  - Added operation group OpenAI
  - Added operation Monitors.beginUpdate
  - Added operation Monitors.beginUpdateAndWait
  - Added operation Organizations.beginResubscribe
  - Added operation Organizations.beginResubscribeAndWait
  - Added operation Organizations.getElasticToAzureSubscriptionMapping
  - Added Interface BillingInfoGetOptionalParams
  - Added Interface BillingInfoResponse
  - Added Interface ConnectedPartnerResourceProperties
  - Added Interface ConnectedPartnerResourcesListFormat
  - Added Interface ConnectedPartnerResourcesListNextOptionalParams
  - Added Interface ConnectedPartnerResourcesListOptionalParams
  - Added Interface ConnectedPartnerResourcesListResponse
  - Added Interface ElasticOrganizationToAzureSubscriptionMappingResponse
  - Added Interface ElasticOrganizationToAzureSubscriptionMappingResponseProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface MonitoredSubscription
  - Added Interface MonitoredSubscriptionProperties
  - Added Interface MonitoredSubscriptionPropertiesList
  - Added Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Added Interface MonitoredSubscriptionsDeleteHeaders
  - Added Interface MonitoredSubscriptionsDeleteOptionalParams
  - Added Interface MonitoredSubscriptionsGetOptionalParams
  - Added Interface MonitoredSubscriptionsListNextOptionalParams
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateHeaders
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface MonitorsUpdateHeaders
  - Added Interface OpenAICreateOrUpdateOptionalParams
  - Added Interface OpenAIDeleteOptionalParams
  - Added Interface OpenAIGetOptionalParams
  - Added Interface OpenAIGetStatusOptionalParams
  - Added Interface OpenAIIntegrationProperties
  - Added Interface OpenAIIntegrationRPModel
  - Added Interface OpenAIIntegrationRPModelListResponse
  - Added Interface OpenAIIntegrationStatusResponse
  - Added Interface OpenAIIntegrationStatusResponseProperties
  - Added Interface OpenAIListNextOptionalParams
  - Added Interface OpenAIListOptionalParams
  - Added Interface OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams
  - Added Interface OrganizationsResubscribeHeaders
  - Added Interface OrganizationsResubscribeOptionalParams
  - Added Interface PartnerBillingEntity
  - Added Interface PlanDetails
  - Added Interface ResubscribeProperties
  - Added Interface SubscriptionList
  - Added Type Alias BillingInfoGetResponse
  - Added Type Alias ConnectedPartnerResourcesListNextResponse
  - Added Type Alias ConnectedPartnerResourcesListOperationResponse
  - Added Type Alias MonitoredSubscriptionsCreateorUpdateResponse
  - Added Type Alias MonitoredSubscriptionsDeleteResponse
  - Added Type Alias MonitoredSubscriptionsGetResponse
  - Added Type Alias MonitoredSubscriptionsListNextResponse
  - Added Type Alias MonitoredSubscriptionsListResponse
  - Added Type Alias MonitoredSubscriptionsUpdateResponse
  - Added Type Alias OpenAICreateOrUpdateResponse
  - Added Type Alias OpenAIGetResponse
  - Added Type Alias OpenAIGetStatusResponse
  - Added Type Alias OpenAIListNextResponse
  - Added Type Alias OpenAIListResponse
  - Added Type Alias Operation
  - Added Type Alias OrganizationsGetElasticToAzureSubscriptionMappingResponse
  - Added Type Alias OrganizationsResubscribeResponse
  - Added Type Alias Status
  - Interface DeploymentInfoResponse has a new optional parameter elasticsearchEndPoint
  - Interface MarketplaceSaaSInfo has a new optional parameter billedAzureSubscriptionId
  - Interface MarketplaceSaaSInfo has a new optional parameter marketplaceStatus
  - Interface MarketplaceSaaSInfo has a new optional parameter subscribed
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter offerId
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter publisherId
  - Interface MonitorProperties has a new optional parameter planDetails
  - Interface MonitorProperties has a new optional parameter saaSAzureSubscriptionStatus
  - Interface MonitorProperties has a new optional parameter sourceCampaignId
  - Interface MonitorProperties has a new optional parameter sourceCampaignName
  - Interface MonitorProperties has a new optional parameter subscriptionState
  - Interface MonitorsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface MonitorsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Added Enum KnownOperation
  - Added Enum KnownStatus

### Breaking Changes

  - Removed operation Monitors.update
    
    
## 1.0.0-beta.3 (2023-05-15)
    
### Features Added

  - Added operation group ElasticVersions
  - Added Interface ElasticVersionListFormat
  - Added Interface ElasticVersionListProperties
  - Added Interface ElasticVersionsListNextOptionalParams
  - Added Interface ElasticVersionsListOptionalParams
  - Added Interface ElasticVersionsListResponse
  - Added Interface UserApiKeyResponseProperties
  - Added Type Alias ElasticVersionsListNextResponse
  - Added Type Alias ElasticVersionsListOperationResponse
  - Interface MonitorProperties has a new optional parameter generateApiKey
  - Interface UserApiKeyResponse has a new optional parameter properties

### Breaking Changes

  - Operation Organizations.getApiKey has a new signature
  - Interface ElasticMonitorResource no longer has parameter generateApiKey
  - Interface UserApiKeyResponse no longer has parameter apiKey
    
    
## 1.0.0-beta.2 (2023-04-03)
    
### Features Added

  - Added operation group Organizations
  - Added Interface MarketplaceSaaSInfo
  - Added Interface MarketplaceSaaSInfoMarketplaceSubscription
  - Added Interface OrganizationsGetApiKeyOptionalParams
  - Added Interface UserApiKeyResponse
  - Added Interface UserEmailId
  - Added Type Alias OrganizationsGetApiKeyResponse
  - Interface DeploymentInfoResponse has a new optional parameter deploymentUrl
  - Interface DeploymentInfoResponse has a new optional parameter marketplaceSaasInfo
  - Interface ElasticMonitorResource has a new optional parameter generateApiKey

### Breaking Changes

  - Removed Enum KnownApiVersionParameter
    
    
## 1.0.0-beta.1 (2022-11-08)

The package of @azure/arm-elastic is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
