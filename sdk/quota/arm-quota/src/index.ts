// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureQuotaExtensionAPI } from "./azureQuotaExtensionAPI.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  OperationResponse,
  OperationDisplay,
  ExceptionResponse,
  ServiceError,
  ServiceErrorDetail,
  QuotaRequestDetails,
  QuotaRequestProperties,
  KnownQuotaRequestState,
  QuotaRequestState,
  SubRequest,
  ResourceName,
  LimitJsonObject,
  LimitJsonObjectUnion,
  KnownLimitType,
  LimitType,
  LimitObject,
  KnownQuotaLimitTypes,
  QuotaLimitTypes,
  ExtensionResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  GroupQuotasEntity,
  GroupQuotasEntityProperties,
  GroupQuotasEntityBase,
  KnownGroupType,
  GroupType,
  KnownRequestState,
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
  KnownEnforcementState,
  EnforcementState,
  CurrentUsagesBase,
  UsagesProperties,
  UsagesObject,
  KnownUsagesTypes,
  UsagesTypes,
  CurrentQuotaLimitBase,
  QuotaProperties,
  KnownVersions,
} from "./models/index.js";
export { AzureQuotaExtensionAPIOptionalParams } from "./api/index.js";
export { GroupQuotaLimitsListOptionalParams } from "./api/groupQuotaLimits/index.js";
export {
  GroupQuotaLimitsRequestGetOptionalParams,
  GroupQuotaLimitsRequestUpdateOptionalParams,
  GroupQuotaLimitsRequestListOptionalParams,
} from "./api/groupQuotaLimitsRequest/index.js";
export {
  GroupQuotaLocationSettingsUpdateOptionalParams,
  GroupQuotaLocationSettingsCreateOrUpdateOptionalParams,
  GroupQuotaLocationSettingsGetOptionalParams,
} from "./api/groupQuotaLocationSettings/index.js";
export {
  GroupQuotasListOptionalParams,
  GroupQuotasDeleteOptionalParams,
  GroupQuotasUpdateOptionalParams,
  GroupQuotasCreateOrUpdateOptionalParams,
  GroupQuotasGetOptionalParams,
} from "./api/groupQuotas/index.js";
export { GroupQuotaSubscriptionAllocationListOptionalParams } from "./api/groupQuotaSubscriptionAllocation/index.js";
export {
  GroupQuotaSubscriptionAllocationRequestListOptionalParams,
  GroupQuotaSubscriptionAllocationRequestGetOptionalParams,
  GroupQuotaSubscriptionAllocationRequestUpdateOptionalParams,
} from "./api/groupQuotaSubscriptionAllocationRequest/index.js";
export {
  GroupQuotaSubscriptionRequestsListOptionalParams,
  GroupQuotaSubscriptionRequestsGetOptionalParams,
} from "./api/groupQuotaSubscriptionRequests/index.js";
export {
  GroupQuotaSubscriptionsListOptionalParams,
  GroupQuotaSubscriptionsDeleteOptionalParams,
  GroupQuotaSubscriptionsUpdateOptionalParams,
  GroupQuotaSubscriptionsCreateOrUpdateOptionalParams,
  GroupQuotaSubscriptionsGetOptionalParams,
} from "./api/groupQuotaSubscriptions/index.js";
export { GroupQuotaUsagesListOptionalParams } from "./api/groupQuotaUsages/index.js";
export {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "./api/quota/index.js";
export { QuotaOperationListOptionalParams } from "./api/quotaOperation/index.js";
export {
  QuotaRequestStatusListOptionalParams,
  QuotaRequestStatusGetOptionalParams,
} from "./api/quotaRequestStatus/index.js";
export { UsagesListOptionalParams, UsagesGetOptionalParams } from "./api/usages/index.js";
export {
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
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
