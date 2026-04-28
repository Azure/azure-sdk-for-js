# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -6,11 +6,12 @@
 
 import type { CompatResponse } from '@azure/core-http-compat';
 import type { HttpClient } from '@azure/core-rest-pipeline';
 import type { HttpPipelineLogLevel } from '@azure/core-http-compat';
+import type { NodeBuffer } from '@azure/core-rest-pipeline';
 import type { NodeReadableStream } from '@azure/core-rest-pipeline';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
-import { RequestBodyType } from '@azure/core-rest-pipeline';
+import type { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RequestPolicy } from '@azure/core-http-compat';
 import type { RequestPolicyFactory } from '@azure/core-http-compat';
 import type { RequestPolicyOptionsLike } from '@azure/core-http-compat';
 import type { RestError } from '@azure/core-rest-pipeline';
@@ -37,12 +38,10 @@
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
@@ -69,11 +68,8 @@
     destroy(error?: Error): NodeJSReadableStream;
 };
 
 // @public
-export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
-
-// @public
 export class StorageBrowserPolicy extends BaseRequestPolicy {
     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike);
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
 }
@@ -146,57 +142,41 @@
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
+export const structuredMessageDecodingStream = 1;
 
-// @public
-export interface StructuredMessageDecodingStreamOptions {
-    highWaterMark?: number;
-}
-
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
@@ -209,10 +189,13 @@
 
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