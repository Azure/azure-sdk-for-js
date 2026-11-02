# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -916,16 +916,16 @@
 
 // @public
 export interface EncryptionService {
     enabled?: boolean;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     lastEnabledTime?: Date;
 }
 
 // @public
 export interface EncryptionServiceInput extends InputOf<EncryptionService> {
     enabled?: ExpressionOrValue<boolean> | undefined;
-    keyType?: ExpressionOrValue<KeyType> | undefined;
+    keyType?: ExpressionOrValue<KeyType_2> | undefined;
 }
 
 // @public
 export interface EncryptionServices {
@@ -959,9 +959,9 @@
 
 // @public
 export interface EncryptionServiceView extends InputOf<EncryptionService> {
     enabled?: ExpressionOrValue<boolean> | undefined;
-    keyType?: ExpressionOrValue<KeyType> | undefined;
+    keyType?: ExpressionOrValue<KeyType_2> | undefined;
     readonly lastEnabledTime?: Expression<Date> | undefined;
 }
 
 // @public (undocumented)
@@ -1503,9 +1503,10 @@
 // @public
 export type KeySource = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     currentVersionedKeyExpirationTimestamp?: Date;

```