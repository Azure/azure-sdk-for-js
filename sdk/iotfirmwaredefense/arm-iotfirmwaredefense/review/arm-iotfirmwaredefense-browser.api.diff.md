# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -143,9 +143,9 @@
     weakSignatureCount?: number;
 }
 
 // @public
-export interface CryptoKey {
+interface CryptoKey_2 {
     cryptoKeyId?: string;
     cryptoKeySize?: number;
     readonly filePaths?: string[];
     isShortKeySize?: boolean;
@@ -154,12 +154,13 @@
     pairedKey?: PairedKey;
     readonly provisioningState?: ProvisioningState;
     usage?: string[];
 }
+export { CryptoKey_2 as CryptoKey }
 
 // @public
 export interface CryptoKeyResource extends ProxyResource {
-    properties?: CryptoKey;
+    properties?: CryptoKey_2;
 }
 
 // @public
 export interface CryptoKeysListByFirmwareOptionalParams extends OperationOptions {

```