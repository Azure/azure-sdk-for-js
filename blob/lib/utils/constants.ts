export const SDK_VERSION: string = "10.1.0-preview";
export const SERVICE_VERSION: string = "2018-03-28";

export const BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES: number = 256 * 1024 * 1024; // 256MB
export const BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES: number = 100 * 1024 * 1024; // 100MB
export const BLOCK_BLOB_MAX_BLOCKS: number = 50000;
export const DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES: number = 4 * 1024 * 1024; // 4MB
export const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS: number = 5;

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SIGNATURE: "sig",
    SNAPSHOT: "snapshot",
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
  X_MS_DATE: "x-ms-date"
};

export const ETagNone = "";
export const ETagAny = "*";
