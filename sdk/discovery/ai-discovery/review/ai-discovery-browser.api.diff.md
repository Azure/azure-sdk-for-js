# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -685,9 +685,9 @@
     readonly lastModifiedBy?: string;
     readonly lastModifiedByType?: ByType;
     readonly name: string;
     parentId?: string;
-    priority?: TaskPriority;
+    priority?: TaskPriority_2;
     relatedTo?: string[];
     status?: TaskStatus;
     storageAssetIds?: string[];
     taskResult?: TaskResult;
@@ -712,9 +712,10 @@
 // @public
 export type TaskCreateOrUpdateContent = Omit<Task, "name">;
 
 // @public
-export type TaskPriority = string;
+type TaskPriority_2 = string;
+export { TaskPriority_2 as TaskPriority }
 
 // @public
 export interface TaskResult {
     storageAssetIds?: string[];

```