# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -253,12 +253,12 @@
     kind: "noAuth";
 }
 
 // @public
-export type NodeBuffer = Buffer;
+export type NodeBuffer = never;
 
 // @public
-export type NodeReadableStream = NodeJS.ReadableStream;
+export type NodeReadableStream = never;
 
 // @public
 export interface OAuth2AuthScheme<TFlows extends OAuth2Flow[]> {
     flows: TFlows;

```