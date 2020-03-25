// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const SDK_VERSION: string = "12.1.2";
export const SERVICE_VERSION: string = "2019-07-07";

export const FILE_MAX_SIZE_BYTES: number = 1024 * 1024 * 1024 * 1024; // 1TB
export const FILE_RANGE_MAX_SIZE_BYTES: number = 4 * 1024 * 1024; // 4MB
export const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS: number = 5;
export const DEFAULT_HIGH_LEVEL_CONCURRENCY: number = 5;

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SHARE_SNAPSHOT: "sharesnapshot",
    SIGNATURE: "sig",
    TIMEOUT: "timeout"
  }
};

export const HttpUrlConnection = {
  HTTP_CONFLICT: 409,
  HTTP_NOT_FOUND: 404,
  HTTP_PRECON_FAILED: 412,
  HTTP_RANGE_NOT_SATISFIABLE: 416
};

export const HeaderConstants = {
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
  X_MS_DATE: "x-ms-date"
};

export const ETagNone = "";
export const ETagAny = "*";

export const StorageFileLoggingAllowedHeaderNames = [
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
  "Accept-Ranges",
  "Content-Disposition",
  "Content-Encoding",
  "Content-Language",
  "Content-MD5",
  "Content-Range",
  "ETag",
  "Last-Modified",
  "Server",
  "Vary",
  "x-ms-content-crc64",
  "x-ms-copy-action",
  "x-ms-copy-completion-time",
  "x-ms-copy-id",
  "x-ms-copy-progress",
  "x-ms-copy-status",
  "x-ms-has-immutability-policy",
  "x-ms-has-legal-hold",
  "x-ms-lease-state",
  "x-ms-lease-status",
  "x-ms-range",
  "x-ms-request-server-encrypted",
  "x-ms-server-encrypted",
  "x-ms-snapshot",
  "x-ms-source-range",
  "x-ms-cache-control",
  "x-ms-content-disposition",
  "x-ms-content-encoding",
  "x-ms-content-language",
  "x-ms-content-length",
  "x-ms-content-md5",
  "x-ms-content-type",
  "x-ms-file-attributes",
  "x-ms-file-change-time",
  "x-ms-file-creation-time",
  "x-ms-file-id",
  "x-ms-file-last-write-time",
  "x-ms-file-parent-id",
  "x-ms-handle-id",
  "x-ms-number-of-handles-closed",
  "x-ms-recursive",
  "x-ms-share-quota",
  "x-ms-type",
  "x-ms-write"
];

export const StorageFileLoggingAllowedQueryParameters = [
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
  "copyid",
  "restype"
];
