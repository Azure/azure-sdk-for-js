// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listHealthDetails,
  getHealthDetails,
  listOutboundNetworkDependenciesEndpoints,
  runHealthChecks,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  NetworkConnectionsListHealthDetailsOptionalParams,
  NetworkConnectionsGetHealthDetailsOptionalParams,
  NetworkConnectionsListOutboundNetworkDependenciesEndpointsOptionalParams,
  NetworkConnectionsRunHealthChecksOptionalParams,
  NetworkConnectionsListBySubscriptionOptionalParams,
  NetworkConnectionsListByResourceGroupOptionalParams,
  NetworkConnectionsDeleteOptionalParams,
  NetworkConnectionsUpdateOptionalParams,
  NetworkConnectionsCreateOrUpdateOptionalParams,
  NetworkConnectionsGetOptionalParams,
} from "./options.js";
