# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -220,9 +220,10 @@
 // @public
 export type InfrastructureEncryption = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export type Kind = string;
 
@@ -390,9 +391,9 @@
 }
 
 // @public
 export interface MapsKeySpecification {
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface MapsListOperationsOptionalParams extends OperationOptions {

```