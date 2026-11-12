// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WorkloadManagerClient } from "./workloadManagerClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  WorkloadSpace,
  WorkloadSpaceProperties,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  WorkloadSpaceUpdate,
  RuntimeBinding,
  RuntimeBindingProperties,
  RuntimeBindingPropertiesUnion,
  RuntimeBindingProvisioningMode,
  RuntimeIdentityProfile,
  ExecutionIdentity,
  ExecutionIdentityUnion,
  ExecutionIdentityProvisioningMode,
  ExecutionIdentityScope,
  ReferencedExecutionIdentity,
  ServiceManagedExecutionIdentity,
  RuntimeNetworkProfile,
  EgressMode,
  ManagedRuntimeBindingProperties,
  ManagedRuntimeProfile,
  ReferencedRuntimeBindingProperties,
  RuntimeBindingKind,
  RuntimeBindingUpdate,
  RuntimeBindingUpdateProperties,
  RuntimeIdentityProfileUpdate,
  ExecutionIdentityUpdate,
  RuntimeLink,
  RuntimeLinkProperties,
  RuntimeLinkIntegrationProfile,
  CapacityProfile,
  RuntimeLinkUpdate,
  RuntimeLinkUpdateProperties,
  CapacityProfileUpdate,
  Capability,
  CapabilityProperties,
  VersionPolicy,
  CapabilityKind,
  CapabilityUpdate,
  CapabilityUpdateProperties,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownCreatedByType,
  KnownRuntimeBindingProvisioningMode,
  KnownExecutionIdentityProvisioningMode,
  KnownExecutionIdentityScope,
  KnownEgressMode,
  KnownRuntimeBindingKind,
  KnownVersionPolicy,
  KnownCapabilityKind,
  KnownVersions,
} from "./models/index.js";
export type { WorkloadManagerClientOptionalParams } from "./api/index.js";
export type {
  CapabilitiesListByWorkloadSpaceOptionalParams,
  CapabilitiesDeleteOptionalParams,
  CapabilitiesUpdateOptionalParams,
  CapabilitiesCreateOrUpdateOptionalParams,
  CapabilitiesGetOptionalParams,
} from "./api/capabilities/index.js";
export type {
  RuntimeBindingsListByWorkloadSpaceOptionalParams,
  RuntimeBindingsDeleteOptionalParams,
  RuntimeBindingsUpdateOptionalParams,
  RuntimeBindingsCreateOrUpdateOptionalParams,
  RuntimeBindingsGetOptionalParams,
} from "./api/runtimeBindings/index.js";
export type {
  RuntimeLinksListByWorkloadSpaceOptionalParams,
  RuntimeLinksDeleteOptionalParams,
  RuntimeLinksUpdateOptionalParams,
  RuntimeLinksCreateOrUpdateOptionalParams,
  RuntimeLinksGetOptionalParams,
} from "./api/runtimeLinks/index.js";
export type {
  WorkloadSpacesListBySubscriptionOptionalParams,
  WorkloadSpacesListByResourceGroupOptionalParams,
  WorkloadSpacesDeleteOptionalParams,
  WorkloadSpacesUpdateOptionalParams,
  WorkloadSpacesCreateOrUpdateOptionalParams,
  WorkloadSpacesGetOptionalParams,
} from "./api/workloadSpaces/index.js";
export type {
  CapabilitiesOperations,
  RuntimeBindingsOperations,
  RuntimeLinksOperations,
  WorkloadSpacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
