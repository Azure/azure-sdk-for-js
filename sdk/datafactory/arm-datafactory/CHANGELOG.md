# Release History

## 10.3.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.3.0 (2022-04-06)
    
**Features**

  - Added Interface ExecutePipelineActivityPolicy
  - Added Type Alias CredentialReferenceType
  - Added Type Alias DataFlowReferenceType
  - Added Type Alias ManagedVirtualNetworkReferenceType
  - Added Type Alias TriggerReferenceType
  - Type Alias ExecutePipelineActivity has a new parameter policy
  - Type Alias SqlServerStoredProcedureActivity has a new parameter storedProcedureParameters
  - Type Alias WebActivity has a new parameter disableCertValidation
  - Added Enum KnownCredentialReferenceType
  - Added Enum KnownDataFlowReferenceType
  - Added Enum KnownManagedVirtualNetworkReferenceType
  - Added Enum KnownTriggerReferenceType
    
    
## 10.2.0 (2022-02-22)
    
**Features**

  - Added Interface ScriptActivityParameter
  - Added Interface ScriptActivityScriptBlock
  - Added Interface ScriptActivityTypePropertiesLogSettings
  - Added Type Alias QuickbaseLinkedService
  - Added Type Alias ScriptActivity
  - Added Type Alias ScriptActivityLogDestination
  - Added Type Alias ScriptActivityParameterDirection
  - Added Type Alias ScriptActivityParameterType
  - Added Type Alias ScriptType
  - Added Type Alias SmartsheetLinkedService
  - Added Type Alias TeamDeskAuthenticationType
  - Added Type Alias TeamDeskLinkedService
  - Added Type Alias ZendeskAuthenticationType
  - Added Type Alias ZendeskLinkedService
  - Added Enum KnownScriptActivityLogDestination
  - Added Enum KnownScriptActivityParameterDirection
  - Added Enum KnownScriptActivityParameterType
  - Added Enum KnownScriptType
  - Added Enum KnownTeamDeskAuthenticationType
  - Added Enum KnownZendeskAuthenticationType
    
    
## 10.1.0 (2022-01-10)
    
**Features**

  - Added Type Alias FailActivity
  - Type Alias AzureBlobFSLinkedService has a new parameter servicePrincipalCredentialType
  - Type Alias AzureBlobFSLinkedService has a new parameter servicePrincipalCredential
  - Type Alias AzureDatabricksDeltaLakeLinkedService has a new parameter credential
  - Type Alias AzureDatabricksDeltaLakeLinkedService has a new parameter workspaceResourceId
  - Type Alias CosmosDbLinkedService has a new parameter credential
  - Type Alias DynamicsLinkedService has a new parameter credential
  - Type Alias GoogleAdWordsLinkedService has a new parameter connectionProperties
  - Type Alias LinkedIntegrationRuntimeRbacAuthorization has a new parameter credential
    
    
## 10.0.0 (2021-12-17)

The package of @azure/arm-datafactory is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
