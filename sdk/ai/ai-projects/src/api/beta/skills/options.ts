// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SkillInlineContent, PageOrder } from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaSkillsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsDeleteSkillVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsGetSkillVersionContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsDownloadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsGetSkillVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsListSkillVersionsOptionalParams extends OperationOptions {
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
export interface CreateFromPackageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaSkillsCreateOptionalParams extends OperationOptions {
  /** Inline skill content for simple skills without file uploads. Foundry-specific extension. */
  inlineContent?: SkillInlineContent;
  /** Whether to set this version as the default. */
  defaultParam?: boolean;
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
export interface BetaSkillsGetOptionalParams extends OperationOptions {}
