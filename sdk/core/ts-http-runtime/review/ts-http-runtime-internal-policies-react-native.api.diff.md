# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -44,10 +44,10 @@
 
 // @public
 export const formDataPolicyName = "formDataPolicy";
 
-// @public @deprecated
-export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
+// @public (undocumented)
+export function getDefaultProxySettings(): never;
 
 // @public
 export function logPolicy(options?: LogPolicyOptions): PipelinePolicy;
 
@@ -67,13 +67,11 @@
 // @public
 export const multipartPolicyName = "multipartPolicy";
 
 // @public
-export function proxyPolicy(proxySettings?: ProxySettings, options?: {
-    customNoProxyList?: string[];
-}): PipelinePolicy;
+export function proxyPolicy(): never;
 
-// @public
+// @public (undocumented)
 export const proxyPolicyName = "proxyPolicy";
 
 // @public
 export function redirectPolicy(options?: RedirectPolicyOptions): PipelinePolicy;

```