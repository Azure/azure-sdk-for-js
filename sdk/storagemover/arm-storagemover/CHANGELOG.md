# Release History

## 2.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.0 (2024-06-13)
    
### Features Added

  - Added Interface Recurrence
  - Added Interface Time
  - Added Interface UploadLimit
  - Added Interface UploadLimitSchedule
  - Added Interface UploadLimitWeeklyRecurrence
  - Added Interface WeeklyRecurrence
  - Added Type Alias DayOfWeek
  - Added Type Alias Minute
  - Interface Agent has a new optional parameter timeZone
  - Interface Agent has a new optional parameter uploadLimitSchedule
  - Interface AgentUpdateParameters has a new optional parameter uploadLimitSchedule
  - Added Enum KnownMinute
  - Enum KnownJobRunStatus has a new value PausedByBandwidthManagement
  - Enum KnownProvisioningState has a new value Canceled
  - Enum KnownProvisioningState has a new value Deleting
  - Enum KnownProvisioningState has a new value Failed
    
    
## 2.0.0 (2023-10-07)
    
### Features Added

  - Added Interface AzureKeyVaultSmbCredentials
  - Added Interface AzureStorageSmbFileShareEndpointProperties
  - Added Interface AzureStorageSmbFileShareEndpointUpdateProperties
  - Added Interface Credentials
  - Added Interface SmbMountEndpointProperties
  - Added Interface SmbMountEndpointUpdateProperties
  - Added Type Alias CredentialsUnion
  - Added Type Alias CredentialType
  - Added Type Alias EndpointBaseUpdatePropertiesUnion
  - Interface Resource has a new optional parameter systemData
  - Type of parameter endpointType of interface EndpointBaseProperties is changed from "AzureStorageBlobContainer" | "NfsMount" to "AzureStorageBlobContainer" | "NfsMount" | "AzureStorageSmbFileShare" | "SmbMount"
  - Added Enum KnownCredentialType
  - Enum KnownEndpointType has a new value AzureStorageSmbFileShare
  - Enum KnownEndpointType has a new value SmbMount
  - Interface Agent no longer has parameter systemData
  - Interface Endpoint no longer has parameter systemData
  - Interface JobDefinition no longer has parameter systemData
  - Interface JobRun no longer has parameter systemData
  - Interface Project no longer has parameter systemData
  - Interface StorageMover no longer has parameter systemData
  
### Breaking Changes

  - Interface AzureStorageBlobContainerEndpointUpdateProperties has a new required parameter endpointType
  - Interface EndpointBaseUpdateProperties has a new required parameter endpointType
  - Interface NfsMountEndpointUpdateProperties has a new required parameter endpointType
  - Type of parameter properties of interface EndpointBaseUpdateParameters is changed from EndpointBaseUpdateProperties to EndpointBaseUpdatePropertiesUnion
    
    
## 2.0.0-beta.1 (2023-07-12)
    
### Features Added

  - Added Interface AzureKeyVaultSmbCredentials
  - Added Interface AzureStorageSmbFileShareEndpointProperties
  - Added Interface AzureStorageSmbFileShareEndpointUpdateProperties
  - Added Interface Credentials
  - Added Interface SmbMountEndpointProperties
  - Added Interface SmbMountEndpointUpdateProperties
  - Added Type Alias CredentialsUnion
  - Added Type Alias CredentialType
  - Added Type Alias EndpointBaseUpdatePropertiesUnion
  - Interface Resource has a new optional parameter systemData
  - Type of parameter endpointType of interface EndpointBaseProperties is changed from "AzureStorageBlobContainer" | "NfsMount" to "AzureStorageBlobContainer" | "NfsMount" | "AzureStorageSmbFileShare" | "SmbMount"
  - Added Enum KnownCredentialType
  - Enum KnownEndpointType has a new value AzureStorageSmbFileShare
  - Enum KnownEndpointType has a new value SmbMount
  - Interface Agent no longer has parameter systemData
  - Interface Endpoint no longer has parameter systemData
  - Interface JobDefinition no longer has parameter systemData
  - Interface JobRun no longer has parameter systemData
  - Interface Project no longer has parameter systemData
  - Interface StorageMover no longer has parameter systemData
  
### Breaking Changes

  - Interface AzureStorageBlobContainerEndpointUpdateProperties has a new required parameter endpointType
  - Interface EndpointBaseUpdateProperties has a new required parameter endpointType
  - Interface NfsMountEndpointUpdateProperties has a new required parameter endpointType
  - Type of parameter properties of interface EndpointBaseUpdateParameters is changed from EndpointBaseUpdateProperties to EndpointBaseUpdatePropertiesUnion
    
    
## 1.0.0 (2023-03-07)

The package of @azure/arm-storagemover is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
