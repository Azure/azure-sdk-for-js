# Release History

## 2.0.0-beta.3 (2026-06-24)
Compared with version 1.1.0

### Features Added
  - Added operation group SaaSOperations
  - Added operation MonitoredSubscriptionsOperations.beginCreateOrUpdate
  - Added operation MonitoredSubscriptionsOperations.beginCreateOrUpdateAndWait
  - Added operation MonitoredSubscriptionsOperations.createOrUpdate
  - Added operation MonitoredSubscriptionsOperations.delete
  - Added operation MonitoredSubscriptionsOperations.update
  - Added operation MonitorsOperations.beginLinkSaaS
  - Added operation MonitorsOperations.beginLinkSaaSAndWait
  - Added operation MonitorsOperations.beginResubscribe
  - Added operation MonitorsOperations.beginResubscribeAndWait
  - Added operation MonitorsOperations.beginUpdate
  - Added operation MonitorsOperations.beginUpdateAndWait
  - Added operation MonitorsOperations.createOrUpdate
  - Added operation MonitorsOperations.delete
  - Added operation MonitorsOperations.latestLinkedSaaS
  - Added operation MonitorsOperations.linkSaaS
  - Added operation MonitorsOperations.refreshIngestionKey
  - Added operation MonitorsOperations.resubscribe
  - Added operation TagRulesOperations.createOrUpdate
  - Added operation TagRulesOperations.delete
  - Added Interface AccountProperties
  - Added Interface ActivateSaaSParameterRequest
  - Added Interface LatestLinkedSaaSResponse
  - Added Interface MonitoredSubscriptionsCreateOrUpdateOptionalParams
  - Added Interface MonitorProperties
  - Added Interface MonitorsLatestLinkedSaaSOptionalParams
  - Added Interface MonitorsLinkSaaSOptionalParams
  - Added Interface MonitorsRefreshIngestionKeyOptionalParams
  - Added Interface MonitorsResubscribeOptionalParams
  - Added Interface NewRelicMonitorResourceUpdateProperties
  - Added Interface OrganizationProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PlanDataProperties
  - Added Interface RestorePollerOptions
  - Added Interface ResubscribeProperties
  - Added Interface SaaSActivateResourceOptionalParams
  - Added Interface SaaSData
  - Added Interface SaaSResourceDetailsResponse
  - Added Interface SimplePollerLike
  - Added Interface TagRuleUpdateProperties
  - Interface MarketplaceSaaSInfo has a new optional parameter offerId
  - Interface MarketplaceSaaSInfo has a new optional parameter publisherId
  - Interface MonitoredSubscriptionProperties has a new optional parameter systemData
  - Interface MonitorsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface NewRelicMonitorResource has a new optional parameter saaSData
  - Interface NewRelicMonitorResourceUpdate has a new optional parameter saaSData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation MonitoredSubscriptions.beginCreateorUpdate
  - Removed operation MonitoredSubscriptions.beginCreateorUpdateAndWait
  - Operation MonitoredSubscriptions.beginDeleteAndWait has a new signature
  - Class NewRelicObservability no longer has parameter apiVersion
  - Class NewRelicObservability no longer has parameter subscriptionId
  - Removed Interface AccountsListResponse
  - Removed Interface AppServicesGetParameter
  - Removed Interface AppServicesListResponse
  - Removed Interface ConnectedPartnerResourcesListResponse
  - Removed Interface HostsGetParameter
  - Removed Interface LinkedResourceListResponse
  - Removed Interface MetricsRequestParameter
  - Removed Interface MetricsStatusRequestParameter
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface MonitoredSubscriptionPropertiesList
  - Removed Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Removed Interface OrganizationsListResponse
  - Removed Interface PlanDataListResponse
  - Removed Interface SwitchBillingParameter
  - Removed Interface VMHostsListResponse
  - Removed Type Alias BillingCycle
  - Removed Enum KnownBillingCycle

