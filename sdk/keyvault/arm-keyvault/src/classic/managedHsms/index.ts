// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import {
  checkMhsmNameAvailability,
  listDeleted,
  purgeDeleted,
  getDeleted,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedHsms/operations.js";
import type {
  ManagedHsmsCheckMhsmNameAvailabilityOptionalParams,
  ManagedHsmsListDeletedOptionalParams,
  ManagedHsmsPurgeDeletedOptionalParams,
  ManagedHsmsGetDeletedOptionalParams,
  ManagedHsmsListBySubscriptionOptionalParams,
  ManagedHsmsListByResourceGroupOptionalParams,
  ManagedHsmsDeleteOptionalParams,
  ManagedHsmsUpdateOptionalParams,
  ManagedHsmsCreateOrUpdateOptionalParams,
  ManagedHsmsGetOptionalParams,
} from "../../api/managedHsms/options.js";
import type {
  ManagedHsm,
  DeletedManagedHsm,
  CheckMhsmNameAvailabilityParameters,
  CheckMhsmNameAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedHsms operations. */
export interface ManagedHsmsOperations {
  /** Checks that the managed hsm name is valid and is not already in use. */
  checkMhsmNameAvailability: (
    mhsmName: CheckMhsmNameAvailabilityParameters,
    options?: ManagedHsmsCheckMhsmNameAvailabilityOptionalParams,
  ) => Promise<CheckMhsmNameAvailabilityResult>;
  /** The List operation gets information about the deleted managed HSMs associated with the subscription. */
  listDeleted: (
    options?: ManagedHsmsListDeletedOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedManagedHsm>;
  /** Permanently deletes the specified managed HSM. */
  purgeDeleted: (
    name: string,
    location: string,
    options?: ManagedHsmsPurgeDeletedOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purgeDeleted instead */
  beginPurgeDeleted: (
    name: string,
    location: string,
    options?: ManagedHsmsPurgeDeletedOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purgeDeleted instead */
  beginPurgeDeletedAndWait: (
    name: string,
    location: string,
    options?: ManagedHsmsPurgeDeletedOptionalParams,
  ) => Promise<void>;
  /** Gets the specified deleted managed HSM. */
  getDeleted: (
    name: string,
    location: string,
    options?: ManagedHsmsGetDeletedOptionalParams,
  ) => Promise<DeletedManagedHsm>;
  /** The List operation gets information about the managed HSM Pools associated with the subscription. */
  listBySubscription: (
    options?: ManagedHsmsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedHsm>;
  /** The List operation gets information about the managed HSM Pools associated with the subscription and within the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedHsmsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedHsm>;
  /** Deletes the specified managed HSM Pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: ManagedHsmsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    name: string,
    options?: ManagedHsmsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    name: string,
    options?: ManagedHsmsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a managed HSM Pool in the specified subscription. */
  update: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedHsm>, ManagedHsm>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedHsm>, ManagedHsm>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsUpdateOptionalParams,
  ) => Promise<ManagedHsm>;
  /** Create or update a managed HSM Pool in the specified subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedHsm>, ManagedHsm>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedHsm>, ManagedHsm>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    name: string,
    parameters: ManagedHsm,
    options?: ManagedHsmsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedHsm>;
  /** Gets the specified managed HSM Pool. */
  get: (
    resourceGroupName: string,
    name: string,
    options?: ManagedHsmsGetOptionalParams,
  ) => Promise<ManagedHsm>;
}

function _getManagedHsms(context: KeyVaultManagementContext) {
  return {
    checkMhsmNameAvailability: (
      mhsmName: CheckMhsmNameAvailabilityParameters,
      options?: ManagedHsmsCheckMhsmNameAvailabilityOptionalParams,
    ) => checkMhsmNameAvailability(context, mhsmName, options),
    listDeleted: (options?: ManagedHsmsListDeletedOptionalParams) => listDeleted(context, options),
    purgeDeleted: (
      name: string,
      location: string,
      options?: ManagedHsmsPurgeDeletedOptionalParams,
    ) => purgeDeleted(context, name, location, options),
    beginPurgeDeleted: async (
      name: string,
      location: string,
      options?: ManagedHsmsPurgeDeletedOptionalParams,
    ) => {
      const poller = purgeDeleted(context, name, location, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeDeletedAndWait: async (
      name: string,
      location: string,
      options?: ManagedHsmsPurgeDeletedOptionalParams,
    ) => {
      return await purgeDeleted(context, name, location, options);
    },
    getDeleted: (name: string, location: string, options?: ManagedHsmsGetDeletedOptionalParams) =>
      getDeleted(context, name, location, options),
    listBySubscription: (options?: ManagedHsmsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedHsmsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, name: string, options?: ManagedHsmsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      name: string,
      options?: ManagedHsmsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: ManagedHsmsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, name, options);
    },
    update: (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, name, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, name, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      name: string,
      parameters: ManagedHsm,
      options?: ManagedHsmsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, name, parameters, options);
    },
    get: (resourceGroupName: string, name: string, options?: ManagedHsmsGetOptionalParams) =>
      get(context, resourceGroupName, name, options),
  };
}

export function _getManagedHsmsOperations(
  context: KeyVaultManagementContext,
): ManagedHsmsOperations {
  return {
    ..._getManagedHsms(context),
  };
}
