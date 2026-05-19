# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -945,9 +945,9 @@
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
@@ -988,9 +988,9 @@
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
@@ -1036,21 +1036,21 @@
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
@@ -1093,22 +1093,22 @@
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
@@ -1181,9 +1181,9 @@
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
@@ -1222,9 +1222,9 @@
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
@@ -2339,16 +2339,17 @@
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