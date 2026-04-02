// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, update, create, get } from "../../api/projectConnections/operations.js";
import type {
  ProjectConnectionsListOptionalParams,
  ProjectConnectionsDeleteOptionalParams,
  ProjectConnectionsUpdateOptionalParams,
  ProjectConnectionsCreateOptionalParams,
  ProjectConnectionsGetOptionalParams,
} from "../../api/projectConnections/options.js";
import type { ConnectionPropertiesV2BasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProjectConnections operations. */
export interface ProjectConnectionsOperations {
  /** Lists all the available Cognitive Services project connections under the specified project. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectionPropertiesV2BasicResource>;
  /** Delete Cognitive Services project connection by name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    connectionName: string,
    options?: ProjectConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update Cognitive Services project connection under the specified project. */
  update: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    connectionName: string,
    options?: ProjectConnectionsUpdateOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
  /** Create or update Cognitive Services project connection under the specified project. */
  create: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    connectionName: string,
    options?: ProjectConnectionsCreateOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
  /** Lists Cognitive Services project connection by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    connectionName: string,
    options?: ProjectConnectionsGetOptionalParams,
  ) => Promise<ConnectionPropertiesV2BasicResource>;
}

function _getProjectConnections(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      connectionName: string,
      options?: ProjectConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, connectionName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      connectionName: string,
      options?: ProjectConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, projectName, connectionName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      connectionName: string,
      options?: ProjectConnectionsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, projectName, connectionName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      connectionName: string,
      options?: ProjectConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, connectionName, options),
  };
}

export function _getProjectConnectionsOperations(
  context: CognitiveServicesManagementContext,
): ProjectConnectionsOperations {
  return {
    ..._getProjectConnections(context),
  };
}
