# Release History

## 4.0.0-beta.1 (2026-06-01)
Compared with version 3.1.0

### Features Added
  - Added operation group BillingInfoOperations
  - Added operation group DatadogMonitorResourcesOperations
  - Added operation group OrganizationsOperations
  - Added operation group SaaSOperationGroupOperations
  - Added operation MonitoredSubscriptionsOperations.createorUpdate
  - Added operation MonitoredSubscriptionsOperations.delete
  - Added operation MonitoredSubscriptionsOperations.update
  - Added operation MonitorsOperations.create
  - Added operation MonitorsOperations.delete
  - Added operation MonitorsOperations.getDefaultApplicationKey
  - Added operation MonitorsOperations.manageSreAgentConnectors
  - Added operation MonitorsOperations.update
  - Added operation SingleSignOnConfigurationsOperations.createOrUpdate
  - Added Interface ActivateSaaSParameterRequest
  - Added Interface AgentRules
  - Added Interface BillingInfoGetOptionalParams
  - Added Interface BillingInfoResponse
  - Added Interface DatadogApplicationKey
  - Added Interface DatadogMonitorResourcesLatestLinkedSaaSOptionalParams
  - Added Interface DatadogMonitorResourcesLinkSaaSOptionalParams
  - Added Interface LatestLinkedSaaSResponse
  - Added Interface MarketplaceOfferDetails
  - Added Interface MarketplaceSaaSInfo
  - Added Interface MonitorsGetDefaultApplicationKeyOptionalParams
  - Added Interface MonitorsManageSreAgentConnectorsOptionalParams
  - Added Interface OrganizationsResubscribeOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PartnerBillingEntity
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface ResubscribeProperties
  - Added Interface SaaSData
  - Added Interface SaaSOperationGroupActivateResourceOptionalParams
  - Added Interface SaaSResourceDetailsResponse
  - Added Interface SreAgentConfiguration
  - Added Interface SreAgentConfigurationListResponse
  - Added Interface SreAgentConnectorRequest
  - Added Interface TrackedResource
  - Interface DatadogOrganizationProperties has a new optional parameter resourceCollection
  - Interface LinkedResource has a new optional parameter location
  - Interface MonitoredSubscriptionProperties has a new optional parameter systemData
  - Interface MonitoringTagRulesProperties has a new optional parameter agentRules
  - Interface MonitoringTagRulesProperties has a new optional parameter customMetrics
  - Interface MonitorProperties has a new optional parameter marketplaceOfferDetails
  - Interface MonitorProperties has a new optional parameter saaSData
  - Interface MonitorProperties has a new optional parameter sreAgentConfiguration
  - Interface MonitorUpdateProperties has a new optional parameter resourceCollection
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ConnectorAction
  - Added Enum AzureClouds
  - Added Enum KnownConnectorAction
  - Added Enum KnownVersions

### Breaking Changes
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
  - Removed operation SingleSignOnConfigurations.beginCreateOrUpdate
  - Removed operation SingleSignOnConfigurations.beginCreateOrUpdateAndWait
  - Removed Interface CreateResourceSupportedResponseList
  - Removed Interface DatadogAgreementResourceListResponse
  - Removed Interface DatadogApiKeyListResponse
  - Removed Interface DatadogHostListResponse
  - Removed Interface DatadogMonitorResourceListResponse
  - Removed Interface DatadogSingleSignOnResourceListResponse
  - Removed Interface LinkedResourceListResponse
  - Removed Interface MonitoredResourceListResponse
  - Removed Interface MonitoredSubscriptionPropertiesList
  - Removed Interface MonitoringTagRulesListResponse

    
## 3.1.0 (2023-10-09)
    
### Features Added

  - Added operation group CreationSupported
  - Added operation group MonitoredSubscriptions
  - Added Interface CreateResourceSupportedProperties
  - Added Interface CreateResourceSupportedResponse
  - Added Interface CreateResourceSupportedResponseList
  - Added Interface CreationSupportedGetOptionalParams
  - Added Interface CreationSupportedListOptionalParams
  - Added Interface MonitoredSubscription
  - Added Interface MonitoredSubscriptionProperties
  - Added Interface MonitoredSubscriptionPropertiesList
  - Added Interface MonitoredSubscriptionsCreateorUpdateOptionalParams
  - Added Interface MonitoredSubscriptionsDeleteOptionalParams
  - Added Interface MonitoredSubscriptionsGetOptionalParams
  - Added Interface MonitoredSubscriptionsListOptionalParams
  - Added Interface MonitoredSubscriptionsUpdateOptionalParams
  - Added Interface SubscriptionList
  - Added Type Alias CreationSupportedGetResponse
  - Added Type Alias CreationSupportedListResponse
  - Added Type Alias MonitoredSubscriptionsCreateorUpdateResponse
  - Added Type Alias MonitoredSubscriptionsGetResponse
  - Added Type Alias MonitoredSubscriptionsListResponse
  - Added Type Alias MonitoredSubscriptionsUpdateResponse
  - Added Type Alias Operation
  - Added Type Alias Status
  - Interface DatadogOrganizationProperties has a new optional parameter cspm
  - Interface MonitoringTagRulesProperties has a new optional parameter automuting
  - Interface MonitorUpdateProperties has a new optional parameter cspm
  - Added Enum KnownOperation
  - Added Enum KnownStatus
    
## 3.0.2 (2022-11-21)

### Features Added

 -  Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed
 
  - A series of small bug fixs relevant to authentication and apiVersion policy

## 3.0.1 (2022-04-18)

**features**

  - bug fix

## 3.0.0 (2022-01-12)

The package of @azure/arm-datadog is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
