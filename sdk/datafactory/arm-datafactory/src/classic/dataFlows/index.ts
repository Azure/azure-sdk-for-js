// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { listByFactory, $delete, createOrUpdate, get } from "../../api/dataFlows/operations.js";
import type {
  DataFlowsListByFactoryOptionalParams,
  DataFlowsDeleteOptionalParams,
  DataFlowsCreateOrUpdateOptionalParams,
  DataFlowsGetOptionalParams,
} from "../../api/dataFlows/options.js";
import type { DataFlowResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataFlows operations. */
export interface DataFlowsOperations {
  /** Lists data flows. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: DataFlowsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<DataFlowResource>;
  /** Deletes a data flow. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    dataFlowName: string,
    options?: DataFlowsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a data flow. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options?: DataFlowsCreateOrUpdateOptionalParams,
  ) => Promise<DataFlowResource>;
  /** Gets a data flow. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    dataFlowName: string,
    options?: DataFlowsGetOptionalParams,
  ) => Promise<DataFlowResource>;
}

function _getDataFlows(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: DataFlowsListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      dataFlowName: string,
      options?: DataFlowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, dataFlowName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      dataFlowName: string,
      dataFlow: DataFlowResource,
      options?: DataFlowsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, factoryName, dataFlowName, dataFlow, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      dataFlowName: string,
      options?: DataFlowsGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, dataFlowName, options),
  };
}

export function _getDataFlowsOperations(
  context: DataFactoryManagementContext,
): DataFlowsOperations {
  return {
    ..._getDataFlows(context),
  };
}
