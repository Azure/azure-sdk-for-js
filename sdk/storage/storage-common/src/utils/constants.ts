// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const SDK_VERSION: string = "1.0.0";

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SIGNATURE: "sig",
    SNAPSHOT: "snapshot",
    VERSIONID: "versionid",
    TIMEOUT: "timeout",
  },
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
  X_MS_CopySourceErrorCode: "x-ms-copy-source-error-code",
};
export const DevelopmentConnectionString = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;`;

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
