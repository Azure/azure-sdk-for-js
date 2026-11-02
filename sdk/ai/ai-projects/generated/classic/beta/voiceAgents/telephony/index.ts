// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
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
  TelephonyCallJob,
} from "../../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaVoiceAgentsTelephony operations. */
export interface BetaVoiceAgentsTelephonyOperations {
  /** Requests cancellation of a durable outbound call job using If-Match. Prevents future attempts and may complete asynchronously. A new cancellation request after the call has connected returns 409; the connected call is allowed to finish naturally. */
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
  /** Deletes a terminal, fully reconciled CallJob; otherwise returns 409. It does not cancel calls or remove Campaign outcomes, conversations, recordings or replay safeguards. Subsequent GET returns 404 and repeated DELETE returns 204. A retained creation key returns 409 call_job_deleted, never a new call. */
  deleteCallJob: (
    agentName: string,
    callJobId: string,
    options?: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  ) => Promise<void>;
  /** Lists the Agent's direct and Campaign call jobs, excluding deleted or superseded-round jobs. Status-filtered pages are live, not snapshots. A campaign_name cursor binds the first page's Campaign instance/round; boundary-job deletion and cancellation preserve it. Replacement, deletion/name reuse, or unknown/expired/mismatched boundaries return 400 invalid_cursor; restart from page one. Deleting Campaigns return an empty page. */
  listCallJobs: (
    agentName: string,
    options?: BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallJob>;
  /** Creates one durable direct outbound call job. Each attempt resolves the owning Agent's endpoint execution version before validation and uses that concrete version for its voice session. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    job: TelephonyCallJob,
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
      agentName: string,
      callJobId: string,
      options?: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
    ) => deleteCallJob(context, agentName, callJobId, options),
    listCallJobs: (
      agentName: string,
      options?: BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
    ) => listCallJobs(context, agentName, options),
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      job: TelephonyCallJob,
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
