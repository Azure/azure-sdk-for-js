// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentKind,
  AgentBlueprintReferenceUnion,
  AgentEndpoint,
  AgentCard,
  AgentDefinitionOptInKeys,
  PageOrder,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsCreateAgentVersionFromCodeOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
}

/** Optional parameters. */
export interface AgentsPatchAgentObjectOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** The endpoint configuration for the agent */
  agentEndpoint?: AgentEndpoint;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}

/** Optional parameters. */
export interface AgentsListVersionsOptionalParams extends OperationOptions {
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
export interface AgentsDeleteVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsGetVersionOptionalParams extends OperationOptions {}

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
export interface AgentsCreateVersionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
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
  /** The blueprint reference for the agent. */
  blueprintReference?: AgentBlueprintReferenceUnion;
}

/** Optional parameters. */
export interface AgentsListOptionalParams extends OperationOptions {
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
export interface AgentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsUpdateAgentFromManifestOptionalParams extends OperationOptions {
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
export interface AgentsCreateAgentFromManifestOptionalParams extends OperationOptions {
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
export interface AgentsUpdateAgentFromCodeOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
}

/** Optional parameters. */
export interface AgentsUpdateAgentOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
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
  /** The blueprint reference for the agent. */
  blueprintReference?: AgentBlueprintReferenceUnion;
}

/** Optional parameters. */
export interface AgentsCreateAgentFromCodeOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
}

/** Optional parameters. */
export interface AgentsCreateAgentOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
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
  /** The blueprint reference for the agent. */
  blueprintReference?: AgentBlueprintReferenceUnion;
  /** An optional endpoint configuration. If not specified, a default endpoint configuration will be set for the agent */
  agentEndpoint?: AgentEndpoint;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}

/** Optional parameters. */
export interface AgentsGetOptionalParams extends OperationOptions {}
