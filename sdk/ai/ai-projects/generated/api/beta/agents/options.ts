// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentEndpoint, AgentCard, PageOrder } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListManagedIdentityBlueprintsOptionalParams extends OperationOptions {
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and`desc`
   * for descending order.
   */
  order?: PageOrder;
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
}

/** Optional parameters. */
export interface DeleteManagedIdentityBlueprintOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetManagedIdentityBlueprintOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateManagedIdentityBlueprintOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaAgentsDeleteSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
  /** Whether to recursively delete directory contents. Defaults to false. */
  recursive?: boolean;
}

/** Optional parameters. */
export interface BetaAgentsListSessionFilesOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsDownloadSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsUploadSessionFileOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "HostedAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsListSessionsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
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
export interface BetaAgentsDeleteSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsGetSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsCreateSessionOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentEndpoints=V1Preview";
  /** Optional caller-provided session ID. If specified, it must be unique within the agent endpoint. Auto-generated if omitted. */
  agentSessionId?: string;
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
