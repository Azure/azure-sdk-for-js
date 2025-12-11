# Release History

## 2.0.0-beta.1 (2025-12-11)
Compared with version 1.0.0

### Features Added
  - Added operation AppliancesOperations.createOrUpdate
  - Added operation AppliancesOperations.delete
  - Added Interface ApplianceOperationValueDisplay
  - Added Interface ApplianceProperties
  - Added Interface DnsConfiguration
  - Added Interface Event_2
  - Added Interface GatewayConfiguration
  - Added Interface NetworkProfile
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyConfiguration
  - Added Interface RestorePollerOptions
  - Interface Appliance has a new optional parameter properties
  - Interface ApplianceOperation has a new optional parameter display
  - Interface AppliancesListKeysOptionalParams has a new optional parameter artifactType
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions
  - Enum KnownSSHKeyType has a new value UserManagementKey
  - Enum KnownStatus has a new value ArcGatewayUpdateComplete
  - Enum KnownStatus has a new value ArcGatewayUpdateFailed
  - Enum KnownStatus has a new value ArcGatewayUpdatePreparing
  - Enum KnownStatus has a new value ArcGatewayUpdating
  - Enum KnownStatus has a new value EtcdSnapshotFailed
  - Enum KnownStatus has a new value NetworkDNSUpdateComplete
  - Enum KnownStatus has a new value NetworkDNSUpdateFailed
  - Enum KnownStatus has a new value NetworkDNSUpdatePreparing
  - Enum KnownStatus has a new value NetworkDNSUpdating
  - Enum KnownStatus has a new value NetworkProxyUpdateComplete
  - Enum KnownStatus has a new value NetworkProxyUpdateFailed
  - Enum KnownStatus has a new value NetworkProxyUpdatePreparing
  - Enum KnownStatus has a new value NetworkProxyUpdating
  - Enum KnownStatus has a new value ValidatingEtcdHealth
  - Enum KnownStatus has a new value ValidatingImageDownload
  - Enum KnownStatus has a new value ValidatingImageUpload
  - Enum KnownStatus has a new value ValidatingSFSConnectivity

### Breaking Changes
  - Removed operation Appliances.beginCreateOrUpdate
  - Removed operation Appliances.beginCreateOrUpdateAndWait
  - Removed operation Appliances.beginDelete
  - Removed operation Appliances.beginDeleteAndWait
  - Operation Appliances.update has a new signature
  - Removed Interface ApplianceOperationsList
  - Interface Appliance no longer has parameter distro
  - Interface Appliance no longer has parameter infrastructureConfig
  - Interface Appliance no longer has parameter provisioningState
  - Interface Appliance no longer has parameter publicKey
  - Interface Appliance no longer has parameter status
  - Interface Appliance no longer has parameter version
  - Interface ApplianceOperation no longer has parameter description
  - Interface ApplianceOperation no longer has parameter operation
  - Interface ApplianceOperation no longer has parameter provider
  - Interface ApplianceOperation no longer has parameter resource
  - Interface AppliancesUpdateOptionalParams no longer has parameter tags
  - Enum KnownProvider no longer has value KubeVirt
  - Enum KnownProvider no longer has value OpenStack

    
## 1.0.0 (2023-08-14)

The package of @azure/arm-resourceconnector is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
