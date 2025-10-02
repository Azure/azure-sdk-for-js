// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentKind, AgentEventHandlerFilter } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListAgentVersionContainerOperationsOptionalParams
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
}

/** Optional parameters. */
export interface ListAgentContainerOperationsOptionalParams
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
}

/** Optional parameters. */
export interface GetAgentContainerOperationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StopAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateAgentContainerOptionalParams extends OperationOptions {
  /** The minimum number of replicas. */
  minReplicas?: number;
  /** The maximum number of replicas. */
  maxReplicas?: number;
}

/** Optional parameters. */
export interface StartAgentContainerOptionalParams extends OperationOptions {
  /** The minimum number of replicas. Defaults to 1. */
  minReplicas?: number;
  /** The maximum number of replicas. Defaults to 1. */
  maxReplicas?: number;
}

/** Optional parameters. */
export interface DeleteAgentEventHandlerOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface ListAgentEventHandlersOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface GetAgentEventHandlerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateAgentEventHandlerOptionalParams
  extends OperationOptions {
  /** Arbitrary key-value metadata to associate with the event handler. */
  metadata?: Record<string, string>;
  /** An optional filter condition where this event handler is applicable. */
  filter?: AgentEventHandlerFilter;
}

/** Optional parameters. */
export interface ListAgentVersionsOptionalParams extends OperationOptions {
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
}

/** Optional parameters. */
export interface DeleteAgentVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAgentVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateAgentVersionOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface ListAgentsOptionalParams extends OperationOptions {
  /** Filter agents by kind. If not provided, all agents are returned. */
  kind?: AgentKind;
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
}

/** Optional parameters. */
export interface DeleteAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpdateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface CreateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface GetAgentOptionalParams extends OperationOptions {}
