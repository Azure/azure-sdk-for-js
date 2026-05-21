# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -241,9 +241,10 @@
 // @public
 export function start(context: ContainerServiceContext, resourceGroupName: string, resourceName: string, options?: ManagedClustersStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: ContainerServiceContext, resourceGroupName: string, resourceName: string, options?: ManagedClustersStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: ContainerServiceContext, resourceGroupName: string, resourceName: string, options?: ManagedClustersStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function updateTags(context: ContainerServiceContext, resourceGroupName: string, resourceName: string, parameters: TagsObject, options?: ManagedClustersUpdateTagsOptionalParams): PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
 

```