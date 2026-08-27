# Release History

## 6.0.0 (2026-08-27)

### Features Added
  - Added operation IotDpsResourceOperations.createOrUpdate
  - Added operation IotDpsResourceOperations.createOrUpdatePrivateEndpointConnection
  - Added operation IotDpsResourceOperations.delete
  - Added operation IotDpsResourceOperations.deletePrivateEndpointConnection
  - Added operation IotDpsResourceOperations.update
  - Class IotDpsClient has a new constructor "constructor(credential: TokenCredential, options?: IotDpsClientOptionalParams);"
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
  - Interface DpsCertificateCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter certificateName
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateDeleteOptionalParams has a new optional parameter onResponse
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter certificateName
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams has a new optional parameter onResponse
  - Interface DpsCertificateGetOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateGetOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateGetOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateGetOptionalParams has a new optional parameter onResponse
  - Interface DpsCertificateListOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateListOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateListOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateListOptionalParams has a new optional parameter onResponse
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter certificateName
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter abortSignal
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter requestOptions
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter tracingOptions
  - Interface DpsCertificateVerifyCertificateOptionalParams has a new optional parameter onResponse
  - Interface GroupIdInformation has a new optional parameter systemData
  - Interface IotDpsPropertiesDescription has a new optional parameter disableLocalAuth
  - Interface IotDpsPropertiesDescription has a new optional parameter portalOperationsHostName
  - Interface IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceGetOperationResultOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceGetOperationResultOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceGetOperationResultOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceGetOperationResultOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceGetOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceGetOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceGetOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceGetOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceGetPrivateEndpointConnectionOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceGetPrivateEndpointConnectionOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceGetPrivateEndpointConnectionOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceGetPrivateEndpointConnectionOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceGetPrivateLinkResourcesOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceGetPrivateLinkResourcesOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceGetPrivateLinkResourcesOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceGetPrivateLinkResourcesOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListByResourceGroupOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListByResourceGroupOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListByResourceGroupOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListByResourceGroupOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListBySubscriptionOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListBySubscriptionOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListBySubscriptionOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListBySubscriptionOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListKeysForKeyNameOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListKeysForKeyNameOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListKeysForKeyNameOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListKeysForKeyNameOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListKeysOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListKeysOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListKeysOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListKeysOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListPrivateEndpointConnectionsOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListPrivateEndpointConnectionsOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListPrivateEndpointConnectionsOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListPrivateEndpointConnectionsOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListPrivateLinkResourcesOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListPrivateLinkResourcesOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListPrivateLinkResourcesOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListPrivateLinkResourcesOptionalParams has a new optional parameter onResponse
  - Interface IotDpsResourceListValidSkusOptionalParams has a new optional parameter abortSignal
  - Interface IotDpsResourceListValidSkusOptionalParams has a new optional parameter requestOptions
  - Interface IotDpsResourceListValidSkusOptionalParams has a new optional parameter tracingOptions
  - Interface IotDpsResourceListValidSkusOptionalParams has a new optional parameter onResponse
  - Interface IotHubDefinitionDescription has a new optional parameter authenticationType
  - Interface IotHubDefinitionDescription has a new optional parameter hostName
  - Interface IotHubDefinitionDescription has a new optional parameter selectedUserAssignedIdentityResourceId
  - Interface OperationsListOptionalParams has a new optional parameter abortSignal
  - Interface OperationsListOptionalParams has a new optional parameter requestOptions
  - Interface OperationsListOptionalParams has a new optional parameter tracingOptions
  - Interface OperationsListOptionalParams has a new optional parameter onResponse
  - Interface ProvisioningServiceDescription has a new optional parameter identity
  - Interface ProvisioningServiceDescription has a new optional parameter resourcegroup
  - Interface ProvisioningServiceDescription has a new optional parameter subscriptionid
  - Interface Resource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias IotHubAuthenticationType
  - Added Type Alias ManagedServiceIdentityType
  - Added Enum AzureClouds
  - Added Enum KnownIotHubAuthenticationType
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
  - Operation IotDpsResource.get has a new signature
  - Removed Interface CertificateBodyDescription
  - Removed Interface OperationDisplay
  - Type of parameter code of interface ErrorDetails is changed from string to number
  - Interface DpsCertificateDeleteOptionalParams no longer has parameter certificateName1
  - Interface DpsCertificateGenerateVerificationCodeOptionalParams no longer has parameter certificateName1
  - Interface DpsCertificateVerifyCertificateOptionalParams no longer has parameter certificateName1
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Parameter connectionString of interface IotHubDefinitionDescription is now optional

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


## 6.0.0-beta.2 (2025-08-22)

### Other Changes

  - Other fixes
    
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
