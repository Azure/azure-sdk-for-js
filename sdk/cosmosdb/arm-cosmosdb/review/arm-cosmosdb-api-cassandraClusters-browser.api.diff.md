# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -116,9 +116,10 @@
 // @public
 export function start(context: CosmosDBManagementContext, resourceGroupName: string, clusterName: string, options?: CassandraClustersStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function status(context: CosmosDBManagementContext, resourceGroupName: string, clusterName: string, options?: CassandraClustersStatusOptionalParams): Promise<CassandraClusterPublicStatus>;
+function status_2(context: CosmosDBManagementContext, resourceGroupName: string, clusterName: string, options?: CassandraClustersStatusOptionalParams): Promise<CassandraClusterPublicStatus>;
+export { status_2 as status }
 
 // @public
 export function update(context: CosmosDBManagementContext, resourceGroupName: string, clusterName: string, body: ClusterResource, options?: CassandraClustersUpdateOptionalParams): PollerLike<OperationState<ClusterResource>, ClusterResource>;
 

```