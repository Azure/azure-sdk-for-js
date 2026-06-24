# Release History

## 4.0.0-beta.2 (2026-06-24)
Compared with version 3.1.0

### Features Added
  - Added operation DicomServicesOperations.createOrUpdate
  - Added operation DicomServicesOperations.delete
  - Added operation DicomServicesOperations.update
  - Added operation FhirServicesOperations.createOrUpdate
  - Added operation FhirServicesOperations.delete
  - Added operation FhirServicesOperations.update
  - Added operation IotConnectorFhirDestinationOperations.createOrUpdate
  - Added operation IotConnectorFhirDestinationOperations.delete
  - Added operation IotConnectorsOperations.createOrUpdate
  - Added operation IotConnectorsOperations.delete
  - Added operation IotConnectorsOperations.update
  - Added operation PrivateEndpointConnectionsOperations.createOrUpdate
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation ServicesOperations.createOrUpdate
  - Added operation ServicesOperations.delete
  - Added operation ServicesOperations.update
  - Added operation WorkspacePrivateEndpointConnectionsOperations.createOrUpdate
  - Added operation WorkspacePrivateEndpointConnectionsOperations.delete
  - Added operation WorkspacesOperations.createOrUpdate
  - Added operation WorkspacesOperations.delete
  - Added operation WorkspacesOperations.update
  - Class HealthcareApisManagementClient has a new constructor "constructor(credential: TokenCredential, options?: HealthcareApisManagementClientOptionalParams);"
  - Added Interface DicomServiceProperties
  - Added Interface FhirServiceProperties
  - Added Interface IotConnectorProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface ServicesPropertiesUpdateParameters
  - Added Interface SimplePollerLike
  - Added Interface StorageIndexingConfiguration
  - Added Interface TrackedResource
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResourceListResultDescription has a new optional parameter nextLink
  - Interface Resource has a new optional parameter systemData
  - Interface StorageConfiguration has a new optional parameter storageIndexingConfiguration
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Class HealthcareApisManagementClient no longer has parameter apiVersion
  - Class HealthcareApisManagementClient no longer has parameter subscriptionId
  - Removed Interface DicomServiceCollection
  - Removed Interface FhirServiceCollection
  - Removed Interface IotConnectorCollection
  - Removed Interface IotFhirDestinationCollection
  - Removed Interface ListOperations
  - Removed Interface LocationBasedResource
  - Removed Interface PrivateEndpointConnectionListResultDescription
  - Removed Interface PrivateLinkResource
  - Removed Interface ResourceCore
  - Removed Interface ServiceManagedIdentity
  - Removed Interface ServicesResource
  - Removed Interface TaggedResource
  - Removed Interface WorkspaceList

