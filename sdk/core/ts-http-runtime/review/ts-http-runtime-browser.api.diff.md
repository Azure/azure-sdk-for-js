# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -253,9 +253,9 @@
     kind: "noAuth";
 }
 
 // @public
-export type NodeReadableStream = NodeJS.ReadableStream;
+export type NodeReadableStream = never;
 
 // @public
 export interface OAuth2AuthScheme<TFlows extends OAuth2Flow[]> {
     flows: TFlows;

```