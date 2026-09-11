// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
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
  replaceTelephonyTransferTargets,
  getTelephonyTransferTargets,
  endTelephonyCall,
  transferTelephonyCall,
  getTelephonyCall,
  listTelephonyCalls,
  deleteTelephonyBinding,
  updateTelephonyBinding,
  getTelephonyBinding,
  listTelephonyBindings,
  createTelephonyBinding,
} from "../../../../api/beta/agents/foo/operations.js";
import {
  BetaAgentsFooGetOperationOptionalParams,
  BetaAgentsFooCancelCampaignOptionalParams,
  BetaAgentsFooResumeCampaignOptionalParams,
  BetaAgentsFooPauseCampaignOptionalParams,
  BetaAgentsFooPublishCampaignOptionalParams,
  BetaAgentsFooValidateCampaignOptionalParams,
  BetaAgentsFooGetCampaignRecipientImportOptionalParams,
  BetaAgentsFooImportCampaignRecipientsOptionalParams,
  BetaAgentsFooGetCampaignOptionalParams,
  BetaAgentsFooCreateCampaignOptionalParams,
  BetaAgentsFooCancelCallJobOptionalParams,
  BetaAgentsFooGetCallJobOptionalParams,
  BetaAgentsFooCreateCallJobOptionalParams,
  BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams,
  BetaAgentsFooGetTelephonyTransferTargetsOptionalParams,
  BetaAgentsFooEndTelephonyCallOptionalParams,
  BetaAgentsFooTransferTelephonyCallOptionalParams,
  BetaAgentsFooGetTelephonyCallOptionalParams,
  BetaAgentsFooListTelephonyCallsOptionalParams,
  BetaAgentsFooDeleteTelephonyBindingOptionalParams,
  BetaAgentsFooUpdateTelephonyBindingOptionalParams,
  BetaAgentsFooGetTelephonyBindingOptionalParams,
  BetaAgentsFooListTelephonyBindingsOptionalParams,
  BetaAgentsFooCreateTelephonyBindingOptionalParams,
} from "../../../../api/beta/agents/foo/options.js";
import {
  CreateTelephonyBindingRequestUnion,
  TelephonyBindingUnion,
  TelephonyBindingListItemUnion,
  UpdateTelephonyBindingRequest,
  TelephonyCallSummary,
  TelephonyCallRecord,
  TelephonyTransferTargets,
  TelephonyTransferTarget,
  CreateTelephonyCallJobRequest,
  TelephonyCallJob,
  CreateTelephonyCampaignRequest,
  TelephonyCampaign,
  ImportTelephonyCampaignRecipientsRequest,
  TelephonyOperationResource,
  TelephonyOperation,
  TelephonyCampaignRecipientImport,
  PublishTelephonyCampaignRequest,
} from "../../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaAgentsFoo operations. */
export interface BetaAgentsFooOperations {
  /** Retrieves an asynchronous outbound campaign operation. */
  getOperation: (
    agentName: string,
    operationId: string,
    options?: BetaAgentsFooGetOperationOptionalParams,
  ) => Promise<TelephonyOperation>;
  /** Cancels a campaign and prevents any further call-job dispatch. */
  cancelCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentsFooCancelCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Resumes dispatch of call jobs owned by a paused campaign. */
  resumeCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentsFooResumeCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Pauses dispatch of call jobs owned by a published campaign. */
  pauseCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentsFooPauseCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Permanently locks the validated campaign draft and starts asynchronous call-job materialization. */
  publishCampaign: (
    agentName: string,
    campaignId: string,
    body: PublishTelephonyCampaignRequest,
    options?: BetaAgentsFooPublishCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Starts asynchronous validation of the current campaign draft and imported recipient snapshot. */
  validateCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentsFooValidateCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves the durable status and counters for a campaign recipient import. */
  getCampaignRecipientImport: (
    agentName: string,
    campaignId: string,
    importId: string,
    options?: BetaAgentsFooGetCampaignRecipientImportOptionalParams,
  ) => Promise<TelephonyCampaignRecipientImport>;
  /** Starts an asynchronous import of campaign recipients from a Dataset CSV, JSON array, or JSONL file. */
  importCampaignRecipients: (
    agentName: string,
    campaignId: string,
    idempotencyKey: string,
    body: ImportTelephonyCampaignRecipientsRequest,
    options?: BetaAgentsFooImportCampaignRecipientsOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves an outbound campaign, including configuration, execution state, and aggregate call-job counts. */
  getCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentsFooGetCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a draft outbound campaign. Recipients are imported and validated before the campaign can be published. */
  createCampaign: (
    agentName: string,
    body: CreateTelephonyCampaignRequest,
    options?: BetaAgentsFooCreateCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
  cancelCallJob: (
    agentName: string,
    callJobId: string,
    ifMatch: string,
    options?: BetaAgentsFooCancelCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Retrieves a durable direct or campaign-created outbound call job. */
  getCallJob: (
    agentName: string,
    callJobId: string,
    options?: BetaAgentsFooGetCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Creates one durable direct outbound call job. The latest agent definition is resolved when each attempt executes. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    body: CreateTelephonyCallJobRequest,
    options?: BetaAgentsFooCreateCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Replaces all transfer targets configured for the voice agent named in the path. */
  replaceTelephonyTransferTargets: (
    agentName: string,
    ifMatch: string,
    transferTargets: TelephonyTransferTarget[],
    options?: BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Returns all transfer targets configured for the voice agent named in the path. */
  getTelephonyTransferTargets: (
    agentName: string,
    options?: BetaAgentsFooGetTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Ends an active inbound call owned by the voice agent named in the path. */
  endTelephonyCall: (
    agentName: string,
    callId: string,
    options?: BetaAgentsFooEndTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Transfers an active inbound call to a configured target for the voice agent named in the path. */
  transferTelephonyCall: (
    agentName: string,
    callId: string,
    target: string,
    options?: BetaAgentsFooTransferTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Retrieves a durable inbound call record owned by the voice agent named in the path. */
  getTelephonyCall: (
    agentName: string,
    callId: string,
    options?: BetaAgentsFooGetTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Returns the durable inbound call history for the voice agent named in the path. */
  listTelephonyCalls: (
    agentName: string,
    options?: BetaAgentsFooListTelephonyCallsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallSummary>;
  /** Deletes a telephony binding owned by the voice agent named in the path. */
  deleteTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    options?: BetaAgentsFooDeleteTelephonyBindingOptionalParams,
  ) => Promise<void>;
  /** Updates a telephony binding owned by the voice agent named in the path. */
  updateTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    body: UpdateTelephonyBindingRequest,
    options?: BetaAgentsFooUpdateTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Retrieves a telephony binding owned by the voice agent named in the path. */
  getTelephonyBinding: (
    agentName: string,
    bindingId: string,
    options?: BetaAgentsFooGetTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
  /** Returns the telephony bindings owned by the voice agent named in the path. */
  listTelephonyBindings: (
    agentName: string,
    options?: BetaAgentsFooListTelephonyBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyBindingListItemUnion>;
  /** Creates a telephony binding for the voice agent named in the path. */
  createTelephonyBinding: (
    agentName: string,
    body: CreateTelephonyBindingRequestUnion,
    options?: BetaAgentsFooCreateTelephonyBindingOptionalParams,
  ) => Promise<TelephonyBindingUnion>;
}

function _getBetaAgentsFoo(context: AIProjectContext) {
  return {
    getOperation: (
      agentName: string,
      operationId: string,
      options?: BetaAgentsFooGetOperationOptionalParams,
    ) => getOperation(context, agentName, operationId, options),
    cancelCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentsFooCancelCampaignOptionalParams,
    ) => cancelCampaign(context, agentName, campaignId, options),
    resumeCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentsFooResumeCampaignOptionalParams,
    ) => resumeCampaign(context, agentName, campaignId, options),
    pauseCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentsFooPauseCampaignOptionalParams,
    ) => pauseCampaign(context, agentName, campaignId, options),
    publishCampaign: (
      agentName: string,
      campaignId: string,
      body: PublishTelephonyCampaignRequest,
      options?: BetaAgentsFooPublishCampaignOptionalParams,
    ) => publishCampaign(context, agentName, campaignId, body, options),
    validateCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentsFooValidateCampaignOptionalParams,
    ) => validateCampaign(context, agentName, campaignId, options),
    getCampaignRecipientImport: (
      agentName: string,
      campaignId: string,
      importId: string,
      options?: BetaAgentsFooGetCampaignRecipientImportOptionalParams,
    ) => getCampaignRecipientImport(context, agentName, campaignId, importId, options),
    importCampaignRecipients: (
      agentName: string,
      campaignId: string,
      idempotencyKey: string,
      body: ImportTelephonyCampaignRecipientsRequest,
      options?: BetaAgentsFooImportCampaignRecipientsOptionalParams,
    ) => importCampaignRecipients(context, agentName, campaignId, idempotencyKey, body, options),
    getCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentsFooGetCampaignOptionalParams,
    ) => getCampaign(context, agentName, campaignId, options),
    createCampaign: (
      agentName: string,
      body: CreateTelephonyCampaignRequest,
      options?: BetaAgentsFooCreateCampaignOptionalParams,
    ) => createCampaign(context, agentName, body, options),
    cancelCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: BetaAgentsFooCancelCallJobOptionalParams,
    ) => cancelCallJob(context, agentName, callJobId, ifMatch, options),
    getCallJob: (
      agentName: string,
      callJobId: string,
      options?: BetaAgentsFooGetCallJobOptionalParams,
    ) => getCallJob(context, agentName, callJobId, options),
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      body: CreateTelephonyCallJobRequest,
      options?: BetaAgentsFooCreateCallJobOptionalParams,
    ) => createCallJob(context, agentName, idempotencyKey, body, options),
    replaceTelephonyTransferTargets: (
      agentName: string,
      ifMatch: string,
      transferTargets: TelephonyTransferTarget[],
      options?: BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams,
    ) => replaceTelephonyTransferTargets(context, agentName, ifMatch, transferTargets, options),
    getTelephonyTransferTargets: (
      agentName: string,
      options?: BetaAgentsFooGetTelephonyTransferTargetsOptionalParams,
    ) => getTelephonyTransferTargets(context, agentName, options),
    endTelephonyCall: (
      agentName: string,
      callId: string,
      options?: BetaAgentsFooEndTelephonyCallOptionalParams,
    ) => endTelephonyCall(context, agentName, callId, options),
    transferTelephonyCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: BetaAgentsFooTransferTelephonyCallOptionalParams,
    ) => transferTelephonyCall(context, agentName, callId, target, options),
    getTelephonyCall: (
      agentName: string,
      callId: string,
      options?: BetaAgentsFooGetTelephonyCallOptionalParams,
    ) => getTelephonyCall(context, agentName, callId, options),
    listTelephonyCalls: (
      agentName: string,
      options?: BetaAgentsFooListTelephonyCallsOptionalParams,
    ) => listTelephonyCalls(context, agentName, options),
    deleteTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      options?: BetaAgentsFooDeleteTelephonyBindingOptionalParams,
    ) => deleteTelephonyBinding(context, agentName, bindingId, ifMatch, options),
    updateTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: BetaAgentsFooUpdateTelephonyBindingOptionalParams,
    ) => updateTelephonyBinding(context, agentName, bindingId, ifMatch, body, options),
    getTelephonyBinding: (
      agentName: string,
      bindingId: string,
      options?: BetaAgentsFooGetTelephonyBindingOptionalParams,
    ) => getTelephonyBinding(context, agentName, bindingId, options),
    listTelephonyBindings: (
      agentName: string,
      options?: BetaAgentsFooListTelephonyBindingsOptionalParams,
    ) => listTelephonyBindings(context, agentName, options),
    createTelephonyBinding: (
      agentName: string,
      body: CreateTelephonyBindingRequestUnion,
      options?: BetaAgentsFooCreateTelephonyBindingOptionalParams,
    ) => createTelephonyBinding(context, agentName, body, options),
  };
}

export function _getBetaAgentsFooOperations(context: AIProjectContext): BetaAgentsFooOperations {
  return {
    ..._getBetaAgentsFoo(context),
  };
}
