# Release History

## 2.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.1 (2025-11-11)
Compared with version 1.1.0

### Features Added
  - Added operation group SaaS
  - Added operation MonitoredSubscriptions.beginCreateOrUpdate
  - Added operation MonitoredSubscriptions.beginCreateOrUpdateAndWait
  - Added operation Monitors.beginLinkSaaS
  - Added operation Monitors.beginLinkSaaSAndWait
  - Added operation Monitors.beginResubscribe
  - Added operation Monitors.beginResubscribeAndWait
  - Added operation Monitors.beginUpdate
  - Added operation Monitors.beginUpdateAndWait
  - Added operation Monitors.latestLinkedSaaS
  - Added operation Monitors.refreshIngestionKey
  - Added Interface ActivateSaaSParameterRequest
  - Added Interface LatestLinkedSaaSResponse
  - Added Interface MonitoredSubscriptionsCreateOrUpdateHeaders
  - Added Interface MonitoredSubscriptionsCreateOrUpdateOptionalParams
  - Added Interface MonitorsLatestLinkedSaaSOptionalParams
  - Added Interface MonitorsLinkSaaSHeaders
  - Added Interface MonitorsLinkSaaSOptionalParams
  - Added Interface MonitorsRefreshIngestionKeyOptionalParams
  - Added Interface MonitorsResubscribeHeaders
  - Added Interface MonitorsResubscribeOptionalParams
  - Added Interface MonitorsUpdateHeaders
  - Added Interface ResubscribeProperties
  - Added Interface SaaSActivateResourceOptionalParams
  - Added Interface SaaSData
  - Added Interface SaaSResourceDetailsResponse
  - Interface MarketplaceSaaSInfo has a new optional parameter offerId
  - Interface MarketplaceSaaSInfo has a new optional parameter publisherId
  - Interface MonitoredSubscriptionProperties has a new optional parameter systemData
  - Interface MonitoredSubscriptionsDeleteHeaders has a new optional parameter retryAfter
  - Interface MonitoredSubscriptionsUpdateHeaders has a new optional parameter retryAfter
  - Interface MonitorsCreateOrUpdateHeaders has a new optional parameter azureAsyncOperation
  - Interface MonitorsDeleteHeaders has a new optional parameter azureAsyncOperation
  - Interface MonitorsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface MonitorsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface NewRelicMonitorResource has a new optional parameter saaSData
  - Interface NewRelicMonitorResourceUpdate has a new optional parameter saaSData
  - Interface TagRulesCreateOrUpdateHeaders has a new optional parameter azureAsyncOperation
  - Interface TagRulesDeleteHeaders has a new optional parameter azureAsyncOperation
  - Added Type Alias MonitoredSubscriptionsCreateOrUpdateResponse
  - Added Type Alias MonitorsLatestLinkedSaaSResponse
  - Added Type Alias MonitorsLinkSaaSResponse
  - Added Type Alias MonitorsResubscribeResponse
  - Added Type Alias SaaSActivateResourceResponse

### Breaking Changes
  - Removed operation MonitoredSubscriptions.beginCreateorUpdate
  - Removed operation MonitoredSubscriptions.beginCreateorUpdateAndWait
  - Removed operation Monitors.update
  - Removed Interface AppServicesGetParameter
  - Removed Interface HostsGetParameter
  - Removed Interface MetricsRequestParameter
  - Removed Interface MetricsStatusRequestParameter
  - Removed Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Removed Interface SwitchBillingParameter
  - Parameter value of interface ConnectedPartnerResourcesListResponse is now required
  - Parameter value of interface LinkedResourceListResponse is now required
  - Parameter value of interface MonitoredSubscriptionPropertiesList is now required
  - Removed Type Alias BillingCycle
  - Removed Enum KnownBillingCycle

    
## 1.1.0 (2024-03-08)
    
### Features Added

  - Added operation group BillingInfo
  - Added operation group ConnectedPartnerResources
  - Added operation group MonitoredSubscriptions
  - Added operation Monitors.listLinkedResources
  - Added Interface BillingInfoGetOptionalParams
  - Added Interface BillingInfoResponse
  - Added Interface ConnectedPartnerResourceProperties
  - Added Interface ConnectedPartnerResourcesListFormat
  - Added Interface ConnectedPartnerResourcesListNextOptionalParams
  - Added Interface ConnectedPartnerResourcesListOptionalParams
  - Added Interface ConnectedPartnerResourcesListResponse
  - Added Interface LinkedResource
  - Added Interface LinkedResourceListResponse
  - Added Interface MarketplaceSaaSInfo
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
  - Added Interface MonitoringTagRulesProperties
  - Added Interface MonitorsListLinkedResourcesNextOptionalParams
  - Added Interface MonitorsListLinkedResourcesOptionalParams
  - Added Interface PartnerBillingEntity
  - Added Interface SubscriptionList
  - Added Type Alias BillingInfoGetResponse
  - Added Type Alias ConfigurationName
  - Added Type Alias ConnectedPartnerResourcesListNextResponse
  - Added Type Alias ConnectedPartnerResourcesListOperationResponse
  - Added Type Alias MonitoredSubscriptionsCreateorUpdateResponse
  - Added Type Alias MonitoredSubscriptionsDeleteResponse
  - Added Type Alias MonitoredSubscriptionsGetResponse
  - Added Type Alias MonitoredSubscriptionsListNextResponse
  - Added Type Alias MonitoredSubscriptionsListResponse
  - Added Type Alias MonitoredSubscriptionsUpdateResponse
  - Added Type Alias MonitorsListLinkedResourcesNextResponse
  - Added Type Alias MonitorsListLinkedResourcesResponse
  - Added Type Alias PatchOperation
  - Added Type Alias Status
  - Interface NewRelicMonitorResource has a new optional parameter saaSAzureSubscriptionStatus
  - Interface NewRelicMonitorResource has a new optional parameter subscriptionState
  - Added Enum KnownConfigurationName
  - Added Enum KnownPatchOperation
  - Added Enum KnownStatus
    
    
## 1.0.0 (2023-05-06)

The package of @azure/arm-newrelicobservability is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
