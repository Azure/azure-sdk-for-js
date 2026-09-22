# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -155,9 +155,9 @@
 }
 
 // @public
 export type FormDataMap = {
-    [key: string]: FormDataValue | FormDataValue[];
+    [key: string]: FormDataValue_2 | FormDataValue_2[];
 };
 
 // @public
 export function formDataPolicy(): PipelinePolicy;
@@ -165,9 +165,10 @@
 // @public
 export const formDataPolicyName = "formDataPolicy";
 
 // @public
-export type FormDataValue = string | Blob | File;
+type FormDataValue_2 = string | Blob | File;
+export { FormDataValue_2 as FormDataValue }
 
 // @public @deprecated
 export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined;
 

```