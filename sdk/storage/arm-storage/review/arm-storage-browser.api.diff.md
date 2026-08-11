# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -47,9 +47,9 @@
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
@@ -820,9 +820,9 @@
 
 // @public
 export interface EncryptionService {
     enabled?: boolean;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     readonly lastEnabledTime?: Date;
 }
 
 // @public
@@ -1255,9 +1255,10 @@
 // @public
 export type KeySource = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     readonly currentVersionedKeyExpirationTimestamp?: Date;
@@ -2440,9 +2441,10 @@
     continuationToken?: string;
 }
 
 // @public
-export type Permissions = string;
+type Permissions_2 = string;
+export { Permissions_2 as Permissions }
 
 // @public
 export interface PermissionScope {
     permissions: string;
@@ -2745,9 +2747,9 @@
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