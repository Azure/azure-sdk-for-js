// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PortalServicesClient } from "./portalServicesClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  CopilotSettingsResource,
  CopilotSettingsProperties,
  ResourceProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  CopilotSettingsResourceUpdate,
  CopilotSettingsResourceUpdateProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { PortalServicesClientOptionalParams } from "./api/index.js";
export type {
  CopilotSettingsDeleteOptionalParams,
  CopilotSettingsUpdateOptionalParams,
  CopilotSettingsCreateOrUpdateOptionalParams,
  CopilotSettingsGetOptionalParams,
} from "./api/copilotSettings/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { CopilotSettingsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
