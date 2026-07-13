// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { list, get } from "../../api/projectAllowedEnvironmentTypes/operations.js";
import type {
  ProjectAllowedEnvironmentTypesListOptionalParams,
  ProjectAllowedEnvironmentTypesGetOptionalParams,
} from "../../api/projectAllowedEnvironmentTypes/options.js";
import type { AllowedEnvironmentType } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProjectAllowedEnvironmentTypes operations. */
export interface ProjectAllowedEnvironmentTypesOperations {
  /** Lists allowed environment types for a project. */
  list: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectAllowedEnvironmentTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<AllowedEnvironmentType>;
  /** Gets an allowed environment type. */
  get: (
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    options?: ProjectAllowedEnvironmentTypesGetOptionalParams,
  ) => Promise<AllowedEnvironmentType>;
}

function _getProjectAllowedEnvironmentTypes(context: DevCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectAllowedEnvironmentTypesListOptionalParams,
    ) => list(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      environmentTypeName: string,
      options?: ProjectAllowedEnvironmentTypesGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, environmentTypeName, options),
  };
}

export function _getProjectAllowedEnvironmentTypesOperations(
  context: DevCenterContext,
): ProjectAllowedEnvironmentTypesOperations {
  return {
    ..._getProjectAllowedEnvironmentTypes(context),
  };
}
