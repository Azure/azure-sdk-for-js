// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  createTelephonyBindingRequestUnionSerializer,
  CreateTelephonyBindingRequestUnion,
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
  CreateTelephonyCallJobRequest,
  createTelephonyCallJobRequestSerializer,
  TelephonyCallJob,
  telephonyCallJobDeserializer,
  CreateTelephonyCampaignRequest,
  createTelephonyCampaignRequestSerializer,
  TelephonyCampaign,
  telephonyCampaignDeserializer,
  ImportTelephonyCampaignRecipientsRequest,
  importTelephonyCampaignRecipientsRequestSerializer,
  TelephonyOperationResource,
  telephonyOperationResourceDeserializer,
  TelephonyOperation,
  telephonyOperationDeserializer,
  TelephonyCampaignRecipientImport,
  telephonyCampaignRecipientImportDeserializer,
  PublishTelephonyCampaignRequest,
  publishTelephonyCampaignRequestSerializer,
} from "../../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
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
  agentName: string,
  operationId: string,
  options: BetaAgentsFooGetOperationOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooGetOperationOptionalParams = { requestOptions: {} },
): Promise<TelephonyOperation> {
  const result = await _getOperationSend(context, agentName, operationId, options);
  return _getOperationDeserialize(result);
}

export function _cancelCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentsFooCancelCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooCancelCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _cancelCampaignSend(context, agentName, campaignId, options);
  return _cancelCampaignDeserialize(result);
}

export function _resumeCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentsFooResumeCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooResumeCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _resumeCampaignSend(context, agentName, campaignId, options);
  return _resumeCampaignDeserialize(result);
}

export function _pauseCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentsFooPauseCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooPauseCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _pauseCampaignSend(context, agentName, campaignId, options);
  return _pauseCampaignDeserialize(result);
}

export function _publishCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  body: PublishTelephonyCampaignRequest,
  options: BetaAgentsFooPublishCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooPublishCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(context, _publishCampaignDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _publishCampaignSend(context, agentName, campaignId, body, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _validateCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentsFooValidateCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooValidateCampaignOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource> {
  return getLongRunningPoller(context, _validateCampaignDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _validateCampaignSend(context, agentName, campaignId, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "v1",
  }) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _getCampaignRecipientImportSend(
  context: Client,
  agentName: string,
  campaignId: string,
  importId: string,
  options: BetaAgentsFooGetCampaignRecipientImportOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooGetCampaignRecipientImportOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooImportCampaignRecipientsOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooImportCampaignRecipientsOptionalParams = { requestOptions: {} },
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
      resourceLocationConfig: "operation-location",
      apiVersion: context.apiVersion ?? "v1",
    },
  ) as PollerLike<OperationState<TelephonyOperationResource>, TelephonyOperationResource>;
}

export function _getCampaignSend(
  context: Client,
  agentName: string,
  campaignId: string,
  options: BetaAgentsFooGetCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooGetCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _getCampaignSend(context, agentName, campaignId, options);
  return _getCampaignDeserialize(result);
}

export function _createCampaignSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyCampaignRequest,
  options: BetaAgentsFooCreateCampaignOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooCreateCampaignOptionalParams = { requestOptions: {} },
): Promise<TelephonyCampaign> {
  const result = await _createCampaignSend(context, agentName, body, options);
  return _createCampaignDeserialize(result);
}

export function _cancelCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaAgentsFooCancelCallJobOptionalParams = { requestOptions: {} },
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

/** Requests cancellation of a durable outbound call job. A connected call is allowed to finish. */
export async function cancelCallJob(
  context: Client,
  agentName: string,
  callJobId: string,
  ifMatch: string,
  options: BetaAgentsFooCancelCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _cancelCallJobSend(context, agentName, callJobId, ifMatch, options);
  return _cancelCallJobDeserialize(result);
}

export function _getCallJobSend(
  context: Client,
  agentName: string,
  callJobId: string,
  options: BetaAgentsFooGetCallJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooGetCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _getCallJobSend(context, agentName, callJobId, options);
  return _getCallJobDeserialize(result);
}

export function _createCallJobSend(
  context: Client,
  agentName: string,
  idempotencyKey: string,
  body: CreateTelephonyCallJobRequest,
  options: BetaAgentsFooCreateCallJobOptionalParams = { requestOptions: {} },
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
  options: BetaAgentsFooCreateCallJobOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallJob> {
  const result = await _createCallJobSend(context, agentName, idempotencyKey, body, options);
  return _createCallJobDeserialize(result);
}

export function _replaceTelephonyTransferTargetsSend(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams = { requestOptions: {} },
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

export async function _replaceTelephonyTransferTargetsDeserialize(
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
export async function replaceTelephonyTransferTargets(
  context: Client,
  agentName: string,
  ifMatch: string,
  transferTargets: TelephonyTransferTarget[],
  options: BetaAgentsFooReplaceTelephonyTransferTargetsOptionalParams = { requestOptions: {} },
): Promise<TelephonyTransferTargets> {
  const result = await _replaceTelephonyTransferTargetsSend(
    context,
    agentName,
    ifMatch,
    transferTargets,
    options,
  );
  return _replaceTelephonyTransferTargetsDeserialize(result);
}

export function _getTelephonyTransferTargetsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsFooGetTelephonyTransferTargetsOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyTransferTargetsDeserialize(
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
export async function getTelephonyTransferTargets(
  context: Client,
  agentName: string,
  options: BetaAgentsFooGetTelephonyTransferTargetsOptionalParams = { requestOptions: {} },
): Promise<TelephonyTransferTargets> {
  const result = await _getTelephonyTransferTargetsSend(context, agentName, options);
  return _getTelephonyTransferTargetsDeserialize(result);
}

export function _endTelephonyCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaAgentsFooEndTelephonyCallOptionalParams = { requestOptions: {} },
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

export async function _endTelephonyCallDeserialize(
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
export async function endTelephonyCall(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaAgentsFooEndTelephonyCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _endTelephonyCallSend(context, agentName, callId, options);
  return _endTelephonyCallDeserialize(result);
}

export function _transferTelephonyCallSend(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: BetaAgentsFooTransferTelephonyCallOptionalParams = { requestOptions: {} },
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

export async function _transferTelephonyCallDeserialize(
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
export async function transferTelephonyCall(
  context: Client,
  agentName: string,
  callId: string,
  target: string,
  options: BetaAgentsFooTransferTelephonyCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _transferTelephonyCallSend(context, agentName, callId, target, options);
  return _transferTelephonyCallDeserialize(result);
}

export function _getTelephonyCallSend(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaAgentsFooGetTelephonyCallOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyCallDeserialize(
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
export async function getTelephonyCall(
  context: Client,
  agentName: string,
  callId: string,
  options: BetaAgentsFooGetTelephonyCallOptionalParams = { requestOptions: {} },
): Promise<TelephonyCallRecord> {
  const result = await _getTelephonyCallSend(context, agentName, callId, options);
  return _getTelephonyCallDeserialize(result);
}

export function _listTelephonyCallsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsFooListTelephonyCallsOptionalParams = { requestOptions: {} },
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

export async function _listTelephonyCallsDeserialize(
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
export function listTelephonyCalls(
  context: Client,
  agentName: string,
  options: BetaAgentsFooListTelephonyCallsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyCallSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listTelephonyCallsSend(context, agentName, options),
    _listTelephonyCallsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _deleteTelephonyBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  options: BetaAgentsFooDeleteTelephonyBindingOptionalParams = { requestOptions: {} },
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

export async function _deleteTelephonyBindingDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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
export async function deleteTelephonyBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  options: BetaAgentsFooDeleteTelephonyBindingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTelephonyBindingSend(context, agentName, bindingId, ifMatch, options);
  return _deleteTelephonyBindingDeserialize(result);
}

export function _updateTelephonyBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  body: UpdateTelephonyBindingRequest,
  options: BetaAgentsFooUpdateTelephonyBindingOptionalParams = { requestOptions: {} },
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

export async function _updateTelephonyBindingDeserialize(
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
export async function updateTelephonyBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  ifMatch: string,
  body: UpdateTelephonyBindingRequest,
  options: BetaAgentsFooUpdateTelephonyBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _updateTelephonyBindingSend(
    context,
    agentName,
    bindingId,
    ifMatch,
    body,
    options,
  );
  return _updateTelephonyBindingDeserialize(result);
}

export function _getTelephonyBindingSend(
  context: Client,
  agentName: string,
  bindingId: string,
  options: BetaAgentsFooGetTelephonyBindingOptionalParams = { requestOptions: {} },
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

export async function _getTelephonyBindingDeserialize(
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
export async function getTelephonyBinding(
  context: Client,
  agentName: string,
  bindingId: string,
  options: BetaAgentsFooGetTelephonyBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _getTelephonyBindingSend(context, agentName, bindingId, options);
  return _getTelephonyBindingDeserialize(result);
}

export function _listTelephonyBindingsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsFooListTelephonyBindingsOptionalParams = { requestOptions: {} },
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

export async function _listTelephonyBindingsDeserialize(
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
export function listTelephonyBindings(
  context: Client,
  agentName: string,
  options: BetaAgentsFooListTelephonyBindingsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TelephonyBindingListItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listTelephonyBindingsSend(context, agentName, options),
    _listTelephonyBindingsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createTelephonyBindingSend(
  context: Client,
  agentName: string,
  body: CreateTelephonyBindingRequestUnion,
  options: BetaAgentsFooCreateTelephonyBindingOptionalParams = { requestOptions: {} },
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
      body: createTelephonyBindingRequestUnionSerializer(body),
    });
}

export async function _createTelephonyBindingDeserialize(
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
export async function createTelephonyBinding(
  context: Client,
  agentName: string,
  body: CreateTelephonyBindingRequestUnion,
  options: BetaAgentsFooCreateTelephonyBindingOptionalParams = { requestOptions: {} },
): Promise<TelephonyBindingUnion> {
  const result = await _createTelephonyBindingSend(context, agentName, body, options);
  return _createTelephonyBindingDeserialize(result);
}
