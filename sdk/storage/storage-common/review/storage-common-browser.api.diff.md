# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
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
@@ -64,16 +62,8 @@
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -136,24 +126,18 @@
 }
 
 // @public
 export class StorageSharedKeyCredential extends Credential {
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -134,26 +124,16 @@
=======
@@ -92,23 +83,8 @@
 
 // @public
 export const storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";
 
-// @public (undocumented)
-export class StorageCRC64Calculator {
-    constructor();
-    // (undocumented)
-    Append(body: Uint8Array, length: number): void;
-    // (undocumented)
-    Final(body: Uint8Array, length: number): Uint8Array;
-    // (undocumented)
-    static init(): Promise<void>;
-    // (undocumented)
-    static isInitializing: boolean;
-    // (undocumented)
-    static nativeInstance: any;
-}
-
 // @public
 export function storageRequestFailureDetailsParserPolicy(): PipelinePolicy;
 
 // @public
@@ -149,26 +125,16 @@
>>>>>>> 6d421431c9 (STG101)
=======
@@ -149,26 +141,16 @@
>>>>>>> fc0eb7e65c (STG101)
=======
@@ -154,26 +141,16 @@
>>>>>>> 01a4ce5b39 (Merge main)
=======
@@ -147,76 +134,38 @@
>>>>>>> 12d813b2b6 (Format)
=======
@@ -144,76 +134,38 @@
>>>>>>> 37c2e243ec (Format)
     EXPONENTIAL = 0,
     FIXED = 1
 }
 
-// @public
-export class StorageSharedKeyCredential extends Credential_2 {
>>>>>>> e7d1e40d9a (STG101)
-    constructor(accountName: string, accountKey: string);
+    constructor(_accountName: string, _accountKey: string);
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -162,25 +142,10 @@
     // (undocumented)
=======
@@ -178,48 +144,9 @@
>>>>>>> 6d421431c9 (STG101)
     accountName: string;
 }
=======
@@ -181,45 +163,18 @@
=======
@@ -186,45 +163,18 @@
>>>>>>> 01a4ce5b39 (Merge main)
 // @public (undocumented)
=======
-    // (undocumented)
     accountKey: Buffer;
-    // (undocumented)
     accountName: string;
 }
 
<<<<<<< HEAD
-// @public (undocumented)
+// @public
>>>>>>> 12d813b2b6 (Format)
=======
 // @public
>>>>>>> 37c2e243ec (Format)
 export function structuredMessageDecodingBrowser(source: Blob | ReadableStream<Uint8Array>): Promise<Blob>;
 
-// @public
-export function structuredMessageDecodingStream(source: NodeJS.ReadableStream, options: StructuredMessageDecodingStreamOptions): NodeJS.ReadableStream;
+// @public (undocumented)
+export const structuredMessageDecodingStream = 1;
 
-// @public
-export interface StructuredMessageDecodingStreamOptions {
-    highWaterMark?: number;
-}
-
-// @public
+// @public (undocumented)
 export function structuredMessageEncoding(source: RequestBodyType, content_length: number): Promise<{
     body: RequestBodyType;
     encoded_content_length: number;
 }>;
 
-// @public
-export interface StructuredMessageEncodingStreamOptions {
-    highWaterMark?: number;
-}
-
-// @public
-export interface UserDelegationKey {
-    signedDelegatedUserTenantId: string | undefined;
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
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
+// @public (undocumented)
>>>>>>> 12d813b2b6 (Format)
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