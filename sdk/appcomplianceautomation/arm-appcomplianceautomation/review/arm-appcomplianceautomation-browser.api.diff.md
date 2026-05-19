# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -26,9 +26,9 @@
     operations: Operations;
     // (undocumented)
     providerActions: ProviderActions;
     // (undocumented)
-    report: Report;
+    report: Report_2;
     // (undocumented)
     scopingConfiguration: ScopingConfiguration;
     // (undocumented)
     snapshot: Snapshot;
@@ -718,9 +718,9 @@
     readonly recommendationSolutionIndex?: string;
 }
 
 // @public
-export interface Report {
+interface Report_2 {
     beginCreateOrUpdate(reportName: string, properties: ReportResource, options?: ReportCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ReportCreateOrUpdateResponse>, ReportCreateOrUpdateResponse>>;
     beginCreateOrUpdateAndWait(reportName: string, properties: ReportResource, options?: ReportCreateOrUpdateOptionalParams): Promise<ReportCreateOrUpdateResponse>;
     beginDelete(reportName: string, options?: ReportDeleteOptionalParams): Promise<SimplePollerLike<OperationState<ReportDeleteResponse>, ReportDeleteResponse>>;
     beginDeleteAndWait(reportName: string, options?: ReportDeleteOptionalParams): Promise<ReportDeleteResponse>;
@@ -736,8 +736,9 @@
     getScopingQuestions(reportName: string, options?: ReportGetScopingQuestionsOptionalParams): Promise<ReportGetScopingQuestionsResponse>;
     list(options?: ReportListOptionalParams): PagedAsyncIterableIterator<ReportResource>;
     nestedResourceCheckNameAvailability(reportName: string, body: CheckNameAvailabilityRequest, options?: ReportNestedResourceCheckNameAvailabilityOptionalParams): Promise<ReportNestedResourceCheckNameAvailabilityResponse>;
 }
+export { Report_2 as Report }
 
 // @public
 export interface ReportComplianceStatus {
     readonly m365?: OverviewStatus;

```