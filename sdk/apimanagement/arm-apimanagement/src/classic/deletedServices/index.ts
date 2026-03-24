// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listBySubscription, purge, getByName } from "../../api/deletedServices/operations.js";
import type {
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesPurgeOptionalParams,
  DeletedServicesGetByNameOptionalParams,
} from "../../api/deletedServices/options.js";
import type { DeletedServiceContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
