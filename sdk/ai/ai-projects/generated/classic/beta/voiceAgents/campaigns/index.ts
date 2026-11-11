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
  /** Gets the initiating operation's status. PUT/cancel pollers finish with a guarded Campaign GET; deletion completes without a resource result. */
  getOperation: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    operationId: string,
    options?: BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  ) => Promise<TelephonyCampaignOperation>;
  /** Lists current-round row validation errors. Results may be partial during preparation; an empty page does not establish success. Execution errors are in CallJobs; non-row failures are in Campaign.error. */
  listValidationErrors: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaignValidationError>;
  /** Deletes a terminal Campaign and its recipient/task data asynchronously. Returns bodyless 202 with a monitor, not a tombstone; completion makes GET return 404 and lists omit it. Dataset, connections, Agent, independent jobs and call history are preserved. */
  deleteCampaign: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Cancels a validating or running Campaign using If-Match. Stops new calls and retries; connected calls finish naturally. Returns 202 with an operation monitor to track completion. */
  cancel: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsCancelOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Lists the Agent's Campaigns without inline recipients. Filters are live views, not snapshots. */
  list: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaVoiceAgentsCampaignsListOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaign>;
  /** Gets Campaign configuration and execution state without inline recipients. Absent or deleted Campaigns return 404. */
  get: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsGetOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a Campaign or fully replaces failed preparation; no PATCH. All recipients must validate and have CallJobs before dialing. Immediate calls may begin before the preparation poller returns. */
  create: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    campaign: TelephonyCampaign,
    options?: BetaVoiceAgentsCampaignsCreateOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

function _getBetaVoiceAgentsCampaigns(context: AIProjectContext) {
  return {
    getOperation: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      operationId: string,
      options?: BetaVoiceAgentsCampaignsGetOperationOptionalParams,
    ) => getOperation(context, foundryFeatures, agentName, campaignName, operationId, options),
    listValidationErrors: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
    ) => listValidationErrors(context, foundryFeatures, agentName, campaignName, options),
    deleteCampaign: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsCampaignsDeleteOptionalParams,
    ) => deleteCampaign(context, foundryFeatures, agentName, campaignName, ifMatch, options),
    cancel: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsCampaignsCancelOptionalParams,
    ) => cancel(context, foundryFeatures, agentName, campaignName, ifMatch, options),
    list: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaVoiceAgentsCampaignsListOptionalParams,
    ) => list(context, foundryFeatures, agentName, options),
    get: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsCampaignsGetOptionalParams,
    ) => get(context, foundryFeatures, agentName, campaignName, options),
    create: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      campaign: TelephonyCampaign,
      options?: BetaVoiceAgentsCampaignsCreateOptionalParams,
    ) => create(context, foundryFeatures, agentName, campaignName, campaign, options),
  };
}

export function _getBetaVoiceAgentsCampaignsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsCampaignsOperations {
  return {
    ..._getBetaVoiceAgentsCampaigns(context),
  };
}
