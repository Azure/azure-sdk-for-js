// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureQuotaExtensionAPI } from "./azureQuotaExtensionAPI.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  OperationResponse,
  OperationDisplay,
  ExceptionResponse,
  ServiceError,
  ServiceErrorDetail,
  QuotaRequestDetails,
  QuotaRequestProperties,
  QuotaRequestState,
  SubRequest,
  ResourceName,
  LimitJsonObject,
  LimitJsonObjectUnion,
  LimitType,
  LimitObject,
  QuotaLimitTypes,
  ExtensionResource,
  Resource,
  SystemData,
  CreatedByType,
  GroupQuotasEntity,
  GroupQuotasEntityProperties,
  GroupQuotasEntityBase,
  GroupType,
  RequestState,
  ProxyResource,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  GroupQuotasEntityPatch,
  GroupQuotasEntityPatchProperties,
  GroupQuotasEntityBasePatch,
  SubmittedResourceRequestStatus,
  SubmittedResourceRequestStatusProperties,
  GroupQuotaRequestBase,
  GroupQuotaRequestBaseProperties,
  GroupQuotaRequestBasePropertiesName,
  GroupQuotaLimitList,
  GroupQuotaLimitListProperties,
  GroupQuotaLimit,
  GroupQuotaLimitProperties,
  GroupQuotaDetails,
  GroupQuotaDetailsName,
  AllocatedQuotaToSubscriptionList,
  AllocatedToSubscription,
  ResourceUsages,
  GroupQuotaUsagesBase,
  GroupQuotaUsagesBaseName,
  GroupQuotaSubscriptionId,
  GroupQuotaSubscriptionIdProperties,
  GroupQuotaSubscriptionRequestStatus,
  GroupQuotaSubscriptionRequestStatusProperties,
  SubscriptionQuotaAllocationsList,
  SubscriptionQuotaAllocationsListProperties,
  SubscriptionQuotaAllocations,
  SubscriptionQuotaAllocationsProperties,
  SubscriptionQuotaDetails,
  SubscriptionQuotaDetailsName,
  QuotaAllocationRequestStatus,
  QuotaAllocationRequestStatusProperties,
  QuotaAllocationRequestBase,
  QuotaAllocationRequestBaseProperties,
  QuotaAllocationRequestBasePropertiesName,
  GroupQuotasEnforcementStatus,
  GroupQuotasEnforcementStatusProperties,
  EnforcementState,
  CurrentUsagesBase,
  UsagesProperties,
  UsagesObject,
  UsagesTypes,
  CurrentQuotaLimitBase,
  QuotaProperties,
} from "./models/index.js";
export {
  KnownQuotaRequestState,
  KnownLimitType,
  KnownQuotaLimitTypes,
  KnownCreatedByType,
  KnownGroupType,
  KnownRequestState,
  KnownEnforcementState,
  KnownUsagesTypes,
  KnownVersions,
} from "./models/index.js";
export type { AzureQuotaExtensionAPIOptionalParams } from "./api/index.js";
export type { GroupQuotaLimitsListOptionalParams } from "./api/groupQuotaLimits/index.js";
export type {
  GroupQuotaLimitsRequestGetOptionalParams,
  GroupQuotaLimitsRequestUpdateOptionalParams,
  GroupQuotaLimitsRequestListOptionalParams,
} from "./api/groupQuotaLimitsRequest/index.js";
export type {
  GroupQuotaLocationSettingsUpdateOptionalParams,
  GroupQuotaLocationSettingsCreateOrUpdateOptionalParams,
  GroupQuotaLocationSettingsGetOptionalParams,
} from "./api/groupQuotaLocationSettings/index.js";
export type {
  GroupQuotasListOptionalParams,
  GroupQuotasDeleteOptionalParams,
  GroupQuotasUpdateOptionalParams,
  GroupQuotasCreateOrUpdateOptionalParams,
  GroupQuotasGetOptionalParams,
} from "./api/groupQuotas/index.js";
export type { GroupQuotaSubscriptionAllocationListOptionalParams } from "./api/groupQuotaSubscriptionAllocation/index.js";
export type {
  GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
} from "./api/groupQuotaSubscriptionAllocationRequest/index.js";
export type {
  GroupQuotaSubscriptionRequestsListOptionalParams,
  GroupQuotaSubscriptionRequestsGetOptionalParams,
} from "./api/groupQuotaSubscriptionRequests/index.js";
export type {
  GroupQuotaSubscriptionsListOptionalParams,
  GroupQuotaSubscriptionsDeleteOptionalParams,
  GroupQuotaSubscriptionsUpdateOptionalParams,
  GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
  GroupQuotaSubscriptionsGetOptionalParams,
} from "./api/groupQuotaSubscriptions/index.js";
export type { GroupQuotaUsagesListOptionalParams } from "./api/groupQuotaUsages/index.js";
export type {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "./api/quota/index.js";
export type { QuotaOperationListOptionalParams } from "./api/quotaOperation/index.js";
export type {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "./api/quotaRequestStatus/index.js";
export type { UsagesListOptionalParams, UsagesGetOptionalParams } from "./api/usages/index.js";
export type {
  GroupQuotaLimitsOperations,
  GroupQuotaLimitsRequestOperations,
  GroupQuotaLocationSettingsOperations,
  GroupQuotasOperations,
  GroupQuotaSubscriptionAllocationOperations,
  GroupQuotaSubscriptionAllocationRequestOperations,
  GroupQuotaSubscriptionRequestsOperations,
  GroupQuotaSubscriptionsOperations,
  GroupQuotaUsagesOperations,
  QuotaOperations,
  QuotaOperationOperations,
  QuotaRequestStatusOperations,
  UsagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
