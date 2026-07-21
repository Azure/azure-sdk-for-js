# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -307,9 +307,9 @@
     readonly currentSpend?: CurrentSpend;
     eTag?: string;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain?: TimeGrainType;
     timePeriod?: BudgetTimePeriod;
 }
 
@@ -345,9 +345,9 @@
     category: CategoryType;
     readonly currentSpend?: CurrentSpend;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain: TimeGrainType;
     timePeriod: BudgetTimePeriod;
 }
 
@@ -1884,9 +1884,9 @@
 // @public
 export type MetricType = string;
 
 // @public
-export interface Notification {
+interface Notification_2 {
     contactEmails: string[];
     contactGroups?: string[];
     contactRoles?: string[];
     enabled: boolean;
@@ -1895,8 +1895,9 @@
     operator: BudgetNotificationOperatorType;
     threshold: number;
     thresholdType?: ThresholdType;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface NotificationProperties {
     language?: string;

```