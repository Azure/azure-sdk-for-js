# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -346,9 +346,9 @@
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
@@ -409,9 +409,9 @@
     fabricSettings?: SettingsSectionDescription[];
     infrastructureServiceManager?: boolean;
     managementEndpoint: string;
     nodeTypes: NodeTypeDescription[];
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     readonly provisioningState?: ProvisioningState;
     reliabilityLevel?: ReliabilityLevel;
     reverseProxyCertificate?: CertificateDescription;
     reverseProxyCertificateCommonNames?: ServerCertificateCommonNames;
@@ -439,9 +439,9 @@
     eventStoreServiceEnabled?: boolean;
     fabricSettings?: SettingsSectionDescription[];
     infrastructureServiceManager?: boolean;
     nodeTypes?: NodeTypeDescription[];
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     reliabilityLevel?: ReliabilityLevel;
     reverseProxyCertificate?: CertificateDescription;
     sfZonalUpgradeMode?: SfZonalUpgradeMode;
     upgradeDescription?: ClusterUpgradePolicy;
@@ -519,9 +519,9 @@
     eventStoreServiceEnabled?: boolean;
     fabricSettings?: SettingsSectionDescription[];
     infrastructureServiceManager?: boolean;
     nodeTypes?: NodeTypeDescription[];
-    notifications?: Notification[];
+    notifications?: Notification_2[];
     reliabilityLevel?: ReliabilityLevel;
     reverseProxyCertificate?: CertificateDescription;
     sfZonalUpgradeMode?: SfZonalUpgradeMode;
     tags?: Record<string, string>;
@@ -866,14 +866,15 @@
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