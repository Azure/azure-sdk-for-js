# Release History

## 3.0.0 (2026-06-24)

### Features Added
  - Added operation group CreationSupportedOperations
  - Added operation group MonitoredSubscriptionsOperations
  - Added operation MonitorsOperations.beginUpgradePlan
  - Added operation MonitorsOperations.beginUpgradePlanAndWait
  - Added operation MonitorsOperations.createOrUpdate
  - Added operation MonitorsOperations.delete
  - Added operation MonitorsOperations.getAllConnectedResourcesCount
  - Added operation MonitorsOperations.manageAgentInstallation
  - Added operation MonitorsOperations.upgradePlan
  - Added operation SingleSignOnOperations.createOrUpdate
  - Added operation TagRulesOperations.createOrUpdate
  - Added operation TagRulesOperations.delete
  - Added Interface ConnectedResourcesCountResponse
  - Added Interface CreateResourceSupportedProperties
  - Added Interface CreateResourceSupportedResponse
  - Added Interface CreationSupportedGetOptionalParams
  - Added Interface CreationSupportedListOptionalParams
  - Added Interface LogStatusRequest
  - Added Interface ManageAgentInstallationRequest
  - Added Interface ManageAgentList
  - Added Interface ManagedServiceIdentity
  - Added Interface MarketplaceSubscriptionIdRequest
  - Added Interface MetricStatusRequest
  - Added Interface MonitoredSubscription
  - Added Interface MonitoredSubscriptionProperties
  - Added Interface MonitoredSubscriptionsCreateOrUpdateOptionalParams
  - Added Interface MonitoredSubscriptionsDeleteOptionalParams
  - Added Interface MonitoredSubscriptionsGetOptionalParams
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface MonitoringTagRulesProperties
  - Added Interface MonitorProperties
  - Added Interface MonitorsGetAllConnectedResourcesCountOptionalParams
  - Added Interface MonitorsManageAgentInstallationOptionalParams
  - Added Interface MonitorsUpgradePlanOptionalParams
  - Added Interface MonitorUpdateProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SubscriptionList
  - Added Interface UpgradePlanRequest
  - Interface AccountInfo has a new optional parameter companyName
  - Interface MarketplaceSaaSResourceDetailsResponse has a new optional parameter marketplaceSaaSResourceName
  - Interface MonitorResource has a new optional parameter marketplaceSaasAutoRenew
  - Interface MonitorResourceUpdate has a new optional parameter identity
  - Interface MonitorResourceUpdate has a new optional parameter properties
  - Interface MonitorsGetMetricStatusOptionalParams has a new optional parameter request
  - Interface MonitorsListMonitoredResourcesOptionalParams has a new optional parameter request
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias Action
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias MarketplaceSaasAutoRenew
  - Added Type Alias Status
  - Added Type Alias SubscriptionListOperation
  - Added Enum AzureClouds
  - Added Enum KnownAction
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownMarketplaceSaasAutoRenew
  - Added Enum KnownStatus
  - Added Enum KnownSubscriptionListOperation
  - Added Enum KnownVersions
  - Enum KnownMarketplaceSubscriptionStatus has a new value Unsubscribed
  - Enum KnownMonitoringType has a new value Discovery

### Breaking Changes
  - Operation Monitors.beginCreateOrUpdate has a new signature
  - Operation Monitors.beginCreateOrUpdateAndWait has a new signature
  - Operation Monitors.get has a new signature
  - Operation Monitors.update has a new signature
  - Class DynatraceObservability no longer has parameter apiVersion
  - Class DynatraceObservability no longer has parameter subscriptionId
  - Removed Interface AppServiceListResponse
  - Removed Interface LinkableEnvironmentListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface VMHostsListResponse
  - Type of parameter userAssignedIdentities of interface IdentityProperties is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to Record<string, UserAssignedIdentity>
  - Parameter clientId of interface UserAssignedIdentity is now optional
  - Parameter principalId of interface UserAssignedIdentity is now optional

