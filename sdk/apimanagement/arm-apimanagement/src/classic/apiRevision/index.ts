// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/apiRevision/operations.js";
import { ApiRevisionListByServiceOptionalParams } from "../../api/apiRevision/options.js";
import { ApiRevisionContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiRevision operations. */
export interface ApiRevisionOperations {
  /** Lists all revisions of an API. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiRevisionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiRevisionContract>;
}

function _getApiRevision(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiRevisionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getApiRevisionOperations(context: ApiManagementContext): ApiRevisionOperations {
  return {
    ..._getApiRevision(context),
  };
}
