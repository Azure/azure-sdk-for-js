# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -640,9 +640,9 @@
 }
 
 // @public
 export interface GetCallbackUrlParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     notAfter?: Date;
 }
 
 // @public
@@ -1598,9 +1598,10 @@
     title?: string;
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultKey {
     attributes?: KeyVaultKeyAttributes;
@@ -2268,9 +2269,9 @@
 }
 
 // @public
 export interface RegenerateActionParameter {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface RepetitionIndex {

```