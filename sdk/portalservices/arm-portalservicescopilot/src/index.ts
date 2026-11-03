// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PortalServicesClient } from "./portalServicesClient.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type CopilotSettingsResource,
  type CopilotSettingsProperties,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type CopilotSettingsResourceUpdate,
  type CopilotSettingsResourceUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { type PortalServicesClientOptionalParams } from "./api/index.js";
export {
  type CopilotSettingsDeleteOptionalParams,
  type CopilotSettingsUpdateOptionalParams,
  type CopilotSettingsCreateOrUpdateOptionalParams,
  type CopilotSettingsGetOptionalParams,
} from "./api/copilotSettings/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export { type CopilotSettingsOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
