// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SubscriptionClient } from "./subscriptionClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  TargetDirectoryResult,
  TargetDirectoryResultProperties,
  ChangeDirectoryOperationStatus,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  TargetDirectoryRequest,
  TargetDirectoryRequestProperties,
  SubscriptionAliasResponse,
  SubscriptionAliasResponseProperties,
  ProvisioningState,
  AcceptOwnership,
  Workload,
  PutAliasRequest,
  PutAliasRequestProperties,
  PutAliasRequestAdditionalProperties,
  GetTenantPolicyResponse,
  TenantPolicy,
  PutTenantPolicyRequestProperties,
  BillingAccountPoliciesResponse,
  BillingAccountPoliciesResponseProperties,
  ServiceTenantResponse,
  CanceledSubscriptionId,
  SubscriptionName,
  RenamedSubscriptionId,
  EnabledSubscriptionId,
  AcceptOwnershipRequest,
  AcceptOwnershipRequestProperties,
  AcceptOwnershipStatusResponse,
  Provisioning,
  SubscriptionCreationResult,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownChangeDirectoryOperationStatus,
  KnownCreatedByType,
  KnownProvisioningState,
  KnownAcceptOwnership,
  KnownWorkload,
  KnownProvisioning,
  KnownVersions,
} from "./models/index.js";
export type { SubscriptionClientOptionalParams } from "./api/index.js";
export type {
  AliasListOptionalParams,
  AliasDeleteOptionalParams,
  AliasCreateOptionalParams,
  AliasGetOptionalParams,
} from "./api/alias/index.js";
export type { BillingAccountGetPolicyOptionalParams } from "./api/billingAccount/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SubscriptionAcceptOwnershipStatusOptionalParams,
  SubscriptionAcceptOwnershipOptionalParams,
  SubscriptionEnableOptionalParams,
  SubscriptionRenameOptionalParams,
  SubscriptionCancelOptionalParams,
} from "./api/subscription/index.js";
export type { SubscriptionOperationGetOptionalParams } from "./api/subscriptionOperation/index.js";
export type {
  SubscriptionPolicyListPolicyForTenantOptionalParams,
  SubscriptionPolicyAddUpdatePolicyForTenantOptionalParams,
  SubscriptionPolicyGetPolicyForTenantOptionalParams,
} from "./api/subscriptionPolicy/index.js";
export type {
  SubscriptionsTargetDirectoryStatusOptionalParams,
  SubscriptionsAcceptTargetDirectoryOptionalParams,
  SubscriptionsListTargetDirectoryOptionalParams,
  SubscriptionsDeleteTargetDirectoryOptionalParams,
  SubscriptionsPutTargetDirectoryOptionalParams,
  SubscriptionsGetTargetDirectoryOptionalParams,
} from "./api/subscriptions/index.js";
export type {
  AliasOperations,
  BillingAccountOperations,
  OperationsOperations,
  SubscriptionOperations,
  SubscriptionOperationOperations,
  SubscriptionPolicyOperations,
  SubscriptionsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
