# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -557,9 +557,9 @@
     sdnIntegration?: SdnIntegration;
     secrets?: EceDeploymentSecrets[];
     secretsLocation?: string;
     securitySettings?: DeploymentSecuritySettings;
-    storage?: Storage;
+    storage?: Storage_2;
 }
 
 // @public
 export type DeploymentMode = string;
@@ -2444,14 +2444,15 @@
     steps?: Step[];
 }
 
 // @public
-export interface Storage {
+interface Storage_2 {
     configurationMode?: string;
     s2D?: StorageS2DConfig;
     san?: StorageSanConfig;
     storageType?: StorageType;
 }
+export { Storage_2 as Storage }
 
 // @public
 export interface StorageS2DConfig {
     overprovisioningRatio?: OverprovisioningRatio;

```