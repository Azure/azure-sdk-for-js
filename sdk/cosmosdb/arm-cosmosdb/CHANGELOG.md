# Release History

## 15.2.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 15.2.0 (2022-09-05)
    
**Features**

  - Added operation MongoDBResources.beginCreateUpdateMongoRoleDefinition
  - Added operation MongoDBResources.beginCreateUpdateMongoRoleDefinitionAndWait
  - Added operation MongoDBResources.beginCreateUpdateMongoUserDefinition
  - Added operation MongoDBResources.beginCreateUpdateMongoUserDefinitionAndWait
  - Added operation MongoDBResources.beginDeleteMongoRoleDefinition
  - Added operation MongoDBResources.beginDeleteMongoRoleDefinitionAndWait
  - Added operation MongoDBResources.beginDeleteMongoUserDefinition
  - Added operation MongoDBResources.beginDeleteMongoUserDefinitionAndWait
  - Added operation MongoDBResources.getMongoRoleDefinition
  - Added operation MongoDBResources.getMongoUserDefinition
  - Added operation MongoDBResources.listMongoRoleDefinitions
  - Added operation MongoDBResources.listMongoUserDefinitions
  - Added Interface AccountKeyMetadata
  - Added Interface DatabaseAccountKeysMetadata
  - Added Interface MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesDeleteMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesGetMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesGetMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesListMongoRoleDefinitionsOptionalParams
  - Added Interface MongoDBResourcesListMongoUserDefinitionsOptionalParams
  - Added Interface MongoRoleDefinitionCreateUpdateParameters
  - Added Interface MongoRoleDefinitionGetResults
  - Added Interface MongoRoleDefinitionListResult
  - Added Interface MongoUserDefinitionCreateUpdateParameters
  - Added Interface MongoUserDefinitionGetResults
  - Added Interface MongoUserDefinitionListResult
  - Added Interface Privilege
  - Added Interface PrivilegeResource
  - Added Interface Role
  - Added Type Alias MongoDBResourcesCreateUpdateMongoRoleDefinitionResponse
  - Added Type Alias MongoDBResourcesCreateUpdateMongoUserDefinitionResponse
  - Added Type Alias MongoDBResourcesGetMongoRoleDefinitionResponse
  - Added Type Alias MongoDBResourcesGetMongoUserDefinitionResponse
  - Added Type Alias MongoDBResourcesListMongoRoleDefinitionsResponse
  - Added Type Alias MongoDBResourcesListMongoUserDefinitionsResponse
  - Added Type Alias MongoRoleDefinitionType
  - Interface DatabaseAccountCreateUpdateParameters has a new optional parameter enablePartitionMerge
  - Interface DatabaseAccountCreateUpdateParameters has a new optional parameter keysMetadata
  - Interface DatabaseAccountGetResults has a new optional parameter enablePartitionMerge
  - Interface DatabaseAccountGetResults has a new optional parameter keysMetadata
  - Interface DatabaseAccountUpdateParameters has a new optional parameter enablePartitionMerge
  - Interface DatabaseAccountUpdateParameters has a new optional parameter keysMetadata
    
    
## 15.1.0 (2022-07-18)
    
**Features**

  - Added operation group Service
  - Added Interface CassandraKeyspaceCreateUpdateParameters
  - Added Interface CassandraKeyspaceGetPropertiesOptions
  - Added Interface CassandraKeyspaceGetPropertiesResource
  - Added Interface CassandraKeyspaceGetResults
  - Added Interface CassandraTableCreateUpdateParameters
  - Added Interface CassandraTableGetPropertiesOptions
  - Added Interface CassandraTableGetPropertiesResource
  - Added Interface CassandraTableGetResults
  - Added Interface ClusterResource
  - Added Interface ContinuousModeBackupPolicy
  - Added Interface DatabaseAccountCreateUpdateParameters
  - Added Interface DatabaseAccountGetResults
  - Added Interface DatabaseAccountListKeysResult
  - Added Interface DataCenterResource
  - Added Interface DataTransferRegionalServiceResource
  - Added Interface DataTransferServiceResource
  - Added Interface DataTransferServiceResourceProperties
  - Added Interface GraphAPIComputeRegionalServiceResource
  - Added Interface GraphAPIComputeServiceResource
  - Added Interface GraphAPIComputeServiceResourceProperties
  - Added Interface GremlinDatabaseCreateUpdateParameters
  - Added Interface GremlinDatabaseGetPropertiesOptions
  - Added Interface GremlinDatabaseGetPropertiesResource
  - Added Interface GremlinDatabaseGetResults
  - Added Interface GremlinGraphCreateUpdateParameters
  - Added Interface GremlinGraphGetPropertiesOptions
  - Added Interface GremlinGraphGetPropertiesResource
  - Added Interface GremlinGraphGetResults
  - Added Interface LocationGetResult
  - Added Interface MaterializedViewsBuilderRegionalServiceResource
  - Added Interface MaterializedViewsBuilderServiceResource
  - Added Interface MaterializedViewsBuilderServiceResourceProperties
  - Added Interface MongoDBCollectionCreateUpdateParameters
  - Added Interface MongoDBCollectionGetPropertiesOptions
  - Added Interface MongoDBCollectionGetPropertiesResource
  - Added Interface MongoDBCollectionGetResults
  - Added Interface MongoDBDatabaseCreateUpdateParameters
  - Added Interface MongoDBDatabaseGetPropertiesOptions
  - Added Interface MongoDBDatabaseGetPropertiesResource
  - Added Interface MongoDBDatabaseGetResults
  - Added Interface NotebookWorkspace
  - Added Interface NotebookWorkspaceCreateUpdateParameters
  - Added Interface PartitionMetric
  - Added Interface PartitionUsage
  - Added Interface PercentileMetricValue
  - Added Interface PeriodicModeBackupPolicy
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface RegionalServiceResource
  - Added Interface RestorableMongodbResourcesGetResult
  - Added Interface RestorableSqlContainerPropertiesResourceContainer
  - Added Interface RestorableSqlDatabasePropertiesResourceDatabase
  - Added Interface RestorableSqlResourcesGetResult
  - Added Interface ServiceCreateOptionalParams
  - Added Interface ServiceDeleteOptionalParams
  - Added Interface ServiceGetOptionalParams
  - Added Interface ServiceListOptionalParams
  - Added Interface ServiceResource
  - Added Interface ServiceResourceCreateUpdateParameters
  - Added Interface ServiceResourceListResult
  - Added Interface ServiceResourceProperties
  - Added Interface SqlContainerCreateUpdateParameters
  - Added Interface SqlContainerGetPropertiesOptions
  - Added Interface SqlContainerGetPropertiesResource
  - Added Interface SqlContainerGetResults
  - Added Interface SqlDatabaseCreateUpdateParameters
  - Added Interface SqlDatabaseGetPropertiesOptions
  - Added Interface SqlDatabaseGetPropertiesResource
  - Added Interface SqlDatabaseGetResults
  - Added Interface SqlDedicatedGatewayRegionalServiceResource
  - Added Interface SqlDedicatedGatewayServiceResource
  - Added Interface SqlDedicatedGatewayServiceResourceProperties
  - Added Interface SqlRoleAssignmentGetResults
  - Added Interface SqlRoleDefinitionGetResults
  - Added Interface SqlStoredProcedureCreateUpdateParameters
  - Added Interface SqlStoredProcedureGetPropertiesResource
  - Added Interface SqlStoredProcedureGetResults
  - Added Interface SqlTriggerCreateUpdateParameters
  - Added Interface SqlTriggerGetPropertiesResource
  - Added Interface SqlTriggerGetResults
  - Added Interface SqlUserDefinedFunctionCreateUpdateParameters
  - Added Interface SqlUserDefinedFunctionGetPropertiesResource
  - Added Interface SqlUserDefinedFunctionGetResults
  - Added Interface TableCreateUpdateParameters
  - Added Interface TableGetPropertiesOptions
  - Added Interface TableGetPropertiesResource
  - Added Interface TableGetResults
  - Added Interface ThroughputSettingsGetPropertiesResource
  - Added Interface ThroughputSettingsGetResults
  - Added Interface ThroughputSettingsUpdateParameters
  - Added Type Alias ServiceCreateResponse
  - Added Type Alias ServiceGetResponse
  - Added Type Alias ServiceListResponse
  - Added Type Alias ServiceResourcePropertiesUnion
  - Added Type Alias ServiceSize
  - Added Type Alias ServiceStatus
  - Added Type Alias ServiceType
  - Interface GremlinGraphResource has a new optional parameter analyticalStorageTtl
  - Class CosmosDBManagementClient has a new parameter service
  - Added Enum KnownServiceSize
  - Added Enum KnownServiceStatus
  - Added Enum KnownServiceType
  - Enum KnownServerVersion has a new value Four2
    
    
## 15.0.0 (2021-12-09)

The package of @azure/arm-cosmosdb is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
