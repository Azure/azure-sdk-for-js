# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -19,12 +19,12 @@
 
 // Warning: (ae-internal-missing-underscore) The name "allocBuffer" should be prefixed with an underscore because the declaration is marked as @internal
 //
 // @internal
-export function allocBuffer(size: number): NodeBuffer;
+export function allocBuffer(_size: number): NodeBuffer;
 
 // @public
-export class AnonymousCredential extends Credential {
+export class AnonymousCredential extends Credential_2 {
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): AnonymousCredentialPolicy;
 }
 
 // @public
@@ -46,13 +46,14 @@
 
 // Warning: (ae-internal-missing-underscore) The name "bufferFromArrayBuffer" should be prefixed with an underscore because the declaration is marked as @internal
 //
 // @internal
-export function bufferFromArrayBuffer(ab: ArrayBuffer, byteOffset?: number, length?: number): NodeBuffer;
+export function bufferFromArrayBuffer(_ab: ArrayBuffer, _byteOffset?: number, _length?: number): NodeBuffer;
 
-// @public
+// @public (undocumented)
 export class BufferScheduler {
-    constructor(readable: NodeJS.ReadableStream, bufferSize: number, maxBuffers: number, outgoingHandler: OutgoingHandler, concurrency: number, encoding?: BufferEncoding);
+    constructor(_readable: NodeReadableStream, _bufferSize: number, _maxBuffers: number, _outgoingHandler: OutgoingHandler, _concurrency: number, _encoding?: string);
+    // (undocumented)
     do(): Promise<void>;
 }
 
 // Warning: (ae-internal-missing-underscore) The name "createBlobFromData" should be prefixed with an underscore because the declaration is marked as @internal
@@ -60,11 +61,12 @@
 // @internal
 export function createBlobFromData(data: Blob | ArrayBuffer | ArrayBufferView): Blob;
 
 // @public
-export abstract class Credential implements RequestPolicyFactory {
+abstract class Credential_2 implements RequestPolicyFactory {
     create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike): RequestPolicy;
 }
+export { Credential_2 as Credential }
 
 // @public
 export abstract class CredentialPolicy extends BaseRequestPolicy {
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
@@ -76,17 +78,17 @@
 
 // Warning: (ae-internal-missing-underscore) The name "getBufferLength" should be prefixed with an underscore because the declaration is marked as @internal
 //
 // @internal
-export function getBufferLength(buffer: NodeBuffer): number;
+export function getBufferLength(_buffer: NodeBuffer): number;
 
 // @public (undocumented)
 export function getCachedDefaultHttpClient(): HttpClient;
 
 // Warning: (ae-internal-missing-underscore) The name "isBuffer" should be prefixed with an underscore because the declaration is marked as @internal
 //
 // @internal
-export function isBuffer(value: unknown): value is NodeBuffer;
+export function isBuffer(_value: unknown): _value is NodeBuffer;
 
 // @public
 export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
 
@@ -94,10 +96,10 @@
 export type NodeJSReadableStream = NodeReadableStream & {
     destroy(error?: Error): NodeJSReadableStream;
 };
 
-// @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
+// @public (undocumented)
+export type OutgoingHandler = (body: () => NodeReadableStream, length: number, offset?: number) => Promise<unknown>;
 
 // @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
@@ -171,58 +173,46 @@
     FIXED = 1
 }
 
 // @public
-export class StorageSharedKeyCredential extends Credential {
-    constructor(accountName: string, accountKey: string);
+export class StorageSharedKeyCredential extends Credential_2 {
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
-    // (undocumented)
-    accountKey: Buffer;
-    // (undocumented)
+    accountKey: unknown;
     accountName: string;
 }
 
 // @public
 export function structuredMessageDecodingBrowser(source: Blob | ReadableStream<Uint8Array>): Promise<Blob>;
 
-// @public
-export function structuredMessageDecodingStream(source: NodeJS.ReadableStream, options: StructuredMessageDecodingStreamOptions): NodeJS.ReadableStream;
+// @public (undocumented)
+export const structuredMessageDecodingStream: (_source: never, _options: StructuredMessageDecodingStreamOptions) => never;
 
-// @public
+// @public (undocumented)
 export interface StructuredMessageDecodingStreamOptions {
+    // (undocumented)
     highWaterMark?: number;
 }
 
-// @public
+// @public (undocumented)
 export function structuredMessageEncoding(source: RequestBodyType, contentLength: number): Promise<{
     body: RequestBodyType;
     encodedContentLength: number;
 }>;
 
 // @public
-export interface StructuredMessageEncodingStreamOptions {
-    highWaterMark?: number;
-}
-
-// @public
 export interface UserDelegationKey {
     signedDelegatedUserTenantId: string | undefined;
     signedExpiresOn: Date;
     signedObjectId: string;
@@ -235,10 +225,13 @@
 
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