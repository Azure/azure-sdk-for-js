// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  convertToVirtualMachineScaleSet,
  validateMigrationToVirtualMachineScaleSet,
  cancelMigrationToVirtualMachineScaleSet,
  startMigrationToVirtualMachineScaleSet,
  listAvailableSizes,
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/availabilitySets/operations.js";
import type {
  AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsListAvailableSizesOptionalParams,
  AvailabilitySetsListBySubscriptionOptionalParams,
  AvailabilitySetsListOptionalParams,
  AvailabilitySetsDeleteOptionalParams,
  AvailabilitySetsUpdateOptionalParams,
  AvailabilitySetsCreateOrUpdateOptionalParams,
  AvailabilitySetsGetOptionalParams,
} from "../../api/availabilitySets/options.js";
import type {
  VirtualMachineSize,
  AvailabilitySet,
  AvailabilitySetUpdate,
  MigrateToVirtualMachineScaleSetInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvailabilitySets operations. */
export interface AvailabilitySetsOperations {
  /** Create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines. */
  convertToVirtualMachineScaleSet: (
    resourceGroupName: string,
    availabilitySetName: string,
    options?: AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set. */
  validateMigrationToVirtualMachineScaleSet: (
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: MigrateToVirtualMachineScaleSetInput,
    options?: AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams,
  ) => Promise<void>;
  /** Cancel the migration operation on an Availability Set. */
  cancelMigrationToVirtualMachineScaleSet: (
    resourceGroupName: string,
    availabilitySetName: string,
    options?: AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams,
  ) => Promise<void>;
  /** Start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine. */
  startMigrationToVirtualMachineScaleSet: (
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: MigrateToVirtualMachineScaleSetInput,
    options?: AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams,
  ) => Promise<void>;
  /** Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set. */
  listAvailableSizes: (
    resourceGroupName: string,
    availabilitySetName: string,
    options?: AvailabilitySetsListAvailableSizesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineSize>;
  /** Lists all availability sets in a subscription. */
  listBySubscription: (
    options?: AvailabilitySetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilitySet>;
  /** Lists all availability sets in a resource group. */
  list: (
    resourceGroupName: string,
    options?: AvailabilitySetsListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailabilitySet>;
  /** Delete an availability set. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    availabilitySetName: string,
    options?: AvailabilitySetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an availability set. */
  update: (
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: AvailabilitySetUpdate,
    options?: AvailabilitySetsUpdateOptionalParams,
  ) => Promise<AvailabilitySet>;
  /** Create or update an availability set. */
  createOrUpdate: (
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: AvailabilitySet,
    options?: AvailabilitySetsCreateOrUpdateOptionalParams,
  ) => Promise<AvailabilitySet>;
  /** Retrieves information about an availability set. */
  get: (
    resourceGroupName: string,
    availabilitySetName: string,
    options?: AvailabilitySetsGetOptionalParams,
  ) => Promise<AvailabilitySet>;
}

function _getAvailabilitySets(context: ComputeManagementContext) {
  return {
    convertToVirtualMachineScaleSet: (
      resourceGroupName: string,
      availabilitySetName: string,
      options?: AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams,
    ) => convertToVirtualMachineScaleSet(context, resourceGroupName, availabilitySetName, options),
    validateMigrationToVirtualMachineScaleSet: (
      resourceGroupName: string,
      availabilitySetName: string,
      parameters: MigrateToVirtualMachineScaleSetInput,
      options?: AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams,
    ) =>
      validateMigrationToVirtualMachineScaleSet(
        context,
        resourceGroupName,
        availabilitySetName,
        parameters,
        options,
      ),
    cancelMigrationToVirtualMachineScaleSet: (
      resourceGroupName: string,
      availabilitySetName: string,
      options?: AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams,
    ) =>
      cancelMigrationToVirtualMachineScaleSet(
        context,
        resourceGroupName,
        availabilitySetName,
        options,
      ),
    startMigrationToVirtualMachineScaleSet: (
      resourceGroupName: string,
      availabilitySetName: string,
      parameters: MigrateToVirtualMachineScaleSetInput,
      options?: AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams,
    ) =>
      startMigrationToVirtualMachineScaleSet(
        context,
        resourceGroupName,
        availabilitySetName,
        parameters,
        options,
      ),
    listAvailableSizes: (
      resourceGroupName: string,
      availabilitySetName: string,
      options?: AvailabilitySetsListAvailableSizesOptionalParams,
    ) => listAvailableSizes(context, resourceGroupName, availabilitySetName, options),
    listBySubscription: (options?: AvailabilitySetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: AvailabilitySetsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      availabilitySetName: string,
      options?: AvailabilitySetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, availabilitySetName, options),
    update: (
      resourceGroupName: string,
      availabilitySetName: string,
      parameters: AvailabilitySetUpdate,
      options?: AvailabilitySetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, availabilitySetName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      availabilitySetName: string,
      parameters: AvailabilitySet,
      options?: AvailabilitySetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, availabilitySetName, parameters, options),
    get: (
      resourceGroupName: string,
      availabilitySetName: string,
      options?: AvailabilitySetsGetOptionalParams,
    ) => get(context, resourceGroupName, availabilitySetName, options),
  };
}

export function _getAvailabilitySetsOperations(
  context: ComputeManagementContext,
): AvailabilitySetsOperations {
  return {
    ..._getAvailabilitySets(context),
  };
}
