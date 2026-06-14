# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -2100,9 +2100,9 @@
     retryCount?: number;
 }
 
 // @public (undocumented)
-export interface RequestInfo {
+interface RequestInfo_2 {
     // (undocumented)
     headers: CosmosHeaders;
     // (undocumented)
     path: string;
@@ -2112,8 +2112,9 @@
     resourceType: ResourceType;
     // (undocumented)
     verb: HTTPMethod;
 }
+export { RequestInfo_2 as RequestInfo }
 
 // @public
 export interface RequestOptions extends SharedOptions {
     accessCondition?: {
@@ -2600,9 +2601,9 @@
     static readonly zero: TimeSpan;
 }
 
 // @public (undocumented)
-export type TokenProvider = (requestInfo: RequestInfo) => Promise<string>;
+export type TokenProvider = (requestInfo: RequestInfo_2) => Promise<string>;
 
 // @public
 export class Trigger {
     constructor(container: Container, id: string, clientContext: ClientContext);

```