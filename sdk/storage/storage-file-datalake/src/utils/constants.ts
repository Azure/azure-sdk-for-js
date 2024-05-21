// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "12.22.0-beta.2";
export const SERVICE_VERSION: string = "2024-05-04";

export const KB: number = 1024;
export const MB: number = KB * 1024;
export const GB: number = MB * 1024;
export const TB: number = GB * 1024;

export const DEFAULT_HIGH_LEVEL_CONCURRENCY: number = 5;
export const FILE_MAX_SINGLE_UPLOAD_THRESHOLD: number = 100 * MB;
export const FILE_UPLOAD_MAX_CHUNK_SIZE: number = 4000 * MB;
export const FILE_UPLOAD_DEFAULT_CHUNK_SIZE: number = 8 * MB;
export const BLOCK_BLOB_MAX_BLOCKS: number = 50000;
export const FILE_MAX_SIZE_BYTES: number = BLOCK_BLOB_MAX_BLOCKS * FILE_UPLOAD_MAX_CHUNK_SIZE;

export const StorageOAuthScopes: string | string[] = "https://storage.azure.com/.default";

export const StorageDataLakeLoggingAllowedHeaderNames = [
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
  "x-ms-encryption-key-sha256",
];

export const StorageDataLakeLoggingAllowedQueryParameters = [
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
  "snapshot",
];

export const UrlConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SIGNATURE: "sig",
    SNAPSHOT: "snapshot",
    TIMEOUT: "timeout",
  },
};

export const HttpUrlConnection = {
  HTTP_ACCEPTED: 202,
  HTTP_CONFLICT: 409,
  HTTP_NOT_FOUND: 404,
  HTTP_PRECON_FAILED: 412,
  HTTP_RANGE_NOT_SATISFIABLE: 416,
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
  X_MS_VERSION: "x-ms-version",
};

export const DevelopmentConnectionString = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;`;

// Mapping pairs to transform url from dfs endpoint to blob endpoint
// Customize this value to add more mapping patterns
export const ToBlobEndpointHostMappings = [
  ["dfs.preprod.core.windows.net", "blob.preprod.core.windows.net"],
  ["dfs.core.windows.net", "blob.core.windows.net"],
  ["dfs.core.chinacloudapi.cn", "blob.core.chinacloudapi.cn"],
  ["dfs.core.usgovcloudapi.net", "blob.core.usgovcloudapi.net"],
  ["dfs.core.cloudapi.de", "blob.core.cloudapi.de"],
  ["dfs.core.microsoft.scloud", "blob.core.microsoft.scloud"],
  ["dfs.core.eaglex.ic.gov", "blob.core.eaglex.ic.gov"],
  ["dfs.storage.azure.net", "blob.storage.azure.net"],
];

// Mapping pairs to transform url from blob endpoint to dfs endpoint
// Customize this value to add more mapping patterns
export const ToDfsEndpointHostMappings = [
  ["blob.preprod.core.windows.net", "dfs.preprod.core.windows.net"],
  ["blob.core.windows.net", "dfs.core.windows.net"],
  ["blob.core.chinacloudapi.cn", "dfs.core.chinacloudapi.cn"],
  ["blob.core.usgovcloudapi.net", "dfs.core.usgovcloudapi.net"],
  ["blob.core.cloudapi.de", "dfs.core.cloudapi.de"],
  ["blob.core.microsoft.scloud", "dfs.core.microsoft.scloud"],
  ["blob.core.eaglex.ic.gov", "dfs.core.eaglex.ic.gov"],
  ["blob.storage.azure.net", "dfs.storage.azure.net"],
];

export const ETagAny = "*";

export const DeletionIdKey = "deletionid";
export const EncryptionAlgorithmAES25 = "AES256";

export const PathResultTypeConstants = {
  FileResourceType: "file",
  DirectoryResourceType: "directory",
};

/// List of ports used for path style addressing.
/// Path style addressing means that storage account is put in URI's Path segment in instead of in host.
export const PathStylePorts = [
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
