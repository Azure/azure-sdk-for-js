# Release History

## 2.0.0 (2026-02-11)

### Features Added
  - Added operation group DeploymentStacksWhatIfResultsAtManagementGroupOperations
  - Added operation group DeploymentStacksWhatIfResultsAtResourceGroupOperations
  - Added operation group DeploymentStacksWhatIfResultsAtSubscriptionOperations
  - Added operation DeploymentStacksOperations.createOrUpdateAtManagementGroup
  - Added operation DeploymentStacksOperations.createOrUpdateAtResourceGroup
  - Added operation DeploymentStacksOperations.createOrUpdateAtSubscription
  - Added operation DeploymentStacksOperations.deleteAtManagementGroup
  - Added operation DeploymentStacksOperations.deleteAtResourceGroup
  - Added operation DeploymentStacksOperations.deleteAtSubscription
  - Added operation DeploymentStacksOperations.validateStackAtManagementGroup
  - Added operation DeploymentStacksOperations.validateStackAtResourceGroup
  - Added operation DeploymentStacksOperations.validateStackAtSubscription
  - Added Interface DeploymentExtension
  - Added Interface DeploymentExtensionConfig
  - Added Interface DeploymentExtensionConfigItem
  - Added Interface DeploymentExternalInput
  - Added Interface DeploymentExternalInputDefinition
  - Added Interface DeploymentStacksChangeBase
  - Added Interface DeploymentStacksChangeBaseDenyStatusMode
  - Added Interface DeploymentStacksChangeBaseDeploymentStacksManagementStatus
  - Added Interface DeploymentStacksChangeDeltaDenySettings
  - Added Interface DeploymentStacksChangeDeltaRecord
  - Added Interface DeploymentStacksDiagnostic
  - Added Interface DeploymentStacksWhatIfChange
  - Added Interface DeploymentStacksWhatIfPropertyChange
  - Added Interface DeploymentStacksWhatIfResourceChange
  - Added Interface DeploymentStacksWhatIfResult
  - Added Interface DeploymentStacksWhatIfResultProperties
  - Added Interface DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtManagementGroupDeleteOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtManagementGroupGetOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtManagementGroupListOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtSubscriptionDeleteOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtSubscriptionGetOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtSubscriptionListOptionalParams
  - Added Interface DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams
  - Added Interface ErrorResponse
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Interface ActionOnUnmanage has a new optional parameter resourcesWithoutDeleteSupport
  - Interface DeploymentParameter has a new optional parameter expression
  - Interface DeploymentStackProperties has a new optional parameter deploymentExtensions
  - Interface DeploymentStackProperties has a new optional parameter extensionConfigs
  - Interface DeploymentStackProperties has a new optional parameter externalInputDefinitions
  - Interface DeploymentStackProperties has a new optional parameter externalInputs
  - Interface DeploymentStackProperties has a new optional parameter validationLevel
  - Interface DeploymentStackValidateProperties has a new optional parameter deploymentExtensions
  - Interface DeploymentStackValidateProperties has a new optional parameter validationLevel
  - Interface ManagedResourceReference has a new optional parameter apiVersion
  - Interface ManagedResourceReference has a new optional parameter extension
  - Interface ManagedResourceReference has a new optional parameter identifiers
  - Interface ManagedResourceReference has a new optional parameter type
  - Interface ResourceReference has a new optional parameter apiVersion
  - Interface ResourceReference has a new optional parameter extension
  - Interface ResourceReference has a new optional parameter identifiers
  - Interface ResourceReference has a new optional parameter type
  - Interface ResourceReferenceExtended has a new optional parameter apiVersion
  - Interface ResourceReferenceExtended has a new optional parameter extension
  - Interface ResourceReferenceExtended has a new optional parameter identifiers
  - Interface ResourceReferenceExtended has a new optional parameter type
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DeploymentStacksDiagnosticLevel
  - Added Type Alias DeploymentStacksManagementStatus
  - Added Type Alias DeploymentStacksWhatIfChangeCertainty
  - Added Type Alias DeploymentStacksWhatIfChangeType
  - Added Type Alias DeploymentStacksWhatIfPropertyChangeType
  - Added Type Alias ResourcesWithoutDeleteSupportAction
  - Added Type Alias ValidationLevel
  - Added Enum AzureClouds
  - Added Enum KnownDeploymentStacksDiagnosticLevel
  - Added Enum KnownDeploymentStacksManagementStatus
  - Added Enum KnownDeploymentStacksWhatIfChangeCertainty
  - Added Enum KnownDeploymentStacksWhatIfChangeType
  - Added Enum KnownDeploymentStacksWhatIfPropertyChangeType
  - Added Enum KnownResourcesWithoutDeleteSupportAction
  - Added Enum KnownValidationLevel
  - Added Enum KnownVersions
  - Enum KnownDenyStatusMode has a new value Unknown
  - Enum KnownDeploymentStackProvisioningState has a new value Initializing
  - Enum KnownDeploymentStackProvisioningState has a new value Running

### Breaking Changes
  - Removed Interface AzureResourceBase
  - Removed Interface DeploymentStacksError
  - Removed Type Alias DeploymentStacksDeleteDetachEnum
  - Removed Enum KnownDeploymentStacksDeleteDetachEnum

    
## 1.0.0 (2024-06-24)

### Features Added

This is the first GA for @azure/arm-resourcesdeploymentstacks and the package is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
