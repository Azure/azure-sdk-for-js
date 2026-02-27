// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageClient } from "./storageClient.js";
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
  type FileSystemResource,
  type FileSystemResourceProperties,
  type Capacity,
  type MarketplaceDetails,
  KnownMarketplaceSubscriptionStatus,
  type MarketplaceSubscriptionStatus,
  KnownProvisioningState,
  type ProvisioningState,
  type UserDetails,
  type EncryptionProperties,
  KnownResourceEncryptionType,
  type ResourceEncryptionType,
  type EncryptionIdentityProperties,
  KnownEncryptionIdentityType,
  type EncryptionIdentityType,
  type ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  type ManagedServiceIdentityType,
  type UserAssignedIdentity,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type FileSystemResourceUpdate,
  type ManagedServiceIdentityUpdate,
  type FileSystemResourceUpdateProperties,
  type EncryptionUpdateProperties,
  type EncryptionIdentityUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export type { StorageClientOptionalParams } from "./api/index.js";
export type {
  FileSystemsListBySubscriptionOptionalParams,
  FileSystemsListByResourceGroupOptionalParams,
  FileSystemsDeleteOptionalParams,
  FileSystemsUpdateOptionalParams,
  FileSystemsCreateOrUpdateOptionalParams,
  FileSystemsGetOptionalParams,
} from "./api/fileSystems/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { FileSystemsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
