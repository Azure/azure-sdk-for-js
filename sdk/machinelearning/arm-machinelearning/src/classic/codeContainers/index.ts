// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/codeContainers/operations.js";
import type {
  CodeContainersListOptionalParams,
  CodeContainersDeleteOptionalParams,
  CodeContainersCreateOrUpdateOptionalParams,
  CodeContainersGetOptionalParams,
} from "../../api/codeContainers/options.js";
import type { CodeContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CodeContainers operations. */
export interface CodeContainersOperations {
  /** List containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: CodeContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<CodeContainer>;
  /** Delete container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CodeContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: CodeContainer,
    options?: CodeContainersCreateOrUpdateOptionalParams,
  ) => Promise<CodeContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CodeContainersGetOptionalParams,
  ) => Promise<CodeContainer>;
}

function _getCodeContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: CodeContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CodeContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: CodeContainer,
      options?: CodeContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CodeContainersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getCodeContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): CodeContainersOperations {
  return {
    ..._getCodeContainers(context),
  };
}
