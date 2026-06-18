# Release History

## 6.0.0-beta.4 (2026-06-18)
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

