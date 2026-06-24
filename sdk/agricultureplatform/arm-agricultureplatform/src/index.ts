// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AgriculturePlatformClient } from "./agriculturePlatformClient.js";
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
  AgriServiceResource,
  AgriServiceResourceProperties,
  ProvisioningState,
  AgriServiceConfig,
  ManagedOnBehalfOfConfiguration,
  MoboBrokerResource,
  DataConnectorCredentialMap,
  DataConnectorCredentials,
  AuthCredentialsKind,
  InstalledSolutionMap,
  Solution,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Sku,
  SkuTier,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  AgriServiceResourceUpdate,
  AgriServiceResourceUpdateProperties,
  AvailableAgriSolutionListResult,
  DataManagerForAgricultureSolution,
  MarketPlaceOfferDetails,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownAuthCredentialsKind,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { AgriculturePlatformClientOptionalParams } from "./api/index.js";
export type {
  AgriServiceListAvailableSolutionsOptionalParams,
  AgriServiceListBySubscriptionOptionalParams,
  AgriServiceListByResourceGroupOptionalParams,
  AgriServiceDeleteOptionalParams,
  AgriServiceUpdateOptionalParams,
  AgriServiceCreateOrUpdateOptionalParams,
  AgriServiceGetOptionalParams,
} from "./api/agriService/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { AgriServiceOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
