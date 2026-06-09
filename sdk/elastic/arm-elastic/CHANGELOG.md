# Release History

## 3.0.0-beta.1 (2026-06-09)
Compared with version 2.0.0

### Features Added
  - Added operation AssociateTrafficFilterOperations.associate
  - Added operation CreateAndAssociateIPFilterOperations.create
  - Added operation CreateAndAssociatePLFilterOperations.create
  - Added operation DetachTrafficFilterOperations.update
  - Added operation MonitorOperations.upgrade
  - Added operation MonitoredSubscriptionsOperations.createorUpdate
  - Added operation MonitoredSubscriptionsOperations.delete
  - Added operation MonitoredSubscriptionsOperations.update
  - Added operation MonitorsOperations.create
  - Added operation MonitorsOperations.delete
  - Added operation MonitorsOperations.update
  - Added operation OrganizationsOperations.resubscribe
  - Added operation TagRulesOperations.delete
  - Class MicrosoftElastic has a new constructor "constructor(credential: TokenCredential, options?: MicrosoftElasticOptionalParams);"
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface TrackedResource
  - Interface MonitoredSubscriptionProperties has a new optional parameter systemData
  - Interface OpenAIIntegrationRPModel has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
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
  - Removed operation MonitoredSubscriptions.beginCreateorUpdate
  - Removed operation MonitoredSubscriptions.beginCreateorUpdateAndWait
  - Removed operation MonitoredSubscriptions.beginDelete
  - Removed operation MonitoredSubscriptions.beginDeleteAndWait
  - Removed operation MonitoredSubscriptions.beginUpdate
  - Removed operation MonitoredSubscriptions.beginUpdateAndWait
  - Removed operation Monitors.beginCreate
  - Removed operation Monitors.beginCreateAndWait
  - Removed operation Monitors.beginDelete
  - Removed operation Monitors.beginDeleteAndWait
  - Removed operation Monitors.beginUpdate
  - Removed operation Monitors.beginUpdateAndWait
  - Removed operation Organizations.beginResubscribe
  - Removed operation Organizations.beginResubscribeAndWait
  - Removed operation TagRules.beginDelete
  - Removed operation TagRules.beginDeleteAndWait
  - Class MicrosoftElastic no longer has parameter apiVersion
  - Class MicrosoftElastic no longer has parameter subscriptionId
  - Class MicrosoftElastic no longer has parameter vMCollection
  - Class MicrosoftElastic no longer has parameter vMHost
  - Class MicrosoftElastic no longer has parameter vMIngestion
  - Removed Interface ConnectedPartnerResourcesListResponse
  - Removed Interface ElasticMonitorResourceListResponse
  - Removed Interface ElasticVersionsListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface MonitoredSubscriptionPropertiesList
  - Removed Interface MonitoringTagRulesListResponse
  - Removed Interface OpenAIIntegrationRPModelListResponse
  - Removed Interface VMHostListResponse
  - Parameter subscriptionId of interface MonitoredSubscription is now required

## 2.0.0 (2025-11-25)

### Features Added
  - Added operation group MonitoredSubscriptions
  - Added operation Monitors.beginUpdate
  - Added operation Monitors.beginUpdateAndWait
  - Added operation Organizations.beginResubscribe
  - Added operation Organizations.beginResubscribeAndWait
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
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateHeaders
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface MonitorsUpdateHeaders
  - Added Interface OrganizationsResubscribeHeaders
  - Added Interface OrganizationsResubscribeOptionalParams
  - Added Interface ProjectDetails
  - Added Interface ResubscribeProperties
  - Added Interface SubscriptionList
  - Interface ConnectedPartnerResourceProperties has a new optional parameter type
  - Interface DeploymentInfoResponse has a new optional parameter configurationType
  - Interface DeploymentInfoResponse has a new optional parameter projectType
  - Interface ElasticMonitorResource has a new optional parameter kind
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter offerId
  - Interface MarketplaceSaaSInfoMarketplaceSubscription has a new optional parameter publisherId
  - Interface MonitorProperties has a new optional parameter hostingType
  - Interface MonitorProperties has a new optional parameter projectDetails
  - Interface MonitorsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface MonitorsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface OpenAIIntegrationProperties has a new optional parameter openAIConnectorId
  - Added Type Alias ConfigurationType
  - Added Type Alias HostingType
  - Added Type Alias MonitoredSubscriptionsCreateorUpdateResponse
  - Added Type Alias MonitoredSubscriptionsDeleteResponse
  - Added Type Alias MonitoredSubscriptionsGetResponse
  - Added Type Alias MonitoredSubscriptionsListNextResponse
  - Added Type Alias MonitoredSubscriptionsListResponse
  - Added Type Alias MonitoredSubscriptionsUpdateResponse
  - Added Type Alias Operation
  - Added Type Alias OrganizationsResubscribeResponse
  - Added Type Alias ProjectType
  - Added Type Alias Status
  - Added Enum KnownConfigurationType
  - Added Enum KnownHostingType
  - Added Enum KnownOperation
  - Added Enum KnownProjectType
  - Added Enum KnownStatus

### Breaking Changes
  - Removed operation Monitors.update

    
## 1.0.0 (2024-10-17)

### Features Added

The package of @azure/arm-elastic is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
