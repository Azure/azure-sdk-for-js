# Release History
    
## 6.1.0 (2025-05-14)
    
### Features Added

  - Added Interface DeploymentExtensionConfigItem
  - Added Interface DeploymentExtensionDefinition
  - Added Type Alias ExtensionConfigPropertyType
  - Interface DeploymentProperties has a new optional parameter extensionConfigs
  - Interface DeploymentPropertiesExtended has a new optional parameter extensions
  - Interface ResourceReference has a new optional parameter apiVersion
  - Interface ResourceReference has a new optional parameter extension
  - Interface ResourceReference has a new optional parameter identifiers
  - Interface ResourceReference has a new optional parameter resourceType
  - Interface TargetResource has a new optional parameter apiVersion
  - Interface TargetResource has a new optional parameter extension
  - Interface TargetResource has a new optional parameter identifiers
  - Interface TargetResource has a new optional parameter symbolicName
  - Added Enum KnownExtensionConfigPropertyType
    
    
## 6.0.0 (2025-02-19)
    
### Features Added

  - Added operation TagsOperations.beginCreateOrUpdateAtScope
  - Added operation TagsOperations.beginCreateOrUpdateAtScopeAndWait
  - Added operation TagsOperations.beginDeleteAtScope
  - Added operation TagsOperations.beginDeleteAtScopeAndWait
  - Added operation TagsOperations.beginUpdateAtScope
  - Added operation TagsOperations.beginUpdateAtScopeAndWait
  - Added Interface DeploymentDiagnosticsDefinition
  - Added Interface DeploymentParameter
  - Added Interface KeyVaultParameterReference
  - Added Interface KeyVaultReference
  - Added Interface ResourceGroupsDeleteHeaders
  - Added Interface TagsCreateOrUpdateAtScopeHeaders
  - Added Interface TagsDeleteAtScopeHeaders
  - Added Interface TagsUpdateAtScopeHeaders
  - Added Type Alias ExportTemplateOutputFormat
  - Added Type Alias Level
  - Added Type Alias ValidationLevel
  - Interface DeploymentProperties has a new optional parameter validationLevel
  - Interface DeploymentPropertiesExtended has a new optional parameter diagnostics
  - Interface DeploymentPropertiesExtended has a new optional parameter validationLevel
  - Interface DeploymentValidateResult has a new optional parameter id
  - Interface DeploymentValidateResult has a new optional parameter name
  - Interface DeploymentValidateResult has a new optional parameter type
  - Interface ExportTemplateRequest has a new optional parameter outputFormat
  - Interface ResourceGroupExportResult has a new optional parameter output
  - Interface TagsCreateOrUpdateAtScopeOptionalParams has a new optional parameter resumeFrom
  - Interface TagsCreateOrUpdateAtScopeOptionalParams has a new optional parameter updateIntervalInMs
  - Interface TagsDeleteAtScopeOptionalParams has a new optional parameter resumeFrom
  - Interface TagsDeleteAtScopeOptionalParams has a new optional parameter updateIntervalInMs
  - Interface TagsUpdateAtScopeOptionalParams has a new optional parameter resumeFrom
  - Interface TagsUpdateAtScopeOptionalParams has a new optional parameter updateIntervalInMs
  - Interface WhatIfChange has a new optional parameter deploymentId
  - Interface WhatIfChange has a new optional parameter identifiers
  - Interface WhatIfChange has a new optional parameter symbolicName
  - Interface WhatIfOperationResult has a new optional parameter diagnostics
  - Interface WhatIfOperationResult has a new optional parameter potentialChanges
  - Added Enum KnownExportTemplateOutputFormat
  - Added Enum KnownLevel
  - Added Enum KnownValidationLevel

### Breaking Changes

  - Removed operation TagsOperations.createOrUpdateAtScope
  - Removed operation TagsOperations.deleteAtScope
  - Removed operation TagsOperations.updateAtScope
  - Class ResourceManagementClient has a new signature
  - Type of parameter parameters of interface DeploymentProperties is changed from Record<string, unknown> to {
        [propertyName: string]: DeploymentParameter;
    }
    
    
## 5.2.0 (2023-03-13)
    
### Features Added

  - Interface DeploymentOperationsListAtManagementGroupScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentOperationsListAtScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentOperationsListAtSubscriptionScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentOperationsListAtTenantScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentOperationsListNextOptionalParams no longer has parameter top
  - Interface DeploymentsListAtManagementGroupScopeNextOptionalParams no longer has parameter filter
  - Interface DeploymentsListAtManagementGroupScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentsListAtScopeNextOptionalParams no longer has parameter filter
  - Interface DeploymentsListAtScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentsListAtSubscriptionScopeNextOptionalParams no longer has parameter filter
  - Interface DeploymentsListAtSubscriptionScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentsListAtTenantScopeNextOptionalParams no longer has parameter filter
  - Interface DeploymentsListAtTenantScopeNextOptionalParams no longer has parameter top
  - Interface DeploymentsListByResourceGroupNextOptionalParams no longer has parameter filter
  - Interface DeploymentsListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface ProvidersListAtTenantScopeNextOptionalParams no longer has parameter expand
  - Interface ProvidersListNextOptionalParams no longer has parameter expand
  - Interface ResourceGroupsListNextOptionalParams no longer has parameter filter
  - Interface ResourceGroupsListNextOptionalParams no longer has parameter top
  - Interface ResourcesListByResourceGroupNextOptionalParams no longer has parameter expand
  - Interface ResourcesListByResourceGroupNextOptionalParams no longer has parameter filter
  - Interface ResourcesListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface ResourcesListNextOptionalParams no longer has parameter expand
  - Interface ResourcesListNextOptionalParams no longer has parameter filter
  - Interface ResourcesListNextOptionalParams no longer has parameter top
    
    
## 5.1.0 (2022-11-10)
    
### Features Added

  - Added Interface DeploymentWhatIfProperties
  - Added Interface GenericResource
  - Added Interface GenericResourceExpanded
    
## 5.0.1 (2022-04-18)

### Features Added

  - Bug fix

## 5.0.0 (2021-12-06)

The package of @azure/arm-resources is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
