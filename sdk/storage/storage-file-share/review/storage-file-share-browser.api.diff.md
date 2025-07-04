# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- import * as coreClient from '@azure/core-client';
+ import type { CompatResponse } from '@azure/core-http-compat';
- import * as coreHttpCompat from '@azure/core-http-compat';
+ import * as coreClient from '@azure/core-client';
- import * as coreRestPipeline from '@azure/core-rest-pipeline';
+ import * as coreHttpCompat from '@azure/core-http-compat';
- import { Credential as Credential_2 } from '@azure/storage-blob';
+ import * as coreRestPipeline from '@azure/core-rest-pipeline';
- import { CredentialPolicy } from '@azure/storage-blob';
+ import { Credential as Credential_2 } from '@azure/storage-blob';
- import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
+ import { CredentialPolicy } from '@azure/storage-blob';
- import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
+ import type { HttpHeadersLike } from '@azure/core-http-compat';
- import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
+ import type { KeepAliveOptions } from '@azure/core-http-compat';
- import type { KeepAliveOptions } from '@azure/core-http-compat';
+ import type { OperationTracingOptions } from '@azure/core-tracing';
- import type { OperationTracingOptions } from '@azure/core-tracing';
+ import type { PagedAsyncIterableIterator } from '@azure/core-paging';
- import type { PagedAsyncIterableIterator } from '@azure/core-paging';
+ import type { ProxySettings } from '@azure/core-rest-pipeline';
- import type { ProxySettings } from '@azure/core-rest-pipeline';
+ import type { RequestBodyType } from '@azure/core-rest-pipeline';
- import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
+ import type { RequestPolicyOptionsLike } from '@azure/core-http-compat';
- import { StorageSharedKeyCredential } from '@azure/storage-blob';
+ import type { StorageSharedKeyCredential } from '@azure/storage-blob';
- import { StorageSharedKeyCredentialPolicy } from '@azure/storage-blob';
+ import type { TokenCredential } from '@azure/core-auth';
- import type { TokenCredential } from '@azure/core-auth';
+ import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
- import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
+ import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
- import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
+ import type { WebResourceLike } from '@azure/core-http-compat';
- import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+ 
- 
+ // @public
- // @public
+ export interface AccessPolicy {
- export interface AccessPolicy {
+     expiresOn?: string;
-     expiresOn?: string;
+     permissions?: string;
-     permissions?: string;
+     startsOn?: string;
-     startsOn?: string;
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
+ export interface ClearRange {
-     process: boolean;
+     // (undocumented)
-     read: boolean;
+     end: number;
-     toString(): string;
+     // (undocumented)
-     update: boolean;
+     start: number;
-     write: boolean;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface CloseHandlesInfo {
- export class AccountSASResourceTypes {
+     // (undocumented)
-     container: boolean;
+     closedHandlesCount: number;
-     object: boolean;
+     closeFailureCount?: number;
-     static parse(resourceTypes: string): AccountSASResourceTypes;
+ }
-     service: boolean;
+ 
-     toString(): string;
+ // @public
- }
+ export interface CommonGenerateSasUrlOptions {
- 
+     cacheControl?: string;
- // @public
+     contentDisposition?: string;
- export class AccountSASServices {
+     contentEncoding?: string;
-     blob: boolean;
+     contentLanguage?: string;
-     file: boolean;
+     contentType?: string;
-     static parse(services: string): AccountSASServices;
+     expiresOn?: Date;
-     queue: boolean;
+     identifier?: string;
-     table: boolean;
+     ipRange?: SasIPRange;
-     toString(): string;
+     // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
- }
+     protocol?: SASProtocol;
- 
+     startsOn?: Date;
- // @public
+     version?: string;
- export interface AccountSASSignatureValues {
+ }
-     expiresOn: Date;
+ 
-     ipRange?: SasIPRange;
+ // @public
-     permissions: AccountSASPermissions;
+ export interface CommonOptions {
-     protocol?: SASProtocol;
+     // (undocumented)
-     resourceTypes: string;
+     tracingOptions?: OperationTracingOptions;
-     services: string;
+ }
-     startsOn?: Date;
+ 
-     version?: string;
+ // @public
- }
+ export interface CopyFileSmbInfo {
- 
+     fileAttributes?: string;
- export { AnonymousCredential }
+     fileChangeTime?: string;
- 
+     fileCreationTime?: string;
- export { AnonymousCredentialPolicy }
+     fileLastWriteTime?: string;
- 
+     filePermissionCopyMode?: PermissionCopyModeType;
- export { BaseRequestPolicy }
+     ignoreReadOnly?: boolean;
- 
+     setArchiveAttribute?: boolean;
- // @public (undocumented)
+ }
- export interface ClearRange {
+ 
-     // (undocumented)
+ // @public
-     end: number;
+ export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
-     // (undocumented)
+ 
-     start: number;
+ // @public
- }
+ export interface CorsRule {
- 
+     allowedHeaders: string;
- // @public
+     allowedMethods: string;
- export interface CloseHandlesInfo {
+     allowedOrigins: string;
-     // (undocumented)
+     exposedHeaders: string;
-     closedHandlesCount: number;
+     maxAgeInSeconds: number;
-     closeFailureCount?: number;
+ }
- }
+ 
- 
+ export { Credential_2 as Credential }
- // @public
+ 
- export interface CommonGenerateSasUrlOptions {
+ export { CredentialPolicy }
-     cacheControl?: string;
+ 
-     contentDisposition?: string;
+ // @public
-     contentEncoding?: string;
+ export type DeleteSnapshotsOptionType = "include" | "include-leased";
-     contentLanguage?: string;
+ 
-     contentType?: string;
+ // @public
-     expiresOn?: Date;
+ export interface DirectoryCloseHandlesHeaders {
-     identifier?: string;
+     date?: Date;
-     ipRange?: SasIPRange;
+     marker?: string;
-     protocol?: SASProtocol;
+     requestId?: string;
-     startsOn?: Date;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DirectoryCreateHeaders {
- export interface CommonOptions {
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     tracingOptions?: OperationTracingOptions;
+     etag?: string;
- }
+     fileAttributes?: string;
- 
+     fileChangeOn?: Date;
- // @public
+     fileCreatedOn?: Date;
- export interface CopyFileSmbInfo {
+     fileId?: string;
-     fileAttributes?: string;
+     fileLastWriteOn?: Date;
-     fileChangeTime?: string;
+     fileParentId?: string;
-     fileCreationTime?: string;
+     filePermissionKey?: string;
-     fileLastWriteTime?: string;
+     isServerEncrypted?: boolean;
-     filePermissionCopyMode?: PermissionCopyModeType;
+     lastModified?: Date;
-     ignoreReadOnly?: boolean;
+     // Warning: (ae-forgotten-export) The symbol "FilePosixProperties" needs to be exported by the entry point index.d.ts
-     setArchiveAttribute?: boolean;
+     posixProperties?: FilePosixProperties;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
+ 
- 
+ // @public
- // @public
+ export interface DirectoryCreateIfNotExistsResponse extends DirectoryCreateResponse {
- export interface CorsRule {
+     succeeded: boolean;
-     allowedHeaders: string;
+ }
-     allowedMethods: string;
+ 
-     allowedOrigins: string;
+ // Warning: (ae-forgotten-export) The symbol "FileAndDirectoryCreateCommonOptions" needs to be exported by the entry point index.d.ts
-     exposedHeaders: string;
+ //
-     maxAgeInSeconds: number;
+ // @public
- }
+ export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- export { Credential_2 as Credential }
+     // Warning: (ae-forgotten-export) The symbol "Metadata" needs to be exported by the entry point index.d.ts
- 
+     metadata?: Metadata;
- export { CredentialPolicy }
+ }
- export type DeleteSnapshotsOptionType = "include" | "include-leased";
+ export type DirectoryCreateResponse = WithResponse<DirectoryCreateHeaders, DirectoryCreateHeaders>;
- export interface DirectoryCloseHandlesHeaders {
+ export interface DirectoryDeleteHeaders {
-     marker?: string;
+     errorCode?: string;
- export interface DirectoryCreateHeaders {
+ export interface DirectoryDeleteIfExistsResponse extends DirectoryDeleteResponse {
-     date?: Date;
+     succeeded: boolean;
-     errorCode?: string;
+ }
-     etag?: string;
+ 
-     fileAttributes?: string;
+ // @public
-     fileChangeOn?: Date;
+ export interface DirectoryDeleteOptions extends CommonOptions {
-     fileCreatedOn?: Date;
+     abortSignal?: AbortSignalLike;
-     fileId?: string;
+ }
-     fileLastWriteOn?: Date;
+ 
-     fileParentId?: string;
+ // @public
-     filePermissionKey?: string;
+ export type DirectoryDeleteResponse = WithResponse<DirectoryDeleteHeaders, DirectoryDeleteHeaders>;
-     isServerEncrypted?: boolean;
+ 
-     lastModified?: Date;
+ // @public
-     posixProperties?: FilePosixProperties;
+ export interface DirectoryExistsOptions extends CommonOptions {
-     requestId?: string;
+     abortSignal?: AbortSignalLike;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DirectoryForceCloseHandlesHeaders {
- export interface DirectoryCreateIfNotExistsResponse extends DirectoryCreateResponse {
+     date?: Date;
-     succeeded: boolean;
+     errorCode?: string;
- }
+     marker?: string;
- 
+     numberOfHandlesClosed?: number;
- // @public
+     numberOfHandlesFailedToClose?: number;
- export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
+     requestId?: string;
-     abortSignal?: AbortSignalLike;
+     version?: string;
-     metadata?: Metadata;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DirectoryForceCloseHandlesOptions extends CommonOptions {
- export type DirectoryCreateResponse = WithResponse<DirectoryCreateHeaders, DirectoryCreateHeaders>;
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export interface DirectoryDeleteHeaders {
+ // @public
-     date?: Date;
+ export type DirectoryForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & DirectoryCloseHandlesHeaders, DirectoryForceCloseHandlesHeaders>;
-     errorCode?: string;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export interface DirectoryForceCloseHandlesSegmentOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     recursive?: boolean;
- // @public
+ }
- export interface DirectoryDeleteIfExistsResponse extends DirectoryDeleteResponse {
+ 
-     succeeded: boolean;
+ // @public
- }
+ export interface DirectoryGetPropertiesHeaders {
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface DirectoryDeleteOptions extends CommonOptions {
+     etag?: string;
-     abortSignal?: AbortSignalLike;
+     fileAttributes?: string;
- }
+     fileChangeOn?: Date;
- 
+     fileCreatedOn?: Date;
- // @public
+     fileId?: string;
- export type DirectoryDeleteResponse = WithResponse<DirectoryDeleteHeaders, DirectoryDeleteHeaders>;
+     fileLastWriteOn?: Date;
- 
+     fileParentId?: string;
- // @public
+     filePermissionKey?: string;
- export interface DirectoryExistsOptions extends CommonOptions {
+     isServerEncrypted?: boolean;
-     abortSignal?: AbortSignalLike;
+     lastModified?: Date;
- }
+     metadata?: {
- 
+         [propertyName: string]: string;
- // @public
+     };
- export interface DirectoryForceCloseHandlesHeaders {
+     posixProperties?: FilePosixProperties;
-     date?: Date;
+     requestId?: string;
-     errorCode?: string;
+     version?: string;
-     marker?: string;
+ }
-     numberOfHandlesClosed?: number;
+ 
-     numberOfHandlesFailedToClose?: number;
+ // @public
-     requestId?: string;
+ export interface DirectoryGetPropertiesOptions extends CommonOptions {
-     version?: string;
+     abortSignal?: AbortSignalLike;
- export interface DirectoryForceCloseHandlesOptions extends CommonOptions {
+ export type DirectoryGetPropertiesResponse = WithResponse<DirectoryGetPropertiesHeaders, DirectoryGetPropertiesHeaders>;
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export interface DirectoryItem {
- // @public
+     // (undocumented)
- export type DirectoryForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & DirectoryCloseHandlesHeaders, DirectoryForceCloseHandlesHeaders>;
+     attributes?: string;
- 
+     // (undocumented)
- // @public
+     fileId?: string;
- export interface DirectoryForceCloseHandlesSegmentOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     name: string;
-     recursive?: boolean;
+     // (undocumented)
- }
+     permissionKey?: string;
- 
+     properties?: FileProperty;
- // @public
+ }
- export interface DirectoryGetPropertiesHeaders {
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface DirectoryListFilesAndDirectoriesOptions extends CommonOptions {
-     etag?: string;
+     abortSignal?: AbortSignalLike;
-     fileAttributes?: string;
+     // (undocumented)
-     fileChangeOn?: Date;
+     includeAttributes?: boolean;
-     fileCreatedOn?: Date;
+     // (undocumented)
-     fileId?: string;
+     includeEtag?: boolean;
-     fileLastWriteOn?: Date;
+     includeExtendedInfo?: boolean;
-     fileParentId?: string;
+     // (undocumented)
-     filePermissionKey?: string;
+     includePermissionKey?: boolean;
-     isServerEncrypted?: boolean;
+     // (undocumented)
-     lastModified?: Date;
+     includeTimestamps?: boolean;
-     metadata?: {
+     prefix?: string;
-         [propertyName: string]: string;
+ }
-     };
+ 
-     posixProperties?: FilePosixProperties;
+ // @public
-     requestId?: string;
+ export interface DirectoryListFilesAndDirectoriesSegmentHeaders {
-     version?: string;
+     contentType?: string;
- }
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface DirectoryGetPropertiesOptions extends CommonOptions {
+     version?: string;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type DirectoryListFilesAndDirectoriesSegmentResponse = WithResponse<DirectoryListFilesAndDirectoriesSegmentHeaders & ListFilesAndDirectoriesSegmentResponse, DirectoryListFilesAndDirectoriesSegmentHeaders, ListFilesAndDirectoriesSegmentResponse>;
- export type DirectoryGetPropertiesResponse = WithResponse<DirectoryGetPropertiesHeaders, DirectoryGetPropertiesHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface DirectoryListHandlesHeaders {
- export interface DirectoryItem {
+     contentType?: string;
-     // (undocumented)
+     date?: Date;
-     attributes?: string;
+     errorCode?: string;
-     // (undocumented)
+     requestId?: string;
-     fileId?: string;
+     version?: string;
-     // (undocumented)
+ }
-     name: string;
+ 
-     // (undocumented)
+ // @public
-     permissionKey?: string;
+ export interface DirectoryListHandlesOptions extends CommonOptions {
-     properties?: FileProperty;
+     abortSignal?: AbortSignalLike;
- }
+     recursive?: boolean;
- 
+ }
- // @public
+ 
- export interface DirectoryListFilesAndDirectoriesOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export type DirectoryListHandlesResponse = WithResponse<DirectoryListHandlesHeaders & ListHandlesResponse, DirectoryListHandlesHeaders, ListHandlesResponse>;
-     // (undocumented)
+ 
-     includeAttributes?: boolean;
+ // @public
-     // (undocumented)
+ export interface DirectoryListHandlesSegmentOptions extends CommonOptions {
-     includeEtag?: boolean;
+     abortSignal?: AbortSignalLike;
-     includeExtendedInfo?: boolean;
+     maxResults?: number;
-     // (undocumented)
+     recursive?: boolean;
-     includePermissionKey?: boolean;
+ }
-     // (undocumented)
+ 
-     includeTimestamps?: boolean;
+ // Warning: (ae-forgotten-export) The symbol "FileAndDirectorySetPropertiesCommonOptions" needs to be exported by the entry point index.d.ts
-     prefix?: string;
+ //
- }
+ // @public (undocumented)
- 
+ export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface DirectoryListFilesAndDirectoriesSegmentHeaders {
+ }
-     contentType?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface DirectoryRenameHeaders {
-     requestId?: string;
+     date?: Date;
-     version?: string;
+     etag?: string;
- }
+     fileAttributes?: string;
- 
+     fileChangeTime?: Date;
- // @public
+     fileCreationTime?: Date;
- export type DirectoryListFilesAndDirectoriesSegmentResponse = WithResponse<DirectoryListFilesAndDirectoriesSegmentHeaders & ListFilesAndDirectoriesSegmentResponse, DirectoryListFilesAndDirectoriesSegmentHeaders, ListFilesAndDirectoriesSegmentResponse>;
+     fileId?: string;
- 
+     fileLastWriteTime?: Date;
- // @public
+     fileParentId?: string;
- export interface DirectoryListHandlesHeaders {
+     filePermissionKey?: string;
-     contentType?: string;
+     isServerEncrypted?: boolean;
-     date?: Date;
+     lastModified?: Date;
-     errorCode?: string;
+     requestId?: string;
-     requestId?: string;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface DirectoryRenameOptions extends CommonOptions {
- export interface DirectoryListHandlesOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+     copyFileSmbInfo?: CopyFileSmbInfo;
-     recursive?: boolean;
+     destinationLeaseAccessConditions?: LeaseAccessConditions;
- }
+     filePermission?: string;
- 
+     filePermissionFormat?: FilePermissionFormat;
- // @public
+     filePermissionKey?: string;
- export type DirectoryListHandlesResponse = WithResponse<DirectoryListHandlesHeaders & ListHandlesResponse, DirectoryListHandlesHeaders, ListHandlesResponse>;
+     ignoreReadOnly?: boolean;
- 
+     metadata?: Metadata;
- // @public
+     replaceIfExists?: boolean;
- export interface DirectoryListHandlesSegmentOptions extends CommonOptions {
+     sourceLeaseAccessConditions?: LeaseAccessConditions;
-     abortSignal?: AbortSignalLike;
+     timeoutInSeconds?: number;
-     maxResults?: number;
+ }
-     recursive?: boolean;
+ 
- }
+ // @public
- 
+ export type DirectoryRenameResponse = WithResponse<DirectoryRenameHeaders, DirectoryRenameHeaders>;
- // @public (undocumented)
+ 
- export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface DirectorySetMetadataHeaders {
- }
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     etag?: string;
- export interface DirectoryRenameHeaders {
+     isServerEncrypted?: boolean;
-     date?: Date;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     fileAttributes?: string;
+ }
-     fileChangeTime?: Date;
+ 
-     fileCreationTime?: Date;
+ // @public
-     fileId?: string;
+ export interface DirectorySetMetadataOptions extends CommonOptions {
-     fileLastWriteTime?: Date;
+     abortSignal?: AbortSignalLike;
-     fileParentId?: string;
+ }
-     filePermissionKey?: string;
+ 
-     isServerEncrypted?: boolean;
+ // @public
-     lastModified?: Date;
+ export type DirectorySetMetadataResponse = WithResponse<DirectorySetMetadataHeaders, DirectorySetMetadataHeaders>;
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface DirectorySetPropertiesHeaders {
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface DirectoryRenameOptions extends CommonOptions {
+     etag?: string;
-     abortSignal?: AbortSignalLike;
+     fileAttributes?: string;
-     copyFileSmbInfo?: CopyFileSmbInfo;
+     fileChangeOn?: Date;
-     destinationLeaseAccessConditions?: LeaseAccessConditions;
+     fileCreatedOn?: Date;
-     filePermission?: string;
+     fileId?: string;
-     filePermissionFormat?: FilePermissionFormat;
+     fileLastWriteOn?: Date;
-     filePermissionKey?: string;
+     fileParentId?: string;
-     ignoreReadOnly?: boolean;
+     filePermissionKey?: string;
-     metadata?: Metadata;
+     isServerEncrypted?: boolean;
-     replaceIfExists?: boolean;
+     lastModified?: Date;
-     sourceLeaseAccessConditions?: LeaseAccessConditions;
+     posixProperties?: FilePosixProperties;
-     timeoutInSeconds?: number;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export type DirectoryRenameResponse = WithResponse<DirectoryRenameHeaders, DirectoryRenameHeaders>;
+ // @public
- 
+ export type DirectorySetPropertiesResponse = WithResponse<DirectorySetPropertiesHeaders, DirectorySetPropertiesHeaders>;
- // @public
+ 
- export interface DirectorySetMetadataHeaders {
+ // @public
-     date?: Date;
+ export interface FileAbortCopyFromURLOptions extends CommonOptions {
-     errorCode?: string;
+     abortSignal?: AbortSignalLike;
-     etag?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     isServerEncrypted?: boolean;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface FileAbortCopyHeaders {
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface DirectorySetMetadataOptions extends CommonOptions {
+     requestId?: string;
-     abortSignal?: AbortSignalLike;
+     version?: string;
- export type DirectorySetMetadataResponse = WithResponse<DirectorySetMetadataHeaders, DirectorySetMetadataHeaders>;
+ export type FileAbortCopyResponse = WithResponse<FileAbortCopyHeaders, FileAbortCopyHeaders>;
- export interface DirectorySetPropertiesHeaders {
+ export type FileAttributesPreserveType = "preserve";
-     date?: Date;
+ 
-     errorCode?: string;
+ // @public
-     etag?: string;
+ export interface FileClearRangeOptions extends CommonOptions {
-     fileAttributes?: string;
+     abortSignal?: AbortSignalLike;
-     fileChangeOn?: Date;
+     fileLastWrittenMode?: FileLastWrittenMode;
-     fileCreatedOn?: Date;
+     leaseAccessConditions?: LeaseAccessConditions;
-     fileId?: string;
+ }
-     fileLastWriteOn?: Date;
+ 
-     fileParentId?: string;
+ // @public
-     filePermissionKey?: string;
+ export interface FileCloseHandlesHeaders {
-     isServerEncrypted?: boolean;
+     date?: Date;
-     lastModified?: Date;
+     marker?: string;
-     posixProperties?: FilePosixProperties;
+     requestId?: string;
-     requestId?: string;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface FileCreateHardLinkHeaders {
- export type DirectorySetPropertiesResponse = WithResponse<DirectorySetPropertiesHeaders, DirectorySetPropertiesHeaders>;
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     etag?: string;
- export interface FileAbortCopyFromURLOptions extends CommonOptions {
+     fileChangeTime?: Date;
-     abortSignal?: AbortSignalLike;
+     fileCreationTime?: Date;
-     leaseAccessConditions?: LeaseAccessConditions;
+     fileId?: string;
- }
+     fileLastWriteTime?: Date;
- 
+     fileParentId?: string;
- // @public
+     lastModified?: Date;
- export interface FileAbortCopyHeaders {
+     posixProperties?: FilePosixProperties;
-     date?: Date;
+     requestId?: string;
-     errorCode?: string;
+     version?: string;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export interface FileCreateHardLinkOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type FileAbortCopyResponse = WithResponse<FileAbortCopyHeaders, FileAbortCopyHeaders>;
+     leaseAccessConditions?: LeaseAccessConditions;
- 
+ }
- // @public (undocumented)
+ 
- export interface FileAndDirectoryCreateCommonOptions {
+ // @public
-     changeTime?: Date | TimeNowType;
+ export type FileCreateHardLinkResponse = WithResponse<FileCreateHardLinkHeaders, FileCreateHardLinkHeaders>;
-     creationTime?: Date | TimeNowType;
+ 
-     fileAttributes?: FileSystemAttributes;
+ // @public
-     filePermission?: string | FilePermissionInheritType;
+ export interface FileCreateHeaders {
-     filePermissionFormat?: FilePermissionFormat;
+     date?: Date;
-     filePermissionKey?: string;
+     errorCode?: string;
-     lastWriteTime?: Date | TimeNowType;
+     etag?: string;
-     posixProperties?: FilePosixProperties;
+     fileAttributes?: string;
- }
+     fileChangeOn?: Date;
- 
+     fileCreatedOn?: Date;
- // @public (undocumented)
+     fileId?: string;
- export interface FileAndDirectorySetPropertiesCommonOptions {
+     fileLastWriteOn?: Date;
-     changeTime?: Date | TimeNowType;
+     fileParentId?: string;
-     creationTime?: Date | TimeNowType | TimePreserveType;
+     filePermissionKey?: string;
-     fileAttributes?: FileSystemAttributes | FileAttributesPreserveType;
+     isServerEncrypted?: boolean;
-     filePermission?: string | FilePermissionInheritType | FilePermissionPreserveType;
+     lastModified?: Date;
-     filePermissionFormat?: FilePermissionFormat;
+     posixProperties?: FilePosixProperties;
-     filePermissionKey?: string;
+     requestId?: string;
-     lastWriteTime?: Date | TimeNowType | TimePreserveType;
+     version?: string;
-     posixProperties?: FilePosixProperties;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
- export type FileAttributesPreserveType = "preserve";
+     abortSignal?: AbortSignalLike;
- 
+     // Warning: (ae-forgotten-export) The symbol "FileHttpHeaders_2" needs to be exported by the entry point index.d.ts
- // @public
+     fileHttpHeaders?: FileHttpHeaders_2;
- export interface FileClearRangeOptions extends CommonOptions {
+     leaseAccessConditions?: LeaseAccessConditions;
-     abortSignal?: AbortSignalLike;
+     metadata?: Metadata;
-     fileLastWrittenMode?: FileLastWrittenMode;
+ }
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ // @public
- 
+ export type FileCreateResponse = WithResponse<FileCreateHeaders, FileCreateHeaders>;
- // @public
+ 
- export interface FileCloseHandlesHeaders {
+ // @public
-     date?: Date;
+ export interface FileCreateSymbolicLinkHeaders {
-     marker?: string;
+     clientRequestId?: string;
-     requestId?: string;
+     date?: Date;
-     version?: string;
+     etag?: string;
- }
+     fileChangeTime?: Date;
- 
+     fileCreationTime?: Date;
- // @public
+     fileId?: string;
- export interface FileCreateHardLinkHeaders {
+     fileLastWriteTime?: Date;
-     clientRequestId?: string;
+     fileParentId?: string;
-     date?: Date;
+     lastModified?: Date;
-     etag?: string;
+     posixProperties?: FilePosixProperties;
-     fileChangeTime?: Date;
+     requestId?: string;
-     fileCreationTime?: Date;
+     version?: string;
-     fileId?: string;
+ }
-     fileLastWriteTime?: Date;
+ 
-     fileParentId?: string;
+ // @public
-     lastModified?: Date;
+ export interface FileCreateSymbolicLinkOptions extends CommonOptions {
-     posixProperties?: FilePosixProperties;
+     abortSignal?: AbortSignalLike;
-     requestId?: string;
+     creationTime?: Date | TimeNowType;
-     version?: string;
+     group?: string;
- }
+     lastWriteTime?: Date | TimeNowType;
- 
+     leaseAccessConditions?: LeaseAccessConditions;
- // @public
+     metadata?: Metadata;
- export interface FileCreateHardLinkOptions extends CommonOptions {
+     owner?: string;
-     abortSignal?: AbortSignalLike;
+ }
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ // @public
- 
+ export type FileCreateSymbolicLinkResponse = WithResponse<FileCreateSymbolicLinkHeaders, FileCreateSymbolicLinkHeaders>;
- // @public
+ 
- export type FileCreateHardLinkResponse = WithResponse<FileCreateHardLinkHeaders, FileCreateHardLinkHeaders>;
+ // @public
- 
+ export interface FileDeleteHeaders {
- // @public
+     date?: Date;
- export interface FileCreateHeaders {
+     errorCode?: string;
-     date?: Date;
+     linkCount?: number;
-     errorCode?: string;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     fileAttributes?: string;
+ }
-     fileChangeOn?: Date;
+ 
-     fileCreatedOn?: Date;
+ // @public
-     fileId?: string;
+ export interface FileDeleteIfExistsResponse extends FileDeleteResponse {
-     fileLastWriteOn?: Date;
+     succeeded: boolean;
-     fileParentId?: string;
+ }
-     filePermissionKey?: string;
+ 
-     isServerEncrypted?: boolean;
+ // @public
-     lastModified?: Date;
+ export interface FileDeleteOptions extends CommonOptions {
-     posixProperties?: FilePosixProperties;
+     abortSignal?: AbortSignalLike;
-     requestId?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type FileDeleteResponse = WithResponse<FileDeleteHeaders, FileDeleteHeaders>;
- export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     fileHttpHeaders?: FileHttpHeaders;
+ export interface FileDownloadHeaders {
-     leaseAccessConditions?: LeaseAccessConditions;
+     acceptRanges?: string;
-     metadata?: Metadata;
+     cacheControl?: string;
- }
+     contentDisposition?: string;
- 
+     contentEncoding?: string;
- // @public
+     contentLanguage?: string;
- export type FileCreateResponse = WithResponse<FileCreateHeaders, FileCreateHeaders>;
+     contentLength?: number;
- 
+     contentMD5?: Uint8Array;
- // @public
+     contentRange?: string;
- export interface FileCreateSymbolicLinkHeaders {
+     contentType?: string;
-     clientRequestId?: string;
+     copyCompletedOn?: Date;
-     date?: Date;
+     copyId?: string;
-     etag?: string;
+     copyProgress?: string;
-     fileChangeTime?: Date;
+     copySource?: string;
-     fileCreationTime?: Date;
+     copyStatus?: CopyStatusType;
-     fileId?: string;
+     copyStatusDescription?: string;
-     fileLastWriteTime?: Date;
+     date?: Date;
-     fileParentId?: string;
+     errorCode?: string;
-     lastModified?: Date;
+     etag?: string;
-     posixProperties?: FilePosixProperties;
+     fileAttributes?: string;
-     requestId?: string;
+     fileChangeOn?: Date;
-     version?: string;
+     fileContentMD5?: Uint8Array;
- }
+     fileCreatedOn?: Date;
- 
+     fileId?: string;
- // @public
+     fileLastWriteOn?: Date;
- export interface FileCreateSymbolicLinkOptions extends CommonOptions {
+     fileParentId?: string;
-     abortSignal?: AbortSignalLike;
+     filePermissionKey?: string;
-     creationTime?: Date | TimeNowType;
+     isServerEncrypted?: boolean;
-     group?: string;
+     lastModified?: Date;
-     lastWriteTime?: Date | TimeNowType;
+     leaseDuration?: LeaseDurationType;
-     leaseAccessConditions?: LeaseAccessConditions;
+     leaseState?: LeaseStateType;
-     metadata?: Metadata;
+     leaseStatus?: LeaseStatusType;
-     owner?: string;
+     metadata?: {
- }
+         [propertyName: string]: string;
- 
+     };
- // @public
+     posixProperties?: FilePosixProperties;
- export type FileCreateSymbolicLinkResponse = WithResponse<FileCreateSymbolicLinkHeaders, FileCreateSymbolicLinkHeaders>;
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface FileDeleteHeaders {
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface FileDownloadOptionalParams extends coreClient.OperationOptions {
-     linkCount?: number;
+     allowTrailingDot?: boolean;
-     requestId?: string;
+     fileRequestIntent?: ShareTokenIntent;
-     version?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
- }
+     range?: string;
- 
+     rangeGetContentMD5?: boolean;
- // @public
+     timeoutInSeconds?: number;
- export interface FileDeleteIfExistsResponse extends FileDeleteResponse {
+ }
-     succeeded: boolean;
+ 
- }
+ // @public
- 
+ export interface FileDownloadOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface FileDeleteOptions extends CommonOptions {
+     leaseAccessConditions?: LeaseAccessConditions;
-     abortSignal?: AbortSignalLike;
+     maxRetryRequests?: number;
-     leaseAccessConditions?: LeaseAccessConditions;
+     onProgress?: (progress: TransferProgressEvent) => void;
- }
+     rangeGetContentMD5?: boolean;
- 
+ }
- // @public
+ 
- export type FileDeleteResponse = WithResponse<FileDeleteHeaders, FileDeleteHeaders>;
+ // @public
- 
+ export type FileDownloadResponseModel = WithResponse<RawFileDownloadResponse, FileDownloadHeaders>;
- // @public
+ 
- export interface FileDownloadHeaders {
+ // @public
-     acceptRanges?: string;
+ export interface FileDownloadToBufferOptions extends CommonOptions {
-     cacheControl?: string;
+     abortSignal?: AbortSignalLike;
-     contentDisposition?: string;
+     concurrency?: number;
-     contentEncoding?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     contentLanguage?: string;
+     maxRetryRequestsPerRange?: number;
-     contentLength?: number;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     contentMD5?: Uint8Array;
+     rangeSize?: number;
-     contentRange?: string;
+ }
-     contentType?: string;
+ 
-     copyCompletedOn?: Date;
+ // @public
-     copyId?: string;
+ export interface FileExistsOptions extends CommonOptions {
-     copyProgress?: string;
+     abortSignal?: AbortSignalLike;
-     copySource?: string;
+ }
-     copyStatus?: CopyStatusType;
+ 
-     copyStatusDescription?: string;
+ // @public
-     date?: Date;
+ export interface FileForceCloseHandlesHeaders {
-     errorCode?: string;
+     date?: Date;
-     etag?: string;
+     errorCode?: string;
-     fileAttributes?: string;
+     marker?: string;
-     fileChangeOn?: Date;
+     numberOfHandlesClosed?: number;
-     fileContentMD5?: Uint8Array;
+     numberOfHandlesFailedToClose?: number;
-     fileCreatedOn?: Date;
+     requestId?: string;
-     fileId?: string;
+     version?: string;
-     fileLastWriteOn?: Date;
+ }
-     fileParentId?: string;
+ 
-     filePermissionKey?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface FileForceCloseHandlesOptions extends CommonOptions {
-     lastModified?: Date;
+     abortSignal?: AbortSignalLike;
-     leaseDuration?: LeaseDurationType;
+ }
-     leaseState?: LeaseStateType;
+ 
-     leaseStatus?: LeaseStatusType;
+ // @public
-     metadata?: {
+ export type FileForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & FileCloseHandlesHeaders, FileForceCloseHandlesHeaders>;
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     posixProperties?: FilePosixProperties;
+ export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
-     requestId?: string;
+     // Warning: (ae-forgotten-export) The symbol "FileSASPermissions" needs to be exported by the entry point index.d.ts
-     version?: string;
+     permissions?: FileSASPermissions;
- export interface FileDownloadOptionalParams extends coreClient.OperationOptions {
+ export interface FileGetPropertiesHeaders {
-     allowTrailingDot?: boolean;
+     cacheControl?: string;
-     fileRequestIntent?: ShareTokenIntent;
+     contentDisposition?: string;
-     leaseAccessConditions?: LeaseAccessConditions;
+     contentEncoding?: string;
-     range?: string;
+     contentLanguage?: string;
-     rangeGetContentMD5?: boolean;
+     contentLength?: number;
-     timeoutInSeconds?: number;
+     contentMD5?: Uint8Array;
- }
+     contentType?: string;
- 
+     copyCompletedOn?: Date;
- // @public
+     copyId?: string;
- export interface FileDownloadOptions extends CommonOptions {
+     copyProgress?: string;
-     abortSignal?: AbortSignalLike;
+     copySource?: string;
-     leaseAccessConditions?: LeaseAccessConditions;
+     copyStatus?: CopyStatusType;
-     maxRetryRequests?: number;
+     copyStatusDescription?: string;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     date?: Date;
-     rangeGetContentMD5?: boolean;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     fileAttributes?: string;
- // @public
+     fileChangeOn?: Date;
- export type FileDownloadResponseModel = WithResponse<RawFileDownloadResponse, FileDownloadHeaders>;
+     fileCreatedOn?: Date;
- 
+     fileId?: string;
- // @public
+     fileLastWriteOn?: Date;
- export interface FileDownloadToBufferOptions extends CommonOptions {
+     fileParentId?: string;
-     abortSignal?: AbortSignalLike;
+     filePermissionKey?: string;
-     concurrency?: number;
+     fileType?: string;
-     leaseAccessConditions?: LeaseAccessConditions;
+     isServerEncrypted?: boolean;
-     maxRetryRequestsPerRange?: number;
+     lastModified?: Date;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     leaseDuration?: LeaseDurationType;
-     rangeSize?: number;
+     leaseState?: LeaseStateType;
- }
+     leaseStatus?: LeaseStatusType;
- 
+     metadata?: {
- // @public
+         [propertyName: string]: string;
- export interface FileExistsOptions extends CommonOptions {
+     };
-     abortSignal?: AbortSignalLike;
+     posixProperties?: FilePosixProperties;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface FileForceCloseHandlesHeaders {
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface FileGetPropertiesOptions extends CommonOptions {
-     marker?: string;
+     abortSignal?: AbortSignalLike;
-     numberOfHandlesClosed?: number;
+     leaseAccessConditions?: LeaseAccessConditions;
-     numberOfHandlesFailedToClose?: number;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export type FileGetPropertiesResponse = WithResponse<FileGetPropertiesHeaders, FileGetPropertiesHeaders>;
- export interface FileForceCloseHandlesOptions extends CommonOptions {
+ export type FileGetRangeListDiffResponse = WithResponse<FileGetRangeListHeaders & ShareFileRangeList, FileGetRangeListHeaders, ShareFileRangeList>;
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export interface FileGetRangeListHeaders {
- // @public
+     date?: Date;
- export type FileForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & FileCloseHandlesHeaders, FileForceCloseHandlesHeaders>;
+     errorCode?: string;
- 
+     etag?: string;
- // @public
+     fileContentLength?: number;
- export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     lastModified?: Date;
-     permissions?: FileSASPermissions;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface FileGetPropertiesHeaders {
+ // @public
-     cacheControl?: string;
+ export interface FileGetRangeListOptions extends CommonOptions {
-     contentDisposition?: string;
+     abortSignal?: AbortSignalLike;
-     contentEncoding?: string;
+     includeRenames?: boolean;
-     contentLanguage?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     contentLength?: number;
+     range?: Range_2;
-     contentMD5?: Uint8Array;
+ }
-     contentType?: string;
+ 
-     copyCompletedOn?: Date;
+ // @public
-     copyId?: string;
+ export type FileGetRangeListResponse = WithResponse<FileGetRangeListHeaders & {
-     copyProgress?: string;
+     rangeList: RangeModel[];
-     copySource?: string;
+ }, FileGetRangeListHeaders, RangeModel[]>;
-     copyStatus?: CopyStatusType;
+ 
-     copyStatusDescription?: string;
+ // @public
-     date?: Date;
+ export interface FileGetSymbolicLinkHeaders {
-     errorCode?: string;
+     clientRequestId?: string;
-     etag?: string;
+     date?: Date;
-     fileAttributes?: string;
+     etag?: string;
-     fileChangeOn?: Date;
+     lastModified?: Date;
-     fileCreatedOn?: Date;
+     linkText?: string;
-     fileId?: string;
+     requestId?: string;
-     fileLastWriteOn?: Date;
+     version?: string;
-     fileParentId?: string;
+ }
-     filePermissionKey?: string;
+ 
-     fileType?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface FileGetSymbolicLinkOptions extends CommonOptions {
-     lastModified?: Date;
+     abortSignal?: AbortSignalLike;
-     leaseDuration?: LeaseDurationType;
+ }
-     leaseState?: LeaseStateType;
+ 
-     leaseStatus?: LeaseStatusType;
+ // @public
-     metadata?: {
+ export type FileGetSymbolicLinkResponse = WithResponse<FileGetSymbolicLinkHeaders, FileGetSymbolicLinkHeaders>;
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     posixProperties?: FilePosixProperties;
+ export interface FileItem {
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     attributes?: string;
- }
+     // (undocumented)
- 
+     fileId?: string;
- // @public
+     // (undocumented)
- export interface FileGetPropertiesOptions extends CommonOptions {
+     name: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     leaseAccessConditions?: LeaseAccessConditions;
+     permissionKey?: string;
- }
+     properties: FileProperty;
- 
+ }
- // @public
+ 
- export type FileGetPropertiesResponse = WithResponse<FileGetPropertiesHeaders, FileGetPropertiesHeaders>;
+ // @public
- 
+ export type FileLastWrittenMode = "Now" | "Preserve";
- // @public
+ 
- export type FileGetRangeListDiffResponse = WithResponse<FileGetRangeListHeaders & ShareFileRangeList, FileGetRangeListHeaders, ShareFileRangeList>;
+ // @public
- 
+ export interface FileListHandlesHeaders {
- // @public
+     contentType?: string;
- export interface FileGetRangeListHeaders {
+     date?: Date;
-     date?: Date;
+     errorCode?: string;
-     errorCode?: string;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     fileContentLength?: number;
+ }
-     lastModified?: Date;
+ 
-     requestId?: string;
+ // @public (undocumented)
-     version?: string;
+ export interface FileListHandlesOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export interface FileGetRangeListOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export type FileListHandlesResponse = WithResponse<FileListHandlesHeaders & ListHandlesResponse, FileListHandlesHeaders, ListHandlesResponse>;
-     includeRenames?: boolean;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ // @public
-     range?: Range_2;
+ export interface FileListHandlesSegmentOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     maxPageSize?: number;
- // @public
+ }
- export type FileGetRangeListResponse = WithResponse<FileGetRangeListHeaders & {
+ 
-     rangeList: RangeModel[];
+ // @public
- }, FileGetRangeListHeaders, RangeModel[]>;
+ export interface FileParallelUploadOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     concurrency?: number;
- export interface FileGetSymbolicLinkHeaders {
+     fileHttpHeaders?: FileHttpHeaders_2;
-     clientRequestId?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     date?: Date;
+     metadata?: Metadata;
-     etag?: string;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     lastModified?: Date;
+     rangeSize?: number;
-     linkText?: string;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export type FilePermissionFormat = "Sddl" | "Binary";
- export interface FileGetSymbolicLinkOptions extends CommonOptions {
+ export type FilePermissionInheritType = "inherit";
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export type FilePermissionPreserveType = "preserve";
- // @public
+ 
- export type FileGetSymbolicLinkResponse = WithResponse<FileGetSymbolicLinkHeaders, FileGetSymbolicLinkHeaders>;
+ // @public (undocumented)
- 
+ export interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
- // @public (undocumented)
+     abortSignal?: AbortSignalLike;
- export interface FileHttpHeaders {
+     fileHttpHeaders?: FileHttpHeaders_2;
-     fileCacheControl?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     fileContentDisposition?: string;
+ }
-     fileContentEncoding?: string;
+ 
-     fileContentLanguage?: string;
+ // @public
-     fileContentMD5?: Uint8Array;
+ export interface FileProperty {
-     fileContentType?: string;
+     // (undocumented)
- }
+     changeTime?: Date;
- 
+     contentLength: number;
- // @public
+     // (undocumented)
- export interface FileItem {
+     creationTime?: Date;
-     attributes?: string;
+     etag?: string;
-     fileId?: string;
+     lastAccessTime?: Date;
-     name: string;
+     lastModified?: Date;
-     permissionKey?: string;
+     lastWriteTime?: Date;
-     properties: FileProperty;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface FileRenameHeaders {
- export type FileLastWrittenMode = "Now" | "Preserve";
+     date?: Date;
- 
+     etag?: string;
- // @public
+     fileAttributes?: string;
- export interface FileListHandlesHeaders {
+     fileChangeTime?: Date;
-     contentType?: string;
+     fileCreationTime?: Date;
-     date?: Date;
+     fileId?: string;
-     errorCode?: string;
+     fileLastWriteTime?: Date;
-     requestId?: string;
+     fileParentId?: string;
-     version?: string;
+     filePermissionKey?: string;
- }
+     isServerEncrypted?: boolean;
- 
+     lastModified?: Date;
- // @public (undocumented)
+     requestId?: string;
- export interface FileListHandlesOptions extends CommonOptions {
+     version?: string;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface FileRenameOptions extends CommonOptions {
- export type FileListHandlesResponse = WithResponse<FileListHandlesHeaders & ListHandlesResponse, FileListHandlesHeaders, ListHandlesResponse>;
+     abortSignal?: AbortSignalLike;
- 
+     contentType?: string;
- // @public
+     copyFileSmbInfo?: CopyFileSmbInfo;
- export interface FileListHandlesSegmentOptions extends CommonOptions {
+     destinationLeaseAccessConditions?: LeaseAccessConditions;
-     abortSignal?: AbortSignalLike;
+     filePermission?: string;
-     maxPageSize?: number;
+     filePermissionFormat?: FilePermissionFormat;
- }
+     filePermissionKey?: string;
- 
+     ignoreReadOnly?: boolean;
- // @public
+     metadata?: Metadata;
- export interface FileParallelUploadOptions extends CommonOptions {
+     replaceIfExists?: boolean;
-     abortSignal?: AbortSignalLike;
+     sourceLeaseAccessConditions?: LeaseAccessConditions;
-     concurrency?: number;
+     timeoutInSeconds?: number;
-     fileHttpHeaders?: FileHttpHeaders;
+ }
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
-     metadata?: Metadata;
+ // @public
-     onProgress?: (progress: TransferProgressEvent) => void;
+ export type FileRenameResponse = WithResponse<FileRenameHeaders, FileRenameHeaders>;
-     rangeSize?: number;
+ 
- }
+ // @public
- 
+ export interface FileResizeOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type FilePermissionFormat = "Sddl" | "Binary";
+     leaseAccessConditions?: LeaseAccessConditions;
- 
+ }
- // @public
+ 
- export type FilePermissionInheritType = "inherit";
+ // @public
- 
+ export interface FilesAndDirectoriesListSegment {
- // @public
+     // (undocumented)
- export type FilePermissionPreserveType = "preserve";
+     directoryItems: DirectoryItem[];
- 
+     // (undocumented)
- // @public
+     fileItems: FileItem[];
- export interface FilePosixProperties {
+ }
-     fileMode?: NfsFileMode;
+ 
-     fileType?: NfsFileType;
+ // @public
-     group?: string;
+ export interface FileServiceProperties {
-     linkCount?: number;
+     cors?: CorsRule[];
-     owner?: string;
+     hourMetrics?: Metrics;
- }
+     minuteMetrics?: Metrics;
- 
+     protocol?: ShareProtocolSettings;
- // @public (undocumented)
+ }
- export interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     fileHttpHeaders?: FileHttpHeaders;
+ export interface FileSetHTTPHeadersHeaders {
-     leaseAccessConditions?: LeaseAccessConditions;
+     date?: Date;
- }
+     errorCode?: string;
- 
+     etag?: string;
- // @public
+     fileAttributes?: string;
- export interface FileProperty {
+     fileChangeOn?: Date;
-     // (undocumented)
+     fileCreatedOn?: Date;
-     changeTime?: Date;
+     fileId?: string;
-     contentLength: number;
+     fileLastWriteOn?: Date;
-     // (undocumented)
+     fileParentId?: string;
-     creationTime?: Date;
+     filePermissionKey?: string;
-     // (undocumented)
+     isServerEncrypted?: boolean;
-     etag?: string;
+     lastModified?: Date;
-     // (undocumented)
+     posixProperties?: FilePosixProperties;
-     lastAccessTime?: Date;
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     lastModified?: Date;
+ }
-     // (undocumented)
+ 
-     lastWriteTime?: Date;
+ // @public
- }
+ export interface FileSetHttpHeadersOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     leaseAccessConditions?: LeaseAccessConditions;
- export interface FileRenameHeaders {
+ }
-     date?: Date;
+ 
-     etag?: string;
+ // @public
-     fileAttributes?: string;
+ export type FileSetHTTPHeadersResponse = WithResponse<FileSetHTTPHeadersHeaders, FileSetHTTPHeadersHeaders>;
-     fileChangeTime?: Date;
+ 
-     fileCreationTime?: Date;
+ // @public
-     fileId?: string;
+ export interface FileSetMetadataHeaders {
-     fileLastWriteTime?: Date;
+     date?: Date;
-     fileParentId?: string;
+     errorCode?: string;
-     filePermissionKey?: string;
+     etag?: string;
-     lastModified?: Date;
+     requestId?: string;
-     requestId?: string;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface FileSetMetadataOptions extends CommonOptions {
- export interface FileRenameOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+     leaseAccessConditions?: LeaseAccessConditions;
-     contentType?: string;
+ }
-     copyFileSmbInfo?: CopyFileSmbInfo;
+ 
-     destinationLeaseAccessConditions?: LeaseAccessConditions;
+ // @public
-     filePermission?: string;
+ export type FileSetMetadataResponse = WithResponse<FileSetMetadataHeaders, FileSetMetadataHeaders>;
-     filePermissionFormat?: FilePermissionFormat;
+ 
-     filePermissionKey?: string;
+ // @public
-     ignoreReadOnly?: boolean;
+ export interface FileStartCopyHeaders {
-     metadata?: Metadata;
+     copyId?: string;
-     replaceIfExists?: boolean;
+     copyStatus?: CopyStatusType;
-     sourceLeaseAccessConditions?: LeaseAccessConditions;
+     date?: Date;
-     timeoutInSeconds?: number;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export type FileRenameResponse = WithResponse<FileRenameHeaders, FileRenameHeaders>;
+     version?: string;
- 
+ }
- // @public
+ 
- export interface FileResizeOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface FileStartCopyOptions extends CommonOptions {
-     leaseAccessConditions?: LeaseAccessConditions;
+     abortSignal?: AbortSignalLike;
- }
+     copyFileSmbInfo?: CopyFileSmbInfo;
- 
+     fileModeCopyMode?: ModeCopyMode;
- // @public
+     fileOwnerCopyMode?: OwnerCopyMode;
- export interface FilesAndDirectoriesListSegment {
+     filePermission?: string;
-     // (undocumented)
+     filePermissionFormat?: FilePermissionFormat;
-     directoryItems: DirectoryItem[];
+     filePermissionKey?: string;
-     // (undocumented)
+     leaseAccessConditions?: LeaseAccessConditions;
-     fileItems: FileItem[];
+     metadata?: Metadata;
- }
+     posixProperties?: FilePosixProperties;
- 
+ }
- // @public
+ 
- export class FileSASPermissions {
+ // @public
-     create: boolean;
+ export type FileStartCopyResponse = WithResponse<FileStartCopyHeaders, FileStartCopyHeaders>;
-     delete: boolean;
+ 
-     static parse(permissions: string): FileSASPermissions;
+ // @public
-     read: boolean;
+ export class FileSystemAttributes {
-     toString(): string;
+     archive: boolean;
-     write: boolean;
+     directory: boolean;
- }
+     hidden: boolean;
- 
+     none: boolean;
- // @public
+     noScrubData: boolean;
- export interface FileSASSignatureValues {
+     notContentIndexed: boolean;
-     cacheControl?: string;
+     offline: boolean;
-     contentDisposition?: string;
+     static parse(fileAttributes: string): FileSystemAttributes;
-     contentEncoding?: string;
+     readonly: boolean;
-     contentLanguage?: string;
+     system: boolean;
-     contentType?: string;
+     temporary: boolean;
-     expiresOn?: Date;
+     toString(): string;
-     filePath?: string;
+ }
-     identifier?: string;
+ 
-     ipRange?: SasIPRange;
+ // @public
-     permissions?: FileSASPermissions | ShareSASPermissions;
+ export interface FileUploadRangeFromURLHeaders {
-     protocol?: SASProtocol;
+     date?: Date;
-     shareName: string;
+     errorCode?: string;
-     startsOn?: Date;
+     etag?: string;
-     version?: string;
+     fileLastWriteTime?: Date;
- }
+     isServerEncrypted?: boolean;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export interface FileServiceProperties {
+     version?: string;
-     cors?: CorsRule[];
+     xMsContentCrc64?: Uint8Array;
-     hourMetrics?: Metrics;
+ }
-     minuteMetrics?: Metrics;
+ 
-     protocol?: ShareProtocolSettings;
+ // @public
- }
+ export interface FileUploadRangeFromURLOptionalParams extends coreClient.OperationOptions {
- 
+     allowSourceTrailingDot?: boolean;
- // @public
+     allowTrailingDot?: boolean;
- export interface FileSetHTTPHeadersHeaders {
+     copySourceAuthorization?: string;
-     date?: Date;
+     fileLastWrittenMode?: FileLastWrittenMode;
-     errorCode?: string;
+     fileRequestIntent?: ShareTokenIntent;
-     etag?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     fileAttributes?: string;
+     sourceContentCrc64?: Uint8Array;
-     fileChangeOn?: Date;
+     sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
-     fileCreatedOn?: Date;
+     sourceRange?: string;
-     fileId?: string;
+     timeoutInSeconds?: number;
-     fileLastWriteOn?: Date;
+ }
-     fileParentId?: string;
+ 
-     filePermissionKey?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface FileUploadRangeFromURLOptions extends CommonOptions {
-     lastModified?: Date;
+     abortSignal?: AbortSignalLike;
-     posixProperties?: FilePosixProperties;
+     fileLastWrittenMode?: FileLastWrittenMode;
-     requestId?: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     version?: string;
+     sourceAuthorization?: HttpAuthorization;
- }
+     sourceConditions?: SourceModifiedAccessConditions;
- 
+     sourceContentCrc64?: Uint8Array;
- // @public
+     timeoutInSeconds?: number;
- export interface FileSetHttpHeadersOptions extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ // @public
- }
+ export type FileUploadRangeFromURLResponse = WithResponse<FileUploadRangeFromURLHeaders, FileUploadRangeFromURLHeaders>;
- export type FileSetHTTPHeadersResponse = WithResponse<FileSetHTTPHeadersHeaders, FileSetHTTPHeadersHeaders>;
+ export interface FileUploadRangeHeaders {
- 
+     contentMD5?: Uint8Array;
- // @public
+     date?: Date;
- export interface FileSetMetadataHeaders {
+     errorCode?: string;
-     date?: Date;
+     etag?: string;
-     errorCode?: string;
+     fileLastWriteTime?: Date;
-     etag?: string;
+     isServerEncrypted?: boolean;
-     isServerEncrypted?: boolean;
+     lastModified?: Date;
- export interface FileSetMetadataOptions extends CommonOptions {
+ export interface FileUploadRangeOptions extends CommonOptions {
-     leaseAccessConditions?: LeaseAccessConditions;
+     contentMD5?: Uint8Array;
- }
+     fileLastWrittenMode?: FileLastWrittenMode;
- 
+     leaseAccessConditions?: LeaseAccessConditions;
- // @public
+     onProgress?: (progress: TransferProgressEvent) => void;
- export type FileSetMetadataResponse = WithResponse<FileSetMetadataHeaders, FileSetMetadataHeaders>;
+ }
- export interface FileStartCopyHeaders {
+ export type FileUploadRangeResponse = WithResponse<FileUploadRangeHeaders, FileUploadRangeHeaders>;
-     copyId?: string;
+ 
-     copyStatus?: CopyStatusType;
+ // @public
-     date?: Date;
+ export interface FileUploadStreamOptions extends CommonOptions {
-     errorCode?: string;
+     abortSignal?: AbortSignalLike;
-     etag?: string;
+     fileHttpHeaders?: FileHttpHeaders_2;
-     lastModified?: Date;
+     leaseAccessConditions?: LeaseAccessConditions;
-     requestId?: string;
+     metadata?: Metadata;
-     version?: string;
+     onProgress?: (progress: TransferProgressEvent) => void;
- export interface FileStartCopyOptions extends CommonOptions {
+ export interface HandleItem {
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     copyFileSmbInfo?: CopyFileSmbInfo;
+     accessRightList?: ShareFileHandleAccessRights[];
-     fileModeCopyMode?: ModeCopyMode;
+     clientIp: string;
-     fileOwnerCopyMode?: OwnerCopyMode;
+     clientName: string;
-     filePermission?: string;
+     fileId: string;
-     filePermissionFormat?: FilePermissionFormat;
+     handleId: string;
-     filePermissionKey?: string;
+     lastReconnectTime?: Date;
-     leaseAccessConditions?: LeaseAccessConditions;
+     openTime: Date;
-     metadata?: Metadata;
+     parentId?: string;
-     posixProperties?: FilePosixProperties;
+     path: string;
- }
+     sessionId: string;
- 
+ }
- // @public
+ 
- export type FileStartCopyResponse = WithResponse<FileStartCopyHeaders, FileStartCopyHeaders>;
+ // @public
- 
+ export interface HttpAuthorization {
- // @public
+     scheme: string;
- export class FileSystemAttributes {
+     value: string;
-     archive: boolean;
+ }
-     directory: boolean;
+ 
-     hidden: boolean;
+ // @public
-     none: boolean;
+ export interface HttpResponse {
-     noScrubData: boolean;
+     headers: HttpHeadersLike;
-     notContentIndexed: boolean;
+     request: WebResourceLike;
-     offline: boolean;
+     status: number;
-     static parse(fileAttributes: string): FileSystemAttributes;
+ }
-     readonly: boolean;
+ 
-     system: boolean;
+ // @public
-     temporary: boolean;
+ export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
-     toString(): string;
+ 
- }
+ // @public
- 
+ export enum KnownShareTokenIntent {
- // @public
+     // (undocumented)
- export interface FileUploadRangeFromURLHeaders {
+     Backup = "backup"
-     date?: Date;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     fileLastWriteTime?: Date;
+ export interface LeaseAccessConditions {
-     isServerEncrypted?: boolean;
+     leaseId?: string;
-     lastModified?: Date;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
-     xMsContentCrc64?: Uint8Array;
+ export type LeaseDurationType = "infinite" | "fixed";
- }
+ 
- 
+ // @public
- // @public
+ export interface LeaseOperationOptions extends CommonOptions {
- export interface FileUploadRangeFromURLOptionalParams extends coreClient.OperationOptions {
+     abortSignal?: AbortSignalLike;
-     allowSourceTrailingDot?: boolean;
+ }
-     allowTrailingDot?: boolean;
+ 
-     copySourceAuthorization?: string;
+ // @public
-     fileLastWrittenMode?: FileLastWrittenMode;
+ export type LeaseOperationResponse = WithResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>;
-     fileRequestIntent?: ShareTokenIntent;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ // @public
-     sourceContentCrc64?: Uint8Array;
+ export interface LeaseOperationResponseHeaders {
-     sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
+     date?: Date;
-     sourceRange?: string;
+     // (undocumented)
-     timeoutInSeconds?: number;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     lastModified?: Date;
- // @public
+     leaseId?: string;
- export interface FileUploadRangeFromURLOptions extends CommonOptions {
+     leaseTimeInSeconds?: number;
-     abortSignal?: AbortSignalLike;
+     requestId?: string;
-     fileLastWrittenMode?: FileLastWrittenMode;
+     version?: string;
-     leaseAccessConditions?: LeaseAccessConditions;
+ }
-     sourceAuthorization?: HttpAuthorization;
+ 
-     sourceConditions?: SourceModifiedAccessConditions;
+ // @public
-     sourceContentCrc64?: Uint8Array;
+ export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
-     timeoutInSeconds?: number;
+ 
- }
+ // @public
- 
+ export type LeaseStatusType = "locked" | "unlocked";
- // @public
+ 
- export type FileUploadRangeFromURLResponse = WithResponse<FileUploadRangeFromURLHeaders, FileUploadRangeFromURLHeaders>;
+ // @public
- 
+ export interface ListFilesAndDirectoriesSegmentResponse {
- // @public
+     // (undocumented)
- export interface FileUploadRangeHeaders {
+     continuationToken: string;
-     contentMD5?: Uint8Array;
+     // (undocumented)
-     date?: Date;
+     directoryId?: string;
-     errorCode?: string;
+     // (undocumented)
-     etag?: string;
+     directoryPath: string;
-     fileLastWriteTime?: Date;
+     // (undocumented)
-     isServerEncrypted?: boolean;
+     marker?: string;
-     lastModified?: Date;
+     // (undocumented)
-     requestId?: string;
+     maxResults?: number;
-     version?: string;
+     // (undocumented)
- }
+     prefix: string;
- 
+     segment: FilesAndDirectoriesListSegment;
- // @public
+     // (undocumented)
- export interface FileUploadRangeOptions extends CommonOptions {
+     serviceEndpoint: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     contentMD5?: Uint8Array;
+     shareName: string;
-     fileLastWrittenMode?: FileLastWrittenMode;
+     // (undocumented)
-     leaseAccessConditions?: LeaseAccessConditions;
+     shareSnapshot?: string;
-     onProgress?: (progress: TransferProgressEvent) => void;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ListHandlesResponse {
- export type FileUploadRangeResponse = WithResponse<FileUploadRangeHeaders, FileUploadRangeHeaders>;
+     // (undocumented)
- 
+     continuationToken: string;
- // @public
+     // (undocumented)
- export interface FileUploadStreamOptions extends CommonOptions {
+     handleList?: HandleItem[];
-     abortSignal?: AbortSignalLike;
+ }
-     fileHttpHeaders?: FileHttpHeaders;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ // @public
-     metadata?: Metadata;
+ export type ListSharesIncludeType = "snapshots" | "metadata" | "deleted";
-     onProgress?: (progress: TransferProgressEvent) => void;
+ 
- }
+ // @public
- 
+ export interface ListSharesResponse {
- // @public
+     // (undocumented)
- export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     continuationToken: string;
- 
+     // (undocumented)
- // @public
+     marker?: string;
- export function generateFileSASQueryParameters(fileSASSignatureValues: FileSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     // (undocumented)
- 
+     maxResults?: number;
- // @public
+     // (undocumented)
- export function getFileServiceAccountAudience(storageAccountName: string): string;
+     prefix?: string;
- 
+     // (undocumented)
- // @public
+     serviceEndpoint: string;
- export interface HandleItem {
+     // (undocumented)
-     // (undocumented)
+     shareItems?: ShareItem[];
-     accessRightList?: ShareFileHandleAccessRights[];
+ }
-     clientIp: string;
+ 
-     clientName: string;
+ // @public
-     fileId: string;
+ export interface ListSharesResponseModel {
-     handleId: string;
+     // (undocumented)
-     lastReconnectTime?: Date;
+     continuationToken: string;
-     openTime: Date;
+     // (undocumented)
-     parentId?: string;
+     marker?: string;
-     path: string;
+     // (undocumented)
-     sessionId: string;
+     maxResults?: number;
- }
+     // (undocumented)
- 
+     prefix?: string;
- // @public
+     // (undocumented)
- export interface HttpAuthorization {
+     serviceEndpoint: string;
-     scheme: string;
+     // (undocumented)
-     value: string;
+     shareItems?: ShareItemInternal[];
- export { HttpHeaders }
+ // @public
- 
+ export const logger: AzureLogger;
- export { HttpOperationResponse }
+ 
- 
+ // @public
- export { HttpRequestBody }
+ export interface Metrics {
- 
+     enabled: boolean;
- // @public
+     includeAPIs?: boolean;
- export interface HttpResponse {
+     retentionPolicy?: RetentionPolicy;
-     headers: HttpHeaders;
+     version: string;
-     request: WebResource;
+ }
-     status: number;
+ 
- }
+ // @public
- 
+ export type ModeCopyMode = "source" | "override";
- // @public
+ 
- export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
+ // @public
- 
+ export function newPipeline(credential?: Credential_2 | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
- // @public
+ 
- export enum KnownShareTokenIntent {
+ // @public
-     // (undocumented)
+ export type NfsFileType = string;
-     Backup = "backup"
+ 
- }
+ // @public
- 
+ export type OwnerCopyMode = "source" | "override";
- // @public
+ 
- export interface LeaseAccessConditions {
+ // Warning: (ae-forgotten-export) The symbol "NfsFileMode" needs to be exported by the entry point index.d.ts
-     leaseId?: string;
+ //
- }
+ // @public
- 
+ export function parseOctalFileMode(input?: string): NfsFileMode | undefined;
- // @public
+ 
- export type LeaseDurationType = "infinite" | "fixed";
+ // @public
- 
+ export function parseSymbolicFileMode(input?: string): NfsFileMode | undefined;
- // @public
+ 
- export interface LeaseOperationOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export type PermissionCopyModeType = "source" | "override";
- }
+ 
- 
+ // @public
- // @public
+ export class Pipeline implements PipelineLike {
- export type LeaseOperationResponse = WithResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>;
+     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
- 
+     readonly factories: RequestPolicyFactory[];
- // @public
+     readonly options: PipelineOptions;
- export interface LeaseOperationResponseHeaders {
+     toServiceClientOptions(): ServiceClientOptions;
-     date?: Date;
+ }
-     // (undocumented)
+ 
-     errorCode?: string;
+ // @public
-     etag?: string;
+ export interface PipelineLike {
-     lastModified?: Date;
+     readonly factories: RequestPolicyFactory[];
-     leaseId?: string;
+     readonly options: PipelineOptions;
-     leaseTimeInSeconds?: number;
+     toServiceClientOptions(): ServiceClientOptions;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export interface PipelineOptions {
- // @public
+     httpClient?: RequestPolicy;
- export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
+     shareTokenIntent?: ShareTokenIntent;
- 
+ }
- // @public
+ 
- export type LeaseStatusType = "locked" | "unlocked";
+ // @public
- 
+ interface Range_2 {
- // @public
+     count?: number;
- export interface ListFilesAndDirectoriesSegmentResponse {
+     offset: number;
-     // (undocumented)
+ }
-     continuationToken: string;
+ export { Range_2 as Range }
-     // (undocumented)
+ 
-     directoryId?: string;
+ // @public
-     // (undocumented)
+ export interface RangeModel {
-     directoryPath: string;
+     end: number;
-     // (undocumented)
+     start: number;
-     marker?: string;
+ }
-     // (undocumented)
+ 
-     maxResults?: number;
+ // @public
-     // (undocumented)
+ export type RawFileDownloadResponse = FileDownloadHeaders & {
-     prefix: string;
+     blobBody?: Promise<Blob>;
-     segment: FilesAndDirectoriesListSegment;
+     readableStreamBody?: NodeJS.ReadableStream;
-     // (undocumented)
+ };
-     serviceEndpoint: string;
+ 
-     // (undocumented)
+ // @public
-     shareName: string;
+ export interface ResponseLike {
-     // (undocumented)
+     _response: HttpResponse;
-     shareSnapshot?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ResponseWithBody<Headers, Body> {
- export interface ListHandlesResponse {
+     _response: HttpResponse & {
-     // (undocumented)
+         parsedHeaders: Headers;
-     continuationToken: string;
+         bodyAsText: string;
-     // (undocumented)
+         parsedBody: Body;
-     handleList?: HandleItem[];
+     };
- export type ListSharesIncludeType = "snapshots" | "metadata" | "deleted";
+ export interface ResponseWithHeaders<Headers> {
- 
+     _response: HttpResponse & {
- // @public
+         parsedHeaders: Headers;
- export interface ListSharesResponse {
+     };
-     // (undocumented)
+ }
-     continuationToken: string;
+ 
-     // (undocumented)
+ export { RestError }
-     marker?: string;
+ 
-     // (undocumented)
+ // @public
-     maxResults?: number;
+ export interface RetentionPolicy {
-     // (undocumented)
+     days?: number;
-     prefix?: string;
+     enabled: boolean;
-     // (undocumented)
+ }
-     serviceEndpoint: string;
+ 
-     // (undocumented)
+ // @public
-     shareItems?: ShareItem[];
+ export interface SasIPRange {
- }
+     end?: string;
- 
+     start: string;
- // @public
+ }
- export interface ListSharesResponseModel {
+ 
-     // (undocumented)
+ // @public
-     continuationToken: string;
+ export interface ServiceClientOptions {
-     // (undocumented)
+     httpClient?: RequestPolicy;
-     marker?: string;
+     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
-     // (undocumented)
+ }
-     maxResults?: number;
+ 
-     // (undocumented)
+ // @public
-     prefix?: string;
+ export interface ServiceGenerateAccountSasUrlOptions {
-     // (undocumented)
+     ipRange?: SasIPRange;
-     serviceEndpoint: string;
+     protocol?: SASProtocol;
-     // (undocumented)
+     startsOn?: Date;
-     shareItems?: ShareItemInternal[];
+     version?: string;
- export const logger: AzureLogger;
+ export interface ServiceGetPropertiesHeaders {
- 
+     errorCode?: string;
- // @public (undocumented)
+     requestId?: string;
- export interface Metadata {
+     version?: string;
-     // (undocumented)
+ }
-     [propertyName: string]: string;
+ 
- }
+ // @public
- 
+ export interface ServiceGetPropertiesOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface Metrics {
+ }
-     enabled: boolean;
+ 
-     includeAPIs?: boolean;
+ // @public
-     retentionPolicy?: RetentionPolicy;
+ export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesHeaders & FileServiceProperties, ServiceGetPropertiesHeaders, FileServiceProperties>;
-     version: string;
+ 
- }
+ // @public
- 
+ export interface ServiceListSharesOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type ModeCopyMode = "source" | "override";
+     includeDeleted?: boolean;
- 
+     includeMetadata?: boolean;
- // @public
+     includeSnapshots?: boolean;
- export function newPipeline(credential?: Credential_2 | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+     prefix?: string;
- 
+ }
- // @public
+ 
- export interface NfsFileMode {
+ // @public
-     effectiveGroupIdentity: boolean;
+ export interface ServiceListSharesSegmentHeaders {
-     effectiveUserIdentity: boolean;
+     errorCode?: string;
-     group: PosixRolePermissions;
+     requestId?: string;
-     other: PosixRolePermissions;
+     version?: string;
-     owner: PosixRolePermissions;
+ }
-     stickyBit: boolean;
+ 
- }
+ // @public
- 
+ export type ServiceListSharesSegmentResponse = WithResponse<ListSharesResponse & ServiceListSharesSegmentHeaders, ServiceListSharesSegmentHeaders, ListSharesResponseModel>;
- // @public
+ 
- export type NfsFileType = string;
+ // @public
- 
+ export interface ServiceSetPropertiesHeaders {
- // @public
+     errorCode?: string;
- export type OwnerCopyMode = "source" | "override";
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export function parseOctalFileMode(input?: string): NfsFileMode | undefined;
+ 
- 
+ // @public
- // @public
+ export interface ServiceSetPropertiesOptions extends CommonOptions {
- export function parseSymbolicFileMode(input?: string): NfsFileMode | undefined;
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export type PermissionCopyModeType = "source" | "override";
+ // @public
- 
+ export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
- // @public
+ 
- export class Pipeline implements PipelineLike {
+ // @public
-     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
+ export interface ServiceUndeleteShareOptions extends CommonOptions {
-     readonly factories: RequestPolicyFactory[];
+     abortSignal?: AbortSignalLike;
-     readonly options: PipelineOptions;
+ }
-     toServiceClientOptions(): ServiceClientOptions;
+ 
- }
+ // @public (undocumented)
- 
+ export interface SetPropertiesResponse extends FileSetHTTPHeadersResponse {
- // @public
+ }
- export interface PipelineLike {
+ 
-     readonly factories: RequestPolicyFactory[];
+ // @public
-     readonly options: PipelineOptions;
+ export type ShareAccessTier = "TransactionOptimized" | "Hot" | "Cool" | "Premium";
-     toServiceClientOptions(): ServiceClientOptions;
+ 
- }
+ // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
- 
+ //
- export interface PipelineOptions {
+ export class ShareClient extends StorageClient {
-     httpClient?: RequestPolicy;
+     constructor(connectionString: string, name: string, options?: ShareClientOptions);
-     shareTokenIntent?: ShareTokenIntent;
+     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
- }
+     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
- 
+     create(options?: ShareCreateOptions): Promise<ShareCreateResponse>;
- // @public
+     createDirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
- export interface PosixRolePermissions {
+         directoryClient: ShareDirectoryClient;
-     execute: boolean;
+         directoryCreateResponse: DirectoryCreateResponse;
-     read: boolean;
+     }>;
-     write: boolean;
+     createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
- }
+         fileClient: ShareFileClient;
- 
+         fileCreateResponse: FileCreateResponse;
- // @public
+     }>;
- interface Range_2 {
+     createIfNotExists(options?: ShareCreateOptions): Promise<ShareCreateIfNotExistsResponse>;
-     count?: number;
+     createPermission(filePermission: string | SharePermission, options?: ShareCreatePermissionOptions): Promise<ShareCreatePermissionResponse>;
-     offset: number;
+     createSnapshot(options?: ShareCreateSnapshotOptions): Promise<ShareCreateSnapshotResponse>;
- }
+     delete(options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
- export { Range_2 as Range }
+     deleteDirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
- 
+     deleteFile(fileName: string, options?: FileDeleteOptions): Promise<FileDeleteResponse>;
- // @public
+     deleteIfExists(options?: ShareDeleteMethodOptions): Promise<ShareDeleteIfExistsResponse>;
- export interface RangeModel {
+     exists(options?: ShareExistsOptions): Promise<boolean>;
-     end: number;
+     generateSasStringToSign(options: ShareGenerateSasUrlOptions): string;
-     start: number;
+     generateSasUrl(options: ShareGenerateSasUrlOptions): string;
- }
+     getAccessPolicy(options?: ShareGetAccessPolicyOptions): Promise<ShareGetAccessPolicyResponse>;
- 
+     getDirectoryClient(directoryName: string): ShareDirectoryClient;
- // @public
+     getPermission(filePermissionKey: string, options?: ShareGetPermissionOptions): Promise<ShareGetPermissionResponse>;
- export type RawFileDownloadResponse = FileDownloadHeaders & {
+     getProperties(options?: ShareGetPropertiesOptions): Promise<ShareGetPropertiesResponse>;
-     blobBody?: Promise<Blob>;
+     getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient;
-     readableStreamBody?: NodeJS.ReadableStream;
+     getStatistics(options?: ShareGetStatisticsOptions): Promise<ShareGetStatisticsResponse>;
- };
+     get name(): string;
- 
+     get rootDirectoryClient(): ShareDirectoryClient;
- export { RequestPolicy as IHttpClient }
+     setAccessPolicy(shareAcl?: SignedIdentifier[], options?: ShareSetAccessPolicyOptions): Promise<ShareSetAccessPolicyResponse>;
- export { RequestPolicy }
+     setMetadata(metadata?: Metadata, options?: ShareSetMetadataOptions): Promise<ShareSetMetadataResponse>;
- 
+     setProperties(options?: ShareSetPropertiesOptions): Promise<ShareSetPropertiesResponse>;
- export { RequestPolicyFactory }
+     // @deprecated
- 
+     setQuota(quotaInGB: number, options?: ShareSetQuotaOptions): Promise<ShareSetQuotaResponse>;
- export { RequestPolicyOptions }
+     withSnapshot(snapshot: string): ShareClient;
- 
+ }
- // @public
+ 
- export interface ResponseLike {
+ // @public (undocumented)
-     _response: HttpResponse;
+ export interface ShareClientConfig {
- }
+     allowSourceTrailingDot?: boolean;
- 
+     allowTrailingDot?: boolean;
- // @public
+     fileRequestIntent?: ShareTokenIntent;
- export interface ResponseWithBody<Headers, Body> {
+ }
-     _response: HttpResponse & {
+ 
-         parsedHeaders: Headers;
+ // @public (undocumented)
-         bodyAsText: string;
+ export type ShareClientOptions = StoragePipelineOptions & ShareClientConfig;
-         parsedBody: Body;
+ 
-     };
+ // @public
- }
+ export interface ShareCreateHeaders {
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface ResponseWithHeaders<Headers> {
+     etag?: string;
-     _response: HttpResponse & {
+     lastModified?: Date;
-         parsedHeaders: Headers;
+     maxBurstCreditsForIops?: number;
-     };
+     quota?: number;
- }
+     requestId?: string;
- 
+     shareIncludedBurstIops?: number;
- export { RestError }
+     shareProvisionedBandwidthMibps?: number;
- 
+     shareProvisionedIops?: number;
- // @public
+     version?: string;
- export interface RetentionPolicy {
+ }
-     days?: number;
+ 
-     enabled: boolean;
+ // @public
- }
+ export interface ShareCreateIfNotExistsResponse extends ShareCreateResponse {
- 
+     succeeded: boolean;
- // @public
+ }
- export interface SasIPRange {
+ 
-     end?: string;
+ // @public
-     start: string;
+ export interface ShareCreateOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     accessTier?: ShareAccessTier;
- // @public
+     enableSnapshotVirtualDirectoryAccess?: boolean;
- export enum SASProtocol {
+     metadata?: {
-     Https = "https",
+         [propertyName: string]: string;
-     HttpsAndHttp = "https,http"
+     };
- }
+     paidBurstingEnabled?: boolean;
- 
+     paidBurstingMaxBandwidthMibps?: number;
- // @public
+     paidBurstingMaxIops?: number;
- export class SASQueryParameters {
+     // Warning: (ae-forgotten-export) The symbol "ShareProtocols" needs to be exported by the entry point index.d.ts
-     constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string);
+     protocols?: ShareProtocols;
-     readonly cacheControl?: string;
+     quota?: number;
-     readonly contentDisposition?: string;
+     rootSquash?: ShareRootSquash;
-     readonly contentEncoding?: string;
+     shareProvisionedBandwidthMibps?: number;
-     readonly contentLanguage?: string;
+     shareProvisionedIops?: number;
-     readonly contentType?: string;
+ }
-     readonly expiresOn?: Date;
+ 
-     readonly identifier?: string;
+ // @public
-     get ipRange(): SasIPRange | undefined;
+ export interface ShareCreatePermissionHeaders {
-     readonly permissions?: string;
+     date?: Date;
-     readonly protocol?: SASProtocol;
+     errorCode?: string;
-     readonly resource?: string;
+     filePermissionKey?: string;
-     readonly resourceTypes?: string;
+     requestId?: string;
-     readonly services?: string;
+     version?: string;
-     readonly signature: string;
+ }
-     readonly startsOn?: Date;
+ 
-     toString(): string;
+ // @public
-     readonly version: string;
+ export interface ShareCreatePermissionOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export interface ServiceClientOptions {
+ // @public
-     httpClient?: RequestPolicy;
+ export type ShareCreatePermissionResponse = WithResponse<ShareCreatePermissionHeaders, ShareCreatePermissionHeaders>;
-     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
+ 
- }
+ // @public
- 
+ export type ShareCreateResponse = WithResponse<ShareCreateHeaders, ShareCreateHeaders>;
- // @public
+ 
- export interface ServiceGenerateAccountSasUrlOptions {
+ // @public
-     ipRange?: SasIPRange;
+ export interface ShareCreateSnapshotHeaders {
-     protocol?: SASProtocol;
+     date?: Date;
-     startsOn?: Date;
+     errorCode?: string;
-     version?: string;
+     etag?: string;
- }
+     lastModified?: Date;
- 
+     requestId?: string;
- // @public
+     snapshot?: string;
- export interface ServiceGetPropertiesHeaders {
+     version?: string;
-     errorCode?: string;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface ShareCreateSnapshotOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     metadata?: {
- export interface ServiceGetPropertiesOptions extends CommonOptions {
+         [propertyName: string]: string;
-     abortSignal?: AbortSignalLike;
+     };
- export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesHeaders & FileServiceProperties, ServiceGetPropertiesHeaders, FileServiceProperties>;
+ export type ShareCreateSnapshotResponse = WithResponse<ShareCreateSnapshotHeaders, ShareCreateSnapshotHeaders>;
- export interface ServiceListSharesOptions extends CommonOptions {
+ export interface ShareDeleteHeaders {
-     abortSignal?: AbortSignalLike;
+     date?: Date;
-     includeDeleted?: boolean;
+     errorCode?: string;
-     includeMetadata?: boolean;
+     requestId?: string;
-     includeSnapshots?: boolean;
+     snapshotUsageBytes?: number;
-     prefix?: string;
+     usageBytes?: number;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface ServiceListSharesSegmentHeaders {
+ // @public
-     errorCode?: string;
+ export interface ShareDeleteIfExistsResponse extends ShareDeleteResponse {
-     requestId?: string;
+     succeeded: boolean;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ShareDeleteMethodOptions extends CommonOptions {
- export type ServiceListSharesSegmentResponse = WithResponse<ListSharesResponse & ServiceListSharesSegmentHeaders, ServiceListSharesSegmentHeaders, ListSharesResponseModel>;
+     abortSignal?: AbortSignalLike;
- 
+     deleteSnapshots?: DeleteSnapshotsOptionType;
- // @public
+     leaseAccessConditions?: LeaseAccessConditions;
- export interface ServiceSetPropertiesHeaders {
+ }
-     errorCode?: string;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export type ShareDeleteResponse = WithResponse<ShareDeleteHeaders, ShareDeleteHeaders>;
- }
+ 
- 
+ // @public
- // @public
+ export class ShareDirectoryClient extends StorageClient {
- export interface ServiceSetPropertiesOptions extends CommonOptions {
+     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
-     abortSignal?: AbortSignalLike;
+     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
- }
+     create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
- 
+     createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
- // @public
+         fileClient: ShareFileClient;
- export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
+         fileCreateResponse: FileCreateResponse;
- 
+     }>;
- // @public
+     createIfNotExists(options?: DirectoryCreateOptions): Promise<DirectoryCreateIfNotExistsResponse>;
- export interface ServiceUndeleteShareOptions extends CommonOptions {
+     createSubdirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
-     abortSignal?: AbortSignalLike;
+         directoryClient: ShareDirectoryClient;
- }
+         directoryCreateResponse: DirectoryCreateResponse;
- 
+     }>;
- // @public (undocumented)
+     delete(options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
- export interface SetPropertiesResponse extends FileSetHTTPHeadersResponse {
+     deleteFile(fileName: string, options?: FileDeleteOptions): Promise<FileDeleteResponse>;
- }
+     deleteIfExists(options?: DirectoryDeleteOptions): Promise<DirectoryDeleteIfExistsResponse>;
- 
+     deleteSubdirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
- // @public
+     exists(options?: DirectoryExistsOptions): Promise<boolean>;
- export type ShareAccessTier = "TransactionOptimized" | "Hot" | "Cool" | "Premium";
+     forceCloseAllHandles(options?: DirectoryForceCloseHandlesSegmentOptions): Promise<CloseHandlesInfo>;
- 
+     forceCloseHandle(handleId: string, options?: DirectoryForceCloseHandlesOptions): Promise<DirectoryForceCloseHandlesResponse>;
- // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
+     getDirectoryClient(subDirectoryName: string): ShareDirectoryClient;
- //
+     getFileClient(fileName: string): ShareFileClient;
- // @public
+     getProperties(options?: DirectoryGetPropertiesOptions): Promise<DirectoryGetPropertiesResponse>;
- export class ShareClient extends StorageClient {
+     listFilesAndDirectories(options?: DirectoryListFilesAndDirectoriesOptions): PagedAsyncIterableIterator<({
-     constructor(connectionString: string, name: string, options?: ShareClientOptions);
+         kind: "file";
-     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
+     } & FileItem) | ({
-     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
+         kind: "directory";
-     create(options?: ShareCreateOptions): Promise<ShareCreateResponse>;
+     } & DirectoryItem), DirectoryListFilesAndDirectoriesSegmentResponse>;
-     createDirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
+     listHandles(options?: DirectoryListHandlesOptions): PagedAsyncIterableIterator<HandleItem, DirectoryListHandlesResponse>;
-         directoryClient: ShareDirectoryClient;
+     get name(): string;
-         directoryCreateResponse: DirectoryCreateResponse;
+     get path(): string;
-     }>;
+     rename(destinationPath: string, options?: DirectoryRenameOptions): Promise<{
-     createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
+         destinationDirectoryClient: ShareDirectoryClient;
-         fileClient: ShareFileClient;
+         directoryRenameResponse: DirectoryRenameResponse;
-         fileCreateResponse: FileCreateResponse;
+     }>;
-     }>;
+     setMetadata(metadata?: Metadata, options?: DirectorySetMetadataOptions): Promise<DirectorySetMetadataResponse>;
-     createIfNotExists(options?: ShareCreateOptions): Promise<ShareCreateIfNotExistsResponse>;
+     setProperties(properties?: DirectoryProperties): Promise<DirectorySetPropertiesResponse>;
-     createPermission(filePermission: string | SharePermission, options?: ShareCreatePermissionOptions): Promise<ShareCreatePermissionResponse>;
+     get shareName(): string;
-     createSnapshot(options?: ShareCreateSnapshotOptions): Promise<ShareCreateSnapshotResponse>;
+ }
-     delete(options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
+ 
-     deleteDirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
+ // @public
-     deleteFile(fileName: string, options?: FileDeleteOptions): Promise<FileDeleteResponse>;
+ export interface ShareExistsOptions extends CommonOptions {
-     deleteIfExists(options?: ShareDeleteMethodOptions): Promise<ShareDeleteIfExistsResponse>;
+     abortSignal?: AbortSignalLike;
-     exists(options?: ShareExistsOptions): Promise<boolean>;
+     leaseAccessConditions?: LeaseAccessConditions;
-     generateSasStringToSign(options: ShareGenerateSasUrlOptions): string;
+ }
-     generateSasUrl(options: ShareGenerateSasUrlOptions): string;
+ 
-     getAccessPolicy(options?: ShareGetAccessPolicyOptions): Promise<ShareGetAccessPolicyResponse>;
+ // @public
-     getDirectoryClient(directoryName: string): ShareDirectoryClient;
+ export class ShareFileClient extends StorageClient {
-     getPermission(filePermissionKey: string, options?: ShareGetPermissionOptions): Promise<ShareGetPermissionResponse>;
+     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
-     getProperties(options?: ShareGetPropertiesOptions): Promise<ShareGetPropertiesResponse>;
+     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
-     getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient;
+     abortCopyFromURL(copyId: string, options?: FileAbortCopyFromURLOptions): Promise<FileAbortCopyResponse>;
-     getStatistics(options?: ShareGetStatisticsOptions): Promise<ShareGetStatisticsResponse>;
+     clearRange(offset: number, contentLength: number, options?: FileClearRangeOptions): Promise<FileUploadRangeResponse>;
-     get name(): string;
+     create(size: number, options?: FileCreateOptions): Promise<FileCreateResponse>;
-     get rootDirectoryClient(): ShareDirectoryClient;
+     createHardLink(targetFile: string, options?: FileCreateHardLinkOptions): Promise<FileCreateHardLinkResponse>;
-     setAccessPolicy(shareAcl?: SignedIdentifier[], options?: ShareSetAccessPolicyOptions): Promise<ShareSetAccessPolicyResponse>;
+     createSymbolicLink(linkText: string, options?: FileCreateSymbolicLinkOptions): Promise<FileCreateSymbolicLinkResponse>;
-     setMetadata(metadata?: Metadata, options?: ShareSetMetadataOptions): Promise<ShareSetMetadataResponse>;
+     delete(options?: FileDeleteOptions): Promise<FileDeleteResponse>;
-     setProperties(options?: ShareSetPropertiesOptions): Promise<ShareSetPropertiesResponse>;
+     deleteIfExists(options?: FileDeleteOptions): Promise<FileDeleteIfExistsResponse>;
-     // @deprecated
+     download(offset?: number, count?: number, options?: FileDownloadOptions): Promise<FileDownloadResponseModel>;
-     setQuota(quotaInGB: number, options?: ShareSetQuotaOptions): Promise<ShareSetQuotaResponse>;
+     downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: FileDownloadToBufferOptions): Promise<Buffer>;
-     withSnapshot(snapshot: string): ShareClient;
+     downloadToBuffer(offset?: number, count?: number, options?: FileDownloadToBufferOptions): Promise<Buffer>;
- }
+     downloadToFile(filePath: string, offset?: number, count?: number, options?: FileDownloadOptions): Promise<FileDownloadResponseModel>;
- 
+     exists(options?: FileExistsOptions): Promise<boolean>;
- // @public (undocumented)
+     forceCloseAllHandles(options?: FileForceCloseHandlesOptions): Promise<CloseHandlesInfo>;
- export interface ShareClientConfig {
+     forceCloseHandle(handleId: string, options?: FileForceCloseHandlesOptions): Promise<FileForceCloseHandlesResponse>;
-     allowSourceTrailingDot?: boolean;
+     generateSasStringToSign(options: FileGenerateSasUrlOptions): string;
-     allowTrailingDot?: boolean;
+     generateSasUrl(options: FileGenerateSasUrlOptions): string;
-     fileRequestIntent?: ShareTokenIntent;
+     getProperties(options?: FileGetPropertiesOptions): Promise<FileGetPropertiesResponse>;
- }
+     getRangeList(options?: FileGetRangeListOptions): Promise<FileGetRangeListResponse>;
- 
+     getRangeListDiff(prevShareSnapshot: string, options?: FileGetRangeListOptions): Promise<FileGetRangeListDiffResponse>;
- // @public (undocumented)
+     getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient;
- export type ShareClientOptions = StoragePipelineOptions & ShareClientConfig;
+     getSymbolicLink(options?: FileGetSymbolicLinkOptions): Promise<FileGetSymbolicLinkResponse>;
- 
+     listHandles(options?: FileListHandlesOptions): PagedAsyncIterableIterator<HandleItem, FileListHandlesResponse>;
- // @public
+     get name(): string;
- export interface ShareCreateHeaders {
+     get path(): string;
-     date?: Date;
+     rename(destinationPath: string, options?: FileRenameOptions): Promise<{
-     errorCode?: string;
+         destinationFileClient: ShareFileClient;
-     etag?: string;
+         fileRenameResponse: FileRenameResponse;
-     lastModified?: Date;
+     }>;
-     maxBurstCreditsForIops?: number;
+     resize(length: number, options?: FileResizeOptions): Promise<FileSetHTTPHeadersResponse>;
-     quota?: number;
+     setHttpHeaders(fileHttpHeaders?: FileHttpHeaders_2, options?: FileSetHttpHeadersOptions): Promise<FileSetHTTPHeadersResponse>;
-     requestId?: string;
+     setMetadata(metadata?: Metadata, options?: FileSetMetadataOptions): Promise<FileSetMetadataResponse>;
-     shareIncludedBurstIops?: number;
+     setProperties(properties?: FileProperties): Promise<SetPropertiesResponse>;
-     shareProvisionedBandwidthMibps?: number;
+     get shareName(): string;
-     shareProvisionedIops?: number;
+     startCopyFromURL(copySource: string, options?: FileStartCopyOptions): Promise<FileStartCopyResponse>;
-     version?: string;
+     uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: FileParallelUploadOptions): Promise<void>;
- }
+     uploadFile(filePath: string, options?: FileParallelUploadOptions): Promise<void>;
- 
+     uploadRange(body: RequestBodyType, offset: number, contentLength: number, options?: FileUploadRangeOptions): Promise<FileUploadRangeResponse>;
- // @public
+     uploadRangeFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: FileUploadRangeFromURLOptions): Promise<FileUploadRangeFromURLResponse>;
- export interface ShareCreateIfNotExistsResponse extends ShareCreateResponse {
+     uploadResetableStream(streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream, size: number, options?: FileParallelUploadOptions): Promise<void>;
-     succeeded: boolean;
+     uploadSeekableBlob(blobFactory: (offset: number, size: number) => Blob, size: number, options?: FileParallelUploadOptions): Promise<void>;
- }
+     uploadStream(stream: NodeJS.ReadableStream, size: number, bufferSize: number, maxBuffers: number, options?: FileUploadStreamOptions): Promise<void>;
- 
+     withShareSnapshot(shareSnapshot: string): ShareFileClient;
- // @public
+ }
- export interface ShareCreateOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     accessTier?: ShareAccessTier;
+ export type ShareFileHandleAccessRights = "Read" | "Write" | "Delete";
-     enableSnapshotVirtualDirectoryAccess?: boolean;
+ 
-     metadata?: {
+ // @public
-         [propertyName: string]: string;
+ export interface ShareFileRangeList {
-     };
+     // (undocumented)
-     paidBurstingEnabled?: boolean;
+     clearRanges?: ClearRange[];
-     paidBurstingMaxBandwidthMibps?: number;
+     // (undocumented)
-     paidBurstingMaxIops?: number;
+     ranges?: RangeModel[];
-     protocols?: ShareProtocols;
+ }
-     quota?: number;
+ 
-     rootSquash?: ShareRootSquash;
+ // @public
-     shareProvisionedBandwidthMibps?: number;
+ export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
-     shareProvisionedIops?: number;
+     // Warning: (ae-forgotten-export) The symbol "ShareSASPermissions" needs to be exported by the entry point index.d.ts
- }
+     permissions?: ShareSASPermissions;
- 
+ }
- // @public
+ 
- export interface ShareCreatePermissionHeaders {
+ // @public
-     date?: Date;
+ export interface ShareGetAccessPolicyHeaders {
-     errorCode?: string;
+     date?: Date;
-     filePermissionKey?: string;
+     errorCode?: string;
-     requestId?: string;
+     etag?: string;
-     version?: string;
+     lastModified?: Date;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface ShareCreatePermissionOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
- }
+ export interface ShareGetAccessPolicyOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     leaseAccessConditions?: LeaseAccessConditions;
- export type ShareCreatePermissionResponse = WithResponse<ShareCreatePermissionHeaders, ShareCreatePermissionHeaders>;
+ }
- // @public
+ // @public (undocumented)
- export type ShareCreateResponse = WithResponse<ShareCreateHeaders, ShareCreateHeaders>;
+ export type ShareGetAccessPolicyResponse = WithResponse<{
- 
+     signedIdentifiers: SignedIdentifier[];
- // @public
+ } & ShareGetAccessPolicyHeaders, ShareGetAccessPolicyHeaders, SignedIdentifierModel[]>;
- export interface ShareCreateSnapshotHeaders {
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface ShareGetPermissionHeaders {
-     etag?: string;
+     date?: Date;
-     lastModified?: Date;
+     errorCode?: string;
-     snapshot?: string;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ShareGetPermissionOptions extends CommonOptions {
- export interface ShareCreateSnapshotOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+     filePermissionFormat?: FilePermissionFormat;
-     metadata?: {
+ }
-         [propertyName: string]: string;
+ 
-     };
+ // @public
- }
+ export type ShareGetPermissionResponse = WithResponse<ShareGetPermissionHeaders & SharePermission, ShareGetPermissionHeaders, SharePermission>;
- export type ShareCreateSnapshotResponse = WithResponse<ShareCreateSnapshotHeaders, ShareCreateSnapshotHeaders>;
+ export interface ShareGetPropertiesHeaders {
- 
+     accessTier?: string;
- // @public
+     accessTierChangeTime?: Date;
- export interface ShareDeleteHeaders {
+     accessTierTransitionState?: string;
-     errorCode?: string;
+     enabledProtocols?: string;
-     requestId?: string;
+     enableSnapshotVirtualDirectoryAccess?: boolean;
-     snapshotUsageBytes?: number;
+     errorCode?: string;
-     usageBytes?: number;
+     etag?: string;
-     version?: string;
+     includedBurstIops?: number;
- }
+     lastModified?: Date;
- 
+     leaseDuration?: LeaseDurationType;
- // @public
+     leaseState?: LeaseStateType;
- export interface ShareDeleteIfExistsResponse extends ShareDeleteResponse {
+     leaseStatus?: LeaseStatusType;
-     succeeded: boolean;
+     maxBurstCreditsForIops?: number;
- }
+     metadata?: {
- 
+         [propertyName: string]: string;
- // @public
+     };
- export interface ShareDeleteMethodOptions extends CommonOptions {
+     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
-     abortSignal?: AbortSignalLike;
+     nextAllowedProvisionedIopsDowngradeTime?: Date;
-     deleteSnapshots?: DeleteSnapshotsOptionType;
+     nextAllowedQuotaDowngradeTime?: Date;
-     leaseAccessConditions?: LeaseAccessConditions;
+     paidBurstingEnabled?: boolean;
- }
+     paidBurstingMaxBandwidthMibps?: number;
- 
+     paidBurstingMaxIops?: number;
- // @public
+     provisionedBandwidthMibps?: number;
- export type ShareDeleteResponse = WithResponse<ShareDeleteHeaders, ShareDeleteHeaders>;
+     provisionedEgressMBps?: number;
- 
+     provisionedIngressMBps?: number;
- // @public
+     provisionedIops?: number;
- export class ShareDirectoryClient extends StorageClient {
+     quota?: number;
-     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
+     requestId?: string;
-     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
+     rootSquash?: ShareRootSquash;
-     create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
+     version?: string;
-     createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
+ }
-         fileClient: ShareFileClient;
+ 
-         fileCreateResponse: FileCreateResponse;
+ // @public
-     }>;
+ export interface ShareGetPropertiesOptions extends CommonOptions {
-     createIfNotExists(options?: DirectoryCreateOptions): Promise<DirectoryCreateIfNotExistsResponse>;
+     abortSignal?: AbortSignalLike;
-     createSubdirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
+     leaseAccessConditions?: LeaseAccessConditions;
-         directoryClient: ShareDirectoryClient;
+ }
-         directoryCreateResponse: DirectoryCreateResponse;
+ 
-     }>;
+ // @public
-     delete(options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
+ export type ShareGetPropertiesResponse = ShareGetPropertiesResponseModel & {
-     deleteFile(fileName: string, options?: FileDeleteOptions): Promise<FileDeleteResponse>;
+     protocols?: ShareProtocols;
-     deleteIfExists(options?: DirectoryDeleteOptions): Promise<DirectoryDeleteIfExistsResponse>;
+ };
-     deleteSubdirectory(directoryName: string, options?: DirectoryDeleteOptions): Promise<DirectoryDeleteResponse>;
+ 
-     exists(options?: DirectoryExistsOptions): Promise<boolean>;
+ // @public
-     forceCloseAllHandles(options?: DirectoryForceCloseHandlesSegmentOptions): Promise<CloseHandlesInfo>;
+ export type ShareGetPropertiesResponseModel = WithResponse<ShareGetPropertiesHeaders, ShareGetPropertiesHeaders>;
-     forceCloseHandle(handleId: string, options?: DirectoryForceCloseHandlesOptions): Promise<DirectoryForceCloseHandlesResponse>;
+ 
-     getDirectoryClient(subDirectoryName: string): ShareDirectoryClient;
+ // @public
-     getFileClient(fileName: string): ShareFileClient;
+ export interface ShareGetStatisticsHeaders {
-     getProperties(options?: DirectoryGetPropertiesOptions): Promise<DirectoryGetPropertiesResponse>;
+     date?: Date;
-     listFilesAndDirectories(options?: DirectoryListFilesAndDirectoriesOptions): PagedAsyncIterableIterator<({
+     errorCode?: string;
-         kind: "file";
+     etag?: string;
-     } & FileItem) | ({
+     lastModified?: Date;
-         kind: "directory";
+     requestId?: string;
-     } & DirectoryItem), DirectoryListFilesAndDirectoriesSegmentResponse>;
+     version?: string;
-     listHandles(options?: DirectoryListHandlesOptions): PagedAsyncIterableIterator<HandleItem, DirectoryListHandlesResponse>;
+ }
-     get name(): string;
+ 
-     get path(): string;
+ // @public
-     rename(destinationPath: string, options?: DirectoryRenameOptions): Promise<{
+ export interface ShareGetStatisticsOptions extends CommonOptions {
-         destinationDirectoryClient: ShareDirectoryClient;
+     abortSignal?: AbortSignalLike;
-         directoryRenameResponse: DirectoryRenameResponse;
+     leaseAccessConditions?: LeaseAccessConditions;
-     }>;
+ }
-     setMetadata(metadata?: Metadata, options?: DirectorySetMetadataOptions): Promise<DirectorySetMetadataResponse>;
+ 
-     setProperties(properties?: DirectoryProperties): Promise<DirectorySetPropertiesResponse>;
+ // @public
-     get shareName(): string;
+ export type ShareGetStatisticsResponse = ShareGetStatisticsResponseModel & {
- }
+     shareUsage: number;
- 
+ };
- // @public
+ 
- export interface ShareExistsOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export type ShareGetStatisticsResponseModel = WithResponse<ShareGetStatisticsHeaders & ShareStats, ShareGetStatisticsHeaders, ShareStats>;
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ // @public
- 
+ export interface ShareItem {
- // @public
+     // (undocumented)
- export class ShareFileClient extends StorageClient {
+     deleted?: boolean;
-     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
+     // (undocumented)
-     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
+     metadata?: {
-     abortCopyFromURL(copyId: string, options?: FileAbortCopyFromURLOptions): Promise<FileAbortCopyResponse>;
+         [propertyName: string]: string;
-     clearRange(offset: number, contentLength: number, options?: FileClearRangeOptions): Promise<FileUploadRangeResponse>;
+     };
-     create(size: number, options?: FileCreateOptions): Promise<FileCreateResponse>;
+     // (undocumented)
-     createHardLink(targetFile: string, options?: FileCreateHardLinkOptions): Promise<FileCreateHardLinkResponse>;
+     name: string;
-     createSymbolicLink(linkText: string, options?: FileCreateSymbolicLinkOptions): Promise<FileCreateSymbolicLinkResponse>;
+     // (undocumented)
-     delete(options?: FileDeleteOptions): Promise<FileDeleteResponse>;
+     properties: ShareProperties;
-     deleteIfExists(options?: FileDeleteOptions): Promise<FileDeleteIfExistsResponse>;
+     // (undocumented)
-     download(offset?: number, count?: number, options?: FileDownloadOptions): Promise<FileDownloadResponseModel>;
+     snapshot?: string;
-     downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: FileDownloadToBufferOptions): Promise<Buffer>;
+     // (undocumented)
-     downloadToBuffer(offset?: number, count?: number, options?: FileDownloadToBufferOptions): Promise<Buffer>;
+     version?: string;
-     downloadToFile(filePath: string, offset?: number, count?: number, options?: FileDownloadOptions): Promise<FileDownloadResponseModel>;
+ }
-     exists(options?: FileExistsOptions): Promise<boolean>;
+ 
-     forceCloseAllHandles(options?: FileForceCloseHandlesOptions): Promise<CloseHandlesInfo>;
+ // @public
-     forceCloseHandle(handleId: string, options?: FileForceCloseHandlesOptions): Promise<FileForceCloseHandlesResponse>;
+ export interface ShareItemInternal {
-     generateSasStringToSign(options: FileGenerateSasUrlOptions): string;
+     // (undocumented)
-     generateSasUrl(options: FileGenerateSasUrlOptions): string;
+     deleted?: boolean;
-     getProperties(options?: FileGetPropertiesOptions): Promise<FileGetPropertiesResponse>;
+     metadata?: {
-     getRangeList(options?: FileGetRangeListOptions): Promise<FileGetRangeListResponse>;
+         [propertyName: string]: string;
-     getRangeListDiff(prevShareSnapshot: string, options?: FileGetRangeListOptions): Promise<FileGetRangeListDiffResponse>;
+     };
-     getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient;
+     // (undocumented)
-     getSymbolicLink(options?: FileGetSymbolicLinkOptions): Promise<FileGetSymbolicLinkResponse>;
+     name: string;
-     listHandles(options?: FileListHandlesOptions): PagedAsyncIterableIterator<HandleItem, FileListHandlesResponse>;
+     properties: SharePropertiesInternal;
-     get name(): string;
+     // (undocumented)
-     get path(): string;
+     snapshot?: string;
-     rename(destinationPath: string, options?: FileRenameOptions): Promise<{
+     // (undocumented)
-         destinationFileClient: ShareFileClient;
+     version?: string;
-         fileRenameResponse: FileRenameResponse;
+ }
-     }>;
+ 
-     resize(length: number, options?: FileResizeOptions): Promise<FileSetHTTPHeadersResponse>;
+ // @public
-     setHttpHeaders(fileHttpHeaders?: FileHttpHeaders, options?: FileSetHttpHeadersOptions): Promise<FileSetHTTPHeadersResponse>;
+ export class ShareLeaseClient {
-     setMetadata(metadata?: Metadata, options?: FileSetMetadataOptions): Promise<FileSetMetadataResponse>;
+     constructor(client: ShareFileClient | ShareClient, leaseId?: string);
-     setProperties(properties?: FileProperties): Promise<SetPropertiesResponse>;
+     acquireLease(duration?: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     get shareName(): string;
+     breakLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     startCopyFromURL(copySource: string, options?: FileStartCopyOptions): Promise<FileStartCopyResponse>;
+     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: FileParallelUploadOptions): Promise<void>;
+     get leaseId(): string;
-     uploadFile(filePath: string, options?: FileParallelUploadOptions): Promise<void>;
+     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     uploadRange(body: HttpRequestBody, offset: number, contentLength: number, options?: FileUploadRangeOptions): Promise<FileUploadRangeResponse>;
+     renewLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     uploadRangeFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: FileUploadRangeFromURLOptions): Promise<FileUploadRangeFromURLResponse>;
+     get url(): string;
-     uploadResetableStream(streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream, size: number, options?: FileParallelUploadOptions): Promise<void>;
+ }
-     uploadSeekableBlob(blobFactory: (offset: number, size: number) => Blob, size: number, options?: FileParallelUploadOptions): Promise<void>;
+ 
-     uploadStream(stream: NodeJS.ReadableStream, size: number, bufferSize: number, maxBuffers: number, options?: FileUploadStreamOptions): Promise<void>;
+ // @public
-     withShareSnapshot(shareSnapshot: string): ShareFileClient;
+ export interface SharePermission {
- }
+     // (undocumented)
- 
+     format?: FilePermissionFormat;
- // @public
+     permission: string;
- export type ShareFileHandleAccessRights = "Read" | "Write" | "Delete";
+ }
- export interface ShareFileRangeList {
+ export type ShareProperties = SharePropertiesInternal & {
-     // (undocumented)
+     protocols?: ShareProtocols;
-     clearRanges?: ClearRange[];
+ };
-     // (undocumented)
+ 
-     ranges?: RangeModel[];
+ // @public
- }
+ export interface SharePropertiesInternal {
- 
+     // (undocumented)
- // @public
+     accessTier?: string;
- export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     // (undocumented)
-     permissions?: ShareSASPermissions;
+     accessTierChangeTime?: Date;
- }
+     // (undocumented)
- 
+     accessTierTransitionState?: string;
- // @public
+     // (undocumented)
- export interface ShareGetAccessPolicyHeaders {
+     deletedTime?: Date;
-     date?: Date;
+     // (undocumented)
-     errorCode?: string;
+     enabledProtocols?: string;
-     etag?: string;
+     // (undocumented)
-     lastModified?: Date;
+     enableSnapshotVirtualDirectoryAccess?: boolean;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     etag: string;
- }
+     // (undocumented)
- 
+     includedBurstIops?: number;
- // @public
+     // (undocumented)
- export interface ShareGetAccessPolicyOptions extends CommonOptions {
+     lastModified: Date;
-     abortSignal?: AbortSignalLike;
+     leaseDuration?: LeaseDurationType;
-     leaseAccessConditions?: LeaseAccessConditions;
+     leaseState?: LeaseStateType;
- }
+     leaseStatus?: LeaseStatusType;
- 
+     // (undocumented)
- // @public (undocumented)
+     maxBurstCreditsForIops?: number;
- export type ShareGetAccessPolicyResponse = WithResponse<{
+     // (undocumented)
-     signedIdentifiers: SignedIdentifier[];
+     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
- } & ShareGetAccessPolicyHeaders, ShareGetAccessPolicyHeaders, SignedIdentifierModel[]>;
+     // (undocumented)
- 
+     nextAllowedProvisionedIopsDowngradeTime?: Date;
- // @public
+     // (undocumented)
- export interface ShareGetPermissionHeaders {
+     nextAllowedQuotaDowngradeTime?: Date;
-     date?: Date;
+     // (undocumented)
-     errorCode?: string;
+     paidBurstingEnabled?: boolean;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     paidBurstingMaxBandwidthMibps?: number;
- }
+     // (undocumented)
- 
+     paidBurstingMaxIops?: number;
- // @public
+     // (undocumented)
- export interface ShareGetPermissionOptions extends CommonOptions {
+     provisionedBandwidthMiBps?: number;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     filePermissionFormat?: FilePermissionFormat;
+     provisionedEgressMBps?: number;
- }
+     // (undocumented)
- 
+     provisionedIngressMBps?: number;
- // @public
+     // (undocumented)
- export type ShareGetPermissionResponse = WithResponse<ShareGetPermissionHeaders & SharePermission, ShareGetPermissionHeaders, SharePermission>;
+     provisionedIops?: number;
- 
+     // (undocumented)
- // @public
+     quota: number;
- export interface ShareGetPropertiesHeaders {
+     // (undocumented)
-     accessTier?: string;
+     remainingRetentionDays?: number;
-     accessTierChangeTime?: Date;
+     // (undocumented)
-     accessTierTransitionState?: string;
+     rootSquash?: ShareRootSquash;
-     date?: Date;
+ }
-     enabledProtocols?: string;
+ 
-     enableSnapshotVirtualDirectoryAccess?: boolean;
+ // @public
-     errorCode?: string;
+ export interface ShareProtocolSettings {
-     etag?: string;
+     smb?: ShareSmbSettings;
-     includedBurstIops?: number;
+ }
-     lastModified?: Date;
+ 
-     leaseDuration?: LeaseDurationType;
+ // @public
-     leaseState?: LeaseStateType;
+ export type ShareRootSquash = "NoRootSquash" | "RootSquash" | "AllSquash";
-     leaseStatus?: LeaseStatusType;
+ 
-     maxBurstCreditsForIops?: number;
+ // @public
-     metadata?: {
+ export class ShareServiceClient extends StorageClient {
-         [propertyName: string]: string;
+     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
-     };
+     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
-     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
+     createShare(shareName: string, options?: ShareCreateOptions): Promise<{
-     nextAllowedProvisionedIopsDowngradeTime?: Date;
+         shareCreateResponse: ShareCreateResponse;
-     nextAllowedQuotaDowngradeTime?: Date;
+         shareClient: ShareClient;
-     paidBurstingEnabled?: boolean;
+     }>;
-     paidBurstingMaxBandwidthMibps?: number;
+     deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
-     paidBurstingMaxIops?: number;
+     static fromConnectionString(connectionString: string, options?: ShareClientOptions): ShareServiceClient;
-     provisionedBandwidthMibps?: number;
+     // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
-     provisionedEgressMBps?: number;
+     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     provisionedIngressMBps?: number;
+     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     provisionedIops?: number;
+     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
-     quota?: number;
+     getShareClient(shareName: string): ShareClient;
-     requestId?: string;
+     listShares(options?: ServiceListSharesOptions): PagedAsyncIterableIterator<ShareItem, ServiceListSharesSegmentResponse>;
-     rootSquash?: ShareRootSquash;
+     setProperties(properties: FileServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
-     version?: string;
+     undeleteShare(deletedShareName: string, deletedShareVersion: string, options?: ServiceUndeleteShareOptions): Promise<ShareClient>;
- export interface ShareGetPropertiesOptions extends CommonOptions {
+ export interface ShareSetAccessPolicyHeaders {
-     abortSignal?: AbortSignalLike;
+     date?: Date;
-     leaseAccessConditions?: LeaseAccessConditions;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export type ShareGetPropertiesResponse = ShareGetPropertiesResponseModel & {
+     version?: string;
-     protocols?: ShareProtocols;
+ }
- };
+ 
- 
+ // @public
- // @public
+ export interface ShareSetAccessPolicyOptions extends CommonOptions {
- export type ShareGetPropertiesResponseModel = WithResponse<ShareGetPropertiesHeaders, ShareGetPropertiesHeaders>;
+     abortSignal?: AbortSignalLike;
- 
+     leaseAccessConditions?: LeaseAccessConditions;
- // @public
+ }
- export interface ShareGetStatisticsHeaders {
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export type ShareSetAccessPolicyResponse = WithResponse<ShareSetAccessPolicyHeaders, ShareGetAccessPolicyHeaders>;
-     etag?: string;
+ 
-     lastModified?: Date;
+ // @public
-     requestId?: string;
+ export interface ShareSetMetadataHeaders {
-     version?: string;
+     date?: Date;
- }
+     errorCode?: string;
- 
+     etag?: string;
- // @public
+     lastModified?: Date;
- export interface ShareGetStatisticsOptions extends CommonOptions {
+     requestId?: string;
-     abortSignal?: AbortSignalLike;
+     version?: string;
-     leaseAccessConditions?: LeaseAccessConditions;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ShareSetMetadataOptions extends CommonOptions {
- export type ShareGetStatisticsResponse = ShareGetStatisticsResponseModel & {
+     abortSignal?: AbortSignalLike;
-     shareUsage: number;
+     leaseAccessConditions?: LeaseAccessConditions;
- };
+ }
- export type ShareGetStatisticsResponseModel = WithResponse<ShareGetStatisticsHeaders & ShareStats, ShareGetStatisticsHeaders, ShareStats>;
+ export type ShareSetMetadataResponse = WithResponse<ShareSetMetadataHeaders, ShareSetMetadataHeaders>;
- export interface ShareItem {
+ export interface ShareSetPropertiesHeaders {
-     // (undocumented)
+     date?: Date;
-     deleted?: boolean;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     metadata?: {
+     includedBurstIops?: number;
-         [propertyName: string]: string;
+     lastModified?: Date;
-     };
+     maxBurstCreditsForIops?: number;
-     // (undocumented)
+     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
-     name: string;
+     nextAllowedProvisionedIopsDowngradeTime?: Date;
-     // (undocumented)
+     nextAllowedQuotaDowngradeTime?: Date;
-     properties: ShareProperties;
+     provisionedBandwidthMibps?: number;
-     // (undocumented)
+     provisionedIops?: number;
-     snapshot?: string;
+     quota?: number;
-     // (undocumented)
+     requestId?: string;
- export interface ShareItemInternal {
+ export interface ShareSetPropertiesOptions extends CommonOptions {
-     // (undocumented)
+     abortSignal?: AbortSignalLike;
-     deleted?: boolean;
+     accessTier?: ShareAccessTier;
-     metadata?: {
+     enableSnapshotVirtualDirectoryAccess?: boolean;
-         [propertyName: string]: string;
+     leaseAccessConditions?: LeaseAccessConditions;
-     };
+     paidBurstingEnabled?: boolean;
-     // (undocumented)
+     paidBurstingMaxBandwidthMibps?: number;
-     name: string;
+     paidBurstingMaxIops?: number;
-     properties: SharePropertiesInternal;
+     quotaInGB?: number;
-     // (undocumented)
+     rootSquash?: ShareRootSquash;
-     snapshot?: string;
+     shareProvisionedBandwidthMibps?: number;
-     // (undocumented)
+     shareProvisionedIops?: number;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type ShareSetPropertiesResponse = WithResponse<ShareSetPropertiesHeaders, ShareSetPropertiesHeaders>;
- export class ShareLeaseClient {
+ 
-     constructor(client: ShareFileClient | ShareClient, leaseId?: string);
+ // @public
-     acquireLease(duration?: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+ export type ShareSetQuotaHeaders = ShareSetPropertiesHeaders;
-     breakLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+ 
-     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+ // @public
-     get leaseId(): string;
+ export interface ShareSetQuotaOptions extends CommonOptions {
-     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     abortSignal?: AbortSignalLike;
-     renewLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     leaseAccessConditions?: LeaseAccessConditions;
-     get url(): string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type ShareSetQuotaResponse = WithResponse<ShareSetQuotaHeaders, ShareSetQuotaHeaders>;
- export interface SharePermission {
+ 
-     // (undocumented)
+ // @public
-     format?: FilePermissionFormat;
+ export interface ShareSmbSettings {
-     permission: string;
+     multichannel?: SmbMultichannel;
- export type ShareProperties = SharePropertiesInternal & {
+ export interface ShareStats {
-     protocols?: ShareProtocols;
+     shareUsageBytes: number;
- };
+ }
- export interface SharePropertiesInternal {
+ export type ShareTokenIntent = string;
-     // (undocumented)
+ 
-     accessTier?: string;
+ // @public
-     // (undocumented)
+ export interface SignedIdentifier {
-     accessTierChangeTime?: Date;
+     accessPolicy: {
-     // (undocumented)
+         startsOn: Date;
-     accessTierTransitionState?: string;
+         expiresOn: Date;
-     // (undocumented)
+         permissions: string;
-     deletedTime?: Date;
+     };
-     // (undocumented)
+     id: string;
-     enabledProtocols?: string;
+ }
-     // (undocumented)
+ 
-     enableSnapshotVirtualDirectoryAccess?: boolean;
+ // @public
-     // (undocumented)
+ export interface SignedIdentifierModel {
-     etag: string;
+     accessPolicy?: AccessPolicy;
-     // (undocumented)
+     id: string;
-     includedBurstIops?: number;
+ }
-     // (undocumented)
+ 
-     lastModified: Date;
+ // @public
-     leaseDuration?: LeaseDurationType;
+ export interface SmbMultichannel {
-     leaseState?: LeaseStateType;
+     enabled?: boolean;
-     leaseStatus?: LeaseStatusType;
+ }
-     // (undocumented)
+ 
-     maxBurstCreditsForIops?: number;
+ // @public
-     // (undocumented)
+ export interface SourceModifiedAccessConditions {
-     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
+     sourceIfMatchCrc64?: Uint8Array;
-     // (undocumented)
+     sourceIfNoneMatchCrc64?: Uint8Array;
-     nextAllowedProvisionedIopsDowngradeTime?: Date;
+ }
-     // (undocumented)
+ 
-     nextAllowedQuotaDowngradeTime?: Date;
+ export { StorageBrowserPolicyFactory }
-     // (undocumented)
+ 
-     paidBurstingEnabled?: boolean;
+ // @public
-     // (undocumented)
+ export interface StoragePipelineOptions {
-     paidBurstingMaxBandwidthMibps?: number;
+     audience?: string;
-     // (undocumented)
+     httpClient?: RequestPolicy;
-     paidBurstingMaxIops?: number;
+     keepAliveOptions?: KeepAliveOptions;
-     // (undocumented)
+     proxyOptions?: ProxySettings;
-     provisionedBandwidthMiBps?: number;
+     retryOptions?: StorageRetryOptions;
-     // (undocumented)
+     userAgentOptions?: UserAgentPolicyOptions;
-     provisionedEgressMBps?: number;
+ }
-     // (undocumented)
+ 
-     provisionedIngressMBps?: number;
+ // @public
-     // (undocumented)
+ export interface StorageRetryOptions {
-     provisionedIops?: number;
+     readonly maxRetryDelayInMs?: number;
-     // (undocumented)
+     readonly maxTries?: number;
-     quota: number;
+     readonly retryDelayInMs?: number;
-     // (undocumented)
+     readonly retryPolicyType?: StorageRetryPolicyType;
-     remainingRetentionDays?: number;
+     readonly tryTimeoutInMs?: number;
-     // (undocumented)
+ }
-     rootSquash?: ShareRootSquash;
+ 
- }
+ // @public
- 
+ export class StorageRetryPolicy extends BaseRequestPolicy {
- // @public
+     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, retryOptions?: StorageRetryOptions);
- export interface ShareProtocols {
+     protected attemptSendRequest(request: WebResourceLike, secondaryHas404: boolean, attempt: number): Promise<CompatResponse>;
-     nfsEnabled?: boolean;
+     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
-     smbEnabled?: boolean;
+     protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: CompatResponse, err?: RestError): boolean;
- export interface ShareProtocolSettings {
+ export class StorageRetryPolicyFactory implements RequestPolicyFactory {
-     smb?: ShareSmbSettings;
+     constructor(retryOptions?: StorageRetryOptions);
- }
+     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageRetryPolicy;
- 
+ }
- // @public
+ 
- export type ShareRootSquash = "NoRootSquash" | "RootSquash" | "AllSquash";
+ // @public
- 
+ export enum StorageRetryPolicyType {
- // @public
+     EXPONENTIAL = 0,
- export class ShareSASPermissions {
+     FIXED = 1
-     create: boolean;
+ }
-     delete: boolean;
+ 
-     list: boolean;
+ // @public
-     static parse(permissions: string): ShareSASPermissions;
+ export type TimeNowType = "now";
-     read: boolean;
+ 
-     toString(): string;
+ // @public
-     write: boolean;
+ export type TimePreserveType = "preserve";
- }
+ 
- 
+ // @public
- // @public
+ export function toOctalFileMode(input?: NfsFileMode): string | undefined;
- export class ShareServiceClient extends StorageClient {
+ 
-     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
+ // @public
-     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
+ export function toSymbolicFileMode(input?: NfsFileMode): string | undefined;
-     createShare(shareName: string, options?: ShareCreateOptions): Promise<{
+ 
-         shareCreateResponse: ShareCreateResponse;
+ // @public
-         shareClient: ShareClient;
+ export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
-     }>;
+ 
-     deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
+ // (No @packageDocumentation comment for this package)
-     static fromConnectionString(connectionString: string, options?: ShareClientOptions): ShareServiceClient;
+ 
-     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ ```
-     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ 
-     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
+ 
-     getShareClient(shareName: string): ShareClient;
+ 
-     listShares(options?: ServiceListSharesOptions): PagedAsyncIterableIterator<ShareItem, ServiceListSharesSegmentResponse>;
+ 
-     setProperties(properties: FileServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
+ 
-     undeleteShare(deletedShareName: string, deletedShareVersion: string, options?: ServiceUndeleteShareOptions): Promise<ShareClient>;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetAccessPolicyHeaders {
+ 
-     date?: Date;
+ 
-     errorCode?: string;
+ 
-     etag?: string;
+ 
-     lastModified?: Date;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetAccessPolicyOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ShareSetAccessPolicyResponse = WithResponse<ShareSetAccessPolicyHeaders, ShareGetAccessPolicyHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetMetadataHeaders {
+ 
-     date?: Date;
+ 
-     errorCode?: string;
+ 
-     etag?: string;
+ 
-     lastModified?: Date;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetMetadataOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ShareSetMetadataResponse = WithResponse<ShareSetMetadataHeaders, ShareSetMetadataHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetPropertiesHeaders {
+ 
-     date?: Date;
+ 
-     errorCode?: string;
+ 
-     etag?: string;
+ 
-     includedBurstIops?: number;
+ 
-     lastModified?: Date;
+ 
-     maxBurstCreditsForIops?: number;
+ 
-     nextAllowedProvisionedBandwidthDowngradeTime?: Date;
+ 
-     nextAllowedProvisionedIopsDowngradeTime?: Date;
+ 
-     nextAllowedQuotaDowngradeTime?: Date;
+ 
-     provisionedBandwidthMibps?: number;
+ 
-     provisionedIops?: number;
+ 
-     quota?: number;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetPropertiesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     accessTier?: ShareAccessTier;
+ 
-     enableSnapshotVirtualDirectoryAccess?: boolean;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
-     paidBurstingEnabled?: boolean;
+ 
-     paidBurstingMaxBandwidthMibps?: number;
+ 
-     paidBurstingMaxIops?: number;
+ 
-     quotaInGB?: number;
+ 
-     rootSquash?: ShareRootSquash;
+ 
-     shareProvisionedBandwidthMibps?: number;
+ 
-     shareProvisionedIops?: number;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ShareSetPropertiesResponse = WithResponse<ShareSetPropertiesHeaders, ShareSetPropertiesHeaders>;
+ 
- 
+ 
- // @public
+ 
- export type ShareSetQuotaHeaders = ShareSetPropertiesHeaders;
+ 
- 
+ 
- // @public
+ 
- export interface ShareSetQuotaOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     leaseAccessConditions?: LeaseAccessConditions;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ShareSetQuotaResponse = WithResponse<ShareSetQuotaHeaders, ShareSetQuotaHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ShareSmbSettings {
+ 
-     multichannel?: SmbMultichannel;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ShareStats {
+ 
-     shareUsageBytes: number;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ShareTokenIntent = string;
+ 
- 
+ 
- // @public
+ 
- export interface SignedIdentifier {
+ 
-     accessPolicy: {
+ 
-         startsOn: Date;
+ 
-         expiresOn: Date;
+ 
-         permissions: string;
+ 
-     };
+ 
-     id: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SignedIdentifierModel {
+ 
-     accessPolicy?: AccessPolicy;
+ 
-     id: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SmbMultichannel {
+ 
-     enabled?: boolean;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SourceModifiedAccessConditions {
+ 
-     sourceIfMatchCrc64?: Uint8Array;
+ 
-     sourceIfNoneMatchCrc64?: Uint8Array;
+ 
- }
+ 
- 
+ 
- export { StorageBrowserPolicyFactory }
+ 
- 
+ 
- // @public
+ 
- export enum StorageFileAudience {
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
- // @public
+ 
- export interface StorageRetryOptions {
+ 
-     readonly maxRetryDelayInMs?: number;
+ 
-     readonly maxTries?: number;
+ 
-     readonly retryDelayInMs?: number;
+ 
-     readonly retryPolicyType?: StorageRetryPolicyType;
+ 
-     readonly tryTimeoutInMs?: number;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageRetryPolicy extends BaseRequestPolicy {
+ 
-     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryOptions?: StorageRetryOptions);
+ 
-     protected attemptSendRequest(request: WebResource, secondaryHas404: boolean, attempt: number): Promise<HttpOperationResponse>;
+ 
-     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
+ 
-     protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: HttpOperationResponse, err?: RestError): boolean;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageRetryPolicyFactory implements RequestPolicyFactory {
+ 
-     constructor(retryOptions?: StorageRetryOptions);
+ 
-     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export enum StorageRetryPolicyType {
+ 
-     EXPONENTIAL = 0,
+ 
-     FIXED = 1
+ 
- }
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
- // @public
+ 
- export type TimeNowType = "now";
+ 
- 
+ 
- // @public
+ 
- export type TimePreserveType = "preserve";
+ 
- 
+ 
- // @public
+ 
- export function toOctalFileMode(input?: NfsFileMode): string | undefined;
+ 
- 
+ 
- // @public
+ 
- export function toSymbolicFileMode(input?: NfsFileMode): string | undefined;
+ 
- 
+ 
- export { WebResource }
+ 
- 
+ 
- // @public
+ 
- export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
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