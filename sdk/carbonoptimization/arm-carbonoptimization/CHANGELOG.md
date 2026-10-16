# Release History

## 2.0.0-beta.1 (2026-10-16)
Compared with version 1.0.0

### Features Added
  - Added operation CarbonServiceOperations.queryCarbonEmissionReportsByBillingAccount
  - Added Interface BillingAccountItemDetailsReportQueryFilter
  - Added Interface BillingAccountMonthlySummaryReportQueryFilter
  - Added Interface BillingAccountOverallSummaryReportQueryFilter
  - Added Interface BillingAccountQueryFilter
  - Added Interface BillingAccountTopItemsMonthlySummaryReportQueryFilter
  - Added Interface BillingAccountTopItemsSummaryReportQueryFilter
  - Added Interface CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams
  - Interface CarbonOptimizationManagementClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias BillingAccountCategoryTypeEnum
  - Added Type Alias BillingAccountOrderByColumnEnum
  - Added Type Alias BillingAccountQueryFilterUnion
  - Added Enum AzureClouds
  - Added Enum KnownBillingAccountCategoryTypeEnum
  - Added Enum KnownBillingAccountOrderByColumnEnum
  - Enum KnownVersions has a new value V20260501Preview

### Breaking Changes
  - Operation CarbonServiceOperations.queryCarbonEmissionReports has a new signature
  - Type of parameter end of interface DateRange is changed from string to Date
  - Type of parameter start of interface DateRange is changed from string to Date

    
## 1.0.0 (2025-07-11)

### Features Added

This is the first stable version with the package of @azure/arm-carbonoptimization
