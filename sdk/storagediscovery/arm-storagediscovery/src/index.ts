// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageDiscoveryClient } from "./storageDiscoveryClient.js";
export {
  StorageDiscoveryWorkspace,
  StorageDiscoveryWorkspaceProperties,
  KnownStorageDiscoverySku,
  StorageDiscoverySku,
  StorageDiscoveryScope,
  KnownStorageDiscoveryResourceType,
  StorageDiscoveryResourceType,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  StorageDiscoveryWorkspaceUpdate,
  StorageDiscoveryWorkspacePropertiesUpdate,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  KnownApiVersion,
} from "./models/index.js";
export { StorageDiscoveryClientOptionalParams } from "./api/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  StorageDiscoveryWorkspacesDeleteOptionalParams,
  StorageDiscoveryWorkspacesUpdateOptionalParams,
  StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  StorageDiscoveryWorkspacesGetOptionalParams,
} from "./api/storageDiscoveryWorkspaces/index.js";
export { OperationsOperations, StorageDiscoveryWorkspacesOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
