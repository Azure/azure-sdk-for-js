// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  moveIpConfigurations,
  listDdosProtectionStatus,
  listUsage,
  checkIPAddressAvailability,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  VirtualNetworksMoveIpConfigurationsOptionalParams,
  VirtualNetworksListDdosProtectionStatusOptionalParams,
  VirtualNetworksListUsageOptionalParams,
  VirtualNetworksCheckIPAddressAvailabilityOptionalParams,
  VirtualNetworksListAllOptionalParams,
  VirtualNetworksListOptionalParams,
  VirtualNetworksDeleteOptionalParams,
  VirtualNetworksUpdateTagsOptionalParams,
  VirtualNetworksCreateOrUpdateOptionalParams,
  VirtualNetworksGetOptionalParams,
} from "./options.js";
