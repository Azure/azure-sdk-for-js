// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageDiscoveryClient } from "./storageDiscoveryClient.js";
export {
  type StorageDiscoveryWorkspace,
  type StorageDiscoveryWorkspaceProperties,
  KnownStorageDiscoverySku,
  type StorageDiscoverySku,
  type StorageDiscoveryScope,
  KnownStorageDiscoveryResourceType,
  type StorageDiscoveryResourceType,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type StorageDiscoveryWorkspaceUpdate,
  type StorageDiscoveryWorkspacePropertiesUpdate,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
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
export type { OperationsOperations, StorageDiscoveryWorkspacesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
