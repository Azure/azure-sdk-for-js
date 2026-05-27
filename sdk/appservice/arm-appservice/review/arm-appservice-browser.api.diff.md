# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2995,9 +2995,10 @@
     value?: string;
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyValuePairStringObject {
     // (undocumented)
@@ -4632,9 +4633,9 @@
 export type RedundancyMode = "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
 
 // @public
 export interface RegenerateActionParameter {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface RegionalCheckNameAvailabilityOptionalParams extends OperationOptions {

```