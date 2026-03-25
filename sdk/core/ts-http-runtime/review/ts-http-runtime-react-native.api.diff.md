# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
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