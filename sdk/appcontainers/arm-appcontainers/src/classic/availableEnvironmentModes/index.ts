// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/availableEnvironmentModes/operations.js";
import type { AvailableEnvironmentModesListOptionalParams } from "../../api/availableEnvironmentModes/options.js";
import type { AvailableEnvironmentMode } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableEnvironmentModes operations. */
export interface AvailableEnvironmentModesOperations {
  /** Gets the environment modes available to a subscription in a location. */
  list: (
    location: string,
    options?: AvailableEnvironmentModesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableEnvironmentMode>;
}

function _getAvailableEnvironmentModes(context: ContainerAppsAPIContext) {
  return {
    list: (location: string, options?: AvailableEnvironmentModesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailableEnvironmentModesOperations(
  context: ContainerAppsAPIContext,
): AvailableEnvironmentModesOperations {
  return {
    ..._getAvailableEnvironmentModes(context),
  };
}
