"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathStylePorts = exports.StorageQueueLoggingAllowedQueryParameters = exports.StorageQueueLoggingAllowedHeaderNames = exports.DevelopmentConnectionString = exports.ETagAny = exports.ETagNone = exports.HeaderConstants = exports.HttpUrlConnection = exports.URLConstants = exports.StorageOAuthScopes = exports.SERVICE_VERSION = exports.SDK_VERSION = void 0;
exports.SDK_VERSION = "12.26.0";
exports.SERVICE_VERSION = "2025-05-05";
/**
 * The OAuth scope to use with Azure Storage.
 */
exports.StorageOAuthScopes = "https://storage.azure.com/.default";
exports.URLConstants = {
    Parameters: {
        FORCE_BROWSER_NO_CACHE: "_",
        SIGNATURE: "sig",
        TIMEOUT: "timeout",
    },
};
exports.HttpUrlConnection = {
    HTTP_CONFLICT: 409,
    HTTP_NOT_FOUND: 404,
    HTTP_PRECON_FAILED: 412,
    HTTP_RANGE_NOT_SATISFIABLE: 416,
};
exports.HeaderConstants = {
    AUTHORIZATION: "authorization",
    AUTHORIZATION_SCHEME: "Bearer",
    CONTENT_ENCODING: "content-encoding",
    CONTENT_LANGUAGE: "content-language",
    CONTENT_LENGTH: "content-length",
    CONTENT_MD5: "content-md5",
    CONTENT_TYPE: "content-type",
    COOKIE: "Cookie",
    DATE: "date",
    IF_MATCH: "if-match",
    IF_MODIFIED_SINCE: "if-modified-since",
    IF_NONE_MATCH: "if-none-match",
    IF_UNMODIFIED_SINCE: "if-unmodified-since",
    PREFIX_FOR_STORAGE: "x-ms-",
    RANGE: "Range",
    USER_AGENT: "User-Agent",
    X_MS_CLIENT_REQUEST_ID: "x-ms-client-request-id",
    X_MS_COPY_SOURCE: "x-ms-copy-source",
    X_MS_DATE: "x-ms-date",
};
exports.ETagNone = "";
exports.ETagAny = "*";
exports.DevelopmentConnectionString = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;
  AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;
  QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;`;
exports.StorageQueueLoggingAllowedHeaderNames = [
    "Access-Control-Allow-Origin",
    "Cache-Control",
    "Content-Length",
    "Content-Type",
    "Date",
    "Request-Id",
    "traceparent",
    "Transfer-Encoding",
    "User-Agent",
    "x-ms-client-request-id",
    "x-ms-date",
    "x-ms-error-code",
    "x-ms-request-id",
    "x-ms-return-client-request-id",
    "x-ms-version",
    "x-ms-approximate-messages-count",
    "x-ms-popreceipt",
    "x-ms-time-next-visible",
];
exports.StorageQueueLoggingAllowedQueryParameters = [
    "comp",
    "maxresults",
    "rscc",
    "rscd",
    "rsce",
    "rscl",
    "rsct",
    "se",
    "si",
    "sip",
    "sp",
    "spr",
    "sr",
    "srt",
    "ss",
    "st",
    "sv",
    "include",
    "marker",
    "prefix",
    "messagettl",
    "numofmessages",
    "peekonly",
    "popreceipt",
    "visibilitytimeout",
];
/// List of ports used for path style addressing.
/// Path style addressing means that storage account is put in URI's Path segment in instead of in host.
exports.PathStylePorts = [
    "10000",
    "10001",
    "10002",
    "10003",
    "10004",
    "10100",
    "10101",
    "10102",
    "10103",
    "10104",
    "11000",
    "11001",
    "11002",
    "11003",
    "11004",
    "11100",
    "11101",
    "11102",
    "11103",
    "11104",
];
//# sourceMappingURL=constants.js.map