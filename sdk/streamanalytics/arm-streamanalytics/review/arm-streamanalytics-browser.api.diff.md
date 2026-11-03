# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -640,14 +640,15 @@
 // @public
 export type EventsOutOfOrderPolicy = string;
 
 // @public
-export interface External {
+interface External_2 {
     container?: string;
     path?: string;
     refreshConfiguration?: RefreshConfiguration;
     storageAccount?: StorageAccount;
 }
+export { External_2 as External }
 
 // @public
 export interface FileReferenceInputDataSource extends ReferenceInputDataSource {
     path?: string;
@@ -1787,9 +1788,9 @@
     readonly etag?: string;
     eventsLateArrivalMaxDelayInSeconds?: number;
     eventsOutOfOrderMaxDelayInSeconds?: number;
     eventsOutOfOrderPolicy?: EventsOutOfOrderPolicy;
-    externals?: External;
+    externals?: External_2;
     functions?: FunctionModel[];
     identity?: Identity;
     inputs?: Input[];
     readonly jobId?: string;

```