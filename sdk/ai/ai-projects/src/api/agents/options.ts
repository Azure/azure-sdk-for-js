// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentKind } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";
import { AgentDefinitionUnion } from "../../models/models.js";

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
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be
   * useful for storing additional information about the object in a structured
   * format, and querying for objects via API or the dashboard.
   *
   * Keys are strings with a maximum length of 64 characters. Values are strings
   * with a maximum length of 512 characters.
   */
  metadata?: Record<string, string>;
  /** A human-readable description of the agent. */
  description?: string;
}

/** Optional parameters. */
export interface AgentsCreateAgentVersionOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
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
export interface AgentsCreateAgentFromManifestOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
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
export interface AgentsUpdateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
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
export interface AgentsCreateAgentOptionalParams extends OperationOptions {
  /** A human-readable description of the agent. */
  description?: string;
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
export interface AgentsGetAgentOptionalParams extends OperationOptions {}

/** Configuration for creating an agent from a definition */
export type CreateAgentFromDefinitionConfig = {
  type: "definition";
  definition: AgentDefinitionUnion;
  options?: AgentsCreateAgentOptionalParams;
};

/** Configuration for creating an agent from a manifest */
export type CreateAgentFromManifestConfig = {
  type: "manifest";
  manifestId: string;
  parameterValues: Record<string, any>;
  options?: AgentsCreateAgentFromManifestOptionalParams;
};

/** Configuration for creating an agent */
export type CreateAgentConfig =
  | CreateAgentFromDefinitionConfig
  | CreateAgentFromManifestConfig;

/** Configuration for updating an agent from a definition */
export type UpdateAgentFromDefinitionConfig = {
  type: "definition";
  definition: AgentDefinitionUnion;
  options?: AgentsUpdateAgentOptionalParams;
};

/** Configuration for updating an agent from a manifest */
export type UpdateAgentFromManifestConfig = {
  type: "manifest";
  manifestId: string;
  parameterValues: Record<string, any>;
  options?: AgentsUpdateAgentFromManifestOptionalParams;
};

/** Configuration for updating an agent */
export type UpdateAgentConfig =
  | UpdateAgentFromDefinitionConfig
  | UpdateAgentFromManifestConfig;
