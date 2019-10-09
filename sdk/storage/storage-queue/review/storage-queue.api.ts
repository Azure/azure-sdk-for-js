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
export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;

// @public
export function generateQueueSASQueryParameters(queueSASSignatureValues: QueueSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;

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
class MessageIdClient extends StorageClient {
  constructor(connectionString: string, queueName: string, messageId: string, options?: NewPipelineOptions);
  delete(popReceipt: string, options?: MessageIdDeleteOptions): Promise<Models.MessageIdDeleteResponse>;
  // (undocumented)
  readonly messageId: string;
  // (undocumented)
  readonly queueName: string;
  update(popReceipt: string, message: string, visibilityTimeout?: number, options?: MessageIdUpdateOptions): Promise<Models.MessageIdUpdateResponse>;
}

// @public
interface MessageIdDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface MessageIdUpdateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface MessagesClearOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
class MessagesClient extends StorageClient {
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  clear(options?: MessagesClearOptions): Promise<Models.MessagesClearResponse>;
  dequeue(options?: MessagesDequeueOptions): Promise<MessagesDequeueResponse>;
  enqueue(messageText: string, options?: MessagesEnqueueOptions): Promise<MessagesEnqueueResponse>;
  getMessageIdClient(messageId: string): MessageIdClient;
  peek(options?: MessagesPeekOptions): Promise<MessagesPeekResponse>;
  // (undocumented)
  readonly queueName: string;
}

// @public
interface MessagesDequeueOptions extends Models.MessagesDequeueOptionalParams, CommonOptions {
}

// @public
interface MessagesEnqueueOptions extends Models.MessagesEnqueueOptionalParams, CommonOptions {
}

// @public
interface MessagesPeekOptions extends Models.MessagesPeekOptionalParams, CommonOptions {
}

// @public (undocumented)

// @public
export function newPipeline(credential: SharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: NewPipelineOptions): Pipeline;

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
class QueueClient extends StorageClient {
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  create(options?: QueueCreateOptions): Promise<Models.QueueCreateResponse>;
  delete(options?: QueueDeleteOptions): Promise<Models.QueueDeleteResponse>;
  getAccessPolicy(options?: QueueGetAccessPolicyOptions): Promise<QueueGetAccessPolicyResponse>;
  getMessagesClient(): MessagesClient;
  getProperties(options?: QueueGetPropertiesOptions): Promise<Models.QueueGetPropertiesResponse>;
  // (undocumented)
  readonly queueName: string;
  setAccessPolicy(queueAcl?: SignedIdentifier[], options?: QueueSetAccessPolicyOptions): Promise<Models.QueueSetAccessPolicyResponse>;
  setMetadata(metadata?: Metadata, options?: QueueSetMetadataOptions): Promise<Models.QueueSetMetadataResponse>;
}

// @public
interface QueueCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
}

// @public
interface QueueDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface QueueGetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface QueueGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
class QueueSASPermissions {
  add: boolean;
  static parse(permissions: string): QueueSASPermissions;
  process: boolean;
  read: boolean;
  toString(): string;
  update: boolean;
}

// @public
interface QueueSASSignatureValues {
  expiryTime?: Date;
  identifier?: string;
  ipRange?: IPRange;
  permissions?: string;
  protocol?: SASProtocol;
  queueName: string;
  startTime?: Date;
  version?: string;
}

// @public
class QueueServiceClient extends StorageClient {
  constructor(url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions);
  static fromConnectionString(connectionString: string, options?: NewPipelineOptions): QueueServiceClient;
  getProperties(options?: ServiceGetPropertiesOptions): Promise<Models.ServiceGetPropertiesResponse>;
  getQueueClient(queueName: string): QueueClient;
  getStatistics(options?: ServiceGetStatisticsOptions): Promise<Models.ServiceGetStatisticsResponse>;
  listQueues(options?: ServiceListQueuesOptions): PagedAsyncIterableIterator<Models.QueueItem, Models.ServiceListQueuesSegmentResponse>;
  setProperties(properties: Models.QueueServiceProperties, options?: ServiceGetPropertiesOptions): Promise<Models.ServiceSetPropertiesResponse>;
}

// @public
interface QueueSetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface QueueSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
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
  readonly secondaryHost?: string;
  readonly tryTimeoutInMs?: number;
}

// @public
class RetryPolicyFactory implements RequestPolicyFactory {
  constructor(retryOptions?: RetryOptions);
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
  constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startTime?: Date, expiryTime?: Date, ipRange?: IPRange, identifier?: string, resource?: string);
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
interface ServiceGetStatisticsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceListQueuesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  includeMetadata?: boolean;
  prefix?: string;
}

// @public
interface ServiceSetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
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
