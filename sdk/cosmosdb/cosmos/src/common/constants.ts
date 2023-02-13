// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface PartitionKeyRangePropertiesNames {
  // Partition Key Range Constants
  MinInclusive: "minInclusive";
  MaxExclusive: "maxExclusive";
  Id: "id";
}

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

    // Query
    Query: "x-ms-documentdb-query",
    IsQuery: "x-ms-documentdb-isquery",
    IsQueryPlan: "x-ms-cosmos-is-query-plan-request",
    SupportedQueryFeatures: "x-ms-cosmos-supported-query-features",
    QueryVersion: "x-ms-cosmos-query-version",

    // Our custom Azure Cosmos DB headers
    Continuation: "x-ms-continuation",
    PageSize: "x-ms-max-item-count",
    ItemCount: "x-ms-item-count",

    // Request sender generated. Simply echoed by backend.
    ActivityId: "x-ms-activity-id",
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

    // QueryMetrics
    // Request header to tell backend to give you query metrics.
    PopulateQueryMetrics: "x-ms-documentdb-populatequerymetrics",
    // Response header that holds the serialized version of query metrics.
    QueryMetrics: "x-ms-documentdb-query-metrics",

    // Version headers and values
    Version: "x-ms-version",

    // Owner name
    OwnerFullName: "x-ms-alt-content-path",

    // Owner ID used for name based request in session token.
    OwnerId: "x-ms-content-path",

    // Partition Key
    PartitionKey: "x-ms-documentdb-partitionkey",
    PartitionKeyRangeID: "x-ms-documentdb-partitionkeyrangeid",

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

    // Cache Refresh header
    ForceRefresh: "x-ms-force-refresh",
  },

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
  SDKVersion: "3.17.3",

  // Bulk Operations
  DefaultMaxBulkRequestBodySizeInBytes: 220201,

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
  } as PartitionKeyRangePropertiesNames,

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
};

/**
 * @hidden
 */
export enum ResourceType {
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
}

/**
 * @hidden
 */
export enum HTTPMethod {
  get = "GET",
  patch = "PATCH",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

/**
 * @hidden
 */
export enum OperationType {
  Create = "create",
  Replace = "replace",
  Upsert = "upsert",
  Delete = "delete",
  Read = "read",
  Query = "query",
  Execute = "execute",
  Batch = "batch",
  Patch = "patch",
}

/**
 * @hidden
 */
export enum CosmosKeyType {
  PrimaryMaster = "PRIMARY_MASTER",
  SecondaryMaster = "SECONDARY_MASTER",
  PrimaryReadOnly = "PRIMARY_READONLY",
  SecondaryReadOnly = "SECONDARY_READONLY",
}

/**
 * @hidden
 */
export enum CosmosContainerChildResourceKind {
  Item = "ITEM",
  StoredProcedure = "STORED_PROCEDURE",
  UserDefinedFunction = "USER_DEFINED_FUNCTION",
  Trigger = "TRIGGER",
}
/**
 * @hidden
 */
export enum PermissionScopeValues {
  /**
   * Values which set permission Scope applicable to control plane related operations.
   */
  ScopeAccountReadValue = 0x0001,
  ScopeAccountListDatabasesValue = 0x0002,
  ScopeDatabaseReadValue = 0x0004,
  ScopeDatabaseReadOfferValue = 0x0008,
  ScopeDatabaseListContainerValue = 0x0010,
  ScopeContainerReadValue = 0x0020,
  ScopeContainerReadOfferValue = 0x0040,

  ScopeAccountCreateDatabasesValue = 0x0001,
  ScopeAccountDeleteDatabasesValue = 0x0002,
  ScopeDatabaseDeleteValue = 0x0004,
  ScopeDatabaseReplaceOfferValue = 0x0008,
  ScopeDatabaseCreateContainerValue = 0x0010,
  ScopeDatabaseDeleteContainerValue = 0x0020,
  ScopeContainerReplaceValue = 0x0040,
  ScopeContainerDeleteValue = 0x0080,
  ScopeContainerReplaceOfferValue = 0x0100,

  ScopeAccountReadAllAccessValue = 0xffff,
  ScopeDatabaseReadAllAccessValue = PermissionScopeValues.ScopeDatabaseReadValue |
    PermissionScopeValues.ScopeDatabaseReadOfferValue |
    PermissionScopeValues.ScopeDatabaseListContainerValue |
    PermissionScopeValues.ScopeContainerReadValue |
    PermissionScopeValues.ScopeContainerReadOfferValue,

  ScopeContainersReadAllAccessValue = PermissionScopeValues.ScopeContainerReadValue |
    PermissionScopeValues.ScopeContainerReadOfferValue,

  ScopeAccountWriteAllAccessValue = 0xffff,
  ScopeDatabaseWriteAllAccessValue = PermissionScopeValues.ScopeDatabaseDeleteValue |
    PermissionScopeValues.ScopeDatabaseReplaceOfferValue |
    PermissionScopeValues.ScopeDatabaseCreateContainerValue |
    PermissionScopeValues.ScopeDatabaseDeleteContainerValue |
    PermissionScopeValues.ScopeContainerReplaceValue |
    PermissionScopeValues.ScopeContainerDeleteValue |
    PermissionScopeValues.ScopeContainerReplaceOfferValue,

  ScopeContainersWriteAllAccessValue = PermissionScopeValues.ScopeContainerReplaceValue |
    PermissionScopeValues.ScopeContainerDeleteValue |
    PermissionScopeValues.ScopeContainerReplaceOfferValue,

  /**
   * Values which set permission Scope applicable to data plane related operations.
   */
  ScopeContainerExecuteQueriesValue = 0x00000001,
  ScopeContainerReadFeedsValue = 0x00000002,
  ScopeContainerReadStoredProceduresValue = 0x00000004,
  ScopeContainerReadUserDefinedFunctionsValue = 0x00000008,
  ScopeContainerReadTriggersValue = 0x00000010,
  ScopeContainerReadConflictsValue = 0x00000020,
  ScopeItemReadValue = 0x00000040,
  ScopeStoredProcedureReadValue = 0x00000080,
  ScopeUserDefinedFunctionReadValue = 0x00000100,
  ScopeTriggerReadValue = 0x00000200,

  ScopeContainerCreateItemsValue = 0x00000001,
  ScopeContainerReplaceItemsValue = 0x00000002,
  ScopeContainerUpsertItemsValue = 0x00000004,
  ScopeContainerDeleteItemsValue = 0x00000008,
  ScopeContainerCreateStoredProceduresValue = 0x00000010,
  ScopeContainerReplaceStoredProceduresValue = 0x00000020,
  ScopeContainerDeleteStoredProceduresValue = 0x00000040,
  ScopeContainerExecuteStoredProceduresValue = 0x00000080,
  ScopeContainerCreateTriggersValue = 0x00000100,
  ScopeContainerReplaceTriggersValue = 0x00000200,
  ScopeContainerDeleteTriggersValue = 0x00000400,
  ScopeContainerCreateUserDefinedFunctionsValue = 0x00000800,
  ScopeContainerReplaceUserDefinedFunctionsValue = 0x00001000,
  ScopeContainerDeleteUserDefinedFunctionSValue = 0x00002000,
  ScopeContainerDeleteCONFLICTSValue = 0x00004000,
  ScopeItemReplaceValue = 0x00010000,
  ScopeItemUpsertValue = 0x00020000,
  ScopeItemDeleteValue = 0x00040000,
  ScopeStoredProcedureReplaceValue = 0x00100000,
  ScopeStoredProcedureDeleteValue = 0x00200000,
  ScopeStoredProcedureExecuteValue = 0x00400000,
  ScopeUserDefinedFunctionReplaceValue = 0x00800000,
  ScopeUserDefinedFunctionDeleteValue = 0x01000000,
  ScopeTriggerReplaceValue = 0x02000000,
  ScopeTriggerDeleteValue = 0x04000000,

  ScopeContainerReadAllAccessValue = 0xffffffff,
  ScopeItemReadAllAccessValue = PermissionScopeValues.ScopeContainerExecuteQueriesValue |
    PermissionScopeValues.ScopeItemReadValue,
  ScopeContainerWriteAllAccessValue = 0xffffffff,
  ScopeItemWriteAllAccessValue = PermissionScopeValues.ScopeContainerCreateItemsValue |
    PermissionScopeValues.ScopeContainerReplaceItemsValue |
    PermissionScopeValues.ScopeContainerUpsertItemsValue |
    PermissionScopeValues.ScopeContainerDeleteItemsValue |
    PermissionScopeValues.ScopeItemReplaceValue |
    PermissionScopeValues.ScopeItemUpsertValue |
    PermissionScopeValues.ScopeItemDeleteValue,

  NoneValue = 0,
}
/**
 * @hidden
 */
export enum SasTokenPermissionKind {
  ContainerCreateItems = PermissionScopeValues.ScopeContainerCreateItemsValue,
  ContainerReplaceItems = PermissionScopeValues.ScopeContainerReplaceItemsValue,
  ContainerUpsertItems = PermissionScopeValues.ScopeContainerUpsertItemsValue,
  ContainerDeleteItems = PermissionScopeValues.ScopeContainerDeleteValue,
  ContainerExecuteQueries = PermissionScopeValues.ScopeContainerExecuteQueriesValue,
  ContainerReadFeeds = PermissionScopeValues.ScopeContainerReadFeedsValue,
  ContainerCreateStoreProcedure = PermissionScopeValues.ScopeContainerCreateStoredProceduresValue,
  ContainerReadStoreProcedure = PermissionScopeValues.ScopeContainerReadStoredProceduresValue,
  ContainerReplaceStoreProcedure = PermissionScopeValues.ScopeContainerReplaceStoredProceduresValue,
  ContainerDeleteStoreProcedure = PermissionScopeValues.ScopeContainerDeleteStoredProceduresValue,
  ContainerCreateTriggers = PermissionScopeValues.ScopeContainerCreateTriggersValue,
  ContainerReadTriggers = PermissionScopeValues.ScopeContainerReadTriggersValue,
  ContainerReplaceTriggers = PermissionScopeValues.ScopeContainerReplaceTriggersValue,
  ContainerDeleteTriggers = PermissionScopeValues.ScopeContainerDeleteTriggersValue,
  ContainerCreateUserDefinedFunctions = PermissionScopeValues.ScopeContainerCreateUserDefinedFunctionsValue,
  ContainerReadUserDefinedFunctions = PermissionScopeValues.ScopeContainerReadUserDefinedFunctionsValue,
  ContainerReplaceUserDefinedFunctions = PermissionScopeValues.ScopeContainerReplaceUserDefinedFunctionsValue,
  ContainerDeleteUserDefinedFunctions = PermissionScopeValues.ScopeContainerDeleteUserDefinedFunctionSValue,
  ContainerExecuteStoredProcedure = PermissionScopeValues.ScopeContainerExecuteStoredProceduresValue,
  ContainerReadConflicts = PermissionScopeValues.ScopeContainerReadConflictsValue,
  ContainerDeleteConflicts = PermissionScopeValues.ScopeContainerDeleteCONFLICTSValue,
  ContainerReadAny = PermissionScopeValues.ScopeContainerReadOfferValue,
  ContainerFullAccess = PermissionScopeValues.ScopeContainerReadAllAccessValue,
  ItemReadAny = PermissionScopeValues.ScopeItemReplaceValue,
  ItemFullAccess = PermissionScopeValues.ScopeItemReadAllAccessValue,
  ItemRead = PermissionScopeValues.ScopeItemReadValue,
  ItemReplace = PermissionScopeValues.ScopeItemReplaceValue,
  ItemUpsert = PermissionScopeValues.ScopeItemUpsertValue,
  ItemDelete = PermissionScopeValues.ScopeItemDeleteValue,
  StoreProcedureRead = PermissionScopeValues.ScopeStoredProcedureReadValue,
  StoreProcedureReplace = PermissionScopeValues.ScopeStoredProcedureReplaceValue,
  StoreProcedureDelete = PermissionScopeValues.ScopeStoredProcedureDeleteValue,
  StoreProcedureExecute = PermissionScopeValues.ScopeStoredProcedureExecuteValue,
  UserDefinedFuntionRead = PermissionScopeValues.ScopeUserDefinedFunctionReadValue,
  UserDefinedFuntionReplace = PermissionScopeValues.ScopeUserDefinedFunctionReplaceValue,
  UserDefinedFuntionDelete = PermissionScopeValues.ScopeUserDefinedFunctionDeleteValue,
  TriggerRead = PermissionScopeValues.ScopeTriggerReadValue,
  TriggerReplace = PermissionScopeValues.ScopeTriggerReplaceValue,
  TriggerDelete = PermissionScopeValues.ScopeTriggerDeleteValue,
}
