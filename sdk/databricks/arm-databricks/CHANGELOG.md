# Release History

## 4.0.0-beta.1 (2026-06-08)
Compared with version 3.0.0

### Features Added
  - Added operation AccessConnectorsOperations.createOrUpdate
  - Added operation AccessConnectorsOperations.delete
  - Added operation AccessConnectorsOperations.update
  - Added operation PrivateEndpointConnectionsOperations.create
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation VNetPeeringOperations.createOrUpdate
  - Added operation VNetPeeringOperations.delete
  - Added operation WorkspacesOperations.createOrUpdate
  - Added operation WorkspacesOperations.delete
  - Added operation WorkspacesOperations.update
  - Class AzureDatabricksManagementClient has a new constructor "constructor(credential: TokenCredential, options?: AzureDatabricksManagementClientOptionalParams);"
  - Class AzureDatabricksManagementClient has a new constructor "constructor(credential: TokenCredential, subscriptionId: string, options?: AzureDatabricksManagementClientOptionalParams);"
  - Added Interface AutomaticClusterUpdateDefinition
  - Added Interface ComplianceSecurityProfileDefinition
  - Added Interface DefaultCatalogProperties
  - Added Interface EnhancedSecurityComplianceDefinition
  - Added Interface EnhancedSecurityMonitoringDefinition
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface VirtualNetworkPeeringPropertiesFormat
  - Added Interface WorkspaceNoPublicIPBooleanParameter
  - Added Interface WorkspaceProperties
  - Added Interface WorkspacePropertiesAccessConnector
  - Interface AccessConnectorProperties has a new optional parameter referedBy
  - Interface GroupIdInformation has a new optional parameter systemData
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Interface VirtualNetworkPeering has a new optional parameter systemData
  - Interface Workspace has a new optional parameter accessConnector
  - Interface Workspace has a new optional parameter defaultCatalog
  - Interface Workspace has a new optional parameter defaultStorageFirewall
  - Interface Workspace has a new optional parameter enhancedSecurityCompliance
  - Interface Workspace has a new optional parameter isUcEnabled
  - Added Type Alias AutomaticClusterUpdateValue
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ComplianceSecurityProfileValue
  - Added Type Alias ComputeMode
  - Added Type Alias DefaultStorageFirewall
  - Added Type Alias EnhancedSecurityMonitoringValue
  - Added Type Alias IdentityType
  - Added Type Alias InitialType
  - Added Enum AzureClouds
  - Added Enum KnownAutomaticClusterUpdateValue
  - Added Enum KnownComplianceSecurityProfileValue
  - Added Enum KnownComputeMode
  - Added Enum KnownDefaultStorageFirewall
  - Added Enum KnownEnhancedSecurityMonitoringValue
  - Added Enum KnownIdentityType
  - Added Enum KnownInitialType
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Workspaces.beginCreateOrUpdate has a new signature
  - Operation Workspaces.beginCreateOrUpdateAndWait has a new signature
  - Operation Workspaces.beginUpdateAndWait has a new signature
  - Operation Workspaces.get has a new signature
  - Class AzureDatabricksManagementClient has a new signature
  - Removed Interface PrivateEndpointConnectionsList
  - Removed Interface PrivateLinkResourcesList
  - Removed Interface VirtualNetworkPeeringList
  - Interface Workspace has a new required parameter computeMode
  - Parameter managedResourceGroupId of interface Workspace is now optional

    
## 3.0.0 (2023-11-02)

The package of @azure/arm-databricks is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
