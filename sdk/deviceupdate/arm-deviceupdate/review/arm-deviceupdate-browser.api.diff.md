# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -14,9 +14,9 @@
 export interface Account extends TrackedResource {
     encryption?: Encryption;
     readonly hostName?: string;
     identity?: ManagedServiceIdentity;
-    readonly locations?: Location[];
+    readonly locations?: Location_2[];
     privateEndpointConnections?: PrivateEndpointConnection[];
     readonly provisioningState?: ProvisioningState;
     publicNetworkAccess?: PublicNetworkAccess;
     sku?: Sku;
@@ -441,13 +441,14 @@
     Standard = "Standard"
 }
 
 // @public (undocumented)
-export interface Location {
+interface Location_2 {
     // (undocumented)
     name?: string;
     role?: Role;
 }
+export { Location_2 as Location }
 
 // @public
 export interface ManagedServiceIdentity {
     readonly principalId?: string;

```