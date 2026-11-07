// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  cancelCallJob,
  getCallJob,
  createCallJob,
  createBinding,
  deleteBinding,
  endCall,
  getBinding,
  getCall,
  getTransferTargets,
  listBindings,
  listCalls,
  replaceTransferTargets,
  transferCall,
  updateBinding,
  deleteCallJob,
  listCallJobs,
  getOperation,
  listValidationErrors,
  deleteTelephony,
  cancel,
  list,
  get,
  create,
} from "../../../../api/beta/voiceAgents/telephony/operations.js";
import type {
  BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
  BetaVoiceAgentsTelephonyGetCallJobOptionalParams,
  BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
  BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
  BetaVoiceAgentsTelephonyDeleteBindingOptionalParams,
  BetaVoiceAgentsTelephonyEndCallOptionalParams,
  BetaVoiceAgentsTelephonyGetBindingOptionalParams,
  BetaVoiceAgentsTelephonyGetCallOptionalParams,
  BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyListBindingsOptionalParams,
  BetaVoiceAgentsTelephonyListCallsOptionalParams,
  BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyTransferCallOptionalParams,
  BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
  BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteOptionalParams,
  BetaVoiceAgentsTelephonyCancelOptionalParams,
  BetaVoiceAgentsTelephonyListOptionalParams,
  BetaVoiceAgentsTelephonyGetOptionalParams,
  BetaVoiceAgentsTelephonyCreateOptionalParams,
} from "../../../../api/beta/voiceAgents/telephony/options.js";
import type {
  TelephonyCallJob,
  TelephonyBindingListItemUnion,
  TelephonyBindingUnion,
  TelephonyBindingCreateUnion,
  TelephonyCallRecord,
  TelephonyCallSummary,
  TelephonyTransferTarget,
  TelephonyTransferTargets,
  UpdateTelephonyBindingRequest,
  TelephonyCallJobCreate,
  TelephonyCampaign,
  TelephonyCampaignOperation,
  TelephonyCampaignValidationError,
  TelephonyCampaignCreate,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ResolvedTracingConfig } from "../../../../tracing/configuration.js";
import { traceVoiceAgentOperation } from "../../../../tracing/voiceAgentTracing.js";
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
  /** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
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
    agentName: string,
    callJobId: string,
    options?: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  ) => Promise<void>;
  /** Lists current direct/Campaign jobs, excluding deleted or superseded rounds. Pages are live. Campaign cursors survive boundary deletion/cancel, not replacement/name reuse (400 invalid_cursor). */
  listCallJobs: (
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
    binding: TelephonyBindingCreateUnion,
    options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
}

function _getBetaVoiceAgentsTelephony(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): BetaVoiceAgentsTelephonyOperations {
  const run = <T>(name: string, operation: () => Promise<T>): Promise<T> =>
    traceVoiceAgentOperation(
      `voice_agents.telephony.${name}`,
      context.endpoint,
      tracingConfig,
      operation,
    );
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
    cancelCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
    ) =>
      run("cancel_call_job", () => cancelCallJob(context, agentName, callJobId, ifMatch, options)),
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
      job: TelephonyCallJobCreate,
      options?: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
    ) =>
      traceVoiceAgentOperation(
        "voice_agents.telephony.create_call_job",
        context.endpoint,
        tracingConfig,
        () => createCallJob(context, agentName, idempotencyKey, job, options),
        (createdJob) => ({
          "az.ai.voice_agents.telephony.call_job.id": createdJob.id,
          "az.ai.voice_agents.call_job.status": createdJob.status,
        }),
      ),
    replaceTransferTargets: (
      agentName: string,
      ifMatch: string,
      transferTargets: TelephonyTransferTarget[],
      options?: BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
    ) =>
      run("replace_transfer_targets", () =>
        replaceTransferTargets(context, agentName, ifMatch, transferTargets, options),
      ),
    getTransferTargets: (
      agentName: string,
      options?: BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
    ) => getTransferTargets(context, agentName, options),
    endCall: (
      agentName: string,
      callId: string,
      options?: BetaVoiceAgentsTelephonyEndCallOptionalParams,
    ) => run("end_call", () => endCall(context, agentName, callId, options)),
    transferCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: BetaVoiceAgentsTelephonyTransferCallOptionalParams,
    ) => run("transfer_call", () => transferCall(context, agentName, callId, target, options)),
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
    ) =>
      run("delete_binding", () => deleteBinding(context, agentName, bindingId, ifMatch, options)),
    updateBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
    ) =>
      run("update_binding", () =>
        updateBinding(context, agentName, bindingId, ifMatch, body, options),
      ),
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
      binding: TelephonyBindingCreateUnion,
      options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
    ) => run("create_binding", () => createBinding(context, agentName, binding, options)),
  };
}

export function _getBetaVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): BetaVoiceAgentsTelephonyOperations {
  return { ..._getBetaVoiceAgentsTelephony(context, tracingConfig) };
}
