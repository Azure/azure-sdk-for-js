# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -20,24 +20,25 @@
 import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
-import { PollerLike } from '@azure/core-lro';
-import { PollOperationState } from '@azure/core-lro';
+import type { PollOperationState } from '@azure/core-lro';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
 import type { Readable } from 'node:stream';
 import { RequestPolicy } from '@azure/core-http-compat';
 import { RequestPolicyFactory } from '@azure/core-http-compat';
 import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
 import { RestError } from '@azure/core-rest-pipeline';
 import { StorageBrowserPolicy } from '@azure/storage-common';
+import { storageBrowserPolicy } from '@azure/storage-common';
 import { StorageBrowserPolicyFactory } from '@azure/storage-common';
+import { storageCorrectContentLengthPolicy } from '@azure/storage-common';
 import { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicy } from '@azure/storage-common';
+import { storageRetryPolicy } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
 import { StorageRetryPolicyType } from '@azure/storage-common';
 import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
@@ -92,40 +93,8 @@
     update?: boolean;
     write?: boolean;
 }
 
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
-    encryptionScope?: string;
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
 
@@ -384,10 +353,8 @@
     abortSignal?: AbortSignalLike;
     conditions?: ModifiedAccessConditions;
 }
 
-// Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
-//
 // @public
 export class BlobClient extends StorageClient {
     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
@@ -1095,32 +1062,8 @@
     write?: boolean;
 }
 
 // @public
-export interface BlobSASSignatureValues {
-    blobName?: string;
-    cacheControl?: string;
-    containerName: string;
-    contentDisposition?: string;
-    contentEncoding?: string;
-    contentLanguage?: string;
-    contentType?: string;
-    correlationId?: string;
-    delegatedUserObjectId?: string;
-    encryptionScope?: string;
-    expiresOn?: Date;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    permissions?: BlobSASPermissions | ContainerSASPermissions;
-    preauthorizedAgentObjectId?: string;
-    protocol?: SASProtocol;
-    snapshotTime?: string;
-    startsOn?: Date;
-    version?: string;
-    versionId?: string;
-}
-
-// @public
 export class BlobServiceClient extends StorageClient {
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: PipelineLike);
     createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
@@ -2192,17 +2135,8 @@
     where: string;
 }
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
-
-// @public
 export interface GeoReplication {
     lastSyncOn: Date;
     status: GeoReplicationStatusType;
 }
@@ -2795,10 +2729,8 @@
 export interface PipelineOptions {
     httpClient?: RequestPolicy;
 }
 
-export { PollerLike }
-
 // @public
 export interface PollerLikeWithCancellation<TState extends PollOperationState<TResult>, TResult> {
     cancelOperation(options?: {
         abortSignal?: AbortSignalLike;
@@ -2815,10 +2747,8 @@
     stopPolling(): void;
     toString(): string;
 }
 
-export { PollOperationState }
-
 // @public
 export enum PremiumPageBlobTier {
     P10 = "P10",
     P15 = "P15",
@@ -3164,19 +3094,32 @@
     errorDocument404Path?: string;
     indexDocument?: string;
 }
 
-// @public
-export enum StorageBlobAudience {
-    DiskComputeOAuthScopes = "https://disk.compute.azure.com/.default",
-    StorageOAuthScopes = "https://storage.azure.com/.default"
-}
-
 export { StorageBrowserPolicy }
 
+export { storageBrowserPolicy }
+
 export { StorageBrowserPolicyFactory }
 
 // @public
+export abstract class StorageClient {
+    protected constructor(url: string, pipeline: PipelineLike);
+    // (undocumented)
+    readonly accountName: string;
+    readonly credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
+    // (undocumented)
+    protected readonly isHttps: boolean;
+    // @internal
+    protected readonly pipeline: PipelineLike;
+    // Warning: (ae-forgotten-export) The symbol "StorageClient_2" needs to be exported by the entry point index.d.ts
+    protected readonly storageClientContext: StorageClient_2;
+    readonly url: string;
+}
+
+export { storageCorrectContentLengthPolicy }
+
+// @public
 export const StorageOAuthScopes: string | string[];
 
 // @public
 export interface StoragePipelineOptions {
@@ -3191,16 +3134,14 @@
 export { StorageRetryOptions }
 
 export { StorageRetryPolicy }
 
+export { storageRetryPolicy }
+
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export type SyncCopyStatusType = "success";
 
 // @public

```