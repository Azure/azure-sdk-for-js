// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Endpoint } from "../../models/models.js";
import { EndpointsListOptionalParams } from "../../api/endpoints/options.js";
import { list } from "../../api/endpoints/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** List Endpoint resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
}

function _getEndpoints(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: EndpointsListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
  };
}

export function _getEndpointsOperations(
  context: PostgresContext,
): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
