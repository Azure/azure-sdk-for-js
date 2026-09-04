// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MonitorClient } from "./monitorClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ObservabilityAgentResource,
  ObservabilityAgentProperties,
  ResourceProvisioningState,
  OperationEntry,
  OperationType,
  OperationMode,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ObservabilityAgentPatch,
  ObservabilityAgentPropertiesUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownResourceProvisioningState,
  KnownOperationType,
  KnownOperationMode,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { MonitorClientOptionalParams } from "./api/index.js";
export type {
  ObservabilityAgentsListBySubscriptionOptionalParams,
  ObservabilityAgentsListByResourceGroupOptionalParams,
  ObservabilityAgentsDeleteOptionalParams,
  ObservabilityAgentsUpdateOptionalParams,
  ObservabilityAgentsCreateOrUpdateOptionalParams,
  ObservabilityAgentsGetOptionalParams,
} from "./api/observabilityAgents/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ObservabilityAgentsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
