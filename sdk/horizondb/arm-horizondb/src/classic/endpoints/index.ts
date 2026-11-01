// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, get } from "../../api/endpoints/operations.js";
import type {
  EndpointsListOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import type { Endpoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
  /** Gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: HorizonDbContext) {
  return {
    list: (resourceGroupName: string, clusterName: string, options?: EndpointsListOptionalParams) =>
      list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, endpointName, options),
  };
}

export function _getEndpointsOperations(context: HorizonDbContext): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
