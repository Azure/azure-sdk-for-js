// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import { list } from "../../api/childResources/operations.js";
import { ChildResourcesListOptionalParams } from "../../api/childResources/options.js";
import { AvailabilityStatus } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ChildResources operations. */
export interface ChildResourcesOperations {
  /** Lists the all the children and its current health status for a parent resource. Use the nextLink property in the response to get the next page of children current health */
  list: (
    resourceUri: string,
    options?: ChildResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilityStatus>;
}

function _getChildResources(context: MicrosoftResourceHealthContext) {
  return {
    list: (resourceUri: string, options?: ChildResourcesListOptionalParams) =>
      list(context, resourceUri, options),
  };
}

export function _getChildResourcesOperations(
  context: MicrosoftResourceHealthContext,
): ChildResourcesOperations {
  return {
    ..._getChildResources(context),
  };
}
