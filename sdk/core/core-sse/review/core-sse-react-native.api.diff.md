# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -4,9 +4,8 @@
 
 ```ts
 
 import type { AbortSignalLike } from '@azure/abort-controller';
-import type { IncomingMessage } from 'node:http';
 
 // @public
 export function createReconnectingSseStream<TResponse extends SseConnectResponse>(connect: SseConnect<TResponse>, options: ReconnectingSseStreamOptions<TResponse>): Promise<EventMessageStream>;
 
@@ -30,14 +29,12 @@
 // @public
 export type EventMessageStream = ReadableStream<EventMessage> & AsyncDisposable & AsyncIterable<EventMessage>;
 
 // @public
-export type NodeIncomingMessage = IncomingMessage;
+export type NodeIncomingMessage = never;
 
 // @public
-export interface NodeJSReadableStream extends NodeJS.ReadableStream {
-    destroy(error?: Error): void;
-}
+export type NodeJSReadableStream = never;
 
 // @public
 export interface ReconnectingSseStreamOptions<TResponse extends SseConnectResponse> {
     abortSignal?: AbortSignalLike;

```