# Release History

## 1.0.0-beta.5 (2025-08-14)
Compared with version 1.0.0-beta.3

### Features Added
  - Added operation group ManagedAzResiliencyStatusOperations
  - Added operation group ManagedMaintenanceWindowStatusOperations
  - Added operation ApplicationsOperations.createOrUpdate
  - Added operation ApplicationsOperations.delete
  - Added operation ApplicationsOperations.readUpgrade
  - Added operation ApplicationsOperations.resumeUpgrade
  - Added operation ApplicationsOperations.startRollback
  - Added operation ApplicationTypesOperations.delete
  - Added operation ApplicationTypeVersionsOperations.createOrUpdate
  - Added operation ApplicationTypeVersionsOperations.delete
  - Added operation ManagedClustersOperations.createOrUpdate
  - Added operation ManagedClustersOperations.delete
  - Added operation ManagedClustersOperations.getFaultSimulation
  - Added operation ManagedClustersOperations.listFaultSimulation
  - Added operation ManagedClustersOperations.startFaultSimulation
  - Added operation ManagedClustersOperations.stopFaultSimulation
  - Added operation NodeTypesOperations.createOrUpdate
  - Added operation NodeTypesOperations.deallocate
  - Added operation NodeTypesOperations.delete
  - Added operation NodeTypesOperations.deleteNode
  - Added operation NodeTypesOperations.getFaultSimulation
  - Added operation NodeTypesOperations.listFaultSimulation
  - Added operation NodeTypesOperations.redeploy
  - Added operation NodeTypesOperations.reimage
  - Added operation NodeTypesOperations.restart
  - Added operation NodeTypesOperations.start
  - Added operation NodeTypesOperations.startFaultSimulation
  - Added operation NodeTypesOperations.stopFaultSimulation
  - Added operation NodeTypesOperations.update
  - Added operation ServicesOperations.createOrUpdate
  - Added operation ServicesOperations.delete
  - Added Interface ApplicationResourceProperties
  - Added Interface ApplicationTypeResourceProperties
  - Added Interface ApplicationTypeVersionResourceProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FaultSimulation
  - Added Interface FaultSimulationConstraints
  - Added Interface FaultSimulationContent
  - Added Interface FaultSimulationContentWrapper
  - Added Interface FaultSimulationDetails
  - Added Interface FaultSimulationIdContent
  - Added Interface IPConfigurationPublicIPAddressConfiguration
  - Added Interface ManagedClusterProperties
  - Added Interface ManagedClustersGetFaultSimulationOptionalParams
  - Added Interface ManagedClustersListFaultSimulationOptionalParams
  - Added Interface ManagedClustersStartFaultSimulationOptionalParams
  - Added Interface ManagedClustersStopFaultSimulationOptionalParams
  - Added Interface ManagedClusterVersionDetails
  - Added Interface NodeTypeFaultSimulation
  - Added Interface NodeTypeProperties
  - Added Interface NodeTypesDeallocateOptionalParams
  - Added Interface NodeTypesGetFaultSimulationOptionalParams
  - Added Interface NodeTypesListFaultSimulationOptionalParams
  - Added Interface NodeTypesRedeployOptionalParams
  - Added Interface NodeTypesStartFaultSimulationOptionalParams
  - Added Interface NodeTypesStartOptionalParams
  - Added Interface NodeTypesStopFaultSimulationOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface TrackedResource
  - Added Interface VmssExtensionProperties
  - Added Interface ZoneFaultSimulationContent
  - Interface ApplicationResource has a new optional parameter properties
  - Interface ApplicationTypeResource has a new optional parameter properties
  - Interface ApplicationTypeVersionResource has a new optional parameter properties
  - Interface ManagedCluster has a new optional parameter properties
  - Interface NodeType has a new optional parameter properties
  - Interface ServiceEndpoint has a new optional parameter networkIdentifier
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias FaultKind
  - Added Type Alias FaultSimulationContentUnion
  - Added Type Alias FaultSimulationStatus
  - Added Type Alias SecurityEncryptionType
  - Added Type Alias SfmcOperationStatus
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownFaultKind
  - Added Enum KnownFaultSimulationStatus
  - Added Enum KnownSecurityEncryptionType
  - Added Enum KnownSfmcOperationStatus
  - Added Enum KnownVersions
  - Enum KnownDiskType has a new value PremiumV2LRS
  - Enum KnownDiskType has a new value PremiumZRS
  - Enum KnownDiskType has a new value StandardSSDZRS
  - Enum KnownSecurityType has a new value ConfidentialVM

### Breaking Changes
  - Removed operation Applications.beginCreateOrUpdate
  - Removed operation Applications.beginCreateOrUpdateAndWait
  - Removed operation Applications.beginDelete
  - Removed operation Applications.beginDeleteAndWait
  - Removed operation Applications.beginReadUpgrade
  - Removed operation Applications.beginReadUpgradeAndWait
  - Removed operation Applications.beginResumeUpgrade
  - Removed operation Applications.beginResumeUpgradeAndWait
  - Removed operation Applications.beginStartRollback
  - Removed operation Applications.beginStartRollbackAndWait
  - Removed operation ApplicationTypes.beginDelete
  - Removed operation ApplicationTypes.beginDeleteAndWait
  - Removed operation ApplicationTypeVersions.beginCreateOrUpdate
  - Removed operation ApplicationTypeVersions.beginCreateOrUpdateAndWait
  - Removed operation ApplicationTypeVersions.beginDelete
  - Removed operation ApplicationTypeVersions.beginDeleteAndWait
  - Removed operation ManagedClusters.beginCreateOrUpdate
  - Removed operation ManagedClusters.beginCreateOrUpdateAndWait
  - Removed operation ManagedClusters.beginDelete
  - Removed operation ManagedClusters.beginDeleteAndWait
  - Removed operation NodeTypes.beginCreateOrUpdate
  - Removed operation NodeTypes.beginCreateOrUpdateAndWait
  - Removed operation NodeTypes.beginDelete
  - Removed operation NodeTypes.beginDeleteAndWait
  - Removed operation NodeTypes.beginDeleteNode
  - Removed operation NodeTypes.beginDeleteNodeAndWait
  - Removed operation NodeTypes.beginReimage
  - Removed operation NodeTypes.beginReimageAndWait
  - Removed operation NodeTypes.beginRestart
  - Removed operation NodeTypes.beginRestartAndWait
  - Removed operation NodeTypes.beginUpdate
  - Removed operation NodeTypes.beginUpdateAndWait
  - Removed operation Services.beginCreateOrUpdate
  - Removed operation Services.beginCreateOrUpdateAndWait
  - Removed operation Services.beginDelete
  - Removed operation Services.beginDeleteAndWait
  - Operation OperationResults.get has a new signature
  - Operation Services.get has a new signature
  - Operation Services.update has a new signature
  - Removed Interface ApplicationResourceList
  - Removed Interface ApplicationTypeResourceList
  - Removed Interface ApplicationTypeVersionResourceList
  - Removed Interface ErrorModel
  - Removed Interface IpConfigurationPublicIPAddressConfiguration
  - Removed Interface ManagedAzResiliencyStatusOperationsOperations
  - Removed Interface ManagedMaintenanceWindowStatusOperationsOperations
  - Removed Interface ManagedProxyResource
  - Removed Interface ServiceResourceList
  - Interface VmssExtension has a new required parameter properties
  - Type of parameter partitionScheme of interface Partition is changed from "Named" | "Singleton" | "UniformInt64Range" to PartitionScheme
  - Type of parameter kind of interface ScalingMechanism is changed from "AddRemoveIncrementalNamedPartition" | "ScalePartitionInstanceCount" to ServiceScalingMechanismKind
  - Type of parameter kind of interface ScalingTrigger is changed from "AveragePartitionLoadTrigger" | "AverageServiceLoadTrigger" to ServiceScalingTriggerKind
  - Type of parameter type of interface ServicePlacementPolicy is changed from "InvalidDomain" | "NonPartiallyPlaceService" | "PreferredPrimaryDomain" | "RequiredDomain" | "RequiredDomainDistribution" to ServicePlacementPolicyType
  - Interface ApplicationResource no longer has parameter managedIdentities
  - Interface ApplicationResource no longer has parameter parameters
  - Interface ApplicationResource no longer has parameter provisioningState
  - Interface ApplicationResource no longer has parameter upgradePolicy
  - Interface ApplicationResource no longer has parameter version
  - Interface ApplicationTypeResource no longer has parameter provisioningState
  - Interface ApplicationTypeVersionResource no longer has parameter appPackageUrl
  - Interface ApplicationTypeVersionResource no longer has parameter provisioningState
  - Interface ManagedCluster no longer has parameter addonFeatures
  - Interface ManagedCluster no longer has parameter adminPassword
  - Interface ManagedCluster no longer has parameter adminUserName
  - Interface ManagedCluster no longer has parameter allocatedOutboundPorts
  - Interface ManagedCluster no longer has parameter allowRdpAccess
  - Interface ManagedCluster no longer has parameter applicationTypeVersionsCleanupPolicy
  - Interface ManagedCluster no longer has parameter autoGeneratedDomainNameLabelScope
  - Interface ManagedCluster no longer has parameter auxiliarySubnets
  - Interface ManagedCluster no longer has parameter azureActiveDirectory
  - Interface ManagedCluster no longer has parameter clientConnectionPort
  - Interface ManagedCluster no longer has parameter clients
  - Interface ManagedCluster no longer has parameter clusterCertificateThumbprints
  - Interface ManagedCluster no longer has parameter clusterCodeVersion
  - Interface ManagedCluster no longer has parameter clusterId
  - Interface ManagedCluster no longer has parameter clusterState
  - Interface ManagedCluster no longer has parameter clusterUpgradeCadence
  - Interface ManagedCluster no longer has parameter clusterUpgradeMode
  - Interface ManagedCluster no longer has parameter ddosProtectionPlanId
  - Interface ManagedCluster no longer has parameter dnsName
  - Interface ManagedCluster no longer has parameter enableAutoOSUpgrade
  - Interface ManagedCluster no longer has parameter enableHttpGatewayExclusiveAuthMode
  - Interface ManagedCluster no longer has parameter enableIpv6
  - Interface ManagedCluster no longer has parameter enableServicePublicIP
  - Interface ManagedCluster no longer has parameter fabricSettings
  - Interface ManagedCluster no longer has parameter fqdn
  - Interface ManagedCluster no longer has parameter httpGatewayConnectionPort
  - Interface ManagedCluster no longer has parameter httpGatewayTokenAuthConnectionPort
  - Interface ManagedCluster no longer has parameter ipTags
  - Interface ManagedCluster no longer has parameter ipv4Address
  - Interface ManagedCluster no longer has parameter ipv6Address
  - Interface ManagedCluster no longer has parameter loadBalancingRules
  - Interface ManagedCluster no longer has parameter networkSecurityRules
  - Interface ManagedCluster no longer has parameter provisioningState
  - Interface ManagedCluster no longer has parameter publicIPPrefixId
  - Interface ManagedCluster no longer has parameter publicIPv6PrefixId
  - Interface ManagedCluster no longer has parameter serviceEndpoints
  - Interface ManagedCluster no longer has parameter subnetId
  - Interface ManagedCluster no longer has parameter upgradeDescription
  - Interface ManagedCluster no longer has parameter useCustomVnet
  - Interface ManagedCluster no longer has parameter zonalResiliency
  - Interface ManagedCluster no longer has parameter zonalUpdateMode
  - Interface NodeType no longer has parameter additionalDataDisks
  - Interface NodeType no longer has parameter additionalNetworkInterfaceConfigurations
  - Interface NodeType no longer has parameter applicationPorts
  - Interface NodeType no longer has parameter capacities
  - Interface NodeType no longer has parameter computerNamePrefix
  - Interface NodeType no longer has parameter dataDiskLetter
  - Interface NodeType no longer has parameter dataDiskSizeGB
  - Interface NodeType no longer has parameter dataDiskType
  - Interface NodeType no longer has parameter dscpConfigurationId
  - Interface NodeType no longer has parameter enableAcceleratedNetworking
  - Interface NodeType no longer has parameter enableEncryptionAtHost
  - Interface NodeType no longer has parameter enableNodePublicIP
  - Interface NodeType no longer has parameter enableNodePublicIPv6
  - Interface NodeType no longer has parameter enableOverProvisioning
  - Interface NodeType no longer has parameter ephemeralPorts
  - Interface NodeType no longer has parameter evictionPolicy
  - Interface NodeType no longer has parameter frontendConfigurations
  - Interface NodeType no longer has parameter hostGroupId
  - Interface NodeType no longer has parameter isPrimary
  - Interface NodeType no longer has parameter isSpotVM
  - Interface NodeType no longer has parameter isStateless
  - Interface NodeType no longer has parameter multiplePlacementGroups
  - Interface NodeType no longer has parameter natConfigurations
  - Interface NodeType no longer has parameter natGatewayId
  - Interface NodeType no longer has parameter networkSecurityRules
  - Interface NodeType no longer has parameter placementProperties
  - Interface NodeType no longer has parameter provisioningState
  - Interface NodeType no longer has parameter secureBootEnabled
  - Interface NodeType no longer has parameter securityType
  - Interface NodeType no longer has parameter serviceArtifactReferenceId
  - Interface NodeType no longer has parameter spotRestoreTimeout
  - Interface NodeType no longer has parameter subnetId
  - Interface NodeType no longer has parameter useDefaultPublicLoadBalancer
  - Interface NodeType no longer has parameter useEphemeralOSDisk
  - Interface NodeType no longer has parameter useTempDataDisk
  - Interface NodeType no longer has parameter vmApplications
  - Interface NodeType no longer has parameter vmExtensions
  - Interface NodeType no longer has parameter vmImageOffer
  - Interface NodeType no longer has parameter vmImagePlan
  - Interface NodeType no longer has parameter vmImagePublisher
  - Interface NodeType no longer has parameter vmImageResourceId
  - Interface NodeType no longer has parameter vmImageSku
  - Interface NodeType no longer has parameter vmImageVersion
  - Interface NodeType no longer has parameter vmInstanceCount
  - Interface NodeType no longer has parameter vmManagedIdentity
  - Interface NodeType no longer has parameter vmSecrets
  - Interface NodeType no longer has parameter vmSetupActions
  - Interface NodeType no longer has parameter vmSharedGalleryImageId
  - Interface NodeType no longer has parameter vmSize
  - Interface NodeType no longer has parameter zones
  - Interface ProxyResource no longer has parameter location
  - Interface ProxyResource no longer has parameter tags
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Interface VmssExtension no longer has parameter autoUpgradeMinorVersion
  - Interface VmssExtension no longer has parameter enableAutomaticUpgrade
  - Interface VmssExtension no longer has parameter forceUpdateTag
  - Interface VmssExtension no longer has parameter protectedSettings
  - Interface VmssExtension no longer has parameter provisionAfterExtensions
  - Interface VmssExtension no longer has parameter provisioningState
  - Interface VmssExtension no longer has parameter publisher
  - Interface VmssExtension no longer has parameter settings
  - Interface VmssExtension no longer has parameter setupOrder
  - Interface VmssExtension no longer has parameter type
  - Interface VmssExtension no longer has parameter typeHandlerVersion
  - Removed Type Alias UpgradeMode
  - Type alias "PartitionUnion" has been changed
  - Type alias "ScalingMechanismUnion" has been changed
  - Type alias "ScalingTriggerUnion" has been changed
  - Type alias "ServicePlacementPolicyUnion" has been changed
  - Type alias "ServiceResourcePropertiesUnion" has been changed
  - Removed Enum KnownUpgradeMode

    
## 1.0.0-beta.3 (2024-12-12)
Compared with version 1.0.0-beta.2
    
### Features Added

  - Added operation NodeTypes.beginUpdate
  - Added operation NodeTypes.beginUpdateAndWait
  - Added Interface NodeTypesUpdateHeaders
  - Interface ManagedCluster has a new optional parameter allocatedOutboundPorts
  - Interface NodeTypesUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface NodeTypesUpdateOptionalParams has a new optional parameter updateIntervalInMs

### Breaking Changes

  - Removed operation NodeTypes.update
  - Interface ManagedCluster no longer has parameter customFqdn
    
    
## 1.0.0-beta.2 (2024-10-16)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added Interface VmApplication
  - Added Type Alias AutoGeneratedDomainNameLabelScope
  - Interface ManagedCluster has a new optional parameter autoGeneratedDomainNameLabelScope
  - Interface ManagedCluster has a new optional parameter customFqdn
  - Interface NodeType has a new optional parameter vmApplications
  - Added Enum KnownAutoGeneratedDomainNameLabelScope
    
    
## 1.0.0-beta.1 (2024-07-26)

### Features Added

The package of @azure/arm-servicefabricmanagedclusters is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
