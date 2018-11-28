export const SDK_VERSION: string = "10.0.0-preview";
export const SERVICE_VERSION: string = "2018-03-28";

export const FILE_MAX_SIZE_BYTES: number = 1024 * 1024 * 1024 * 1024; // 1TB
export const FILE_RANGE_MAX_SIZE_BYTES: number = 4 * 1024 * 1024 * 1024; // 4MB
export const DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS: number = 5;
export const DEFAULT_HIGH_LEVEL_PARALLELISM: number = 5;

export const URLConstants = {
  Parameters: {
    FORCE_BROWSER_NO_CACHE: "_",
    SHARE_SNAPSHOT: "sharesnapshot",
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
  X_MS_DATE: "x-ms-date"
};

export const ETagNone = "";
export const ETagAny = "*";
