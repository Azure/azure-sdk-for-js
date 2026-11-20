# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -8,12 +8,11 @@
 import type { FullOperationResponse } from '@azure/core-client';
 import type { HttpClient } from '@azure/core-rest-pipeline';
 import type { HttpMethods } from '@azure/core-rest-pipeline';
 import type { NodeBuffer } from '@azure/core-rest-pipeline';
+import type { NodeReadableStream } from '@azure/core-rest-pipeline';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
-import type { PipelineRequest } from '@azure/core-rest-pipeline';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
-import { Readable } from 'node:stream';
 import type { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RestError } from '@azure/core-rest-pipeline';
 
 // @public
@@ -25,9 +24,9 @@
     sockets: unknown;
 }
 
 // @public
-export function allocBuffer(size: number): NodeBuffer;
+export function allocBuffer(_size: number): NodeBuffer;
 
 // @public
 export class AnonymousCredential extends Credential {
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): AnonymousCredentialPolicy;
@@ -50,20 +49,18 @@
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
-export function buildStorageSharedKeyStringToSign(request: PipelineRequest, accountName: string): string;
-
-// @public
 export interface CompatResponse extends Omit<FullOperationResponse, "request" | "headers"> {
     headers: HttpHeadersLike;
     request: WebResourceLike;
 }
@@ -85,9 +82,9 @@
 // @public
 export type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => CredentialPolicy;
 
 // @public
-export function getBufferLength(buffer: NodeBuffer): number;
+export function getBufferLength(_buffer: NodeBuffer): number;
 
 // @public (undocumented)
 export function getCachedDefaultHttpClient(): HttpClient;
 
@@ -125,27 +122,28 @@
     WARNING = 2
 }
 
 // @public
-export function isBuffer(value: unknown): value is NodeBuffer;
+export function isBuffer(_value: unknown): _value is NodeBuffer;
 
 // @public
 export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): this;
-}
+export type NodeJSReadableStream = NodeReadableStream extends never ? never : NodeReadableStream & {
+    destroy(error?: Error): NodeJSReadableStream;
+};
 
-// @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
+// @public (undocumented)
+export type OutgoingHandler = (body: () => NodeReadableStream, length: number, offset?: number) => Promise<unknown>;
 
 // @public
 export type RawHttpHeaders = {
     [headerName: string]: string;
 };
 
-export { Readable }
+// @public (undocumented)
+export type Readable = never;
 
 // @public
 export interface RequestPolicy {
     // (undocumented)
@@ -256,42 +254,35 @@
 }
 
 // @public
 export class StorageSharedKeyCredential extends Credential {
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
-    // (undocumented)
-    accountKey: Buffer;
-    // (undocumented)
+    accountKey: unknown;
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
 
 // @public
@@ -300,13 +291,8 @@
     encodedContentLength: number;
 }>;
 
 // @public
-export interface StructuredMessageEncodingStreamOptions {
-    highWaterMark?: number;
-}
-
-// @public
 export type TransferProgressEvent = {
     loadedBytes: number;
 };
 
@@ -324,10 +310,13 @@
 
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
 
 // @public

```