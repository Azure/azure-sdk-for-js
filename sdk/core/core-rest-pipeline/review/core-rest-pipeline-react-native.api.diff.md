# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -5,13 +5,17 @@
 ```ts
 
 import type { AbortSignalLike } from '@azure/abort-controller';
 import type { AccessToken } from '@azure/core-auth';
+import type { Agent as Agent_2 } from '@typespec/ts-http-runtime';
 import { AzureLogger } from '@azure/logger';
 import type { Debugger } from '@azure/logger';
 import type { GetTokenOptions } from '@azure/core-auth';
 import { HttpMethods } from '@azure/core-util';
 import type { OperationTracingOptions } from '@azure/core-tracing';
+import type { PipelinePolicy as PipelinePolicy_2 } from '@typespec/ts-http-runtime';
+import type { ProxySettings as ProxySettings_2 } from '@typespec/ts-http-runtime';
+import type { TlsSettings as TlsSettings_2 } from '@typespec/ts-http-runtime';
 import type { TokenCredential } from '@azure/core-auth';
 
 // @public
 export interface AddPipelineOptions {
@@ -29,12 +33,12 @@
     requests: unknown;
     sockets: unknown;
 }
 
-// @public
-export function agentPolicy(agent?: Agent): PipelinePolicy;
+// @public (undocumented)
+export function agentPolicy(_agent?: Agent_2): PipelinePolicy_2;
 
-// @public
+// @public (undocumented)
 export const agentPolicyName = "agentPolicy";
 
 // @public
 export interface AuthorizeRequestOnChallengeOptions {
@@ -124,12 +128,12 @@
 
 // @public
 export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest;
 
-// @public
-export function decompressResponsePolicy(): PipelinePolicy;
+// @public (undocumented)
+export function decompressResponsePolicy(): PipelinePolicy_2;
 
-// @public
+// @public (undocumented)
 export const decompressResponsePolicyName = "decompressResponsePolicy";
 
 // @public
 export function defaultRetryPolicy(options?: DefaultRetryPolicyOptions): PipelinePolicy;
@@ -164,10 +168,10 @@
 
 // @public
 export type FormDataValue = string | Blob | File;
 
-// @public @deprecated
-export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
+// @public (undocumented)
+export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings_2 | undefined;
 
 // @public
 export interface HttpClient {
     sendRequest: SendRequest;
@@ -330,14 +334,14 @@
     maxRetryDelayInMs?: number;
     retryDelayInMs?: number;
 }
 
-// @public
-export function proxyPolicy(proxySettings?: ProxySettings, options?: {
+// @public (undocumented)
+export function proxyPolicy(_proxySettings?: ProxySettings_2, _options?: {
     customNoProxyList?: string[];
-}): PipelinePolicy;
+}): PipelinePolicy_2;
 
-// @public
+// @public (undocumented)
 export const proxyPolicyName = "proxyPolicy";
 
 // @public
 export interface ProxySettings {
@@ -472,12 +476,12 @@
 export interface ThrottlingRetryPolicyOptions {
     maxRetries?: number;
 }
 
-// @public
-export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy;
+// @public (undocumented)
+export function tlsPolicy(_tlsSettings?: TlsSettings_2): PipelinePolicy_2;
 
-// @public
+// @public (undocumented)
 export const tlsPolicyName = "tlsPolicy";
 
 // @public
 export interface TlsSettings {

```