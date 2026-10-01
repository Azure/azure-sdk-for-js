# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -3478,9 +3478,9 @@
 }
 
 // @public
 export interface GatewayKeyRegenerationRequestContract {
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface GatewayKeysContract {
@@ -3572,9 +3572,9 @@
 
 // @public
 export interface GatewayTokenRequestContract {
     expiry: Date;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface GatewayUpdateOptionalParams extends OperationOptions {
@@ -4081,9 +4081,10 @@
     userId?: string;
 }
 
 // @public
-export type KeyType = "primary" | "secondary";
+type KeyType_2 = "primary" | "secondary";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultContractCreateProperties {
     identityClientId?: string;
@@ -7685,15 +7686,15 @@
 
 // @public
 export interface UserTokenParameterProperties {
     expiry: Date;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface UserTokenParameters {
     expiry?: Date;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface UserTokenResult {

```