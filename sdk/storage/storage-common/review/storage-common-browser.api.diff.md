# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -7,22 +7,22 @@
 import type { CompatResponse } from '@azure/core-http-compat';
 import type { HttpClient } from '@azure/core-rest-pipeline';
 import type { HttpPipelineLogLevel } from '@azure/core-http-compat';
 import type { NodeBuffer } from '@azure/core-rest-pipeline';
+import type { NodeReadableStream } from '@azure/core-rest-pipeline';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
-import { Readable } from 'node:stream';
 import type { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RequestPolicy } from '@azure/core-http-compat';
 import type { RequestPolicyFactory } from '@azure/core-http-compat';
 import type { RequestPolicyOptionsLike } from '@azure/core-http-compat';
 import type { RestError } from '@azure/core-rest-pipeline';
 import type { WebResourceLike } from '@azure/core-http-compat';
 
 // @public
-export function allocBuffer(size: number): NodeBuffer;
+export function allocBuffer(_size: number): NodeBuffer;
 
 // @public
-export class AnonymousCredential extends Credential {
+export class AnonymousCredential extends Credential_2 {
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): AnonymousCredentialPolicy;
 }
 
 // @public
@@ -42,23 +42,25 @@
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
@@ -68,28 +70,29 @@
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
 
-export { Readable }
+// @public (undocumented)
+export type Readable = never;
 
 // @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
@@ -163,58 +166,46 @@
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
@@ -227,10 +218,13 @@
 
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