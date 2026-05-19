# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -102,9 +102,9 @@
     readonly currentSpend?: CurrentSpend;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
     notifications?: {
-        [propertyName: string]: Notification;
+        [propertyName: string]: Notification_2;
     };
     timeGrain?: TimeGrainType;
     timePeriod?: BudgetTimePeriod;
 }
@@ -997,9 +997,9 @@
     readonly unitPrice?: number;
 }
 
 // @public
-export interface Notification {
+interface Notification_2 {
     contactEmails: string[];
     contactGroups?: string[];
     contactRoles?: string[];
     enabled: boolean;
@@ -1007,8 +1007,9 @@
     operator: OperatorType;
     threshold: number;
     thresholdType?: ThresholdType;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface Operation {
     display?: OperationDisplay;

```