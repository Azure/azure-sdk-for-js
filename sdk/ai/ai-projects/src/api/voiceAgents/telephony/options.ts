// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TelephonyProvider,
  TelephonyCallStatus,
  TelephonyCallJobStatus,
  PageOrder,
} from "../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VoiceAgentsTelephonyCancelCallJobOptionalParams extends OperationOptions {
  /** Required only when cancelling a SIP call job. Other providers do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyGetCallJobOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Reading a call job, including a SIP job, does not require this flag. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyDeleteCallJobOptionalParams extends OperationOptions {
  /** Required only when deleting a SIP call job. Other providers do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyListCallJobsOptionalParams extends OperationOptions {
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
export interface VoiceAgentsTelephonyCreateCallJobOptionalParams extends OperationOptions {
  /** Required only for SIP calls, including when a SIP connection uses phone-number addresses. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams extends OperationOptions {
  /** Required only when modifying SIP telephony transfer targets or configuring SIP destinations. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyGetTransferTargetsOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Reading transfer targets, including SIP destinations, does not require this flag. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyEndCallOptionalParams extends OperationOptions {
  /** Required only when ending a SIP call. Other providers do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyTransferCallOptionalParams extends OperationOptions {
  /** Required only when transferring a SIP call or using a SIP transfer destination. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyGetCallOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Reading a call, including a SIP call, does not require this flag. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyListCallsOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Listing calls, including SIP calls, does not require this flag. */
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
export interface VoiceAgentsTelephonyDeleteBindingOptionalParams extends OperationOptions {
  /** Required only when deleting a SIP binding. Twilio and Teams Phone bindings do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyUpdateBindingOptionalParams extends OperationOptions {
  /** Required only when updating a SIP binding. Twilio and Teams Phone bindings do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyGetBindingOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Reading a binding, including a SIP binding, does not require this flag. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface VoiceAgentsTelephonyListBindingsOptionalParams extends OperationOptions {
  /** Optional preview opt-in. Listing bindings, including SIP bindings, does not require this flag. */
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
export interface VoiceAgentsTelephonyCreateBindingOptionalParams extends OperationOptions {
  /** Required only when creating a SIP binding. Twilio and Teams Phone bindings do not require this opt-in. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
}
