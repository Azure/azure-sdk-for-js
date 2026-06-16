# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2054,9 +2054,9 @@
     replicationRole?: ReplicationRole;
     sku?: Sku;
     sourceServerResourceId?: string;
     readonly state?: ServerState;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: PostgresMajorVersion;
 }
 
 // @public
@@ -2083,9 +2083,9 @@
     network?: Network;
     replica?: Replica;
     replicationRole?: ReplicationRole;
     sku?: SkuForPatch;
-    storage?: Storage;
+    storage?: Storage_2;
     tags?: Record<string, string>;
     version?: PostgresMajorVersion;
 }
 
@@ -2110,9 +2110,9 @@
     readonly replicaCapacity?: number;
     replicationRole?: ReplicationRole;
     sourceServerResourceId?: string;
     readonly state?: ServerState;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: PostgresMajorVersion;
 }
 
 // @public
@@ -2129,9 +2129,9 @@
     maintenanceWindow?: MaintenanceWindowForPatch;
     network?: Network;
     replica?: Replica;
     replicationRole?: ReplicationRole;
-    storage?: Storage;
+    storage?: Storage_2;
     version?: PostgresMajorVersion;
 }
 
 // @public
@@ -2343,16 +2343,17 @@
     status?: MajorVersionUpgradePrecheckStatus;
 }
 
 // @public
-export interface Storage {
+interface Storage_2 {
     autoGrow?: StorageAutoGrow;
     iops?: number;
     storageSizeGB?: number;
     throughput?: number;
     tier?: AzureManagedDiskPerformanceTier;
     type?: StorageType;
 }
+export { Storage_2 as Storage }
 
 // @public
 export type StorageAutoGrow = string;
 

```