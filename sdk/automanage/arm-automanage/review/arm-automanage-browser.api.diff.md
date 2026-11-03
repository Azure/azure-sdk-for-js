# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -372,44 +372,44 @@
 
 // @public
 export interface HCIReports {
     get(resourceGroupName: string, clusterName: string, configurationProfileAssignmentName: string, reportName: string, options?: HCIReportsGetOptionalParams): Promise<HCIReportsGetResponse>;
-    listByConfigurationProfileAssignments(resourceGroupName: string, clusterName: string, configurationProfileAssignmentName: string, options?: HCIReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report>;
+    listByConfigurationProfileAssignments(resourceGroupName: string, clusterName: string, configurationProfileAssignmentName: string, options?: HCIReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report_2>;
 }
 
 // @public
 export interface HCIReportsGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type HCIReportsGetResponse = Report;
+export type HCIReportsGetResponse = Report_2;
 
 // @public
 export interface HCIReportsListByConfigurationProfileAssignmentsOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type HCIReportsListByConfigurationProfileAssignmentsResponse = ReportList;
+export type HCIReportsListByConfigurationProfileAssignmentsResponse = ReportList_2;
 
 // @public
 export interface HcrpReports {
     get(resourceGroupName: string, machineName: string, configurationProfileAssignmentName: string, reportName: string, options?: HcrpReportsGetOptionalParams): Promise<HcrpReportsGetResponse>;
-    listByConfigurationProfileAssignments(resourceGroupName: string, machineName: string, configurationProfileAssignmentName: string, options?: HcrpReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report>;
+    listByConfigurationProfileAssignments(resourceGroupName: string, machineName: string, configurationProfileAssignmentName: string, options?: HcrpReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report_2>;
 }
 
 // @public
 export interface HcrpReportsGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type HcrpReportsGetResponse = Report;
+export type HcrpReportsGetResponse = Report_2;
 
 // @public
 export interface HcrpReportsListByConfigurationProfileAssignmentsOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type HcrpReportsListByConfigurationProfileAssignmentsResponse = ReportList;
+export type HcrpReportsListByConfigurationProfileAssignmentsResponse = ReportList_2;
 
 // @public
 export enum KnownActionType {
     Internal = "Internal"
@@ -472,9 +472,9 @@
 export interface ProxyResource extends Resource {
 }
 
 // @public
-export interface Report extends ProxyResource {
+interface Report_2 extends ProxyResource {
     readonly configurationProfile?: string;
     readonly duration?: string;
     endTime?: string;
     readonly error?: ErrorDetail;
@@ -485,13 +485,15 @@
     readonly status?: string;
     readonly systemData?: SystemData;
     readonly typePropertiesType?: string;
 }
+export { Report_2 as Report }
 
 // @public
-export interface ReportList {
-    value?: Report[];
+interface ReportList_2 {
+    value?: Report_2[];
 }
+export { ReportList_2 as ReportList }
 
 // @public
 export interface ReportResource {
     readonly error?: ErrorDetail;
@@ -503,24 +505,24 @@
 
 // @public
 export interface Reports {
     get(resourceGroupName: string, configurationProfileAssignmentName: string, reportName: string, vmName: string, options?: ReportsGetOptionalParams): Promise<ReportsGetResponse>;
-    listByConfigurationProfileAssignments(resourceGroupName: string, configurationProfileAssignmentName: string, vmName: string, options?: ReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report>;
+    listByConfigurationProfileAssignments(resourceGroupName: string, configurationProfileAssignmentName: string, vmName: string, options?: ReportsListByConfigurationProfileAssignmentsOptionalParams): PagedAsyncIterableIterator<Report_2>;
 }
 
 // @public
 export interface ReportsGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ReportsGetResponse = Report;
+export type ReportsGetResponse = Report_2;
 
 // @public
 export interface ReportsListByConfigurationProfileAssignmentsOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ReportsListByConfigurationProfileAssignmentsResponse = ReportList;
+export type ReportsListByConfigurationProfileAssignmentsResponse = ReportList_2;
 
 // @public
 export interface Resource {
     readonly id?: string;

```