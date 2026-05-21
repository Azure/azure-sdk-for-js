# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -35,9 +35,9 @@
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
@@ -474,9 +474,9 @@
 
 // @public
 export interface EncryptionService {
     enabled?: boolean;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
     readonly lastEnabledTime?: Date;
 }
 
 // @public
@@ -826,9 +826,10 @@
 // @public
 export type KeySource = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     readonly currentVersionedKeyExpirationTimestamp?: Date;
@@ -1864,9 +1865,10 @@
     serviceSpecification?: ServiceSpecification;
 }
 
 // @public
-export type Permissions = string;
+type Permissions_2 = string;
+export { Permissions_2 as Permissions }
 
 // @public
 export interface PermissionScope {
     permissions: string;
@@ -2074,9 +2076,9 @@
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