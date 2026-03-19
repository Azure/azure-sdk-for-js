# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -4,20 +4,8 @@
 
 ```ts
 
 // @public
-export function agentPolicy(agent?: Agent): PipelinePolicy;
-
-// @public
-export const agentPolicyName = "agentPolicy";
-
-// @public
-export function decompressResponsePolicy(): PipelinePolicy;
-
-// @public
-export const decompressResponsePolicyName = "decompressResponsePolicy";
-
-// @public
 export function defaultRetryPolicy(options?: DefaultRetryPolicyOptions): PipelinePolicy;
 
 // @public
 export const defaultRetryPolicyName = "defaultRetryPolicy";
@@ -44,11 +32,8 @@
 
 // @public
 export const formDataPolicyName = "formDataPolicy";
 
-// @public @deprecated
-export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
-
 // @public
 export function logPolicy(options?: LogPolicyOptions): PipelinePolicy;
 
 // @public
@@ -67,16 +52,8 @@
 // @public
 export const multipartPolicyName = "multipartPolicy";
 
 // @public
-export function proxyPolicy(proxySettings?: ProxySettings, options?: {
-    customNoProxyList?: string[];
-}): PipelinePolicy;
-
-// @public
-export const proxyPolicyName = "proxyPolicy";
-
-// @public
 export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;
 
 // @public
 export const redirectPolicyName = "redirectPolicy";
@@ -130,14 +107,8 @@
 // @public
 export const throttlingRetryPolicyName = "throttlingRetryPolicy";
 
 // @public
-export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy;
-
-// @public
-export const tlsPolicyName = "tlsPolicy";
-
-// @public
 export function userAgentPolicy(options?: UserAgentPolicyOptions): PipelinePolicy;
 
 // @public
 export const userAgentPolicyName = "userAgentPolicy";

```