# Release History

## 3.0.0 (2026-07-16)

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
  - Removed Interface AppServiceListResponse
  - Removed Interface LinkableEnvironmentListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface VMHostsListResponse
  - Type of parameter userAssignedIdentities of interface IdentityProperties is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to Record<string, UserAssignedIdentity>
  - Parameter clientId of interface UserAssignedIdentity is now optional
  - Parameter principalId of interface UserAssignedIdentity is now optional

## 3.0.0-beta.1 (2026-06-03)
Compared with version 2.0.0

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
  - Removed Interface AppServiceListResponse
  - Removed Interface LinkableEnvironmentListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface VMHostsListResponse
  - Type of parameter userAssignedIdentities of interface IdentityProperties is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to Record<string, UserAssignedIdentity>
  - Parameter clientId of interface UserAssignedIdentity is now optional
  - Parameter principalId of interface UserAssignedIdentity is now optional

    
## 2.0.0 (2023-08-15)
    
### Features Added

  - Added operation Monitors.getMarketplaceSaaSResourceDetails
  - Added operation Monitors.getMetricStatus
  - Added Interface MarketplaceSaaSResourceDetailsRequest
  - Added Interface MarketplaceSaaSResourceDetailsResponse
  - Added Interface MetricsStatusResponse
  - Added Interface MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams
  - Added Interface MonitorsGetMetricStatusOptionalParams
  - Added Type Alias MonitorsGetMarketplaceSaaSResourceDetailsResponse
  - Added Type Alias MonitorsGetMetricStatusResponse
  - Interface MetricRules has a new optional parameter sendingMetrics

### Breaking Changes

  - Removed operation Monitors.getAccountCredentials
  - Removed operation TagRules.update
  - Interface MonitorResourceUpdate no longer has parameter dynatraceEnvironmentProperties
  - Interface MonitorResourceUpdate no longer has parameter marketplaceSubscriptionStatus
  - Interface MonitorResourceUpdate no longer has parameter monitoringStatus
  - Interface MonitorResourceUpdate no longer has parameter planData
  - Interface MonitorResourceUpdate no longer has parameter userInfo
  - Parameter region of interface LinkableEnvironmentRequest is now required
  - Parameter tenantId of interface LinkableEnvironmentRequest is now required
  - Parameter userPrincipal of interface LinkableEnvironmentRequest is now required
  - Parameter userPrincipal of interface SSODetailsRequest is now required
    
## 1.0.1 (2023-01-09)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 1.0.0 (2022-09-19)

The package of @azure/arm-dynatrace is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
