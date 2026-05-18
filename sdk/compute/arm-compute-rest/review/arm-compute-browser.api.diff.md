# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -6587,12 +6587,13 @@
     vmSizeProperties?: VMSizePropertiesOutput;
 }
 
 // @public
-export interface Image extends Resource {
+interface Image_2 extends Resource {
     extendedLocation?: ExtendedLocation;
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDataDisk extends ImageDisk {
     lun: number;
@@ -6740,9 +6741,9 @@
 }
 
 // @public (undocumented)
 export interface ImagesCreateOrUpdateBodyParam {
-    body: Image;
+    body: Image_2;
 }
 
 // @public
 export interface ImagesCreateOrUpdateDefaultResponse extends HttpResponse {

```