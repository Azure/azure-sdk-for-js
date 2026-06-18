// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageDiscoveryClient } from "./storageDiscoveryClient.js";
export type {
  StorageDiscoveryWorkspace,
  StorageDiscoveryWorkspaceProperties,
  StorageDiscoverySku,
  StorageDiscoveryScope,
  StorageDiscoveryResourceType,
  ResourceProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  StorageDiscoveryWorkspaceUpdate,
  StorageDiscoveryWorkspacePropertiesUpdate,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
} from "./models/index.js";
export {
  KnownStorageDiscoverySku,
  KnownStorageDiscoveryResourceType,
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownOrigin,
  KnownActionType,
  KnownApiVersion,
} from "./models/index.js";
export type { StorageDiscoveryClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  StorageDiscoveryWorkspacesDeleteOptionalParams,
  StorageDiscoveryWorkspacesUpdateOptionalParams,
  StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  StorageDiscoveryWorkspacesGetOptionalParams,
} from "./api/storageDiscoveryWorkspaces/index.js";
export type {
  OperationsOperations,
  StorageDiscoveryWorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
