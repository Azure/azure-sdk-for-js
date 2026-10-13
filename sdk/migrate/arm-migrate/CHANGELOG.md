# Release History

## 3.0.0-beta.1 (2026-08-27)
Compared with version 2.0.3

### Features Added
  - Added operation group MigrateProjectsOperations
  - Added operation group MigrationEntitiesOperations
  - Added operation group MigrationEntityGroupsOperations
  - Added operation group TasksOperations
  - Added operation group WavesOperations
  - Added Class MigrateClient
  - Added Interface Arg
  - Added Interface ArtifactProperties
  - Added Interface CreateWavesFromPlanRequest
  - Added Interface CreateWavesFromPlanResponse
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FetchSasUriRequest
  - Added Interface FetchSasUriResponse
  - Added Interface GenerateWavePlanRequest
  - Added Interface GenerateWavePlanResponse
  - Added Interface GetWavePlansRequest
  - Added Interface GetWavePlansResponse
  - Added Interface ImportWavePlanRequest
  - Added Interface ImportWavePlanResponse
  - Added Interface MigrateClientOptionalParams
  - Added Interface MigrateProjectsCreateWavesFromPlanOptionalParams
  - Added Interface MigrateProjectsFetchSasUriOptionalParams
  - Added Interface MigrateProjectsGenerateWavePlanOptionalParams
  - Added Interface MigrateProjectsGetWavePlansOptionalParams
  - Added Interface MigrateProjectsImportWavePlanOptionalParams
  - Added Interface MigrateProjectsRefreshEntitiesOptionalParams
  - Added Interface MigrationEntitiesCreateOptionalParams
  - Added Interface MigrationEntitiesDeleteOptionalParams
  - Added Interface MigrationEntitiesGetOptionalParams
  - Added Interface MigrationEntitiesListByParentOptionalParams
  - Added Interface MigrationEntity
  - Added Interface MigrationEntityGroup
  - Added Interface MigrationEntityGroupProperties
  - Added Interface MigrationEntityGroupsCreateOptionalParams
  - Added Interface MigrationEntityGroupsDeleteOptionalParams
  - Added Interface MigrationEntityGroupsGetOptionalParams
  - Added Interface MigrationEntityGroupsListByParentOptionalParams
  - Added Interface MigrationEntityProperties
  - Added Interface MigrationSpecificPropertiesBase
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface RefreshEntitiesRequest
  - Added Interface RefreshEntitiesResponse
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface ServerMigrationSpecificProperties
  - Added Interface SystemData
  - Added Interface Task
  - Added Interface TaskCreate
  - Added Interface TaskProperties
  - Added Interface TaskPropertiesCreate
  - Added Interface TasksCreateOptionalParams
  - Added Interface TasksDeleteOptionalParams
  - Added Interface TasksGetOptionalParams
  - Added Interface TasksGetSummaryOptionalParams
  - Added Interface TasksListByParentOptionalParams
  - Added Interface TaskStatusCountMap
  - Added Interface TaskStatusCounts
  - Added Interface TaskSummaryItem
  - Added Interface TaskSummaryRequest
  - Added Interface TaskSummaryResponse
  - Added Interface Wave
  - Added Interface WavePlanListItem
  - Added Interface WavePlanSummary
  - Added Interface WaveProperties
  - Added Interface WavesCreateOptionalParams
  - Added Interface WavesDeleteOptionalParams
  - Added Interface WaveSelectionItem
  - Added Interface WavesGetOptionalParams
  - Added Interface WavesListByParentOptionalParams
  - Added Interface WavesRefreshOptionalParams
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias MigrationSpecificPropertiesBaseUnion
  - Added Type Alias MigrationSpecificPropertiesInstanceType
  - Added Type Alias Origin
  - Added Type Alias PlanSource
  - Added Type Alias Strategy
  - Added Type Alias TaskScope
  - Added Type Alias TaskType
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownApiVersions
  - Added Enum KnownCreatedByType
  - Added Enum KnownMigrationSpecificPropertiesInstanceType
  - Added Enum KnownOrigin
  - Added Enum KnownPlanSource
  - Added Enum KnownStrategy
  - Added Enum KnownTaskScope
  - Added Enum KnownTaskType
  - Enum KnownProvisioningState has a new value Canceled
  - Enum KnownProvisioningState has a new value Provisioning
  - Enum KnownProvisioningState has a new value Updating

### Breaking Changes
  - Deleted Class AzureMigrateV2
  - Removed Interface AssessedDisk
  - Removed Interface AssessedMachine
  - Removed Interface AssessedMachineProperties
  - Removed Interface AssessedMachineResultList
  - Removed Interface AssessedMachines
  - Removed Interface AssessedMachinesGetOptionalParams
  - Removed Interface AssessedMachinesListByAssessmentOptionalParams
  - Removed Interface AssessedNetworkAdapter
  - Removed Interface Assessment
  - Removed Interface AssessmentOptions
  - Removed Interface AssessmentOptionsProperties
  - Removed Interface AssessmentOptionsResultList
  - Removed Interface AssessmentProperties
  - Removed Interface AssessmentResultList
  - Removed Interface Assessments
  - Removed Interface AssessmentsCreateOptionalParams
  - Removed Interface AssessmentsDeleteOptionalParams
  - Removed Interface AssessmentsGetOptionalParams
  - Removed Interface AssessmentsGetReportDownloadUrlOptionalParams
  - Removed Interface AssessmentsListByGroupOptionalParams
  - Removed Interface AssessmentsListByProjectOptionalParams
  - Removed Interface AzureMigrateV2OptionalParams
  - Removed Interface CloudError
  - Removed Interface CloudErrorBody
  - Removed Interface CollectorAgentProperties
  - Removed Interface CollectorBodyAgentSpnProperties
  - Removed Interface CollectorProperties
  - Removed Interface Disk
  - Removed Interface DownloadUrl
  - Removed Interface Group
  - Removed Interface GroupBodyProperties
  - Removed Interface GroupProperties
  - Removed Interface GroupResultList
  - Removed Interface Groups
  - Removed Interface GroupsCreateOptionalParams
  - Removed Interface GroupsDeleteOptionalParams
  - Removed Interface GroupsGetOptionalParams
  - Removed Interface GroupsListByProjectOptionalParams
  - Removed Interface GroupsUpdateMachinesOptionalParams
  - Removed Interface HyperVCollector
  - Removed Interface HyperVCollectorList
  - Removed Interface HyperVCollectors
  - Removed Interface HyperVCollectorsCreateOptionalParams
  - Removed Interface HyperVCollectorsDeleteOptionalParams
  - Removed Interface HyperVCollectorsGetOptionalParams
  - Removed Interface HyperVCollectorsListByProjectOptionalParams
  - Removed Interface ImportCollector
  - Removed Interface ImportCollectorList
  - Removed Interface ImportCollectorProperties
  - Removed Interface ImportCollectors
  - Removed Interface ImportCollectorsCreateOptionalParams
  - Removed Interface ImportCollectorsDeleteOptionalParams
  - Removed Interface ImportCollectorsGetOptionalParams
  - Removed Interface ImportCollectorsListByProjectOptionalParams
  - Removed Interface Machine
  - Removed Interface MachineProperties
  - Removed Interface MachineResultList
  - Removed Interface Machines
  - Removed Interface MachinesGetOptionalParams
  - Removed Interface MachinesListByProjectOptionalParams
  - Removed Interface NetworkAdapter
  - Removed Interface OperationResultList
  - Removed Interface PrivateEndpointConnection
  - Removed Interface PrivateEndpointConnectionCollection
  - Removed Interface PrivateEndpointConnectionDeleteOptionalParams
  - Removed Interface PrivateEndpointConnectionGetOptionalParams
  - Removed Interface PrivateEndpointConnectionListByProjectOptionalParams
  - Removed Interface PrivateEndpointConnectionOperations
  - Removed Interface PrivateEndpointConnectionProperties
  - Removed Interface PrivateEndpointConnectionUpdateOptionalParams
  - Removed Interface PrivateLinkResource
  - Removed Interface PrivateLinkResourceCollection
  - Removed Interface PrivateLinkResourceGetOptionalParams
  - Removed Interface PrivateLinkResourceListByProjectOptionalParams
  - Removed Interface PrivateLinkResourceOperations
  - Removed Interface PrivateLinkResourceProperties
  - Removed Interface PrivateLinkServiceConnectionState
  - Removed Interface Project
  - Removed Interface ProjectProperties
  - Removed Interface ProjectResultList
  - Removed Interface Projects
  - Removed Interface ProjectsAssessmentOptionsListOptionalParams
  - Removed Interface ProjectsAssessmentOptionsOptionalParams
  - Removed Interface ProjectsCreateOptionalParams
  - Removed Interface ProjectsDeleteOptionalParams
  - Removed Interface ProjectsGetOptionalParams
  - Removed Interface ProjectsListBySubscriptionOptionalParams
  - Removed Interface ProjectsListOptionalParams
  - Removed Interface ProjectsUpdateOptionalParams
  - Removed Interface ResourceId
  - Removed Interface ServerCollector
  - Removed Interface ServerCollectorList
  - Removed Interface ServerCollectors
  - Removed Interface ServerCollectorsCreateOptionalParams
  - Removed Interface ServerCollectorsDeleteOptionalParams
  - Removed Interface ServerCollectorsGetOptionalParams
  - Removed Interface ServerCollectorsListByProjectOptionalParams
  - Removed Interface UpdateGroupBody
  - Removed Interface VmFamily
  - Removed Interface VmUptime
  - Removed Interface VMwareCollector
  - Removed Interface VMwareCollectorList
  - Removed Interface VMwareCollectors
  - Removed Interface VMwareCollectorsCreateOptionalParams
  - Removed Interface VMwareCollectorsDeleteOptionalParams
  - Removed Interface VMwareCollectorsGetOptionalParams
  - Removed Interface VMwareCollectorsListByProjectOptionalParams
  - Interface OperationsListOptionalParams no longer has parameter abortSignal
  - Interface OperationsListOptionalParams no longer has parameter requestOptions
  - Interface OperationsListOptionalParams no longer has parameter tracingOptions
  - Interface OperationsListOptionalParams no longer has parameter serializerOptions
  - Interface OperationsListOptionalParams no longer has parameter onResponse
  - Removed Type Alias AssessmentSizingCriterion
  - Removed Type Alias AssessmentStage
  - Removed Type Alias AssessmentStatus
  - Removed Type Alias AzureDiskSize
  - Removed Type Alias AzureDiskSuitabilityDetail
  - Removed Type Alias AzureDiskSuitabilityExplanation
  - Removed Type Alias AzureDiskType
  - Removed Type Alias AzureHybridUseBenefit
  - Removed Type Alias AzureLocation
  - Removed Type Alias AzureNetworkAdapterSuitabilityDetail
  - Removed Type Alias AzureNetworkAdapterSuitabilityExplanation
  - Removed Type Alias AzureOfferCode
  - Removed Type Alias AzurePricingTier
  - Removed Type Alias AzureStorageRedundancy
  - Removed Type Alias AzureVmFamily
  - Removed Type Alias AzureVmSize
  - Removed Type Alias AzureVmSuitabilityDetail
  - Removed Type Alias AzureVmSuitabilityExplanation
  - Removed Type Alias CloudSuitability
  - Removed Type Alias Currency
  - Removed Type Alias GroupStatus
  - Removed Type Alias GroupUpdateOperation
  - Removed Type Alias MachineBootType
  - Removed Type Alias Percentile
  - Removed Type Alias PrivateEndpointConnectionPropertiesProvisioningState
  - Removed Type Alias PrivateLinkServiceConnectionStateStatus
  - Removed Type Alias ProjectStatus
  - Removed Type Alias ReservedInstance
  - Removed Type Alias TimeRange
  - Removed Enum KnownAssessmentSizingCriterion
  - Removed Enum KnownAssessmentStage
  - Removed Enum KnownAssessmentStatus
  - Removed Enum KnownAzureDiskSize
  - Removed Enum KnownAzureDiskSuitabilityDetail
  - Removed Enum KnownAzureDiskSuitabilityExplanation
  - Removed Enum KnownAzureDiskType
  - Removed Enum KnownAzureHybridUseBenefit
  - Removed Enum KnownAzureLocation
  - Removed Enum KnownAzureNetworkAdapterSuitabilityDetail
  - Removed Enum KnownAzureNetworkAdapterSuitabilityExplanation
  - Removed Enum KnownAzureOfferCode
  - Removed Enum KnownAzurePricingTier
  - Removed Enum KnownAzureStorageRedundancy
  - Removed Enum KnownAzureVmFamily
  - Removed Enum KnownAzureVmSize
  - Removed Enum KnownAzureVmSuitabilityDetail
  - Removed Enum KnownAzureVmSuitabilityExplanation
  - Removed Enum KnownCloudSuitability
  - Removed Enum KnownCurrency
  - Removed Enum KnownGroupStatus
  - Removed Enum KnownGroupUpdateOperation
  - Removed Enum KnownMachineBootType
  - Removed Enum KnownPercentile
  - Removed Enum KnownPrivateEndpointConnectionPropertiesProvisioningState
  - Removed Enum KnownPrivateLinkServiceConnectionStateStatus
  - Removed Enum KnownProjectStatus
  - Removed Enum KnownReservedInstance
  - Removed Enum KnownTimeRange
  - Enum KnownProvisioningState no longer has value Creating
  - Enum KnownProvisioningState no longer has value Moving

## 2.0.3 (2023-01-29)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 2.0.2 (2022-07-04)

### Features Added

  - Bug fix

## 2.0.1 (2022-04-25)

### Features Added

  - Bug fix
    
## 2.0.0 (2022-01-20)

The package of @azure/arm-migrate is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
