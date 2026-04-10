# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -12,9 +12,9 @@
 
 // @public
 export function decompressResponsePolicy(): PipelinePolicy;
 
-// @public
+// @public (undocumented)
 export const decompressResponsePolicyName = "decompressResponsePolicy";
 
 // @public (undocumented)
 export const DEFAULT_RETRY_POLICY_COUNT = 3;
@@ -47,10 +47,10 @@
 
 // @public
 export const formDataPolicyName = "formDataPolicy";
 
-// @public @deprecated
-export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
+// @public (undocumented)
+export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined;
 
 // @public
 export function logPolicy(options?: LogPolicyOptions): PipelinePolicy;
 
@@ -70,13 +70,13 @@
 // @public
 export const multipartPolicyName = "multipartPolicy";
 
 // @public
-export function proxyPolicy(proxySettings?: ProxySettings, options?: {
+export function proxyPolicy(_proxySettings?: ProxySettings, _options?: {
     customNoProxyList?: string[];
 }): PipelinePolicy;
 
-// @public
+// @public (undocumented)
 export const proxyPolicyName = "proxyPolicy";
 
 // @public
 export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;

```