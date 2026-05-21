# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -548,15 +548,16 @@
 // @public
 export type HyperVGenerationTypes = string;
 
 // @public
-export interface Image extends TrackedResource {
+interface Image_2 extends TrackedResource {
     extendedLocation?: ExtendedLocation;
     hyperVGeneration?: HyperVGenerationTypes;
     readonly provisioningState?: string;
     sourceVirtualMachine?: SubResource;
     storageProfile?: ImageStorageProfile;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDataDisk extends ImageDisk {
     lun: number;

```