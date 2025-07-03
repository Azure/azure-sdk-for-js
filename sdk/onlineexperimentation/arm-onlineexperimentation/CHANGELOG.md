# Release History
    
## 1.0.0-beta.2 (2025-07-03)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added operation group PrivateEndpointConnectionsOperations
  - Added operation group PrivateLinkResourcesOperations
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateEndpointConnectionsUpdateOptionalParams
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PrivateLinkResourcesGetOptionalParams
  - Added Interface PrivateLinkResourcesListOptionalParams
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface ProxyResource
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PublicNetworkAccessType
  - Interface OnlineExperimentationWorkspaceProperties has a new optional parameter privateEndpointConnections
  - Interface OnlineExperimentationWorkspaceProperties has a new optional parameter publicNetworkAccess
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownPublicNetworkAccessType
  - Enum KnownVersions has a new value V20250801Preview

### Breaking Changes

  - Interface OnlineExperimentationClientOptionalParams no longer has parameter apiVersion
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, any> to any
  - Type of parameter properties of interface OnlineExperimentationWorkspacePatch is changed from {
        logAnalyticsWorkspaceResourceId?: string;
        logsExporterStorageAccountResourceId?: string;
        encryption?: ResourceEncryptionConfiguration;
    } to {
        logAnalyticsWorkspaceResourceId?: string;
        logsExporterStorageAccountResourceId?: string;
        encryption?: ResourceEncryptionConfiguration;
        publicNetworkAccess?: PublicNetworkAccessType;
    }
    
    
## 1.0.0-beta.1 (2025-06-04)

### Features Added

Initial release of the @azure/arm-onlineexperimentation package
