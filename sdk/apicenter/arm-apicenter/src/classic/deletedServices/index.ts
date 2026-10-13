// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext } from "../../api/apiCenterContext.js";
import { listBySubscription, list, $delete, get } from "../../api/deletedServices/operations.js";
import type {
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesListOptionalParams,
  DeletedServicesDeleteOptionalParams,
  DeletedServicesGetOptionalParams,
} from "../../api/deletedServices/options.js";
import type { DeletedService } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedServices operations. */
export interface DeletedServicesOperations {
  /** Lists services within an Azure subscription. */
  listBySubscription: (
    options?: DeletedServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedService>;
  /** Lists soft-deleted services. */
  list: (
    resourceGroupName: string,
    options?: DeletedServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedService>;
  /** Permanently deletes specified service. */
  delete: (
    resourceGroupName: string,
    deletedServiceName: string,
    options?: DeletedServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Returns details of the soft-deleted service. */
  get: (
    resourceGroupName: string,
    deletedServiceName: string,
    options?: DeletedServicesGetOptionalParams,
  ) => Promise<DeletedService>;
}

function _getDeletedServices(context: ApiCenterContext) {
  return {
    listBySubscription: (options?: DeletedServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: DeletedServicesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      deletedServiceName: string,
      options?: DeletedServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deletedServiceName, options),
    get: (
      resourceGroupName: string,
      deletedServiceName: string,
      options?: DeletedServicesGetOptionalParams,
    ) => get(context, resourceGroupName, deletedServiceName, options),
  };
}

export function _getDeletedServicesOperations(
  context: ApiCenterContext,
): DeletedServicesOperations {
  return {
    ..._getDeletedServices(context),
  };
}
