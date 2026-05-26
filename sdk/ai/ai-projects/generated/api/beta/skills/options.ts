// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PageOrder } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaSkillsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsUpdateOptionalParams extends OperationOptions {
  /** A human-readable description of the skill. */
  description?: string;
  /** Instructions that define the behavior of the skill. */
  instructions?: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface BetaSkillsListOptionalParams extends OperationOptions {
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
export interface BetaSkillsDownloadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateFromPackageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsCreateOptionalParams extends OperationOptions {
  /** A human-readable description of the skill. */
  description?: string;
  /** Instructions that define the behavior of the skill. */
  instructions?: string;
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
}
