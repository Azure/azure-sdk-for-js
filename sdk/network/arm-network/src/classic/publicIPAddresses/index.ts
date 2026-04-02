// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
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
} from "../../api/publicIPAddresses/operations.js";
import type {
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
} from "../../api/publicIPAddresses/options.js";
import type {
  PublicIPAddress,
  TagsObject,
  PublicIpDdosProtectionStatusResult,
  ReserveCloudServicePublicIpAddressRequest,
  DisassociateCloudServicePublicIpRequest,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PublicIPAddresses operations. */
export interface PublicIPAddressesOperations {
  /** Gets information about all public IP addresses on a virtual machine scale set level. */
  listVirtualMachineScaleSetPublicIPAddresses: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Gets information about all public IP addresses on a cloud service level. */
  listCloudServicePublicIPAddresses: (
    resourceGroupName: string,
    cloudServiceName: string,
    options?: PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Disassociates the Cloud Service reserved Public IP and associates the specified Standalone Public IP to the same Cloud Service frontend. */
  disassociateCloudServiceReservedPublicIp: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: DisassociateCloudServicePublicIpRequest,
    options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  ) => PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
  /** @deprecated use disassociateCloudServiceReservedPublicIp instead */
  beginDisassociateCloudServiceReservedPublicIp: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: DisassociateCloudServicePublicIpRequest,
    options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PublicIPAddress>, PublicIPAddress>>;
  /** @deprecated use disassociateCloudServiceReservedPublicIp instead */
  beginDisassociateCloudServiceReservedPublicIpAndWait: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: DisassociateCloudServicePublicIpRequest,
    options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic. */
  reserveCloudServicePublicIpAddress: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: ReserveCloudServicePublicIpAddressRequest,
    options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  ) => PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
  /** @deprecated use reserveCloudServicePublicIpAddress instead */
  beginReserveCloudServicePublicIpAddress: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: ReserveCloudServicePublicIpAddressRequest,
    options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PublicIPAddress>, PublicIPAddress>>;
  /** @deprecated use reserveCloudServicePublicIpAddress instead */
  beginReserveCloudServicePublicIpAddressAndWait: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: ReserveCloudServicePublicIpAddressRequest,
    options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Gets the Ddos Protection Status of a Public IP Address */
  ddosProtectionStatus: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
  ) => PollerLike<
    OperationState<PublicIpDdosProtectionStatusResult>,
    PublicIpDdosProtectionStatusResult
  >;
  /** @deprecated use ddosProtectionStatus instead */
  beginDdosProtectionStatus: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PublicIpDdosProtectionStatusResult>,
      PublicIpDdosProtectionStatusResult
    >
  >;
  /** @deprecated use ddosProtectionStatus instead */
  beginDdosProtectionStatusAndWait: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
  ) => Promise<PublicIpDdosProtectionStatusResult>;
  /** Gets all the public IP addresses in a subscription. */
  listAll: (
    options?: PublicIPAddressesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Gets all public IP addresses in a resource group. */
  list: (
    resourceGroupName: string,
    options?: PublicIPAddressesListOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Deletes the specified public IP address. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates public IP address tags. */
  updateTags: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: TagsObject,
    options?: PublicIPAddressesUpdateTagsOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Creates or updates a static or dynamic public IP address. */
  createOrUpdate: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PublicIPAddress>, PublicIPAddress>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: PublicIPAddressesCreateOrUpdateOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Gets the specified public IP address in a specified resource group. */
  get: (
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set. */
  listVirtualMachineScaleSetVMPublicIPAddresses: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Get the specified public IP address in a virtual machine scale set. */
  getVirtualMachineScaleSetPublicIPAddress: (
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  ) => Promise<PublicIPAddress>;
  /** Gets information about all public IP addresses in a role instance IP configuration in a cloud service. */
  listCloudServiceRoleInstancePublicIPAddresses: (
    resourceGroupName: string,
    cloudServiceName: string,
    roleInstanceName: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams,
  ) => PagedAsyncIterableIterator<PublicIPAddress>;
  /** Get the specified public IP address in a cloud service. */
  getCloudServicePublicIPAddress: (
    resourceGroupName: string,
    cloudServiceName: string,
    roleInstanceName: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams,
  ) => Promise<PublicIPAddress>;
}

function _getPublicIPAddresses(context: NetworkManagementContext) {
  return {
    listVirtualMachineScaleSetPublicIPAddresses: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      options?: PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesOptionalParams,
    ) =>
      listVirtualMachineScaleSetPublicIPAddresses(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        options,
      ),
    listCloudServicePublicIPAddresses: (
      resourceGroupName: string,
      cloudServiceName: string,
      options?: PublicIPAddressesListCloudServicePublicIPAddressesOptionalParams,
    ) => listCloudServicePublicIPAddresses(context, resourceGroupName, cloudServiceName, options),
    disassociateCloudServiceReservedPublicIp: (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: DisassociateCloudServicePublicIpRequest,
      options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
    ) =>
      disassociateCloudServiceReservedPublicIp(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      ),
    beginDisassociateCloudServiceReservedPublicIp: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: DisassociateCloudServicePublicIpRequest,
      options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
    ) => {
      const poller = disassociateCloudServiceReservedPublicIp(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisassociateCloudServiceReservedPublicIpAndWait: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: DisassociateCloudServicePublicIpRequest,
      options?: PublicIPAddressesDisassociateCloudServiceReservedPublicIpOptionalParams,
    ) => {
      return await disassociateCloudServiceReservedPublicIp(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
    },
    reserveCloudServicePublicIpAddress: (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: ReserveCloudServicePublicIpAddressRequest,
      options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
    ) =>
      reserveCloudServicePublicIpAddress(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      ),
    beginReserveCloudServicePublicIpAddress: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: ReserveCloudServicePublicIpAddressRequest,
      options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
    ) => {
      const poller = reserveCloudServicePublicIpAddress(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReserveCloudServicePublicIpAddressAndWait: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: ReserveCloudServicePublicIpAddressRequest,
      options?: PublicIPAddressesReserveCloudServicePublicIpAddressOptionalParams,
    ) => {
      return await reserveCloudServicePublicIpAddress(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
    },
    ddosProtectionStatus: (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
    ) => ddosProtectionStatus(context, resourceGroupName, publicIpAddressName, options),
    beginDdosProtectionStatus: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
    ) => {
      const poller = ddosProtectionStatus(context, resourceGroupName, publicIpAddressName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDdosProtectionStatusAndWait: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDdosProtectionStatusOptionalParams,
    ) => {
      return await ddosProtectionStatus(context, resourceGroupName, publicIpAddressName, options);
    },
    listAll: (options?: PublicIPAddressesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: PublicIPAddressesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, publicIpAddressName, options),
    beginDelete: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, publicIpAddressName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, publicIpAddressName, options);
    },
    updateTags: (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: TagsObject,
      options?: PublicIPAddressesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, publicIpAddressName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: PublicIPAddress,
      options?: PublicIPAddressesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, publicIpAddressName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: PublicIPAddress,
      options?: PublicIPAddressesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      publicIpAddressName: string,
      parameters: PublicIPAddress,
      options?: PublicIPAddressesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        publicIpAddressName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesGetOptionalParams,
    ) => get(context, resourceGroupName, publicIpAddressName, options),
    listVirtualMachineScaleSetVMPublicIPAddresses: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      options?: PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesOptionalParams,
    ) =>
      listVirtualMachineScaleSetVMPublicIPAddresses(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    getVirtualMachineScaleSetPublicIPAddress: (
      resourceGroupName: string,
      virtualMachineScaleSetName: string,
      virtualmachineIndex: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
    ) =>
      getVirtualMachineScaleSetPublicIPAddress(
        context,
        resourceGroupName,
        virtualMachineScaleSetName,
        virtualmachineIndex,
        networkInterfaceName,
        ipConfigurationName,
        publicIpAddressName,
        options,
      ),
    listCloudServiceRoleInstancePublicIPAddresses: (
      resourceGroupName: string,
      cloudServiceName: string,
      roleInstanceName: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      options?: PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesOptionalParams,
    ) =>
      listCloudServiceRoleInstancePublicIPAddresses(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        networkInterfaceName,
        ipConfigurationName,
        options,
      ),
    getCloudServicePublicIPAddress: (
      resourceGroupName: string,
      cloudServiceName: string,
      roleInstanceName: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      publicIpAddressName: string,
      options?: PublicIPAddressesGetCloudServicePublicIPAddressOptionalParams,
    ) =>
      getCloudServicePublicIPAddress(
        context,
        resourceGroupName,
        cloudServiceName,
        roleInstanceName,
        networkInterfaceName,
        ipConfigurationName,
        publicIpAddressName,
        options,
      ),
  };
}

export function _getPublicIPAddressesOperations(
  context: NetworkManagementContext,
): PublicIPAddressesOperations {
  return {
    ..._getPublicIPAddresses(context),
  };
}
