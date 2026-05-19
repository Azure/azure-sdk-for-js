# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1411,9 +1411,9 @@
     restorePointInTime?: Date;
     sku?: MySQLServerSku;
     sourceServerResourceId?: string;
     readonly state?: ServerState;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: ServerVersion;
 }
 
 // @public
@@ -1471,9 +1471,9 @@
     maintenanceWindow?: MaintenanceWindow;
     network?: Network;
     replicationRole?: ReplicationRole;
     sku?: MySQLServerSku;
-    storage?: Storage;
+    storage?: Storage_2;
     tags?: {
         [propertyName: string]: string;
     };
     version?: ServerVersion;
@@ -1723,16 +1723,17 @@
     readonly vCores?: number;
 }
 
 // @public
-export interface Storage {
+interface Storage_2 {
     autoGrow?: EnableStatusEnum;
     autoIoScaling?: EnableStatusEnum;
     iops?: number;
     logOnDisk?: EnableStatusEnum;
     storageSizeGB?: number;
     readonly storageSku?: string;
 }
+export { Storage_2 as Storage }
 
 // @public
 export interface StorageEditionCapability {
     readonly maxBackupIntervalHours?: number;

```