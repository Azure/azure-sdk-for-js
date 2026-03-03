# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -35,12 +35,10 @@
     abstract sendRequest(webResource: WebResourceLike): Promise<CompatResponse>;
     shouldLog(logLevel: HttpPipelineLogLevel): boolean;
 }
 
-// @public
+// @public (undocumented)
 export class BufferScheduler {
-    constructor(readable: NodeJS.ReadableStream, bufferSize: number, maxBuffers: number, outgoingHandler: OutgoingHandler, concurrency: number, encoding?: BufferEncoding);
-    do(): Promise<void>;
 }
 
 // @public
 export abstract class Credential implements RequestPolicyFactory {
@@ -62,16 +60,8 @@
 // @public
 export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): this;
-}
-
-// @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
-
-// @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
 }
@@ -136,24 +126,18 @@
 }
 
 // @public
 export class StorageSharedKeyCredential extends Credential {
-    constructor(accountName: string, accountKey: string);
+    constructor(accountName: string, _accountKey: string);
     readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageSharedKeyCredentialPolicy;
+    computeHMACSHA256(_stringToSign: string): string;
+    create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike): RequestPolicy;
 }
 
 // @public
-export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
-    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, factory: StorageSharedKeyCredential);
-    protected signRequest(request: WebResourceLike): WebResourceLike;
-}
+export function storageSharedKeyCredentialPolicy(_options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
 
 // @public
-export function storageSharedKeyCredentialPolicy(options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
-
-// @public
 export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
 
 // @public
 export interface StorageSharedKeyCredentialPolicyOptions {
@@ -164,22 +148,32 @@
 }
 
 // @public
 export interface UserDelegationKey {
+    // (undocumented)
     signedExpiresOn: Date;
+    // (undocumented)
     signedObjectId: string;
+    // (undocumented)
     signedService: string;
+    // (undocumented)
     signedStartsOn: Date;
+    // (undocumented)
     signedTenantId: string;
+    // (undocumented)
     signedVersion: string;
+    // (undocumented)
     value: string;
 }
 
 // @public
 export class UserDelegationKeyCredential {
     constructor(accountName: string, userDelegationKey: UserDelegationKey);
+    // (undocumented)
     readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
+    // (undocumented)
+    computeHMACSHA256(_stringToSign: string): string;
+    // (undocumented)
     readonly userDelegationKey: UserDelegationKey;
 }
 
 // (No @packageDocumentation comment for this package)

```