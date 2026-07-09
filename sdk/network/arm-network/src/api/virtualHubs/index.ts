// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getOutboundRoutes,
  getInboundRoutes,
  getEffectiveVirtualHubRoutes,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VirtualHubsGetOutboundRoutesOptionalParams,
  VirtualHubsGetInboundRoutesOptionalParams,
  VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  VirtualHubsListOptionalParams,
  VirtualHubsListByResourceGroupOptionalParams,
  VirtualHubsDeleteOptionalParams,
  VirtualHubsUpdateTagsOptionalParams,
  VirtualHubsCreateOrUpdateOptionalParams,
  VirtualHubsGetOptionalParams,
} from "./options.js";
