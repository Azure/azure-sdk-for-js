# Release History

## 3.0.0-beta.1 (2025-07-21)
Compared with version 2.1.0

### Features Added
  - Added operation AgentsOperations.delete
  - Added operation EndpointsOperations.delete
  - Added operation JobDefinitionsOperations.delete
  - Added operation ProjectsOperations.delete
  - Added operation StorageMoversOperations.delete
  - Added Interface AgentProperties
  - Added Interface AgentUpdateProperties
  - Added Interface JobDefinitionProperties
  - Added Interface JobDefinitionUpdateProperties
  - Added Interface JobRunProperties
  - Added Interface PageSettings
  - Added Interface ProjectProperties
  - Added Interface ProjectUpdateProperties
  - Added Interface StorageMoverProperties
  - Added Interface StorageMoverUpdateProperties
  - Interface AgentUpdateParameters has a new optional parameter properties
  - Interface JobDefinitionUpdateParameters has a new optional parameter properties
  - Interface JobRun has a new optional parameter properties
  - Interface Project has a new optional parameter properties
  - Interface ProjectUpdateParameters has a new optional parameter properties
  - Interface StorageMover has a new optional parameter properties
  - Interface StorageMoverUpdateParameters has a new optional parameter properties
  - Added Enum KnownVersions
  - Enum KnownMinute has a new value _0
  - Enum KnownMinute has a new value _30

### Breaking Changes
  - Removed operation Agents.beginDelete
  - Removed operation Agents.beginDeleteAndWait
  - Removed operation Endpoints.beginDelete
  - Removed operation Endpoints.beginDeleteAndWait
  - Removed operation JobDefinitions.beginDelete
  - Removed operation JobDefinitions.beginDeleteAndWait
  - Removed operation Projects.beginDelete
  - Removed operation Projects.beginDeleteAndWait
  - Removed operation StorageMovers.beginDelete
  - Removed operation StorageMovers.beginDeleteAndWait
  - Operation Agents.createOrUpdate has a new signature
  - Operation Agents.get has a new signature
  - Operation Agents.update has a new signature
  - Operation Endpoints.createOrUpdate has a new signature
  - Operation Endpoints.get has a new signature
  - Operation Endpoints.update has a new signature
  - Operation JobDefinitions.createOrUpdate has a new signature
  - Operation JobDefinitions.get has a new signature
  - Operation JobDefinitions.update has a new signature
  - Operation Projects.update has a new signature
  - Class StorageMoverClient no longer has parameter $host
  - Class StorageMoverClient no longer has parameter apiVersion
  - Class StorageMoverClient no longer has parameter subscriptionId
  - Removed Interface AgentList
  - Removed Interface EndpointList
  - Removed Interface JobDefinitionList
  - Removed Interface JobRunList
  - Removed Interface OperationListResult
  - Removed Interface ProjectList
  - Removed Interface StorageMoverList
  - Removed Interface UploadLimit
  - Interface Agent has a new required parameter properties
  - Interface JobDefinition has a new required parameter properties
  - Type of parameter type of interface Credentials is changed from "AzureKeyVaultSmb" to CredentialType
  - Type of parameter endpointType of interface EndpointBaseProperties is changed from "AzureStorageBlobContainer" | "NfsMount" | "AzureStorageSmbFileShare" | "SmbMount" to EndpointType
  - Type of parameter endpointType of interface EndpointBaseUpdateProperties is changed from "AzureStorageBlobContainer" | "NfsMount" | "AzureStorageSmbFileShare" | "SmbMount" to EndpointType
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to any
  - Interface Agent no longer has parameter agentStatus
  - Interface Agent no longer has parameter agentVersion
  - Interface Agent no longer has parameter arcResourceId
  - Interface Agent no longer has parameter arcVmUuid
  - Interface Agent no longer has parameter description
  - Interface Agent no longer has parameter errorDetails
  - Interface Agent no longer has parameter lastStatusUpdate
  - Interface Agent no longer has parameter localIPAddress
  - Interface Agent no longer has parameter memoryInMB
  - Interface Agent no longer has parameter numberOfCores
  - Interface Agent no longer has parameter provisioningState
  - Interface Agent no longer has parameter timeZone
  - Interface Agent no longer has parameter uploadLimitSchedule
  - Interface Agent no longer has parameter uptimeInSeconds
  - Interface AgentsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface AgentUpdateParameters no longer has parameter description
  - Interface AgentUpdateParameters no longer has parameter uploadLimitSchedule
  - Interface EndpointsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface JobDefinition no longer has parameter agentName
  - Interface JobDefinition no longer has parameter agentResourceId
  - Interface JobDefinition no longer has parameter copyMode
  - Interface JobDefinition no longer has parameter description
  - Interface JobDefinition no longer has parameter latestJobRunName
  - Interface JobDefinition no longer has parameter latestJobRunResourceId
  - Interface JobDefinition no longer has parameter latestJobRunStatus
  - Interface JobDefinition no longer has parameter provisioningState
  - Interface JobDefinition no longer has parameter sourceName
  - Interface JobDefinition no longer has parameter sourceResourceId
  - Interface JobDefinition no longer has parameter sourceSubpath
  - Interface JobDefinition no longer has parameter targetName
  - Interface JobDefinition no longer has parameter targetResourceId
  - Interface JobDefinition no longer has parameter targetSubpath
  - Interface JobDefinitionsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface JobDefinitionUpdateParameters no longer has parameter agentName
  - Interface JobDefinitionUpdateParameters no longer has parameter copyMode
  - Interface JobDefinitionUpdateParameters no longer has parameter description
  - Interface JobRun no longer has parameter agentName
  - Interface JobRun no longer has parameter agentResourceId
  - Interface JobRun no longer has parameter bytesExcluded
  - Interface JobRun no longer has parameter bytesFailed
  - Interface JobRun no longer has parameter bytesNoTransferNeeded
  - Interface JobRun no longer has parameter bytesScanned
  - Interface JobRun no longer has parameter bytesTransferred
  - Interface JobRun no longer has parameter bytesUnsupported
  - Interface JobRun no longer has parameter error
  - Interface JobRun no longer has parameter executionEndTime
  - Interface JobRun no longer has parameter executionStartTime
  - Interface JobRun no longer has parameter itemsExcluded
  - Interface JobRun no longer has parameter itemsFailed
  - Interface JobRun no longer has parameter itemsNoTransferNeeded
  - Interface JobRun no longer has parameter itemsScanned
  - Interface JobRun no longer has parameter itemsTransferred
  - Interface JobRun no longer has parameter itemsUnsupported
  - Interface JobRun no longer has parameter jobDefinitionProperties
  - Interface JobRun no longer has parameter lastStatusUpdate
  - Interface JobRun no longer has parameter provisioningState
  - Interface JobRun no longer has parameter scanStatus
  - Interface JobRun no longer has parameter sourceName
  - Interface JobRun no longer has parameter sourceProperties
  - Interface JobRun no longer has parameter sourceResourceId
  - Interface JobRun no longer has parameter status
  - Interface JobRun no longer has parameter targetName
  - Interface JobRun no longer has parameter targetProperties
  - Interface JobRun no longer has parameter targetResourceId
  - Interface Project no longer has parameter description
  - Interface Project no longer has parameter provisioningState
  - Interface ProjectsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ProjectUpdateParameters no longer has parameter description
  - Interface StorageMover no longer has parameter description
  - Interface StorageMover no longer has parameter provisioningState
  - Interface StorageMoverClientOptionalParams no longer has parameter $host
  - Interface StorageMoverClientOptionalParams no longer has parameter endpoint
  - Interface StorageMoversDeleteOptionalParams no longer has parameter resumeFrom
  - Interface StorageMoverUpdateParameters no longer has parameter description
  - Removed Type Alias AgentsCreateOrUpdateResponse
  - Removed Type Alias AgentsGetResponse
  - Removed Type Alias AgentsListNextResponse
  - Removed Type Alias AgentsListResponse
  - Removed Type Alias AgentsUpdateResponse
  - Removed Type Alias EndpointsCreateOrUpdateResponse
  - Removed Type Alias EndpointsGetResponse
  - Removed Type Alias EndpointsListNextResponse
  - Removed Type Alias EndpointsListResponse
  - Removed Type Alias EndpointsUpdateResponse
  - Removed Type Alias JobDefinitionsCreateOrUpdateResponse
  - Removed Type Alias JobDefinitionsGetResponse
  - Removed Type Alias JobDefinitionsListNextResponse
  - Removed Type Alias JobDefinitionsListResponse
  - Removed Type Alias JobDefinitionsStartJobResponse
  - Removed Type Alias JobDefinitionsStopJobResponse
  - Removed Type Alias JobDefinitionsUpdateResponse
  - Removed Type Alias JobRunsGetResponse
  - Removed Type Alias JobRunsListNextResponse
  - Removed Type Alias JobRunsListResponse
  - Removed Type Alias OperationsListNextResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias ProjectsCreateOrUpdateResponse
  - Removed Type Alias ProjectsGetResponse
  - Removed Type Alias ProjectsListNextResponse
  - Removed Type Alias ProjectsListResponse
  - Removed Type Alias ProjectsUpdateResponse
  - Removed Type Alias StorageMoversCreateOrUpdateResponse
  - Removed Type Alias StorageMoversGetResponse
  - Removed Type Alias StorageMoversListBySubscriptionNextResponse
  - Removed Type Alias StorageMoversListBySubscriptionResponse
  - Removed Type Alias StorageMoversListNextResponse
  - Removed Type Alias StorageMoversListResponse
  - Removed Type Alias StorageMoversUpdateResponse
  - Type alias "CredentialsUnion" has been changed
  - Type alias "EndpointBasePropertiesUnion" has been changed
  - Type alias "EndpointBaseUpdatePropertiesUnion" has been changed
  - Removed function getContinuationToken
  - Enum KnownMinute no longer has value Thirty
  - Enum KnownMinute no longer has value Zero

    
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
