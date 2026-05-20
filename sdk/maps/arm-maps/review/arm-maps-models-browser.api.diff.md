# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -98,9 +98,10 @@
 // @public
 export type InfrastructureEncryption = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export type Kind = string;
 
@@ -268,9 +269,9 @@
 }
 
 // @public
 export interface MapsKeySpecification {
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export type Name = string;

```