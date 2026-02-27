// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ProgrammableConnectivityClient } from "./programmableConnectivityClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type Gateway,
  type GatewayProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type GatewayTagsUpdate,
  type OperatorApiConnection,
  type OperatorApiConnectionProperties,
  type SaasProperties,
  type ApplicationProperties,
  KnownAccountType,
  type AccountType,
  type Status,
  type OperatorApiConnectionUpdate,
  type OperatorApiConnectionUpdateProperties,
  type OperatorApiPlan,
  type OperatorApiPlanProperties,
  type MarketplaceProperties,
  type ProxyResource,
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
