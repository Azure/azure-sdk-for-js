# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1782,17 +1782,18 @@
     readonly systemData?: SystemData;
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
@@ -1800,31 +1801,32 @@
     readonly type?: KubernetesNodeType;
 }
 
 // @public
-export interface NodeList {
+interface NodeList_2 {
     readonly nextLink?: string;
-    readonly value?: Node[];
+    readonly value?: Node_2[];
 }
+export { NodeList_2 as NodeList }
 
 // @public
 export interface Nodes {
-    listByDataBoxEdgeDevice(deviceName: string, resourceGroupName: string, options?: NodesListByDataBoxEdgeDeviceOptionalParams): PagedAsyncIterableIterator<Node>;
+    listByDataBoxEdgeDevice(deviceName: string, resourceGroupName: string, options?: NodesListByDataBoxEdgeDeviceOptionalParams): PagedAsyncIterableIterator<Node_2>;
 }
 
 // @public
 export interface NodesListByDataBoxEdgeDeviceNextOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type NodesListByDataBoxEdgeDeviceNextResponse = NodeList;
+export type NodesListByDataBoxEdgeDeviceNextResponse = NodeList_2;
 
 // @public
 export interface NodesListByDataBoxEdgeDeviceOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type NodesListByDataBoxEdgeDeviceResponse = NodeList;
+export type NodesListByDataBoxEdgeDeviceResponse = NodeList_2;
 
 // @public
 export type NodeStatus = string;
 

```