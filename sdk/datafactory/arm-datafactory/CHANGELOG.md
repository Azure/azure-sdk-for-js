# Release History

## 17.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 17.0.0 (2024-08-27)
    
### Features Added

  - Added Interface AzureStorageLinkedServiceTypeProperties
  - Added Interface AzureTableStorageLinkedServiceTypeProperties
  - Added Interface ContinuationSettingsReference
  - Interface AzureFileStorageLinkedService has a new optional parameter credential
  - Interface AzureFileStorageLinkedService has a new optional parameter serviceEndpoint
  - Interface AzureTableStorageLinkedService has a new optional parameter credential
  - Interface AzureTableStorageLinkedService has a new optional parameter serviceEndpoint
  - Interface CommonDataServiceForAppsLinkedService has a new optional parameter domain
  - Interface DynamicsCrmLinkedService has a new optional parameter domain
  - Interface DynamicsLinkedService has a new optional parameter domain
  - Interface ExecuteDataFlowActivity has a new optional parameter continuationSettings
  - Interface ExecuteDataFlowActivityTypeProperties has a new optional parameter continuationSettings
  - Interface ExecuteWranglingDataflowActivity has a new optional parameter continuationSettings
  - Interface LinkedService has a new optional parameter version
  - Interface RestServiceLinkedService has a new optional parameter servicePrincipalCredentialType
  - Interface RestServiceLinkedService has a new optional parameter servicePrincipalEmbeddedCert
  - Interface RestServiceLinkedService has a new optional parameter servicePrincipalEmbeddedCertPassword
  - Interface SharePointOnlineListLinkedService has a new optional parameter servicePrincipalCredentialType
  - Interface SharePointOnlineListLinkedService has a new optional parameter servicePrincipalEmbeddedCert
  - Interface SharePointOnlineListLinkedService has a new optional parameter servicePrincipalEmbeddedCertPassword
  - Interface SnowflakeExportCopyCommand has a new optional parameter storageIntegration
  - Interface SnowflakeImportCopyCommand has a new optional parameter storageIntegration
  - Interface SqlServerLinkedService has a new optional parameter credential
  - Interface SqlServerLinkedServiceTypeProperties has a new optional parameter credential
  - Interface VerticaLinkedService has a new optional parameter database
  - Interface VerticaLinkedService has a new optional parameter port
  - Interface VerticaLinkedService has a new optional parameter server
  - Interface VerticaLinkedService has a new optional parameter uid
  - Enum KnownDynamicsAuthenticationType has a new value ActiveDirectory
  - Enum KnownSqlServerAuthenticationType has a new value UserAssignedManagedIdentity

### Breaking Changes

  - Interface HDInsightOnDemandLinkedService has a new required parameter versionTypePropertiesVersion
    
    
## 16.0.0 (2024-06-11)
    
### Features Added

  - Added Interface AmazonRdsForSqlServerLinkedServiceTypeProperties
  - Added Interface AzureSqlDatabaseLinkedServiceTypeProperties
  - Added Interface AzureSqlDWLinkedServiceTypeProperties
  - Added Interface AzureSqlMILinkedServiceTypeProperties
  - Added Interface SqlServerBaseLinkedServiceTypeProperties
  - Added Interface SqlServerLinkedServiceTypeProperties
  - Added Type Alias AmazonRdsForSqlAuthenticationType
  - Added Type Alias AzureSqlDatabaseAuthenticationType
  - Added Type Alias AzureSqlDWAuthenticationType
  - Added Type Alias AzureSqlMIAuthenticationType
  - Added Type Alias SqlServerAuthenticationType
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter applicationIntent
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter authenticationType
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter commandTimeout
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter connectRetryCount
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter connectRetryInterval
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter connectTimeout
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter database
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter encrypt
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter failoverPartner
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter hostNameInCertificate
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter integratedSecurity
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter loadBalanceTimeout
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter maxPoolSize
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter minPoolSize
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter multipleActiveResultSets
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter multiSubnetFailover
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter packetSize
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter pooling
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter server
  - Interface AmazonRdsForSqlServerLinkedService has a new optional parameter trustServerCertificate
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter applicationIntent
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter authenticationType
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter commandTimeout
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter connectRetryCount
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter connectRetryInterval
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter connectTimeout
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter database
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter encrypt
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter failoverPartner
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter hostNameInCertificate
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter integratedSecurity
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter loadBalanceTimeout
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter maxPoolSize
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter minPoolSize
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter multipleActiveResultSets
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter multiSubnetFailover
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter packetSize
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter pooling
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter server
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter servicePrincipalCredential
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter servicePrincipalCredentialType
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter trustServerCertificate
  - Interface AzureSqlDatabaseLinkedService has a new optional parameter userName
  - Interface AzureSqlDWLinkedService has a new optional parameter applicationIntent
  - Interface AzureSqlDWLinkedService has a new optional parameter authenticationType
  - Interface AzureSqlDWLinkedService has a new optional parameter commandTimeout
  - Interface AzureSqlDWLinkedService has a new optional parameter connectRetryCount
  - Interface AzureSqlDWLinkedService has a new optional parameter connectRetryInterval
  - Interface AzureSqlDWLinkedService has a new optional parameter connectTimeout
  - Interface AzureSqlDWLinkedService has a new optional parameter database
  - Interface AzureSqlDWLinkedService has a new optional parameter encrypt
  - Interface AzureSqlDWLinkedService has a new optional parameter failoverPartner
  - Interface AzureSqlDWLinkedService has a new optional parameter hostNameInCertificate
  - Interface AzureSqlDWLinkedService has a new optional parameter integratedSecurity
  - Interface AzureSqlDWLinkedService has a new optional parameter loadBalanceTimeout
  - Interface AzureSqlDWLinkedService has a new optional parameter maxPoolSize
  - Interface AzureSqlDWLinkedService has a new optional parameter minPoolSize
  - Interface AzureSqlDWLinkedService has a new optional parameter multipleActiveResultSets
  - Interface AzureSqlDWLinkedService has a new optional parameter multiSubnetFailover
  - Interface AzureSqlDWLinkedService has a new optional parameter packetSize
  - Interface AzureSqlDWLinkedService has a new optional parameter pooling
  - Interface AzureSqlDWLinkedService has a new optional parameter server
  - Interface AzureSqlDWLinkedService has a new optional parameter servicePrincipalCredential
  - Interface AzureSqlDWLinkedService has a new optional parameter servicePrincipalCredentialType
  - Interface AzureSqlDWLinkedService has a new optional parameter trustServerCertificate
  - Interface AzureSqlDWLinkedService has a new optional parameter userName
  - Interface AzureSqlMILinkedService has a new optional parameter applicationIntent
  - Interface AzureSqlMILinkedService has a new optional parameter authenticationType
  - Interface AzureSqlMILinkedService has a new optional parameter commandTimeout
  - Interface AzureSqlMILinkedService has a new optional parameter connectRetryCount
  - Interface AzureSqlMILinkedService has a new optional parameter connectRetryInterval
  - Interface AzureSqlMILinkedService has a new optional parameter connectTimeout
  - Interface AzureSqlMILinkedService has a new optional parameter database
  - Interface AzureSqlMILinkedService has a new optional parameter encrypt
  - Interface AzureSqlMILinkedService has a new optional parameter failoverPartner
  - Interface AzureSqlMILinkedService has a new optional parameter hostNameInCertificate
  - Interface AzureSqlMILinkedService has a new optional parameter integratedSecurity
  - Interface AzureSqlMILinkedService has a new optional parameter loadBalanceTimeout
  - Interface AzureSqlMILinkedService has a new optional parameter maxPoolSize
  - Interface AzureSqlMILinkedService has a new optional parameter minPoolSize
  - Interface AzureSqlMILinkedService has a new optional parameter multipleActiveResultSets
  - Interface AzureSqlMILinkedService has a new optional parameter multiSubnetFailover
  - Interface AzureSqlMILinkedService has a new optional parameter packetSize
  - Interface AzureSqlMILinkedService has a new optional parameter pooling
  - Interface AzureSqlMILinkedService has a new optional parameter server
  - Interface AzureSqlMILinkedService has a new optional parameter servicePrincipalCredential
  - Interface AzureSqlMILinkedService has a new optional parameter servicePrincipalCredentialType
  - Interface AzureSqlMILinkedService has a new optional parameter trustServerCertificate
  - Interface AzureSqlMILinkedService has a new optional parameter userName
  - Interface DynamicsCrmLinkedService has a new optional parameter credential
  - Interface ExpressionV2 has a new optional parameter operators
  - Interface LakeHouseTableDataset has a new optional parameter schemaTypePropertiesSchema
  - Interface ManagedIdentityCredential has a new optional parameter resourceId
  - Interface SalesforceServiceCloudV2Source has a new optional parameter query
  - Interface SalesforceV2Source has a new optional parameter query
  - Interface SqlServerLinkedService has a new optional parameter applicationIntent
  - Interface SqlServerLinkedService has a new optional parameter authenticationType
  - Interface SqlServerLinkedService has a new optional parameter commandTimeout
  - Interface SqlServerLinkedService has a new optional parameter connectRetryCount
  - Interface SqlServerLinkedService has a new optional parameter connectRetryInterval
  - Interface SqlServerLinkedService has a new optional parameter connectTimeout
  - Interface SqlServerLinkedService has a new optional parameter database
  - Interface SqlServerLinkedService has a new optional parameter encrypt
  - Interface SqlServerLinkedService has a new optional parameter failoverPartner
  - Interface SqlServerLinkedService has a new optional parameter hostNameInCertificate
  - Interface SqlServerLinkedService has a new optional parameter integratedSecurity
  - Interface SqlServerLinkedService has a new optional parameter loadBalanceTimeout
  - Interface SqlServerLinkedService has a new optional parameter maxPoolSize
  - Interface SqlServerLinkedService has a new optional parameter minPoolSize
  - Interface SqlServerLinkedService has a new optional parameter multipleActiveResultSets
  - Interface SqlServerLinkedService has a new optional parameter multiSubnetFailover
  - Interface SqlServerLinkedService has a new optional parameter packetSize
  - Interface SqlServerLinkedService has a new optional parameter pooling
  - Interface SqlServerLinkedService has a new optional parameter server
  - Interface SqlServerLinkedService has a new optional parameter trustServerCertificate
  - Type of parameter type of interface Credential_2 is changed from "ManagedIdentity" | "ServicePrincipal" to "ServicePrincipal" | "ManagedIdentity"
  - Added Enum KnownAmazonRdsForSqlAuthenticationType
  - Added Enum KnownAzureSqlDatabaseAuthenticationType
  - Added Enum KnownAzureSqlDWAuthenticationType
  - Added Enum KnownAzureSqlMIAuthenticationType
  - Added Enum KnownSqlServerAuthenticationType
  - Enum KnownExpressionV2Type has a new value NAry

### Breaking Changes

  - Interface ExpressionV2 no longer has parameter operator
  - Type of parameter type of interface ScriptActivityScriptBlock is changed from ScriptType to any
    
    
## 15.0.0 (2024-04-12)
    
### Features Added

  - Added Interface ServicePrincipalCredentialResource
  - Type of parameter headers of interface AzureFunctionActivity is changed from {
        [propertyName: string]: string;
    } to {
        [propertyName: string]: any;
    }
  - Type of parameter headers of interface WebActivity is changed from {
        [propertyName: string]: string;
    } to {
        [propertyName: string]: any;
    }
  - Type of parameter headers of interface WebHookActivity is changed from {
        [propertyName: string]: string;
    } to {
        [propertyName: string]: any;
    }

### Breaking Changes

  - Operation CredentialOperations.createOrUpdate has a new signature
  - Interface ManagedIdentityCredential no longer has parameter resourceId
  - Type of parameter value of interface CredentialListResponse is changed from ManagedIdentityCredentialResource[] to CredentialResource[]
    
    
## 14.1.0 (2024-03-11)
    
### Features Added

  - Added Interface ExpressionV2
  - Added Interface GoogleBigQueryV2LinkedService
  - Added Interface GoogleBigQueryV2ObjectDataset
  - Added Interface GoogleBigQueryV2Source
  - Added Interface PostgreSqlV2LinkedService
  - Added Interface PostgreSqlV2Source
  - Added Interface PostgreSqlV2TableDataset
  - Added Interface ServiceNowV2LinkedService
  - Added Interface ServiceNowV2ObjectDataset
  - Added Interface ServiceNowV2Source
  - Added Type Alias ExpressionV2Type
  - Added Type Alias GoogleBigQueryV2AuthenticationType
  - Added Type Alias ServiceNowV2AuthenticationType
  - Type of parameter type of interface CopySource has four new values "PostgreSqlV2Source" | "GoogleBigQueryV2Source" | "GreenplumSource" | "ServiceNowV2Source"
  - Type of parameter type of interface Dataset has four new values "PostgreSqlV2Source" | "GoogleBigQueryV2Source" | "GreenplumSource" | "ServiceNowV2Source"
  - Type of parameter type of interface LinkedService has three new values "PostgreSqlV2" | "GoogleBigQueryV2" | "ServiceNowV2"
  - Type of parameter type of interface TabularSource has four new values "PostgreSqlV2Source" | "GoogleBigQueryV2Source" | "GreenplumSource" | "ServiceNowV2Source"
  - Added Enum KnownExpressionV2Type
  - Added Enum KnownGoogleBigQueryV2AuthenticationType
  - Added Enum KnownServiceNowV2AuthenticationType
    
    
## 14.0.0 (2024-02-04)
    
### Features Added

  - Added Interface SnowflakeV2Dataset
  - Added Interface SnowflakeV2LinkedService
  - Added Interface SnowflakeV2Sink
  - Added Interface SnowflakeV2Source
  - Added Interface WarehouseLinkedService
  - Added Interface WarehouseSink
  - Added Interface WarehouseSource
  - Added Interface WarehouseTableDataset
  - Added Type Alias SnowflakeAuthenticationType
  - Interface SalesforceServiceCloudV2LinkedService has a new optional parameter authenticationType
  - Interface SalesforceServiceCloudV2Source has a new optional parameter includeDeletedObjects
  - Interface SalesforceV2LinkedService has a new optional parameter authenticationType
  - Interface SalesforceV2Source has a new optional parameter includeDeletedObjects
  - Type of parameter type of interface CopySink has two new values  "WarehouseSink" | "SnowflakeV2Sink"
  - Type of parameter type of interface CopySource has two new values "WarehouseSource" | "SnowflakeV2Source"
  - Type of parameter type of interface Dataset has two new values "SnowflakeV2Table" | "WarehouseTable"
  - Type of parameter type of interface LinkedService has two new values "SnowflakeV2" | "Warehouse"
  - Type of parameter type of interface TabularSource has a new value "WarehouseSource"
  - Added Enum KnownSnowflakeAuthenticationType

### Breaking Changes

  - Interface SalesforceServiceCloudV2Source no longer has parameter readBehavior
  - Interface SalesforceV2Source no longer has parameter readBehavior
  - Type of parameter headers of interface AzureFunctionActivity is changed from any to {
        [propertyName: string]: string;
    }
  - Type of parameter headers of interface WebActivity is changed from any to {
        [propertyName: string]: string;
    }
  - Type of parameter headers of interface WebHookActivity is changed from any to {
        [propertyName: string]: string;
    }
  - Removed Enum KnownSalesforceV2SourceReadBehavior
    
    
## 13.0.0 (2023-12-28)
    
### Features Added

  - Added Interface SalesforceServiceCloudV2LinkedService
  - Added Interface SalesforceServiceCloudV2ObjectDataset
  - Added Interface SalesforceServiceCloudV2Sink
  - Added Interface SalesforceServiceCloudV2Source
  - Added Interface SalesforceV2LinkedService
  - Added Interface SalesforceV2ObjectDataset
  - Added Interface SalesforceV2Sink
  - Added Interface SalesforceV2Source
  - Added Type Alias SalesforceV2SinkWriteBehavior
  - Added Type Alias SalesforceV2SourceReadBehavior
  - Interface MariaDBLinkedService has a new optional parameter database
  - Interface MariaDBLinkedService has a new optional parameter driverVersion
  - Interface MariaDBLinkedService has a new optional parameter password
  - Interface MariaDBLinkedService has a new optional parameter port
  - Interface MariaDBLinkedService has a new optional parameter server
  - Interface MariaDBLinkedService has a new optional parameter username
  - Interface MySqlLinkedService has a new optional parameter database
  - Interface MySqlLinkedService has a new optional parameter driverVersion
  - Interface MySqlLinkedService has a new optional parameter port
  - Interface MySqlLinkedService has a new optional parameter server
  - Interface MySqlLinkedService has a new optional parameter sslMode
  - Interface MySqlLinkedService has a new optional parameter username
  - Interface MySqlLinkedService has a new optional parameter useSystemTrustStore
  - Interface StoreWriteSettings has a new optional parameter metadata
  - Interface WebActivity has a new optional parameter httpRequestTimeout
  - Interface WebActivity has a new optional parameter turnOffAsync
  - Type of parameter type of interface CopySink has two new values "SalesforceV2Sink" | "SalesforceServiceCloudV2Sink"  
  - Type of parameter type of interface CopySource has two new values "SalesforceV2Source" | "SalesforceServiceCloudV2Source"
  - Type of parameter type of interface Dataset has two new values "SalesforceV2Object" | "SalesforceServiceCloudV2Object"
  - Type of parameter type of interface LinkedService has two new values "SalesforceV2" | "SalesforceServiceCloudV2"
  - Type of parameter type of interface TabularSource has a new value "SalesforceV2Source"
  - Added Enum KnownSalesforceV2SinkWriteBehavior
  - Added Enum KnownSalesforceV2SourceReadBehavior

### Breaking Changes

  - Interface MariaDBLinkedService no longer has parameter pwd
    
    
## 12.0.0 (2023-11-10)
    
### Features Added

  - Added operation group ChangeDataCapture
  - Added Interface ChangeDataCaptureCreateOrUpdateOptionalParams
  - Added Interface ChangeDataCaptureDeleteOptionalParams
  - Added Interface ChangeDataCaptureFolder
  - Added Interface ChangeDataCaptureGetOptionalParams
  - Added Interface ChangeDataCaptureListByFactoryNextOptionalParams
  - Added Interface ChangeDataCaptureListByFactoryOptionalParams
  - Added Interface ChangeDataCaptureListResponse
  - Added Interface ChangeDataCaptureResource
  - Added Interface ChangeDataCaptureStartOptionalParams
  - Added Interface ChangeDataCaptureStatusOptionalParams
  - Added Interface ChangeDataCaptureStopOptionalParams
  - Added Interface DataMapperMapping
  - Added Interface IntegrationRuntimeDataFlowPropertiesCustomPropertiesItem
  - Added Interface LakeHouseLinkedService
  - Added Interface LakeHouseLocation
  - Added Interface LakeHouseReadSettings
  - Added Interface LakeHouseTableDataset
  - Added Interface LakeHouseTableSink
  - Added Interface LakeHouseTableSource
  - Added Interface LakeHouseWriteSettings
  - Added Interface MapperAttributeMapping
  - Added Interface MapperAttributeMappings
  - Added Interface MapperAttributeReference
  - Added Interface MapperConnection
  - Added Interface MapperConnectionReference
  - Added Interface MapperDslConnectorProperties
  - Added Interface MapperPolicy
  - Added Interface MapperPolicyRecurrence
  - Added Interface MapperSourceConnectionsInfo
  - Added Interface MapperTable
  - Added Interface MapperTableSchema
  - Added Interface MapperTargetConnectionsInfo
  - Added Interface OutputColumn
  - Added Interface ParquetReadSettings
  - Added Interface SecureInputOutputPolicy
  - Added Type Alias ActivityOnInactiveMarkAs
  - Added Type Alias ActivityState
  - Added Type Alias ChangeDataCaptureCreateOrUpdateResponse
  - Added Type Alias ChangeDataCaptureGetResponse
  - Added Type Alias ChangeDataCaptureListByFactoryNextResponse
  - Added Type Alias ChangeDataCaptureListByFactoryResponse
  - Added Type Alias ChangeDataCaptureStatusResponse
  - Added Type Alias ConnectionType
  - Added Type Alias FrequencyType
  - Added Type Alias MappingType
  - Interface Activity has a new optional parameter onInactiveMarkAs
  - Interface Activity has a new optional parameter state
  - Interface AmazonRdsForSqlServerSource has a new optional parameter isolationLevel
  - Interface AzureMLServiceLinkedService has a new optional parameter authentication
  - Interface AzureSqlSource has a new optional parameter isolationLevel
  - Interface GoogleAdWordsLinkedService has a new optional parameter googleAdsApiVersion
  - Interface GoogleAdWordsLinkedService has a new optional parameter loginCustomerID
  - Interface GoogleAdWordsLinkedService has a new optional parameter privateKey
  - Interface GoogleAdWordsLinkedService has a new optional parameter supportLegacyDataTypes
  - Interface HttpReadSettings has a new optional parameter additionalColumns
  - Interface IntegrationRuntimeDataFlowProperties has a new optional parameter customProperties
  - Interface MongoDbAtlasLinkedService has a new optional parameter driverVersion
  - Interface ParquetSource has a new optional parameter formatSettings
  - Interface PipelineExternalComputeScaleProperties has a new optional parameter numberOfExternalNodes
  - Interface PipelineExternalComputeScaleProperties has a new optional parameter numberOfPipelineNodes
  - Interface SelfHostedIntegrationRuntime has a new optional parameter selfContainedInteractiveAuthoringEnabled
  - Interface SelfHostedIntegrationRuntimeStatus has a new optional parameter selfContainedInteractiveAuthoringEnabled
  - Interface SetVariableActivity has a new optional parameter policy
  - Interface SetVariableActivity has a new optional parameter setSystemVariable
  - Interface SqlDWSource has a new optional parameter isolationLevel
  - Interface SqlMISource has a new optional parameter isolationLevel
  - Interface SqlServerSource has a new optional parameter isolationLevel
  - Interface SynapseNotebookActivity has a new optional parameter configurationType
  - Interface SynapseNotebookActivity has a new optional parameter sparkConfig
  - Interface SynapseNotebookActivity has a new optional parameter targetSparkConfiguration
  - Interface WebHookActivity has a new optional parameter policy
  - Type of parameter type of interface CopySink is changed from 
  
  ```
  "DelimitedTextSink" | "JsonSink" | "OrcSink" | "RestSink" | "AzurePostgreSqlSink" | "AzureMySqlSink" | "AzureDatabricksDeltaLakeSink" | "SapCloudForCustomerSink" | "AzureQueueSink" | "AzureTableSink" | "AvroSink" | "ParquetSink" | "BinarySink" | "BlobSink" | "FileSystemSink" | "DocumentDbCollectionSink" | "CosmosDbSqlApiSink" | "SqlSink" | "SqlServerSink" | "AzureSqlSink" | "SqlMISink" | "SqlDWSink" | "SnowflakeSink" | "OracleSink" | "AzureDataLakeStoreSink" | "AzureBlobFSSink" | "AzureSearchIndexSink" | "OdbcSink" | "InformixSink" | "MicrosoftAccessSink" | "DynamicsSink" | "DynamicsCrmSink" | "CommonDataServiceForAppsSink" | "AzureDataExplorerSink" | "SalesforceSink" | "SalesforceServiceCloudSink" | "MongoDbAtlasSink" | "MongoDbV2Sink" | "CosmosDbMongoDbApiSink"
  ``` 
  to
  ```
  "DelimitedTextSink" | "JsonSink" | "OrcSink" | "RestSink" | "AzurePostgreSqlSink" | "AzureMySqlSink" | "AzureDatabricksDeltaLakeSink" | "SapCloudForCustomerSink" | "AzureQueueSink" | "AzureTableSink" | "AvroSink" | "ParquetSink" | "BinarySink" | "BlobSink" | "FileSystemSink" | "DocumentDbCollectionSink" | "CosmosDbSqlApiSink" | "SqlSink" | "SqlServerSink" | "AzureSqlSink" | "SqlMISink" | "SqlDWSink" | "SnowflakeSink" | "OracleSink" | "AzureDataLakeStoreSink" | "AzureBlobFSSink" | "AzureSearchIndexSink" | "OdbcSink" | "InformixSink" | "MicrosoftAccessSink" | "DynamicsSink" | "DynamicsCrmSink" | "CommonDataServiceForAppsSink" | "AzureDataExplorerSink" | "SalesforceSink" | "SalesforceServiceCloudSink" | "MongoDbAtlasSink" | "MongoDbV2Sink" | "CosmosDbMongoDbApiSink" | "LakeHouseTableSink"
  ```
  - Type of parameter type of interface CopySource is changed from ```
  "AvroSource" | "ExcelSource" | "ParquetSource" | "DelimitedTextSource" | "JsonSource" | "XmlSource" | "OrcSource" | "BinarySource" | "TabularSource" | "AzureTableSource" | "BlobSource" | "DocumentDbCollectionSource" | "CosmosDbSqlApiSource" | "DynamicsSource" | "DynamicsCrmSource" | "CommonDataServiceForAppsSource" | "RelationalSource" | "InformixSource" | "MicrosoftAccessSource" | "Db2Source" | "OdbcSource" | "MySqlSource" | "PostgreSqlSource" | "SybaseSource" | "SapBwSource" | "ODataSource" | "SalesforceSource" | "SalesforceServiceCloudSource" | "SapCloudForCustomerSource" | "SapEccSource" | "SapHanaSource" | "SapOpenHubSource" | "SapOdpSource" | "SapTableSource" | "RestSource" | "SqlSource" | "SqlServerSource" | "AmazonRdsForSqlServerSource" | "AzureSqlSource" | "SqlMISource" | "SqlDWSource" | "FileSystemSource" | "HdfsSource" | "AzureMySqlSource" | "AzureDataExplorerSource" | "OracleSource" | "AmazonRdsForOracleSource" | "TeradataSource" | "WebSource" | "CassandraSource" | "MongoDbSource" | "MongoDbAtlasSource" | "MongoDbV2Source" | "CosmosDbMongoDbApiSource" | "Office365Source" | "AzureDataLakeStoreSource" | "AzureBlobFSSource" | "HttpSource" | "AmazonMWSSource" | "AzurePostgreSqlSource" | "ConcurSource" | "CouchbaseSource" | "DrillSource" | "EloquaSource" | "GoogleBigQuerySource" | "GreenplumSource" | "HBaseSource" | "HiveSource" | "HubspotSource" | "ImpalaSource" | "JiraSource" | "MagentoSource" | "MariaDBSource" | "AzureMariaDBSource" | "MarketoSource" | "PaypalSource" | "PhoenixSource" | "PrestoSource" | "QuickBooksSource" | "ServiceNowSource" | "ShopifySource" | "SparkSource" | "SquareSource" | "XeroSource" | "ZohoSource" | "NetezzaSource" | "VerticaSource" | "SalesforceMarketingCloudSource" | "ResponsysSource" | "DynamicsAXSource" | "OracleServiceCloudSource" | "GoogleAdWordsSource" | "AmazonRedshiftSource" | "SnowflakeSource" | "AzureDatabricksDeltaLakeSource" | "SharePointOnlineListSource"
  ``` 
  to 
  ```
  "AvroSource" | "ExcelSource" | "ParquetSource" | "DelimitedTextSource" | "JsonSource" | "XmlSource" | "OrcSource" | "BinarySource" | "TabularSource" | "AzureTableSource" | "BlobSource" | "DocumentDbCollectionSource" | "CosmosDbSqlApiSource" | "DynamicsSource" | "DynamicsCrmSource" | "CommonDataServiceForAppsSource" | "RelationalSource" | "InformixSource" | "MicrosoftAccessSource" | "Db2Source" | "OdbcSource" | "MySqlSource" | "PostgreSqlSource" | "SybaseSource" | "SapBwSource" | "ODataSource" | "SalesforceSource" | "SalesforceServiceCloudSource" | "SapCloudForCustomerSource" | "SapEccSource" | "SapHanaSource" | "SapOpenHubSource" | "SapOdpSource" | "SapTableSource" | "RestSource" | "SqlSource" | "SqlServerSource" | "AmazonRdsForSqlServerSource" | "AzureSqlSource" | "SqlMISource" | "SqlDWSource" | "FileSystemSource" | "HdfsSource" | "AzureMySqlSource" | "AzureDataExplorerSource" | "OracleSource" | "AmazonRdsForOracleSource" | "TeradataSource" | "WebSource" | "CassandraSource" | "MongoDbSource" | "MongoDbAtlasSource" | "MongoDbV2Source" | "CosmosDbMongoDbApiSource" | "Office365Source" | "AzureDataLakeStoreSource" | "AzureBlobFSSource" | "HttpSource" | "AmazonMWSSource" | "AzurePostgreSqlSource" | "ConcurSource" | "CouchbaseSource" | "DrillSource" | "EloquaSource" | "GoogleBigQuerySource" | "GreenplumSource" | "HBaseSource" | "HiveSource" | "HubspotSource" | "ImpalaSource" | "JiraSource" | "MagentoSource" | "MariaDBSource" | "AzureMariaDBSource" | "MarketoSource" | "PaypalSource" | "PhoenixSource" | "PrestoSource" | "QuickBooksSource" | "ServiceNowSource" | "ShopifySource" | "SparkSource" | "SquareSource" | "XeroSource" | "ZohoSource" | "NetezzaSource" | "VerticaSource" | "SalesforceMarketingCloudSource" | "ResponsysSource" | "DynamicsAXSource" | "OracleServiceCloudSource" | "GoogleAdWordsSource" | "AmazonRedshiftSource" | "LakeHouseTableSource" | "SnowflakeSource" | "AzureDatabricksDeltaLakeSource" | "SharePointOnlineListSource"
  ```
  - Type of parameter type of interface Dataset is changed from ```
  "AmazonS3Object" | "Avro" | "Excel" | "Parquet" | "DelimitedText" | "Json" | "Xml" | "Orc" | "Binary" | "AzureBlob" | "AzureTable" | "AzureSqlTable" | "AzureSqlMITable" | "AzureSqlDWTable" | "CassandraTable" | "CustomDataset" | "CosmosDbSqlApiCollection" | "DocumentDbCollection" | "DynamicsEntity" | "DynamicsCrmEntity" | "CommonDataServiceForAppsEntity" | "AzureDataLakeStoreFile" | "AzureBlobFSFile" | "Office365Table" | "FileShare" | "MongoDbCollection" | "MongoDbAtlasCollection" | "MongoDbV2Collection" | "CosmosDbMongoDbApiCollection" | "ODataResource" | "OracleTable" | "AmazonRdsForOracleTable" | "TeradataTable" | "AzureMySqlTable" | "AmazonRedshiftTable" | "Db2Table" | "RelationalTable" | "InformixTable" | "OdbcTable" | "MySqlTable" | "PostgreSqlTable" | "MicrosoftAccessTable" | "SalesforceObject" | "SalesforceServiceCloudObject" | "SybaseTable" | "SapBwCube" | "SapCloudForCustomerResource" | "SapEccResource" | "SapHanaTable" | "SapOpenHubTable" | "SqlServerTable" | "AmazonRdsForSqlServerTable" | "RestResource" | "SapTableResource" | "SapOdpResource" | "WebTable" | "AzureSearchIndex" | "HttpFile" | "AmazonMWSObject" | "AzurePostgreSqlTable" | "ConcurObject" | "CouchbaseTable" | "DrillTable" | "EloquaObject" | "GoogleBigQueryObject" | "GreenplumTable" | "HBaseObject" | "HiveObject" | "HubspotObject" | "ImpalaObject" | "JiraObject" | "MagentoObject" | "MariaDBTable" | "AzureMariaDBTable" | "MarketoObject" | "PaypalObject" | "PhoenixObject" | "PrestoObject" | "QuickBooksObject" | "ServiceNowObject" | "ShopifyObject" | "SparkObject" | "SquareObject" | "XeroObject" | "ZohoObject" | "NetezzaTable" | "VerticaTable" | "SalesforceMarketingCloudObject" | "ResponsysObject" | "DynamicsAXResource" | "OracleServiceCloudObject" | "AzureDataExplorerTable" | "GoogleAdWordsObject" | "SnowflakeTable" | "SharePointOnlineListResource" | "AzureDatabricksDeltaLakeDataset"
  ``` 
  to 
  ```
  "AmazonS3Object" | "Avro" | "Excel" | "Parquet" | "DelimitedText" | "Json" | "Xml" | "Orc" | "Binary" | "AzureBlob" | "AzureTable" | "AzureSqlTable" | "AzureSqlMITable" | "AzureSqlDWTable" | "CassandraTable" | "CustomDataset" | "CosmosDbSqlApiCollection" | "DocumentDbCollection" | "DynamicsEntity" | "DynamicsCrmEntity" | "CommonDataServiceForAppsEntity" | "AzureDataLakeStoreFile" | "AzureBlobFSFile" | "Office365Table" | "FileShare" | "MongoDbCollection" | "MongoDbAtlasCollection" | "MongoDbV2Collection" | "CosmosDbMongoDbApiCollection" | "ODataResource" | "OracleTable" | "AmazonRdsForOracleTable" | "TeradataTable" | "AzureMySqlTable" | "AmazonRedshiftTable" | "Db2Table" | "RelationalTable" | "InformixTable" | "OdbcTable" | "MySqlTable" | "PostgreSqlTable" | "MicrosoftAccessTable" | "SalesforceObject" | "SalesforceServiceCloudObject" | "SybaseTable" | "SapBwCube" | "SapCloudForCustomerResource" | "SapEccResource" | "SapHanaTable" | "SapOpenHubTable" | "SqlServerTable" | "AmazonRdsForSqlServerTable" | "RestResource" | "SapTableResource" | "SapOdpResource" | "WebTable" | "AzureSearchIndex" | "HttpFile" | "AmazonMWSObject" | "AzurePostgreSqlTable" | "ConcurObject" | "CouchbaseTable" | "DrillTable" | "EloquaObject" | "GoogleBigQueryObject" | "GreenplumTable" | "HBaseObject" | "HiveObject" | "HubspotObject" | "ImpalaObject" | "JiraObject" | "MagentoObject" | "MariaDBTable" | "AzureMariaDBTable" | "MarketoObject" | "PaypalObject" | "PhoenixObject" | "PrestoObject" | "QuickBooksObject" | "ServiceNowObject" | "ShopifyObject" | "SparkObject" | "SquareObject" | "XeroObject" | "ZohoObject" | "NetezzaTable" | "VerticaTable" | "SalesforceMarketingCloudObject" | "ResponsysObject" | "DynamicsAXResource" | "OracleServiceCloudObject" | "AzureDataExplorerTable" | "GoogleAdWordsObject" | "SnowflakeTable" | "SharePointOnlineListResource" | "AzureDatabricksDeltaLakeDataset" | "LakeHouseTable"
  ```
  - Type of parameter type of interface DatasetLocation is changed from
  ```
  "AzureBlobStorageLocation" | "AzureBlobFSLocation" | "AzureDataLakeStoreLocation" | "AmazonS3Location" | "FileServerLocation" | "AzureFileStorageLocation" | "AmazonS3CompatibleLocation" | "OracleCloudStorageLocation" | "GoogleCloudStorageLocation" | "FtpServerLocation" | "SftpLocation" | "HttpServerLocation" | "HdfsLocation"
  ``` 
  to 
  ```
  "AzureBlobStorageLocation" | "AzureBlobFSLocation" | "AzureDataLakeStoreLocation" | "AmazonS3Location" | "FileServerLocation" | "AzureFileStorageLocation" | "AmazonS3CompatibleLocation" | "OracleCloudStorageLocation" | "GoogleCloudStorageLocation" | "FtpServerLocation" | "SftpLocation" | "HttpServerLocation" | "HdfsLocation" | "LakeHouseLocation"
  ```
  - Type of parameter type of interface FormatReadSettings is changed from 
  ```
  "DelimitedTextReadSettings" | "JsonReadSettings" | "XmlReadSettings" | "BinaryReadSettings"
  ``` 
  to
  ```
  "ParquetReadSettings" | "DelimitedTextReadSettings" | "JsonReadSettings" | "XmlReadSettings" | "BinaryReadSettings"
  ```
  - Type of parameter type of interface LinkedService is changed from 
  ```
  "AzureStorage" | "AzureBlobStorage" | "AzureTableStorage" | "AzureSqlDW" | "SqlServer" | "AmazonRdsForSqlServer" | "AzureSqlDatabase" | "AzureSqlMI" | "AzureBatch" | "AzureKeyVault" | "CosmosDb" | "Dynamics" | "DynamicsCrm" | "CommonDataServiceForApps" | "HDInsight" | "FileServer" | "AzureFileStorage" | "AmazonS3Compatible" | "OracleCloudStorage" | "GoogleCloudStorage" | "Oracle" | "AmazonRdsForOracle" | "AzureMySql" | "MySql" | "PostgreSql" | "Sybase" | "Db2" | "Teradata" | "AzureML" | "AzureMLService" | "Odbc" | "Informix" | "MicrosoftAccess" | "Hdfs" | "OData" | "Web" | "Cassandra" | "MongoDb" | "MongoDbAtlas" | "MongoDbV2" | "CosmosDbMongoDbApi" | "AzureDataLakeStore" | "AzureBlobFS" | "Office365" | "Salesforce" | "SalesforceServiceCloud" | "SapCloudForCustomer" | "SapEcc" | "SapOpenHub" | "SapOdp" | "RestService" | "TeamDesk" | "Quickbase" | "Smartsheet" | "Zendesk" | "Dataworld" | "AppFigures" | "Asana" | "Twilio" | "GoogleSheets" | "AmazonS3" | "AmazonRedshift" | "CustomDataSource" | "AzureSearch" | "HttpServer" | "FtpServer" | "Sftp" | "SapBW" | "SapHana" | "AmazonMWS" | "AzurePostgreSql" | "Concur" | "Couchbase" | "Drill" | "Eloqua" | "GoogleBigQuery" | "Greenplum" | "HBase" | "Hive" | "Hubspot" | "Impala" | "Jira" | "Magento" | "MariaDB" | "AzureMariaDB" | "Marketo" | "Paypal" | "Phoenix" | "Presto" | "QuickBooks" | "ServiceNow" | "Shopify" | "Spark" | "Square" | "Xero" | "Zoho" | "Vertica" | "Netezza" | "SalesforceMarketingCloud" | "HDInsightOnDemand" | "AzureDataLakeAnalytics" | "AzureDatabricks" | "AzureDatabricksDeltaLake" | "Responsys" | "DynamicsAX" | "OracleServiceCloud" | "GoogleAdWords" | "SapTable" | "AzureDataExplorer" | "AzureFunction" | "Snowflake" | "SharePointOnlineList" | "AzureSynapseArtifacts"
  ```
  to
  ```
  "AzureStorage" | "AzureBlobStorage" | "AzureTableStorage" | "AzureSqlDW" | "SqlServer" | "AmazonRdsForSqlServer" | "AzureSqlDatabase" | "AzureSqlMI" | "AzureBatch" | "AzureKeyVault" | "CosmosDb" | "Dynamics" | "DynamicsCrm" | "CommonDataServiceForApps" | "HDInsight" | "FileServer" | "AzureFileStorage" | "AmazonS3Compatible" | "OracleCloudStorage" | "GoogleCloudStorage" | "Oracle" | "AmazonRdsForOracle" | "AzureMySql" | "MySql" | "PostgreSql" | "Sybase" | "Db2" | "Teradata" | "AzureML" | "AzureMLService" | "Odbc" | "Informix" | "MicrosoftAccess" | "Hdfs" | "OData" | "Web" | "Cassandra" | "MongoDb" | "MongoDbAtlas" | "MongoDbV2" | "CosmosDbMongoDbApi" | "AzureDataLakeStore" | "AzureBlobFS" | "Office365" | "Salesforce" | "SalesforceServiceCloud" | "SapCloudForCustomer" | "SapEcc" | "SapOpenHub" | "SapOdp" | "RestService" | "TeamDesk" | "Quickbase" | "Smartsheet" | "Zendesk" | "Dataworld" | "AppFigures" | "Asana" | "Twilio" | "GoogleSheets" | "AmazonS3" | "AmazonRedshift" | "CustomDataSource" | "AzureSearch" | "HttpServer" | "FtpServer" | "Sftp" | "SapBW" | "SapHana" | "AmazonMWS" | "AzurePostgreSql" | "Concur" | "Couchbase" | "Drill" | "Eloqua" | "GoogleBigQuery" | "Greenplum" | "HBase" | "Hive" | "Hubspot" | "Impala" | "Jira" | "Magento" | "MariaDB" | "AzureMariaDB" | "Marketo" | "Paypal" | "Phoenix" | "Presto" | "QuickBooks" | "ServiceNow" | "Shopify" | "Spark" | "Square" | "Xero" | "Zoho" | "Vertica" | "Netezza" | "SalesforceMarketingCloud" | "HDInsightOnDemand" | "AzureDataLakeAnalytics" | "AzureDatabricks" | "AzureDatabricksDeltaLake" | "Responsys" | "DynamicsAX" | "OracleServiceCloud" | "GoogleAdWords" | "SapTable" | "AzureDataExplorer" | "AzureFunction" | "Snowflake" | "SharePointOnlineList" | "AzureSynapseArtifacts" | "LakeHouse"
  ```
  - Type of parameter type of interface StoreReadSettings is changed from 
  ```
  "AzureBlobStorageReadSettings" | "AzureBlobFSReadSettings" | "AzureDataLakeStoreReadSettings" | "AmazonS3ReadSettings" | "FileServerReadSettings" | "AzureFileStorageReadSettings" | "AmazonS3CompatibleReadSettings" | "OracleCloudStorageReadSettings" | "GoogleCloudStorageReadSettings" | "FtpReadSettings" | "SftpReadSettings" | "HttpReadSettings" | "HdfsReadSettings"
  ```
  to 
  ```
  "AzureBlobStorageReadSettings" | "AzureBlobFSReadSettings" | "AzureDataLakeStoreReadSettings" | "AmazonS3ReadSettings" | "FileServerReadSettings" | "AzureFileStorageReadSettings" | "AmazonS3CompatibleReadSettings" | "OracleCloudStorageReadSettings" | "GoogleCloudStorageReadSettings" | "FtpReadSettings" | "SftpReadSettings" | "HttpReadSettings" | "HdfsReadSettings" | "LakeHouseReadSettings"
  ```
  - Type of parameter type of interface StoreWriteSettings is changed from 
  ```
  "SftpWriteSettings" | "AzureBlobStorageWriteSettings" | "AzureBlobFSWriteSettings" | "AzureDataLakeStoreWriteSettings" | "FileServerWriteSettings" | "AzureFileStorageWriteSettings"
  ``` 
  to
  ```
  "SftpWriteSettings" | "AzureBlobStorageWriteSettings" | "AzureBlobFSWriteSettings" | "AzureDataLakeStoreWriteSettings" | "FileServerWriteSettings" | "AzureFileStorageWriteSettings" | "LakeHouseWriteSettings"
  ```
  - Added Enum KnownActivityOnInactiveMarkAs
  - Added Enum KnownActivityState
  - Added Enum KnownConnectionType
  - Added Enum KnownFrequencyType
  - Added Enum KnownMappingType

### Breaking Changes

  - Interface HttpReadSettings no longer has parameter enablePartitionDiscovery
  - Interface HttpReadSettings no longer has parameter partitionRootPath
  - Type of parameter encryptedCredential of interface AmazonMWSLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AmazonRdsForOracleLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AmazonRdsForSqlServerLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AmazonRedshiftLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AmazonS3CompatibleLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface AmazonS3CompatibleReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface AmazonS3LinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface AmazonS3ReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface AsanaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureBatchLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureBlobFSLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface AzureBlobFSReadSettings is changed from boolean to any
  - Type of parameter accountKind of interface AzureBlobStorageLinkedService is changed from string to any
  - Type of parameter serviceEndpoint of interface AzureBlobStorageLinkedService is changed from string to any
  - Type of parameter enablePartitionDiscovery of interface AzureBlobStorageReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface AzureDatabricksDeltaLakeLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureDatabricksLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureDataLakeAnalyticsLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureDataLakeStoreLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface AzureDataLakeStoreReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface AzureFileStorageLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface AzureFileStorageReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface AzureFunctionLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureMariaDBLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureMLLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureMLServiceLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureMySqlLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzurePostgreSqlLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureSearchLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureSqlDatabaseLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureSqlDWLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface AzureSqlMILinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface CassandraLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface CommonDataServiceForAppsLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ConcurLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface CosmosDbLinkedService is changed from any to string
  - Type of parameter servicePrincipalCredentialType of interface CosmosDbLinkedService is changed from CosmosDbServicePrincipalCredentialType to any
  - Type of parameter encryptedCredential of interface CouchbaseLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface DataworldLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface Db2LinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface DrillLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface DynamicsAXLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface DynamicsCrmLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface DynamicsLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface EloquaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface FileServerLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface FileServerReadSettings is changed from boolean to any
  - Type of parameter enablePartitionDiscovery of interface FtpReadSettings is changed from boolean to any
  - Type of parameter useBinaryTransfer of interface FtpReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface FtpServerLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface GoogleAdWordsLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface GoogleBigQueryLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface GoogleCloudStorageLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface GoogleCloudStorageReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface GoogleSheetsLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface GreenplumLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HBaseLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HdfsLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface HdfsReadSettings is changed from boolean to any
  - Type of parameter variables of interface HDInsightHiveActivity is changed from any[] to {  [propertyName: string]: any;  }
  - Type of parameter encryptedCredential of interface HDInsightLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HDInsightOnDemandLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HiveLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HttpLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface HubspotLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ImpalaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface InformixLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface JiraLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MagentoLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MariaDBLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MarketoLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MicrosoftAccessLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MongoDbLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface MySqlLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface NetezzaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ODataLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface OdbcLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface Office365LinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface OracleCloudStorageLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface OracleCloudStorageReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface OracleLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface OracleServiceCloudLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface PaypalLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface PhoenixLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface PostgreSqlLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface PrestoLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface QuickbaseLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface QuickBooksLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ResponsysLinkedService is changed from any to string
  - Type of parameter additionalHeaders of interface RestResourceDataset is changed from any to {  [propertyName: string]: any;  }
  - Type of parameter paginationRules of interface RestResourceDataset is changed from any to {  [propertyName: string]: any;  }
  - Type of parameter encryptedCredential of interface RestServiceLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SalesforceLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SalesforceMarketingCloudLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SalesforceServiceCloudLinkedService is changed from any to string
  - Type of parameter readBehavior of interface SalesforceServiceCloudSource is changed from SalesforceSourceReadBehavior to any
  - Type of parameter readBehavior of interface SalesforceSource is changed from SalesforceSourceReadBehavior to any
  - Type of parameter encryptedCredential of interface SapBWLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SapCloudForCustomerLinkedService is changed from any to string
  - Type of parameter url of interface SapEccLinkedService is changed from string to any
  - Type of parameter username of interface SapEccLinkedService is changed from string to any
  - Type of parameter encryptedCredential of interface SapHanaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SapOdpLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SapOpenHubLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SapTableLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ServiceNowLinkedService is changed from any to string
  - Type of parameter enablePartitionDiscovery of interface SftpReadSettings is changed from boolean to any
  - Type of parameter encryptedCredential of interface SftpServerLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SharePointOnlineListLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ShopifyLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SmartsheetLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SnowflakeLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SparkLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SqlServerLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SquareLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface SybaseLinkedService is changed from any to string
  - Type of parameter numExecutors of interface SynapseNotebookActivity is changed from number to any
  - Type of parameter encryptedCredential of interface TeamDeskLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface TeradataLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface VerticaLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface XeroLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ZendeskLinkedService is changed from any to string
  - Type of parameter encryptedCredential of interface ZohoLinkedService is changed from any to string
  - Removed Enum KnownCosmosDbServicePrincipalCredentialType
    
    
## 11.1.0 (2023-03-02)
    
### Features Added

  - Interface AzureBlobFSLinkedService has a new optional parameter sasToken
  - Interface AzureBlobFSLinkedService has a new optional parameter sasUri
    
    
## 11.0.0 (2023-02-10)
    
### Features Added

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

### Breaking Changes

  - Parameter exportSettings of interface SnowflakeSource is now required

    
## 10.10.1 (2023-01-04)

### Features Added

-  Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

- A series of small bug fixs relevant to authentication and apiVersion policy

## 10.10.0 (2022-11-04)
    
### Features Added

  - Interface ScriptActivity has a new optional parameter scriptBlockExecutionTimeout
    
    
## 10.9.0 (2022-10-17)
    
### Features Added

  - Interface AzureSynapseArtifactsLinkedService has a new optional parameter workspaceResourceId
  - Interface FactoryRepoConfiguration has a new optional parameter disablePublish
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter filesV2
  - Interface SynapseSparkJobDefinitionActivity has a new optional parameter pythonCodeReference
    
    
## 10.8.0 (2022-09-07)
    
### Features Added

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
    
### Features Added

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
    
### Features Added

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
    
### Features Added

  - Added Interface PrivateEndpoint
  - Interface PrivateLinkConnectionApprovalRequest has a new optional parameter privateEndpoint
  - Type Alias DataFlowSink has a new parameter rejectedDataLinkedService
    
    
## 10.4.0 (2022-04-20)
    
### Features Added

  - Added Type Alias AppFiguresLinkedService
  - Added Type Alias AsanaLinkedService
  - Added Type Alias DataworldLinkedService
  - Added Type Alias TwilioLinkedService
    
    
## 10.3.0 (2022-04-06)
    
### Features Added

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
    
### Features Added

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
    
### Features Added

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
