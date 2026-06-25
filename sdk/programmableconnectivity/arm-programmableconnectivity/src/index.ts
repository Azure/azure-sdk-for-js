// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ProgrammableConnectivityClient } from "./programmableConnectivityClient.js";
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
  Gateway,
  GatewayProperties,
  ProvisioningState,
  ApplicationProperties,
  Category,
  ApplicationOwnerProperties,
  OrganizationType,
  Person,
  GeographicAddress,
  LocalRepresentative,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  GatewayTagsUpdate,
  OperatorApiConnection,
  OperatorApiConnectionProperties,
  Status,
  Purpose,
  DataProcessing,
  ProcessingOperation,
  Context,
  Duration,
  Frequency,
  DataRegions,
  OperatorApiConnectionUpdate,
  OperatorApiConnectionUpdateProperties,
  OperatorApiPlan,
  OperatorApiPlanProperties,
  MarketplaceProperties,
  ProxyResource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCategory,
  KnownOrganizationType,
  KnownCreatedByType,
  KnownPurpose,
  KnownProcessingOperation,
  KnownContext,
  KnownDuration,
  KnownFrequency,
  KnownVersions,
} from "./models/index.js";
export type { ProgrammableConnectivityClientOptionalParams } from "./api/index.js";
export type {
  GatewaysListBySubscriptionOptionalParams,
  GatewaysListByResourceGroupOptionalParams,
  GatewaysDeleteOptionalParams,
  GatewaysUpdateOptionalParams,
  GatewaysCreateOrUpdateOptionalParams,
  GatewaysGetOptionalParams,
} from "./api/gateways/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OperatorApiConnectionsListBySubscriptionOptionalParams,
  OperatorApiConnectionsListByResourceGroupOptionalParams,
  OperatorApiConnectionsDeleteOptionalParams,
  OperatorApiConnectionsUpdateOptionalParams,
  OperatorApiConnectionsCreateOptionalParams,
  OperatorApiConnectionsGetOptionalParams,
} from "./api/operatorApiConnections/index.js";
export type {
  OperatorApiPlansListBySubscriptionOptionalParams,
  OperatorApiPlansGetOptionalParams,
} from "./api/operatorApiPlans/index.js";
export type {
  GatewaysOperations,
  OperationsOperations,
  OperatorApiConnectionsOperations,
  OperatorApiPlansOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
