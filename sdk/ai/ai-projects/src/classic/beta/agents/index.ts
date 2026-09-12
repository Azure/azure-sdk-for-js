// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteOptimizationJob,
  cancelOptimizationJob,
  listOptimizationJobs,
  getOptimizationJob,
  createOptimizationJob,
  createTelephonyBinding,
  deleteTelephonyBinding,
  endTelephonyCall,
  generate,
  getTelephonyBinding,
  getTelephonyCall,
  getTelephonyTransferTargets,
  listTelephonyBindings,
  listTelephonyCalls,
  replaceTelephonyTransferTargets,
  transferTelephonyCall,
  updateTelephonyBinding,
} from "../../../api/beta/agents/operations.js";
import type {
  BetaAgentsDeleteOptimizationJobOptionalParams,
  BetaAgentsCancelOptimizationJobOptionalParams,
  BetaAgentsListOptimizationJobsOptionalParams,
  BetaAgentsGetOptimizationJobOptionalParams,
  BetaAgentsCreateOptimizationJobOptionalParams,
  BetaAgentsCreateTelephonyBindingOptionalParams,
  BetaAgentsDeleteTelephonyBindingOptionalParams,
  BetaAgentsEndTelephonyCallOptionalParams,
  BetaAgentsGenerateOptionalParams,
  BetaAgentsGetTelephonyBindingOptionalParams,
  BetaAgentsGetTelephonyCallOptionalParams,
  BetaAgentsGetTelephonyTransferTargetsOptionalParams,
  BetaAgentsListTelephonyBindingsOptionalParams,
  BetaAgentsListTelephonyCallsOptionalParams,
  BetaAgentsReplaceTelephonyTransferTargetsOptionalParams,
  BetaAgentsTransferTelephonyCallOptionalParams,
  BetaAgentsUpdateTelephonyBindingOptionalParams,
} from "../../../api/beta/agents/options.js";
import type {
  AgentOptimizationJob,
  AgentOptimizationJobResult,
  AgentOptimizationJobListItem,
  Agent,
  CreateTelephonyBindingRequestUnion,
  GenerateAgentRequest,
  TelephonyBindingListItemUnion,
  TelephonyBindingUnion,
  TelephonyCallRecord,
  TelephonyCallSummary,
  TelephonyTransferTarget,
  TelephonyTransferTargets,
  UpdateTelephonyBindingRequest,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /** Delete the job and its candidate artifacts. Cancels first if non-terminal. */
  deleteOptimizationJob: (
    jobId: string,
    options?: BetaAgentsDeleteOptimizationJobOptionalParams,
  ) => Promise<void>;
  /** Request cancellation of a running or queued job. Returns an error if the job is already in a terminal state. */
  cancelOptimizationJob: (
    jobId: string,
    options?: BetaAgentsCancelOptimizationJobOptionalParams,
  ) => Promise<AgentOptimizationJob>;
  /** List optimization jobs. Supports cursor pagination and optional status / agent_name filters. */
  listOptimizationJobs: (
    options?: BetaAgentsListOptimizationJobsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentOptimizationJobListItem>;
  /** Get an optimization job by id. */
  getOptimizationJob: (
    jobId: string,
    options?: BetaAgentsGetOptimizationJobOptionalParams,
  ) => Promise<AgentOptimizationJob>;
  /** Create an optimization job. Returns 201 with the queued job. Honours `Operation-Id` for idempotent retry. */
  createOptimizationJob: (
    job: AgentOptimizationJob,
    options?: BetaAgentsCreateOptimizationJobOptionalParams,
  ) => JobPoller<AgentOptimizationJobResult>;

  /** Replaces all transfer targets configured for the voice agent named in the path. */
  replaceTelephonyTransferTargets: (
    agentName: string,
    ifMatch: string,
    transferTargets: TelephonyTransferTarget[],
    options?: BetaAgentsReplaceTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;

  /** Returns all transfer targets configured for the voice agent named in the path. */
  getTelephonyTransferTargets: (
    agentName: string,
    options?: BetaAgentsGetTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;

  /** Ends an active inbound call owned by the voice agent named in the path. */
  endTelephonyCall: (
    agentName: string,
    callId: string,
    options?: BetaAgentsEndTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;

  /** Transfers an active inbound call to a configured target for the voice agent named in the path. */
  transferTelephonyCall: (
    agentName: string,
    callId: string,
    target: string,
    options?: BetaAgentsTransferTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;

  /** Retrieves a durable inbound call record owned by the voice agent named in the path. */
  getTelephonyCall: (
    agentName: string,
    callId: string,
    options?: BetaAgentsGetTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;

  /** Returns the durable inbound call history for the voice agent named in the path. */
  listTelephonyCalls: (
    agentName: string,
    options?: BetaAgentsListTelephonyCallsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallSummary>;

  /** Deletes a telephony binding owned by the voice agent named in the path. */
  deleteTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    options?: BetaAgentsDeleteTelephonyBindingOptionalParams,
  ) => Promise<void>;

  /** Updates a telephony binding owned by the voice agent named in the path. */
  updateTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    body: UpdateTelephonyBindingRequest,
    options?: BetaAgentsUpdateTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;

  /** Retrieves a telephony binding owned by the voice agent named in the path. */
  getTelephonyBinding: (
    agentName: string,
    bindingId: string,
    options?: BetaAgentsGetTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;

  /** Returns the telephony bindings owned by the voice agent named in the path. */
  listTelephonyBindings: (
    agentName: string,
    options?: BetaAgentsListTelephonyBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyBindingListItemUnion>;

  /** Creates a telephony binding for the voice agent named in the path. */
  createTelephonyBinding: (
    agentName: string,
    body: CreateTelephonyBindingRequestUnion,
    options?: BetaAgentsCreateTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;

  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  generate: (
    body: GenerateAgentRequest,
    options?: BetaAgentsGenerateOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    deleteOptimizationJob: (
      jobId: string,
      options?: BetaAgentsDeleteOptimizationJobOptionalParams,
    ) => deleteOptimizationJob(context, jobId, options),
    cancelOptimizationJob: (
      jobId: string,
      options?: BetaAgentsCancelOptimizationJobOptionalParams,
    ) => cancelOptimizationJob(context, jobId, options),
    listOptimizationJobs: (options?: BetaAgentsListOptimizationJobsOptionalParams) =>
      listOptimizationJobs(context, options),
    getOptimizationJob: (jobId: string, options?: BetaAgentsGetOptimizationJobOptionalParams) =>
      getOptimizationJob(context, jobId, options),
    createOptimizationJob: (
      job: AgentOptimizationJob,
      options?: BetaAgentsCreateOptimizationJobOptionalParams,
    ) => createOptimizationJob(context, job, options),

    replaceTelephonyTransferTargets: (
      agentName: string,
      ifMatch: string,
      transferTargets: TelephonyTransferTarget[],
      options?: BetaAgentsReplaceTelephonyTransferTargetsOptionalParams,
    ) => replaceTelephonyTransferTargets(context, agentName, ifMatch, transferTargets, options),

    getTelephonyTransferTargets: (
      agentName: string,
      options?: BetaAgentsGetTelephonyTransferTargetsOptionalParams,
    ) => getTelephonyTransferTargets(context, agentName, options),

    endTelephonyCall: (
      agentName: string,
      callId: string,
      options?: BetaAgentsEndTelephonyCallOptionalParams,
    ) => endTelephonyCall(context, agentName, callId, options),

    transferTelephonyCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: BetaAgentsTransferTelephonyCallOptionalParams,
    ) => transferTelephonyCall(context, agentName, callId, target, options),

    getTelephonyCall: (
      agentName: string,
      callId: string,
      options?: BetaAgentsGetTelephonyCallOptionalParams,
    ) => getTelephonyCall(context, agentName, callId, options),

    listTelephonyCalls: (agentName: string, options?: BetaAgentsListTelephonyCallsOptionalParams) =>
      listTelephonyCalls(context, agentName, options),

    deleteTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      options?: BetaAgentsDeleteTelephonyBindingOptionalParams,
    ) => deleteTelephonyBinding(context, agentName, bindingId, ifMatch, options),

    updateTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: BetaAgentsUpdateTelephonyBindingOptionalParams,
    ) => updateTelephonyBinding(context, agentName, bindingId, ifMatch, body, options),

    getTelephonyBinding: (
      agentName: string,
      bindingId: string,
      options?: BetaAgentsGetTelephonyBindingOptionalParams,
    ) => getTelephonyBinding(context, agentName, bindingId, options),

    listTelephonyBindings: (
      agentName: string,
      options?: BetaAgentsListTelephonyBindingsOptionalParams,
    ) => listTelephonyBindings(context, agentName, options),

    createTelephonyBinding: (
      agentName: string,
      body: CreateTelephonyBindingRequestUnion,
      options?: BetaAgentsCreateTelephonyBindingOptionalParams,
    ) => createTelephonyBinding(context, agentName, body, options),

    generate: (body: GenerateAgentRequest, options?: BetaAgentsGenerateOptionalParams) =>
      generate(context, body, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
