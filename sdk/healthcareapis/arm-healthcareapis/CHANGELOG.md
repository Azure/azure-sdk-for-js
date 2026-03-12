# Release History

## 3.1.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.1.1 (2025-08-22)

### Other Changes

  - Other fixes

## 3.1.0 (2024-04-19)
    
### Features Added

  - Added Interface SmartIdentityProviderApplication
  - Added Interface SmartIdentityProviderConfiguration
  - Added Interface StorageConfiguration
  - Added Type Alias SmartDataActions
  - Interface DicomService has a new optional parameter enableDataPartitions
  - Interface DicomService has a new optional parameter storageConfiguration
  - Interface FhirServiceAuthenticationConfiguration has a new optional parameter smartIdentityProviders
  - Added Enum KnownSmartDataActions
    
    
## 3.0.0 (2023-12-07)
    
### Features Added

  - Added Interface CorsConfiguration
  - Added Interface Encryption
  - Added Interface EncryptionCustomerManagedKeyEncryption
  - Added Interface FhirServiceImportConfiguration
  - Added Interface ImplementationGuidesConfiguration
  - Added Interface ServiceImportConfigurationInfo
  - Interface DicomService has a new optional parameter corsConfiguration
  - Interface DicomService has a new optional parameter encryption
  - Interface DicomService has a new optional parameter eventState
  - Interface FhirService has a new optional parameter encryption
  - Interface FhirService has a new optional parameter implementationGuidesConfiguration
  - Interface FhirService has a new optional parameter importConfiguration
  - Interface MetricSpecification has a new optional parameter enableRegionalMdmAccount
  - Interface MetricSpecification has a new optional parameter isInternal
  - Interface MetricSpecification has a new optional parameter metricFilterPattern
  - Interface MetricSpecification has a new optional parameter resourceIdDimensionNameOverride
  - Interface MetricSpecification has a new optional parameter sourceMdmAccount
  - Interface ServiceCosmosDbConfigurationInfo has a new optional parameter crossTenantCmkApplicationId
  - Interface ServicesProperties has a new optional parameter importConfiguration

### Breaking Changes

  - Interface FhirService no longer has parameter accessPolicies
    
    
## 2.2.0 (2022-11-25)
    
### Features Added

  - Added Interface DicomService
  - Added Interface DicomServicePatchResource
  - Added Interface FhirService
  - Added Interface FhirServicePatchResource
  - Added Interface IotConnector
  - Added Interface IotConnectorPatchResource
  - Added Interface IotFhirDestination
  - Added Interface IotFhirDestinationProperties
  - Added Interface LocationBasedResource
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionDescription
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceDescription
  - Added Interface ServicesDescription
  - Added Interface TaggedResource
  - Added Interface Workspace
  - Added Interface WorkspacePatchResource
    
## 2.1.1 (2022-04-26)

### Features Added

  - Bug fix

## 2.1.0 (2022-03-22)
    
### Features Added

  - Added operation group DicomServices
  - Added operation group FhirDestinations
  - Added operation group FhirServices
  - Added operation group IotConnectorFhirDestination
  - Added operation group IotConnectors
  - Added operation group WorkspacePrivateEndpointConnections
  - Added operation group WorkspacePrivateLinkResources
  - Added operation group Workspaces
  - Added Interface DicomServiceAuthenticationConfiguration
  - Added Interface DicomServiceCollection
  - Added Interface DicomServicesCreateOrUpdateOptionalParams
  - Added Interface DicomServicesDeleteOptionalParams
  - Added Interface DicomServicesGetOptionalParams
  - Added Interface DicomServicesListByWorkspaceNextOptionalParams
  - Added Interface DicomServicesListByWorkspaceOptionalParams
  - Added Interface DicomServicesUpdateOptionalParams
  - Added Interface ErrorModel
  - Added Interface FhirDestinationsListByIotConnectorNextOptionalParams
  - Added Interface FhirDestinationsListByIotConnectorOptionalParams
  - Added Interface FhirServiceAccessPolicyEntry
  - Added Interface FhirServiceAcrConfiguration
  - Added Interface FhirServiceAuthenticationConfiguration
  - Added Interface FhirServiceCollection
  - Added Interface FhirServiceCorsConfiguration
  - Added Interface FhirServiceExportConfiguration
  - Added Interface FhirServicesCreateOrUpdateOptionalParams
  - Added Interface FhirServicesDeleteOptionalParams
  - Added Interface FhirServicesGetOptionalParams
  - Added Interface FhirServicesListByWorkspaceNextOptionalParams
  - Added Interface FhirServicesListByWorkspaceOptionalParams
  - Added Interface FhirServicesUpdateOptionalParams
  - Added Interface IotConnectorCollection
  - Added Interface IotConnectorFhirDestinationCreateOrUpdateOptionalParams
  - Added Interface IotConnectorFhirDestinationDeleteOptionalParams
  - Added Interface IotConnectorFhirDestinationGetOptionalParams
  - Added Interface IotConnectorsCreateOrUpdateOptionalParams
  - Added Interface IotConnectorsDeleteOptionalParams
  - Added Interface IotConnectorsGetOptionalParams
  - Added Interface IotConnectorsListByWorkspaceNextOptionalParams
  - Added Interface IotConnectorsListByWorkspaceOptionalParams
  - Added Interface IotConnectorsUpdateOptionalParams
  - Added Interface IotDestinationProperties
  - Added Interface IotEventHubIngestionEndpointConfiguration
  - Added Interface IotFhirDestinationCollection
  - Added Interface IotMappingProperties
  - Added Interface ListOperations
  - Added Interface LogSpecification
  - Added Interface MetricDimension
  - Added Interface MetricSpecification
  - Added Interface OperationDetail
  - Added Interface OperationProperties
  - Added Interface PrivateEndpointConnectionListResult
  - Added Interface ResourceCore
  - Added Interface ResourceTags
  - Added Interface ResourceVersionPolicyConfiguration
  - Added Interface ServiceManagedIdentity
  - Added Interface ServiceManagedIdentityIdentity
  - Added Interface ServiceOciArtifactEntry
  - Added Interface ServiceSpecification
  - Added Interface UserAssignedIdentity
  - Added Interface WorkspaceList
  - Added Interface WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams
  - Added Interface WorkspacePrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface WorkspacePrivateEndpointConnectionsGetOptionalParams
  - Added Interface WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams
  - Added Interface WorkspacePrivateLinkResourcesGetOptionalParams
  - Added Interface WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams
  - Added Interface WorkspaceProperties
  - Added Interface WorkspacesCreateOrUpdateOptionalParams
  - Added Interface WorkspacesDeleteOptionalParams
  - Added Interface WorkspacesGetOptionalParams
  - Added Interface WorkspacesListByResourceGroupNextOptionalParams
  - Added Interface WorkspacesListByResourceGroupOptionalParams
  - Added Interface WorkspacesListBySubscriptionNextOptionalParams
  - Added Interface WorkspacesListBySubscriptionOptionalParams
  - Added Interface WorkspacesUpdateOptionalParams
  - Added Type Alias ActionType
  - Added Type Alias DicomService
  - Added Type Alias DicomServicePatchResource
  - Added Type Alias DicomServicesCreateOrUpdateResponse
  - Added Type Alias DicomServicesGetResponse
  - Added Type Alias DicomServicesListByWorkspaceNextResponse
  - Added Type Alias DicomServicesListByWorkspaceResponse
  - Added Type Alias DicomServicesUpdateResponse
  - Added Type Alias FhirDestinationsListByIotConnectorNextResponse
  - Added Type Alias FhirDestinationsListByIotConnectorResponse
  - Added Type Alias FhirResourceVersionPolicy
  - Added Type Alias FhirService
  - Added Type Alias FhirServiceKind
  - Added Type Alias FhirServicePatchResource
  - Added Type Alias FhirServicesCreateOrUpdateResponse
  - Added Type Alias FhirServicesGetResponse
  - Added Type Alias FhirServicesListByWorkspaceNextResponse
  - Added Type Alias FhirServicesListByWorkspaceResponse
  - Added Type Alias FhirServicesUpdateResponse
  - Added Type Alias IotConnector
  - Added Type Alias IotConnectorFhirDestinationCreateOrUpdateResponse
  - Added Type Alias IotConnectorFhirDestinationGetResponse
  - Added Type Alias IotConnectorPatchResource
  - Added Type Alias IotConnectorsCreateOrUpdateResponse
  - Added Type Alias IotConnectorsGetResponse
  - Added Type Alias IotConnectorsListByWorkspaceNextResponse
  - Added Type Alias IotConnectorsListByWorkspaceResponse
  - Added Type Alias IotConnectorsUpdateResponse
  - Added Type Alias IotFhirDestination
  - Added Type Alias IotFhirDestinationProperties
  - Added Type Alias IotIdentityResolutionType
  - Added Type Alias LocationBasedResource
  - Added Type Alias ServiceEventState
  - Added Type Alias ServiceManagedIdentityType
  - Added Type Alias TaggedResource
  - Added Type Alias Workspace
  - Added Type Alias WorkspacePatchResource
  - Added Type Alias WorkspacePrivateEndpointConnectionsCreateOrUpdateResponse
  - Added Type Alias WorkspacePrivateEndpointConnectionsGetResponse
  - Added Type Alias WorkspacePrivateEndpointConnectionsListByWorkspaceResponse
  - Added Type Alias WorkspacePrivateLinkResourcesGetResponse
  - Added Type Alias WorkspacePrivateLinkResourcesListByWorkspaceResponse
  - Added Type Alias WorkspacesCreateOrUpdateResponse
  - Added Type Alias WorkspacesGetResponse
  - Added Type Alias WorkspacesListByResourceGroupNextResponse
  - Added Type Alias WorkspacesListByResourceGroupResponse
  - Added Type Alias WorkspacesListBySubscriptionNextResponse
  - Added Type Alias WorkspacesListBySubscriptionResponse
  - Added Type Alias WorkspacesUpdateResponse
  - Interface OperationResultsDescription has a new optional parameter endTime
  - Interface ServiceAcrConfigurationInfo has a new optional parameter ociArtifacts
  - Class HealthcareApisManagementClient has a new parameter dicomServices
  - Class HealthcareApisManagementClient has a new parameter fhirDestinations
  - Class HealthcareApisManagementClient has a new parameter fhirServices
  - Class HealthcareApisManagementClient has a new parameter iotConnectorFhirDestination
  - Class HealthcareApisManagementClient has a new parameter iotConnectors
  - Class HealthcareApisManagementClient has a new parameter workspacePrivateEndpointConnections
  - Class HealthcareApisManagementClient has a new parameter workspacePrivateLinkResources
  - Class HealthcareApisManagementClient has a new parameter workspaces
  - Added Enum KnownActionType
  - Added Enum KnownFhirResourceVersionPolicy
  - Added Enum KnownFhirServiceKind
  - Added Enum KnownIotIdentityResolutionType
  - Added Enum KnownServiceEventState
  - Added Enum KnownServiceManagedIdentityType
  - Enum KnownProvisioningState has a new value Moving
  - Enum KnownProvisioningState has a new value Suspended
  - Enum KnownProvisioningState has a new value SystemMaintenance
  - Enum KnownProvisioningState has a new value Warned
    
    
## 2.0.0 (2022-01-18)

The package of @azure/arm-healthcareapis is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
