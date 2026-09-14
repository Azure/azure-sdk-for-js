// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../../index.js";
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
  _AgentsPagedResultTelephonyBindingListItem,
  _AgentsPagedResultTelephonyCallSummary,
} from "../../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  createTelephonyCallJobRequestSerializer,
  telephonyCallJobDeserializer,
  createTelephonyCampaignRequestSerializer,
  telephonyCampaignDeserializer,
  importTelephonyCampaignRecipientsRequestSerializer,
  telephonyOperationResourceDeserializer,
  telephonyOperationDeserializer,
  telephonyCampaignRecipientImportDeserializer,
  publishTelephonyCampaignRequestSerializer,
  _agentsPagedResultTelephonyBindingListItemDeserializer,
  _agentsPagedResultTelephonyCallSummaryDeserializer,
  createTelephonyBindingRequestUnionSerializer,
  telephonyBindingUnionDeserializer,
  telephonyCallRecordDeserializer,
  telephonyTransferTargetArraySerializer,
  telephonyTransferTargetsDeserializer,
  updateTelephonyBindingRequestSerializer,
} from "../../../../models/models.js";
import { getLongRunningPoller } from "../../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../../static-helpers/pagingHelpers.js";

export function _getOperationSend(
  context: Client,
  agentName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/operations/{operation_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      operation_id: operationId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyOperationDeserializer(result.body);
}

/** Retrieves an asynchronous outbound campaign operation. */
export async function getOperation(
  context: Client,
  agentName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyOperation> {
  const result = await _getOperationSend(context, agentName, operationId, options);
  return _getOperationDeserialize(result);
}

export function _cancelCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyCancelCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}:cancel{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Cancels a campaign and prevents any further call-job dispatch. */
export async function cancelCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyCancelCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _cancelCampaignSend(context, agentName, campaignId, options);
  return _cancelCampaignDeserialize(result);
}

export function _resumeCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyResumeCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}:resume{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resumeCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Resumes dispatch of call jobs owned by a paused campaign. */
export async function resumeCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyResumeCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _resumeCampaignSend(context, agentName, campaignId, options);
  return _resumeCampaignDeserialize(result);
}

export function _pauseCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyPauseCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}:pause{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _pauseCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Pauses dispatch of call jobs owned by a published campaign. */
export async function pauseCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyPauseCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _pauseCampaignSend(context, agentName, campaignId, options);
  return _pauseCampaignDeserialize(result);
}

export function _publishCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: BetaVoiceAgentsTelephonyPublishCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}:publish{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: publishTelephonyCampaignRequestSerializer(body),
  });
}

export async function _publishCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyOperationResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.resource === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.resource"`,
      result,
    );
  }

  return telephonyOperationResourceDeserializer(result.body.resource);
}

/** Permanently locks the validated campaign draft and starts asynchronous call-job materialization. */
export function publishCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: BetaVoiceAgentsTelephonyPublishCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(context, _publishCampaignDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _publishCampaignSend(context, agentName, campaignId, body, options),
    pollHeaders: {
      ...(options.foundryFeatures !== undefined
        ? { "foundry-features": options.foundryFeatures }
        : {}),
      ...options.requestOptions?.headers,
    },
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _validateCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyValidateCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}:validate{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _validateCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyOperationResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.resource === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.resource"`,
      result,
    );
  }

  return telephonyOperationResourceDeserializer(result.body.resource);
}

/** Starts asynchronous validation of the current campaign draft and imported recipient snapshot. */
export function validateCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyValidateCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(context, _validateCampaignDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _validateCampaignSend(context, agentName, campaignId, options),
    pollHeaders: {
      ...(options.foundryFeatures !== undefined
        ? { "foundry-features": options.foundryFeatures }
        : {}),
      ...options.requestOptions?.headers,
    },
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _getCampaignRecipientImportSend(
  context: Client,
  agentName: string,
  campaignId: string,
  importId: string,
  options: BetaVoiceAgentsTelephonyGetCampaignRecipientImportOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}/recipient_imports/{import_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      import_id: importId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCampaignRecipientImportDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaignRecipientImport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignRecipientImportDeserializer(result.body);
}

/** Retrieves the durable status and counters for a campaign recipient import. */
export async function getCampaignRecipientImport(
  context: Client,
  agentName: string,
  campaignId: string,
  importId: string,
  options: BetaVoiceAgentsTelephonyGetCampaignRecipientImportOptionalParams = {
    requestOptions: {},
  },
): Promise<TelephonyCampaignRecipientImport> {
  const result = await _getCampaignRecipientImportSend(
    context,
    agentName,
    campaignId,
    importId,
    options,
  );
  return _getCampaignRecipientImportDeserialize(result);
}

export function _importCampaignRecipientsSend(
  context: Client,
  agentName: string,
  campaignId: string,
  idempotencyKey: string,
  body: ImportTelephonyCampaignRecipientsRequest,
  options: BetaVoiceAgentsTelephonyImportCampaignRecipientsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}/recipients:import{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "idempotency-key": idempotencyKey,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: importTelephonyCampaignRecipientsRequestSerializer(body),
  });
}

export async function _importCampaignRecipientsDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyOperationResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.resource === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.resource"`,
      result,
    );
  }

  return telephonyOperationResourceDeserializer(result.body.resource);
}

/** Starts an asynchronous import of campaign recipients from a Dataset CSV, JSON array, or JSONL file. */
export function importCampaignRecipients(
  context: Client,
  agentName: string,
  campaignId: string,
  idempotencyKey: string,
  body: ImportTelephonyCampaignRecipientsRequest,
  options: BetaVoiceAgentsTelephonyImportCampaignRecipientsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(
    context,
    _importCampaignRecipientsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _importCampaignRecipientsSend(
          context,
          agentName,
          campaignId,
          idempotencyKey,
          body,
          options,
        ),
      pollHeaders: {
        ...(options.foundryFeatures !== undefined
          ? { "foundry-features": options.foundryFeatures }
          : {}),
        ...options.requestOptions?.headers,
      },
      resourceLocationConfig: "operation-location",
      apiVersion: context.apiVersion ?? "v1",
    },
  ) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _getCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyGetCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns/{campaign_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_id: campaignId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Retrieves an outbound campaign, including configuration, execution state, and aggregate call-job counts. */
export async function getCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaVoiceAgentsTelephonyGetCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getCampaignSend(context, agentName, campaignId, options);
  return _getCampaignDeserialize(result);
}

export function _createCampaignSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: BetaVoiceAgentsTelephonyCreateCampaignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/campaigns{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createTelephonyCampaignRequestSerializer(body),
  });
}

export async function _createCampaignDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Creates a draft outbound campaign. Recipients are imported and validated before the campaign can be published. */
export async function createCampaign(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: BetaVoiceAgentsTelephonyCreateCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _createCampaignSend(context, agentName, body, options);
  return _createCampaignDeserialize(result);
}

export function _cancelCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/call_jobs/{call_job_id}:cancel{?api%2Dversion}",
    {
      agent_name: agentName,
      call_job_id: callJobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelCallJobDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallJob> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallJobDeserializer(result.body);
}

/** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
export async function cancelCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _cancelCallJobSend(context, agentName, callJobId, ifMatch, options);
  return _cancelCallJobDeserialize(result);
}

export function _getCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: BetaVoiceAgentsTelephonyGetCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/call_jobs/{call_job_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      call_job_id: callJobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCallJobDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallJobDeserializer(result.body);
}

/** Retrieves a durable direct or campaign-created outbound call job. */
export async function getCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  options: BetaVoiceAgentsTelephonyGetCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _getCallJobSend(context, agentName, callJobId, options);
  return _getCallJobDeserialize(result);
}

export function _createCallJobSend(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/call_jobs{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "idempotency-key": idempotencyKey,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createTelephonyCallJobRequestSerializer(body),
  });
}

export async function _createCallJobDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallJob> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallJobDeserializer(result.body);
}

/** Creates one durable direct outbound call job. The latest agent definition is resolved when each attempt executes. */
export async function createCallJob(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createCallJobSend(context, agentName, idempotencyKey, body, options);
  return _createCallJobDeserialize(result);
}

export function _replaceTransferTargetsSend(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/transfer_targets{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { transfer_targets: telephonyTransferTargetArraySerializer(transferTargets) },
  });
}

export async function _replaceTransferTargetsDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyTransferTargets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyTransferTargetsDeserializer(result.body);
}

/** Replaces all transfer targets configured for the voice agent named in the path. */
export async function replaceTransferTargets(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams = { requestOptions: {} },
): Promise<TelephonyTransferTargets> {
  const result = await _replaceTransferTargetsSend(
    context,
    agentName,
    ifMatch,
    transferTargets,
    options,
  );
  return _replaceTransferTargetsDeserialize(result);
}

export function _getTransferTargetsSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/transfer_targets{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTransferTargetsDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyTransferTargets> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyTransferTargetsDeserializer(result.body);
}

/** Returns all transfer targets configured for the voice agent named in the path. */
export async function getTransferTargets(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams = { requestOptions: {} },
): Promise<TelephonyTransferTargets> {
  const result = await _getTransferTargetsSend(context, agentName, options);
  return _getTransferTargetsDeserialize(result);
}

export function _endCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaVoiceAgentsTelephonyEndCallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/calls/{call_id}:end{?api%2Dversion}",
    {
      agent_name: agentName,
      call_id: callId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _endCallDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallRecordDeserializer(result.body);
}

/** Ends an active inbound call owned by the voice agent named in the path. */
export async function endCall(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaVoiceAgentsTelephonyEndCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _endCallSend(context, agentName, callId, options);
  return _endCallDeserialize(result);
}

export function _transferCallSend(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: BetaVoiceAgentsTelephonyTransferCallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/calls/{call_id}:transfer{?api%2Dversion}",
    {
      agent_name: agentName,
      call_id: callId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { target: target },
  });
}

export async function _transferCallDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallRecordDeserializer(result.body);
}

/** Transfers an active inbound call to a configured target for the voice agent named in the path. */
export async function transferCall(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: BetaVoiceAgentsTelephonyTransferCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _transferCallSend(context, agentName, callId, target, options);
  return _transferCallDeserialize(result);
}

export function _getCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaVoiceAgentsTelephonyGetCallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/calls/{call_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      call_id: callId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCallDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCallRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCallRecordDeserializer(result.body);
}

/** Retrieves a durable inbound call record owned by the voice agent named in the path. */
export async function getCall(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaVoiceAgentsTelephonyGetCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _getCallSend(context, agentName, callId, options);
  return _getCallDeserialize(result);
}

export function _listCallsSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListCallsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/calls{?provider,status,started_after,started_before,limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      provider: options?.provider,
      status: options?.status,
      started_after: !options?.startedAfter
        ? options?.startedAfter
        : (options?.startedAfter.getTime() / 1000) | 0,
      started_before: !options?.startedBefore
        ? options?.startedBefore
        : (options?.startedBefore.getTime() / 1000) | 0,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listCallsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultTelephonyCallSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultTelephonyCallSummaryDeserializer(result.body);
}

/** Returns the durable inbound call history for the voice agent named in the path. */
export function listCalls(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListCallsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCallSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listCallsSend(context, agentName, options),
    _listCallsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          ...(options.foundryFeatures !== undefined
            ? { "foundry-features": options.foundryFeatures }
            : {}),
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}

export function _deleteBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/bindings/{binding_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      binding_id: bindingId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteBindingDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a telephony binding owned by the voice agent named in the path. */
export async function deleteBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteBindingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBindingSend(context, agentName, bindingId, ifMatch, options);
  return _deleteBindingDeserialize(result);
}

export function _updateBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  body: UpdateTelephonyBindingRequest,
  options: BetaVoiceAgentsTelephonyUpdateBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/bindings/{binding_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      binding_id: bindingId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateTelephonyBindingRequestSerializer(body),
  });
}

export async function _updateBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyBindingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyBindingUnionDeserializer(result.body);
}

/** Updates a telephony binding owned by the voice agent named in the path. */
export async function updateBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  body: UpdateTelephonyBindingRequest,
  options: BetaVoiceAgentsTelephonyUpdateBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _updateBindingSend(context, agentName, bindingId, ifMatch, body, options);
  return _updateBindingDeserialize(result);
}

export function _getBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  options: BetaVoiceAgentsTelephonyGetBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/bindings/{binding_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      binding_id: bindingId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyBindingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyBindingUnionDeserializer(result.body);
}

/** Retrieves a telephony binding owned by the voice agent named in the path. */
export async function getBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  options: BetaVoiceAgentsTelephonyGetBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _getBindingSend(context, agentName, bindingId, options);
  return _getBindingDeserialize(result);
}

export function _listBindingsSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListBindingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/bindings{?provider,status,limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      provider: options?.provider,
      status: options?.status,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBindingsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultTelephonyBindingListItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultTelephonyBindingListItemDeserializer(result.body);
}

/** Returns the telephony bindings owned by the voice agent named in the path. */
export function listBindings(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListBindingsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyBindingListItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBindingsSend(context, agentName, options),
    _listBindingsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          ...(options.foundryFeatures !== undefined
            ? { "foundry-features": options.foundryFeatures }
            : {}),
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}

export function _createBindingSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyBindingRequestUnion,
  options: BetaVoiceAgentsTelephonyCreateBindingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony/bindings{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createTelephonyBindingRequestUnionSerializer(body),
  });
}

export async function _createBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyBindingUnion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyBindingUnionDeserializer(result.body);
}

/** Creates a telephony binding for the voice agent named in the path. */
export async function createBinding(
  context: Client,
  agentName: string,
  body: CreateTelephonyBindingRequestUnion,
  options: BetaVoiceAgentsTelephonyCreateBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _createBindingSend(context, agentName, body, options);
  return _createBindingDeserialize(result);
}
