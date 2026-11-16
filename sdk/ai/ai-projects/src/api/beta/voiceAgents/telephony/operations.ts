// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  telephonyCampaignSerializer,
  telephonyCampaignDeserializer,
  telephonyCampaignOperationDeserializer,
  _telephonyCampaignPageTelephonyCampaignDeserializer,
  _telephonyCampaignValidationErrorPageDeserializer,
} from "../../../../models/models.js";
import type {
  TelephonyCampaign,
  TelephonyCampaignOperation,
  _TelephonyCampaignPageTelephonyCampaign,
  _TelephonyCampaignValidationErrorPage,
  TelephonyCampaignValidationError,
  TelephonyCampaignCreate,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
import type {
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteOptionalParams,
  BetaVoiceAgentsTelephonyCancelOptionalParams,
  BetaVoiceAgentsTelephonyListOptionalParams,
  BetaVoiceAgentsTelephonyGetOptionalParams,
  BetaVoiceAgentsTelephonyCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationSend(
  context: Client,
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}/operations/{operation_id}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: operationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaignOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignOperationDeserializer(result.body);
}

/** Gets the initiating operation's status. PUT/cancel pollers finish with a guarded Campaign GET; deletion completes without a resource result. */
export async function getOperation(
  context: Client,
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaignOperation> {
  const result = await _getOperationSend(context, agentName, campaignName, operationId, options);
  return _getOperationDeserialize(result);
}

export function _listValidationErrorsSend(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}/validation_errors{?after,api-version,before,limit,order}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      limit: options?.limit,
      after: options?.after,
      before: options?.before,
      order: options?.order,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listValidationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TelephonyCampaignValidationErrorPage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _telephonyCampaignValidationErrorPageDeserializer(result.body);
}

/** Lists current-round row validation errors. Results may be partial during preparation; an empty page does not establish success. Execution errors are in CallJobs; non-row failures are in Campaign.error. */
export function listValidationErrors(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaignValidationError> {
  return buildPagedAsyncIterator(
    context,
    () => _listValidationErrorsSend(context, agentName, campaignName, options),
    _listValidationErrorsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          "foundry-features": "VoiceAgents=V1Preview",
          accept: "application/json",
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}

export function _deleteTelephonySend(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteTelephonyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a terminal Campaign and its recipient/task data asynchronously. Returns bodyless 202 with a monitor, not a tombstone; completion makes GET return 404 and lists omit it. Dataset, connections, Agent, independent jobs and call history are preserved. */
export function deleteTelephony(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteTelephonyDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteTelephonySend(context, agentName, campaignName, ifMatch, options),
    apiVersion: context.apiVersion ?? "v1",
    pollHeaders: {
      "foundry-features": "VoiceAgents=V1Preview",
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...options.requestOptions?.headers,
    },
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelSend(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}:cancel{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      "if-match": ifMatch,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Cancels a validating or running Campaign using If-Match. Stops new calls and retries; connected calls finish naturally. Returns 202 with an operation monitor to track completion. */
export function cancel(
  context: Client,
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  let initiatingOperationId: string | undefined;
  return getLongRunningPoller(
    context,
    () => getCampaignResult(context, agentName, campaignName, initiatingOperationId, options),
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: async () => {
        const response = await _cancelSend(context, agentName, campaignName, ifMatch, options);
        initiatingOperationId = response.headers["operation-id"];
        return response;
      },
      skipFinalGet: true,
      apiVersion: context.apiVersion ?? "v1",
      pollHeaders: {
        "foundry-features": "VoiceAgents=V1Preview",
        "if-match": ifMatch,
        ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    },
  ) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

export function _listSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns{?after,api-version,before,limit,order,status}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_TelephonyCampaignPageTelephonyCampaign> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _telephonyCampaignPageTelephonyCampaignDeserializer(result.body);
}

/** Lists the Agent's Campaigns without inline recipients. Filters are live views, not snapshots. */
export function list(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsTelephonyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaign> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, agentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          "foundry-features": "VoiceAgents=V1Preview",
          accept: "application/json",
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}

export function _getSend(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?api-version,operation_id}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: options?.operationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TelephonyCampaign> {
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

/** Gets Campaign configuration and execution state without inline recipients. Absent or deleted Campaigns return 404. */
export async function get(
  context: Client,
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyGetOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getSend(context, agentName, campaignName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  agentName: string,
  campaignName: string,
  campaign: TelephonyCampaignCreate,
  options: BetaVoiceAgentsTelephonyCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?api-version}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: telephonyCampaignSerializer(campaign),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<TelephonyCampaign> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return telephonyCampaignDeserializer(result.body);
}

/** Creates a Campaign or fully replaces failed preparation; no PATCH. All recipients must validate and have CallJobs before dialing. Immediate calls may begin before the preparation poller returns. */
export function create(
  context: Client,
  agentName: string,
  campaignName: string,
  campaign: TelephonyCampaignCreate,
  options: BetaVoiceAgentsTelephonyCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  let initiatingOperationId: string | undefined;
  return getLongRunningPoller(
    context,
    () => getCampaignResult(context, agentName, campaignName, initiatingOperationId, options),
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: async () => {
        const response = await _createSend(context, agentName, campaignName, campaign, options);
        initiatingOperationId = response.headers["operation-id"];
        return response;
      },
      skipFinalGet: true,
      apiVersion: context.apiVersion ?? "v1",
      pollHeaders: {
        "foundry-features": "VoiceAgents=V1Preview",
        ...(options?.operationId !== undefined ? { "operation-id": options?.operationId } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    },
  ) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

/**
 * The declared final operation is a Campaign GET guarded by the initiating response's
 * Operation-Id, not the latest action in the resource body or the caller's retry key.
 * Core-lro's inferred PUT GET is unguarded, while POST would return the resource-free
 * monitor, so both pollers skip that inference and resolve through this operation.
 */
function getCampaignResult(
  context: Client,
  agentName: string,
  campaignName: string,
  operationId: string | undefined,
  options: BetaVoiceAgentsTelephonyGetOptionalParams,
): Promise<TelephonyCampaign> {
  if (!operationId) {
    throw new Error("Campaign response is missing the required Operation-Id header.");
  }
  return get(context, agentName, campaignName, { ...options, operationId });
}
