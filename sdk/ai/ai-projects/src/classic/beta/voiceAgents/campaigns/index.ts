// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../../api/aiProjectContext.js";
import type {
  TelephonyCampaign,
  TelephonyCampaignOperation,
  TelephonyCampaignValidationError,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  BetaVoiceAgentsCampaignsDeleteOptionalParams,
  BetaVoiceAgentsCampaignsCancelOptionalParams,
  BetaVoiceAgentsCampaignsListOptionalParams,
  BetaVoiceAgentsCampaignsGetOptionalParams,
  BetaVoiceAgentsCampaignsCreateOptionalParams,
} from "../../../../api/beta/voiceAgents/campaigns/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";
import {
  getOperation,
  listValidationErrors,
  deleteCampaign,
  cancel,
  list,
  get,
  create,
} from "../../../../api/beta/voiceAgents/campaigns/operations.js";

/** Operations for BetaVoiceAgentsCampaignsOperations. */
export interface BetaVoiceAgentsCampaignsOperations {
  /** Gets the initiating operation's status. PUT/cancel pollers finish with a guarded Campaign GET; deletion completes without a resource result. */
  getOperation: (
    agentName: string,
    campaignName: string,
    operationId: string,
    options?: BetaVoiceAgentsCampaignsGetOperationOptionalParams,
  ) => Promise<TelephonyCampaignOperation>;
  /** Lists current-round row validation errors. Results may be partial during preparation; an empty page does not establish success. Execution errors are in CallJobs; non-row failures are in Campaign.error. */
  listValidationErrors: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsListValidationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaignValidationError>;
  /** Deletes a terminal Campaign and its recipient/task data asynchronously. Returns bodyless 202 with a monitor, not a tombstone; completion makes GET return 404 and lists omit it. Dataset, connections, Agent, independent jobs and call history are preserved. */
  deleteCampaign: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Cancels a validating or running Campaign using If-Match. Stops new calls and retries; connected calls finish naturally. Returns 202 with an operation monitor to track completion. */
  cancel: (
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsCampaignsCancelOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Lists the Agent's Campaigns without inline recipients. Filters are live views, not snapshots. */
  list: (
    agentName: string,
    options?: BetaVoiceAgentsCampaignsListOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaign>;
  /** Gets Campaign configuration and execution state without inline recipients. Absent or deleted Campaigns return 404. */
  get: (
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsCampaignsGetOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a Campaign or fully replaces failed preparation; no PATCH. All recipients must validate and have CallJobs before dialing. Immediate calls may begin before the preparation poller returns. */
  create: (
    agentName: string,
    campaignName: string,
    campaign: TelephonyCampaign,
    options?: BetaVoiceAgentsCampaignsCreateOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

export function _getBetaVoiceAgentsCampaignsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsCampaignsOperations {
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
