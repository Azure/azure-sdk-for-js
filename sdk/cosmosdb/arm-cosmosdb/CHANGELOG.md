# Release History

## 16.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 16.0.0-beta.2 (2022-04-15)
    
**Features**

  - Added operation group DataTransferJobs
  - Added operation group GraphResources
  - Added operation group RestorableGremlinDatabases
  - Added operation group RestorableGremlinGraphs
  - Added operation group RestorableGremlinResources
  - Added operation group RestorableTableResources
  - Added operation group RestorableTables
  - Added operation group Service
  - Added operation CassandraClusters.getBackup
  - Added operation CassandraClusters.listBackups
  - Added operation CassandraResources.beginCreateUpdateCassandraView
  - Added operation CassandraResources.beginCreateUpdateCassandraViewAndWait
  - Added operation CassandraResources.beginDeleteCassandraView
  - Added operation CassandraResources.beginDeleteCassandraViewAndWait
  - Added operation CassandraResources.beginMigrateCassandraViewToAutoscale
  - Added operation CassandraResources.beginMigrateCassandraViewToAutoscaleAndWait
  - Added operation CassandraResources.beginMigrateCassandraViewToManualThroughput
  - Added operation CassandraResources.beginMigrateCassandraViewToManualThroughputAndWait
  - Added operation CassandraResources.beginUpdateCassandraViewThroughput
  - Added operation CassandraResources.beginUpdateCassandraViewThroughputAndWait
  - Added operation CassandraResources.getCassandraView
  - Added operation CassandraResources.getCassandraViewThroughput
  - Added operation CassandraResources.listCassandraViews
  - Added operation GremlinResources.beginRetrieveContinuousBackupInformation
  - Added operation GremlinResources.beginRetrieveContinuousBackupInformationAndWait
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
  - Added operation SqlResources.beginCreateUpdateClientEncryptionKey
  - Added operation SqlResources.beginCreateUpdateClientEncryptionKeyAndWait
  - Added operation SqlResources.getClientEncryptionKey
  - Added operation SqlResources.listClientEncryptionKeys
  - Added operation TableResources.beginRetrieveContinuousBackupInformation
  - Added operation TableResources.beginRetrieveContinuousBackupInformationAndWait
  - Added Interface AuthenticationMethodLdapProperties
  - Added Interface BackupResourceProperties
  - Added Interface CassandraClustersGetBackupOptionalParams
  - Added Interface CassandraClustersListBackupsOptionalParams
  - Added Interface CassandraResourcesCreateUpdateCassandraViewOptionalParams
  - Added Interface CassandraResourcesDeleteCassandraViewOptionalParams
  - Added Interface CassandraResourcesGetCassandraViewOptionalParams
  - Added Interface CassandraResourcesGetCassandraViewThroughputOptionalParams
  - Added Interface CassandraResourcesListCassandraViewsOptionalParams
  - Added Interface CassandraResourcesMigrateCassandraViewToAutoscaleOptionalParams
  - Added Interface CassandraResourcesMigrateCassandraViewToManualThroughputOptionalParams
  - Added Interface CassandraResourcesUpdateCassandraViewThroughputOptionalParams
  - Added Interface CassandraViewListResult
  - Added Interface CassandraViewResource
  - Added Interface ClientEncryptionKeyCreateUpdateParameters
  - Added Interface ClientEncryptionKeyResource
  - Added Interface ClientEncryptionKeysListResult
  - Added Interface DataTransferDataSourceSink
  - Added Interface DataTransferJobFeedResults
  - Added Interface DataTransferJobProperties
  - Added Interface DataTransferJobsCreateOptionalParams
  - Added Interface DataTransferJobsGetOptionalParams
  - Added Interface DataTransferJobsListByDatabaseAccountNextOptionalParams
  - Added Interface DataTransferJobsListByDatabaseAccountOptionalParams
  - Added Interface DataTransferServiceResource
  - Added Interface DiagnosticLogSettings
  - Added Interface GraphAPIComputeServiceResource
  - Added Interface GraphResource
  - Added Interface GraphResourcesCreateUpdateGraphOptionalParams
  - Added Interface GraphResourcesDeleteGraphResourceOptionalParams
  - Added Interface GraphResourcesGetGraphOptionalParams
  - Added Interface GraphResourcesListGraphsOptionalParams
  - Added Interface GraphResourcesListResult
  - Added Interface GremlinDatabaseRestoreResource
  - Added Interface GremlinResourcesRetrieveContinuousBackupInformationOptionalParams
  - Added Interface KeyWrapMetadata
  - Added Interface ListBackups
  - Added Interface MaterializedViewsBuilderServiceResource
  - Added Interface MongoDBResourcesCreateUpdateMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesCreateUpdateMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesDeleteMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesDeleteMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesGetMongoRoleDefinitionOptionalParams
  - Added Interface MongoDBResourcesGetMongoUserDefinitionOptionalParams
  - Added Interface MongoDBResourcesListMongoRoleDefinitionsOptionalParams
  - Added Interface MongoDBResourcesListMongoUserDefinitionsOptionalParams
  - Added Interface MongoRoleDefinitionCreateUpdateParameters
  - Added Interface MongoRoleDefinitionListResult
  - Added Interface MongoUserDefinitionCreateUpdateParameters
  - Added Interface MongoUserDefinitionListResult
  - Added Interface Privilege
  - Added Interface PrivilegeResource
  - Added Interface RegionalServiceResource
  - Added Interface RestorableGremlinDatabaseGetResult
  - Added Interface RestorableGremlinDatabasePropertiesResource
  - Added Interface RestorableGremlinDatabasesListOptionalParams
  - Added Interface RestorableGremlinDatabasesListResult
  - Added Interface RestorableGremlinGraphGetResult
  - Added Interface RestorableGremlinGraphPropertiesResource
  - Added Interface RestorableGremlinGraphsListOptionalParams
  - Added Interface RestorableGremlinGraphsListResult
  - Added Interface RestorableGremlinResourcesListOptionalParams
  - Added Interface RestorableGremlinResourcesListResult
  - Added Interface RestorableTableGetResult
  - Added Interface RestorableTablePropertiesResource
  - Added Interface RestorableTableResourcesListOptionalParams
  - Added Interface RestorableTableResourcesListResult
  - Added Interface RestorableTablesListOptionalParams
  - Added Interface RestorableTablesListResult
  - Added Interface Role
  - Added Interface ServiceCreateOptionalParams
  - Added Interface ServiceDeleteOptionalParams
  - Added Interface ServiceGetOptionalParams
  - Added Interface ServiceListOptionalParams
  - Added Interface ServiceResourceCreateUpdateParameters
  - Added Interface ServiceResourceListResult
  - Added Interface ServiceResourceProperties
  - Added Interface SqlDedicatedGatewayServiceResource
  - Added Interface SqlResourcesCreateUpdateClientEncryptionKeyOptionalParams
  - Added Interface SqlResourcesGetClientEncryptionKeyOptionalParams
  - Added Interface SqlResourcesListClientEncryptionKeysOptionalParams
  - Added Interface TableResourcesRetrieveContinuousBackupInformationOptionalParams
  - Added Type Alias AzureBlobDataTransferDataSourceSink
  - Added Type Alias BackupResource
  - Added Type Alias CassandraClustersGetBackupResponse
  - Added Type Alias CassandraClustersListBackupsResponse
  - Added Type Alias CassandraResourcesCreateUpdateCassandraViewResponse
  - Added Type Alias CassandraResourcesGetCassandraViewResponse
  - Added Type Alias CassandraResourcesGetCassandraViewThroughputResponse
  - Added Type Alias CassandraResourcesListCassandraViewsResponse
  - Added Type Alias CassandraResourcesMigrateCassandraViewToAutoscaleResponse
  - Added Type Alias CassandraResourcesMigrateCassandraViewToManualThroughputResponse
  - Added Type Alias CassandraResourcesUpdateCassandraViewThroughputResponse
  - Added Type Alias CassandraViewCreateUpdateParameters
  - Added Type Alias CassandraViewGetPropertiesOptions
  - Added Type Alias CassandraViewGetPropertiesResource
  - Added Type Alias CassandraViewGetResults
  - Added Type Alias ClientEncryptionKeyGetPropertiesResource
  - Added Type Alias ClientEncryptionKeyGetResults
  - Added Type Alias CosmosCassandraDataTransferDataSourceSink
  - Added Type Alias CosmosSqlDataTransferDataSourceSink
  - Added Type Alias CreateJobRequest
  - Added Type Alias DataTransferComponent
  - Added Type Alias DataTransferDataSourceSinkUnion
  - Added Type Alias DataTransferJobGetResults
  - Added Type Alias DataTransferJobsCreateResponse
  - Added Type Alias DataTransferJobsGetResponse
  - Added Type Alias DataTransferJobsListByDatabaseAccountNextResponse
  - Added Type Alias DataTransferJobsListByDatabaseAccountResponse
  - Added Type Alias DataTransferRegionalServiceResource
  - Added Type Alias DataTransferServiceResourceProperties
  - Added Type Alias EnableFullTextQuery
  - Added Type Alias GraphAPIComputeRegionalServiceResource
  - Added Type Alias GraphAPIComputeServiceResourceProperties
  - Added Type Alias GraphResourceCreateUpdateParameters
  - Added Type Alias GraphResourceGetPropertiesOptions
  - Added Type Alias GraphResourceGetPropertiesResource
  - Added Type Alias GraphResourceGetResults
  - Added Type Alias GraphResourcesCreateUpdateGraphResponse
  - Added Type Alias GraphResourcesGetGraphResponse
  - Added Type Alias GraphResourcesListGraphsResponse
  - Added Type Alias GremlinResourcesRetrieveContinuousBackupInformationResponse
  - Added Type Alias MaterializedViewsBuilderRegionalServiceResource
  - Added Type Alias MaterializedViewsBuilderServiceResourceProperties
  - Added Type Alias MongoDBResourcesCreateUpdateMongoRoleDefinitionResponse
  - Added Type Alias MongoDBResourcesCreateUpdateMongoUserDefinitionResponse
  - Added Type Alias MongoDBResourcesGetMongoRoleDefinitionResponse
  - Added Type Alias MongoDBResourcesGetMongoUserDefinitionResponse
  - Added Type Alias MongoDBResourcesListMongoRoleDefinitionsResponse
  - Added Type Alias MongoDBResourcesListMongoUserDefinitionsResponse
  - Added Type Alias MongoRoleDefinitionGetResults
  - Added Type Alias MongoRoleDefinitionType
  - Added Type Alias MongoUserDefinitionGetResults
  - Added Type Alias RestorableGremlinDatabasesListResponse
  - Added Type Alias RestorableGremlinGraphsListResponse
  - Added Type Alias RestorableGremlinResourcesListResponse
  - Added Type Alias RestorableTableResourcesListResponse
  - Added Type Alias RestorableTablesListResponse
  - Added Type Alias ServiceCreateResponse
  - Added Type Alias ServiceGetResponse
  - Added Type Alias ServiceListResponse
  - Added Type Alias ServiceResource
  - Added Type Alias ServiceResourcePropertiesUnion
  - Added Type Alias ServiceSize
  - Added Type Alias ServiceStatus
  - Added Type Alias ServiceType
  - Added Type Alias SqlDedicatedGatewayRegionalServiceResource
  - Added Type Alias SqlDedicatedGatewayServiceResourceProperties
  - Added Type Alias SqlResourcesCreateUpdateClientEncryptionKeyResponse
  - Added Type Alias SqlResourcesGetClientEncryptionKeyResponse
  - Added Type Alias SqlResourcesListClientEncryptionKeysResponse
  - Added Type Alias TableResourcesRetrieveContinuousBackupInformationResponse
  - Interface ARMResourceProperties has a new optional parameter identity
  - Interface DatabaseAccountUpdateParameters has a new optional parameter diagnosticLogSettings
  - Interface DatabaseAccountUpdateParameters has a new optional parameter enableMaterializedViews
  - Interface DataCenterResourceProperties has a new optional parameter authenticationMethodLdapProperties
  - Interface LocationProperties has a new optional parameter status
  - Interface RestorableMongodbCollectionsListOptionalParams has a new optional parameter endTime
  - Interface RestorableMongodbCollectionsListOptionalParams has a new optional parameter startTime
  - Interface RestoreParameters has a new optional parameter gremlinDatabasesToRestore
  - Interface RestoreParameters has a new optional parameter tablesToRestore
  - Class CosmosDBManagementClient has a new parameter dataTransferJobs
  - Class CosmosDBManagementClient has a new parameter graphResources
  - Class CosmosDBManagementClient has a new parameter restorableGremlinDatabases
  - Class CosmosDBManagementClient has a new parameter restorableGremlinGraphs
  - Class CosmosDBManagementClient has a new parameter restorableGremlinResources
  - Class CosmosDBManagementClient has a new parameter restorableTableResources
  - Class CosmosDBManagementClient has a new parameter restorableTables
  - Class CosmosDBManagementClient has a new parameter service
  - Type Alias DatabaseAccountCreateUpdateParameters has a new parameter diagnosticLogSettings
  - Type Alias DatabaseAccountCreateUpdateParameters has a new parameter enableMaterializedViews
  - Type Alias DatabaseAccountGetResults has a new parameter diagnosticLogSettings
  - Type Alias DatabaseAccountGetResults has a new parameter enableMaterializedViews
  - Added Enum KnownDataTransferComponent
  - Added Enum KnownServiceSize
  - Added Enum KnownServiceStatus
  - Added Enum KnownServiceType
  - Enum KnownAuthenticationMethod has a new value Ldap
  - Bug fix
    
    
## 15.0.0 (2021-12-09)

The package of @azure/arm-cosmosdb is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
