// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PageOrder } from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaToolboxesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaToolboxesListOptionalParams extends OperationOptions {
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
export interface BetaToolboxesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaToolboxesUpdateOptionalParams extends OperationOptions {
  /** A human-readable description of the toolbox. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the toolbox. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface BetaToolboxesCreateOptionalParams extends OperationOptions {
  /** A human-readable description of the toolbox. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the toolbox. */
  metadata?: Record<string, string>;
}
