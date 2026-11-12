// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listCloudServiceNetworkInterfaces,
  listVirtualMachineScaleSetIpConfigurations,
  getVirtualMachineScaleSetIpConfiguration,
  listVirtualMachineScaleSetNetworkInterfaces,
  listEffectiveNetworkSecurityGroups,
  getEffectiveRouteTable,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  listCloudServiceRoleInstanceNetworkInterfaces,
  getCloudServiceNetworkInterface,
} from "./operations.js";
export type {
  NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
  NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateTagsOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
  NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
  NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
} from "./options.js";
