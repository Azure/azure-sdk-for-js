// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ApiManagementClient } from "./apiManagementClient.js";
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
  AiGatewayResource,
  AiGatewayProperties,
  AiGatewayProvisioningState,
  AiGatewayFrontend,
  AiGatewayBackend,
  AiGatewaySubnet,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Sku,
  SkuTier,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  AiGatewayUpdateParameters,
  AiGatewaySkuUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAiGatewayProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ApiManagementClientOptionalParams } from "./api/index.js";
export type {
  AiGatewayResourcesListBySubscriptionOptionalParams,
  AiGatewayResourcesListByResourceGroupOptionalParams,
  AiGatewayResourcesDeleteOptionalParams,
  AiGatewayResourcesUpdateOptionalParams,
  AiGatewayResourcesCreateOrUpdateOptionalParams,
  AiGatewayResourcesGetOptionalParams,
} from "./api/aiGatewayResources/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { AiGatewayResourcesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
