// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/users/operations.js";
import {
  UsersListByDataBoxEdgeDeviceOptionalParams,
  UsersDeleteOptionalParams,
  UsersCreateOrUpdateOptionalParams,
  UsersGetOptionalParams,
} from "../../api/users/options.js";
import { User } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Users operations. */
export interface UsersOperations {
  /** Gets all the users registered on a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: UsersListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<User>;
  /** Deletes the user on a databox edge/gateway device. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: UsersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: UsersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: UsersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new user or updates an existing user's information on a Data Box Edge/Data Box Gateway device. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    user: User,
    options?: UsersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<User>, User>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    user: User,
    options?: UsersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<User>, User>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    user: User,
    options?: UsersCreateOrUpdateOptionalParams,
  ) => Promise<User>;
  /** Gets the properties of the specified user. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: UsersGetOptionalParams,
  ) => Promise<User>;
}

function _getUsers(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: UsersListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: UsersDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: UsersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: UsersDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      user: User,
      options?: UsersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, name, resourceGroupName, user, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      user: User,
      options?: UsersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deviceName, name, resourceGroupName, user, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      user: User,
      options?: UsersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deviceName, name, resourceGroupName, user, options);
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: UsersGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getUsersOperations(context: DataBoxEdgeManagementContext): UsersOperations {
  return {
    ..._getUsers(context),
  };
}
