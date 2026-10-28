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
} from "../../../../api/beta/voiceAgents/telephony/options.js";
import type {
  CreateTelephonyCallJobRequest,
  TelephonyCallJob,
  CreateTelephonyBindingRequestUnion,
  TelephonyBindingListItemUnion,
  TelephonyBindingUnion,
  TelephonyCallRecord,
  TelephonyCallSummary,
  TelephonyTransferTarget,
  TelephonyTransferTargets,
  UpdateTelephonyBindingRequest,
} from "../../../../models/models.js";

import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ResolvedTracingConfig } from "../../../../tracing/configuration.js";
import { traceVoiceAgentOperation } from "../../../../tracing/voiceAgentTracing.js";

/** Operations for managing voice agent telephony. */
export interface BetaVoiceAgentsTelephonyOperations {
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
  /** Creates one durable direct outbound call job. The latest agent definition is resolved when each attempt executes. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    body: CreateTelephonyCallJobRequest,
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
    telephonyBinding: CreateTelephonyBindingRequestUnion,
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
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      body: CreateTelephonyCallJobRequest,
      options?: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
    ) =>
      traceVoiceAgentOperation(
        "voice_agents.telephony.create_call_job",
        context.endpoint,
        tracingConfig,
        () => createCallJob(context, agentName, idempotencyKey, body, options),
        (job) => ({
          "az.ai.voice_agents.telephony.call_job.id": job.id,
          "az.ai.voice_agents.call_job.status": job.status,
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
      telephonyBinding: CreateTelephonyBindingRequestUnion,
      options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
    ) => run("create_binding", () => createBinding(context, agentName, telephonyBinding, options)),
  };
}

export function _getBetaVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): BetaVoiceAgentsTelephonyOperations {
  return { ..._getBetaVoiceAgentsTelephony(context, tracingConfig) };
}
