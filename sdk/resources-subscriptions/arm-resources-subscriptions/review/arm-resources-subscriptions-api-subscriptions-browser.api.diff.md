# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -16,9 +16,9 @@
 // @public
 export function list(context: SubscriptionContext, options?: SubscriptionsListOptionalParams): PagedAsyncIterableIterator<Subscription>;
 
 // @public
-export function listLocations(context: SubscriptionContext, subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams): PagedAsyncIterableIterator<Location>;
+export function listLocations(context: SubscriptionContext, subscriptionId: string, options?: SubscriptionsListLocationsOptionalParams): PagedAsyncIterableIterator<Location_2>;
 
 // @public
 export interface SubscriptionsCheckZonePeersOptionalParams extends OperationOptions {
 }

```