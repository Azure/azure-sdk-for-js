# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -41,9 +41,9 @@
 // @public
 export interface AccountSasParameters {
     iPAddressOrRange?: string;
     keyToSign?: string;
-    permissions: Permissions;
+    permissions: Permissions_2;
     protocols?: HttpProtocol;
     resourceTypes: SignedResourceTypes;
     services: Services;
     sharedAccessExpiryTime: Date;
@@ -684,9 +684,9 @@
 
 // @public
 export interface EncryptionService {
     enabled?: boolean;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     readonly lastEnabledTime?: Date;
 }
 
 // @public
@@ -1138,9 +1138,10 @@
 // @public
 export type KeySource = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     readonly currentVersionedKeyExpirationTimestamp?: Date;
@@ -2249,9 +2250,10 @@
 // @public
 export type OperationsListResponse = OperationListResult;
 
 // @public
-export type Permissions = string;
+type Permissions_2 = string;
+export { Permissions_2 as Permissions }
 
 // @public (undocumented)
 export interface PermissionScope {
     permissions: string;
@@ -2573,9 +2575,9 @@
     iPAddressOrRange?: string;
     keyToSign?: string;
     partitionKeyEnd?: string;
     partitionKeyStart?: string;
-    permissions?: Permissions;
+    permissions?: Permissions_2;
     protocols?: HttpProtocol;
     resource?: SignedResource;
     rowKeyEnd?: string;
     rowKeyStart?: string;

```