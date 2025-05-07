// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ProgrammableConnectivityClient } from "./programmableConnectivityClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Gateway,
  GatewayProperties,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  GatewayTagsUpdate,
  OperatorApiConnection,
  OperatorApiConnectionProperties,
  SaasProperties,
  ApplicationProperties,
  KnownAccountType,
  AccountType,
  Status,
  OperatorApiConnectionUpdate,
  OperatorApiConnectionUpdateProperties,
  OperatorApiPlan,
  OperatorApiPlanProperties,
  MarketplaceProperties,
  ProxyResource,
  KnownVersions,
} from "./models/index.js";
export { ProgrammableConnectivityClientOptionalParams } from "./api/index.js";
export {
  GatewaysListBySubscriptionOptionalParams,
  GatewaysListByResourceGroupOptionalParams,
  GatewaysDeleteOptionalParams,
  GatewaysUpdateOptionalParams,
  GatewaysCreateOrUpdateOptionalParams,
  GatewaysGetOptionalParams,
} from "./api/gateways/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  OperatorApiConnectionsListBySubscriptionOptionalParams,
  OperatorApiConnectionsListByResourceGroupOptionalParams,
  OperatorApiConnectionsDeleteOptionalParams,
  OperatorApiConnectionsUpdateOptionalParams,
  OperatorApiConnectionsCreateOptionalParams,
  OperatorApiConnectionsGetOptionalParams,
} from "./api/operatorApiConnections/index.js";
export {
  OperatorApiPlansListBySubscriptionOptionalParams,
  OperatorApiPlansGetOptionalParams,
} from "./api/operatorApiPlans/index.js";
export {
  GatewaysOperations,
  OperationsOperations,
  OperatorApiConnectionsOperations,
  OperatorApiPlansOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
