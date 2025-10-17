// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CapacityReservationGroupInstanceViewTypes,
  ExpandTypesForGetCapacityReservationGroups,
  ResourceIdOptionsForGetCapacityReservationGroups,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapacityReservationGroupsListBySubscriptionOptionalParams
  extends OperationOptions {
  /** The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response. */
  expand?: ExpandTypesForGetCapacityReservationGroups;
  /** The query option to fetch Capacity Reservation Group Resource Ids. <br> 'CreatedInSubscription' enables fetching Resource Ids for all capacity reservation group resources created in the subscription. <br> 'SharedWithSubscription' enables fetching Resource Ids for all capacity reservation group resources shared with the subscription. <br> 'All' enables fetching Resource Ids for all capacity reservation group resources shared with the subscription and created in the subscription. */
  resourceIdsOnly?: ResourceIdOptionsForGetCapacityReservationGroups;
}

/** Optional parameters. */
export interface CapacityReservationGroupsListByResourceGroupOptionalParams
  extends OperationOptions {
  /** The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response. */
  expand?: ExpandTypesForGetCapacityReservationGroups;
}

/** Optional parameters. */
export interface CapacityReservationGroupsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacityReservationGroupsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacityReservationGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapacityReservationGroupsGetOptionalParams extends OperationOptions {
  /** The expand expression to apply on the operation. 'InstanceView' will retrieve the list of instance views of the capacity reservations under the capacity reservation group which is a snapshot of the runtime properties of a capacity reservation that is managed by the platform and can change outside of control plane operations. */
  expand?: CapacityReservationGroupInstanceViewTypes;
}
