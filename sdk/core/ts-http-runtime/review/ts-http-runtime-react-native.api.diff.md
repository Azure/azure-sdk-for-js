# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -151,13 +151,14 @@
 export type EncodingType = "utf-8" | "base64" | "base64url" | "hex";
 
 // @public
 export type FormDataMap = {
-    [key: string]: FormDataValue | FormDataValue[];
+    [key: string]: FormDataValue_2 | FormDataValue_2[];
 };
 
 // @public
-export type FormDataValue = string | Blob | File;
+type FormDataValue_2 = string | Blob | File;
+export { FormDataValue_2 as FormDataValue }
 
 // @public
 export interface FullOperationResponse extends PipelineResponse {
     parsedBody?: RequestBodyType;
@@ -253,12 +254,12 @@
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
@@ -562,9 +563,9 @@
     userAgentPrefix?: string;
 }
 
 // @public
-export type WebReadableStream<R = any> = ReadableStream<R>;
+export type WebReadableStream<_R = any> = never;
 
 // (No @packageDocumentation comment for this package)
 
 ```

```