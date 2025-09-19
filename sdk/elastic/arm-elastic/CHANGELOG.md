# Release History

## 2.0.0 (2025-09-19)

### Features Added
  - Added operation group MonitoredSubscriptionsOperations
  - Added operation AssociateTrafficFilterOperations.associate
  - Added operation CreateAndAssociateIPFilterOperations.create
  - Added operation CreateAndAssociatePLFilterOperations.create
  - Added operation DetachTrafficFilterOperations.update
  - Added operation MonitorOperations.upgrade
  - Added operation MonitorsOperations.create
  - Added operation MonitorsOperations.delete
  - Added operation OrganizationsOperations.resubscribe
  - Added operation TagRulesOperations.delete
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface MonitoredSubscription
  - Added Interface MonitoredSubscriptionProperties
  - Added Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Added Interface MonitoredSubscriptionsDeleteOptionalParams
  - Added Interface MonitoredSubscriptionsGetOptionalParams
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface OrganizationsResubscribeOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProjectDetails
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface ResubscribeProperties
  - Added Interface SubscriptionList
  - Added Interface TrackedResource
  - Interface ConnectedPartnerResourceProperties has a new optional parameter type
  - Interface DeploymentInfoResponse has a new optional parameter configurationType
  - Interface DeploymentInfoResponse has a new optional parameter projectType
  - Interface ElasticMonitorResource has a new optional parameter kind
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter offerId
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter publisherId
  - Interface MonitorProperties has a new optional parameter hostingType
  - Interface MonitorProperties has a new optional parameter projectDetails
  - Interface MonitorsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface OpenAIIntegrationProperties has a new optional parameter openAIConnectorId
  - Interface OpenAIIntegrationRPModel has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ConfigurationType
  - Added Type Alias HostingType
  - Added Type Alias Operation
  - Added Type Alias ProjectType
  - Added Type Alias Status
  - Added Enum AzureClouds
  - Added Enum KnownConfigurationType
  - Added Enum KnownHostingType
  - Added Enum KnownOperation
  - Added Enum KnownProjectType
  - Added Enum KnownStatus
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation AssociateTrafficFilter.beginAssociate
  - Removed operation AssociateTrafficFilter.beginAssociateAndWait
  - Removed operation CreateAndAssociateIPFilter.beginCreate
  - Removed operation CreateAndAssociateIPFilter.beginCreateAndWait
  - Removed operation CreateAndAssociatePLFilter.beginCreate
  - Removed operation CreateAndAssociatePLFilter.beginCreateAndWait
  - Removed operation DetachTrafficFilter.beginUpdate
  - Removed operation DetachTrafficFilter.beginUpdateAndWait
  - Removed operation Monitor.beginUpgrade
  - Removed operation Monitor.beginUpgradeAndWait
  - Removed operation Monitors.beginCreate
  - Removed operation Monitors.beginCreateAndWait
  - Removed operation Monitors.beginDelete
  - Removed operation Monitors.beginDeleteAndWait
  - Removed operation TagRules.beginDelete
  - Removed operation TagRules.beginDeleteAndWait
  - Removed Interface ConnectedPartnerResourcesListResponse
  - Removed Interface ElasticMonitorResourceListResponse
  - Removed Interface ElasticVersionsListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface MonitoringTagRulesListResponse
  - Removed Interface OpenAIIntegrationRPModelListResponse
  - Removed Interface VMHostListResponse

    
## 1.0.0 (2024-10-17)

### Features Added

The package of @azure/arm-elastic is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
