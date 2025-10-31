// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentKind } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsListAgentVersionContainerOperationsOptionalParams extends OperationOptions {
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
export interface AgentsListAgentContainerOperationsOptionalParams extends OperationOptions {
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
export interface AgentsGetAgentContainerOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsGetAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsDeleteAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsStopAgentContainerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsUpdateAgentContainerOptionalParams extends OperationOptions {
  /** The minimum number of replicas. */
  minReplicas?: number;
  /** The maximum number of replicas. */
  maxReplicas?: number;
}

/** Optional parameters. */
export interface AgentsStartAgentContainerOptionalParams extends OperationOptions {
  /** The minimum number of replicas. Defaults to 1. */
  minReplicas?: number;
  /** The maximum number of replicas. Defaults to 1. */
  maxReplicas?: number;
}

/** Optional parameters. */
export interface AgentsListAgentVersionsOptionalParams extends OperationOptions {
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
export interface AgentsDeleteAgentVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsGetAgentVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsCreateAgentVersionFromManifestOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsCreateAgentVersionOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsListAgentsOptionalParams extends OperationOptions {
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
export interface AgentsDeleteAgentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsUpdateAgentFromManifestOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsCreateAgentFromManifestOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsUpdateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsCreateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
  /** Arbitrary key-value metadata to associate with the agent. */
  metadata?: Record<string, string>;
}

/** Optional parameters. */
export interface AgentsGetAgentOptionalParams extends OperationOptions {}
