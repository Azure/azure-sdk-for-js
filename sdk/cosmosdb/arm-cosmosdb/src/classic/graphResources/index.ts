// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  listGraphs,
  deleteGraphResource,
  createUpdateGraph,
  getGraph,
} from "../../api/graphResources/operations.js";
import type {
  GraphResourcesListGraphsOptionalParams,
  GraphResourcesDeleteGraphResourceOptionalParams,
  GraphResourcesCreateUpdateGraphOptionalParams,
  GraphResourcesGetGraphOptionalParams,
} from "../../api/graphResources/options.js";
import type {
  GraphResourceGetResults,
  GraphResourceCreateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GraphResources operations. */
export interface GraphResourcesOperations {
  /** Lists the graphs under an existing Azure Cosmos DB database account. */
  listGraphs: (
    resourceGroupName: string,
    accountName: string,
    options?: GraphResourcesListGraphsOptionalParams,
  ) => PagedAsyncIterableIterator<GraphResourceGetResults>;
  /** Deletes an existing Azure Cosmos DB Graph Resource. */
  deleteGraphResource: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesDeleteGraphResourceOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteGraphResource instead */
  beginDeleteGraphResource: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesDeleteGraphResourceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteGraphResource instead */
  beginDeleteGraphResourceAndWait: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesDeleteGraphResourceOptionalParams,
  ) => Promise<void>;
  /** Create or update an Azure Cosmos DB Graph. */
  createUpdateGraph: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
    options?: GraphResourcesCreateUpdateGraphOptionalParams,
  ) => PollerLike<OperationState<GraphResourceGetResults>, GraphResourceGetResults>;
  /** @deprecated use createUpdateGraph instead */
  beginCreateUpdateGraph: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
    options?: GraphResourcesCreateUpdateGraphOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GraphResourceGetResults>, GraphResourceGetResults>>;
  /** @deprecated use createUpdateGraph instead */
  beginCreateUpdateGraphAndWait: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
    options?: GraphResourcesCreateUpdateGraphOptionalParams,
  ) => Promise<GraphResourceGetResults>;
  /** Gets the Graph resource under an existing Azure Cosmos DB database account with the provided name. */
  getGraph: (
    resourceGroupName: string,
    accountName: string,
    graphName: string,
    options?: GraphResourcesGetGraphOptionalParams,
  ) => Promise<GraphResourceGetResults>;
}

function _getGraphResources(context: CosmosDBManagementContext) {
  return {
    listGraphs: (
      resourceGroupName: string,
      accountName: string,
      options?: GraphResourcesListGraphsOptionalParams,
    ) => listGraphs(context, resourceGroupName, accountName, options),
    deleteGraphResource: (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      options?: GraphResourcesDeleteGraphResourceOptionalParams,
    ) => deleteGraphResource(context, resourceGroupName, accountName, graphName, options),
    beginDeleteGraphResource: async (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      options?: GraphResourcesDeleteGraphResourceOptionalParams,
    ) => {
      const poller = deleteGraphResource(
        context,
        resourceGroupName,
        accountName,
        graphName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteGraphResourceAndWait: async (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      options?: GraphResourcesDeleteGraphResourceOptionalParams,
    ) => {
      return await deleteGraphResource(context, resourceGroupName, accountName, graphName, options);
    },
    createUpdateGraph: (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
      options?: GraphResourcesCreateUpdateGraphOptionalParams,
    ) =>
      createUpdateGraph(
        context,
        resourceGroupName,
        accountName,
        graphName,
        createUpdateGraphParameters,
        options,
      ),
    beginCreateUpdateGraph: async (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
      options?: GraphResourcesCreateUpdateGraphOptionalParams,
    ) => {
      const poller = createUpdateGraph(
        context,
        resourceGroupName,
        accountName,
        graphName,
        createUpdateGraphParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateGraphAndWait: async (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      createUpdateGraphParameters: GraphResourceCreateUpdateParameters,
      options?: GraphResourcesCreateUpdateGraphOptionalParams,
    ) => {
      return await createUpdateGraph(
        context,
        resourceGroupName,
        accountName,
        graphName,
        createUpdateGraphParameters,
        options,
      );
    },
    getGraph: (
      resourceGroupName: string,
      accountName: string,
      graphName: string,
      options?: GraphResourcesGetGraphOptionalParams,
    ) => getGraph(context, resourceGroupName, accountName, graphName, options),
  };
}

export function _getGraphResourcesOperations(
  context: CosmosDBManagementContext,
): GraphResourcesOperations {
  return {
    ..._getGraphResources(context),
  };
}
