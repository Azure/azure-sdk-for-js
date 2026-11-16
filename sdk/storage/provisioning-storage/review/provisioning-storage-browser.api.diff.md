# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1152,16 +1152,16 @@
 
 // @public
 interface EncryptionService {
     enabled?: boolean;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     lastEnabledTime?: Date;
 }
 
 // @public
 interface EncryptionServiceInput extends InputOf<EncryptionService> {
     enabled?: ExpressionOrValue<boolean> | undefined;
-    keyType?: ExpressionOrValue<KeyType> | undefined;
+    keyType?: ExpressionOrValue<KeyType_2> | undefined;
 }
 
 // @public
 interface EncryptionServices {
@@ -1195,9 +1195,9 @@
 
 // @public
 interface EncryptionServiceView extends InputOf<EncryptionService> {
     enabled?: ExpressionOrValue<boolean> | undefined;
-    keyType?: ExpressionOrValue<KeyType> | undefined;
+    keyType?: ExpressionOrValue<KeyType_2> | undefined;
     readonly lastEnabledTime?: Expression<Date> | undefined;
 }
 
 // @public (undocumented)
@@ -1825,9 +1825,9 @@
 // @public
 type KeySource = string;
 
 // @public
-type KeyType = string;
+type KeyType_2 = string;
 
 // @public
 interface KeyVaultProperties {
     currentVersionedKeyExpirationTimestamp?: Date;
@@ -4761,9 +4761,9 @@
         IntervalUnit,
         InventoryRuleType,
         IssueType,
         KeySource,
-        KeyType,
+        KeyType_2 as KeyType,
         Kind,
         LargeFileSharesState,
         LeaseDuration,
         LeaseState,

```