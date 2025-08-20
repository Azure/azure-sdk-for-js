# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -12,83 +12,31 @@
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
-import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
-import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
+import type { HttpHeadersLike } from '@azure/core-http-compat';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
 import { RequestPolicy } from '@azure/core-http-compat';
 import { RequestPolicyFactory } from '@azure/core-http-compat';
-import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
 import { RestError } from '@azure/core-rest-pipeline';
 import { StorageBrowserPolicyFactory } from '@azure/storage-common';
-import { StorageRetryOptions } from '@azure/storage-common';
-import { StorageRetryPolicy } from '@azure/storage-common';
+import type { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
-import { StorageRetryPolicyType } from '@azure/storage-common';
 import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
 import type { TokenCredential } from '@azure/core-auth';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
-import { UserDelegationKey as UserDelegationKey_2 } from '@azure/storage-common';
-import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+import type { WebResourceLike } from '@azure/core-http-compat';
 
 // @public
 export interface AccessPolicy {
     expiresOn?: string;
     permissions?: string;
     startsOn?: string;
 }
 
-// @public
-export class AccountSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    list: boolean;
-    static parse(permissions: string): AccountSASPermissions;
-    process: boolean;
-    read: boolean;
-    toString(): string;
-    update: boolean;
-    write: boolean;
-}
-
-// @public
-export class AccountSASResourceTypes {
-    container: boolean;
-    object: boolean;
-    static parse(resourceTypes: string): AccountSASResourceTypes;
-    service: boolean;
-    toString(): string;
-}
-
-// @public
-export class AccountSASServices {
-    blob: boolean;
-    file: boolean;
-    static parse(services: string): AccountSASServices;
-    queue: boolean;
-    table: boolean;
-    toString(): string;
-}
-
-// @public
-export interface AccountSASSignatureValues {
-    expiresOn: Date;
-    ipRange?: SasIPRange;
-    permissions: AccountSASPermissions;
-    protocol?: SASProtocol;
-    resourceTypes: string;
-    services: string;
-    startsOn?: Date;
-    version?: string;
-}
-
 export { AnonymousCredential }
 
 export { AnonymousCredentialPolicy }
 
@@ -132,17 +80,8 @@
     popReceipt: string;
 }
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateQueueSASQueryParameters(queueSASSignatureValues: QueueSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
-
-// @public (undocumented)
-export function generateQueueSASQueryParameters(queueSASSignatureValues: QueueSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
 export interface GeoReplication {
     lastSyncOn: Date;
     status: GeoReplicationStatusType;
 }
@@ -150,30 +89,18 @@
 // @public
 export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
 
 // @public
-export function getQueueServiceAccountAudience(storageAccountName: string): string;
-
-export { HttpHeaders }
-
-export { HttpOperationResponse }
-
-export { HttpRequestBody }
-
-// @public
 export interface HttpResponse {
-    headers: HttpHeaders;
-    request: WebResource;
+    headers: HttpHeadersLike;
+    request: WebResourceLike;
     status: number;
 }
 
 // @public
 export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
 
 // @public
-export type ListQueuesIncludeType = "metadata";
-
-// @public
 export interface ListQueuesSegmentResponse {
     // (undocumented)
     continuationToken: string;
     // (undocumented)
@@ -433,8 +360,9 @@
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
     permissions?: QueueSASPermissions;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -518,21 +446,8 @@
     update: boolean;
 }
 
 // @public
-export interface QueueSASSignatureValues {
-    delegatedUserObjectId?: string;
-    expiresOn?: Date;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    permissions?: QueueSASPermissions;
-    protocol?: SASProtocol;
-    queueName: string;
-    startsOn?: Date;
-    version?: string;
-}
-
-// @public
 export interface QueueSendMessageOptions extends MessagesEnqueueOptionalParams, CommonOptions {
     abortSignal?: AbortSignalLike;
 }
 
@@ -551,8 +466,9 @@
     constructor(url: string, pipeline: Pipeline);
     createQueue(queueName: string, options?: QueueCreateOptions): Promise<QueueCreateResponse>;
     deleteQueue(queueName: string, options?: QueueDeleteOptions): Promise<QueueDeleteResponse>;
     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): QueueServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
     getQueueClient(queueName: string): QueueClient;
@@ -619,15 +535,8 @@
 
 // @public
 export type ReceivedMessageItem = DequeuedMessageItem;
 
-export { RequestPolicy as IHttpClient }
-export { RequestPolicy }
-
-export { RequestPolicyFactory }
-
-export { RequestPolicyOptions }
-
 // @public
 export interface ResponseLike {
     _response: HttpResponse;
 }
@@ -662,32 +571,8 @@
     start: string;
 }
 
 // @public
-export enum SASProtocol {
-    Https = "https",
-    HttpsAndHttp = "https,http"
-}
-
-// @public
-export class SASQueryParameters {
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, userDelegationKey?: UserDelegationKey_2, delegatedUserObjectId?: string);
-    readonly delegatedUserObjectId?: string;
-    readonly expiresOn?: Date;
-    readonly identifier?: string;
-    get ipRange(): SasIPRange | undefined;
-    readonly permissions?: string;
-    readonly protocol?: SASProtocol;
-    readonly resource?: string;
-    readonly resourceTypes?: string;
-    readonly services?: string;
-    readonly signature: string;
-    readonly startsOn?: Date;
-    toString(): string;
-    readonly version: string;
-}
-
-// @public
 export interface ServiceClientOptions {
     httpClient?: RequestPolicy;
     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
 }
@@ -805,11 +690,8 @@
 
 export { StorageBrowserPolicyFactory }
 
 // @public
-export const StorageOAuthScopes: string | string[];
-
-// @public
 export interface StoragePipelineOptions {
     audience?: string;
     httpClient?: RequestPolicy;
     keepAliveOptions?: KeepAliveOptions;
@@ -817,25 +699,10 @@
     retryOptions?: StorageRetryOptions;
     userAgentOptions?: UserAgentPolicyOptions;
 }
 
-// @public
-export enum StorageQueueAudience {
-    StorageOAuthScopes = "https://storage.azure.com/.default"
-}
-
-export { StorageRetryOptions }
-
-export { StorageRetryPolicy }
-
 export { StorageRetryPolicyFactory }
 
-export { StorageRetryPolicyType }
-
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export interface UserDelegationKey {
     signedExpiresOn: Date;
     signedObjectId: string;
@@ -856,10 +723,8 @@
     signedVersion: string;
     value: string;
 }
 
-export { WebResource }
-
 // @public
 export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
 
 // (No @packageDocumentation comment for this package)

```