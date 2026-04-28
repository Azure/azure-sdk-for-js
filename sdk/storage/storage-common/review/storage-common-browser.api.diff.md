# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -6,8 +6,9 @@
 
 import type { CompatResponse } from '@azure/core-http-compat';
 import type { HttpClient } from '@azure/core-rest-pipeline';
 import type { HttpPipelineLogLevel } from '@azure/core-http-compat';
+import type { NodeBuffer } from '@azure/core-rest-pipeline';
 import type { NodeReadableStream } from '@azure/core-rest-pipeline';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
 import { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RequestPolicy } from '@azure/core-http-compat';
@@ -16,9 +17,9 @@
 import type { RestError } from '@azure/core-rest-pipeline';
 import type { WebResourceLike } from '@azure/core-http-compat';
 
 // @public
-export class AnonymousCredential extends Credential {
+export class AnonymousCredential extends Credential_2 {
     create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): AnonymousCredentialPolicy;
 }
 
 // @public
@@ -37,18 +38,17 @@
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
-export abstract class Credential implements RequestPolicyFactory {
+abstract class Credential_2 implements RequestPolicyFactory {
     create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptionsLike): RequestPolicy;
 }
+export { Credential_2 as Credential }
 
 // @public
 export abstract class CredentialPolicy extends BaseRequestPolicy {
     sendRequest(request: WebResourceLike): Promise<CompatResponse>;
@@ -69,11 +69,8 @@
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
@@ -145,58 +142,40 @@
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
+    accountKey: NodeBuffer;
     accountName: string;
 }
 
 // @public
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
@@ -209,10 +188,13 @@
 
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