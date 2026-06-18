// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentKind,
  AgentBlueprintReferenceUnion,
  AgentEndpointConfig,
  AgentCard,
  AgentDefinitionOptInKeys,
  PageOrder,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsDeleteSessionFileOptionalParams extends OperationOptions {
  /** Whether to recursively delete directory contents. The service defaults to `false` if a value is not specified by the caller. */
  recursive?: boolean;
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface AgentsListSessionFilesOptionalParams extends OperationOptions {
  /** The directory path to list, relative to the session home directory. Defaults to the home directory if not provided. */
  path?: string;
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
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
export interface AgentsDownloadSessionFileOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface AgentsUploadSessionFileOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface AgentsGetSessionLogStreamOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsListSessionsOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
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
export interface AgentsStopSessionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsDeleteSessionOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface AgentsGetSessionOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface AgentsCreateSessionOptionalParams extends OperationOptions {
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
  /** Optional caller-provided session ID. If specified, it must be unique within the agent endpoint. Auto-generated if omitted. */
  agentSessionId?: string;
}

/** Optional parameters. */
export interface AgentsDownloadAgentCodeOptionalParams extends OperationOptions {
  /**
   * The version of the agent whose code zip should be downloaded.
   * If omitted, the latest version's code zip is returned.
   */
  agentVersion?: string;
}

/** Optional parameters. */
export interface AgentsCreateVersionFromCodeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AgentsPatchAgentObjectOptionalParams extends OperationOptions {
  /** The endpoint configuration for the agent */
  agentEndpoint?: AgentEndpointConfig;
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
export interface AgentsDeleteVersionOptionalParams extends OperationOptions {
  /** For Hosted Agents, if `true`, force-deletes the version even if it has active sessions, cascading deletion to all associated sessions. The service defaults to `false` if a value is not specified by the caller. This value is not relevant for other Agent types. */
  force?: boolean;
}

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
export interface AgentsDeleteOptionalParams extends OperationOptions {
  /** For Hosted Agents, if `true`, force-deletes the agent even if its versions have active sessions, cascading deletion to all associated sessions. The service defaults to `false` if a value is not specified by the caller. This value is not relevant for other Agent types. */
  force?: boolean;
}

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
export interface AgentsUpdateOptionalParams extends OperationOptions {
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
export interface AgentsCreateOptionalParams extends OperationOptions {
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
  agentEndpoint?: AgentEndpointConfig;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}

/** Optional parameters. */
export interface AgentsGetOptionalParams extends OperationOptions {}
