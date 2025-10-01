# Release History

## 6.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 6.0.1 (2025-08-22)

### Other Changes

  - Other fixes

## 6.0.0 (2024-06-07)
    
### Features Added

  - Added operation group RoutingInfo
  - Added operation MobileNetworks.listSimGroups
  - Added operation Sims.beginClone
  - Added operation Sims.beginCloneAndWait
  - Added operation Sims.beginMove
  - Added operation Sims.beginMoveAndWait
  - Added Interface Ipv4Route
  - Added Interface Ipv4RouteNextHop
  - Added Interface MobileNetworksListSimGroupsNextOptionalParams
  - Added Interface MobileNetworksListSimGroupsOptionalParams
  - Added Interface RoutingInfoGetOptionalParams
  - Added Interface RoutingInfoListNextOptionalParams
  - Added Interface RoutingInfoListOptionalParams
  - Added Interface RoutingInfoListResult
  - Added Interface RoutingInfoModel
  - Added Interface SimClone
  - Added Interface SimMove
  - Added Interface SimsCloneHeaders
  - Added Interface SimsCloneOptionalParams
  - Added Interface SimsMoveHeaders
  - Added Interface SimsMoveOptionalParams
  - Added Interface UserConsentConfiguration
  - Added Interface UserPlaneDataRoutesItem
  - Added Type Alias MobileNetworksListSimGroupsNextResponse
  - Added Type Alias MobileNetworksListSimGroupsResponse
  - Added Type Alias NasEncryptionType
  - Added Type Alias RoutingInfoGetResponse
  - Added Type Alias RoutingInfoListNextResponse
  - Added Type Alias RoutingInfoListResponse
  - Added Type Alias SimsCloneResponse
  - Added Type Alias SimsMoveResponse
  - Interface InterfaceProperties has a new optional parameter bfdIpv4Endpoints
  - Interface InterfaceProperties has a new optional parameter ipv4AddressList
  - Interface InterfaceProperties has a new optional parameter vlanId
  - Interface PacketCoreControlPlane has a new optional parameter userConsent
  - Interface Platform has a new optional parameter haUpgradesAvailable
  - Interface SignalingConfiguration has a new optional parameter nasEncryption
  - Added Enum KnownNasEncryptionType

### Breaking Changes

  - Type of parameter userAssignedIdentities of interface ManagedServiceIdentity is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to {
        [propertyName: string]: UserAssignedIdentity | null;
    }
    
    
## 5.0.0 (2024-03-21)
    
### Features Added

  - Added operation group ExtendedUeInformation
  - Added operation group UeInformation
  - Added Interface DnnIpPair
  - Added Interface ExtendedUeInfo
  - Added Interface ExtendedUeInfoProperties
  - Added Interface ExtendedUeInformationGetOptionalParams
  - Added Interface HomeNetworkPrivateKeysProvisioning
  - Added Interface HomeNetworkPublicKey
  - Added Interface PublicLandMobileNetwork
  - Added Interface PublicLandMobileNetworkHomeNetworkPublicKeys
  - Added Interface UeInfo
  - Added Interface UeInfo4G
  - Added Interface UeInfo5G
  - Added Interface UeInfoList
  - Added Interface UeInformationListNextOptionalParams
  - Added Interface UeInformationListOptionalParams
  - Added Interface UeQOSFlow
  - Added Interface UeSessionInfo4G
  - Added Interface UeSessionInfo5G
  - Added Type Alias ExtendedUeInfoPropertiesUnion
  - Added Type Alias ExtendedUeInformationGetResponse
  - Added Type Alias HomeNetworkPrivateKeysProvisioningState
  - Added Type Alias PdnType
  - Added Type Alias RatType
  - Added Type Alias RrcEstablishmentCause
  - Added Type Alias UeInformationListNextResponse
  - Added Type Alias UeInformationListResponse
  - Added Type Alias UeState
  - Added Type Alias UeUsageSetting
  - Interface MobileNetwork has a new optional parameter identity
  - Interface MobileNetwork has a new optional parameter publicLandMobileNetworks
  - Interface PacketCoreControlPlane has a new optional parameter homeNetworkPrivateKeysProvisioning
  - Added Enum KnownHomeNetworkPrivateKeysProvisioningState
  - Added Enum KnownPdnType
  - Added Enum KnownRatType
  - Added Enum KnownRrcEstablishmentCause
  - Added Enum KnownUeState
  - Added Enum KnownUeUsageSetting

### Breaking Changes

  - Operation MobileNetworks.updateTags has a new signature
    
    
## 4.0.0 (2023-10-31)
    
### Features Added

  - Added Interface EventHubConfiguration
  - Added Interface NASRerouteConfiguration
  - Added Interface SignalingConfiguration
  - Interface PacketCapture has a new optional parameter outputFiles
  - Interface PacketCoreControlPlane has a new optional parameter controlPlaneAccessVirtualIpv4Addresses
  - Interface PacketCoreControlPlane has a new optional parameter eventHub
  - Interface PacketCoreControlPlane has a new optional parameter signaling
  - Interface PacketCoreDataPlane has a new optional parameter userPlaneAccessVirtualIpv4Addresses
  - Enum KnownInstallationReason has a new value ControlPlaneAccessInterfaceHasChanged
  - Enum KnownInstallationReason has a new value ControlPlaneAccessVirtualIpv4AddressesHasChanged
  - Enum KnownInstallationReason has a new value PublicLandMobileNetworkIdentifierHasChanged
  - Enum KnownInstallationReason has a new value UserPlaneAccessInterfaceHasChanged
  - Enum KnownInstallationReason has a new value UserPlaneAccessVirtualIpv4AddressesHasChanged
  - Enum KnownInstallationReason has a new value UserPlaneDataInterfaceHasChanged
    
### Breaking Changes

  - Parameter totalBytesPerSession has a more constraining minimum value
    
## 3.0.0 (2023-07-05)
    
### Features Added

  - Added operation group DiagnosticsPackages
  - Added operation group PacketCaptures
  - Added operation PacketCoreControlPlaneVersions.getBySubscription
  - Added operation PacketCoreControlPlaneVersions.listBySubscription
  - Added operation Sites.beginDeletePacketCore
  - Added operation Sites.beginDeletePacketCoreAndWait
  - Added Interface DiagnosticsPackage
  - Added Interface DiagnosticsPackageListResult
  - Added Interface DiagnosticsPackagesCreateOrUpdateOptionalParams
  - Added Interface DiagnosticsPackagesDeleteOptionalParams
  - Added Interface DiagnosticsPackagesGetOptionalParams
  - Added Interface DiagnosticsPackagesListByPacketCoreControlPlaneNextOptionalParams
  - Added Interface DiagnosticsPackagesListByPacketCoreControlPlaneOptionalParams
  - Added Interface DiagnosticsUploadConfiguration
  - Added Interface IdentityAndTagsObject
  - Added Interface PacketCapture
  - Added Interface PacketCaptureListResult
  - Added Interface PacketCapturesCreateOrUpdateOptionalParams
  - Added Interface PacketCapturesDeleteOptionalParams
  - Added Interface PacketCapturesGetOptionalParams
  - Added Interface PacketCapturesListByPacketCoreControlPlaneNextOptionalParams
  - Added Interface PacketCapturesListByPacketCoreControlPlaneOptionalParams
  - Added Interface PacketCapturesStopOptionalParams
  - Added Interface PacketCoreControlPlaneResourceId
  - Added Interface PacketCoreControlPlaneVersionsGetBySubscriptionOptionalParams
  - Added Interface PacketCoreControlPlaneVersionsListBySubscriptionNextOptionalParams
  - Added Interface PacketCoreControlPlaneVersionsListBySubscriptionOptionalParams
  - Added Interface SiteDeletePacketCore
  - Added Interface SitesDeletePacketCoreOptionalParams
  - Added Type Alias DesiredInstallationState
  - Added Type Alias DiagnosticsPackagesCreateOrUpdateResponse
  - Added Type Alias DiagnosticsPackagesGetResponse
  - Added Type Alias DiagnosticsPackagesListByPacketCoreControlPlaneNextResponse
  - Added Type Alias DiagnosticsPackagesListByPacketCoreControlPlaneResponse
  - Added Type Alias DiagnosticsPackageStatus
  - Added Type Alias InstallationReason
  - Added Type Alias PacketCapturesCreateOrUpdateResponse
  - Added Type Alias PacketCapturesGetResponse
  - Added Type Alias PacketCapturesListByPacketCoreControlPlaneNextResponse
  - Added Type Alias PacketCapturesListByPacketCoreControlPlaneResponse
  - Added Type Alias PacketCapturesStopResponse
  - Added Type Alias PacketCaptureStatus
  - Added Type Alias PacketCoreControlPlaneVersionsGetBySubscriptionResponse
  - Added Type Alias PacketCoreControlPlaneVersionsListBySubscriptionNextResponse
  - Added Type Alias PacketCoreControlPlaneVersionsListBySubscriptionResponse
  - Added Type Alias ReinstallRequired
  - Interface Installation has a new optional parameter desiredState
  - Interface Installation has a new optional parameter reasons
  - Interface Installation has a new optional parameter reinstallRequired
  - Interface PacketCoreControlPlane has a new optional parameter diagnosticsUpload
  - Interface PacketCoreControlPlane has a new optional parameter installedVersion
  - Added Enum KnownDesiredInstallationState
  - Added Enum KnownDiagnosticsPackageStatus
  - Added Enum KnownInstallationReason
  - Added Enum KnownPacketCaptureStatus
  - Added Enum KnownReinstallRequired

### Breaking Changes

  - Operation PacketCoreControlPlanes.updateTags has a new signature
  - Operation SimGroups.updateTags has a new signature
  - Class MobileNetworkManagementClient has a new signature
  - Interface ManagedServiceIdentity no longer has parameter principalId
  - Interface ManagedServiceIdentity no longer has parameter tenantId
  - Enum KnownBillingSku no longer has value G3
  - Enum KnownBillingSku no longer has value G4
  - Enum KnownManagedServiceIdentityType no longer has value SystemAssigned
  - Enum KnownManagedServiceIdentityType no longer has value SystemAssignedUserAssigned
    
    
## 2.0.0 (2023-01-06)
    
### Features Added

  - Added operation PacketCoreControlPlanes.beginCollectDiagnosticsPackage
  - Added operation PacketCoreControlPlanes.beginCollectDiagnosticsPackageAndWait
  - Added operation PacketCoreControlPlanes.beginReinstall
  - Added operation PacketCoreControlPlanes.beginReinstallAndWait
  - Added operation PacketCoreControlPlanes.beginRollback
  - Added operation PacketCoreControlPlanes.beginRollbackAndWait
  - Added operation Sims.beginBulkDelete
  - Added operation Sims.beginBulkDeleteAndWait
  - Added operation Sims.beginBulkUpload
  - Added operation Sims.beginBulkUploadAndWait
  - Added operation Sims.beginBulkUploadEncrypted
  - Added operation Sims.beginBulkUploadEncryptedAndWait
  - Added Interface PacketCoreControlPlanesCollectDiagnosticsPackageOptionalParams
  - Added Interface PacketCoreControlPlanesReinstallOptionalParams
  - Added Interface PacketCoreControlPlanesRollbackOptionalParams
  - Added Interface SimsBulkDeleteOptionalParams
  - Added Interface SimsBulkUploadEncryptedOptionalParams
  - Added Interface SimsBulkUploadOptionalParams
  - Added Type Alias PacketCoreControlPlanesCollectDiagnosticsPackageResponse
  - Added Type Alias PacketCoreControlPlanesReinstallResponse
  - Added Type Alias PacketCoreControlPlanesRollbackResponse
  - Added Type Alias SimsBulkDeleteResponse
  - Added Type Alias SimsBulkUploadEncryptedResponse
  - Added Type Alias SimsBulkUploadResponse

### Breaking Changes

  - Removed operation group PacketCoreControlPlaneOperations
  - Removed operation group SimOperations
  - Class MobileNetworkManagementClient no longer has parameter packetCoreControlPlaneOperations
  - Class MobileNetworkManagementClient no longer has parameter simOperations
    
    
## 1.0.0 (2022-12-15)

The package of @azure/arm-mobilenetwork is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
