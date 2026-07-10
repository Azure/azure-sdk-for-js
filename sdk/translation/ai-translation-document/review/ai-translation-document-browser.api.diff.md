# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -170,9 +170,9 @@
     V20260301 = "2026-03-01"
 }

 // @public
-export type NodeReadableStream = NodeJS.ReadableStream;
+export type NodeReadableStream = never;

 // @public
 export interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings extends PageSettings = PageSettings> {
     [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;

```
