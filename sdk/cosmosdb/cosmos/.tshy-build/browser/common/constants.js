// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @hidden
 */
export const Constants = {
    HttpHeaders: {
        Authorization: "authorization",
        ETag: "etag",
        MethodOverride: "X-HTTP-Method",
        Slug: "Slug",
        ContentType: "Content-Type",
        LastModified: "Last-Modified",
        ContentEncoding: "Content-Encoding",
        CharacterSet: "CharacterSet",
        UserAgent: "User-Agent",
        CustomUserAgent: "x-ms-useragent",
        IfModifiedSince: "If-Modified-Since",
        IfMatch: "If-Match",
        IfNoneMatch: "If-None-Match",
        ContentLength: "Content-Length",
        AcceptEncoding: "Accept-Encoding",
        KeepAlive: "Keep-Alive",
        CacheControl: "Cache-Control",
        TransferEncoding: "Transfer-Encoding",
        ContentLanguage: "Content-Language",
        ContentLocation: "Content-Location",
        ContentMd5: "Content-Md5",
        ContentRange: "Content-Range",
        Accept: "Accept",
        AcceptCharset: "Accept-Charset",
        AcceptLanguage: "Accept-Language",
        IfRange: "If-Range",
        IfUnmodifiedSince: "If-Unmodified-Since",
        MaxForwards: "Max-Forwards",
        ProxyAuthorization: "Proxy-Authorization",
        AcceptRanges: "Accept-Ranges",
        ProxyAuthenticate: "Proxy-Authenticate",
        RetryAfter: "Retry-After",
        SetCookie: "Set-Cookie",
        WwwAuthenticate: "Www-Authenticate",
        Origin: "Origin",
        Host: "Host",
        AccessControlAllowOrigin: "Access-Control-Allow-Origin",
        AccessControlAllowHeaders: "Access-Control-Allow-Headers",
        KeyValueEncodingFormat: "application/x-www-form-urlencoded",
        WrapAssertionFormat: "wrap_assertion_format",
        WrapAssertion: "wrap_assertion",
        WrapScope: "wrap_scope",
        SimpleToken: "SWT",
        HttpDate: "date",
        Prefer: "Prefer",
        Location: "Location",
        Referer: "referer",
        A_IM: "A-IM",
        PreferReturnMinimal: "return=minimal",
        // Query
        Query: "x-ms-documentdb-query",
        IsQuery: "x-ms-documentdb-isquery",
        IsQueryPlan: "x-ms-cosmos-is-query-plan-request",
        SupportedQueryFeatures: "x-ms-cosmos-supported-query-features",
        QueryVersion: "x-ms-cosmos-query-version",
        // Our custom Azure Cosmos DB headers
        Continuation: "x-ms-continuation",
        ContinuationToken: "x-ms-continuation-token",
        PageSize: "x-ms-max-item-count",
        ItemCount: "x-ms-item-count",
        ChangeFeedWireFormatVersion: "x-ms-cosmos-changefeed-wire-format-version",
        // Request sender generated. Simply echoed by backend.
        ActivityId: "x-ms-activity-id",
        CorrelatedActivityId: "x-ms-cosmos-correlated-activityid",
        PreTriggerInclude: "x-ms-documentdb-pre-trigger-include",
        PreTriggerExclude: "x-ms-documentdb-pre-trigger-exclude",
        PostTriggerInclude: "x-ms-documentdb-post-trigger-include",
        PostTriggerExclude: "x-ms-documentdb-post-trigger-exclude",
        IndexingDirective: "x-ms-indexing-directive",
        SessionToken: "x-ms-session-token",
        ConsistencyLevel: "x-ms-consistency-level",
        XDate: "x-ms-date",
        CollectionPartitionInfo: "x-ms-collection-partition-info",
        CollectionServiceInfo: "x-ms-collection-service-info",
        // Deprecated, use RetryAfterInMs instead.
        RetryAfterInMilliseconds: "x-ms-retry-after-ms",
        RetryAfterInMs: "x-ms-retry-after-ms",
        IsFeedUnfiltered: "x-ms-is-feed-unfiltered",
        ResourceTokenExpiry: "x-ms-documentdb-expiry-seconds",
        EnableScanInQuery: "x-ms-documentdb-query-enable-scan",
        EmitVerboseTracesInQuery: "x-ms-documentdb-query-emit-traces",
        EnableCrossPartitionQuery: "x-ms-documentdb-query-enablecrosspartition",
        ParallelizeCrossPartitionQuery: "x-ms-documentdb-query-parallelizecrosspartitionquery",
        ResponseContinuationTokenLimitInKB: "x-ms-documentdb-responsecontinuationtokenlimitinkb",
        SDKSupportedCapabilities: "x-ms-cosmos-sdk-supportedcapabilities",
        // QueryMetrics
        // Request header to tell backend to give you query metrics.
        PopulateQueryMetrics: "x-ms-documentdb-populatequerymetrics",
        // Response header that holds the serialized version of query metrics.
        QueryMetrics: "x-ms-documentdb-query-metrics",
        // IndexMetrics
        // Request header to tell backend to give you index metrics.
        PopulateIndexMetrics: "x-ms-cosmos-populateindexmetrics-V2",
        // Response header that holds the serialized version of index metrics.
        IndexUtilization: "x-ms-cosmos-index-utilization",
        // Version headers and values
        Version: "x-ms-version",
        // Owner name
        OwnerFullName: "x-ms-alt-content-path",
        // Owner ID used for name based request in session token.
        OwnerId: "x-ms-content-path",
        // Partition Key
        PartitionKey: "x-ms-documentdb-partitionkey",
        PartitionKeyRangeID: "x-ms-documentdb-partitionkeyrangeid",
        // Epk Range headers
        StartEpk: "x-ms-start-epk",
        EndEpk: "x-ms-end-epk",
        // Read Feed Type
        ReadFeedKeyType: "x-ms-read-key-type",
        // Quota Info
        MaxEntityCount: "x-ms-root-entity-max-count",
        CurrentEntityCount: "x-ms-root-entity-current-count",
        CollectionQuotaInMb: "x-ms-collection-quota-mb",
        CollectionCurrentUsageInMb: "x-ms-collection-usage-mb",
        MaxMediaStorageUsageInMB: "x-ms-max-media-storage-usage-mb",
        CurrentMediaStorageUsageInMB: "x-ms-media-storage-usage-mb",
        RequestCharge: "x-ms-request-charge",
        PopulateQuotaInfo: "x-ms-documentdb-populatequotainfo",
        MaxResourceQuota: "x-ms-resource-quota",
        // Offer header
        OfferType: "x-ms-offer-type",
        OfferThroughput: "x-ms-offer-throughput",
        AutoscaleSettings: "x-ms-cosmos-offer-autopilot-settings",
        // Custom RUs/minute headers
        DisableRUPerMinuteUsage: "x-ms-documentdb-disable-ru-per-minute-usage",
        IsRUPerMinuteUsed: "x-ms-documentdb-is-ru-per-minute-used",
        OfferIsRUPerMinuteThroughputEnabled: "x-ms-offer-is-ru-per-minute-throughput-enabled",
        // Index progress headers
        IndexTransformationProgress: "x-ms-documentdb-collection-index-transformation-progress",
        LazyIndexingProgress: "x-ms-documentdb-collection-lazy-indexing-progress",
        // Upsert header
        IsUpsert: "x-ms-documentdb-is-upsert",
        // Sub status of the error
        SubStatus: "x-ms-substatus",
        // StoredProcedure related headers
        EnableScriptLogging: "x-ms-documentdb-script-enable-logging",
        ScriptLogResults: "x-ms-documentdb-script-log-results",
        // Multi-Region Write
        ALLOW_MULTIPLE_WRITES: "x-ms-cosmos-allow-tentative-writes",
        // Bulk/Batch header
        IsBatchRequest: "x-ms-cosmos-is-batch-request",
        IsBatchAtomic: "x-ms-cosmos-batch-atomic",
        BatchContinueOnError: "x-ms-cosmos-batch-continue-on-error",
        // Dedicated Gateway Headers
        DedicatedGatewayPerRequestCacheStaleness: "x-ms-dedicatedgateway-max-age",
        DedicatedGatewayPerRequestBypassCache: "x-ms-dedicatedgateway-bypass-cache",
        // Cache Refresh header
        ForceRefresh: "x-ms-force-refresh",
        // Throughput related headers
        PriorityLevel: "x-ms-cosmos-priority-level",
        ThroughputBucket: "x-ms-cosmos-throughput-bucket",
        // Encryption Headers
        IsClientEncryptedHeader: "x-ms-cosmos-is-client-encrypted",
        IntendedCollectionHeader: "x-ms-cosmos-intended-collection-rid",
        DatabaseRidHeader: "x-ms-cosmos-database-rid",
        AllowCachedReadsHeader: "x-ms-cosmos-allow-cachedreads",
    },
    // ThrottledRequests Retry policy default values
    ThrottledRequestMaxRetryAttemptCount: 9,
    ThrottledRequestMaxWaitTimeInSeconds: 30,
    ThrottledRequestFixedRetryIntervalInMs: 0,
    // GlobalDB related constants
    WritableLocations: "writableLocations",
    ReadableLocations: "readableLocations",
    LocationUnavailableExpirationTimeInMs: 5 * 60 * 1000, // 5 minutes
    // ServiceDocument Resource
    ENABLE_MULTIPLE_WRITABLE_LOCATIONS: "enableMultipleWriteLocations",
    // Background refresh time
    DefaultUnavailableLocationExpirationTimeMS: 5 * 60 * 1000,
    // Client generated retry count response header
    ThrottleRetryCount: "x-ms-throttle-retry-count",
    ThrottleRetryWaitTimeInMs: "x-ms-throttle-retry-wait-time-ms",
    // Platform
    CurrentVersion: "2020-07-15",
    AzureNamespace: "Azure.Cosmos",
    AzurePackageName: "@azure/cosmos",
    SDKName: "azure-cosmos-js",
    SDKVersion: "4.4.0",
    // Diagnostics
    CosmosDbDiagnosticLevelEnvVarName: "AZURE_COSMOSDB_DIAGNOSTICS_LEVEL",
    // Bulk Operations
    DefaultMaxBulkRequestBodySizeInBytes: 220201,
    MaxBulkOperationsCount: 100,
    BulkMaxDegreeOfConcurrency: 20,
    // Encryption
    Encryption: {
        DiagnosticsDecryptOperation: "Decrypt",
        DiagnosticsDuration: "Duration in milliseconds",
        DiagnosticsEncryptionDiagnostics: "EncryptionDiagnostics",
        DiagnosticsEncryptOperation: "Encrypt",
        DiagnosticsPropertiesEncryptedCount: "Properties Encrypted Count",
        DiagnosticsPropertiesDecryptedCount: "Properties Decrypted Count",
        DiagnosticsStartTime: "Start time",
    },
    Quota: {
        CollectionSize: "collectionSize",
    },
    Path: {
        Root: "/",
        DatabasesPathSegment: "dbs",
        CollectionsPathSegment: "colls",
        UsersPathSegment: "users",
        DocumentsPathSegment: "docs",
        PermissionsPathSegment: "permissions",
        StoredProceduresPathSegment: "sprocs",
        TriggersPathSegment: "triggers",
        UserDefinedFunctionsPathSegment: "udfs",
        ConflictsPathSegment: "conflicts",
        AttachmentsPathSegment: "attachments",
        PartitionKeyRangesPathSegment: "pkranges",
        SchemasPathSegment: "schemas",
        OffersPathSegment: "offers",
        TopologyPathSegment: "topology",
        DatabaseAccountPathSegment: "databaseaccount",
    },
    PartitionKeyRange: {
        // Partition Key Range Constants
        MinInclusive: "minInclusive",
        MaxExclusive: "maxExclusive",
        Id: "id",
    },
    QueryRangeConstants: {
        // Partition Key Range Constants
        MinInclusive: "minInclusive",
        MaxExclusive: "maxExclusive",
        min: "min",
    },
    /**
     * @deprecated Use EffectivePartitionKeyConstants instead
     */
    EffectiveParitionKeyConstants: {
        MinimumInclusiveEffectivePartitionKey: "",
        MaximumExclusiveEffectivePartitionKey: "FF",
    },
    EffectivePartitionKeyConstants: {
        MinimumInclusiveEffectivePartitionKey: "",
        MaximumExclusiveEffectivePartitionKey: "FF",
    },
    // Changefeed AllVersionsAndDeletesMode formatting version
    AllVersionsAndDeletesChangeFeedWireFormatVersion: "2021-09-15",
    ChangeFeedIfNoneMatchStartFromNowHeader: "*",
    // Default TTL for encryption caches is 2 hrs (7200 sec)
    DefaultEncryptionCacheTimeToLiveInSeconds: 7200,
    // Timeout to clear encryption related cache
    EncryptionCacheRefreshIntervalInMs: 60000, // 1 minute
};
/**
 * @hidden
 */
export var ResourceType;
(function (ResourceType) {
    ResourceType["none"] = "";
    ResourceType["database"] = "dbs";
    ResourceType["offer"] = "offers";
    ResourceType["user"] = "users";
    ResourceType["permission"] = "permissions";
    ResourceType["container"] = "colls";
    ResourceType["conflicts"] = "conflicts";
    ResourceType["sproc"] = "sprocs";
    ResourceType["udf"] = "udfs";
    ResourceType["trigger"] = "triggers";
    ResourceType["item"] = "docs";
    ResourceType["pkranges"] = "pkranges";
    ResourceType["partitionkey"] = "partitionKey";
    /** resource representing client encryption keys to encrypt/decrypt data */
    ResourceType["clientencryptionkey"] = "clientencryptionkeys";
})(ResourceType || (ResourceType = {}));
/**
 * @hidden
 */
export var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["get"] = "GET";
    HTTPMethod["patch"] = "PATCH";
    HTTPMethod["post"] = "POST";
    HTTPMethod["put"] = "PUT";
    HTTPMethod["delete"] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
/**
 * @hidden
 */
export var OperationType;
(function (OperationType) {
    OperationType["Create"] = "create";
    OperationType["Replace"] = "replace";
    OperationType["Upsert"] = "upsert";
    OperationType["Delete"] = "delete";
    OperationType["Read"] = "read";
    OperationType["Query"] = "query";
    OperationType["Execute"] = "execute";
    OperationType["Batch"] = "batch";
    OperationType["Patch"] = "patch";
})(OperationType || (OperationType = {}));
/**
 * @hidden
 */
export var CosmosKeyType;
(function (CosmosKeyType) {
    CosmosKeyType["PrimaryMaster"] = "PRIMARY_MASTER";
    CosmosKeyType["SecondaryMaster"] = "SECONDARY_MASTER";
    CosmosKeyType["PrimaryReadOnly"] = "PRIMARY_READONLY";
    CosmosKeyType["SecondaryReadOnly"] = "SECONDARY_READONLY";
})(CosmosKeyType || (CosmosKeyType = {}));
/**
 * @hidden
 */
export var CosmosContainerChildResourceKind;
(function (CosmosContainerChildResourceKind) {
    CosmosContainerChildResourceKind["Item"] = "ITEM";
    CosmosContainerChildResourceKind["StoredProcedure"] = "STORED_PROCEDURE";
    CosmosContainerChildResourceKind["UserDefinedFunction"] = "USER_DEFINED_FUNCTION";
    CosmosContainerChildResourceKind["Trigger"] = "TRIGGER";
})(CosmosContainerChildResourceKind || (CosmosContainerChildResourceKind = {}));
/**
 * @hidden
 */
export var PermissionScopeValues;
(function (PermissionScopeValues) {
    /**
     * Values which set permission Scope applicable to control plane related operations.
     */
    PermissionScopeValues[PermissionScopeValues["ScopeAccountReadValue"] = 1] = "ScopeAccountReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountListDatabasesValue"] = 2] = "ScopeAccountListDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadValue"] = 4] = "ScopeDatabaseReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadOfferValue"] = 8] = "ScopeDatabaseReadOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseListContainerValue"] = 16] = "ScopeDatabaseListContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadValue"] = 32] = "ScopeContainerReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadOfferValue"] = 64] = "ScopeContainerReadOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountCreateDatabasesValue"] = 1] = "ScopeAccountCreateDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountDeleteDatabasesValue"] = 2] = "ScopeAccountDeleteDatabasesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseDeleteValue"] = 4] = "ScopeDatabaseDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReplaceOfferValue"] = 8] = "ScopeDatabaseReplaceOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseCreateContainerValue"] = 16] = "ScopeDatabaseCreateContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseDeleteContainerValue"] = 32] = "ScopeDatabaseDeleteContainerValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceValue"] = 64] = "ScopeContainerReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteValue"] = 128] = "ScopeContainerDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceOfferValue"] = 256] = "ScopeContainerReplaceOfferValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountReadAllAccessValue"] = 65535] = "ScopeAccountReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseReadAllAccessValue"] = 124] = "ScopeDatabaseReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainersReadAllAccessValue"] = 96] = "ScopeContainersReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeAccountWriteAllAccessValue"] = 65535] = "ScopeAccountWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeDatabaseWriteAllAccessValue"] = 508] = "ScopeDatabaseWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainersWriteAllAccessValue"] = 448] = "ScopeContainersWriteAllAccessValue";
    /**
     * Values which set permission Scope applicable to data plane related operations.
     */
    PermissionScopeValues[PermissionScopeValues["ScopeContainerExecuteQueriesValue"] = 1] = "ScopeContainerExecuteQueriesValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadFeedsValue"] = 2] = "ScopeContainerReadFeedsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadStoredProceduresValue"] = 4] = "ScopeContainerReadStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadUserDefinedFunctionsValue"] = 8] = "ScopeContainerReadUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadTriggersValue"] = 16] = "ScopeContainerReadTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadConflictsValue"] = 32] = "ScopeContainerReadConflictsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReadValue"] = 64] = "ScopeItemReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureReadValue"] = 128] = "ScopeStoredProcedureReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionReadValue"] = 256] = "ScopeUserDefinedFunctionReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerReadValue"] = 512] = "ScopeTriggerReadValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateItemsValue"] = 1] = "ScopeContainerCreateItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceItemsValue"] = 2] = "ScopeContainerReplaceItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerUpsertItemsValue"] = 4] = "ScopeContainerUpsertItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteItemsValue"] = 8] = "ScopeContainerDeleteItemsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateStoredProceduresValue"] = 16] = "ScopeContainerCreateStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceStoredProceduresValue"] = 32] = "ScopeContainerReplaceStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteStoredProceduresValue"] = 64] = "ScopeContainerDeleteStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerExecuteStoredProceduresValue"] = 128] = "ScopeContainerExecuteStoredProceduresValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateTriggersValue"] = 256] = "ScopeContainerCreateTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceTriggersValue"] = 512] = "ScopeContainerReplaceTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteTriggersValue"] = 1024] = "ScopeContainerDeleteTriggersValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerCreateUserDefinedFunctionsValue"] = 2048] = "ScopeContainerCreateUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReplaceUserDefinedFunctionsValue"] = 4096] = "ScopeContainerReplaceUserDefinedFunctionsValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteUserDefinedFunctionSValue"] = 8192] = "ScopeContainerDeleteUserDefinedFunctionSValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerDeleteCONFLICTSValue"] = 16384] = "ScopeContainerDeleteCONFLICTSValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReplaceValue"] = 65536] = "ScopeItemReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemUpsertValue"] = 131072] = "ScopeItemUpsertValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemDeleteValue"] = 262144] = "ScopeItemDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureReplaceValue"] = 1048576] = "ScopeStoredProcedureReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureDeleteValue"] = 2097152] = "ScopeStoredProcedureDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeStoredProcedureExecuteValue"] = 4194304] = "ScopeStoredProcedureExecuteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionReplaceValue"] = 8388608] = "ScopeUserDefinedFunctionReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeUserDefinedFunctionDeleteValue"] = 16777216] = "ScopeUserDefinedFunctionDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerReplaceValue"] = 33554432] = "ScopeTriggerReplaceValue";
    PermissionScopeValues[PermissionScopeValues["ScopeTriggerDeleteValue"] = 67108864] = "ScopeTriggerDeleteValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerReadAllAccessValue"] = 4294967295] = "ScopeContainerReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemReadAllAccessValue"] = 65] = "ScopeItemReadAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeContainerWriteAllAccessValue"] = 4294967295] = "ScopeContainerWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["ScopeItemWriteAllAccessValue"] = 458767] = "ScopeItemWriteAllAccessValue";
    PermissionScopeValues[PermissionScopeValues["NoneValue"] = 0] = "NoneValue";
})(PermissionScopeValues || (PermissionScopeValues = {}));
/**
 * @hidden
 */
export var SasTokenPermissionKind;
(function (SasTokenPermissionKind) {
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerCreateItems"] = 1] = "ContainerCreateItems";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReplaceItems"] = 2] = "ContainerReplaceItems";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerUpsertItems"] = 4] = "ContainerUpsertItems";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerDeleteItems"] = 128] = "ContainerDeleteItems";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerExecuteQueries"] = 1] = "ContainerExecuteQueries";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadFeeds"] = 2] = "ContainerReadFeeds";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerCreateStoreProcedure"] = 16] = "ContainerCreateStoreProcedure";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadStoreProcedure"] = 4] = "ContainerReadStoreProcedure";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReplaceStoreProcedure"] = 32] = "ContainerReplaceStoreProcedure";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerDeleteStoreProcedure"] = 64] = "ContainerDeleteStoreProcedure";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerCreateTriggers"] = 256] = "ContainerCreateTriggers";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadTriggers"] = 16] = "ContainerReadTriggers";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReplaceTriggers"] = 512] = "ContainerReplaceTriggers";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerDeleteTriggers"] = 1024] = "ContainerDeleteTriggers";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerCreateUserDefinedFunctions"] = 2048] = "ContainerCreateUserDefinedFunctions";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadUserDefinedFunctions"] = 8] = "ContainerReadUserDefinedFunctions";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReplaceUserDefinedFunctions"] = 4096] = "ContainerReplaceUserDefinedFunctions";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerDeleteUserDefinedFunctions"] = 8192] = "ContainerDeleteUserDefinedFunctions";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerExecuteStoredProcedure"] = 128] = "ContainerExecuteStoredProcedure";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadConflicts"] = 32] = "ContainerReadConflicts";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerDeleteConflicts"] = 16384] = "ContainerDeleteConflicts";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerReadAny"] = 64] = "ContainerReadAny";
    SasTokenPermissionKind[SasTokenPermissionKind["ContainerFullAccess"] = 4294967295] = "ContainerFullAccess";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemReadAny"] = 65536] = "ItemReadAny";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemFullAccess"] = 65] = "ItemFullAccess";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemRead"] = 64] = "ItemRead";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemReplace"] = 65536] = "ItemReplace";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemUpsert"] = 131072] = "ItemUpsert";
    SasTokenPermissionKind[SasTokenPermissionKind["ItemDelete"] = 262144] = "ItemDelete";
    SasTokenPermissionKind[SasTokenPermissionKind["StoreProcedureRead"] = 128] = "StoreProcedureRead";
    SasTokenPermissionKind[SasTokenPermissionKind["StoreProcedureReplace"] = 1048576] = "StoreProcedureReplace";
    SasTokenPermissionKind[SasTokenPermissionKind["StoreProcedureDelete"] = 2097152] = "StoreProcedureDelete";
    SasTokenPermissionKind[SasTokenPermissionKind["StoreProcedureExecute"] = 4194304] = "StoreProcedureExecute";
    SasTokenPermissionKind[SasTokenPermissionKind["UserDefinedFuntionRead"] = 256] = "UserDefinedFuntionRead";
    SasTokenPermissionKind[SasTokenPermissionKind["UserDefinedFuntionReplace"] = 8388608] = "UserDefinedFuntionReplace";
    SasTokenPermissionKind[SasTokenPermissionKind["UserDefinedFuntionDelete"] = 16777216] = "UserDefinedFuntionDelete";
    SasTokenPermissionKind[SasTokenPermissionKind["TriggerRead"] = 512] = "TriggerRead";
    SasTokenPermissionKind[SasTokenPermissionKind["TriggerReplace"] = 33554432] = "TriggerReplace";
    SasTokenPermissionKind[SasTokenPermissionKind["TriggerDelete"] = 67108864] = "TriggerDelete";
})(SasTokenPermissionKind || (SasTokenPermissionKind = {}));
export var QueryFeature;
(function (QueryFeature) {
    QueryFeature["NonValueAggregate"] = "NonValueAggregate";
    QueryFeature["Aggregate"] = "Aggregate";
    QueryFeature["Distinct"] = "Distinct";
    QueryFeature["MultipleOrderBy"] = "MultipleOrderBy";
    QueryFeature["OffsetAndLimit"] = "OffsetAndLimit";
    QueryFeature["OrderBy"] = "OrderBy";
    QueryFeature["Top"] = "Top";
    QueryFeature["CompositeAggregate"] = "CompositeAggregate";
    QueryFeature["GroupBy"] = "GroupBy";
    QueryFeature["MultipleAggregates"] = "MultipleAggregates";
    QueryFeature["NonStreamingOrderBy"] = "NonStreamingOrderBy";
    QueryFeature["ListAndSetAggregate"] = "ListAndSetAggregate";
    QueryFeature["CountIf"] = "CountIf";
    QueryFeature["HybridSearch"] = "HybridSearch";
    QueryFeature["WeightedRankFusion"] = "WeightedRankFusion";
    QueryFeature["HybridSearchSkipOrderByRewrite"] = "HybridSearchSkipOrderByRewrite";
})(QueryFeature || (QueryFeature = {}));
export var SDKSupportedCapabilities;
(function (SDKSupportedCapabilities) {
    SDKSupportedCapabilities[SDKSupportedCapabilities["PartitionMerge"] = 1] = "PartitionMerge";
})(SDKSupportedCapabilities || (SDKSupportedCapabilities = {}));
//# sourceMappingURL=constants.js.map