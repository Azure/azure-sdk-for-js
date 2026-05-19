# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -370,15 +370,16 @@
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
 
@@ -458,9 +459,9 @@
     impactDescription?: string;
     impactedResourceId: string;
     impactGroupId?: string;
     readonly impactUniqueId?: string;
-    performance?: Performance[];
+    performance?: Performance_2[];
     readonly provisioningState?: ProvisioningState;
     readonly reportedTimeUtc?: Date;
     startDateTime: Date;
     workload?: Workload;

```