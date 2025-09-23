# Release History

## 5.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.0.0-beta.2 (2025-08-22)

### Other Changes

  - Other fixes

## 5.0.0-beta.1 (2024-02-07)
    
### Features Added

  - Added operation group SkuOperations
  - Added operation Subscriptions.beginSampleInput
  - Added operation Subscriptions.beginSampleInputAndWait
  - Added operation Subscriptions.beginTestInput
  - Added operation Subscriptions.beginTestInputAndWait
  - Added operation Subscriptions.beginTestOutput
  - Added operation Subscriptions.beginTestOutputAndWait
  - Added operation Subscriptions.beginTestQuery
  - Added operation Subscriptions.beginTestQueryAndWait
  - Added operation Subscriptions.compileQuery
  - Added Interface AggregateFunctionProperties
  - Added Interface AzureDataExplorerOutputDataSource
  - Added Interface AzureFunctionOutputDataSource
  - Added Interface AzureMachineLearningServiceFunctionBinding
  - Added Interface AzureMachineLearningServiceFunctionRetrieveDefaultDefinitionParameters
  - Added Interface AzureMachineLearningServiceInputColumn
  - Added Interface AzureMachineLearningServiceInputs
  - Added Interface AzureMachineLearningServiceOutputColumn
  - Added Interface AzureMachineLearningStudioFunctionBinding
  - Added Interface AzureMachineLearningStudioFunctionRetrieveDefaultDefinitionParameters
  - Added Interface AzureMachineLearningStudioInputColumn
  - Added Interface AzureMachineLearningStudioInputs
  - Added Interface AzureMachineLearningStudioOutputColumn
  - Added Interface ClusterProperties
  - Added Interface CompileQuery
  - Added Interface CSharpFunctionBinding
  - Added Interface CSharpFunctionRetrieveDefaultDefinitionParameters
  - Added Interface CustomClrSerialization
  - Added Interface DeltaSerialization
  - Added Interface EventGridStreamInputDataSource
  - Added Interface External_2
  - Added Interface FileReferenceInputDataSource
  - Added Interface GatewayMessageBusOutputDataSource
  - Added Interface GatewayMessageBusOutputDataSourceProperties
  - Added Interface GatewayMessageBusSourceProperties
  - Added Interface GatewayMessageBusStreamInputDataSource
  - Added Interface GatewayMessageBusStreamInputDataSourceProperties
  - Added Interface GetStreamingJobSkuResult
  - Added Interface GetStreamingJobSkuResults
  - Added Interface GetStreamingJobSkuResultSku
  - Added Interface InputWatermarkProperties
  - Added Interface LastOutputEventTimestamp
  - Added Interface OutputWatermarkProperties
  - Added Interface PostgreSQLDataSourceProperties
  - Added Interface PostgreSQLOutputDataSource
  - Added Interface PostgreSQLOutputDataSourceProperties
  - Added Interface PrivateEndpointProperties
  - Added Interface QueryCompilationError
  - Added Interface QueryCompilationResult
  - Added Interface QueryFunction
  - Added Interface QueryInput
  - Added Interface QueryTestingResult
  - Added Interface RawOutputDatasource
  - Added Interface RawReferenceInputDataSource
  - Added Interface RawStreamInputDataSource
  - Added Interface RefreshConfiguration
  - Added Interface SampleInput
  - Added Interface SampleInputResult
  - Added Interface SkuCapacity
  - Added Interface SkuListNextOptionalParams
  - Added Interface SkuListOptionalParams
  - Added Interface SubscriptionsCompileQueryOptionalParams
  - Added Interface SubscriptionsSampleInputOptionalParams
  - Added Interface SubscriptionsTestInputOptionalParams
  - Added Interface SubscriptionsTestOutputOptionalParams
  - Added Interface SubscriptionsTestQueryOptionalParams
  - Added Interface TestDatasourceResult
  - Added Interface TestInput
  - Added Interface TestOutput
  - Added Interface TestQuery
  - Added Interface TestQueryDiagnostics
  - Added Type Alias BlobWriteMode
  - Added Type Alias EventGridEventSchemaType
  - Added Type Alias InputWatermarkMode
  - Added Type Alias OutputWatermarkMode
  - Added Type Alias QueryTestingResultStatus
  - Added Type Alias ResourceType
  - Added Type Alias SampleInputResultStatus
  - Added Type Alias SkuCapacityScaleType
  - Added Type Alias SkuListNextResponse
  - Added Type Alias SkuListResponse
  - Added Type Alias SubscriptionsCompileQueryResponse
  - Added Type Alias SubscriptionsSampleInputResponse
  - Added Type Alias SubscriptionsTestInputResponse
  - Added Type Alias SubscriptionsTestOutputResponse
  - Added Type Alias SubscriptionsTestQueryResponse
  - Added Type Alias TestDatasourceResultStatus
  - Added Type Alias UpdatableUdfRefreshType
  - Added Type Alias UpdateMode
  - Interface AzureSqlReferenceInputDataSource has a new optional parameter authenticationMode
  - Interface AzureSynapseDataSourceProperties has a new optional parameter authenticationMode
  - Interface AzureSynapseOutputDataSource has a new optional parameter authenticationMode
  - Interface BlobDataSourceProperties has a new optional parameter authenticationMode
  - Interface BlobOutputDataSource has a new optional parameter blobPathPrefix
  - Interface BlobOutputDataSource has a new optional parameter blobWriteMode
  - Interface BlobOutputDataSourceProperties has a new optional parameter blobPathPrefix
  - Interface BlobOutputDataSourceProperties has a new optional parameter blobWriteMode
  - Interface BlobReferenceInputDataSource has a new optional parameter authenticationMode
  - Interface BlobReferenceInputDataSource has a new optional parameter blobName
  - Interface BlobReferenceInputDataSource has a new optional parameter deltaPathPattern
  - Interface BlobReferenceInputDataSource has a new optional parameter deltaSnapshotRefreshRate
  - Interface BlobReferenceInputDataSource has a new optional parameter fullSnapshotRefreshRate
  - Interface BlobReferenceInputDataSource has a new optional parameter sourcePartitionCount
  - Interface BlobReferenceInputDataSourceProperties has a new optional parameter blobName
  - Interface BlobReferenceInputDataSourceProperties has a new optional parameter deltaPathPattern
  - Interface BlobReferenceInputDataSourceProperties has a new optional parameter deltaSnapshotRefreshRate
  - Interface BlobReferenceInputDataSourceProperties has a new optional parameter fullSnapshotRefreshRate
  - Interface BlobReferenceInputDataSourceProperties has a new optional parameter sourcePartitionCount
  - Interface BlobStreamInputDataSource has a new optional parameter authenticationMode
  - Interface Cluster has a new optional parameter properties
  - Interface DocumentDbOutputDataSource has a new optional parameter authenticationMode
  - Interface EventHubDataSourceProperties has a new optional parameter partitionCount
  - Interface EventHubOutputDataSource has a new optional parameter partitionCount
  - Interface EventHubStreamInputDataSource has a new optional parameter partitionCount
  - Interface EventHubStreamInputDataSource has a new optional parameter prefetchCount
  - Interface EventHubStreamInputDataSourceProperties has a new optional parameter prefetchCount
  - Interface EventHubV2OutputDataSource has a new optional parameter partitionCount
  - Interface EventHubV2StreamInputDataSource has a new optional parameter partitionCount
  - Interface EventHubV2StreamInputDataSource has a new optional parameter prefetchCount
  - Interface FunctionProperties has a new optional parameter binding
  - Interface FunctionProperties has a new optional parameter inputs
  - Interface FunctionProperties has a new optional parameter output
  - Interface FunctionsTestOptionalParams has a new optional parameter function
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface InputProperties has a new optional parameter watermarkSettings
  - Interface Output has a new optional parameter lastOutputEventTimestamps
  - Interface Output has a new optional parameter watermarkSettings
  - Interface PrivateEndpoint has a new optional parameter properties
  - Interface Sku has a new optional parameter capacity
  - Interface StorageAccount has a new optional parameter authenticationMode
  - Interface StreamingJob has a new optional parameter externals
  - Interface StreamingJob has a new optional parameter skuPropertiesSku
  - Type of parameter type of interface FunctionBinding is changed from "Microsoft.MachineLearning/WebService" | "Microsoft.StreamAnalytics/JavascriptUdf" to "Microsoft.MachineLearning/WebService" | "Microsoft.StreamAnalytics/JavascriptUdf" | "Microsoft.StreamAnalytics/CLRUdf" | "Microsoft.MachineLearningServices"
  - Type of parameter type of interface FunctionProperties is changed from "Scalar" to "Scalar" | "Aggregate"
  - Type of parameter bindingType of interface FunctionRetrieveDefaultDefinitionParameters is changed from "Microsoft.MachineLearning/WebService" | "Microsoft.StreamAnalytics/JavascriptUdf" to "Microsoft.MachineLearning/WebService" | "Microsoft.MachineLearningServices" | "Microsoft.StreamAnalytics/JavascriptUdf" | "Microsoft.StreamAnalytics/CLRUdf"
  - Type of parameter type of interface OutputDataSource is changed from "Microsoft.Storage/Blob" | "Microsoft.Storage/Table" | "Microsoft.ServiceBus/EventHub" | "Microsoft.EventHub/EventHub" | "Microsoft.Sql/Server/Database" | "Microsoft.Sql/Server/DataWarehouse" | "Microsoft.Storage/DocumentDB" | "Microsoft.ServiceBus/Queue" | "Microsoft.ServiceBus/Topic" | "PowerBI" | "Microsoft.DataLake/Accounts" to "Raw" | "Microsoft.Storage/Blob" | "Microsoft.Storage/Table" | "Microsoft.ServiceBus/EventHub" | "Microsoft.EventHub/EventHub" | "Microsoft.Sql/Server/Database" | "Microsoft.Sql/Server/DataWarehouse" | "Microsoft.DBForPostgreSQL/servers/databases" | "Microsoft.Storage/DocumentDB" | "Microsoft.AzureFunction" | "Microsoft.ServiceBus/Queue" | "Microsoft.ServiceBus/Topic" | "PowerBI" | "Microsoft.DataLake/Accounts" | "GatewayMessageBus" | "Microsoft.Kusto/clusters/databases"
  - Type of parameter type of interface ReferenceInputDataSource is changed from "Microsoft.Storage/Blob" | "Microsoft.Sql/Server/Database" to "File" | "Microsoft.Storage/Blob" | "Raw" | "Microsoft.Sql/Server/Database"
  - Type of parameter type of interface Serialization is changed from "Parquet" | "Csv" | "Json" | "Avro" to "Delta" | "Parquet" | "CustomClr" | "Csv" | "Json" | "Avro"
  - Type of parameter type of interface StreamInputDataSource is changed from "Microsoft.Storage/Blob" | "Microsoft.ServiceBus/EventHub" | "Microsoft.EventHub/EventHub" | "Microsoft.Devices/IotHubs" to "Microsoft.Storage/Blob" | "Microsoft.ServiceBus/EventHub" | "Microsoft.EventHub/EventHub" | "Microsoft.Devices/IotHubs" | "Raw" | "GatewayMessageBus" | "Microsoft.EventGrid/EventSubscriptions"
  - Added Enum KnownBlobWriteMode
  - Added Enum KnownEventGridEventSchemaType
  - Added Enum KnownInputWatermarkMode
  - Added Enum KnownOutputWatermarkMode
  - Added Enum KnownQueryTestingResultStatus
  - Added Enum KnownResourceType
  - Added Enum KnownSampleInputResultStatus
  - Added Enum KnownSkuCapacityScaleType
  - Added Enum KnownTestDatasourceResultStatus
  - Added Enum KnownUpdatableUdfRefreshType
  - Added Enum KnownUpdateMode
  - Enum KnownEventSerializationType has a new value CustomClr
  - Enum KnownEventSerializationType has a new value Delta

### Breaking Changes

  - Interface AzureSqlReferenceInputDataSource no longer has parameter table
  - Interface Cluster no longer has parameter capacityAllocated
  - Interface Cluster no longer has parameter capacityAssigned
  - Interface Cluster no longer has parameter clusterId
  - Interface Cluster no longer has parameter createdDate
  - Interface Cluster no longer has parameter provisioningState
  - Interface FunctionsTestOptionalParams no longer has parameter functionParam
  - Interface PrivateEndpoint no longer has parameter createdDate
  - Interface PrivateEndpoint no longer has parameter manualPrivateLinkServiceConnections
  - Interface StreamAnalyticsManagementClientOptionalParams no longer has parameter apiVersion
  - Class StreamAnalyticsManagementClient no longer has parameter apiVersion
    
    
## 4.1.0 (2022-12-13)
    
### Features Added

  - Added Interface AvroSerialization
  - Added Interface AzureDataLakeStoreOutputDataSource
  - Added Interface AzureDataLakeStoreOutputDataSourceProperties
  - Added Interface AzureMachineLearningWebServiceFunctionBinding
  - Added Interface AzureMachineLearningWebServiceFunctionRetrieveDefaultDefinitionParameters
  - Added Interface AzureSqlDatabaseOutputDataSource
  - Added Interface AzureSqlDatabaseOutputDataSourceProperties
  - Added Interface AzureSqlReferenceInputDataSource
  - Added Interface AzureSynapseOutputDataSource
  - Added Interface AzureSynapseOutputDataSourceProperties
  - Added Interface AzureTableOutputDataSource
  - Added Interface BlobOutputDataSource
  - Added Interface BlobOutputDataSourceProperties
  - Added Interface BlobReferenceInputDataSource
  - Added Interface BlobReferenceInputDataSourceProperties
  - Added Interface BlobStreamInputDataSource
  - Added Interface BlobStreamInputDataSourceProperties
  - Added Interface Cluster
  - Added Interface CsvSerialization
  - Added Interface DocumentDbOutputDataSource
  - Added Interface EventHubDataSourceProperties
  - Added Interface EventHubOutputDataSource
  - Added Interface EventHubOutputDataSourceProperties
  - Added Interface EventHubStreamInputDataSource
  - Added Interface EventHubStreamInputDataSourceProperties
  - Added Interface EventHubV2OutputDataSource
  - Added Interface EventHubV2StreamInputDataSource
  - Added Interface FunctionModel
  - Added Interface Input
  - Added Interface IoTHubStreamInputDataSource
  - Added Interface JavaScriptFunctionBinding
  - Added Interface JavaScriptFunctionRetrieveDefaultDefinitionParameters
  - Added Interface JobStorageAccount
  - Added Interface JsonSerialization
  - Added Interface Output
  - Added Interface ParquetSerialization
  - Added Interface PowerBIOutputDataSource
  - Added Interface PowerBIOutputDataSourceProperties
  - Added Interface PrivateEndpoint
  - Added Interface ProxyResource
  - Added Interface ReferenceInputProperties
  - Added Interface ScalarFunctionProperties
  - Added Interface ServiceBusQueueOutputDataSource
  - Added Interface ServiceBusQueueOutputDataSourceProperties
  - Added Interface ServiceBusTopicOutputDataSource
  - Added Interface ServiceBusTopicOutputDataSourceProperties
  - Added Interface StreamingJob
  - Added Interface StreamInputProperties
  - Added Interface SubscriptionQuota
  - Added Interface TrackedResource
  - Added Interface Transformation
  - Interface FunctionsListByStreamingJobNextOptionalParams no longer has parameter select
  - Interface InputsListByStreamingJobNextOptionalParams no longer has parameter select
  - Interface OutputsListByStreamingJobNextOptionalParams no longer has parameter select
  - Interface StreamingJobsListByResourceGroupNextOptionalParams no longer has parameter expand
  - Interface StreamingJobsListNextOptionalParams no longer has parameter expand
    
## 4.0.1 (2022-05-05)

### Features Added

  - Bug fix

## 4.0.0 (2021-12-10)

The package of @azure/arm-streamanalytics is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
