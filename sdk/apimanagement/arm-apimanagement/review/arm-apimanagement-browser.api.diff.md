# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -877,9 +877,9 @@
     backend: Backend;
     beginPerformConnectivityCheckAsync(resourceGroupName: string, serviceName: string, connectivityCheckRequestParams: ConnectivityCheckRequest, options?: PerformConnectivityCheckAsyncOptionalParams): Promise<SimplePollerLike<OperationState<PerformConnectivityCheckAsyncResponse>, PerformConnectivityCheckAsyncResponse>>;
     beginPerformConnectivityCheckAsyncAndWait(resourceGroupName: string, serviceName: string, connectivityCheckRequestParams: ConnectivityCheckRequest, options?: PerformConnectivityCheckAsyncOptionalParams): Promise<PerformConnectivityCheckAsyncResponse>;
     // (undocumented)
-    cache: Cache;
+    cache: Cache_2;
     // (undocumented)
     certificate: Certificate;
     // (undocumented)
     contentItem: ContentItem;
@@ -923,9 +923,9 @@
     namedValue: NamedValue;
     // (undocumented)
     networkStatus: NetworkStatus;
     // (undocumented)
-    notification: Notification;
+    notification: Notification_2;
     // (undocumented)
     notificationRecipientEmail: NotificationRecipientEmail;
     // (undocumented)
     notificationRecipientUser: NotificationRecipientUser;
@@ -3295,16 +3295,17 @@
     bytes?: number;
 }
 
 // @public
-export interface Cache {
+interface Cache_2 {
     createOrUpdate(resourceGroupName: string, serviceName: string, cacheId: string, parameters: CacheContract, options?: CacheCreateOrUpdateOptionalParams): Promise<CacheCreateOrUpdateResponse>;
     delete(resourceGroupName: string, serviceName: string, cacheId: string, ifMatch: string, options?: CacheDeleteOptionalParams): Promise<void>;
     get(resourceGroupName: string, serviceName: string, cacheId: string, options?: CacheGetOptionalParams): Promise<CacheGetResponse>;
     getEntityTag(resourceGroupName: string, serviceName: string, cacheId: string, options?: CacheGetEntityTagOptionalParams): Promise<CacheGetEntityTagResponse>;
     listByService(resourceGroupName: string, serviceName: string, options?: CacheListByServiceOptionalParams): PagedAsyncIterableIterator<CacheContract>;
     update(resourceGroupName: string, serviceName: string, cacheId: string, ifMatch: string, parameters: CacheUpdateParameters, options?: CacheUpdateOptionalParams): Promise<CacheUpdateResponse>;
 }
+export { Cache_2 as Cache }
 
 // @public
 export interface CacheCollection {
     count?: number;
@@ -4613,9 +4614,9 @@
 }
 
 // @public
 export interface GatewayKeyRegenerationRequestContract {
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface GatewayKeysContract {
@@ -4723,9 +4724,9 @@
 
 // @public
 export interface GatewayTokenRequestContract {
     expiry: Date;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public
 export interface GatewayUpdateHeaders {
@@ -5476,9 +5477,10 @@
     userId?: string;
 }
 
 // @public
-export type KeyType = "primary" | "secondary";
+type KeyType_2 = "primary" | "secondary";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultContractCreateProperties {
     identityClientId?: string;
@@ -6400,13 +6402,14 @@
 // @public
 export type NetworkStatusListByServiceResponse = NetworkStatusContractByLocation[];
 
 // @public
-export interface Notification {
+interface Notification_2 {
     createOrUpdate(resourceGroupName: string, serviceName: string, notificationName: NotificationName, options?: NotificationCreateOrUpdateOptionalParams): Promise<NotificationCreateOrUpdateResponse>;
     get(resourceGroupName: string, serviceName: string, notificationName: NotificationName, options?: NotificationGetOptionalParams): Promise<NotificationGetResponse>;
     listByService(resourceGroupName: string, serviceName: string, options?: NotificationListByServiceOptionalParams): PagedAsyncIterableIterator<NotificationContract>;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface NotificationCollection {
     count?: number;
@@ -10061,9 +10064,9 @@
 
 // @public
 export interface UserTokenParameters {
     expiry?: Date;
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface UserTokenResult {

```