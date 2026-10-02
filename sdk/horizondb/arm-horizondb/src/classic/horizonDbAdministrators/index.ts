// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/horizonDbAdministrators/operations.js";
import type {
  HorizonDbAdministratorsListOptionalParams,
  HorizonDbAdministratorsDeleteOptionalParams,
  HorizonDbAdministratorsCreateOrUpdateOptionalParams,
  HorizonDbAdministratorsGetOptionalParams,
} from "../../api/horizonDbAdministrators/options.js";
import type { HorizonDbAdministrator, HorizonDbAdministratorAdd } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbAdministrators operations. */
export interface HorizonDbAdministratorsOperations {
  /** Lists all HorizonDB administrators in a cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbAdministratorsListOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbAdministrator>;
  /** Deletes a HorizonDB administrator. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: HorizonDbAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: HorizonDbAdministratorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: HorizonDbAdministratorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new HorizonDB administrator or updates an existing administrator. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: HorizonDbAdministratorAdd,
    options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbAdministrator>, HorizonDbAdministrator>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: HorizonDbAdministratorAdd,
    options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbAdministrator>, HorizonDbAdministrator>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    resource: HorizonDbAdministratorAdd,
    options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<HorizonDbAdministrator>;
  /** Gets information about a HorizonDB administrator. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    objectId: string,
    options?: HorizonDbAdministratorsGetOptionalParams,
  ) => Promise<HorizonDbAdministrator>;
}

function _getHorizonDbAdministrators(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbAdministratorsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: HorizonDbAdministratorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, objectId, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: HorizonDbAdministratorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, objectId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: HorizonDbAdministratorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, objectId, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: HorizonDbAdministratorAdd,
      options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, objectId, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: HorizonDbAdministratorAdd,
      options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        objectId,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      resource: HorizonDbAdministratorAdd,
      options?: HorizonDbAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        objectId,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      objectId: string,
      options?: HorizonDbAdministratorsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, objectId, options),
  };
}

export function _getHorizonDbAdministratorsOperations(
  context: HorizonDbContext,
): HorizonDbAdministratorsOperations {
  return {
    ..._getHorizonDbAdministrators(context),
  };
}
