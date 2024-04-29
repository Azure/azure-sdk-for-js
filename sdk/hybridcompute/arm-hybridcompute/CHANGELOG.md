# Release History

## 4.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.0.0-beta.1 (2024-04-17)
    
**Features**

  - Added operation group ExtensionMetadata
  - Added operation group MachineRunCommands
  - Added operation group NetworkProfileOperations
  - Added operation Machines.beginAssessPatches
  - Added operation Machines.beginAssessPatchesAndWait
  - Added operation Machines.beginInstallPatches
  - Added operation Machines.beginInstallPatchesAndWait
  - Added Interface AccessRule
  - Added Interface AgentConfiguration
  - Added Interface AgentUpgrade
  - Added Interface AgentVersion
  - Added Interface AgentVersionsList
  - Added Interface AvailablePatchCountByClassification
  - Added Interface CloudMetadata
  - Added Interface ConfigurationExtension
  - Added Interface EsuKey
  - Added Interface ExtensionMetadataGetOptionalParams
  - Added Interface ExtensionMetadataListOptionalParams
  - Added Interface ExtensionsResourceStatus
  - Added Interface ExtensionValue
  - Added Interface ExtensionValueListResult
  - Added Interface HybridComputeManagementClientUpgradeExtensionsHeaders
  - Added Interface HybridComputePrivateLinkScope
  - Added Interface HybridIdentityMetadata
  - Added Interface HybridIdentityMetadataList
  - Added Interface IpAddress
  - Added Interface KeyDetails
  - Added Interface KeyProperties
  - Added Interface License
  - Added Interface LicenseDetails
  - Added Interface LicenseProfile
  - Added Interface LicenseProfileArmEsuProperties
  - Added Interface LicenseProfileArmEsuPropertiesWithoutAssignedLicense
  - Added Interface LicenseProfileMachineInstanceView
  - Added Interface LicenseProfileMachineInstanceViewEsuProperties
  - Added Interface LicenseProfilesListResult
  - Added Interface LicenseProfileStorageModelEsuProperties
  - Added Interface LicenseProfileUpdate
  - Added Interface LicensesListResult
  - Added Interface LicenseUpdate
  - Added Interface LinuxParameters
  - Added Interface Machine
  - Added Interface MachineAssessPatchesResult
  - Added Interface MachineExtension
  - Added Interface MachineExtensionsDeleteHeaders
  - Added Interface MachineExtensionsUpdateHeaders
  - Added Interface MachineExtensionUpdate
  - Added Interface MachineInstallPatchesParameters
  - Added Interface MachineInstallPatchesResult
  - Added Interface MachineRunCommand
  - Added Interface MachineRunCommandInstanceView
  - Added Interface MachineRunCommandsCreateOrUpdateHeaders
  - Added Interface MachineRunCommandsCreateOrUpdateOptionalParams
  - Added Interface MachineRunCommandScriptSource
  - Added Interface MachineRunCommandsDeleteHeaders
  - Added Interface MachineRunCommandsDeleteOptionalParams
  - Added Interface MachineRunCommandsGetOptionalParams
  - Added Interface MachineRunCommandsListNextOptionalParams
  - Added Interface MachineRunCommandsListOptionalParams
  - Added Interface MachineRunCommandsListResult
  - Added Interface MachineRunCommandUpdate
  - Added Interface MachinesAssessPatchesHeaders
  - Added Interface MachinesAssessPatchesOptionalParams
  - Added Interface MachinesInstallPatchesHeaders
  - Added Interface MachinesInstallPatchesOptionalParams
  - Added Interface MachineUpdate
  - Added Interface NetworkConfiguration
  - Added Interface NetworkInterface
  - Added Interface NetworkProfile
  - Added Interface NetworkProfileGetOptionalParams
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListResult
  - Added Interface NetworkSecurityPerimeterProfile
  - Added Interface OSProfileLinuxConfiguration
  - Added Interface OSProfileWindowsConfiguration
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionDataModel
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkScopesDeleteHeaders
  - Added Interface ProductFeature
  - Added Interface ProductFeatureUpdate
  - Added Interface ProvisioningIssue
  - Added Interface ProxyResource
  - Added Interface ResourceAssociation
  - Added Interface RunCommandInputParameter
  - Added Interface RunCommandManagedIdentity
  - Added Interface ServiceStatus
  - Added Interface ServiceStatuses
  - Added Interface Subnet
  - Added Interface TrackedResource
  - Added Interface WindowsParameters
  - Added Type Alias AccessMode
  - Added Type Alias AccessRuleDirection
  - Added Type Alias AgentConfigurationMode
  - Added Type Alias ArcKindEnum
  - Added Type Alias AssessmentModeTypes
  - Added Type Alias EsuEligibility
  - Added Type Alias EsuKeyState
  - Added Type Alias EsuServerType
  - Added Type Alias ExecutionState
  - Added Type Alias ExtensionMetadataGetResponse
  - Added Type Alias ExtensionMetadataListResponse
  - Added Type Alias ExtensionsStatusLevelTypes
  - Added Type Alias LastAttemptStatusEnum
  - Added Type Alias LicenseAssignmentState
  - Added Type Alias LicenseCoreType
  - Added Type Alias LicenseEdition
  - Added Type Alias LicenseProfileProductType
  - Added Type Alias LicenseProfileSubscriptionStatus
  - Added Type Alias LicenseProfileSubscriptionStatusUpdate
  - Added Type Alias LicenseState
  - Added Type Alias LicenseStatus
  - Added Type Alias LicenseTarget
  - Added Type Alias LicenseType
  - Added Type Alias MachineRunCommandsCreateOrUpdateResponse
  - Added Type Alias MachineRunCommandsGetResponse
  - Added Type Alias MachineRunCommandsListNextResponse
  - Added Type Alias MachineRunCommandsListResponse
  - Added Type Alias MachinesAssessPatchesResponse
  - Added Type Alias MachinesInstallPatchesResponse
  - Added Type Alias NetworkProfileGetResponse
  - Added Type Alias OsType
  - Added Type Alias PatchModeTypes
  - Added Type Alias PatchOperationStartedBy
  - Added Type Alias PatchOperationStatus
  - Added Type Alias PatchServiceUsed
  - Added Type Alias ProvisioningIssueSeverity
  - Added Type Alias ProvisioningIssueType
  - Added Type Alias ProvisioningState
  - Added Type Alias VMGuestPatchClassificationLinux
  - Added Type Alias VMGuestPatchClassificationWindows
  - Added Type Alias VMGuestPatchRebootSetting
  - Added Type Alias VMGuestPatchRebootStatus
  - Interface HybridComputePrivateLinkScopeProperties has a new optional parameter privateEndpointConnections
  - Interface MachineExtensionProperties has a new optional parameter enableAutomaticUpgrade
  - Interface MachinesListByResourceGroupOptionalParams has a new optional parameter expand
  - Interface OperationValue has a new optional parameter isDataAction
  - Interface OSProfile has a new optional parameter linuxConfiguration
  - Interface OSProfile has a new optional parameter windowsConfiguration
  - Interface PrivateEndpointConnectionProperties has a new optional parameter groupIds
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownAccessMode
  - Added Enum KnownAccessRuleDirection
  - Added Enum KnownAgentConfigurationMode
  - Added Enum KnownArcKindEnum
  - Added Enum KnownAssessmentModeTypes
  - Added Enum KnownEsuEligibility
  - Added Enum KnownEsuKeyState
  - Added Enum KnownEsuServerType
  - Added Enum KnownExecutionState
  - Added Enum KnownLastAttemptStatusEnum
  - Added Enum KnownLicenseAssignmentState
  - Added Enum KnownLicenseCoreType
  - Added Enum KnownLicenseEdition
  - Added Enum KnownLicenseProfileProductType
  - Added Enum KnownLicenseProfileSubscriptionStatus
  - Added Enum KnownLicenseProfileSubscriptionStatusUpdate
  - Added Enum KnownLicenseState
  - Added Enum KnownLicenseStatus
  - Added Enum KnownLicenseTarget
  - Added Enum KnownLicenseType
  - Added Enum KnownOsType
  - Added Enum KnownPatchModeTypes
  - Added Enum KnownPatchOperationStartedBy
  - Added Enum KnownPatchOperationStatus
  - Added Enum KnownPatchServiceUsed
  - Added Enum KnownProvisioningIssueSeverity
  - Added Enum KnownProvisioningIssueType
  - Added Enum KnownProvisioningState
  - Added Enum KnownVMGuestPatchClassificationLinux
  - Added Enum KnownVMGuestPatchClassificationWindows
  - Added Enum KnownVMGuestPatchRebootSetting
  - Added Enum KnownVMGuestPatchRebootStatus
  - Added function getContinuationToken

**Breaking Changes**

  - Interface MachineExtensionsListNextOptionalParams no longer has parameter expand
  - Type of parameter protectedSettings of interface MachineExtensionProperties is changed from Record<string, unknown> to {
        [propertyName: string]: any;
    }
  - Type of parameter settings of interface MachineExtensionProperties is changed from Record<string, unknown> to {
        [propertyName: string]: any;
    }
  - Type of parameter expand of interface MachinesGetOptionalParams is changed from InstanceViewTypes to string
  - Removed Enum KnownInstanceViewTypes
    
    

## 3.1.0-beta.3 (2023-11-09)
    
**Features**

  - Added operation group AgentVersionOperations
  - Added operation group ExtensionMetadata
  - Added operation group HybridIdentityMetadataOperations
  - Added operation group LicenseProfiles
  - Added operation group Licenses
  - Added operation group NetworkProfileOperations
  - Added operation Machines.beginAssessPatches
  - Added operation Machines.beginAssessPatchesAndWait
  - Added operation Machines.beginInstallPatches
  - Added operation Machines.beginInstallPatchesAndWait
  - Added Interface AgentConfiguration
  - Added Interface AgentUpgrade
  - Added Interface AgentVersion
  - Added Interface AgentVersionGetOptionalParams
  - Added Interface AgentVersionListOptionalParams
  - Added Interface AgentVersionsList
  - Added Interface AvailablePatchCountByClassification
  - Added Interface CloudMetadata
  - Added Interface ConfigurationExtension
  - Added Interface ErrorDetailAutoGenerated
  - Added Interface ErrorResponseAutoGenerated
  - Added Interface EsuKey
  - Added Interface ExtensionMetadataGetOptionalParams
  - Added Interface ExtensionMetadataListOptionalParams
  - Added Interface ExtensionValue
  - Added Interface ExtensionValueListResult
  - Added Interface HybridComputeManagementClientUpgradeExtensionsHeaders
  - Added Interface HybridComputePrivateLinkScope
  - Added Interface HybridIdentityMetadata
  - Added Interface HybridIdentityMetadataGetOptionalParams
  - Added Interface HybridIdentityMetadataList
  - Added Interface HybridIdentityMetadataListByMachinesNextOptionalParams
  - Added Interface HybridIdentityMetadataListByMachinesOptionalParams
  - Added Interface IpAddress
  - Added Interface License
  - Added Interface LicenseDetails
  - Added Interface LicenseProfile
  - Added Interface LicenseProfileArmEsuProperties
  - Added Interface LicenseProfileArmEsuPropertiesWithoutAssignedLicense
  - Added Interface LicenseProfileMachineInstanceView
  - Added Interface LicenseProfileMachineInstanceViewEsuProperties
  - Added Interface LicenseProfilesCreateOrUpdateHeaders
  - Added Interface LicenseProfilesCreateOrUpdateOptionalParams
  - Added Interface LicenseProfilesDeleteHeaders
  - Added Interface LicenseProfilesDeleteOptionalParams
  - Added Interface LicenseProfilesGetOptionalParams
  - Added Interface LicenseProfilesListNextOptionalParams
  - Added Interface LicenseProfilesListOptionalParams
  - Added Interface LicenseProfilesListResult
  - Added Interface LicenseProfileStorageModelEsuProperties
  - Added Interface LicenseProfilesUpdateHeaders
  - Added Interface LicenseProfilesUpdateOptionalParams
  - Added Interface LicenseProfileUpdate
  - Added Interface LicensesCreateOrUpdateOptionalParams
  - Added Interface LicensesDeleteOptionalParams
  - Added Interface LicensesGetOptionalParams
  - Added Interface LicensesListByResourceGroupNextOptionalParams
  - Added Interface LicensesListByResourceGroupOptionalParams
  - Added Interface LicensesListBySubscriptionNextOptionalParams
  - Added Interface LicensesListBySubscriptionOptionalParams
  - Added Interface LicensesListResult
  - Added Interface LicensesUpdateOptionalParams
  - Added Interface LicensesValidateLicenseOptionalParams
  - Added Interface LicenseUpdate
  - Added Interface LinuxParameters
  - Added Interface Machine
  - Added Interface MachineAssessPatchesResult
  - Added Interface MachineExtension
  - Added Interface MachineExtensionsDeleteHeaders
  - Added Interface MachineExtensionsUpdateHeaders
  - Added Interface MachineExtensionUpdate
  - Added Interface MachineInstallPatchesParameters
  - Added Interface MachineInstallPatchesResult
  - Added Interface MachinesAssessPatchesHeaders
  - Added Interface MachinesAssessPatchesOptionalParams
  - Added Interface MachinesInstallPatchesHeaders
  - Added Interface MachinesInstallPatchesOptionalParams
  - Added Interface MachineUpdate
  - Added Interface NetworkInterface
  - Added Interface NetworkProfile
  - Added Interface NetworkProfileGetOptionalParams
  - Added Interface OSProfileLinuxConfiguration
  - Added Interface OSProfileWindowsConfiguration
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionDataModel
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkScopesDeleteHeaders
  - Added Interface ProxyResource
  - Added Interface ServiceStatus
  - Added Interface ServiceStatuses
  - Added Interface Subnet
  - Added Interface TrackedResource
  - Added Interface WindowsParameters
  - Added Type Alias AgentConfigurationMode
  - Added Type Alias AgentVersionGetResponse
  - Added Type Alias AgentVersionListResponse
  - Added Type Alias ArcKindEnum
  - Added Type Alias AssessmentModeTypes
  - Added Type Alias EsuEligibility
  - Added Type Alias EsuKeyState
  - Added Type Alias EsuServerType
  - Added Type Alias ExtensionMetadataGetResponse
  - Added Type Alias ExtensionMetadataListResponse
  - Added Type Alias HybridIdentityMetadataGetResponse
  - Added Type Alias HybridIdentityMetadataListByMachinesNextResponse
  - Added Type Alias HybridIdentityMetadataListByMachinesResponse
  - Added Type Alias LastAttemptStatusEnum
  - Added Type Alias LicenseAssignmentState
  - Added Type Alias LicenseCoreType
  - Added Type Alias LicenseEdition
  - Added Type Alias LicenseProfilesCreateOrUpdateResponse
  - Added Type Alias LicenseProfilesDeleteResponse
  - Added Type Alias LicenseProfilesGetResponse
  - Added Type Alias LicenseProfilesListNextResponse
  - Added Type Alias LicenseProfilesListResponse
  - Added Type Alias LicenseProfilesUpdateResponse
  - Added Type Alias LicensesCreateOrUpdateResponse
  - Added Type Alias LicensesGetResponse
  - Added Type Alias LicensesListByResourceGroupNextResponse
  - Added Type Alias LicensesListByResourceGroupResponse
  - Added Type Alias LicensesListBySubscriptionNextResponse
  - Added Type Alias LicensesListBySubscriptionResponse
  - Added Type Alias LicenseState
  - Added Type Alias LicensesUpdateResponse
  - Added Type Alias LicensesValidateLicenseResponse
  - Added Type Alias LicenseTarget
  - Added Type Alias LicenseType
  - Added Type Alias MachinesAssessPatchesResponse
  - Added Type Alias MachinesInstallPatchesResponse
  - Added Type Alias NetworkProfileGetResponse
  - Added Type Alias OsType
  - Added Type Alias PatchModeTypes
  - Added Type Alias PatchOperationStartedBy
  - Added Type Alias PatchOperationStatus
  - Added Type Alias PatchServiceUsed
  - Added Type Alias ProvisioningState
  - Added Type Alias VMGuestPatchClassificationLinux
  - Added Type Alias VMGuestPatchClassificationWindows
  - Added Type Alias VMGuestPatchRebootSetting
  - Added Type Alias VMGuestPatchRebootStatus
  - Interface HybridComputePrivateLinkScopeProperties has a new optional parameter privateEndpointConnections
  - Interface MachineExtensionProperties has a new optional parameter enableAutomaticUpgrade
  - Interface MachinesListByResourceGroupOptionalParams has a new optional parameter expand
  - Interface OperationValue has a new optional parameter isDataAction
  - Interface OSProfile has a new optional parameter linuxConfiguration
  - Interface OSProfile has a new optional parameter windowsConfiguration
  - Interface PrivateEndpointConnectionProperties has a new optional parameter groupIds
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownAgentConfigurationMode
  - Added Enum KnownArcKindEnum
  - Added Enum KnownAssessmentModeTypes
  - Added Enum KnownEsuEligibility
  - Added Enum KnownEsuKeyState
  - Added Enum KnownEsuServerType
  - Added Enum KnownLastAttemptStatusEnum
  - Added Enum KnownLicenseAssignmentState
  - Added Enum KnownLicenseCoreType
  - Added Enum KnownLicenseEdition
  - Added Enum KnownLicenseState
  - Added Enum KnownLicenseTarget
  - Added Enum KnownLicenseType
  - Added Enum KnownOsType
  - Added Enum KnownPatchModeTypes
  - Added Enum KnownPatchOperationStartedBy
  - Added Enum KnownPatchOperationStatus
  - Added Enum KnownPatchServiceUsed
  - Added Enum KnownProvisioningState
  - Added Enum KnownVMGuestPatchClassificationLinux
  - Added Enum KnownVMGuestPatchClassificationWindows
  - Added Enum KnownVMGuestPatchRebootSetting
  - Added Enum KnownVMGuestPatchRebootStatus
  - Added function getContinuationToken
  - Class HybridComputeManagementClient has a new signature
  - Interface MachineExtensionsListNextOptionalParams no longer has parameter expand
  - Type of parameter protectedSettings of interface MachineExtensionProperties is changed from Record<string, unknown> to {
        [propertyName: string]: any;
    }
  - Type of parameter settings of interface MachineExtensionProperties is changed from Record<string, unknown> to {
        [propertyName: string]: any;
    }
    

## 3.1.0-beta.2 (2022-11-25)
    
**Features**

  - Added Interface HybridComputePrivateLinkScope
  - Added Interface Machine
  - Added Interface MachineExtension
  - Added Interface MachineExtensionUpdate
  - Added Interface MachineUpdate
  - Added Interface OSProfileLinuxConfiguration
  - Added Interface OSProfileWindowsConfiguration
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionDataModel
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface TrackedResource
  - Interface HybridComputePrivateLinkScopeProperties has a new optional parameter privateEndpointConnections
  - Interface MachineProperties has a new optional parameter mssqlDiscovered
  - Interface MachineProperties has a new optional parameter osType
  - Interface MachineUpdateProperties has a new optional parameter osProfile
  - Interface OSProfile has a new optional parameter linuxConfiguration
  - Interface OSProfile has a new optional parameter windowsConfiguration


## 3.1.0-beta.1 (2022-04-26)
    
**Features**

  - Added Interface OSProfileLinuxConfiguration
  - Added Interface OSProfileWindowsConfiguration
  - Added Interface PrivateEndpointConnectionDataModel
  - Interface HybridComputePrivateLinkScopeProperties has a new optional parameter privateEndpointConnections
  - Interface MachineProperties has a new optional parameter mssqlDiscovered
  - Interface MachineProperties has a new optional parameter osType
  - Interface MachineUpdateProperties has a new optional parameter osProfile
  - Interface OSProfile has a new optional parameter linuxConfiguration
  - Interface OSProfile has a new optional parameter windowsConfiguration


## 3.0.0 (2022-01-18)

The package of @azure/arm-hybridcompute is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
