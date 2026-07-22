# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -130,9 +130,9 @@
     readonly currentSpend?: CurrentSpend;
     eTag?: string;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain?: TimeGrainType;
     timePeriod?: BudgetTimePeriod;
 }
 
@@ -165,9 +165,9 @@
     category: CategoryType;
     readonly currentSpend?: CurrentSpend;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain: TimeGrainType;
     timePeriod: BudgetTimePeriod;
 }
 
@@ -1297,9 +1297,9 @@
     readonly unitPrice?: number;
 }
 
 // @public
-export interface Notification {
+interface Notification_2 {
     contactEmails: string[];
     contactGroups?: string[];
     contactRoles?: string[];
     enabled: boolean;
@@ -1307,8 +1307,9 @@
     operator: OperatorType;
     threshold: number;
     thresholdType?: ThresholdType;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface Operation {
     display?: OperationDisplay;

```