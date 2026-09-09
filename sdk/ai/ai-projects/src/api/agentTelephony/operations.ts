// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
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
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getTelephonyOperationSend(
  context: Client,
  agentName: string,
  operationId: string,
  options: AgentTelephonyGetTelephonyOperationOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyOperationDeserialize(
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
export async function getTelephonyOperation(
  context: Client,
  agentName: string,
  operationId: string,
  options: AgentTelephonyGetTelephonyOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyOperation> {
  const result = await _getTelephonyOperationSend(context, agentName, operationId, options);
  return _getTelephonyOperationDeserialize(result);
}

export function _cancelTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyCancelTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _cancelTelephonyCampaignDeserialize(
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
export async function cancelTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyCancelTelephonyCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _cancelTelephonyCampaignSend(context, agentName, campaignId, options);
  return _cancelTelephonyCampaignDeserialize(result);
}

export function _resumeTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyResumeTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _resumeTelephonyCampaignDeserialize(
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
export async function resumeTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyResumeTelephonyCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _resumeTelephonyCampaignSend(context, agentName, campaignId, options);
  return _resumeTelephonyCampaignDeserialize(result);
}

export function _pauseTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyPauseTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _pauseTelephonyCampaignDeserialize(
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
export async function pauseTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyPauseTelephonyCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _pauseTelephonyCampaignSend(context, agentName, campaignId, options);
  return _pauseTelephonyCampaignDeserialize(result);
}

export function _publishTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: AgentTelephonyPublishTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _publishTelephonyCampaignDeserialize(
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
export function publishTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: AgentTelephonyPublishTelephonyCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(
    context,
    _publishTelephonyCampaignDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _publishTelephonyCampaignSend(context, agentName, campaignId, body, options),
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

export function _validateTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyValidateTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _validateTelephonyCampaignDeserialize(
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
export function validateTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyValidateTelephonyCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(
    context,
    _validateTelephonyCampaignDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateTelephonyCampaignSend(context, agentName, campaignId, options),
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

export function _getTelephonyCampaignRecipientImportSend(
  context: Client,
  agentName: string,
  campaignId: string,
  importId: string,
  options: AgentTelephonyGetTelephonyCampaignRecipientImportOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyCampaignRecipientImportDeserialize(
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
export async function getTelephonyCampaignRecipientImport(
  context: Client,
  agentName: string,
  campaignId: string,
  importId: string,
  options: AgentTelephonyGetTelephonyCampaignRecipientImportOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaignRecipientImport> {
  const result = await _getTelephonyCampaignRecipientImportSend(
    context,
    agentName,
    campaignId,
    importId,
    options,
  );
  return _getTelephonyCampaignRecipientImportDeserialize(result);
}

export function _importTelephonyCampaignRecipientsSend(
  context: Client,
  agentName: string,
  campaignId: string,
  idempotencyKey: string,
  body: ImportTelephonyCampaignRecipientsRequest,
  options: AgentTelephonyImportTelephonyCampaignRecipientsOptionalParams = { requestOptions: {} },
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

export async function _importTelephonyCampaignRecipientsDeserialize(
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
export function importTelephonyCampaignRecipients(
  context: Client,
  agentName: string,
  campaignId: string,
  idempotencyKey: string,
  body: ImportTelephonyCampaignRecipientsRequest,
  options: AgentTelephonyImportTelephonyCampaignRecipientsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(
    context,
    _importTelephonyCampaignRecipientsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _importTelephonyCampaignRecipientsSend(
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

export function _getTelephonyCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyGetTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyCampaignDeserialize(
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
export async function getTelephonyCampaign(
  context: Client,
  agentName: string,
  campaignId: string,
  options: AgentTelephonyGetTelephonyCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getTelephonyCampaignSend(context, agentName, campaignId, options);
  return _getTelephonyCampaignDeserialize(result);
}

export function _createTelephonyCampaignSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: AgentTelephonyCreateTelephonyCampaignOptionalParams = { requestOptions: {} },
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

export async function _createTelephonyCampaignDeserialize(
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
export async function createTelephonyCampaign(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: AgentTelephonyCreateTelephonyCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _createTelephonyCampaignSend(context, agentName, body, options);
  return _createTelephonyCampaignDeserialize(result);
}

export function _cancelTelephonyCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: AgentTelephonyCancelTelephonyCallJobOptionalParams = { requestOptions: {} },
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

export async function _cancelTelephonyCallJobDeserialize(
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
export async function cancelTelephonyCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: AgentTelephonyCancelTelephonyCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _cancelTelephonyCallJobSend(context, agentName, callJobId, ifMatch, options);
  return _cancelTelephonyCallJobDeserialize(result);
}

export function _getTelephonyCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: AgentTelephonyGetTelephonyCallJobOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyCallJobDeserialize(
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
export async function getTelephonyCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  options: AgentTelephonyGetTelephonyCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _getTelephonyCallJobSend(context, agentName, callJobId, options);
  return _getTelephonyCallJobDeserialize(result);
}

export function _createTelephonyCallJobSend(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: AgentTelephonyCreateTelephonyCallJobOptionalParams = { requestOptions: {} },
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

export async function _createTelephonyCallJobDeserialize(
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
export async function createTelephonyCallJob(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: AgentTelephonyCreateTelephonyCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createTelephonyCallJobSend(
    context,
    agentName,
    idempotencyKey,
    body,
    options,
  );
  return _createTelephonyCallJobDeserialize(result);
}
