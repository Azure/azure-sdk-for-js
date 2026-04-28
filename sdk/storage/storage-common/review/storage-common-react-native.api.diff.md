# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -9,17 +9,17 @@
 import type { HttpPipelineLogLevel } from '@azure/core-http-compat';
 import type { NodeBuffer } from '@azure/core-rest-pipeline';
 import type { NodeReadableStream } from '@azure/core-rest-pipeline';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
-import { RequestBodyType } from '@azure/core-rest-pipeline';
+import type { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RequestPolicy } from '@azure/core-http-compat';
 import type { RequestPolicyFactory } from '@azure/core-http-compat';
 import type { RequestPolicyOptionsLike } from '@azure/core-http-compat';
 import type { RestError } from '@azure/core-rest-pipeline';
 import type { WebResourceLike } from '@azure/core-http-compat';
 
 // @public
-export function allocBuffer(size: number): NodeBuffer;
+export function allocBuffer(_size: number): NodeBuffer;
 
 // @public
 export class AnonymousCredential extends Credential {
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): AnonymousCredentialPolicy;
@@ -42,13 +42,14 @@
     shouldLog(logLevel: HttpPipelineLogLevel): boolean;
 }
 
 // @public
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
 
 // @public
@@ -68,15 +69,15 @@
 // @public
 export type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => CredentialPolicy;
 
 // @public
-export function getBufferLength(buffer: NodeBuffer): number;
+export function getBufferLength(_buffer: NodeBuffer): number;
 
 // @public (undocumented)
 export function getCachedDefaultHttpClient(): HttpClient;
 
 // @public
-export function isBuffer(value: unknown): value is NodeBuffer;
+export function isBuffer(_value: unknown): _value is NodeBuffer;
 
 // @public
 export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
 
@@ -84,10 +85,10 @@
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
@@ -162,58 +163,48 @@
 }
 
 // @public
 export class StorageSharedKeyCredential extends Credential {
-    constructor(accountName: string, accountKey: string);
+    constructor(_accountName: string, _accountKey: string);
     readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageSharedKeyCredentialPolicy;
-    createPipelinePolicy(): PipelinePolicy;
+    computeHMACSHA256(_stringToSign: string): string;
+    create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike): RequestPolicy;
+    createPipelinePolicy(): never;
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
     // (undocumented)
-    accountKey: Buffer;
+    accountKey: NodeBuffer;
     // (undocumented)
     accountName: string;
 }
 
-// @public
-export function structuredMessageDecodingBrowser(source: Blob | ReadableStream<Uint8Array>): Promise<Blob>;
+// @public (undocumented)
+export function structuredMessageDecodingBrowser(_source: unknown): Promise<never>;
 
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
-export function structuredMessageEncoding(source: RequestBodyType, contentLength: number): Promise<{
+// @public (undocumented)
+export function structuredMessageEncoding(_source: RequestBodyType, _contentLength: number): Promise<{
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
@@ -226,10 +217,13 @@
 
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