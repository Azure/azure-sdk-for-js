# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- export class AvroReadableFromStream extends AvroReadable {
+ export class AvroReadableFromBlob extends AvroReadable {
-     constructor(readable: NodeJS.ReadableStream);
+     constructor(blob: Blob);
```