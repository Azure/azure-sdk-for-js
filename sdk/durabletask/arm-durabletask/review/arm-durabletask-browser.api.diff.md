# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -543,12 +543,13 @@
     retentionPolicies?: RetentionPolicyDetails[];
 }
 
 // @public
-export interface Scheduler extends TrackedResource {
+interface Scheduler_2 extends TrackedResource {
     identity?: ManagedServiceIdentity;
     properties?: SchedulerProperties;
 }
+export { Scheduler_2 as Scheduler }
 
 // @public
 export interface SchedulerPrivateLinkResource extends Resource {
     properties?: PrivateLinkResourceProperties;
@@ -639,21 +640,21 @@
 }
 
 // @public
 export interface SchedulersOperations {
-    createOrUpdate: (resourceGroupName: string, schedulerName: string, resource: Scheduler, options?: SchedulersCreateOrUpdateOptionalParams) => PollerLike<OperationState<Scheduler>, Scheduler>;
+    createOrUpdate: (resourceGroupName: string, schedulerName: string, resource: Scheduler_2, options?: SchedulersCreateOrUpdateOptionalParams) => PollerLike<OperationState<Scheduler_2>, Scheduler_2>;
     createOrUpdatePrivateEndpointConnection: (resourceGroupName: string, schedulerName: string, privateEndpointConnectionName: string, resource: PrivateEndpointConnection, options?: SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
     delete: (resourceGroupName: string, schedulerName: string, options?: SchedulersDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
     deletePrivateEndpointConnection: (resourceGroupName: string, schedulerName: string, privateEndpointConnectionName: string, options?: SchedulersDeletePrivateEndpointConnectionOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, schedulerName: string, options?: SchedulersGetOptionalParams) => Promise<Scheduler>;
+    get: (resourceGroupName: string, schedulerName: string, options?: SchedulersGetOptionalParams) => Promise<Scheduler_2>;
     getPrivateEndpointConnection: (resourceGroupName: string, schedulerName: string, privateEndpointConnectionName: string, options?: SchedulersGetPrivateEndpointConnectionOptionalParams) => Promise<PrivateEndpointConnection>;
     getPrivateLink: (resourceGroupName: string, schedulerName: string, privateLinkResourceName: string, options?: SchedulersGetPrivateLinkOptionalParams) => Promise<SchedulerPrivateLinkResource>;
-    listByResourceGroup: (resourceGroupName: string, options?: SchedulersListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Scheduler>;
-    listBySubscription: (options?: SchedulersListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<Scheduler>;
+    listByResourceGroup: (resourceGroupName: string, options?: SchedulersListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Scheduler_2>;
+    listBySubscription: (options?: SchedulersListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<Scheduler_2>;
     listPrivateEndpointConnections: (resourceGroupName: string, schedulerName: string, options?: SchedulersListPrivateEndpointConnectionsOptionalParams) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
     listPrivateLinks: (resourceGroupName: string, schedulerName: string, options?: SchedulersListPrivateLinksOptionalParams) => PagedAsyncIterableIterator<SchedulerPrivateLinkResource>;
     restart: (resourceGroupName: string, schedulerName: string, options?: SchedulersRestartOptionalParams) => Promise<void>;
-    update: (resourceGroupName: string, schedulerName: string, properties: SchedulerUpdate, options?: SchedulersUpdateOptionalParams) => PollerLike<OperationState<Scheduler>, Scheduler>;
+    update: (resourceGroupName: string, schedulerName: string, properties: SchedulerUpdate, options?: SchedulersUpdateOptionalParams) => PollerLike<OperationState<Scheduler_2>, Scheduler_2>;
     updatePrivateEndpointConnection: (resourceGroupName: string, schedulerName: string, privateEndpointConnectionName: string, properties: PrivateEndpointConnectionUpdate, options?: SchedulersUpdatePrivateEndpointConnectionOptionalParams) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
 }
 
 // @public

```