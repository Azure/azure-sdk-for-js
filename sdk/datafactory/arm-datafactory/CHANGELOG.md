# Release History

## 11.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 11.1.0 (2023-03-02)
    
**Features**

  - Interface AzureBlobFSLinkedService has a new optional parameter sasToken
  - Interface AzureBlobFSLinkedService has a new optional parameter sasUri
    
    
## 11.0.0 (2023-02-10)
    
**Features**

  - Added operation group CredentialOperations
  - Added Interface CopyComputeScaleProperties
  - Added Interface CredentialListResponse
  - Added Interface CredentialOperationsCreateOrUpdateOptionalParams
  - Added Interface CredentialOperationsDeleteOptionalParams
  - Added Interface CredentialOperationsGetOptionalParams
  - Added Interface CredentialOperationsListByFactoryNextOptionalParams
  - Added Interface CredentialOperationsListByFactoryOptionalParams
  - Added Interface ManagedIdentityCredentialResource
  - Added Interface PipelineExternalComputeScaleProperties
  - Added Interface SparkConfigurationParametrizationReference
  - Added Type Alias AzureStorageAuthenticationType
  - Added Type Alias ConfigurationType
  - Added Type Alias CredentialOperationsCreateOrUpdateResponse
  - Added Type Alias CredentialOperationsGetResponse
  - Added Type Alias CredentialOperationsListByFactoryNextResponse
  - Added Type Alias CredentialOperationsListByFactoryResponse
  - Added Type Alias SparkConfigurationReferenceType
  - Interface AzureBlobStorageLinkedService has a new optional parameter authenticationType
  - Interface AzureBlobStorageLinkedService has a new optional parameter containerUri
  - Interface IntegrationRuntimeComputeProperties has a new optional parameter copyComputeScaleProperties
  - Interface IntegrationRuntimeComputeProperties has a new optional parameter pipelineExternalComputeScaleProperties
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter configurationType
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter scanFolder
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter sparkConfig
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter targetSparkConfiguration
  - Type of parameter type of interface Credential_2 is changed from "ServicePrincipal" | "ManagedIdentity" to "ManagedIdentity" | "ServicePrincipal"
  - Added Enum KnownAzureStorageAuthenticationType
  - Added Enum KnownConfigurationType
  - Added Enum KnownSparkConfigurationReferenceType
  - Type of parameter numExecutors of interface SynapseSparkJobDefinitionActivity is changed from number to any

**Breaking Changes**

  - Parameter exportSettings of interface SnowflakeSource is now required

    
## 10.10.1 (2023-01-04)

**Features**

-  Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

- A series of small bug fixs relevant to authentication and apiVersion policy

## 10.10.0 (2022-11-04)
    
**Features**

  - Interface ScriptActivity has a new optional parameter scriptBlockExecutionTimeout
    
    
## 10.9.0 (2022-10-17)
    
**Features**

  - Interface AzureSynapseArtifactsLinkedService has a new optional parameter workspaceResourceId
  - Interface FactoryRepoConfiguration has a new optional parameter disablePublish
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter filesV2
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter pythonCodeReference
    
    
## 10.8.0 (2022-09-07)
    
**Features**

  - Added Interface AzureSynapseArtifactsLinkedService
  - Added Interface BigDataPoolParametrizationReference
  - Added Interface GoogleSheetsLinkedService
  - Added Interface NotebookParameter
  - Added Interface SynapseNotebookActivity
  - Added Interface SynapseNotebookReference
  - Added Interface SynapseSparkJobDefinitionActivity
  - Added Interface SynapseSparkJobReference
  - Added Type Alias BigDataPoolReferenceType
  - Added Type Alias NotebookParameterType
  - Added Type Alias NotebookReferenceType
  - Added Type Alias SparkJobReferenceType
  - Added Enum KnownBigDataPoolReferenceType
  - Added Enum KnownNotebookParameterType
  - Added Enum KnownNotebookReferenceType
  - Added Enum KnownSparkJobReferenceType
    
    
## 10.7.0 (2022-06-22)
    
**Features**

  - Added Interface AmazonMWSLinkedService
  - Added Interface AmazonMWSObjectDataset
  - Added Interface AmazonMWSSource
  - Added Interface AmazonRdsForOracleLinkedService
  - Added Interface AmazonRdsForOracleSource
  - Added Interface AmazonRdsForOracleTableDataset
  - Added Interface AmazonRdsForSqlServerLinkedService
  - Added Interface AmazonRdsForSqlServerSource
  - Added Interface AmazonRdsForSqlServerTableDataset
  - Added Interface AmazonRedshiftLinkedService
  - Added Interface AmazonRedshiftSource
  - Added Interface AmazonRedshiftTableDataset
  - Added Interface AmazonS3CompatibleLinkedService
  - Added Interface AmazonS3CompatibleLocation
  - Added Interface AmazonS3CompatibleReadSettings
  - Added Interface AmazonS3Dataset
  - Added Interface AmazonS3LinkedService
  - Added Interface AmazonS3Location
  - Added Interface AmazonS3ReadSettings
  - Added Interface AppendVariableActivity
  - Added Interface AppFiguresLinkedService
  - Added Interface AsanaLinkedService
  - Added Interface AvroDataset
  - Added Interface AvroFormat
  - Added Interface AvroSink
  - Added Interface AvroSource
  - Added Interface AvroWriteSettings
  - Added Interface AzPowerShellSetup
  - Added Interface AzureBatchLinkedService
  - Added Interface AzureBlobDataset
  - Added Interface AzureBlobFSDataset
  - Added Interface AzureBlobFSLinkedService
  - Added Interface AzureBlobFSLocation
  - Added Interface AzureBlobFSReadSettings
  - Added Interface AzureBlobFSSink
  - Added Interface AzureBlobFSSource
  - Added Interface AzureBlobFSWriteSettings
  - Added Interface AzureBlobStorageLinkedService
  - Added Interface AzureBlobStorageLocation
  - Added Interface AzureBlobStorageReadSettings
  - Added Interface AzureBlobStorageWriteSettings
  - Added Interface AzureDatabricksDeltaLakeDataset
  - Added Interface AzureDatabricksDeltaLakeExportCommand
  - Added Interface AzureDatabricksDeltaLakeImportCommand
  - Added Interface AzureDatabricksDeltaLakeLinkedService
  - Added Interface AzureDatabricksDeltaLakeSink
  - Added Interface AzureDatabricksDeltaLakeSource
  - Added Interface AzureDatabricksLinkedService
  - Added Interface AzureDataExplorerCommandActivity
  - Added Interface AzureDataExplorerLinkedService
  - Added Interface AzureDataExplorerSink
  - Added Interface AzureDataExplorerSource
  - Added Interface AzureDataExplorerTableDataset
  - Added Interface AzureDataLakeAnalyticsLinkedService
  - Added Interface AzureDataLakeStoreDataset
  - Added Interface AzureDataLakeStoreLinkedService
  - Added Interface AzureDataLakeStoreLocation
  - Added Interface AzureDataLakeStoreReadSettings
  - Added Interface AzureDataLakeStoreSink
  - Added Interface AzureDataLakeStoreSource
  - Added Interface AzureDataLakeStoreWriteSettings
  - Added Interface AzureFileStorageLinkedService
  - Added Interface AzureFileStorageLocation
  - Added Interface AzureFileStorageReadSettings
  - Added Interface AzureFileStorageWriteSettings
  - Added Interface AzureFunctionActivity
  - Added Interface AzureFunctionLinkedService
  - Added Interface AzureKeyVaultLinkedService
  - Added Interface AzureKeyVaultSecretReference
  - Added Interface AzureMariaDBLinkedService
  - Added Interface AzureMariaDBSource
  - Added Interface AzureMariaDBTableDataset
  - Added Interface AzureMLBatchExecutionActivity
  - Added Interface AzureMLExecutePipelineActivity
  - Added Interface AzureMLLinkedService
  - Added Interface AzureMLServiceLinkedService
  - Added Interface AzureMLUpdateResourceActivity
  - Added Interface AzureMySqlLinkedService
  - Added Interface AzureMySqlSink
  - Added Interface AzureMySqlSource
  - Added Interface AzureMySqlTableDataset
  - Added Interface AzurePostgreSqlLinkedService
  - Added Interface AzurePostgreSqlSink
  - Added Interface AzurePostgreSqlSource
  - Added Interface AzurePostgreSqlTableDataset
  - Added Interface AzureQueueSink
  - Added Interface AzureSearchIndexDataset
  - Added Interface AzureSearchIndexSink
  - Added Interface AzureSearchLinkedService
  - Added Interface AzureSqlDatabaseLinkedService
  - Added Interface AzureSqlDWLinkedService
  - Added Interface AzureSqlDWTableDataset
  - Added Interface AzureSqlMILinkedService
  - Added Interface AzureSqlMITableDataset
  - Added Interface AzureSqlSink
  - Added Interface AzureSqlSource
  - Added Interface AzureSqlTableDataset
  - Added Interface AzureStorageLinkedService
  - Added Interface AzureTableDataset
  - Added Interface AzureTableSink
  - Added Interface AzureTableSource
  - Added Interface AzureTableStorageLinkedService
  - Added Interface BinaryDataset
  - Added Interface BinaryReadSettings
  - Added Interface BinarySink
  - Added Interface BinarySource
  - Added Interface BlobEventsTrigger
  - Added Interface BlobSink
  - Added Interface BlobSource
  - Added Interface BlobTrigger
  - Added Interface CassandraLinkedService
  - Added Interface CassandraSource
  - Added Interface CassandraTableDataset
  - Added Interface ChainingTrigger
  - Added Interface CmdkeySetup
  - Added Interface CommonDataServiceForAppsEntityDataset
  - Added Interface CommonDataServiceForAppsLinkedService
  - Added Interface CommonDataServiceForAppsSink
  - Added Interface CommonDataServiceForAppsSource
  - Added Interface ComponentSetup
  - Added Interface ConcurLinkedService
  - Added Interface ConcurObjectDataset
  - Added Interface ConcurSource
  - Added Interface ControlActivity
  - Added Interface CopyActivity
  - Added Interface CosmosDbLinkedService
  - Added Interface CosmosDbMongoDbApiCollectionDataset
  - Added Interface CosmosDbMongoDbApiLinkedService
  - Added Interface CosmosDbMongoDbApiSink
  - Added Interface CosmosDbMongoDbApiSource
  - Added Interface CosmosDbSqlApiCollectionDataset
  - Added Interface CosmosDbSqlApiSink
  - Added Interface CosmosDbSqlApiSource
  - Added Interface CouchbaseLinkedService
  - Added Interface CouchbaseSource
  - Added Interface CouchbaseTableDataset
  - Added Interface CredentialResource
  - Added Interface CustomActivity
  - Added Interface CustomDataset
  - Added Interface CustomDataSourceLinkedService
  - Added Interface CustomEventsTrigger
  - Added Interface DatabricksNotebookActivity
  - Added Interface DatabricksSparkJarActivity
  - Added Interface DatabricksSparkPythonActivity
  - Added Interface DataFlowDebugResource
  - Added Interface DataFlowResource
  - Added Interface DataFlowSink
  - Added Interface DataFlowSource
  - Added Interface DataLakeAnalyticsUsqlActivity
  - Added Interface DatasetDebugResource
  - Added Interface DatasetResource
  - Added Interface DataworldLinkedService
  - Added Interface Db2LinkedService
  - Added Interface Db2Source
  - Added Interface Db2TableDataset
  - Added Interface DeleteActivity
  - Added Interface DelimitedTextDataset
  - Added Interface DelimitedTextReadSettings
  - Added Interface DelimitedTextSink
  - Added Interface DelimitedTextSource
  - Added Interface DelimitedTextWriteSettings
  - Added Interface DocumentDbCollectionDataset
  - Added Interface DocumentDbCollectionSink
  - Added Interface DocumentDbCollectionSource
  - Added Interface DrillLinkedService
  - Added Interface DrillSource
  - Added Interface DrillTableDataset
  - Added Interface DynamicsAXLinkedService
  - Added Interface DynamicsAXResourceDataset
  - Added Interface DynamicsAXSource
  - Added Interface DynamicsCrmEntityDataset
  - Added Interface DynamicsCrmLinkedService
  - Added Interface DynamicsCrmSink
  - Added Interface DynamicsCrmSource
  - Added Interface DynamicsEntityDataset
  - Added Interface DynamicsLinkedService
  - Added Interface DynamicsSink
  - Added Interface DynamicsSource
  - Added Interface EloquaLinkedService
  - Added Interface EloquaObjectDataset
  - Added Interface EloquaSource
  - Added Interface EnvironmentVariableSetup
  - Added Interface ExcelDataset
  - Added Interface ExcelSource
  - Added Interface ExecuteDataFlowActivity
  - Added Interface ExecutePipelineActivity
  - Added Interface ExecutePowerQueryActivityTypeProperties
  - Added Interface ExecuteSsisPackageActivity
  - Added Interface ExecuteWranglingDataflowActivity
  - Added Interface ExecutionActivity
  - Added Interface Factory
  - Added Interface FactoryGitHubConfiguration
  - Added Interface FactoryVstsConfiguration
  - Added Interface FailActivity
  - Added Interface FileServerLinkedService
  - Added Interface FileServerLocation
  - Added Interface FileServerReadSettings
  - Added Interface FileServerWriteSettings
  - Added Interface FileShareDataset
  - Added Interface FileSystemSink
  - Added Interface FileSystemSource
  - Added Interface FilterActivity
  - Added Interface Flowlet
  - Added Interface ForEachActivity
  - Added Interface FtpReadSettings
  - Added Interface FtpServerLinkedService
  - Added Interface FtpServerLocation
  - Added Interface GetMetadataActivity
  - Added Interface GlobalParameterResource
  - Added Interface GoogleAdWordsLinkedService
  - Added Interface GoogleAdWordsObjectDataset
  - Added Interface GoogleAdWordsSource
  - Added Interface GoogleBigQueryLinkedService
  - Added Interface GoogleBigQueryObjectDataset
  - Added Interface GoogleBigQuerySource
  - Added Interface GoogleCloudStorageLinkedService
  - Added Interface GoogleCloudStorageLocation
  - Added Interface GoogleCloudStorageReadSettings
  - Added Interface GreenplumLinkedService
  - Added Interface GreenplumSource
  - Added Interface GreenplumTableDataset
  - Added Interface HBaseLinkedService
  - Added Interface HBaseObjectDataset
  - Added Interface HBaseSource
  - Added Interface HdfsLinkedService
  - Added Interface HdfsLocation
  - Added Interface HdfsReadSettings
  - Added Interface HdfsSource
  - Added Interface HDInsightHiveActivity
  - Added Interface HDInsightLinkedService
  - Added Interface HDInsightMapReduceActivity
  - Added Interface HDInsightOnDemandLinkedService
  - Added Interface HDInsightPigActivity
  - Added Interface HDInsightSparkActivity
  - Added Interface HDInsightStreamingActivity
  - Added Interface HiveLinkedService
  - Added Interface HiveObjectDataset
  - Added Interface HiveSource
  - Added Interface HttpDataset
  - Added Interface HttpLinkedService
  - Added Interface HttpReadSettings
  - Added Interface HttpServerLocation
  - Added Interface HttpSource
  - Added Interface HubspotLinkedService
  - Added Interface HubspotObjectDataset
  - Added Interface HubspotSource
  - Added Interface IfConditionActivity
  - Added Interface ImpalaLinkedService
  - Added Interface ImpalaObjectDataset
  - Added Interface ImpalaSource
  - Added Interface InformixLinkedService
  - Added Interface InformixSink
  - Added Interface InformixSource
  - Added Interface InformixTableDataset
  - Added Interface IntegrationRuntimeDebugResource
  - Added Interface IntegrationRuntimeResource
  - Added Interface JiraLinkedService
  - Added Interface JiraObjectDataset
  - Added Interface JiraSource
  - Added Interface JsonDataset
  - Added Interface JsonFormat
  - Added Interface JsonReadSettings
  - Added Interface JsonSink
  - Added Interface JsonSource
  - Added Interface JsonWriteSettings
  - Added Interface LinkedIntegrationRuntimeKeyAuthorization
  - Added Interface LinkedIntegrationRuntimeRbacAuthorization
  - Added Interface LinkedServiceDebugResource
  - Added Interface LinkedServiceResource
  - Added Interface LookupActivity
  - Added Interface MagentoLinkedService
  - Added Interface MagentoObjectDataset
  - Added Interface MagentoSource
  - Added Interface ManagedIdentityCredential
  - Added Interface ManagedIntegrationRuntime
  - Added Interface ManagedIntegrationRuntimeStatus
  - Added Interface ManagedPrivateEndpointResource
  - Added Interface ManagedVirtualNetworkResource
  - Added Interface MappingDataFlow
  - Added Interface MariaDBLinkedService
  - Added Interface MariaDBSource
  - Added Interface MariaDBTableDataset
  - Added Interface MarketoLinkedService
  - Added Interface MarketoObjectDataset
  - Added Interface MarketoSource
  - Added Interface MicrosoftAccessLinkedService
  - Added Interface MicrosoftAccessSink
  - Added Interface MicrosoftAccessSource
  - Added Interface MicrosoftAccessTableDataset
  - Added Interface MongoDbAtlasCollectionDataset
  - Added Interface MongoDbAtlasLinkedService
  - Added Interface MongoDbAtlasSink
  - Added Interface MongoDbAtlasSource
  - Added Interface MongoDbCollectionDataset
  - Added Interface MongoDbLinkedService
  - Added Interface MongoDbSource
  - Added Interface MongoDbV2CollectionDataset
  - Added Interface MongoDbV2LinkedService
  - Added Interface MongoDbV2Sink
  - Added Interface MongoDbV2Source
  - Added Interface MultiplePipelineTrigger
  - Added Interface MySqlLinkedService
  - Added Interface MySqlSource
  - Added Interface MySqlTableDataset
  - Added Interface NetezzaLinkedService
  - Added Interface NetezzaSource
  - Added Interface NetezzaTableDataset
  - Added Interface ODataLinkedService
  - Added Interface ODataResourceDataset
  - Added Interface ODataSource
  - Added Interface OdbcLinkedService
  - Added Interface OdbcSink
  - Added Interface OdbcSource
  - Added Interface OdbcTableDataset
  - Added Interface Office365Dataset
  - Added Interface Office365LinkedService
  - Added Interface Office365Source
  - Added Interface OracleCloudStorageLinkedService
  - Added Interface OracleCloudStorageLocation
  - Added Interface OracleCloudStorageReadSettings
  - Added Interface OracleLinkedService
  - Added Interface OracleServiceCloudLinkedService
  - Added Interface OracleServiceCloudObjectDataset
  - Added Interface OracleServiceCloudSource
  - Added Interface OracleSink
  - Added Interface OracleSource
  - Added Interface OracleTableDataset
  - Added Interface OrcDataset
  - Added Interface OrcFormat
  - Added Interface OrcSink
  - Added Interface OrcSource
  - Added Interface OrcWriteSettings
  - Added Interface ParquetDataset
  - Added Interface ParquetFormat
  - Added Interface ParquetSink
  - Added Interface ParquetSource
  - Added Interface ParquetWriteSettings
  - Added Interface PaypalLinkedService
  - Added Interface PaypalObjectDataset
  - Added Interface PaypalSource
  - Added Interface PhoenixLinkedService
  - Added Interface PhoenixObjectDataset
  - Added Interface PhoenixSource
  - Added Interface PipelineResource
  - Added Interface PostgreSqlLinkedService
  - Added Interface PostgreSqlSource
  - Added Interface PostgreSqlTableDataset
  - Added Interface PowerQuerySink
  - Added Interface PowerQuerySource
  - Added Interface PrestoLinkedService
  - Added Interface PrestoObjectDataset
  - Added Interface PrestoSource
  - Added Interface PrivateEndpointConnectionResource
  - Added Interface PrivateLinkConnectionApprovalRequestResource
  - Added Interface PrivateLinkResource
  - Added Interface QuickbaseLinkedService
  - Added Interface QuickBooksLinkedService
  - Added Interface QuickBooksObjectDataset
  - Added Interface QuickBooksSource
  - Added Interface RelationalSource
  - Added Interface RelationalTableDataset
  - Added Interface RerunTumblingWindowTrigger
  - Added Interface ResponsysLinkedService
  - Added Interface ResponsysObjectDataset
  - Added Interface ResponsysSource
  - Added Interface RestResourceDataset
  - Added Interface RestServiceLinkedService
  - Added Interface RestSink
  - Added Interface RestSource
  - Added Interface SalesforceLinkedService
  - Added Interface SalesforceMarketingCloudLinkedService
  - Added Interface SalesforceMarketingCloudObjectDataset
  - Added Interface SalesforceMarketingCloudSource
  - Added Interface SalesforceObjectDataset
  - Added Interface SalesforceServiceCloudLinkedService
  - Added Interface SalesforceServiceCloudObjectDataset
  - Added Interface SalesforceServiceCloudSink
  - Added Interface SalesforceServiceCloudSource
  - Added Interface SalesforceSink
  - Added Interface SalesforceSource
  - Added Interface SapBwCubeDataset
  - Added Interface SapBWLinkedService
  - Added Interface SapBwSource
  - Added Interface SapCloudForCustomerLinkedService
  - Added Interface SapCloudForCustomerResourceDataset
  - Added Interface SapCloudForCustomerSink
  - Added Interface SapCloudForCustomerSource
  - Added Interface SapEccLinkedService
  - Added Interface SapEccResourceDataset
  - Added Interface SapEccSource
  - Added Interface SapHanaLinkedService
  - Added Interface SapHanaSource
  - Added Interface SapHanaTableDataset
  - Added Interface SapOdpLinkedService
  - Added Interface SapOdpResourceDataset
  - Added Interface SapOdpSource
  - Added Interface SapOpenHubLinkedService
  - Added Interface SapOpenHubSource
  - Added Interface SapOpenHubTableDataset
  - Added Interface SapTableLinkedService
  - Added Interface SapTableResourceDataset
  - Added Interface SapTableSource
  - Added Interface ScheduleTrigger
  - Added Interface ScriptActivity
  - Added Interface SecureString
  - Added Interface SelfDependencyTumblingWindowTriggerReference
  - Added Interface SelfHostedIntegrationRuntime
  - Added Interface SelfHostedIntegrationRuntimeStatus
  - Added Interface ServiceNowLinkedService
  - Added Interface ServiceNowObjectDataset
  - Added Interface ServiceNowSource
  - Added Interface ServicePrincipalCredential
  - Added Interface SetVariableActivity
  - Added Interface SftpLocation
  - Added Interface SftpReadSettings
  - Added Interface SftpServerLinkedService
  - Added Interface SftpWriteSettings
  - Added Interface SharePointOnlineListLinkedService
  - Added Interface SharePointOnlineListResourceDataset
  - Added Interface SharePointOnlineListSource
  - Added Interface ShopifyLinkedService
  - Added Interface ShopifyObjectDataset
  - Added Interface ShopifySource
  - Added Interface SmartsheetLinkedService
  - Added Interface SnowflakeDataset
  - Added Interface SnowflakeExportCopyCommand
  - Added Interface SnowflakeImportCopyCommand
  - Added Interface SnowflakeLinkedService
  - Added Interface SnowflakeSink
  - Added Interface SnowflakeSource
  - Added Interface SparkLinkedService
  - Added Interface SparkObjectDataset
  - Added Interface SparkSource
  - Added Interface SqlDWSink
  - Added Interface SqlDWSource
  - Added Interface SqlMISink
  - Added Interface SqlMISource
  - Added Interface SqlServerLinkedService
  - Added Interface SqlServerSink
  - Added Interface SqlServerSource
  - Added Interface SqlServerStoredProcedureActivity
  - Added Interface SqlServerTableDataset
  - Added Interface SqlSink
  - Added Interface SqlSource
  - Added Interface SquareLinkedService
  - Added Interface SquareObjectDataset
  - Added Interface SquareSource
  - Added Interface SsisEnvironment
  - Added Interface SsisFolder
  - Added Interface SsisPackage
  - Added Interface SsisProject
  - Added Interface SwitchActivity
  - Added Interface SybaseLinkedService
  - Added Interface SybaseSource
  - Added Interface SybaseTableDataset
  - Added Interface TabularSource
  - Added Interface TabularTranslator
  - Added Interface TarGZipReadSettings
  - Added Interface TarReadSettings
  - Added Interface TeamDeskLinkedService
  - Added Interface TeradataLinkedService
  - Added Interface TeradataSource
  - Added Interface TeradataTableDataset
  - Added Interface TextFormat
  - Added Interface TriggerDependencyReference
  - Added Interface TriggerResource
  - Added Interface TumblingWindowTrigger
  - Added Interface TumblingWindowTriggerDependencyReference
  - Added Interface TwilioLinkedService
  - Added Interface UntilActivity
  - Added Interface ValidationActivity
  - Added Interface VerticaLinkedService
  - Added Interface VerticaSource
  - Added Interface VerticaTableDataset
  - Added Interface WaitActivity
  - Added Interface WebActivity
  - Added Interface WebAnonymousAuthentication
  - Added Interface WebBasicAuthentication
  - Added Interface WebClientCertificateAuthentication
  - Added Interface WebHookActivity
  - Added Interface WebLinkedService
  - Added Interface WebSource
  - Added Interface WebTableDataset
  - Added Interface WranglingDataFlow
  - Added Interface XeroLinkedService
  - Added Interface XeroObjectDataset
  - Added Interface XeroSource
  - Added Interface XmlDataset
  - Added Interface XmlReadSettings
  - Added Interface XmlSource
  - Added Interface ZendeskLinkedService
  - Added Interface ZipDeflateReadSettings
  - Added Interface ZohoLinkedService
  - Added Interface ZohoObjectDataset
  - Added Interface ZohoSource
  - Added Type Alias Type
  - Added Enum KnownType
    
    
## 10.6.0 (2022-06-07)
    
**Features**

  - Added operation group GlobalParameters
  - Added Interface GlobalParameterListResponse
  - Added Interface GlobalParametersCreateOrUpdateOptionalParams
  - Added Interface GlobalParametersDeleteOptionalParams
  - Added Interface GlobalParametersGetOptionalParams
  - Added Interface GlobalParametersListByFactoryNextOptionalParams
  - Added Interface GlobalParametersListByFactoryOptionalParams
  - Added Interface PurviewConfiguration
  - Added Type Alias GlobalParameterResource
  - Added Type Alias GlobalParametersCreateOrUpdateResponse
  - Added Type Alias GlobalParametersGetResponse
  - Added Type Alias GlobalParametersListByFactoryNextResponse
  - Added Type Alias GlobalParametersListByFactoryResponse
  - Interface ExecuteDataFlowActivityTypeProperties has a new optional parameter sourceStagingConcurrency
  - Class DataFactoryManagementClient has a new parameter globalParameters
  - Type Alias ExecuteDataFlowActivity has a new parameter sourceStagingConcurrency
  - Type Alias ExecuteWranglingDataflowActivity has a new parameter sourceStagingConcurrency
  - Type Alias Factory has a new parameter purviewConfiguration
  - Type Alias RestServiceLinkedService has a new parameter clientId
  - Type Alias RestServiceLinkedService has a new parameter clientSecret
  - Type Alias RestServiceLinkedService has a new parameter tokenEndpoint
  - Type Alias RestServiceLinkedService has a new parameter resource
  - Type Alias RestServiceLinkedService has a new parameter scope
  - Enum KnownRestServiceAuthenticationType has a new value OAuth2ClientCredential
    
    
## 10.5.0 (2022-05-09)
    
**Features**

  - Added Interface PrivateEndpoint
  - Interface PrivateLinkConnectionApprovalRequest has a new optional parameter privateEndpoint
  - Type Alias DataFlowSink has a new parameter rejectedDataLinkedService
    
    
## 10.4.0 (2022-04-20)
    
**Features**

  - Added Type Alias AppFiguresLinkedService
  - Added Type Alias AsanaLinkedService
  - Added Type Alias DataworldLinkedService
  - Added Type Alias TwilioLinkedService
    
    
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
