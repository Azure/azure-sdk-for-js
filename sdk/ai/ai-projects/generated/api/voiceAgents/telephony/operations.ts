// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
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
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  VoiceAgentsTelephonyCancelCallJobOptionalParams,
  VoiceAgentsTelephonyGetCallJobOptionalParams,
  VoiceAgentsTelephonyDeleteCallJobOptionalParams,
  VoiceAgentsTelephonyListCallJobsOptionalParams,
  VoiceAgentsTelephonyCreateCallJobOptionalParams,
  VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams,
  VoiceAgentsTelephonyGetTransferTargetsOptionalParams,
  VoiceAgentsTelephonyEndCallOptionalParams,
  VoiceAgentsTelephonyTransferCallOptionalParams,
  VoiceAgentsTelephonyGetCallOptionalParams,
  VoiceAgentsTelephonyListCallsOptionalParams,
  VoiceAgentsTelephonyDeleteBindingOptionalParams,
  VoiceAgentsTelephonyUpdateBindingOptionalParams,
  VoiceAgentsTelephonyGetBindingOptionalParams,
  VoiceAgentsTelephonyListBindingsOptionalParams,
  VoiceAgentsTelephonyCreateBindingOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _cancelCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: VoiceAgentsTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
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

/** Cancels future attempts using If-Match; completion may be asynchronous. New cancellation after connection returns 409 and lets the active call finish. Cancelling a SIP call job requires the `VoiceAgents=V1Preview` opt-in. */
export async function cancelCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: VoiceAgentsTelephonyCancelCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _cancelCallJobSend(context, agentName, callJobId, ifMatch, options);
  return _cancelCallJobDeserialize(result);
}

export function _getCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: VoiceAgentsTelephonyGetCallJobOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyGetCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _getCallJobSend(context, agentName, callJobId, options);
  return _getCallJobDeserialize(result);
}

export function _deleteCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: VoiceAgentsTelephonyDeleteCallJobOptionalParams = { requestOptions: {} },
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
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        ...options.requestOptions?.headers,
      },
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

/** Deletes a terminal, reconciled job (otherwise 409), without cancelling calls or removing Campaign outcomes/call history. Later GET returns 404; repeated DELETE returns 204. Deleting a SIP call job requires the `VoiceAgents=V1Preview` opt-in. */
export async function deleteCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  options: VoiceAgentsTelephonyDeleteCallJobOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteCallJobSend(context, agentName, callJobId, options);
  return _deleteCallJobDeserialize(result);
}

export function _listCallJobsSend(
  context: Client,
  agentName: string,
  options: VoiceAgentsTelephonyListCallJobsOptionalParams = { requestOptions: {} },
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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
  agentName: string,
  options: VoiceAgentsTelephonyListCallJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCallJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listCallJobsSend(context, agentName, options),
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
  options: VoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
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

/** Creates one durable outbound CallJob. Each attempt pins the Agent endpoint's execution version for validation and its voice session. A call job over a `SipOutbound` connection requires the `VoiceAgents=V1Preview` opt-in. */
export async function createCallJob(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  job: TelephonyCallJobCreate,
  options: VoiceAgentsTelephonyCreateCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createCallJobSend(context, agentName, idempotencyKey, job, options);
  return _createCallJobDeserialize(result);
}

export function _replaceTransferTargetsSend(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams = { requestOptions: {} },
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

/** Replaces all transfer targets configured for the voice agent named in the path. Configuring a SIP destination requires the `VoiceAgents=V1Preview` opt-in. */
export async function replaceTransferTargets(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: VoiceAgentsTelephonyReplaceTransferTargetsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyGetTransferTargetsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyGetTransferTargetsOptionalParams = { requestOptions: {} },
): Promise<TelephonyTransferTargets> {
  const result = await _getTransferTargetsSend(context, agentName, options);
  return _getTransferTargetsDeserialize(result);
}

export function _endCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: VoiceAgentsTelephonyEndCallOptionalParams = { requestOptions: {} },
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

/** Ends an active inbound call owned by the voice agent named in the path. Ending a SIP call requires the `VoiceAgents=V1Preview` opt-in. */
export async function endCall(
  context: Client,
  agentName: string,
  callId: string,
  options: VoiceAgentsTelephonyEndCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _endCallSend(context, agentName, callId, options);
  return _endCallDeserialize(result);
}

export function _transferCallSend(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: VoiceAgentsTelephonyTransferCallOptionalParams = { requestOptions: {} },
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

/** Transfers an active inbound call to a configured target for the voice agent named in the path. Transferring a SIP call requires the `VoiceAgents=V1Preview` opt-in. */
export async function transferCall(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: VoiceAgentsTelephonyTransferCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _transferCallSend(context, agentName, callId, target, options);
  return _transferCallDeserialize(result);
}

export function _getCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: VoiceAgentsTelephonyGetCallOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyGetCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _getCallSend(context, agentName, callId, options);
  return _getCallDeserialize(result);
}

export function _listCallsSend(
  context: Client,
  agentName: string,
  options: VoiceAgentsTelephonyListCallsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyListCallsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyDeleteBindingOptionalParams = { requestOptions: {} },
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

/** Deletes a telephony binding owned by the voice agent named in the path. Deleting a SIP binding requires the `VoiceAgents=V1Preview` opt-in. */
export async function deleteBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  options: VoiceAgentsTelephonyDeleteBindingOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyUpdateBindingOptionalParams = { requestOptions: {} },
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

/** Updates a telephony binding owned by the voice agent named in the path. Updating a SIP binding requires the `VoiceAgents=V1Preview` opt-in. */
export async function updateBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  body: UpdateTelephonyBindingRequest,
  options: VoiceAgentsTelephonyUpdateBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _updateBindingSend(context, agentName, bindingId, ifMatch, body, options);
  return _updateBindingDeserialize(result);
}

export function _getBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  options: VoiceAgentsTelephonyGetBindingOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyGetBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _getBindingSend(context, agentName, bindingId, options);
  return _getBindingDeserialize(result);
}

export function _listBindingsSend(
  context: Client,
  agentName: string,
  options: VoiceAgentsTelephonyListBindingsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyListBindingsOptionalParams = { requestOptions: {} },
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
  options: VoiceAgentsTelephonyCreateBindingOptionalParams = { requestOptions: {} },
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

/** Creates a telephony binding for the voice agent named in the path. Creating a SIP binding requires the `VoiceAgents=V1Preview` opt-in. */
export async function createBinding(
  context: Client,
  agentName: string,
  binding: TelephonyBindingUnion,
  options: VoiceAgentsTelephonyCreateBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _createBindingSend(context, agentName, binding, options);
  return _createBindingDeserialize(result);
}
