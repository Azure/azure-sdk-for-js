// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RoutineDispatchPayloadUnion, PageOrder } from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaRoutinesDispatchOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** A direct action-input override sent downstream when testing a routine. */
  payload?: RoutineDispatchPayloadUnion;
}

/** Optional parameters. */
export interface BetaRoutinesListRunsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** An optional MLflow search-runs filter expression applied within the routine's experiment. */
  filter?: string;
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/** Optional parameters. */
export interface BetaRoutinesDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesListOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place in the list.
   * For instance, if you make a list request and receive 100 objects, ending with obj_foo, your
   * subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/** Optional parameters. */
export interface BetaRoutinesDisableOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesEnableOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
}

/** Optional parameters. */
export interface BetaRoutinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Routines=V1Preview";
  /** A human-readable description of the routine. */
  description?: string;
  /** Whether the routine is enabled. */
  enabled?: boolean;
}
