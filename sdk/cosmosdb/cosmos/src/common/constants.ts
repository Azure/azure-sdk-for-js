import { version } from "../../package.json";

export const Constants = {
  MediaTypes: {
    Any: "*/*",
    ImageJpeg: "image/jpeg",
    ImagePng: "image/png",
    Javascript: "application/x-javascript",
    Json: "application/json",
    OctetStream: "application/octet-stream",
    QueryJson: "application/query+json",
    SQL: "application/sql",
    TextHtml: "text/html",
    TextPlain: "text/plain",
    Xml: "application/xml"
  },

  HttpMethods: {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
    Head: "HEAD",
    Options: "OPTIONS"
  },

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
    RetryAfterInMilliseconds: "x-ms-retry-after-ms",
    IsFeedUnfiltered: "x-ms-is-feed-unfiltered",
    ResourceTokenExpiry: "x-ms-documentdb-expiry-seconds",
    EnableScanInQuery: "x-ms-documentdb-query-enable-scan",
    EmitVerboseTracesInQuery: "x-ms-documentdb-query-emit-traces",
    EnableCrossPartitionQuery: "x-ms-documentdb-query-enablecrosspartition",
    ParallelizeCrossPartitionQuery: "x-ms-documentdb-query-parallelizecrosspartitionquery",

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
    ALLOW_MULTIPLE_WRITES: "x-ms-cosmos-allow-tentative-writes"
  },

  // GlobalDB related constants
  WritableLocations: "writableLocations",
  ReadableLocations: "readableLocations",
  Name: "name",
  DatabaseAccountEndpoint: "databaseAccountEndpoint",

  // ServiceDocument Resource
  ENABLE_MULTIPLE_WRITABLE_LOCATIONS: "enableMultipleWriteLocations",

  // Background refresh time
  DefaultUnavailableLocationExpirationTimeMS: 5 * 60 * 1000,

  // Client generated retry count response header
  ThrottleRetryCount: "x-ms-throttle-retry-count",
  ThrottleRetryWaitTimeInMs: "x-ms-throttle-retry-wait-time-ms",

  CurrentVersion: "2018-06-18",

  SDKName: "azure-cosmos-js",
  SDKVersion: version,

  DefaultPrecisions: {
    DefaultNumberHashPrecision: 3,
    DefaultNumberRangePrecision: -1,
    DefaultStringHashPrecision: 3,
    DefaultStringRangePrecision: -1
  },

  ConsistentHashRing: {
    DefaultVirtualNodesPerCollection: 128
  },

  RegularExpressions: {
    TrimLeftSlashes: new RegExp("^[/]+"),
    TrimRightSlashes: new RegExp("[/]+$"),
    IllegalResourceIdCharacters: new RegExp("[/\\\\?#]")
  },

  Quota: {
    CollectionSize: "collectionSize"
  },

  Path: {
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
    DatabaseAccountPathSegment: "databaseaccount"
  },

  OperationTypes: {
    Create: "create",
    Replace: "replace",
    Upsert: "upsert",
    Delete: "delete",
    Read: "read",
    Query: "query",
    Execute: "execute"
  },

  PartitionKeyRange: {
    // Partition Key Range Constants
    MinInclusive: "minInclusive",
    MaxExclusive: "maxExclusive",
    Id: "id"
  },

  QueryRangeConstants: {
    // Partition Key Range Constants
    MinInclusive: "minInclusive",
    MaxExclusive: "maxExclusive",
    min: "min"
  },

  EffectiveParitionKeyConstants: {
    MinimumInclusiveEffectivePartitionKey: "",
    MaximumExclusiveEffectivePartitionKey: "FF"
  }
};

export enum ResourceType {
  database = "dbs",
  offer = "offers",
  user = "users",
  permission = "permissions",
  container = "colls",
  conflicts = "conflicts",
  sproc = "sprocs",
  udf = "udfs",
  trigger = "triggers",
  item = "docs"
}
