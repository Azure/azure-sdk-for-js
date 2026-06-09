# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1576,9 +1576,9 @@
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
@@ -1621,9 +1621,9 @@
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
@@ -1671,22 +1671,22 @@
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
     softDeleteConfiguration?: SoftDeleteConfiguration;
     throughputPoolDedicatedRUs?: number;
     throughputPoolMaxConsumableRUs?: number;
     virtualNetworkRules?: VirtualNetworkRule[];
-    readonly writeLocations?: Location[];
+    readonly writeLocations?: Location_2[];
 }
 
 // @public
 export interface DatabaseAccountGetResults extends ProxyResource {
@@ -1730,23 +1730,23 @@
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
     softDeleteConfiguration?: SoftDeleteConfiguration;
     tags?: Record<string, string>;
     throughputPoolDedicatedRUs?: number;
     throughputPoolMaxConsumableRUs?: number;
     virtualNetworkRules?: VirtualNetworkRule[];
-    readonly writeLocations?: Location[];
+    readonly writeLocations?: Location_2[];
 }
 
 // @public
 export interface DatabaseAccountKeysMetadata {
@@ -1960,9 +1960,9 @@
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
@@ -2003,9 +2003,9 @@
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
@@ -3637,16 +3637,17 @@
     V20260401Preview = "2026-04-01-preview"
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
@@ -5478,11 +5479,11 @@
 }
 
 // @public
 export interface SoftDeletedDatabaseAccountResource {
-    locations?: Location[];
-    readLocations?: Location[];
-    writeLocations?: Location[];
+    locations?: Location_2[];
+    readLocations?: Location_2[];
+    writeLocations?: Location_2[];
 }
 
 // @public
 export interface SoftDeletedDatabaseAccountsGetOptionalParams extends OperationOptions {

```