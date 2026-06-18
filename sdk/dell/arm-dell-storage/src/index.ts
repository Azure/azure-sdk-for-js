// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageClient } from "./storageClient.js";
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
  FileSystemResource,
  FileSystemResourceProperties,
  Capacity,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  ProvisioningState,
  UserDetails,
  EncryptionProperties,
  ResourceEncryptionType,
  EncryptionIdentityProperties,
  EncryptionIdentityType,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  FileSystemResourceUpdate,
  ManagedServiceIdentityUpdate,
  FileSystemResourceUpdateProperties,
  EncryptionUpdateProperties,
  EncryptionIdentityUpdateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownProvisioningState,
  KnownResourceEncryptionType,
  KnownEncryptionIdentityType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
