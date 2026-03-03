# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -36,12 +36,10 @@
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
 abstract class Credential_2 implements RequestPolicyFactory {
@@ -72,11 +70,8 @@
     destroy(error?: Error): this;
 }
 
 // @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
-
-// @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
 }
<<<<<<< HEAD
<<<<<<< HEAD
@@ -136,12 +131,12 @@
 }
 
 // @public
 export class StorageSharedKeyCredential extends Credential {
=======
<<<<<<< HEAD
@@ -134,14 +129,10 @@
=======
@@ -149,14 +144,10 @@
>>>>>>> fc0eb7e65c (STG101)
=======
@@ -154,14 +149,10 @@
>>>>>>> 01a4ce5b39 (Merge main)
     EXPONENTIAL = 0,
     FIXED = 1
 }
 
-// @public
-export class StorageSharedKeyCredential extends Credential_2 {
>>>>>>> fa7aedf037 (STG101)
-    constructor(accountName: string, accountKey: string);
+    constructor(_accountName: string, _accountKey: string);
     readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageSharedKeyCredentialPolicy;
+    computeHMACSHA256(_stringToSign: string): string;
+    create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike): RequestPolicy;
 }
 
 // @public
 export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
<<<<<<< HEAD
<<<<<<< HEAD
@@ -149,9 +144,9 @@
=======
<<<<<<< HEAD
@@ -149,9 +140,9 @@
=======
@@ -164,9 +155,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -169,9 +160,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
     protected signRequest(request: WebResourceLike): WebResourceLike;
 }
 
 // @public
-export function storageSharedKeyCredentialPolicy(options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
+export function storageSharedKeyCredentialPolicy(_options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
 
 // @public
 export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
 
<<<<<<< HEAD
<<<<<<< HEAD
@@ -164,22 +159,32 @@
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
=======
<<<<<<< HEAD
@@ -162,25 +153,10 @@
     // (undocumented)
     accountName: string;
=======
@@ -200,26 +191,10 @@
=======
@@ -205,26 +196,10 @@
>>>>>>> 01a4ce5b39 (Merge main)
     doInjectErrorOnce?: boolean;
     highWaterMark?: number;
 }
 
-// @public
-export interface UserDelegationKey {
-    signedDelegatedUserTid: string | undefined;
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
>>>>>>> fa7aedf037 (STG101)
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