// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext } from "../../api/trafficManagerManagementContext.js";
import {
  $delete,
  createOrUpdate,
  get,
} from "../../api/trafficManagerUserMetricsKeys/operations.js";
import type {
  TrafficManagerUserMetricsKeysDeleteOptionalParams,
  TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams,
  TrafficManagerUserMetricsKeysGetOptionalParams,
} from "../../api/trafficManagerUserMetricsKeys/options.js";
import type { DeleteOperationResult, UserMetricsModel } from "../../models/models.js";

/** Interface representing a TrafficManagerUserMetricsKeys operations. */
export interface TrafficManagerUserMetricsKeysOperations {
  /** Delete a subscription-level key used for Real User Metrics collection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: TrafficManagerUserMetricsKeysDeleteOptionalParams,
  ) => Promise<DeleteOperationResult>;
  /** Create or update a subscription-level key used for Real User Metrics collection. */
  createOrUpdate: (
    options?: TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams,
  ) => Promise<UserMetricsModel>;
  /** Get the subscription-level key used for Real User Metrics collection. */
  get: (options?: TrafficManagerUserMetricsKeysGetOptionalParams) => Promise<UserMetricsModel>;
}

function _getTrafficManagerUserMetricsKeys(context: TrafficManagerManagementContext) {
  return {
    delete: (options?: TrafficManagerUserMetricsKeysDeleteOptionalParams) =>
      $delete(context, options),
    createOrUpdate: (options?: TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, options),
    get: (options?: TrafficManagerUserMetricsKeysGetOptionalParams) => get(context, options),
  };
}

export function _getTrafficManagerUserMetricsKeysOperations(
  context: TrafficManagerManagementContext,
): TrafficManagerUserMetricsKeysOperations {
  return {
    ..._getTrafficManagerUserMetricsKeys(context),
  };
}
