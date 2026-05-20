# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -176,11 +176,12 @@
     versionAtRegistration: string;
 }
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDownloadResult {
     readonly compatibleVersions?: string[];

```