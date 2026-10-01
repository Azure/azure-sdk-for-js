// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import { list, getByResource } from "../../api/childAvailabilityStatuses/operations.js";
import {
  ChildAvailabilityStatusesListOptionalParams,
  ChildAvailabilityStatusesGetByResourceOptionalParams,
} from "../../api/childAvailabilityStatuses/options.js";
import { AvailabilityStatus } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ChildAvailabilityStatuses operations. */
export interface ChildAvailabilityStatusesOperations {
  /** Lists the historical availability statuses for a single child resource. Use the nextLink property in the response to get the next page of availability status */
  list: (
    resourceUri: string,
    options?: ChildAvailabilityStatusesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityStatus>;
  /** Gets current availability status for a single resource */
  getByResource: (
    resourceUri: string,
    options?: ChildAvailabilityStatusesGetByResourceOptionalParams,
  ) => Promise<AvailabilityStatus>;
}

function _getChildAvailabilityStatuses(context: MicrosoftResourceHealthContext) {
  return {
    list: (resourceUri: string, options?: ChildAvailabilityStatusesListOptionalParams) =>
      list(context, resourceUri, options),
    getByResource: (
      resourceUri: string,
      options?: ChildAvailabilityStatusesGetByResourceOptionalParams,
    ) => getByResource(context, resourceUri, options),
  };
}

export function _getChildAvailabilityStatusesOperations(
  context: MicrosoftResourceHealthContext,
): ChildAvailabilityStatusesOperations {
  return {
    ..._getChildAvailabilityStatuses(context),
  };
}
