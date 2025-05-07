// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageClient } from "./storageClient.js";
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
  FileSystemResource,
  FileSystemResourceProperties,
  Capacity,
  MarketplaceDetails,
  KnownMarketplaceSubscriptionStatus,
  MarketplaceSubscriptionStatus,
  KnownProvisioningState,
  ProvisioningState,
  UserDetails,
  EncryptionProperties,
  KnownResourceEncryptionType,
  ResourceEncryptionType,
  EncryptionIdentityProperties,
  KnownEncryptionIdentityType,
  EncryptionIdentityType,
  ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  FileSystemResourceUpdate,
  ManagedServiceIdentityUpdate,
  FileSystemResourceUpdateProperties,
  EncryptionUpdateProperties,
  EncryptionIdentityUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { StorageClientOptionalParams } from "./api/index.js";
export {
  FileSystemsListBySubscriptionOptionalParams,
  FileSystemsListByResourceGroupOptionalParams,
  FileSystemsDeleteOptionalParams,
  FileSystemsUpdateOptionalParams,
  FileSystemsCreateOrUpdateOptionalParams,
  FileSystemsGetOptionalParams,
} from "./api/fileSystems/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  FileSystemsOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
