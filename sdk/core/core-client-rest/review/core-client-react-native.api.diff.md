# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -127,11 +127,9 @@
 
 export { InternalClientOptions }
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): void;
-}
+export type NodeJSReadableStream = never;
 
 export { NodeReadableStream }
 
 // @public

```