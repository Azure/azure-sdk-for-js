// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/availableWorkloadProfiles/operations.js";
import { AvailableWorkloadProfilesListOptionalParams } from "../../api/availableWorkloadProfiles/options.js";
import { AvailableWorkloadProfile } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableWorkloadProfiles operations. */
export interface AvailableWorkloadProfilesOperations {
  /** Get all available workload profiles for a location. */
  list: (
    location: string,
    options?: AvailableWorkloadProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableWorkloadProfile>;
}

function _getAvailableWorkloadProfiles(context: ContainerAppsAPIContext) {
  return {
    list: (location: string, options?: AvailableWorkloadProfilesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailableWorkloadProfilesOperations(
  context: ContainerAppsAPIContext,
): AvailableWorkloadProfilesOperations {
  return {
    ..._getAvailableWorkloadProfiles(context),
  };
}
