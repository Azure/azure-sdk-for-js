// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  getLatest,
  cancel,
  startOSUpgrade,
  startExtensionUpgrade,
} from "../../api/virtualMachineScaleSetRollingUpgrades/operations.js";
import type {
  VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams,
  VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
} from "../../api/virtualMachineScaleSetRollingUpgrades/options.js";
import type { RollingUpgradeStatusInfo } from "../../models/compute/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualMachineScaleSetRollingUpgrades operations. */
export interface VirtualMachineScaleSetRollingUpgradesOperations {
  /** Gets the status of the latest virtual machine scale set rolling upgrade. */
  getLatest: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams,
  ) => Promise<RollingUpgradeStatusInfo>;
  /** Cancels the current virtual machine scale set rolling upgrade. */
  cancel: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
  ) => Promise<void>;
  /** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
  startOSUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startOSUpgrade instead */
  beginStartOSUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startOSUpgrade instead */
  beginStartOSUpgradeAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
  ) => Promise<void>;
  /** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
  startExtensionUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startExtensionUpgrade instead */
  beginStartExtensionUpgrade: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startExtensionUpgrade instead */
  beginStartExtensionUpgradeAndWait: (
    resourceGroupName: string,
    vmScaleSetName: string,
    options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
  ) => Promise<void>;
}

function _getVirtualMachineScaleSetRollingUpgrades(context: ComputeContext) {
  return {
    getLatest: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams,
    ) => getLatest(context, resourceGroupName, vmScaleSetName, options),
    cancel: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
    ) => cancel(context, resourceGroupName, vmScaleSetName, options),
    beginCancel: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, vmScaleSetName, options);
    },
    startOSUpgrade: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
    ) => startOSUpgrade(context, resourceGroupName, vmScaleSetName, options),
    beginStartOSUpgrade: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
    ) => {
      const poller = startOSUpgrade(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartOSUpgradeAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
    ) => {
      return await startOSUpgrade(context, resourceGroupName, vmScaleSetName, options);
    },
    startExtensionUpgrade: (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
    ) => startExtensionUpgrade(context, resourceGroupName, vmScaleSetName, options),
    beginStartExtensionUpgrade: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
    ) => {
      const poller = startExtensionUpgrade(context, resourceGroupName, vmScaleSetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartExtensionUpgradeAndWait: async (
      resourceGroupName: string,
      vmScaleSetName: string,
      options?: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
    ) => {
      return await startExtensionUpgrade(context, resourceGroupName, vmScaleSetName, options);
    },
  };
}

export function _getVirtualMachineScaleSetRollingUpgradesOperations(
  context: ComputeContext,
): VirtualMachineScaleSetRollingUpgradesOperations {
  return {
    ..._getVirtualMachineScaleSetRollingUpgrades(context),
  };
}
