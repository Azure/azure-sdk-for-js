// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentEndpoint,
  AgentCard,
  JobStatus,
  AgentDefinitionOptInKeys,
  PageOrder,
} from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentsDeleteOptimizationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
}

/** Optional parameters. */
export interface BetaAgentsCancelOptimizationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
}

/** Optional parameters. */
export interface BetaAgentsListOptimizationJobsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
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
  /** Filter to jobs in this lifecycle state. */
  status?: JobStatus;
  /** Filter to jobs targeting this agent name. */
  agentName?: string;
}

/** Optional parameters. */
export interface BetaAgentsGetOptimizationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
}

/** Optional parameters. */
export interface BetaAgentsCreateOptimizationJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaAgentsDeleteSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
  /** Whether to recursively delete directory contents. The service defaults to `false` if a value is not specified by the caller. */
  recursive?: boolean;
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface BetaAgentsListSessionFilesOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
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
export interface BetaAgentsDownloadSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface BetaAgentsUploadSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface BetaAgentsGetSessionLogStreamOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsListSessionsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
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
export interface BetaAgentsStopSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsDeleteSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface BetaAgentsGetSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
}

/** Optional parameters. */
export interface BetaAgentsCreateSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** Opaque per-user isolation key used to scope endpoint-scoped data (responses, conversations, sessions) to a specific end user. */
  userIsolationKey?: string;
  /** Optional caller-provided session ID. If specified, it must be unique within the agent endpoint. Auto-generated if omitted. */
  agentSessionId?: string;
}

/** Optional parameters. */
export interface BetaAgentsDownloadAgentCodeOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "CodeAgents=V1Preview";
  /**
   * The version of the agent whose code zip should be downloaded.
   * If omitted, the latest version's code zip is returned.
   */
  agentVersion?: string;
}

/** Optional parameters. */
export interface BetaAgentsCreateVersionFromCodeOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
}

/** Optional parameters. */
export interface BetaAgentsPatchAgentObjectOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** The endpoint configuration for the agent */
  agentEndpoint?: AgentEndpoint;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}
