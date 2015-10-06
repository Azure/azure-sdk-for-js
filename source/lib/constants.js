//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

//SCRIPT START

var Constants = {
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

        // Query
        Query: "x-ms-documentdb-query",
        IsQuery: "x-ms-documentdb-isquery",

        // Our custom DocumentDB headers
        Continuation: "x-ms-continuation",
        PageSize: "x-ms-max-item-count",

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
        // Version headers and values
        Version: "x-ms-version",

        //Quota Info
        MaxEntityCount: "x-ms-root-entity-max-count",
        CurrentEntityCount: "x-ms-root-entity-current-count",
        CollectionQuotaInMb: "x-ms-collection-quota-mb",
        CollectionCurrentUsageInMb: "x-ms-collection-usage-mb",
        MaxMediaStorageUsageInMB: "x-ms-max-media-storage-usage-mb",
        CurrentMediaStorageUsageInMB: "x-ms-media-storage-usage-mb",
        RequestCharge: "x-ms-request-charge",

        // Offer header
        OfferType: "x-ms-offer-type",

        // Index progress headers
        IndexTransformationProgress: "x-ms-documentdb-collection-index-transformation-progress",
        LazyIndexingProgress: "x-ms-documentdb-collection-lazy-indexing-progress",

        // Upsert header
        IsUpsert: "x-ms-documentdb-is-upsert"
    },

    CurrentVersion: "2015-08-06",

    UserAgent: "documentdb-nodejs-sdk-1.4.0",

    DefaultPrecisions: {
        DefaultNumberHashPrecision: 3,
        DefaultNumberRangePrecision: -1,
        DefaultStringHashPrecision: 3,
        DefaultStringRangePrecision: -1
    }
};

//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = Constants;
}