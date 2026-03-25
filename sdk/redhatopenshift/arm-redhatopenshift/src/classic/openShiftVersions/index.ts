// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext } from "../../api/azureRedHatOpenShiftContext.js";
import { list, get } from "../../api/openShiftVersions/operations.js";
import type {
  OpenShiftVersionsListOptionalParams,
  OpenShiftVersionsGetOptionalParams,
} from "../../api/openShiftVersions/options.js";
import type { OpenShiftVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OpenShiftVersions operations. */
export interface OpenShiftVersionsOperations {
  /** The operation returns the installable OpenShift versions as a string. */
  list: (
    location: string,
    options?: OpenShiftVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<OpenShiftVersion>;
  /** This operation returns installable OpenShift version as a string. */
  get: (
    location: string,
    openShiftVersion: string,
    options?: OpenShiftVersionsGetOptionalParams,
  ) => Promise<OpenShiftVersion>;
}

function _getOpenShiftVersions(context: AzureRedHatOpenShiftContext) {
  return {
    list: (location: string, options?: OpenShiftVersionsListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      openShiftVersion: string,
      options?: OpenShiftVersionsGetOptionalParams,
    ) => get(context, location, openShiftVersion, options),
  };
}

export function _getOpenShiftVersionsOperations(
  context: AzureRedHatOpenShiftContext,
): OpenShiftVersionsOperations {
  return {
    ..._getOpenShiftVersions(context),
  };
}
