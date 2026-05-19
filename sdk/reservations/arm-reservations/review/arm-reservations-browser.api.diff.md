# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -732,9 +732,10 @@
     Renewed = "Renewed"
 }
 
 // @public
-export type Location = string;
+type Location_2 = string;
+export { Location_2 as Location }
 
 // @public
 export interface MergeRequest {
     sources?: string[];

```