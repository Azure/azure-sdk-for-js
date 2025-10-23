// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConvertToVirtualMachineScaleSetInput } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters supplied to the migrate operation on the availability set. */
  parameters?: ConvertToVirtualMachineScaleSetInput;
}

/** Optional parameters. */
export interface AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsListAvailableSizesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsListBySubscriptionOptionalParams extends OperationOptions {
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
}

/** Optional parameters. */
export interface AvailabilitySetsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilitySetsGetOptionalParams extends OperationOptions {}
