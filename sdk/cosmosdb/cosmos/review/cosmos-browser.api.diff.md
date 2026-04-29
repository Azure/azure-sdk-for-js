# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -938,10 +938,10 @@
     readonly maxMediaStorageUsageInMB: number;
     // @deprecated
     get MediaLink(): string;
     readonly mediaLink: string;
-    readonly readableLocations: Location[];
-    readonly writableLocations: Location[];
+    readonly readableLocations: Location_2[];
+    readonly writableLocations: Location_2[];
 }
 
 // @public (undocumented)
 export interface DatabaseDefinition {
@@ -1316,9 +1316,9 @@
     enableEndpointDiscovery: boolean;
     getReadEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string>;
     // (undocumented)
     getReadEndpoints(): Promise<ReadonlyArray<string>>;
-    getReadLocations(): Promise<ReadonlyArray<Location>>;
+    getReadLocations(): Promise<ReadonlyArray<Location_2>>;
     getWriteEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string>;
     // (undocumented)
     getWriteEndpoints(): Promise<ReadonlyArray<string>>;
     // (undocumented)
@@ -1493,9 +1493,9 @@
     RSA_OAEP = "RSA-OAEP"
 }
 
 // @public
-export interface Location {
+interface Location_2 {
     // (undocumented)
     databaseAccountEndpoint: string;
     // (undocumented)
     lastUnavailabilityTimestampInMs?: number;
@@ -1503,8 +1503,9 @@
     name: string;
     // (undocumented)
     unavailable?: boolean;
 }
+export { Location_2 as Location }
 
 // @public
 export interface MetadataLookUpDiagnostic {
     // (undocumented)
@@ -1822,9 +1823,9 @@
     readonly permission: Permission;
 }
 
 // @public
-export class Permissions {
+class Permissions_2 {
     constructor(user: User, clientContext: ClientContext);
     create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
     query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
     query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
@@ -1832,16 +1833,18 @@
     upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse>;
     // (undocumented)
     readonly user: User;
 }
+export { Permissions_2 as Permissions }
 
 // @public
-export type Plugin<T> = (context: RequestContext, diagnosticNode: DiagnosticNodeInternal, next: Next<T>) => Promise<Response_2<T>>;
+type Plugin_2<T> = (context: RequestContext, diagnosticNode: DiagnosticNodeInternal, next: Next<T>) => Promise<Response_2<T>>;
+export { Plugin_2 as Plugin }
 
 // @public
 export interface PluginConfig {
     on: keyof typeof PluginOn;
-    plugin: Plugin<any>;
+    plugin: Plugin_2<any>;
 }
 
 // @public
 export enum PluginOn {
@@ -2100,9 +2103,9 @@
     retryCount?: number;
 }
 
 // @public (undocumented)
-export interface RequestInfo {
+interface RequestInfo_2 {
     // (undocumented)
     headers: CosmosHeaders;
     // (undocumented)
     path: string;
@@ -2112,8 +2115,9 @@
     resourceType: ResourceType;
     // (undocumented)
     verb: HTTPMethod;
 }
+export { RequestInfo_2 as RequestInfo }
 
 // @public
 export interface RequestOptions extends SharedOptions {
     accessCondition?: {
@@ -2600,9 +2604,9 @@
     static readonly zero: TimeSpan;
 }
 
 // @public (undocumented)
-export type TokenProvider = (requestInfo: RequestInfo) => Promise<string>;
+export type TokenProvider = (requestInfo: RequestInfo_2) => Promise<string>;
 
 // @public
 export class Trigger {
     constructor(container: Container, id: string, clientContext: ClientContext);
@@ -2695,9 +2699,9 @@
     delete(options?: RequestOptions): Promise<UserResponse>;
     // (undocumented)
     readonly id: string;
     permission(id: string): Permission;
-    readonly permissions: Permissions;
+    readonly permissions: Permissions_2;
     read(options?: RequestOptions): Promise<UserResponse>;
     replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse>;
     get url(): string;
 }

```