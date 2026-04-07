// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  cancel,
  get,
  create,
  getOpenApiSpec,
} from "../../../api/beta/agentInvocations/operations.js";
import {
  BetaAgentInvocationsCancelOptionalParams,
  BetaAgentInvocationsGetOptionalParams,
  BetaAgentInvocationsCreateOptionalParams,
  GetOpenApiSpecOptionalParams,
} from "../../../api/beta/agentInvocations/options.js";
import {
  BetaAgentInvocationsCancelResponse,
  BetaAgentInvocationsGetResponse,
  BetaAgentInvocationsCreateResponse,
} from "../../../models/models.js";

/** Interface representing a BetaAgentInvocations operations. */
export interface BetaAgentInvocationsOperations {
  /**
   * Cancels an invocation.
   * Returns 404 if the agent does not support this operation or if the invocation ID is not found.
   */
  cancel: (
    agentName: string,
    invocationId: string,
    foundryFeatures: "HostedAgents=V1Preview",
    options?: BetaAgentInvocationsCancelOptionalParams,
  ) => Promise<BetaAgentInvocationsCancelResponse>;
  /**
   * Retrieves the invocation with the given ID.
   * Returns 404 if the agent does not support this operation or if the invocation ID is not found.
   */
  get: (
    agentName: string,
    invocationId: string,
    foundryFeatures: "HostedAgents=V1Preview",
    options?: BetaAgentInvocationsGetOptionalParams,
  ) => Promise<BetaAgentInvocationsGetResponse>;
  /** Creates an invocation for the specified agent version. */
  create: (
    agentName: string,
    contentType: string,
    request: any,
    foundryFeatures: "HostedAgents=V1Preview",
    options?: BetaAgentInvocationsCreateOptionalParams,
  ) => Promise<BetaAgentInvocationsCreateResponse>;
  /**
   * Retrieves the OpenAPI specification for an agent version's invocation contract.
   * Returns 404 if the agent does not expose an OpenAPI specification.
   */
  getOpenApiSpec: (
    agentName: string,
    foundryFeatures: "HostedAgents=V1Preview",
    options?: GetOpenApiSpecOptionalParams,
  ) => Promise<Record<string, any>>;
}

function _getBetaAgentInvocations(context: AIProjectContext) {
  return {
    cancel: (
      agentName: string,
      invocationId: string,
      foundryFeatures: "HostedAgents=V1Preview",
      options?: BetaAgentInvocationsCancelOptionalParams,
    ) => cancel(context, agentName, invocationId, foundryFeatures, options),
    get: (
      agentName: string,
      invocationId: string,
      foundryFeatures: "HostedAgents=V1Preview",
      options?: BetaAgentInvocationsGetOptionalParams,
    ) => get(context, agentName, invocationId, foundryFeatures, options),
    create: (
      agentName: string,
      contentType: string,
      request: any,
      foundryFeatures: "HostedAgents=V1Preview",
      options?: BetaAgentInvocationsCreateOptionalParams,
    ) => create(context, agentName, contentType, request, foundryFeatures, options),
    getOpenApiSpec: (
      agentName: string,
      foundryFeatures: "HostedAgents=V1Preview",
      options?: GetOpenApiSpecOptionalParams,
    ) => getOpenApiSpec(context, agentName, foundryFeatures, options),
  };
}

export function _getBetaAgentInvocationsOperations(
  context: AIProjectContext,
): BetaAgentInvocationsOperations {
  return {
    ..._getBetaAgentInvocations(context),
  };
}
