// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ConsumptionManagementClient } from "./consumptionManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  PriceSheetResult,
  PriceSheetModel,
  PriceSheetProperties,
  MeterDetails,
  SavingsPlan,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  OperationStatus,
  OperationStatusType,
  PricesheetDownloadProperties,
  Budget,
  BudgetProperties,
  CategoryType,
  TimeGrainType,
  BudgetTimePeriod,
  BudgetFilter,
  BudgetFilterProperties,
  BudgetComparisonExpression,
  BudgetOperatorType,
  CurrentSpend,
  Notification,
  OperatorType,
  ThresholdType,
  CultureCode,
  ForecastSpend,
  ExtensionResource,
  CreditSummary,
  CreditSummaryProperties,
  CreditBalanceSummary,
  Amount,
  AmountWithExchangeRate,
  Reseller,
  UsageDetail,
  UsageDetailUnion,
  UsageDetailsKind,
  LegacyUsageDetail,
  LegacyUsageDetailProperties,
  MeterDetailsResponse,
  PricingModelType,
  ModernUsageDetail,
  ModernUsageDetailProperties,
  Marketplace,
  MarketplaceProperties,
  TagsResult,
  TagProperties,
  Tag,
  ChargesListResult,
  ChargeSummary,
  ChargeSummaryUnion,
  ChargeSummaryKind,
  LegacyChargeSummary,
  LegacyChargeSummaryProperties,
  ModernChargeSummary,
  ModernChargeSummaryProperties,
  Balance,
  BalanceProperties,
  BillingFrequency,
  BalancePropertiesNewPurchasesDetailsItem,
  BalancePropertiesAdjustmentDetailsItem,
  ReservationSummary,
  ReservationSummaryProperties,
  ReservationDetail,
  ReservationDetailProperties,
  ReservationRecommendation,
  ReservationRecommendationUnion,
  ReservationRecommendationKind,
  LegacyReservationRecommendation,
  LegacyReservationRecommendationProperties,
  LegacyReservationRecommendationPropertiesUnion,
  SkuProperty,
  LegacySingleScopeReservationRecommendationProperties,
  LegacySharedScopeReservationRecommendationProperties,
  ModernReservationRecommendation,
  ModernReservationRecommendationProperties,
  ModernReservationRecommendationPropertiesUnion,
  ModernSingleScopeReservationRecommendationProperties,
  ModernSharedScopeReservationRecommendationProperties,
  ReservationRecommendationDetailsModel,
  ReservationRecommendationDetailsProperties,
  ReservationRecommendationDetailsResourceProperties,
  ReservationRecommendationDetailsSavingsProperties,
  ReservationRecommendationDetailsCalculatedSavingsProperties,
  ReservationRecommendationDetailsUsageProperties,
  HighCasedErrorResponse,
  HighCasedErrorDetails,
  ReservationTransaction,
  LegacyReservationTransactionProperties,
  ModernReservationTransaction,
  ModernReservationTransactionProperties,
  ManagementGroupAggregatedCostResult,
  ManagementGroupAggregatedCostProperties,
  EventSummary,
  EventProperties,
  EventType,
  LotSummary,
  LotProperties,
  LotSource,
  Status,
  OrganizationType,
  Metrictype,
  Datagrain,
  Scope,
  Term,
  LookBackPeriod,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownOperationStatusType,
  KnownCategoryType,
  KnownTimeGrainType,
  KnownBudgetOperatorType,
  KnownOperatorType,
  KnownThresholdType,
  KnownCultureCode,
  KnownUsageDetailsKind,
  KnownPricingModelType,
  KnownChargeSummaryKind,
  KnownBillingFrequency,
  KnownReservationRecommendationKind,
  KnownEventType,
  KnownLotSource,
  KnownStatus,
  KnownOrganizationType,
  KnownMetrictype,
  KnownDatagrain,
  KnownScope,
  KnownTerm,
  KnownLookBackPeriod,
  KnownVersions,
} from "./models/index.js";
export type { ConsumptionManagementClientOptionalParams } from "./api/index.js";
export type {
  AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
  AggregatedCostGetByManagementGroupOptionalParams,
} from "./api/aggregatedCost/index.js";
export type {
  BalancesGetForBillingPeriodByBillingAccountOptionalParams,
  BalancesGetByBillingAccountOptionalParams,
} from "./api/balances/index.js";
export type {
  BudgetsListOptionalParams,
  BudgetsDeleteOptionalParams,
  BudgetsCreateOrUpdateOptionalParams,
  BudgetsGetOptionalParams,
} from "./api/budgets/index.js";
export type { ChargesListOptionalParams } from "./api/charges/index.js";
export type { CreditsGetOptionalParams } from "./api/credits/index.js";
export type {
  EventsListByBillingAccountOptionalParams,
  EventsListByBillingProfileOptionalParams,
} from "./api/events/index.js";
export type {
  LotsListByCustomerOptionalParams,
  LotsListByBillingAccountOptionalParams,
  LotsListByBillingProfileOptionalParams,
} from "./api/lots/index.js";
export type { MarketplacesListOptionalParams } from "./api/marketplaces/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PriceSheetDownloadByBillingAccountPeriodOptionalParams,
  PriceSheetGetOptionalParams,
  PriceSheetGetByBillingPeriodOptionalParams,
} from "./api/priceSheet/index.js";
export type { ReservationRecommendationDetailsGetOptionalParams } from "./api/reservationRecommendationDetails/index.js";
export type { ReservationRecommendationsListOptionalParams } from "./api/reservationRecommendations/index.js";
export type {
  ReservationsDetailsListOptionalParams,
  ReservationsDetailsListByReservationOrderAndReservationOptionalParams,
  ReservationsDetailsListByReservationOrderOptionalParams,
} from "./api/reservationsDetails/index.js";
export type {
  ReservationsSummariesListOptionalParams,
  ReservationsSummariesListByReservationOrderAndReservationOptionalParams,
  ReservationsSummariesListByReservationOrderOptionalParams,
} from "./api/reservationsSummaries/index.js";
export type {
  ReservationTransactionsListByBillingProfileOptionalParams,
  ReservationTransactionsListOptionalParams,
} from "./api/reservationTransactions/index.js";
export type { TagsGetOptionalParams } from "./api/tags/index.js";
export type { UsageDetailsListOptionalParams } from "./api/usageDetails/index.js";
export type {
  AggregatedCostOperations,
  BalancesOperations,
  BudgetsOperations,
  ChargesOperations,
  CreditsOperations,
  EventsOperations,
  LotsOperations,
  MarketplacesOperations,
  OperationsOperations,
  PriceSheetOperations,
  ReservationRecommendationDetailsOperations,
  ReservationRecommendationsOperations,
  ReservationsDetailsOperations,
  ReservationsSummariesOperations,
  ReservationTransactionsOperations,
  TagsOperations,
  UsageDetailsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
