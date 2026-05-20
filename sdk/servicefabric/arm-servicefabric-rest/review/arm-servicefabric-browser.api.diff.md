# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -726,9 +726,9 @@
     fabricSettings?: Array<SettingsSectionDescription>;
     infrastructureServiceManager?: boolean;
     managementEndpoint: string;
     nodeTypes: Array<NodeTypeDescription>;
-    notifications?: Array<Notification>;
+    notifications?: Array<Notification_2>;
     reliabilityLevel?: "None" | "Bronze" | "Silver" | "Gold" | "Platinum";
     reverseProxyCertificate?: CertificateDescription;
     reverseProxyCertificateCommonNames?: ServerCertificateCommonNames;
     sfZonalUpgradeMode?: "Parallel" | "Hierarchical";
@@ -790,9 +790,9 @@
     eventStoreServiceEnabled?: boolean;
     fabricSettings?: Array<SettingsSectionDescription>;
     infrastructureServiceManager?: boolean;
     nodeTypes?: Array<NodeTypeDescription>;
-    notifications?: Array<Notification>;
+    notifications?: Array<Notification_2>;
     reliabilityLevel?: "None" | "Bronze" | "Silver" | "Gold" | "Platinum";
     reverseProxyCertificate?: CertificateDescription;
     sfZonalUpgradeMode?: "Parallel" | "Hierarchical";
     upgradeDescription?: ClusterUpgradePolicy;
@@ -1381,14 +1381,15 @@
     vmInstanceCount: number;
 }
 
 // @public
-export interface Notification {
+interface Notification_2 {
     isEnabled: boolean;
     notificationCategory: "WaveProgress";
     notificationLevel: "Critical" | "All";
     notificationTargets: Array<NotificationTarget>;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface NotificationOutput {
     isEnabled: boolean;

```