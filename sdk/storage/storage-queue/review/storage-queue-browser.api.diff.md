# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
+ import type { HttpHeadersLike } from '@azure/core-http-compat';
- import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
+ import type { KeepAliveOptions } from '@azure/core-http-compat';
- import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
+ import type { OperationTracingOptions } from '@azure/core-tracing';
- import type { KeepAliveOptions } from '@azure/core-http-compat';
+ import type { PagedAsyncIterableIterator } from '@azure/core-paging';
- import type { OperationTracingOptions } from '@azure/core-tracing';
+ import type { ProxySettings } from '@azure/core-rest-pipeline';
- import type { PagedAsyncIterableIterator } from '@azure/core-paging';
+ import { RequestPolicy } from '@azure/core-http-compat';
- import type { ProxySettings } from '@azure/core-rest-pipeline';
+ import { RequestPolicyFactory } from '@azure/core-http-compat';
- import { RequestPolicy } from '@azure/core-http-compat';
+ import { RestError } from '@azure/core-rest-pipeline';
- import { RequestPolicyFactory } from '@azure/core-http-compat';
+ import { StorageBrowserPolicyFactory } from '@azure/storage-blob';
- import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
+ import type { StorageRetryOptions } from '@azure/storage-blob';
- import { RestError } from '@azure/core-rest-pipeline';
+ import { StorageRetryPolicyFactory } from '@azure/storage-blob';
- import { StorageBrowserPolicyFactory } from '@azure/storage-blob';
+ import { StorageSharedKeyCredential } from '@azure/storage-blob';
- import type { StorageRetryOptions } from '@azure/storage-blob';
+ import type { TokenCredential } from '@azure/core-auth';
- import { StorageRetryPolicyFactory } from '@azure/storage-blob';
+ import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
- import { StorageSharedKeyCredential } from '@azure/storage-blob';
+ import type { WebResourceLike } from '@azure/core-http-compat';
- import { StorageSharedKeyCredentialPolicy } from '@azure/storage-blob';
+ 
- import type { TokenCredential } from '@azure/core-auth';
+ // @public
- import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
+ export interface AccessPolicy {
- import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+     expiresOn?: string;
- 
+     permissions?: string;
- // @public
+     startsOn?: string;
- export interface AccessPolicy {
+ }
-     expiresOn?: string;
+ 
-     permissions?: string;
+ export { AnonymousCredential }
-     startsOn?: string;
+ 
- }
+ export { AnonymousCredentialPolicy }
- // @public
+ export { BaseRequestPolicy }
- export class AccountSASPermissions {
+ 
-     add: boolean;
+ // @public
-     create: boolean;
+ export interface CommonOptions {
-     delete: boolean;
+     tracingOptions?: OperationTracingOptions;
-     list: boolean;
+ }
-     static parse(permissions: string): AccountSASPermissions;
+ 
-     process: boolean;
+ // @public
-     read: boolean;
+ export interface CorsRule {
-     toString(): string;
+     allowedHeaders: string;
-     update: boolean;
+     allowedMethods: string;
-     write: boolean;
+     allowedOrigins: string;
- }
+     exposedHeaders: string;
- 
+     maxAgeInSeconds: number;
- // @public
+ }
- export class AccountSASResourceTypes {
+ 
-     container: boolean;
+ export { Credential_2 as Credential }
-     object: boolean;
+ 
-     static parse(resourceTypes: string): AccountSASResourceTypes;
+ export { CredentialPolicy }
-     service: boolean;
+ 
-     toString(): string;
+ // @public
- }
+ export interface DequeuedMessageItem {
- 
+     dequeueCount: number;
- // @public
+     expiresOn: Date;
- export class AccountSASServices {
+     insertedOn: Date;
-     blob: boolean;
+     messageId: string;
-     file: boolean;
+     messageText: string;
-     static parse(services: string): AccountSASServices;
+     nextVisibleOn: Date;
-     queue: boolean;
+     popReceipt: string;
-     table: boolean;
+ }
-     toString(): string;
+ 
- }
+ // @public
- 
+ export interface EnqueuedMessage {
- // @public
+     expiresOn: Date;
- export interface AccountSASSignatureValues {
+     insertedOn: Date;
-     expiresOn: Date;
+     messageId: string;
-     ipRange?: SasIPRange;
+     nextVisibleOn: Date;
-     permissions: AccountSASPermissions;
+     popReceipt: string;
-     protocol?: SASProtocol;
+ }
-     resourceTypes: string;
+ 
-     services: string;
+ // @public
-     startsOn?: Date;
+ export interface GeoReplication {
-     version?: string;
+     lastSyncOn: Date;
- }
+     status: GeoReplicationStatusType;
- 
+ }
- export { AnonymousCredential }
+ 
- 
+ // @public
- export { AnonymousCredentialPolicy }
+ export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
- export { BaseRequestPolicy }
+ // @public
- 
+ export interface HttpResponse {
- // @public
+     headers: HttpHeadersLike;
- export interface CommonOptions {
+     request: WebResourceLike;
-     tracingOptions?: OperationTracingOptions;
+     status: number;
- export interface CorsRule {
+ export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
-     allowedHeaders: string;
+ 
-     allowedMethods: string;
+ // @public
-     allowedOrigins: string;
+ export interface ListQueuesSegmentResponse {
-     exposedHeaders: string;
+     // (undocumented)
-     maxAgeInSeconds: number;
+     continuationToken: string;
- }
+     // (undocumented)
- 
+     marker?: string;
- export { Credential_2 as Credential }
+     // (undocumented)
- 
+     maxPageSize: number;
- export { CredentialPolicy }
+     // (undocumented)
- 
+     prefix: string;
- // @public
+     // (undocumented)
- export interface DequeuedMessageItem {
+     queueItems?: QueueItem[];
-     dequeueCount: number;
+     // (undocumented)
-     expiresOn: Date;
+     serviceEndpoint: string;
-     insertedOn: Date;
+ }
-     messageId: string;
+ 
-     messageText: string;
+ // @public
-     nextVisibleOn: Date;
+ export const logger: AzureLogger;
-     popReceipt: string;
+ 
- }
+ // @public
- 
+ export interface Logging {
- // @public
+     deleteProperty: boolean;
- export interface EnqueuedMessage {
+     read: boolean;
-     expiresOn: Date;
+     retentionPolicy: RetentionPolicy;
-     insertedOn: Date;
+     version: string;
-     messageId: string;
+     write: boolean;
-     nextVisibleOn: Date;
+ }
-     popReceipt: string;
+ 
- }
+ // @public
- 
+ export interface MessageIdDeleteHeaders {
- // @public
+     clientRequestId?: string;
- export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export function generateQueueSASQueryParameters(queueSASSignatureValues: QueueSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     version?: string;
- 
+ }
- // @public
+ 
- export interface GeoReplication {
+ // @public
-     lastSyncOn: Date;
+ export type MessageIdDeleteResponse = WithResponse<MessageIdDeleteHeaders, MessageIdDeleteHeaders>;
-     status: GeoReplicationStatusType;
+ 
- }
+ // @public
- 
+ export interface MessageIdUpdateHeaders {
- // @public
+     clientRequestId?: string;
- export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     nextVisibleOn?: Date;
- export function getQueueServiceAccountAudience(storageAccountName: string): string;
+     popReceipt?: string;
- 
+     requestId?: string;
- export { HttpHeaders }
+     version?: string;
- 
+ }
- export { HttpOperationResponse }
+ 
- 
+ // @public
- export { HttpRequestBody }
+ export type MessageIdUpdateResponse = WithResponse<MessageIdUpdateHeaders, MessageIdUpdateHeaders>;
- export interface HttpResponse {
+ export interface MessagesClearHeaders {
-     headers: HttpHeaders;
+     clientRequestId?: string;
-     request: WebResource;
+     date?: Date;
-     status: number;
+     errorCode?: string;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
+ 
- 
+ // @public
- // @public
+ export type MessagesClearResponse = WithResponse<MessagesClearHeaders, MessagesClearHeaders>;
- export type ListQueuesIncludeType = "metadata";
+ 
- 
+ // @public
- // @public
+ export interface MessagesDequeueHeaders {
- export interface ListQueuesSegmentResponse {
+     clientRequestId?: string;
-     // (undocumented)
+     date?: Date;
-     continuationToken: string;
+     errorCode?: string;
-     // (undocumented)
+     requestId?: string;
-     marker?: string;
+     version?: string;
-     // (undocumented)
+ }
-     maxPageSize: number;
+ 
-     // (undocumented)
+ // @public
-     prefix: string;
+ export interface MessagesDequeueOptionalParams extends CommonOptions {
-     // (undocumented)
+     numberOfMessages?: number;
-     queueItems?: QueueItem[];
+     requestId?: string;
-     // (undocumented)
+     timeoutInSeconds?: number;
-     serviceEndpoint: string;
+     visibilityTimeout?: number;
- export const logger: AzureLogger;
+ export interface MessagesEnqueueHeaders {
- 
+     clientRequestId?: string;
- // @public
+     date?: Date;
- export interface Logging {
+     errorCode?: string;
-     deleteProperty: boolean;
+     requestId?: string;
-     read: boolean;
+     version?: string;
-     retentionPolicy: RetentionPolicy;
+ }
-     version: string;
+ 
-     write: boolean;
+ // @public
- }
+ export interface MessagesEnqueueOptionalParams extends CommonOptions {
- 
+     messageTimeToLive?: number;
- // @public
+     requestId?: string;
- export interface MessageIdDeleteHeaders {
+     timeoutInSeconds?: number;
-     clientRequestId?: string;
+     visibilityTimeout?: number;
-     date?: Date;
+ }
-     errorCode?: string;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export interface MessagesPeekHeaders {
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export type MessageIdDeleteResponse = WithResponse<MessageIdDeleteHeaders, MessageIdDeleteHeaders>;
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface MessageIdUpdateHeaders {
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface MessagesPeekOptionalParams extends CommonOptions {
-     errorCode?: string;
+     numberOfMessages?: number;
-     nextVisibleOn?: Date;
+     requestId?: string;
-     popReceipt?: string;
+     timeoutInSeconds?: number;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export interface Metadata {
- // @public
+     [propertyName: string]: string;
- export type MessageIdUpdateResponse = WithResponse<MessageIdUpdateHeaders, MessageIdUpdateHeaders>;
+ }
- export interface MessagesClearHeaders {
+ export interface Metrics {
-     clientRequestId?: string;
+     enabled: boolean;
-     date?: Date;
+     includeAPIs?: boolean;
-     errorCode?: string;
+     retentionPolicy?: RetentionPolicy;
-     requestId?: string;
+     version?: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
- export type MessagesClearResponse = WithResponse<MessagesClearHeaders, MessagesClearHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface PeekedMessageItem {
- export interface MessagesDequeueHeaders {
+     dequeueCount: number;
-     clientRequestId?: string;
+     expiresOn: Date;
-     date?: Date;
+     insertedOn: Date;
-     errorCode?: string;
+     messageId: string;
-     requestId?: string;
+     messageText: string;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export class Pipeline implements PipelineLike {
- export interface MessagesDequeueOptionalParams extends CommonOptions {
+     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
-     numberOfMessages?: number;
+     readonly factories: RequestPolicyFactory[];
-     requestId?: string;
+     readonly options: PipelineOptions;
-     timeoutInSeconds?: number;
+     toServiceClientOptions(): ServiceClientOptions;
-     visibilityTimeout?: number;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PipelineLike {
- export interface MessagesEnqueueHeaders {
+     readonly factories: RequestPolicyFactory[];
-     clientRequestId?: string;
+     readonly options: PipelineOptions;
-     date?: Date;
+     toServiceClientOptions(): ServiceClientOptions;
-     errorCode?: string;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface PipelineOptions {
- 
+     httpClient?: RequestPolicy;
- // @public
+ }
- export interface MessagesEnqueueOptionalParams extends CommonOptions {
+ 
-     messageTimeToLive?: number;
+ // @public
-     requestId?: string;
+ export interface QueueClearMessagesOptions extends CommonOptions {
-     timeoutInSeconds?: number;
+     abortSignal?: AbortSignalLike;
-     visibilityTimeout?: number;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type QueueClearMessagesResponse = MessagesClearResponse;
- export interface MessagesPeekHeaders {
+ 
-     clientRequestId?: string;
+ // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
-     date?: Date;
+ //
-     errorCode?: string;
+ // @public
-     requestId?: string;
+ export class QueueClient extends StorageClient {
-     version?: string;
+     constructor(connectionString: string, queueName: string, options?: StoragePipelineOptions);
- }
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- 
+     constructor(url: string, pipeline: Pipeline);
- // @public
+     clearMessages(options?: QueueClearMessagesOptions): Promise<QueueClearMessagesResponse>;
- export interface MessagesPeekOptionalParams extends CommonOptions {
+     create(options?: QueueCreateOptions): Promise<QueueCreateResponse>;
-     numberOfMessages?: number;
+     createIfNotExists(options?: QueueCreateOptions): Promise<QueueCreateIfNotExistsResponse>;
-     requestId?: string;
+     delete(options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
-     timeoutInSeconds?: number;
+     deleteIfExists(options?: QueueDeleteOptions): Promise<QueueDeleteIfExistsResponse>;
- }
+     deleteMessage(messageId: string, popReceipt: string, options?: QueueDeleteMessageOptions): Promise<QueueDeleteMessageResponse>;
- 
+     exists(options?: QueueExistsOptions): Promise<boolean>;
- // @public
+     generateSasStringToSign(options: QueueGenerateSasUrlOptions): string;
- export interface Metadata {
+     generateSasUrl(options: QueueGenerateSasUrlOptions): string;
-     [propertyName: string]: string;
+     getAccessPolicy(options?: QueueGetAccessPolicyOptions): Promise<QueueGetAccessPolicyResponse>;
- }
+     getProperties(options?: QueueGetPropertiesOptions): Promise<QueueGetPropertiesResponse>;
- 
+     get name(): string;
- // @public
+     peekMessages(options?: QueuePeekMessagesOptions): Promise<QueuePeekMessagesResponse>;
- export interface Metrics {
+     receiveMessages(options?: QueueReceiveMessageOptions): Promise<QueueReceiveMessageResponse>;
-     enabled: boolean;
+     sendMessage(messageText: string, options?: QueueSendMessageOptions): Promise<QueueSendMessageResponse>;
-     includeAPIs?: boolean;
+     setAccessPolicy(queueAcl?: SignedIdentifier[], options?: QueueSetAccessPolicyOptions): Promise<QueueSetAccessPolicyResponse>;
-     retentionPolicy?: RetentionPolicy;
+     setMetadata(metadata?: Metadata, options?: QueueSetMetadataOptions): Promise<QueueSetMetadataResponse>;
-     version?: string;
+     updateMessage(messageId: string, popReceipt: string, message?: string, visibilityTimeout?: number, options?: QueueUpdateMessageOptions): Promise<QueueUpdateMessageResponse>;
- export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+ export interface QueueCreateHeaders {
- 
+     clientRequestId?: string;
- // @public
+     date?: Date;
- export interface PeekedMessageItem {
+     errorCode?: string;
-     dequeueCount: number;
+     requestId?: string;
-     expiresOn: Date;
+     version?: string;
-     insertedOn: Date;
+ }
-     messageId: string;
+ 
-     messageText: string;
+ // @public
- }
+ export interface QueueCreateIfNotExistsResponse extends QueueCreateResponse {
- 
+     succeeded: boolean;
- // @public
+ }
- export class Pipeline implements PipelineLike {
+ 
-     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
+ // @public
-     readonly factories: RequestPolicyFactory[];
+ export interface QueueCreateOptions extends CommonOptions {
-     readonly options: PipelineOptions;
+     abortSignal?: AbortSignalLike;
-     toServiceClientOptions(): ServiceClientOptions;
+     metadata?: Metadata;
- export interface PipelineLike {
+ export type QueueCreateResponse = WithResponse<QueueCreateHeaders, QueueCreateHeaders>;
-     readonly factories: RequestPolicyFactory[];
+ 
-     readonly options: PipelineOptions;
+ // @public
-     toServiceClientOptions(): ServiceClientOptions;
+ export interface QueueDeleteHeaders {
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface PipelineOptions {
+     requestId?: string;
-     httpClient?: RequestPolicy;
+     version?: string;
- export interface QueueClearMessagesOptions extends CommonOptions {
+ export interface QueueDeleteIfExistsResponse extends QueueDeleteResponse {
-     abortSignal?: AbortSignalLike;
+     succeeded: boolean;
- export type QueueClearMessagesResponse = MessagesClearResponse;
+ export interface QueueDeleteMessageOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
+ }
- //
+ 
- export class QueueClient extends StorageClient {
+ export type QueueDeleteMessageResponse = MessageIdDeleteResponse;
-     constructor(connectionString: string, queueName: string, options?: StoragePipelineOptions);
+ 
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ // @public
-     constructor(url: string, pipeline: Pipeline);
+ export interface QueueDeleteOptions extends CommonOptions {
-     clearMessages(options?: QueueClearMessagesOptions): Promise<QueueClearMessagesResponse>;
+     abortSignal?: AbortSignalLike;
-     create(options?: QueueCreateOptions): Promise<QueueCreateResponse>;
+ }
-     createIfNotExists(options?: QueueCreateOptions): Promise<QueueCreateIfNotExistsResponse>;
+ 
-     delete(options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
+ // @public
-     deleteIfExists(options?: QueueDeleteOptions): Promise<QueueDeleteIfExistsResponse>;
+ export type QueueDeleteResponse = WithResponse<QueueDeleteHeaders, QueueDeleteHeaders>;
-     deleteMessage(messageId: string, popReceipt: string, options?: QueueDeleteMessageOptions): Promise<QueueDeleteMessageResponse>;
+ 
-     exists(options?: QueueExistsOptions): Promise<boolean>;
+ // @public
-     generateSasStringToSign(options: QueueGenerateSasUrlOptions): string;
+ export interface QueueExistsOptions extends CommonOptions {
-     generateSasUrl(options: QueueGenerateSasUrlOptions): string;
+     abortSignal?: AbortSignalLike;
-     getAccessPolicy(options?: QueueGetAccessPolicyOptions): Promise<QueueGetAccessPolicyResponse>;
+ }
-     getProperties(options?: QueueGetPropertiesOptions): Promise<QueueGetPropertiesResponse>;
+ 
-     get name(): string;
+ // @public
-     peekMessages(options?: QueuePeekMessagesOptions): Promise<QueuePeekMessagesResponse>;
+ export interface QueueGenerateSasUrlOptions {
-     receiveMessages(options?: QueueReceiveMessageOptions): Promise<QueueReceiveMessageResponse>;
+     expiresOn?: Date;
-     sendMessage(messageText: string, options?: QueueSendMessageOptions): Promise<QueueSendMessageResponse>;
+     identifier?: string;
-     setAccessPolicy(queueAcl?: SignedIdentifier[], options?: QueueSetAccessPolicyOptions): Promise<QueueSetAccessPolicyResponse>;
+     ipRange?: SasIPRange;
-     setMetadata(metadata?: Metadata, options?: QueueSetMetadataOptions): Promise<QueueSetMetadataResponse>;
+     permissions?: QueueSASPermissions;
-     updateMessage(messageId: string, popReceipt: string, message?: string, visibilityTimeout?: number, options?: QueueUpdateMessageOptions): Promise<QueueUpdateMessageResponse>;
+     // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
- }
+     protocol?: SASProtocol;
- 
+     startsOn?: Date;
- // @public
+     version?: string;
- export interface QueueCreateHeaders {
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface QueueGetAccessPolicyHeaders {
-     requestId?: string;
+     clientRequestId?: string;
-     version?: string;
+     date?: Date;
- }
+     errorCode?: string;
- 
+     requestId?: string;
- // @public
+     version?: string;
- export interface QueueCreateIfNotExistsResponse extends QueueCreateResponse {
+ }
-     succeeded: boolean;
+ 
- }
+ // @public
- 
+ export interface QueueGetAccessPolicyOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface QueueCreateOptions extends CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     metadata?: Metadata;
+ // @public
- }
+ export type QueueGetAccessPolicyResponse = WithResponse<{
- 
+     signedIdentifiers: SignedIdentifier[];
- // @public
+ } & QueueGetAccessPolicyHeaders, QueueGetAccessPolicyHeaders, SignedIdentifierModel[]>;
- export type QueueCreateResponse = WithResponse<QueueCreateHeaders, QueueCreateHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface QueueGetPropertiesHeaders {
- export interface QueueDeleteHeaders {
+     approximateMessagesCount?: number;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     metadata?: {
- }
+         [propertyName: string]: string;
- 
+     };
- // @public
+     requestId?: string;
- export interface QueueDeleteIfExistsResponse extends QueueDeleteResponse {
+     version?: string;
-     succeeded: boolean;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface QueueGetPropertiesOptions extends CommonOptions {
- export interface QueueDeleteMessageOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type QueueGetPropertiesResponse = WithResponse<QueueGetPropertiesHeaders, QueueGetPropertiesHeaders>;
- export type QueueDeleteMessageResponse = MessageIdDeleteResponse;
+ 
- 
+ // @public
- // @public
+ export interface QueueItem {
- export interface QueueDeleteOptions extends CommonOptions {
+     metadata?: {
-     abortSignal?: AbortSignalLike;
+         [propertyName: string]: string;
- }
+     };
- 
+     name: string;
- // @public
+ }
- export type QueueDeleteResponse = WithResponse<QueueDeleteHeaders, QueueDeleteHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface QueuePeekMessagesOptions extends MessagesPeekOptionalParams, CommonOptions {
- export interface QueueExistsOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type QueuePeekMessagesResponse = WithResponse<{
- export interface QueueGenerateSasUrlOptions {
+     peekedMessageItems: PeekedMessageItem[];
-     expiresOn?: Date;
+ } & MessagesPeekHeaders, MessagesPeekHeaders, PeekedMessageItem[]>;
-     identifier?: string;
+ 
-     ipRange?: SasIPRange;
+ // @public
-     permissions?: QueueSASPermissions;
+ export interface QueueReceiveMessageOptions extends MessagesDequeueOptionalParams, CommonOptions {
-     protocol?: SASProtocol;
+     abortSignal?: AbortSignalLike;
-     startsOn?: Date;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export type QueueReceiveMessageResponse = WithResponse<{
- // @public
+     receivedMessageItems: ReceivedMessageItem[];
- export interface QueueGetAccessPolicyHeaders {
+ } & MessagesDequeueHeaders, MessagesDequeueHeaders, ReceivedMessageItem[]>;
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export class QueueSASPermissions {
-     requestId?: string;
+     add: boolean;
-     version?: string;
+     static parse(permissions: string): QueueSASPermissions;
- }
+     process: boolean;
- 
+     read: boolean;
- // @public
+     toString(): string;
- export interface QueueGetAccessPolicyOptions extends CommonOptions {
+     update: boolean;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {
- export type QueueGetAccessPolicyResponse = WithResponse<{
+     abortSignal?: AbortSignalLike;
-     signedIdentifiers: SignedIdentifier[];
+ }
- } & QueueGetAccessPolicyHeaders, QueueGetAccessPolicyHeaders, SignedIdentifierModel[]>;
+ 
- 
+ // @public
- // @public
+ export type QueueSendMessageResponse = WithResponse<{
- export interface QueueGetPropertiesHeaders {
+     messageId: string;
-     approximateMessagesCount?: number;
+     popReceipt: string;
-     clientRequestId?: string;
+     insertedOn: Date;
-     date?: Date;
+     expiresOn: Date;
-     errorCode?: string;
+     nextVisibleOn: Date;
-     // (undocumented)
+ } & MessagesEnqueueHeaders, MessagesEnqueueHeaders, EnqueuedMessage[]>;
-     metadata?: {
+ 
-         [propertyName: string]: string;
+ // @public
-     };
+ export class QueueServiceClient extends StorageClient {
-     requestId?: string;
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     version?: string;
+     constructor(url: string, pipeline: Pipeline);
- }
+     createQueue(queueName: string, options?: QueueCreateOptions): Promise<QueueCreateResponse>;
- 
+     deleteQueue(queueName: string, options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
- // @public
+     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): QueueServiceClient;
- export interface QueueGetPropertiesOptions extends CommonOptions {
+     // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
-     abortSignal?: AbortSignalLike;
+     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
- }
+     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
- 
+     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
- // @public
+     getQueueClient(queueName: string): QueueClient;
- export type QueueGetPropertiesResponse = WithResponse<QueueGetPropertiesHeaders, QueueGetPropertiesHeaders>;
+     getStatistics(options?: ServiceGetStatisticsOptions): Promise<ServiceGetStatisticsResponse>;
- 
+     listQueues(options?: ServiceListQueuesOptions): PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse>;
- // @public
+     setProperties(properties: QueueServiceProperties, options?: ServiceGetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
- export interface QueueItem {
+ }
-     metadata?: {
+ 
-         [propertyName: string]: string;
+ // @public
-     };
+ export interface QueueServiceProperties {
-     name: string;
+     cors?: CorsRule[];
- }
+     hourMetrics?: Metrics;
- 
+     minuteMetrics?: Metrics;
- // @public
+     queueAnalyticsLogging?: Logging;
- export interface QueuePeekMessagesOptions extends MessagesPeekOptionalParams, CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export interface QueueServiceStatistics {
- // @public
+     geoReplication?: GeoReplication;
- export type QueuePeekMessagesResponse = WithResponse<{
+ }
-     peekedMessageItems: PeekedMessageItem[];
+ 
- } & MessagesPeekHeaders, MessagesPeekHeaders, PeekedMessageItem[]>;
+ // @public
- 
+ export interface QueueSetAccessPolicyHeaders {
- // @public
+     clientRequestId?: string;
- export interface QueueReceiveMessageOptions extends MessagesDequeueOptionalParams, CommonOptions {
+     date?: Date;
-     abortSignal?: AbortSignalLike;
+     errorCode?: string;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export type QueueReceiveMessageResponse = WithResponse<{
+ 
-     receivedMessageItems: ReceivedMessageItem[];
+ // @public
- } & MessagesDequeueHeaders, MessagesDequeueHeaders, ReceivedMessageItem[]>;
+ export interface QueueSetAccessPolicyOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+ }
- export class QueueSASPermissions {
+ 
-     add: boolean;
+ // @public
-     static parse(permissions: string): QueueSASPermissions;
+ export type QueueSetAccessPolicyResponse = WithResponse<QueueSetAccessPolicyHeaders, QueueSetAccessPolicyHeaders>;
-     process: boolean;
+ 
-     read: boolean;
+ // @public
-     toString(): string;
+ export interface QueueSetMetadataHeaders {
-     update: boolean;
+     clientRequestId?: string;
- }
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface QueueSASSignatureValues {
+     version?: string;
-     expiresOn?: Date;
+ }
-     identifier?: string;
+ 
-     ipRange?: SasIPRange;
+ // @public
-     permissions?: QueueSASPermissions;
+ export interface QueueSetMetadataOptions extends CommonOptions {
-     protocol?: SASProtocol;
+     abortSignal?: AbortSignalLike;
-     queueName: string;
+ }
-     startsOn?: Date;
+ 
-     version?: string;
+ // @public
- }
+ export type QueueSetMetadataResponse = WithResponse<QueueSetMetadataHeaders, QueueSetMetadataHeaders>;
- export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {
+ export interface QueueUpdateMessageOptions extends CommonOptions {
- export type QueueSendMessageResponse = WithResponse<{
+ export type QueueUpdateMessageResponse = MessageIdUpdateResponse;
-     messageId: string;
+ 
-     popReceipt: string;
+ // @public
-     insertedOn: Date;
+ export type ReceivedMessageItem = DequeuedMessageItem;
-     expiresOn: Date;
+ 
-     nextVisibleOn: Date;
+ // @public
- } & MessagesEnqueueHeaders, MessagesEnqueueHeaders, EnqueuedMessage[]>;
+ export interface ResponseLike {
- 
+     _response: HttpResponse;
- // @public
+ }
- export class QueueServiceClient extends StorageClient {
+ 
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ // @public
-     constructor(url: string, pipeline: Pipeline);
+ export interface ResponseWithBody<Headers, Body> {
-     createQueue(queueName: string, options?: QueueCreateOptions): Promise<QueueCreateResponse>;
+     _response: HttpResponse & {
-     deleteQueue(queueName: string, options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
+         parsedHeaders: Headers;
-     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): QueueServiceClient;
+         bodyAsText: string;
-     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+         parsedBody: Body;
-     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+     };
-     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
+ }
-     getQueueClient(queueName: string): QueueClient;
+ 
-     getStatistics(options?: ServiceGetStatisticsOptions): Promise<ServiceGetStatisticsResponse>;
+ // @public
-     listQueues(options?: ServiceListQueuesOptions): PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse>;
+ export interface ResponseWithHeaders<Headers> {
-     setProperties(properties: QueueServiceProperties, options?: ServiceGetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
+     _response: HttpResponse & {
- }
+         parsedHeaders: Headers;
- 
+     };
- // @public
+ }
- export interface QueueServiceProperties {
+ 
-     cors?: CorsRule[];
+ export { RestError }
-     hourMetrics?: Metrics;
+ 
-     minuteMetrics?: Metrics;
+ // @public
-     queueAnalyticsLogging?: Logging;
+ export interface RetentionPolicy {
- }
+     days?: number;
- 
+     enabled: boolean;
- // @public
+ }
- export interface QueueServiceStatistics {
+ 
-     geoReplication?: GeoReplication;
+ // @public
- }
+ export interface SasIPRange {
- 
+     end?: string;
- // @public
+     start: string;
- export interface QueueSetAccessPolicyHeaders {
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface ServiceClientOptions {
-     requestId?: string;
+     httpClient?: RequestPolicy;
-     version?: string;
+     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
- export interface QueueSetAccessPolicyOptions extends CommonOptions {
+ export interface ServiceGenerateAccountSasUrlOptions {
-     abortSignal?: AbortSignalLike;
+     ipRange?: SasIPRange;
- }
+     protocol?: SASProtocol;
- 
+     startsOn?: Date;
- // @public
+     version?: string;
- export type QueueSetAccessPolicyResponse = WithResponse<QueueSetAccessPolicyHeaders, QueueSetAccessPolicyHeaders>;
+ }
- export interface QueueSetMetadataHeaders {
+ export interface ServiceGetPropertiesHeaders {
-     date?: Date;
+     errorCode?: string;
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
+ export interface ServiceGetPropertiesOptions extends CommonOptions {
- export interface QueueSetMetadataOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesHeaders & QueueServiceProperties, ServiceGetPropertiesHeaders, QueueServiceProperties>;
- export type QueueSetMetadataResponse = WithResponse<QueueSetMetadataHeaders, QueueSetMetadataHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface ServiceGetStatisticsHeaders {
- export interface QueueUpdateMessageOptions extends CommonOptions {
+     clientRequestId?: string;
-     abortSignal?: AbortSignalLike;
+     date?: Date;
- }
+     errorCode?: string;
- 
+     requestId?: string;
- // @public
+     version?: string;
- export type QueueUpdateMessageResponse = MessageIdUpdateResponse;
+ }
- export type ReceivedMessageItem = DequeuedMessageItem;
+ export interface ServiceGetStatisticsOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- export { RequestPolicy as IHttpClient }
+ }
- export { RequestPolicy }
+ 
- 
+ // @public
- export { RequestPolicyFactory }
+ export type ServiceGetStatisticsResponse = WithResponse<ServiceGetStatisticsHeaders & QueueServiceStatistics, ServiceGetStatisticsHeaders, QueueServiceStatistics>;
- export { RequestPolicyOptions }
+ // @public
- 
+ export interface ServiceListQueuesOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface ResponseLike {
+     includeMetadata?: boolean;
-     _response: HttpResponse;
+     prefix?: string;
- export interface ResponseWithBody<Headers, Body> {
+ export interface ServiceListQueuesSegmentHeaders {
-     _response: HttpResponse & {
+     clientRequestId?: string;
-         parsedHeaders: Headers;
+     date?: Date;
-         bodyAsText: string;
+     errorCode?: string;
-         parsedBody: Body;
+     requestId?: string;
-     };
+     version?: string;
- export interface ResponseWithHeaders<Headers> {
+ export type ServiceListQueuesSegmentResponse = WithResponse<ServiceListQueuesSegmentHeaders & ListQueuesSegmentResponse, ServiceListQueuesSegmentHeaders, ListQueuesSegmentResponse>;
-     _response: HttpResponse & {
+ 
-         parsedHeaders: Headers;
+ // @public
-     };
+ export interface ServiceSetPropertiesHeaders {
- }
+     clientRequestId?: string;
- 
+     errorCode?: string;
- export { RestError }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface RetentionPolicy {
+ 
-     days?: number;
+ // @public
-     enabled: boolean;
+ export interface ServiceSetPropertiesOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export interface SasIPRange {
+ // @public
-     end?: string;
+ export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
-     start: string;
+ 
- }
+ // @public
- 
+ export interface SignedIdentifier {
- // @public
+     accessPolicy: {
- export enum SASProtocol {
+         startsOn?: Date;
-     Https = "https",
+         expiresOn?: Date;
-     HttpsAndHttp = "https,http"
+         permissions?: string;
- }
+     };
- 
+     id: string;
- // @public
+ }
- export class SASQueryParameters {
+ 
-     constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string);
+ // @public
-     readonly expiresOn?: Date;
+ export interface SignedIdentifierModel {
-     readonly identifier?: string;
+     accessPolicy: AccessPolicy;
-     get ipRange(): SasIPRange | undefined;
+     id: string;
-     readonly permissions?: string;
+ }
-     readonly protocol?: SASProtocol;
+ 
-     readonly resource?: string;
+ export { StorageBrowserPolicyFactory }
-     readonly resourceTypes?: string;
+ 
-     readonly services?: string;
+ // @public
-     readonly signature: string;
+ export interface StoragePipelineOptions {
-     readonly startsOn?: Date;
+     audience?: string;
-     toString(): string;
+     httpClient?: RequestPolicy;
-     readonly version: string;
+     keepAliveOptions?: KeepAliveOptions;
- }
+     proxyOptions?: ProxySettings;
- 
+     retryOptions?: StorageRetryOptions;
- // @public
+     userAgentOptions?: UserAgentPolicyOptions;
- export interface ServiceClientOptions {
+ }
-     httpClient?: RequestPolicy;
+ 
-     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
+ export { StorageRetryPolicyFactory }
- }
+ 
- 
+ // @public
- // @public
+ export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
- export interface ServiceGenerateAccountSasUrlOptions {
+ 
-     ipRange?: SasIPRange;
+ // (No @packageDocumentation comment for this package)
-     protocol?: SASProtocol;
+ 
-     startsOn?: Date;
+ ```
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetPropertiesHeaders {
+ 
-     clientRequestId?: string;
+ 
-     errorCode?: string;
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
- export interface ServiceGetPropertiesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesHeaders & QueueServiceProperties, ServiceGetPropertiesHeaders, QueueServiceProperties>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetStatisticsHeaders {
+ 
-     clientRequestId?: string;
+ 
-     date?: Date;
+ 
-     errorCode?: string;
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
- export interface ServiceGetStatisticsOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetStatisticsResponse = WithResponse<ServiceGetStatisticsHeaders & QueueServiceStatistics, ServiceGetStatisticsHeaders, QueueServiceStatistics>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceListQueuesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     includeMetadata?: boolean;
+ 
-     prefix?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceListQueuesSegmentHeaders {
+ 
-     clientRequestId?: string;
+ 
-     date?: Date;
+ 
-     errorCode?: string;
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
- export type ServiceListQueuesSegmentResponse = WithResponse<ServiceListQueuesSegmentHeaders & ListQueuesSegmentResponse, ServiceListQueuesSegmentHeaders, ListQueuesSegmentResponse>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceSetPropertiesHeaders {
+ 
-     clientRequestId?: string;
+ 
-     errorCode?: string;
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
- export interface ServiceSetPropertiesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface SignedIdentifier {
+ 
-     accessPolicy: {
+ 
-         startsOn?: Date;
+ 
-         expiresOn?: Date;
+ 
-         permissions?: string;
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
-     accessPolicy: AccessPolicy;
+ 
-     id: string;
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
- export enum StorageQueueAudience {
+ 
-     StorageOAuthScopes = "https://storage.azure.com/.default"
+ 
- }
+ 
- 
+ 
- export { StorageRetryPolicyFactory }
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