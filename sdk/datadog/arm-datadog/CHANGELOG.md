# Release History

## 4.0.0-beta.2 (2026-06-24)
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
  - Class MicrosoftDatadogClient has a new constructor "constructor(credential: TokenCredential, options?: MicrosoftDatadogClientOptionalParams);"
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
  - Added Interface SimplePollerLike
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
  - Class MicrosoftDatadogClient no longer has parameter apiVersion
  - Class MicrosoftDatadogClient no longer has parameter subscriptionId
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

