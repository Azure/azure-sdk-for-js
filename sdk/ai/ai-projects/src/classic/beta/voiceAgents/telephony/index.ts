// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  getOperation,
  cancelCampaign,
  resumeCampaign,
  pauseCampaign,
  publishCampaign,
  validateCampaign,
  getCampaignRecipientImport,
  importCampaignRecipients,
  getCampaign,
  createCampaign,
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
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyCancelCampaignOptionalParams,
  BetaVoiceAgentsTelephonyResumeCampaignOptionalParams,
  BetaVoiceAgentsTelephonyPauseCampaignOptionalParams,
  BetaVoiceAgentsTelephonyPublishCampaignOptionalParams,
  BetaVoiceAgentsTelephonyValidateCampaignOptionalParams,
  BetaVoiceAgentsTelephonyGetCampaignRecipientImportOptionalParams,
  BetaVoiceAgentsTelephonyImportCampaignRecipientsOptionalParams,
  BetaVoiceAgentsTelephonyGetCampaignOptionalParams,
  BetaVoiceAgentsTelephonyCreateCampaignOptionalParams,
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
  CreateTelephonyCampaignRequest,
  TelephonyCampaign,
  ImportTelephonyCampaignRecipientsRequest,
  TelephonyOperationResource,
  TelephonyOperation,
  TelephonyCampaignRecipientImport,
  PublishTelephonyCampaignRequest,
  CreateTelephonyBindingRequestUnion,
  TelephonyBindingListItemUnion,
  TelephonyBindingUnion,
  TelephonyCallRecord,
  TelephonyCallSummary,
  TelephonyTransferTarget,
  TelephonyTransferTargets,
  UpdateTelephonyBindingRequest,
} from "../../../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Operations for managing voice agent telephony. */
export interface BetaVoiceAgentsTelephonyOperations {
  /** Retrieves an asynchronous outbound campaign operation. */
  getOperation: (
    agentName: string,
    operationId: string,
    options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  ) => Promise<TelephonyOperation>;
  /** Cancels a campaign and prevents any further call-job dispatch. */
  cancelCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaVoiceAgentsTelephonyCancelCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Resumes dispatch of call jobs owned by a paused campaign. */
  resumeCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaVoiceAgentsTelephonyResumeCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Pauses dispatch of call jobs owned by a published campaign. */
  pauseCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaVoiceAgentsTelephonyPauseCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Permanently locks the validated campaign draft and starts asynchronous call-job materialization. */
  publishCampaign: (
    agentName: string,
    campaignId: string,
    body: PublishTelephonyCampaignRequest,
    options?: BetaVoiceAgentsTelephonyPublishCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Starts asynchronous validation of the current campaign draft and imported recipient snapshot. */
  validateCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaVoiceAgentsTelephonyValidateCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves the durable status and counters for a campaign recipient import. */
  getCampaignRecipientImport: (
    agentName: string,
    campaignId: string,
    importId: string,
    options?: BetaVoiceAgentsTelephonyGetCampaignRecipientImportOptionalParams,
  ) => Promise<TelephonyCampaignRecipientImport>;
  /** Starts an asynchronous import of campaign recipients from a Dataset CSV, JSON array, or JSONL file. */
  importCampaignRecipients: (
    agentName: string,
    campaignId: string,
    idempotencyKey: string,
    body: ImportTelephonyCampaignRecipientsRequest,
    options?: BetaVoiceAgentsTelephonyImportCampaignRecipientsOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves an outbound campaign, including configuration, execution state, and aggregate call-job counts. */
  getCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaVoiceAgentsTelephonyGetCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a draft outbound campaign. Recipients are imported and validated before the campaign can be published. */
  createCampaign: (
    agentName: string,
    body: CreateTelephonyCampaignRequest,
    options?: BetaVoiceAgentsTelephonyCreateCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
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
    body: CreateTelephonyBindingRequestUnion,
    options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
}

function _getBetaVoiceAgentsTelephony(
  context: AIProjectContext,
): BetaVoiceAgentsTelephonyOperations {
  return {
    getOperation: (
      agentName: string,
      operationId: string,
      options?: BetaVoiceAgentsTelephonyGetOperationOptionalParams,
    ) => getOperation(context, agentName, operationId, options),
    cancelCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaVoiceAgentsTelephonyCancelCampaignOptionalParams,
    ) => cancelCampaign(context, agentName, campaignId, options),
    resumeCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaVoiceAgentsTelephonyResumeCampaignOptionalParams,
    ) => resumeCampaign(context, agentName, campaignId, options),
    pauseCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaVoiceAgentsTelephonyPauseCampaignOptionalParams,
    ) => pauseCampaign(context, agentName, campaignId, options),
    publishCampaign: (
      agentName: string,
      campaignId: string,
      body: PublishTelephonyCampaignRequest,
      options?: BetaVoiceAgentsTelephonyPublishCampaignOptionalParams,
    ) => publishCampaign(context, agentName, campaignId, body, options),
    validateCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaVoiceAgentsTelephonyValidateCampaignOptionalParams,
    ) => validateCampaign(context, agentName, campaignId, options),
    getCampaignRecipientImport: (
      agentName: string,
      campaignId: string,
      importId: string,
      options?: BetaVoiceAgentsTelephonyGetCampaignRecipientImportOptionalParams,
    ) => getCampaignRecipientImport(context, agentName, campaignId, importId, options),
    importCampaignRecipients: (
      agentName: string,
      campaignId: string,
      idempotencyKey: string,
      body: ImportTelephonyCampaignRecipientsRequest,
      options?: BetaVoiceAgentsTelephonyImportCampaignRecipientsOptionalParams,
    ) => importCampaignRecipients(context, agentName, campaignId, idempotencyKey, body, options),
    getCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaVoiceAgentsTelephonyGetCampaignOptionalParams,
    ) => getCampaign(context, agentName, campaignId, options),
    createCampaign: (
      agentName: string,
      body: CreateTelephonyCampaignRequest,
      options?: BetaVoiceAgentsTelephonyCreateCampaignOptionalParams,
    ) => createCampaign(context, agentName, body, options),
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
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      body: CreateTelephonyCallJobRequest,
      options?: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
    ) => createCallJob(context, agentName, idempotencyKey, body, options),
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
      body: CreateTelephonyBindingRequestUnion,
      options?: BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
    ) => createBinding(context, agentName, body, options),
  };
}

export function _getBetaVoiceAgentsTelephonyOperations(
  context: AIProjectContext,
): BetaVoiceAgentsTelephonyOperations {
  return { ..._getBetaVoiceAgentsTelephony(context) };
}
