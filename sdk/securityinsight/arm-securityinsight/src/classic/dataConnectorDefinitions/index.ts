// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dataConnectorDefinitions/operations.js";
import type {
  DataConnectorDefinitionsListOptionalParams,
  DataConnectorDefinitionsDeleteOptionalParams,
  DataConnectorDefinitionsCreateOrUpdateOptionalParams,
  DataConnectorDefinitionsGetOptionalParams,
} from "../../api/dataConnectorDefinitions/options.js";
import type { DataConnectorDefinitionUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataConnectorDefinitions operations. */
export interface DataConnectorDefinitionsOperations {
  /** Gets all data connector definitions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DataConnectorDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<DataConnectorDefinitionUnion>;
  /** Delete the data connector definition. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorDefinitionName: string,
    options?: DataConnectorDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the data connector definition. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorDefinitionName: string,
    connectorDefinitionInput: DataConnectorDefinitionUnion,
    options?: DataConnectorDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<DataConnectorDefinitionUnion>;
  /** Gets a data connector definition. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dataConnectorDefinitionName: string,
    options?: DataConnectorDefinitionsGetOptionalParams,
  ) => Promise<DataConnectorDefinitionUnion>;
}

function _getDataConnectorDefinitions(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DataConnectorDefinitionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorDefinitionName: string,
      options?: DataConnectorDefinitionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, dataConnectorDefinitionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorDefinitionName: string,
      connectorDefinitionInput: DataConnectorDefinitionUnion,
      options?: DataConnectorDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dataConnectorDefinitionName,
        connectorDefinitionInput,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dataConnectorDefinitionName: string,
      options?: DataConnectorDefinitionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dataConnectorDefinitionName, options),
  };
}

export function _getDataConnectorDefinitionsOperations(
  context: SecurityInsightsContext,
): DataConnectorDefinitionsOperations {
  return {
    ..._getDataConnectorDefinitions(context),
  };
}
