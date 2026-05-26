# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1367,12 +1367,13 @@
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
@@ -1385,9 +1386,10 @@
 // @public
 export type NotificationMode = string;
 
 // @public
-export type NotificationOptions = string;
+type NotificationOptions_2 = string;
+export { NotificationOptions_2 as NotificationOptions }
 
 // @public
 export interface NotificationRegistration extends ProxyResource {
     // (undocumented)
@@ -1889,9 +1891,9 @@
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
@@ -1927,10 +1929,10 @@
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
@@ -2031,9 +2033,9 @@
     loggingRules?: LoggingRule[];
     marketplaceType?: MarketplaceType;
     metadata?: any;
     name?: string;
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     quotaRule?: QuotaRule;
     requestHeaderOptions?: ResourceTypeRequestHeaderOptions;
     requiredFeatures?: string[];
     resourceDeletionPolicy?: ManifestResourceDeletionPolicy;
@@ -2192,9 +2194,9 @@
     manifestLink?: string;
     marketplaceOptions?: ResourceTypeRegistrationPropertiesMarketplaceOptions;
     marketplaceType?: MarketplaceType;
     metadata?: Record<string, any>;
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     onBehalfOfTokens?: ResourceTypeOnBehalfOfToken;
     openApiConfiguration?: OpenApiConfiguration;
     policyExecutionType?: PolicyExecutionType;
     readonly provisioningState?: ProvisioningState;

```