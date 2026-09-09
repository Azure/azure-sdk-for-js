// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  getTelephonyOperation,
  cancelTelephonyCampaign,
  resumeTelephonyCampaign,
  pauseTelephonyCampaign,
  publishTelephonyCampaign,
  validateTelephonyCampaign,
  getTelephonyCampaignRecipientImport,
  importTelephonyCampaignRecipients,
  getTelephonyCampaign,
  createTelephonyCampaign,
  cancelTelephonyCallJob,
  getTelephonyCallJob,
  createTelephonyCallJob,
} from "../../api/agentTelephony/operations.js";
import type {
  AgentTelephonyGetTelephonyOperationOptionalParams,
  AgentTelephonyCancelTelephonyCampaignOptionalParams,
  AgentTelephonyResumeTelephonyCampaignOptionalParams,
  AgentTelephonyPauseTelephonyCampaignOptionalParams,
  AgentTelephonyPublishTelephonyCampaignOptionalParams,
  AgentTelephonyValidateTelephonyCampaignOptionalParams,
  AgentTelephonyGetTelephonyCampaignRecipientImportOptionalParams,
  AgentTelephonyImportTelephonyCampaignRecipientsOptionalParams,
  AgentTelephonyGetTelephonyCampaignOptionalParams,
  AgentTelephonyCreateTelephonyCampaignOptionalParams,
  AgentTelephonyCancelTelephonyCallJobOptionalParams,
  AgentTelephonyGetTelephonyCallJobOptionalParams,
  AgentTelephonyCreateTelephonyCallJobOptionalParams,
} from "../../api/agentTelephony/options.js";
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
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentTelephony operations. */
export interface AgentTelephonyOperations {
  /** Retrieves an asynchronous outbound campaign operation. */
  getTelephonyOperation: (
    agentName: string,
    operationId: string,
    options?: AgentTelephonyGetTelephonyOperationOptionalParams,
  ) => Promise<TelephonyOperation>;
  /** Cancels a campaign and prevents any further call-job dispatch. */
  cancelTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    options?: AgentTelephonyCancelTelephonyCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Resumes dispatch of call jobs owned by a paused campaign. */
  resumeTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    options?: AgentTelephonyResumeTelephonyCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Pauses dispatch of call jobs owned by a published campaign. */
  pauseTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    options?: AgentTelephonyPauseTelephonyCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Permanently locks the validated campaign draft and starts asynchronous call-job materialization. */
  publishTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    body: PublishTelephonyCampaignRequest,
    options?: AgentTelephonyPublishTelephonyCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Starts asynchronous validation of the current campaign draft and imported recipient snapshot. */
  validateTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    options?: AgentTelephonyValidateTelephonyCampaignOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves the durable status and counters for a campaign recipient import. */
  getTelephonyCampaignRecipientImport: (
    agentName: string,
    campaignId: string,
    importId: string,
    options?: AgentTelephonyGetTelephonyCampaignRecipientImportOptionalParams,
  ) => Promise<TelephonyCampaignRecipientImport>;
  /** Starts an asynchronous import of campaign recipients from a Dataset CSV, JSON array, or JSONL file. */
  importTelephonyCampaignRecipients: (
    agentName: string,
    campaignId: string,
    idempotencyKey: string,
    body: ImportTelephonyCampaignRecipientsRequest,
    options?: AgentTelephonyImportTelephonyCampaignRecipientsOptionalParams,
  ) => PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
  /** Retrieves an outbound campaign, including configuration, execution state, and aggregate call-job counts. */
  getTelephonyCampaign: (
    agentName: string,
    campaignId: string,
    options?: AgentTelephonyGetTelephonyCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Creates a draft outbound campaign. Recipients are imported and validated before the campaign can be published. */
  createTelephonyCampaign: (
    agentName: string,
    body: CreateTelephonyCampaignRequest,
    options?: AgentTelephonyCreateTelephonyCampaignOptionalParams,
  ) => Promise<TelephonyCampaign>;
  /** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
  cancelTelephonyCallJob: (
    agentName: string,
    callJobId: string,
    ifMatch: string,
    options?: AgentTelephonyCancelTelephonyCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Retrieves a durable direct or campaign-created outbound call job. */
  getTelephonyCallJob: (
    agentName: string,
    callJobId: string,
    options?: AgentTelephonyGetTelephonyCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
  /** Creates one durable direct outbound call job. The latest agent definition is resolved when each attempt executes. */
  createTelephonyCallJob: (
    agentName: string,
    idempotencyKey: string,
    body: CreateTelephonyCallJobRequest,
    options?: AgentTelephonyCreateTelephonyCallJobOptionalParams,
  ) => Promise<TelephonyCallJob>;
}

function _getAgentTelephony(context: AIProjectContext) {
  return {
    getTelephonyOperation: (
      agentName: string,
      operationId: string,
      options?: AgentTelephonyGetTelephonyOperationOptionalParams,
    ) => getTelephonyOperation(context, agentName, operationId, options),
    cancelTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      options?: AgentTelephonyCancelTelephonyCampaignOptionalParams,
    ) => cancelTelephonyCampaign(context, agentName, campaignId, options),
    resumeTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      options?: AgentTelephonyResumeTelephonyCampaignOptionalParams,
    ) => resumeTelephonyCampaign(context, agentName, campaignId, options),
    pauseTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      options?: AgentTelephonyPauseTelephonyCampaignOptionalParams,
    ) => pauseTelephonyCampaign(context, agentName, campaignId, options),
    publishTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      body: PublishTelephonyCampaignRequest,
      options?: AgentTelephonyPublishTelephonyCampaignOptionalParams,
    ) => publishTelephonyCampaign(context, agentName, campaignId, body, options),
    validateTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      options?: AgentTelephonyValidateTelephonyCampaignOptionalParams,
    ) => validateTelephonyCampaign(context, agentName, campaignId, options),
    getTelephonyCampaignRecipientImport: (
      agentName: string,
      campaignId: string,
      importId: string,
      options?: AgentTelephonyGetTelephonyCampaignRecipientImportOptionalParams,
    ) => getTelephonyCampaignRecipientImport(context, agentName, campaignId, importId, options),
    importTelephonyCampaignRecipients: (
      agentName: string,
      campaignId: string,
      idempotencyKey: string,
      body: ImportTelephonyCampaignRecipientsRequest,
      options?: AgentTelephonyImportTelephonyCampaignRecipientsOptionalParams,
    ) =>
      importTelephonyCampaignRecipients(
        context,
        agentName,
        campaignId,
        idempotencyKey,
        body,
        options,
      ),
    getTelephonyCampaign: (
      agentName: string,
      campaignId: string,
      options?: AgentTelephonyGetTelephonyCampaignOptionalParams,
    ) => getTelephonyCampaign(context, agentName, campaignId, options),
    createTelephonyCampaign: (
      agentName: string,
      body: CreateTelephonyCampaignRequest,
      options?: AgentTelephonyCreateTelephonyCampaignOptionalParams,
    ) => createTelephonyCampaign(context, agentName, body, options),
    cancelTelephonyCallJob: (
      agentName: string,
      callJobId: string,
      ifMatch: string,
      options?: AgentTelephonyCancelTelephonyCallJobOptionalParams,
    ) => cancelTelephonyCallJob(context, agentName, callJobId, ifMatch, options),
    getTelephonyCallJob: (
      agentName: string,
      callJobId: string,
      options?: AgentTelephonyGetTelephonyCallJobOptionalParams,
    ) => getTelephonyCallJob(context, agentName, callJobId, options),
    createTelephonyCallJob: (
      agentName: string,
      idempotencyKey: string,
      body: CreateTelephonyCallJobRequest,
      options?: AgentTelephonyCreateTelephonyCallJobOptionalParams,
    ) => createTelephonyCallJob(context, agentName, idempotencyKey, body, options),
  };
}

export function _getAgentTelephonyOperations(context: AIProjectContext): AgentTelephonyOperations {
  return {
    ..._getAgentTelephony(context),
  };
}
