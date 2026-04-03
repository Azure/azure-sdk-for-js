// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ExtensionsClient } from "./extensionsClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Extension,
  ExtensionProperties,
  Scope,
  ScopeCluster,
  ScopeNamespace,
  ProvisioningState,
  ExtensionStatus,
  LevelType,
  ErrorDetail,
  ErrorAdditionalInfo,
  ExtensionPropertiesAksAssignedIdentity,
  AKSIdentityType,
  Identity,
  ResourceIdentityType,
  Plan,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  PatchExtension,
  PatchExtensionProperties,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownLevelType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ExtensionsClientOptionalParams } from "./api/index.js";
export type {
  ExtensionsListOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsUpdateOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsGetOptionalParams,
} from "./api/extensions/index.js";
export type { OperationStatusGetOptionalParams } from "./api/operationStatus/index.js";
export type { ExtensionsOperations, OperationStatusOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
