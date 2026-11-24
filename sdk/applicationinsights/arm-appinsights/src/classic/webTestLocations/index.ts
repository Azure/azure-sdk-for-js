// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { list } from "../../api/webTestLocations/operations.js";
import type { WebTestLocationsListOptionalParams } from "../../api/webTestLocations/options.js";
import type { ApplicationInsightsComponentWebTestLocation } from "../../models/webTestLocation/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WebTestLocations operations. */
export interface WebTestLocationsOperations {
  /** Gets a list of web test locations available to this Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebTestLocationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationInsightsComponentWebTestLocation>;
}

function _getWebTestLocations(context: ApplicationInsightsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebTestLocationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getWebTestLocationsOperations(
  context: ApplicationInsightsManagementContext,
): WebTestLocationsOperations {
  return {
    ..._getWebTestLocations(context),
  };
}
