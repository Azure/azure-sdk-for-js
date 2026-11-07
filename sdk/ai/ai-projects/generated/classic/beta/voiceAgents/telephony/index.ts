// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  getOperation,
  listValidationErrors,
  deleteTelephony,
  cancel,
  list,
  get,
  create,
  cancelCallJob,
  getCallJob,
  deleteCallJob,
  listCallJobs,
  createCallJob,
  replaceTransferTargets,
  getTransferTargets,
  endCall,
  transferCall,
  getCall,
  listCalls,
  deleteBinding,
  updateBinding,
  getBinding,
  listBindings,
  createBinding,
} from "../../../../api/beta/voiceAgents/telephony/operations.js";
import {
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteOptionalParams,
  BetaVoiceAgentsTelephonyCancelOptionalParams,
  BetaVoiceAgentsTelephonyListOptionalParams,
  BetaVoiceAgentsTelephonyGetOptionalParams,
  BetaVoiceAgentsTelephonyCreateOptionalParams,
  BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
  BetaVoiceAgentsTelephonyGetCallJobOptionalParams,
  BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
  BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
  BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyEndCallOptionalParams,
  BetaVoiceAgentsTelephonyTransferCallOptionalParams,
  BetaVoiceAgentsTelephonyGetCallOptionalParams,
  BetaVoiceAgentsTelephonyListCallsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteBindingOptionalParams,
  BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
  BetaVoiceAgentsTelephonyGetBindingOptionalParams,
  BetaVoiceAgentsTelephonyListBindingsOptionalParams,
  BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
} from "../../../../api/beta/voiceAgents/telephony/options.js";
import {
  TelephonyBindingUnion,
  TelephonyBindingListItemUnion,
  UpdateTelephonyBindingRequest,
  TelephonyCallSummary,
  TelephonyCallRecord,
  TelephonyTransferTargets,
  TelephonyTransferTarget,
  TelephonyCallJobCreate,
  TelephonyCallJob,
  TelephonyCampaign,
  TelephonyCampaignOperation,
  TelephonyCampaignValidationError,
} from "../../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaVoiceAgentsTelephony operations. */
export interface BetaVoiceAgentsTelephonyOperations {
  /** Gets the initiating operation's status. PUT/cancel pollers finish with a guarded Campaign GET; deletion completes without a resource result. */
  getOperation: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    operationId: string,
    options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  ) => Promise<TelephonyCampaignOperation>;
  /** Lists current-round row validation errors. Results may be partial during preparation; an empty page does not establish success. Execution errors are in CallJobs; non-row failures are in Campaign.error. */
  listValidationErrors: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaignValidationError>;
  /** Deletes a terminal Campaign and its recipient/task data asynchronously. Returns bodyless 202 with a monitor, not a tombstone; completion makes GET return 404 and lists omit it. Dataset, connections, Agent, independent jobs and call history are preserved. */
  deleteTelephony: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Cancels a validating or running Campaign using If-Match. Stops new calls and retries; connected calls finish naturally. Returns 202 with an operation monitor to track completion. */
  cancel: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyCancelOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Lists the Agent's Campaigns without inline recipients. Filters are live views, not snapshots. */
  list: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCampaign>;
  /** Gets Campaign configuration and execution state without inline recipients. Absent or deleted Campaigns return 404. */
  get: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    options?: BetaVoiceAgentsTelephonyGetOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a Campaign or fully replaces failed preparation; no PATCH. All recipients must validate and have CallJobs before dialing. Immediate calls may begin before the preparation poller returns. */
  create: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    campaignName: string,
    campaign: TelephonyCampaign,
    options?: BetaVoiceAgentsTelephonyCreateOptionalParams,
  ) => PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
  /** Cancels future attempts using If-Match; completion may be asynchronous. New cancellation after connection returns 409 and lets the active call finish. */
  cancelCallJob: (
    agentName: string,
    callJobId: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Retrieves a durable direct or campaign-created outbound call job. */
  getCallJob: (
    agentName: string,
    callJobId: string,
    options?: BetaVoiceAgentsTelephonyGetCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Deletes a terminal, reconciled job (otherwise 409), without cancelling calls or removing Campaign outcomes/call history. Later GET returns 404; repeated DELETE returns 204. */
  deleteCallJob: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    callJobId: string,
    options?: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  ) => Promise<void>;
  /** Lists current direct/Campaign jobs, excluding deleted or superseded rounds. Pages are live. Campaign cursors survive boundary deletion/cancel, not replacement/name reuse (400 invalid_cursor). */
  listCallJobs: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallJob>;
  /** Creates one durable outbound CallJob. Each attempt pins the Agent endpoint's execution version for validation and its voice session. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    job: TelephonyCallJobCreate,
    options?: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Replaces all transfer targets configured for the voice agent named in the path. */
  replaceTransferTargets: (
    agentName: string,
    ifMatch: string,
    transferTargets: TelephonyTransferTarget[],
    options?: BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Returns all transfer targets configured for the voice agent named in the path. */
  getTransferTargets: (
    agentName: string,
    options?: BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Ends an active inbound call owned by the voice agent named in the path. */
  endCall: (
    agentName: string,
    callId: string,
    options?: BetaVoiceAgentsTelephonyEndCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Transfers an active inbound call to a configured target for the voice agent named in the path. */
  transferCall: (
    agentName: string,
    callId: string,
    target: string,
    options?: BetaVoiceAgentsTelephonyTransferCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Retrieves a durable inbound call record owned by the voice agent named in the path. */
  getCall: (
    agentName: string,
    callId: string,
    options?: BetaVoiceAgentsTelephonyGetCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Returns the durable inbound call history for the voice agent named in the path. */
  listCalls: (
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListCallsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallSummary>;
  /** Deletes a telephony binding owned by the voice agent named in the path. */
  deleteBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    options?: BetaVoiceAgentsTelephonyDeleteBindingOptionalParams,
  ) => Promise<void>;
  /** Updates a telephony binding owned by the voice agent named in the path. */
  updateBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    body: UpdateTelephonyBindingRequest,
    options?: BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Retrieves a telephony binding owned by the voice agent named in the path. */
  getBinding: (
    agentName: string,
    bindingId: string,
    options?: BetaVoiceAgentsTelephonyGetBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Returns the telephony bindings owned by the voice agent named in the path. */
  listBindings: (
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyBindingListItemUnion>;
  /** Creates a telephony binding for the voice agent named in the path. */
  createBinding: (
    agentName: string,
    binding: TelephonyBindingUnion,
    options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
}

function _getBetaVoiceAgentsTelephony(context: AIProjectContext) {
  return {
    getOperation: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      operationId: string,
      options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
    ) => getOperation(context, foundryFeatures, agentName, campaignName, operationId, options),
    listValidationErrors: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
    ) => listValidationErrors(context, foundryFeatures, agentName, campaignName, options),
    deleteTelephony: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyDeleteOptionalParams,
    ) => deleteTelephony(context, foundryFeatures, agentName, campaignName, ifMatch, options),
    cancel: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyCancelOptionalParams,
    ) => cancel(context, foundryFeatures, agentName, campaignName, ifMatch, options),
    list: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaVoiceAgentsTelephonyListOptionalParams,
    ) => list(context, foundryFeatures, agentName, options),
    get: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      options?: BetaVoiceAgentsTelephonyGetOptionalParams,
    ) => get(context, foundryFeatures, agentName, campaignName, options),
    create: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      campaignName: string,
      campaign: TelephonyCampaign,
      options?: BetaVoiceAgentsTelephonyCreateOptionalParams,
    ) => create(context, foundryFeatures, agentName, campaignName, campaign, options),
    cancelCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
    ) => cancelCallJob(context, agentName, callJobId, ifMatch, options),
    getCallJob: (
      agentName: string,
      callJobId: string,
      options?: BetaVoiceAgentsTelephonyGetCallJobOptionalParams,
    ) => getCallJob(context, agentName, callJobId, options),
    deleteCallJob: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      callJobId: string,
      options?: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
    ) => deleteCallJob(context, foundryFeatures, agentName, callJobId, options),
    listCallJobs: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
    ) => listCallJobs(context, foundryFeatures, agentName, options),
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      job: TelephonyCallJobCreate,
      options?: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
    ) => createCallJob(context, agentName, idempotencyKey, job, options),
    replaceTransferTargets: (
      agentName: string,
      ifMatch: string,
      transferTargets: TelephonyTransferTarget[],
      options?: BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
    ) => replaceTransferTargets(context, agentName, ifMatch, transferTargets, options),
    getTransferTargets: (
      agentName: string,
      options?: BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
    ) => getTransferTargets(context, agentName, options),
    endCall: (
      agentName: string,
      callId: string,
      options?: BetaVoiceAgentsTelephonyEndCallOptionalParams,
    ) => endCall(context, agentName, callId, options),
    transferCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: BetaVoiceAgentsTelephonyTransferCallOptionalParams,
    ) => transferCall(context, agentName, callId, target, options),
    getCall: (
      agentName: string,
      callId: string,
      options?: BetaVoiceAgentsTelephonyGetCallOptionalParams,
    ) => getCall(context, agentName, callId, options),
    listCalls: (agentName: string, options?: BetaVoiceAgentsTelephonyListCallsOptionalParams) =>
      listCalls(context, agentName, options),
    deleteBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyDeleteBindingOptionalParams,
    ) => deleteBinding(context, agentName, bindingId, ifMatch, options),
    updateBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
    ) => updateBinding(context, agentName, bindingId, ifMatch, body, options),
    getBinding: (
      agentName: string,
      bindingId: string,
      options?: BetaVoiceAgentsTelephonyGetBindingOptionalParams,
    ) => getBinding(context, agentName, bindingId, options),
    listBindings: (
      agentName: string,
      options?: BetaVoiceAgentsTelephonyListBindingsOptionalParams,
    ) => listBindings(context, agentName, options),
    createBinding: (
      agentName: string,
      binding: TelephonyBindingUnion,
      options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
    ) => createBinding(context, agentName, binding, options),
  };
}

export function _getBetaVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
): BetaVoiceAgentsTelephonyOperations {
  return {
    ..._getBetaVoiceAgentsTelephony(context),
  };
}
