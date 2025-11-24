// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext } from "../../api/computeLimitContext.js";
import {
  listBySubscriptionLocationResource,
  $delete,
  create,
  get,
} from "../../api/sharedLimits/operations.js";
import type {
  SharedLimitsListBySubscriptionLocationResourceOptionalParams,
  SharedLimitsDeleteOptionalParams,
  SharedLimitsCreateOptionalParams,
  SharedLimitsGetOptionalParams,
} from "../../api/sharedLimits/options.js";
import type { SharedLimit } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SharedLimits operations. */
export interface SharedLimitsOperations {
  /** Lists all compute limits shared by the host subscription with its guest subscriptions. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: SharedLimitsListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<SharedLimit>;
  /** Disables sharing of a compute limit by the host subscription with its guest subscriptions. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    location: string,
    name: string,
    options?: SharedLimitsDeleteOptionalParams,
  ) => Promise<void>;
  /** Enables sharing of a compute limit by the host subscription with its guest subscriptions. */
  create: (
    location: string,
    name: string,
    resource: SharedLimit,
    options?: SharedLimitsCreateOptionalParams,
  ) => Promise<SharedLimit>;
  /** Gets the properties of a compute limit shared by the host subscription with its guest subscriptions. */
  get: (
    location: string,
    name: string,
    options?: SharedLimitsGetOptionalParams,
  ) => Promise<SharedLimit>;
}

function _getSharedLimits(context: ComputeLimitContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: SharedLimitsListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    delete: (location: string, name: string, options?: SharedLimitsDeleteOptionalParams) =>
      $delete(context, location, name, options),
    create: (
      location: string,
      name: string,
      resource: SharedLimit,
      options?: SharedLimitsCreateOptionalParams,
    ) => create(context, location, name, resource, options),
    get: (location: string, name: string, options?: SharedLimitsGetOptionalParams) =>
      get(context, location, name, options),
  };
}

export function _getSharedLimitsOperations(context: ComputeLimitContext): SharedLimitsOperations {
  return {
    ..._getSharedLimits(context),
  };
}
