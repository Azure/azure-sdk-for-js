// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";

export { ManagementClient } from "./managementClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ServiceGroup,
  ServiceGroupProperties,
  ProvisioningState,
  ParentServiceGroupProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ServiceGroupCollectionResponse,
} from "./models/index.js";
export { KnownProvisioningState, KnownCreatedByType, KnownVersions } from "./models/index.js";
export type {
  ManagementClientOptionalParams,
  DeleteServiceGroupOptionalParams,
  UpdateServiceGroupOptionalParams,
  CreateOrUpdateServiceGroupOptionalParams,
} from "./api/index.js";
export type {
  ServiceGroupsListAncestorsOptionalParams,
  ServiceGroupsGetOptionalParams,
} from "./api/serviceGroups/index.js";
export type { ServiceGroupsOperations } from "./classic/index.js";
export { AzureClouds };
export type { AzureSupportedClouds };
