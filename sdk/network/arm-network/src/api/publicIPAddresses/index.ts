// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listCloudServicePublicIPAddresses,
  listVirtualMachineScaleSetVMPublicIPAddresses,
  getVirtualMachineScaleSetPublicIPAddress,
  listVirtualMachineScaleSetPublicIPAddresses,
  disassociateCloudServiceReservedPublicIp,
  reserveCloudServicePublicIpAddress,
  ddosProtectionStatus,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  listCloudServiceRoleInstancePublicIPAddresses,
  getCloudServicePublicIPAddress,
} from "./operations.js";
export type {
  PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams,
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams,
  PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  PublicIPAddressesDdosProtectionStatusOptionalParams,
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesGetOptionalParams,
  PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams,
  PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams,
} from "./options.js";
