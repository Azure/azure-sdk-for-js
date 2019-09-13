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
interface AppendBlobAppendBlockFromURLOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: AppendBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  sourceContentCrc64?: Uint8Array;
  sourceContentMD5?: Uint8Array;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface AppendBlobAppendBlockOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: AppendBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentCrc64?: Uint8Array;
  transactionalContentMD5?: Uint8Array;
}

// @public
class AppendBlobClient extends BlobClient {
  constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
  // WARNING: The type "Models.AppendBlobAppendBlockResponse" needs to be exported by the package (e.g. added to index.ts)
  appendBlock(body: HttpRequestBody, contentLength: number, options?: AppendBlobAppendBlockOptions): Promise<Models.AppendBlobAppendBlockResponse>;
  // WARNING: The type "Models.AppendBlobAppendBlockFromUrlResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.AppendBlobAppendBlockFromUrlResponse" needs to be exported by the package (e.g. added to index.ts)
  appendBlockFromURL(sourceURL: string, sourceOffset: number, count: number, options?: AppendBlobAppendBlockFromURLOptions): Promise<Models.AppendBlobAppendBlockFromUrlResponse>;
  // WARNING: The type "Models.AppendBlobCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  create(options?: AppendBlobCreateOptions): Promise<Models.AppendBlobCreateResponse>;
  withSnapshot(snapshot: string): AppendBlobClient;
}

// @public
interface AppendBlobCreateOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  customerProvidedKey?: Models.CpkInfo;
  metadata?: Metadata;
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
class BatchDeleteRequest extends BatchRequest {
  constructor();
  addSubRequest(url: string, credential: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<void>;
}

// @public
class BatchRequest {
  constructor();
  // (undocumented)
  protected addSubRequestInternal(subRequest: BatchSubRequest, assembleSubRequestFunc: () => Promise<void>): Promise<void>;
  // (undocumented)
  protected readonly batch: string;
  // WARNING: The type "InnerBatchRequest" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  protected batchRequest: InnerBatchRequest;
  getHttpRequestBody(): string;
  getMultiPartContentType(): string;
  getSubRequests(): Map<number, BatchSubRequest>;
}

// @public
class BatchSetTierRequest extends BatchRequest {
  constructor();
  // WARNING: The type "Models.AccessTier" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.AccessTier" needs to be exported by the package (e.g. added to index.ts)
  addSubRequest(url: string, credential: SharedKeyCredential | AnonymousCredential | TokenCredential, tier: Models.AccessTier, options?: BlobSetTierOptions): Promise<void>;
}

// @public (undocumented)
interface BatchSubRequest {
  credential: SharedKeyCredential | AnonymousCredential | TokenCredential;
  url: string;
}

// @public (undocumented)
interface BatchSubResponse {
  _request: BatchSubRequest;
  bodyAsText?: string;
  errorCode?: string;
  headers: HttpHeaders;
  status: number;
  statusMessage: string;
}

// @public
interface BlobAbortCopyFromURLOptions {
  abortSignal?: AbortSignalLike;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

// @public
interface BlobAcquireLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface BlobBreakLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface BlobChangeLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
class BlobClient extends StorageClient {
  constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
  // WARNING: The type "Models.BlobAbortCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobAbortCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<Models.BlobAbortCopyFromURLResponse>;
  // WARNING: The type "Models.BlobCreateSnapshotResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobCreateSnapshotResponse" needs to be exported by the package (e.g. added to index.ts)
  createSnapshot(options?: BlobCreateSnapshotOptions): Promise<Models.BlobCreateSnapshotResponse>;
  // WARNING: The type "Models.BlobDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  delete(options?: BlobDeleteOptions): Promise<Models.BlobDeleteResponse>;
  // WARNING: The type "Models.BlobDownloadResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobDownloadResponse" needs to be exported by the package (e.g. added to index.ts)
  download(offset?: number, count?: number, options?: BlobDownloadOptions): Promise<Models.BlobDownloadResponse>;
  downloadToBuffer(buffer: Buffer, offset: number, count?: number, options?: DownloadFromBlobOptions): Promise<void>;
  // WARNING: The type "Models.BlobDownloadResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobDownloadResponse" needs to be exported by the package (e.g. added to index.ts)
  downloadToFile(filePath: string, offset?: number, count?: number, options?: BlobDownloadOptions): Promise<Models.BlobDownloadResponse>;
  getAppendBlobClient(): AppendBlobClient;
  getBlockBlobClient(): BlockBlobClient;
  getLeaseClient(proposeLeaseId?: string): LeaseClient;
  getPageBlobClient(): PageBlobClient;
  // WARNING: The type "Models.BlobGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  getProperties(options?: BlobGetPropertiesOptions): Promise<Models.BlobGetPropertiesResponse>;
  // WARNING: The type "Models.BlobHTTPHeaders" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobSetHTTPHeadersResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobHTTPHeaders" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobSetHTTPHeadersResponse" needs to be exported by the package (e.g. added to index.ts)
  setHTTPHeaders(blobHTTPHeaders?: Models.BlobHTTPHeaders, options?: BlobSetHTTPHeadersOptions): Promise<Models.BlobSetHTTPHeadersResponse>;
  // WARNING: The type "Metadata" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobSetMetadataResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Metadata" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobSetMetadataResponse" needs to be exported by the package (e.g. added to index.ts)
  setMetadata(metadata?: Metadata, options?: BlobSetMetadataOptions): Promise<Models.BlobSetMetadataResponse>;
  // WARNING: The type "Models.BlobSetTierResponse" needs to be exported by the package (e.g. added to index.ts)
  setTier(tier: BlockBlobTier | PremiumPageBlobTier | string, options?: BlobSetTierOptions): Promise<Models.BlobSetTierResponse>;
  // WARNING: The type "Models.BlobStartCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobStartCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  startCopyFromURL(copySource: string, options?: BlobStartCopyFromURLOptions): Promise<Models.BlobStartCopyFromURLResponse>;
  // WARNING: The type "Models.BlobCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobCopyFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  syncCopyFromURL(copySource: string, options?: BlobSyncCopyFromURLOptions): Promise<Models.BlobCopyFromURLResponse>;
  // WARNING: The type "Models.BlobUndeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobUndeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  undelete(options?: BlobUndeleteOptions): Promise<Models.BlobUndeleteResponse>;
  withSnapshot(snapshot: string): BlobClient;
}

// @public
interface BlobCreateSnapshotOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  metadata?: Metadata;
}

// @public
interface BlobDeleteOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

// @public
interface BlobDownloadOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  maxRetryRequests?: number;
  progress?: (progress: TransferProgressEvent) => void;
  rangeGetContentCrc64?: boolean;
  rangeGetContentMD5?: boolean;
  snapshot?: string;
}

// @public
interface BlobGetPropertiesOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

// @public
interface BlobReleaseLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface BlobRenewLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
class BlobSASPermissions {
  add: boolean;
  create: boolean;
  delete: boolean;
  static parse(permissions: string): BlobSASPermissions;
  read: boolean;
  toString(): string;
  write: boolean;
}

// @public
interface BlobSASSignatureValues {
  blobName?: string;
  cacheControl?: string;
  containerName: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentType?: string;
  expiryTime?: Date;
  identifier?: string;
  ipRange?: IPRange;
  permissions?: string;
  protocol?: SASProtocol;
  snapshotTime?: string;
  startTime?: Date;
  version?: string;
}

// @public
class BlobServiceClient extends StorageClient {
  constructor(url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions);
  // WARNING: The type "Models.ContainerCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
          containerClient: ContainerClient;
          containerCreateResponse: Models.ContainerCreateResponse;
      }>;
  // WARNING: The type "Models.ContainerDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  deleteContainer(containerName: string, options?: ContainerDeleteMethodOptions): Promise<Models.ContainerDeleteResponse>;
  static fromConnectionString(connectionString: string, options?: NewPipelineOptions): BlobServiceClient;
  // WARNING: The type "Models.ServiceGetAccountInfoResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceGetAccountInfoResponse" needs to be exported by the package (e.g. added to index.ts)
  getAccountInfo(options?: ServiceGetAccountInfoOptions): Promise<Models.ServiceGetAccountInfoResponse>;
  getContainerClient(containerName: string): ContainerClient;
  // WARNING: The type "Models.ServiceGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  getProperties(options?: ServiceGetPropertiesOptions): Promise<Models.ServiceGetPropertiesResponse>;
  // WARNING: The type "Models.ServiceGetStatisticsResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceGetStatisticsResponse" needs to be exported by the package (e.g. added to index.ts)
  getStatistics(options?: ServiceGetStatisticsOptions): Promise<Models.ServiceGetStatisticsResponse>;
  getUserDelegationKey(start: Date, expiry: Date, options?: ServiceGetUserDelegationKeyOptions): Promise<ServiceGetUserDelegationKeyResponse>;
  // WARNING: The type "Models.ContainerItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceListContainersSegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceListContainersSegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  listContainers(options?: ServiceListContainersOptions): PagedAsyncIterableIterator<Models.ContainerItem, Models.ServiceListContainersSegmentResponse>;
  // WARNING: The type "Models.StorageServiceProperties" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceSetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.StorageServiceProperties" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ServiceSetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  setProperties(properties: Models.StorageServiceProperties, options?: ServiceSetPropertiesOptions): Promise<Models.ServiceSetPropertiesResponse>;
  submitBatch(batchRequest: BatchRequest, options?: ServiceSubmitBatchOptionalParams): Promise<ServiceSubmitBatchResponse>;
}

// @public
interface BlobSetHTTPHeadersOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

// @public
interface BlobSetMetadataOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

// @public
interface BlobSetTierOptions {
  abortSignal?: AbortSignalLike;
  leaseAccessConditions?: Models.LeaseAccessConditions;
  rehydratePriority?: Models.RehydratePriority;
}

// @public
interface BlobStartCopyFromURLOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  metadata?: Metadata;
  rehydratePriority?: Models.RehydratePriority;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
}

// @public
interface BlobSyncCopyFromURLOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  metadata?: Metadata;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface BlobUndeleteOptions {
  abortSignal?: AbortSignalLike;
  customerProvidedKey?: Models.CpkInfo;
}

// @public
class BlockBlobClient extends BlobClient {
  constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
  // WARNING: The type "Models.BlockBlobCommitBlockListResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobCommitBlockListResponse" needs to be exported by the package (e.g. added to index.ts)
  commitBlockList(blocks: string[], options?: BlockBlobCommitBlockListOptions): Promise<Models.BlockBlobCommitBlockListResponse>;
  // WARNING: The type "Models.BlockListType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobGetBlockListResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockListType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobGetBlockListResponse" needs to be exported by the package (e.g. added to index.ts)
  getBlockList(listType: Models.BlockListType, options?: BlockBlobGetBlockListOptions): Promise<Models.BlockBlobGetBlockListResponse>;
  // WARNING: The type "Models.BlockBlobStageBlockResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobStageBlockResponse" needs to be exported by the package (e.g. added to index.ts)
  stageBlock(blockId: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobStageBlockOptions): Promise<Models.BlockBlobStageBlockResponse>;
  // WARNING: The type "Models.BlockBlobStageBlockFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobStageBlockFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  stageBlockFromURL(blockId: string, sourceURL: string, offset?: number, count?: number, options?: BlockBlobStageBlockFromURLOptions): Promise<Models.BlockBlobStageBlockFromURLResponse>;
  // WARNING: The type "Models.BlockBlobUploadResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobUploadResponse" needs to be exported by the package (e.g. added to index.ts)
  upload(body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<Models.BlockBlobUploadResponse>;
  uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: UploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
  uploadFile(filePath: string, options?: UploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
  uploadStream(stream: Readable, bufferSize: number, maxBuffers: number, options?: UploadStreamToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
  withSnapshot(snapshot: string): BlockBlobClient;
}

// @public
interface BlockBlobCommitBlockListOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  // (undocumented)
  accessTier?: Models.AccessTier;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  customerProvidedKey?: Models.CpkInfo;
  metadata?: Metadata;
  // (undocumented)
  tier?: BlockBlobTier | string;
}

// @public
interface BlockBlobGetBlockListOptions {
  abortSignal?: AbortSignalLike;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

// @public
interface BlockBlobStageBlockFromURLOptions {
  abortSignal?: AbortSignalLike;
  customerProvidedKey?: Models.CpkInfo;
  leaseAccessConditions?: Models.LeaseAccessConditions;
  range?: Range;
  sourceContentCrc64?: Uint8Array;
  sourceContentMD5?: Uint8Array;
}

// @public
interface BlockBlobStageBlockOptions {
  abortSignal?: AbortSignalLike;
  customerProvidedKey?: Models.CpkInfo;
  leaseAccessConditions?: Models.LeaseAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentCrc64?: Uint8Array;
  transactionalContentMD5?: Uint8Array;
}

// @public (undocumented)
enum BlockBlobTier {
  // (undocumented)
  Archive = "Archive",
  // (undocumented)
  Cool = "Cool",
  // (undocumented)
  Hot = "Hot"
}

// @public
interface BlockBlobUploadOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  customerProvidedKey?: Models.CpkInfo;
  metadata?: Metadata;
  progress?: (progress: TransferProgressEvent) => void;
  tier?: BlockBlobTier | string;
}

// @public
class BrowserPolicyFactory implements RequestPolicyFactory {
  // WARNING: The type "BrowserPolicy" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "BrowserPolicy" needs to be exported by the package (e.g. added to index.ts)
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): BrowserPolicy;
}

// @public
interface ContainerAcquireLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface ContainerBreakLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface ContainerChangeLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
class ContainerClient extends StorageClient {
  constructor(connectionString: string, containerName: string, options?: NewPipelineOptions);
  // WARNING: The type "Models.ContainerCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  create(options?: ContainerCreateOptions): Promise<Models.ContainerCreateResponse>;
  // WARNING: The type "Models.ContainerDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  delete(options?: ContainerDeleteMethodOptions): Promise<Models.ContainerDeleteResponse>;
  // WARNING: The type "Models.BlobDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobDeleteResponse" needs to be exported by the package (e.g. added to index.ts)
  deleteBlob(blobName: string, options?: BlobDeleteOptions): Promise<Models.BlobDeleteResponse>;
  getAccessPolicy(options?: ContainerGetAccessPolicyOptions): Promise<ContainerGetAccessPolicyResponse>;
  getAppendBlobClient(blobName: string): AppendBlobClient;
  getBlobClient(blobName: string): BlobClient;
  getBlockBlobClient(blobName: string): BlockBlobClient;
  getLeaseClient(proposeLeaseId?: string): LeaseClient;
  getPageBlobClient(blobName: string): PageBlobClient;
  // WARNING: The type "Models.ContainerGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerGetPropertiesResponse" needs to be exported by the package (e.g. added to index.ts)
  getProperties(options?: ContainerGetPropertiesOptions): Promise<Models.ContainerGetPropertiesResponse>;
  // WARNING: The type "Models.BlobPrefix" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "*     Models.ContainerListBlobHierarchySegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobPrefix" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerListBlobHierarchySegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  listBlobsByHierarchy(delimiter: string, options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<{
          kind: "prefix";
      } & Models.BlobPrefix | {
          kind: "blob";
      } & Models.BlobItem, Models.ContainerListBlobHierarchySegmentResponse>;
  // WARNING: The type "Models.BlobItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerListBlobFlatSegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlobItem" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerListBlobFlatSegmentResponse" needs to be exported by the package (e.g. added to index.ts)
  listBlobsFlat(options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<Models.BlobItem, Models.ContainerListBlobFlatSegmentResponse>;
  // WARNING: The type "Models.PublicAccessType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerSetAccessPolicyResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PublicAccessType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerSetAccessPolicyResponse" needs to be exported by the package (e.g. added to index.ts)
  setAccessPolicy(access?: Models.PublicAccessType, containerAcl?: SignedIdentifier[], options?: ContainerSetAccessPolicyOptions): Promise<Models.ContainerSetAccessPolicyResponse>;
  // WARNING: The type "Metadata" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerSetMetadataResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Metadata" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.ContainerSetMetadataResponse" needs to be exported by the package (e.g. added to index.ts)
  setMetadata(metadata?: Metadata, options?: ContainerSetMetadataOptions): Promise<Models.ContainerSetMetadataResponse>;
  // WARNING: The type "Models.BlockBlobUploadResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.BlockBlobUploadResponse" needs to be exported by the package (e.g. added to index.ts)
  uploadBlockBlob(blobName: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<{
          blockBlobClient: BlockBlobClient;
          response: Models.BlockBlobUploadResponse;
      }>;
}

// @public
interface ContainerCreateOptions {
  abortSignal?: AbortSignalLike;
  access?: Models.PublicAccessType;
  metadata?: Metadata;
}

// @public
interface ContainerDeleteMethodOptions {
  abortSignal?: AbortSignalLike;
  containerAccessConditions?: ContainerAccessConditions;
}

// @public
interface ContainerGetAccessPolicyOptions {
  abortSignal?: AbortSignalLike;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

// @public
interface ContainerGetPropertiesOptions {
  abortSignal?: AbortSignalLike;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

// @public
interface ContainerListBlobsOptions {
  abortSignal?: AbortSignalLike;
  include?: Models.ListBlobsIncludeItem[];
  prefix?: string;
}

// @public
interface ContainerReleaseLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface ContainerRenewLeaseOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
class ContainerSASPermissions {
  add: boolean;
  create: boolean;
  delete: boolean;
  list: boolean;
  static parse(permissions: string): ContainerSASPermissions;
  read: boolean;
  toString(): string;
  write: boolean;
}

// @public
interface ContainerSetAccessPolicyOptions {
  abortSignal?: AbortSignalLike;
  containerAccessConditions?: ContainerAccessConditions;
}

// @public
interface ContainerSetMetadataOptions {
  abortSignal?: AbortSignalLike;
  containerAccessConditions?: ContainerAccessConditions;
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
interface DownloadFromBlobOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  blockSize?: number;
  maxRetryRequestsPerBlock?: number;
  parallelism?: number;
  progress?: (progress: TransferProgressEvent) => void;
}

// @public
export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;

// @public
export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;

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

// @public (undocumented)
interface Lease {
  date?: Date;
  errorCode?: string;
  eTag?: string;
  lastModified?: Date;
  leaseId?: string;
  leaseTime?: number;
  requestId?: string;
  version?: string;
}

// @public
class LeaseClient {
  constructor(client: ContainerClient | BlobClient, leaseId?: string);
  acquireLease(duration: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
  breakLease(breakPeriod: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
  chanageLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
  readonly leaseId: string;
  releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
  renewLease(options?: LeaseOperationOptions): Promise<Lease>;
  readonly url: string;
}

// @public
interface LeaseOperationOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
class LoggingPolicyFactory implements RequestPolicyFactory {
  constructor(loggingOptions?: RequestLogOptions);
  // WARNING: The type "LoggingPolicy" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): LoggingPolicy;
}

// WARNING: Unsupported export "KeyInfo" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "UserDelegationKey" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StorageError" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DataLakeStorageErrorError" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DataLakeStorageError" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AccessPolicy" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobProperties" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobMetadata" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobItem" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobFlatListSegment" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ListBlobsFlatSegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobPrefix" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobHierarchyListSegment" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ListBlobsHierarchySegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "Block" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockList" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockLookupList" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerProperties" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerItem" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ListContainersSegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "CorsRule" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "GeoReplication" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "RetentionPolicy" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "Logging" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "Metrics" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageRange" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ClearRange" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageList" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SignedIdentifier" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StaticWebsite" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StorageServiceProperties" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StorageServiceStats" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "LeaseAccessConditions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ModifiedAccessConditions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryHttpHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SourceModifiedAccessConditions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "CpkInfo" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobHTTPHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SequenceNumberAccessConditions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendPositionAccessConditions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StorageClientOptions" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSetPropertiesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetPropertiesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetStatisticsOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceListContainersSegmentOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetUserDelegationKeyOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSubmitBatchOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerCreateOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetPropertiesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerDeleteMethodOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetMetadataOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetAccessPolicyOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetAccessPolicyOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerAcquireLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerReleaseLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerRenewLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerBreakLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerChangeLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobFlatSegmentOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobHierarchySegmentOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryCreateOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryRenameOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryDeleteMethodOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectorySetAccessControlOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryGetAccessControlOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDownloadOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetPropertiesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDeleteMethodOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetAccessControlOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetAccessControlOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenameOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobUndeleteOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetHTTPHeadersOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetMetadataOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAcquireLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobReleaseLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenewLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobChangeLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobBreakLeaseOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCreateSnapshotOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobStartCopyFromURLOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCopyFromURLOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAbortCopyFromURLOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetTierOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCreateOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobClearPagesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesFromURLOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesDiffOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobResizeOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUpdateSequenceNumberOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCopyIncrementalOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobCreateOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockFromUrlOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobUploadOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockFromURLOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobCommitBlockListOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobGetBlockListOptionalParams" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSetPropertiesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetPropertiesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetStatisticsHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceListContainersSegmentHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetUserDelegationKeyHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetAccountInfoHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSubmitBatchHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerCreateHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetPropertiesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerDeleteHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetMetadataHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetAccessPolicyHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetAccessPolicyHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerAcquireLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerReleaseLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerRenewLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerBreakLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerChangeLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobFlatSegmentHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobHierarchySegmentHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetAccountInfoHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryCreateHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryRenameHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryDeleteHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectorySetAccessControlHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryGetAccessControlHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDownloadHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetPropertiesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDeleteHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetAccessControlHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetAccessControlHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenameHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCreateHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobCreateHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobUploadHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobUndeleteHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetHTTPHeadersHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetMetadataHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAcquireLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobReleaseLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenewLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobChangeLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobBreakLeaseHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCreateSnapshotHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobStartCopyFromURLHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCopyFromURLHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAbortCopyFromURLHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetTierHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetAccountInfoHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockFromURLHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobCommitBlockListHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobGetBlockListHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobClearPagesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesFromURLHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesDiffHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobResizeHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUpdateSequenceNumberHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCopyIncrementalHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockFromUrlHeaders" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PublicAccessType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "CopyStatusType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "LeaseDurationType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "LeaseStateType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "LeaseStatusType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AccessTier" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ArchiveStatus" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "StorageErrorCode" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "GeoReplicationStatusType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "RehydratePriority" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockListType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DeleteSnapshotsOptionType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "EncryptionAlgorithmType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ListBlobsIncludeItem" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ListContainersIncludeType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PathRenameMode" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SequenceNumberActionType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SkuName" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AccountKind" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "SyncCopyStatusType" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSetPropertiesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetPropertiesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetStatisticsResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceListContainersSegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetUserDelegationKeyResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceGetAccountInfoResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ServiceSubmitBatchResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerCreateResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetPropertiesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerDeleteResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetMetadataResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetAccessPolicyResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerSetAccessPolicyResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerAcquireLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerReleaseLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerRenewLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerBreakLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerChangeLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobFlatSegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerListBlobHierarchySegmentResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "ContainerGetAccountInfoResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryCreateResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryRenameResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryDeleteResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectorySetAccessControlResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "DirectoryGetAccessControlResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDownloadResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetPropertiesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobDeleteResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetAccessControlResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetAccessControlResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenameResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobUndeleteResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetHTTPHeadersResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetMetadataResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAcquireLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobReleaseLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobRenewLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobChangeLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobBreakLeaseResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCreateSnapshotResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobStartCopyFromURLResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobCopyFromURLResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobAbortCopyFromURLResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobSetTierResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlobGetAccountInfoResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCreateResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobClearPagesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUploadPagesFromURLResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobGetPageRangesDiffResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobResizeResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobUpdateSequenceNumberResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "PageBlobCopyIncrementalResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobCreateResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "AppendBlobAppendBlockFromUrlResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobUploadResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobStageBlockFromURLResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobCommitBlockListResponse" Currently the "namespace" block only supports constant variables.
// WARNING: Unsupported export "BlockBlobGetBlockListResponse" Currently the "namespace" block only supports constant variables.
// @public (undocumented)
module Models {
}

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
interface PageBlobClearPagesOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: PageBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

// @public
class PageBlobClient extends BlobClient {
  constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
  // WARNING: The type "Models.PageBlobClearPagesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobClearPagesResponse" needs to be exported by the package (e.g. added to index.ts)
  clearPages(offset?: number, count?: number, options?: PageBlobClearPagesOptions): Promise<Models.PageBlobClearPagesResponse>;
  // WARNING: The type "Models.PageBlobCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobCreateResponse" needs to be exported by the package (e.g. added to index.ts)
  create(size: number, options?: PageBlobCreateOptions): Promise<Models.PageBlobCreateResponse>;
  // WARNING: The type "Models.PageBlobGetPageRangesResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobGetPageRangesResponse" needs to be exported by the package (e.g. added to index.ts)
  getPageRanges(offset?: number, count?: number, options?: PageBlobGetPageRangesOptions): Promise<Models.PageBlobGetPageRangesResponse>;
  // WARNING: The type "Models.PageBlobGetPageRangesDiffResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobGetPageRangesDiffResponse" needs to be exported by the package (e.g. added to index.ts)
  getPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobGetPageRangesDiffOptions): Promise<Models.PageBlobGetPageRangesDiffResponse>;
  // WARNING: The type "Models.PageBlobResizeResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobResizeResponse" needs to be exported by the package (e.g. added to index.ts)
  resize(size: number, options?: PageBlobResizeOptions): Promise<Models.PageBlobResizeResponse>;
  // WARNING: The type "Models.PageBlobCopyIncrementalResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobCopyIncrementalResponse" needs to be exported by the package (e.g. added to index.ts)
  startCopyIncremental(copySource: string, options?: PageBlobStartCopyIncrementalOptions): Promise<Models.PageBlobCopyIncrementalResponse>;
  // WARNING: The type "Models.SequenceNumberActionType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobUpdateSequenceNumberResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.SequenceNumberActionType" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobUpdateSequenceNumberResponse" needs to be exported by the package (e.g. added to index.ts)
  updateSequenceNumber(sequenceNumberAction: Models.SequenceNumberActionType, sequenceNumber?: number, options?: PageBlobUpdateSequenceNumberOptions): Promise<Models.PageBlobUpdateSequenceNumberResponse>;
  // WARNING: The type "Models.PageBlobUploadPagesResponse" needs to be exported by the package (e.g. added to index.ts)
  uploadPages(body: HttpRequestBody, offset: number, count: number, options?: PageBlobUploadPagesOptions): Promise<Models.PageBlobUploadPagesResponse>;
  // WARNING: The type "Models.PageBlobUploadPagesFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Models.PageBlobUploadPagesFromURLResponse" needs to be exported by the package (e.g. added to index.ts)
  uploadPagesFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: PageBlobUploadPagesFromURLOptions): Promise<Models.PageBlobUploadPagesFromURLResponse>;
  withSnapshot(snapshot: string): PageBlobClient;
}

// @public
interface PageBlobCreateOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  blobSequenceNumber?: number;
  customerProvidedKey?: Models.CpkInfo;
  metadata?: Metadata;
  tier?: PremiumPageBlobTier | string;
}

// @public
interface PageBlobGetPageRangesDiffOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  range?: string;
}

// @public
interface PageBlobGetPageRangesOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
}

// @public
interface PageBlobResizeOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
}

// @public
interface PageBlobStartCopyIncrementalOptions {
  abortSignal?: AbortSignalLike;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface PageBlobUpdateSequenceNumberOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
}

// @public (undocumented)
interface PageBlobUploadPagesFromURLOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: PageBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  sourceContentCrc64?: Uint8Array;
  sourceContentMD5?: Uint8Array;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

// @public
interface PageBlobUploadPagesOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: PageBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentCrc64?: Uint8Array;
  transactionalContentMD5?: Uint8Array;
}

// @public (undocumented)
interface ParsedBatchResponse {
  subResponses: BatchSubResponse[];
  subResponsesFailedCount: number;
  subResponsesSucceededCount: number;
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

// @public (undocumented)
enum PremiumPageBlobTier {
  // (undocumented)
  P10 = "P10",
  // (undocumented)
  P15 = "P15",
  // (undocumented)
  P20 = "P20",
  // (undocumented)
  P30 = "P30",
  // (undocumented)
  P4 = "P4",
  // (undocumented)
  P40 = "P40",
  // (undocumented)
  P50 = "P50",
  // (undocumented)
  P6 = "P6",
  // (undocumented)
  P60 = "P60",
  // (undocumented)
  P70 = "P70",
  // (undocumented)
  P80 = "P80"
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
  readonly secondaryHost?: string;
  readonly tryTimeoutInMs?: number;
}

// @public
class RetryPolicyFactory implements RequestPolicyFactory {
  constructor(retryOptions?: RetryOptions);
  // WARNING: The type "RetryPolicy" needs to be exported by the package (e.g. added to index.ts)
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
  constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startTime?: Date, expiryTime?: Date, ipRange?: IPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey);
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
interface ServiceGetAccountInfoOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceGetPropertiesOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceGetStatisticsOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceGetUserDelegationKeyOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceListContainersOptions {
  abortSignal?: AbortSignalLike;
  include?: ListContainersIncludeType;
  prefix?: string;
}

// @public
interface ServiceSetPropertiesOptions {
  abortSignal?: AbortSignalLike;
}

// @public
interface ServiceSubmitBatchOptionalParams extends Models.ServiceSubmitBatchOptionalParams {
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
    expiry?: Date;
    permission: string;
    start?: Date;
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
  // WARNING: The type "TelemetryPolicy" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "TelemetryPolicy" needs to be exported by the package (e.g. added to index.ts)
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): TelemetryPolicy;
}

// @public
class UniqueRequestIDPolicyFactory implements RequestPolicyFactory {
  // WARNING: The type "UniqueRequestIDPolicy" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "UniqueRequestIDPolicy" needs to be exported by the package (e.g. added to index.ts)
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): UniqueRequestIDPolicy;
}

// @public
interface UploadStreamToBlockBlobOptions {
  abortSignal?: AbortSignalLike;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: BlobHTTPHeaders;
  metadata?: {
    [propertyName: string]: string;
  }
  progress?: (progress: TransferProgressEvent) => void;
}

// @public
interface UploadToBlockBlobOptions {
  abortSignal?: AbortSignalLike;
  blobAccessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  blockSize?: number;
  maxSingleShotSize?: number;
  metadata?: {
    [propertyName: string]: string;
  }
  parallelism?: number;
  progress?: (progress: TransferProgressEvent) => void;
}

// @public (undocumented)
interface UserDelegationKey {
  signedExpiry: Date;
  signedOid: string;
  signedService: string;
  signedStart: Date;
  signedTid: string;
  signedVersion: string;
  value: string;
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
  spanOptions?: any;
  streamResponseBody?: boolean;
  // (undocumented)
  timeout: number;
  // (undocumented)
  url: string;
  validateRequestProperties(): void;
  // (undocumented)
  withCredentials: boolean;
}

// WARNING: Unsupported export: ServiceGetUserDelegationKeyResponse
// WARNING: Unsupported export: ServiceSubmitBatchResponse
// WARNING: Unsupported export: ContainerGetAccessPolicyResponse
// WARNING: Unsupported export: BlobUploadCommonResponse
// WARNING: Unsupported export: CredentialPolicyCreator
// WARNING: Unsupported export: LeaseOperationResponse
// WARNING: Unsupported export: HttpRequestBody
// WARNING: Unsupported export: RequestPolicyFactory
// (No @packagedocumentation comment for this package)
