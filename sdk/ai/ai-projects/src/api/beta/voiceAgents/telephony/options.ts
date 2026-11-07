// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TelephonyCampaignStatus,
  PageOrder,
  TelephonyProvider,
  TelephonyCallStatus,
  TelephonyCallJobStatus,
} from "../../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /** Opaque last_id bound to scope/filters/order; error cursors also bind instance/round/snapshot and survive cancel, not replacement. Exclusive with before; invalid tokens return 400 invalid_cursor. */
  after?: string;
  /** Opaque first_id for backward paging with unchanged scope/filters/order; exclusive with after. */
  before?: string;
  /** Sort invalid rows by their original row_number. */
  order?: PageOrder;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional retry key. Original If-Match/key replays 202 even after deletion/name reuse, never touching a new instance; conflicts return 409. Failed cleanup needs a fresh key/current token. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional retry key, generated if omitted. Original If-Match/key replays 202 even after deletion/name reuse, never touching a replacement; conflicts return 409. Failed cancellation needs a fresh key/current token. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyListOptionalParams extends OperationOptions {
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
  /** Opaque last_id bound to scope/filters/order; error cursors also bind instance/round/snapshot and survive cancel, not replacement. Exclusive with before; invalid tokens return 400 invalid_cursor. */
  after?: string;
  /** Opaque first_id for backward paging with unchanged scope/filters/order; exclusive with after. */
  before?: string;
  /** Filter by Campaign business state. */
  status?: TelephonyCampaignStatus;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetOptionalParams extends OperationOptions {
  /** Original response's Operation-Id guards its instance/round and survives same-round actions. Replacement/name reuse: 409 campaign_operation_mismatch; missing/expired/wrong-scope operation: 404. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Retry key: matching submitted inputs and original If-Match replay the saved monitor before current-state checks. Conflicting reuse returns 409 operation_id_conflict; retained creation keys after deletion return 409 campaign_deleted. */
  operationId?: string;
  /** Required with a fresh Operation-Id for failed-state replacement; no wildcards. Changed input without it returns 409. Missing replacement ID: 400; stale token/absent resource: 412; other states: 409. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyCancelCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyListCallJobsOptionalParams extends OperationOptions {
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
  /** Optional lifecycle filter. */
  status?: TelephonyCallJobStatus;
  /** Current Campaign round: 404 if absent, empty while deleting. Omit for direct and Campaign jobs. Replacement/name reuse invalidates cursors. */
  campaignName?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyCreateCallJobOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyEndCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyTransferCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetCallOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyListCallsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Filters calls by provider. */
  provider?: TelephonyProvider;
  /** Filters calls by lifecycle status. */
  status?: TelephonyCallStatus;
  /** Includes calls that started at or after this Unix timestamp in seconds. */
  startedAfterTime?: Date;
  /** Includes calls that started at or before this Unix timestamp in seconds. */
  startedBeforeTime?: Date;
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
export interface BetaVoiceAgentsTelephonyDeleteBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyUpdateBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyGetBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsTelephonyListBindingsOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Filters bindings by provider. */
  provider?: TelephonyProvider;
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
export interface BetaVoiceAgentsTelephonyCreateBindingOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
}
