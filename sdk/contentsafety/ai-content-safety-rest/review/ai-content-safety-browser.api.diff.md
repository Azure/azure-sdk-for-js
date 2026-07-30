# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -37,9 +37,9 @@
 
 // @public
 export interface AnalyzeImageOptions {
     categories?: ImageCategory[];
-    image: ImageData;
+    image: ImageData_2;
     outputType?: AnalyzeImageOutputType;
 }
 
 // @public
@@ -202,12 +202,13 @@
 // @public
 export type ImageCategory = "Hate" | "SelfHarm" | "Sexual" | "Violence";
 
 // @public
-export interface ImageData {
+interface ImageData_2 {
     blobUrl?: string;
     content?: Uint8Array;
 }
+export { ImageData_2 as ImageData }
 
 export { isRestError }
 
 // @public

```