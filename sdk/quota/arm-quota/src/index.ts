// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureQuotaExtensionAPI } from "./azureQuotaExtensionAPI.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type OperationResponse,
  type OperationDisplay,
  type ExceptionResponse,
  type ServiceError,
  type ServiceErrorDetail,
  type QuotaRequestDetails,
  type QuotaRequestProperties,
  KnownQuotaRequestState,
  type QuotaRequestState,
  type SubRequest,
  type ResourceName,
  type LimitJsonObject,
  type LimitJsonObjectUnion,
  KnownLimitType,
  type LimitType,
  type LimitObject,
  KnownQuotaLimitTypes,
  type QuotaLimitTypes,
  type ExtensionResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type GroupQuotasEntity,
  type GroupQuotasEntityProperties,
  type GroupQuotasEntityBase,
  KnownGroupType,
  type GroupType,
  KnownRequestState,
  type RequestState,
  type ProxyResource,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type GroupQuotasEntityPatch,
  type GroupQuotasEntityPatchProperties,
  type GroupQuotasEntityBasePatch,
  type SubmittedResourceRequestStatus,
  type SubmittedResourceRequestStatusProperties,
  type GroupQuotaRequestBase,
  type GroupQuotaRequestBaseProperties,
  type GroupQuotaRequestBasePropertiesName,
  type GroupQuotaLimitList,
  type GroupQuotaLimitListProperties,
  type GroupQuotaLimit,
  type GroupQuotaLimitProperties,
  type GroupQuotaDetails,
  type GroupQuotaDetailsName,
  type AllocatedQuotaToSubscriptionList,
  type AllocatedToSubscription,
  type ResourceUsages,
  type GroupQuotaUsagesBase,
  type GroupQuotaUsagesBaseName,
  type GroupQuotaSubscriptionId,
  type GroupQuotaSubscriptionIdProperties,
  type GroupQuotaSubscriptionRequestStatus,
  type GroupQuotaSubscriptionRequestStatusProperties,
  type SubscriptionQuotaAllocationsList,
  type SubscriptionQuotaAllocationsListProperties,
  type SubscriptionQuotaAllocations,
  type SubscriptionQuotaAllocationsProperties,
  type SubscriptionQuotaDetails,
  type SubscriptionQuotaDetailsName,
  type QuotaAllocationRequestStatus,
  type QuotaAllocationRequestStatusProperties,
  type QuotaAllocationRequestBase,
  type QuotaAllocationRequestBaseProperties,
  type QuotaAllocationRequestBasePropertiesName,
  type GroupQuotasEnforcementStatus,
  type GroupQuotasEnforcementStatusProperties,
  KnownEnforcementState,
  type EnforcementState,
  type CurrentUsagesBase,
  type UsagesProperties,
  type UsagesObject,
  KnownUsagesTypes,
  type UsagesTypes,
  type CurrentQuotaLimitBase,
  type QuotaProperties,
  KnownVersions,
} from "./models/index.js";
export { type AzureQuotaExtensionAPIOptionalParams } from "./api/index.js";
export { type GroupQuotaLimitsListOptionalParams } from "./api/groupQuotaLimits/index.js";
export {
  type GroupQuotaLimitsRequestGetOptionalParams,
  type GroupQuotaLimitsRequestUpdateOptionalParams,
  type GroupQuotaLimitsRequestListOptionalParams,
} from "./api/groupQuotaLimitsRequest/index.js";
export {
  type GroupQuotaLocationSettingsUpdateOptionalParams,
  type GroupQuotaLocationSettingsCreateOrUpdateOptionalParams,
  type GroupQuotaLocationSettingsGetOptionalParams,
} from "./api/groupQuotaLocationSettings/index.js";
export {
  type GroupQuotasListOptionalParams,
  type GroupQuotasDeleteOptionalParams,
  type GroupQuotasUpdateOptionalParams,
  type GroupQuotasCreateOrUpdateOptionalParams,
  type GroupQuotasGetOptionalParams,
} from "./api/groupQuotas/index.js";
export { type GroupQuotaSubscriptionAllocationListOptionalParams } from "./api/groupQuotaSubscriptionAllocation/index.js";
export {
  type GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  type GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  type GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
} from "./api/groupQuotaSubscriptionAllocationRequest/index.js";
export {
  type GroupQuotaSubscriptionRequestsListOptionalParams,
  type GroupQuotaSubscriptionRequestsGetOptionalParams,
} from "./api/groupQuotaSubscriptionRequests/index.js";
export {
  type GroupQuotaSubscriptionsListOptionalParams,
  type GroupQuotaSubscriptionsDeleteOptionalParams,
  type GroupQuotaSubscriptionsUpdateOptionalParams,
  type GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
  type GroupQuotaSubscriptionsGetOptionalParams,
} from "./api/groupQuotaSubscriptions/index.js";
export { type GroupQuotaUsagesListOptionalParams } from "./api/groupQuotaUsages/index.js";
export {
  type QuotaListOptionalParams,
  type QuotaUpdateOptionalParams,
  type QuotaCreateOrUpdateOptionalParams,
  type QuotaGetOptionalParams,
} from "./api/quota/index.js";
export { type QuotaOperationListOptionalParams } from "./api/quotaOperation/index.js";
export {
  type QuotaRequestStatusListOptionalParams,
  type QuotaRequestStatusGetOptionalParams,
} from "./api/quotaRequestStatus/index.js";
export { type UsagesListOptionalParams, type UsagesGetOptionalParams } from "./api/usages/index.js";
export {
  type GroupQuotaLimitsOperations,
  type GroupQuotaLimitsRequestOperations,
  type GroupQuotaLocationSettingsOperations,
  type GroupQuotasOperations,
  type GroupQuotaSubscriptionAllocationOperations,
  type GroupQuotaSubscriptionAllocationRequestOperations,
  type GroupQuotaSubscriptionRequestsOperations,
  type GroupQuotaSubscriptionsOperations,
  type GroupQuotaUsagesOperations,
  type QuotaOperations,
  type QuotaOperationOperations,
  type QuotaRequestStatusOperations,
  type UsagesOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
