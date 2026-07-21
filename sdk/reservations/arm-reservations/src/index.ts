// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureReservationAPI } from "./azureReservationAPI.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type { ProxyResource, Resource, SystemData, CreatedByType } from "./models/index.js";
export { KnownCreatedByType } from "./models/index.js";
export type {
  QuotaRequestDetails,
  QuotaRequestProperties,
  QuotaRequestState,
  SubRequest,
  ResourceName,
  ExceptionResponse,
  ServiceError,
  ServiceErrorDetail,
  CurrentQuotaLimitBase,
  QuotaProperties,
  ResourceType,
} from "./models/quota/index.js";
export { KnownQuotaRequestState, KnownResourceType } from "./models/quota/index.js";
export type {
  Catalog,
  ReservationBillingPlan,
  ReservationTerm,
  SkuProperty,
  CatalogMsrp,
  Price,
  SkuRestriction,
  SkuCapability,
  ErrorModel,
  ExtendedErrorInfo,
  ErrorResponseCode,
  AppliedReservations,
  AppliedReservationsProperties,
  AppliedReservationList,
  OperationResponse,
  OperationDisplay,
  ReservationResponse,
  ReservationsProperties,
  ReservedResourceType,
  InstanceFlexibility,
  AppliedScopeType,
  ProvisioningState,
  ExtendedStatusInfo,
  ReservationStatusCode,
  ReservationSplitProperties,
  ReservationMergeProperties,
  ReservationSwapProperties,
  AppliedScopeProperties,
  RenewPropertiesResponse,
  PurchaseRequest,
  SkuName,
  PurchaseRequestProperties,
  PurchaseRequestPropertiesReservedResourceProperties,
  RenewPropertiesResponsePricingCurrencyTotal,
  RenewPropertiesResponseBillingCurrencyTotal,
  ReservationsPropertiesUtilization,
  ReservationUtilizationAggregates,
  Patch,
  PatchProperties,
  PatchPropertiesRenewProperties,
  AvailableScopeRequest,
  AvailableScopeRequestProperties,
  AvailableScopeProperties,
  SubscriptionScopeProperties,
  ScopeProperties,
  SplitRequest,
  SplitProperties,
  MergeRequest,
  MergeProperties,
  ReservationSummary,
  ErrorResponse,
  ErrorDetails,
  ReservationOrderResponse,
  ReservationOrderProperties,
  ReservationOrderBillingPlanInformation,
  PaymentDetail,
  PaymentStatus,
  ChangeDirectoryRequest,
  ChangeDirectoryResponse,
  ChangeDirectoryResult,
  CalculatePriceResponse,
  CalculatePriceResponseProperties,
  CalculatePriceResponsePropertiesBillingCurrencyTotal,
  CalculatePriceResponsePropertiesPricingCurrencyTotal,
  CalculateRefundRequest,
  CalculateRefundRequestProperties,
  ReservationToReturn,
  CalculateRefundResponse,
  RefundResponseProperties,
  RefundPolicyResult,
  RefundPolicyResultProperty,
  RefundPolicyError,
  RefundBillingInformation,
  RefundRequest,
  RefundRequestProperties,
  CalculateExchangeRequest,
  CalculateExchangeRequestProperties,
  SavingsPlanPurchaseRequest,
  SavingsPlanPurchaseRequestProperties,
  SavingsPlanTerm,
  BillingPlan,
  Commitment,
  CommitmentGrain,
  CalculateExchangeOperationResultResponse,
  CalculateExchangeOperationResultStatus,
  CalculateExchangeResponseProperties,
  ReservationToPurchaseCalculateExchange,
  SavingsPlanToPurchaseCalculateExchange,
  ReservationToExchange,
  BillingInformation,
  ExchangePolicyErrors,
  ExchangePolicyError,
  OperationResultError,
  ExchangeRequest,
  ExchangeRequestProperties,
  ExchangeOperationResultResponse,
  ExchangeOperationResultStatus,
  ExchangeResponseProperties,
  ReservationToPurchaseExchange,
  OperationStatus,
  SavingsPlanToPurchaseExchange,
  ReservationToReturnForExchange,
} from "./models/reservations/index.js";
export {
  KnownReservationBillingPlan,
  KnownReservationTerm,
  KnownErrorResponseCode,
  KnownReservedResourceType,
  KnownInstanceFlexibility,
  KnownAppliedScopeType,
  KnownProvisioningState,
  KnownReservationStatusCode,
  KnownPaymentStatus,
  KnownSavingsPlanTerm,
  KnownBillingPlan,
  KnownCommitmentGrain,
  KnownCalculateExchangeOperationResultStatus,
  KnownExchangeOperationResultStatus,
  KnownOperationStatus,
} from "./models/reservations/index.js";
export type {
  AzureReservationAPIOptionalParams,
  GetAppliedReservationListOptionalParams,
  GetCatalogOptionalParams,
} from "./api/index.js";
export type { CalculateExchangePostOptionalParams } from "./api/calculateExchange/index.js";
export type { CalculateRefundPostOptionalParams } from "./api/calculateRefund/index.js";
export type { ExchangePostOptionalParams } from "./api/exchange/index.js";
export type { OperationListOptionalParams } from "./api/operation/index.js";
export type {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "./api/quota/index.js";
export type {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "./api/quotaRequestStatus/index.js";
export type {
  ReservationListAllOptionalParams,
  ReservationMergeOptionalParams,
  ReservationSplitOptionalParams,
  ReservationListRevisionsOptionalParams,
  ReservationUnarchiveOptionalParams,
  ReservationArchiveOptionalParams,
  ReservationAvailableScopesOptionalParams,
  ReservationListOptionalParams,
  ReservationUpdateOptionalParams,
  ReservationGetOptionalParams,
} from "./api/reservation/index.js";
export type {
  ReservationOrderCalculateOptionalParams,
  ReservationOrderChangeDirectoryOptionalParams,
  ReservationOrderListOptionalParams,
  ReservationOrderPurchaseOptionalParams,
  ReservationOrderGetOptionalParams,
} from "./api/reservationOrder/index.js";
export type { ReturnPostOptionalParams } from "./api/return/index.js";
export type {
  CalculateExchangeOperations,
  CalculateRefundOperations,
  ExchangeOperations,
  OperationOperations,
  QuotaOperations,
  QuotaRequestStatusOperations,
  ReservationOperations,
  ReservationOrderOperations,
  ReturnOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
