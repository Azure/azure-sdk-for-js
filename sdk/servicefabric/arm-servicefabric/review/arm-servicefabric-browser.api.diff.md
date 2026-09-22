# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -344,9 +344,9 @@
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
@@ -407,9 +407,9 @@
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
@@ -437,9 +437,9 @@
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
@@ -517,9 +517,9 @@
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
@@ -862,14 +862,15 @@
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