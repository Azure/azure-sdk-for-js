// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  getOperation,
  listValidationErrors,
  deleteCampaign,
  cancel,
  list,
  get,
  create,
} from "../../../../api/beta/voiceAgents/campaigns/operations.js";
import {
  BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  BetaVoiceAgentsCampaignsDeleteOptionalParams,
  BetaVoiceAgentsCampaignsCancelOptionalParams,
  BetaVoiceAgentsCampaignsListOptionalParams,
  BetaVoiceAgentsCampaignsGetOptionalParams,
  BetaVoiceAgentsCampaignsCreateOptionalParams,
} from "../../../../api/beta/voiceAgents/campaigns/options.js";
import {
  TelephonyCampaign,
  TelephonyCampaignOperation,
  TelephonyCampaignValidationError,
} from "../../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaVoiceAgentsCampaigns operations. */
export interface BetaVoiceAgentsCampaignsOperations {
  /** Polls one fixed validation/cancel/delete operation despite changes to Campaign.operation_id, replacement or deletion. Retained throughout Campaign lifetime and at least 24 hours after both completion and deletion. Pending responses include Retry-After; PUT/cancel use guarded final Campaign GETs, delete has none. Pollers never switch operations. */
  getOperation: (
    agentName: string,
    campaignName: string,
    operationId: string,
    options?: BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  ) => Promise<TelephonyCampaignOperation>;
  /**
   * Lists detailed invalid-row diagnostics for the current round/pinned Agent; the monitor carries only a bounded summary.
   * During validating, results are partial and an empty page does not mean success. Input-position identities and cursors survive
   * worker retries/cancellation. Replacement resets the collection and invalidates cursors; diagnostics otherwise persist until deletion.
   * Successful validation yields no errors; execution failures appear in CallJobs, non-row preparation failures in Campaign.error.
   * Cursors bind instance, round and row_number boundary. Replaced rounds, reused names or invalid cursors return 400 invalid_cursor;
   * deleting returns 409 campaign_deleting, deleted Campaigns return 404.
   */
  listValidationErrors: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaignValidationError>;
  /**
   * Asynchronously deletes a terminal Campaign after preparation/admitted calls stop; other active states return 409.
   * Cancellation must finish first. Cleanup removes recipient snapshots, validation diagnostics/accounting, owned CallJobs/attempts
   * from all rounds and pending dispatch work. Acceptance sets deleting and Campaign.operation_id to the deletion monitor,
   * hides owned jobs/results, and blocks name reuse until success. Dataset, connections, Agent configuration and independent CallJobs
   * remain; call records, conversations and recordings retain their own policies.
   *
   * Cleanup targets the accepted Campaign instance, never a later namesake. Failure leaves deleting/error; resume with fresh
   * Operation-Id and current If-Match to create a new monitor, update Campaign.operation_id and preserve the validation round.
   * Identical retained Operation-Id retries replay the original 202 before stale-token checks, including after deletion/name reuse.
   * Conflicting IDs return 409. Without replay, absent names return 204 and stale tokens return 412. Current-token DELETE during
   * cleanup reuses its monitor; a fresh ID aliases the same operation. Success frees the name but retains replay/duplicate-dialing safeguards.
   */
  deleteCampaign: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Starts cancellation for validating/running Campaigns with exact If-Match. Always returns 202 with the monitor,
   * Operation-Id, Operation-Location and Retry-After, even if already complete. Acceptance blocks new dispatch/retries,
   * sets cancelling and the latest operation_id, and preserves the validation round/Agent pin. Connected calls finish naturally;
   * the Campaign becomes cancelled and this monitor succeeds only after preparation/admitted calls stop.
   * If cancellation wins preparation, its validation monitor becomes cancelled after workers stop; an already succeeded monitor stays succeeded.
   *
   * Omitted Operation-Id is generated. After authorization, a retained ID and original If-Match replay 202 before current-state/token checks,
   * even after deletion/name reuse, without touching a replacement; conflicting reuse returns 409. Without replay, missing Campaign
   * returns 404 and stale If-Match returns 412. Current-token repeats in cancelling/cancelled reuse the monitor; a fresh ID aliases it.
   *
   * Failure leaves cancelling/error with dispatch disabled, changes etag and fails only this monitor. Resume with fresh Operation-Id
   * and current If-Match to create a new monitor while preserving previous failures. New cancellation of completed/failed/deleting
   * returns 409. The SDK polls the accepted monitor, then performs a guarded Campaign GET.
   */
  cancel: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsCancelOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Lists Agent-owned Campaigns without inline arrays. Opaque continuation tokens retain the original created_at/internal-instance boundary across deletion and name reuse. Filters are live views, not a snapshot. */
  list: (
    agentName: string,
    options?: BetaVoiceAgentsCampaignsListOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaign>;
  /** Gets the current Campaign with source provenance but no inline recipients, after authorization. Optional operation_id checks the saved instance/round, not the latest operation pointer: same-round cancellation is allowed; replacement/name reuse returns 409 campaign_operation_mismatch. Missing/expired/wrong-scope operations or absent Campaigns return 404. */
  get: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsGetOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /**
   * Creates a named Campaign (201) or fully replaces a failed Campaign's inputs (200), authorizing calls after validation.
   * Shape/authorization checks precede acceptance. Replacement requires exact If-Match and fresh Operation-Id:
   * missing replacement ID returns 400, stale If-Match returns 412, and nonfailed state returns 409.
   * If-Match on an absent Campaign returns 412; it never recreates a deleted resource.
   * Supply exactly one recipient source; omitted optional fields reset to defaults on replacement.
   *
   * Acceptance returns validating and its separate monitor in operation_id. Replacement starts a new round,
   * resetting errors, finished_at, progress, Dataset resolution and locked_agent_version. Superseded diagnostics/CallJobs
   * disappear from lists, counts and dispatch; old validation-error cursors become invalid. Previous monitors/replay safeguards remain.
   *
   * Preparation pins the owning Agent's latest authorized version and any omitted Dataset version once per round before row validation.
   * Pins survive retries and later Agent updates; resolution failure fails preparation. Dispatch opens only after the full snapshot
   * validates and each input position has a CallJob. Failed rounds never dial and report failed only after preparation stops;
   * immediate calls may begin before the PUT poller returns.
   *
   * Identical Operation-Id, original inputs and original If-Match replay the saved receipt/monitor before current-state/token checks,
   * without restarting the round or changing pins. Conflicting reuse returns 409 operation_id_conflict; superseded keys replay old monitors.
   * Without replay, If-Match requires failed state and a fresh Operation-Id even for unchanged inputs. Without If-Match, equivalent
   * input returns the current resource/saved validation monitor; different input conflicts. Headers keep that monitor after later
   * cancel/delete, without resetting Campaign.operation_id. Replay compares submitted inputs, including Dataset version omission,
   * not resolved versions/defaults. After deletion, retained keys return 409 campaign_deleted; new intent needs a fresh key.
   */
  create: (
    agentName: string,
    campaignName: string,
    campaign: TelephonyCampaign,
    options?: BetaVoiceAgentsCampaignsCreateOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

function _getBetaVoiceAgentsCampaigns(context: AIProjectContext) {
  return {
    getOperation: (
      agentName: string,
      campaignName: string,
      operationId: string,
      options?: BetaVoiceAgentsCampaignsGetOperationOptionalParams,
    ) => getOperation(context, agentName, campaignName, operationId, options),
    listValidationErrors: (
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
    ) => listValidationErrors(context, agentName, campaignName, options),
    deleteCampaign: (
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsCampaignsDeleteOptionalParams,
    ) => deleteCampaign(context, agentName, campaignName, ifMatch, options),
    cancel: (
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsCampaignsCancelOptionalParams,
    ) => cancel(context, agentName, campaignName, ifMatch, options),
    list: (agentName: string, options?: BetaVoiceAgentsCampaignsListOptionalParams) =>
      list(context, agentName, options),
    get: (
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsCampaignsGetOptionalParams,
    ) => get(context, agentName, campaignName, options),
    create: (
      agentName: string,
      campaignName: string,
      campaign: TelephonyCampaign,
      options?: BetaVoiceAgentsCampaignsCreateOptionalParams,
    ) => create(context, agentName, campaignName, campaign, options),
  };
}

export function _getBetaVoiceAgentsCampaignsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsCampaignsOperations {
  return {
    ..._getBetaVoiceAgentsCampaigns(context),
  };
}
