# Release History

## 2.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.0 (2023-01-11)
    
**Features**

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
    
**Features**

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

**Breaking Changes**

  - Delete parameters of SubResource in TypeAlias RunOutput
  - Type Alias ImageTemplate no longer has parameter systemData
    
## 1.0.2 (2022-04-26)

**Features**

  - Bug fix

## 1.0.1 (2022-01-11)

**Feature**

  - Bump version
    
## 1.0.0 (2022-01-10)

The package of @azure/arm-imagebuilder is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
