// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DigitalAssetsClient } from "./digitalAssetsClient.js";
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
  ZkpRollup,
  ZkpRollupProperties,
  ProvisioningState,
  OperationalStatus,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ZkpRollupUpdate,
  ZkpRollupIdentityUpdate,
  ZkpRollupPatchProperties,
  Partition,
  PartitionProperties,
  PartitionTagsUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownApiVersion,
} from "./models/index.js";
export type { DigitalAssetsClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PartitionsListByParentOptionalParams,
  PartitionsDeleteOptionalParams,
  PartitionsUpdateOptionalParams,
  PartitionsCreateOrUpdateOptionalParams,
  PartitionsGetOptionalParams,
} from "./api/partitions/index.js";
export type {
  ZkpRollupsListBySubscriptionOptionalParams,
  ZkpRollupsListByResourceGroupOptionalParams,
  ZkpRollupsDeleteOptionalParams,
  ZkpRollupsUpdateOptionalParams,
  ZkpRollupsCreateOrUpdateOptionalParams,
  ZkpRollupsGetOptionalParams,
} from "./api/zkpRollups/index.js";
export type {
  OperationsOperations,
  PartitionsOperations,
  ZkpRollupsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
