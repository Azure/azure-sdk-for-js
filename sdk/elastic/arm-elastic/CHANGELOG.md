# Release History

## 2.0.0 (2025-09-19)

### Features Added
  - Added operation group MonitoredSubscriptions
  - Added operation Monitors.beginUpdate
  - Added operation Monitors.beginUpdateAndWait
  - Added operation Organizations.beginResubscribe
  - Added operation Organizations.beginResubscribeAndWait
  - Added Interface AssociateTrafficFilterAssociateHeaders
  - Added Interface CreateAndAssociateIPFilterCreateHeaders
  - Added Interface CreateAndAssociatePLFilterCreateHeaders
  - Added Interface DetachTrafficFilterUpdateHeaders
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface MonitoredSubscription
  - Added Interface MonitoredSubscriptionProperties
  - Added Interface MonitoredSubscriptionPropertiesList
  - Added Interface MonitoredSubscriptionsCreateorUpdateHeaders
  - Added Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Added Interface MonitoredSubscriptionsDeleteHeaders
  - Added Interface MonitoredSubscriptionsDeleteOptionalParams
  - Added Interface MonitoredSubscriptionsGetOptionalParams
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateHeaders
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface MonitorsCreateHeaders
  - Added Interface MonitorsDeleteHeaders
  - Added Interface MonitorsUpdateHeaders
  - Added Interface MonitorUpgradeHeaders
  - Added Interface OrganizationsResubscribeHeaders
  - Added Interface OrganizationsResubscribeOptionalParams
  - Added Interface ProjectDetails
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface ResubscribeProperties
  - Added Interface SubscriptionList
  - Added Interface TagRulesDeleteHeaders
  - Added Interface TrackedResource
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
  - Interface OpenAIIntegrationRPModel has a new optional parameter systemData
  - Added Type Alias AssociateTrafficFilterAssociateResponse
  - Added Type Alias ConfigurationType
  - Added Type Alias DetachTrafficFilterUpdateResponse
  - Added Type Alias HostingType
  - Added Type Alias MonitoredSubscriptionsCreateorUpdateResponse
  - Added Type Alias MonitoredSubscriptionsDeleteResponse
  - Added Type Alias MonitoredSubscriptionsGetResponse
  - Added Type Alias MonitoredSubscriptionsListNextResponse
  - Added Type Alias MonitoredSubscriptionsListResponse
  - Added Type Alias MonitoredSubscriptionsUpdateResponse
  - Added Type Alias MonitorUpgradeResponse
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
  - Operation AssociateTrafficFilter.beginAssociateAndWait has a new signature
  - Operation DetachTrafficFilter.beginUpdateAndWait has a new signature
  - Operation Monitor.beginUpgradeAndWait has a new signature
  - Parameter value of interface ConnectedPartnerResourcesListResponse is now required
  - Parameter value of interface ElasticMonitorResourceListResponse is now required
  - Parameter value of interface ElasticVersionsListResponse is now required
  - Parameter value of interface MonitoredResourceListResponse is now required
  - Parameter value of interface MonitoringTagRulesListResponse is now required
  - Parameter value of interface OpenAIIntegrationRPModelListResponse is now required
  - Parameter value of interface OperationListResult is now required
  - Parameter value of interface VMHostListResponse is now required

    
## 1.0.0 (2024-10-17)

### Features Added

The package of @azure/arm-elastic is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
