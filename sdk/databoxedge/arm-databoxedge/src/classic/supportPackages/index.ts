// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { triggerSupportPackage } from "../../api/supportPackages/operations.js";
import type { SupportPackagesTriggerSupportPackageOptionalParams } from "../../api/supportPackages/options.js";
import type { TriggerSupportPackageRequest } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SupportPackages operations. */
export interface SupportPackagesOperations {
  /** Triggers support package on the device */
  triggerSupportPackage: (
    deviceName: string,
    resourceGroupName: string,
    triggerSupportPackageRequest: TriggerSupportPackageRequest,
    options?: SupportPackagesTriggerSupportPackageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use triggerSupportPackage instead */
  beginTriggerSupportPackage: (
    deviceName: string,
    resourceGroupName: string,
    triggerSupportPackageRequest: TriggerSupportPackageRequest,
    options?: SupportPackagesTriggerSupportPackageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use triggerSupportPackage instead */
  beginTriggerSupportPackageAndWait: (
    deviceName: string,
    resourceGroupName: string,
    triggerSupportPackageRequest: TriggerSupportPackageRequest,
    options?: SupportPackagesTriggerSupportPackageOptionalParams,
  ) => Promise<void>;
}

function _getSupportPackages(context: DataBoxEdgeManagementContext) {
  return {
    triggerSupportPackage: (
      deviceName: string,
      resourceGroupName: string,
      triggerSupportPackageRequest: TriggerSupportPackageRequest,
      options?: SupportPackagesTriggerSupportPackageOptionalParams,
    ) =>
      triggerSupportPackage(
        context,
        deviceName,
        resourceGroupName,
        triggerSupportPackageRequest,
        options,
      ),
    beginTriggerSupportPackage: async (
      deviceName: string,
      resourceGroupName: string,
      triggerSupportPackageRequest: TriggerSupportPackageRequest,
      options?: SupportPackagesTriggerSupportPackageOptionalParams,
    ) => {
      const poller = triggerSupportPackage(
        context,
        deviceName,
        resourceGroupName,
        triggerSupportPackageRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerSupportPackageAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      triggerSupportPackageRequest: TriggerSupportPackageRequest,
      options?: SupportPackagesTriggerSupportPackageOptionalParams,
    ) => {
      return await triggerSupportPackage(
        context,
        deviceName,
        resourceGroupName,
        triggerSupportPackageRequest,
        options,
      );
    },
  };
}

export function _getSupportPackagesOperations(
  context: DataBoxEdgeManagementContext,
): SupportPackagesOperations {
  return {
    ..._getSupportPackages(context),
  };
}
