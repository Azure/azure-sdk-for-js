// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listBySubscription, purge, getByName } from "../../api/deletedServices/operations.js";
import {
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesPurgeOptionalParams,
  DeletedServicesGetByNameOptionalParams,
} from "../../api/deletedServices/options.js";
import { DeletedServiceContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeletedServices operations. */
export interface DeletedServicesOperations {
  /** Lists all soft-deleted services available for undelete for the given subscription. */
  listBySubscription: (
    options?: DeletedServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedServiceContract>;
  /** Purges Api Management Service (deletes it with no option to undelete). */
  purge: (
    serviceName: string,
    location: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    serviceName: string,
    location: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    serviceName: string,
    location: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => Promise<void>;
  /** Get soft-deleted Api Management Service by name. */
  getByName: (
    serviceName: string,
    location: string,
    options?: DeletedServicesGetByNameOptionalParams,
  ) => Promise<DeletedServiceContract>;
}

function _getDeletedServices(context: ApiManagementContext) {
  return {
    listBySubscription: (options?: DeletedServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    purge: (serviceName: string, location: string, options?: DeletedServicesPurgeOptionalParams) =>
      purge(context, serviceName, location, options),
    beginPurge: async (
      serviceName: string,
      location: string,
      options?: DeletedServicesPurgeOptionalParams,
    ) => {
      const poller = purge(context, serviceName, location, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      serviceName: string,
      location: string,
      options?: DeletedServicesPurgeOptionalParams,
    ) => {
      return await purge(context, serviceName, location, options);
    },
    getByName: (
      serviceName: string,
      location: string,
      options?: DeletedServicesGetByNameOptionalParams,
    ) => getByName(context, serviceName, location, options),
  };
}

export function _getDeletedServicesOperations(
  context: ApiManagementContext,
): DeletedServicesOperations {
  return {
    ..._getDeletedServices(context),
  };
}
