# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1470,12 +1470,13 @@
 export interface NewRegionFrontloadReleaseStopOptionalParams extends OperationOptions {
 }
 
 // @public
-export interface Notification {
+interface Notification_2 {
     notificationType?: NotificationType;
     skipNotifications?: SkipNotifications;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface NotificationEndpoint {
     locations?: string[];
@@ -1488,9 +1489,10 @@
 // @public
 export type NotificationMode = string;
 
 // @public
-export type NotificationOptions = string;
+type NotificationOptions_2 = string;
+export { NotificationOptions_2 as NotificationOptions }
 
 // @public
 export interface NotificationRegistration extends ProxyResource {
     // (undocumented)
@@ -2014,9 +2016,9 @@
     linkedNotificationRules?: FanoutLinkedNotificationRule[];
     management?: ResourceProviderManifestManagement;
     metadata?: any;
     namespace?: string;
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     providerAuthentication?: ResourceProviderManifestProviderAuthentication;
     providerAuthorizations?: ResourceProviderAuthorization[];
     providerType?: ResourceProviderType;
     providerVersion?: string;
@@ -2053,10 +2055,10 @@
     management?: ResourceProviderManifestPropertiesManagement;
     managementGroupGlobalNotificationEndpoints?: ResourceProviderEndpoint[];
     metadata?: any;
     namespace?: string;
-    notificationOptions?: NotificationOptions;
-    notifications?: Notification[];
+    notificationOptions?: NotificationOptions_2;
+    notifications?: Notification_2[];
     notificationSettings?: ResourceProviderManifestPropertiesNotificationSettings;
     optionalFeatures?: string[];
     providerAuthentication?: ResourceProviderManifestPropertiesProviderAuthentication;
     providerAuthorizations?: ResourceProviderAuthorization[];
@@ -2157,9 +2159,9 @@
     loggingRules?: LoggingRule[];
     marketplaceType?: MarketplaceType;
     metadata?: any;
     name?: string;
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     quotaRule?: QuotaRule;
     requestHeaderOptions?: ResourceTypeRequestHeaderOptions;
     requiredFeatures?: string[];
     resourceDeletionPolicies?: ResourceDeletionPolicyAndProperties[];
@@ -2328,9 +2330,9 @@
     manifestLink?: string;
     marketplaceOptions?: ResourceTypeRegistrationPropertiesMarketplaceOptions;
     marketplaceType?: MarketplaceType;
     metadata?: Record<string, any>;
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     onBehalfOfTokens?: ResourceTypeOnBehalfOfToken;
     openApiConfiguration?: OpenApiConfiguration;
     policyExecutionType?: PolicyExecutionType;
     privateEndpointConfiguration?: PrivateEndpointConfiguration;

```