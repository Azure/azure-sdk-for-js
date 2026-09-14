// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentState,
  AgentKind,
  AgentBlueprintReferenceUnion,
  AgentEndpointConfig,
  ActivityProtocolAccessBoundary,
  AgentCard,
  Microsoft365PermissionScopes,
  TelephonyProvider,
  TelephonyBindingStatus,
  TelephonyCallStatus,
  AgentDefinitionOptInKeys,
  PageOrder,
  DigitalWorkerType,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgentsDeleteSessionFileOptionalParams extends OperationOptions {
  /** Whether to recursively delete directory contents. The service defaults to `false` if a value is not specified by the caller. */
  recursive?: boolean;
}
/** Optional parameters. */
export interface AgentsListSessionFilesOptionalParams extends OperationOptions {
  /** The directory path to list, relative to the session home directory. Defaults to the home directory if not provided. */
  path?: string;
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
export interface AgentsDownloadSessionFileOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsUploadSessionFileOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsReplaceTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsGetTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsEndTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsTransferTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsGetTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsListTelephonyCallsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Filters calls by provider. */
  provider?: TelephonyProvider;
  /** Filters calls by lifecycle status. */
  status?: TelephonyCallStatus;
  /** Includes calls that started at or after this Unix timestamp in seconds. */
  startedAfter?: Date;
  /** Includes calls that started at or before this Unix timestamp in seconds. */
  startedBefore?: Date;
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
export interface AgentsDeleteTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsUpdateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsGetTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface AgentsListTelephonyBindingsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Filters bindings by provider. */
  provider?: TelephonyProvider;
  /** Filters bindings by lifecycle status. */
  status?: TelephonyBindingStatus;
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
export interface AgentsCreateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
}

/** Optional parameters. */
export interface GetMicrosoft365PublishDefaultsOptionalParams extends OperationOptions {
  /** When true, returns defaults for publishing the agent as an autopilot (digital worker) agent. */
  publishAsDigitalWorker?: boolean;
}

/** Optional parameters. */
export interface GetMicrosoft365PackageOptionalParams extends OperationOptions {
  /**
   * Display name used as the published Teams app name. When omitted, the agent name from the route is
   * used.
   */
  agentDisplayName?: string;
  /**
   * ARM resource id of the Azure Bot Service that fronts this agent in Microsoft Teams. Required for
   * workspaces on the default bot-based Teams backend; optional for workspaces on the API-based backend.
   * Must not be supplied when `publishAsAutopilot` is true.
   */
  botServiceArmId?: string;
  /**
   * When true, the agent is published as an autopilot (digital worker) agent: the bot id is taken from
   * the agent's blueprint identity and the generated Teams manifest is marked as a digital worker.
   */
  publishAsAutopilot?: boolean;
  /**
   * Activity-protocol access boundaries to apply to the agent when publishing as an autopilot agent.
   * An empty list clears the existing boundaries. When omitted, the existing boundaries are left
   * unchanged.
   */
  accessBoundaries?: ActivityProtocolAccessBoundary[];
  /**
   * Exact selection of delegated permission scopes to grant to the autopilot blueprint. May only be
   * supplied when `publishAsAutopilot` is true. When omitted or empty, the platform's default
   * permission set is used. Mandatory platform permissions are always granted and are not affected by
   * this value.
   */
  optionalPermissionScopes?: Microsoft365PermissionScopes[];
  /**
   * Controls how the published agent responds to Teams messages: when true it responds to all messages
   * on its surfaces, when false only when it is at-mentioned. When omitted, the agent's existing Teams
   * message-notification setting is left unchanged.
   */
  canRespondWithoutMention?: boolean;
  /**
   * App version (for example `1.2.3`) written into the Teams manifest. May contain only digits and
   * periods, must not start with `0`, and must end with a digit. When omitted, a platform default is
   * used.
   */
  appVersion?: string;
  /** Short, one-line description shown in the Teams app listing. */
  shortDescription?: string;
  /** Full description shown on the Teams app details page. */
  fullDescription?: string;
  /** Display name of the developer / publisher shown in the Teams app listing. */
  developerName?: string;
  /** Developer / publisher website URL shown in the Teams app listing. Must be an https URL. */
  developerWebsiteUrl?: string;
  /** Privacy policy URL shown in the Teams app listing. Must be an http or https URL. */
  privacyUrl?: string;
  /** Terms-of-use URL shown in the Teams app listing. */
  termsOfUseUrl?: string;
  /**
   * Optional base64-encoded PNG used as the color (full-bleed) icon in the Teams app package. Must be a
   * 192x192 PNG (perfect square, no border or rounded corners). Max 1 MB after decode. When omitted, the
   * platform default color icon is used.
   */
  colorIconBase64?: string;
  /**
   * Optional base64-encoded PNG used as the outline icon in the Teams app package. Must be a 32x32 PNG.
   * Max 1 MB after decode. When omitted, the platform default outline icon is used.
   */
  outlineIconBase64?: string;
}

/** Optional parameters. */
export interface PublishToMicrosoft365OptionalParams extends OperationOptions {
  /**
   * Display name used as the published Teams app name. When omitted, the agent name from the route is
   * used.
   */
  agentDisplayName?: string;
  /**
   * ARM resource id of the Azure Bot Service that fronts this agent in Microsoft Teams. Required for
   * workspaces on the default bot-based Teams backend; optional for workspaces on the API-based backend.
   * Must not be supplied when `publishAsAutopilot` is true.
   */
  botServiceArmId?: string;
  /**
   * When true, the agent is published as an autopilot (digital worker) agent: the bot id is taken from
   * the agent's blueprint identity and the generated Teams manifest is marked as a digital worker.
   */
  publishAsAutopilot?: boolean;
  /**
   * Activity-protocol access boundaries to apply to the agent when publishing as an autopilot agent.
   * An empty list clears the existing boundaries. When omitted, the existing boundaries are left
   * unchanged.
   */
  accessBoundaries?: ActivityProtocolAccessBoundary[];
  /**
   * Exact selection of delegated permission scopes to grant to the autopilot blueprint. May only be
   * supplied when `publishAsAutopilot` is true. When omitted or empty, the platform's default
   * permission set is used. Mandatory platform permissions are always granted and are not affected by
   * this value.
   */
  optionalPermissionScopes?: Microsoft365PermissionScopes[];
  /**
   * Controls how the published agent responds to Teams messages: when true it responds to all messages
   * on its surfaces, when false only when it is at-mentioned. When omitted, the agent's existing Teams
   * message-notification setting is left unchanged.
   */
  canRespondWithoutMention?: boolean;
  /**
   * App version (for example `1.2.3`) written into the Teams manifest. May contain only digits and
   * periods, must not start with `0`, and must end with a digit. When omitted, a platform default is
   * used.
   */
  appVersion?: string;
  /** Short, one-line description shown in the Teams app listing. */
  shortDescription?: string;
  /** Full description shown on the Teams app details page. */
  fullDescription?: string;
  /** Display name of the developer / publisher shown in the Teams app listing. */
  developerName?: string;
  /** Developer / publisher website URL shown in the Teams app listing. Must be an https URL. */
  developerWebsiteUrl?: string;
  /** Privacy policy URL shown in the Teams app listing. Must be an http or https URL. */
  privacyUrl?: string;
  /** Terms-of-use URL shown in the Teams app listing. */
  termsOfUseUrl?: string;
  /**
   * Optional base64-encoded PNG used as the color (full-bleed) icon in the Teams app package. Must be a
   * 192x192 PNG (perfect square, no border or rounded corners). Max 1 MB after decode. When omitted, the
   * platform default color icon is used.
   */
  colorIconBase64?: string;
  /**
   * Optional base64-encoded PNG used as the outline icon in the Teams app package. Must be a 32x32 PNG.
   * Max 1 MB after decode. When omitted, the platform default outline icon is used.
   */
  outlineIconBase64?: string;
}

/** Optional parameters. */
export interface AgentsGetSessionLogStreamOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsListSessionsOptionalParams extends OperationOptions {
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
export interface AgentsDeleteSessionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsGetSessionOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsCreateSessionOptionalParams extends OperationOptions {
  /** Optional caller-provided session ID. If specified, it must be unique within the agent endpoint. Auto-generated if omitted. */
  agentSessionId?: string;
}
/** Optional parameters. */
export interface AgentsDisableOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsEnableOptionalParams extends OperationOptions {}
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
export interface AgentsUpdateAgentObjectOptionalParams extends OperationOptions {
  /** The endpoint configuration for the agent */
  agentEndpoint?: AgentEndpointConfig;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}
/** Optional parameters. */
export type AgentsPatchAgentObjectOptionalParams = AgentsUpdateAgentObjectOptionalParams;

/** Optional parameters. */
export interface AgentsListVersionsOptionalParams extends OperationOptions {
  /** Feature flag required to include draft agent versions. */
  foundryFeatures?: "DraftAgents=V1Preview";
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
  /** Whether to include draft (candidate) versions in the response. */
  includeDrafts?: boolean;
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
  /** (Preview) The type of digital worker (previously known as `autopilot`). If omitted, it is not a digital worker. */
  digitalWorkerType?: DigitalWorkerType;
  /** (Preview) Whether this agent version is a draft (candidate) rather than a release. The service defaults to `false` if a value is not specified by the caller. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. */
  draft?: boolean;
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
export interface AgentsGenerateAgentOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface AgentsCreateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: AgentDefinitionOptInKeys;
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
  /** (Preview) The type of digital worker (previously known as `autopilot`). If omitted, it is not a digital worker. */
  digitalWorkerType?: DigitalWorkerType;
  /** (Preview) Whether this agent version is a draft (candidate) rather than a release. The service defaults to `false` if a value is not specified by the caller. Draft versions are recorded but excluded from default 'latest' resolution and are not auto-promoted. */
  draft?: boolean;
  /** An optional endpoint configuration. If not specified, a default endpoint configuration will be set for the agent */
  agentEndpoint?: AgentEndpointConfig;
  /** Optional agent card for the agent */
  agentCard?: AgentCard;
}
/** Optional parameters. */
export interface AgentsGetOptionalParams extends OperationOptions {}

/** @deprecated Use AgentsUpdateOptionalParams instead. */
export type AgentsUpdateAgentOptionalParams = AgentsUpdateOptionalParams;
/** @deprecated Use AgentsCreateOptionalParams instead. */
export type AgentsCreateAgentOptionalParams = AgentsCreateOptionalParams;
