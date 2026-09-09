// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
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
} from "../../../api/beta/agentTelephony/operations.js";
import {
  BetaAgentTelephonyGetOperationOptionalParams,
  BetaAgentTelephonyCancelCampaignOptionalParams,
  BetaAgentTelephonyResumeCampaignOptionalParams,
  BetaAgentTelephonyPauseCampaignOptionalParams,
  BetaAgentTelephonyPublishCampaignOptionalParams,
  BetaAgentTelephonyValidateCampaignOptionalParams,
  BetaAgentTelephonyGetCampaignRecipientImportOptionalParams,
  BetaAgentTelephonyImportCampaignRecipientsOptionalParams,
  BetaAgentTelephonyGetCampaignOptionalParams,
  BetaAgentTelephonyCreateCampaignOptionalParams,
  BetaAgentTelephonyCancelCallJobOptionalParams,
  BetaAgentTelephonyGetCallJobOptionalParams,
  BetaAgentTelephonyCreateCallJobOptionalParams,
} from "../../../api/beta/agentTelephony/options.js";
import {
  CreateTelephonyCallJobRequest,
  TelephonyCallJob,
  CreateTelephonyCampaignRequest,
  TelephonyCampaign,
  ImportTelephonyCampaignRecipientsRequest,
  TelephonyOperationResource,
  TelephonyOperation,
  TelephonyCampaignRecipientImport,
  PublishTelephonyCampaignRequest,
} from "../../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaAgentTelephony operations. */
export interface BetaAgentTelephonyOperations {
  /** Retrieves an asynchronous outbound campaign operation. */
  getOperation: (
    agentName: string,
    operationId: string,
    options?: BetaAgentTelephonyGetOperationOptionalParams,
  ) => Promise<TelephonyOperation>;
  /** Cancels a campaign and prevents any further call-job dispatch. */
  cancelCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentTelephonyCancelCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Resumes dispatch of call jobs owned by a paused campaign. */
  resumeCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentTelephonyResumeCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Pauses dispatch of call jobs owned by a published campaign. */
  pauseCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentTelephonyPauseCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Permanently locks the validated campaign draft and starts asynchronous call-job materialization. */
  publishCampaign: (
    agentName: string,
    campaignId: string,
    body: PublishTelephonyCampaignRequest,
    options?: BetaAgentTelephonyPublishCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Starts asynchronous validation of the current campaign draft and imported recipient snapshot. */
  validateCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentTelephonyValidateCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves the durable status and counters for a campaign recipient import. */
  getCampaignRecipientImport: (
    agentName: string,
    campaignId: string,
    importId: string,
    options?: BetaAgentTelephonyGetCampaignRecipientImportOptionalParams,
  ) => Promise<TelephonyCampaignRecipientImport>;
  /** Starts an asynchronous import of campaign recipients from a Dataset CSV, JSON array, or JSONL file. */
  importCampaignRecipients: (
    agentName: string,
    campaignId: string,
    idempotencyKey: string,
    body: ImportTelephonyCampaignRecipientsRequest,
    options?: BetaAgentTelephonyImportCampaignRecipientsOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves an outbound campaign, including configuration, execution state, and aggregate call-job counts. */
  getCampaign: (
    agentName: string,
    campaignId: string,
    options?: BetaAgentTelephonyGetCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a draft outbound campaign. Recipients are imported and validated before the campaign can be published. */
  createCampaign: (
    agentName: string,
    body: CreateTelephonyCampaignRequest,
    options?: BetaAgentTelephonyCreateCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
  cancelCallJob: (
    agentName: string,
    callJobId: string,
    ifMatch: string,
    options?: BetaAgentTelephonyCancelCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Retrieves a durable direct or campaign-created outbound call job. */
  getCallJob: (
    agentName: string,
    callJobId: string,
    options?: BetaAgentTelephonyGetCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Creates one durable direct outbound call job. The latest agent definition is resolved when each attempt executes. */
  createCallJob: (
    agentName: string,
    idempotencyKey: string,
    body: CreateTelephonyCallJobRequest,
    options?: BetaAgentTelephonyCreateCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
}

function _getBetaAgentTelephony(context: AIProjectContext) {
  return {
    getOperation: (
      agentName: string,
      operationId: string,
      options?: BetaAgentTelephonyGetOperationOptionalParams,
    ) => getOperation(context, agentName, operationId, options),
    cancelCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentTelephonyCancelCampaignOptionalParams,
    ) => cancelCampaign(context, agentName, campaignId, options),
    resumeCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentTelephonyResumeCampaignOptionalParams,
    ) => resumeCampaign(context, agentName, campaignId, options),
    pauseCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentTelephonyPauseCampaignOptionalParams,
    ) => pauseCampaign(context, agentName, campaignId, options),
    publishCampaign: (
      agentName: string,
      campaignId: string,
      body: PublishTelephonyCampaignRequest,
      options?: BetaAgentTelephonyPublishCampaignOptionalParams,
    ) => publishCampaign(context, agentName, campaignId, body, options),
    validateCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentTelephonyValidateCampaignOptionalParams,
    ) => validateCampaign(context, agentName, campaignId, options),
    getCampaignRecipientImport: (
      agentName: string,
      campaignId: string,
      importId: string,
      options?: BetaAgentTelephonyGetCampaignRecipientImportOptionalParams,
    ) => getCampaignRecipientImport(context, agentName, campaignId, importId, options),
    importCampaignRecipients: (
      agentName: string,
      campaignId: string,
      idempotencyKey: string,
      body: ImportTelephonyCampaignRecipientsRequest,
      options?: BetaAgentTelephonyImportCampaignRecipientsOptionalParams,
    ) => importCampaignRecipients(context, agentName, campaignId, idempotencyKey, body, options),
    getCampaign: (
      agentName: string,
      campaignId: string,
      options?: BetaAgentTelephonyGetCampaignOptionalParams,
    ) => getCampaign(context, agentName, campaignId, options),
    createCampaign: (
      agentName: string,
      body: CreateTelephonyCampaignRequest,
      options?: BetaAgentTelephonyCreateCampaignOptionalParams,
    ) => createCampaign(context, agentName, body, options),
    cancelCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: BetaAgentTelephonyCancelCallJobOptionalParams,
    ) => cancelCallJob(context, agentName, callJobId, ifMatch, options),
    getCallJob: (
      agentName: string,
      callJobId: string,
      options?: BetaAgentTelephonyGetCallJobOptionalParams,
    ) => getCallJob(context, agentName, callJobId, options),
    createCallJob: (
      agentName: string,
      idempotencyKey: string,
      body: CreateTelephonyCallJobRequest,
      options?: BetaAgentTelephonyCreateCallJobOptionalParams,
    ) => createCallJob(context, agentName, idempotencyKey, body, options),
  };
}

export function _getBetaAgentTelephonyOperations(
  context: AIProjectContext,
): BetaAgentTelephonyOperations {
  return {
    ..._getBetaAgentTelephony(context),
  };
}
