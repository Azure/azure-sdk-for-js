# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (2022-11-23)
    
**Features**

  - Added operation group CheckNameAvailability
  - Added operation NetworkConnections.beginRunHealthChecks
  - Added operation NetworkConnections.beginRunHealthChecksAndWait
  - Added Interface CheckNameAvailabilityExecuteOptionalParams
  - Added Interface CheckNameAvailabilityRequest
  - Added Interface CheckNameAvailabilityResponse
  - Added Interface ErrorResponse
  - Added Type Alias CheckNameAvailabilityExecuteResponse
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias HibernateSupport
  - Added Type Alias ProvisioningState
  - Interface DevBoxDefinition has a new optional parameter hibernateSupport
  - Interface DevBoxDefinitionUpdate has a new optional parameter hibernateSupport
  - Interface DevBoxDefinitionUpdateProperties has a new optional parameter hibernateSupport
  - Interface DevCenter has a new optional parameter devCenterUri
  - Interface NetworkConnectionsRunHealthChecksOptionalParams has a new optional parameter resumeFrom
  - Interface NetworkConnectionsRunHealthChecksOptionalParams has a new optional parameter updateIntervalInMs
  - Interface Project has a new optional parameter devCenterUri
  - Interface ProjectProperties has a new optional parameter devCenterUri
  - Class DevCenterClient has a new parameter checkNameAvailability
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownHibernateSupport
  - Added Enum KnownProvisioningState

**Breaking Changes**

  - Removed operation NetworkConnections.runHealthChecks
    
    
## 1.0.0-beta.3 (2022-11-04)
    
**Features**

  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface OperationStatusResult
  - Added Type Alias CatalogSyncState
  - Added Type Alias SchedulesUpdateResponse
  - Interface Catalog has a new optional parameter syncState
  - Interface CatalogProperties has a new optional parameter syncState
  - Added Enum KnownCatalogSyncState

**Breaking Changes**

  - Interface OperationStatus no longer has parameter endTime
  - Interface OperationStatus no longer has parameter error
  - Interface OperationStatus no longer has parameter id
  - Interface OperationStatus no longer has parameter name
  - Interface OperationStatus no longer has parameter percentComplete
  - Interface OperationStatus no longer has parameter startTime
  - Interface OperationStatus no longer has parameter status
    
    
## 1.0.0-beta.2 (2022-10-11)
    
**Features**

  - Added operation group ProjectAllowedEnvironmentTypes
  - Added Interface AllowedEnvironmentType
  - Added Interface AllowedEnvironmentTypeListResult
  - Added Interface ProjectAllowedEnvironmentTypesGetOptionalParams
  - Added Interface ProjectAllowedEnvironmentTypesListNextOptionalParams
  - Added Interface ProjectAllowedEnvironmentTypesListOptionalParams
  - Added Type Alias ProjectAllowedEnvironmentTypesGetResponse
  - Added Type Alias ProjectAllowedEnvironmentTypesListNextResponse
  - Added Type Alias ProjectAllowedEnvironmentTypesListResponse
  - Interface OperationStatus has a new optional parameter resourceId
  - Class DevCenterClient has a new parameter projectAllowedEnvironmentTypes
    
    
## 1.0.0-beta.1 (2022-08-15)

The package of @azure/arm-devcenter is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
