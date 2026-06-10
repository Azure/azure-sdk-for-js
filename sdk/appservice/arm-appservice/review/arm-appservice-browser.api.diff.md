# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2985,9 +2985,10 @@
     value?: string;
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyValuePairStringObject {
     // (undocumented)
@@ -4622,9 +4623,9 @@
 export type RedundancyMode = "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
 
 // @public
 export interface RegenerateActionParameter {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface RegionalCheckNameAvailabilityOptionalParams extends OperationOptions {

```