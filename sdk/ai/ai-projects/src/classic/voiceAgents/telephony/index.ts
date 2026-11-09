// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type {
  TelephonyBindingUnion,
  TelephonyBindingListItemUnion,
  UpdateTelephonyBindingRequest,
  TelephonyCallSummary,
  TelephonyCallRecord,
  TelephonyTransferTargets,
  TelephonyTransferTarget,
  TelephonyCallJobCreate,
  TelephonyCallJob,
  TelephonyBindingCreateUnion,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type {
  VoiceAgentsTelephonyCancelCallJobOptionalParams,
  VoiceAgentsTelephonyGetCallJobOptionalParams,
  VoiceAgentsTelephonyDeleteCallJobOptionalParams,
  VoiceAgentsTelephonyListCallJobsOptionalParams,
  VoiceAgentsTelephonyCreateCallJobOptionalParams,
  VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  VoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  VoiceAgentsTelephonyEndCallOptionalParams,
  VoiceAgentsTelephonyTransferCallOptionalParams,
  VoiceAgentsTelephonyGetCallOptionalParams,
  VoiceAgentsTelephonyListCallsOptionalParams,
  VoiceAgentsTelephonyDeleteBindingOptionalParams,
  VoiceAgentsTelephonyUpdateBindingOptionalParams,
  VoiceAgentsTelephonyGetBindingOptionalParams,
  VoiceAgentsTelephonyListBindingsOptionalParams,
  VoiceAgentsTelephonyCreateBindingOptionalParams,
} from "../../../api/voiceAgents/telephony/options.js";
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
} from "../../../api/voiceAgents/telephony/operations.js";
import type { ResolvedTracingConfig } from "../../../tracing/configuration.js";
import { traceVoiceAgentOperation } from "../../../tracing/voiceAgentTracing.js";

/** Operations for managing voice agent telephony. */
export interface VoiceAgentsTelephonyOperations {
  /** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
  cancelCallJob: (
    agentName: string,
    callJobId: string,
    ifMatch: string,
    options?: VoiceAgentsTelephonyCancelCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Retrieves a durable direct or campaign-created outbound call job. */
  getCallJob: (
    agentName: string,
    callJobId: string,
    options?: VoiceAgentsTelephonyGetCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Deletes a terminal, reconciled job (otherwise 409), without cancelling calls or removing Campaign outcomes/call history. Later GET returns 404; repeated DELETE returns 204. Deleting a SIP call job requires the `VoiceAgents=V1Preview` opt-in. */
  deleteCallJob: (
    agentName: string,
    callJobId: string,
    options?: VoiceAgentsTelephonyDeleteCallJobOptionalParams,
  ) => Promise<void>;
  /** Lists current direct/Campaign jobs, excluding deleted or superseded rounds. Pages are live. Campaign cursors survive boundary deletion/cancel, not replacement/name reuse (400 invalid_cursor). */
  listCallJobs: (
    agentName: string,
    options?: VoiceAgentsTelephonyListCallJobsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallJob>;
  /** Creates one durable outbound CallJob. Each attempt pins the Agent endpoint's execution version for validation and its voice session. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    job: TelephonyCallJobCreate,
    options?: VoiceAgentsTelephonyCreateCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Replaces all transfer targets configured for the voice agent named in the path. */
  replaceTransferTargets: (
    agentName: string,
    ifMatch: string,
    transferTargets: TelephonyTransferTarget[],
    options?: VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Returns all transfer targets configured for the voice agent named in the path. */
  getTransferTargets: (
    agentName: string,
    options?: VoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Ends an active inbound call owned by the voice agent named in the path. */
  endCall: (
    agentName: string,
    callId: string,
    options?: VoiceAgentsTelephonyEndCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Transfers an active inbound call to a configured target for the voice agent named in the path. */
  transferCall: (
    agentName: string,
    callId: string,
    target: string,
    options?: VoiceAgentsTelephonyTransferCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Retrieves a durable inbound call record owned by the voice agent named in the path. */
  getCall: (
    agentName: string,
    callId: string,
    options?: VoiceAgentsTelephonyGetCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Returns the durable inbound call history for the voice agent named in the path. */
  listCalls: (
    agentName: string,
    options?: VoiceAgentsTelephonyListCallsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallSummary>;
  /** Deletes a telephony binding owned by the voice agent named in the path. */
  deleteBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    options?: VoiceAgentsTelephonyDeleteBindingOptionalParams,
  ) => Promise<void>;
  /** Updates a telephony binding owned by the voice agent named in the path. */
  updateBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    body: UpdateTelephonyBindingRequest,
    options?: VoiceAgentsTelephonyUpdateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Retrieves a telephony binding owned by the voice agent named in the path. */
  getBinding: (
    agentName: string,
    bindingId: string,
    options?: VoiceAgentsTelephonyGetBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Returns the telephony bindings owned by the voice agent named in the path. */
  listBindings: (
    agentName: string,
    options?: VoiceAgentsTelephonyListBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyBindingListItemUnion>;
  /** Creates a telephony binding for the voice agent named in the path. */
  createBinding: (
    agentName: string,
    binding: TelephonyBindingCreateUnion,
    options?: VoiceAgentsTelephonyCreateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
}

function _getVoiceAgentsTelephony(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): VoiceAgentsTelephonyOperations {
  const run = <T>(name: string, operation: () => Promise<T>): Promise<T> =>
    traceVoiceAgentOperation(
      `voice_agents.telephony.${name}`,
      context.endpoint,
      tracingConfig,
      operation,
    );
  return {
    cancelCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: VoiceAgentsTelephonyCancelCallJobOptionalParams,
    ) =>
      run("cancel_call_job", () => cancelCallJob(context, agentName, callJobId, ifMatch, options)),
    getCallJob: (
      agentName: string,
      callJobId: string,
      options?: VoiceAgentsTelephonyGetCallJobOptionalParams,
    ) => getCallJob(context, agentName, callJobId, options),
    deleteCallJob: (
      agentName: string,
      callJobId: string,
      options?: VoiceAgentsTelephonyDeleteCallJobOptionalParams,
    ) => deleteCallJob(context, agentName, callJobId, options),
    listCallJobs: (agentName: string, options?: VoiceAgentsTelephonyListCallJobsOptionalParams) =>
      listCallJobs(context, agentName, options),
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      job: TelephonyCallJobCreate,
      options?: VoiceAgentsTelephonyCreateCallJobOptionalParams,
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
      options?: VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
    ) =>
      run("replace_transfer_targets", () =>
        replaceTransferTargets(context, agentName, ifMatch, transferTargets, options),
      ),
    getTransferTargets: (
      agentName: string,
      options?: VoiceAgentsTelephonyGetTransferTargetsOptionalParams,
    ) => getTransferTargets(context, agentName, options),
    endCall: (
      agentName: string,
      callId: string,
      options?: VoiceAgentsTelephonyEndCallOptionalParams,
    ) => run("end_call", () => endCall(context, agentName, callId, options)),
    transferCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: VoiceAgentsTelephonyTransferCallOptionalParams,
    ) => run("transfer_call", () => transferCall(context, agentName, callId, target, options)),
    getCall: (
      agentName: string,
      callId: string,
      options?: VoiceAgentsTelephonyGetCallOptionalParams,
    ) => getCall(context, agentName, callId, options),
    listCalls: (agentName: string, options?: VoiceAgentsTelephonyListCallsOptionalParams) =>
      listCalls(context, agentName, options),
    deleteBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      options?: VoiceAgentsTelephonyDeleteBindingOptionalParams,
    ) =>
      run("delete_binding", () => deleteBinding(context, agentName, bindingId, ifMatch, options)),
    updateBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: VoiceAgentsTelephonyUpdateBindingOptionalParams,
    ) =>
      run("update_binding", () =>
        updateBinding(context, agentName, bindingId, ifMatch, body, options),
      ),
    getBinding: (
      agentName: string,
      bindingId: string,
      options?: VoiceAgentsTelephonyGetBindingOptionalParams,
    ) => getBinding(context, agentName, bindingId, options),
    listBindings: (agentName: string, options?: VoiceAgentsTelephonyListBindingsOptionalParams) =>
      listBindings(context, agentName, options),
    createBinding: (
      agentName: string,
      binding: TelephonyBindingCreateUnion,
      options?: VoiceAgentsTelephonyCreateBindingOptionalParams,
    ) => run("create_binding", () => createBinding(context, agentName, binding, options)),
  };
}

export function _getVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): VoiceAgentsTelephonyOperations {
  return { ..._getVoiceAgentsTelephony(context, tracingConfig) };
}
