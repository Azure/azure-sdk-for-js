# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -252,9 +252,9 @@
     value?: Operation[];
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     additionalShippingInformation?: string;
     alternateLocations?: string[];
     city?: string;
     countryOrRegion?: string;
@@ -268,21 +268,22 @@
     streetAddress2?: string;
     supportedCarriers?: string[];
     type?: string;
 }
+export { Location_2 as Location }
 
 // @public
 export interface Locations {
     get(locationName: string, options?: LocationsGetOptionalParams): Promise<LocationsGetResponse>;
-    list(options?: LocationsListOptionalParams): PagedAsyncIterableIterator<Location>;
+    list(options?: LocationsListOptionalParams): PagedAsyncIterableIterator<Location_2>;
 }
 
 // @public
 export interface LocationsGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type LocationsGetResponse = Location;
+export type LocationsGetResponse = Location_2;
 
 // @public
 export interface LocationsListOptionalParams extends coreClient.OperationOptions {
 }
@@ -291,9 +292,9 @@
 export type LocationsListResponse = LocationsResponse;
 
 // @public
 export interface LocationsResponse {
-    value?: Location[];
+    value?: Location_2[];
 }
 
 // @public
 export interface Operation {

```