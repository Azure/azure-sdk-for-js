# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1891,17 +1891,18 @@
     readonly networkAdapters?: NetworkAdapter[];
 }
 
 // @public
-export interface Node extends ARMBaseModel {
+interface Node_2 extends ARMBaseModel {
     readonly nodeChassisSerialNumber?: string;
     readonly nodeDisplayName?: string;
     readonly nodeFriendlySoftwareVersion?: string;
     readonly nodeHcsVersion?: string;
     readonly nodeInstanceId?: string;
     readonly nodeSerialNumber?: string;
     readonly nodeStatus?: NodeStatus;
 }
+export { Node_2 as Node }
 
 // @public
 export interface NodeInfo {
     ipConfiguration?: KubernetesIPConfiguration[];
@@ -1925,9 +1926,9 @@
 }
 
 // @public
 export interface NodesOperations {
-    listByDataBoxEdgeDevice: (deviceName: string, resourceGroupName: string, options?: NodesListByDataBoxEdgeDeviceOptionalParams) => PagedAsyncIterableIterator<Node>;
+    listByDataBoxEdgeDevice: (deviceName: string, resourceGroupName: string, options?: NodesListByDataBoxEdgeDeviceOptionalParams) => PagedAsyncIterableIterator<Node_2>;
 }
 
 // @public
 export type NodeStatus = string;

```