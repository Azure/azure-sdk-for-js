// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentState,
  AgentBlueprintReferenceUnion,
  VoiceAgentTool,
  AgentEndpointConfig,
  AgentCard,
  PageOrder,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VoiceAgentsDeleteVoiceAgentVersionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsGetVoiceAgentVersionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsListVoiceAgentVersionsOptionalParams extends OperationOptions {
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
  /** (Preview) Whether to include draft versions in the listing. The service defaults to `false` if a value is not specified by the caller (only non-draft versions are returned). */
  includeDrafts?: boolean;
}
/** Optional parameters. */
export interface VoiceAgentsCreateVoiceAgentVersionOptionalParams extends OperationOptions {
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
  /** (Preview) Whether this agent version is a draft (candidate) rather than a release. The service defaults to `false` if a value is not specified by the caller. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. */
  draft?: boolean;
}
/** Optional parameters. */
export interface VoiceAgentsGenerateVoiceAgentOptionalParams extends OperationOptions {
  /** An optional description for the agent. Generated from `goal` when omitted. */
  description?: string;
  /** Optional tools carried through verbatim onto the generated agent (see `VoiceAgentTool`). */
  tools?: VoiceAgentTool[];
  /** (Preview) When `true`, the generated voice agent is created as a draft — an editable, unpublished version the caller can review and refine before publishing it via the standard create/version path. The service defaults to `false` if a value is not specified by the caller, in which case the agent is created and published normally. */
  draft?: boolean;
}
/** Optional parameters. */
export interface VoiceAgentsDisableVoiceAgentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsEnableVoiceAgentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsDeleteVoiceAgentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsUpdateVoiceAgentOptionalParams extends OperationOptions {
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
export interface VoiceAgentsGetVoiceAgentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface VoiceAgentsListVoiceAgentsOptionalParams extends OperationOptions {
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
export interface VoiceAgentsCreateVoiceAgentOptionalParams extends OperationOptions {
  /** The initial operational state of the agent. Defaults to 'enabled' if not specified. */
  state?: AgentState;
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
  /** (Preview) Whether this agent version is a draft (candidate) rather than a release. The service defaults to `false` if a value is not specified by the caller. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. */
  draft?: boolean;
  /** An optional endpoint configuration. If not specified, a default endpoint configuration will be set for the agent */
  agentEndpoint?: AgentEndpointConfig;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}
