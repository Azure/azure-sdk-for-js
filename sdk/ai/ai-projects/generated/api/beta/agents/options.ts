// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TelephonyProvider,
  TelephonyBindingStatus,
  TelephonyCallStatus,
  JobStatus,
  PageOrder,
} from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "AgentsOptimization=V2Preview";
  /** Client-generated unique ID for idempotent retries. When absent, the server creates the job unconditionally. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaAgentsReplaceTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsGetTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsEndTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsTransferTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsGetTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsListTelephonyCallsOptionalParams extends OperationOptions {
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
export interface BetaAgentsDeleteTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsUpdateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsGetTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsListTelephonyBindingsOptionalParams extends OperationOptions {
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
export interface BetaAgentsCreateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
}

/** Optional parameters. */
export interface BetaAgentsGenerateOptionalParams extends OperationOptions {}
