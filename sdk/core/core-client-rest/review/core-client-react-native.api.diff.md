# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -124,11 +124,9 @@
     innererror?: InnerError;
 }
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): void;
-}
+export type NodeJSReadableStream = never;
 
 export { NodeReadableStream }
 
 // @public

```