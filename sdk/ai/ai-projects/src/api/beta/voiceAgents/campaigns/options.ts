// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TelephonyCampaignStatus, PageOrder } from "../../../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsGetOperationOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams extends OperationOptions {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the
   * default is 20.
   */
  limit?: number;
  /** Previous page's opaque last_id, bound to the original sort boundary, project/Agent and filters; error cursors also bind instance, round and snapshot, unchanged by cancellation. Not a name/row number; mutually exclusive with before. Invalid, altered or mismatched cursors return 400 invalid_cursor. */
  after?: string;
  /** Opaque first_id for backward traversal with unchanged scope/filters/order. Cannot be combined with after. Does not resolve the current resource by name. */
  before?: string;
  /** Sort invalid rows by their original row_number. */
  order?: PageOrder;
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Optional retry identifier, distinct from creation and previous failed deletion operations. Reuse with the identical original If-Match for transport retries; a changed precondition conflicts. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Optional idempotency identifier; distinct from validation/delete operations. Required and fresh to resume terminal cancellation failure. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsListOptionalParams extends OperationOptions {
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
  /** Previous page's opaque last_id, bound to the original sort boundary, project/Agent and filters; error cursors also bind instance, round and snapshot, unchanged by cancellation. Not a name/row number; mutually exclusive with before. Invalid, altered or mismatched cursors return 400 invalid_cursor. */
  after?: string;
  /** Opaque first_id for backward traversal with unchanged scope/filters/order. Cannot be combined with after. Does not resolve the current resource by name. */
  before?: string;
  /** Filter by Campaign business state. */
  status?: TelephonyCampaignStatus;
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsGetOptionalParams extends OperationOptions {
  /** Initiating response's retained Operation-Id for guarded final GET, not a later Campaign.operation_id. Same-round actions preserve this guard; replacement/name reuse returns 409 campaign_operation_mismatch. */
  operationId?: string;
}

/** Optional parameters. */
export interface BetaVoiceAgentsCampaignsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /** Retry identifier; required and fresh for intentional failed-state replacement. Preserve with original inputs and If-Match for transport retries. */
  operationId?: string;
  /** Required for failed-state replacement; omit on initial creation. Exact current control token; wildcards are rejected. Retry with the original token and Operation-Id. */
  ifMatch?: string;
}
