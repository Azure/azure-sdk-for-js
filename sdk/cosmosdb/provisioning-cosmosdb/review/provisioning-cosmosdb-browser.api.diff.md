# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2793,9 +2793,9 @@
 // @public
 type KeyWrapMetadataView = KeyWrapMetadataInput;
 
 // @public
-export class Location extends Resource<"Microsoft.DocumentDB/locations"> {
+class Location_2 extends Resource<"Microsoft.DocumentDB/locations"> {
     constructor(context: ProvisioningComponent, props: ExistingResourceProps & {
         existing: true;
     }, options?: ResourceOptions);
     // (undocumented)
@@ -2810,8 +2810,9 @@
     get properties(): Expression<LocationProperties>;
     // (undocumented)
     static resourceType: "Microsoft.DocumentDB/locations";
 }
+export { Location_2 as Location }
 
 // @public
 interface LocationProperties {
     backupStorageRedundancies?: BackupStorageRedundancy[];
@@ -3794,9 +3795,9 @@
 type ResourceRestoreParametersView = ResourceRestoreParametersInput;
 
 // @public
 export class RestorableDatabaseAccount extends Resource<"Microsoft.DocumentDB/locations/restorableDatabaseAccounts"> {
-    constructor(context: Location, props: ExistingResourceProps & {
+    constructor(context: Location_2, props: ExistingResourceProps & {
         existing: true;
     }, options?: ResourceOptions);
     // (undocumented)
     static apiVersion: string;

```