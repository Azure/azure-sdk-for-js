// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  getOperation,
  listValidationErrors,
  deleteTelephony,
  cancel,
  list,
  get,
  create,
} from "../../../../api/beta/voiceAgents/telephony/operations.js";
import type {
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteOptionalParams,
  BetaVoiceAgentsTelephonyCancelOptionalParams,
  BetaVoiceAgentsTelephonyListOptionalParams,
  BetaVoiceAgentsTelephonyGetOptionalParams,
  BetaVoiceAgentsTelephonyCreateOptionalParams,
} from "../../../../api/beta/voiceAgents/telephony/options.js";
import type {
  TelephonyCampaign,
  TelephonyCampaignOperation,
  TelephonyCampaignValidationError,
  TelephonyCampaignCreate,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Operations for managing voice agent telephony. */
export interface BetaVoiceAgentsTelephonyOperations {
  /** Gets the initiating operation's status. PUT/cancel pollers finish with a guarded Campaign GET; deletion completes without a resource result. */
  getOperation: (
    agentName: string,
    campaignName: string,
    operationId: string,
    options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  ) => Promise<TelephonyCampaignOperation>;
  /** Lists current-round row validation errors. Results may be partial during preparation; an empty page does not establish success. Execution errors are in CallJobs; non-row failures are in Campaign.error. */
  listValidationErrors: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaignValidationError>;
  /** Deletes a terminal Campaign and its recipient/task data asynchronously. Returns bodyless 202 with a monitor, not a tombstone; completion makes GET return 404 and lists omit it. Dataset, connections, Agent, independent jobs and call history are preserved. */
  deleteTelephony: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Cancels a validating or running Campaign using If-Match. Stops new calls and retries; connected calls finish naturally. Returns 202 with an operation monitor to track completion. */
  cancel: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyCancelOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Lists the Agent's Campaigns without inline recipients. Filters are live views, not snapshots. */
  list: (
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaign>;
  /** Gets Campaign configuration and execution state without inline recipients. Absent or deleted Campaigns return 404. */
  get: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsTelephonyGetOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a Campaign or fully replaces failed preparation; no PATCH. All recipients must validate and have CallJobs before dialing. Immediate calls may begin before the preparation poller returns. */
  create: (
    agentName: string,
    campaignName: string,
    campaign: TelephonyCampaignCreate,
    options?: BetaVoiceAgentsTelephonyCreateOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

function _getBetaVoiceAgentsTelephony(
  context: AIProjectContext,
): BetaVoiceAgentsTelephonyOperations {
  return {
    getOperation: (
      agentName: string,
      campaignName: string,
      operationId: string,
      options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
    ) => getOperation(context, agentName, campaignName, operationId, options),
    listValidationErrors: (
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
    ) => listValidationErrors(context, agentName, campaignName, options),
    deleteTelephony: (
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyDeleteOptionalParams,
    ) => deleteTelephony(context, agentName, campaignName, ifMatch, options),
    cancel: (
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyCancelOptionalParams,
    ) => cancel(context, agentName, campaignName, ifMatch, options),
    list: (agentName: string, options?: BetaVoiceAgentsTelephonyListOptionalParams) =>
      list(context, agentName, options),
    get: (
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsTelephonyGetOptionalParams,
    ) => get(context, agentName, campaignName, options),
    create: (
      agentName: string,
      campaignName: string,
      campaign: TelephonyCampaignCreate,
      options?: BetaVoiceAgentsTelephonyCreateOptionalParams,
    ) => create(context, agentName, campaignName, campaign, options),
  };
}

export function _getBetaVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
): BetaVoiceAgentsTelephonyOperations {
  return { ..._getBetaVoiceAgentsTelephony(context) };
}
