# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -7,9 +7,8 @@
 import type { CompatResponse } from '@azure/core-http-compat';
 import type { HttpClient } from '@azure/core-rest-pipeline';
 import type { HttpPipelineLogLevel } from '@azure/core-http-compat';
 import type { PipelinePolicy } from '@azure/core-rest-pipeline';
-import { RequestBodyType } from '@azure/core-rest-pipeline';
 import type { RequestPolicy } from '@azure/core-http-compat';
 import type { RequestPolicyFactory } from '@azure/core-http-compat';
 import type { RequestPolicyOptionsLike } from '@azure/core-http-compat';
 import type { RestError } from '@azure/core-rest-pipeline';
@@ -36,12 +35,10 @@
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
@@ -60,18 +57,12 @@
 
 // @public (undocumented)
 export function getCachedDefaultHttpClient(): HttpClient;
 
-// @public (undocumented)
-export function isNodeReadableStream(source: any): boolean;
-
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
     EXPONENTIAL = 0,
     FIXED = 1
 }
 
-// @public
-export class StorageSharedKeyCredential extends Credential_2 {
-    constructor(accountName: string, accountKey: string);
-    readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): StorageSharedKeyCredentialPolicy;
+// @public (undocumented)
+export class StorageSharedKeyCredential {
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
@@ -178,48 +144,9 @@
     accountName: string;
 }
 
 // @public (undocumented)
-export function structuredMessageDecodingBrowser(source: Blob | ReadableStream<Uint8Array>): Promise<Blob>;
-
-// @public (undocumented)
-export function structuredMessageDecodingStream(source: NodeJS.ReadableStream, options: StructuredMessageDecodingStreamOptions): NodeJS.ReadableStream;
-
-// @public (undocumented)
-export interface StructuredMessageDecodingStreamOptions {
-    highWaterMark?: number;
-}
-
-// @public (undocumented)
-export function structuredMessageEncoding(source: RequestBodyType, content_length: number): Promise<{
-    body: RequestBodyType;
-    encoded_content_length: number;
-}>;
-
-// @public (undocumented)
-export interface StructuredMessageEncodingStreamOptions {
-    doInjectErrorOnce?: boolean;
-    highWaterMark?: number;
-}
-
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
 export class UserDelegationKeyCredential {
-    constructor(accountName: string, userDelegationKey: UserDelegationKey);
-    readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    readonly userDelegationKey: UserDelegationKey;
 }
 
 // (No @packageDocumentation comment for this package)
 

```