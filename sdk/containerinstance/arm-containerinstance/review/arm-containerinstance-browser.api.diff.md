# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -457,9 +457,9 @@
     containerGroups: ContainerGroups;
     // (undocumented)
     containers: Containers;
     // (undocumented)
-    location: Location;
+    location: Location_2;
     // (undocumented)
     operations: Operations;
     // (undocumented)
     subnetServiceAssociationLink: SubnetServiceAssociationLink;
@@ -730,13 +730,14 @@
     Https = "https"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     listCachedImages(location: string, options?: LocationListCachedImagesOptionalParams): PagedAsyncIterableIterator<CachedImages>;
     listCapabilities(location: string, options?: LocationListCapabilitiesOptionalParams): PagedAsyncIterableIterator<Capabilities>;
     listUsage(location: string, options?: LocationListUsageOptionalParams): PagedAsyncIterableIterator<Usage>;
 }
+export { Location_2 as Location }
 
 // @public
 export interface LocationListCachedImagesNextOptionalParams extends coreClient.OperationOptions {
 }

```