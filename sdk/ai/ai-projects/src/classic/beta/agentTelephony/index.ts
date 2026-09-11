// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
import type {
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
} from "../../../api/beta/agents/foo/options.js";
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
} from "../../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BetaAgentTelephony operations. */
export interface BetaAgentTelephonyOperations {
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
}
