// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { QumuloStorage } from "./qumuloStorage.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type {
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  ProvisioningState,
  UserDetails,
} from "./models/liftrBase/index.js";
export {
  KnownMarketplaceSubscriptionStatus,
  KnownProvisioningState,
} from "./models/liftrBase/index.js";
export type {
  FileSystemResource,
  FileSystemResourceProperties,
  FileSystemResourceUpdate,
  FileSystemResourceUpdateProperties,
} from "./models/liftrBase/storage/index.js";
export type { QumuloStorageOptionalParams } from "./api/index.js";
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
