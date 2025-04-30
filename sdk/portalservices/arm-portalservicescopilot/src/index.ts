// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PortalServicesClient } from "./portalServicesClient.js";
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
  CopilotSettingsResource,
  CopilotSettingsProperties,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  CopilotSettingsResourceUpdate,
  CopilotSettingsResourceUpdateProperties,
  KnownVersions,
} from "./models/index.js";
export { PortalServicesClientOptionalParams } from "./api/index.js";
export {
  CopilotSettingsDeleteOptionalParams,
  CopilotSettingsUpdateOptionalParams,
  CopilotSettingsCreateOrUpdateOptionalParams,
  CopilotSettingsGetOptionalParams,
} from "./api/copilotSettings/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { CopilotSettingsOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
