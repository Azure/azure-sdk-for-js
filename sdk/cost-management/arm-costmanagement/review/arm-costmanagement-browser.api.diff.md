# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -306,9 +306,9 @@
     readonly currentSpend?: CurrentSpend;
     eTag?: string;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain?: TimeGrainType;
     timePeriod?: BudgetTimePeriod;
 }
 
@@ -344,9 +344,9 @@
     category: CategoryType;
     readonly currentSpend?: CurrentSpend;
     filter?: BudgetFilter;
     readonly forecastSpend?: ForecastSpend;
-    notifications?: Record<string, Notification>;
+    notifications?: Record<string, Notification_2>;
     timeGrain: TimeGrainType;
     timePeriod: BudgetTimePeriod;
 }
 
@@ -1835,9 +1835,9 @@
 // @public
 export type MetricType = string;
 
 // @public
-export interface Notification {
+interface Notification_2 {
     contactEmails: string[];
     contactGroups?: string[];
     contactRoles?: string[];
     enabled: boolean;
@@ -1846,8 +1846,9 @@
     operator: BudgetNotificationOperatorType;
     threshold: number;
     thresholdType?: ThresholdType;
 }
+export { Notification_2 as Notification }
 
 // @public
 export interface NotificationProperties {
     language?: string;

```