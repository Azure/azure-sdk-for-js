// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
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
} from "../../../models/models.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationSend(
  context: Client,
  agentName: string,
  operationId: string,
  options: BetaAgentTelephonyGetOperationOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyOperation> {
  const result = await _getOperationSend(context, agentName, operationId, options);
  return _getOperationDeserialize(result);
}

export function _cancelCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentTelephonyCancelCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyCancelCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _cancelCampaignSend(context, agentName, campaignId, options);
  return _cancelCampaignDeserialize(result);
}

export function _resumeCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentTelephonyResumeCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyResumeCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _resumeCampaignSend(context, agentName, campaignId, options);
  return _resumeCampaignDeserialize(result);
}

export function _pauseCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentTelephonyPauseCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyPauseCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _pauseCampaignSend(context, agentName, campaignId, options);
  return _pauseCampaignDeserialize(result);
}

export function _publishCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: BetaAgentTelephonyPublishCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyPublishCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyValidateCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyValidateCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetCampaignRecipientImportOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetCampaignRecipientImportOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyImportCampaignRecipientsOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyImportCampaignRecipientsOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getCampaignSend(context, agentName, campaignId, options);
  return _getCampaignDeserialize(result);
}

export function _createCampaignSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: BetaAgentTelephonyCreateCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyCreateCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _createCampaignSend(context, agentName, body, options);
  return _createCampaignDeserialize(result);
}

export function _cancelCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaAgentTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _cancelCallJobSend(context, agentName, callJobId, ifMatch, options);
  return _cancelCallJobDeserialize(result);
}

export function _getCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: BetaAgentTelephonyGetCallJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyGetCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _getCallJobSend(context, agentName, callJobId, options);
  return _getCallJobDeserialize(result);
}

export function _createCallJobSend(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: BetaAgentTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createCallJobSend(context, agentName, idempotencyKey, body, options);
  return _createCallJobDeserialize(result);
}
