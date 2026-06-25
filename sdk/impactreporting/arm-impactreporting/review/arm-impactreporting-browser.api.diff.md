# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -426,15 +426,16 @@
     continuationToken?: string;
 }
 
 // @public
-export interface Performance {
+interface Performance_2 {
     actual?: number;
     expected?: number;
     expectedValueRange?: ExpectedValueRange;
     metricName?: string;
     unit?: MetricUnit;
 }
+export { Performance_2 as Performance }
 
 // @public
 export type Platform = string;
 
@@ -545,9 +546,9 @@
     impactGroupId?: string;
     readonly impactUniqueId?: string;
     readonly insightsByCategory?: InsightCategoryGroup[];
     ongoingImpact?: boolean;
-    performance?: Performance[];
+    performance?: Performance_2[];
     readonly provisioningState?: ProvisioningState;
     readonly reportedTimeUtc?: Date;
     severity?: Severity;
     startDateTime: Date;

```