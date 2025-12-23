# Release History

## 1.1.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.1 (2025-08-22)

### Other Changes

  - Other fixes

## 1.1.0 (2024-04-22)
    
### Features Added

  - Added operation group CheckScopedNameAvailability
  - Added operation group EnvironmentDefinitions
  - Added operation group ProjectCatalogEnvironmentDefinitions
  - Added operation group ProjectCatalogs
  - Added operation Catalogs.beginConnect
  - Added operation Catalogs.beginConnectAndWait
  - Added operation Catalogs.getSyncErrorDetails
  - Added Interface AttachedNetworksDeleteHeaders
  - Added Interface CatalogConflictError
  - Added Interface CatalogErrorDetails
  - Added Interface CatalogResourceValidationErrorDetails
  - Added Interface CatalogsConnectHeaders
  - Added Interface CatalogsConnectOptionalParams
  - Added Interface CatalogsDeleteHeaders
  - Added Interface CatalogsGetSyncErrorDetailsOptionalParams
  - Added Interface CatalogsSyncHeaders
  - Added Interface CatalogsUpdateHeaders
  - Added Interface CatalogSyncError
  - Added Interface CheckScopedNameAvailabilityExecuteOptionalParams
  - Added Interface CheckScopedNameAvailabilityRequest
  - Added Interface CustomerManagedKeyEncryption
  - Added Interface CustomerManagedKeyEncryptionKeyIdentity
  - Added Interface DevBoxDefinitionsDeleteHeaders
  - Added Interface DevBoxDefinitionsUpdateHeaders
  - Added Interface DevCenterProjectCatalogSettings
  - Added Interface DevCenterProperties
  - Added Interface DevCentersDeleteHeaders
  - Added Interface DevCentersUpdateHeaders
  - Added Interface DevCenterUpdateProperties
  - Added Interface Encryption
  - Added Interface EnvironmentDefinition
  - Added Interface EnvironmentDefinitionListResult
  - Added Interface EnvironmentDefinitionParameter
  - Added Interface EnvironmentDefinitionsGetByProjectCatalogOptionalParams
  - Added Interface EnvironmentDefinitionsGetErrorDetailsOptionalParams
  - Added Interface EnvironmentDefinitionsGetOptionalParams
  - Added Interface EnvironmentDefinitionsListByCatalogNextOptionalParams
  - Added Interface EnvironmentDefinitionsListByCatalogOptionalParams
  - Added Interface EnvironmentDefinitionsListByProjectCatalogNextOptionalParams
  - Added Interface EnvironmentDefinitionsListByProjectCatalogOptionalParams
  - Added Interface EnvironmentTypeProperties
  - Added Interface EnvironmentTypeUpdateProperties
  - Added Interface GalleriesDeleteHeaders
  - Added Interface NetworkConnectionsDeleteHeaders
  - Added Interface NetworkConnectionsRunHealthChecksHeaders
  - Added Interface NetworkConnectionsUpdateHeaders
  - Added Interface OperationStatusesGetHeaders
  - Added Interface PoolsDeleteHeaders
  - Added Interface PoolsRunHealthChecksHeaders
  - Added Interface PoolsUpdateHeaders
  - Added Interface ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams
  - Added Interface ProjectCatalogsConnectHeaders
  - Added Interface ProjectCatalogsConnectOptionalParams
  - Added Interface ProjectCatalogsCreateOrUpdateOptionalParams
  - Added Interface ProjectCatalogsDeleteHeaders
  - Added Interface ProjectCatalogsDeleteOptionalParams
  - Added Interface ProjectCatalogSettings
  - Added Interface ProjectCatalogsGetOptionalParams
  - Added Interface ProjectCatalogsGetSyncErrorDetailsOptionalParams
  - Added Interface ProjectCatalogsListNextOptionalParams
  - Added Interface ProjectCatalogsListOptionalParams
  - Added Interface ProjectCatalogsPatchHeaders
  - Added Interface ProjectCatalogsPatchOptionalParams
  - Added Interface ProjectCatalogsSyncHeaders
  - Added Interface ProjectCatalogsSyncOptionalParams
  - Added Interface ProjectsDeleteHeaders
  - Added Interface ProjectsUpdateHeaders
  - Added Interface SchedulesDeleteHeaders
  - Added Interface SchedulesUpdateHeaders
  - Added Interface SyncErrorDetails
  - Added Interface SyncStats
  - Added Type Alias AttachedNetworksDeleteResponse
  - Added Type Alias CatalogConnectionState
  - Added Type Alias CatalogItemSyncEnableStatus
  - Added Type Alias CatalogItemType
  - Added Type Alias CatalogResourceValidationStatus
  - Added Type Alias CatalogsConnectResponse
  - Added Type Alias CatalogsDeleteResponse
  - Added Type Alias CatalogsGetSyncErrorDetailsResponse
  - Added Type Alias CatalogsSyncResponse
  - Added Type Alias CatalogSyncType
  - Added Type Alias CheckScopedNameAvailabilityExecuteResponse
  - Added Type Alias DevBoxDefinitionsDeleteResponse
  - Added Type Alias DevCentersDeleteResponse
  - Added Type Alias EnvironmentDefinitionsGetByProjectCatalogResponse
  - Added Type Alias EnvironmentDefinitionsGetErrorDetailsResponse
  - Added Type Alias EnvironmentDefinitionsGetResponse
  - Added Type Alias EnvironmentDefinitionsListByCatalogNextResponse
  - Added Type Alias EnvironmentDefinitionsListByCatalogResponse
  - Added Type Alias EnvironmentDefinitionsListByProjectCatalogNextResponse
  - Added Type Alias EnvironmentDefinitionsListByProjectCatalogResponse
  - Added Type Alias GalleriesDeleteResponse
  - Added Type Alias IdentityType
  - Added Type Alias NetworkConnectionsDeleteResponse
  - Added Type Alias NetworkConnectionsRunHealthChecksResponse
  - Added Type Alias ParameterType
  - Added Type Alias PoolsDeleteResponse
  - Added Type Alias PoolsRunHealthChecksResponse
  - Added Type Alias ProjectCatalogEnvironmentDefinitionsGetErrorDetailsResponse
  - Added Type Alias ProjectCatalogsConnectResponse
  - Added Type Alias ProjectCatalogsCreateOrUpdateResponse
  - Added Type Alias ProjectCatalogsDeleteResponse
  - Added Type Alias ProjectCatalogsGetResponse
  - Added Type Alias ProjectCatalogsGetSyncErrorDetailsResponse
  - Added Type Alias ProjectCatalogsListNextResponse
  - Added Type Alias ProjectCatalogsListResponse
  - Added Type Alias ProjectCatalogsPatchResponse
  - Added Type Alias ProjectCatalogsSyncResponse
  - Added Type Alias ProjectsDeleteResponse
  - Added Type Alias SchedulesDeleteResponse
  - Added Type Alias SingleSignOnStatus
  - Added Type Alias VirtualNetworkType
  - Interface AllowedEnvironmentType has a new optional parameter displayName
  - Interface Catalog has a new optional parameter connectionState
  - Interface Catalog has a new optional parameter lastConnectionTime
  - Interface Catalog has a new optional parameter lastSyncStats
  - Interface Catalog has a new optional parameter syncType
  - Interface Catalog has a new optional parameter tags
  - Interface CatalogProperties has a new optional parameter connectionState
  - Interface CatalogProperties has a new optional parameter lastConnectionTime
  - Interface CatalogProperties has a new optional parameter lastSyncStats
  - Interface CatalogUpdate has a new optional parameter syncType
  - Interface CatalogUpdateProperties has a new optional parameter syncType
  - Interface CatalogUpdateProperties has a new optional parameter tags
  - Interface DevBoxDefinition has a new optional parameter validationStatus
  - Interface DevBoxDefinitionProperties has a new optional parameter validationStatus
  - Interface DevCenter has a new optional parameter displayName
  - Interface DevCenter has a new optional parameter encryption
  - Interface DevCenter has a new optional parameter projectCatalogSettings
  - Interface DevCenterUpdate has a new optional parameter displayName
  - Interface DevCenterUpdate has a new optional parameter encryption
  - Interface DevCenterUpdate has a new optional parameter projectCatalogSettings
  - Interface EnvironmentType has a new optional parameter displayName
  - Interface EnvironmentTypeUpdate has a new optional parameter displayName
  - Interface OperationStatusResult has a new optional parameter resourceId
  - Interface Pool has a new optional parameter devBoxCount
  - Interface Pool has a new optional parameter displayName
  - Interface Pool has a new optional parameter managedVirtualNetworkRegions
  - Interface Pool has a new optional parameter singleSignOnStatus
  - Interface Pool has a new optional parameter virtualNetworkType
  - Interface PoolProperties has a new optional parameter devBoxCount
  - Interface PoolUpdate has a new optional parameter displayName
  - Interface PoolUpdate has a new optional parameter managedVirtualNetworkRegions
  - Interface PoolUpdate has a new optional parameter singleSignOnStatus
  - Interface PoolUpdate has a new optional parameter virtualNetworkType
  - Interface PoolUpdateProperties has a new optional parameter displayName
  - Interface PoolUpdateProperties has a new optional parameter managedVirtualNetworkRegions
  - Interface PoolUpdateProperties has a new optional parameter singleSignOnStatus
  - Interface PoolUpdateProperties has a new optional parameter virtualNetworkType
  - Interface Project has a new optional parameter catalogSettings
  - Interface Project has a new optional parameter displayName
  - Interface Project has a new optional parameter identity
  - Interface ProjectEnvironmentType has a new optional parameter displayName
  - Interface ProjectEnvironmentType has a new optional parameter environmentCount
  - Interface ProjectEnvironmentTypeProperties has a new optional parameter environmentCount
  - Interface ProjectEnvironmentTypeUpdate has a new optional parameter displayName
  - Interface ProjectEnvironmentTypeUpdateProperties has a new optional parameter displayName
  - Interface ProjectUpdate has a new optional parameter catalogSettings
  - Interface ProjectUpdate has a new optional parameter displayName
  - Interface ProjectUpdate has a new optional parameter identity
  - Interface ProjectUpdateProperties has a new optional parameter catalogSettings
  - Interface ProjectUpdateProperties has a new optional parameter displayName
  - Interface Schedule has a new optional parameter location
  - Interface Schedule has a new optional parameter tags
  - Interface ScheduleUpdate has a new optional parameter location
  - Interface ScheduleUpdate has a new optional parameter tags
  - Interface Usage has a new optional parameter id
  - Added Enum KnownCatalogConnectionState
  - Added Enum KnownCatalogItemSyncEnableStatus
  - Added Enum KnownCatalogItemType
  - Added Enum KnownCatalogResourceValidationStatus
  - Added Enum KnownCatalogSyncType
  - Added Enum KnownIdentityType
  - Added Enum KnownParameterType
  - Added Enum KnownSingleSignOnStatus
  - Added Enum KnownVirtualNetworkType
    
    
## 1.1.0-beta.1 (2023-10-17)
    
### Features Added

  - Added operation group CatalogDevBoxDefinitions
  - Added operation group CustomizationTasks
  - Added operation group EnvironmentDefinitions
  - Added operation Catalogs.beginConnect
  - Added operation Catalogs.beginConnectAndWait
  - Added operation Catalogs.getSyncErrorDetails
  - Added Interface CatalogConflictError
  - Added Interface CatalogDevBoxDefinitionsGetErrorDetailsOptionalParams
  - Added Interface CatalogDevBoxDefinitionsGetOptionalParams
  - Added Interface CatalogDevBoxDefinitionsListByCatalogNextOptionalParams
  - Added Interface CatalogDevBoxDefinitionsListByCatalogOptionalParams
  - Added Interface CatalogErrorDetails
  - Added Interface CatalogResourceValidationErrorDetails
  - Added Interface CatalogsConnectOptionalParams
  - Added Interface CatalogsGetSyncErrorDetailsOptionalParams
  - Added Interface CatalogSyncError
  - Added Interface CustomerManagedKeyEncryption
  - Added Interface CustomerManagedKeyEncryptionKeyIdentity
  - Added Interface CustomizationTask
  - Added Interface CustomizationTaskInput
  - Added Interface CustomizationTaskListResult
  - Added Interface CustomizationTasksGetErrorDetailsOptionalParams
  - Added Interface CustomizationTasksGetOptionalParams
  - Added Interface CustomizationTasksListByCatalogNextOptionalParams
  - Added Interface CustomizationTasksListByCatalogOptionalParams
  - Added Interface DevCenterProperties
  - Added Interface DevCenterUpdateProperties
  - Added Interface Encryption
  - Added Interface EnvironmentDefinition
  - Added Interface EnvironmentDefinitionListResult
  - Added Interface EnvironmentDefinitionParameter
  - Added Interface EnvironmentDefinitionsGetErrorDetailsOptionalParams
  - Added Interface EnvironmentDefinitionsGetOptionalParams
  - Added Interface EnvironmentDefinitionsListByCatalogNextOptionalParams
  - Added Interface EnvironmentDefinitionsListByCatalogOptionalParams
  - Added Interface EnvironmentTypeProperties
  - Added Interface EnvironmentTypeUpdateProperties
  - Added Interface SyncErrorDetails
  - Added Interface SyncStats
  - Added Type Alias CatalogConnectionState
  - Added Type Alias CatalogDevBoxDefinitionsGetErrorDetailsResponse
  - Added Type Alias CatalogDevBoxDefinitionsGetResponse
  - Added Type Alias CatalogDevBoxDefinitionsListByCatalogNextResponse
  - Added Type Alias CatalogDevBoxDefinitionsListByCatalogResponse
  - Added Type Alias CatalogResourceValidationStatus
  - Added Type Alias CatalogsGetSyncErrorDetailsResponse
  - Added Type Alias CatalogSyncType
  - Added Type Alias CustomizationTaskInputType
  - Added Type Alias CustomizationTasksGetErrorDetailsResponse
  - Added Type Alias CustomizationTasksGetResponse
  - Added Type Alias CustomizationTasksListByCatalogNextResponse
  - Added Type Alias CustomizationTasksListByCatalogResponse
  - Added Type Alias EnvironmentDefinitionsGetErrorDetailsResponse
  - Added Type Alias EnvironmentDefinitionsGetResponse
  - Added Type Alias EnvironmentDefinitionsListByCatalogNextResponse
  - Added Type Alias EnvironmentDefinitionsListByCatalogResponse
  - Added Type Alias IdentityType
  - Added Type Alias ParameterType
  - Added Type Alias SingleSignOnStatus
  - Added Type Alias VirtualNetworkType
  - Interface AllowedEnvironmentType has a new optional parameter displayName
  - Interface Catalog has a new optional parameter connectionState
  - Interface Catalog has a new optional parameter lastConnectionTime
  - Interface Catalog has a new optional parameter lastSyncStats
  - Interface Catalog has a new optional parameter syncType
  - Interface CatalogProperties has a new optional parameter connectionState
  - Interface CatalogProperties has a new optional parameter lastConnectionTime
  - Interface CatalogProperties has a new optional parameter lastSyncStats
  - Interface CatalogUpdate has a new optional parameter syncType
  - Interface CatalogUpdateProperties has a new optional parameter syncType
  - Interface DevBoxDefinition has a new optional parameter validationStatus
  - Interface DevBoxDefinitionProperties has a new optional parameter validationStatus
  - Interface DevCenter has a new optional parameter displayName
  - Interface DevCenter has a new optional parameter encryption
  - Interface DevCenterUpdate has a new optional parameter displayName
  - Interface DevCenterUpdate has a new optional parameter encryption
  - Interface EnvironmentType has a new optional parameter displayName
  - Interface EnvironmentTypeUpdate has a new optional parameter displayName
  - Interface Pool has a new optional parameter devBoxCount
  - Interface Pool has a new optional parameter displayName
  - Interface Pool has a new optional parameter managedVirtualNetworkRegions
  - Interface Pool has a new optional parameter singleSignOnStatus
  - Interface Pool has a new optional parameter virtualNetworkType
  - Interface PoolProperties has a new optional parameter devBoxCount
  - Interface PoolUpdate has a new optional parameter displayName
  - Interface PoolUpdate has a new optional parameter managedVirtualNetworkRegions
  - Interface PoolUpdate has a new optional parameter singleSignOnStatus
  - Interface PoolUpdate has a new optional parameter virtualNetworkType
  - Interface PoolUpdateProperties has a new optional parameter displayName
  - Interface PoolUpdateProperties has a new optional parameter managedVirtualNetworkRegions
  - Interface PoolUpdateProperties has a new optional parameter singleSignOnStatus
  - Interface PoolUpdateProperties has a new optional parameter virtualNetworkType
  - Interface Project has a new optional parameter displayName
  - Interface ProjectEnvironmentType has a new optional parameter displayName
  - Interface ProjectEnvironmentType has a new optional parameter environmentCount
  - Interface ProjectEnvironmentTypeProperties has a new optional parameter displayName
  - Interface ProjectEnvironmentTypeProperties has a new optional parameter environmentCount
  - Interface ProjectUpdate has a new optional parameter displayName
  - Interface ProjectUpdateProperties has a new optional parameter displayName
  - Interface Usage has a new optional parameter id
  - Added Enum KnownCatalogConnectionState
  - Added Enum KnownCatalogResourceValidationStatus
  - Added Enum KnownCatalogSyncType
  - Added Enum KnownCustomizationTaskInputType
  - Added Enum KnownIdentityType
  - Added Enum KnownParameterType
  - Added Enum KnownSingleSignOnStatus
  - Added Enum KnownVirtualNetworkType

  
## 1.0.0 (2023-05-12)

The package of @azure/arm-devcenter is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
