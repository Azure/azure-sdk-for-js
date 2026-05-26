# Release History

## 8.0.0-beta.1 (2026-05-26)
Compared with version 7.0.0

### Features Added
  - Added operation ResourceGroupsOperations.delete
  - Added operation ResourceGroupsOperations.exportTemplate
  - Added operation ResourcesOperations.createOrUpdate
  - Added operation ResourcesOperations.createOrUpdateById
  - Added operation ResourcesOperations.delete
  - Added operation ResourcesOperations.deleteById
  - Added operation ResourcesOperations.moveResources
  - Added operation ResourcesOperations.update
  - Added operation ResourcesOperations.updateById
  - Added operation ResourcesOperations.validateMoveResources
  - Added operation TagsOperationsOperations.createOrUpdateAtScope
  - Added operation TagsOperationsOperations.deleteAtScope
  - Added operation TagsOperationsOperations.updateAtScope
  - Added Interface ErrorDetail
  - Added Interface ExtensionResource
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Added Interface TagsOperationsCreateOrUpdateAtScopeOptionalParams
  - Added Interface TagsOperationsCreateOrUpdateOptionalParams
  - Added Interface TagsOperationsCreateOrUpdateValueOptionalParams
  - Added Interface TagsOperationsDeleteAtScopeOptionalParams
  - Added Interface TagsOperationsDeleteOptionalParams
  - Added Interface TagsOperationsDeleteValueOptionalParams
  - Added Interface TagsOperationsGetAtScopeOptionalParams
  - Added Interface TagsOperationsListOptionalParams
  - Added Interface TagsOperationsUpdateAtScopeOptionalParams
  - Added Interface TrackedResource
  - Interface GenericResource has a new optional parameter systemData
  - Interface GenericResourceExpanded has a new optional parameter systemData
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceGroup has a new optional parameter systemData
  - Interface TagsResource has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownCreatedByType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Class ResourceManagementClient no longer has parameter apiVersion
  - Class ResourceManagementClient no longer has parameter subscriptionId
  - Removed Interface GenericResourceFilter
  - Removed Interface ResourceGroupFilter
  - Removed Interface ResourceProviderOperationDisplayProperties
  - Removed Interface SubResource
  - Removed Interface TagsCreateOrUpdateAtScopeOptionalParams
  - Removed Interface TagsCreateOrUpdateOptionalParams
  - Removed Interface TagsCreateOrUpdateValueOptionalParams
  - Removed Interface TagsDeleteAtScopeOptionalParams
  - Removed Interface TagsDeleteOptionalParams
  - Removed Interface TagsDeleteValueOptionalParams
  - Removed Interface TagsGetAtScopeOptionalParams
  - Removed Interface TagsListOptionalParams
  - Removed Interface TagsUpdateAtScopeOptionalParams
  - Interface Resource no longer has parameter extendedLocation
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Parameter value of interface ProviderPermissionListResult is now required
  - Parameter value of interface ProviderResourceTypeListResult is now required

    
## 7.0.0 (2025-06-10)
    
- operation groups `DeploymentOperations` and `Deployments` has been split into an independent library [`@azure/arm-resourcesdeployment`](https://www.npmjs.com/package/@azure/arm-resourcesdeployments/v/1.0.0-beta.1).

### Breaking Changes

  - Removed operation group DeploymentOperations
  - Removed operation group Deployments
  - Class ResourceManagementClient no longer has parameter deploymentOperations
  - Class ResourceManagementClient no longer has parameter deployments
  - Removed Enum KnownExpressionEvaluationOptionsScopeType
  - Removed Enum KnownExtensionConfigPropertyType
  - Removed Enum KnownLevel
  - Removed Enum KnownProvisioningState
  - Removed Enum KnownValidationLevel
    
    
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
