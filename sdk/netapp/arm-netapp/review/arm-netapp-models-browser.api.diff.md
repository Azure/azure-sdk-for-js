# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -254,13 +254,14 @@
     onCertificateConflictAction?: OnCertificateConflictAction;
 }
 
 // @public
-export interface Cache extends TrackedResource {
+interface Cache_2 extends TrackedResource {
     readonly etag?: string;
     properties: CacheProperties;
     zones?: string[];
 }
+export { Cache_2 as Cache }
 
 // @public
 export type CacheLifeCycleState = string;
 

```