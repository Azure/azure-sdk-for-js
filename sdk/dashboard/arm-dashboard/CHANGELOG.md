# Release History

## 1.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0 (2023-11-10)
    
### Features Added

  - Added operation group ManagedPrivateEndpoints
  - Added operation Grafana.checkEnterpriseDetails
  - Added operation Grafana.fetchAvailablePlugins
  - Added Interface EnterpriseConfigurations
  - Added Interface EnterpriseDetails
  - Added Interface GrafanaAvailablePlugin
  - Added Interface GrafanaAvailablePluginListResponse
  - Added Interface GrafanaCheckEnterpriseDetailsOptionalParams
  - Added Interface GrafanaConfigurations
  - Added Interface GrafanaCreateHeaders
  - Added Interface GrafanaDeleteHeaders
  - Added Interface GrafanaFetchAvailablePluginsOptionalParams
  - Added Interface GrafanaPlugin
  - Added Interface GrafanaUpdateHeaders
  - Added Interface ManagedPrivateEndpointConnectionState
  - Added Interface ManagedPrivateEndpointModel
  - Added Interface ManagedPrivateEndpointModelListResponse
  - Added Interface ManagedPrivateEndpointsCreateHeaders
  - Added Interface ManagedPrivateEndpointsCreateOptionalParams
  - Added Interface ManagedPrivateEndpointsDeleteHeaders
  - Added Interface ManagedPrivateEndpointsDeleteOptionalParams
  - Added Interface ManagedPrivateEndpointsGetOptionalParams
  - Added Interface ManagedPrivateEndpointsListNextOptionalParams
  - Added Interface ManagedPrivateEndpointsListOptionalParams
  - Added Interface ManagedPrivateEndpointsRefreshHeaders
  - Added Interface ManagedPrivateEndpointsRefreshOptionalParams
  - Added Interface ManagedPrivateEndpointsUpdateHeaders
  - Added Interface ManagedPrivateEndpointsUpdateOptionalParams
  - Added Interface ManagedPrivateEndpointUpdateParameters
  - Added Interface MarketplaceTrialQuota
  - Added Interface PrivateEndpointConnectionsApproveHeaders
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface SaasSubscriptionDetails
  - Added Interface Smtp
  - Added Interface SubscriptionTerm
  - Added Interface TrackedResource
  - Added Type Alias AvailablePromotion
  - Added Type Alias GrafanaCheckEnterpriseDetailsResponse
  - Added Type Alias GrafanaFetchAvailablePluginsResponse
  - Added Type Alias ManagedPrivateEndpointConnectionStatus
  - Added Type Alias ManagedPrivateEndpointsCreateResponse
  - Added Type Alias ManagedPrivateEndpointsGetResponse
  - Added Type Alias ManagedPrivateEndpointsListNextResponse
  - Added Type Alias ManagedPrivateEndpointsListResponse
  - Added Type Alias ManagedPrivateEndpointsUpdateResponse
  - Added Type Alias MarketplaceAutoRenew
  - Added Type Alias PrivateEndpointConnectionsDeleteResponse
  - Added Type Alias StartTLSPolicy
  - Interface ManagedGrafanaProperties has a new optional parameter enterpriseConfigurations
  - Interface ManagedGrafanaProperties has a new optional parameter grafanaConfigurations
  - Interface ManagedGrafanaProperties has a new optional parameter grafanaMajorVersion
  - Interface ManagedGrafanaProperties has a new optional parameter grafanaPlugins
  - Interface ManagedGrafanaPropertiesUpdateParameters has a new optional parameter enterpriseConfigurations
  - Interface ManagedGrafanaPropertiesUpdateParameters has a new optional parameter grafanaConfigurations
  - Interface ManagedGrafanaPropertiesUpdateParameters has a new optional parameter grafanaMajorVersion
  - Interface ManagedGrafanaPropertiesUpdateParameters has a new optional parameter grafanaPlugins
  - Interface ManagedGrafanaUpdateParameters has a new optional parameter sku
  - Add parameters of PrivateEndpointConnectionsApproveHeaders to TypeAlias PrivateEndpointConnectionsApproveResponse
  - Added Enum KnownAvailablePromotion
  - Added Enum KnownManagedPrivateEndpointConnectionStatus
  - Added Enum KnownMarketplaceAutoRenew
  - Added Enum KnownStartTLSPolicy
    
## 1.0.1 (2023-01-03)

### Features Added

 -  Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 1.0.0 (2022-08-15)

The package of @azure/arm-dashboard is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
