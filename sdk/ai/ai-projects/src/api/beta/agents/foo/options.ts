// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TelephonyProvider,
  TelephonyBindingStatus,
  TelephonyCallStatus,
  PageOrder,
} from "../../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaAgentsFooGetOperationOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooCancelCampaignOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooResumeCampaignOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooPauseCampaignOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooPublishCampaignOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooValidateCampaignOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetCampaignRecipientImportOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooImportCampaignRecipientsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetCampaignOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooCreateCampaignOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooCancelCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooCreateCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetTelephonyTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooEndTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooTransferTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetTelephonyCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooListTelephonyCallsOptionalParams extends OperationOptions {
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
export interface BetaAgentsFooDeleteTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooUpdateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooGetTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaAgentsFooListTelephonyBindingsOptionalParams extends OperationOptions {
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
export interface BetaAgentsFooCreateTelephonyBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
}
