# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -17,9 +17,9 @@
 }
 
 // @public
 export interface APIKeys {
-    keys?: KeyType[];
+    keys?: KeyType_2[];
 }
 
 // @public (undocumented)
 export class AzureQuantumManagementClient extends coreClient.ServiceClient {
@@ -86,9 +86,10 @@
 // @public
 export function getContinuationToken(page: unknown): string | undefined;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownCreatedByType {
     Application = "Application",

```