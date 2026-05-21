# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -100,9 +100,9 @@
     V20221201 = "2022-12-01"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     availabilityZoneMappings?: AvailabilityZoneMappings[];
     readonly displayName?: string;
     readonly id?: string;
     metadata?: LocationMetadata;
@@ -110,8 +110,9 @@
     readonly regionalDisplayName?: string;
     readonly subscriptionId?: string;
     readonly type?: LocationType;
 }
+export { Location_2 as Location }
 
 // @public
 export interface LocationMetadata {
     readonly geography?: string;

```