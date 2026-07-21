// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listByResourceGroup,
  list,
  getOutboundNetworkDependenciesEndpoints,
  start,
  stop,
  restart,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ContainerGroupsListByResourceGroupOptionalParams,
  ContainerGroupsListOptionalParams,
  ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams,
  ContainerGroupsStartOptionalParams,
  ContainerGroupsStopOptionalParams,
  ContainerGroupsRestartOptionalParams,
  ContainerGroupsDeleteOptionalParams,
  ContainerGroupsUpdateOptionalParams,
  ContainerGroupsCreateOrUpdateOptionalParams,
  ContainerGroupsGetOptionalParams,
} from "./options.js";
