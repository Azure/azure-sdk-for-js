# Release History

## 2.0.0-beta.1 (2025-07-25)
Compared with version 1.1.0

### Features Added
  - Added operation group IntegrationFabricsOperations
  - Added operation group ManagedDashboardsOperations
  - Added operation GrafanaOperations.create
  - Added operation GrafanaOperations.delete
  - Added operation ManagedPrivateEndpointsOperations.create
  - Added operation ManagedPrivateEndpointsOperations.delete
  - Added operation ManagedPrivateEndpointsOperations.refresh
  - Added operation ManagedPrivateEndpointsOperations.update
  - Added operation PrivateEndpointConnectionsOperations.approve
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added Interface IntegrationFabric
  - Added Interface IntegrationFabricProperties
  - Added Interface IntegrationFabricPropertiesUpdateParameters
  - Added Interface IntegrationFabricsCreateOptionalParams
  - Added Interface IntegrationFabricsDeleteOptionalParams
  - Added Interface IntegrationFabricsGetOptionalParams
  - Added Interface IntegrationFabricsListOptionalParams
  - Added Interface IntegrationFabricsUpdateOptionalParams
  - Added Interface IntegrationFabricUpdateParameters
  - Added Interface ManagedDashboard
  - Added Interface ManagedDashboardProperties
  - Added Interface ManagedDashboardsCreateOptionalParams
  - Added Interface ManagedDashboardsDeleteOptionalParams
  - Added Interface ManagedDashboardsGetOptionalParams
  - Added Interface ManagedDashboardsListBySubscriptionOptionalParams
  - Added Interface ManagedDashboardsListOptionalParams
  - Added Interface ManagedDashboardsUpdateOptionalParams
  - Added Interface ManagedDashboardUpdateParameters
  - Added Interface ManagedPrivateEndpointModelProperties
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ProxyResource
  - Added Interface Security
  - Added Interface Snapshots
  - Added Interface UnifiedAlertingScreenshots
  - Added Interface Users
  - Interface DashboardManagementClientOptionalParams has a new optional parameter cloudSetting
  - Interface GrafanaConfigurations has a new optional parameter security
  - Interface GrafanaConfigurations has a new optional parameter snapshots
  - Interface GrafanaConfigurations has a new optional parameter unifiedAlertingScreenshots
  - Interface GrafanaConfigurations has a new optional parameter users
  - Interface GrafanaUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface ManagedPrivateEndpointModel has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter properties
  - Interface PrivateLinkResource has a new optional parameter properties
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Grafana.beginCreate
  - Removed operation Grafana.beginCreateAndWait
  - Removed operation Grafana.beginDelete
  - Removed operation Grafana.beginDeleteAndWait
  - Removed operation ManagedPrivateEndpoints.beginCreate
  - Removed operation ManagedPrivateEndpoints.beginCreateAndWait
  - Removed operation ManagedPrivateEndpoints.beginDelete
  - Removed operation ManagedPrivateEndpoints.beginDeleteAndWait
  - Removed operation ManagedPrivateEndpoints.beginRefresh
  - Removed operation ManagedPrivateEndpoints.beginRefreshAndWait
  - Removed operation ManagedPrivateEndpoints.beginUpdate
  - Removed operation ManagedPrivateEndpoints.beginUpdateAndWait
  - Removed operation PrivateEndpointConnections.beginApprove
  - Removed operation PrivateEndpointConnections.beginApproveAndWait
  - Removed operation PrivateEndpointConnections.beginDelete
  - Removed operation PrivateEndpointConnections.beginDeleteAndWait
  - Class DashboardManagementClient no longer has parameter $host
  - Class DashboardManagementClient no longer has parameter apiVersion
  - Class DashboardManagementClient no longer has parameter subscriptionId
  - Removed Interface GrafanaCreateHeaders
  - Removed Interface GrafanaDeleteHeaders
  - Removed Interface GrafanaUpdateHeaders
  - Removed Interface ManagedGrafanaListResponse
  - Removed Interface ManagedPrivateEndpointModelListResponse
  - Removed Interface ManagedPrivateEndpointsCreateHeaders
  - Removed Interface ManagedPrivateEndpointsDeleteHeaders
  - Removed Interface ManagedPrivateEndpointsRefreshHeaders
  - Removed Interface ManagedPrivateEndpointsUpdateHeaders
  - Removed Interface OperationListResult
  - Removed Interface PrivateEndpointConnectionListResult
  - Removed Interface PrivateEndpointConnectionsApproveHeaders
  - Removed Interface PrivateEndpointConnectionsDeleteHeaders
  - Removed Interface PrivateLinkResourceListResult
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to any
  - Interface DashboardManagementClientOptionalParams no longer has parameter $host
  - Interface DashboardManagementClientOptionalParams no longer has parameter endpoint
  - Interface GrafanaCreateOptionalParams no longer has parameter resumeFrom
  - Interface GrafanaDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ManagedPrivateEndpointModel no longer has parameter connectionState
  - Interface ManagedPrivateEndpointModel no longer has parameter groupIds
  - Interface ManagedPrivateEndpointModel no longer has parameter privateLinkResourceId
  - Interface ManagedPrivateEndpointModel no longer has parameter privateLinkResourceRegion
  - Interface ManagedPrivateEndpointModel no longer has parameter privateLinkServicePrivateIP
  - Interface ManagedPrivateEndpointModel no longer has parameter privateLinkServiceUrl
  - Interface ManagedPrivateEndpointModel no longer has parameter provisioningState
  - Interface ManagedPrivateEndpointModel no longer has parameter requestMessage
  - Interface ManagedPrivateEndpointsCreateOptionalParams no longer has parameter resumeFrom
  - Interface ManagedPrivateEndpointsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ManagedPrivateEndpointsRefreshOptionalParams no longer has parameter resumeFrom
  - Interface ManagedPrivateEndpointsUpdateOptionalParams no longer has parameter resumeFrom
  - Interface PrivateEndpointConnection no longer has parameter groupIds
  - Interface PrivateEndpointConnection no longer has parameter privateEndpoint
  - Interface PrivateEndpointConnection no longer has parameter privateLinkServiceConnectionState
  - Interface PrivateEndpointConnection no longer has parameter provisioningState
  - Interface PrivateEndpointConnectionsApproveOptionalParams no longer has parameter resumeFrom
  - Interface PrivateEndpointConnectionsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface PrivateLinkResource no longer has parameter groupId
  - Interface PrivateLinkResource no longer has parameter provisioningState
  - Interface PrivateLinkResource no longer has parameter requiredMembers
  - Interface PrivateLinkResource no longer has parameter requiredZoneNames
  - Removed Type Alias GrafanaCheckEnterpriseDetailsResponse
  - Removed Type Alias GrafanaCreateResponse
  - Removed Type Alias GrafanaFetchAvailablePluginsResponse
  - Removed Type Alias GrafanaGetResponse
  - Removed Type Alias GrafanaListByResourceGroupNextResponse
  - Removed Type Alias GrafanaListByResourceGroupResponse
  - Removed Type Alias GrafanaListNextResponse
  - Removed Type Alias GrafanaListResponse
  - Removed Type Alias GrafanaUpdateResponse
  - Removed Type Alias ManagedPrivateEndpointsCreateResponse
  - Removed Type Alias ManagedPrivateEndpointsGetResponse
  - Removed Type Alias ManagedPrivateEndpointsListNextResponse
  - Removed Type Alias ManagedPrivateEndpointsListResponse
  - Removed Type Alias ManagedPrivateEndpointsUpdateResponse
  - Removed Type Alias OperationsListNextResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias PrivateEndpointConnectionsApproveResponse
  - Removed Type Alias PrivateEndpointConnectionsDeleteResponse
  - Removed Type Alias PrivateEndpointConnectionsGetResponse
  - Removed Type Alias PrivateEndpointConnectionsListNextResponse
  - Removed Type Alias PrivateEndpointConnectionsListResponse
  - Removed Type Alias PrivateLinkResourcesGetResponse
  - Removed Type Alias PrivateLinkResourcesListNextResponse
  - Removed Type Alias PrivateLinkResourcesListResponse
  - Removed function getContinuationToken

    
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
