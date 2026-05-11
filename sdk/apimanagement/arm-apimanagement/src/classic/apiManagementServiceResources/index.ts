// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { performConnectivityCheckAsync } from "../../api/apiManagementServiceResources/operations.js";
import { ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams } from "../../api/apiManagementServiceResources/options.js";
import { ConnectivityCheckRequest, ConnectivityCheckResponse } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiManagementServiceResources operations. */
export interface ApiManagementServiceResourcesOperations {
  /** Performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it. */
  performConnectivityCheckAsync: (
    resourceGroupName: string,
    serviceName: string,
    connectivityCheckRequestParams: ConnectivityCheckRequest,
    options?: ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams,
  ) => PollerLike<OperationState<ConnectivityCheckResponse>, ConnectivityCheckResponse>;
}

function _getApiManagementServiceResources(context: ApiManagementContext) {
  return {
    performConnectivityCheckAsync: (
      resourceGroupName: string,
      serviceName: string,
      connectivityCheckRequestParams: ConnectivityCheckRequest,
      options?: ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams,
    ) =>
      performConnectivityCheckAsync(
        context,
        resourceGroupName,
        serviceName,
        connectivityCheckRequestParams,
        options,
      ),
  };
}

export function _getApiManagementServiceResourcesOperations(
  context: ApiManagementContext,
): ApiManagementServiceResourcesOperations {
  return {
    ..._getApiManagementServiceResources(context),
  };
}
