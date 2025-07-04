# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- // @public
+ // @public (undocumented)
-     constructor(readable: NodeJS.ReadableStream, bufferSize: number, maxBuffers: number, outgoingHandler: OutgoingHandler, concurrency: number, encoding?: BufferEncoding);
+ }
-     do(): Promise<void>;
+ 
- }
+ // @public (undocumented)
- 
+ export function getCachedDefaultHttpClient(): HttpClient;
- // @public (undocumented)
+ 
- export function getCachedDefaultHttpClient(): HttpClient;
+ // (No @packageDocumentation comment for this package)
- // @public
+ ```
- export type OutgoingHandler = (body: () => NodeJS.ReadableStream, length: number, offset?: number) => Promise<any>;
+ 
- 
+ 
- // (No @packageDocumentation comment for this package)
+ 
- 
+ 
- ```
+ 
```