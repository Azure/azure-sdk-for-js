# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1569,9 +1569,9 @@
     isVirtualNetworkFilterEnabled?: boolean;
     readonly keysMetadata?: DatabaseAccountKeysMetadata;
     keyVaultKeyUri?: string;
     kind?: DatabaseAccountKind;
-    locations: Location[];
+    locations: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     publicNetworkAccess?: PublicNetworkAccess;
@@ -1612,9 +1612,9 @@
     ipRules?: IpAddressOrRange[];
     isVirtualNetworkFilterEnabled?: boolean;
     readonly keysMetadata?: DatabaseAccountKeysMetadata;
     keyVaultKeyUri?: string;
-    locations: Location[];
+    locations: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     publicNetworkAccess?: PublicNetworkAccess;
@@ -1660,21 +1660,21 @@
     isVirtualNetworkFilterEnabled?: boolean;
     readonly keysMetadata?: DatabaseAccountKeysMetadata;
     keyVaultKeyUri?: string;
     readonly keyVaultKeyUriVersion?: string;
-    readonly locations?: Location[];
+    readonly locations?: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     readonly privateEndpointConnections?: PrivateEndpointConnection[];
     readonly provisioningState?: string;
     publicNetworkAccess?: PublicNetworkAccess;
-    readonly readLocations?: Location[];
+    readonly readLocations?: Location_2[];
     restoreParameters?: RestoreParameters;
     throughputPoolDedicatedRUs?: number;
     throughputPoolMaxConsumableRUs?: number;
     virtualNetworkRules?: VirtualNetworkRule[];
-    readonly writeLocations?: Location[];
+    readonly writeLocations?: Location_2[];
 }
 
 // @public
 export interface DatabaseAccountGetResults extends Resource {
@@ -1717,22 +1717,22 @@
     keyVaultKeyUri?: string;
     readonly keyVaultKeyUriVersion?: string;
     kind?: DatabaseAccountKind;
     location?: string;
-    readonly locations?: Location[];
+    readonly locations?: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     readonly privateEndpointConnections?: PrivateEndpointConnection[];
     readonly provisioningState?: string;
     publicNetworkAccess?: PublicNetworkAccess;
-    readonly readLocations?: Location[];
+    readonly readLocations?: Location_2[];
     restoreParameters?: RestoreParameters;
     tags?: Record<string, string>;
     throughputPoolDedicatedRUs?: number;
     throughputPoolMaxConsumableRUs?: number;
     virtualNetworkRules?: VirtualNetworkRule[];
-    readonly writeLocations?: Location[];
+    readonly writeLocations?: Location_2[];
 }
 
 // @public
 export interface DatabaseAccountKeysMetadata {
@@ -1944,9 +1944,9 @@
     isVirtualNetworkFilterEnabled?: boolean;
     readonly keysMetadata?: DatabaseAccountKeysMetadata;
     keyVaultKeyUri?: string;
     location?: string;
-    locations?: Location[];
+    locations?: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     publicNetworkAccess?: PublicNetworkAccess;
@@ -1985,9 +1985,9 @@
     ipRules?: IpAddressOrRange[];
     isVirtualNetworkFilterEnabled?: boolean;
     readonly keysMetadata?: DatabaseAccountKeysMetadata;
     keyVaultKeyUri?: string;
-    locations?: Location[];
+    locations?: Location_2[];
     minimalTlsVersion?: MinimalTlsVersion;
     networkAclBypass?: NetworkAclBypass;
     networkAclBypassResourceIds?: string[];
     publicNetworkAccess?: PublicNetworkAccess;
@@ -3596,16 +3596,17 @@
     V20251101Preview = "2025-11-01-preview"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     readonly documentEndpoint?: string;
     failoverPriority?: number;
     readonly id?: string;
     isZoneRedundant?: boolean;
     locationName?: string;
     readonly provisioningState?: string;
 }
+export { Location_2 as Location }
 
 // @public
 export interface LocationGetResult extends ProxyResource {
     properties?: LocationProperties;

```