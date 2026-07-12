# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -153,18 +153,19 @@
 export interface OptInDetails {
     // (undocumented)
     description?: string;
     // (undocumented)
-    options?: Option[];
+    options?: Option_2[];
 }
 
 // @public (undocumented)
-export interface Option {
+interface Option_2 {
     // (undocumented)
     imageUrls?: string[];
     // (undocumented)
     type: Type;
 }
+export { Option_2 as Option }
 
 export { RestError }
 
 // @public

```