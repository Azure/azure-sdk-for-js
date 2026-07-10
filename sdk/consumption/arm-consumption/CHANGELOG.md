# Release History

## 10.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.0.0-beta.1 (2026-06-17)
Compared with version 9.2.0

### Features Added
  - Added operation LotsOperationsOperations.listByCustomer
  - Added operation PriceSheetOperations.downloadByBillingAccountPeriod
  - Class ConsumptionManagementClient has a new constructor "constructor(credential: TokenCredential, options?: ConsumptionManagementClientOptionalParams);"
  - Added Interface BalanceProperties
  - Added Interface BudgetProperties
  - Added Interface CreditSummaryProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface EventProperties
  - Added Interface EventsOperationsListByBillingAccountOptionalParams
  - Added Interface EventsOperationsListByBillingProfileOptionalParams
  - Added Interface ExtensionResource
  - Added Interface LegacyChargeSummaryProperties
  - Added Interface LegacyReservationTransactionProperties
  - Added Interface LegacyUsageDetailProperties
  - Added Interface LotProperties
  - Added Interface LotsOperationsListByBillingAccountOptionalParams
  - Added Interface LotsOperationsListByBillingProfileOptionalParams
  - Added Interface LotsOperationsListByCustomerOptionalParams
  - Added Interface ManagementGroupAggregatedCostProperties
  - Added Interface MarketplaceProperties
  - Added Interface ModernChargeSummaryProperties
  - Added Interface ModernReservationRecommendationProperties
  - Added Interface ModernReservationTransactionProperties
  - Added Interface ModernSharedScopeReservationRecommendationProperties
  - Added Interface ModernSingleScopeReservationRecommendationProperties
  - Added Interface ModernUsageDetailProperties
  - Added Interface Notification
  - Added Interface OperationStatus
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PriceSheetDownloadByBillingAccountPeriodOptionalParams
  - Added Interface PricesheetDownloadProperties
  - Added Interface PriceSheetModel
  - Added Interface ReservationDetailProperties
  - Added Interface ReservationRecommendationDetailsProperties
  - Added Interface ReservationSummaryProperties
  - Added Interface RestorePollerOptions
  - Added Interface SavingsPlan
  - Added Interface SystemData
  - Added Interface TagProperties
  - Interface Balance has a new optional parameter overageRefund
  - Interface Balance has a new optional parameter systemData
  - Interface Budget has a new optional parameter systemData
  - Interface ChargeSummary has a new optional parameter systemData
  - Interface CreditSummary has a new optional parameter eTagPropertiesETag
  - Interface CreditSummary has a new optional parameter isEstimatedBalance
  - Interface CreditSummary has a new optional parameter systemData
  - Interface EventSummary has a new optional parameter billingAccountDisplayName
  - Interface EventSummary has a new optional parameter billingAccountId
  - Interface EventSummary has a new optional parameter isEstimatedBalance
  - Interface EventSummary has a new optional parameter systemData
  - Interface LegacyChargeSummary has a new optional parameter azureMarketplaceCharges
  - Interface LegacyChargeSummary has a new optional parameter systemData
  - Interface LegacyReservationRecommendation has a new optional parameter systemData
  - Interface LegacyReservationRecommendationProperties has a new optional parameter lastUsageDate
  - Interface LegacyReservationRecommendationProperties has a new optional parameter totalHours
  - Interface LegacySharedScopeReservationRecommendationProperties has a new optional parameter lastUsageDate
  - Interface LegacySharedScopeReservationRecommendationProperties has a new optional parameter totalHours
  - Interface LegacySingleScopeReservationRecommendationProperties has a new optional parameter lastUsageDate
  - Interface LegacySingleScopeReservationRecommendationProperties has a new optional parameter totalHours
  - Interface LegacyUsageDetail has a new optional parameter benefitId
  - Interface LegacyUsageDetail has a new optional parameter benefitName
  - Interface LegacyUsageDetail has a new optional parameter systemData
  - Interface LotSummary has a new optional parameter isEstimatedBalance
  - Interface LotSummary has a new optional parameter organizationType
  - Interface LotSummary has a new optional parameter usedAmount
  - Interface LotSummary has a new optional parameter systemData
  - Interface ManagementGroupAggregatedCostResult has a new optional parameter systemData
  - Interface Marketplace has a new optional parameter systemData
  - Interface ModernChargeSummary has a new optional parameter subscriptionId
  - Interface ModernChargeSummary has a new optional parameter systemData
  - Interface ModernReservationRecommendation has a new optional parameter systemData
  - Interface ModernReservationTransaction has a new optional parameter systemData
  - Interface ModernUsageDetail has a new optional parameter systemData
  - Interface PriceSheetProperties has a new optional parameter savingsPlan
  - Interface PriceSheetResult has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface ReservationDetail has a new optional parameter systemData
  - Interface ReservationRecommendation has a new optional parameter systemData
  - Interface ReservationRecommendationDetailsGetOptionalParams has a new optional parameter filter
  - Interface ReservationRecommendationDetailsModel has a new optional parameter systemData
  - Interface ReservationSummary has a new optional parameter systemData
  - Interface ReservationTransaction has a new optional parameter systemData
  - Interface ReservationTransactionsListOptionalParams has a new optional parameter previewMarkupPercentage
  - Interface ReservationTransactionsListOptionalParams has a new optional parameter useMarkupIfPartner
  - Interface Resource has a new optional parameter systemData
  - Interface TagsResult has a new optional parameter systemData
  - Interface UsageDetail has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias ModernReservationRecommendationPropertiesUnion
  - Added Type Alias OperationStatusType
  - Added Type Alias OrganizationType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownOperationStatusType
  - Added Enum KnownOrganizationType
  - Added Enum KnownVersions
  - Enum KnownEventType has a new value CreditExpired
  - Enum KnownTerm has a new value P1M

### Breaking Changes
  - Operation ReservationRecommendationDetails.get has a new signature
  - Removed Interface DownloadProperties
  - Removed Interface ErrorDetails
  - Removed Interface Events
  - Removed Interface EventsListByBillingAccountOptionalParams
  - Removed Interface EventsListByBillingProfileOptionalParams
  - Removed Interface LegacyReservationTransaction
  - Removed Interface Lots
  - Removed Interface LotsListByBillingAccountOptionalParams
  - Removed Interface LotsListByBillingProfileOptionalParams
  - Removed Interface Notification_2
  - Removed Interface ReservationTransactionResource
  - Removed Interface ResourceAttributes
  - Interface LegacyReservationRecommendation has a new required parameter properties
  - Interface ModernReservationRecommendation has a new required parameter properties
  - Type of parameter scope of interface LegacyReservationRecommendationProperties is changed from "Single" | "Shared" to string
  - Interface BudgetFilter no longer has parameter not
  - Interface CreditSummary no longer has parameter etag
  - Interface LegacyChargeSummary no longer has parameter marketplaceCharges
  - Interface LegacyReservationRecommendation no longer has parameter costWithNoReservedInstances
  - Interface LegacyReservationRecommendation no longer has parameter firstUsageDate
  - Interface LegacyReservationRecommendation no longer has parameter instanceFlexibilityGroup
  - Interface LegacyReservationRecommendation no longer has parameter instanceFlexibilityRatio
  - Interface LegacyReservationRecommendation no longer has parameter lookBackPeriod
  - Interface LegacyReservationRecommendation no longer has parameter meterId
  - Interface LegacyReservationRecommendation no longer has parameter netSavings
  - Interface LegacyReservationRecommendation no longer has parameter normalizedSize
  - Interface LegacyReservationRecommendation no longer has parameter recommendedQuantity
  - Interface LegacyReservationRecommendation no longer has parameter recommendedQuantityNormalized
  - Interface LegacyReservationRecommendation no longer has parameter resourceType
  - Interface LegacyReservationRecommendation no longer has parameter scope
  - Interface LegacyReservationRecommendation no longer has parameter skuProperties
  - Interface LegacyReservationRecommendation no longer has parameter term
  - Interface LegacyReservationRecommendation no longer has parameter totalCostWithReservedInstances
  - Interface ModernReservationRecommendation no longer has parameter costWithNoReservedInstances
  - Interface ModernReservationRecommendation no longer has parameter firstUsageDate
  - Interface ModernReservationRecommendation no longer has parameter instanceFlexibilityGroup
  - Interface ModernReservationRecommendation no longer has parameter instanceFlexibilityRatio
  - Interface ModernReservationRecommendation no longer has parameter locationPropertiesLocation
  - Interface ModernReservationRecommendation no longer has parameter lookBackPeriod
  - Interface ModernReservationRecommendation no longer has parameter meterId
  - Interface ModernReservationRecommendation no longer has parameter netSavings
  - Interface ModernReservationRecommendation no longer has parameter normalizedSize
  - Interface ModernReservationRecommendation no longer has parameter recommendedQuantity
  - Interface ModernReservationRecommendation no longer has parameter recommendedQuantityNormalized
  - Interface ModernReservationRecommendation no longer has parameter scope
  - Interface ModernReservationRecommendation no longer has parameter skuName
  - Interface ModernReservationRecommendation no longer has parameter skuProperties
  - Interface ModernReservationRecommendation no longer has parameter term
  - Interface ModernReservationRecommendation no longer has parameter totalCostWithReservedInstances
  - Interface ProxyResource no longer has parameter eTag
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter tags
  - Type alias "LegacyReservationRecommendationPropertiesUnion" has been changed

    
## 9.2.0 (2023-01-03)
    
### Features Added

  - Interface EventsListByBillingAccountNextOptionalParams no longer has parameter filter
  - Interface LotsListByBillingAccountNextOptionalParams no longer has parameter filter
  - Interface MarketplacesListNextOptionalParams no longer has parameter filter
  - Interface MarketplacesListNextOptionalParams no longer has parameter skiptoken
  - Interface MarketplacesListNextOptionalParams no longer has parameter top
  - Interface ReservationRecommendationsListNextOptionalParams no longer has parameter filter
  - Interface ReservationsDetailsListNextOptionalParams no longer has parameter endDate
  - Interface ReservationsDetailsListNextOptionalParams no longer has parameter filter
  - Interface ReservationsDetailsListNextOptionalParams no longer has parameter reservationId
  - Interface ReservationsDetailsListNextOptionalParams no longer has parameter reservationOrderId
  - Interface ReservationsDetailsListNextOptionalParams no longer has parameter startDate
  - Interface ReservationsSummariesListByReservationOrderAndReservationNextOptionalParams no longer has parameter filter
  - Interface ReservationsSummariesListByReservationOrderNextOptionalParams no longer has parameter filter
  - Interface ReservationsSummariesListNextOptionalParams no longer has parameter endDate
  - Interface ReservationsSummariesListNextOptionalParams no longer has parameter filter
  - Interface ReservationsSummariesListNextOptionalParams no longer has parameter reservationId
  - Interface ReservationsSummariesListNextOptionalParams no longer has parameter reservationOrderId
  - Interface ReservationsSummariesListNextOptionalParams no longer has parameter startDate
  - Interface ReservationTransactionsListByBillingProfileNextOptionalParams no longer has parameter filter
  - Interface ReservationTransactionsListNextOptionalParams no longer has parameter filter
  - Interface UsageDetailsListNextOptionalParams no longer has parameter expand
  - Interface UsageDetailsListNextOptionalParams no longer has parameter filter
  - Interface UsageDetailsListNextOptionalParams no longer has parameter metric
  - Interface UsageDetailsListNextOptionalParams no longer has parameter skiptoken
  - Interface UsageDetailsListNextOptionalParams no longer has parameter top
    
    
## 9.1.0 (2022-09-05)
    
### Features Added

  - Added Interface AmountWithExchangeRate
  - Added Interface Balance
  - Added Interface Budget
  - Added Interface ChargeSummary
  - Added Interface CreditSummary
  - Added Interface EventSummary
  - Added Interface LegacyChargeSummary
  - Added Interface LegacyReservationRecommendation
  - Added Interface LegacyReservationTransaction
  - Added Interface LegacySharedScopeReservationRecommendationProperties
  - Added Interface LegacySingleScopeReservationRecommendationProperties
  - Added Interface LegacyUsageDetail
  - Added Interface LotSummary
  - Added Interface ManagementGroupAggregatedCostResult
  - Added Interface Marketplace
  - Added Interface ModernChargeSummary
  - Added Interface ModernReservationRecommendation
  - Added Interface ModernReservationTransaction
  - Added Interface ModernUsageDetail
  - Added Interface PriceSheetResult
  - Added Interface ReservationDetail
  - Added Interface ReservationRecommendation
  - Added Interface ReservationRecommendationDetailsModel
  - Added Interface ReservationSummary
  - Added Interface ReservationTransaction
  - Added Interface TagsResult
  - Added Interface UsageDetail
    
## 9.0.1 (2022-04-11)

### Features Added

  - bug fix

## 9.0.0 (2021-12-16)

The package of @azure/arm-consumption is using our next generation design principles since version 9.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
