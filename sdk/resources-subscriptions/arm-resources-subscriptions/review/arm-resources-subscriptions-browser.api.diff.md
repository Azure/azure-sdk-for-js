# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -129,9 +129,9 @@
     V20221201 = "2022-12-01"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     availabilityZoneMappings?: AvailabilityZoneMappings[];
     readonly displayName?: string;
     readonly id?: string;
     metadata?: LocationMetadata;
@@ -139,8 +139,9 @@
     readonly regionalDisplayName?: string;
     readonly subscriptionId?: string;
     readonly type?: LocationType;
 }
+export { Location_2 as Location }
 
 // @public
 export interface LocationMetadata {
     readonly geography?: string;
@@ -293,9 +294,9 @@
 export interface SubscriptionsOperations {
     checkZonePeers: (subscriptionId: string, parameters: CheckZonePeersRequest, options?: SubscriptionsCheckZonePeersOptionalParams) => Promise<CheckZonePeersResult>;
     get: (subscriptionId: string, options?: SubscriptionsGetOptionalParams) => Promise<Subscription>;
     list: (options?: SubscriptionsListOptionalParams) => PagedAsyncIterableIterator<Subscription>;
-    listLocations: (subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams) => PagedAsyncIterableIterator<Location>;
+    listLocations: (subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams) => PagedAsyncIterableIterator<Location_2>;
 }
 
 // @public
 export type SubscriptionState = "Enabled" | "Warned" | "PastDue" | "Disabled" | "Deleted";

```
