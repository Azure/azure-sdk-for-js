import * as Models from "./generated/models";

// @public
class AccountSASPermissions {
  add: boolean;
  create: boolean;
  delete: boolean;
  list: boolean;
  static parse(permissions: string): AccountSASPermissions;
  process: boolean;
  read: boolean;
  toString(): string;
  update: boolean;
  write: boolean;
}

// @public
class AccountSASResourceTypes {
  container: boolean;
  object: boolean;
  static parse(resourceTypes: string): AccountSASResourceTypes;
  service: boolean;
  toString(): string;
}

// @public
class AccountSASServices {
  blob: boolean;
  file: boolean;
  static parse(services: string): AccountSASServices;
  queue: boolean;
  table: boolean;
  toString(): string;
}

// @public
interface AccountSASSignatureValues {
  expiryTime: Date;
  ipRange?: IPRange;
  permissions: string;
  protocol?: SASProtocol;
  resourceTypes: string;
  services: string;
  startTime?: Date;
  version?: string;
}

// @public
class AnonymousCredential extends Credential {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): AnonymousCredentialPolicy;
}

// @public
class AnonymousCredentialPolicy extends CredentialPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
}

// @public (undocumented)
class BaseRequestPolicy implements RequestPolicy {
  protected constructor(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions);
  // (undocumented)
  readonly _nextPolicy: RequestPolicy;
  // (undocumented)
  readonly _options: RequestPolicyOptions;
  log(logLevel: HttpPipelineLogLevel, message: string): void;
  // (undocumented)
  abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
  shouldLog(logLevel: HttpPipelineLogLevel): boolean;
}

// @public
class BrowserPolicyFactory implements RequestPolicyFactory {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BrowserPolicy;
}

// @public
class Credential implements RequestPolicyFactory {
  create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy;
}

// @public
class CredentialPolicy extends BaseRequestPolicy {
  sendRequest(request: WebResource): Promise<HttpOperationResponse>;
  protected signRequest(request: WebResource): WebResource;
}

// @public
export function deserializationPolicy(deserializationContentTypes?: DeserializationContentTypes): RequestPolicyFactory;

// @public
class DirectoryClient extends StorageClient {
  constructor(url: string, credential?: Credential, options?: NewPipelineOptions);
  create(options?: DirectoryCreateOptions): Promise<Models.DirectoryCreateResponse>;
  createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
          fileClient: FileClient;
          fileCreateResponse: Models.FileCreateResponse;
      }>;
  createSubdirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
          directoryClient: DirectoryClient;
          directoryCreateResponse: Models.DirectoryCreateResponse;
      }>;
  delete(options?: DirectoryDeleteOptions): Promise<Models.DirectoryDeleteResponse>;
  deleteFile(fileName: string, options?: FileDeleteOptions): Promise<Models.FileDeleteResponse>;
  deleteSubdirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<Models.DirectoryDeleteResponse>;
  // (undocumented)
  readonly dirPath: string;
  forceCloseHandle(handleId: string, options?: DirectoryForceCloseHandlesOptions): Promise<Models.DirectoryForceCloseHandlesResponse>;
  forceCloseHandlesSegment(marker?: string, options?: DirectoryForceCloseHandlesSegmentOptions): Promise<Models.DirectoryForceCloseHandlesResponse>;
  getDirectoryClient(subDirectoryName: string): DirectoryClient;
  getFileClient(fileName: string): FileClient;
  getProperties(options?: DirectoryGetPropertiesOptions): Promise<Models.DirectoryGetPropertiesResponse>;
  listFilesAndDirectories(options?: DirectoryListFilesAndDirectoriesOptions): PagedAsyncIterableIterator<{
          kind: "file";
      } & Models.FileItem | {
          kind: "directory";
      } & Models.DirectoryItem, Models.DirectoryListFilesAndDirectoriesSegmentResponse>;
  listHandles(options?: DirectoryListHandlesOptions): PagedAsyncIterableIterator<Models.HandleItem, Models.DirectoryListHandlesResponse>;
  setMetadata(metadata?: Metadata, options?: DirectorySetMetadataOptions): Promise<Models.DirectorySetMetadataResponse>;
  setProperties(properties?: DirectoryProperties): Promise<Models.DirectorySetPropertiesResponse>;
  // (undocumented)
  readonly shareName: string;
}

// @public
interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
}

// @public
interface DirectoryDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface DirectoryForceCloseHandlesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface DirectoryForceCloseHandlesSegmentOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  recursive?: boolean;
}

// @public
interface DirectoryGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface DirectoryListFilesAndDirectoriesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  prefix?: string;
}

// @public
interface DirectoryListHandlesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  recursive?: boolean;
}

// @public
interface DirectoryListHandlesSegmentOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  maxresults?: number;
  recursive?: boolean;
}

// @public (undocumented)
interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface DirectorySetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface DownloadFromAzureFileOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  maxRetryRequestsPerRange?: number;
  parallelism?: number;
  progress?: (progress: TransferProgressEvent) => void;
  rangeSize?: number;
}

// @public
interface FileAbortCopyFromURLOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileClearRangeOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
class FileClient extends StorageClient {
  constructor(url: string, credential?: Credential, options?: NewPipelineOptions);
  abortCopyFromURL(copyId: string, options?: FileAbortCopyFromURLOptions): Promise<Models.FileAbortCopyResponse>;
  clearRange(offset: number, contentLength: number, options?: FileClearRangeOptions): Promise<Models.FileUploadRangeResponse>;
  create(size: number, options?: FileCreateOptions): Promise<Models.FileCreateResponse>;
  delete(options?: FileDeleteOptions): Promise<Models.FileDeleteResponse>;
  download(offset?: number, count?: number, options?: FileDownloadOptions): Promise<Models.FileDownloadResponse>;
  downloadToBuffer(buffer: Buffer, offset: number, count?: number, options?: DownloadFromAzureFileOptions): Promise<void>;
  downloadToFile(filePath: string, offset?: number, count?: number, options?: FileDownloadOptions): Promise<Models.FileDownloadResponse>;
  // (undocumented)
  readonly filePath: string;
  forceCloseHandle(handleId: string, options?: FileForceCloseHandlesOptions): Promise<Models.FileForceCloseHandlesResponse>;
  forceCloseHandlesSegment(marker?: string, options?: FileForceCloseHandlesOptions): Promise<Models.FileForceCloseHandlesResponse>;
  getProperties(options?: FileGetPropertiesOptions): Promise<Models.FileGetPropertiesResponse>;
  getRangeList(options?: FileGetRangeListOptions): Promise<FileGetRangeListResponse>;
  listHandlesSegment(marker?: string, options?: FileListHandlesSegmentOptions): Promise<Models.FileListHandlesResponse>;
  resize(length: number, options?: FileResizeOptions): Promise<Models.FileSetHTTPHeadersResponse>;
  setHTTPHeaders(fileHTTPHeaders?: FileHTTPHeaders, options?: FileSetHTTPHeadersOptions): Promise<Models.FileSetHTTPHeadersResponse>;
  setMetadata(metadata?: Metadata, options?: FileSetMetadataOptions): Promise<Models.FileSetMetadataResponse>;
  setProperties(properties?: FileProperties): Promise<SetPropertiesResponse>;
  // (undocumented)
  readonly shareName: string;
  startCopyFromURL(copySource: string, options?: FileStartCopyOptions): Promise<Models.FileStartCopyResponse>;
  uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: UploadToAzureFileOptions): Promise<void>;
  uploadFile(filePath: string, options?: UploadToAzureFileOptions): Promise<void>;
  uploadRange(body: HttpRequestBody, offset: number, contentLength: number, options?: FileUploadRangeOptions): Promise<Models.FileUploadRangeResponse>;
  uploadRangeFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: FileUploadRangeFromURLOptions): Promise<Models.FileUploadRangeFromURLResponse>;
  uploadResetableStream(streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream, size: number, options?: UploadToAzureFileOptions): Promise<void>;
  UploadSeekableBlob(blobFactory: (offset: number, size: number) => Blob, size: number, options?: UploadToAzureFileOptions): Promise<void>;
  uploadStream(stream: Readable, size: number, bufferSize: number, maxBuffers: number, options?: UploadStreamToAzureFileOptions): Promise<void>;
}

// @public
interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
  fileHTTPHeaders?: FileHTTPHeaders;
  metadata?: Metadata;
}

// @public
interface FileDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileDownloadOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  maxRetryRequests?: number;
  progress?: (progress: TransferProgressEvent) => void;
  rangeGetContentMD5?: boolean;
}

// @public
interface FileForceCloseHandlesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileGetRangeListOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  range?: Range;
}

// @public
interface FileListHandlesSegmentOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  maxresults?: number;
}

// @public (undocumented)
interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
  fileHTTPHeaders?: FileHTTPHeaders;
}

// @public
interface FileResizeOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
class FileSASPermissions {
  create: boolean;
  delete: boolean;
  static parse(permissions: string): FileSASPermissions;
  read: boolean;
  toString(): string;
  write: boolean;
}

// @public
interface FileSASSignatureValues {
  cacheControl?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentType?: string;
  expiryTime?: Date;
  filePath?: string;
  identifier?: string;
  ipRange?: IPRange;
  permissions?: string;
  protocol?: SASProtocol;
  shareName: string;
  startTime?: Date;
  version?: string;
}

// @public
class FileServiceClient extends StorageClient {
  constructor(url: string, credential?: Credential, options?: NewPipelineOptions);
  createShare(shareName: string, options?: ShareCreateOptions): Promise<{
          shareCreateResponse: Models.ShareCreateResponse;
          shareClient: ShareClient;
      }>;
  deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<Models.ShareDeleteResponse>;
  static fromConnectionString(connectionString: string, options?: NewPipelineOptions): FileServiceClient;
  getProperties(options?: ServiceGetPropertiesOptions): Promise<Models.ServiceGetPropertiesResponse>;
  getShareClient(shareName: string): ShareClient;
  listShares(options?: ServiceListSharesOptions): PagedAsyncIterableIterator<Models.ShareItem, Models.ServiceListSharesSegmentResponse>;
  setProperties(properties: Models.FileServiceProperties, options?: ServiceSetPropertiesOptions): Promise<Models.ServiceSetPropertiesResponse>;
}

// @public
interface FileSetHTTPHeadersOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileStartCopyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
}

// @public
class FileSystemAttributes {
  archive: boolean;
  directory: boolean;
  hidden: boolean;
  none: boolean;
  noScrubData: boolean;
  notContentIndexed: boolean;
  offline: boolean;
  static parse(fileAttributes: string): FileSystemAttributes;
  readonly: boolean;
  system: boolean;
  temporary: boolean;
  toString(): string;
}

// @public
interface FileUploadRangeFromURLOptions extends Models.FileUploadRangeFromURLOptionalParams, CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface FileUploadRangeOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  contentMD5?: Uint8Array;
  progress?: (progress: TransferProgressEvent) => void;
}

// @public
export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;

// @public
export function generateFileSASQueryParameters(fileSASSignatureValues: FileSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;

// @public
class HttpHeaders {
  constructor(rawHeaders?: RawHttpHeaders);
  clone(): HttpHeaders;
  contains(headerName: string): boolean;
  get(headerName: string): string | undefined;
  headerNames(): string[];
  headersArray(): HttpHeader[];
  headerValues(): string[];
  rawHeaders(): RawHttpHeaders;
  remove(headerName: string): boolean;
  set(headerName: string, headerValue: string | number): void;
  toJson(): RawHttpHeaders;
  toString(): string;
}

// @public
interface HttpOperationResponse extends HttpResponse {
  blobBody?: Promise<Blob>;
  bodyAsText?: string | null;
  parsedBody?: any;
  parsedHeaders?: {
    [key: string]: any;
  }
  readableStreamBody?: NodeJS.ReadableStream;
}

// @public
enum HttpPipelineLogLevel {
  ERROR = 1,
  INFO = 3,
  OFF = 0,
  WARNING = 2
}

// @public
interface IHttpClient extends RequestPolicy {
}

// @public
interface IHttpPipelineLogger {
  log(logLevel: HttpPipelineLogLevel, message: string): void;
  minimumLogLevel: HttpPipelineLogLevel;
}

// @public
interface IPRange {
  end?: string;
  start: string;
}

// @public
class LoggingPolicyFactory implements RequestPolicyFactory {
  constructor(loggingOptions?: RequestLogOptions);
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): LoggingPolicy;
}

// @public
export function newPipeline(credential: Credential, pipelineOptions?: NewPipelineOptions): Pipeline;

// @public
interface NewPipelineOptions {
  httpClient?: IHttpClient;
  keepAliveOptions?: KeepAliveOptions;
  logger?: IHttpPipelineLogger;
  // (undocumented)
  proxy?: ProxySettings | string;
  retryOptions?: RetryOptions;
  telemetry?: TelemetryOptions;
}

// @public
class Pipeline {
  constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
  readonly factories: RequestPolicyFactory[];
  readonly options: PipelineOptions;
  toServiceClientOptions(): ServiceClientOptions;
}

// @public
interface PipelineOptions {
  HTTPClient?: IHttpClient;
  logger?: IHttpPipelineLogger;
}

// @public
interface Range {
  count?: number;
  offset: number;
}

// @public
interface RequestLogOptions {
  logWarningIfTryOverThreshold: number;
}

// @public (undocumented)
interface RequestPolicy {
  // (undocumented)
  sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
}

// @public
class RequestPolicyOptions {
  constructor(_logger?: HttpPipelineLogger | undefined);
  log(logLevel: HttpPipelineLogLevel, message: string): void;
  shouldLog(logLevel: HttpPipelineLogLevel): boolean;
}

// @public (undocumented)
class RestError extends Error {
  constructor(message: string, code?: string, statusCode?: number, request?: WebResource, response?: HttpOperationResponse, body?: any);
  // (undocumented)
  body?: any;
  // (undocumented)
  code?: string;
  // (undocumented)
  static readonly PARSE_ERROR: string;
  // (undocumented)
  request?: WebResource;
  // (undocumented)
  static readonly REQUEST_ABORTED_ERROR: string;
  // (undocumented)
  static readonly REQUEST_SEND_ERROR: string;
  // (undocumented)
  response?: HttpOperationResponse;
  // (undocumented)
  statusCode?: number;
}

// @public
interface RetryOptions {
  readonly maxRetryDelayInMs?: number;
  readonly maxTries?: number;
  readonly retryDelayInMs?: number;
  readonly retryPolicyType?: RetryPolicyType;
  readonly tryTimeoutInMs?: number;
}

// @public
class RetryPolicyFactory implements RequestPolicyFactory {
  constructor(retryOptions?: RetryOptions);
  // (undocumented)
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RetryPolicy;
}

// @public
enum RetryPolicyType {
  EXPONENTIAL = 0,
  FIXED = 1
}

// @public
enum SASProtocol {
  HTTPS = "https",
  HTTPSandHTTP = "https,http"
}

// @public
class SASQueryParameters {
  constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startTime?: Date, expiryTime?: Date, ipRange?: IPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string);
  readonly cacheControl?: string;
  readonly contentDisposition?: string;
  readonly contentEncoding?: string;
  readonly contentLanguage?: string;
  readonly contentType?: string;
  readonly expiryTime?: Date;
  readonly identifier?: string;
  readonly ipRange: IPRange | undefined;
  readonly permissions?: string;
  readonly protocol?: SASProtocol;
  readonly resource?: string;
  readonly resourceTypes?: string;
  readonly services?: string;
  readonly signature: string;
  readonly startTime?: Date;
  toString(): string;
  readonly version: string;
}

// @public
interface ServiceGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceListSharesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  includeMetadata?: boolean;
  includeSnapshots?: boolean;
  prefix?: string;
}

// @public
interface ServiceSetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public (undocumented)
interface SetPropertiesResponse extends Models.FileSetHTTPHeadersResponse {
}

// @public
class ShareClient extends StorageClient {
  constructor(connectionString: string, shareName: string, options?: NewPipelineOptions);
  create(options?: ShareCreateOptions): Promise<Models.ShareCreateResponse>;
  createDirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
          directoryClient: DirectoryClient;
          directoryCreateResponse: Models.DirectoryCreateResponse;
      }>;
  createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
          fileClient: FileClient;
          fileCreateResponse: Models.FileCreateResponse;
      }>;
  createPermission(filePermission: string, options?: ShareCreatePermissionOptions): Promise<Models.ShareCreatePermissionResponse>;
  createSnapshot(options?: ShareCreateSnapshotOptions): Promise<Models.ShareCreateSnapshotResponse>;
  delete(options?: ShareDeleteMethodOptions): Promise<Models.ShareDeleteResponse>;
  deleteDirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<Models.DirectoryDeleteResponse>;
  deleteFile(fileName: string, options?: FileDeleteOptions): Promise<Models.FileDeleteResponse>;
  getAccessPolicy(options?: ShareGetAccessPolicyOptions): Promise<ShareGetAccessPolicyResponse>;
  getDirectoryClient(directoryName: string): DirectoryClient;
  getPermission(filePermissionKey: string, options?: ShareGetPermissionOptions): Promise<Models.ShareGetPermissionResponse>;
  getProperties(options?: ShareGetPropertiesOptions): Promise<Models.ShareGetPropertiesResponse>;
  getStatistics(options?: ShareGetStatisticsOptions): Promise<ShareGetStatisticsResponse>;
  readonly rootDirectoryClient: DirectoryClient;
  setAccessPolicy(shareAcl?: SignedIdentifier[], options?: ShareSetAccessPolicyOptions): Promise<Models.ShareSetAccessPolicyResponse>;
  setMetadata(metadata?: Metadata, options?: ShareSetMetadataOptions): Promise<Models.ShareSetMetadataResponse>;
  setQuota(quotaInGB: number, options?: ShareSetQuotaOptions): Promise<Models.ShareSetQuotaResponse>;
  // (undocumented)
  readonly shareName: string;
  withSnapshot(snapshot: string): ShareClient;
}

// @public
interface ShareCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: {
    [propertyName: string]: string;
  }
  quota?: number;
}

// @public
interface ShareCreatePermissionOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareCreateSnapshotOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: {
    [propertyName: string]: string;
  }
}

// @public
interface ShareDeleteMethodOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

// @public
class SharedKeyCredential extends Credential {
  constructor(accountName: string, accountKey: string);
  readonly accountName: string;
  computeHMACSHA256(stringToSign: string): string;
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): SharedKeyCredentialPolicy;
}

// @public
class SharedKeyCredentialPolicy extends CredentialPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, factory: SharedKeyCredential);
  protected signRequest(request: WebResource): WebResource;
}

// @public
interface ShareGetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareGetPermissionOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareGetStatisticsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
class ShareSASPermissions {
  create: boolean;
  delete: boolean;
  list: boolean;
  static parse(permissions: string): ShareSASPermissions;
  read: boolean;
  toString(): string;
  write: boolean;
}

// @public
interface ShareSetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ShareSetQuotaOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface SignedIdentifier {
  accessPolicy: {
    expiry: Date;
    permission: string;
    start: Date;
  }
  id: string;
}

// @public
interface TelemetryOptions {
  value: string;
}

// @public
class TelemetryPolicyFactory implements RequestPolicyFactory {
  constructor(telemetry?: TelemetryOptions);
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): TelemetryPolicy;
}

// @public
class UniqueRequestIDPolicyFactory implements RequestPolicyFactory {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): UniqueRequestIDPolicy;
}

// @public
interface UploadStreamToAzureFileOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  fileHTTPHeaders?: FileHTTPHeaders;
  metadata?: Metadata;
  progress?: (progress: TransferProgressEvent) => void;
}

// @public
interface UploadToAzureFileOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  fileHTTPHeaders?: FileHTTPHeaders;
  metadata?: Metadata;
  parallelism?: number;
  progress?: (progress: TransferProgressEvent) => void;
  rangeSize?: number;
}

// @public
class WebResource {
  constructor(url?: string, method?: HttpMethods, body?: any, query?: {
          [key: string]: any;
      }, headers?: {
          [key: string]: any;
      } | HttpHeaders, streamResponseBody?: boolean, withCredentials?: boolean, abortSignal?: AbortSignalLike, timeout?: number, onUploadProgress?: (progress: TransferProgressEvent) => void, onDownloadProgress?: (progress: TransferProgressEvent) => void, proxySettings?: ProxySettings, keepAlive?: boolean);
  // (undocumented)
  abortSignal?: AbortSignalLike;
  // (undocumented)
  body?: any;
  clone(): WebResource;
  // (undocumented)
  formData?: any;
  // (undocumented)
  headers: HttpHeaders;
  // (undocumented)
  keepAlive?: boolean;
  // (undocumented)
  method: HttpMethods;
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  onUploadProgress?: (progress: TransferProgressEvent) => void;
  operationResponseGetter?: (operationSpec: OperationSpec, response: HttpOperationResponse) => undefined | OperationResponse;
  // (undocumented)
  operationSpec?: OperationSpec;
  prepare(options: RequestPrepareOptions): WebResource;
  // (undocumented)
  proxySettings?: ProxySettings;
  // (undocumented)
  query?: {
    [key: string]: any;
  }
  shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
  spanOptions?: SpanOptions;
  streamResponseBody?: boolean;
  // (undocumented)
  timeout: number;
  // (undocumented)
  url: string;
  validateRequestProperties(): void;
  // (undocumented)
  withCredentials: boolean;
}

// (No @packagedocumentation comment for this package)
