// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  telephonyBindingUnionSerializer,
  telephonyBindingUnionDeserializer,
  TelephonyBindingUnion,
  _AgentsPagedResultTelephonyBindingListItem,
  _agentsPagedResultTelephonyBindingListItemDeserializer,
  TelephonyBindingListItemUnion,
  UpdateTelephonyBindingRequest,
  updateTelephonyBindingRequestSerializer,
  _AgentsPagedResultTelephonyCallSummary,
  _agentsPagedResultTelephonyCallSummaryDeserializer,
  TelephonyCallSummary,
  TelephonyCallRecord,
  telephonyCallRecordDeserializer,
  TelephonyTransferTargets,
  telephonyTransferTargetsDeserializer,
  telephonyTransferTargetArraySerializer,
  TelephonyTransferTarget,
  TelephonyCallJobCreate,
  telephonyCallJobCreateSerializer,
  TelephonyCallJob,
  telephonyCallJobDeserializer,
  _AgentsPagedResultTelephonyCallJob,
  _agentsPagedResultTelephonyCallJobDeserializer,
  TelephonyCampaign,
  telephonyCampaignSerializer,
  telephonyCampaignDeserializer,
  TelephonyCampaignOperation,
  telephonyCampaignOperationDeserializer,
  _TelephonyCampaignPageTelephonyCampaign,
  _telephonyCampaignPageTelephonyCampaignDeserializer,
  _TelephonyCampaignValidationErrorPage,
  _telephonyCampaignValidationErrorPageDeserializer,
  TelephonyCampaignValidationError,
} from "../../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
import {
  BetaVoiceAgentsTelephonyGetOperationOptionalParams,
  BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteOptionalParams,
  BetaVoiceAgentsTelephonyCancelOptionalParams,
  BetaVoiceAgentsTelephonyListOptionalParams,
  BetaVoiceAgentsTelephonyGetOptionalParams,
  BetaVoiceAgentsTelephonyCreateOptionalParams,
  BetaVoiceAgentsTelephonyCancelCallJobOptionalParams,
  BetaVoiceAgentsTelephonyGetCallJobOptionalParams,
  BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams,
  BetaVoiceAgentsTelephonyListCallJobsOptionalParams,
  BetaVoiceAgentsTelephonyCreateCallJobOptionalParams,
  BetaVoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  BetaVoiceAgentsTelephonyEndCallOptionalParams,
  BetaVoiceAgentsTelephonyTransferCallOptionalParams,
  BetaVoiceAgentsTelephonyGetCallOptionalParams,
  BetaVoiceAgentsTelephonyListCallsOptionalParams,
  BetaVoiceAgentsTelephonyDeleteBindingOptionalParams,
  BetaVoiceAgentsTelephonyUpdateBindingOptionalParams,
  BetaVoiceAgentsTelephonyGetBindingOptionalParams,
  BetaVoiceAgentsTelephonyListBindingsOptionalParams,
  BetaVoiceAgentsTelephonyCreateBindingOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}/operations/{operation_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: operationId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  operationId: string,
  options: BetaVoiceAgentsTelephonyGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaignOperation> {
  const result = await _getOperationSend(
    context,
    foundryFeatures,
    agentName,
    campaignName,
    operationId,
    options,
  );
  return _getOperationDeserialize(result);
}

export function _listValidationErrorsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}/validation_errors{?limit,after,before,order,api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      limit: options?.limit,
      after: options?.after,
      before: options?.before,
      order: options?.order,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyListValidationErrorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaignValidationError> {
  return buildPagedAsyncIterator(
    context,
    () => _listValidationErrorsSend(context, foundryFeatures, agentName, campaignName, options),
    _listValidationErrorsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _deleteTelephonySend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteTelephonyDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteTelephonySend(context, foundryFeatures, agentName, campaignName, ifMatch, options),

    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}:cancel{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(context, foundryFeatures, agentName, campaignName, ifMatch, options),

    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

export function _listSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsTelephonyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns{?limit,order,after,before,status,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsTelephonyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCampaign> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, agentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?operation_id,api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      operation_id: options?.operationId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  options: BetaVoiceAgentsTelephonyGetOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getSend(context, foundryFeatures, agentName, campaignName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  campaign: TelephonyCampaign,
  options: BetaVoiceAgentsTelephonyCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_campaigns/{campaign_name}{?api%2Dversion}",
    {
      agent_name: agentName,
      campaign_name: campaignName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  campaignName: string,
  campaign: TelephonyCampaign,
  options: BetaVoiceAgentsTelephonyCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign> {
  return getLongRunningPoller(context, _createDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, foundryFeatures, agentName, campaignName, campaign, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyCampaign>, TelephonyCampaign>;
}

export function _cancelCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaVoiceAgentsTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_call_jobs/{call_job_id}:cancel{?api%2Dversion}",
    {
      agent_name: agentName,
      call_job_id: callJobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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

/** Cancels future attempts using If-Match; completion may be asynchronous. New cancellation after connection returns 409 and lets the active call finish. */
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
    "/agents/{agent_name}/telephony_call_jobs/{call_job_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      call_job_id: callJobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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

export function _deleteCallJobSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  callJobId: string,
  options: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_call_jobs/{call_job_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      call_job_id: callJobId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _deleteCallJobDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Deletes a terminal, reconciled job (otherwise 409), without cancelling calls or removing Campaign outcomes/call history. Later GET returns 404; repeated DELETE returns 204. */
export async function deleteCallJob(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  callJobId: string,
  options: BetaVoiceAgentsTelephonyDeleteCallJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteCallJobSend(context, foundryFeatures, agentName, callJobId, options);
  return _deleteCallJobDeserialize(result);
}

export function _listCallJobsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsTelephonyListCallJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_call_jobs{?limit,order,after,before,status,campaign_name,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      status: options?.status,
      campaign_name: options?.campaignName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listCallJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultTelephonyCallJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultTelephonyCallJobDeserializer(result.body);
}

/** Lists current direct/Campaign jobs, excluding deleted or superseded rounds. Pages are live. Campaign cursors survive boundary deletion/cancel, not replacement/name reuse (400 invalid_cursor). */
export function listCallJobs(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsTelephonyListCallJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCallJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listCallJobsSend(context, foundryFeatures, agentName, options),
    _listCallJobsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createCallJobSend(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  job: TelephonyCallJobCreate,
  options: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/telephony_call_jobs{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
      body: telephonyCallJobCreateSerializer(job),
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

/** Creates one durable outbound CallJob. Each attempt pins the Agent endpoint's execution version for validation and its voice session. */
export async function createCallJob(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  job: TelephonyCallJobCreate,
  options: BetaVoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createCallJobSend(context, agentName, idempotencyKey, job, options);
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
  return context
    .path(path)
    .put({
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
  return context
    .path(path)
    .get({
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
  return context
    .path(path)
    .post({
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
  return context
    .path(path)
    .post({
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
  return context
    .path(path)
    .get({
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
      started_after: !options?.startedAfterTime
        ? options?.startedAfterTime
        : (options?.startedAfterTime.getTime() / 1000) | 0,
      started_before: !options?.startedBeforeTime
        ? options?.startedBeforeTime
        : (options?.startedBeforeTime.getTime() / 1000) | 0,
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
  return context
    .path(path)
    .get({
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
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
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
  return context
    .path(path)
    .delete({
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
  return context
    .path(path)
    .patch({
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
  return context
    .path(path)
    .get({
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
    "/agents/{agent_name}/telephony/bindings{?provider,limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      provider: options?.provider,
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
  return context
    .path(path)
    .get({
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
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createBindingSend(
  context: Client,
  agentName: string,
  binding: TelephonyBindingUnion,
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
  return context
    .path(path)
    .post({
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
      body: telephonyBindingUnionSerializer(binding),
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
  binding: TelephonyBindingUnion,
  options: BetaVoiceAgentsTelephonyCreateBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _createBindingSend(context, agentName, binding, options);
  return _createBindingDeserialize(result);
}
