# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -117,11 +117,9 @@
     innererror?: InnerError;
 }
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): void;
-}
+export type NodeJSReadableStream = never;
 
 // @public
 export interface OperationOptions {
     abortSignal?: AbortSignalLike;

```