# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1697,11 +1697,12 @@
     publicAccess?: PublicNetworkAccessState;
 }
 
 // @public
-export interface Node extends ProxyResource {
+interface Node_2 extends ProxyResource {
     properties?: NodeProperties;
 }
+export { Node_2 as Node }
 
 // @public
 export interface NodeProperties {
     readonly availabilityZone: string;
@@ -1720,10 +1721,10 @@
 }
 
 // @public
 export interface NodesOperations {
-    get: (resourceGroupName: string, clusterName: string, poolName: string, nodeName: string, options?: NodesGetOptionalParams) => Promise<Node>;
-    list: (resourceGroupName: string, clusterName: string, poolName: string, options?: NodesListOptionalParams) => PagedAsyncIterableIterator<Node>;
+    get: (resourceGroupName: string, clusterName: string, poolName: string, nodeName: string, options?: NodesGetOptionalParams) => Promise<Node_2>;
+    list: (resourceGroupName: string, clusterName: string, poolName: string, options?: NodesListOptionalParams) => PagedAsyncIterableIterator<Node_2>;
 }
 
 // @public
 export interface Operation {

```