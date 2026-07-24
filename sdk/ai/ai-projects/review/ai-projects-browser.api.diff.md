# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2949,9 +2949,9 @@
     readonly type: "None";
 }
 
 // @public
-export type NodeReadableStream = NodeJS.ReadableStream;
+export type NodeReadableStream = never;
 
 // @public
 export interface OneTimeTrigger extends Trigger {
     timeZone?: string;

```