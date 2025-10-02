// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ItemParamUnion, ItemType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConversationsListConversationItemsOptionalParams
  extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: "asc" | "desc";
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
  /** Filter by item type. If provided, only items of the specified type will be returned. */
  itemType?: ItemType;
}

/** Optional parameters. */
export interface ConversationsDeleteConversationItemOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ConversationsGetConversationItemOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ConversationsCreateConversationItemsOptionalParams
  extends OperationOptions {
  /**
   * Additional fields to include in the response.
   * See the `include` parameter for listing Conversation items for more information.
   */
  include?: string[];
}

/** Optional parameters. */
export interface ConversationsListConversationsOptionalParams
  extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: "asc" | "desc";
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
  /** Filter by agent name. If provided, only items associated with the specified agent will be returned. */
  agentName?: string;
  /** Filter by agent ID in the format `name:version`. If provided, only items associated with the specified agent ID will be returned. */
  agentId?: string;
}

/** Optional parameters. */
export interface ConversationsDeleteConversationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ConversationsGetConversationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ConversationsUpdateConversationOptionalParams
  extends OperationOptions {
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
export interface ConversationsCreateConversationOptionalParams
  extends OperationOptions {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
  /**
   * Initial items to include the conversation context.
   * You may add up to 20 items at a time.
   */
  items?: ItemParamUnion[];
}
