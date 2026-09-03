// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AgriculturePlatformClient } from "./agriculturePlatformClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type AgriServiceResource,
  type AgriServiceResourceProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type AgriServiceConfig,
  type ManagedOnBehalfOfConfiguration,
  type MoboBrokerResource,
  type DataConnectorCredentialMap,
  type DataConnectorCredentials,
  KnownAuthCredentialsKind,
  type AuthCredentialsKind,
  type InstalledSolutionMap,
  type Solution,
  type ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  type ManagedServiceIdentityType,
  type UserAssignedIdentity,
  type Sku,
  type SkuTier,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type AgriServiceResourceUpdate,
  type AgriServiceResourceUpdateProperties,
  type AvailableAgriSolutionListResult,
  type DataManagerForAgricultureSolution,
  type MarketPlaceOfferDetails,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  KnownVersions,
} from "./models/index.js";
export { type AgriculturePlatformClientOptionalParams } from "./api/index.js";
export {
  type AgriServiceListAvailableSolutionsOptionalParams,
  type AgriServiceListBySubscriptionOptionalParams,
  type AgriServiceListByResourceGroupOptionalParams,
  type AgriServiceDeleteOptionalParams,
  type AgriServiceUpdateOptionalParams,
  type AgriServiceCreateOrUpdateOptionalParams,
  type AgriServiceGetOptionalParams,
} from "./api/agriService/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export { type AgriServiceOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
