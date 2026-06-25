// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WeightsAndBiasesClient } from "./weightsAndBiasesClient.js";
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
  InstanceResource,
  InstanceProperties,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  UserDetails,
  ResourceProvisioningState,
  PartnerProperties,
  Region,
  SingleSignOnPropertiesV2,
  SingleSignOnType,
  SingleSignOnStates,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  InstanceResourceUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownResourceProvisioningState,
  KnownRegion,
  KnownSingleSignOnType,
  KnownSingleSignOnStates,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { WeightsAndBiasesClientOptionalParams } from "./api/index.js";
export type {
  InstancesListBySubscriptionOptionalParams,
  InstancesListByResourceGroupOptionalParams,
  InstancesDeleteOptionalParams,
  InstancesUpdateOptionalParams,
  InstancesCreateOrUpdateOptionalParams,
  InstancesGetOptionalParams,
} from "./api/instances/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { InstancesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
