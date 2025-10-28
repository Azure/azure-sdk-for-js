# Release History

## 2.0.0-beta.1 (2025-07-25)
Compared with version 1.1.0

### Features Added
  - **New Operation Groups**: Added support for Integration Fabrics and Managed Dashboards management
  - **Simplified Long-Running Operations (LROs)**: 
    - Replaced complex `begin*` and `begin*AndWait` patterns with unified operations for Grafana, Managed Private Endpoints, and Private Endpoint Connections
    - Operations now handle both async and poller usage patterns seamlessly
  - **Enhanced Grafana Configuration**: 
    - Extended configuration options with security settings, snapshots management, and unified alerting screenshots
    - Added user management capabilities and flexible update intervals
  - **Multi-Cloud Support**: Added support for different Azure cloud environments through new cloud settings and `AzureSupportedClouds` type
  - **Improved Private Endpoint Management**: 
    - Enhanced private endpoint operations with create, delete, refresh, and update capabilities
    - Streamlined private endpoint connection approval and management
  - **Property Restructuring**: Resource interfaces now use structured `properties` objects for better organization and type safety

### Breaking Changes
  - **Simplified LRO Pattern**: Removed all `begin*` and `begin*AndWait` operations across Grafana, Managed Private Endpoints, and Private Endpoint Connections in favor of unified operations that handle both async and poller usage patterns
  - **Property Restructuring**: Resource interfaces now use structured `properties` objects instead of direct property access:
    - `ManagedPrivateEndpointModel`, `PrivateEndpointConnection`, and `PrivateLinkResource` interfaces now encapsulate their specific properties within a `properties` object
    - This provides better type safety and cleaner API design
  - **Client Constructor Changes**: 
    - `DashboardManagementClient` class has updated constructor signature
    - Removed legacy `$host`, `endpoint`, `apiVersion`, and `subscriptionId` parameters from client constructor options
  - **LRO Options Simplified**: Removed `resumeFrom` parameter from all operation optional parameters as this is now handled automatically by the unified LRO pattern
  - **Response Interface Cleanup**: Removed operation-specific response interfaces and headers in favor of standardized response patterns
  - **Type Safety Improvements**: Enhanced error handling with `ErrorAdditionalInfo.info` now properly typed as `any` instead of `Record<string, unknown>`
  - **Removed Utilities**: Removed `getContinuationToken` function as pagination is now handled through improved iterator patterns

    
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
