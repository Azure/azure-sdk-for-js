// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export const SDK_VERSION: string = "12.0.0-preview.3";
export const SERVICE_VERSION: string = "2019-02-02";

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SIGNATURE: "sig",
    TIMEOUT: "timeout"
  }
};

export const HTTPURLConnection = {
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

export const DevelopmentConnectionString = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;
  AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;
  QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;`;
