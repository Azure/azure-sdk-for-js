// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/roles/operations.js";
import {
  RolesListByDataBoxEdgeDeviceOptionalParams,
  RolesDeleteOptionalParams,
  RolesCreateOrUpdateOptionalParams,
  RolesGetOptionalParams,
} from "../../api/roles/options.js";
import { RoleUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Roles operations. */
export interface RolesOperations {
  /** Lists all the roles configured in a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: RolesListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<RoleUnion>;
  /** Deletes the role on the device. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: RolesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: RolesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: RolesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a role. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    role: RoleUnion,
    options?: RolesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RoleUnion>, RoleUnion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    role: RoleUnion,
    options?: RolesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RoleUnion>, RoleUnion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    role: RoleUnion,
    options?: RolesCreateOrUpdateOptionalParams,
  ) => Promise<RoleUnion>;
  /** Gets a specific role by name. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: RolesGetOptionalParams,
  ) => Promise<RoleUnion>;
}

function _getRoles(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: RolesListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: RolesDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: RolesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: RolesDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      role: RoleUnion,
      options?: RolesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, name, resourceGroupName, role, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      role: RoleUnion,
      options?: RolesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deviceName, name, resourceGroupName, role, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      role: RoleUnion,
      options?: RolesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deviceName, name, resourceGroupName, role, options);
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: RolesGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getRolesOperations(context: DataBoxEdgeManagementContext): RolesOperations {
  return {
    ..._getRoles(context),
  };
}
