# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -377,9 +377,9 @@
     fabricSettings?: SettingsSectionDescription[];
     infrastructureServiceManager?: boolean;
     managementEndpoint?: string;
     nodeTypes?: NodeTypeDescription[];
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     readonly provisioningState?: ProvisioningState;
     reliabilityLevel?: ReliabilityLevel;
     reverseProxyCertificate?: CertificateDescription;
     reverseProxyCertificateCommonNames?: ServerCertificateCommonNames;
@@ -523,9 +523,9 @@
     eventStoreServiceEnabled?: boolean;
     fabricSettings?: SettingsSectionDescription[];
     infrastructureServiceManager?: boolean;
     nodeTypes?: NodeTypeDescription[];
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     reliabilityLevel?: ReliabilityLevel;
     reverseProxyCertificate?: CertificateDescription;
     sfZonalUpgradeMode?: SfZonalUpgradeMode;
     tags?: {
@@ -870,14 +870,15 @@
     vmInstanceCount: number;
 }
 
 // @public
-export interface Notification {
+interface Notification_2 {
     isEnabled: boolean;
     notificationCategory: NotificationCategory;
     notificationLevel: NotificationLevel;
     notificationTargets: NotificationTarget[];
 }
+export { Notification_2 as Notification }
 
 // @public
 export type NotificationCategory = string;
 

```