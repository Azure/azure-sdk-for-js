# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
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
@@ -62,11 +60,8 @@
 // @public
 export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
 
 // @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
-
-// @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
 }
@@ -129,14 +124,10 @@
     EXPONENTIAL = 0,
     FIXED = 1
 }
 
-// @public
-export class StorageSharedKeyCredential extends Credential {
-    constructor(accountName: string, accountKey: string);
-    readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageSharedKeyCredentialPolicy;
+// @public (undocumented)
+export class StorageSharedKeyCredential {
 }
 
 // @public
 export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
@@ -144,9 +135,9 @@
     protected signRequest(request: WebResourceLike): WebResourceLike;
 }
 
 // @public
-export function storageSharedKeyCredentialPolicy(options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
+export function storageSharedKeyCredentialPolicy(_options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
 
 // @public
 export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
 
@@ -157,25 +148,10 @@
     // (undocumented)
     accountName: string;
 }
 
-// @public
-export interface UserDelegationKey {
-    signedExpiresOn: Date;
-    signedObjectId: string;
-    signedService: string;
-    signedStartsOn: Date;
-    signedTenantId: string;
-    signedVersion: string;
-    value: string;
-}
-
-// @public
+// @public (undocumented)
 export class UserDelegationKeyCredential {
-    constructor(accountName: string, userDelegationKey: UserDelegationKey);
-    readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    readonly userDelegationKey: UserDelegationKey;
 }
 
 // (No @packageDocumentation comment for this package)
 

```