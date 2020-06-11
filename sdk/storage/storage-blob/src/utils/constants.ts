// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const SDK_VERSION: string = "12.2.0";
export const SERVICE_VERSION: string = "2019-12-12";

export const BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES: number = 256 * 1024 * 1024; // 256MB
export const BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES: number = 100 * 1024 * 1024; // 100MB
export const BLOCK_BLOB_MAX_BLOCKS: number = 50000;
export const DEFAULT_BLOCK_BUFFER_SIZE_BYTES: number = 8 * 1024 * 1024; // 8MB
export const DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES: number = 4 * 1024 * 1024; // 4MB
export const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS: number = 5;
/**
 * The OAuth scope to use with Azure Storage.
 */
export const StorageOAuthScopes: string | string[] = "https://storage.azure.com/.default";

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SIGNATURE: "sig",
    SNAPSHOT: "snapshot",
    VERSIONID: "versionid",
    TIMEOUT: "timeout"
  }
};

export const HTTPURLConnection = {
  HTTP_ACCEPTED: 202,
  HTTP_CONFLICT: 409,
  HTTP_NOT_FOUND: 404,
  HTTP_PRECON_FAILED: 412,
  HTTP_RANGE_NOT_SATISFIABLE: 416
};

export const HeaderConstants = {
  AUTHORIZATION: "Authorization",
  AUTHORIZATION_SCHEME: "Bearer",
  CONTENT_ENCODING: "Content-Encoding",
  CONTENT_ID: "Content-ID",
  CONTENT_LANGUAGE: "Content-Language",
  CONTENT_LENGTH: "Content-Length",
  CONTENT_MD5: "Content-Md5",
  CONTENT_TRANSFER_ENCODING: "Content-Transfer-Encoding",
  CONTENT_TYPE: "Content-Type",
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
  X_MS_ERROR_CODE: "x-ms-error-code",
  X_MS_VERSION: "x-ms-version"
};

export const ETagNone = "";
export const ETagAny = "*";

export const SIZE_1_MB = 1 * 1024 * 1024;
export const BATCH_MAX_REQUEST = 256;
export const BATCH_MAX_PAYLOAD_IN_BYTES = 4 * SIZE_1_MB;
export const HTTP_LINE_ENDING = "\r\n";
export const HTTP_VERSION_1_1 = "HTTP/1.1";

export const EncryptionAlgorithmAES25 = "AES256";

export const DevelopmentConnectionString = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;`;

export const StorageBlobLoggingAllowedHeaderNames = [
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
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Unmodified-Since",
  "x-ms-access-tier",
  "x-ms-access-tier-change-time",
  "x-ms-access-tier-inferred",
  "x-ms-account-kind",
  "x-ms-archive-status",
  "x-ms-blob-append-offset",
  "x-ms-blob-cache-control",
  "x-ms-blob-committed-block-count",
  "x-ms-blob-condition-appendpos",
  "x-ms-blob-condition-maxsize",
  "x-ms-blob-content-disposition",
  "x-ms-blob-content-encoding",
  "x-ms-blob-content-language",
  "x-ms-blob-content-length",
  "x-ms-blob-content-md5",
  "x-ms-blob-content-type",
  "x-ms-blob-public-access",
  "x-ms-blob-sequence-number",
  "x-ms-blob-type",
  "x-ms-copy-destination-snapshot",
  "x-ms-creation-time",
  "x-ms-default-encryption-scope",
  "x-ms-delete-snapshots",
  "x-ms-delete-type-permanent",
  "x-ms-deny-encryption-scope-override",
  "x-ms-encryption-algorithm",
  "x-ms-if-sequence-number-eq",
  "x-ms-if-sequence-number-le",
  "x-ms-if-sequence-number-lt",
  "x-ms-incremental-copy",
  "x-ms-lease-action",
  "x-ms-lease-break-period",
  "x-ms-lease-duration",
  "x-ms-lease-id",
  "x-ms-lease-time",
  "x-ms-page-write",
  "x-ms-proposed-lease-id",
  "x-ms-range-get-content-md5",
  "x-ms-rehydrate-priority",
  "x-ms-sequence-number-action",
  "x-ms-sku-name",
  "x-ms-source-content-md5",
  "x-ms-source-if-match",
  "x-ms-source-if-modified-since",
  "x-ms-source-if-none-match",
  "x-ms-source-if-unmodified-since",
  "x-ms-tag-count",
  "x-ms-encryption-key-sha256"
];

export const StorageBlobLoggingAllowedQueryParameters = [
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
  "copyid",
  "restype",
  "blockid",
  "blocklisttype",
  "delimiter",
  "prevsnapshot",
  "ske",
  "skoid",
  "sks",
  "skt",
  "sktid",
  "skv",
  "snapshot"
];
