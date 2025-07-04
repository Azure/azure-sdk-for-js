# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- import { StorageSharedKeyCredential } from '@azure/storage-blob';
+ import type { StorageSharedKeyCredential as StorageSharedKeyCredential_2 } from '@azure/storage-blob';
- import { StorageSharedKeyCredentialPolicy } from '@azure/storage-blob';
+ import type { TokenCredential } from '@azure/core-auth';
- import type { TokenCredential } from '@azure/core-auth';
+ import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
- import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
+ import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
- import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
+ import { UserDelegationKeyModel } from '@azure/storage-blob';
- import { UserDelegationKeyModel } from '@azure/storage-blob';
+ import { WebResourceLike as WebResource } from '@azure/core-http-compat';
- import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+ import type { WithResponse } from '@azure/storage-blob';
- import type { WithResponse } from '@azure/storage-blob';
+ 
- 
+ // @public
- // @public
+ export interface AccessControlChangeCounters {
- export interface AccessControlChangeCounters {
+     changedDirectoriesCount: number;
-     changedDirectoriesCount: number;
+     changedFilesCount: number;
-     changedFilesCount: number;
+     failedChangesCount: number;
-     failedChangesCount: number;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface AccessControlChangeError {
- export interface AccessControlChangeError {
+     isDirectory: boolean;
-     isDirectory: boolean;
+     message: string;
-     message: string;
+     name: string;
-     name: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface AccessControlChanges {
- export interface AccessControlChanges {
+     aggregateCounters: AccessControlChangeCounters;
-     aggregateCounters: AccessControlChangeCounters;
+     batchCounters: AccessControlChangeCounters;
-     batchCounters: AccessControlChangeCounters;
+     batchFailures: AccessControlChangeError[];
-     batchFailures: AccessControlChangeError[];
+     continuationToken?: string;
-     continuationToken?: string;
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export type AccessControlType = "user" | "group" | "mask" | "other";
- export type AccessControlType = "user" | "group" | "mask" | "other";
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export interface AccessPolicy {
- export interface AccessPolicy {
+     // (undocumented)
-     // (undocumented)
+     expiresOn?: Date;
-     expiresOn?: Date;
+     // (undocumented)
-     // (undocumented)
+     permissions: string;
-     permissions: string;
+     // (undocumented)
-     // (undocumented)
+     startsOn?: Date;
-     startsOn?: Date;
+ }
- }
+ 
- 
+ export { AnonymousCredential }
- // @public
+ 
- export class AccountSASPermissions {
+ export { AnonymousCredentialPolicy }
-     add: boolean;
+ 
-     create: boolean;
+ export { BaseRequestPolicy }
-     delete: boolean;
+ 
-     list: boolean;
+ // @public (undocumented)
-     static parse(permissions: string): AccountSASPermissions;
+ export interface BlobHierarchyListSegment {
-     process: boolean;
+     // (undocumented)
-     read: boolean;
+     blobItems: BlobItemModel[];
-     toString(): string;
+     // (undocumented)
-     update: boolean;
+     blobPrefixes?: BlobPrefix[];
-     write: boolean;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface BlobItemModel {
- export class AccountSASResourceTypes {
+     // (undocumented)
-     container: boolean;
+     deleted: boolean;
-     object: boolean;
+     // (undocumented)
-     static parse(resourceTypes: string): AccountSASResourceTypes;
+     deletionId?: string;
-     service: boolean;
+     // (undocumented)
-     toString(): string;
+     isCurrentVersion?: boolean;
- }
+     // (undocumented)
- 
+     name: string;
- // @public
+     properties: BlobPropertiesModel;
- export class AccountSASServices {
+     // (undocumented)
-     blob: boolean;
+     snapshot: string;
-     file: boolean;
+     // (undocumented)
-     static parse(services: string): AccountSASServices;
+     versionId?: string;
-     queue: boolean;
+ }
-     table: boolean;
+ 
-     toString(): string;
+ // @public (undocumented)
- }
+ export interface BlobPrefix {
- 
+     // (undocumented)
- // @public
+     name: string;
- export interface AccountSASSignatureValues {
+ }
-     encryptionScope?: string;
+ 
-     expiresOn: Date;
+ // @public
-     ipRange?: SasIPRange;
+ export interface BlobPropertiesModel {
-     permissions: AccountSASPermissions;
+     // (undocumented)
-     protocol?: SASProtocol;
+     accessTierChangeTime?: Date;
-     resourceTypes: string;
+     // (undocumented)
-     services: string;
+     accessTierInferred?: boolean;
-     startsOn?: Date;
+     // (undocumented)
-     version?: string;
+     blobSequenceNumber?: number;
- }
+     // (undocumented)
- 
+     cacheControl?: string;
- export { AnonymousCredential }
+     // (undocumented)
- 
+     contentDisposition?: string;
- export { AnonymousCredentialPolicy }
+     // (undocumented)
- 
+     contentEncoding?: string;
- export { BaseRequestPolicy }
+     // (undocumented)
- 
+     contentLanguage?: string;
- // @public (undocumented)
+     contentLength?: number;
- export interface BlobHierarchyListSegment {
+     // (undocumented)
-     // (undocumented)
+     contentMD5?: Uint8Array;
-     blobItems: BlobItemModel[];
+     // (undocumented)
-     // (undocumented)
+     contentType?: string;
-     blobPrefixes?: BlobPrefix[];
+     // (undocumented)
- }
+     copyCompletionTime?: Date;
- 
+     // (undocumented)
- // @public
+     copyId?: string;
- export interface BlobItemModel {
+     // (undocumented)
-     // (undocumented)
+     copyProgress?: string;
-     deleted: boolean;
+     // (undocumented)
-     // (undocumented)
+     copySource?: string;
-     deletionId?: string;
+     // (undocumented)
-     // (undocumented)
+     copyStatusDescription?: string;
-     isCurrentVersion?: boolean;
+     // (undocumented)
-     // (undocumented)
+     creationTime?: Date;
-     name: string;
+     // (undocumented)
-     properties: BlobPropertiesModel;
+     customerProvidedKeySha256?: string;
-     snapshot: string;
+     deletedTime?: Date;
-     versionId?: string;
+     destinationSnapshot?: string;
- }
+     encryptionScope?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     etag: string;
- export interface BlobPrefix {
+     // (undocumented)
-     // (undocumented)
+     expiresOn?: Date;
-     name: string;
+     // (undocumented)
- }
+     incrementalCopy?: boolean;
- 
+     // (undocumented)
- // @public
+     lastAccessedOn?: Date;
- export interface BlobPropertiesModel {
+     // (undocumented)
-     // (undocumented)
+     lastModified: Date;
-     accessTierChangeTime?: Date;
+     // (undocumented)
-     // (undocumented)
+     remainingRetentionDays?: number;
-     accessTierInferred?: boolean;
+     // (undocumented)
-     // (undocumented)
+     sealed?: boolean;
-     blobSequenceNumber?: number;
+     // (undocumented)
-     // (undocumented)
+     serverEncrypted?: boolean;
-     cacheControl?: string;
+     // (undocumented)
-     // (undocumented)
+     tagCount?: number;
-     contentDisposition?: string;
+ }
-     // (undocumented)
+ 
-     contentEncoding?: string;
+ // @public
-     // (undocumented)
+ export interface CommonGenerateSasUrlOptions {
-     contentLanguage?: string;
+     cacheControl?: string;
-     contentLength?: number;
+     contentDisposition?: string;
-     // (undocumented)
+     contentEncoding?: string;
-     contentMD5?: Uint8Array;
+     contentLanguage?: string;
-     // (undocumented)
+     contentType?: string;
-     contentType?: string;
+     encryptionScope?: string;
-     // (undocumented)
+     expiresOn?: Date;
-     copyCompletionTime?: Date;
+     identifier?: string;
-     // (undocumented)
+     // Warning: (ae-forgotten-export) The symbol "SasIPRange" needs to be exported by the entry point index.d.ts
-     copyId?: string;
+     ipRange?: SasIPRange;
-     // (undocumented)
+     // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
-     copyProgress?: string;
+     protocol?: SASProtocol;
-     // (undocumented)
+     startsOn?: Date;
-     copySource?: string;
+     version?: string;
-     // (undocumented)
+ }
-     copyStatusDescription?: string;
+ 
-     // (undocumented)
+ // @public
-     creationTime?: Date;
+ export interface CommonOptions {
-     customerProvidedKeySha256?: string;
+     tracingOptions?: OperationTracingOptions;
-     // (undocumented)
+ }
-     deletedTime?: Date;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     destinationSnapshot?: string;
+ export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
-     encryptionScope?: string;
+ 
-     // (undocumented)
+ // @public
-     etag: string;
+ export interface CpkInfo {
-     // (undocumented)
+     encryptionAlgorithm?: EncryptionAlgorithmType;
-     expiresOn?: Date;
+     encryptionKey?: string;
-     // (undocumented)
+     encryptionKeySha256?: string;
-     incrementalCopy?: boolean;
+ }
-     // (undocumented)
+ 
-     lastAccessedOn?: Date;
+ export { Credential_2 as Credential }
-     // (undocumented)
+ 
-     lastModified: Date;
+ export { CredentialPolicy }
-     // (undocumented)
+ 
-     remainingRetentionDays?: number;
+ // @public
-     // (undocumented)
+ export class DataLakeAclChangeFailedError extends Error {
-     sealed?: boolean;
+     constructor(error: RestError | Error, continuationToken?: string);
-     // (undocumented)
+     continuationToken?: string;
-     serverEncrypted?: boolean;
+     innerError: RestError | Error;
-     // (undocumented)
+ }
-     tagCount?: number;
+ 
- }
+ // @public
- 
+ export class DataLakeDirectoryClient extends DataLakePathClient {
- // @public
+     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
- export interface CommonGenerateSasUrlOptions {
+     create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
-     cacheControl?: string;
+     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
-     contentDisposition?: string;
+     createIfNotExists(options?: DirectoryCreateIfNotExistsOptions): Promise<DirectoryCreateIfNotExistsResponse>;
-     contentEncoding?: string;
+     generateSasStringToSign(options: DirectoryGenerateSasUrlOptions): string;
-     contentLanguage?: string;
+     generateSasUrl(options: DirectoryGenerateSasUrlOptions): Promise<string>;
-     contentType?: string;
+     generateUserDelegationSasStringToSign(options: DirectoryGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
-     encryptionScope?: string;
+     generateUserDelegationSasUrl(options: DirectoryGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
-     expiresOn?: Date;
+     getFileClient(fileName: string): DataLakeFileClient;
-     identifier?: string;
+     getSubdirectoryClient(subdirectoryName: string): DataLakeDirectoryClient;
-     ipRange?: SasIPRange;
+ }
-     protocol?: SASProtocol;
+ 
-     startsOn?: Date;
+ // @public
-     version?: string;
+ export class DataLakeFileClient extends DataLakePathClient {
- }
+     // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential" needs to be exported by the entry point index.d.ts
- 
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- // @public
+     constructor(url: string, pipeline: Pipeline);
- export interface CommonOptions {
+     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
-     // (undocumented)
+     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
-     tracingOptions?: OperationTracingOptions;
+     create(options?: FileCreateOptions): Promise<FileCreateResponse>;
- }
+     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
- 
+     createIfNotExists(options?: FileCreateIfNotExistsOptions): Promise<FileCreateIfNotExistsResponse>;
- // @public (undocumented)
+     flush(position: number, options?: FileFlushOptions): Promise<FileFlushResponse>;
- export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
+     generateSasStringToSign(options: FileGenerateSasUrlOptions): string;
- 
+     generateSasUrl(options: FileGenerateSasUrlOptions): Promise<string>;
- // @public
+     generateUserDelegationSasStringToSign(options: FileGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
- export interface CpkInfo {
+     generateUserDelegationSasUrl(options: FileGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
-     encryptionAlgorithm?: EncryptionAlgorithmType;
+     query(query: string, options?: FileQueryOptions): Promise<FileReadResponse>;
-     encryptionKey?: string;
+     read(offset?: number, count?: number, options?: FileReadOptions): Promise<FileReadResponse>;
-     encryptionKeySha256?: string;
+     readToBuffer(buffer: Buffer, offset?: number, count?: number, options?: FileReadToBufferOptions): Promise<Buffer>;
- }
+     readToBuffer(offset?: number, count?: number, options?: FileReadToBufferOptions): Promise<Buffer>;
- 
+     readToFile(filePath: string, offset?: number, count?: number, options?: FileReadOptions): Promise<FileReadResponse>;
- export { Credential_2 as Credential }
+     setExpiry(mode: FileExpiryMode, options?: FileSetExpiryOptions): Promise<FileSetExpiryResponse>;
- 
+     upload(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
- export { CredentialPolicy }
+     uploadFile(filePath: string, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
- 
+     uploadStream(stream: Readable, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
- // @public
+ }
- export class DataLakeAclChangeFailedError extends Error {
+ 
-     constructor(error: RestError | Error, continuationToken?: string);
+ // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
-     continuationToken?: string;
+ //
-     innerError: RestError | Error;
+ // @public
- }
+ export class DataLakeFileSystemClient extends StorageClient {
- 
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- // @public
+     constructor(url: string, pipeline: Pipeline);
- export class DataLakeDirectoryClient extends DataLakePathClient {
+     create(options?: FileSystemCreateOptions): Promise<FileSystemCreateResponse>;
-     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
+     createIfNotExists(options?: FileSystemCreateOptions): Promise<FileSystemCreateIfNotExistsResponse>;
-     create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
+     delete(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteResponse>;
-     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
+     deleteIfExists(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteIfExistsResponse>;
-     createIfNotExists(options?: DirectoryCreateIfNotExistsOptions): Promise<DirectoryCreateIfNotExistsResponse>;
+     exists(options?: FileSystemExistsOptions): Promise<boolean>;
-     generateSasStringToSign(options: DirectoryGenerateSasUrlOptions): string;
+     generateSasStringToSign(options: FileSystemGenerateSasUrlOptions): string;
-     generateSasUrl(options: DirectoryGenerateSasUrlOptions): Promise<string>;
+     generateSasUrl(options: FileSystemGenerateSasUrlOptions): Promise<string>;
-     generateUserDelegationSasStringToSign(options: DirectoryGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
+     generateUserDelegationSasStringToSign(options: FileSystemGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
-     generateUserDelegationSasUrl(options: DirectoryGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
+     generateUserDelegationSasUrl(options: FileSystemGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
-     getFileClient(fileName: string): DataLakeFileClient;
+     getAccessPolicy(options?: FileSystemGetAccessPolicyOptions): Promise<FileSystemGetAccessPolicyResponse>;
-     getSubdirectoryClient(subdirectoryName: string): DataLakeDirectoryClient;
+     getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient;
- }
+     getDirectoryClient(directoryName: string): DataLakeDirectoryClient;
- 
+     getFileClient(fileName: string): DataLakeFileClient;
- // @public
+     getProperties(options?: FileSystemGetPropertiesOptions): Promise<FileSystemGetPropertiesResponse>;
- export class DataLakeFileClient extends DataLakePathClient {
+     listDeletedPaths(options?: ListDeletedPathsOptions): PagedAsyncIterableIterator<DeletedPath, FileSystemListDeletedPathsResponse>;
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     listPaths(options?: ListPathsOptions): PagedAsyncIterableIterator<Path, FileSystemListPathsResponse>;
-     constructor(url: string, pipeline: Pipeline);
+     get name(): string;
-     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
+     setAccessPolicy(access?: PublicAccessType, fileSystemAcl?: SignedIdentifier<AccessPolicy>[], options?: FileSystemSetAccessPolicyOptions): Promise<FileSystemSetAccessPolicyResponse>;
-     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
+     setMetadata(metadata?: Metadata, options?: FileSystemSetMetadataOptions): Promise<FileSystemSetMetadataResponse>;
-     create(options?: FileCreateOptions): Promise<FileCreateResponse>;
+     undeletePath(deletedPath: string, deletionId: string, options?: FileSystemUndeletePathOption): Promise<FileSystemUndeletePathResponse>;
-     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
+ }
-     createIfNotExists(options?: FileCreateIfNotExistsOptions): Promise<FileCreateIfNotExistsResponse>;
+ 
-     flush(position: number, options?: FileFlushOptions): Promise<FileFlushResponse>;
+ // @public (undocumented)
-     generateSasStringToSign(options: FileGenerateSasUrlOptions): string;
+ export class DataLakeLeaseClient {
-     generateSasUrl(options: FileGenerateSasUrlOptions): Promise<string>;
+     constructor(client: BlobLeaseClient);
-     generateUserDelegationSasStringToSign(options: FileGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
+     // (undocumented)
-     generateUserDelegationSasUrl(options: FileGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
+     acquireLease(duration: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     query(query: string, options?: FileQueryOptions): Promise<FileReadResponse>;
+     // (undocumented)
-     read(offset?: number, count?: number, options?: FileReadOptions): Promise<FileReadResponse>;
+     breakLease(breakPeriod: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     readToBuffer(buffer: Buffer, offset?: number, count?: number, options?: FileReadToBufferOptions): Promise<Buffer>;
+     // (undocumented)
-     readToBuffer(offset?: number, count?: number, options?: FileReadToBufferOptions): Promise<Buffer>;
+     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     readToFile(filePath: string, offset?: number, count?: number, options?: FileReadOptions): Promise<FileReadResponse>;
+     // (undocumented)
-     setExpiry(mode: FileExpiryMode, options?: FileSetExpiryOptions): Promise<FileSetExpiryResponse>;
+     get leaseId(): string;
-     upload(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
+     // (undocumented)
-     uploadFile(filePath: string, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
+     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     uploadStream(stream: Readable, options?: FileParallelUploadOptions): Promise<FileUploadResponse>;
+     // (undocumented)
- }
+     renewLease(options?: LeaseOperationOptions): Promise<Lease>;
- 
+     // (undocumented)
- // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
+     get url(): string;
- //
+ }
- // @public
+ 
- export class DataLakeFileSystemClient extends StorageClient {
+ // @public
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ export class DataLakePathClient extends StorageClient {
-     constructor(url: string, pipeline: Pipeline);
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     create(options?: FileSystemCreateOptions): Promise<FileSystemCreateResponse>;
+     constructor(url: string, pipeline: Pipeline);
-     createIfNotExists(options?: FileSystemCreateOptions): Promise<FileSystemCreateIfNotExistsResponse>;
+     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
-     delete(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteResponse>;
+     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
-     deleteIfExists(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteIfExistsResponse>;
+     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
-     exists(options?: FileSystemExistsOptions): Promise<boolean>;
+     deleteIfExists(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteIfExistsResponse>;
-     generateSasStringToSign(options: FileSystemGenerateSasUrlOptions): string;
+     exists(options?: PathExistsOptions): Promise<boolean>;
-     generateSasUrl(options: FileSystemGenerateSasUrlOptions): Promise<string>;
+     get fileSystemName(): string;
-     generateUserDelegationSasStringToSign(options: FileSystemGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
+     getAccessControl(options?: PathGetAccessControlOptions): Promise<PathGetAccessControlResponse>;
-     generateUserDelegationSasUrl(options: FileSystemGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
+     getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient;
-     getAccessPolicy(options?: FileSystemGetAccessPolicyOptions): Promise<FileSystemGetAccessPolicyResponse>;
+     getProperties(options?: PathGetPropertiesOptions): Promise<PathGetPropertiesResponse>;
-     getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient;
+     move(destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;
-     getDirectoryClient(directoryName: string): DataLakeDirectoryClient;
+     move(destinationFileSystem: string, destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;
-     getFileClient(fileName: string): DataLakeFileClient;
+     get name(): string;
-     getProperties(options?: FileSystemGetPropertiesOptions): Promise<FileSystemGetPropertiesResponse>;
+     removeAccessControlRecursive(acl: RemovePathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
-     listDeletedPaths(options?: ListDeletedPathsOptions): PagedAsyncIterableIterator<DeletedPath, FileSystemListDeletedPathsResponse>;
+     setAccessControl(acl: PathAccessControlItem[], options?: PathSetAccessControlOptions): Promise<PathSetAccessControlResponse>;
-     listPaths(options?: ListPathsOptions): PagedAsyncIterableIterator<Path, FileSystemListPathsResponse>;
+     setAccessControlRecursive(acl: PathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
-     get name(): string;
+     setHttpHeaders(httpHeaders: PathHttpHeaders, options?: PathSetHttpHeadersOptions): Promise<PathSetHttpHeadersResponse>;
-     setAccessPolicy(access?: PublicAccessType, fileSystemAcl?: SignedIdentifier<AccessPolicy>[], options?: FileSystemSetAccessPolicyOptions): Promise<FileSystemSetAccessPolicyResponse>;
+     setMetadata(metadata?: Metadata, options?: PathSetMetadataOptions): Promise<PathSetMetadataResponse>;
-     setMetadata(metadata?: Metadata, options?: FileSystemSetMetadataOptions): Promise<FileSystemSetMetadataResponse>;
+     setPermissions(permissions: PathPermissions, options?: PathSetPermissionsOptions): Promise<PathSetPermissionsResponse>;
-     undeletePath(deletedPath: string, deletionId: string, options?: FileSystemUndeletePathOption): Promise<FileSystemUndeletePathResponse>;
+     toDirectoryClient(): DataLakeDirectoryClient;
- }
+     toFileClient(): DataLakeFileClient;
- 
+     updateAccessControlRecursive(acl: PathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
- // @public (undocumented)
+ }
- export class DataLakeLeaseClient {
+ 
-     constructor(client: BlobLeaseClient);
+ // @public (undocumented)
-     // (undocumented)
+ export interface DataLakeRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
-     acquireLease(duration: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+ }
-     // (undocumented)
+ 
-     breakLease(breakPeriod: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+ // @public
-     // (undocumented)
+ export class DataLakeServiceClient extends StorageClient {
-     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     // (undocumented)
+     constructor(url: string, pipeline: Pipeline);
-     get leaseId(): string;
+     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): DataLakeServiceClient;
-     // (undocumented)
+     // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
-     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     // (undocumented)
+     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     renewLease(options?: LeaseOperationOptions): Promise<Lease>;
+     getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient;
-     // (undocumented)
+     getProperties(options?: ServiceGetPropertiesOptions): Promise<DataLakeServiceGetPropertiesResponse>;
-     get url(): string;
+     getUserDelegationKey(startsOn: Date, expiresOn: Date, options?: ServiceGetUserDelegationKeyOptions): Promise<ServiceGetUserDelegationKeyResponse>;
- }
+     listFileSystems(options?: ServiceListFileSystemsOptions): PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse>;
- 
+     setProperties(properties: DataLakeServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
- // @public
+     undeleteFileSystem(deletedFileSystemName: string, deleteFileSystemVersion: string, options?: ServiceUndeleteFileSystemOptions): Promise<{
- export class DataLakePathClient extends StorageClient {
+         fileSystemClient: DataLakeFileSystemClient;
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+         fileSystemUndeleteResponse: FileSystemUndeleteResponse;
-     constructor(url: string, pipeline: Pipeline);
+     }>;
-     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
+ }
-     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
+ 
-     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
+ export { DataLakeServiceGetPropertiesResponse }
-     deleteIfExists(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteIfExistsResponse>;
+ 
-     exists(options?: PathExistsOptions): Promise<boolean>;
+ export { DataLakeServiceProperties }
-     get fileSystemName(): string;
+ 
-     getAccessControl(options?: PathGetAccessControlOptions): Promise<PathGetAccessControlResponse>;
+ // @public (undocumented)
-     getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient;
+ export interface DeletedPath {
-     getProperties(options?: PathGetPropertiesOptions): Promise<PathGetPropertiesResponse>;
+     // (undocumented)
-     move(destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;
+     deletedOn?: Date;
-     move(destinationFileSystem: string, destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;
+     // (undocumented)
-     get name(): string;
+     deletionId?: string;
-     removeAccessControlRecursive(acl: RemovePathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
+     // (undocumented)
-     setAccessControl(acl: PathAccessControlItem[], options?: PathSetAccessControlOptions): Promise<PathSetAccessControlResponse>;
+     name: string;
-     setAccessControlRecursive(acl: PathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
+     // (undocumented)
-     setHttpHeaders(httpHeaders: PathHttpHeaders, options?: PathSetHttpHeadersOptions): Promise<PathSetHttpHeadersResponse>;
+     remainingRetentionDays?: number;
-     setMetadata(metadata?: Metadata, options?: PathSetMetadataOptions): Promise<PathSetMetadataResponse>;
+ }
-     setPermissions(permissions: PathPermissions, options?: PathSetPermissionsOptions): Promise<PathSetPermissionsResponse>;
+ 
-     toDirectoryClient(): DataLakeDirectoryClient;
+ // @public (undocumented)
-     toFileClient(): DataLakeFileClient;
+ export interface DeletedPathList {
-     updateAccessControlRecursive(acl: PathAccessControlItem[], options?: PathChangeAccessControlRecursiveOptions): Promise<PathChangeAccessControlRecursiveResponse>;
+     // (undocumented)
- }
+     pathItems?: DeletedPath[];
- 
+ }
- // @public (undocumented)
+ 
- export interface DataLakeRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
+ // @public (undocumented)
- }
+ export interface DirectoryCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {
- 
+ }
- // @public
+ 
- export class DataLakeSASPermissions {
+ // @public (undocumented)
-     add: boolean;
+ export interface DirectoryCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {
-     create: boolean;
+ }
-     delete: boolean;
+ 
-     execute: boolean;
+ // @public
-     manageAccessControl: boolean;
+ export interface DirectoryCreateOptions extends PathCreateOptions {
-     manageOwnership: boolean;
+ }
-     move: boolean;
+ 
-     static parse(permissions: string): DataLakeSASPermissions;
+ // @public (undocumented)
-     read: boolean;
+ export interface DirectoryCreateResponse extends PathCreateResponse {
-     toString(): string;
+ }
-     write: boolean;
+ 
- }
+ // @public
- 
+ export interface DirectoryGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
- // @public
+     // Warning: (ae-forgotten-export) The symbol "DirectorySASPermissions" needs to be exported by the entry point index.d.ts
- export interface DataLakeSASSignatureValues {
+     permissions?: DirectorySASPermissions;
-     agentObjectId?: string;
+ }
-     cacheControl?: string;
+ 
-     contentDisposition?: string;
+ // @public
-     contentEncoding?: string;
+ export type EncryptionAlgorithmType = string;
-     contentLanguage?: string;
+ 
-     contentType?: string;
+ // @public (undocumented)
-     correlationId?: string;
+ export interface FileAppendOptions extends CommonOptions {
-     directoryDepth?: number;
+     // (undocumented)
-     encryptionScope?: string;
+     abortSignal?: AbortSignalLike;
-     expiresOn?: Date;
+     // (undocumented)
-     fileSystemName: string;
+     conditions?: LeaseAccessConditions;
-     identifier?: string;
+     customerProvidedKey?: CpkInfo;
-     ipRange?: SasIPRange;
+     flush?: boolean;
-     isDirectory?: boolean;
+     // Warning: (ae-forgotten-export) The symbol "LeaseAction" needs to be exported by the entry point index.d.ts
-     pathName?: string;
+     leaseAction?: LeaseAction;
-     permissions?: DataLakeSASPermissions | DirectorySASPermissions | FileSystemSASPermissions;
+     leaseDurationInSeconds?: number;
-     preauthorizedAgentObjectId?: string;
+     // (undocumented)
-     protocol?: SASProtocol;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     snapshotTime?: string;
+     proposedLeaseId?: string;
-     startsOn?: Date;
+     // (undocumented)
-     version?: string;
+     transactionalContentMD5?: Uint8Array;
- // @public
+ // @public (undocumented)
- export class DataLakeServiceClient extends StorageClient {
+ export type FileAppendResponse = WithResponse<PathAppendDataHeaders, PathAppendDataHeaders>;
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ 
-     constructor(url: string, pipeline: Pipeline);
+ // @public (undocumented)
-     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): DataLakeServiceClient;
+ export interface FileCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {
-     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ }
-     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ 
-     getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient;
+ // @public (undocumented)
-     getProperties(options?: ServiceGetPropertiesOptions): Promise<DataLakeServiceGetPropertiesResponse>;
+ export interface FileCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {
-     getUserDelegationKey(startsOn: Date, expiresOn: Date, options?: ServiceGetUserDelegationKeyOptions): Promise<ServiceGetUserDelegationKeyResponse>;
+ }
-     listFileSystems(options?: ServiceListFileSystemsOptions): PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse>;
+ 
-     setProperties(properties: DataLakeServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
+ // @public (undocumented)
-     undeleteFileSystem(deletedFileSystemName: string, deleteFileSystemVersion: string, options?: ServiceUndeleteFileSystemOptions): Promise<{
+ export interface FileCreateOptions extends PathCreateOptions {
-         fileSystemClient: DataLakeFileSystemClient;
+ }
-         fileSystemUndeleteResponse: FileSystemUndeleteResponse;
+ 
-     }>;
+ // @public (undocumented)
- }
+ export interface FileCreateResponse extends PathCreateResponse {
- 
+ }
- export { DataLakeServiceGetPropertiesResponse }
+ 
- 
+ // @public
- export { DataLakeServiceProperties }
+ export type FileExpiryMode = "NeverExpire" | "RelativeToCreation" | "RelativeToNow" | "Absolute";
- export interface DeletedPath {
+ export interface FileFlushOptions extends CommonOptions {
-     deletedOn?: Date;
+     abortSignal?: AbortSignalLike;
-     deletionId?: string;
+     close?: boolean;
-     name: string;
+     conditions?: DataLakeRequestConditions;
-     // (undocumented)
+     customerProvidedKey?: CpkInfo;
-     remainingRetentionDays?: number;
+     leaseAction?: LeaseAction;
- }
+     leaseDurationInSeconds?: number;
- 
+     // (undocumented)
- // @public (undocumented)
+     pathHttpHeaders?: PathHttpHeaders;
- export interface DeletedPathList {
+     proposedLeaseId?: string;
-     pathItems?: DeletedPath[];
+     retainUncommittedData?: boolean;
- export interface DirectoryCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {
+ export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
- }
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
- export interface DirectoryCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {
+     // Warning: (ae-forgotten-export) The symbol "DataLakeSASPermissions" needs to be exported by the entry point index.d.ts
- }
+     permissions?: DataLakeSASPermissions;
- 
+ }
- // @public
+ 
- export interface DirectoryCreateOptions extends PathCreateOptions {
+ // @public
- }
+ export interface FileParallelUploadOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public (undocumented)
+     chunkSize?: number;
- export interface DirectoryCreateResponse extends PathCreateResponse {
+     close?: boolean;
- }
+     conditions?: DataLakeRequestConditions;
- 
+     customerProvidedKey?: CpkInfo;
- // @public
+     encryptionContext?: string;
- export interface DirectoryGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     maxConcurrency?: number;
-     permissions?: DirectorySASPermissions;
+     metadata?: Metadata;
- }
+     onProgress?: (progress: TransferProgressEvent) => void;
- 
+     pathHttpHeaders?: PathHttpHeaders;
- // @public
+     permissions?: string;
- export class DirectorySASPermissions {
+     singleUploadThreshold?: number;
-     add: boolean;
+     umask?: string;
-     create: boolean;
+ }
-     delete: boolean;
+ 
-     execute: boolean;
+ // @public
-     list: boolean;
+ export type FileQueryArrowConfiguration = BlobQueryArrowConfiguration;
-     manageAccessControl: boolean;
+ 
-     manageOwnership: boolean;
+ // @public
-     move: boolean;
+ export interface FileQueryCsvTextConfiguration {
-     static parse(permissions: string): DirectorySASPermissions;
+     columnSeparator?: string;
-     read: boolean;
+     escapeCharacter?: string;
-     toString(): string;
+     fieldQuote?: string;
-     write: boolean;
+     hasHeaders?: boolean;
- }
+     kind: "csv";
- 
+     recordSeparator: string;
- // @public
+ }
- export type EncryptionAlgorithmType = string;
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface FileQueryError {
- export interface FileAppendOptions extends CommonOptions {
+     description: string;
-     // (undocumented)
+     isFatal: boolean;
-     abortSignal?: AbortSignalLike;
+     name: string;
-     // (undocumented)
+     position: number;
-     conditions?: LeaseAccessConditions;
+ }
-     customerProvidedKey?: CpkInfo;
+ 
-     flush?: boolean;
+ // @public
-     // Warning: (ae-forgotten-export) The symbol "LeaseAction" needs to be exported by the entry point index.d.ts
+ export interface FileQueryJsonTextConfiguration {
-     leaseAction?: LeaseAction;
+     kind: "json";
-     leaseDurationInSeconds?: number;
+     recordSeparator: string;
-     // (undocumented)
+ }
-     onProgress?: (progress: TransferProgressEvent) => void;
+ 
-     proposedLeaseId?: string;
+ // @public
-     // (undocumented)
+ export interface FileQueryOptions extends CommonOptions {
-     transactionalContentMD5?: Uint8Array;
+     abortSignal?: AbortSignalLike;
- }
+     conditions?: DataLakeRequestConditions;
- 
+     customerProvidedKey?: CpkInfo;
- // @public (undocumented)
+     inputTextConfiguration?: FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration | FileQueryParquetConfiguration;
- export type FileAppendResponse = WithResponse<PathAppendDataHeaders, PathAppendDataHeaders>;
+     onError?: (error: FileQueryError) => void;
- 
+     onProgress?: (progress: TransferProgressEvent) => void;
- // @public (undocumented)
+     outputTextConfiguration?: FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration | FileQueryArrowConfiguration;
- export interface FileCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {
+ }
- }
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface FileQueryParquetConfiguration {
- export interface FileCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {
+     kind: "parquet";
- export interface FileCreateOptions extends PathCreateOptions {
+ export interface FileReadHeaders {
- }
+     // (undocumented)
- 
+     acceptRanges?: string;
- // @public (undocumented)
+     acl: PathAccessControlItem[];
- export interface FileCreateResponse extends PathCreateResponse {
+     // (undocumented)
- }
+     cacheControl?: string;
- 
+     // (undocumented)
- // @public
+     clientRequestId?: string;
- export type FileExpiryMode = "NeverExpire" | "RelativeToCreation" | "RelativeToNow" | "Absolute";
+     // (undocumented)
- 
+     contentCrc64?: Uint8Array;
- // @public (undocumented)
+     // (undocumented)
- export interface FileFlushOptions extends CommonOptions {
+     contentDisposition?: string;
-     abortSignal?: AbortSignalLike;
+     contentEncoding?: string;
-     close?: boolean;
+     contentLanguage?: string;
-     conditions?: DataLakeRequestConditions;
+     contentLength?: number;
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
-     leaseAction?: LeaseAction;
+     contentMD5?: Uint8Array;
-     leaseDurationInSeconds?: number;
+     // (undocumented)
-     // (undocumented)
+     contentRange?: string;
-     pathHttpHeaders?: PathHttpHeaders;
+     // (undocumented)
-     proposedLeaseId?: string;
+     contentType?: string;
-     retainUncommittedData?: boolean;
+     copyCompletedOn?: Date;
- }
+     // (undocumented)
- 
+     copyId?: string;
- // @public (undocumented)
+     // (undocumented)
- export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
+     copyProgress?: string;
- 
+     // (undocumented)
- // @public
+     copySource?: string;
- export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     // (undocumented)
-     permissions?: DataLakeSASPermissions;
+     copyStatus?: CopyStatusType;
- }
+     // (undocumented)
- 
+     copyStatusDescription?: string;
- // @public
+     createdOn?: Date;
- export interface FileParallelUploadOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     date?: Date;
-     chunkSize?: number;
+     encryptionContext?: string;
-     close?: boolean;
+     // (undocumented)
-     conditions?: DataLakeRequestConditions;
+     encryptionKeySha256?: string;
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
-     encryptionContext?: string;
+     etag?: string;
-     maxConcurrency?: number;
+     // (undocumented)
-     metadata?: Metadata;
+     fileContentMD5?: Uint8Array;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     // (undocumented)
-     pathHttpHeaders?: PathHttpHeaders;
+     group?: string;
-     permissions?: string;
+     // (undocumented)
-     singleUploadThreshold?: number;
+     isServerEncrypted?: boolean;
-     umask?: string;
+     // (undocumented)
- }
+     lastModified?: Date;
- 
+     // (undocumented)
- // @public
+     leaseDuration?: LeaseDurationType;
- export type FileQueryArrowConfiguration = BlobQueryArrowConfiguration;
+     // (undocumented)
- 
+     leaseState?: LeaseStateType;
- // @public
+     // (undocumented)
- export interface FileQueryCsvTextConfiguration {
+     leaseStatus?: LeaseStatusType;
-     columnSeparator?: string;
+     // (undocumented)
-     escapeCharacter?: string;
+     metadata?: Metadata;
-     fieldQuote?: string;
+     // (undocumented)
-     hasHeaders?: boolean;
+     owner?: string;
-     kind: "csv";
+     // (undocumented)
-     recordSeparator: string;
+     permissions?: PathPermissions;
- }
+     // (undocumented)
- 
+     requestId?: string;
- // @public
+     // (undocumented)
- export interface FileQueryError {
+     version?: string;
-     description: string;
+ }
-     isFatal: boolean;
+ 
-     name: string;
+ // @public
-     position: number;
+ export interface FileReadOptions extends CommonOptions {
- }
+     // (undocumented)
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     // (undocumented)
- export interface FileQueryJsonTextConfiguration {
+     conditions?: DataLakeRequestConditions;
-     kind: "json";
+     customerProvidedKey?: CpkInfo;
-     recordSeparator: string;
+     // (undocumented)
- }
+     maxRetryRequests?: number;
- 
+     // (undocumented)
- // @public
+     onProgress?: (progress: TransferProgressEvent) => void;
- export interface FileQueryOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     rangeGetContentCrc64?: boolean;
-     conditions?: DataLakeRequestConditions;
+     // (undocumented)
-     customerProvidedKey?: CpkInfo;
+     rangeGetContentMD5?: boolean;
-     inputTextConfiguration?: FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration | FileQueryParquetConfiguration;
+ }
-     onError?: (error: FileQueryError) => void;
+ 
-     onProgress?: (progress: TransferProgressEvent) => void;
+ // @public (undocumented)
-     outputTextConfiguration?: FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration | FileQueryArrowConfiguration;
+ export type FileReadResponse = WithResponse<FileReadHeaders & {
- }
+     contentAsBlob?: Promise<Blob>;
- 
+     readableStreamBody?: NodeJS.ReadableStream;
- // @public
+ }, FileReadHeaders>;
- export interface FileQueryParquetConfiguration {
+ 
-     kind: "parquet";
+ // @public
- }
+ export interface FileReadToBufferOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public (undocumented)
+     chunkSize?: number;
- export interface FileReadHeaders {
+     concurrency?: number;
-     // (undocumented)
+     conditions?: DataLakeRequestConditions;
-     acceptRanges?: string;
+     customerProvidedKey?: CpkInfo;
-     acl: PathAccessControlItem[];
+     maxRetryRequestsPerChunk?: number;
-     // (undocumented)
+     onProgress?: (progress: TransferProgressEvent) => void;
-     cacheControl?: string;
+ }
-     // (undocumented)
+ 
-     clientRequestId?: string;
+ // @public
-     // (undocumented)
+ export interface FileSetExpiryHeaders {
-     contentCrc64?: Uint8Array;
+     clientRequestId?: string;
-     // (undocumented)
+     date?: Date;
-     contentDisposition?: string;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     contentEncoding?: string;
+     lastModified?: Date;
-     // (undocumented)
+     requestId?: string;
-     contentLanguage?: string;
+     version?: string;
-     // (undocumented)
+ }
-     contentLength?: number;
+ 
-     // (undocumented)
+ // @public
-     contentMD5?: Uint8Array;
+ export interface FileSetExpiryOptions extends CommonOptions {
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     contentRange?: string;
+     expiresOn?: Date;
-     // (undocumented)
+     timeToExpireInMs?: number;
-     contentType?: string;
+ }
-     // (undocumented)
+ 
-     copyCompletedOn?: Date;
+ // @public (undocumented)
-     // (undocumented)
+ export type FileSetExpiryResponse = WithResponse<FileSetExpiryHeaders, FileSetExpiryHeaders>;
-     copyId?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     copyProgress?: string;
+ export interface FileSystemCreateHeaders {
-     copySource?: string;
+     clientRequestId?: string;
-     copyStatus?: CopyStatusType;
+     date?: Date;
-     copyStatusDescription?: string;
+     etag?: string;
-     createdOn?: Date;
+     // (undocumented)
-     // (undocumented)
+     lastModified?: Date;
-     date?: Date;
+     // (undocumented)
-     encryptionContext?: string;
+     requestId?: string;
-     encryptionKeySha256?: string;
+     version?: string;
-     // (undocumented)
+ }
-     etag?: string;
+ 
-     // (undocumented)
+ // @public
-     fileContentMD5?: Uint8Array;
+ export interface FileSystemCreateIfNotExistsResponse extends FileSystemCreateResponse {
-     // (undocumented)
+     succeeded: boolean;
-     group?: string;
+ }
-     // (undocumented)
+ 
-     isServerEncrypted?: boolean;
+ // @public
-     // (undocumented)
+ export interface FileSystemCreateOptions extends CommonOptions {
-     lastModified?: Date;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     leaseDuration?: LeaseDurationType;
+     // (undocumented)
-     // (undocumented)
+     access?: PublicAccessType;
-     leaseState?: LeaseStateType;
+     fileSystemEncryptionScope?: FileSystemEncryptionScope;
-     leaseStatus?: LeaseStatusType;
+     metadata?: Metadata;
-     // (undocumented)
+ }
-     metadata?: Metadata;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     owner?: string;
+ export type FileSystemCreateResponse = WithResponse<FileSystemCreateHeaders, FileSystemCreateHeaders>;
-     // (undocumented)
+ 
-     permissions?: PathPermissions;
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemDeleteHeaders {
-     requestId?: string;
+     // (undocumented)
-     // (undocumented)
+     clientRequestId?: string;
-     version?: string;
+     // (undocumented)
- }
+     date?: Date;
- 
+     // (undocumented)
- // @public
+     requestId?: string;
- export interface FileReadOptions extends CommonOptions {
+     // (undocumented)
-     // (undocumented)
+     version?: string;
-     abortSignal?: AbortSignalLike;
+ }
-     // (undocumented)
+ 
-     conditions?: DataLakeRequestConditions;
+ // @public
-     customerProvidedKey?: CpkInfo;
+ export interface FileSystemDeleteIfExistsResponse extends FileSystemDeleteResponse {
-     // (undocumented)
+     succeeded: boolean;
-     maxRetryRequests?: number;
+ }
-     // (undocumented)
+ 
-     onProgress?: (progress: TransferProgressEvent) => void;
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemDeleteOptions extends CommonOptions {
-     rangeGetContentCrc64?: boolean;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     rangeGetContentMD5?: boolean;
+     // (undocumented)
- }
+     conditions?: DataLakeRequestConditions;
- 
+ }
- // @public (undocumented)
+ 
- export type FileReadResponse = WithResponse<FileReadHeaders & {
+ // @public (undocumented)
-     contentAsBlob?: Promise<Blob>;
+ export type FileSystemDeleteResponse = WithResponse<FileSystemDeleteHeaders, FileSystemDeleteHeaders>;
-     readableStreamBody?: NodeJS.ReadableStream;
+ 
- }, FileReadHeaders>;
+ // @public
- 
+ export interface FileSystemEncryptionScope {
- // @public
+     defaultEncryptionScope?: string;
- export interface FileReadToBufferOptions extends CommonOptions {
+     preventEncryptionScopeOverride?: boolean;
-     abortSignal?: AbortSignalLike;
+ }
-     chunkSize?: number;
+ 
-     concurrency?: number;
+ // @public
-     conditions?: DataLakeRequestConditions;
+ export interface FileSystemExistsOptions extends CommonOptions {
-     customerProvidedKey?: CpkInfo;
+     abortSignal?: AbortSignalLike;
-     maxRetryRequestsPerChunk?: number;
+ }
-     onProgress?: (progress: TransferProgressEvent) => void;
+ 
- }
+ // @public
- 
+ export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
- // @public
+     // Warning: (ae-forgotten-export) The symbol "FileSystemSASPermissions" needs to be exported by the entry point index.d.ts
- export interface FileSetExpiryHeaders {
+     permissions?: FileSystemSASPermissions;
-     clientRequestId?: string;
+ }
-     date?: Date;
+ 
-     errorCode?: string;
+ // @public (undocumented)
-     etag?: string;
+ export interface FileSystemGetAccessPolicyHeaders {
-     lastModified?: Date;
+     // (undocumented)
-     requestId?: string;
+     clientRequestId?: string;
-     version?: string;
+     // (undocumented)
- }
+     date?: Date;
- 
+     // (undocumented)
- // @public
+     etag?: string;
- export interface FileSetExpiryOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     lastModified?: Date;
-     expiresOn?: Date;
+     // (undocumented)
-     timeToExpireInMs?: number;
+     publicAccess?: PublicAccessType;
- }
+     // (undocumented)
- 
+     requestId?: string;
- // @public (undocumented)
+     // (undocumented)
- export type FileSetExpiryResponse = WithResponse<FileSetExpiryHeaders, FileSetExpiryHeaders>;
+     version?: string;
- 
+ }
- // @public (undocumented)
+ 
- export interface FileSystemCreateHeaders {
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemGetAccessPolicyOptions extends CommonOptions {
-     clientRequestId?: string;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     date?: Date;
+     // (undocumented)
-     // (undocumented)
+     conditions?: LeaseAccessConditions;
-     etag?: string;
+ }
-     // (undocumented)
+ 
-     lastModified?: Date;
+ // @public (undocumented)
-     // (undocumented)
+ export type FileSystemGetAccessPolicyResponse = WithResponse<{
-     requestId?: string;
+     signedIdentifiers: SignedIdentifier<AccessPolicy>[];
-     // (undocumented)
+ } & FileSystemGetAccessPolicyHeaders, FileSystemGetAccessPolicyHeaders, SignedIdentifier<RawAccessPolicy>[]>;
-     version?: string;
+ 
- }
+ // @public (undocumented)
- 
+ export interface FileSystemGetPropertiesHeaders {
- // @public
+     // (undocumented)
- export interface FileSystemCreateIfNotExistsResponse extends FileSystemCreateResponse {
+     clientRequestId?: string;
-     succeeded: boolean;
+     // (undocumented)
- }
+     date?: Date;
- 
+     defaultEncryptionScope?: string;
- // @public
+     // (undocumented)
- export interface FileSystemCreateOptions extends CommonOptions {
+     etag?: string;
-     abortSignal?: AbortSignalLike;
+     hasImmutabilityPolicy?: boolean;
-     access?: PublicAccessType;
+     hasLegalHold?: boolean;
-     fileSystemEncryptionScope?: FileSystemEncryptionScope;
+     // (undocumented)
-     // (undocumented)
+     lastModified?: Date;
-     metadata?: Metadata;
+     // (undocumented)
- }
+     leaseDuration?: LeaseDurationType;
- 
+     // (undocumented)
- // @public (undocumented)
+     leaseState?: LeaseStateType;
- export type FileSystemCreateResponse = WithResponse<FileSystemCreateHeaders, FileSystemCreateHeaders>;
+     // (undocumented)
- 
+     leaseStatus?: LeaseStatusType;
- // @public (undocumented)
+     // (undocumented)
- export interface FileSystemDeleteHeaders {
+     metadata?: Metadata;
-     clientRequestId?: string;
+     publicAccess?: PublicAccessType;
-     date?: Date;
+     requestId?: string;
-     requestId?: string;
+     version?: string;
-     // (undocumented)
+ }
-     version?: string;
+ 
- }
+ // @public (undocumented)
- 
+ export interface FileSystemGetPropertiesOptions extends CommonOptions {
- // @public
+     // (undocumented)
- export interface FileSystemDeleteIfExistsResponse extends FileSystemDeleteResponse {
+     abortSignal?: AbortSignalLike;
-     succeeded: boolean;
+     // (undocumented)
- }
+     conditions?: LeaseAccessConditions;
- 
+ }
- // @public (undocumented)
+ 
- export interface FileSystemDeleteOptions extends CommonOptions {
+ // @public (undocumented)
-     // (undocumented)
+ export type FileSystemGetPropertiesResponse = WithResponse<FileSystemGetPropertiesHeaders, FileSystemGetPropertiesHeaders>;
-     abortSignal?: AbortSignalLike;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     conditions?: DataLakeRequestConditions;
+ export interface FileSystemItem {
- }
+     // (undocumented)
- 
+     deleted?: boolean;
- // @public (undocumented)
+     // (undocumented)
- export type FileSystemDeleteResponse = WithResponse<FileSystemDeleteHeaders, FileSystemDeleteHeaders>;
+     metadata?: Metadata;
- 
+     // (undocumented)
- // @public
+     name: string;
- export interface FileSystemEncryptionScope {
+     // (undocumented)
-     defaultEncryptionScope?: string;
+     properties: FileSystemProperties;
-     preventEncryptionScopeOverride?: boolean;
+     // (undocumented)
- }
+     versionId?: string;
- 
+ }
- // @public
+ 
- export interface FileSystemExistsOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface FileSystemListBlobHierarchySegmentHeaders {
- }
+     clientRequestId?: string;
- 
+     contentType?: string;
- // @public
+     date?: Date;
- export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     errorCode?: string;
-     permissions?: FileSystemSASPermissions;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public (undocumented)
+ 
- export interface FileSystemGetAccessPolicyHeaders {
+ // @public (undocumented)
-     // (undocumented)
+ export type FileSystemListDeletedPathsResponse = WithResponse<DeletedPathList & FileSystemListBlobHierarchySegmentHeaders & ListBlobsHierarchySegmentResponse & {
-     clientRequestId?: string;
+     continuation?: string;
-     // (undocumented)
+ }, FileSystemListBlobHierarchySegmentHeaders, ListBlobsHierarchySegmentResponse>;
-     date?: Date;
+ 
-     // (undocumented)
+ // @public
-     etag?: string;
+ export interface FileSystemListPathsHeaders {
-     // (undocumented)
+     continuation?: string;
-     lastModified?: Date;
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     publicAccess?: PublicAccessType;
+     etag?: string;
-     // (undocumented)
+     lastModified?: Date;
-     // (undocumented)
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export type FileSystemListPathsResponse = WithResponse<PathList & FileSystemListPathsHeaders, FileSystemListPathsHeaders, PathListModel>;
- export interface FileSystemGetAccessPolicyOptions extends CommonOptions {
+ 
-     // (undocumented)
+ // @public (undocumented)
-     abortSignal?: AbortSignalLike;
+ export interface FileSystemProperties {
-     conditions?: LeaseAccessConditions;
+     defaultEncryptionScope?: string;
- }
+     // (undocumented)
- 
+     deletedOn?: Date;
- // @public (undocumented)
+     // (undocumented)
- export type FileSystemGetAccessPolicyResponse = WithResponse<{
+     etag: string;
-     signedIdentifiers: SignedIdentifier<AccessPolicy>[];
+     // (undocumented)
- } & FileSystemGetAccessPolicyHeaders, FileSystemGetAccessPolicyHeaders, SignedIdentifier<RawAccessPolicy>[]>;
+     hasImmutabilityPolicy?: boolean;
- 
+     // (undocumented)
- // @public (undocumented)
+     hasLegalHold?: boolean;
- export interface FileSystemGetPropertiesHeaders {
+     // (undocumented)
-     // (undocumented)
+     lastModified: Date;
-     clientRequestId?: string;
+     // (undocumented)
-     // (undocumented)
+     leaseDuration?: LeaseDurationType;
-     date?: Date;
+     // (undocumented)
-     defaultEncryptionScope?: string;
+     leaseState?: LeaseStateType;
-     etag?: string;
+     leaseStatus?: LeaseStatusType;
-     hasImmutabilityPolicy?: boolean;
+     publicAccess?: PublicAccessType;
-     hasLegalHold?: boolean;
+     remainingRetentionDays?: number;
-     // (undocumented)
+ }
-     lastModified?: Date;
+ 
-     // (undocumented)
+ // @public
-     leaseDuration?: LeaseDurationType;
+ export type FileSystemRenameResponse = ContainerRenameResponse;
-     // (undocumented)
+ 
-     leaseState?: LeaseStateType;
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemSetAccessPolicyHeaders {
-     leaseStatus?: LeaseStatusType;
+     // (undocumented)
-     // (undocumented)
+     clientRequestId?: string;
-     metadata?: Metadata;
+     // (undocumented)
-     // (undocumented)
+     date?: Date;
-     publicAccess?: PublicAccessType;
+     // (undocumented)
-     // (undocumented)
+     etag?: string;
-     requestId?: string;
+     // (undocumented)
-     // (undocumented)
+     lastModified?: Date;
-     version?: string;
+     // (undocumented)
- }
+     requestId?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     version?: string;
- export interface FileSystemGetPropertiesOptions extends CommonOptions {
+ }
-     // (undocumented)
+ 
-     abortSignal?: AbortSignalLike;
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemSetAccessPolicyOptions extends CommonOptions {
-     conditions?: LeaseAccessConditions;
+     // (undocumented)
- }
+     abortSignal?: AbortSignalLike;
- 
+     // (undocumented)
- // @public (undocumented)
+     conditions?: DataLakeRequestConditions;
- export type FileSystemGetPropertiesResponse = WithResponse<FileSystemGetPropertiesHeaders, FileSystemGetPropertiesHeaders>;
+ }
- export interface FileSystemItem {
+ export type FileSystemSetAccessPolicyResponse = WithResponse<FileSystemSetAccessPolicyHeaders, FileSystemSetAccessPolicyHeaders>;
-     // (undocumented)
+ 
-     deleted?: boolean;
+ // @public (undocumented)
-     // (undocumented)
+ export interface FileSystemSetMetadataHeaders {
-     metadata?: Metadata;
+     // (undocumented)
-     // (undocumented)
+     clientRequestId?: string;
-     name: string;
+     // (undocumented)
-     // (undocumented)
+     date?: Date;
-     properties: FileSystemProperties;
+     // (undocumented)
-     // (undocumented)
+     etag?: string;
-     versionId?: string;
+     // (undocumented)
- }
+     lastModified?: Date;
- 
+     // (undocumented)
- // @public
+     requestId?: string;
- export interface FileSystemListBlobHierarchySegmentHeaders {
+     // (undocumented)
-     clientRequestId?: string;
+     version?: string;
-     contentType?: string;
+ }
-     date?: Date;
+ 
-     errorCode?: string;
+ // @public (undocumented)
-     requestId?: string;
+ export interface FileSystemSetMetadataOptions extends CommonOptions {
-     version?: string;
+     // (undocumented)
- }
+     abortSignal?: AbortSignalLike;
- 
+     // (undocumented)
- // @public (undocumented)
+     conditions?: DataLakeRequestConditions;
- export type FileSystemListDeletedPathsResponse = WithResponse<DeletedPathList & FileSystemListBlobHierarchySegmentHeaders & ListBlobsHierarchySegmentResponse & {
+ }
-     continuation?: string;
+ 
- }, FileSystemListBlobHierarchySegmentHeaders, ListBlobsHierarchySegmentResponse>;
+ // @public (undocumented)
- 
+ export type FileSystemSetMetadataResponse = WithResponse<FileSystemSetMetadataHeaders, FileSystemSetMetadataHeaders>;
- // @public
+ 
- export interface FileSystemListPathsHeaders {
+ // @public (undocumented)
-     continuation?: string;
+ export interface FileSystemUndeletePathOption extends CommonOptions {
-     date?: Date;
+     // (undocumented)
-     errorCode?: string;
+     abortSignal?: AbortSignalLike;
-     etag?: string;
+ }
-     lastModified?: Date;
+ 
-     requestId?: string;
+ // @public (undocumented)
-     version?: string;
+ export type FileSystemUndeletePathResponse = WithResponse<PathUndeleteHeaders & {
- }
+     pathClient: DataLakePathClient;
- 
+ }, PathUndeleteHeaders>;
- // @public (undocumented)
+ 
- export type FileSystemListPathsResponse = WithResponse<PathList & FileSystemListPathsHeaders, FileSystemListPathsHeaders, PathListModel>;
+ // @public
- 
+ export type FileSystemUndeleteResponse = ContainerUndeleteResponse;
- // @public (undocumented)
+ 
- export interface FileSystemProperties {
+ // @public (undocumented)
-     // (undocumented)
+ export type FileUploadResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
-     defaultEncryptionScope?: string;
+ 
-     // (undocumented)
+ // @public
-     deletedOn?: Date;
+ export function getDataLakeServiceAccountAudience(storageAccountName: string): string;
-     // (undocumented)
+ 
-     etag: string;
+ export { HttpHeaders }
-     // (undocumented)
+ 
-     hasImmutabilityPolicy?: boolean;
+ export { HttpOperationResponse }
-     // (undocumented)
+ 
-     hasLegalHold?: boolean;
+ export { HttpRequestBody }
-     // (undocumented)
+ 
-     lastModified: Date;
+ export { isPipelineLike }
-     // (undocumented)
+ 
-     leaseDuration?: LeaseDurationType;
+ export { Lease }
-     // (undocumented)
+ 
-     leaseState?: LeaseStateType;
+ export { LeaseAccessConditions }
-     // (undocumented)
+ 
-     leaseStatus?: LeaseStatusType;
+ // @public (undocumented)
-     // (undocumented)
+ export type LeaseDurationType = "infinite" | "fixed";
-     publicAccess?: PublicAccessType;
+ 
-     // (undocumented)
+ export { LeaseOperationOptions }
-     remainingRetentionDays?: number;
+ 
- }
+ export { LeaseOperationResponse }
- // @public
+ // @public (undocumented)
- export type FileSystemRenameResponse = ContainerRenameResponse;
+ export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
- // @public
+ // @public (undocumented)
- export class FileSystemSASPermissions {
+ export type LeaseStatusType = "locked" | "unlocked";
-     add: boolean;
+ 
-     create: boolean;
+ // @public
-     delete: boolean;
+ export interface ListBlobsHierarchySegmentResponse {
-     execute: boolean;
+     // (undocumented)
-     list: boolean;
+     containerName: string;
-     manageAccessControl: boolean;
+     // (undocumented)
-     manageOwnership: boolean;
+     delimiter?: string;
-     move: boolean;
+     // (undocumented)
-     static parse(permissions: string): FileSystemSASPermissions;
+     marker?: string;
-     read: boolean;
+     // (undocumented)
-     toString(): string;
+     maxResults?: number;
-     write: boolean;
+     // (undocumented)
- }
+     nextMarker?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     prefix?: string;
- export interface FileSystemSetAccessPolicyHeaders {
+     // (undocumented)
-     // (undocumented)
+     segment: BlobHierarchyListSegment;
-     clientRequestId?: string;
+     // (undocumented)
-     // (undocumented)
+     serviceEndpoint: string;
-     date?: Date;
+ }
-     // (undocumented)
+ 
-     etag?: string;
+ // @public (undocumented)
-     // (undocumented)
+ export interface ListDeletedPathsOptions extends CommonOptions {
-     lastModified?: Date;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     requestId?: string;
+     prefix?: string;
-     // (undocumented)
+ }
-     version?: string;
+ 
- }
+ // @public (undocumented)
- 
+ export interface ListDeletedPathsSegmentOptions extends ListDeletedPathsOptions {
- // @public (undocumented)
+     // (undocumented)
- export interface FileSystemSetAccessPolicyOptions extends CommonOptions {
+     maxResults?: number;
-     // (undocumented)
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     conditions?: DataLakeRequestConditions;
+ export interface ListFileSystemsSegmentResponse {
- }
+     // (undocumented)
- 
+     continuationToken?: string;
- // @public (undocumented)
+     // (undocumented)
- export type FileSystemSetAccessPolicyResponse = WithResponse<FileSystemSetAccessPolicyHeaders, FileSystemSetAccessPolicyHeaders>;
+     fileSystemItems: FileSystemItem[];
- 
+     // (undocumented)
- // @public (undocumented)
+     marker?: string;
- export interface FileSystemSetMetadataHeaders {
+     // (undocumented)
-     // (undocumented)
+     maxPageSize?: number;
-     clientRequestId?: string;
+     // (undocumented)
-     // (undocumented)
+     prefix?: string;
-     date?: Date;
+     // (undocumented)
-     // (undocumented)
+     serviceEndpoint: string;
-     etag?: string;
+ }
-     // (undocumented)
+ 
-     lastModified?: Date;
+ // @public (undocumented)
-     // (undocumented)
+ export interface ListPathsOptions extends CommonOptions {
-     requestId?: string;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     version?: string;
+     // (undocumented)
- }
+     path?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     recursive?: boolean;
- export interface FileSystemSetMetadataOptions extends CommonOptions {
+     // (undocumented)
-     // (undocumented)
+     userPrincipalName?: boolean;
-     abortSignal?: AbortSignalLike;
+ }
-     // (undocumented)
+ 
-     conditions?: DataLakeRequestConditions;
+ // @public (undocumented)
- }
+ export interface ListPathsSegmentOptions extends ListPathsOptions {
- 
+     // (undocumented)
- // @public (undocumented)
+     maxResults?: number;
- export type FileSystemSetMetadataResponse = WithResponse<FileSystemSetMetadataHeaders, FileSystemSetMetadataHeaders>;
+ }
- // @public (undocumented)
+ // @public
- export interface FileSystemUndeletePathOption extends CommonOptions {
+ export const logger: AzureLogger;
-     // (undocumented)
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
- }
+ export interface Metadata {
- 
+     // (undocumented)
- // @public (undocumented)
+     [propertyName: string]: string;
- export type FileSystemUndeletePathResponse = WithResponse<PathUndeleteHeaders & {
+ }
-     pathClient: DataLakePathClient;
+ 
- }, PathUndeleteHeaders>;
+ // @public (undocumented)
- 
+ export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
- // @public
+ 
- export type FileSystemUndeleteResponse = ContainerUndeleteResponse;
+ // @public
- 
+ export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
- // @public (undocumented)
+ 
- export type FileUploadResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
+ // @public (undocumented)
- 
+ export interface Path {
- // @public
+     // (undocumented)
- export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     contentLength?: number;
- 
+     createdOn?: Date;
- // @public
+     encryptionContext?: string;
- export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     encryptionScope?: string;
- 
+     // (undocumented)
- // @public
+     etag?: string;
- export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
+     expiresOn?: Date;
- 
+     // (undocumented)
- // @public
+     group?: string;
- export function getDataLakeServiceAccountAudience(storageAccountName: string): string;
+     // (undocumented)
- 
+     isDirectory?: boolean;
- export { HttpHeaders }
+     // (undocumented)
- 
+     lastModified?: Date;
- export { HttpOperationResponse }
+     // (undocumented)
- 
+     name?: string;
- export { HttpRequestBody }
+     // (undocumented)
- 
+     owner?: string;
- export { isPipelineLike }
+     // (undocumented)
- 
+     permissions?: PathPermissions;
- export { Lease }
+ }
- export { LeaseAccessConditions }
+ // @public (undocumented)
- 
+ export interface PathAccessControl {
- // @public (undocumented)
+     acl: PathAccessControlItem[];
- export type LeaseDurationType = "infinite" | "fixed";
+     // (undocumented)
- 
+     group?: string;
- export { LeaseOperationOptions }
+     // (undocumented)
- 
+     owner?: string;
- export { LeaseOperationResponse }
+     // (undocumented)
- 
+     permissions?: PathPermissions;
- // @public (undocumented)
+ }
- export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export interface PathAccessControlItem {
- export type LeaseStatusType = "locked" | "unlocked";
+     accessControlType: AccessControlType;
- 
+     defaultScope: boolean;
- // @public
+     entityId: string;
- export interface ListBlobsHierarchySegmentResponse {
+     permissions: RolePermissions;
-     // (undocumented)
+ }
-     containerName: string;
+ 
-     // (undocumented)
+ // @public
-     delimiter?: string;
+ export interface PathAppendDataHeaders {
-     // (undocumented)
+     clientRequestId?: string;
-     marker?: string;
+     contentMD5?: Uint8Array;
-     // (undocumented)
+     date?: Date;
-     maxResults?: number;
+     encryptionKeySha256?: string;
-     // (undocumented)
+     etag?: string;
-     nextMarker?: string;
+     isServerEncrypted?: boolean;
-     // (undocumented)
+     leaseRenewed?: boolean;
-     prefix?: string;
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     segment: BlobHierarchyListSegment;
+     xMsContentCrc64?: Uint8Array;
-     // (undocumented)
+ }
-     serviceEndpoint: string;
+ 
- }
+ // @public
- 
+ export interface PathChangeAccessControlRecursiveOptions extends CommonOptions {
- // @public (undocumented)
+     abortSignal?: AbortSignalLike;
- export interface ListDeletedPathsOptions extends CommonOptions {
+     batchSize?: number;
-     // (undocumented)
+     continuationToken?: string;
-     abortSignal?: AbortSignalLike;
+     continueOnFailure?: boolean;
-     prefix?: string;
+     maxBatches?: number;
- }
+     onProgress?: (progress: AccessControlChanges) => void;
- 
+ }
- // @public (undocumented)
+ 
- export interface ListDeletedPathsSegmentOptions extends ListDeletedPathsOptions {
+ // @public
-     // (undocumented)
+ export interface PathChangeAccessControlRecursiveResponse {
-     maxResults?: number;
+     continuationToken?: string;
- }
+     counters: AccessControlChangeCounters;
- 
+ }
- // @public (undocumented)
+ 
- export interface ListFileSystemsSegmentResponse {
+ // @public
-     // (undocumented)
+ export interface PathCreateHeaders {
-     continuationToken?: string;
+     contentLength?: number;
-     // (undocumented)
+     continuation?: string;
-     fileSystemItems: FileSystemItem[];
+     date?: Date;
-     // (undocumented)
+     encryptionKeySha256?: string;
-     marker?: string;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     maxPageSize?: number;
+     isServerEncrypted?: boolean;
-     // (undocumented)
+     lastModified?: Date;
-     prefix?: string;
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     serviceEndpoint: string;
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export interface PathCreateHttpHeaders {
- export interface ListPathsOptions extends CommonOptions {
+     // (undocumented)
-     // (undocumented)
+     cacheControl?: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     // (undocumented)
+     contentDisposition?: string;
-     path?: string;
+     // (undocumented)
-     // (undocumented)
+     contentEncoding?: string;
-     recursive?: boolean;
+     // (undocumented)
-     // (undocumented)
+     contentLanguage?: string;
-     userPrincipalName?: boolean;
+     // (undocumented)
- }
+     contentType?: string;
- 
+ }
- // @public (undocumented)
+ 
- export interface ListPathsSegmentOptions extends ListPathsOptions {
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathCreateIfNotExistsOptions extends CommonOptions {
-     maxResults?: number;
+     // (undocumented)
- }
+     abortSignal?: AbortSignalLike;
- 
+     acl?: PathAccessControlItem[];
- // @public
+     customerProvidedKey?: CpkInfo;
- export const logger: AzureLogger;
+     encryptionContext?: string;
- 
+     expiresOn?: number | Date;
- // @public
+     group?: string;
- export interface Metadata {
+     leaseDuration?: number;
-     [propertyName: string]: string;
+     metadata?: Metadata;
- }
+     owner?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     pathHttpHeaders?: PathCreateHttpHeaders;
- export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
+     // (undocumented)
- 
+     permissions?: string;
- // @public
+     proposedLeaseId?: string;
- export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+     // (undocumented)
- 
+     umask?: string;
- // @public (undocumented)
+ }
- export interface Path {
+ 
-     // (undocumented)
+ // @public
-     contentLength?: number;
+ export interface PathCreateIfNotExistsResponse extends PathCreateResponse {
-     createdOn?: Date;
+     succeeded: boolean;
-     encryptionContext?: string;
+ }
-     encryptionScope?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     etag?: string;
+ export interface PathCreateOptions extends CommonOptions {
-     expiresOn?: Date;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     group?: string;
+     acl?: PathAccessControlItem[];
-     isDirectory?: boolean;
+     conditions?: DataLakeRequestConditions;
-     // (undocumented)
+     customerProvidedKey?: CpkInfo;
-     lastModified?: Date;
+     encryptionContext?: string;
-     // (undocumented)
+     expiresOn?: number | Date;
-     name?: string;
+     group?: string;
-     // (undocumented)
+     leaseDuration?: number;
-     owner?: string;
+     // (undocumented)
-     // (undocumented)
+     metadata?: Metadata;
-     permissions?: PathPermissions;
+     owner?: string;
- }
+     // (undocumented)
- 
+     pathHttpHeaders?: PathCreateHttpHeaders;
- // @public (undocumented)
+     // (undocumented)
- export interface PathAccessControl {
+     permissions?: string;
-     acl: PathAccessControlItem[];
+     proposedLeaseId?: string;
-     group?: string;
+     umask?: string;
-     // (undocumented)
+ }
-     owner?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     permissions?: PathPermissions;
+ export type PathCreateResponse = WithResponse<PathCreateHeaders, PathCreateHeaders>;
- }
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface PathDeleteHeaders {
- export interface PathAccessControlItem {
+     continuation?: string;
-     accessControlType: AccessControlType;
+     date?: Date;
-     defaultScope: boolean;
+     deletionId?: string;
-     entityId: string;
+     errorCode?: string;
-     permissions: RolePermissions;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface PathAppendDataHeaders {
+ // @public
-     clientRequestId?: string;
+ export interface PathDeleteIfExistsResponse extends PathDeleteResponse {
-     contentMD5?: Uint8Array;
+     succeeded: boolean;
-     date?: Date;
+ }
-     encryptionKeySha256?: string;
+ 
-     etag?: string;
+ // @public (undocumented)
-     isServerEncrypted?: boolean;
+ export interface PathDeleteOptions extends CommonOptions {
-     leaseRenewed?: boolean;
+     // (undocumented)
-     requestId?: string;
+     abortSignal?: AbortSignalLike;
-     version?: string;
+     // (undocumented)
-     xMsContentCrc64?: Uint8Array;
+     conditions?: DataLakeRequestConditions;
- // @public
+ // @public (undocumented)
- export interface PathChangeAccessControlRecursiveOptions extends CommonOptions {
+ export type PathDeleteResponse = WithResponse<PathDeleteHeaders, PathDeleteHeaders>;
-     abortSignal?: AbortSignalLike;
+ 
-     batchSize?: number;
+ // @public
-     continuationToken?: string;
+ export interface PathExistsOptions extends CommonOptions {
-     continueOnFailure?: boolean;
+     abortSignal?: AbortSignalLike;
-     maxBatches?: number;
+     customerProvidedKey?: CpkInfo;
-     onProgress?: (progress: AccessControlChanges) => void;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PathFlushDataHeaders {
- export interface PathChangeAccessControlRecursiveResponse {
+     clientRequestId?: string;
-     continuationToken?: string;
+     contentLength?: number;
-     counters: AccessControlChangeCounters;
+     date?: Date;
- }
+     encryptionKeySha256?: string;
- 
+     etag?: string;
- // @public
+     isServerEncrypted?: boolean;
- export interface PathCreateHeaders {
+     lastModified?: Date;
-     contentLength?: number;
+     leaseRenewed?: boolean;
-     continuation?: string;
+     requestId?: string;
-     date?: Date;
+     version?: string;
-     encryptionKeySha256?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public (undocumented)
-     isServerEncrypted?: boolean;
+ export interface PathGetAccessControlHeaders {
-     lastModified?: Date;
+     // (undocumented)
-     requestId?: string;
+     date?: Date;
-     version?: string;
+     // (undocumented)
- }
+     etag?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     group?: string;
- export interface PathCreateHttpHeaders {
+     // (undocumented)
-     // (undocumented)
+     lastModified?: Date;
-     cacheControl?: string;
+     // (undocumented)
-     // (undocumented)
+     owner?: string;
-     contentDisposition?: string;
+     // (undocumented)
-     // (undocumented)
+     requestId?: string;
-     contentEncoding?: string;
+     // (undocumented)
-     // (undocumented)
+     version?: string;
-     contentLanguage?: string;
+ }
-     // (undocumented)
+ 
-     contentType?: string;
+ // @public (undocumented)
- }
+ export interface PathGetAccessControlOptions extends CommonOptions {
- 
+     // (undocumented)
- // @public (undocumented)
+     abortSignal?: AbortSignalLike;
- export interface PathCreateIfNotExistsOptions extends CommonOptions {
+     // (undocumented)
-     // (undocumented)
+     conditions?: DataLakeRequestConditions;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     acl?: PathAccessControlItem[];
+     userPrincipalName?: boolean;
-     customerProvidedKey?: CpkInfo;
+ }
-     encryptionContext?: string;
+ 
-     expiresOn?: number | Date;
+ // @public (undocumented)
-     group?: string;
+ export type PathGetAccessControlResponse = WithResponse<PathAccessControl & PathGetAccessControlHeaders, PathGetPropertiesHeadersModel>;
-     leaseDuration?: number;
+ 
-     // (undocumented)
+ // @public
-     metadata?: Metadata;
+ export enum PathGetPropertiesAction {
-     owner?: string;
+     // (undocumented)
-     // (undocumented)
+     GetAccessControl = "getAccessControl",
-     pathHttpHeaders?: PathCreateHttpHeaders;
+     // (undocumented)
-     // (undocumented)
+     GetStatus = "getStatus"
-     permissions?: string;
+ }
-     proposedLeaseId?: string;
+ 
-     // (undocumented)
+ // @public
-     umask?: string;
+ export type PathGetPropertiesActionModel = "getAccessControl" | "getStatus";
- }
+ 
- 
+ // @public (undocumented)
- // @public
+ export interface PathGetPropertiesHeaders {
- export interface PathCreateIfNotExistsResponse extends PathCreateResponse {
+     // (undocumented)
-     succeeded: boolean;
+     acceptRanges?: string;
- }
+     // (undocumented)
- 
+     accessTier?: string;
- // @public (undocumented)
+     // (undocumented)
- export interface PathCreateOptions extends CommonOptions {
+     accessTierChangedOn?: Date;
-     abortSignal?: AbortSignalLike;
+     accessTierInferred?: boolean;
-     acl?: PathAccessControlItem[];
+     acl: PathAccessControlItem[];
-     conditions?: DataLakeRequestConditions;
+     archiveStatus?: string;
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
-     encryptionContext?: string;
+     cacheControl?: string;
-     expiresOn?: number | Date;
+     // (undocumented)
-     group?: string;
+     clientRequestId?: string;
-     leaseDuration?: number;
+     // (undocumented)
-     // (undocumented)
+     contentDisposition?: string;
-     metadata?: Metadata;
+     // (undocumented)
-     owner?: string;
+     contentEncoding?: string;
-     pathHttpHeaders?: PathCreateHttpHeaders;
+     contentLanguage?: string;
-     permissions?: string;
+     contentLength?: number;
-     proposedLeaseId?: string;
+     // (undocumented)
-     // (undocumented)
+     contentMD5?: Uint8Array;
-     umask?: string;
+     // (undocumented)
- }
+     contentType?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     copyCompletedOn?: Date;
- export type PathCreateResponse = WithResponse<PathCreateHeaders, PathCreateHeaders>;
+     // (undocumented)
- 
+     copyId?: string;
- // @public
+     // (undocumented)
- export interface PathDeleteHeaders {
+     copyProgress?: string;
-     continuation?: string;
+     // (undocumented)
-     date?: Date;
+     copySource?: string;
-     deletionId?: string;
+     // (undocumented)
-     errorCode?: string;
+     copyStatus?: CopyStatusType;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     copyStatusDescription?: string;
- }
+     // (undocumented)
- 
+     createdOn?: Date;
- // @public
+     // (undocumented)
- export interface PathDeleteIfExistsResponse extends PathDeleteResponse {
+     date?: Date;
-     succeeded: boolean;
+     // (undocumented)
- }
+     destinationSnapshot?: string;
- 
+     encryptionContext?: string;
- // @public (undocumented)
+     // (undocumented)
- export interface PathDeleteOptions extends CommonOptions {
+     encryptionKeySha256?: string;
-     // (undocumented)
+     encryptionScope?: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     // (undocumented)
+     etag?: string;
-     conditions?: DataLakeRequestConditions;
+     expiresOn?: Date;
- }
+     // (undocumented)
- 
+     group?: string;
- // @public (undocumented)
+     // (undocumented)
- export type PathDeleteResponse = WithResponse<PathDeleteHeaders, PathDeleteHeaders>;
+     isIncrementalCopy?: boolean;
- 
+     // (undocumented)
- // @public
+     isServerEncrypted?: boolean;
- export interface PathExistsOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     lastModified?: Date;
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
- }
+     leaseDuration?: LeaseDurationType;
- 
+     // (undocumented)
- // @public
+     leaseState?: LeaseStateType;
- export interface PathFlushDataHeaders {
+     // (undocumented)
-     clientRequestId?: string;
+     leaseStatus?: LeaseStatusType;
-     contentLength?: number;
+     // (undocumented)
-     date?: Date;
+     metadata?: Metadata;
-     encryptionKeySha256?: string;
+     // (undocumented)
-     etag?: string;
+     owner?: string;
-     isServerEncrypted?: boolean;
+     // (undocumented)
-     lastModified?: Date;
+     permissions?: PathPermissions;
-     leaseRenewed?: boolean;
+     // (undocumented)
-     version?: string;
+     // (undocumented)
- }
+     version?: string;
- 
+ }
- // @public (undocumented)
+ 
- export interface PathGetAccessControlHeaders {
+ // @public
-     // (undocumented)
+ export interface PathGetPropertiesHeadersModel {
-     date?: Date;
+     acceptRanges?: string;
-     // (undocumented)
+     acl?: string;
-     etag?: string;
+     cacheControl?: string;
-     // (undocumented)
+     contentDisposition?: string;
-     group?: string;
+     contentEncoding?: string;
-     // (undocumented)
+     contentLanguage?: string;
-     lastModified?: Date;
+     contentLength?: number;
-     // (undocumented)
+     contentMD5?: string;
-     owner?: string;
+     contentRange?: string;
-     // (undocumented)
+     contentType?: string;
-     requestId?: string;
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     version?: string;
+     etag?: string;
- }
+     group?: string;
- 
+     lastModified?: Date;
- // @public (undocumented)
+     leaseDuration?: string;
- export interface PathGetAccessControlOptions extends CommonOptions {
+     leaseState?: string;
-     // (undocumented)
+     leaseStatus?: string;
-     abortSignal?: AbortSignalLike;
+     owner?: string;
-     // (undocumented)
+     permissions?: string;
-     conditions?: DataLakeRequestConditions;
+     properties?: string;
-     // (undocumented)
+     requestId?: string;
-     userPrincipalName?: boolean;
+     resourceType?: string;
- }
+     version?: string;
- 
+ }
- // @public (undocumented)
+ 
- export type PathGetAccessControlResponse = WithResponse<PathAccessControl & PathGetAccessControlHeaders, PathGetPropertiesHeadersModel>;
+ // @public (undocumented)
- 
+ export interface PathGetPropertiesOptions extends CommonOptions {
- // @public
+     // (undocumented)
- export enum PathGetPropertiesAction {
+     abortSignal?: AbortSignalLike;
-     GetAccessControl = "getAccessControl",
+     conditions?: DataLakeRequestConditions;
-     // (undocumented)
+     customerProvidedKey?: CpkInfo;
-     GetStatus = "getStatus"
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public
+ export type PathGetPropertiesResponse = WithResponse<PathGetPropertiesHeaders, PathGetPropertiesHeaders>;
- export type PathGetPropertiesActionModel = "getAccessControl" | "getStatus";
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export interface PathHttpHeaders {
- export interface PathGetPropertiesHeaders {
+     // (undocumented)
-     // (undocumented)
+     cacheControl?: string;
-     acceptRanges?: string;
+     // (undocumented)
-     // (undocumented)
+     contentDisposition?: string;
-     accessTier?: string;
+     // (undocumented)
-     // (undocumented)
+     contentEncoding?: string;
-     accessTierChangedOn?: Date;
+     // (undocumented)
-     // (undocumented)
+     contentLanguage?: string;
-     accessTierInferred?: boolean;
+     // (undocumented)
-     acl: PathAccessControlItem[];
+     contentMD5?: Uint8Array;
-     archiveStatus?: string;
+     contentType?: string;
-     // (undocumented)
+ }
-     cacheControl?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     clientRequestId?: string;
+ export interface PathList {
-     contentDisposition?: string;
+     pathItems?: Path[];
-     // (undocumented)
+ }
-     contentEncoding?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     contentLanguage?: string;
+ export interface PathListModel {
-     contentLength?: number;
+     paths?: PathModel[];
-     // (undocumented)
+ }
-     contentMD5?: Uint8Array;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     contentType?: string;
+ export interface PathModel {
-     copyCompletedOn?: Date;
+     contentLength?: number;
-     copyId?: string;
+     creationTime?: string;
-     copyProgress?: string;
+     encryptionContext?: string;
-     // (undocumented)
+     encryptionScope?: string;
-     copySource?: string;
+     // (undocumented)
-     // (undocumented)
+     etag?: string;
-     copyStatus?: CopyStatusType;
+     // (undocumented)
-     // (undocumented)
+     expiryTime?: string;
-     copyStatusDescription?: string;
+     // (undocumented)
-     // (undocumented)
+     group?: string;
-     createdOn?: Date;
+     // (undocumented)
-     // (undocumented)
+     isDirectory?: boolean;
-     date?: Date;
+     // (undocumented)
-     // (undocumented)
+     lastModified?: Date;
-     destinationSnapshot?: string;
+     // (undocumented)
-     encryptionContext?: string;
+     name?: string;
-     encryptionKeySha256?: string;
+     owner?: string;
-     encryptionScope?: string;
+     // (undocumented)
-     // (undocumented)
+     permissions?: string;
-     etag?: string;
+ }
-     expiresOn?: Date;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     group?: string;
+ export interface PathMoveOptions extends CommonOptions {
-     isIncrementalCopy?: boolean;
+     abortSignal?: AbortSignalLike;
-     isServerEncrypted?: boolean;
+     conditions?: DataLakeRequestConditions;
-     lastModified?: Date;
+     destinationConditions?: DataLakeRequestConditions;
-     // (undocumented)
+ }
-     leaseDuration?: LeaseDurationType;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     leaseState?: LeaseStateType;
+ export type PathMoveResponse = WithResponse<PathRemoveHeaders, PathRemoveHeaders>;
-     // (undocumented)
+ 
-     leaseStatus?: LeaseStatusType;
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathPermissions {
-     metadata?: Metadata;
+     // (undocumented)
-     // (undocumented)
+     extendedAcls: boolean;
-     owner?: string;
+     // (undocumented)
-     // (undocumented)
+     group: RolePermissions;
-     permissions?: PathPermissions;
+     // (undocumented)
-     // (undocumented)
+     other: RolePermissions;
-     requestId?: string;
+     // (undocumented)
-     // (undocumented)
+     owner: RolePermissions;
-     version?: string;
+     // (undocumented)
- }
+     stickyBit: boolean;
- 
+ }
- // @public
+ 
- export interface PathGetPropertiesHeadersModel {
+ // @public (undocumented)
-     acceptRanges?: string;
+ export interface PathRemoveHeaders {
-     acl?: string;
+     // (undocumented)
-     cacheControl?: string;
+     contentLength?: number;
-     contentDisposition?: string;
+     // (undocumented)
-     contentEncoding?: string;
+     date?: Date;
-     contentLanguage?: string;
+     // (undocumented)
-     contentLength?: number;
+     etag?: string;
-     contentMD5?: string;
+     // (undocumented)
-     contentRange?: string;
+     lastModified?: Date;
-     contentType?: string;
+     // (undocumented)
-     date?: Date;
+     requestId?: string;
-     errorCode?: string;
+     // (undocumented)
-     etag?: string;
+     version?: string;
-     group?: string;
+ }
-     lastModified?: Date;
+ 
-     leaseDuration?: string;
+ // @public
-     leaseState?: string;
+ export enum PathRenameMode {
-     leaseStatus?: string;
+     // (undocumented)
-     owner?: string;
+     Legacy = "legacy",
-     permissions?: string;
+     // (undocumented)
-     properties?: string;
+     Posix = "posix"
-     requestId?: string;
+ }
-     resourceType?: string;
+ 
-     version?: string;
+ // @public
- }
+ export type PathRenameModeModel = "legacy" | "posix";
- // @public (undocumented)
+ // @public
- export interface PathGetPropertiesOptions extends CommonOptions {
+ export enum PathResourceType {
-     abortSignal?: AbortSignalLike;
+     Directory = "directory",
-     conditions?: DataLakeRequestConditions;
+     File = "file"
-     customerProvidedKey?: CpkInfo;
+ }
- }
+ 
- 
+ // @public
- // @public (undocumented)
+ export type PathResourceTypeModel = "directory" | "file";
- export type PathGetPropertiesResponse = WithResponse<PathGetPropertiesHeaders, PathGetPropertiesHeaders>;
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface PathSetAccessControlHeaders {
- export interface PathHttpHeaders {
+     clientRequestId?: string;
-     // (undocumented)
+     date?: Date;
-     cacheControl?: string;
+     etag?: string;
-     // (undocumented)
+     lastModified?: Date;
-     contentDisposition?: string;
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     contentEncoding?: string;
+ }
-     // (undocumented)
+ 
-     contentLanguage?: string;
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathSetAccessControlOptions extends CommonOptions {
-     contentMD5?: Uint8Array;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     contentType?: string;
+     // (undocumented)
- }
+     conditions?: DataLakeRequestConditions;
- 
+     // (undocumented)
- // @public (undocumented)
+     group?: string;
- export interface PathList {
+     // (undocumented)
-     // (undocumented)
+     owner?: string;
-     pathItems?: Path[];
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public (undocumented)
+ export type PathSetAccessControlResponse = WithResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>;
- export interface PathListModel {
+ 
-     // (undocumented)
+ // @public (undocumented)
-     paths?: PathModel[];
+ export interface PathSetHttpHeadersHeaders {
- }
+     // (undocumented)
- 
+     clientRequestId?: string;
- // @public (undocumented)
+     // (undocumented)
- export interface PathModel {
+     date?: Date;
-     contentLength?: number;
+     etag?: string;
-     creationTime?: string;
+     lastModified?: Date;
-     encryptionContext?: string;
+     requestId?: string;
-     encryptionScope?: string;
+     // (undocumented)
-     // (undocumented)
+     version?: string;
-     etag?: string;
+ }
-     // (undocumented)
+ 
-     expiryTime?: string;
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathSetHttpHeadersOptions extends CommonOptions {
-     group?: string;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     isDirectory?: boolean;
+     // (undocumented)
-     // (undocumented)
+     conditions?: DataLakeRequestConditions;
-     lastModified?: Date;
+ }
-     // (undocumented)
+ 
-     name?: string;
+ // @public (undocumented)
-     // (undocumented)
+ export type PathSetHttpHeadersResponse = WithResponse<PathSetHttpHeadersHeaders, PathSetHttpHeadersHeaders>;
-     owner?: string;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     permissions?: string;
+ export interface PathSetMetadataHeaders {
- }
+     // (undocumented)
- 
+     clientRequestId?: string;
- // @public (undocumented)
+     // (undocumented)
- export interface PathMoveOptions extends CommonOptions {
+     date?: Date;
-     abortSignal?: AbortSignalLike;
+     encryptionKeySha256?: string;
-     conditions?: DataLakeRequestConditions;
+     etag?: string;
-     destinationConditions?: DataLakeRequestConditions;
+     isServerEncrypted?: boolean;
- }
+     // (undocumented)
- 
+     lastModified?: Date;
- // @public (undocumented)
+     // (undocumented)
- export type PathMoveResponse = WithResponse<PathRemoveHeaders, PathRemoveHeaders>;
+     requestId?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     version?: string;
- export interface PathPermissions {
+ }
-     // (undocumented)
+ 
-     extendedAcls: boolean;
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathSetMetadataOptions extends CommonOptions {
-     group: RolePermissions;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     other: RolePermissions;
+     // (undocumented)
-     // (undocumented)
+     conditions?: DataLakeRequestConditions;
-     owner: RolePermissions;
+     customerProvidedKey?: CpkInfo;
-     // (undocumented)
+ }
-     stickyBit: boolean;
+ 
- }
+ // @public (undocumented)
- 
+ export type PathSetMetadataResponse = WithResponse<PathSetMetadataHeaders, PathSetMetadataHeaders>;
- // @public (undocumented)
+ 
- export interface PathRemoveHeaders {
+ // @public (undocumented)
-     // (undocumented)
+ export interface PathSetPermissionsOptions extends CommonOptions {
-     contentLength?: number;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     date?: Date;
+     // (undocumented)
-     // (undocumented)
+     conditions?: DataLakeRequestConditions;
-     etag?: string;
+     // (undocumented)
-     // (undocumented)
+     group?: string;
-     lastModified?: Date;
+     // (undocumented)
-     // (undocumented)
+     owner?: string;
-     requestId?: string;
+ }
-     // (undocumented)
+ 
-     version?: string;
+ // @public (undocumented)
- }
+ export type PathSetPermissionsResponse = WithResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>;
- export enum PathRenameMode {
+ export interface PathUndeleteHeaders {
-     // (undocumented)
+     clientRequestId?: string;
-     Legacy = "legacy",
+     date?: Date;
-     // (undocumented)
+     requestId?: string;
-     Posix = "posix"
+     resourceType?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export type PathRenameModeModel = "legacy" | "posix";
+ // @public
- 
+ export interface PathUpdateHeaders {
- // @public
+     acceptRanges?: string;
- export enum PathResourceType {
+     cacheControl?: string;
-     // (undocumented)
+     contentDisposition?: string;
-     Directory = "directory",
+     contentEncoding?: string;
-     // (undocumented)
+     contentLanguage?: string;
-     File = "file"
+     contentLength?: number;
- }
+     contentMD5?: string;
- 
+     contentRange?: string;
- // @public
+     contentType?: string;
- export type PathResourceTypeModel = "directory" | "file";
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     etag?: string;
- export interface PathSetAccessControlHeaders {
+     lastModified?: Date;
-     clientRequestId?: string;
+     properties?: string;
-     date?: Date;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     lastModified?: Date;
+     xMsContinuation?: string;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ export { Pipeline }
- // @public (undocumented)
+ export { PipelineLike }
- export interface PathSetAccessControlOptions extends CommonOptions {
+ 
-     // (undocumented)
+ export { PipelineOptions }
-     abortSignal?: AbortSignalLike;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     conditions?: DataLakeRequestConditions;
+ export type PublicAccessType = "filesystem" | "file";
-     // (undocumented)
+ 
-     group?: string;
+ // @public (undocumented)
-     // (undocumented)
+ export interface RawAccessPolicy {
-     owner?: string;
+     // (undocumented)
- }
+     expiresOn?: string;
- 
+     // (undocumented)
- // @public (undocumented)
+     permissions: string;
- export type PathSetAccessControlResponse = WithResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>;
+     // (undocumented)
- 
+     startsOn?: string;
- // @public (undocumented)
+ }
- export interface PathSetHttpHeadersHeaders {
+ 
-     // (undocumented)
+ // @public (undocumented)
-     clientRequestId?: string;
+ export interface RemovePathAccessControlItem {
-     // (undocumented)
+     accessControlType: AccessControlType;
-     date?: Date;
+     defaultScope: boolean;
-     // (undocumented)
+     entityId?: string;
-     etag?: string;
+ }
-     // (undocumented)
+ 
-     lastModified?: Date;
+ export { RequestPolicy as IHttpClient }
-     // (undocumented)
+ export { RequestPolicy }
-     requestId?: string;
+ 
-     // (undocumented)
+ export { RequestPolicyFactory }
-     version?: string;
+ 
- }
+ export { RequestPolicyOptions }
- // @public (undocumented)
+ export { RestError }
- export interface PathSetHttpHeadersOptions extends CommonOptions {
+ 
-     // (undocumented)
+ // @public (undocumented)
-     abortSignal?: AbortSignalLike;
+ export interface RolePermissions {
-     conditions?: DataLakeRequestConditions;
+     execute: boolean;
- }
+     // (undocumented)
- 
+     read: boolean;
- // @public (undocumented)
+     // (undocumented)
- export type PathSetHttpHeadersResponse = WithResponse<PathSetHttpHeadersHeaders, PathSetHttpHeadersHeaders>;
+     write: boolean;
- 
+ }
- // @public (undocumented)
+ 
- export interface PathSetMetadataHeaders {
+ export { ServiceClientOptions }
-     // (undocumented)
+ 
-     clientRequestId?: string;
+ // @public
-     // (undocumented)
+ export interface ServiceGenerateAccountSasUrlOptions {
-     date?: Date;
+     encryptionScope?: string;
-     // (undocumented)
+     ipRange?: SasIPRange;
-     encryptionKeySha256?: string;
+     protocol?: SASProtocol;
-     // (undocumented)
+     startsOn?: Date;
-     etag?: string;
+     version?: string;
-     // (undocumented)
+ }
-     isServerEncrypted?: boolean;
+ 
-     // (undocumented)
+ // @public (undocumented)
-     lastModified?: Date;
+ export interface ServiceGetUserDelegationKeyHeaders {
-     requestId?: string;
+     clientRequestId?: string;
-     version?: string;
+     date?: Date;
- }
+     // (undocumented)
- 
+     requestId?: string;
- // @public (undocumented)
+     // (undocumented)
- export interface PathSetMetadataOptions extends CommonOptions {
+     version?: string;
-     // (undocumented)
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     // (undocumented)
+ // @public
-     conditions?: DataLakeRequestConditions;
+ export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
- }
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public (undocumented)
+ 
- export type PathSetMetadataResponse = WithResponse<PathSetMetadataHeaders, PathSetMetadataHeaders>;
+ // @public (undocumented)
- 
+ export type ServiceGetUserDelegationKeyResponse = WithResponse<UserDelegationKey & ServiceGetUserDelegationKeyHeaders, ServiceGetUserDelegationKeyHeaders, UserDelegationKeyModel>;
- // @public (undocumented)
+ 
- export interface PathSetPermissionsOptions extends CommonOptions {
+ export { ServiceListContainersSegmentResponse }
-     // (undocumented)
+ 
-     abortSignal?: AbortSignalLike;
+ // @public (undocumented)
-     // (undocumented)
+ export interface ServiceListFileSystemsOptions extends CommonOptions {
-     conditions?: DataLakeRequestConditions;
+     // (undocumented)
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     group?: string;
+     includeDeleted?: boolean;
-     owner?: string;
+     includeMetadata?: boolean;
- }
+     // (undocumented)
- 
+     prefix?: string;
- // @public (undocumented)
+ }
- export type PathSetPermissionsResponse = WithResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>;
+ 
- 
+ // @public (undocumented)
- // @public
+ export interface ServiceListFileSystemsSegmentHeaders {
- export interface PathUndeleteHeaders {
+     // (undocumented)
-     date?: Date;
+     // (undocumented)
-     resourceType?: string;
+     // (undocumented)
- // @public
+ // @public (undocumented)
- export interface PathUpdateHeaders {
+ export type ServiceListFileSystemsSegmentResponse = WithResponse<ListFileSystemsSegmentResponse & ServiceListFileSystemsSegmentHeaders, ServiceListFileSystemsSegmentHeaders, ListFileSystemsSegmentResponse>;
-     acceptRanges?: string;
+ 
-     cacheControl?: string;
+ // @public
-     contentDisposition?: string;
+ export type ServiceRenameFileSystemOptions = ServiceRenameContainerOptions;
-     contentEncoding?: string;
+ 
-     contentLanguage?: string;
+ // @public
-     contentLength?: number;
+ export interface ServiceUndeleteFileSystemOptions extends CommonOptions {
-     contentMD5?: string;
+     abortSignal?: AbortSignalLike;
-     contentRange?: string;
+     // @deprecated
-     contentType?: string;
+     destinationFileSystemName?: string;
-     date?: Date;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public (undocumented)
-     lastModified?: Date;
+ export interface SignedIdentifier<T> {
-     properties?: string;
+     // (undocumented)
-     requestId?: string;
+     accessPolicy: T;
-     version?: string;
+     // (undocumented)
-     xMsContinuation?: string;
+     id: string;
- export { Pipeline }
+ export { StorageBrowserPolicy }
- export { PipelineLike }
+ export { StorageBrowserPolicyFactory }
- export { PipelineOptions }
+ // @public
- 
+ export enum StorageDataLakeAudience {
- // @public (undocumented)
+     StorageOAuthScopes = "https://storage.azure.com/.default"
- export type PublicAccessType = "filesystem" | "file";
+ }
- // @public (undocumented)
+ // @public
- export interface RawAccessPolicy {
+ export const StorageOAuthScopes: string | string[];
-     // (undocumented)
+ 
-     expiresOn?: string;
+ // @public
-     // (undocumented)
+ export interface StoragePipelineOptions {
-     permissions: string;
+     audience?: string;
-     // (undocumented)
+     httpClient?: RequestPolicy;
-     startsOn?: string;
+     keepAliveOptions?: KeepAliveOptions;
- }
+     proxyOptions?: ProxySettings;
- 
+     retryOptions?: StorageRetryOptions;
- // @public (undocumented)
+     userAgentOptions?: UserAgentPolicyOptions;
- export interface RemovePathAccessControlItem {
+ }
-     accessControlType: AccessControlType;
+ 
-     defaultScope: boolean;
+ export { StorageRetryOptions }
-     entityId?: string;
+ 
- }
+ export { StorageRetryPolicy }
- export { RequestPolicy as IHttpClient }
+ export { StorageRetryPolicyFactory }
- export { RequestPolicy }
+ 
- 
+ export { StorageRetryPolicyType }
- export { RequestPolicyFactory }
+ 
- 
+ // @public (undocumented)
- export { RequestPolicyOptions }
+ export const ToBlobEndpointHostMappings: string[][];
- export { RestError }
+ // @public (undocumented)
- 
+ export const ToDfsEndpointHostMappings: string[][];
- // @public (undocumented)
+ 
- export interface RolePermissions {
+ // @public (undocumented)
-     // (undocumented)
+ export interface UserDelegationKey {
-     execute: boolean;
+     // (undocumented)
-     // (undocumented)
+     signedExpiresOn: Date;
-     read: boolean;
+     // (undocumented)
-     // (undocumented)
+     signedObjectId: string;
-     write: boolean;
+     // (undocumented)
- }
+     signedService: string;
- 
+     // (undocumented)
- // @public
+     signedStartsOn: Date;
- export interface SasIPRange {
+     // (undocumented)
-     end?: string;
+     signedTenantId: string;
-     start: string;
+     // (undocumented)
- }
+     signedVersion: string;
- 
+     // (undocumented)
- // @public
+     value: string;
- export enum SASProtocol {
+ }
-     Https = "https",
+ 
-     HttpsAndHttp = "https,http"
+ export { UserDelegationKeyModel }
- }
+ 
- 
+ export { WebResource }
- // @public
+ 
- export class SASQueryParameters {
+ // (No @packageDocumentation comment for this package)
-     constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, directoryDepth?: number, preauthorizedAgentObjectId?: string, agentObjectId?: string, correlationId?: string, encryptionScope?: string);
+ 
-     constructor(version: string, signature: string, options?: SASQueryParametersOptions);
+ ```
-     readonly agentObjectId?: string;
+ 
-     readonly cacheControl?: string;
+ 
-     readonly contentDisposition?: string;
+ 
-     readonly contentEncoding?: string;
+ 
-     readonly contentLanguage?: string;
+ 
-     readonly contentType?: string;
+ 
-     readonly correlationId?: string;
+ 
-     readonly directoryDepth?: number;
+ 
-     readonly encryptionScope?: string;
+ 
-     readonly expiresOn?: Date;
+ 
-     readonly identifier?: string;
+ 
-     get ipRange(): SasIPRange | undefined;
+ 
-     readonly permissions?: string;
+ 
-     readonly preauthorizedAgentObjectId?: string;
+ 
-     readonly protocol?: SASProtocol;
+ 
-     readonly resource?: string;
+ 
-     readonly resourceTypes?: string;
+ 
-     readonly services?: string;
+ 
-     readonly signature: string;
+ 
-     readonly startsOn?: Date;
+ 
-     toString(): string;
+ 
-     readonly version: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SASQueryParametersOptions {
+ 
-     agentObjectId?: string;
+ 
-     cacheControl?: string;
+ 
-     contentDisposition?: string;
+ 
-     contentEncoding?: string;
+ 
-     contentLanguage?: string;
+ 
-     contentType?: string;
+ 
-     correlationId?: string;
+ 
-     directoryDepth?: number;
+ 
-     encryptionScope?: string;
+ 
-     expiresOn?: Date;
+ 
-     identifier?: string;
+ 
-     ipRange?: SasIPRange;
+ 
-     permissions?: string;
+ 
-     preauthorizedAgentObjectId?: string;
+ 
-     protocol?: SASProtocol;
+ 
-     resource?: string;
+ 
-     resourceTypes?: string;
+ 
-     services?: string;
+ 
-     startsOn?: Date;
+ 
-     userDelegationKey?: UserDelegationKey;
+ 
- }
+ 
- 
+ 
- export { ServiceClientOptions }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGenerateAccountSasUrlOptions {
+ 
-     encryptionScope?: string;
+ 
-     ipRange?: SasIPRange;
+ 
-     protocol?: SASProtocol;
+ 
-     startsOn?: Date;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export interface ServiceGetUserDelegationKeyHeaders {
+ 
-     // (undocumented)
+ 
-     clientRequestId?: string;
+ 
-     // (undocumented)
+ 
-     date?: Date;
+ 
-     // (undocumented)
+ 
-     requestId?: string;
+ 
-     // (undocumented)
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
+ 
-     // (undocumented)
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export type ServiceGetUserDelegationKeyResponse = WithResponse<UserDelegationKey & ServiceGetUserDelegationKeyHeaders, ServiceGetUserDelegationKeyHeaders, UserDelegationKeyModel>;
+ 
- 
+ 
- export { ServiceListContainersSegmentResponse }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export interface ServiceListFileSystemsOptions extends CommonOptions {
+ 
-     // (undocumented)
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     includeDeleted?: boolean;
+ 
-     // (undocumented)
+ 
-     includeMetadata?: boolean;
+ 
-     // (undocumented)
+ 
-     prefix?: string;
+ 
- }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export interface ServiceListFileSystemsSegmentHeaders {
+ 
-     // (undocumented)
+ 
-     clientRequestId?: string;
+ 
-     // (undocumented)
+ 
-     requestId?: string;
+ 
-     // (undocumented)
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export type ServiceListFileSystemsSegmentResponse = WithResponse<ListFileSystemsSegmentResponse & ServiceListFileSystemsSegmentHeaders, ServiceListFileSystemsSegmentHeaders, ListFileSystemsSegmentResponse>;
+ 
- 
+ 
- // @public
+ 
- export type ServiceRenameFileSystemOptions = ServiceRenameContainerOptions;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceUndeleteFileSystemOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     // @deprecated
+ 
-     destinationFileSystemName?: string;
+ 
- }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export interface SignedIdentifier<T> {
+ 
-     // (undocumented)
+ 
-     accessPolicy: T;
+ 
-     // (undocumented)
+ 
-     id: string;
+ 
- }
+ 
- 
+ 
- export { StorageBrowserPolicy }
+ 
- 
+ 
- export { StorageBrowserPolicyFactory }
+ 
- 
+ 
- // @public
+ 
- export enum StorageDataLakeAudience {
+ 
-     StorageOAuthScopes = "https://storage.azure.com/.default"
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export const StorageOAuthScopes: string | string[];
+ 
- 
+ 
- // @public
+ 
- export interface StoragePipelineOptions {
+ 
-     audience?: string;
+ 
-     httpClient?: RequestPolicy;
+ 
-     keepAliveOptions?: KeepAliveOptions;
+ 
-     proxyOptions?: ProxySettings;
+ 
-     retryOptions?: StorageRetryOptions;
+ 
-     userAgentOptions?: UserAgentPolicyOptions;
+ 
- }
+ 
- 
+ 
- export { StorageRetryOptions }
+ 
- 
+ 
- export { StorageRetryPolicy }
+ 
- 
+ 
- export { StorageRetryPolicyFactory }
+ 
- 
+ 
- export { StorageRetryPolicyType }
+ 
- 
+ 
- export { StorageSharedKeyCredential }
+ 
- 
+ 
- export { StorageSharedKeyCredentialPolicy }
+ 
- 
+ 
- // @public (undocumented)
+ 
- export const ToBlobEndpointHostMappings: string[][];
+ 
- 
+ 
- // @public (undocumented)
+ 
- export const ToDfsEndpointHostMappings: string[][];
+ 
- 
+ 
- // @public (undocumented)
+ 
- export interface UserDelegationKey {
+ 
-     // (undocumented)
+ 
-     signedExpiresOn: Date;
+ 
-     // (undocumented)
+ 
-     signedObjectId: string;
+ 
-     // (undocumented)
+ 
-     signedService: string;
+ 
-     // (undocumented)
+ 
-     signedStartsOn: Date;
+ 
-     // (undocumented)
+ 
-     signedTenantId: string;
+ 
-     // (undocumented)
+ 
-     signedVersion: string;
+ 
-     // (undocumented)
+ 
-     value: string;
+ 
- }
+ 
- 
+ 
- export { UserDelegationKeyModel }
+ 
- 
+ 
- export { WebResource }
+ 
- 
+ 
- // (No @packageDocumentation comment for this package)
+ 
- 
+ 
- ```
+ 
```