// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ExpandTypesForGetCapacityReservationGroups,
  CapacityReservationInstanceViewTypes,
} from "../../models/compute/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapacityReservationsListByCapacityReservationGroupOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response. */
  expand?: ExpandTypesForGetCapacityReservationGroups;
}

/** Optional parameters. */
export interface CapacityReservationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacityReservationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacityReservationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CapacityReservationsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' retrieves a snapshot of the runtime properties of the capacity reservation that is managed by the platform and can change outside of control plane operations. */
  expand?: CapacityReservationInstanceViewTypes;
}
