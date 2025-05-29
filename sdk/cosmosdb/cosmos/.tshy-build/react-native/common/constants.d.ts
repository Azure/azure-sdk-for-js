export interface PartitionKeyRangePropertiesNames {
    MinInclusive: "minInclusive";
    MaxExclusive: "maxExclusive";
    Id: "id";
}
/**
 * @hidden
 */
export declare const Constants: {
    HttpHeaders: {
        Authorization: string;
        ETag: string;
        MethodOverride: string;
        Slug: string;
        ContentType: string;
        LastModified: string;
        ContentEncoding: string;
        CharacterSet: string;
        UserAgent: string;
        CustomUserAgent: string;
        IfModifiedSince: string;
        IfMatch: string;
        IfNoneMatch: string;
        ContentLength: string;
        AcceptEncoding: string;
        KeepAlive: string;
        CacheControl: string;
        TransferEncoding: string;
        ContentLanguage: string;
        ContentLocation: string;
        ContentMd5: string;
        ContentRange: string;
        Accept: string;
        AcceptCharset: string;
        AcceptLanguage: string;
        IfRange: string;
        IfUnmodifiedSince: string;
        MaxForwards: string;
        ProxyAuthorization: string;
        AcceptRanges: string;
        ProxyAuthenticate: string;
        RetryAfter: string;
        SetCookie: string;
        WwwAuthenticate: string;
        Origin: string;
        Host: string;
        AccessControlAllowOrigin: string;
        AccessControlAllowHeaders: string;
        KeyValueEncodingFormat: string;
        WrapAssertionFormat: string;
        WrapAssertion: string;
        WrapScope: string;
        SimpleToken: string;
        HttpDate: string;
        Prefer: string;
        Location: string;
        Referer: string;
        A_IM: string;
        PreferReturnMinimal: string;
        Query: string;
        IsQuery: string;
        IsQueryPlan: string;
        SupportedQueryFeatures: string;
        QueryVersion: string;
        Continuation: string;
        ContinuationToken: string;
        PageSize: string;
        ItemCount: string;
        ChangeFeedWireFormatVersion: string;
        ActivityId: string;
        CorrelatedActivityId: string;
        PreTriggerInclude: string;
        PreTriggerExclude: string;
        PostTriggerInclude: string;
        PostTriggerExclude: string;
        IndexingDirective: string;
        SessionToken: string;
        ConsistencyLevel: string;
        XDate: string;
        CollectionPartitionInfo: string;
        CollectionServiceInfo: string;
        RetryAfterInMilliseconds: string;
        RetryAfterInMs: string;
        IsFeedUnfiltered: string;
        ResourceTokenExpiry: string;
        EnableScanInQuery: string;
        EmitVerboseTracesInQuery: string;
        EnableCrossPartitionQuery: string;
        ParallelizeCrossPartitionQuery: string;
        ResponseContinuationTokenLimitInKB: string;
        SDKSupportedCapabilities: string;
        PopulateQueryMetrics: string;
        QueryMetrics: string;
        PopulateIndexMetrics: string;
        IndexUtilization: string;
        Version: string;
        OwnerFullName: string;
        OwnerId: string;
        PartitionKey: string;
        PartitionKeyRangeID: string;
        StartEpk: string;
        EndEpk: string;
        ReadFeedKeyType: string;
        MaxEntityCount: string;
        CurrentEntityCount: string;
        CollectionQuotaInMb: string;
        CollectionCurrentUsageInMb: string;
        MaxMediaStorageUsageInMB: string;
        CurrentMediaStorageUsageInMB: string;
        RequestCharge: string;
        PopulateQuotaInfo: string;
        MaxResourceQuota: string;
        OfferType: string;
        OfferThroughput: string;
        AutoscaleSettings: string;
        DisableRUPerMinuteUsage: string;
        IsRUPerMinuteUsed: string;
        OfferIsRUPerMinuteThroughputEnabled: string;
        IndexTransformationProgress: string;
        LazyIndexingProgress: string;
        IsUpsert: string;
        SubStatus: string;
        EnableScriptLogging: string;
        ScriptLogResults: string;
        ALLOW_MULTIPLE_WRITES: string;
        IsBatchRequest: string;
        IsBatchAtomic: string;
        BatchContinueOnError: string;
        DedicatedGatewayPerRequestCacheStaleness: string;
        DedicatedGatewayPerRequestBypassCache: string;
        ForceRefresh: string;
        PriorityLevel: string;
        ThroughputBucket: string;
        IsClientEncryptedHeader: string;
        IntendedCollectionHeader: string;
        DatabaseRidHeader: string;
        AllowCachedReadsHeader: string;
    };
    ThrottledRequestMaxRetryAttemptCount: number;
    ThrottledRequestMaxWaitTimeInSeconds: number;
    ThrottledRequestFixedRetryIntervalInMs: number;
    WritableLocations: string;
    ReadableLocations: string;
    LocationUnavailableExpirationTimeInMs: number;
    ENABLE_MULTIPLE_WRITABLE_LOCATIONS: string;
    DefaultUnavailableLocationExpirationTimeMS: number;
    ThrottleRetryCount: string;
    ThrottleRetryWaitTimeInMs: string;
    CurrentVersion: string;
    AzureNamespace: string;
    AzurePackageName: string;
    SDKName: string;
    SDKVersion: string;
    CosmosDbDiagnosticLevelEnvVarName: string;
    DefaultMaxBulkRequestBodySizeInBytes: number;
    MaxBulkOperationsCount: number;
    BulkMaxDegreeOfConcurrency: number;
    Encryption: {
        DiagnosticsDecryptOperation: string;
        DiagnosticsDuration: string;
        DiagnosticsEncryptionDiagnostics: string;
        DiagnosticsEncryptOperation: string;
        DiagnosticsPropertiesEncryptedCount: string;
        DiagnosticsPropertiesDecryptedCount: string;
        DiagnosticsStartTime: string;
    };
    Quota: {
        CollectionSize: string;
    };
    Path: {
        Root: string;
        DatabasesPathSegment: string;
        CollectionsPathSegment: string;
        UsersPathSegment: string;
        DocumentsPathSegment: string;
        PermissionsPathSegment: string;
        StoredProceduresPathSegment: string;
        TriggersPathSegment: string;
        UserDefinedFunctionsPathSegment: string;
        ConflictsPathSegment: string;
        AttachmentsPathSegment: string;
        PartitionKeyRangesPathSegment: string;
        SchemasPathSegment: string;
        OffersPathSegment: string;
        TopologyPathSegment: string;
        DatabaseAccountPathSegment: string;
    };
    PartitionKeyRange: PartitionKeyRangePropertiesNames;
    QueryRangeConstants: {
        MinInclusive: string;
        MaxExclusive: string;
        min: string;
    };
    /**
     * @deprecated Use EffectivePartitionKeyConstants instead
     */
    EffectiveParitionKeyConstants: {
        MinimumInclusiveEffectivePartitionKey: string;
        MaximumExclusiveEffectivePartitionKey: string;
    };
    EffectivePartitionKeyConstants: {
        MinimumInclusiveEffectivePartitionKey: string;
        MaximumExclusiveEffectivePartitionKey: string;
    };
    AllVersionsAndDeletesChangeFeedWireFormatVersion: string;
    ChangeFeedIfNoneMatchStartFromNowHeader: string;
    DefaultEncryptionCacheTimeToLiveInSeconds: number;
    EncryptionCacheRefreshIntervalInMs: number;
};
/**
 * @hidden
 */
export declare enum ResourceType {
    none = "",
    database = "dbs",
    offer = "offers",
    user = "users",
    permission = "permissions",
    container = "colls",
    conflicts = "conflicts",
    sproc = "sprocs",
    udf = "udfs",
    trigger = "triggers",
    item = "docs",
    pkranges = "pkranges",
    partitionkey = "partitionKey",
    /** resource representing client encryption keys to encrypt/decrypt data */
    clientencryptionkey = "clientencryptionkeys"
}
/**
 * @hidden
 */
export declare enum HTTPMethod {
    get = "GET",
    patch = "PATCH",
    post = "POST",
    put = "PUT",
    delete = "DELETE"
}
/**
 * @hidden
 */
export declare enum OperationType {
    Create = "create",
    Replace = "replace",
    Upsert = "upsert",
    Delete = "delete",
    Read = "read",
    Query = "query",
    Execute = "execute",
    Batch = "batch",
    Patch = "patch"
}
/**
 * @hidden
 */
export declare enum CosmosKeyType {
    PrimaryMaster = "PRIMARY_MASTER",
    SecondaryMaster = "SECONDARY_MASTER",
    PrimaryReadOnly = "PRIMARY_READONLY",
    SecondaryReadOnly = "SECONDARY_READONLY"
}
/**
 * @hidden
 */
export declare enum CosmosContainerChildResourceKind {
    Item = "ITEM",
    StoredProcedure = "STORED_PROCEDURE",
    UserDefinedFunction = "USER_DEFINED_FUNCTION",
    Trigger = "TRIGGER"
}
/**
 * @hidden
 */
export declare enum PermissionScopeValues {
    /**
     * Values which set permission Scope applicable to control plane related operations.
     */
    ScopeAccountReadValue = 1,
    ScopeAccountListDatabasesValue = 2,
    ScopeDatabaseReadValue = 4,
    ScopeDatabaseReadOfferValue = 8,
    ScopeDatabaseListContainerValue = 16,
    ScopeContainerReadValue = 32,
    ScopeContainerReadOfferValue = 64,
    ScopeAccountCreateDatabasesValue = 1,
    ScopeAccountDeleteDatabasesValue = 2,
    ScopeDatabaseDeleteValue = 4,
    ScopeDatabaseReplaceOfferValue = 8,
    ScopeDatabaseCreateContainerValue = 16,
    ScopeDatabaseDeleteContainerValue = 32,
    ScopeContainerReplaceValue = 64,
    ScopeContainerDeleteValue = 128,
    ScopeContainerReplaceOfferValue = 256,
    ScopeAccountReadAllAccessValue = 65535,
    ScopeDatabaseReadAllAccessValue = 124,
    ScopeContainersReadAllAccessValue = 96,
    ScopeAccountWriteAllAccessValue = 65535,
    ScopeDatabaseWriteAllAccessValue = 508,
    ScopeContainersWriteAllAccessValue = 448,
    /**
     * Values which set permission Scope applicable to data plane related operations.
     */
    ScopeContainerExecuteQueriesValue = 1,
    ScopeContainerReadFeedsValue = 2,
    ScopeContainerReadStoredProceduresValue = 4,
    ScopeContainerReadUserDefinedFunctionsValue = 8,
    ScopeContainerReadTriggersValue = 16,
    ScopeContainerReadConflictsValue = 32,
    ScopeItemReadValue = 64,
    ScopeStoredProcedureReadValue = 128,
    ScopeUserDefinedFunctionReadValue = 256,
    ScopeTriggerReadValue = 512,
    ScopeContainerCreateItemsValue = 1,
    ScopeContainerReplaceItemsValue = 2,
    ScopeContainerUpsertItemsValue = 4,
    ScopeContainerDeleteItemsValue = 8,
    ScopeContainerCreateStoredProceduresValue = 16,
    ScopeContainerReplaceStoredProceduresValue = 32,
    ScopeContainerDeleteStoredProceduresValue = 64,
    ScopeContainerExecuteStoredProceduresValue = 128,
    ScopeContainerCreateTriggersValue = 256,
    ScopeContainerReplaceTriggersValue = 512,
    ScopeContainerDeleteTriggersValue = 1024,
    ScopeContainerCreateUserDefinedFunctionsValue = 2048,
    ScopeContainerReplaceUserDefinedFunctionsValue = 4096,
    ScopeContainerDeleteUserDefinedFunctionSValue = 8192,
    ScopeContainerDeleteCONFLICTSValue = 16384,
    ScopeItemReplaceValue = 65536,
    ScopeItemUpsertValue = 131072,
    ScopeItemDeleteValue = 262144,
    ScopeStoredProcedureReplaceValue = 1048576,
    ScopeStoredProcedureDeleteValue = 2097152,
    ScopeStoredProcedureExecuteValue = 4194304,
    ScopeUserDefinedFunctionReplaceValue = 8388608,
    ScopeUserDefinedFunctionDeleteValue = 16777216,
    ScopeTriggerReplaceValue = 33554432,
    ScopeTriggerDeleteValue = 67108864,
    ScopeContainerReadAllAccessValue = 4294967295,
    ScopeItemReadAllAccessValue = 65,
    ScopeContainerWriteAllAccessValue = 4294967295,
    ScopeItemWriteAllAccessValue = 458767,
    NoneValue = 0
}
/**
 * @hidden
 */
export declare enum SasTokenPermissionKind {
    ContainerCreateItems = 1,
    ContainerReplaceItems = 2,
    ContainerUpsertItems = 4,
    ContainerDeleteItems = 128,
    ContainerExecuteQueries = 1,
    ContainerReadFeeds = 2,
    ContainerCreateStoreProcedure = 16,
    ContainerReadStoreProcedure = 4,
    ContainerReplaceStoreProcedure = 32,
    ContainerDeleteStoreProcedure = 64,
    ContainerCreateTriggers = 256,
    ContainerReadTriggers = 16,
    ContainerReplaceTriggers = 512,
    ContainerDeleteTriggers = 1024,
    ContainerCreateUserDefinedFunctions = 2048,
    ContainerReadUserDefinedFunctions = 8,
    ContainerReplaceUserDefinedFunctions = 4096,
    ContainerDeleteUserDefinedFunctions = 8192,
    ContainerExecuteStoredProcedure = 128,
    ContainerReadConflicts = 32,
    ContainerDeleteConflicts = 16384,
    ContainerReadAny = 64,
    ContainerFullAccess = 4294967295,
    ItemReadAny = 65536,
    ItemFullAccess = 65,
    ItemRead = 64,
    ItemReplace = 65536,
    ItemUpsert = 131072,
    ItemDelete = 262144,
    StoreProcedureRead = 128,
    StoreProcedureReplace = 1048576,
    StoreProcedureDelete = 2097152,
    StoreProcedureExecute = 4194304,
    UserDefinedFuntionRead = 256,
    UserDefinedFuntionReplace = 8388608,
    UserDefinedFuntionDelete = 16777216,
    TriggerRead = 512,
    TriggerReplace = 33554432,
    TriggerDelete = 67108864
}
export declare enum QueryFeature {
    NonValueAggregate = "NonValueAggregate",
    Aggregate = "Aggregate",
    Distinct = "Distinct",
    MultipleOrderBy = "MultipleOrderBy",
    OffsetAndLimit = "OffsetAndLimit",
    OrderBy = "OrderBy",
    Top = "Top",
    CompositeAggregate = "CompositeAggregate",
    GroupBy = "GroupBy",
    MultipleAggregates = "MultipleAggregates",
    NonStreamingOrderBy = "NonStreamingOrderBy",
    ListAndSetAggregate = "ListAndSetAggregate",
    CountIf = "CountIf",
    HybridSearch = "HybridSearch",
    WeightedRankFusion = "WeightedRankFusion",
    HybridSearchSkipOrderByRewrite = "HybridSearchSkipOrderByRewrite"
}
export declare enum SDKSupportedCapabilities {
    PartitionMerge = 1
}
//# sourceMappingURL=constants.d.ts.map