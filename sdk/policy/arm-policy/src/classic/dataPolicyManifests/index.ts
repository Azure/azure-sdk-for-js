// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext } from "../../api/policyContext.js";
import { list, getByPolicyMode } from "../../api/dataPolicyManifests/operations.js";
import type {
  DataPolicyManifestsListOptionalParams,
  DataPolicyManifestsGetByPolicyModeOptionalParams,
} from "../../api/dataPolicyManifests/options.js";
import type { DataPolicyManifest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataPolicyManifests operations. */
export interface DataPolicyManifestsOperations {
  /** This operation retrieves a list of all the data policy manifests that match the optional given $filter. Valid values for $filter are: \"$filter=namespace eq '{0}'\". If $filter is not provided, the unfiltered list includes all data policy manifests for data resource types. If $filter=namespace is provided, the returned list only includes all data policy manifests that have a namespace matching the provided value. */
  list: (
    options?: DataPolicyManifestsListOptionalParams,
  ) => PagedAsyncIterableIterator<DataPolicyManifest>;
  /** This operation retrieves the data policy manifest with the given policy mode. */
  getByPolicyMode: (
    policyMode: string,
    options?: DataPolicyManifestsGetByPolicyModeOptionalParams,
  ) => Promise<DataPolicyManifest>;
}

function _getDataPolicyManifests(context: PolicyContext) {
  return {
    list: (options?: DataPolicyManifestsListOptionalParams) => list(context, options),
    getByPolicyMode: (
      policyMode: string,
      options?: DataPolicyManifestsGetByPolicyModeOptionalParams,
    ) => getByPolicyMode(context, policyMode, options),
  };
}

export function _getDataPolicyManifestsOperations(
  context: PolicyContext,
): DataPolicyManifestsOperations {
  return {
    ..._getDataPolicyManifests(context),
  };
}
