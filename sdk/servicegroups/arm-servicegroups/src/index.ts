// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ServiceGroupsManagementClient } from "./serviceGroupsManagementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ServiceGroup,
  ServiceGroupProperties,
  ProvisioningState,
  ServiceGroupAttributes,
  ParentServiceGroupProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCreatedByType,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type {
  DeleteServiceGroupOptionalParams,
  UpdateServiceGroupOptionalParams,
  CreateOrUpdateServiceGroupOptionalParams,
  ServiceGroupsManagementClientOptionalParams,
} from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ServiceGroupsGetOptionalParams } from "./api/serviceGroups/index.js";
export type { OperationsOperations, ServiceGroupsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
