# Release History
    
## 6.0.0 (2023-05-11)
    
**Features**

  - Added Interface AzureBlobDefinition
  - Added Interface AzureBlobPatchDefinition
  - Added Interface ManagedIdentityDefinition
  - Added Interface ManagedIdentityPatchDefinition
  - Added Interface Plan
  - Added Interface ServicePrincipalDefinition
  - Added Interface ServicePrincipalPatchDefinition
  - Interface Extension has a new optional parameter currentVersion
  - Interface Extension has a new optional parameter isSystemExtension
  - Interface Extension has a new optional parameter plan
  - Interface FluxConfiguration has a new optional parameter azureBlob
  - Interface FluxConfigurationPatch has a new optional parameter azureBlob
  - Enum KnownSourceKindType has a new value AzureBlob

**Breaking Changes**

  - Interface Extension no longer has parameter installedVersion
    
    
## 5.1.0 (2022-11-28)
    
**Features**

  - Added Interface Extension
  - Added Interface FluxConfiguration
  - Added Interface ProxyResource
  - Added Interface SourceControlConfiguration
    
    
## 5.0.0 (2022-04-06)

The package of @azure/arm-kubernetesconfiguration is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
