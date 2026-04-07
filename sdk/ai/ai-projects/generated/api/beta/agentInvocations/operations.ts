// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  BetaAgentInvocationsCancelResponse,
  BetaAgentInvocationsGetResponse,
  BetaAgentInvocationsCreateResponse,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaAgentInvocationsCancelOptionalParams,
  BetaAgentInvocationsGetOptionalParams,
  BetaAgentInvocationsCreateOptionalParams,
  GetOpenApiSpecOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  agentName: string,
  invocationId: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/invocations/{invocation_id}/cancel{?api%2Dversion}",
    {
      agent_name: agentName,
      invocation_id: invocationId,
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
      contentType: options.contentType as any,
      headers: {
        "foundry-features": foundryFeatures,
        accept: "*/*",
        ...options.requestOptions?.headers,
      },
      body: !options["request"] ? options["request"] : options["request"],
    });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<BetaAgentInvocationsCancelResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/**
 * Cancels an invocation.
 * Returns 404 if the agent does not support this operation or if the invocation ID is not found.
 */
export async function cancel(
  context: Client,
  agentName: string,
  invocationId: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsCancelOptionalParams = { requestOptions: {} },
): Promise<BetaAgentInvocationsCancelResponse> {
  const result = await _cancelSend(context, agentName, invocationId, foundryFeatures, options);
  return _cancelDeserialize(result);
}

export function _getSend(
  context: Client,
  agentName: string,
  invocationId: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/invocations/{invocation_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      invocation_id: invocationId,
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
        accept: "*/*",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BetaAgentInvocationsGetResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/**
 * Retrieves the invocation with the given ID.
 * Returns 404 if the agent does not support this operation or if the invocation ID is not found.
 */
export async function get(
  context: Client,
  agentName: string,
  invocationId: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsGetOptionalParams = { requestOptions: {} },
): Promise<BetaAgentInvocationsGetResponse> {
  const result = await _getSend(context, agentName, invocationId, foundryFeatures, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  agentName: string,
  contentType: string,
  request: any,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/invocations{?agent_session_id,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: options?.agentSessionId,
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
      contentType: contentType,
      headers: {
        "foundry-features": foundryFeatures,
        accept: "*/*",
        ...options.requestOptions?.headers,
      },
      body: request,
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<BetaAgentInvocationsCreateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Creates an invocation for the specified agent version. */
export async function create(
  context: Client,
  agentName: string,
  contentType: string,
  request: any,
  foundryFeatures: "HostedAgents=V1Preview",
  options: BetaAgentInvocationsCreateOptionalParams = { requestOptions: {} },
): Promise<BetaAgentInvocationsCreateResponse> {
  const result = await _createSend(
    context,
    agentName,
    contentType,
    request,
    foundryFeatures,
    options,
  );
  return _createDeserialize(result);
}

export function _getOpenApiSpecSend(
  context: Client,
  agentName: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: GetOpenApiSpecOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/invocations/docs/openapi.json{?api%2Dversion}",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOpenApiSpecDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

/**
 * Retrieves the OpenAPI specification for an agent version's invocation contract.
 * Returns 404 if the agent does not expose an OpenAPI specification.
 */
export async function getOpenApiSpec(
  context: Client,
  agentName: string,
  foundryFeatures: "HostedAgents=V1Preview",
  options: GetOpenApiSpecOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _getOpenApiSpecSend(context, agentName, foundryFeatures, options);
  return _getOpenApiSpecDeserialize(result);
}
