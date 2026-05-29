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
    location: string,
    serviceName: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => PollerLike<OperationState<DeletedServiceContract>, DeletedServiceContract>;
  /** @deprecated use purge instead */
  beginPurge: (
    location: string,
    serviceName: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeletedServiceContract>, DeletedServiceContract>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    location: string,
    serviceName: string,
    options?: DeletedServicesPurgeOptionalParams,
  ) => Promise<DeletedServiceContract>;
  /** Get soft-deleted Api Management Service by name. */
  getByName: (
    location: string,
    serviceName: string,
    options?: DeletedServicesGetByNameOptionalParams,
  ) => Promise<DeletedServiceContract>;
}

function _getDeletedServices(context: ApiManagementContext) {
  return {
    listBySubscription: (options?: DeletedServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    purge: (location: string, serviceName: string, options?: DeletedServicesPurgeOptionalParams) =>
      purge(context, location, serviceName, options),
    beginPurge: async (
      location: string,
      serviceName: string,
      options?: DeletedServicesPurgeOptionalParams,
    ) => {
      const poller = purge(context, location, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      location: string,
      serviceName: string,
      options?: DeletedServicesPurgeOptionalParams,
    ) => {
      return await purge(context, location, serviceName, options);
    },
    getByName: (
      location: string,
      serviceName: string,
      options?: DeletedServicesGetByNameOptionalParams,
    ) => getByName(context, location, serviceName, options),
  };
}

export function _getDeletedServicesOperations(
  context: ApiManagementContext,
): DeletedServicesOperations {
  return {
    ..._getDeletedServices(context),
  };
}
