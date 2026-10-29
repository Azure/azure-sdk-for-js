// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NetworkClient } from "./networkClient.js";
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
  AzureServiceConnectionController,
  AzureServiceConnectionControllerProperties,
  IpConfiguration,
  IPAllocationMethod,
  ProviderConnectionProperties,
  ManagedOnBehalfOfConfiguration,
  MoboBrokerResource,
  AzureServiceConnectionControllerProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  AzureServiceConnectionControllerTagsUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownIPAllocationMethod,
  KnownAzureServiceConnectionControllerProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { NetworkClientOptionalParams } from "./api/index.js";
export type {
  AzureServiceConnectionControllersListBySubscriptionOptionalParams,
  AzureServiceConnectionControllersListByResourceGroupOptionalParams,
  AzureServiceConnectionControllersUpdateOptionalParams,
  AzureServiceConnectionControllersDeleteOptionalParams,
  AzureServiceConnectionControllersCreateOrUpdateOptionalParams,
  AzureServiceConnectionControllersGetOptionalParams,
} from "./api/azureServiceConnectionControllers/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  AzureServiceConnectionControllersOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
