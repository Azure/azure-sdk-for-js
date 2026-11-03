// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listVirtualMachineScaleSetPublicIPAddresses,
  listCloudServicePublicIPAddresses,
  disassociateCloudServiceReservedPublicIp,
  reserveCloudServicePublicIpAddress,
  ddosProtectionStatus,
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
  listVirtualMachineScaleSetVMPublicIPAddresses,
  getVirtualMachineScaleSetPublicIPAddress,
  listCloudServiceRoleInstancePublicIPAddresses,
  getCloudServicePublicIPAddress,
} from "./operations.js";
export type {
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams,
  PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams,
  PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  PublicIPAddressesDdosProtectionStatusOptionalParams,
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesGetOptionalParams,
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams,
  PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams,
} from "./options.js";
