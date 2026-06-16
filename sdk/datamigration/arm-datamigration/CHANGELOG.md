# Release History

## 4.0.0-beta.1 (2026-06-16)
Compared with version 3.0.0

### Features Added
  - Added operation DatabaseMigrationsMongoToCosmosDbRUMongoOperations.create
  - Added operation DatabaseMigrationsMongoToCosmosDbRUMongoOperations.delete
  - Added operation DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations.create
  - Added operation DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations.delete
  - Added operation DatabaseMigrationsSqlDbOperations.cancel
  - Added operation DatabaseMigrationsSqlDbOperations.createOrUpdate
  - Added operation DatabaseMigrationsSqlDbOperations.delete
  - Added operation DatabaseMigrationsSqlDbOperations.retry
  - Added operation DatabaseMigrationsSqlMiOperations.cancel
  - Added operation DatabaseMigrationsSqlMiOperations.createOrUpdate
  - Added operation DatabaseMigrationsSqlMiOperations.cutover
  - Added operation DatabaseMigrationsSqlMiOperations.delete
  - Added operation DatabaseMigrationsSqlVmOperations.cancel
  - Added operation DatabaseMigrationsSqlVmOperations.createOrUpdate
  - Added operation DatabaseMigrationsSqlVmOperations.cutover
  - Added operation DatabaseMigrationsSqlVmOperations.delete
  - Added operation MigrationServicesOperations.createOrUpdate
  - Added operation MigrationServicesOperations.delete
  - Added operation MigrationServicesOperations.update
  - Added operation ServicesOperations.createOrUpdate
  - Added operation ServicesOperations.delete
  - Added operation ServicesOperations.start
  - Added operation ServicesOperations.stop
  - Added operation ServicesOperations.update
  - Added operation SqlMigrationServicesOperations.createOrUpdate
  - Added operation SqlMigrationServicesOperations.delete
  - Added operation SqlMigrationServicesOperations.update
  - Class DataMigrationManagementClient has a new constructor "constructor(credential: TokenCredential, options?: DataMigrationManagementClientOptionalParams);"
  - Added Interface ConnectToTargetSqlSqlDbSyncTaskInput
  - Added Interface ConnectToTargetSqlSqlDbSyncTaskProperties
  - Added Interface DatabaseMigrationsMongoToCosmosDbRUMongoListForScopeOptionalParams
  - Added Interface DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams
  - Added Interface DataMigrationServiceProperties
  - Added Interface MigrationServiceProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProjectProperties
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SqlMigrationServiceProperties
  - Interface DatabaseMigrationProperties has a new optional parameter sqlServerInstanceId
  - Interface DatabaseMigrationPropertiesSqlDb has a new optional parameter sqlServerInstanceId
  - Interface DatabaseMigrationPropertiesSqlMi has a new optional parameter sqlServerInstanceId
  - Interface DatabaseMigrationPropertiesSqlVm has a new optional parameter sqlServerInstanceId
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions
  - Enum KnownResourceType has a new value DatabaseMigrationProperties

### Breaking Changes
  - Operation DatabaseMigrationsMongoToCosmosDbRUMongo.beginDeleteAndWait has a new signature
  - Operation DatabaseMigrationsMongoToCosmosDbvCoreMongo.beginDeleteAndWait has a new signature
  - Operation MigrationServices.beginDeleteAndWait has a new signature
  - Operation Projects.createOrUpdate has a new signature
  - Operation Projects.get has a new signature
  - Operation Projects.update has a new signature
  - Operation Services.beginCreateOrUpdate has a new signature
  - Operation Services.beginCreateOrUpdateAndWait has a new signature
  - Operation Services.beginUpdate has a new signature
  - Operation Services.beginUpdateAndWait has a new signature
  - Operation Services.get has a new signature
  - Operation ServiceTasks.cancel has a new signature
  - Operation ServiceTasks.createOrUpdate has a new signature
  - Operation ServiceTasks.get has a new signature
  - Operation ServiceTasks.update has a new signature
  - Operation SqlMigrationServices.beginCreateOrUpdate has a new signature
  - Operation SqlMigrationServices.beginCreateOrUpdateAndWait has a new signature
  - Operation SqlMigrationServices.beginUpdateAndWait has a new signature
  - Operation SqlMigrationServices.get has a new signature
  - Operation Tasks.cancel has a new signature
  - Operation Tasks.command has a new signature
  - Operation Tasks.createOrUpdate has a new signature
  - Operation Tasks.get has a new signature
  - Operation Tasks.update has a new signature
  - Class DataMigrationManagementClient no longer has parameter apiVersion
  - Class DataMigrationManagementClient no longer has parameter subscriptionId
  - Removed Interface ConnectToTargetSqlDbSyncTaskInput
  - Removed Interface ConnectToTargetSqlDbSyncTaskProperties
  - Removed Interface Database
  - Removed Interface DatabaseFileInput
  - Removed Interface DatabaseMigrationsMongoToCosmosDbRUMongoGetForScopeOptionalParams
  - Removed Interface DatabaseMigrationsMongoToCosmosDbvCoreMongoGetForScopeOptionalParams
  - Removed Interface DatabaseObjectName
  - Removed Interface DataMigrationError
  - Removed Interface DataMigrationProjectMetadata
  - Removed Interface DataMigrationServiceList
  - Removed Interface FileList
  - Removed Interface GetProjectDetailsNonSqlTaskInput
  - Removed Interface MigrateSqlServerDatabaseInput
  - Removed Interface MigrationTableMetadata
  - Removed Interface NonSqlDataMigrationTable
  - Removed Interface NonSqlMigrationTaskInput
  - Removed Interface NonSqlMigrationTaskOutput
  - Removed Interface ProjectList
  - Removed Interface QuotaList
  - Removed Interface ServiceOperation
  - Removed Interface ServiceOperationDisplay
  - Removed Interface ServiceOperationList
  - Removed Interface ServiceSkuList
  - Removed Interface TaskList
  - Type of parameter commandType of interface CommandProperties is changed from "Migrate.Sync.Complete.Database" | "Migrate.SqlServer.AzureDbSqlMi.Complete" | "cancel" | "finish" | "restart" to CommandType
  - Type of parameter type of interface ConnectionInfo is changed from "MongoDbConnectionInfo" | "SqlConnectionInfo" | "MySqlConnectionInfo" | "OracleConnectionInfo" | "PostgreSqlConnectionInfo" | "MiSqlConnectionInfo" to string
  - Type of parameter resultType of interface ConnectToSourceSqlServerTaskOutput is changed from "TaskLevelOutput" | "DatabaseLevelOutput" | "LoginLevelOutput" | "AgentJobLevelOutput" to string
  - Type of parameter kind of interface DatabaseMigrationBaseProperties is changed from "MongoToCosmosDbMongo" | "DatabaseMigrationProperties" | "SqlDb" | "SqlMi" | "SqlVm" to ResourceType
  - Type of parameter resultType of interface MigrateMySqlAzureDbForMySqlOfflineTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" to string
  - Type of parameter resultType of interface MigrateMySqlAzureDbForMySqlSyncTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" | "DatabaseLevelErrorOutput" to string
  - Type of parameter resultType of interface MigrateOracleAzureDbPostgreSqlSyncTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" | "DatabaseLevelErrorOutput" to string
  - Type of parameter resultType of interface MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" | "DatabaseLevelErrorOutput" to string
  - Type of parameter resultType of interface MigrateSchemaSqlServerSqlDbTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "SchemaErrorOutput" | "ErrorOutput" to string
  - Type of parameter resultType of interface MigrateSqlServerSqlDbSyncTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" | "DatabaseLevelErrorOutput" to string
  - Type of parameter resultType of interface MigrateSqlServerSqlDbTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "TableLevelOutput" | "ErrorOutput" | "MigrationValidationOutput" | "MigrationDatabaseLevelValidationOutput" to string
  - Type of parameter resultType of interface MigrateSqlServerSqlMISyncTaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "ErrorOutput" to string
  - Type of parameter resultType of interface MigrateSqlServerSqlMITaskOutput is changed from "MigrationLevelOutput" | "DatabaseLevelOutput" | "AgentJobLevelOutput" | "LoginLevelOutput" | "ErrorOutput" to string
  - Type of parameter resultType of interface MigrateSsisTaskOutput is changed from "MigrationLevelOutput" | "SsisProjectLevelOutput" to string
  - Type of parameter resultType of interface MongoDbProgress is changed from "Collection" | "Database" | "Migration" to MongoDbProgressResultType
  - Type of parameter taskType of interface ProjectTaskProperties is changed from "MigrateSchemaSqlServerSqlDb" | "Service.Check.OCI" | "Service.Upload.OCI" | "Service.Install.OCI" | "Connect.MongoDb" | "ConnectToSource.SqlServer" | "ConnectToSource.SqlServer.Sync" | "ConnectToSource.PostgreSql.Sync" | "ConnectToSource.MySql" | "ConnectToSource.Oracle.Sync" | "ConnectToTarget.SqlDb" | "ConnectToTarget.SqlDb.Sync" | "ConnectToTarget.AzureDbForPostgreSql.Sync" | "ConnectToTarget.Oracle.AzureDbForPostgreSql.Sync" | "GetUserTables.Sql" | "GetUserTables.AzureSqlDb.Sync" | "GetUserTablesOracle" | "GetUserTablesPostgreSql" | "GetUserTablesMySql" | "ConnectToTarget.AzureSqlDbMI" | "ConnectToTarget.AzureSqlDbMI.Sync.LRS" | "ConnectToTarget.AzureDbForMySql" | "Migrate.MongoDb" | "Migrate.SqlServer.AzureSqlDbMI" | "Migrate.SqlServer.AzureSqlDbMI.Sync.LRS" | "Migrate.SqlServer.SqlDb" | "Migrate.SqlServer.AzureSqlDb.Sync" | "Migrate.MySql.AzureDbForMySql.Sync" | "Migrate.MySql.AzureDbForMySql" | "Migrate.PostgreSql.AzureDbForPostgreSql.SyncV2" | "Migrate.Oracle.AzureDbForPostgreSql.Sync" | "ValidateMigrationInput.SqlServer.SqlDb.Sync" | "ValidateMigrationInput.SqlServer.AzureSqlDbMI" | "ValidateMigrationInput.SqlServer.AzureSqlDbMI.Sync.LRS" | "Validate.MongoDb" | "Validate.Oracle.AzureDbPostgreSql.Sync" | "GetTDECertificates.Sql" | "Migrate.Ssis" to TaskType
  - Parameter location of interface DataMigrationService is now optional
  - Parameter location of interface Project is now optional
  - Parameter location of interface SqlMigrationService is now optional
  - Removed Type Alias DataMigrationResultCode
  - Removed Type Alias ErrorType
  - Type alias "CommandPropertiesUnion" has been changed
  - Type alias "ConnectionInfoUnion" has been changed
  - Type alias "ConnectToSourceSqlServerTaskOutputUnion" has been changed
  - Type alias "DatabaseMigrationBasePropertiesUnion" has been changed
  - Type alias "MigrateMySqlAzureDbForMySqlOfflineTaskOutputUnion" has been changed
  - Type alias "MigrateMySqlAzureDbForMySqlSyncTaskOutputUnion" has been changed
  - Type alias "MigrateOracleAzureDbPostgreSqlSyncTaskOutputUnion" has been changed
  - Type alias "MigratePostgreSqlAzureDbForPostgreSqlSyncTaskOutputUnion" has been changed
  - Type alias "MigrateSchemaSqlServerSqlDbTaskOutputUnion" has been changed
  - Type alias "MigrateSqlServerSqlDbSyncTaskOutputUnion" has been changed
  - Type alias "MigrateSqlServerSqlDbTaskOutputUnion" has been changed
  - Type alias "MigrateSqlServerSqlMISyncTaskOutputUnion" has been changed
  - Type alias "MigrateSqlServerSqlMITaskOutputUnion" has been changed
  - Type alias "MigrateSsisTaskOutputUnion" has been changed
  - Type alias "MongoDbProgressUnion" has been changed
  - Type alias "ProjectTaskPropertiesUnion" has been changed
  - Removed Enum KnownDataMigrationResultCode
  - Removed Enum KnownErrorType

    
## 3.0.0 (2025-09-26)

### Features Added

The package of @azure/arm-datamigration is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
