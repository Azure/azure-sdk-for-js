# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -21,10 +21,10 @@
     abstract read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;
 }
 
 // @public (undocumented)
-export class AvroReadableFromStream extends AvroReadable {
-    constructor(readable: NodeJS.ReadableStream);
+export class AvroReadableFromBlob extends AvroReadable {
+    constructor(blob: Blob);
     // (undocumented)
     get position(): number;
     // (undocumented)
     read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;

```