// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HanaManagementClient } from "./hanaManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  Display,
  ErrorResponse,
  ErrorResponseError,
  SapMonitor,
  SapMonitorProperties,
  HanaProvisioningStatesEnum,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  Tags,
  ProviderInstance,
  ProviderInstanceProperties,
  ProxyResource,
} from "./models/index.js";
export {
  KnownHanaProvisioningStatesEnum,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { HanaManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProviderInstancesListOptionalParams,
  ProviderInstancesDeleteOptionalParams,
  ProviderInstancesCreateOptionalParams,
  ProviderInstancesGetOptionalParams,
} from "./api/providerInstances/index.js";
export type {
  SapMonitorsListOptionalParams,
  SapMonitorsDeleteOptionalParams,
  SapMonitorsUpdateOptionalParams,
  SapMonitorsCreateOptionalParams,
  SapMonitorsGetOptionalParams,
} from "./api/sapMonitors/index.js";
export type {
  OperationsOperations,
  ProviderInstancesOperations,
  SapMonitorsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
