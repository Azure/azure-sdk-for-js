// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByProject,
  getByProject,
  listByDevCenter,
  $delete,
  createOrUpdate,
  getByDevCenter,
} from "../../api/attachedNetworks/operations.js";
import type {
  AttachedNetworksListByProjectOptionalParams,
  AttachedNetworksGetByProjectOptionalParams,
  AttachedNetworksListByDevCenterOptionalParams,
  AttachedNetworksDeleteOptionalParams,
  AttachedNetworksCreateOrUpdateOptionalParams,
  AttachedNetworksGetByDevCenterOptionalParams,
} from "../../api/attachedNetworks/options.js";
import type { AttachedNetworkConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AttachedNetworks operations. */
export interface AttachedNetworksOperations {
  /** Lists the attached NetworkConnections for a Project. */
  listByProject: (
    resourceGroupName: string,
    projectName: string,
    options?: AttachedNetworksListByProjectOptionalParams,
  ) => PagedAsyncIterableIterator<AttachedNetworkConnection>;
  /** Gets an attached NetworkConnection. */
  getByProject: (
    resourceGroupName: string,
    projectName: string,
    attachedNetworkConnectionName: string,
    options?: AttachedNetworksGetByProjectOptionalParams,
  ) => Promise<AttachedNetworkConnection>;
  /** Lists the attached NetworkConnections for a DevCenter. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: AttachedNetworksListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<AttachedNetworkConnection>;
  /** Un-attach a NetworkConnection. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    options?: AttachedNetworksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    options?: AttachedNetworksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    options?: AttachedNetworksDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an attached NetworkConnection. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    body: AttachedNetworkConnection,
    options?: AttachedNetworksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AttachedNetworkConnection>, AttachedNetworkConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    body: AttachedNetworkConnection,
    options?: AttachedNetworksCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<AttachedNetworkConnection>, AttachedNetworkConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    body: AttachedNetworkConnection,
    options?: AttachedNetworksCreateOrUpdateOptionalParams,
  ) => Promise<AttachedNetworkConnection>;
  /** Gets an attached NetworkConnection. */
  getByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    attachedNetworkConnectionName: string,
    options?: AttachedNetworksGetByDevCenterOptionalParams,
  ) => Promise<AttachedNetworkConnection>;
}

function _getAttachedNetworks(context: DevCenterContext) {
  return {
    listByProject: (
      resourceGroupName: string,
      projectName: string,
      options?: AttachedNetworksListByProjectOptionalParams,
    ) => listByProject(context, resourceGroupName, projectName, options),
    getByProject: (
      resourceGroupName: string,
      projectName: string,
      attachedNetworkConnectionName: string,
      options?: AttachedNetworksGetByProjectOptionalParams,
    ) =>
      getByProject(context, resourceGroupName, projectName, attachedNetworkConnectionName, options),
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: AttachedNetworksListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      options?: AttachedNetworksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, attachedNetworkConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      options?: AttachedNetworksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      options?: AttachedNetworksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      body: AttachedNetworkConnection,
      options?: AttachedNetworksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      body: AttachedNetworkConnection,
      options?: AttachedNetworksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      body: AttachedNetworkConnection,
      options?: AttachedNetworksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        body,
        options,
      );
    },
    getByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      attachedNetworkConnectionName: string,
      options?: AttachedNetworksGetByDevCenterOptionalParams,
    ) =>
      getByDevCenter(
        context,
        resourceGroupName,
        devCenterName,
        attachedNetworkConnectionName,
        options,
      ),
  };
}

export function _getAttachedNetworksOperations(
  context: DevCenterContext,
): AttachedNetworksOperations {
  return {
    ..._getAttachedNetworks(context),
  };
}
