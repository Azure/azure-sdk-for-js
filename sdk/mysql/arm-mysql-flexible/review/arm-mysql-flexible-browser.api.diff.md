# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1398,9 +1398,9 @@
     restorePointInTime?: Date;
     sku?: MySQLServerSku;
     sourceServerResourceId?: string;
     readonly state?: ServerState;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: ServerVersion;
 }
 
 // @public
@@ -1469,9 +1469,9 @@
     maintenanceWindow?: MaintenanceWindow;
     network?: Network;
     replicationRole?: ReplicationRole;
     sku?: MySQLServerSku;
-    storage?: Storage;
+    storage?: Storage_2;
     tags?: Record<string, string>;
     version?: ServerVersion;
 }
 
@@ -1502,9 +1502,9 @@
     replicationRole?: ReplicationRole;
     restorePointInTime?: Date;
     sourceServerResourceId?: string;
     readonly state?: ServerState;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: ServerVersion;
 }
 
 // @public
@@ -1516,9 +1516,9 @@
     maintenancePolicy?: MaintenancePolicy;
     maintenanceWindow?: MaintenanceWindow;
     network?: Network;
     replicationRole?: ReplicationRole;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: ServerVersion;
 }
 
 // @public
@@ -1715,17 +1715,18 @@
     readonly vCores?: number;
 }
 
 // @public
-export interface Storage {
+interface Storage_2 {
     autoGrow?: EnableStatusEnum;
     autoIoScaling?: EnableStatusEnum;
     iops?: number;
     logOnDisk?: EnableStatusEnum;
     storageRedundancy?: StorageRedundancyEnum;
     storageSizeGB?: number;
     readonly storageSku?: string;
 }
+export { Storage_2 as Storage }
 
 // @public
 export interface StorageEditionCapability {
     readonly maxBackupIntervalHours?: number;

```