# Release History

## 5.0.0 (2026-05-20)

### Features Added
  - Added operation TriggersOperations.createOrUpdate
  - Added operation TriggersOperations.delete
  - Added operation VirtualMachineImageTemplatesOperations.cancel
  - Added operation VirtualMachineImageTemplatesOperations.createOrUpdate
  - Added operation VirtualMachineImageTemplatesOperations.delete
  - Added operation VirtualMachineImageTemplatesOperations.run
  - Added operation VirtualMachineImageTemplatesOperations.update
  - Added Interface DataDisk
  - Added Interface ImageTemplateProperties
  - Added Interface ImageTemplatePropertiesOptimizeWorkload
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface RunOutputProperties
  - Added Interface SimplePollerLike
  - Interface ImageTemplate has a new optional parameter additionalDataDisks
  - Interface ImageTemplatePropertiesOptimize has a new optional parameter workload
  - Interface ImageTemplateSharedImageDistributor has a new optional parameter replicationMode
  - Interface Trigger has a new optional parameter properties
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ReplicationMode
  - Added Type Alias WorkloadOptimizationState
  - Added Enum AzureClouds
  - Added Enum KnownReplicationMode
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Triggers.beginDeleteAndWait has a new signature
  - Operation VirtualMachineImageTemplates.beginCreateOrUpdate has a new signature
  - Operation VirtualMachineImageTemplates.beginCreateOrUpdateAndWait has a new signature
  - Operation VirtualMachineImageTemplates.beginDeleteAndWait has a new signature
  - Operation VirtualMachineImageTemplates.beginUpdate has a new signature
  - Operation VirtualMachineImageTemplates.beginUpdateAndWait has a new signature
  - Operation VirtualMachineImageTemplates.get has a new signature
  - Removed Interface RunOutputCollection
  - Removed Interface TriggerCollection
  - Type of parameter scheme of interface DistributeVersioner is changed from "Latest" | "Source" to string
  - Type of parameter type of interface ImageTemplateCustomizer is changed from "Shell" | "WindowsRestart" | "WindowsUpdate" | "PowerShell" | "File" to string
  - Type of parameter type of interface ImageTemplateDistributor is changed from "ManagedImage" | "SharedImage" | "VHD" to string
  - Type of parameter type of interface ImageTemplateInVMValidator is changed from "Shell" | "PowerShell" | "File" to string
  - Type of parameter type of interface ImageTemplateSource is changed from "PlatformImage" | "ManagedImage" | "SharedImageVersion" to string
  - Type of parameter kind of interface TriggerProperties is changed from "SourceImage" to string
  - Interface Trigger no longer has parameter kind
  - Interface Trigger no longer has parameter provisioningState
  - Interface Trigger no longer has parameter status
  - Type alias "DistributeVersionerUnion" has been changed
  - Type alias "ImageTemplateCustomizerUnion" has been changed
  - Type alias "ImageTemplateDistributorUnion" has been changed
  - Type alias "ImageTemplateInVMValidatorUnion" has been changed
  - Type alias "ImageTemplateSourceUnion" has been changed
  - Type alias "TriggerPropertiesUnion" has been changed

    
## 4.1.0 (2024-06-12)
    
### Features Added

  - Added Interface ImageTemplateAutoRun
  - Added Type Alias AutoRunState
  - Interface ImageTemplate has a new optional parameter autoRun
  - Interface ImageTemplate has a new optional parameter managedResourceTags
  - Interface ImageTemplateUpdateParametersProperties has a new optional parameter vmProfile
  - Interface VirtualNetworkConfig has a new optional parameter containerInstanceSubnetId
    
    
## 4.0.0 (2023-12-21)
    
### Features Added

  - Added Interface ErrorAdditionalInfo
  - Added Interface ImageTemplatePropertiesErrorHandling
  - Added Interface ImageTemplateUpdateParametersProperties
  - Added Type Alias OnBuildError
  - Added Type Alias TriggersDeleteResponse
  - Added Type Alias VirtualMachineImageTemplatesDeleteResponse
  - Interface ImageTemplate has a new optional parameter errorHandling
  - Interface ImageTemplateUpdateParameters has a new optional parameter properties
  - Added Enum KnownOnBuildError
    
### Breaking Changes

  - Changed interface CloudError to ErrorResponse
  - Changed interface CloudErrorBody ErrorDetail

  
## 3.0.0 (2023-03-24)
    
### Features Added

  - Added operation group Triggers
  - Added Interface DistributeVersioner
  - Added Interface DistributeVersionerLatest
  - Added Interface DistributeVersionerSource
  - Added Interface ImageTemplateFileValidator
  - Added Interface ImageTemplatePropertiesOptimize
  - Added Interface ImageTemplatePropertiesOptimizeVmBoot
  - Added Interface SourceImageTriggerProperties
  - Added Interface TargetRegion
  - Added Interface Trigger
  - Added Interface TriggerCollection
  - Added Interface TriggerProperties
  - Added Interface TriggersCreateOrUpdateOptionalParams
  - Added Interface TriggersDeleteHeaders
  - Added Interface TriggersDeleteOptionalParams
  - Added Interface TriggersGetOptionalParams
  - Added Interface TriggersListByImageTemplateNextOptionalParams
  - Added Interface TriggersListByImageTemplateOptionalParams
  - Added Interface TriggerStatus
  - Added Interface UserAssignedIdentity
  - Added Interface VirtualMachineImageTemplatesDeleteHeaders
  - Added Type Alias DistributeVersionerUnion
  - Added Type Alias TriggerPropertiesUnion
  - Added Type Alias TriggersCreateOrUpdateResponse
  - Added Type Alias TriggersGetResponse
  - Added Type Alias TriggersListByImageTemplateNextResponse
  - Added Type Alias TriggersListByImageTemplateResponse
  - Added Type Alias VMBootOptimizationState
  - Interface ImageTemplate has a new optional parameter optimize
  - Interface ImageTemplateSharedImageDistributor has a new optional parameter targetRegions
  - Interface ImageTemplateSharedImageDistributor has a new optional parameter versioning
  - Interface ImageTemplateSharedImageVersionSource has a new optional parameter exactVersion
  - Interface ImageTemplateVhdDistributor has a new optional parameter uri
  - Type of parameter type of interface ImageTemplateInVMValidator is changed from "Shell" | "PowerShell" to "Shell" | "PowerShell" | "File"
  - Enum KnownSharedImageStorageAccountType has a new value PremiumLRS

### Breaking Changes

  - Type of parameter userAssignedIdentities of interface ImageTemplateIdentity is changed from {
        [propertyName: string]: ComponentsVrq145SchemasImagetemplateidentityPropertiesUserassignedidentitiesAdditionalproperties;
    } to {
        [propertyName: string]: UserAssignedIdentity;
    }
    
    
## 2.1.0 (2023-01-11)
    
### Features Added

  - Added Interface ImageTemplate
  - Added Interface ImageTemplateFileCustomizer
  - Added Interface ImageTemplateManagedImageDistributor
  - Added Interface ImageTemplateManagedImageSource
  - Added Interface ImageTemplatePlatformImageSource
  - Added Interface ImageTemplatePowerShellCustomizer
  - Added Interface ImageTemplatePowerShellValidator
  - Added Interface ImageTemplateRestartCustomizer
  - Added Interface ImageTemplateSharedImageDistributor
  - Added Interface ImageTemplateSharedImageVersionSource
  - Added Interface ImageTemplateShellCustomizer
  - Added Interface ImageTemplateShellValidator
  - Added Interface ImageTemplateVhdDistributor
  - Added Interface ImageTemplateWindowsUpdateCustomizer
  - Added Interface ProxyResource
  - Added Interface RunOutput
  - Added Interface TrackedResource
  - Added function getContinuationToken
    
    
## 2.0.0 (2022-06-06)
    
### Features Added

  - Added Interface ImageTemplateInVMValidator
  - Added Interface ImageTemplatePropertiesValidate
  - Added Type Alias ImageTemplateInVMValidatorUnion
  - Added Type Alias ImageTemplatePowerShellValidator
  - Added Type Alias ImageTemplateShellValidator
  - Added Type Alias ProxyResource
  - Interface Resource has a new optional parameter systemData
  - Add parameters of ProxyResource to TypeAlias RunOutput
  - Type Alias ImageTemplate has a new parameter validate
  - Type Alias ImageTemplate has a new parameter stagingResourceGroup
  - Type Alias ImageTemplate has a new parameter exactStagingResourceGroup
  - Enum KnownProvisioningErrorCode has a new value BadStagingResourceGroup
  - Enum KnownProvisioningErrorCode has a new value BadValidatorType
  - Enum KnownProvisioningErrorCode has a new value NoValidatorScript
  - Enum KnownProvisioningErrorCode has a new value UnsupportedValidatorType

### Breaking Changes

  - Delete parameters of SubResource in TypeAlias RunOutput
  - Type Alias ImageTemplate no longer has parameter systemData
    
## 1.0.2 (2022-04-26)

### Features Added

  - Bug fix

## 1.0.1 (2022-01-11)

### Features Added

  - Bump version
    
## 1.0.0 (2022-01-10)

The package of @azure/arm-imagebuilder is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
