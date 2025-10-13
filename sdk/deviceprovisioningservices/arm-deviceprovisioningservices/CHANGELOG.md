# Release History

## 6.0.0-beta.3 (2025-10-13)
Compared with version 5.1.0

### Features Added
  - Added operation IotDpsResourceOperations.createOrUpdate
  - Added operation IotDpsResourceOperations.createOrUpdatePrivateEndpointConnection
  - Added operation IotDpsResourceOperations.delete
  - Added operation IotDpsResourceOperations.deletePrivateEndpointConnection
  - Added operation IotDpsResourceOperations.update
  - Added Interface DeviceRegistryNamespaceDescription
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface ManagedServiceIdentity
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface TrackedResource
  - Added Interface UserAssignedIdentity
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter certificateName
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter certificateName
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter certificateName
  - Interface GroupIdInformation has a new optional parameter systemData
  - Interface IotDpsPropertiesDescription has a new optional parameter deviceRegistryNamespace
  - Interface IotDpsPropertiesDescription has a new optional parameter portalOperationsHostName
  - Interface ProvisioningServiceDescription has a new optional parameter identity
  - Interface ProvisioningServiceDescription has a new optional parameter resourcegroup
  - Interface ProvisioningServiceDescription has a new optional parameter subscriptionid
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DeviceRegistryNamespaceAuthenticationType
  - Added Type Alias ManagedServiceIdentityType
  - Added Enum AzureClouds
  - Added Enum KnownDeviceRegistryNamespaceAuthenticationType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation IotDpsResource.beginCreateOrUpdate
  - Removed operation IotDpsResource.beginCreateOrUpdateAndWait
  - Removed operation IotDpsResource.beginCreateOrUpdatePrivateEndpointConnection
  - Removed operation IotDpsResource.beginCreateOrUpdatePrivateEndpointConnectionAndWait
  - Removed operation IotDpsResource.beginDelete
  - Removed operation IotDpsResource.beginDeleteAndWait
  - Removed operation IotDpsResource.beginDeletePrivateEndpointConnection
  - Removed operation IotDpsResource.beginDeletePrivateEndpointConnectionAndWait
  - Removed operation IotDpsResource.beginUpdate
  - Removed operation IotDpsResource.beginUpdateAndWait
  - Operation DpsCertificate.list has a new signature
  - Operation IotDpsResource.listPrivateLinkResources has a new signature
  - Removed Interface CertificateBodyDescription
  - Removed Interface CertificateListDescription
  - Removed Interface OperationDisplay
  - Removed Interface PrivateLinkResources
  - Type of parameter code of interface ErrorDetails is changed from string to number
  - Interface DpsCertificateDeleteOptionalParams no longer has parameter certificateName1
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams no longer has parameter certificateName1
  - Interface DpsCertificateVerifyCertificateOptionalParams no longer has parameter certificateName1
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags

    
## 6.0.0-beta.1 (2023-06-07)
    
### Features Added

  - Added Interface ManagedServiceIdentity
  - Added Interface UserAssignedIdentity
  - Added Type Alias ManagedServiceIdentityType
  - Interface IotDpsPropertiesDescription has a new optional parameter portalOperationsHostName
  - Interface ProvisioningServiceDescription has a new optional parameter identity
  - Interface Resource has a new optional parameter resourcegroup
  - Interface Resource has a new optional parameter subscriptionid
  - Added Enum KnownManagedServiceIdentityType

### Breaking Changes

  - Type of parameter code of interface ErrorDetails is changed from string to number
    
    
## 5.1.0 (2023-01-05)
    
### Features Added

  - Added Interface ProvisioningServiceDescription
  - Added function getContinuationToken
    
## 5.0.1 (2022-04-27)
    
### Features Added

  -  Bug fix
    
## 5.0.0 (2022-04-25)
    
### Features Added

  - Added Interface ErrorMessage
  - Added Interface IotDpsResourceDeletePrivateEndpointConnectionHeaders

### Breaking Changes

  - Operation DpsCertificate.createOrUpdate has a new signature
    
    
## 4.1.1 (2022-04-18)

**features**

  - bug fix

## 4.1.0 (2022-01-24)
    
### Features Added

  - Added Interface SystemData
  - Added Type Alias CreatedByType
  - Interface CertificateResponse has a new optional parameter systemData
  - Interface IotDpsPropertiesDescription has a new optional parameter enableDataResidency
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Type Alias ProvisioningServiceDescription has a new parameter systemData
  - Added Enum KnownCreatedByType
    
    
## 4.0.0 (2022-01-12)

The package of @azure/arm-deviceprovisioningservices is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
