// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TelephonyCampaignStatus, PageOrder } from "../../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
