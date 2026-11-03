// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { listByRole, $delete, createOrUpdate, get } from "../../api/addons/operations.js";
import type {
  AddonsListByRoleOptionalParams,
  AddonsDeleteOptionalParams,
  AddonsCreateOrUpdateOptionalParams,
  AddonsGetOptionalParams,
} from "../../api/addons/options.js";
import type { AddonUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Addons operations. */
export interface AddonsOperations {
  /** Lists all the addons configured in the role. */
  listByRole: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: AddonsListByRoleOptionalParams,
  ) => PagedAsyncIterableIterator<AddonUnion>;
  /** Deletes the addon on the device. */
  delete: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    options?: AddonsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    options?: AddonsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    options?: AddonsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a addon. */
  createOrUpdate: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    addon: AddonUnion,
    options?: AddonsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AddonUnion>, AddonUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    addon: AddonUnion,
    options?: AddonsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AddonUnion>, AddonUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    addon: AddonUnion,
    options?: AddonsCreateOrUpdateOptionalParams,
  ) => Promise<AddonUnion>;
  /** Gets a specific addon by name. */
  get: (
    deviceName: string,
    roleName: string,
    addonName: string,
    resourceGroupName: string,
    options?: AddonsGetOptionalParams,
  ) => Promise<AddonUnion>;
}

function _getAddons(context: DataBoxEdgeManagementContext) {
  return {
    listByRole: (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: AddonsListByRoleOptionalParams,
    ) => listByRole(context, deviceName, roleName, resourceGroupName, options),
    delete: (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      options?: AddonsDeleteOptionalParams,
    ) => $delete(context, deviceName, roleName, addonName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      options?: AddonsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, roleName, addonName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      options?: AddonsDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, roleName, addonName, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      addon: AddonUnion,
      options?: AddonsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, deviceName, roleName, addonName, resourceGroupName, addon, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      addon: AddonUnion,
      options?: AddonsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        roleName,
        addonName,
        resourceGroupName,
        addon,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      addon: AddonUnion,
      options?: AddonsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        roleName,
        addonName,
        resourceGroupName,
        addon,
        options,
      );
    },
    get: (
      deviceName: string,
      roleName: string,
      addonName: string,
      resourceGroupName: string,
      options?: AddonsGetOptionalParams,
    ) => get(context, deviceName, roleName, addonName, resourceGroupName, options),
  };
}

export function _getAddonsOperations(context: DataBoxEdgeManagementContext): AddonsOperations {
  return {
    ..._getAddons(context),
  };
}
