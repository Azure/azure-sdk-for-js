// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScheduledActionsTriggerManualOccurrenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsCancelNextOccurrenceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsEnableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsDisableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsPatchResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsDetachResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsAttachResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsListResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScheduledActionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScheduledActionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesCancelOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesExecuteCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesExecuteStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesSubmitStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams extends OperationOptions {}
