# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -82,20 +82,21 @@
     Reserved = "Reserved"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     readonly displayName?: string;
     readonly id?: string;
     readonly latitude?: string;
     readonly longitude?: string;
     readonly name?: string;
     readonly subscriptionId?: string;
 }
+export { Location_2 as Location }
 
 // @public
 export interface LocationListResult {
-    value?: Location[];
+    value?: Location_2[];
 }
 
 // @public
 export interface Operation {
@@ -204,9 +205,9 @@
 export interface Subscriptions {
     checkZonePeers(subscriptionId: string, parameters: CheckZonePeersRequest, options?: SubscriptionsCheckZonePeersOptionalParams): Promise<SubscriptionsCheckZonePeersResponse>;
     get(subscriptionId: string, options?: SubscriptionsGetOptionalParams): Promise<SubscriptionsGetResponse>;
     list(options?: SubscriptionsListOptionalParams): PagedAsyncIterableIterator<Subscription>;
-    listLocations(subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams): PagedAsyncIterableIterator<Location>;
+    listLocations(subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams): PagedAsyncIterableIterator<Location_2>;
 }
 
 // @public
 export interface SubscriptionsCheckZonePeersOptionalParams extends coreClient.OperationOptions {

```