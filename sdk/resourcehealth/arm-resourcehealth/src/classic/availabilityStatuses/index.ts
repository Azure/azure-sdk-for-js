// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import {
  listByResourceGroup,
  list,
  listBySubscriptionId,
  getByResource,
} from "../../api/availabilityStatuses/operations.js";
import {
  AvailabilityStatusesListByResourceGroupOptionalParams,
  AvailabilityStatusesListOptionalParams,
  AvailabilityStatusesListBySubscriptionIdOptionalParams,
  AvailabilityStatusesGetByResourceOptionalParams,
} from "../../api/availabilityStatuses/options.js";
import { AvailabilityStatus } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailabilityStatuses operations. */
export interface AvailabilityStatusesOperations {
  /** Lists the current availability status for all the resources in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AvailabilityStatusesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityStatus>;
  /** Lists all historical availability transitions and impacting events for a single resource. */
  list: (
    resourceUri: string,
    options?: AvailabilityStatusesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityStatus>;
  /** Lists the current availability status for all the resources in the subscription. */
  listBySubscriptionId: (
    options?: AvailabilityStatusesListBySubscriptionIdOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityStatus>;
  /** Gets current availability status for a single resource */
  getByResource: (
    resourceUri: string,
    options?: AvailabilityStatusesGetByResourceOptionalParams,
  ) => Promise<AvailabilityStatus>;
}

function _getAvailabilityStatuses(context: MicrosoftResourceHealthContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AvailabilityStatusesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (resourceUri: string, options?: AvailabilityStatusesListOptionalParams) =>
      list(context, resourceUri, options),
    listBySubscriptionId: (options?: AvailabilityStatusesListBySubscriptionIdOptionalParams) =>
      listBySubscriptionId(context, options),
    getByResource: (
      resourceUri: string,
      options?: AvailabilityStatusesGetByResourceOptionalParams,
    ) => getByResource(context, resourceUri, options),
  };
}

export function _getAvailabilityStatusesOperations(
  context: MicrosoftResourceHealthContext,
): AvailabilityStatusesOperations {
  return {
    ..._getAvailabilityStatuses(context),
  };
}
