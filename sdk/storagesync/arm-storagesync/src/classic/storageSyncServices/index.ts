// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import {
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/storageSyncServices/operations.js";
import type {
  StorageSyncServicesCheckNameAvailabilityOptionalParams,
  StorageSyncServicesListBySubscriptionOptionalParams,
  StorageSyncServicesListByResourceGroupOptionalParams,
  StorageSyncServicesDeleteOptionalParams,
  StorageSyncServicesUpdateOptionalParams,
  StorageSyncServicesCreateOptionalParams,
  StorageSyncServicesGetOptionalParams,
} from "../../api/storageSyncServices/options.js";
import type {
  StorageSyncService,
  StorageSyncServiceCreateParameters,
  CheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageSyncServices operations. */
export interface StorageSyncServicesOperations {
  /** Check the give namespace name availability. */
  checkNameAvailability: (
    locationName: string,
    parameters: CheckNameAvailabilityParameters,
    options?: StorageSyncServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Get a StorageSyncService list by subscription. */
  listBySubscription: (
    options?: StorageSyncServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageSyncService>;
  /** Get a StorageSyncService list by Resource group name. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageSyncServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageSyncService>;
  /** Delete a given StorageSyncService. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch a given StorageSyncService. */
  update: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageSyncService>, StorageSyncService>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageSyncService>, StorageSyncService>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesUpdateOptionalParams,
  ) => Promise<StorageSyncService>;
  /** Create a new StorageSyncService. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    parameters: StorageSyncServiceCreateParameters,
    options?: StorageSyncServicesCreateOptionalParams,
  ) => PollerLike<OperationState<StorageSyncService>, StorageSyncService>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    parameters: StorageSyncServiceCreateParameters,
    options?: StorageSyncServicesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageSyncService>, StorageSyncService>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    parameters: StorageSyncServiceCreateParameters,
    options?: StorageSyncServicesCreateOptionalParams,
  ) => Promise<StorageSyncService>;
  /** Get a given StorageSyncService. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: StorageSyncServicesGetOptionalParams,
  ) => Promise<StorageSyncService>;
}

function _getStorageSyncServices(context: MicrosoftStorageSyncContext) {
  return {
    checkNameAvailability: (
      locationName: string,
      parameters: CheckNameAvailabilityParameters,
      options?: StorageSyncServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, locationName, parameters, options),
    listBySubscription: (options?: StorageSyncServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageSyncServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageSyncServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, storageSyncServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, storageSyncServiceName, options);
    },
    update: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageSyncServiceName, options),
    beginUpdate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, storageSyncServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, storageSyncServiceName, options);
    },
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      parameters: StorageSyncServiceCreateParameters,
      options?: StorageSyncServicesCreateOptionalParams,
    ) => create(context, resourceGroupName, storageSyncServiceName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      parameters: StorageSyncServiceCreateParameters,
      options?: StorageSyncServicesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      storageSyncServiceName: string,
      parameters: StorageSyncServiceCreateParameters,
      options?: StorageSyncServicesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, storageSyncServiceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: StorageSyncServicesGetOptionalParams,
    ) => get(context, resourceGroupName, storageSyncServiceName, options),
  };
}

export function _getStorageSyncServicesOperations(
  context: MicrosoftStorageSyncContext,
): StorageSyncServicesOperations {
  return {
    ..._getStorageSyncServices(context),
  };
}
