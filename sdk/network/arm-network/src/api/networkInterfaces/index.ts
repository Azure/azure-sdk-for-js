// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listVirtualMachineScaleSetNetworkInterfaces,
  listCloudServiceNetworkInterfaces,
  listVirtualMachineScaleSetIpConfigurations,
  getVirtualMachineScaleSetIpConfiguration,
  listEffectiveNetworkSecurityGroups,
  getEffectiveRouteTable,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  listVirtualMachineScaleSetVMNetworkInterfaces,
  getVirtualMachineScaleSetNetworkInterface,
  listCloudServiceRoleInstanceNetworkInterfaces,
  getCloudServiceNetworkInterface,
} from "./operations.js";
export type {
  NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesOptionalParams,
  NetworkInterfacesListCloudServiceNetworkInterfacesOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationOptionalParams,
  NetworkInterfacesListEffectiveNetworkSecurityGroupsOptionalParams,
  NetworkInterfacesGetEffectiveRouteTableOptionalParams,
  NetworkInterfacesListAllOptionalParams,
  NetworkInterfacesListOptionalParams,
  NetworkInterfacesDeleteOptionalParams,
  NetworkInterfacesUpdateTagsOptionalParams,
  NetworkInterfacesCreateOrUpdateOptionalParams,
  NetworkInterfacesGetOptionalParams,
  NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesOptionalParams,
  NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceOptionalParams,
  NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesOptionalParams,
  NetworkInterfacesGetCloudServiceNetworkInterfaceOptionalParams,
} from "./options.js";
